"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ui, type Language } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";
import { WORLD_DATA, type DifficultyLevel } from "@/lib/world-data";

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
  initialWorld?: string;
  initialBranch?: string;
  initialDifficulty?: string;
};

const DIFFICULTIES: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];

export default function PlayClient({
  initialName = "",
  initialWorld = "",
  initialBranch = "",
  initialDifficulty = ""
}: PlayClientProps) {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const t = ui(lang);

  const normalizedWorldSlug = resolveWorldSlug(initialWorld);
  const normalizedBranchSlug = normalizedWorldSlug
    ? resolveBranchSlug(initialBranch, normalizedWorldSlug)
    : "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [roundData, setRoundData] = useState<RoundPayload | null>(null);
  const [userLine, setUserLine] = useState("");
  const [heroName, setHeroName] = useState(initialName);
  const [burstKey, setBurstKey] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => {
    const preset = toDifficulty(initialDifficulty);
    if (preset) return preset;
    if (normalizedWorldSlug && normalizedBranchSlug) {
      return WORLD_DATA[normalizedWorldSlug]?.childWorlds?.[normalizedBranchSlug]?.difficulty || "Beginner";
    }
    return "Beginner";
  });

  const world = normalizedWorldSlug ? WORLD_DATA[normalizedWorldSlug] : null;
  const branch = normalizedWorldSlug && normalizedBranchSlug
    ? WORLD_DATA[normalizedWorldSlug]?.childWorlds?.[normalizedBranchSlug]
    : null;

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setTotalStars(data?.user?.total_stars ?? 0))
      .catch(() => setTotalStars(0));
  }, []);

  useEffect(() => {
    if (roundData) return;
    if (!normalizedWorldSlug || !normalizedBranchSlug || !world || !branch) {
      router.replace("/setup");
      return;
    }

    const normalizedDifficulty = normalizeDifficultyParam(initialDifficulty);
    const nextParams = new URLSearchParams();
    nextParams.set("world", normalizedWorldSlug);
    nextParams.set("branch", normalizedBranchSlug);
    if (normalizedDifficulty) {
      nextParams.set("difficulty", normalizedDifficulty);
    }

    const currentParams = new URLSearchParams();
    if (initialWorld) currentParams.set("world", initialWorld);
    if (initialBranch) currentParams.set("branch", initialBranch);
    if (initialDifficulty) currentParams.set("difficulty", initialDifficulty);

    if (nextParams.toString() !== currentParams.toString()) {
      router.replace(`/play?${nextParams.toString()}`);
    }
  }, [
    branch,
    initialBranch,
    initialDifficulty,
    initialWorld,
    normalizedBranchSlug,
    normalizedWorldSlug,
    roundData,
    router,
    world
  ]);

  useEffect(() => {
    if (!branch) return;
    const preset = toDifficulty(initialDifficulty);
    if (preset) {
      setDifficulty(preset);
      return;
    }
    setDifficulty(branch.difficulty);
  }, [branch, initialDifficulty]);

  useEffect(() => {
    setRoundData(null);
    setSessionId(null);
  }, [normalizedWorldSlug, normalizedBranchSlug, difficulty, heroName, lang]);

  async function startSession() {
    if (!world || !branch || !normalizedWorldSlug || !normalizedBranchSlug) {
      setError("Missing world or branch.");
      return;
    }

    const locked = totalStars < branch.requiredStars;
    if (locked) {
      setError(`This branch unlocks at ${branch.requiredStars}⭐.`);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          worldName: world.title,
          worldSlug: normalizedWorldSlug,
          branchName: normalizedBranchSlug,
          difficulty,
          heroName,
          lang
        })
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
        const params = new URLSearchParams();
        if (data.storyId) {
          params.set("storyId", data.storyId);
          if (data.result) {
            sessionStorage.setItem(`storybah:result:${data.storyId}`, JSON.stringify(data.result));
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

  if (roundData) {
    return (
      <main className="grid dashboard-neon play-mode">
        <section className="card sectionCard grid play-card playPanel">
          <ConfettiBurst burstKey={burstKey} />
          {roundData.maxRounds && roundData.round >= roundData.maxRounds && (
            <div className="last-round-banner">
              <strong>{t.lastRoundTitle}</strong> {t.lastRoundHint}
            </div>
          )}
          <div className="badge">
            {t.round} {roundData.round} / {roundData.maxRounds ?? 10}
          </div>
          <div className="scene-card missionMeta">
            <div className="scene-emoji metaIcon">{themeEmoji(world?.title || "")}</div>
            <div className="metaLines">
              <div className="scene-title value">{roundData.scene.hero}</div>
              <div className="scene-meta">
                <span className="label">{t.location}:</span> <span className="value">{roundData.scene.location}</span>{" "}
                <span className="label">· {t.mood}:</span> <span className="value">{roundData.scene.mood}</span>
              </div>
              <div className="scene-meta">
                <span className="label">{t.goal}:</span> <span className="value">{roundData.scene.conflict}</span>
              </div>
              {roundData.inventory && roundData.inventory.length > 0 && (
                <div className="scene-meta">
                  {t.inventoryLabel}: {roundData.inventory.join(", ")}
                </div>
              )}
            </div>
            <div className="avatar-card">
              <div className="avatar-emoji">{avatarEmoji(world?.title || "")}</div>
              <div className="avatar-name">{roundData.scene.hero}</div>
            </div>
          </div>
          <div className="story-block story-animate storyTextBox" key={roundData.round}>
            {roundData.storySoFar}
          </div>
          <div>
            <strong>{roundData.question}</strong>
          </div>
          <div className="choice-grid">
            {roundData.choices.map((choice) => (
              <button
                key={choice.id}
                className="choice-card choiceCard"
                onClick={() => submitChoice(choice.id)}
                disabled={loading}
              >
                <div className="choice-letter choiceBadge">{choice.id}</div>
                <div className="choice-text choiceText">{choice.text}</div>
              </button>
            ))}
          </div>
          <label>
            {t.addLine}
            <input
              className="input userLineInput"
              value={userLine}
              onChange={(e) => setUserLine(e.target.value)}
              placeholder="Example: Mia felt excited and brave!"
            />
          </label>
          <div className={`bonus-hint tipBar ${userLine.trim().length > 0 ? "ready" : ""}`}>
            {userLine.trim().length > 0 ? t.bonusReady : t.bonusTip}
          </div>
          <div>
            {t.targetWords}: {roundData.targetWords.join(", ")}
          </div>
        </section>
      </main>
    );
  }

  if (!world || !branch || !normalizedWorldSlug || !normalizedBranchSlug) {
    return (
      <main className="grid dashboard-neon play-mode">
        <section className="card sectionCard grid play-card playPanel">
          <div className="badge">Redirecting to setup...</div>
        </section>
      </main>
    );
  }

  const branchLocked = totalStars < branch.requiredStars;
  const normalizedDifficulty = (difficulty || "Beginner").toLowerCase();

  return (
    <main className="grid dashboard-neon play-mode">
      <section className="card sectionCard grid setupCard playPanel">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <Link className="crumb" href="/dashboard/worlds">
            World Hub
          </Link>
          <span className="crumb-sep">&gt;</span>
          <Link className="crumb" href={`/world/${normalizedWorldSlug}`}>
            {world.title}
          </Link>
          <span className="crumb-sep">&gt;</span>
          <span className="crumb current">{branch.title}</span>
        </div>

        <div className="branch-headline">
          <img className="world-detail-cover" src={branch.thumbnail} alt={`${branch.title} cover`} />
          <div className="branch-copy">
            <div className="hero-kicker">BRANCH</div>
            <h2>
              {world.title} – {branch.title}
            </h2>
            <div className="branch-description">{branch.description}</div>
            <div className="world-child-meta">
              <span className="world-child-pill">{branch.requiredStars} ⭐</span>
              <span className="world-child-pill">{branch.difficulty}</span>
            </div>
          </div>
        </div>

        <details className="optional-hero-panel">
          <summary>Optional Hero Name</summary>
          <input
            className="input"
            value={heroName}
            onChange={(e) => setHeroName(e.target.value)}
            placeholder={t.heroPlaceholder}
          />
        </details>

        <div className="grid">
          <div className="section-title sectionTitle">{t.pickLevel}</div>
          <div className="choice-grid">
            {DIFFICULTIES.map((level) => (
              <button
                key={level}
                className={`theme-card optionCard levelCard ${level.toLowerCase()} ${difficulty === level ? "selected" : ""}`}
                onClick={() => setDifficulty(level)}
                type="button"
              >
                <div className="theme-emoji">{difficultyEmoji(level)}</div>
                <div className="theme-name">{difficultyLabel(level, t)}</div>
                <div className="theme-subtitle">{difficultyHint(level, t)}</div>
              </button>
            ))}
          </div>
        </div>

        {branchLocked && <div className="error-banner">This branch unlocks at {branch.requiredStars}⭐.</div>}
        {error && <div className="error-banner">{error}</div>}

        <button
          className="button btnPrimary"
          onClick={startSession}
          disabled={loading || branchLocked}
          type="button"
        >
          {loading
            ? t.gettingReady
            : lang === "zh"
              ? "开始任务"
              : lang === "ms"
                ? "Mula Misi"
                : "Start Mission"}
        </button>

        <Link
          href={`/play?world=${encodeURIComponent(normalizedWorldSlug)}&branch=${encodeURIComponent(
            normalizedBranchSlug
          )}&difficulty=${encodeURIComponent(normalizedDifficulty)}`}
          className="hidden"
          aria-hidden="true"
        >
          normalized-route
        </Link>
      </section>
    </main>
  );
}

function resolveWorldSlug(value: string) {
  if (!value) return "";
  const normalized = slugify(value);
  if (WORLD_DATA[normalized]) return normalized;
  for (const [slug, world] of Object.entries(WORLD_DATA)) {
    if (slugify(world.title) === normalized) {
      return slug;
    }
  }
  return "";
}

function resolveBranchSlug(value: string, worldSlug: string) {
  if (!value || !worldSlug) return "";
  const world = WORLD_DATA[worldSlug];
  if (!world) return "";
  const normalized = slugify(value);
  if (world.childWorlds[normalized]) return normalized;
  for (const [slug, branch] of Object.entries(world.childWorlds)) {
    if (slugify(branch.title) === normalized) {
      return slug;
    }
  }
  return "";
}

function slugify(value: string) {
  return value.trim().toLowerCase().replace(/[_\s]+/g, "-");
}

function normalizeDifficultyParam(value?: string) {
  const difficulty = toDifficulty(value);
  if (!difficulty) return "";
  return difficulty.toLowerCase();
}

function toDifficulty(value?: string): DifficultyLevel | null {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized === "beginner") return "Beginner";
  if (normalized === "intermediate") return "Intermediate";
  if (normalized === "advanced") return "Advanced";
  return null;
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
