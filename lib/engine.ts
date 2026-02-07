export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

const openings: Record<string, string[]> = {
  "Magic Forest": [
    "{hero} found a tiny map under a {mood} leaf. The map showed a path to the {location}. The forest hummed like a friendly song, and a silver fox appeared with a helpful bow.",
    "A glowing breeze guided {hero} to the {location}. The trees whispered, and a soft bell rang from far away. {hero} felt {mood} but ready to explore.",
    "{hero} stepped into the Magic Forest and noticed {conflict}. The {location} might hold the answer. A spark of light danced nearby, waiting to be followed."
  ],
  "Space School": [
    "{hero} arrived at Space School and met a robot named Zia. Their mission was to solve {conflict}. The halls floated with quiet lights, and a window showed a blue comet racing past.",
    "At Space School, {hero} received a badge that blinked {mood} colors. The {location} was off-limits today, but a secret door opened with a gentle chime.",
    "{hero} floated through the space corridor and noticed {conflict}. Zia pointed to the {location} and said, \"We can do this together.\""
  ],
  "Ocean Quest": [
    "{hero} sailed across a sparkling sea. A playful dolphin surfaced and clicked twice. The mission was to solve {conflict}, and the {location} might help.",
    "A warm tide carried {hero} toward the {location}. The waves felt {mood}, and a shell glowed with a gentle signal.",
    "{hero} dove into a calm lagoon and saw {conflict}. The {location} shimmered below, waiting to be explored."
  ],
  "Dino Valley": [
    "{hero} entered Dino Valley with a backpack of snacks and a compass. The air smelled of rain, and the {location} was hidden beyond the ferns.",
    "A baby triceratops nudged {hero}'s hand. The mission was to solve {conflict}, and the {location} could hold a clue.",
    "{hero} followed a trail of leaves and felt {mood}. The {location} appeared between tall rocks like a quiet secret."
  ],
  "Sky Castle": [
    "{hero} arrived at Sky Castle on a soft cloud bridge. The {location} shimmered above, and {conflict} had to be solved before sunset.",
    "A breeze carried {hero} to the {location}. The towers sang quietly, and {hero} felt {mood} and ready.",
    "{hero} spotted {conflict}. The {location} glowed with clues waiting to be found."
  ],
  "Robot City": [
    "{hero} rolled into Robot City where lights blinked like stars. The {location} was buzzing, and {conflict} needed a clever plan.",
    "Gears whirred as {hero} reached the {location}. The city felt {mood}, and a friendly bot waved hello.",
    "{hero} noticed {conflict} near the {location}. A tiny drone hovered, ready to help."
  ],
  "Candy Kingdom": [
    "{hero} stepped into Candy Kingdom where streets sparkled like sugar. The {location} smelled sweet, but {conflict} had to be solved.",
    "A jelly bridge led {hero} to the {location}. The air felt {mood}, and gumdrop lanterns lit the way.",
    "{hero} discovered {conflict}. The {location} glowed like caramel and promised a clue."
  ],
  "Jungle Rescue": [
    "{hero} entered the jungle and heard drums in the trees. The {location} was hidden in the vines, and {conflict} needed help.",
    "A parrot guided {hero} to the {location}. The jungle felt {mood}, and a rescue plan began.",
    "{hero} spotted {conflict} near the {location}. Leaves rustled as a new clue appeared."
  ],
  "Ice Mountain": [
    "{hero} climbed Ice Mountain where the air glittered. The {location} shone like crystal, and {conflict} needed courage.",
    "A snowy path led {hero} to the {location}. The cold felt {mood}, but the mission was clear.",
    "{hero} discovered {conflict}. The {location} sparkled with icy hints."
  ],
  "Desert Caravan": [
    "{hero} joined a desert caravan under a golden sky. The {location} was far away, and {conflict} needed a brave choice.",
    "Warm winds guided {hero} toward the {location}. The sand felt {mood}, and camels hummed softly.",
    "{hero} noticed {conflict} near the {location}. A lantern flickered with a clue."
  ]
};

