// TEMPORARY PHOTOGRAPHY FOR v3
// Every photo below comes from Pexels (pexels.com/search/leather%20wallet/) and is hot-linked from
// images.pexels.com. Pexels photos are free to use under the Pexels licence, but they are stock images
// of other makers' wallets: replace them with Morucha's own photography before launch (put files in
// /public/images and change the URL to "/images/<file>.webp"). Photo pages: https://www.pexels.com/photo/<id>/

const px = (path: string, width = 1200) => `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${width}`;

// One entry per Pexels photo (id/file), named by what it shows.
const P = {
  studioBoxes: "7952556/pexels-photo-7952556.jpeg", // wallets and cardholders on violet and green boxes (3:2)
  cameraWood: "4452393/pexels-photo-4452393.jpeg", // handmade wallets and a film camera on wood (3:2)
  cameraWoodTall: "4452399/pexels-photo-4452399.jpeg", // same shoot, portrait
  giftWrap: "6651193/pexels-photo-6651193.jpeg", // wallets with ribbon and gift paper (3:2)
  tanRows: "28028262/pexels-photo-28028262/free-photo-of-the-leather-wallet-is-made-from-brown-leather.jpeg", // tan card wallets on cream (3:2)
  orangeMinimal: "37326694/pexels-photo-37326694/free-photo-of-minimalist-orange-leather-wallet-on-beige-background.jpeg", // one orange wallet on beige (3:2)
  backPocket: "7085786/pexels-photo-7085786.jpeg", // wallet in a jeans back pocket (3:2)
  stitchWood: "915917/pexels-photo-915917.jpeg", // brown wallet stitching on wood (3:2)
  pinkSet: "37326652/pexels-photo-37326652/free-photo-of-collection-of-stylish-leather-wallets-on-pink-background.jpeg",
  topCollection: "28028316/pexels-photo-28028316/free-photo-of-the-leather-wallet-is-made-from-brown-and-tan.jpeg",
  cuttingMat: "33428339/pexels-photo-33428339/free-photo-of-handcrafted-leather-wallets-on-cutting-mat.jpeg",
  drinkFlatlay: "28086454/pexels-photo-28086454/free-photo-of-glass-of-drink-and-wallets.jpeg",
  tanMinimal: "28028234/pexels-photo-28028234/free-photo-of-leather-wallet-tan.jpeg",
  handsThree: "4452509/pexels-photo-4452509.jpeg",
  brownShades: "28028171/pexels-photo-28028171/free-photo-of-rows-of-leather-wallets-in-various-shades-of-brown.jpeg",
  orangeBooks: "37326646/pexels-photo-37326646/free-photo-of-stylish-leather-wallets-with-books-on-pink-background.jpeg",
  openWallets: "28027963/pexels-photo-28027963/free-photo-of-open-leather-wallets-with-pockest.jpeg",
  handCardholder: "10634549/pexels-photo-10634549.jpeg",
  woodWall: "14402041/pexels-photo-14402041.jpeg",
  orangeBrownCards: "28028260/pexels-photo-28028260/free-photo-of-orange-and-brown-leather-card-holders.jpeg",
  brownCopySpace: "27467367/pexels-photo-27467367/free-photo-of-elegant-leather-wallet.jpeg",
  smallCards: "28028264/pexels-photo-28028264/free-photo-of-small-leather-card-holders.jpeg",
  blackWood: "7085799/pexels-photo-7085799.jpeg",
} as const;

/** Full-bleed banners: a landscape crop for desktop and a portrait crop for phones. */
export type BannerArt = { desktop: string; mobile: string };
const art = (desktop: string, mobile: string): BannerArt => ({ desktop: px(desktop, 1920), mobile: px(mobile, 900) });

export const banners = {
  orange: art(P.orangeMinimal, P.tanMinimal),
  tanRows: art(P.tanRows, P.topCollection),
  gifting: art(P.giftWrap, P.drinkFlatlay),
  workshop: art(P.cameraWood, P.cameraWoodTall),
  stitch: art(P.stitchWood, P.brownCopySpace),
  studio: art(P.studioBoxes, P.blackWood),
} as const;

// Card images (cropped to 4:5, 1:1 or 2:3 by the layout)
const card = (path: string) => px(path, 900);
export const photos = Object.fromEntries(Object.entries(P).map(([k, v]) => [k, card(v)])) as Record<keyof typeof P, string>;

/** Product spotlight gallery, per colour. */
export const walletGallery = {
  orange: [photos.orangeMinimal, photos.orangeBooks, photos.pinkSet, photos.orangeBrownCards],
  tan: [photos.tanMinimal, photos.tanRows, photos.openWallets, photos.smallCards],
  brown: [photos.stitchWood, photos.brownShades, photos.handsThree, photos.cameraWood],
  black: [photos.blackWood, photos.backPocket, photos.woodWall, photos.studioBoxes],
};

export const community = [
  photos.handsThree,
  photos.backPocket,
  photos.cuttingMat,
  photos.handCardholder,
  photos.orangeBooks,
  photos.cameraWoodTall,
  photos.drinkFlatlay,
  photos.giftWrap,
  photos.brownShades,
  photos.woodWall,
];
