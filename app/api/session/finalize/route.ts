import { NextResponse } from "next/server";
import {
  finalizeStoryWithBranch,
  feedbackForScore,
  scoreStory,
  suggestedVocab,
  type Difficulty,
  dominantBranch
} from "@/lib/engine";
import { getSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.sessionId as string;

  const session = getSession(sessionId) as {
    id: string;
    theme: string;
    difficulty: Difficulty;
    round: number;
    story: string;
    targetWords: string[];
    hero: string;
    location: string;
    mood: string;
    conflict: string;
    branchCounts: { A: number; B: number; C: number };
    inventory: string[];
    maxRounds: number;
    history: { userLine: string }[];
  } | null;

  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  const userLines = session.history.map((round) => round.userLine || "");
  const targetWords = session.targetWords;

  const score = scoreStory(session.maxRounds, userLines, session.difficulty, targetWords);
  const branch = dominantBranch(session.branchCounts);
  const finalStory = finalizeStoryWithBranch(session.story, session.theme, branch);

  return NextResponse.json({
    ...finalStory,
    score: {
      creativity: score.creativity,
      storyFlow: score.storyFlow,
      englishLevelFit: score.englishLevelFit,
      bonus: score.bonus,
      totalStars: score.totalStars
    },
    feedback: feedbackForScore(score.totalStars),
    suggestedVocab: suggestedVocab(targetWords),
    totalStarsEarned: score.totalStars,
    branch,
    inventory: session.inventory
  });
}
