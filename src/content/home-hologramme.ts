// All Hologramme home page copy, products and photos for HOLOGRAMME PARIS (design rules: hologramme-rule.md, reference adamis.in).
// Products, categories, logo and photos come from the client's own site, hologrammeparis.com (WooCommerce, read on
// 28 Oct 2026). Hologramme sells to trade customers only and hides prices from the public, so cards show the pack
// size and a "log in for trade price" line instead of a price. Anything marked [TBC] needs confirming by the client.
//
// Photos are hot-linked from hologrammeparis.com/wp-content/uploads for now: the site blocks non-browser downloads,
// so they could not be copied into /public. Copy them from the client's media library before launch.
// Collections, Explore by Collection and the showroom tiles use Pexels stock (free under the Pexels licence, photo
// pages at https://www.pexels.com/photo/<id>/), hot-linked from images.pexels.com: swap in the client's own
// showroom and campaign photos when they have them.

export type Link = { label: string; href: string };
export type Img = { src: string; alt: string };
export type Product = {
  name: string;
  /** Pack size and colour count, e.g. "Pack of 12 · Assorted". */
  meta: string;
  href: string;
  image: Img;
  badge?: { text: string; soft?: boolean };
  swatches?: string[];
};

const SITE = "https://hologrammeparis.com";
const up = (path: string, alt: string): Img => ({ src: `${SITE}/wp-content/uploads/${path}`, alt });
/** A Pexels photo by "<id>/<file>", served at the given width. */
const px = (path: string, alt: string, width = 1600): Img => ({
  src: `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${width}`,
  alt,
});

export const logo = {
  dark: `${SITE}/wp-content/uploads/2024/12/holoBlack.svg`,
  light: `${SITE}/wp-content/uploads/2024/12/holoWhite.svg`,
  width: 661,
  height: 135,
};

export const tradeNote = "Log in for trade price";

const product = (name: string, slug: string, meta: string, image: string, extra: Partial<Product> = {}): Product => ({
  name,
  meta,
  href: `${SITE}/en/product/${slug}/`,
  image: up(image, name),
  ...extra,
});

/** Colour dots for products sold in several colours (names as the client's store lists them). */
const dot = {
  black: "#1d1b1b",
  camel: "#b98a56",
  navy: "#2a3550",
  brown: "#5a3a26",
  taupe: "#8a7d70",
  beige: "#d9c6a5",
  khaki: "#6f6b3c",
  burgundy: "#5e1a22",
  grey: "#8a8a8a",
  blue: "#2f4f8f",
  green: "#2f4a35",
  orange: "#d0712a",
  natural: "#d8c49a",
};

export const announcements = [
  "Wholesale for professionals only",
  "Winter 2026: 140 new beanies, gloves and scarves",
  "Customer service Mon–Fri, 9:00–18:00 · 01 48 39 94 82",
];

export const nav: (Link & { pill?: string })[] = [
  { label: "Shop", href: `${SITE}/en/shop/` },
  { label: "Hats", href: "#favourites" },
  { label: "Leather goods", href: "#favourites" },
  { label: "Winter 2026", href: "#bestsellers", pill: "New" },
  { label: "Summer", href: "#favourites" },
  { label: "Kids", href: "#collections" },
  { label: "Showrooms", href: "#contact" },
];

export type Slide = { eyebrow: string; title: string; text: string; cta: Link; image: Img; position?: string };

export const hero: Slide[] = [
  {
    eyebrow: "Winter collection 2026",
    title: "140 new styles for the cold season",
    text: "Beanies, gloves and scarves, new for winter 2026.",
    cta: { label: "See what's new", href: "#bestsellers" },
    image: up("2026/09/Collection-Hiver-2026.webp", "Brown knit beanie, checked wool scarf and leather gloves on stone"),
    position: "30% 50%",
  },
  {
    eyebrow: "Leather goods",
    title: "New wallets, belts and pouches every week",
    text: "Leather and synthetic pieces, restocked weekly.",
    cta: { label: "Shop leather goods", href: "#favourites" },
    image: up("2026/09/Maroquinerie.webp", "Leather bags and belts on cream plinths"),
  },
  {
    eyebrow: "Summer collection 2026",
    title: "Straw hats and caps for the sun",
    text: "Our latest summer styles, available online only.",
    cta: { label: "Shop summer", href: "#favourites" },
    image: up("2026/09/Collection-Ete-2026.webp", "Straw sun hats and bucket hats displayed on stone"),
  },
];

export const marquee = [
  "Wholesale hats and leather goods",
  "Professionals only",
  "New styles every week",
  "Showrooms in Aubervilliers, Paris",
];

