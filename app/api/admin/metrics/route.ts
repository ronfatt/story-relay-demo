import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getSession, getUserById } from "@/lib/auth";

export const runtime = "nodejs";

const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "zentionmedia@gmail.com").toLowerCase();

function startOfTodayUTC(now: Date) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

function startOfWeekUTC(now: Date) {
  const day = now.getUTCDay(); // 0=Sun
  const diff = (day + 6) % 7; // Monday start
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  d.setUTCDate(d.getUTCDate() - diff);
  return d;
}

function startOfMonthUTC(now: Date) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
}

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (!match?.[1]) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const session = getSession(match[1]);
  if (!session || new Date(session.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = getUserById(session.user_id);
  if (!user || user.email.toLowerCase() !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const now = new Date();
  const todayStart = startOfTodayUTC(now);
  const weekStart = startOfWeekUTC(now);
  const monthStart = startOfMonthUTC(now);

  const totalUsersRow = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
  const totalStoriesRow = db.prepare("SELECT COUNT(*) as c FROM stories").get() as { c: number };

  const storiesRows = db
    .prepare(
      "SELECT user_id, created_at, lang, difficulty, total_stars FROM stories WHERE created_at >= ?"
    )
    .all(monthStart.toISOString()) as Array<{
    user_id: number;
    created_at: string;
    lang: string;
    difficulty: string;
    total_stars: number;
  }>;

  const dayBuckets: Record<string, number> = {};
  const hourBuckets: Record<string, number> = {};
  const langCounts: Record<string, number> = {};
  const difficultyCounts: Record<string, number> = {};
  let todayStories = 0;
  let weekStories = 0;
  let monthStories = storiesRows.length;
  const todayUsers = new Set<number>();
  const weekUsers = new Set<number>();
  const monthUsers = new Set<number>();

  for (const row of storiesRows) {
    const created = new Date(row.created_at);
    const dayKey = created.toISOString().slice(0, 10);
    dayBuckets[dayKey] = (dayBuckets[dayKey] || 0) + 1;

    const hour = created.getUTCHours().toString().padStart(2, "0");
    hourBuckets[hour] = (hourBuckets[hour] || 0) + 1;

    langCounts[row.lang] = (langCounts[row.lang] || 0) + 1;
    difficultyCounts[row.difficulty] = (difficultyCounts[row.difficulty] || 0) + 1;

    monthUsers.add(row.user_id);
    if (created >= weekStart) {
      weekStories += 1;
      weekUsers.add(row.user_id);
    }
    if (created >= todayStart) {
      todayStories += 1;
      todayUsers.add(row.user_id);
    }
  }

  const last7Days: Array<{ date: string; count: number }> = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(todayStart);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    last7Days.push({ date: key, count: dayBuckets[key] || 0 });
  }

  const last30Days: Array<{ date: string; count: number }> = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(todayStart);
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    last30Days.push({ date: key, count: dayBuckets[key] || 0 });
  }

  const hourly: Array<{ hour: string; count: number }> = [];
  for (let h = 0; h < 24; h++) {
    const key = String(h).padStart(2, "0");
    hourly.push({ hour: key, count: hourBuckets[key] || 0 });
  }

  return NextResponse.json({
    totalUsers: totalUsersRow.c,
    totalStories: totalStoriesRow.c,
    today: { users: todayUsers.size, stories: todayStories },
    week: { users: weekUsers.size, stories: weekStories },
    month: { users: monthUsers.size, stories: monthStories },
    langCounts,
    difficultyCounts,
    last7Days,
    last30Days,
    hourly
  });
}
