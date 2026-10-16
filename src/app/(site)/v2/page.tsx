// Morucha home page, version 2. Design rules: v2rule.md (Craftory primary, Septième Largeur secondary).
import Header from "@/components/v2/Header";
import Hero from "@/components/v2/Hero";
import Products from "@/components/v2/Products";
import CollectionSlider from "@/components/v2/CollectionSlider";
import FeaturedProduct from "@/components/v2/FeaturedProduct";
import Sustainability from "@/components/v2/Sustainability";
import Makers from "@/components/v2/Makers";
import Trade from "@/components/v2/Trade";
import NewsletterPopup from "@/components/v2/NewsletterPopup";
import Footer from "@/components/v2/Footer";
import { Leathers, Process, Statement, Story } from "@/components/v2/Sections";

export default function HomeV2() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Leathers />
        <Products />
        <Story />
        <Process />
        <CollectionSlider />
        <FeaturedProduct />
        <Sustainability />
        <Makers />
        <Trade />
      </main>
      <Footer />
      <NewsletterPopup />
    </>
  );
}
