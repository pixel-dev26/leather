// v2 home page copy (see v2rule.md). Reuses v1 words where they are the same and adds the v2-only bits:
// stitch words, product tabs, colour swatches, featured product, footer reassurance strip.
// Product photos are Morucha's own (./shop.ts, saved locally); every other photo comes from ./images-v2.ts
// (temporary reference imagery, must be replaced).
// Anything in [brackets] still needs confirming by Morucha before launch.

import { ocImg } from "./images-v2";
import { colourways, hex, shop } from "./shop";
import { bestsellers, collections, leathers, makers, process, story, sustainability, trade, type ImageSlot } from "./home";

export const announcement = "Free UK delivery over £75 · Order before 3:30pm for same-day dispatch";

export const nav = {
  left: [
    { label: "Shop", href: "#collections" },
    { label: "Leather", href: "#leathers" },
    { label: "Trade", href: "#trade" },
  ],
  right: [
    { label: "UK / £", href: "#" },
    { label: "Account", href: "#" },
  ],
};

export const hero = {
  slides: [
    { word: "HIDE", caption: "British leather, tanned with care", image: { src: ocImg.coverWide, alt: "Leather wallets and card holders laid out on a dark surface" } },
    { word: "MADE", caption: "Wallets, purses and bags from our own hides", image: { src: ocImg.laptopDesk, alt: "A leather wallet resting on a laptop" } },
    { word: "2026", caption: "The new season collection", image: { src: ocImg.blackCollection, alt: "The black leather collection side by side" } },
  ] as { word: string; caption: string; image: ImageSlot }[],
};

export const statement = {
  text: "We tan stubbornly slowly, source our hides close to home and leave out everything that isn't needed.",
};

const leatherImages: ImageSlot[] = [
  { src: ocImg.greenBlackPair, alt: "Green and black leather card holders" },
  { src: ocImg.darkWallets, alt: "Full-grain leather wallets on a dark table" },
  { src: ocImg.handsGreen, alt: "Hands opening a green leather wallet" },
  { src: ocImg.blackWallet, alt: "A smooth black calf leather wallet" },
];

export const leathersV2 = {
  title: "Our leathers",
  items: leathers.items.slice(0, 4).map((l, i) => ({ ...l, image: leatherImages[i], letter: ["V", "F", "P", "C"][i], href: "#" })),
};

// Each bestseller's colours (./home.ts order). Product photos are Morucha's own, from ./shop.ts.
const single = (name: string, swatch: string) => [{ name, swatch }];
const cardColours: { name: string; swatch: string }[][] = [
  colourways.bifoldCoin,
  colourways.longClutch,
  colourways.verticalCoin,
  single("Black", hex.black),
  colourways.flapClutch,
  single("Tan", hex.tan),
  single("Dark brown", hex.hunter),
  single("Burgundy", hex.burgundy),
];

export const products = bestsellers.items.map((p, i) => ({
  ...p,
  wasPrice: undefined as string | undefined, // nothing is on sale in the store right now
  swatches: cardColours[i].map(({ name, swatch }) => ({ name, swatch })),
}));
export type ProductV2 = (typeof products)[number];

export const productTabs = [
  { label: "Bestsellers", items: products.slice(0, 4) },
  { label: "New in", items: [products[2], products[5], products[4], products[3]] },
  { label: "Gifts", items: [products[7], products[1], products[5], products[0]] },
];

export const storyV2 = {
  title: "Our story",
  headline: "Bringing modern thinking to an *old* craft.",
  text: story.paragraphs[1],
  cta: { label: "Read our story", href: "#" },
  // Placeholder figures: confirm every number with Morucha before launch.
  stats: [
    { value: "[XX]", label: "years tanning British hides" },
    { value: "[XX,000]", label: "wallets, purses and bags sent worldwide" },
    { value: "[XXX]", label: "makers and workshops supplied" },
    { value: "[XX]", label: "leathers and colours in stock" },
  ],
  image: { src: ocImg.flatlay, alt: "Leather goods in many colours laid out flat" } as ImageSlot,
};

