// All v1 home page copy lives here, for The Fitting Belt Company (fittingbelt.com.au). Facts about the company
// come from its own About page; anything wrapped in [TBC] needs confirming by the client before launch.
// Headings support *italic accents* and \n line breaks.
// Product names, prices and photos are the client's own (./fittingbelt.ts, saved locally). Lifestyle photos are
// Pexels stock (free licence), saved in /public/images/fittingbelt/lifestyle/, until the client supplies its own.

import { fb, fbColourways, fbHex } from "./fittingbelt";

// fit "contain" marks a studio packshot on white: shown whole, with the white blended into the tile colour.
// position is the photo's object-position in a cropped slot (e.g. "35% 50%"), when the default centre misses the subject.
export type ImageSlot = { src?: string; alt: string; tone?: "dark" | "mid" | "light"; fit?: "contain"; position?: string };

/** A product photo slot (studio shot on white). */
export const pack = (src: string, alt: string): ImageSlot => ({ src, alt, fit: "contain" });

/** A Pexels lifestyle photo, by its Pexels id. */
const px = (id: number, alt: string, position?: string): ImageSlot => ({ src: `/images/fittingbelt/lifestyle/pexels-${id}.webp`, alt, position });

export const brand = {
  name: "Fitting Belt",
  legal: "The Fitting Belt Company",
  email: "sales@fbco.com.au",
  logo: "/brand/fittingbelt-logo.webp",
  logoLight: "/brand/fittingbelt-logo-light.webp",
  logoSize: { width: 1240, height: 459 },
};

export const announcement = "Genuine leather belts, bags and wallets  ·  Wholesale accounts available";

export const nav = [
  { label: "New In", href: "#leathers" },
  { label: "Shop", href: "#bestsellers" },
  { label: "How It's Made", href: "#process" },
  { label: "Collections", href: "#collections" },
  { label: "Wholesale", href: "#trade" },
  { label: "About", href: "#story" },
];

export const hero = {
  label: "Genuine Leather · Made to Fit",
  title: "Belts that\n*fit for life*",
  text: "Men's, women's and children's genuine leather belts, bags and wallets from The Fitting Belt Company.",
  primary: { label: "Shop belts", href: "#bestsellers" },
  secondary: { label: "Wholesale enquiries", href: "#trade" },
  slides: [
    px(1023937, "A wall of colourful leather belts hanging in a shop"),
    px(35392727, "Brown leather belt with a silver buckle held in a gloved hand"),
    px(7679660, "Rolled leather belts laid out on a rustic wooden table"),
  ] as ImageSlot[],
};

export const statement = {
  label: "Over 18 years of belts",
  text: "We make and supply genuine leather belts *for every fit*: dress, casual, reversible, canvas and kids.",
  images: [
    px(31367059, "Two brown leather belts with brushed buckles on a warm background"),
    px(31959215, "Black leather belts with silver buckles on a dark surface"),
  ] as ImageSlot[],
};

// "The New Edit" (Smythson / Bellroy / Coach / Mismo): filter pills, one wide campaign tile, then product cards
// on sand tiles with colour swatches that switch the photo.
export type EditColour = { name: string; swatch: string; image: ImageSlot };
export type EditItem = { name: string; meta: string; price: string; tag?: "New" | "Limited" | "Bestseller"; category: "Men's belts" | "Women's belts" | "Bags & wallets"; colours: EditColour[] };
const editColours = (list: { name: string; swatch: string; images: string[] }[], product: string): EditColour[] =>
  list.map((c) => ({ name: c.name, swatch: c.swatch, image: pack(c.images[0], `${product} in ${c.name}`) }));
const one = (name: string, swatch: string, src: string, alt: string): EditColour[] => [{ name, swatch, image: pack(src, alt) }];

