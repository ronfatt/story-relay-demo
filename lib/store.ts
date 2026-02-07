export type SessionRound = {
  round: number;
  choiceId: string;
  choiceText: string;
  userLine: string;
  storySnapshot: string;
};

export type Session = {
  id: string;
  theme: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  lang: "en" | "zh" | "ms";
  round: number;
  story: string;
  targetWords: string[];
  heroName: string;
  hero: string;
  location: string;
  mood: string;
  conflict: string;
  inventory: string[];
  branchCounts: { A: number; B: number; C: number };
  maxRounds: number;
  createdAt: string;
  history: SessionRound[];
};

type Store = {
  sessions: Map<string, Session>;
};

function getGlobalStore(): Store {
  const globalAny = globalThis as typeof globalThis & { __storyStore?: Store };
  if (!globalAny.__storyStore) {
    globalAny.__storyStore = { sessions: new Map() };
  }
  return globalAny.__storyStore;
}

export function createSession(session: Session) {
  const store = getGlobalStore();
  store.sessions.set(session.id, session);
  return session;
}

export function getSession(id: string) {
  const store = getGlobalStore();
  return store.sessions.get(id) || null;
}

export function updateSession(session: Session) {
  const store = getGlobalStore();
  store.sessions.set(session.id, session);
  return session;
}

export function addRound(id: string, round: SessionRound) {
  const session = getSession(id);
  if (!session) return null;
  session.history.push(round);
  return updateSession(session);
}

export function listHistory(id: string) {
  const session = getSession(id);
  return session ? session.history : [];
}
