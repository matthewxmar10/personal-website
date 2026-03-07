'use client';

import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';


const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Placeholder entries — replace with real MDX-driven data later
const PLACEHOLDER_ENTRIES = [
  { slug: '2024-12-25', date: '2024-12-25', excerpt: 'A quiet Christmas morning. Coffee was good. Started sketching ideas for a new project that\'s been bouncing around in my head.' },
  { slug: '2024-12-24', date: '2024-12-24', excerpt: 'Got to spend time with family. Remembered why the holidays matter.' },
  { slug: '2024-12-23', date: '2024-12-23', excerpt: 'Long day but productive. Finished a track I\'ve been working on for weeks. It\'s not perfect, but it\'s done.' },
  { slug: '2024-12-22', date: '2024-12-22', excerpt: 'Read for a few hours. Something about slow mornings makes ideas flow better.' },
  { slug: '2024-12-21', date: '2024-12-21', excerpt: 'Gaming session with some friends online. Haven\'t laughed that hard in a while.' },
  { slug: '2024-12-20', date: '2024-12-20', excerpt: 'Worked on some content stuff. The algorithm is a mysterious beast.' },
  { slug: '2024-12-19', date: '2024-12-19', excerpt: 'Auditioned for something interesting. Waiting is the hardest part.' },
];

function EntryRow({ slug, date, excerpt }: { slug: string; date: string; excerpt: string }) {
  const d = new Date(date + 'T00:00:00');
  const dayName = DAYS[d.getDay()];
  const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <ScrollReveal>
      <article>
        <Link
          href={`/profile/journal/${slug}`}
          aria-label={`Journal entry — ${formatted}: ${excerpt.slice(0, 60)}…`}
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <div
            className="glow-border"
            style={{
              padding: '1.25rem 1.5rem',
              background: 'var(--c-surface)',
              borderRadius: '2px',
              display: 'grid',
              gridTemplateColumns: '120px 1fr',
              gap: '1.5rem',
              alignItems: 'start',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
          >
            <div>
              <div aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', marginBottom: '2px' }}>
                {dayName}
              </div>
              <time
                dateTime={date}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-muted)', display: 'block' }}
              >
                {formatted}
              </time>
            </div>

            <p style={{ color: 'var(--c-text-sub)', fontSize: '0.88rem', lineHeight: 1.65, margin: 0 }}>
              {excerpt}
            </p>
          </div>
        </Link>
      </article>
    </ScrollReveal>
  );
}

export default function JournalPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Journal"
          subtitle="Short thoughts, daily moments, and whatever's on my mind."
          breadcrumbs={[{ label: 'Profile', href: '/profile/about' }, { label: 'Journal', href: '/profile/journal' }]}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {PLACEHOLDER_ENTRIES.map((entry) => (
            <EntryRow key={entry.slug} {...entry} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <nav aria-label="Journal pagination" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' }}>
          {['1', '2', '3', '4', '5'].map((p, i) => (
            <button
              key={p}
              className="btn"
              aria-label={`Page ${p}`}
              aria-current={i === 0 ? 'page' : undefined}
              style={{
                minWidth: '36px',
                color: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)',
                borderColor: i === 0 ? 'rgba(var(--c-accent-rgb), 0.4)' : 'var(--c-border)',
              }}
            >
              {p}
            </button>
          ))}
        </nav>
      </div>
    </PageTransition>
  );
}
