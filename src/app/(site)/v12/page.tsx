// v12 home page for Cuero (client; logo, photos, film and products used with Cuero's permission). Layout and design
// rules: v12rule.md (ghurka.com, with revision 2 section types from cuero.in); section order §8.
import Header from "@/components/v12/Header";
import Rail from "@/components/v12/Rail";
import Footer from "@/components/v12/Footer";
import Reviews from "@/components/v12/Reviews";
import { Hero, Leathers, Pair, Story } from "@/components/v12/Sections";
import { CraftBanner, Detail, FactsStrip, Lookbook, Promises, RangeBanner, ShopByStyle } from "@/components/v12/More";
import { bestsellers, newIn } from "@/content/home-v12";

export default function HomeV12() {
  return (
    <>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <FactsStrip />
        <Rail id="new" {...newIn} />
        <div id="styles"><ShopByStyle /></div>
        <Pair index={0} />
        <Detail />
        <Rail id="bestsellers" {...bestsellers} />
        <RangeBanner />
        <Leathers />
        <Lookbook />
        <CraftBanner />
        <Story />
        <Reviews />
        <Promises />
      </main>
      <Footer />
    </>
  );
}
