import { Fragment }   from 'react';
import Link           from 'next/link';
import PageHeader     from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import ScrollReveal   from '@/components/ui/ScrollReveal';
import { getArchivedEntries } from '@/lib/learning';

export const metadata = { title: 'Learning Archive — Matthew' };

export default async function LearningArchivePage() {
  const entries = await getArchivedEntries();

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Learning Archive"
          subtitle="Topics I've previously studied, newest to oldest."
          breadcrumbs={[
            { label: 'Passion',   href: '/passion/acting'          },
            { label: 'Learning',  href: '/passion/learning'        },
            { label: 'Archive',   href: '/passion/learning/archive'},
          ]}
        />

        <ScrollReveal>
          {entries.length === 0 ? (
            <div style={{ padding: '2rem', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '2px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-muted)', margin: 0, letterSpacing: '0.06em' }}>
                No completed topics yet — move a file into{' '}
                <code style={{ color: 'var(--c-accent)', fontSize: '0.65rem' }}>content/learning/archive/</code>{' '}
                to archive it.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {entries.map((entry, i) => (
                <div
                  key={entry.slug}
                  style={{
                    paddingBottom: '2.5rem',
                    marginBottom:  '2.5rem',
                    borderBottom:  i < entries.length - 1 ? '1px solid var(--c-border)' : 'none',
                  }}
                >
                  {/* Header row: title + date */}
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '1rem',
                      fontWeight:    500,
                      color:         'var(--c-text)',
                      margin:        0,
                      letterSpacing: '-0.01em',
                    }}>
                      {entry.title}
                    </h3>
                    {entry.date && (
                      <span style={{
                        fontFamily:    'var(--font-mono)',
                        fontSize:      '0.6rem',
                        letterSpacing: '0.08em',
                        color:         'var(--c-muted)',
                        flexShrink:    0,
                      }}>
                        {entry.date}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{ __html: entry.contentHtml }}
                    style={{ marginBottom: entry.links.length > 0 ? '1.1rem' : 0 }}
                  />

                  {/* Links row */}
                  {entry.links.length > 0 && (
                    <div style={{
                      paddingTop: '0.85rem',
                      borderTop:  '1px solid var(--c-border)',
                      display:    'flex',
                      flexWrap:   'wrap',
                      alignItems: 'center',
                      columnGap:  '0.55rem',
                      rowGap:     '0.4rem',
                    }}>
                      {entry.links.map((link, li) => (
                        <Fragment key={li}>
                          {li > 0 && (
                            <span style={{
                              color:      'var(--c-muted)',
                              userSelect: 'none',
                              fontFamily: 'var(--font-mono)',
                              fontSize:   '0.7rem',
                            }}>
                              |
                            </span>
                          )}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="learning-link"
                          >
                            {link.label} ↗
                          </a>
                        </Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Back link */}
          <div style={{ marginTop: '0.5rem' }}>
            <Link href="/passion/learning" className="btn">
              ← Back to Learning
            </Link>
          </div>
        </ScrollReveal>

        <style>{`
          .learning-link {
            font-family:     var(--font-mono);
            font-size:       0.68rem;
            letter-spacing:  0.03em;
            color:           rgba(var(--c-accent-rgb), 0.65);
            text-decoration: none;
            transition:      color 0.15s;
          }
          .learning-link:hover { color: var(--c-accent); }
        `}</style>
      </div>
    </PageTransition>
  );
}
