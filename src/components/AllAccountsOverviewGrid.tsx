'use client';

import React from 'react';
import { AccountId, AccountDetail } from '../types/crm';
import { 
  ShieldCheck, 
  Building, 
  Building2, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

interface AllAccountsOverviewGridProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectAccount: (acc: AccountId | 'ALL') => void;
  isDark?: boolean;
}

export const AllAccountsOverviewGrid: React.FC<AllAccountsOverviewGridProps> = ({
  accounts,
  selectedAccount,
  onSelectAccount,
  isDark = false,
}) => {
  return (
    <div className="space-y-4 font-sans">
      
      {/* Master Numbers Bar (The Executive Cheat Sheet) */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm ${
        isDark ? 'border-gray-800 bg-[#090b0e]' : 'border-gray-300 bg-white'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold uppercase tracking-wider text-black dark:text-white">
            Executive Fleet Master Tally:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Accounts</span>
            <strong className="text-sm text-black dark:text-white">3 Active</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Total Docks</span>
            <strong className="text-sm text-black dark:text-white">50 Docks</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Active Flying</span>
            <strong className="text-sm text-emerald-600 dark:text-emerald-400">27 Flying</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Idle / Silent</span>
            <strong className="text-sm text-rose-600 dark:text-rose-400">4 Docks</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Signed ARR</span>
            <strong className="text-sm text-emerald-600 dark:text-emerald-400">$602,000</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Tender Pipeline</span>
            <strong className="text-sm text-blue-600 dark:text-blue-400">$1,228,000</strong>
          </div>
          <div>
            <span className="text-gray-500 text-[10px] uppercase block">Weekly Sorties</span>
            <strong className="text-sm text-purple-600 dark:text-purple-400">333 Flights/wk</strong>
          </div>
        </div>

        <button
          onClick={() => onSelectAccount('ALL')}
          className={`px-3 py-1.5 rounded-xl font-bold border transition text-xs flex items-center gap-1.5 ${
            selectedAccount === 'ALL'
              ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
              : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>View All Accounts</span>
        </button>
      </div>

      {/* The 3 Accounts Side-by-Side Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* CARD 1: ACCOUNT A */}
        <div
          onClick={() => onSelectAccount('A')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
            selectedAccount === 'A'
              ? isDark ? 'border-blue-500 bg-blue-950/20 shadow-md ring-2 ring-blue-500/40' : 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-400/50'
              : isDark ? 'border-gray-800 bg-[#0c0e12] hover:border-gray-700' : 'border-gray-300 bg-white hover:border-gray-400 shadow-sm'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300">
                Account A • Public Safety
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                $420,000 ARR
              </span>
            </div>

            <h4 className="text-base font-bold text-black dark:text-white leading-tight">
              Eastern Counties Police Alliance
            </h4>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              Regional police consortium across 4 forces. 35 DiaB units installed; 14 active daily on tactical pursuit and search & rescue.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800 text-xs">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-[11px]">
              <span>Docks: <strong>35 Installed</strong></span>
              <span>Sorties: <strong>239/wk</strong></span>
              <span>Health: <strong className="text-emerald-600 dark:text-emerald-400">58%</strong></span>
            </div>

            <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Dec 5 Tactical Event Support • Tender Spec Lock</span>
            </div>
          </div>
        </div>

        {/* CARD 2: ACCOUNT B */}
        <div
          onClick={() => onSelectAccount('B')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
            selectedAccount === 'B'
              ? isDark ? 'border-amber-500 bg-amber-950/20 shadow-md ring-2 ring-amber-500/40' : 'border-amber-600 bg-amber-50/50 shadow-md ring-2 ring-amber-400/50'
              : isDark ? 'border-gray-800 bg-[#0c0e12] hover:border-gray-700' : 'border-gray-300 bg-white hover:border-gray-400 shadow-sm'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300">
                Account B • Heavy Industry
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                $168,000 ARR
              </span>
            </div>

            <h4 className="text-base font-bold text-black dark:text-white leading-tight">
              Aldermoor Industrial Group
            </h4>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              Industrial conglomerate with 15 chemical & petrochemical plants. 14 heavy-duty docks for 24/7 automated night perimeter patrols.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800 text-xs">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-[11px]">
              <span>Docks: <strong>14 Installed</strong></span>
              <span>Sorties: <strong>94/wk</strong></span>
              <span>Health: <strong className="text-amber-600 dark:text-amber-400">52%</strong></span>
            </div>

            <div className="text-[11px] font-medium text-rose-700 dark:text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Yellow Churn Warning (Plant 7 & Saltend Drops)</span>
            </div>
          </div>
        </div>

        {/* CARD 3: ACCOUNT K (SURPRISE DROP) */}
        <div
          onClick={() => onSelectAccount('K')}
          className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
            selectedAccount === 'K'
              ? isDark ? 'border-purple-500 bg-purple-950/20 shadow-md ring-2 ring-purple-500/40' : 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-400/50'
              : isDark ? 'border-gray-800 bg-[#0c0e12] hover:border-gray-700' : 'border-gray-300 bg-white hover:border-gray-400 shadow-sm'
          }`}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-950 border border-purple-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>Account K • Live Surprise Drop</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                $14,000 ARR
              </span>
            </div>

            <h4 className="text-base font-bold text-black dark:text-white leading-tight">
              Kestrel Estates (Private Security)
            </h4>

            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
              Private gated community. 1 dock paid & installed at North Gate, 0 flying. Local installer vanished without commissioning.
            </p>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-200 dark:border-gray-800 text-xs">
            <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-[11px]">
              <span>Docks: <strong>1 Installed</strong></span>
              <span>Sorties: <strong className="text-rose-600">0 Flying</strong></span>
              <span>Health: <strong className="text-rose-600">35%</strong></span>
            </div>

            <div className="text-[11px] font-medium text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Pilot Training Needed • Monday Board Vote</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
