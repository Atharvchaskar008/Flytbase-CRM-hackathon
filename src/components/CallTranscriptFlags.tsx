'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { 
  LIVE_CALL_TRANSCRIPTS, 
  LIVE_DECLINED_OFFERS, 
  CallTranscriptFact, 
  DeclinedOffer 
} from '../lib/liveMcpData';
import { 
  PhoneCall, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  FileText, 
  Sparkles, 
  Filter, 
  Search,
  ArrowRight,
  TrendingUp,
  Radio,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface CallTranscriptFlagsProps {
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const CallTranscriptFlags: React.FC<CallTranscriptFlagsProps> = ({
  selectedAccount,
  isDark = false,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'transcripts' | 'declined'>('all');
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'critical' | 'competitor' | 'churn'>('ALL');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('ALL');

  const filteredTranscripts = LIVE_CALL_TRANSCRIPTS.filter(item => {
    if (selectedAccount !== 'ALL' && item.account !== selectedAccount) return false;
    if (selectedSpeaker !== 'ALL' && item.speaker !== selectedSpeaker) return false;
    if (filterSeverity === 'critical' && item.flagSeverity !== 'critical') return false;
    if (filterSeverity === 'competitor' && item.flagType !== 'competitor_alternative') return false;
    if (filterSeverity === 'churn' && item.flagType !== 'churn_risk') return false;
    return true;
  });

  const filteredDeclinedOffers = LIVE_DECLINED_OFFERS.filter(item => {
    if (selectedAccount !== 'ALL' && item.account !== selectedAccount) return false;
    if (selectedSpeaker !== 'ALL' && item.pitchTo !== selectedSpeaker) return false;
    return true;
  });

  const allSpeakers = Array.from(new Set(LIVE_CALL_TRANSCRIPTS.map(t => t.speaker)));

  const criticalCount = LIVE_CALL_TRANSCRIPTS.filter(t => t.flagSeverity === 'critical').length;
  const competitorCount = LIVE_CALL_TRANSCRIPTS.filter(t => t.flagType === 'competitor_alternative').length;
  const churnRiskCount = LIVE_CALL_TRANSCRIPTS.filter(t => t.flagType === 'churn_risk').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                  Call Transcript Intelligence & Intent Flagging
                </h3>
                <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                  100% genuine call statements and customer dialogue from Questathon MCP data (data/live_export.json).
                </p>
              </div>
            </div>
          </div>

          {/* Quick Counter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-950 border border-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span>{criticalCount} Critical Flags</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>{churnRiskCount} Churn Signals</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-950 border border-purple-400 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-purple-700" />
              <span>{filteredDeclinedOffers.length} Rejected Pitches</span>
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800 text-xs">
          {/* View Mode */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-black p-1 rounded-xl border border-gray-300 dark:border-gray-800">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'all'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              All Signals ({filteredTranscripts.length + filteredDeclinedOffers.length})
            </button>
            <button
              onClick={() => setActiveTab('transcripts')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'transcripts'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Call Quotes & Flags ({filteredTranscripts.length})
            </button>
            <button
              onClick={() => setActiveTab('declined')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                activeTab === 'declined'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Declined Offers ({filteredDeclinedOffers.length})
            </button>
          </div>

          {/* Severity & Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilterSeverity('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                filterSeverity === 'ALL'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Severities
            </button>
            <button
              onClick={() => setFilterSeverity('critical')}
              className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                filterSeverity === 'critical'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'border-rose-300 text-rose-700 hover:bg-rose-50'
              }`}
            >
              🚨 Critical Only
            </button>
            <button
              onClick={() => setFilterSeverity('competitor')}
              className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                filterSeverity === 'competitor'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-purple-300 text-purple-700 hover:bg-purple-50'
              }`}
            >
              🚁 Helicopter / Alternative
            </button>
            <button
              onClick={() => setFilterSeverity('churn')}
              className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                filterSeverity === 'churn'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-amber-300 text-amber-700 hover:bg-amber-50'
              }`}
            >
              ⚠️ Churn / Revolt
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 1: Call Transcripts & Dialogue Flags */}
      {(activeTab === 'all' || activeTab === 'transcripts') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Flagged Call Statements & Dialogue Facts ({filteredTranscripts.length})</span>
            </h4>
            <span className="text-xs font-mono font-semibold text-gray-500">
              Source: data/live_export.json [facts]
            </span>
          </div>

          <div className="space-y-4">
            {filteredTranscripts.map((item) => {
              const isCritical = item.flagSeverity === 'critical';
              const isPositive = item.flagSeverity === 'positive';

              return (
                <div
                  key={item.id}
                  className={`p-6 rounded-2xl border space-y-4 transition ${
                    isCritical
                      ? 'border-rose-400 bg-rose-50/30 dark:bg-rose-950/20'
                      : isPositive
                      ? 'border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/10'
                      : isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
                  }`}
                >
                  {/* Top Meta Line */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-800 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
                        {item.id}
                      </span>
                      <span className="font-bold text-black dark:text-white">
                        {item.speaker}
                      </span>
                      <span className="text-gray-500">({item.role})</span>
                      <span className="text-[11px] font-semibold text-gray-500">
                        • Recorded at Minute {item.learnedAtMinute}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                        isCritical
                          ? 'bg-rose-100 text-rose-950 border border-rose-400'
                          : isPositive
                          ? 'bg-emerald-100 text-emerald-950 border border-emerald-400'
                          : 'bg-amber-100 text-amber-950 border border-amber-400'
                      }`}>
                        {item.flagTitle}
                      </span>
                    </div>
                  </div>

                  {/* The Actual Quote Said by Customer */}
                  <div className="p-4 rounded-xl bg-white dark:bg-black border border-gray-300 dark:border-gray-800 space-y-2">
                    <span className="text-[11px] font-bold uppercase text-gray-500 block">
                      Exact Customer Statement from Call Transcript:
                    </span>
                    <blockquote className="text-sm font-bold text-black dark:text-white italic">
                      "{item.text}"
                    </blockquote>
                    {item.verifiedBy && (
                      <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified by ground-truth file: {item.verifiedBy}</span>
                      </span>
                    )}
                  </div>

                  {/* CSM Impact Analysis & Suggested Remedy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                    <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-[#12151b] border border-gray-200 dark:border-gray-800 space-y-1">
                      <span className="font-bold text-black dark:text-white block">
                        Why This Was Flagged (Risk to Customer Relationship):
                      </span>
                      <p className="text-gray-800 dark:text-gray-300 leading-relaxed font-semibold">
                        {item.csmImpactAnalysis}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                      <span className="font-bold text-emerald-950 dark:text-emerald-300 block">
                        Recommended Proactive CSM Action:
                      </span>
                      <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">
                        {item.suggestedAction}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: Premature Pitches Declined by Customer */}
      {(activeTab === 'all' || activeTab === 'declined') && (
        <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>Customer Rejection Analysis: Premature Upsell Pitches Declined ({filteredDeclinedOffers.length})</span>
            </h4>
            <span className="text-xs font-mono font-semibold text-gray-500">
              Source: data/live_export.json [offers where status="declined"]
            </span>
          </div>

          <p className="text-xs text-gray-700 dark:text-gray-400 font-semibold">
            In enterprise customer success, customers reject expansion offers when foundational support issues are ignored. 
            Here is the forensic audit of rejected offers and how the CSM must pivot to active value delivery:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDeclinedOffers.map((offer) => (
              <div
                key={offer.id}
                className="p-5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/15 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-black dark:text-white text-sm">{offer.title}</span>
                  <span className="font-mono text-rose-700 dark:text-rose-400 font-bold text-sm">
                    £{offer.value.toLocaleString()} [DECLINED]
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">
                  Pitched to: <strong className="text-black dark:text-white">{offer.pitchTo}</strong> (Account {offer.account})
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-black border border-rose-200 dark:border-rose-800 space-y-1">
                  <span className="font-bold text-rose-950 dark:text-rose-300 block">
                    Why the Customer Rejected This Offer:
                  </span>
                  <p className="text-rose-900 dark:text-rose-200 font-medium leading-relaxed">
                    {offer.whyDeclined}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 block">
                    CSM Value Delivery Pivot:
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 font-medium leading-relaxed">
                    {offer.csmRemedy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
