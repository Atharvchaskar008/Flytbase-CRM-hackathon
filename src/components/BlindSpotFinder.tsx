'use client';

import React from 'react';
import { AccountDetail, AccountId, BlindSpot } from '../types/crm';
import { 
  HelpCircle, 
  UserCheck, 
  AlertCircle, 
  MessageSquareShare, 
  Lightbulb
} from 'lucide-react';

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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Question 5: What do you still not know? (Blind-Spot Finder)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent catalog of assumptions and unknown dependencies, why each matters, and who holds the answers.
          </p>
        </div>
        <div className="text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/80 px-2.5 py-1 rounded">
          {allSpots.length} Critical Uncertainties
        </div>
      </div>

      {/* Spots Grid */}
      <div className="grid gap-4">
        {allSpots.map((spot) => {
          const acc = accounts[spot.account];
          return (
            <div
              key={spot.id}
              className="bg-slate-900 border border-slate-800 hover:border-purple-800/50 rounded-xl p-4 transition space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="h-6 w-6 rounded-md bg-purple-950 border border-purple-800/80 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{spot.question}</h4>
                    <span className="text-[11px] text-purple-300 font-mono block mt-0.5">
                      Potential Impact: {spot.potentialImpact}
                    </span>
                  </div>
                </div>

                {selectedAccount === 'ALL' && acc && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
                    {acc.name.split(' ')[0]}
                  </span>
                )}
              </div>

              {/* Why it Matters & Who to Ask */}
              <div className="grid md:grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-amber-400" /> Why this gap matters:
                  </span>
                  <p className="text-slate-200">{spot.whyItMatters}</p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-0.5 flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-sky-400" /> Who could answer:
                  </span>
                  <p className="text-sky-300 font-medium">{spot.whoCouldAnswer}</p>
                </div>
              </div>

              {/* Recommended Ask */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-purple-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span><strong>Recommended Discovery Inquiry:</strong> {spot.suggestedAsk}</span>
                </div>

                <button
                  onClick={() => onDraftQuestion?.(spot)}
                  className="flex items-center gap-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded border border-slate-700 shrink-0 transition"
                >
                  <MessageSquareShare className="w-3 h-3 text-sky-400" />
                  <span>Log Note</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
