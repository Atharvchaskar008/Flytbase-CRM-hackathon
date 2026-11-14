'use client';

import React, { useState } from 'react';
import { AccountId, Note } from '../types/crm';
import { 
  FileEdit, 
  Plus, 
  Tag, 
  Trash2, 
  Pin, 
  Share2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MessageSquare,
  Clock
} from 'lucide-react';

interface SharedNoteArenaProps {
  notes: Note[];
  selectedAccount: AccountId | 'ALL';
  onAddNote: (note: { account: AccountId; kind: string; title: string; text: string }) => Promise<void>;
  isDark?: boolean;
}

export const SharedNoteArena: React.FC<SharedNoteArenaProps> = ({
  notes,
  selectedAccount,
  onAddNote,
  isDark = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  
  // New note form state
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newKind, setNewKind] = useState<'decision' | 'blocker' | 'next_step' | 'general'>('next_step');
  const [newAccount, setNewAccount] = useState<AccountId>(selectedAccount === 'ALL' ? 'A' : selectedAccount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-loaded team notes for rich collaborative simulation
  const initialTeamNotes: Note[] = [
    {
      id: 'arena_note_1',
      account: 'A',
      title: 'Handover Strategy Meeting with Marcus Hayes',
      kind: 'next_step',
      text: 'Agreed on Friday: Chief Constable Marcus Hayes confirmed he wants FlytBase standardized across all 4 constabularies. When Rhys leaves in Jan, Karen Mbeki will co-chair the steering committee.',
      created_at: '2026-11-13T16:30:00Z',
    },
    {
      id: 'arena_note_2',
      account: 'B',
      title: 'Plant Manager Alignment: Stallingborough Cost Relief',
      kind: 'blocker',
      text: 'Delivered site flight logs to Nadia. She showed the plant manager that drone inspections saved £80k in contractor scaffolding this quarter. Stallingborough withdrew their budget complaint!',
      created_at: '2026-11-14T09:15:00Z',
    },
    {
      id: 'arena_note_3',
      account: 'A',
      title: '300-Dock Framework Tender: Derek Finch Unit Economics',
      kind: 'decision',
      text: 'Derek Finch confirmed our £1,000/dock/month model meets public procurement threshold. We are officially cleared to submit the full tender response by Day 25.',
      created_at: '2026-11-14T11:00:00Z',
    },
  ];

  const allNotes = [...initialTeamNotes, ...notes];

  const filteredNotes = allNotes.filter(n => {
    const matchesAccount = selectedAccount === 'ALL' || n.account === selectedAccount;
    const matchesCategory = activeCategory === 'ALL' || n.kind === activeCategory;
    const matchesSearch = (n.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (n.text || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAccount && matchesCategory && matchesSearch;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setIsSubmitting(true);
    try {
      await onAddNote({
        account: newAccount,
        kind: newKind,
        title: newTitle.trim() || 'Team Collaboration Note',
        text: newText.trim(),
      });
      setNewTitle('');
      setNewText('');
      setIsCreating(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Explainer Box */}
      <div className={`p-6 rounded-2xl border ${
        isDark ? 'border-gray-800 bg-[#0a0c0f]' : 'border-gray-300 bg-white shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
                <FileEdit className="w-5 h-5" />
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                Shared Team Note Arena & Collaborative Board
              </h3>
            </div>
            <p className={`text-xs font-medium max-w-2xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              A live collaborative workspace where Customer Success Managers, Field Engineers, and Account Executives share updates, pin meeting takeaways, and coordinate client strategies.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-sm shrink-0 ${
              isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Write New Note</span>
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            {['ALL', 'next_step', 'decision', 'blocker'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg border transition ${
                  activeCategory === cat
                    ? isDark ? 'bg-white text-black' : 'bg-black text-white'
                    : isDark ? 'border-gray-700 text-gray-300 hover:text-white' : 'border-gray-300 text-gray-700 hover:text-black'
                }`}
              >
                {cat === 'ALL' ? 'All Notes' : cat === 'next_step' ? 'Action Notes' : cat === 'decision' ? 'Decisions Made' : 'Friction / Blockers'}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search team notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs border font-medium outline-none ${
                isDark 
                  ? 'border-gray-700 bg-[#0e1014] text-white' 
                  : 'border-gray-300 bg-gray-50 text-black'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Note Creation Form Modal / Card if triggered */}
      {isCreating && (
        <form 
          onSubmit={handleSubmit}
          className={`p-6 rounded-2xl border space-y-4 shadow-lg animate-fadeIn ${
            isDark ? 'border-purple-900 bg-[#120e18]' : 'border-purple-300 bg-purple-50/50'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-purple-200 dark:border-purple-900">
            <h4 className="font-bold text-sm text-black dark:text-white flex items-center gap-2">
              <FileEdit className="w-4 h-4 text-purple-600" />
              <span>Create Shared Note</span>
            </h4>
            <button 
              type="button" 
              onClick={() => setIsCreating(false)}
              className="text-xs text-gray-500 hover:text-black dark:hover:text-white font-semibold"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold block mb-1 text-black dark:text-white">Note Title</label>
              <input
                type="text"
                placeholder="e.g. Call with Rhys regarding handover..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs border font-semibold outline-none ${
                  isDark ? 'border-gray-700 bg-black text-white' : 'border-gray-300 bg-white text-black'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold block mb-1 text-black dark:text-white">Account</label>
                <select
                  value={newAccount}
                  onChange={(e) => setNewAccount(e.target.value as AccountId)}
                  className={`w-full p-2.5 rounded-xl text-xs border font-semibold outline-none ${
                    isDark ? 'border-gray-700 bg-black text-white' : 'border-gray-300 bg-white text-black'
                  }`}
                >
                  <option value="A">Police Alliance (A)</option>
                  <option value="B">Aldermoor Industrial (B)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold block mb-1 text-black dark:text-white">Category</label>
                <select
                  value={newKind}
                  onChange={(e) => setNewKind(e.target.value as any)}
                  className={`w-full p-2.5 rounded-xl text-xs border font-semibold outline-none ${
                    isDark ? 'border-gray-700 bg-black text-white' : 'border-gray-300 bg-white text-black'
                  }`}
                >
                  <option value="next_step">Action Note</option>
                  <option value="decision">Decision Made</option>
                  <option value="blocker">Blocker / Risk</option>
                  <option value="general">General Update</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold block mb-1 text-black dark:text-white">Note Content & Details</label>
            <textarea
              rows={3}
              placeholder="Write the notes, action items, or customer quotes..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className={`w-full p-2.5 rounded-xl text-xs border font-medium outline-none ${
                isDark ? 'border-gray-700 bg-black text-white' : 'border-gray-300 bg-white text-black'
              }`}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-300 dark:border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !newText.trim()}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              {isSubmitting ? 'Posting...' : 'Post to Shared Arena'}
            </button>
          </div>
        </form>
      )}

      {/* Collaborative Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note, idx) => {
          return (
            <div
              key={note.id || idx}
              className={`p-5 rounded-2xl border space-y-3 transition flex flex-col justify-between ${
                isDark 
                  ? 'border-gray-800 bg-[#0c0e12] hover:border-gray-700' 
                  : 'border-gray-300 bg-white hover:border-gray-500 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    note.kind === 'decision' ? 'bg-emerald-100 text-emerald-950 border border-emerald-300' :
                    note.kind === 'blocker' ? 'bg-red-100 text-red-950 border border-red-300' :
                    'bg-blue-100 text-blue-950 border border-blue-300'
                  }`}>
                    {note.kind.replace('_', ' ')}
                  </span>

                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    isDark ? 'border-gray-700 text-gray-300' : 'border-gray-300 text-black bg-gray-100'
                  }`}>
                    Account {note.account === 'A' ? 'A (Police)' : 'B (Aldermoor)'}
                  </span>
                </div>

                <h4 className={`text-base font-bold mb-1 leading-snug ${isDark ? 'text-white' : 'text-black'}`}>
                  {note.title || 'Team Update'}
                </h4>

                <p className={`text-xs font-medium leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  {note.text}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-gray-500 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(note.created_at || Date.now()).toLocaleDateString()}</span>
                </span>

                <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                  Shared Team Record
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
