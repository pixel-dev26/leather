"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hero } from "@/content/home-hologramme";
import styles from "./Hero.module.css";

/** hologramme-rule.md §7 hero: full-width photos crossfading every 6s, copy on a soft left gradient, pill dots. */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % hero.length), 6000);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section className={styles.hero} aria-roledescription="carousel" aria-label="Featured"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {hero.map((s, i) => (
        <div key={s.title} className={`${styles.slide} ${i === active ? styles.on : ""}`} aria-hidden={i !== active}>
          <Image src={s.image.src} alt={s.image.alt} fill sizes="100vw" priority={i === 0}
            style={{ objectFit: "cover", objectPosition: s.position ?? "50% 50%" }} />
          <div className={styles.copy}>
            <span className="holo-label">{s.eyebrow}</span>
            {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
            <p>{s.text}</p>
            <a href={s.cta.href} className="holo-btn holo-btn--light" tabIndex={i === active ? 0 : -1}>
              {s.cta.label}
            </a>
          </div>
        </div>
      ))}
      <div className={styles.dots}>
        {hero.map((s, i) => (
          <button key={s.title} className={i === active ? styles.dotOn : ""} aria-label={`Show slide ${i + 1}`}
            aria-current={i === active} onClick={() => setActive(i)} />
        ))}
      </div>
    </section>
  );
}
