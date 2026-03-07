'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with page-flip (uses DOM APIs)
const HTMLFlipBook = dynamic(() => import('react-pageflip').then((m) => m.default), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, color: 'var(--c-muted)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em' }} role="status" aria-label="Loading book">
        Loading...
      </span>
    </div>
  ),
});

export interface BookPage {
  content: React.ReactNode;
}

interface BookFlipProps {
  pages: BookPage[];
  width?: number;
  height?: number;
}

export default function BookFlip({ pages, width = 420, height = 560 }: BookFlipProps) {
  const flipBook = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number } }>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pages.length);

  // Responsive sizing
  const [bookWidth, setBookWidth] = useState(width);
  const [bookHeight, setBookHeight] = useState(height);

  useEffect(() => {
    function handleResize() {
      const vw = window.innerWidth;
      if (vw < 900) {
        const scale = Math.min((vw - 48) / (width * 2), 1);
        setBookWidth(Math.floor(width * scale));
        setBookHeight(Math.floor(height * scale));
      } else {
        setBookWidth(width);
        setBookHeight(height);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width, height]);

  useEffect(() => {
    setTotalPages(pages.length);
  }, [pages.length]);

  const goNext = useCallback(() => {
    flipBook.current?.pageFlip().flipNext();
  }, []);

  const goPrev = useCallback(() => {
    flipBook.current?.pageFlip().flipPrev();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
      {/* Book */}
      <div
        style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px #1E1E1E',
          borderRadius: '2px',
        }}
      >
        {/* @ts-expect-error - react-pageflip types */}
        <HTMLFlipBook
          ref={flipBook}
          width={bookWidth}
          height={bookHeight}
          size="fixed"
          minWidth={bookWidth}
          maxWidth={bookWidth}
          minHeight={bookHeight}
          maxHeight={bookHeight}
          drawShadow={true}
          flippingTime={600}
          usePortrait={false}
          startZIndex={1}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{ backgroundColor: '#111111' }}
          onFlip={(e: { data: number }) => setCurrentPage(e.data)}
        >
          {pages.map((page, i) => (
            <div
              key={i}
              className="book-page"
              style={{
                width: bookWidth,
                height: bookHeight,
                background: '#111111',
                border: '1px solid #1E1E1E',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {page.content}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Controls */}
      <div
        role="group"
        aria-label="Page navigation"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <button
          onClick={goPrev}
          className="btn"
          disabled={currentPage === 0}
          aria-label="Previous page"
          style={{ opacity: currentPage === 0 ? 0.3 : 1 }}
        >
          ← Prev
        </button>

        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            color: 'var(--c-muted)',
          }}
        >
          <span className="sr-only">Page </span>
          {currentPage + 1} / {totalPages}
        </span>

        <button
          onClick={goNext}
          className="btn"
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
          style={{ opacity: currentPage >= totalPages - 1 ? 0.3 : 1 }}
        >
          Next →
        </button>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          color: 'var(--c-muted)',
        }}
      >
        Use arrow keys or click page edges to turn
      </div>
    </div>
  );
}
