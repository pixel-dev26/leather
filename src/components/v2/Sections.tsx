import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { rich } from "@/components/ui/rich";
import { leathersV2, processV2, statement, storyV2 } from "@/content/home-v2";
import Stitch from "./Stitch";
import styles from "./Sections.module.css";
import { Title } from "./Title";

export function Statement() {
  return (
    <section className={styles.statement}>
      <Reveal as="p" className={styles.statementText}>
        {statement.text}
      </Reveal>
      <Reveal delay={2}>
        <Stamp />
      </Reveal>
    </section>
  );
}

/** Circular monogram seal (§7 "Statement + stamp"). */
function Stamp() {
  return (
    <svg className={styles.stamp} viewBox="0 0 120 120" aria-label="Morucha seal" role="img">
      <defs>
        {/* text runs clockwise on a true circle (r 47) between the two rings */}
        <path id="v2-seal" d="M60 13 a47 47 0 1 1 -0.01 0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text fontSize="9.2" letterSpacing="2.3" fill="currentColor">
        <textPath href="#v2-seal" textLength="290" lengthAdjust="spacing">
          MORUCHA · BRITISH LEATHER · EST. [TBC] ·
        </textPath>
      </text>
      <text x="60" y="77" textAnchor="middle" fontSize="48" fontStyle="italic" fill="currentColor" style={{ fontFamily: "var(--font-serif)" }}>
        M
      </text>
    </svg>
  );
}

export function Leathers() {
  return (
    <section className={styles.section} id="leathers" aria-labelledby="leathers-h">
      <Title id="leathers-h">{leathersV2.title}</Title>
      <div className={styles.grid4}>
        {leathersV2.items.map((l, i) => (
          <Reveal key={l.name} delay={i} className={styles.catItem}>
            <a href={l.href} className={styles.catMedia}>
              <Photo {...l.image} sizes="(max-width: 699px) 50vw, 25vw" />
              <Stitch text={l.letter} className={styles.catLetter} />
            </a>
            <a href={l.href} className={styles.cardTitle}>
              ↪ {l.name}
            </a>
            <p className={styles.catNote}>{l.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className={styles.sectionLg} id="story" aria-labelledby="story-h">
      <Title id="story-h">{storyV2.title}</Title>
      <div className={`${styles.band} ${styles.blue}`}>
        <div className={styles.bandText}>
          <Reveal as="p" className={styles.bigText}>
            {rich(storyV2.headline)}
          </Reveal>
          <Reveal as="p" className={`${styles.bigText} ${styles.bigTextSpaced}`} delay={1}>
            {storyV2.text}
          </Reveal>
          <a href={storyV2.cta.href} className={styles.button}>
            {storyV2.cta.label}
          </a>
        </div>
        <div className={styles.bandImage}>
          <Photo {...storyV2.image} sizes="(max-width: 699px) 100vw, 33vw" />
        </div>
        <dl className={styles.stats}>
          {storyV2.stats.map((s, i) => (
            <Reveal key={s.label} delay={i + 1} className={styles.stat}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={styles.section} id="process" aria-labelledby="process-h">
      <Title id="process-h">{processV2.title}</Title>
      <div className={styles.grid5}>
        {processV2.steps.map((s, i) => (
          <Reveal key={s.title} delay={i} className={styles.stepItem}>
            <div className={styles.stepMedia}>
              <Photo {...s.image} sizes="(max-width: 999px) 60vw, 20vw" />
              <Stitch text={String(i + 1)} className={styles.stepNum} />
            </div>
            <p className={styles.cardTitle}>{s.title}</p>
            <p className={styles.catNote}>{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
