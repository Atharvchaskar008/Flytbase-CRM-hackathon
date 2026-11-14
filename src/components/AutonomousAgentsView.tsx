'use client';

import React, { useState } from 'react';
import { AgentInsight } from '../lib/agents';
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
  ArrowRight
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
  const [requirePermission, setRequirePermission] = useState(true);
  const [authorizedDispatches, setAuthorizedDispatches] = useState<Record<number, { type: 'voice' | 'whatsapp'; timestamp: string }>>({});
  const [callState, setCallState] = useState<CallSimulationState>({
    activeCallId: null,
    status: 'idle',
    isPlayingAudio: false,
    transcript: [],
  });

  const filtered = selectedAccount === 'ALL'
    ? insights
    : insights.filter(i => i.accountId === selectedAccount);

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
      
      {/* What Are AI Agents Doing? - Clear Explanation Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What Are Autonomous AI Agents Doing?
              </h3>
            </div>
            <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Rather than waiting for a human manager to manually dig through flight logs or miss urgent tickets, 
              these 3 background AI agents run 24/7 continuous audits across drone hardware telemetry, procurement deadlines, 
              and leadership sentiments. When a threat or opportunity is detected, they draft instant interventions and 
              request your authorization from the Command Panel below.
            </p>
          </div>

          {/* Permission Gate Control */}
          <div className={`p-4 rounded-xl border flex flex-col justify-between shrink-0 ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {requirePermission ? (
                <Lock className="w-4 h-4 text-emerald-500" />
              ) : (
                <Unlock className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-xs font-bold uppercase tracking-wider">Human-in-the-Loop</span>
            </div>
            <p className="text-[11px] text-gray-500 max-w-[200px] mb-3">
              {requirePermission ? 'Requires CSM permission before placing calls or sending messages.' : 'Autonomous auto-dispatch enabled.'}
            </p>
            <button
              onClick={() => setRequirePermission(prev => !prev)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                requirePermission 
                  ? 'border-emerald-600 bg-emerald-500 text-white' 
                  : isDark ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-white text-gray-700'
              }`}
            >
              {requirePermission ? 'Permission Guard: ACTIVE' : 'Permission Guard: OFF'}
            </button>
          </div>
        </div>

        {/* 3 Active Swarm Workers Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
            <div>
              <strong className="block">Watchdog Telemetry Agent</strong>
              <span className="text-gray-500 text-[11px]">Monitors 49 docks & offline telemetry</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <div>
              <strong className="block">Stakeholder Dynamics Agent</strong>
              <span className="text-gray-500 text-[11px]">Detects leadership exits & trust drops</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <strong className="block">Expansion Synthesis Agent</strong>
              <span className="text-gray-500 text-[11px]">Prepares 300-dock tender models</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proactive Agent Interventions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold">Proactive Interventions Awaiting Command Action</h4>
          <span className="text-xs font-mono text-gray-500">{filtered.length} Recommendations</span>
        </div>

        <div className="space-y-4">
          {filtered.map((insight, idx) => {
            const dispatch = authorizedDispatches[idx];
            const isCallActive = callState.activeCallId === idx;

            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-4 transition ${
                  isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                {/* Agent Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      insight.type === 'urgent_intervention' ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      insight.type === 'churn_risk' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}>
                      {insight.type.replace('_', ' ')}
                    </span>
                    <h5 className="font-bold text-base text-gray-900 dark:text-gray-100">
                      {insight.headline}
                    </h5>
                    <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500">
                      Account {insight.accountId === 'A' ? 'Eastern Police' : 'Aldermoor'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Agent Confidence: <strong className="text-emerald-500">{insight.confidence}%</strong></span>
                  </div>
                </div>

                {/* Agent Diagnosis & Synthesis */}
                <div className="space-y-2">
                  <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    isDark ? 'border-gray-800/80 bg-[#07080a] text-gray-300' : 'border-gray-100 bg-gray-50 text-gray-700'
                  }`}>
                    <strong className="block text-xs uppercase tracking-wider font-semibold text-gray-400 mb-1">
                      Autonomous Intelligence Analysis:
                    </strong>
                    {insight.reasoning}
                  </div>
                </div>

                {/* Proposed Command Action Box */}
                <div className={`p-4 rounded-xl border ${
                  isDark ? 'border-gray-800 bg-[#101317]' : 'border-gray-200 bg-gray-50/70'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      Synthesized Action: {insight.autonomousProposal.actionTitle}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      Target: <strong>{insight.autonomousProposal.targetStakeholder}</strong>
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 font-mono bg-white dark:bg-black p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                    "{insight.autonomousProposal.draftContent}"
                  </p>

                  {/* Call Simulation Player if Active */}
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

                      {/* Transcribed Dialog */}
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

                  {/* Command Dispatch Permission Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-xs text-gray-500">
                      {dispatch ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          Authorized & Dispatched via {dispatch.type === 'voice' ? 'AI Voice Call' : 'WhatsApp Cloud'} at {dispatch.timestamp}
                        </span>
                      ) : (
                        <span>Requires your authorization to contact customer directly.</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Voice Call Button */}
                      <button
                        onClick={() => handleAuthorizeVoiceCall(idx, insight)}
                        disabled={isCallActive && callState.status !== 'completed'}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm ${
                          isDark 
                            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Authorize AI Voice Call</span>
                      </button>

                      {/* WhatsApp Button */}
                      <button
                        onClick={() => handleAuthorizeWhatsApp(idx, insight)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-sm ${
                          isDark 
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
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

    </div>
  );
};
