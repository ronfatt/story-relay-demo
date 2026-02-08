import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession, getUserById } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (!match?.[1]) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const authSession = getSession(match[1]);
  if (!authSession || new Date(authSession.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = getUserById(authSession.user_id);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const row = db
    .prepare(
      `SELECT id, theme, difficulty, lang, title, full_story, moral, total_stars, branch, hero, target_words, inventory, history, created_at
       FROM stories WHERE id = ? AND user_id = ?`
    )
    .get(id, user.id);

  if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ story: row });
}
