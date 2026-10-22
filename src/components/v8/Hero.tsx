"use client";

// Full-screen hero that stands in for the reference's background video: Morucha's own photos crossfade one after
// another, each drifting slowly closer, under a large title and two sand buttons. A pause button stops the sequence
// (WCAG 2.2.2); it never plays when the visitor prefers reduced motion.
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play } from "./Icons";
import styles from "./Hero.module.css";

type Props = {
  title: string;
  ctas: { label: string; href: string }[];
  frames: { src: string; alt: string; focus: string }[];
};

const FRAME_MS = 6500;

export default function Hero({ title, ctas, frames }: Props) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || frames.length < 2) return;
    const id = window.setInterval(() => setCurrent((c) => (c + 1) % frames.length), FRAME_MS);
    return () => window.clearInterval(id);
  }, [playing, frames.length]);

  return (
    <section className={`${styles.hero} ${playing ? "" : styles.paused}`} aria-label="Featured">
      <div className={styles.frames}>
        {frames.map((f, i) => (
          <div key={f.src} className={`${styles.frame} ${i === current ? styles.on : ""}`} aria-hidden={i !== current}>
            <Image src={f.src} alt={f.alt} fill priority={i === 0} sizes="100vw" style={{ objectPosition: f.focus }} />
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.ctas}>
          {ctas.map((c) => <a key={c.label} href={c.href} className="v8-btn">{c.label}</a>)}
        </div>
      </div>

      {frames.length > 1 && (
        <button className={styles.toggle} onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause the slideshow" : "Play the slideshow"}>
          {playing ? <Pause /> : <Play />}
        </button>
      )}
    </section>
  );
}