export const newEdit = {
  label: "Just landed",
  title: "The New *Edit*",
  tabs: ["All", "Men's belts", "Women's belts", "Bags & wallets"] as const,
  link: { label: "Shop all new", href: "https://www.fittingbelt.com.au/collections/all" },
  campaign: {
    label: "The reversible edit",
    title: "One belt,\n*two ways to wear it*",
    link: { label: "See the Cameron", href: "#spotlight" },
    image: px(31367058, "Brown leather belt coiled beside a spare buckle on a warm background"),
  },
  items: [
    { name: "Cameron reversible belt", meta: "Genuine leather · 33mm strap", price: fb.cameron.priceLabel, tag: "Bestseller", category: "Men's belts", colours: editColours(fbColourways.cameron, "Cameron reversible belt") },
    { name: "Marina knot waist belt", meta: "Genuine leather · 20mm strap", price: fb.marina.priceLabel, tag: "New", category: "Women's belts", colours: [...one("Tan", fbHex.tan, fb.marina.photo(1), "Tan Marina knot waist belt"), ...one("Brown", fbHex.brown, fb.indigo.photo(1), "Brown knot waist belt")] },
    { name: "Lucy soft handle bag", meta: "Vegan pebbled leather", price: fb.lucy.priceLabel, category: "Bags & wallets", colours: editColours(fbColourways.lucy, "Lucy bag") },
    { name: "Paulo canvas belt", meta: "Canvas · silver buckle", price: fb.paulo.priceLabel, category: "Men's belts", colours: editColours(fbColourways.paulo, "Paulo canvas belt") },
    { name: "Deaneen leather belt", meta: "Genuine leather · skinny", price: fb.deaneenRed.priceLabel, category: "Women's belts", colours: [...one("Red", fbHex.red, fb.deaneenRed.photo(1), "Red Deaneen leather belt"), ...one("Black", fbHex.black, fb.deaneenBlack.photo(1), "Black Deaneen leather belt")] },
    { name: "Centennial Park clutch", meta: "Pebbled leather", price: fb.centennial.priceLabel, category: "Bags & wallets", colours: editColours(fbColourways.centennial, "Centennial Park clutch") },
    { name: "Justin leather wallet", meta: "Genuine leather · gift box", price: fb.justin.priceLabel, tag: "Limited", category: "Bags & wallets", colours: one("Grey", fbHex.grey, fb.justin.photo(1), "Grey Justin leather wallet with its gift box") },
    { name: "Lacey patent belt", meta: "Patent leather · skinny", price: fb.lacey.priceLabel, category: "Women's belts", colours: one("Off-white", fbHex.white, fb.lacey.photo(1), "Off-white Lacey patent leather belt") },
    { name: "Romeo reversible belt", meta: "Genuine leather · reversible", price: fb.romeo.priceLabel, category: "Men's belts", colours: one("Black / Chocolate", `linear-gradient(135deg, ${fbHex.black} 50%, ${fbHex.chocolate} 50%)`, fb.romeo.photo(1), "Romeo black and chocolate reversible belt") },
  ] as EditItem[],
};

// "Category Atelier" (Coach / Bellroy / Thursday): shortcuts, then a bento of one tall hero category, captioned
// product tiles with style counts, a reversible band and a gift tile.
export const shopByCategory = {
  label: "Find your fit",
  title: "Shop by *category*",
  shortcuts: [
    { label: "For him", href: "#" },
    { label: "For her", href: "#" },
    { label: "Kids", href: "#" },
  ],
  hero: { name: "Men's belts", meta: "[n] styles · Dress, casual, canvas", href: "#", image: px(27045991, "Young man in a white polo shirt and grey trousers wearing a black leather belt", "50% 40%") },
  tiles: [
    { name: "Women's belts", count: "[n]", href: "#", image: pack(fb.marina.photo(1), "Tan genuine leather knot waist belt") },
    { name: "Wallets", count: "[n]", href: "#", image: pack(fb.justin.photo(1), "Grey leather wallet with its gift box") },
    { name: "Bags", count: "[n]", href: "#", image: pack(fb.lucy.photo(3), "Tan pebbled leather handle bag") },
  ] as { name: string; count: string; href: string; image: ImageSlot }[],
  band: {
    label: "Two looks, one belt",
    title: "Reversible *belts*",
    link: { label: "Shop reversible", href: "#" },
    image: px(31959214, "Black, brown and tan leather belts with silver buckles on a dark surface"),
  },
  gift: { label: "Gift ideas", title: "Gifts\nunder *A$25*", text: "Gift-boxed belts and wallets →", href: "#" },
};

// Chesterfield-style trio of tall story cards
export const discover = {
  items: [
    { title: "Made to fit.\nMade to last.", link: { label: "Shop men's belts", href: "#bestsellers" }, image: px(10915255, "Man in a black shirt adjusting a black leather belt", "50% 60%") },
    { title: "Two belts.\nOne buckle.", link: { label: "Meet the reversible", href: "#spotlight" }, image: px(31959216, "Four leather belts in tan, olive, grey and brown laid on a black surface") },
    { title: "Dressed for\nthe occasion.", link: { label: "Find a gift", href: "#bestsellers" }, image: px(19272491, "Two men in tailored suits and hats walking through a city", "50% 30%") },
  ] as { title: string; link: { label: string; href: string }; image: ImageSlot }[],
};

// The Cameron reversible belt. Description, strap width and materials are from its store listing.
const spotlightProduct = fb.cameron;
const spotlightColours = fbColourways.cameron.map((c) => ({
  name: c.name,
  hex: c.swatch,
  sku: "Cameron",
  images: c.images.map((src, i) => pack(src, `Cameron reversible belt in ${c.name}, view ${i + 1}`)),
}));

