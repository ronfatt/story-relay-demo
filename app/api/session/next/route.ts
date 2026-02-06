import { NextResponse } from "next/server";
import { makeRound, updateStory, inventoryReward } from "@/lib/engine";
import { addRound, getSession, updateSession } from "@/lib/store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const sessionId = body.sessionId as string;
  const choiceId = body.choiceId as string;
  const userLine = (body.userLine as string | undefined) ?? "";

  const session = getSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Session not found." }, { status: 404 });
  }

  const { choices } = makeRound(
    session.theme,
    session.difficulty,
    session.round,
    session.hero,
    session.location,
    session.mood,
    session.conflict
  );
  const chosen = choices.find((c) => c.id === choiceId);
  const choiceText = chosen ? chosen.text : choices[0].text;

  const newStory = updateStory(
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
    choiceId
  );

  const reward = inventoryReward(session.theme, session.round, choiceId);
  if (reward) {
    session.inventory.push(reward);
  }
  if (choiceId === "A" || choiceId === "B" || choiceId === "C") {
    session.branchCounts[choiceId] += 1;
  }
  const nextRound = session.round + 1;

  session.round = nextRound;
  session.story = newStory;
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

  const { question, choices: nextChoices, targetWords, scene } = makeRound(
    session.theme,
    session.difficulty,
    nextRound,
    session.hero,
    session.location,
    session.mood,
    session.conflict
  );

  return NextResponse.json({
    sessionId,
    round: nextRound,
    storySoFar: newStory,
    question,
    choices: nextChoices,
    targetWords,
    difficulty: session.difficulty,
    scene,
    inventory: session.inventory,
    maxRounds: session.maxRounds
  });
}
