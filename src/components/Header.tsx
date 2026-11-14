'use client';

import React from 'react';
import { AccountId } from '../types/crm';
import { 
  Building2, 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  PlusCircle, 
  FileText,
  Radio
} from 'lucide-react';

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
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Title */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-wide text-white">FlytBase CSM</span>
              <span className="text-[10px] uppercase font-mono tracking-wider bg-sky-950 text-sky-300 border border-sky-800/60 px-1.5 py-0.5 rounded">
                DiaB Fleet Intel
              </span>
            </div>
            <p className="text-xs text-slate-400">Account Quest • 30-Day Executive Playbook</p>
          </div>
        </div>

        {/* Account Selector Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => onSelectAccount('ALL')}
            className={`px-3 py-1.5 rounded-md transition ${
              selectedAccount === 'ALL'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Portfolio Overview
          </button>
          <button
            onClick={() => onSelectAccount('A')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              selectedAccount === 'A'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Acc A: Metro Police
          </button>
          <button
            onClick={() => onSelectAccount('B')}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              selectedAccount === 'B'
                ? 'bg-sky-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Acc B: Apex Mining
          </button>
        </div>

        {/* Actions & Sync Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSync}
            disabled={isSyncing}
            title={lastSyncMessage || 'Sync data with Questathon upstream'}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-md transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-sky-400' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={onOpenNoteModal}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-md transition"
          >
            <PlusCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Add Note</span>
          </button>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 text-xs bg-sky-600 hover:bg-sky-500 text-white font-medium px-3 py-1.5 rounded-md transition shadow"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Monday Brief</span>
          </button>
        </div>

      </div>
    </header>
  );
};
