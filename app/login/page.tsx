"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ui, type Language } from "@/lib/i18n";

export default function LoginPage() {
  const router = useRouter();
  const [lang] = useState<Language>("en");
  const t = ui(lang);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Login failed.");
      return;
    }
    router.push("/");
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h2>{t.loginTitle}</h2>
        {error && <div className="error-banner">{error}</div>}
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
        <button className="button" onClick={handleLogin} disabled={loading}>
          {loading ? t.gettingReady : t.loginButton}
        </button>
        <Link href="/register" className="badge">
          {t.noAccount}
        </Link>
      </section>
    </main>
  );
}
