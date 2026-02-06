import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createOpening, makeRound, type Difficulty } from "@/lib/engine";
import { createSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const theme = body.theme ?? "Magic Forest";
  const difficulty = (body.difficulty ?? "Beginner") as Difficulty;
  const heroName = (body.heroName ?? "") as string;

  const opening = createOpening(theme, difficulty, heroName);
  const story = opening.opening;
  const round = 1;
  const sessionId = randomUUID();
  const maxRounds =
    difficulty === "Beginner" ? 3 : difficulty === "Intermediate" ? 5 : 10;

  const { question, choices, targetWords, scene } = makeRound(
    theme,
    difficulty,
    round,
    opening.hero,
    opening.location,
    opening.mood,
    opening.conflict
  );

  createSession({
    id: sessionId,
    theme,
    difficulty,
    round,
    story,
    targetWords,
    heroName: opening.hero,
    hero: opening.hero,
    location: opening.location,
    mood: opening.mood,
    conflict: opening.conflict,
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
