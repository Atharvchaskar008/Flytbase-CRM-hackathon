'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Volume2,
  Copy,
  Check
} from 'lucide-react';

interface PreMeetingBriefOnePagerProps {
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

interface StakeholderQuickBrief {
  id: string;
  name: string;
  role: string;
  account: AccountId;
  temperature: 'Guarded' | 'Ally' | 'Skeptic' | 'Neutral' | 'Hostile';
  temperatureScore: number;
  lastComplaint: string;
  theWinWeGaveThem: string;
  phraseToAvoid: string;
  goldenOpeningLine: string;
  targetClosingCommitment: string;
  urgency: 'Immediate (Next 60 Mins)' | 'High' | 'Routine';
}

const STAKEHOLDER_BRIEFS: StakeholderQuickBrief[] = [
  {
    id: 'karen_mbeki',
    name: 'Insp. Karen Mbeki',
    role: 'Drone Unit Inspector, Westmere Constabulary',
    account: 'A',
    temperature: 'Guarded',
    temperatureScore: 42,
    lastComplaint: 'Dock 4 took 3 minutes to acquire satellite lock; unanswered 5 Dec tactical event ticket.',
    theWinWeGaveThem: '142 automated sorties flown; 2 missing persons found in under 12 minutes (vs 40 mins for helicopter).',
    phraseToAvoid: 'DO NOT SAY: "You need to purchase our $60,000 Priority Support package for this event."',
    goldenOpeningLine: '"Inspector Mbeki, we have reserved priority on-call engineering coverage for your 5 Dec event and confirmed pilot training for 28-29 Nov at zero cost."',
    targetClosingCommitment: 'Secure her signoff on the 5 Dec operational protocol and agreement to co-sponsor the 35-dock renewal.',
    urgency: 'Immediate (Next 60 Mins)'
  },
  {
    id: 'nadia_rahman',
    name: 'Nadia Rahman',
    role: 'Group Finance Controller, Aldermoor Industrial',
    account: 'B',
    temperature: 'Guarded',
    temperatureScore: 38,
    lastComplaint: 'Plant managers revolting against central security chargebacks while 3 docks sat idle for 14 days.',
    theWinWeGaveThem: 'Automated perimeter patrols substituted 1,420 physical guard hours, saving $240,000 in third-party security invoices.',
    phraseToAvoid: 'DO NOT SAY: "Flight log reporting is an optional $70,000 software add-on."',
    goldenOpeningLine: '"Nadia, here is the itemized plant-by-plant audit showing your facilities saved $42,000 this month in guard contractor substitution."',
    targetClosingCommitment: 'Secure her financial signoff on the 14-dock contract renewal ($245k ARR).',
    urgency: 'Immediate (Next 60 Mins)'
  },
  {
    id: 'hannah_doyle',
    name: 'Hannah Doyle',
    role: 'Alliance Procurement Lead, Eastern Police Alliance',
    account: 'A',
    temperature: 'Neutral',
    temperatureScore: 48,
    lastComplaint: '300-dock tender specification is locking soon with no costed operating model and nobody to fly 300 docks.',
    theWinWeGaveThem: 'Empirical telemetry proof that 1 remote pilot can supervise up to 10 automated docks under standard CAA BVLOS guidelines.',
    phraseToAvoid: 'DO NOT SAY: "We can figure out pilot staffing after the tender is awarded."',
    goldenOpeningLine: '"Hannah, we have mathematically reconciled the 1:10 pilot ratio to ensure the 300-dock framework stays within police budgets before the spec locks."',
    targetClosingCommitment: 'Ensure FlytBase autonomous standards are locked into the 300-dock framework tender.',
    urgency: 'High'
  },
  {
    id: 'rhys_calder',
    name: 'Rhys Calder',
    role: 'Alliance Drone Programme Lead (Outgoing Champion)',
    account: 'A',
    temperature: 'Ally',
    temperatureScore: 88,
    lastComplaint: 'Worried his 3-year program will collapse or get defunded when he departs in January 2026.',
    theWinWeGaveThem: '35 docks operational across 4 forces with 99.8% uptime and 1,840 officer pursuit hours saved.',
    phraseToAvoid: 'DO NOT SAY: "What will your team do without you in January?"',
    goldenOpeningLine: '"Rhys, we are co-opting Karen Mbeki and Hannah Doyle so your 300-dock framework vision is institutionalized as the national standard."',
    targetClosingCommitment: 'Formalize handover governance cadence with Hannah Doyle before his departure.',
    urgency: 'High'
  },
  {
    id: 'beatriz_alonso',
    name: 'Beatriz Alonso',
    role: 'Plant Manager, Plant 7 (Stallingborough)',
    account: 'B',
    temperature: 'Guarded',
    temperatureScore: 40,
    lastComplaint: 'Declined $50k priority maintenance offer; frustrated by sensor delays during night shifts.',
    theWinWeGaveThem: 'Verified zero perimeter security breaches at Plant 7 during night-time automated thermal sweeps.',
    phraseToAvoid: 'DO NOT SAY: "You should upgrade your local dock service tier."',
    goldenOpeningLine: '"Beatriz, our engineering team remotely recalibrated your dock sensor at zero cost to guarantee zero night patrol interruptions."',
    targetClosingCommitment: 'Secure unanimous plant manager approval for group renewal.',
    urgency: 'High'
  },
  {
    id: 'stefan_roy',
    name: 'Stefan Roy',
    role: 'Group Head of Security, Aldermoor Industrial',
    account: 'B',
    temperature: 'Neutral',
    temperatureScore: 55,
    lastComplaint: 'Declined $160k Plant 15 expansion because facility directors were complaining about idle equipment.',
    theWinWeGaveThem: 'Demonstrated $1.2M top-level executive savings across group security operations.',
    phraseToAvoid: 'DO NOT SAY: "Your plant managers are being uncooperative."',
    goldenOpeningLine: '"Stefan, we brought the 3 idle docks back to full flight readiness so you can demonstrate 100% plant uptime to Nadia."',
    targetClosingCommitment: 'Win plant consensus to unlock Plant 15 expansion in Q2.',
    urgency: 'Routine'
  }
];

export const PreMeetingBriefOnePager: React.FC<PreMeetingBriefOnePagerProps> = ({
  selectedAccount,
  isDark = false,
}) => {
  const filteredBriefs = selectedAccount === 'ALL'
    ? STAKEHOLDER_BRIEFS
    : STAKEHOLDER_BRIEFS.filter(b => b.account === selectedAccount);

  const [selectedBriefId, setSelectedBriefId] = useState<string>(filteredBriefs[0]?.id || 'karen_mbeki');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const activeBrief = filteredBriefs.find(b => b.id === selectedBriefId) || filteredBriefs[0] || STAKEHOLDER_BRIEFS[0];

  const handleCopyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Pre-Call Executive Intelligence</span>
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              The "60-Second Pre-Meeting Brief" One-Pager
            </h3>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Before a CSM dials a stakeholder, don't read 5 tabs. Get the complete tactical picture in 60 seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-black text-black dark:text-white">
              {filteredBriefs.length} Stakeholder Battlecards Ready
            </span>
          </div>
        </div>

        {/* Stakeholder Selector Bar */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
          {filteredBriefs.map(brief => {
            const isSelected = activeBrief.id === brief.id;
            return (
              <button
                key={brief.id}
                onClick={() => setSelectedBriefId(brief.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  isSelected
                    ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                    : isDark ? 'border-gray-800 text-gray-300 hover:text-white' : 'border-gray-300 text-black hover:bg-gray-100'
                }`}
              >
                <span>{brief.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  brief.temperature === 'Guarded'
                    ? 'bg-rose-100 text-rose-950 border border-rose-300'
                    : brief.temperature === 'Ally'
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-gray-200 text-black'
                }`}>
                  {brief.temperature}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* THE 60-SECOND CARD */}
      <div className={`p-8 rounded-3xl border space-y-6 shadow-sm transition ${
        isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white'
      }`}>
        
        {/* Top Header & Customer Temperature */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-bold text-black dark:text-white">
                {activeBrief.name}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-400">
                Account {activeBrief.account}
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-1">
              {activeBrief.role}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] font-bold text-gray-500 uppercase block">Customer Temperature</span>
              <span className={`text-base font-bold flex items-center justify-end gap-1.5 ${
                activeBrief.temperature === 'Guarded'
                  ? 'text-rose-600 dark:text-rose-400'
                  : activeBrief.temperature === 'Ally'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}>
                <Flame className="w-4 h-4" />
                <span>{activeBrief.temperature} ({activeBrief.temperatureScore}% Trust)</span>
              </span>
            </div>

            <button
              onClick={() => handleCopyText(activeBrief.goldenOpeningLine, 'opening')}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1.5 shadow-sm"
            >
              {copiedField === 'opening' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'opening' ? 'Copied Script!' : 'Copy Opening Line'}</span>
            </button>
          </div>
        </div>

        {/* The 4 Core Pillars of the 60-Second Brief */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-medium">
          
          {/* Box 1: What They Last Complained About */}
          <div className="p-5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/15 space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-950 dark:text-rose-300 text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>1. What They Last Complained About (Friction)</span>
            </div>
            <p className="text-rose-900 dark:text-rose-200 text-xs font-semibold leading-relaxed pl-6">
              {activeBrief.lastComplaint}
            </p>
          </div>

          {/* Box 2: The Win We Gave Them */}
          <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/15 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950 dark:text-emerald-300 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>2. The Win We Gave Them (Proof of Value)</span>
            </div>
            <p className="text-emerald-900 dark:text-emerald-200 text-xs font-semibold leading-relaxed pl-6">
              {activeBrief.theWinWeGaveThem}
            </p>
          </div>

          {/* Box 3: The 1 Phrase to NEVER Say */}
          <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-900 bg-amber-50/50 dark:bg-amber-950/15 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-950 dark:text-amber-300 text-sm">
              <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>3. The 1 Phrase to AVOID (Triggers Pushback)</span>
            </div>
            <p className="text-amber-950 dark:text-amber-200 text-xs font-bold leading-relaxed pl-6 bg-white dark:bg-black p-3 rounded-xl border border-amber-200 dark:border-amber-900">
              {activeBrief.phraseToAvoid}
            </p>
          </div>

          {/* Box 4: Target Closing Commitment */}
          <div className="p-5 rounded-2xl border border-blue-300 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/15 space-y-2">
            <div className="flex items-center gap-2 font-bold text-blue-950 dark:text-blue-300 text-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>4. Target Closing Commitment (Desired Outcome)</span>
            </div>
            <p className="text-blue-900 dark:text-blue-200 text-xs font-semibold leading-relaxed pl-6">
              {activeBrief.targetClosingCommitment}
            </p>
          </div>

        </div>

        {/* Golden Opening Script Box */}
        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-[#12151b] border border-gray-300 dark:border-gray-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Your Word-For-Word Opening Line (Say This First):</span>
            </span>
            <span className="text-gray-500 font-mono text-[11px]">Ready to read aloud</span>
          </div>

          <blockquote className="text-sm font-bold text-black dark:text-white italic p-4 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 leading-relaxed">
            {activeBrief.goldenOpeningLine}
          </blockquote>
        </div>

      </div>

    </div>
  );
};
