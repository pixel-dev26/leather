// v7 home page copy and data (reference: bucherer.com). Every product, price and stock state comes from the live
// store data in ./products.json, and every photo is Morucha's own (banners in /public/images/banners, product shots in
// /public/images/products). The copy only uses what morucha.co.uk says itself: the announcement bar, About page,
// collection descriptions, shipping and refund policies and the product listings. [TBC] marks anything that still
// needs confirming by Morucha.
// Server-only on purpose: page.tsx passes client components just the slim product records they need.

import { formatPrice, products, type Product } from "./products";
import { colourways, shop } from "./shop";
import { picks } from "./home-v6";

const b = (file: string, size?: 960 | 1600) => `/images/banners/${size ? `w${size}/` : ""}${file}.webp`;

/* ------------------------------------------------------------------ products */

/**
 * The two lines Bucherer prints under a product (maker, then model) become the leather, then the style and model
 * code (from the store SKUs, written M-00 throughout; two codes the store uses twice are left off).
 */
const names: Record<string, [leather: string, style: string]> = {
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028": ["Soft Leather", "Coin Pocket Bifold M-2028"],
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy": ["Soft Leather", "Vertical Coin Wallet M-2025"],
  "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan": ["Soft Leather", "Coin Pocket Bifold M-2015"],
  "morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black": ["Genuine Leather", "Tap & Go Passcase M-130"],
  "morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy": ["Soft Leather", "Passcase Bifold M-115"],
  "morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan": ["Genuine Leather", "Slim Card Holder M-110"],
  "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown": ["Distressed Hunter Leather", "RFID Wallet M-105"],
  "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown": ["Soft Leather", "Passcase Wallet M-75"],
  "mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown": ["Distressed Hunter Leather", "Trifold Coin Wallet M-80"],
  "mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown": ["Distressed Leather", "Biker Wallet with Chain M-100"],
  "mens-rfid-blocking-leather-passcase-wallet-with-a-large-zip-around-coin-pocket-m70-grey": ["Genuine Leather", "Zip Coin Passcase M-70"],
  "mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown": ["Distressed Hunter Leather", "Compact Trifold M-45"],
  "morucha-rfid-hunter-brown-wallet-1": ["Genuine Leather", "RFID Wallet M-55"],
  "mens-rfid-hunter-leather-billfold-wallet": ["Oiled Hunter Leather", "Billfold Wallet M-20"],
  "mens-rfid-nappa-leather-billfold-wallet": ["Nappa Leather", "Billfold Wallet M-25"],
  "mens-rfid-blocking-leather-passcase-wallet-black": ["Genuine Leather", "Passcase Wallet M-50"],
  "mens-rfid-leather-trifold-passcase-wallet-black": ["Genuine Leather", "Trifold Passcase M-60"],
  "mens-rfid-leather-trifold-passcase-wallet-brown-tan": ["Genuine Leather", "Trifold Passcase, Brown Tan"],
  "minimalist-genuine-leather-rfid-wallet-black-orange": ["Genuine Leather", "Slim Tap and Go M-65"],
  "2-in-1-compact-business-card-holder-wallet": ["Genuine Leather", "2-in-1 Card Holder M-40"],
  "compact-genuine-leather-rfid-wallet-black": ["Genuine Leather", "Compact Wallet M-35"],
  "compact-genuine-leather-rfid-wallet-antique": ["Genuine Leather", "Compact Wallet, Antique"],
  "gents-rfid-nappa-leather-passcase-wallet": ["Nappa Leather", "Trifold Passcase M-30"],
  "gents-rfid-nappa-leather-trifold-passcase-wallet-brown": ["Distressed Hunter Leather", "Trifold Passcase M-30"],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95": ["Genuine Leather", "Clutch Wallet M-95"],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90": ["Genuine Leather", "Flap-Over Clutch M-90"],
  "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85": ["Genuine Leather", "Clutch Purse M-85"],
  "womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue": ["Genuine Leather", "Long Clutch M-125"],
  "women-genuine-leather-rfid-clutch-wallet-red-black": ["Genuine Leather", "Clutch Wallet M-15"],
  "women-genuine-leather-rfid-purse-blue": ["Genuine Leather", "Purse M-10"],
  "women-colorful-genuine-leather-rfid-purse": ["Genuine Leather", "Colourful Purse M-05"],
};

