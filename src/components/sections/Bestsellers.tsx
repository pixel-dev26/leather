"use client";

import { useRef } from "react";
import { shopByCategory } from "@/content/home";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./Bestsellers.module.css";

/** Chesterfield "Shop by category": italic serif title, a row of tall lifestyle photos with the name overlaid. */
export default function Bestsellers() {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 6) * 2, behavior: "smooth" });
  };

  return (
    <section id="bestsellers" className={`bg-paper ${styles.section}`} aria-label="Shop by category">
      <div className={styles.head}>
        <h2 className={styles.title}>{rich(shopByCategory.title)}</h2>
        <div className={styles.arrows}>
          <button onClick={() => move(-1)} aria-label="Previous categories">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="m15 5-7 7 7 7" /></svg>
          </button>
          <button onClick={() => move(1)} aria-label="Next categories">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden><path d="m9 5 7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <ul ref={track} className={styles.track}>
        {shopByCategory.items.map((c) => (
          <li key={c.name}>
            <a href={c.href} className={`${styles.card} ${c.image.fit === "contain" ? styles.pack : ""} hover-zoom`}>
              <Photo {...c.image} sizes="(max-width: 767px) 60vw, 20vw" className={styles.photo} />
              <span className={styles.shade} aria-hidden />
              <span className={styles.name}>{c.name}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <a href={shopByCategory.link.href} className={styles.all}>
          {shopByCategory.link.label}
        </a>
      </div>
    </section>
  );
}
