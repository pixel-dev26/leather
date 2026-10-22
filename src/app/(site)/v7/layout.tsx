import type { Metadata } from "next";
import { Libre_Caslon_Display, Manrope } from "next/font/google";
import "./v7.css";

// v7 type: Libre Caslon Display (Caslon, the classic British serif) for headings, in sentence case at its one
// weight; Manrope for everything else, with small tracked uppercase for eyebrows, labels and buttons.
const serif = Libre_Caslon_Display({ subsets: ["latin"], weight: "400", variable: "--font-v7-serif", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-v7-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | Genuine Leather Wallets & Purses with RFID Protection (v7)",
  description:
    "Genuine leather wallets, purses and card holders with built-in RFID blocking, presented in a Morucha gift box with free UK delivery.",
};

export default function V7Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v7 ${serif.variable} ${sans.variable}`}>{children}</div>;
}
