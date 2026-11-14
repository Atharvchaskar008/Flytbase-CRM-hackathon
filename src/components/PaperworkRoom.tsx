'use client';

import React from 'react';
import { AccountDetail, AccountId, PaperworkFile } from '../types/crm';
import { FileText, Check } from 'lucide-react';

interface PaperworkRoomProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  highlightedFileId?: string | null;
}

export const PaperworkRoom: React.FC<PaperworkRoomProps> = ({
  accounts,
  selectedAccount,
  highlightedFileId,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allFiles: PaperworkFile[] = currentAccounts.flatMap(a => a.paperwork);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Data Room // Verified Audit Proofs
          </span>
          <span className="text-[#666] ml-2">Evidence & Citations</span>
        </div>
        <span className="text-[10px] text-[#888] uppercase">
          {allFiles.length} Records on File
        </span>
      </div>

      {/* Grid of Files */}
      <div className="grid md:grid-cols-2 gap-2">
        {allFiles.map((file) => {
          const isHighlighted = highlightedFileId === file.id;
          return (
            <div
              key={file.id}
              className={`border p-3 rounded transition space-y-2 ${
                isHighlighted
                  ? 'border-white bg-[#101216]'
                  : 'border-[#1c2026] bg-[#07080a] hover:border-[#2a2f38]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-white" />
                  <div>
                    <div className="text-xs font-bold text-white">{file.title}</div>
                    <div className="text-[10px] text-[#777]">ID: {file.id} • Path: {file.path}</div>
                  </div>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-[#333] text-white">
                  {file.type}
                </span>
              </div>

              <p className="text-[11px] font-sans text-[#999] leading-tight">
                {file.summary}
              </p>

              {file.keyTakeaways.length > 0 && (
                <div className="space-y-1 text-[11px] font-sans pt-1 border-t border-[#181a1f]">
                  <strong className="text-white font-mono text-[10px] uppercase block">Proof Points:</strong>
                  {file.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[#aaa]">
                      <Check className="w-3 h-3 text-white shrink-0" />
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
