'use client';

import React from 'react';
import { AccountDetail, AccountId, BlindSpot } from '../types/crm';
import { MessageSquarePlus } from 'lucide-react';

interface BlindSpotFinderProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onDraftQuestion?: (spot: BlindSpot) => void;
}

export const BlindSpotFinder: React.FC<BlindSpotFinderProps> = ({
  accounts,
  selectedAccount,
  onDraftQuestion,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allSpots: BlindSpot[] = currentAccounts.flatMap(a => a.blindSpots);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Question 5 // What do you still not know?
          </span>
          <span className="text-[#666] ml-2">Blind-Spot Finder</span>
        </div>
        <span className="text-[10px] text-[#888] uppercase">
          {allSpots.length} Unknown Dependencies
        </span>
      </div>

      {/* Dense Rows */}
      <div className="space-y-2">
        {allSpots.map((spot) => {
          return (
            <div
              key={spot.id}
              className="border border-[#1c2026] bg-[#07080a] p-3 rounded hover:border-[#282d36] transition space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{spot.question}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.2 rounded border border-[#222] text-[#777]">
                    Acc {spot.account}
                  </span>
                </div>

                <button
                  onClick={() => onDraftQuestion?.(spot)}
                  className="flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-[#333] hover:border-white text-white bg-black transition"
                >
                  <MessageSquarePlus className="w-3 h-3" />
                  <span>Log Ask</span>
                </button>
              </div>

              {/* Grid: Impact & Who to ask */}
              <div className="grid md:grid-cols-2 gap-2 text-[11px] font-sans">
                <div className="text-[#aaa]">
                  <strong className="text-white font-mono text-[10px] uppercase block">Why it matters:</strong>
                  {spot.whyItMatters}
                </div>
                <div className="text-[#ccc]">
                  <strong className="text-white font-mono text-[10px] uppercase block">Who could answer:</strong>
                  {spot.whoCouldAnswer}
                </div>
              </div>

              {/* Suggested Discovery Inquiry */}
              <div className="text-[11px] font-sans text-[#888] pt-1.5 border-t border-[#15181e]">
                <strong className="text-[#bbb] font-mono text-[10px] uppercase">Actionable Inquiry:</strong> {spot.suggestedAsk}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
