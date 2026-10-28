"use client";

import Image from "next/image";
import { useState } from "react";
import { reviews } from "@/content/home-v12";
import styles from "./More.module.css";

/** v12rule.md §9 reviews: a photo beside a stone panel showing one quote at a time, dots to move between them. */
export default function Reviews() {
  const [i, setI] = useState(0);
  const r = reviews.items[i];
  return (
    <section className={styles.reviews} aria-labelledby="v12-reviews-title">
      <div className={styles.reviewImg}><Image src={reviews.image.src} alt={reviews.image.alt} fill sizes="(max-width: 959px) 100vw, 50vw" /></div>
      <div className={styles.reviewText}>
        <h2 id="v12-reviews-title" className={styles.kicker}>{reviews.title} <span className={styles.tbc}>· {reviews.rating}</span></h2>
        <blockquote className={styles.quote} aria-live="polite">“{r.quote}”</blockquote>
        <p className={styles.who}><b>{r.name}</b><span>Bought: {r.product}</span></p>
        <div className={styles.dots}>
          {reviews.items.map((_, k) => (
            <button key={k} aria-label={`Review ${k + 1} of ${reviews.items.length}`} aria-current={k === i} className={k === i ? styles.dotOn : undefined} onClick={() => setI(k)} />
          ))}
        </div>
      </div>
    </section>
  );
}
