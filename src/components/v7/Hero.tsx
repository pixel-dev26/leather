"use client";

// Bucherer's hero: a full-width photo slider with a small bold label, a title and a coloured pill over one side of
// the photo, and arrows at the bottom right. Slides cross-fade (so the last one leads back to the first as smoothly as
// any other) and move on by themselves (paused on hover, focus or the pause button); they can also be swiped. The
// bars at the bottom left fill while a slide is showing.
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { HeroSlide } from "@/content/home-v7";
import { Chevron } from "./Icons";
import styles from "./Hero.module.css";

const DURATION = 7000;

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // the pause button
  const [held, setHeld] = useState(false); // hover or keyboard focus inside the slider
  const [reduced, setReduced] = useState(false);
  const startX = useRef<number | null>(null);
  const count = slides.length;
  const go = useCallback((i: number) => setIndex((i + count) % count), [count]);

  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  // the active bar's fill is the timer: it pauses with the slider and moves on when it ends
  const running = !paused && !held && !reduced;

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHeld(false); }}
      onPointerDown={(e) => { startX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <div className={styles.track}>
        {slides.map((s, i) => (
          <article
            key={s.id}
            className={`${styles.slide} ${i === index ? styles.on : ""}`}
            data-align={s.align}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className={styles.media}>
              <Image src={s.image} alt={s.alt} fill priority={i === 0} sizes="100vw" style={{ objectPosition: s.position ?? "50% 50%" }} />
            </div>
            <div className={styles.copy}>
              <p className={styles.label}>{s.label}</p>
              <h2 className={styles.title}>{s.title}</h2>
              <a className="v7-pill" href={s.cta.href}>{s.cta.label}</a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.controls}>
        <div className={styles.bars}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`${styles.bar} ${i === index ? styles.barOn : ""} ${i < index ? styles.barDone : ""}`}
              style={{ "--dur": `${DURATION}ms`, "--play": running ? "running" : "paused" } as CSSProperties}
              aria-label={`Show slide ${i + 1}: ${s.title}`}
              aria-current={i === index}
              onClick={() => go(i)}
            >
              <span onAnimationEnd={() => { if (i === index && !reduced) go(index + 1); }} />
            </button>
          ))}
          <button className={styles.pause} onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
            {paused ? (
              <svg viewBox="0 0 12 12" aria-hidden><path d="M3 1.5v9l7-4.5z" fill="currentColor" /></svg>
            ) : (
              <svg viewBox="0 0 12 12" aria-hidden><path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" /></svg>
            )}
          </button>
        </div>
        <div className={styles.arrows}>
          <button onClick={() => go(index - 1)} aria-label="Previous slide"><Chevron dir="left" /></button>
          <button onClick={() => go(index + 1)} aria-label="Next slide"><Chevron /></button>
        </div>
      </div>
    </section>
  );
}
