'use client';

import React from 'react';
import { AccountDetail, AccountId, AccountRisk } from '../types/crm';

interface RiskRadarProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allRisks: AccountRisk[] = currentAccounts.flatMap(a => a.risks);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Question 4 // What is about to go wrong?
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Risk Radar & Window Deadlines</span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
          {allRisks.filter(r => r.severity === 'critical').length} Critical Threats Active
        </span>
      </div>

      {/* Risk List */}
      <div className="space-y-2">
        {allRisks.map((risk) => {
          const isCritical = risk.severity === 'critical';
          return (
            <div
              key={risk.id}
              className={`border p-3 rounded transition space-y-2 ${
                isDark
                  ? isCritical ? 'border-[#3d4450] bg-[#0c0e12]' : 'border-[#1c2026] bg-[#07080a]'
                  : isCritical ? 'border-gray-900 bg-gray-50 shadow-sm' : 'border-gray-200 bg-white shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    isCritical 
                      ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                      : isDark ? 'border border-[#333] text-[#888] bg-black' : 'border border-gray-300 text-gray-700 bg-gray-100'
                  }`}>
                    {risk.severity}
                  </span>
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{risk.title}</span>
                  <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#222] text-[#777]' : 'border-gray-200 text-gray-500'
                  }`}>
                    Acc {risk.account}
                  </span>
                </div>

                <div className={`text-[10px] px-2 py-0.5 rounded border ${
                  isDark ? 'text-white bg-[#15181f] border-[#282d36]' : 'text-gray-900 bg-white border-gray-300'
                }`}>
                  Cutoff: {risk.deadlineDate} ({risk.daysRemaining}d left)
                </div>
              </div>

              {/* Consequence & Mitigation */}
              <div className="grid md:grid-cols-2 gap-2 text-[11px] font-sans pt-1">
                <div className={`border-l-2 pl-2 ${
                  isDark ? 'border-[#333] text-[#aaa]' : 'border-gray-300 text-gray-600'
                }`}>
                  <strong className={`font-mono text-[10px] uppercase block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Consequence:
                  </strong>
                  {risk.consequence}
                </div>
                <div className={`border-l-2 pl-2 ${
                  isDark ? 'border-[#555] text-[#ccc]' : 'border-black text-gray-900 font-medium'
                }`}>
                  <strong className={`font-mono text-[10px] uppercase block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Mitigation:
                  </strong>
                  {risk.mitigationPlan}
                </div>
              </div>

              <div className={`text-[9px] pt-1 border-t flex justify-end ${
                isDark ? 'text-[#666] border-[#15181e]' : 'text-gray-400 border-gray-100'
              }`}>
                <span>Owner: {risk.owner}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
