"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { collectionSlider } from "@/content/home-v2";
import styles from "./CollectionSlider.module.css";

/**
 * v2rule.md §12A, after septiemelargeur.fr: one centred portrait image with a row of giant italic
 * collection names running across it. The active name is centred over the photo.
 */
export default function CollectionSlider() {
  const items = collectionSlider.items;
  const [active, setActive] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(false); // no slide-in on first paint
  const stage = useRef<HTMLDivElement>(null);
  const names = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const measure = useCallback(() => {
    const el = names.current[active]?.parentElement; // the .item, positioned within the track
    const box = stage.current;
    if (!el || !box) return;
    setOffset(box.clientWidth / 2 - (el.offsetLeft + el.offsetWidth / 2));
  }, [active]);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  useLayoutEffect(measure, [measure]);
  useEffect(() => {
    // Re-centre whenever the names change size (web font swap) or the stage resizes.
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    names.current.forEach((n) => n && ro.observe(n));
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [measure]);

  const go = (i: number) => setActive((i + items.length) % items.length);

  return (
    <section
      className={styles.section}
      id="collections"
      aria-labelledby="collections-h"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <h2 className="v2-title" id="collections-h">
        {collectionSlider.title}
      </h2>
      <div className={styles.stage} ref={stage}>
        <div className={styles.frame}>
          {items.map((c, i) => (
            <Photo key={c.name} {...c.image} className={`${styles.photo} ${i === active ? styles.photoOn : ""}`} sizes="(max-width: 699px) 80vw, 42vw" />
          ))}
        </div>

        <div className={styles.track} style={{ transform: `translate3d(${offset}px, -50%, 0)`, transition: animate ? undefined : "none" }}>
          {items.map((c, i) => (
            <div key={c.name} className={`${styles.item} ${i === active ? styles.itemOn : ""}`}>
              <button ref={(el) => void (names.current[i] = el)} className={styles.name} onClick={() => go(i)} aria-current={i === active} tabIndex={i === active ? -1 : 0}>
                {c.name}
              </button>
              <a href={c.href} className={styles.discover} tabIndex={i === active ? 0 : -1} aria-hidden={i !== active}>
                Discover
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={() => go(active - 1)} aria-label="Previous collection">
          ←
        </button>
        <span>
          {active + 1} / {items.length}
        </span>
        <button onClick={() => go(active + 1)} aria-label="Next collection">
          →
        </button>
      </div>
    </section>
  );
}
