'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId, NextBestAction } from '../types/crm';
import { Check, Calendar } from 'lucide-react';
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
        badge: `Task #${act.rank} to Do First`,
        subtitle: `Responsible Person: ${act.owner} • Must be Done By: ${act.deadline}`,
        stats: [
          { label: 'Priority Order', value: `#${act.rank}`, color: act.rank === 1 ? 'text-red-600' : 'text-blue-600' },
          { label: 'Due By', value: act.deadline },
          { label: 'Person in Charge', value: act.owner },
        ],
        description: act.businessReason,
        impactOrOutcome: `What happens when this is finished: ${act.expectedOutcome}`,
        citations: act.evidenceNeeded,
        ctaText: act.status === 'completed' ? 'Mark as Not Done Yet' : 'Mark as Done',
        onCtaClick: () => {
          setActions(prev => prev.map(a => a.id === act.id ? { ...a, status: a.status === 'completed' ? 'pending' : 'completed' } : a));
        },
        onCitationClick: onSelectCitation,
      });
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Header in Plain English */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 ${
        isDark ? 'border-gray-800' : 'border-gray-300'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Question 3: What Do We Do First on Monday Morning?
            </h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
              isDark ? 'bg-violet-950 text-violet-300 border border-violet-800' : 'bg-violet-100 text-violet-950 border border-violet-300'
            }`}>
              Monday 9:00 AM To-Do List
            </span>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            A clear priority list so everyone on our team knows who to call and what problem to fix first.
          </p>
        </div>
        <div className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-gray-200' : 'border-gray-300 bg-gray-50 text-black shadow-sm'
        }`}>
          {actions.filter(a => a.status === 'completed').length} of {actions.length} Tasks Finished
        </div>
      </div>

      {/* Action Cards (High Contrast Black Text & Spoken English) */}
      <div className="space-y-3">
        {actions.map((act) => {
          const isDone = act.status === 'completed';
          return (
            <div
              key={act.id}
              onClick={() => handleOpenActionDetail(act)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDone
                  ? isDark ? 'bg-black/40 opacity-40 border-gray-900' : 'bg-gray-100 opacity-60 border-gray-300'
                  : act.rank === 1
                  ? isDark ? 'bg-[#0f1116] border-gray-600' : 'bg-white border-black shadow-md'
                  : isDark ? 'bg-[#0a0c0f] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-300 hover:border-gray-500 shadow-sm'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5 min-w-0 flex-1">
                <span className={`text-xs font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  act.rank === 1 
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : isDark ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                }`}>
                  #{act.rank}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`text-sm md:text-base font-bold ${
                      isDone 
                        ? 'line-through text-gray-500' 
                        : isDark ? 'text-white' : 'text-black'
                    }`}>
                      {act.title}
                    </h4>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-300 bg-gray-100 text-black'
                    }`}>
                      Account {act.account === 'A' ? 'A (Police)' : 'B (Aldermoor)'}
                    </span>
                  </div>

                  <p className={`text-xs mt-1.5 font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                    <strong className={isDark ? 'text-white' : 'text-black'}>Why this matters: </strong> 
                    {act.businessReason}
                  </p>
                </div>
              </div>

              {/* Right Metadata & Action */}
              <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-gray-800">
                <div className="text-left md:text-right text-xs">
                  <div className="flex items-center md:justify-end gap-1 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span className={isDark ? 'text-white' : 'text-black'}>{act.deadline}</span>
                  </div>
                  <div className={`text-xs mt-0.5 font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                    Owner: <strong>{act.owner}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenActionDetail(act);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                      isDark 
                        ? 'border-gray-700 bg-[#12151a] hover:bg-gray-800 text-white' 
                        : 'border-gray-400 bg-gray-100 hover:bg-gray-200 text-black shadow-sm'
                    }`}
                  >
                    Read Details
                  </button>

                  <button
                    onClick={(e) => toggleAction(act.id, e)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
                      isDone
                        ? isDark ? 'border-gray-800 text-gray-500 bg-black' : 'border-gray-400 text-gray-500 bg-gray-200'
                        : isDark ? 'border-white text-black bg-white hover:bg-gray-200' : 'border-black text-white bg-black hover:bg-gray-800'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Finished' : 'Mark Done'}</span>
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
