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
import MadeWithMorucha from "@/components/sections/MadeWithMorucha";
import TradeWholesale from "@/components/sections/TradeWholesale";
import Footer from "@/components/sections/Footer";

// Morucha home page, version 1. Design rules: v1rule.md (spica-inc.jp primary). Moved from "/" to "/v1" so "/" can list all versions.
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
        <MadeWithMorucha />
        <TradeWholesale />
      </main>
      <Footer />
    </>
  );
}
