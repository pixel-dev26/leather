// Morucha home page, version 7 (reference: bucherer.com). Every product, name, price and stock state comes from the
// live store data (src/content/products.json), and every photo is Morucha's own; see src/content/home-v7.ts.
import Header, { type SearchItem } from "@/components/v7/Header";
import Hero from "@/components/v7/Hero";
import Story from "@/components/v7/Story";
import Footer from "@/components/v7/Footer";
import { MotionRoot } from "@/components/v7/Motion";
import { ProductRail } from "@/components/v7/Products";
import { Gifts, Journal, Service, Tiles, World } from "@/components/v7/Sections";
import {
  announcement, catalogue, footer, gifts, heroSlides, journal, menu, rails, service, story, tiles, world,
} from "@/content/home-v7";
import { products } from "@/content/products";

// What the header search looks through: the two card lines, plus the collection words people type
const search: SearchItem[] = catalogue.map((p, i) => ({
  handle: p.handle,
  title: p.name,
  subtitle: p.leather,
  price: p.price,
  image: p.image,
  terms: [p.leather, p.name, products[i].collections.includes("women") ? "women ladies purse clutch" : "men wallet", "rfid"].join(" ").toLowerCase(),
}));

export default function HomeV7() {
  return (
    <>
      <MotionRoot />
      <Header announcement={announcement} menu={menu} search={search} />
      <main>
        <Hero slides={heroSlides} />
        <Tiles items={tiles} />
        <Gifts data={gifts} />
        <ProductRail rail={rails.new} />
        <Story eyebrow={story.eyebrow} chapters={story.chapters} />
        <ProductRail rail={rails.women} />
        <ProductRail rail={rails.hunter} />
        <ProductRail rail={rails.men} />
        <Journal data={journal} />
        <World data={world} />
        <Service data={service} />
      </main>
      <Footer data={footer} />
    </>
  );
}
