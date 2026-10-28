"use client";

import { useMemo, useState } from "react";
import type { Card, Leather, Style } from "@/content/home-v11";
import Icon from "./Icons";
import ProductCard from "./ProductCard";
import SectionHead from "./SectionHead";
import styles from "./Finder.module.css";

type Who = Card["who"] | "any";
const whoOptions: { value: Who; label: string }[] = [
  { value: "him", label: "For him" },
  { value: "her", label: "For her" },
  { value: "any", label: "Either" },
];
const leatherLabel: Record<Leather, string> = { soft: "Soft leather", nappa: "Nappa", hunter: "Hunter leather" };
const styleOrder: Style[] = ["bifold", "trifold", "passcase", "billfold", "slim", "card holder", "biker", "clutch", "purse"];

/**
 * v11rule.md §6 wallet finder (in place of the reference's device finder): who it's for → style → leather.
 * Each answer narrows the store's own products, and the matches show under the steps as it goes.
 */
export default function Finder({ cards, eyebrow, title, text }: { cards: Card[]; eyebrow: string; title: string; text: string }) {
  const [who, setWho] = useState<Who | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [leather, setLeather] = useState<Leather | null>(null);

  const byWho = useMemo(() => cards.filter((c) => !who || who === "any" || c.who === who), [cards, who]);
  const byStyle = useMemo(() => byWho.filter((c) => !style || c.style === style), [byWho, style]);
  const results = useMemo(() => byStyle.filter((c) => !leather || c.leather === leather), [byStyle, leather]);
  const styles_ = styleOrder.filter((s) => byWho.some((c) => c.style === s));
  const leathers = (["soft", "nappa", "hunter"] as Leather[]).filter((l) => byStyle.some((c) => c.leather === l));

  const step = who === null ? 0 : style === null ? 1 : leather === null ? 2 : 3;
  const reset = (to: 0 | 1 | 2) => {
    if (to === 0) setWho(null);
    if (to <= 1) setStyle(null);
    setLeather(null);
  };
  const labels = ["Who it’s for", "Style", "Leather"];
  const answers = [whoOptions.find((o) => o.value === who)?.label, style && style[0].toUpperCase() + style.slice(1), leather && leatherLabel[leather]];

  return (
    <section id="finder" className={styles.finder} aria-labelledby="v11-finder">
      <div className="v11-wrap">
        <SectionHead eyebrow={eyebrow} title={title} sub={text} id="v11-finder" dark />

        <ol className={styles.steps}>
          {labels.map((l, i) => (
            <li key={l} className={i === step ? styles.on : i < step ? styles.done : undefined}>
              <button disabled={i >= step} onClick={() => reset(i as 0 | 1 | 2)} aria-label={i < step ? `Change ${l.toLowerCase()}` : undefined}>
                <i>{i < step ? <Icon name="check" size={12} /> : i + 1}</i>
                {l}{i < step && answers[i] ? ` · ${answers[i]}` : ""}
              </button>
            </li>
          ))}
        </ol>

        {step < 3 && (
          <div className={styles.question}>
            <h3>{step === 0 ? "Who is it for?" : step === 1 ? "Choose a style" : "Choose a leather"}</h3>
            <div className={styles.opts}>
              {step === 0 && whoOptions.map((o) => <button key={o.value} onClick={() => setWho(o.value)}>{o.label}</button>)}
              {step === 1 && styles_.map((s) => <button key={s} onClick={() => setStyle(s)}>{s}</button>)}
              {step === 2 && leathers.map((l) => <button key={l} onClick={() => setLeather(l)}>{leatherLabel[l]}</button>)}
            </div>
          </div>
        )}

        <div className={styles.results}>
          <p aria-live="polite">
            {step === 3 ? `${results.length} ${results.length === 1 ? "wallet matches" : "wallets match"}` : `${results.length} to choose from so far`}
            {step > 0 && <button onClick={() => reset(0)}>Start again</button>}
          </p>
          <ul>
            {results.slice(0, 4).map((c) => <li key={c.handle}><ProductCard card={c} /></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
