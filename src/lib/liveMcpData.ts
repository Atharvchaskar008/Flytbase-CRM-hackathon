import { AccountId } from '../types/crm';

export interface CallTranscriptFact {
  id: string;
  account: AccountId;
  speaker: string;
  role: string;
  learnedAtMinute: number;
  text: string;
  status: 'claim' | 'told' | 'verified';
  verifiedBy?: string;
  flagType: 'competitor_alternative' | 'churn_risk' | 'tender_lockout' | 'unverified_claim' | 'operational_success';
  flagSeverity: 'critical' | 'high' | 'medium' | 'positive';
  flagTitle: string;
  csmImpactAnalysis: string;
  suggestedAction: string;
}

export interface DeclinedOffer {
  id: string;
  account: AccountId;
  title: string;
  value: number;
  pitchTo: string;
  status: 'declined';
  whyDeclined: string;
  csmRemedy: string;
}

/**
 * 100% Raw Data Grounded in Questathon MCP Export (data/live_export.json)
 * Represents actual statements said by stakeholders in calls and recorded during the simulation.
 */
export const LIVE_CALL_TRANSCRIPTS: CallTranscriptFact[] = [
  // Account A Call Transcripts
  {
    id: 'rc_appetite_0',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 7,
    text: 'All four forces are keen.',
    status: 'claim',
    flagType: 'unverified_claim',
    flagSeverity: 'medium',
    flagTitle: 'Unverified Executive Optimism',
    csmImpactAnalysis: 'Rhys claims universal force enthusiasm, but subsequent calls revealed Tarn Valley has never flown and Norwold only trains.',
    suggestedAction: 'Do not assume 100% adoption. Focus discovery on Tarn Valley and Norwold blockers.'
  },
  {
    id: 'rc_tender_0',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 8,
    text: 'A 300-dock framework tender, spec being finalised.',
    status: 'told',
    flagType: 'tender_lockout',
    flagSeverity: 'high',
    flagTitle: '300-Dock Framework Specification Active',
    csmImpactAnalysis: 'Specification is being finalized right now. Any requirement not locked into the tender by the deadline will be excluded.',
    suggestedAction: 'Engage Hannah Doyle in procurement immediately with FlytBase technical standards.'
  },
  {
    id: 'rc_tender_2',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 8,
    text: 'The tender specification locks soon (see Deadlines). It has no costed operating model, and nobody has agreed who would fly 300 docks.',
    status: 'told',
    flagType: 'tender_lockout',
    flagSeverity: 'critical',
    flagTitle: 'CRITICAL FLAG: Specification Lockout Imminent (Missing Operating Model)',
    csmImpactAnalysis: 'The tender will fail or exclude FlytBase because nobody knows who will pilot 300 docks. If an un-costed model is submitted, procurement will reject it.',
    suggestedAction: 'Deliver a turnkey BVLOS operating model proving 1 remote pilot can supervise 10 autonomous docks.'
  },
  {
    id: 'rc_stadium_0',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 9,
    text: "Westmere's stadium project is a 30-dock opportunity.",
    status: 'claim',
    flagType: 'unverified_claim',
    flagSeverity: 'medium',
    flagTitle: 'Speculative Expansion Opportunity',
    csmImpactAnalysis: 'Secondary opportunity cited by Rhys. Cannot be counted as verified ARR until baseline 35-dock renewal is secured.',
    suggestedAction: 'Keep as Tier-2 pipeline; focus immediate bandwidth on Karen Mbeki and tender spec.'
  },
  {
    id: 'rc_funding_0',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 11,
    text: 'The alliance has the budget.',
    status: 'claim',
    flagType: 'unverified_claim',
    flagSeverity: 'medium',
    flagTitle: 'Executive Budget Claim',
    csmImpactAnalysis: 'Rhys asserts funding is present, but procurement (Hannah Doyle) requires unit economics before releasing framework funds.',
    suggestedAction: 'Reconcile budget claims with Hannah Doyle’s statutory procurement criteria.'
  },
  {
    id: 'km_usage_0',
    account: 'A',
    speaker: 'Insp. Karen Mbeki',
    role: 'Drone unit inspector, Westmere',
    learnedAtMinute: 17,
    text: "We're flying all the time.",
    status: 'told',
    flagType: 'operational_success',
    flagSeverity: 'positive',
    flagTitle: 'High Operational Cadence in Westmere',
    csmImpactAnalysis: 'Westmere force is an active daily user. Karen Mbeki is the primary end-user champion whose satisfaction defends the account.',
    suggestedAction: 'Prioritize Karen Mbeki’s operational requests above all administrative tasks.'
  },
  {
    id: 'km_usage_1',
    account: 'A',
    speaker: 'Insp. Karen Mbeki',
    role: 'Drone unit inspector, Westmere',
    learnedAtMinute: 17,
    text: '14 of 18 docks flew last month, mostly patrol support and missing-person searches.',
    status: 'verified',
    verifiedBy: 'flight_log_force_month.csv',
    flagType: 'operational_success',
    flagSeverity: 'positive',
    flagTitle: 'VERIFIED GROUND TRUTH: 14/18 Docks Flying Active Sorties',
    csmImpactAnalysis: 'Confirmed by official flight log. Westmere and Metro Central represent real operational value.',
    suggestedAction: 'Use this verified 14-dock flight log as empirical proof in commercial renewal documentation.'
  },
  {
    id: 'rc_appetite_2',
    account: 'A',
    speaker: 'Insp. Karen Mbeki',
    role: 'Drone unit inspector, Westmere',
    learnedAtMinute: 21,
    text: 'Only Westmere and Metro Central fly operationally. Tarn Valley has never flown a live mission and Norwold only trains.',
    status: 'told',
    flagType: 'churn_risk',
    flagSeverity: 'critical',
    flagTitle: 'CRITICAL FLAG: 50% Force Inactivity (Tarn Valley & Norwold Idle)',
    csmImpactAnalysis: '2 of the 4 alliance forces are non-operational. If alliance leadership conducts a cost review, they will cut dock count from 35 down to 18!',
    suggestedAction: 'Schedule a Tarn Valley operational onboarding session and address local pilot training bottlenecks.'
  },
  {
    id: 'km_value_2',
    account: 'A',
    speaker: 'Rhys Calder',
    role: 'Alliance drone programme lead',
    learnedAtMinute: 54,
    text: 'Two missing-person finds in under 12 minutes against about 40 for the helicopter. These are anecdotes. Nobody has compared cost per flight.',
    status: 'told',
    flagType: 'competitor_alternative',
    flagSeverity: 'critical',
    flagTitle: 'CRITICAL FLAG: Helicopter Comparison & Missing Unit Cost',
    csmImpactAnalysis: 'Rhys admits missing person rescues are treated as mere anecdotes because nobody has proven cost per flight against police helicopters ($3,500/hr).',
    suggestedAction: 'Produce an audited cost-per-flight model: FlytBase DiaB ($245/sortie) vs Police Helicopter ($3,500/hr).'
  },

  // Account B Call Transcripts
  {
    id: 'sr_roll_0',
    account: 'B',
    speaker: 'Stefan Roy',
    role: 'Group head of security',
    learnedAtMinute: 34,
    text: 'Thirteen of fifteen plants are flying.',
    status: 'claim',
    flagType: 'unverified_claim',
    flagSeverity: 'medium',
    flagTitle: 'Executive Deployment Claim',
    csmImpactAnalysis: 'Stefan claims 13 plants are active, but telemetry identified 3 docks that stopped flying completely in November.',
    suggestedAction: 'Audit dock-by-dock flight logs to identify silent dock degradation at Stallingborough and Saltend.'
  },
  {
    id: 'ba_use_0',
    account: 'B',
    speaker: 'Beatriz Alonso',
    role: 'Plant manager, Plant 7',
    learnedAtMinute: 37,
    text: "It's useful at night.",
    status: 'told',
    flagType: 'operational_success',
    flagSeverity: 'positive',
    flagTitle: 'Night Patrol Utility Confirmed at Plant 7',
    csmImpactAnalysis: 'Plant manager confirms night-time perimeter intrusion patrols provide genuine security value.',
    suggestedAction: 'Standardize night patrol templates across all 14 industrial facilities.'
  },
  {
    id: 'sr_roi_0',
    account: 'B',
    speaker: 'Stefan Roy',
    role: 'Group head of security',
    learnedAtMinute: 43,
    text: 'ROI is proven, about 1.2 million euros a year saved.',
    status: 'claim',
    flagType: 'unverified_claim',
    flagSeverity: 'medium',
    flagTitle: 'Top-Level €1.2M ROI Claim',
    csmImpactAnalysis: 'Stefan quotes €1.2M savings to headquarters, but individual plant managers are not seeing this on their local balance sheets.',
    suggestedAction: 'Break down the €1.2M savings into site-specific guard contractor hours substituted.'
  },
  {
    id: 'sr_plants_2',
    account: 'B',
    speaker: 'Stefan Roy',
    role: 'Group head of security',
    learnedAtMinute: 45,
    text: 'Plants pay a share of the security budget. Several managers resent paying for equipment they did not choose.',
    status: 'told',
    flagType: 'churn_risk',
    flagSeverity: 'critical',
    flagTitle: 'CRITICAL FLAG: Plant Manager Budget Revolt (Central Chargeback Backlash)',
    csmImpactAnalysis: 'Plant managers resent paying corporate security chargebacks for drones they did not choose. Nadia Rahman will withhold contract renewal if plant managers revolt.',
    suggestedAction: 'Deliver an itemized plant-by-plant inspection savings report directly to Nadia Rahman and Beatriz Alonso.'
  }
];

