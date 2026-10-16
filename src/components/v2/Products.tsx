"use client";

import { useState } from "react";
import Photo from "@/components/ui/Photo";
import { productTabs, type ProductV2 } from "@/content/home-v2";
import styles from "./Products.module.css";

/** v2rule.md §4B tab row + §7 product card. */
export default function Products() {
  const [tab, setTab] = useState(0);

  return (
    <section className={styles.section} id="bestsellers">
      <div className={styles.tabs} role="tablist" aria-label="Products">
        {productTabs.map((t, i) => (
          <button key={t.label} role="tab" id={`ptab-${i}`} aria-selected={tab === i} aria-controls="ppanel" className={styles.tab} onClick={() => setTab(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.row} role="tabpanel" id="ppanel" aria-labelledby={`ptab-${tab}`} key={tab}>
        {productTabs[tab].items.map((p, i) => (
          <ProductCard key={`${tab}-${p.name}`} product={p} index={i} />
        ))}
      </div>
      <div className={styles.more}>
        <a href="#" className={styles.button}>
          View all
        </a>
      </div>
    </section>
  );
}

function ProductCard({ product: p, index }: { product: ProductV2; index: number }) {
  return (
    <article className={styles.card} style={{ animationDelay: `${index * 60}ms` }}>
      <a href="#" className={styles.media} aria-label={p.name}>
        <Photo {...p.image} className={styles.img} sizes="(max-width: 999px) 70vw, 25vw" />
        {p.hover && <Photo {...p.hover} className={`${styles.img} ${styles.hoverImg}`} sizes="(max-width: 999px) 70vw, 25vw" />}
        {p.wasPrice && <span className={styles.badge} aria-label="On sale">%</span>}
        <span className={styles.quick}>
          Choose
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            <path d="M1.5 6h15l-1 13h-13z" />
            <path d="M5.5 8V4.5a3.5 3.5 0 0 1 7 0V8" />
          </svg>
        </span>
      </a>
      <div className={styles.info}>
        <a href="#" className={styles.name}>
          {p.name}
        </a>
        <span className={styles.price}>
          {p.price}
          {p.wasPrice && <s>{p.wasPrice}</s>}
        </span>
        <span className={styles.cat}>{p.category}</span>
        <span className={styles.swatches} aria-label={`Colours: ${p.swatches.map((s) => s.name).join(", ")}`}>
          {p.swatches.map((s, i) => (
            <span key={s.name} className={i === 0 ? styles.swOn : ""} style={{ background: s.swatch }} title={s.name} />
          ))}
        </span>
      </div>
    </article>
  );
}
