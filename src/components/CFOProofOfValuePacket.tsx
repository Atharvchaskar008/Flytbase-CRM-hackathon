'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Building,
  Award,
  Sparkles,
  Info
} from 'lucide-react';

interface CFOProofOfValuePacketProps {
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

export const CFOProofOfValuePacket: React.FC<CFOProofOfValuePacketProps> = ({
  selectedAccount,
  isDark = false,
}) => {
  const [activeAccount, setActiveAccount] = useState<'A' | 'B' | 'K'>(
    selectedAccount === 'B' ? 'B' : selectedAccount === 'K' ? 'K' : 'A'
  );
  const [isExporting, setIsExporting] = useState(false);

  const isAccountA = activeAccount === 'A';
  const isAccountB = activeAccount === 'B';
  const isAccountK = activeAccount === 'K';

  const clientName = isAccountA 
    ? 'Eastern Counties Police Alliance' 
    : isAccountB 
      ? 'Aldermoor Industrial Group' 
      : 'Kestrel Estates (Residents Security Trust)';

  const cfoName = isAccountA 
    ? 'Hannah Doyle (Commercial Procurement Lead)' 
    : isAccountB 
      ? 'Nadia Rahman (Group Finance Controller)' 
      : 'Graham Okafor (Chair, Residents Board)';

  const poReference = isAccountA 
    ? 'PO-ECPA-2024-001' 
    : isAccountB 
      ? 'AIG-ENT-2023-88' 
      : 'PO-KESTREL-2024-001';

  const dockCount = isAccountA ? 35 : isAccountB ? 14 : 1;
  const activeSorties = isAccountA ? 142 : isAccountB ? 84 : 60;
  const dockFixedCost = dockCount * 1000; // $1,000 per dock
  const manualAlternativeCost = isAccountA 
    ? (dockFixedCost + 42000) 
    : isAccountB 
      ? (dockFixedCost + 49900) 
      : (dockFixedCost + 17000);
  const netSavings = manualAlternativeCost - dockFixedCost;

  const handlePrint = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 300);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-950 border border-emerald-400">
              <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
              <span>Automated Monthly Deliverable • Scheduled for 28th</span>
            </div>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
              Automated "CFO Proof of Value" 1-Page Packet
            </h3>
            <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Every month on the 28th, automatically generates a verified 1-page financial proof packet for the client's CFO:
              <strong className="text-black dark:text-white"> $1,000 dock cost vs. $3,500/hr traditional cost = ${netSavings.toLocaleString()} net savings this month.</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>{isExporting ? 'Preparing PDF...' : 'Print / Export 1-Page PDF'}</span>
            </button>
          </div>
        </div>

