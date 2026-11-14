'use client';

import React from 'react';
import { AccountDetail, AccountId, Character } from '../types/crm';

interface PowerMapProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const PowerMap: React.FC<PowerMapProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allPeople: Character[] = currentAccounts.flatMap(a => a.people);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className={`flex items-center justify-between border-b pb-2 text-xs ${
        isDark ? 'border-[#1c2026]' : 'border-gray-200'
      }`}>
        <div>
          <span className={`font-bold tracking-wider uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Question 2 // Who holds the power?
          </span>
          <span className={`ml-2 ${isDark ? 'text-[#666]' : 'text-gray-500'}`}>Stakeholder Alignment Matrix</span>
        </div>
        <span className={`text-[10px] uppercase ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>
          {allPeople.length} Stakeholders Profiled
        </span>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {allPeople.map((person) => {
          return (
            <div
              key={person.id}
              className={`border p-3 rounded transition space-y-2 ${
                isDark 
                  ? person.isBlocker ? 'border-[#3a3f4a] bg-[#0c0d10]' : 'border-[#1c2026] bg-[#07080a] hover:border-[#2a2f38]'
                  : person.isBlocker ? 'border-gray-400 bg-gray-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-400 shadow-sm'
              }`}
            >
              {/* Name & Account */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.name}</div>
                  <div className={`text-[10px] ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>{person.role}</div>
                </div>
                <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded border ${
                  isDark ? 'border-[#222] bg-[#111] text-[#888]' : 'border-gray-200 bg-gray-100 text-gray-600'
                }`}>
                  Acc {person.account}
                </span>
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-1 text-[9px] uppercase">
                {person.isDecisionMaker && (
                  <span className={`px-1.5 py-0.2 rounded border font-semibold ${
                    isDark ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                  }`}>
                    Decider
                  </span>
                )}
                {person.isPayer && (
                  <span className={`px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#444] bg-[#151515] text-white' : 'border-gray-300 bg-gray-100 text-gray-800'
                  }`}>
                    Payer
                  </span>
                )}
                {person.isBlocker && (
                  <span className={`px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#555] bg-black text-[#ccc]' : 'border-gray-400 bg-white text-gray-900 font-bold'
                  }`}>
                    Blocker
                  </span>
                )}
                {person.isChampion && (
                  <span className={`px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-white text-white bg-black' : 'border-black text-black bg-gray-50 font-semibold'
                  }`}>
                    Champion
                  </span>
                )}
                {person.isUser && (
                  <span className={`px-1.5 py-0.2 rounded border ${
                    isDark ? 'border-[#222] bg-[#111] text-[#888]' : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}>
                    User
                  </span>
                )}
              </div>

              {/* Context / Hurdle */}
              {person.keyConcerns && (
                <div className={`text-[11px] font-sans border-l-2 pl-2 leading-tight ${
                  isDark ? 'border-[#333] text-[#999]' : 'border-gray-300 text-gray-700'
                }`}>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Hurdle:</span> {person.keyConcerns}
                </div>
              )}

              {/* Trust & Tone */}
              <div className={`pt-2 border-t flex items-center justify-between text-[10px] ${
                isDark ? 'border-[#181a1f] text-[#777]' : 'border-gray-100 text-gray-500'
              }`}>
                <span>Relationship: <strong className={`uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.band}</strong></span>
                <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{person.trustScore}% Trust</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
