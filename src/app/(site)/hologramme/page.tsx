// Hologramme Paris home page ("Sage & Saddle" design). Design rules: hologramme-rule.md (adamis.in primary); section order §10.
import Header from "@/components/hologramme/Header";
import Hero from "@/components/hologramme/Hero";
import Footer from "@/components/hologramme/Footer";
import { Bestsellers, Categories, Collections, Inside, Marquee, Promises, Story } from "@/components/hologramme/Sections";
import Reviews from "@/components/hologramme/Reviews";
import { ColourExplorer, Favourites, ShopTheLook, Trending } from "@/components/hologramme/Discover";

export default function HomeHologramme() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Categories />
        <Bestsellers />
        <Story />
        <Favourites />
        <Promises kind="craft" />
        <Collections />
        <Trending />
        <ColourExplorer />
        <ShopTheLook />
        <Reviews />
        <Inside />
        <Promises kind="service" />
      </main>
      <Footer />
    </>
  );
}