const targetWordPools: Record<Difficulty, string[]> = {
  Beginner: ["brave", "glow", "soft", "help", "friend", "safe"],
  Intermediate: ["suddenly", "whisper", "curious", "path", "promise", "gentle"],
  Advanced: ["mysterious", "strategy", "resolve", "glimmer", "explore", "twist"]
};

const choiceTemplates = [
  "Follow the {clue} to the {place}.",
  "Ask the {guide} for advice before moving on.",
  "Hide for a moment and observe the {sign}.",
  "Use the {tool} to solve a small puzzle.",
  "Offer help to the {friend} and earn a clue.",
  "Take a short detour to gather supplies.",
  "Make a careful plan near the {place}.",
  "Share a kind promise with the {friend}."
];

const themeDetails: Record<string, Record<string, string[]>> = {
  "Magic Forest": {
    clue: ["glowing footprints", "silver ribbon", "sparkling dew"],
    place: ["oak gate", "moonlit pond", "hidden bridge"],
    guide: ["friendly owl", "kind fox", "singing tree"],
    sign: ["rustling leaves", "soft light", "tiny bell"],
    tool: ["magic compass", "wind charm", "lantern"],
    friend: ["lost squirrel", "young fairy", "wood sprite"]
  },
  "Space School": {
    clue: ["beeping console", "hologram trail", "blue comet"],
    place: ["star lab", "gravity hall", "sky deck"],
    guide: ["robot librarian", "captain", "music drone"],
    sign: ["blinking panel", "floating notes", "warm glow"],
    tool: ["jet pack", "tool kit", "energy badge"],
    friend: ["lost cadet", "tiny rover", "sleepy alien"]
  },
  "Ocean Quest": {
    clue: ["shimmering bubble", "coral arrow", "sunbeam"],
    place: ["quiet reef", "sea cave", "tide pool"],
    guide: ["wise turtle", "laughing dolphin", "crab captain"],
    sign: ["swaying kelp", "ringing shell", "sparkle"],
    tool: ["pearl compass", "diving mask", "shell horn"],
    friend: ["lost seahorse", "baby whale", "octopus painter"]
  },
  "Dino Valley": {
    clue: ["giant footprints", "warm breeze", "leaf trail"],
    place: ["river bend", "stone ridge", "fern meadow"],
    guide: ["wise stego", "kind ranger", "sunbird"],
    sign: ["distant roar", "glowing fireflies", "soft drum"],
    tool: ["map", "flare", "snack pack"],
    friend: ["young dino", "lost runner", "forest goat"]
  },
  "Sky Castle": {
    clue: ["silver feather", "rainbow ribbon", "cloud swirl"],
    place: ["sun tower", "sky bridge", "wind garden"],
    guide: ["cloud fox", "sky knight", "singing bell"],
    sign: ["soft chimes", "glowing mist", "floating light"],
    tool: ["wing charm", "light compass", "star key"],
    friend: ["tiny sprite", "young dragon", "sky pup"]
  },
  "Robot City": {
    clue: ["beeping beacon", "laser trail", "metal token"],
    place: ["circuit plaza", "battery hall", "neon gate"],
    guide: ["helper bot", "city marshal", "music drone"],
    sign: ["blinking panel", "whirring fan", "blue glow"],
    tool: ["tool kit", "signal badge", "magnet wand"],
    friend: ["lost bot", "mini rover", "spark cat"]
  },
  "Candy Kingdom": {
    clue: ["sugar sparkle", "caramel ribbon", "peppermint trail"],
    place: ["gumdrop tower", "chocolate bridge", "lollipop lane"],
    guide: ["candy owl", "marshmallow bear", "jelly guide"],
    sign: ["sweet bells", "glowing jelly", "fizzy light"],
    tool: ["candy compass", "gumdrop key", "sprinkle pouch"],
    friend: ["cookie pup", "gummy fox", "caramel kid"]
  },
  "Jungle Rescue": {
    clue: ["parrot feather", "vine mark", "river ripple"],
    place: ["canopy hut", "waterfall cave", "sunlit clearing"],
    guide: ["wise monkey", "forest ranger", "talking toucan"],
    sign: ["drum beats", "shimmering leaf", "hidden track"],
    tool: ["rope", "rescue whistle", "trail map"],
    friend: ["lost cub", "tiny sloth", "jungle pup"]
  },
  "Ice Mountain": {
    clue: ["snow crystal", "ice trail", "frost mark"],
    place: ["glacier gate", "crystal cave", "frozen ridge"],
    guide: ["polar fox", "ice guide", "snow owl"],
    sign: ["blue sparkle", "cold breeze", "ringing ice"],
    tool: ["warm lantern", "ice pick", "snow compass"],
    friend: ["baby seal", "snow bunny", "tiny yeti"]
  },
  "Desert Caravan": {
    clue: ["sand swirl", "gold coin", "sunstone"],
    place: ["oasis well", "dune camp", "market tent"],
    guide: ["wise camel", "caravan leader", "desert fox"],
    sign: ["wind song", "lantern glow", "footprint trail"],
    tool: ["water pouch", "sand compass", "shade cloth"],
    friend: ["lost traveler", "little lizard", "desert pup"]
  }
};

