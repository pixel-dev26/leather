"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Icon from "./Icons";
import styles from "./Rail.module.css";

type Props = {
  children: ReactNode;
  /** Cards visible at ≥ 960px, 600–959px and < 600px. Fractions let the next card peek in. */
  perView: [number, number, number];
  /** Image height ÷ width, used to centre the arrows on the images. */
  ratio: number;
  gutter?: "default" | "slider";
  gap?: number;
  label: string;
};

/**
 * Horizontal card row (v3rule.md §7 "Slider arrows", §9 swipe rows): native scroll-snap, square
 * translucent arrows on desktop, and a 2px progress bar under the row on touch screens.
 */
export default function Rail({ children, perView, ratio, gutter = "default", gap = 16, label }: Props) {
  const row = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: false, thumb: 1, left: 0 });

  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const thumb = el.scrollWidth ? Math.min(1, el.clientWidth / el.scrollWidth) : 1;
    setState({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
      thumb,
      left: max > 0 ? (el.scrollLeft / max) * (1 - thumb) : 0,
    });
  }, []);

  useEffect(() => {
    measure();
    const el = row.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, children]);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const vars = {
    "--n": perView[0],
    "--n-md": perView[1],
    "--n-sm": perView[2],
    "--ratio": ratio,
    "--gap": `${gap}px`,
    "--g": gutter === "slider" ? "var(--gutter-slider)" : "var(--gutter)",
  } as CSSProperties;

  return (
    <div className={styles.wrap} style={vars}>
      <ul ref={row} className={styles.row} onScroll={measure} aria-label={label}>
        {Children.map(children, (child) => (
          <li className={styles.card}>{child}</li>
        ))}
      </ul>

      {!state.start && (
        <button className={`${styles.arrow} ${styles.prev}`} aria-label="Previous" onClick={() => step(-1)}>
          <Icon name="chevronLeft" size={22} />
        </button>
      )}
      {!state.end && (
        <button className={`${styles.arrow} ${styles.next}`} aria-label="Next" onClick={() => step(1)}>
          <Icon name="chevronRight" size={22} />
        </button>
      )}

      {state.thumb < 1 && (
        <div className={styles.progress} aria-hidden>
          <span style={{ width: `${state.thumb * 100}%`, left: `${state.left * 100}%` }} />
        </div>
      )}
    </div>
  );
}
