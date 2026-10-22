"use client";

// Horizontal rail shared by the category, product and explore rows: cards in a native scroll-snap track, four
// across on desktop, with the reference's sand square arrows sitting over the edge at the middle of the photos.
// The back arrow only appears once the row has moved; the next arrow hides at the end.
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow } from "./Icons";
import styles from "./Rail.module.css";

export default function Rail({ label, children }: { label: string; children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // one "page" of whole cards at a time
  const page = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const step = card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const perPage = Math.max(1, Math.floor((el.clientWidth + 1) / step));
    el.scrollBy({ left: dir * step * perPage, behavior: "smooth" });
  };

  return (
    <div className={styles.rail}>
      <ul ref={track} className={styles.track} aria-label={label}>
        {Children.map(children, (child) => <li className={styles.item}>{child}</li>)}
      </ul>
      <button className={`${styles.arrow} ${styles.prev} ${edge.start ? styles.hide : ""}`} onClick={() => page(-1)} aria-label={`Previous ${label}`} tabIndex={edge.start ? -1 : 0}>
        <Arrow dir="left" />
      </button>
      <button className={`${styles.arrow} ${styles.next} ${edge.end ? styles.hide : ""}`} onClick={() => page(1)} aria-label={`Next ${label}`} tabIndex={edge.end ? -1 : 0}>
        <Arrow />
      </button>
    </div>
  );
}
