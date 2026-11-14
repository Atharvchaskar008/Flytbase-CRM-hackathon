'use client';

import React, { useState } from 'react';
import { AccountId } from '../types/crm';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNoteAdded: () => void;
  defaultAccount?: AccountId;
  defaultTitle?: string;
  defaultText?: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onNoteAdded,
  defaultAccount = 'A',
  defaultTitle = '',
  defaultText = '',
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
        setStatusMessage('Note saved locally and dispatched to upstream API.');
        setTimeout(() => {
          onNoteAdded();
          onClose();
          setTitle('');
          setText('');
          setStatusMessage(null);
        }, 1200);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold text-white mb-1">Write Note to CRM & Upstream API</h3>
        <p className="text-xs text-slate-400 mb-4">
          Recorded in your local store and forwarded upstream using <code className="text-sky-300">write_note</code>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Account</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="A">Account A (Metro Police Alliance)</option>
                <option value="B">Account B (Apex Industrial)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={kind}
                onChange={(e) => setKind(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              >
                <option value="next_step">Next Step</option>
                <option value="task">Action Item / Task</option>
                <option value="risk">Risk Flag</option>
                <option value="note">General Note</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Discuss Dock 2 heating waiver with Neel"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Content / Observation</label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Provide concrete details, stakeholder quotes, or receipt citations..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          {statusMessage && (
            <div className="text-xs p-2.5 rounded bg-sky-950/60 border border-sky-800 text-sky-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>{statusMessage}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Save Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
