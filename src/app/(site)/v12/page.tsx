// Morucha home page, version 12 ("Numbered"). Design rules: v12rule.md (ghurka.com; revision 2 section types from
// cuero.in); section order §8.
import Header from "@/components/v12/Header";
import Rail from "@/components/v12/Rail";
import Footer from "@/components/v12/Footer";
import Reviews from "@/components/v12/Reviews";
import { Hero, Leathers, Pair, Story } from "@/components/v12/Sections";
import { CraftBanner, Detail, FactsStrip, HunterBanner, Lookbook, Promises, ShopByStyle } from "@/components/v12/More";
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
        <ShopByStyle />
        <Pair index={0} />
        <Detail />
        <Rail id="bestsellers" {...bestsellers} />
        <HunterBanner />
        <Pair index={1} />
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
