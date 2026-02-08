import { sql } from "@vercel/postgres";

let initialized = false;

export async function initDb() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS auth_sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMP NOT NULL,
      expires_at TIMESTAMP NOT NULL
    );
  `;

  await sql`
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
      score_json TEXT,
      feedback_json TEXT,
      suggested_vocab_json TEXT,
      branch TEXT NOT NULL,
      hero TEXT NOT NULL,
      target_words TEXT NOT NULL,
      inventory TEXT NOT NULL,
      history TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL
    );
  `;

  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS score_json TEXT;`;
  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS feedback_json TEXT;`;
  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS suggested_vocab_json TEXT;`;

  initialized = true;
}

export { sql };