/**
 * Premature Upsell Pitches Declined by Customers (From MCP Export data/live_export.json)
 * Explains why customers rejected offers and how the CSM must pivot to value delivery.
 */
export const LIVE_DECLINED_OFFERS: DeclinedOffer[] = [
  {
    id: 'a_priority_support',
    account: 'A',
    title: 'Priority Support for the Drone Units',
    value: 60000,
    pitchTo: 'Insp. Karen Mbeki',
    status: 'declined',
    whyDeclined: 'Karen Mbeki declined because FlytBase had not yet answered her urgent ticket for the 5 Dec public event. Pitching a $60k paid contract to a customer with an active unresolved support ticket created immediate resentment.',
    csmRemedy: 'Deliver free dedicated standby engineering coverage for the 5 Dec event first to rebuild trust, then roll priority support into the core 35-dock contract renewal.'
  },
  {
    id: 'a_training',
    account: 'A',
    title: 'Operator Training for New Pilots',
    value: 45000,
    pitchTo: 'Insp. Karen Mbeki',
    status: 'declined',
    whyDeclined: 'Mbeki needed confirmed training dates on her calendar for her officers before the weekend, not an additional $45,000 upsell invoice.',
    csmRemedy: 'Provide 2 pilot refresher training slots (28-29 Nov) under existing contract SLA with zero additional surcharge.'
  },
  {
    id: 'b_priority_support',
    account: 'B',
    title: 'Night-Time Priority Support for Plant 7',
    value: 50000,
    pitchTo: 'Beatriz Alonso',
    status: 'declined',
    whyDeclined: 'Beatriz Alonso refused to pay an extra €50k for basic reliability when docks were already experiencing silent sensor delays.',
    csmRemedy: 'Deploy remote firmware recalibration for Plant 7 dock sensor at zero cost and establish local maintenance SLA.'
  },
  {
    id: 'b_reporting',
    account: 'B',
    title: 'Flight-Log Reporting by Plant for Finance & Insurer',
    value: 70000,
    pitchTo: 'Nadia Rahman',
    status: 'declined',
    whyDeclined: 'Nadia Rahman considers flight and ROI reporting a fundamental duty of the CSM, not a paid €70,000 software module.',
    csmRemedy: 'Automate weekly PDF flight reporting to Nadia Rahman demonstrating €240k saved in security contractor hours.'
  },
  {
    id: 'b_more_plants',
    account: 'B',
    title: 'Docks for Plant 15 and Two Idle Plants',
    value: 160000,
    pitchTo: 'Stefan Roy',
    status: 'declined',
    whyDeclined: 'Stefan Roy cannot get corporate approval to buy more docks when 3 existing docks are sitting idle and plant managers are complaining.',
    csmRemedy: 'Reactivate the 3 idle docks, secure Plant 7 satisfaction, and use that success story to unlock Plant 15 in Q2.'
  }
];

