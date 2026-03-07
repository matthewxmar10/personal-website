'use client';

import { usePathname } from 'next/navigation';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEmerald } from '@/context/EmeraldContext';
import { EMERALDS } from '@/data/emeralds';
import { useTheme } from '@/context/ThemeContext';

// ── Web Audio chime ───────────────────────────────────────────────────────────

const CHIME_FREQS: Record<string, [number, number]> = {
  cyan:   [1108.73, 1318.51],
  purple: [987.77,  1174.66],
  red:    [1046.50, 1244.51],
  yellow: [1174.66, 1396.91],
  blue:   [1318.51, 1567.98],
  green:  [1244.51, 1480.00],
  silver: [1396.91, 1661.22],
};

function playChime(colorName: string) {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const [s, e] = CHIME_FREQS[colorName] ?? [1108.73, 1318.51];

    const tone = (type: OscillatorType, start: number, end: number, vol: number, dur: number) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(start, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(end, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(vol,   ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    };

    tone('sine',     s,     e,     0.35, 0.75);
    tone('sine',     s * 2, e * 2, 0.12, 0.55);
    tone('triangle', s * 3, e * 3, 0.04, 0.35);
  } catch { /* AudioContext unavailable */ }
}

// ── Gem SVG ───────────────────────────────────────────────────────────────────

function GemSVG({ color, size = 48 }: { color: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <polygon points="24,2 4,16 24,22"  fill={color} fillOpacity="0.72" />
      <polygon points="24,2 44,16 24,22" fill={color} fillOpacity="0.92" />
      <polygon points="4,16 44,16 24,22" fill="white"  fillOpacity="0.16" />
      <polygon points="4,16 24,22 24,54" fill={color} fillOpacity="0.62" />
      <polygon points="44,16 24,22 24,54" fill={color} fillOpacity="0.88" />
      <polygon points="24,2 32,11 24,15 16,11" fill="white" fillOpacity="0.38" />
      <polygon points="24,22 36,19 24,42 12,19" fill="white" fillOpacity="0.07" />
    </svg>
  );
}

// ── Flying gem ────────────────────────────────────────────────────────────────

function EmeraldFlyer() {
  const { flyingEmerald, trackerRef } = useEmerald();
  const shouldReduce = useReducedMotion();

  if (!flyingEmerald) return null;

  const badge = trackerRef.current?.getBoundingClientRect();
  const toX = badge ? badge.left + badge.width  / 2 - 12 : window.innerWidth - 60;
  const toY = badge ? badge.top  + badge.height / 2 - 14 : 22;

  return (
    <AnimatePresence>
      <motion.div
        key={flyingEmerald.id + '-flyer'}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 99900, pointerEvents: 'none' }}
        initial={{
          x: flyingEmerald.fromX - 24,
          y: flyingEmerald.fromY - 28,
          scale: 1.35,
          opacity: 1,
          filter: `drop-shadow(0 0 16px ${flyingEmerald.color})`,
        }}
        animate={
          shouldReduce
            ? { x: toX, y: toY, scale: 0.42, opacity: 0 }
            : {
                x: toX,
                y: toY,
                scale: 0.42,
                opacity: [1, 1, 0.8],
                filter: `drop-shadow(0 0 6px ${flyingEmerald.color})`,
              }
        }
        transition={shouldReduce ? { duration: 0.15 } : { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        exit={{ opacity: 0 }}
      >
        <GemSVG color={flyingEmerald.color} size={48} />
      </motion.div>
    </AnimatePresence>
  );
}

// ── Page emerald ──────────────────────────────────────────────────────────────

function PageEmerald() {
  const pathname = usePathname();
  const { assignments, foundIds, findEmerald, flyingEmerald } = useEmerald();
  const { theme } = useTheme();
  const shouldReduce = useReducedMotion();
  const [collected, setCollected] = useState(false);
  const gemRef = useRef<HTMLButtonElement>(null);

  // Reset local "collected" flag whenever the page changes so the next
  // page's gem isn't hidden by a stale true value from the previous page.
  useEffect(() => {
    setCollected(false);
  }, [pathname]);

  // Find assignment for this page
  const assignment = assignments.find((a) => a.page === pathname);
  const emerald    = assignment ? EMERALDS.find((e) => e.id === assignment.id) : undefined;

  const isFound   = emerald ? foundIds.includes(emerald.id) : false;
  const isFlying  = flyingEmerald?.id === emerald?.id;
  const visible   = !!emerald && !!assignment && !isFound && !collected && !isFlying;

  // Pick theme-appropriate colour
  const effectiveColor = emerald
    ? (theme === 'light' ? emerald.colorLight : emerald.color)
    : '#00FFEE';

  const handleClick = useCallback(() => {
    if (!emerald || !gemRef.current) return;
    const rect = gemRef.current.getBoundingClientRect();
    setCollected(true);
    playChime(emerald.colorName);
    findEmerald(emerald.id, rect);
  }, [emerald, findEmerald]);

  if (!emerald || !assignment) return null;

  // Dark drop-shadow ensures visibility on both dark AND light backgrounds
  const baseShadow = `drop-shadow(0 2px 5px rgba(0,0,0,0.55))`;
  const glowLo = `${baseShadow} drop-shadow(0 0 8px  ${effectiveColor}bb)`;
  const glowHi = `${baseShadow} drop-shadow(0 0 14px ${effectiveColor})`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={gemRef}
          key={`emerald-${emerald.id}`}
          onClick={handleClick}
          aria-label={`${emerald.label} — click to collect!`}
          title="A hidden gem…"
          style={{
            position: 'fixed',
            ...assignment.position,
            zIndex: 5000,
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            shouldReduce
              ? { opacity: 0.9, scale: 1, filter: glowLo }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                  filter: [glowLo, glowHi, glowLo],
                }
          }
          transition={
            shouldReduce
              ? { duration: 0.4 }
              : {
                  opacity: { duration: 0.5 },
                  scale:   { duration: 0.5 },
                  y:      { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                  filter: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                }
          }
          whileHover={shouldReduce ? undefined : { scale: 1.28 }}
          exit={{ opacity: 0, scale: 1.6, transition: { duration: 0.22 } }}
        >
          <span className="emerald-spin-wrapper" aria-hidden="true">
            <GemSVG color={effectiveColor} size={48} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ── System (rendered in layout) ───────────────────────────────────────────────

export default function ChaosEmeraldSystem() {
  return (
    <>
      <PageEmerald />
      <EmeraldFlyer />
    </>
  );
}
