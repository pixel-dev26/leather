"use client";

import { useEffect, useRef, useState } from "react";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import { sustainabilityV2 } from "@/content/home-v2";
import { Title } from "./Title";
import styles from "./Sustainability.module.css";

const INTERVAL = 6000;

/**
 * Interactive editorial band in three columns:
 * commitments accordion (auto-advances every 6s until someone picks one) | photo + figure for the active commitment | FAQs.
 */
export default function Sustainability() {
  const { points, faqs } = sustainabilityV2;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [faq, setFaq] = useState(-1);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const running = auto && visible && !hover;
  useEffect(() => {
    if (!running || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % points.length), INTERVAL);
    return () => clearTimeout(t);
  }, [running, active, points.length]);

  const choose = (i: number) => {
    setActive(i);
    setAuto(false); // the visitor has taken over
  };

  const p = points[active];

  return (
    <section ref={ref} className={styles.section} id="sustainability" aria-labelledby="sus-h">
      <Title id="sus-h">{sustainabilityV2.title}</Title>
      <div className={styles.band}>
        {/* left: commitments accordion */}
        <div className={styles.list} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <p className={styles.headline}>{rich(sustainabilityV2.headline)}</p>
          <ol role="tablist" aria-label="Our commitments" aria-orientation="vertical">
            {points.map((pt, i) => (
              <li key={pt.title} className={i === active ? styles.itemOn : ""}>
                <button
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="sus-panel"
                  className={styles.itemBtn}
                  onClick={() => choose(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") choose((i + 1) % points.length);
                    if (e.key === "ArrowUp") choose((i - 1 + points.length) % points.length);
                  }}
                >
                  <span className={styles.itemN}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.itemTitle}>{pt.title}</span>
                  <span className={styles.plus} aria-hidden />
                </button>
                <div className={styles.itemBody} id={i === active ? "sus-panel" : undefined} role="tabpanel" hidden={i !== active}>
                  <p>{pt.text}</p>
                </div>
                <span className={styles.bar} aria-hidden>
                  {i === active && <i style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: running ? "running" : "paused", opacity: auto ? 1 : 0 }} />}
                </span>
              </li>
            ))}
          </ol>
          <a href={sustainabilityV2.cta.href} className={styles.button}>
            {sustainabilityV2.cta.label}
          </a>
        </div>

        {/* middle: photo with the active commitment's figure */}
        <div className={styles.media}>
          {points.map((pt, i) => (
            <Photo key={pt.title} {...pt.image} className={`${styles.photo} ${i === active ? styles.photoOn : ""}`} sizes="(max-width: 699px) 100vw, 33vw" />
          ))}
          <div className={styles.figure} key={active} aria-live="polite">
            <span className={styles.figureNum}>{p.stat}</span>
            <span className={styles.figureLabel}>{p.statLabel}</span>
          </div>
          <span className={styles.counter}>
            {String(active + 1).padStart(2, "0")} / {String(points.length).padStart(2, "0")}
          </span>
        </div>

        {/* right: FAQs */}
        <div className={styles.faqs}>
          <p className={styles.faqTitle}>{sustainabilityV2.faqTitle}</p>
          {faqs.map((f, i) => (
            <div key={f.q} className={`${styles.faq} ${faq === i ? styles.faqOpen : ""}`}>
              <button type="button" aria-expanded={faq === i} aria-controls={`sus-faq-${i}`} onClick={() => setFaq(faq === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className={styles.plus} aria-hidden />
              </button>
              <div id={`sus-faq-${i}`} className={styles.faqBody}>
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
