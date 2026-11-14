'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { X, Copy, Check, FileText } from 'lucide-react';

interface MondayBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Record<AccountId, AccountDetail>;
}

export const MondayBriefModal: React.FC<MondayBriefModalProps> = ({
  isOpen,
  onClose,
  accounts,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateMarkdown = () => {
    let md = `# FlytBase CSM Executive Brief: Monday Morning 9:00 AM Portfolio Review\n\n`;
    md += `**Date:** November 17, 2026\n`;
    md += `**Author:** Customer Success Manager\n`;
    md += `**Scope:** Metropolitan Police Alliance (Account A) & Apex Industrial Resources (Account B)\n\n`;
    md += `---\n\n`;

    Object.values(accounts).forEach((acc) => {
      md += `## Account ${acc.id}: ${acc.name}\n`;
      md += `*Fleet Deployment:* ${acc.sold}\n`;
      md += `*Current ARR:* $${acc.contractValue.toLocaleString()} | *Expansion Pipeline:* $${acc.expansionPotential.toLocaleString()}\n\n`;

      md += `### 1. What is the book worth?\n`;
      acc.deals.forEach(d => {
        md += `- **${d.title}**: $${d.verifiedValue.toLocaleString()} (Verified: ${d.isVerified ? 'YES' : 'NO'}, Confidence: ${d.confidenceScore}%)\n`;
        md += `  - *Receipt Citations:* ${d.citations.join(', ')}\n`;
        md += `  - *Active Blocker:* ${d.blockerReason}\n`;
      });
      md += `\n`;

      md += `### 2. Who holds the power?\n`;
      acc.people.forEach(p => {
        const roles = [
          p.isDecisionMaker ? 'Decider' : '',
          p.isPayer ? 'Payer' : '',
          p.isBlocker ? 'Blocker' : '',
          p.isChampion ? 'Champion' : '',
          p.isUser ? 'User' : '',
        ].filter(Boolean).join(', ');
        md += `- **${p.name}** (${p.role}): ${roles} | Tone: **${p.band.toUpperCase()}** (${p.trustScore}%)\n`;
        if (p.keyConcerns) md += `  - *Key Hurdle:* ${p.keyConcerns}\n`;
      });
      md += `\n`;

      md += `### 3. What do you do first? (Monday Actions)\n`;
      acc.actions.forEach(a => {
        md += `${a.rank}. **${a.title}**\n`;
        md += `   - *Owner:* ${a.owner} | *Deadline:* ${a.deadline}\n`;
        md += `   - *Business Justification:* ${a.businessReason}\n`;
        md += `   - *Evidence Needed:* ${a.evidenceNeeded.join(', ')}\n`;
      });
      md += `\n`;

      md += `### 4. What is about to go wrong? (Risk Radar)\n`;
      acc.risks.forEach(r => {
        md += `- **[${r.severity.toUpperCase()}] ${r.title}** (Cutoff: ${r.deadlineDate}, ${r.daysRemaining} days left)\n`;
        md += `  - *Consequence:* ${r.consequence}\n`;
        md += `  - *Mitigation:* ${r.mitigationPlan}\n`;
      });
      md += `\n`;

      md += `### 5. What do you still not know? (Blind Spots)\n`;
      acc.blindSpots.forEach(b => {
        md += `- **Unknown:** ${b.question}\n`;
        md += `  - *Why it matters:* ${b.whyItMatters}\n`;
        md += `  - *Who to ask:* ${b.whoCouldAnswer}\n`;
      });
      md += `\n---\n\n`;
    });

    return md;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-sky-400" />
              <span>Monday Morning Executive Brief (Handover Memo)</span>
            </h3>
            <p className="text-xs text-slate-400">
              The 5 core questions formatted for your manager and executive review.
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition shadow"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy for Google Doc'}</span>
          </button>
        </div>

        {/* Content Preview */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 font-mono text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
          <pre className="whitespace-pre-wrap">{generateMarkdown()}</pre>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
