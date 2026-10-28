import { shopByCategory as c } from "@/content/home";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./Bestsellers.module.css";

/** "Category Atelier" (Coach / Bellroy / Thursday): shortcuts, then a bento of one tall hero category,
 *  captioned product tiles, an RFID band and a gift tile. */
export default function Bestsellers() {
  return (
    <section id="bestsellers" className={`bg-paper ${styles.section}`} aria-label="Shop by category">
      <div className={styles.head}>
        <div>
          <p className={styles.label}>{c.label}</p>
          <h2 className={styles.title}>{rich(c.title)}</h2>
        </div>
        <nav className={styles.shortcuts} aria-label="Shop by customer">
          {c.shortcuts.map((s) => (
            <a key={s.label} href={s.href}>
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={styles.bento}>
        <a href={c.hero.href} className={`${styles.hero} hover-zoom`}>
          <Photo {...c.hero.image} sizes="(max-width: 767px) 100vw, 30vw" className={styles.fill} />
          <span className={styles.shadeUp} aria-hidden />
          <span className={styles.heroText}>
            <span className={styles.heroName}>{c.hero.name}</span>
            <span className={styles.heroMeta}>{c.hero.meta} →</span>
          </span>
        </a>

        {c.tiles.map((t) => (
          <a key={t.name} href={t.href} className={`${styles.tile} hover-zoom`}>
            <span className={styles.tileMedia}>
              <Photo {...t.image} sizes="(max-width: 767px) 50vw, 20vw" className={styles.fill} />
            </span>
            <span className={styles.caption}>
              <span className={styles.tileName}>{t.name}</span>
              <span className={styles.count}>{t.count} →</span>
            </span>
          </a>
        ))}

        <a href={c.band.link.href} className={`${styles.band} hover-zoom`}>
          <Photo {...c.band.image} sizes="(max-width: 767px) 100vw, 40vw" className={styles.fill} />
          <span className={styles.shadeSide} aria-hidden />
          <span className={styles.bandText}>
            <span className={styles.bandLabel}>{c.band.label}</span>
            <span className={styles.bandTitle}>{rich(c.band.title)}</span>
            <span className={styles.bandLink}>{c.band.link.label}</span>
          </span>
        </a>

        <a href={c.gift.href} className={`bg-dark ${styles.gift}`}>
          <span className={styles.bandLabel}>{c.gift.label}</span>
          <span className={styles.giftTitle}>{rich(c.gift.title)}</span>
          <span className={styles.giftText}>{c.gift.text}</span>
        </a>
      </div>
    </section>
  );
}
