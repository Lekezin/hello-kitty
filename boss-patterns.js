/* ═══════════════════════════════════════════
   HEART BATTLE — Boss Attack Patterns
   ═══════════════════════════════════════════
   Each pattern function receives:
     - arena: { x, y, w, h } (arena bounds in canvas coords)
     - pool: ProjectilePool instance
     - difficulty: 0-1 (scales with phase progression)
     - dt: elapsed time in this dodge phase (seconds)
   
   Patterns call pool.spawn(...) to create projectiles.
   ═══════════════════════════════════════════ */

// ─── Helper: spawn a projectile from pool ───
// pool.spawn(x, y, vx, vy, type, damage)
// type maps to sprite key in BATTLE_ASSETS

// ═══ HELLO KITTY PATTERNS ═══

function pattern_kitty_rain(arena, pool, difficulty, dt) {
  // Apples and bows rain from the top in waves
  const count = 2 + Math.floor(difficulty * 3);
  const speed = 80 + difficulty * 60;
  for (let i = 0; i < count; i++) {
    const x = arena.x + 20 + Math.random() * (arena.w - 40);
    const y = arena.y - 20;
    const angle = (Math.PI / 2) + (Math.random() - 0.5) * 0.3;
    const type = Math.random() > 0.5 ? "proj_apple" : "proj_bow";
    pool.spawn(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, type, 8);
  }
}

function pattern_kitty_stars(arena, pool, difficulty) {
  // Stars radiate from center in a circle
  const count = 4 + Math.floor(difficulty * 4);
  const speed = 70 + difficulty * 50;
  const cx = arena.x + arena.w / 2;
  const cy = arena.y + arena.h / 2;
  const offset = Math.random() * Math.PI * 2;
  for (let i = 0; i < count; i++) {
    const angle = offset + (i / count) * Math.PI * 2;
    pool.spawn(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "proj_star", 6);
  }
}

function pattern_kitty_hearts(arena, pool, difficulty) {
  // Hearts float sideways from left and right
  const count = 2 + Math.floor(difficulty * 3);
  const speed = 60 + difficulty * 40;
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    const x = fromLeft ? arena.x - 10 : arena.x + arena.w + 10;
    const y = arena.y + 30 + Math.random() * (arena.h - 60);
    const vx = (fromLeft ? 1 : -1) * speed;
    const vy = (Math.random() - 0.5) * 30;
    pool.spawn(x, y, vx, vy, "proj_heart", 7);
  }
}

// ═══ MY MELODY PATTERNS ═══

function pattern_melody_spiral(arena, pool, difficulty) {
  // Flowers spiral outward from center
  const count = 3 + Math.floor(difficulty * 3);
  const speed = 55 + difficulty * 45;
  const cx = arena.x + arena.w / 2;
  const cy = arena.y + arena.h / 2;
  const baseAngle = performance.now() * 0.002;
  for (let i = 0; i < count; i++) {
    const angle = baseAngle + (i / count) * Math.PI * 2;
    const type = i % 2 === 0 ? "proj_flower" : "proj_petal";
    pool.spawn(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, type, 7);
  }
}

function pattern_melody_mushrooms(arena, pool, difficulty) {
  // Mushrooms bounce up from bottom
  const count = 3 + Math.floor(difficulty * 2);
  const speed = 90 + difficulty * 40;
  for (let i = 0; i < count; i++) {
    const x = arena.x + 30 + Math.random() * (arena.w - 60);
    const y = arena.y + arena.h + 10;
    const vx = (Math.random() - 0.5) * 40;
    pool.spawn(x, y, vx, -speed, "proj_mushroom", 9);
  }
}

function pattern_melody_bunnies(arena, pool, difficulty) {
  // Bunnies hop across from sides
  const count = 2 + Math.floor(difficulty * 2);
  const speed = 65 + difficulty * 35;
  for (let i = 0; i < count; i++) {
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? arena.x - 10 : arena.x + arena.w + 10;
    const y = arena.y + arena.h * 0.6 + Math.random() * (arena.h * 0.3);
    const vx = (fromLeft ? 1 : -1) * speed;
    const vy = -40 - Math.random() * 30;
    pool.spawn(x, y, vx, vy, "proj_bunny", 8);
  }
}

// ═══ CINNAMOROLL PATTERNS ═══

function pattern_cinna_clouds(arena, pool, difficulty) {
  // Slow clouds drift across, then burst into stars
  const count = 2 + Math.floor(difficulty * 2);
  const speed = 35 + difficulty * 25;
  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    const x = fromLeft ? arena.x - 10 : arena.x + arena.w + 10;
    const y = arena.y + 20 + Math.random() * (arena.h * 0.5);
    const vx = (fromLeft ? 1 : -1) * speed;
    // Clouds are bigger and slower, but more HP damage
    pool.spawn(x, y, vx, (Math.random() - 0.5) * 15, "proj_cloud", 12);
  }
}

