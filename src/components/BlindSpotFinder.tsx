'use client';

import React from 'react';
import { AccountDetail, AccountId, BlindSpot } from '../types/crm';
import { MessageSquarePlus } from 'lucide-react';

interface BlindSpotFinderProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onDraftQuestion?: (spot: BlindSpot) => void;
  isDark?: boolean;
}

export const BlindSpotFinder: React.FC<BlindSpotFinderProps> = ({
  accounts,
  selectedAccount,
  onDraftQuestion,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allSpots: BlindSpot[] = currentAccounts.flatMap(a => a.blindSpots);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Question 5 // What do you still not know?
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Blind-Spot Finder</span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
          {allSpots.length} Unknown Dependencies
        </span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {allSpots.map((spot) => {
          return (
            <div
              key={spot.id}
              className={`border p-3 rounded transition space-y-2 ${
                isDark 
                  ? 'border-[#1c2026] bg-[#07080a] hover:border-[#282d36]' 
                  : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{spot.question}</span>
                  <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#222] text-[#777]' : 'border-gray-200 text-gray-500'
                  }`}>
                    Acc {spot.account}
                  </span>
                </div>

                <button
                  onClick={() => onDraftQuestion?.(spot)}
                  className={`flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded border transition ${
                    isDark
                      ? 'border-[#333] hover:border-white text-white bg-black'
                      : 'border-gray-300 hover:border-black text-gray-800 bg-gray-50'
                  }`}
                >
                  <MessageSquarePlus className="w-3 h-3" />
                  <span>Log Ask</span>
                </button>
              </div>

              {/* Impact & Who to ask */}
              <div className="grid md:grid-cols-2 gap-2 text-[11px] font-sans">
                <div className={isDark ? 'text-[#aaa]' : 'text-gray-600'}>
                  <strong className={`font-mono text-[10px] uppercase block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Why it matters:
                  </strong>
                  {spot.whyItMatters}
                </div>
                <div className={isDark ? 'text-[#ccc]' : 'text-gray-800'}>
                  <strong className={`font-mono text-[10px] uppercase block ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Who could answer:
                  </strong>
                  {spot.whoCouldAnswer}
                </div>
              </div>

              {/* Suggested Actionable Inquiry */}
              <div className={`text-[11px] font-sans pt-1.5 border-t ${
                isDark ? 'border-[#15181e] text-[#888]' : 'border-gray-100 text-gray-500'
              }`}>
                <strong className={`font-mono text-[10px] uppercase ${isDark ? 'text-[#bbb]' : 'text-gray-800'}`}>
                  Actionable Inquiry:
                </strong> {spot.suggestedAsk}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
