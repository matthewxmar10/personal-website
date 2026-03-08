'use client';

import PageHeader from './PageHeader';
import PageTransition from './PageTransition';
import ScrollReveal from './ScrollReveal';

// ── Platform icons ─────────────────────────────────────────────────────────────

function PlatformIcon({ role }: { role?: string }) {
  const r = role?.toLowerCase();

  if (r === 'youtube') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF0000" aria-label="YouTube" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );

  if (r === 'twitch') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#9146FF" aria-label="Twitch" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
    </svg>
  );

  if (r === 'tiktok') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#E8E6E1" aria-label="TikTok" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );

  if (r === 'instagram') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#E1306C" aria-label="Instagram" style={{ flexShrink: 0, display: 'block' }}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
    </svg>
  );

  return null;
}

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
  reelSectionTitle?: string;   // small heading shown above the video player
  reelSrc?: string;            // YouTube embed URL — shows real player when provided
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
  reelSectionTitle,
  reelSrc,
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

        {/* Reel section */}
        <ScrollReveal>
          {/* Optional heading above the player */}
          {reelSectionTitle && (
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#444444',
              marginBottom: '1rem',
              marginTop: 0,
            }}>
              {reelSectionTitle}
            </h2>
          )}

          {reelSrc ? (
            /* Real video embed */
            <div style={{
              width: '100%',
              aspectRatio: '16/9',
              marginBottom: '3rem',
              border: '1px solid #1E1E1E',
              borderRadius: '2px',
              overflow: 'hidden',
            }}>
              <iframe
                src={reelSrc}
                title={reelSectionTitle ?? reelLabel}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              />
            </div>
          ) : (
            /* Placeholder */
            <div style={{
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
            }}>
              <div style={{ fontSize: '2rem', opacity: 0.3 }}>▶</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333333' }}>
                {reelLabel} — Coming Soon
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: '#2A2A2A', textAlign: 'center', maxWidth: '300px' }}>
                Replace this with a YouTube/Vimeo embed URL
              </p>
            </div>
          )}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <PlatformIcon role={credit.role} />
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
