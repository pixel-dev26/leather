// Builds the static site into ./out for the site root (the version list + every homepage version),
// then checks that every page link and asset in it resolves to a file in ./out.
// Usage: npm run export            → site root: /morucha/, /fittingbelt/, /hologramme/
//        npm run export -- /other  → under another folder
// Upload the *contents* of ./out to the root of the server.
// Preview it first, exactly as the host serves it: node scripts/serve-out.mjs → http://localhost:4300/
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_BASE, normaliseBase } from "./base.mjs";
import { checkOut } from "./check-out.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "out");
const base = normaliseBase(process.argv[2] ?? DEFAULT_BASE);

// 1. Static export (next.config.ts switches to output: "export" with this base path)
const nextBin = path.join(ROOT, "node_modules", "next", "dist", "bin", "next");
const build = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: ROOT,
  stdio: "inherit",
  env: { ...process.env, MORUCHA_EXPORT: "1", MORUCHA_BASE_PATH: base || "/" },
});
if (build.status !== 0) process.exit(build.status ?? 1);

// 2. Addresses from the earlier two-project review site keep working: website/vN/ → vN/, next/v1/ (Heritage) → morucha/
const redirect = (url) => `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <title>Morucha | Homepage versions</title>
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0; url=${url}">
</head>
<body>
  <p><a href="${url}">Continue to the Morucha homepage versions</a></p>
</body>
</html>
`;
// v1 became the Fitting Belt client version at /fittingbelt/, and v5 (Heritage editorial) became Morucha at /morucha/.
const legacy = {
  "website": "../", "next": "../", "next/v1": "../../morucha/",
  "v1": "../fittingbelt/", "website/v1": "../../fittingbelt/",
  "v5": "../morucha/", "website/v5": "../../morucha/",
};
for (const v of ["v2", "v3"]) if (fs.existsSync(path.join(OUT, v, "index.html"))) legacy[`website/${v}`] = `../../${v}/`;
for (const [from, to] of Object.entries(legacy)) {
  fs.mkdirSync(path.join(OUT, from), { recursive: true });
  fs.writeFileSync(path.join(OUT, from, "index.html"), redirect(to));
}

// 3. Every link and asset must resolve
const { checked, problems } = checkOut(OUT, base);
console.log(`\n✓ Exported ./out for ${base || ""}/`);
console.log(`${problems.length ? "✗" : "✓"} Checked ${checked} links and assets: ${problems.length} broken`);
problems.slice(0, 50).forEach((p) => console.log(`  ✗ ${p}`));
process.exit(problems.length ? 1 : 0);
