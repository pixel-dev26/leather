// v4-only copy (v4rule.md §10). Everything else is shared with v1 through ./home.ts so every
// version shows the same sections and the same [TBC] markers.
// Headings in v4 never use *italic accents*; use plain() to strip them from shared v1 copy.

import { spotlight } from "./home";
import { heroPoster } from "./images-v4";
import { withBase } from "@/lib/image-loader";

export const plain = (s: string) => s.replace(/\*/g, "");

// v4 ships worldwide (v1/v2 still say UK).
export const announcementV4 = "Free worldwide delivery  ·  Order before 3:30pm for same-day dispatch";

export const menu = {
  primary: [
    { label: "Leather", href: "#leathers", children: [
      { label: "Hides by the square foot", href: "#leathers" },
      { label: "Swatch box", href: "#trade" },
    ] },
    { label: "Leather goods", href: "#bestsellers", children: [
      { label: "Bestsellers", href: "#bestsellers" },
      { label: "Collections", href: "#collections" },
      { label: "Featured piece", href: "#spotlight" },
    ] },
    { label: "The process", href: "#process" },
    { label: "About Morucha", href: "#story", children: [
      { label: "Our story", href: "#story" },
      { label: "Sustainability", href: "#sustainability" },
      { label: "Made with Morucha", href: "#makers" },
    ] },
  ],
  secondary: [
    { label: "Trade", href: "#trade" },
    { label: "Journal", href: "#" },
  ],
  cta: { label: "Let's talk", href: "mailto:sales@morucha.co.uk" },
};

export const heroV4 = {
  lines: ["Leather that", "ages with you"],
  sub: "British leather · Since [YEAR TBC]",
  // Hero video (public/video/hero-portrait.mp4, 2160×3840 portrait, supplied 15 Oct 2026; replaces the first
  // landscape clip). It plays through the halftone burst; object-fit: cover crops it to the banner.
  video: { src: withBase("/video/hero-portrait.mp4"), poster: heroPoster },
};

export const statementV4 = {
  label: "Our Promise",
  link: { label: "More about us", href: "#story" },
};

export const leathersV4 = {
  title: "Our Leathers",
  intro: [
    "By the hide, half-hide or swatch, with no minimum order. Every leather is graded, tanned and finished in our own tannery.",
    "Choose from the leathers below, or order a swatch box to feel them first:",
  ],
};

export const offer = {
  label: "Discover",
  headline: "Crafting excellent",
  words: ["Wallets", "Bags", "Leather", "Gifts"],
  film: { label: "Watch our film", href: "#hero" },
  intro: "From our tannery to your workbench, and into the wallets and bags we make ourselves.",
  cards: [
    { icon: "wallet", title: "Leather goods", text: "Wallets, purses and cardholders made from our own leather, cut and stitched to last a lifetime.", href: "#bestsellers" },
    { icon: "bag", title: "Travel & bags", text: "Passport wallets and travel pieces built for the road, softening and darkening with every trip.", href: "#collections" },
    { icon: "hide", title: "Leather by the hide", text: "Full hides, half-hides and swatches for makers, workshops and trade customers across the UK.", href: "#leathers" },
  ],
};

// Featured piece: the same Morucha bifold as v1 (real product, its own photos per colour), with v4's worldwide delivery.
export const spotlightV4 = {
  ...spotlight,
  note: "Free worldwide delivery · Order before 3:30pm for same-day dispatch",
  details: spotlight.details.map((d) =>
    d.title === "Delivery & returns"
      ? { ...d, text: "Free worldwide delivery. Orders placed before 3:30pm are dispatched the same working day. [Returns policy TBC.]" }
      : d,
  ),
};

export const sustainabilityV4 = {
  statement: "Leather is a by-product of the food industry. We treat every hide as a gift, and tan it to last a lifetime.",
  cta: { label: "Read our commitments", href: "#" },
};

export const tradeV4 = {
  overline: "Free swatch box",
};

export const footerV4 = {
  bar: [
    { label: "About Morucha", href: "#story" },
    { label: "Leather goods", href: "#bestsellers" },
    { label: "Trade", href: "#trade" },
    { label: "Let's talk", href: "mailto:sales@morucha.co.uk" },
  ],
  company: "Morucha Ltd · Company no. [TBC]",
  address: "[Tannery address TBC], United Kingdom",
  phone: "[Phone TBC]",
};
