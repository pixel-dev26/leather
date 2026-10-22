// The static v7 sections (no client JavaScript): Bucherer's three widening category tiles, the 2×2 gift grid, the
// journal, the deep-coloured "world of" band and the black service split.
import Image from "next/image";
import type { CSSProperties } from "react";
import type { gifts as giftsData, journal as journalData, service as serviceData, tiles as tilesData, world as worldData } from "@/content/home-v7";
import { Arrow, serviceIcons } from "./Icons";
import styles from "./Sections.module.css";

/**
 * Three photos edge to edge; the one under the pointer widens and shows a DISCOVER NOW button. The row fades in as a
 * whole: a data-reveal on a tile would bring the page's reveal transition with it and override the tile's own.
 */
export function Tiles({ items }: { items: typeof tilesData }) {
  return (
    <section className={styles.tiles} aria-label="Shop by category" data-reveal="fade">
      {items.map((t) => (
        <a key={t.title} href={t.href} className={styles.tile}>
          <span className={styles.tileMedia}><Image src={t.image} alt={t.alt} fill sizes="(max-width: 760px) 82vw, 50vw" /></span>
          <span className={styles.tileCopy}>
            <span className={styles.tileTitle}>{t.title}</span>
            <span className={`v7-btn ${styles.tileBtn}`} aria-hidden>Discover now</span>
          </span>
        </a>
      ))}
    </section>
  );
}

export function Gifts({ data }: { data: typeof giftsData }) {
  return (
    <section id="gifts" className="v7-section" aria-labelledby="gifts-title">
      <header className="v7-head" data-reveal>
        <p className="v7-eyebrow">{data.eyebrow}</p>
        <h2 id="gifts-title" className="v7-h2">{data.title}</h2>
      </header>
      <ul className={`v7-wrap ${styles.giftGrid}`}>
        {data.items.map((g, i) => (
          <li key={g.title} data-reveal style={{ "--d": (i % 2) * 120 } as CSSProperties}>
            <a href={g.href} className={styles.gift}>
              <span className={styles.giftMedia}><Image src={g.image} alt={g.alt} fill sizes="(max-width: 760px) 100vw, 600px" /></span>
              <span className={styles.giftTitle}>{g.title}</span>
              <span className="v7-link">{g.link} <Arrow /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Journal({ data }: { data: typeof journalData }) {
  const f = data.feature;
  return (
    <section id="journal" className="v7-section" aria-labelledby="journal-title">
      <header className="v7-head" data-reveal>
        <p className="v7-eyebrow">{data.eyebrow}</p>
        <h2 id="journal-title" className="v7-h2">{data.title}</h2>
      </header>
      <div className={`v7-wide ${styles.journal}`}>
        <a href={f.href} className={`${styles.article} ${styles.feature}`} data-reveal>
          <span className={styles.articleMedia}><Image src={f.image} alt={f.alt} fill sizes="(max-width: 900px) 100vw, 60vw" /></span>
          <span className={styles.articleLabel}>{f.label}</span>
          <span className={styles.articleTitle}>{f.title}</span>
          <span className={styles.articleText}>{f.text}</span>
          <span className="v7-link">Discover now <Arrow /></span>
        </a>
        <div className={styles.side}>
          {data.items.map((a, i) => (
            <a key={a.title} href={a.href} className={styles.article} data-reveal style={{ "--d": (i + 1) * 120 } as CSSProperties}>
              <span className={styles.articleMedia}><Image src={a.image} alt={a.alt} fill sizes="(max-width: 900px) 100vw, 36vw" /></span>
              <span className={styles.articleLabel}>{a.label}</span>
              <span className={styles.articleTitle}>{a.title}</span>
              <span className={styles.articleText}>{a.text}</span>
              <span className="v7-link">Read more <Arrow /></span>
            </a>
          ))}
          <a className="v7-btn" href={data.cta.href}>{data.cta.label}</a>
        </div>
      </div>
    </section>
  );
}

export function World({ data }: { data: typeof worldData }) {
  const f = data.feature;
  return (
    <section id="world" className={`v7-section v7-dark ${styles.world}`} aria-labelledby="world-title">
      <header className="v7-head" data-reveal>
        <p className="v7-eyebrow">{data.eyebrow}</p>
        <h2 id="world-title" className="v7-h2">{data.title}</h2>
      </header>
      <div className="v7-wide">
        <a href={f.cta.href} className={styles.worldFeature} data-reveal>
          <span className={styles.worldMedia}><Image src={f.image} alt={f.alt} fill sizes="100vw" /></span>
          <span className={styles.worldCaption}>
            <span className={styles.worldEyebrow}>{f.eyebrow}</span>
            <span className={styles.worldTitle}>{f.title}</span>
            <span className="v7-link v7-link--on">{f.cta.label}</span>
          </span>
        </a>
        <ul className={styles.worldCards}>
          {data.cards.map((c, i) => (
            <li key={c.title} data-reveal style={{ "--d": i * 120 } as CSSProperties}>
              <a href={c.cta.href} className={styles.worldCard}>
                <span className={styles.worldCardMedia}><Image src={c.image} alt={c.alt} fill sizes="(max-width: 760px) 100vw, 33vw" /></span>
                <span className={styles.worldEyebrow}>{c.eyebrow}</span>
                <span className={styles.worldCardTitle}>{c.title}</span>
                <span className="v7-link">{c.cta.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Bucherer's "Find a store near you", as Morucha's service desk: black panel left, photo right. */
export function Service({ data }: { data: typeof serviceData }) {
  return (
    <section id="service" className={styles.service} aria-labelledby="service-title">
      <div className={styles.serviceCopy} data-reveal>
        <h2 id="service-title" className={styles.serviceTitle}>{data.title}</h2>
        <p className={styles.serviceText}>{data.text}</p>
        <ul className={styles.points}>
          {data.points.map((p, i) => (
            <li key={p.title}>
              {serviceIcons[i]}
              <span><strong>{p.title}</strong>{p.text}</span>
            </li>
          ))}
        </ul>
        <div className={styles.serviceBtns}>
          <a className="v7-btn v7-btn--light" href={data.primary.href}>{data.primary.label}</a>
          <a className="v7-btn v7-btn--outline" href={data.secondary.href}>{data.secondary.label}</a>
        </div>
      </div>
      <div className={styles.serviceMedia}>
        <Image src={data.image} alt={data.alt} fill sizes="(max-width: 900px) 100vw, 50vw" />
      </div>
    </section>
  );
}
