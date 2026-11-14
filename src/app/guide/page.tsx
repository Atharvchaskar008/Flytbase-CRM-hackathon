'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  Bot, 
  Activity, 
  Sun, 
  Moon,
  ExternalLink,
  ChevronRight,
  Database,
  Radio,
  BookOpen,
  Sparkles
} from 'lucide-react';

export default function PlatformGuidePage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-900'
    }`}>
      
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-50 px-6 py-4 backdrop-blur-md transition-colors ${
        isDark ? 'border-[#1e2227] bg-black/90 text-white' : 'border-gray-200 bg-white/95 text-gray-900 shadow-sm'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                isDark 
                  ? 'border-gray-800 bg-[#0d0f12] hover:bg-gray-800 text-gray-200' 
                  : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Live Dashboard</span>
            </Link>
            <div className="h-5 w-px bg-gray-300 dark:bg-gray-800" />
            <div>
              <h1 className="text-base font-semibold tracking-tight">FlytBase CSM Platform Guide & Architecture</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Detailed System Blueprint, Operational Mechanics & Section Breakdown
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition ${
                isDark ? 'border-gray-800 bg-gray-900 text-white hover:bg-gray-800' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-sm'
              }`}
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">

        {/* Hero Section */}
        <section className={`p-8 md:p-10 rounded-2xl border transition-all ${
          isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-200 bg-gray-50 shadow-sm'
        }`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-4 border-gray-300 dark:border-gray-700">
            <Radio className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>Autonomous Robotics Command Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
            Customer Success & Risk Intelligence for Drone-in-a-Box (DiaB)
          </h2>
          <p className={`text-lg md:text-xl leading-relaxed max-w-4xl ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            This platform is an enterprise-grade command center built specifically for <strong>FlytBase</strong>. 
            Traditional CRMs act as passive filing cabinets for sales notes. This system connects live hardware telemetry, 
            contractual obligations, and organizational politics into an automated intelligence engine that protects 
            <strong> $588,000 in baseline recurring revenue (ARR)</strong> and paves the path for expansion across 300+ autonomous docks.
          </p>
        </section>

        {/* Section 1: The Core Foundation */}
        <div className="space-y-6">
          <div className="border-b pb-3 border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold tracking-tight">1. Why FlytBase Needs a Dedicated CSM Platform</h3>
            <p className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              The unique operational requirements of autonomous drone operations compared to generic SaaS software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1 */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-500">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold">Physical Hardware Telemetry</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  FlytBase does not just host software; it controls physical robotic docks deployed in dangerous chemical plants and police jurisdictions. 
                  When 3 docks stop flying at Aldermoor, it is not a software ticket—it is a $168k contract cancellation risk happening in silence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs font-semibold text-blue-600 dark:text-blue-400">
                Live Sensor Ingestion Active
              </div>
            </div>

            {/* Box 2 */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-500/10 text-amber-500">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold">Multi-Stakeholder Politics</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  In enterprise deals, the person who operates the drone (Inspector Karen Mbeki) is never the person who pays the bill (Chief Constable Marcus Hayes), 
                  and the person who approves the budget (Derek Finch) will block everything if procurement standards are not met.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs font-semibold text-amber-600 dark:text-amber-400">
                5-Role Power Mapping
              </div>
            </div>

            {/* Box 3 */}
            <div className={`p-6 rounded-xl border flex flex-col justify-between ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold">Zero-Copy Contract Auditing</h4>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Sales reps frequently report inflated expansion numbers. This platform enforces <strong>Book With Receipts</strong>: 
                  every single pound in verified ARR must cite a signed Purchase Order number and SLA clause from the verified Data Room.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                100% Citation Grounding
              </div>
            </div>

          </div>
        </div>

        {/* Section 2: Detailed Section Breakdown */}
        <div className="space-y-6">
          <div className="border-b pb-3 border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold tracking-tight">2. Detailed Dashboard Section Breakdown</h3>
            <p className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Every tab in the command center directly solves one of the 5 judging questions and operational pillars.
            </p>
          </div>

          <div className="space-y-6">

            {/* Section Card: Receipts Q1 */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Judging Question 1 • Financial Audit
                    </span>
                    <h4 className="text-xl font-bold">Book With Receipts (Verified ARR vs. Pipeline)</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">$602,000</span>
                  <span className="text-xs block text-gray-500">Signed Baseline ARR</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    A strict, audited financial breakdown separating legally signed recurring revenue from unverified pipeline.
                    Eastern Counties Police Alliance contributes <strong>$420,000</strong> (35 docks @ $1k/mo under PO-ECPA-2024-001), 
                    Aldermoor Industrial contributes <strong>$168,000</strong> (14 docks @ $1k/mo under AIG-ENT-2023-88), and surprise live drop 
                    Kestrel Estates contributes <strong>$14,000</strong> (1 dock under PO-KESTREL-2024-001).
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">Why It Matters to FlytBase Leadership:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    The 300-dock police framework tender is worth $1.1M, but it has <strong>zero verified revenue</strong> until a costed operating model is submitted. 
                    This tab prevents executive teams from assuming prospective deals are guaranteed money.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Power Map Q2 */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 text-blue-500">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Judging Question 2 • Organizational Dynamics
                    </span>
                    <h4 className="text-xl font-bold">Power Map (Stakeholder Dynamics & Alignment)</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">8 Deciders</span>
                  <span className="text-xs block text-gray-500">Mapped Across 3 Accounts</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Every key individual classified by their structural influence: <strong>Decision Maker</strong> (Marcus Hayes, Nadia Rahman, Graham Okafor), 
                    <strong>Payer / Economic Buyer</strong>, <strong>Champion</strong> (Rhys Calder, Dana Whitfield), <strong>Blocker</strong> (Derek Finch, Lucy Pratt), 
                    and <strong>End User</strong> (Inspector Karen Mbeki). Each profile displays an objective trust score and their primary operational hurdle.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">How It Protects the Accounts:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    When champion Rhys Calder leaves in January, the relationship defaults to zero if FlytBase has not institutionalized 
                    relationships with Chief Constable Hayes and Karen Mbeki. The Power Map exposes single points of organizational failure.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Pre-Meeting 60-Second Brief */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Pre-Call Executive Intelligence
                    </span>
                    <h4 className="text-xl font-bold">The Pre-Meeting 60-Second Brief One-Pager</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">60 Seconds</span>
                  <span className="text-xs block text-gray-500">Tactical Preparation Time</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    A single high-impact battlecard for every stakeholder before dialing. Shows their <strong>Customer Temperature</strong> (Guarded, Ally, Skeptic), 
                    <strong>What they last complained about</strong>, <strong>The win we gave them</strong>, and crucially <strong>The 1 phrase to avoid</strong> 
                    (e.g., <em>"Don't mention Rhys's resignation"</em>). Includes a 1-click copyable golden opening line.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">Why CSMs Love It:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    CSMs don't have time to read 15-page contracts right before dialing Inspector Karen Mbeki or Group Controller Nadia Rahman. 
                    This card gives them instant psychological alignment and prevents verbal missteps.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Silent Drop Churn Radar */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-rose-500/10 text-rose-500">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      Predictive Churn Detection
                    </span>
                    <h4 className="text-xl font-bold">Autonomous "Silent Drop" Churn Radar</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-rose-600 dark:text-rose-400">&gt;20% Alert</span>
                  <span className="text-xs block text-gray-500">Sortie Velocity Trigger</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Monitors 7-day automated sortie counts across all 7 operational facilities. If missions drop by &gt;20%, it fires an immediate 
                    <strong>Yellow Churn Warning</strong> (e.g., -35.7% at Plant 7 Stallingborough, -22% at Saltend, and -100% idle at Kestrel Estates North Gate).
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">The Business Impact:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    In enterprise hardware, clients rarely complain before cancelling—they quietly stop flying. By detecting silent drops 
                    weeks before contract renewal, the CSM can intervene and resolve root causes before churn occurs.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: CFO Proof of Value Packets */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-500">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Automated Monthly Value Audit
                    </span>
                    <h4 className="text-xl font-bold">Automated "CFO Proof of Value" Packets</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">28th Monthly</span>
                  <span className="text-xs block text-gray-500">Automated PDF Schedule</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    An audit-grade 1-page financial packet generated automatically every month on the 28th for client Finance Controllers (Nadia Rahman, Hannah Doyle, Graham Okafor). 
                    Shows: <strong>$1,000 dock cost vs. $3,500/hr traditional helicopter cost = $42,000 net monthly taxpayer/operational savings</strong>.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">Executive Value:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    CFOs don't renew based on slide decks. They renew when presented with signed PO numbers (PO-ECPA-2024-001, AIG-ENT-2023-88) 
                    and verified hours saved. Includes a 1-click print button that formats into a clean, board-ready 1-page PDF.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Actions Q3 */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-violet-500/10 text-violet-500">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                      Judging Question 3 • Tactical Execution
                    </span>
                    <h4 className="text-xl font-bold">Ranked Monday 9:00 AM Playbook</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-violet-600 dark:text-violet-400">Ranked #1-#4</span>
                  <span className="text-xs block text-gray-500">Ownership & Timebounds</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    A prioritized sequence of actions for the CSM stepping into the office on Monday morning. 
                    Instead of random busywork, each action assigns a designated owner (e.g., CSM Lead, Technical Account Manager), 
                    a strict deadline, expected deliverables, and the required evidence files needed before dialing.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">Immediate Priorities:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <strong>Action 1:</strong> Resolve Inspector Karen Mbeki's unanswered Dec 5 operational support ticket before 11:00 AM.<br />
                    <strong>Action 2:</strong> Deliver automated plant-level flight frequency reports to Nadia Rahman at Aldermoor to stop the plant managers' budget revolt.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Risk Radar Q4 */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-500/10 text-red-500">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                      Judging Question 4 • Churn Warning Radar
                    </span>
                    <h4 className="text-xl font-bold">Risk Radar & Window Countdown</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">4 Active</span>
                  <span className="text-xs block text-gray-500">High-Severity Threats</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Live countdown timers on silent churn threats. Traditional CRMs only warn you when a customer announces they are leaving. 
                    This radar tracks technical degradation (3 offline docks at Aldermoor), contract renewal dates (March 31), and personnel turnover (Rhys Calder's January exit).
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">The Mitigation Plan:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Each threat includes a concrete mitigation playbook. For example, to neutralize the procurement threat at Eastern Counties Police, 
                    the plan details delivering an audited unit-economics model before the tender submission deadline expires.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Blind Spots Q5 */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500/10 text-amber-500">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      Judging Question 5 • Discovery & Risk Elimination
                    </span>
                    <h4 className="text-xl font-bold">Blind Spot Finder & Inquiry Logger</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">$1,268,000</span>
                  <span className="text-xs block text-gray-500">Revenue at Stake</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
                <div>
                  <h5 className="font-semibold mb-2 text-base">What This Section Shows:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    The questions we have not asked yet that could kill our contracts. It identifies the exact stakeholder who holds the answer 
                    (e.g., Rhys Calder for his successor, Arthur Pendelton for chemical sensor protocols) and provides a pre-drafted inquiry script.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold mb-2 text-base">Direct Upstream Integration:</h5>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    Clicking "Log Discovery Question" directly pre-fills the Note Dispatcher modal, allowing the CSM to submit the finding back 
                    to the game engine via the MCP <code className="font-mono text-xs bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded">write_note</code> tool.
                  </p>
                </div>
              </div>
            </div>

            {/* Section Card: Autonomous AI Agents */}
            <div className={`p-8 rounded-2xl border ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-cyan-500/10 text-cyan-500">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                      Autonomous Intelligence • Multi-Agent Network
                    </span>
                    <h4 className="text-xl font-bold">Autonomous CSM Agent Swarm</h4>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-cyan-600 dark:text-cyan-400">3 Agents</span>
                  <span className="text-xs block text-gray-500">Autonomous Workers</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm leading-relaxed">
                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-100 bg-gray-50'}`}>
                  <h6 className="font-bold text-sm mb-1 text-cyan-600 dark:text-cyan-400">1. Telemetry Watchdog Agent</h6>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Runs continuous background loops monitoring flight frequency and dock status. Detects when docks sit idle without maintenance tickets.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-100 bg-gray-50'}`}>
                  <h6 className="font-bold text-sm mb-1 text-amber-600 dark:text-amber-400">2. Stakeholder Dynamics Agent</h6>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Tracks leadership stability, departures, and relationship coldness. Automatically triggers successor mapping workflows when champions resign.
                  </p>
                </div>
                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-100 bg-gray-50'}`}>
                  <h6 className="font-bold text-sm mb-1 text-emerald-600 dark:text-emerald-400">3. Expansion Synthesis Agent</h6>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    Monitors tender framework deadlines and procurement hurdles. Prepares unit-economics decks and ROI summaries for commercial meetings.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Hackathon Retrospective & Decisions Chosen */}
        <div className="space-y-6">
          <div className="border-b pb-3 border-gray-200 dark:border-gray-800">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-2 border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hackathon Journey & Decision Analysis</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">4. Hackathon Journey, In-Game Decisions & Impact</h3>
            <p className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              The exact strategic decisions chosen during the Questathon simulation, how they shaped account health, and how to present this to the judges.
            </p>
          </div>

          <div className={`p-8 rounded-2xl border space-y-6 ${
            isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <h4 className="text-xl font-bold">The Initial Dilemma: The False Sense of Security</h4>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              In the opening turn of the simulation, both accounts appeared healthy on the surface. Traditional account managers would have treated this as a standard upselling opportunity. 
              However, our telemetry analysis and stakeholder discovery revealed a dangerous reality:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-100 bg-gray-50'}`}>
                <h5 className="font-bold text-sm text-blue-500 mb-1">Account A: Eastern Counties Police Alliance ($420k ARR)</h5>
                <ul className="space-y-1 list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li><strong>Active Champion Resignation:</strong> Rhys Calder announced his departure in January 2026 with no successor mapped.</li>
                  <li><strong>Unanswered Tactical Crisis:</strong> Inspector Karen Mbeki had an unacknowledged emergency ticket for a 5 Dec public event.</li>
                  <li><strong>Procurement Roadblock:</strong> Derek Finch was preparing to disqualify FlytBase from the 300-dock ($1.1M) tender due to missing cost models.</li>
                </ul>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-100 bg-gray-50'}`}>
                <h5 className="font-bold text-sm text-amber-500 mb-1">Account B: Aldermoor Industrial Group ($168k ARR)</h5>
                <ul className="space-y-1 list-disc list-inside text-gray-500 dark:text-gray-400">
                  <li><strong>Silent Drone Degradation:</strong> 3 docks at Stallingborough completely stopped flying while remaining online.</li>
                  <li><strong>Plant Manager Budget Revolt:</strong> Facility managers were refusing to pay corporate security chargebacks for idle drones.</li>
                  <li><strong>Renewal Hostage:</strong> VP Operations Nadia Rahman was withholding the March renewal until plant flight ROI was proven.</li>
                </ul>
              </div>
            </div>

            {/* Strategic Game Decisions */}
            <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-lg font-bold">The 5 Core Strategic Decisions We Executed:</h4>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 block mb-1">
                    Decision 1: Immediate Triage of Karen Mbeki's Dec 5 Ticket (Prioritize Support over Sales)
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> Attempting to upsell a customer with an active emergency ticket creates instant hostility. We dispatched an immediate field engineering standby protocol for the Dec 5 public event.<br />
                    <em>Impact:</em> Raised officer trust from 45% to 85%, defended police air credibility, and prevented an embarrassing public failure that would have triggered council contract review.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                    Decision 2: Institutionalize the Relationship Before Rhys Calder Leaves
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> In SaaS, losing your sole champion causes 70% of surprise churn. We scheduled an executive briefing directly with Chief Constable Marcus Hayes and positioned Karen Mbeki as operational co-lead.<br />
                    <em>Impact:</em> Removed the single-point-of-failure risk before Rhys Calder's January exit date.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-violet-600 dark:text-violet-400 block mb-1">
                    Decision 3: Unit-Economics Model for Derek Finch (Unlocking the $1.1M Framework Tender)
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> Derek Finch in procurement cared about cost-per-flight-hour, not marketing slides. We audited our $1,000/dock/month model against manual helicopter flight costs.<br />
                    <em>Impact:</em> Successfully satisfied procurement criteria, qualifying FlytBase for the 300-dock national framework tender ($1,100,000 upside).
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-amber-600 dark:text-amber-400 block mb-1">
                    Decision 4: Quelling Aldermoor's Plant Revolt with Automated Flight ROI Reports
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> Nadia Rahman was caught between angry plant managers and central IT. We extracted automated flight frequency logs for each plant showing $240k saved in manual perimeter patrols.<br />
                    <em>Impact:</em> Ended the internal budget revolt, restored Nadia's confidence, and secured the $168k contract renewal.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 block mb-1">
                    Decision 5: Twilio Live Voice Calling & Zero-Key WhatsApp Gateway
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> Manual CRM typing doesn't resolve customer doubt. We integrated real Twilio Outbound Voice Calling (verified dispatch to +919881898129) and universal WhatsApp click-to-chat (wa.me) requiring zero API keys for testing.<br />
                    <em>Impact:</em> CSMs can execute immediate tactical phone interventions and WhatsApp check-ins directly from the cockpit.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border ${isDark ? 'border-gray-800 bg-[#101318]' : 'border-gray-200 bg-gray-50'}`}>
                  <strong className="text-sm font-semibold text-amber-500 dark:text-amber-400 block mb-1">
                    Decision 6: Dynamic Ingestion & Salvation of Kestrel Estates (Account K Surprise Drop)
                  </strong>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <em>Why:</em> A surprise mid-game drop introduced Account K: 1 dock paid, 0 flying, vanished installer, and unnotified property insurance. Traditional systems require manual database schema migration.<br />
                    <em>Impact:</em> Our platform ingested /drops/K dynamically, generated an insurance declaration rider for Lucy Pratt, enrolled 2 staff in pilot training, and prepared a residents board presentation for Graham Okafor to defend the budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Judging Presentation Script (3 Minutes) */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <h4 className="text-lg font-bold">Recommended 3-Minute Video Walkthrough Script for Judges:</h4>
              <div className="space-y-2 text-xs leading-relaxed font-mono bg-gray-50 dark:bg-[#07080a] p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                <p><strong>[0:00 - 0:45] The Hook & The Problem:</strong><br />
                "Hello, I am presenting the FlytBase CSM Command Center. In autonomous Drone-in-a-Box operations, customer support cannot be a passive filing cabinet. Customers smiled and said everything was fine, but our telemetry found 3 dead docks, an unanswered tactical police emergency, a champion resigning in January, and a surprise residential account with a vanished installer. Here is how our platform defended $602,000 in ARR across 3 accounts."</p>

                <p><strong>[0:45 - 1:30] Answering the 5 Judging Questions & Instant 60-Sec Battlecards:</strong><br />
                "Our dashboard directly answers the 5 hackathon questions: Tab 2 (Receipts) audits $602k in signed ARR vs $1.1M in speculative pipeline. Tab 4 gives our 60-Second Pre-Meeting Brief cards before dialing any client. Tab 7 tracks silent flight velocity churn drops (&gt;20%). Tab 8 maps deciders like Chief Constable Marcus Hayes and blockers like Derek Finch. Tab 11 auto-generates 1-page CFO value packets on the 28th."</p>

                <p><strong>[1:30 - 2:15] Tracing a Number to a Receipt (Data Room) & Telephony:</strong><br />
                "Notice this $420,000 ARR figure. When I click on PO-ECPA-2024-001, it jumps into our Data Room, opening the exact signed contract and SLA response terms. Meanwhile, our Autonomous AI Agents detect telemetry drops and allow us to trigger live Twilio Voice Calls directly to +919881898129 or open universal WhatsApp check-ins with zero API key setup."</p>

                <p><strong>[2:15 - 3:00] Architecture & Ingestion:</strong><br />
                "Built on Next.js 14 and Poppins styling, the platform connects to Questathon via streamable MCP, strictly respects the 1 call/min rate limit with an atomic cache, and ingests live event signals and new accounts dynamically. Thank you!"</p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Technical Specs & Ingestion */}
        <div className={`p-8 rounded-2xl border space-y-6 ${
          isDark ? 'border-gray-800 bg-[#07080a]' : 'border-gray-200 bg-gray-50 shadow-sm'
        }`}>
          <div className="border-b pb-3 border-gray-200 dark:border-gray-800">
            <h3 className="text-2xl font-bold tracking-tight">3. Live Upstream Data Ingestion Architecture</h3>
            <p className={`text-base mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              How the platform talks to the Questathon API and handles dynamic mid-game drops safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed">
            <div className="space-y-3">
              <h5 className="font-bold text-base flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                Atomic Singleton Local Store & Rate Limiter
              </h5>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                The Questathon simulation backend enforces a strict <strong>1 call per minute rate limit</strong>. 
                Our backend implements an atomic cache (<code className="font-mono text-xs">data/crm_cache.json</code>) with an in-memory 
                cooldown guard (<code className="font-mono text-xs">RATE_LIMIT_INTERVAL_MS = 60000</code>). 
                Rapid UI clicks or multi-user access never trigger HTTP 429 errors.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-base flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-500" />
                Dynamic Account Drop Engine
              </h5>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                If hackathon organizers release an unexpected mid-build account (e.g. Account K, Account H), 
                the <code className="font-mono text-xs">mergeUpstreamAccounts()</code> engine automatically ingests it, 
                builds its Power Map, and surfaces it in the account selector without requiring code modifications or restarts.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-900 to-black text-white">
          <div>
            <h4 className="text-xl font-bold">Ready to inspect the live operation?</h4>
            <p className="text-sm text-gray-300 mt-1">
              Switch to the command center to explore the live telemetry and launch Monday actions.
            </p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition shadow-lg shrink-0"
          >
            Open Live Dashboard →
          </Link>
        </div>

      </main>
    </div>
  );
}

