'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { 
  DollarSign, 
  ShieldAlert, 
  HelpCircle, 
  TrendingUp, 
  CheckCircle2, 
  Layers
} from 'lucide-react';

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

  const totalContractVal = currentAccounts.reduce((acc, a) => acc + a.contractValue, 0);
  const totalExpansionVal = currentAccounts.reduce((acc, a) => acc + a.expansionPotential, 0);
  
  // Calculate verified value
  let verifiedVal = 0;
  let citationsCount = 0;
  let activeRisksCount = 0;
  let blindSpotsCount = 0;

  currentAccounts.forEach(acc => {
    acc.deals.forEach(d => {
      verifiedVal += d.verifiedValue || 0;
      citationsCount += d.citations.length;
    });
    activeRisksCount += acc.risks.filter(r => r.severity === 'critical' || r.severity === 'high').length;
    blindSpotsCount += acc.blindSpots.length;
  });

  const avgHealth = Math.round(
    currentAccounts.reduce((acc, a) => acc + a.healthScore, 0) / (currentAccounts.length || 1)
  );

  return (
    <div className="space-y-4">
      {/* Account Info Banner if single account selected */}
      {selectedAccount !== 'ALL' && accounts[selectedAccount] && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-white">{accounts[selectedAccount].name}</h2>
              <span className="text-xs bg-slate-800 text-sky-400 border border-slate-700 px-2 py-0.5 rounded font-mono">
                {accounts[selectedAccount].badge}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">{accounts[selectedAccount].business}</p>
            <p className="text-xs text-slate-400 mt-1">
              <span className="text-slate-300 font-semibold">Fleet Sold:</span> {accounts[selectedAccount].sold}
            </p>
          </div>
          {accounts[selectedAccount].handoverNote && (
            <div className="bg-slate-950/80 border-l-2 border-amber-500 rounded p-3 text-xs text-slate-300 max-w-md">
              <span className="text-amber-400 font-bold block mb-1">Handover Context:</span>
              {accounts[selectedAccount].handoverNote}
            </div>
          )}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        
        {/* Book Value Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Verifiable ARR</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">
              ${(verifiedVal / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              of ${( (totalContractVal + totalExpansionVal) / 1000).toFixed(0)}k total pipeline
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{citationsCount} audit citations verified</span>
          </div>
        </div>

        {/* Expansion Pipeline */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Expansion Upside</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-white font-mono">
              ${(totalExpansionVal / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Qualified expansion deals
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-sky-400">
            Subject to blocker removal
          </div>
        </div>

        {/* Health Score */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Account Health</span>
            <Layers className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white font-mono">{avgHealth}/100</span>
            <span className={`text-xs font-bold ${avgHealth >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {avgHealth >= 70 ? 'Stable' : 'At Risk'}
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full ${avgHealth >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
              style={{ width: `${avgHealth}%` }}
            />
          </div>
        </div>

        {/* Urgent Risks */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Critical Deadlines</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-rose-400 font-mono">
              {activeRisksCount}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Urgent timeline threats
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-rose-400 flex items-center gap-1">
            <span>Requires Monday action</span>
          </div>
        </div>

        {/* Blind Spots */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium">Critical Unknowns</span>
            <HelpCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-black text-purple-300 font-mono">
              {blindSpotsCount}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              Unanswered dependencies
            </span>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-purple-400">
            Questions logged for inquiry
          </div>
        </div>

      </div>
    </div>
  );
};
