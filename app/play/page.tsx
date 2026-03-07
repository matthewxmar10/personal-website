import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';

export const metadata = { title: 'Play — Matthew' };

export default function PlayPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Play"
          subtitle="Games I build, tinker with, and ship for fun."
          breadcrumbs={[{ label: 'Play', href: '/play' }]}
        />

        <div
          style={{
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            background: '#111111',
            border: '1px solid #1E1E1E',
            borderRadius: '2px',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              color: '#00E5FF',
              textShadow: '0 0 20px rgba(0,229,255,0.4)',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          >
            🕹
          </div>

          <div>
            <h2
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '1.2rem',
                fontWeight: 500,
                color: '#E8E6E1',
                margin: '0 0 0.5rem',
              }}
            >
              Games site coming soon
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.88rem',
                color: '#555555',
                lineHeight: 1.7,
                maxWidth: '380px',
              }}
            >
              This will load a separate website for browser games I build and experiment with.
              Stay tuned.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: '#333333',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            <span>loading</span>
            <span style={{ animation: 'flicker 2s ease infinite' }}>...</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
