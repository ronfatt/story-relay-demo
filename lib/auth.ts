import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import db from "@/lib/db";

export type User = { id: number; email: string; created_at: string };

export function createUser(email: string, password: string) {
  const hashed = bcrypt.hashSync(password, 10);
  const now = new Date().toISOString();
  const stmt = db.prepare(
    "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, ?)"
  );
  const info = stmt.run(email, hashed, now);
  return { id: Number(info.lastInsertRowid), email, created_at: now };
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare(
    "SELECT id, email, password_hash, created_at FROM users WHERE email = ?"
  );
  return stmt.get(email) as
    | { id: number; email: string; password_hash: string; created_at: string }
    | undefined;
}

export function getUserById(id: number) {
  const stmt = db.prepare("SELECT id, email, created_at FROM users WHERE id = ?");
  return stmt.get(id) as User | undefined;
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

export function createAuthSession(userId: number) {
  const id = crypto.randomUUID();
  const now = new Date();
  const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7);
  const stmt = db.prepare(
    "INSERT INTO auth_sessions (id, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)"
  );
  stmt.run(id, userId, now.toISOString(), expires.toISOString());
  return { id, expiresAt: expires.toISOString() };
}

export function getSession(sessionId: string) {
  const stmt = db.prepare(
    "SELECT id, user_id, expires_at FROM auth_sessions WHERE id = ?"
  );
  return stmt.get(sessionId) as
    | { id: string; user_id: number; expires_at: string }
    | undefined;
}

export function deleteSession(sessionId: string) {
  const stmt = db.prepare("DELETE FROM auth_sessions WHERE id = ?");
  stmt.run(sessionId);
}
