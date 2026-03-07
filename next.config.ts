import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use serverExternalPackages for native modules (works with Turbopack)
  serverExternalPackages: ['better-sqlite3'],
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
