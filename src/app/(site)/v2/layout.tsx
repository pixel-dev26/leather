import type { Metadata } from "next";
import { jost, instrumentSerif as serif } from "@/fonts";
import "./v2.css";

// v2 type (v2rule.md §3, §12): Jost stands in for Supreme LL; Instrument Serif italic for the few serif moments.
export const metadata: Metadata = {
  title: "Morucha | British Leather (v2)",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and travel bags.",
};

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v2 ${jost.variable} ${serif.variable}`}>{children}</div>;
}
