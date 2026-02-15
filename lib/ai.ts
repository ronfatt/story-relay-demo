import type { Difficulty } from "@/lib/engine";
import type { Language } from "@/lib/i18n";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const OPENAI_BASE_URL = "https://api.openai.com/v1";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

type StoryRoundAI = {
  story_update: string;
  question: string;
  choices: { id: "A" | "B" | "C"; text: string }[];
  target_words: string[];
  scene: { hero: string; location: string; mood: string; conflict: string };
};

export function canUseAI() {
  return Boolean(OPENAI_API_KEY);
}

export async function moderateText(input: string) {
  if (!OPENAI_API_KEY) return true;
  if (!input.trim()) return true;
  const res = await fetch(`${OPENAI_BASE_URL}/moderations`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "omni-moderation-latest",
      input
    })
  });
  if (!res.ok) return true;
  const data = await res.json();
  const flagged = data?.results?.[0]?.flagged;
  return !flagged;
}

export async function generateStoryRound(opts: {
  mode: "start" | "continue";
  lang: Language;
  difficulty: Difficulty;
  theme: string;
  branchName?: string;
  heroName?: string;
  storySoFar?: string;
  chosenAction?: string;
  userLine?: string;
  round: number;
  maxRounds: number;
}) {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set.");
  }
  const system = buildSystemPrompt(opts.difficulty, opts.lang);
  const user = buildUserPrompt(opts);

  const schema = {
    name: "story_round",
    description: "Story round output for a kid-friendly interactive story.",
    schema: {
      type: "object",
      additionalProperties: false,
      properties: {
        story_update: { type: "string" },
        question: { type: "string" },
        choices: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              id: { type: "string", enum: ["A", "B", "C"] },
              text: { type: "string" }
            },
            required: ["id", "text"]
          }
        },
        target_words: {
          type: "array",
          minItems: 3,
          maxItems: 3,
          items: { type: "string" }
        },
        scene: {
          type: "object",
          additionalProperties: false,
          properties: {
            hero: { type: "string" },
            location: { type: "string" },
            mood: { type: "string" },
            conflict: { type: "string" }
          },
          required: ["hero", "location", "mood", "conflict"]
        }
      },
      required: ["story_update", "question", "choices", "target_words", "scene"]
    },
    strict: true
  };

  const res = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      response_format: { type: "json_schema", json_schema: schema }
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("No content from model.");
  return JSON.parse(content) as StoryRoundAI;
}

function buildSystemPrompt(difficulty: Difficulty, lang: Language) {
  const langLabel =
    lang === "zh" ? "Simplified Chinese" : lang === "ms" ? "Bahasa Melayu" : "English";
  if (difficulty === "Beginner") {
    return [
      `You are a children's story writer for ages 3-5.`,
      `Write in ${langLabel}.`,
      `Use very short sentences (3-6 words).`,
      `Only present tense.`,
      `Use common nouns and verbs.`,
      `No abstract words. No clauses.`,
      `Each choice must be one simple action.`,
      `Avoid explanations.`,
      `Return JSON that matches the schema exactly.`
    ].join(" ");
  }
  if (difficulty === "Intermediate") {
    return [
      `You are a children's story writer for ages 6-8.`,
      `Write in ${langLabel}.`,
      `Use short sentences (6-10 words).`,
      `Allow connectors: and, then, because.`,
      `Use simple adjectives and emotion words.`,
      `Mostly present tense; only was/went/saw as past.`,
      `Include a small problem and logical choices.`,
      `Each choice must affect the outcome.`,
      `Return JSON that matches the schema exactly.`
    ].join(" ");
  }
  return [
    `You are a creative children's story writer.`,
    `Write in ${langLabel}.`,
    `Return JSON that matches the schema exactly.`
  ].join(" ");
}

function buildUserPrompt(opts: {
  mode: "start" | "continue";
  lang: Language;
  difficulty: Difficulty;
  theme: string;
  branchName?: string;
  heroName?: string;
  storySoFar?: string;
  chosenAction?: string;
  userLine?: string;
  round: number;
  maxRounds: number;
}) {
  const lines: string[] = [];
  lines.push(`Theme: ${opts.theme}.`);
  if (opts.branchName) lines.push(`Branch: ${opts.branchName}.`);
  lines.push(`Difficulty: ${opts.difficulty}.`);
  lines.push(`Round: ${opts.round} of ${opts.maxRounds}.`);
  if (opts.heroName) lines.push(`Hero name: ${opts.heroName}.`);
  if (opts.mode === "start") {
    lines.push(`Task: Create the opening and the first choices.`);
  } else {
    lines.push(`Story so far: ${opts.storySoFar || ""}`);
    lines.push(`Chosen action: ${opts.chosenAction || ""}`);
    if (opts.userLine) lines.push(`Kid line: ${opts.userLine}`);
    lines.push(`Task: Continue the story and give the next choices.`);
  }
  lines.push(`Output JSON only.`);
  return lines.join("\n");
}
