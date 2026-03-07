'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

const WORDS = ['actor', 'musician', 'gamer', 'creator', 'builder'];
const INTERVAL = 2500;

export default function WordCycler() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const { theme } = useTheme();

  const isLight = theme === 'light';

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, 350);
    }, INTERVAL);

    return () => clearInterval(cycle);
  }, []);

  // Per-theme values
  const activeColor      = isLight ? '#007FA3'                : '#00E5FF';
  const activeGlow       = isLight ? 'none'                   : (visible ? '0 0 8px rgba(0,229,255,0.5)' : 'none');
  const inactiveColor    = isLight ? '#777777'                : '#444444';
  const inactiveOpacity  = isLight ? 0.45                     : 0.2;
  const dotColor         = isLight ? '#AAAAAA'                : '#2A2A2A';
  const dashColor        = isLight ? '#888888'                : '#444444';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      {/* Screen reader: announce current active word */}
      <span
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        {WORDS[index]}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: dashColor,
        }}
      >
        —
      </span>

      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(0.75rem, 2vw, 0.9rem)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        {WORDS.map((word, i) => (
          <span
            key={word}
            style={{
              opacity: i === index ? (visible ? 1 : 0) : inactiveOpacity,
              color: i === index ? activeColor : inactiveColor,
              textShadow: i === index ? activeGlow : 'none',
              transition: 'opacity 0.3s ease, color 0.3s ease, text-shadow 0.3s ease',
              display: 'inline-block',
            }}
          >
            {word}
            {i < WORDS.length - 1 && (
              <span
                style={{
                  color: dotColor,
                  marginLeft: '0.5rem',
                  opacity: 1,
                  textShadow: 'none',
                }}
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
