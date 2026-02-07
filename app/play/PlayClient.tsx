"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const themes = ["Magic Forest", "Space School", "Ocean Quest", "Dino Valley"];
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
};

export default function PlayClient({ initialName = "" }: PlayClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [roundData, setRoundData] = useState<RoundPayload | null>(null);
  const [theme, setTheme] = useState(themes[0]);
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [userLine, setUserLine] = useState("");
  const [heroName, setHeroName] = useState(initialName);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    setRoundData(null);
    setSessionId(null);
  }, [theme, difficulty, heroName]);

  async function startSession() {
    setLoading(true);
    const res = await fetch("/api/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme, difficulty, heroName })
    });
    const data = await res.json();
    setSessionId(data.sessionId);
    setRoundData(data);
    setLoading(false);
  }

  async function submitChoice(choiceId: string) {
    if (!sessionId || !roundData) return;
    setLoading(true);
    const res = await fetch("/api/session/next", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, choiceId, userLine })
    });
    const data = await res.json();
    setUserLine("");
    setBurstKey(Date.now());
    if (data.done) {
      router.push(`/result?sessionId=${sessionId}`);
      return;
    }
    setRoundData(data);
    setLoading(false);
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h2>Let’s Start!</h2>
        <div className="grid">
          <div className="section-title">Pick a World</div>
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
          <div className="section-title">Hero Name</div>
          <input
            className="input"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            placeholder="Type a hero name (optional)"
          />
        </div>
        <div className="grid">
          <div className="section-title">Pick a Level</div>
          <div className="choice-grid">
            {difficulties.map((d) => (
              <button
                key={d}
                className={`theme-card ${difficulty === d ? "selected" : ""}`}
                onClick={() => setDifficulty(d)}
                type="button"
              >
                <div className="theme-emoji">{difficultyEmoji(d)}</div>
                <div className="theme-name">{d}</div>
                <div className="theme-subtitle">{difficultyHint(d)}</div>
              </button>
            ))}
          </div>
        </div>
        <button className="button" onClick={startSession} disabled={loading}>
          {loading ? "Getting ready..." : "Let’s Play"}
        </button>
      </section>

      {roundData && (
        <section className="card grid play-card">
          <ConfettiBurst burstKey={burstKey} />
          <div className="badge">
            Round {roundData.round} / {roundData.maxRounds ?? 10}
          </div>
          <div className="scene-card">
            <div className="scene-emoji">{themeEmoji(theme)}</div>
            <div>
              <div className="scene-title">{roundData.scene.hero}</div>
              <div className="scene-meta">
                Location: {roundData.scene.location} · Mood: {roundData.scene.mood}
              </div>
              <div className="scene-meta">
                Goal: Solve {roundData.scene.conflict}
              </div>
              {roundData.inventory && roundData.inventory.length > 0 && (
                <div className="scene-meta">
                  Inventory: {roundData.inventory.join(", ")}
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
            Add your own line for bonus stars (optional)
            <input
              className="input"
              value={userLine}
              onChange={(e) => setUserLine(e.target.value)}
              placeholder="Example: Mia felt excited and brave!"
            />
          </label>
          <div>
            Target words: {roundData.targetWords.join(", ")}
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
  return "⭐";
}

function difficultyEmoji(level: string) {
  if (level === "Beginner") return "🌱";
  if (level === "Intermediate") return "⚡";
  if (level === "Advanced") return "🦉";
  return "⭐";
}

function difficultyHint(level: string) {
  if (level === "Beginner") return "Short sentences, simple words.";
  if (level === "Intermediate") return "More detail, longer sentences.";
  if (level === "Advanced") return "Richer language and twists.";
  return "";
}

function avatarEmoji(theme: string) {
  if (theme === "Magic Forest") return "🧚";
  if (theme === "Space School") return "🧑‍🚀";
  if (theme === "Ocean Quest") return "🐬";
  if (theme === "Dino Valley") return "🦖";
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
