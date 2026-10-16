import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./v6.css";

// v6 type: Barlow Condensed (heavy, uppercase) for display, tags and buttons; Barlow for everything else.
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-v6-display", display: "swap" });
const sans = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-v6-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | RFID Leather Wallets & Purses (v6)",
  description: "Genuine leather wallets, purses and card holders with built-in RFID protection, gift boxed with free UK delivery.",
};

export default function V6Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v6 ${display.variable} ${sans.variable}`}>{children}</div>;
}
