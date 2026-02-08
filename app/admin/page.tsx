"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ui, type Language } from "@/lib/i18n";

type Metrics = {
  totalUsers: number;
  totalStories: number;
  today: { users: number; stories: number };
  week: { users: number; stories: number };
  month: { users: number; stories: number };
  langCounts: Record<string, number>;
  difficultyCounts: Record<string, number>;
  themeCounts: Record<string, number>;
  topTheme: { name: string; count: number } | null;
  peakHour: { hour: string; count: number } | null;
  last7Days: Array<{ date: string; count: number }>;
  last30Days: Array<{ date: string; count: number }>;
  hourly: Array<{ hour: string; count: number }>;
};

export default function AdminPage() {
  const [lang] = useState<Language>("en");
  const t = ui(lang);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then(async (res) => {
        if (!res.ok) throw new Error("forbidden");
        const data = await res.json();
        setMetrics(data);
      })
      .catch(() => setError("Admin only."));
  }, []);

  const max7 = useMemo(
    () => Math.max(1, ...(metrics?.last7Days.map((d) => d.count) || [1])),
    [metrics]
  );
  const max30 = useMemo(
    () => Math.max(1, ...(metrics?.last30Days.map((d) => d.count) || [1])),
    [metrics]
  );
  const maxHour = useMemo(
    () => Math.max(1, ...(metrics?.hourly.map((d) => d.count) || [1])),
    [metrics]
  );

  if (error) {
    return (
      <main className="grid">
        <section className="card grid">
          <h2>Admin</h2>
          <div className="error-banner">{error}</div>
          <Link className="button" href="/">
            {t.loginButton}
          </Link>
        </section>
      </main>
    );
  }

  if (!metrics) {
    return (
      <main className="grid">
        <section className="card grid">
          <div className="badge">{t.gettingReady}</div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid">
      <section className="card grid">
        <div className="admin-header">
          <div>
            <div className="hero-kicker">StoryBah Admin</div>
            <h1>Student Usage Snapshot</h1>
            <p>Today / This Week / This Month</p>
          </div>
          <div className="hero-orb sparkle">📊</div>
        </div>
        <div className="summary-row">
          <div className="summary-pill">
            <div className="summary-title">Peak Hour (UTC)</div>
            <div className="summary-value">
              {metrics.peakHour ? `${metrics.peakHour.hour}:00` : "—"}
            </div>
            <div className="summary-sub">
              {metrics.peakHour ? `${metrics.peakHour.count} stories` : "No data yet"}
            </div>
          </div>
          <div className="summary-pill">
            <div className="summary-title">Top Theme</div>
            <div className="summary-value">{metrics.topTheme?.name || "—"}</div>
            <div className="summary-sub">
              {metrics.topTheme ? `${metrics.topTheme.count} plays` : "No data yet"}
            </div>
          </div>
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">Total Users</div>
            <div className="stat-value">{metrics.totalUsers}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Stories</div>
            <div className="stat-value">{metrics.totalStories}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Today Users</div>
            <div className="stat-value">{metrics.today.users}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Today Stories</div>
            <div className="stat-value">{metrics.today.stories}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Week Users</div>
            <div className="stat-value">{metrics.week.users}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Week Stories</div>
            <div className="stat-value">{metrics.week.stories}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Month Users</div>
            <div className="stat-value">{metrics.month.users}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Month Stories</div>
            <div className="stat-value">{metrics.month.stories}</div>
          </div>
        </div>
      </section>

      <section className="card grid">
        <h2>Last 7 Days</h2>
        <div className="bar-chart">
          {metrics.last7Days.map((d) => (
            <div key={d.date} className="bar-col">
              <div
                className="bar"
                style={{ height: `${(d.count / max7) * 100}%` }}
                title={`${d.date}: ${d.count}`}
              />
              <div className="bar-label">{d.date.slice(5)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card grid">
        <h2>Last 30 Days</h2>
        <div className="bar-chart compact">
          {metrics.last30Days.map((d) => (
            <div key={d.date} className="bar-col">
              <div
                className="bar alt"
                style={{ height: `${(d.count / max30) * 100}%` }}
                title={`${d.date}: ${d.count}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="card grid">
        <h2>Busy Hours (UTC)</h2>
        <div className="bar-chart compact">
          {metrics.hourly.map((d) => (
            <div key={d.hour} className="bar-col">
              <div
                className="bar"
                style={{ height: `${(d.count / maxHour) * 100}%` }}
                title={`${d.hour}:00 - ${d.count}`}
              />
              <div className="bar-label">{d.hour}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card grid">
        <h2>Language & Difficulty</h2>
        <div className="stat-grid">
          {Object.entries(metrics.langCounts).map(([key, value]) => (
            <div key={key} className="stat-card">
              <div className="stat-label">Lang {key}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
          {Object.entries(metrics.difficultyCounts).map(([key, value]) => (
            <div key={key} className="stat-card">
              <div className="stat-label">{key}</div>
              <div className="stat-value">{value}</div>
            </div>
          ))}
          {Object.entries(metrics.themeCounts || {}).map(([key, value]) => (
            <div key={key} className="stat-card">
              <div className="stat-label">Theme</div>
              <div className="stat-value">{key}</div>
              <div className="stat-label">{value} plays</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
