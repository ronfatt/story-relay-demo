"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState<Language>("en");
  const [difficulty, setDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner"
  );
  const [user, setUser] = useState<{ id: number; email: string; total_stars: number } | null>(
    null
  );
  const t = ui(lang);
  const levelBadge = useMemo(() => {
    if (!user) return t.explorerLevel;
    if (user.total_stars >= 120) return "🌟 Master Story Hero";
    if (user.total_stars >= 50) return "⭐ Rising Explorer";
    return t.explorerLevel;
  }, [t.explorerLevel, user]);

  const themes = [
    { name: "Magic Forest", emoji: "✨", preview: "Glowing paths and secret doors.", unlock: 0 },
    { name: "Space School", emoji: "🚀", preview: "Solve star mysteries with robots.", unlock: 0 },
    { name: "Ocean Quest", emoji: "🌊", preview: "Dive for pearls and sea clues.", unlock: 0 },
    { name: "Dino Valley", emoji: "🦕", preview: "Brave trails and friendly giants.", unlock: 0 },
    { name: "Fairy Circus", emoji: "🎪", preview: "Tiny wings and a twinkling big top.", unlock: 0 },
    { name: "Pirate Cove", emoji: "🏴‍☠️", preview: "Treasure maps and gentle waves.", unlock: 0 },
    { name: "Sky Castle", emoji: "🏰", preview: "Cloud bridges and sky bells.", unlock: 50 },
    { name: "Robot City", emoji: "🤖", preview: "Beep-boop clues and bright lights.", unlock: 50 },
    { name: "Candy Kingdom", emoji: "🍭", preview: "Sweet paths and sparkle hints.", unlock: 50 },
    { name: "Toy Town", emoji: "🧸", preview: "Playful toys and secret switches.", unlock: 50 },
    { name: "Rainbow Ranch", emoji: "🌈", preview: "Colorful stables and kind ponies.", unlock: 50 },
    { name: "Jungle Rescue", emoji: "🌿", preview: "Hidden trails and rescue calls.", unlock: 80 },
    { name: "Ice Mountain", emoji: "❄️", preview: "Crystal caves and chilly clues.", unlock: 80 },
    { name: "Desert Caravan", emoji: "🏜️", preview: "Golden dunes and oasis secrets.", unlock: 120 },
    { name: "Marvel World", emoji: "🦸", preview: "Hero masks and mission alarms.", unlock: 120 },
    { name: "DC World", emoji: "🛡️", preview: "City lights and brave signals.", unlock: 120 },
    { name: "Kpop Demon Hunter World", emoji: "🎤", preview: "Bright stages and hidden shadows.", unlock: 120 }
  ];

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
            <h1 className="dash-hero-title">
              Interactive English Story <span>Adventure</span>
            </h1>
            <p>{t.heroSubtitle}</p>
          </div>
          <div className="hero-orb sparkle">🎲</div>
        </div>
        <div className="feature-grid">
          <div className="feature-card dash-info-card info-a">
            <div className="feature-emoji">🧠</div>
            <div className="feature-title">
              {t.levelBeginner} / {t.levelIntermediate} / {t.levelAdvanced}
            </div>
            <div className="feature-text">{t.levelHintBeginner}</div>
          </div>
          <div className="feature-card dash-info-card info-b">
            <div className="feature-emoji">🧩</div>
            <div className="feature-title">{t.how2}</div>
            <div className="feature-text">{t.how3}</div>
          </div>
          <div className="feature-card dash-info-card info-c">
            <div className="feature-emoji">⭐</div>
            <div className="feature-title">{t.suggestedVocab}</div>
            <div className="feature-text">{t.safeBadge}</div>
          </div>
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
              <div className="world-cta">{t.enterThisWorld}</div>
              {locked && (
                <div className="theme-lock">
                  {t.locked} · {t.unlockNext} {theme.unlock} ⭐
                </div>
              )}
            </Link>
          )})}
        </div>
      </section>

      <section className="card grid play-setup-card">
        <div className="section-title">{t.pickLevel}</div>
        <div className="choice-grid">
          {(["Beginner", "Intermediate", "Advanced"] as const).map((level) => (
            <button
              key={level}
              className={`theme-card ${difficulty === level ? "selected" : ""}`}
              onClick={() => setDifficulty(level)}
              type="button"
            >
              <div className="theme-emoji">
                {level === "Beginner" ? "🌱" : level === "Intermediate" ? "⚡" : "🦉"}
              </div>
              <div className="theme-name">
                {level === "Beginner"
                  ? t.levelBeginner
                  : level === "Intermediate"
                    ? t.levelIntermediate
                    : t.levelAdvanced}
              </div>
              <div className="theme-subtitle">
                {level === "Beginner"
                  ? t.levelHintBeginner
                  : level === "Intermediate"
                    ? t.levelHintIntermediate
                    : t.levelHintAdvanced}
              </div>
            </button>
          ))}
        </div>

        <div className="grid">
          <div className="section-title">{t.nameYourHero}</div>
          <input
            className="input hero-name-input"
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

        <div className="mission-callout">{t.todaysMission}</div>

        <div className="hero-actions centered-play-action">
          <Link
            className="button chest-button giant-play-button"
            href={`/play?name=${encodeURIComponent(name)}&lang=${lang}&difficulty=${difficulty}`}
          >
            <span className="chest">🧰</span>
            {t.playButton}
            <span className="sparkles">✨✨</span>
          </Link>
          <div className="badge stars-badge">
            {t.totalStarsWallet}: {user.total_stars} ⭐
          </div>
          <div className="badge level-badge">{levelBadge}</div>
        </div>
      </section>

      <section className="card grid how-card">
        <details className="how-collapse">
          <summary className="how-summary">{t.howTitle}</summary>
          <div className="step-grid">
            <div className="step-card solid-step">
              <div className="step-number">1</div>
              <div className="step-text">{t.how1}</div>
            </div>
            <div className="step-card solid-step">
              <div className="step-number">2</div>
              <div className="step-text">{t.how2}</div>
            </div>
            <div className="step-card solid-step">
              <div className="step-number">3</div>
              <div className="step-text">{t.how3}</div>
            </div>
            <div className="step-card solid-step">
              <div className="step-number">4</div>
              <div className="step-text">{t.how4}</div>
            </div>
          </div>
        </details>
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
            {t.viewProgress}
          </Link>
        </div>
      </section>
    </main>
  );
}
