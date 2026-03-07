import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'Learning — Matthew' };

const CURRENTLY_LEARNING: { topic: string; why: string; since?: string }[] = [
  // { topic: string, why: string, since: string }
];

export default function LearningPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Learning"
          subtitle="What I'm diving into right now, and why it matters to me."
          breadcrumbs={[{ label: 'Passion', href: '/passion/acting' }, { label: 'Learning', href: '/passion/learning' }]}
        />

        {/* Currently learning */}
        <ScrollReveal>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1.25rem', fontWeight: 500 }}>
            Currently Learning
          </h2>

          {CURRENTLY_LEARNING.length === 0 ? (
            <div style={{ padding: '2rem', background: '#111111', border: '1px solid #1E1E1E', borderRadius: '2px', marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#333333', margin: 0 }}>
                Content coming soon — what I&apos;m studying and why.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
              {CURRENTLY_LEARNING.map((item, i) => (
                <div key={i} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#E8E6E1', marginBottom: '0.5rem' }}>
                    {(item as {topic: string}).topic}
                  </div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#666666', lineHeight: 1.6 }}>
                    {(item as {why: string}).why}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollReveal>

        {/* Link to Blog and Journal */}
        <ScrollReveal delay={0.1}>
          <div className="divider" />
          <div style={{ paddingTop: '1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '1rem', fontWeight: 500 }}>
              Where I Write About It
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
              <Link href="/profile/blog" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00E5FF', marginBottom: '0.5rem' }}>Blog</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#888888', lineHeight: 1.6 }}>
                    Long-form thoughts, ideas, and things I&apos;m figuring out. Read when you have time.
                  </div>
                </div>
              </Link>
              <Link href="/profile/journal" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00E5FF', marginBottom: '0.5rem' }}>Journal</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#888888', lineHeight: 1.6 }}>
                    Short daily micro-entries. Stream of consciousness. The raw stuff.
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
