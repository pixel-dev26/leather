// The real Morucha products the home pages feature, shared by every version. Names, prices, SKUs and photos all
// come from the store data in ./products.json (names exactly as titled on morucha.co.uk); the photos are the local
// copies in /public/images/products/<handle>/.

import { formatPrice, getProduct } from "./products";

function item(handle: string) {
  const p = getProduct(handle);
  if (!p) throw new Error(`Product not in products.json: ${handle}`);
  /** Local photo n, numbered like the files (1 = 01.jpg). */
  const photo = (n: number) => {
    const im = p.images[n - 1];
    if (!im) throw new Error(`${handle} has no photo ${n}`);
    return im.src;
  };
  const name = p.title.replace(/\s+/g, " ").trim(); // store title, with its stray double spaces removed
  return { ...p, name, priceLabel: formatPrice(p.price), photo, photos: (...ns: number[]) => ns.map(photo) };
}

export const shop = {
  bifoldCoin: item("morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028"),
  verticalCoin: item("morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m-2028-copy"),
  twoToneBifold: item("morucha-men-s-rfid-blocking-leather-wallet-genuine-soft-leather-bifold-with-coin-pocket-id-windows-m2015-black-tan"),
  hunterBifold: item("mens-rfid-blocking-real-distressed-hunter-leather-wallet-dark-brown"),
  hunterBillfold: item("mens-rfid-hunter-leather-billfold-wallet"),
  hunterTrifold: item("mens-rfid-blocking-compact-genuine-distressed-hunter-leather-trifold-wallet-m45-brown"),
  bikerChain: item("mens-genuine-distressed-leather-biker-wallet-with-detachable-31cm-safety-chain-m100-dark-brown"),
  giftPasscase: item("morucha-men-s-rfid-blocking-soft-leather-passcase-wallet-bifold-card-holder-with-id-windows-gift-box-m115-burgundy"),
  slimCard: item("morucha-men-s-rfid-blocking-genuine-leather-wallet-slim-bifold-card-holder-with-id-window-8-card-slots-m110-tan"),
  tapAndGo: item("morucha-men-s-tap-go-rfid-blocking-leather-wallet-minimalist-passcase-bifold-with-external-card-pocket-m130-black"),
  cardHolder: item("2-in-1-compact-business-card-holder-wallet"),
  longClutch: item("morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m95"),
  flapClutch: item("morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-m90"),
  compactClutch: item("morucha-clutch-wallet-for-women-genuine-leather-rfid-blocking-high-capacity-cardholder-purse-m85"),
  zipPurse: item("womens-ladies-girls-rfid-blocking-real-leather-long-clutch-wallet-purse-dark-blue"),
  twoToneClutch: item("women-genuine-leather-rfid-clutch-wallet-red-black"),
};

/** Swatch colours for the store's colour names; two-tone leathers are split diagonally. */
export const hex = {
  black: "#1d1b1b",
  tan: "#a8703f",
  brown: "#4a2c1c",
  hunter: "#6b4127",
  olive: "#6f6b3c",
  grey: "#8a8a8a",
  burgundy: "#5e1a22",
  fuchsia: "#93306e",
  red: "#c3271f",
  navy: "#2a3550",
};
export const twoTone = (a: string, b: string) => `linear-gradient(135deg, ${a} 50%, ${b} 50%)`;

/** Each colour of the multi-colour products with its own run of photos, in the order the store lists them. */
export const colourways = {
  bifoldCoin: [
    { name: "Black / Tan", swatch: twoTone(hex.black, hex.tan), images: shop.bifoldCoin.photos(11, 12, 14, 15, 16, 18) },
    { name: "Tan / Black", swatch: twoTone(hex.tan, hex.black), images: shop.bifoldCoin.photos(19, 20, 21, 22, 23, 25) },
    { name: "Black / Green", swatch: twoTone(hex.black, hex.olive), images: shop.bifoldCoin.photos(26, 27, 28, 30, 31, 34) },
    { name: "Black / Grey", swatch: twoTone(hex.black, hex.grey), images: shop.bifoldCoin.photos(5, 6, 7, 8, 9, 10) },
  ],
  flapClutch: [
    { name: "Burgundy", swatch: hex.burgundy, images: shop.flapClutch.photos(1, 2, 3, 5, 6, 7) },
    { name: "Black", swatch: hex.black, images: shop.flapClutch.photos(21, 22, 23, 24, 27, 28) },
    { name: "Dark Brown", swatch: hex.brown, images: shop.flapClutch.photos(29, 30, 31, 32, 33, 34) },
    { name: "Grey", swatch: hex.grey, images: shop.flapClutch.photos(8, 10, 11, 12, 13) },
    { name: "Fuchsia", swatch: hex.fuchsia, images: shop.flapClutch.photos(14, 16, 17, 18, 19, 20) },
  ],
  compactClutch: [
    { name: "Black", swatch: hex.black, images: shop.compactClutch.photos(14, 15, 16, 17, 18, 19) },
    { name: "Red", swatch: hex.red, images: shop.compactClutch.photos(20, 21, 22, 23, 24, 25) },
    { name: "Grey", swatch: hex.grey, images: shop.compactClutch.photos(8, 9, 10, 11, 12, 13) },
    { name: "Brown", swatch: hex.hunter, images: shop.compactClutch.photos(1, 2, 3, 4, 5, 6) },
  ],
  // One photo per colour on the store, so cards swap the photo when a swatch is picked.
  longClutch: [
    { name: "Burgundy", swatch: hex.burgundy, images: shop.longClutch.photos(1) },
    { name: "Black", swatch: hex.black, images: shop.longClutch.photos(7) },
    { name: "Dark Brown", swatch: hex.brown, images: shop.longClutch.photos(10) },
    { name: "Fuchsia", swatch: hex.fuchsia, images: shop.longClutch.photos(8) },
    { name: "Grey", swatch: hex.grey, images: shop.longClutch.photos(11) },
    { name: "Red", swatch: hex.red, images: shop.longClutch.photos(9) },
  ],
  verticalCoin: [
    { name: "Tan / Black", swatch: twoTone(hex.tan, hex.black), images: shop.verticalCoin.photos(5) },
    { name: "Black / Tan", swatch: twoTone(hex.black, hex.tan), images: shop.verticalCoin.photos(10) },
  ],
};
