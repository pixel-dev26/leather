// Morucha home page, version 6 (references: chromeindustries.com, adidas.co.in). Every product, name, price and
// product photo comes from the live store data (src/content/products.json); see src/content/home-v6.ts.
import Header from "@/components/v6/Header";
import Hero from "@/components/v6/Hero";
import Spotlight from "@/components/v6/Spotlight";
import Footer from "@/components/v6/Footer";
import { MotionRoot } from "@/components/v6/Motion";
import { ProductRail, ShopAll } from "@/components/v6/Products";
import { Banner, Categories, Perks, Statement, Stories } from "@/components/v6/Sections";
import {
  announcement, banner, catalogue, categories, footer, heroSlides, nav, newsletter, perks, rail, shopAll, spotlight, statement, stories,
} from "@/content/home-v6";

export default function HomeV6() {
  return (
    <>
      <MotionRoot />
      <Header announcement={announcement} nav={nav} />
      <main>
        <Hero slides={heroSlides} />
        <Statement data={statement} />
        <Categories items={categories} />
        <ProductRail title={rail.title} tabs={rail.tabs} />
        <Banner data={banner} />
        <Spotlight data={spotlight} />
        <Stories items={stories} />
        <ShopAll title={shopAll.title} products={catalogue} filters={shopAll.filters} sorts={shopAll.sorts} pageSize={shopAll.pageSize} />
        <Perks items={perks} />
      </main>
      <Footer data={footer} newsletter={newsletter} />
    </>
  );
}
