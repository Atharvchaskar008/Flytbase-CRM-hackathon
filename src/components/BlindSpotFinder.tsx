'use client';

import React from 'react';
import { AccountDetail, AccountId, BlindSpot } from '../types/crm';
import { HelpCircle, MessageSquarePlus } from 'lucide-react';
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
        subtitle: `Person Who Has the Answer: ${spot.whoCouldAnswer}`,
        badge: 'Unknown Information',
        stats: [
          { label: 'Person to Ask', value: spot.whoCouldAnswer },
          { label: 'Account', value: spot.account === 'A' ? 'Police Alliance' : 'Aldermoor' },
          { label: 'Action to Take', value: 'Schedule Quick Call' },
        ],
        description: `Why this is important: ${spot.whyItMatters}`,
        impactOrOutcome: `What could happen if we don't ask: ${spot.potentialImpact} | What to say: "${spot.suggestedAsk}"`,
        ctaText: 'Write Down an Inquiry Note',
        onCtaClick: () => {
          onDraftQuestion?.(spot);
        },
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
              Question 5: What Important Things Do We Still Not Know?
            </h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
              isDark ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-950 border border-amber-300'
            }`}>
              Questions to Ask
            </span>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Missing information that could secretly hurt our contract or relationship if we don't ask right away.
          </p>
        </div>

        <div className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-amber-400' : 'border-amber-300 bg-amber-50 text-amber-950 shadow-sm'
        }`}>
          {allSpots.length} Questions to Ask
        </div>
      </div>

      {/* Clean High-Contrast Cards */}
      <div className="space-y-3">
        {allSpots.map((spot) => {
          return (
            <div
              key={spot.id}
              onClick={() => handleOpenSpot(spot)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDark 
                  ? 'border-gray-800 bg-[#0a0c0f] hover:border-gray-700' 
                  : 'border-gray-300 bg-white hover:border-gray-500 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {spot.question}
                    </h4>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-black bg-gray-100'
                    }`}>
                      Account {spot.account === 'A' ? 'A (Police)' : 'B (Aldermoor)'}
                    </span>
                  </div>

                  <p className={`text-xs mt-1.5 font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                    <strong className={isDark ? 'text-white' : 'text-black'}>Why this matters: </strong>
                    {spot.whyItMatters}
                  </p>
                </div>
              </div>

              {/* Stakeholder & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                    Person to ask: <strong>{spot.whoCouldAnswer}</strong>
                  </div>
                  <div className={`text-xs mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Danger if skipped: {spot.potentialImpact}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDraftQuestion?.(spot);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition ${
                    isDark 
                      ? 'border-white text-black bg-white hover:bg-gray-200' 
                      : 'border-black text-white bg-black hover:bg-gray-800 shadow-sm'
                  }`}
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>Ask Question</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
