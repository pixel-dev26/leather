import { discover } from "@/content/home";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import styles from "./DiscoverCards.module.css";

/** Chesterfield-style trio: three tall photo cards, italic two-line headline and an underlined link. */
export default function DiscoverCards() {
  return (
    <section id="discover" className={`bg-paper ${styles.discover}`} aria-label="Discover Fitting Belt">
      <ul className={styles.grid}>
        {discover.items.map((d, i) => (
          <Reveal as="li" key={d.link.label} delay={i}>
            <a href={d.link.href} className={`${styles.card} hover-zoom`}>
              <Photo {...d.image} sizes="(max-width: 767px) 90vw, 33vw" className={styles.photo} />
              <span className={styles.shade} aria-hidden />
              <span className={styles.copy}>
                <span className={styles.title}>{d.title}</span>
                <span className={styles.link}>{d.link.label}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
