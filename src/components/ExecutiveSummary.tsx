'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { ShieldCheck, TrendingUp, Radio, AlertTriangle, HeartPulse } from 'lucide-react';

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
    totalDocks = 56;
    activeDocks = 32;
    silentDocks = 5;
  } else if (selectedAccount === 'A') {
    totalDocks = 35;
    activeDocks = 14;
    silentDocks = 0;
  } else if (selectedAccount === 'B') {
    totalDocks = 14;
    activeDocks = 11;
    silentDocks = 3;
  } else if (selectedAccount === 'K') {
    totalDocks = 1;
    activeDocks = 0;
    silentDocks = 1;
  } else if (selectedAccount === 'H') {
    totalDocks = 6;
    activeDocks = 5;
    silentDocks = 1;
  } else {
    totalDocks = 1;
    activeDocks = 0;
    silentDocks = 1;
  }

  const healthScore = selectedAccount === 'ALL' ? 68 : accounts[selectedAccount]?.healthScore || 50;

  return (
    <div className="space-y-4 font-sans">
      {/* Account Context Banner if single account selected */}
      {selectedAccount !== 'ALL' && accounts[selectedAccount] && (
        <div className={`border p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs ${
          isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-300 bg-gray-50'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                {accounts[selectedAccount].name}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                isDark ? 'border-gray-700 bg-gray-900 text-gray-300' : 'border-gray-400 bg-white text-black shadow-sm'
              }`}>
                {accounts[selectedAccount].sold}
              </span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              {accounts[selectedAccount].business}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className={`text-[11px] font-medium block ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                Customer Happiness Score
              </span>
              <span className={`text-lg font-bold font-mono ${
                healthScore >= 70 ? 'text-emerald-600' : healthScore <= 50 ? 'text-red-600' : 'text-amber-600'
              }`}>
                {healthScore} / 100
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5 High-Density Executive Cards in Spoken English */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Money Signed on Paper */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
              Guaranteed Contract Money
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${(verifiedARR / 1000).toFixed(0)}k <span className="text-xs font-sans text-gray-500 font-normal">/ yr</span>
          </div>
          <div className={`text-[11px] mt-2 pt-2 border-t font-medium ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-800'
          }`}>
            Officially signed on paper
          </div>
        </div>

        {/* Card 2: Future Deals */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
              Possible Future Deals
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-black'}`}>
            ${(totalPipeline / 1000).toFixed(0)}k
          </div>
          <div className={`text-[11px] mt-2 pt-2 border-t font-medium ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-800'
          }`}>
            Big 300-drone tender if we win
          </div>
        </div>

        {/* Card 3: Drones Flying */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
              Drones Flying Now
            </span>
            <Radio className="w-4 h-4 text-indigo-600" />
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-black'}`}>
            {activeDocks} <span className="text-sm font-normal text-gray-600">/ {totalDocks} total</span>
          </div>
          <div className={`text-[11px] mt-2 pt-2 border-t flex items-center justify-between font-medium ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-800'
          }`}>
            <span>Drones in the air</span>
            {silentDocks > 0 && (
              <span className="text-red-600 font-bold">{silentDocks} Not flying!</span>
            )}
          </div>
        </div>

        {/* Card 4: Urgent Problems */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
              Urgent Problems
            </span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl md:text-3xl font-bold font-mono text-red-600">
            {criticalRisks}
          </div>
          <div className={`text-[11px] mt-2 pt-2 border-t font-medium ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-800'
          }`}>
            Must fix or customer may leave
          </div>
        </div>

        {/* Card 5: Overall Health */}
        <div className={`p-4 rounded-xl border col-span-2 lg:col-span-1 flex flex-col justify-between ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-black'}`}>
              Customer Happiness
            </span>
            <HeartPulse className="w-4 h-4 text-emerald-600" />
          </div>
          <div className={`text-2xl md:text-3xl font-bold font-mono ${isDark ? 'text-white' : 'text-black'}`}>
            {healthScore}<span className="text-sm font-normal text-gray-600"> / 100</span>
          </div>
          <div className={`text-[11px] mt-2 pt-2 border-t font-medium ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-800'
          }`}>
            Based on flights & meetings
          </div>
        </div>

      </div>
    </div>
  );
};

