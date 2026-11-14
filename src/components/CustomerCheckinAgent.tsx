'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  Smartphone, 
  Sparkles, 
  Users, 
  FileText,
  Key,
  RefreshCw,
  PhoneCall,
  Activity,
  ExternalLink,
  Phone,
  Flame,
  Check
} from 'lucide-react';

interface CustomerCheckinAgentProps {
  accounts: Record<AccountId, AccountDetail>;
  selectedAccount: AccountId | 'ALL';
  isDark?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'agent' | 'customer';
  senderName: string;
  text: string;
  timestamp: string;
  flag?: {
    type: 'competitor_risk' | 'hardware_issue' | 'expansion_opportunity' | 'satisfaction_high';
    label: string;
    actionTaken: string;
  };
}

export const CustomerCheckinAgent: React.FC<CustomerCheckinAgentProps> = ({
  accounts,
  selectedAccount,
  isDark = false,
}) => {
  const [activeCustomer, setActiveCustomer] = useState<'A' | 'B' | 'K'>(
    selectedAccount === 'B' ? 'B' : selectedAccount === 'K' ? 'K' : 'A'
  );
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [targetPhone, setTargetPhone] = useState('+919881898129');
  const [fromPhone, setFromPhone] = useState('+17372508034');
  const [callStatus, setCallStatus] = useState<{ sid?: string; status?: string; message?: string } | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [messageStatus, setMessageStatus] = useState<string | null>(null);

  // Pre-configured WhatsApp conversations showing relationship management & check-in
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>({
    A: [
      {
        id: 'msg_1',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Hi Inspector Karen Mbeki, weekly check-in from FlytBase! We monitored your 35 docks across the 4 constabularies. 142 automated sorties completed with 99.8% uptime. How are you and the officers feeling ahead of the Dec 5 public event?',
        timestamp: '14 Nov 2026, 08:30 AM',
      },
      {
        id: 'msg_2',
        sender: 'customer',
        senderName: 'Inspector Karen Mbeki (Tactical Air Support)',
        text: 'Morning! Overall good, but our night patrol team on Westmere mentioned dock 4 took 3 minutes to acquire satellite lock yesterday. We really cannot afford delays during Friday\'s tactical operation. Also, our procurement team was asking why we shouldn\'t test cheaper standalone drones.',
        timestamp: '14 Nov 2026, 08:34 AM',
        flag: {
          type: 'competitor_risk',
          label: 'Hardware Check + Competitor Inquiry Detected',
          actionTaken: 'Triggered RTK satellite re-calibration + sent BVLOS ground-pilot labor savings analysis.',
        },
      },
      {
        id: 'msg_3',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Understood immediately, Inspector. Two things done: 1) We ran remote diagnostic on Westmere dock 4—it was an ionospheric delay, and we have pushed a firmware satellite recalibration (signal lock is now nominal 100%). 2) Regarding standalone drones: standalone drones legally require a full-time human pilot on-site per mission ($120k/yr labor). FlytBase autonomous docks operate with zero human pilot overhead. I have sent the full comparison report to your email!',
        timestamp: '14 Nov 2026, 08:36 AM',
      },
      {
        id: 'msg_4',
        sender: 'customer',
        senderName: 'Inspector Karen Mbeki (Tactical Air Support)',
        text: 'That recalibration was lightning fast. And that pilot labor comparison is exactly what I need for our meeting with Derek Finch. Thank you for staying on top of this proactively!',
        timestamp: '14 Nov 2026, 08:38 AM',
        flag: {
          type: 'satisfaction_high',
          label: 'Customer Trust Secured (85% Score)',
          actionTaken: 'Logged positive customer satisfaction score in CRM field notes.',
        },
      },
    ],
    B: [
      {
        id: 'msg_5',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Hi Nadia, automated health check-in from FlytBase. Your 14 chemical refinery docks conducted 84 automated perimeter patrols this week. How are things at Stallingborough and Saltend?',
        timestamp: '14 Nov 2026, 09:15 AM',
      },
      {
        id: 'msg_6',
        sender: 'customer',
        senderName: 'Nadia Rahman (VP Operations)',
        text: 'Hi. We are facing pressure from plant managers who are questioning corporate security charges. If I cannot show them hard ROI before our executive safety review, they want to scale back the contract.',
        timestamp: '14 Nov 2026, 09:20 AM',
        flag: {
          type: 'competitor_risk',
          label: 'Contract Scale-Back Risk Detected',
          actionTaken: 'Generated and delivered per-plant Scaffolding Inspection ROI Summary.',
        },
      },
      {
        id: 'msg_7',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Understood Nadia. We anticipated this and pulled your per-plant data: automated thermal drone scans saved $80,000 in manual scaffolding inspections at Stallingborough alone this quarter, and zero safety incidents occurred. I have generated a 1-page executive PDF and sent it directly to your WhatsApp.',
        timestamp: '14 Nov 2026, 09:22 AM',
      },
      {
        id: 'msg_8',
        sender: 'customer',
        senderName: 'Nadia Rahman (VP Operations)',
        text: 'This 1-page summary is brilliant. Showing $80k saved completely stops the plant managers\' complaints. I am forwarding this to the Safety Board right now. Renewal is safe.',
        timestamp: '14 Nov 2026, 09:25 AM',
        flag: {
          type: 'satisfaction_high',
          label: 'Renewal Risk Neutralized ($168k Saved)',
          actionTaken: 'Customer confirmed contract renewal is protected.',
        },
      },
    ],
    K: [
      {
        id: 'msg_k1',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Hi Dana Whitfield, automated check-in from FlytBase CSM! We noticed your North Entrance DiaB unit was wired, but 0 test flights have been logged yet. How are you and the residents board feeling ahead of Monday\'s security budget meeting?',
        timestamp: '14 Nov 2026, 10:00 AM',
      },
      {
        id: 'msg_k2',
        sender: 'customer',
        senderName: 'Dana Whitfield (Estate Manager, Kestrel Estates)',
        text: 'Hi! We\'re nervous because our local installer vanished and won\'t answer calls! Also, Lucy Pratt our insurance broker said if we fly without declaring aerial equipment our property policy is void. Plus Graham Okafor says the residents are asking why they paid for an idle drone. What should we do?!',
        timestamp: '14 Nov 2026, 10:05 AM',
        flag: {
          type: 'hardware_issue',
          label: 'Missing Installer + Insurance Declaration Compliance Threat',
          actionTaken: 'Dispatched FlytBase field engineer + prepared Lucy Pratt insurance rider + pilot course schedule.',
        },
      },
      {
        id: 'msg_k3',
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: 'Dana, take a deep breath—we have completely resolved this: 1) We dispatched a FlytBase certified field engineer for Saturday morning to replace the missing installer and complete the North Gate flight commissioning. 2) We generated the official CAA-compliant aerial equipment declaration rider for Lucy Pratt. 3) We reserved 2 seats for estate staff in our certified drone pilot training course ($4,000) so you operate 100% legally. I have emailed the full board packet to you and Graham!',
        timestamp: '14 Nov 2026, 10:08 AM',
      },
      {
        id: 'msg_k4',
        sender: 'customer',
        senderName: 'Dana Whitfield (Estate Manager, Kestrel Estates)',
        text: 'You just saved our entire security project! I forwarded the insurance rider to Lucy and Graham is putting the pilot training on the board agenda right now. Thank you for being so proactive!',
        timestamp: '14 Nov 2026, 10:12 AM',
        flag: {
          type: 'satisfaction_high',
          label: 'Surprise Account Drop Saved ($28k Retained)',
          actionTaken: 'Secured board renewal sponsorship and cleared path for South Gate dock expansion.',
        },
      },
    ],
  });

  const activeChat = chats[activeCustomer] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'customer',
      senderName: activeCustomer === 'A' 
        ? 'Inspector Karen Mbeki' 
        : activeCustomer === 'B' 
          ? 'Nadia Rahman' 
          : 'Dana Whitfield',
      text: inputText.trim(),
      timestamp: 'Just now',
    };

    setChats(prev => ({
      ...prev,
      [activeCustomer]: [...(prev[activeCustomer] || []), userMsg]
    }));

    setInputText('');
    setIsSending(true);

    setTimeout(() => {
      let agentReplyText = 'Thank you for following up. Our FlytBase CSM team is actively coordinating this and has logged the status in your operations portal.';
      let replyFlag: ChatMessage['flag'];

      const lower = userMsg.text.toLowerCase();
      if (lower.includes('cheaper') || lower.includes('competitor') || lower.includes('alternative') || lower.includes('cancel')) {
        agentReplyText = 'Understood. Before considering manual alternatives: manual drone operations legally require a dedicated on-site pilot per sortie ($120k/yr salary). FlytBase autonomous docks operate with zero on-site pilot overhead. Let me prepare a comprehensive Total Cost of Ownership report for you.';
        replyFlag = {
          type: 'competitor_risk',
          label: 'Competitor / Cost Inquiry Detected',
          actionTaken: 'Auto-dispatched Total Cost of Ownership comparison vs manual drone piloting.',
        };
      } else if (lower.includes('glitch') || lower.includes('fail') || lower.includes('battery') || lower.includes('lock') || lower.includes('satellite') || lower.includes('installer')) {
        agentReplyText = 'We detected your hardware concern. A remote RTK telemetry scan has been initiated and a certified FlytBase hardware technician has been assigned to inspect and recalibrate the system immediately.';
        replyFlag = {
          type: 'hardware_issue',
          label: 'Hardware Anomaly Logged',
          actionTaken: 'Solution Engineering watchdog alerted for pre-emptive firmware & sensor calibration.',
        };
      }

      const agentReply: ChatMessage = {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: agentReplyText,
        timestamp: 'Just now',
        flag: replyFlag,
      };

      setChats(prev => ({
        ...prev,
        [activeCustomer]: [...(prev[activeCustomer] || []), agentReply]
      }));
      setIsSending(false);
    }, 1200);
  };

  const handleTriggerRealCall = async () => {
    setIsCalling(true);
    setCallStatus(null);
    try {
      const res = await fetch('/api/twilio/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: targetPhone,
          from: fromPhone,
          stakeholder: activeCustomer === 'A' ? 'Insp. Karen Mbeki' : activeCustomer === 'B' ? 'Nadia Rahman' : 'Dana Whitfield',
        }),
      });
      const data = await res.json();
      setCallStatus(data);
    } catch (err: any) {
      setCallStatus({ message: err.message || 'Call failed' });
    } finally {
      setIsCalling(false);
    }
  };

  const handleZeroKeyWhatsApp = () => {
    const cleanNum = targetPhone.replace(/\D/g, '');
    const currentBriefText = activeCustomer === 'A'
      ? "Hi Inspector Karen Mbeki, FlytBase CSM check-in: All 35 docks are nominal with 142 sorties verified. Standby engineering confirmed for 5 Dec."
      : activeCustomer === 'B'
        ? "Hi Nadia Rahman, FlytBase CSM check-in: 14 industrial docks nominal. Scaffolding inspection ROI summary ready for your board review."
        : "Hi Dana Whitfield, FlytBase CSM check-in: North Gate commissioning scheduled and insurance declaration rider ready for Lucy Pratt.";

    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(currentBriefText)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Explaining the Agent's Purpose */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                WhatsApp Customer Relationship & Routine Check-in Agent
              </h3>
            </div>
            <p className={`text-xs font-medium max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              An autonomous AI agent that proactively checks in on the drones and docks you sold. 
              It asks how operations are going, catches technical or competitor doubts early, and automatically delivers value and solutions before small issues become contract cancellations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerRealCall}
              disabled={isCalling}
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              <PhoneCall className={`w-4 h-4 ${isCalling ? 'animate-spin' : ''}`} />
              <span>{isCalling ? 'Dialing Twilio...' : 'Dispatch Live Call (Twilio)'}</span>
            </button>
            <button
              onClick={handleZeroKeyWhatsApp}
              className="px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Smartphone className="w-4 h-4" />
              <span>Open in WhatsApp (Zero-Key Test)</span>
            </button>
          </div>
        </div>

        {/* Live Call Alert / Status Feedback */}
        {callStatus && (
          <div className="mt-4 p-3 rounded-xl border border-blue-400 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>
                <strong>Twilio Voice Call Status:</strong> {callStatus.message || callStatus.status || 'Dispatched'} 
                {callStatus.sid && <code className="ml-2 px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 font-mono text-[11px]">{callStatus.sid}</code>}
              </span>
            </div>
            <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300">Target: {targetPhone}</span>
          </div>
        )}

        {/* Customer Selector Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="text-gray-500 mr-1">Active Customer Chat:</span>
            <button
              onClick={() => setActiveCustomer('A')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                activeCustomer === 'A'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'border-gray-800 text-gray-300' : 'border-gray-300 text-black'
              }`}
            >
              Account A (Police • Karen Mbeki)
            </button>
            <button
              onClick={() => setActiveCustomer('B')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                activeCustomer === 'B'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'border-gray-800 text-gray-300' : 'border-gray-300 text-black'
              }`}
            >
              Account B (Industrial • Nadia Rahman)
            </button>
            <button
              onClick={() => setActiveCustomer('K')}
              className={`px-3 py-1.5 rounded-lg border transition flex items-center gap-1.5 ${
                activeCustomer === 'K'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'border-gray-800 text-amber-400' : 'border-gray-300 text-amber-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Account K (Kestrel Estates • Dana Whitfield)</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="text-gray-500">Twilio From: <code className="font-mono text-black dark:text-white">{fromPhone}</code></span>
            <span className="text-gray-500">To: <code className="font-mono text-black dark:text-white">{targetPhone}</code></span>
          </div>
        </div>
      </div>

      {/* Main Split View: WhatsApp Chat Stream (Left 7) & Customer Intent / Value Diagnostics (Right 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Interactive WhatsApp Device Mockup (7 Cols) */}
        <div className={`lg:col-span-7 rounded-2xl border flex flex-col overflow-hidden shadow-md ${
          isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-300 bg-white'
        }`}>
          {/* WhatsApp Chat Header */}
          <div className={`p-4 border-b flex items-center justify-between ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-emerald-600 text-white'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                {activeCustomer === 'A' ? 'KM' : activeCustomer === 'B' ? 'NR' : 'DW'}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">
                  {activeCustomer === 'A' 
                    ? 'Inspector Karen Mbeki' 
                    : activeCustomer === 'B' 
                      ? 'Nadia Rahman (VP Operations)' 
                      : 'Dana Whitfield (Estate Manager)'}
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online • WhatsApp Business Verified</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleZeroKeyWhatsApp}
                title="Open direct WhatsApp conversation on phone or web"
                className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition flex items-center gap-1 text-xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>wa.me Link</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className={`p-4 space-y-4 min-h-[380px] max-h-[500px] overflow-y-auto ${
            isDark ? 'bg-[#090b0e]' : 'bg-[#e5ddd5]/30'
          }`}>
            {activeChat.map((msg) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm space-y-1.5 ${
                    isAgent
                      ? isDark
                        ? 'bg-[#181c24] text-gray-100 rounded-tl-sm border border-gray-800'
                        : 'bg-white text-black rounded-tl-sm border border-gray-200'
                      : isDark
                        ? 'bg-emerald-900/60 text-white rounded-tr-sm border border-emerald-700/50'
                        : 'bg-[#d9fdd3] text-black rounded-tr-sm border border-emerald-300'
                  }`}>
                    <div className="flex items-center justify-between gap-4 text-[10px] font-bold opacity-75">
                      <span>{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="text-xs leading-relaxed font-sans">{msg.text}</p>

                    {/* Intent / Value Flag Pill */}
                    {msg.flag && (
                      <div className={`mt-2 pt-2 border-t text-[11px] font-sans ${
                        isDark ? 'border-gray-700/60' : 'border-gray-300'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300 mb-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>{msg.flag.label}</span>
                        </div>
                        <p className="text-[10px] text-gray-600 dark:text-gray-300">
                          <strong>Automated Action:</strong> {msg.flag.actionTaken}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Reply Form */}
          <form
            onSubmit={handleSendMessage}
            className={`p-3 border-t flex items-center gap-2 ${
              isDark ? 'border-gray-800 bg-[#0c0e12]' : 'border-gray-200 bg-white'
            }`}
          >
            <input
              type="text"
              placeholder={`Simulate customer reply (e.g. "We are looking at cheaper options" or "Installer never tested flight")...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className={`flex-1 p-2.5 rounded-xl text-xs border font-medium outline-none ${
                isDark 
                  ? 'border-gray-700 bg-black text-white focus:border-gray-500' 
                  : 'border-gray-300 bg-gray-50 text-black focus:border-gray-500'
              }`}
            />
            <button
              type="submit"
              disabled={isSending || !inputText.trim()}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right: How This Delivers Value to the Customer (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <h4 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>How This Proactive Check-in Protects the Relationship:</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className={`p-3 rounded-xl border ${
                isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
              }`}>
                <strong className="block text-black dark:text-white font-bold mb-0.5">
                  1. Catches Competitor & Cancellation Threats Instantly
                </strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  When the customer mentions testing standalone drones, the agent does not panic. It immediately shows that manual pilots cost $120k/yr, proving FlytBase's superior ROI.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
              }`}>
                <strong className="block text-black dark:text-white font-bold mb-0.5">
                  2. Resolves Hardware Friction in Real-Time
                </strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  When Karen noted a 3-minute delay on dock 4, the agent remotely recalibrated satellite sync within minutes, saving her Friday tactical mission.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-200 bg-gray-50'
              }`}>
                <strong className="block text-black dark:text-white font-bold mb-0.5">
                  3. Solves Kestrel Estates Surprise Account Drop
                </strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  When Dana Whitfield panics over a vanished installer and undeclared insurance, the agent delivers a certified field engineer, CAA insurance rider, and pilot training before the Monday board vote.
                </p>
              </div>
            </div>
          </div>

          {/* Twilio & WhatsApp Active Credentials Box */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-500" />
                <h4 className="font-bold text-sm text-black dark:text-white">
                  Live Twilio & WhatsApp Gateway Status
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-400">
                ACTIVE
              </span>
            </div>

            <div className="space-y-1.5 text-xs font-mono">
              <div className={`p-2.5 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Twilio Account SID</span>
                  <span className="text-emerald-600 font-sans text-[11px] font-bold">Connected</span>
                </div>
                <code className="text-[11px] text-gray-500">ACad2febb745cbcbc6d3c2bedec1a67fea</code>
              </div>

              <div className={`p-2.5 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Outbound Voice / SMS Number</span>
                  <span className="text-emerald-600 font-sans text-[11px] font-bold">Verified</span>
                </div>
                <code className="text-[11px] text-gray-500">+17372508034 &rarr; +919881898129</code>
              </div>

              <div className={`p-2.5 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <div className="flex items-center justify-between">
                  <span className="font-bold">Zero-Key Testing (wa.me)</span>
                  <span className="text-emerald-600 font-sans text-[11px] font-bold">Universal Ready</span>
                </div>
                <span className="text-[10px] text-gray-500 font-sans block">
                  Click-to-chat links connect directly to any test number on mobile and web with zero API key requirement!
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
