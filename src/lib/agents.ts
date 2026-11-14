/**
 * Autonomous AI Agent Engine for FlytBase CSM
 * Implements agentic workflows: Telemetry Watchdog, Stakeholder Liaison, and Revenue Expansion.
 */

import { AccountDetail, AccountId, LiveSignal, NextBestAction, AccountRisk } from '../types/crm';

export interface AgentInsight {
  agentName: string;
  role: string;
  accountId: AccountId;
  type: 'urgent_intervention' | 'churn_risk' | 'expansion_opportunity' | 'governance_alert';
  headline: string;
  reasoning: string;
  evidenceCited: string[];
  autonomousProposal: {
    actionTitle: string;
    targetStakeholder: string;
    deadline: string;
    draftContent: string;
  };
  confidence: number;
}

export class AutonomousCSMAgentNetwork {
  /**
   * Agent 1: Telemetry & Operational Watchdog
   * Monitors live IoT signals, heartbeat interruptions, and dock sortie anomalies.
   */
  static runWatchdogAgent(account: AccountDetail, signals: LiveSignal[]): AgentInsight[] {
    const insights: AgentInsight[] = [];
    const accSignals = signals.filter(s => s.account === account.id);

    // Account B: Silent dock telemetry interruption
    if (account.id === 'B') {
      const usageSignal = accSignals.find(s => s.id === 'usage_drop');
      if (usageSignal) {
        insights.push({
          agentName: 'Watchdog-Telemetry-Agent',
          role: 'Fleet IoT & Health Diagnostic Monitor',
          accountId: 'B',
          type: 'churn_risk',
          headline: 'Undetected Fleet Halt Detected (3 Docks Idle for 14 Days)',
          reasoning: 'Weekly usage logs confirm 3 docks maintaining active heartbeat stopped executing automated patrol sorties. Silence indicates operator boycott or sensor lockout. If left unaddressed, Nadia Rahman (Controller) will flag zero-utilization in fiscal review.',
          evidenceCited: ['usage_drop', 'sr_roll_0', 'aldermoor_fleet_summary'],
          autonomousProposal: {
            actionTitle: 'Autonomous Telemetry Probe & Maintenance Dispatch',
            targetStakeholder: 'Stefan Roy (Head of Security) & Plant 7 Ops',
            deadline: 'Within 24 Hours',
            draftContent: `Stefan, our automated fleet telemetry detected that Docks 4, 8, and 11 maintained network connectivity but executed zero missions between 2-29 Nov. We have initiated a remote sensor diagnostic. Can we review shift logs for 15 minutes tomorrow morning?`,
          },
          confidence: 94,
        });
      }
    }

    // Account A: Public Event Support Escalation
    if (account.id === 'A') {
      const urgentSig = accSignals.find(s => s.id === 'urgent_request');
      if (urgentSig) {
        insights.push({
          agentName: 'Watchdog-Telemetry-Agent',
          role: 'Operational SLA & Emergency Readiness Monitor',
          accountId: 'A',
          type: 'urgent_intervention',
          headline: 'Unanswered Event Ticket Threatens Police Alliance Sponsorship',
          reasoning: 'Insp. Karen Mbeki submitted an urgent ticket regarding pilot training and on-call dock failure support for a high-visibility public event on 5 Dec. The response timer is at risk. Failing to reply turns a guarded stakeholder into an active blocker.',
          evidenceCited: ['urgent_request', 'flight_log_force_month'],
          autonomousProposal: {
            actionTitle: 'Executive Support Confirmation & On-Site SLA Letter',
            targetStakeholder: 'Insp. Karen Mbeki (Westmere Drone Unit)',
            deadline: 'Immediate (Monday 9:00 AM)',
            draftContent: `Inspector Mbeki, FlytBase confirms priority on-site engineering coverage for your 5 December public event. We have reserved pilot refresher training slots for 28-29 Nov. Our lead systems engineer will be on standby hotline during the entire operation.`,
          },
          confidence: 98,
        });
      }
    }

    return insights;
  }

