// Guestbook database using SQLite (better-sqlite3)
//
// Note: For production on Vercel, SQLite file storage does not persist between
// deployments. Consider migrating to Vercel KV, Supabase, or PlanetScale for
// a production deployment. For local dev and self-hosted VPS, this works great.

import path from 'path';

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

interface Database {
  prepare: (sql: string) => {
    run: (...args: unknown[]) => { lastInsertRowid: number | bigint };
    all: (...args: unknown[]) => unknown[];
    get: (...args: unknown[]) => unknown;
  };
  exec: (sql: string) => void;
}

let _db: Database | null = null;

function getDb(): Database {
  if (_db) return _db;

  // Dynamic require to avoid webpack bundling issues with native modules
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require('better-sqlite3') as new (path: string) => Database;

  const dbPath = path.join(process.cwd(), 'guestbook.db');
  _db = new Database(dbPath);

  // Initialize schema
  _db.exec(`
    CREATE TABLE IF NOT EXISTS guestbook_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT 'Anonymous',
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
    );
  `);

  return _db;
}

export interface EntryInput {
  name: string;
  message: string;
}

export interface PaginatedEntries {
  entries: GuestbookEntry[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export function insertEntry(input: EntryInput): GuestbookEntry {
  const db = getDb();
  const name = input.name.trim() || 'Anonymous';
  const message = input.message.trim();

  const stmt = db.prepare(
    'INSERT INTO guestbook_entries (name, message) VALUES (?, ?)'
  );
  const result = stmt.run(name, message);
  const id = typeof result.lastInsertRowid === 'bigint'
    ? Number(result.lastInsertRowid)
    : result.lastInsertRowid;

  return getEntryById(id as number)!;
}

export function getEntryById(id: number): GuestbookEntry | null {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM guestbook_entries WHERE id = ?');
  return stmt.get(id) as GuestbookEntry | null;
}

export function getEntries(page = 1, perPage = 20): PaginatedEntries {
  const db = getDb();
  const offset = (page - 1) * perPage;

  const countStmt = db.prepare('SELECT COUNT(*) as count FROM guestbook_entries');
  const { count } = countStmt.get() as { count: number };

  const stmt = db.prepare(
    'SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT ? OFFSET ?'
  );
  const entries = stmt.all(perPage, offset) as GuestbookEntry[];

  return {
    entries,
    total: count,
    page,
    perPage,
    totalPages: Math.ceil(count / perPage),
  };
}
