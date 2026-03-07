'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEmerald } from '@/context/EmeraldContext';
import { useTheme } from '@/context/ThemeContext';
import { EMERALDS, TOTAL_EMERALDS } from '@/data/emeralds';

// ── Tiny gem SVG ──────────────────────────────────────────────────────────────

function MiniGem({ color }: { color: string }) {
  return (
    <svg width="16" height="18" viewBox="0 0 48 56" fill="none" aria-hidden="true">
      <polygon points="24,2 4,16 24,22"  fill={color} fillOpacity="0.72" />
      <polygon points="24,2 44,16 24,22" fill={color} fillOpacity="0.92" />
      <polygon points="4,16 44,16 24,22" fill="white"  fillOpacity="0.16" />
      <polygon points="4,16 24,22 24,54" fill={color} fillOpacity="0.62" />
      <polygon points="44,16 24,22 24,54" fill={color} fillOpacity="0.88" />
      <polygon points="24,2 32,11 24,15 16,11" fill="white" fillOpacity="0.38" />
    </svg>
  );
}

// ── Reset icon SVG ────────────────────────────────────────────────────────────

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// ── Icon button ───────────────────────────────────────────────────────────────

function IconButton({
  onClick,
  label,
  children,
  glowColor,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  glowColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(255,215,0,0.12)' : 'rgba(13,13,13,0.88)',
        border: `1px solid ${hovered ? 'rgba(255,215,0,0.55)' : 'rgba(255,215,0,0.22)'}`,
        borderRadius: '3px',
        color: hovered ? '#FFD700' : 'rgba(255,215,0,0.55)',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease',
        boxShadow: hovered ? `0 0 10px ${glowColor}` : 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </button>
  );
}

// ── Main HUD ──────────────────────────────────────────────────────────────────

export default function EmeraldHUD() {
  const { foundIds, trackerRef, openSuccess, resetProgress } = useEmerald();
  const { theme } = useTheme();
  const shouldReduce = useReducedMotion();

  const count      = foundIds.length;
  const isComplete = count === TOTAL_EMERALDS;
  const visible    = count > 0;

  const goldText = theme === 'light' ? '#7A5000' : 'rgba(255,215,0,0.85)';
  const goldFull = theme === 'light' ? '#9A6600' : '#FFD700';
  const emptyDot = theme === 'light' ? '#BBBBBB' : '#2A2A2A';
  const barBorder = isComplete
    ? 'rgba(255,215,0,0.45)'
    : (theme === 'light' ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.1)');
  const barGlow = isComplete
    ? '0 0 18px rgba(255,215,0,0.25), 0 2px 8px rgba(0,0,0,0.4)'
    : '0 2px 8px rgba(0,0,0,0.35)';

  // ── IMPORTANT: this outer div is ALWAYS in the DOM so that trackerRef is
  // always attached. EmeraldFlyer reads trackerRef to know where to fly gems —
  // if the bar were inside AnimatePresence, the ref would be null on the first
  // gem collection (because the bar hasn't mounted yet) and the gem would fly
  // to the wrong place. The visible content (bar + buttons) is conditionally
  // rendered inside, but the anchor wrapper never unmounts.
  return (
    <div
      ref={trackerRef}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9100,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* ── Left: reset button (7/7 only) ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="reset-btn"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            <IconButton
              onClick={resetProgress}
              label="Reset emerald progress"
              glowColor="rgba(255,215,0,0.35)"
            >
              <ResetIcon />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Centre: gem dots + count (appears on first find) ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="bar"
            aria-label={`${count} of ${TOTAL_EMERALDS} Chaos Emeralds found`}
            title={`${count}/${TOTAL_EMERALDS} Chaos Emeralds`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 10px',
              background: theme === 'light'
                ? 'rgba(255,255,255,0.88)'
                : 'rgba(13,13,13,0.88)',
              border: `1px solid ${barBorder}`,
              borderRadius: '3px',
              boxShadow: barGlow,
              backdropFilter: 'blur(10px)',
              transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
            }}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Gem dots */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              {EMERALDS.map((e) => {
                const found    = foundIds.includes(e.id);
                const dotColor = found
                  ? (theme === 'light' ? e.colorLight : e.color)
                  : emptyDot;
                return (
                  <div
                    key={e.id}
                    aria-hidden="true"
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: dotColor,
                      boxShadow: found ? `0 0 6px ${dotColor}` : 'none',
                      transition: 'background 0.4s ease, box-shadow 0.4s ease',
                      flexShrink: 0,
                    }}
                  />
                );
              })}
            </div>

            {/* Count */}
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.08em',
              color: isComplete ? goldFull : goldText,
              textShadow: isComplete && theme === 'dark'
                ? '0 0 8px rgba(255,215,0,0.6)'
                : 'none',
              lineHeight: 1,
              transition: 'color 0.4s ease, text-shadow 0.4s ease',
              userSelect: 'none',
            }}>
              {count}/{TOTAL_EMERALDS}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Right: re-open modal button (7/7 only) ── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            key="open-modal-btn"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
          >
            <IconButton
              onClick={openSuccess}
              label="View your reward"
              glowColor="rgba(255,215,0,0.45)"
            >
              <MiniGem color="#FFD700" />
            </IconButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
