import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morucha | British Leather, Tanned with Care",
  description:
    "Morucha is a UK leather tannery supplying fine hides to makers and trade, and crafting its own wallets, purses and travel bags.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${garamond.variable} ${montserrat.variable}`} suppressHydrationWarning>
      {/* browser extensions (e.g. Grammarly) add attributes to <html>/<body> before React loads */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
