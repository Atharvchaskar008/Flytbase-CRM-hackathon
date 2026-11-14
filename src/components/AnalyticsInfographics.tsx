'use client';

import React from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { ShieldCheck, TrendingUp, Radio, AlertTriangle, Users, PieChart, BarChart3, Activity } from 'lucide-react';

interface AnalyticsInfographicsProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const AnalyticsInfographics: React.FC<AnalyticsInfographicsProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const currentAccounts = selectedAccount === 'ALL' 
    ? Object.values(accounts) 
    : [accounts[selectedAccount]].filter(Boolean);

  let verifiedARR = 0;
  let pipelineARR = 0;
  let totalDocks = selectedAccount === 'A' ? 35 : selectedAccount === 'B' ? 14 : 49;
  let flyingDocks = selectedAccount === 'A' ? 14 : selectedAccount === 'B' ? 11 : 25;
  let standbyDocks = selectedAccount === 'A' ? 21 : selectedAccount === 'B' ? 0 : 21;
  let silentDocks = selectedAccount === 'A' ? 0 : selectedAccount === 'B' ? 3 : 3;

  currentAccounts.forEach(acc => {
    acc.deals.forEach(d => {
      verifiedARR += d.verifiedValue || 0;
      pipelineARR += (d.value || 0);
    });
  });

  const totalValue = verifiedARR + pipelineARR;
  const verifiedPct = Math.round((verifiedARR / (totalValue || 1)) * 100);
  const pipelinePct = 100 - verifiedPct;

  const flyingPct = Math.round((flyingDocks / totalDocks) * 100);
  const standbyPct = Math.round((standbyDocks / totalDocks) * 100);
  const silentPct = Math.round((silentDocks / totalDocks) * 100);

  // Stakeholder counts
  const allPeople = currentAccounts.flatMap(a => a.people);
  const decidersCount = allPeople.filter(p => p.isDecisionMaker).length;
  const championsCount = allPeople.filter(p => p.isChampion).length;
  const blockersCount = allPeople.filter(p => p.isBlocker).length;
  const usersCount = allPeople.filter(p => p.isUser).length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className={`p-5 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-gray-50/80 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Visual Infographics & Fleet Intelligence
              </h3>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              High-level comparative charts of verified ARR, robotics fleet distribution, stakeholder alignment, and risk velocity.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className={`px-3 py-1 rounded-full border ${
              isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-white text-gray-700 shadow-sm'
            }`}>
              Portfolio Scope: {selectedAccount === 'ALL' ? 'Eastern Police + Aldermoor' : selectedAccount === 'A' ? 'Eastern Counties Police' : 'Aldermoor Industrial'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Infographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Infographic 1: Verified vs Speculative ARR */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <h4 className="font-bold text-base">Revenue Audit Ratio</h4>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {verifiedPct}% Verified
            </span>
          </div>

          <div className="space-y-2">
            {/* Visual Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: `${verifiedPct}%` }}
                title={`Verified ARR: £${verifiedARR.toLocaleString()}`}
              />
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${pipelinePct}%` }}
                title={`Speculative Pipeline: £${pipelineARR.toLocaleString()}`}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Signed Contract ARR: <strong>£{(verifiedARR / 1000).toFixed(0)}k</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Tender Upsell: <strong>£{(pipelineARR / 1000).toFixed(0)}k</strong>
                </span>
              </div>
            </div>
          </div>

          <p className={`text-xs leading-relaxed pt-2 border-t border-gray-100 dark:border-gray-800 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            CFO Audit Rule: Only signed purchase orders with confirmed SLA clauses count as baseline revenue. Speculative upsell requires submitting unit-economics models.
          </p>
        </div>

        {/* Infographic 2: Fleet Telemetry Distribution */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-500" />
              <h4 className="font-bold text-base">Robotic Fleet Status</h4>
            </div>
            <span className="text-xs font-mono font-semibold text-gray-500">
              {totalDocks} Total FlytBase Units
            </span>
          </div>

          <div className="space-y-2">
            {/* Visual Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-gray-100 dark:bg-gray-800">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: `${flyingPct}%` }}
                title={`Flying Docks: ${flyingDocks}`}
              />
              <div 
                className="h-full bg-amber-400 transition-all duration-500" 
                style={{ width: `${standbyPct}%` }}
                title={`Standby: ${standbyDocks}`}
              />
              <div 
                className="h-full bg-red-500 transition-all duration-500" 
                style={{ width: `${silentPct}%` }}
                title={`Silent Fault: ${silentDocks}`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-2 text-center">
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-100 bg-gray-50'}`}>
                <div className="text-emerald-500 font-bold font-mono text-sm">{flyingDocks}</div>
                <div className="text-[11px] text-gray-500">Active BVLOS</div>
              </div>
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-100 bg-gray-50'}`}>
                <div className="text-amber-500 font-bold font-mono text-sm">{standbyDocks}</div>
                <div className="text-[11px] text-gray-500">Standby Ready</div>
              </div>
              <div className={`p-2 rounded-lg border ${isDark ? 'border-red-950 bg-red-950/20' : 'border-red-100 bg-red-50'}`}>
                <div className="text-red-500 font-bold font-mono text-sm">{silentDocks}</div>
                <div className="text-[11px] text-red-600 dark:text-red-400">Silent Docks</div>
              </div>
            </div>
          </div>

          <p className={`text-xs leading-relaxed pt-2 border-t border-gray-100 dark:border-gray-800 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Warning: Aldermoor has 3 docks that are online but haven't launched flights in 14 days due to uncoordinated plant maintenance.
          </p>
        </div>

        {/* Infographic 3: Stakeholder Alignment Spectrum */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <h4 className="font-bold text-base">Stakeholder Influence Grid</h4>
            </div>
            <span className="text-xs font-mono font-semibold text-gray-500">
              {allPeople.length} Contacts
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className={`p-3 rounded-xl border ${isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-100 bg-gray-50'}`}>
              <div className="font-bold font-mono text-lg text-blue-600 dark:text-blue-400">{decidersCount}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Deciders</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-100 bg-gray-50'}`}>
              <div className="font-bold font-mono text-lg text-emerald-600 dark:text-emerald-400">{championsCount}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">Champions</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'border-red-950 bg-red-950/20' : 'border-red-100 bg-red-50'}`}>
              <div className="font-bold font-mono text-lg text-red-600 dark:text-red-400">{blockersCount}</div>
              <div className="text-[11px] text-red-600 dark:text-red-400">Blockers</div>
            </div>
            <div className={`p-3 rounded-xl border ${isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-100 bg-gray-50'}`}>
              <div className="font-bold font-mono text-lg text-gray-700 dark:text-gray-300">{usersCount}</div>
              <div className="text-[11px] text-gray-500 mt-0.5">End Users</div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 text-xs">
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Chief Constable Marcus Hayes (Police)</span>
              <span className="font-semibold text-emerald-500">Economic Buyer</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Derek Finch (Procurement)</span>
              <span className="font-semibold text-red-500">Active Gatekeeper</span>
            </div>
            <div className="flex items-center justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Rhys Calder (Fleet Manager)</span>
              <span className="font-semibold text-amber-500">Departing Jan 2026</span>
            </div>
          </div>
        </div>

        {/* Infographic 4: Risk Window Deadlines */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h4 className="font-bold text-base">Risk Urgency Timetable</h4>
            </div>
            <span className="text-xs font-mono font-semibold text-red-500">
              4 Impending Windows
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            
            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDark ? 'border-red-900/60 bg-red-950/20' : 'border-red-200 bg-red-50/50'
            }`}>
              <div>
                <div className="font-bold text-red-700 dark:text-red-300">5 Dec Police Event Support</div>
                <div className="text-[11px] text-gray-500">Tactical air support for public event</div>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white text-[11px]">
                5d left
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDark ? 'border-amber-900/60 bg-amber-950/20' : 'border-amber-200 bg-amber-50/50'
            }`}>
              <div>
                <div className="font-bold text-amber-800 dark:text-amber-300">Aldermoor Plant Report Submission</div>
                <div className="text-[11px] text-gray-500">Deliver flight ROI to stop budget revolt</div>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-amber-500 text-white text-[11px]">
                12d left
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-gray-50'
            }`}>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">300-Dock Framework Tender Submission</div>
                <div className="text-[11px] text-gray-500">Procurement deadline for national tender</div>
              </div>
              <span className="font-mono font-semibold px-2 py-0.5 rounded border border-gray-300 dark:border-gray-700 text-[11px]">
                25d left
              </span>
            </div>

            <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
              isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-gray-50'
            }`}>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Rhys Calder Successor Transition</div>
                <div className="text-[11px] text-gray-500">Champion exit date</div>
              </div>
              <span className="font-mono font-semibold px-2 py-0.5 rounded border border-gray-300 dark:border-gray-700 text-[11px]">
                45d left
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
