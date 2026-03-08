import fs   from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark }     from 'remark';
import remarkHtml     from 'remark-html';

// ── Types ──────────────────────────────────────────────────────────────────────

export interface LearningLink {
  label: string;
  url:   string;
}

export interface LearningEntry {
  slug:        string;
  title:       string;
  date:        string;   // YYYY-MM-DD — used for ordering
  contentHtml: string;
  links:       LearningLink[];
}

// ── Paths ──────────────────────────────────────────────────────────────────────

const CURRENT_DIR = path.join(process.cwd(), 'content/learning');
const ARCHIVE_DIR = path.join(process.cwd(), 'content/learning/archive');

// ── Helpers ────────────────────────────────────────────────────────────────────

function toDateString(val: unknown): string {
  if (val instanceof Date) {
    const y = val.getUTCFullYear();
    const m = String(val.getUTCMonth() + 1).padStart(2, '0');
    const d = String(val.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(val ?? '');
}

function mdFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
}

async function parseEntry(dir: string, filename: string): Promise<LearningEntry> {
  const slug = filename.replace(/\.md$/, '');
  const raw  = fs.readFileSync(path.join(dir, filename), 'utf-8');
  const { data, content } = matter(raw);

  const processed = await remark().use(remarkHtml).process(content);

  const links: LearningLink[] = Array.isArray(data.links)
    ? data.links.map((l: { label?: string; url?: string }) => ({
        label: String(l.label ?? ''),
        url:   String(l.url   ?? '#'),
      }))
    : [];

  return {
    slug,
    title:       String(data.title ?? slug),
    date:        toDateString(data.date),
    contentHtml: processed.toString(),
    links,
  };
}

// ── Public API ─────────────────────────────────────────────────────────────────

/** Active topics from content/learning/ — newest date first. */
export async function getLearningEntries(): Promise<LearningEntry[]> {
  const files   = mdFiles(CURRENT_DIR);
  const entries = await Promise.all(files.map(f => parseEntry(CURRENT_DIR, f)));
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

/** Completed topics from content/learning/archive/ — newest date first. */
export async function getArchivedEntries(): Promise<LearningEntry[]> {
  const files   = mdFiles(ARCHIVE_DIR);
  const entries = await Promise.all(files.map(f => parseEntry(ARCHIVE_DIR, f)));
  return entries.sort((a, b) => b.date.localeCompare(a.date));
}