export const spotlight = {
  label: "Featured Piece",
  // "Anatomy of" (Von Baer / Red Wing / Ghurka): numbered hotspots on the photo match the feature list.
  title: "Anatomy of the *Cameron*",
  intro: "A classic, stylish dress belt for formal and informal occasions: tan genuine leather with black on the reverse.",
  short: "Cameron reversible belt",
  meta: "Genuine leather · 33mm strap",
  link: { label: "See full details", href: spotlightProduct.href },
  name: spotlightProduct.title,
  sku: "Cameron",
  price: spotlightProduct.priceLabel,
  compareAt: undefined as string | undefined, // not on sale
  note: "[Delivery and returns line TBC]",
  colours: spotlightColours,
  sizes: spotlightProduct.sizes.map((s) => s.split("/")[0].trim()),
  // x / y: where each hotspot sits on the main photo, in % (tuned to the first photo).
  features: [
    { icon: "leather", title: "100% genuine leather", text: "Tan on the face, black on the reverse", x: 28, y: 46 },
    { icon: "compact", title: "Reversible strap", text: "Twist the buckle to change colour", x: 74, y: 44 },
    { icon: "storage", title: "Nickel buckle", text: "Polished nickel, made to last", x: 60, y: 54 },
    { icon: "zip", title: "33mm strap", text: "A dress width that suits suits and jeans", x: 44, y: 58 },
  ],
  /** Photos of the first colour. */
  images: spotlightColours[0].images,
};

export const story = {
  label: "Our Story",
  display: "Our *Story*",
  title: "Fitting belts for over 18 years",
  paragraphs: [
    "The Fitting Belt Company was established over 18 years ago and is now one of the market leaders in its industry. We make and wholesale men's, women's and children's genuine leather belts, bags, satchels and wallets.",
    "Today we supply major retail outlets across Australia, New Zealand, the UK and Canada, and more than 400 independent stores Australia-wide.",
  ],
  cta: { label: "About us", href: "https://www.fittingbelt.com.au/pages/about-us" },
  image: px(4443831, "Man in a blue dotted shirt wearing a black leather belt and a watch", "50% 70%"),
  inset: px(31432650, "Black leather belt with a polished silver buckle"),
};

// "The Workshop Reel" (Red Wing Heritage / Ghurka): a short film told in five chapters, one clip each, played back
// to back in the frame. The clips are Pexels stock (free licence) in /public/video/fittingbelt/ until the client
// supplies its own footage: swap src and poster per chapter. start / length pick the part of each clip to play (s).
const clip = (id: number, start: number, length: number) => ({ src: `/video/fittingbelt/pexels-${id}.mp4`, poster: `/video/fittingbelt/pexels-${id}.webp`, start, length });

export type ReelChapter = { title: string; text: string; clip: ReturnType<typeof clip> };

export const process = {
  label: "How It's Made",
  film: { label: "Watch the film", title: "From hide to belt" },
  reel: {
    title: "From hide to *belt*",
    text: "A short look at how a genuine leather belt comes together, in five steps.",
    // The muted loop that plays in the frame before the film starts.
    intro: clip(35144728, 0, 20),
  },
  chapters: [
    { title: "Choosing the leather", text: "The hide is checked for colour, grain and strength before a single cut is made.", clip: clip(35144731, 4, 12) },
    { title: "Cutting the strap", text: "A steel rule and a sharp blade cut each strap to width, from skinny waist belts to 33mm dress belts.", clip: clip(35144725, 2, 12) },
    { title: "Stitching", text: "Heavy-duty machines stitch the edges for a clean, strong line that holds its shape.", clip: clip(35144735, 6, 12) },
    { title: "Finishing the edges", text: "Edges are buffed smooth so the belt feels as good as it looks.", clip: clip(40318164, 0, 7.3) },
    { title: "Fitting the hardware", text: "Buckles and fittings go on last, set by hand and checked before the belt is sized.", clip: clip(34740043, 0, 12) },
  ] as ReelChapter[],
};

export const collections = {
  label: "The Range",
  title: "The *Collections*",
  items: [
    { name: "Men's Belts", count: "[n] styles", href: "#", shade: true, image: px(11263067, "Brown leather belt coiled around a watch beside leather shoes") },
    // shade: a soft dark fade behind the white text, as this photo is light where the name sits
    { name: "Women's Belts", count: "[n] styles", href: "#", shade: true, image: px(34519173, "Woman in a white shirt, tie and dark trousers with a belt") },
    { name: "Braces & Kids", count: "[n] styles", href: "#", shade: true, image: pack(fb.ronald.photo(2), "Brown fashion braces worn over a white T-shirt") },
    { name: "Bags & Wallets", count: "[n] styles", href: "#", image: px(7952556, "Leather wallets and card holders on a coloured table") },
  ] as { name: string; count: string; href: string; shade?: boolean; image: ImageSlot }[],
};

