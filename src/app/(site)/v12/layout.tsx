import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./v12.css";

// v12 type (v12rule.md §3): Newsreader stands in for Ghurka's Reckless Neue, Hanken Grotesk for Suisse Intl. Both load
// as variable fonts so the 450 text weight measured on ghurka.com is available.
const newsreader = Newsreader({ subsets: ["latin"], axes: ["opsz"], variable: "--font-newsreader", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | Leather Wallets, Purses & Card Holders (v12)",
  description: "RFID-blocking wallets, purses and card holders in soft, nappa and hunter leather, each named by its model number. Free UK delivery and same-day dispatch.",
};

export default function V12Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v12 ${newsreader.variable} ${hanken.variable}`}>{children}</div>;
}
