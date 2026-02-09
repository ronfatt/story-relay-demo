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
  "Fairy Circus": [
    "{hero} found a ticket to the Fairy Circus. The {location} sparkled with lanterns, and {conflict} needed a kind solution.",
    "A tiny drumbeat led {hero} to the {location}. The circus felt {mood}, and a fairy guide waved hello.",
    "{hero} spotted {conflict} near the {location}. A rainbow ribbon floated by with a clue."
  ],
  "Pirate Cove": [
    "{hero} stepped into Pirate Cove with a folded map. The {location} was marked with an X, and {conflict} needed a brave choice.",
    "Seagulls circled as {hero} reached the {location}. The cove felt {mood}, and a friendly pirate tipped a hat.",
    "{hero} noticed {conflict} near the {location}. A bottle bobbed with a secret note."
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
  "Toy Town": [
    "{hero} arrived at Toy Town where gears clicked softly. The {location} blinked with a clue, and {conflict} needed a quick fix.",
    "A toy train guided {hero} to the {location}. The town felt {mood}, and a teddy waved hello.",
    "{hero} found {conflict} near the {location}. A wind-up key shimmered in the light."
  ],
  "Rainbow Ranch": [
    "{hero} rode into Rainbow Ranch under a bright sky. The {location} shimmered with color, and {conflict} needed a gentle plan.",
    "A friendly pony led {hero} to the {location}. The ranch felt {mood}, and a bell chimed softly.",
    "{hero} noticed {conflict} near the {location}. A rainbow ribbon marked the path."
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
  ],
  "Marvel World": [
    "{hero} stepped into Marvel World where the {location} flashed with signals. {conflict} needed a heroic plan.",
    "A bright beacon led {hero} to the {location}. The city felt {mood}, and a hero squad stood ready.",
    "{hero} found {conflict} near the {location}. A glowing emblem pointed the way."
  ],
  "DC World": [
    "{hero} entered DC World as the {location} lit up. {conflict} needed a brave choice tonight.",
    "A signal shined over the {location}. The streets felt {mood}, and a hero team watched the sky.",
    "{hero} spotted {conflict} near the {location}. A cape fluttered with a clue."
  ],
  "Kpop Demon Hunter World": [
    "{hero} arrived at Kpop Demon Hunter World. The {location} glowed like a stage, and {conflict} needed a careful plan.",
    "A beat pulsed toward the {location}. The night felt {mood}, and a hunter crew tuned up.",
    "{hero} noticed {conflict} near the {location}. A neon charm pointed the way."
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
    "Fairy Circus": "仙子马戏团",
    "Pirate Cove": "海盗小湾",
    "Sky Castle": "天空城堡",
    "Robot City": "机器人城市",
    "Candy Kingdom": "糖果王国",
    "Toy Town": "玩具小镇",
    "Rainbow Ranch": "彩虹牧场",
    "Jungle Rescue": "丛林救援",
    "Ice Mountain": "冰雪山脉",
    "Desert Caravan": "沙漠商队",
    "Marvel World": "漫威世界",
    "DC World": "DC 世界",
    "Kpop Demon Hunter World": "Kpop 猎魔世界"
  },
  ms: {
    "Magic Forest": "Hutan Ajaib",
    "Space School": "Sekolah Angkasa",
    "Ocean Quest": "Misi Lautan",
    "Dino Valley": "Lembah Dino",
    "Fairy Circus": "Sarkas Pari-pari",
    "Pirate Cove": "Teluk Lanun",
    "Sky Castle": "Istana Langit",
    "Robot City": "Bandar Robot",
    "Candy Kingdom": "Kerajaan Gula-gula",
    "Toy Town": "Bandar Mainan",
    "Rainbow Ranch": "Ranch Pelangi",
    "Jungle Rescue": "Misi Rimba",
    "Ice Mountain": "Gunung Ais",
    "Desert Caravan": "Kafilah Gurun",
    "Marvel World": "Dunia Marvel",
    "DC World": "Dunia DC",
    "Kpop Demon Hunter World": "Dunia Pemburu Iblis Kpop"
  }
};

const targetWordPoolsByLang: Record<Language, Record<Difficulty, string[]>> = {
  en: {
    Beginner: ["eat", "go", "run", "sleep", "drink", "look"],
    Intermediate: ["because", "then", "key", "door", "find", "help"],
    Advanced: ["mysterious", "strategy", "resolve", "glimmer", "explore", "twist"]
  },
  zh: {
    Beginner: ["吃", "走", "跑", "睡", "水", "看"],
    Intermediate: ["因为", "然后", "钥匙", "门", "找到", "帮忙"],
    Advanced: ["神秘", "策略", "决心", "微光", "探索", "转折"]
  },
  ms: {
    Beginner: ["makan", "pergi", "lari", "tidur", "minum", "lihat"],
    Intermediate: ["kerana", "kemudian", "kunci", "pintu", "jumpa", "bantu"],
    Advanced: ["misteri", "strategi", "tekad", "kilauan", "meneroka", "kejutan"]
  }
};

