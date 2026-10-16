"use client";

import { useEffect, useRef } from "react";
import { heroV4 } from "@/content/home-v4";
import Halftone, { type HalftoneHandle } from "./Halftone";
import styles from "./Hero.module.css";

// Burst zoom (1 = burst fits the panel's longer side). Desktop zooms in as the track scrolls.
const ZOOM_FROM = 1.9;
const ZOOM_TO = 3;
const ZOOM_TABLET = 1.4;
const ZOOM_MOBILE = 1.3;

/**
 * Super Tannery hero (v4rule.md §7 Hero, §8): a tall scroll track holding a sticky panel.
 * As the track scrolls, the halftone zooms in and the headline grows 1 → 1.1. Desktop only.
 * The brand video plays inside the burst: it shows through the core and the dots (v4rule.md §7 Hero, rev 4.2).
 */
export default function Hero() {
  const trackRef = useRef<HTMLElement>(null);
  const halftoneRef = useRef<HalftoneHandle>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const desktop = window.matchMedia("(min-width: 1025px)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!desktop.matches || still.matches) {
        track.style.removeProperty("--p");
        halftoneRef.current?.setZoom(!desktop.matches ? (mobile.matches ? ZOOM_MOBILE : ZOOM_TABLET) : ZOOM_FROM);
        return;
      }
      const rect = track.getBoundingClientRect();
      const range = track.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(range, 1)));
      track.style.setProperty("--p", p.toFixed(4));
      halftoneRef.current?.setZoom(ZOOM_FROM + p * (ZOOM_TO - ZOOM_FROM));
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

  const { video } = heroV4;

  return (
    <>
      <section id="hero" ref={trackRef} className={styles.track} aria-label="Introduction">
        <span id="top" className={styles.anchor} />
        <div className={styles.panel}>
          {/* Video plays behind a halftone cut-out: it shows through the black core and every dot */}
          <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline preload="auto" poster={video.poster} aria-hidden>
            <source src={video.src} type="video/mp4" />
          </video>
          <div className={styles.shade} aria-hidden />
          <div className={styles.burst}>
            <Halftone ref={halftoneRef} zoom={ZOOM_FROM} cutout className={styles.halftone} />
          </div>
          <div className={styles.copy}>
            <h1 className={styles.title}>
              {heroV4.lines.map((l) => <span key={l}>{l}</span>)}
            </h1>
            <p className={styles.sub}>{heroV4.sub.replace("[YEAR TBC]", "")}<span className="tbc">[year TBC]</span></p>
          </div>
        </div>
      </section>
    </>
  );
}
