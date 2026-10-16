"use client";

import { useState } from "react";
import Image from "next/image";
import { spotlightV4 as spotlight } from "@/content/home-v4";
import { withBase } from "@/lib/image-loader";
import { Chevron, Plus } from "./Icons";
import styles from "./Spotlight.module.css";

/** §10 row 8: product spotlight in v4 type (white gallery well, hairline accordions, solid "Add to bag"). */
export default function Spotlight() {
  const [img, setImg] = useState(0);
  const [colour, setColour] = useState(spotlight.colours[0].name);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const current = spotlight.colours.find((c) => c.name === colour) ?? spotlight.colours[0];
  const images = current.images;
  const [open, setOpen] = useState<string | null>(null);
  const n = images.length;
  const go = (d: number) => setImg((x) => (x + d + n) % n);

  return (
    <section id="spotlight" className={`v4-section v4-rule ${styles.section}`} aria-labelledby="spot-title">
      <div className={`v4-inner ${styles.grid}`}>
        <div className={styles.gallery}>
          <ul className={styles.thumbs}>
            {images.map((im, k) => (
              <li key={im.src}>
                <button type="button" aria-label={`Show image ${k + 1}`} aria-current={k === img} className={`${styles.thumb} ${im.fit === "contain" ? styles.contain : ""}`} onClick={() => setImg(k)}>
                  <Image src={im.src!} alt="" fill sizes="76px" />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.main}>
            {images.map((im, k) => (
              <div key={im.src} className={`${styles.frame} ${k === img ? styles.frameOn : ""} ${im.fit === "contain" ? styles.contain : ""}`} aria-hidden={k !== img}>
                <Image src={withBase(im.src!)} unoptimized alt={im.alt} fill sizes="(max-width: 767px) 100vw, 45vw" />
              </div>
            ))}
            <button type="button" className={`${styles.nav} ${styles.prev}`} aria-label="Previous image" onClick={() => go(-1)}><Chevron dir="left" /></button>
            <button type="button" className={`${styles.nav} ${styles.next}`} aria-label="Next image" onClick={() => go(1)}><Chevron /></button>
            <div className={`v4-dots ${styles.dots}`}>
              {images.map((_, k) => (
                <button key={k} type="button" aria-label={`Image ${k + 1}`} aria-current={k === img} onClick={() => setImg(k)} />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <p className="v4-label">{spotlight.label}</p>
          <h2 id="spot-title" className={`v4-title ${styles.name}`}>{spotlight.name}</h2>
          <p className={styles.price}>
            {spotlight.price} {spotlight.compareAt && <s>{spotlight.compareAt}</s>} <span>Inclusive of VAT</span>
          </p>

          <div className={styles.block}>
            <p className={styles.small}>Colour: <span>{colour}</span></p>
            <div className={styles.swatches}>
              {spotlight.colours.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={c.name}
                  aria-pressed={c.name === colour}
                  className={styles.sw}
                  style={{ background: c.hex }}
                  onClick={() => { setColour(c.name); setImg(0); }}
                />
              ))}
            </div>
          </div>

          <div className={styles.buy}>
            <div className={styles.qty} aria-label="Quantity">
              <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" aria-label="Increase" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <button
              type="button"
              className={`v4-btn v4-btn--solid ${styles.add}`}
              onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2200); }}
            >
              {added ? "Added to bag" : "Add to bag"}
            </button>
          </div>
          <p className={styles.small}>{spotlight.note}</p>

          <ul className={styles.acc}>
            {spotlight.details.map((d) => {
              const on = open === d.title;
              return (
                <li key={d.title}>
                  <button type="button" aria-expanded={on} onClick={() => setOpen(on ? null : d.title)}>
                    {d.title}<Plus open={on} className={styles.plus} />
                  </button>
                  <div className={`${styles.panel} ${on ? styles.panelOn : ""}`}><p>{d.text}</p></div>
                </li>
              );
            })}
          </ul>
          <p className={styles.sku}>Product code: {current.sku}</p>
        </div>
      </div>
    </section>
  );
}
