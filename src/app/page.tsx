'use client';

import React, { useState, useEffect } from 'react';
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
import { initialCRMData } from '@/lib/mockData';

export default function DashboardPage() {
  const [data, setData] = useState<CRMStoreData>(initialCRMData);
  const [selectedAccount, setSelectedAccount] = useState<AccountId | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<'actions' | 'book' | 'power' | 'risks' | 'blindspots' | 'paperwork'>('actions');
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // White background default!
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [highlightedFile, setHighlightedFile] = useState<string | null>(null);

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

  useEffect(() => {
    fetchData(false);
  }, []);

  const handleCitationClick = (citationId: string) => {
    setHighlightedFile(citationId);
    setActiveTab('paperwork');
  };

  const handleDraftQuestion = (spot: BlindSpot) => {
    setNoteDefaultText(`Blind Spot Action: ${spot.question} -> Ask: ${spot.whoCouldAnswer}`);
    setIsNoteModalOpen(true);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-colors ${
      isDark ? 'bg-black text-[#ededed]' : 'bg-white text-gray-900'
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

      {/* Main Dashboard (No landing page) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-3 md:p-5 space-y-4">
        
        {/* Executive Metric Cards */}
        <ExecutiveSummary
          accounts={data.accounts}
          selectedAccount={selectedAccount}
          isDark={isDark}
        />

        {/* Minimal Tab Bar */}
        <div className={`flex border-b overflow-x-auto gap-1 text-xs font-mono uppercase tracking-wider ${
          isDark ? 'border-[#1c2026]' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'actions'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            1. Actions (Q3)
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'book'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            2. Receipts (Q1)
          </button>

          <button
            onClick={() => setActiveTab('power')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'power'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            3. Power Map (Q2)
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'risks'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            4. Risk Radar (Q4)
          </button>

          <button
            onClick={() => setActiveTab('blindspots')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'blindspots'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            5. Blind Spots (Q5)
          </button>

          <button
            onClick={() => setActiveTab('paperwork')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'paperwork'
                ? isDark ? 'border-white text-white font-bold bg-[#0c0d10]' : 'border-black text-black font-bold bg-gray-100'
                : isDark ? 'border-transparent text-[#777] hover:text-white' : 'border-transparent text-gray-500 hover:text-black'
            }`}
          >
            Data Room
          </button>
        </div>

        {/* Dynamic Views */}
        <div className="grid lg:grid-cols-4 gap-4 items-start">
          <div className="lg:col-span-3">
            {activeTab === 'actions' && (
              <NextBestActions
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
                isDark={isDark}
              />
            )}

            {activeTab === 'book' && (
              <BookWithReceipts
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
                isDark={isDark}
              />
            )}

            {activeTab === 'power' && (
              <PowerMap
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                isDark={isDark}
              />
            )}

            {activeTab === 'risks' && (
              <RiskRadar
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                isDark={isDark}
              />
            )}

            {activeTab === 'blindspots' && (
              <BlindSpotFinder
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onDraftQuestion={handleDraftQuestion}
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

          {/* Right Rail */}
          <div className="space-y-3 font-mono">
            <LiveSignalsPanel
              signals={data.signals}
              selectedAccount={selectedAccount}
              isDark={isDark}
            />

            {/* Notes Log */}
            <div className={`border p-3 rounded space-y-2 ${
              isDark ? 'border-[#1c2026] bg-[#07080a]' : 'border-gray-200 bg-white shadow-sm'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 text-[11px] ${
                isDark ? 'border-[#181a1f]' : 'border-gray-200'
              }`}>
                <span className={`font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Notes Log ({data.notes.length})
                </span>
                <button
                  onClick={() => {
                    setNoteDefaultText('');
                    setIsNoteModalOpen(true);
                  }}
                  className={`text-[10px] uppercase font-bold ${
                    isDark ? 'text-white hover:underline' : 'text-gray-900 hover:underline'
                  }`}
                >
                  + Add
                </button>
              </div>

              {data.notes.length === 0 ? (
                <p className={`text-[11px] py-2 ${isDark ? 'text-[#666]' : 'text-gray-400'}`}>No notes recorded.</p>
              ) : (
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {data.notes.map((n) => (
                    <div key={n.id} className={`p-2 rounded border text-[11px] ${
                      isDark ? 'bg-black border-[#1a1d24]' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`flex items-center justify-between text-[10px] mb-0.5 ${
                        isDark ? 'text-[#666]' : 'text-gray-400'
                      }`}>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{n.title || n.kind}</span>
                        <span>Acc {n.account}</span>
                      </div>
                      <p className={`font-sans text-xs ${isDark ? 'text-[#999]' : 'text-gray-600'}`}>{n.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

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

      {/* Footer */}
      <footer className={`border-t py-3 px-6 text-center text-[10px] font-mono uppercase tracking-wider ${
        isDark ? 'border-[#16181d] text-[#555]' : 'border-gray-200 text-gray-400'
      }`}>
        FLYTBASE // DiaB Customer Success System // Questathon 2026
      </footer>
    </div>
  );
}
