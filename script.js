const SAVE_KEY = "dreamHeartsSaveV2";
const DEBUG_MODE = false;
const development = false;
const app = document.getElementById("app");
const panelContent = document.getElementById("panelContent");
const panelTitle = document.getElementById("panelTitle");
const panelSubtitle = document.getElementById("panelSubtitle");
const panelIcon = document.getElementById("panelIcon");
const characterButton = document.getElementById("characterButton");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const fmt = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const compactFmt = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });
const REBIRTH_REQUIREMENTS = {
  level: 300,
  totalHearts: 1000000000000,
  taps: 30000,
  achievements: 120
};

const gifts = [
  { id: "flower", name: "Flores", icon: "🌸", power: 28 },
  { id: "chocolate", name: "Chocolate", icon: "🍫", power: 32 },
  { id: "book", name: "Livro", icon: "📘", power: 30 },
  { id: "plush", name: "Pelúcia", icon: "🧸", power: 36 },
  { id: "icecream", name: "Sorvete", icon: "🍨", power: 34 },
  { id: "ribbon", name: "Laço", icon: "🎀", power: 40 },
  { id: "cake", name: "Bolo", icon: "🍰", power: 45 },
  { id: "pudding", name: "Pudim", icon: "🍮", power: 42 }
];

const clickUpgrades = [
  { id: "laco", name: "Laço Rosa", icon: "🎀", bonus: 1, baseCost: 30, desc: "+1 por clique" },
  { id: "luvas", name: "Luvas Mágicas", icon: "🧤", bonus: 5, baseCost: 500, desc: "+5 por clique" },
  { id: "varinha", name: "Varinha Encantada", icon: "🪄", bonus: 10, baseCost: 2500, desc: "+10 por clique" },
  { id: "anel", name: "Anel Brilhante", icon: "💍", bonus: 25, baseCost: 15000, desc: "+25 por clique" },
  { id: "coroa", name: "Coroa das Estrelas", icon: "👑", bonus: 50, baseCost: 80000, desc: "+50 por clique" },
  { id: "cetro", name: "Cetro Celestial", icon: "✨", bonus: 100, baseCost: 400000, desc: "+100 por clique" },
  { id: "colar", name: "Colar de Pérolas", icon: "📿", bonus: 250, baseCost: 1500000, desc: "+250 por clique" },
  { id: "brincos", name: "Brincos Diamante", icon: "💎", bonus: 600, baseCost: 5000000, desc: "+600 por clique" },
  { id: "sapatos", name: "Sapatos Cristal", icon: "👠", bonus: 1500, baseCost: 20000000, desc: "+1500 por clique" },
  { id: "vestido", name: "Vestido Encantado", icon: "👗", bonus: 3500, baseCost: 85000000, desc: "+3500 por clique" },
  { id: "asas", name: "Asas de Fada", icon: "🧚‍♀️", bonus: 8000, baseCost: 350000000, desc: "+8000 por clique" },
  { id: "espelho", name: "Espelho Mágico", icon: "🪞", bonus: 20000, baseCost: 1500000000, desc: "+20k por clique" },
  { id: "livro", name: "Livro Feitiços", icon: "📖", bonus: 50000, baseCost: 8000000000, desc: "+50k por clique" },
  { id: "pocao", name: "Poção do Amor", icon: "🧪", bonus: 120000, baseCost: 40000000000, desc: "+120k por clique" },
  { id: "harpa", name: "Harpa Celestial", icon: "🎶", bonus: 300000, baseCost: 200000000000, desc: "+300k por clique" },
  { id: "estrela", name: "Estrela Guia", icon: "🌠", bonus: 800000, baseCost: 1000000000000, desc: "+800k por clique" }
];

const panelMeta = {
  garden: ["🌷", "Jardim dos Sonhos", "toque, construa e colecione"],
  build: ["🏰", "Construções", "produção automática e progresso offline"],
  friends: ["👥", "Amigos", "amizade, presentes e bônus especiais"],
  stories: ["📖", "Histórias", "escolhas interativas com recompensas"],
  diary: ["✦", "Diário", "missões, conquistas e minigames"]
};

const defaultBuildings = (debug = false) => Object.fromEntries(buildings.map((building, index) => [building.id, debug && index < 3 ? 1 : 0]));
const defaultFriendship = (debug = false) => Object.fromEntries(characters.map((character, index) => [character.id, { xp: debug && index === 0 ? 420 : 0 }]));
const defaultInventory = (debug = false) => debug ? { flower: 3, chocolate: 2, book: 1, plush: 1, icecream: 1, ribbon: 1, cake: 1, pudding: 1 } : { flower: 0, chocolate: 0, book: 0, plush: 0, icecream: 0, ribbon: 0, cake: 0, pudding: 0 };
const defaultClickUpgrades = () => Object.fromEntries(clickUpgrades.map(u => [u.id, 0]));

const TIMES_OF_DAY = ["dawn", "day", "sunset", "night"];
const SEASONS = {
  CHRISTMAS: "christmas",
  HALLOWEEN: "halloween",
  NORMAL: "normal"
};

const OUTFITS = {
  DEFAULT: { dress: "url(#dressGrad)" },
  SUMMER: { dress: "#ffea8c" },
  HALLOWEEN: { dress: "#7b5a68" },
  CHRISTMAS: { dress: "#ff4d4d" }
};

const albumPhotos = [
  "1.webp", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp", "7.webp", "8.webp", "9.webp", "10.webp",
  "11.webp", "12.webp", "13.webp", "14.webp", "15.webp", "16.webp", "17.webp", "18.webp", "19.webp", "20.webp",
  "21.webp", "22.webp", "23.webp", "24.webp", "25.webp", "26.webp", "27.webp", "28.webp", "29.webp", "30.webp",
  "31.webp", "32.webp", "33.webp", "34.webp", "35.webp", "36.webp", "37.webp", "38.webp"
];

const NPCs = [
  { id: "melody", name: "My Melody", icon: "🌸", area: "garden-bloom", unlockLv: 3, route: [{ x: 12, y: 72 }, { x: 22, y: 74 }, { x: 18, y: 70 }, { x: 14, y: 76 }] },
  { id: "kuromi", name: "Kuromi", icon: "💜", area: "cottage", unlockLv: 7, route: [{ x: 48, y: 32 }, { x: 56, y: 30 }, { x: 52, y: 36 }, { x: 46, y: 34 }] },
  { id: "cinnamoroll", name: "Cinnamoroll", icon: "☁️", area: "sky", unlockLv: 10, route: [{ x: 10, y: 18 }, { x: 28, y: 12 }, { x: 50, y: 18 }, { x: 72, y: 14 }, { x: 88, y: 20 }] },
  { id: "pompom", name: "Pompompurin", icon: "🍮", area: "path", unlockLv: 15, route: [{ x: 30, y: 80 }, { x: 42, y: 78 }, { x: 56, y: 82 }, { x: 68, y: 84 }] },
  { id: "keroppi", name: "Keroppi", icon: "🐸", area: "garden-bloom right", unlockLv: 5, route: [{ x: 85, y: 75 }, { x: 78, y: 72 }, { x: 82, y: 78 }, { x: 88, y: 70 }] },
  { id: "badtz", name: "Badtz-Maru", icon: "⚡", area: "edge", unlockLv: 12, route: [{ x: 5, y: 50 }, { x: 15, y: 45 }, { x: 8, y: 55 }] },
  { id: "chococat", name: "Chococat", icon: "📚", area: "mini-house left", unlockLv: 18, route: [{ x: 20, y: 40 }, { x: 30, y: 42 }, { x: 25, y: 38 }] },
  { id: "twinstars", name: "Little Twin Stars", icon: "🌟", area: "sky night", unlockLv: 8, route: [{ x: 80, y: 10 }, { x: 60, y: 15 }, { x: 40, y: 8 }, { x: 20, y: 12 }] },
  { id: "daniel", name: "Dear Daniel", icon: "💌", area: "path", unlockLv: 20, route: [{ x: 40, y: 85 }, { x: 50, y: 85 }, { x: 45, y: 80 }] }
];

const cuteLines = {
  morning: [
    "Bom dia! Vamos espalhar alegria hoje?",
    "A luz da manhã deixa o jardim tão fofinho!",
    "Já tomou seu café da manhã? O meu teve maçãs!",
    "O sol está brilhando, hora de cultivar corações!"
  ],
  afternoon: [
    "Que tarde adorável para um chá, não acha?",
    "Um piquenique agora seria perfeito!",
    "Estou adorando passar essa tarde com você.",
    "O jardim está lindo sob essa luz dourada."
  ],
  night: [
    "As estrelas contam histórias, você não acha?",
    "A noite é perfeita para observar o céu mágico.",
    "Espero que tenha tido um dia cheio de sorrisos.",
    "Tudo fica mais tranquilo sob a luz da lua."
  ],
  click: [
    "Hehe, mais um coraçãozinho!",
    "Vamos fazer o jardim brilhar!",
    "Isso! Mais amor para o nosso mundo.",
    "Obrigada pela ajuda!",
    "Yay! Que clique fofo!",
    "Continuaremos espalhando gentileza.",
    "Sinto a magia crescer a cada toque!"
  ],
  gift: [
    "Ah! Um presente! Você é tão gentil!",
    "Presentes são abraços disfarçados!",
    "Adorei a surpresa, obrigada de coração!",
    "Você sempre sabe como me fazer sorrir!"
  ],
  build: [
    "Nossa, nosso jardim está ficando incrível!",
    "Construir juntos é muito mais divertido.",
    "Mais espaço para nossos amigos brincarem!",
    "Que construção maravilhosa! Estou encantada!"
  ],
  levelUp: [
    "Uau! Estamos subindo de nível!",
    "Olha só o quanto crescemos juntos!",
    "Nova fase, novos corações, novas aventuras!",
    "Parabéns! Nosso trabalho em equipe é o melhor!"
  ],
  friendship: [
    "A amizade é a magia mais poderosa de todas.",
    "Adoro quando novos amigos vêm nos visitar.",
    "Sempre há espaço para mais sorrisos aqui."
  ],
  random: [
    "Você quer uma maçã? Eu trouxe algumas!",
    "Lembre-se sempre: seja gentil e corajoso.",
    "Estou tão feliz em ter você aqui comigo.",
    "Qual é a sua flor favorita? A minha muda todo dia!",
    "A magia está nas pequenas coisas."
  ]
};

const kuromiLines = {
  morning: [
    "Ugh, luz do sol... feche as cortinas.",
    "Cadê o Baku com meu café?",
    "Bom dia pra quem? Só se for pra mim.",
    "Mais um dia para espalhar o caos."
  ],
  afternoon: [
    "Anotando o seu nome no meu Diário Negro...",
    "Que tédio. Não tem nada mais caótico pra fazer?",
    "Essa luz está estragando minha aura dark.",
    "Se você sorrir mais uma vez, eu grito."
  ],
  night: [
    "Finalmente, as sombras chegaram.",
    "A noite é perfeita para planejar dominar o mundo.",
    "Dorme logo, eu tenho o que fazer.",
    "A escuridão combina com a minha tiara."
  ],
  click: [
    "Clica mais rápido, estou com tédio!",
    "Fofa? Eu sou o caos em pessoa!",
    "Tá achando que eu sou a Hello Kitty?",
    "Isso aí, trabalhe para mim!",
    "Mais corações? Eu prefiro caveiras.",
    "Eu vou dominar esse jardim.",
    "Aff, que demora pra clicar!"
  ],
  gift: [
    "Pra mim? Hmph, já era hora.",
    "Não vá achando que eu gostei... (Mas me dá mais).",
    "Vou guardar no meu baú secreto.",
    "Aceitável. Qual o próximo?"
  ],
  build: [
    "Esse lugar precisa de mais roxo e preto.",
    "Construindo meu império, tijolo por tijolo.",
    "Menos flores, mais espinhos, por favor.",
    "Está ficando menos horrível."
  ],
  levelUp: [
    "Óbvio que eu sou a melhor. Próximo nível!",
    "Curvem-se perante o poder da Kuromi!",
    "Mais forte, mais rápida, mais caótica!",
    "Era só questão de tempo."
  ],
  friendship: [
    "Amizade? Só se for no meu bando.",
    "Não me toque, a menos que eu mande.",
    "Eu não sou fofa, sou perigosa."
  ],
  random: [
    "Cadê o Baku pra carregar isso?",
    "Eu não sigo as regras, eu faço as minhas.",
    "Alguém viu a My Melody? Preciso pregar uma peça nela.",
    "Romance? Blegh, prefiro motocicletas.",
    "Rosa é cor de fracos."
  ]
};

const chococatLines = {
  morning: [
    "Meus bigodes dizem que o dia vai ser doce!",
    "Você tem um pedacinho de chocolate para o café da manhã?",
    "Que cheirinho bom... Será que é cacau?",
    "Acordei curioso hoje!"
  ],
  afternoon: [
    "Meus bigodes estão captando uma fofoca nova!",
    "A tarde é perfeita para uma soneca... e chocolate.",
    "Ouvi dizer que esse jardim guarda segredos...",
    "Ei, você viu alguma borboleta diferente por aí?"
  ],
  night: [
    "Minha pelagem preta me esconde tão bem no escuro!",
    "Noite é hora de caçar... segredos!",
    "As corujas me contaram uma novidade.",
    "Que silêncio... ideal para investigar."
  ],
  click: [
    "A curiosidade não matou o gato, só me fez clicar mais!",
    "Opa, encontrei algo legal!",
    "Mais um clique, mais uma descoberta!",
    "Meus bigodes vibram com cada toque!",
    "Isso! Quero ver o que vai acontecer.",
    "Focado. Curioso. Clicando.",
    "Você tem um pedacinho de chocolate aí?"
  ],
  gift: [
    "Um presente?! Deixa eu investigar a caixa primeiro...",
    "Cheira a surpresa! E talvez a chocolate.",
    "Obrigado! Vou colocar na minha coleção de mistérios.",
    "Nossa, que intrigante!"
  ],
  build: [
    "Mais lugares para eu explorar e me esconder!",
    "Essa construção tem cheiro de novidade.",
    "Estou de olho nos operários.",
    "Isso vai ficar incrível."
  ],
  levelUp: [
    "Subimos de nível! Mais segredos desbloqueados!",
    "Meus bigodes me diziam que íamos conseguir.",
    "Mais alto, mais longe, mais curioso!",
    "A inteligência felina vence novamente!"
  ],
  friendship: [
    "Novos amigos trazem novas fofocas!",
    "Me conte todos os seus segredos.",
    "Você gosta de chocolate? Se sim, somos amigos."
  ],
  random: [
    "A curiosidade me guia.",
    "Minha coleira azul é muito estilosa, não acha?",
    "Chocolate é o segredo para a felicidade.",
    "Estou sempre alerta. Especialmente se houver petiscos.",
    "A vida é um grande mistério felino."
  ]
};

const characterLines = {
  kitty: cuteLines,
  melody: cuteLines,
  pompom: cuteLines,
  keroppi: cuteLines,
  badtz: kuromiLines,
  chococat: chococatLines,
  twinstars: cuteLines,
  daniel: cuteLines,
  kuromi: kuromiLines
};

let lastDialogueCategory = "";
let lastDialogueTime = 0;
let dialogueTimeout = null;

function triggerDialogue(category, force = false) {
  // Prevent spamming
  const now = Date.now();
  if (!force && now - lastDialogueTime < 6000) return;
  if (!force && Math.random() > 0.4) return; // Only 40% chance if not forced

  const currentId = state.mainCharacter || "kitty";
  const poolObject = characterLines[currentId] || characterLines["kitty"];
  let pool = poolObject[category] || poolObject.random;
  if (!pool || pool.length === 0) pool = poolObject.random;
  
  const text = pool[Math.floor(Math.random() * pool.length)];
  const moodBubble = document.getElementById("moodBubble");
  if (moodBubble) {
    moodBubble.style.opacity = "0";
    setTimeout(() => {
      moodBubble.innerText = text;
      moodBubble.style.opacity = "0.98";
      // Animate hop
      moodBubble.style.transform = "rotate(-3deg) translateY(-4px)";
      setTimeout(() => moodBubble.style.transform = "rotate(-3deg)", 150);
    }, 300);
  }
  
  lastDialogueCategory = category;
  lastDialogueTime = now;
}

