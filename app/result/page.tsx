"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Score = {
  creativity: number;
  storyFlow: number;
  englishLevelFit: number;
  bonus: number;
  totalStars: number;
};

type ResultPayload = {
  title: string;
  fullStory: string;
  moral: string;
  score: Score;
  feedback: string[];
  suggestedVocab: { word: string; meaningEn: string; example: string }[];
  totalStarsEarned: number;
  branch?: string;
  inventory?: string[];
};

export default function ResultPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("sessionId");
  const [data, setData] = useState<ResultPayload | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/session/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId })
    })
      .then((res) => res.json())
      .then(setData);
  }, [sessionId]);

  if (!sessionId) {
    return (
      <main className="card">
        <p>No session found.</p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="card">
        <p>Loading your story...</p>
      </main>
    );
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h1>{data.title}</h1>
        <div className="story-block">{data.fullStory}</div>
        <div><strong>Story Lesson:</strong> {data.moral}</div>
        <div className="grid">
          <div className="badge">Creativity: {data.score.creativity} ⭐</div>
          <div className="badge">Story Flow: {data.score.storyFlow} ⭐</div>
          <div className="badge">English Fit: {data.score.englishLevelFit} ⭐</div>
          <div className="badge">Bonus: {data.score.bonus} ⭐</div>
          <div className="badge">Total: {data.score.totalStars} ⭐</div>
          {data.branch && <div className="badge">Ending Path: {data.branch}</div>}
        </div>
        {data.inventory && data.inventory.length > 0 && (
          <div>
            <strong>Inventory</strong>
            <div className="story-block">{data.inventory.join(", ")}</div>
          </div>
        )}
        <div>
          <strong>Great Job!</strong>
          <ul>
            {data.feedback.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>Suggested Vocabulary</strong>
          <ul>
            {data.suggestedVocab.map((item) => (
              <li key={item.word}>
                {item.word} - {item.meaningEn} ({item.example})
              </li>
            ))}
          </ul>
        </div>
        <div className="grid">
          <button className="button" onClick={() => router.push("/play")}>Play Again</button>
          <button
            className="button secondary"
            onClick={() => router.push(`/replay?sessionId=${sessionId}`)}
          >
            View Story Replay
          </button>
        </div>
      </section>
    </main>
  );
}
