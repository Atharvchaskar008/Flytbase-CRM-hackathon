'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { 
  ShieldCheck, 
  TrendingUp, 
  Radio, 
  AlertTriangle, 
  Users, 
  PieChart as PieIcon, 
  BarChart3, 
  Activity,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Info
} from 'lucide-react';

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
  const [activeChartTab, setActiveChartTab] = useState<'all' | 'revenue' | 'fleet' | 'matrix'>('all');
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);

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

  const totalRevenueScope = verifiedARR + pipelineARR;
  const verifiedPct = Math.round((verifiedARR / (totalRevenueScope || 1)) * 100);
  const pipelinePct = 100 - verifiedPct;

  const flyingPct = Math.round((flyingDocks / totalDocks) * 100);
  const standbyPct = Math.round((standbyDocks / totalDocks) * 100);
  const silentPct = 100 - flyingPct - standbyPct;

  // Donut calculations for Revenue
  // Circumference = 2 * Math.PI * 45 = 282.74
  const revCircumference = 282.74;
  const verifiedDash = (verifiedPct / 100) * revCircumference;
  const pipelineDash = (pipelinePct / 100) * revCircumference;

  // Donut calculations for Fleet
  // Circumference = 282.74
  const fleetFlyingDash = (flyingPct / 100) * revCircumference;
  const fleetStandbyDash = (standbyPct / 100) * revCircumference;
  const fleetSilentDash = (silentPct / 100) * revCircumference;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner & Visual Filters */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <PieIcon className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Visual Infographics & Pie Chart Analytics
              </h3>
            </div>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              High-contrast visual representations of financial audits, robotic dock telemetry, and stakeholder alignment.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-black p-1.5 rounded-xl border border-gray-300 dark:border-gray-800 text-xs font-bold">
            <button
              onClick={() => setActiveChartTab('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'all'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              All Infographics
            </button>
            <button
              onClick={() => setActiveChartTab('revenue')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'revenue'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Revenue Donut
            </button>
            <button
              onClick={() => setActiveChartTab('fleet')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'fleet'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Fleet Donut
            </button>
            <button
              onClick={() => setActiveChartTab('matrix')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeChartTab === 'matrix'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Power Matrix
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Infographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* INFOGRAPHIC 1: Interactive SVG Revenue Donut Chart */}
        {(activeChartTab === 'all' || activeChartTab === 'revenue') && (
          <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
            isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-bold text-base text-black dark:text-white">
                      Revenue Composition Pie Chart
                    </h4>
                    <span className="text-[11px] font-semibold text-gray-500">
                      Signed Baseline vs Speculative Pipeline
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400">
                  {verifiedPct}% Legally Signed
                </span>
              </div>

              {/* Chart + Center Visual */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
                {/* SVG Donut */}
                <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    {/* Background Ring */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke={isDark ? '#1f2937' : '#e5e7eb'}
                      strokeWidth="16"
                    />

                    {/* Speculative Slice (Amber) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke="#f59e0b"
                      strokeWidth="16"
                      strokeDasharray={`${pipelineDash} ${revCircumference}`}
                      strokeDashoffset="0"
                      className="transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                      onMouseEnter={() => setHoveredSlice('pipeline')}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />

                    {/* Verified Signed Slice (Emerald) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="16"
                      strokeDasharray={`${verifiedDash} ${revCircumference}`}
                      strokeDashoffset={`-${pipelineDash}`}
                      className="transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                      onMouseEnter={() => setHoveredSlice('verified')}
                      onMouseLeave={() => setHoveredSlice(null)}
                    />
                  </svg>

                  {/* Donut Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl font-mono font-bold text-black dark:text-white">
                      {hoveredSlice === 'pipeline' ? `$${(pipelineARR / 1000).toFixed(0)}k` : `$${(verifiedARR / 1000).toFixed(0)}k`}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {hoveredSlice === 'pipeline' ? 'Speculative' : 'Verified ARR'}
                    </span>
                  </div>
                </div>

                {/* Pie Chart Legend */}
                <div className="space-y-3 text-xs w-full sm:w-auto">
                  <div 
                    className={`p-3 rounded-xl border transition ${
                      hoveredSlice === 'verified'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30'
                        : isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredSlice('verified')}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <div className="flex items-center justify-between gap-3 font-bold text-black dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                        <span>Signed Baseline ARR ({verifiedPct}%)</span>
                      </div>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400">
                        ${verifiedARR.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 block">
                      Backed by PO-ECPA-2024-001 & AIG-ENT-2023-88.
                    </span>
                  </div>

                  <div 
                    className={`p-3 rounded-xl border transition ${
                      hoveredSlice === 'pipeline'
                        ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30'
                        : isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
                    }`}
                    onMouseEnter={() => setHoveredSlice('pipeline')}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <div className="flex items-center justify-between gap-3 font-bold text-black dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                        <span>Speculative Tender ({pipelinePct}%)</span>
                      </div>
                      <span className="font-mono text-amber-700 dark:text-amber-400">
                        ${pipelineARR.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 block">
                      300-dock framework requires operating model submission.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Rule Footnote */}
            <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>CFO Audit Standard:</strong> Only signed purchase orders with confirmed SLA clauses are recognized as baseline revenue. Speculative upsells remain strictly separated.
              </span>
            </div>
          </div>
        )}

        {/* INFOGRAPHIC 2: Interactive SVG Fleet Telemetry Donut Chart */}
        {(activeChartTab === 'all' || activeChartTab === 'fleet') && (
          <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
            isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-bold text-base text-black dark:text-white">
                      Robotic Fleet Operational Status
                    </h4>
                    <span className="text-[11px] font-semibold text-gray-500">
                      49 Physical Drone-in-a-Box Stations
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-950 border border-blue-400">
                  93.8% Overall Health
                </span>
              </div>

              {/* Chart + Center Visual */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
                {/* SVG Donut */}
                <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke={isDark ? '#1f2937' : '#e5e7eb'}
                      strokeWidth="16"
                    />

                    {/* Silent Docks (Rose) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke="#f43f5e"
                      strokeWidth="16"
                      strokeDasharray={`${fleetSilentDash} ${revCircumference}`}
                      strokeDashoffset="0"
                      className="transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                    />

                    {/* Standby Docks (Purple) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke="#8b5cf6"
                      strokeWidth="16"
                      strokeDasharray={`${fleetStandbyDash} ${revCircumference}`}
                      strokeDashoffset={`-${fleetSilentDash}`}
                      className="transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                    />

                    {/* Flying Docks (Blue) */}
                    <circle
                      cx="60"
                      cy="60"
                      r="45"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="16"
                      strokeDasharray={`${fleetFlyingDash} ${revCircumference}`}
                      strokeDashoffset={`-${fleetSilentDash + fleetStandbyDash}`}
                      className="transition-all duration-700 ease-out cursor-pointer hover:opacity-80"
                    />
                  </svg>

                  {/* Donut Center Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-2xl font-mono font-bold text-black dark:text-white">
                      {totalDocks}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      Total Docks
                    </span>
                  </div>
                </div>

                {/* Fleet Legend */}
                <div className="space-y-2.5 text-xs w-full sm:w-auto">
                  <div className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#12151b] flex items-center justify-between gap-4 font-bold text-black dark:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                      <span>Actively Flying ({flyingPct}%)</span>
                    </div>
                    <span className="font-mono text-blue-600 dark:text-blue-400">{flyingDocks} Docks</span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#12151b] flex items-center justify-between gap-4 font-bold text-black dark:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-purple-500 shrink-0" />
                      <span>Emergency Standby ({standbyPct}%)</span>
                    </div>
                    <span className="font-mono text-purple-600 dark:text-purple-400">{standbyDocks} Docks</span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-rose-300 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/20 flex items-center justify-between gap-4 font-bold text-black dark:text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                      <span>Silent / Inactive ({silentPct}%)</span>
                    </div>
                    <span className="font-mono text-rose-600 dark:text-rose-400">{silentDocks} Docks</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Footnote */}
            <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-300 flex items-start gap-2">
              <Activity className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>
                <strong>Hardware Diagnostics:</strong> 3 docks at Stallingborough were idle due to an RTK sensor lock; remote firmware was deployed and night missions resumed.
              </span>
            </div>
          </div>
        )}

        {/* INFOGRAPHIC 3: Stakeholder Influence vs Sentiment 2x2 Quadrant Map */}
        {(activeChartTab === 'all' || activeChartTab === 'matrix') && (
          <div className="lg:col-span-2 p-6 rounded-2xl border space-y-6 border-gray-300 dark:border-gray-800 bg-white dark:bg-[#0c0e12] shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-600" />
                <div>
                  <h4 className="font-bold text-base text-black dark:text-white">
                    Stakeholder Power & Sentiment Quadrant Matrix (2x2 Grid)
                  </h4>
                  <span className="text-[11px] font-semibold text-gray-500">
                    Maps organizational decision-makers by political influence and current operational sentiment
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-950 border border-purple-400">
                5 Key Leaders Plotted
              </span>
            </div>

            {/* 2x2 Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Quadrant 2: High Influence + Skeptical / Guarded */}
              <div className="p-5 rounded-2xl border border-rose-300 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/10 space-y-3">
                <div className="flex items-center justify-between font-bold text-rose-950 dark:text-rose-300 border-b border-rose-200 dark:border-rose-900 pb-2">
                  <span>QUADRANT II: High Influence • High Risk / Gatekeeper</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-950 dark:text-rose-100">Blockers</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-black border border-rose-200 dark:border-rose-800 space-y-1">
                  <div className="font-bold text-black dark:text-white flex items-center justify-between">
                    <span>Derek Finch</span>
                    <span className="text-[10px] font-mono text-rose-600 font-bold">Trust: 40%</span>
                  </div>
                  <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                    Senior Procurement Director • Requires audited unit economics before tender qualification.
                  </span>
                </div>
              </div>

              {/* Quadrant 1: High Influence + Strong Alignment */}
              <div className="p-5 rounded-2xl border border-emerald-300 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/10 space-y-3">
                <div className="flex items-center justify-between font-bold text-emerald-950 dark:text-emerald-300 border-b border-emerald-200 dark:border-emerald-900 pb-2">
                  <span>QUADRANT I: High Influence • Champion / Economic Buyer</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-100">Economic Drivers</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-black border border-emerald-200 dark:border-emerald-800 space-y-1">
                    <div className="font-bold text-black dark:text-white flex items-center justify-between">
                      <span>Marcus Hayes</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Trust: 75%</span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                      Chief Constable • Alliance Chair & Primary Sponsor.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-black border border-emerald-200 dark:border-emerald-800 space-y-1">
                    <div className="font-bold text-black dark:text-white flex items-center justify-between">
                      <span>Nadia Rahman</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">Trust: 88%</span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                      VP Operations • Group Financial Controller.
                    </span>
                  </div>
                </div>
              </div>

              {/* Quadrant 3: Low Influence + Operational Skeptic */}
              <div className="p-5 rounded-2xl border border-amber-300 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/10 space-y-3">
                <div className="flex items-center justify-between font-bold text-amber-950 dark:text-amber-300 border-b border-amber-200 dark:border-amber-900 pb-2">
                  <span>QUADRANT III: Low Influence • Guarded / Plant Operators</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-100">Site Managers</span>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-black border border-amber-200 dark:border-amber-800 space-y-1">
                  <div className="font-bold text-black dark:text-white flex items-center justify-between">
                    <span>Plant 7 & Stallingborough Ops</span>
                    <span className="text-[10px] font-mono text-amber-600 font-bold">Trust: 60%</span>
                  </div>
                  <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                    Chemical plant directors • Resented corporate security fee until inspection savings proven.
                  </span>
                </div>
              </div>

              {/* Quadrant 4: Operational Champions & Users */}
              <div className="p-5 rounded-2xl border border-blue-300 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/10 space-y-3">
                <div className="flex items-center justify-between font-bold text-blue-950 dark:text-blue-300 border-b border-blue-200 dark:border-blue-900 pb-2">
                  <span>QUADRANT IV: Operational Influence • Daily Users & Champions</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-950 dark:text-blue-100">Tactical Allies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white dark:bg-black border border-blue-200 dark:border-blue-800 space-y-1">
                    <div className="font-bold text-black dark:text-white flex items-center justify-between">
                      <span>Karen Mbeki</span>
                      <span className="text-[10px] font-mono text-blue-600 font-bold">Trust: 85%</span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                      Drone Unit Commander • Westmere tactical operations lead.
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-black border border-blue-200 dark:border-blue-800 space-y-1">
                    <div className="font-bold text-black dark:text-white flex items-center justify-between">
                      <span>Rhys Calder</span>
                      <span className="text-[10px] font-mono text-purple-600 font-bold">Trust: 95%</span>
                    </div>
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 block font-medium">
                      Fleet Operations Manager • Stepping down Jan 2026.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
};

