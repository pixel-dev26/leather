"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { NumberedCard } from "@/content/home-v12";
import Icon from "@/components/v11/Icons";
import styles from "./Rail.module.css";

/**
 * v12rule.md §6 product card: a portrait well with the product multiplied onto it and the second photo fading in on
 * hover, then name and price on one line and a row of colour squares. Picking a square underlines it.
 */
function Card({ card }: { card: NumberedCard }) {
  const [pick, setPick] = useState(0);
  const { name, price, href, image, hover, swatches, tag } = card;
  return (
    <article className={styles.card}>
      <a href={href} className={styles.well} aria-label={name}>
        <Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 60vw, (max-width: 959px) 40vw, 390px" />
        {hover && <Image src={hover} alt="" fill sizes="(max-width: 599px) 60vw, (max-width: 959px) 40vw, 390px" className={styles.alt} />}
        {tag && <span className={styles.tag}>{tag}</span>}
      </a>
      <p className={styles.meta}><a href={href}>{name}</a><span>{price}</span></p>
      {swatches.length > 0 && (
        <div className={styles.swatches} role="radiogroup" aria-label={`${name} colours`}>
          {swatches.map((s, i) => (
            <button key={s.name} role="radio" aria-checked={i === pick} aria-label={s.name} title={s.name} className={i === pick ? styles.on : undefined}
              style={{ background: s.fill }} onClick={() => setPick(i)} />
          ))}
        </div>
      )}
    </article>
  );
}

/** v12rule.md §6 rail: centred serif title and "View All", arrows on the right, then a row that runs off the edge. */
export default function Rail({ id, title, items }: { id: string; title: string; items: NumberedCard[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  const measure = () => {
    const el = row.current;
    if (!el) return;
    setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 });
  };
  useEffect(measure, []);

  const go = (dir: 1 | -1) => {
    const el = row.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 12) * 2, behavior: "smooth" });
  };

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <div className={styles.head}>
        <h2 id={`${id}-title`} className="v12-title">{title}</h2>
        <a href={`#${id}`} className="v12-link">View All</a>
        <div className={styles.arrows}>
          <button aria-label={`Previous ${title}`} disabled={ends.start} onClick={() => go(-1)}><Icon name="arrowLeft" size={18} /></button>
          <button aria-label={`Next ${title}`} disabled={ends.end} onClick={() => go(1)}><Icon name="arrowRight" size={18} /></button>
        </div>
      </div>
      <ul ref={row} className={styles.row} onScroll={measure}>
        {items.map((c) => <li key={c.handle}><Card card={c} /></li>)}
      </ul>
    </section>
  );
}