export type V7Product = {
  handle: string;
  leather: string;
  name: string;
  price: string;
  priceValue: number;
  image: string;
  hover?: string;
  available: boolean;
  colours: number;
};

function toV7(p: Product): V7Product {
  const [leather, name] = names[p.handle] ?? ["Genuine Leather", p.title.replace(/\s+/g, " ").trim()];
  const [main, hover] = picks[p.handle] ?? [1, 2];
  const photo = (n?: number) => (n ? p.images[n - 1]?.src : undefined);
  return {
    handle: p.handle,
    leather,
    name,
    price: formatPrice(p.price),
    priceValue: p.price,
    image: photo(main) ?? p.images[0].src,
    hover: photo(hover),
    available: p.available,
    colours: p.options.find((o) => /colou?r/i.test(o.name))?.values.length ?? 1,
  };
}

/** All 31 products, in the store's order (the header search looks through these). */
export const catalogue: V7Product[] = products.map(toV7);
const byHandle = new Map(catalogue.map((p) => [p.handle, p]));
const get = (handle: string) => {
  const p = byHandle.get(handle);
  if (!p) throw new Error(`Product not in products.json: ${handle}`);
  return p;
};
const count = (test: (p: Product) => boolean) => products.filter(test).length;
const men = (p: Product) => p.collections.includes("men");
const women = (p: Product) => p.collections.includes("women");

/* ------------------------------------------------------------------ header */

// The live announcement bar, trimmed to the UK offer the About page and shipping policy agree on
export const announcement = "Free UK delivery · Same-day dispatch on orders before 3.30pm · 30-day returns";

export type MenuLink = { label: string; href: string };
export type MenuItem = { label: string; text: string; href: string; links?: MenuLink[]; promo?: { image: string; alt: string; title: string; href: string } };

// The live main menu (Mens Collection, Womens Collection, About us, Contact us, My Account) with this page's
// sections added under each heading
export const menu: MenuItem[] = [
  {
    label: "Men",
    text: `${count(men)} wallets and card holders`,
    href: "#men",
    links: [
      { label: "Shop all men's wallets", href: "#men" },
      { label: "New for 2026", href: "#new" },
      { label: "Hunter leather", href: "#hunter" },
      { label: "Card holders and slim wallets", href: "#men" },
      { label: "Gifts for him", href: "#gifts" },
    ],
    promo: { image: b("hunter-leather", 960), alt: "Black leather wallet beside a leather punch on a wooden bench", title: "The 2026 range", href: "#new" },
  },
  {
    label: "Women",
    text: `${count(women)} purses and clutch wallets`,
    href: "#women",
    links: [
      { label: "Shop all purses", href: "#women" },
      { label: "Clutch wallets", href: "#women" },
      { label: "Long clutches", href: "#women" },
      { label: "Gifts for her", href: "#gifts" },
    ],
    promo: { image: b("banner-image-1", 960), alt: "Woman holding a blue and red leather purse", title: "Purses for every handbag", href: "#women" },
  },
  { label: "New for 2026", text: "Seven new styles", href: "#new" },
  {
    label: "Gifts",
    text: "Presented in a Morucha gift box",
    href: "#gifts",
    links: [
      { label: "Gifts for him", href: "#gifts" },
      { label: "Gifts for her", href: "#gifts" },
      { label: "Gifts under £25", href: "#gifts" },
    ],
  },
  {
    label: "About us",
    text: "Our story, our leathers",
    href: "#world",
    links: [
      { label: "Our story", href: "#world" },
      { label: "RFID protection", href: "#story" },
      { label: "Our leathers", href: "#story" },
      { label: "Trade enquiries", href: "mailto:sales@morucha.co.uk?subject=Trade%20enquiry" },
    ],
  },
  { label: "Contact us", text: "We aim to reply within 24 hours", href: "#service" },
];

/* ------------------------------------------------------------------ hero */

export type HeroSlide = { id: string; label: string; title: string; cta: { label: string; href: string }; image: string; alt: string; align: "left" | "right"; position?: string };

