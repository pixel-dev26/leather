import { collections } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import styles from "./Collections.module.css";

export default function Collections() {
  return (
    <section id="collections" className={`section bg-sand ${styles.collections}`}>
      <div className="container">
        <SectionHeading label={collections.label} title={collections.title} />
        <ul className={styles.grid}>
          {collections.items.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i} className={styles.item}>
              <a href={c.href} className={`${styles.card} hover-zoom`}>
                <Photo {...c.image} sizes="(max-width: 1023px) 50vw, 25vw" className={styles.photo} />
                <span className={`${styles.overlay} ${c.shade ? styles.shade : ""}`} aria-hidden />
                <span className={styles.frame} aria-hidden />
                <span className={styles.count}>{c.count}</span>
                <span className={styles.name}>{c.name}</span>
                <span className={styles.shop}>Shop now</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
