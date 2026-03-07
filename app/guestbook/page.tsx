'use client';

import { useState, useEffect, useCallback } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import GuestbookForm from '@/components/guestbook/GuestbookForm';
import GuestbookEntry from '@/components/guestbook/GuestbookEntry';

interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface PaginatedEntries {
  entries: Entry[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export default function GuestbookPage() {
  const [data, setData] = useState<PaginatedEntries | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEntries = useCallback(async (p: number) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/guestbook?page=${p}&perPage=20`);
      if (!res.ok) throw new Error('Failed to load');
      const json = await res.json();
      setData(json);
    } catch {
      setError('Could not load entries. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries(page);
  }, [page, fetchEntries]);

  const handleSubmitSuccess = () => {
    // Refresh to show new entry
    fetchEntries(1);
    setPage(1);
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem', maxWidth: '760px' }}>
        <PageHeader
          title="Guestbook"
          subtitle="You were here — say hi, leave a mark."
          breadcrumbs={[{ label: 'Guestbook', href: '/guestbook' }]}
        />

        {/* Form */}
        <div
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: '2px',
            padding: '1.75rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', margin: 0 }}>
              Sign the Guestbook
            </h2>
          </div>
          <GuestbookForm onSubmit={handleSubmitSuccess} />
        </div>

        {/* Entries header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', margin: 0 }}>
            Entries
          </h2>
          {data && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--c-muted)', letterSpacing: '0.06em' }}>
              {data.total} total
            </span>
          )}
        </div>

        {/* Entries list */}
        {loading && (
          <div role="status" aria-live="polite" style={{ padding: '3rem', textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--c-muted)' }}>
              Loading entries…
            </span>
          </div>
        )}

        {error && (
          <div role="alert" style={{ padding: '1.5rem', background: 'var(--c-surface)', border: '1px solid rgba(var(--c-accent-alt, 255,107,107), 0.2)', borderRadius: '2px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent-alt)', margin: 0 }}>{error}</p>
          </div>
        )}

        {!loading && !error && data && (
          <>
            {data.entries.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', background: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '2px' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-muted)', margin: '0 0 0.5rem' }}>
                  No entries yet.
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-muted)', margin: 0 }}>
                  Be the first to sign!
                </p>
              </div>
            ) : (
              <div
                aria-live="polite"
                aria-label="Guestbook entries"
                style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                {data.entries.map((entry) => (
                  <GuestbookEntry key={entry.id} entry={entry} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data.totalPages > 1 && (
              <nav aria-label="Guestbook pagination" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <button
                  className="btn"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  aria-label="Previous page"
                  style={{ opacity: page === 1 ? 0.3 : 1, fontSize: '0.65rem' }}
                >
                  ← Prev
                </button>

                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className="btn"
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                    style={{
                      fontSize: '0.65rem',
                      minWidth: '36px',
                      color: p === page ? 'var(--c-accent)' : 'var(--c-muted)',
                      borderColor: p === page ? 'rgba(var(--c-accent-rgb), 0.4)' : 'var(--c-border)',
                    }}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="btn"
                  disabled={page === data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  aria-label="Next page"
                  style={{ opacity: page === data.totalPages ? 0.3 : 1, fontSize: '0.65rem' }}
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </PageTransition>
  );
}
