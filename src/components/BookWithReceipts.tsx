'use client';

import React from 'react';
import { AccountDetail, AccountId, Deal } from '../types/crm';
import { ExternalLink } from 'lucide-react';

interface BookWithReceiptsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
  isDark?: boolean;
}

export const BookWithReceipts: React.FC<BookWithReceiptsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
  isDark = false,
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
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Question 1 // What is the book worth?
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Book with Receipts</span>
        </div>
        <div className="flex items-center gap-2 text-[11px]">
          <span className={`px-2 py-0.5 rounded border ${
            isDark ? 'border-[#2a2f38] bg-[#0c0d10] text-white' : 'border-gray-200 bg-gray-50 text-gray-900'
          }`}>
            Verified: ${(verifiedARR / 1000).toFixed(0)}k
          </span>
          <span className={`px-2 py-0.5 rounded border ${
            isDark ? 'border-[#222] bg-[#07080a] text-[#888]' : 'border-gray-200 bg-white text-gray-500'
          }`}>
            Speculative: ${(unverifiedPipeline / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Table */}
      <div className={`border rounded overflow-hidden ${
        isDark ? 'border-[#1c2026] bg-[#07080a]' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b text-[10px] uppercase ${
                isDark ? 'border-[#1c2026] text-[#777] bg-[#0a0c0f]' : 'border-gray-200 text-gray-500 bg-gray-50'
              }`}>
                <th className="py-2.5 px-3">Deal & Scope</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Value</th>
                <th className="py-2.5 px-3">Audit Citation Receipts</th>
                <th className="py-2.5 px-3">Active Blocker & Unlock</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-[#15181d]' : 'divide-gray-100'}`}>
              {allDeals.map((deal) => {
                return (
                  <tr key={deal.id} className={`transition ${
                    isDark ? 'hover:bg-[#0c0e12]' : 'hover:bg-gray-50'
                  }`}>
                    <td className="py-2.5 px-3">
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{deal.title}</div>
                      <div className={`text-[10px] mt-0.5 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>ID: {deal.id} • Acc {deal.account}</div>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold border ${
                        deal.isVerified
                          ? isDark ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                          : isDark ? 'border-[#333] bg-[#111] text-[#888]' : 'border-gray-200 bg-gray-100 text-gray-600'
                      }`}>
                        {deal.isVerified ? 'VERIFIED' : 'SPECULATIVE'}
                      </span>
                      <div className={`text-[10px] mt-1 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>{deal.confidenceScore}% confidence</div>
                    </td>

                    <td className={`py-2.5 px-3 font-semibold whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${deal.verifiedValue.toLocaleString()}
                      {!deal.isVerified && (
                        <div className={`text-[10px] font-normal ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>Claim: ${deal.value.toLocaleString()}</div>
                      )}
                    </td>

                    <td className="py-2.5 px-3">
                      <div className="flex flex-wrap gap-1">
                        {deal.citations.map((cite) => (
                          <button
                            key={cite}
                            onClick={() => onSelectCitation?.(cite)}
                            className={`px-1.5 py-0.5 rounded text-[10px] border transition flex items-center gap-1 ${
                              isDark 
                                ? 'border-[#252a32] bg-[#0c0e11] text-[#aaa] hover:text-white hover:border-white' 
                                : 'border-gray-200 bg-gray-50 text-gray-700 hover:text-black hover:border-black'
                            }`}
                          >
                            <span>{cite}</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                          </button>
                        ))}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 font-sans text-[11px] leading-tight max-w-xs">
                      <div className={isDark ? 'text-[#ccc]' : 'text-gray-800'}>
                        <strong className={isDark ? 'text-white' : 'text-gray-900'}>Blocker:</strong> {deal.blockerReason || 'None'}
                      </div>
                      {deal.unlockCondition && (
                        <div className={`mt-1 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
                          <strong className={isDark ? 'text-[#aaa]' : 'text-gray-700'}>Unlock:</strong> {deal.unlockCondition}
                        </div>
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
