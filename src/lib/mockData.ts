import { CRMStoreData } from '../types/crm';

export const initialCRMData: CRMStoreData = {
  lastUpdated: new Date().toISOString(),
  lastUpstreamSync: new Date().toISOString(),
  accounts: {
    A: {
      id: 'A',
      name: 'Metro Police Alliance (Account A)',
      badge: 'Public Sector / Emergency Services',
      business: 'Regional police consortium operating rapid-response surveillance and perimeter security.',
      sold: '4 FlytBase Autonomous Drone-in-a-Box (DiaB) Docks deployed at regional stations.',
      whyItMatters: 'Flagship law enforcement account. Renewal of $240,000 ARR in 30 days plus expansion to 8 docks ($480,000 total).',
      handoverNote: "Sam's note: Chief Inspector Davies championed the initial buy, but Deputy Miller holds the real purse strings. Miller is skeptical about BVLOS regulatory sign-offs. Watch out for the upcoming spec-lock on Day 20.",
      contractValue: 240000,
      expansionPotential: 240000,
      healthScore: 68,
      people: [
        {
          id: 'person_chief_davies',
          name: 'Chief Inspector Marcus Davies',
          role: 'Operations Lead & Champion',
          account: 'A',
          band: 'warm',
          trustScore: 72,
          about: 'Championed the original dock purchase. Loves the response time reduction from 14 mins to 3 mins.',
          isChampion: true,
          isUser: true,
          keyConcerns: 'Needs field operational data to justify station expansion.'
        },
        {
          id: 'person_deputy_miller',
          name: 'Deputy Commissioner Helen Miller',
          role: 'Economic Buyer & Approver',
          account: 'A',
          band: 'guarded',
          trustScore: 38,
          about: 'Holds final budget sign-off. Skeptical of tech hype and requires strict compliance audits.',
          isPayer: true,
          isDecisionMaker: true,
          keyConcerns: 'Civil aviation authority BVLOS waiver renewal and data privacy governance.'
        },
        {
          id: 'person_sergeant_chen',
          name: 'Staff Sergeant Leo Chen',
          role: 'Drone Program Lead / Technical Pilot',
          account: 'A',
          band: 'warm',
          trustScore: 80,
          about: 'Daily operator of the FlytBase console. Super enthusiastic but struggling with dock heater failure in freezing rain.',
          isUser: true,
          keyConcerns: 'Dock 2 weather sealing issue and automated dispatch API integration.'
        },
        {
          id: 'person_procurement_ward',
          name: 'Rachel Ward',
          role: 'Head of Procurement',
          account: 'A',
          band: 'neutral',
          trustScore: 45,
          about: 'Enforces the procurement framework. Will freeze renewal if SLA credits from Q2 are not reconciled.',
          isBlocker: true,
          isDecisionMaker: false,
          keyConcerns: 'Requires formal renewal quote 15 days before fiscal cutoff.'
        }
      ],
      deals: [
        {
          id: 'deal_a_renewal',
          title: 'Annual DiaB Software & Support Renewal (4 Docks)',
          account: 'A',
          stage: 'qualified',
          value: 240000,
          verifiedValue: 240000,
          isVerified: true,
          confidenceScore: 85,
          citations: ['file_contract_mpa_2025', 'person_deputy_miller', 'person_procurement_ward'],
          deciderId: 'person_deputy_miller',
          payerId: 'person_deputy_miller',
          blockerId: 'person_procurement_ward',
          blockerReason: 'Procurement holds the tender paperwork until FlytBase delivers proof of BVLOS waiver compliance.',
          unlockCondition: 'Deliver verified BVLOS waiver paperwork and resolve Dock 2 winter heating SLA credit.',
          targetDate: 'Day 22',
          renewalWindowEnd: 'Day 30'
        },
        {
          id: 'deal_a_expansion',
          title: 'Phase II Regional Highway Expansion (4 Additional Docks)',
          account: 'A',
          stage: 'identified',
          value: 240000,
          verifiedValue: 180000,
          isVerified: false,
          confidenceScore: 50,
          citations: ['file_q3_expansion_brief', 'person_chief_davies'],
          deciderId: 'person_deputy_miller',
          payerId: 'person_deputy_miller',
          blockerId: 'person_deputy_miller',
          blockerReason: 'Deputy Miller has not committed budget until Phase I ROI and incident reports are verified.',
          unlockCondition: 'Executive summary linking 68 emergency responses directly to dock deployment.',
          targetDate: 'Day 28'
        }
      ],
      actions: [
        {
          id: 'act_a_1',
          rank: 1,
          title: 'Deliver BVLOS Regulatory Exemption & Security Dossier to Miller',
          account: 'A',
          dealId: 'deal_a_renewal',
          owner: 'CSM (You) + Neel Sharma',
          deadline: 'Day 8 (Monday 9:00 AM)',
          businessReason: 'Unblocks procurement freeze and addresses Deputy Miller’s primary hurdle for renewal.',
          expectedOutcome: 'Dep. Miller confirms economic sign-off and authorizes Procurement to issue purchase order.',
          evidenceNeeded: ['file_bvlos_exemption_cert', 'file_iso27001_audit'],
          status: 'pending'
        },
        {
          id: 'act_a_2',
          rank: 2,
          title: 'Schedule Joint Technical Review on Dock 2 Weatherproofing',
          account: 'A',
          dealId: 'deal_a_renewal',
          owner: 'CSM (You) + Hardware Support Team',
          deadline: 'Day 11',
          businessReason: 'Resolves Sgt. Chen’s heater failure grievance before it impacts Q3 uptime SLA.',
          expectedOutcome: 'Signed sign-off note on dock heater replacement kit.',
          evidenceNeeded: ['file_dock_telemetry_log_02'],
          status: 'pending'
        },
        {
          id: 'act_a_3',
          rank: 3,
          title: 'Draft Phase I Law Enforcement Incident Metrics Deck for Chief Davies',
          account: 'A',
          dealId: 'deal_a_expansion',
          owner: 'CSM (You)',
          deadline: 'Day 15',
          businessReason: 'Arms Chief Davies with hard telemetry proof to defend the $240k expansion request.',
          expectedOutcome: 'Joint presentation scheduled with Deputy Miller.',
          evidenceNeeded: ['file_dispatch_time_stats_q2'],
          status: 'pending'
        }
      ],
      risks: [
        {
          id: 'risk_a_1',
          title: 'Spec Lockout & Procurement Tender Expiration',
          account: 'A',
          severity: 'critical',
          category: 'deadline_expiry',
          deadlineDate: 'Day 20',
          daysRemaining: 7,
          consequence: 'If renewal documents are not countersigned by Day 20, contract reverts to competitive public tender.',
          mitigationPlan: 'Fast-track legal review with FlytBase leadership (Neel) by Day 10.',
          owner: 'CSM'
        },
        {
          id: 'risk_a_2',
          title: 'Deputy Miller Cold Sentiment on Aerial Surveillance Privacy',
          account: 'A',
          severity: 'high',
          category: 'stakeholder_cold',
          deadlineDate: 'Day 14',
          daysRemaining: 9,
          consequence: 'Miller could refuse meeting if questions feel pushy or technical rather than governance-focused.',
          mitigationPlan: 'Coordinate through Chief Davies; provide executive summary on GDPR/camera masking.',
          owner: 'CSM'
        }
      ],
      blindSpots: [
        {
          id: 'blind_a_1',
          account: 'A',
          question: 'What exact SLA credit amount is Procurement Officer Ward demanding for the Dock 2 downtime?',
          whyItMatters: 'Without agreeing on this credit upfront, Ward will not release the renewal PO.',
          whoCouldAnswer: 'Rachel Ward (Procurement) or Neel Sharma (FlytBase Internal)',
          potentialImpact: 'Stalls $240,000 renewal over an estimated $6,000 credit dispute.',
          suggestedAsk: 'Review Q2 invoice logs with Neel, then present formal credit memo to Ward on Day 9.'
        },
        {
          id: 'blind_a_2',
          account: 'A',
          question: 'Has the regional police union approved automated drone patrol schedules for Night Shift?',
          whyItMatters: 'Phase II expansion depends on 24/7 autonomous patrol capability.',
          whoCouldAnswer: 'Staff Sergeant Leo Chen',
          potentialImpact: 'Could delay 4-dock expansion by 6 months.',
          suggestedAsk: 'Discuss union consultation timeline with Sgt. Chen during technical review.'
        }
      ],
      paperwork: [
        {
          id: 'file_contract_mpa_2025',
          account: 'A',
          title: 'Master Services Agreement & Dock Schedule (MPA-2024-09)',
          path: '/pack/A/contracts/msa_2024.pdf',
          type: 'Contract',
          summary: 'Original 12-month agreement covering 4 FlytBase DiaB docks, valued at $240k/yr. Automatic expiration on Day 30.',
          keyTakeaways: ['Requires 30 days notice for non-renewal', '99.5% uptime SLA guarantee', 'Specifies BVLOS certification requirement']
        },
        {
          id: 'file_bvlos_exemption_cert',
          account: 'A',
          title: 'Civil Aviation Authority BVLOS Exemption Certificate',
          path: '/pack/A/compliance/caa_bvlos_cert.pdf',
          type: 'Compliance',
          summary: 'Certified waiver allowing autonomous flights beyond visual line of sight within police geofenced zones.',
          keyTakeaways: ['Valid through 2027', 'Requires monthly telemetry export to authority']
        }
      ]
    },
    B: {
      id: 'B',
      name: 'Apex Industrial Resources (Account B)',
      badge: 'Mining & Critical Infrastructure',
      business: 'Global mining conglomerate using autonomous docks for automated stockpile volumetrics and pit safety.',
      sold: '6 Heavy-Duty FlytBase Docks at remote open-pit mining operations.',
      whyItMatters: 'Massive enterprise account: $360,000 current ARR, with a pending multi-site expansion worth $600,000 (10 additional docks).',
      handoverNote: "Sam's note: Site Director Vikram Rao loves the system, but the Global IT Security team (Elena Vance) is threatening to disconnect docks due to unapproved cloud telemetry. Fix the IT firewall hurdle immediately.",
      contractValue: 360000,
      expansionPotential: 600000,
      healthScore: 61,
      people: [
        {
          id: 'person_vikram_rao',
          name: 'Vikram Rao',
          role: 'General Manager - Mining Operations',
          account: 'B',
          band: 'ally',
          trustScore: 84,
          about: 'Direct sponsor. Says FlytBase automated surveys saved them 40 man-hours a week in surveyor safety hazard avoidance.',
          isChampion: true,
          isUser: true,
          keyConcerns: 'Cannot afford operational downtime if IT cuts network connection.'
        },
        {
          id: 'person_elena_vance',
          name: 'Elena Vance',
          role: 'VP Global Enterprise IT & Cyber Security',
          account: 'B',
          band: 'guarded',
          trustScore: 32,
          about: 'Fiercely protective of industrial control systems (ICS/SCADA). Threatens to blacklist drone dock IP range.',
          isBlocker: true,
          isDecisionMaker: true,
          keyConcerns: 'Cloud data sovereignty and local on-prem edge telemetry gateway support.'
        },
        {
          id: 'person_cfo_hartmann',
          name: 'Christian Hartmann',
          role: 'Chief Financial Officer',
          account: 'B',
          band: 'neutral',
          trustScore: 50,
          about: 'Sign-off on all capital expenditures over $250k. Focused on pay-back period and insurance discount leverage.',
          isPayer: true,
          isDecisionMaker: true,
          keyConcerns: 'Needs verified volumetric precision report to claim insurance safety premium reductions.'
        },
        {
          id: 'person_kavita_survey',
          name: 'Kavita Patel',
          role: 'Chief Surveyor & Drone Pilot in Command',
          account: 'B',
          band: 'warm',
          trustScore: 78,
          about: 'Runs the volumetric analysis daily. Needs cloud photogrammetry processing pipeline to speed up.',
          isUser: true,
          keyConcerns: 'Survey upload latency on remote satellite uplink.'
        }
      ],
      deals: [
        {
          id: 'deal_b_renewal',
          title: 'Annual Enterprise DiaB Platform License (6 Remote Sites)',
          account: 'B',
          stage: 'qualified',
          value: 360000,
          verifiedValue: 360000,
          isVerified: true,
          confidenceScore: 80,
          citations: ['file_apex_contract_2024', 'person_vikram_rao', 'person_cfo_hartmann'],
          deciderId: 'person_cfo_hartmann',
          payerId: 'person_cfo_hartmann',
          blockerId: 'person_elena_vance',
          blockerReason: 'VP Security Elena Vance has issued a conditional freeze pending SOC2 and on-prem gateway roadmap.',
          unlockCondition: 'Deliver FlytBase Edge Gateway architecture doc and SOC2 Type II compliance pack.',
          targetDate: 'Day 21',
          renewalWindowEnd: 'Day 29'
        },
        {
          id: 'deal_b_expansion',
          title: 'Global Fleet Expansion: 10 Docks across Western Australia Mines',
          account: 'B',
          stage: 'identified',
          value: 600000,
          verifiedValue: 600000,
          isVerified: true,
          confidenceScore: 65,
          citations: ['file_apex_capital_allocation_memo', 'person_vikram_rao', 'person_cfo_hartmann'],
          deciderId: 'person_cfo_hartmann',
          payerId: 'person_cfo_hartmann',
          blockerId: 'person_elena_vance',
          blockerReason: 'Expansion capital cannot be unlocked while security architecture remains unapproved.',
          unlockCondition: 'Executive endorsement from Hartmann following IT security sign-off from Vance.',
          targetDate: 'Day 26'
        }
      ],
      actions: [
        {
          id: 'act_b_1',
          rank: 1,
          title: 'Provide Edge Gateway & Isolated VLAN Blueprint to Elena Vance',
          account: 'B',
          dealId: 'deal_b_renewal',
          owner: 'CSM (You) + Solutions Architect',
          deadline: 'Day 7 (Monday 10:30 AM)',
          businessReason: 'Neutralizes the single active blocker to both renewal and expansion.',
          expectedOutcome: 'Vance lifts the cybersecurity conditional freeze and approves dock MAC addresses.',
          evidenceNeeded: ['file_edge_gateway_spec', 'file_soc2_compliance_report'],
          status: 'pending'
        },
        {
          id: 'act_b_2',
          rank: 2,
          title: 'Submit Automated Volumetric Precision & Insurance Audit to CFO Hartmann',
          account: 'B',
          dealId: 'deal_b_expansion',
          owner: 'CSM (You) + Vikram Rao',
          deadline: 'Day 12',
          businessReason: 'Gives Hartmann the financial justification to approve the $600k 10-dock expansion.',
          expectedOutcome: 'Board capital expenditure committee approves project funding.',
          evidenceNeeded: ['file_survey_precision_audit_q2'],
          status: 'pending'
        },
        {
          id: 'act_b_3',
          rank: 3,
          title: 'Deploy Satellite Uplink Compression Protocol for Kavita Patel',
          account: 'B',
          dealId: 'deal_b_renewal',
          owner: 'CSM (You) + FlytBase Engineering',
          deadline: 'Day 16',
          businessReason: 'Increases end-user surveyor NPS and reduces daily point cloud sync times from 4 hrs to 45 mins.',
          expectedOutcome: 'Signed customer satisfaction validation statement.',
          evidenceNeeded: ['file_dock_firmware_v3_notes'],
          status: 'pending'
        }
      ],
      risks: [
        {
          id: 'risk_b_1',
          title: 'Corporate IT Blacklist of Dock IP Telemetry Subnet',
          account: 'B',
          severity: 'critical',
          category: 'technical_blocker',
          deadlineDate: 'Day 13',
          daysRemaining: 4,
          consequence: 'Docks will lose cloud command & telemetry connection, halting all automated flight ops.',
          mitigationPlan: 'Emergency call with Elena Vance with proposed private APN / edge broker isolation architecture.',
          owner: 'CSM'
        },
        {
          id: 'risk_b_2',
          title: 'Capital Budget Allocation Closes for Fiscal Year',
          account: 'B',
          severity: 'high',
          category: 'deadline_expiry',
          deadlineDate: 'Day 25',
          daysRemaining: 12,
          consequence: 'If 10-dock expansion is not signed by Day 25, Capex funds will be swept to haul truck electrification.',
          mitigationPlan: 'Hold CFO business review with Hartmann by Day 14.',
          owner: 'CSM'
        }
      ],
      blindSpots: [
        {
          id: 'blind_b_1',
          account: 'B',
          question: 'Does Hartmann require third-party actuarial certification for the mine inspection safety savings?',
          whyItMatters: 'If required, actuarial review takes 3 weeks and must be commissioned immediately.',
          whoCouldAnswer: 'Christian Hartmann (CFO) or Vikram Rao',
          potentialImpact: 'Could push $600k contract signing past the Capex fiscal deadline.',
          suggestedAsk: 'Ask Vikram Rao during tomorrow’s check-in whether Hartmann accepted last year’s internal safety audit.'
        },
        {
          id: 'blind_b_2',
          account: 'B',
          question: 'Are the 10 expansion docks targeted for existing pits or newly acquired greenfield tenements?',
          whyItMatters: 'Greenfield sites require solar/battery generator trailers which affect docking hardware lead time.',
          whoCouldAnswer: 'Kavita Patel (Chief Surveyor)',
          potentialImpact: 'Hardware delivery SLA risk if lead times exceed 8 weeks.',
          suggestedAsk: 'Review site readiness list with Kavita.'
        }
      ],
      paperwork: [
        {
          id: 'file_apex_contract_2024',
          account: 'B',
          title: 'Apex Mining Master Autonomous Fleet Agreement (FLYT-APEX-88)',
          path: '/pack/B/contracts/master_agreement.pdf',
          type: 'Contract',
          summary: 'Agreement for 6 heavy-duty DiaB units across 3 open pits. $360,000 annual recurring platform fee.',
          keyTakeaways: ['Includes enterprise 24/7 telemetry support', 'Customer responsible for site network connectivity']
        },
        {
          id: 'file_soc2_compliance_report',
          account: 'B',
          title: 'FlytBase SOC2 Type II Security & Data Sovereignty Certification',
          path: '/pack/B/security/soc2_type2.pdf',
          type: 'Security',
          summary: 'Independent audit verifying encryption at rest (AES-256), in transit (TLS 1.3), and zero-trust edge deployment.',
          keyTakeaways: ['Zero telemetry egress without client token', 'Satisfies enterprise ISO 27001 requirements']
        }
      ]
    }
  },
  signals: [
    {
      id: 'sig_101',
      account: 'A',
      dated: 'Day 4, 14:20',
      title: 'Civil Aviation Authority Issues Updated BVLOS Notice',
      summary: 'Regulator published advisory 2026-08 requiring all emergency services DiaB operators to file quarterly flight risk assessments.',
      impactLevel: 'medium',
      read: true
    },
    {
      id: 'sig_102',
      account: 'B',
      dated: 'Day 5, 09:15',
      title: 'Apex Internal IT Security Alert Flagged on Telemetry Port 8883',
      summary: 'Elena Vance’s team logged unauthenticated MQTT probe from Dock 4. Temporary firewall rule applied pending review.',
      impactLevel: 'high',
      read: false
    },
    {
      id: 'sig_103',
      account: 'A',
      dated: 'Day 6, 11:45',
      title: 'Deputy Miller Attending Police Commissioner Council Next Tuesday',
      summary: 'Miller will present regional fleet budget. If FlytBase renewal is not submitted beforehand, discussion will be deferred.',
      impactLevel: 'high',
      read: false
    }
  ],
  notes: [
    {
      id: 'note_001',
      account: 'A',
      kind: 'next_step',
      title: 'Send BVLOS certification to Deputy Miller',
      text: 'Drafted email citing file_bvlos_exemption_cert. Handover to Neel for sign-off.',
      created_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'note_002',
      account: 'B',
      kind: 'risk',
      title: 'Vance firewall rule active',
      text: 'Need to supply isolated edge gateway configuration before Day 13.',
      created_at: new Date(Date.now() - 1800000).toISOString()
    }
  ]
};