const heroByTheme: Record<string, string[]> = {
  "Magic Forest": ["Mia", "Ellis", "Aria"],
  "Space School": ["Leo", "Nova", "Kai"],
  "Ocean Quest": ["Nora", "Finn", "Luna"],
  "Dino Valley": ["Theo", "Rex", "Maya"],
  "Sky Castle": ["Skye", "Ari", "Nova"],
  "Robot City": ["Robo", "Ivy", "Zed"],
  "Candy Kingdom": ["Cora", "Milo", "Poppy"],
  "Jungle Rescue": ["Jade", "Rio", "Lina"],
  "Ice Mountain": ["Frost", "Mia", "Tari"],
  "Desert Caravan": ["Sami", "Zara", "Omar"]
};

const moodWords: Record<Difficulty, string[]> = {
  Beginner: ["happy", "curious", "brave", "calm"],
  Intermediate: ["hopeful", "focused", "excited", "steady"],
  Advanced: ["determined", "thoughtful", "eager", "confident"]
};

const conflictByTheme: Record<string, string[]> = {
  "Magic Forest": [
    "a glowing path was fading",
    "a lost lantern needed a new light",
    "a secret door would not open"
  ],
  "Space School": [
    "the star badge was missing",
    "the gravity lab was locked",
    "a message needed decoding"
  ],
  "Ocean Quest": [
    "the lighthouse needed a healing pearl",
    "a coral gate was stuck",
    "a song from the deep had stopped"
  ],
  "Dino Valley": [
    "a gentle giant had lost its map",
    "a valley bridge was broken",
    "a rain cloud would not move"
  ],
  "Sky Castle": [
    "a cloud gate was locked",
    "a rainbow bridge was fading",
    "a bell tower had gone silent"
  ],
  "Robot City": [
    "the power core was missing",
    "a signal was lost",
    "the city lights were flickering"
  ],
  "Candy Kingdom": [
    "the candy fountain stopped",
    "a sweet bridge cracked",
    "the sprinkle lights went out"
  ],
  "Jungle Rescue": [
    "a baby animal was lost",
    "a tree bridge broke",
    "a rescue call echoed"
  ],
  "Ice Mountain": [
    "a crystal path froze solid",
    "the warm lantern went out",
    "an ice gate would not open"
  ],
  "Desert Caravan": [
    "a caravan map was missing",
    "a sandstorm was coming",
    "an oasis clue was lost"
  ]
};

const storyBeats = [
  "setup",
  "first_clue",
  "small_obstacle",
  "new_friend",
  "twist",
  "rising_action",
  "setback",
  "breakthrough",
  "final_push",
  "resolution"
];

