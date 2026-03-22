'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Profile',
    children: [
      { label: 'About Me', href: '/profile/about' },
      { label: 'Journal', href: '/profile/journal' },
      { label: 'Blog', href: '/profile/blog' },
      { label: 'Photo Album', href: '/profile/photos' },
    ],
  },
  {
    label: 'Professional',
    children: [
      { label: 'What I Do', href: '/professional/what-i-do' },
      { label: 'Design Portfolio', href: '/professional/portfolio' },
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
  { label: 'Play', href: '/play' },
  { label: 'Guestbook', href: '/guestbook' },
  { label: 'Contact', href: '/contact' },
];

// ── Theme toggle button ──────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        border: '1px solid',
        borderColor: hovered ? 'rgba(var(--c-accent-rgb), 0.4)' : 'var(--c-border)',
        borderRadius: '2px',
        color: hovered ? 'var(--c-accent)' : 'var(--c-muted)',
        padding: '0.28rem 0.38rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered ? '0 0 8px rgba(var(--c-accent-rgb), 0.2)' : 'none',
        flexShrink: 0,
      }}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

// ── Dropdown ─────────────────────────────────────────────────────────────────

function DropdownMenu({ items, visible, id }: { items: { label: string; href: string }[]; visible: boolean; id: string }) {
  return (
    <div
      id={id}
      role="menu"
      aria-hidden={!visible}
      style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        marginTop: '8px',
        background: 'var(--c-dropdown-bg)',
        border: '1px solid var(--c-border)',
        borderRadius: '2px',
        minWidth: '160px',
        padding: '4px 0',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-4px)',
        zIndex: 1000,
        boxShadow: '0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(var(--c-accent-rgb), 0.04)',
      }}
    >
      {items.map((item) => (
        // tabIndex={-1} when hidden prevents keyboard users from accidentally
        // tabbing into an invisible dropdown
        <DropdownLink key={item.href} href={item.href} label={item.label} tabIndex={visible ? 0 : -1} />
      ))}
    </div>
  );
}

function DropdownLink({ href, label, tabIndex }: { href: string; label: string; tabIndex?: number }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      role="menuitem"
      tabIndex={tabIndex}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'block',
        padding: '8px 16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: isActive ? 'var(--c-accent)' : 'var(--c-text-sub)',
        textShadow: isActive ? '0 0 8px rgba(var(--c-accent-rgb), 0.5)' : 'none',
        transition: 'color 0.1s ease, text-shadow 0.1s ease, background 0.1s ease',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.target as HTMLElement).style.color = 'var(--c-accent)';
          (e.target as HTMLElement).style.background = 'rgba(var(--c-accent-rgb), 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.target as HTMLElement).style.color = 'var(--c-text-sub)';
          (e.target as HTMLElement).style.background = 'transparent';
        }
      }}
    >
      {label}
    </Link>
  );
}

function NavItemComponent({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const menuId = `nav-menu-${item.label.toLowerCase()}`;

  const isActive = item.href
    ? pathname === item.href
    : item.children?.some((c) => pathname.startsWith(c.href.split('/').slice(0, 2).join('/'))) ?? false;

  const handleMouseEnter = () => { clearTimeout(timerRef.current); setOpen(true); };
  const handleMouseLeave = () => { timerRef.current = setTimeout(() => setOpen(false), 120); };
  // Close dropdown immediately whenever the route changes (e.g. after clicking a child link)
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => () => clearTimeout(timerRef.current), []);

  // Keyboard: Escape closes the dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };

  const linkStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.72rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: isActive ? 'var(--c-accent)' : 'var(--c-muted)',
    textShadow: isActive ? '0 0 8px rgba(var(--c-accent-rgb), 0.5)' : 'none',
    transition: 'color 0.15s ease, text-shadow 0.15s ease',
    padding: '4px 0',
    position: 'relative' as const,
  };

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="nav-link"
        aria-current={isActive ? 'page' : undefined}
        style={linkStyle}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.target as HTMLElement).style.color = 'var(--c-accent)';
            (e.target as HTMLElement).style.textShadow = '0 0 8px rgba(var(--c-accent-rgb), 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.target as HTMLElement).style.color = 'var(--c-muted)';
            (e.target as HTMLElement).style.textShadow = 'none';
          }
        }}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        // onClick lets keyboard and switch-access users toggle the dropdown
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        style={{ ...linkStyle, background: 'none', border: 'none', padding: '4px 0', display: 'flex', alignItems: 'center', gap: '4px' }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
            (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px rgba(var(--c-accent-rgb), 0.5)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLElement).style.color = 'var(--c-muted)';
            (e.currentTarget as HTMLElement).style.textShadow = 'none';
          }
        }}
      >
        {item.label}
        <span style={{ fontSize: '0.55rem', opacity: 0.5 }} aria-hidden="true">▾</span>
      </button>
      {item.children && <DropdownMenu items={item.children} visible={open} id={menuId} />}
    </div>
  );
}

