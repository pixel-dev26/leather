import { sustainability } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import styles from "./Split.module.css";

export default function Sustainability() {
  return (
    <section id="sustainability" className={`bg-paper ${styles.split} ${styles.reverse}`}>
      <div className={styles.grid}>
        <div className={styles.mediaCol}>
          <div className={`${styles.media} hover-zoom`}>
            <Photo {...sustainability.image} sizes="(max-width: 1023px) 100vw, 55vw" />
          </div>
          <Reveal delay={2} className={`${styles.inset} hover-zoom`}>
            <Photo {...sustainability.inset} sizes="(max-width: 1023px) 40vw, 18vw" />
          </Reveal>
        </div>
        <div className={styles.text}>
          <div className={styles.textInner}>
            <SectionHeading label={sustainability.label} title={sustainability.display} align="left" size="xl" />
            <Reveal>
              <h3 className={styles.title}>{sustainability.title}</h3>
            </Reveal>
            <ol className={styles.points}>
              {sustainability.points.map((pt, i) => (
                <Reveal as="li" key={pt.title} delay={i + 1} className={styles.point}>
                  <span className={styles.pointN}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h4 className={styles.pointTitle}>{pt.title}</h4>
                    <p className={styles.pointText}>{pt.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={4} className={styles.cta}>
              <Button href={sustainability.cta.href} variant="text">
                {sustainability.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
