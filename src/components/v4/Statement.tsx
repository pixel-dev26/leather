"use client";

import { useEffect, useRef } from "react";
import { statement } from "@/content/home";
import { plain, statementV4 } from "@/content/home-v4";
import CursorGlow from "./CursorGlow";
import { ArrowNE } from "./Icons";
import styles from "./Statement.module.css";

/**
 * Super Tannery "About Us" band (v4rule.md §7 Statement band): black + brown leather glow that follows the cursor,
 * side label, 600-weight statement whose words light up 0.1 → 1 as the band scrolls through.
 */
export default function Statement() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = plain(statement.text).split(/\s+/);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("span"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (still.matches) { spans.forEach((s) => (s.style.opacity = "1")); return; }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // reading point travels through the text while it moves from 85% to 35% of the viewport
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.5)));
      const lit = p * (spans.length + 3);
      spans.forEach((s, i) => {
        const o = Math.min(1, Math.max(0.1, (lit - i) / 3));
        s.style.opacity = o.toFixed(3);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="promise" className={`${styles.band} v4-glow v4-glow--right`} aria-labelledby="promise-label">
      <CursorGlow side="right" />
      <div className={`v4-inner v4-split ${styles.grid}`}>
        <h2 id="promise-label" className={`v4-label ${styles.label}`}>{statementV4.label}</h2>
        <div>
          <p ref={textRef} className={styles.text} aria-label={plain(statement.text)}>
            {words.map((w, i) => (
              <span key={i} aria-hidden>{w} </span>
            ))}
          </p>
          <a href={statementV4.link.href} className={`v4-link ${styles.link}`}>{statementV4.link.label}<ArrowNE /></a>
        </div>
      </div>
    </section>
  );
}
