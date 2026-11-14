'use client';

import React from 'react';
import { AccountDetail, AccountId, AccountRisk } from '../types/crm';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

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

  const getSeverityBadge = (severity: AccountRisk['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
            <Flame className="w-3 h-3 text-rose-400" /> Critical Severity
          </span>
        );
      case 'high':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
            <AlertTriangle className="w-3 h-3 text-amber-400" /> High Risk
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
            Moderate
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">Question 4: What is about to go wrong? (Risk Radar)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Impending window expirations, cooling stakeholders, and technical roadblocks before they become deal-breakers.
          </p>
        </div>
        <div className="text-xs font-mono bg-rose-950/60 text-rose-300 border border-rose-800/80 px-2.5 py-1 rounded">
          {allRisks.filter(r => r.severity === 'critical').length} Urgent Threat Windows
        </div>
      </div>

      {/* Risks Grid */}
      <div className="space-y-3">
        {allRisks.map((risk) => {
          const acc = accounts[risk.account];
          return (
            <div
              key={risk.id}
              className={`border rounded-xl p-4 transition space-y-3 ${
                risk.severity === 'critical'
                  ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/30 border-rose-600/60 shadow-lg'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{risk.title}</span>
                  {getSeverityBadge(risk.severity)}
                  {selectedAccount === 'ALL' && acc && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                      {acc.name.split(' ')[0]}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Cutoff: {risk.deadlineDate} ({risk.daysRemaining} days left)</span>
                  </div>
                </div>
              </div>

              {/* Consequence of Inaction */}
              <div className="bg-slate-950/60 border border-rose-950 rounded-lg p-3 text-xs">
                <span className="text-rose-400 font-bold block mb-1 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" /> Consequence if missed:
                </span>
                <p className="text-slate-300 leading-relaxed">{risk.consequence}</p>
              </div>

              {/* Actionable Mitigation */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span><strong>Mitigation Action:</strong> {risk.mitigationPlan}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Owner: {risk.owner}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
