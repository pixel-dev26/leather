// Morucha home page, version 8 (reference: finisterre.com). Every product, name, price and product photo comes from
// the live store data (src/content/products.json) and every lifestyle photo is Morucha's own; see src/content/home-v8.ts.
import Header from "@/components/v8/Header";
import Hero from "@/components/v8/Hero";
import Rail from "@/components/v8/Rail";
import Footer from "@/components/v8/Footer";
import { LinkCard, ProductCard } from "@/components/v8/Cards";
import { MotionRoot } from "@/components/v8/Motion";
import { NewsletterPopup } from "@/components/v8/Newsletter";
import { Banner, Feature, Journal, ServiceRow } from "@/components/v8/Sections";
import Statement from "@/components/v8/Statement";
import {
  announcements, banner, categories, explore, favouritesRail, feature, footer, hero, journal, nav, newRail, newsletter, service, statement, utility,
} from "@/content/home-v8";

export default function HomeV8() {
  return (
    <>
      <MotionRoot />
      <Header announcements={announcements} utility={utility} nav={nav} />
      <main>
        <Hero {...hero} />

        <section className="v8-section" aria-labelledby="v8-categories">
          <h2 id="v8-categories" className="v8-wrap v8-h2" data-reveal>{categories.title}</h2>
          <Rail label="categories">
            {categories.items.map((c) => <LinkCard key={c.label} label="Shop" title={c.label} href={c.href} image={c.image} alt={c.alt} />)}
          </Rail>
        </section>

        <Banner {...banner} />

        <section id={newRail.id} className="v8-section" aria-labelledby="v8-new">
          <h2 id="v8-new" className="v8-wrap v8-h2" data-reveal>{newRail.title}</h2>
          <Rail label="new products">
            {newRail.items.map((p) => <ProductCard key={p.handle} p={p} />)}
          </Rail>
        </section>

        <Statement {...statement} />
        <Feature {...feature} />

        <section id={explore.id} className="v8-section" aria-label="Explore Morucha">
          <Rail label="stories">
            {explore.items.map((e) => <LinkCard key={e.title} {...e} />)}
          </Rail>
        </section>

        <Journal {...journal} />

        <section id={favouritesRail.id} className="v8-section" aria-labelledby="v8-favourites">
          <h2 id="v8-favourites" className="v8-wrap v8-h2" data-reveal>{favouritesRail.title}</h2>
          <Rail label="favourite products">
            {favouritesRail.items.map((p) => <ProductCard key={p.handle} p={p} />)}
          </Rail>
        </section>

        <ServiceRow items={service} />
      </main>
      <Footer newsletter={newsletter} {...footer} badge={feature.badge} />
      <NewsletterPopup title={newsletter.popupTitle} text={newsletter.text} image={newsletter.popupImage} alt={newsletter.popupAlt} />
    </>
  );
}
