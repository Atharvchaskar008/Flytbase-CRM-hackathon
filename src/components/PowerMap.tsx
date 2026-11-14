'use client';

import React from 'react';
import { AccountDetail, AccountId, Character } from '../types/crm';

interface PowerMapProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
}

export const PowerMap: React.FC<PowerMapProps> = ({
  accounts,
  selectedAccount,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allPeople: Character[] = currentAccounts.flatMap(a => a.people);

  return (
    <div className="space-y-4 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1c2026] pb-2 text-xs">
        <div>
          <span className="text-white font-bold tracking-wider uppercase">
            Question 2 // Who holds the power?
          </span>
          <span className="text-[#666] ml-2">Stakeholder Alignment Matrix</span>
        </div>
        <span className="text-[10px] text-[#888] uppercase">
          {allPeople.length} Stakeholders Profiled
        </span>
      </div>

      {/* Grid of Minimal Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {allPeople.map((person) => {
          return (
            <div
              key={person.id}
              className={`border p-3 rounded transition space-y-2 ${
                person.isBlocker
                  ? 'border-[#3a3f4a] bg-[#0c0d10]'
                  : 'border-[#1c2026] bg-[#07080a] hover:border-[#2a2f38]'
              }`}
            >
              {/* Name & Account */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-white">{person.name}</div>
                  <div className="text-[10px] text-[#777]">{person.role}</div>
                </div>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded border border-[#222] bg-[#111] text-[#888]">
                  Acc {person.account}
                </span>
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-1 text-[9px] uppercase">
                {person.isDecisionMaker && (
                  <span className="px-1.5 py-0.2 rounded border border-white bg-white text-black font-semibold">
                    Decider
                  </span>
                )}
                {person.isPayer && (
                  <span className="px-1.5 py-0.2 rounded border border-[#444] bg-[#151515] text-white">
                    Payer
                  </span>
                )}
                {person.isBlocker && (
                  <span className="px-1.5 py-0.2 rounded border border-[#555] bg-black text-[#ccc]">
                    Blocker
                  </span>
                )}
                {person.isChampion && (
                  <span className="px-1.5 py-0.2 rounded border border-white text-white bg-black">
                    Champion
                  </span>
                )}
                {person.isUser && (
                  <span className="px-1.5 py-0.2 rounded border border-[#222] bg-[#111] text-[#888]">
                    User
                  </span>
                )}
              </div>

              {/* Context / Hurdle */}
              {person.keyConcerns && (
                <div className="text-[11px] font-sans text-[#999] border-l border-[#333] pl-2 leading-tight">
                  <span className="text-white font-medium">Hurdle:</span> {person.keyConcerns}
                </div>
              )}

              {/* Trust Score & Tone Band */}
              <div className="pt-2 border-t border-[#181a1f] flex items-center justify-between text-[10px] text-[#777]">
                <span>Relationship: <strong className="text-white uppercase">{person.band}</strong></span>
                <span className="font-bold text-white">{person.trustScore}% Trust</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
