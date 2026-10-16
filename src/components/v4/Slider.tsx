"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Chevron } from "./Icons";
import styles from "./Slider.module.css";

type Props = {
  children: ReactNode;
  label: string;
  /** slides visible: desktop / tablet / mobile (fractions give a peek) */
  per: [number, number, number];
  gap: number;
  step?: number;
  interval: number; // ms between moves
  speed: number; // ms per move
  arrows?: boolean;
  className?: string;
};

/**
 * Infinite slider for the Super Tannery "Events" and "Finished Leather" patterns (v4rule.md §7).
 * Pauses on hover/focus and when off-screen; respects reduced motion (no autoplay).
 */
export default function Slider({ children, label, per, gap, step = 1, interval, speed, arrows, className = "" }: Props) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const clones = 3;
  const [i, setI] = useState(0);
  const [animate, setAnimate] = useState(true);
  const paused = useRef(false);
  const visible = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const iRef = useRef(0);
  useEffect(() => { iRef.current = i; }, [i]);

  const go = useCallback((dir: 1 | -1) => {
    const x = iRef.current;
    if (dir === -1 && x - step < 0) {
      // jump to the clone end without animation, then step back
      setAnimate(false);
      setI(n);
      requestAnimationFrame(() => requestAnimationFrame(() => { setAnimate(true); setI(n - step); }));
      return;
    }
    if (x + dir * step > n + clones - Math.ceil(per[0])) return; // still wrapping
    setAnimate(true);
    setI(x + dir * step);
  }, [n, step, per]);

  // wrap from the clones back to the real first slide
  useEffect(() => {
    if (i < n) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setI(i - n);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    }, speed);
    return () => clearTimeout(t);
  }, [i, n, speed]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting));
    io.observe(el);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => io.disconnect();
    const t = setInterval(() => { if (!paused.current && visible.current && !document.hidden) go(1); }, interval);
    return () => { clearInterval(t); io.disconnect(); };
  }, [go, interval]);

  const pages = Math.ceil(n / step);
  const page = Math.floor((i % n) / step);

  const style = {
    "--i": i, "--gap": `${gap}px`, "--per-d": per[0], "--per-t": per[1], "--per-m": per[2],
    "--speed": animate ? `${speed}ms` : "0ms",
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${arrows ? styles.withArrows : ""} ${className}`}
      style={style}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
    >
      {arrows && (
        <button type="button" className={`${styles.arrow} ${styles.prev}`} aria-label="Previous" onClick={() => go(-1)}>
          <Chevron dir="left" />
        </button>
      )}
      <div className={styles.viewport}>
        <ul className={styles.track}>
          {slides.map((s, k) => <li key={k} className={styles.slide} aria-hidden={k < i || k >= i + Math.ceil(per[0])}>{s}</li>)}
          {slides.slice(0, clones).map((s, k) => <li key={`c${k}`} className={styles.slide} aria-hidden>{s}</li>)}
        </ul>
      </div>
      {arrows && (
        <button type="button" className={`${styles.arrow} ${styles.next}`} aria-label="Next" onClick={() => go(1)}>
          <Chevron />
        </button>
      )}
      <div className="v4-dots">
        {Array.from({ length: pages }, (_, k) => (
          <button
            key={k}
            type="button"
            aria-label={`Go to slide ${k + 1}`}
            aria-current={k === page}
            onClick={() => { setAnimate(true); setI(k * step); }}
          />
        ))}
      </div>
    </div>
  );
}
