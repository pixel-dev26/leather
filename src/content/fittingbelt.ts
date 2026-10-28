// The Fitting Belt Company's own products (fittingbelt.com.au), used by v1 only. Names, prices (AUD) and colour
// options come from the store's products.json, saved in ./fittingbelt-products.json; the photos are local copies in
// /public/images/fittingbelt/<handle>/NN.webp. Lifestyle photos are Pexels stock (free licence), saved in
// /public/images/fittingbelt/lifestyle/, until the client supplies its own.

import data from "./fittingbelt-products.json";

type Raw = (typeof data)[number];

export const formatAud = (value: number) => `A$${value.toFixed(2)}`;

function item(handle: string) {
  const p = data.find((x: Raw) => x.handle === handle);
  if (!p) throw new Error(`Product not in fittingbelt-products.json: ${handle}`);
  /** Local photo n, numbered like the files (1 = 01.webp). */
  const photo = (n: number) => {
    const src = p.images[n - 1];
    if (!src) throw new Error(`${handle} has no photo ${n}`);
    return src;
  };
  // Store titles read "NAME - Description"; the short name is the part before the dash.
  const short = p.title.split(/\s+[-|]\s+/)[0].trim();
  return { ...p, short: short.charAt(0) + short.slice(1).toLowerCase(), priceLabel: formatAud(p.price), photo, href: `https://www.fittingbelt.com.au/products/${handle}` };
}

export const fb = {
  cameron: item("cameron-mens-genuine-leather-reversible-dress-belt-tan-black"),
  terry: item("terry-reversible-belt-black-tan"),
  lenny: item("lenny-reversible-belt-black-white"),
  maxin: item("maxin-revervible-leather-belt-black-white"),
  marcel: item("marcel-black-leather-belt"),
  moreton: item("moreton-mens-black-soft-genuine-leather-belt-silver-pin-buckle"),
  harrison: item("harrison-tan-men-leather-belt"),
  oxford: item("oxford-brown-genuine-leather"),
  byron: item("byron-cotton-canvas-mens-sand-leather-belt"),
  paulo: item("1-canva-belt-with-silver-buckle"),
  bristol: item("9-canva-belt-with-silver-buckle"),
  oscar: item("oscar-belt-gift-pack"),
  romeo: item("romeo-mens-reversible-belt-black-chocolate"),
  deaneenRed: item("red-womens-ladies-deaneen-red-genuine-leather-belt"),
  deaneenBlack: item("deaneen-womens-black-genuine-leather-belt"),
  lacey: item("lacey-womens-off-white-skinny-genuine-leather-patent-belt-with-silver-buckle"),
  marina: item("marina-tan-genuine-leather-knot-waist-belt"),
  indigo: item("indigo-brown-genuine-leather-knot-waist-belt"),
  columbia: item("columbia-black-unisex-genuine-leather-belt"),
  bella: item("new-bella-womens-beige-and-black-snake-leather-reversible-belt-with-round-buckle"),
  waverly: item("waverly-rose-gold-skinny-leather-plaited-belt-with-gold-buckle"),
  justin: item("justin-grey-genuine-leather-wallet"),
  tiger: item("tiger-mens-grey-genuine-leather-wallet-with-bottle-opener-in-gift-box"),
  willis: item("willis-mens-black-genuine-leather-wallet"),
  lucy: item("lucy-vegan-pebbled-leather-soft-handle-bag"),
  centennial: item("centennial-park-womens-pebbled-leather-clutch-bag"),
  ballarat: item("ballarat-mens-black-grey-bag"),
  ronald: item("ronald-mens-brown-fashion-braces"),
  deacon: item("deacon-mens-navy-red-yellow-braces"),
};

/** Swatch colours for the store's colour names; two-tone straps are split diagonally. */
export const fbHex = {
  black: "#1d1b1b",
  tan: "#b06a3b",
  brown: "#5a3420",
  chocolate: "#3d2418",
  white: "#f1eee8",
  cream: "#ece3d2",
  grey: "#8a8a8a",
  red: "#c3271f",
  blush: "#d9a6a0",
  olive: "#5f6b3a",
  pink: "#d977a0",
  blue: "#3b5d9b",
  sand: "#cdb98f",
  burgundy: "#6b1f2a",
};
const two = (a: string, b: string) => `linear-gradient(135deg, ${a} 50%, ${b} 50%)`;

/** Each colour of the multi-colour products with its own photo, in the order the store lists them. */
export const fbColourways = {
  lucy: [
    { name: "Red", swatch: fbHex.red, images: [fb.lucy.photo(2)] },
    { name: "Black", swatch: fbHex.black, images: [fb.lucy.photo(4)] },
    { name: "Tan", swatch: fbHex.tan, images: [fb.lucy.photo(3)] },
    { name: "Blush", swatch: fbHex.blush, images: [fb.lucy.photo(5)] },
  ],
  centennial: [
    { name: "Grey", swatch: fbHex.grey, images: [fb.centennial.photo(4)] },
    { name: "Tan", swatch: fbHex.tan, images: [fb.centennial.photo(5)] },
    { name: "Cream", swatch: fbHex.cream, images: [fb.centennial.photo(7)] },
  ],
  paulo: [
    { name: "Olive / Red stripe", swatch: two(fbHex.olive, fbHex.red), images: [fb.paulo.photo(4)] },
    { name: "Pink / Green stripe", swatch: two(fbHex.pink, fbHex.olive), images: [fb.paulo.photo(3)] },
    { name: "Black / Red stripe", swatch: two(fbHex.black, fbHex.red), images: [fb.paulo.photo(5)] },
    { name: "Brown / Blue stripe", swatch: two(fbHex.brown, fbHex.blue), images: [fb.paulo.photo(2)] },
  ],
  // Reversible belts: one product, two faces.
  cameron: [{ name: "Tan / Black", swatch: two(fbHex.tan, fbHex.black), images: [1, 4, 5, 6, 7, 2].map((n) => fb.cameron.photo(n)) }],
};
