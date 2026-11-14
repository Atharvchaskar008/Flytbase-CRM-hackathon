'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { ShieldCheck, TrendingUp, Radio, AlertTriangle, Users, HeartPulse } from 'lucide-react';

interface ExecutiveSummaryProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL' 
    ? Object.values(accounts) 
    : [accounts[selectedAccount]].filter(Boolean);

  let verifiedARR = 0;
  let totalPipeline = 0;
  let totalDocks = 0;
  let activeDocks = 0;
  let silentDocks = 0;
  let criticalRisks = 0;

  currentAccounts.forEach(acc => {
    acc.deals.forEach(d => {
      verifiedARR += d.verifiedValue || 0;
      totalPipeline += (d.value || 0);
    });
    criticalRisks += acc.risks.filter(r => r.severity === 'critical').length;
  });

  if (selectedAccount === 'ALL') {
    totalDocks = 49;
    activeDocks = 27;
    silentDocks = 3;
  } else if (selectedAccount === 'A') {
    totalDocks = 35;
    activeDocks = 14;
    silentDocks = 0;
  } else {
    totalDocks = 14;
    activeDocks = 11;
    silentDocks = 3;
  }

  const healthScore = selectedAccount === 'ALL' ? 68 : accounts[selectedAccount]?.healthScore || 50;

  return (
    <div className="space-y-4 font-sans">
      {/* Account Context Banner if single account selected */}
      {selectedAccount !== 'ALL' && accounts[selectedAccount] && (
        <div className={`border p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-200 bg-gray-50'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {accounts[selectedAccount].name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-300 bg-white text-gray-700 shadow-sm'
              }`}>
                {accounts[selectedAccount].sold}
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {accounts[selectedAccount].business}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className={`text-[11px] block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Health Index</span>
              <span className={`text-base font-mono font-bold ${
                healthScore >= 70 ? 'text-emerald-500' : healthScore <= 50 ? 'text-red-500' : 'text-amber-500'
              }`}>
                {healthScore}/100
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5 High-Density Executive Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Verified Contracted ARR */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800/80 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium">Verified ARR</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            £{(verifiedARR / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            Signed POs & SLA terms
          </div>
        </div>

        {/* Card 2: Upsell Pipeline */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800/80 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium">Speculative Upsell</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-gray-900 dark:text-white">
            £{(totalPipeline / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            300-dock tender pipeline
          </div>
        </div>

        {/* Card 3: Fleet Status */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800/80 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium">Fleet Telemetry</span>
            <Radio className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-gray-900 dark:text-white">
            {activeDocks} <span className="text-sm font-normal text-gray-500">/ {totalDocks}</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
            <span>Docks Flying</span>
            {silentDocks > 0 && (
              <span className="text-red-500 font-semibold">{silentDocks} Silent</span>
            )}
          </div>
        </div>

        {/* Card 4: Active Threats */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800/80 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium">Critical Threats</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-red-600 dark:text-red-400">
            {criticalRisks}
          </div>
          <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            Imminent churn factors
          </div>
        </div>

        {/* Card 5: Health Index */}
        <div className={`p-4 rounded-xl border col-span-2 lg:col-span-1 flex flex-col justify-between ${
          isDark ? 'border-gray-800/80 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span className="font-medium">Portfolio Health</span>
            <HeartPulse className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-gray-900 dark:text-white">
            {healthScore}<span className="text-sm font-normal text-gray-500">/100</span>
          </div>
          <div className="text-[11px] text-gray-500 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            Weighted flight & sentiment
          </div>
        </div>

      </div>
    </div>
  );
};
