'use client';

import React, { useState } from 'react';
import { AccountDetail, AccountId } from '../types/crm';
import { X, Copy, Check } from 'lucide-react';

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
    let md = `# FlytBase CSM Portfolio Review // Monday 9:00 AM\n\n`;
    md += `**Author:** Customer Success Lead\n`;
    md += `**Accounts:** Eastern Counties Police Alliance & Aldermoor Industrial Group\n\n`;

    Object.values(accounts).forEach((acc) => {
      md += `## Account ${acc.id}: ${acc.name}\n`;
      md += `*Fleet:* ${acc.sold}\n`;
      md += `*Verified ARR:* $${acc.contractValue.toLocaleString()} | *Pipeline:* $${acc.expansionPotential.toLocaleString()}\n\n`;

      md += `### 1. What is the book worth?\n`;
      acc.deals.forEach(d => {
        md += `- **${d.title}**: $${d.verifiedValue.toLocaleString()} (Verified: ${d.isVerified ? 'YES' : 'NO'}, Confidence: ${d.confidenceScore}%)\n`;
        md += `  - Receipts: ${d.citations.join(', ')}\n`;
        md += `  - Blocker: ${d.blockerReason}\n`;
      });
      md += `\n`;

      md += `### 2. Who holds the power?\n`;
      acc.people.forEach(p => {
        md += `- **${p.name}** (${p.role}): ${p.band.toUpperCase()} (${p.trustScore}% Trust)\n`;
        if (p.keyConcerns) md += `  - Focus: ${p.keyConcerns}\n`;
      });
      md += `\n`;

      md += `### 3. What do you do first?\n`;
      acc.actions.forEach(a => {
        md += `${a.rank}. **${a.title}** (Owner: ${a.owner}, Due: ${a.deadline})\n`;
        md += `   - Why: ${a.businessReason}\n`;
        md += `   - Evidence: ${a.evidenceNeeded.join(', ')}\n`;
      });
      md += `\n`;

      md += `### 4. What is about to go wrong?\n`;
      acc.risks.forEach(r => {
        md += `- [${r.severity.toUpperCase()}] ${r.title} (Cutoff: ${r.deadlineDate})\n`;
        md += `  - Threat: ${r.consequence}\n`;
        md += `  - Mitigation: ${r.mitigationPlan}\n`;
      });
      md += `\n`;

      md += `### 5. What do you still not know?\n`;
      acc.blindSpots.forEach(b => {
        md += `- ${b.question} (Ask: ${b.whoCouldAnswer})\n`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="bg-[#090a0d] border border-[#2a2f38] rounded w-full max-w-2xl max-h-[85vh] flex flex-col p-5 shadow-2xl relative font-mono text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#666] hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between pb-3 border-b border-[#1c2026] mb-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Monday Executive Brief // Handover Memo
            </h3>
            <p className="text-[11px] text-[#777]">Answers to the 5 core questions formatted for leadership.</p>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] uppercase font-semibold bg-white text-black hover:bg-[#e0e0e0] transition"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-2 bg-black p-3 rounded border border-[#1a1c22] text-[#bbb] text-[11px]">
          <pre className="whitespace-pre-wrap font-mono">{generateMarkdown()}</pre>
        </div>

        <div className="flex justify-end pt-3 border-t border-[#1c2026] mt-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-[11px] uppercase border border-[#222] text-[#888] hover:text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
