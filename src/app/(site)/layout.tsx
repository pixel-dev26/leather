import type { Metadata } from "next";
import { garamond, montserrat } from "@/fonts";
import "./globals.css";

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
