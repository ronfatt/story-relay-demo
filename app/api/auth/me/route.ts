import { NextResponse } from "next/server";
import { getSession, getUserById } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (!match?.[1]) return NextResponse.json({ user: null });

  const session = await getSession(match[1]);
  if (!session) return NextResponse.json({ user: null });

  if (new Date(session.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserById(session.user_id);
  if (!user) return NextResponse.json({ user: null });

  return NextResponse.json({ user });
}
