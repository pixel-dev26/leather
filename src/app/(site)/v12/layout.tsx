import type { Metadata } from "next";
import { newsreader, hanken } from "@/fonts";
import "./v12.css";

// v12 type (v12rule.md §3): Newsreader stands in for Ghurka's Reckless Neue, Hanken Grotesk for Suisse Intl.
export const metadata: Metadata = {
  title: "Cuero | Handcrafted Leather Shoes, Made to Order in Pune",
  description: "Loafers, oxfords, derbies, monks, sliders and sandals, made to order in Cuero's Pune atelier. Free shipping across India.",
};

export default function V12Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`v12 ${newsreader.variable} ${hanken.variable}`}>{children}</div>;
}
