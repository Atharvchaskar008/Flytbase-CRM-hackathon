import { CRMStoreData } from '../types/crm';

export const initialCRMData: CRMStoreData = {
  lastUpdated: new Date().toISOString(),
  lastUpstreamSync: new Date().toISOString(),
  accounts: {
    A: {
      id: 'A',
      name: 'Eastern Counties Police Alliance (Account A)',
      badge: 'Law Enforcement / Emergency Services',
      business: 'Regional police consortium across 4 forces (Westmere, Metro Central, Tarn Valley, Norwold).',
      sold: '35 FlytBase Autonomous Drone-in-a-Box (DiaB) docks installed across forces.',
      whyItMatters: 'Flagship public sector account. 35-dock renewal plus massive 300-dock regional framework tender.',
      handoverNote: "Handover context: Rhys Calder championed the rollout, but he leaves in January! Only Westmere and Metro Central fly operationally. Watch out for the tender spec-lock deadline.",
      contractValue: 280000,
      expansionPotential: 1200000,
      healthScore: 58,
      people: [
        {
          id: 'rhys_calder',
          name: 'Rhys Calder',
          role: 'Alliance Drone Programme Lead (Champion)',
          account: 'A',
          band: 'warm',
          trustScore: 68,
          about: 'Championed the 35-dock deployment. Claims all 4 forces are keen, but he is departing in January with no successor named!',
          isChampion: true,
          isUser: false,
          keyConcerns: 'Legacy calls were with him alone. Urgent transition needed before January departure.'
        },
        {
          id: 'karen_mbeki',
          name: 'Insp. Karen Mbeki',
          role: 'Drone Unit Inspector, Westmere Force',
          account: 'A',
          band: 'guarded',
          trustScore: 42,
          about: 'Runs live missions daily. Logged 14 of 18 flying docks last month. Raised an urgent ticket for 5 Dec public event that nobody answered!',
          isUser: true,
          isDecisionMaker: true,
          keyConcerns: 'Urgent written response needed: pilot training dates and on-call escalation for dock failure before 5 Dec.'
        },
        {
          id: 'hannah_doyle',
          name: 'Hannah Doyle',
          role: 'Alliance Procurement Lead',
          account: 'A',
          band: 'neutral',
          trustScore: 48,
          about: 'Controls the commercial framework. Manages the 300-dock tender specification.',
          isPayer: true,
          isBlocker: true,
          keyConcerns: 'Tender spec locks soon. Requires costed operating model showing who flies 300 docks.'
        }
      ],
      deals: [
        {
          id: 'a_renewal',
          title: 'Annual DiaB Platform License & Support (35 Docks)',
          account: 'A',
          stage: 'identified',
          value: 280000,
          verifiedValue: 280000,
          isVerified: true,
          confidenceScore: 80,
          citations: ['km_usage_1', 'km_value_2', 'flight_log_force_month'],
          deciderId: 'hannah_doyle',
          payerId: 'hannah_doyle',
          blockerId: 'karen_mbeki',
          blockerReason: 'Insp. Mbeki has unanswered support ticket for upcoming 5 Dec event; Tarn Valley and Norwold inactive.',
          unlockCondition: 'Resolve Westmere 5 Dec event support ticket and deliver pilot training plan.',
          targetDate: 'Day 20',
          renewalWindowEnd: 'Day 30'
        },
        {
          id: 'a_tender',
          title: '300-Dock Regional Law Enforcement Framework Tender',
          account: 'A',
          stage: 'identified',
          value: 1200000,
          verifiedValue: 0,
          isVerified: false,
          confidenceScore: 35,
          citations: ['rc_tender_0', 'rc_tender_2'],
          deciderId: 'hannah_doyle',
          payerId: 'hannah_doyle',
          blockerId: 'hannah_doyle',
          blockerReason: 'The tender specification locks soon with no costed operating model and no agreement on who flies 300 docks.',
          unlockCondition: 'Deliver costed operating model with pilot staffing ratios before spec locks.',
          targetDate: 'Spec Lockout'
        },
        {
          id: 'a_westmere',
          title: "Scale Westmere Force Fleet (+12 Docks)",
          account: 'A',
          stage: 'identified',
          value: 96000,
          verifiedValue: 96000,
          isVerified: true,
          confidenceScore: 65,
          citations: ['km_value_2', 'flight_log_force_month'],
          deciderId: 'karen_mbeki',
          payerId: 'hannah_doyle',
          blockerId: 'karen_mbeki',
          blockerReason: 'Mbeki needs proof of response time ROI (12 mins vs 40 mins for helicopter).',
          unlockCondition: 'Provide cost per flight comparison against police helicopter unit.',
          targetDate: 'Day 25'
        }
      ],
      actions: [
        {
          id: 'act_a_1',
          rank: 1,
          title: 'Respond to Insp. Karen Mbeki’s Urgent Event Support Ticket',
          account: 'A',
          dealId: 'a_renewal',
          owner: 'CSM (You) + Support Lead',
          deadline: 'Monday 9:00 AM (Immediate)',
          businessReason: 'Westmere public event is on 5 Dec. Mbeki requested pilot training dates and dock failure hotline in writing. Silence is burning trust.',
          expectedOutcome: 'Mbeki signs off on support protocol and confirms active Westmere renewal sponsorship.',
          evidenceNeeded: ['urgent_request', 'flight_log_force_month'],
          status: 'pending'
        },
        {
          id: 'act_a_2',
          rank: 2,
          title: 'Submit Costed Operating Model to Hannah Doyle Before Spec Lock',
          account: 'A',
          dealId: 'a_tender',
          owner: 'CSM (You) + Solutions Engineering',
          deadline: 'Day 8 (Tender Cutoff)',
          businessReason: 'Tender spec locks imminently. Without an operating model and pilot staffing structure, FlytBase will be excluded.',
          expectedOutcome: 'FlytBase DiaB operating model incorporated into the formal 300-dock tender documentation.',
          evidenceNeeded: ['rc_tender_2', 'km_usage_1'],
          status: 'pending'
        },
        {
          id: 'act_a_3',
          rank: 3,
          title: 'Conduct Succession Transition Meeting with Rhys Calder & Successor',
          account: 'A',
          dealId: 'a_renewal',
          owner: 'CSM (You)',
          deadline: 'Day 12',
          businessReason: 'Calder departs in January. Need introduction to interim lead before relationship intelligence is lost.',
          expectedOutcome: 'Introduction to incoming alliance programme director.',
          evidenceNeeded: ['champion_leaves'],
          status: 'pending'
        }
      ],
      risks: [
        {
          id: 'risk_a_1',
          title: 'Champion Departure Without Succession (Rhys Calder Leaving in Jan)',
          account: 'A',
          severity: 'critical',
          category: 'stakeholder_cold',
          deadlineDate: 'January Handover',
          daysRemaining: 15,
          consequence: 'Calder holds all historical relationship context; if unhedged, new leadership could halt renewal.',
          mitigationPlan: 'Secure immediate multi-stakeholder meeting with Hannah Doyle and Insp. Mbeki to institutionalize contract.',
          owner: 'CSM'
        },
        {
          id: 'risk_a_2',
          title: 'Unanswered Ticket Before Westmere 5 Dec Public Event',
          account: 'A',
          severity: 'critical',
          category: 'technical_blocker',
          deadlineDate: '5 December (Day 18)',
          daysRemaining: 3,
          consequence: 'Insp. Mbeki escalates failure to Police Commissioner; blocks 35-dock renewal recommendation.',
          mitigationPlan: 'Issue formal written confirmation of dedicated standby engineer and training calendar today.',
          owner: 'CSM'
        },
        {
          id: 'risk_a_3',
          title: 'Tender Specification Lockout Without Costed Model',
          account: 'A',
          severity: 'high',
          category: 'deadline_expiry',
          deadlineDate: 'Tender Lockout Window',
          daysRemaining: 7,
          consequence: '300-dock framework locked with competitors or disqualified for lack of operational feasibility.',
          mitigationPlan: 'Present turnkey DiaB operating model drafted with Neel Sharma.',
          owner: 'CSM'
        }
      ],
      blindSpots: [
        {
          id: 'blind_a_1',
          account: 'A',
          question: 'What is the actual cost per flight comparison between FlytBase DiaB and the regional police helicopter?',
          whyItMatters: 'Rhys and Mbeki cite missing person finds (12 mins vs 40 mins), but Hannah Doyle requires hard financial cost-per-flight ROI for the tender.',
          whoCouldAnswer: 'Hannah Doyle (Procurement) or Insp. Karen Mbeki',
          potentialImpact: 'Could disqualify 300-dock framework tender submission.',
          suggestedAsk: 'Request Westmere aviation fuel and air support budget benchmarks from Hannah Doyle.'
        },
        {
          id: 'blind_a_2',
          account: 'A',
          question: 'Why has Tarn Valley never flown a live mission, and why does Norwold only train?',
          whyItMatters: 'If 2 of 4 forces are non-operational, the 35-dock renewal is at 50% utilization risk.',
          whoCouldAnswer: 'Insp. Karen Mbeki or Tarn Valley Force Commander',
          potentialImpact: 'Risk of alliance downsizing contract to only Westmere and Metro Central.',
          suggestedAsk: 'Inquire with Mbeki during the 5 Dec prep call regarding Tarn Valley pilot certification hurdles.'
        }
      ],
      paperwork: [
        {
          id: 'flight_log_force_month',
          account: 'A',
          title: 'Eastern Counties Force Flight Log (Monthly Telemetry)',
          path: 'files/flight_log_force_month.csv',
          type: 'Telemetry Log',
          summary: 'Verified telemetry log confirming 14 of 18 docks active in Westmere/Metro Central. 2 missing person finds in under 12 minutes.',
          keyTakeaways: ['14/18 docks active in Westmere/Metro', 'Tarn Valley zero operational sorties', 'Response speed reduced from 40m to 12m']
        }
      ]
    },
    B: {
      id: 'B',
      name: 'Aldermoor Industrial Group (Account B)',
      badge: 'Manufacturing & Heavy Industry',
      business: 'Industrial conglomerate operating 15 chemical & manufacturing plants with 14 autonomous drone docks.',
      sold: '14 Heavy-Duty FlytBase DiaB units for perimeter security, flare stack monitoring, and nighttime patrols.',
      whyItMatters: 'Anchor industrial account: 14-dock contract renewal plus prospective 40-plant expansion with sister entity.',
      handoverNote: "Handover context: Stefan Roy claims €1.2M ROI and 13/15 flying. However, plants pay a share of the security budget and several plant managers resent it. Telemetry shows 3 docks mysteriously stopped flying in November!",
      contractValue: 245000,
      expansionPotential: 700000,
      healthScore: 52,
      people: [
        {
          id: 'stefan_roy',
          name: 'Stefan Roy',
          role: 'Group Head of Security (Champion)',
          account: 'B',
          band: 'neutral',
          trustScore: 50,
          about: 'Championed the initial 14 docks. Claims €1.2M annual savings, but glosses over operational friction with plant managers.',
          isChampion: true,
          isUser: false,
          keyConcerns: 'Needs formal reporting to convince group CFO and plant managers that drone security is cost-effective.'
        },
        {
          id: 'beatriz_alonso',
          name: 'Beatriz Alonso',
          role: 'Plant Manager, Plant 7',
          account: 'B',
          band: 'guarded',
          trustScore: 36,
          about: 'Direct operator. Says docks are useful at night for perimeter intrusion, but questions downtime and maintenance overhead.',
          isUser: true,
          isDecisionMaker: false,
          keyConcerns: 'Needs night-time priority maintenance SLA and direct control over local dock schedules.'
        },
        {
          id: 'nadia_rahman',
          name: 'Nadia Rahman',
          role: 'Group Financial Controller (Economic Buyer)',
          account: 'B',
          band: 'guarded',
          trustScore: 30,
          about: 'Holds purse strings for security budget allocations. Annoyed by lack of itemized flight-log data to justify cross-plant charges.',
          isPayer: true,
          isBlocker: true,
          keyConcerns: 'Demands plant-by-plant flight logs and verified insurer discount auditing before signing renewal.'
        }
      ],
      deals: [
        {
          id: 'b_renewal',
          title: 'Annual Industrial DiaB Platform License (14 Docks)',
          account: 'B',
          stage: 'identified',
          value: 245000,
          verifiedValue: 245000,
          isVerified: true,
          confidenceScore: 75,
          citations: ['sr_roll_0', 'usage_drop'],
          deciderId: 'nadia_rahman',
          payerId: 'nadia_rahman',
          blockerId: 'nadia_rahman',
          blockerReason: 'Nadia Rahman refuses renewal until FlytBase provides verified plant-level flight log accounting and ROI proof.',
          unlockCondition: 'Deliver plant-by-plant flight reporting package and resolve 3 silent idle docks.',
          targetDate: 'Day 22',
          renewalWindowEnd: 'Day 29'
        },
        {
          id: 'b_idle',
          title: 'Re-activate 3 Idle Docks & Standardize Night Patrols',
          account: 'B',
          stage: 'identified',
          value: 70000,
          verifiedValue: 0,
          isVerified: false,
          confidenceScore: 40,
          citations: ['usage_drop', 'sr_plants_2'],
          deciderId: 'beatriz_alonso',
          payerId: 'nadia_rahman',
          blockerId: 'stefan_roy',
          blockerReason: 'Three docks stayed online but flew zero sorties in past 2 weeks without tickets or alerts.',
          unlockCondition: 'Diagnostic review of telemetry port and local plant manager debrief.',
          targetDate: 'Immediate'
        }
      ],
      actions: [
        {
          id: 'act_b_1',
          rank: 1,
          title: 'Investigate 3 Docks with Silent Telemetry Disconnect (2-29 Nov)',
          account: 'B',
          dealId: 'b_renewal',
          owner: 'CSM (You) + Solutions Architect',
          deadline: 'Monday 10:30 AM',
          businessReason: 'Signal alert reveals 3 high-frequency night-flying docks abruptly halted all missions for 2 weeks while remaining online. Silent churn risk.',
          expectedOutcome: 'Root cause identified (sensor lockout or local operator boycott) and fixed before Nadia Rahman notices.',
          evidenceNeeded: ['usage_drop', 'sr_roll_0'],
          status: 'pending'
        },
        {
          id: 'act_b_2',
          rank: 2,
          title: 'Generate Plant-Level Flight Audit Package for Nadia Rahman',
          account: 'B',
          dealId: 'b_renewal',
          owner: 'CSM (You)',
          deadline: 'Day 10',
          businessReason: 'Plant managers resent central budget allocation. Nadia needs itemized flight hours per plant to justify renewal.',
          expectedOutcome: 'Nadia unfreezes finance hold on annual platform agreement.',
          evidenceNeeded: ['sr_plants_2', 'sr_roi_0'],
          status: 'pending'
        },
        {
          id: 'act_b_3',
          rank: 3,
          title: 'Present Nighttime Patrol Case Study to Beatriz Alonso',
          account: 'B',
          dealId: 'b_idle',
          owner: 'CSM (You) + Stefan Roy',
          deadline: 'Day 14',
          businessReason: 'Turn Beatriz from guarded plant manager into an internal operational advocate.',
          expectedOutcome: 'Beatriz endorses night patrol expansion at plant managers council.',
          evidenceNeeded: ['ba_use_0'],
          status: 'pending'
        }
      ],
      risks: [
        {
          id: 'risk_b_1',
          title: 'Silent Dock Outage: 3 Docks Halted Flights for 2 Weeks',
          account: 'B',
          severity: 'critical',
          category: 'technical_blocker',
          deadlineDate: 'Immediate (29 Nov Log)',
          daysRemaining: 2,
          consequence: 'Undetected operational outage destroys credibility and violates 99% uptime contract commitments.',
          mitigationPlan: 'Dispatch telemetry diagnostic probe to docks and hold technical call with plant leads.',
          owner: 'CSM'
        },
        {
          id: 'risk_b_2',
          title: 'Plant Manager Budget Revolt Led by Finance Controller',
          account: 'B',
          severity: 'high',
          category: 'stakeholder_cold',
          deadlineDate: 'Fiscal Review (Day 20)',
          daysRemaining: 8,
          consequence: 'Nadia Rahman cuts security allocation, forcing Stefan to cancel dock leases at up to 6 plants.',
          mitigationPlan: 'Provide defensible per-plant insurance premium savings audit.',
          owner: 'CSM'
        }
      ],
      blindSpots: [
        {
          id: 'blind_b_1',
          account: 'B',
          question: 'Why did the 3 docks stop flying in mid-November despite staying online?',
          whyItMatters: 'Is this an automated geofence bug, weather sensor failure, or active operator resistance by disgruntled plant staff?',
          whoCouldAnswer: 'Stefan Roy (Head of Security) or Plant 7 Ops Lead',
          potentialImpact: 'Threatens €245,000 contract renewal if perceived as chronic hardware failure.',
          suggestedAsk: 'Contact Stefan Roy and ask for the dispatch logs from the 3 inactive plants.'
        },
        {
          id: 'blind_b_2',
          account: 'B',
          question: 'What is the actual audit basis for Stefan Roy’s €1.2M annual ROI claim?',
          whyItMatters: 'Stefan claims €1.2M saved, but finance controller Nadia Rahman remains guarded and demands proof.',
          whoCouldAnswer: 'Nadia Rahman (Group Finance Controller) or Stefan Roy',
          potentialImpact: 'If ROI is debunked, CFO will reject contract renewal.',
          suggestedAsk: 'Request Nadia’s template for security capital expense depreciation and guard labor substitution.'
        }
      ],
      paperwork: [
        {
          id: 'aldermoor_fleet_summary',
          account: 'B',
          title: 'Aldermoor 15-Plant Fleet Telemetry & Usage Summary',
          path: 'pack/B/all',
          type: 'Fleet Overview',
          summary: 'Overview of 14 DiaB units. Confirms 3 docks ceased operations in weeks 3-4 of November despite active network heartbeat.',
          keyTakeaways: ['14 installed units across 15 plants', '3 docks silent between 2-29 Nov', 'High night-time utility at Plant 7']
        }
      ]
    },
    K: {
      id: 'K',
      name: 'Kestrel Estates (Surprise Account Drop)',
      badge: 'Residential Community & Private Asset Security',
      business: 'Private gated residential estate with 1 autonomous drone dock installed at north entrance, currently 0 flying. Waiting on go-live.',
      sold: '1 FlytBase DiaB North Entrance Unit paid & installed.',
      whyItMatters: 'Surprise account drop! 1 paid dock that has never flown because the installer vanished, no certified pilot is on site, and property insurance has not been notified. Residents board meeting is on the first Monday!',
      handoverNote: "Handover context: Dana Whitfield is excited but assumed the system flies itself without a certified pilot. The local installer vanished and will not answer calls. Insurer Lucy Pratt warns the dock is undeclared. Graham Okafor (Residents Board) doubts why they paid for an idle drone.",
      contractValue: 14000,
      expansionPotential: 28000,
      healthScore: 35,
      people: [
        {
          id: 'k_dana_tbw',
          name: 'Dana Whitfield',
          role: 'Estate Manager (Operational Champion)',
          account: 'K',
          band: 'warm',
          trustScore: 65,
          about: 'Excited about drone security. Wants night patrols of the two estate entrances. Assumed system was fully autonomous without a pilot on site.',
          isChampion: true,
          isUser: true,
          keyConcerns: 'Installer disappeared after testing power/network; no flight commissioning done; needs certified operators.'
        },
        {
          id: 'k_graham_tbw',
          name: 'Graham Okafor',
          role: 'Chair, Residents Board (Economic Buyer & Gatekeeper)',
          account: 'K',
          band: 'neutral',
          trustScore: 45,
          about: 'Controls budget votes. Any spend beyond original purchase needs a vote of the residents board (first Monday of each month). Notes residents doubt why they paid for an idle drone.',
          isPayer: true,
          isDecisionMaker: true,
          isBlocker: true,
          keyConcerns: 'Demands proof of flight utility before authorizing security budget renewal.'
        },
        {
          id: 'k_lucy_tbw',
          name: 'Lucy Pratt',
          role: 'Property Insurance Broker (Compliance Blocker)',
          account: 'K',
          band: 'neutral',
          trustScore: 50,
          about: 'Property insurance policy requires new aerial equipment to be declared before flight operations. Dock is currently undeclared.',
          isBlocker: true,
          keyConcerns: 'Flying without declaration voids property and liability coverage.'
        }
      ],
      deals: [
        {
          id: 'k_golive_tbw',
          title: 'North Entrance Dock Night Patrol Go-Live & Commissioning',
          account: 'K',
          stage: 'qualified',
          value: 14000,
          verifiedValue: 14000,
          isVerified: true,
          confidenceScore: 70,
          citations: ['K_install_note_tbw', 'K_insurance_schedule_tbw', 'k_not_commissioned_tbw'],
          deciderId: 'k_graham_tbw',
          payerId: 'k_graham_tbw',
          blockerId: 'k_lucy_tbw',
          blockerReason: 'Nobody can fly it: no certified pilot, never commissioned, and insurer has not been told.',
          unlockCondition: 'Submit insurance declaration rider and schedule pilot training course.',
          targetDate: 'Before First Monday Board Vote',
          renewalWindowEnd: 'First Monday Meeting'
        },
        {
          id: 'k_training_tbw',
          title: 'Pilot Certification Course for Two Estate Staff',
          account: 'K',
          stage: 'identified',
          value: 4000,
          verifiedValue: 4000,
          isVerified: true,
          confidenceScore: 85,
          citations: ['k_no_pilot_tbw', 'k_training_tbw'],
          deciderId: 'k_dana_tbw',
          payerId: 'k_graham_tbw',
          blockerId: 'k_graham_tbw',
          blockerReason: 'Requires board approval for professional services add-on.',
          unlockCondition: 'Package training into overall go-live certification packet.',
          targetDate: 'Day 5'
        },
        {
          id: 'k_south_tbw',
          title: 'Second DiaB Dock for South Entrance Night Patrol',
          account: 'K',
          stage: 'identified',
          value: 14000,
          verifiedValue: 0,
          isVerified: false,
          confidenceScore: 30,
          citations: ['k_south_wish_tbw', 'k_south_unassessed_tbw'],
          deciderId: 'k_graham_tbw',
          payerId: 'k_graham_tbw',
          blockerId: 'k_dana_tbw',
          blockerReason: 'South entrance was raised at install but never assessed for RF coverage or line-of-sight.',
          unlockCondition: 'Complete North Gate go-live successfully and conduct South Gate RF survey.',
          targetDate: 'Post Go-Live'
        }
      ],
      actions: [
        {
          id: 'act_k_1',
          rank: 1,
          title: 'Deliver North Entrance Go-Live Plan & Insurance Declaration to Dana Whitfield & Lucy Pratt',
          account: 'K',
          dealId: 'k_golive_tbw',
          owner: 'CSM (You) + Compliance Lead',
          deadline: 'Immediate (Before Board Vote)',
          businessReason: 'Residents board meets on the first Monday to vote on security budget. If dock is still idle and uninsured, residents will vote to cancel.',
          expectedOutcome: 'Insurance rider issued by Lucy Pratt; go-live roadmap presented to Dana Whitfield.',
          evidenceNeeded: ['K_insurance_schedule_tbw', 'k_insurer_not_told_tbw'],
          status: 'pending'
        },
        {
          id: 'act_k_2',
          rank: 2,
          title: 'Enroll 2 Estate Staff in FlytBase Certified Drone Pilot Training Course ($4,000)',
          account: 'K',
          dealId: 'k_training_tbw',
          owner: 'CSM (You) + Training Academy Lead',
          deadline: 'Day 5',
          businessReason: 'No estate employee holds a pilot certificate. Dana assumed the system flew autonomously without certified operators.',
          expectedOutcome: 'Two estate personnel certified to legally operate the drone in accordance with CAA regulations.',
          evidenceNeeded: ['k_no_pilot_tbw', 'k_training_tbw'],
          status: 'pending'
        },
        {
          id: 'act_k_3',
          rank: 3,
          title: 'Present Night Entrance Patrol ROI to Graham Okafor & Residents Board',
          account: 'K',
          dealId: 'k_golive_tbw',
          owner: 'CSM (You)',
          deadline: 'First Monday Meeting',
          businessReason: 'Graham warned that residents already complain about paying for an idle drone. Need to demonstrate entrance intrusion prevention.',
          expectedOutcome: 'Residents board votes to renew security funding and clears path for South Gate dock expansion.',
          evidenceNeeded: ['k_board_doubts_tbw', 'k_board_pays_tbw'],
          status: 'pending'
        }
      ],
      risks: [
        {
          id: 'risk_k_1',
          title: 'Residents Board Budget Rejection for Idle Drone',
          account: 'K',
          severity: 'critical',
          category: 'contract_stalemate',
          deadlineDate: 'First Monday Board Meeting',
          daysRemaining: 7,
          consequence: 'Residents vote to defund security drone program and demand refund for un-commissioned dock.',
          mitigationPlan: 'Present immediate night patrol go-live schedule and pilot certification confirmation at board meeting.',
          owner: 'CSM (You)'
        },
        {
          id: 'risk_k_2',
          title: 'Uninsured Aerial Operations Compliance Breach',
          account: 'K',
          severity: 'critical',
          category: 'technical_blocker',
          deadlineDate: 'Before First Sortie',
          daysRemaining: 3,
          consequence: 'Flying drone without notifying insurer voids estate property insurance and violates FlytBase operating terms.',
          mitigationPlan: 'File formal aerial equipment declaration with Lucy Pratt before test flight.',
          owner: 'Compliance Lead'
        }
      ],
      blindSpots: [
        {
          id: 'blind_k_1',
          account: 'K',
          question: 'Why did the local installer leave without conducting a test flight or commissioning the dock?',
          whyItMatters: 'Could indicate unrecorded electrical or network faults at the North Gate installation.',
          whoCouldAnswer: 'Dana Whitfield (Estate Manager) or Installer Handover Note (K_install_note_tbw)',
          potentialImpact: 'Hidden hardware failure could delay go-live past board meeting.',
          suggestedAsk: 'Review installer note K_install_note_tbw and dispatch certified FlytBase field engineer for inspection.'
        },
        {
          id: 'blind_k_2',
          account: 'K',
          question: 'What specific security incidents happened at the North and South entrances that motivated the purchase?',
          whyItMatters: 'Dana wants entrance night patrols; aligning flight paths directly to past intrusion points ensures resident approval.',
          whoCouldAnswer: 'Dana Whitfield or Graham Okafor',
          potentialImpact: 'Ensures drone patrol missions solve the residents exact security pain point.',
          suggestedAsk: 'Ask Dana for incident log of unauthorized vehicle entries at north gate over past 6 months.'
        }
      ],
      paperwork: [
        {
          id: 'K_install_note_tbw',
          account: 'K',
          title: 'Installer Handover & Commissioning Note (North Entrance)',
          path: 'drops/K/files/K_install_note_tbw',
          type: 'Installation Report',
          summary: 'Confirms electrical power and ethernet network tested at north gate. Test flight deferred due to absence of certified pilot on site. South gate identified but unassessed.',
          keyTakeaways: ['Power and network nominal at north gate', 'No test flight conducted (no pilot on site)', 'Installer departed without completing commissioning', 'South gate unassessed']
        },
        {
          id: 'K_insurance_schedule_tbw',
          account: 'K',
          title: 'Property Insurance Policy Schedule (Aerial Equipment Rider)',
          path: 'drops/K/files/K_insurance_schedule_tbw',
          type: 'Insurance Policy Rider',
          summary: 'Extract of commercial property policy. Explicitly mandates formal declaration of any unmanned aerial systems prior to flight operations.',
          keyTakeaways: ['Mandatory aerial equipment rider requirement', 'Dock is currently undeclared', 'Failure to declare voids third-party liability coverage']
        }
      ]
    }
  },
  signals: [
    {
      id: 'kestrel_drop',
      account: 'K',
      dated: '2026-11-14',
      title: 'Kestrel Estates: Surprise Account Drop - 1 Dock Paid, 0 Flying',
      summary: 'Surprise account assigned! 1 North Entrance dock installed and paid ($14,000), but 0 flights logged. Installer vanished, no certified pilot on site, and property insurance has not been notified. Residents board meeting is on the first Monday.',
      impactLevel: 'high',
      read: false
    },
    {
      id: 'champion_leaves',
      account: 'A',
      dated: '2026-11-17',
      title: 'Eastern Counties: Rhys Calder is moving on',
      summary: 'Rhys Calder emailed to state he leaves the drone programme in January. No successor named. Every historical call was with him alone.',
      impactLevel: 'high',
      read: false
    },
    {
      id: 'urgent_request',
      account: 'A',
      dated: '2026-11-18',
      title: 'Eastern Counties: Westmere needs an answer before 5 Dec public event',
      summary: 'Insp. Karen Mbeki logged an urgent ticket ahead of 5 Dec event. Demands operator training dates and on-call dock failure support in writing. Nobody has replied!',
      impactLevel: 'high',
      read: false
    },
    {
      id: 'usage_drop',
      account: 'B',
      dated: '2026-11-30',
      title: 'Aldermoor: three docks that fly most nights have stopped',
      summary: 'Weekly usage for 2-29 Nov reveals 3 docks that flew most nights flew zero sorties in the last two weeks while staying online. No ticket has been raised.',
      impactLevel: 'high',
      read: false
    }
  ],
  notes: [
    {
      id: 'note_101',
      account: 'A',
      kind: 'risk',
      title: 'Rhys Calder January Departure',
      text: 'Calder moving in January. Urgent transition meeting required with Hannah Doyle and Insp. Mbeki before handover.',
      created_at: new Date().toISOString()
    },
    {
      id: 'note_102',
      account: 'B',
      kind: 'next_step',
      title: 'Investigate 3 silent docks',
      text: 'Signals confirm 3 docks halted flights in Nov. Need diagnostic check on telemetry and operator shift logs.',
      created_at: new Date().toISOString()
    }
  ]
};
