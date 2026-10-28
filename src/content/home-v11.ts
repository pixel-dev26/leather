// v11 home page copy and data (reference: harberlondon.com, see v11rule.md). Every product, price and photo comes from
// the live store data in ./products.json and /public; the copy only states what morucha.co.uk says itself (free UK
// delivery, same-day dispatch before 3.30pm, 30-day returns, gift boxing, RFID blocking). [TBC] marks anything that
// still needs confirming by Morucha.
// Server-only on purpose: page.tsx passes client components just the slim card records they need.

import { formatPrice, products, type Product } from "./products";
import { colourways, hex, twoTone } from "./shop";

const b = (file: string, size: 960 | 1600 = 960) => `/images/banners/w${size}/${file}.webp`;

export const logo = { dark: "/brand/morucha-logo.webp", light: "/brand/morucha-logo-white.webp" };

/* ------------------------------------------------------------------ products */

export type Leather = "hunter" | "nappa" | "soft";
export type Style = "bifold" | "trifold" | "passcase" | "billfold" | "slim" | "card holder" | "biker" | "clutch" | "purse";

export type Card = {
  handle: string;
  name: string;
  detail: string;
  price: string;
  href: string;
  image: { src: string; alt: string };
  swatches: { name: string; fill: string }[];
  isNew: boolean;
  who: "him" | "her";
  style: Style;
  leather: Leather;
};

const newest = products.map((p) => p.createdAt.slice(0, 4)).sort().pop() ?? "2026";

const leatherOf = (t: string): Leather => (/hunter|distressed|antique/i.test(t) ? "hunter" : /nappa/i.test(t) ? "nappa" : "soft");
const styleOf = (t: string, women: boolean): Style => {
  if (women) return /clutch/i.test(t) ? "clutch" : "purse";
  if (/biker/i.test(t)) return "biker";
  if (/card holder wallet|business card/i.test(t)) return "card holder";
  if (/trifold/i.test(t)) return "trifold";
  if (/tap|minimalist|slim/i.test(t)) return "slim";
  if (/passcase/i.test(t)) return "passcase";
  if (/billfold/i.test(t)) return "billfold";
  return "bifold";
};
const styleName: Record<Style, string> = {
  bifold: "Bifold Wallet", trifold: "Trifold Wallet", passcase: "Passcase Wallet", billfold: "Billfold Wallet",
  slim: "Slim Wallet", "card holder": "Card Holder", biker: "Biker Wallet", clutch: "Clutch Wallet", purse: "Purse",
};
const leatherName: Record<Leather, string> = { hunter: "Hunter Leather", nappa: "Nappa Leather", soft: "Leather" };

// Colour words as the store titles use them, longest first so "Dark Brown" wins over "Brown"
const colourWords: [RegExp, string, string][] = [
  [/black[\s/]*orange/i, "Black / Orange", twoTone(hex.black, "#d9622b")],
  [/black[\s/]*tan/i, "Black / Tan", twoTone(hex.black, hex.tan)],
  [/brown[\s/]*tan/i, "Brown / Tan", twoTone(hex.brown, hex.tan)],
  [/red[\s/]*black/i, "Red / Black", twoTone(hex.red, hex.black)],
  [/black[\s/]*brown/i, "Black / Brown", twoTone(hex.black, hex.brown)],
  [/dark brown/i, "Dark Brown", hex.brown],
  [/burgundy/i, "Burgundy", hex.burgundy],
  [/antique/i, "Antique", hex.hunter],
  [/brown/i, "Brown", hex.hunter],
  [/black/i, "Black", hex.black],
  [/\btan\b/i, "Tan", hex.tan],
  [/grey/i, "Grey", hex.grey],
  [/blue/i, "Dark Blue", hex.navy],
];

const colourwaysByHandle = new Map<string, { name: string; swatch: string }[]>(
  Object.values(colourways).map((list) => [list[0].images[0].split("/")[3], list]),
);

