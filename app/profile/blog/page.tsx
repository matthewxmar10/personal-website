import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getBlogPosts } from '@/lib/markdown';

export const metadata = { title: 'Blog — Matthew' };

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Blog"
          subtitle="Longer-form thoughts, ideas, and things I'm figuring out."
          breadcrumbs={[
            { label: 'Profile', href: '/profile/about' },
            { label: 'Blog', href: '/profile/blog' },
          ]}
        />

        {posts.length === 0 ? (
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--c-muted)',
            letterSpacing: '0.06em',
          }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.05}>
                <Link href={`/profile/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div
                    className="card"
                    style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                  >
                    {/* Date */}
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--c-muted)',
                    }}>
                      {new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'var(--c-text)',
                      margin: 0,
                      lineHeight: 1.3,
                    }}>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p style={{ color: 'var(--c-text-sub)', fontSize: '0.85rem', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {post.tags.map(tag => (
                          <span key={tag} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}

                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: 'var(--c-accent)',
                      letterSpacing: '0.08em',
                    }}>
                      Read →
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
