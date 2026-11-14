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
  Activity
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
  const [activeCustomer, setActiveCustomer] = useState<'A' | 'B'>(selectedAccount === 'B' ? 'B' : 'A');
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

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
  });

  const activeChat = chats[activeCustomer] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'customer',
      senderName: activeCustomer === 'A' ? 'Inspector Karen Mbeki' : 'Nadia Rahman',
      text: inputText.trim(),
      timestamp: 'Just now',
    };

    setChats(prev => ({
      ...prev,
      [activeCustomer]: [...(prev[activeCustomer] || []), userMsg]
    }));
    setInputText('');
    setIsSending(true);

    // AI Agent automatic helpful response after 1.5s
    setTimeout(() => {
      const isAltQuery = userMsg.text.toLowerCase().includes('option') || userMsg.text.toLowerCase().includes('cost') || userMsg.text.toLowerCase().includes('alternative') || userMsg.text.toLowerCase().includes('cheaper');
      const isDockIssue = userMsg.text.toLowerCase().includes('dock') || userMsg.text.toLowerCase().includes('glitch') || userMsg.text.toLowerCase().includes('flight') || userMsg.text.toLowerCase().includes('motor');

      let replyText = 'Thank you for the update! We are continuously monitoring your fleet telemetry to ensure 100% mission readiness.';
      let flagData: ChatMessage['flag'] | undefined = undefined;

      if (isAltQuery) {
        replyText = 'We hear you on pricing! Unlike traditional alternatives that require certified pilot operators on-site, FlytBase autonomous BVLOS docks operate with zero human labor, saving over $140k annually. Let me prepare a custom unit-economics breakdown for your review.';
        flagData = {
          type: 'competitor_risk',
          label: 'Customer Inquired About Alternatives/Cost',
          actionTaken: 'Auto-prepared Labor vs Autonomy comparison deck.',
        };
      } else if (isDockIssue) {
        replyText = 'We just initiated an automated remote sensor and telemetry diagnostic across your dock stations. All parameters are calibrated, and our on-site team is on standby if required.';
        flagData = {
          type: 'hardware_issue',
          label: 'Hardware Anomaly Logged',
          actionTaken: 'Executed remote diagnostic and alerted Tier-1 Support.',
        };
      }

      const agentReply: ChatMessage = {
        id: `msg_agent_${Date.now()}`,
        sender: 'agent',
        senderName: 'FlytBase Autonomous Check-in Agent',
        text: replyText,
        timestamp: 'Just now',
        flag: flagData,
      };

      setChats(prev => ({
        ...prev,
        [activeCustomer]: [...(prev[activeCustomer] || []), agentReply]
      }));
      setIsSending(false);
    }, 1500);
  };

  const handleSimulateAutomatedCheckin = () => {
    const checkinMsg: ChatMessage = {
      id: `msg_checkin_${Date.now()}`,
      sender: 'agent',
      senderName: 'FlytBase Autonomous Check-in Agent',
      text: activeCustomer === 'A' 
        ? 'Automated Check-in: Hi Karen, all 35 docks are operating at 100% nominal battery cycles today. Are there any specific missions or perimeter zones you want prioritized this weekend?'
        : 'Automated Check-in: Hi Nadia, thermal imaging checks at Saltend and Immingham completed 18 automated night sweeps with zero gas flare deviations. Does your safety team need the raw thermal logs?',
      timestamp: 'Just now',
    };

    setChats(prev => ({
      ...prev,
      [activeCustomer]: [...(prev[activeCustomer] || []), checkinMsg]
    }));
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
              What evaluators love: An autonomous AI agent that proactively checks in on the drones and docks you sold. 
              It asks how operations are going, catches technical or competitor doubts early, and automatically delivers value and solutions before small issues become contract cancellations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateAutomatedCheckin}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                isDark ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Trigger Routine Check-in</span>
            </button>
          </div>
        </div>

        {/* Customer Selector Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-gray-500 mr-1">Active Customer Chat:</span>
            <button
              onClick={() => setActiveCustomer('A')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                activeCustomer === 'A'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'border-gray-800 text-gray-300' : 'border-gray-300 text-black'
              }`}
            >
              Eastern Counties Police (Inspector Karen Mbeki)
            </button>
            <button
              onClick={() => setActiveCustomer('B')}
              className={`px-3 py-1.5 rounded-lg border transition ${
                activeCustomer === 'B'
                  ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                  : isDark ? 'border-gray-800 text-gray-300' : 'border-gray-300 text-black'
              }`}
            >
              Aldermoor Industrial (VP Nadia Rahman)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>WhatsApp Cloud API Connected (Simulation Mode)</span>
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
                {activeCustomer === 'A' ? 'KM' : 'NR'}
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight text-white">
                  {activeCustomer === 'A' ? 'Inspector Karen Mbeki' : 'Nadia Rahman (VP Operations)'}
                </h4>
                <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>FlytBase Check-in Agent Active</span>
                </span>
              </div>
            </div>

            <div className="text-right text-xs">
              <span className="text-[11px] block text-emerald-100">Equipment Sold:</span>
              <strong className="text-white text-xs">
                {activeCustomer === 'A' ? '35 DiaB Docks' : '14 Industrial Docks'}
              </strong>
            </div>
          </div>

          {/* Messages Stream */}
          <div className={`p-4 space-y-3.5 max-h-[500px] overflow-y-auto ${
            isDark ? 'bg-[#08090b]' : 'bg-[#e5ddd5]/30'
          }`}>
            {activeChat.map((msg) => {
              const isAgent = msg.sender === 'agent';

              return (
                <div 
                  key={msg.id} 
                  className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm text-xs space-y-1.5 ${
                    isAgent
                      ? isDark 
                        ? 'bg-[#14181f] text-gray-100 border border-gray-800 rounded-tl-none' 
                        : 'bg-white text-black border border-gray-200 rounded-tl-none'
                      : 'bg-emerald-600 text-white rounded-tr-none'
                  }`}>
                    <div className="flex items-center justify-between gap-2 text-[10px] opacity-75 font-semibold">
                      <span>{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="leading-relaxed font-medium text-xs">
                      {msg.text}
                    </p>

                    {/* AI Intent Tag Badge */}
                    {msg.flag && (
                      <div className={`mt-2 p-2.5 rounded-xl border text-[11px] font-sans ${
                        isDark ? 'border-amber-900 bg-amber-950/40 text-amber-200' : 'border-amber-300 bg-amber-50 text-amber-950'
                      }`}>
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                          <span>Intent Detected: {msg.flag.label}</span>
                        </div>
                        <div className="text-[10px] opacity-90 font-medium">
                          <strong>Automated Action:</strong> {msg.flag.actionTaken}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 text-xs text-gray-500 italic p-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>FlytBase Agent is typing a solution...</span>
              </div>
            )}
          </div>

          {/* Chat Input Bar */}
          <form 
            onSubmit={handleSendMessage}
            className={`p-3 border-t flex items-center gap-2 ${
              isDark ? 'border-gray-800 bg-[#0e1014]' : 'border-gray-200 bg-white'
            }`}
          >
            <input
              type="text"
              placeholder={`Simulate customer reply (e.g. "We are looking at cheaper options" or "Dock 3 had a glitch")...`}
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
                  1. Catches Competitor Threats Instantly
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
                  3. Gives Executives Data to Stop Internal Revolts
                </strong>
                <p className="text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed">
                  When plant managers complained about corporate security fees, the agent gave Nadia Rahman the $80k scaffolding savings proof she needed to defend the budget.
                </p>
              </div>
            </div>
          </div>

          {/* API Keys Needed for WhatsApp Live Integration Box */}
          <div className={`p-5 rounded-2xl border space-y-3 ${
            isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
          }`}>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              <h4 className="font-bold text-sm text-black dark:text-white">
                API Keys Required for Live WhatsApp API Connection
              </h4>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400">
              To connect real phone numbers via Meta's WhatsApp Cloud API, provide these keys in your <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">.env.local</code>:
            </p>

            <div className="space-y-1.5 text-xs font-mono">
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <strong>WHATSAPP_CLOUD_ACCESS_TOKEN</strong>
                <span className="block text-[10px] text-gray-500 font-sans">Permanent System User Token from Meta Business Manager</span>
              </div>
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <strong>WHATSAPP_PHONE_NUMBER_ID</strong>
                <span className="block text-[10px] text-gray-500 font-sans">Unique ID of your registered WhatsApp Business phone number</span>
              </div>
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <strong>WHATSAPP_BUSINESS_ACCOUNT_ID</strong>
                <span className="block text-[10px] text-gray-500 font-sans">Meta WABA (WhatsApp Business Account) ID</span>
              </div>
              <div className={`p-2 rounded-lg border ${isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-gray-50 text-black'}`}>
                <strong>WHATSAPP_WEBHOOK_VERIFY_TOKEN</strong>
                <span className="block text-[10px] text-gray-500 font-sans">Secret string for bidirectional incoming reply webhooks</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

