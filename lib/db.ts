import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dbPath =
  process.env.STORYBAH_DB_PATH ||
  (process.env.VERCEL
    ? path.join("/tmp", "storybah.db")
    : path.join(process.cwd(), "data", "storybah.db"));

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS auth_sessions (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    expires_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS stories (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    theme TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    lang TEXT NOT NULL,
    title TEXT NOT NULL,
    full_story TEXT NOT NULL,
    moral TEXT NOT NULL,
    total_stars INTEGER NOT NULL,
    branch TEXT NOT NULL,
    hero TEXT NOT NULL,
    target_words TEXT NOT NULL,
    inventory TEXT NOT NULL,
    history TEXT NOT NULL,
    created_at TEXT NOT NULL
  );
`);

export default db;
