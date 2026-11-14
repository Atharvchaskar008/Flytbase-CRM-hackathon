'use client';

import React from 'react';
import { AccountDetail, AccountId, Character } from '../types/crm';
import { DetailModalData } from './ItemDetailModal';

interface PowerMapProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onOpenDetail?: (data: DetailModalData) => void;
  isDark?: boolean;
}

export const PowerMap: React.FC<PowerMapProps> = ({
  accounts,
  selectedAccount,
  onOpenDetail,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allPeople: Character[] = currentAccounts.flatMap(a => a.people);

  const handleOpenPerson = (person: Character) => {
    const trust = person.trustScore ?? 50;
    if (onOpenDetail) {
      onOpenDetail({
        type: 'stakeholder',
        title: person.name,
        account: person.account,
        subtitle: `Job Role: ${person.role} • Relationship: ${person.band.toUpperCase()}`,
        badge: person.isDecisionMaker ? 'Final Decision Maker' : person.isBlocker ? 'Unhappy / Needs Attention' : person.isChampion ? 'Big Fan of FlytBase' : 'Customer Team Member',
        stats: [
          { label: 'How Much They Trust Us', value: `${trust}%`, color: trust >= 70 ? 'text-emerald-600' : trust <= 40 ? 'text-red-600' : 'text-amber-600' },
          { label: 'Influence Level', value: person.isDecisionMaker ? 'Decision Maker' : person.isPayer ? 'Pays the Bill' : 'Drone Operator' },
          { label: 'Company / Force', value: person.account === 'A' ? 'Police Alliance' : 'Aldermoor Industrial' },
        ],
        description: person.about || 'Key person involved with our drone systems.',
        impactOrOutcome: person.keyConcerns 
          ? `What they are worried about: ${person.keyConcerns}`
          : person.isChampion 
          ? 'They love our system and defend our budget in management meetings.'
          : 'Normal day-to-day participant in the drone operations.',
        citations: person.keyConcerns ? [`Concern: ${person.keyConcerns}`] : [],
        ctaText: 'Write a Note About This Person',
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
              Question 2: Who Makes the Decisions at the Customer?
            </h3>
            <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
              isDark ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-blue-100 text-blue-950 border border-blue-300'
            }`}>
              People & Relationships Map
            </span>
          </div>
          <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Understanding who pays the bills, who loves our drones, and who is unhappy so we never get blindsided.
          </p>
        </div>
        <div className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-gray-200' : 'border-gray-300 bg-gray-50 text-black shadow-sm'
        }`}>
          {allPeople.length} People Profiled
        </div>
      </div>

      {/* Grid of Stakeholders with High-Contrast Black Text */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPeople.map((person) => {
          const trust = person.trustScore ?? 50;

          return (
            <div
              key={person.id}
              onClick={() => handleOpenPerson(person)}
              className={`border p-5 rounded-xl transition cursor-pointer flex flex-col justify-between gap-3 ${
                isDark 
                  ? person.isBlocker ? 'border-red-900 bg-[#120b0c]' : 'border-gray-800 bg-[#0c0e12] hover:border-gray-700'
                  : person.isBlocker ? 'border-red-400 bg-red-50/50 shadow-sm' : 'border-gray-300 bg-white hover:border-gray-500 shadow-sm'
              }`}
            >
              <div>
                {/* Name, Account & Role */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {person.name}
                    </h4>
                    <div className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                      {person.role}
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${
                    isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-300 bg-gray-100 text-black'
                  }`}>
                    Account {person.account === 'A' ? 'A (Police)' : 'B (Aldermoor)'}
                  </span>
                </div>

                {/* Plain English Role Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {person.isDecisionMaker && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-black text-white dark:bg-white dark:text-black">
                      Final Decision Maker
                    </span>
                  )}
                  {person.isPayer && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 text-blue-950 border border-blue-300">
                      Holds the Budget
                    </span>
                  )}
                  {person.isChampion && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-300">
                      Big Fan of FlytBase
                    </span>
                  )}
                  {person.isBlocker && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-950 border border-red-300">
                      Unhappy / Needs Care
                    </span>
                  )}
                  {person.isUser && (
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-gray-100 text-black border border-gray-300">
                      Drone Operator
                    </span>
                  )}
                </div>

                <p className={`text-xs font-medium line-clamp-2 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {person.about}
                </p>
              </div>

              {/* Bottom Trust Meter */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-gray-300' : 'text-black'}>Trust Level:</span>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700">
                    <div 
                      className={`h-full ${
                        trust >= 70 ? 'bg-emerald-600' : trust <= 40 ? 'bg-red-600' : 'bg-amber-600'
                      }`}
                      style={{ width: `${trust}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-black dark:text-white">{trust}%</span>
                </div>

                <span className="text-xs font-bold text-blue-700 dark:text-blue-400">
                  Read Profile →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
