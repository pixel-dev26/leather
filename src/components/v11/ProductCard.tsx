import Image from "next/image";
import type { Card } from "@/content/home-v11";
import Icon from "./Icons";
import styles from "./ProductCard.module.css";

/**
 * v11rule.md §6 product card (premium pass): no border, the product floats on a 4:5 stone well, a small "New" label for
 * the newest year's products and a wishlist heart, then a serif name and a quiet price with colour dots.
 * No star ratings until real reviews exist.
 */
export default function ProductCard({ card }: { card: Card }) {
  const { name, price, href, image, swatches, isNew } = card;
  return (
    <article className={styles.card}>
      <a href={href} className={styles.well} aria-label={name}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 60vw, (max-width: 959px) 40vw, 320px" />
        {isNew && <span className={styles.new}>New</span>}
      </a>
      <button className={styles.heart} aria-label={`Add ${name} to wishlist`}>
        <Icon name="heart" size={17} />
      </button>
      <h3 className={styles.name}><a href={href}>{name}</a></h3>
      <p className={styles.price}>
        <span>{price}</span>
        {swatches.length > 0 && (
          <span className={styles.swatches} aria-label={`${swatches.length} colour${swatches.length > 1 ? "s" : ""}`}>
            {swatches.slice(0, 5).map((s) => <i key={s.name} title={s.name} style={{ background: s.fill }} />)}
          </span>
        )}
      </p>
    </article>
  );
}
