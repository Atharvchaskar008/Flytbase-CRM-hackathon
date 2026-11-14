'use client';

import React from 'react';
import { AccountDetail, AccountId, Character } from '../types/crm';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  Heart, 
  Crown, 
  CreditCard, 
  Lock, 
  Smile, 
  Meh, 
  Frown,
  Sparkles
} from 'lucide-react';

interface PowerMapProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  onSelectPerson?: (personId: string) => void;
}

export const PowerMap: React.FC<PowerMapProps> = ({
  accounts,
  selectedAccount,
  onSelectPerson,
}) => {
  const currentAccounts = selectedAccount === 'ALL'
    ? Object.values(accounts)
    : [accounts[selectedAccount]].filter(Boolean);

  const allPeople: Character[] = currentAccounts.flatMap(a => a.people);

  const getToneBadge = (band: Character['band']) => {
    switch (band) {
      case 'ally':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
            <Sparkles className="w-3 h-3 text-emerald-400" /> Ally (75-100)
          </span>
        );
      case 'warm':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono bg-sky-950 text-sky-300 border border-sky-800 px-2 py-0.5 rounded">
            <Smile className="w-3 h-3 text-sky-400" /> Warm (50-74)
          </span>
        );
      case 'neutral':
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
            <Meh className="w-3 h-3 text-slate-400" /> Neutral (25-49)
          </span>
        );
      case 'guarded':
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-mono bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded">
            <Frown className="w-3 h-3 text-rose-400" /> Guarded (0-24)
          </span>
        );
    }
  };

  const getRoleTags = (p: Character) => {
    const tags = [];
    if (p.isDecisionMaker) {
      tags.push(
        <span key="decider" className="flex items-center gap-1 text-[10px] font-medium bg-purple-950 text-purple-300 border border-purple-800 px-1.5 py-0.5 rounded">
          <Crown className="w-3 h-3 text-purple-400" /> Decider
        </span>
      );
    }
    if (p.isPayer) {
      tags.push(
        <span key="payer" className="flex items-center gap-1 text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
          <CreditCard className="w-3 h-3 text-emerald-400" /> Payer
        </span>
      );
    }
    if (p.isBlocker) {
      tags.push(
        <span key="blocker" className="flex items-center gap-1 text-[10px] font-medium bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded">
          <Lock className="w-3 h-3 text-rose-400" /> Blocker
        </span>
      );
    }
    if (p.isChampion) {
      tags.push(
        <span key="champion" className="flex items-center gap-1 text-[10px] font-medium bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded">
          <Heart className="w-3 h-3 text-amber-400" /> Champion
        </span>
      );
    }
    if (p.isUser) {
      tags.push(
        <span key="user" className="flex items-center gap-1 text-[10px] font-medium bg-sky-950 text-sky-300 border border-sky-800 px-1.5 py-0.5 rounded">
          <Users className="w-3 h-3 text-sky-400" /> End User
        </span>
      );
    }
    return tags;
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">Question 2: Who holds the power? (Power Map & Stakeholder Matrix)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Stakeholder alignment mapped by decision rights, economic power, blockers, and relationship trust score.
          </p>
        </div>
        <div className="text-xs font-mono bg-purple-950/60 text-purple-300 border border-purple-800/80 px-2.5 py-1 rounded">
          {allPeople.length} Stakeholders Profiled
        </div>
      </div>

      {/* Grid of Stakeholders */}
      <div className="grid md:grid-cols-2 gap-4">
        {allPeople.map((person) => {
          const acc = accounts[person.account];
          return (
            <div
              key={person.id}
              className={`bg-slate-900 border rounded-xl p-4 transition space-y-3 ${
                person.isBlocker
                  ? 'border-rose-900/60 shadow-sm'
                  : person.isChampion
                  ? 'border-amber-900/60'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{person.name}</span>
                    {getToneBadge(person.band)}
                  </div>
                  <span className="text-xs text-slate-300 font-medium block mt-0.5">{person.role}</span>
                  <span className="text-[11px] text-slate-500 font-mono block">ID: {person.id}</span>
                </div>

                {selectedAccount === 'ALL' && acc && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-300 border border-slate-700">
                    {acc.name.split(' ')[0]}
                  </span>
                )}
              </div>

              {/* Roles Badges */}
              <div className="flex flex-wrap gap-1.5">
                {getRoleTags(person)}
              </div>

              {/* Profile Bio */}
              {person.about && (
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                  {person.about}
                </p>
              )}

              {/* Key Concerns / How to Influence */}
              {person.keyConcerns && (
                <div className="text-xs border-l-2 border-sky-500 pl-2 text-slate-300">
                  <span className="text-sky-400 font-semibold block text-[11px]">Primary Hurdle / Focus:</span>
                  {person.keyConcerns}
                </div>
              )}

              {/* Trust Score Progress Bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Trust Level: <strong className="text-slate-200">{person.trustScore ?? 50}%</strong></span>
                <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      (person.trustScore ?? 50) >= 70 
                        ? 'bg-emerald-500' 
                        : (person.trustScore ?? 50) >= 40 
                        ? 'bg-sky-500' 
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${person.trustScore ?? 50}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
