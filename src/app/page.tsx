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
import { 
  Flame, 
  DollarSign, 
  Crown, 
  ShieldAlert, 
  HelpCircle, 
  FileText,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function CRMPage() {
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

  // Initial Load
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
    setNoteDefaultText(`Action on Blind Spot: ${spot.question}\nTarget: ${spot.whoCouldAnswer}\nContext: ${spot.suggestedAsk}`);
    setIsNoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-slate-100">
      {/* Top Header */}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Executive Summary Cards */}
        <ExecutiveSummary
          accounts={data.accounts}
          selectedAccount={selectedAccount}
        />

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('actions')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'actions'
                ? 'border-amber-500 text-amber-400 bg-amber-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-500" />
            <span>1. Monday 9am List (Q3)</span>
          </button>

          <button
            onClick={() => setActiveTab('book')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'book'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>2. Book with Receipts (Q1)</span>
          </button>

          <button
            onClick={() => setActiveTab('power')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'power'
                ? 'border-purple-500 text-purple-400 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-4 h-4 text-purple-400" />
            <span>3. Power Map (Q2)</span>
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'risks'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>4. Risk Radar (Q4)</span>
          </button>

          <button
            onClick={() => setActiveTab('blindspots')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'blindspots'
                ? 'border-purple-400 text-purple-300 bg-purple-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-purple-300" />
            <span>5. Blind-Spot Finder (Q5)</span>
          </button>

          <button
            onClick={() => setActiveTab('paperwork')}
            className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
              activeTab === 'paperwork'
                ? 'border-sky-500 text-sky-400 bg-sky-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Data Room / Citations</span>
          </button>
        </div>

        {/* Dynamic Content Views */}
        <div className="grid lg:grid-cols-4 gap-6">
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
          <div className="space-y-4">
            <LiveSignalsPanel
              signals={data.signals}
              selectedAccount={selectedAccount}
            />

            {/* Notes & Activity Stream */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
                  <span>CSM Notes Log ({data.notes.length})</span>
                </div>
                <button
                  onClick={() => {
                    setNoteDefaultText('');
                    setIsNoteModalOpen(true);
                  }}
                  className="text-[10px] text-sky-400 hover:text-sky-300 font-medium"
                >
                  + Add
                </button>
              </div>

              {data.notes.length === 0 ? (
                <p className="text-xs text-slate-500 py-2">No notes recorded yet.</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {data.notes.map((n) => (
                    <div key={n.id} className="bg-slate-950 p-2.5 rounded border border-slate-800 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span className="font-semibold text-slate-200">{n.title || n.kind}</span>
                        <span className="font-mono text-sky-400">Acc {n.account}</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* Note Creation Modal */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onNoteAdded={() => fetchData(false)}
        defaultAccount={selectedAccount === 'ALL' ? 'A' : selectedAccount}
        defaultText={noteDefaultText}
      />

      {/* Monday Executive Brief Modal */}
      <MondayBriefModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        accounts={data.accounts}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        FlytBase Customer Success Intelligence System • Autonomous Drone-in-a-Box Operational CRM • Questathon 2026
      </footer>
    </div>
  );
}
