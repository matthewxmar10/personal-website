'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div
      style={{
        padding: '3rem 0 2.5rem',
        borderBottom: '1px solid var(--c-border)',
        marginBottom: '3rem',
      }}
    >
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            marginBottom: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <ol style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0 }}>
            <li>
              <Link
                href="/"
                style={{ color: 'var(--c-muted)', transition: 'color 0.1s' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--c-accent)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--c-muted)')}
              >
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span aria-hidden="true" style={{ opacity: 0.4, color: 'var(--c-muted)' }}>/</span>
                {i < breadcrumbs.length - 1 ? (
                  <Link
                    href={crumb.href}
                    style={{ color: 'var(--c-muted)', transition: 'color 0.1s' }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--c-accent)')}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--c-muted)')}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" style={{ color: 'var(--c-text-sub)' }}>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <h1
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: 'var(--c-text)',
          margin: 0,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            marginTop: '0.6rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--c-muted)',
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
