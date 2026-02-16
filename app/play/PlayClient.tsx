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
  initialTheme?: string;
  initialWorld?: string;
  initialBranch?: string;
  initialDifficulty?: string;
};

const DIFFICULTIES: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];
const WORLD_ENTRIES = Object.entries(WORLD_DATA);
const DEFAULT_WORLD_SLUG = WORLD_ENTRIES[0]?.[0] ?? "magic-forest";

export default function PlayClient({
  initialName = "",
  initialTheme,
  initialWorld = "",
  initialBranch = "",
  initialDifficulty = ""
}: PlayClientProps) {
  const router = useRouter();
  const { language: lang } = useLanguage();
  const t = ui(lang);

  const rawWorld = (initialWorld || initialTheme || "").trim();
  const rawBranch = initialBranch.trim();
  const hasBranchSelection = Boolean(rawWorld) && Boolean(rawBranch);
  const routeWorldSlug = resolveWorldSlug(rawWorld);
  const defaultWorldSlug = routeWorldSlug || DEFAULT_WORLD_SLUG;
  const routeBranchSlug = resolveBranchSlug(rawBranch, defaultWorldSlug);
  const launchMode = hasBranchSelection && Boolean(routeWorldSlug && routeBranchSlug);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [roundData, setRoundData] = useState<RoundPayload | null>(null);
  const [worldSlug, setWorldSlug] = useState(defaultWorldSlug);
  const [branchSlug, setBranchSlug] = useState<string>(
    routeBranchSlug || firstBranchSlug(defaultWorldSlug)
  );
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(
    normalizeDifficulty(
      initialDifficulty ||
        (routeBranchSlug
          ? WORLD_DATA[defaultWorldSlug]?.childWorlds?.[routeBranchSlug]?.difficulty
          : undefined)
    )
  );
  const [userLine, setUserLine] = useState("");
  const [heroName, setHeroName] = useState(initialName);
  const [burstKey, setBurstKey] = useState(0);
  const [totalStars, setTotalStars] = useState(0);

  const world = WORLD_DATA[worldSlug] ?? WORLD_DATA[DEFAULT_WORLD_SLUG];
  const branchEntries = useMemo(() => Object.entries(world.childWorlds), [world]);
  const branch = world.childWorlds[branchSlug];
  const branchLabel = branch?.title || formatBranchLabel(branchSlug);
  const branchDescription = branch?.description || getBranchDescription(lang, branchSlug, world.title);
  const branchIcon = branchEmoji(branchSlug);
  const branchLocked = branch ? totalStars < branch.requiredStars : false;

  useEffect(() => {
    if (!world.childWorlds[branchSlug]) {
      setBranchSlug(firstBranchSlug(worldSlug));
    }
  }, [worldSlug, branchSlug, world.childWorlds]);

  useEffect(() => {
    if (!branch) return;
    if (!initialDifficulty) {
      setDifficulty(branch.difficulty);
    }
  }, [branch, initialDifficulty]);

  useEffect(() => {
    setRoundData(null);
    setSessionId(null);
  }, [worldSlug, branchSlug, difficulty, heroName, lang]);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include", cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setTotalStars(data?.user?.total_stars ?? 0))
      .catch(() => setTotalStars(0));
  }, []);

  async function startSession() {
    if (!branch) {
      setError("Please choose a branch first.");
      return;
    }
    if (branchLocked) {
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
          worldSlug,
          branchName: branchSlug,
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
        const params = new URLSearchParams({ lang });
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
      <main className="grid">
        <section className="card grid play-card playPanel">
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
            <div className="scene-emoji metaIcon">{themeEmoji(world.title)}</div>
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
              <div className="avatar-emoji">{avatarEmoji(world.title)}</div>
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

  return (
    <main className="grid play-setup-only">
      <section className="card grid setupCard">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <Link className="crumb" href="/dashboard/worlds">
            World Hub
          </Link>
          {launchMode ? (
            <>
              <span className="crumb-sep">&gt;</span>
              <Link className="crumb" href={`/world/${worldSlug}`}>
                {world.title}
              </Link>
              <span className="crumb-sep">&gt;</span>
              <span className="crumb current">{branchLabel}</span>
            </>
          ) : null}
        </div>

        <h2>{launchMode ? `${world.title} – ${branchLabel}` : t.letsStart}</h2>
        {launchMode && branch && (
          <div className="branch-headline">
            <div className="branch-icon" aria-hidden="true">
              {branchIcon}
            </div>
            <div className="branch-copy">
              <div className="branch-title">
                {world.title} – {branchLabel}
              </div>
              <div className="branch-description">{branchDescription}</div>
            </div>
          </div>
        )}

        {!launchMode && (
          <>
            <div className="grid">
              <div className="section-title sectionTitle">{t.pickWorld}</div>
              <div className="choice-grid">
                {WORLD_ENTRIES.map(([slug, item]) => (
                  <button
                    key={slug}
                    className={`theme-card optionCard worldCard ${worldSlug === slug ? "selected" : ""}`}
                    onClick={() => setWorldSlug(slug)}
                    type="button"
                  >
                    <div className="world-cover">
                      <img className="world-cover-img" src={item.thumbnail} alt={`${item.title} cover`} />
                      <span className="world-cover-emoji">{themeEmoji(item.title)}</span>
                    </div>
                    <div className="theme-name">{item.title}</div>
                    <div className="theme-subtitle">{item.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid">
              <div className="section-title sectionTitle">Branch</div>
              <div className="choice-grid">
                {branchEntries.map(([slug, item]) => {
                  const locked = totalStars < item.requiredStars;
                  return (
                    <button
                      key={slug}
                      className={`theme-card optionCard worldCard ${branchSlug === slug ? "selected" : ""} ${locked ? "locked" : ""}`}
                      onClick={() => {
                        if (!locked) setBranchSlug(slug);
                      }}
                      type="button"
                    >
                      <div className="theme-name">{item.title}</div>
                      <div className="theme-subtitle">{item.description}</div>
                      <div className="theme-lock unlockPill">
                        {locked ? `${t.locked} · ${item.requiredStars}⭐` : `${item.difficulty} · ${item.requiredStars}⭐`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {launchMode && (
          <details className="optional-hero-panel">
            <summary>Optional Hero Name</summary>
            <input
              className="input"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder={t.heroPlaceholder}
            />
          </details>
        )}

        {!launchMode && (
          <div className="grid">
            <div className="section-title sectionTitle">{t.heroName}</div>
            <input
              className="input"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              placeholder={t.heroPlaceholder}
            />
          </div>
        )}

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

        {branchLocked && (
          <div className="error-banner">This branch unlocks at {branch?.requiredStars ?? 0}⭐.</div>
        )}
        {error && <div className="error-banner">{error}</div>}

        <button className="button btnPrimary" onClick={startSession} disabled={loading || !branch || branchLocked}>
          {loading ? t.gettingReady : lang === "zh" ? "开始任务" : lang === "ms" ? "Mula Misi" : "Start Mission"}
        </button>
      </section>
    </main>
  );
}

function firstBranchSlug(worldSlug: string) {
  const world = WORLD_DATA[worldSlug] ?? WORLD_DATA[DEFAULT_WORLD_SLUG];
  return Object.keys(world.childWorlds)[0] ?? "";
}

function resolveWorldSlug(value: string) {
  if (!value) return "";
  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, "-");
  if (WORLD_DATA[normalized]) return normalized;
  for (const [slug, world] of WORLD_ENTRIES) {
    if (world.title.toLowerCase() === value.trim().toLowerCase()) {
      return slug;
    }
  }
  return "";
}

function resolveBranchSlug(value: string, worldSlug: string) {
  if (!value) return "";
  const world = WORLD_DATA[worldSlug];
  if (!world) return "";
  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, "-");
  if (world.childWorlds[normalized]) return normalized;
  return "";
}

function normalizeDifficulty(value?: string) {
  const normalized = (value || "").trim().toLowerCase();
  if (normalized === "beginner") return "Beginner";
  if (normalized === "intermediate") return "Intermediate";
  if (normalized === "advanced") return "Advanced";
  return "Beginner";
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

function formatBranchLabel(value: string) {
  if (!value) return "Main Path";
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function branchEmoji(value: string) {
  const lowered = value.toLowerCase();
  if (!lowered) return "🧭";
  if (lowered.includes("shadow") || lowered.includes("demon")) return "🌒";
  if (lowered.includes("hero")) return "🦸";
  if (lowered.includes("ocean") || lowered.includes("wave")) return "🌊";
  if (lowered.includes("space") || lowered.includes("star")) return "🚀";
  return "🧭";
}

function getBranchDescription(lang: Language, branchName: string, worldName: string) {
  const branch = formatBranchLabel(branchName || "Main Path");
  if (lang === "zh") {
    return `你正在进入 ${worldName} 的「${branch}」分支。你的选择会影响故事走向。`;
  }
  if (lang === "ms") {
    return `Anda memasuki cabang "${branch}" untuk ${worldName}. Pilihan anda akan ubah cerita.`;
  }
  return `You are entering the ${branch} branch in ${worldName}. Your choices will shape this story path.`;
}
