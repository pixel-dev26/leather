// v12 home page, client: Cuero (cuero.in). Layout and section types are v12's (v12rule.md); the logo, photographs,
// workshop film, product names and prices are Cuero's own, used with Cuero's permission (collected 28 Oct 2026 from
// cuero.in and its Shopify product feed; files in /public/images/cuero). Headings and lines are newly written from
// Cuero's stated facts (made to order, ships within 25 days, Pune atelier since 2014, free shipping across India) for
// Cuero to approve. [TBC] marks anything Cuero still has to supply. Board: https://claude.ai/artifact/JAVtWyBpZzFERyBKMSExrq
// The Morucha v12 this replaced is in git history at commit 05d2f9f.

const c = (file: string) => `/images/cuero/${file}.webp`;
const shoe = (file: string) => `/images/cuero/products/${file}.webp`;
const store = (handle: string) => `https://cuero.in/products/${handle}`;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const logo = "/images/cuero/logo.png";

/* ------------------------------------------------------------------ products */

export type NumberedCard = {
  handle: string;
  name: string;
  price: string;
  href: string;
  image: { src: string; alt: string };
  hover?: string;
  swatches: { name: string; fill: string }[];
  tag?: string;
};

const hex = { brown: "#5a3624", black: "#1d1b1a", blue: "#2b3550", green: "#3f4a34", chestnut: "#8a4b2a", tan: "#b07a45" };
const sw = (...names: (keyof typeof hex)[]) => names.map((n) => ({ name: n[0].toUpperCase() + n.slice(1), fill: hex[n] }));

// Cuero's store names without the brand prefix, its prices, and its own photos (first photo, second on hover)
function product(handle: string, name: string, price: number, swatches: NumberedCard["swatches"], files = handle, compareAt?: number): NumberedCard {
  return {
    handle,
    name,
    price: inr(price),
    href: store(handle),
    image: { src: shoe(`${files}-1`), alt: `Cuero ${name}` },
    hover: shoe(`${files}-2`),
    swatches,
    tag: compareAt ? `Was ${inr(compareAt)}` : undefined,
  };
}

// From Cuero's "New Arrival" collection
export const newIn = {
  title: "New Arrivals",
  items: [
    product("dark-brown-derby-shoes-for-men-full-grain-calf-leather", "Royce Derby", 15900, sw("brown", "black"), "royce-derby"),
    product("cuero-matrix-monks", "Meridian Matrix Monks", 15900, sw("brown")),
    product("cuero-stride-pebble-grain-loafers-midnight-blue", "Meridian Stride Pebble-Grain Loafers", 15900, sw("blue")),
    product("cuero-legacy-mules", "Meridian Legacy Mules", 12500, sw("brown")),
    product("cuero-signature-woven-sliders", "Meridian Signature Woven Sliders", 9500, sw("tan")),
    product("cuero-chairman-briefcase", "Chairman Briefcase", 7650, sw("black", "brown", "green", "blue"), undefined, 8999),
  ],
};

// From Cuero's "Top Picks" collection
export const bestsellers = {
  title: "Top Picks",
  items: [
    product("ascent-peshawari-sandals-brown", "Ascent Peshawari Sandals Brown", 12500, sw("brown")),
    product("ascent-kensington-suede-loafers-blue", "Ascent Kensington Suede Loafers Blue", 15900, sw("blue")),
    product("cuero-jodhpur-boots-chestnut", "Jodhpur Boots Chestnut", 17900, sw("chestnut")),
    product("sliders-in-blue-goat-suede-arch-support-comfort", "Azure Sliders", 8500, sw("blue")),
    product("parker-brown", "Parker Loafers Brown", 16900, sw("brown")),
    product("cuero-obsidian-tommy-loafers", "Obsidian Tommy Loafers", 14900, sw("black")),
    product("amari-loafers-black", "Amari Loafers Black", 14900, sw("black")),
    product("peshawari-sandals-men", "Peshawari Sandals", 12500, sw("brown")),
  ],
};

/* ------------------------------------------------------------------ header */

export const announcement = "Every pair is made to order and ships within 25 days. Free shipping across India.";

