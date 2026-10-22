import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./v8.css";

// v8 type: one neo-grotesque (Instrument Sans, standing in for the reference's Helvetica Neue 55) at a single regular
// weight, in title case with a little open tracking. Size does the work, not weight.
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-v8-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Morucha | Leather Wallets & Purses, Made to Carry Every Day (v8)",
  description:
    "Genuine leather wallets, purses and card holders with built-in RFID blocking, gift boxed, with free UK delivery and same-day dispatch before 3.30pm.",
};

export default function V8Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v8 ${sans.variable}`}>{children}</div>;
}
