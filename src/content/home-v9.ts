// v9 home page copy and data (references: rapha.cc first, then finisterre.com and bucherer.com). Every product, name,
// price and stock state comes from the live store data in ./products.json (names and card photos are v7's, so the
// range reads the same across versions), and every photo is Morucha's own. The copy only uses what morucha.co.uk
// says itself: the announcement bar, About page, collection descriptions, policies and product listings. [TBC] marks
// anything that still needs confirming by Morucha.
// Server-only on purpose: page.tsx passes client components just the slim product records they need.

import { formatPrice, products, type Product } from "./products";
import { shop } from "./shop";
import { catalogue, type V7Product } from "./home-v7";

const b = (file: string, size?: 960 | 1600) => `/images/banners/${size ? `w${size}/` : ""}${file}.webp`;

/* ------------------------------------------------------------------ products */

export type V9Product = V7Product & { isNew: boolean };

const newest = products.map((p) => p.createdAt.slice(0, 4)).sort().pop() ?? "2026";
const isNew = (p: Product) => p.createdAt.startsWith(newest);
const byHandle = new Map(catalogue.map((p, i) => [p.handle, { ...p, isNew: isNew(products[i]) }]));
const get = (handle: string): V9Product => {
  const p = byHandle.get(handle);
  if (!p) throw new Error(`Product not in products.json: ${handle}`);
  return p;
};
const count = (test: (p: Product) => boolean) => products.filter(test).length;
const men = (p: Product) => p.collections.includes("men");
const women = (p: Product) => p.collections.includes("women");

/* ------------------------------------------------------------------ header */

// The live announcement bar and policies, one message per slot of Rapha's scrolling bar
export const announcements = [
  { text: `New for ${newest}`, cta: "Shop now", href: "#new" },
  { text: "Free UK delivery", cta: "On every order", href: "#promises" },
  { text: "Same-day dispatch", cta: "Order before 3.30pm", href: "#promises" },
  { text: "Gift boxed", cta: "As standard", href: "#gifts" },
  { text: "30-day returns", cta: "Find out more", href: "#promises" },
];

export type MegaColumn = { title: string; links: { label: string; href: string }[] };
export type NavItem = { label: string; href: string; columns?: MegaColumn[]; feature?: { image: string; alt: string; title: string; href: string } };

// The live main menu (Mens Collection, Womens Collection, About us) as Finisterre-style mega menus
export const nav: NavItem[] = [
  {
    label: "Men",
    href: "#new",
    columns: [
      { title: "Shop", links: [{ label: `All wallets (${count(men)})`, href: "#categories" }, { label: `New for ${newest}`, href: "#new" }, { label: "Card holders", href: "#categories" }, { label: "Gifts for him", href: "#gifts" }] },
      { title: "Leathers", links: [{ label: "Soft leather", href: "#new" }, { label: "Nappa leather", href: "#favourites" }, { label: "Hunter leather", href: "#hunter" }] },
    ],
    feature: { image: b("men-wallet", 960), alt: "Hand holding a slim black leather wallet with an orange edge", title: "The 2026 range", href: "#new" },
  },
  {
    label: "Women",
    href: "#favourites",
    columns: [
      { title: "Shop", links: [{ label: `All purses (${count(women)})`, href: "#favourites" }, { label: "Clutch wallets", href: "#favourites" }, { label: "Long clutches", href: "#favourites" }, { label: "Gifts for her", href: "#gifts" }] },
    ],
    feature: { image: b("women-purse", 1600), alt: "Woman holding a blue and red leather purse against a white jacket", title: "Purses for every handbag", href: "#favourites" },
  },
  { label: "Card Holders", href: "#categories" },
  {
    label: "Gifts",
    href: "#gifts",
    columns: [
      { title: "Gift edit", links: [{ label: "Gifts for him", href: "#gifts" }, { label: "Gifts for her", href: "#gifts" }, { label: "Under £25", href: "#gifts" }, { label: "Gift boxed", href: "#gifts" }] },
    ],
    feature: { image: b("gifts-under", 960), alt: "Grey leather wallet in front of a Morucha gift box on a dark desk", title: "Every piece, gift boxed", href: "#gifts" },
  },
  { label: "Our Story", href: "#story" },
];

/* ------------------------------------------------------------------ hero, rails */

