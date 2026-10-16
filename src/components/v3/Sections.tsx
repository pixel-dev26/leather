"use client";

import { useState } from "react";
import { bestsellers, collections, discover, leathers, process, type Link } from "@/content/home-v3";
import { CategoryCard, CollectionCard, ProductCard } from "./Cards";
import Rail from "./Rail";

/** Row heading: title left, "View All" right (v3rule.md §4A). */
export function Head({ id, title, link, slider }: { id: string; title: string; link?: Link; slider?: boolean }) {
  return (
    <div className={`v3-head ${slider ? "v3-head--slider" : ""}`}>
      <h2 id={id}>{title}</h2>
      {link && (
        <a href={link.href} className="v3-viewall">
          {link.label}
        </a>
      )}
    </div>
  );
}

/** Tab pills (v3rule.md §7): black active pill, outlined inactive pills. */
function Tabs({ labels, active, onChange, slider, label }: { labels: readonly string[]; active: number; onChange: (i: number) => void; slider?: boolean; label: string }) {
  return (
    <div className="v3-tabs" role="tablist" aria-label={label} style={slider ? { paddingInline: "var(--gutter-slider)" } : undefined}>
      {labels.map((t, i) => (
        <button key={t} role="tab" aria-selected={i === active} className="v3-tab" onClick={() => onChange(i)}>
          {t}
        </button>
      ))}
    </div>
  );
}

/** §10 row 5, Our leathers: DailyObjects "Shop by category" (heading, tab pills, four 4:5 cards). */
export function Leathers() {
  const [tab, setTab] = useState(0);
  const current = leathers.tabs[tab];
  return (
    <section id="leathers" aria-labelledby="leathers-h">
      <Head id="leathers-h" title={leathers.title} link={leathers.link} />
      <Tabs labels={leathers.tabs.map((t) => t.label)} active={tab} onChange={setTab} label="Leather categories" />
      <Rail key={current.label} perView={[4, 2.6, 1.4]} ratio={1.25} label={current.label}>
        {current.items.map((item) => (
          <CategoryCard key={item.name} {...item} />
        ))}
      </Rail>
    </section>
  );
}

/** §10 row 6, Bestsellers: DailyObjects "New in" slider with tab pills and grid-card prices. */
export function Bestsellers() {
  const [tab, setTab] = useState(0);
  const filter = bestsellers.tabs[tab];
  const items = filter === "All" ? bestsellers.items : bestsellers.items.filter((p) => p.category === filter);
  return (
    <section id="bestsellers" aria-labelledby="bestsellers-h">
      <Head id="bestsellers-h" title={bestsellers.title} link={bestsellers.link} slider />
      <Tabs labels={bestsellers.tabs} active={tab} onChange={setTab} slider label="Product categories" />
      <Rail key={filter} perView={[3, 2.4, 1.9]} ratio={1} gutter="slider" label={`${filter} bestsellers`}>
        {items.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </Rail>
    </section>
  );
}

/** §10 row 7, Discover: three DailyObjects "Trending collection" cards. */
export function Discover() {
  return (
    <section id="discover" aria-labelledby="discover-h">
      <Head id="discover-h" title={discover.title} link={discover.link} />
      <Rail perView={[3, 2.2, 1.2]} ratio={1.5} gap={24} label="Discover Morucha">
        {discover.items.map((s) => (
          <CollectionCard key={s.title} {...s} />
        ))}
      </Rail>
    </section>
  );
}

/** §10 row 10, The process: the "New in" slider pattern, one 1:1 card per step. */
export function Process() {
  return (
    <section id="process" aria-labelledby="process-h">
      <Head id="process-h" title={process.title} link={process.link} slider />
      <Rail perView={[3, 2.4, 1.9]} ratio={1} gutter="slider" label="Process steps">
        {process.steps.map((s) => (
          <ProductCard key={s.name} p={s} showPrice={false} />
        ))}
      </Rail>
    </section>
  );
}

/** §10 row 11, Collections: four collection cards, three in view. */
export function Collections() {
  return (
    <section id="collections" aria-labelledby="collections-h">
      <Head id="collections-h" title={collections.title} link={collections.link} />
      <Rail perView={[3, 2.2, 1.2]} ratio={1.5} gap={24} label="Collections">
        {collections.items.map((s) => (
          <CollectionCard key={s.title} {...s} />
        ))}
      </Rail>
    </section>
  );
}
