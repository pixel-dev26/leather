// All v3 home page copy lives here (design rules: v3rule.md). Anything marked [TBC] needs confirming by
// Morucha before launch: no claims below are verified facts unless marked otherwise.
// Product photos are Morucha's own (./shop.ts, saved locally). Every other photo comes from ./images-v3.ts:
// temporary Pexels stock images that must be replaced.

import { banners, community, photos, type BannerArt } from "./images-v3";
import { colourways, shop } from "./shop";

/** Fired by "Add to basket"; the header listens and updates the basket count. */
export const ADD_TO_BASKET_EVENT = "morucha:add-to-basket";

export type Tone = "light" | "dark";
export type Link = { label: string; href: string };

export const promo = {
  text: "Free worldwide delivery",
  pill: "Same-day dispatch before 3:30pm",
  href: "#bestsellers",
};

export const nav: (Link & { accent?: boolean })[] = [
  { label: "Leathers", href: "#leathers" },
  { label: "Leather Goods", href: "#bestsellers" },
  { label: "Collections", href: "#collections" },
  { label: "The Process", href: "#process" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Trade", href: "#trade", accent: true },
  { label: "Our Story", href: "#story" },
];

export type Slide = { title: string; text: string; cta: Link; art: BannerArt; alt: string; tone: Tone };

export const hero: Slide[] = [
  {
    title: "Made to age well",
    text: "Wallets, purses and cardholders cut from our own hides.",
    cta: { label: "Shop now", href: "#bestsellers" },
    art: banners.orange,
    alt: "A single orange leather card wallet on a beige background",
    tone: "light",
  },
  {
    title: "Everyday carry",
    text: "Slim wallets and cardholders made for daily use.",
    cta: { label: "Shop now", href: "#collections" },
    art: banners.tanRows,
    alt: "Rows of tan leather card wallets on cream",
    tone: "light",
  },
  {
    title: "Hides for makers",
    text: "By the hide, half-hide or swatch, with no minimum order.",
    cta: { label: "Explore leathers", href: "#leathers" },
    art: banners.gifting,
    alt: "Leather wallets wrapped with ribbon and gift paper",
    tone: "light",
  },
];

export const statement = {
  title: "Tanned by hand since [year TBC]",
  text: "Every hide is chosen, tanned and finished by hand. So the leather you work with is worth keeping for a lifetime.",
  cta: { label: "Our story", href: "#story" },
};

export type Tile = { name: string; note?: string; href: string; image: string; alt: string };

export const leathers = {
  title: "Our leathers",
  link: { label: "View All", href: "#" },
  tabs: [
    {
      label: "Hides",
      items: [
        { name: "Vegetable Tanned Side", note: "From £XX / sq ft", href: "#", image: photos.brownShades, alt: "Rows of leather wallets in shades of brown" },
        { name: "Full Grain Calf", note: "From £XX / sq ft", href: "#", image: photos.topCollection, alt: "Brown and tan full-grain wallets from above" },
        { name: "Pebble Grain", note: "From £XX / sq ft", href: "#", image: photos.pinkSet, alt: "Brown leather wallets on a pink surface" },
        { name: "Smooth Calf", note: "From £XX / sq ft", href: "#", image: photos.blackWood, alt: "Black leather wallets on wood" },
      ],
    },
    {
      label: "Leather goods",
      items: [
        { name: "Wallets", note: "[n] pieces", href: "#bestsellers", image: photos.openWallets, alt: "Open leather wallets showing their pockets" },
        { name: "Purses", note: "[n] pieces", href: "#bestsellers", image: photos.orangeBooks, alt: "Orange leather wallets with books" },
        { name: "Cardholders", note: "[n] pieces", href: "#bestsellers", image: photos.orangeBrownCards, alt: "Orange and brown leather cardholders" },
        { name: "Passport Wallets", note: "[n] pieces", href: "#featured", image: photos.smallCards, alt: "Small leather cardholders on cream" },
      ],
    },
    {
      label: "Gifts",
      items: [
        { name: "Gift Sets", note: "[Range TBC]", href: "#collections", image: photos.giftWrap, alt: "Leather wallets wrapped as gifts" },
        { name: "Wallet & Card Sets", note: "[Range TBC]", href: "#collections", image: photos.woodWall, alt: "Wallets and accessories on a wooden background" },
        { name: "Handmade Wallets", note: "[Range TBC]", href: "#collections", image: photos.handsThree, alt: "Hands holding three handmade wallets" },
        { name: "Everyday Carry", note: "[Range TBC]", href: "#collections", image: photos.backPocket, alt: "A wallet in a jeans back pocket" },
      ],
    },
  ] as { label: string; items: Tile[] }[],
};

export type Product = {
  name: string;
  meta: string;
  price: string;
  compareAt?: string;
  promo?: string;
  category: "Wallets" | "Purses" | "Cardholders" | "Gifts";
  /** Colour dots; a colour with its own photo swaps the card image. */
  colours?: { name: string; swatch: string; image?: string }[];
  image: string;
  alt: string;
  fit?: "contain"; // studio packshot on white
};

const dots = (list: { name: string; swatch: string; images: string[] }[]) => list.map((c) => ({ name: c.name, swatch: c.swatch, image: c.images[0] }));

// Real Morucha products (./shop.ts) with their store prices and photos.
export const bestsellers = {
  title: "Bestsellers",
  link: { label: "View All", href: "#" },
  tabs: ["All", "Wallets", "Purses", "Cardholders", "Gifts"] as const,
  items: [
    { name: shop.bifoldCoin.name, meta: "Available in 4 colours", price: shop.bifoldCoin.priceLabel, promo: "Bestseller", category: "Wallets", colours: dots(colourways.bifoldCoin), image: shop.bifoldCoin.photo(11), alt: "Black and tan leather bifold wallet", fit: "contain" },
    { name: shop.longClutch.name, meta: "Available in 6 colours", price: shop.longClutch.priceLabel, promo: "Bestseller", category: "Purses", colours: dots(colourways.longClutch), image: shop.longClutch.photo(1), alt: "Burgundy leather long clutch wallet", fit: "contain" },
    { name: shop.verticalCoin.name, meta: "Available in 2 colours", price: shop.verticalCoin.priceLabel, promo: "New", category: "Wallets", colours: dots(colourways.verticalCoin), image: shop.verticalCoin.photo(5), alt: "Tan and black vertical leather wallet", fit: "contain" },
    { name: shop.cardHolder.name, meta: "Genuine leather · Black", price: shop.cardHolder.priceLabel, category: "Cardholders", image: shop.cardHolder.photo(2), alt: "Black leather card holder wallet, open", fit: "contain" },
    { name: shop.flapClutch.name, meta: "Available in 5 colours", price: shop.flapClutch.priceLabel, category: "Purses", colours: dots(colourways.flapClutch), image: shop.flapClutch.photo(1), alt: "Burgundy leather flap clutch purse", fit: "contain" },
    { name: shop.slimCard.name, meta: "Slim bifold · Tan", price: shop.slimCard.priceLabel, category: "Cardholders", image: shop.slimCard.photo(1), alt: "Tan slim card wallet with its gift box", fit: "contain" },
    { name: shop.tapAndGo.name, meta: "Slim passcase · Black", price: shop.tapAndGo.priceLabel, category: "Cardholders", image: shop.tapAndGo.photo(1), alt: "Black tap and go wallet with its gift box", fit: "contain" },
    { name: shop.giftPasscase.name, meta: "Soft leather · Burgundy", price: shop.giftPasscase.priceLabel, promo: "Gift boxed", category: "Gifts", image: shop.giftPasscase.photo(5), alt: "Burgundy leather passcase wallet", fit: "contain" },
    { name: shop.twoToneBifold.name, meta: "Soft leather · Black / Tan", price: shop.twoToneBifold.priceLabel, category: "Gifts", image: shop.twoToneBifold.photo(1), alt: "Black and tan two-tone bifold wallet", fit: "contain" },
  ] as Product[],
};

export type Story = { title: string; text: string; cta: Link; image: string; alt: string };

export const discover = {
  title: "Discover Morucha",
  link: { label: "View All", href: "#" },
  items: [
    { title: "Crafted by nature", text: "Refined by hand", cta: { label: "Discover our leather", href: "#leathers" }, image: photos.handsThree, alt: "Hands holding three handmade leather wallets" },
    { title: "Tanned with patience", text: "Built to last", cta: { label: "Meet our story", href: "#story" }, image: photos.cameraWoodTall, alt: "Handmade wallets and a film camera on wood" },
    { title: "New season", text: "Find your favourite", cta: { label: "Shop now!", href: "#bestsellers" }, image: photos.handCardholder, alt: "A hand holding a leather cardholder" },
  ] as Story[],
};

// Morucha's M85 compact clutch wallet: every colour with its own photos. Details are from its store listing.
export const spotlight = {
  title: "Featured piece",
  link: { label: "View All", href: "#" },
  name: shop.compactClutch.name,
  price: shop.compactClutch.priceLabel,
  compareAt: undefined as string | undefined, // not on sale
  priceNote: "Inclusive of VAT",
  sku: "M-85",
  colours: colourways.compactClutch.map((c) => ({ name: c.name, hex: c.swatch, images: c.images })),
  offers: [
    { icon: "truck", text: "Free worldwide delivery on every order" },
    { icon: "clock", text: "Order before 3:30pm for same-day dispatch" },
  ] as { icon: "truck" | "clock" | "tag"; text: string }[],
  details: [
    { title: "Product Details", text: "An elegant addition to any handbag: eight card slots, four slip-in pouches for business cards or receipts, two full-length note compartments and a zipped coin compartment with two ID slots, all held shut by a fold-over tab." },
    { title: "Specifications", text: "Material: genuine leather · Dimensions: 13.5 × 9.5 × 3.5 cm · RFID-blocking lining · Comes in a branded Morucha gift box." },
    { title: "Delivery Time & Returns", text: "Free worldwide delivery. Orders placed before 3:30pm are dispatched the same working day. [Returns policy TBC.]" },
  ],
};

export type Banner = { id: string; title: string; text: string; cta: Link; art: BannerArt; alt: string; tone: Tone; points?: { icon: "box" | "scale" | "tag"; text: string }[] };

export const story: Banner = {
  id: "story",
  title: "Our story",
  text: "A tannery built on patience. Good leather can't be rushed.",
  cta: { label: "Read our story", href: "#" },
  art: banners.workshop,
  alt: "Handmade leather wallets and a film camera on a wooden bench",
  tone: "dark",
};

export const process = {
  title: "The process",
  link: { label: "Discover the process", href: "#" },
  steps: [
    { name: "01 · Selection", meta: "Each raw hide is graded by eye and touch.", image: photos.brownShades, alt: "Leather in many shades of brown" },
    { name: "02 · Preparation", meta: "Soaked, cleaned and fleshed to open the fibres.", image: photos.cuttingMat, alt: "Leather pieces on a cutting mat" },
    { name: "03 · Tanning", meta: "[Tanning method TBC, e.g. vegetable tannins.]", image: photos.topCollection, alt: "Tanned wallets from above" },
    { name: "04 · Drying", meta: "Hung and dried slowly, then staked to soften.", image: photos.stitchWood, alt: "Close-up of leather stitching" },
    { name: "05 · Finishing", meta: "Oiled, dyed and finished by hand.", image: photos.openWallets, alt: "Finished wallets, open" },
  ],
};

export const collections = {
  title: "Shop by collection",
  link: { label: "View All", href: "#" },
  items: [
    { title: "Men's wallets", text: "[n] pieces", cta: { label: "Shop now!", href: "#" }, image: photos.backPocket, alt: "A wallet in a jeans back pocket" },
    { title: "Women's purses", text: "[n] pieces", cta: { label: "Shop now!", href: "#" }, image: photos.orangeBooks, alt: "Orange leather purses with books" },
    { title: "Cardholders", text: "[n] pieces", cta: { label: "Shop now!", href: "#" }, image: photos.orangeBrownCards, alt: "Orange and brown cardholders" },
    { title: "Handmade", text: "[n] pieces", cta: { label: "Shop now!", href: "#" }, image: photos.cuttingMat, alt: "Handmade wallets on a cutting mat" },
  ] as Story[],
};

export const sustainability: Banner = {
  id: "sustainability",
  title: "Responsibly tanned",
  text: "Leather is a by-product. We treat it as a gift: traceable hides, less water, and pieces made to last.",
  cta: { label: "Our commitments", href: "#" },
  art: banners.stitch,
  alt: "A brown leather wallet on pale wood",
  tone: "light",
};

export const makers = {
  title: "Made with Morucha",
  text: "Follow @morucha [TBC] and tag #MadeWithMorucha to join our community of makers",
  href: "#",
  images: community,
};

export const trade: Banner = {
  id: "trade",
  title: "Trade & wholesale",
  text: "Whether you make one bag a month or stock a shop full of leather goods, we'll help you find the right hide.",
  cta: { label: "Enquire now", href: "mailto:sales@morucha.co.uk?subject=Trade%20account" },
  art: banners.studio,
  alt: "Leather wallets and cardholders on coloured studio boxes",
  tone: "dark",
  points: [
    { icon: "box", text: "Free swatch box, posted across the UK" },
    { icon: "scale", text: "No minimum order: a hide, a half-hide or a pallet" },
    { icon: "tag", text: "Trade pricing for makers and retailers" },
  ],
};

export const footer = {
  newsletter: "Get first look at new leathers, limited runs & tannery news",
  columns: [
    { title: "Know us", links: ["Our Story", "The Process", "Sustainability", "Made with Morucha", "Leather Care"] },
    { title: "Help desk", links: ["Contact Us", "Delivery", "Returns & Refunds", "FAQs", "Trade Account"] },
  ],
  accordions: [
    { title: "Popular on Morucha", links: ["Leather hides", "Swatch box", "Card wallets", "Zip wallets", "Cardholders", "Purses"] },
    { title: "Leather guides", links: ["Vegetable vs chrome tanning [TBC]", "Caring for leather", "Choosing a hide"] },
    { title: "Gifts", links: ["Gifts for him", "Gifts for her", "Corporate gifts"] },
  ],
  socials: ["Instagram", "Facebook", "Pinterest", "YouTube"] as const,
  payments: ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"],
  copyright: "© 2026 Morucha. All rights reserved.",
  legal: ["Terms of use", "Privacy policy"],
};
