import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cookie = req.headers.get("cookie") || "";
  const sessionId = getCookieValue(cookie, "sb_session");
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const authSession = await getSession(sessionId);
  if (!authSession || new Date(authSession.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await getUserById(authSession.user_id);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDb();
  const rowResult = await sql`
    SELECT id, theme, difficulty, lang, title, full_story, moral, total_stars, score_json, feedback_json, suggested_vocab_json, branch, hero, target_words, inventory, history, created_at
    FROM stories WHERE id = ${id} AND user_id = ${user.id}
  `;
  const row = rowResult[0];

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ story: row });
}
