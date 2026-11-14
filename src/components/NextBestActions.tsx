'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, NextBestAction } from '../types/crm';
import { Check } from 'lucide-react';

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
    <div className="space-y-3 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Question 3 // What do you do first?
          </span>
          <span className="text-[#666] ml-2">Monday 9:00 AM Ranked Priority List</span>
        </div>
        <span className="text-[10px] text-[#888] uppercase">
          {actions.filter(a => a.status === 'completed').length} / {actions.length} Completed
        </span>
      </div>

      {/* Action Table / Dense Rows */}
      <div className="space-y-1.5">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          return (
            <div
              key={act.id}
              className={`border border-[#1c2026] p-3 rounded transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isDone
                  ? 'bg-black opacity-40 border-[#15171a]'
                  : act.rank === 1
                  ? 'bg-[#0c0d10] border-[#333]'
                  : 'bg-[#07080a] hover:border-[#282d36]'
              }`}
            >
              {/* Left Side: Rank, Title, Context */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  act.rank === 1 ? 'bg-white text-black' : 'bg-[#1a1c22] text-[#888]'
                }`}>
                  #{act.rank}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-semibold ${isDone ? 'line-through text-[#666]' : 'text-white'}`}>
                      {act.title}
                    </span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-[#222] bg-[#111] text-[#888]">
                      Acc {act.account}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#888] mt-1 font-sans leading-normal">
                    <strong className="text-[#bbb]">Why:</strong> {act.businessReason}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px]">
                    <span className="text-[#666]">Proof needed:</span>
                    {act.evidenceNeeded.map((ev) => (
                      <button
                        key={ev}
                        onClick={() => onSelectCitation?.(ev)}
                        className="px-1.5 py-0.5 rounded border border-[#2a2f38] bg-[#0f1114] text-[#ccc] hover:border-white transition"
                      >
                        {ev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Owner, Deadline & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#1c2026]">
                <div className="text-right text-[11px]">
                  <div className="text-white font-medium">{act.deadline}</div>
                  <div className="text-[#666] text-[10px]">{act.owner}</div>
                </div>

                <button
                  onClick={() => toggleAction(act.id)}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase transition flex items-center gap-1 border ${
                    isDone
                      ? 'border-[#333] text-[#666] bg-black'
                      : 'border-white text-black bg-white hover:bg-[#e0e0e0] font-semibold'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>{isDone ? 'Done' : 'Mark'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
