// The Hologramme home sections that need no state of their own (hologramme-rule.md §10): marquee, categories, bestsellers,
// story, promise rows, collections and the showrooms block (Inside). Reviews live in ./Reviews.tsx.
import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  bestsellers, categories, collections, craftPromises, inside, marquee, servicePromises, story,
  type Assurance,
} from "@/content/home-hologramme";
import Icon, { PromiseIcon } from "./Icons";
import PixelHover from "./PixelHover";
import ProductCard from "./ProductCard";
import Rail from "./Rail";
import styles from "./Sections.module.css";

/** Wraps "[… TBC]" notes in a dashed underline so unconfirmed copy stands out. */
function tbc(text: string): ReactNode {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") ? <span key={i} className="tbc">{part}</span> : <Fragment key={i}>{part}</Fragment>,
  );
}

export function Marquee() {
  const run = (hidden: boolean) => (
    <div className={styles.marqueeRun} aria-hidden={hidden || undefined}>
      {marquee.map((m) => (
        <Fragment key={m}>
          <Icon name="spark" size={22} />
          <span>{m}</span>
        </Fragment>
      ))}
    </div>
  );
  return (
    <section className={styles.marquee} aria-label="Our promises">
      <div className={styles.marqueeTrack}>
        {run(false)}
        {run(true)}
      </div>
    </section>
  );
}

/** A wavy ring for the fifth category: radius 56 ± 2.2 with 14 waves, as one closed path. */
const WAVE = Array.from({ length: 169 }, (_, i) => {
  const a = (i / 168) * Math.PI * 2;
  const r = 56 + 2.2 * Math.sin(a * 14);
  return `${i ? "L" : "M"}${(60 + r * Math.cos(a)).toFixed(2)} ${(60 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ") + "Z";

/** hologramme-rule.md §7: every category circle gets its own stroke ring (stitch, double, dots, arcs, wave). */
function Ring({ variant }: { variant: number }) {
  const rings = [
    <circle key="stitch" cx="60" cy="60" r="56" strokeDasharray="5 4" />,
    <g key="double"><circle cx="60" cy="60" r="57" /><circle className={styles.ringSoft} cx="60" cy="60" r="53.5" /></g>,
    <circle key="dots" cx="60" cy="60" r="56" strokeDasharray="0 7.33" strokeWidth="2.6" strokeLinecap="round" />,
    <circle key="arcs" cx="60" cy="60" r="56" strokeDasharray="70 18 22 18 40 18 50 16" strokeWidth="1.6" strokeLinecap="round" />,
    <path key="wave" d={WAVE} />,
  ];
  return (
    <svg className={styles.ring} viewBox="0 0 120 120" fill="none" aria-hidden>
      {rings[variant % rings.length]}
    </svg>
  );
}

export function Categories() {
  return (
    <section className="holo-wrap" aria-label="Shop by category">
      <ul className={styles.cats}>
        {categories.map((c, i) => (
          <Reveal as="li" key={c.label} delay={i}>
            <a href={c.href} className={styles.cat}>
              <span className={styles.ringed}>
                <Ring variant={i} />
                <span className={styles.circle}>
                  <Image src={c.image.src} alt={c.image.alt} fill sizes="150px" />
                </span>
              </span>
              {c.label}
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Bestsellers() {
  return (
    <section id="bestsellers" className={`holo-wrap ${styles.split}`}>
      <Reveal className={styles.splitCopy}>
        <h2>{bestsellers.title}</h2>
        <p>{bestsellers.text}</p>
        <a href={bestsellers.cta.href} className="holo-btn">{bestsellers.cta.label}</a>
      </Reveal>
      <Rail perView={[4.4, 2.5, 1.6]} label="Bestsellers">
        {bestsellers.products.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
      </Rail>
    </section>
  );
}

export function Story() {
  return (
    <section id="story" className={`holo-wrap ${styles.story}`}>
      <Reveal className={styles.storyImg}>
        <Image src={story.image.src} alt={story.image.alt} fill sizes="(max-width: 959px) 100vw, 640px" />
      </Reveal>
      <Reveal className={styles.storyCopy} delay={1}>
        <span className="holo-label">{story.eyebrow}</span>
        <h2>{story.title}</h2>
        <p>{tbc(story.text)}</p>
        <a href={story.cta.href} className="holo-btn holo-btn--line">{story.cta.label}</a>
      </Reveal>
    </section>
  );
}

export function Promises({ kind }: { kind: "craft" | "service" }) {
  const items: Assurance[] = kind === "craft" ? craftPromises : servicePromises;
  return (
    <section className="holo-wrap" aria-label={kind === "craft" ? "How we make them" : "Delivery and service"}>
      <ul className={styles.promises}>
        {items.map((p) => (
          <li key={p.title}>
            <PromiseIcon name={p.icon} />
            <span>{p.title}</span>
            {p.note && <small>{tbc(p.note)}</small>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Collections() {
  return (
    <section id="collections">
      <h2 className="holo-h2 holo-wrap">{collections.title}</h2>
      <div className={styles.tri}>
        {collections.items.map((c) => (
          <a key={c.label} href={c.href} className={styles.triItem}>
            <Image src={c.image.src} alt={c.image.alt} fill sizes="(max-width: 599px) 100vw, 34vw" />
            <PixelHover src={c.image.src} />
            <span>
              <b>{c.label}</b>
              <u>Explore now</u>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Inside() {
  return (
    <section className={`holo-wrap ${styles.split} ${styles.inside}`}>
      <Reveal className={styles.splitCopy}>
        <h2>{inside.title}</h2>
        <p>{inside.text}</p>
        <a href={inside.cta.href} className="holo-btn">{inside.cta.label}</a>
      </Reveal>
      <ul className={styles.reels}>
        {inside.tiles.map((t, i) => (
          <li key={t.src + i}>
            <a href="#contact">
              <Image src={t.src} alt="" fill sizes="(max-width: 599px) 33vw, 240px" />
              <span className={styles.tileLabel}>{t.alt}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
