// v12 "Numbered" home page copy and data (reference: ghurka.com, see v12rule.md). Every product, price and photo comes
// from the live store data in ./products.json and /public; the product records are v11's, renamed the Ghurka way
// ("Soft Bifold No. 2028") from the M-code in each store title. A product without an M-code keeps a plain name; no
// number is ever made up. [TBC] marks anything that still needs confirming by Morucha.

import { cards as v11Cards, type Card } from "./home-v11";
import { getProduct } from "./products";

const img = (file: string) => `/images/banners/${file}.webp`;

export const logo = "/brand/morucha-logo.webp";

/* ------------------------------------------------------------------ products */

export type NumberedCard = Card & { hover?: string; tag?: string };

// Short shape names drafted from the store titles (concept board §08: still open for Morucha to change)
const names: Record<string, string> = {
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028": "Soft Bifold",
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy": "Vertical Wallet",
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan": "Soft Bifold",
  "morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black": "Tap & Go Wallet",
  "morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy": "Passcase",
  "morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan": "Slim Bifold",
  "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown": "Hunter Wallet",
  "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown": "Passcase Bifold",
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90": "Clutch Wallet",
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95": "Clutch Wallet",
  "mens-rfid-hunter-leather-billfold-wallet": "Hunter Billfold",
  "minimalist-genuine-leather-rfid-wallet-black-orange": "Slim Tap and Go Wallet",
  "2-in-1-compact-business-card-holder-wallet": "2-in-1 Card Holder Wallet",
  "mens-rfid-nappa-leather-billfold-wallet": "Nappa Billfold",
};

function numbered(c: Card): NumberedCard {
  const p = getProduct(c.handle);
  const title = p?.title ?? "";
  // The model code as the store title writes it: M-75, M95, M2028, M-2028 … The vertical M-2028 "copy" is M2025.
  const code = /\bM-?\s?(\d{2,4})\b(?![\s\S]*\bM-?\s?\d{2,4}\b)/.exec(title)?.[1];
  const base = names[c.handle] ?? c.name.replace(/\s+M\d+$/, "");
  return {
    ...c,
    name: code ? `${base} No. ${code}` : base,
    hover: p?.images[1]?.src,
    tag: /gift box/i.test(title) ? "Gift box" : undefined,
  };
}

const byHandle = new Map(v11Cards.map((c) => [c.handle, c]));
const pick = (handles: string[]) =>
  handles.map((h) => {
    const c = byHandle.get(h);
    if (!c) throw new Error(`Product not available in products.json: ${h}`);
    return numbered(c);
  });

const newest = v11Cards.filter((c) => c.isNew);
const newestYear = getProduct(newest[0]?.handle ?? "")?.createdAt.slice(0, 4) ?? "2026";
const words = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

// Two-tone and multi-colour wallets first, then single colours, as on the concept board
const newOrder = [
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028",
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy",
  "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown",
  "morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black",
  "morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy",
  "morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan",
];
export const newIn = {
  title: "New In",
  items: pick([...newOrder, ...newest.map((c) => c.handle).filter((h) => !newOrder.includes(h))]),
};

// The same bestseller list v11 uses
export const bestsellers = {
  title: "Our Bestsellers",
  items: pick([
    "mens-rfid-hunter-leather-billfold-wallet",
    "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown",
    "minimalist-genuine-leather-rfid-wallet-black-orange",
    "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90",
    "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028",
    "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95",
    "2-in-1-compact-business-card-holder-wallet",
    "mens-rfid-nappa-leather-billfold-wallet",
  ]),
};

/* ------------------------------------------------------------------ header */

export const announcement = "Free UK delivery, and orders before 3.30pm leave the same day.";

export const navLeft = [
  { label: "New In", href: "#new" },
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Card Holders", href: "#card-holders" },
  { label: "Gifts", href: "#gifts" },
];
export const navRight = [{ label: "Our Story", href: "#story" }];

/* ------------------------------------------------------------------ sections */