export const categories: (Link & { image: Img })[] = [
  { label: "Beanies", href: `${SITE}/en/product-category/hat-shop/winter-collection/beanies/`, image: up("2023/09/Bonnets-1.jpg", "Woman in a grey knit beanie") },
  { label: "Caps", href: `${SITE}/en/product-category/hat-shop/winter-collection/winter-caps/`, image: up("2023/09/Casquettes-Hiver.jpg", "Woman in a brown wool cap") },
  { label: "Scarves", href: `${SITE}/en/product-category/hat-shop/winter-collection/scarves-neck-warmers/`, image: up("2023/09/Echarpes.jpg", "Woman in a wide-brim hat and scarf") },
  { label: "Wallets", href: `${SITE}/en/product-category/leather-goods/wallets-purses/`, image: up("2021/09/Portefeuilles.jpg", "Brown leather wallet") },
  { label: "Belts", href: `${SITE}/en/product-category/leather-goods/belts/`, image: up("2021/09/Ceintures.jpg", "Brown leather belt and buckle") },
];

export const bestsellers = {
  title: "New for winter 2026",
  text: "The newest arrivals from our winter collection, packed by the dozen for your shop.",
  cta: { label: "View all", href: `${SITE}/en/product-category/hat-shop/?product_tag_1=hiver-2026` },
  products: [
    product("Hood – 3316", "hood-3316", "Pack of 12 · Assorted", "2026/10/3316-1.jpg", { badge: { text: "New" } }),
    product("Beanie – 16642A", "beanie-16642a", "Pack of 12 · Assorted", "2026/10/16642A-1.jpg", { badge: { text: "New" } }),
    product("Gloves – 17216", "gloves-17216", "Pack of 12 · Assorted", "2026/10/17216-1.jpg"),
    product("Cap – 25065", "cap-25065", "Pack of 12 · Assorted", "2026/10/25065-1.jpg"),
    product("Scarf – 72665", "scarf-72665", "Sold singly · 6 colours", "2026/08/72665G-1.jpg", {
      swatches: [dot.beige, dot.brown, dot.grey, dot.khaki, dot.taupe],
    }),
    product("Beret – 16645A", "beret-16645a", "Pack of 12 · Assorted", "2026/08/16645A-1.jpg"),
    product("Russian hat – 3321", "russian-hat-3321", "Pack of 12 · Assorted", "2026/08/3321-1.jpg"),
  ],
};

export const story = {
  eyebrow: "About Hologramme",
  title: "A Paris wholesaler for hats and leather goods",
  text: "Hologramme supplies boutiques with hats, caps, scarves, gloves, wallets, belts and bags, with new collections every season and new leather goods every week. Visit our showrooms in Aubervilliers or order online. [Founding year and story TBC.]",
  cta: { label: "Our story", href: `${SITE}/en/` },
  image: up("2021/09/Hologramme-Histoire-4.jpg", "Rows of coloured thread spools"),
};

export const favourites = {
  title: "Hologramme Favourites",
  cta: { label: "Shop online", href: `${SITE}/en/shop/` },
  tabs: [
    {
      label: "Winter",
      products: [
        product("Hood – 3317", "hood-3317", "Pack of 12 · Assorted", "2026/10/3317-1.jpg", { badge: { text: "New" } }),
        product("Gloves – 17218", "gloves-17218", "Pack of 12 · Assorted", "2026/10/17218-1.jpg"),
        product("Cap – 22313", "cap-22313", "Pack of 12 · Assorted", "2026/10/22313-1.jpg"),
        product("Bob – 3320", "bob-3320", "Pack of 12 · Assorted", "2026/08/3320-1.jpg"),
        product("Beanie – 16641A", "beanie-16641a", "Pack of 12 · Assorted", "2026/10/16641A-1.jpg"),
      ],
    },
    {
      label: "Summer",
      products: [
        product("Panama – 201702", "panama-201702", "Sold singly · Natural", "2026/07/201702-1.jpg"),
        product("Straw – Art 02 Raffia Gros", "straw-art-02-raffia-gros", "Pack of 15 · 3 colours", "2026/05/Art-02-Raffia-Gros-Noir-1.jpg", {
          swatches: [dot.beige, dot.black, dot.khaki],
        }),
        product("Bucket hat – 4940 UPF40", "bucket-hat-upf40-4940", "Sold singly · 7 colours", "2026/02/4940-Kaki.jpg", {
          swatches: [dot.beige, dot.black, dot.khaki, dot.navy, dot.orange, dot.taupe],
        }),
        product("Cap – 12972", "cap-12972", "Pack of 24 · Assorted", "2026/04/12972-1.jpg"),
        product("Beanie – A05", "beanie-a05", "Sold singly · 8 colours", "2026/05/A05-Taupe-1.jpg"),
      ],
    },
    {
      label: "Leather goods",
      products: [
        product("Wallet – 6289", "wallet-6289", "Sold singly · 5 colours", "2026/09/6289.jpg", {
          badge: { text: "New" },
          swatches: [dot.black, dot.brown, dot.camel, dot.navy, dot.taupe],
        }),
        product("Belt – YX-15", "belt-yx-15", "Sold singly · 8 colours", "2026/06/YX-15.jpg", {
          swatches: [dot.beige, dot.black, dot.blue, dot.brown, dot.burgundy, dot.grey],
        }),
        product("Pouch – LY2252", "pouch-ly2252", "Sold singly · 8 colours", "2026/10/LY2252.jpg"),
        product("Wallet – GZ1186", "wallet-gz1186", "Pack of 6 · Assorted", "2026/10/GZ1186.jpg"),
        product("Belt – 6654", "belt-6654", "Sold singly · 3 colours", "2026/07/6654.jpg", { swatches: [dot.black, dot.camel, dot.navy] }),
      ],
    },
  ],
};

