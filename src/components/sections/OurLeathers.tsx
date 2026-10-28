"use client";

import { useState } from "react";
import { newEdit, type EditItem } from "@/content/home";
import Photo from "@/components/ui/Photo";
import { rich } from "@/components/ui/rich";
import styles from "./OurLeathers.module.css";

/** One product card: sand tile, colour dots that swap the photo, quick-add bar on hover. */
function EditCard({ item }: { item: EditItem }) {
  const [picked, setPicked] = useState(0);
  const colour = item.colours[picked];
  const extra = item.colours.length - 4;

  return (
    <li className={styles.card}>
      <a href="#" className={styles.media}>
        {item.colours.map((c, i) => (
          <Photo key={c.name} {...c.image} sizes="(max-width: 767px) 50vw, 20vw" className={`${styles.photo} ${i === picked ? styles.photoOn : ""}`} />
        ))}
        {item.tag && <span className={styles.tag}>{item.tag}</span>}
        <span className={styles.quick}>Quick add · {colour.name}</span>
      </a>
      <div className={styles.text}>
        {item.colours.length > 1 && (
          <div className={styles.swatches} role="radiogroup" aria-label={`${item.name} colour`}>
            {item.colours.slice(0, 4).map((c, i) => (
              <button
                key={c.name}
                role="radio"
                aria-checked={i === picked}
                aria-label={c.name}
                title={c.name}
                className={i === picked ? styles.swatchOn : ""}
                style={{ background: c.swatch }}
                onClick={() => setPicked(i)}
                onMouseEnter={() => setPicked(i)}
              />
            ))}
            {extra > 0 && <span className={styles.more}>+{extra}</span>}
          </div>
        )}
        <a href="#" className={styles.name}>{item.name}</a>
        <p className={styles.meta}>
          {item.meta}
          {item.colours.length === 1 && ` · ${colour.name}`}
        </p>
        <p className={styles.price}>{item.price}</p>
      </div>
    </li>
  );
}

/** "The New Edit" (Smythson / Bellroy / Coach / Mismo): filter pills, a wide campaign tile, then three product cards. */
export default function OurLeathers() {
  const [tab, setTab] = useState<(typeof newEdit.tabs)[number]>("All");
  const items = newEdit.items.filter((p) => tab === "All" || p.category === tab).slice(0, 3);
  const { campaign } = newEdit;

  return (
    <section id="leathers" className={`bg-paper-light ${styles.edit}`} aria-label="The New Edit">
      <div className={styles.head}>
        <div>
          <p className={styles.label}>{newEdit.label}</p>
          <h2 className={styles.title}>{rich(newEdit.title)}</h2>
        </div>
        <div className={styles.actions}>
          <div className={styles.tabs} role="tablist" aria-label="Filter new arrivals">
            {newEdit.tabs.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? styles.tabOn : ""} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
          <a href={newEdit.link.href} className={styles.all}>
            {newEdit.link.label}
          </a>
        </div>
      </div>

      <ul className={styles.grid}>
        <li className={styles.campaign}>
          <a href={campaign.link.href} className="hover-zoom">
            <Photo {...campaign.image} sizes="(max-width: 1023px) 100vw, 40vw" />
            <span className={styles.shade} aria-hidden />
            <span className={styles.story}>
              <span className={styles.storyLabel}>{campaign.label}</span>
              <span className={styles.storyTitle}>{rich(campaign.title)}</span>
              <span className={styles.storyLink}>{campaign.link.label}</span>
            </span>
          </a>
        </li>
        {items.map((item) => (
          <EditCard key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}
