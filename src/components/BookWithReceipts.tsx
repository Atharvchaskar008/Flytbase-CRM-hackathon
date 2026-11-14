'use client';

import React from 'react';
import { AccountDetail, AccountId, Deal } from '../types/crm';
import { ShieldCheck, AlertCircle, FileText, ExternalLink } from 'lucide-react';
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
        subtitle: `Stage: ${deal.stage.toUpperCase()} • Confidence Score: ${deal.confidenceScore}%`,
        badge: deal.isVerified ? 'Verified Contracted ARR' : 'Speculative Expansion Pipeline',
        stats: [
          { label: 'Verified ARR', value: `£${deal.verifiedValue.toLocaleString()}`, color: 'text-emerald-500' },
          { label: 'Upsell Value', value: `£${deal.value.toLocaleString()}`, color: 'text-blue-500' },
          { label: 'Audit Status', value: deal.isVerified ? 'Legally Signed' : 'Pending Model', color: deal.isVerified ? 'text-emerald-500' : 'text-amber-500' },
        ],
        description: `Commercial commercial terms and fleet arrangement for Account ${deal.account}. Every verified pound requires signed purchase order documentation and SLA terms.`,
        impactOrOutcome: deal.blockerReason ? `Active Blocker & Requirements: ${deal.blockerReason}` : 'Fully active contract in good standing.',
        citations: deal.citations,
        ctaText: 'Inspect in Data Room',
        onCtaClick: () => {
          if (deal.citations?.[0]) onSelectCitation?.(deal.citations[0]);
        },
        onCitationClick: onSelectCitation,
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Question 1: What is the Book Worth?
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              isDark ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              Book With Receipts
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Audited financial breakdown separating signed recurring revenue from unverified pipeline.
          </p>
        </div>
        
        {/* Total Numbers Banner */}
        <div className="flex items-center gap-2 text-xs">
          <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            isDark ? 'border-emerald-900/80 bg-emerald-950/40 text-emerald-300' : 'border-emerald-200 bg-emerald-50 text-emerald-800'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="font-semibold">Verified: £{(verifiedARR / 1000).toFixed(0)}k ARR</span>
          </div>
          <div className={`px-3 py-1.5 rounded-lg border ${
            isDark ? 'border-gray-800 bg-[#0e1014] text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-600'
          }`}>
            Speculative: £{(unverifiedPipeline / 1000).toFixed(0)}k
          </div>
        </div>
      </div>

      {/* Clean Table */}
      <div className={`border rounded-xl overflow-hidden ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${
                isDark ? 'border-gray-800 text-gray-400 bg-[#0d0f13]' : 'border-gray-200 text-gray-500 bg-gray-50'
              }`}>
                <th className="py-3 px-4">Deal & Scope</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Contract Value</th>
                <th className="py-3 px-4">Proof Citations</th>
                <th className="py-3 px-4">Blockers & Next Unlock</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-800/80' : 'divide-gray-100'}`}>
              {allDeals.map((deal) => {
                return (
                  <tr 
                    key={deal.id} 
                    onClick={() => handleOpenDeal(deal)}
                    className={`transition cursor-pointer ${
                      isDark ? 'hover:bg-[#11141a]' : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Deal Name & Account */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        {deal.title}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        Account {deal.account} • {deal.stage}
                      </div>
                    </td>

                    {/* Verification Badge */}
                    <td className="py-3.5 px-4">
                      {deal.isVerified ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <ShieldCheck className="w-3 h-3" />
                          Signed PO
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          <AlertCircle className="w-3 h-3" />
                          Speculative
                        </span>
                      )}
                    </td>

                    {/* Value */}
                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      {deal.isVerified ? (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          £{deal.verifiedValue.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">
                          £{deal.value.toLocaleString()}
                        </span>
                      )}
                    </td>

                    {/* Citations */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1.5" onClick={e => e.stopPropagation()}>
                        {deal.citations.map((cite) => (
                          <button
                            key={cite}
                            onClick={() => onSelectCitation?.(cite)}
                            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono border transition ${
                              isDark 
                                ? 'border-gray-800 bg-[#12151b] hover:bg-gray-800 text-gray-300' 
                                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            <FileText className="w-3 h-3 text-emerald-500" />
                            <span>{cite}</span>
                          </button>
                        ))}
                      </div>
                    </td>

                    {/* Blocker & Requirements */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className={`text-xs ${deal.blockerReason ? 'text-amber-700 dark:text-amber-300 font-medium' : 'text-gray-500'}`}>
                        {deal.blockerReason || 'Signed contract; ongoing renewal telemetry.'}
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
