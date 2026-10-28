"use client";

import { useEffect, useState } from "react";
import { reviews } from "@/content/home-hologramme";
import Icon from "./Icons";
import styles from "./Reviews.module.css";

const ADVANCE_MS = 7000;

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÀ-ÿ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

/** Google's "G", drawn in its four colours, for the review source tags. */
function GoogleMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z" />
      <path fill="#34A853" d="M12 23c3 0 5.4-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1-3.7 1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

/**
 * hologramme-rule.md §7 reviews: a sage band with the Google rating summary on the left and one featured review on the
 * right (FR/EN switch, auto-advance with a progress bar, pauses on hover), plus a tab per review below it.
 */
export default function Reviews() {
  const [active, setActive] = useState(0);
  const [lang, setLang] = useState<"fr" | "en">("fr");
  const [paused, setPaused] = useState(false);
  const count = reviews.items.length;
  const go = (d: number) => setActive((a) => (a + d + count) % count);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => go(1), ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  const r = reviews.items[active];

  return (
    <section className={styles.band} aria-labelledby="reviews-title">
      <div className={`holo-wrap ${styles.grid}`}>
        <div className={styles.summary}>
          <span className="holo-label">{reviews.eyebrow}</span>
          <h2 id="reviews-title">{reviews.title}</h2>
          <div className={styles.score}>
            <b>{reviews.rating}</b>
            <span>
              <span className={styles.stars} aria-label={`${reviews.rating} out of 5 stars`}>★★★★★</span>
              <span className={styles.scoreNote}>
                <GoogleMark /> {reviews.ratingNote}
              </span>
            </span>
          </div>
          <a href={reviews.cta.href} className="holo-btn holo-btn--line" target="_blank" rel="noreferrer">
            {reviews.cta.label}
          </a>
        </div>

        <div className={styles.stage} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <figure className={styles.card} aria-live="polite">
            <div className={styles.cardTop}>
              <span className={styles.stars} aria-label={`${r.stars} out of 5 stars`}>{"★".repeat(r.stars)}</span>
              <div className={styles.lang} role="group" aria-label="Review language">
                {(["fr", "en"] as const).map((l) => (
                  <button key={l} aria-pressed={lang === l} className={lang === l ? styles.langOn : ""} onClick={() => setLang(l)}>
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <blockquote key={`${active}-${lang}`} className={styles.quote} lang={lang}>
              {lang === "fr" ? r.text : r.en}
            </blockquote>
            {lang === "en" && <p className={styles.translated}>Translated from French</p>}
            <figcaption className={styles.who}>
              <span className={styles.avatar} aria-hidden>{initials(r.name)}</span>
              <span>
                <b>{r.name}</b>
                {r.business && <small>{r.business}</small>}
              </span>
              <span className={styles.source}>
                <GoogleMark size={13} /> Google review
              </span>
            </figcaption>
            <span key={`bar-${active}-${paused}`} className={`${styles.bar} ${paused ? styles.barPaused : ""}`}
              style={{ animationDuration: `${ADVANCE_MS}ms` }} aria-hidden />
          </figure>

          <div className={styles.nav}>
            <div className={styles.tabs} role="tablist" aria-label="Reviews">
              {reviews.items.map((it, i) => (
                <button key={it.name} role="tab" aria-selected={i === active} className={i === active ? styles.tabOn : ""} onClick={() => setActive(i)}>
                  <span className={styles.avatarSm} aria-hidden>{initials(it.name)}</span>
                  <span className={styles.tabName}>{it.name}</span>
                </button>
              ))}
            </div>
            <div className={styles.arrows}>
              <button aria-label="Previous review" onClick={() => go(-1)}><Icon name="arrowLeft" size={16} /></button>
              <button aria-label="Next review" onClick={() => go(1)}><Icon name="arrowRight" size={16} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
