"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState<{ id: number; email: string; total_stars: number } | null>(
    null
  );
  const t = ui(lang);
  const languageCards: Record<
    Language,
    { icon: string; title: string; description: string }
  > = {
    en: {
      icon: "ABC",
      title: t.langCardEnTitle,
      description: t.langCardEnDesc
    },
    ms: {
      icon: "BM",
      title: t.langCardMsTitle,
      description: t.langCardMsDesc
    },
    zh: {
      icon: "文",
      title: t.langCardZhTitle,
      description: t.langCardZhDesc
    }
  };

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  async function handleAuth() {
    setAuthError("");
    setAuthLoading(true);
    try {
      const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
      const data = await res.json();
      setAuthLoading(false);
      if (!res.ok) {
        setAuthError(data.error || "Auth failed.");
        return;
      }
      setUser(data.user || null);
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch {
      setAuthLoading(false);
      setAuthError("Network error. Please try again.");
    }
  }

  return (
    <main className="grid onboarding-page neon-theme">
      <section className="card hero-card onboarding-hero">
        <div className="hero-kicker">{t.heroKicker}</div>
        <h1 className="challenge-title">
          <span>{t.challengeTitleLine1}</span>
          <span>⚡ {t.challengeTitleLine2} ⚡</span>
        </h1>
        <p className="challenge-subtitle">
          <span>{t.challengeSubtitleLine1}</span>
          <span>{t.challengeSubtitleLine2}</span>
        </p>
        <div className="challenge-badge sparkle">🔥 {t.challengeBadge}</div>
      </section>

      <section className="card onboarding-language-card">
        <div className="hero-header">
          <div>
            <h2>{t.chooseStoryLanguage}</h2>
            <p>{t.conceptBody}</p>
          </div>
          <div className="hero-orb sparkle">⭐</div>
        </div>
        <div className="choice-grid language-grid">
          {(["en", "ms", "zh"] as Language[]).map((code) => (
            <button
              key={code}
              className={`theme-card language-choice language-${code} ${lang === code ? "selected" : ""}`}
              onClick={() => setLang(code)}
              type="button"
            >
              <div className="language-card-top">
                <div className="language-icon">{languageCards[code].icon}</div>
                {lang === code && <div className="language-check">✓</div>}
              </div>
              <div className="theme-name">{LANG_LABELS[code]}</div>
              <div className="language-title">{languageCards[code].title}</div>
              <div className="language-description">{languageCards[code].description}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="card growth-card">
        <h2>✨ {t.unlockSkillsTitle}</h2>
        <div className="feature-grid growth-grid">
          <div className="feature-card growth-mini-card">
            <div className="feature-emoji">🧠</div>
            <div className="feature-title">{t.growthCreativity}</div>
          </div>
          <div className="feature-card growth-mini-card">
            <div className="feature-emoji">📚</div>
            <div className="feature-title">{t.growthVocabulary}</div>
          </div>
          <div className="feature-card growth-mini-card">
            <div className="feature-emoji">✍️</div>
            <div className="feature-title">{t.growthWriting}</div>
          </div>
          <div className="feature-card growth-mini-card">
            <div className="feature-emoji">🧩</div>
            <div className="feature-title">{t.growthStructure}</div>
          </div>
        </div>
      </section>

      <section className="card auth-cover-card">
        <h2>🚀 {t.startJourney}</h2>
        {user ? (
          <div className="adventure-row">
            <div className="adventure-emoji">✅</div>
            <div>
              <div className="adventure-title">{user.email}</div>
              <div className="adventure-text">
                {t.totalStarsWallet}: {user.total_stars} ⭐
              </div>
            </div>
            <Link className="button secondary" href="/dashboard">
              {t.viewRecords}
            </Link>
          </div>
        ) : (
          <div className="grid">
            {authError && <div className="error-banner">{authError}</div>}
            <label>
              {t.emailLabel}
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
              />
            </label>
            <label>
              {t.passwordLabel}
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="auth-main-action">
              <button className="button cta-primary" onClick={handleAuth} disabled={authLoading}>
                {authLoading
                  ? t.gettingReady
                  : authMode === "login"
                    ? t.loginButton
                    : t.startCreatingNow}
              </button>
            </div>
            <button
              className="text-switch-link"
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
              type="button"
            >
              {authMode === "login" ? t.noAccount : t.haveAccount}
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