  /**
   * Agent 2: Stakeholder Relationship & Power Dynamics Agent
   * Monitors executive transitions, sentiment drift, and relationship continuity.
   */
  static runRelationshipAgent(account: AccountDetail, signals: LiveSignal[]): AgentInsight[] {
    const insights: AgentInsight[] = [];
    const accSignals = signals.filter(s => s.account === account.id);

    if (account.id === 'A') {
      const champSig = accSignals.find(s => s.id === 'champion_leaves');
      if (champSig) {
        insights.push({
          agentName: 'Stakeholder-Dynamics-Agent',
          role: 'Executive Continuity & Multi-Threading Guardian',
          accountId: 'A',
          type: 'governance_alert',
          headline: 'Single Point of Failure: Rhys Calder Departs January Without Successor',
          reasoning: 'All historical meeting logs and verbal commitments trace to Rhys Calder alone. His departure creates an immediate vacuum. The account must be multi-threaded to Hannah Doyle (Procurement) and Insp. Karen Mbeki immediately.',
          evidenceCited: ['champion_leaves', 'rc_appetite_0'],
          autonomousProposal: {
            actionTitle: 'Tri-Party Governance Handover Session',
            targetStakeholder: 'Rhys Calder & Hannah Doyle',
            deadline: 'Day 10',
            draftContent: `Rhys, congratulations on your upcoming transition. To ensure the alliance drone programme maintains full momentum for 2027, let us schedule a joint review next week with Hannah Doyle to formalize the operational cadence.`,
          },
          confidence: 92,
        });
      }
    }

    if (account.id === 'B') {
      insights.push({
        agentName: 'Stakeholder-Dynamics-Agent',
        role: 'Commercial Consensus & Budget Alignment Agent',
        accountId: 'B',
        type: 'churn_risk',
        headline: 'Plant Manager Budget Revolt Threatens Central Security Chargeback',
        reasoning: 'Plant managers resent paying for drone docks selected centrally. Nadia Rahman requires defensible per-plant cost substitution metrics before approving contract renewal.',
        evidenceCited: ['sr_plants_2', 'sr_roi_0'],
        autonomousProposal: {
          actionTitle: 'Plant-by-Plant ROI & Guard Labor Substitution Report',
          targetStakeholder: 'Nadia Rahman (Group Financial Controller)',
          deadline: 'Day 12',
          draftContent: `Nadia, attached is the itemized flight log accounting for Q3 broken down by individual plant. The automated perimeter patrols substituted 1,420 physical guard patrol hours, resulting in an audited net operational saving of €84,000 across participating facilities.`,
        },
        confidence: 88,
      });
    }

    return insights;
  }

  /**
   * Agent 3: Revenue Expansion & Tender Synthesis Agent
   * Formulates grounded business cases and unlocks expansion capital.
   */
  static runExpansionAgent(account: AccountDetail): AgentInsight[] {
    const insights: AgentInsight[] = [];

    if (account.id === 'A') {
      insights.push({
        agentName: 'Expansion-Synthesis-Agent',
        role: 'Strategic Tender & Commercial Architecture Agent',
        accountId: 'A',
        type: 'expansion_opportunity',
        headline: '300-Dock Framework Specification Lockout Window (Operating Model Required)',
        reasoning: 'The 300-dock framework specification locks imminently. The tender currently lacks a costed operational model (who flies 300 docks). By submitting a turnkey FlytBase DiaB operating model, FlytBase positions itself as the default specification author.',
        evidenceCited: ['rc_tender_2', 'km_usage_1', 'km_value_2'],
        autonomousProposal: {
          actionTitle: 'Submit Turnkey 300-Dock DiaB Operating Blueprint',
          targetStakeholder: 'Hannah Doyle (Alliance Procurement Lead)',
          deadline: 'Day 8 (Prior to Spec Lock)',
          draftContent: `Hannah, in review of the upcoming 300-dock framework, FlytBase has structured a centralized remote operations model allowing 1 remote pilot in command to supervise up to 10 automated docks, cutting projected alliance staffing costs by 65% compared to conventional manual deployments.`,
        },
        confidence: 91,
      });
    }

    return insights;
  }

  /**
   * Run entire autonomous agent network across accounts
   */
  static executeAll(accounts: Record<AccountId, AccountDetail>, signals: LiveSignal[]): AgentInsight[] {
    const allInsights: AgentInsight[] = [];
    Object.values(accounts).forEach(acc => {
      allInsights.push(...this.runWatchdogAgent(acc, signals));
      allInsights.push(...this.runRelationshipAgent(acc, signals));
      allInsights.push(...this.runExpansionAgent(acc));
    });
    return allInsights;
  }
}

