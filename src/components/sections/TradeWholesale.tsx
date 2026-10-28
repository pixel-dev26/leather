import { trade } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import styles from "./TradeWholesale.module.css";

export default function TradeWholesale() {
  return (
    <section id="trade" className={`section bg-sand ${styles.trade}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={`${styles.media} hover-zoom`}>
          <Photo {...trade.image} sizes="(max-width: 1023px) 100vw, 40vw" />
          <span className={styles.badge}>
            Over 400
            <br />
            <em>stores</em>
          </span>
        </Reveal>

        <div className={styles.content}>
          <SectionHeading label={trade.label} title={trade.title} align="left" />
          <Reveal>
            <p className={styles.intro}>{trade.text}</p>
          </Reveal>
          <ul className={styles.benefits}>
            {trade.benefits.map((b, i) => (
              <Reveal as="li" key={b.n} delay={i} className={styles.benefit}>
                <span className={styles.n}>{b.n}</span>
                <div>
                  <h3 className={styles.title}>{b.title}</h3>
                  <p className={styles.text}>{b.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className={styles.ctas}>
            <Button href={trade.primary.href} variant="secondary">
              {trade.primary.label}
            </Button>
            <Button href={trade.secondary.href} variant="ghost">
              {trade.secondary.label}
            </Button>
          </Reveal>
          <p className={styles.email}>
            Or email <a href={`mailto:${trade.email}`}>{trade.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
