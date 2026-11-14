import { NextResponse } from 'next/server';
import { getLocalStore } from '@/lib/cache';
import { AutonomousCSMAgentNetwork } from '@/lib/agents';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const store = getLocalStore();
    const insights = AutonomousCSMAgentNetwork.executeAll(store.accounts, store.signals);
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      agentCount: 3,
      insightsCount: insights.length,
      insights,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
