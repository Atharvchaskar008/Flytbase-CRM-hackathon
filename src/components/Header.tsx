'use client';

import React from 'react';
import Link from 'next/link';
import { AccountId } from '../types/crm';
import { RefreshCw, Plus, FileText, CheckCircle2, Sun, Moon, BookOpen } from 'lucide-react';

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
    <header className={`border-b sticky top-0 z-40 px-4 py-3 transition-colors ${
      isDark ? 'border-[#1a1e24] bg-black text-white' : 'border-gray-200 bg-white text-gray-900 shadow-sm'
    }`}>
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Guide Link */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`} />
            <span className="font-bold text-sm tracking-tight font-sans uppercase">
              FlytBase // CSM
            </span>
          </div>
          <span className={`text-xs border-l pl-3 uppercase ${isDark ? 'text-gray-400 border-gray-800' : 'text-gray-400 border-gray-200'}`}>
            Fleet Intelligence
          </span>

          {/* Direct Platform Guide Link */}
          <Link
            href="/guide"
            className={`flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded text-xs font-medium border transition ${
              isDark 
                ? 'border-gray-800 bg-[#0e1014] text-gray-300 hover:text-white hover:border-gray-700' 
                : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-sans">Platform Guide</span>
          </Link>
        </div>

        {/* Account Segment Switcher */}
        <div className={`flex items-center border rounded-lg p-0.5 text-xs font-sans ${
          isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-200 bg-gray-100'
        }`}>
          <button
            onClick={() => onSelectAccount('ALL')}
            className={`px-3 py-1 rounded-md transition text-xs font-medium ${
              selectedAccount === 'ALL'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => onSelectAccount('A')}
            className={`px-3 py-1 rounded-md transition text-xs font-medium ${
              selectedAccount === 'A'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Eastern Police (35 Docks)
          </button>
          <button
            onClick={() => onSelectAccount('B')}
            className={`px-3 py-1 rounded-md transition text-xs font-medium ${
              selectedAccount === 'B'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            Aldermoor (14 Docks)
          </button>
          <button
            onClick={() => onSelectAccount('K')}
            className={`px-3 py-1 rounded-md transition text-xs font-medium flex items-center gap-1.5 ${
              selectedAccount === 'K'
                ? isDark ? 'bg-white text-black font-semibold' : 'bg-white text-black font-semibold shadow-sm'
                : isDark ? 'text-amber-400 hover:text-white' : 'text-amber-800 hover:text-black'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-bold">Kestrel Estates (Live Drop!)</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Status Pill */}
          <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs ${
            isDark ? 'border-gray-800 bg-[#0a0c0f] text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'
          }`}>
            <CheckCircle2 className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className="font-mono text-[11px]">STREAM LIVE</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Switch to White Background' : 'Switch to Dark Mode'}
            className={`flex items-center justify-center w-8 h-8 rounded-lg border transition ${
              isDark ? 'border-gray-800 bg-black text-white hover:bg-gray-900' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onSync}
            disabled={isSyncing}
            title={lastSyncMessage || 'Sync with Questathon API'}
            className={`flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-lg transition disabled:opacity-50 ${
              isDark ? 'bg-black hover:bg-gray-900 text-white border-gray-800' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 shadow-sm'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="font-medium">Sync</span>
          </button>

          <button
            onClick={onOpenNoteModal}
            className={`flex items-center gap-1.5 text-xs border px-3 py-1.5 rounded-lg transition ${
              isDark ? 'bg-black hover:bg-gray-900 text-white border-gray-800' : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200 shadow-sm'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="font-medium">Note</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg transition shadow-sm ${
              isDark ? 'bg-white hover:bg-gray-200 text-black' : 'bg-black hover:bg-gray-800 text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="tracking-wide">Monday Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
};
