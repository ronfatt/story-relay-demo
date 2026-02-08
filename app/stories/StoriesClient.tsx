"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ui, type Language } from "@/lib/i18n";

type StoryRow = {
  id: string;
  theme: string;
  difficulty: string;
  lang: string;
  title: string;
  total_stars: number;
  created_at: string;
};

export default function StoriesClient() {
  const [lang] = useState<Language>("en");
  const t = ui(lang);
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/stories")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("unauthorized");
        }
        const data = await res.json();
        setStories(data.stories || []);
      })
      .catch(() => setError(t.needLogin));
  }, [t.needLogin]);

  if (error) {
    return (
      <section className="card grid">
        <h2>{t.myStories}</h2>
        <div className="error-banner">{error}</div>
        <div className="hero-actions">
          <Link className="button" href="/login">
            {t.loginButton}
          </Link>
          <Link className="button secondary" href="/register">
            {t.registerButton}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="card grid">
      <h2>{t.myStories}</h2>
      {stories.length === 0 ? (
        <div className="badge">{t.emptyRecords}</div>
      ) : (
        <div className="choice-grid">
          {stories.map((story) => (
            <Link key={story.id} href={`/stories/${story.id}`} className="theme-card">
              <div className="theme-emoji">📖</div>
              <div className="theme-name">{story.title}</div>
              <div className="theme-subtitle">
                {story.theme} · {story.difficulty} · ⭐ {story.total_stars}
              </div>
            </Link>
          ))}
        </div>
      )}
      <button
        className="button secondary"
        onClick={async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/";
        }}
      >
        {t.logoutButton}
      </button>
    </section>
  );
}
