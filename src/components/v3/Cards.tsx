"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product, Story, Tile } from "@/content/home-v3";
import Icon from "./Icons";
import styles from "./Cards.module.css";

/** Shop-by-category card: 4:5 image, 18px label, optional grey note (v3rule.md §7 Category card). */
export function CategoryCard({ name, note, href, image, alt }: Tile) {
  return (
    <a href={href} className={styles.category}>
      <span className={styles.well} style={{ aspectRatio: "4 / 5" }}>
        <Image src={image} alt={alt} fill sizes="(max-width: 599px) 70vw, 25vw" />
      </span>
      <span className={styles.label}>{name}</span>
      {note && <span className={styles.note}>{note}</span>}
    </a>
  );
}

/** Product card: 1:1 image on a grey well, heart, colour dots (each can swap the photo), name, grey meta, condensed price row. */
export function ProductCard({ p, showPrice = true }: { p: Pick<Product, "name" | "meta" | "image" | "alt"> & Partial<Product>; showPrice?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [colour, setColour] = useState(0);
  const shown = p.colours?.[colour];
  return (
    <div className={styles.product}>
      <a href="#" className={`${styles.well} ${p.fit === "contain" ? styles.packshot : ""}`} style={{ aspectRatio: "1 / 1" }} aria-label={p.name}>
        <Image src={shown?.image ?? p.image} alt={shown?.image ? `${p.name} in ${shown.name}` : p.alt} fill sizes="(max-width: 599px) 50vw, 33vw" />
      </a>
      {showPrice && (
        <button
          className={`${styles.heart} ${saved ? styles.saved : ""}`}
          aria-label={saved ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          aria-pressed={saved}
          onClick={() => setSaved(!saved)}
        >
          <Icon name="heart" size={22} />
        </button>
      )}
      {p.colours && p.colours.length > 1 && (
        <div className={styles.dots} role="radiogroup" aria-label="Colour">
          {p.colours.map((c, i) => (
            <button
              key={c.name}
              role="radio"
              aria-checked={i === colour}
              aria-label={c.name}
              title={c.name}
              className={`${styles.dot} ${i === colour ? styles.dotOn : ""}`}
              style={{ background: c.swatch }}
              onClick={() => setColour(i)}
            />
          ))}
        </div>
      )}
      <a href="#" className={styles.name}>
        {p.name}
      </a>
      <span className={styles.meta}>{p.meta}</span>
      {showPrice && p.price && (
        <span className={styles.price}>
          {p.price}
          {p.compareAt && <s>{p.compareAt}</s>}
        </span>
      )}
      {showPrice && p.promo && <span className={styles.promo}>{p.promo}</span>}
    </div>
  );
}

/** Collection card: 2:3, 10px radius, white copy bottom-left and a circle arrow (v3rule.md §7). */
export function CollectionCard({ title, text, cta, image, alt }: Story) {
  return (
    <a href={cta.href} className={styles.collection}>
      <Image src={image} alt={alt} fill sizes="(max-width: 599px) 80vw, 33vw" />
      <span className={styles.shade} aria-hidden />
      <span className={styles.copy}>
        <span className={styles.title}>{title}</span>
        <span className={styles.sub}>{text}</span>
        <span className={styles.shop}>{cta.label}</span>
      </span>
      <span className={styles.circle} aria-hidden>
        <Icon name="arrowRight" size={18} />
      </span>
    </a>
  );
}
