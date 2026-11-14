'use client';

import React from 'react';
import { AccountDetail, AccountId, Deal } from '../types/crm';
import { 
  BadgePercent, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  Lock, 
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface BookWithReceiptsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
}

export const BookWithReceipts: React.FC<BookWithReceiptsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allDeals: Deal[] = currentAccounts.flatMap(a => a.deals);

  const verifiedDeals = allDeals.filter(d => d.isVerified);
  const speculativeDeals = allDeals.filter(d => !d.isVerified);

  const totalVerifiedARR = verifiedDeals.reduce((sum, d) => sum + d.verifiedValue, 0);
  const totalSpeculativeARR = speculativeDeals.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Question 1: What is the book worth? (Book with Receipts)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Strict separation of verified book value with audit receipts vs. unverified champion claims.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-mono bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 px-2.5 py-1 rounded flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified: ${(totalVerifiedARR / 1000).toFixed(0)}k</span>
          </div>
          <div className="text-xs font-mono bg-amber-950/60 text-amber-300 border border-amber-800/80 px-2.5 py-1 rounded flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Unbacked: ${(totalSpeculativeARR / 1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>

      {/* 1. Verified Deals Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-300">
            Backed with Receipts & Formal Contracts ({verifiedDeals.length})
          </h4>
        </div>

        <div className="grid gap-3">
          {verifiedDeals.map((deal) => {
            const acc = accounts[deal.account];
            return (
              <div 
                key={deal.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{deal.title}</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Stage: {deal.stage}
                      </span>
                      {selectedAccount === 'ALL' && acc && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                          {acc.name.split(' ')[0]}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 block mt-0.5">Deal ID: <code className="text-slate-300">{deal.id}</code></span>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      ${deal.verifiedValue.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Confidence: {deal.confidenceScore}%
                    </span>
                  </div>
                </div>

                {/* Blocker & Unlock Condition */}
                <div className="grid md:grid-cols-2 gap-2 text-xs bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  <div>
                    <span className="text-rose-400 font-semibold block flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Active Blocker:
                    </span>
                    <p className="text-slate-300 mt-0.5">{deal.blockerReason}</p>
                  </div>
                  <div>
                    <span className="text-sky-400 font-semibold block flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlock Condition:
                    </span>
                    <p className="text-slate-300 mt-0.5">{deal.unlockCondition}</p>
                  </div>
                </div>

                {/* Audit Citations */}
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <FileText className="w-3 h-3 text-emerald-400" /> Citation Receipts:
                    </span>
                    {deal.citations.map((cite) => (
                      <button
                        key={cite}
                        onClick={() => onSelectCitation?.(cite)}
                        className="text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 px-2 py-0.5 rounded transition flex items-center gap-1"
                      >
                        <span>{cite}</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3" />
                    <span>Target Date: {deal.targetDate || 'Day 30'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Speculative / Unbacked Expansion Deals Section */}
      {speculativeDeals.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-300">
              Unverified / Champion Expansion Pipeline ({speculativeDeals.length})
            </h4>
          </div>

          <div className="grid gap-3">
            {speculativeDeals.map((deal) => {
              const acc = accounts[deal.account];
              return (
                <div 
                  key={deal.id}
                  className="bg-slate-900/60 border border-amber-900/40 rounded-xl p-4 transition space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200">{deal.title}</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                          Tentative
                        </span>
                        {selectedAccount === 'ALL' && acc && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                            {acc.name.split(' ')[0]}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-amber-400/90 block mt-0.5">
                        Claimed Value: ${deal.value.toLocaleString()} • Backed: ${deal.verifiedValue.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-mono text-amber-400 font-semibold">
                        {deal.confidenceScore}% Confidence
                      </span>
                      <span className="text-[11px] text-slate-400 block">Pending verification</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950/40 p-2 rounded border border-slate-800/60">
                    <strong className="text-amber-300">Why not fully backed:</strong> {deal.blockerReason}
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-slate-400">Citations:</span>
                    {deal.citations.map((cite) => (
                      <span key={cite} className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        {cite}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
