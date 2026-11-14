'use client';

import React from 'react';
import { LiveSignal, AccountId } from '../types/crm';

interface LiveSignalsPanelProps {
  signals: LiveSignal[];
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const LiveSignalsPanel: React.FC<LiveSignalsPanelProps> = ({
  signals,
  selectedAccount,
  isDark = false,
}) => {
  const filtered = selectedAccount === 'ALL'
    ? signals
    : signals.filter(s => s.account === selectedAccount);

  return (
    <div className={`border p-3 rounded space-y-2.5 font-mono ${
      isDark ? 'border-[#1c2026] bg-[#07080a]' : 'border-gray-200 bg-white shadow-sm'
    }`}>
      <div className={`flex items-center justify-between border-b pb-2 text-[11px] ${
        isDark ? 'border-[#181a1f]' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-white' : 'bg-black'}`} />
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Live Stream
          </span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>
          {filtered.length} Events
        </span>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`p-2.5 rounded border text-[11px] transition ${
              s.impactLevel === 'high'
                ? isDark ? 'border-[#333] bg-[#0d0e12] text-white' : 'border-gray-300 bg-gray-50 text-gray-900'
                : isDark ? 'border-[#181a20] bg-black text-[#aaa]' : 'border-gray-100 bg-white text-gray-700'
            }`}
          >
            <div className={`flex items-center justify-between text-[10px] mb-1 ${
              isDark ? 'text-[#666]' : 'text-gray-400'
            }`}>
              <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Acc {s.account}
              </span>
              <span>{s.dated}</span>
            </div>
            <div className={`font-semibold font-sans text-xs ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {s.title}
            </div>
            <p className={`text-[11px] font-sans mt-1 leading-normal ${isDark ? 'text-[#888]' : 'text-gray-600'}`}>
              {s.summary}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