const eventByTheme: Record<string, string[]> = {
  "Magic Forest": [
    "A gust of warm wind scattered glowing petals.",
    "A tiny bell rang, then faded into the trees.",
    "Fireflies swirled to point out a safer path."
  ],
  "Space School": [
    "A robot announcer said, \"New clue detected.\"",
    "The lights dimmed and a soft alarm blinked once.",
    "A hologram map flickered and showed a shortcut."
  ],
  "Ocean Quest": [
    "A wave lifted the boat, then set it down gently.",
    "A singing shell hummed a quick, helpful tune.",
    "A school of fish formed an arrow in the water."
  ],
  "Dino Valley": [
    "A friendly roar echoed and then calmed down.",
    "A bird dropped a leaf that pointed the way.",
    "A small tremor revealed a hidden trail."
  ],
  "Sky Castle": [
    "A cloud puff formed a smiling face.",
    "A rainbow shimmer pointed to a new path.",
    "A bell rang once, then faded."
  ],
  "Robot City": [
    "A helper bot beeped a short tune.",
    "A neon sign flickered with a hint.",
    "A tiny drone zipped by with a clue."
  ],
  "Candy Kingdom": [
    "A sprinkle burst lit up the road.",
    "A sugar breeze carried a tiny note.",
    "A jelly light blinked twice."
  ],
  "Jungle Rescue": [
    "A parrot shouted a helpful word.",
    "A vine swayed, revealing a shortcut.",
    "A drum beat matched the heart of the path."
  ],
  "Ice Mountain": [
    "Snowflakes formed a gentle arrow.",
    "A crystal chimed like a bell.",
    "A warm gust melted a tiny gap."
  ],
  "Desert Caravan": [
    "A lantern glowed brighter for a moment.",
    "A camel hummed and nodded toward the trail.",
    "A dune shifted to reveal a hidden mark."
  ]
};

const inventoryByTheme: Record<string, string[]> = {
  "Magic Forest": ["glowing leaf", "wind charm", "silver key"],
  "Space School": ["star badge", "gravity pass", "tool chip"],
  "Ocean Quest": ["pearl shard", "shell horn", "tide compass"],
  "Dino Valley": ["leaf map", "stone token", "rain whistle"],
  "Sky Castle": ["cloud key", "star ribbon", "wind flute"],
  "Robot City": ["power cell", "signal chip", "magnet ring"],
  "Candy Kingdom": ["sprinkle pouch", "gumdrop key", "sugar star"],
  "Jungle Rescue": ["trail rope", "rescue whistle", "leaf badge"],
  "Ice Mountain": ["warm lantern", "ice shard", "snow charm"],
  "Desert Caravan": ["oasis map", "sunstone", "water flask"]
};

function pick<T>(items: T[], round: number) {
  return items[round % items.length];
}

export function createOpening(theme: string, difficulty: Difficulty, heroName?: string) {
  const hero = heroName && heroName.trim().length > 0
    ? heroName.trim()
    : pick(heroByTheme[theme] || heroByTheme["Magic Forest"], 0);
  const location = pick(themeDetails[theme]?.place || themeDetails["Magic Forest"].place, 1);
  const mood = pick(moodWords[difficulty], 2);
  const conflict = pick(conflictByTheme[theme] || conflictByTheme["Magic Forest"], 3);

  const templates = openings[theme] || openings["Magic Forest"];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const opening = template
    .replace("{hero}", hero)
    .replace("{location}", location)
    .replace("{mood}", mood)
    .replace("{conflict}", conflict);

  return {
    opening: clampByDifficulty(opening, difficulty),
    hero,
    location,
    mood,
    conflict
  };
}

