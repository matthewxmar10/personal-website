import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required.' },
        { status: 400 },
      );
    }

    const senderName    = name?.trim()    || 'Anonymous';
    const emailSubject  = subject?.trim() || `Message from ${senderName}`;
    const safeMessage   = String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    await resend.emails.send({
      from:    'Contact Form <onboarding@resend.dev>',
      to:      'matthewxmar10@gmail.com',
      subject: emailSubject,
      replyTo: email,
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
              <td style="padding: 0.4rem 0;">${email}</td>
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
