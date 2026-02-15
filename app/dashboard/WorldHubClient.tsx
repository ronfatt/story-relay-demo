"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ui, type Language } from "@/lib/i18n";
import { WORLD_DATA } from "@/lib/world-data";

type SessionHistoryItem = {
  id: string;
  theme: string;
};

const MAIN_WORLDS = Object.entries(WORLD_DATA).map(([slug, world]) => ({
  slug,
  ...world
}));

export default function WorldHubClient() {
  const [lang] = useState<Language>("en");
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [history, setHistory] = useState<SessionHistoryItem[]>([]);
  const t = ui(lang);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    fetch("/api/session/history", { credentials: "include", cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) return [];
        const data = await res.json();
        return (data.sessions || []) as SessionHistoryItem[];
      })
      .then((rows) => setHistory(rows))
      .catch(() => setHistory([]));
  }, []);

  const worldProgress = useMemo(() => {
    return MAIN_WORLDS.reduce<Record<string, number>>((acc, world) => {
      const plays = history.filter((row) => row.theme === world.title).length;
      acc[world.slug] = Math.min(100, plays * 20);
      return acc;
    }, {});
  }, [history]);

  if (!user) {
    return (
      <main className="grid">
        <section className="card grid">
          <h2>{t.needLogin}</h2>
          <div className="hero-actions">
            <Link className="button" href="/">
              {t.loginButton}
            </Link>
            <Link className="button secondary" href="/">
              {t.registerButton}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="grid dashboard-neon world-hub-page">
      <section className="card sectionCard grid world-hub-shell">
        <div className="world-hub-head">
          <div>
            <div className="hero-kicker">STORYBAH</div>
            <h1 className="world-hub-title">World Hub</h1>
          </div>
        </div>

        <div className="world-hub-grid">
          {MAIN_WORLDS.map((world) => {
            const progress = worldProgress[world.slug] || 0;
            return (
              <Link key={world.slug} href={`/world/${world.slug}`} className="world-hub-card">
                <div className="world-hub-cover">
                  <img
                    className="world-hub-cover-img"
                    src={world.thumbnail}
                    alt={`${world.title} cover`}
                    loading="lazy"
                  />
                </div>
                <div className="world-hub-name">{world.title}</div>
                <div className="world-hub-desc">{world.description}</div>
                <div className="world-hub-progress-wrap">
                  <div className="world-hub-progress-head">
                    <span>Completion</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="world-hub-progress-track">
                    <div className="world-hub-progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <span className="world-hub-enter enterButton">Enter</span>
              </Link>
            );
          })}
        </div>
      </section>

      <footer className="world-hub-footer">
        <Link className="world-hub-footer-link" href="/stories">
          My Stories
        </Link>
      </footer>
    </main>
  );
}
