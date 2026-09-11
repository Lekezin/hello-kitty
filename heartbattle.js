/* ═══════════════════════════════════════════
   HEART BATTLE ENGINE v2
   ═══════════════════════════════════════════
   Canvas 2D bullet-hell / clicker hybrid battle system.
   Dependencies: boss-patterns.js (loaded before this file)
   ═══════════════════════════════════════════ */

// ─── Asset Registry ───
const BATTLE_SPRITE_DEFS = [
  "proj_apple", "proj_bow", "proj_heart", "proj_star",
  "proj_flower", "proj_petal", "proj_mushroom", "proj_bunny",
  "proj_cloud", "proj_balloon",
  "proj_drop", "proj_bubble", "proj_leaf",
  "proj_bat", "proj_lightning", "proj_skull", "proj_spike",
  "proj_bolt",
  "pu_heal", "pu_double", "pu_slow", "pu_shield", "pu_invuln",
  "player_heart", "player_heart_hit"
];

const BATTLE_ASSETS = {};
let battleAssetsLoaded = false;

// ─── Video elements for the Collector (animated WebM) ───
const COLLECTOR_VIDEOS = {};

function loadCollectorVideos() {
  const defs = [
    { key: "dance",    src: "sprites/collector_dance.webm" },
    { key: "angry",    src: "sprites/collector_angry.webm" },
    { key: "normal",   src: "sprites/collector_normal.webm" },
    { key: "defeated", src: "sprites/collector_defeated.webm" }
  ];
  for (const def of defs) {
    const vid = document.createElement("video");
    vid.src = def.src;
    vid.loop = true;
    vid.muted = true;
    vid.playsInline = true;
    vid.autoplay = false;
    vid.preload = "auto";
    vid.style.cssText = "position:absolute;pointer-events:none;opacity:0;width:1px;height:1px;";
    document.body.appendChild(vid);
    COLLECTOR_VIDEOS[def.key] = vid;
  }
}

// ─── Battle Music ───
let battleMusic = null;

function createBattleMusic() {
  if (battleMusic) return;
  battleMusic = document.createElement("audio");
  battleMusic.src = "sprites/music.mp3";
  battleMusic.loop = true;
  battleMusic.volume = 0.6;
  battleMusic.preload = "auto";
}

function playBattleMusic() {
  if (!battleMusic) createBattleMusic();
  // Mute the main game music while battle is active
  if (typeof bgMusic !== "undefined" && bgMusic) {
    bgMusic.pause();
  }
  battleMusic.currentTime = 0;
  battleMusic.play().catch(() => {});
}

function stopBattleMusic() {
  if (!battleMusic) return;
  battleMusic.pause();
  battleMusic.currentTime = 0;
  // Restore the main game music
  if (typeof bgMusic !== "undefined" && bgMusic && typeof state !== "undefined" && state.settings?.music) {
    bgMusic.play().catch(() => {});
  }
}

// ─── Asset Loader ───
function loadBattleAssets() {
  if (battleAssetsLoaded) return Promise.resolve();
  const promises = BATTLE_SPRITE_DEFS.map(name => {
    return new Promise((resolve) => {
      const makeCanvasFallback = () => {
        const c = document.createElement("canvas");
        const size = 48;
        c.width = size; c.height = size;
        const ctx2 = c.getContext("2d");
        const colors = {
          proj_apple: "#ff4444", proj_bow: "#ff88bb", proj_heart: "#ff6699",
          proj_star: "#ffd700", proj_flower: "#ff99cc", proj_petal: "#ffaadd",
          proj_mushroom: "#cc6633", proj_bunny: "#ffccdd",
          proj_cloud: "#aaddff", proj_balloon: "#ff6688",
          proj_drop: "#4488ff", proj_bubble: "#88ddff", proj_leaf: "#66cc66",
          proj_bat: "#8844aa", proj_lightning: "#bb66ff", proj_skull: "#ddaaff", proj_spike: "#9944cc",
          proj_bolt: "#ff4466",
          pu_heal: "#ff6699", pu_double: "#ffd700", pu_slow: "#88aaff", pu_shield: "#ffcc88", pu_invuln: "#88ddff",
          player_heart: "#ff4466", player_heart_hit: "#ff8899"
        };
        const emojis = {
          proj_apple: "🍎", proj_bow: "🎀", proj_heart: "❤️", proj_star: "⭐",
          proj_flower: "🌸", proj_petal: "🌺", proj_mushroom: "🍄", proj_bunny: "🐰",
          proj_cloud: "☁️", proj_balloon: "🎈",
          proj_drop: "💧", proj_bubble: "🫧", proj_leaf: "🍃",
          proj_bat: "🦇", proj_lightning: "⚡", proj_skull: "💀", proj_spike: "✦",
          proj_bolt: "💢",
          pu_heal: "❤️‍🩹", pu_double: "⭐", pu_slow: "🎀", pu_shield: "🍰", pu_invuln: "🌈",
          player_heart: "❤️", player_heart_hit: "💔"
        };
        const grd = ctx2.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2 - 1);
        const col = colors[name] || "#ff88bb";
        grd.addColorStop(0, col + "88");
        grd.addColorStop(1, col + "00");
        ctx2.fillStyle = grd;
        ctx2.beginPath();
        ctx2.arc(size/2, size/2, size/2 - 1, 0, Math.PI * 2);
        ctx2.fill();
        const fontSize = Math.floor(size * 0.62);
        ctx2.font = `${fontSize}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",serif`;
        ctx2.textAlign = "center";
        ctx2.textBaseline = "middle";
        ctx2.fillText(emojis[name] || "●", size / 2, size / 2 + 2);
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2 + Math.PI / 8;
          const dist = size * 0.38;
          ctx2.fillStyle = "rgba(255,255,255,0.7)";
          ctx2.beginPath();
          ctx2.arc(size/2 + Math.cos(angle)*dist, size/2 + Math.sin(angle)*dist, 2, 0, Math.PI * 2);
          ctx2.fill();
        }
        return c;
      };

      const tryLoad = (src, onFail) => {
        const img = new Image();
        img.onload = () => { BATTLE_ASSETS[name] = img; resolve(); };
        img.onerror = onFail;
        img.src = src;
      };

      tryLoad(
        `sprites/${name}.webp`,
        () => tryLoad(
          `sprites/${name}.svg`,
          () => { BATTLE_ASSETS[name] = makeCanvasFallback(); resolve(); }
        )
      );
    });
  });
  return Promise.all(promises).then(() => { battleAssetsLoaded = true; });
}

