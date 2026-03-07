'use client';

import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';


const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Placeholder content — will be driven by MDX files later
const PLACEHOLDER_CONTENT = `Today was one of those days where everything seemed to click. Started the morning with coffee and some reading, then spent a few hours working on music.

There's something meditative about the process of layering sounds — you start with nothing and slowly, a mood emerges. I didn't finish the track, but I got further than I expected.

In the evening, caught up with some old friends online. The kind of easy conversation that reminds you what matters.`;

export default function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  // In real implementation: read from /content/journal/[slug].mdx
  // For now, show a placeholder
  const slugValue = 'entry'; // Will come from params in real impl

  void params; // used later when MDX is connected

  const date = new Date();
  const dayName = DAYS[date.getDay()];
  const formatted = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>
        {/* Back link */}
        <div style={{ padding: '2rem 0 1.5rem' }}>
          <Link
            href="/profile/journal"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#444444',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#00E5FF')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444444')}
          >
            ← Back to Journal
          </Link>
        </div>

        {/* Date header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444444', marginBottom: '0.4rem' }}>
            {dayName}
          </div>
          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 500, letterSpacing: '-0.02em', color: '#E8E6E1', margin: 0 }}>
            {formatted}
          </h1>
          <div style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#333333', letterSpacing: '0.06em' }}>
            Entry #{slugValue}
          </div>
        </div>

        <div className="divider" />

        {/* Content */}
        <div className="prose">
          {PLACEHOLDER_CONTENT.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="divider" />

        {/* Nav between entries */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn" style={{ fontSize: '0.68rem' }}>← Previous day</button>
          <button className="btn" style={{ fontSize: '0.68rem' }}>Next day →</button>
        </div>
      </div>
    </PageTransition>
  );
}
