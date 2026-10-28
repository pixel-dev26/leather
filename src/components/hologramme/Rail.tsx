"use client";

import { Children, useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Icon from "./Icons";
import styles from "./Rail.module.css";

type Props = {
  children: ReactNode;
  /** Cards visible at ≥ 960px, 600–959px and < 600px. Fractions let the next card peek in. */
  perView: [number, number, number];
  label: string;
};

/**
 * Horizontal card row (hologramme-rule.md §7 "Rail controls"): native scroll-snap, then saddle square arrows either side
 * of a sage progress track whose thumb follows the scroll.
 */
export default function Rail({ children, perView, label }: Props) {
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
    el.scrollLeft = 0; // a new set of cards (a tab change) starts from the first one
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, children]);

  const step = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const vars = { "--n": perView[0], "--n-md": perView[1], "--n-sm": perView[2] } as CSSProperties;

  return (
    <div className={styles.wrap} style={vars}>
      <ul ref={row} className={styles.row} onScroll={measure} aria-label={label}>
        {Children.map(children, (child) => (
          <li className={styles.card}>{child}</li>
        ))}
      </ul>

      {state.thumb < 1 && (
        <div className={styles.controls}>
          <button className={styles.arrow} aria-label="Previous" disabled={state.start} onClick={() => step(-1)}>
            <Icon name="arrowLeft" size={16} />
          </button>
          <div className={styles.track} aria-hidden>
            <span style={{ width: `${state.thumb * 100}%`, left: `${state.left * 100}%` }} />
          </div>
          <button className={styles.arrow} aria-label="Next" disabled={state.end} onClick={() => step(1)}>
            <Icon name="arrowRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
