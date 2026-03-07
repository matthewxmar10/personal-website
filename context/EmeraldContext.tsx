'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  EMERALDS,
  TOTAL_EMERALDS,
  FIXED_PAGES,
  RANDOM_EMERALD_IDS,
  RANDOM_PAGE_POOL,
  type EmeraldAssignment,
  type EmeraldPosition,
} from '@/data/emeralds';

const FOUND_KEY  = 'chaos-emeralds-found';
const ASSIGN_KEY = 'chaos-emerald-assignments';

// ── Types ─────────────────────────────────────────────────────────────────────

export type { EmeraldAssignment };

export interface FlyingEmerald {
  id: string;
  color: string;
  fromX: number;
  fromY: number;
}

interface EmeraldContextValue {
  /** Where each emerald lives this session */
  assignments: EmeraldAssignment[];
  foundIds: string[];
  flyingEmerald: FlyingEmerald | null;
  showSuccess: boolean;
  trackerRef: React.RefObject<HTMLDivElement | null>;
  findEmerald: (id: string, rect: DOMRect) => void;
  dismissSuccess: () => void;
  /** Re-open the success modal (for users who already found all 7) */
  openSuccess: () => void;
  /** Wipe found progress and re-randomise positions for a fresh hunt */
  resetProgress: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const EmeraldContext = createContext<EmeraldContextValue | null>(null);

// ── Position helpers ──────────────────────────────────────────────────────────

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPos(): EmeraldPosition {
  // 6 zones: top-left/right, mid-left/right, bottom-left/right
  // Top 56px = nav bar — stay at least 90px from top when using top offset
  const zone = Math.floor(Math.random() * 6);
  const h  = randomInt(36, 140);   // horizontal offset in px
  const v  = randomInt(90, 230);   // vertical offset in px (top zones)
  const bv = randomInt(80, 260);   // vertical offset in px (bottom zones)
  const mv = randomInt(35, 55);    // midpoint in vh
  switch (zone) {
    case 0: return { top: `${v}px`,  left:  `${h}px` };
    case 1: return { top: `${v}px`,  right: `${h}px` };
    case 2: return { top: `${mv}vh`, left:  `${h}px` };
    case 3: return { top: `${mv}vh`, right: `${h}px` };
    case 4: return { bottom: `${bv}px`, left:  `${h}px` };
    default:return { bottom: `${bv}px`, right: `${h}px` };
  }
}

function generateAssignments(): EmeraldAssignment[] {
  // 4 fixed page-emerald pairs with random on-page positions
  const fixed: EmeraldAssignment[] = FIXED_PAGES.map(({ id, page }) => ({
    id,
    page,
    position: randomPos(),
  }));

  // 3 emeralds get randomly assigned to pages from the pool
  const shuffled = [...RANDOM_PAGE_POOL].sort(() => Math.random() - 0.5);
  const random: EmeraldAssignment[] = RANDOM_EMERALD_IDS.map((id, i) => ({
    id,
    page: shuffled[i],
    position: randomPos(),
  }));

  return [...fixed, ...random];
}

function parseAssignments(raw: unknown): EmeraldAssignment[] | null {
  if (!Array.isArray(raw)) return null;
  // Validate each entry has the right shape
  for (const item of raw) {
    if (
      typeof item !== 'object' ||
      item === null ||
      typeof (item as Record<string, unknown>).id !== 'string' ||
      typeof (item as Record<string, unknown>).page !== 'string' ||
      typeof (item as Record<string, unknown>).position !== 'object'
    ) {
      return null;
    }
  }
  return raw as EmeraldAssignment[];
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function EmeraldProvider({ children }: { children: React.ReactNode }) {
  const [assignments, setAssignments] = useState<EmeraldAssignment[]>([]);
  const [foundIds, setFoundIds]       = useState<string[]>([]);
  const [flyingEmerald, setFlyingEmerald] = useState<FlyingEmerald | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const trackerRef = useRef<HTMLDivElement | null>(null);

  // ── Hydrate from / write to localStorage ──────────────────────────────────

  useEffect(() => {
    // --- Assignments ---
    let loaded: EmeraldAssignment[] | null = null;
    try {
      const raw = localStorage.getItem(ASSIGN_KEY);
      if (raw) loaded = parseAssignments(JSON.parse(raw));
    } catch { /* ignore */ }

    if (!loaded || loaded.length !== TOTAL_EMERALDS) {
      // First visit, or stale data — generate fresh assignments
      const fresh = generateAssignments();
      setAssignments(fresh);
      try { localStorage.setItem(ASSIGN_KEY, JSON.stringify(fresh)); } catch { /* ignore */ }
    } else {
      setAssignments(loaded);
    }

    // --- Found IDs ---
    try {
      const saved = localStorage.getItem(FOUND_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setFoundIds(parsed.filter((x): x is string => typeof x === 'string'));
        }
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (foundIds.length === 0) return; // avoid writing empty array on initial render
    try { localStorage.setItem(FOUND_KEY, JSON.stringify(foundIds)); } catch { /* ignore */ }
  }, [foundIds]);

  // ── Actions ─────────────────────────────────────────────────────────────────

  const findEmerald = useCallback((id: string, rect: DOMRect) => {
    const emerald = EMERALDS.find((e) => e.id === id);
    if (!emerald) return;

    setFlyingEmerald({
      id,
      color: emerald.color,
      fromX: rect.left + rect.width  / 2,
      fromY: rect.top  + rect.height / 2,
    });

    setTimeout(() => {
      setFlyingEmerald(null);
      setFoundIds((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        if (next.length === TOTAL_EMERALDS) {
          setTimeout(() => setShowSuccess(true), 450);
        }
        return next;
      });
    }, 700);
  }, []);

  const dismissSuccess = useCallback(() => setShowSuccess(false), []);
  const openSuccess    = useCallback(() => setShowSuccess(true),  []);

  const resetProgress = useCallback(() => {
    const fresh = generateAssignments();
    setFoundIds([]);
    setAssignments(fresh);
    setShowSuccess(false);
    try {
      localStorage.removeItem(FOUND_KEY);
      localStorage.setItem(ASSIGN_KEY, JSON.stringify(fresh));
    } catch { /* ignore */ }
  }, []);

  return (
    <EmeraldContext.Provider
      value={{ assignments, foundIds, flyingEmerald, showSuccess, trackerRef, findEmerald, dismissSuccess, openSuccess, resetProgress }}
    >
      {children}
    </EmeraldContext.Provider>
  );
}

// ── Consumer hook ─────────────────────────────────────────────────────────────

export function useEmerald(): EmeraldContextValue {
  const ctx = useContext(EmeraldContext);
  if (!ctx) throw new Error('useEmerald must be used inside <EmeraldProvider>');
  return ctx;
}
