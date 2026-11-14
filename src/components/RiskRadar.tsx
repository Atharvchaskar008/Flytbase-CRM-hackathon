'use client';

import React from 'react';
import { AccountDetail, AccountId, AccountRisk } from '../types/crm';

interface RiskRadarProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
}

export const RiskRadar: React.FC<RiskRadarProps> = ({
  accounts,
  selectedAccount,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allRisks: AccountRisk[] = currentAccounts.flatMap(a => a.risks);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Question 4 // What is about to go wrong?
          </span>
          <span className="text-[#666] ml-2">Risk Radar & Window Deadlines</span>
        </div>
        <span className="text-[10px] text-[#888] uppercase">
          {allRisks.filter(r => r.severity === 'critical').length} Critical Threats Active
        </span>
      </div>

      {/* Dense Risk List */}
      <div className="space-y-2">
        {allRisks.map((risk) => {
          const isCritical = risk.severity === 'critical';
          return (
            <div
              key={risk.id}
              className={`border p-3 rounded transition space-y-2 ${
                isCritical
                  ? 'border-[#3d4450] bg-[#0c0e12]'
                  : 'border-[#1c2026] bg-[#07080a]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    isCritical ? 'bg-white text-black' : 'border border-[#333] text-[#888] bg-black'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className="text-xs font-bold text-white">{risk.title}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-[#222] text-[#777]">
                    Acc {risk.account}
                  </span>
                </div>

                <div className="text-[10px] text-white bg-[#15181f] border border-[#282d36] px-2 py-0.5 rounded">
                  Cutoff: {risk.deadlineDate} ({risk.daysRemaining}d left)
                </div>
              </div>

              {/* Consequence & Mitigation */}
              <div className="grid md:grid-cols-2 gap-2 text-[11px] font-sans pt-1">
                <div className="border-l border-[#333] pl-2 text-[#aaa]">
                  <strong className="text-white font-mono text-[10px] uppercase block">Consequence:</strong>
                  {risk.consequence}
                </div>
                <div className="border-l border-[#555] pl-2 text-[#ccc]">
                  <strong className="text-white font-mono text-[10px] uppercase block">Mitigation:</strong>
                  {risk.mitigationPlan}
                </div>
              </div>

              <div className="text-[9px] text-[#666] pt-1 border-t border-[#15181e] flex justify-end">
                <span>Owner: {risk.owner}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
