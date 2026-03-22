import { NextRequest, NextResponse } from 'next/server';
import { filterMessage, filterName } from '@/lib/profanity';
import { insertEntry, getEntries } from '@/lib/db';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') ?? '20', 10)));

    const data = getEntries(page, perPage);
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/guestbook error:', error);
    return NextResponse.json({ error: 'Failed to load entries.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // ── Rate limiting — 5 posts per IP per 10 minutes ─────────────────────
  const ip      = getClientIp(request);
  const allowed = rateLimit(`guestbook:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many submissions — please wait a few minutes before signing again.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim() || 'Anonymous';
    const message = String(body.message ?? '').trim();

    // Validate name
    const nameCheck = filterName(name);
    if (!nameCheck.allowed) {
      return NextResponse.json({ error: nameCheck.reason }, { status: 400 });
    }

    // Validate message
    const messageCheck = filterMessage(message);
    if (!messageCheck.allowed) {
      return NextResponse.json({ error: messageCheck.reason }, { status: 400 });
    }

    const entry = insertEntry({ name, message });
    return NextResponse.json({ entry }, { status: 201 });
  } catch (error) {
    console.error('POST /api/guestbook error:', error);
    return NextResponse.json({ error: 'Failed to save entry.' }, { status: 500 });
  }
}
