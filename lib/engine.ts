import type { Language } from "@/lib/i18n";

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

const openingTemplatesByLang: Record<Language, string[]> = {
  en: [],
  zh: [
    "{hero} 来到了 {theme}。{location} 似乎藏着线索，{conflict} 需要被解决。",
    "{hero} 走向 {location}，心里很 {mood}。一段新的冒险开始了。",
    "{hero} 发现了 {conflict}，而 {location} 正在等待答案。"
  ],
  ms: [
    "{hero} tiba di {theme}. {location} menyimpan petunjuk, dan {conflict} perlu diselesaikan.",
    "{hero} bergerak ke {location} dengan hati yang {mood}. Pengembaraan bermula.",
    "{hero} menemui {conflict}, dan {location} menanti jawapan."
  ]
};

const themeLabelsByLang: Record<Language, Record<string, string>> = {
  en: {},
  zh: {
    "Magic Forest": "魔法森林",
    "Space School": "太空学校",
    "Ocean Quest": "海洋探险",
    "Dino Valley": "恐龙谷",
    "Sky Castle": "天空城堡",
    "Robot City": "机器人城市",
    "Candy Kingdom": "糖果王国",
    "Jungle Rescue": "丛林救援",
    "Ice Mountain": "冰雪山脉",
    "Desert Caravan": "沙漠商队"
  },
  ms: {
    "Magic Forest": "Hutan Ajaib",
    "Space School": "Sekolah Angkasa",
    "Ocean Quest": "Misi Lautan",
    "Dino Valley": "Lembah Dino",
    "Sky Castle": "Istana Langit",
    "Robot City": "Bandar Robot",
    "Candy Kingdom": "Kerajaan Gula-gula",
    "Jungle Rescue": "Misi Rimba",
    "Ice Mountain": "Gunung Ais",
    "Desert Caravan": "Kafilah Gurun"
  }
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

const choiceTemplatesByLang: Record<Language, string[]> = {
  en: choiceTemplates,
  zh: [
    "跟随 {clue} 去 {place}。",
    "请 {guide} 给出建议。",
    "先躲一躲，观察 {sign}。",
    "用 {tool} 解开一个小难题。",
    "帮助 {friend}，获得线索。",
    "绕个小路收集补给。",
    "在 {place} 附近制定计划。",
    "向 {friend} 许下一个善意的承诺。"
  ],
  ms: [
    "Ikuti {clue} ke {place}.",
    "Tanya {guide} untuk nasihat sebelum bergerak.",
    "Bersembunyi seketika dan perhati {sign}.",
    "Gunakan {tool} untuk selesaikan teka-teki kecil.",
    "Bantu {friend} dan dapatkan petunjuk.",
    "Ambil jalan kecil untuk kumpul bekalan.",
    "Rancang dengan teliti di dekat {place}.",
    "Buat janji baik dengan {friend}."
  ]
};

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

const moodWordsByLang: Record<Language, Record<Difficulty, string[]>> = {
  en: moodWords,
  zh: {
    Beginner: ["开心", "好奇", "勇敢", "平静"],
    Intermediate: ["充满希望", "专注", "兴奋", "稳重"],
    Advanced: ["坚定", "深思", "渴望", "自信"]
  },
  ms: {
    Beginner: ["gembira", "ingin tahu", "berani", "tenang"],
    Intermediate: ["berharap", "fokus", "teruja", "steady"],
    Advanced: ["bertekad", "berfikir", "bersemangat", "yakin"]
  }
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

const inventoryByThemeByLang: Record<Language, Record<string, string[]>> = {
  en: inventoryByTheme,
  zh: {
    "Magic Forest": ["发光的叶子", "风之护符", "银色钥匙"],
    "Space School": ["星际徽章", "重力通行证", "工具芯片"],
    "Ocean Quest": ["珍珠碎片", "贝壳号角", "潮汐罗盘"],
    "Dino Valley": ["叶子地图", "石头令牌", "雨之口哨"],
    "Sky Castle": ["云之钥匙", "星光丝带", "风笛"],
    "Robot City": ["能量电池", "信号芯片", "磁力环"],
    "Candy Kingdom": ["糖针袋", "软糖钥匙", "糖星"],
    "Jungle Rescue": ["探险绳", "救援口哨", "叶子徽章"],
    "Ice Mountain": ["暖光灯", "冰晶碎片", "雪之护符"],
    "Desert Caravan": ["绿洲地图", "日光石", "水壶"]
  },
  ms: {
    "Magic Forest": ["daun bercahaya", "azimat angin", "kunci perak"],
    "Space School": ["lencana bintang", "pas graviti", "cip alat"],
    "Ocean Quest": ["serpihan mutiara", "tanduk cangkerang", "kompas pasang surut"],
    "Dino Valley": ["peta daun", "token batu", "wisel hujan"],
    "Sky Castle": ["kunci awan", "riben bintang", "seruling angin"],
    "Robot City": ["sel kuasa", "cip isyarat", "cincin magnet"],
    "Candy Kingdom": ["beg taburan gula", "kunci gula-gula", "bintang gula"],
    "Jungle Rescue": ["tali jejak", "wisel penyelamat", "lencana daun"],
    "Ice Mountain": ["lampu hangat", "serpihan ais", "azimat salji"],
    "Desert Caravan": ["peta oasis", "batu matahari", "bekas air"]
  }
};

function pick<T>(items: T[], round: number) {
  return items[round % items.length];
}

export function createOpening(
  theme: string,
  difficulty: Difficulty,
  heroName?: string,
  lang: Language = "en"
) {
  const hero = heroName && heroName.trim().length > 0
    ? heroName.trim()
    : pick(heroByTheme[theme] || heroByTheme["Magic Forest"], 0);
  const location = pick(themeDetails[theme]?.place || themeDetails["Magic Forest"].place, 1);
  const moodPool = moodWordsByLang[lang]?.[difficulty] || moodWords[difficulty];
  const mood = pick(moodPool, 2);
  const conflict = pick(conflictByTheme[theme] || conflictByTheme["Magic Forest"], 3);

  const themeLabel = themeLabelsByLang[lang]?.[theme] || theme;
  const templates =
    lang === "en" ? openings[theme] || openings["Magic Forest"] : openingTemplatesByLang[lang];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const opening = template
    .replace("{hero}", hero)
    .replace("{location}", location)
    .replace("{mood}", mood)
    .replace("{conflict}", conflict)
    .replace("{theme}", themeLabel);

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
  conflict?: string,
  lang: Language = "en"
) {
  const pool = themeDetails[theme] || themeDetails["Magic Forest"];
  const templateList = choiceTemplatesByLang[lang] || choiceTemplates;
  const template = templateList[round % templateList.length];

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

  const question = buildQuestion(lang, hero || "the hero", conflict || "the mystery");

  return {
    question,
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

function buildQuestion(lang: Language, hero: string, conflict: string) {
  if (lang === "zh") {
    return `${hero} 接下来该怎么做，才能解决“${conflict}”？`;
  }
  if (lang === "ms") {
    return `Apa langkah seterusnya ${hero} untuk selesaikan ${conflict}?`;
  }
  return `What should ${hero} do next to solve ${conflict}?`;
}

export function updateStory(
  story: string,
  choiceText: string,
  userLine: string | undefined,
  round: number,
  scene?: { hero: string; location: string; mood: string; conflict: string },
  theme?: string,
  choiceId?: string,
  lang: Language = "en"
) {
  const narrative = narrateChoice(choiceText, round, scene, choiceId, lang);
  const transition = buildSceneTransition(round, scene, lang);
  const event = buildRandomEvent(round, theme, lang);
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
  choiceId?: string,
  lang: Language = "en"
) {
  const hero = scene?.hero || "The hero";
  const mood = scene?.mood || "brave";
  const beat = storyBeats[(round - 1) % storyBeats.length];
  const base = `${hero} decided to ${lowerFirst(choiceText)}`;

  const consequence = consequenceLine(beat, scene, choiceId, round, lang);

  if (lang === "zh") {
    const styles = [
      `${hero} 决定 ${lowerFirst(choiceText)}。${consequence}`,
      `${hero} 心里很 ${mood}，于是 ${lowerFirst(choiceText)}。${consequence}`,
      `下一步很清楚：${lowerFirst(choiceText)}。${consequence}`,
      `${hero} 深吸一口气，${lowerFirst(choiceText)}。${consequence}`
    ];
    return styles[round % styles.length];
  }
  if (lang === "ms") {
    const styles = [
      `${hero} memilih untuk ${lowerFirst(choiceText)}. ${consequence}`,
      `Dengan hati yang ${mood}, ${hero} memilih untuk ${lowerFirst(choiceText)}. ${consequence}`,
      `Langkah seterusnya jelas: ${lowerFirst(choiceText)}. ${consequence}`,
      `${hero} menarik nafas dan ${lowerFirst(choiceText)}. ${consequence}`
    ];
    return styles[round % styles.length];
  }
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
  scene?: { hero: string; location: string; mood: string; conflict: string },
  lang: Language = "en"
) {
  const hero = scene?.hero || "The hero";
  const location = scene?.location || "a hidden place";
  const conflict = scene?.conflict || "a small mystery";
  const beat = storyBeats[(round - 1) % storyBeats.length];

  const transitionsEn: Record<string, string[]> = {
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

  if (lang === "zh") {
    const transitionsZh: Record<string, string[]> = {
      setup: [
        `${hero} 在 ${location} 附近停下来四处看看。`,
        `${location} 附近的空气很新鲜。`,
        `${hero} 听得很仔细，冒险开始了。`
      ],
      first_clue: [
        `${location} 旁出现了一个小线索。`,
        `有东西闪了一下，提示下一步。`,
        `一个轻轻的声音提醒去哪里找。`
      ],
      small_obstacle: [
        `前方出现了小障碍。`,
        `道路变窄，让选择更重要。`,
        `一个小挑战让 ${hero} 想了想。`
      ],
      new_friend: [
        `一个新朋友出现，带来好主意。`,
        `有人愿意帮忙带路。`,
        `友善的伙伴准备帮助。`
      ],
      twist: [
        `突然，计划发生了小转折。`,
        `${conflict} 变得更棘手了。`,
        `线索指向了新方向。`
      ],
      rising_action: [
        `冒险越来越精彩。`,
        `${hero} 感到任务更紧要。`,
        `下一步显得非常关键。`
      ],
      setback: [
        `一个小挫折拖慢了进度。`,
        `事情没有按计划进行。`,
        `小失误让道路更难。`
      ],
      breakthrough: [
        `突然出现了突破口。`,
        `一个聪明的点子打开了新路。`,
        `${hero} 发现了别人没看到的线索。`
      ],
      final_push: [
        `最后的冲刺就在眼前。`,
        `${hero} 几乎看到了答案。`,
        `再做一个好选择就能解决。`
      ],
      resolution: [
        `旅程准备迎来最终答案。`,
        `一切都在走向清晰的结局。`,
        `冒险马上就要揭晓。`
      ]
    };
    return pick(transitionsZh[beat], round);
  }

  if (lang === "ms") {
    const transitionsMs: Record<string, string[]> = {
      setup: [
        `${hero} berhenti dekat ${location} dan melihat sekeliling.`,
        `Udara terasa baharu di sekitar ${location}.`,
        `${hero} mendengar dengan teliti, pengembaraan bermula.`
      ],
      first_clue: [
        `Petunjuk kecil muncul di ${location}.`,
        `Sesuatu berkilau dan memberi arah seterusnya.`,
        `Bunyi lembut memberi petanda ke mana hendak pergi.`
      ],
      small_obstacle: [
        `Halangan kecil menghalang jalan.`,
        `Laluan menjadi sempit dan pilihan penting.`,
        `Cabaran kecil membuat ${hero} berfikir.`
      ],
      new_friend: [
        `Rakan baharu muncul dengan idea baik.`,
        `Seseorang yang baik hati menawarkan bantuan.`,
        `Pembantu mesra bersedia membantu.`
      ],
      twist: [
        `Tiba-tiba, rancangan berubah.`,
        `${conflict} terasa lebih besar sekarang.`,
        `Petunjuk menunjuk ke arah baharu.`
      ],
      rising_action: [
        `Pengembaraan semakin mendebarkan.`,
        `${hero} merasakan taruhannya meningkat.`,
        `Langkah seterusnya terasa sangat penting.`
      ],
      setback: [
        `Halangan kecil melambatkan kemajuan.`,
        `Perkara tidak berjalan seperti dirancang.`,
        `Kesilapan kecil menjadikan laluan lebih sukar.`
      ],
      breakthrough: [
        `Kemudian muncul satu kejayaan kecil.`,
        `Idea bijak membuka laluan baharu.`,
        `${hero} melihat sesuatu yang orang lain terlepas.`
      ],
      final_push: [
        `Pecutan terakhir semakin hampir.`,
        `${hero} hampir nampak jawapannya.`,
        `Satu pilihan bijak lagi boleh selesaikan semuanya.`
      ],
      resolution: [
        `Perjalanan sudah sampai ke jawapan akhir.`,
        `Semuanya menuju pengakhiran yang jelas.`,
        `Pengembaraan hampir selesai.`
      ]
    };
    return pick(transitionsMs[beat], round);
  }

  return pick(transitionsEn[beat], round);
}

function buildRandomEvent(round: number, theme?: string, lang: Language = "en") {
  if (round % 3 !== 0) return "";
  if (lang === "zh") {
    const events = [
      "一个小小的惊喜出现了。",
      "空气里闪过一丝光。",
      "远处传来一声提示。"
    ];
    return pick(events, round);
  }
  if (lang === "ms") {
    const events = [
      "Satu kejutan kecil muncul.",
      "Cahaya kecil berkelip.",
      "Bunyi lembut memberi petanda."
    ];
    return pick(events, round);
  }
  const events = eventByTheme[theme || "Magic Forest"] || eventByTheme["Magic Forest"];
  return pick(events, round);
}

function consequenceLine(
  beat: string,
  scene: { hero: string; location: string; mood: string; conflict: string } | undefined,
  choiceId: string | undefined,
  round: number,
  lang: Language = "en"
) {
  const hero = scene?.hero || "The hero";
  const location = scene?.location || "the place";
  const conflict = scene?.conflict || "the mystery";
  const mood = scene?.mood || "brave";
  const letter = choiceId || ["A", "B", "C"][round % 3];

  const consequencesEn: Record<string, string[]> = {
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

  if (lang === "zh") {
    const consequencesZh: Record<string, string[]> = {
      setup: [
        `${hero} 觉得很 ${mood}，注意到了一个细节。`,
        `这个选择打开了通往 ${location} 的道路。`,
        `一个小提示告诉如何解决 ${conflict}。`
      ],
      first_clue: [
        `线索 ${letter} 露出了隐藏的标记。`,
        `地面上出现了神秘符号。`,
        `小路闪了一下。`
      ],
      small_obstacle: [
        `这样避开了陷阱，但花了更多时间。`,
        `道路很窄，${hero} 还是通过了。`,
        `障碍带来了新的问题。`
      ],
      new_friend: [
        `新朋友给出了快速的计划。`,
        `伙伴答应帮助 ${hero}。`,
        `他们一起更有信心。`
      ],
      twist: [
        `转折揭示了新的目标。`,
        `原来线索只对了一半。`,
        `另一条路变得更重要。`
      ],
      rising_action: [
        `任务变得更紧急了。`,
        `${hero} 感到终点越来越近。`,
        `每一步都更重要。`
      ],
      setback: [
        `这让 ${conflict} 更难了一点。`,
        `一个错误的转弯拖慢了速度。`,
        `需要勇气继续前进。`
      ],
      breakthrough: [
        `答案开始出现了。`,
        `一个聪明的点子点亮了道路。`,
        `线索终于对上了。`
      ],
      final_push: [
        `${hero} 鼓起勇气准备最后一步。`,
        `最后的线索指向前方。`,
        `只剩最后一个选择了。`
      ],
      resolution: [
        `一切终于串起来了。`,
        `这个选择解决了 ${conflict} 的核心。`,
        `${hero} 感到自豪又平静。`
      ]
    };
    return pick(consequencesZh[beat], round + (letter.charCodeAt(0) % 3));
  }

  if (lang === "ms") {
    const consequencesMs: Record<string, string[]> = {
      setup: [
        `${hero} berasa ${mood} dan nampak satu petunjuk penting.`,
        `Pilihan itu membuka jalan ke ${location}.`,
        `Tanda kecil menunjukkan cara selesaikan ${conflict}.`
      ],
      first_clue: [
        `Petunjuk ${letter} mendedahkan tanda tersembunyi.`,
        `Simbol rahsia muncul di tanah.`,
        `Laluan berkilau seketika.`
      ],
      small_obstacle: [
        `Ia mengelak perangkap tetapi ambil masa.`,
        `Laluan sempit, namun ${hero} berjaya.`,
        `Halangan mencipta soalan baharu.`
      ],
      new_friend: [
        `Rakan baharu berkongsi pelan pantas.`,
        `Rakan baharu berjanji membantu ${hero}.`,
        `Bersama, mereka lebih yakin.`
      ],
      twist: [
        `Twist mendedahkan sasaran baharu.`,
        `Rupa-rupanya petunjuk itu separuh benar.`,
        `Jalan lain tiba-tiba lebih penting.`
      ],
      rising_action: [
        `Misi terasa semakin mendesak.`,
        `${hero} rasa hampir ke penghujung.`,
        `Setiap langkah kini lebih penting.`
      ],
      setback: [
        `Ini menjadikan ${conflict} lebih sukar seketika.`,
        `Belokan salah melambatkan pasukan.`,
        `Perlu keberanian untuk teruskan.`
      ],
      breakthrough: [
        `Penyelesaian mula muncul.`,
        `Idea bijak menerangi jalan.`,
        `Kepingan akhirnya sepadan.`
      ],
      final_push: [
        `${hero} kumpul keberanian untuk langkah terakhir.`,
        `Petunjuk akhir menunjuk ke hadapan.`,
        `Tinggal satu pilihan untuk selesai.`
      ],
      resolution: [
        `Semuanya bersambung akhirnya.`,
        `Pilihan itu menyelesaikan ${conflict}.`,
        `${hero} berasa bangga dan tenang.`
      ]
    };
    return pick(consequencesMs[beat], round + (letter.charCodeAt(0) % 3));
  }

  return pick(consequencesEn[beat], round + (letter.charCodeAt(0) % 3));
}

export function inventoryReward(
  theme: string,
  round: number,
  choiceId: string,
  lang: Language = "en"
) {
  const items =
    inventoryByThemeByLang[lang]?.[theme] ||
    inventoryByThemeByLang[lang]?.["Magic Forest"] ||
    inventoryByTheme[theme] ||
    inventoryByTheme["Magic Forest"];
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
  branch: "A" | "B" | "C",
  lang: Language = "en"
) {
  const endingsEn: Record<string, Record<string, string>> = {
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

  const endingsZh: Record<string, Record<string, string>> = {
    "Magic Forest": {
      A: "狐狸打开了隐藏的门，森林为勇敢的选择欢呼。",
      B: "猫头鹰带主角回家，证明求助是聪明的。",
      C: "安静的计划成功了，森林重新闪亮。"
    },
    "Space School": {
      A: "徽章在星际实验室找到，任务成功了。",
      B: "队长夸奖了细心合作的团队。",
      C: "意外的捷径拯救了今天。"
    },
    "Ocean Quest": {
      A: "珍珠碎片点亮了灯塔，小镇欢呼。",
      B: "海龟给出最后线索，大海又平静了。",
      C: "隐藏的洋流带来安全的答案。"
    },
    "Dino Valley": {
      A: "巨人收到了消息，发出感激的吼声。",
      B: "智慧的向导为周到的计划点赞。",
      C: "聪明的绕行让问题及时解决。"
    }
  };

  const endingsMs: Record<string, Record<string, string>> = {
    "Magic Forest": {
      A: "Rubah membuka pintu rahsia dan hutan meraikan pilihan berani.",
      B: "Burung hantu memandu wira pulang, membuktikan meminta bantuan itu bijak.",
      C: "Rancangan yang tenang berjaya, hutan kembali bercahaya."
    },
    "Space School": {
      A: "Lencana ditemui di makmal bintang, misi berjaya.",
      B: "Kapten memuji kerja berpasukan yang teliti.",
      C: "Jalan pintas mengejutkan menyelamatkan hari."
    },
    "Ocean Quest": {
      A: "Serpihan mutiara menyalakan rumah api dan bandar bersorak.",
      B: "Penyu berkongsi petunjuk akhir, laut kembali tenang.",
      C: "Arus tersembunyi membawa jawapan dengan selamat."
    },
    "Dino Valley": {
      A: "Gergasi menerima pesan dan mengaum tanda terima kasih.",
      B: "Pemandu bijak memuji pelan yang rapi.",
      C: "Lencongan bijak menyelesaikan masalah tepat pada masanya."
    }
  };

  const endingText =
    (lang === "zh" ? endingsZh : lang === "ms" ? endingsMs : endingsEn)[theme]?.[branch] ||
    (lang === "zh"
      ? "主角用勇气和善意解决了谜题。"
      : lang === "ms"
      ? "Wira menyelesaikan misteri dengan berani dan baik hati."
      : "The hero solved the mystery with courage and kindness.");

  const ending =
    lang === "zh"
      ? `\n\n最后，${endingText}`
      : lang === "ms"
      ? `\n\nAkhirnya, ${endingText}`
      : `\n\nIn the end, ${endingText}`;

  const themeLabel = themeLabelsByLang[lang]?.[theme] || theme;
  const title =
    lang === "zh"
      ? `${themeLabel}：最终火花`
      : lang === "ms"
      ? `${themeLabel}: Percikan Akhir`
      : `${theme}: The Final Spark`;

  const moral =
    lang === "zh"
      ? "勇敢、愿意求助，并守信用。"
      : lang === "ms"
      ? "Berani, minta bantuan, dan tepati janji."
      : "Be brave, ask for help, and keep your promises.";

  return {
    title,
    fullStory: story + ending,
    moral
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

export function feedbackForScore(score: number, lang: Language = "en") {
  if (lang === "zh") {
    if (score >= 15) {
      return [
        "太棒了！你的故事很连贯也很精彩。",
        "下次可以加一些情感词，让故事更闪亮。"
      ];
    }
    if (score >= 12) {
      return [
        "做得很好！你的故事有清晰的目标。",
        "加一个小惊喜会更有创意。"
      ];
    }
    return [
      "不错的开始！你完成了冒险。",
      "试着用目标词汇来拿更多星星。"
    ];
  }
  if (lang === "ms") {
    if (score >= 15) {
      return [
        "Hebat! Cerita kamu jelas dan sangat menarik.",
        "Cuba tambah lebih banyak kata perasaan pada kali seterusnya."
      ];
    }
    if (score >= 12) {
      return [
        "Bagus! Cerita kamu masuk akal dan ada matlamat jelas.",
        "Tambah satu kejutan kecil untuk kreativiti."
      ];
    }
    return [
      "Permulaan yang baik! Kamu menamatkan pengembaraan.",
      "Cuba guna kata sasaran untuk lebih bintang."
    ];
  }
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

export function suggestedVocab(targetWords: string[], lang: Language = "en") {
  return targetWords.map((word) => ({
    word,
    meaningEn: meaningForWord(word, lang),
    example:
      lang === "zh"
        ? `“${word}” 的光指引了道路。`
        : lang === "ms"
        ? `Cahaya “${word}” membimbing jalan.`
        : `The ${word} light guided the way.`
  }));
}

function meaningForWord(word: string, lang: Language = "en") {
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
  const zh: Record<string, string> = {
    brave: "勇敢的",
    glow: "发光",
    soft: "柔软的",
    help: "帮助",
    friend: "朋友",
    safe: "安全的",
    suddenly: "突然地",
    whisper: "低声说",
    curious: "好奇的",
    path: "小路",
    promise: "承诺",
    gentle: "温和的",
    mysterious: "神秘的",
    strategy: "策略",
    resolve: "决心",
    glimmer: "微光",
    explore: "探索",
    twist: "转折"
  };
  const ms: Record<string, string> = {
    brave: "berani",
    glow: "bercahaya",
    soft: "lembut",
    help: "membantu",
    friend: "kawan",
    safe: "selamat",
    suddenly: "tiba-tiba",
    whisper: "berbisik",
    curious: "ingin tahu",
    path: "laluan",
    promise: "janji",
    gentle: "lembut dan baik",
    mysterious: "misteri",
    strategy: "strategi",
    resolve: "tekad",
    glimmer: "kilauan kecil",
    explore: "meneroka",
    twist: "kejutan"
  };
  if (lang === "zh") return zh[word] || "";
  if (lang === "ms") return ms[word] || "";
  return map[word] || "";
}
