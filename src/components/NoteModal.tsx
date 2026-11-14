'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { X, Check } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
  defaultAccount?: AccountId;
  defaultTitle?: string;
  defaultText?: string;
  isDark?: boolean;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onNoteAdded,
  defaultAccount = 'A',
  defaultTitle = '',
  defaultText = '',
  isDark = false,
}) => {
  const [account, setAccount] = useState<string>(defaultAccount);
  const [kind, setKind] = useState<'note' | 'task' | 'risk' | 'next_step'>('note');
  const [title, setTitle] = useState(defaultTitle);
  const [text, setText] = useState(defaultText);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ account, kind, title, text }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage('Recorded locally and dispatched upstream.');
        setTimeout(() => {
          onNoteAdded();
          onClose();
          setTitle('');
          setText('');
          setStatusMessage(null);
        }, 1000);
      } else {
        setStatusMessage(`Error: ${data.error}`);
      }
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`border rounded w-full max-w-md p-5 shadow-2xl relative font-mono text-xs ${
        isDark ? 'bg-[#090a0d] border-[#2a2f38] text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 transition ${
            isDark ? 'text-[#666] hover:text-white' : 'text-gray-400 hover:text-black'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        <h3 className="text-sm font-bold uppercase tracking-wider mb-1">Log Note // Action</h3>
        <p className={`text-[11px] mb-4 ${isDark ? 'text-[#777]' : 'text-gray-500'}`}>
          Direct dispatch to Questathon <code className="font-bold">write_note</code> tool.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={`block text-[10px] uppercase mb-1 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>Target Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className={`w-full border rounded p-2 text-xs focus:outline-none ${
                  isDark ? 'bg-black border-[#222] text-white focus:border-white' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
                }`}
              >
                <option value="A">Acc A (Eastern Counties)</option>
                <option value="B">Acc B (Aldermoor)</option>
              </select>
            </div>

            <div>
              <label className={`block text-[10px] uppercase mb-1 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>Category</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as any)}
                className={`w-full border rounded p-2 text-xs focus:outline-none ${
                  isDark ? 'bg-black border-[#222] text-white focus:border-white' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
                }`}
              >
                <option value="next_step">Next Step</option>
                <option value="task">Action Item</option>
                <option value="risk">Risk Flag</option>
                <option value="note">General Note</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-[10px] uppercase mb-1 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Confirm 5 Dec training schedule"
              className={`w-full border rounded p-2 text-xs focus:outline-none ${
                isDark ? 'bg-black border-[#222] text-white focus:border-white' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
              }`}
            />
          </div>

          <div>
            <label className={`block text-[10px] uppercase mb-1 ${isDark ? 'text-[#888]' : 'text-gray-500'}`}>Details</label>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Specify stakeholder, deadline, or citation..."
              className={`w-full border rounded p-2 text-xs focus:outline-none ${
                isDark ? 'bg-black border-[#222] text-white focus:border-white' : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-black'
              }`}
              required
            />
          </div>

          {statusMessage && (
            <div className={`text-[11px] p-2 rounded border flex items-center gap-1.5 ${
              isDark ? 'border-[#333] bg-black text-white' : 'border-gray-300 bg-gray-50 text-gray-900'
            }`}>
              <Check className="w-3.5 h-3.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className={`flex justify-end gap-2 pt-2 border-t ${isDark ? 'border-[#1a1c22]' : 'border-gray-100'}`}>
            <button
              type="button"
              onClick={onClose}
              className={`px-3 py-1.5 rounded text-[11px] uppercase border transition ${
                isDark ? 'border-[#222] text-[#888] hover:text-white' : 'border-gray-200 text-gray-600 hover:text-black'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-3 py-1.5 rounded text-[11px] uppercase font-semibold transition disabled:opacity-50 ${
                isDark ? 'bg-white text-black hover:bg-[#e0e0e0]' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
