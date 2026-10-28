import Image from "next/image";
import { hero, heroH1 } from "@/content/home-v11";
import styles from "./Hero.module.css";

/** v11rule.md §6: three photo panels side by side, each a way into the range, under a tracked-caps H1. */
export default function Hero() {
  return (
    <section id="v11-hero" className={styles.hero}>
      <h1 className={styles.h1}>{heroH1}</h1>
      {hero.map((p, i) => (
        <article key={p.title} className={styles.panel}>
          <Image src={p.image.src} alt={p.image.alt} fill priority={i < 3} sizes="(max-width: 599px) 100vw, 34vw" />
          <div className={styles.text}>
            <h2>{p.title}</h2>
            <p>{p.text}</p>
            <a href={p.href} className="v11-btn v11-btn--white">{p.cta}</a>
          </div>
        </article>
      ))}
    </section>
  );
}
