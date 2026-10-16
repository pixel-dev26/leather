"use client";

// Product sections:
//   ProductRail  "New drops": tab chips over a scrolling row of products, with arrows and a progress line.
//   ShopAll      every product in the store: filter chips with counts, sorting, and "Show more" in pages of 12.
//                Links like #shop/men (header, category tiles) open it with that filter.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { V6Product } from "@/content/home-v6";
import { Arrow, Chevron } from "./Icons";
import { SplitText } from "./Motion";
import ProductCard from "./ProductCard";
import styles from "./Products.module.css";

type RailProps = { title: string; tabs: { label: string; items: V6Product[] }[] };

export function ProductRail(rail: RailProps) {
  const [tab, setTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const track = useRef<HTMLDivElement>(null);
  const items = rail.tabs[tab].items;

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setEdges({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.scrollLeft = 0;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [tab, measure]);

  const page = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("article");
    if (!el || !card) return;
    const step = card.getBoundingClientRect().width + 16;
    el.scrollBy({ left: dir * step * Math.max(1, Math.floor(el.clientWidth / step)), behavior: "smooth" });
  };

  return (
    <section id="new" className={`v6-section ${styles.railSection}`} aria-labelledby="rail-title">
      <div className="v6-wrap">
        <div className="v6-head">
          <SplitText as="h2" id="rail-title" text={rail.title} className="v6-display v6-h2" />
          <div className={styles.chips} role="tablist" aria-label="Product groups">
            {rail.tabs.map((t, i) => (
              <button key={t.label} role="tab" aria-selected={i === tab} className={styles.chip} onClick={() => setTab(i)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={track} className={styles.track} role="tabpanel" aria-label={`${rail.tabs[tab].label} products`}>
        {items.map((p, i) => (
          <ProductCard key={`${tab}-${p.handle}`} p={p} index={i} sizes="(max-width: 600px) 72vw, 340px" />
        ))}
      </div>

      <div className={`v6-wrap ${styles.railFoot}`}>
        <span className={styles.progress} aria-hidden><span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} /></span>
        <div className={styles.arrows}>
          <button onClick={() => page(-1)} disabled={edges.start} aria-label="Previous products"><Chevron dir="left" /></button>
          <button onClick={() => page(1)} disabled={edges.end} aria-label="Next products"><Chevron /></button>
        </div>
      </div>
    </section>
  );
}

const tests: Record<string, (p: V6Product) => boolean> = {
  all: () => true,
  men: (p) => p.men,
  women: (p) => p.women,
  wallets: (p) => p.kind === "Wallets",
  "card-holders": (p) => p.kind === "Card holders",
  hunter: (p) => p.hunter,
};

type SortKey = "featured" | "newest" | "price-asc" | "price-desc";
const sorters: Record<SortKey, (a: V6Product, b: V6Product) => number> = {
  featured: (a, b) => a.order - b.order,
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt) || a.order - b.order,
  "price-asc": (a, b) => a.priceValue - b.priceValue || a.order - b.order,
  "price-desc": (a, b) => b.priceValue - a.priceValue || a.order - b.order,
};

type ShopProps = {
  title: string;
  products: V6Product[];
  filters: { key: string; label: string }[];
  sorts: { key: SortKey; label: string }[];
  pageSize: number;
};

export function ShopAll({ products: catalogue, ...shopAll }: ShopProps) {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [shown, setShown] = useState(shopAll.pageSize);
  const section = useRef<HTMLElement>(null);

  const counts = useMemo(() => Object.fromEntries(shopAll.filters.map((f) => [f.key, catalogue.filter(tests[f.key] ?? tests.all).length])), [catalogue, shopAll.filters]);
  const list = useMemo(() => catalogue.filter(tests[filter] ?? tests.all).sort(sorters[sort]), [catalogue, filter, sort]);

  // #shop/<filter> links from the header and the category tiles
  useEffect(() => {
    const open = () => {
      const m = /^#shop(?:\/([\w-]+))?$/.exec(window.location.hash);
      if (!m) return;
      if (m[1] && m[1] in tests) {
        setFilter(m[1]);
        setShown(shopAll.pageSize);
      }
      section.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, [shopAll.pageSize]);

  const pick = (key: string) => {
    setFilter(key);
    setShown(shopAll.pageSize);
    history.replaceState(null, "", key === "all" ? "#shop" : `#shop/${key}`);
  };

  return (
    <section id="shop" ref={section} className={`v6-section ${styles.shop}`} aria-labelledby="shop-title">
      <div className="v6-wrap">
        <div className="v6-head">
          <SplitText as="h2" id="shop-title" text={shopAll.title} className="v6-display v6-h2" />
          <p className={styles.total} aria-live="polite">{list.length} products</p>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.chips} role="group" aria-label="Filter products">
            {shopAll.filters.map((f) => (
              <button key={f.key} aria-pressed={f.key === filter} className={styles.chip} onClick={() => pick(f.key)}>
                {f.label}<span className={styles.chipCount}>{counts[f.key]}</span>
              </button>
            ))}
          </div>
          <label className={styles.sort}>
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
              {shopAll.sorts.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </label>
        </div>

        <div className={styles.grid} key={`${filter}-${sort}`}>
          {list.slice(0, shown).map((p, i) => (
            <ProductCard key={p.handle} p={p} index={i % shopAll.pageSize} sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" />
          ))}
        </div>

        <div className={styles.more}>
          <p>Showing {Math.min(shown, list.length)} of {list.length}</p>
          {shown < list.length && (
            <button className="v6-btn" onClick={() => setShown((n) => n + shopAll.pageSize)}>Show more<Arrow /></button>
          )}
        </div>
      </div>
    </section>
  );
}
