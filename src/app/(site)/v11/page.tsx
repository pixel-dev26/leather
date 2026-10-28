// Morucha home page, version 11 ("Bone & Brass" design, premium revision). Design rules: v11rule.md
// (harberlondon.com first, then cuero.in, buffalojackson.com, laticoleathers.com and others); section order §8.
import Header from "@/components/v11/Header";
import Hero from "@/components/v11/Hero";
import Bestsellers from "@/components/v11/ProductRow";
import Finder from "@/components/v11/Finder";
import Footer from "@/components/v11/Footer";
import { Film, Newsletter } from "@/components/v11/Media";
import { About, Collections, Craft, Faq, Feed, Gifting, Hunter, NewArrivals, Promises } from "@/components/v11/Sections";
import { bestsellers, cards, film, finder, newsletter } from "@/content/home-v11";

export default function HomeV11() {
  return (
    <>
      <span id="top" />
      <Header />
      <main>
        {/* the promise band sits directly under the hero, so they share one slot in the section rhythm */}
        <div>
          <Hero />
          <Promises />
        </div>
        <Bestsellers {...bestsellers} />
        <Collections />
        <Craft />
        <NewArrivals />
        <Gifting />
        <Finder cards={cards} {...finder} />
        <Hunter />
        <Film {...film} />
        <Feed />
        <Faq />
        <Newsletter {...newsletter} />
        <About />
      </main>
      <Footer />
    </>
  );
}
