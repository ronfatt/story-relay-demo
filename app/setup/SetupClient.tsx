"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ui } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";
import { WORLD_DATA, type DifficultyLevel } from "@/lib/world-data";

const DIFFICULTIES: DifficultyLevel[] = ["Beginner", "Intermediate", "Advanced"];

export default function SetupClient() {
  const { language } = useLanguage();
  const t = ui(language);

  const worldEntries = useMemo(() => Object.entries(WORLD_DATA), []);
  const [worldSlug, setWorldSlug] = useState(worldEntries[0]?.[0] ?? "");
  const world = WORLD_DATA[worldSlug];

  const branchEntries = useMemo(() => Object.entries(world?.childWorlds || {}), [world]);
  const [branchSlug, setBranchSlug] = useState(branchEntries[0]?.[0] ?? "");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Beginner");

  const selectedBranch = world?.childWorlds?.[branchSlug];

  return (
    <main className="grid dashboard-neon play-setup-only">
      <section className="card sectionCard grid setupCard">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <Link className="crumb" href="/dashboard/worlds">
            World Hub
          </Link>
          <span className="crumb-sep">&gt;</span>
          <span className="crumb current">Setup</span>
        </div>

        <h2>{t.letsStart}</h2>

        <div className="grid">
          <div className="section-title sectionTitle">{t.pickWorld}</div>
          <div className="choice-grid">
            {worldEntries.map(([slug, item]) => (
              <button
                key={slug}
                className={`theme-card optionCard worldCard ${worldSlug === slug ? "selected" : ""}`}
                onClick={() => {
                  setWorldSlug(slug);
                  const nextBranch = Object.keys(item.childWorlds)[0] ?? "";
                  setBranchSlug(nextBranch);
                  setDifficulty(item.childWorlds[nextBranch]?.difficulty || "Beginner");
                }}
                type="button"
              >
                <div className="world-cover">
                  <img className="world-cover-img" src={item.thumbnail} alt={`${item.title} cover`} />
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
            {branchEntries.map(([slug, item]) => (
              <button
                key={slug}
                className={`theme-card optionCard worldCard ${branchSlug === slug ? "selected" : ""}`}
                onClick={() => {
                  setBranchSlug(slug);
                  setDifficulty(item.difficulty);
                }}
                type="button"
              >
                <div className="world-cover">
                  <img className="world-cover-img" src={item.thumbnail} alt={`${item.title} cover`} />
                </div>
                <div className="theme-name">{item.title}</div>
                <div className="theme-subtitle">{item.description}</div>
                <div className="theme-lock unlockPill">{item.requiredStars} ⭐</div>
              </button>
            ))}
          </div>
        </div>

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
                <div className="theme-name">{level}</div>
                <div className="theme-subtitle">{difficultyHint(level, t)}</div>
              </button>
            ))}
          </div>
        </div>

        <Link
          className="button btnPrimary"
          href={
            worldSlug && branchSlug
              ? `/play?world=${encodeURIComponent(worldSlug)}&branch=${encodeURIComponent(branchSlug)}&difficulty=${encodeURIComponent(
                  difficulty.toLowerCase()
                )}`
              : "/setup"
          }
        >
          {language === "zh" ? "开始任务" : language === "ms" ? "Mula Misi" : "Start Mission"}
        </Link>

        {selectedBranch ? (
          <div className="badge">
            {world?.title} / {selectedBranch.title}
          </div>
        ) : null}
      </section>
    </main>
  );
}

function difficultyEmoji(level: DifficultyLevel) {
  if (level === "Beginner") return "🌱";
  if (level === "Intermediate") return "⚡";
  return "🦉";
}

function difficultyHint(level: DifficultyLevel, t: ReturnType<typeof ui>) {
  if (level === "Beginner") return t.levelHintBeginner;
  if (level === "Intermediate") return t.levelHintIntermediate;
  return t.levelHintAdvanced;
}
