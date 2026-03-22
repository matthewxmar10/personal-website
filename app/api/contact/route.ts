import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple email-format guard (not a full RFC 5322 parser — fine for a contact form)
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** HTML-encode the five XML special characters to prevent injection in email body. */
function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

export async function POST(req: NextRequest) {
  // ── Rate limiting — 3 submissions per IP per hour ─────────────────────
  const ip      = getClientIp(req);
  const allowed = rateLimit(`contact:${ip}`, 3, 60 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests — please wait before sending another message.' },
      { status: 429 },
    );
  }

  try {
    const body = await req.json();

    const rawName    = String(body.name    ?? '').trim();
    const rawEmail   = String(body.email   ?? '').trim();
    const rawSubject = String(body.subject ?? '').trim();
    const rawMessage = String(body.message ?? '').trim();

    // ── Required field validation ──────────────────────────────────────
    if (!rawEmail || !rawMessage) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 },
      );
    }

    // ── Email format validation ────────────────────────────────────────
    if (!EMAIL_RE.test(rawEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    // ── Length validation ──────────────────────────────────────────────
    if (rawName.length > 100) {
      return NextResponse.json({ error: 'Name must be 100 characters or fewer.' }, { status: 400 });
    }
    if (rawEmail.length > 254) {   // RFC 5321 maximum
      return NextResponse.json({ error: 'Email address is too long.' }, { status: 400 });
    }
    if (rawSubject.length > 200) {
      return NextResponse.json({ error: 'Subject must be 200 characters or fewer.' }, { status: 400 });
    }
    if (rawMessage.length > 5000) {
      return NextResponse.json({ error: 'Message must be 5,000 characters or fewer.' }, { status: 400 });
    }

    // ── Sanitize all user-supplied strings before inserting into HTML ──
    const senderName   = escapeHtml(rawName)   || 'Anonymous';
    const safeEmail    = escapeHtml(rawEmail);
    const emailSubject = escapeHtml(rawSubject) || `Message from ${senderName}`;
    // Convert newlines → <br> for readability in the email body
    const safeMessage  = escapeHtml(rawMessage).replace(/\n/g, '<br>');

    await resend.emails.send({
      from:    'Contact Form <onboarding@resend.dev>',
      to:      'matthewxmar10@gmail.com',
      // Use raw (unescaped) values for email headers — Resend handles encoding
      subject: rawSubject || `Message from ${rawName || 'Anonymous'}`,
      replyTo: rawEmail,
      html: `
        <div style="font-family: monospace; max-width: 600px; color: #333;">
          <h2 style="margin-bottom: 1rem;">New message from your website</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="padding: 0.4rem 0.75rem 0.4rem 0; color: #666; white-space: nowrap; vertical-align: top;"><strong>Name</strong></td>
              <td style="padding: 0.4rem 0;">${senderName}</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem 0.75rem 0.4rem 0; color: #666; white-space: nowrap; vertical-align: top;"><strong>Email</strong></td>
              <td style="padding: 0.4rem 0;">${safeEmail}</td>
            </tr>
            <tr>
              <td style="padding: 0.4rem 0.75rem 0.4rem 0; color: #666; white-space: nowrap; vertical-align: top;"><strong>Subject</strong></td>
              <td style="padding: 0.4rem 0;">${emailSubject}</td>
            </tr>
          </table>
          <hr style="margin: 1rem 0; border-color: #eee;">
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact] send error:', err);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 },
    );
  }
}
