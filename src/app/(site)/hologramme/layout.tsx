import type { Metadata } from "next";
import { Funnel_Sans, Playfair_Display } from "next/font/google";
import "./hologramme.css";

// Hologramme type (hologramme-rule.md §3): Playfair Display for names and headings, Funnel Sans for everything else.
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-playfair", display: "swap" });
const funnel = Funnel_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-funnel", display: "swap" });

export const metadata: Metadata = {
  title: "Hologramme Paris | Wholesale Hats and Leather Goods",
  description: "Hologramme Paris supplies professionals with hats, caps, scarves, gloves, wallets, belts and bags. Trade customers only.",
};

export default function HologrammeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`hologramme ${playfair.variable} ${funnel.variable}`}>{children}</div>;
}
