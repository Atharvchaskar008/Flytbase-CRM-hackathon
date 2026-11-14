import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACad2febb745cbcbc6d3c2bedec1a67fea';
    const authToken = process.env.TWILIO_AUTH_TOKEN || '394c12b633dd6b92e6dafd05aa7e915a';
    const fromPhone = body.from || process.env.TWILIO_FROM_PHONE || '+17372508034';
    const toPhone = body.to || process.env.TWILIO_TO_PHONE || '+919881898129';
    const callbackUrl = body.url || 'https://webhooks.twilio.com/v1/Voice/Template/voice_speech_recognition';

    if (!accountSid || !authToken) {
      return NextResponse.json(
        { success: false, error: 'Missing Twilio credentials in environment' },
        { status: 400 }
      );
    }

    const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Calls.json`;
    const creds = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

    const formParams = new URLSearchParams({
      To: toPhone,
      From: fromPhone,
      Url: callbackUrl,
    });

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    });

    const twilioData = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: twilioData.message || 'Twilio Call dispatch failed',
          code: twilioData.code,
        },
        { status: res.status }
      );
    }

    return NextResponse.json({
      success: true,
      sid: twilioData.sid,
      status: twilioData.status,
      to: twilioData.to,
      from: twilioData.from,
      direction: twilioData.direction,
      message: `Call dispatched successfully to ${twilioData.to} via Twilio!`,
    });
  } catch (err: any) {
    console.error('Twilio Call API Error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