export function makeRound(
  theme: string,
  difficulty: Difficulty,
  round: number,
  hero?: string,
  location?: string,
  mood?: string,
  conflict?: string
) {
  const pool = themeDetails[theme] || themeDetails["Magic Forest"];
  const template = choiceTemplates[round % choiceTemplates.length];

  const choiceTexts = ["A", "B", "C"].map((label, index) => {
    const fill = (key: keyof typeof pool) => pick(pool[key], round + index + key.length);
    const text = template
      .replace("{clue}", fill("clue"))
      .replace("{place}", fill("place"))
      .replace("{guide}", fill("guide"))
      .replace("{sign}", fill("sign"))
      .replace("{tool}", fill("tool"))
      .replace("{friend}", fill("friend"));
    return { id: label, text };
  });

  const targetWords = targetWordPools[difficulty].slice(0, 3);

  return {
    question: `What should ${hero || "the hero"} do next to solve ${conflict || "the mystery"}?`,
    choices: choiceTexts,
    targetWords,
    scene: {
      hero: hero || "the hero",
      location: location || "a secret place",
      mood: mood || "curious",
      conflict: conflict || "a small problem"
    }
  };
}

export function updateStory(
  story: string,
  choiceText: string,
  userLine: string | undefined,
  round: number,
  scene?: { hero: string; location: string; mood: string; conflict: string },
  theme?: string,
  choiceId?: string
) {
  const narrative = narrateChoice(choiceText, round, scene, choiceId);
  const transition = buildSceneTransition(round, scene);
  const event = buildRandomEvent(round, theme);
  const additions = [
    `\n\n${transition} ${event} ${narrative}`,
    userLine && userLine.trim().length > 0 ? ` ${userLine.trim()}` : ""
  ].join("");
  return story + additions;
}

export function finalizeStory(story: string, theme: string) {
  const ending = `\n\nIn the end, the adventure in ${theme} brought everyone together, and the hero kept the promise with a brave smile.`;
  const title = `${theme}: The Final Spark`;
  return {
    title,
    fullStory: story + ending,
    moral: "Be brave, ask for help, and keep your promises."
  };
}

function narrateChoice(
  choiceText: string,
  round: number,
  scene?: { hero: string; location: string; mood: string; conflict: string },
  choiceId?: string
) {
  const hero = scene?.hero || "The hero";
  const mood = scene?.mood || "brave";
  const beat = storyBeats[(round - 1) % storyBeats.length];
  const base = `${hero} decided to ${lowerFirst(choiceText)}`;

  const consequence = consequenceLine(beat, scene, choiceId, round);

  const styles = [
    `${base}. ${consequence}`,
    `With a ${mood} heart, ${base}. ${consequence}`,
    `The next move was clear. ${base}. ${consequence}`,
    `${hero} took a deep breath. ${base}. ${consequence}`
  ];
  return styles[round % styles.length];
}

function lowerFirst(text: string) {
  if (!text) return text;
  return text[0].toLowerCase() + text.slice(1);
}

function buildSceneTransition(
  round: number,
  scene?: { hero: string; location: string; mood: string; conflict: string }
) {
  const hero = scene?.hero || "The hero";
  const location = scene?.location || "a hidden place";
  const conflict = scene?.conflict || "a small mystery";
  const beat = storyBeats[(round - 1) % storyBeats.length];

  const transitions: Record<string, string[]> = {
    setup: [
      `${hero} paused near the ${location} and looked around.`,
      `The air felt new near the ${location}.`,
      `${hero} listened carefully as the adventure began.`
    ],
    first_clue: [
      `A small clue appeared by the ${location}.`,
      `Something shimmered and hinted at the next step.`,
      `A soft sound suggested where to look next.`
    ],
    small_obstacle: [
      `A small obstacle blocked the way forward.`,
      `The path narrowed, making the choice important.`,
      `A quiet challenge made ${hero} think twice.`
    ],
    new_friend: [
      `A new friend appeared with a helpful idea.`,
      `Someone kind offered to guide the way.`,
      `A friendly helper seemed ready to assist.`
    ],
    twist: [
      `Suddenly, the plan changed in a surprising way.`,
      `A twist made the ${conflict} feel bigger.`,
      `The clues pointed to a new direction.`
    ],
    rising_action: [
      `The adventure grew more exciting by the minute.`,
      `${hero} felt the stakes rise.`,
      `The next step felt important for the mission.`
    ],
    setback: [
      `A setback slowed the progress for a moment.`,
      `Things did not go as planned.`,
      `A small mistake made the path harder.`
    ],
    breakthrough: [
      `Then a breakthrough appeared at the perfect time.`,
      `A clever idea opened a new path.`,
      `${hero} noticed something everyone else missed.`
    ],
    final_push: [
      `The final push was close now.`,
      `${hero} could almost see the solution.`,
      `One more smart choice could solve it.`
    ],
    resolution: [
      `The journey was ready for its final answer.`,
      `Everything was leading to a clear ending.`,
      `The adventure was about to make sense.`
    ]
  };

  return pick(transitions[beat], round);
}

