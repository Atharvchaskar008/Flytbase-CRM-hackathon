# FlytBase CSM Command Center — Hackathon Walkthrough & Submission Guide

This document contains the complete retrospective of the FlytBase CSM Hackathon, explaining the problem, the game decisions, their measurable impact, the system architecture, and the recommended 3-minute video script for the judges.

---

## 1. The Scenario & Initial Trap
- **The Challenge:** Step into the shoes of a FlytBase Customer Success Manager (CSM) managing two enterprise accounts:
  1. **Eastern Counties Police Alliance (Account A):** 35 deployed Drone-in-a-Box (DiaB) docks generating **£420,000 ARR**.
  2. **Aldermoor Industrial Group (Account B):** 14 deployed DiaB docks generating **£168,000 ARR**.
- **The Deceptive Calm:** On the surface, customer executives smiled and said *"Everything is going great!"* However, traditional account managers who take verbal reassurances at face value would have been blindsided by massive silent churn:
  - **At Eastern Police:** Champion Rhys Calder was secretly planning his exit in January 2026; Tactical Lead Inspector Karen Mbeki had an unacknowledged emergency ticket for a December 5th public event; Procurement Lead Derek Finch was preparing to disqualify FlytBase from the 300-dock national framework tender (£1.1M upside).
  - **At Aldermoor Industrial:** 3 docks at Stallingborough completely halted flights despite remaining connected; plant managers were revolting against paying central security drone fees; VP Nadia Rahman was withholding the £168k contract renewal until plant flight ROI was proven.

---

## 2. Strategic Game Decisions Chosen & Their Ripple Effects

### Decision 1: Immediate Triage of Karen Mbeki's Dec 5 Ticket (Support > Sales)
- **What We Did:** Rather than pitching prospective expansion, we prioritized resolving Karen Mbeki's tactical air support ticket for the upcoming public event before Monday 11:00 AM.
- **Why It Mattered:** In enterprise operations, failing a tactical mission during a high-profile public event destroys police leadership trust and triggers formal council contract scrutiny.
- **Measurable Result:** Officer trust climbed to 85%, operational credibility was protected, and the £420,000 baseline contract was insulated from termination.

### Decision 2: Institutionalize Relationships Before Rhys Calder Leaves
- **What We Did:** Rhys Calder is exiting in January 2026. We immediately scheduled executive alignment with Chief Constable Marcus Hayes (Economic Buyer) and brought Karen Mbeki into the operational governance model.
- **Why It Mattered:** 70% of enterprise SaaS churn occurs when an internal champion leaves and the vendor has no relationship with the economic buyer.
- **Measurable Result:** Transformed FlytBase from "Rhys's pet project" into an institutional operational asset for the entire police alliance.

### Decision 3: Deliver Audited Unit-Economics to Derek Finch for the 300-Dock Tender
- **What We Did:** Prepared an audited unit-economics breakdown demonstrating £1,000/dock/month against traditional police helicopter flight hours (£3,500/hour).
- **Why It Mattered:** Derek Finch is a strict procurement gatekeeper. He does not care about marketing buzzwords; he requires clear operating models to clear tender requirements.
- **Measurable Result:** Unlocked procurement clearance, moving the 300-dock expansion opportunity from unverified speculation to a legally compliant £1,100,000 tender bid.

### Decision 4: Quell Aldermoor's Plant Manager Revolt with Automated Flight ROI
- **What We Did:** Extracted automated plant-level flight logs and incident response times for Stallingborough, Immingham, and Saltend, delivering a customized ROI brief directly to Nadia Rahman.
- **Why It Mattered:** Plant managers were rebelling against central corporate security chargebacks. Without data, Nadia was forced to hold the contract renewal hostage.
- **Measurable Result:** Proved £240,000 in saved manual security inspection hours, satisfied the plant managers, and secured the £168,000 ARR contract renewal.

### Decision 5: Autonomous Multi-Agent Swarm with Human-in-the-Loop Calling
- **What We Did:** Built an autonomous AI agent swarm (Watchdog, Stakeholder, Expansion) that detects telemetry anomalies and proposes instant AI Voice Calls and WhatsApp dispatches with human authorization.
- **Why It Mattered:** Humans cannot monitor 49 docks and dozens of stakeholders 24/7. Autonomous background loops catch issues before they turn into angry phone calls.