function createDefaultState() {
  return {
    hearts: 0,
    totalHearts: 0,
    gems: 0,
    xp: 0,
    level: 1,
    taps: 0,
    tapsSinceLastGift: 0,
    selectedCharacter: "kitty",
    activeTab: "garden",
    buildings: defaultBuildings(false),
    friendship: defaultFriendship(false),
    inventory: defaultInventory(false),
    clickUpgrades: defaultClickUpgrades(),
    stories: {},
    achievements: {},
    redeemedCodes: {},
    adminUnlocked: false,
    daily: { lastClaim: "", streak: 0 },
    quests: { giftsGiven: 0, storiesPlayed: 0, minigamesWon: 0 },
    lastTreasure: 0,
    boosts: { production: 0, tap: 0 },
    settings: { sound: true, music: true, musicVolume: 0.15, vibration: true, theme: "auto" },
    lastSaved: Date.now(),
    timeIdx: 1,
    outfit: "DEFAULT",
    event: "NORMAL",
    rebirths: 0,
    mainCharacter: "kitty",
    collectorDefeated: false
  };
}

function deepMerge(base, incoming) {
  if (!incoming || typeof incoming !== "object") return base;
  const merged = Array.isArray(base) ? [...base] : { ...base };
  Object.keys(incoming).forEach((key) => {
    if (incoming[key] && typeof incoming[key] === "object" && !Array.isArray(incoming[key])) {
      merged[key] = deepMerge(base[key] || {}, incoming[key]);
    } else {
      merged[key] = incoming[key];
    }
  });
  return merged;
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (!saved || typeof saved !== "object") return createDefaultState();
    return deepMerge(createDefaultState(), saved);
  } catch {
    return createDefaultState();
  }
}

let state = loadState();
let audioContext = null;
let memoryGame = null;
let comboCount = 0;
let lastTapTime = 0;
let saveTimer = null;
let hudRafId = null;
let upgradeRefreshTimer = null;
let upgradeNeedsWorldRefresh = false;
let appInBackground = false;
let resumeMusicAfterForeground = false;
let hudMetricRaf = null;
const isMobileRuntime = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.Capacitor;
const tapMinInterval = isMobileRuntime ? 80 : 50;
app.dataset.runtime = isMobileRuntime ? "mobile" : "desktop";

const xpForLevel = (level) => {
  if (level <= 100) return Math.floor(150 + Math.pow(level, 1.6) * 15);
  // Absurd scaling for level 100+ to restrict diamond farming
  return Math.floor(150 + Math.pow(100, 1.6) * 15 + Math.pow(level - 100, 2.5) * 500);
};
const friendXpForLevel = (level) => Math.pow(level - 1, 2) * 22;
const getCharacter = (id = state.selectedCharacter) => characters.find((character) => character.id === id) || characters[0];
const getGift = (id) => gifts.find((gift) => gift.id === id);

function formatNumber(value) { return Math.abs(value) >= 100000 ? compactFmt.format(value) : fmt.format(value); }

function albumPhotoUrl(fileName) {
  return `Album/${fileName.split("/").map(encodeURIComponent).join("/")}`;
}

function rebirthProgress() {
  const achieved = Object.keys(state.achievements).length;
  const req = REBIRTH_REQUIREMENTS;
  const checks = [
    { label: "Nivel", current: state.level, needed: req.level },
    { label: "Coracoes totais", current: state.totalHearts, needed: req.totalHearts },
    { label: "Toques", current: state.taps, needed: req.taps },
    { label: "Conquistas", current: achieved, needed: req.achievements }
  ];
  return {
    checks,
    ready: checks.every((item) => item.current >= item.needed)
  };
}

function friendLevel(id) {
  const xp = state.friendship[id]?.xp || 0;
  let level = 1;
  while (level < 100 && xp >= friendXpForLevel(level + 1)) level++;
  return level;
}

function friendProgress(id) {
  const level = friendLevel(id);
  const xp = state.friendship[id]?.xp || 0;
  if (level >= 100) return 100;
  const current = friendXpForLevel(level);
  const next = friendXpForLevel(level + 1);
  return Math.max(0, Math.min(100, ((xp - current) / (next - current)) * 100));
}

function buildingLevel(id) { return state.buildings[id] || 0; }

function buildingCost(building) {
  const level = buildingLevel(building.id);
  let cost = Math.floor(building.baseCost * Math.pow(1.15, level)); // Nerf on auto production (1.12 -> 1.15)
  // Pompompurin cost reduction when active
  const active = getCharacter();
  if (active.costReduction > 0) {
    cost = Math.floor(cost * (1 - active.costReduction));
  }
  return cost;
}

function clickUpgradeCost(upgrade) {
  const owned = state.clickUpgrades[upgrade.id] || 0;
  let cost = Math.floor(upgrade.baseCost * Math.pow(1.18, owned)); // Buff on click upgrade cost scaling (1.25 -> 1.18)
  const active = getCharacter();
  if (active.costReduction > 0) {
    cost = Math.floor(cost * (1 - active.costReduction));
  }
  return cost;
}

function clickUpgradeBonus() {
  return clickUpgrades.reduce((sum, upgrade) => {
    const owned = state.clickUpgrades[upgrade.id] || 0;
    return sum + upgrade.bonus * owned;
  }, 0);
}

function productionPerSecond() {
  const raw = buildings.reduce((sum, building) => {
    const level = buildingLevel(building.id);
    const milestoneMult = Math.pow(2, Math.floor(level / 25));
    return sum + building.baseHps * level * (1 + level * .015) * milestoneMult;
  }, 0);
  const hpsBonus = characters.reduce((sum, character) => sum + (friendLevel(character.id) - 1) * character.hpsBoost * .006, 0);
  
  const activeChar = getCharacter();
  const activeFriendLevel = friendLevel(activeChar.id);
  const friendshipMultiplier = 1 + ((activeFriendLevel - 1) * 0.1);
  const activeBonus = activeChar.hpsBoost * friendshipMultiplier;
  
  const rebirthMult = 1 + (state.rebirths || 0); // Rebirth doubles base prod
  return raw * (1 + hpsBonus + activeBonus) * rebirthMult;
}

function tapPower() {
  const active = getCharacter();
  const activeFriendLevel = friendLevel(active.id);
  const friendshipMultiplier = 1 + ((activeFriendLevel - 1) * 0.1);
  const scaledTapBoost = active.tapBoost * friendshipMultiplier;
  
  const buildingBoost = buildingLevel("kittyhouse") * .015;
  const upgradeBonus = clickUpgradeBonus();
  const rebirthMult = 1 + (state.rebirths || 0);
  return Math.max(1, Math.floor((15 + state.level * 0.8 + upgradeBonus) * (1 + scaledTapBoost + buildingBoost) * rebirthMult));
}

function gainXp(amount) {
  // Apply Keroppi XP boost if active
  const active = getCharacter();
  if (active.xpBoost > 0) {
    amount = Math.floor(amount * (1 + active.xpBoost));
  }
  state.xp += amount;
  let leveled = false;
  while (state.xp >= xpForLevel(state.level)) {
    state.xp -= xpForLevel(state.level);
    state.level++;
    // Cristais ficam raros: 1 a cada 5 niveis no inicio, depois so em marcos grandes.
    if ((state.level <= 100 && state.level % 5 === 0) || state.level % 25 === 0) {
      state.gems += 1;
    }
    state.hearts += state.level * 150;
    state.totalHearts += state.level * 150;
    leveled = true;
  }
  if (leveled) {
    toast(`Lv. ${state.level}!`);
    burstAt(window.innerWidth / 2, 140, 18, "🌟");
    triggerDialogue("levelUp", true);
    // Re-render panel immediately so build menu shows newly unlocked items
    renderPanel();
    renderWorld();
  }
}

function addHearts(amount, source = "hearts") {
  const gain = Math.max(0, amount);
  state.hearts += gain;
  state.totalHearts += gain;
  if (source !== "idle") gainXp(Math.max(1, Math.floor(Math.pow(gain, 0.75) / 12)));
  checkAchievements();
  scheduleHudUpdate();
}

function addFriendXp(characterId, amount) {
  state.friendship[characterId] ||= { xp: 0 };
  // Apply friend boost from active character
  const active = getCharacter();
  if (active.friendBoost > 0) {
    amount = Math.floor(amount * (1 + active.friendBoost));
  }
  // My Melody friendship bonus from her own level
  const melodyBonus = 1 + (friendLevel("melody") - 1) * .004;
  amount = Math.floor(amount * melodyBonus);

  const before = friendLevel(characterId);
  state.friendship[characterId].xp += amount;
  const after = friendLevel(characterId);
  if (after > before) {
    const character = getCharacter(characterId);
    toast(`${character.name} amizade Lv. ${after}`);
    state.gems += Math.max(1, Math.floor((after - before) / 2));
  }
}

const playlist = ["Hello-Kitty.ogg", "Hello-Kitty-2.ogg", "Hello-Kitty-3.ogg", "Hello-Kitty-4.ogg"];
let bgMusic = null;
let currentTrack = 0;
let playedFirstCycle = false;
let audioUnlocked = false;

function pickNextTrack() {
  if (!playedFirstCycle) {
    const next = currentTrack + 1;
    if (next >= playlist.length) {
      playedFirstCycle = true;
      return pickNextTrack();
    }
    return next;
  }
  const candidates = playlist.map((_, i) => i).filter(i => i !== currentTrack);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function updateAudio() {
  if (!bgMusic) {
    bgMusic = new Audio(playlist[currentTrack]);
    bgMusic.volume = state.settings.musicVolume ?? 0.15;
    bgMusic.addEventListener("ended", () => {
      currentTrack = pickNextTrack();
      bgMusic.src = playlist[currentTrack];
      if (state.settings.music) bgMusic.play().catch(() => {});
    });
  }
  bgMusic.volume = state.settings.musicVolume ?? 0.15;
  if (state.settings.music && !appInBackground) {
    if (bgMusic.paused) bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
}

function setAppBackgrounded(isBackgrounded) {
  appInBackground = isBackgrounded;
  if (isBackgrounded) {
    resumeMusicAfterForeground = Boolean(state.settings.music && bgMusic && !bgMusic.paused);
    if (bgMusic) bgMusic.pause();
    if (audioContext && audioContext.state === "running") audioContext.suspend().catch(() => {});
    forceSave();
    return;
  }
  if (audioContext && audioContext.state === "suspended") audioContext.resume().catch(() => {});
  applyOfflineProgress();
  renderHud();
  if (resumeMusicAfterForeground && state.settings.music) updateAudio();
  resumeMusicAfterForeground = false;
}

function initAppLifecycleAudio() {
  setAppBackgrounded(document.hidden);
  document.addEventListener("visibilitychange", () => setAppBackgrounded(document.hidden));
  window.addEventListener("pagehide", () => setAppBackgrounded(true));
  window.addEventListener("pageshow", () => setAppBackgrounded(false));
  document.addEventListener("pause", () => setAppBackgrounded(true), false);
  document.addEventListener("resume", () => setAppBackgrounded(false), false);
  const capacitorApp = window.Capacitor?.Plugins?.App;
  if (capacitorApp?.addListener) {
    capacitorApp.addListener("appStateChange", ({ isActive }) => setAppBackgrounded(!isActive));
    capacitorApp.addListener("pause", () => setAppBackgrounded(true));
    capacitorApp.addListener("resume", () => setAppBackgrounded(false));
  }
}

// Unlock all audio (music + SFX context) on first user gesture
function unlockAudio() {
  if (audioUnlocked) return;
  audioUnlocked = true;
  // Resume AudioContext if it was suspended (happens on page reload in browsers)
  if (audioContext && audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }
  // Start background music
  if (state.settings.music) updateAudio();
}

// Try immediately (works in APK / WebView where autoplay is allowed)
setTimeout(() => {
  if (state.settings.music) {
    updateAudio(); // will silently fail in browsers, works in APK
  }
}, 100);

// Fallback: unlock on first user interaction (needed for browsers)
["click", "touchstart", "keydown"].forEach(evt =>
  document.addEventListener(evt, unlockAudio, { once: false, passive: true })
);

function playSound(kind = "tap", pitchShift = 0) {
  if (!state.settings.sound) return;
  // Ensure audio is unlocked
  if (!audioUnlocked) unlockAudio();
  audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
  // Resume if suspended (browser policy after reload)
  if (audioContext.state === "suspended") audioContext.resume();
  const now = audioContext.currentTime;

  if (kind === "tap") {
    // Attack Layer (Click/Pop) - Triangle wave
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(800 + pitchShift, now);
    osc1.frequency.exponentialRampToValueAtTime(1200 + pitchShift, now + 0.05);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc1.connect(gain1).connect(audioContext.destination);
    osc1.start(now); osc1.stop(now + 0.1);

    // Body Layer (Thump) - Sine wave
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(400 + pitchShift, now);
    osc2.frequency.exponentialRampToValueAtTime(200 + pitchShift, now + 0.1);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.05, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc2.connect(gain2).connect(audioContext.destination);
    osc2.start(now); osc2.stop(now + 0.15);
  } else if (kind === "reward") {
    // Sweetener Layer (Sparkle) - Square wave with filter
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(880 + pitchShift, now);
    osc1.frequency.setValueAtTime(1108 + pitchShift, now + 0.05); // Major 3rd
    osc1.frequency.setValueAtTime(1318 + pitchShift, now + 0.1);  // Perfect 5th
    
    const filter = audioContext.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2500, now);
    filter.frequency.linearRampToValueAtTime(500, now + 0.2);

    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.025, now + 0.02);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(filter).connect(gain1).connect(audioContext.destination);
    osc1.start(now); osc1.stop(now + 0.3);

    // Body Layer (Bell/Chime) - Sine wave
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(440 + pitchShift, now);
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.06, now + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc2.connect(gain2).connect(audioContext.destination);
    osc2.start(now); osc2.stop(now + 0.35);
  }
}

let pendingSave = null;
function saveState() {
  state.lastSaved = Date.now();
  if (pendingSave) clearTimeout(pendingSave);
  pendingSave = setTimeout(() => {
    const execSave = () => { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); };
    if (window.requestIdleCallback) requestIdleCallback(execSave, { timeout: 1000 });
    else execSave();
    pendingSave = null;
  }, 800);
}

