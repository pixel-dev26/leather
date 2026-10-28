import Image from "next/image";
import { craftBanner, detail, factsStrip, hunterBanner, lookbook, promises, styles as styleTiles } from "@/content/home-v12";
import Icon from "@/components/v11/Icons";
import styles from "./More.module.css";

/** v12rule.md §9 brand facts: one ink band of light italic serif that loops slowly; still for reduced motion. */
export function FactsStrip() {
  const run = factsStrip.flatMap((f) => [f, "◆"]);
  return (
    <div className={styles.strip} role="note" aria-label={factsStrip.join(", ")}>
      <div className={styles.track} aria-hidden>
        {[0, 1].map((k) => (
          <span key={k}>{run.map((t, i) => (t === "◆" ? <i key={i}>◆</i> : <span key={i}>{t}</span>))}</span>
        ))}
      </div>
    </div>
  );
}

/** v12rule.md §9 Shop by Style: six 4:5 lifestyle tiles, three across, the name and count set on the photo. */
export function ShopByStyle() {
  return (
    <section className={styles.section} aria-labelledby="v12-styles-title">
      <div className={styles.head}>
        <h2 id="v12-styles-title" className="v12-title">{styleTiles.title}</h2>
        <a href={styleTiles.all.href} className="v12-link">{styleTiles.all.label}</a>
      </div>
      <ul className={styles.styleGrid}>
        {styleTiles.items.map((s) => (
          <li key={s.title}>
            <a href={s.href} className={styles.tile}>
              <Image src={s.image.src} alt={s.image.alt} fill sizes="(max-width: 599px) 50vw, 33vw" style={{ objectPosition: s.image.position }} />
              <span className={styles.tileText}>
                <span className={styles.tileTitle}>{s.title}</span>
                <span>{s.count} {s.count === 1 ? "style" : "styles"} ›</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** v12rule.md §9 The Detail: one product on the well, two close-ups and a facts list from its store listing. */
export function Detail() {
  return (
    <section className={styles.detail} aria-labelledby="v12-detail-title">
      <div className={styles.detailMain}>
        <Image src={detail.main.src} alt={detail.main.alt} fill sizes="(max-width: 959px) 100vw, 58vw" />
      </div>
      <div className={styles.detailSide}>
        <p className={styles.kicker}>{detail.label}</p>
        <h2 id="v12-detail-title" className="v12-display">{detail.title}</h2>
        <dl className={styles.facts}>
          {detail.facts.map((f) => (
            <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
          ))}
        </dl>
        <div className={styles.thumbs}>
          {detail.thumbs.map((t) => (
            <span key={t.src} className={styles.thumb}><Image src={t.src} alt={t.alt} fill sizes="(max-width: 959px) 45vw, 18vw" /></span>
          ))}
        </div>
        <a href={detail.cta.href} className={`v12-btn ${styles.darkBtn}`}>{detail.cta.label}</a>
      </div>
    </section>
  );
}

type BannerData = typeof hunterBanner;

/** v12rule.md §9 editorial banner: full-bleed photo, a dark wash from the left, a short rule, light title, line, button. */
export function Banner({ data, tall, id }: { data: BannerData; tall?: boolean; id: string }) {
  return (
    <section className={`${styles.banner} ${tall ? styles.tall : ""}`} aria-labelledby={id}>
      <Image src={data.image.src} alt={data.image.alt} fill sizes="100vw" style={{ objectPosition: data.image.position }} />
      <div className={styles.bannerText}>
        <span className={styles.rule} aria-hidden />
        <h2 id={id} className="v12-display">{data.title}</h2>
        <p>{data.text}</p>
        <a href={data.cta.href} className={`v12-btn ${styles.lightBtn}`}>{data.cta.label}</a>
      </div>
    </section>
  );
}
export const HunterBanner = () => <Banner data={hunterBanner} id="v12-hunter-title" />;
export const CraftBanner = () => <Banner data={craftBanner} id="v12-craft-title" tall />;

/** v12rule.md §9 In Hand: one tall photo with three to its right, small captions on each. */
export function Lookbook() {
  return (
    <section className={styles.section} aria-labelledby="v12-look-title">
      <div className={styles.head}>
        <h2 id="v12-look-title" className={`v12-title ${styles.italic}`}>{lookbook.title}</h2>
        <p className={styles.sub}>{lookbook.text}</p>
      </div>
      <div className={styles.look}>
        {lookbook.items.map((l) => (
          <figure key={l.caption} className={styles.lookItem}>
            <Image src={l.image.src} alt={l.image.alt} fill sizes="(max-width: 599px) 100vw, 40vw" style={{ objectPosition: l.image.position }} />
            <figcaption>{l.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** v12rule.md §9 promises: four white cells divided by hairlines, a thin icon, serif title and one line each. */
export function Promises() {
  return (
    <section aria-label="Our promises">
      <ul className={styles.promises}>
        {promises.map((p) => (
          <li key={p.title}>
            <Icon name={p.icon} size={34} className={styles.promIcon} />
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