const beginnerActionsByLang: Record<Language, Record<string, string[]>> = {
  en: {
    "Magic Forest": [
      "Look at a tree",
      "Pick a flower",
      "Go outside",
      "Run fast",
      "Drink water",
      "Sit under a tree",
      "Wave to a friend",
      "Go home"
    ],
    "Space School": [
      "Press a button",
      "Go to class",
      "Look at a star",
      "Wave to a robot",
      "Open the locker",
      "Run to the door",
      "Drink water",
      "Sit down"
    ],
    "Ocean Quest": [
      "Swim in water",
      "Look at a fish",
      "Pick a shell",
      "Wave to a dolphin",
      "Go to shore",
      "Jump in water",
      "Drink water",
      "Sit on the boat"
    ],
    "Dino Valley": [
      "Look at a dino",
      "Run fast",
      "Pick a leaf",
      "Wave to a dino",
      "Go to the hill",
      "Jump on a log",
      "Drink water",
      "Sit by a rock"
    ],
    "Fairy Circus": [
      "Wave to a fairy",
      "Look at a light",
      "Pick a ribbon",
      "Go to the tent",
      "Run to the stage",
      "Open a box",
      "Drink water",
      "Sit down"
    ],
    "Pirate Cove": [
      "Look at the map",
      "Wave to a pirate",
      "Pick a shell",
      "Go to the boat",
      "Run to the dock",
      "Open a chest",
      "Drink water",
      "Sit down"
    ],
    "Sky Castle": [
      "Go to the bridge",
      "Look at a cloud",
      "Pick a star",
      "Wave to a bird",
      "Run on the path",
      "Open a door",
      "Drink water",
      "Sit down"
    ],
    "Robot City": [
      "Press a button",
      "Wave to a robot",
      "Look at a light",
      "Pick a part",
      "Go to the gate",
      "Open a door",
      "Drink water",
      "Sit down"
    ],
    "Candy Kingdom": [
      "Eat a candy",
      "Pick a sweet",
      "Go outside",
      "Wave to a friend",
      "Run to the gate",
      "Look at a cake",
      "Drink water",
      "Sit down"
    ],
    "Toy Town": [
      "Look at a toy",
      "Wave to a doll",
      "Pick a key",
      "Go to the shop",
      "Run to the bell",
      "Open a box",
      "Drink water",
      "Sit down"
    ],
    "Rainbow Ranch": [
      "Look at a pony",
      "Wave to a friend",
      "Pick a flower",
      "Go to the barn",
      "Run to the gate",
      "Open a door",
      "Drink water",
      "Sit down"
    ],
    "Jungle Rescue": [
      "Look at a tree",
      "Go to the river",
      "Wave to a bird",
      "Pick a leaf",
      "Run fast",
      "Call a friend",
      "Drink water",
      "Sit down"
    ],
    "Ice Mountain": [
      "Look at the snow",
      "Go to the cave",
      "Pick a stone",
      "Wave to a friend",
      "Run to the hill",
      "Open the gate",
      "Drink water",
      "Sit down"
    ],
    "Desert Caravan": [
      "Look at the sand",
      "Go to the tent",
      "Pick a stone",
      "Wave to a camel",
      "Run to the gate",
      "Open the bag",
      "Drink water",
      "Sit down"
    ],
    "Marvel World": [
      "Look at a badge",
      "Wave to a hero",
      "Pick a map",
      "Go to the tower",
      "Run to the gate",
      "Open a door",
      "Drink water",
      "Sit down"
    ],
    "DC World": [
      "Look at a light",
      "Wave to a hero",
      "Pick a note",
      "Go to the roof",
      "Run to the gate",
      "Open a door",
      "Drink water",
      "Sit down"
    ],
    "Kpop Demon Hunter World": [
      "Look at the stage",
      "Wave to a singer",
      "Pick a charm",
      "Go to the hall",
      "Run to the gate",
      "Open a case",
      "Drink water",
      "Sit down"
    ]
  },
  zh: {
    "*": [
      "看看",
      "出去",
      "跑一跑",
      "喝水",
      "坐下",
      "打招呼",
      "捡起来",
      "去那边"
    ]
  },
  ms: {
    "*": [
      "Lihat sekeliling",
      "Pergi keluar",
      "Lari laju",
      "Minum air",
      "Duduk dulu",
      "Sapa kawan",
      "Ambil benda",
      "Pergi ke sana"
    ]
  }
};