function debouncedSave() { saveState(); }
function forceSave() {
  if (pendingSave) clearTimeout(pendingSave);
  state.lastSaved = Date.now();
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

function scheduleHudUpdate() {
  if (hudRafId) return;
  hudRafId = requestAnimationFrame(() => { renderHud(); hudRafId = null; });
}

function scheduleUpgradeRefresh(needsWorldRefresh = false) {
  renderHud();
  upgradeNeedsWorldRefresh ||= needsWorldRefresh;
  if (upgradeRefreshTimer) clearTimeout(upgradeRefreshTimer);
  upgradeRefreshTimer = setTimeout(() => {
    if (upgradeNeedsWorldRefresh) renderWorld();
    if (state.activeTab === "build") renderPanel();
    updateHudMetrics();
    upgradeNeedsWorldRefresh = false;
    upgradeRefreshTimer = null;
  }, 90);
}

function updateHudMetrics() {
  if (hudMetricRaf) return;
  hudMetricRaf = requestAnimationFrame(() => {
    const hud = document.querySelector(".hud");
    if (hud) {
      const bottom = Math.ceil(hud.getBoundingClientRect().bottom);
      document.documentElement.style.setProperty("--hud-clearance", `${bottom + 12}px`);
    }
    hudMetricRaf = null;
  });
}

function applyOfflineProgress() {
  const now = Date.now();
  const lastSaved = state.lastSaved || now;
  const elapsedSeconds = Math.max(0, Math.min(12 * 60 * 60, (now - lastSaved) / 1000));
  if (elapsedSeconds < 5) {
    state.lastSaved = now;
    return;
  }
  const cinnaBonus = 1 + (friendLevel("cinnamoroll") - 1) * .0025;
  const gain = Math.floor(productionPerSecond() * elapsedSeconds * cinnaBonus);
  if (gain > 0) {
    state.hearts += gain;
    state.totalHearts += gain;
    toast(`Progresso offline: +${formatNumber(gain)} ♡`);
    gainXp(Math.max(1, Math.floor((Math.pow(gain, 0.75) / 12) * 0.5)));
  }
  state.lastSaved = now;
}

function handleTap(event) {
  if (event.type === "touchstart") event.preventDefault();
  const rect = characterButton.getBoundingClientRect();
  let x = rect.left + rect.width / 2;
  let y = rect.top + rect.height / 2;

  if (event.touches && event.touches[0]) {
    x = event.touches[0].clientX;
    y = event.touches[0].clientY;
  } else if (typeof event.clientX === "number") {
    x = event.clientX;
    y = event.clientY;
  }

  const now = Date.now();
  
  // Rate limiting keeps the Android WebView from drowning in visual/audio work.
  if (now - lastTapTime < tapMinInterval) return;

  if (now - lastTapTime < 500) {
    comboCount++;
  } else {
    comboCount = 0;
  }
  lastTapTime = now;

  const critical = Math.random() < .04 + friendLevel("badtz") * .0008;
  
  let comboMultiplier = 1;
  if (comboCount >= 20) comboMultiplier = 3;
  else if (comboCount >= 10) comboMultiplier = 2;
  else if (comboCount >= 5) comboMultiplier = 1.5;

  const amount = Math.floor(tapPower() * (critical ? 3 : 1) * comboMultiplier);
  
  state.taps++;
  addHearts(amount, "tap");
  addFriendXp(state.selectedCharacter, 2 + (getCharacter().id === "daniel" ? 1 : 0));
  
  // Quick visual feedback — fast class toggles
  characterButton.classList.add("is-tapping");
  setTimeout(() => characterButton.classList.remove("is-tapping"), 80);
  
  if (critical || comboCount >= 20) {
    characterButton.classList.add("is-surprised");
    setTimeout(() => characterButton.classList.remove("is-surprised"), 350);
  } else if (comboCount >= 10) {
    characterButton.classList.add("is-excited");
    setTimeout(() => characterButton.classList.remove("is-excited"), 250);
  }
  
  if (state.taps % 100 === 0) {
    characterButton.classList.add("kitty-jump");
    setTimeout(() => characterButton.classList.remove("kitty-jump"), 800);
    burstAt(x, y, isMobileRuntime ? 12 : 40, "✨", true);
  } else if (state.taps % 50 === 0) {
    burstAt(x, y, isMobileRuntime ? 10 : 30, "🎊", true);
  }

  // Novas reações da Kitty
  if (!isMobileRuntime && state.taps % 20 === 0) {
    characterButton.classList.add("kitty-waving");
    setTimeout(() => characterButton.classList.remove("kitty-waving"), 1200);
  } else if (!isMobileRuntime && state.taps % 5 === 0) {
    characterButton.classList.add("kitty-happy-bounce");
    setTimeout(() => characterButton.classList.remove("kitty-happy-bounce"), 600);
  } else {
    characterButton.classList.add("is-happy");
    setTimeout(() => characterButton.classList.remove("is-happy"), 150);
  }

  // Glifos de carinho flutuantes
  if (state.taps % (isMobileRuntime ? 25 : 10) === 0) {
    const careGlyphs = ["💕", "🥰", "😊"];
    floatText(careGlyphs[Math.floor(Math.random() * careGlyphs.length)], x, y - 60, true, false);
  }

  // Screen shake on critical or big combo
  if (!isMobileRuntime && (critical || comboCount >= 10)) {
    app.classList.remove("screen-shake");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        app.classList.add("screen-shake");
      });
    });
    setTimeout(() => app.classList.remove("screen-shake"), 100);
  }

  // Float text with position variation
  const offsetX = (Math.random() - 0.5) * 60;
  const offsetY = (Math.random() - 0.5) * 30;
  let floatMsg = `+${formatNumber(amount)}`;
  if (critical) floatMsg += "!";
  if (comboCount >= 5) floatMsg += ` (${comboCount}x)`;
  
  // Limite Visual: Se estiver fazendo um combo muito alto (clicando rápido), só mostra o texto a cada 2 cliques para poupar tela
  if (comboCount < 8 || state.taps % (isMobileRuntime ? 4 : 2) === 0) {
    floatText(floatMsg, x + offsetX, y + offsetY - 20, critical, comboCount >= 5);
  }
  
  // Rich particle burst (reduzido dinamicamente se estiver em combo muito alto)
  let particleCount = critical ? 30 : (comboCount >= 10 ? 22 : 14);
  if (comboCount > 20) particleCount = Math.floor(particleCount / 2); // Metade das partículas em ultra-velocidade
  if (isMobileRuntime) particleCount = Math.min(particleCount, critical ? 8 : 5);
  
  burstAt(x, y, particleCount, critical ? "🌟" : "♡", comboCount >= 5);
  if (!isMobileRuntime && state.taps % 3 === 0 && comboCount < 20) burstAt(x, y, 6, "✨", true);
  
  if (state.taps % 15 === 0) triggerDialogue("click", false);

  // Limite de Som: Reduz a sobreposição de áudio em cliques muito rápidos
  if (comboCount < 6 || state.taps % (isMobileRuntime ? 4 : 2) === 0) {
    playSound(critical ? "reward" : "tap", Math.min(comboCount * 15, 600));
  }
  if (state.settings.vibration && navigator.vibrate && (!isMobileRuntime || state.taps % 3 === 0)) navigator.vibrate(critical ? [18, 22, 18] : 12);
  state.tapsSinceLastGift = (state.tapsSinceLastGift || 0) + 1;
  if (Math.random() < 0.03 || state.tapsSinceLastGift >= 50) {
    randomGiftDrop();
    state.tapsSinceLastGift = 0;
  }
  
  // NPC Bonus and Reactions
  if (state.taps % 50 === 0) {
    const unlockedNpcs = NPCs.filter(n => state.level >= n.unlockLv);
    if (unlockedNpcs.length > 0) {
      const luckyNpc = unlockedNpcs[Math.floor(Math.random() * unlockedNpcs.length)];
      const bonus = amount * 10;
      addHearts(bonus, "npc");
      toast(`${luckyNpc.icon} ${luckyNpc.name} ajudou! +${formatNumber(bonus)}`);
    }
  }
  if (!isMobileRuntime && Math.random() < 0.1) {
    const npcsElements = document.querySelectorAll(".npc");
    if (npcsElements.length > 0) {
      const el = npcsElements[Math.floor(Math.random() * npcsElements.length)];
      el.classList.add("npc-react");
      setTimeout(() => el.classList.remove("npc-react"), 400);
    }
  }

  // Lightweight update — only HUD, not full panel re-render
  scheduleHudUpdate();
  debouncedSave();
}

function randomGiftDrop() {
  const gift = gifts[Math.floor(Math.random() * gifts.length)];
  state.inventory[gift.id] = (state.inventory[gift.id] || 0) + 1;
  toast(`${gift.icon} ${gift.name} encontrado!`);
}

const textPool = [];
let textPoolIdx = 0;
const particlePool = [];
let particlePoolIdx = 0;

function initPools() {
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.style.display = "none";
    document.body.appendChild(el);
    textPool.push(el);
  }
  for (let i = 0; i < 100; i++) {
    const el = document.createElement("span");
    el.style.display = "none";
    document.body.appendChild(el);
    particlePool.push(el);
  }
}
initPools();

function floatText(text, x, y, isCritical = false, isCombo = false) {
  const el = textPool[textPoolIdx];
  textPoolIdx = (textPoolIdx + 1) % textPool.length;
  const hudBottom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hud-clearance")) || 120;
  const safeX = Math.max(26, Math.min(window.innerWidth - 26, x));
  const safeY = Math.max(hudBottom + 8, Math.min(window.innerHeight - 180, y));
  
  el.className = "float-number" + (isCritical ? " is-critical" : "") + (isCombo ? " is-combo" : "");
  el.textContent = text;
  el.style.left = `${safeX}px`;
  el.style.top = `${safeY}px`;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 1000);
}

