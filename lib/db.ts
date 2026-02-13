import postgres from "postgres";

let initialized = false;

const connectionUrl =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.PRISMA_DATABASE_URL ||
  "";

const sql = postgres(connectionUrl, {
  ssl: "require",
  max: 5
});

export async function initDb() {
  if (initialized) return;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      total_stars INTEGER NOT NULL DEFAULT 0,
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

  await sql`
    CREATE TABLE IF NOT EXISTS pilot_registrations (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      email TEXT NOT NULL,
      school TEXT NOT NULL,
      plan TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'UNDER_REVIEW',
      ai_summary TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMP NOT NULL
    );
  `;

  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS score_json TEXT;`;
  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS feedback_json TEXT;`;
  await sql`ALTER TABLE stories ADD COLUMN IF NOT EXISTS suggested_vocab_json TEXT;`;
  await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS total_stars INTEGER DEFAULT 0;`;

  initialized = true;
}

export { sql };