const intermediateActionsByLang: Record<Language, string[]> = {
  en: [
    "Look for a key",
    "Check the small door",
    "Ask a friend for help",
    "Follow the quiet path",
    "Open the old box",
    "Go to the bridge",
    "Look under the table",
    "Wait for a sound"
  ],
  zh: [
    "找一找钥匙",
    "看看那扇门",
    "请朋友帮忙",
    "跟着小路走",
    "打开小盒子",
    "去桥那边",
    "看看桌子下",
    "等一等声音"
  ],
  ms: [
    "Cari kunci kecil",
    "Lihat pintu kecil",
    "Minta kawan bantu",
    "Ikut laluan sunyi",
    "Buka kotak lama",
    "Pergi ke jambatan",
    "Lihat bawah meja",
    "Tunggu bunyi"
  ]
};

const beginnerOpeningsByLang: Record<Language, string[]> = {
  en: [
    "{hero} is in {theme}.",
    "{hero} sees {location}.",
    "{hero} is {mood}.",
    "It is morning."
  ],
  zh: [
    "{hero} 在 {theme}。",
    "{hero} 看到 {location}。",
    "{hero} 很 {mood}。",
    "现在是早上。"
  ],
  ms: [
    "{hero} di {theme}.",
    "{hero} nampak {location}.",
    "{hero} rasa {mood}.",
    "Sekarang pagi."
  ]
};

const intermediateOpeningsByLang: Record<Language, string[]> = {
  en: [
    "{hero} is in {theme} today.",
    "{hero} sees {location} right nearby.",
    "A small problem is here to solve.",
    "{hero} feels {mood} and looks around."
  ],
  zh: [
    "{hero} 今天在 {theme}。",
    "{hero} 看到 {location} 就在附近。",
    "这里有个小问题要解决。",
    "{hero} 有点 {mood}，四处看看。"
  ],
  ms: [
    "{hero} di {theme} hari ini.",
    "{hero} nampak {location} dekat sini.",
    "Ada masalah kecil untuk diselesaikan.",
    "{hero} rasa {mood} dan melihat sekeliling."
  ]
};

const beginnerLocationsByLang: Record<Language, Record<string, string[]>> = {
  en: {
    "Magic Forest": ["a tree", "a pond", "a path"],
    "Space School": ["a door", "a desk", "a star"],
    "Ocean Quest": ["the sea", "a shell", "a boat"],
    "Dino Valley": ["a hill", "a rock", "a leaf"],
    "Fairy Circus": ["a tent", "a ribbon", "a light"],
    "Pirate Cove": ["a boat", "a map", "a dock"],
    "Sky Castle": ["a bridge", "a cloud", "a tower"],
    "Robot City": ["a light", "a gate", "a robot"],
    "Candy Kingdom": ["a cake", "a sweet", "a road"],
    "Toy Town": ["a toy", "a bell", "a shop"],
    "Rainbow Ranch": ["a pony", "a barn", "a flower"],
    "Jungle Rescue": ["a tree", "a river", "a bird"],
    "Ice Mountain": ["the snow", "a cave", "a rock"],
    "Desert Caravan": ["the sand", "a tent", "a camel"],
    "Marvel World": ["a tower", "a badge", "a door"],
    "DC World": ["a light", "a roof", "a door"],
    "Kpop Demon Hunter World": ["a stage", "a charm", "a hall"]
  },
  zh: {
    "Magic Forest": ["一棵树", "一个小湖", "一条路"],
    "Space School": ["一扇门", "一张桌", "一颗星"],
    "Ocean Quest": ["大海", "一个贝壳", "一条船"],
    "Dino Valley": ["一座小山", "一块石头", "一片叶子"],
    "Fairy Circus": ["一座帐篷", "一条彩带", "一盏灯"],
    "Pirate Cove": ["一条船", "一张地图", "一个码头"],
    "Sky Castle": ["一座桥", "一朵云", "一座塔"],
    "Robot City": ["一盏灯", "一扇门", "一个机器人"],
    "Candy Kingdom": ["一块蛋糕", "一颗糖", "一条路"],
    "Toy Town": ["一个玩具", "一只铃", "一间小店"],
    "Rainbow Ranch": ["一匹小马", "一个马厩", "一朵花"],
    "Jungle Rescue": ["一棵树", "一条河", "一只鸟"],
    "Ice Mountain": ["一片雪", "一个洞", "一块石头"],
    "Desert Caravan": ["一片沙", "一座帐篷", "一只骆驼"],
    "Marvel World": ["一座塔", "一个徽章", "一扇门"],
    "DC World": ["一盏灯", "一座屋顶", "一扇门"],
    "Kpop Demon Hunter World": ["一个舞台", "一个护符", "一间大厅"]
  },
  ms: {
    "Magic Forest": ["sebatang pokok", "sebuah kolam", "sebuah laluan"],
    "Space School": ["sebuah pintu", "sebuah meja", "sebuah bintang"],
    "Ocean Quest": ["laut", "sebuah cangkerang", "sebuah bot"],
    "Dino Valley": ["sebuah bukit", "sebuah batu", "sehelai daun"],
    "Fairy Circus": ["sebuah khemah", "sehelai reben", "sebuah lampu"],
    "Pirate Cove": ["sebuah bot", "sebuah peta", "sebuah jeti"],
    "Sky Castle": ["sebuah jambatan", "sebuah awan", "sebuah menara"],
    "Robot City": ["sebuah lampu", "sebuah pintu", "sebuah robot"],
    "Candy Kingdom": ["sebuah kek", "sebiji gula-gula", "sebuah jalan"],
    "Toy Town": ["sebuah mainan", "sebuah loceng", "sebuah kedai"],
    "Rainbow Ranch": ["seekor kuda poni", "sebuah kandang", "sekuntum bunga"],
    "Jungle Rescue": ["sebatang pokok", "sebuah sungai", "seekor burung"],
    "Ice Mountain": ["salji", "sebuah gua", "sebuah batu"],
    "Desert Caravan": ["pasir", "sebuah khemah", "seekor unta"],
    "Marvel World": ["sebuah menara", "sebuah lencana", "sebuah pintu"],
    "DC World": ["sebuah lampu", "sebuah bumbung", "sebuah pintu"],
    "Kpop Demon Hunter World": ["sebuah pentas", "sebuah azimat", "sebuah dewan"]
  }
};

