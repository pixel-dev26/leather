"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { ADD_TO_BAG_EVENT, featured } from "@/content/home-v2";
import { withBase } from "@/lib/image-loader";
import styles from "./FeaturedProduct.module.css";

type Feature = (typeof featured.features)[number]["icon"];

const FEATURE_ICONS: Record<Feature, React.ReactNode> = {
  compact: <path d="M8 4h16a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM11 9h10M11 13h6" />,
  storage: <path d="M5 8h22v18H5zM5 13h22M10 18h5M10 21h8M20 8V5h-8v3" />,
  leather: <path d="M10 4c2 2 4 2.5 6 2.5S20 6 22 4c.5 3 2 4.5 4.5 5-1 3-1 5.5 0 8-1.5 2.5-1.5 5-.5 8-3 .5-4.5 2-5 4.5-1.5-1-3.5-1.5-5-1.5s-3.5.5-5 1.5c-.5-2.5-2-4-5-4.5 1-3 1-5.5-.5-8 1-2.5 1-5 0-8C8 8.5 9.5 7 10 4z" />,
  zip: <path d="M16 3v26M13 6h3M16 9h3M13 12h3M16 15h3M13 18h3M14 21h4v6h-4z" />,
};

/** Product detail block on the home page, after the DailyObjects product page layout (v2rule.md §12D). */
export default function FeaturedProduct() {
  const [colour, setColour] = useState(0);
  const [slide, setSlide] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(-1);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [pairAdded, setPairAdded] = useState<string[]>([]);

  const c = featured.colours[colour];
  const images = c.images;
  const go = (i: number) => setSlide((i + images.length) % images.length);

  const addToBag = (n: number) => window.dispatchEvent(new CustomEvent(ADD_TO_BAG_EVENT, { detail: n }));

  const onZoomMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <section className={styles.section} id="featured" aria-labelledby="featured-h">
      <div className={styles.grid}>
        {/* ---------- gallery ---------- */}
        <div className={styles.gallery}>
          <div className={styles.thumbs} role="tablist" aria-label="Product images">
            {images.map((src, i) => (
              <button key={src} role="tab" aria-selected={i === slide} aria-label={`Image ${i + 1}`} className={`${styles.thumb} ${i === slide ? styles.thumbOn : ""}`} onClick={() => go(i)}>
                <Image src={src} alt="" fill sizes="80px" style={{ objectFit: "contain" }} />
              </button>
            ))}
          </div>

          <div
            className={styles.main}
            onPointerMove={onZoomMove}
            onPointerLeave={() => setZoom(null)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(slide + 1);
              if (e.key === "ArrowLeft") go(slide - 1);
            }}
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label={`${featured.name} in ${c.label}, image ${slide + 1} of ${images.length}`}
          >
            {images.map((src, i) => (
              <div key={src} className={`${styles.slide} ${i === slide ? styles.slideOn : ""}`} aria-hidden={i !== slide}>
                <Image
                  src={withBase(src)}
                  unoptimized // full-size original, for the hover zoom
                  alt={`${featured.name} in ${c.label}`}
                  fill
                  sizes="(max-width: 999px) 100vw, 50vw"
                  style={{
                    objectFit: "contain",
                    transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : "50% 50%",
                    transform: zoom && i === slide ? "scale(1.8)" : "none",
                  }}
                />
              </div>
            ))}
            <button className={`${styles.arrow} ${styles.prev}`} onClick={() => go(slide - 1)} aria-label="Previous image">←</button>
            <button className={`${styles.arrow} ${styles.next}`} onClick={() => go(slide + 1)} aria-label="Next image">→</button>
            <div className={styles.dots} aria-hidden>
              {images.map((src, i) => (
                <span key={src} className={i === slide ? styles.dotOn : ""} />
              ))}
            </div>
          </div>
        </div>

        {/* ---------- buy box ---------- */}
        <div className={styles.info}>
          <p className={styles.eyebrow}>{featured.eyebrow}</p>
          <h2 className={styles.name} id="featured-h">
            {featured.name}
          </h2>
          <p className={styles.price}>
            <span>{featured.price}</span>
            {featured.wasPrice && <s>{featured.wasPrice}</s>}
            <span className={styles.note}>{featured.note}</span>
          </p>

          <fieldset className={styles.colours}>
            <legend>
              Colour <span>{c.label}</span>
            </legend>
            <div className={styles.swatches}>
              {featured.colours.map((col, i) => (
                <button
                  key={col.key}
                  type="button"
                  className={`${styles.swatch} ${i === colour ? styles.swatchOn : ""}`}
                  aria-pressed={i === colour}
                  aria-label={col.label}
                  onClick={() => {
                    setColour(i);
                    setSlide(0);
                  }}
                >
                  <span style={{ background: col.swatch }} />
                  <small>{col.label}</small>
                </button>
              ))}
            </div>
          </fieldset>

          <div className={styles.buy}>
            <div className={styles.qty} aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <output aria-live="polite">{qty}</output>
              <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button
              type="button"
              className={`${styles.add} ${added ? styles.addDone : ""}`}
              onClick={() => {
                addToBag(qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 2200);
              }}
            >
              <span className={styles.addLabel}>Add to bag · {featured.price}</span>
              <span className={styles.addDoneLabel}>✓ Added to your bag</span>
            </button>
          </div>

          <ul className={styles.features}>
            {featured.features.map((f) => (
              <li key={f.label}>
                <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
                  {FEATURE_ICONS[f.icon]}
                </svg>
                <span>{f.label}</span>
              </li>
            ))}
          </ul>

          <div className={styles.accordion}>
            {featured.details.map((d, i) => (
              <div key={d.title} className={`${styles.acc} ${open === i ? styles.accOpen : ""}`}>
                <button type="button" aria-expanded={open === i} aria-controls={`acc-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  {d.title}
                  <span className={styles.plus} aria-hidden />
                </button>
                <div id={`acc-${i}`} className={styles.accBody}>
                  <div>
                    <p>{d.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pairs}>
            <p className={styles.pairsTitle}>Pairs well with</p>
            {featured.pairs.map((p) => {
              const done = pairAdded.includes(p.name);
              return (
                <div key={p.name} className={styles.pair}>
                  <div className={styles.pairImg}>
                    <Image src={p.image.src!} alt={p.image.alt} fill sizes="72px" style={{ objectFit: "contain" }} />
                  </div>
                  <div>
                    <p className={styles.pairName}>{p.name}</p>
                    <p className={styles.pairPrice}>{p.price}</p>
                  </div>
                  <button
                    type="button"
                    className={`${styles.pairAdd} ${done ? styles.pairDone : ""}`}
                    onClick={() => {
                      if (done) return;
                      addToBag(1);
                      setPairAdded((a) => [...a, p.name]);
                    }}
                    aria-label={done ? `${p.name} added` : `Add ${p.name} to bag`}
                  >
                    {done ? "✓ Added" : "+ Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