const processImages: ImageSlot[] = [
  { src: ocImg.craftsmanPortrait, alt: "Craftsman checking a hide" },
  { src: ocImg.craftsman, alt: "Craftsman working at the machine" },
  { src: ocImg.camoWallet, alt: "Tanned leather panels" },
  { src: ocImg.noteGreenDetail, alt: "Detail of dried and staked leather" },
  { src: ocImg.orangeCardDark, alt: "Hand-finished leather edges" },
];

export const processV2 = {
  title: "The process",
  steps: process.steps.map((s, i) => ({ ...s, image: processImages[i] })),
};

export const collectionSlider = {
  title: "Shop by collection",
  items: [
    { name: "Wallets", href: collections.items[0].href, image: { src: ocImg.manCafe, alt: "Man holding a leather wallet at a café" } },
    { name: "Purses", href: collections.items[1].href, image: { src: ocImg.walletPhoneTable, alt: "Leather purse on a table" } },
    { name: "Cardholders", href: collections.items[2].href, image: { src: ocImg.greenCardPortrait, alt: "Green leather card holder" } },
    { name: "Travel bags", href: collections.items[3].href, image: { src: ocImg.toteBag, alt: "Black leather tote bag" } },
  ],
};

const sustainabilityImages: ImageSlot[] = [
  { src: ocImg.craftsmanPortrait, alt: "Craftsman inspecting a hide" },
  { src: ocImg.handsGreen, alt: "Hands holding a finished green wallet" },
  { src: ocImg.darkWallets, alt: "Well-used leather wallets" },
];

export const sustainabilityV2 = {
  title: "Sustainability",
  headline: "Leather is a by-product. We treat it as a *gift*.",
  points: sustainability.points.map((p, i) => ({
    ...p,
    stat: ["[100%]", "[−XX%]", "[Lifetime]"][i],
    statLabel: ["of hides traced to the farm [TBC]", "water used per hide vs. industry average [TBC]", "repairs on everything we make [TBC]"][i],
    image: sustainabilityImages[i],
  })),
  cta: sustainability.cta,
  faqTitle: "Questions, answered",
  // Answers marked [TBC] need confirming by Morucha before launch.
  faqs: [
    { q: "Where do your hides come from?", a: "Every hide is a by-product of the UK food industry, bought from farms and abattoirs we know by name. [Sourcing regions TBC.]" },
    { q: "How is your leather tanned?", a: "[Tanning method TBC, e.g. vegetable tannins from tree bark over several weeks], with no unnecessary finishes or coatings." },
    { q: "What happens to offcuts?", a: "Larger offcuts become card holders and key fobs; the smallest pieces go to makers and schools. [Offcut programme TBC.]" },
    { q: "Can you repair my wallet or bag?", a: "Yes. Send it back to the workshop and we'll re-stitch, re-edge or replace hardware. [Repair policy and pricing TBC.]" },
    { q: "Is your packaging recyclable?", a: "[Packaging details TBC, e.g. recycled card, cotton dust bags, no plastic.]" },
  ],
};

const makerImages: ImageSlot[] = [
  { src: ocImg.craftsman, alt: "Maker stitching leather at the bench" },
  { src: ocImg.handsOutdoor, alt: "Handmade wallet held outdoors" },
  { src: ocImg.cardCoffee, alt: "Card case on a café tray" },
  { src: ocImg.walletGrass, alt: "Leather gift wallet on the grass" },
  { src: ocImg.craftsmanPortrait, alt: "Maker finishing a leather piece" },
  { src: ocImg.pocketWallet, alt: "Wallet slipped into a coat pocket" },
];

