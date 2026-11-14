'use client';

import React from 'react';
import { AccountDetail, AccountId, AccountRisk } from '../types/crm';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { DetailModalData } from './ItemDetailModal';

interface RiskRadarProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onOpenDetail?: (data: DetailModalData) => void;
  isDark?: boolean;
}

export const RiskRadar: React.FC<RiskRadarProps> = ({
  accounts,
  selectedAccount,
  onOpenDetail,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allRisks: AccountRisk[] = currentAccounts.flatMap(a => a.risks);

  const handleOpenRisk = (risk: AccountRisk) => {
    if (onOpenDetail) {
      onOpenDetail({
        type: 'risk',
        title: risk.title,
        account: risk.account,
        subtitle: `Severity Tier: ${risk.severity.toUpperCase()} • Assigned Owner: ${risk.owner}`,
        badge: `${risk.severity.toUpperCase()} RISK`,
        stats: [
          { label: 'Time Remaining', value: `${risk.daysRemaining} Days`, color: risk.daysRemaining <= 15 ? 'text-red-500' : 'text-amber-500' },
          { label: 'Cutoff Date', value: risk.deadlineDate },
          { label: 'Category', value: risk.category },
        ],
        description: `Risk Consequence: ${risk.consequence}`,
        impactOrOutcome: `Prescribed Mitigation Plan: ${risk.mitigationPlan}`,
        ctaText: 'Trigger Mitigation Workflow',
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Question 4: What Is About to Go Wrong?
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              isDark ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-red-100 text-red-800'
            }`}>
              Risk Radar
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Live countdown timers on silent degradation, renewals, and leadership turnover.
          </p>
        </div>

        <div className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-red-400' : 'border-red-200 bg-red-50 text-red-700'
        }`}>
          {allRisks.filter(r => r.severity === 'critical').length} Critical Threats Active
        </div>
      </div>

      {/* Clean Risk Cards */}
      <div className="space-y-2.5">
        {allRisks.map((risk) => {
          const isCritical = risk.severity === 'critical';
          return (
            <div
              key={risk.id}
              onClick={() => handleOpenRisk(risk)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark
                  ? isCritical ? 'border-red-900/60 bg-[#120b0c] hover:border-red-700' : 'border-gray-800/80 bg-[#0a0c0f] hover:border-gray-700'
                  : isCritical ? 'border-red-200 bg-red-50/20 hover:border-red-300 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className={`p-2 rounded-lg shrink-0 ${
                  isCritical ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-sm md:text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {risk.title}
                    </h4>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      isCritical ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {risk.severity}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
                    }`}>
                      Account {risk.account}
                    </span>
                  </div>

                  <p className={`text-xs mt-1 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Consequence: {risk.consequence}
                  </p>
                </div>
              </div>

              {/* Deadline & Inspect */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className="flex items-center md:justify-end gap-1 font-mono font-bold text-red-600 dark:text-red-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{risk.daysRemaining}d left</span>
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Cutoff: {risk.deadlineDate}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenRisk(risk);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                    isDark ? 'border-gray-800 bg-[#12151a] hover:bg-gray-800 text-gray-200' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Mitigation →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
