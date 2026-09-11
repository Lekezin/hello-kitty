/**
 * generate-sprites.js
 * Generates all Heart Battle sprite WebP files using Canvas API (Node.js + canvas package).
 * Run: node generate-sprites.js
 * 
 * If 'canvas' package is not available, falls back to writing placeholder PNG files.
 */

const fs = require("fs");
const path = require("path");
const spritesDir = path.join(__dirname, "sprites");

if (!fs.existsSync(spritesDir)) {
  fs.mkdirSync(spritesDir, { recursive: true });
}

// ─── All sprite names that heartbattle.js expects ───
const SPRITE_NAMES = [
  "proj_apple", "proj_bow", "proj_heart", "proj_star",
  "proj_flower", "proj_petal", "proj_mushroom", "proj_bunny",
  "proj_cloud", "proj_balloon",
  "proj_drop", "proj_bubble", "proj_leaf",
  "proj_bat", "proj_lightning", "proj_skull", "proj_spike",
  "proj_bolt",
  "pu_heal", "pu_double", "pu_slow", "pu_shield", "pu_invuln",
  "player_heart", "player_heart_hit",
  "collector_normal", "collector_angry", "collector_defeated"
];

const SPRITE_CONFIG = {
  proj_apple:     { emoji: "🍎", color: [255, 68, 68],   size: 48 },
  proj_bow:       { emoji: "🎀", color: [255, 136, 187], size: 48 },
  proj_heart:     { emoji: "❤️", color: [255, 51, 102],  size: 48 },
  proj_star:      { emoji: "⭐", color: [255, 215, 0],   size: 48 },
  proj_flower:    { emoji: "🌸", color: [255, 170, 221], size: 48 },
  proj_petal:     { emoji: "🌺", color: [255, 102, 170], size: 48 },
  proj_mushroom:  { emoji: "🍄", color: [204, 68, 34],   size: 48 },
  proj_bunny:     { emoji: "🐰", color: [255, 204, 221], size: 48 },
  proj_cloud:     { emoji: "☁️", color: [170, 221, 255], size: 48 },
  proj_balloon:   { emoji: "🎈", color: [255, 102, 136], size: 48 },
  proj_drop:      { emoji: "💧", color: [68, 136, 255],  size: 48 },
  proj_bubble:    { emoji: "🫧", color: [136, 221, 255], size: 48 },
  proj_leaf:      { emoji: "🍃", color: [68, 204, 102],  size: 48 },
  proj_bat:       { emoji: "🦇", color: [136, 68, 170],  size: 48 },
  proj_lightning: { emoji: "⚡", color: [187, 102, 255], size: 48 },
  proj_skull:     { emoji: "💀", color: [221, 170, 255], size: 48 },
  proj_spike:     { emoji: "✦",  color: [153, 68, 204],  size: 48 },
  proj_bolt:      { emoji: "💢", color: [255, 68, 102],  size: 48 },
  pu_heal:        { emoji: "❤️‍🩹", color: [255, 102, 153], size: 48 },
  pu_double:      { emoji: "⭐", color: [255, 215, 0],   size: 48 },
  pu_slow:        { emoji: "🎀", color: [136, 170, 255], size: 48 },
  pu_shield:      { emoji: "🍰", color: [255, 204, 136], size: 48 },
  pu_invuln:      { emoji: "🌈", color: [136, 221, 255], size: 48 },
  player_heart:     { emoji: "❤️", color: [255, 68, 102],  size: 48 },
  player_heart_hit: { emoji: "💔", color: [255, 136, 153], size: 48 },
  collector_normal:   { emoji: "👁️‍🗨️", color: [204, 68, 255],  size: 128 },
  collector_angry:    { emoji: "😡",   color: [255, 34, 102],  size: 128 },
  collector_defeated: { emoji: "😵",   color: [136, 136, 204], size: 128 },
};

// Try to use node-canvas if available
let createCanvas;
try {
  ({ createCanvas } = require("canvas"));
  console.log("✓ Using node-canvas for rendering");
  generateWithCanvas();
} catch (e) {
  console.log("⚠ node-canvas not available, creating SVG placeholders instead");
  console.log("  (The game will auto-generate canvas fallbacks if WebP files are missing)");
  generateSVGPlaceholders();
}

function generateWithCanvas() {
  let count = 0;
  for (const name of SPRITE_NAMES) {
    const cfg = SPRITE_CONFIG[name];
    if (!cfg) continue;

    const size = cfg.size;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // Glow
    const [r, g, b] = cfg.color;
    const gradient = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2 - 1);
    gradient.addColorStop(0, `rgba(${r},${g},${b},0.4)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2 - 1, 0, Math.PI * 2);
    ctx.fill();

    // Emoji
    const fontSize = Math.floor(size * 0.62);
    ctx.font = `${fontSize}px Arial, "Segoe UI Emoji", "Apple Color Emoji"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(cfg.emoji, size/2, size/2 + 2);

    // Sparkles
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + Math.PI / 8;
      const dist = size * 0.38;
      const sx = size/2 + Math.cos(angle) * dist;
      const sy = size/2 + Math.sin(angle) * dist;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.beginPath();
      ctx.arc(sx, sy, 2, 0, Math.PI * 2);
      ctx.fill();
    }

    const outPath = path.join(spritesDir, `${name}.webp`);
    // node-canvas doesn't support webp in all builds, try png as fallback
    try {
      const buf = canvas.toBuffer("image/webp");
      fs.writeFileSync(outPath, buf);
    } catch (_) {
      const pngPath = path.join(spritesDir, `${name}.png`);
      const buf = canvas.toBuffer("image/png");
      fs.writeFileSync(pngPath, buf);
      // Also write a webp redirect file
      fs.writeFileSync(outPath, buf); // save png data with webp extension, browser will handle it
    }
    count++;
    process.stdout.write(`✓ ${name}.webp\n`);
  }
  console.log(`\n🎀 Done! ${count} sprites saved to sprites/`);
}

function generateSVGPlaceholders() {
  // Generate SVG files as .webp — browsers accept SVG inside img tags
  // heartbattle.js handles missing files gracefully with emoji canvas fallback
  let count = 0;
  for (const name of SPRITE_NAMES) {
    const cfg = SPRITE_CONFIG[name];
    if (!cfg) continue;
    const [r, g, b] = cfg.color;
    const size = cfg.size;
    const half = size / 2;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="g" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgb(${r},${g},${b})" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="rgb(${r},${g},${b})" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <circle cx="${half}" cy="${half}" r="${half - 1}" fill="url(#g)"/>
  <text x="${half}" y="${half + 4}" font-size="${Math.floor(size * 0.62)}" text-anchor="middle" dominant-baseline="middle" font-family="'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif">${cfg.emoji}</text>
</svg>`;
    
    // Save as SVG (heartbattle.js img.src will load it, browsers render it)
    // Write with .webp extension — won't be true WebP but will gracefully fail and trigger onerror
    // which creates the canvas fallback. Better: write .svg files and update the path.
    const svgPath = path.join(spritesDir, `${name}.svg`);
    fs.writeFileSync(svgPath, svg, "utf8");
    
    // Create a tiny placeholder webp (1x1 transparent)
    // This ensures the img loads without error on onerror check
    // The onerror handler in heartbattle.js creates an emoji canvas fallback anyway
    count++;
    process.stdout.write(`✓ ${name}.svg placeholder\n`);
  }
  
  console.log(`\n✓ ${count} SVG placeholders created in sprites/`);
  console.log("Note: Game will use canvas emoji fallback rendering for all sprites.");
  console.log("For best visuals, run: npm install canvas && node generate-sprites.js");
}
