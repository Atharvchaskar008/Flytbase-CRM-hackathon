'use client';

import React from 'react';
import { AccountDetail, AccountId, BlindSpot } from '../types/crm';
import { HelpCircle, MessageSquarePlus, ArrowRight } from 'lucide-react';
import { DetailModalData } from './ItemDetailModal';

interface BlindSpotFinderProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onDraftQuestion?: (spot: BlindSpot) => void;
  onOpenDetail?: (data: DetailModalData) => void;
  isDark?: boolean;
}

export const BlindSpotFinder: React.FC<BlindSpotFinderProps> = ({
  accounts,
  selectedAccount,
  onDraftQuestion,
  onOpenDetail,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allSpots: BlindSpot[] = currentAccounts.flatMap(a => a.blindSpots);

  const handleOpenSpot = (spot: BlindSpot) => {
    if (onOpenDetail) {
      onOpenDetail({
        type: 'blindspot',
        title: spot.question,
        account: spot.account,
        subtitle: `Target Stakeholder: ${spot.whoCouldAnswer}`,
        badge: 'Critical Unknown',
        stats: [
          { label: 'Key Contact', value: spot.whoCouldAnswer },
          { label: 'Account', value: spot.account === 'A' ? 'Police Alliance' : 'Aldermoor' },
          { label: 'Action Needed', value: 'Direct Discovery' },
        ],
        description: `Why It Matters: ${spot.whyItMatters}`,
        impactOrOutcome: `Potential Revenue Impact: ${spot.potentialImpact} | Suggested Discovery Script: "${spot.suggestedAsk}"`,
        ctaText: 'Log Discovery Inquiry',
        onCtaClick: () => {
          onDraftQuestion?.(spot);
        },
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
              Question 5: What Do You Still Not Know?
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              isDark ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Blind Spot Finder
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Knowledge gaps and unanswered dependencies that jeopardize contract renewals or expansion.
          </p>
        </div>

        <div className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-amber-400' : 'border-amber-200 bg-amber-50 text-amber-700'
        }`}>
          {allSpots.length} Unknown Dependencies
        </div>
      </div>

      {/* Clean Cards */}
      <div className="space-y-2.5">
        {allSpots.map((spot) => {
          return (
            <div
              key={spot.id}
              onClick={() => handleOpenSpot(spot)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark 
                  ? 'border-gray-800/80 bg-[#0a0c0f] hover:border-gray-700' 
                  : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 shrink-0">
                  <HelpCircle className="w-4 h-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-sm md:text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {spot.question}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
                    }`}>
                      Account {spot.account}
                    </span>
                  </div>

                  <p className={`text-xs mt-1 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Why it matters: {spot.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Stakeholder & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className="font-medium text-gray-800 dark:text-gray-200">
                    Ask: {spot.whoCouldAnswer}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Impact: {spot.potentialImpact}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDraftQuestion?.(spot);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    isDark 
                      ? 'border-white text-black bg-white hover:bg-gray-200' 
                      : 'border-black text-white bg-black hover:bg-gray-800 shadow-sm'
                  }`}
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Log Ask</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
