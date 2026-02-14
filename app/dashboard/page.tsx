"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [lang, setLang] = useState<Language>("en");
  const [pathLevel, setPathLevel] = useState<"beginner" | "explorer" | "creator">("beginner");
  const [selectedTheme, setSelectedTheme] = useState("Magic Forest");
  const [showDetails, setShowDetails] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [user, setUser] = useState<{ id: number; email: string; total_stars: number } | null>(
    null
  );
  const t = ui(lang);
  const pathDifficultyMap: Record<"beginner" | "explorer" | "creator", "Beginner" | "Intermediate" | "Advanced"> = {
    beginner: "Beginner",
    explorer: "Intermediate",
    creator: "Advanced"
  };
  const levelBadge = useMemo(() => {
    if (!user) return t.explorerLevel;
    if (user.total_stars >= 120) return "🌟 Master Story Hero";
    if (user.total_stars >= 50) return "⭐ Rising Explorer";
    return t.explorerLevel;
  }, [t.explorerLevel, user]);
  const coachTips = useMemo(
    () => [t.aiCoachPrompt1, t.aiCoachPrompt2, t.aiCoachPrompt3].filter(Boolean),
    [t.aiCoachPrompt1, t.aiCoachPrompt2, t.aiCoachPrompt3]
  );

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

  const startMissionHref = useMemo(
    () =>
      `/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
        selectedTheme
      )}&lang=${lang}&difficulty=${pathDifficultyMap[pathLevel]}`,
    [lang, name, pathLevel, selectedTheme]
  );

  const skillBars = useMemo(() => {
    const stars = user?.total_stars || 0;
    return [
      { label: "Creativity", value: Math.min(100, 28 + Math.floor(stars * 0.45)) },
      { label: "Vocabulary", value: Math.min(100, 22 + Math.floor(stars * 0.4)) },
      { label: "Story Flow", value: Math.min(100, 18 + Math.floor(stars * 0.35)) },
      { label: "Grammar", value: Math.min(100, 14 + Math.floor(stars * 0.3)) }
    ];
  }, [user?.total_stars]);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    if (!coachTips.length) return;
    const timer = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % coachTips.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [coachTips]);

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
    <main className="grid dashboard-neon">
      <section className="card sectionCard hero-card grid">
        <div className="hero-header">
          <div>
            <div className="hero-kicker">{t.heroKicker}</div>
            <h1 className="dash-hero-title heroTitle">
              <span>{t.heroTitle}</span>
            </h1>
            <p className="heroSub">Pick a world. Make choices. Grow your skills.</p>
          </div>
          <div className="hero-orb heroIcon sparkle">🎲</div>
        </div>
        <div className="mission-header">
          <div className="mission-avatar">{(name.trim()[0] || user.email[0] || "S").toUpperCase()}</div>
          <div>
            <div className="mission-title">Today Mission</div>
            <div className="mission-subtitle">
              Enter <b>{selectedTheme}</b> and finish a {pathDifficultyMap[pathLevel]} path.
            </div>
          </div>
          <Link className="button btnPrimary mission-cta" href={startMissionHref}>
            Start Mission
          </Link>
        </div>
      </section>

      <section className="card sectionCard grid carousel-card">
        <div className="section-title">🪐 {t.pickWorld}</div>
        <div className="carousel world-grid-compact">
          {themes.map((theme) => {
            const locked = user.total_stars < theme.unlock;
            const isSelected = selectedTheme === theme.name;
            const coverSlug = theme.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const worldHref = `/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
              theme.name
            )}&lang=${lang}&difficulty=${pathDifficultyMap[pathLevel]}`;
            return (
              <article
                key={theme.name}
                className={`world-card worldCard world-tier-${theme.unlock} world-rich world-cover-${coverSlug} ${locked ? "locked" : ""} ${isSelected ? "selected" : ""}`}
                onClick={() => !locked && setSelectedTheme(theme.name)}
                title={theme.preview}
              >
                <div className="world-cover">
                  <span className="world-cover-emoji">{theme.emoji}</span>
                  {locked && <span className="locked-pill">LOCKED</span>}
                </div>
                <div className="world-name">{theme.name}</div>
                <div className="world-preview">{theme.preview}</div>
                <Link
                  className="world-cta worldEnter world-enter-big"
                  href={worldHref}
                  onClick={(e) => locked && e.preventDefault()}
                >
                  Enter
                </Link>
                {locked && <div className="unlock-pill">{theme.unlock} ⭐</div>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="card sectionCard grid play-setup-card">
        <div className="section-title">🌟 {t.learningPathTitle}</div>
        <div className="choice-grid">
          {(["beginner", "explorer", "creator"] as const).map((level) => (
            <button
              key={level}
              className={`theme-card pathCard path-${level} ${pathLevel === level ? "selected" : ""}`}
              onClick={() => setPathLevel(level)}
              type="button"
            >
              <div className="theme-emoji pathDotWrap">
                <span className={`pathDot ${level}`}></span>
              </div>
              <div className="theme-name">
                {level === "beginner"
                  ? t.levelBeginner
                  : level === "explorer"
                    ? t.learningPathExplorer
                    : t.learningPathCreator}
              </div>
              <div className="path-meta">
                <div>{level === "beginner" ? t.learningPathBeginnerAge : level === "explorer" ? t.learningPathExplorerAge : t.learningPathCreatorAge}</div>
                <div>{level === "beginner" ? t.learningPathBeginnerFocus : level === "explorer" ? t.learningPathExplorerFocus : t.learningPathCreatorFocus}</div>
                <div>{level === "beginner" ? t.learningPathBeginnerIncludes : level === "explorer" ? t.learningPathExplorerIncludes : t.learningPathCreatorIncludes}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="ai-coach-preview sectionCard">
          <div className="section-title">🤖 {t.aiCoachTitle}</div>
          <div className="coach-bubble">
            <div className="coach-avatar">🤖</div>
            <div className="coach-text">
              <div className="coach-tip-label">Coach Tip</div>
              <div className="coach-tip">{coachTips[tipIndex] || "Add one vivid word to your next line."}</div>
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="section-title">🦸 {t.nameYourHero}</div>
          <input
            className="input hero-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.heroPlaceholder}
          />
        </div>

        <div className="grid">
          <div className="section-title">🌍 {t.language}</div>
          <div className="choice-grid">
            {(["en", "zh", "ms"] as Language[]).map((code) => (
              <button
                key={code}
                className={`theme-card langCard lang-${code} ${lang === code ? "selected" : ""}`}
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
          <Link className="button chest-button giant-play-button btnPrimary" href={startMissionHref}>
            <span className="chest">🧰</span>
            Start Mission
            <span className="sparkles">✨✨</span>
          </Link>
          <div className="badge level-badge">{levelBadge}</div>
          <button className="button ghost small" type="button" onClick={() => setShowDetails(true)}>
            Details
          </button>
        </div>
        <div className="pdf-teaser">📘 {t.pdfTeaser}</div>
      </section>

      <section className="card sectionCard grid growth-preview-card">
        <div className="section-title">✨ {t.unlockSkillsTitle}</div>
        <div className="growth-preview-grid">
          {skillBars.map((skill) => (
            <div key={skill.label} className="growth-preview-item">
              <div className="progress-head">
                <span>{skill.label}</span>
                <span>{skill.value}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${skill.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="growth-preview-note">
          {t.totalStarsWallet}: {user.total_stars} ⭐ · {t.growthPreviewUpdated}
        </div>
      </section>

      <section className="card sectionCard grid how-card">
        <div className="section-title">How It Works</div>
        <div className="how-scroll-row">
          <div className="how-mini-card" title={t.how1}>
            <div className="how-icon">💡</div>
            <div className="how-mini-title">Idea</div>
          </div>
          <div className="how-mini-card" title={t.how2}>
            <div className="how-icon">🧱</div>
            <div className="how-mini-title">Build</div>
          </div>
          <div className="how-mini-card" title={t.how3}>
            <div className="how-icon">🎨</div>
            <div className="how-mini-title">Create</div>
          </div>
          <div className="how-mini-card" title={t.shareHint}>
            <div className="how-icon">📤</div>
            <div className="how-mini-title">Share</div>
          </div>
        </div>
      </section>

      <section className="card sectionCard grid adventure-card">
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

      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3>Mission Details</h3>
            <p>Pick a world, choose your level, then complete the story path.</p>
            <ul>
              <li>AI coach tips rotate while you write.</li>
              <li>Progress bars update as stars increase.</li>
              <li>Locked worlds open when your stars reach each requirement.</li>
            </ul>
            <button className="button btnPrimary" type="button" onClick={() => setShowDetails(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
