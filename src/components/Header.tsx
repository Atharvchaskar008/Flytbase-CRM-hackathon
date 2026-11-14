'use client';

import React from 'react';
import { AccountId } from '../types/crm';
import { RefreshCw, Plus, FileText, CheckCircle2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  selectedAccount: AccountId | 'ALL';
  onSelectAccount: (acc: AccountId | 'ALL') => void;
  onSync: () => void;
  isSyncing: boolean;
  lastSyncMessage?: string;
  onOpenNoteModal: () => void;
  onOpenReportModal: () => void;
  signalsCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
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
  theme,
  onToggleTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`border-b sticky top-0 z-40 px-4 py-2.5 transition-colors ${
      isDark ? 'border-[#1a1e24] bg-black text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
    }`}>
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`} />
            <span className="font-semibold text-sm tracking-tight font-mono uppercase">
              FlytBase // CSM
            </span>
          </div>
          <span className={`text-[11px] font-mono border-l pl-3 uppercase ${isDark ? 'text-[#666] border-[#222]' : 'text-gray-400 border-gray-200'}`}>
            30D Fleet Command
          </span>
        </div>

        {/* Account Segment Switcher */}
        <div className={`flex items-center border rounded p-0.5 text-xs font-mono ${
          isDark ? 'border-[#22262d] bg-[#07080a]' : 'border-gray-200 bg-gray-100'
        }`}>
          <button
            onClick={() => onSelectAccount('ALL')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'ALL'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-[#888] hover:text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => onSelectAccount('A')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'A'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-[#888] hover:text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            A: Eastern Police
          </button>
          <button
            onClick={() => onSelectAccount('B')}
            className={`px-3 py-1 rounded transition text-[11px] uppercase tracking-wider ${
              selectedAccount === 'B'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-[#888] hover:text-white' : 'text-gray-500 hover:text-black'
            }`}
          >
            B: Aldermoor
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Status Pill */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono ${
            isDark ? 'border-[#1e232a] bg-[#0a0c0f] text-[#888]' : 'border-gray-200 bg-gray-50 text-gray-600'
          }`}>
            <CheckCircle2 className={`w-3 h-3 ${isDark ? 'text-white' : 'text-black'}`} />
            <span>STREAM LIVE</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to White Background' : 'Switch to Dark Mode'}
            className={`flex items-center justify-center w-8 h-8 rounded border transition ${
              isDark ? 'border-[#22262d] bg-black text-white hover:bg-[#111]' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onSync}
            disabled={isSyncing}
            title={lastSyncMessage || 'Sync with Questathon API'}
            className={`flex items-center gap-1.5 text-xs font-mono border px-2.5 py-1.5 rounded transition disabled:opacity-50 ${
              isDark ? 'bg-black hover:bg-[#111] text-white border-[#22262d]' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-[11px] uppercase">Sync</span>
          </button>

          <button
            onClick={onOpenNoteModal}
            className={`flex items-center gap-1 text-xs font-mono border px-2.5 py-1.5 rounded transition ${
              isDark ? 'bg-black hover:bg-[#111] text-white border-[#22262d]' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span className="text-[11px] uppercase">Note</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className={`flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded transition shadow-sm ${
              isDark ? 'bg-white hover:bg-[#e0e0e0] text-black' : 'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            <FileText className="w-3 h-3" />
            <span className="text-[11px] uppercase tracking-wider">Monday Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
};
