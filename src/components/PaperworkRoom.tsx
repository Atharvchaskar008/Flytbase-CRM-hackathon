'use client';

import React from 'react';
import { AccountDetail, AccountId, PaperworkFile } from '../types/crm';
import { FileText, Check } from 'lucide-react';

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

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Data Room // Verified Audit Proofs
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Evidence & Citations</span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
          {allFiles.length} Records on File
        </span>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-2">
        {allFiles.map((file) => {
          const isHighlighted = highlightedFileId === file.id;
          return (
            <div
              key={file.id}
              className={`border p-3 rounded transition space-y-2 ${
                isHighlighted
                  ? isDark ? 'border-white bg-[#101216]' : 'border-black bg-gray-50 ring-1 ring-black'
                  : isDark ? 'border-[#1c2026] bg-[#07080a] hover:border-[#2a2f38]' : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-900'}`} />
                  <div>
                    <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{file.title}</div>
                    <div className={`text-[10px] ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>ID: {file.id} • Path: {file.path}</div>
                  </div>
                </div>
                <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border ${
                  isDark ? 'border-[#333] text-white' : 'border-gray-300 text-gray-700 bg-gray-50'
                }`}>
                  {file.type}
                </span>
              </div>

              <p className={`text-[11px] font-sans leading-tight ${isDark ? 'text-[#999]' : 'text-gray-600'}`}>
                {file.summary}
              </p>

              {file.keyTakeaways.length > 0 && (
                <div className={`space-y-1 text-[11px] font-sans pt-1 border-t ${
                  isDark ? 'border-[#181a1f]' : 'border-gray-100'
                }`}>
                  <strong className={`font-mono text-[10px] uppercase block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Proof Points:
                  </strong>
                  {file.keyTakeaways.map((point, idx) => (
                    <div key={idx} className={`flex items-center gap-1.5 ${isDark ? 'text-[#aaa]' : 'text-gray-700'}`}>
                      <Check className={`w-3 h-3 shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
