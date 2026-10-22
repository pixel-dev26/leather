// The v9 sections between the rails: Rapha's category cards, inset campaign banner, stories and promise row,
// Finisterre's brand statement under a turning stamp, and Bucherer's 2×2 gift grid.
import Image from "next/image";
import type { CSSProperties } from "react";
import type { campaign as campaignData, categories as categoriesData, gifts as giftsData, promises as promisesData, statement as statementData, stories as storiesData } from "@/content/home-v9";
import { ArrowRight, promiseIcons } from "./Icons";
import { Rail } from "./Products";
import styles from "./Sections.module.css";

/** Three tall photos, each with its name in capitals and two outlined buttons underneath. */
export function Categories({ data }: { data: typeof categoriesData }) {
  return (
    <section id={data.id} className="v9-section" aria-labelledby="v9-categories">
      <header className="v9-head" data-reveal><h2 id="v9-categories" className="v9-h2">{data.title}</h2></header>
      <ul className={`v9-wrap ${styles.cats}`}>
        {data.items.map((c, i) => (
          <li key={c.title} className={styles.cat} data-reveal style={{ "--d": i * 110 } as CSSProperties}>
            {/* the photo repeats the first button's link, so it stays out of the tab order */}
            <a href={c.links[0].href} className={styles.catMedia} tabIndex={-1}>
              <Image src={c.image} alt={c.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
            </a>
            <h3 className={`v9-caps ${styles.catTitle}`}>{c.title}</h3>
            <div className={styles.catLinks}>
              {c.links.map((l) => <a key={l.label} href={l.href} className="v9-btn v9-btn--outline">{l.label}</a>)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Finisterre's statement: one centred paragraph on sand under a slowly turning round stamp. */
export function Statement({ data }: { data: typeof statementData }) {
  return (
    <section id={data.id} className={styles.statement} aria-label={data.eyebrow}>
      <div className={`v9-wrap ${styles.statementInner}`} data-reveal>
        <div className={styles.stamp} aria-hidden>
          <svg viewBox="0 0 200 200" className={styles.stampRing}>
            <defs><path id="v9-stamp" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
            {/* once round the ring, spaced out to fill its 490px circumference */}
            <text><textPath href="#v9-stamp" textLength="486" lengthAdjust="spacing">{data.stamp}</textPath></text>
          </svg>
          <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.stampLogo} />
        </div>
        <p className="v9-eyebrow">{data.eyebrow}</p>
        <p className={styles.statementText}>{data.text}</p>
        <a className="v9-link" href={data.cta.href}>{data.cta.label} <ArrowRight width={16} height={16} /></a>
      </div>
    </section>
  );
}

/** Rapha's campaign block: a wide inset photo with a centred title, a line of serif and two black buttons below. */
export function Campaign({ data }: { data: typeof campaignData }) {
  return (
    <section id={data.id} className="v9-section" aria-labelledby="v9-campaign">
      <div className="v9-wrap">
        <div className={styles.campaignMedia} data-reveal="fade">
          <Image src={data.image} alt={data.alt} fill sizes="(max-width: 1440px) 100vw, 1440px" />
        </div>
        <div className={styles.campaignCopy} data-reveal>
          <h2 id="v9-campaign" className="v9-h2">{data.title}</h2>
          <p className="v9-intro">{data.text}</p>
          <div className={styles.campaignCtas}>
            {data.ctas.map((c) => <a key={c.label} href={c.href} className="v9-btn">{c.label}</a>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Bucherer's 2×2 gift grid, set in Rapha's capitals. */
export function Gifts({ data }: { data: typeof giftsData }) {
  return (
    <section id={data.id} className={`v9-section ${styles.gifts}`} aria-labelledby="v9-gifts">
      <header className="v9-head" data-reveal>
        <p className="v9-eyebrow">{data.eyebrow}</p>
        <h2 id="v9-gifts" className="v9-h2">{data.title}</h2>
      </header>
      <ul className={`v9-wrap ${styles.giftGrid}`}>
        {data.items.map((g, i) => (
          <li key={g.title} data-reveal style={{ "--d": (i % 2) * 110 } as CSSProperties}>
            <a href={g.href} className={styles.gift}>
              <span className={`${styles.giftMedia} ${g.packshot ? styles.packshot : ""}`}>
                <Image src={g.image} alt={g.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
              </span>
              <span className={`v9-caps ${styles.giftTitle}`}>{g.title}</span>
              <span className="v9-link">{g.link} <ArrowRight width={16} height={16} /></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Rapha's latest stories: tall cards in a rail, each with an outlined READ MORE. */
export function Stories({ data }: { data: typeof storiesData }) {
  return (
    <Rail id={data.id} title={data.title} label={`${data.title}, ${data.items.length} articles`}>
      {data.items.map((s, i) => (
        <article key={s.title} className={styles.story} data-reveal style={{ "--d": Math.min(i, 4) * 70 } as CSSProperties}>
          <a href="#" className={styles.storyMedia} tabIndex={-1} aria-hidden draggable={false}>
            <Image src={s.image} alt="" fill sizes="(max-width: 760px) 72vw, 24vw" style={{ objectPosition: s.focus ?? "50% 50%" }} draggable={false} />
          </a>
          <p className="v9-eyebrow">{s.label}</p>
          <h3 className={`v9-caps ${styles.storyTitle}`}>{s.title}</h3>
          <p className={styles.storyText}>{s.text}</p>
          <a href="#" className={`v9-btn v9-btn--outline ${styles.storyBtn}`}>Read more<span className="v9-sr">: {s.title}</span></a>
        </article>
      ))}
    </Rail>
  );
}

/** Rapha's promise row: four short commitments with line icons. */
export function Promises({ items }: { items: typeof promisesData }) {
  return (
    <section id="promises" className={styles.promises} aria-label="Our promises">
      <ul className={`v9-wrap ${styles.promiseList}`}>
        {items.map((p, i) => (
          <li key={p.title} data-reveal style={{ "--d": i * 80 } as CSSProperties}>
            {promiseIcons[p.icon]}
            <span>
              <strong className="v9-label">{p.title}</strong>
              {p.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
