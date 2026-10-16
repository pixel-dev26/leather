"use client";

import { useEffect, useState } from "react";
import Photo from "@/components/ui/Photo";
import { hero } from "@/content/home-v2";
import Stitch from "./Stitch";
import styles from "./Hero.module.css";

/** v2rule.md §7 hero: full-bleed slideshow with a giant stitch word, a small caption and pill dots. */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % hero.slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label="Featured" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {hero.slides.map((s, i) => (
        <a key={s.word} href="#collections" className={`${styles.slide} ${i === active ? styles.active : ""}`} aria-hidden={i !== active} tabIndex={i === active ? 0 : -1}>
          <Photo {...s.image} className={styles.image} sizes="100vw" priority={i === 0} />
          <div className={styles.content}>
            <Stitch text={s.word} className={styles.word} title={s.word} />
            <p className={styles.caption}>{s.caption}</p>
          </div>
        </a>
      ))}
      <div className={styles.dots} role="tablist">
        {hero.slides.map((s, i) => (
          <button key={s.word} role="tab" aria-selected={i === active} aria-label={`Show slide ${i + 1}`} className={i === active ? styles.dotOn : ""} onClick={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}
