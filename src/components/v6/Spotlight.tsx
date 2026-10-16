"use client";

// Featured product: Morucha's M-2028 bifold in four colourways, each with its own photos. A gallery on the left;
// name, price, colour choice, four short features and one button on the right.
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { spotlight as SpotlightData } from "@/content/home-v6";
import { ADD_TO_BAG_EVENT } from "./events";
import { Arrow, Check } from "./Icons";
import { SplitText } from "./Motion";
import styles from "./Spotlight.module.css";

export default function Spotlight({ data }: { data: typeof SpotlightData }) {
  const [colour, setColour] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [added, setAdded] = useState(false);
  const c = data.colours[colour];
  const p = data.product;

  const add = () => {
    window.dispatchEvent(new CustomEvent(ADD_TO_BAG_EVENT, { detail: 1 }));
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <section id="featured" className={`v6-section ${styles.section}`} aria-labelledby="featured-title">
      <div className={`v6-wrap ${styles.grid}`}>
        <div className={styles.gallery}>
          <div className={styles.stage} data-reveal="wipe">
            <Image
              key={`${colour}-${photo}`}
              src={c.images[photo]}
              alt={`${p.name} in ${c.name}, photo ${photo + 1}`}
              fill
              sizes="(max-width: 900px) 92vw, 48vw"
              className={styles.photo}
            />
          </div>
          <ul className={styles.thumbs} aria-label="Photos">
            {c.images.map((src, i) => (
              <li key={src}>
                <button className={i === photo ? styles.thumbOn : ""} onClick={() => setPhoto(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === photo}>
                  <Image src={src} alt="" fill sizes="120px" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.info}>
          <span className="v6-tag v6-tag--red" data-reveal="fade">{data.eyebrow}</span>
          <h2 id="featured-title" className={`v6-display ${styles.title}`}>
            <SplitText text={data.title[0]} className={styles.block} />
            <SplitText text={data.title[1]} className={styles.block} delay={120} />
          </h2>
          <p className={styles.name} data-reveal="up">{p.name}</p>
          <p className={styles.price} data-reveal="up" style={{ "--d": 80 } as CSSProperties}>{p.price}</p>

          <div className={styles.colours} data-reveal="up" style={{ "--d": 140 } as CSSProperties}>
            <p>Colour: <b>{c.name}</b></p>
            <div role="radiogroup" aria-label="Colour">
              {data.colours.map((col, i) => (
                <button
                  key={col.name}
                  role="radio"
                  aria-checked={i === colour}
                  aria-label={col.name}
                  title={col.name}
                  className={`${styles.swatch} ${i === colour ? styles.swatchOn : ""}`}
                  onClick={() => { setColour(i); setPhoto(0); }}
                >
                  <span style={{ background: col.swatch }} />
                </button>
              ))}
            </div>
          </div>

          <ul className={styles.features} data-reveal="up" style={{ "--d": 200 } as CSSProperties}>
            {data.features.map((f) => <li key={f}><Check />{f}</li>)}
          </ul>

          <button className={`v6-btn ${styles.add} ${added ? styles.added : ""}`} onClick={add} data-reveal="up" style={{ "--d": 260 } as CSSProperties}>
            {added ? <>Added to bag<Check /></> : <>Add to bag<Arrow /></>}
          </button>
        </div>
      </div>
    </section>
  );
}