// ── Mobile Menu ───────────────────────────────────────────────────────────────

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape handler
  useEffect(() => {
    if (!open) return;

    // Move focus inside when opened
    setTimeout(() => firstFocusRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      // Tab trap
      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll<HTMLElement>(
          '#mobile-nav [href], #mobile-nav button'
        );
        const list = Array.from(focusable);
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--c-mobile-menu-bg)',
        zIndex: 9000,
        display: 'flex',
        flexDirection: 'column',
        padding: '80px 2rem 2rem',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.2s ease',
        overflowY: 'auto',
      }}
    >
      <button
        ref={firstFocusRef}
        onClick={onClose}
        aria-label="Close navigation menu"
        style={{
          position: 'absolute', top: '20px', right: '24px',
          background: 'none', border: 'none',
          color: 'var(--c-muted)', fontSize: '1.2rem',
          fontFamily: 'var(--font-mono)',
        }}
      >✕</button>

      <nav aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} style={{ marginBottom: '1.5rem' }}>
            {item.href ? (
              <Link
                href={item.href}
                onClick={onClose}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '1rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--c-text)',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--c-accent)', marginBottom: '0.6rem',
                }}>
                  {item.label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1rem' }}>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href} href={child.href} onClick={onClose}
                      style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: 'var(--c-text-sub)',
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: '56px', zIndex: 8000,
          display: 'flex', alignItems: 'center',
          padding: '0 1.5rem',
          background: scrolled ? 'var(--c-nav-bg-scroll)' : 'var(--c-nav-bg)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'var(--c-border)' : 'transparent',
          backdropFilter: 'blur(12px)',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Left: site name + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginRight: 'auto' }}>
          <Link
            href="/"
            aria-label="Matthew — home"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'var(--c-text)',
              textTransform: 'uppercase',
              transition: 'color 0.15s ease, text-shadow 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--c-accent)';
              (e.currentTarget as HTMLElement).style.textShadow = '0 0 12px rgba(var(--c-accent-rgb), 0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--c-text)';
              (e.currentTarget as HTMLElement).style.textShadow = 'none';
            }}
          >
            Matthew
          </Link>

          <ThemeToggle />
        </div>

        {/* Desktop nav items */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden-mobile" role="list">
          {NAV_ITEMS.map((item) => (
            <div key={item.label} role="listitem">
              <NavItemComponent item={item} />
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="show-mobile"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          style={{
            background: 'none', border: 'none',
            color: 'var(--c-muted)',
            display: 'flex', flexDirection: 'column',
            gap: '5px', padding: '4px',
          }}
        >
          <span style={{ width: 20, height: 1, background: 'var(--c-muted)', display: 'block' }} aria-hidden="true" />
          <span style={{ width: 20, height: 1, background: 'var(--c-muted)', display: 'block' }} aria-hidden="true" />
          <span style={{ width: 12, height: 1, background: 'var(--c-muted)', display: 'block' }} aria-hidden="true" />
        </button>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile   { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
