import { generateWorldCovers } from "../lib/world-covers.ts";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("Missing OPENAI_API_KEY");
  process.exit(1);
}

const FORCE = process.argv.includes("--force");

async function main() {
  const result = await generateWorldCovers({
    apiKey: API_KEY,
    force: FORCE,
    delayMs: 800
  });
  for (const row of result.results) {
    if (row.status === "generated") console.log(`Generated: ${row.slug}.png`);
    if (row.status === "skipped") console.log(`Skipped: ${row.slug}.png`);
    if (row.status === "error") console.log(`Error: ${row.slug}.png -> ${row.error}`);
  }
  console.log(
    `Done. generated=${result.generated}, skipped=${result.skipped}, errors=${result.errors}`
  );
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
