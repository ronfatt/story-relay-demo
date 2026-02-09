import { NextResponse } from "next/server";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const sessionId = getCookieValue(cookie, "sb_session");
    if (!sessionId) return NextResponse.json({ user: null });

    const session = await getSession(sessionId);
    if (!session) return NextResponse.json({ user: null });

    if (new Date(session.expires_at).getTime() < Date.now()) {
      return NextResponse.json({ user: null });
    }

    const user = await getUserById(session.user_id);
    if (!user) return NextResponse.json({ user: null });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("me_failed", error);
    return NextResponse.json({ error: "Auth check failed." }, { status: 500 });
  }
}
