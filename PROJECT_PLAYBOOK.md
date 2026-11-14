# FlytBase Autonomous CSM & Revenue Intelligence Playbook
> **The Modern Data-First Architecture: Turning Telemetry & Signals into Enterprise Retention and Expansion**

---

## 1. What is a Modern CRM vs. Traditional CRMs?

### Traditional CRMs: Passive Digital Filing Cabinets
For two decades, legacy CRMs (traditional Salesforce, older Dynamics, standard Zoho) functioned as **passive filing cabinets**:
* **Manual Data Entry:** Sales reps manually typed meeting notes, guessed deal stages, and logged phone calls after the fact.
* **Batch-Synced & Stale:** Data was batch-synced overnight, leaving customer profiles hours or days behind reality.
* **Trapped in Silos:** Sales deals lived in the CRM, product telemetry lived in AWS/Datadog, billing lived in NetSuite, and customer support tickets lived in Zendesk. A customer could be furious about hardware failures while an oblivious account manager sent them an automated cold upsell email.

### Modern Data-First CRMs: Live, Autonomous, and Action-Oriented
Modern leaders (Salesforce Data Cloud / Agentforce, Tesla direct telemetry, HubSpot Smart CRM, Microsoft Graph) revolutionized the industry:
1. **Real-Time Data Unification (Zero-Copy):** Telemetry, email sentiment, support tickets, and legal documents stream directly into a single 360° customer profile without manual data entry.
2. **Product-Led Telemetry (The Tesla/Apple Model):** Products report their own health. Instead of waiting for a customer to call and complain, hardware diagnostics immediately alert the account team to fix the issue proactively.
3. **Autonomous AI Agents (Agentic Execution):** The CRM doesn’t just show static charts; background AI agents continuously monitor signals, prioritize the highest-impact actions, and draft verified proposals with receipts.

---

## 2. What Data Is In This Project? (FlytBase Ground Truth)

This project manages two high-stakes enterprise accounts operating **FlytBase Autonomous Drone-in-a-Box (DiaB)** systems:

### Account A: Eastern Counties Police Alliance
* **The Business:** Regional law enforcement consortium across 4 forces (Westmere, Metro Central, Tarn Valley, Norwold).
* **The Deployment:** 35 autonomous drone docks installed for emergency response and search-and-rescue.
* **The Deal:** $280,000 annual renewal + potential **300-dock regional framework tender ($1.2M)**.
* **The Ground Truth Reality & Signals:**
  * **Departing Champion (`champion_leaves`):** Rhys Calder (Alliance Lead) is leaving in January. All legacy relationships were with him alone. No successor is named.
  * **Unanswered Emergency Ticket (`urgent_request`):** Insp. Karen Mbeki (Westmere) logged an urgent ticket for pilot training and dock failure support before a major 5 December public event. FlytBase has not answered, burning trust.
  * **Tender Spec Lockout (`rc_tender_2`):** The 300-dock framework specification locks imminently. The alliance has **no costed operating model** and no idea who will pilot 300 docks.
  * **Uneven Utilization (`rc_appetite_2`):** 14 of 18 docks fly regularly in Westmere and Metro Central, but Tarn Valley has never flown a single live mission and Norwold only trains.

### Account B: Aldermoor Industrial Group
* **The Business:** Global chemical and industrial conglomerate with 15 manufacturing plants.
* **The Deployment:** 14 heavy-duty drone docks installed for perimeter security and nighttime flare-stack monitoring.
* **The Deal:** $245,000 annual license renewal + 40-plant expansion with sister companies.
* **The Ground Truth Reality & Signals:**
  * **Silent Operational Outage (`usage_drop`):** 3 docks that flew every night suddenly **halted all flights for two weeks in November**, yet stayed online with network heartbeats. No ticket was raised.
  * **Plant Manager Budget Revolt (`sr_plants_2`):** Plant managers (like Beatriz Alonso at Plant 7) resent paying their share of the central corporate security budget for equipment they didn't choose.
  * **Financial Controller Blockade (`nadia_rahman`):** Group Controller Nadia Rahman refuses to renew until FlytBase provides verified plant-by-plant flight logs proving Stefan Roy’s claim of €1.2M in annual savings.

---

## 3. How a Customer is Converted into a Buyer (The Enterprise Journey)

In B2B enterprise sales, people don’t buy products; **committees buy risk reduction and business outcomes**:

```
[ Unaware / Ad-Hoc ] ──► [ Champion Discovery ] ──► [ Technical Feasibility ] ──► [ Economic Justification ] ──► [ Contracting & PO ]
```

1. **Find and Enable the Champion (e.g. Chief Davies or Rhys Calder):**
   * The champion experiences the daily operational pain (e.g. police helicopters take 40 minutes to arrive on scene, while FlytBase drones launch from docks in 3 minutes).
   * *The Mistake:* Relying on the champion alone. Champions don't control the budget.