export const navLeft = [
  { label: "New Arrivals", href: "#new" },
  { label: "Loafers", href: "#styles" },
  { label: "Oxfords & Derbies", href: "#styles" },
  { label: "Sliders & Sandals", href: "#styles" },
  { label: "Accessories", href: "#new" },
];
export const navRight = [{ label: "Our Story", href: "#story" }];

/* ------------------------------------------------------------------ sections */

export const hero = {
  title: "The Meridian Line",
  text: "Six new monks, loafers, mules and sliders.",
  cta: { label: "Explore the Collection", href: "#new" },
  image: { src: c("hero"), alt: "Cuero loafers and sandals on brass plinths beside lit diyas" },
};

export const pairs = [
  [
    { id: "derby", title: "Derby", href: "#styles", image: { src: c("col-derby"), alt: "Brown derby shoes on sunlit stone steps", position: "50% 70%" } },
    { id: "moccasins", title: "Moccasins", href: "#styles", image: { src: c("col-moccasins"), alt: "Black and brown moccasins on a terracotta floor", position: "50% 60%" } },
  ],
];

export const leathers = {
  title: "Choose Your Leather",
  text: "Full-grain calf for a sharp shine, suede for a softer finish, pebble grain for texture, or woven leather for summer. Pick the leather, then the shape.",
  items: [
    { title: "Full-grain Calf", href: "#new", fit: "contain", image: { src: shoe("royce-derby-5"), alt: "Royce Derby in full-grain calf leather" } },
    { title: "Suede", href: "#bestsellers", fit: "contain", image: { src: shoe("ascent-kensington-suede-loafers-blue-1"), alt: "Kensington loafers in blue suede" } },
    { title: "Pebble Grain", href: "#new", fit: "contain", image: { src: shoe("cuero-stride-pebble-grain-loafers-midnight-blue-1"), alt: "Stride loafers in midnight-blue pebble-grain leather" } },
    { title: "Woven", href: "#new", fit: "contain", image: { src: shoe("cuero-signature-woven-sliders-1"), alt: "Signature sliders in woven leather" } },
  ],
};

export const story = {
  title: "Since 2014",
  text: "Cuero has been making shoes in its Pune atelier since 2014: leather from established tanneries, cut and finished by its own craftsmen, and each pair made once it’s ordered.",
  cta: { label: "Our Story", href: "https://cuero.in/pages/our-story" },
};

/* ------------------------------------------------------------------ footer */

export const footer = {
  columns: [
    { title: "Shop", links: ["New Arrivals", "Footwear", "Accessories", "Gift Cards"] },
    { title: "Explore", links: ["Our Story", "Contact Us", "Journal"] },
    { title: "Help", links: ["Shipping", "Refunds", "Privacy", "Terms"] },
  ],
  newsletter: { title: "Join the List", text: "New pairs and workshop news, by email." },
  region: "India (INR ₹)",
  copyright: `© ${new Date().getFullYear()} Cuero`,
};

export const contact = { title: "Cuero", lines: ["Sr no 33/1/4/1, Pandurang Industrial Area,", "Wadgaon Khurd, Pune 411041", "info@cuero.in"] };

/* ------------------------------------------------------------------ revision 2 sections */

export const factsStrip = ["Made in India", "Made in our Pune atelier", "Crafting since 2014", "Made to order", "Free shipping across India"];

// Counts are the sizes of Cuero's own collections on 28 Oct 2026
export const styles = {
  title: "Shop by Style",
  all: { label: "All styles", href: "https://cuero.in/collections/footwear" },
  items: [
    { title: "Loafers", count: 24, handle: "loafers", image: { src: c("col-loafers"), alt: "Brown penny loafers against a green wall", position: "50% 70%" } },
    { title: "Oxfords", count: 7, handle: "oxfords-1", image: { src: c("col-oxfords"), alt: "Black oxfords on a dark plinth", position: "50% 60%" } },
    { title: "Monks", count: 7, handle: "monks-1", image: { src: c("col-monks"), alt: "Burgundy double-monk shoes against a pink arch", position: "50% 70%" } },
    { title: "Sliders", count: 12, handle: "sliders-1", image: { src: c("col-slides"), alt: "Black and navy leather sliders against a lilac wall", position: "50% 60%" } },
    { title: "Sandals", count: 2, handle: "sandals", image: { src: c("col-sandals"), alt: "Brown Peshawari sandals on white steps", position: "50% 70%" } },
    { title: "Boots", count: 2, handle: "boots-1", image: { src: c("col-boots"), alt: "Chestnut boots in a terracotta alcove", position: "50% 70%" } },
  ].map((s) => ({ ...s, href: `https://cuero.in/collections/${s.handle}` })),
};

