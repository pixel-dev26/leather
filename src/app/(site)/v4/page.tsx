// Morucha home page, version 4. Design rules: v4rule.md (supertannery.com primary). Same sections as v1.
import Header from "@/components/v4/Header";
import Hero from "@/components/v4/Hero";
import Statement from "@/components/v4/Statement";
import Bestsellers from "@/components/v4/Bestsellers";
import Offer from "@/components/v4/Offer";
import Spotlight from "@/components/v4/Spotlight";
import Footer from "@/components/v4/Footer";
import { Collections, Leathers, Makers, Process, Story, Sustainability, Trade } from "@/components/v4/Sections";

export default function HomeV4() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Leathers />
        <Bestsellers />
        <Offer />
        <Spotlight />
        <Story />
        <Process />
        <Collections />
        <Sustainability />
        <Makers />
        <Trade />
      </main>
      <Footer />
    </>
  );
}