function pattern_cinna_balloons(arena, pool, difficulty) {
  // Balloons float up from bottom, weaving left-right
  const count = 2 + Math.floor(difficulty * 2);
  const speed = 50 + difficulty * 30;
  for (let i = 0; i < count; i++) {
    const x = arena.x + 20 + Math.random() * (arena.w - 40);
    const y = arena.y + arena.h + 10;
    const vx = Math.sin(i * 1.5) * 30;
    pool.spawn(x, y, vx, -speed, "proj_balloon", 7);
  }
}

// ═══ KEROPPI PATTERNS ═══

function pattern_keroppi_bounce(arena, pool, difficulty) {
  // Drops that bounce off arena walls
  const count = 2 + Math.floor(difficulty * 2);
  const speed = 80 + difficulty * 50;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) { x = arena.x + Math.random() * arena.w; y = arena.y - 10; }
    else if (edge === 1) { x = arena.x + arena.w + 10; y = arena.y + Math.random() * arena.h; }
    else if (edge === 2) { x = arena.x + Math.random() * arena.w; y = arena.y + arena.h + 10; }
    else { x = arena.x - 10; y = arena.y + Math.random() * arena.h; }
    pool.spawn(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, "proj_drop", 8, true); // bouncing=true
  }
}

function pattern_keroppi_bubbles(arena, pool, difficulty) {
  // Bubbles float up slowly, drift sideways
  const count = 3 + Math.floor(difficulty * 2);
  for (let i = 0; i < count; i++) {
    const x = arena.x + 15 + Math.random() * (arena.w - 30);
    const y = arena.y + arena.h + 10;
    const vx = (Math.random() - 0.5) * 40;
    const vy = -(30 + Math.random() * 25);
    pool.spawn(x, y, vx, vy, "proj_bubble", 6);
  }
}

function pattern_keroppi_leaves(arena, pool, difficulty) {
  // Leaves drift diagonally
  const count = 3 + Math.floor(difficulty * 2);
  const speed = 50 + difficulty * 30;
  for (let i = 0; i < count; i++) {
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? arena.x - 10 : arena.x + arena.w + 10;
    const y = arena.y - 10;
    const vx = (fromLeft ? 1 : -1) * (speed * 0.6);
    const vy = speed * 0.8;
    pool.spawn(x, y, vx, vy, "proj_leaf", 5);
  }
}

// ═══ KUROMI PATTERNS ═══

function pattern_kuromi_bolts(arena, pool, difficulty) {
  // Lightning bolts shoot diagonally from corners
  const corners = [
    [arena.x, arena.y],
    [arena.x + arena.w, arena.y],
    [arena.x, arena.y + arena.h],
    [arena.x + arena.w, arena.y + arena.h]
  ];
  const count = 2 + Math.floor(difficulty * 3);
  const speed = 110 + difficulty * 60;
  for (let i = 0; i < count; i++) {
    const [cx, cy] = corners[i % corners.length];
    const targetX = arena.x + arena.w / 2 + (Math.random() - 0.5) * arena.w * 0.5;
    const targetY = arena.y + arena.h / 2 + (Math.random() - 0.5) * arena.h * 0.5;
    const dx = targetX - cx;
    const dy = targetY - cy;
    const len = Math.hypot(dx, dy);
    pool.spawn(cx, cy, (dx / len) * speed, (dy / len) * speed, "proj_lightning", 10);
  }
}

function pattern_kuromi_bats(arena, pool, difficulty) {
  // Bats swarm from top, zig-zagging
  const count = 3 + Math.floor(difficulty * 3);
  const speed = 75 + difficulty * 45;
  for (let i = 0; i < count; i++) {
    const x = arena.x + 10 + Math.random() * (arena.w - 20);
    const y = arena.y - 10;
    const vx = (Math.random() - 0.5) * 60;
    pool.spawn(x, y, vx, speed, "proj_bat", 9);
  }
}

function pattern_kuromi_skulls(arena, pool, difficulty) {
  // Skulls appear at random positions and home toward center briefly
  const count = 2 + Math.floor(difficulty * 2);
  const speed = 60 + difficulty * 40;
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) { x = arena.x + Math.random() * arena.w; y = arena.y - 10; }
    else if (edge === 1) { x = arena.x + arena.w + 10; y = arena.y + Math.random() * arena.h; }
    else if (edge === 2) { x = arena.x + Math.random() * arena.w; y = arena.y + arena.h + 10; }
    else { x = arena.x - 10; y = arena.y + Math.random() * arena.h; }
    const cx = arena.x + arena.w / 2;
    const cy = arena.y + arena.h / 2;
    const dx = cx - x;
    const dy = cy - y;
    const len = Math.hypot(dx, dy);
    pool.spawn(x, y, (dx / len) * speed, (dy / len) * speed, "proj_skull", 12);
  }
}

