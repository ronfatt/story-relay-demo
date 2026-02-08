import { NextResponse } from "next/server";
import { createAuthSession, getUserByEmail, verifyPassword } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  const user = await getUserByEmail(email);
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const session = await createAuthSession(user.id);
  const res = NextResponse.json({ user: { id: user.id, email: user.email } });
  const cookieDomain =
    process.env.SESSION_COOKIE_DOMAIN ||
    (process.env.NODE_ENV === "production" ? ".storybah.my" : undefined);
  res.cookies.set("sb_session", session.id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    ...(cookieDomain ? { domain: cookieDomain } : {})
  });
  return res;
}