const beginnerConflictsByLang: Record<Language, Record<string, string[]>> = {
  en: {
    "Magic Forest": ["the gate is closed", "a light is off", "a path is blocked"],
    "Space School": ["the door is closed", "a light is off", "a key is missing"],
    "Ocean Quest": ["the boat is stuck", "a shell is lost", "the path is closed"],
    "Dino Valley": ["the bridge is down", "a map is lost", "a path is blocked"],
    "Fairy Circus": ["the gate is closed", "a light is off", "a path is blocked"],
    "Pirate Cove": ["the gate is closed", "a map is lost", "the path is blocked"],
    "Sky Castle": ["the gate is closed", "a bell is quiet", "a path is blocked"],
    "Robot City": ["the light is off", "the door is closed", "a part is missing"],
    "Candy Kingdom": ["the gate is closed", "a sweet is lost", "the path is blocked"],
    "Toy Town": ["the gate is closed", "a key is missing", "the path is blocked"],
    "Rainbow Ranch": ["the gate is closed", "a bell is quiet", "the path is blocked"],
    "Jungle Rescue": ["the bridge is down", "a friend is lost", "a path is blocked"],
    "Ice Mountain": ["the gate is closed", "a light is off", "a path is blocked"],
    "Desert Caravan": ["the gate is closed", "a map is lost", "a path is blocked"],
    "Marvel World": ["the gate is closed", "a badge is lost", "the path is blocked"],
    "DC World": ["the gate is closed", "a light is off", "a path is blocked"],
    "Kpop Demon Hunter World": ["the gate is closed", "a charm is lost", "the path is blocked"]
  },
  zh: {
    "*": ["门关着", "路被挡住了", "灯不亮"]
  },
  ms: {
    "*": ["pintu tertutup", "laluan terhalang", "lampu tidak menyala"]
  }
};

