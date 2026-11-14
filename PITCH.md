# FlytBase CSM Command Center — Official Pitch & Presentation Blueprint

> **A Next-Generation Customer Success & Risk Intelligence Platform for Autonomous Drone-in-a-Box (DiaB) Fleets.**  
> *Built for the AI Hackers Collective Questathon 2026.*

---

## 1. Executive Summary & The Core Hook

**"In autonomous robotics, customer success cannot be a passive digital filing cabinet."**

Generic CRMs like standard Salesforce or HubSpot were designed for software sales reps logging calls and moving pipeline stages. But **FlytBase** does not sell traditional software: FlytBase deploys physical, mission-critical robotic drone stations on police rooftops and hazardous chemical refineries. 

When a drone dock malfunctions or stops flying:
- An emergency police pursuit loses its aerial surveillance.
- A hazardous chemical leak at a refinery goes undetected.
- The customer smiles in meetings while privately preparing to cancel their contract.

This platform bridges the gap between **live hardware telemetry**, **contractual SLA obligations**, and **multi-stakeholder politics**—transforming raw data into proactive, automated interventions that protected **£588,000 in baseline ARR** and positioned FlytBase to win a **£1.1M national framework tender**.

---

## 2. The Hackathon Scenario & The Deceptive Trap

During the simulation, we stepped into the shoes of a Customer Success Manager handling two high-stakes enterprise accounts:
1. **Eastern Counties Police Alliance (Account A):** 35 deployed docks generating **£420,000 ARR**.
2. **Aldermoor Industrial Group (Account B):** 14 deployed docks generating **£168,000 ARR**.

### The Deceptive Calm:
Both customer executives smiled and said: *"Everything is going great!"* A junior account manager would have treated this as an easy upselling opportunity. But our deep discovery and telemetry uncovered 4 silent failure modes:

| Silent Threat | What Was Really Happening | Consequence if Ignored |
| :--- | :--- | :--- |
| **Silent Drone Degradation** | 3 docks at Aldermoor (Stallingborough) halted flights completely while remaining online. | Plant managers revolted against central security charges; renewal held hostage. |
| **Unanswered Tactical Emergency** | Inspector Karen Mbeki logged an urgent ticket for a Dec 5 public event that went unanswered. | Police union hostility; imminent council contract review and termination. |
| **The Resigning Champion** | Fleet Manager Rhys Calder was quietly stepping down in January 2026. | Single point of failure; FlytBase would have lost its only champion. |
| **Procurement Disqualification** | Derek Finch was preparing to disqualify FlytBase from the 300-dock (£1.1M) tender. | Inability to prove £1,000/dock/month unit economics against helicopters. |

---

## 3. The 5 Strategic In-Game Decisions & Their Real Results

### Decision 1: Immediate Triage of Karen Mbeki's Dec 5 Crisis (Support > Sales)
* **What We Did:** We refused to pitch speculative expansion and instead prioritized resolving Karen Mbeki's tactical air support ticket before Monday 11:00 AM.
* **Result:** Officer satisfaction rose from 45% to **85%**. We prevented a public tactical failure and insulated the **£420,000 baseline contract** from council cancellation.

### Decision 2: Institutionalize Relationships Before Rhys Calder Leaves
* **What We Did:** Rhys Calder is exiting in January. We immediately bypassed intermediate managers to brief Chief Constable Marcus Hayes (Economic Buyer) and co-opted Karen Mbeki as the operational co-lead.
* **Result:** Converted FlytBase from *"Rhys's personal pet project"* into an institutional police standard, eliminating the single point of failure.

### Decision 3: Deliver Audited Unit-Economics to Derek Finch in Procurement
* **What We Did:** Prepared an audited unit-economics model comparing our £1,000/dock/month automated platform against traditional police helicopter flight costs (£3,500/hour).
* **Result:** Derek Finch cleared FlytBase through procurement gates, qualifying our bid for the **£1,100,000 300-dock national tender**.

### Decision 4: Quell Aldermoor's Plant Revolt with Automated Flight ROI Reports
* **What We Did:** Delivered automated, facility-specific flight frequency and incident logs to VP Operations Nadia Rahman, proving £240,000 in saved contractor inspection hours.
* **Result:** Ended the internal plant manager rebellion and secured the **£168,000 ARR contract renewal**.

### Decision 5: Autonomous Multi-Agent Swarm with Human Permission
* **What We Did:** Deployed background AI agents (Watchdog, Stakeholder, Expansion) that automatically monitor IoT signals and propose 1-click AI Voice Calls and WhatsApp reports with explicit human authorization.
* **Result:** Proactive resolution before the customer even picks up the phone.

---

## 4. Platform Architecture & Key Innovations

```
[Questathon MCP & Telemetry] 
            │ (Strict 1 call/min rate limit)
            ▼
[Atomic Cache: data/crm_cache.json] 
            │
            ├─────────────────────────────────────────────────┐
            ▼                                                 ▼
[Clean Vertical Sidebar Layout]                   [Autonomous AI Swarm]
• 1. Monday To-Do List (Q3)                       • Telemetry Watchdog Agent
• 2. Signed Contracts & Money (Q1)                • Stakeholder Dynamics Agent
• 3. Who Makes Decisions (Q2)                     • Expansion Synthesis Agent
• 4. Problems & Deadlines (Q4)                                │
• 5. Questions to Ask (Q5)                                    ▼
• 6. AI Helpers (Voice & WhatsApp)                [Human-in-the-Loop Panel]
• 7. Shared Note Arena (Team Board)               • 1-Click AI Voice Call Simulator
• 8. Visual Charts & Infographics                 • WhatsApp PDF Report Dispatch
• 9. Official Contract Papers (Data Room)         • Live Audio Recording & Notes
• 10. Integrations Hub & Roadmap
```

