"use client";

// Hero: three slides, each one real Morucha product on a soft colour, with a tag, a two-line headline, the
// product's store name and price, and one button. Headline words rise in and the product eases up into place.
// Autoplays with thin progress lines; pauses on hover, focus or a hidden tab.
import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { Slide } from "@/content/home-v6";
import { Arrow } from "./Icons";
import { SplitText } from "./Motion";
import styles from "./Hero.module.css";

const DURATION = 6500;

export default function Hero({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0); // restarts the progress line
  const total = slides.length;

  const go = useCallback((i: number) => {
    setActive(((i % total) + total) % total);
    setCycle((c) => c + 1);
  }, [total]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => go(active + 1), DURATION);
    return () => clearTimeout(t);
  }, [active, paused, go, cycle]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      id="top"
      className={`${styles.hero} ${styles[slides[active].tone]}`}
      aria-roledescription="carousel"
      aria-label="Featured products"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((s, i) => {
        const on = i === active;
        return (
          <div
            key={s.id}
            className={`${styles.slide} ${on ? styles.on : ""} ${on && ready ? "is-in" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}: ${s.title.join(" ")}`}
            aria-hidden={!on}
            inert={!on}
          >
            <div className={`v6-wrap ${styles.inner}`}>
              <div className={styles.copy}>
                <span className={`v6-tag v6-tag--red ${styles.tag}`}>{s.tag}</span>
                <h1 className={`v6-display ${styles.title}`}>
                  <SplitText text={s.title[0]} reveal={false} className={styles.line} />
                  <SplitText text={s.title[1]} reveal={false} className={styles.line} delay={120} />
                </h1>
                <p className={styles.product}>
                  <span>{s.product.name}</span>
                  <b>{s.product.price}</b>
                </p>
                <a href={s.cta.href} className={`v6-btn ${styles.cta}`}>{s.cta.label}<Arrow /></a>
              </div>
              <div className={styles.media}>
                <Image src={s.image} alt={s.alt} fill priority={i === 0} sizes="(max-width: 900px) 92vw, 50vw" className={styles.photo} />
              </div>
            </div>
          </div>
        );
      })}

      <div className={`v6-wrap ${styles.controls}`}>
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}: ${s.title.join(" ")}`}
            aria-current={i === active}
            className={`${styles.bar} ${i === active ? styles.barOn : ""}`}
          >
            <span
              key={i === active ? cycle : -1}
              className={styles.fill}
              style={{ "--dur": `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" } as CSSProperties}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