const intermediateConflictsByLang: Record<Language, Record<string, string[]>> = {
  en: {
    "Magic Forest": ["a small gate is locked", "a path is hard to see", "a bell is silent"],
    "Space School": ["a small door is locked", "a badge is missing", "a room is quiet"],
    "Ocean Quest": ["a tide gate is stuck", "a pearl is missing", "a path is hidden"],
    "Dino Valley": ["a bridge is shaky", "a map is missing", "a trail is faint"],
    "Fairy Circus": ["a tent is closed", "a light is dim", "a ribbon is missing"],
    "Pirate Cove": ["a map is missing", "a dock is quiet", "a trail is faint"],
    "Sky Castle": ["a sky gate is locked", "a bell is silent", "a bridge is faint"],
    "Robot City": ["a light is weak", "a door is locked", "a part is missing"],
    "Candy Kingdom": ["a gate is sticky", "a sweet is missing", "a bridge is weak"],
    "Toy Town": ["a switch is stuck", "a key is missing", "a door is locked"],
    "Rainbow Ranch": ["a gate is latched", "a bell is quiet", "a path is faint"],
    "Jungle Rescue": ["a trail is hidden", "a call is faint", "a bridge is down"],
    "Ice Mountain": ["a gate is frozen", "a path is slippery", "a light is dim"],
    "Desert Caravan": ["a map is missing", "a path is unclear", "a gate is closed"],
    "Marvel World": ["a signal is weak", "a gate is locked", "a clue is missing"],
    "DC World": ["a light is dim", "a gate is locked", "a clue is missing"],
    "Kpop Demon Hunter World": ["a stage is quiet", "a charm is missing", "a path is faint"]
  },
  zh: {
    "*": ["一扇小门锁着", "小路不清楚", "线索不见了"]
  },
  ms: {
    "*": ["pintu kecil berkunci", "laluan tidak jelas", "petunjuk hilang"]
  }
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
  "Fairy Circus": {
    clue: ["glitter ribbon", "sparkle dust", "tiny ticket"],
    place: ["big top tent", "lantern ring", "stage gate"],
    guide: ["circus fairy", "bubble clown", "tiny owl"],
    sign: ["soft drum", "twinkling light", "floating confetti"],
    tool: ["star whistle", "glow wand", "music charm"],
    friend: ["lost fairy", "tiny dancer", "glow rabbit"]
  },
  "Pirate Cove": {
    clue: ["rusty compass", "inked map", "shell token"],
    place: ["hidden dock", "ship deck", "cave gate"],
    guide: ["kind captain", "parrot scout", "dock guide"],
    sign: ["sea breeze", "lantern glow", "splashing oar"],
    tool: ["rope", "spyglass", "map case"],
    friend: ["lost sailor", "deck cat", "sea pup"]
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
  "Toy Town": {
    clue: ["wind-up key", "painted star", "tiny bell"],
    place: ["toy shop", "gear bridge", "clock lane"],
    guide: ["teddy guide", "toy conductor", "robot pup"],
    sign: ["clicking gears", "soft chime", "glow sticker"],
    tool: ["toy wrench", "music box", "spinner key"],
    friend: ["lost doll", "tiny train", "plush bear"]
  },
  "Rainbow Ranch": {
    clue: ["ribbon trail", "rainbow tag", "sparkle hoofprint"],
    place: ["stable gate", "meadow path", "barn door"],
    guide: ["pony guide", "rancher", "color bird"],
    sign: ["soft neigh", "bell chime", "glowing grass"],
    tool: ["brush", "ranch bell", "color map"],
    friend: ["little pony", "barn cat", "farm pup"]
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
  },
  "Marvel World": {
    clue: ["hero badge", "signal flare", "energy trail"],
    place: ["tower gate", "city plaza", "training hall"],
    guide: ["hero mentor", "tech helper", "swift scout"],
    sign: ["alert light", "echoing steps", "glowing emblem"],
    tool: ["shield", "grappler", "power band"],
    friend: ["rookie hero", "rescue bot", "city kid"]
  },
  "DC World": {
    clue: ["signal beam", "city crest", "shadow trail"],
    place: ["rooftop", "city gate", "hero hub"],
    guide: ["night guardian", "quick scout", "wise ally"],
    sign: ["batlight", "wind rush", "quiet alarm"],
    tool: ["cloak", "tracker", "utility band"],
    friend: ["young hero", "city pup", "helper bird"]
  },
  "Kpop Demon Hunter World": {
    clue: ["neon charm", "stage light", "beat trail"],
    place: ["concert hall", "training room", "stage gate"],
    guide: ["lead singer", "dance coach", "sound tech"],
    sign: ["bass pulse", "glow stick", "shadow ripple"],
    tool: ["mic charm", "light baton", "rhythm map"],
    friend: ["rookie idol", "stage pup", "dance buddy"]
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
  Beginner: ["happy", "sad", "sleepy", "hungry"],
  Intermediate: ["happy", "excited", "scared", "curious"],
  Advanced: ["determined", "thoughtful", "eager", "confident"]
};

const moodWordsByLang: Record<Language, Record<Difficulty, string[]>> = {
  en: moodWords,
  zh: {
    Beginner: ["开心", "难过", "困", "饿"],
    Intermediate: ["开心", "兴奋", "有点怕", "好奇"],
    Advanced: ["坚定", "深思", "渴望", "自信"]
  },
  ms: {
    Beginner: ["gembira", "sedih", "mengantuk", "lapar"],
    Intermediate: ["gembira", "teruja", "takut", "ingin tahu"],
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

function getLocationPool(theme: string, difficulty: Difficulty, lang: Language) {
  if (difficulty === "Beginner") {
    const pool =
      beginnerLocationsByLang[lang]?.[theme] ||
      beginnerLocationsByLang[lang]?.["Magic Forest"];
    return pool || ["a place"];
  }
  const pool = themeDetails[theme]?.place || themeDetails["Magic Forest"].place;
  return pool;
}

function getConflictPool(theme: string, difficulty: Difficulty, lang: Language) {
  if (difficulty === "Beginner") {
    const pool =
      beginnerConflictsByLang[lang]?.[theme] ||
      beginnerConflictsByLang[lang]?.["*"];
    return pool || ["a small problem"];
  }
  if (difficulty === "Intermediate") {
    const pool =
      intermediateConflictsByLang[lang]?.[theme] ||
      intermediateConflictsByLang[lang]?.["*"];
    return pool || ["a small problem"];
  }
  return conflictByTheme[theme] || conflictByTheme["Magic Forest"];
}

function buildOpeningByDifficulty(
  difficulty: Difficulty,
  hero: string,
  themeLabel: string,
  location: string,
  mood: string,
  conflict: string,
  lang: Language
) {
  if (difficulty === "Beginner") {
    const lines = beginnerOpeningsByLang[lang] || beginnerOpeningsByLang.en;
    return lines
      .map((line) =>
        line
          .replace("{hero}", hero)
          .replace("{theme}", themeLabel)
          .replace("{location}", location)
          .replace("{mood}", mood)
          .replace("{conflict}", conflict)
      )
      .join("\n");
  }
  if (difficulty === "Intermediate") {
    const lines = intermediateOpeningsByLang[lang] || intermediateOpeningsByLang.en;
    return lines
      .map((line) =>
        line
          .replace("{hero}", hero)
          .replace("{theme}", themeLabel)
          .replace("{location}", location)
          .replace("{mood}", mood)
          .replace("{conflict}", conflict)
      )
      .join("\n");
  }
  return "";
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
  const location = pick(getLocationPool(theme, difficulty, lang), 1);
  const moodPool = moodWordsByLang[lang]?.[difficulty] || moodWords[difficulty];
  const mood = pick(moodPool, 2);
  const conflict = pick(getConflictPool(theme, difficulty, lang), 3);

  const themeLabel = themeLabelsByLang[lang]?.[theme] || theme;
  let opening = buildOpeningByDifficulty(
    difficulty,
    hero,
    themeLabel,
    location,
    mood,
    conflict,
    lang
  );
  if (!opening) {
    const templates =
      lang === "en" ? openings[theme] || openings["Magic Forest"] : openingTemplatesByLang[lang];
    const template = templates[Math.floor(Math.random() * templates.length)];
    opening = template
      .replace("{hero}", hero)
      .replace("{location}", location)
      .replace("{mood}", mood)
      .replace("{conflict}", conflict)
      .replace("{theme}", themeLabel);
  }

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
  const choiceTexts = buildChoices(theme, difficulty, round, lang);
  const targetWords = getTargetWords(difficulty, lang);
  const question = buildQuestion(
    lang,
    hero || "the hero",
    conflict || "the mystery",
    difficulty
  );

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

function buildQuestion(
  lang: Language,
  hero: string,
  conflict: string,
  difficulty: Difficulty
) {
  if (difficulty === "Beginner") {
    if (lang === "zh") return `${hero} 做什么？`;
    if (lang === "ms") return `Apa ${hero} buat?`;
    return `What does ${hero} do?`;
  }
  if (difficulty === "Intermediate") {
    if (lang === "zh") return `${hero} 现在做什么？`;
    if (lang === "ms") return `Apa ${hero} buat sekarang?`;
    return `What does ${hero} do now?`;
  }
  if (lang === "zh") {
    return `${hero} 接下来该怎么做，才能解决“${conflict}”？`;
  }
  if (lang === "ms") {
    return `Apa langkah seterusnya ${hero} untuk selesaikan ${conflict}?`;
  }
  return `What should ${hero} do next to solve ${conflict}?`;
}

function getTargetWords(difficulty: Difficulty, lang: Language) {
  const pool =
    targetWordPoolsByLang[lang]?.[difficulty] ||
    targetWordPoolsByLang.en[difficulty];
  return pool.slice(0, 3);
}

function getActionPool(theme: string, difficulty: Difficulty, lang: Language) {
  if (difficulty === "Beginner") {
    const perTheme = beginnerActionsByLang[lang]?.[theme];
    const generic = beginnerActionsByLang[lang]?.["*"];
    return perTheme || generic || beginnerActionsByLang.en[theme];
  }
  if (difficulty === "Intermediate") {
    return intermediateActionsByLang[lang] || intermediateActionsByLang.en;
  }
  return [];
}

function buildChoices(
  theme: string,
  difficulty: Difficulty,
  round: number,
  lang: Language
) {
  if (difficulty === "Beginner" || difficulty === "Intermediate") {
    const pool = getActionPool(theme, difficulty, lang);
    return ["A", "B", "C"].map((label, index) => ({
      id: label,
      text: pool[(round + index) % pool.length]
    }));
  }
  const pool = themeDetails[theme] || themeDetails["Magic Forest"];
  const templateList = choiceTemplatesByLang[lang] || choiceTemplates;
  const template = templateList[round % templateList.length];
  return ["A", "B", "C"].map((label, index) => {
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
}

function buildBeginnerUpdate(
  choiceText: string,
  round: number,
  scene: { hero: string; location: string; mood: string; conflict: string } | undefined,
  lang: Language
) {
  const hero = scene?.hero || "The hero";
  const mood = scene?.mood || "happy";
  const actionLine = actionSentence(choiceText, hero, lang, "Beginner");
  const extrasEn = [
    "The sky is blue.",
    "The path is clear.",
    "The sun is up.",
    "The air is soft.",
    "The day is bright."
  ];
  const extrasZh = ["天空很蓝。", "小路很清。", "太阳升起。", "空气很软。", "今天很亮。"];
  const extrasMs = ["Langit biru.", "Laluan jelas.", "Matahari naik.", "Udara lembut.", "Hari cerah."];
  const extra =
    lang === "zh" ? pick(extrasZh, round) : lang === "ms" ? pick(extrasMs, round) : pick(extrasEn, round);
  const moodLine =
    lang === "zh"
      ? `${hero} 很${mood}。`
      : lang === "ms"
      ? `${hero} rasa ${mood}.`
      : `${hero} is ${mood}.`;
  return [actionLine, extra, moodLine].join("\n");
}

function buildIntermediateUpdate(
  choiceText: string,
  round: number,
  scene: { hero: string; location: string; mood: string; conflict: string } | undefined,
  choiceId: string | undefined,
  lang: Language
) {
  const hero = scene?.hero || "The hero";
  const mood = scene?.mood || "happy";
  const actionLine = actionSentence(choiceText, hero, lang, "Intermediate");
  if (lang === "zh") {
    const consequence = pick(
      [
        "所以线索更清楚。",
        "于是朋友过来帮忙。",
        "结果花了更多时间。"
      ],
      round + (choiceId ? choiceId.charCodeAt(0) : 0)
    );
    const moodLine = `${hero} 有点${mood}，继续前进。`;
    return [actionLine, consequence, moodLine].join("\n");
  }
  if (lang === "ms") {
    const consequence = pick(
      [
        "Jadi petunjuk jadi lebih jelas.",
        "Jadi kawan datang membantu.",
        "Jadi ia ambil lebih masa."
      ],
      round + (choiceId ? choiceId.charCodeAt(0) : 0)
    );
    const moodLine = `${hero} rasa ${mood} dan terus bergerak.`;
    return [actionLine, consequence, moodLine].join("\n");
  }
  const consequence = pick(
    [
      "So the clue feels more clear.",
      "So a friend comes to help.",
      "So the task takes more time."
    ],
    round + (choiceId ? choiceId.charCodeAt(0) : 0)
  );
  const moodLine = `${hero} is ${mood} and keeps moving.`;
  return [actionLine, consequence, moodLine].join("\n");
}

function actionSentence(
  choiceText: string,
  hero: string,
  lang: Language,
  difficulty: Difficulty
) {
  if (lang === "zh") {
    return `${hero} ${choiceText}。`;
  }
  if (lang === "ms") {
    return `${hero} ${choiceText}.`;
  }
  const parts = choiceText.replace(/\.$/, "").split(" ");
  const verb = parts[0]?.toLowerCase() || "do";
  const rest = parts.slice(1).join(" ");
  const verbMap: Record<string, string> = {
    eat: "eats",
    go: "goes",
    run: "runs",
    drink: "drinks",
    look: "looks",
    ask: "asks",
    jump: "jumps",
    sit: "sits",
    open: "opens",
    follow: "follows",
    help: "helps",
    take: "takes",
    use: "uses",
    play: "plays",
    find: "finds",
    pick: "picks",
    wave: "waves",
    climb: "climbs",
    swim: "swims",
    wait: "waits",
    check: "checks",
    press: "presses",
    call: "calls"
  };
  const verb3 = verbMap[verb] || `${verb}s`;
  const base = rest ? `${hero} ${verb3} ${rest}.` : `${hero} ${verb3}.`;
  if (difficulty === "Intermediate") {
    return rest
      ? `Then ${hero} ${verb3} ${rest} now.`
      : `Then ${hero} ${verb3} now.`;
  }
  return base;
}

export function updateStory(
  story: string,
  choiceText: string,
  userLine: string | undefined,
  round: number,
  scene?: { hero: string; location: string; mood: string; conflict: string },
  theme?: string,
  choiceId?: string,
  lang: Language = "en",
  difficulty: Difficulty = "Advanced"
) {
  if (difficulty === "Beginner") {
    const additions = buildBeginnerUpdate(choiceText, round, scene, lang);
    const userAdd = userLine && userLine.trim().length > 0 ? `\n${userLine.trim()}` : "";
    return story + `\n\n${additions}${userAdd}`;
  }
  if (difficulty === "Intermediate") {
    const additions = buildIntermediateUpdate(choiceText, round, scene, choiceId, lang);
    const userAdd = userLine && userLine.trim().length > 0 ? `\n${userLine.trim()}` : "";
    return story + `\n\n${additions}${userAdd}`;
  }
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
  lang: Language = "en",
  difficulty: Difficulty = "Advanced"
) {
  if (difficulty === "Beginner") {
    const ending =
      lang === "zh"
        ? "\n\n最后，门打开了。\n主角很开心。\n这是美好的一天。"
        : lang === "ms"
        ? "\n\nAkhirnya, pintu terbuka.\nWira gembira.\nHari ini baik."
        : "\n\nIn the end, the door opens.\nThe hero is happy.\nIt is a good day.";
    const themeLabel = themeLabelsByLang[lang]?.[theme] || theme;
    const title =
      lang === "zh"
        ? `${themeLabel}：小小结局`
        : lang === "ms"
        ? `${themeLabel}: Tamat Ringkas`
        : `${theme}: A Little Ending`;
    const moral =
      lang === "zh"
        ? "勇敢又善良。"
        : lang === "ms"
        ? "Berani dan baik hati."
        : "Be brave and kind.";
    return { title, fullStory: story + ending, moral };
  }
  if (difficulty === "Intermediate") {
    const ending =
      lang === "zh"
        ? "\n\n最后，线索被找到。\n门慢慢打开。\n主角很开心。"
        : lang === "ms"
        ? "\n\nAkhirnya, petunjuk dijumpai.\nPintu terbuka perlahan.\nWira gembira."
        : "\n\nIn the end, the clue is found.\nThe door opens slowly.\nThe hero feels happy.";
    const themeLabel = themeLabelsByLang[lang]?.[theme] || theme;
    const title =
      lang === "zh"
        ? `${themeLabel}：小小胜利`
        : lang === "ms"
        ? `${themeLabel}: Kemenangan Kecil`
        : `${theme}: A Small Win`;
    const moral =
      lang === "zh"
        ? "做对选择会有好结果。"
        : lang === "ms"
        ? "Pilihan baik beri hasil baik."
        : "Good choices bring good results.";
    return { title, fullStory: story + ending, moral };
  }
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
        ? `我会用“${word}”。`
        : lang === "ms"
        ? `Saya guna “${word}”.`
        : `I can use “${word}”.`
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
    eat: "to put food in your mouth",
    go: "to move to a place",
    run: "to move fast",
    sleep: "to rest",
    drink: "to take water",
    look: "to see with your eyes",
    because: "for a reason",
    then: "after that",
    key: "a small tool to open",
    door: "an entry way",
    find: "to discover",
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
    eat: "吃",
    go: "走",
    run: "跑",
    sleep: "睡",
    drink: "喝",
    look: "看",
    "因为": "因为",
    "然后": "然后",
    "钥匙": "钥匙",
    "门": "门",
    "找到": "找到",
    "帮忙": "帮忙",
    "神秘": "神秘",
    "策略": "策略",
    "决心": "决心",
    "微光": "微光",
    "探索": "探索",
    "转折": "转折",
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
    makan: "makan",
    pergi: "pergi",
    lari: "lari",
    tidur: "tidur",
    minum: "minum",
    lihat: "lihat",
    kerana: "kerana",
    kemudian: "kemudian",
    kunci: "kunci",
    pintu: "pintu",
    jumpa: "jumpa",
    bantu: "bantu",
    misteri: "misteri",
    strategi: "strategi",
    tekad: "tekad",
    kilauan: "kilauan",
    meneroka: "meneroka",
    kejutan: "kejutan",
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
