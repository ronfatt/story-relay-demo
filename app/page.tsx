"use client";

import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");

  return (
    <main className="grid">
      <section className="card hero-card grid">
        <div className="hero-header">
          <div>
            <div className="hero-kicker">Story Relay</div>
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
          <Link className="button" href={`/play?name=${encodeURIComponent(name)}`}>
            Play the Adventure
          </Link>
          <div className="badge">Safe, kid-friendly story play</div>
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