// The Royce Derby up close; facts from its listing on cuero.in
export const detail = {
  label: "The Detail",
  title: "Royce Derby",
  facts: [
    { label: "Upper", value: "Full-grain calf leather" },
    { label: "Construction", value: "Goodyear-welted, stitched leather sole" },
    { label: "Style", value: "Plain toe, three eyelets" },
    { label: "Colours", value: "Brown, Black" },
    { label: "Sizes", value: "UK 4–13" },
    { label: "Price", value: inr(15900) },
  ],
  main: { src: shoe("royce-derby-3"), alt: "A pair of Royce Derby shoes in dark brown" },
  thumbs: [
    { src: shoe("royce-derby-6"), alt: "Royce Derby from the side" },
    { src: shoe("royce-derby-8"), alt: "Royce Derby showing the stitched leather sole" },
  ],
  cta: { label: "Shop the Royce", href: store("dark-brown-derby-shoes-for-men-full-grain-calf-leather") },
};

export const rangeBanner = {
  title: "The Elite Crafts",
  text: "A short edit of Cuero’s most finished pairs, for the occasions that ask for them.",
  cta: { label: "Discover the Edit", href: "https://cuero.in/collections/elite-crafts" },
  image: { src: c("elite-crafts"), alt: "Grey tasselled loafer stepping past a vintage trunk", position: "30% 50%" },
  align: "right" as const,
};

export const lookbook = {
  title: "In the Making",
  text: "Stills from Cuero’s workshop film.",
  items: [
    { caption: "Lasting", image: { src: c("film-f24"), alt: "Hands smoothing an insole onto a shoe last", position: "40% 50%" } },
    { caption: "Cutting", image: { src: c("film-f45"), alt: "Cutting a leather pattern by hand", position: "50% 50%" } },
    { caption: "Patterns", image: { src: c("film-f9"), alt: "Trimming a paper pattern with a knife", position: "50% 50%" } },
    { caption: "The last", image: { src: c("film-f3"), alt: "A shoe last on the workbench", position: "50% 60%" } },
  ],
};

export const craftBanner = {
  title: "Behind Every Pair",
  text: "Cut, lasted and stitched by hand in Cuero’s Pune atelier.",
  cta: { label: "Our Story", href: "#story" },
  image: { src: c("film-f33"), alt: "A craftsman at the workbench", position: "50% 50%" },
  video: "/images/cuero/workshop-loop.mp4",
  align: "left" as const,
};

// Verified reviews to be supplied by Cuero; nothing here is invented.
export const reviews = {
  title: "What customers say",
  rating: "[TBC: rating and number of reviews]",
  image: { src: c("film-f16"), alt: "Finishing a shoe at the bench" },
  items: [
    { quote: "[A verified Cuero customer review, supplied by Cuero.]", name: "[Name]", product: "[product]" },
    { quote: "[A second verified review: TBC.]", name: "[Name]", product: "[product]" },
    { quote: "[A third verified review: TBC.]", name: "[Name]", product: "[product]" },
  ],
};

export const promises = [
  { icon: "van", title: "Free Shipping", text: "On every pair, anywhere in India." },
  { icon: "hide", title: "Chosen Leather", text: "Sourced from established tanneries." },
  { icon: "needle", title: "Made by Hand", text: "Cut, lasted and stitched in our Pune atelier." },
  { icon: "box", title: "Made to Order", text: "Your pair is made once you order it. Allow up to 25 days." },
] as const;
