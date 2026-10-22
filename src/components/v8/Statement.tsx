"use client";

// The mission statement: a sand-ruled eyebrow, the large statement whose words light up from faint to ink as it
// scrolls up the screen (the navy phrase lights to navy), a row of live facts, and two of Morucha's photos layered
// over a sand block that drift at different speeds. Everything is fully lit and still under reduced motion.
import Image from "next/image";
import { Fragment, useEffect, useRef, type CSSProperties } from "react";
import styles from "./Statement.module.css";

type Part = string | { link: string; href: string };
type Props = {
  eyebrow: string;
  parts: Part[];
  facts: { value: string; label: string }[];
  photo: { src: string; alt: string };
  inset: { src: string; alt: string };
};

export default function Statement({ eyebrow, parts, facts, photo, inset }: Props) {
  const section = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = section.current, p = text.current;
    if (!el || !p) return;
    const words = Number(p.dataset.words) || 1;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      p.style.setProperty("--p", String(words + 1));
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      // 0 when the text's top reaches 85% of the screen; every word lit when its bottom reaches 50%
      const r = p.getBoundingClientRect();
      const start = vh * 0.85, end = vh * 0.5;
      const t = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      p.style.setProperty("--p", (t * (words + 1)).toFixed(2));
      // the photos drift against each other around the middle of the screen
      const s = el.getBoundingClientRect();
      el.style.setProperty("--shift", ((s.top + s.height / 2 - vh / 2) / vh).toFixed(3));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // every word gets its index, so CSS can light it once --p passes it. Inside the linked phrase the last word keeps
  // no trailing space (the space follows the link instead), so the underline stops at the word.
  let i = 0;
  const words = (str: string, link = false) => {
    const list = str.split(/\s+/).filter(Boolean);
    return list.map((w, wi) => (
      <span key={wi} className={`${styles.w} ${link ? styles.wLink : ""}`} style={{ "--i": i++ } as CSSProperties}>
        {w}{link && wi === list.length - 1 ? "" : " "}
      </span>
    ));
  };
  const tokens = parts.map((part, pi) => (
    <Fragment key={pi}>
      {typeof part === "string" ? words(part) : <><a href={part.href} className={`v8-link ${styles.link}`}>{words(part.link, true)}</a>{" "}</>}
    </Fragment>
  ));

  return (
    <section ref={section} className={styles.statement} aria-labelledby="v8-statement-eyebrow">
      <div className={styles.copy}>
        <p id="v8-statement-eyebrow" className={styles.eyebrow} data-reveal>{eyebrow}</p>
        <p ref={text} className={styles.text} data-words={i}>{tokens}</p>
        <dl className={styles.facts}>
          {facts.map((f, fi) => (
            <div key={f.label} className={styles.fact} data-reveal style={{ "--d": fi * 90 } as CSSProperties}>
              <dt className={styles.value}>{f.value}</dt>
              <dd className={styles.label}>{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.media}>
        <span className={styles.block} aria-hidden />
        <figure className={styles.photo} data-reveal>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 80vw, 34vw" />
        </figure>
        <figure className={styles.inset} data-reveal style={{ "--d": 180 } as CSSProperties}>
          <Image src={inset.src} alt={inset.alt} fill sizes="(max-width: 900px) 45vw, 18vw" />
        </figure>
      </div>
    </section>
  );
}
