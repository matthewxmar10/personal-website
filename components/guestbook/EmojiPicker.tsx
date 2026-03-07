'use client';

import { useState, useEffect, useRef } from 'react';
import { STANDARD_EMOJIS, CUSTOM_EMOJIS } from '@/data/emojis';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
}

export default function EmojiPicker({ onSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'standard' | 'custom'>('standard');
  const triggerRef = useRef<HTMLButtonElement>(null);

  const hasCustom = CUSTOM_EMOJIS.length > 0;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn"
        style={{ fontSize: '0.9rem', padding: '0.4rem 0.7rem', lineHeight: 1 }}
        aria-label="Insert emoji"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="Insert emoji"
      >
        <span aria-hidden="true">😊</span>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, zIndex: 100 }}
            onClick={() => setOpen(false)}
          />

          {/* Picker panel */}
          <div
            role="dialog"
            aria-label="Emoji picker"
            aria-modal="true"
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 8px)',
              left: 0,
              zIndex: 101,
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: '4px',
              padding: '0.75rem',
              width: '280px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* Tabs (only shown if custom emojis exist) */}
            {hasCustom && (
              <div
                role="tablist"
                aria-label="Emoji categories"
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  borderBottom: '1px solid var(--c-border)',
                  paddingBottom: '0.5rem',
                }}
              >
                {(['standard', 'custom'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    onClick={() => setTab(t)}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: tab === t ? 'var(--c-accent)' : 'var(--c-muted)',
                      background: 'none',
                      border: 'none',
                      padding: '2px 0',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            {/* Standard emojis */}
            {tab === 'standard' && (
              <div className="emoji-grid" role="tabpanel" aria-label="Standard emojis">
                {STANDARD_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="emoji-btn"
                    onClick={() => {
                      onSelect(emoji);
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                    aria-label={`Insert ${emoji}`}
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}

            {/* Custom emojis */}
            {tab === 'custom' && (
              <div className="emoji-grid" role="tabpanel" aria-label="Custom emojis">
                {CUSTOM_EMOJIS.map((emoji) => (
                  <button
                    key={emoji.name}
                    type="button"
                    className="emoji-btn"
                    onClick={() => {
                      onSelect(emoji.name);
                      setOpen(false);
                      triggerRef.current?.focus();
                    }}
                    aria-label={`Insert ${emoji.alt}`}
                    title={emoji.alt}
                    style={{ padding: '2px' }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={emoji.src}
                      alt={emoji.alt}
                      style={{ width: 24, height: 24, objectFit: 'contain' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
