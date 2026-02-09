"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ui, type Language, LANG_LABELS } from "@/lib/i18n";

const themes = [
  { name: "Magic Forest", unlock: 0 },
  { name: "Space School", unlock: 0 },
  { name: "Ocean Quest", unlock: 0 },
  { name: "Dino Valley", unlock: 0 },
  { name: "Fairy Circus", unlock: 0 },
  { name: "Pirate Cove", unlock: 0 },
  { name: "Sky Castle", unlock: 50 },
  { name: "Robot City", unlock: 50 },
  { name: "Candy Kingdom", unlock: 50 },
  { name: "Toy Town", unlock: 50 },
  { name: "Rainbow Ranch", unlock: 50 },
  { name: "Jungle Rescue", unlock: 80 },
  { name: "Ice Mountain", unlock: 80 },
  { name: "Desert Caravan", unlock: 120 },
  { name: "Marvel World", unlock: 120 },
  { name: "DC World", unlock: 120 },
  { name: "Kpop Demon Hunter World", unlock: 120 }
];
const difficulties = ["Beginner", "Intermediate", "Advanced"];
const themeDescriptions: Record<Language, Record<string, string>> = {
  en: {
    "Magic Forest": "Whispering trees and glow trails.",
    "Space School": "Robots, stars, and secret doors.",
    "Ocean Quest": "Dolphins, shells, and sea caves.",
    "Dino Valley": "Friendly giants and hidden paths.",
    "Fairy Circus": "Tiny wings and a twinkling big top.",
    "Pirate Cove": "Treasure maps and gentle waves.",
    "Sky Castle": "Cloud bridges and sky bells.",
    "Robot City": "Neon lights and helper bots.",
    "Candy Kingdom": "Sweet streets and sparkle clues.",
    "Toy Town": "Playful toys and secret switches.",
    "Rainbow Ranch": "Colorful stables and kind ponies.",
    "Jungle Rescue": "Drums, vines, and rescue calls.",
    "Ice Mountain": "Crystal caves and snow clues.",
    "Desert Caravan": "Golden dunes and oasis secrets.",
    "Marvel World": "Hero masks and mission alarms.",
    "DC World": "City lights and brave signals.",
    "Kpop Demon Hunter World": "Bright stages and hidden shadows."
  },
  zh: {
    "Magic Forest": "会低语的树和发光小路。",
    "Space School": "机器人、星星、秘密门。",
    "Ocean Quest": "海豚、贝壳、海底洞。",
    "Dino Valley": "友善巨兽和隐藏小路。",
    "Fairy Circus": "小翅膀与闪亮帐篷。",
    "Pirate Cove": "宝藏地图与轻浪。",
    "Sky Castle": "云桥与天空铃声。",
    "Robot City": "霓虹灯与小助手。",
    "Candy Kingdom": "甜甜街道与闪光线索。",
    "Toy Town": "玩具城与秘密机关。",
    "Rainbow Ranch": "彩虹牧场与可爱小马。",
    "Jungle Rescue": "鼓声、藤蔓与救援。",
    "Ice Mountain": "水晶洞与雪中线索。",
    "Desert Caravan": "金色沙丘与绿洲秘密。",
    "Marvel World": "英雄面具与任务警报。",
    "DC World": "城市灯光与勇敢信号。",
    "Kpop Demon Hunter World": "闪亮舞台与隐藏影子。"
  },
  ms: {
    "Magic Forest": "Pokok berbisik dan laluan bercahaya.",
    "Space School": "Robot, bintang, dan pintu rahsia.",
    "Ocean Quest": "Lumba-lumba, cangkerang, gua laut.",
    "Dino Valley": "Gergasi mesra dan laluan tersembunyi.",
    "Fairy Circus": "Sayap kecil dan khemah berkilau.",
    "Pirate Cove": "Peta harta dan ombak lembut.",
    "Sky Castle": "Jambatan awan dan loceng langit.",
    "Robot City": "Lampu neon dan bot pembantu.",
    "Candy Kingdom": "Jalan manis dan petunjuk berkilau.",
    "Toy Town": "Mainan comel dan suis rahsia.",
    "Rainbow Ranch": "Ladang pelangi dan kuda poni comel.",
    "Jungle Rescue": "Gendang, pokok anggur, panggilan selamat.",
    "Ice Mountain": "Gua kristal dan petunjuk salji.",
    "Desert Caravan": "Gurun keemasan dan rahsia oasis.",
    "Marvel World": "Topeng wira dan amaran misi.",
    "DC World": "Lampu kota dan isyarat berani.",
    "Kpop Demon Hunter World": "Pentas cerah dan bayang tersembunyi."
  }
};

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
    initialTheme && themes.some((t) => t.name === initialTheme)
      ? initialTheme
      : themes[0].name
  );
  const [difficulty, setDifficulty] = useState(difficulties[0]);
  const [userLine, setUserLine] = useState("");
  const [heroName, setHeroName] = useState(initialName);
  const [burstKey, setBurstKey] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const t = ui(lang);
  const bonusReady = userLine.trim().length > 0;

  useEffect(() => {
    setRoundData(null);
    setSessionId(null);
  }, [theme, difficulty, heroName, lang]);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setTotalStars(data?.user?.total_stars ?? 0))
      .catch(() => setTotalStars(0));
  }, []);

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
        const params = new URLSearchParams({ lang });
        if (data.storyId) {
          params.set("storyId", data.storyId);
          if (data.result) {
            sessionStorage.setItem(
              `storybah:result:${data.storyId}`,
              JSON.stringify(data.result)
            );
          }
        } else {
          params.set("sessionId", sessionId);
        }
        router.push(`/result?${params.toString()}`);
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
            {themes.map((item) => {
              const locked = totalStars < item.unlock;
              return (
              <button
                key={item.name}
                className={`theme-card ${theme === item.name ? "selected" : ""} ${
                  locked ? "locked" : ""
                }`}
                onClick={() => !locked && setTheme(item.name)}
                type="button"
                disabled={locked}
              >
                <div className="theme-emoji">{themeEmoji(item.name)}</div>
                <div className="theme-name">{item.name}</div>
                <div className="theme-subtitle">
                  {themeDescriptions[lang]?.[item.name] || "Tap to explore"}
                </div>
                {locked && (
                  <div className="theme-lock">
                    {t.locked} · {t.unlockNext} {item.unlock} ⭐
                  </div>
                )}
              </button>
            )})}
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
          {roundData.maxRounds && roundData.round >= roundData.maxRounds && (
            <div className="last-round-banner">
              <strong>{t.lastRoundTitle}</strong> {t.lastRoundHint}
            </div>
          )}
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
          <div className={`bonus-hint ${bonusReady ? "ready" : ""}`}>
            {bonusReady ? t.bonusReady : t.bonusTip}
          </div>
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
  if (theme === "Fairy Circus") return "🎪";
  if (theme === "Pirate Cove") return "🏴‍☠️";
  if (theme === "Sky Castle") return "🏰";
  if (theme === "Robot City") return "🤖";
  if (theme === "Candy Kingdom") return "🍭";
  if (theme === "Toy Town") return "🧸";
  if (theme === "Rainbow Ranch") return "🌈";
  if (theme === "Jungle Rescue") return "🌿";
  if (theme === "Ice Mountain") return "❄️";
  if (theme === "Desert Caravan") return "🏜️";
  if (theme === "Marvel World") return "🦸";
  if (theme === "DC World") return "🛡️";
  if (theme === "Kpop Demon Hunter World") return "🎤";
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
