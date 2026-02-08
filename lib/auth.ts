import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { initDb, sql } from "@/lib/db";

export type User = { id: number; email: string; created_at: string };

export async function createUser(email: string, password: string) {
  await initDb();
  const hashed = bcrypt.hashSync(password, 10);
  const now = new Date().toISOString();
  const result = await sql`
    INSERT INTO users (email, password_hash, created_at)
    VALUES (${email}, ${hashed}, ${now})
    RETURNING id, email, created_at
  `;
  return result.rows[0] as User;
}

export async function getUserByEmail(email: string) {
  await initDb();
  const result = await sql`
    SELECT id, email, password_hash, created_at
    FROM users WHERE email = ${email}
  `;
  return (result.rows[0] as
    | { id: number; email: string; password_hash: string; created_at: string }
    | undefined);
}

export async function getUserById(id: number) {
  await initDb();
  const result = await sql`
    SELECT id, email, created_at
    FROM users WHERE id = ${id}
  `;
  return result.rows[0] as User | undefined;
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export async function createAuthSession(userId: number) {
  await initDb();
  const id = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
  await sql`
    INSERT INTO auth_sessions (id, user_id, created_at, expires_at)
    VALUES (${id}, ${userId}, ${now.toISOString()}, ${expires.toISOString()})
  `;
  return { id, expiresAt: expires.toISOString() };
}

export async function getSession(sessionId: string) {
  await initDb();
  const result = await sql`
    SELECT id, user_id, expires_at
    FROM auth_sessions WHERE id = ${sessionId}
  `;
  return (result.rows[0] as
    | { id: string; user_id: number; expires_at: string }
    | undefined);
}

export async function deleteSession(sessionId: string) {
  await initDb();
  await sql`DELETE FROM auth_sessions WHERE id = ${sessionId}`;
}
