interface Entry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface GuestbookEntryProps {
  entry: Entry;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function GuestbookEntry({ entry }: GuestbookEntryProps) {
  return (
    <article
      className="glow-border"
      aria-label={`Entry by ${entry.name}`}
      style={{
        padding: '1.25rem 1.5rem',
        background: 'var(--c-surface)',
        borderRadius: '2px',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          marginBottom: '0.6rem',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'var(--c-accent)',
            letterSpacing: '0.04em',
          }}
        >
          {entry.name}
        </span>
        <time
          dateTime={entry.created_at}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.08em',
            color: 'var(--c-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {formatDate(entry.created_at)}
        </time>
      </div>

      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.9rem',
          color: 'var(--c-text)',
          lineHeight: 1.6,
          margin: 0,
          wordBreak: 'break-word',
        }}
      >
        {entry.message}
      </p>
    </article>
  );
}