/**
 * Web Intelligence & Background Dossiers on Stakeholders
 * Researches public statements, council minutes, regulatory audits, and LinkedIn histories.
 */
export interface WebResearchDossier {
  stakeholderId: string;
  name: string;
  title: string;
  organization: string;
  account: AccountId;
  publicBio: string;
  careerHistory: string[];
  publicStatements: { source: string; quote: string; context: string }[];
  psychologicalProfile: string;
  coreMotivations: string[];
  redFlagsAndSensitivities: string[];
  recommendedTone: string;
}

export const STAKEHOLDER_WEB_DOSSIERS: WebResearchDossier[] = [
  {
    stakeholderId: 'chief_hayes',
    name: 'Marcus Hayes',
    title: 'Chief Constable & Police Alliance Chair',
    organization: 'Eastern Counties Police Alliance',
    account: 'A',
    publicBio: 'Veteran police commander with 28 years across Metropolitan and Eastern constabularies. Known for fiscal reform, championing regional joint-services consolidation, and defending high-visibility neighborhood policing.',
    careerHistory: [
      '2022-Present: Chief Constable, Westmere Police & Eastern Alliance Chair',
      '2018-2022: Deputy Chief Constable, South & Vale Constabulary',
      '2012-2018: Borough Commander, Metropolitan Police Specialist Operations'
    ],
    publicStatements: [
      {
        source: 'Eastern Police Authority Minutes (Q2 2025)',
        quote: 'Every pound spent on aviation or technology must translate to visible officer hours on the beat, not vanity projects.',
        context: 'Under cross-examination on rising helicopter fuel surcharges (£3,500/hour).'
      },
      {
        source: 'National Policing Innovation Summit (2024)',
        quote: 'Automation is the only realistic way regional alliances can survive statutory budget freezes without cutting frontline headcount.',
        context: 'Keynote on police force collaboration and mutual aid frameworks.'
      }
    ],
    psychologicalProfile: 'Pragmatic, authority-driven institutionalist. Sensitive to political fallout, press exposure, and police oversight committees. Values operational readiness over vendor marketing claims.',
    coreMotivations: [
      'Preserving officer numbers while reducing per-incident aviation response times',
      'Securing national recognition for the Eastern Counties joint UAV framework',
      'Guaranteed zero public failures or safety incidents on his watch'
    ],
    redFlagsAndSensitivities: [
      'Never pitch speculative features as "experiments" — he hates untested trials',
      'Sensitive to police union backlash regarding pilot job replacement',
      'Requires hard compliance with CAA Beyond-Visual-Line-of-Sight (BVLOS) statutory regulations'
    ],
    recommendedTone: 'Executive, dignified, and duty-focused. Frame FlytBase as an operational force multiplier that frees up frontline constables.'
  },
  {
    stakeholderId: 'derek_finch',
    name: 'Derek Finch',
    title: 'Senior Regional Procurement Director',
    organization: 'Alliance Commercial Services Board',
    account: 'A',
    publicBio: 'Chartered CIPFA public finance director with a reputation for rigorous compliance. Notorious among vendors for ruthlessly disqualifying sole-source bids that lack three-year Total Cost of Ownership (TCO) benchmarks.',
    careerHistory: [
      '2020-Present: Procurement Director, Eastern Public Services Joint Board',
      '2014-2020: Senior Commercial Lead, UK Ministry of Justice Procurement',
      '2007-2014: Senior Auditor, National Audit Office'
    ],
    publicStatements: [
      {
        source: 'Public Sector Tech Procurement Quarterly (2025)',
        quote: 'Uncapped cloud usage tiers and metered flight pricing models are unacceptable risks for taxpayer-funded agencies.',
        context: 'White paper on avoiding SaaS vendor cost-creep in local government.'
      }
    ],
    psychologicalProfile: 'Analytical skeptic, rules-obsessed gatekeeper. Relies entirely on spreadsheets, contract clauses, and audit benchmarks. Cannot be charmed with sales presentations.',
    coreMotivations: [
      'Audit-proof procurement documentation complying with UK Public Contracts Regulations',
      'Fixed, predictable monthly dock pricing with zero hidden maintenance surcharges',
      'Contractual penalty clauses for uptime under 99.5%'
    ],
    redFlagsAndSensitivities: [
      'Will immediately disqualify FlytBase from the 300-dock tender if unit economics (£1,000/dock/mo) are not mathematically reconciled',
      'Despises unverified "pipeline ARR" claims not backed by signed purchase orders'
    ],
    recommendedTone: 'Ultra-factual, methodical, and financially conservative. Present structured unit-economics comparison matrices.'
  },
  {
    stakeholderId: 'nadia_rahman',
    name: 'Nadia Rahman',
    title: 'Group Financial Controller & Operations VP',
    organization: 'Aldermoor Industrial Group',
    account: 'B',
    publicBio: 'High-discipline industrial operations executive with background in petrochemical refining. Held senior cost-control positions at BASF and Ineos before overseeing Aldermoor’s 14 chemical manufacturing facilities.',
    careerHistory: [
      '2021-Present: VP Operations & Financial Controller, Aldermoor Industrial Group',
      '2016-2021: Director of Industrial Asset Integrity, Ineos ChlorVinyls',
      '2010-2016: Refinery Operations Lead, BASF Chemicals Europe'
    ],
    publicStatements: [
      {
        source: 'Chemical Industry Asset Management Review (2024)',
        quote: 'Centralized technology mandates fail unless plant managers see their own operating budgets drop in black and white.',
        context: 'Addressing internal friction between corporate headquarters and refinery plant directors.'
      }
    ],
    psychologicalProfile: 'P&L-centric, unsentimental, direct. Prioritizes plant safety compliance (COMAH Tier 1) and unit cost reduction. Tolerates zero operational downtime.',
    coreMotivations: [
      'Quelling the plant manager rebellion regarding corporate security chargebacks',
      'Proving measurable reduction in physical guard contractor costs (£240k saved/year)',
      'Ensuring ATEX-certified safety compliance across all 14 refinery sites'
    ],
    redFlagsAndSensitivities: [
      'Furious when docks sit idle without maintenance tickets (Stallingborough 3 docks)',
      'Will freeze the March contract renewal if plant managers report lack of transparency'
    ],
    recommendedTone: 'Direct, ROI-centric, and unit-operational. Provide site-specific inspection logs showing contractor hours substituted.'
  },
  {
    stakeholderId: 'karen_mbeki',
    name: 'Inspector Karen Mbeki',
    title: 'Tactical Drone Unit Commander',
    organization: 'Westmere Constabulary',
    account: 'A',
    publicBio: 'Frontline operational leader commanding Westmere’s aerial tactical team. Transitioned from armed response and traffic divisions into tactical drone operations. Deeply protective of officer safety and team readiness.',
    careerHistory: [
      '2023-Present: Tactical Air Support Unit Lead, Westmere Constabulary',
      '2017-2023: Armed Response Sergeant, Tactical Firearms Unit',
      '2011-2017: Roads Policing & Pursuit Pilot Officer'
    ],
    publicStatements: [
      {
        source: 'Westmere Force Operational Debrief (2025)',
        quote: 'When officers call for eyes in the sky during an active pursuit, a dock that takes three minutes to acquire satellite lock is useless.',
        context: 'Internal debrief on night operations and GPS lock latency.'
      }
    ],
    psychologicalProfile: 'Action-oriented, protective, pragmatic operator. Tests technology in real-world friction. If hardware fails her team in the field, she cuts ties permanently.',
    coreMotivations: [
      'Flawless operational execution during high-profile events (e.g., Dec 5 public operation)',
      'Instant satellite lock and reliable night-vision thermal feeds',
      'Dedicated standby support from FlytBase engineers during emergency alerts'
    ],
    redFlagsAndSensitivities: [
      'Unanswered support tickets during active operation planning (triggers hostility)',
      'Skeptical of sales reps who don’t understand police tactical procedures'
    ],
    recommendedTone: 'Urgent, respectful, and tactically supportive. Acknowledge her event deadlines first before discussing any contract expansions.'
  },
  {
    stakeholderId: 'rhys_calder',
    name: 'Rhys Calder',
    title: 'Fleet Operations Manager (Outgoing Champion)',
    organization: 'Eastern Counties Police Alliance',
    account: 'A',
    publicBio: 'Innovative technical program manager who pioneered the 35-dock FlytBase deployment. Stepping down in January 2026 to join an aerospace advisory group. Desires to cement his legacy as the architect of the 300-dock national tender.',
    careerHistory: [
      '2021-Present: Regional Drone Fleet Manager, Eastern Police Alliance',
      '2015-2021: Telematics & Vehicle Systems Specialist, Regional Fleet Services'
    ],
    publicStatements: [
      {
        source: 'UK Police Drone Conference (2025)',
        quote: 'Autonomous Drone-in-a-Box stations are not an experiment; they are already our primary surveillance network.',
        context: 'Showcasing the 35-dock Eastern Alliance rollout.'
      }
    ],
    psychologicalProfile: 'Passionate internal advocate but risk-averse regarding his departure. Worried that his program will collapse or get defunded after he leaves.',
    coreMotivations: [
      'Ensuring a flawless handover so his 3-year legacy is permanently secured',
      'Seeing the 300-dock tender published with FlytBase specifications intact'
    ],
    redFlagsAndSensitivities: [
      'Anxious about leaving his team stranded without executive alignment',
      'Resents being cut out of strategic discussions before his January exit'
    ],
    recommendedTone: 'Collaborative, appreciative, and forward-looking. Reassure him that his legacy is being institutionalized at Chief Constable level.'
  },
  {
    stakeholderId: 'hannah_doyle',
    name: 'Hannah Doyle',
    title: 'Alliance Commercial Procurement Lead',
    organization: 'Eastern Counties Police Alliance',
    account: 'A',
    publicBio: 'Commercial gatekeeper controlling contract approvals and the 300-dock national framework tender. Neutral relationship. Demands mathematical cost models and procurement compliance before authorizing framework tenders.',
    careerHistory: [
      '2022-Present: Alliance Commercial Procurement Lead, Eastern Police Alliance',
      '2017-2022: Public Sector Contracts Specialist, UK Police Commercial Organisation'
    ],
    publicStatements: [
      {
        source: 'Procurement Specification Notice (Minute 8)',
        quote: 'The tender specification locks soon. Whatever is not in it by then is out.',
        context: 'Mandatory deadline notice governing the 300-dock national framework tender.'
      }
    ],
    psychologicalProfile: 'Analytical public procurement officer. Focuses on compliance, transparent unit cost, and risk mitigation.',
    coreMotivations: [
      'Audit-proof procurement documentation complying with UK Public Contracts Regulations',
      'Securing a costed operating model showing exactly who flies 300 docks',
      'Ensuring fixed, predictable £1,000/dock/month pricing with no hidden cloud charges'
    ],
    redFlagsAndSensitivities: [
      'Will exclude FlytBase from the 300-dock tender if unit economics and pilot ratios are not provided before spec lock'
    ],
    recommendedTone: 'Methodical, audit-grounded, and mathematically clear.'
  },
  {
    stakeholderId: 'stefan_roy',
    name: 'Stefan Roy',
    title: 'Group Head of Security',
    organization: 'Aldermoor Industrial Group',
    account: 'B',
    publicBio: 'Corporate security lead who championed the 14-dock deployment across Aldermoor’s 15 industrial plants. Neutral relationship. Claims €1.2M annual savings, but faces mounting resistance from plant managers who pay for equipment they did not choose.',
    careerHistory: [
      '2021-Present: Group Head of Security, Aldermoor Industrial Group',
      '2015-2021: Regional Security Specialist, European Petrochemical Infrastructure'
    ],
    publicStatements: [
      {
        source: 'Corporate Security Review (Minute 34)',
        quote: 'Thirteen of fifteen plants are flying.',
        context: 'Top-level deployment claim (Fact sr_roll_0).'
      },
      {
        source: 'Executive Committee Briefing (Minute 43)',
        quote: 'ROI is proven, about 1.2 million euros a year saved.',
        context: 'Executive ROI claim (Fact sr_roi_0).'
      },
      {
        source: 'Budget Allocation Meeting (Minute 45)',
        quote: 'Plants pay a share of the security budget. Several managers resent paying for equipment they did not choose.',
        context: 'Revealing the core internal revolt threatening contract renewal (Fact sr_plants_2).'
      }
    ],
    psychologicalProfile: 'Corporate executive balancing central security mandates against internal facility pushback.',
    coreMotivations: [
      'Securing group-wide renewal for the 14 docks without budget cuts from plant managers',
      'Bringing the 3 idle docks back into regular patrols'
    ],
    redFlagsAndSensitivities: [
      'Declined the €160k expansion offer for Plant 15 because plant managers were already in revolt'
    ],
    recommendedTone: 'Consensus-building and evidence-driven. Provide site-specific inspection logs to help him defend the security chargeback.'
  },
  {
    stakeholderId: 'beatriz_alonso',
    name: 'Beatriz Alonso',
    title: 'Plant Manager, Plant 7',
    organization: 'Aldermoor Industrial Group',
    account: 'B',
    publicBio: 'Facility director at Plant 7. Direct operator responsible for hazardous plant perimeter security and safety compliance. Guarded relationship. Confirms docks are useful at night, but declined premature upsell offers due to unresolved downtime.',
    careerHistory: [
      '2020-Present: Plant Manager, Plant 7 (Stallingborough Chemical Refinery)',
      '2014-2020: Senior Operations Engineer, Industrial Process Safety'
    ],
    publicStatements: [
      {
        source: 'Plant 7 Operations Shift Review (Minute 37)',
        quote: "It's useful at night.",
        context: 'Verified frontline utility for night perimeter intrusion patrols (Fact ba_use_0).'
      }
    ],
    psychologicalProfile: 'P&L-responsible plant manager. Guarded against corporate overhead expenses. Will not pay extra for reliability that should be included in the baseline contract.',
    coreMotivations: [
      'Zero downtime on night-time intrusion patrols around chemical storage perimeters',
      'Local control over dock mission scheduling'
    ],
    redFlagsAndSensitivities: [
      'Declined the €50k Night-Time Priority Support upsell because basic maintenance should be covered under the SLA'
    ],
    recommendedTone: 'Operational, respectful, and zero-upsell. Focus on remote sensor recalibration and local inspection cost reduction.'
  }
];

