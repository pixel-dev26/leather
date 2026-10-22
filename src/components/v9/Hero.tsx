// Rapha's hero: one full-bleed campaign photo with a huge condensed headline, a line of serif and square buttons
// (two of them, as on Finisterre). The photo settles out of a slight zoom on load and the words rise in after it.
import Image from "next/image";
import type { hero as heroData } from "@/content/home-v9";
import styles from "./Hero.module.css";

export default function Hero({ data }: { data: typeof heroData }) {
  return (
    <section className={styles.hero} aria-labelledby="v9-hero-title">
      <div className={styles.media}>
        <Image src={data.image} alt={data.alt} fill priority sizes="100vw" />
      </div>
      <div className={styles.copy}>
        <h1 id="v9-hero-title" className={`v9-caps ${styles.title}`}>{data.title}</h1>
        <p className={styles.text}>{data.text}</p>
        <div className={styles.ctas}>
          {data.ctas.map((c, i) => (
            <a key={c.label} href={c.href} className={`v9-btn ${i === 0 ? "v9-btn--light" : "v9-btn--ghost"}`}>{c.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
