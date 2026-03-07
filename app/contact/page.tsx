'use client';

import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';


const CONTACT_METHODS = [
  {
    label: 'Discord',
    value: '@username',
    description: 'Best for quick chats and community stuff.',
    href: '#',
    icon: '💬',
  },
  {
    label: 'Email',
    value: 'hello@example.com',
    description: 'For longer conversations, collabs, or professional inquiries.',
    href: 'mailto:hello@example.com',
    icon: '✉️',
  },
];

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>
        <PageHeader
          title="Contact"
          subtitle="The best ways to reach me."
          breadcrumbs={[{ label: 'Contact', href: '/contact' }]}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {CONTACT_METHODS.map((method, i) => (
            <ScrollReveal key={method.label} delay={i * 0.08}>
              <a href={method.href} style={{ textDecoration: 'none', display: 'block' }}>
                <div
                  className="glow-border"
                  style={{
                    padding: '1.5rem',
                    background: '#111111',
                    borderRadius: '2px',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1.25rem',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{method.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444444' }}>
                        {method.label}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#00E5FF' }}>
                        {method.value}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#666666', margin: 0, lineHeight: 1.5 }}>
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
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem', fontWeight: 500 }}>
            Or send a message
          </h2>

          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="contact-name">Name</label>
                <input id="contact-name" type="text" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject">Subject</label>
              <input id="contact-subject" type="text" placeholder="What's this about?" />
            </div>
            <div>
              <label htmlFor="contact-message">Message</label>
              <textarea id="contact-message" placeholder="Say something..." rows={5} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <button type="submit" className="btn btn-accent" style={{ fontSize: '0.68rem' }}>
                Send message →
              </button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
