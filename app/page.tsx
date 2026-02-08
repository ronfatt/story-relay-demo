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
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const t = ui(lang);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user || null))
      .catch(() => setUser(null));
  }, []);

  async function handleAuth() {
    setAuthError("");
    setAuthLoading(true);
    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
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
  }

  return (
    <main className="grid">
      <section className="card hero-card grid">
        <div className="hero-header">
          <div>
            <div className="hero-kicker">{t.heroKicker}</div>
            <h1>{t.conceptTitle}</h1>
            <p>{t.conceptBody}</p>
          </div>
          <div className="hero-orb sparkle">🌈</div>
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

        {user ? (
          <div className="adventure-row">
            <div className="adventure-emoji">✅</div>
            <div>
              <div className="adventure-title">{user.email}</div>
              <div className="adventure-text">{t.learningRecords}</div>
            </div>
            <Link className="button secondary" href="/dashboard">
              {t.viewRecords}
            </Link>
          </div>
        ) : (
          <div className="grid">
            <div className="section-title">
              {authMode === "login" ? t.loginTitle : t.registerTitle}
            </div>
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
            <div className="hero-actions">
              <button className="button" onClick={handleAuth} disabled={authLoading}>
                {authLoading
                  ? t.gettingReady
                  : authMode === "login"
                  ? t.loginButton
                  : t.registerButton}
              </button>
              <button
                className="button secondary"
                onClick={() =>
                  setAuthMode(authMode === "login" ? "register" : "login")
                }
              >
                {authMode === "login" ? t.noAccount : t.haveAccount}
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
