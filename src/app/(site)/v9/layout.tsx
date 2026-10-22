import type { Metadata } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./v9.css";

// v9 type, after Rapha: a condensed grotesque in bold capitals for headings, labels, buttons and product names
// (Archivo, narrowed on its width axis), over a reading serif for body copy and prices (Newsreader).
const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--font-v9-display", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-v9-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | Genuine Leather Wallets & Purses, Made to Be Carried (v9)",
  description:
    "Genuine leather wallets, purses and card holders with built-in RFID blocking, gift boxed, with free UK delivery and same-day dispatch before 3.30pm.",
};

export default function V9Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v9 ${display.variable} ${serif.variable}`}>{children}</div>;
}
