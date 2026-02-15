import { NextResponse } from "next/server";
import {
  makeRound,
  updateStory,
  inventoryReward,
  finalizeStoryWithBranch,
  scoreStory,
  feedbackForScore,
  suggestedVocab,
  dominantBranch
} from "@/lib/engine";
import { addRound, getSession, updateSession } from "@/lib/store";
import { canUseAI, generateStoryRound, moderateText } from "@/lib/ai";
import { initDb, sql } from "@/lib/db";
import { getSession as getAuthSession, getUserById } from "@/lib/auth";
import { randomUUID } from "crypto";
import { getCookieValue } from "@/lib/cookies";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.sessionId as string;
  const choiceId = body.choiceId as string;
  let userLine = (body.userLine as string | undefined) ?? "";

  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  const safeLine = await moderateText(userLine);
  if (!safeLine) userLine = "";

  const { choices } = makeRound(
    session.theme,
    session.difficulty,
    session.round,
    session.hero,
    session.location,
    session.mood,
    session.conflict,
    session.lang
  );
  const chosen = choices.find((c) => c.id === choiceId);
  const choiceText = chosen ? chosen.text : choices[0].text;

  let newStory = "";
  let nextQuestion = "";
  let nextChoices: { id: "A" | "B" | "C"; text: string }[] = [];
  let nextTargetWords: string[] = session.targetWords;
  let nextScene = {
    hero: session.hero,
    location: session.location,
    mood: session.mood,
    conflict: session.conflict
  };

  if (canUseAI()) {
    const ai = await generateStoryRound({
      mode: "continue",
      lang: session.lang,
      difficulty: session.difficulty,
      theme: session.theme,
      branchName: session.branchName,
      heroName: session.hero,
      storySoFar: session.story,
      chosenAction: choiceText,
      userLine,
      round: session.round,
      maxRounds: session.maxRounds
    });
    newStory = session.story + "\n\n" + ai.story_update;
    nextQuestion = ai.question;
    nextChoices = ai.choices;
    nextTargetWords = ai.target_words;
    nextScene = ai.scene;
  } else {
    newStory = updateStory(
      session.story,
      choiceText,
      userLine,
      session.round,
      {
        hero: session.hero,
        location: session.location,
        mood: session.mood,
        conflict: session.conflict
      },
      session.theme,
      choiceId,
      session.lang,
      session.difficulty
    );
    const nextRoundData = makeRound(
      session.theme,
      session.difficulty,
      session.round + 1,
      session.hero,
      session.location,
      session.mood,
      session.conflict,
      session.lang
    );
    nextQuestion = nextRoundData.question;
    nextChoices = nextRoundData.choices as { id: "A" | "B" | "C"; text: string }[];
    nextTargetWords = nextRoundData.targetWords;
    nextScene = nextRoundData.scene;
  }

  const reward = inventoryReward(session.theme, session.round, choiceId, session.lang);
  if (reward) {
    session.inventory.push(reward);
  }
  if (choiceId === "A" || choiceId === "B" || choiceId === "C") {
    session.branchCounts[choiceId] += 1;
  }

  const nextRound = session.round + 1;

  session.round = nextRound;
  session.story = newStory;
  session.targetWords = nextTargetWords;
  session.hero = nextScene.hero;
  session.location = nextScene.location;
  session.mood = nextScene.mood;
  session.conflict = nextScene.conflict;
  updateSession(session);
  addRound(sessionId, {
    round: session.round - 1,
    choiceId,
    choiceText,
    userLine,
    storySnapshot: newStory
  });

  if (nextRound > session.maxRounds) {
    const userLines = session.history.map((round) => round.userLine || "");
    const score = scoreStory(session.maxRounds, userLines, session.difficulty, session.targetWords);
    const branch = dominantBranch(session.branchCounts);
    const finalStory = finalizeStoryWithBranch(
      session.story,
      session.theme,
      branch,
      session.lang,
      session.difficulty
    );
    const feedback = feedbackForScore(score.totalStars, session.lang);
    const vocab = suggestedVocab(session.targetWords, session.lang);

    const cookie = req.headers.get("cookie") || "";
    const sessionIdCookie = getCookieValue(cookie, "sb_session");
    let storyId: string | null = null;
    if (sessionIdCookie) {
      const authSession = await getAuthSession(sessionIdCookie);
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
          await sql`
            UPDATE users
            SET total_stars = total_stars + ${score.totalStars}
            WHERE id = ${user.id}
          `;
        }
      }
    }

    return NextResponse.json({
      done: true,
      storyId,
      result: {
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
        inventory: session.inventory
      }
    });
  }

  return NextResponse.json({
    sessionId,
    round: nextRound,
    storySoFar: newStory,
    question: nextQuestion,
    choices: nextChoices,
    targetWords: nextTargetWords,
    difficulty: session.difficulty,
    scene: nextScene,
    inventory: session.inventory,
    maxRounds: session.maxRounds
  });
}