function card(p: Product): Card {
  const t = p.title.replace(/\s+/g, " ").trim();
  const women = p.collections.includes("women");
  const style = styleOf(t, women);
  const leather = leatherOf(t);
  const code = /\bM-?\s?(\d{2,4})\b/.exec(t)?.[1];
  const colours = p.options.find((o) => /colou?r/i.test(o.name))?.values;
  const listed = colourwaysByHandle.get(p.handle);
  const word = colourWords.find(([re]) => re.test(t));
  const swatches = listed
    ? listed.map((c) => ({ name: c.name, fill: c.swatch }))
    : word ? [{ name: word[1], fill: word[2] }] : [];
  const lead = leather === "soft" ? (women ? "" : "Leather ") : `${leatherName[leather]} `;
  return {
    handle: p.handle,
    name: `${women ? "" : lead}${styleName[style]}${code ? ` M${code}` : ""}`.trim(),
    detail: colours && colours.length > 1 ? `${colours.length} colours · RFID-blocking` : `${word?.[1] ?? "Genuine leather"} · RFID-blocking`,
    price: formatPrice(p.price),
    href: p.url,
    image: { src: p.images[0].src, alt: t },
    swatches,
    isNew: p.createdAt.startsWith(newest),
    who: women ? "her" : "him",
    style,
    leather,
  };
}

const live = products.filter((p) => p.available && p.images.length);
export const cards = live.map(card);
const byHandle = new Map(cards.map((c) => [c.handle, c]));
const get = (handle: string) => {
  const c = byHandle.get(handle);
  if (!c) throw new Error(`Product not available in products.json: ${handle}`);
  return c;
};


/* ------------------------------------------------------------------ header */

export const promises = [
  { icon: "van", label: "Free UK delivery", note: "On every order, however small." },
  { icon: "clock", label: "Same-day dispatch", note: "Order before 3.30pm and it leaves today." },
  { icon: "return", label: "30-day returns", note: "Not right? Send it back within 30 days." },
  { icon: "gift", label: "Gift boxed", note: "Every wallet ships in a gift box." },
] as const;

export const announcement = "Free UK delivery · Same-day dispatch before 3.30pm · 30-day returns · Gift boxed";

export type MenuColumn = { title: string; links: { label: string; href: string }[] };
export type NavItem = { label: string; href: string; columns?: MenuColumn[]; feature?: { title: string; href: string; image: { src: string; alt: string } } };

const count = (test: (c: Card) => boolean) => cards.filter(test).length;
const styleLink = (label: string) => ({ label, href: "#bestsellers" });

/** Shop links (left of the logo) and help links (right of the logo), v11rule.md §6 header. */
export const navLeft: NavItem[] = [
  {
    label: "Men",
    href: "#bestsellers",
    columns: [
      { title: "By style", links: ["Bifold wallets", "Trifold wallets", "Passcase wallets", "Slim & tap-and-go", "Biker wallets"].map(styleLink) },
      { title: "By leather", links: [{ label: "Soft leather", href: "#bestsellers" }, { label: "Nappa leather", href: "#bestsellers" }, { label: "Hunter leather", href: "#hunter" }] },
      { title: "Shop", links: [{ label: "Bestsellers", href: "#bestsellers" }, { label: "New for 2026", href: "#new" }, { label: "Gifts for him", href: "#gifts" }, { label: "Wallet finder", href: "#finder" }] },
    ],
    feature: { title: "The 2026 range", href: "#new", image: { src: b("men-wallet"), alt: "Hand holding a slim black leather wallet with an orange edge" } },
  },
  {
    label: "Women",
    href: "#collections",
    columns: [
      { title: "By style", links: [{ label: "Clutch wallets", href: "#collections" }, { label: "Long purses", href: "#collections" }, { label: "Zip purses", href: "#collections" }] },
      { title: "Shop", links: [{ label: `All purses (${count((c) => c.who === "her")})`, href: "#collections" }, { label: "Gifts for her", href: "#gifts" }, { label: "Wallet finder", href: "#finder" }] },
    ],
    feature: { title: "Clutch wallets", href: "#collections", image: { src: b("women-wallet"), alt: "Women’s leather clutch wallet" } },
  },
  { label: "Card holders", href: "#collections" },
  { label: "Hunter leather", href: "#hunter" },
  { label: "New in", href: "#new" },
];
export const navRight: NavItem[] = [
  { label: "Gifts", href: "#gifts" },
  { label: "Our story", href: "#about" },
];

/* ------------------------------------------------------------------ sections */

