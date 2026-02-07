"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ui, type Language } from "@/lib/i18n";

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

type ReplayClientProps = {
  sessionId?: string;
  lang?: Language;
};

export default function ReplayClient({ sessionId, lang = "en" }: ReplayClientProps) {
  const router = useRouter();
  const [data, setData] = useState<HistoryPayload | null>(null);
  const t = ui(lang);

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/session/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, lang })
    })
      .then((res) => res.json())
      .then(setData);
  }, [sessionId, lang]);

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
        <h1>{t.replayTitle}</h1>
        <div className="badge">{t.theme}: {data.theme}</div>
        <div className="badge">{t.difficulty}: {data.difficulty}</div>
        <div className="grid">
          {data.history.map((item) => (
            <div className="card" key={`${item.round}-${item.choiceId}`}>
              <div className="badge">{t.round} {item.round}</div>
              <p>
                <strong>{t.choice}:</strong> {item.choiceId}. {item.choiceText}
              </p>
              {item.userLine && (
                <p>
                  <strong>{t.kidsLine}:</strong> {item.userLine}
                </p>
              )}
              <div className="story-block">{item.storySnapshot}</div>
            </div>
          ))}
        </div>
        <button className="button" onClick={() => router.push(`/play?lang=${lang}`)}>
          {t.playAgain}
        </button>
      </section>
    </main>
  );
}
