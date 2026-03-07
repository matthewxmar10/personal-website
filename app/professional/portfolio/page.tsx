'use client';

import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import BookFlip from '@/components/ui/BookFlip';

const PORTFOLIO_ITEMS = [
  { title: 'Project One', subtitle: 'Process Automation', description: 'Description coming soon.', year: '2024' },
  { title: 'Project Two', subtitle: 'Technical Infrastructure', description: 'Description coming soon.', year: '2024' },
  { title: 'Project Three', subtitle: 'Cross-functional Ops', description: 'Description coming soon.', year: '2023' },
  { title: 'Project Four', subtitle: 'Product Analytics', description: 'Description coming soon.', year: '2023' },
];

function CoverPage() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem',
      background: 'linear-gradient(135deg, #111111 0%, #0D0D0D 100%)',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444444' }}>Portfolio</div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 500, color: '#00E5FF', textShadow: '0 0 20px rgba(0,229,255,0.3)', textAlign: 'center', margin: 0 }}>
        Selected Work
      </h2>
      <div style={{ width: 40, height: 1, background: 'rgba(0,229,255,0.3)' }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', color: '#333333', textAlign: 'center' }}>
        Matthew · Professional Portfolio
      </div>
    </div>
  );
}

function PortfolioItemPage({ item }: { item: typeof PORTFOLIO_ITEMS[0] }) {
  return (
    <div style={{ width: '100%', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Image placeholder */}
      <div style={{
        flex: 1, background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '2px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#2A2A2A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Project screenshot
        </span>
      </div>

      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#444444', marginBottom: '4px' }}>
          {item.year} · {item.subtitle}
        </div>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, color: '#E8E6E1', margin: '0 0 0.5rem' }}>
          {item.title}
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#666666', lineHeight: 1.6, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const bookPages = [
    { content: <CoverPage /> },
    ...PORTFOLIO_ITEMS.map((item) => ({
      content: <PortfolioItemPage item={item} />,
    })),
    // Back cover
    { content: (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '0.75rem', background: '#0D0D0D' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#333333', letterSpacing: '0.1em' }}>Thank you for looking</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: '#2A2A2A', letterSpacing: '0.08em' }}>More work added regularly</div>
      </div>
    )},
  ];

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Portfolio"
          subtitle="A selection of professional work. Flip through to explore."
          breadcrumbs={[{ label: 'Professional', href: '/professional/what-i-do' }, { label: 'Portfolio', href: '/professional/portfolio' }]}
        />

        <BookFlip pages={bookPages} width={380} height={480} />
      </div>
    </PageTransition>
  );
}