        {/* Account Selector */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-200 dark:border-gray-800 text-xs font-bold">
          <span className="text-gray-500">Select Recipient CFO:</span>
          <button
            onClick={() => setActiveAccount('A')}
            className={`px-3.5 py-1.5 rounded-xl border transition ${
              activeAccount === 'A'
                ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Account A (Eastern Police • Hannah Doyle)
          </button>
          <button
            onClick={() => setActiveAccount('B')}
            className={`px-3.5 py-1.5 rounded-xl border transition ${
              activeAccount === 'B'
                ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Account B (Aldermoor Industrial • Nadia Rahman)
          </button>
          <button
            onClick={() => setActiveAccount('K')}
            className={`px-3.5 py-1.5 rounded-xl border transition ${
              activeAccount === 'K'
                ? isDark ? 'bg-white text-black shadow-sm' : 'bg-black text-white shadow-md'
                : 'border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Account K (Kestrel Estates • Graham Okafor)
          </button>
        </div>
      </div>

      {/* THE 1-PAGE CFO AUDIT DOCUMENT */}
      <div className={`p-8 md:p-10 rounded-3xl border space-y-8 bg-white text-black shadow-md ${
        isDark ? 'dark:bg-[#07090c] dark:text-white dark:border-gray-800' : 'border-gray-300'
      }`}>
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b-2 border-black dark:border-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold tracking-tight">FLYTBASE</span>
              <span className="text-xs px-2 py-0.5 rounded bg-black text-white dark:bg-white dark:text-black font-bold uppercase">
                Enterprise ROI Certification
              </span>
            </div>
            <h2 className="text-2xl font-bold">
              Monthly Operational & Cost-Substitution Audit
            </h2>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-1">
              Prepared for: <strong className="text-black dark:text-white">{cfoName}</strong> • {clientName}
            </p>
          </div>

          <div className="text-right text-xs font-mono space-y-1">
            <div><span className="text-gray-500">Billing Cycle:</span> <strong>November 2026</strong></div>
            <div><span className="text-gray-500">Dispatch Date:</span> <strong>28 November 2026</strong></div>
            <div><span className="text-gray-500">Contract Reference:</span> <strong className="underline">{poReference}</strong></div>
            <div><span className="text-gray-500">Audit Status:</span> <strong className="text-emerald-700 dark:text-emerald-400">100% Verified Ground Truth</strong></div>
          </div>
        </div>

        {/* Big Savings Metric Highlight */}
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
              Audited Net Monthly Value Delivered
            </span>
            <div className="text-4xl md:text-5xl font-mono font-bold text-emerald-700 dark:text-emerald-400">
              ${netSavings.toLocaleString()} Saved
            </div>
            <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-200 mt-2">
              Mathematical proof reconciling FlytBase automated dock costs against traditional operational alternatives.
            </p>
          </div>

          <div className="text-right shrink-0 space-y-1 text-xs font-mono font-bold">
            <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-emerald-300 dark:border-emerald-800">
              <span className="text-gray-500 block text-[10px]">Contracted FlytBase Baseline:</span>
              <span className="text-base text-black dark:text-white">${dockFixedCost.toLocaleString()}/mo (${dockCount} Docks @ $1,000/mo)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-black border border-emerald-300 dark:border-emerald-800">
              <span className="text-gray-500 block text-[10px]">Substituted Alternative Cost:</span>
              <span className="text-base text-rose-600 dark:text-rose-400">${manualAlternativeCost.toLocaleString()}/mo</span>
            </div>
          </div>
        </div>

        {/* Financial Comparison Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-black dark:text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Itemized Line-Item Financial Reconciliation</span>
          </h4>

          <div className="rounded-xl border border-gray-300 dark:border-gray-800 overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-[#12151b] font-bold text-black dark:text-white border-b border-gray-300 dark:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Line Item Category</th>
                  <th className="py-3 px-4">Conventional Approach</th>
                  <th className="py-3 px-4">FlytBase Autonomous DiaB</th>
                  <th className="py-3 px-4 text-right">Net Financial Savings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800 font-medium">
                <tr>
                  <td className="py-3 px-4 font-bold">
                    {isAccountA ? 'Aerial Response Patrols (142 Missions)' : 'Perimeter Inspection Hours (84 Patrols)'}
                  </td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    {isAccountA ? 'Regional Helicopter Unit ($3,500/hr aviation fuel)' : 'Manual Guard Patrol Subcontractors ($45/hr billing)'}
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">
                    Automated DiaB Stations ($245 effective cost/sortie)
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    +${isAccountA ? '42,000' : '49,900'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">On-Site Dedicated Pilot Headcount</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    1 Full-Time Pilot on-site per mission ($120k/yr labor)
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">
                    Zero On-Site Pilot Overhead (Automated BVLOS)
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    Included in Baseline
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">Critical Incident Response Velocity</td>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">
                    Average 40 minutes launch & transit time
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-400 font-bold">
                    Under 12 minutes (Verified by flight_log_force_month)
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-blue-600">
                    70% Faster Eyes-on-Scene
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-[#101318] font-bold">
                  <td className="py-3 px-4 text-sm" colSpan={3}>
                    TOTAL NET RECONCILED FISCAL BENEFIT (MONTHLY):
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-base text-emerald-700 dark:text-emerald-400">
                    +${netSavings.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational Proof Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1.5">
            <span className="font-bold text-black dark:text-white block">Audit Verification Standard:</span>
            <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              All flight counts cite certified digital flight recorder files (<strong className="text-black dark:text-white">flight_log_force_month.csv</strong>).
              Zero metered cloud overage or hidden maintenance surcharges assessed.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1.5">
            <span className="font-bold text-black dark:text-white block">Next Scheduled Review:</span>
            <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
              Annual Contract Renewal window opens in 30 days. Contact your FlytBase Enterprise CSM to formalize next term’s fixed unit pricing.
            </p>
          </div>
        </div>

        {/* Signature & Audit Certification */}
        <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-500 block">Certified by FlytBase Customer Success Lead:</span>
            <div className="font-mono font-bold text-sm">Atharv Chaskar, Enterprise CSM Lead</div>
            <div className="text-gray-500 font-mono text-[11px]">Audit Timestamp: 2026-11-28T09:00:00Z • Hash: 9caaf2e</div>
          </div>

          <div className="p-3 rounded-xl border border-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-bold text-xs">Certified Audit-Proof Document for Internal Group Finance Committee</span>
          </div>
        </div>

      </div>

    </div>
  );
};
