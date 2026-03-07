'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type SubItem = { label: string; href: string };

type NavCategory = {
  label: string;
  href?: string;
  children: SubItem[];
};

const NAV_CATEGORIES: NavCategory[] = [
  {
    label: 'Profile',
    children: [
      { label: 'About', href: '/profile/about' },
      { label: 'Journal', href: '/profile/journal' },
      { label: 'Blog', href: '/profile/blog' },
      { label: 'Photos', href: '/profile/photos' },
    ],
  },
  {
    label: 'Professional',
    children: [
      { label: 'What I Do', href: '/professional/what-i-do' },
      { label: 'Portfolio', href: '/professional/portfolio' },
      { label: 'Resume', href: '/professional/resume' },
    ],
  },
  {
    label: 'Passion',
    children: [
      { label: 'Acting', href: '/passion/acting' },
      { label: 'Music', href: '/passion/music' },
      { label: 'Content', href: '/passion/content' },
      { label: 'Gaming', href: '/passion/gaming' },
      { label: 'Learning', href: '/passion/learning' },
    ],
  },
  {
    label: 'Play',
    href: '/play',
    children: [],
  },
];

// ── Quick-link icon button (expands label on hover) ──────────────────────────

function BookIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0',
        padding: '0.38rem 0.5rem',
        border: '1px solid',
        borderColor: hovered ? 'rgba(var(--c-accent-rgb), 0.25)' : 'var(--c-border)',
        borderRadius: '2px',
        color: hovered ? 'var(--c-accent)' : 'var(--c-muted)',
        textDecoration: 'none',
        background: hovered ? 'rgba(var(--c-accent-rgb), 0.04)' : 'transparent',
        transition: 'color 0.18s ease, border-color 0.18s ease, background 0.18s ease, padding 0.2s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon — always visible */}
      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </span>

      {/* Label — slides in on hover */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          maxWidth: hovered ? '72px' : '0px',
          opacity: hovered ? 1 : 0,
          marginLeft: hovered ? '0.4rem' : '0',
          transition: 'max-width 0.22s ease, opacity 0.18s ease, margin-left 0.22s ease',
        }}
      >
        {label}
      </span>
    </Link>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function HomeNav() {
  const [selected, setSelected] = useState<NavCategory | null>(null);

  const handleSelect = (item: NavCategory) => {
    if (item.children.length === 0 && item.href) {
      window.location.href = item.href;
      return;
    }
    setSelected(item);
  };

  return (
    <nav
      aria-label="Site navigation"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        width: '100%',
        maxWidth: '640px',
      }}
    >
      {/* ── Nav bar ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '3rem',
          width: '100%',
        }}
      >
        <AnimatePresence mode="wait">

          {/* Top-level: 4 category buttons */}
          {!selected && (
            <motion.div
              key="top"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {NAV_CATEGORIES.map((item) => (
                <button
                  key={item.label}
                  className="btn"
                  onClick={() => handleSelect(item)}
                  style={{ fontSize: '0.68rem', letterSpacing: '0.08em' }}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* Sub-level: ← [Category] > [items...] */}
          {selected && (
            <motion.div
              key="sub"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {/* Back arrow */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.06, duration: 0.18, ease: 'easeOut' }}
                onClick={() => setSelected(null)}
                aria-label="Back to categories"
                title="Back to categories"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--c-border)',
                  borderRadius: '2px',
                  color: 'var(--c-muted)',
                  fontSize: '0.8rem',
                  padding: '0.32rem 0.5rem',
                  lineHeight: 1,
                  cursor: 'pointer',
                  transition: 'color 0.15s ease, border-color 0.15s ease',
                  fontFamily: 'var(--font-mono)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(var(--c-accent-rgb), 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
                }}
              >
                ←
              </motion.button>

              {/* Selected category (highlighted / inverted) */}
              <motion.button
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04, duration: 0.18, ease: 'easeOut' }}
                onClick={() => setSelected(null)}
                style={{
                  background: 'var(--c-accent)',
                  border: '1px solid var(--c-accent)',
                  borderRadius: '2px',
                  color: 'var(--c-bg)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  padding: '0.4rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0.85'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
              >
                {selected.label}
              </motion.button>

              {/* > separator */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.12, duration: 0.15 }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--c-accent)',
                  fontSize: '0.6rem',
                  userSelect: 'none',
                }}
              >
                &gt;
              </motion.span>

              {/* Sub-items */}
              {selected.children.map((child, i) => (
                <motion.div
                  key={child.href}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 + i * 0.05, duration: 0.2, ease: 'easeOut' }}
                >
                  <Link
                    href={child.href}
                    className="btn"
                    style={{ fontSize: '0.68rem', letterSpacing: '0.06em', display: 'inline-block' }}
                  >
                    {child.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Quick-link icons (Guestbook + Contact) ── */}
      <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }} role="list" aria-label="Quick links">
        <div role="listitem"><QuickLink href="/guestbook" icon={<BookIcon />} label="Guestbook" /></div>
        <div role="listitem"><QuickLink href="/contact" icon={<MailIcon />} label="Contact" /></div>
      </div>
    </nav>
  );
}
