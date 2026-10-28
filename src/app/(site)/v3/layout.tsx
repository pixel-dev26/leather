import type { Metadata } from "next";
import { robotoCondensed as condensed, inter } from "@/fonts";
import "./v3.css";

// v3 type (v3rule.md §3): Roboto Condensed Bold for every heading, Inter standing in for Graphik.
export const metadata: Metadata = {
  title: "Morucha | British Leather (v3)",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and bags.",
};

export default function V3Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v3 ${condensed.variable} ${inter.variable}`}>{children}</div>;
}
