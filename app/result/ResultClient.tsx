"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ui, type Language } from "@/lib/i18n";

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

type ResultClientProps = {
  sessionId?: string;
  lang?: Language;
};

export default function ResultClient({ sessionId, lang = "en" }: ResultClientProps) {
  const router = useRouter();
  const [data, setData] = useState<ResultPayload | null>(null);
  const t = ui(lang);

  useEffect(() => {
    if (!sessionId) return;
    fetch("/api/session/finalize", {
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
        <p>Loading your story...</p>
      </main>
    );
  }

  return (
    <main className="grid">
      <section className="card grid">
        <h1>{data.title}</h1>
        <div className="story-block">{data.fullStory}</div>
        <div><strong>{t.storyLesson}:</strong> {data.moral}</div>
        <div className="grid">
          <div className="badge">{t.creativity}: {data.score.creativity} ⭐</div>
          <div className="badge">{t.storyFlow}: {data.score.storyFlow} ⭐</div>
          <div className="badge">{t.languageFit}: {data.score.englishLevelFit} ⭐</div>
          <div className="badge">{t.bonusLabel}: {data.score.bonus} ⭐</div>
          <div className="badge">{t.totalLabel}: {data.score.totalStars} ⭐</div>
          {data.branch && <div className="badge">{t.endingPath}: {data.branch}</div>}
        </div>
        {data.inventory && data.inventory.length > 0 && (
          <div>
            <strong>{t.inventoryLabel}</strong>
            <div className="story-block">{data.inventory.join(", ")}</div>
          </div>
        )}
        <div>
          <strong>{t.greatJob}</strong>
          <ul>
            {data.feedback.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div>
          <strong>{t.suggestedVocab}</strong>
          <ul>
            {data.suggestedVocab.map((item) => (
              <li key={item.word}>
                {item.word} - {item.meaningEn} ({item.example})
              </li>
            ))}
          </ul>
        </div>
        <div className="grid">
          <button className="button" onClick={() => router.push(`/play?lang=${lang}`)}>
            {t.playAgain}
          </button>
          <button
            className="button secondary"
            onClick={() => router.push(`/replay?sessionId=${sessionId}&lang=${lang}`)}
          >
            {t.viewReplay}
          </button>
        </div>
      </section>
    </main>
  );
}
