'use client';

import React from 'react';
import { AccountDetail, AccountId, PaperworkFile } from '../types/crm';
import { FileText, ShieldCheck, CheckCircle2, Download, ExternalLink } from 'lucide-react';

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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold text-white">Data Room: Verified Files & Legal Paperwork</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit-grade repository of all executed contracts, service level agreements, and compliance dossiers.
          </p>
        </div>
        <div className="text-xs font-mono bg-sky-950/60 text-sky-300 border border-sky-800/80 px-2.5 py-1 rounded">
          {allFiles.length} Certified Documents on File
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {allFiles.map((file) => {
          const isHighlighted = highlightedFileId === file.id;
          return (
            <div
              key={file.id}
              className={`border rounded-xl p-4 transition space-y-3 ${
                isHighlighted
                  ? 'bg-sky-950/30 border-sky-400 ring-2 ring-sky-400/50'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{file.title}</h4>
                    <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                      Citation ID: <code className="text-sky-300">{file.id}</code>
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                  {file.type}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                {file.summary}
              </p>

              {file.keyTakeaways.length > 0 && (
                <div className="space-y-1 text-xs">
                  <span className="text-slate-400 font-semibold block text-[11px]">Audit Proof Points:</span>
                  <ul className="space-y-1">
                    {file.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Path: {file.path}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Grounded
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
