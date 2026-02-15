import Link from "next/link";
import { notFound } from "next/navigation";
import { WORLD_DATA } from "@/lib/world-data";

export const dynamic = "force-dynamic";

export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const world = WORLD_DATA[slug];
  if (!world) {
    notFound();
  }

  const childWorldEntries = Object.entries(world.childWorlds);

  return (
    <main className="grid world-detail-page">
      <section className="card sectionCard grid world-detail-shell">
        <div className="world-detail-head">
          <img
            className="world-detail-cover"
            src={world.thumbnail}
            alt={`${world.title} cover`}
          />
          <div className="world-detail-copy">
            <div className="hero-kicker">WORLD</div>
            <h1 className="world-detail-title">{world.title}</h1>
            <p className="world-detail-description">{world.description}</p>
          </div>
        </div>

        <div className="world-detail-grid">
          {childWorldEntries.map(([childSlug, child]) => (
            <article className="world-child-card" key={childSlug}>
              <img className="world-child-cover" src={child.thumbnail} alt={`${child.title} cover`} />
              <h3 className="world-child-title">{child.title}</h3>
              <p className="world-child-description">{child.description}</p>
              <div className="world-child-meta">
                <span className="world-child-pill">{child.difficulty}</span>
                <span className="world-child-pill">{child.requiredStars} ⭐</span>
              </div>
              <Link
                className="world-child-enter"
                href={`/play?world=${encodeURIComponent(world.title)}&branch=${encodeURIComponent(
                  childSlug
                )}&difficulty=${encodeURIComponent(child.difficulty)}&lang=en`}
              >
                Enter
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