export const heroSlides: HeroSlide[] = [
  {
    id: "everyday",
    label: "Men's wallets",
    title: "Genuine Leather, Quietly Protected",
    cta: { label: "Discover", href: "#men" },
    image: b("v1-banner-1"),
    alt: "Black leather wallet with a tan base and press-stud tab on a dark leather surface",
    align: "left",
  },
  {
    id: "purses",
    label: "Women's purses",
    title: "Room for Everything, Without the Bulk",
    cta: { label: "Discover", href: "#women" },
    image: b("new-leather-5"),
    alt: "Hand opening a red leather clutch wallet with card slots and a zipped section",
    align: "left",
    position: "70% 50%",
  },
  {
    id: "gifting",
    label: "Gift boxed",
    title: "A Gift Made to Be Carried",
    cta: { label: "Discover", href: "#gifts" },
    image: b("new-season"),
    alt: "Man in a blue suit holding a black and blue leather long wallet",
    align: "right",
    position: "30% 40%",
  },
];

/* ------------------------------------------------------------------ tiles, gifts */

export const tiles = [
  { title: "Men's Wallets", href: "#men", image: b("men-wallet", 960), alt: "Hand holding a slim black leather wallet with an orange edge" },
  { title: "Women's Purses", href: "#women", image: b("women-wallet", 960), alt: "Woman holding a red leather clutch wallet with a black band" },
  { title: "New for 2026", href: "#new", image: b("since-2", 960), alt: "Six black Morucha leather wallets with tan, red, green and orange trims" },
];

export const gifts = {
  eyebrow: "Inspired by giving",
  title: "Gifts Made to Be Kept",
  // From the 2026 product listings: "an ideal gift for birthdays, Father's Day, Christmas, anniversaries"
  items: [
    { title: "Shop gifts for him", link: "For Father's Day and Every Day", href: "#men", image: b("insta-4", 960), alt: "Hands holding a black leather wallet beside its Morucha gift box" },
    { title: "Shop gifts for her", link: "For Everything She Carries", href: "#women", image: b("women-purse", 1600), alt: "Woman holding a blue and red leather purse against a white jacket" },
    { title: "Discover hunter leather", link: "Character in Every Crease", href: "#hunter", image: b("insta-2", 960), alt: "Black and distressed brown leather wallets laid out on a wooden table" },
    { title: `Discover gifts under £25`, link: "Exceptional Within Reach", href: "#men", image: b("gifts-under", 960), alt: "Grey leather wallet in front of a Morucha gift box on a dark desk" },
  ],
};

/* ------------------------------------------------------------------ product rails */

export type Rail = { id: string; eyebrow: string; title: string; intro: string; tone: "grey" | "warm"; items: V7Product[]; cta: { label: string; href: string } };

const newest = products.map((p) => p.createdAt.slice(0, 4)).sort().pop() ?? "2026";
const hunterHandles = [
  "mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown",
  "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown",
  "mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown",
  "mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown",
  "mens-rfid-hunter-leather-billfold-wallet",
  "gents-rfid-nappa-leather-trifold-passcase-wallet-brown",
];
const isNew = (p: Product) => p.createdAt.startsWith(newest);

export const rails: Record<"new" | "women" | "hunter" | "men", Rail> = {
  new: {
    id: "new",
    eyebrow: "New in",
    title: `The ${newest} Morucha Range`,
    intro: `${count(isNew)} new styles in genuine soft and distressed hunter leather, each with built-in RFID blocking and presented in a branded Morucha gift box.`,
    tone: "grey",
    // the M-2028 first, then the rest of the new range in the store's order
    items: [get(shop.bifoldCoin.handle), ...products.filter((p) => isNew(p) && p.handle !== shop.bifoldCoin.handle).map((p) => get(p.handle))],
    cta: { label: "View all", href: "#men" },
  },
  women: {
    id: "women",
    eyebrow: "Women",
    title: "Explore Our Purses and Clutch Wallets",
    // the women's collection description
    intro: "Designed to fit comfortably into your handbag without the bulk, with RFID protection, coin pouches and multi-card sections.",
    tone: "grey",
    items: products.filter(women).map((p) => get(p.handle)),
    cta: { label: "View all", href: "#women" },
  },
  hunter: {
    id: "hunter",
    eyebrow: "Hunter leather",
    title: "Discover Distressed Hunter Leather",
    intro: "Vintage distressed and oiled hunter leathers that develop a unique patina over time, so no two wallets age alike.",
    tone: "warm",
    items: hunterHandles.map(get),
    cta: { label: "View all", href: "#hunter" },
  },
  men: {
    id: "men",
    eyebrow: "Men",
    title: "Explore Our Collection of Wallets",
    // the men's collection description, with the live lowest price
    intro: `Handmade wallets designed to fit comfortably into your lifestyle: bifolds, trifolds, passcases and card holders, from ${formatPrice(Math.min(...products.filter(men).map((p) => p.price)))}.`,
    tone: "grey",
    items: products.filter((p) => men(p) && !isNew(p) && !hunterHandles.includes(p.handle)).map((p) => get(p.handle)),
    cta: { label: "Shop wallets", href: "#men" },
  },
};

