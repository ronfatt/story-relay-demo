export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";

export type ChildWorld = {
  title: string;
  description: string;
  thumbnail: string;
  requiredStars: number;
  difficulty: DifficultyLevel;
};

export type WorldNode = {
  title: string;
  description: string;
  thumbnail: string;
  childWorlds: Record<string, ChildWorld>;
};

export const WORLD_DATA: Record<string, WorldNode> = {
  "magic-forest": {
    title: "Magic Forest",
    description: "Glowing paths and hidden forest doors.",
    thumbnail: "/worlds/magic-forest.png",
    childWorlds: {
      "glow-trail": {
        title: "Glow Trail",
        description: "Follow fireflies to a hidden clue.",
        thumbnail: "/worlds/magic-forest.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "whisper-cave": {
        title: "Whisper Cave",
        description: "Decode tree whispers near the cave.",
        thumbnail: "/worlds/magic-forest.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "moon-gate": {
        title: "Moon Gate",
        description: "Open the gate before moonlight fades.",
        thumbnail: "/worlds/magic-forest.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  },
  "ocean-quest": {
    title: "Ocean Quest",
    description: "Dive deep for clues and secret pearls.",
    thumbnail: "/worlds/ocean-quest.png",
    childWorlds: {
      "coral-path": {
        title: "Coral Path",
        description: "Track shell marks across coral reefs.",
        thumbnail: "/worlds/ocean-quest.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "storm-lagoon": {
        title: "Storm Lagoon",
        description: "Choose safe routes through rough waves.",
        thumbnail: "/worlds/ocean-quest.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "abyss-riddle": {
        title: "Abyss Riddle",
        description: "Solve deep-sea symbols to unlock treasure.",
        thumbnail: "/worlds/ocean-quest.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  },
  "space-school": {
    title: "Space School",
    description: "Train with robots among stars.",
    thumbnail: "/worlds/space-school.png",
    childWorlds: {
      "robot-class": {
        title: "Robot Class",
        description: "Complete your first mission with Zia.",
        thumbnail: "/worlds/space-school.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "orbit-lab": {
        title: "Orbit Lab",
        description: "Run tests while satellites drift by.",
        thumbnail: "/worlds/space-school.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "comet-core": {
        title: "Comet Core",
        description: "Stabilize the core before countdown ends.",
        thumbnail: "/worlds/space-school.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  },
  "dino-valley": {
    title: "Dino Valley",
    description: "Explore giant trails and ancient signs.",
    thumbnail: "/worlds/dino-valley.png",
    childWorlds: {
      "leaf-tracks": {
        title: "Leaf Tracks",
        description: "Follow footprints to a lost egg.",
        thumbnail: "/worlds/dino-valley.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "fossil-bridge": {
        title: "Fossil Bridge",
        description: "Cross safely with clues from old bones.",
        thumbnail: "/worlds/dino-valley.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "volcano-echo": {
        title: "Volcano Echo",
        description: "Guide the herd before the rumble grows.",
        thumbnail: "/worlds/dino-valley.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  },
  "marvel-world": {
    title: "Marvel World",
    description: "Mission alarms, masks, and city action.",
    thumbnail: "/worlds/marvel-world.png",
    childWorlds: {
      "rookie-mission": {
        title: "Rookie Mission",
        description: "Find the signal beacon in the city.",
        thumbnail: "/worlds/marvel-world.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "squad-alert": {
        title: "Squad Alert",
        description: "Coordinate teammates to stop a blackout.",
        thumbnail: "/worlds/marvel-world.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "multiverse-gate": {
        title: "Multiverse Gate",
        description: "Choose the right portal under pressure.",
        thumbnail: "/worlds/marvel-world.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  },
  "kpop-demon-hunter-world": {
    title: "Kpop Demon Hunter World",
    description: "Neon stages and shadow challenges.",
    thumbnail: "/worlds/kpop-demon-hunter-world.png",
    childWorlds: {
      "stage-check": {
        title: "Stage Check",
        description: "Warm up before the beat drops.",
        thumbnail: "/worlds/kpop-demon-hunter-world.png",
        requiredStars: 0,
        difficulty: "Beginner"
      },
      "shadow-chase": {
        title: "Shadow Chase",
        description: "Track hidden signs behind neon lights.",
        thumbnail: "/worlds/kpop-demon-hunter-world.png",
        requiredStars: 50,
        difficulty: "Intermediate"
      },
      "final-encore": {
        title: "Final Encore",
        description: "Protect the crowd in the final battle.",
        thumbnail: "/worlds/kpop-demon-hunter-world.png",
        requiredStars: 120,
        difficulty: "Advanced"
      }
    }
  }
};
