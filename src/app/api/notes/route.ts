import { NextResponse } from 'next/server';
import { getLocalStore, saveLocalStore } from '@/lib/cache';
import { postNote } from '@/lib/mcp';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account, kind = 'note', title = '', text } = body;

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Note text cannot be empty' }, { status: 400 });
    }

    const store = getLocalStore();
    const newNote = {
      id: `note_${Date.now()}`,
      account: account || 'A',
      kind: kind as any,
      title: title || 'CSM Note',
      text,
      created_at: new Date().toISOString(),
    };

    store.notes.unshift(newNote);
    saveLocalStore(store);

    let upstreamResult = null;
    if (process.env.AQ_TOKEN) {
      try {
        upstreamResult = await postNote({ account, kind, title, text });
      } catch (err: any) {
        console.warn('Could not post note upstream immediately:', err.message);
      }
    }

    return NextResponse.json({
      success: true,
      note: newNote,
      upstreamSynced: !!upstreamResult,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