function burstAt(x, y, count = 10, glyph = "♡", isCombo = false) {
  const heartColors = ["♡", "💖", "💛", "💗"];
  for (let i = 0; i < count; i++) {
    const particle = particlePool[particlePoolIdx];
    particlePoolIdx = (particlePoolIdx + 1) % particlePool.length;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 34 + Math.random() * (isCombo ? 120 : 84);
    particle.className = "particle";
    
    let currentGlyph = glyph;
    if (glyph === "♡" && Math.random() > 0.4) {
      currentGlyph = heartColors[Math.floor(Math.random() * heartColors.length)];
    }
    if (isCombo && Math.random() > 0.6) {
      currentGlyph = "✨";
    }

    particle.textContent = Math.random() > .22 ? currentGlyph : "✦";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance - 18}px`);
    particle.style.setProperty("--rot", `${Math.random() * 360 - 180}deg`);
    particle.style.setProperty("--particle-size", `${isMobileRuntime ? 11 + Math.random() * 7 : 14 + Math.random() * 14}px`);
    particle.style.setProperty("--particle-color", Math.random() > .5 ? "#ff7fa5" : "#ffd568");
    
    particle.style.display = "block";
    setTimeout(() => { particle.style.display = "none"; }, 820);
  }
}

function toast(message) {
  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.textContent = message;
  document.getElementById("toastLayer").appendChild(toastEl);
  setTimeout(() => toastEl.remove(), 2700);
}

function updateWorldProgression() {
  document.querySelectorAll("[data-unlock-lv]").forEach(el => {
    const lv = parseInt(el.dataset.unlockLv);
    if (state.level >= lv) {
      el.classList.add("unlocked");
    }
  });
}

function applyTheme() {
  if (!state.settings.theme) state.settings.theme = "auto";
  let activeTheme = state.settings.theme;
  if (activeTheme === "auto") {
    const currentHour = new Date().getHours();
    activeTheme = (currentHour >= 18 || currentHour < 6) ? "dark" : "light";
  }
  if (activeTheme === "dark") {
    app.dataset.theme = "dark";
  } else {
    delete app.dataset.theme;
  }
}

function updateTime() {
  const hour = new Date().getHours();
  let timeOfDay = "day";
  if (hour >= 5 && hour < 8) timeOfDay = "dawn";
  else if (hour >= 8 && hour < 16) timeOfDay = "day";
  else if (hour >= 16 && hour < 19) timeOfDay = "sunset";
  else timeOfDay = "night";
  
  if (app.dataset.time !== timeOfDay) {
    app.dataset.time = timeOfDay;
    updateEnvironmentEffects();
  }
  applyTheme();
}

function applyOutfit() {
  const style = OUTFITS[state.outfit];
  const dress = document.getElementById("kittyDress");
  if (dress) dress.setAttribute("fill", style.dress);
  const mc = state.mainCharacter || "kitty";
  app.dataset.mainCharacter = mc;
  // Bug 5 fix: explicit JS fallback for Kuromi/Kitty SVG display
  // Ensures visibility even if CSS data-attribute selector hasn't been applied yet
  const kittySvg = document.querySelector(".kitty-svg");
  const kuromiSvg = document.querySelector(".kuromi-svg");
  const chococatSvg = document.querySelector(".chococat-svg");
  if (kittySvg && kuromiSvg && chococatSvg) {
    kittySvg.style.display = "none";
    kuromiSvg.style.display = "none";
    chococatSvg.style.display = "none";

    if (mc === "kuromi") {
      kuromiSvg.style.display = "block";
    } else if (mc === "chococat") {
      chococatSvg.style.display = "block";
    } else {
      kittySvg.style.display = "block";
    }
  }
}

const NPC_INTERACTIONS = [
  { a: "melody", b: "pompom", message: "🌸💛", chance: .16, distance: 16 },
  { a: "kuromi", b: "cinnamoroll", message: "💜☁️", chance: .12, distance: 18 },
  { a: "melody", b: "kuromi", message: "✨🎶", chance: .1, distance: 16 },
  { a: "daniel", b: "kitty", message: "💌🎀", chance: .2, distance: 20 },
  { a: "badtz", b: "keroppi", message: "⚡🐸", chance: .15, distance: 18 },
  { a: "chococat", b: "melody", message: "📚🌸", chance: .15, distance: 16 },
  { a: "twinstars", b: "cinnamoroll", message: "🌟☁️", chance: .25, distance: 25 }
];

function createNpcBubble(message, x, y) {
  const bubble = document.createElement("div");
  bubble.className = "npc-bubble";
  bubble.textContent = message;
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  document.getElementById("worldContainer").appendChild(bubble);
  setTimeout(() => bubble.remove(), 1400);
}

function getNpcClass(id) {
  if (id === "cinnamoroll") return "npc-flying";
  if (id === "keroppi") return "npc-jumping";
  if (id === "badtz") return "npc-sneaking";
  if (id === "twinstars") return "npc-glowing";
  if (id === "daniel") return "npc-dancing";
  return "npc-walking";
}

function moveNPCs() {
  const layer = document.getElementById("npcLayer");
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 19 || currentHour < 5;
  const isDay = currentHour >= 8 && currentHour < 16;
  
  NPCs.forEach((npc) => {
    if (state.level < npc.unlockLv && !development) return;

    let el = document.getElementById(`npc-${npc.id}`);
    
    // Time-based spawning rules
    if (npc.id === "cinnamoroll" && !isDay) {
        if (el) el.style.display = "none";
        return;
    }
    if (npc.id === "twinstars" && !isNight) {
        if (el) el.style.display = "none";
        return;
    }

    const route = npc.route || [];
    if (!el) {
      el = document.createElement("button");
      el.type = "button";
      el.id = `npc-${npc.id}`;
      el.className = `npc ${getNpcClass(npc.id)}`;
      el.ariaLabel = `${npc.name} passeando pelo mapa`;
      el.textContent = npc.icon;
      el.dataset.routeIndex = "0";
      el.dataset.routeDir = "1";
      layer.appendChild(el);
      const start = route[0] || { x: 20, y: 70 };
      el.style.left = `${start.x}%`;
      el.style.top = `${start.y}%`;
      el.style.transform = "scaleX(1)";
    } else {
      el.style.display = "";
    }

    const currentIndex = Number(el.dataset.routeIndex || 0);
    const direction = Number(el.dataset.routeDir || 1);
    const nextIndex = currentIndex + direction;
    const nextPoint = route[nextIndex];
    if (!nextPoint) {
      el.dataset.routeDir = String(direction * -1);
      el.dataset.routeIndex = String(currentIndex + direction * -1);
      return;
    }

    const currentX = parseFloat(el.style.left);
    const currentY = parseFloat(el.style.top);

    // NPC POI & Idling Logic
    if (el.classList.contains("npc-walking") && Math.random() < 0.2 && !el.classList.contains("npc-idle")) {
      el.classList.add("npc-idle");
      // 40% chance for an emoji bubble
      if (Math.random() < 0.4) {
        const emojis = ["☺️", "💤", "🎵", "✨"];
        const e = emojis[Math.floor(Math.random() * emojis.length)];
        const worldRect = document.getElementById("worldContainer").getBoundingClientRect();
        const x = worldRect.left + (currentX * worldRect.width / 100);
        const y = worldRect.top + (currentY * worldRect.height / 100);
        createNpcBubble(e, x, y - 20);
      }
      setTimeout(() => el.classList.remove("npc-idle"), 4500);
      return; // Skip movement this cycle
    }
    if (el.classList.contains("npc-idle")) return;

    el.dataset.routeIndex = String(nextIndex);
    el.style.left = `${nextPoint.x}%`;
    el.style.top = `${nextPoint.y}%`;
    el.style.transform = nextPoint.x >= currentX ? "scaleX(1)" : "scaleX(-1)";
    el.classList.add(getNpcClass(npc.id));
  });

  NPC_INTERACTIONS.forEach((interaction) => {
    const a = document.getElementById(`npc-${interaction.a}`);
    const b = document.getElementById(`npc-${interaction.b}`);
    if (!a || !b) return;
    const ax = parseFloat(a.style.left);
    const ay = parseFloat(a.style.top);
    const bx = parseFloat(b.style.left);
    const by = parseFloat(b.style.top);
    const distance = Math.hypot(ax - bx, ay - by);
    if (distance <= interaction.distance && Math.random() < interaction.chance) {
      a.classList.add("is-interacting");
      b.classList.add("is-interacting");
      setTimeout(() => { a.classList.remove("is-interacting"); b.classList.remove("is-interacting"); }, 1200);
      const worldRect = document.getElementById("worldContainer").getBoundingClientRect();
      const x = worldRect.left + ((ax + bx) / 2) * worldRect.width / 100;
      const y = worldRect.top + ((ay + by) / 2) * worldRect.height / 100;
      createNpcBubble(interaction.message, x, y);
    }
  });
}

function updateEnvironmentEffects() {
  const date = new Date();
  const month = date.getMonth(); // 0-11
  const day = date.getDate();
  const hour = date.getHours();
  const eventLayer = document.getElementById("eventLayer");
  eventLayer.innerHTML = "";

  if (month === 11) { // Dezembro
    state.event = SEASONS.CHRISTMAS;
    state.outfit = "CHRISTMAS";
    spawnAmbientPetals("❄", isMobileRuntime ? 5 : 12, { minDur: 8, maxDur: 14, minSize: 10, maxSize: 16, opacity: 0.5 });
  } else if (month === 9 && day > 20) { // Halloween
    state.event = SEASONS.HALLOWEEN;
    state.outfit = "HALLOWEEN";
    spawnAmbientPetals("✦", isMobileRuntime ? 3 : 6, { minDur: 10, maxDur: 16, minSize: 8, maxSize: 12, opacity: 0.35 });
  } else {
    state.event = SEASONS.NORMAL;
  }

  // Time of day — subtle ambient particles (reduced on mobile)
  const mp = isMobileRuntime ? 0.5 : 1; // mobile petal multiplier
  if (hour >= 5 && hour < 8) {
    spawnAmbientPetals("✧", Math.ceil(6 * mp), { minDur: 10, maxDur: 18, minSize: 8, maxSize: 12, opacity: 0.35 });
    spawnAmbientPetals("🌸", Math.ceil(4 * mp), { minDur: 12, maxDur: 20, minSize: 10, maxSize: 14, opacity: 0.3 });
  } else if (hour >= 8 && hour < 16) {
    spawnAmbientPetals("🌸", Math.ceil(5 * mp), { minDur: 14, maxDur: 22, minSize: 10, maxSize: 14, opacity: 0.3 });
    spawnAmbientPetals("♡", Math.ceil(3 * mp), { minDur: 16, maxDur: 24, minSize: 8, maxSize: 12, opacity: 0.25 });
  } else if (hour >= 16 && hour < 19) {
    spawnAmbientPetals("✧", Math.ceil(6 * mp), { minDur: 10, maxDur: 16, minSize: 8, maxSize: 14, opacity: 0.4 });
    spawnAmbientPetals("🌸", Math.ceil(3 * mp), { minDur: 14, maxDur: 20, minSize: 10, maxSize: 14, opacity: 0.3 });
  } else {
    spawnAmbientPetals("✦", Math.ceil(8 * mp), { minDur: 8, maxDur: 14, minSize: 6, maxSize: 10, opacity: 0.5 });
    spawnAmbientPetals("✧", Math.ceil(6 * mp), { minDur: 10, maxDur: 18, minSize: 8, maxSize: 14, opacity: 0.4 });
  }
}

function spawnAmbientPetals(glyph, count, opts = {}) {
  const { minDur = 10, maxDur = 18, minSize = 10, maxSize = 16, opacity = 0.4 } = opts;
  const layer = document.getElementById("eventLayer");
  const diversity = ["🌸", "🌺", "✿", "❀"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "ambient-petal";
    p.textContent = (glyph === "🌸") ? diversity[Math.floor(Math.random() * diversity.length)] : glyph;
    p.style.left = Math.random() * 100 + "%";
    const duration = minDur + Math.random() * (maxDur - minDur);
    const size = minSize + Math.random() * (maxSize - minSize);
    const drift = (Math.random() - 0.5) * 80;
    const rot = 180 + Math.random() * 360;
    p.style.setProperty("--petal-duration", `${duration}s`);
    p.style.setProperty("--petal-delay", `${-Math.random() * duration}s`);
    p.style.setProperty("--petal-size", `${size}px`);
    p.style.setProperty("--petal-opacity", `${opacity}`);
    p.style.setProperty("--petal-drift", `${drift}px`);
    p.style.setProperty("--petal-rot", `${rot}deg`);
    layer.appendChild(p);
  }
}

const _hudHeartEl = document.getElementById("heartCounter");
const _hudLevelEl = document.getElementById("levelLabel");
const _hudXpEl = document.getElementById("xpFill");
const _hudHpsEl = document.getElementById("hpsCounter");
const _hudGemEl = document.getElementById("gemCounter");

function renderHud() {
  _hudHeartEl.textContent = formatNumber(Math.floor(state.hearts));
  _hudLevelEl.textContent = `Lv. ${state.level}`;
  _hudXpEl.style.width = `${Math.min(100, (state.xp / xpForLevel(state.level)) * 100)}%`;
  _hudHpsEl.textContent = `${formatNumber(productionPerSecond())}/s`;
  _hudGemEl.textContent = formatNumber(state.gems);
  
  // Real-time UI updates for Build panel buttons
  if (state.activeTab === "build") {
    document.querySelectorAll("[data-upgrade]").forEach(btn => {
      const b = buildings.find(x => x.id === btn.dataset.upgrade);
      if (b && state.hearts >= buildingCost(b) && state.level >= b.unlock) btn.removeAttribute("disabled");
      else btn.setAttribute("disabled", "true");
    });
    document.querySelectorAll("[data-click-upgrade]").forEach(btn => {
      const u = clickUpgrades.find(x => x.id === btn.dataset.clickUpgrade);
      if (u && state.hearts >= clickUpgradeCost(u)) btn.removeAttribute("disabled");
      else btn.setAttribute("disabled", "true");
    });
  }
}

function renderWorld() {
  // 1. Sky Layer
  const layerSky = document.getElementById("layerSky");
  const cloudCount = isMobileRuntime ? 2 : 3;
  if (!layerSky.innerHTML) {
    layerSky.innerHTML = Array(cloudCount).fill(0).map((_, i) => `<span class="cloud" style="top:${5 + i * 15}%;--cloud-size:${40 + Math.random() * 30}px;--cloud-dur:${30 + Math.random() * 30}s;animation-delay:-${Math.random() * 20}s">☁️</span>`).join("");
  }
  
  // 2. Background Layer
  const layerBg = document.getElementById("layerBg");
  if (!layerBg.innerHTML) {
    layerBg.innerHTML = '<span class="bg-element" style="--bg-size:60px">🌲</span><span class="bg-element" style="--bg-size:90px;--sway-dur:8s">🏔️</span><span class="bg-element" style="--bg-size:60px">🌲</span>';
  }
  
  // 3. Buildings Layer — spread to edges, never overlap center
  const layerBuildings = document.getElementById("layerBuildings");
  const unlockedBuildings = buildings.filter(b => buildingLevel(b.id) > 0);
  // Fixed slots: left edge, right edge, far-left, far-right, etc.
  const buildingSlots = [
    { left: '4vw',  bottom: '10vh' },   // far left
    { left: '88vw', bottom: '10vh' },   // far right
    { left: '15vw', bottom: '18vh' },   // mid-left
    { left: '78vw', bottom: '18vh' },   // mid-right
    { left: '2vw',  bottom: '26vh' },   // far left high
    { left: '90vw', bottom: '26vh' },   // far right high
    { left: '22vw', bottom: '30vh' },   // mid-left high
  ];
  const buildingSignature = unlockedBuildings.map((building) => `${building.id}:${buildingLevel(building.id)}`).join("|");
  if (layerBuildings.dataset.renderedSignature !== buildingSignature) {
    layerBuildings.innerHTML = unlockedBuildings.map((b, i) => {
      const slot = buildingSlots[i % buildingSlots.length];
      return `<div class="building-sprite" data-building="${b.id}" title="${b.name} Lv.${buildingLevel(b.id)}" style="left:${slot.left};bottom:${slot.bottom};--build-size:${Math.min(70, 55 + buildingLevel(b.id) * 2)}px">${b.icon}</div>`;
    }).join("");
    layerBuildings.dataset.renderedSignature = buildingSignature;
  }
  
  // 4. Characters Layer — spread them out, no overlap
  const layerCharacters = document.getElementById("layerCharacters");
  const existingFriends = layerCharacters.querySelectorAll('.world-friend');
  const unlockedFriends = characters.filter((c, index) => state.level >= Math.max(1, index * 3) && c.id !== "kitty");
  const friendSlots = [
    { x: '12vw', y: '0px' },
    { x: '85vw', y: '10px' },
    { x: '25vw', y: '20px' },
    { x: '72vw', y: '5px' },
    { x: '8vw',  y: '30px' },
    { x: '92vw', y: '15px' },
    { x: '35vw', y: '25px' },
    { x: '60vw', y: '8px' },
  ];
  
  if (existingFriends.length !== unlockedFriends.length) {
    Array.from(layerCharacters.children).forEach(child => { if (child.className.includes("world-friend")) child.remove(); });
    unlockedFriends.forEach((c, index) => {
      const slot = friendSlots[index % friendSlots.length];
      const friend = document.createElement("div");
      friend.className = "world-friend";
      friend.title = c.name;
      friend.dataset.select = c.id;
      friend.innerHTML = c.icon;
      friend.style.setProperty("--y-offset", slot.y);
      friend.style.setProperty("--x-pos", slot.x);
      friend.style.setProperty("--walk-dur", `${18 + index * 5}s`);
      friend.style.animationDelay = `-${index * 4}s`;
      layerCharacters.appendChild(friend);
    });
  }
  
  // 5. Foreground Layer
  const layerForeground = document.getElementById("layerForeground");
  if (!layerForeground.innerHTML) {
    const flowers = ['🌷', '🌺', '🌸', '🌼', '🌻'];
    layerForeground.innerHTML = flowers.map(f => `<span class="fg-flower" style="--sway-dur:${3 + Math.random() * 3}s">${f}</span>`).join("");
  }
}

function renderPanel() {
  const [icon, title, subtitle] = panelMeta[state.activeTab];
  panelIcon.textContent = icon;
  panelTitle.textContent = title;
  panelSubtitle.textContent = subtitle;
  if (state.activeTab === "garden") renderGarden();
  if (state.activeTab === "build") renderBuildings();
  if (state.activeTab === "friends") renderFriends();
  if (state.activeTab === "stories") renderStories();
  if (state.activeTab === "diary") renderDiary();
}

function renderGarden() {
  const nextBuilding = buildings.find((building) => state.level < building.unlock) || buildings.find((building) => buildingLevel(building.id) === 0);
  panelContent.innerHTML = [
    `<div class="stat-strip"><strong>Toque poderoso</strong><div class="muted">+${formatNumber(tapPower())} ♡ por toque</div></div>`,
    `<div class="stat-strip"><strong>Produção idle</strong><div class="muted">${formatNumber(productionPerSecond())} ♡ por segundo</div></div>`,
    `<div class="stat-strip"><strong>Amigo ativo</strong><div class="muted">${getCharacter().icon} ${getCharacter().name} · ${getCharacter().bonus}</div></div>`,
    `<div class="stat-strip"><strong>Próximo encanto</strong><div class="muted">${nextBuilding ? `${nextBuilding.icon} ${nextBuilding.name} no Lv. ${nextBuilding.unlock}` : "Todas as áreas iniciais abertas"}</div></div>`
  ].join("");
}

function renderBuildings() {
  const buildingsHtml = buildings.map((building) => {
    const level = buildingLevel(building.id);
    const locked = state.level < building.unlock;
    const cost = buildingCost(building);
    const canBuy = !locked && state.hearts >= cost;
    const produced = building.baseHps * level * (1 + level * .08);
    return `<article class="building-card ${locked ? "is-locked" : ""}"><div class="card-row"><div class="card-row" style="justify-content:flex-start;min-width:0"><div class="building-icon" style="--tile:${building.color}">${locked ? "🔒" : building.icon}</div><div style="min-width:0"><strong>${building.name}</strong><div class="muted">Lv. ${level} · ${formatNumber(produced)}/s</div></div></div><button class="primary-action tiny-button" type="button" data-upgrade="${building.id}" ${canBuy ? "" : "disabled"}>${locked ? `Lv. ${building.unlock}` : `${formatNumber(cost)} ♡`}</button></div><div class="muted" style="margin-top:8px">${building.desc}</div><div class="progress"><span style="width:${Math.min(100, level * 6)}%"></span></div></article>`;
  }).join("");

  const clickHtml = clickUpgrades.map((upgrade) => {
    const owned = state.clickUpgrades[upgrade.id] || 0;
    const cost = clickUpgradeCost(upgrade);
    const canBuy = state.hearts >= cost;
    return `<article class="building-card"><div class="card-row"><div class="card-row" style="justify-content:flex-start;min-width:0"><div class="building-icon" style="--tile:#ffd6e4">${upgrade.icon}</div><div style="min-width:0"><strong>${upgrade.name}</strong><div class="muted">x${owned} · +${upgrade.bonus}/clique</div></div></div><button class="primary-action tiny-button" type="button" data-click-upgrade="${upgrade.id}" ${canBuy ? "" : "disabled"}>${formatNumber(cost)} ♡</button></div><div class="muted" style="margin-top:8px">${upgrade.desc}</div></article>`;
  }).join("");

  panelContent.innerHTML = `<div class="grid"><div style="padding:6px 2px;font-weight:800;font-size:13px;color:var(--ink-soft)">🏰 Produção Automática</div>${buildingsHtml}<div style="padding:6px 2px;margin-top:8px;font-weight:800;font-size:13px;color:var(--ink-soft)">✨ Poder de Clique</div>${clickHtml}</div>`;
}

function renderFriends() {
  const active = getCharacter();
  const activeLevel = friendLevel(active.id);
  const kuromiUnlocked = (state.rebirths || 0) > 0 || state.mainCharacter === "kuromi" || state.friendship.kuromi?.unlocked;
  const chococatUnlocked = (state.rebirths || 0) > 0 || state.mainCharacter === "chococat" || state.friendship.chococat?.unlocked || state.level >= 18;
  const mainCharacterPicker = (kuromiUnlocked || chococatUnlocked) ? `<article class="quest-card character-picker"><strong>Personagem principal</strong><div class="muted">Escolha quem aparece no centro do jardim.</div><div class="character-pick-row"><button class="bubble-button ${(!state.mainCharacter || state.mainCharacter === "kitty") ? "is-active" : ""}" type="button" data-main-character="kitty">🎀 Hello Kitty</button>${kuromiUnlocked ? `<button class="bubble-button ${state.mainCharacter === "kuromi" ? "is-active" : ""}" type="button" data-main-character="kuromi">💜 Kuromi</button>` : ""}${chococatUnlocked ? `<button class="bubble-button ${state.mainCharacter === "chococat" ? "is-active" : ""}" type="button" data-main-character="chococat">📚 Chococat</button>` : ""}</div></article>` : "";
  panelContent.innerHTML = `${mainCharacterPicker}<article class="friend-card is-active" style="margin-bottom:10px"><div class="card-row"><div class="card-row" style="justify-content:flex-start"><div class="avatar" style="--tile:${active.color}">${active.icon}</div><div><strong>${active.name}</strong><div class="muted">Amizade Lv. ${activeLevel} · favorito: ${getGift(active.favorite).icon} ${getGift(active.favorite).name}</div></div></div><button class="bubble-button tiny-button" type="button" data-select-tab="stories">📖</button></div><div class="progress"><span style="width:${friendProgress(active.id)}%"></span></div><div class="gift-row" style="margin-top:10px">${gifts.map((gift) => `<button class="gift-chip" type="button" data-gift="${gift.id}" ${(state.inventory[gift.id] || 0) <= 0 ? "disabled" : ""}>${gift.icon} ${state.inventory[gift.id] || 0}</button>`).join("")}</div></article><div class="friend-list">${characters.map((character, index) => {
    const locked = character.id === "kuromi" ? !kuromiUnlocked && state.level < Math.max(1, index * 3) : state.level < Math.max(1, index * 3);
    return `<button class="friend-card ${character.id === state.selectedCharacter ? "is-active" : ""}" type="button" data-select="${character.id}" ${locked ? "disabled" : ""}><div class="card-row"><div class="avatar" style="--tile:${character.color}">${locked ? "🔒" : character.icon}</div><div style="text-align:left;min-width:0"><strong>${locked ? "Amigo bloqueado" : character.name}</strong><div class="muted">${locked ? `Desbloqueia no Lv. ${Math.max(1, index * 3)}` : `Lv. ${friendLevel(character.id)} · ${character.bonus}`}</div></div></div><div class="progress"><span style="width:${locked ? 0 : friendProgress(character.id)}%"></span></div></button>`;
  }).join("")}</div>`;
}

function renderStories() {
  panelContent.innerHTML = `<div class="grid">${stories.map((story) => {
    const locked = state.level < story.unlock;
    const completed = state.stories[story.id];
    const friend = getCharacter(story.friend);
    
    let shuffledChoices = story.choices.map((choice, index) => ({ choice, index }));
    for (let i = shuffledChoices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledChoices[i], shuffledChoices[j]] = [shuffledChoices[j], shuffledChoices[i]];
    }
    
    return `<article class="story-card ${locked ? "is-locked" : ""}"><div class="card-row"><div class="card-row" style="justify-content:flex-start;min-width:0"><div class="avatar" style="--tile:${friend.color}">${locked ? "🔒" : story.icon}</div><div style="min-width:0"><strong>${story.title}</strong><div class="muted">${locked ? `Disponível no Lv. ${story.unlock}` : `${friend.name} · ${completed ? "✓ Concluída" : "nova recompensa"}`}</div></div></div></div><div class="muted" style="margin-top:8px">${story.text}</div><div class="story-actions">${shuffledChoices.map((item) => `<button class="bubble-button" type="button" data-story="${story.id}" data-choice="${item.index}" ${locked ? "disabled" : ""}>${item.choice}</button>`).join("")}</div></article>`;
  }).join("")}</div>`;
}

function treasureCooldownRemaining() {
  const elapsed = Date.now() - (state.lastTreasure || 0);
  const cooldown = 8 * 60 * 60 * 1000;
  return Math.max(0, cooldown - elapsed);
}

function formatCooldown(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function getBoostMultiplier(type) {
  const end = state.boosts?.[type] || 0;
  return Date.now() < end ? (type === "production" ? 2 : 3) : 1;
}

function buyGemItem(itemId) {
  const items = {
    boost_prod: { cost: 5, action: () => { state.boosts.production = Date.now() + 2 * 60 * 1000; toast("⚡ Produção x2 por 2 minutos!"); burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 20, "⚡"); } },
    gift_rain: { cost: 8, action: () => { for (let i = 0; i < 3; i++) randomGiftDrop(); toast("🎁 Chuva de presentes!"); burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 20, "🎁"); } },
    time_skip: { cost: 12, action: () => { const gain = Math.floor(productionPerSecond() * 30 * 60); addHearts(gain, "skip"); toast(`⏩ +${formatNumber(gain)} ♡ (30min)`); burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 20, "⏩"); } },
    boost_tap: { cost: 10, action: () => { state.boosts.tap = Date.now() + 60 * 1000; toast("👆 Toque x3 por 1 minuto!"); burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 20, "✨"); } },
    lucky_spin: { cost: 15, action: () => { const prizes = [1000, 3000, 8000, 15000, 50000]; const prize = prizes[Math.floor(Math.random() * prizes.length)]; addHearts(prize, "lucky"); randomGiftDrop(); randomGiftDrop(); toast(`🍀 Sorte: +${formatNumber(prize)} ♡`); burstAt(window.innerWidth / 2, window.innerHeight * 0.4, 25, "🍀"); } }
  };
  const item = items[itemId];
  if (!item || state.gems < item.cost) { toast("Cristais insuficientes!"); return; }
  state.gems -= item.cost;
  item.action();
  playSound("reward"); renderAll(); saveState();
}

function renderDiary() {
  const today = dayKey();
  const canClaim = state.daily.lastClaim !== today;
  const achieved = Object.keys(state.achievements).length;
  const total = achievementDefs.length;
  const questTapDone = Math.min(100, Math.floor((state.taps % 100) / 100 * 100));
  const questGiftDone = Math.min(100, Math.floor((state.quests.giftsGiven % 5) / 5 * 100));
  const nextAchievements = [];
  const seenPrefixes = new Set();
  for (const ach of achievementDefs) {
    if (state.achievements[ach.id]) continue;
    const prefix = ach.id.split('-')[0]; // "hearts", "taps", "building", etc.
    if (!seenPrefixes.has(prefix)) {
      seenPrefixes.add(prefix);
      nextAchievements.push(ach);
      if (nextAchievements.length >= 5) break; // Show up to 5 varied goals
    }
  }
  const treasureCd = treasureCooldownRemaining();
  const canTreasure = treasureCd <= 0;
  const prodBoostActive = getBoostMultiplier("production") > 1;
  const tapBoostActive = getBoostMultiplier("tap") > 1;
  const rebirth = rebirthProgress();
  const rebirthChecklist = rebirth.checks.map((item) => {
    const done = item.current >= item.needed;
    return `<div class="rebirth-row ${done ? "is-done" : ""}"><span>${done ? "OK" : "..."}</span><strong>${item.label}</strong><span>${formatNumber(item.current)} / ${formatNumber(item.needed)}</span></div>`;
  }).join("");
  panelContent.innerHTML = `<div class="grid">
    <article class="quest-card" style="padding:12px"><div class="card-row"><div><strong>Login diário</strong><div class="muted">Sequência: ${state.daily.streak} dias · prêmio com presentes</div></div><button class="primary-action tiny-button" type="button" data-daily ${canClaim ? "" : "disabled"}>${canClaim ? "Coletar" : "OK"}</button></div></article>
    <div class="grid two">
      <article class="quest-card" style="padding:12px"><strong>Missão de toque</strong><div class="muted">${state.taps % 100}/100 toques</div><div class="progress"><span style="width:${questTapDone}%"></span></div></article>
      <article class="quest-card" style="padding:12px"><strong>Mimo aos amigos</strong><div class="muted">${state.quests.giftsGiven % 5}/5 presentes</div><div class="progress"><span style="width:${questGiftDone}%"></span></div></article>
    </div>
    <article class="quest-card" style="padding:12px"><div class="card-row"><div><strong>Minigames e Álbum</strong><div class="muted">Divirta-se e relembre memórias especiais</div></div></div><div class="story-actions"><button class="bubble-button" type="button" data-minigame="memory">🧠 Memória</button><button class="bubble-button" type="button" data-minigame="treasure" ${canTreasure ? "" : "disabled"}>🗺️ Tesouro${canTreasure ? "" : ` (${formatCooldown(treasureCd)})`}</button><button class="bubble-button" type="button" data-action="gallery" style="background:var(--pink-soft)">📷 Álbum</button></div></article>
    <article class="quest-card" style="padding:12px"><div><strong>💎 Loja de Cristais</strong><div class="muted">Gaste seus cristais em poderes especiais · Você tem ${formatNumber(state.gems)} 💎</div></div>
      <div class="grid two" style="margin-top:10px">
        <button class="bubble-button" type="button" data-gem-buy="boost_prod" ${state.gems >= 5 ? "" : "disabled"} style="flex-direction:column;gap:4px;padding:14px 10px;text-align:center;white-space:normal">
          <span style="font-size:24px">${prodBoostActive ? "✅" : "⚡"}</span>
          <strong style="font-size:12px">${prodBoostActive ? "Ativo!" : "Produção x2"}</strong>
          <span class="muted" style="font-size:11px">${prodBoostActive ? "Boost ativo" : "2 min · 5 💎"}</span>
        </button>
        <button class="bubble-button" type="button" data-gem-buy="boost_tap" ${state.gems >= 10 ? "" : "disabled"} style="flex-direction:column;gap:4px;padding:14px 10px;text-align:center;white-space:normal">
          <span style="font-size:24px">${tapBoostActive ? "✅" : "👆"}</span>
          <strong style="font-size:12px">${tapBoostActive ? "Ativo!" : "Toque x3"}</strong>
          <span class="muted" style="font-size:11px">${tapBoostActive ? "Boost ativo" : "1 min · 10 💎"}</span>
        </button>
        <button class="bubble-button" type="button" data-gem-buy="gift_rain" ${state.gems >= 8 ? "" : "disabled"} style="flex-direction:column;gap:4px;padding:14px 10px;text-align:center;white-space:normal">
          <span style="font-size:24px">🎁</span>
          <strong style="font-size:12px">Chuva de Presentes</strong>
          <span class="muted" style="font-size:11px">3 presentes · 8 💎</span>
        </button>
        <button class="bubble-button" type="button" data-gem-buy="time_skip" ${state.gems >= 12 ? "" : "disabled"} style="flex-direction:column;gap:4px;padding:14px 10px;text-align:center;white-space:normal">
          <span style="font-size:24px">⏩</span>
          <strong style="font-size:12px">Salto Temporal</strong>
          <span class="muted" style="font-size:11px">30 min offline · 12 💎</span>
        </button>
      </div>
      <button class="primary-action" type="button" data-gem-buy="lucky_spin" ${state.gems >= 15 ? "" : "disabled"} style="margin-top:10px;width:100%">🍀 Giro da Sorte · 15 💎</button>
    </article>
    <article class="quest-card" style="padding:12px"><strong>Conquistas</strong><div class="muted">${achieved}/${total} desbloqueadas</div><div class="progress"><span style="width:${(achieved / total) * 100}%"></span></div></article>
    ${nextAchievements.map((achievement) => `<article class="achievement-card"><strong>${achievement.icon} ${achievement.name}</strong><div class="achievement-meta"><span class="muted">${achievement.desc}</span><span class="muted">+${achievement.reward} 💎</span></div></article>`).join("")}
    <article class="quest-card rebirth-card" style="padding:12px"><strong>🌟 Renascimento Magico</strong><div class="muted">Rebirths atuais: ${state.rebirths || 0}. Reseta progresso principal, dobra o poder permanente e libera Kuromi jogavel.</div><div class="rebirth-checklist">${rebirthChecklist}</div><button class="primary-action" type="button" data-action="rebirth" style="margin-top:10px;width:100%" ${rebirth.ready ? "" : "disabled"}>${rebirth.ready ? "🌟 Renascer e liberar Kuromi" : "Bloqueado: marco absurdo"}</button></article>
  </div>`;
}

function renderAll(includePanel = true) {
  renderHud(); renderWorld();
  document.querySelectorAll(".nav-button").forEach((button) => { button.classList.toggle("is-active", button.dataset.tab === state.activeTab); });
  app.dataset.activeTab = state.activeTab;
  app.dataset.mainCharacter = state.mainCharacter || "kitty";
  if (includePanel) renderPanel();
  updateHudMetrics();
}

function upgradeBuilding(id) {
  const building = buildings.find((item) => item.id === id);
  if (!building || state.level < building.unlock) return;
  const cost = buildingCost(building);
  if (state.hearts < cost) return;
  state.hearts -= cost; state.buildings[id] = buildingLevel(id) + 1;
  gainXp(Math.max(8, Math.floor(cost / 120))); toast(`${building.icon} ${building.name} Lv. ${buildingLevel(id)}`);
  
  // Building Pop Animation — target the new building-sprite in the world
  const bEl = document.querySelector(`.building-sprite[data-building="${id}"]`);
  if (bEl && !isMobileRuntime) {
    bEl.classList.add("building-pop");
    bEl.title = `${building.name} Lv.${buildingLevel(id)}`;
    bEl.style.setProperty('--build-size', `${Math.min(70, 55 + buildingLevel(id) * 2)}px`);
    setTimeout(() => bEl.classList.remove("building-pop"), 600);
    const rect = bEl.getBoundingClientRect();
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 15, building.icon, true);
  }

  playSound("reward"); checkAchievements(); scheduleUpgradeRefresh(true); saveState();
  triggerDialogue("build", true);
}

function buyClickUpgrade(id) {
  const upgrade = clickUpgrades.find((item) => item.id === id);
  if (!upgrade) return;
  const cost = clickUpgradeCost(upgrade);
  if (state.hearts < cost) return;
  state.hearts -= cost;
  state.clickUpgrades[upgrade.id] = (state.clickUpgrades[upgrade.id] || 0) + 1;
  gainXp(Math.max(5, Math.floor(cost / 150)));
  toast(`${upgrade.icon} ${upgrade.name} x${state.clickUpgrades[upgrade.id]}`);
  playSound("reward"); checkAchievements(); scheduleUpgradeRefresh(false); saveState();
}

function giveGift(giftId) {
  const gift = getGift(giftId); const character = getCharacter();
  if (!gift || (state.inventory[giftId] || 0) <= 0) return;
  state.inventory[giftId]--; state.quests.giftsGiven++;
  const favorite = character.favorite === giftId;
  const amount = Math.floor(gift.power * (favorite ? 2.2 : 1) * (1 + friendLevel("melody") * .004));
  addFriendXp(character.id, amount); addHearts(favorite ? 180 + amount * 3 : 70 + amount, "gift");
  toast(`${character.name} ${favorite ? "amou" : "gostou"} do presente!`);
  burstAt(window.innerWidth / 2, window.innerHeight * .48, favorite ? 18 : 10, favorite ? "💖" : "♡");
  playSound("reward");
  // Bug 2 fix: surgical DOM update instead of renderAll() to prevent flickering
  scheduleHudUpdate();
  // Update only the gift chip counters in the DOM
  document.querySelectorAll("[data-gift]").forEach(btn => {
    const gId = btn.dataset.gift;
    const count = state.inventory[gId] || 0;
    btn.textContent = `${getGift(gId).icon} ${count}`;
    if (count <= 0) btn.setAttribute("disabled", "true");
    else btn.removeAttribute("disabled");
  });
  // Update friendship progress bar if visible
  const progressFill = document.querySelector(".friend-card.is-active .progress span");
  if (progressFill) progressFill.style.width = `${friendProgress(character.id)}%`;
  saveState();
  triggerDialogue("gift", true);
}

function playStory(storyId, choiceIndex) {
  const story = stories.find((item) => item.id === storyId);
  if (!story || state.level < story.unlock) return;
  const replay = Boolean(state.stories[story.id]);
  state.stories[story.id] = { choice: choiceIndex, playedAt: Date.now() };
  state.quests.storiesPlayed++;
  const friendBonus = friendLevel(story.friend);

  // Story boost from active character
  const active = getCharacter();
  const storyMultiplier = 1 + (active.storyBoost || 0);

  let heartReward = 0;
  let gemReward = 0;
  let friendXpReward = 5;

  let outcomeObj = story.outcomes ? story.outcomes[choiceIndex] : { type: "good", message: "História concluída!" };
  let outcomeType = outcomeObj.type;
  
  if (outcomeType === "boss_fight") {
    closeModal();
    startBossFight(replay);
    return;
  }

  if (outcomeType === "chaotic") {
    const types = ["good", "bad", "neutral"];
    outcomeType = types[Math.floor(Math.random() * types.length)];
  }

  let heartPenalty = 0;
  let gemPenalty = 0;
  let outcomeDetailsHtml = "";
  const isObsessiveFan = story.id === "obsessivefan";

  if (replay) {
    // Replay: only dialogue + minimal friendship XP, no hearts/gems
    heartReward = 0;
    gemReward = 0;
    friendXpReward = 5;
    outcomeDetailsHtml = `<div class="muted" style="margin-top:10px;font-style:italic">Você já viveu essa história. Aproveite a memória!</div>`;
  } else {
    // First completion
    if (outcomeType === "good") {
      heartReward = Math.floor(900 * (1 + story.unlock * .09) * storyMultiplier + friendBonus * 18);
      gemReward = 1 + Math.floor(story.unlock / 40);
      friendXpReward = 82;
      
      if (isObsessiveFan) {
        heartReward = 500000;
        gemReward = 20;
      }
      
      state.gems += gemReward;
      if (heartReward > 0) addHearts(heartReward, "story");
      addFriendXp(story.friend, friendXpReward);
      
      outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:var(--pink)">+${formatNumber(heartReward)} ♡</span><span class="gift-chip">+${gemReward} 💎</span></div>`;
    } else if (outcomeType === "bad") {
      friendXpReward = 10;
      addFriendXp(story.friend, friendXpReward);
      
      if (isObsessiveFan) {
        let itemsLost = 0;
        for (let key in state.inventory) {
          if (state.inventory[key] > 0) {
            let lost = Math.floor(state.inventory[key] / 2) || 1;
            state.inventory[key] = Math.max(0, state.inventory[key] - lost);
            itemsLost += lost;
          }
        }
        heartPenalty = Math.floor(state.hearts * 0.5);
        state.hearts -= heartPenalty;
        outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px;color:#ff3d7f;font-weight:bold"><span class="gift-chip" style="color:#ff3d7f">-${formatNumber(heartPenalty)} ♡</span><span class="gift-chip" style="color:#ff3d7f">Perdeu ${itemsLost} presentes</span></div>`;
      } else {
        const rand = Math.random();
        if (rand < 0.5) {
          const percent = 0.15 + Math.random() * 0.15;
          heartPenalty = Math.floor(state.hearts * percent);
          state.hearts -= heartPenalty;
          outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:#ff3d7f">-${formatNumber(heartPenalty)} ♡</span></div>`;
        } else if (rand < 0.8 && state.gems >= 2) {
          gemPenalty = Math.floor(Math.random() * 3) + 1;
          gemPenalty = Math.min(state.gems, gemPenalty);
          state.gems -= gemPenalty;
          outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:#ff3d7f">-${gemPenalty} 💎</span></div>`;
        } else {
          const invKeys = Object.keys(state.inventory).filter(k => state.inventory[k] > 0);
          if (invKeys.length > 0) {
            const victim = invKeys[Math.floor(Math.random() * invKeys.length)];
            const lostAmount = Math.max(1, Math.floor(state.inventory[victim] * 0.5));
            state.inventory[victim] -= lostAmount;
            const giftDef = getGift(victim);
            outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:#ff3d7f">Perdeu ${lostAmount}x ${giftDef ? giftDef.icon : 'item'}</span></div>`;
          } else {
            heartPenalty = Math.floor(state.hearts * 0.15);
            state.hearts -= heartPenalty;
            outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:#ff3d7f">-${formatNumber(heartPenalty)} ♡</span></div>`;
          }
        }
      }
    } else if (outcomeType === "neutral") {
      friendXpReward = 20;
      addFriendXp(story.friend, friendXpReward);
      outcomeDetailsHtml = `<div class="card-row" style="margin-top:14px"><span class="gift-chip" style="color:var(--ink-soft)">Apenas boas risadas 🙃</span></div>`;
    }
  }

  const loreMessage = `A comunidade presenciou esse momento inesquecível e ${getCharacter(story.friend).name} anotou isso no diário.`;

  openModal(story.title, `<div class="story-card" style="padding:14px;background:rgba(255,255,255,.72)">
    <div class="card-row" style="justify-content:flex-start">
      <div class="avatar" style="--tile:${getCharacter(story.friend).color}">${story.icon}</div>
      <div><strong>${story.choices[choiceIndex]}</strong><div class="muted">${story.text}</div></div>
    </div>
    <div style="margin-top:12px;padding:10px;background:rgba(0,0,0,0.05);border-radius:12px;color:var(--ink);font-weight:700;font-size:15px;line-height:1.4">
      ${outcomeObj.message}
    </div>
    <p class="muted" style="font-size:14px;margin:12px 0 0">${loreMessage}</p>
    ${outcomeDetailsHtml}
  </div>`);
  
  if (outcomeType !== "bad") playSound("reward");
  checkAchievements(); 
  renderAll(); 
  saveState();
}

