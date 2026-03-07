import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';

export const metadata = { title: 'Resume — Matthew' };

export default function ResumePage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Resume"
          subtitle="One page. The highlights."
          breadcrumbs={[{ label: 'Professional', href: '/professional/what-i-do' }, { label: 'Resume', href: '/professional/resume' }]}
        />

        {/* Download button */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <a
            href="/resume.pdf"
            download
            className="btn btn-accent"
            style={{ fontSize: '0.68rem' }}
          >
            ↓ Download PDF
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ fontSize: '0.68rem' }}
          >
            Open in new tab ↗
          </a>
        </div>

        {/* Resume viewer placeholder */}
        <div
          style={{
            background: '#111111',
            border: '1px solid #1E1E1E',
            borderRadius: '2px',
            minHeight: '900px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            padding: '3rem',
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#333333' }}>
            Resume PDF viewer
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#444444', textAlign: 'center', maxWidth: '320px', lineHeight: 1.7 }}>
            Drop your resume PDF at <code style={{ background: '#0D0D0D', padding: '2px 6px', borderRadius: '2px', color: '#00E5FF', fontSize: '0.8rem' }}>/public/resume.pdf</code> and it will appear here.
          </p>
          <a href="/resume.pdf" download className="btn btn-accent" style={{ fontSize: '0.68rem' }}>
            ↓ Download Resume
          </a>
        </div>
      </div>
    </PageTransition>
  );
}