/* ------------------------------------------------------------------ a world of Morucha (sticky story) */

const m2028 = get(shop.bifoldCoin.handle);
const m80 = get("mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown");
const m25 = get("mens-rfid-nappa-leather-billfold-wallet");

export const story = {
  eyebrow: "A world of Morucha",
  chapters: [
    {
      id: "rfid",
      index: "RFID",
      title: "Protection, Built Into Every Piece",
      // product listings: "a special lining to shield your credit and debit cards", "high-frequency (13.56 MHz)"
      text: "Nearly every Morucha wallet and purse is lined to block high-frequency (13.56 MHz) RFID signals, shielding the chips in your contactless cards from unwanted scans. They pay when you choose to tap, and only then.",
      image: b("card-holder", 1600),
      alt: "Hands sliding a blue bank card into a black and tan leather wallet",
      inset: { image: b("card-holder-new", 1600), alt: "Hands slipping a card into a brown leather wallet full of notes and cards" },
      cta: { label: "Discover more", href: "#journal" },
    },
    {
      id: "leather",
      index: "Leathers",
      title: "Leathers With Character",
      text: "From soft nappa cowhide to distressed and oiled hunter leather that develops a unique vintage patina over time, every piece is hand-crafted from genuine leather.",
      image: b("tanned-with", 1600),
      alt: "Black, tan and distressed brown leather wallets arranged on a wooden workbench",
      products: [m80, m25],
      cta: { label: "Discover now", href: "#hunter" },
    },
    {
      id: "m2028",
      index: "M-2028",
      title: "One Wallet, Four Colourways",
      // from the M-2028 listing's Key Features
      text: "New for 2026, the M-2028 bifold pairs genuine soft distressed leather with 8 card slots, 3 clear ID windows, a zipped coin pocket and built-in RFID blocking.",
      product: m2028,
      colours: colourways.bifoldCoin.map((c) => ({ name: c.name, swatch: c.swatch, image: c.images[0], inset: c.images[2] })),
      cta: { label: "Find out more", href: "#new" },
    },
  ],
};

/* ------------------------------------------------------------------ journal, world, service */

// The store's blog has one post (a 2019 delivery notice), so these are suggested guides built from the product
// listings. [Articles TBC]
export const journal = {
  eyebrow: "Discover the world of Morucha",
  title: "Our Highlights",
  feature: {
    label: "Guide",
    title: "What RFID Blocking Really Protects",
    text: "How a lining that blocks 13.56 MHz signals keeps contactless cards, ID and travel passes safe from unwanted scans, and why it never gets in the way of paying.",
    image: b("insta-1", 960),
    alt: "Burgundy leather wallet held open, showing coloured cards and an RFID card in the ID window",
    href: "#story",
  },
  items: [
    {
      label: "Guide",
      title: "Hunter, Nappa or Soft Leather?",
      text: "A short guide to the leathers in the Morucha range, how each one feels in the hand and how it ages.",
      image: b("new-leather-4", 1600),
      alt: "Navy and mustard leather trifold wallet lying open on pebbled leather",
      href: "#story",
    },
    {
      label: "Gifting",
      title: "A Gift for Every Occasion",
      text: "Birthdays, Father's Day, Christmas, anniversaries and weddings: finding the right wallet or purse, ready in its gift box.",
      image: b("insta-3", 960),
      alt: "Distressed brown leather wallet held open in front of a Morucha gift box",
      href: "#gifts",
    },
    {
      label: "Care",
      title: "Caring for Leather That Lasts",
      text: "Simple habits that keep nappa soft and let distressed hunter leather build its vintage patina, from everyday carry to storing a wallet away.",
      image: b("hunter-leather", 960),
      alt: "Black leather wallet beside a leather punch on a wooden workbench",
      href: "#story",
    },
    {
      label: "New in",
      title: `Inside the ${newest} Range`,
      text: `${count(isNew)} new styles, from the M-2028 coin pocket bifold to the slim M-110 card holder, and what sets each one apart.`,
      image: b("banner-3", 960),
      alt: "Man in a grey jacket slipping a black and tan leather wallet into his inside pocket",
      href: "#new",
    },
  ],
  cta: { label: "Show all articles", href: "#journal" },
};

