import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js needs 'unsafe-inline' for its runtime scripts + our anti-FOUC inline script
  "script-src 'self' 'unsafe-inline'",
  // Inline style props are used throughout; Google Fonts are self-hosted via next/font
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob:",
  // API calls are all same-origin
  "connect-src 'self'",
  // Passion pages may embed YouTube / Vimeo players
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
  // Prevent our site from being embedded in foreign frames (clickjacking)
  "frame-ancestors 'none'",
  // Restrict base tag injection
  "base-uri 'self'",
  // Only allow form submissions to same origin
  "form-action 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options",  value: "nosniff" },
  { key: "X-Frame-Options",         value: "DENY" },
  { key: "X-XSS-Protection",        value: "1; mode=block" },
  { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig: NextConfig = {
  // Use serverExternalPackages for native modules (works with Turbopack)
  serverExternalPackages: ['better-sqlite3'],
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
