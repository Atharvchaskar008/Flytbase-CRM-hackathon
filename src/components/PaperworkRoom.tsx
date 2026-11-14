'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, PaperworkFile } from '../types/crm';
import { FileText, Check, ShieldCheck, Search, Download, ExternalLink, Eye, Lock, FileCheck } from 'lucide-react';

interface PaperworkRoomProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  highlightedFileId?: string | null;
  isDark?: boolean;
}

export const PaperworkRoom: React.FC<PaperworkRoomProps> = ({
  accounts,
  selectedAccount,
  highlightedFileId,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allFiles: PaperworkFile[] = currentAccounts.flatMap(a => a.paperwork);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'contract' | 'report' | 'transcript' | 'tender'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDoc, setActiveDoc] = useState<PaperworkFile | null>(() => {
    if (highlightedFileId) {
      return allFiles.find(f => f.id === highlightedFileId) || allFiles[0] || null;
    }
    return allFiles[0] || null;
  });

  const filteredFiles = allFiles.filter(f => {
    const matchesFilter = selectedFilter === 'ALL' || f.type.toLowerCase().includes(selectedFilter);
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* What is the Data Room? - Explainer Box */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What Is the Data Room & Why Does It Matter?
              </h3>
            </div>
            <p className={`text-sm leading-relaxed max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              In enterprise B2B robotics, you can never claim revenue or promise uptime based on hearsay. 
              The <strong>Data Room is the secure audit vault</strong> holding the ground-truth legal contracts, 
              signed Purchase Orders (POs), Service Level Agreements (SLAs), and engineering maintenance logs. 
              Whenever you see a citation in the dashboard (such as <code className="font-mono text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">PO-ECPA-2024-001</code>), 
              it is backed by an unalterable signed document here.
            </p>
          </div>

          <div className={`px-4 py-3 rounded-xl border flex items-center gap-3 shrink-0 ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
          }`}>
            <Lock className="w-4 h-4 text-emerald-500" />
            <div className="text-xs">
              <strong className="block font-semibold">100% Zero-Copy Receipts</strong>
              <span className="text-gray-500 text-[11px]">{allFiles.length} Certified Audit Records</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium w-full sm:w-auto">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                selectedFilter === 'ALL'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-black text-white font-semibold'
                  : isDark ? 'border-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              All Records ({allFiles.length})
            </button>
            <button
              onClick={() => setSelectedFilter('contract')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                selectedFilter === 'contract'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-black text-white font-semibold'
                  : isDark ? 'border-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              Contracts & POs
            </button>
            <button
              onClick={() => setSelectedFilter('report')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                selectedFilter === 'report'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-black text-white font-semibold'
                  : isDark ? 'border-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              SLAs & Engineering
            </button>
            <button
              onClick={() => setSelectedFilter('transcript')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                selectedFilter === 'transcript'
                  ? isDark ? 'bg-white text-black font-semibold' : 'bg-black text-white font-semibold'
                  : isDark ? 'border-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              Meeting Transcripts
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search file title or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border transition outline-none ${
                isDark 
                  ? 'border-gray-800 bg-[#0e1014] text-white focus:border-gray-600' 
                  : 'border-gray-200 bg-gray-50 text-gray-900 focus:border-gray-400'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Split View: Left Document Library & Right Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Document Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-1">
            Available Evidence Vault ({filteredFiles.length})
          </div>

          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredFiles.map((file) => {
              const isSelected = activeDoc?.id === file.id;
              const isTargeted = highlightedFileId === file.id;

              return (
                <div
                  key={file.id}
                  onClick={() => setActiveDoc(file)}
                  className={`p-4 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? isDark 
                        ? 'border-emerald-500 bg-[#0f1512] ring-1 ring-emerald-500/50' 
                        : 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600/50'
                      : isDark 
                        ? 'border-gray-800/80 bg-[#0c0e12] hover:border-gray-700' 
                        : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className={`w-4 h-4 ${isSelected ? 'text-emerald-500' : 'text-gray-400'}`} />
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                        {file.title}
                      </h4>
                    </div>
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-semibold ${
                      isSelected 
                        ? 'bg-emerald-500 text-white' 
                        : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {file.type}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 font-mono mb-2">
                    Citation ID: {file.id}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {file.summary}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Full Document Inspector / Reader (7 Cols) */}
        <div className="lg:col-span-7">
          {activeDoc ? (
            <div className={`p-6 md:p-8 rounded-2xl border space-y-6 ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Verified Legal Record
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      {activeDoc.id}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    {activeDoc.title}
                  </h3>
                  <div className="text-xs text-gray-500 mt-1 font-mono">
                    Storage Path: {activeDoc.path}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right text-xs">
                    <span className="block text-gray-400">Account Binding</span>
                    <strong className="text-sm">Account {activeDoc.account}</strong>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Certified Document Synopsis:
                </h5>
                <div className={`p-4 rounded-xl border text-sm leading-relaxed ${
                  isDark ? 'border-gray-800 bg-[#07080a] text-gray-200' : 'border-gray-200 bg-gray-50 text-gray-800'
                }`}>
                  {activeDoc.summary}
                </div>
              </div>

              {/* Verified Proof Clauses / Key Takeaways */}
              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Contractual Clauses & Ground Truth Takeaways:
                </h5>
                <div className="space-y-2">
                  {activeDoc.keyTakeaways.map((takeaway, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                        isDark ? 'border-gray-800 bg-[#101317] text-gray-300' : 'border-gray-200 bg-white text-gray-700'
                      }`}
                    >
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Clause {idx + 1}:</strong> {takeaway}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Verification Footnote */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Immutable Ground-Truth Evidence • Questathon Verified</span>
                </div>
                <span className="font-mono">Ref: {activeDoc.id}</span>
              </div>

            </div>
          ) : (
            <div className={`p-12 rounded-2xl border text-center ${
              isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-gray-50'
            }`}>
              <FileText className="w-10 h-10 mx-auto text-gray-400 mb-3" />
              <h4 className="text-base font-bold">No Document Selected</h4>
              <p className="text-xs text-gray-500 mt-1">Select an evidence file from the left vault to inspect.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
