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

        {/* Resume PDF viewer */}
        <iframe
          src="/resume.pdf"
          title="Matthew's Resume"
          style={{
            width: '100%',
            height: '90vh',
            border: '1px solid #1E1E1E',
            borderRadius: '2px',
            background: '#111111',
            display: 'block',
          }}
        />
      </div>
    </PageTransition>
  );
}
