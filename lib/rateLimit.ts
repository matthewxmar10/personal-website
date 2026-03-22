/**
 * Simple in-memory rate limiter.
 *
 * Tracks requests per IP using a Map. Entries expire after `windowMs`.
 * Note: resets on server restart. For persistent limits across Vercel
 * deployments, replace with Vercel KV or Upstash Redis.
 */

interface RateLimitEntry {
  count:   number;
  resetAt: number; // Unix ms timestamp when this window expires
}

const store = new Map<string, RateLimitEntry>();

// Periodically prune expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 60_000);

/**
 * Check whether the given `key` (typically an IP address) is within the
 * allowed rate limit.
 *
 * @param key       Unique identifier for the caller (e.g. IP string)
 * @param limit     Max requests allowed in the window
 * @param windowMs  Window duration in milliseconds
 * @returns `true` if the request is allowed, `false` if rate limited
 */
export function rateLimit(
  key:      string,
  limit:    number,
  windowMs: number,
): boolean {
  const now   = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    // New window — allow and start counting
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

/**
 * Extract the best-available IP address from a Request's headers.
 * Handles Vercel / Cloudflare forwarding headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return 'unknown';
}
