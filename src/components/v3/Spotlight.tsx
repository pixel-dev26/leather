"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { ADD_TO_BASKET_EVENT, spotlight } from "@/content/home-v3";
import { withBase } from "@/lib/image-loader";
import Icon from "./Icons";
import { Head } from "./Sections";
import styles from "./Spotlight.module.css";

// Loose UK postcode check (e.g. "M1 1AE", "SW1A 2AA"); the real check happens at checkout.
const POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

/** v3rule.md §7 Product spotlight: DailyObjects product page, 50/50 gallery and buy box. */
export default function Spotlight() {
  const [colour, setColour] = useState(0);
  const [slide, setSlide] = useState(0);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [delivery, setDelivery] = useState<{ ok: boolean; text: string } | null>(null);

  const c = spotlight.colours[colour];
  const images = c.images;
  const go = (i: number) => setSlide((i + images.length) % images.length);

  const pickColour = (i: number) => {
    setColour(i);
    setSlide(0);
  };

  const addToBasket = () => {
    window.dispatchEvent(new CustomEvent(ADD_TO_BASKET_EVENT, { detail: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const checkDelivery = (e: FormEvent) => {
    e.preventDefault();
    const pc = postcode.trim().toUpperCase();
    setDelivery(
      POSTCODE.test(pc)
        ? { ok: true, text: `Free delivery to ${pc}. Order before 3:30pm for same-day dispatch.` }
        : { ok: false, text: "Please enter a valid UK postcode." },
    );
  };

  return (
    <section id="featured" aria-labelledby="featured-h">
      <Head id="featured-h" title={spotlight.title} link={spotlight.link} />

      <div className={styles.grid}>
        {/* ---------- gallery ---------- */}
        <div
          className={styles.gallery}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label={`${spotlight.name} in ${c.name}, image ${slide + 1} of ${images.length}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(slide + 1);
            if (e.key === "ArrowLeft") go(slide - 1);
          }}
        >
          {images.map((src, i) => (
            <div key={src} className={`${styles.slide} ${i === slide ? styles.slideOn : ""}`} aria-hidden={i !== slide}>
              <Image src={withBase(src)} unoptimized alt={`${spotlight.name} in ${c.name}, view ${i + 1}`} fill sizes="(max-width: 899px) 100vw, 50vw" />
            </div>
          ))}

          <div className={styles.tools}>
            <button aria-label="Share" className={styles.tool}>
              <Icon name="share" size={20} />
            </button>
            <button aria-label={saved ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={saved} className={`${styles.tool} ${saved ? styles.saved : ""}`} onClick={() => setSaved(!saved)}>
              <Icon name="heart" size={20} />
            </button>
          </div>

          <button className={`${styles.chev} ${styles.prev}`} aria-label="Previous image" onClick={() => go(slide - 1)}>
            <Icon name="chevronLeft" size={28} />
          </button>
          <button className={`${styles.chev} ${styles.next}`} aria-label="Next image" onClick={() => go(slide + 1)}>
            <Icon name="chevronRight" size={28} />
          </button>

          <div className={styles.dots}>
            {images.map((src, i) => (
              <button key={src} aria-label={`Image ${i + 1}`} aria-current={i === slide} className={`${styles.dot} ${i === slide ? styles.dotOn : ""}`} onClick={() => go(i)} />
            ))}
          </div>
        </div>

        {/* ---------- buy box ---------- */}
        <div className={styles.buy}>
          <h3 className={styles.name}>
            {spotlight.name} · {c.name}
          </h3>
          <p className={styles.priceRow}>
            <span className={styles.price}>{spotlight.price}</span>
            {spotlight.compareAt && <s className={styles.compare}>{spotlight.compareAt}</s>}
            <span className={styles.note}>{spotlight.priceNote}</span>
          </p>

          <p className={styles.optLabel}>Colour</p>
          <div className={styles.swatches} role="radiogroup" aria-label="Colour">
            {spotlight.colours.map((col, i) => (
              <button key={col.name} role="radio" aria-checked={i === colour} className={styles.swatch} onClick={() => pickColour(i)}>
                <span className={`${styles.ring} ${i === colour ? styles.ringOn : ""}`}>
                  <span style={{ background: col.hex }} />
                </span>
                {col.name}
              </button>
            ))}
          </div>

          <div className={styles.cta}>
            <button className={`v3-btn v3-btn--lg v3-btn--action ${styles.add}`} onClick={addToBasket}>
              {added ? "Added to basket" : "Add to basket"}
            </button>
          </div>

          <form className={styles.check} onSubmit={checkDelivery}>
            <label className="visually-hidden" htmlFor="postcode">
              Postcode
            </label>
            <input
              id="postcode"
              value={postcode}
              onChange={(e) => {
                setPostcode(e.target.value);
                setDelivery(null);
              }}
              placeholder="Enter postcode to check delivery"
              autoComplete="postal-code"
              aria-describedby="delivery-msg"
            />
            <button type="submit" className="v3-btn v3-btn--lg v3-btn--outline" disabled={!postcode.trim()}>
              Check
            </button>
          </form>
          <p id="delivery-msg" className={`${styles.msg} ${delivery && !delivery.ok ? styles.err : ""}`} aria-live="polite">
            {delivery?.text}
          </p>

          <p className={styles.optLabel}>Good to know</p>
          <ul className={styles.offers}>
            {spotlight.offers.map((o) => (
              <li key={o.text}>
                <Icon name={o.icon} size={18} />
                {o.text}
              </li>
            ))}
          </ul>

          <div className={styles.accordions}>
            {spotlight.details.map((d) => (
              <details key={d.title} className={styles.acc}>
                <summary>
                  {d.title}
                  <Icon name="chevronDown" size={18} />
                </summary>
                <p>{d.text}</p>
              </details>
            ))}
          </div>

          <p className={styles.sku}>
            <strong>Product code</strong>
            <span>
              {spotlight.sku}-{c.name.toUpperCase()}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
