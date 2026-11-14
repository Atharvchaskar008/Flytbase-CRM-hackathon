'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { 
  Activity, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Radio, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  Filter,
  Flame,
  Info
} from 'lucide-react';

interface SilentDropRadarProps {
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

interface FacilityFlightTrend {
  id: string;
  facilityName: string;
  account: AccountId;
  assignedDocks: number;
  last7DaysSorties: number;
  prev7DaysSorties: number;
  velocityPct: number; // e.g. -35%
  status: 'nominal' | 'yellow_warning' | 'critical_halt';
  detectedReason: string;
  csmActionRequired: string;
  lastMissionDate: string;
  contactPerson: string;
}

const FACILITY_TRENDS: FacilityFlightTrend[] = [
  {
    id: 'plant_7_stallingborough',
    facilityName: 'Plant 7 (Stallingborough Chemical Refinery)',
    account: 'B',
    assignedDocks: 3,
    last7DaysSorties: 18,
    prev7DaysSorties: 28,
    velocityPct: -35.7,
    status: 'yellow_warning',
    detectedReason: '3 docks maintained network ping but ceased scheduled night perimeter sweeps. Sensor lock on dock 4.',
    csmActionRequired: 'Dispatch remote RTK recalibration and schedule a 15-minute briefing with Beatriz Alonso before she escalates to Nadia.',
    lastMissionDate: 'Yesterday, 22:15',
    contactPerson: 'Beatriz Alonso (Plant Manager)'
  },
  {
    id: 'saltend_refinery',
    facilityName: 'Saltend Petrochemical Facility',
    account: 'B',
    assignedDocks: 4,
    last7DaysSorties: 32,
    prev7DaysSorties: 41,
    velocityPct: -22.0,
    status: 'yellow_warning',
    detectedReason: 'Perimeter flight frequency dropped by 22% due to local shift handover resistance against central chargebacks.',
    csmActionRequired: 'Send weekly 1-page contractor substitution report showing $17,000 saved this month in local security billing.',
    lastMissionDate: '2 days ago',
    contactPerson: 'Stefan Roy / Saltend Shift Lead'
  },
  {
    id: 'norwold_police',
    facilityName: 'Norwold Constabulary Drone Unit',
    account: 'A',
    assignedDocks: 6,
    last7DaysSorties: 9,
    prev7DaysSorties: 12,
    velocityPct: -25.0,
    status: 'yellow_warning',
    detectedReason: 'Norwold only trains and flies zero live missions. Sorties dropped 25% due to pilot roster shortage.',
    csmActionRequired: 'Offer an on-site pilot certification bootcamp to unblock tactical readiness before tender spec locks.',
    lastMissionDate: '3 days ago',
    contactPerson: 'Rhys Calder / Norwold Chief'
  },
  {
    id: 'tarn_valley_police',
    facilityName: 'Tarn Valley Force Command',
    account: 'A',
    assignedDocks: 5,
    last7DaysSorties: 0,
    prev7DaysSorties: 0,
    velocityPct: -100.0,
    status: 'critical_halt',
    detectedReason: 'Never flown a single live mission since initial dock deployment. Complete adoption stall.',
    csmActionRequired: 'Urgent tri-party review with Hannah Doyle. If left unresolved, alliance will cut 5 docks from renewal.',
    lastMissionDate: 'Zero sorties recorded',
    contactPerson: 'Hannah Doyle (Procurement Lead)'
  },
  {
    id: 'westmere_force',
    facilityName: 'Westmere Tactical Air Support',
    account: 'A',
    assignedDocks: 18,
    last7DaysSorties: 142,
    prev7DaysSorties: 136,
    velocityPct: 4.4,
    status: 'nominal',
    detectedReason: 'High daily mission cadence. 14 of 18 docks active on patrol support and search & rescue.',
    csmActionRequired: 'Confirm priority standby engineering coverage for 5 Dec public event.',
    lastMissionDate: 'Today, 07:45 AM',
    contactPerson: 'Insp. Karen Mbeki'
  },
  {
    id: 'metro_central_police',
    facilityName: 'Metro Central Force Operations',
    account: 'A',
    assignedDocks: 6,
    last7DaysSorties: 88,
    prev7DaysSorties: 87,
    velocityPct: 1.1,
    status: 'nominal',
    detectedReason: 'Stable routine surveillance across urban transit corridors. Nominal health.',
    csmActionRequired: 'Review quarterly battery cycle log with fleet manager.',
    lastMissionDate: 'Today, 06:30 AM',
    contactPerson: 'Rhys Calder'
  },
  {
    id: 'immingham_bulk',
    facilityName: 'Immingham Bulk Storage Terminal',
    account: 'B',
    assignedDocks: 7,
    last7DaysSorties: 44,
    prev7DaysSorties: 43,
    velocityPct: 2.3,
    status: 'nominal',
    detectedReason: 'Continuous 24/7 automated perimeter patrols. High operational satisfaction.',
    csmActionRequired: 'Capture testimonial for Nadia Rahman and the group insurer.',
    lastMissionDate: 'Today, 04:15 AM',
    contactPerson: 'Stefan Roy'
  },
  {
    id: 'kestrel_north_gate',
    facilityName: 'Kestrel Estates (North Gate Dock - Account K)',
    account: 'K',
    assignedDocks: 1,
    last7DaysSorties: 0,
    prev7DaysSorties: 0,
    velocityPct: -100.0,
    status: 'critical_halt',
    detectedReason: 'Surprise account drop! Dock is installed with power & network, but 0 sorties flown. Installer disappeared, no certified pilot on site, and property insurance undeclared.',
    csmActionRequired: 'Immediate field engineering flight commissioning and enrollment of 2 estate staff in certified pilot course ($4,000) before first Monday board vote.',
    lastMissionDate: 'Zero sorties recorded (Awaiting Go-Live)',
    contactPerson: 'Dana Whitfield (Estate Manager) / Graham Okafor'
  }
];

export const SilentDropRadar: React.FC<SilentDropRadarProps> = ({
  selectedAccount,
  isDark = false,
}) => {
  const [filterMode, setFilterMode] = useState<'ALL' | 'warnings_only'>('ALL');

  const filteredTrends = FACILITY_TRENDS.filter(t => {
    if (selectedAccount !== 'ALL' && t.account !== selectedAccount) return false;
    if (filterMode === 'warnings_only' && t.status === 'nominal') return false;
    return true;
  });

  const yellowWarningsCount = FACILITY_TRENDS.filter(t => t.status === 'yellow_warning').length;
  const criticalHaltsCount = FACILITY_TRENDS.filter(t => t.status === 'critical_halt').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400">
              <TrendingDown className="w-3.5 h-3.5 text-amber-700" />
              <span>Early Churn Intelligence</span>
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Autonomous "Silent Drop" Detection & Churn Radar
            </h3>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              When enterprise clients intend to cancel, they don't scream—they quietly stop flying.
              If automated sorties drop by &gt;20% over 7 days, trigger an immediate Yellow Churn Warning.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>{yellowWarningsCount} Yellow Churn Warnings</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-950 border border-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              <span>{criticalHaltsCount} Critical Inactivity</span>
            </span>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Monitoring 7 Operational Facilities across Police & Refinery Docks
          </span>
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-black p-1 rounded-xl border border-gray-300 dark:border-gray-800">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterMode === 'ALL'
                  ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              All Facilities ({FACILITY_TRENDS.length})
            </button>
            <button
              onClick={() => setFilterMode('warnings_only')}
              className={`px-3 py-1.5 rounded-lg font-bold transition ${
                filterMode === 'warnings_only'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-700 dark:text-amber-400 hover:underline'
              }`}
            >
              ⚠️ Warnings Only ({yellowWarningsCount + criticalHaltsCount})
            </button>
          </div>
        </div>
      </div>

      {/* Facility Velocity Cards */}
      <div className="space-y-4">
        {filteredTrends.map((facility) => {
          const isYellowWarning = facility.status === 'yellow_warning';
          const isCriticalHalt = facility.status === 'critical_halt';
          const isNominal = facility.status === 'nominal';

          return (
            <div
              key={facility.id}
              className={`p-6 rounded-2xl border space-y-4 transition ${
                isCriticalHalt
                  ? 'border-rose-400 bg-rose-50/40 dark:bg-rose-950/20'
                  : isYellowWarning
                  ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/20'
                  : isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white shadow-sm'
              }`}
            >
              {/* Header line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200 dark:border-gray-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-black dark:text-white">
                    {facility.facilityName}
                  </span>
                  <span className="font-mono text-gray-500 font-semibold">
                    ({facility.assignedDocks} Docks • Account {facility.account})
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-semibold">
                    Contact: <strong className="text-black dark:text-white">{facility.contactPerson}</strong>
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                    isCriticalHalt
                      ? 'bg-rose-100 text-rose-950 border border-rose-400'
                      : isYellowWarning
                      ? 'bg-amber-100 text-amber-950 border border-amber-400 animate-pulse'
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-400'
                  }`}>
                    {isCriticalHalt ? 'Critical Halt (100% Idle)' : isYellowWarning ? '⚠️ Yellow Churn Warning (-20%+ Drop)' : 'Nominal Uptime'}
                  </span>
                </div>
              </div>

              {/* 7-Day Velocity Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Last 7 Days Sorties</span>
                  <span className="text-xl font-mono font-bold text-black dark:text-white">
                    {facility.last7DaysSorties} missions
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Previous 7 Days</span>
                  <span className="text-xl font-mono font-bold text-gray-500">
                    {facility.prev7DaysSorties} missions
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Sortie Velocity</span>
                  <span className={`text-xl font-mono font-bold flex items-center gap-1 ${
                    facility.velocityPct < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {facility.velocityPct < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    <span>{facility.velocityPct > 0 ? `+${facility.velocityPct}%` : `${facility.velocityPct}%`}</span>
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Latest Telemetry Ping</span>
                  <span className="text-sm font-mono font-bold text-black dark:text-white">
                    {facility.lastMissionDate}
                  </span>
                </div>
              </div>

              {/* Root Cause & CSM Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#12151b] border border-gray-200 dark:border-gray-800 space-y-1">
                  <span className="font-bold text-black dark:text-white block">
                    Telemetry Root Cause:
                  </span>
                  <p className="text-gray-800 dark:text-gray-300 leading-relaxed font-semibold">
                    {facility.detectedReason}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                  <span className="font-bold text-emerald-950 dark:text-emerald-300 block">
                    Immediate Proactive CSM Action:
                  </span>
                  <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-semibold">
                    {facility.csmActionRequired}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