export const heroH1 = "Leather wallets, purses and card holders";
export const hero = [
  { title: "Wallets for him", text: "Soft, nappa and hunter leather.", cta: "Discover", href: "#bestsellers", image: { src: b("men-wallet", 1600), alt: "Hand holding a slim black and orange leather wallet" } },
  { title: "Purses she’ll keep", text: "Clutch wallets with room for every card.", cta: "Shop now", href: "#collections", image: { src: b("women-wallet", 1600), alt: "Women’s leather clutch wallet" } },
  { title: "Card holders", text: "Slim enough for a front pocket.", cta: "Discover", href: "#collections", image: { src: b("card-holder", 1600), alt: "Leather card holder" } },
];

const best = [
  "mens-rfid-hunter-leather-billfold-wallet",
  "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown",
  "minimalist-genuine-leather-rfid-wallet-black-orange",
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90",
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028",
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95",
  "2-in-1-compact-business-card-holder-wallet",
  "mens-rfid-nappa-leather-billfold-wallet",
];
const newCards = cards.filter((c) => c.isNew);

export const bestsellers = {
  eyebrow: "Most loved",
  title: "Our bestsellers",
  sets: [
    { label: "Bestsellers", items: best.map(get) },
    { label: "For her", items: cards.filter((c) => c.who === "her") },
    { label: "Card holders & slim", items: cards.filter((c) => c.style === "card holder" || c.style === "slim") },
  ],
};

const plural = (n: number) => `${n} ${n === 1 ? "style" : "styles"}`;
export const collections = {
  eyebrow: "Shop by collection",
  title: "Find your kind of wallet",
  items: [
    { icon: "wallet", title: "Men’s wallets", note: plural(count((c) => c.who === "him")), href: "#bestsellers", image: get("men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown").image },
    { icon: "clutch", title: "Purses", note: plural(count((c) => c.who === "her")), href: "#bestsellers", image: get("morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90").image },
    { icon: "cards", title: "Card holders", note: "Slim carry", href: "#bestsellers", image: get("2-in-1-compact-business-card-holder-wallet").image },
    { icon: "hide", title: "Hunter leather", note: plural(count((c) => c.leather === "hunter" && c.who === "him")), href: "#hunter", image: get("mens-rfid-hunter-leather-billfold-wallet").image },
    { icon: "tap", title: "Slim & tap", note: "RFID-blocking", href: "#bestsellers", image: get("minimalist-genuine-leather-rfid-wallet-black-orange").image },
    { icon: "gift", title: "Gifts", note: "Boxed as standard", href: "#gifts", image: get("morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy").image },
  ],
  banners: [
    { eyebrow: "Hunter leather", title: "Distressed, oiled, built to age", cta: "Discover", href: "#hunter", image: { src: b("hunter-leather", 1600), alt: "Distressed hunter leather wallets" } },
    { eyebrow: "Women", title: "Clutch wallets", cta: "Shop", href: "#bestsellers", image: { src: b("women-wallet", 1600), alt: "Women’s leather clutch wallet" } },
  ],
} as const;

export const craft = {
  eyebrow: "Our craft",
  title: "Made to be carried",
  statement: "Real leather, cut and stitched to be carried every day, with RFID shielding built into every wallet.",
  pillars: [
    { title: "Genuine leather", text: "Soft, nappa and hunter hides." },
    { title: "RFID-blocking", text: "Shields contactless cards." },
    { title: "Gift boxed", text: "Every order, ready to give." },
  ],
};

export const newArrivals = {
  eyebrow: "Just landed",
  title: `New for ${newest}`,
  text: "Soft-leather bifolds with coin pockets, a slim tap-and-go, and a new hunter leather wallet.",
  countNote: "new styles in the range this year",
  image: { src: b("new-leather-1", 960), alt: "Morucha leather wallets from the new range" },
  imageCaption: `The ${newest} range`,
  items: newCards,
};

export const gifting = {
  eyebrow: "Gifting",
  title: "Gift boxed, every time",
  text: "Every Morucha wallet and purse leaves us in a gift box, so it is ready to hand over.",
  list: ["Gift box with every order", "Same-day dispatch before 3.30pm", "Free UK delivery"],
  cta: "Shop gifts",
  image: { src: b("gifts-under", 1600), alt: "Leather wallet in a Morucha gift box" },
};

