import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageTransition from '@/components/ui/PageTransition';
import { getJournalEntry, getJournalEntries } from '@/lib/markdown';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getJournalEntries().map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) return {};
  const d = new Date(entry.date + 'T12:00:00');
  const formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return { title: `${formatted} — Journal — Matthew` };
}

export default async function JournalEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = await getJournalEntry(slug);
  if (!entry) notFound();

  const d         = new Date(entry.date + 'T12:00:00');
  const dayName   = DAYS[d.getDay()];
  const formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>

        {/* Back link */}
        <div style={{ padding: '2rem 0 1.5rem' }}>
          <Link
            href="/profile/journal"
            className="hover-accent"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--c-muted)',
              textDecoration: 'none',
            }}
          >
            ← Back to Journal
          </Link>
        </div>

        {/* Date header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--c-muted)',
            marginBottom: '0.4rem',
          }}>
            {dayName}
          </div>
          <h1 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.4rem, 4vw, 2rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--c-text)',
            margin: 0,
          }}>
            {formatted}
          </h1>
        </div>

        <div className="divider" />

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
        />

        <div className="divider" />

        {/* Prev / Next navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
          {entry.prev ? (
            <Link href={`/profile/journal/${entry.prev}`} className="btn" style={{ fontSize: '0.68rem' }}>
              ← Previous entry
            </Link>
          ) : (
            <span />
          )}
          {entry.next ? (
            <Link href={`/profile/journal/${entry.next}`} className="btn" style={{ fontSize: '0.68rem' }}>
              Next entry →
            </Link>
          ) : (
            <span />
          )}
        </div>

      </div>
    </PageTransition>
  );
}
