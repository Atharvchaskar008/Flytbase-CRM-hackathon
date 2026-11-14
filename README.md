# FlytBase CSM Command Center & Risk Intelligence CRM

> **Questathon 2026: Account Quest** — 30 In-Game Days, Two Accounts, Production-Ready Customer Success CRM.

An audit-grade Customer Success Management (CSM) Command Center built for FlytBase autonomous Drone-in-a-Box (DiaB) fleet operations. Tailored for executive portfolio review to manage renewals and expansions across **Account A (Metropolitan Police Alliance)** and **Account B (Apex Industrial Resources)**.

---

## 🌟 The 5 Core Questions Answered

This CRM is purpose-built to answer the five essential questions required by executive leadership and hackathon judges:

| # | Core Question | View in CRM | How It Answers It |
|---|---|---|---|
| **1** | **What is the book worth?** | **Book with Receipts** | Separates **Verified ARR** from unverified champion claims. Every deal value cites its audit proof (`file_...` contract or `person_...` quote). |
| **2** | **Who holds the power?** | **Power Map** | Complete stakeholder matrix categorizing **Deciders**, **Payers**, **Users**, **Blockers**, and **Champions** with sentiment meters and trust scores. |
| **3** | **What do you do first?** | **Monday 9am List** | Ranked, owned, and dated execution items inside hard customer cutoffs, advancing specific deals. |
| **4** | **What is about to go wrong?** | **Risk Radar** | Highlights impending deadline expirations (e.g. tender cutoffs, IT firewall blacklists) and provides concrete mitigation playbooks. |
| **5** | **What do you still not know?** | **Blind-Spot Finder** | Catalogs critical unknowns, why they matter to revenue, and identifies the exact person or document that can resolve them. |

---

## ⚡ Architecture & Rate Limiting Compliance

The Questathon backend enforces a strict rate limit of **1 call per minute per token**.

### Resilient Data Strategy:
1. **Server-Side Token Security:** `AQ_TOKEN` is kept strictly on the backend (`src/lib/mcp.ts` and `src/app/api/`), never exposed to browser bundles or public commits.
2. **Local Store & Rate Limit Guard:** The system fetches accounts and paperwork once, caches them in `data/crm_cache.json`, and uses subsequent 1-minute turns solely to poll for updates (`get_signals` and `whoami`).
3. **Write-Back Capability:** Notes, tasks, and risk flags written in the dashboard are stored locally and posted upstream via `write_note` / `POST /api/public/v1/notes`.
4. **Offline / Standalone Fallback:** If `AQ_TOKEN` is not yet configured, the system seamlessly operates on a pre-loaded grounded baseline dataset reflecting FlytBase's police and industrial drone dock deployments.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm or pnpm

### 2. Installation
```bash
git clone https://github.com/Atharvchaskar008/Flytbase-CRM-hackathon.git
cd Flytbase-CRM-hackathon
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your personal Questathon player token:
```env
AQ_TOKEN=your_token_from_questathon_website
MCP_URL=https://questathon.aihackerscollective.com/api/public/mcp
API_URL=https://questathon.aihackerscollective.com/api/public/v1
```
*(Note: The app will run in standalone mode with grounded baseline data even without the token!)*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── data/                      # Local JSON store (cache & persistent rate-limited state)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── data/route.ts  # Synchronizes with Questathon API respecting 1 call/min
│   │   │   └── notes/route.ts # Dispatches notes & tasks back to upstream server
│   │   ├── globals.css        # Tailwind styling & dark executive theme
│   │   ├── layout.tsx         # Root HTML layout & metadata
│   │   └── page.tsx           # Main Command Center UI & tab navigation
│   ├── components/
│   │   ├── Header.tsx         # Account switcher, sync trigger & quick actions
│   │   ├── ExecutiveSummary.tsx # Top-level KPI metrics & ARR health
│   │   ├── NextBestActions.tsx  # Question 3: Ranked Monday 9am execution list
│   │   ├── BookWithReceipts.tsx # Question 1: Verified vs speculative deals
│   │   ├── PowerMap.tsx         # Question 2: Deciders, Payers, Blockers & Champions
│   │   ├── RiskRadar.tsx        # Question 4: Timeline threats & mitigations
│   │   ├── BlindSpotFinder.tsx  # Question 5: Critical uncertainties & inquiries
│   │   ├── PaperworkRoom.tsx    # Data room for contracts & citation proofs
│   │   ├── LiveSignalsPanel.tsx # Real-time event ticker from get_signals
│   │   ├── NoteModal.tsx        # Ingests and saves notes upstream
│   │   └── MondayBriefModal.tsx # One-click Monday Morning Handover Memo generator
│   ├── lib/
│   │   ├── mcp.ts             # MCP client & REST endpoints
│   │   ├── cache.ts           # Rate-limiting queue & local file cache
│   │   └── mockData.ts        # Grounded FlytBase account intelligence
│   └── types/
│       └── crm.ts             # TypeScript interfaces for CRM schema
```

---

## 📋 Evaluation Rubric Alignment

- **Answers the five:** All 5 core questions are explicitly answered for both accounts.
- **Numbers you can back:** Every revenue figure cites an exact file or person ID (e.g. `file_contract_mpa_2025`, `person_deputy_miller`).
- **Ranked, owned & dated first moves:** Actions are ranked (#1, #2, #3), assigned to clear owners, and tied to hard dates.
- **Honest about gaps:** Gaps are transparently cataloged with concrete questions to ask.
- **Stays live:** Connects to live signals and supports write-back notes.