function buildRandomEvent(round: number, theme?: string) {
  if (round % 3 !== 0) return "";
  const events = eventByTheme[theme || "Magic Forest"] || eventByTheme["Magic Forest"];
  return pick(events, round);
}

function consequenceLine(
  beat: string,
  scene: { hero: string; location: string; mood: string; conflict: string } | undefined,
  choiceId: string | undefined,
  round: number
) {
  const hero = scene?.hero || "The hero";
  const location = scene?.location || "the place";
  const conflict = scene?.conflict || "the mystery";
  const mood = scene?.mood || "brave";
  const letter = choiceId || ["A", "B", "C"][round % 3];

  const consequences: Record<string, string[]> = {
    setup: [
      `${hero} felt ${mood} and noticed a helpful detail.`,
      `The choice opened a path toward the ${location}.`,
      `A small sign hinted at how to solve ${conflict}.`
    ],
    first_clue: [
      `Clue ${letter} revealed a hidden mark.`,
      `A secret symbol appeared on the ground.`,
      `The path seemed to glow for a second.`
    ],
    small_obstacle: [
      `It avoided a trap but took extra time.`,
      `The way was tight, yet ${hero} squeezed through.`,
      `The obstacle left a new question to answer.`
    ],
    new_friend: [
      `A helper shared a quick plan.`,
      `The new friend promised to guide ${hero}.`,
      `Together they felt stronger and more prepared.`
    ],
    twist: [
      `The twist revealed a new target.`,
      `It turned out the clue was only half true.`,
      `A different path suddenly mattered more.`
    ],
    rising_action: [
      `The mission felt urgent now.`,
      `${hero} could feel the finish getting closer.`,
      `Every step now mattered more.`
    ],
    setback: [
      `That made the ${conflict} harder for a moment.`,
      `A wrong turn slowed the team down.`,
      `It took courage to keep moving forward.`
    ],
    breakthrough: [
      `The solution started to appear.`,
      `A clever idea lit the way.`,
      `The pieces finally began to fit.`
    ],
    final_push: [
      `${hero} gathered courage for the last step.`,
      `The final clue pointed straight ahead.`,
      `Only one choice remained to solve it.`
    ],
    resolution: [
      `Everything connected at last.`,
      `The choice solved the heart of ${conflict}.`,
      `${hero} felt proud and calm.`
    ]
  };

  return pick(consequences[beat], round + (letter.charCodeAt(0) % 3));
}

export function inventoryReward(theme: string, round: number, choiceId: string) {
  const items = inventoryByTheme[theme] || inventoryByTheme["Magic Forest"];
  if (round % 2 === 0 && choiceId === "A") return items[0];
  if (round % 3 === 0 && choiceId === "B") return items[1];
  if (round % 5 === 0 && choiceId === "C") return items[2];
  return "";
}

export function dominantBranch(counts: { A: number; B: number; C: number }) {
  if (counts.A >= counts.B && counts.A >= counts.C) return "A";
  if (counts.B >= counts.A && counts.B >= counts.C) return "B";
  return "C";
}

