'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageTransition from '@/components/ui/PageTransition';
import BookFlip from '@/components/ui/BookFlip';
import { photos } from '@/data/photos';

function PhotoPage({ photo }: { photo: { src: string; description: string; date: string; alt: string } }) {
  const d = new Date(photo.date + 'T00:00:00');
  const formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem' }}>
      {/* Image area */}
      <div
        style={{
          flex: 1,
          background: '#0D0D0D',
          border: '1px solid #1E1E1E',
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            // Fallback for placeholder images
            (e.target as HTMLImageElement).style.display = 'none';
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = `<span style="font-family: var(--font-mono); font-size: 0.6rem; color: #2A2A2A; letter-spacing: 0.1em; text-transform: uppercase;">Photo</span>`;
            }
          }}
        />
      </div>

      {/* Caption */}
      <figcaption>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: 'var(--c-muted)', margin: '0 0 0.3rem', lineHeight: 1.5 }}>
          {photo.description}
        </p>
        <time
          dateTime={photo.date}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--c-muted)', display: 'block' }}
        >
          {formatted}
        </time>
      </figcaption>
    </div>
  );
}

function CoverPage() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '2rem', gap: '1rem',
      background: 'linear-gradient(135deg, var(--c-surface) 0%, var(--c-bg) 100%)',
    }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--c-muted)' }}>
        Photo Album
      </div>
      <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 500, color: 'var(--c-accent)', textShadow: '0 0 20px rgba(var(--c-accent-rgb), 0.3)', textAlign: 'center', margin: 0 }}>
        Matthew
      </h2>
      <div aria-hidden="true" style={{ width: 40, height: 1, background: 'rgba(var(--c-accent-rgb), 0.3)' }} />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--c-muted)', textAlign: 'center' }}>
        {photos.length} photos · newest first
      </div>
    </div>
  );
}

export default function PhotosPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [lightbox]);

  // Build book pages: cover + one page per photo
  const bookPages = [
    { content: <CoverPage /> },
    ...photos.map((photo) => ({
      content: (
        <button
          style={{ width: '100%', height: '100%', background: 'none', border: 'none', padding: 0 }}
          onClick={() => setLightbox({ src: photo.src, alt: photo.alt })}
          aria-label={`View full size: ${photo.alt}`}
        >
          <PhotoPage photo={photo} />
        </button>
      ),
    })),
  ];

  return (
    <PageTransition>
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <PageHeader
          title="Photo Album"
          subtitle="Moments, places, and things worth remembering. Newest first."
          breadcrumbs={[{ label: 'Profile', href: '/profile/about' }, { label: 'Photo Album', href: '/profile/photos' }]}
        />

        <BookFlip pages={bookPages} width={380} height={520} />

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--c-muted)', letterSpacing: '0.08em' }}>
            Click a photo to view full size · use arrow keys to turn pages
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          style={{
            position: 'fixed', inset: 0, zIndex: 9900,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '2rem',
          }}
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '2px' }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
            style={{
              position: 'absolute', top: '1rem', right: '1.5rem',
              background: 'none', border: 'none', color: 'var(--c-muted)',
              fontFamily: 'var(--font-mono)', fontSize: '1rem',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </PageTransition>
  );
}