export const world = {
  eyebrow: "Leather and craftsmanship",
  title: "Discover the Morucha World",
  feature: {
    eyebrow: "Morucha world",
    // collection descriptions: "Crafted from the finest leather for a superior finish"
    title: "Crafted From the Finest Leather",
    image: b("crafted-with", 1600),
    alt: "Leather worker pressing the edge of a burgundy wallet on a workbench of tools",
    cta: { label: "Learn more", href: "#world" },
  },
  cards: [
    // About page: "sold tens of thousands of wallets to satisfied customers worldwide"
    { eyebrow: "Our story", title: "Tens of Thousands of Wallets, Worldwide", image: b("since-1", 960), alt: "Hands opening a distressed brown leather passcase wallet on a wooden table", cta: { label: "Discover more", href: "#world" } },
    { eyebrow: "Colour and detail", title: "Two-Tone Leather, by Design", image: b("new-leather-1", 960), alt: "Fan of coloured leather swatches beside black and brown two-tone wallets", cta: { label: "Discover more", href: "#new" } },
    // About page: retailers are invited to get in touch at sales@morucha.co.uk
    { eyebrow: "Trade and wholesale", title: "Stock Morucha in Your Store", image: b("leather-pieces", 1600), alt: "Black, tan and orange leather pieces laid out on a green cutting mat", cta: { label: "Get in touch", href: "mailto:sales@morucha.co.uk?subject=Trade%20enquiry" } },
  ],
};

// Bucherer's "Find a store near you" becomes Morucha's online service: the contact page, About page and policies
export const service = {
  title: "At Your Service",
  text: "Questions about a wallet, a gift or an order? Write to us and we aim to respond within 24 hours.",
  points: [
    { title: "Free UK delivery", text: "Standard delivery in 3–5 working days" },
    { title: "Same-day dispatch", text: "On orders received before 3.30pm" },
    { title: "Next-day delivery", text: "£5.99 within the UK" },
    { title: "30-day returns", text: "On unused items in their original packaging" },
  ],
  primary: { label: "Write to us", href: "mailto:sales@morucha.co.uk" },
  secondary: { label: "Trade enquiries", href: "mailto:sales@morucha.co.uk?subject=Trade%20enquiry" },
  image: b("new-leather-2", 1600),
  alt: "Black Morucha leather wallet beside navy and mustard pebbled leather on a brown leather surface",
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  // the live footer sign-up: "Sign up to our mailing list. Promotions, new products and sales. Directly to your inbox."
  newsletter: "Join the mailing list for promotions, new products and sales, directly to your inbox",
  columns: [
    { title: "Service", links: [["Delivery", "#service"], ["Returns", "#service"], ["Contact us", "#service"], ["My account", "#"], ["Search", "#top"]] },
    { title: "About", links: [["About us", "#world"], ["RFID protection", "#story"], ["Our leathers", "#story"], ["Trade enquiries", "mailto:sales@morucha.co.uk?subject=Trade%20enquiry"]] },
    { title: "Legal & privacy", links: [["Privacy policy", "#"], ["Refund policy", "#"], ["Shipping policy", "#"], ["Terms of service", "#"], ["GDPR requests", "#"]] },
  ] as { title: string; links: [string, string][] }[],
  care: {
    title: "Customer care",
    lines: ["We aim to reply within 24 hours", "sales@morucha.co.uk", "272 Kings Road, Tyseley", "Birmingham B11 2AB"],
    contact: { label: "Write to us", href: "mailto:sales@morucha.co.uk" },
  },
  // the cards the live checkout shows, from the payment logos this project has
  payments: ["visa", "mastercard", "amex", "applepay", "googlepay"],
  // contact page, with the company name's spelling corrected ("Limitet" on the live site)
  legal: "Morucha™ is a trademark and trading name of RAS Trading Europe Limited. Registered in England and Wales, company no. 08626748.",
};
