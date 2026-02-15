import { redirect } from "next/navigation";

const WORLD_NAME_MAP: Record<string, string> = {
  "magic-forest": "Magic Forest",
  "ocean-quest": "Ocean Quest",
  "space-school": "Space School",
  "dino-valley": "Dino Valley",
  "marvel-world": "Marvel World",
  "kpop-demon-hunter-world": "Kpop Demon Hunter World"
};

export const dynamic = "force-dynamic";

export default async function WorldPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const theme = WORLD_NAME_MAP[slug];
  if (!theme) {
    redirect("/dashboard");
  }
  redirect(`/play?world=${encodeURIComponent(theme)}&lang=en&difficulty=Beginner`);
}
