import Image from "next/image";
import { makers } from "@/content/home-v3";
import styles from "./Makers.module.css";

/** v3rule.md §7 Instagram marquee ("Everyday inspiration"): centred heading, square tiles scrolling left. */
export default function Makers() {
  const loop = [...makers.images, ...makers.images];
  return (
    <section id="makers" className={styles.makers} aria-labelledby="makers-h">
      <h2 id="makers-h">{makers.title}</h2>
      <p>{makers.text}</p>
      <div className={styles.viewport}>
        <ul className={styles.track} style={{ animationDuration: `${makers.images.length * 9}s` }}>
          {loop.map((src, i) => (
            <li key={i} aria-hidden={i >= makers.images.length}>
              <a href={makers.href} className={styles.tile} tabIndex={i >= makers.images.length ? -1 : 0} aria-label={`Instagram post ${(i % makers.images.length) + 1}`}>
                <Image src={src} alt="" fill sizes="(max-width: 599px) 45vw, 353px" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
