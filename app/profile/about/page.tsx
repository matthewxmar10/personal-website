import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'About Me — Matthew' };

export default function AboutPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="About Me"
          subtitle="A bit about who I am and what makes me tick."
          breadcrumbs={[{ label: 'Profile', href: '/profile/about' }, { label: 'About Me', href: '/profile/about' }]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* Photo placeholder */}
          <ScrollReveal delay={0.05}>
            <div
              style={{
                aspectRatio: '4/5',
                background: '#111111',
                border: '1px solid #1E1E1E',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#333333', textTransform: 'uppercase' }}>
                Photo placeholder
              </span>
            </div>
          </ScrollReveal>

          {/* Blurb 1 */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#00E5FF', marginBottom: '0.75rem', fontWeight: 500 }}>
                  who i am
                </h2>
                <p style={{ color: '#888888', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  [Content coming soon — a couple of paragraphs about Matthew, his background, where he&apos;s from, and what drives him.]
                </p>
              </div>

              <div>
                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#00E5FF', marginBottom: '0.75rem', fontWeight: 500 }}>
                  what i&apos;m about
                </h2>
                <p style={{ color: '#888888', lineHeight: 1.8, fontSize: '0.9rem' }}>
                  [Content coming soon — what motivates Matthew, his values, interests, and the through-line connecting all his different pursuits.]
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['actor', 'musician', 'gamer', 'creator', 'builder'].map((tag) => (
                  <span key={tag} className="tag tag-accent">{tag}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* More photos row */}
        <ScrollReveal delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  aspectRatio: '1',
                  background: '#111111',
                  border: '1px solid #1E1E1E',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#2A2A2A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Photo {i}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
