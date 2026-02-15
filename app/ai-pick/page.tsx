import Link from "next/link";

export const dynamic = "force-dynamic";

const WORLD_SUGGESTIONS = [
  { slug: "magic-forest", title: "Magic Forest", tags: ["magic", "fairy", "forest", "rabbit"] },
  { slug: "ocean-quest", title: "Ocean Quest", tags: ["ocean", "sea", "water", "dolphin"] },
  { slug: "space-school", title: "Space School", tags: ["space", "robot", "star", "planet"] },
  { slug: "dino-valley", title: "Dino Valley", tags: ["dino", "dinosaur", "valley"] },
  { slug: "marvel-world", title: "Marvel World", tags: ["hero", "marvel", "mission", "city"] },
  {
    slug: "kpop-demon-hunter-world",
    title: "Kpop Demon Hunter World",
    tags: ["kpop", "demon", "music", "stage"]
  }
];

function suggestWorld(prompt: string) {
  const text = prompt.toLowerCase();
  for (const world of WORLD_SUGGESTIONS) {
    if (world.tags.some((tag) => text.includes(tag))) {
      return world;
    }
  }
  return WORLD_SUGGESTIONS[0];
}

export default function AIPickPage({
  searchParams
}: {
  searchParams?: { prompt?: string };
}) {
  const prompt = (searchParams?.prompt || "").trim();
  const suggestion = suggestWorld(prompt);

  return (
    <main className="grid ai-pick-page">
      <section className="card sectionCard grid ai-pick-card">
        <h1 className="ai-pick-title">AI Suggestion</h1>
        <p className="ai-pick-prompt">{prompt ? `“${prompt}”` : "No prompt provided."}</p>
        <p className="ai-pick-result">
          Recommended world: <strong>{suggestion.title}</strong>
        </p>
        <div className="hero-actions">
          <Link className="button btnPrimary" href={`/world/${suggestion.slug}`}>
            Enter {suggestion.title}
          </Link>
          <Link className="button secondary" href="/dashboard/worlds">
            Back to World Hub
          </Link>
        </div>
      </section>
    </main>
  );
}
