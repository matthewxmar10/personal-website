import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'Blog — Matthew' };

const PLACEHOLDER_POSTS = [
  { slug: 'on-creative-process', date: '2024-12-01', title: 'On Creative Process', excerpt: 'The messiness of making things — and why starting is always harder than finishing.', tags: ['creativity', 'process'] },
  { slug: 'what-speedrunning-taught-me', date: '2024-11-15', title: 'What Speedrunning Taught Me About Mastery', excerpt: 'Lessons from trying to go fast in video games that apply surprisingly well to everything else.', tags: ['gaming', 'learning'] },
  { slug: 'notes-on-music-production', date: '2024-10-20', title: 'Notes on Music Production', excerpt: 'Thoughts from a year of making music in my bedroom studio.', tags: ['music'] },
  { slug: 'building-in-public', date: '2024-09-10', title: 'Building in Public (a failed experiment)', excerpt: 'I tried documenting my projects as I built them. Here\'s what I learned.', tags: ['building', 'learning'] },
];

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Blog"
          subtitle="Longer-form thoughts, ideas, and things I'm figuring out."
          breadcrumbs={[{ label: 'Profile', href: '/profile/about' }, { label: 'Blog', href: '/profile/blog' }]}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
          {PLACEHOLDER_POSTS.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.05}>
              <Link href={`/profile/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div
                  className="card"
                  style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                >
                  {/* Date */}
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444' }}>
                    {new Date(post.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>

                  {/* Title */}
                  <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, color: '#E8E6E1', margin: 0, lineHeight: 1.3 }}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{ color: '#666666', fontSize: '0.85rem', lineHeight: 1.65, margin: 0, flexGrow: 1 }}>
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#00E5FF', letterSpacing: '0.08em' }}>
                    Read →
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
