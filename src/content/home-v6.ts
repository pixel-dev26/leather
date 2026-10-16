// v6 home page copy and data (references: chromeindustries.com, adidas.co.in). Every product, name, price and
// photo is Morucha's own, from the live store data in ./products.json (photos are the local copies in
// /public/images/products). Lifestyle photos are temporary Unsplash stock, like v4's. [TBC] marks copy that
// still needs confirming by Morucha.
// Server-only on purpose: page.tsx passes client components just the slim product records they need, so the full
// products.json (with descriptions) never reaches the browser.

import { formatPrice, products, type Product } from "./products";
import { colourways, hex, shop, twoTone } from "./shop";

const u = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const clean = (title: string) => title.replace(/\s+/g, " ").trim();

/* ------------------------------------------------------------------ products */

/**
 * Main and hover photo for each product, numbered like the files (1 = 01.jpg). The hover photo is left out where
 * the store's other photos are infographics.
 */
const picks: Record<string, [main: number, hover?: number]> = {
  "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown": [1, 3],
  "mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown": [1, 5],
  "mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown": [2, 5],
  "compact-genuine-leather-rfid-wallet-black": [1, 4],
  "mens-rfid-nappa-leather-billfold-wallet": [1, 2],
  "morucha-rfid-hunter-brown-wallet-1": [1, 3],
  "mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown": [1, 3],
  "minimalist-genuine-leather-rfid-wallet-black-orange": [1, 4],
  "mens-rfid-hunter-leather-billfold-wallet": [1, 5],
  "mens-rfid-blocking-leather-passcase-wallet-with-a-large-zip-around-coin-pocket-m70-grey": [1],
  "mens-rfid-leather-trifold-passcase-wallet-black": [2, 1],
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan": [1, 4],
  "morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black": [1],
  "mens-rfid-leather-trifold-passcase-wallet-brown-tan": [3, 1],
  "gents-rfid-nappa-leather-trifold-passcase-wallet-brown": [2, 3],
  "gents-rfid-nappa-leather-passcase-wallet": [2, 4],
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028": [11, 13],
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy": [5, 2],
  "morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy": [5, 8],
  "morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan": [1],
  "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown": [1],
  "mens-rfid-blocking-leather-passcase-wallet-black": [3, 2],
  "2-in-1-compact-business-card-holder-wallet": [2, 3],
  "compact-genuine-leather-rfid-wallet-antique": [5, 2],
  "women-genuine-leather-rfid-clutch-wallet-red-black": [1, 3],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95": [1, 3],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85": [14, 15],
  "women-colorful-genuine-leather-rfid-purse": [1, 2],
  "womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue": [1, 5],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90": [1, 2],
  "women-genuine-leather-rfid-purse-blue": [1, 3],
};

/** Products the store sells in several colours, each colour with its own photo. */
const multiColour = new Map(
  (["bifoldCoin", "verticalCoin", "longClutch", "flapClutch", "compactClutch"] as const).map((k) => [shop[k].handle, colourways[k]]),
);

/** Colour words in the store titles, mapped to a swatch. Two in a row ("Black Tan") make a two-tone swatch. */
const colourWords: Record<string, string> = {
  black: hex.black, brown: hex.hunter, "dark brown": hex.brown, tan: hex.tan, grey: hex.grey, burgundy: hex.burgundy,
  blue: "#2c55b8", "dark blue": hex.navy, red: hex.red, orange: "#d9772b", antique: "#7a5a3c",
};
function titleColours(title: string) {
  const found = [...title.toLowerCase().matchAll(/\b(dark brown|dark blue|black|brown|tan|grey|burgundy|blue|red|orange|antique)\b/g)].map((m) => m[1]);
  const names = found.slice(-2);
  if (!names.length) return [];
  const name = names.map((n) => n.replace(/\b\w/g, (c) => c.toUpperCase())).join(" / ");
  return [{ name, swatch: names.length === 2 ? twoTone(colourWords[names[0]], colourWords[names[1]]) : colourWords[names[0]] }];
}

export type V6Colour = { name: string; swatch: string; image?: string };
export type V6Kind = "Wallets" | "Card holders" | "Purses & clutches";
export type V6Product = {
  handle: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  hover?: string;
  colours: V6Colour[];
  men: boolean;
  women: boolean;
  kind: V6Kind;
  hunter: boolean;
  rfid: boolean;
  isNew: boolean;
  createdAt: string;
  order: number; // the store's own order
};

