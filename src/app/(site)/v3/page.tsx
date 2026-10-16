// Morucha home page, version 3. Design rules: v3rule.md (DailyObjects primary). Same sections as v1.
import Header from "@/components/v3/Header";
import Hero from "@/components/v3/Hero";
import Statement from "@/components/v3/Statement";
import Spotlight from "@/components/v3/Spotlight";
import Banner from "@/components/v3/Banner";
import Makers from "@/components/v3/Makers";
import Footer from "@/components/v3/Footer";
import BackToTop from "@/components/v3/BackToTop";
import { Bestsellers, Collections, Discover, Leathers, Process } from "@/components/v3/Sections";
import { story, sustainability, trade } from "@/content/home-v3";

export default function HomeV3() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Leathers />
        <Bestsellers />
        <Discover />
        <Spotlight />
        <Banner {...story} />
        <Process />
        <Collections />
        <Banner {...sustainability} />
        <Makers />
        <Banner {...trade} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
