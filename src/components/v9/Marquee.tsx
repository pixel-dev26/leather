"use client";

// Rapha's announcement bar: a black strip of capitals that scrolls on its own ("NEW IN | SHOP NOW"), with a pause
// button; it also holds still while a link in it has keyboard focus. The messages are doubled so the loop never gaps.
import { useState } from "react";
import { Pause, Play } from "./Icons";
import styles from "./Marquee.module.css";

type Item = { text: string; cta: string; href: string };

export default function Marquee({ items }: { items: Item[] }) {
  const [paused, setPaused] = useState(false);
  const run = (copy: number) =>
    items.map((m) => (
      <a key={`${copy}-${m.text}`} href={m.href} className={styles.item} tabIndex={copy ? -1 : undefined} aria-hidden={copy ? true : undefined}>
        <span>{m.text}</span>
        <span className={styles.bar} aria-hidden>|</span>
        <span>{m.cta}</span>
      </a>
    ));
  return (
    <div className={`${styles.marquee} ${paused ? styles.paused : ""}`} role="region" aria-label="Offers">
      <div className={styles.viewport}>
        <div className={styles.track}>
          {run(0)}
          {run(1)}
        </div>
      </div>
      <button className={styles.toggle} onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play the offers bar" : "Pause the offers bar"} aria-pressed={paused}>
        {paused ? <Play /> : <Pause />}
      </button>
    </div>
  );
}