function claimDaily() {
  const today = dayKey();
  if (state.daily.lastClaim === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.daily.streak = state.daily.lastClaim === yesterday ? state.daily.streak + 1 : 1;
  state.daily.lastClaim = today;
  const reward = 700 + state.daily.streak * 180;
  state.gems += state.daily.streak % 7 === 0 ? 2 : 0;
  addHearts(reward, "daily");
  for (let i = 0; i < 2; i++) randomGiftDrop();
  toast(`Dia ${state.daily.streak}: +${formatNumber(reward)} ♡`);
  playSound("reward"); renderAll(); saveState();
}

function performRebirth() {
  const rebirth = rebirthProgress();
  if (!rebirth.ready) {
    toast("Ainda falta progresso para renascer!");
    return;
  }
  const confirmRebirth = confirm("RENASCIMENTO MAGICO\n\nVoce voltara ao Nivel 1 com 0 coracoes, obras e upgrades de clique, mas ganha +100% permanente de poder por rebirth e libera a Kuromi como personagem jogavel.\n\nDeseja continuar?");
  if (!confirmRebirth) return;
  
  state.rebirths = (state.rebirths || 0) + 1;
  state.mainCharacter = "kuromi";
  state.selectedCharacter = "kuromi";
  state.friendship.kuromi ||= { xp: 0 };
  state.friendship.kuromi.unlocked = true;
  
  state.hearts = 0;
  state.level = 1;
  state.xp = 0;
  state.taps = 0;
  state.buildings = defaultBuildings(false);
  state.clickUpgrades = defaultClickUpgrades();
  
  forceSave();
  location.reload();
}

function dayKey() { return new Date().toISOString().slice(0, 10); }
let internalModalClose = false;
function openModal(title, html) { 
  modalTitle.textContent = title; 
  modalContent.innerHTML = html; 
  modal.hidden = false; 
  if (history.state?.modal !== title) history.pushState({ modal: title }, '', '#modal');
}
function closeModal() { 
  modal.hidden = true; 
  memoryGame = null; 
  if (history.state?.modal) { internalModalClose = true; history.back(); }
}
window.addEventListener("popstate", (e) => {
  if (internalModalClose) { internalModalClose = false; return; }
  if (!e.state?.modal && !modal.hidden) { modal.hidden = true; memoryGame = null; }
});

function openGallery() {
  const photos = albumPhotos.map((fileName, index) => {
    const src = albumPhotoUrl(fileName);
    const label = `Memoria ${index + 1}`;
    return `<button class="gallery-item" type="button" data-photo="${index}" aria-label="Abrir ${label}"><img src="${src}" alt="${label}" loading="lazy"><span>${label}</span></button>`;
  }).join("");
  openModal("Album de Memorias", `<div class="album-intro"><strong>Hello Kitty & Fundadores</strong><span>${albumPhotos.length} fotos guardadas</span></div><div class="gallery-grid">${photos}</div>`);
}

function openGalleryPhoto(index) {
  const fileName = albumPhotos[index];
  if (!fileName) return;
  const src = albumPhotoUrl(fileName);
  modalTitle.textContent = `Memoria ${index + 1}`;
  modalContent.innerHTML = `<div class="photo-viewer"><img src="${src}" alt="Memoria ${index + 1}"><div class="photo-actions"><button class="bubble-button tiny-button" type="button" data-action="gallery">Voltar ao album</button><button class="primary-action tiny-button" type="button" data-close>Fechar</button></div></div>`;
}

function openCodesMenu() {
  const redeemedCount = Object.keys(state.redeemedCodes || {}).length;
  openModal("Codigos", `<div class="code-panel">
    <div class="code-row">
      <input class="code-input" id="codeInput" type="text" placeholder="Digite seu codigo" autocomplete="off" autocapitalize="none" spellcheck="false" enterkeyhint="go" inputmode="text">
      <button class="primary-action tiny-button" type="button" data-redeem-code>Usar</button>
    </div>
    <div class="muted">Codigos usados: ${redeemedCount}</div>
    ${state.adminUnlocked ? `<button class="bubble-button" type="button" data-open-admin style="width:100%;margin-top:10px">Abrir menu admin</button>` : ""}
  </div>`);
  // Bug 3 fix: ensure code input is visible above Android keyboard
  setTimeout(() => {
    const input = document.getElementById("codeInput");
    if (!input) return;
    input.focus();
    input.addEventListener("focus", () => {
      setTimeout(() => {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    }, { once: true });
    // On Android, listen for viewport resize (keyboard opening) and scroll into view
    if (window.visualViewport) {
      const onResize = () => {
        if (document.activeElement === input) {
          input.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      };
      window.visualViewport.addEventListener("resize", onResize);
      // Clean up when modal closes
      const observer = new MutationObserver(() => {
        if (modal.hidden) {
          window.visualViewport.removeEventListener("resize", onResize);
          observer.disconnect();
        }
      });
      observer.observe(modal, { attributes: true, attributeFilter: ["hidden"] });
    }
  }, 60);
}

function normalizeCode(value) {
  return String(value || "").trim().replace(/\s+/g, "").toUpperCase();
}

function redeemCode(rawCode) {
  const code = normalizeCode(rawCode);
  if (!code) { toast("Digite um codigo"); return; }
  state.redeemedCodes ||= {};

  if (code === "DEV_MODE_ADMIN") {
    state.adminUnlocked = true;
    saveState();
    toast("Acesso liberado");
    openAdminMenu();
    return;
  }

  if (state.redeemedCodes[code]) {
    toast("Codigo ja usado");
    return;
  }

  const rewards = {
    HELLOKITTY: () => { addHearts(25000, "code"); state.gems += 5; for (let i = 0; i < 3; i++) randomGiftDrop(); return "+25k coracoes, +5 cristais e presentes"; },
    CINTYHA: () => { addHearts(75000, "code"); state.gems += 8; addFriendXp("kitty", 220); addFriendXp("melody", 220); return "+75k coracoes, +8 cristais e amizade"; },
    JAPA: () => { addHearts(150000, "code"); state.gems += 12; state.daily.streak = Math.max(state.daily.streak || 0, 7); return "+150k coracoes, +12 cristais e streak 7"; },
    MUSIC: () => { state.settings.music = true; state.settings.sound = true; state.settings.musicVolume = Math.max(state.settings.musicVolume ?? 0.15, 0.25); updateAudio(); state.gems += 3; return "musica ligada, volume 25% e +3 cristais"; },
    LANIERTE: () => { addHearts(500000, "code"); state.gems += 50; gifts.forEach(g => { state.inventory[g.id] = (state.inventory[g.id] || 0) + 10; }); characters.forEach(c => addFriendXp(c.id, 500)); return "+500k corações, +50 cristais, +10 presentes de cada e amizade!"; }
  };

  const reward = rewards[code];
  if (!reward) {
    toast("Codigo invalido");
    return;
  }

  const message = reward();
  state.redeemedCodes[code] = Date.now();
  playSound("reward");
  checkAchievements();
  renderAll();
  saveState();
  openCodesMenu();
  toast(`Codigo OK: ${message}`);
}

function openAdminMenu() {
  if (!state.adminUnlocked) {
    toast("Use o codigo DEV_MODE_ADMIN primeiro");
    openCodesMenu();
    return;
  }
  openModal("Admin Testes", `<div class="admin-panel">
    <div class="muted">Ferramentas locais para testar progresso, economia, rebirth e personagens.</div>
    <div class="admin-grid">
      <button class="bubble-button" type="button" data-admin-action="hearts">+10M coracoes</button>
      <button class="bubble-button" type="button" data-admin-action="gems">+500 cristais</button>
      <button class="bubble-button" type="button" data-admin-action="level">Nivel +25</button>
      <button class="bubble-button" type="button" data-admin-action="buildings">Obras Lv. 10</button>
      <button class="bubble-button" type="button" data-admin-action="gifts">Presentes x20</button>
      <button class="bubble-button" type="button" data-admin-action="kuromi">Liberar Kuromi</button>
      <button class="bubble-button" type="button" data-admin-action="rebirth-ready">Preparar rebirth</button>
      <button class="bubble-button" type="button" data-admin-action="toggle-theme">Tema escuro</button>
      <button class="bubble-button" type="button" data-admin-action="spawn-miku">Invocar Miku</button>
    </div>
    <button class="primary-action" type="button" data-admin-action="save-close" style="width:100%;margin-top:12px">Salvar e fechar</button>
  </div>`);
}

function runAdminAction(action) {
  if (!state.adminUnlocked) return;
  switch (action) {
    case "hearts":
      addHearts(10000000, "admin");
      break;
    case "gems":
      state.gems += 500;
      break;
    case "level":
      state.level += 25;
      state.xp = 0;
      break;
    case "buildings":
      buildings.forEach((building) => { state.buildings[building.id] = Math.max(buildingLevel(building.id), 10); });
      break;
    case "gifts":
      gifts.forEach((gift) => { state.inventory[gift.id] = (state.inventory[gift.id] || 0) + 20; });
      break;
    case "kuromi":
      state.mainCharacter = "kuromi";
      state.selectedCharacter = "kuromi";
      state.friendship.kuromi ||= { xp: 0 };
      state.friendship.kuromi.unlocked = true;
      state.friendship.kuromi.xp = Math.max(state.friendship.kuromi.xp || 0, friendXpForLevel(10));
      break;
    case "rebirth-ready":
      state.level = Math.max(state.level, REBIRTH_REQUIREMENTS.level);
      state.totalHearts = Math.max(state.totalHearts, REBIRTH_REQUIREMENTS.totalHearts);
      state.hearts = Math.max(state.hearts, 100000000000);
      state.taps = Math.max(state.taps, REBIRTH_REQUIREMENTS.taps);
      achievementDefs.slice(0, REBIRTH_REQUIREMENTS.achievements).forEach((achievement) => { state.achievements[achievement.id] ||= Date.now(); });
      break;
    case "toggle-theme":
      state.settings.theme = "dark";
      applyTheme();
      break;
    case "spawn-miku":
      spawnMiku();
      closeModal();
      return;
    case "save-close":
      saveState();
      closeModal();
      toast("Admin salvo");
      return;
  }
  playSound("reward");
  checkAchievements({ silent: true });
  renderAll();
  saveState();
  closeModal();
  toast("Admin aplicado");
}

function openSettings() {
  const themeLabels = { auto: "Automático", light: "Claro", dark: "Escuro" };
  const nextTheme = state.settings.theme === "auto" ? "light" : (state.settings.theme === "light" ? "dark" : "auto");
  if (state.settings.music === undefined) state.settings.music = state.settings.sound;
  if (state.settings.musicVolume === undefined) state.settings.musicVolume = 0.15;
  const volPercent = Math.round((state.settings.musicVolume ?? 0.15) * 100);

  openModal("Configurações", `<div class="switch-row"><div><strong>Tema Visual</strong><div class="muted">Noite mágica ou dia claro</div></div><button class="bubble-button tiny-button" type="button" data-theme-cycle="${nextTheme}">${themeLabels[state.settings.theme || "auto"]}</button></div><div class="switch-row"><div><strong>Música fofinha</strong><div class="muted">Trilha sonora de fundo</div></div><button class="switch ${state.settings.music ? "is-on" : ""}" type="button" data-toggle="music" aria-label="Alternar música"></button></div>${state.settings.music ? `<div class="switch-row" style="flex-direction:column;align-items:stretch;gap:8px"><div style="display:flex;justify-content:space-between;align-items:center"><strong>Volume</strong><span class="muted" id="volLabel">${volPercent}%</span></div><input type="range" min="0" max="100" value="${volPercent}" id="musicVolumeSlider" style="width:100%;accent-color:#ff8fb1;height:6px" /></div>` : ""}<div class="switch-row"><div><strong>Sons fofinhos</strong><div class="muted">Efeitos curtos ao tocar e coletar</div></div><button class="switch ${state.settings.sound ? "is-on" : ""}" type="button" data-toggle="sound" aria-label="Alternar som"></button></div><div class="switch-row"><div><strong>Vibração</strong><div class="muted">Feedback tátil em dispositivos compatíveis</div></div><button class="switch ${state.settings.vibration ? "is-on" : ""}" type="button" data-toggle="vibration" aria-label="Alternar vibração"></button></div><div class="switch-row"><div><strong>Códigos</strong><div class="muted">Resgate presentes e ferramentas de teste</div></div><button class="bubble-button tiny-button" type="button" data-open-codes>Códigos</button></div><div class="switch-row"><div><strong>Salvar manualmente</strong><div class="muted">O jogo também salva automaticamente</div></div><button class="primary-action tiny-button" type="button" data-save-now>Salvar</button></div><div class="switch-row" style="border-bottom:0"><div><strong>Recomeçar</strong><div class="muted">Apaga o progresso deste navegador</div></div><button class="bubble-button tiny-button" type="button" data-reset>Reset</button></div>`);

  // Attach volume slider event
  const slider = document.getElementById("musicVolumeSlider");
  if (slider) {
    slider.addEventListener("input", (e) => {
      const val = Number(e.target.value) / 100;
      state.settings.musicVolume = val;
      if (bgMusic) bgMusic.volume = val;
      const label = document.getElementById("volLabel");
      if (label) label.textContent = `${e.target.value}%`;
    });
    slider.addEventListener("change", () => saveState());
  }
}

function startMemoryGame() {
  const icons = ["🎀", "🌸", "🍰", "🍨", "🍫", "🧸"];
  const deck = [...icons, ...icons].sort(() => Math.random() - .5);
  memoryGame = { deck, open: [], matched: [], moves: 0, locked: false };
  renderMemoryGame(); modal.hidden = false;
}

function renderMemoryGame() {
  modalTitle.textContent = "Jogo da Memória";
  modalContent.innerHTML = `<p class="muted" style="font-size:14px;margin-top:0">Encontre os pares para ganhar corações e presentes.</p><div class="memory-grid">${memoryGame.deck.map((icon, index) => {
    const visible = memoryGame.open.includes(index) || memoryGame.matched.includes(index);
    return `<button class="memory-card ${visible ? "" : "is-hidden"} ${memoryGame.matched.includes(index) ? "is-matched" : ""}" type="button" data-memory="${index}">${visible ? icon : ""}</button>`;
  }).join("")}</div><div class="card-row" style="margin-top:12px"><span class="gift-chip">Jogadas: ${memoryGame.moves}</span><button class="bubble-button tiny-button" type="button" data-minigame="memory">Reiniciar</button></div>`;
}

function flipMemory(index) {
  if (!memoryGame || memoryGame.locked || memoryGame.open.includes(index) || memoryGame.matched.includes(index)) return;
  memoryGame.open.push(index);
  if (memoryGame.open.length === 2) {
    memoryGame.moves++; const [a, b] = memoryGame.open;
    if (memoryGame.deck[a] === memoryGame.deck[b]) {
      memoryGame.matched.push(a, b); memoryGame.open = [];
      if (memoryGame.matched.length === memoryGame.deck.length) {
        const reward = Math.max(600, 1800 - memoryGame.moves * 60);
        state.quests.minigamesWon++; state.gems += 1; addHearts(reward, "minigame");
        randomGiftDrop(); toast(`Memória completa: +${formatNumber(reward)} ♡`);
        playSound("reward"); setTimeout(closeModal, 850);
      }
    } else {
      memoryGame.locked = true;
      setTimeout(() => { memoryGame.open = []; memoryGame.locked = false; renderMemoryGame(); }, 650);
    }
  }
  renderMemoryGame(); saveState();
}

function startTreasureGame() {
  if (treasureCooldownRemaining() > 0) { toast(`Caça ao Tesouro em ${formatCooldown(treasureCooldownRemaining())}`); return; }
  const types = ["rare", "normal", "normal", "small", "cursed"];
  for (let i = types.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [types[i], types[j]] = [types[j], types[i]]; }
  modal.dataset.chestTypes = JSON.stringify(types);
  openModal("Caça ao Tesouro", `<p class="muted" style="font-size:14px;margin-top:0">Chococat encontrou 5 baús misteriosos no jardim.<br>Cuidado com a pegadinha da Kuromi... 💜</p><div class="chest-row" style="grid-template-columns: repeat(5, 1fr)">${types.map((_, i) => `<button class="chest-button" type="button" data-chest="${i}" style="min-height:70px;font-size:24px">🎁</button>`).join("")}</div>`);
}

function chooseChest(index) {
  const types = JSON.parse(modal.dataset.chestTypes || "[]");
  const type = types[index] || "normal";
  state.lastTreasure = Date.now();
  state.quests.minigamesWon++;

  let reward, gemReward, icon, title, desc;
  switch (type) {
    case "rare":
      reward = 3500 + state.level * 80; gemReward = 2;
      icon = "🌟"; title = "Lendário!"; desc = "Um baú dourado brilhante!";
      randomGiftDrop(); randomGiftDrop(); break;
    case "normal":
      reward = 1200 + state.level * 30; gemReward = 1;
      icon = "🌸"; title = "Tesouro Fofinho!"; desc = "Um baú cheio de flores.";
      randomGiftDrop(); break;
    case "small":
      reward = 400 + state.level * 10; gemReward = 0;
      icon = "🍃"; title = "Tesouro Modesto"; desc = "Um bauzinho simples..."; break;
    case "cursed":
      reward = Math.max(5, Math.floor(state.level * 2)); gemReward = 0;
      icon = "💜"; title = "Pegadinha!"; desc = "Kuromi trocou tudo por pedrinhas! Hehe~"; break;
  }

  state.gems += gemReward; addHearts(reward, "minigame");
  const revealIcons = { rare: "🌟", normal: "🌸", small: "🍃", cursed: "💜" };
  const revealHtml = types.map((t, i) => { const isChosen = i === index; return `<div class="chest-button" style="min-height:70px;opacity:${isChosen ? 1 : 0.5};font-size:${isChosen ? '32px' : '20px'};${isChosen ? 'outline:3px solid #ff8fb1;' : ''};display:grid;place-items:center">${revealIcons[t]}</div>`; }).join("");

  modalContent.innerHTML = `<article class="story-card" style="padding:14px;text-align:center"><div style="font-size:48px">${icon}</div><strong>${title}</strong><div class="muted" style="margin-top:6px">${desc}</div><div class="muted" style="margin-top:6px">+${formatNumber(reward)} ♡${gemReward > 0 ? " · +" + gemReward + " 💎" : ""}</div><div class="chest-row" style="margin-top:14px;grid-template-columns:repeat(5, 1fr)">${revealHtml}</div><button class="primary-action" type="button" data-close style="margin-top:14px">Continuar</button></article>`;
  playSound(type === "cursed" ? "tap" : "reward"); renderAll(); saveState();
}

function createAchievementDefs() {
  const defs = [];
  const add = (id, icon, name, desc, reward, test) => defs.push({ id, icon, name, desc, reward, test });
  [100, 500, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000, 5000000000, 10000000000, 50000000000, 100000000000, 1000000000000].forEach((goal, index) => { add(`hearts-${goal}`, "♡", `${formatNumber(goal)} corações`, `Acumule ${compactFmt.format(goal)} corações totais`, 1 + Math.floor(index / 4), (s) => s.totalHearts >= goal); });
  [10, 25, 50, 100, 200, 400, 700, 1000, 1500, 2500, 4000, 6500, 10000, 16000, 25000, 40000, 65000, 100000, 200000, 500000, 1000000].forEach((goal, index) => { add(`taps-${goal}`, "☝", `${compactFmt.format(goal)} toques`, `Toque na personagem ${compactFmt.format(goal)} vezes`, 1 + Math.floor(index / 5), (s) => s.taps >= goal); });
  [2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 100000000].forEach((goal, index) => { add(`hps-${goal}`, "✦", `${compactFmt.format(goal)}/s`, `Alcance ${compactFmt.format(goal)} corações por segundo`, 2 + Math.floor(index / 3), () => productionPerSecond() >= goal); });
  [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 85, 100, 120, 150, 180, 200, 250, 300].forEach((goal, index) => { add(`level-${goal}`, "☆", `Nível ${goal}`, `Alcance o nível de jogador ${goal}`, 2 + Math.floor(index / 3), (s) => s.level >= goal); });
  buildings.forEach((building) => { [1, 5, 10, 20, 35, 50, 75, 100].forEach((goal, index) => { add(`building-${building.id}-${goal}`, building.icon, `${building.name} Lv. ${goal}`, `Evolua ${building.name} até Lv. ${goal}`, 1 + index, () => buildingLevel(building.id) >= goal); }); });
  characters.forEach((character) => { [5, 10, 25, 50, 100, 150, 200].forEach((goal, index) => { add(`friend-${character.id}-${goal}`, character.icon, `${character.name} amizade ${goal}`, `Alcance amizade Lv. ${goal}`, 1 + index, () => friendLevel(character.id) >= goal); }); });
  stories.forEach((story) => add(`story-${story.id}`, story.icon, story.title, "Complete esta história interativa", 3, (s) => Boolean(s.stories[story.id])));
  [1, 3, 7, 14, 21, 30, 60, 100, 180, 365].forEach((goal, index) => add(`daily-${goal}`, "📅", `${goal} dias`, `Mantenha sequência diária de ${goal}`, 2 + index, (s) => s.daily.streak >= goal));
  [1, 5, 10, 25, 50, 100, 200, 500, 1000].forEach((goal, index) => add(`gifts-${goal}`, "🎁", `${goal} presentes`, `Entregue ${goal} presentes`, 1 + Math.floor(index / 2), (s) => s.quests.giftsGiven >= goal));
  [1, 3, 5, 10, 20, 50, 100, 200].forEach((goal, index) => add(`minigames-${goal}`, "🎮", `${goal} minigames`, `Vença ${goal} minigames`, 2 + index, (s) => s.quests.minigamesWon >= goal));
  // Special: Collector boss
  add("collector-defeated", "🏆", "Defensora da Amizade", "Derrote a Colecionadora Maníaca no Heart Battle", 25, (s) => Boolean(s.collectorDefeated));
  return defs;
}

const achievementDefs = createAchievementDefs();

function checkAchievements(options = {}) {
  const { silent = false, grant = true } = options;
  let unlocked = 0;
  achievementDefs.forEach((achievement) => {
    if (!state.achievements[achievement.id] && achievement.test(state)) {
      state.achievements[achievement.id] = Date.now();
      unlocked++; if (grant) state.gems += Math.max(1, Math.floor(achievement.reward / 3));
    }
  });
  if (unlocked && !silent) toast(`${unlocked} conquista${unlocked > 1 ? "s" : ""}! +cristais`);
}

let tabSwitchLock = false;
document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-button[data-tab]");
  if (nav) { 
    if (tabSwitchLock || state.activeTab === nav.dataset.tab) return;
    tabSwitchLock = true;
    state.activeTab = nav.dataset.tab; 
    renderAll(); 
    saveState(); 
    setTimeout(() => { tabSwitchLock = false; }, 250);
    return; 
  }
  const select = event.target.closest("[data-select]");
  if (select) { state.selectedCharacter = select.dataset.select; state.activeTab = event.target.closest(".friend-card") ? "friends" : state.activeTab; renderAll(); saveState(); return; }
  const mainCharacter = event.target.closest("button[data-main-character]");
  if (mainCharacter) { state.mainCharacter = mainCharacter.dataset.mainCharacter; renderAll(); saveState(); toast(`${getCharacter(state.mainCharacter).name} no jardim`); triggerDialogue("random", true); return; }
  const selectTab = event.target.closest("[data-select-tab]");
  if (selectTab) { state.activeTab = selectTab.dataset.selectTab; renderAll(); saveState(); return; }
  const upgrade = event.target.closest("[data-upgrade]");
  if (upgrade) { upgradeBuilding(upgrade.dataset.upgrade); return; }
  const clickUpgrade = event.target.closest("[data-click-upgrade]");
  if (clickUpgrade) { buyClickUpgrade(clickUpgrade.dataset.clickUpgrade); return; }
  const gift = event.target.closest("[data-gift]");
  if (gift) { giveGift(gift.dataset.gift); return; }
  const story = event.target.closest("[data-story]");
  if (story) { playStory(story.dataset.story, Number(story.dataset.choice)); return; }
  if (event.target.closest("[data-daily]")) { claimDaily(); return; }
  const gemBuy = event.target.closest("[data-gem-buy]");
  if (gemBuy) { buyGemItem(gemBuy.dataset.gemBuy); return; }
  const minigame = event.target.closest("[data-minigame]");
  if (minigame) { if (minigame.dataset.minigame === "memory") startMemoryGame(); if (minigame.dataset.minigame === "treasure") startTreasureGame(); return; }
  const memory = event.target.closest("[data-memory]");
  if (memory) { flipMemory(Number(memory.dataset.memory)); return; }
  const chest = event.target.closest("[data-chest]");
  if (chest) { chooseChest(Number(chest.dataset.chest)); return; }
  const action = event.target.closest("[data-action]");
  if (action) {
    if (action.dataset.action === "gallery") { openGallery(); return; }
    if (action.dataset.action === "rebirth") { performRebirth(); return; }
  }
  if (event.target.closest("[data-open-codes]")) { openCodesMenu(); return; }
  if (event.target.closest("[data-redeem-code]")) { redeemCode(document.getElementById("codeInput")?.value); return; }
  if (event.target.closest("[data-open-admin]")) { openAdminMenu(); return; }
  const adminAction = event.target.closest("[data-admin-action]");
  if (adminAction) { runAdminAction(adminAction.dataset.adminAction); return; }
  const photo = event.target.closest("[data-photo]");
  if (photo) { openGalleryPhoto(Number(photo.dataset.photo)); return; }
  const toggle = event.target.closest("[data-toggle]");
  if (toggle) { const key = toggle.dataset.toggle; state.settings[key] = !state.settings[key]; if (key === "sound" || key === "music") updateAudio(); openSettings(); saveState(); return; }
  const themeCycle = event.target.closest("[data-theme-cycle]");
  if (themeCycle) { state.settings.theme = themeCycle.dataset.themeCycle; applyTheme(); openSettings(); saveState(); return; }
  if (event.target.closest("[data-save-now]")) { saveState(); toast("Progresso salvo"); return; }
  if (event.target.closest("[data-reset]")) { if (confirm("Recomeçar o jogo neste navegador?")) { localStorage.removeItem(SAVE_KEY); state = createDefaultState(); closeModal(); renderAll(); toast("Jardim reiniciado"); } return; }
  if (event.target.closest("[data-close]")) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target?.id === "codeInput") {
    redeemCode(event.target.value);
  }
});

const interactiveSelectors = [
  ".nav-button", ".primary-action:not([disabled])", ".bubble-button:not([disabled])", 
  ".tiny-button:not([disabled])", ".friend-card:not([disabled])", ".orbit-friend", ".icon-button",
  ".memory-card", ".chest-button"
].join(", ");

document.addEventListener("pointerdown", (event) => {
  const target = event.target.closest(interactiveSelectors);
  if (target) {
    target.classList.add("is-pressed");
    target.setPointerCapture(event.pointerId);
  }
});

function releasePress(event) {
  document.querySelectorAll(".is-pressed").forEach(el => el.classList.remove("is-pressed"));
}

document.addEventListener("pointerup", releasePress);
document.addEventListener("pointercancel", releasePress);

let pointerTicking = false;
if (!isMobileRuntime) {
  document.addEventListener("pointermove", (event) => {
    if (!pointerTicking) {
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const px = Math.max(-1, Math.min(1, (event.clientX - cx) / cx));
        const py = Math.max(-1, Math.min(1, (event.clientY - cy) / cy));
        document.body.style.setProperty("--px", px.toFixed(3));
        document.body.style.setProperty("--py", py.toFixed(3));
        pointerTicking = false;
      });
      pointerTicking = true;
    }
  });
}
characterButton.addEventListener("touchstart", handleTap, { passive: false });
characterButton.addEventListener("click", handleTap);
document.getElementById("settingsButton").addEventListener("click", openSettings);
document.getElementById("quickGiftButton").addEventListener("click", () => { state.activeTab = "friends"; renderAll(); });
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
window.addEventListener("resize", updateHudMetrics);
window.addEventListener("orientationchange", updateHudMetrics);

