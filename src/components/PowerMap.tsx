'use client';

import React from 'react';
import { AccountDetail, AccountId, Character } from '../types/crm';
import { User, ShieldAlert, Award, ExternalLink } from 'lucide-react';
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
        subtitle: `${person.role} • Alignment Band: ${person.band.toUpperCase()}`,
        badge: person.isDecisionMaker ? 'Key Decision Maker' : person.isBlocker ? 'Active Blocker' : person.isChampion ? 'Champion' : 'Stakeholder',
        stats: [
          { label: 'Trust Score', value: `${trust}%`, color: trust >= 70 ? 'text-emerald-500' : trust <= 40 ? 'text-red-500' : 'text-amber-500' },
          { label: 'Influence Tier', value: person.isDecisionMaker ? 'Decider' : person.isPayer ? 'Payer' : 'User' },
          { label: 'Account', value: person.account === 'A' ? 'Police Alliance' : 'Aldermoor' },
        ],
        description: person.about || 'Key stakeholder profiled in the account organization.',
        impactOrOutcome: person.keyConcerns 
          ? `Primary Concern / Friction: ${person.keyConcerns}`
          : person.isChampion 
          ? 'Acts as key operational advocate; requires ongoing success metrics to defend budget.'
          : 'Standard operational participant.',
        citations: person.keyConcerns ? [`Concern: ${person.keyConcerns}`] : [],
        ctaText: 'Log Stakeholder Note',
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
              Question 2: Who Holds the Power?
            </span>
            <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
              isDark ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-blue-100 text-blue-800'
            }`}>
              Stakeholder Dynamics
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Mapping buyers, champions, blockers, and end-users to prevent single-point relationship failures.
          </p>
        </div>
        <div className={`text-xs font-medium px-2.5 py-1 rounded-full border self-start sm:self-auto ${
          isDark ? 'border-gray-800 bg-[#0e1014] text-gray-300' : 'border-gray-200 bg-gray-50 text-gray-700'
        }`}>
          {allPeople.length} Stakeholders Profiled
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allPeople.map((person) => {
          return (
            <div
              key={person.id}
              onClick={() => handleOpenPerson(person)}
              className={`border p-4 rounded-xl transition cursor-pointer flex flex-col justify-between gap-3 ${
                isDark 
                  ? person.isBlocker ? 'border-red-900/60 bg-[#120b0c] hover:border-red-700' : 'border-gray-800/80 bg-[#0c0e12] hover:border-gray-700'
                  : person.isBlocker ? 'border-red-200 bg-red-50/30 hover:border-red-300 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              <div>
                {/* Name, Account & Role Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className={`text-sm md:text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {person.name}
                    </h4>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {person.role}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                    isDark ? 'border-gray-800 bg-gray-900 text-gray-400' : 'border-gray-200 bg-gray-100 text-gray-600'
                  }`}>
                    Acc {person.account}
                  </span>
                </div>

                {/* Role Pill Badges */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {person.isDecisionMaker && (
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      isDark ? 'bg-white text-black' : 'bg-black text-white'
                    }`}>
                      Decider
                    </span>
                  )}
                  {person.isPayer && (
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      isDark ? 'border-gray-700 bg-gray-900 text-gray-200' : 'border-gray-300 bg-gray-100 text-gray-800'
                    }`}>
                      Payer
                    </span>
                  )}
                  {person.isChampion && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Champion
                    </span>
                  )}
                  {person.isBlocker && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      Blocker
                    </span>
                  )}
                  {person.isUser && (
                    <span className={`px-2 py-0.5 rounded text-[11px] border ${
                      isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
                    }`}>
                      User
                    </span>
                  )}
                </div>

                <p className={`text-xs line-clamp-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {person.about}
                </p>
              </div>

              {/* Bottom Trust Meter & Inspect */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Trust:</span>
                  <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        (person.trustScore ?? 50) >= 70 ? 'bg-emerald-500' : (person.trustScore ?? 50) <= 40 ? 'bg-red-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${person.trustScore ?? 50}%` }}
                    />
                  </div>
                  <span className="font-mono font-semibold">{person.trustScore ?? 50}%</span>
                </div>

                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  Dossier →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