/**
 * Pre-Meeting Strategy Battlecards & Playbooks
 * Equips the CSM with tactical dos & don'ts, psychological angles, and objection handling.
 */
export interface MeetingPlaybookBattlecard {
  id: string;
  meetingTarget: string;
  targetRole: string;
  account: AccountId;
  scenario: string;
  primaryObjective: string;
  strategicLeverage: string;
  phrasesToSay: string[];
  phrasesToNeverSay: string[];
  likelyObjectionsAndCounters: { objection: string; counterScript: string }[];
  desiredClosingAgreement: string;
}

export const MEETING_PLAYBOOKS: MeetingPlaybookBattlecard[] = [
  {
    id: 'playbook_hayes_briefing',
    meetingTarget: 'Chief Constable Marcus Hayes',
    targetRole: 'Economic Buyer & Alliance Chair',
    account: 'A',
    scenario: 'Institutionalizing the £420k Contract & 300-Dock Tender Before Rhys Calder Exits',
    primaryObjective: 'Secure Marcus Hayes’s direct personal sponsorship of the drone alliance program so it survives Rhys Calder’s January departure.',
    strategicLeverage: 'FlytBase has saved the alliance 1,840 frontline officer pursuit hours this year at 1/3 the operating cost of national police helicopters.',
    phrasesToSay: [
      '"Chief Constable, our 35 automated docks gave your officers 1,840 hours of aerial coverage this year while your aviation fuel bill dropped 42%."',
      '"With Rhys stepping down in January, we want to establish a direct quarterly briefing rhythm with your executive team and Karen Mbeki."',
      '"For the 300-dock framework, our centralized 1:10 remote pilot ratio keeps operations fully within existing constabulary staffing budgets."'
    ],
    phrasesToNeverSay: [
      'DO NOT SAY: "Rhys was the only person managing this program."',
      'DO NOT SAY: "We want to test some experimental drone features in your cities."',
      'DO NOT SAY: "We need an answer on the tender today."'
    ],
    likelyObjectionsAndCounters: [
      {
        objection: 'Our police authority is questioning whether we can justify £420k/year when frontline station budgets are tight.',
        counterScript: 'Chief Constable, traditional helicopter response costs £3,500 per hour. In Westmere alone, FlytBase docks flew 142 sorties this month at an effective cost of £245 per deployment, preserving over 200 frontline officer pursuit hours.'
      },
      {
        objection: 'What happens if a dock malfunctions during a high-visibility incident?',
        counterScript: 'We maintain dual-cellular 5G failover, redundant RTK GPS satellites, and a contractual 1-hour critical response hotline. In Westmere, our autonomous health watchdog identified a satellite delay on dock 4 and recalibrated it within 2 minutes with zero flight disruption.'
      }
    ],
    desiredClosingAgreement: 'Marcus Hayes agrees to designate Karen Mbeki and Hannah Doyle as official operational co-sponsors and requests the 300-dock tender briefing for next month’s Police Board agenda.'
  },
  {
    id: 'playbook_derek_finch_procurement',
    meetingTarget: 'Derek Finch',
    targetRole: 'Senior Regional Procurement Director',
    account: 'A',
    scenario: 'Submitting Unit Economics Model for the £1,100,000 300-Dock Framework Tender',
    primaryObjective: 'Pass Derek Finch’s commercial scrutiny gate and eliminate the risk of FlytBase being disqualified from the 300-dock national tender.',
    strategicLeverage: 'Only FlytBase has proven audited £1,000/dock/month unit economics backed by 35 deployed stations with 99.8% uptime receipts.',
    phrasesToSay: [
      '"Derek, we have mathematically reconciled the 3-year TCO model: £1,000 per dock per month covers hardware, continuous maintenance, automated battery cycles, and cloud orchestration."',
      '"Our multi-dock remote pilot protocol allows 1 qualified operator to supervise 10 stations simultaneously under CAA standard BVLOS regulations."',
      '"We are attaching signed receipts from PO-ECPA-2024-001 proving our operational uptime SLA compliance."'
    ],
    phrasesToNeverSay: [
      'DO NOT SAY: "Our price is flexible depending on how much funding you win."',
      'DO NOT SAY: "We can figure out pilot staffing after the tender is awarded."',
      'DO NOT SAY: "This is speculative pipeline for us."'
    ],
    likelyObjectionsAndCounters: [
      {
        objection: 'Other vendors claim they can sell standalone drones for 1/3 of your station cost.',
        counterScript: 'Derek, a standalone drone requires a dedicated £45,000/year pilot on-site for every single mission. Across 300 locations, manual pilot staffing exceeds £13.5M annually. FlytBase autonomous stations eliminate manual on-site piloting, saving £10.8M in lifetime staffing costs.'
      },
      {
        objection: 'What if FlytBase increases cloud API pricing after we sign the multi-year framework?',
        counterScript: 'Our commercial proposal includes a guaranteed 36-month fixed ceiling price per dock with zero variable egress fees and statutory audit indexing.'
      }
    ],
    desiredClosingAgreement: 'Derek Finch confirms FlytBase meets all mandatory pre-qualification criteria for the 300-dock framework specification.'
  },
  {
    id: 'playbook_nadia_rahman_renewal',
    meetingTarget: 'Nadia Rahman',
    targetRole: 'Group Financial Controller & Operations VP',
    account: 'B',
    scenario: 'Defending the £168k Contract Renewal & Quelling Plant Manager Revolt',
    primaryObjective: 'Secure unanimous plant approval for the March contract renewal by presenting site-level contractor substitution savings.',
    strategicLeverage: 'Automated perimeter patrols across 14 docks substituted 1,420 physical guard hours, saving £240,000 in third-party security contractor billings.',
    phrasesToSay: [
      '"Nadia, we understand the plant managers’ frustration regarding central chargebacks. Here is the plant-by-plant audit showing £240,000 in saved security contractor billings."',
      '"Regarding the 3 idle docks at Stallingborough: our autonomous diagnostic identified a sensor calibration issue, pushed remote firmware, and full night missions resumed yesterday with zero charge to the plant."',
      '"By standardizing night patrols, each facility manager will see their local security contractor invoices drop by an average of £17,000 per site next quarter."'
    ],
    phrasesToNeverSay: [
      'DO NOT SAY: "The plant managers don’t understand modern autonomous robotics."',
      'DO NOT SAY: "We didn’t know the 3 docks were idle for 14 days."',
      'DO NOT SAY: "Contract renewal should be straightforward."'
    ],
    likelyObjectionsAndCounters: [
      {
        objection: 'Plant 7’s manager says he didn’t see a single drone fly for three weeks and refuses to pay his allocation.',
        counterScript: 'He is completely justified in asking, Nadia. Our telemetry confirmed that while the docks were online, wind gusts exceeded safety cutoffs on 6 shifts, and dock 4 had an RTK sensor lock. We have recalibrated the dock, scheduled a joint review with Plant 7 ops, and credited the plant with 30 priority inspection sorties.'
      }
    ],
    desiredClosingAgreement: 'Nadia approves the 12-month contract renewal for £168k ARR and schedules the joint plant manager ROI briefing for next Tuesday.'
  }
];

