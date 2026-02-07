import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createOpening, makeRound, type Difficulty } from "@/lib/engine";
import { createSession } from "@/lib/store";
import { canUseAI, generateStoryRound, moderateText } from "@/lib/ai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const theme = body.theme ?? "Magic Forest";
  const difficulty = (body.difficulty ?? "Beginner") as Difficulty;
  let heroName = (body.heroName ?? "") as string;
  const lang = (body.lang ?? "en") as "en" | "zh" | "ms";

  const safeHero = await moderateText(heroName);
  if (!safeHero) heroName = "";

  const round = 1;
  const sessionId = randomUUID();
  const maxRounds =
    difficulty === "Beginner" ? 3 : difficulty === "Intermediate" ? 5 : 10;

  let story = "";
  let question = "";
  let choices: { id: "A" | "B" | "C"; text: string }[] = [];
  let targetWords: string[] = [];
  let scene = { hero: heroName || "Hero", location: "", mood: "", conflict: "" };

  if (canUseAI()) {
    const ai = await generateStoryRound({
      mode: "start",
      lang,
      difficulty,
      theme,
      heroName,
      round,
      maxRounds
    });
    story = ai.story_update;
    question = ai.question;
    choices = ai.choices;
    targetWords = ai.target_words;
    scene = ai.scene;
  } else {
    const opening = createOpening(theme, difficulty, heroName, lang);
    story = opening.opening;
    const roundData = makeRound(
      theme,
      difficulty,
      round,
      opening.hero,
      opening.location,
      opening.mood,
      opening.conflict,
      lang
    );
    question = roundData.question;
    choices = roundData.choices as { id: "A" | "B" | "C"; text: string }[];
    targetWords = roundData.targetWords;
    scene = roundData.scene;
  }

  createSession({
    id: sessionId,
    theme,
    difficulty,
    lang,
    round,
    story,
    targetWords,
    heroName: scene.hero,
    hero: scene.hero,
    location: scene.location,
    mood: scene.mood,
    conflict: scene.conflict,
    inventory: [],
    branchCounts: { A: 0, B: 0, C: 0 },
    maxRounds,
    createdAt: new Date().toISOString(),
    history: []
  });

  return NextResponse.json({
    sessionId,
    round,
    storySoFar: story,
    question,
    choices,
    targetWords,
    difficulty,
    scene,
    inventory: [],
    maxRounds
  });
}
