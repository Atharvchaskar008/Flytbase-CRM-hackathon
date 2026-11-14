'use client';

import React, { useState } from 'react';
import { AgentInsight } from '../lib/agents';
import { AccountId } from '../types/crm';
import { Bot, Sparkles, Send, CheckCircle, ShieldAlert, TrendingUp, AlertTriangle } from 'lucide-react';

interface AutonomousAgentsViewProps {
  insights: AgentInsight[];
  selectedAccount: AccountId | 'ALL';
  onDeployAction?: (insight: AgentInsight) => void;
  isDark?: boolean;
}

export const AutonomousAgentsView: React.FC<AutonomousAgentsViewProps> = ({
  insights,
  selectedAccount,
  onDeployAction,
  isDark = false,
}) => {
  const [deployedSet, setDeployedSet] = useState<Record<string, boolean>>({});

  const filtered = selectedAccount === 'ALL'
    ? insights
    : insights.filter(i => i.accountId === selectedAccount);

  const handleDeploy = (idx: number, insight: AgentInsight) => {
    setDeployedSet(prev => ({ ...prev, [idx]: true }));
    onDeployAction?.(insight);
  };

  const getBadgeStyle = (type: AgentInsight['type']) => {
    switch (type) {
      case 'urgent_intervention':
        return isDark ? 'border-white bg-white text-black' : 'border-black bg-black text-white';
      case 'churn_risk':
        return isDark ? 'border-gray-400 bg-gray-900 text-white' : 'border-gray-800 bg-gray-100 text-gray-900 font-bold';
      case 'expansion_opportunity':
        return isDark ? 'border-gray-500 bg-black text-white' : 'border-gray-400 bg-white text-black';
      default:
        return isDark ? 'border-gray-600 bg-black text-gray-400' : 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className={`flex flex-wrap items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <Bot className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} />
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Autonomous AI Agents // Operational Command
          </span>
          <span className={`text-[10px] ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>
            Continuous Background Signal Ingestion & Action Synthesis
          </span>
        </div>
        <span className={`text-[10px] uppercase font-bold ${isDark ? 'text-white' : 'text-black'}`}>
          {filtered.length} Proactive Interventions Ready
        </span>
      </div>

      {/* Agents Grid */}
      <div className="space-y-3">
        {filtered.map((insight, idx) => {
          const isDeployed = deployedSet[idx];
          return (
            <div
              key={idx}
              className={`border p-4 rounded transition space-y-3 ${
                isDark 
                  ? 'border-[#1c2026] bg-[#07080a] hover:border-[#2a2f38]' 
                  : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              {/* Agent Title & Type */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold border ${getBadgeStyle(insight.type)}`}>
                    {insight.type.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {insight.headline}
                  </span>
                  <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#222] text-[#777]' : 'border-gray-200 text-gray-500'
                  }`}>
                    Acc {insight.accountId}
                  </span>
                </div>

                <div className={`text-[10px] flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Agent Confidence: <strong>{insight.confidence}%</strong></span>
                </div>
              </div>

              {/* Agent Reasoning */}
              <p className={`text-[11px] font-sans leading-relaxed ${isDark ? 'text-[#aaa]' : 'text-gray-700'}`}>
                {insight.reasoning}
              </p>

              {/* Citations */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className={isDark ? 'text-[#666]' : 'text-gray-400'}>Evidence Grounding:</span>
                {insight.evidenceCited.map(ev => (
                  <span key={ev} className={`px-1.5 py-0.5 rounded border ${
                    isDark ? 'border-[#222] bg-[#111] text-[#ccc]' : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}>
                    {ev}
                  </span>
                ))}
              </div>

              {/* Autonomous Proposal Box */}
              <div className={`p-3 rounded border text-[11px] space-y-2 ${
                isDark ? 'border-[#1f242d] bg-[#0b0d10]' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex flex-wrap items-center justify-between text-[10px] uppercase">
                  <span className="font-bold text-black dark:text-white">
                    Synthesized Action: {insight.autonomousProposal.actionTitle}
                  </span>
                  <span className={isDark ? 'text-[#888]' : 'text-gray-500'}>
                    Target: {insight.autonomousProposal.targetStakeholder} • Due: {insight.autonomousProposal.deadline}
                  </span>
                </div>

                <p className={`font-sans text-xs italic ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  "{insight.autonomousProposal.draftContent}"
                </p>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleDeploy(idx, insight)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] uppercase transition font-semibold border ${
                      isDeployed
                        ? 'border-gray-400 text-gray-500 bg-transparent'
                        : isDark
                        ? 'border-white bg-white text-black hover:bg-gray-200'
                        : 'border-black bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isDeployed ? <CheckCircle className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    <span>{isDeployed ? 'Queued to Upstream' : 'Approve & Dispatch'}</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