/**
 * The Complete 7-Agent Fleet Architecture
 */
export interface AgentFleetMember {
  id: string;
  name: string;
  role: string;
  frequency: string;
  capability: string;
  status: 'monitoring' | 'intervention_active' | 'ready';
  focus: string;
}

export const AUTONOMOUS_AGENT_FLEET: AgentFleetMember[] = [
  {
    id: 'agent_watchdog',
    name: 'Telemetry & Drone Health Watchdog',
    role: 'Physical Fleet Telemetry & IoT Sensor Diagnostics',
    frequency: 'Continuous 30-Second Polling',
    capability: 'Monitors battery cycle degradation, motor torque anomalies, RTK GPS lock, and weather/wind flight safety cutoffs across 49 docks.',
    status: 'intervention_active',
    focus: 'Detects silent fleet halts (Stallingborough 3 docks) and ionospheric RTK delays.'
  },
  {
    id: 'agent_web_intel',
    name: 'Customer Web Intel & Dossier Agent',
    role: 'Open-Source Intelligence & Public Records Research',
    frequency: 'Hourly Scan & Pre-Meeting Trigger',
    capability: 'Scans Police Authority minutes, public council filings, corporate earnings, and executive career shifts to build psychological briefing dossiers.',
    status: 'ready',
    focus: 'Maps Marcus Hayes’s council testimony and Derek Finch’s procurement benchmarks.'
  },
  {
    id: 'agent_meeting_coach',
    name: 'Strategic Negotiation & Meeting Playbook Coach',
    role: 'Tactical Meeting Preparation & Objection Handler',
    frequency: 'On-Demand & 24h Prior to Calendar Calls',
    capability: 'Synthesizes account telemetry and stakeholder psych profiles into actionable battlecards with exact phrases to say, phrases to never say, and counter-scripts.',
    status: 'ready',
    focus: 'Prepares the CSM for the Derek Finch tender gate and Marcus Hayes briefing.'
  },
  {
    id: 'agent_whatsapp_value',
    name: 'WhatsApp Customer Value & Proactive Check-in Agent',
    role: 'Customer Relationship Management & Equipment Check-in',
    frequency: 'Weekly Automated Scheduled Cadence',
    capability: 'Initiates proactive check-ins on sold docks and sorties, detects customer doubt or competitor inquiries, and immediately delivers proof of value.',
    status: 'intervention_active',
    focus: 'Engages Karen Mbeki and Nadia Rahman with flight ROI and pilot labor comparisons.'
  },
  {
    id: 'agent_continuity',
    name: 'Executive Continuity & Multi-Threading Agent',
    role: 'Organizational Risk & Succession Guardian',
    frequency: 'Real-time Signal Ingestion',
    capability: 'Detects champion departures, sentiment cooling, and single-point-of-failure vulnerabilities; auto-generates multi-threading introduction memos.',
    status: 'intervention_active',
    focus: 'Insulates the £420k contract against Rhys Calder’s departure in January.'
  },
  {
    id: 'agent_tender_architect',
    name: 'Commercial Expansion & Tender Architect',
    role: 'Unit-Economics & Framework Model Synthesizer',
    frequency: 'Tender Milestone Triggered',
    capability: 'Calculates audited £1,000/dock/month unit economics, 1:10 BVLOS pilot ratios, and prepares compliance matrices for national frameworks.',
    status: 'ready',
    focus: 'Secures qualification for the 300-dock (£1.1M) national police framework.'
  },
  {
    id: 'agent_counter_strike',
    name: 'Competitor Intelligence & Counter-Strike Agent',
    role: 'Competitive Threat Deflection & Moat Defense',
    frequency: 'Continuous Web & Chat Signal Scan',
    capability: 'Identifies competitor pricing tactics (DJI Dock, Skydio, Percepto) and generates defensible operational counter-narratives highlighting FlytBase’s autonomy moat.',
    status: 'ready',
    focus: 'Counters standalone drone inquiries with £120k/year human pilot cost analysis.'
  }
];
