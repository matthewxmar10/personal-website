import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal from '@/components/ui/ScrollReveal';

export const metadata = { title: 'What I Do — Matthew' };

const AREAS = [
  { title: 'Product Operations', icon: '⚙️', description: 'Building the systems and processes that make teams run smoothly. From workflow design to cross-functional alignment.' },
  { title: 'Technical Troubleshooting', icon: '🔍', description: 'Getting to the root cause, fast. Diagnosing complex technical issues and translating them for all stakeholders.' },
  { title: 'Process Improvement', icon: '📈', description: 'Finding the friction and removing it. Continuous iteration on how work gets done.' },
];

export default function WhatIDoPage() {
  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="What I Do"
          subtitle="Professionally speaking."
          breadcrumbs={[{ label: 'Professional', href: '/professional/what-i-do' }, { label: 'What I Do', href: '/professional/what-i-do' }]}
        />

        <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
          <ScrollReveal>
            <p style={{ color: '#888888', fontSize: '0.95rem', lineHeight: 1.8 }}>
              [Content coming soon — a summary of Matthew&apos;s professional work in ProdOps, technical troubleshooting, and process building.]
            </p>
          </ScrollReveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {AREAS.map((area, i) => (
            <ScrollReveal key={area.title} delay={i * 0.08}>
              <div className="card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{area.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 500, color: '#E8E6E1', marginBottom: '0.6rem', margin: '0 0 0.6rem' }}>
                  {area.title}
                </h3>
                <p style={{ color: '#666666', fontSize: '0.85rem', lineHeight: 1.65, margin: 0 }}>
                  {area.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/professional/portfolio" className="btn btn-accent" style={{ fontSize: '0.68rem' }}>View Portfolio →</a>
            <a href="/professional/resume" className="btn" style={{ fontSize: '0.68rem' }}>See Resume</a>
          </div>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