### Highlights:
1. **Vertical Sidebar Navigation:** High-density, spacious interface using **Poppins** font and crisp high-contrast black text on a clean white background (with dark mode toggle).
2. **Natural Spoken English:** Zero convoluted technical jargon; every section, badge, and card is written in plain, human language that anyone can read aloud.
3. **Shared Note Arena:** A live collaborative team whiteboard for CSMs and engineers to pin meeting notes, record strategy, and tag accounts.
4. **Zero-Copy Data Room:** Secure audit vault containing real signed purchase orders (`PO-ECPA-2024-001`, `AIG-ENT-2023-88`) and SLA terms.
5. **Interactive Detail Drawers:** Clicking any item opens a focused detail view with full context and citations.

---

## 5. Future Integrations Roadmap & Required API Keys

To move from hackathon simulation into full-scale enterprise production, here is the technical integration roadmap and the exact credentials required:

### 1. Drone Hardware Telemetry (The Core Moat)
* **FlytOS & FlytCloud MQTT WebSockets:** Connects real-time battery cycles, roof motor resistance, and RTK GPS accuracy.
* **Tomorrow.io Weather & CAA NOTAM Feeds:** Correlates dock downtime with wind gusts and airspace restrictions.
* **Keys Required:**
  ```env
  FLYTCLOUD_API_KEY=your_flytcloud_key_here
  MQTT_BROKER_URL=wss://mqtt.flytcloud.com:8883
  TOMORROW_IO_API_KEY=your_weather_api_key_here
  ```

### 2. Multi-Channel Communication with Human Authorization
* **Twilio Voice + ElevenLabs:** Outbound AI phone calls with conversational speech generation and live call recording.
* **WhatsApp Cloud API:** Automated dispatch of weekly flight ROI summaries to plant managers.
* **Keys Required:**
  ```env
  TWILIO_ACCOUNT_SID=AC_your_twilio_sid
  TWILIO_AUTH_TOKEN=your_twilio_auth_token
  TWILIO_PHONE_NUMBER=+1234567890
  ELEVENLABS_API_KEY=your_elevenlabs_key_here
  WHATSAPP_CLOUD_ACCESS_TOKEN=your_whatsapp_meta_token
  WHATSAPP_PHONE_NUMBER_ID=your_phone_id
  ```

### 3. Enterprise Helpdesk & Support Desk Unification
* **Zendesk & Jira Service Management:** Real-time bi-directional ticket sync into the Risk Radar.
* **PagerDuty:** Critical dock failure escalation.
* **Keys Required:**
  ```env
  ZENDESK_SUBDOMAIN=flytbase
  ZENDESK_API_TOKEN=your_zendesk_token
  JIRA_API_TOKEN=your_atlassian_token
  PAGERDUTY_ROUTING_KEY=your_pagerduty_key
  ```

### 4. Enterprise CRM & Billing
* **Salesforce Data Cloud / HubSpot:** Zero-copy CRM data federation.
* **Stripe / NetSuite:** Automated per-flight-hour metered billing.
* **Keys Required:**
  ```env
  SALESFORCE_CLIENT_ID=your_salesforce_client_id
  SALESFORCE_CLIENT_SECRET=your_salesforce_secret
  HUBSPOT_ACCESS_TOKEN=your_hubspot_token
  STRIPE_SECRET_KEY=your_stripe_key
  ```

---

## 6. Official 3-Minute Video Presentation Script

*Use this word-for-word script during your 3-minute video walkthrough:*

* **[0:00 - 0:45] The Problem & The Deceptive Calm:**
  > *"Hi everyone, I am presenting the FlytBase CSM Command Center. In autonomous Drone-in-a-Box robotics, software and hardware are inseparable. A standard CRM is a passive filing cabinet. In our hackathon scenario, our customers smiled and said 'Everything is fine!' But our telemetry found 3 dead docks, an unanswered tactical police emergency, and a fleet champion resigning in January. Here is how our platform saved £588,000 in ARR."*

* **[0:45 - 1:30] Answering the 5 Judging Questions:**
  > *"We built this platform around the 5 judging questions. Navigating through our clean sidebar:
  > - Tab 1 (Monday To-Do List) gives our team their prioritized 9:00 AM action plan.
  > - Tab 2 (Contracts & Money) strictly audits £588k in signed ARR vs £1.1M in speculative pipeline.
  > - Tab 3 (Who Makes Decisions) maps decision-makers, champions, and blockers.
  > - Tab 4 (Problems & Deadlines) tracks our countdown timers on churn risks.
  > - Tab 5 (Questions to Ask) identifies critical blind spots before they hurt our revenue."*

* **[1:30 - 2:15] Data Room & Autonomous Calling Demo:**
  > *"Notice this £420,000 figure for the police alliance. When I click on PO-ECPA-2024-001, it jumps into our Data Room, opening the exact signed contract and SLA response terms. 
  > Meanwhile, our AI Helpers tab continuously runs in the background. When it detects an emergency, it drafts a voice call script. With human permission, we can click 'Authorize AI Voice Call' to dial the customer, listen to the simulated recording, and automatically save the transcript to our field notes."*

* **[2:15 - 3:00] Shared Note Arena, Infographics & Architecture:**
  > *"We also added a Shared Note Arena where CSMs and engineers collaborate on client battlecards, and an Infographics tab visualizing our fleet and revenue ratios. 
  > Under the hood, the app connects to Questathon via streamable MCP, strictly enforces the 1 call per minute rate limit with an atomic cache, and ingests live signals dynamically. Thank you!"*
