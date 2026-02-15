"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const TIPS = [
  "Tell me your story idea in 1 sentence.",
  "I can recommend the best world for your level.",
  "Want a funny, scary, or heroic story today?",
  "Type a hero name and I'll build a quest."
];

export default function AILivePanel() {
  const router = useRouter();
  const [tipIndex, setTipIndex] = useState(0);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const activeTip = useMemo(() => TIPS[tipIndex], [tipIndex]);

  function onAskAi() {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    router.push(`/ai-pick?prompt=${encodeURIComponent(trimmed)}`);
  }

  return (
    <section className="ai-live-panel" aria-label="AI live panel">
      <div className="ai-live-avatar" aria-hidden="true">
        🤖
      </div>
      <div className="ai-live-center">
        <div className="ai-live-label">AI Live</div>
        <div className="ai-live-tip">{activeTip}</div>
        <div className="ai-live-input-row">
          <input
            className="ai-live-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., A brave rabbit in a magic forest..."
            onKeyDown={(e) => {
              if (e.key === "Enter") onAskAi();
            }}
          />
          <button className="ai-live-cta" type="button" onClick={onAskAi}>
            Ask AI
          </button>
        </div>
      </div>
    </section>
  );
}
