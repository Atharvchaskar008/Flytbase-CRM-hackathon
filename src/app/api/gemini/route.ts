import { NextResponse } from 'next/server';
import { generateGeminiSynthesis } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await generateGeminiSynthesis({
      topic: body.topic || 'Customer Relationship & Fleet Health',
      context: body.context || 'General account review',
      stakeholder: body.stakeholder,
      account: body.account,
      goal: body.goal,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error('Gemini API Handler error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to synthesize with Gemini' },
      { status: 500 }
    );
  }
}
