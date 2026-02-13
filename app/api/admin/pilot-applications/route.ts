import { NextResponse } from "next/server";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";
import { initDb, sql } from "@/lib/db";

export const runtime = "nodejs";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "zentionmedia@gmail.com").toLowerCase();

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const sessionId = getCookieValue(cookie, "sb_session");
  if (!sessionId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = await getSession(sessionId);
  if (!session || new Date(session.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserById(session.user_id);
  if (!user || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const url = new URL(req.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || "1"));
  const pageSize = Math.min(100, Math.max(10, Number(url.searchParams.get("pageSize") || "20")));
  const status = (url.searchParams.get("status") || "").trim();
  const q = (url.searchParams.get("q") || "").trim();
  const offset = (page - 1) * pageSize;

  await initDb();

  let filters = sql``;
  if (status && status !== "ALL") {
    filters = sql`${filters} AND status = ${status}`;
  }
  if (q) {
    const query = `%${q}%`;
    filters = sql`${filters} AND (name ILIKE ${query} OR email ILIKE ${query} OR school ILIKE ${query})`;
  }

  const countRows = await sql`
    SELECT COUNT(*)::int AS c
    FROM pilot_registrations
    WHERE 1=1 ${filters}
  `;
  const total = countRows[0]?.c ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const rowsResult = await sql`
    SELECT id, created_at, name, role, email, school, plan, status, ai_summary
    FROM pilot_registrations
    WHERE 1=1 ${filters}
    ORDER BY created_at DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;
  const rows = rowsResult as unknown as Array<{
    id: string;
    created_at: string;
    name: string;
    role: string;
    email: string;
    school: string;
    plan: string;
    status: string;
    ai_summary: string;
  }>;

  return NextResponse.json({
    rows,
    total,
    page,
    pageSize,
    totalPages
  });
}
