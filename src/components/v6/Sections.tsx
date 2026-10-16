// v6 editorial sections (server components; motion comes from data-reveal / data-parallax, see Motion.tsx).
import Image from "next/image";
import type { CSSProperties } from "react";
import type { banner as BannerData, categories as CategoryData, perks as PerkData, statement as StatementData, stories as StoryData } from "@/content/home-v6";
import { Arrow, perkIcons } from "./Icons";
import { CountUp, ScrubStatement, SplitText } from "./Motion";
import styles from "./Sections.module.css";

/** The Morucha promise: one statement whose words light up as it scrolls (key phrases turn red), and live counts. */
export function Statement({ data }: { data: typeof StatementData }) {
  return (
    <section className={styles.statement} aria-labelledby="statement-title">
      <div className="v6-wrap">
        <span id="statement-title" className="v6-tag v6-tag--red" data-reveal="fade">{data.eyebrow}</span>
        <ScrubStatement parts={data.parts} className={`v6-display ${styles.statementText}`} />
        <dl className={styles.stats}>
          {data.stats.map((s, i) => (
            <div key={s.label} className={styles.stat} data-reveal="up" style={{ "--d": i * 90 } as CSSProperties}>
              <dt>{s.label}</dt>
              <dd className="v6-display"><CountUp to={s.value} decimals={s.decimals} prefix={s.prefix} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Four category tiles: the product on a grey well, with its name, product count and an arrow underneath. */
export function Categories({ items }: { items: typeof CategoryData }) {
  return (
    <section className={styles.categories} aria-labelledby="cat-title">
      <div className="v6-wrap">
        <div className="v6-head">
          <SplitText as="h2" id="cat-title" text="Shop by category" className="v6-display v6-h2" />
        </div>
        <ul className={styles.catGrid}>
          {items.map((c, i) => (
            <li key={c.label}>
              <a href={c.href} className={styles.cat}>
                <span className={styles.catImg} data-reveal="wipe" style={{ "--d": i * 100 } as CSSProperties}>
                  <Image src={c.image} alt={c.alt} fill sizes="(max-width: 760px) 50vw, 25vw" />
                </span>
                <span className={styles.catRow}>
                  <span>
                    <span className={`v6-display ${styles.catLabel}`}>{c.label}</span>
                    <span className={styles.catCount}>{c.count} products</span>
                  </span>
                  <Arrow className={styles.catArrow} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Full-width photo banner: a headline, one line of text and a button over a gently moving photo. */
export function Banner({ data }: { data: typeof BannerData }) {
  return (
    <section className={styles.banner} aria-labelledby="banner-title">
      <div className={styles.bannerMedia}>
        <div className={styles.bannerParallax} data-parallax="0.1">
          <Image src={data.image} alt={data.alt} fill sizes="100vw" />
        </div>
        <span className={styles.bannerShade} aria-hidden />
      </div>
      <div className={`v6-wrap ${styles.bannerCopy}`}>
        <h2 id="banner-title" className={`v6-display ${styles.bannerTitle}`}>
          <SplitText text={data.title[0]} className={styles.block} />
          <SplitText text={data.title[1]} className={styles.block} delay={120} />
        </h2>
        <p data-reveal="up" style={{ "--d": 250 } as CSSProperties}>{data.text}</p>
        <a href={data.cta.href} className="v6-btn v6-btn--light" data-reveal="up" style={{ "--d": 350 } as CSSProperties}>
          {data.cta.label}<Arrow />
        </a>
      </div>
    </section>
  );
}

/** Three photo tiles, each with one word and a "Shop now" link. */
export function Stories({ items }: { items: typeof StoryData }) {
  return (
    <section id="stories" className="v6-section" aria-labelledby="stories-title">
      <div className="v6-wrap">
        <div className="v6-head">
          <SplitText as="h2" id="stories-title" text="Made for how you carry" className="v6-display v6-h2" />
        </div>
        <ul className={styles.stories}>
          {items.map((s, i) => (
            <li key={s.word}>
              <a href={s.href} className={styles.story} data-reveal="wipe" style={{ "--d": i * 120 } as CSSProperties}>
                <Image src={s.image} alt={s.alt} fill sizes="(max-width: 760px) 90vw, 33vw" />
                <span className={styles.storyShade} aria-hidden />
                <span className={styles.storyCopy}>
                  <span className={`v6-display ${styles.storyWord}`}>{s.word}</span>
                  <span className={styles.storyLink}>Shop now <Arrow width={18} /></span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Four reasons to buy, in a strip above the footer. */
export function Perks({ items }: { items: typeof PerkData }) {
  return (
    <section className={styles.perks} aria-label="Why Morucha">
      <ul className="v6-wrap">
        {items.map((p, i) => (
          <li key={p.title} data-reveal="up" style={{ "--d": i * 90 } as CSSProperties}>
            <span className={styles.perkIcon}>{perkIcons[p.icon]}</span>
            <span>
              <b className="v6-display">{p.title}</b>
              <span>{p.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
