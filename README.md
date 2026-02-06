# Story Relay Demo

English-only UI and content. This is a demo implementation of the 10-round interactive story game.

## Features
- 3 difficulty levels
- 10 rounds with A/B/C choices
- Optional user sentence per round for bonus stars
- Final story generation + star scoring
- In-memory persistence for demo sessions
- Story replay timeline

## Run
1. Install Node.js 18+.
2. From the project root:

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## API
- `POST /api/session/start` `{ theme, difficulty }`
- `POST /api/session/next` `{ sessionId, choiceId, userLine? }`
- `POST /api/session/finalize` `{ sessionId }`

## Notes
- In-memory store resets on server restart.
- This demo uses a deterministic story engine (no external LLM call).
