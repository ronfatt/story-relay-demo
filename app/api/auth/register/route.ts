import { NextResponse } from "next/server";
import { createAuthSession, createUser, getUserByEmail } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (!email || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 400 }
    );
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const user = await createUser(email, password);
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
