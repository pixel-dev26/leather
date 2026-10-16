"use client";

import { useState } from "react";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { bestsellers } from "@/content/home";
import { v4Slot } from "@/content/images-v4";
import { ArrowNE } from "./Icons";
import styles from "./Bestsellers.module.css";

/** §10 row 6: Form B title, text tabs, 4-up white product tiles (v4rule.md §7 Product tile). */
export default function Bestsellers() {
  const [cat, setCat] = useState<(typeof bestsellers.categories)[number]>("All");
  const items = bestsellers.items.filter((p) => cat === "All" || p.category === cat).slice(0, 8);

  return (
    <section id="bestsellers" className={`v4-section v4-rule ${styles.section}`} aria-labelledby="best-title">
      <Reveal>
        <h2 id="best-title" className="v4-display">{bestsellers.label}</h2>
      </Reveal>
      <div className={styles.tabs} role="tablist" aria-label="Filter by category">
        {bestsellers.categories.map((c) => (
          <button key={c} type="button" role="tab" aria-selected={c === cat} className={styles.tab} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <ul className={`v4-inner ${styles.grid}`}>
        {items.map((p) => (
          <li key={p.name} className={styles.item}>
            <a href="#" className={styles.tile} aria-label={`${p.name}, ${p.price}`}>
              <Photo {...v4Slot(p.image)} sizes="(max-width: 767px) 50vw, 25vw" />
              {p.tag && <span className={`v4-overline ${styles.tag}`}>{p.tag}</span>}
            </a>
            <h3 className={styles.name}>{p.name}</h3>
            <p className={styles.meta}>{p.meta}</p>
            <p className={styles.price}>{p.price}</p>
            <button type="button" className={`v4-link ${styles.add}`}>Add to bag<ArrowNE /></button>
          </li>
        ))}
      </ul>
      <div className={styles.more}>
        <a href={bestsellers.link.href} className="v4-btn">{bestsellers.link.label}</a>
      </div>
    </section>
  );
}
