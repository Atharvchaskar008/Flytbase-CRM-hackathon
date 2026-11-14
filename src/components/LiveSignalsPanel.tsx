'use client';

import React from 'react';
import { LiveSignal, AccountId } from '../types/crm';
import { Radio, AlertCircle, Clock } from 'lucide-react';

interface LiveSignalsPanelProps {
  signals: LiveSignal[];
  selectedAccount: AccountId | 'ALL';
}

export const LiveSignalsPanel: React.FC<LiveSignalsPanelProps> = ({
  signals,
  selectedAccount,
}) => {
  const filteredSignals = selectedAccount === 'ALL'
    ? signals
    : signals.filter(s => s.account === selectedAccount);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h4 className="text-xs uppercase tracking-wider font-bold text-white">Live Intelligence Stream</h4>
        </div>
        <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
          {filteredSignals.length} events logged
        </span>
      </div>

      {filteredSignals.length === 0 ? (
        <div className="text-xs text-slate-500 py-4 text-center">
          No live events received yet. As the scenario unfolds, signals will appear here automatically.
        </div>
      ) : (
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredSignals.map((sig) => (
            <div
              key={sig.id}
              className={`p-3 rounded-lg border text-xs transition ${
                sig.impactLevel === 'high'
                  ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-bold text-white flex items-center gap-1.5">
                  {sig.impactLevel === 'high' && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
                  {sig.title}
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3" /> {sig.dated}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">{sig.summary}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                  Account {sig.account}
                </span>
                {sig.impactLevel && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                    sig.impactLevel === 'high' ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {sig.impactLevel} Impact
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
