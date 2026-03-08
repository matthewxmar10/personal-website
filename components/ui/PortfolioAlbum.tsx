'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioItems } from '@/data/portfolio';
import type { PortfolioItem } from '@/data/portfolio';

// ── Available tags ─────────────────────────────────────────────────────────────

const PORTFOLIO_TAGS = ['Social', 'Apparel', 'Events', 'Other'] as const;

// ── Rotation presets per spread ───────────────────────────────────────────────
// [left-top, left-bottom, right-top, right-bottom]
// Kept subtle so the portfolio stays professional.

const ROTATIONS: [number, number, number, number][] = [
  [-0.6,  0.5,  0.7, -0.5],
  [ 0.4, -0.7, -0.5,  0.6],
  [-0.5,  0.6,  0.8, -0.4],
];

// ── Project card (inside the open spread) ────────────────────────────────────

function PortfolioCard({
  item,
  rotation,
  onClick,
}: {
  item: PortfolioItem;
  rotation: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={`View project: ${item.title}`}
      whileHover={{ scale: 1.025, zIndex: 10 }}
      transition={{ duration: 0.18 }}
      style={{
        flex: 1,
        background: 'none',
        border: 'none',
        padding: '0 0.5rem',
        cursor: 'pointer',
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: '#111111',
          border: '1px solid #1E1E1E',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,255,0.35)';
          (e.currentTarget as HTMLElement).style.boxShadow  = '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,229,255,0.1)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = '#1E1E1E';
          (e.currentTarget as HTMLElement).style.boxShadow  = '0 4px 20px rgba(0,0,0,0.5)';
        }}
      >
        {/* Preview image */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#0A0A0A', minHeight: 0 }}>
          {item.src ? (
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                color: '#2A2A2A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                preview
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.55rem 0.75rem',
          borderTop: '1px solid #1A1A1A',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            fontWeight: 500,
            color: '#E8E6E1',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {item.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.52rem',
            color: '#444',
            flexShrink: 0,
          }}>
            {item.year}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

// ── Album page (holds 2 projects) ─────────────────────────────────────────────

function PortfolioPage({
  pageItems,
  rotations,
  onItemClick,
}: {
  pageItems: PortfolioItem[];
  rotations: [number, number];
  onItemClick: (item: PortfolioItem) => void;
}) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      padding: '0.9rem 0.75rem',
      background: '#0D0D0D',
      overflow: 'hidden',
    }}>
      {pageItems.map((item, i) => (
        <PortfolioCard
          key={item.id}
          item={item}
          rotation={rotations[i] ?? 0}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}

// ── Book cover (closed state) ─────────────────────────────────────────────────

function BookCover({
  count,
  total,
  onOpen,
}: {
  count: number;
  total: number;
  onOpen: () => void;
}) {
  const countLabel = total === 0
    ? 'no projects yet'
    : count === total
      ? `${count} ${count === 1 ? 'project' : 'projects'}`
      : `${count} of ${total} projects`;

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open portfolio"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.22 }}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'stretch',
        filter: 'drop-shadow(8px 8px 32px rgba(0,0,0,0.8))',
      }}
    >
      {/* Spine */}
      <div style={{
        width: '26px',
        background: 'linear-gradient(to right, #030303, #0d0d0d)',
        borderRight: '1px solid #1c1c1c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        paddingTop: '1rem',
        paddingBottom: '1rem',
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            width: '3px', height: '3px', borderRadius: '50%',
            background: 'rgba(0,229,255,0.22)',
          }} />
        ))}
      </div>

      {/* Front cover */}
      <div style={{
        width: '260px',
        height: '340px',
        background: 'linear-gradient(155deg, #0d0d0d 0%, #060606 60%, #0a0a0a 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        padding: '2rem',
      }}>
        {/* Outer frame */}
        <div style={{ position: 'absolute', inset: '13px', border: '1px solid rgba(0,229,255,0.18)', pointerEvents: 'none' }} />
        {/* Inner frame */}
        <div style={{ position: 'absolute', inset: '18px', border: '1px solid rgba(0,229,255,0.07)', pointerEvents: 'none' }} />

        {/* Corner ornaments */}
        {(['top','bottom'] as const).flatMap(v =>
          (['left','right'] as const).map(h => (
            <div key={`${v}-${h}`} style={{
              position: 'absolute',
              [v]: '13px', [h]: '13px',
              width: '10px', height: '10px',
              borderTop:    v === 'top'    ? '1.5px solid rgba(0,229,255,0.55)' : 'none',
              borderBottom: v === 'bottom' ? '1.5px solid rgba(0,229,255,0.55)' : 'none',
              borderLeft:   h === 'left'   ? '1.5px solid rgba(0,229,255,0.55)' : 'none',
              borderRight:  h === 'right'  ? '1.5px solid rgba(0,229,255,0.55)' : 'none',
              pointerEvents: 'none',
            }} />
          ))
        )}

        {/* Grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize: '180px',
          pointerEvents: 'none',
          opacity: 0.6,
        }} />

        {/* Text */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(0,229,255,0.45)',
        }}>
          Portfolio
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.9rem',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          color: '#E8E6E1',
          textShadow: '0 0 40px rgba(0,229,255,0.12)',
        }}>
          Matthew
        </div>

        <div style={{
          width: '44px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.45), transparent)',
        }} />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          color: 'var(--c-muted)',
        }}>
          {countLabel}
        </div>

        <motion.div
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            marginTop: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.52rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(0,229,255,0.7)',
          }}
        >
          Click to open
        </motion.div>
      </div>

      {/* Right edge */}
      <div style={{ width: '5px', background: 'linear-gradient(to left, #1a1a1a, #0a0a0a)' }} />
    </motion.button>
  );
}

