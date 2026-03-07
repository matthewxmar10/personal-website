'use client';

import { useState, useRef } from 'react';
import EmojiPicker from './EmojiPicker';

interface GuestbookFormProps {
  onSubmit: () => void;
}

export default function GuestbookForm({ onSubmit }: GuestbookFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const charsLeft = 280 - message.length;

  const handleEmojiSelect = (emoji: string) => {
    const el = messageRef.current;
    if (!el) {
      setMessage((m) => m + emoji);
      return;
    }
    const start = el.selectionStart ?? message.length;
    const end = el.selectionEnd ?? message.length;
    const newMessage = message.slice(0, start) + emoji + message.slice(end);
    setMessage(newMessage);
    // Restore cursor position after emoji
    requestAnimationFrame(() => {
      el.selectionStart = start + emoji.length;
      el.selectionEnd = start + emoji.length;
      el.focus();
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setStatus('success');
      setName('');
      setMessage('');
      onSubmit();
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          padding: '2rem',
          textAlign: 'center',
          border: '1px solid rgba(var(--c-accent-rgb), 0.2)',
          borderRadius: '2px',
          background: 'rgba(var(--c-accent-rgb), 0.04)',
        }}
      >
        <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }} aria-hidden="true">✨</div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            color: 'var(--c-accent)',
            marginBottom: '1rem',
          }}
        >
          Thanks for signing! Your entry has been added.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn btn-accent"
          style={{ fontSize: '0.68rem' }}
        >
          Sign again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Name */}
      <div>
        <label htmlFor="gb-name">Your name (optional)</label>
        <input
          id="gb-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Anonymous"
          maxLength={50}
          autoComplete="off"
        />
      </div>

      {/* Message */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label htmlFor="gb-message" style={{ margin: 0 }}>Message *</label>
          <span
            id="gb-chars"
            aria-live="polite"
            aria-atomic="true"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              color: charsLeft < 20 ? 'var(--c-accent-alt)' : 'var(--c-muted)',
              letterSpacing: '0.08em',
            }}
          >
            {charsLeft} left
          </span>
        </div>
        <textarea
          id="gb-message"
          ref={messageRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave a note, say hi, or write anything..."
          maxLength={280}
          rows={4}
          required
          aria-describedby="gb-chars gb-rules"
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
      </div>

      {/* Emoji picker + submit */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        <EmojiPicker onSelect={handleEmojiSelect} />

        <button
          type="submit"
          className="btn btn-accent"
          disabled={status === 'loading' || !message.trim()}
          style={{
            opacity: status === 'loading' || !message.trim() ? 0.5 : 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          {status === 'loading' ? 'Sending...' : 'Sign guestbook →'}
        </button>
      </div>

      {/* Error */}
      {status === 'error' && (
        <p
          role="alert"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--c-accent-alt)',
            margin: 0,
            letterSpacing: '0.04em',
          }}
        >
          {errorMsg}
        </p>
      )}

      <p
        id="gb-rules"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          color: 'var(--c-muted)',
          letterSpacing: '0.06em',
          margin: 0,
        }}
      >
        Keep it kind — light language OK, nothing NSFW. Entries are public.
      </p>
    </form>
  );
}
