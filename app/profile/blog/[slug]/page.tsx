'use client';

import Link from 'next/link';
import PageTransition from '@/components/ui/PageTransition';


const PLACEHOLDER_CONTENT = `This is placeholder content for a blog post. The actual post content will be driven by MDX files in /content/blog/.

## Section Heading

Here's an example of what a blog post paragraph might look like. The writing lives here, with all the context and thinking that goes into a longer-form piece.

Paragraphs flow naturally, with good spacing between them. Links and emphasis can be added where relevant.

## Another Section

More content goes here. The layout supports code blocks, blockquotes, images, and standard markdown formatting.

> A blockquote might look like this — perfect for highlighting key ideas or quotes from other sources.

The post continues as long as it needs to. No filler, just substance.`;

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  void params;

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '720px' }}>
        {/* Back link */}
        <div style={{ padding: '2rem 0 1.5rem' }}>
          <Link
            href="/profile/blog"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#00E5FF')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#444444')}
          >
            ← Back to Blog
          </Link>
        </div>

        {/* Post header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="tag tag-accent">creativity</span>
            <span className="tag tag-accent">process</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 500, letterSpacing: '-0.02em', color: '#E8E6E1', margin: 0, lineHeight: 1.2 }}>
            On Creative Process
          </h1>

          <div style={{ marginTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#444444', letterSpacing: '0.08em' }}>
            December 1, 2024 · 5 min read
          </div>
        </div>

        <div className="divider" />

        {/* Content */}
        <div className="prose">
          {PLACEHOLDER_CONTENT.split('\n\n').map((block, i) => {
            if (block.startsWith('## ')) {
              return <h2 key={i}>{block.replace('## ', '')}</h2>;
            }
            if (block.startsWith('> ')) {
              return <blockquote key={i}>{block.replace('> ', '')}</blockquote>;
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        <div className="divider" />

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/profile/blog" className="btn" style={{ fontSize: '0.68rem' }}>
            ← All posts
          </Link>
          <Link href="/profile/journal" className="btn" style={{ fontSize: '0.68rem' }}>
            Daily Journal →
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