export type Assurance = {
  icon: "leather" | "rfid" | "hand" | "gift" | "truck" | "clock" | "shield" | "returns" | "phone" | "tag" | "store" | "spark";
  title: string;
  note?: string;
};

export const craftPromises: Assurance[] = [
  { icon: "phone", title: "Dedicated customer service" },
  { icon: "hand", title: "Know-how" },
  { icon: "truck", title: "Delivery", note: "[Delivery times TBC]" },
  { icon: "spark", title: "New styles every week" },
];

export const servicePromises: Assurance[] = [
  { icon: "shield", title: "Professionals only" },
  { icon: "tag", title: "Prices excl. VAT", note: "Shipping extra" },
  { icon: "clock", title: "Mon–Fri, 9:00–18:00", note: "01 48 39 94 82" },
  { icon: "store", title: "Showrooms", note: "Aubervilliers, Paris" },
];

export const collections = {
  title: "Collections for Every Shop",
  items: [
    { label: "Hat shop", href: `${SITE}/en/product-category/hat-shop/`, image: px("13952577/pexels-photo-13952577.jpeg", "Woman in a camel coat and black felt hat against a sunlit wall", 1000) },
    { label: "Leather goods", href: `${SITE}/en/product-category/leather-goods/`, image: px("7953286/pexels-photo-7953286.jpeg", "Leather handbags in red, black and blue on a white studio set", 1000) },
    { label: "Kids", href: `${SITE}/en/product-category/hat-shop/kids-collection/`, image: px("17693659/pexels-photo-17693659/free-photo-of-girl-in-hat-and-scarf.jpeg", "Child in a pink knit hat and scarf", 1000) },
  ],
};

export const trending = {
  words: ["TRENDING", "HOLOGRAMME"],
  line: "WINTER COLLECTION 2026",
  name: "Angora blend scarf – 2618",
  meta: "Sold singly · 19 colours",
  href: `${SITE}/en/product/scarf-2618/`,
  colours: [
    { name: "Black", swatch: dot.black, image: `${SITE}/wp-content/uploads/2026/08/2618N-1.jpg` },
    { name: "Burgundy", swatch: dot.burgundy, image: `${SITE}/wp-content/uploads/2026/08/2618BX-1.jpg` },
    { name: "Camel", swatch: dot.camel, image: `${SITE}/wp-content/uploads/2026/08/2618CL-1.jpg` },
  ],
};

/** "Explore by collection": a tab per range swaps the wide photo. Swatches are optional. */
export const colourExplorer: { title: string; colours: { name: string; swatch?: string; href: string; image: Img }[] } = {
  title: "Explore by Collection",
  colours: [
    { name: "Winter", href: `${SITE}/en/product-category/hat-shop/winter-collection/`, image: px("20372474/pexels-photo-20372474/free-photo-of-portrait-of-a-young-woman-wearing-a-knit-hat-and-a-scarf.jpeg", "Woman in a knit hat and scarf in falling snow") },
    { name: "Summer", href: `${SITE}/en/product-category/hat-shop/summer-collection/`, image: px("4738060/pexels-photo-4738060.jpeg", "Woman in a wide straw sun hat on the beach") },
    { name: "Straw hats", href: `${SITE}/en/product-category/hat-shop/summer-collection/straw-hats/`, image: px("40125212/pexels-photo-40125212/free-photo-of-stacks-of-stylish-straw-hats-in-market-display.jpeg", "Stacks of straw hats on a market display") },
    { name: "Umbrellas", href: `${SITE}/en/product-category/leather-goods/umbrellas/`, image: px("2858266/pexels-photo-2858266.jpeg", "People with umbrellas in a city street on a rainy day") },
    { name: "Bags", href: `${SITE}/en/product-category/leather-goods/pouches-shoulder-bags/`, image: px("9327162/pexels-photo-9327162.jpeg", "Leather handbags lined up on a white shelf") },
  ],
};

