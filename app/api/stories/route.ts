import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession, getUserById } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (!match?.[1]) return NextResponse.json({ stories: [] }, { status: 401 });

  const authSession = getSession(match[1]);
  if (!authSession || new Date(authSession.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ stories: [] }, { status: 401 });
  }

  const user = getUserById(authSession.user_id);
  if (!user) return NextResponse.json({ stories: [] }, { status: 401 });

  const rows = db
    .prepare(
      `SELECT id, theme, difficulty, lang, title, total_stars, created_at
       FROM stories WHERE user_id = ? ORDER BY created_at DESC`
    )
    .all(user.id);

  return NextResponse.json({ stories: rows });
}
