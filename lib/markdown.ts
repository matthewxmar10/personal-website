/**
 * lib/markdown.ts
 * Utilities for reading .md files from /content/journal and /content/blog.
 *
 * Files prefixed with _ (e.g. _template.md) are always ignored.
 * gray-matter  →  parses YAML frontmatter
 * remark       →  converts Markdown body to HTML
 */

import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark }    from 'remark';
import remarkHtml    from 'remark-html';

const JOURNAL_DIR = path.join(process.cwd(), 'content', 'journal');
const BLOG_DIR    = path.join(process.cwd(), 'content', 'blog');

// ── Internal helpers ──────────────────────────────────────────────────────────

/**
 * gray-matter parses bare YAML dates (e.g. `date: 2026-03-08`) as JS Date
 * objects.  This converts them back to a YYYY-MM-DD string without timezone
 * drift (UTC methods instead of local).
 */
function toDateString(val: unknown): string {
  if (val instanceof Date) {
    const y = val.getUTCFullYear();
    const m = String(val.getUTCMonth() + 1).padStart(2, '0');
    const d = String(val.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(val ?? '');
}

/** Strip markdown syntax to get plain text (used for auto-excerpts). */
function plainText(md: string): string {
  return md
    .replace(/#{1,6}\s+/g, '')   // headings
    .replace(/[*_`~]/g, '')       // emphasis / code ticks
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → link text
    .replace(/\n+/g, ' ')
    .trim();
}

/** Render Markdown string → HTML string (async, server-side only). */
async function mdToHtml(md: string): Promise<string> {
  const result = await remark().use(remarkHtml).process(md);
  return result.toString();
}

/** List .md files in a directory, skipping _ prefixed ones (templates, READMEs). */
function mdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.md') && !f.startsWith('_'));
}

// ── Journal ───────────────────────────────────────────────────────────────────

export interface JournalMeta {
  slug:    string;   // filename without .md  (= date string, e.g. "2026-03-08")
  date:    string;   // YYYY-MM-DD
  excerpt: string;   // first ~180 chars of plain text
}

export interface JournalEntry extends JournalMeta {
  contentHtml: string;
  prev: string | null;   // slug of the next-older entry
  next: string | null;   // slug of the next-newer entry
}

/** Returns all journal entries sorted newest → oldest. */
export function getJournalEntries(): JournalMeta[] {
  return mdFiles(JOURNAL_DIR)
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const raw  = fs.readFileSync(path.join(JOURNAL_DIR, filename), 'utf8');
      const { data, content } = matter(raw);
      const date    = toDateString(data.date) || slug;
      const plain   = plainText(content);
      const excerpt = plain.length > 180 ? plain.slice(0, 177) + '…' : plain;
      return { slug, date, excerpt };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns a single journal entry (with rendered HTML) or null if not found. */
export async function getJournalEntry(slug: string): Promise<JournalEntry | null> {
  const filepath = path.join(JOURNAL_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw             = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const date            = toDateString(data.date) || slug;
  const plain           = plainText(content);
  const excerpt         = plain.length > 180 ? plain.slice(0, 177) + '…' : plain;
  const contentHtml     = await mdToHtml(content);

  const all  = getJournalEntries();
  const idx  = all.findIndex(e => e.slug === slug);
  const prev = idx < all.length - 1 ? all[idx + 1].slug : null; // older
  const next = idx > 0              ? all[idx - 1].slug : null; // newer

  return { slug, date, excerpt, contentHtml, prev, next };
}

// ── Blog ──────────────────────────────────────────────────────────────────────

export interface BlogMeta {
  slug:    string;
  date:    string;   // YYYY-MM-DD
  title:   string;
  excerpt: string;
  tags:    string[];
}

export interface BlogPost extends BlogMeta {
  contentHtml: string;
  readingTime: number;  // minutes (rounded, minimum 1)
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

/** Returns all blog posts sorted newest → oldest. */
export function getBlogPosts(): BlogMeta[] {
  return mdFiles(BLOG_DIR)
    .map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const raw  = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
      const { data } = matter(raw);
      return {
        slug,
        date:    toDateString(data.date),
        title:   String(data.title   ?? slug),
        excerpt: String(data.excerpt ?? ''),
        tags:    Array.isArray(data.tags) ? (data.tags as unknown[]).map(String) : [],
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Returns a single blog post (with rendered HTML) or null if not found. */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filepath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filepath)) return null;

  const raw             = fs.readFileSync(filepath, 'utf8');
  const { data, content } = matter(raw);
  const contentHtml     = await mdToHtml(content);
  const wordCount       = content.split(/\s+/).filter(Boolean).length;
  const readingTime     = Math.max(1, Math.round(wordCount / 200));

  const all  = getBlogPosts();
  const idx  = all.findIndex(p => p.slug === slug);
  const prev = idx < all.length - 1 ? { slug: all[idx + 1].slug, title: all[idx + 1].title } : null;
  const next = idx > 0              ? { slug: all[idx - 1].slug, title: all[idx - 1].title } : null;

  return {
    slug,
    date:    toDateString(data.date),
    title:   String(data.title   ?? slug),
    excerpt: String(data.excerpt ?? ''),
    tags:    Array.isArray(data.tags) ? (data.tags as unknown[]).map(String) : [],
    contentHtml,
    readingTime,
    prev,
    next,
  };
}
