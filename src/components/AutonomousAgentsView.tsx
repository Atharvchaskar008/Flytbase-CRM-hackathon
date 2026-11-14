'use client';

import React, { useState } from 'react';
import { 
  AgentInsight, 
  STAKEHOLDER_WEB_DOSSIERS, 
  MEETING_PLAYBOOKS, 
  AUTONOMOUS_AGENT_FLEET 
} from '../lib/agents';
import { AccountId } from '../types/crm';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  PhoneCall, 
  MessageSquare, 
  Play, 
  Pause, 
  Volume2, 
  Lock, 
  Unlock, 
  Check, 
  FileText,
  Activity,
  ArrowRight,
  Globe,
  Search,
  BookOpen,
  Users,
  Target,
  Zap,
  CheckSquare,
  ShieldCheck
} from 'lucide-react';

interface AutonomousAgentsViewProps {
  insights: AgentInsight[];
  selectedAccount: AccountId | 'ALL';
  onDeployAction?: (insight: AgentInsight) => void;
  isDark?: boolean;
}

interface CallSimulationState {
  activeCallId: number | null;
  status: 'idle' | 'dialing' | 'connected' | 'completed';
  isPlayingAudio: boolean;
  transcript: string[];
}

export const AutonomousAgentsView: React.FC<AutonomousAgentsViewProps> = ({
  insights,
  selectedAccount,
  onDeployAction,
  isDark = false,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'fleet' | 'webintel' | 'playbooks' | 'dispatch'>('fleet');
  const [selectedDossierId, setSelectedDossierId] = useState<string>('chief_hayes');
  const [selectedPlaybookId, setSelectedPlaybookId] = useState<string>('playbook_hayes_briefing');

  const [requirePermission, setRequirePermission] = useState(true);
  const [authorizedDispatches, setAuthorizedDispatches] = useState<Record<number, { type: 'voice' | 'whatsapp'; timestamp: string }>>({});
  const [callState, setCallState] = useState<CallSimulationState>({
    activeCallId: null,
    status: 'idle',
    isPlayingAudio: false,
    transcript: [],
  });

  const filteredInsights = selectedAccount === 'ALL'
    ? insights
    : insights.filter(i => i.accountId === selectedAccount);

  const filteredDossiers = selectedAccount === 'ALL'
    ? STAKEHOLDER_WEB_DOSSIERS
    : STAKEHOLDER_WEB_DOSSIERS.filter(d => d.account === selectedAccount);

  const activeDossier = filteredDossiers.find(d => d.stakeholderId === selectedDossierId) || filteredDossiers[0] || STAKEHOLDER_WEB_DOSSIERS[0];

  const filteredPlaybooks = selectedAccount === 'ALL'
    ? MEETING_PLAYBOOKS
    : MEETING_PLAYBOOKS.filter(p => p.account === selectedAccount);

  const activePlaybook = filteredPlaybooks.find(p => p.id === selectedPlaybookId) || filteredPlaybooks[0] || MEETING_PLAYBOOKS[0];

  const handleAuthorizeVoiceCall = (idx: number, insight: AgentInsight) => {
    setCallState({
      activeCallId: idx,
      status: 'dialing',
      isPlayingAudio: false,
      transcript: ['Initiating encrypted AI voice connection...'],
    });

    setTimeout(() => {
      setCallState({
        activeCallId: idx,
        status: 'connected',
        isPlayingAudio: true,
        transcript: [
          'FlytBase AI Agent: "Hello, is this Inspector Karen Mbeki?"',
          'Karen Mbeki: "Yes, speaking. I am in the middle of preparing tactical air operations for Dec 5."',
          'FlytBase AI Agent: "Understood, Inspector. We detected your unanswered ticket regarding dock priority. We have verified your 35 docks are scheduled with priority telemetry for Dec 5, and our field engineer is on standby."',
          'Karen Mbeki: "That is a huge relief. Thank you for following up proactively before the weekend."',
        ],
      });
    }, 2000);

    setTimeout(() => {
      setCallState(prev => ({
        ...prev,
        status: 'completed',
        isPlayingAudio: false,
      }));
      setAuthorizedDispatches(prev => ({
        ...prev,
        [idx]: { type: 'voice', timestamp: new Date().toLocaleTimeString() }
      }));
      onDeployAction?.(insight);
    }, 5000);
  };

  const handleAuthorizeWhatsApp = (idx: number, insight: AgentInsight) => {
    setAuthorizedDispatches(prev => ({
      ...prev,
      [idx]: { type: 'whatsapp', timestamp: new Date().toLocaleTimeString() }
    }));
    onDeployAction?.(insight);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header & Sub-Navigation */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Autonomous CSM Agent Fleet & Intelligence Suite
                </h3>
                <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  7 background autonomous agents working simultaneously for the Customer Success Manager.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 dark:bg-black p-1.5 rounded-xl border border-gray-300 dark:border-gray-800">
            <button
              onClick={() => setActiveSubTab('fleet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'fleet'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1. Agent Fleet ({AUTONOMOUS_AGENT_FLEET.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('webintel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'webintel'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>2. Web Dossiers</span>
            </button>

            <button
              onClick={() => setActiveSubTab('playbooks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'playbooks'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>3. Talk Playbooks</span>
            </button>

            <button
              onClick={() => setActiveSubTab('dispatch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                activeSubTab === 'dispatch'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>4. Action Dispatcher</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: Complete 7-Agent Fleet Overview */}
      {activeSubTab === 'fleet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-black dark:text-white">
                Active Fleet Roster & Autonomous Responsibilities
              </h4>
              <p className="text-xs text-gray-700 dark:text-gray-400 font-semibold">
                Autonomous agents operate continuously across hardware, open-source intelligence, negotiations, and customer retention.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-400">
              ● All 7 Agents Synchronized
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AUTONOMOUS_AGENT_FLEET.map((agent, aIdx) => (
              <div 
                key={agent.id}
                className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 transition ${
                  isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm hover:border-gray-400'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                      Agent 0{aIdx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                      agent.status === 'intervention_active'
                        ? 'bg-amber-100 text-amber-950 border-amber-400 animate-pulse'
                        : 'bg-emerald-100 text-emerald-950 border-emerald-400'
                    }`}>
                      {agent.status === 'intervention_active' ? 'Action Required' : 'Monitoring'}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-black dark:text-white leading-snug">
                    {agent.name}
                  </h5>

                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {agent.role}
                  </div>

                  <p className="text-xs text-gray-800 dark:text-gray-300 font-medium leading-relaxed">
                    {agent.capability}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-gray-700 dark:text-gray-400 text-[11px]">
                    <span>Cadence:</span>
                    <span className="font-bold text-black dark:text-white">{agent.frequency}</span>
                  </div>
                  <div className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <span className="font-bold">Active Focus:</span> {agent.focus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Customer Web Intelligence Dossiers */}
      {activeSubTab === 'webintel' && (
        <div className="space-y-5">
          {/* Stakeholder Selector Bar */}
          <div className="flex flex-wrap gap-2">
            {filteredDossiers.map(dossier => {
              const isSelected = activeDossier.stakeholderId === dossier.stakeholderId;
              return (
                <button
                  key={dossier.stakeholderId}
                  onClick={() => setSelectedDossierId(dossier.stakeholderId)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                    isSelected
                      ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                      : isDark ? 'border-gray-800 text-gray-300 hover:text-white' : 'border-gray-300 text-black hover:bg-gray-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>{dossier.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? isDark ? 'bg-black text-white' : 'bg-white text-black' 
                      : 'bg-gray-200 text-black'
                  }`}>
                    Account {dossier.account}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dossier Card */}
          <div className={`p-6 rounded-2xl border space-y-6 ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-950 border border-blue-400">
                  <Search className="w-3.5 h-3.5 text-blue-700" />
                  <span>Open-Source Web Intelligence Dossier</span>
                </div>
                <h4 className="text-xl font-bold text-black dark:text-white">
                  {activeDossier.name}
                </h4>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {activeDossier.title} • {activeDossier.organization}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold block text-gray-500">Tone Calibration</span>
                <span className="text-xs font-bold text-black dark:text-white max-w-xs block">
                  {activeDossier.recommendedTone}
                </span>
              </div>
            </div>

            {/* Bio & Career History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-2">
                <h5 className="font-bold text-sm text-black dark:text-white flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Public Biography & Verified Background</span>
                </h5>
                <p className="text-gray-800 dark:text-gray-300 font-medium leading-relaxed bg-gray-50 dark:bg-[#11141a] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  {activeDossier.publicBio}
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-sm text-black dark:text-white flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Career Trajectory (from LinkedIn & Filings)</span>
                </h5>
                <div className="space-y-2 bg-gray-50 dark:bg-[#11141a] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                  {activeDossier.careerHistory.map((role, idx) => (
                    <div key={idx} className="flex items-start gap-2 font-medium text-gray-800 dark:text-gray-300">
                      <span className="font-bold text-black dark:text-white shrink-0">•</span>
                      <span>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Public Quotes & Authority Minutes */}
            <div className="space-y-2">
              <h5 className="font-bold text-sm text-black dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-600" />
                <span>Documented Public Statements & Council Minutes</span>
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeDossier.publicStatements.map((stmt, sIdx) => (
                  <div key={sIdx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-purple-50/50 dark:bg-purple-950/20 space-y-2 text-xs">
                    <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 block">
                      {stmt.source}
                    </span>
                    <blockquote className="italic font-semibold text-black dark:text-white">
                      "{stmt.quote}"
                    </blockquote>
                    <p className="text-[11px] text-gray-700 dark:text-gray-400 font-medium">
                      <span className="font-bold">Context:</span> {stmt.context}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Drivers & Red Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 space-y-2">
                <h6 className="font-bold text-emerald-950 dark:text-emerald-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Core Drivers & What Gets Them Promoted</span>
                </h6>
                <ul className="space-y-1.5 font-medium text-emerald-950 dark:text-emerald-200">
                  {activeDossier.coreMotivations.map((mot, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{mot}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 space-y-2">
                <h6 className="font-bold text-amber-950 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Sensitivities & Things That Trigger Pushback</span>
                </h6>
                <ul className="space-y-1.5 font-medium text-amber-950 dark:text-amber-200">
                  {activeDossier.redFlagsAndSensitivities.map((rf, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold shrink-0">✕</span>
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Meeting Playbook Battlecards */}
      {activeSubTab === 'playbooks' && (
        <div className="space-y-5">
          {/* Playbook Selector */}
          <div className="flex flex-wrap gap-2">
            {filteredPlaybooks.map(pb => {
              const isSelected = activePlaybook.id === pb.id;
              return (
                <button
                  key={pb.id}
                  onClick={() => setSelectedPlaybookId(pb.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                    isSelected
                      ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                      : isDark ? 'border-gray-800 text-gray-300 hover:text-white' : 'border-gray-300 text-black hover:bg-gray-100'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-purple-500" />
                  <span>{pb.meetingTarget}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? isDark ? 'bg-black text-white' : 'bg-white text-black' 
                      : 'bg-gray-200 text-black'
                  }`}>
                    {pb.targetRole}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Playbook Card */}
          <div className={`p-6 rounded-2xl border space-y-6 ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div className="pb-4 border-b border-gray-200 dark:border-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Pre-Meeting Battlecard & Talking Script Coach
              </span>
              <h4 className="text-xl font-bold text-black dark:text-white mt-1">
                {activePlaybook.scenario}
              </h4>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
                Meeting with: <strong className="text-black dark:text-white">{activePlaybook.meetingTarget}</strong> ({activePlaybook.targetRole})
              </p>
            </div>

            {/* Strategic Leverage & Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 space-y-1.5">
                <span className="font-bold text-blue-950 dark:text-blue-300 text-sm block">Primary Meeting Objective:</span>
                <p className="text-blue-900 dark:text-blue-200 leading-relaxed font-semibold">{activePlaybook.primaryObjective}</p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 space-y-1.5">
                <span className="font-bold text-emerald-950 dark:text-emerald-300 text-sm block">Your Core Strategic Leverage:</span>
                <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">{activePlaybook.strategicLeverage}</p>
              </div>
            </div>

            {/* Phrases to Say vs Never Say */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10 space-y-3">
                <h5 className="font-bold text-emerald-950 dark:text-emerald-300 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Exact Phrases to Say (Tactical Talking Points)</span>
                </h5>
                <div className="space-y-2">
                  {activePlaybook.phrasesToSay.map((ph, pIdx) => (
                    <div key={pIdx} className="p-3 rounded-xl bg-white dark:bg-black border border-emerald-200 dark:border-emerald-900 font-semibold text-emerald-950 dark:text-emerald-200">
                      {ph}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-rose-300 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/10 space-y-3">
                <h5 className="font-bold text-rose-950 dark:text-rose-300 text-sm flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Phrases to NEVER Say (Triggers Skepticism/Pushback)</span>
                </h5>
                <div className="space-y-2">
                  {activePlaybook.phrasesToNeverSay.map((ph, pIdx) => (
                    <div key={pIdx} className="p-3 rounded-xl bg-white dark:bg-black border border-rose-200 dark:border-rose-900 font-semibold text-rose-950 dark:text-rose-200">
                      {ph}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Likely Objections & Counter-Scripts */}
            <div className="space-y-3 pt-2">
              <h5 className="font-bold text-sm text-black dark:text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Anticipated Customer Objections & Word-for-Word Counter Scripts</span>
              </h5>
              <div className="space-y-3">
                {activePlaybook.likelyObjectionsAndCounters.map((item, oIdx) => (
                  <div key={oIdx} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#11141a] space-y-2 text-xs">
                    <div className="font-bold text-rose-700 dark:text-rose-400">
                      Customer Objection: "{item.objection}"
                    </div>
                    <div className="p-3 rounded-lg bg-white dark:bg-black border border-gray-300 dark:border-gray-800 font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                      <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Your Recommended Counter Script:</strong>
                      "{item.counterScript}"
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desired Closing Outcome */}
            <div className="p-4 rounded-xl bg-purple-100 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-xs font-semibold text-purple-950 dark:text-purple-200">
              <span className="font-bold block mb-1">Target Closing Agreement Before Leaving the Meeting:</span>
              {activePlaybook.desiredClosingAgreement}
            </div>

          </div>
        </div>
      )}

      {/* SUB-VIEW 4: Action Dispatcher & Permission Command Panel */}
      {activeSubTab === 'dispatch' && (
        <div className="space-y-6">
          {/* Permission Guard Banner */}
          <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-300 bg-gray-50'
          }`}>
            <div className="flex items-center gap-2.5">
              {requirePermission ? (
                <Lock className="w-5 h-5 text-emerald-600" />
              ) : (
                <Unlock className="w-5 h-5 text-amber-600" />
              )}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider block text-black dark:text-white">
                  Human-in-the-Loop Permission Guard: {requirePermission ? 'ACTIVE (Safeguarded)' : 'OFF (Auto-Dispatch)'}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Autonomous agents will NEVER dial a customer or send external messages without your approval.
                </span>
              </div>
            </div>

            <button
              onClick={() => setRequirePermission(prev => !prev)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition shrink-0 ${
                requirePermission 
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm' 
                  : isDark ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              Toggle Guard: {requirePermission ? 'Disable' : 'Enable'}
            </button>
          </div>

          {/* List of Actionable AI Insights */}
          <div className="space-y-4">
            {filteredInsights.map((insight, idx) => {
              const dispatch = authorizedDispatches[idx];
              const isCallActive = callState.activeCallId === idx;

              return (
                <div 
                  key={idx}
                  className={`p-6 rounded-2xl border space-y-4 transition ${
                    isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                        {insight.agentName}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">
                        Targeting: Account {insight.accountId}
                      </span>
                    </div>

                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {insight.confidence}% AI Confidence
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-base text-black dark:text-white">
                      {insight.headline}
                    </h4>
                    <p className="text-xs text-gray-800 dark:text-gray-300 font-medium leading-relaxed">
                      {insight.reasoning}
                    </p>
                  </div>

                  {/* Proposal & Draft */}
                  <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#12151b] border border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-black dark:text-white">
                      <span>Proposed Action: {insight.autonomousProposal.actionTitle}</span>
                      <span>Target: {insight.autonomousProposal.targetStakeholder}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                      "{insight.autonomousProposal.draftContent}"
                    </p>

                    {/* Active Call Simulator */}
                    {isCallActive && (
                      <div className="mt-4 p-4 rounded-xl bg-black text-white border border-gray-700 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <PhoneCall className="w-4 h-4 text-emerald-400 animate-pulse" />
                            <span className="font-bold">
                              {callState.status === 'dialing' ? 'Dialing Target Stakeholder...' :
                               callState.status === 'connected' ? 'Live AI Voice Call in Progress...' :
                               'Call Successfully Completed & Recorded'}
                            </span>
                          </div>
                          <span className="font-mono text-emerald-400">
                            {callState.status === 'completed' ? '00:48 (Recorded)' : 'Live Audio'}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs font-mono bg-gray-900 p-3 rounded-lg border border-gray-800 max-h-36 overflow-y-auto">
                          {callState.transcript.map((line, tIdx) => (
                            <div key={tIdx} className={line.startsWith('FlytBase') ? 'text-cyan-300' : 'text-emerald-300'}>
                              {line}
                            </div>
                          ))}
                        </div>

                        {callState.status === 'completed' && (
                          <div className="flex items-center gap-2 text-xs text-gray-300 pt-1">
                            <Volume2 className="w-4 h-4 text-emerald-400" />
                            <span>Voice Recording Saved to Data Room & Logged in Field Notes</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {dispatch ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Authorized & Dispatched via {dispatch.type === 'voice' ? 'AI Voice Call' : 'WhatsApp'} at {dispatch.timestamp}
                          </span>
                        ) : (
                          <span>Requires CSM approval before execution.</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAuthorizeVoiceCall(idx, insight)}
                          disabled={isCallActive && callState.status !== 'completed'}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>Authorize AI Voice Call</span>
                        </button>

                        <button
                          onClick={() => handleAuthorizeWhatsApp(idx, insight)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Authorize WhatsApp</span>
                        </button>
                      </div>
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
