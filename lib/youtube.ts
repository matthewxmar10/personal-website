// ── YouTube latest-video fetcher ──────────────────────────────────────────────
// Uses YouTube's public RSS feeds — no API key required.
// Results are cached and revalidated every hour via Next.js ISR.
//
// HOW TO FIND YOUR CHANNEL ID:
//   1. Go to your YouTube channel page
//   2. Click your profile picture → Settings → Advanced settings
//      OR: visit youtube.com/@your-handle/about → click "Share channel" → "Copy channel ID"
//   3. It starts with "UC" followed by 22 characters
//
// ─────────────────────────────────────────────────────────────────────────────

const CHANNELS: { id: string; handle: string }[] = [
  { id: 'UC3UBAnW5KgM5tLWjc3O4VLQ', handle: '@matthew-1pg'  },
  { id: 'UC_NP6tAYKnocyAVw4SagG9A', handle: '@matthew-OSRS' },
];

export interface YTVideo {
  videoId:     string;
  title:       string;
  published:   Date;
  channelName: string;
  embedUrl:    string;
  watchUrl:    string;
}

async function fetchLatestFromChannel(channel: { id: string; handle: string }): Promise<YTVideo | null> {
  // Skip placeholder IDs so the page degrades gracefully before they're filled in
  if (channel.id.startsWith('TODO')) return null;

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`,
      { next: { revalidate: 3600 } }  // re-check every hour
    );
    if (!res.ok) return null;

    const xml = await res.text();

    // Channel name is the first <title> in the feed
    const channelName = xml.match(/<title>(.*?)<\/title>/)?.[1] ?? channel.handle;

    // Each video is wrapped in <entry>…</entry>; first entry = most recent
    const entries = xml.split('<entry>').slice(1);
    if (!entries.length) return null;

    const entry = entries[0];
    const videoId   = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
    const title     = entry.match(/<title>(.*?)<\/title>/)?.[1]      ?? '';
    const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? '';

    if (!videoId) return null;

    return {
      videoId,
      title:       title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
      published:   new Date(published),
      channelName: channelName.replace(/&amp;/g, '&'),
      embedUrl:    `https://www.youtube.com/embed/${videoId}`,
      watchUrl:    `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch {
    return null;
  }
}

/** Returns the most recently published video across all configured channels. */
export async function getLatestYouTubeVideo(): Promise<YTVideo | null> {
  const results = await Promise.all(CHANNELS.map(fetchLatestFromChannel));
  const valid   = results.filter((v): v is YTVideo => v !== null);
  if (!valid.length) return null;
  return valid.reduce((latest, v) => (v.published > latest.published ? v : latest));
}
