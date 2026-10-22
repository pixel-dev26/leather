// Morucha home page, version 9 (references: rapha.cc, finisterre.com, bucherer.com). Every product, name, price and
// stock state comes from the live store data (src/content/products.json), and every photo is Morucha's own; see
// src/content/home-v9.ts.
import Marquee from "@/components/v9/Marquee";
import Header, { type SearchItem } from "@/components/v9/Header";
import Hero from "@/components/v9/Hero";
import Footer from "@/components/v9/Footer";
import { MotionRoot } from "@/components/v9/Motion";
import { ProductRail } from "@/components/v9/Products";
import { Campaign, Categories, Gifts, Promises, Statement, Stories } from "@/components/v9/Sections";
import { catalogue } from "@/content/home-v7";
import {
  announcements, campaign, categories, favourites, footer, gifts, hero, nav, newIn, promises, statement, stories,
} from "@/content/home-v9";
import { products } from "@/content/products";

// What the header search looks through: the card name and leather, plus the collection words people type
const search: SearchItem[] = catalogue.map((p, i) => ({
  handle: p.handle,
  name: p.name,
  leather: p.leather,
  price: p.price,
  image: p.image,
  terms: [p.leather, p.name, products[i].collections.includes("women") ? "women ladies purse clutch" : "men wallet", "rfid"].join(" ").toLowerCase(),
}));

export default function HomeV9() {
  return (
    <>
      <MotionRoot />
      <Marquee items={announcements} />
      <Header nav={nav} search={search} />
      <main>
        <Hero data={hero} />
        <ProductRail rail={newIn} />
        <Categories data={categories} />
        <Statement data={statement} />
        <Campaign data={campaign} />
        <Gifts data={gifts} />
        <ProductRail rail={favourites} />
        <Stories data={stories} />
        <Promises items={promises} />
      </main>
      <Footer data={footer} />
    </>
  );
}
