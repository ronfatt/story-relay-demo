import { NextResponse } from "next/server";
import { getSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.sessionId as string;

  const session = getSession(sessionId);
  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  return NextResponse.json({
    sessionId: session.id,
    theme: session.theme,
    difficulty: session.difficulty,
    history: session.history
  });
}
