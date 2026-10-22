"use client";

// Product cards and rails. Cards follow Rapha (a 4:5 studio shot on a pale well, a round NEW badge, a round quick add,
// the name in capitals and the price in serif), with Finisterre's small colour tag over the name and Bucherer's stock
// dot beside the price. A rail (products here, stories in Sections.tsx) scrolls natively (swipe, trackpad, keyboard),
// drags with a mouse and glides to the nearest card on release; a progress line and round arrows sit underneath.
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Rail, V9Product } from "@/content/home-v9";
import { ADD_TO_BAG_EVENT } from "./Motion";
import { ArrowLeft, ArrowRight, BagPlus, Check } from "./Icons";
import styles from "./Products.module.css";

const sizes = "(max-width: 760px) 72vw, (max-width: 1100px) 36vw, 24vw";

export function ProductCard({ p, index = 0 }: { p: V9Product; index?: number }) {
  const [added, setAdded] = useState(false);
  const add = () => {
    window.dispatchEvent(new CustomEvent(ADD_TO_BAG_EVENT, { detail: `${p.name}, ${p.price}` }));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };
  return (
    <article className={styles.card} data-handle={p.handle} data-reveal style={{ "--d": Math.min(index, 5) * 70 } as CSSProperties}>
      <div className={styles.media}>
        <a href="#" className={styles.mediaLink} aria-label={`${p.name}, ${p.price}`} draggable={false}>
          <Image src={p.image} alt={`${p.leather} ${p.name}`} fill sizes={sizes} className={styles.main} draggable={false} />
          {p.hover && <Image src={p.hover} alt="" fill sizes={sizes} className={styles.hover} draggable={false} />}
        </a>
        {p.isNew && <span className={`v9-label ${styles.badge}`}>New</span>}
        <button
          className={`v9-round ${styles.quick} ${added ? styles.quickDone : ""}`}
          onClick={add}
          disabled={!p.available}
          aria-label={p.available ? `Add ${p.name} to bag` : `${p.name} is sold out`}
        >
          {added ? <Check /> : <BagPlus />}
        </button>
      </div>
      <div className={styles.info}>
        {p.colours > 1 && <p className={`v9-label ${styles.tag}`}>{p.colours} colours</p>}
        <h3 className={`v9-label ${styles.name}`}><a href="#">{p.name}</a></h3>
        <p className={styles.leather}>{p.leather}</p>
        <p className={styles.row}>
          <span className={styles.price}>{p.price}</span>
          <span className={`${styles.stock} ${p.available ? "" : styles.out}`}><span className={styles.dot} aria-hidden />{p.available ? "In stock" : "Sold out"}</span>
        </p>
      </div>
    </article>
  );
}

export function ProductRail({ rail }: { rail: Rail }) {
  return (
    <Rail id={rail.id} title={rail.title} intro={rail.intro} cta={rail.cta} label={`${rail.title}, ${rail.items.length} products`}>
      {rail.items.map((p, i) => <ProductCard key={p.handle} p={p} index={i} />)}
    </Rail>
  );
}

type RailProps = { id: string; title: string; intro?: string; cta?: { label: string; href: string }; label: string; children: React.ReactNode };

/** A centred heading over a sideways-scrolling row of cards (products or stories), with a progress line and arrows. */
export function Rail({ id, title, intro, cta, label, children }: RailProps) {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const [ends, setEnds] = useState({ atStart: true, atEnd: false });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  // Once a frame at most, the progress thumb is moved directly; only the arrows' state goes through React, and only
  // when it changes, so scrolling never re-renders the cards.
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
    return card ? card.offsetWidth + 12 : el.clientWidth;
  };
  const page = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const s = step(el);
    el.scrollBy({ left: dir * s * Math.max(1, Math.floor(el.clientWidth / s)), behavior: "smooth" });
  };
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
    <section id={id} className={`v9-section ${styles.section}`} aria-labelledby={`${id}-title`}>
      <header className="v9-head" data-reveal>
        <h2 id={`${id}-title`} className="v9-h2">{title}</h2>
        {intro && <p className="v9-intro">{intro}</p>}
      </header>

      <div
        ref={track}
        className={styles.track}
        tabIndex={0}
        aria-label={label}
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
            track.current.setPointerCapture(e.pointerId);
          }
          if (d.moved) track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={release}
        onPointerCancel={release}
        onClickCapture={(e) => {
          if (!justDragged.current) return;
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {children}
      </div>

      <div className={`v9-wrap ${styles.foot}`}>
        {cta && <a className="v9-link" href={cta.href}>{cta.label} <ArrowRight width={16} height={16} /></a>}
        <span className={styles.progress} aria-hidden><span ref={thumb} /></span>
        <div className={styles.arrows}>
          <button className="v9-round" onClick={() => page(-1)} disabled={ends.atStart} aria-label={`Back in ${title}`}><ArrowLeft /></button>
          <button className="v9-round" onClick={() => page(1)} disabled={ends.atEnd} aria-label={`More in ${title}`}><ArrowRight /></button>
        </div>
      </div>
    </section>
  );
}
