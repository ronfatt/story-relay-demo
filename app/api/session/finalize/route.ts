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
import db from "@/lib/db";
import { getSession as getAuthSession, getUserById } from "@/lib/auth";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.sessionId as string;

  const session = getSession(sessionId) as {
    id: string;
    theme: string;
    difficulty: Difficulty;
    lang: "en" | "zh" | "ms";
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
  const finalStory = finalizeStoryWithBranch(
    session.story,
    session.theme,
    branch,
    session.lang,
    session.difficulty
  );

  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  if (match?.[1]) {
    const authSession = getAuthSession(match[1]);
    if (authSession && new Date(authSession.expires_at).getTime() > Date.now()) {
      const user = getUserById(authSession.user_id);
      if (user) {
        const stmt = db.prepare(
          `INSERT INTO stories
           (id, user_id, theme, difficulty, lang, title, full_story, moral, total_stars, branch, hero, target_words, inventory, history, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        );
        stmt.run(
          randomUUID(),
          user.id,
          session.theme,
          session.difficulty,
          session.lang,
          finalStory.title,
          finalStory.fullStory,
          finalStory.moral,
          score.totalStars,
          branch,
          session.hero,
          JSON.stringify(session.targetWords || []),
          JSON.stringify(session.inventory || []),
          JSON.stringify(session.history || []),
          new Date().toISOString()
        );
      }
    }
  }

  return NextResponse.json({
    ...finalStory,
    score: {
      creativity: score.creativity,
      storyFlow: score.storyFlow,
      englishLevelFit: score.englishLevelFit,
      bonus: score.bonus,
      totalStars: score.totalStars
    },
    feedback: feedbackForScore(score.totalStars, session.lang),
    suggestedVocab: suggestedVocab(targetWords, session.lang),
    totalStarsEarned: score.totalStars,
    branch,
    inventory: session.inventory
  });
}
