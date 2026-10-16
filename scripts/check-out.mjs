// Checks that every local link and asset in the static export (npm run export) resolves to a file in ./out:
//   - href / src / srcset / poster / imagesrcset attributes in every HTML page,
//   - url(...) in every stylesheet,
//   - root paths to /images/… written into the pages' own scripts (e.g. v5/main.js), including the
//     w320/w640/w960 WebP copies those scripts ask for.
// Usage: node scripts/check-out.mjs [base]   (same base the export was built for, default /leather)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DEFAULT_BASE, normaliseBase } from './base.mjs';

const SKIP = /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i; // http:, https:, mailto:, data:, protocol-relative, in-page anchors
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

/** URL path ("/leather/website/v1/") of a file in outDir. */
function urlPathOf(outDir, base, file) {
  const rel = path.relative(outDir, file).split(path.sep).join('/');
  return `${base}/${rel.replace(/(^|\/)index\.html$/, '$1')}`;
}

/** The file a URL path is served from, or null when nothing is there. */
function fileFor(outDir, base, urlPath) {
  if (urlPath !== base && !urlPath.startsWith(`${base}/`)) return null;
  const local = path.join(outDir, decodeURIComponent(urlPath.slice(base.length)));
  const candidates = urlPath.endsWith('/') ? [path.join(local, 'index.html')] : [local, path.join(local, 'index.html'), `${local}.html`];
  return candidates.find((c) => fs.existsSync(c) && fs.statSync(c).isFile()) ?? null;
}

export function checkOut(outDir, base) {
  const files = walk(outDir);
  const problems = [];
  let checked = 0;
  const check = (from, ref, pageUrl) => {
    // also skips "%23id": an encoded #id, e.g. a filter reference inside an inline SVG data URI in CSS
    if (!ref || SKIP.test(ref) || ref.startsWith('%23')) return;
    const resolved = new URL(ref, `http://site${pageUrl}`).pathname;
    checked++;
    if (!fileFor(outDir, base, resolved)) problems.push(`${path.relative(outDir, from)} → ${ref}`);
  };

  for (const file of files) {
    const ext = path.extname(file);
    if (ext === '.html') {
      const html = fs.readFileSync(file, 'utf8');
      const pageUrl = urlPathOf(outDir, base, file);
      for (const [, attr, value] of html.matchAll(/\s(href|src|poster|srcset|imagesrcset)="([^"]*)"/gi)) {
        const v = decode(value);
        if (/srcset$/i.test(attr)) v.split(',').forEach((part) => check(file, part.trim().split(/\s+/)[0], pageUrl));
        else check(file, v, pageUrl);
      }
    } else if (ext === '.css') {
      const css = fs.readFileSync(file, 'utf8');
      const cssUrl = urlPathOf(outDir, base, file);
      for (const [, value] of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) check(file, value, cssUrl);
    } else if (ext === '.js' && !file.includes(`${path.sep}_next${path.sep}`)) {
      // Hand-written page scripts: root paths get the export's base at runtime (see BASE in public/v5/main.js)
      const js = fs.readFileSync(file, 'utf8');
      const scriptBase = urlPathOf(outDir, base, path.dirname(path.dirname(file))).replace(/\/$/, '');
      for (const [, value] of js.matchAll(/['"`](\/images\/[^'"`$]+\.(?:jpe?g|png|webp|svg))['"`]/gi)) {
        check(file, `${scriptBase}${value}`, '/');
        const copy = value.replace(/\/([^/]+)\.(?:jpe?g|png)$/i, '/w__/$1.webp');
        if (copy !== value) for (const w of [320, 640, 960]) check(file, `${scriptBase}${copy.replace('w__', `w${w}`)}`, '/');
      }
    }
  }
  return { checked, problems };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'out');
  const base = normaliseBase(process.argv[2] ?? DEFAULT_BASE);
  const { checked, problems } = checkOut(outDir, base);
  console.log(`Checked ${checked} links and assets in ./out (base "${base || '/'}"): ${problems.length} broken`);
  problems.slice(0, 50).forEach((p) => console.log(`  ✗ ${p}`));
  process.exit(problems.length ? 1 : 0);
}
