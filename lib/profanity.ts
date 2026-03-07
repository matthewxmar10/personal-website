// Profanity filter with leet-speak detection
// Strategy:
// 1. Normalize leet-speak character substitutions
// 2. Remove spaces/separators between individual letters
// 3. Check against leo-profanity word list (NSFW blocked, light words allowed)

// eslint-disable-next-line @typescript-eslint/no-require-imports
const leoProfanity = require('leo-profanity') as {
  check: (text: string) => boolean;
  clean: (text: string) => string;
  add: (words: string | string[]) => void;
  remove: (words: string | string[]) => void;
  list: () => string[];
  loadDictionary: (lang: string) => void;
};

// Light words to explicitly allow (remove from blocklist)
const ALLOWED_LIGHT_WORDS = [
  'damn', 'hell', 'ass', 'crap', 'piss', 'dang', 'heck', 'suck',
  'sucks', 'sucked', 'sucking', 'crap', 'crappy', 'pissed',
];

// Initialize: allow light words, ensure English dict is loaded
let initialized = false;

function initFilter() {
  if (initialized) return;
  leoProfanity.loadDictionary('en');
  leoProfanity.remove(ALLOWED_LIGHT_WORDS);
  initialized = true;
}

// ─── Normalization ────────────────────────────────────────────────────

/**
 * Normalize leet-speak substitutions to plain letters.
 * Handles: @→a, 3→e, 0→o, 1→i/l, $→s, !→i, 5→s, 4→a, |→l, +→t, 7→t
 */
function normalizeLeet(text: string): string {
  return text
    .replace(/@/g, 'a')
    .replace(/3/g, 'e')
    .replace(/0/g, 'o')
    .replace(/1/g, 'i')
    .replace(/\$/g, 's')
    .replace(/!/g, 'i')
    .replace(/5/g, 's')
    .replace(/4/g, 'a')
    .replace(/\|/g, 'l')
    .replace(/\+/g, 't')
    .replace(/7/g, 't')
    .replace(/\(/g, 'c')
    .replace(/8/g, 'b')
    .replace(/6/g, 'g')
    .replace(/9/g, 'g');
}

/**
 * Collect all sequences of single-letter tokens separated by spaces/dots/dashes.
 * Returns the joined strings so we can check them for profanity as substrings.
 * Handles: "d i c k", "d.i.c.k", "d-i-c-k" → "dick"
 * Also handles "a d i c k" → extracts "dick" as a substring of "adick"
 */
function extractSpacedSequences(text: string): string[] {
  const collected: string[] = [];

  // Find all sequences of 3+ single letters separated by a consistent separator
  const spacedMatches = text.match(/\b([a-z])([ .\-_*]+[a-z]){2,}\b/gi) ?? [];
  for (const match of spacedMatches) {
    const joined = match.replace(/[ .\-_*]+/g, '');
    collected.push(joined);
    // Also add all substrings of length >= 3 in case prefix letter got included
    for (let start = 0; start < joined.length - 2; start++) {
      for (let end = start + 3; end <= joined.length; end++) {
        const sub = joined.slice(start, end);
        if (sub.length >= 3 && sub.length <= 15) {
          collected.push(sub);
        }
      }
    }
  }

  return collected;
}

/**
 * Full normalization: returns original text with leet-speak replaced,
 * plus a list of extra tokens to check (spaced-out words).
 */
function normalizeAndExtract(text: string): { normalized: string; extras: string[] } {
  const lower = text.toLowerCase();
  const leet = normalizeLeet(lower);
  const extras = extractSpacedSequences(leet);

  // Also collapse the spaced sequences in the main text
  const normalized = leet.replace(
    /\b([a-z])([ .\-_*]+[a-z]){2,}\b/gi,
    (match) => match.replace(/[ .\-_*]+/g, '')
  );

  return { normalized, extras };
}

// ─── Public API ───────────────────────────────────────────────────────

export interface FilterResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Check if a message passes the content filter.
 * Returns { allowed: true } or { allowed: false, reason: string }.
 */
export function filterMessage(message: string): FilterResult {
  initFilter();

  if (!message || message.trim().length === 0) {
    return { allowed: false, reason: 'Message cannot be empty.' };
  }

  if (message.length > 280) {
    return { allowed: false, reason: 'Message must be 280 characters or fewer.' };
  }

  const { normalized, extras } = normalizeAndExtract(message);

  const blocked =
    leoProfanity.check(normalized) ||
    extras.some((t) => leoProfanity.check(t));

  if (blocked) {
    return {
      allowed: false,
      reason: 'Your message contains content that is not allowed. Please keep it clean!',
    };
  }

  return { allowed: true };
}

/**
 * Validate a display name for the guestbook.
 */
export function filterName(name: string): FilterResult {
  initFilter();

  if (name.length > 50) {
    return { allowed: false, reason: 'Name must be 50 characters or fewer.' };
  }

  const { normalized, extras } = normalizeAndExtract(name);

  const blocked =
    leoProfanity.check(normalized) ||
    extras.some((t) => leoProfanity.check(t));

  if (blocked) {
    return { allowed: false, reason: 'Please use an appropriate display name.' };
  }

  return { allowed: true };
}