export const makersV2 = {
  title: "Made with Morucha",
  items: [...makers.items, { caption: "Workshop, [Maker TBC]", image: makerImages[5] }].map((m, i) => ({ ...m, image: makerImages[i] })),
};

export const tradeV2 = {
  title: "Trade & wholesale",
  text: "Whether you make one bag a month or stock a shop full of leather goods, we'll help you find the right hide.",
  benefits: trade.benefits.map((b, i) => ({ ...b, icon: (["swatch", "hide", "tag"] as const)[i] })),
  primary: trade.primary,
  secondary: trade.secondary,
};

// Morucha's M90 flap clutch purse: every colour with its own photos. Details are from its store listing.
export const featured = {
  eyebrow: "Featured piece",
  name: shop.flapClutch.name,
  price: shop.flapClutch.priceLabel,
  wasPrice: undefined as string | undefined, // not on sale
  note: "Inclusive of VAT · Free UK delivery over £75",
  colours: colourways.flapClutch.map((c) => ({ key: c.name.toLowerCase().replace(/\s+/g, "-"), label: c.name, swatch: c.swatch, images: c.images })),
  features: [
    { icon: "compact", label: "RFID blocking" },
    { icon: "storage", label: "High capacity" },
    { icon: "leather", label: "Genuine leather" },
    { icon: "zip", label: "Zipped coin pocket" },
  ] as const,
  details: [
    {
      title: "Product details",
      body: "A multi-flap purse that keeps everything close to hand. The flap opens onto five card slots, an ID slot, a pouch pocket and a zipped section; inside are more card slots, four compartments for notes and receipts, and a zipped coin pocket.",
    },
    {
      title: "Specifications",
      body: "Genuine leather · RFID-blocking lining shields contactless cards from electronic theft · Comes in a branded Morucha gift box.",
    },
    {
      title: "Delivery & returns",
      body: "Free UK delivery over £75, dispatched same day before 3:30pm. Free returns within 30 days.",
    },
  ],
  pairs: [
    { name: shop.longClutch.name, price: shop.longClutch.priceLabel, image: { src: shop.longClutch.photo(1), alt: "Burgundy long clutch wallet" } as ImageSlot },
    { name: shop.zipPurse.name, price: shop.zipPurse.priceLabel, image: { src: shop.zipPurse.photo(1), alt: "Navy zip-around purse" } as ImageSlot },
    { name: shop.cardHolder.name, price: shop.cardHolder.priceLabel, image: { src: shop.cardHolder.photo(2), alt: "Black card holder wallet, open" } as ImageSlot },
  ],
};

export const newsletter = {
  label: "Letters from the tannery",
  title: "Be first to the new hides",
  text: "New leathers, limited runs and stories from the workshop. A few times a year, never more.",
  image: { src: ocImg.handsGreen, alt: "Hands opening a green leather wallet" } as ImageSlot,
};

export const reassurance = [
  { icon: "van", title: "Free UK delivery", text: "On orders over £75" },
  { icon: "return", title: "Returns", text: "Within 30 days" },
  { icon: "needle", title: "Lifetime repairs", text: "[Repair policy TBC]" },
  { icon: "mail", title: "Contact us", text: "sales@morucha.co.uk" },
] as const;

export const footer = {
  tagline: "Leather that ages with you",
  mission: "To tan honest leather slowly, and make things from it that are worth keeping for a lifetime.",
  columns: [
    { title: "Shop", links: ["Leather hides", "Wallets", "Purses", "Cardholders", "Travel bags"] },
    { title: "Help", links: ["Delivery", "Returns", "Leather care", "FAQs", "Contact"] },
    { title: "About", links: ["Our story", "The process", "Sustainability", "Trade account"] },
  ],
  socials: ["Instagram", "Facebook", "Pinterest"],
  legal: ["Privacy policy", "Terms of service"],
};

/** Header listens for this to bump the bag count. */
export const ADD_TO_BAG_EVENT = "morucha:add-to-bag";
