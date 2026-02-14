import fs from "node:fs/promises";
import path from "node:path";

export type WorldCoverDef = {
  name: string;
  slug: string;
  prompt: string;
};

export const WORLD_COVER_DEFS: WorldCoverDef[] = [
  {
    name: "Magic Forest",
    slug: "magic-forest",
    prompt:
      "Children's storybook world cover art, magical forest with glowing paths, tiny friendly lights, vibrant colors, safe and cheerful, no text, no logo."
  },
  {
    name: "Space School",
    slug: "space-school",
    prompt:
      "Children's storybook world cover art, friendly futuristic space school with stars and cute robots, colorful and playful, safe, no text, no logo."
  },
  {
    name: "Ocean Quest",
    slug: "ocean-quest",
    prompt:
      "Children's storybook world cover art, bright underwater adventure with coral reefs, pearl clues and gentle sea creatures, safe, no text, no logo."
  },
  {
    name: "Dino Valley",
    slug: "dino-valley",
    prompt:
      "Children's storybook world cover art, sunny valley with friendly dinosaurs and fun adventure trails, colorful and non-threatening, no text, no logo."
  },
  {
    name: "Fairy Circus",
    slug: "fairy-circus",
    prompt:
      "Children's storybook world cover art, whimsical fairy circus with tiny tents, sparkles and glowing decorations, joyful and safe, no text, no logo."
  },
  {
    name: "Pirate Cove",
    slug: "pirate-cove",
    prompt:
      "Children's storybook world cover art, playful pirate cove with treasure map clues, warm sunset and calm waves, family-friendly, no text, no logo."
  },
  {
    name: "Sky Castle",
    slug: "sky-castle",
    prompt:
      "Children's storybook world cover art, floating sky castle with cloud bridges and pastel skies, dreamy and safe, no text, no logo."
  },
  {
    name: "Robot City",
    slug: "robot-city",
    prompt:
      "Children's storybook world cover art, neon robot city with cute helper bots and glowing streets, playful and safe, no text, no logo."
  },
  {
    name: "Candy Kingdom",
    slug: "candy-kingdom",
    prompt:
      "Children's storybook world cover art, candy kingdom with sweet paths, colorful lollipops and sparkling castles, cheerful and safe, no text, no logo."
  },
  {
    name: "Toy Town",
    slug: "toy-town",
    prompt:
      "Children's storybook world cover art, toy town with playful buildings, blocks and friendly toy characters, bright and safe, no text, no logo."
  },
  {
    name: "Rainbow Ranch",
    slug: "rainbow-ranch",
    prompt:
      "Children's storybook world cover art, rainbow ranch with colorful stables and kind ponies in open fields, positive and safe, no text, no logo."
  },
  {
    name: "Jungle Rescue",
    slug: "jungle-rescue",
    prompt:
      "Children's storybook world cover art, lush jungle rescue mission with vines, paths and friendly animals, adventurous but safe, no text, no logo."
  },
  {
    name: "Ice Mountain",
    slug: "ice-mountain",
    prompt:
      "Children's storybook world cover art, crystal ice mountain with glowing caves and soft blue light, magical and safe, no text, no logo."
  },
  {
    name: "Desert Caravan",
    slug: "desert-caravan",
    prompt:
      "Children's storybook world cover art, golden desert caravan with oasis, dunes and friendly travel scene, warm and safe, no text, no logo."
  },
  {
    name: "Marvel World",
    slug: "marvel-world",
    prompt:
      "Children's storybook world cover art, comic-style superhero city adventure with masks and mission lights, original characters only, no brands, no text, no logo."
  },
  {
    name: "DC World",
    slug: "dc-world",
    prompt:
      "Children's storybook world cover art, comic-style night city with brave shield-themed hero vibes, original characters only, no brands, no text, no logo."
  },
  {
    name: "Kpop Demon Hunter World",
    slug: "kpop-demon-hunter-world",
    prompt:
      "Children's storybook world cover art, neon concert stage with heroic performers and shadow challenge atmosphere, original characters only, no brands, no text, no logo."
  }
];

async function generateImage(apiKey: string, prompt: string) {
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${text}`);
  }

  const data = (await res.json()) as { data?: Array<{ b64_json?: string }> };
  const base64 = data?.data?.[0]?.b64_json;
  if (!base64) throw new Error("No image base64 returned");
  return Buffer.from(base64, "base64");
}

export async function generateWorldCovers(options: {
  apiKey: string;
  outDir?: string;
  force?: boolean;
  delayMs?: number;
  limit?: number;
}) {
  const outDir = options.outDir || path.resolve(process.cwd(), "public", "worlds");
  const force = Boolean(options.force);
  const delayMs = options.delayMs ?? 500;
  const limit = options.limit ?? WORLD_COVER_DEFS.length;
  const results: Array<{ slug: string; status: "generated" | "skipped" | "error"; error?: string }> = [];

  await fs.mkdir(outDir, { recursive: true });
  const worlds = WORLD_COVER_DEFS.slice(0, limit);

  for (const world of worlds) {
    const filePath = path.join(outDir, `${world.slug}.png`);
    const exists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (exists && !force) {
      results.push({ slug: world.slug, status: "skipped" });
      continue;
    }

    try {
      const png = await generateImage(options.apiKey, world.prompt);
      await fs.writeFile(filePath, png);
      results.push({ slug: world.slug, status: "generated" });
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    } catch (err) {
      results.push({
        slug: world.slug,
        status: "error",
        error: err instanceof Error ? err.message : "Unknown error"
      });
    }
  }

  return {
    total: worlds.length,
    generated: results.filter((r) => r.status === "generated").length,
    skipped: results.filter((r) => r.status === "skipped").length,
    errors: results.filter((r) => r.status === "error").length,
    results
  };
}
