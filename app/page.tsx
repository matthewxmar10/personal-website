import WordCycler from '@/components/ui/WordCycler';
import PageTransition from '@/components/ui/PageTransition';
import HomeNav from '@/components/ui/HomeNav';

export default function HomePage() {
  return (
    <PageTransition>
      {/* Animated mesh background — themed via .homepage-bg in globals.css */}
      <div className="homepage-bg" />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '0 1.5rem',
          paddingTop: '56px',
        }}
      >
        {/* Greeting */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--c-muted)',
              marginBottom: '1.2rem',
            }}
          >
            welcome
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
              fontWeight: 500,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              margin: 0,
              color: 'var(--c-text)',
            }}
          >
            hi, i&apos;m{' '}
            <span
              style={{
                color: 'var(--c-accent)',
                textShadow: '0 0 20px rgba(var(--c-accent-rgb), 0.4), 0 0 40px rgba(var(--c-accent-rgb), 0.15)',
              }}
            >
              matthew
            </span>{' '}
            <span
              style={{
                display: 'inline-block',
                animation: 'wave 2.5s ease-in-out infinite',
                transformOrigin: '70% 70%',
              }}
            >
              👋
            </span>
          </h1>
        </div>

        {/* Word cycler */}
        <div style={{ marginBottom: '3rem' }}>
          <WordCycler />
        </div>

        {/* Brief blurb */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.85rem, 2vw, 1rem)',
            color: 'var(--c-muted)',
            maxWidth: '480px',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          A little bit of everything — exploring art, tech, and the spaces in between.
          Poke around and see what you find.
        </p>

        {/* Hierarchical nav widget */}
        <HomeNav />

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--c-border)',
            }}
          >
            scroll
          </div>
          <div
            style={{
              width: 1,
              height: 24,
              background: 'linear-gradient(to bottom, var(--c-border), transparent)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          20%  { transform: rotate(-15deg); }
          40%  { transform: rotate(10deg); }
          60%  { transform: rotate(-10deg); }
          80%  { transform: rotate(5deg); }
        }
      `}</style>
    </PageTransition>
  );
}
