"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

const themes = [
  "Magic Forest",
  "Space School",
  "Ocean Quest",
  "Dino Valley",
  "Sky Castle",
  "Robot City",
  "Candy Kingdom",
  "Jungle Rescue",
  "Ice Mountain",
  "Desert Caravan"
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

type Choice = { id: string; text: string };

type RoundPayload = {
  sessionId: string;
  round: number;
  storySoFar: string;
  question: string;
  choices: Choice[];
  targetWords: string[];
  difficulty: string;
  inventory?: string[];
  maxRounds?: number;
  scene: {
    hero: string;
    location: string;
    mood: string;
    conflict: string;
  };
};

type PlayClientProps = {
  initialName?: string;
  initialTheme?: string;
  initialLang?: Language;
};

export default function PlayClient({
  initialName = "",
  initialTheme,
  initialLang = "en"
}: PlayClientProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [roundData, setRoundData] = useState<RoundPayload | null>(null);
  const [theme, setTheme] = useState(
    initialTheme && themes.includes(initialTheme) ? initialTheme : themes[0]
  );
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [userLine, setUserLine] = useState("");
  const [heroName, setHeroName] = useState(initialName);
  const [burstKey, setBurstKey] = useState(0);
  const t = ui(lang);

  useEffect(() => {
    setRoundData(null);
    setSessionId(null);
  }, [theme, difficulty, heroName, lang]);

  async function startSession() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme, difficulty, heroName, lang })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Could not start the story. Please try again.");
        setLoading(false);
        return;
      }
      setSessionId(data.sessionId);
      setRoundData(data);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  async function submitChoice(choiceId: string) {
    if (!sessionId || !roundData) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/session/advance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, choiceId, userLine, lang })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setUserLine("");
      setBurstKey(Date.now());
      if (data.done) {
        router.push(`/result?sessionId=${sessionId}&lang=${lang}`);
        return;
      }
      setRoundData(data);
      setLoading(false);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h2>{t.letsStart}</h2>
        {error && <div className="error-banner">{error}</div>}
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
        <div className="grid">
          <div className="section-title">{t.pickWorld}</div>
          <div className="choice-grid">
            {themes.map((t) => (
              <button
                key={t}
                className={`theme-card ${theme === t ? "selected" : ""}`}
                onClick={() => setTheme(t)}
                type="button"
              >
                <div className="theme-emoji">{themeEmoji(t)}</div>
                <div className="theme-name">{t}</div>
                <div className="theme-subtitle">Tap to explore</div>
              </button>
            ))}
          </div>
        </div>
        <div className="grid">
          <div className="section-title">{t.heroName}</div>
          <input
            className="input"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            placeholder={t.heroPlaceholder}
          />
        </div>
        <div className="grid">
          <div className="section-title">{t.pickLevel}</div>
          <div className="choice-grid">
            {difficulties.map((d) => (
              <button
                key={d}
                className={`theme-card ${difficulty === d ? "selected" : ""}`}
                onClick={() => setDifficulty(d)}
                type="button"
              >
                <div className="theme-emoji">{difficultyEmoji(d)}</div>
                <div className="theme-name">{difficultyLabel(d, t)}</div>
                <div className="theme-subtitle">{difficultyHint(d, t)}</div>
              </button>
            ))}
          </div>
        </div>
        <button className="button" onClick={startSession} disabled={loading}>
          {loading ? t.gettingReady : t.letPlay}
        </button>
      </section>

      {roundData && (
        <section className="card grid play-card">
          <ConfettiBurst burstKey={burstKey} />
          <div className="badge">
            {t.round} {roundData.round} / {roundData.maxRounds ?? 10}
          </div>
          <div className="scene-card">
            <div className="scene-emoji">{themeEmoji(theme)}</div>
            <div>
              <div className="scene-title">{roundData.scene.hero}</div>
              <div className="scene-meta">
                {t.location}: {roundData.scene.location} · {t.mood}: {roundData.scene.mood}
              </div>
              <div className="scene-meta">
                {t.goal}: {roundData.scene.conflict}
              </div>
              {roundData.inventory && roundData.inventory.length > 0 && (
                <div className="scene-meta">
                  {t.inventoryLabel}: {roundData.inventory.join(", ")}
                </div>
              )}
            </div>
            <div className="avatar-card">
              <div className="avatar-emoji">{avatarEmoji(theme)}</div>
              <div className="avatar-name">{roundData.scene.hero}</div>
            </div>
          </div>
          <div className="story-block story-animate" key={roundData.round}>
            {roundData.storySoFar}
          </div>
          <div>
            <strong>{roundData.question}</strong>
          </div>
          <div className="choice-grid">
            {roundData.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-card"
                onClick={() => submitChoice(choice.id)}
                disabled={loading}
              >
                <div className="choice-letter">{choice.id}</div>
                <div className="choice-text">{choice.text}</div>
              </button>
            ))}
          </div>
          <label>
            {t.addLine}
            <input
              className="input"
              value={userLine}
              onChange={(e) => setUserLine(e.target.value)}
              placeholder="Example: Mia felt excited and brave!"
            />
          </label>
          <div>
            {t.targetWords}: {roundData.targetWords.join(", ")}
          </div>
        </section>
      )}
    </main>
  );
}

function themeEmoji(theme: string) {
  if (theme === "Magic Forest") return "✨";
  if (theme === "Space School") return "🚀";
  if (theme === "Ocean Quest") return "🌊";
  if (theme === "Dino Valley") return "🦕";
  if (theme === "Sky Castle") return "🏰";
  if (theme === "Robot City") return "🤖";
  if (theme === "Candy Kingdom") return "🍭";
  if (theme === "Jungle Rescue") return "🌿";
  if (theme === "Ice Mountain") return "❄️";
  if (theme === "Desert Caravan") return "🏜️";
  return "⭐";
}

function difficultyEmoji(level: string) {
  if (level === "Beginner") return "🌱";
  if (level === "Intermediate") return "⚡";
  if (level === "Advanced") return "🦉";
  return "⭐";
}

function difficultyHint(level: string, t: ReturnType<typeof ui>) {
  if (level === "Beginner") return t.levelHintBeginner;
  if (level === "Intermediate") return t.levelHintIntermediate;
  if (level === "Advanced") return t.levelHintAdvanced;
  return "";
}

function difficultyLabel(level: string, t: ReturnType<typeof ui>) {
  if (level === "Beginner") return t.levelBeginner;
  if (level === "Intermediate") return t.levelIntermediate;
  if (level === "Advanced") return t.levelAdvanced;
  return level;
}

function avatarEmoji(theme: string) {
  if (theme === "Magic Forest") return "🧚";
  if (theme === "Space School") return "🧑‍🚀";
  if (theme === "Ocean Quest") return "🐬";
  if (theme === "Dino Valley") return "🦖";
  if (theme === "Sky Castle") return "🦄";
  if (theme === "Robot City") return "🧠";
  if (theme === "Candy Kingdom") return "🧁";
  if (theme === "Jungle Rescue") return "🦜";
  if (theme === "Ice Mountain") return "🐻‍❄️";
  if (theme === "Desert Caravan") return "🐪";
  return "⭐";
}

function ConfettiBurst({ burstKey }: { burstKey: number }) {
  return (
    <div className="confetti" key={burstKey} aria-hidden="true">
      {Array.from({ length: 14 }).map((_, index) => (
        <span className={`confetti-piece c${index % 7}`} key={index} />
      ))}
    </div>
  );
}
