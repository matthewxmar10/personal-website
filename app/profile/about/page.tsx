import Image from 'next/image';
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
          breadcrumbs={[
            { label: 'Profile', href: '/profile/about' },
            { label: 'About Me', href: '/profile/about' },
          ]}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Photo */}
          <ScrollReveal delay={0.05}>
            <div
              style={{
                position: 'relative',
                aspectRatio: '4/5',
                background: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <Image
                src="/photos/matthew.jpg"
                alt="Matthew smiling, arms crossed"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                priority
              />
            </div>
          </ScrollReveal>

          {/* Text */}
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: 'var(--c-accent)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  who i am
                </h2>
                <p
                  style={{
                    color: 'var(--c-text-sub)',
                    lineHeight: 1.85,
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Howdy, my name&apos;s Matthew 👋. I&apos;m originally from a small country
                  town called Alva, Oklahoma and now reside in the Dallas, Texas area.
                </p>
              </div>

              <div>
                <h2
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: 'var(--c-accent)',
                    marginBottom: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  what i&apos;m about
                </h2>
                <p
                  style={{
                    color: 'var(--c-text-sub)',
                    lineHeight: 1.85,
                    fontSize: '0.92rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  Having a good time and doing things that I enjoy! You may notice I have
                  quite a few interests, and there are even more not on this website.
                  I&apos;m just trying to make the most of the short life we have and leave
                  a positive impact. I love music recommendations, so send them my way!
                </p>
              </div>

              {/* Interest tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['actor', 'musician', 'gamer', 'creator', 'builder'].map((tag) => (
                  <span key={tag} className="tag tag-accent">{tag}</span>
                ))}
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem' }}>📍</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--c-muted)',
                  }}
                >
                  Dallas, TX — originally Alva, OK
                </span>
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* More photos row */}
        <ScrollReveal delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { src: '/photos/about-1.jpg', alt: 'Matthew — photo 1' },
              { src: '/photos/about-2.jpg', alt: 'Matthew — photo 2' },
              { src: '/photos/about-3.jpg', alt: 'Matthew — photo 3' },
            ].map(({ src, alt }) => (
              <div
                key={src}
                style={{
                  position: 'relative',
                  aspectRatio: '1',
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
