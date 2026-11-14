'use client';

import React from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, FileText, CheckCircle2, User, Clock } from 'lucide-react';

export interface DetailModalData {
  type: 'action' | 'stakeholder' | 'deal' | 'risk' | 'blindspot';
  title: string;
  account: string;
  subtitle?: string;
  badge?: string;
  stats?: { label: string; value: string | number; color?: string }[];
  description: string;
  impactOrOutcome?: string;
  citations?: string[];
  ctaText?: string;
  onCtaClick?: () => void;
  onCitationClick?: (citationId: string) => void;
}

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DetailModalData | null;
  theme: 'light' | 'dark';
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  isOpen,
  onClose,
  data,
  theme,
}) => {
  if (!isOpen || !data) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-2xl rounded-2xl border p-6 md:p-8 shadow-2xl relative font-sans transition-all max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-[#0b0d10] border-gray-800 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-lg border transition ${
            isDark ? 'border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-500 hover:text-black'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
            data.type === 'action' ? 'bg-violet-100 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300' :
            data.type === 'stakeholder' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' :
            data.type === 'deal' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' :
            data.type === 'risk' ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300' :
            'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
          }`}>
            {data.badge || data.type}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
            isDark ? 'border-gray-800 text-gray-400' : 'border-gray-200 text-gray-600'
          }`}>
            Account: {data.account === 'A' ? 'Eastern Counties Police' : data.account === 'B' ? 'Aldermoor Industrial' : data.account}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold tracking-tight mb-2 pr-8 leading-snug">
          {data.title}
        </h2>
        {data.subtitle && (
          <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {data.subtitle}
          </p>
        )}

        {/* High-Level Stats Bar if available */}
        {data.stats && data.stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {data.stats.map((stat, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border ${
                  isDark ? 'border-gray-800 bg-[#101317]' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {stat.label}
                </div>
                <div className={`text-lg font-bold font-mono mt-0.5 ${stat.color || ''}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive Description */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Operational Context & Analysis
            </h4>
            <div className={`text-base leading-relaxed p-4 rounded-xl border ${
              isDark ? 'border-gray-800/80 bg-[#0e1014] text-gray-200' : 'border-gray-200 bg-gray-50/70 text-gray-800'
            }`}>
              {data.description}
            </div>
          </div>

          {data.impactOrOutcome && (
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Expected Outcome / Business Impact
              </h4>
              <div className={`text-sm leading-relaxed p-4 rounded-xl border ${
                isDark ? 'border-gray-800 bg-black text-gray-300' : 'border-gray-200 bg-white text-gray-700'
              }`}>
                {data.impactOrOutcome}
              </div>
            </div>
          )}
        </div>

        {/* Ground Truth Citations */}
        {data.citations && data.citations.length > 0 && (
          <div className="mb-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Verified Evidence & Ground Truth Citations
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.citations.map((cite) => (
                <button
                  key={cite}
                  onClick={() => {
                    onClose();
                    data.onCitationClick?.(cite);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition ${
                    isDark 
                      ? 'border-gray-800 bg-[#12151a] hover:bg-gray-800 text-gray-300 hover:text-white' 
                      : 'border-gray-200 bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{cite}</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition ${
              isDark ? 'border-gray-800 hover:bg-gray-800 text-gray-300' : 'border-gray-200 hover:bg-gray-100 text-gray-700'
            }`}
          >
            Close
          </button>

          {data.ctaText && (
            <button
              onClick={() => {
                data.onCtaClick?.();
                onClose();
              }}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm ${
                isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {data.ctaText}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
