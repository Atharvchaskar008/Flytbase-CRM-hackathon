'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  PhoneCall, 
  MessageSquare, 
  ShieldCheck, 
  Share2, 
  Server, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Key, 
  CloudRain, 
  Database,
  ExternalLink,
  Sliders,
  Send
} from 'lucide-react';

interface IntegrationsHubProps {
  isDark?: boolean;
}

export const IntegrationsHub: React.FC<IntegrationsHubProps> = ({ isDark = false }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'telemetry' | 'comms' | 'desk' | 'crm'>('all');

  const integrations = [
    {
      id: 'flytos_mqtt',
      category: 'telemetry',
      title: 'FlytOS & FlytCloud MQTT WebSockets',
      subtitle: 'Live Drone & Dock Hardware Telemetry (The Core Moat)',
      description: 'Monitors real-time battery charge cycles, dock enclosure motor torque, internal thermal levels, and RTK GPS accuracy directly from the 49 physical docks.',
      status: 'Live Simulation Active',
      statusColor: 'text-emerald-600',
      valueProp: 'Detects dock roof motor resistance before the enclosure jams and traps a police drone inside.',
      requiredKeys: ['FLYTCLOUD_API_KEY', 'MQTT_BROKER_URL', 'DEVICE_FLEET_ID'],
      isConfigured: true,
    },
    {
      id: 'aviation_weather',
      category: 'telemetry',
      title: 'Tomorrow.io Weather & Aviation NOTAM Feeds',
      subtitle: 'Automated Airspace & Environmental Grounding Intelligence',
      description: 'Correlates dock downtime with local wind shear, freezing rain, and temporary flight restrictions (TFRs/NOTAMs) from civil aviation authorities.',
      status: 'Ready to Connect',
      statusColor: 'text-blue-600',
      valueProp: 'Answers customer questions instantly: "Wind exceeded 28 knots at 14:00; automated safety protocol grounded the flight."',
      requiredKeys: ['TOMORROW_IO_API_KEY', 'CAA_NOTAM_FEED_KEY'],
      isConfigured: false,
    },
    {
      id: 'twilio_voice',
      category: 'comms',
      title: 'Twilio Voice + ElevenLabs AI Phone Calling',
      subtitle: 'Multi-Channel Voice Calling with Human-in-the-Loop Permission',
      description: 'Powers conversational voice calling from the Command Panel to contact police commanders and plant managers during emergencies.',
      status: 'Integrated in Command Panel',
      statusColor: 'text-emerald-600',
      valueProp: 'Drafts speech script, dials customer with 1 click, records conversation, and logs summary into CRM notes.',
      requiredKeys: ['TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN', 'ELEVENLABS_API_KEY'],
      isConfigured: true,
    },
    {
      id: 'whatsapp_cloud',
      category: 'comms',
      title: 'WhatsApp Cloud API Automated Dispatch',
      subtitle: 'Executive Flight Summaries & PDF Audit Reports',
      description: 'Dispatches scheduled weekly flight ROI reports and incident verification PDFs directly to executive mobile phones.',
      status: 'Integrated in Command Panel',
      statusColor: 'text-emerald-600',
      valueProp: 'Sends plant managers weekly proof: "Your 14 docks conducted 84 automated patrols, saving 42 contractor hours."',
      requiredKeys: ['WHATSAPP_CLOUD_ACCESS_TOKEN', 'WHATSAPP_PHONE_NUMBER_ID'],
      isConfigured: true,
    },
    {
      id: 'zendesk_jira',
      category: 'desk',
      title: 'Zendesk & Jira Service Management Bi-Directional Sync',
      subtitle: 'Enterprise Support Desk & Commercial Contract Unification',
      description: 'Pulls open support tickets directly into the Risk Radar and Power Map tabs so unresolved tickets immediately adjust the customer happiness index.',
      status: 'Ready to Connect',
      statusColor: 'text-blue-600',
      valueProp: 'Prevents pitching expansion when the customer has an open, unresolved high-priority incident.',
      requiredKeys: ['ZENDESK_SUBDOMAIN', 'ZENDESK_API_TOKEN', 'JIRA_API_TOKEN'],
      isConfigured: false,
    },
    {
      id: 'salesforce_crm',
      category: 'crm',
      title: 'Salesforce Data Cloud / HubSpot Two-Way Sync',
      subtitle: 'Zero-Copy CRM Data Federation & Executive Visibility',
      description: 'Bi-directionally syncs verified ARR, contract renewal windows, and stakeholder risk scores with the primary enterprise CRM.',
      status: 'Ready to Connect',
      statusColor: 'text-blue-600',
      valueProp: 'Keeps executive leadership and sales teams completely aligned with actual ground telemetry.',
      requiredKeys: ['SALESFORCE_CLIENT_ID', 'SALESFORCE_CLIENT_SECRET', 'HUBSPOT_ACCESS_TOKEN'],
      isConfigured: false,
    },
  ];

  const filtered = activeTab === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === activeTab);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Integrations Hub & Platform Expansion Roadmap
              </h3>
            </div>
            <p className={`text-xs font-medium max-w-3xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Connect FlytBase CSM Command Center to real-world drone telemetry streams, voice phone dispatch, WhatsApp, enterprise helpdesks, and corporate CRMs.
            </p>
          </div>

          <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 shrink-0 ${
            isDark ? 'border-gray-800 bg-[#12151b]' : 'border-gray-300 bg-gray-50'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-black dark:text-white">Enterprise Ready Architecture</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === 'all'
                ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                : isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            All Integrations ({integrations.length})
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === 'telemetry'
                ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                : isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            1. Drone Hardware Telemetry
          </button>
          <button
            onClick={() => setActiveTab('comms')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === 'comms'
                ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                : isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            2. AI Phone Calls & WhatsApp
          </button>
          <button
            onClick={() => setActiveTab('desk')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === 'desk'
                ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                : isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            3. Helpdesk (Zendesk / Jira)
          </button>
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-3 py-1.5 rounded-lg border transition ${
              activeTab === 'crm'
                ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                : isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-gray-700'
            }`}
          >
            4. Enterprise CRM & Billing
          </button>
        </div>
      </div>

      {/* Grid of Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border space-y-4 transition flex flex-col justify-between ${
                isDark 
                  ? 'border-gray-800 bg-[#0c0e12] hover:border-gray-700' 
                  : 'border-gray-300 bg-white hover:border-gray-500 shadow-sm'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                      {item.title}
                    </h4>
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shrink-0 ${
                    item.isConfigured 
                      ? 'bg-emerald-100 text-emerald-950 border-emerald-300' 
                      : 'bg-gray-100 text-gray-800 border-gray-300'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {item.description}
                </p>

                <div className={`p-3 rounded-xl border text-xs font-semibold ${
                  isDark ? 'border-gray-800 bg-[#12151b] text-gray-300' : 'border-gray-200 bg-gray-50 text-black'
                }`}>
                  <strong className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">Customer Success Value:</strong>
                  {item.valueProp}
                </div>
              </div>

              {/* Required Keys Box */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-semibold flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-amber-500" />
                    <span>Required API Credentials:</span>
                  </span>
                  <span className={`text-[11px] font-bold ${item.isConfigured ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {item.isConfigured ? 'Configured in Environment' : 'Pending Keys'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {item.requiredKeys.map((k) => (
                    <code 
                      key={k} 
                      className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                        isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-300 bg-gray-100 text-black'
                      }`}
                    >
                      {k}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
