// v8 home page copy and data (reference: finisterre.com). Every product, name, price and product photo is Morucha's own,
// from the live store data in ./products.json; the lifestyle photos are Morucha's own banners in /public/images/banners.
// Facts come from morucha.co.uk (announcement bar, About page, shipping and refund policies, product listings).
// [TBC] marks copy that still needs confirming by Morucha. The journal articles are proposals that still need writing.

import { formatPrice, getProduct, products } from "./products";

/* ------------------------------------------------------------------ products */

export type V8Product = {
  handle: string;
  name: string; // short card name; the store's full title stays in `title` (used for alt text)
  title: string;
  price: string;
  image: string;
  hover?: string;
  colours: number;
  tag?: { label: string; tone: "sand" | "navy" };
  available: boolean;
};

type Pick = { handle: string; name: string; main: number; hover?: number; tag?: V8Product["tag"] };

function toV8({ handle, name, main, hover, tag }: Pick): V8Product {
  const p = getProduct(handle);
  if (!p) throw new Error(`Product not in products.json: ${handle}`);
  const photo = (n?: number) => (n ? p.images[n - 1]?.src : undefined);
  const colourOption = p.options.find((o) => o.name === "Color");
  return {
    handle,
    name,
    title: p.title.replace(/\s+/g, " ").trim(),
    price: formatPrice(p.price),
    image: photo(main) ?? p.images[0].src,
    hover: photo(hover),
    colours: colourOption?.values.length ?? 1,
    tag,
    available: p.available,
  };
}

const isNew = { label: "New for 2026", tone: "sand" } as const;

/** The seven pieces added to the store in May 2026. Photo numbers match the files (1 = 01.webp). */
const newIn: Pick[] = [
  { handle: "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028", name: "Men's M-2028 Coin Pocket Bifold", main: 11, hover: 13, tag: isNew },
  { handle: "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy", name: "Men's M-2025 Vertical Wallet", main: 5, hover: 2, tag: isNew },
  { handle: "morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black", name: "Men's M-130 Tap & Go Passcase", main: 1, tag: isNew },
  { handle: "morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy", name: "Men's M-115 Burgundy Passcase", main: 5, hover: 8, tag: isNew },
  { handle: "morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan", name: "Men's M-2015 Two-Tone Bifold", main: 1, hover: 4, tag: isNew },
  { handle: "morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan", name: "Men's M-110 Slim Card Bifold", main: 1, tag: isNew },
  { handle: "morucha-men-s-distressed-hunter-leather-rfid-blocking-wallet-m105-dark-brown", name: "Men's M-105 Hunter Leather Wallet", main: 1, tag: isNew },
];

/** A mix of the established range: the women's clutches and the men's hunter-leather classics. */
const favourites: Pick[] = [
  { handle: "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95", name: "Women's M-95 Clutch Wallet", main: 1, hover: 3, tag: { label: "6 colours", tone: "navy" } },
  { handle: "mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown", name: "Men's M-100 Biker Wallet with Chain", main: 2, hover: 5, tag: { label: "31cm safety chain", tone: "navy" } },
  { handle: "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90", name: "Women's M-90 Flap-Over Clutch", main: 1, hover: 2, tag: { label: "5 colours", tone: "navy" } },
  { handle: "mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown", name: "Men's M-80 Distressed Hunter Wallet", main: 1, hover: 5 },
  { handle: "women-colorful-genuine-leather-rfid-purse", name: "Women's M-05 Colourful Purse", main: 1, hover: 2 },
  { handle: "minimalist-genuine-leather-rfid-wallet-black-orange", name: "Men's M-65 Slim Tap & Go Wallet", main: 1, hover: 4, tag: { label: "Tap & Go pocket", tone: "navy" } },
  { handle: "morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85", name: "Women's M-85 Compact Clutch Purse", main: 14, hover: 15, tag: { label: "4 colours", tone: "navy" } },
  { handle: "mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown", name: "Men's M-45 Hunter Trifold", main: 1, hover: 3 },
  { handle: "womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue", name: "Women's M-125 Long Clutch", main: 1, hover: 5 },
  { handle: "2-in-1-compact-business-card-holder-wallet", name: "M-40 2-in-1 Business Card Holder", main: 2, hover: 3 },
];