export const shopTheLook = {
  title: "Shop the Look",
  image: up("2026/09/Collection-Hiver-2026.webp", "Brown knit beanie, checked wool scarf and leather gloves on stone"),
  spots: [
    // positions are % of the visible photo at 16:7 (desktop): the beanie, the scarf and the gloves
    { x: 35, y: 13, product: product("Beanie – Pierre Cardin Ribbed", "bonnet-pierre-cardin-cotele", "Sold singly · 4 colours", "2024/10/Pierre-Cardin-Bonnet-Cotele-Noir-1.jpg") },
    { x: 55, y: 50, product: product("Angora blend scarf – 2618", "scarf-2618", "Sold singly · 19 colours", "2026/08/2618CL-1.jpg") },
    { x: 80, y: 70, product: product("Classic leather gloves – 17120", "gloves-17120", "Sold singly · 9 colours", "2021/07/17120N-Noir.jpg") },
  ],
};

export type Review = { text: string; en: string; name: string; business?: string; stars: number };

export const reviews: {
  eyebrow: string;
  title: string;
  rating: string;
  ratingNote: string;
  cta: Link;
  items: Review[];
} = {
  eyebrow: "Customer reviews",
  title: "What Our Customers Say",
  rating: "4.8",
  ratingNote: "Average rating on Google",
  cta: { label: "Read all reviews on Google", href: "https://www.google.com/maps/search/Hologramme+Paris+Aubervilliers" },
  // From the "Avis clients" block on hologrammeparis.com (Google Maps reviews). `text` is the customer's French;
  // `en` is our English translation, shown when the visitor switches language.
  items: [
    {
      text: "Qualité des articles conforme à la description. Équipes sérieuses et à l’écoute. Commande préparée avec soin.",
      en: "Items exactly as described. A reliable team that listens. The order was carefully prepared.",
      name: "Marie-Laure Petit",
      stars: 5,
    },
    {
      text: "Je recommande. Il y a du choix, prix correct. Envoi rapide et soigné.",
      en: "I recommend them. Plenty of choice at fair prices. Fast, careful shipping.",
      name: "Jessica Kedzierski",
      stars: 5,
    },
    {
      text: "Personnel très aimable et professionnel. Je recommande.",
      en: "Very friendly, professional staff. I recommend them.",
      name: "Baby and Co",
      business: "Les P’tits Marins",
      stars: 5,
    },
  ],
};

export const inside = {
  title: "Visit Our Showrooms",
  text: "See the whole range in person in Aubervilliers, Monday to Friday, 9:00–18:00.",
  cta: { label: "Showroom details", href: "#contact" },
  // Pexels stock showroom interiors until the client supplies photos of its own Aubervilliers showrooms.
  tiles: [
    px("5699098/pexels-photo-5699098.jpeg", "The hat wall", 600),
    px("21336434/pexels-photo-21336434/free-photo-of-hats-selection-in-clothing-store.jpeg", "Caps and flat caps", 600),
    px("581344/pexels-photo-581344.jpeg", "Leather goods", 600),
    px("5699091/pexels-photo-5699091.jpeg", "Try before you buy", 600),
    px("21336435/pexels-photo-21336435/free-photo-of-display-of-hats-in-store.jpeg", "Winter stock", 600),
    px("14447086/pexels-photo-14447086.jpeg", "Bags and belts", 600),
  ],
};

export const footer = {
  line: "Wholesale hats and leather goods for professionals.",
  phoneLine: "Our team is here on 01 48 39 94 82, Monday to Friday, 9:00–18:00.",
  columns: [
    { title: "Help", links: ["Contact us", "FAQ", "Delivery and order tracking", "My account"] },
    { title: "Information", links: ["Our showrooms", "Size guide", "Care and after-sales", "Payment"] },
    { title: "About", links: ["Our story", "Legal notice", "Terms of sale", "Personal data"] },
  ],
  contact: [
    "Hologramme Paris, 90 Rue de la Haie Coq, Bât 244-245, 93300 Aubervilliers, France",
    "Hats: 01 48 39 94 82 / 01 42 71 32 18",
    "Leather goods: 09 54 71 94 59",
    "order@hologrammeparis.com",
  ],
  legal: "Prices shown exclude VAT. Shipping extra.",
};
