// The folder the static export is served from: the site root by default, so the sites are at
// /morucha/, /fittingbelt/ and /hologramme/ with no folder in front.
export const DEFAULT_BASE = '';

// Any folder, normalised to "/a/b" ("" for a site root).
// Git Bash on Windows rewrites a path argument for node: "/l" can arrive as "L:/" and "/l/x" as
// "C:/Program Files/Git/l/x"; both are turned back into the path that was typed.
export function normaliseBase(raw = DEFAULT_BASE) {
  const value = String(raw).replace(/\\/g, '/');
  const meant = /^[A-Za-z]:\/?$/.test(value) ? value[0] : value.replace(/^[A-Za-z]:\/.*?\/Git\//i, '');
  const segments = meant.split('/').filter(Boolean).map((s) => s.toLowerCase());
  return segments.length ? `/${segments.join('/')}` : '';
}
