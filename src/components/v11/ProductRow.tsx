"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Card } from "@/content/home-v11";
import Icon from "./Icons";
import ProductCard from "./ProductCard";
import SectionHead from "./SectionHead";
import styles from "./ProductRow.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * v11rule.md §6 rail: a scroll-snap row of product cards with a hairline progress track, a "01 / 08" counter and
 * thin arrows. `perView` sets the cards in view at desktop, tablet and phone widths.
 */
export function Rail({ items, perView = [4, 2.3, 1.5], label }: { items: Card[]; perView?: [number, number, number]; label: string }) {
  const row = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ first: 1, progress: 0, start: true, end: false });

  const measure = () => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const max = el.scrollWidth - el.clientWidth;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    setState({
      first: Math.min(items.length, Math.round(el.scrollLeft / step) + 1),
      progress: max > 0 ? el.scrollLeft / max : 1,
      start: el.scrollLeft <= 2,
      end: el.scrollLeft >= max - 2,
    });
  };

  useEffect(() => {
    if (row.current) row.current.scrollLeft = 0;
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const go = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 20) * 2, behavior: "smooth" });
  };

  const vars = { "--n": perView[0], "--n-md": perView[1], "--n-sm": perView[2] } as CSSProperties;
  return (
    <div className={styles.rail} style={vars}>
      <ul ref={row} className={styles.row} onScroll={measure} aria-label={label}>
        {items.map((c) => <li key={c.handle}><ProductCard card={c} /></li>)}
      </ul>
      <div className={styles.ctrl}>
        <button aria-label="Previous products" disabled={state.start} onClick={() => go(-1)}><Icon name="arrowLeft" size={18} /></button>
        <span className={styles.count}>{pad(state.first)} / {pad(items.length)}</span>
        <span className={styles.track} aria-hidden><i style={{ width: `${Math.max(12, state.progress * 100)}%` }} /></span>
        <button aria-label="Next products" disabled={state.end} onClick={() => go(1)}><Icon name="arrowRight" size={18} /></button>
      </div>
    </div>
  );
}

type Props = { eyebrow: string; title: string; sets: { label: string; items: Card[] }[] };

/** v11rule.md §6 bestsellers: heading with quiet tabs under the title, then a rail. */
export default function Bestsellers({ eyebrow, title, sets }: Props) {
  const [tab, setTab] = useState(0);
  return (
    <section id="bestsellers" className="v11-wrap">
      <SectionHead eyebrow={eyebrow} title={title} link={{ label: "View all", href: "#bestsellers" }}>
        <div className={styles.tabs} role="tablist" aria-label={title}>
          {sets.map((s, i) => (
            <button key={s.label} role="tab" aria-selected={i === tab} className={i === tab ? styles.on : undefined} onClick={() => setTab(i)}>{s.label}</button>
          ))}
        </div>
      </SectionHead>
      <Rail items={sets[tab].items} label={sets[tab].label} />
    </section>
  );
}
