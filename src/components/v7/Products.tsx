"use client";

// Bucherer's product rails: studio shots on pale wells running edge to edge, the maker and model under each with a
// heart, the price and the stock state, then a thin progress line with arrows and a black VIEW ALL button. The rail
// scrolls natively (swipe, trackpad, keyboard) and can be dragged with a mouse.
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Rail, V7Product } from "@/content/home-v7";
import { WISHLIST_EVENT } from "./Motion";
import { Chevron, Heart } from "./Icons";
import styles from "./Products.module.css";

export function ProductCard({ p, index = 0 }: { p: V7Product; index?: number }) {
  const [saved, setSaved] = useState(false);
  const toggle = () => {
    setSaved((s) => !s);
    window.dispatchEvent(new CustomEvent(WISHLIST_EVENT, { detail: saved ? -1 : 1 }));
  };
  return (
    <article className={styles.card} data-handle={p.handle} data-reveal style={{ "--d": Math.min(index, 5) * 80 } as CSSProperties}>
      <a href="#" className={styles.media} aria-label={`${p.leather} ${p.name}, ${p.price}`} draggable={false}>
        <Image src={p.image} alt={`${p.leather} ${p.name}`} fill sizes="(max-width: 760px) 78vw, (max-width: 1100px) 40vw, 25vw" className={styles.main} draggable={false} />
        {p.hover && <Image src={p.hover} alt="" fill sizes="(max-width: 760px) 78vw, (max-width: 1100px) 40vw, 25vw" className={styles.hover} draggable={false} />}
      </a>
      <div className={styles.info}>
        <div className={styles.row}>
          <h3 className={styles.maker}>{p.leather}</h3>
          <button
            className={`${styles.heart} ${saved ? styles.saved : ""}`}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
            onClick={toggle}
          >
            <Heart />
          </button>
        </div>
        <p className={styles.model}>{p.name}</p>
        <div className={styles.row}>
          <p className={styles.price}>{p.price}</p>
          <p className={`${styles.stock} ${p.available ? "" : styles.out}`}>
            {p.colours > 1 && <span className={styles.colours}>{p.colours} colours</span>}
            <span className={styles.dot} aria-hidden />
            {p.available ? "In stock" : "Sold out"}
          </p>
        </div>
      </div>
    </article>
  );
}

export function ProductRail({ rail }: { rail: Rail }) {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const [ends, setEnds] = useState({ atStart: true, atEnd: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  // Once a frame at most, the progress thumb is moved directly. Only the arrows' enabled state goes through React,
  // and only when it changes, so scrolling never re-renders the cards.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth;
      const size = Math.min(1, el.clientWidth / max);
      if (thumb.current) {
        thumb.current.style.width = `${size * 100}%`;
        thumb.current.style.transform = `translateX(${(el.scrollLeft / max / size) * 100}%)`;
      }
      const atStart = el.scrollLeft <= 2;
      const atEnd = el.scrollLeft + el.clientWidth >= max - 2;
      setEnds((e) => (e.atStart === atStart && e.atEnd === atEnd ? e : { atStart, atEnd }));
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    el.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  const step = (el: HTMLElement) => {
    const card = el.querySelector<HTMLElement>("article");
    return card ? card.offsetWidth + 6 : el.clientWidth;
  };
  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const s = step(el);
    el.scrollBy({ left: dir * s * Math.max(1, Math.floor(el.clientWidth / s)), behavior: "smooth" });
  };
  // a mouse drag ends by gliding to the nearest card, then scroll snapping takes over again
  const release = () => {
    const el = track.current;
    const d = drag.current;
    drag.current = null;
    if (!el || !d?.moved) return;
    justDragged.current = true;
    window.setTimeout(() => { justDragged.current = false; }, 0);
    const s = step(el);
    el.scrollTo({ left: Math.round(el.scrollLeft / s) * s, behavior: "smooth" });
    window.setTimeout(() => el.classList.remove(styles.dragging), 500);
  };

  return (
    <section id={rail.id} className={`v7-section ${styles.section} ${rail.tone === "warm" ? styles.warm : ""}`} aria-labelledby={`${rail.id}-title`}>
      <header className="v7-head" data-reveal>
        <p className="v7-eyebrow">{rail.eyebrow}</p>
        <h2 id={`${rail.id}-title`} className="v7-h2">{rail.title}</h2>
        <p className="v7-intro">{rail.intro}</p>
      </header>

      <div
        ref={track}
        className={styles.track}
        tabIndex={0}
        aria-label={`${rail.title}, ${rail.items.length} products`}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !track.current) return;
          drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4 && !d.moved) {
            d.moved = true;
            track.current.classList.add(styles.dragging);
            track.current.setPointerCapture(e.pointerId); // keep the drag even if the mouse leaves the rail
          }
          if (d.moved) track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onClickCapture={(e) => {
          // the click that ends a drag doesn't open the card under the mouse
          if (!justDragged.current) return;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {rail.items.map((p, i) => <ProductCard key={p.handle} p={p} index={i} />)}
      </div>

      <div className={`v7-wide ${styles.foot}`}>
        <span className={styles.progress} aria-hidden>
          <span ref={thumb} />
        </span>
        <div className={styles.arrows}>
          <button onClick={() => page(-1)} disabled={ends.atStart} aria-label={`Previous products in ${rail.title}`}><Chevron dir="left" /></button>
          <button onClick={() => page(1)} disabled={ends.atEnd} aria-label={`More products in ${rail.title}`}><Chevron /></button>
        </div>
      </div>
      <div className={styles.cta}>
        <a className="v7-btn" href={rail.cta.href}>{rail.cta.label}</a>
      </div>
    </section>
  );
}
