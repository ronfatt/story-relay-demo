import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const sessionId = getCookieValue(cookie, "sb_session");
  if (sessionId) {
    await deleteSession(sessionId);
  }
  const res = NextResponse.json({ ok: true });
  const cookieDomain =
    process.env.SESSION_COOKIE_DOMAIN ||
    (process.env.NODE_ENV === "production" ? ".storybah.my" : undefined);
  res.cookies.set("sb_session", "", {
    path: "/",
    maxAge: 0,
    ...(cookieDomain ? { domain: cookieDomain } : {})
  });
  return res;
}
