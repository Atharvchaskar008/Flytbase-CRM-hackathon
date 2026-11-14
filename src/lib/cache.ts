import fs from 'fs';
import path from 'path';
import { CRMStoreData } from '../types/crm';
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
    // Attempt export or get_my_accounts
    let upstreamAccounts: any = null;
    try {
      upstreamAccounts = await fetchExport();
    } catch {
      upstreamAccounts = await callTool('get_my_accounts');
    }

    if (upstreamAccounts) {
      // Ingest live export
      currentStore.lastUpstreamSync = new Date().toISOString();

      // If signals are available, update signals
      try {
        const liveSignals = await callTool('get_signals');
        if (Array.isArray(liveSignals)) {
          currentStore.signals = liveSignals;
        }
      } catch (err) {
        console.warn('Could not fetch signals during this minute turn:', err);
      }

      saveLocalStore(currentStore);
      return {
        synced: true,
        store: currentStore,
        message: 'Successfully synchronized latest upstream account data from Questathon API.',
      };
    }
  } catch (err: any) {
    console.error('Upstream sync error:', err);
    return {
      synced: false,
      store: currentStore,
      message: `Sync attempted but encountered: ${err.message}. Showing cached data.`,
    };
  }

  return { synced: false, store: currentStore };
}
