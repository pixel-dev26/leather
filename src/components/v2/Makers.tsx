"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { makersV2 } from "@/content/home-v2";
import { Title } from "./Title";
import styles from "./Makers.module.css";

const INTERVAL = 3500;

/** Collection carousel band (§7) on olive. Always autoplays one card every 3.5s; only rests while off-screen. */
export default function Makers() {
  const rail = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const count = makersV2.items.length;

  const cards = () => Array.from(rail.current?.children ?? []) as HTMLElement[];

  const goTo = useCallback((i: number) => {
    const el = rail.current;
    if (!el) return;
    const list = Array.from(el.children) as HTMLElement[];
    const target = (i + list.length) % list.length;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(list[target].offsetLeft - list[0].offsetLeft, maxScroll), behavior: "smooth" });
    setIndex(target);
  }, []);

  // Forward one card; once the last cards are fully in view, loop back to the start.
  const next = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
    goTo(atEnd ? 0 : index + 1);
  }, [goTo, index]);

  // Keep the index in sync when people swipe or scroll the rail themselves.
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const list = cards();
        const left = el.scrollLeft + list[0].offsetLeft;
        let best = 0;
        list.forEach((c, i) => Math.abs(c.offsetLeft - left) < Math.abs(list[best].offsetLeft - left) && (best = i));
        setIndex(best);
      }, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    if (section.current) io.observe(section.current);
    return () => io.disconnect();
  }, []);

  const running = visible;
  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(next, INTERVAL);
    return () => clearTimeout(t);
  }, [running, next]);

  return (
    <section ref={section} className={styles.section} aria-labelledby="makers-h" aria-roledescription="carousel">
      <Title id="makers-h">{makersV2.title}</Title>
      <div className={styles.band}>
        <div ref={rail} className={styles.rail} tabIndex={0} aria-label="Makers using Morucha leather">
          {makersV2.items.map((m, i) => (
            <figure key={m.caption} className={`${styles.card} ${i === index ? styles.cardOn : ""}`} aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
              <div className={styles.media}>
                <Photo {...m.image} sizes="(max-width: 699px) 80vw, 33vw" />
              </div>
              <figcaption className={styles.caption}>{m.caption}</figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.progress} aria-hidden>
            {makersV2.items.map((m, i) => (
              <span key={m.caption} className={i === index ? styles.barOn : i < index ? styles.barDone : ""}>
                <i style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused" }} />
              </span>
            ))}
          </div>
          <div className={styles.buttons}>
            <button onClick={() => goTo(index - 1)} aria-label="Previous maker">←</button>
            <button onClick={next} aria-label="Next maker">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
