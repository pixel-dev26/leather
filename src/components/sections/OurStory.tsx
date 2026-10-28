import { story } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import styles from "./Split.module.css";

export default function OurStory() {
  return (
    <section id="story" className={`bg-paper ${styles.split}`}>
      <div className={styles.grid}>
        <div className={styles.mediaCol}>
          <div className={`${styles.media} hover-zoom`}>
            <Photo {...story.image} sizes="(max-width: 1023px) 100vw, 55vw" />
          </div>
          <Reveal delay={2} className={`${styles.inset} hover-zoom`}>
            <Photo {...story.inset} sizes="(max-width: 1023px) 40vw, 18vw" />
          </Reveal>
          <div className={styles.stamp} aria-hidden>
            <span>
              Est.<b>[TBC]</b>Australia
            </span>
          </div>
        </div>
        <div className={styles.text}>
          <div className={styles.textInner}>
            <SectionHeading label={story.label} title={story.display} align="left" size="xl" />
            <Reveal>
              <h3 className={styles.title}>{story.title}</h3>
            </Reveal>
            <div className={styles.copy}>
              {story.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={i + 1}>
                  {p}
                </Reveal>
              ))}
            </div>
            <Reveal delay={3} className={styles.cta}>
              <Button href={story.cta.href} variant="ghost">
                {story.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
