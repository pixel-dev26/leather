import type { Metadata } from "next";
import { Jost, Plus_Jakarta_Sans } from "next/font/google";
import "./v4.css";

// v4 type (v4rule.md §3): Plus Jakarta Sans for everything, Jost (Medium since rev 4.5) for the hero headline only.
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-jakarta", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: "500", variable: "--font-jost-light", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | British Leather (v4)",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and travel bags.",
};

export default function V4Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v4 ${jakarta.variable} ${jost.variable}`}>{children}</div>;
}
