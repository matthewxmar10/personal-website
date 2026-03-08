# Personal Website — Owner's Guide

Everything you need to run, update, and grow the site.

---

## Table of Contents

1. [Making the Site Live](#1-making-the-site-live)
2. [Journal Entries](#2-journal-entries)
3. [Blog Posts](#3-blog-posts)
4. [Photo Album](#4-photo-album)
5. [Design Portfolio](#5-design-portfolio)
6. [Learning Entries & Archive](#6-learning-entries--archive)
7. [Passion Pages — Video & Credits](#7-passion-pages--video--credits)

---

## 1. Making the Site Live

### Step 1 — Deploy to Vercel

Vercel is the recommended host (built by the same team as Next.js — zero config needed).

1. Go to **[vercel.com](https://vercel.com)** and sign up / log in with your GitHub account.
2. Click **"Add New → Project"**.
3. Select your GitHub repo (`personal-website` or whatever it's named).
4. Vercel auto-detects Next.js. Leave all build settings at their defaults.
5. Click **"Deploy"**.

Vercel gives you a free URL like `your-project.vercel.app` — the site is live at that URL immediately.

> **Environment variable required:** Before deploying, go to your project's **Settings → Environment Variables** in Vercel and add:
>
> | Name | Value |
> |---|---|
> | `RESEND_API_KEY` | `re_ejxnhv6M_7sbc5BnjiiJ85n7V8NZ1xYWK` |
>
> Without this, the contact form will silently fail.

---

### Step 2 — Buy a Domain

Recommended registrars (all ~$10–15/yr for a `.com`):

- **[Namecheap](https://namecheap.com)** — cheapest, no dark patterns
- **[Cloudflare Registrar](https://cloudflare.com/products/registrar/)** — at-cost pricing, no markup
- **[Google Domains → Squarespace Domains](https://domains.squarespace.com)** — simple UI

Search for your name (e.g. `matthewmar.com`, `matthewxmar.com`, `iammatthewmar.com`) and buy it.

---

### Step 3 — Connect Your Domain to Vercel

1. In Vercel, go to your project → **Settings → Domains**.
2. Click **"Add Domain"** and type your domain (e.g. `matthewmar.com`).
3. Vercel shows you DNS records to add. There are two options:

**Option A — Vercel nameservers (easiest, recommended):**
- In your registrar's dashboard, change the nameservers to the ones Vercel gives you.
- Vercel manages everything from there.

**Option B — Add individual DNS records at your registrar:**
- Add an `A` record pointing `@` to Vercel's IP (`76.76.21.21`)
- Add a `CNAME` record pointing `www` to `cname.vercel-dns.com`

DNS propagates within 5–60 minutes. Vercel auto-provisions an HTTPS certificate.

---

### Step 4 — Future Deploys (Automatic)

Once connected, **every `git push` to your main branch auto-deploys**. You never touch Vercel again for normal updates — just push to GitHub and the live site updates within ~30 seconds.

---

### Step 5 — Smoke Test After Going Live

Check these after your first production deploy:

- [ ] Homepage loads, animations play, theme toggle works
- [ ] Navigation dropdowns open on hover and on keyboard (Enter/Space)
- [ ] Contact form sends you an email (send yourself a test message)
- [ ] Guestbook accepts a submission and shows the entry
- [ ] Photo album and portfolio pages load (even if empty)
- [ ] All passion pages load
- [ ] `/ai` page loads (footer link)
- [ ] Site is HTTPS (padlock in browser)
- [ ] Check on mobile (navigation hamburger, touch targets)

---

## 2. Journal Entries

**Location:** `content/journal/`

Journal entries are Markdown files. The filename becomes the date shown on the page.

### How to add an entry

1. Create a new file in `content/journal/` named with today's date:
   ```
   content/journal/2026-03-08.md
   ```

2. Add the frontmatter and write your entry:
   ```markdown
   ---
   date: 2026-03-08
   ---

   Write your entry here. Length doesn't matter — one sentence or five paragraphs.

   Leave a blank line between paragraphs.

   Standard **bold**, *italic*, and [links](https://url.com) all work.
   ```

3. Save → commit → push. It appears on `/profile/journal` automatically, newest first.

### Rules
- Filename must be `YYYY-MM-DD.md` — this is the date shown on the site
- Files starting with `_` are ignored (the `_template.md` file is safe to keep)
- One file = one entry; you can have multiple entries per day by appending a suffix (e.g. `2026-03-08-b.md`) but the date shown will still be from the frontmatter

---

## 3. Blog Posts

**Location:** `content/blog/`

Blog posts are Markdown files. The filename becomes the URL slug.

### How to add a post

1. Create a new file in `content/blog/` with a URL-friendly name:
   ```
   content/blog/my-post-title.md
   ```
   Use lowercase, hyphens instead of spaces, no special characters.
   This becomes the URL: `/profile/blog/my-post-title`

2. Fill in the frontmatter and write your post:
   ```markdown
   ---
   title: "My Post Title"
   date: 2026-03-08
   excerpt: "One or two sentences shown on the blog index card. Make it enticing."
   tags: [music, creativity]
   ---

   Your post starts here.

   ## Section Heading

   Write in paragraphs. Leave a blank line between them.

   **Bold**, *italic*, `inline code`, and [links](https://url.com) all work.

   > Blockquotes stand out well for key ideas.

   - Bullet lists
   - Work like this

   1. Numbered lists
   2. Work like this
   ```

3. Save → commit → push. It appears on `/profile/blog` automatically, newest first.

### Frontmatter fields

| Field | Required | Description |
|---|---|---|
| `title` | ✅ | Post title. Wrap in quotes if it contains a colon. |
| `date` | ✅ | `YYYY-MM-DD` — used for sorting and display |
| `excerpt` | ✅ | 1–2 sentence teaser shown on the index card |
| `tags` | optional | List of short tags, e.g. `[music, creativity]` |

---

## 4. Photo Album

**Location:** `data/photos.ts` + `public/photos/album/`

### How to add a photo

1. **Drop your image** into `public/photos/album/`
   - JPEG preferred for best performance
   - If you have HEIC or PNG, ask Claude to convert them

2. **Add an entry** to the `rawPhotos` array in `data/photos.ts`:
   ```typescript
   {
     id:          'nyc-trip-2026-03-08',      // unique slug, no spaces
     date:        '2026-03-08',               // YYYY-MM-DD (used for sorting)
     src:         '/photos/album/nyc.jpg',    // path to your image
     description: 'New York City skyline.',   // caption shown in lightbox
     alt:         'Skyline view of Manhattan from Brooklyn Bridge.', // screen reader text
     tags:        ['Travel'],                 // optional — see tags below
   },
   ```

3. Save → commit → push. Photos appear newest-first automatically.

### Available tags

`'Kris'` · `'Travel'` · `'Music'` · `'Friends'` · `'Groups'`

Tags appear as filter buttons at the top of the album. Omit the `tags` field entirely if none apply.

---

## 5. Design Portfolio

**Location:** `data/portfolio.ts` + `public/portfolio/`

### How to add a project

1. **Drop your preview image** into `public/portfolio/`
   - JPEG preferred

2. **Add an entry** to the `rawItems` array in `data/portfolio.ts`:
   ```typescript
   {
     id:          'brand-refresh-2025',          // unique slug, no spaces
     title:       'Brand Refresh — Client Name', // shown on card and modal
     description: 'Full visual identity overhaul including logo, colors, and social templates.',
     src:         '/portfolio/brand-refresh.jpg', // path to your preview image
     year:        '2025',
     tags:        ['Social', 'Apparel'],          // optional — see tags below
   },
   ```

3. Save → commit → push. Projects are sorted newest-first by year.

### Available tags

`'Social'` · `'Apparel'` · `'Events'` · `'Other'`

---

## 6. Learning Entries & Archive

**Location:** `content/learning/` (active) · `content/learning/archive/` (completed)

### How to add a new topic (currently learning)

1. Create a new file in `content/learning/` with a slug name:
   ```
   content/learning/rust-programming.md
   ```

2. Fill in the frontmatter:
   ```markdown
   ---
   title: Rust Programming
   date: 2026-03-08
   links:
     - label: The Rust Book
       url: https://doc.rust-lang.org/book/
     - label: Rustlings Exercises
       url: https://github.com/rust-lang/rustlings
   ---

   Write a short description of what you're learning, why, and what you plan to do with it.
   ```

3. Save → commit → push. It appears on `/passion/learning` automatically.

### Frontmatter fields

| Field | Required | Description |
|---|---|---|
| `title` | ✅ | Displayed as the section heading |
| `date` | ✅ | `YYYY-MM-DD` — used for ordering (newest first) |
| `links` | optional | List of `{ label, url }` resource links shown below the description |

### How to archive a topic (finished learning)

Simply **move the file** from `content/learning/` → `content/learning/archive/`:

```
# Before (active)
content/learning/rust-programming.md

# After (archived)
content/learning/archive/rust-programming.md
```

Commit and push. It disappears from `/passion/learning` and reappears on `/passion/learning/archive`.

---

## 7. Passion Pages — Video & Credits

Each passion page (Acting, Music, Content, Gaming, Learning) is a simple file that passes props to a shared layout component. You never need to touch the layout — just edit the page file.

### Page file locations

| Page | File |
|---|---|
| Acting | `app/passion/acting/page.tsx` |
| Music | `app/passion/music/page.tsx` |
| Content | `app/passion/content/page.tsx` |
| Gaming | `app/passion/gaming/page.tsx` |

---

### Adding / replacing a video

Get the **YouTube embed URL** for your video:

1. Open the YouTube video
2. Click **Share → Embed**
3. Copy only the `src` value from the `<iframe>` tag — it looks like:
   ```
   https://www.youtube.com/embed/dQw4w9WgXcQ
   ```
   You can also add `?rel=0` at the end to suppress suggested videos after playback.

Then open the page file and add the `reelSrc` prop:

```tsx
// app/passion/acting/page.tsx

export default function ActingPage() {
  return (
    <PassionPageLayout
      title="Acting"
      subtitle="On screen, on stage, behind the mic."
      breadcrumbLabel="Acting"
      breadcrumbHref="/passion/acting"
      reelLabel="Acting Sizzle Reel"
      reelSectionTitle="Sizzle Reel"                    // ← heading above the video
      reelSrc="https://www.youtube.com/embed/YOUR_ID"  // ← add this line
      creditsSectionTitle="Film & Voice Credits"
      credits={[ /* ... */ ]}
    />
  );
}
```

If you **don't** include `reelSrc`, the page shows a placeholder box instead. Remove the prop (or leave it out) to go back to placeholder mode.

**Vimeo also works** — use the Vimeo embed URL format:
```
https://player.vimeo.com/video/YOUR_VIDEO_ID
```

---

### Adding credits

Credits appear as cards below the video. Each credit is an object inside the `credits={[ ]}` array:

```tsx
credits={[
  {
    title: 'Short Film Title',
    role:  'Lead Actor',         // optional — shown in small text below title
    year:  '2025',               // optional — shown on the right
    link:  'https://imdb.com/…', // optional — makes the title a clickable link
  },
  {
    title: 'Another Production',
    role:  'Voice Actor',
    year:  '2024',
  },
  {
    title: 'Unpublished Project',
    role:  'Supporting Role',
    // no year, no link — both are optional
  },
]}
```

**Special role values** — these automatically display a platform icon next to the credit:

| `role` value | Icon shown |
|---|---|
| `'YouTube'` | YouTube logo (red) |
| `'Twitch'` | Twitch logo (purple) |
| `'TikTok'` | TikTok logo |
| `'Instagram'` | Instagram logo |
| anything else | no icon, just the text |

### Full example — Music page with video and credits

```tsx
// app/passion/music/page.tsx

import PassionPageLayout from '@/components/ui/PassionPageLayout';

export const metadata = { title: 'Music — Matthew' };

export default function MusicPage() {
  return (
    <PassionPageLayout
      title="Music"
      subtitle="Singer, songwriter, producer."
      breadcrumbLabel="Music"
      breadcrumbHref="/passion/music"
      reelSectionTitle="Latest Release"
      reelSrc="https://www.youtube.com/embed/YOUR_VIDEO_ID?rel=0"
      creditsSectionTitle="Discography & Features"
      credits={[
        {
          title: 'Song Title — Single',
          role:  'YouTube',
          year:  '2026',
          link:  'https://youtube.com/watch?v=…',
        },
        {
          title: 'Album Name',
          role:  'Producer / Songwriter',
          year:  '2025',
        },
        {
          title: 'Collab Artist — Feature Track',
          role:  'Featured Artist',
          year:  '2025',
          link:  'https://open.spotify.com/…',
        },
      ]}
    />
  );
}
```

Save → commit → push. The live site updates automatically.

---

## Quick Reference — Where Things Live

| Content | Where to edit |
|---|---|
| Journal entry | `content/journal/YYYY-MM-DD.md` (create new file) |
| Blog post | `content/blog/your-slug.md` (create new file) |
| Photo | `public/photos/album/` + entry in `data/photos.ts` |
| Portfolio project | `public/portfolio/` + entry in `data/portfolio.ts` |
| Learning topic | `content/learning/your-topic.md` (create new file) |
| Archive topic | Move file → `content/learning/archive/` |
| Acting video/credits | `app/passion/acting/page.tsx` |
| Music video/credits | `app/passion/music/page.tsx` |
| Content video/credits | `app/passion/content/page.tsx` |
| Gaming profiles | `app/passion/gaming/page.tsx` |
| Contact info | `app/contact/page.tsx` — `CONTACT_METHODS` array at the top |
| AI Disclosure text | `app/ai/page.tsx` — `USES_AI` and `NO_AI` arrays at the top |
| Footer links | `components/layout/Footer.tsx` |