export const finder = {
  eyebrow: "The wallet finder",
  title: "Three questions, the right wallet",
  text: "Who it’s for, the style, then the leather. The matching wallets appear as you go.",
};

const hunterCards = cards.filter((c) => c.leather === "hunter" && c.who === "him");
export const hunter = {
  eyebrow: "Hunter leather",
  title: "Leather that wears in, not out",
  text: `Distressed and oiled, so it looks better for being carried. ${hunterCards.length} styles, all RFID-blocking.`,
  image: { src: b("hunter-leather", 1600), alt: "Distressed hunter leather wallets on a wooden table" },
  items: [
    get("mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown"),
    get("mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown"),
    get("mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown"),
  ],
  cta: "Shop hunter leather",
};

export const film = {
  src: "/video/hero-portrait.mp4",
  poster: b("banner-image-1", 960),
  eyebrow: "On film",
  title: "Leather made for every day",
  facts: [
    { title: "Real leather", text: "Soft, nappa and hunter leather." },
    { title: "RFID-blocking", text: "Shielding built in to protect contactless cards." },
    { title: "Boxed and sent today", text: "Order before 3.30pm for same-day dispatch." },
  ],
  cta: "Shop the range",
};

export const feed = {
  handle: "@morucha",
  title: "Carried every day",
  photos: [
    { src: b("insta-1"), caption: "Passcase wallet", href: "#bestsellers" },
    { src: b("insta-2"), caption: "Bifold", href: "#bestsellers" },
    { src: b("insta-3"), caption: "Hunter leather", href: "#hunter" },
    { src: b("insta-4"), caption: "Slim wallet", href: "#bestsellers" },
    { src: b("insta-5"), caption: "Card holder", href: "#collections" },
    { src: b("insta-6"), caption: "Gifts", href: "#gifts" },
    { src: b("new-leather-3"), caption: "New in", href: "#new" },
  ].map((p, i) => ({ ...p, alt: `Morucha wallet in use, photo ${i + 1}` })),
};

// Answers only restate morucha.co.uk's own promises (free UK delivery, same-day dispatch, 30-day returns, gift box).
export const faq = {
  eyebrow: "Good to know",
  title: "Questions, answered",
  items: [
    { q: "How fast will my order arrive?", a: "UK delivery is free, and orders placed before 3.30pm leave the same day." },
    { q: "Can I return a wallet?", a: "Yes. If it isn’t right, you can send it back within 30 days." },
    { q: "What does RFID-blocking do?", a: "A shielding layer inside the wallet helps stop contactless cards being read through it." },
    { q: "Does it come gift boxed?", a: "Every Morucha wallet and purse is sent in a gift box, ready to give." },
  ],
};

export const newsletter = {
  eyebrow: "From the Morucha workshop",
  title: "New leathers, first",
  text: "Early access to new ranges and subscriber-only offers.",
};

export const about = {
  eyebrow: "About Morucha",
  title: "Wallets made to be carried, every single day.",
  em: "carried",
  paragraphs: [
    "Morucha makes wallets, purses and card holders in soft, nappa and hunter leather, with RFID shielding built into each one.",
    "Every order ships free across the UK in a gift box, and orders before 3.30pm leave the same day.",
  ],
  links: [
    { label: "Shop men", href: "#bestsellers" },
    { label: "Shop women", href: "#collections" },
    { label: "Wallet finder", href: "#finder" },
  ],
};

export const footer = {
  columns: [
    { title: "Shop", links: ["Men", "Women", "Card holders", "Hunter leather", "Gifts"] },
    { title: "Help", links: ["Delivery", "Returns", "Contact us", "FAQs"] },
    { title: "About", links: ["Our story", "Our leathers", "Care guide"] },
    { title: "Legal", links: ["Terms & conditions", "Privacy policy", "Cookie policy"] },
  ],
  // the contact page, with the company name's spelling corrected ("Limitet" on the live site)
  legal: "Morucha™ is a trademark and trading name of RAS Trading Europe Limited. Registered in England and Wales, company no. 08626748.",
  payments: ["Visa", "Mastercard", "PayPal"],
};
