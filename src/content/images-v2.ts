// TEMPORARY REFERENCE PHOTOGRAPHY FOR v2
// Lifestyle and product photos belong to Oliver Co. London (olivercompanylondon.com); the featured
// product gallery belongs to DailyObjects (dailyobjects.com). They are hot-linked only to preview the
// design and are NOT licensed for Morucha. Replace every entry with Morucha's own photos
// (put files in /public/images and change the URL to "/images/<file>.jpg") before the site goes live.

const oc = (file: string, width = 1600) => `https://olivercompanylondon.com/cdn/shop/files/${file}?width=${width}`;

export const ocImg = {
  coverWide: oc("OliverCo_Cover_photo-website-1_01fd6b75-db66-4608-90d0-8e61907ba814.png", 2400),
  laptopDesk: oc("Homepage_photo.jpg", 2000),
  blackCollection: oc("Black_Collection_Wide.png", 2400),
  craftsman: oc("Factories_3f13f4aa-be57-4dc6-8622-141610bb29cf.jpg"),
  craftsmanPortrait: oc("factory_photos_for_mobile_3.jpg"),
  walletGrass: oc("Premium_Compact_Wallet_0000_Layer_2.jpg"),
  cardCoffee: oc("Slim_Card_Holder_0002_File_007.jpg"),
  handsOutdoor: oc("Compact_Wallet__0000_Rune_Erlend.jpg"),
  greenBlackPair: oc("Premium_Slim_Card_Holder_1.jpg"),
  darkWallets: oc("Compact_Wallet__0002_NEW-NORM00003.jpg"),
  orangeCardDark: oc("walletsandcardholders.png"),
  handsGreen: oc("DSCF2905_copy.jpg"),
  greenCardPortrait: oc("Premium-Card-Holder-forest-green-5.jpg"),
  blackWallet: oc("IMG_7267.jpg"),
  bifoldBlack: oc("Large-bi-fold-wallet-black-5-web.jpg"),
  flatlay: oc("2.jpg"),
  camoWallet: oc("Premium_Camo_Wallet_4_web_d5ddd73f-efb8-4926-a0dd-40ce420f2804.jpg"),
  walletPhoneTable: oc("image00002.jpg"),
  pocketWallet: oc("Premium_Compact_Wallet_0001_IMG_1739.jpg"),
  manCafe: oc("310453560_416294047294963_482821261568348637_n.jpg"),
  slimCardStudio: oc("Slim_Card_Holder_0000_Layer_4.jpg"),
  noteBlack: oc("Premium-Note-Vegan-Wallet-Black-2-2026-1.jpg"),
  noteGreen: oc("Premium-Note-Vegan-Wallet-Forest-Green_c2b2911a-1965-488b-982f-8560287cac65.jpg"),
  noteGreenOpen: oc("Premium-Note-Vegan-Wallet-Forest-Green-4.jpg"),
  noteGreenDetail: oc("Premium-Note-Vegan-Wallet-Forest-Green-5.jpg"),
  compactRed: oc("Premium_Red_Wallet_new_hero_b144648b-5be7-4623-84d3-127e6a28c52a.jpg"),
  compactLifestyle: oc("ReviewsLifestyePremiumCompactWallet-07.png"),
  passportSet: oc("Passport_Holder_and_Compact_Wallet.jpg"),
  passportSetOpen: oc("Passport_Holder_and_Compact_Wallet_3.jpg"),
  passportNavy: oc("IMG_7243.jpg"),
  passportNavyOpen: oc("IMG_7285.jpg"),
  toteBag: oc("Everyday-Tote-Bag-Black-3-web.jpg"),
  toteBagStudio: oc("Everyday-Tote-Bag-Black-1-web_0155a8e4-5f53-4ec9-9044-f44958db24d0.jpg"),
  washBag: oc("Wash-Bag-Black-1-web.jpg"),
} as const;

// DailyObjects "Check-in Passport Wallet" gallery, per colour.
const DO = "https://images.dailyobjects.com/marche/product-images/1403/check-in-passport-wallet-";
const doImg = (colour: string, file: string) => `${DO}${colour}-images/${file}?tr=cm-pad_resize,v-3,w-1000`;
const doSet = (colour: string) => {
  const C = colour[0].toUpperCase() + colour.slice(1);
  return [
    doImg(colour, `${C}-Check-in-Passport-Wallet.png`),
    doImg(colour, `${C}-Check-in-Passport-Wallet-1st.png`),
    doImg(colour, `${C}-Check-in-Passport-Wallet-7.png`),
  ];
};

export const passportGallery = {
  red: [
    doImg("red", "Red-Check-in-Passport-Wallet.png"),
    doImg("red", "Red-Check-in-Passport-Wallet-8.jpg"),
    doImg("red", "Red-Check-in-Passport-Wallet-1st.png"),
    doImg("red", "Red-Check-in-Passport-Wallet-3r.png"),
    doImg("red", "Red-Check-in-Passport-Wallet-4th.jpg"),
    doImg("red", "Red-Check-in-Passport-Wallet-5.png"),
    doImg("red", "Red-Check-in-Passport-Wallet-7.png"),
  ],
  black: doSet("black"),
  blue: doSet("blue"),
  tan: doSet("tan"),
};