export const sustainability = {
  label: "Quality",
  display: "Genuine\n*Leather*",
  title: "Real leather, sized properly and made to last.",
  points: [
    { title: "Genuine leather", text: "Our leather belts are 100% genuine leather. [Leather sourcing details TBC.]" },
    { title: "A size for everyone", text: "Belts from 28\" to 56\", with every size listed in inches and centimetres." },
    { title: "Made to last", text: "The most sustainable belt is the one you never need to replace." },
  ],
  cta: { label: "Size guide", href: "#" },
  image: px(11263089, "Brown leather belt and watch beside polished brown shoes"),
  inset: px(31367060, "Black, grey, brown and tan leather belts on fabric"),
};

export const makers = {
  label: "Worn with Fitting Belt",
  // "Carried by You" (Popov / Thursday / Mismo): a photo mosaic mixed with verified review cards.
  hashtag: "#FittingBelt",
  display: "Worn by *you*",
  rating: "[★ rating] from [n] verified reviews [TBC]",
  share: { label: "Share yours", href: "#" },
  // The large first photo is pinned to the product it shows.
  featured: { name: "Cameron reversible belt", price: fb.cameron.priceLabel, handle: "@[handle TBC]", href: "#spotlight", image: pack(fb.cameron.photo(1), "Cameron reversible belt") },
  // Must be real, verified customer reviews before launch.
  reviews: [
    { quote: "[A real customer quote from a verified review, no more than 25 words: TBC.]", name: "[First name], [town]", product: "[product]" },
    { quote: "[Short verified review: TBC.]", name: "[Name]", product: "[product]" },
  ],
  title: "Worn by *You*",
  text: "Follow us on Instagram [@handle TBC] and tag #FittingBelt.",
  handle: "@[handle TBC]",
  href: "#",
  // Pexels stock until the client supplies customer photos.
  items: [
    { caption: "Dress belts", image: px(27045991, "Young man in a white polo shirt wearing a black leather belt", "50% 45%") },
    { caption: "Everyday leather", image: px(10915255, "Man in a black shirt wearing a black leather belt", "50% 60%") },
    { caption: "Brown leather", image: px(11263067, "Brown leather belt coiled around a watch") },
    { caption: "Gift ideas", image: px(31517345, "Bow tie, belt and shoes laid out on a lace tablecloth") },
    { caption: "The range", image: px(31959216, "Four leather belts in tan, olive, grey and brown") },
  ] as { caption: string; image: ImageSlot }[],
};

export const trade = {
  label: "Wholesale",
  title: "Stock *Fitting Belt*",
  text: "We supply major retail outlets across Australia, New Zealand, the UK and Canada, and more than 400 independent stores Australia-wide.",
  benefits: [
    { n: "01", title: "Wholesale access account", text: "Register to see the full range and wholesale prices." },
    { n: "02", title: "Over 400 styles", text: "Men's, women's and kids' belts, braces, bags and wallets." },
    { n: "03", title: "Also on Faire", text: "Order through our wholesale page on Faire." },
  ],
  primary: { label: "Register for wholesale", href: "https://www.fittingbelt.com.au/pages/wholesale" },
  secondary: { label: "Email the sales team", href: "mailto:sales@fbco.com.au?subject=Wholesale%20enquiry" },
  email: brand.email,
  image: px(37483619, "Man at an outdoor market stall with leather belts hanging behind him", "50% 35%"),
};

export const newsletter = {
  label: "Newsletter",
  title: "News from\n*Fitting Belt*",
  text: "New styles, gift ideas and wholesale news. A few times a year, never more.",
};

export const footer = {
  columns: [
    { title: "My Account", links: ["Profile", "Track Order", "My Orders", "Return an Order", "Wholesale Account"] },
    { title: "Still Curious?", links: ["Our Story", "How It's Made", "Size Guide", "Leather Care", "Contact Us"] },
    { title: "Quick Links", links: ["Men's Belts", "Women's Belts", "Kids & Braces", "Bags & Wallets", "Delivery", "FAQs"] },
  ],
  newsletter: {
    title: "Newsletter",
    text: "New styles, gift ideas and wholesale news. A few times a year, never more.",
    consent: "I agree to receive emails from The Fitting Belt Company. You can unsubscribe at any time.",
  },
  socials: ["Instagram", "Facebook", "Pinterest", "YouTube"] as const,
  email: brand.email,
  payments: "Visa · Mastercard · Amex · Apple Pay · Google Pay · Shop Pay",
  legal: ["Privacy Policy", "Refund Policy", "Terms of Service"],
};
