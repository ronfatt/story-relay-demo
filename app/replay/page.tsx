"use client";

export const dynamic = "force-dynamic";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type HistoryItem = {
  round: number;
  choiceId: string;
  choiceText: string;
  userLine: string;
  storySnapshot: string;
};

type HistoryPayload = {
  sessionId: string;
  theme: string;
  difficulty: string;
  history: HistoryItem[];
};

export default function ReplayPage() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("sessionId");
  const [data, setData] = useState<HistoryPayload | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/session/history", {
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
        <p>Loading the story timeline...</p>
      </main>
    );
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h1>Story Replay</h1>
        <div className="badge">Theme: {data.theme}</div>
        <div className="badge">Difficulty: {data.difficulty}</div>
        <div className="grid">
          {data.history.map((item) => (
            <div className="card" key={`${item.round}-${item.choiceId}`}>
              <div className="badge">Round {item.round}</div>
              <p>
                <strong>Choice:</strong> {item.choiceId}. {item.choiceText}
              </p>
              {item.userLine && (
                <p>
                  <strong>Kid's line:</strong> {item.userLine}
                </p>
              )}
              <div className="story-block">{item.storySnapshot}</div>
            </div>
          ))}
        </div>
        <button className="button" onClick={() => router.push("/play")}>Play Again</button>
      </section>
    </main>
  );
}
