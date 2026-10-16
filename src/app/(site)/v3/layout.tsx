import type { Metadata } from "next";
import { Inter, Roboto_Condensed } from "next/font/google";
import "./v3.css";

// v3 type (v3rule.md §3): Roboto Condensed Bold for every heading, Inter standing in for Graphik.
const condensed = Roboto_Condensed({ subsets: ["latin"], weight: "700", variable: "--font-condensed", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | British Leather (v3)",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and bags.",
};

export default function V3Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v3 ${condensed.variable} ${inter.variable}`}>{children}</div>;
}
