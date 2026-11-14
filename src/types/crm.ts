export type AccountId = 'A' | 'B' | 'K' | 'H' | string;

export interface Character {
  id: string;
  name: string;
  role: string;
  account: AccountId | 'internal';
  band: 'guarded' | 'neutral' | 'warm' | 'ally';
  trustScore?: number;
  about?: string;
  isDecisionMaker?: boolean;
  isPayer?: boolean;
  isUser?: boolean;
  isBlocker?: boolean;
  isChampion?: boolean;
  lastContactDate?: string;
  keyConcerns?: string;
}

export interface Deal {
  id: string;
  title: string;
  account: AccountId;
  stage: 'unknown' | 'identified' | 'qualified' | 'cleared' | 'agreed';
  value: number; // in currency/numeric
  verifiedValue: number;
  isVerified: boolean;
  confidenceScore: number; // 0 - 100%
  citations: string[]; // e.g. ["file_contract_01", "person_chief_smith"]
  deciderId?: string;
  payerId?: string;
  blockerId?: string;
  blockerReason?: string;
  unlockCondition?: string;
  targetDate?: string;
  renewalWindowEnd?: string;
}

export interface NextBestAction {
  id: string;
  rank: number; // 1, 2, 3...
  title: string;
  account: AccountId;
  dealId?: string;
  owner: string;
  deadline: string;
  businessReason: string;
  expectedOutcome: string;
  evidenceNeeded: string[];
  status: 'pending' | 'completed' | 'in_progress';
}

export interface AccountRisk {
  id: string;
  title: string;
  account: AccountId;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'deadline_expiry' | 'stakeholder_cold' | 'technical_blocker' | 'contract_stalemate';
  deadlineDate: string;
  daysRemaining: number;
  consequence: string;
  mitigationPlan: string;
  owner: string;
}

export interface BlindSpot {
  id: string;
  account: AccountId;
  question: string;
  whyItMatters: string;
  whoCouldAnswer: string;
  potentialImpact: string;
  suggestedAsk: string;
}

export interface LiveSignal {
  id: string;
  account: AccountId;
  dated: string;
  title: string;
  summary: string;
  impactLevel?: 'high' | 'medium' | 'low';
  read?: boolean;
}

export interface PaperworkFile {
  id: string;
  account: AccountId;
  title: string;
  path: string;
  type: string;
  summary: string;
  keyTakeaways: string[];
}

export interface AccountDetail {
  id: AccountId;
  name: string;
  badge: string;
  business: string;
  sold: string;
  whyItMatters: string;
  handoverNote?: string;
  contractValue: number;
  expansionPotential: number;
  healthScore: number; // 0 - 100
  people: Character[];
  deals: Deal[];
  actions: NextBestAction[];
  risks: AccountRisk[];
  blindSpots: BlindSpot[];
  paperwork: PaperworkFile[];
}

export interface CRMNote {
  id: string;
  account?: AccountId;
  kind: 'note' | 'task' | 'risk' | 'next_step' | string;
  title?: string;
  text: string;
  created_at: string;
}

export type Note = CRMNote;

export interface CRMStoreData {
  lastUpdated: string;
  lastUpstreamSync: string;
  accounts: Record<AccountId, AccountDetail>;
  signals: LiveSignal[];
  notes: CRMNote[];
}
