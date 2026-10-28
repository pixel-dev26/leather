import type { NextConfig } from "next";

// Static review export (npm run export → ./out), hosted at the site root (/morucha/, /fittingbelt/, /hologramme/).
// Only active when MORUCHA_EXPORT=1 (set by scripts/export.mjs), so `next dev` and `next build` behave as before.
const isExport = process.env.MORUCHA_EXPORT === "1";
// Normalised to "/a/b" (one or more folders; "/" means the site root). Git Bash on Windows can rewrite the argument
// into a drive path: "/l" becomes "L:/" and "/l/website" becomes "C:/Program Files/Git/l/website"; both are undone here.
const rawBase = (process.env.MORUCHA_BASE_PATH ?? "/").replace(/\\/g, "/");
const meantBase = /^[A-Za-z]:\/?$/.test(rawBase) ? rawBase[0] : rawBase.replace(/^[A-Za-z]:\/.*?\/Git\//i, "");
const baseSegments = meantBase.split("/").filter(Boolean).map((s) => s.toLowerCase());
const basePath = isExport && baseSegments.length ? `/${baseSegments.join("/")}` : "";

const nextConfig: NextConfig = {
  // `next dev` (and a plain `next build`) work in .next-app. A static export always builds in .next (Next forces that
  // when distDir names the export folder), so an export can never overwrite a running dev server's files.
  // On Vercel (VERCEL=1) the build stays in .next, the only folder Vercel's Next.js builder reads.
  distDir: process.env.VERCEL ? ".next" : ".next-app",
  ...(isExport && {
    output: "export",
    basePath,
    trailingSlash: true, // /morucha/ → /morucha/index.html on a plain web host
    distDir: "out", // the static site lands here; its build files go to .next
  }),
  // The old /v5/ address (now /morucha/) still works under next dev; the static export writes a redirect page instead
  ...(!isExport && {
    async redirects() {
      return [{ source: "/v5/:path*", destination: "/morucha/:path*", permanent: false }];
    },
  }),
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: {
    // Temporary: reference photos are hot-linked from spica-inc.jp (v1), olivercompanylondon.com and
    // dailyobjects.com (v2), and Pexels stock (v3). See src/content/images.ts, images-v2.ts and images-v3.ts.
    // Swap to local files in /public/images and remove this before launch.
    // The custom loader serves every image unresized (like `unoptimized`) and adds the base path to local files.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      { protocol: "https", hostname: "www.spica-inc.jp" },
      { protocol: "https", hostname: "olivercompanylondon.com" },
      { protocol: "https", hostname: "images.dailyobjects.com" },
      { protocol: "https", hostname: "images.unsplash.com" }, // /morucha/ (Unsplash License)
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "hologrammeparis.com" }, // /hologramme/: the client's own photos, see src/content/home-hologramme.ts
    ],
  },
};

export default nextConfig;