setInterval(() => {
  if (appInBackground) return;
  let gain = productionPerSecond();
  
  // Night bonus: +15% production
  const currentHour = new Date().getHours();
  let timeCat = "day";
  if (currentHour >= 19 || currentHour < 5) {
    gain = gain * 1.15;
    timeCat = "night";
  } else if (currentHour >= 5 && currentHour < 12) {
    timeCat = "morning";
  } else if (currentHour >= 12 && currentHour < 19) {
    timeCat = "afternoon";
  }
  
  if (gain > 0) {
    state.hearts += gain; state.totalHearts += gain;
    if (Math.random() < .08) addFriendXp(state.selectedCharacter, 1);
    checkAchievements({ silent: true }); renderHud();
    if (state.activeTab === "garden") renderPanel();
  }
  
  // Random Idle Dialogue (roughly every ~2 minutes if not clicking)
  if (Math.random() < 0.008) {
    const categories = ["random", timeCat];
    triggerDialogue(categories[Math.floor(Math.random() * categories.length)], false);
  }
}, 1000);

setInterval(() => {
  if (appInBackground) return;
  moveNPCs();
}, 6000);

setInterval(() => {
  if (appInBackground) return;
  updateWorldProgression();
  applyOutfit();
}, 5000);

// Kitty Idle Animations Loop
setInterval(() => {
  if (appInBackground) return;
  if (comboCount > 0) return; // Não anima se estiver sendo clicada
  const r = Math.random();
  if (r < 0.30) {
    characterButton.classList.add("kitty-double-blink");
    setTimeout(() => characterButton.classList.remove("kitty-double-blink"), 600);
  } else if (r < 0.50) {
    characterButton.classList.add("kitty-looking");
    setTimeout(() => characterButton.classList.remove("kitty-looking"), 2000);
  } else if (r < 0.65) {
    characterButton.classList.add("is-smiling");
    setTimeout(() => characterButton.classList.remove("is-smiling"), 1500);
  } else if (r < 0.80) {
    characterButton.classList.add("kitty-waving");
    setTimeout(() => characterButton.classList.remove("kitty-waving"), 1200);
  } else if (r < 0.90) {
    characterButton.classList.add("kitty-happy-bounce");
    setTimeout(() => characterButton.classList.remove("kitty-happy-bounce"), 600);
  }
}, 3500);

