"use client";

// Bucherer's "A World of Bucherer": half-and-half rows, a photo on the left and a pale panel on the right with a
// title, a short text, a smaller photo or two products and a black button. On larger screens the chapters stack:
// each sticks under the header and the next slides up over it. A vertical index (01 · 02 LEATHERS · 03) stays at
// the right edge, naming the chapter in view. The third chapter's colour swatches switch the M-2028 photos.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { V7Product } from "@/content/home-v7";
import styles from "./Story.module.css";

type Base = { id: string; index: string; title: string; text: string; cta: { label: string; href: string } };
type Chapter = Base & {
  image?: string;
  alt?: string;
  inset?: { image: string; alt: string };
  products?: V7Product[];
  product?: V7Product;
  colours?: { name: string; swatch: string; image: string; inset: string }[];
};

export default function Story({ eyebrow, chapters }: { eyebrow: string; chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const [colour, setColour] = useState(0);
  const rows = useRef<(HTMLDivElement | null)[]>([]);

  // Once a frame at most while scrolling: each chapter's --cover (how far the next one has slid over it, 0 as the next
  // enters at the bottom of the screen, 1 once it is stuck on top) and the chapter the index names (the last one whose
  // top has passed the middle of the screen; stuck chapters keep their top, so this works stacked or not).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = rows.current.filter((r): r is HTMLDivElement => !!r);
      if (!els.length) return;
      const vh = window.innerHeight;
      const style = getComputedStyle(els[0]);
      const stacking = style.position === "sticky";
      const stuckAt = stacking ? parseFloat(style.top) || 0 : 0;
      let current = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= vh / 2) current = i;
        const next = els[i + 1];
        const cover = stacking && next ? Math.min(1, Math.max(0, (vh - next.getBoundingClientRect().top) / (vh - stuckAt))) : 0;
        el.style.setProperty("--cover", cover.toFixed(3));
      });
      setActive(current);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <section id="story" className={styles.story} aria-label={eyebrow}>
      {chapters.map((c, i) => {
        const picked = c.colours?.[colour];
        return (
          <div key={c.id} id={`story-${c.id}`} ref={(el) => { rows.current[i] = el; }} className={styles.row}>
            <div className={`${styles.media} ${c.colours ? styles.mediaProduct : ""}`}>
              {/* every colourway's photo is already loaded and stacked, so a swatch cross-fades instead of reloading */}
              {c.colours ? (
                c.colours.map((k, ki) => (
                  <Image
                    key={k.name}
                    src={k.image}
                    alt={ki === colour ? `${c.product?.name} in ${k.name}` : ""}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={`${styles.productShot} ${ki === colour ? styles.shown : ""}`}
                  />
                ))
              ) : (
                c.image && <Image src={c.image} alt={c.alt ?? ""} fill sizes="(max-width: 900px) 100vw, 50vw" className={styles.photo} />
              )}
              {i === 0 && (
                <p className={styles.kicker}><span>01</span>{eyebrow}</p>
              )}
            </div>

            <div className={styles.panel}>
              <div className={styles.panelInner} data-reveal>
                <h2 className={styles.title}>{c.title}</h2>
                <p className={styles.text}>{c.text}</p>

                {c.inset && (
                  <div className={styles.inset}>
                    <Image src={c.inset.image} alt={c.inset.alt} fill sizes="(max-width: 900px) 80vw, 360px" />
                  </div>
                )}

                {c.products && (
                  <ul className={styles.pair}>
                    {c.products.map((p) => (
                      <li key={p.handle}>
                        <a href="#hunter">
                          <span className={styles.pairMedia}><Image src={p.image} alt={`${p.leather} ${p.name}`} fill sizes="200px" /></span>
                          <strong>{p.leather}</strong>
                          <span>{p.price}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {c.colours && picked && (
                  <div className={styles.colourways}>
                    <div className={styles.inset}>
                      {c.colours.map((k, ki) => (
                        <Image
                          key={k.name}
                          src={k.inset}
                          alt={ki === colour ? `${c.product?.name} in ${k.name}, another view` : ""}
                          fill
                          sizes="(max-width: 900px) 80vw, 360px"
                          className={`${styles.insetProduct} ${ki === colour ? styles.shown : ""}`}
                        />
                      ))}
                    </div>
                    <div className={styles.swatches} role="radiogroup" aria-label="Colourway">
                      {c.colours.map((k, ki) => (
                        <button
                          key={k.name}
                          role="radio"
                          aria-checked={ki === colour}
                          aria-label={k.name}
                          title={k.name}
                          className={`${styles.swatch} ${ki === colour ? styles.swatchOn : ""}`}
                          style={{ background: k.swatch }}
                          onClick={() => setColour(ki)}
                        />
                      ))}
                    </div>
                    <p className={styles.picked}>{picked.name} · {c.product?.price}</p>
                  </div>
                )}

                <a className="v7-btn" href={c.cta.href}>{c.cta.label}</a>
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles.indexRail} aria-hidden>
        <ol className={styles.index}>
          {chapters.map((c, i) => (
            <li key={c.id} className={i === active ? styles.indexOn : ""}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.indexLabel}>{c.index}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
