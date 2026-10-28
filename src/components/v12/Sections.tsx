import Image from "next/image";
import { hero, leathers, pairs, story } from "@/content/home-v12";
import styles from "./Sections.module.css";

/** v12rule.md §6 hero: one 720px full-bleed photo, serif title, a line and the outlined button centred near the bottom. */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="v12-hero-title">
      <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" />
      <div className={styles.heroText}>
        <h1 id="v12-hero-title" className="v12-title">{hero.title}</h1>
        <p>{hero.text}</p>
        <a href={hero.cta.href} className={`v12-btn ${styles.heroBtn}`}>{hero.cta.label}</a>
      </div>
    </section>
  );
}

/** v12rule.md §6 photo pair: two square-ish tiles edge to edge, a serif label and "Shop Now" bottom-left. Stacks on phones. */
export function Pair({ index }: { index: number }) {
  return (
    <div className={styles.pair}>
      {pairs[index].map((t) => (
        <a key={t.id} id={t.id} href={t.href} className={styles.tile}>
          <Image src={t.image.src} alt={t.image.alt} fill sizes="(max-width: 599px) 100vw, 50vw" style={{ objectPosition: t.image.position }} />
          <span className={styles.tileText}>
            <span className={styles.tileTitle}>{t.title}</span>
            <span>Shop Now ›</span>
          </span>
        </a>
      ))}
    </div>
  );
}

/** v12rule.md §6 materials: a centred title and paragraph, then a row of leather photos with captions under them. */
export function Leathers() {
  return (
    <section className={styles.leathers} aria-labelledby="v12-leathers-title">
      <div className={styles.text}>
        <h2 id="v12-leathers-title" className="v12-title">{leathers.title}</h2>
        <p>{leathers.text}</p>
      </div>
      <ul className={styles.matRow}>
        {leathers.items.map((m) => (
          <li key={m.title}>
            <a href={m.href} className={styles.mat}>
              <span className={styles.matImg}><Image src={m.image.src} alt={m.image.alt} fill sizes="(max-width: 599px) 78vw, 430px" /></span>
              <span>{m.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** v12rule.md §6 story: centred title, a short paragraph and an outlined button. */
export function Story() {
  return (
    <section id="story" className={`${styles.text} ${styles.story}`} aria-labelledby="v12-story-title">
      <h2 id="v12-story-title" className="v12-title">{story.title}</h2>
      <p className={styles.tbc}>{story.text}</p>
      <a href={story.cta.href} className={`v12-btn ${styles.storyBtn}`}>{story.cta.label}</a>
    </section>
  );
}
