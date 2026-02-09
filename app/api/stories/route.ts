import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const sessionId = getCookieValue(cookie, "sb_session");
  if (!sessionId) return NextResponse.json({ stories: [] }, { status: 401 });

  const authSession = await getSession(sessionId);
  if (!authSession || new Date(authSession.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ stories: [] }, { status: 401 });
  }

  const user = await getUserById(authSession.user_id);
  if (!user) return NextResponse.json({ stories: [] }, { status: 401 });

  await initDb();
  const rowsResult = await sql`
    SELECT id, theme, difficulty, lang, title, total_stars, created_at
    FROM stories WHERE user_id = ${user.id} ORDER BY created_at DESC
  `;

  return NextResponse.json({ stories: rowsResult });
}
