import { NextResponse } from 'next/server';
import { getLocalStore, syncWithUpstream } from '@/lib/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shouldSync = searchParams.get('sync') === 'true';

  if (shouldSync) {
    const syncResult = await syncWithUpstream();
    return NextResponse.json({
      data: syncResult.store,
      synced: syncResult.synced,
      message: syncResult.message,
      hasToken: !!process.env.AQ_TOKEN,
    });
  }

  const store = getLocalStore();
  return NextResponse.json({
    data: store,
    synced: false,
    hasToken: !!process.env.AQ_TOKEN,
  });
}
