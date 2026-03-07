'use client';

import { useEffect, useMemo, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEmerald } from '@/context/EmeraldContext';
import { EMERALDS } from '@/data/emeralds';

// ── Falling golden rings ──────────────────────────────────────────────────────

interface RingDef { key: number; left: string; delay: string; duration: string; size: string; }

function FallingRings() {
  const shouldReduce = useReducedMotion();

  const rings = useMemo<RingDef[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      key: i,
      left: `${(i * 7 + 3) % 100}%`,
      delay: `${((i * 0.41) % 3).toFixed(2)}s`,
      duration: `${(1.6 + (i * 0.17) % 1.4).toFixed(2)}s`,
      size: `${18 + (i * 5) % 18}px`,
    })),
  []);

  if (shouldReduce) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {rings.map((r) => (
        <div
          key={r.key}
          className="ring-fall"
          style={{
            position: 'absolute',
            top: '-40px',
            left: r.left,
            width: r.size,
            height: r.size,
            animationDelay: r.delay,
            animationDuration: r.duration,
          }}
        />
      ))}
    </div>
  );
}

// ── Small gem row ─────────────────────────────────────────────────────────────

function TinyGem({ color, found }: { color: string; found: boolean }) {
  return (
    <svg width="36" height="42" viewBox="0 0 48 56" fill="none" aria-hidden="true"
      style={{
        filter: found
          ? `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 14px ${color}88)`
          : 'none',
        opacity: found ? 1 : 0.18,
        transition: 'opacity 0.4s ease, filter 0.4s ease',
      }}
    >
      <polygon points="24,2 4,16 24,22"  fill={color} fillOpacity="0.72" />
      <polygon points="24,2 44,16 24,22" fill={color} fillOpacity="0.92" />
      <polygon points="4,16 44,16 24,22" fill="white"  fillOpacity="0.16" />
      <polygon points="4,16 24,22 24,54" fill={color} fillOpacity="0.62" />
      <polygon points="44,16 24,22 24,54" fill={color} fillOpacity="0.88" />
      <polygon points="24,2 32,11 24,15 16,11" fill="white" fillOpacity="0.38" />
    </svg>
  );
}

// ── Shadow GIF + audio player ─────────────────────────────────────────────────

function ShadowPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.75);

  // Attempt autoplay on mount (works because we're within a user-gesture session)
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
    el.play()
      .then(() => setIsPlaying(true))
      .catch(() => { /* autoplay blocked — user can click play */ });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem', marginBottom: '1.5rem' }}>
      {/* Shadow dancing GIF */}
      <div style={{
        width: '180px',
        height: '180px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(255,215,0,0.2)',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shadow-dance.gif"
          alt="Shadow the Hedgehog"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Song label */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: '#555',
        margin: 0,
      }}>
        Escape from the City — Sonic Adv. 2
      </p>

      {/* Audio controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        background: '#111',
        border: '1px solid #222',
        borderRadius: '3px',
        padding: '0.4rem 0.75rem',
      }}>
        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            background: 'none',
            border: 'none',
            color: '#FFD700',
            fontSize: '0.95rem',
            cursor: 'pointer',
            padding: '0 2px',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Volume icon */}
        <span style={{ color: '#555', fontSize: '0.75rem', flexShrink: 0 }} aria-hidden="true">
          {volume === 0 ? '🔇' : volume < 0.4 ? '🔈' : volume < 0.75 ? '🔉' : '🔊'}
        </span>

        {/* Volume slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          aria-label="Volume"
          className="volume-slider"
          style={{ width: '90px' }}
        />
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/escape-from-the-city.m4a" loop preload="auto" />
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function EmeraldSuccessModal() {
  const { showSuccess, dismissSuccess, foundIds } = useEmerald();
  const shouldReduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape key
  useEffect(() => {
    if (!showSuccess) return;
    setTimeout(() => closeRef.current?.focus(), 80);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissSuccess();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showSuccess, dismissSuccess]);

  const handleUnlock = useCallback(() => dismissSuccess(), [dismissSuccess]);

  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          key="emerald-success"
          role="dialog"
          aria-modal="true"
          aria-label="All Chaos Emeralds collected!"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99950,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Dark backdrop */}
          <div
            onClick={dismissSuccess}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.94)', zIndex: 0 }}
          />

          <FallingRings />

          {/* Content panel */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 1,
              background: '#0D0D0D',
              border: '1px solid rgba(255,215,0,0.25)',
              borderRadius: '4px',
              padding: '2rem 1.75rem',
              maxWidth: '520px',
              width: '90vw',
              maxHeight: '90vh',
              overflowY: 'auto',
              textAlign: 'center',
              boxShadow: '0 0 60px rgba(255,215,0,0.12), 0 0 120px rgba(255,215,0,0.06)',
            }}
            initial={shouldReduce ? {} : { y: 40, scale: 0.93 }}
            animate={{ y: 0, scale: 1 }}
            exit={shouldReduce ? {} : { y: 30, scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              onClick={dismissSuccess}
              aria-label="Close"
              style={{
                position: 'absolute', top: '12px', right: '14px',
                background: 'none', border: 'none',
                color: '#555', fontSize: '1.1rem',
                cursor: 'pointer', lineHeight: 1,
                padding: '4px 6px', fontFamily: 'var(--font-mono)',
              }}
            >
              ✕
            </button>

            {/* Eyebrow */}
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#666', marginBottom: '0.4rem',
            }}>
              All 7 Chaos Emeralds Collected
            </p>

            {/* Headline */}
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.2rem, 4vw, 1.85rem)',
              fontWeight: 700,
              color: '#FFD700',
              textShadow: '0 0 20px rgba(255,215,0,0.6), 0 0 40px rgba(255,215,0,0.3)',
              letterSpacing: '-0.02em',
              marginBottom: '1.25rem',
              lineHeight: 1.2,
            }}>
              ULTIMATE POWER<br />IS YOURS
            </h2>

            {/* 7 gems row */}
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}
              aria-label="All 7 Chaos Emeralds"
            >
              {EMERALDS.map((e) => (
                <TinyGem key={e.id} color={e.color} found={foundIds.includes(e.id)} />
              ))}
            </div>

            {/* Message */}
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
              color: '#C8C6C1', lineHeight: 1.7,
              maxWidth: '40ch', margin: '0 auto 1.5rem',
            }}>
              You found all seven hidden across the site.
              The ultimate power is yours — now claim your reward.
            </p>

            {/* Shadow GIF + audio player */}
            <ShadowPlayer />

            {/* CTA */}
            <Link
              href="/secret"
              onClick={handleUnlock}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.7rem 1.6rem',
                fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#0A0A0A',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                borderRadius: '2px', textDecoration: 'none', fontWeight: 700,
                boxShadow: '0 0 24px rgba(255,215,0,0.4), 0 0 48px rgba(255,215,0,0.15)',
                transition: 'box-shadow 0.2s ease, transform 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 36px rgba(255,215,0,0.6), 0 0 72px rgba(255,215,0,0.25)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 24px rgba(255,215,0,0.4), 0 0 48px rgba(255,215,0,0.15)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              ⚡ Click here to unlock your secret
            </Link>

            <p style={{
              marginTop: '0.9rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              letterSpacing: '0.08em', color: '#333', textTransform: 'uppercase',
            }}>
              Press Esc or click outside to close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