export const hero = {
  title: "Made to Be Carried",
  // homepage meta description + product listings
  text: "Genuine leather wallets, purses and card holders with built-in RFID protection, gift boxed and delivered free across the UK.",
  ctas: [
    { label: "Shop men's", href: "#new" },
    { label: "Shop women's", href: "#favourites" },
  ],
  image: b("v1-banner-3"),
  alt: "Man in a blue suit holding a navy leather long wallet with contrast stitching",
};

export type Rail = { id: string; title: string; intro: string; items: V9Product[]; cta: { label: string; href: string } };

export const newIn: Rail = {
  id: "new",
  title: "New In",
  intro: `The ${newest} Morucha range: ${count(isNew)} new styles in genuine soft and distressed hunter leather, each with RFID blocking.`,
  // the M-2028 first, then the rest of the new range in the store's order
  items: [get(shop.bifoldCoin.handle), ...products.filter((p) => isNew(p) && p.handle !== shop.bifoldCoin.handle).map((p) => get(p.handle))],
  cta: { label: "Shop all new in", href: "#new" },
};

export const favourites: Rail = {
  id: "favourites",
  title: "Morucha Favourites",
  intro: "Purses with room for everything and wallets that wear in, not out.",
  items: [
    "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95",
    "mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown",
    "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90",
    "men-rfid-blocking-real-soft-leather-passcase-wallet-black-brown",
    "mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown",
    "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85",
    "mens-rfid-nappa-leather-billfold-wallet",
    "women-colorful-genuine-leather-rfid-purse",
  ].map(get),
  cta: { label: "Shop all", href: "#categories" },
};

/* ------------------------------------------------------------------ categories, statement, campaign */

export const categories = {
  id: "categories",
  title: "Shop by Category",
  items: [
    {
      title: "Wallets",
      image: b("banner-3", 960),
      alt: "Man in a grey jacket slipping a black and tan leather wallet into his inside pocket",
      links: [{ label: `Men's wallets (${count(men)})`, href: "#new" }, { label: "Hunter leather", href: "#hunter" }],
    },
    {
      title: "Purses & Clutches",
      image: b("banner-image-1", 960),
      alt: "Woman in red trousers holding a blue, pink, black and red leather purse",
      links: [{ label: `Women's purses (${count(women)})`, href: "#favourites" }, { label: "Gifts for her", href: "#gifts" }],
    },
    {
      title: "Card Holders",
      image: b("card-holder", 960),
      alt: "Hands sliding a blue bank card into a black and tan leather wallet",
      links: [{ label: "Slim wallets", href: "#new" }, { label: "Under £25", href: "#gifts" }],
    },
  ],
};

// Finisterre's brand statement under a round stamp. About page: "one of UK's top brand specialist in leather wallets,
// purses, cardholder", "sold tens of thousands of wallets to satisfied customers worldwide".
export const statement = {
  id: "story",
  eyebrow: "Our story",
  text: "We specialise in leather wallets, purses and card holders, and have sent tens of thousands of them to customers around the world. Each one is genuine leather, lined against RFID scans and gift boxed.",
  stamp: "Genuine leather · RFID protected · Gift boxed · ",
  cta: { label: "About Morucha", href: "#stories" },
};

export const campaign = {
  id: "hunter",
  title: "Hunter Leather",
  text: "Vintage distressed and oiled hunter leathers that develop a unique patina over time, so no two wallets age alike.",
  ctas: [
    { label: "Shop hunter leather", href: "#favourites" },
    { label: "The biker wallet", href: "#favourites" },
  ],
  image: b("tanned-with", 1600),
  alt: "Black, tan and distressed brown leather wallets arranged on a wooden workbench",
};

/* ------------------------------------------------------------------ gifts, stories, promises */

