'use client';

import React from 'react';
import { AccountDetail, AccountId, AccountRisk } from '../types/crm';
import { AlertTriangle, Clock } from 'lucide-react';
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
        subtitle: `Urgency Level: ${risk.severity.toUpperCase()} • Person in Charge: ${risk.owner}`,
        badge: `${risk.severity.toUpperCase()} ALERT`,
        stats: [
          { label: 'Days Left to Fix', value: `${risk.daysRemaining} Days`, color: risk.daysRemaining <= 15 ? 'text-red-600' : 'text-amber-600' },
          { label: 'Final Deadline Date', value: risk.deadlineDate },
          { label: 'Category', value: risk.category },
        ],
        description: `What happens if we do not fix this: ${risk.consequence}`,
        impactOrOutcome: `Our plan to solve it: ${risk.mitigationPlan}`,
        ctaText: 'Start Action to Fix This Problem',
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header in Plain English */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-300'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Question 4: What Problems Could Cause the Customer to Leave Us?
            </h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
              isDark ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-red-100 text-red-950 border border-red-300'
            }`}>
              Early Warning Radar
            </span>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Live countdown timers on silent drone problems, key people resigning, and renewal deadlines.
          </p>
        </div>

        <div className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-red-400' : 'border-red-300 bg-red-50 text-red-950 shadow-sm'
        }`}>
          {allRisks.filter(r => r.severity === 'critical').length} Critical Problems Active
        </div>
      </div>

      {/* Clean Risk Cards with Bold Black Text */}
      <div className="space-y-3">
        {allRisks.map((risk) => {
          const isCritical = risk.severity === 'critical';
          return (
            <div
              key={risk.id}
              onClick={() => handleOpenRisk(risk)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark
                  ? isCritical ? 'border-red-900 bg-[#120b0c]' : 'border-gray-800 bg-[#0a0c0f] hover:border-gray-700'
                  : isCritical ? 'border-red-300 bg-red-50/40 hover:border-red-500 shadow-sm' : 'border-gray-300 bg-white hover:border-gray-500 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className={`p-2 rounded-lg shrink-0 ${
                  isCritical ? 'bg-red-100 text-red-900 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}>
                  <AlertTriangle className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {risk.title}
                    </h4>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      isCritical ? 'bg-red-100 text-red-950 border border-red-300' : 'bg-amber-100 text-amber-950 border border-amber-300'
                    }`}>
                      {risk.severity === 'critical' ? 'High Danger' : 'Medium Warning'}
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-black bg-gray-100'
                    }`}>
                      Account {risk.account === 'A' ? 'A (Police)' : 'B (Aldermoor)'}
                    </span>
                  </div>

                  <p className={`text-xs mt-1.5 font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                    <strong className={isDark ? 'text-white' : 'text-black'}>What happens if ignored: </strong>
                    {risk.consequence}
                  </p>
                </div>
              </div>

              {/* Deadline & Inspect */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className="flex items-center md:justify-end gap-1 font-mono font-bold text-red-700 dark:text-red-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{risk.daysRemaining} days left!</span>
                  </div>
                  <div className={`text-xs mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Deadline: <strong>{risk.deadlineDate}</strong>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenRisk(risk);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition ${
                    isDark ? 'border-gray-700 bg-[#12151a] hover:bg-gray-800 text-white' : 'border-gray-400 bg-gray-100 hover:bg-gray-200 text-black shadow-sm'
                  }`}
                >
                  See How to Fix →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
