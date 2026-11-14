'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Calendar,
  AlertTriangle,
  Radio,
  Zap,
  CheckCircle2,
  Filter
} from 'lucide-react';

interface DroneUsageAnalyticsChartProps {
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

interface FacilityUsage {
  id: string;
  name: string;
  account: 'A' | 'B' | 'K' | 'H';
  accountName: string;
  docks: number;
  weeklySorties: number;
  prevWeeklySorties: number;
  velocityPct: number;
  nightPatrolPct: number;
  avgDurationMins: number;
  hoursSaved: number;
  status: 'nominal' | 'warning' | 'halt';
  note: string;
}

const USAGE_DATA: FacilityUsage[] = [
  {
    id: 'westmere',
    name: 'Westmere Tactical Air Support',
    account: 'A',
    accountName: 'Eastern Counties Police',
    docks: 18,
    weeklySorties: 142,
    prevWeeklySorties: 136,
    velocityPct: 4.4,
    nightPatrolPct: 42,
    avgDurationMins: 31,
    hoursSaved: 73.4,
    status: 'nominal',
    note: 'Highest mission cadence. 2 missing persons located in under 12 minutes.',
  },
  {
    id: 'metro_central',
    name: 'Metro Central Urban Patrol',
    account: 'A',
    accountName: 'Eastern Counties Police',
    docks: 6,
    weeklySorties: 88,
    prevWeeklySorties: 87,
    velocityPct: 1.1,
    nightPatrolPct: 38,
    avgDurationMins: 24,
    hoursSaved: 35.2,
    status: 'nominal',
    note: 'Continuous transit corridor and traffic incident surveillance.',
  },
  {
    id: 'immingham',
    name: 'Immingham Bulk Storage Terminal',
    account: 'B',
    accountName: 'Aldermoor Industrial',
    docks: 7,
    weeklySorties: 44,
    prevWeeklySorties: 43,
    velocityPct: 2.3,
    nightPatrolPct: 78,
    avgDurationMins: 26,
    hoursSaved: 19.1,
    status: 'nominal',
    note: 'Automated 24/7 nighttime perimeter patrol. Zero security breaches.',
  },
  {
    id: 'brindle_quays',
    name: 'Brindle Harbour (Quays 1 & 2)',
    account: 'H',
    accountName: 'Brindle Harbour (Live Drop)',
    docks: 4,
    weeklySorties: 36,
    prevWeeklySorties: 34,
    velocityPct: 5.9,
    nightPatrolPct: 88,
    avgDurationMins: 45,
    hoursSaved: 27.0,
    status: 'nominal',
    note: 'Nightly autonomous water patrol replacing manned patrol boats.',
  },
  {
    id: 'saltend',
    name: 'Saltend Petrochemicals Facility',
    account: 'B',
    accountName: 'Aldermoor Industrial',
    docks: 4,
    weeklySorties: 32,
    prevWeeklySorties: 41,
    velocityPct: -22.0,
    nightPatrolPct: 82,
    avgDurationMins: 29,
    hoursSaved: 15.5,
    status: 'warning',
    note: 'Drop caused by local shift handover resistance against central chargebacks.',
  },
  {
    id: 'plant_7',
    name: 'Plant 7 (Stallingborough Refinery)',
    account: 'B',
    accountName: 'Aldermoor Industrial',
    docks: 3,
    weeklySorties: 18,
    prevWeeklySorties: 28,
    velocityPct: -35.7,
    nightPatrolPct: 85,
    avgDurationMins: 22,
    hoursSaved: 6.6,
    status: 'warning',
    note: '3 docks maintained ping but ceased flights. Battery thermal limits.',
  },
  {
    id: 'norwold',
    name: 'Norwold Constabulary Division',
    account: 'A',
    accountName: 'Eastern Counties Police',
    docks: 6,
    weeklySorties: 9,
    prevWeeklySorties: 12,
    velocityPct: -25.0,
    nightPatrolPct: 15,
    avgDurationMins: 18,
    hoursSaved: 2.7,
    status: 'warning',
    note: 'Only flies training sorties; 0 live operational missions.',
  },
  {
    id: 'brindle_quay3',
    name: 'Brindle Harbour (Quay 3 Cargo)',
    account: 'H',
    accountName: 'Brindle Harbour (Live Drop)',
    docks: 1,
    weeklySorties: 4,
    prevWeeklySorties: 6,
    velocityPct: -33.3,
    nightPatrolPct: 25,
    avgDurationMins: 20,
    hoursSaved: 1.3,
    status: 'warning',
    note: 'Irregular daytime surveillance; needs automated scheduling setup.',
  },
  {
    id: 'brindle_container_yard',
    name: 'Brindle Harbour (Container Yard)',
    account: 'H',
    accountName: 'Brindle Harbour (Live Drop)',
    docks: 1,
    weeklySorties: 0,
    prevWeeklySorties: 0,
    velocityPct: -100.0,
    nightPatrolPct: 0,
    avgDurationMins: 0,
    hoursSaved: 0,
    status: 'halt',
    note: 'Grounded awaiting Elena Varga privacy assessment & DPIA signoff.',
  },
  {
    id: 'tarn_valley',
    name: 'Tarn Valley Force Command',
    account: 'A',
    accountName: 'Eastern Counties Police',
    docks: 5,
    weeklySorties: 0,
    prevWeeklySorties: 0,
    velocityPct: -100.0,
    nightPatrolPct: 0,
    avgDurationMins: 0,
    hoursSaved: 0,
    status: 'halt',
    note: 'Never flown a single live mission. Complete adoption stall.',
  },
  {
    id: 'kestrel_north',
    name: 'Kestrel Estates (North Gate Dock)',
    account: 'K',
    accountName: 'Kestrel Estates (Surprise Drop)',
    docks: 1,
    weeklySorties: 0,
    prevWeeklySorties: 0,
    velocityPct: -100.0,
    nightPatrolPct: 0,
    avgDurationMins: 0,
    hoursSaved: 0,
    status: 'halt',
    note: '1 dock paid ($14k) but 0 flights. Installer vanished, pilot training pending.',
  },
];

export const DroneUsageAnalyticsChart: React.FC<DroneUsageAnalyticsChartProps> = ({
  selectedAccount,
  isDark = false,
}) => {
  const [filterAccount, setFilterAccount] = useState<'ALL' | 'A' | 'B' | 'K' | 'H'>(
    selectedAccount === 'A' ? 'A' : selectedAccount === 'B' ? 'B' : selectedAccount === 'K' ? 'K' : selectedAccount === 'H' ? 'H' : 'ALL'
  );

  const filteredFacilities = filterAccount === 'ALL'
    ? USAGE_DATA
    : USAGE_DATA.filter(f => f.account === filterAccount);

  const maxSorties = 150; // Reference max for bar scaling

  const totalSorties = filteredFacilities.reduce((sum, f) => sum + f.weeklySorties, 0);
  const totalDocks = filteredFacilities.reduce((sum, f) => sum + f.docks, 0);
  const totalHoursSaved = filteredFacilities.reduce((sum, f) => sum + f.hoursSaved, 0);
  const avgCostPerSortie = totalSorties > 0 ? (totalDocks * 1000) / totalSorties : 0;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner & Control Bar */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-950 border border-blue-400">
              <Activity className="w-3.5 h-3.5 text-blue-700" />
              <span>Live Telemetry Velocity • Weekly Sortie Cadence</span>
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Drone Fleet Usage & Mission Velocity Analytics
            </h3>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Real-time weekly mission volume, flight duration, and automated patrol substitution across all 8 operational facilities.
            </p>
          </div>

          {/* Account Quick Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setFilterAccount('ALL')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                filterAccount === 'ALL'
                  ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All (373 Sorties)
            </button>
            <button
              onClick={() => setFilterAccount('A')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                filterAccount === 'A'
                  ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              A: Police
            </button>
            <button
              onClick={() => setFilterAccount('B')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                filterAccount === 'B'
                  ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              B: Industrial
            </button>
            <button
              onClick={() => setFilterAccount('K')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                filterAccount === 'K'
                  ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              K: Kestrel
            </button>
            <button
              onClick={() => setFilterAccount('H')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                filterAccount === 'H'
                  ? isDark ? 'bg-white text-black shadow-md' : 'bg-black text-white shadow-md'
                  : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              H: Brindle
            </button>
          </div>
        </div>

        {/* Executive KPI Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800 text-xs">
          <div className={`p-3.5 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07090c]' : 'border-gray-200 bg-gray-50'}`}>
            <span className="text-gray-500 font-bold block text-[11px] uppercase">Weekly Sorties Flown</span>
            <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
              {totalSorties} <span className="text-xs font-sans text-gray-500">missions</span>
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07090c]' : 'border-gray-200 bg-gray-50'}`}>
            <span className="text-gray-500 font-bold block text-[11px] uppercase">Active Docks Monitored</span>
            <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {totalDocks} <span className="text-xs font-sans text-gray-500">docks</span>
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07090c]' : 'border-gray-200 bg-gray-50'}`}>
            <span className="text-gray-500 font-bold block text-[11px] uppercase">Patrol Labor Hours Saved</span>
            <span className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400">
              {totalHoursSaved.toFixed(1)} <span className="text-xs font-sans text-gray-500">hours</span>
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07090c]' : 'border-gray-200 bg-gray-50'}`}>
            <span className="text-gray-500 font-bold block text-[11px] uppercase">Cost Per Mission</span>
            <span className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-300">
              ${avgCostPerSortie.toFixed(2)} <span className="text-xs font-sans text-gray-500">vs $1,250</span>
            </span>
          </div>
        </div>

        {/* Visual Vertical Column Bar Graph */}
        <div className={`mt-6 p-5 rounded-2xl border space-y-4 ${
          isDark ? 'border-gray-800 bg-[#0e1014]' : 'border-gray-200 bg-gray-50/70'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                Visual Sortie Volume by Facility (Vertical Column Graph)
              </h4>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-semibold text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-blue-600 inline-block"/> Nominal (&gt;20 sorties)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"/> Caution (&lt;20 sorties)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-rose-500 inline-block"/> Grounded / 0 Sorties</span>
            </div>
          </div>

          {/* Bar Chart Canvas */}
          <div className="h-52 pt-8 pb-3 px-2 flex items-end justify-between gap-2 sm:gap-4 border-b border-gray-300 dark:border-gray-800 overflow-x-auto">
            {filteredFacilities.map((fac) => {
              const heightPct = Math.max(6, Math.round((fac.weeklySorties / maxSorties) * 100));
              const isHalt = fac.status === 'halt';
              const isWarning = fac.status === 'warning';

              return (
                <div key={fac.id} className="flex-1 min-w-[40px] flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 px-2 py-1 rounded bg-black text-white text-[10px] whitespace-nowrap shadow-lg">
                    {fac.name}: {fac.weeklySorties} sorties ({fac.nightPatrolPct}% night)
                  </div>

                  {/* Value on top of bar */}
                  <span className={`text-[11px] font-mono font-bold mb-1 ${
                    isHalt ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {fac.weeklySorties}
                  </span>

                  {/* Column Bar */}
                  <div 
                    style={{ height: `${heightPct}%` }}
                    className={`w-full max-w-[42px] rounded-t-lg transition-all duration-500 shadow-sm ${
                      isHalt 
                        ? 'bg-gradient-to-t from-rose-600 to-rose-400' 
                        : isWarning 
                        ? 'bg-gradient-to-t from-amber-600 to-amber-400' 
                        : 'bg-gradient-to-t from-blue-700 to-blue-500'
                    }`}
                  />

                  {/* Facility label under bar */}
                  <span className="text-[10px] font-medium text-gray-500 truncate max-w-[55px] mt-2 text-center" title={fac.name}>
                    {fac.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Visual Bar Chart & Facility Cards */}
      <div className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
        isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Facility Sortie Velocity & Operational Health
            </h4>
            <p className="text-xs text-gray-500 font-medium">
              Ranked by mission volume. Facilities with &gt;20% drops trigger automated Yellow Churn Warnings.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700">
            {filteredFacilities.length} Facilities Active
          </span>
        </div>

        {/* Graphical Bars */}
        <div className="space-y-4">
          {filteredFacilities.map((fac) => {
            const pctWidth = Math.max(4, Math.min(100, (fac.weeklySorties / maxSorties) * 100));
            const isHalt = fac.status === 'halt';
            const isWarning = fac.status === 'warning';

            return (
              <div 
                key={fac.id}
                className={`p-4 rounded-2xl border transition space-y-2.5 ${
                  isHalt
                    ? 'border-rose-300 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/20'
                    : isWarning
                    ? 'border-amber-300 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/20'
                    : isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-black dark:text-white">
                      {fac.name}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black">
                      {fac.accountName}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {fac.docks} {fac.docks === 1 ? 'Dock' : 'Docks'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-sm font-bold text-black dark:text-white">
                      {fac.weeklySorties} sorties/wk
                    </span>
                    <span className={`text-[11px] font-bold flex items-center gap-0.5 px-2 py-0.5 rounded ${
                      fac.velocityPct > 0
                        ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300'
                        : isHalt
                        ? 'text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300'
                        : 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {fac.velocityPct > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{fac.velocityPct > 0 ? `+${fac.velocityPct}%` : `${fac.velocityPct}%`}</span>
                    </span>
                  </div>
                </div>

                {/* The Visual Horizontal Bar */}
                <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                  <div 
                    style={{ width: `${pctWidth}%` }}
                    className={`h-full rounded-full transition-all duration-700 ${
                      isHalt 
                        ? 'bg-rose-500' 
                        : isWarning 
                        ? 'bg-amber-500' 
                        : 'bg-blue-600'
                    }`}
                  />
                </div>

                {/* Sub-metrics */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-gray-600 dark:text-gray-400 pt-1">
                  <div className="flex items-center gap-4">
                    <span>Night Patrols: <strong className="text-black dark:text-white">{fac.nightPatrolPct}%</strong></span>
                    <span>Avg Duration: <strong className="text-black dark:text-white">{fac.avgDurationMins}m</strong></span>
                    <span>Guard Hours Saved: <strong className="text-black dark:text-white">{fac.hoursSaved}h</strong></span>
                  </div>
                  <span className="italic text-[10px] text-gray-500">
                    {fac.note}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
