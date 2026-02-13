import { NextResponse } from "next/server";
import { getSession, getUserById } from "@/lib/auth";
import { getCookieValue } from "@/lib/cookies";
import { initDb, sql } from "@/lib/db";

export const runtime = "nodejs";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "zentionmedia@gmail.com").toLowerCase();

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, "\"\"")}"`;
  }
  return text;
}

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
  const status = (url.searchParams.get("status") || "").trim();
  const q = (url.searchParams.get("q") || "").trim();

  await initDb();

  let filters = sql``;
  if (status && status !== "ALL") {
    filters = sql`${filters} AND status = ${status}`;
  }
  if (q) {
    const query = `%${q}%`;
    filters = sql`${filters} AND (name ILIKE ${query} OR email ILIKE ${query} OR school ILIKE ${query})`;
  }

  const rowsResult = await sql`
    SELECT created_at, name, role, email, school, plan, status, ai_summary
    FROM pilot_registrations
    WHERE 1=1 ${filters}
    ORDER BY created_at DESC
  `;
  const rows = rowsResult as unknown as Array<{
    created_at: string;
    name: string;
    role: string;
    email: string;
    school: string;
    plan: string;
    status: string;
    ai_summary: string;
  }>;

  const header = [
    "Submitted",
    "Name",
    "Role",
    "Email",
    "School",
    "Plan",
    "Status",
    "AI Summary"
  ];

  const lines = [
    header.join(","),
    ...rows.map((row) =>
      [
        row.created_at,
        row.name,
        row.role,
        row.email,
        row.school,
        row.plan,
        row.status,
        row.ai_summary
      ]
        .map(escapeCsv)
        .join(",")
    )
  ];

  const csv = "\ufeff" + lines.join("\n");
  const dateTag = new Date().toISOString().slice(0, 10);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=\"pilot-registrations-${dateTag}.csv\"`
    }
  });
}
