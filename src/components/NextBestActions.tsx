'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, NextBestAction } from '../types/crm';
import { Check } from 'lucide-react';

interface NextBestActionsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
  isDark?: boolean;
}

export const NextBestActions: React.FC<NextBestActionsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
  isDark = false,
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
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Question 3 // What do you do first?
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Monday 9:00 AM Ranked Priority List</span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
          {actions.filter(a => a.status === 'completed').length} / {actions.length} Completed
        </span>
      </div>

      {/* Action List */}
      <div className="space-y-1.5">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          return (
            <div
              key={act.id}
              className={`border p-3 rounded transition flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                isDone
                  ? isDark ? 'bg-black opacity-40 border-[#15171a]' : 'bg-gray-100 opacity-50 border-gray-200'
                  : act.rank === 1
                  ? isDark ? 'bg-[#0c0d10] border-[#333]' : 'bg-gray-50 border-gray-900 shadow-sm'
                  : isDark ? 'bg-[#07080a] border-[#1c2026] hover:border-[#282d36]' : 'bg-white border-gray-200 hover:border-gray-400 shadow-sm'
              }`}
            >
              {/* Left Side */}
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                  act.rank === 1 
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : isDark ? 'bg-[#1a1c22] text-[#888]' : 'bg-gray-200 text-gray-700'
                }`}>
                  #{act.rank}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs font-semibold ${
                      isDone 
                        ? 'line-through text-gray-400' 
                        : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {act.title}
                    </span>
                    <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border ${
                      isDark ? 'border-[#222] bg-[#111] text-[#888]' : 'border-gray-200 bg-gray-100 text-gray-600'
                    }`}>
                      Acc {act.account}
                    </span>
                  </div>

                  <p className={`text-[11px] mt-1 font-sans leading-normal ${isDark ? 'text-[#888]' : 'text-gray-600'}`}>
                    <strong className={isDark ? 'text-[#bbb]' : 'text-gray-900'}>Why:</strong> {act.businessReason}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px]">
                    <span className={isDark ? 'text-[#666]' : 'text-gray-400'}>Proof needed:</span>
                    {act.evidenceNeeded.map((ev) => (
                      <button
                        key={ev}
                        onClick={() => onSelectCitation?.(ev)}
                        className={`px-1.5 py-0.5 rounded border transition ${
                          isDark 
                            ? 'border-[#2a2f38] bg-[#0f1114] text-[#ccc] hover:border-white' 
                            : 'border-gray-300 bg-gray-50 text-gray-700 hover:border-black'
                        }`}
                      >
                        {ev}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className={`flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 ${
                isDark ? 'border-[#1c2026]' : 'border-gray-200'
              }`}>
                <div className="text-right text-[11px]">
                  <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{act.deadline}</div>
                  <div className={`text-[10px] ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>{act.owner}</div>
                </div>

                <button
                  onClick={() => toggleAction(act.id)}
                  className={`px-2.5 py-1 rounded text-[11px] uppercase transition flex items-center gap-1 border ${
                    isDone
                      ? isDark ? 'border-[#333] text-[#666] bg-black' : 'border-gray-300 text-gray-400 bg-gray-100'
                      : isDark ? 'border-white text-black bg-white hover:bg-[#e0e0e0] font-semibold' : 'border-black text-white bg-black hover:bg-gray-800 font-semibold shadow-sm'
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
