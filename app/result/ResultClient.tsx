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
  storyId?: string;
  lang?: Language;
};

export default function ResultClient({ sessionId, storyId, lang = "en" }: ResultClientProps) {
  const router = useRouter();
  const [data, setData] = useState<ResultPayload | null>(null);
  const t = ui(lang);

  useEffect(() => {
    if (storyId) {
      const cached = sessionStorage.getItem(`storybah:result:${storyId}`);
      if (cached) {
        setData(JSON.parse(cached));
        return;
      }
      fetch(`/api/stories/${storyId}`)
        .then((res) => res.json())
        .then((payload) => {
          if (!payload?.story) return;
          const story = payload.story;
          const score = story.score_json ? JSON.parse(story.score_json) : null;
          const feedback = story.feedback_json ? JSON.parse(story.feedback_json) : [];
          const suggestedVocab = story.suggested_vocab_json
            ? JSON.parse(story.suggested_vocab_json)
            : [];
          const inventory = story.inventory ? JSON.parse(story.inventory) : [];
          setData({
            title: story.title,
            fullStory: story.full_story,
            moral: story.moral,
            score: score || {
              creativity: 0,
              storyFlow: 0,
              englishLevelFit: 0,
              bonus: 0,
              totalStars: story.total_stars || 0
            },
            feedback: feedback.length ? feedback : [t.greatJob],
            suggestedVocab,
            totalStarsEarned: story.total_stars || 0,
            branch: story.branch,
            inventory
          });
        });
      return;
    }
    if (!sessionId) return;
    fetch("/api/session/finalize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, lang })
    })
      .then((res) => res.json())
      .then(setData);
  }, [sessionId, storyId, lang, t.greatJob]);

  if (!sessionId && !storyId) {
    return (
      <main className="card">
        <p>{t.noStoryFound}</p>
        <div className="grid">
          <button className="button" onClick={() => router.push(`/dashboard?lang=${lang}`)}>
            {t.backToDash}
          </button>
          <button className="button secondary" onClick={() => router.push(`/stories?lang=${lang}`)}>
            {t.viewRecords}
          </button>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="card">
        <p>{t.loadingStory}</p>
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
            onClick={() =>
              sessionId
                ? router.push(`/replay?sessionId=${sessionId}&lang=${lang}`)
                : router.push(`/stories?lang=${lang}`)
            }
          >
            {sessionId ? t.viewReplay : t.viewRecords}
          </button>
          <button className="button ghost" onClick={() => router.push(`/dashboard?lang=${lang}`)}>
            {t.backToDash}
          </button>
        </div>
      </section>
    </main>
  );
}
