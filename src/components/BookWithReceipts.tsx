'use client';

import React from 'react';
import { AccountDetail, AccountId, Deal } from '../types/crm';
import { ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { DetailModalData } from './ItemDetailModal';

interface BookWithReceiptsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
  onOpenDetail?: (data: DetailModalData) => void;
  isDark?: boolean;
}

export const BookWithReceipts: React.FC<BookWithReceiptsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
  onOpenDetail,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allDeals: Deal[] = currentAccounts.flatMap(a => a.deals);

  const verifiedARR = allDeals.filter(d => d.isVerified).reduce((s, d) => s + d.verifiedValue, 0);
  const unverifiedPipeline = allDeals.filter(d => !d.isVerified).reduce((s, d) => s + d.value, 0);

  const handleOpenDeal = (deal: Deal) => {
    if (onOpenDetail) {
      onOpenDetail({
        type: 'deal',
        title: deal.title,
        account: deal.account,
        subtitle: deal.isVerified 
          ? 'Guaranteed Contract: The customer signed a real contract for this money.' 
          : 'Future Opportunity: We are talking about this, but nothing is signed yet.',
        badge: deal.isVerified ? 'Signed on Paper' : 'Not Signed Yet',
        stats: [
          { label: 'Real Signed Money', value: `$${deal.verifiedValue.toLocaleString()}`, color: 'text-emerald-600' },
          { label: 'Potential New Deal', value: `$${deal.value.toLocaleString()}`, color: 'text-blue-600' },
          { label: 'Paperwork Status', value: deal.isVerified ? 'Signed Contract' : 'Needs Pricing Model', color: deal.isVerified ? 'text-emerald-600' : 'text-amber-600' },
        ],
        description: `This is the agreement for ${deal.account === 'A' ? 'Eastern Counties Police Alliance' : 'Aldermoor Industrial Group'}. Every single pound shown here is checked against real contracts in our files.`,
        impactOrOutcome: deal.blockerReason 
          ? `What is holding this up: ${deal.blockerReason}` 
          : 'Everything is signed and working normally according to our contract.',
        citations: deal.citations,
        ctaText: 'Open Official Contract in Data Room',
        onCtaClick: () => {
          if (deal.citations?.[0]) onSelectCitation?.(deal.citations[0]);
        },
        onCitationClick: onSelectCitation,
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header in Plain English */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-300'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Question 1: How Much Money Is Guaranteed vs. In Discussion?
            </h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
              isDark ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
            }`}>
              Signed Contracts List
            </span>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            We separate guaranteed money from future wishes so our bosses know exactly what is real.
          </p>
        </div>
        
        {/* Total Numbers Banner */}
        <div className="flex items-center gap-2 text-xs">
          <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            isDark ? 'border-emerald-900 bg-emerald-950/40 text-emerald-300' : 'border-emerald-400 bg-emerald-50 text-emerald-900'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Guaranteed: ${(verifiedARR / 1000).toFixed(0)}k / yr</span>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border font-semibold ${
            isDark ? 'border-gray-800 bg-[#0e1014] text-gray-300' : 'border-gray-300 bg-white text-gray-800 shadow-sm'
          }`}>
            Possible Future Deals: ${(unverifiedPipeline / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Clean High-Contrast Table with Crisp Black Text */}
      <div className={`border rounded-xl overflow-hidden ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                isDark ? 'border-gray-800 text-gray-300 bg-[#0d0f13]' : 'border-gray-300 text-black bg-gray-100'
              }`}>
                <th className="py-3 px-4">Deal Name</th>
                <th className="py-3 px-4">Is it Signed?</th>
                <th className="py-3 px-4">Annual Money</th>
                <th className="py-3 px-4">Official Paperwork</th>
                <th className="py-3 px-4">What Is Needed Next</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-800' : 'divide-gray-200'}`}>
              {allDeals.map((deal) => {
                return (
                  <tr 
                    key={deal.id} 
                    onClick={() => handleOpenDeal(deal)}
                    className={`transition cursor-pointer ${
                      isDark ? 'hover:bg-[#11141a]' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Deal Name & Account - BOLD BLACK TEXT */}
                    <td className="py-4 px-4">
                      <div className={`font-bold text-sm leading-snug ${isDark ? 'text-white' : 'text-black'}`}>
                        {deal.title}
                      </div>
                      <div className={`text-xs mt-1 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                        Account {deal.account === 'A' ? 'A (Police Alliance)' : 'B (Aldermoor Industrial)'}
                      </div>
                    </td>

                    {/* Signed Badge */}
                    <td className="py-4 px-4">
                      {deal.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          Signed on Paper
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                          Not Signed Yet
                        </span>
                      )}
                    </td>

                    {/* Value - BOLD BLACK / GREEN */}
                    <td className="py-4 px-4 font-mono font-bold text-sm">
                      {deal.isVerified ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-base">
                          ${deal.verifiedValue.toLocaleString()}
                        </span>
                      ) : (
                        <span className={`text-base font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
                          ${deal.value.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Proof Citations */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
                        {deal.citations.map((cite) => (
                          <button
                            key={cite}
                            onClick={() => onSelectCitation?.(cite)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                              isDark 
                                ? 'border-gray-700 bg-[#12151b] hover:bg-gray-800 text-white' 
                                : 'border-gray-400 bg-gray-100 hover:bg-gray-200 text-black shadow-sm'
                            }`}
                          >
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{cite}</span>
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Blocker & Requirements */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className={`text-xs leading-relaxed font-semibold ${
                        deal.blockerReason 
                          ? 'text-amber-900 dark:text-amber-300' 
                          : isDark ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {deal.blockerReason || 'Signed and active in good standing.'}
                      </div>
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

