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
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [highlightedFile, setHighlightedFile] = useState<string | null>(null);

  // Modals
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [noteDefaultText, setNoteDefaultText] = useState('');

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

  return (
    <div className="min-h-screen bg-black flex flex-col text-[#ededed] antialiased selection:bg-white selection:text-black">
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
      />

      {/* Main Dashboard (No landing page) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-3 md:p-5 space-y-4">
        
        {/* Executive Metric Cards */}
        <ExecutiveSummary
          accounts={data.accounts}
          selectedAccount={selectedAccount}
        />

        {/* Minimal Monochrome Tab Bar */}
        <div className="flex border-b border-[#1c2026] overflow-x-auto gap-1 text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'actions'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            1. Actions (Q3)
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'book'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            2. Receipts (Q1)
          </button>

          <button
            onClick={() => setActiveTab('power')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'power'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            3. Power Map (Q2)
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'risks'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            4. Risk Radar (Q4)
          </button>

          <button
            onClick={() => setActiveTab('blindspots')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'blindspots'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            5. Blind Spots (Q5)
          </button>

          <button
            onClick={() => setActiveTab('paperwork')}
            className={`py-2 px-3 border-b-2 transition whitespace-nowrap ${
              activeTab === 'paperwork'
                ? 'border-white text-white font-bold bg-[#0c0d10]'
                : 'border-transparent text-[#777] hover:text-white'
            }`}
          >
            Data Room
          </button>
        </div>

        {/* Dynamic Content Views */}
        <div className="grid lg:grid-cols-4 gap-4 items-start">
          <div className="lg:col-span-3">
            {activeTab === 'actions' && (
              <NextBestActions
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
              />
            )}

            {activeTab === 'book' && (
              <BookWithReceipts
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectCitation={handleCitationClick}
              />
            )}

            {activeTab === 'power' && (
              <PowerMap
                accounts={data.accounts}
                selectedAccount={selectedAccount}
              />
            )}

            {activeTab === 'risks' && (
              <RiskRadar
                accounts={data.accounts}
                selectedAccount={selectedAccount}
              />
            )}

            {activeTab === 'blindspots' && (
              <BlindSpotFinder
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onDraftQuestion={handleDraftQuestion}
              />
            )}

            {activeTab === 'paperwork' && (
              <PaperworkRoom
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                highlightedFileId={highlightedFile}
              />
            )}
          </div>

          {/* Right Rail: Live Feed & Notes */}
          <div className="space-y-3 font-mono">
            <LiveSignalsPanel
              signals={data.signals}
              selectedAccount={selectedAccount}
            />

            {/* Notes & Activity Stream */}
            <div className="border border-[#1c2026] bg-[#07080a] p-3 rounded space-y-2">
              <div className="flex items-center justify-between border-b border-[#181a1f] pb-2 text-[11px]">
                <span className="text-white font-bold uppercase tracking-wider">
                  Notes Log ({data.notes.length})
                </span>
                <button
                  onClick={() => {
                    setNoteDefaultText('');
                    setIsNoteModalOpen(true);
                  }}
                  className="text-[10px] text-white hover:underline uppercase"
                >
                  + Add
                </button>
              </div>

              {data.notes.length === 0 ? (
                <p className="text-[11px] text-[#666] py-2">No notes recorded.</p>
              ) : (
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {data.notes.map((n) => (
                    <div key={n.id} className="bg-black p-2 rounded border border-[#1a1d24] text-[11px]">
                      <div className="flex items-center justify-between text-[10px] text-[#666] mb-0.5">
                        <span className="font-semibold text-white">{n.title || n.kind}</span>
                        <span>Acc {n.account}</span>
                      </div>
                      <p className="text-[#999] font-sans text-xs">{n.text}</p>
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
      />

      {/* Monday Brief Modal */}
      <MondayBriefModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        accounts={data.accounts}
      />

      {/* Footer */}
      <footer className="border-t border-[#16181d] py-3 px-6 text-center text-[10px] font-mono text-[#555] uppercase tracking-wider">
        FLYTBASE // DiaB Customer Success System // Questathon 2026
      </footer>
    </div>
  );
}
