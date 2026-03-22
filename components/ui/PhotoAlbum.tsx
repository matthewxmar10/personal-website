'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos } from '@/data/photos';
import type { Photo } from '@/data/photos';

// ── Available tags ─────────────────────────────────────────────────────────────

const ALBUM_TAGS = ['Kris', 'Travel', 'Music', 'Friends', 'Groups'] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtDate(dateStr: string): string {
  const d  = new Date(dateStr + 'T12:00:00');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}/${dd}/${d.getFullYear()}`;
}

// ── Scrapbook slot layouts ────────────────────────────────────────────────────
// 4 slots per spread: [left-page top, left-page bottom, right-page top, right-page bottom]
// Positions are relative to each page container.

interface Slot { top?: string; bottom?: string; left?: string; right?: string; width: string; rotate: number; }

const LAYOUTS: Slot[][] = [
  [
    { top: '7%',    left:  '5%',  width: '64%', rotate: -2.5 },
    { bottom: '7%', right: '4%',  width: '59%', rotate:  1.8 },
    { top: '5%',    right: '5%',  width: '61%', rotate:  2.3 },
    { bottom: '9%', left:  '5%',  width: '62%', rotate: -1.5 },
  ],
  [
    { top: '11%',   left:  '7%',  width: '61%', rotate:  1.6 },
    { bottom: '5%', left:  '3%',  width: '66%', rotate: -2.1 },
    { top: '4%',    left:  '4%',  width: '62%', rotate: -2.7 },
    { bottom: '8%', right: '3%',  width: '60%', rotate:  2.4 },
  ],
  [
    { top: '5%',    right: '6%',  width: '62%', rotate:  2.0 },
    { bottom: '6%', left:  '4%',  width: '58%', rotate: -1.9 },
    { top: '8%',    left:  '5%',  width: '63%', rotate: -2.4 },
    { bottom: '5%', right: '4%',  width: '57%', rotate:  1.6 },
  ],
];

// ── Scrapbook photo card ──────────────────────────────────────────────────────

function ScrapPhoto({
  photo,
  slot,
  onExpand,
}: {
  photo: Photo;
  slot: Slot;
  onExpand: () => void;
}) {
  const { rotate, width, ...pos } = slot;
  return (
    <motion.button
      onClick={onExpand}
      aria-label={`View photo: ${photo.alt}`}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'absolute',
        ...pos,
        width,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'center center',
        zIndex: 1,
      }}
    >
      {/* Photo paper — Polaroid style */}
      <div style={{
        background: '#F3EDD8',
        padding: '7px 7px 26px',
        boxShadow: '0 6px 28px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.3)',
      }}>
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        {/* Date stamp on the paper */}
        <div style={{
          marginTop: '7px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#666',
          textAlign: 'center',
          letterSpacing: '0.06em',
        }}>
          {fmtDate(photo.date)}
        </div>
      </div>
    </motion.button>
  );
}

// ── Album page (holds 2 photos) ───────────────────────────────────────────────

function AlbumPage({
  pagePhotos,
  slotOffset,
  spreadIndex,
  onPhotoClick,
}: {
  pagePhotos: Photo[];
  slotOffset: 0 | 2;          // 0 = left page, 2 = right page
  spreadIndex: number;
  onPhotoClick: (p: Photo) => void;
}) {
  const layout = LAYOUTS[spreadIndex % LAYOUTS.length];

  return (
    <div style={{
      flex: 1,
      position: 'relative',
      height: '100%',
      background: '#EDE5D0',
      backgroundImage: `
        radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.25) 0%, transparent 60%),
        radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.06) 0%, transparent 60%)
      `,
      overflow: 'hidden',
    }}>
      {pagePhotos.map((photo, i) => (
        <ScrapPhoto
          key={photo.id}
          photo={photo}
          slot={layout[slotOffset + i]}
          onExpand={() => onPhotoClick(photo)}
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
  count: number;   // filtered count (shown on cover)
  total: number;   // total photo count (for "no photos yet" check)
  onOpen: () => void;
}) {
  const countLabel = total === 0
    ? 'no photos yet'
    : count === total
      ? `${count} ${count === 1 ? 'photo' : 'photos'}`
      : `${count} of ${total} photos`;

  return (
    <motion.button
      onClick={onOpen}
      aria-label="Open photo album"
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

        {/* Subtle grain overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
          backgroundSize: '180px',
          pointerEvents: 'none',
          opacity: 0.6,
        }} />

        {/* Text content */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.52rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(0,229,255,0.45)',
        }}>
          Photo Album
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

        {/* Divider line */}
        <div style={{
          width: '44px', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,229,255,0.45), transparent)',
        }} />

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          letterSpacing: '0.1em',
          color: 'var(--c-muted)',
          transition: 'color 0.2s',
        }}>
          {countLabel}
        </div>

        {/* Animated hint */}
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

      {/* Right edge (thickness illusion) */}
      <div style={{
        width: '5px',
        background: 'linear-gradient(to left, #1a1a1a, #0a0a0a)',
      }} />
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
      {ALBUM_TAGS.map(tag => {
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

      {/* Clear button — only shown when tags are active */}
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

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal
      aria-label={photo.alt}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: 'rgba(0,0,0,0.94)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1.25rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F3EDD8',
          padding: '10px 10px 32px',
          boxShadow: '0 20px 80px rgba(0,0,0,0.8)',
          maxWidth: 'min(680px, 86vw)',
          width: '100%',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 768px) 86vw, 680px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Caption area on the paper */}
        <div style={{
          paddingTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
        }}>
          {photo.description && (
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: '#444',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
            }}>
              {photo.description}
            </p>
          )}
          <time style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#888',
            letterSpacing: '0.08em',
          }}>
            {fmtDate(photo.date)}
          </time>

          {/* Tags in lightbox */}
          {photo.tags && photo.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
              {photo.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#888',
                  border: '1px solid #ccc',
                  borderRadius: '2px',
                  padding: '1px 6px',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Close hint */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.58rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
      }}>
        Click anywhere or press Esc to close
      </div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PhotoAlbum() {
  const [isOpen,     setIsOpen]     = useState(false);
  const [spread,     setSpread]     = useState(0);
  const [dir,        setDir]        = useState<1 | -1>(1);
  const [lightbox,   setLightbox]   = useState<Photo | null>(null);
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Filter photos by active tags (OR logic — match any selected tag)
  const filteredPhotos = activeTags.length === 0
    ? photos
    : photos.filter(p => p.tags?.some(t => activeTags.includes(t)));

  const totalSpreads = Math.ceil(filteredPhotos.length / 4);

  const toggleTag = useCallback((tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
    setSpread(0); // always reset to first page when filter changes
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
      if (e.key === 'Escape') { lightbox ? setLightbox(null) : closeAlbum(); }
      if (!lightbox && e.key === 'ArrowRight') goNext();
      if (!lightbox && e.key === 'ArrowLeft')  goPrev();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [isOpen, lightbox, goNext, goPrev, closeAlbum]);

  // Lock body scroll when album is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Current 4 photos for this spread (from filtered set)
  const start        = spread * 4;
  const spreadPhotos = filteredPhotos.slice(start, start + 4);
  const leftPhotos   = spreadPhotos.slice(0, 2);
  const rightPhotos  = spreadPhotos.slice(2, 4);
  const hasPrev      = spread > 0;
  const hasNext      = spread < totalSpreads - 1;

  return (
    <>
      {/* ── Cover + tag strip ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0' }}>
        <BookCover
          count={filteredPhotos.length}
          total={photos.length}
          onOpen={() => setIsOpen(true)}
        />
        <TagStrip activeTags={activeTags} onToggle={toggleTag} />
      </div>

      {/* ── Open modal ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="album-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeAlbum}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              padding: '1.5rem',
            }}
          >
            {/* ── Book (stop click propagation) ── */}
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
              {/* Top bar — hints + close button */}
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
                  aria-label="Close album"
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

              {/* Two pages + spine */}
              <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
                {filteredPhotos.length === 0 ? (
                  // Empty state when filter has no results
                  <div style={{
                    flex: 1,
                    background: '#EDE5D0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#999',
                      letterSpacing: '0.08em',
                      textAlign: 'center',
                    }}>
                      No photos match the selected tags.
                    </div>
                  </div>
                ) : (
                  <AnimatePresence mode="wait" custom={dir}>
                    <motion.div
                      key={spread}
                      custom={dir}
                      variants={{
                        enter: (d: number) => ({ x: `${d * 6}%`, opacity: 0 }),
                        center: { x: 0, opacity: 1 },
                        exit:  (d: number) => ({ x: `${d * -6}%`, opacity: 0 }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      style={{ display: 'flex', flex: 1, minWidth: 0 }}
                    >
                      {/* Left page */}
                      {leftPhotos.length > 0 ? (
                        <AlbumPage
                          pagePhotos={leftPhotos}
                          slotOffset={0}
                          spreadIndex={spread}
                          onPhotoClick={setLightbox}
                        />
                      ) : (
                        <div style={{ flex: 1, background: '#EDE5D0' }} />
                      )}

                      {/* Center binding */}
                      <div style={{
                        width: '14px',
                        background: 'linear-gradient(to right, #bfb49e, #ccc3ae, #bfb49e)',
                        boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.18), inset 2px 0 4px rgba(0,0,0,0.18)',
                        flexShrink: 0,
                      }} />

                      {/* Right page */}
                      {rightPhotos.length > 0 ? (
                        <AlbumPage
                          pagePhotos={rightPhotos}
                          slotOffset={2}
                          spreadIndex={spread}
                          onPhotoClick={setLightbox}
                        />
                      ) : (
                        <div style={{ flex: 1, background: '#EDE5D0' }} />
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>

              {/* Page counter + navigation */}
              <div style={{
                background: '#D8CFB8',
                borderTop: '1px solid #C8BFA8',
                padding: '0.6rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}>
                {/* Prev */}
                <button
                  onClick={goPrev}
                  disabled={!hasPrev}
                  aria-label="Previous page"
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: hasPrev ? '#555' : '#b0a898',
                    cursor: hasPrev ? 'pointer' : 'default',
                    padding: '0.2rem 0.5rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (hasPrev) (e.currentTarget as HTMLElement).style.color = '#222'; }}
                  onMouseLeave={e => { if (hasPrev) (e.currentTarget as HTMLElement).style.color = '#555'; }}
                >
                  ← prev
                </button>

                {/* Spread counter */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  color: '#888',
                }}>
                  {filteredPhotos.length === 0
                    ? 'no photos match'
                    : `${start + 1}–${Math.min(start + 4, filteredPhotos.length)} of ${filteredPhotos.length}`}
                </span>

                {/* Next */}
                <button
                  onClick={goNext}
                  disabled={!hasNext}
                  aria-label="Next page"
                  style={{
                    background: 'none', border: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: hasNext ? '#555' : '#b0a898',
                    cursor: hasNext ? 'pointer' : 'default',
                    padding: '0.2rem 0.5rem',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { if (hasNext) (e.currentTarget as HTMLElement).style.color = '#222'; }}
                  onMouseLeave={e => { if (hasNext) (e.currentTarget as HTMLElement).style.color = '#555'; }}
                >
                  next →
                </button>
              </div>
            </motion.div>

            {/* ── Tag strip inside modal ── */}
            <div onClick={e => e.stopPropagation()}>
              <TagStrip activeTags={activeTags} onToggle={toggleTag} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
