// Converts every JPG and PNG under public/ to WebP beside it (same name, .webp) and removes the original, so the
// site only serves WebP. Photos use quality 85; the logos in public/brand are lossless (crisp edges, transparency).
// Each WebP keeps its original's timestamp, so the smaller copies made by `npm run images` stay up to date.
//
// Run after adding new photos:  npm run webp            (add -- --keep to leave the JPG/PNG files in place)
// Then point the code at the .webp paths. Where a .webp of the same name already exists it is kept, and the
// original is only removed when both are the same size in pixels.
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const QUALITY = 85;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public");
const keep = process.argv.includes("--keep");
const isRaster = (f) => /\.(jpe?g|png)$/i.test(f);
const lossless = (file) => file.startsWith(path.join(root, "brand") + path.sep);

async function walk(dir, out = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (isRaster(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(root);
let converted = 0, kept = 0, before = 0, after = 0;
const conflicts = [];

async function convert(src) {
  const out = src.replace(/\.(jpe?g|png)$/i, ".webp");
  const stat = await fs.stat(src);
  before += stat.size;
  const existing = await fs.stat(out).catch(() => null);
  if (existing) {
    // A WebP of the same name is already there: keep it, and drop the original only if they match in size
    const [a, b] = await Promise.all([sharp(src).metadata(), sharp(out).metadata()]);
    if (a.width === b.width && a.height === b.height) {
      if (!keep) await fs.rm(src);
      kept++;
      after += existing.size;
    } else {
      conflicts.push(`${path.relative(root, src)} (${a.width}×${a.height}) vs existing ${path.basename(out)} (${b.width}×${b.height})`);
      after += stat.size;
    }
    return;
  }
  await sharp(src)
    .rotate() // apply any EXIF orientation before the metadata is dropped
    .webp(lossless(src) ? { lossless: true } : { quality: QUALITY })
    .toFile(out);
  await fs.utimes(out, stat.atime, stat.mtime);
  if (!keep) await fs.rm(src);
  converted++;
  after += (await fs.stat(out)).size;
}

const queue = [...files];
await Promise.all(Array.from({ length: Math.min(4, os.availableParallelism?.() ?? 4) }, async () => {
  while (queue.length) await convert(queue.shift());
}));

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(`${files.length} JPG/PNG files in public/: ${converted} converted, ${kept} already had a matching WebP${keep ? "" : ", originals removed"}`);
console.log(`${mb(before)} → ${mb(after)}`);
if (conflicts.length) {
  console.log(`Left alone (a different-sized WebP of the same name exists):`);
  conflicts.forEach((c) => console.log(`  ${c}`));
}
