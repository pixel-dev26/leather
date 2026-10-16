import { statement } from "@/content/home";
import Reveal from "@/components/ui/Reveal";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./StatementBanner.module.css";

export default function StatementBanner() {
  const [left, right] = statement.images;
  return (
    <section id="statement" className={`section bg-paper ${styles.statement}`}>
      <div className={`container ${styles.grid}`}>
        <Reveal className={`${styles.img} ${styles.imgLeft} hover-zoom`}>
          <Photo {...left} sizes="(max-width: 1023px) 50vw, 22vw" />
        </Reveal>

        <div className={styles.inner}>
          <Reveal>
            <p className={styles.label}>
              <span aria-hidden />
              {statement.label}
              <span aria-hidden />
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p className={styles.text}>{rich(statement.text)}</p>
          </Reveal>
          <Reveal delay={2}>
            <div className={styles.seal} aria-hidden>
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <g className={styles.ring}>
                  <text fontSize="8.6" letterSpacing="3.2" fill="currentColor">
                    <textPath href="#ring">MORUCHA · BRITISH LEATHER · TANNED WITH CARE ·</textPath>
                  </text>
                </g>
                <text x="60" y="67" textAnchor="middle" fontSize="22" fontStyle="italic" fill="currentColor" className={styles.m}>
                  M
                </text>
              </svg>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2} className={`${styles.img} ${styles.imgRight} hover-zoom`}>
          <Photo {...right} sizes="(max-width: 1023px) 50vw, 18vw" />
        </Reveal>
      </div>
    </section>
  );
}
