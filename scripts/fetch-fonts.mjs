// Downloads the Google Fonts every version uses into src/fonts/files/ (Latin subset, WOFF2) and writes
// src/fonts/manifest.json, so builds never fetch from Google. next/font/google crashed on Vercel when Google
// returned a font URL without a file extension; src/fonts/index.ts loads these files with next/font/local instead.
// Run: node scripts/fetch-fonts.mjs  (re-run only when a version adds or changes a font).

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("src/fonts/files");
// A current Chrome user agent, so Google serves WOFF2 split by subset
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";

// family → the axis query Google's CSS2 API takes (the same weights/styles the layouts asked next/font/google for)
const FAMILIES = {
  "EB Garamond": "ital,wght@0,400;0,500;1,400;1,500",
  Montserrat: "wght@400;500;600",
  Jost: "ital,wght@0,400;0,700;1,400;1,700",
  "Instrument Serif": "ital@1",
  "Roboto Condensed": "wght@700",
  Inter: "wght@400;500",
  "Playfair Display": "wght@400;500",
  "Funnel Sans": "wght@400;500",
  "Libre Baskerville": "wght@400",
  Figtree: "wght@400;500;600",
  Newsreader: "ital,opsz,wght@0,6..72,200..800;1,6..72,200..800",
  "Hanken Grotesk": "wght@100..900",
};

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");
const manifest = {};

await mkdir(OUT, { recursive: true });
for (const [family, axes] of Object.entries(FAMILIES)) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axes}&display=swap`;
  const css = await (await fetch(url, { headers: { "user-agent": UA } })).text();
  // Each block is "/* latin */ @font-face { … }"; keep the Latin ones only
  const blocks = [...css.matchAll(/\/\*\s*latin\s*\*\/\s*@font-face\s*{([^}]*)}/g)].map((m) => m[1]);
  if (!blocks.length) throw new Error(`No Latin @font-face for ${family}:\n${css.slice(0, 400)}`);

  const files = new Map(); // one entry per distinct file (variable fonts serve one file for a weight range)
  for (const b of blocks) {
    const src = /src:\s*url\(([^)]+)\)/.exec(b)[1];
    const weight = /font-weight:\s*([^;]+);/.exec(b)[1].trim();
    const style = /font-style:\s*([^;]+);/.exec(b)[1].trim();
    const entry = files.get(src) ?? { src, style, weights: [] };
    entry.weights.push(...weight.split(/\s+/).map(Number));
    files.set(src, entry);
  }

  manifest[family] = [];
  for (const { src, style, weights } of files.values()) {
    const lo = Math.min(...weights);
    const hi = Math.max(...weights);
    const weight = lo === hi ? String(lo) : `${lo} ${hi}`;
    const name = `${slug(family)}-${weight.replace(" ", "-")}${style === "italic" ? "-italic" : ""}.woff2`;
    const buf = Buffer.from(await (await fetch(src, { headers: { "user-agent": UA } })).arrayBuffer());
    if (buf.subarray(0, 4).toString() !== "wOF2") throw new Error(`${family}: ${src} is not a WOFF2 file`);
    await writeFile(path.join(OUT, name), buf);
    manifest[family].push({ path: `./files/${name}`, weight, style });
    console.log(`${family.padEnd(18)} ${weight.padEnd(9)} ${style.padEnd(7)} ${(buf.length / 1024).toFixed(0)} KB  ${name}`);
  }
}
await writeFile(path.resolve("src/fonts/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
