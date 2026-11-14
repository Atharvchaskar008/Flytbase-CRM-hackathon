'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccountId, CRMStoreData, BlindSpot } from '@/types/crm';
import { Header } from '@/components/Header';
import { ExecutiveSummary } from '@/components/ExecutiveSummary';
import { NextBestActions } from '@/components/NextBestActions';
import { BookWithReceipts } from '@/components/BookWithReceipts';
import { PowerMap } from '@/components/PowerMap';
import { RiskRadar } from '@/components/RiskRadar';
import { BlindSpotFinder } from '@/components/BlindSpotFinder';
import { PaperworkRoom } from '@/components/PaperworkRoom';
import { LiveSignalsPanel } from '@/components/LiveSignalsPanel';
import { NoteModal } from '@/components/NoteModal';
import { MondayBriefModal } from '@/components/MondayBriefModal';
import { AutonomousAgentsView } from '@/components/AutonomousAgentsView';
import { ItemDetailModal, DetailModalData } from '@/components/ItemDetailModal';
import { initialCRMData } from '@/lib/mockData';
import { AutonomousCSMAgentNetwork, AgentInsight } from '@/lib/agents';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<CRMStoreData>(initialCRMData);
  const [selectedAccount, setSelectedAccount] = useState<AccountId | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'actions' | 'book' | 'power' | 'risks' | 'blindspots' | 'agents' | 'paperwork'>('actions');
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Crisp white default!
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [highlightedFile, setHighlightedFile] = useState<string | null>(null);
  const [agentInsights, setAgentInsights] = useState<AgentInsight[]>([]);

  // Detail Modal
  const [detailModalData, setDetailModalData] = useState<DetailModalData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Modals
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [noteDefaultText, setNoteDefaultText] = useState('');

  const isDark = theme === 'dark';

  const fetchData = async (sync = false) => {
    setIsSyncing(true);
    try {
      const res = await fetch(`/api/data${sync ? '?sync=true' : ''}`);
      const json = await res.json();
      if (json.data) {
        setData(json.data);
        const insights = AutonomousCSMAgentNetwork.executeAll(json.data.accounts, json.data.signals);
        setAgentInsights(insights);
      }
      if (json.message) {
        setSyncMessage(json.message);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Initial load + 60s background polling interval
  useEffect(() => {
    fetchData(false);

    const pollTimer = setInterval(() => {
      fetchData(true);
    }, 60000);

    return () => clearInterval(pollTimer);
  }, []);

  const handleCitationClick = (citationId: string) => {
    setHighlightedFile(citationId);
    setActiveTab('paperwork');
  };

  const handleOpenDetail = (modalData: DetailModalData) => {
    setDetailModalData(modalData);
    setIsDetailModalOpen(true);
  };

  const handleDraftQuestion = (spot: BlindSpot) => {
    setNoteDefaultText(`Blind Spot Action: ${spot.question} -> Ask: ${spot.whoCouldAnswer}`);
    setIsNoteModalOpen(true);
  };

  const handleDeployAgentAction = async (insight: AgentInsight) => {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          account: insight.accountId,
          kind: 'next_step',
          title: `[AGENT DEPLOYED] ${insight.autonomousProposal.actionTitle}`,
          text: `Target: ${insight.autonomousProposal.targetStakeholder} | Proposal: ${insight.autonomousProposal.draftContent}`,
        }),
      });
      fetchData(false);
    } catch (e) {
      console.error('Failed to deploy agent action:', e);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-black text-gray-100' : 'bg-white text-gray-900'
    }`}>
      {/* Header */}
      <Header
        selectedAccount={selectedAccount}
        onSelectAccount={setSelectedAccount}
        onSync={() => fetchData(true)}
        isSyncing={isSyncing}
        lastSyncMessage={syncMessage}
        onOpenNoteModal={() => {
          setNoteDefaultText('');
          setIsNoteModalOpen(true);
        }}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        signalsCount={data.signals.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Dashboard Body */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Executive Metric Cards */}
        <ExecutiveSummary
          accounts={data.accounts}
          selectedAccount={selectedAccount}
          isDark={isDark}
        />

        {/* Platform Guide Shortcut Banner */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-4 rounded-xl border text-xs transition ${
          isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-gray-50/80 shadow-sm'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-sm">Need a full architecture & section breakdown?</span>
              <span className={`block sm:inline sm:ml-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Explore the dedicated platform guide explaining how each pillar protects £588k ARR.
              </span>
            </div>
          </div>
          <Link
            href="/guide"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition shrink-0 self-start sm:self-auto ${
              isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800 shadow-sm'
            }`}
          >
            <span>Read Platform Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tab Navigation Bar */}
        <div className={`flex border-b overflow-x-auto gap-2 text-sm font-medium ${
          isDark ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'actions'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            1. Actions (Q3)
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'book'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            2. Receipts (Q1)
          </button>

          <button
            onClick={() => setActiveTab('power')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'power'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            3. Power Map (Q2)
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'risks'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            4. Risk Radar (Q4)
          </button>

          <button
            onClick={() => setActiveTab('blindspots')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'blindspots'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            5. Blind Spots (Q5)
          </button>

          <button
            onClick={() => setActiveTab('agents')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'agents'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Agents</span>
          </button>

          <button
            onClick={() => setActiveTab('paperwork')}
            className={`py-2.5 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'paperwork'
                ? isDark ? 'border-white text-white font-semibold' : 'border-black text-black font-semibold'
                : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Data Room
          </button>
        </div>

        {/* Dynamic Views Grid */}
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          <div className="lg:col-span-3">
            {activeTab === 'actions' && (
              <NextBestActions
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
                onOpenDetail={handleOpenDetail}
                isDark={isDark}
              />
            )}

            {activeTab === 'book' && (
              <BookWithReceipts
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
                onOpenDetail={handleOpenDetail}
                isDark={isDark}
              />
            )}

            {activeTab === 'power' && (
              <PowerMap
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onOpenDetail={handleOpenDetail}
                isDark={isDark}
              />
            )}

            {activeTab === 'risks' && (
              <RiskRadar
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onOpenDetail={handleOpenDetail}
                isDark={isDark}
              />
            )}

            {activeTab === 'blindspots' && (
              <BlindSpotFinder
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onDraftQuestion={handleDraftQuestion}
                onOpenDetail={handleOpenDetail}
                isDark={isDark}
              />
            )}

            {activeTab === 'agents' && (
              <AutonomousAgentsView
                insights={agentInsights}
                selectedAccount={selectedAccount}
                onDeployAction={handleDeployAgentAction}
                isDark={isDark}
              />
            )}

            {activeTab === 'paperwork' && (
              <PaperworkRoom
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                highlightedFileId={highlightedFile}
                isDark={isDark}
              />
            )}
          </div>

          {/* Right Rail: Signals & Notes */}
          <div className="space-y-4">
            <LiveSignalsPanel
              signals={data.signals}
              selectedAccount={selectedAccount}
              isDark={isDark}
            />

            {/* Notes Log */}
            <div className={`border p-4 rounded-xl space-y-3 ${
              isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 text-xs ${
                isDark ? 'border-gray-800' : 'border-gray-200'
              }`}>
                <span className={`font-bold tracking-tight text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Field Notes ({data.notes.length})
                </span>
                <button
                  onClick={() => {
                    setNoteDefaultText('');
                    setIsNoteModalOpen(true);
                  }}
                  className={`text-xs font-semibold ${
                    isDark ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'
                  }`}
                >
                  + Add Note
                </button>
              </div>

              {data.notes.length === 0 ? (
                <p className={`text-xs py-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  No field notes recorded yet.
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {data.notes.map((n) => (
                    <div key={n.id} className={`p-2.5 rounded-lg border text-xs ${
                      isDark ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`flex items-center justify-between text-[11px] mb-1 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {n.title || n.kind}
                        </span>
                        <span>Account {n.account}</span>
                      </div>
                      <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{n.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* Item Detail Modal */}
      <ItemDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        data={detailModalData}
        theme={theme}
      />

      {/* Note Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNoteAdded={() => fetchData(false)}
        defaultAccount={selectedAccount === 'ALL' ? 'A' : selectedAccount}
        defaultText={noteDefaultText}
        isDark={isDark}
      />

      {/* Monday Brief Modal */}
      <MondayBriefModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        accounts={data.accounts}
        isDark={isDark}
      />

      {/* Clean Footer */}
      <footer className={`border-t py-4 px-6 text-center text-xs text-gray-500 ${
        isDark ? 'border-gray-800 bg-black' : 'border-gray-200 bg-white'
      }`}>
        FlytBase Autonomous DiaB Customer Success Platform • Questathon 2026
      </footer>
    </div>
  );
}
