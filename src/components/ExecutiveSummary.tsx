'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';

interface ExecutiveSummaryProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL' 
    ? Object.values(accounts) 
    : [accounts[selectedAccount]].filter(Boolean);

  let verifiedARR = 0;
  let totalPipeline = 0;
  let totalDocks = 0;
  let activeDocks = 0;
  let silentDocks = 0;
  let criticalRisks = 0;

  currentAccounts.forEach(acc => {
    acc.deals.forEach(d => {
      verifiedARR += d.verifiedValue || 0;
      totalPipeline += (d.value || 0);
    });
    criticalRisks += acc.risks.filter(r => r.severity === 'critical').length;
  });

  if (selectedAccount === 'ALL') {
    totalDocks = 49;
    activeDocks = 27;
    silentDocks = 3;
  } else if (selectedAccount === 'A') {
    totalDocks = 35;
    activeDocks = 14;
    silentDocks = 0;
  } else {
    totalDocks = 14;
    activeDocks = 11;
    silentDocks = 3;
  }

  return (
    <div className="space-y-3 font-mono">
      {/* Account Context Banner */}
      {selectedAccount !== 'ALL' && accounts[selectedAccount] && (
        <div className={`border p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-[#1e2229] bg-[#07080a]' : 'border-gray-200 bg-gray-50'
        }`}>
          <div>
            <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {accounts[selectedAccount].name}
            </span>
            <span className={`ml-2 font-normal ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>
              — {accounts[selectedAccount].sold}
            </span>
          </div>
          <div className={`text-[11px] ${isDark ? 'text-[#888]' : 'text-gray-600'}`}>
            {accounts[selectedAccount].handoverNote}
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        
        {/* Verified ARR */}
        <div className={`border p-3 rounded transition ${
          isDark ? 'border-[#1c2026] bg-[#08090b]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
            Verified ARR
          </div>
          <div className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ${(verifiedARR / 1000).toFixed(0)}k
          </div>
          <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
            of ${(totalPipeline / 1000).toFixed(0)}k pipeline
          </div>
        </div>

        {/* Fleet Deployment */}
        <div className={`border p-3 rounded transition ${
          isDark ? 'border-[#1c2026] bg-[#08090b]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
            Fleet Status
          </div>
          <div className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {activeDocks} <span className={`text-xs font-normal ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>/ {totalDocks} Flying</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
            {silentDocks > 0 ? `${silentDocks} silent docks halted` : 'Zero critical faults'}
          </div>
        </div>

        {/* Urgent Deadlines */}
        <div className={`border p-3 rounded transition ${
          isDark ? 'border-[#1c2026] bg-[#08090b]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
            Active Threats
          </div>
          <div className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {criticalRisks} <span className={`text-xs font-normal ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>Critical</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
            5 Dec Event • Spec Lock
          </div>
        </div>

        {/* Stakeholder Trust */}
        <div className={`border p-3 rounded transition ${
          isDark ? 'border-[#1c2026] bg-[#08090b]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
            Key Deciders
          </div>
          <div className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentAccounts.flatMap(a => a.people).length} <span className={`text-xs font-normal ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>Mapped</span>
          </div>
          <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
            1 Departing (Calder)
          </div>
        </div>

        {/* Portfolio Health */}
        <div className={`border p-3 rounded transition ${
          isDark ? 'border-[#1c2026] bg-[#08090b]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
            Health Index
          </div>
          <div className={`text-xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {Math.round(currentAccounts.reduce((s, a) => s + a.healthScore, 0) / currentAccounts.length)}%
          </div>
          <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
            Attention Required
          </div>
        </div>

      </div>
    </div>
  );
};
