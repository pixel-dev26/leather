import type { Metadata } from "next";
import { baskerville, figtree } from "@/fonts";
import "./v11.css";

// v11 type (v11rule.md §3): Libre Baskerville for headings, Figtree for everything else.
export const metadata: Metadata = {
  title: "Morucha | Leather Wallets, Purses & Card Holders (v11)",
  description: "RFID-blocking wallets, purses and card holders in soft, nappa and hunter leather. Free UK delivery, same-day dispatch and gift boxed as standard.",
};

export default function V11Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v11 ${baskerville.variable} ${figtree.variable}`}>{children}</div>;
}
