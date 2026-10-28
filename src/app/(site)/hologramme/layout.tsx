import type { Metadata } from "next";
import { playfair, funnelSans as funnel } from "@/fonts";
import "./hologramme.css";

// Hologramme type (hologramme-rule.md §3): Playfair Display for names and headings, Funnel Sans for everything else.
export const metadata: Metadata = {
  title: "Hologramme Paris | Wholesale Hats and Leather Goods",
  description: "Hologramme Paris supplies professionals with hats, caps, scarves, gloves, wallets, belts and bags. Trade customers only.",
};

export default function HologrammeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`hologramme ${playfair.variable} ${funnel.variable}`}>{children}</div>;
}