// ─── Projectile Pool ───
class ProjectilePool {
  constructor(maxProjectiles = 100, maxPowerUps = 10) {
    this.projectiles = [];
    for (let i = 0; i < maxProjectiles; i++) {
      this.projectiles.push({ active: false, x: 0, y: 0, vx: 0, vy: 0, type: "", damage: 0, rotation: 0, rotSpeed: 1, bouncing: false, bounceCount: 0, scale: 1 });
    }
    this.powerUps = [];
    for (let i = 0; i < maxPowerUps; i++) {
      this.powerUps.push({ active: false, x: 0, y: 0, type: "", timer: 0, bobOffset: 0 });
    }
  }

  spawn(x, y, vx, vy, type, damage, bouncing = false, scale = 1) {
    for (const p of this.projectiles) {
      if (!p.active) {
        p.active = true;
        p.x = x; p.y = y; p.vx = vx; p.vy = vy;
        p.type = type; p.damage = damage;
        p.rotation = Math.random() * Math.PI * 2;
        p.rotSpeed = (Math.random() - 0.5) * 4;
        p.bouncing = bouncing;
        p.bounceCount = 0;
        p.scale = scale || 1;
        return p;
      }
    }
    return null;
  }

  spawnPowerUp(x, y, type) {
    for (const p of this.powerUps) {
      if (!p.active) {
        p.active = true;
        p.x = x; p.y = y;
        p.type = type;
        p.timer = 7;
        p.bobOffset = Math.random() * Math.PI * 2;
        return p;
      }
    }
    return null;
  }

  deactivateAll() {
    for (const p of this.projectiles) p.active = false;
    for (const p of this.powerUps) p.active = false;
  }
}

// ─── Heart Battle State ───
let battleState = null;

function createBattleState(isReplay) {
  return {
    active: false,
    isReplay: isReplay,

    // Player
    playerX: 0, playerY: 0,
    playerVX: 0, playerVY: 0,          // for smooth physics
    playerTargetX: 0, playerTargetY: 0,
    playerHP: 100, playerMaxHP: 100,
    playerRadius: 10,                   // tighter hitbox
    iFrames: 0,

    // Input
    touchActive: false,
    touchStartX: 0, touchStartY: 0,
    playerAtTouchStart: { x: 0, y: 0 },
    keysDown: {},

    // Boss
    bossHP: 0, bossMaxHP: 0,
    bossExpression: "dance",            // which video to show
    bossShakeX: 0, bossShakeY: 0,      // hit shake

    // Phase
    currentPhase: -1,
    phaseMode: "intro",                 // intro | dodge | transition | attack | result
    phaseTimer: 0,
    spawnTimer: 0,
    patternIndex: 0,
    totalDodgeTime: 0,
    totalDamageTaken: 0,
    phaseRing: 0,                       // which sub-cycle within a phase

    // Attack phase
    attackCombo: 0,
    attackDamageMultiplier: 1,
    attackClicks: 0,
    attackCooldown: 0,                  // per-click cooldown
    attackDamagePerClick: 0,           // capped damage
    lastClickTime: 0,

    // Power-ups
    doubleDamage: 0,
    slowTime: 0,
    shield: 0,
    invuln: 0,

    // Pool
    pool: new ProjectilePool(),

    // Arena
    arena: { x: 0, y: 0, w: 0, h: 0 },

    // Canvas
    canvas: null,
    ctx: null,
    overlay: null,

    // Collector video element currently playing
    activeVideo: null,

    // Music
    musicStarted: false,

    // Timing
    lastTime: 0,
    frameCount: 0,
  };
}

// ─── Boss HP — scales to require ~3 min to kill ───
// Attack window = 4 phases × 5s = 20s total attack time
// With multiplier avg x2, tapPower varies.
// We want 180s total battle → 3 min. Attack is ~22s of that.
// We set bossHP so that frantic tapping at max rate still takes the full attack time.
// Max tap rate on mobile ≈ 8 taps/sec.
// So max damage per attack window = 8 × 5 × tapPower × multiplier
// We hard-cap damage per click and set HP accordingly.
const BOSS_HP_MULTIPLIER = 25; // bossMaxHP = tapPower * BOSS_HP_MULTIPLIER * some base
const MAX_DAMAGE_PER_CLICK_RATIO = 0.4; // each click does at most 0.4 * (bossMaxHP / 80) damage
const CLICK_COOLDOWN_MS = 90;          // min 90ms between damage taps (≈11 taps/sec max)

// ─── Arena Calculation ───
function calcArena(cw, ch) {
  // Top 35% for boss video, bottom 60% as arena
  const w = Math.floor(cw * 0.88);
  const h = Math.floor(ch * 0.50);
  const x = Math.floor((cw - w) / 2);
  const y = Math.floor(ch * 0.40);   // arena starts 40% down
  return { x, y, w, h };
}

