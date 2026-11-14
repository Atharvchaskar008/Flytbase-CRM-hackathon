'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, NextBestAction } from '../types/crm';
import { Check, Info, Calendar, User, ShieldCheck } from 'lucide-react';
import { DetailModalData } from './ItemDetailModal';

interface NextBestActionsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectCitation?: (citationId: string) => void;
  onOpenDetail?: (data: DetailModalData) => void;
  isDark?: boolean;
}

export const NextBestActions: React.FC<NextBestActionsProps> = ({
  accounts,
  selectedAccount,
  onSelectCitation,
  onOpenDetail,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const [actions, setActions] = useState<NextBestAction[]>(() => {
    return currentAccounts.flatMap(a => a.actions).sort((a, b) => a.rank - b.rank);
  });

  const toggleAction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActions(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: a.status === 'completed' ? 'pending' : 'completed',
        };
      }
      return a;
    }));
  };

  const handleOpenActionDetail = (act: NextBestAction) => {
    if (onOpenDetail) {
      onOpenDetail({
        type: 'action',
        title: act.title,
        account: act.account,
        badge: `Priority #${act.rank}`,
        subtitle: `Assigned to ${act.owner} • Target: ${act.deadline}`,
        stats: [
          { label: 'Priority Rank', value: `#${act.rank}`, color: act.rank === 1 ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400' },
          { label: 'Deadline', value: act.deadline },
          { label: 'Owner', value: act.owner },
        ],
        description: act.businessReason,
        impactOrOutcome: act.expectedOutcome,
        citations: act.evidenceNeeded,
        ctaText: act.status === 'completed' ? 'Mark Incomplete' : 'Mark Completed',
        onCtaClick: () => {
          setActions(prev => prev.map(a => a.id === act.id ? { ...a, status: a.status === 'completed' ? 'pending' : 'completed' } : a));
        },
        onCitationClick: onSelectCitation,
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Question 3: What Do You Do First?
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              isDark ? 'bg-violet-950 text-violet-300 border border-violet-800' : 'bg-violet-100 text-violet-800'
            }`}>
              Monday 9:00 AM Playbook
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Prioritized sequence of operational interventions with designated owners and verifiable deliverables.
          </p>
        </div>
        <div className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-700'
        }`}>
          {actions.filter(a => a.status === 'completed').length} of {actions.length} Executed
        </div>
      </div>

      {/* Action Cards (Streamlined & Minimalist) */}
      <div className="space-y-2.5">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          return (
            <div
              key={act.id}
              onClick={() => handleOpenActionDetail(act)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDone
                  ? isDark ? 'bg-black/40 opacity-40 border-gray-900' : 'bg-gray-50 opacity-50 border-gray-200'
                  : act.rank === 1
                  ? isDark ? 'bg-[#0f1116] border-gray-700 hover:border-gray-500' : 'bg-white border-gray-900 shadow-sm hover:shadow'
                  : isDark ? 'bg-[#0a0c0f] border-gray-800/80 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-400 shadow-sm'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <span className={`text-xs font-bold w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  act.rank === 1 
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  #{act.rank}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-sm md:text-base font-semibold ${
                      isDone 
                        ? 'line-through text-gray-400' 
                        : isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {act.title}
                    </h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-800 bg-gray-900 text-gray-400' : 'border-gray-200 bg-gray-100 text-gray-600'
                    }`}>
                      Account {act.account}
                    </span>
                  </div>

                  <p className={`text-xs mt-1.5 line-clamp-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {act.businessReason}
                  </p>
                </div>
              </div>

              {/* Right Metadata & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className="flex items-center md:justify-end gap-1 font-medium">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={isDark ? 'text-gray-200' : 'text-gray-900'}>{act.deadline}</span>
                  </div>
                  <div className={`text-[11px] mt-0.5 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    Owner: {act.owner}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenActionDetail(act);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      isDark 
                        ? 'border-gray-800 bg-[#12151a] hover:bg-gray-800 text-gray-200' 
                        : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    Inspect
                  </button>

                  <button
                    onClick={(e) => toggleAction(act.id, e)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border shadow-sm ${
                      isDone
                        ? isDark ? 'border-gray-800 text-gray-500 bg-black' : 'border-gray-300 text-gray-400 bg-gray-100'
                        : isDark ? 'border-white text-black bg-white hover:bg-gray-200' : 'border-black text-white bg-black hover:bg-gray-800'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Done' : 'Mark'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
