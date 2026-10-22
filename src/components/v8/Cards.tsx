// Rail cards. Product: the studio shot on a white well (a second photo on hover), a sand or navy tag over the
// photo's bottom edge, the name and a navy price. Link card: a 3:4 photo, a small label and a large navy underlined
// title, used for the categories and the "Explore" row.
import Image from "next/image";
import type { V8Product } from "@/content/home-v8";
import styles from "./Cards.module.css";

const SIZES = "(max-width: 520px) 75vw, (max-width: 820px) 45vw, (max-width: 1100px) 32vw, 24vw";

export function ProductCard({ p }: { p: V8Product }) {
  return (
    <article className={styles.product}>
      <a href="#shop" className={styles.media} aria-label={`${p.name}, ${p.price}`}>
        <Image src={p.image} alt={p.title} fill sizes={SIZES} className={styles.main} />
        {p.hover && <Image src={p.hover} alt="" fill sizes={SIZES} className={styles.hover} />}
        {p.tag && <span className={`v8-tag ${p.tag.tone === "navy" ? "v8-tag--navy" : ""} ${styles.tag}`}>{p.tag.label}</span>}
      </a>
      <h3 className={styles.name}><a href="#shop">{p.name}</a></h3>
      <p className={styles.price}>
        {p.price}
        {p.colours > 1 && !p.tag?.label.includes("colours") && <span className={styles.colours}>{p.colours} colours</span>}
      </p>
    </article>
  );
}

export function LinkCard({ label, title, href, image, alt }: { label: string; title: string; href: string; image: string; alt: string }) {
  return (
    <a href={href} className={styles.link}>
      <span className={styles.photo}>
        <Image src={image} alt={alt} fill sizes={SIZES} />
      </span>
      <span className={styles.label}>{label}</span>
      <span className={`v8-link ${styles.title}`}>{title}</span>
    </a>
  );
}
