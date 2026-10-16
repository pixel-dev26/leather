// TEMPORARY REFERENCE PHOTOGRAPHY
// These photos belong to Motoazabu Spica (spica-inc.jp) and are hot-linked only to preview the
// design. They are NOT licensed for Morucha. Replace every entry with Morucha's own photos
// (put files in /public/images and change the URL to "/images/<file>.webp") before the site goes live.

const S = "https://www.spica-inc.jp/wp/wp-content/uploads/2025/07/leather-accessories-";

// Product spotlight photos belong to DailyObjects (dailyobjects.com), also hot-linked for preview only.
const D = "https://images.dailyobjects.com/marche/product-images/1403/check-in-passport-wallet-red-images/Red-Check-in-Passport-Wallet";
const dq = "?tr=cm-pad_resize,v-3,q-auto,f-auto,w-1000";

export const spotlightImg = [
  `${D}.png${dq}`,
  `${D}-1st.png${dq}`,
  `${D}-3r.png${dq}`,
  `${D}-4th.jpg${dq}`,
  `${D}-6.png${dq}`,
  `${D}-7.png${dq}`,
];

export const img = {
  heroHands: "https://www.spica-inc.jp/wp/wp-content/uploads/2025/07/pagettl-bg-leather-accessories.jpg",
  heroGrain: `${S}slide01.jpg`,
  heroSuit: `${S}img12.jpg`,
  workshopDesk: `${S}img01.jpg`,
  grainPanels: `${S}slide01.jpg`,
  swatchFan: `${S}img02.jpg`,
  swatchGreen: `${S}img03.jpg`,
  tooling: `${S}img04.jpg`,
  flatlay: `${S}img06.jpg`,
  cardGift: `${S}img07.jpg`,
  walletBurgundy: `${S}img08.jpg`,
  walletNavy: `${S}img09.jpg`,
  cardBlueTaupe: `${S}img10.jpg`,
  cardYellow: `${S}img11.jpg`,
  suitPocket1: `${S}img12.jpg`,
  suitPocket2: `${S}img13.jpg`,
  suitPocket3: `${S}img14.jpg`,
  suitNavyWallet: `${S}img15.jpg`,
  purseOpen1: `${S}img16.jpg`,
  purseOpen2: `${S}img17.jpg`,
  purseOpen3: `${S}img18.jpg`,
  purseInside: `${S}img34.jpg`,
} as const;
