import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getJournalEntries } from '@/lib/markdown';

export const metadata = { title: 'Journal — Matthew' };

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function EntryRow({ slug, date, excerpt }: { slug: string; date: string; excerpt: string }) {
  const d        = new Date(date + 'T12:00:00');
  const dayName  = DAYS[d.getDay()];
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
            className="glow-border hover-lift"
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
          >
            <div>
              <div
                aria-hidden="true"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--c-muted)',
                  marginBottom: '2px',
                }}
              >
                {dayName}
              </div>
              <time
                dateTime={date}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--c-muted)',
                  display: 'block',
                }}
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
  const entries = getJournalEntries();

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Journal"
          subtitle="Short thoughts, daily moments, and whatever's on my mind."
          breadcrumbs={[
            { label: 'Profile', href: '/profile/about' },
            { label: 'Journal', href: '/profile/journal' },
          ]}
        />

        {entries.length === 0 ? (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--c-muted)',
            letterSpacing: '0.06em',
          }}>
            No entries yet — check back soon.
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {entries.map((entry) => (
              <EntryRow key={entry.slug} {...entry} />
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
