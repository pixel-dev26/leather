import Image from "next/image";
import { tradeNote, type Product } from "@/content/home-hologramme";
import Icon from "./Icons";
import styles from "./ProductCard.module.css";

/**
 * hologramme-rule.md §7 product card: 4:5 sage well, badge, quick-view and wishlist buttons, serif name, pack size, swatches.
 * Hologramme hides prices from the public, so the price line is a "log in for trade price" link.
 */
export default function ProductCard({ product }: { product: Product }) {
  const { name, meta, href, image, badge, swatches } = product;
  return (
    <article className={styles.card}>
      <div className={styles.well}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 60vw, (max-width: 959px) 40vw, 360px" />
        {badge && <span className={`${styles.badge} ${badge.soft ? styles.soft : ""}`}>{badge.text}</span>}
        <span className={styles.tools}>
          <button aria-label={`Quick view: ${name}`}>
            <Icon name="eye" size={14} />
          </button>
          <button aria-label={`Add ${name} to wishlist`}>
            <Icon name="heart" size={14} />
          </button>
        </span>
      </div>
      <h3 className={styles.name}>
        <a href={href}>{name}</a>
      </h3>
      <p className={styles.meta}>{meta}</p>
      <a href={href} className={styles.trade}>{tradeNote}</a>
      {swatches && (
        <span className={styles.swatches} aria-label={`${swatches.length} colours`}>
          {swatches.map((s) => (
            <i key={s} style={{ background: s }} />
          ))}
        </span>
      )}
    </article>
  );
}
