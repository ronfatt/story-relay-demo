import { NextResponse } from "next/server";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";
import { generateWorldCovers } from "@/lib/world-covers";

export const runtime = "nodejs";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "zentionmedia@gmail.com").toLowerCase();

async function ensureAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const sessionId = getCookieValue(cookie, "sb_session");
  if (!sessionId) return { ok: false as const, status: 401, error: "Unauthorized" };

  const session = await getSession(sessionId);
  if (!session || new Date(session.expires_at).getTime() < Date.now()) {
    return { ok: false as const, status: 401, error: "Unauthorized" };
  }

  const user = await getUserById(session.user_id);
  if (!user || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return { ok: false as const, status: 403, error: "Forbidden" };
  }

  return { ok: true as const };
}

export async function POST(req: Request) {
  const auth = await ensureAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OPENAI_API_KEY missing." }, { status: 500 });
  }

  const body = (await req.json().catch(() => ({}))) as { force?: boolean; limit?: number };
  const force = Boolean(body.force);
  const limit = typeof body.limit === "number" ? body.limit : undefined;

  const result = await generateWorldCovers({
    apiKey,
    force,
    limit,
    delayMs: 300
  });

  return NextResponse.json(result);
}
