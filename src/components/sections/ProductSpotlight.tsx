"use client";

import { useState } from "react";
import { spotlight } from "@/content/home";
import Photo from "@/components/ui/Photo";
import styles from "./ProductSpotlight.module.css";

const icons: Record<string, React.ReactNode> = {
  compact: <path d="M6 4h12v16H6zM9 8h6M9 12h6" />,
  storage: <path d="M4 7h16v12H4zM4 11h16M9 7V5h6v2" />,
  leather: <path d="M7 4c3 2 7 2 10 0l3 4-3 2v10H7V10L4 8z" />,
  zip: <path d="M12 3v18M10 6h4M10 9h4M10 12h4M10 15h4M5 3h14v18H5z" />,
};

/** DailyObjects-style product detail block: gallery, swatches, quantity, add to basket, features, accordions. */
export default function ProductSpotlight() {
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(spotlight.colours[0].name);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(-1);
  const [added, setAdded] = useState(false);
  const current = spotlight.colours.find((c) => c.name === colour) ?? spotlight.colours[0];
  const images = current.images;
  const total = images.length;
  const go = (d: number) => setActive((i) => (i + d + total) % total);

  return (
    <section id="spotlight" className={`section bg-paper-light ${styles.spotlight}`} aria-label={`${spotlight.name}, featured product`}>
      <div className={`container ${styles.grid}`}>
        {/* gallery */}
        <div className={styles.gallery}>
          <ul className={styles.thumbs} aria-label="Product photos">
            {images.map((im, i) => (
              <li key={im.src}>
                <button className={i === active ? styles.thumbActive : ""} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}: ${im.alt}`}>
                  <Photo {...im} sizes="80px" />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.main}>
            {images.map((im, i) => (
              <div key={im.src} className={`${styles.slide} ${i === active ? styles.slideActive : ""}`} aria-hidden={i !== active}>
                <Photo {...im} sizes="(max-width: 1023px) 100vw, 45vw" original />
              </div>
            ))}
            <button className={`${styles.nav} ${styles.navPrev}`} onClick={() => go(-1)} aria-label="Previous photo">
              <svg width="20" height="10" viewBox="0 0 22 10" aria-hidden><path d="M22 5H1M5 1 1 5l4 4" fill="none" stroke="currentColor" /></svg>
            </button>
            <button className={`${styles.nav} ${styles.navNext}`} onClick={() => go(1)} aria-label="Next photo">
              <svg width="20" height="10" viewBox="0 0 22 10" aria-hidden><path d="M0 5h21M17 1l4 4-4 4" fill="none" stroke="currentColor" /></svg>
            </button>
            <span className={styles.count}>
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* buy box */}
        <div className={styles.info}>
          <p className={styles.label}>
            <span aria-hidden />
            {spotlight.label}
          </p>
          <h2 className={styles.name}>
            {spotlight.name} <em>– {colour}</em>
          </h2>
          <p className={styles.priceRow}>
            <span className={styles.price}>{spotlight.price}</span>
            {spotlight.compareAt && <s className={styles.compare}>{spotlight.compareAt}</s>}
            <span className={styles.tax}>Inclusive of VAT</span>
          </p>

          <div className={styles.block}>
            <p className={styles.blockLabel}>
              Colour: <b>{colour}</b>
            </p>
            <div className={styles.swatches} role="radiogroup" aria-label="Colour">
              {spotlight.colours.map((c) => (
                <button
                  key={c.name}
                  role="radio"
                  aria-checked={colour === c.name}
                  aria-label={c.name}
                  title={c.name}
                  className={colour === c.name ? styles.swatchActive : ""}
                  style={{ "--sw": c.hex } as React.CSSProperties}
                  onClick={() => {
                    setColour(c.name);
                    setActive(0);
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.buy}>
            <div className={styles.qty} aria-label="Quantity">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className={styles.add} onClick={() => setAdded(true)}>
              {added ? "Added to basket ✓" : "Add to basket"}
            </button>
            <button className={styles.wish} aria-label="Save to wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
              </svg>
            </button>
          </div>
          <p className={styles.note}>{spotlight.note}</p>

          <ul className={styles.features}>
            {spotlight.features.map((f) => (
              <li key={f.title}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
                  {icons[f.icon]}
                </svg>
                <div>
                  <b>{f.title}</b>
                  <span>{f.text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.accordion}>
            {spotlight.details.map((d, i) => (
              <div key={d.title} className={`${styles.acc} ${open === i ? styles.accOpen : ""}`}>
                <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  {d.title}
                  <i aria-hidden />
                </button>
                <div className={styles.accBody}>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={styles.sku}>Product code: {current.sku}</p>
        </div>
      </div>
    </section>
  );
}
