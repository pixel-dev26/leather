// Every version's fonts, self-hosted from ./files (Latin subset, WOFF2). They were next/font/google, which crashed
// the Vercel build when Google returned a font URL without a file extension. Re-download with
// `node scripts/fetch-fonts.mjs` (it writes ./files and ./manifest.json). next/font/local needs literal options,
// so each family is spelled out here; the CSS variable names are the ones the versions already use.

import localFont from "next/font/local";

/* site root (Morucha) */
export const garamond = localFont({
  src: [
    { path: "./files/eb-garamond-400-500.woff2", weight: "400 500", style: "normal" },
    { path: "./files/eb-garamond-400-500-italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-garamond",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const montserrat = localFont({
  src: "./files/montserrat-400-600.woff2",
  weight: "400 600",
  variable: "--font-montserrat",
  display: "swap",
});

/* v2 */
export const jost = localFont({
  src: [
    { path: "./files/jost-400-700.woff2", weight: "400 700", style: "normal" },
    { path: "./files/jost-400-700-italic.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-jost",
  display: "swap",
});
export const instrumentSerif = localFont({
  src: "./files/instrument-serif-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

/* v3 */
export const robotoCondensed = localFont({
  src: "./files/roboto-condensed-700.woff2",
  weight: "700",
  variable: "--font-condensed",
  display: "swap",
});
export const inter = localFont({
  src: "./files/inter-400-500.woff2",
  weight: "400 500",
  variable: "--font-inter",
  display: "swap",
});

/* Hologramme Paris */
export const playfair = localFont({
  src: "./files/playfair-display-400-500.woff2",
  weight: "400 500",
  variable: "--font-playfair",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const funnelSans = localFont({
  src: "./files/funnel-sans-400-500.woff2",
  weight: "400 500",
  variable: "--font-funnel",
  display: "swap",
});

/* v11 */
export const baskerville = localFont({
  src: "./files/libre-baskerville-400.woff2",
  weight: "400",
  variable: "--font-baskerville",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const figtree = localFont({
  src: "./files/figtree-400-600.woff2",
  weight: "400 600",
  variable: "--font-figtree",
  display: "swap",
});

/* v12 */
export const newsreader = localFont({
  src: [
    { path: "./files/newsreader-200-800.woff2", weight: "200 800", style: "normal" },
    { path: "./files/newsreader-200-800-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});
export const hanken = localFont({
  src: "./files/hanken-grotesk-100-900.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
});
