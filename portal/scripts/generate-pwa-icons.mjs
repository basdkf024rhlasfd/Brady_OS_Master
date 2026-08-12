#!/usr/bin/env node
/**
 * Generates the mception.ai PWA / apple-touch icon set into public/icons/.
 *
 * The container has no image tooling (no sharp, no PIL, no ImageMagick), so the
 * mark is rasterized here from signed-distance functions and written out as raw
 * RGBA PNGs via zlib. Re-run with `node scripts/generate-pwa-icons.mjs` after
 * changing the geometry below.
 *
 * The mark is a lowercase "m" plus the .ai dot, on the sidebar-dark background
 * (#111827) so the installed icon matches the portal chrome. Its bounding box
 * fits inside the maskable safe zone (a circle of radius 0.4 around center), so
 * one rendering serves both `any` and `maskable` purposes.
 */

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "icons");

const BG = [0x11, 0x18, 0x27]; // --background (sidebar-dark)
const INK = [0xf9, 0xfa, 0xfb]; // --foreground (sidebar-dark)
const DOT = [0x93, 0xc5, 0xfd]; // --accent-brand (sidebar-dark)

// --- Geometry, in unit space (0..1, y down) -------------------------------
const HW = 0.03; // stroke half-width
const R = 0.11; // arch radius
const Y_BASE = 0.655;
const Y_ARCH_TOP = 0.395;
const CY = Y_ARCH_TOP + R;
const X1 = 0.245;
const X2 = X1 + 2 * R;
const X3 = X2 + 2 * R;
const DOT_R = 0.045;
// Centering offsets for the full ink bbox (mark + dot).
const DX = -0.0175;
const DY = -0.025;

const segments = [
  [X1, Y_ARCH_TOP, X1, Y_BASE],
  [X2, CY, X2, Y_BASE],
  [X3, CY, X3, Y_BASE],
];
const arches = [
  [X1 + R, CY],
  [X2 + R, CY],
];
const dot = [0.775, Y_BASE + HW - DOT_R, DOT_R];

function distToSegment(px, py, [ax, ay, bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Distance to the upper half of a circle (the arch), capped at its endpoints. */
function distToArch(px, py, [cx, cy]) {
  if (py <= cy) return Math.abs(Math.hypot(px - cx, py - cy) - R);
  return Math.min(Math.hypot(px - (cx - R), py - cy), Math.hypot(px - (cx + R), py - cy));
}

/** Returns [r,g,b] for a unit-space point, or null for background. */
function sample(px, py) {
  const x = px - DX;
  const y = py - DY;

  if (Math.hypot(x - dot[0], y - dot[1]) <= dot[2]) return DOT;

  let d = Infinity;
  for (const s of segments) d = Math.min(d, distToSegment(x, y, s));
  for (const a of arches) d = Math.min(d, distToArch(x, y, a));
  return d <= HW ? INK : null;
}

// --- PNG encoding ---------------------------------------------------------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function encodePng(size, pixels) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  // bytes 10-12 (compression, filter, interlace) stay 0

  // Each scanline is prefixed with filter type 0 (None).
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/** Renders the icon at `size` px with 4x4 supersampling for anti-aliasing. */
function render(size) {
  const SS = 4;
  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0;
      let g = 0;
      let b = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const c = sample((x + (sx + 0.5) / SS) / size, (y + (sy + 0.5) / SS) / size) ?? BG;
          r += c[0];
          g += c[1];
          b += c[2];
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      pixels[i] = Math.round(r / n);
      pixels[i + 1] = Math.round(g / n);
      pixels[i + 2] = Math.round(b / n);
      pixels[i + 3] = 255; // opaque: iOS renders transparency on home screens as black
    }
  }
  return encodePng(size, pixels);
}

const TARGETS = [
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["apple-touch-icon.png", 180],
  ["favicon-32.png", 32],
];

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, size] of TARGETS) {
  const png = render(size);
  writeFileSync(join(OUT_DIR, name), png);
  console.log(`wrote icons/${name} (${size}x${size}, ${png.length} bytes)`);
}