function pattern_kuromi_spikes(arena, pool, difficulty) {
  // Spikes shoot in a fan from top center
  const count = 4 + Math.floor(difficulty * 3);
  const speed = 90 + difficulty * 50;
  const cx = arena.x + arena.w / 2;
  const cy = arena.y - 10;
  const spread = Math.PI * 0.6;
  const baseAngle = Math.PI / 2;
  for (let i = 0; i < count; i++) {
    const angle = baseAngle - spread / 2 + (i / (count - 1)) * spread;
    pool.spawn(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed, "proj_spike", 8);
  }
}

// ═══ BADTZ-MARU PATTERNS ═══

function pattern_badtz_burst(arena, pool, difficulty) {
  // Ultra-fast bolts in rapid succession from random edges
  const count = 3 + Math.floor(difficulty * 4);
  const speed = 140 + difficulty * 80;
  for (let i = 0; i < count; i++) {
    const edge = Math.floor(Math.random() * 4);
    let x, y, vx, vy;
    if (edge === 0) { x = arena.x + Math.random() * arena.w; y = arena.y - 10; vx = (Math.random() - 0.5) * 40; vy = speed; }
    else if (edge === 1) { x = arena.x + arena.w + 10; y = arena.y + Math.random() * arena.h; vx = -speed; vy = (Math.random() - 0.5) * 40; }
    else if (edge === 2) { x = arena.x + Math.random() * arena.w; y = arena.y + arena.h + 10; vx = (Math.random() - 0.5) * 40; vy = -speed; }
    else { x = arena.x - 10; y = arena.y + Math.random() * arena.h; vx = speed; vy = (Math.random() - 0.5) * 40; }
    pool.spawn(x, y, vx, vy, "proj_bolt", 10);
  }
}

// ═══ POWER-UP SPAWNING ═══

function spawnPowerUp(arena, pool) {
  const types = ["pu_heal", "pu_heal", "pu_heal", "pu_double", "pu_slow", "pu_shield", "pu_invuln"];
  const type = types[Math.floor(Math.random() * types.length)];
  const x = arena.x + 30 + Math.random() * (arena.w - 60);
  const y = arena.y + 30 + Math.random() * (arena.h - 60);
  pool.spawnPowerUp(x, y, type);
}

// ═══ PHASE DEFINITIONS ═══
// Target ~180 seconds total:
// Dodge: 30 + 35 + 40 + 30 = 135s | Attack: 6+7+7+8 = 28s | Transitions: ~9s = 172s

const BATTLE_PHASES = [
  {
    name: "Fase 1 — Despertar",
    dodgeDuration: 30,
    attackDuration: 6,
    difficulty: 0.18,
    spawnInterval: 1.4,
    patterns: [
      pattern_kitty_rain, pattern_kitty_hearts,
      pattern_melody_spiral, pattern_cinna_balloons,
    ],
    powerUpChance: 0.18,
  },
  {
    name: "Fase 2 — Tempestade",
    dodgeDuration: 35,
    attackDuration: 7,
    difficulty: 0.42,
    spawnInterval: 1.0,
    patterns: [
      pattern_cinna_clouds, pattern_keroppi_bounce,
      pattern_kitty_stars, pattern_melody_mushrooms,
      pattern_keroppi_bubbles, pattern_melody_bunnies,
    ],
    powerUpChance: 0.13,
  },
  {
    name: "Fase 3 — Furia",
    dodgeDuration: 40,
    attackDuration: 7,
    difficulty: 0.70,
    spawnInterval: 0.72,
    patterns: [
      pattern_kuromi_bolts, pattern_kuromi_bats,
      pattern_badtz_burst, pattern_keroppi_leaves,
      pattern_kuromi_skulls, pattern_kitty_stars,
    ],
    powerUpChance: 0.10,
  },
  {
    name: "Fase Final - Colapso Total",
    dodgeDuration: 30,
    attackDuration: 8,
    difficulty: 1.0,
    spawnInterval: 0.48,
    patterns: [
      pattern_kuromi_spikes, pattern_badtz_burst,
      pattern_kuromi_bolts, pattern_kitty_stars,
      pattern_melody_spiral, pattern_keroppi_bounce,
      pattern_kuromi_skulls, pattern_cinna_clouds,
      pattern_kuromi_bats, pattern_melody_mushrooms,
    ],
    powerUpChance: 0.15,
  }
];
