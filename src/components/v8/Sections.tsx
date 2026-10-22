// The editorial pieces between the rails: a full-bleed banner with sand buttons, a full-bleed photo with a white
// card and a round stamp, the three-column journal and a plain row of delivery and returns facts. (The statement has
// its own file, Statement.tsx, as it reacts to scrolling.)
import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./Sections.module.css";

type Cta = { label: string; href: string };

/* ---------------------------------------------------------------- banner */
export function Banner({ title, ctas, image, alt }: { title: string; ctas: Cta[]; image: string; alt: string }) {
  return (
    <section className={styles.banner} aria-labelledby="v8-banner-title">
      <Image src={image} alt={alt} fill sizes="100vw" className={styles.bannerImg} />
      <div className={styles.bannerContent} data-reveal>
        <h2 id="v8-banner-title" className={styles.bannerTitle}>{title}</h2>
        <div className={styles.ctas}>
          {ctas.map((c) => <a key={c.label} href={c.href} className="v8-btn">{c.label}</a>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- feature: photo + white card + stamp */
type FeatureProps = { id: string; title: string; text: string; cta: Cta; image: string; alt: string; badge: string };

export function Feature({ id, title, text, cta, image, alt, badge }: FeatureProps) {
  return (
    <section id={id} className={styles.feature} aria-labelledby={`${id}-title`}>
      <Image src={image} alt={alt} fill sizes="100vw" className={styles.featureImg} />
      <div className={styles.card} data-reveal>
        <h2 id={`${id}-title`} className={styles.cardTitle}>{title}</h2>
        <p className={styles.cardText}>{text}</p>
        <a href={cta.href} className={`v8-btn ${styles.cardBtn}`}>{cta.label}</a>
      </div>
      <Stamp id={`${id}-stamp`} text={badge} className={styles.featureStamp} />
    </section>
  );
}

/** A round black stamp: the words run round the edge (slowly turning) with the Morucha bull in the middle. */
export function Stamp({ id, text, className = "" }: { id: string; text: string; className?: string }) {
  return (
    <span className={`${styles.stamp} ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className={styles.stampRing}>
        <defs><path id={id} d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" /></defs>
        <text><textPath href={`#${id}`} textLength="462">{text}</textPath></text>
      </svg>
      {/* the bull is the top of the white logo, cropped */}
      <span className={styles.bull}>
        <Image src="/brand/morucha-logo-white.webp" alt="" width={667} height={256} />
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- journal */
type Post = { category: string; title: string; excerpt: string; image: string; alt: string; href: string };

export function Journal({ id, title, posts }: { id: string; title: string; posts: Post[] }) {
  return (
    <section id={id} className="v8-section" aria-labelledby={`${id}-title`}>
      <div className="v8-wrap">
        <h2 id={`${id}-title`} className="v8-h2" data-reveal>{title}</h2>
        <div className={styles.posts}>
          {posts.map((p, i) => (
            <article key={p.title} className={styles.post} data-reveal style={{ "--d": i * 90 } as CSSProperties}>
              <p className={styles.postCat}>{p.category}</p>
              <h3 className={styles.postTitle}><a href={p.href} className="v8-link">{p.title}</a></h3>
              <a href={p.href} className={styles.postPhoto} tabIndex={-1} aria-hidden>
                <Image src={p.image} alt="" fill sizes="(max-width: 820px) 100vw, 32vw" />
              </a>
              <p className={styles.postText}>{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- service row */
export function ServiceRow({ items }: { items: { title: string; text: string }[] }) {
  return (
    <section id="delivery" className={styles.service} aria-label="Delivery and returns">
      <ul className="v8-wrap">
        {items.map((s) => (
          <li key={s.title}>
            <p className={styles.serviceTitle}>{s.title}</p>
            <p className={styles.serviceText}>{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
