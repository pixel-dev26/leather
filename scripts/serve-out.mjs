// Serves ./out the way a plain web host will: at http://localhost:4300<base>/ (default: the site root).
// Folders without a trailing slash redirect to it, folders serve their index.html, misses get out/404.html.
// Usage: node scripts/serve-out.mjs [base]   (PORT=… to change the port)
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_BASE, normaliseBase } from './base.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'out');
const base = normaliseBase(process.argv[2] ?? DEFAULT_BASE);
const port = Number(process.env.PORT ?? 4300);
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.gif': 'image/gif',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml',
};

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  if (base && (url.pathname === '/' || url.pathname === base)) return res.writeHead(302, { location: `${base}/` }).end();
  if (url.pathname !== `${base}/` && !url.pathname.startsWith(`${base}/`)) return res.writeHead(404).end(`Not under ${base}/`);
  let file = normalize(join(root, decodeURIComponent(url.pathname.slice(base.length))));
  if (file !== root && !file.startsWith(root + sep)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) {
      if (!url.pathname.endsWith('/')) return res.writeHead(301, { location: `${url.pathname}/${url.search}` }).end();
      file = join(file, 'index.html');
    }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file).toLowerCase()] ?? 'application/octet-stream' }).end(body);
  } catch {
    const page = await readFile(join(root, '404.html')).catch(() => 'Not found');
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end(page);
  }
}).listen(port, () => console.log(`Serving ./out at http://localhost:${port}${base}/`));