// Ambient Butterflies
setInterval(() => {
  if (appInBackground || isMobileRuntime) return;
  if (app.dataset.time === "night") return;
  const butterfly = document.createElement("div");
  butterfly.className = "butterfly";
  butterfly.textContent = "🦋";
  butterfly.style.top = (10 + Math.random() * 40) + "vh";
  document.getElementById("eventLayer").appendChild(butterfly);
  setTimeout(() => butterfly.remove(), 12000);
}, 20000);

// Gestures: Nav Sliding
const nav = document.querySelector(".nav");
let isDraggingNav = false;
let currentNavTarget = null;

if (nav) {
  nav.addEventListener("touchstart", (e) => {
    isDraggingNav = true;
    handleNavSwipe(e.touches[0]);
  }, { passive: true });
  
  nav.addEventListener("touchmove", (e) => {
    if (!isDraggingNav) return;
    e.preventDefault();
    handleNavSwipe(e.touches[0]);
  }, { passive: false });
  
  const stopNavDrag = () => {
    isDraggingNav = false;
    currentNavTarget = null;
    document.querySelectorAll(".nav-button.is-pressed").forEach(n => n.classList.remove("is-pressed"));
  };
  
  nav.addEventListener("touchend", stopNavDrag);
  nav.addEventListener("touchcancel", stopNavDrag);
  
  function handleNavSwipe(e) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;
    const btn = el.closest(".nav-button");
    if (btn && btn !== currentNavTarget) {
      currentNavTarget = btn;
      const tab = btn.dataset.tab;
      document.querySelectorAll(".nav-button.is-pressed").forEach(n => n.classList.remove("is-pressed"));
      btn.classList.add("is-pressed");
      if (tab && app.dataset.activeTab !== tab) {
        btn.click(); // Switch tab
      }
    }
  }
}

