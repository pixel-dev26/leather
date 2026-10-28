// Morucha home page copy as it was before v1 became the Fitting Belt version. v2 still reuses parts of it.
// All home page copy lives here. Anything wrapped in [TBC] needs confirming by Morucha
// before launch: no claims below are verified facts unless marked otherwise.
// Headings support *italic accents* and \n line breaks.
// Product photos are Morucha's own (./shop.ts, saved locally). Every other photo comes from ./images.ts:
// temporary reference images that must be replaced.

import { img } from "./images";
import { colourways, shop } from "./shop";

// fit "contain" marks a studio packshot on white: shown whole, with the white blended into the tile colour.
// position is the photo's object-position in a cropped slot (e.g. "35% 50%"), when the default centre misses the subject.
export type ImageSlot = { src?: string; alt: string; tone?: "dark" | "mid" | "light"; fit?: "contain"; position?: string };

/** A product photo slot (studio shot on white). */
export const pack = (src: string, alt: string): ImageSlot => ({ src, alt, fit: "contain" });

export const announcement = "Free UK delivery  ·  Order before 3:30pm for same-day dispatch";

export const nav = [
  { label: "Leather", href: "#leathers" },
  { label: "Leather Goods", href: "#collections" },
  { label: "The Process", href: "#process" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Trade", href: "#trade" },
  { label: "About", href: "#story" },
];

export const hero = {
  label: "British Leather · Tanned with Care",
  title: "Leather that\nages *with you*",
  text: "From our tannery to your workbench, and into the wallets and bags we make ourselves.",
  primary: { label: "Shop leather goods", href: "#collections" },
  secondary: { label: "Explore our leather", href: "#leathers" },
  slides: [
    { src: img.heroHands, alt: "Hands holding a leather card wallet at a desk" },
    // 1600px WebP copy of public/images/banners/v1-banner-1.png
    { src: "/images/banners/w1600/v1-banner-1.webp", alt: "Black and tan Morucha leather bifold wallet on black leather" },
    { src: "/images/banners/v1-banner-3.webp", alt: "Man in a blue suit holding a navy Morucha leather wallet" },
  ] as ImageSlot[],
};

export const statement = {
  label: "Since [YEAR TBC]",
  text: "Every hide is chosen, tanned and finished *by hand*. So the leather you work with is worth keeping for a lifetime.",
  // Morucha's own photos: 960px WebP copies of public/images/banners/since-1.png and since-2.png
  images: [
    { src: "/images/banners/w960/since-1.webp", alt: "Craftsman finishing a tan leather wallet with an edge tool" },
    { src: "/images/banners/w960/since-2.webp", alt: "Six black Morucha leather wallets with tan, red, green and orange trims arranged in a circle" },
  ] as ImageSlot[],
};

export const leathers = {
  label: "Our Leathers",
  title: "Shop the *Hides*",
  subtitle: "By the hide, half-hide or swatch, with no minimum order",
  link: { label: "View all leathers", href: "#" },
  // Main photos are Morucha's own (WebP copies of public/images/banners/new-leather-1.png … 6.png); hover photos are still references
  items: [
    { name: "Vegetable Tanned Side", note: "Firm, natural, ages to a rich patina", meta: "Natural · 3.0–3.5mm", price: "From £XX / sq ft", tag: "Bestseller", image: { src: "/images/banners/w960/new-leather-1.webp", alt: "Fan of coloured leather swatches beside Morucha wallets" }, hover: { src: img.tooling, alt: "Vegetable-tanned leather being tooled" } },
    { name: "Full Grain Calf", note: "The strongest, most honest cut of the hide", meta: "Ink & Mustard · 1.2mm", price: "From £XX / sq ft", image: { src: "/images/banners/w1600/new-leather-2.webp", alt: "Navy and mustard full-grain leather panels beside a black Morucha wallet", position: "30% 50%" }, hover: { src: img.walletNavy, alt: "Full-grain calf made into a wallet" } },
    { name: "Pebble Grain", note: "Textured, hard-wearing, beautifully even", meta: "12 colours · 1.4mm", price: "From £XX / sq ft", tag: "New", image: { src: "/images/banners/w960/new-leather-3.webp", alt: "Cut pebble-grain wallet pieces and tools on a green cutting mat" }, hover: { src: img.cardYellow, alt: "Pebble-grain card case" } },
    { name: "Smooth Calf", note: "Smooth, fine and soft for small goods", meta: "Sky & Taupe · 1.0mm", price: "From £XX / sq ft", image: { src: "/images/banners/w1600/new-leather-4.webp", alt: "Open navy and mustard leather trifold wallet with card slots", position: "55% 50%" }, hover: { src: img.heroHands, alt: "Smooth calf card wallet in hand" } },
    { name: "Nappa Lining", note: "Supple and luxurious for linings", meta: "Raspberry · 0.8mm", price: "From £XX / sq ft", image: { src: "/images/banners/w1600/new-leather-5.webp", alt: "Red leather lining and zip pocket inside an open purse", position: "55% 50%" }, hover: { src: img.purseOpen1, alt: "Nappa-lined purse" } },
    { name: "Swatch Box", note: "Feel the leathers before you order", meta: "20 leathers · posted free", price: "Free", tag: "Trade", image: { src: "/images/banners/w960/new-leather-6.webp", alt: "Flat lay of Morucha leather wallets, purses and belts" }, hover: { src: img.swatchFan, alt: "Swatches fanned out" } },
  ] as { name: string; note: string; meta: string; price: string; tag?: string; image: ImageSlot; hover?: ImageSlot }[],
};

export type Product = {
  name: string;
  meta: string;
  price: string;
  tag?: "New" | "Bestseller" | "Limited";
  category: "Wallets" | "Purses" | "Cardholders" | "Gifts";
  image: ImageSlot;
  hover?: ImageSlot;
};

export const bestsellers = {
  label: "Bestsellers",
  title: "Our *Bestsellers*",
  categories: ["All", "Wallets", "Purses", "Cardholders", "Gifts"] as const,
  link: { label: "Shop all leather goods", href: "#" },
  // Real Morucha products (./shop.ts), photographed on white, so every slot is a packshot.
  items: [
    { name: shop.bifoldCoin.name, meta: "Soft leather · 4 colours", price: shop.bifoldCoin.priceLabel, tag: "Bestseller", category: "Wallets", image: pack(shop.bifoldCoin.photo(11), "Black and tan leather bifold wallet"), hover: pack(shop.bifoldCoin.photo(13), "Bifold wallet open, showing its card slots") },
    { name: shop.longClutch.name, meta: "Genuine leather · 6 colours", price: shop.longClutch.priceLabel, tag: "Bestseller", category: "Purses", image: pack(shop.longClutch.photo(1), "Burgundy leather long clutch wallet"), hover: pack(shop.longClutch.photo(3), "Long clutch wallet open, full of cards") },
    { name: shop.verticalCoin.name, meta: "Soft leather · 2 colours", price: shop.verticalCoin.priceLabel, tag: "New", category: "Wallets", image: pack(shop.verticalCoin.photo(5), "Tan and black vertical leather wallet"), hover: pack(shop.verticalCoin.photo(2), "Vertical wallet open with notes and cards") },
    { name: shop.cardHolder.name, meta: "Genuine leather · Black", price: shop.cardHolder.priceLabel, category: "Cardholders", image: pack(shop.cardHolder.photo(2), "Black leather card holder wallet, open"), hover: pack(shop.cardHolder.photo(3), "Card holder with cards and notes") },
    { name: shop.flapClutch.name, meta: "Genuine leather · 5 colours", price: shop.flapClutch.priceLabel, category: "Purses", image: pack(shop.flapClutch.photo(1), "Burgundy leather flap clutch purse"), hover: pack(shop.flapClutch.photo(2), "Flap clutch purse open, showing its card slots") },
    { name: shop.slimCard.name, meta: "Genuine leather · Tan", price: shop.slimCard.priceLabel, category: "Cardholders", image: pack(shop.slimCard.photo(1), "Tan slim leather card wallet with its gift box") },
    { name: shop.hunterBifold.name, meta: "Distressed hunter leather · Dark brown", price: shop.hunterBifold.priceLabel, category: "Wallets", image: pack(shop.hunterBifold.photo(1), "Dark brown distressed leather bifold wallet"), hover: pack(shop.hunterBifold.photo(5), "Hunter bifold open with coins and cards") },
    { name: shop.giftPasscase.name, meta: "Soft leather · Burgundy · Gift box", price: shop.giftPasscase.priceLabel, category: "Gifts", image: pack(shop.giftPasscase.photo(5), "Burgundy leather passcase wallet"), hover: pack(shop.giftPasscase.photo(8), "Passcase wallet with its Morucha gift box") },
  ] as Product[],
};

// Our Leathers, Nour Hammour "New" style: small italic title + "View all", then a full-bleed row
export const newLeathers = {
  title: "New *leathers*",
  link: { label: "View all", href: "#" },
};

// Bestsellers, Chesterfield "Shop by category" style
export const shopByCategory = {
  title: "Shop by *category*",
  link: { label: "Shop all leather goods", href: "#" },
  // The ranges Morucha sells, each shown by one of its own products.
  items: [
    { name: "Bifold wallets", href: "#", image: pack(shop.twoToneBifold.photo(1), "Black and tan leather bifold wallet") },
    { name: "Clutch purses", href: "#", image: pack(shop.flapClutch.photo(1), "Burgundy leather flap clutch purse") },
    { name: "Card holders", href: "#", image: pack(shop.cardHolder.photo(2), "Black leather card holder, open") },
    { name: "Coin wallets", href: "#", image: pack(shop.twoToneBifold.photo(4), "Bifold wallet open with notes and coins") },
    { name: "Long purses", href: "#", image: pack(shop.zipPurse.photo(1), "Navy leather zip-around purse") },
    { name: "Trifold wallets", href: "#", image: pack(shop.hunterTrifold.photo(1), "Brown hunter leather trifold wallet") },
    { name: "Biker wallets", href: "#", image: pack(shop.bikerChain.photo(2), "Brown leather biker wallet with its chain") },
    { name: "Gift boxed", href: "#", image: pack(shop.giftPasscase.photo(8), "Burgundy wallet with its Morucha gift box") },
    { name: "Leather hides", href: "#leathers", image: { src: img.swatchFan, alt: "Fan of leather swatches" } },
  ] as { name: string; href: string; image: ImageSlot }[],
};

// Chesterfield-style trio of tall story cards
export const discover = {
  items: [
    // Morucha's own photos: WebP copies (up to 1600px wide, as the tall cards enlarge wide photos) of public/images/banners/*.png
    { title: "Crafted by nature.\nRefined by hand.", link: { label: "Discover our leather", href: "#leathers" }, image: { src: "/images/banners/w1600/crafted-with.webp", alt: "Craftsman finishing the edge of a burgundy Morucha leather wallet on a workbench" } },
    { title: "Tanned with patience.\nBuilt to last.", link: { label: "Meet our story", href: "#story" }, image: { src: "/images/banners/w1600/tanned-with.webp", alt: "Eight Morucha leather wallets laid out on a wooden workshop table" } },
    { title: "New season\ncollection.", link: { label: "Find your favourite", href: "#bestsellers" }, image: { src: "/images/banners/w1600/new-season.webp", alt: "Man in a blue suit holding a black and blue Morucha long wallet", position: "35% 50%" } },
  ] as { title: string; link: { label: string; href: string }; image: ImageSlot }[],
};

// Morucha's M-2028 bifold. Features, details and specs are from its store listing; each colour has its own photos.
const spotlightProduct = shop.bifoldCoin;
const spotlightColours = colourways.bifoldCoin.map((c) => ({
  name: c.name,
  hex: c.swatch,
  sku: spotlightProduct.variants.find((v) => v.title === c.name.replace(" / ", " "))?.sku ?? "M-2028",
  images: c.images.map((src, i) => pack(src, `${spotlightProduct.name} in ${c.name}, view ${i + 1}`)),
}));

export const spotlight = {
  label: "Featured Piece",
  name: spotlightProduct.name,
  sku: "M-2028",
  price: spotlightProduct.priceLabel,
  compareAt: undefined as string | undefined, // not on sale
  note: "Free UK delivery · Order before 3:30pm for same-day dispatch",
  colours: spotlightColours,
  features: [
    { icon: "compact", title: "RFID blocking", text: "Shields contactless cards from skimming" },
    { icon: "storage", title: "Smart storage", text: "8 card slots, 3 ID windows, 2 note sections" },
    { icon: "leather", title: "Soft distressed leather", text: "Takes on a vintage patina with use" },
    { icon: "zip", title: "Zipped coin pocket", text: "Loose change stays where you put it" },
  ],
  details: [
    { title: "Product details", text: "A classic bifold in genuine soft, distressed hunter leather with built-in RFID blocking. Inside are 8 card slots, 3 clear ID windows, 2 full-length note compartments, 2 slip-in pouches, a zipped coin pocket and a snap-button flap compartment." },
    { title: "Specifications", text: "Material: genuine leather · Dimensions: 12 × 9.5 cm closed · RFID protected · Presented in a branded Morucha gift box." },
    { title: "Delivery & returns", text: "Free UK delivery. Orders placed before 3:30pm are dispatched the same working day. [Returns policy TBC.]" },
  ],
  /** Photos of the first colour; the colour swatches switch to that colour's own photos. */
  images: spotlightColours[0].images,
};

export const story = {
  label: "Our Story",
  display: "Our *Story*",
  title: "A tannery built on patience",
  paragraphs: [
    "Morucha began with a simple belief: good leather can't be rushed. [Founding story, year and location TBC.]",
    "Today we tan hides for makers across the UK and beyond, and craft our own wallets, purses and travel bags from the very same leather: tens of thousands of them, sent to customers worldwide.",
  ],
  cta: { label: "About us", href: "#" },
  // Morucha's own photos: 1600px WebP copies of public/images/banners/card-holder.png and tanned-with.png
  image: { src: "/images/banners/w1600/card-holder.webp", alt: "Hands opening a black and tan Morucha leather wallet full of cards" } as ImageSlot,
  inset: { src: "/images/banners/w1600/tanned-with.webp", alt: "Morucha leather wallets laid out on a wooden workshop desk" } as ImageSlot,
};

export const process = {
  label: "The Process",
  title: "Discover a slower way. Leather tanned *by hand*, from hide to finished piece.",
  cta: { label: "Discover the process", href: "#" },
  band: { src: img.tooling, alt: "A craftsman's hands tooling a leather panel" } as ImageSlot,
  // The play button opens this film. Leave src empty until Morucha has a video: the lightbox then shows
  // the poster with a "coming soon" note. Accepts an .mp4 path (e.g. "/video/process.mp4") or a
  // YouTube/Vimeo embed URL (e.g. "https://www.youtube.com/embed/<id>").
  film: { label: "Watch the film", title: "Inside the tannery", duration: "[1:30 TBC]", src: "" },
  steps: [
    { title: "Selection", text: "Each raw hide is graded by eye and touch before it enters the tannery.", image: { src: img.swatchFan, alt: "Grading leather" } },
    { title: "Preparation", text: "Hides are soaked, cleaned and fleshed to open the fibres.", image: { src: img.swatchGreen, alt: "Prepared leather pieces" } },
    { title: "Tanning", text: "[Tanning method TBC, e.g. vegetable tannins over several weeks.]", image: { src: img.grainPanels, alt: "Tanned leather" } },
    { title: "Drying", text: "Hung and dried slowly, then staked to soften the leather.", image: { src: img.cardBlueTaupe, alt: "Dried leather pieces" } },
    { title: "Finishing", text: "Oiled, dyed and finished by hand to bring out the grain.", image: { src: img.tooling, alt: "Hand-finishing leather" } },
  ] as { title: string; text: string; image: ImageSlot }[],
};

export const collections = {
  label: "Leather Goods",
  title: "The *Collections*",
  items: [
    // Men's Wallets, Women's Purses and Cardholders use Morucha's own photos (WebP copies of public/images/banners/*.png)
    { name: "Men's Wallets", count: "[n] pieces", href: "#", image: { src: "/images/banners/w960/men-wallet.webp", alt: "Hand holding up a black Morucha leather wallet with a tan edge" } },
    // shade: a soft dark fade behind the white text, as this photo is light (a cream blazer) where the name sits
    { name: "Women's Purses", count: "[n] pieces", href: "#", shade: true, image: { src: "/images/banners/w1600/women-purse.webp", alt: "Woman in a cream blazer holding a blue, pink and red patchwork Morucha leather purse", position: "40% 50%" } },
    { name: "Cardholders", count: "[n] pieces", href: "#", image: { src: "/images/banners/w1600/card-holder-new.webp", alt: "Hands taking a yellow leather card holder from an open tan Morucha wallet", position: "35% 50%" } },
    { name: "Travel Bags", count: "[n] pieces", href: "#", image: { src: img.flatlay, alt: "Leather goods flat-lay" } },
  ] as { name: string; count: string; href: string; shade?: boolean; image: ImageSlot }[],
};

export const sustainability = {
  label: "Sustainability",
  display: "Responsibly\n*Made*",
  title: "Leather is a by-product. We treat it as a gift.",
  points: [
    { title: "Traceable hides", text: "[Hide sourcing details TBC, e.g. by-products of the UK food industry.]" },
    { title: "Less water, fewer chemicals", text: "[Water and chemistry claims TBC.]" },
    { title: "Made to last", text: "The most sustainable product is the one you never need to replace." },
  ],
  cta: { label: "Our commitments", href: "#" },
  // Morucha's own photos: WebP copies of public/images/banners/gifts-under.png (large) and since-2.png (inset)
  image: { src: "/images/banners/w1600/gifts-under.webp", alt: "Grey Morucha leather wallet beside its gift box on a dark desk" } as ImageSlot,
  inset: { src: "/images/banners/w960/since-2.webp", alt: "Six black Morucha leather wallets with tan, red, green and orange trims arranged in a circle" } as ImageSlot,
};

export const makers = {
  label: "Made with Morucha",
  title: "In the Hands of *Makers*",
  text: "Follow us on Instagram [@handle TBC] and tag #MadeWithMorucha. Be part of our community of makers and leather lovers.",
  handle: "@morucha [TBC]",
  href: "#",
  // Morucha's own photos: 960px WebP copies of public/images/banners/insta-1.png … insta-6.png
  items: [
    { caption: "Small goods, [Maker TBC]", image: { src: "/images/banners/w960/insta-1.webp", alt: "Hands opening a burgundy Morucha wallet full of cards", position: "43% 50%" } },
    { caption: "Bespoke wallets, [Maker TBC]", image: { src: "/images/banners/w960/insta-2.webp", alt: "Four Morucha leather wallets on a wooden table" } },
    { caption: "Card cases, [Maker TBC]", image: { src: "/images/banners/w960/insta-3.webp", alt: "Hands opening a brown distressed leather wallet with cards and notes" } },
    { caption: "Gifts, [Maker TBC]", image: { src: "/images/banners/w960/insta-4.webp", alt: "Hands holding a black Morucha wallet beside its gift box" } },
    { caption: "Accessories, [Maker TBC]", image: { src: "/images/banners/w960/insta-5.webp", alt: "Hands taking a card from a navy leather purse" } },
    { caption: "Purses, [Maker TBC]", image: { src: "/images/banners/w960/insta-6.webp", alt: "Hands holding a red Morucha leather purse" } },
  ] as { caption: string; image: ImageSlot }[],
};

export const trade = {
  label: "Trade & Wholesale",
  title: "Supply Your *Workshop*",
  text: "Whether you make one bag a month or stock a shop full of leather goods, we'll help you find the right hide.",
  benefits: [
    { n: "01", title: "Free swatch box", text: "Feel the leather before you commit. Swatches posted free across the UK." },
    { n: "02", title: "No minimum order", text: "Buy a single hide, a half-hide, or a pallet." },
    { n: "03", title: "Trade pricing", text: "Account pricing for makers, retailers and manufacturers." },
  ],
  primary: { label: "Open a trade account", href: "mailto:sales@morucha.co.uk?subject=Trade%20account" },
  secondary: { label: "Request a swatch box", href: "mailto:sales@morucha.co.uk?subject=Swatch%20box" },
  email: "sales@morucha.co.uk",
  // Morucha's own photo: a WebP copy of public/images/banners/leather-pieces.png
  image: { src: "/images/banners/w1600/leather-pieces.webp", alt: "Cut black and tan leather wallet pieces and finished Morucha wallets with tools on a green cutting mat" } as ImageSlot,
};

export const newsletter = {
  label: "Newsletter",
  title: "Letters from\nthe *Tannery*",
  text: "New leathers, limited runs and stories from the workshop. A few times a year, never more.",
};

export const footer = {
  columns: [
    { title: "My Account", links: ["Profile", "Track Order", "My Orders", "Return an Order", "Trade Account"] },
    { title: "Still Curious?", links: ["Our Story", "The Process", "Sustainability", "Leather Care", "Made with Morucha", "Reach Out to Us"] },
    { title: "Quick Links", links: ["Leather Hides", "Swatch Box", "Delivery", "Returns & Refunds", "FAQs", "Become a Stockist"] },
  ],
  newsletter: {
    title: "Newsletter",
    text: "New leathers, limited runs and stories from the workshop. A few times a year, never more.",
    consent: "I agree to receive emails from Morucha. You can unsubscribe at any time.",
  },
  socials: ["Instagram", "Facebook", "Pinterest", "YouTube"] as const,
  email: "sales@morucha.co.uk",
  payments: "Visa · Mastercard · Amex · Apple Pay · Google Pay · Shop Pay",
  legal: ["Privacy Policy", "Refund Policy", "Terms of Service"],
};
