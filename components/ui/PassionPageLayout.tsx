'use client';

import PageHeader from './PageHeader';
import PageTransition from './PageTransition';
import ScrollReveal from './ScrollReveal';

interface Credit {
  title: string;
  role?: string;
  year?: string;
  link?: string;
}

interface PassionPageLayoutProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  reelLabel?: string;
  credits?: Credit[];
  creditsSectionTitle?: string;
  extraContent?: React.ReactNode;
}

export default function PassionPageLayout({
  title,
  subtitle,
  breadcrumbLabel,
  breadcrumbHref,
  reelLabel = 'Sizzle Reel',
  credits = [],
  creditsSectionTitle = 'Credits',
  extraContent,
}: PassionPageLayoutProps) {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title={title}
          subtitle={subtitle}
          breadcrumbs={[
            { label: 'Passion', href: '/passion/acting' },
            { label: breadcrumbLabel, href: breadcrumbHref },
          ]}
        />

        {/* Reel embed */}
        <ScrollReveal>
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              background: '#111111',
              border: '1px solid #1E1E1E',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '3rem',
            }}
          >
            <div style={{ fontSize: '2rem', opacity: 0.3 }}>▶</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333333' }}>
              {reelLabel} — Coming Soon
            </div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#2A2A2A', textAlign: 'center', maxWidth: '300px' }}>
              Replace this with a YouTube/Vimeo embed URL
            </p>
          </div>
        </ScrollReveal>

        {/* Extra content (links, gaming profiles, etc.) */}
        {extraContent && (
          <ScrollReveal delay={0.05}>
            <div style={{ marginBottom: '3rem' }}>
              {extraContent}
            </div>
          </ScrollReveal>
        )}

        {/* Credits list */}
        {credits.length > 0 && (
          <ScrollReveal delay={0.1}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem' }}>
              {creditsSectionTitle}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {credits.map((credit, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.85rem 1.25rem',
                    background: '#111111',
                    border: '1px solid #1E1E1E',
                    borderRadius: '2px',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.2)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = '#1E1E1E')}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#E8E6E1', marginBottom: '2px' }}>
                      {credit.link ? (
                        <a href={credit.link} target="_blank" rel="noopener noreferrer" style={{ color: '#00E5FF', textDecoration: 'none' }}>
                          {credit.title} ↗
                        </a>
                      ) : credit.title}
                    </div>
                    {credit.role && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#555555', letterSpacing: '0.06em' }}>
                        {credit.role}
                      </div>
                    )}
                  </div>
                  {credit.year && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444444', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                      {credit.year}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Placeholder credits */}
        {credits.length === 0 && (
          <ScrollReveal delay={0.1}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem' }}>
              {creditsSectionTitle}
            </h2>
            <div style={{ padding: '1.5rem', background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#333333', margin: 0, letterSpacing: '0.06em' }}>
                Credits coming soon.
              </p>
            </div>
          </ScrollReveal>
        )}
      </div>
    </PageTransition>
  );
}
