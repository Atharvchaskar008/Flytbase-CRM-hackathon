'use client';

import React from 'react';
import { AccountId } from '../types/crm';
import { RefreshCw, Plus, FileText, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  selectedAccount: AccountId | 'ALL';
  onSelectAccount: (acc: AccountId | 'ALL') => void;
  onSync: () => void;
  isSyncing: boolean;
  lastSyncMessage?: string;
  onOpenNoteModal: () => void;
  onOpenReportModal: () => void;
  signalsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedAccount,
  onSelectAccount,
  onSync,
  isSyncing,
  lastSyncMessage,
  onOpenNoteModal,
  onOpenReportModal,
  signalsCount,
}) => {
  return (
    <header className="border-b border-[#1a1e24] bg-black sticky top-0 z-40 px-4 py-2.5">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold text-sm tracking-tight text-white font-mono uppercase">
              FlytBase // CSM
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#666] border-l border-[#222] pl-3 uppercase">
            30D Fleet Command
          </span>
        </div>

        {/* Account Segment Switcher (Monochrome TamperSafe style) */}
        <div className="flex items-center border border-[#22262d] rounded bg-[#07080a] p-0.5 text-xs font-mono">
          <button
            onClick={() => onSelectAccount('ALL')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'ALL'
                ? 'bg-white text-black font-semibold'
                : 'text-[#888] hover:text-white'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => onSelectAccount('A')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'A'
                ? 'bg-white text-black font-semibold'
                : 'text-[#888] hover:text-white'
            }`}
          >
            A: Eastern Police
          </button>
          <button
            onClick={() => onSelectAccount('B')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'B'
                ? 'bg-white text-black font-semibold'
                : 'text-[#888] hover:text-white'
            }`}
          >
            B: Aldermoor
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Status Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border border-[#1e232a] bg-[#0a0c0f] text-[10px] font-mono text-[#888]">
            <CheckCircle2 className="w-3 h-3 text-white" />
            <span>STREAM LIVE</span>
          </div>

          <button
            onClick={onSync}
            disabled={isSyncing}
            title={lastSyncMessage || 'Sync with Questathon API'}
            className="flex items-center gap-1.5 text-xs font-mono bg-black hover:bg-[#111] text-white border border-[#22262d] px-2.5 py-1.5 rounded transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-[11px] uppercase">Sync</span>
          </button>

          <button
            onClick={onOpenNoteModal}
            className="flex items-center gap-1 text-xs font-mono bg-black hover:bg-[#111] text-white border border-[#22262d] px-2.5 py-1.5 rounded transition"
          >
            <Plus className="w-3 h-3" />
            <span className="text-[11px] uppercase">Note</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 text-xs font-mono bg-white hover:bg-[#e0e0e0] text-black font-semibold px-3 py-1.5 rounded transition"
          >
            <FileText className="w-3 h-3 text-black" />
            <span className="text-[11px] uppercase tracking-wider">Monday Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
};
