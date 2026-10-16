"use client";

import { useRef } from "react";
import { leathers, newLeathers } from "@/content/home";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./OurLeathers.module.css";

/** Nour Hammour "New": small italic title + View all, then a quiet full-bleed row of tall 2:3 cards. */
export default function OurLeathers() {
  const track = useRef<HTMLUListElement>(null);
  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (el && card) el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 4) * 2, behavior: "smooth" });
  };

  return (
    <section id="leathers" className={`bg-paper-light ${styles.leathers}`} aria-label="New leathers">
      <div className={styles.head}>
        <h2 className={styles.title}>{rich(newLeathers.title)}</h2>
        <div className={styles.actions}>
          <button onClick={() => move(-1)} aria-label="Previous">
            <svg width="18" height="10" viewBox="0 0 22 10" aria-hidden><path d="M22 5H1M5 1 1 5l4 4" fill="none" stroke="currentColor" /></svg>
          </button>
          <button onClick={() => move(1)} aria-label="Next">
            <svg width="18" height="10" viewBox="0 0 22 10" aria-hidden><path d="M0 5h21M17 1l4 4-4 4" fill="none" stroke="currentColor" /></svg>
          </button>
          <a href={newLeathers.link.href} className={styles.viewAll}>
            {newLeathers.link.label}
          </a>
        </div>
      </div>

      <ul ref={track} className={styles.track}>
        {leathers.items.map((l) => (
          <li key={l.name}>
            <a href="#" className={styles.card}>
              <div className={styles.media}>
                <Photo {...l.image} sizes="(max-width: 767px) 70vw, 24vw" className={styles.main} />
                {l.hover && <Photo {...l.hover} sizes="(max-width: 767px) 70vw, 24vw" className={styles.alt} />}
                {l.tag && <span className={styles.tag}>{l.tag}</span>}
              </div>
              <div className={styles.text}>
                <p className={styles.name}>{l.name}</p>
                <p className={styles.desc}>{l.note}</p>
                <p className={styles.price}>{l.price}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