2. **Multi-Threading the Power Map:**
   * **The Decider (Insp. Mbeki):** Cares about operational reliability on night shifts and pilot workload.
   * **The Payer (Hannah Doyle / Deputy Miller):** Cares about budget ceilings, procurement regulations, and cost per flight.
   * **The Blocker (Procurement / Security):** Freezes the process over missing compliance (BVLOS waivers, ISO 27001, SOC2).
3. **Overcoming the "Proof Gap":**
   * Enterprise buyers require **receipts**. Showing flight telemetry logs proving that 2 missing persons were found in under 12 minutes transforms an anecdotal pitch into an undeniable business case.

---

## 4. How to Convert a Buyer into a Repeat, Expanding Customer (Retention & NRR)

The true value of software and DiaB hardware lies in **Net Revenue Retention (NRR)**. Moving an account from a $240k renewal to a $1.2M expansion requires a systematic retention engine:

### Rule 1: Eliminate "Silent Churn" Through Telemetry
* Customers rarely churn suddenly; they disengage silently.
* When 3 docks at Aldermoor stop flying, a legacy CRM doesn't know until renewal day 30 days later when the client cancels.
* **Our Modern CRM detects the drop on Day 2 via IoT telemetry (`usage_drop`)**, allowing the CSM to intervene before the customer forms the opinion that "the drones don't work."

### Rule 2: Deliver the "Monday 9am List" (Prioritized Action)
* General to-do lists ("follow up with client") fail.
* Actions must be:
  1. **Ranked:** By deal revenue and threat urgency.
  2. **Owned:** Assigned to a specific human or agent.
  3. **Dated:** Set inside the customer's hard deadline (e.g., *before* the 5 Dec public event, *before* the tender spec locks).
  4. **Tied to an outcome:** Resolving Insp. Mbeki's ticket secures her sponsorship for the 35-dock renewal.

### Rule 3: Write the Customer's Business Case For Them
* Enterprise champions are busy. If you want Hannah Doyle to include FlytBase in the 300-dock tender, don't ask what she needs—**deliver the turnkey, costed operating model directly to her desk**.

---

## 5. How the Underlying System Works

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DATA INGESTION & RATE LIMITING                  │
├────────────────────────────────────────────────────────────────────────┤
│ • Rate Limit Guard: 1 call/min per token (Strict upstream enforcement) │
│ • Local Cache Store (data/crm_cache.json): In-memory + persistent disk │
│ • Zero-Copy Signal Polling: /api/public/v1/signals & MCP get_signals   │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   AUTONOMOUS AGENT REASONING ENGINE                    │
├────────────────────────────────────────────────────────────────────────┤
│ 1. Telemetry Watchdog Agent  ──► Detects 3 silent docks & tickets      │
│ 2. Stakeholder Dynamics Agent──► Flags Rhys Calder succession vacuum   │
│ 3. Expansion Synthesis Agent ──► Drafts 300-dock turnkey tender model  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      HIGH-DENSITY DASHBOARD & ACTION                   │
├────────────────────────────────────────────────────────────────────────┤
│ • Book with Receipts: Every revenue dollar backed by citation IDs      │
│ • Power Map: Deciders, Payers, Blockers & Champions with trust meters  │
│ • Risk Radar: Window deadlines and consequences of inaction            │
│ • Blind-Spot Finder: Unknown dependencies and target stakeholders      │
│ • Two-Way Write-Back: Dispatches notes & tasks back via write_note     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. How Autonomous AI Agents Work in This CRM

Our platform runs three specialized background autonomous agents:

1. **Watchdog-Telemetry-Agent:**
   * *Trigger:* Runs on telemetry signals and ticket logs.
   * *Action:* Detects the 2-week flight halt across Aldermoor Docks 4, 8, and 11. Automatically prepares a remote diagnostic probe and drafts a meeting agenda for Stefan Roy.
2. **Stakeholder-Dynamics-Agent:**
   * *Trigger:* Runs on communication metadata and executive announcements.
   * *Action:* Detects Rhys Calder's January exit. Automatically recommends an immediate tri-party transition meeting with Procurement Lead Hannah Doyle to prevent relationship churn.
3. **Expansion-Synthesis-Agent:**
   * *Trigger:* Runs on tender deadlines and operating constraints.
   * *Action:* Notices the 300-dock tender specification is locking without an operating model. Automatically synthesizes a 1:10 remote pilot-to-dock staffing ratio model and drafts the submission for Hannah Doyle.

---

## 7. Operational Playbook: How a CSM "Gets Things Done"

### Daily Morning Cadence (09:00 - 09:30 AM):
1. **Check the Risk Radar:** Look at deadlines expiring within 7 days.
2. **Execute the Top 3 Monday Moves:** Complete Action #1 (Insp. Mbeki's event response) before making any outbound expansion pitches.
3. **Verify Every Number:** Before presenting to leadership, cross-reference deals in the **Book with Receipts** against audit citations (`km_usage_1`, `flight_log_force_month`).
4. **Log Asks for Blind Spots:** Use the **Blind-Spot Finder** to convert unknowns into explicit discovery questions during stakeholder calls.
5. **Dispatch Notes Upstream:** Save all commitments via the note write-back modal to keep the entire company synchronized.