---

## 3. The 5 Core Judging Questions & Dashboard Mapping

| Hackathon Question | Dashboard Tab | What It Proves |
| :--- | :--- | :--- |
| **Q1: What is the book worth?** | **Receipts (Q1)** | Audits **£588,000 in signed ARR** strictly separated from **£1,100,000 in speculative pipeline**, citing exact signed PO IDs (`PO-ECPA-2024-001`, `AIG-ENT-2023-88`). |
| **Q2: Who holds the power?** | **Power Map (Q2)** | Maps stakeholders into 5 distinct roles (Decider, Payer, Champion, Blocker, User) with trust meters to eliminate single points of failure. |
| **Q3: What do you do first?** | **Actions (Q3)** | A prioritized Monday 9:00 AM operational playbook with designated owners, deadlines, and required proof files. |
| **Q4: What is about to go wrong?** | **Risk Radar (Q4)** | Live countdown timers on silent degradation, procurement gates, and renewal windows. |
| **Q5: What do you still not know?** | **Blind Spots (Q5)** | Unanswered dependencies that jeopardize revenue, with 1-click MCP `write_note` discovery logging. |

---

## 4. Technical Architecture Highlights
1. **Next.js 14 & Poppins UI:** Clean, modern, high-density interface with crisp white background by default and monochrome dark mode toggle.
2. **Streamable MCP & REST Ingestion:** Fully connects to Questathon via streamable MCP tools (`get_my_accounts`, `get_signals`, `write_note`).
3. **Atomic Singleton Cache & Rate Limiting:** Enforces strict 60-second cooldown (`RATE_LIMIT_INTERVAL_MS = 60000`) on `data/crm_cache.json`, preventing HTTP 429 errors.
4. **Zero-Copy Data Room:** Secure audit vault containing real signed purchase orders, SLA terms (30-min remote fix, 4-hr dispatch), and meeting transcripts.
5. **Human-in-the-Loop Outbound Calling:** AI agents draft Voice Calls (with speech script and simulated call audio playback) and WhatsApp dispatches, executing only with explicit CSM permission.

---

## 5. Recommended 3-Minute Video Walkthrough Script for Judges

- **[0:00 - 0:45] The Problem & Starting Dilemma:**
  > *"Hi everyone, I am presenting the FlytBase CSM Command Center. In autonomous Drone-in-a-Box robotics, a CRM cannot be a passive digital filing cabinet. In our hackathon scenario, customers smiled and said everything was fine. But our telemetry found 3 dead docks at Aldermoor, an unanswered tactical police emergency, and a champion resigning in January. Here is how our platform navigated these landmines to protect £588,000 in recurring revenue."*

- **[0:45 - 1:30] Answering the 5 Core Questions:**
  > *"The platform is organized around the 5 judging questions. In Tab 1 (Receipts), we audit verified ARR (£588k) strictly apart from speculative pipeline (£1.1M). In Tab 2 (Power Map), we map decision-makers like Chief Constable Marcus Hayes and blockers like Derek Finch. In Tab 3, we have our Monday 9:00 AM prioritized action plan. Tab 4 tracks our Risk Radar countdowns, and Tab 5 logs our critical blind spots."*

- **[1:30 - 2:15] Tracing Numbers to Receipts & Autonomous Agents:**
  > *"Notice this £420,000 figure for the police alliance. When I click on PO-ECPA-2024-001, it jumps into our Data Room, opening the exact signed contract and 4-hour SLA terms. Meanwhile, our Autonomous AI Agents tab continuously monitors flight telemetry. When it detects 3 silent docks, it drafts an automated Voice Call or WhatsApp report, allowing the CSM to authorize the dispatch with 1 click."*

- **[2:15 - 3:00] Architecture & Ingestion:**
  > *"Under the hood, the app connects to Questathon via streamable MCP, strictly respects the 1 call per minute rate limit with an atomic cache, and ingests live signals dynamically without code changes. Thank you!"*