// Gestures: Sheet Dragging
const sheet = document.querySelector(".sheet");
const sheetHead = document.querySelector(".sheet-head");
let isDraggingSheet = false;
let sheetDragStartY = 0;
let currentSheetSnap = "HALF";

function applySheetState(stateStr) {
  currentSheetSnap = stateStr;
  sheet.style.setProperty("--sheet-dur", "0.4s");
  if (stateStr === "COLLAPSED") sheet.style.setProperty("--sheet-y", "140px");
  else if (stateStr === "HALF") sheet.style.setProperty("--sheet-y", "min(47dvh, 430px)");
  else if (stateStr === "EXPANDED") sheet.style.setProperty("--sheet-y", "85dvh");
}

if (sheet && sheetHead) {
  // Initialize
  applySheetState(app.dataset.activeTab === "garden" ? "COLLAPSED" : "HALF");

  sheetHead.addEventListener("touchstart", (e) => {
    isDraggingSheet = true;
    sheetDragStartY = e.touches[0].clientY;
    sheet.style.setProperty("--sheet-dur", "0s");
  }, { passive: true });
  
  sheetHead.addEventListener("touchmove", (e) => {
    if (!isDraggingSheet) return;
    e.preventDefault();
    let delta = e.touches[0].clientY - sheetDragStartY;
    
    // Convert current state to approx pixels for drag feel
    let basePx = sheet.getBoundingClientRect().height;
    if (currentSheetSnap === "COLLAPSED") basePx = 140;
    else if (currentSheetSnap === "HALF") basePx = Math.min(window.innerHeight * 0.47, 430);
    
    // Resistance at bounds
    let newY = basePx - delta;
    if (newY < 140) newY = 140 + (newY - 140) * 0.3;
    if (newY > window.innerHeight * 0.85) newY = window.innerHeight * 0.85 + (newY - window.innerHeight * 0.85) * 0.3;
    
    sheet.style.setProperty("--sheet-y", `${newY}px`);
  }, { passive: false });
  
  const endSheetDrag = (e) => {
    if (!isDraggingSheet) return;
    isDraggingSheet = false;
    let delta = e.changedTouches[0].clientY - sheetDragStartY;
    
    if (Math.abs(delta) > 50) {
      if (delta > 0) {
        // Dragged down
        if (currentSheetSnap === "EXPANDED") applySheetState("HALF");
        else applySheetState("COLLAPSED");
      } else {
        // Dragged up
        if (currentSheetSnap === "COLLAPSED") applySheetState("HALF");
        else applySheetState("EXPANDED");
      }
    } else {
      applySheetState(currentSheetSnap);
    }
  };
  
  sheetHead.addEventListener("touchend", endSheetDrag);
  sheetHead.addEventListener("touchcancel", endSheetDrag);
  
  // Reset snap if tab changes via click
  document.querySelectorAll(".nav-button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tab = e.currentTarget.dataset.tab;
      applySheetState(tab === "garden" ? "COLLAPSED" : "HALF");
    });
  });
}

// ═══ Easter Egg: Flying Miku ═══
function spawnMiku() {
  const existing = document.querySelector(".flying-miku");
  if (existing) existing.remove();

  const miku = document.createElement("img");
  miku.src = "miku_miku.gif";
  miku.className = "flying-miku";
  
  // Random side (left or right)
  const fromLeft = Math.random() > 0.5;
  miku.classList.add(fromLeft ? "from-left" : "from-right");
  
  // Random Y height (10% to 50% of viewport to stay above buildings)
  const yPos = 10 + Math.random() * 40;
  miku.style.top = `${yPos}vh`;
  
  // Random duration 2 to 3.5 seconds
  const duration = 2 + Math.random() * 1.5;
  miku.style.setProperty("--miku-duration", `${duration}s`);
  
  let clicked = false;
  const handleTap = (e) => {
    if (clicked) return;
    clicked = true;
    e.preventDefault();
    e.stopPropagation();
    
    // Reward: 5 minutes of HPS or big fixed amount
    const hps = productionPerSecond();
    const reward = Math.max(500, Math.floor(hps * 300));
    addHearts(reward, "miku");
    
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (clientX === undefined && e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    if (clientX === undefined) {
      const rect = miku.getBoundingClientRect();
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    }
    
    burstAt(clientX, clientY, 24, "✨", true);
    
    const bonusText = document.createElement("div");
    bonusText.className = "miku-bonus-text";
    bonusText.innerHTML = `+ BÔNUS!<br><small>+${formatNumber(reward)} ♡</small>`;
    bonusText.style.left = `${clientX}px`;
    bonusText.style.top = `${clientY}px`;
    document.body.appendChild(bonusText);
    
    playSound("reward");
    
    miku.remove();
    setTimeout(() => bonusText.remove(), 2500);
  };

  miku.addEventListener("pointerdown", handleTap);
  miku.addEventListener("click", handleTap);
  
  document.body.appendChild(miku);
  
  setTimeout(() => {
    if (!clicked && miku.parentNode) miku.remove();
  }, (duration + 1) * 1000);
}

function initMikuEasterEgg() {
  setInterval(() => {
    // 10% chance every 4 minutes
    if (Math.random() <= 0.10) {
      spawnMiku();
    }
  }, 240000);
}
function startBossFight(isReplay) {
  // Redirect to the new Heart Battle engine
  if (typeof startHeartBattle === "function") {
    startHeartBattle(isReplay);
    return;
  }
  // Fallback (should not happen if heartbattle.js is loaded)
  const overlay = document.createElement("div");
  overlay.className = "boss-overlay is-active";
  overlay.innerHTML = `
    <div class="boss-title">💥 BATALHA FINAL 💥</div>
    <div class="boss-desc">Clique 150 vezes antes que o tempo acabe para derrotar a Fã Maníaca!</div>
    <div class="boss-timer">10.0s</div>
    <div class="boss-clicks">0 / 150 Cliques</div>
    <div class="boss-button">👁️‍🗨️</div>
  `;
  document.body.appendChild(overlay);

  let clicks = 0;
  let timeLeft = 10.0;
  let timerInterval;
  
  const timerEl = overlay.querySelector(".boss-timer");
  const clicksEl = overlay.querySelector(".boss-clicks");
  const btnEl = overlay.querySelector(".boss-button");

  playSound("error");

  const registerClick = () => {
    clicks++;
    clicksEl.textContent = `${clicks} / 150 Cliques`;
    burstAt(window.innerWidth/2, window.innerHeight/2, 5, "💢", true);
    
    btnEl.style.transform = "scale(0.9)";
    setTimeout(() => btnEl.style.transform = "scale(1)", 50);

    if (clicks >= 150) {
      endBossFight(true);
    }
  };

  btnEl.addEventListener("touchstart", (e) => { e.preventDefault(); registerClick(); });
  btnEl.addEventListener("mousedown", (e) => { e.preventDefault(); registerClick(); });

  timerInterval = setInterval(() => {
    timeLeft -= 0.1;
    timerEl.textContent = timeLeft.toFixed(1) + "s";
    if (timeLeft <= 0.05) { // Ensure it triggers when hitting 0
      endBossFight(false);
    }
  }, 100);

  function endBossFight(win) {
    clearInterval(timerInterval);
    overlay.classList.remove("is-active");
    setTimeout(() => overlay.remove(), 500);

    if (win) {
      if (!state.bossDefeated) {
        state.bossDefeated = true;
        const heartReward = 500000;
        const gemReward = 20;
        state.gems += gemReward;
        addHearts(heartReward, "story");
        openModal("Vitória Épica!", `<div style="text-align:center;padding:20px">
          <div style="font-size:50px;margin-bottom:10px">🏆</div>
          <h2>A Fã Reconheceu sua Superioridade!</h2>
          <p>Você clicou rápido demais. Ela fugiu e deixou a carteira cair.</p>
          <div class="card-row" style="margin-top:14px;justify-content:center">
            <span class="gift-chip" style="color:var(--pink)">+${formatNumber(heartReward)} ♡</span>
            <span class="gift-chip">+${gemReward} 💎</span>
          </div>
        </div>`);
      } else {
        openModal("Vitória Épica!", `<div style="text-align:center;padding:20px">
          <div style="font-size:50px;margin-bottom:10px">🏆</div>
          <h2>A Fã Reconheceu sua Superioridade!</h2>
          <p>Você a derrotou de novo, mas a carteira dela já estava vazia desta vez.</p>
        </div>`);
      }
      playSound("reward");
    } else {
      let itemsLost = 0;
      for (let key in state.inventory) {
        if (state.inventory[key] > 0) {
          let lost = Math.floor(state.inventory[key] / 2) || 1;
          state.inventory[key] = Math.max(0, state.inventory[key] - lost);
          itemsLost += lost;
        }
      }
      const heartPenalty = Math.floor(state.hearts * 0.5);
      state.hearts -= heartPenalty;
      
      openModal("Derrota Catastrófica...", `<div style="text-align:center;padding:20px">
        <div style="font-size:50px;margin-bottom:10px">💀</div>
        <h2 style="color:#ff3d7f">A Fã Maníaca Surtou!</h2>
        <p>Seus dedos foram lentos demais. Ela destruiu sua coleção!</p>
        <div class="card-row" style="margin-top:14px;justify-content:center;color:#ff3d7f;font-weight:bold">
          <span class="gift-chip" style="color:#ff3d7f">-${formatNumber(heartPenalty)} ♡</span>
          <span class="gift-chip" style="color:#ff3d7f">Perdeu ${itemsLost} presentes</span>
        </div>
      </div>`);
      playSound("error");
    }
    
    checkAchievements();
    renderAll();
    saveState();
  }
}

setInterval(saveState, 15000);
setInterval(updateTime, 60000);
window.addEventListener("beforeunload", forceSave);
initAppLifecycleAudio();
initMikuEasterEgg();
applyTheme(); applyOutfit(); applyOfflineProgress(); updateEnvironmentEffects(); updateTime(); checkAchievements({ silent: true, grant: true }); renderAll(); updateHudMetrics(); moveNPCs();