/* ------------------------------------------------------------------ header */

// The live store's own announcement, split into the two messages the bar cycles through
export const announcements = [
  { text: "Free UK delivery | Same-day dispatch before 3.30pm", href: "#delivery" },
  { text: "New for 2026 | Shop Now", href: "#new" },
];

export const utility = [
  { label: "Help", href: "#help" },
  { label: "Contact", href: "mailto:sales@morucha.co.uk" },
  { label: "Account", href: "#account" },
];

export type MegaColumn = { title: string; links: { label: string; href: string }[] };
export type NavItem = {
  label: string;
  href: string;
  accent?: boolean; // shown in the bull red, like the reference's sale link
  columns?: MegaColumn[];
  feature?: { image: string; alt: string; caption: string; href: string };
};

const L = (label: string, href = "#") => ({ label, href });

export const nav: NavItem[] = [
  {
    label: "Men",
    href: "#shop/men",
    columns: [
      { title: "Featured", links: [L("View All", "#shop/men"), L("New for 2026", "#new"), L("Gift Boxed"), L("Under £25")] },
      { title: "Wallets", links: [L("Bifold Wallets"), L("Trifold Wallets"), L("Billfold Wallets"), L("Passcase Wallets"), L("Vertical Wallets")] },
      { title: "Leathers", links: [L("Soft Leather"), L("Nappa Leather"), L("Distressed Hunter"), L("Oiled Hunter")] },
      { title: "Features", links: [L("Coin Pockets"), L("ID Windows"), L("Tap & Go Pocket"), L("Safety Chain"), L("Card Holders")] },
    ],
    feature: { image: "/images/banners/w960/v1-banner-1.webp", alt: "Black leather wallet with a tan lower panel and press-stud tab", caption: "Everyday Essentials", href: "#shop/men" },
  },
  {
    label: "Women",
    href: "#shop/women",
    columns: [
      { title: "Featured", links: [L("View All", "#shop/women"), L("Clutch Wallets"), L("Long Purses"), L("Colourful Purses")] },
      { title: "Shop by Colour", links: [L("Black"), L("Burgundy"), L("Red"), L("Fuchsia"), L("Grey"), L("Brown")] },
      { title: "Gifting", links: [L("Gifts for Her"), L("Mother's Day"), L("Christmas")] },
    ],
    feature: { image: "/images/banners/w960/women-wallet.webp", alt: "Woman holding a red leather purse", caption: "Clutch Wallets in Six Colours", href: "#shop/women" },
  },
  { label: "Card Holders", href: "#shop/card-holders" },
  {
    label: "Explore",
    href: "#explore",
    columns: [
      { title: "Morucha", links: [L("About Us", "#explore"), L("The Journal", "#journal"), L("Trade Enquiries", "mailto:sales@morucha.co.uk")] },
      { title: "Guides", links: [L("RFID Blocking, Explained", "#journal"), L("Choosing a Leather", "#journal"), L("The Gift Box", "#explore")] },
      { title: "Help", links: [L("Delivery", "#delivery"), L("Returns", "#help"), L("Contact Us", "mailto:sales@morucha.co.uk")] },
    ],
    feature: { image: "/images/banners/crafted-with.webp", alt: "Hands finishing a burgundy leather wallet beside leather tools", caption: "Leather, Wearing In", href: "#explore" },
  },
  {
    label: "Gifts",
    href: "#gifts",
    accent: true,
    columns: [
      { title: "Gifting", links: [L("Gifts for Him"), L("Gifts for Her"), L("Gifts Under £25")] },
      { title: "Occasions", links: [L("Birthdays"), L("Father's Day"), L("Christmas"), L("Anniversaries"), L("Weddings")] },
    ],
    feature: { image: "/images/banners/w960/insta-4.webp", alt: "Hands holding a black leather wallet beside its Morucha gift box", caption: "Every Piece, Gift Boxed", href: "#gifts" },
  },
];

/* ------------------------------------------------------------------ page */