// ─── DOM Setup ───
function createBattleDOM() {
  const overlay = document.createElement("div");
  overlay.className = "battle-overlay";
  overlay.id = "battleOverlay";
  overlay.innerHTML = `
    <!-- Canvas for arena + projectiles -->
    <canvas class="battle-canvas" id="battleCanvas"></canvas>

    <!-- Collector video area (top of screen) -->
    <div class="battle-boss-stage" id="bossStagePlaceholder">
      <video class="battle-boss-video" id="bossBattleVideo" loop muted playsinline></video>
      <div class="battle-boss-hp-wrap">
        <div class="battle-boss-name-label" id="battleBossName">A Colecionadora Maníaca</div>
        <div class="battle-hp-boss"><div class="battle-hp-boss-fill" id="battleBossHpFill"></div></div>
      </div>
    </div>

    <!-- Damage flash -->
    <div class="battle-damage-flash" id="battleDmgFlash"></div>

    <!-- Player HP bar (bottom) -->
    <div class="battle-player-bar" id="battlePlayerBar">
      <span class="battle-hp-label">❤️</span>
      <div class="battle-hp-player"><div class="battle-hp-player-fill" id="battlePlayerHpFill"></div></div>
      <span class="battle-hp-label" id="battleHpText">100</span>
    </div>

    <!-- Phase timer -->
    <div class="battle-timer" id="battleTimer"></div>

    <!-- Quit button -->
    <button class="battle-quit" id="battleQuit" type="button" aria-label="Desistir">✕</button>

    <!-- Phase transition label -->
    <div class="battle-phase-label" id="battlePhaseLabel"></div>

    <!-- Attack phase overlay -->
    <div class="battle-attack-overlay" id="battleAttackOverlay">
      <div class="battle-attack-target" id="battleAttackTarget" role="button" tabindex="0" aria-label="Atacar boss">
        <video class="battle-attack-video" id="battleAttackVideo" loop muted playsinline></video>
        <div class="battle-attack-glow"></div>
      </div>
      <div class="battle-combo" id="battleCombo">
        <div class="battle-combo-count" id="battleComboCount">0</div>
        <div class="battle-combo-label">COMBO</div>
      </div>
      <div class="battle-attack-timer" id="battleAttackTimer"></div>
    </div>

    <!-- Result screen -->
    <div class="battle-result" id="battleResult"></div>

    <!-- Intro screen -->
    <div class="battle-intro" id="battleIntro">
      <div class="battle-intro-icon">👁️‍🗨️</div>
      <div class="battle-intro-title">A Colecionadora Maníaca</div>
      <div class="battle-intro-desc">Ela roubou os fragmentos de amizade!<br>Esquive dos ataques e clique nela durante as janelas de vulnerabilidade!</div>
      <div class="battle-intro-hint">❤️ Mova seu coração com o dedo<br>✨ Clique quando ela ficar vulnerável</div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

// ─── Start Battle ───
function startHeartBattle(isReplay) {
  loadCollectorVideos();
  createBattleMusic();
  loadBattleAssets().then(() => {
    const bs = createBattleState(isReplay);
    battleState = bs;

    bs.overlay = createBattleDOM();
    bs.canvas = document.getElementById("battleCanvas");
    bs.ctx = bs.canvas.getContext("2d");

    resizeBattleCanvas(bs);
    window.addEventListener("resize", () => onBattleResize(bs));

    // Center player in arena
    bs.playerX = bs.arena.x + bs.arena.w / 2;
    bs.playerY = bs.arena.y + bs.arena.h * 0.75;
    bs.playerTargetX = bs.playerX;
    bs.playerTargetY = bs.playerY;

    // Boss HP — long battle
    const tp = typeof tapPower === "function" ? tapPower() : 10;
    // 4 attack windows × 5s × max ~10 taps/s with cooldown → ≈ ~200 effective taps
    // We want those 200 taps to NOT kill boss, only deal ~60% dmg
    // Each tap at x1.5 avg = tp * 1.5 avg. 200 * tp * 1.5 = 300*tp damage total budget
    // So bossMaxHP = 300 * tp / 0.6 = 500 * tp, minimum 3000
    bs.bossMaxHP = Math.max(3000, Math.floor(tp * 500));
    bs.bossHP = bs.bossMaxHP;

    // Per-click damage cap: so that 4 windows × 5s × cooldown = ~195 clicks
    // 195 clicks should do 80% of bossHP → each click = bossMaxHP * 0.8 / 195 ≈ 0.41%
    bs.attackDamagePerClick = bs.bossMaxHP * 0.0041;

    requestAnimationFrame(() => {
      bs.overlay.classList.add("is-active");
      bs.active = true;
      bs.phaseMode = "intro";
      bs.phaseTimer = 3.5;
      bs.lastTime = performance.now();

      document.getElementById("battleIntro").classList.add("is-visible");

      // Set attack phase video to angry
      const attackVid = document.getElementById("battleAttackVideo");
      attackVid.src = "sprites/collector_angry.webm";

      // Set main video to normal for phase 1 intro
      const mainVid = document.getElementById("bossBattleVideo");
      mainVid.src = "sprites/collector_normal.webm";
      bs.activeVideo = mainVid;

      bindBattleEvents(bs);
      requestAnimationFrame((t) => battleLoop(t, bs));
    });
  });
}

function resizeBattleCanvas(bs) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  bs.canvas.width = w * dpr;
  bs.canvas.height = h * dpr;
  bs.canvas.style.width = w + "px";
  bs.canvas.style.height = h + "px";
  bs.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  bs.arena = calcArena(w, h);
}

function onBattleResize(bs) {
  if (bs && bs.active) resizeBattleCanvas(bs);
}

// ─── Input Binding ───
function bindBattleEvents(bs) {
  const canvas = bs.canvas;

  // ── Touch: relative drag ──
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    if (bs.phaseMode !== "dodge") return;
    const t = e.touches[0];
    bs.touchActive = true;
    bs.touchStartX = t.clientX;
    bs.touchStartY = t.clientY;
    bs.playerAtTouchStart.x = bs.playerX;
    bs.playerAtTouchStart.y = bs.playerY;
  }, { passive: false });

  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (!bs.touchActive || bs.phaseMode !== "dodge") return;
    const t = e.touches[0];
    const dx = t.clientX - bs.touchStartX;
    const dy = t.clientY - bs.touchStartY;
    bs.playerTargetX = bs.playerAtTouchStart.x + dx * 1.4;  // 1.4x sensitivity
    bs.playerTargetY = bs.playerAtTouchStart.y + dy * 1.4;
    clampPlayer(bs);
  }, { passive: false });

  canvas.addEventListener("touchend", () => { bs.touchActive = false; }, { passive: true });
  canvas.addEventListener("touchcancel", () => { bs.touchActive = false; }, { passive: true });

  // ── Mouse: relative drag ──
  let mouseDown = false;
  let mouseStartX = 0, mouseStartY = 0;
  let playerAtMouse = { x: 0, y: 0 };

  canvas.addEventListener("mousedown", (e) => {
    if (bs.phaseMode !== "dodge") return;
    mouseDown = true;
    mouseStartX = e.clientX; mouseStartY = e.clientY;
    playerAtMouse.x = bs.playerX; playerAtMouse.y = bs.playerY;
  });
  canvas.addEventListener("mousemove", (e) => {
    if (!mouseDown || bs.phaseMode !== "dodge") return;
    bs.playerTargetX = playerAtMouse.x + (e.clientX - mouseStartX) * 1.3;
    bs.playerTargetY = playerAtMouse.y + (e.clientY - mouseStartY) * 1.3;
    clampPlayer(bs);
  });
  canvas.addEventListener("mouseup", () => { mouseDown = false; });

  // ── Keyboard ──
  const onKey = (e, down) => { if (bs.active) bs.keysDown[e.key] = down; };
  window.addEventListener("keydown", (e) => onKey(e, true));
  window.addEventListener("keyup", (e) => onKey(e, false));

  // ── Attack phase taps ──
  const attackTarget = document.getElementById("battleAttackTarget");
  const handleAttack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (bs.phaseMode !== "attack") return;

    const now = performance.now();
    if (now - bs.lastClickTime < CLICK_COOLDOWN_MS) return; // rate limit
    bs.lastClickTime = now;

    bs.attackCombo++;
    bs.attackClicks++;

    // Damage = fixed per-click amount × multiplier × boosts
    let dmg = bs.attackDamagePerClick * bs.attackDamageMultiplier;
    if (bs.doubleDamage > 0) dmg *= 2;

    // Combo bonus (mild)
    if (bs.attackCombo >= 30) dmg *= 1.3;
    else if (bs.attackCombo >= 15) dmg *= 1.15;

    bs.bossHP = Math.max(0, bs.bossHP - dmg);

    // Boss HP floor per phase — can't die before the final phase (phase 3)
    // Phase 0: min 70%, Phase 1: min 45%, Phase 2: min 20%, Phase 3: can die
    const hpFloors = [0.70, 0.45, 0.20, 0];
    const floor = (hpFloors[bs.currentPhase] ?? 0) * bs.bossMaxHP;
    if (bs.bossHP < floor) bs.bossHP = floor;

    // Visual feedback
    attackTarget.classList.add("is-hit");
    bs.bossShakeX = (Math.random() - 0.5) * 8;
    bs.bossShakeY = (Math.random() - 0.5) * 6;
    setTimeout(() => {
      attackTarget.classList.remove("is-hit");
      bs.bossShakeX = 0; bs.bossShakeY = 0;
    }, 80);

    document.getElementById("battleComboCount").textContent = bs.attackCombo;

    // Combo tier feedback
    const comboEl = document.getElementById("battleCombo");
    const comboCountEl = document.getElementById("battleComboCount");
    const comboLabelEl = comboEl?.querySelector(".battle-combo-label");

    // Pulse animation
    if (comboCountEl) {
      comboCountEl.style.transform = "scale(1.3)";
      setTimeout(() => { comboCountEl.style.transform = "scale(1)"; }, 100);
    }

    // Combo tier labels & colors
    if (comboLabelEl) {
      if (bs.attackCombo >= 50) {
        comboLabelEl.textContent = "DEVASTADOR!";
        comboCountEl.style.color = "#ff2266";
      } else if (bs.attackCombo >= 30) {
        comboLabelEl.textContent = "INCRÍVEL!";
        comboCountEl.style.color = "#ff66aa";
      } else if (bs.attackCombo >= 15) {
        comboLabelEl.textContent = "BOM!";
        comboCountEl.style.color = "#ffd568";
      } else {
        comboLabelEl.textContent = "COMBO";
        comboCountEl.style.color = "#ffd568";
      }
    }

    if (typeof playSound === "function") {
      if (bs.attackCombo % 10 === 0) playSound("reward");
      else playSound("tap");
    }

    if (bs.bossHP <= 0) endBattle(bs, true);
  };

  attackTarget.addEventListener("touchstart", handleAttack, { passive: false });
  attackTarget.addEventListener("mousedown", handleAttack);

  // ── Quit ──
  document.getElementById("battleQuit").addEventListener("click", () => {
    if (bs.phaseMode === "result") return;
    if (confirm("Desistir da batalha? A Colecionadora vence!")) {
      endBattle(bs, false);
    }
  });
}

function clampPlayer(bs) {
  const m = bs.playerRadius + 4;
  bs.playerTargetX = Math.max(bs.arena.x + m, Math.min(bs.arena.x + bs.arena.w - m, bs.playerTargetX));
  bs.playerTargetY = Math.max(bs.arena.y + m, Math.min(bs.arena.y + bs.arena.h - m, bs.playerTargetY));
}

// ─── Game Loop ───
function battleLoop(timestamp, bs) {
  if (!bs.active) return;

  const rawDt = Math.min(0.05, (timestamp - bs.lastTime) / 1000);
  bs.lastTime = timestamp;
  bs.frameCount++;

  const dt = bs.slowTime > 0 ? rawDt * 0.45 : rawDt;

  updateBattle(bs, dt, rawDt);
  renderBattle(bs);

  requestAnimationFrame((t) => battleLoop(t, bs));
}

// ─── Update ───
function updateBattle(bs, dt, rawDt) {
  // Power-up timers
  if (bs.doubleDamage > 0) bs.doubleDamage -= rawDt;
  if (bs.slowTime > 0) bs.slowTime -= rawDt;
  if (bs.shield > 0) bs.shield -= rawDt;
  if (bs.invuln > 0) bs.invuln -= rawDt;
  if (bs.iFrames > 0) bs.iFrames -= rawDt;

  switch (bs.phaseMode) {
    case "intro":  updateIntro(bs, rawDt); break;
    case "dodge":  updateDodge(bs, dt, rawDt); break;
    case "transition": updateTransition(bs, rawDt); break;
    case "attack": updateAttackTimer(bs, rawDt); break;
    case "result": break;
  }
}

function updateIntro(bs, dt) {
  bs.phaseTimer -= dt;
  if (bs.phaseTimer <= 0) {
    document.getElementById("battleIntro").classList.remove("is-visible");
    playBattleMusic();
    bs.musicStarted = true;
    startNextPhase(bs);
  }
}

function updateTransition(bs, dt) {
  bs.phaseTimer -= dt;
  if (bs.phaseTimer <= 0) {
    const phase = BATTLE_PHASES[bs.currentPhase];
    if (!phase) return;
    bs.phaseMode = "dodge";
    bs.phaseTimer = phase.dodgeDuration;
    bs.spawnTimer = 0;
    bs.patternIndex = 0;
    bs.pool.deactivateAll();
    bs.totalDodgeTime = 0;
    bs.totalDamageTaken = 0;

    // Show boss video (normal for phase 0, dance for rest, angry for phase 3+)
    if (bs.currentPhase === 0) showBossVideo(bs, "normal");
    else if (bs.currentPhase >= 3) showBossVideo(bs, "angry");
    else showBossVideo(bs, "dance");
  }
}

function updateAttackTimer(bs, dt) {
  bs.phaseTimer -= dt;
  const timerEl = document.getElementById("battleAttackTimer");
  if (timerEl) timerEl.textContent = Math.max(0, bs.phaseTimer).toFixed(1) + "s";
  updateHPDisplay(bs);

  if (bs.phaseTimer <= 0) {
    if (bs.bossHP <= 0) {
      endBattle(bs, true);
    } else {
      endAttackPhase(bs);
    }
  }
}

function updateDodge(bs, dt, rawDt) {
  bs.phaseTimer -= rawDt;
  bs.totalDodgeTime += rawDt;

  // Update timer display
  const timerEl = document.getElementById("battleTimer");
  if (timerEl) timerEl.textContent = Math.max(0, bs.phaseTimer).toFixed(1) + "s";

  const phase = BATTLE_PHASES[bs.currentPhase];
  if (!phase) return;

  // ── Keyboard movement (crisp, instant velocity) ──
  const kSpeed = 300; // px/sec — fast and responsive
  let kx = 0, ky = 0;
  if (bs.keysDown["ArrowLeft"]  || bs.keysDown["a"] || bs.keysDown["A"]) kx -= 1;
  if (bs.keysDown["ArrowRight"] || bs.keysDown["d"] || bs.keysDown["D"]) kx += 1;
  if (bs.keysDown["ArrowUp"]    || bs.keysDown["w"] || bs.keysDown["W"]) ky -= 1;
  if (bs.keysDown["ArrowDown"]  || bs.keysDown["s"] || bs.keysDown["S"]) ky += 1;
  const kLen = Math.hypot(kx, ky) || 1;
  if (kx !== 0 || ky !== 0) {
    bs.playerTargetX += (kx / kLen) * kSpeed * dt;
    bs.playerTargetY += (ky / kLen) * kSpeed * dt;
    clampPlayer(bs);
  }

  // ── Direct position update — no delay ──
  bs.playerX = bs.playerTargetX;
  bs.playerY = bs.playerTargetY;

  // ── Spawn projectiles ──
  bs.spawnTimer -= dt;
  if (bs.spawnTimer <= 0) {
    const pattern = phase.patterns[bs.patternIndex % phase.patterns.length];
    pattern(bs.arena, bs.pool, phase.difficulty, bs.totalDodgeTime);
    bs.patternIndex++;
    bs.spawnTimer = phase.spawnInterval;

    // Power-up chance
    if (Math.random() < phase.powerUpChance) {
      spawnPowerUp(bs.arena, bs.pool);
    }
  }

  // ── Update projectiles ──
  for (const p of bs.pool.projectiles) {
    if (!p.active) continue;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.rotation += p.rotSpeed * dt;

    if (p.bouncing) {
      let bounced = false;
      if (p.x - 16 < bs.arena.x || p.x + 16 > bs.arena.x + bs.arena.w) {
        p.vx *= -1;
        p.x = Math.max(bs.arena.x + 16, Math.min(bs.arena.x + bs.arena.w - 16, p.x));
        bounced = true;
      }
      if (p.y - 16 < bs.arena.y || p.y + 16 > bs.arena.y + bs.arena.h) {
        p.vy *= -1;
        p.y = Math.max(bs.arena.y + 16, Math.min(bs.arena.y + bs.arena.h - 16, p.y));
        if (bounced) p.bounceCount++;
      }
      if (p.bounceCount > 5) p.active = false;
    } else {
      const m = 64;
      if (p.x < bs.arena.x - m || p.x > bs.arena.x + bs.arena.w + m ||
          p.y < bs.arena.y - m || p.y > bs.arena.y + bs.arena.h + m) {
        p.active = false;
      }
    }
  }

  // ── Update power-up bobbing ──
  for (const pu of bs.pool.powerUps) {
    if (!pu.active) continue;
    pu.timer -= rawDt;
    if (pu.timer <= 0) pu.active = false;
  }

  // ── Collision: player vs projectiles ──
  if (bs.iFrames <= 0 && bs.invuln <= 0 && bs.shield <= 0) {
    for (const p of bs.pool.projectiles) {
      if (!p.active) continue;
      const dx = bs.playerX - p.x;
      const dy = bs.playerY - p.y;
      if (Math.hypot(dx, dy) < bs.playerRadius + 16 * (p.scale || 1)) {
        p.active = false;
        bs.playerHP -= p.damage;
        bs.totalDamageTaken += p.damage;
        bs.iFrames = 1.2;

        const flash = document.getElementById("battleDmgFlash");
        if (flash) { flash.classList.add("is-active"); setTimeout(() => flash.classList.remove("is-active"), 150); }

        const overlay = document.getElementById("battleOverlay");
        if (overlay) {
          overlay.classList.remove("is-shaking");
          requestAnimationFrame(() => overlay.classList.add("is-shaking"));
          setTimeout(() => overlay.classList.remove("is-shaking"), 160);
        }

        if (typeof state !== "undefined" && state.settings?.vibration && navigator.vibrate) {
          navigator.vibrate([15, 20, 15]);
        }

        if (bs.playerHP <= 0) {
          bs.playerHP = 0;
          endBattle(bs, false);
          return;
        }
      }
    }
  }

  // ── Collision: player vs power-ups ──
  for (const pu of bs.pool.powerUps) {
    if (!pu.active) continue;
    const dx = bs.playerX - pu.x;
    const dy = bs.playerY - pu.y;
    if (Math.hypot(dx, dy) < bs.playerRadius + 22) {
      pu.active = false;
      applyPowerUp(bs, pu.type);
    }
  }

  updateHPDisplay(bs);

  // ── Phase dodge done ──
  if (bs.phaseTimer <= 0) startAttackPhase(bs);
}

function applyPowerUp(bs, type) {
  switch (type) {
    case "pu_heal":   bs.playerHP = Math.min(bs.playerMaxHP, bs.playerHP + 25); break;
    case "pu_double": bs.doubleDamage = 8; break;
    case "pu_slow":   bs.slowTime = 5; break;
    case "pu_shield": bs.shield = 4; break;
    case "pu_invuln": bs.invuln = 3; break;
  }
  if (typeof playSound === "function") playSound("reward");
}

// ─── Phase Transitions ───
function startNextPhase(bs) {
  bs.currentPhase++;

  if (bs.currentPhase >= BATTLE_PHASES.length) {
    // Ran out of phases → boss still alive, player wins by surviving
    endBattle(bs, true);
    return;
  }

  const phase = BATTLE_PHASES[bs.currentPhase];
  bs.phaseMode = "transition";
  bs.phaseTimer = 2.2;
  bs.pool.deactivateAll();

  // Boss video: phase 0 = normal, phase 3+ = angry, rest = dance
  if (bs.currentPhase === 0) bs.bossExpression = "normal";
  else if (bs.currentPhase >= 3) bs.bossExpression = "angry";
  else bs.bossExpression = "dance";

  // Phase label
  const label = document.getElementById("battlePhaseLabel");
  if (label) {
    label.textContent = phase.name;
    label.classList.remove("is-visible");
    requestAnimationFrame(() => label.classList.add("is-visible"));
  }

  // Show appropriate video
  showBossVideo(bs, bs.bossExpression);

  // Reset player to lower-center
  bs.playerTargetX = bs.arena.x + bs.arena.w / 2;
  bs.playerTargetY = bs.arena.y + bs.arena.h * 0.78;
}

function startAttackPhase(bs) {
  bs.phaseMode = "attack";
  const phase = BATTLE_PHASES[bs.currentPhase];
  bs.phaseTimer = phase.attackDuration;
  bs.attackCombo = 0;
  bs.attackClicks = 0;
  bs.pool.deactivateAll();

  // Damage multiplier based on dodge quality
  const hpPct = bs.playerHP / bs.playerMaxHP;
  if (hpPct > 0.80) bs.attackDamageMultiplier = 3;
  else if (hpPct > 0.55) bs.attackDamageMultiplier = 2;
  else if (hpPct > 0.30) bs.attackDamageMultiplier = 1.5;
  else bs.attackDamageMultiplier = 1;

  // Show attack UI
  const attackOverlay = document.getElementById("battleAttackOverlay");
  if (attackOverlay) attackOverlay.classList.add("is-visible");
  document.getElementById("battleComboCount").textContent = "0";

  // Switch boss video to angry during attack
  showBossVideo(bs, "angry");

  // Update attack phase video (boss target that player clicks)
  const attackVid = document.getElementById("battleAttackVideo");
  attackVid.src = "sprites/collector_angry.webm";
  attackVid.play().catch(() => {});

  // Hide timer
  const timerEl = document.getElementById("battleTimer");
  if (timerEl) timerEl.textContent = "";

  // Phase label
  const label = document.getElementById("battlePhaseLabel");
  if (label) {
    label.textContent = "✨ VULNERÁVEL! Ataque!";
    label.classList.remove("is-visible");
    requestAnimationFrame(() => label.classList.add("is-visible"));
  }

  if (typeof playSound === "function") playSound("reward");
}

function endAttackPhase(bs) {
  const attackOverlay = document.getElementById("battleAttackOverlay");
  if (attackOverlay) attackOverlay.classList.remove("is-visible");

  // Switch back to dance
  showBossVideo(bs, "dance");

  startNextPhase(bs);
}

// ─── Video Management ───
function showBossVideo(bs, key) {
  const vid = document.getElementById("bossBattleVideo");
  if (!vid) return;
  const src = `sprites/collector_${key}.webm`;
  if (vid.src.endsWith(src.replace("sprites/", ""))) {
    // Same video already playing
    if (vid.paused) vid.play().catch(() => {});
    return;
  }
  vid.src = src;
  vid.play().catch(() => {});
  bs.activeVideo = vid;
}

// ─── HP Display ───
function updateHPDisplay(bs) {
  const pf = document.getElementById("battlePlayerHpFill");
  const bf = document.getElementById("battleBossHpFill");
  const ht = document.getElementById("battleHpText");

  if (pf) {
    const pct = Math.max(0, (bs.playerHP / bs.playerMaxHP) * 100);
    pf.style.width = pct + "%";
    if (pct < 25) pf.classList.add("is-low"); else pf.classList.remove("is-low");
  }
  if (bf) bf.style.width = Math.max(0, (bs.bossHP / bs.bossMaxHP) * 100) + "%";
  if (ht) ht.textContent = Math.ceil(Math.max(0, bs.playerHP));
}

// ─── Rendering ───
function renderBattle(bs) {
  const ctx = bs.ctx;
  const w = window.innerWidth;
  const h = window.innerHeight;

  ctx.clearRect(0, 0, w, h);

  // Show arena only during dodge / transition
  if (bs.phaseMode !== "attack" && bs.phaseMode !== "result") {
    renderArena(ctx, bs, w, h);
  }
}

function renderArena(ctx, bs, w, h) {
  const a = bs.arena;
  const t = performance.now() / 1000;

  // Arena subtle gradient fill
  const phaseIdx = Math.min(bs.currentPhase, 3);
  const baseColors = [
    ["rgba(255,143,177,0.06)", "rgba(196,77,255,0.04)"],
    ["rgba(136,170,255,0.06)", "rgba(255,143,177,0.04)"],
    ["rgba(196,77,255,0.08)",  "rgba(255,68,102,0.04)"],
    ["rgba(255,68,102,0.10)",  "rgba(255,0,80,0.05)"],
  ];
  const [c1, c2] = baseColors[phaseIdx] || baseColors[0];
  const fillGrad = ctx.createLinearGradient(a.x, a.y, a.x + a.w, a.y + a.h);
  fillGrad.addColorStop(0, c1);
  fillGrad.addColorStop(1, c2);
  ctx.fillStyle = fillGrad;

  // Arena rounded rect
  const r = 14;
  ctx.beginPath();
  ctx.moveTo(a.x + r, a.y);
  ctx.lineTo(a.x + a.w - r, a.y);
  ctx.quadraticCurveTo(a.x + a.w, a.y, a.x + a.w, a.y + r);
  ctx.lineTo(a.x + a.w, a.y + a.h - r);
  ctx.quadraticCurveTo(a.x + a.w, a.y + a.h, a.x + a.w - r, a.y + a.h);
  ctx.lineTo(a.x + r, a.y + a.h);
  ctx.quadraticCurveTo(a.x, a.y + a.h, a.x, a.y + a.h - r);
  ctx.lineTo(a.x, a.y + r);
  ctx.quadraticCurveTo(a.x, a.y, a.x + r, a.y);
  ctx.closePath();
  ctx.fill();

  // Pulsing border
  const borderAlpha = 0.3 + Math.sin(t * 2) * 0.1;
  const borderColors = ["#ff8fb1", "#88aaff", "#bb66ff", "#ff4466"];
  ctx.strokeStyle = borderColors[phaseIdx] + Math.round(borderAlpha * 255).toString(16).padStart(2, "0");
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Corner glyphs
  const glyphs = ["♡", "✦", "♡", "✦"];
  const glyphAlpha = 0.25 + Math.sin(t * 1.5) * 0.1;
  ctx.fillStyle = `rgba(255,143,177,${glyphAlpha})`;
  ctx.font = "13px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyphs[0], a.x + 9, a.y + 9);
  ctx.fillText(glyphs[1], a.x + a.w - 9, a.y + 9);
  ctx.fillText(glyphs[2], a.x + 9, a.y + a.h - 9);
  ctx.fillText(glyphs[3], a.x + a.w - 9, a.y + a.h - 9);

  // Power-ups
  for (const pu of bs.pool.powerUps) {
    if (!pu.active) continue;
    const sprite = BATTLE_ASSETS[pu.type];
    if (!sprite) continue;
    const bob = Math.sin(t * 2.5 + pu.bobOffset) * 5;
    ctx.save();
    ctx.translate(pu.x, pu.y + bob);
    const pulse = 1 + Math.sin(t * 4) * 0.12;
    ctx.scale(pulse, pulse);
    ctx.globalAlpha = Math.min(1, pu.timer / 2); // fade out near end
    ctx.shadowColor = "rgba(255,213,104,0.6)";
    ctx.shadowBlur = 10;
    ctx.drawImage(sprite, -24, -24, 48, 48);
    ctx.restore();
  }

  // Projectiles
  for (const p of bs.pool.projectiles) {
    if (!p.active) continue;
    const sprite = BATTLE_ASSETS[p.type];
    if (!sprite) continue;
    const s = 48 * (p.scale || 1);
    const hs = s / 2;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.shadowColor = "rgba(255,143,177,0.35)";
    ctx.shadowBlur = 6;
    ctx.drawImage(sprite, -hs, -hs, s, s);
    ctx.restore();
  }

  // Player heart
  drawPlayerHeart(ctx, bs, t);
}

function drawPlayerHeart(ctx, bs, t) {
  const isHit = bs.iFrames > 0;
  if (isHit && Math.floor(performance.now() / 70) % 2 === 0) return;

  const sprite = BATTLE_ASSETS[isHit ? "player_heart_hit" : "player_heart"];
  if (!sprite) return;

  const pulse = 1 + Math.sin(t * 5) * 0.06;

  ctx.save();
  ctx.translate(bs.playerX, bs.playerY);
  ctx.scale(pulse, pulse);

  // Shield ring
  if (bs.shield > 0) {
    ctx.strokeStyle = "rgba(255,204,136,0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Invuln ring
  if (bs.invuln > 0) {
    ctx.strokeStyle = "rgba(136,221,255,0.8)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.shadowColor = "rgba(255,68,102,0.7)";
  ctx.shadowBlur = 14;
  ctx.drawImage(sprite, -20, -20, 40, 40);
  ctx.restore();
}

// ─── End Battle ───
function endBattle(bs, won) {
  bs.phaseMode = "result";
  bs.pool.deactivateAll();
  stopBattleMusic();

  // Hide attack overlay
  const atk = document.getElementById("battleAttackOverlay");
  if (atk) atk.classList.remove("is-visible");

  const timerEl = document.getElementById("battleTimer");
  if (timerEl) timerEl.textContent = "";

  // Show defeated video if player won
  const mainVid = document.getElementById("bossBattleVideo");
  if (won && mainVid) {
    mainVid.src = "sprites/collector_defeated.webm";
    mainVid.play().catch(() => {});
  }

  const resultEl = document.getElementById("battleResult");
  if (!resultEl) return;

  if (won) {
    const isFirstWin = typeof state !== "undefined" && !state.collectorDefeated;
    let heartReward = isFirstWin ? 1000000 : 100000;
    let gemReward = isFirstWin ? 50 : 5;

    if (typeof state !== "undefined") {
      if (isFirstWin) state.collectorDefeated = true;
      state.gems += gemReward;
      if (typeof addHearts === "function") addHearts(heartReward, "boss");
    }

    resultEl.innerHTML = `
      <div class="battle-result-icon">🏆</div>
      <div class="battle-result-title">${isFirstWin ? "Vitória Épica!" : "Vitória!"}</div>
      <div class="battle-result-desc">${isFirstWin
        ? "A Colecionadora perdeu o controle! Os fragmentos de amizade foram recuperados!"
        : "Você derrotou a Colecionadora novamente! Sua amizade é invencível!"}</div>
      <div class="battle-result-rewards">
        <span class="battle-reward-chip">+${typeof formatNumber === "function" ? formatNumber(heartReward) : heartReward} ♡</span>
        <span class="battle-reward-chip">+${gemReward} 💎</span>
        ${isFirstWin ? '<span class="battle-reward-chip">🏆 Defensora da Amizade</span>' : ""}
      </div>
      <div class="battle-result-actions">
        <button class="battle-btn battle-btn-primary" id="battleClose">Continuar</button>
        <button class="battle-btn battle-btn-secondary" id="battleRetry">Lutar Novamente</button>
      </div>`;
  } else {
    const penalty = typeof state !== "undefined" ? Math.floor(state.hearts * 0.12) : 0;
    if (typeof state !== "undefined") state.hearts = Math.max(0, state.hearts - penalty);

    resultEl.innerHTML = `
      <div class="battle-result-icon">💔</div>
      <div class="battle-result-title">Derrota...</div>
      <div class="battle-result-desc">A Colecionadora escapou com os fragmentos. Você quase conseguiu!</div>
      ${penalty > 0 ? `<div class="battle-result-rewards"><span class="battle-reward-chip" style="color:#ff6699">-${typeof formatNumber === "function" ? formatNumber(penalty) : penalty} ♡</span></div>` : ""}
      <div class="battle-result-actions">
        <button class="battle-btn battle-btn-primary" id="battleRetry">Tentar Novamente</button>
        <button class="battle-btn battle-btn-secondary" id="battleClose">Sair</button>
      </div>`;
  }

  resultEl.classList.add("is-visible");

  setTimeout(() => {
    document.getElementById("battleClose")?.addEventListener("click", () => cleanupBattle(bs));
    document.getElementById("battleRetry")?.addEventListener("click", () => {
      cleanupBattle(bs);
      setTimeout(() => startHeartBattle(true), 350);
    });
  }, 100);
}

function cleanupBattle(bs) {
  bs.active = false;
  stopBattleMusic();

  // Stop all collector videos
  for (const k of Object.keys(COLLECTOR_VIDEOS)) {
    COLLECTOR_VIDEOS[k].pause();
  }
  // Stop inline videos
  ["bossBattleVideo", "battleAttackVideo"].forEach(id => {
    const v = document.getElementById(id);
    if (v) v.pause();
  });

  window.removeEventListener("resize", () => onBattleResize(bs));

  if (bs.overlay) {
    bs.overlay.classList.remove("is-active");
    setTimeout(() => bs.overlay?.parentNode?.removeChild(bs.overlay), 600);
  }

  if (typeof checkAchievements === "function") checkAchievements();
  if (typeof renderAll === "function") renderAll();
  if (typeof saveState === "function") saveState();

  battleState = null;
}
