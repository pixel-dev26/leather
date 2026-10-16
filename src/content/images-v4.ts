// v4 PHOTOGRAPHY — Unsplash (https://unsplash.com/s/photos/LEATHER-WALLET), selected 15 Oct 2026.
// Free photos under the Unsplash License (commercial use allowed, no attribution required); no Unsplash+
// (premium) images are used. Still stock: replace with Morucha's own photography when it exists.
// v4 swaps every shared v1 image (src/content/images.ts) for one of these through v4Slot(), so v1 and v2 are untouched.

import { img } from "./images";
import type { ImageSlot } from "./home";

const u = (id: string, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** v1 image key → Unsplash replacement with its own alt text */
const swaps: Record<keyof typeof img, { src: string; alt: string }> = {
  heroHands: { src: u("photo-1614330316567-11d8e572db16"), alt: "Hand holding a brown leather card wallet" },
  heroGrain: { src: u("photo-1775379557015-938546264440"), alt: "Assorted leather wallets arranged in neat rows" },
  heroSuit: { src: u("photo-1637168943285-a8f9ea0dc3f5"), alt: "Man in a suit holding a leather wallet" },
  workshopDesk: { src: u("photo-1628483211662-9bcc692c46dc"), alt: "Leather wallet with thread and scissors on a workbench" },
  grainPanels: { src: u("photo-1775379557015-938546264440"), alt: "Assorted leather wallets arranged in neat rows" },
  swatchFan: { src: u("photo-1517254797898-04edd251bfb3"), alt: "Bifold leather wallets in many colours" },
  swatchGreen: { src: u("photo-1646848839907-2882570d9076"), alt: "Green leather wallet on a wooden table" },
  tooling: { src: u("photo-1675010787343-733c27ffe466"), alt: "Leather case with scissors and making tools" },
  flatlay: { src: u("photo-1689844820934-46edfdff7cf9"), alt: "Wallet, card case and keys laid out on a table" },
  cardGift: { src: u("photo-1760624089496-01ae68a92d58"), alt: "Four brown leather bags and wallets arranged together" },
  walletBurgundy: { src: u("photo-1606503825008-909a67e63c3d"), alt: "Hand holding a brown leather bifold wallet" },
  walletNavy: { src: u("photo-1678449544865-c03dc897112d"), alt: "Hand holding a black leather wallet" },
  cardBlueTaupe: { src: u("photo-1512415047789-055da07059ee"), alt: "Brown leather card organiser on grey paving" },
  cardYellow: { src: u("photo-1677326768050-7d437347ca70"), alt: "Tan leather wallet on a grey surface" },
  suitPocket1: { src: u("photo-1685216321110-69383408a2ef"), alt: "Man slipping a wallet into his pocket" },
  suitPocket2: { src: u("photo-1637262448017-0fbbec87a898"), alt: "Man holding a wallet at his pocket" },
  suitPocket3: { src: u("photo-1611099024089-7f57ca9aca7f"), alt: "Man in a blue suit jacket holding a brown leather wallet" },
  suitNavyWallet: { src: u("photo-1585401586477-2a671e1cae4e"), alt: "Black leather bifold wallet in a hand" },
  purseOpen1: { src: u("photo-1657603719375-8ffdacaac790"), alt: "Brown leather purse" },
  purseOpen2: { src: u("photo-1657603487733-66eb1ee1b3ed"), alt: "Brown leather purse, front view" },
  purseOpen3: { src: u("photo-1657603738389-951c374b740c"), alt: "Brown leather purse, detail" },
  purseInside: { src: u("photo-1752184791407-b59e505e5dca"), alt: "Brown leather wallet lying open" },
};

const bySrc = new Map<string, { src: string; alt: string }>(
  (Object.keys(img) as (keyof typeof img)[]).map((k) => [img[k], swaps[k]]),
);

/** Swap a shared v1 image slot for its v4 Unsplash photo (unknown sources pass through unchanged). */
export function v4Slot<T extends ImageSlot>(slot: T): T {
  const s = slot.src ? bySrc.get(slot.src) : undefined;
  return s ? { ...slot, ...s } : slot;
}

export const heroPoster = u("photo-1775379557015-938546264440", 1920);