export const hero = {
  title: `The ${newestYear} Range`,
  text: `${words[newest.length] ?? newest.length} new wallets in soft and hunter leather.`.replace(/^./, (s) => s.toUpperCase()),
  cta: { label: "Explore the Collection", href: "#new" },
  image: { src: img("v1-banner-3"), alt: "Man in a blue suit holding a Morucha leather wallet" },
};

export const pairs = [
  [
    { id: "men", title: "Men", href: "#new", image: { src: img("banner-3"), alt: "Man sliding a leather wallet into his jacket pocket", position: "50% 30%" } },
    { id: "women", title: "Women", href: "#bestsellers", image: { src: img("women-purse"), alt: "Woman holding a two-tone leather purse", position: "50% 40%" } },
  ],
  [
    { id: "card-holders", title: "Card Holders", href: "#bestsellers", image: { src: img("card-holder"), alt: "Hands opening a black leather card holder", position: "50% 45%" } },
    { id: "gifts", title: "Gifts", href: "#bestsellers", image: { src: img("insta-4"), alt: "Black leather wallet beside a Morucha gift box", position: "50% 50%" } },
  ],
];

export const leathers = {
  title: "Choose Your Leather",
  text: "Distressed hunter leather that wears in, soft leather for a slim pocket, smooth nappa, or a two-tone pairing. Pick the leather first, then the shape.",
  items: [
    { title: "Hunter Leather", href: "#bestsellers", image: { src: img("since-1"), alt: "Open hunter leather wallet on a workbench" } },
    { title: "Soft Leather", href: "#new", image: { src: img("hunter-leather"), alt: "Black soft leather wallet" } },
    { title: "Two-Tone", href: "#new", image: { src: img("tanned-with"), alt: "Two-tone leather wallets laid out on wood" } },
    { title: "Colour", href: "#bestsellers", image: { src: img("new-leather-1"), alt: "Leather colour swatches beside finished wallets" } },
  ],
};

export const story = {
  title: "Since [TBC]",
  text: "[TBC: the founding story, two or three sentences in Morucha’s own words: who started it, where, and why.]",
  cta: { label: "Our Story", href: "#story" },
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  columns: [
    { title: "Help", links: ["Delivery", "Returns", "Contact Us", "FAQs"] },
    { title: "Shop", links: ["Men", "Women", "Card Holders", "Gifts"] },
    { title: "About Us", links: ["Our Story", "Our Leather", "Instagram [TBC]"] },
  ],
  newsletter: {
    title: "Sign Up for Our Newsletter",
    text: "New leathers first, and offers for subscribers. [TBC: sign-up discount]",
  },
  region: "United Kingdom (GBP £)",
  copyright: `© ${new Date().getFullYear()} Morucha`,
};

/* ------------------------------------------------------------------ revision 2 (cuero.in section types) */
// Board: https://claude.ai/artifact/MdpdB9VTRzafnRGCGCSS6g. Section types and sizes follow cuero.in; every photo,
// product and promise is Morucha's own.

export const factsStrip = ["Free UK delivery", "Same-day dispatch before 3.30pm", "30-day returns", "Gift boxed", "RFID blocking"];

const styleCount = (style: Card["style"] | Card["style"][]) =>
  v11Cards.filter((c) => (Array.isArray(style) ? style.includes(c.style) : c.style === style)).length;

export const styles = {
  title: "Shop by Style",
  all: { label: "All styles", href: "#bestsellers" },
  items: [
    { title: "Bifold Wallets", count: styleCount("bifold"), image: { src: img("insta-2"), alt: "Bifold leather wallets on a wooden table", position: "50% 50%" } },
    { title: "Passcase Wallets", count: styleCount("passcase"), image: { src: img("since-2"), alt: "Passcase wallets with tab closures laid out together", position: "50% 50%" } },
    { title: "Slim & Tap and Go", count: styleCount("slim"), image: { src: img("men-wallet"), alt: "Hand holding a slim black and orange leather wallet", position: "50% 40%" } },
    { title: "Card Holders", count: styleCount("card holder"), image: { src: img("insta-5"), alt: "Navy leather card holder held open with a card", position: "40% 50%" } },
    { title: "Clutch Wallets", count: styleCount("clutch"), image: { src: img("women-wallet"), alt: "Red leather clutch wallet held in both hands", position: "50% 50%" } },
    { title: "Purses", count: styleCount("purse"), image: { src: img("banner-image-1"), alt: "Woman holding a colourful leather purse", position: "50% 40%" } },
  ].map((s) => ({ ...s, href: "#bestsellers" })),
};

