import { makers } from "@/content/home";
import SectionHeading from "@/components/ui/SectionHeading";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import styles from "./MadeWithMorucha.module.css";

const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);

/** Hidesign "Get to know us better": heading + Instagram invite, then a row of square community posts. */
export default function MadeWithMorucha() {
  return (
    <section id="makers" className={`section bg-paper-light ${styles.makers}`}>
      <div className="container">
        <div className={styles.head}>
          <div>
            <SectionHeading label={makers.label} title={makers.title} align="left" className={styles.heading} />
            <Reveal delay={2}>
              <p className={styles.text}>{makers.text}</p>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <a href={makers.href} className={styles.follow}>
              <InstagramIcon />
              Follow {makers.handle}
            </a>
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {makers.items.map((m, i) => (
            <Reveal as="li" key={m.caption} delay={i}>
              <a href={makers.href} className={`${styles.post} hover-zoom`} aria-label={`Instagram post: ${m.caption}`}>
                <Photo {...m.image} sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 16vw" />
                <span className={styles.overlay}>
                  <InstagramIcon size={26} />
                  <span>{m.caption}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