// ── Tag filter strip ──────────────────────────────────────────────────────────

function TagStrip({
  activeTags,
  onToggle,
}: {
  activeTags: string[];
  onToggle: (tag: string) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
    }}>
      {PORTFOLIO_TAGS.map(tag => {
        const active = activeTags.includes(tag);
        return (
          <motion.button
            key={tag}
            onClick={() => onToggle(tag)}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.14 }}
            aria-pressed={active}
            style={{
              background: active ? 'rgba(var(--c-accent-rgb), 0.08)' : 'transparent',
              border: `1px solid ${active ? 'rgba(var(--c-accent-rgb), 0.55)' : 'var(--c-border)'}`,
              borderRadius: '2px',
              padding: '0.3rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: active ? 'var(--c-accent)' : 'var(--c-muted)',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s, background 0.15s',
              boxShadow: active ? '0 0 8px rgba(var(--c-accent-rgb), 0.12)' : 'none',
            }}
          >
            {tag}
          </motion.button>
        );
      })}

      {/* Clear button */}
      <AnimatePresence>
        {activeTags.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            onClick={() => activeTags.forEach(t => onToggle(t))}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,107,107,0.3)',
              borderRadius: '2px',
              padding: '0.3rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,107,107,0.6)',
              cursor: 'pointer',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,107,107,0.9)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,107,107,0.6)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255,107,107,0.6)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,107,107,0.3)';
            }}
          >
            clear ✕
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Project preview modal ─────────────────────────────────────────────────────