// One product up close: the M-2028 soft bifold, with facts taken from its store title and options
const detailHandle = "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028";
const detailProduct = getProduct(detailHandle);
const detailCard = byHandle.get(detailHandle);
if (!detailProduct || !detailCard) throw new Error(`Product not available in products.json: ${detailHandle}`);
const photo = (n: number) => detailProduct.images[n - 1]?.src ?? detailProduct.images[0].src;
export const detail = {
  label: "The Detail",
  title: numbered(detailCard).name,
  facts: [
    { label: "Leather", value: "Soft leather, two-tone" },
    { label: "Inside", value: "Coin pocket, ID windows" },
    { label: "Protection", value: "RFID blocking" },
    { label: "Colours", value: String(detailCard.swatches.length) },
    { label: "Price", value: detailCard.price },
  ],
  main: { src: photo(11), alt: "Soft Bifold No. 2028 in black and tan, closed" },
  thumbs: [
    { src: photo(18), alt: "No. 2028 open with cards, notes and coins" },
    { src: photo(10), alt: "The zipped coin pocket of No. 2028" },
  ],
  cta: { label: "Shop No. 2028", href: detailCard.href },
};

export const hunterBanner = {
  title: "Hunter Leather",
  text: "Distressed leather that shows every year it’s carried. Wallets and trifolds, all with RFID blocking inside.",
  cta: { label: "Shop Hunter Leather", href: "#bestsellers" },
  image: { src: img("since-1"), alt: "Open hunter leather wallet on a workbench", position: "60% 50%" },
};

export const lookbook = {
  title: "In Hand",
  text: "Morucha wallets and purses, carried.",
  items: [
    { caption: "Burgundy leather", image: { src: img("insta-1"), alt: "Burgundy leather wallet held open with cards", position: "45% 50%" } },
    { caption: "Clutch wallet", image: { src: img("insta-6"), alt: "Red leather clutch on a wooden table", position: "50% 50%" } },
    { caption: "Tan leather", image: { src: img("card-holder-new"), alt: "Tan leather wallet held open with a card", position: "50% 50%" } },
    { caption: "Two-tone bifold", image: { src: img("new-season"), alt: "Man in a blue suit holding a black and blue wallet", position: "50% 45%" } },
  ],
};

export const craftBanner = {
  title: "Behind Every Wallet",
  text: "Leather chosen, cut and stitched into wallets made for daily use.",
  cta: { label: "Our Story", href: "#story" },
  image: { src: img("crafted-with"), alt: "Hands working leather at a workbench", position: "50% 45%" },
};

// Must be real, verified customer reviews before launch; nothing here is invented.
export const reviews = {
  title: "What customers say",
  rating: "[TBC: rating and number of reviews]",
  image: { src: img("insta-3"), alt: "Brown leather wallet held open with notes and cards" },
  items: [
    { quote: "[A real, verified customer review, no more than 30 words, quoted exactly.]", name: "[First name, town]", product: "[product name and No.]" },
    { quote: "[A second verified review: TBC.]", name: "[First name, town]", product: "[product]" },
    { quote: "[A third verified review: TBC.]", name: "[First name, town]", product: "[product]" },
  ],
};

export const promises = [
  { icon: "van", title: "Free UK Delivery", text: "On every order, however small." },
  { icon: "clock", title: "Same-Day Dispatch", text: "Order before 3.30pm and it leaves today." },
  { icon: "return", title: "30-Day Returns", text: "Not right? Send it back within 30 days." },
  { icon: "gift", title: "Gift Boxed", text: "Every wallet ships in a gift box." },
] as const;

export const contact = { title: "Morucha", lines: ["[TBC: business address]", "[TBC: customer email]", "[TBC: phone, if listed]"] };
