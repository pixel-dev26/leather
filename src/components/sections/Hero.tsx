"use client";

import { useEffect, useState } from "react";
import { hero } from "@/content/home";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./Hero.module.css";

const DURATION = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const total = hero.slides.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % total), DURATION);
    return () => clearTimeout(id);
  }, [active, total]);

  return (
    <section id="top" className={styles.hero} aria-label="Introduction">
      <div className={styles.slides}>
        {hero.slides.map((slide, i) => (
          <div key={slide.alt} className={`${styles.slide} ${i === active ? styles.active : ""}`} aria-hidden={i !== active}>
            <Photo {...slide} sizes="100vw" priority={i === 0} />
          </div>
        ))}
        <div className={styles.overlay} />
        <div className={styles.grain} aria-hidden />
      </div>

      <p className={styles.side} aria-hidden>
        Est. [TBC] <span /> United Kingdom
      </p>

      <div className={styles.content}>
        <p className={styles.label}>{hero.label}</p>
        <h1 className={styles.title}>{rich(hero.title)}</h1>
        <p className={styles.text}>{hero.text}</p>
        <div className={styles.ctas}>
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="ghostLight">
            {hero.secondary.label}
          </Button>
        </div>
      </div>

      <div className={styles.counter}>
        <span className={styles.num}>{String(active + 1).padStart(2, "0")}</span>
        <div className={styles.bars} role="tablist" aria-label="Hero slides">
          {hero.slides.map((slide, i) => (
            <button
              key={slide.alt}
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}`}
              className={i === active ? styles.barActive : ""}
              onClick={() => setActive(i)}
            >
              <i style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>
        <span className={styles.num}>{String(total).padStart(2, "0")}</span>
      </div>

      <a href="#statement" className={styles.scroll} aria-label="Scroll to content">
        <span>Scroll</span>
        <i aria-hidden />
      </a>
    </section>
  );
}
