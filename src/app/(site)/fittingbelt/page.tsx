import Header from "@/components/sections/Header";
import SideTabs from "@/components/sections/SideTabs";
import Hero from "@/components/sections/Hero";
import StatementBanner from "@/components/sections/StatementBanner";
import OurLeathers from "@/components/sections/OurLeathers";
import Bestsellers from "@/components/sections/Bestsellers";
import DiscoverCards from "@/components/sections/DiscoverCards";
import ProductSpotlight from "@/components/sections/ProductSpotlight";
import OurStory from "@/components/sections/OurStory";
import Process from "@/components/sections/Process";
import Collections from "@/components/sections/Collections";
import Sustainability from "@/components/sections/Sustainability";
import WornByYou from "@/components/sections/WornByYou";
import TradeWholesale from "@/components/sections/TradeWholesale";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

// The Fitting Belt Company home page (fittingbelt.com.au), version 1. Design rules: v1rule.md (spica-inc.jp primary).
// Content: src/content/home.ts and ./fittingbelt.ts.
export const metadata: Metadata = {
  title: "The Fitting Belt Company | Genuine Leather Belts, Bags and Wallets",
  description: "The Fitting Belt Company makes and wholesales men's, women's and children's genuine leather belts, bags, satchels and wallets.",
};

export default function HomeV1() {
  return (
    <>
      <Header />
      <SideTabs />
      <main>
        <Hero />
        <StatementBanner />
        <OurLeathers />
        <Bestsellers />
        <DiscoverCards />
        <ProductSpotlight />
        <OurStory />
        <Process />
        <Collections />
        <Sustainability />
        <WornByYou />
        <TradeWholesale />
      </main>
      <Footer />
    </>
  );
}
