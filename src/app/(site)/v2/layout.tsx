import type { Metadata } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import "./v2.css";

// v2 type (v2rule.md §3, §12): Jost stands in for Supreme LL; Instrument Serif italic for the few serif moments.
const jost = Jost({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--font-jost", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | British Leather (v2)",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and travel bags.",
};

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v2 ${jost.variable} ${serif.variable}`}>{children}</div>;
}
