'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, Deal, Character } from '../types/crm';
import { 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  PhoneCall, 
  MessageSquare, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Lock, 
  Activity,
  ArrowRight,
  UserCheck,
  BrainCircuit,
  Volume2
} from 'lucide-react';

interface DealVaultProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
  isDark?: boolean;
}

interface DealAuditActivity {
  id: string;
  type: 'call' | 'whatsapp' | 'contract' | 'telemetry' | 'meeting';
  timestamp: string;
  title: string;
  participant: string;
  summary: string;
  recordingAvailable?: boolean;
  transcriptSnippet?: string;
  receiptId?: string;
}

interface StakeholderDossier {
  name: string;
  role: string;
  account: string;
  personalityType: string;
  coreMotivation: string;
  whatToSay: string;
  whatNeverToSay: string;
  bestContactChannel: string;
  bestTimeToReach: string;
}

export const DealVault: React.FC<DealVaultProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allDeals = currentAccounts.flatMap(a => a.deals);
  const [selectedDealId, setSelectedDealId] = useState<string>(allDeals[0]?.id || 'deal_a_01');
  const [activeSection, setActiveSection] = useState<'explainable' | 'chronology' | 'dossiers'>('explainable');

  const activeDeal = allDeals.find(d => d.id === selectedDealId) || allDeals[0];

  // AI Activity History per deal
  const dealActivities: Record<string, DealAuditActivity[]> = {
    deal_a_01: [
      {
        id: 'act_1',
        type: 'contract',
        timestamp: '14 Nov 2024, 09:00',
        title: 'PO-ECPA-2024-001 Formally Signed & Deposited',
        participant: 'Chief Constable Marcus Hayes',
        summary: 'Official 35-dock enterprise agreement executed at £1,000/dock/month (£420,000 ARR). Binding SLA: 30-min remote triage and 4-hour on-site dispatch.',
        receiptId: 'PO-ECPA-2024-001',
      },
      {
        id: 'act_2',
        type: 'call',
        timestamp: '14 Nov 2026, 09:30',
        title: 'Emergency AI Voice Call: Tactical Air Support Triage',
        participant: 'Inspector Karen Mbeki (Tactical Lead)',
        summary: 'FlytBase AI connected with Inspector Mbeki regarding unanswered ticket for 5 Dec public event. Confirmed high-priority telemetry and engineering standby.',
        recordingAvailable: true,
        transcriptSnippet: 'Karen Mbeki: "That is a huge relief. Thank you for following up proactively before the weekend."',
      },
      {
        id: 'act_3',
        type: 'meeting',
        timestamp: '14 Nov 2026, 11:15',
        title: 'Rhys Calder Successor Governance Briefing',
        participant: 'Rhys Calder & Marcus Hayes',
        summary: 'Marcus Hayes agreed to establish a joint steering committee co-chaired by Inspector Mbeki to institutionalize operations ahead of Rhys departure.',
      },
    ],
    deal_a_tender: [
      {
        id: 'act_4',
        type: 'meeting',
        timestamp: '13 Nov 2026, 14:00',
        title: 'Procurement Gate Review with Derek Finch',
        participant: 'Derek Finch (Senior Procurement Lead)',
        summary: 'Derek challenged the lack of audited unit economics for the 300-dock tender. Demanded comparative operating cost data against police helicopters.',
      },
      {
        id: 'act_5',
        type: 'contract',
        timestamp: '14 Nov 2026, 10:45',
        title: 'Unit-Economics Operating Model Submitted',
        participant: 'CSM Team & Derek Finch',
        summary: 'Audited model submitted showing £1,000/dock/month against £3,500/hr traditional helicopter flight hours. Derek Finch cleared procurement gate.',
        receiptId: 'TENDER-SPEC-300D',
      },
    ],
    deal_b_01: [
      {
        id: 'act_6',
        type: 'contract',
        timestamp: '12 Oct 2023, 10:00',
        title: 'AIG-ENT-2023-88 Master Platform License Executed',
        participant: 'Nadia Rahman (VP Operations)',
        summary: '14 docks deployed across 3 chemical facilities at £168,000 ARR. Annual renewal window set for March 31.',
        receiptId: 'AIG-ENT-2023-88',
      },
      {
        id: 'act_7',
        type: 'telemetry',
        timestamp: '10 Nov 2026, 08:00',
        title: 'Automated Telemetry Alert: 3 Docks Silent at Stallingborough',
        participant: 'Watchdog Telemetry Agent',
        summary: 'Enclosure health verified online, but autonomous sortie departures dropped to zero due to uncoordinated plant contractor scaffolding.',
      },
      {
        id: 'act_8',
        type: 'whatsapp',
        timestamp: '14 Nov 2026, 10:00',
        title: 'WhatsApp Cloud Dispatch: Plant Flight ROI Summary PDF',
        participant: 'Nadia Rahman',
        summary: 'Sent customized facility report proving 84 automated perimeter patrols saved £240k in manual security contractor hours, quelling plant revolt.',
      },
    ],
  };

  // Psychological Dossiers per Account
  const dossiers: Record<string, StakeholderDossier[]> = {
    A: [
      {
        name: 'Chief Constable Marcus Hayes',
        role: 'Economic Buyer & Decision Maker',
        account: 'Eastern Counties Police',
        personalityType: 'Analytical Statesman (Risk-Averse, Public Trust Driven)',
        coreMotivation: 'Crime reduction statistics and preserving public trust while meeting government budget caps.',
        whatToSay: '"Standardized automated air coverage reduces emergency response times across 4 constabularies from 18 minutes to 3 minutes."',
        whatNeverToSay: 'Do NOT talk about experimental beta features or technical jargon; focus entirely on public safety outcomes and verified uptime.',
        bestContactChannel: 'Formal Executive Briefing / Board Pack',
        bestTimeToReach: 'Tuesday or Thursday 09:00 - 10:30 AM',
      },
      {
        name: 'Derek Finch',
        role: 'Commercial Gatekeeper & Procurement Lead',
        account: 'Eastern Counties Police',
        personalityType: 'Compliance Bureaucrat (Audited Numbers, Unit Cost Obsessed)',
        coreMotivation: 'Guaranteed cost efficiency, zero procurement audit failures, and fixed SLA penalties.',
        whatToSay: '"At £1,000 per dock per month, an autonomous FlytBase dock costs £1.38 per flight hour, compared to £3,500 per hour for a police helicopter."',
        whatNeverToSay: 'Do NOT say "we can estimate savings later" or "pricing is negotiable." Present fixed unit economics with audit references.',
        bestContactChannel: 'Formal PDF Model with Signed Precedents',
        bestTimeToReach: 'Monday or Wednesday 14:00 - 16:00',
      },
      {
        name: 'Inspector Karen Mbeki',
        role: 'Tactical Air Support Lead (End User Champion)',
        account: 'Eastern Counties Police',
        personalityType: 'Pragmatic Field Commander (Officer Safety First)',
        coreMotivation: 'Giving officers real-time aerial eyes on the scene during high-risk night pursuits and large public events.',
        whatToSay: '"We have locked in high-priority dock readiness and designated field engineering standby for your Dec 5 public event."',
        whatNeverToSay: 'Do NOT dismiss tickets as "minor software glitches." A drone failure during an armed pursuit risks lives.',
        bestContactChannel: 'Direct Mobile Call / Encrypted WhatsApp',
        bestTimeToReach: 'Early Morning 07:30 - 08:30 or Shift Handover',
      },
    ],
    B: [
      {
        name: 'Nadia Rahman',
        role: 'VP Operations & Budget Approver',
        account: 'Aldermoor Industrial',
        personalityType: 'Executive Pragmatist (Plant Autonomy & Bottom-Line Peace)',
        coreMotivation: 'Maintaining safety board compliance without having plant managers revolt against corporate IT overhead.',
        whatToSay: '"Here is the per-plant breakdown showing Stallingborough alone saved £80,000 in scaffolding inspection costs this quarter."',
        whatNeverToSay: 'Do NOT mandate top-down corporate policies without giving her hard data she can show her angry plant managers.',
        bestContactChannel: 'Executive WhatsApp Briefing & 1-Page PDF',
        bestTimeToReach: 'Friday Afternoon 14:00 - 15:30',
      },
      {
        name: 'Arthur Pendelton',
        role: 'HSE Safety Director',
        account: 'Aldermoor Industrial',
        personalityType: 'Rigid Safety Auditor (Zero-Tolerance for False Alarms)',
        coreMotivation: 'COMAH chemical safety regulations and eliminating manual human inspections in toxic refinery zones.',
        whatToSay: '"FlytBase thermal imaging detects methane and flare-stack heat leaks without sending human technicians onto elevated catwalks."',
        whatNeverToSay: 'Do NOT suggest bypassing plant safety permits or autonomous launches during active chemical transfers.',
        bestContactChannel: 'Formal Engineering Compliance Memo',
        bestTimeToReach: 'Wednesday Morning 10:00 - 11:30',
      },
    ],
  };

  const currentDossiers = dossiers[activeDeal?.account || 'A'] || [];
  const currentActivities = dealActivities[activeDeal?.id] || dealActivities['deal_a_01'];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Deal Vault & AI Explainable Intelligence
              </h3>
            </div>
            <p className={`text-xs font-medium max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              What top 0.000000001% CRM leaders build: Zero-loss activity memory for every commercial agreement, 
              AI explainable win-risk diagnostics, and deep psychological dossiers for every target stakeholder.
            </p>
          </div>

          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 shrink-0 ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-300 bg-gray-50'
          }`}>
            <Lock className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-black dark:text-white">Zero-Loss Deal Memory</span>
          </div>
        </div>

        {/* Deal Selector Bar */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
          {allDeals.map((deal) => {
            const isSelected = selectedDealId === deal.id;
            return (
              <button
                key={deal.id}
                onClick={() => setSelectedDealId(deal.id)}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition flex items-center gap-2 ${
                  isSelected
                    ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                    : isDark ? 'border-gray-800 text-gray-300 hover:text-white' : 'border-gray-300 text-black hover:bg-gray-100'
                }`}
              >
                <span>{deal.title}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isSelected 
                    ? isDark ? 'bg-black text-white' : 'bg-white text-black' 
                    : 'bg-gray-200 text-black'
                }`}>
                  £{( (deal.verifiedValue || deal.value) / 1000 ).toFixed(0)}k
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Navigation: Explainable Report vs Chronology vs Stakeholder Dossiers */}
      <div className={`flex border-b gap-3 text-xs font-bold ${
        isDark ? 'border-gray-800' : 'border-gray-300'
      }`}>
        <button
          onClick={() => setActiveSection('explainable')}
          className={`py-2 px-3 border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'explainable'
              ? isDark ? 'border-white text-white' : 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>1. AI Explainable Deal Diagnostic</span>
        </button>

        <button
          onClick={() => setActiveSection('chronology')}
          className={`py-2 px-3 border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'chronology'
              ? isDark ? 'border-white text-white' : 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4 text-blue-500" />
          <span>2. Complete Touchpoint History ({currentActivities.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('dossiers')}
          className={`py-2 px-3 border-b-2 transition flex items-center gap-1.5 ${
            activeSection === 'dossiers'
              ? isDark ? 'border-white text-white' : 'border-black text-black'
              : 'border-transparent text-gray-500 hover:text-black dark:hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-500" />
          <span>3. Stakeholder Psychological Playbooks ({currentDossiers.length})</span>
        </button>
      </div>

      {/* Section 1: AI Explainable Deal Diagnostic */}
      {activeSection === 'explainable' && activeDeal && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Annual Commercial ARR
              </span>
              <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                £{(activeDeal.verifiedValue || activeDeal.value).toLocaleString()}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                {activeDeal.isVerified ? 'Signed Purchase Order on Record' : 'Prospective Commercial Scope'}
              </span>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                AI Confidence & Health Score
              </span>
              <div className="text-2xl font-bold font-mono text-black dark:text-white">
                {activeDeal.confidenceScore}% <span className="text-xs font-normal text-gray-500">Probability</span>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                Calculated from verified evidence & relationship warmth
              </span>
            </div>

            <div className={`p-5 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
            }`}>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Procurement Audit Status
              </span>
              <div className="text-base font-bold text-black dark:text-white mt-1">
                {activeDeal.isVerified ? 'Fully Cleared & Compliant' : 'Subject to Unit Model'}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">
                Citing: {activeDeal.citations.join(', ')}
              </span>
            </div>

          </div>

          {/* Deep Explainable Narrative */}
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <h4 className="text-base font-bold text-black dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Deal Explainability: Why is this deal at {activeDeal.confidenceScore}%?</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                <strong className="text-sm font-bold text-emerald-600 block mb-2">
                  Positive Drivers (Why we are winning):
                </strong>
                <ul className="space-y-1.5 list-disc list-inside font-medium text-black dark:text-gray-200">
                  <li>Direct champion backing and operational usage across 4 constabularies.</li>
                  <li>Signed purchase order backing £420,000 baseline under PO-ECPA-2024-001.</li>
                  <li>Proven response-time reduction from 18 minutes to 3 minutes for tactical emergency units.</li>
                </ul>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                <strong className="text-sm font-bold text-red-600 block mb-2">
                  Negative Drag Factors (What could kill this deal):
                </strong>
                <ul className="space-y-1.5 list-disc list-inside font-medium text-black dark:text-gray-200">
                  <li>Rhys Calder exit in January creates single point of failure if Marcus Hayes is not engaged.</li>
                  <li>Derek Finch requires audited helicopter replacement unit economics before approving tender.</li>
                  <li>Unresolved Dec 5 public event air support ticket created operational friction with tactical officers.</li>
                </ul>
              </div>
            </div>

            {/* AI Prescribed Next Negotiation Script */}
            <div className={`p-4 rounded-xl border mt-3 ${
              isDark ? 'border-purple-900 bg-[#140e1b]' : 'border-purple-200 bg-purple-50/60'
            }`}>
              <strong className="text-xs uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                AI Prescribed Negotiation Script to Close & Defend:
              </strong>
              <p className="text-xs font-semibold text-black dark:text-white leading-relaxed">
                "Chief Constable Hayes, our 35 docks have delivered 99.4% flight uptime for your tactical air command. 
                With Rhys Calder stepping down, we have co-opted Inspector Karen Mbeki into operational oversight, 
                guaranteeing continuous public safety air coverage while saving £2.4M compared to legacy air support."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Complete Touchpoint History (Chronological Timeline) */}
      {activeSection === 'chronology' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
            <span>Verified Timeline of Calls, Messages & Contracts</span>
            <span>{currentActivities.length} Audited Touchpoints</span>
          </div>

          <div className="space-y-3">
            {currentActivities.map((act) => {
              return (
                <div
                  key={act.id}
                  className={`p-5 rounded-2xl border space-y-3 transition ${
                    isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      {act.type === 'call' && <PhoneCall className="w-4 h-4 text-blue-600" />}
                      {act.type === 'whatsapp' && <MessageSquare className="w-4 h-4 text-emerald-600" />}
                      {act.type === 'contract' && <FileText className="w-4 h-4 text-purple-600" />}
                      {act.type === 'telemetry' && <Activity className="w-4 h-4 text-red-600" />}
                      {act.type === 'meeting' && <Users className="w-4 h-4 text-amber-600" />}
                      
                      <h5 className="font-bold text-sm text-black dark:text-white">
                        {act.title}
                      </h5>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-medium text-gray-500">{act.timestamp}</span>
                      <span className="font-bold text-black dark:text-white">With: {act.participant}</span>
                    </div>
                  </div>

                  <p className="text-xs font-medium text-black dark:text-gray-300 leading-relaxed">
                    {act.summary}
                  </p>

                  {act.transcriptSnippet && (
                    <div className={`p-3 rounded-xl border text-xs font-mono ${
                      isDark ? 'border-gray-800 bg-black text-cyan-300' : 'border-gray-200 bg-gray-50 text-blue-900'
                    }`}>
                      <strong className="block text-[10px] uppercase text-gray-500 mb-1">Live Call Transcript Snippet:</strong>
                      {act.transcriptSnippet}
                    </div>
                  )}

                  {act.receiptId && (
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onSelectCitation?.(act.receiptId!)}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>View Official Contract Paper ({act.receiptId}) →</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: Stakeholder Psychological Playbooks */}
      {activeSection === 'dossiers' && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-1">
            Psychological Playbooks & Targeting Guidance for Key People
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDossiers.map((person, idx) => {
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-4 flex flex-col justify-between ${
                    isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
                      <div>
                        <h4 className="font-bold text-base text-black dark:text-white">
                          {person.name}
                        </h4>
                        <div className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                          {person.role}
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
                        {person.personalityType.split(' ')[0]}
                      </span>
                    </div>

                    <div className="text-xs space-y-2">
                      <div>
                        <strong className="text-gray-500 block uppercase tracking-wider text-[10px]">What Motivates Them:</strong>
                        <p className="font-medium text-black dark:text-gray-200 mt-0.5">{person.coreMotivation}</p>
                      </div>

                      <div className={`p-3 rounded-xl border ${
                        isDark ? 'border-emerald-900 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50'
                      }`}>
                        <strong className="text-emerald-800 dark:text-emerald-300 block font-bold text-[11px]">
                          What to Say (Winning Trigger):
                        </strong>
                        <p className="font-semibold text-black dark:text-white mt-1">{person.whatToSay}</p>
                      </div>

                      <div className={`p-3 rounded-xl border ${
                        isDark ? 'border-red-900 bg-red-950/20' : 'border-red-200 bg-red-50'
                      }`}>
                        <strong className="text-red-800 dark:text-red-300 block font-bold text-[11px]">
                          What to NEVER Say (Tripwire):
                        </strong>
                        <p className="font-semibold text-black dark:text-white mt-1">{person.whatNeverToSay}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <div>
                      <span>Best Channel: </span>
                      <strong className="text-black dark:text-white">{person.bestContactChannel}</strong>
                    </div>
                    <div>
                      <span>Timing: </span>
                      <strong className="text-black dark:text-white">{person.bestTimeToReach}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
