// ⚠️  This page is intentionally not indexed and not linked in the nav.
// Accessible only via the Chaos Emerald Easter egg.

import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Secret — Matthew',
  description: 'For those who found all seven.',
  robots: { index: false, follow: false },
};

// ── Tiny gem SVG (server-safe) ────────────────────────────────────────────────

function StaticGem({ color }: { color: string }) {
  return (
    <svg width="28" height="32" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      <polygon points="24,2 4,16 24,22"  fill={color} fillOpacity="0.72" />
      <polygon points="24,2 44,16 24,22" fill={color} fillOpacity="0.92" />
      <polygon points="4,16 44,16 24,22" fill="currentColor" fillOpacity="0.12" />
      <polygon points="4,16 24,22 24,54" fill={color} fillOpacity="0.62" />
      <polygon points="44,16 24,22 24,54" fill={color} fillOpacity="0.88" />
      <polygon points="24,2 32,11 24,15 16,11" fill="currentColor" fillOpacity="0.25" />
    </svg>
  );
}

// ── Placeholder card ──────────────────────────────────────────────────────────

function ComingSoonCard({ emoji, title, description }: { emoji: string; title: string; description: string }) {
  return (
    <div style={{
      background: 'var(--c-surface)',
      border: '1px solid var(--c-border)',
      borderRadius: '2px',
      padding: '1.75rem',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{emoji}</div>
      <h3 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--c-text)',
        marginBottom: '0.5rem',
      }}>
        {title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.85rem',
        color: 'var(--c-muted)',
        lineHeight: 1.6,
        marginBottom: '1rem',
      }}>
        {description}
      </p>
      <span style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#B8860B',             /* dark goldenrod — visible in both themes */
        border: '1px solid rgba(184,134,11,0.35)',
        borderRadius: '2px',
        padding: '0.2rem 0.6rem',
        background: 'rgba(184,134,11,0.07)',
      }}>
        Coming Soon
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const EMERALD_COLORS = ['#00FFEE', '#CC44FF', '#FF3355', '#FFE000', '#4488FF', '#33FF77', '#CCDDED'];

export default function SecretPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--c-bg)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '80px',
      paddingBottom: '4rem',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    }}>
      <div style={{ maxWidth: '680px', width: '100%', textAlign: 'center' }}>

        {/* Gem row */}
        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}
          aria-label="All 7 Chaos Emeralds"
        >
          {EMERALD_COLORS.map((c) => (
            <StaticGem key={c} color={c} />
          ))}
        </div>

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--c-muted)',
          marginBottom: '0.6rem',
        }}>
          Inner Circle · All 7 Collected
        </p>

        {/* Headline — gold stays gold in both themes */}
        <h1 style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
          fontWeight: 700,
          color: '#B8860B',
          textShadow: '0 0 20px rgba(184,134,11,0.35), 0 0 40px rgba(184,134,11,0.18)',
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          lineHeight: 1.2,
        }}>
          Welcome, Chaos Master.
        </h1>

        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          color: 'var(--c-text-sub)',
          lineHeight: 1.75,
          maxWidth: '48ch',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '3rem',
        }}>
          You found every last emerald. Not many make it this far.
          As a reward, here are a few things made exclusively for people like you.
        </p>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(184,134,11,0.35) 30%, rgba(184,134,11,0.35) 70%, transparent)',
          marginBottom: '3rem',
        }} />

        {/* Placeholder cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          <ComingSoonCard
            emoji="🎮"
            title="Secret Games"
            description="A handful of mini-games built just for those who made it here. I'll be adding these soon."
          />
          <ComingSoonCard
            emoji="👕"
            title="Limited Edition"
            description="A very limited run of merch — available only through this page. Design in progress."
          />
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="hover-accent"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--c-muted)',
            textDecoration: 'none',
          }}
        >
          ← Back to site
        </Link>

      </div>
    </div>
  );
}
