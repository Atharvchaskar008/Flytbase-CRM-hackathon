import fs from 'fs';
import path from 'path';
import { CRMStoreData, AccountDetail, Character, Deal } from '../types/crm';
import { initialCRMData } from './mockData';
import { callTool, fetchExport } from './mcp';

const DATA_DIR = path.join(process.cwd(), 'data');
const CACHE_FILE = path.join(DATA_DIR, 'crm_cache.json');

let inMemoryStore: CRMStoreData | null = null;
let lastSyncTimestamp = 0;
const RATE_LIMIT_INTERVAL_MS = 60 * 1000; // 1 call per minute

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getLocalStore(): CRMStoreData {
  if (inMemoryStore) {
    return inMemoryStore;
  }

  ensureDataDir();
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const content = fs.readFileSync(CACHE_FILE, 'utf-8');
      inMemoryStore = JSON.parse(content);
      return inMemoryStore!;
    } catch (e) {
      console.error('Error reading cache file, falling back to initial data:', e);
    }
  }

  inMemoryStore = JSON.parse(JSON.stringify(initialCRMData));
  saveLocalStore(inMemoryStore!);
  return inMemoryStore!;
}

export function saveLocalStore(data: CRMStoreData) {
  ensureDataDir();
  inMemoryStore = data;
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

/**
 * Merge upstream raw export into structured CRM account details.
 * Ensures dynamically dropped accounts (e.g. Account K, Account H) appear without code changes.
 */
function mergeUpstreamAccounts(currentStore: CRMStoreData, exportPayload: any) {
  if (!exportPayload?.accounts || !Array.isArray(exportPayload.accounts)) return;

  exportPayload.accounts.forEach((rawAcc: any) => {
    const accId = rawAcc.id;
    if (!currentStore.accounts[accId]) {
      // Dynamic new account drop detected!
      const newPeople: Character[] = (rawAcc.stakeholders || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        role: s.role || 'Key Stakeholder',
        account: accId,
        band: (s.relationship || 'neutral') as any,
        trustScore: 40,
        about: s.about || 'Newly dropped account stakeholder.',
        isDecisionMaker: true,
      }));

      const newDeals: Deal[] = (rawAcc.opportunities || []).map((o: any) => ({
        id: o.id,
        title: o.title || `Account ${accId} Opportunity`,
        account: accId,
        stage: o.stage || 'identified',
        value: o.worth_up_to || 150000,
        verifiedValue: 0,
        isVerified: false,
        confidenceScore: 40,
        citations: o.evidence || [],
        blockerReason: o.blocker || 'Pending discovery and operational model.',
      }));

      const newAccountDetail: AccountDetail = {
        id: accId,
        name: rawAcc.name || `Account ${accId}`,
        badge: 'New Account Drop',
        business: rawAcc.official_story || 'Mid-build scenario drop.',
        sold: `${rawAcc.docks || 10} FlytBase DiaB Units`,
        whyItMatters: 'Newly released strategic account during live build phase.',
        handoverNote: 'Ingested dynamically from live API without code modification.',
        contractValue: 150000,
        expansionPotential: 300000,
        healthScore: 50,
        people: newPeople,
        deals: newDeals,
        actions: [
          {
            id: `act_${accId}_1`,
            rank: 1,
            title: `Initiate Discovery with ${newPeople[0]?.name || 'Stakeholder'}`,
            account: accId,
            owner: 'CSM Lead',
            deadline: 'Within 24 Hours',
            businessReason: 'Newly assigned account requires immediate stakeholder introduction.',
            expectedOutcome: 'Baseline operational scope established.',
            evidenceNeeded: (rawAcc.facts || []).map((f: any) => f.id),
            status: 'pending',
          }
        ],
        risks: [
          {
            id: `risk_${accId}_1`,
            title: 'Unvetted Deployment Assumptions',
            account: accId,
            severity: 'high',
            category: 'stakeholder_cold',
            deadlineDate: 'Day 20',
            daysRemaining: 10,
            consequence: 'Lack of verified contact burns tender window.',
            mitigationPlan: 'Deliver FlytBase enterprise reference architecture.',
            owner: 'CSM',
          }
        ],
        blindSpots: [
          {
            id: `blind_${accId}_1`,
            account: accId,
            question: 'What is the decision hierarchy for this new account?',
            whyItMatters: 'Unknown economic buyer.',
            whoCouldAnswer: newPeople[0]?.name || 'Alliance Lead',
            potentialImpact: 'Stalls expansion proposal.',
            suggestedAsk: 'Request procurement framework.',
          }
        ],
        paperwork: [],
      };

      currentStore.accounts[accId] = newAccountDetail;
    } else {
      // Existing account: merge newly uncovered stakeholders & opportunities
      const existing = currentStore.accounts[accId];
      if (rawAcc.stakeholders && Array.isArray(rawAcc.stakeholders)) {
        rawAcc.stakeholders.forEach((s: any) => {
          if (!existing.people.some(p => p.id === s.id || p.name.toLowerCase() === s.name.toLowerCase())) {
            existing.people.push({
              id: s.id,
              name: s.name,
              role: s.role || 'Stakeholder',
              account: accId,
              band: (s.relationship || 'neutral') as any,
              trustScore: 40,
              about: s.about || 'Newly uncovered stakeholder.',
              isDecisionMaker: false,
            });
          }
        });
      }

      if (rawAcc.opportunities && Array.isArray(rawAcc.opportunities)) {
        rawAcc.opportunities.forEach((o: any) => {
          if (!existing.deals.some(d => d.id === o.id)) {
            existing.deals.push({
              id: o.id,
              title: o.title || `Opportunity ${o.id}`,
              account: accId,
              stage: o.stage || 'identified',
              value: o.worth_up_to || 100000,
              verifiedValue: 0,
              isVerified: false,
              confidenceScore: 35,
              citations: o.evidence || [],
              blockerReason: o.blocker || 'Pending verification.',
            });
          }
        });
      }
    }
  });
}

