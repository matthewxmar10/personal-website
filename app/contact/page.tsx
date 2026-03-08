'use client';

import { useState } from 'react';
import PageHeader     from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal   from '@/components/ui/ScrollReveal';

const CONTACT_METHODS = [
  {
    label:       'Discord',
    value:       '@matthew1pg',
    description: 'Best for quick chats and community stuff.',
    href:        '#',
    icon:        '💬',
  },
  {
    label:       'Email',
    value:       'matthewxmar10@gmail.com',
    description: 'For longer conversations, collabs, or professional inquiries.',
    href:        'mailto:matthewxmar10@gmail.com',
    icon:        '✉️',
  },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<FormState>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrMsg(data.error || 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
        setName(''); setEmail(''); setSubject(''); setMessage('');
      }
    } catch {
      setErrMsg('Network error — please try again.');
      setStatus('error');
    }
  }

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>
        <PageHeader
          title="Contact"
          subtitle="Call me, beep me, if ya wanna reach me (just send a Discord message)"
          breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        />

        {/* Contact method cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {CONTACT_METHODS.map((method, i) => (
            <ScrollReveal key={method.label} delay={i * 0.08}>
              <a href={method.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="glow-border"
                  style={{
                    padding:               '1.5rem',
                    background:            'var(--c-surface)',
                    borderRadius:          '2px',
                    display:               'grid',
                    gridTemplateColumns:   'auto 1fr',
                    gap:                   '1.25rem',
                    alignItems:            'center',
                    transition:            'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{method.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>
                        {method.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--c-accent)' }}>
                        {method.value}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-muted)', margin: 0, lineHeight: 1.5 }}>
                      {method.description}
                    </p>
                  </div>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* Contact form */}
        <ScrollReveal delay={0.15}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '1.25rem', fontWeight: 500 }}>
            Or send a message
          </h2>

          {status === 'success' ? (
            <div style={{ padding: '1.5rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-accent)', margin: 0, letterSpacing: '0.04em' }}>
                ✓ Message sent — I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="What&apos;s this about?"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  placeholder="Say something..."
                  rows={5}
                  required
                  style={{ resize: 'vertical' }}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#FF6B6B', margin: 0 }}>
                  ✕ {errMsg}
                </p>
              )}

              <div>
                <button
                  type="submit"
                  className="btn btn-accent"
                  style={{ fontSize: '0.68rem', opacity: status === 'loading' ? 0.6 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send message →'}
                </button>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
