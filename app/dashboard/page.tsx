"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState<Language>("en");
  const [user, setUser] = useState<{ id: number; email: string; total_stars: number } | null>(
    null
  );
  const t = ui(lang);

  const themes = [
    { name: "Magic Forest", emoji: "✨", preview: "Glowing paths and secret doors.", unlock: 0 },
    { name: "Space School", emoji: "🚀", preview: "Solve star mysteries with robots.", unlock: 0 },
    { name: "Ocean Quest", emoji: "🌊", preview: "Dive for pearls and sea clues.", unlock: 0 },
    { name: "Dino Valley", emoji: "🦕", preview: "Brave trails and friendly giants.", unlock: 0 },
    { name: "Sky Castle", emoji: "🏰", preview: "Cloud bridges and sky bells.", unlock: 50 },
    { name: "Robot City", emoji: "🤖", preview: "Beep-boop clues and bright lights.", unlock: 50 },
    { name: "Candy Kingdom", emoji: "🍭", preview: "Sweet paths and sparkle hints.", unlock: 50 },
    { name: "Jungle Rescue", emoji: "🌿", preview: "Hidden trails and rescue calls.", unlock: 80 },
    { name: "Ice Mountain", emoji: "❄️", preview: "Crystal caves and chilly clues.", unlock: 80 },
    { name: "Desert Caravan", emoji: "🏜️", preview: "Golden dunes and oasis secrets.", unlock: 120 }
  ];

  const today = useMemo(() => {
    const pick = themes[Math.floor(Math.random() * themes.length)];
    const hooks = [
      "A tiny clue is hiding nearby...",
      "A friendly guide is waiting.",
      "A surprise twist is coming!"
    ];
    return { ...pick, hook: hooks[Math.floor(Math.random() * hooks.length)] };
  }, []);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

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
    <main className="grid">
      <section className="card hero-card grid">
        <div className="hero-header">
          <div>
            <div className="hero-kicker">{t.heroKicker}</div>
            <h1>{t.heroTitle}</h1>
            <p>{t.heroSubtitle}</p>
          </div>
          <div className="hero-orb sparkle">🎲</div>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-emoji">🧠</div>
            <div className="feature-title">
              {t.levelBeginner} / {t.levelIntermediate} / {t.levelAdvanced}
            </div>
            <div className="feature-text">{t.levelHintBeginner}</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">🧩</div>
            <div className="feature-title">{t.how2}</div>
            <div className="feature-text">{t.how3}</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">⭐</div>
            <div className="feature-title">{t.suggestedVocab}</div>
            <div className="feature-text">{t.safeBadge}</div>
          </div>
        </div>
        <div className="grid">
          <div className="section-title">{t.nameYourHero}</div>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.heroPlaceholder}
          />
        </div>
        <div className="grid">
          <div className="section-title">{t.language}</div>
          <div className="choice-grid">
            {(["en", "zh", "ms"] as Language[]).map((code) => (
              <button
                key={code}
                className={`theme-card ${lang === code ? "selected" : ""}`}
                onClick={() => setLang(code)}
                type="button"
              >
                <div className="theme-emoji">🌐</div>
                <div className="theme-name">{LANG_LABELS[code]}</div>
                <div className="theme-subtitle">{code.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="hero-actions">
          <Link
            className="button chest-button"
            href={`/play?name=${encodeURIComponent(name)}&lang=${lang}`}
          >
            <span className="chest">🧰</span>
            {t.playButton}
            <span className="sparkles">✨✨</span>
          </Link>
          <div className="badge">
            {t.totalStarsWallet}: {user.total_stars} ⭐
          </div>
        </div>
      </section>

      <section className="card grid adventure-card">
        <div className="section-title">{t.todayTitle}</div>
        <div className="adventure-row">
          <div className="adventure-emoji">{today.emoji}</div>
          <div>
            <div className="adventure-title">{today.name}</div>
            <div className="adventure-text">{today.preview}</div>
            <div className="adventure-hook">{today.hook}</div>
          </div>
          <Link
            className="button secondary"
            href={`/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
              today.name
            )}&lang=${lang}`}
          >
            {t.todayButton}
          </Link>
        </div>
      </section>

      <section className="card grid carousel-card">
        <div className="section-title">{t.pickWorld}</div>
        <div className="carousel">
          {themes.map((theme) => {
            const locked = user.total_stars < theme.unlock;
            return (
            <Link
              key={theme.name}
              className={`world-card ${locked ? "locked" : ""}`}
              href={`/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
                theme.name
              )}&lang=${lang}`}
              onClick={(e) => {
                if (locked) e.preventDefault();
              }}
            >
              <div className="world-emoji">{theme.emoji}</div>
              <div className="world-name">{theme.name}</div>
              <div className="world-preview">{theme.preview}</div>
              <div className="world-cta">{t.playWorldCta}</div>
              {locked && (
                <div className="theme-lock">
                  {t.locked} · {t.unlockNext} {theme.unlock} ⭐
                </div>
              )}
            </Link>
          )})}
        </div>
      </section>

      <section className="card grid how-card">
        <h2>{t.howTitle}</h2>
        <div className="step-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-text">{t.how1}</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-text">{t.how2}</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-text">{t.how3}</div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-text">{t.how4}</div>
          </div>
        </div>
      </section>

      <section className="card grid adventure-card">
        <div className="section-title">{t.myStories} / {t.learningRecords}</div>
        <div className="adventure-row">
          <div className="adventure-emoji">📚</div>
          <div>
            <div className="adventure-title">{t.viewRecords}</div>
            <div className="adventure-text">{t.learningRecords}</div>
          </div>
          <Link className="button secondary" href="/stories">
            {t.viewRecords}
          </Link>
        </div>
      </section>
    </main>
  );
}
