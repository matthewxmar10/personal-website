// ── Emerald colour definitions ────────────────────────────────────────────────
// Page assignments and positions are generated at runtime (see EmeraldContext).

export interface Emerald {
  id: string;
  /** Vivid colour — ideal for dark mode or as the glow colour */
  color: string;
  /** Darker / more saturated colour for light-mode readability */
  colorLight: string;
  colorName: string; // for aria labels and chime map
  label: string;     // full accessible label
}

export const EMERALDS: Emerald[] = [
  {
    id: 'cyan',
    color: '#00FFEE',
    colorLight: '#009AB5',
    colorName: 'cyan',
    label: 'Cyan Chaos Emerald',
  },
  {
    id: 'purple',
    color: '#CC44FF',
    colorLight: '#9A00D4',
    colorName: 'purple',
    label: 'Purple Chaos Emerald',
  },
  {
    id: 'red',
    color: '#FF3355',
    colorLight: '#CC0022',
    colorName: 'red',
    label: 'Red Chaos Emerald',
  },
  {
    id: 'yellow',
    color: '#FFE000',
    colorLight: '#C8A800',
    colorName: 'yellow',
    label: 'Yellow Chaos Emerald',
  },
  {
    id: 'blue',
    color: '#4488FF',
    colorLight: '#1155CC',
    colorName: 'blue',
    label: 'Blue Chaos Emerald',
  },
  {
    id: 'green',
    color: '#33FF77',
    colorLight: '#00AA44',
    colorName: 'green',
    label: 'Green Chaos Emerald',
  },
  {
    id: 'silver',
    color: '#CCDDED',
    colorLight: '#556677',  // much darker so it's visible on light backgrounds
    colorName: 'silver',
    label: 'Silver Chaos Emerald',
  },
];

export const TOTAL_EMERALDS = EMERALDS.length; // 7

// ── Assignment config ─────────────────────────────────────────────────────────

/** Emeralds that always land on specific pages (position within page is random) */
export const FIXED_PAGES: Array<{ id: string; page: string }> = [
  { id: 'cyan',   page: '/' },
  { id: 'purple', page: '/profile/about' },
  { id: 'blue',   page: '/passion/learning' },
  { id: 'green',  page: '/guestbook' },
];

/** The 3 emeralds whose page is chosen randomly each session */
export const RANDOM_EMERALD_IDS = ['red', 'yellow', 'silver'];

/** Pages eligible to receive a randomly-assigned emerald */
export const RANDOM_PAGE_POOL = [
  '/profile/journal',
  '/profile/blog',
  '/profile/photos',
  '/professional/what-i-do',
  '/professional/portfolio',
  '/passion/acting',
  '/passion/music',
  '/passion/content',
  '/passion/gaming',
  '/play',
  '/contact',
];

// ── Position type (re-exported for convenience) ───────────────────────────────

export interface EmeraldPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}

export interface EmeraldAssignment {
  id: string;
  page: string;
  position: EmeraldPosition;
}
