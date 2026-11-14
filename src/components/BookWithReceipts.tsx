'use client';

import React from 'react';
import { AccountDetail, AccountId, Deal } from '../types/crm';
import { ExternalLink } from 'lucide-react';

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

  const verifiedARR = allDeals.filter(d => d.isVerified).reduce((s, d) => s + d.verifiedValue, 0);
  const unverifiedPipeline = allDeals.filter(d => !d.isVerified).reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Question 1 // What is the book worth?
          </span>
          <span className="text-[#666] ml-2">Book with Receipts</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded border border-[#2a2f38] bg-[#0c0d10] text-white">
            Verified: ${(verifiedARR / 1000).toFixed(0)}k
          </span>
          <span className="px-2 py-0.5 rounded border border-[#222] bg-[#07080a] text-[#888]">
            Speculative: ${(unverifiedPipeline / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* High-density Table */}
      <div className="border border-[#1c2026] rounded overflow-hidden bg-[#07080a]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1c2026] text-[10px] uppercase text-[#777] bg-[#0a0c0f]">
                <th className="py-2.5 px-3">Deal & Scope</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Value</th>
                <th className="py-2.5 px-3">Audit Citation Receipts</th>
                <th className="py-2.5 px-3">Active Blocker & Unlock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#15181d]">
              {allDeals.map((deal) => {
                return (
                  <tr key={deal.id} className="hover:bg-[#0c0e12] transition">
                    {/* Deal Name & Account */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white">{deal.title}</div>
                      <div className="text-[10px] text-[#666] mt-0.5">ID: {deal.id} • Acc {deal.account}</div>
                    </td>

                    {/* Stage & Verification */}
                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${
                        deal.isVerified
                          ? 'border-white bg-white text-black'
                          : 'border-[#333] bg-[#111] text-[#888]'
                      }`}>
                        {deal.isVerified ? 'VERIFIED' : 'SPECULATIVE'}
                      </span>
                      <div className="text-[10px] text-[#666] mt-1">{deal.confidenceScore}% confidence</div>
                    </td>

                    {/* Value */}
                    <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap">
                      ${deal.verifiedValue.toLocaleString()}
                      {!deal.isVerified && (
                        <div className="text-[10px] text-[#777] font-normal">Claim: ${deal.value.toLocaleString()}</div>
                      )}
                    </td>

                    {/* Citations */}
                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {deal.citations.map((cite) => (
                          <button
                            key={cite}
                            onClick={() => onSelectCitation?.(cite)}
                            className="px-1.5 py-0.5 rounded text-[10px] border border-[#252a32] bg-[#0c0e11] text-[#aaa] hover:text-white hover:border-white transition flex items-center gap-1"
                          >
                            <span>{cite}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Blocker & Unlock */}
                    <td className="py-2.5 px-3 font-sans text-[11px] leading-tight max-w-xs">
                      <div className="text-[#ccc]"><strong className="text-white">Blocker:</strong> {deal.blockerReason || 'None'}</div>
                      {deal.unlockCondition && (
                        <div className="text-[#888] mt-1"><strong className="text-[#aaa]">Unlock:</strong> {deal.unlockCondition}</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
