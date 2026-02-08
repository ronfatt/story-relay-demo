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
import { initDb, sql } from "@/lib/db";
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
  const feedback = feedbackForScore(score.totalStars, session.lang);
  const vocab = suggestedVocab(targetWords, session.lang);

  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/sb_session=([^;]+)/);
  let storyId: string | null = null;
  if (match?.[1]) {
  const authSession = await getAuthSession(match[1]);
    if (authSession && new Date(authSession.expires_at).getTime() > Date.now()) {
      const user = await getUserById(authSession.user_id);
      if (user) {
        await initDb();
        storyId = randomUUID();
        await sql`
          INSERT INTO stories
          (id, user_id, theme, difficulty, lang, title, full_story, moral, total_stars, score_json, feedback_json, suggested_vocab_json, branch, hero, target_words, inventory, history, created_at)
          VALUES (
            ${storyId},
            ${user.id},
            ${session.theme},
            ${session.difficulty},
            ${session.lang},
            ${finalStory.title},
            ${finalStory.fullStory},
            ${finalStory.moral},
            ${score.totalStars},
            ${JSON.stringify({
              creativity: score.creativity,
              storyFlow: score.storyFlow,
              englishLevelFit: score.englishLevelFit,
              bonus: score.bonus,
              totalStars: score.totalStars
            })},
            ${JSON.stringify(feedback)},
            ${JSON.stringify(vocab)},
            ${branch},
            ${session.hero},
            ${JSON.stringify(session.targetWords || [])},
            ${JSON.stringify(session.inventory || [])},
            ${JSON.stringify(session.history || [])},
            ${new Date().toISOString()}
          )
        `;
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
    feedback,
    suggestedVocab: vocab,
    totalStarsEarned: score.totalStars,
    branch,
    inventory: session.inventory,
    storyId
  });
}
