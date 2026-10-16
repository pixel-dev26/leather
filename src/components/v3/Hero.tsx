"use client";

import { useRef, useState, type PointerEvent } from "react";
import { hero } from "@/content/home-v3";
import Icon from "./Icons";
import BannerPicture from "./BannerPicture";
import styles from "./Hero.module.css";

/**
 * v3rule.md §7 Hero carousel: full-bleed slides, text bottom-left, round arrows and timer bullets.
 * The active bullet's fill animation is the autoplay clock: when it ends, the next slide shows.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const count = hero.length;
  const go = (i: number) => setIndex((i + count) % count);

  const onPointerDown = (e: PointerEvent) => (startX.current = e.clientX);
  const onPointerUp = (e: PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    startX.current = null;
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className={styles.track} style={{ transform: `translateX(${-index * 100}%)` }}>
        {hero.map((s, i) => (
          <div
            key={s.title}
            className={`${styles.slide} ${s.tone === "dark" ? styles.dark : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
          >
            <BannerPicture art={s.art} alt={s.alt} priority={i === 0} />
            <div className={styles.copy}>
              {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
              <p>{s.text}</p>
              <a href={s.cta.href} className={`v3-btn v3-btn--sm ${s.tone === "dark" ? "v3-btn--light" : "v3-btn--dark"}`} tabIndex={i === index ? 0 : -1}>
                {s.cta.label}
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.arrow} ${styles.prev}`} aria-label="Previous slide" onClick={() => go(index - 1)}>
        <Icon name="chevronLeft" size={22} />
      </button>
      <button className={`${styles.arrow} ${styles.next}`} aria-label="Next slide" onClick={() => go(index + 1)}>
        <Icon name="chevronRight" size={22} />
      </button>

      <div className={styles.bullets}>
        {hero.map((s, i) => (
          <button
            key={s.title}
            className={`${styles.bullet} ${i === index ? styles.active : ""}`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => go(i)}
          >
            {i === index && (
              <span
                className={styles.fill}
                style={{ animationPlayState: paused ? "paused" : "running" }}
                onAnimationEnd={() => go(index + 1)}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
