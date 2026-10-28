"use client";

import { useState } from "react";
import { spotlight } from "@/content/home";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./ProductSpotlight.module.css";

/** "Anatomy of" (Von Baer / Red Wing / Ghurka): story and numbered features, the product with matching hotspots,
 *  then a slim buy box. Hotspots show on the first photo only. */
export default function ProductSpotlight() {
  const [colour, setColour] = useState(spotlight.colours[0].name);
  const [photo, setPhoto] = useState(0);
  const [point, setPoint] = useState(0);
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState("");
  const current = spotlight.colours.find((c) => c.name === colour) ?? spotlight.colours[0];
  const thumbs = current.images.slice(0, 4);
  const pick = (name: string) => {
    setColour(name);
    setPhoto(0);
    setAdded(false);
  };

  return (
    <section id="spotlight" className={`bg-paper-light ${styles.spotlight}`} aria-label={`${spotlight.name}, featured product`}>
      <div className={styles.grid}>
        {/* story + numbered anatomy */}
        <div className={styles.story}>
          <p className={styles.label}>{spotlight.label}</p>
          <h2 className={styles.title}>{rich(spotlight.title)}</h2>
          <p className={styles.intro}>{spotlight.intro}</p>
          <ol className={styles.points}>
            {spotlight.features.map((f, i) => (
              <li key={f.title}>
                <button className={i === point ? styles.pointOn : ""} aria-expanded={i === point} onClick={() => { setPoint(i); setPhoto(0); }} onMouseEnter={() => setPoint(i)}>
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.pointText}>
                    <b>{f.title}</b>
                    <span>{f.text}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        {/* product stage with hotspots */}
        <div className={styles.stage}>
          {current.images.map((im, i) => (
            <div key={im.src} className={`${styles.slide} ${i === photo ? styles.slideOn : ""}`} aria-hidden={i !== photo}>
              <Photo {...im} sizes="(max-width: 1023px) 100vw, 40vw" original />
            </div>
          ))}
          {photo === 0 &&
            spotlight.features.map((f, i) => (
              <button
                key={f.title}
                className={`${styles.hotspot} ${i === point ? styles.hotspotOn : ""}`}
                style={{ left: `${f.x}%`, top: `${f.y}%` }}
                aria-label={`Detail ${i + 1}: ${f.title}`}
                onClick={() => setPoint(i)}
                onMouseEnter={() => setPoint(i)}
              >
                {String(i + 1).padStart(2, "0")}
                {i === point && <span className={styles.tip}>{f.title}</span>}
              </button>
            ))}
          <span className={styles.hint}>{photo === 0 ? "Hover a number to explore" : `View ${photo + 1} of ${current.images.length}`}</span>
        </div>

        {/* slim buy box */}
        <div className={styles.buy}>
          <ul className={styles.thumbs} aria-label="Product photos">
            {thumbs.map((im, i) => (
              <li key={im.src}>
                <button className={i === photo ? styles.thumbOn : ""} onClick={() => setPhoto(i)} aria-label={`Show photo ${i + 1}: ${im.alt}`}>
                  <Photo {...im} sizes="80px" />
                </button>
              </li>
            ))}
          </ul>
          <div>
            <p className={styles.name}>{spotlight.short}</p>
            <p className={styles.sku}>{spotlight.meta}</p>
          </div>
          <p className={styles.price}>
            {spotlight.price}
            {spotlight.compareAt && <s>{spotlight.compareAt}</s>}
          </p>
          <div className={styles.colours}>
            <p>
              Colour: <b>{colour}</b>
            </p>
            <div role="radiogroup" aria-label="Colour">
              {spotlight.colours.map((c) => (
                <button key={c.name} role="radio" aria-checked={c.name === colour} aria-label={c.name} title={c.name} className={c.name === colour ? styles.swatchOn : ""} style={{ background: c.hex }} onClick={() => pick(c.name)} />
              ))}
            </div>
          </div>
          {spotlight.sizes.length > 0 && (
            <div className={styles.sizes}>
              <p>
                Waist size: <b>{size || "Choose a size"}</b>
              </p>
              <div role="radiogroup" aria-label="Waist size">
                {spotlight.sizes.map((s) => (
                  <button key={s} role="radio" aria-checked={s === size} className={s === size ? styles.sizeOn : ""} onClick={() => { setSize(s); setAdded(false); }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button className={styles.add} onClick={() => setAdded(true)} disabled={spotlight.sizes.length > 0 && !size}>
            {added ? "Added to basket" : spotlight.sizes.length > 0 && !size ? "Choose a size" : "Add to basket"}
          </button>
          <a href={spotlight.link.href} className={styles.more}>
            {spotlight.link.label}
          </a>
          <p className={styles.note}>{spotlight.note}</p>
        </div>
      </div>
    </section>
  );
}