export function finalizeStoryWithBranch(
  story: string,
  theme: string,
  branch: "A" | "B" | "C"
) {
  const endings: Record<string, Record<string, string>> = {
    "Magic Forest": {
      A: "The fox revealed a hidden door, and the forest celebrated the brave choice.",
      B: "The owl guided the hero home, proving that asking for help is wise.",
      C: "A quiet plan worked perfectly, and the forest glowed with new light."
    },
    "Space School": {
      A: "The badge was found in the star lab, and the mission was a success.",
      B: "The captain praised the careful teamwork that solved the mystery.",
      C: "A surprise shortcut saved the day and earned a special commendation."
    },
    "Ocean Quest": {
      A: "The pearl shard lit the lighthouse, and the town cheered.",
      B: "The turtle shared the final clue, and the sea felt calm again.",
      C: "A hidden current led the hero safely to the answer."
    },
    "Dino Valley": {
      A: "The giants received the message and offered a grateful roar.",
      B: "The wise guide celebrated the thoughtful plan.",
      C: "A clever detour solved the problem just in time."
    }
  };

  const endingText =
    endings[theme]?.[branch] ||
    "The hero solved the mystery with courage and kindness.";

  const ending = `\n\nIn the end, ${endingText}`;
  const title = `${theme}: The Final Spark`;
  return {
    title,
    fullStory: story + ending,
    moral: "Be brave, ask for help, and keep your promises."
  };
}

export function clampByDifficulty(text: string, difficulty: Difficulty) {
  if (difficulty === "Beginner") {
    return text.replace(/([,;:])/g, "").split(" ").slice(0, 90).join(" ");
  }
  if (difficulty === "Intermediate") {
    return text.split(" ").slice(0, 110).join(" ");
  }
  return text.split(" ").slice(0, 140).join(" ");
}

export function scoreStory(
  totalRounds: number,
  userLines: string[],
  difficulty: Difficulty,
  targetWords: string[]
) {
  const bonusInput = userLines.filter((line) => line.trim().length > 0).length;
  const usedTargets = targetWords.filter((word) =>
    userLines.join(" ").toLowerCase().includes(word)
  ).length;

  const creativity = Math.min(5, 3 + Math.floor(bonusInput / 2));
  const storyFlow = Math.min(5, 3 + Math.floor(totalRounds / 5));
  const englishLevelFit = difficulty === "Beginner" ? 4 : difficulty === "Intermediate" ? 4 : 3;

  let bonus = 0;
  if (bonusInput > 0) bonus += 1;
  if (usedTargets > 0) bonus += 1;
  if (totalRounds >= 10) bonus += 1;

  const totalStars = creativity + storyFlow + englishLevelFit + bonus;

  return { creativity, storyFlow, englishLevelFit, bonus, totalStars };
}

export function feedbackForScore(score: number) {
  if (score >= 15) {
    return [
      "Wonderful job! Your story stayed on track and felt exciting.",
      "Try adding more feeling words next time to make it shine even more."
    ];
  }
  if (score >= 12) {
    return [
      "Nice work! Your story made sense and had a clear goal.",
      "Add one more surprise moment to boost creativity." 
    ];
  }
  return [
    "Good start! You finished the adventure.",
    "Try using the target words for extra stars." 
  ];
}

export function suggestedVocab(targetWords: string[]) {
  return targetWords.map((word) => ({
    word,
    meaningEn: meaningForWord(word),
    example: `The ${word} light guided the way.`
  }));
}

function meaningForWord(word: string) {
  const map: Record<string, string> = {
    brave: "showing courage",
    glow: "to shine with light",
    soft: "not hard or rough",
    help: "to assist someone",
    friend: "a person you like and trust",
    safe: "free from danger",
    suddenly: "quickly and unexpectedly",
    whisper: "to speak very softly",
    curious: "wanting to know more",
    path: "a small way to walk",
    promise: "a firm decision to do something",
    gentle: "kind and calm",
    mysterious: "hard to explain or understand",
    strategy: "a careful plan",
    resolve: "strong determination",
    glimmer: "a small, weak light",
    explore: "to travel and discover",
    twist: "a surprising change"
  };
  return map[word] || "";
}
