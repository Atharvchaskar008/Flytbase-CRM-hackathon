'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AccountId, CRMStoreData, BlindSpot, Note } from '@/types/crm';
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
import { AnalyticsInfographics } from '@/components/AnalyticsInfographics';
import { SharedNoteArena } from '@/components/SharedNoteArena';
import { IntegrationsHub } from '@/components/IntegrationsHub';
import { DealVault } from '@/components/DealVault';
import { CustomerCheckinAgent } from '@/components/CustomerCheckinAgent';
import { CallTranscriptFlags } from '@/components/CallTranscriptFlags';
import { PreMeetingBriefOnePager } from '@/components/PreMeetingBriefOnePager';
import { SilentDropRadar } from '@/components/SilentDropRadar';
import { CFOProofOfValuePacket } from '@/components/CFOProofOfValuePacket';
import { AllAccountsOverviewGrid } from '@/components/AllAccountsOverviewGrid';
import { DroneUsageAnalyticsChart } from '@/components/DroneUsageAnalyticsChart';
import { initialCRMData } from '@/lib/mockData';
import { AutonomousCSMAgentNetwork, AgentInsight } from '@/lib/agents';
import { 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  BarChart3, 
  CheckSquare, 
  ShieldCheck, 
  Users, 
  AlertTriangle, 
  HelpCircle, 
  Bot, 
  FileEdit, 
  FileText, 
  Sliders,
  Menu,
  X,
  BrainCircuit,
  MessageSquare,
  PhoneCall,
  Clock,
  TrendingDown,
  DollarSign,
  Layers,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const [data, setData] = useState<CRMStoreData>(initialCRMData);
  const [selectedAccount, setSelectedAccount] = useState<AccountId | 'ALL'>('ALL');
  const [activeTab, setActiveTab] = useState<
    'overview' | 'actions' | 'book' | 'dealvault' | 'brief' | 'droneusage' | 'checkin' | 'transcripts' | 'silentdrop' | 'power' | 'risks' | 'blindspots' | 'cfopacket' | 'agents' | 'notes' | 'infographics' | 'paperwork' | 'integrations'
  >('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Crisp white default!
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [highlightedFile, setHighlightedFile] = useState<string | null>(null);
  const [agentInsights, setAgentInsights] = useState<AgentInsight[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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

  // Sync dark class with document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

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

  const handleAddDirectNote = async (newNote: { account: AccountId; kind: string; title: string; text: string }) => {
    try {
      await fetch('/api/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(newNote),
      });
      fetchData(false);
    } catch (err) {
      console.error('Failed to post direct note:', err);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navGroups = [
    {
      group: 'Executive Cockpit',
      items: [
        { id: 'overview', label: '1. Portfolio Overview (All 4)', icon: Layers, desc: 'Live fleet dashboard', badge: 'All 4' },
        { id: 'actions', label: '2. Monday Priority Queue', icon: CheckSquare, desc: 'Ranked tasks', badge: 'High ROI' },
        { id: 'brief', label: '3. 60-Sec Pre-Meeting Brief', icon: Clock, desc: '1-pager before calling', badge: 'Fast' },
        { id: 'droneusage', label: '4. Drone Usage & Velocity', icon: BarChart3, desc: 'Column bar graph & sorties', badge: 'Graph' },
        { id: 'book', label: '5. Contracts & Receipts', icon: ShieldCheck, desc: '$698k verified ARR', badge: 'Audit' },
      ]
    },
    {
      group: 'Churn & Flight Radar',
      items: [
        { id: 'silentdrop', label: '6. Silent Drop Radar (>20%)', icon: TrendingDown, desc: 'Flight velocity churn alerts', badge: 'Alert' },
        { id: 'transcripts', label: '7. Dialogue & Competitor Flags', icon: PhoneCall, desc: 'MCP dialogue & flags', badge: 'Flags' },
        { id: 'risks', label: '8. Problems & Deadlines Radar', icon: AlertTriangle, desc: 'Risk countdowns' },
        { id: 'blindspots', label: '9. Questions to Ask (Blindspots)', icon: HelpCircle, desc: 'Unknown info' },
      ]
    },
    {
      group: 'Stakeholders & Money',
      items: [
        { id: 'power', label: '10. Who Makes Decisions', icon: Users, desc: 'Key deciders' },
        { id: 'dealvault', label: '11. Deal Vault & Intelligence', icon: DollarSign, desc: 'Tactical dossiers', badge: '$698k' },
        { id: 'checkin', label: '12. WhatsApp & Twilio Phone', icon: MessageSquare, desc: 'Proactive relationship agent', badge: 'Live AI' },
        { id: 'cfopacket', label: '13. CFO Proof of Value (PDF)', icon: FileText, desc: 'Monthly 28th value packet', badge: '28th Auto' },
      ]
    },
    {
      group: 'Intelligence & Data Room',
      items: [
        { id: 'agents', label: '14. Autonomous CSM Swarm', icon: Bot, desc: 'Smart swarm', badge: 'Active' },
        { id: 'paperwork', label: '15. Official Contract Data Room', icon: FileText, desc: 'Data Room proofs' },
        { id: 'notes', label: '16. Shared Whiteboard Arena', icon: FileEdit, desc: 'Team whiteboard', badge: 'New' },
        { id: 'integrations', label: '17. Telemetry & Hardware Hub', icon: Sliders, desc: 'Telemetry & APIs' },
      ]
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      isDark ? 'bg-black text-gray-100' : 'bg-white text-black'
    }`}>
      {/* Header with 3-Lines Toggle */}
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
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Container with Collapsible Sidebar + Operations Area */}
      <div className="flex-1 max-w-[1550px] w-full mx-auto flex flex-col md:flex-row items-stretch p-3 md:p-5 gap-5">
        
        {/* Sleek Vertical Sidebar Navigation (Opens/Closes via 3 lines button) */}
        {isSidebarOpen && (
          <aside className={`w-full md:w-64 lg:w-72 shrink-0 rounded-2xl border p-4 space-y-4 flex flex-col justify-between transition-all ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Menu className="w-3.5 h-3.5 text-blue-500" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Navigation
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  title="Close sidebar"
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-black dark:hover:text-white transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-3">
                {navGroups.map((grp) => (
                  <div key={grp.group} className="space-y-1">
                    <div className={`px-2 text-[10px] font-bold uppercase tracking-wider ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {grp.group}
                    </div>

                    {grp.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id as any)}
                          className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between group ${
                            isActive
                              ? isDark 
                                ? 'bg-white text-black font-bold shadow-sm' 
                                : 'bg-black text-white font-bold shadow-md'
                              : isDark 
                                ? 'hover:bg-gray-900 text-gray-300 hover:text-white' 
                                : 'hover:bg-gray-100 text-black'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${
                              isActive 
                                ? isDark ? 'text-black' : 'text-white' 
                                : isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-700 group-hover:text-black'
                            }`} />
                            <div className="text-xs truncate">{item.label}</div>
                          </div>

                          {item.badge && (
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase shrink-0 ${
                              isActive
                                ? isDark ? 'bg-black text-white' : 'bg-white text-black'
                                : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>

            {/* Quick Guide Link in Sidebar Bottom */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-800 space-y-2">
              <Link
                href="/guide"
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition ${
                  isDark ? 'border-gray-800 bg-[#12151b] hover:bg-gray-800 text-white' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>Platform Guide & Architecture</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        )}

        {/* Main Canvas Area */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {/* All Accounts Grid + Executive Summary: ONLY visible on Portfolio Overview tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <AllAccountsOverviewGrid
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                onSelectAccount={setSelectedAccount}
                isDark={isDark}
              />

              <ExecutiveSummary
                accounts={data.accounts}
                selectedAccount={selectedAccount}
                isDark={isDark}
              />
            </div>
          )}

          {/* Active Page View Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Primary Content View (8 or 9 Cols) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {activeTab === 'overview' && (
                <NextBestActions
                  accounts={data.accounts}
                  selectedAccount={selectedAccount}
                  onSelectCitation={handleCitationClick}
                  onOpenDetail={handleOpenDetail}
                  isDark={isDark}
                />
              )}

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

              {activeTab === 'dealvault' && (
                <DealVault
                  accounts={data.accounts}
                  selectedAccount={selectedAccount}
                  onSelectCitation={handleCitationClick}
                  isDark={isDark}
                />
              )}

              {activeTab === 'brief' && (
                <PreMeetingBriefOnePager
                  selectedAccount={selectedAccount}
                  isDark={isDark}
                />
              )}

              {activeTab === 'droneusage' && (
                <DroneUsageAnalyticsChart
                  selectedAccount={selectedAccount}
                  isDark={isDark}
                />
              )}

              {activeTab === 'checkin' && (
                <CustomerCheckinAgent
                  accounts={data.accounts}
                  selectedAccount={selectedAccount}
                  isDark={isDark}
                />
              )}

              {activeTab === 'transcripts' && (
                <CallTranscriptFlags
                  selectedAccount={selectedAccount}
                  isDark={isDark}
                />
              )}

              {activeTab === 'silentdrop' && (
                <SilentDropRadar
                  selectedAccount={selectedAccount}
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

              {activeTab === 'cfopacket' && (
                <CFOProofOfValuePacket
                  selectedAccount={selectedAccount}
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

              {activeTab === 'notes' && (
                <SharedNoteArena
                  notes={data.notes}
                  selectedAccount={selectedAccount}
                  onAddNote={handleAddDirectNote}
                  isDark={isDark}
                />
              )}

              {activeTab === 'infographics' && (
                <AnalyticsInfographics
                  accounts={data.accounts}
                  selectedAccount={selectedAccount}
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

              {activeTab === 'integrations' && (
                <IntegrationsHub
                  isDark={isDark}
                />
              )}
            </div>

            {/* Right Rail: Real-Time Signals & Fast Notes (4 or 3 Cols) */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-4">
              <LiveSignalsPanel
                signals={data.signals}
                selectedAccount={selectedAccount}
                isDark={isDark}
              />

              {/* Fast Team Notes Log */}
              <div className={`border p-4 rounded-xl space-y-3 ${
                isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
              }`}>
                <div className={`flex items-center justify-between border-b pb-2 text-xs ${
                  isDark ? 'border-gray-800' : 'border-gray-200'
                }`}>
                  <span className={`font-bold tracking-tight text-sm ${isDark ? 'text-white' : 'text-black'}`}>
                    Recent Field Notes ({data.notes.length})
                  </span>
                  <button
                    onClick={() => {
                      setNoteDefaultText('');
                      setIsNoteModalOpen(true);
                    }}
                    className={`text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline`}
                  >
                    + Add
                  </button>
                </div>

                {data.notes.length === 0 ? (
                  <p className={`text-xs py-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                    No notes recorded yet.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {data.notes.map((n) => (
                      <div key={n.id} className={`p-2.5 rounded-lg border text-xs ${
                        isDark ? 'bg-black border-gray-800' : 'bg-gray-50 border-gray-300'
                      }`}>
                        <div className={`flex items-center justify-between text-[11px] mb-1 font-semibold ${
                          isDark ? 'text-gray-400' : 'text-gray-700'
                        }`}>
                          <span className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                            {n.title || n.kind}
                          </span>
                          <span>Account {n.account}</span>
                        </div>
                        <p className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

        </main>
      </div>

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
      <footer className={`border-t py-4 px-6 text-center text-xs font-semibold ${
        isDark ? 'border-gray-800 bg-black text-gray-500' : 'border-gray-300 bg-white text-gray-700'
      }`}>
        FlytBase Autonomous Drone-in-a-Box Customer Success Platform • Questathon 2026
      </footer>
    </div>
  );
}
