import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { WORLD_DATA } from "@/lib/world-data";
import { getSession, getUserById } from "@/lib/auth";

export const dynamic = "force-dynamic";

const WORLD_NEON: Record<string, string> = {
  "magic-forest": "#22ffaa",
  "ocean-quest": "#3ee8ff",
  "space-school": "#6c4bff",
  "dino-valley": "#7aff5b",
  "marvel-world": "#ff7a3e",
  "kpop-demon-hunter-world": "#ff2e88"
};

export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const world = WORLD_DATA[slug];
  if (!world) {
    notFound();
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sb_session")?.value;
  let totalStars = 0;
  if (sessionId) {
    const session = await getSession(sessionId);
    if (session && new Date(session.expires_at).getTime() > Date.now()) {
      const user = await getUserById(session.user_id);
      totalStars = user?.total_stars ?? 0;
    }
  }

  const worldNeon = WORLD_NEON[slug] || "#3ee8ff";
  const childWorldEntries = Object.entries(world.childWorlds);

  return (
    <main className="grid world-detail-page">
      <section className="card sectionCard grid world-detail-shell">
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <Link className="crumb" href="/dashboard/worlds">
            World Hub
          </Link>
          <span className="crumb-sep">&gt;</span>
          <span className="crumb current">{world.title}</span>
          <span className="crumb-sep">&gt;</span>
          <span className="crumb current">Child Worlds</span>
        </div>

        <div className="world-detail-head">
          <img className="world-detail-cover" src={world.thumbnail} alt={`${world.title} cover`} />
          <div className="world-detail-copy">
            <div className="hero-kicker">WORLD</div>
            <h1 className="world-detail-title">{world.title}</h1>
            <p className="world-detail-description">{world.description}</p>
          </div>
        </div>

        <div className="world-detail-grid">
          {childWorldEntries.map(([childSlug, child]) => {
            const locked = totalStars < child.requiredStars;
            return (
              <article
                className={`world-child-card ${locked ? "locked" : ""}`}
                key={childSlug}
                style={{ ["--world-neon" as string]: worldNeon }}
              >
                <img className="world-child-cover" src={child.thumbnail} alt={`${child.title} cover`} />
                {locked ? <span className="lockBadge">LOCKED</span> : null}
                <h3 className="world-child-title">{child.title}</h3>
                <p className="world-child-description">{child.description}</p>
                <div className="world-child-meta">
                  <span className="world-child-pill">{child.difficulty}</span>
                  <span className="world-child-pill">{child.requiredStars} ⭐</span>
                </div>
                {locked ? (
                  <span className="world-child-enter disabled">Need {child.requiredStars}⭐</span>
                ) : (
                  <Link
                    className="world-child-enter enterButton"
                    href={`/play?world=${encodeURIComponent(slug)}&branch=${encodeURIComponent(
                      childSlug
                    )}&difficulty=${encodeURIComponent(child.difficulty.toLowerCase())}`}
                  >
                    Enter
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
