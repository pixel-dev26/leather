// Makes the smaller copies of the product photos that product cards and thumbnails load.
// For every public/images/products/<handle>/NN.jpg|png it writes <handle>/w320/NN.webp, w640/NN.webp and
// w960/NN.webp (WebP, quality 80, never wider than the original). The originals stay as they are; the
// featured-product galleries still show them.
//
// Re-run whenever the product photos change:  npm run images   (add -- --force to remake every copy)
// Copies newer than their original are skipped, and copies whose original is gone are deleted.
// Keep WIDTHS in step with src/lib/image-loader.ts, src/components/v5/ProductPhoto.jsx and the sized()
// helper in public/v5/main.js.
// sharp ships with Next.js (an optional dependency of `next`), so nothing extra needs installing.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WIDTHS = [320, 640, 960];
const QUALITY = 80;
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/images/products");
const force = process.argv.includes("--force");
const isPhoto = (f) => /^[^.]+\.(jpe?g|png)$/i.test(f);
const isSizedDir = (f) => /^w\d+$/.test(f);
const base = (f) => f.replace(/\.[^.]+$/, "");

const mtime = (p) => fs.stat(p).then((s) => s.mtimeMs, () => 0);
const size = (p) => fs.stat(p).then((s) => s.size, () => 0);

const jobs = [];
let removed = 0;
for (const entry of await fs.readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = path.join(root, entry.name);
  const files = await fs.readdir(dir);
  const photos = files.filter(isPhoto);
  for (const file of photos) jobs.push({ dir, file });

  // Drop copies left over from photos that no longer exist (or from a width no longer made).
  const keep = new Set(photos.map(base));
  for (const sub of files.filter(isSizedDir)) {
    const subDir = path.join(dir, sub);
    if (!WIDTHS.includes(Number(sub.slice(1)))) {
      await fs.rm(subDir, { recursive: true });
      continue;
    }
    for (const f of await fs.readdir(subDir)) {
      if (!keep.has(base(f))) {
        await fs.rm(path.join(subDir, f));
        removed++;
      }
    }
  }
}

let made = 0;
let skipped = 0;
let before = 0;
const after = Object.fromEntries(WIDTHS.map((w) => [w, 0]));

async function resize({ dir, file }) {
  const src = path.join(dir, file);
  const srcTime = await mtime(src);
  const srcSize = await size(src);
  before += srcSize; // (`x += await …` would read x before the await and lose other workers' updates)
  for (const w of WIDTHS) {
    const out = path.join(dir, `w${w}`, `${base(file)}.webp`);
    if (force || (await mtime(out)) < srcTime) {
      await fs.mkdir(path.dirname(out), { recursive: true });
      await sharp(src)
        .rotate() // apply any EXIF orientation before the metadata is dropped
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(out);
      made++;
    } else skipped++;
    const outSize = await size(out);
    after[w] += outSize;
  }
}

// A few photos at a time; sharp spreads each one over its own thread pool.
const queue = [...jobs];
const workers = Array.from({ length: Math.min(4, os.availableParallelism?.() ?? 4) }, async () => {
  while (queue.length) await resize(queue.shift());
});
await Promise.all(workers);

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(`${jobs.length} photos in ${path.relative(process.cwd(), root) || root}: ${made} copies made, ${skipped} up to date, ${removed} stale removed`);
console.log(`originals ${mb(before)} · ${WIDTHS.map((w) => `w${w} ${mb(after[w])}`).join(" · ")}`);
