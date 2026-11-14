'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';

interface ExecutiveSummaryProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  accounts,
  selectedAccount,
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
    activeDocks = 27; // 14 Police + 13 Industrial
    silentDocks = 3;  // 3 silent in Aldermoor
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
    <div className="space-y-3">
      {/* Mini banner if specific account selected */}
      {selectedAccount !== 'ALL' && accounts[selectedAccount] && (
        <div className="border border-[#1e2229] bg-[#07080a] p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div>
            <span className="font-bold text-white uppercase tracking-wider">
              {accounts[selectedAccount].name}
            </span>
            <span className="text-[#666] ml-2 font-normal">
              — {accounts[selectedAccount].sold}
            </span>
          </div>
          <div className="text-[#888] text-[11px]">
            {accounts[selectedAccount].handoverNote}
          </div>
        </div>
      )}

      {/* Monochrome Minimal Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 font-mono">
        
        {/* Verified ARR */}
        <div className="border border-[#1c2026] bg-[#08090b] p-3 rounded">
          <div className="text-[10px] text-[#777] uppercase tracking-wider">Verified ARR</div>
          <div className="text-xl font-bold text-white mt-1">
            ${(verifiedARR / 1000).toFixed(0)}k
          </div>
          <div className="text-[10px] text-[#666] mt-0.5">
            of ${(totalPipeline / 1000).toFixed(0)}k total pipeline
          </div>
        </div>

        {/* Fleet Deployment */}
        <div className="border border-[#1c2026] bg-[#08090b] p-3 rounded">
          <div className="text-[10px] text-[#777] uppercase tracking-wider">Fleet Status</div>
          <div className="text-xl font-bold text-white mt-1">
            {activeDocks} <span className="text-xs font-normal text-[#666]">/ {totalDocks} Flying</span>
          </div>
          <div className="text-[10px] text-[#888] mt-0.5">
            {silentDocks > 0 ? `${silentDocks} silent docks halted` : 'Zero critical faults'}
          </div>
        </div>

        {/* Urgent Deadlines */}
        <div className="border border-[#1c2026] bg-[#08090b] p-3 rounded">
          <div className="text-[10px] text-[#777] uppercase tracking-wider">Active Threats</div>
          <div className="text-xl font-bold text-white mt-1">
            {criticalRisks} <span className="text-xs font-normal text-[#666]">Critical</span>
          </div>
          <div className="text-[10px] text-[#888] mt-0.5">
            5 Dec Event • Spec Lock
          </div>
        </div>

        {/* Stakeholder Trust */}
        <div className="border border-[#1c2026] bg-[#08090b] p-3 rounded">
          <div className="text-[10px] text-[#777] uppercase tracking-wider">Key Deciders</div>
          <div className="text-xl font-bold text-white mt-1">
            {currentAccounts.flatMap(a => a.people).length} <span className="text-xs font-normal text-[#666]">Mapped</span>
          </div>
          <div className="text-[10px] text-[#888] mt-0.5">
            1 Departing (Calder)
          </div>
        </div>

        {/* Portfolio Health */}
        <div className="border border-[#1c2026] bg-[#08090b] p-3 rounded">
          <div className="text-[10px] text-[#777] uppercase tracking-wider">Health Index</div>
          <div className="text-xl font-bold text-white mt-1">
            {Math.round(currentAccounts.reduce((s, a) => s + a.healthScore, 0) / currentAccounts.length)}%
          </div>
          <div className="text-[10px] text-[#888] mt-0.5">
            Attention Required
          </div>
        </div>

      </div>
    </div>
  );
};