// A slow, video-like sequence: each photo crossfades in and drifts closer. `focus` is the object-position.
export const hero = {
  title: "All-New 2026 Leather Wallets",
  ctas: [
    { label: "Shop Men's", href: "#shop/men" },
    { label: "Shop Women's", href: "#shop/women" },
  ],
  frames: [
    { src: "/images/banners/new-season.webp", alt: "Man in a blue suit holding a black and blue leather wallet", focus: "62% 40%" },
    { src: "/images/banners/insta-1.webp", alt: "Hands opening a burgundy leather wallet with an RFID card window", focus: "58% 45%" },
    { src: "/images/banners/new-leather-4.webp", alt: "Navy and yellow leather wallet open on a leather hide", focus: "55% 50%" },
    { src: "/images/banners/new-leather-5.webp", alt: "Hand holding an open red leather purse", focus: "60% 50%" },
  ],
};

export const categories = {
  title: "Made to Carry, Every Day",
  items: [
    { label: "Men's", href: "#shop/men", image: "/images/banners/w960/men-wallet.webp", alt: "Hand holding a black leather wallet with a tan edge" },
    { label: "Women's", href: "#shop/women", image: "/images/banners/w960/women-wallet.webp", alt: "Woman holding a red leather purse" },
    { label: "Card Holders", href: "#shop/card-holders", image: "/images/banners/w960/card-holder.webp", alt: "Hands sliding cards into a black leather card holder" },
    { label: "New for 2026", href: "#new", image: "/images/banners/w960/since-2.webp", alt: "Six black leather wallets with tan, red, green and orange trims" },
    { label: "Hunter Leather", href: "#shop/hunter", image: "/images/banners/w960/since-1.webp", alt: "Craftsman finishing a tan hunter leather wallet with an edge tool" },
    { label: "Gift Boxed", href: "#gifts", image: "/images/banners/w960/gifts-under.webp", alt: "Grey leather wallet beside its Morucha gift box" },
  ],
};

export const banner = {
  title: "Everyday Essentials",
  ctas: [
    { label: "Shop Wallets", href: "#shop/men" },
    { label: "Shop Purses", href: "#shop/women" },
  ],
  image: "/images/banners/v1-banner-1.webp",
  alt: "Black leather wallet with a tan lower panel on a dark leather surface",
};

export const newRail = { id: "new", title: "New for 2026", items: newIn.map(toV8) };
export const favouritesRail = { id: "favourites", title: "Morucha Favourites", items: favourites.map(toV8) };

// Live counts from the store data: every listing mentions RFID blocking in its title or description
const rfidCount = products.filter((p) => /rfid/i.test(p.title + p.description)).length;

export const statement = {
  eyebrow: "The Morucha promise",
  /** Plain words, plus one { link } phrase that is underlined in navy. From the About page's own claim. */
  parts: [
    "We have sold tens of thousands of wallets to customers worldwide, all built on one simple idea: everyday leather that",
    { link: "quietly protects what you carry", href: "#journal" },
    "and only gets better with age.",
  ] as (string | { link: string; href: string })[],
  facts: [
    { value: String(products.length), label: rfidCount === products.length ? "Styles, every one with RFID blocking" : `Styles, ${rfidCount} with RFID blocking` },
    { value: formatPrice(Math.min(...products.map((p) => p.price))), label: "Prices from, for genuine leather" },
    { value: "3.30pm", label: "Order by for same-day dispatch" },
    { value: "Free", label: "UK delivery in 3–5 working days" },
  ],
  photo: { src: "/images/banners/crafted-with.webp", alt: "Hands finishing a burgundy leather wallet beside leather tools" },
  inset: { src: "/images/banners/w960/insta-6.webp", alt: "Hands opening a red leather wallet" },
};

export const feature = {
  id: "leathers",
  title: "Made to Wear In",
  text: "Every piece is genuine leather, and it develops a unique vintage patina over time. The more you carry it, the better it looks.",
  cta: { label: "Discover Our Leathers", href: "#journal" },
  image: "/images/banners/leather-pieces.webp",
  alt: "Black and tan leather wallet pieces and tools laid out on a green cutting mat",
  badge: "Genuine Leather · RFID Protected · Gift Boxed ·",
};

