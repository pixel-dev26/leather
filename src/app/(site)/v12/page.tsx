// Morucha home page, version 12 ("Numbered"). Design rules: v12rule.md (ghurka.com); section order §8.
import Header from "@/components/v12/Header";
import Rail from "@/components/v12/Rail";
import Footer from "@/components/v12/Footer";
import { Hero, Leathers, Pair, Story } from "@/components/v12/Sections";
import { bestsellers, newIn } from "@/content/home-v12";

export default function HomeV12() {
  return (
    <>
      <span id="top" />
      <Header />
      <main>
        <Hero />
        <Rail id="new" {...newIn} />
        <Pair index={0} />
        <Rail id="bestsellers" {...bestsellers} />
        <Pair index={1} />
        <Leathers />
        <Story />
      </main>
      <Footer />
    </>
  );
}
