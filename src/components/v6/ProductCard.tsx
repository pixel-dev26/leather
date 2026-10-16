"use client";

// Product card: studio shot on a grey well (a second photo on hover), the store name and price, a heart, and colour
// dots that swap the photo when the product comes in more than one colour.
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { V6Product } from "@/content/home-v6";
import { Heart } from "./Icons";
import styles from "./Products.module.css";

export default function ProductCard({ p, index = 0, sizes }: { p: V6Product; index?: number; sizes: string }) {
  const [colour, setColour] = useState(0);
  const [saved, setSaved] = useState(false);
  const picked = p.colours[colour];
  const image = picked?.image ?? p.image;
  const hover = colour === 0 || !picked?.image ? p.hover : undefined; // the hover photo shows the first colour

  return (
    <article className={styles.card} data-reveal="up" style={{ "--d": Math.min(index, 8) * 70 } as CSSProperties}>
      <div className={styles.media}>
        <a href="#shop" className={styles.mediaLink} aria-label={`${p.name}, ${p.price}`}>
          <Image key={image} src={image} alt={picked ? `${p.name} in ${picked.name}` : p.name} fill sizes={sizes} className={styles.main} />
          {hover && <Image src={hover} alt="" fill sizes={sizes} className={styles.hover} />}
        </a>
        {p.isNew && <span className={`v6-tag ${styles.badge}`}>New</span>}
        <button className={`${styles.heart} ${saved ? styles.saved : ""}`} aria-pressed={saved} aria-label={saved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`} onClick={() => setSaved((s) => !s)}>
          <Heart />
        </button>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}><a href="#shop">{p.name}</a></h3>
        <p className={styles.price}>{p.price}</p>
        {p.colours.length > 1 && (
          <div className={styles.swatches} role="radiogroup" aria-label="Colour">
            {p.colours.map((c, i) => (
              <button
                key={c.name}
                role="radio"
                aria-checked={i === colour}
                aria-label={c.name}
                title={c.name}
                className={`${styles.swatch} ${i === colour ? styles.swatchOn : ""}`}
                style={{ background: c.swatch }}
                onClick={() => setColour(i)}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
