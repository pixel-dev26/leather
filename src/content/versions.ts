// Every homepage version, in the order the version list (src/app/(home)/page.tsx) shows them, numbered 01–06.
// Each card shows the number, name, summary, type, reference, swatches and a screenshot (public/images/previews/<id>.webp).
export type Version = {
  id: string; // the route: /fittingbelt/, /v2/, /v3/, /morucha/, /hologramme/, /v11/ or /v12/
  name: string;
  /** The site shown in the card's browser frame; Morucha's own versions leave it out (morucha.co.uk). */
  domain?: string;
  reference: string;
  secondary?: string;
  summary: string;
  type: string;
  swatches: string[];
};

export const versions: Version[] = [
  {
    id: "morucha", // first called Heritage editorial at /v5/ (and /v1/ in morucha-next); listed first, as before
    name: "Morucha",
    reference: "soletrader.co.uk",
    secondary: "nappadori.co.uk",
    summary: "Ivory paper with oxblood and the logo red, a full-screen slideshow with split-text animation, a vertical leather guide carousel and a stitched, leather-textured footer.",
    type: "Jost · Bodoni Moda",
    swatches: ["#F6F1E9", "#1B1714", "#C1000A", "#5B1A1E", "#A0673A"],
  },
  {
    id: "fittingbelt", // client version for The Fitting Belt Company (was /v1/)
    name: "The Fitting Belt Company",
    domain: "fittingbelt.com.au",
    reference: "spica-inc.jp",
    secondary: "fittingbelt.com.au (client products and logo), Pexels (photos and film)",
    summary: "The Fitting Belt Company's own belts, bags and wallets, with its fb logo, in the quiet editorial layout: warm paper, EB Garamond, gold labels and maroon accents.",
    type: "EB Garamond · Montserrat",
    swatches: ["#F7F4F0", "#2A1718", "#A8020C", "#A88B58", "#5C0A10"],
  },
  {
    id: "v2",
    name: "Modern Nordic craft",
    reference: "craftory.com",
    secondary: "septiemelargeur.fr",
    summary: "One geometric sans on warm greige, flat colour-blocked bands, edge-to-edge imagery with 10px gutters and oversized stitched letterforms.",
    type: "Jost · Instrument Serif",
    swatches: ["#E4DFD9", "#363636", "#5A87B1", "#888A6E", "#3B1E2B"],
  },
  {
    id: "v3",
    name: "Clean modern retail",
    reference: "dailyobjects.com",
    summary: "Pure white pages, bold condensed uppercase headings, products on pale grey wells, full-bleed campaign banners and one green action colour.",
    type: "Roboto Condensed · Inter",
    swatches: ["#FFFFFF", "#000000", "#F7F7F7", "#20A87E", "#E66B55"],
  },
  {
    id: "hologramme", // client version for Hologramme Paris (was /v10/)
    name: "Hologramme Paris",
    domain: "hologrammeparis.com",
    reference: "adamis.in",
    secondary: "hologrammeparis.com (client products, photos and logo)",
    summary: "The Sage & Saddle design for Hologramme Paris: pale sage pages, one saddle-brown action colour, Playfair over Funnel Sans, and the client's own hats, leather goods, banners and logo.",
    type: "Playfair Display · Funnel Sans",
    swatches: ["#FAFFF4", "#F1F5EC", "#C9D8BE", "#754025", "#404040"],
  },
  {
    id: "v11",
    name: "Bone & Brass",
    reference: "harberlondon.com",
    summary: "Bone pages broken up by near-black bands, a Baskerville serif over Figtree, a three-panel hero, white product cards, a collection bento, a wallet finder and one brass accent.",
    type: "Libre Baskerville · Figtree",
    swatches: ["#F7F4EF", "#EDE8E0", "#FFFFFF", "#1C1B19", "#AE9362"],
  },
  {
    id: "v12",
    name: "Numbered",
    reference: "ghurka.com",
    summary: "A white, photo-led page where every wallet is named by its model number: 720px photo pairs, product rails that run off the edge, a soft serif over a plain grotesk, and no capitals anywhere.",
    type: "Newsreader · Hanken Grotesk",
    swatches: ["#FFFFFF", "#F4F2F1", "#140D0A", "#776E6E", "#20202C"],
  },
];
