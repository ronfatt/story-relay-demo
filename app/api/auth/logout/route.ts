import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (match?.[1]) {
    deleteSession(match[1]);
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sb_session", "", { path: "/", maxAge: 0 });
  return res;
}
