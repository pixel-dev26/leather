"use client";

// The Hologramme sections with something to choose (hologramme-rule.md §7): tabbed favourites, the trending stage, the colour
// explorer and shop the look.
import Image from "next/image";
import { useState } from "react";
import { colourExplorer, favourites, shopTheLook, trending } from "@/content/home-hologramme";
import ProductCard from "./ProductCard";
import Rail from "./Rail";
import styles from "./Discover.module.css";

export function Favourites() {
  const [tab, setTab] = useState(0);
  return (
    <section id="favourites" className="holo-wrap">
      <h2 className="holo-h2">{favourites.title}</h2>
      <div className={styles.tabs} role="tablist" aria-label="Favourites by range">
        {favourites.tabs.map((t, i) => (
          <button key={t.label} role="tab" aria-selected={i === tab} className={i === tab ? styles.tabOn : ""} onClick={() => setTab(i)}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" key={tab} className={styles.panel}>
        <Rail perView={[4, 2.5, 1.6]} label={`${favourites.tabs[tab].label} favourites`}>
          {favourites.tabs[tab].products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </Rail>
      </div>
      <p className={styles.center}>
        <a href={favourites.cta.href} className="holo-link">{favourites.cta.label}</a>
      </p>
    </section>
  );
}

export function Trending() {
  const [pick, setPick] = useState(0);
  const colour = trending.colours[pick];
  return (
    <section id="trending" className={styles.stage} aria-label="Trending now">
      <div className={styles.words} aria-hidden>
        {trending.words.map((w) => (
          <span key={w}>{w}</span>
        ))}
        <small>{trending.line}</small>
      </div>
      <div className={styles.product}>
        {trending.colours.map((c, i) => (
          <Image key={c.name} src={c.image} alt={`${trending.name} in ${c.name}`} fill sizes="(max-width: 599px) 60vw, 400px"
            className={i === pick ? styles.shown : ""} />
        ))}
      </div>
      <div className={styles.dots} role="radiogroup" aria-label="Colour">
        {trending.colours.map((c, i) => (
          <button key={c.name} role="radio" aria-checked={i === pick} aria-label={c.name} style={{ background: c.swatch }}
            className={i === pick ? styles.dotOn : ""} onClick={() => setPick(i)} />
        ))}
      </div>
      <a href={trending.href} className={styles.mini}>
        <span className={styles.miniImg}>
          <Image src={colour.image} alt="" fill sizes="56px" />
        </span>
        <span>
          <b>{trending.name}</b>
          {colour.name} · {trending.meta}
        </span>
      </a>
    </section>
  );
}

export function ColourExplorer() {
  const [pick, setPick] = useState(0);
  const colour = colourExplorer.colours[pick];
  return (
    <section className="holo-wrap" aria-labelledby="colour-title">
      <h2 id="colour-title" className="holo-h2">{colourExplorer.title}</h2>
      <div className={styles.colours} role="tablist" aria-label="Colours">
        {colourExplorer.colours.map((c, i) => (
          <button key={c.name} role="tab" aria-selected={i === pick} className={i === pick ? styles.colourOn : ""} onClick={() => setPick(i)}>
            {c.swatch && <i style={{ background: c.swatch }} />}
            {c.name}
          </button>
        ))}
      </div>
      <div className={styles.colourImg}>
        {colourExplorer.colours.map((c, i) => (
          <Image key={c.name} src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 1880px) 100vw, 1800px"
            className={i === pick ? styles.shown : ""} />
        ))}
        <a href={colour.href} className={styles.colourLink}>Shop {colour.name.toLowerCase()} →</a>
      </div>
    </section>
  );
}

export function ShopTheLook() {
  const [open, setOpen] = useState<number | null>(1);
  return (
    <section aria-labelledby="look-title">
      <h2 id="look-title" className="holo-h2 holo-wrap">{shopTheLook.title}</h2>
      <div className={styles.look}>
        <Image src={shopTheLook.image.src} alt={shopTheLook.image.alt} fill sizes="100vw" />
        {shopTheLook.spots.map((s, i) => (
          <div key={s.product.name} className={styles.spot} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
            <button className={`${styles.hot} ${open === i ? styles.hotOn : ""}`} aria-expanded={open === i}
              aria-label={`Product ${i + 1}: ${s.product.name}`} onClick={() => setOpen(open === i ? null : i)}>
              {i + 1}
            </button>
            {open === i && (
              <a href={s.product.href} className={`${styles.lookCard} ${s.x > 60 ? styles.lookCardLeft : ""}`}>
                <span className={styles.miniImg}>
                  <Image src={s.product.image.src} alt="" fill sizes="60px" />
                </span>
                <span>
                  <b>{s.product.name}</b>
                  {s.product.meta} · <u>View product</u>
                </span>
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
