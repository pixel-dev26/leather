"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { offer } from "@/content/home-v4";
import { ArrowNE, OfferIcon, Play } from "./Icons";
import styles from "./Offer.module.css";

/**
 * §10 row 7, Discover (Super Tannery "We Offer", v4rule.md §7 Offer cards): sticky statement with a
 * rotating last word, play pill and intro on the left; stacked icon cards on the right.
 */
export default function Offer() {
  const [w, setW] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setW((x) => (x + 1) % offer.words.length), 2500);
    return () => clearInterval(t);
  }, []);

  const word = offer.words[w];

  return (
    <section id="discover" className={`v4-section v4-rule ${styles.section}`} aria-labelledby="offer-title">
      <div className={`v4-inner ${styles.grid}`}>
        <div className={styles.left}>
          <h2 id="offer-title" className={styles.headline} aria-label={`${offer.headline} ${offer.words.join(", ")}`}>
            <span aria-hidden>{offer.headline}</span>
            <span key={word} className={styles.word} aria-hidden>
              {Array.from(word).map((ch, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.04}s` }}>{ch}</span>
              ))}
            </span>
          </h2>
          <a href={offer.film.href} className={styles.play}>
            <span className={styles.pill}><Play /></span>
            {offer.film.label}
          </a>
          <p className={styles.intro}>{offer.intro}</p>
        </div>

        <div className={styles.right}>
          <h3 className="v4-label">{offer.label}</h3>
          <ul className={styles.cards}>
            {offer.cards.map((c) => (
              <Reveal as="li" key={c.title}>
                <a href={c.href} className={styles.card}>
                  <span className={styles.arrow}><ArrowNE /></span>
                  <OfferIcon name={c.icon} className={`${styles.icon} v4-zoom`} />
                  <h4 className={styles.title}>{c.title}</h4>
                  <p>{c.text}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