function ProjectPreview({
  item,
  onClose,
}: {
  item: PortfolioItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="project-preview"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal
      aria-label={item.title}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.96)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1.25rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 12 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{ scale: 0.93,    opacity: 0, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#111111',
          border: '1px solid #1E1E1E',
          boxShadow: '0 24px 80px rgba(0,0,0,0.9)',
          maxWidth: 'min(720px, 90vw)',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Image area */}
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0A0A0A', overflow: 'hidden' }}>
          {item.src ? (
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 90vw, 720px"
              style={{ objectFit: 'cover' }}
              priority
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#2A2A2A',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}>
                Preview image coming soon
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              fontWeight: 500,
              color: '#E8E6E1',
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              {item.title}
            </h2>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--c-muted)',
              flexShrink: 0,
            }}>
              {item.year}
            </span>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {item.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,229,255,0.6)',
                  border: '1px solid rgba(0,229,255,0.2)',
                  borderRadius: '2px',
                  padding: '2px 8px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', background: '#1E1E1E' }} />

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--c-text-sub)',
            lineHeight: 1.65,
            margin: 0,
          }}>
            {item.description}
          </p>
        </div>
      </motion.div>

      {/* Close hint */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
      }}>
        Click anywhere or press Esc to close
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PortfolioAlbum() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [spread,     setSpread]     = useState(0);
  const [dir,        setDir]        = useState<1 | -1>(1);
  const [preview,    setPreview]    = useState<PortfolioItem | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Filter by active tags (OR logic)
  const filtered = activeTags.length === 0
    ? portfolioItems
    : portfolioItems.filter(p => p.tags?.some(t => activeTags.includes(t)));

  const totalSpreads = Math.ceil(filtered.length / 4);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setSpread(0);
  }, []);

  const goNext = useCallback(() => {
    if (spread < totalSpreads - 1) { setDir(1);  setSpread(s => s + 1); }
  }, [spread, totalSpreads]);

  const goPrev = useCallback(() => {
    if (spread > 0)                { setDir(-1); setSpread(s => s - 1); }
  }, [spread]);

  const closeAlbum = useCallback(() => {
    setIsOpen(false);
    setSpread(0);
  }, []);

  // Keyboard nav
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') { preview ? setPreview(null) : closeAlbum(); }
      if (!preview && e.key === 'ArrowRight') goNext();
      if (!preview && e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, preview, goNext, goPrev, closeAlbum]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Spread items
  const start        = spread * 4;
  const spreadItems  = filtered.slice(start, start + 4);
  const leftItems    = spreadItems.slice(0, 2);
  const rightItems   = spreadItems.slice(2, 4);
  const hasPrev      = spread > 0;
  const hasNext      = spread < totalSpreads - 1;

  // Rotation preset for this spread
  const rots = ROTATIONS[spread % ROTATIONS.length];

  return (
    <>
      {/* ── Cover + tag strip ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0' }}>
        <BookCover
          count={filtered.length}
          total={portfolioItems.length}
          onOpen={() => setIsOpen(true)}
        />
        <TagStrip activeTags={activeTags} onToggle={toggleTag} />
      </div>

      {/* ── Open modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="portfolio-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeAlbum}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
            }}
          >
            {/* Book */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1,   opacity: 1, y: 0  }}
              exit={{ scale: 0.9,    opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 'min(92vw, 980px)',
                height: 'min(80vh, 640px)',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
                position: 'relative',
              }}
            >
              {/* Top bar */}
              <div style={{
                position: 'absolute',
                top: '-2.4rem', right: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                }}>
                  Esc to close · ← → to navigate
                </span>
                <button
                  onClick={closeAlbum}
                  aria-label="Close portfolio"
                  style={{
                    background: 'none', border: 'none',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    padding: '0 0.25rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                >
                  ✕
                </button>
              </div>

              {/* Pages + binding */}
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
                {filtered.length === 0 ? (
                  <div style={{
                    flex: 1, background: '#0D0D0D',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#444',
                      letterSpacing: '0.08em',
                    }}>
                      No projects match the selected tags.
                    </span>
                  </div>
                ) : (
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={spread}
                      custom={dir}
                      variants={{
                        enter:  (d: number) => ({ x: `${d * 6}%`, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit:   (d: number) => ({ x: `${d * -6}%`, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      style={{ display: 'flex', flex: 1, minWidth: 0 }}
                    >
                      {/* Left page */}
                      {leftItems.length > 0 ? (
                        <PortfolioPage
                          pageItems={leftItems}
                          rotations={[rots[0], rots[1]]}
                          onItemClick={setPreview}
                        />
                      ) : (
                        <div style={{ flex: 1, background: '#0D0D0D' }} />
                      )}

                      {/* Center binding */}
                      <div style={{
                        width: '14px',
                        background: 'linear-gradient(to right, #1a1a1a, #2a2a2a, #1a1a1a)',
                        boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.4), inset 2px 0 4px rgba(0,0,0,0.4)',
                        flexShrink: 0,
                      }} />

                      {/* Right page */}
                      {rightItems.length > 0 ? (
                        <PortfolioPage
                          pageItems={rightItems}
                          rotations={[rots[2], rots[3]]}
                          onItemClick={setPreview}
                        />
                      ) : (
                        <div style={{ flex: 1, background: '#0D0D0D' }} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Nav bar */}
              <div style={{
                background: '#0A0A0A',
                borderTop: '1px solid #1E1E1E',
                padding: '0.6rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                <button
                  onClick={goPrev}
                  disabled={!hasPrev}
                  aria-label="Previous page"
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: hasPrev ? '#888' : '#333',
                    cursor: hasPrev ? 'pointer' : 'default',
                    padding: '0.2rem 0.5rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (hasPrev) (e.currentTarget as HTMLElement).style.color = '#E8E6E1'; }}
                  onMouseLeave={e => { if (hasPrev) (e.currentTarget as HTMLElement).style.color = '#888'; }}
                >
                  ← prev
                </button>

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: '#444',
                }}>
                  {filtered.length === 0
                    ? 'no projects match'
                    : `${start + 1}–${Math.min(start + 4, filtered.length)} of ${filtered.length}`}
                </span>

                <button
                  onClick={goNext}
                  disabled={!hasNext}
                  aria-label="Next page"
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: hasNext ? '#888' : '#333',
                    cursor: hasNext ? 'pointer' : 'default',
                    padding: '0.2rem 0.5rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (hasNext) (e.currentTarget as HTMLElement).style.color = '#E8E6E1'; }}
                  onMouseLeave={e => { if (hasNext) (e.currentTarget as HTMLElement).style.color = '#888'; }}
                >
                  next →
                </button>
              </div>
            </motion.div>

            {/* Tag strip inside modal */}
            <div onClick={e => e.stopPropagation()}>
              <TagStrip activeTags={activeTags} onToggle={toggleTag} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Project preview ── */}
      <AnimatePresence>
        {preview && (
          <ProjectPreview item={preview} onClose={() => setPreview(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
