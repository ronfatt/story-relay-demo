import { NextResponse } from "next/server";
import { makeRound, updateStory, inventoryReward } from "@/lib/engine";
import { addRound, getSession, updateSession } from "@/lib/store";
import { canUseAI, generateStoryRound, moderateText } from "@/lib/ai";

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
    return NextResponse.json({ done: true });
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