// "New" = added in the same year as the store's newest product (the 2026 MORUCHA range)
const newestYear = products.map((p) => p.createdAt.slice(0, 4)).sort().pop();

function toV6(p: Product, order: number): V6Product {
  const [main, hover] = picks[p.handle] ?? [1, 2];
  const photo = (n?: number) => (n ? p.images[n - 1]?.src : undefined);
  const name = clean(p.title);
  const colours: V6Colour[] = multiColour.get(p.handle)?.map((c) => ({ name: c.name, swatch: c.swatch, image: c.images[0] })) ?? titleColours(name);
  return {
    handle: p.handle,
    name,
    price: formatPrice(p.price),
    priceValue: p.price,
    image: photo(main) ?? p.images[0].src,
    hover: photo(hover),
    colours,
    men: p.collections.includes("men"),
    women: p.collections.includes("women"),
    kind: /card holder/i.test(name) ? "Card holders" : p.collections.includes("women") ? "Purses & clutches" : "Wallets",
    hunter: /hunter/i.test(name),
    rfid: /rfid/i.test(name),
    isNew: p.createdAt.startsWith(newestYear ?? "-"),
    createdAt: p.createdAt,
    order,
  };
}

/** All 31 products in the store, in the store's order. */
export const catalogue: V6Product[] = products.map(toV6);
const byHandle = new Map(catalogue.map((p) => [p.handle, p]));
const get = (handle: string) => byHandle.get(handle)!;

/* ------------------------------------------------------------------ page */

export const announcement = "Free UK delivery · Order before 3:30pm for same-day dispatch";

export const nav = [
  { label: "New in", href: "#new" },
  { label: "Men", href: "#shop/men" },
  { label: "Women", href: "#shop/women" },
  { label: "Card holders", href: "#shop/card-holders" },
  { label: "Hunter leather", href: "#shop/hunter" },
  { label: "Gifts", href: "#stories" },
];

export type Slide = {
  id: string;
  tag: string;
  title: [string, string];
  tone: "sand" | "blush" | "stone";
  product: V6Product;
  image: string;
  alt: string;
  cta: { label: string; href: string };
};

export const heroSlides: Slide[] = [
  {
    id: "everyday",
    tag: "RFID blocking",
    title: ["Built for", "every day"],
    tone: "sand",
    product: get(shop.bifoldCoin.handle),
    image: shop.bifoldCoin.photo(11),
    alt: "Black and tan leather bifold wallet",
    cta: { label: "Shop the wallet", href: "#featured" },
  },
  {
    id: "capacity",
    tag: "High capacity",
    title: ["Room for", "everything"],
    tone: "blush",
    product: get(shop.longClutch.handle),
    image: shop.longClutch.photo(1),
    alt: "Burgundy leather long clutch wallet",
    cta: { label: "Shop women", href: "#shop/women" },
  },
  {
    id: "ride",
    tag: "31cm safety chain",
    title: ["Hold on", "tight"],
    tone: "stone",
    product: get(shop.bikerChain.handle),
    image: shop.bikerChain.photo(2),
    alt: "Brown leather biker wallet with its safety chain",
    cta: { label: "Shop hunter leather", href: "#shop/hunter" },
  },
];

const count = (test: (p: V6Product) => boolean) => catalogue.filter(test).length;

/** Plain words, plus { accent } phrases that turn red as the statement lights up. */
export type StatementPart = string | { accent: string };

export const statement = {
  eyebrow: "The Morucha promise",
  parts: [
    "Genuine leather with",
    { accent: "RFID protection" },
    "built in,",
    { accent: "gift boxed" },
    "and ready to give. Made to carry what matters, every single day.",
  ] as StatementPart[],
  // Live counts from the store data
  stats: [
    { value: catalogue.length, label: "Styles in the range" },
    { value: count((p) => p.men), label: "Wallets for men" },
    { value: count((p) => p.women), label: "Purses for women" },
    { value: Math.min(...catalogue.map((p) => p.priceValue)), decimals: 2, prefix: "£", label: "Prices from" },
  ],
};

export const categories = [
  { label: "Men's wallets", count: count((p) => p.men), href: "#shop/men", image: shop.bifoldCoin.photo(2), alt: "Black and tan leather bifold wallet" },
  { label: "Women's purses", count: count((p) => p.women), href: "#shop/women", image: shop.flapClutch.photo(1), alt: "Burgundy leather flap clutch purse" },
  { label: "Card holders", count: count((p) => p.kind === "Card holders"), href: "#shop/card-holders", image: shop.cardHolder.photo(2), alt: "Black leather card holder wallet, open" },
  { label: "Hunter leather", count: count((p) => p.hunter), href: "#shop/hunter", image: shop.hunterBifold.photo(1), alt: "Dark brown distressed hunter leather wallet" },
] as const;

