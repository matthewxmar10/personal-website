'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{
        borderTop: '1px solid var(--c-border)',
        padding: '2rem 1.5rem',
        marginTop: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <small
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--c-muted)',
        }}
      >
        © {year} Matthew — built with care
      </small>

      <nav aria-label="Footer navigation">
        <ul
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Guestbook', href: '/guestbook' },
            { label: 'Contact', href: '/contact' },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--c-muted)',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--c-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'var(--c-muted)';
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