export const explore = {
  id: "explore",
  items: [
    { label: "Protection", title: "RFID Blocking, Explained", href: "#journal", image: "/images/banners/card-holder-new.webp", alt: "Hands sliding a card into a brown leather wallet full of cards and notes" },
    { label: "Our Leathers", title: "Nappa, Hunter & Soft Leather", href: "#journal", image: "/images/banners/w960/new-leather-1.webp", alt: "Fan of coloured leather swatches beside black and brown wallets" },
    { label: "Gifting", title: "The Morucha Gift Box", href: "#gifts", image: "/images/banners/w960/insta-4.webp", alt: "Hands holding a black leather wallet beside its Morucha gift box" },
    { label: "Delivery", title: "Free UK Delivery", href: "#delivery", image: "/images/banners/w960/insta-2.webp", alt: "Hands holding a brown wallet among black and blue leather wallets" },
    { label: "Trade", title: "Retail & Wholesale", href: "mailto:sales@morucha.co.uk?subject=Trade%20enquiry", image: "/images/banners/w960/new-leather-6.webp", alt: "Leather belts, wallets and key fobs laid out in rows" },
  ],
};

// Proposed journal articles [TBC: to be written]; each excerpt only uses facts from the store's product listings.
export const journal = {
  id: "journal",
  title: "The Journal",
  posts: [
    {
      category: "Guides",
      title: "What RFID Blocking Really Does",
      excerpt: "Contactless cards answer any reader in range. Morucha wallets are lined to block 13.56 MHz signals, so your cards only pay when you hand them over.",
      image: "/images/banners/w960/insta-1.webp",
      alt: "Hands opening a burgundy leather wallet with an RFID card window",
      href: "#journal",
    },
    {
      category: "Leather",
      title: "Hunter, Nappa or Soft Leather?",
      excerpt: "Smooth nappa cowhide, distressed hunter that wears in, or soft everyday leather: a short guide to the hides in the range and how each one ages.",
      image: "/images/banners/tanned-with.webp",
      alt: "Black, brown and two-tone leather wallets on a wooden table",
      href: "#journal",
    },
    {
      category: "Gifting",
      title: "Gifts for Every Occasion",
      excerpt: "Birthdays, Father's Day, Christmas, anniversaries and weddings: almost every Morucha piece arrives in its own branded gift box, ready to give.",
      image: "/images/banners/w960/insta-3.webp",
      alt: "Hands opening a brown leather wallet beside a Morucha gift box",
      href: "#gifts",
    },
  ],
};

export const newsletter = {
  title: "Sign up to our mailing list",
  text: "Promotions, new products and sales. Directly to your inbox.",
  popupTitle: "Be the first to know",
  popupImage: "/images/banners/w960/banner-image-1.webp",
  popupAlt: "Woman holding a blue and red leather purse",
  interests: ["Menswear", "Womenswear", "Both"],
};

// Delivery and returns from the store's shipping and refund policies
export const service = [
  { title: "Free UK delivery", text: "Standard delivery in 3–5 working days, or next day for £5.99" },
  { title: "Same-day dispatch", text: "On orders received before 3.30pm" },
  { title: "Worldwide delivery", text: "Free trackable delivery in 7–21 working days, or express for £16.99" },
  { title: "30-day returns", text: "Unused, in the original packaging" },
];

export const footer = {
  groups: [
    { title: "Company", links: [L("About Us", "#explore"), L("The Journal", "#journal"), L("Trade Enquiries", "mailto:sales@morucha.co.uk?subject=Trade%20enquiry")] },
    { title: "Customer Support", links: [L("Contact Us", "mailto:sales@morucha.co.uk"), L("Shipping Policy", "#delivery"), L("Refund Policy", "#help"), L("My Account", "#account")] },
    { title: "Legal", links: [L("Terms of Service"), L("Privacy Policy"), L("GDPR Compliance"), L("Cookie Settings")] },
  ],
  contact: [
    { label: "sales@morucha.co.uk", href: "mailto:sales@morucha.co.uk" },
    { label: "Write to Us", href: "mailto:sales@morucha.co.uk" },
    { label: "Trade Enquiries", href: "mailto:sales@morucha.co.uk?subject=Trade%20enquiry" },
  ],
  address: ["272 Kings Road, Tyseley", "Birmingham B11 2AB"],
  // The store's own payment icons that we have artwork for (it also takes Diners Club, Discover, Maestro, Shop Pay and Union Pay)
  payments: ["visa", "mastercard", "amex", "applepay", "googlepay"],
  legal: "Morucha™ is a trading name of RAS Trading Europe Limited, registered in England and Wales, company no. 08626748.",
};
