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

type PilotApplication = {
  id: string;
  created_at: string;
  name: string;
  role: string;
  email: string;
  school: string;
  plan: string;
  status: string;
  ai_summary: string;
};

type PilotApplicationsResult = {
  rows: PilotApplication[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export default function AdminPage() {
  const [lang] = useState<Language>("en");
  const t = ui(lang);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apps, setApps] = useState<PilotApplicationsResult | null>(null);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appsError, setAppsError] = useState<string | null>(null);
  const [appsPage, setAppsPage] = useState(1);
  const [appsPageSize, setAppsPageSize] = useState(20);
  const [appsStatus, setAppsStatus] = useState("ALL");
  const [appsQuery, setAppsQuery] = useState("");

  useEffect(() => {
    fetch("/api/admin/metrics")
      .then(async (res) => {
        if (!res.ok) throw new Error("forbidden");
        const data = await res.json();
        setMetrics(data);
      })
      .catch(() => setError("Admin only."));
  }, []);

  useEffect(() => {
    setAppsLoading(true);
    setAppsError(null);
    const params = new URLSearchParams({
      page: String(appsPage),
      pageSize: String(appsPageSize),
      status: appsStatus
    });
    if (appsQuery.trim()) params.set("q", appsQuery.trim());

    fetch(`/api/admin/pilot-applications?${params.toString()}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("failed");
        const data = (await res.json()) as PilotApplicationsResult;
        setApps(data);
      })
      .catch(() => setAppsError("Failed to load pilot applications."))
      .finally(() => setAppsLoading(false));
  }, [appsPage, appsPageSize, appsStatus, appsQuery]);

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
  const exportHref = useMemo(() => {
    const params = new URLSearchParams({ status: appsStatus });
    if (appsQuery.trim()) params.set("q", appsQuery.trim());
    return `/api/admin/pilot-applications/export?${params.toString()}`;
  }, [appsQuery, appsStatus]);

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

      <section className="card grid">
        <div className="admin-section-header">
          <div>
            <h2>Pilot Registration Applications</h2>
            <p>
              {apps ? `Showing ${apps.rows.length} / ${apps.total} applications` : "Loading..."}
            </p>
          </div>
          <div className="admin-tools">
            <input
              className="input"
              value={appsQuery}
              onChange={(e) => {
                setAppsPage(1);
                setAppsQuery(e.target.value);
              }}
              placeholder="Search name / email / school"
            />
            <select
              className="input"
              value={appsStatus}
              onChange={(e) => {
                setAppsPage(1);
                setAppsStatus(e.target.value);
              }}
            >
              <option value="ALL">All</option>
              <option value="UNDER_REVIEW">UNDER_REVIEW</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
            <a className="button" href={exportHref}>
              Export Excel (CSV)
            </a>
          </div>
        </div>

        {appsError && <div className="error-banner">{appsError}</div>}
        {appsLoading && <div className="badge">Loading applications...</div>}

        {!appsLoading && apps && (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Submitted</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>School</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>AI Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {apps.rows.map((row) => (
                    <tr key={row.id}>
                      <td>{new Date(row.created_at).toISOString().replace("T", " ").slice(0, 19)}</td>
                      <td>{row.name}</td>
                      <td>{row.role}</td>
                      <td>{row.email}</td>
                      <td>{row.school}</td>
                      <td>{row.plan}</td>
                      <td>
                        <span className={`status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                      <td>
                        <span className="summary-clamp" title={row.ai_summary}>
                          {row.ai_summary}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {apps.rows.length === 0 && (
                    <tr>
                      <td colSpan={8}>No applications found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-pagination">
              <div className="admin-page-size">
                <label htmlFor="page-size">Rows:</label>
                <select
                  id="page-size"
                  className="input"
                  value={appsPageSize}
                  onChange={(e) => {
                    setAppsPage(1);
                    setAppsPageSize(Number(e.target.value));
                  }}
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="admin-page-nav">
                <button
                  className="button ghost"
                  onClick={() => setAppsPage((p) => Math.max(1, p - 1))}
                  disabled={apps.page <= 1}
                >
                  Prev
                </button>
                <span>
                  Page {apps.page} / {apps.totalPages}
                </span>
                <button
                  className="button ghost"
                  onClick={() => setAppsPage((p) => Math.min(apps.totalPages, p + 1))}
                  disabled={apps.page >= apps.totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
