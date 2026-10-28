import type { Metadata } from "next";
import { Figtree, Libre_Baskerville } from "next/font/google";
import "./v11.css";

// v11 type (v11rule.md §3): Libre Baskerville for headings, Figtree for everything else.
const baskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400"], variable: "--font-baskerville", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | Leather Wallets, Purses & Card Holders (v11)",
  description: "RFID-blocking wallets, purses and card holders in soft, nappa and hunter leather. Free UK delivery, same-day dispatch and gift boxed as standard.",
};

export default function V11Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v11 ${baskerville.variable} ${figtree.variable}`}>{children}</div>;
}
