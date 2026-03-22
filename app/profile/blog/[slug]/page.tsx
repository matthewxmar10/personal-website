import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageTransition from '@/components/ui/PageTransition';
import { getBlogPost, getBlogPosts } from '@/lib/markdown';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getBlogPosts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} — Blog — Matthew` };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const formatted = new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>

        {/* Back link */}
        <div style={{ padding: '2rem 0 1.5rem' }}>
          <Link
            href="/profile/blog"
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
            ← Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <div style={{ marginBottom: '2.5rem' }}>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} className="tag tag-accent">{tag}</span>
              ))}
            </div>
          )}

          <h1 style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'var(--c-text)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {post.title}
          </h1>

          <div style={{
            marginTop: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--c-muted)',
            letterSpacing: '0.08em',
          }}>
            {formatted} · {post.readingTime} min read
          </div>
        </div>

        <div className="divider" />

        {/* Content */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="divider" />

        {/* Prev / Next navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {post.prev ? (
            <Link href={`/profile/blog/${post.prev.slug}`} className="btn" style={{ fontSize: '0.68rem' }}>
              ← {post.prev.title}
            </Link>
          ) : (
            <Link href="/profile/blog" className="btn" style={{ fontSize: '0.68rem' }}>
              ← All posts
            </Link>
          )}
          {post.next && (
            <Link href={`/profile/blog/${post.next.slug}`} className="btn" style={{ fontSize: '0.68rem' }}>
              {post.next.title} →
            </Link>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