export const rail = {
  title: "New drops",
  tabs: [
    { label: "New in", items: catalogue.filter((p) => p.isNew) },
    { label: "Men", items: catalogue.filter((p) => p.men).slice(0, 10) },
    { label: "Women", items: catalogue.filter((p) => p.women) },
    { label: "Under £25", items: catalogue.filter((p) => p.priceValue < 25).slice(0, 10) },
  ],
};

export const banner = {
  title: ["Tap. Pay.", "Protected."],
  text: "An RFID-blocking lining shields your contactless cards from unwanted scans, so they only pay when you want them to.",
  cta: { label: "Shop RFID wallets", href: "#shop/men" },
  image: u("photo-1685216321110-69383408a2ef", 2200),
  alt: "Man slipping a leather wallet into his pocket",
};

const spot = get(shop.bifoldCoin.handle);
export const spotlight = {
  eyebrow: "Featured · M-2028",
  title: ["One wallet.", "Four colourways."],
  product: spot,
  colours: colourways.bifoldCoin.map((c) => ({
    name: c.name,
    swatch: c.swatch,
    images: c.images.slice(0, 4),
  })),
  // From the product's own store listing
  features: [
    "Genuine soft, distressed hunter leather",
    "Built-in RFID blocking for contactless cards",
    "8 card slots, 3 ID windows and a zipped coin pocket",
    "Presented in a branded Morucha gift box",
  ],
};

export const stories = [
  { word: "Everyday", href: "#shop/men", image: u("photo-1606503825008-909a67e63c3d", 1200), alt: "Hand holding a brown leather bifold wallet" },
  { word: "Gifting", href: "#shop/all", image: u("photo-1689844820934-46edfdff7cf9", 1200), alt: "Leather card holders and key fobs laid out on a dark surface" },
  { word: "Out & about", href: "#shop/women", image: u("photo-1637168943285-a8f9ea0dc3f5", 1200), alt: "Man slipping a leather card wallet into his jacket pocket" },
];

export const shopAll = {
  title: "Shop the full range",
  // The tests for each key live in components/v6/Products.tsx
  filters: [
    { key: "all", label: "All" },
    { key: "men", label: "Men" },
    { key: "women", label: "Women" },
    { key: "wallets", label: "Wallets" },
    { key: "card-holders", label: "Card holders" },
    { key: "hunter", label: "Hunter leather" },
  ],
  sorts: [
    { key: "featured", label: "Featured" },
    { key: "newest", label: "Newest" },
    { key: "price-asc", label: "Price: low to high" },
    { key: "price-desc", label: "Price: high to low" },
  ] as { key: "featured" | "newest" | "price-asc" | "price-desc"; label: string }[],
  pageSize: 12,
};

export const perks = [
  { icon: "shield", title: "RFID blocking", text: "Lined to protect contactless cards" },
  { icon: "leather", title: "Genuine leather", text: "Soft, nappa and distressed hunter hides" },
  { icon: "gift", title: "Gift boxed", text: "Branded Morucha box, ready to give" },
  { icon: "van", title: "Free UK delivery", text: "Same-day dispatch before 3:30pm" },
] as const;

export const newsletter = {
  title: "Join the Morucha club",
  text: "New colours, restocks and gift ideas, first. [Member offer TBC]",
};

export const footer = {
  columns: [
    { title: "Shop", links: [["Men's wallets", "#shop/men"], ["Women's purses", "#shop/women"], ["Card holders", "#shop/card-holders"], ["Hunter leather", "#shop/hunter"], ["New in", "#new"]] },
    { title: "Help", links: [["Delivery", "#"], ["Returns", "#"], ["FAQs", "#"], ["Contact us", "mailto:sales@morucha.co.uk"]] },
    { title: "Morucha", links: [["Our story", "#"], ["RFID explained", "#featured"], ["Leather care", "#"], ["Trade enquiries", "mailto:sales@morucha.co.uk"]] },
  ],
  payments: ["visa", "mastercard", "amex", "paypal", "applepay", "googlepay"],
  legal: ["Privacy policy", "Terms of service", "Cookie settings"],
};