// Bucherer's 2×2 gift grid. Product listings: "an ideal gift for birthdays, Father's Day, Christmas, anniversaries".
// (insta-4 and insta-5 are left out: both show a business card from another leather brand.)
export const gifts = {
  id: "gifts",
  eyebrow: "Gift boxed as standard",
  title: "The Gift Edit",
  items: [
    { title: "Gifts for Him", link: "Father's Day, birthdays and every day", href: "#new", image: b("v1-banner-1", 960), alt: "Black leather wallet with a tan base and press-stud tab on a dark leather surface" },
    { title: "Gifts for Her", link: "Purses with room for everything", href: "#favourites", image: b("insta-6", 960), alt: "Hands holding a red Morucha leather purse with a black band on a wooden desk" },
    { title: "Under £25", link: `${count((p) => p.price < 25)} styles at ${formatPrice(Math.min(...products.map((p) => p.price)))}`, href: "#new", image: b("gifts-under", 960), alt: "Grey leather wallet in front of a Morucha gift box on a dark desk" },
    // the store's own photo of the M-130 with its box, shown whole on a pale well
    { title: "Gift Boxed", link: "Every piece arrives ready to give", href: "#promises", image: shop.tapAndGo.photo(1), alt: "Black Tap & Go leather wallet beside its Morucha gift box", packshot: true },
  ] as { title: string; link: string; href: string; image: string; alt: string; packshot?: boolean }[],
};

// The store's blog has one post (a 2019 delivery notice), so these are suggested guides built from the product
// listings. [Articles TBC]
export const stories = {
  id: "stories",
  title: "Latest Stories",
  items: [
    { label: "Guide", title: "What RFID Blocking Really Protects", text: "How a lining that blocks 13.56 MHz signals keeps contactless cards safe from unwanted scans.", image: b("insta-1", 960), alt: "Burgundy leather wallet held open, showing coloured cards and an RFID card in the ID window", focus: "52% 50%" },
    { label: "Guide", title: "Hunter, Nappa or Soft Leather?", text: "The leathers in the Morucha range, how each one feels in the hand and how it ages.", image: b("since-1", 960), alt: "Hands opening a distressed brown leather passcase wallet on a wooden table" },
    { label: "Care", title: "Caring for Leather That Lasts", text: "Simple habits that keep nappa soft and let hunter leather build its patina.", image: b("hunter-leather", 960), alt: "Black leather wallet beside a leather punch on a wooden workbench" },
    { label: "Gifting", title: "A Gift for Every Occasion", text: "Birthdays, Father's Day, Christmas and anniversaries, ready in a Morucha gift box.", image: b("women-wallet", 960), alt: "Woman holding a red leather clutch wallet with a black band" },
    { label: "New in", title: `Inside the ${newest} Range`, text: `${count(isNew)} new styles, from the M-2028 coin pocket bifold to the slim M-110 card holder.`, image: b("men-wallet", 960), alt: "Hand holding a slim black leather wallet with an orange edge" },
  ],
};

// Rapha's promise row, from the shipping and refund policies
export const promises = [
  { icon: "van", title: "Free UK delivery", text: "Standard delivery in 3–5 working days" },
  { icon: "clock", title: "Same-day dispatch", text: "On orders received before 3.30pm" },
  { icon: "return", title: "30-day returns", text: "On unused items in their original packaging" },
  { icon: "gift", title: "Gift boxed", text: "Presented in a branded Morucha gift box" },
] as const;

/* ------------------------------------------------------------------ footer */

export const footer = {
  // the live footer sign-up: "Sign up to our mailing list. Promotions, new products and sales. Directly to your inbox."
  newsletter: { title: "Sign up to our mailing list", text: "Promotions, new products and sales, directly to your inbox.", interests: ["Men's wallets", "Women's purses", "Gift ideas"] },
  columns: [
    { title: "Customer services", links: [["Delivery", "#promises"], ["Returns", "#promises"], ["Contact us", "mailto:sales@morucha.co.uk"], ["My account", "#"], ["Search", "#top"]] },
    { title: "Information", links: [["About us", "#story"], ["Stories", "#stories"], ["Trade enquiries", "mailto:sales@morucha.co.uk?subject=Trade%20enquiry"], ["GDPR requests", "#"]] },
    { title: "Policies", links: [["Shipping policy", "#"], ["Refund policy", "#"], ["Privacy policy", "#"], ["Terms of service", "#"]] },
  ] as { title: string; links: [string, string][] }[],
  contact: { title: "Contact", lines: ["We aim to reply within 24 hours", "sales@morucha.co.uk", "272 Kings Road, Tyseley", "Birmingham B11 2AB"] },
  payments: ["visa", "mastercard", "amex", "applepay", "googlepay"],
  // contact page, with the company name's spelling corrected ("Limitet" on the live site)
  legal: "Morucha™ is a trademark and trading name of RAS Trading Europe Limited. Registered in England and Wales, company no. 08626748.",
};
