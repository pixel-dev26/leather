"use client";

import { useRef, useState, type FormEvent } from "react";
import { withBase } from "@/lib/image-loader";
import { DrawGroup, Drawn } from "./Drawn";
import SectionHead from "./SectionHead";
import styles from "./Media.module.css";

type FilmProps = { src: string; poster: string; eyebrow: string; title: string; facts: { title: string; text: string }[]; cta: string };

/** v11rule.md §6 film: Morucha's portrait clip in a portrait frame on an ink band, beside three numbered facts. */
export function Film({ src, poster, eyebrow, title, facts, cta }: FilmProps) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const play = () => {
    setPlaying(true);
    ref.current?.play().catch(() => setPlaying(false));
  };
  return (
    <section className={styles.film} aria-labelledby="v11-film">
      <div className={`v11-wrap ${styles.filmInner}`}>
        <div className={styles.frame}>
          <video ref={ref} src={withBase(src)} poster={withBase(poster)} preload="none" playsInline controls={playing} onEnded={() => setPlaying(false)} />
          {!playing && <button className={styles.play} onClick={play} aria-label={`Play film: ${title}`} />}
        </div>
        <div className={styles.filmText}>
          <SectionHead eyebrow={eyebrow} title={title} id="v11-film" dark />
          <ol className={styles.facts}>
            {facts.map((f) => <li key={f.title}><b>{f.title}</b><span>{f.text}</span></li>)}
          </ol>
          <a href="#bestsellers" className="v11-link">{cta}</a>
        </div>
      </div>
    </section>
  );
}

/** v11rule.md §6 newsletter: light and centred, a drawn envelope, one underlined field; a thank-you replaces it. */
export function Newsletter({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section className="v11-wrap" aria-labelledby="v11-news">
      <DrawGroup className={styles.news} data-redraw>
        <Drawn name="mail" size={44} />
        <SectionHead eyebrow={eyebrow} title={title} id="v11-news" sub={text} center />
        <p className={styles.tbc}><span className="tbc">Discount [TBC]</span></p>
        {sent ? (
          <p className={styles.thanks} role="status">Thank you. Look out for our next email.</p>
        ) : (
          <form onSubmit={submit} className={styles.form}>
            <label htmlFor="v11-email" className="v11-sr">Email address</label>
            <input id="v11-email" type="email" required placeholder="Email address" autoComplete="email" />
            <button type="submit">Subscribe</button>
          </form>
        )}
        <p className={styles.small}>By subscribing you agree to receive marketing emails. Unsubscribe at any time.</p>
      </DrawGroup>
    </section>
  );
}
