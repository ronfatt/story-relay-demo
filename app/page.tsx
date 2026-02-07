"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const themes = [
    { name: "Magic Forest", emoji: "✨", preview: "Glowing paths and secret doors." },
    { name: "Space School", emoji: "🚀", preview: "Solve star mysteries with robots." },
    { name: "Ocean Quest", emoji: "🌊", preview: "Dive for pearls and sea clues." },
    { name: "Dino Valley", emoji: "🦕", preview: "Brave trails and friendly giants." }
  ];
  const today = useMemo(() => {
    const pick = themes[Math.floor(Math.random() * themes.length)];
    const hooks = [
      "A tiny clue is hiding nearby...",
      "A friendly guide is waiting.",
      "A surprise twist is coming!"
    ];
    return { ...pick, hook: hooks[Math.floor(Math.random() * hooks.length)] };
  }, []);

  return (
    <main className="grid">
      <section className="card hero-card grid">
        <div className="hero-header">
          <div>
            <div className="hero-kicker">StoryBah</div>
            <h1>Interactive English Story Relay</h1>
            <p>
              Jump into a magical adventure! Pick a theme, make fun choices,
              and earn shiny stars to unlock surprises.
            </p>
          </div>
          <div className="hero-orb sparkle">🎲</div>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-emoji">🧠</div>
            <div className="feature-title">Three skill levels</div>
            <div className="feature-text">Easy, medium, or big-kid brave.</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">🧩</div>
            <div className="feature-title">Make 10 choices</div>
            <div className="feature-text">Your picks shape the adventure.</div>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">⭐</div>
            <div className="feature-title">Stars & surprises</div>
            <div className="feature-text">Collect rewards each time you play.</div>
          </div>
        </div>
        <div className="grid">
          <div className="section-title">Name Your Hero</div>
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type a hero name (optional)"
          />
        </div>
        <div className="hero-actions">
          <Link className="button chest-button" href={`/play?name=${encodeURIComponent(name)}`}>
            <span className="chest">🧰</span>
            Play the Adventure
            <span className="sparkles">✨✨</span>
          </Link>
          <div className="badge">Safe, kid-friendly story play</div>
        </div>
      </section>

      <section className="card grid adventure-card">
        <div className="section-title">Today’s Adventure</div>
        <div className="adventure-row">
          <div className="adventure-emoji">{today.emoji}</div>
          <div>
            <div className="adventure-title">{today.name}</div>
            <div className="adventure-text">{today.preview}</div>
            <div className="adventure-hook">{today.hook}</div>
          </div>
          <Link
            className="button secondary"
            href={`/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
              today.name
            )}`}
          >
            Try This Story
          </Link>
        </div>
      </section>

      <section className="card grid carousel-card">
        <div className="section-title">Pick a World</div>
        <div className="carousel">
          {themes.map((theme) => (
            <Link
              key={theme.name}
              className="world-card"
              href={`/play?name=${encodeURIComponent(name)}&theme=${encodeURIComponent(
                theme.name
              )}`}
            >
              <div className="world-emoji">{theme.emoji}</div>
              <div className="world-name">{theme.name}</div>
              <div className="world-preview">{theme.preview}</div>
              <div className="world-cta">Play this world →</div>
            </Link>
          ))}
        </div>
      </section>
      <section className="card grid how-card">
        <h2>How to Play</h2>
        <div className="step-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-text">Pick a world and a level.</div>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-text">Choose A/B/C to guide the story.</div>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-text">Add your own line for bonus stars.</div>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-text">Finish 10 rounds to see your story.</div>
          </div>
        </div>
      </section>
    </main>
  );
}
