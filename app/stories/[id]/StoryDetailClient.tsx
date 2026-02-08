"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ui, type Language } from "@/lib/i18n";

type StoryDetail = {
  id: string;
  theme: string;
  difficulty: string;
  lang: string;
  title: string;
  full_story: string;
  moral: string;
  total_stars: number;
  created_at: string;
};

export default function StoryDetailClient() {
  const params = useParams();
  const [lang] = useState<Language>("en");
  const t = ui(lang);
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const id = String(params?.id || "");
    fetch(`/api/stories/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("not_found");
        const data = await res.json();
        setStory(data.story);
      })
      .catch(() => setError(t.needLogin));
  }, [params, t.needLogin]);

  if (error) {
    return <div className="error-banner">{error}</div>;
  }
  if (!story) {
    return <div className="badge">{t.gettingReady}</div>;
  }
  return (
    <section className="card grid">
      <h2>{story.title}</h2>
      <div className="badge">
        {story.theme} · {story.difficulty} · ⭐ {story.total_stars}
      </div>
      <div className="story-block">{story.full_story}</div>
      <div className="badge">{story.moral}</div>
    </section>
  );
}
