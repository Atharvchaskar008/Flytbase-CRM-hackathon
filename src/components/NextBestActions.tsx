'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, NextBestAction } from '../types/crm';
import { 
  CheckCircle2, 
  Clock, 
  User, 
  Target, 
  FileCheck, 
  ArrowUpRight, 
  Flame,
  Check
} from 'lucide-react';

interface NextBestActionsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
}

export const NextBestActions: React.FC<NextBestActionsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const [actions, setActions] = useState<NextBestAction[]>(() => {
    return currentAccounts.flatMap(a => a.actions).sort((a, b) => a.rank - b.rank);
  });

  const toggleAction = (id: string) => {
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: a.status === 'completed' ? 'pending' : 'completed',
        };
      }
      return a;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-white">Question 3: What do you do first? (Monday 9am List)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked, owned, and dated execution list. Each move advances a specific deal within hard customer deadlines.
          </p>
        </div>
        <div className="text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-800/80 px-2.5 py-1 rounded">
          Top Priority Execution Playbook
        </div>
      </div>

      {/* Action Cards */}
      <div className="space-y-3">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          const account = accounts[act.account];

          return (
            <div
              key={act.id}
              className={`border rounded-xl p-4 transition ${
                isDone
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : act.rank === 1
                  ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border-amber-500/50 shadow-lg'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Rank Badge */}
                  <div
                    className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      act.rank === 1
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : act.rank === 2
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    #{act.rank}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                        {act.title}
                      </span>
                      {selectedAccount === 'ALL' && account && (
                        <span className="text-[10px] font-medium bg-slate-800 text-sky-300 border border-slate-700 px-2 py-0.5 rounded">
                          {account.name.split(' ')[0]}
                        </span>
                      )}
                    </div>

                    {/* Context / Business Reason */}
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                      <strong className="text-slate-100">Why it matters:</strong> {act.businessReason}
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">
                      <strong>Expected Outcome:</strong> {act.expectedOutcome}
                    </p>

                    {/* Evidence / Citations */}
                    {act.evidenceNeeded.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <FileCheck className="w-3 h-3 text-sky-400" /> Evidence required:
                        </span>
                        {act.evidenceNeeded.map((ev) => (
                          <button
                            key={ev}
                            onClick={() => onSelectCitation?.(ev)}
                            className="text-[10px] font-mono bg-sky-950/60 text-sky-300 hover:text-sky-200 border border-sky-800/80 px-1.5 py-0.5 rounded hover:bg-sky-900/60 transition"
                          >
                            {ev}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side metadata & Toggle */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-1 rounded">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{act.deadline}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>{act.owner}</span>
                  </div>

                  <button
                    onClick={() => toggleAction(act.id)}
                    className={`mt-1 flex items-center gap-1 text-xs px-2.5 py-1 rounded border transition ${
                      isDone
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Completed' : 'Mark Done'}</span>
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