/**
 * Sync with Questathon upstream respecting the 1 request / minute rule.
 */
export async function syncWithUpstream(force = false): Promise<{ synced: boolean; store: CRMStoreData; message?: string }> {
  const currentStore = getLocalStore();
  const token = process.env.AQ_TOKEN;

  if (!token) {
    return {
      synced: false,
      store: currentStore,
      message: 'Running in offline / standalone mode (AQ_TOKEN not set in environment). Serving local cached intelligence.',
    };
  }

  const now = Date.now();
  const timeSinceLastSync = now - lastSyncTimestamp;

  if (!force && timeSinceLastSync < RATE_LIMIT_INTERVAL_MS) {
    const secondsWait = Math.ceil((RATE_LIMIT_INTERVAL_MS - timeSinceLastSync) / 1000);
    return {
      synced: false,
      store: currentStore,
      message: `Rate limit guard: Next sync available in ${secondsWait}s (1 call / min limit). Returned cached data.`,
    };
  }

  try {
    lastSyncTimestamp = now;
    let exportPayload: any = null;
    try {
      exportPayload = await fetchExport();
    } catch {
      exportPayload = await callTool('get_my_accounts');
    }

    if (exportPayload) {
      currentStore.lastUpstreamSync = new Date().toISOString();
      mergeUpstreamAccounts(currentStore, exportPayload);

      // Fetch live signals
      try {
        let liveSignals: any = null;
        try {
          const res = await fetch(`${process.env.API_URL || 'https://questathon.aihackerscollective.com/api/public/v1'}/signals`, {
            headers: { authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            liveSignals = data.signals;
          }
        } catch {
          liveSignals = await callTool('get_signals');
        }

        if (Array.isArray(liveSignals) && liveSignals.length > 0) {
          currentStore.signals = liveSignals;
        }
      } catch (err) {
        console.warn('Could not fetch signals during this minute turn:', err);
      }

      saveLocalStore(currentStore);
      return {
        synced: true,
        store: currentStore,
        message: 'Successfully pulled and merged latest upstream accounts and live signals.',
      };
    }
  } catch (err: any) {
    console.error('Upstream sync error:', err);
    return {
      synced: false,
      store: currentStore,
      message: `Sync attempted: ${err.message}. Showing cached data.`,
    };
  }

  return { synced: false, store: currentStore };
}
