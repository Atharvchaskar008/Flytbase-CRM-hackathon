'use client';

import React from 'react';
import { LiveSignal, AccountId } from '../types/crm';

interface LiveSignalsPanelProps {
  signals: LiveSignal[];
  selectedAccount: AccountId | 'ALL';
}

export const LiveSignalsPanel: React.FC<LiveSignalsPanelProps> = ({
  signals,
  selectedAccount,
}) => {
  const filtered = selectedAccount === 'ALL'
    ? signals
    : signals.filter(s => s.account === selectedAccount);

  return (
    <div className="border border-[#1c2026] bg-[#07080a] p-3 rounded space-y-2.5 font-mono">
      <div className="flex items-center justify-between border-b border-[#181a1f] pb-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="text-white font-bold tracking-wider uppercase">Live Stream</span>
        </div>
        <span className="text-[10px] text-[#666] uppercase">{filtered.length} Events</span>
      </div>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filtered.map((s) => (
          <div
            key={s.id}
            className={`p-2.5 rounded border text-[11px] transition ${
              s.impactLevel === 'high'
                ? 'border-[#333] bg-[#0d0e12] text-white'
                : 'border-[#181a20] bg-black text-[#aaa]'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] text-[#666] mb-1">
              <span className="font-bold text-white uppercase tracking-wider">Acc {s.account}</span>
              <span>{s.dated}</span>
            </div>
            <div className="font-semibold text-white font-sans text-xs">{s.title}</div>
            <p className="text-[11px] font-sans text-[#888] mt-1 leading-normal">{s.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
