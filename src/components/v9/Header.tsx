"use client";

// Rapha's header: capitals nav on the left, the logo in the middle, search, account and bag on the right, sticky on a
// white bar. Nav items with columns open a Finisterre-style mega menu across the page (links plus a photo card),
// after a short hover delay so passing over them doesn't flicker. Search opens a panel under the bar that suggests
// products as you type. The bag counts quick adds from the product cards and confirms each one with a short note.
// Phones get a drawer with the same sections as accordions.
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { NavItem } from "@/content/home-v9";
import { ADD_TO_BAG_EVENT } from "./Motion";
import { Bag, Check, Chevron, Close, Menu, Search, User } from "./Icons";
import styles from "./Header.module.css";

export type SearchItem = { handle: string; name: string; leather: string; price: string; image: string; terms: string };

export default function Header({ nav, search }: { nav: NavItem[]; search: SearchItem[] }) {
  const [open, setOpen] = useState<number | null>(null); // the mega menu showing
  const [drawer, setDrawer] = useState(false);
  const [section, setSection] = useState<number | null>(null); // the drawer's open accordion
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [bag, setBag] = useState(0);
  const [added, setAdded] = useState<string | null>(null);
  const timer = useRef<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // hover intent: open after a beat, switch instantly once one is open, close after a beat
  const hoverOpen = (i: number) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(i), open === null ? 120 : 0);
  };
  const hoverClose = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 180);
  };

  useEffect(() => {
    let hide = 0;
    const onAdd = (e: Event) => {
      setBag((n) => n + 1);
      setAdded((e as CustomEvent<string>).detail);
      window.clearTimeout(hide);
      hide = window.setTimeout(() => setAdded(null), 2600);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(null);
      setSearching(false);
      setDrawer(false);
    };
    window.addEventListener(ADD_TO_BAG_EVENT, onAdd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(hide);
      window.removeEventListener(ADD_TO_BAG_EVENT, onAdd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
  }, [drawer]);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return words.length ? search.filter((s) => words.every((w) => s.terms.includes(w))).slice(0, 4) : [];
  }, [query, search]);

  const openSearch = () => {
    setOpen(null);
    setSearching((s) => !s);
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  const jump = (handle: string) => {
    setSearching(false);
    setQuery("");
    const card = document.querySelector<HTMLElement>(`[data-handle="${handle}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    card?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
  };

  return (
    <header id="top" className={styles.header} onMouseLeave={hoverClose}>
      <div className={styles.bar}>
        <button className={`${styles.icon} ${styles.burger}`} aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}>
          <Menu />
        </button>

        <nav className={styles.nav} aria-label="Main">
          <ul>
            {nav.map((n, i) => (
              <li key={n.label} onMouseEnter={() => (n.columns ? hoverOpen(i) : hoverClose())}>
                <a
                  href={n.href}
                  className={`v9-label ${styles.navLink} ${open === i ? styles.navOn : ""}`}
                  aria-expanded={n.columns ? open === i : undefined}
                  aria-haspopup={n.columns ? "true" : undefined}
                  onFocus={() => setOpen(n.columns ? i : null)}
                  onClick={() => setOpen(null)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#top" className={styles.logo} aria-label="Morucha home">
          <Image src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} priority />
        </a>

        <div className={styles.tools}>
          <button className={styles.icon} aria-label="Search" aria-expanded={searching} onClick={openSearch}>{searching ? <Close /> : <Search />}</button>
          <a href="#" className={`${styles.icon} ${styles.hideSm}`} aria-label="My account"><User /></a>
          <a href="#" className={styles.icon} aria-label={`Bag, ${bag} item${bag === 1 ? "" : "s"}`}>
            <Bag />
            {bag > 0 && <span key={bag} className={styles.count} aria-hidden>{bag}</span>}
          </a>
        </div>
      </div>

      {/* mega menus */}
      {nav.map((n, i) =>
        n.columns ? (
          <div
            key={n.label}
            className={`${styles.mega} ${open === i ? styles.megaOn : ""}`}
            onMouseEnter={() => window.clearTimeout(timer.current)}
            inert={open !== i}
            aria-hidden={open !== i}
          >
            <div className={`v9-wrap ${styles.megaInner}`}>
              {n.columns.map((c) => (
                <div key={c.title} className={styles.megaCol}>
                  <p className="v9-eyebrow">{c.title}</p>
                  <ul>
                    {c.links.map((l) => (
                      <li key={l.label}><a href={l.href} onClick={() => setOpen(null)}>{l.label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
              {n.feature && (
                <a className={styles.megaFeature} href={n.feature.href} onClick={() => setOpen(null)}>
                  <span className={styles.megaMedia}><Image src={n.feature.image} alt={n.feature.alt} fill sizes="420px" /></span>
                  <span className="v9-label">{n.feature.title}</span>
                </a>
              )}
            </div>
          </div>
        ) : null,
      )}
      <div className={`${styles.shade} ${open !== null ? styles.shadeOn : ""}`} aria-hidden onMouseEnter={hoverClose} />

      {/* search panel */}
      <div className={`${styles.search} ${searching ? styles.searchOn : ""}`} inert={!searching} role="search">
        <div className="v9-wrap">
          <label className={styles.field}>
            <Search />
            <span className="v9-sr">Search the Morucha range</span>
            <input ref={inputRef} type="search" placeholder="Search wallets, purses, card holders" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && results[0]) jump(results[0].handle); }} autoComplete="off" />
          </label>
          {query.trim() !== "" && (
            results.length ? (
              <ul className={styles.results}>
                {results.map((r) => (
                  <li key={r.handle}>
                    <a href={`#${r.handle}`} onClick={(e) => { e.preventDefault(); jump(r.handle); }}>
                      <span className={styles.thumb}><Image src={r.image} alt="" width={160} height={160} /></span>
                      <span className="v9-label">{r.name}</span>
                      <span className={styles.resultMeta}>{r.leather} · {r.price}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>Nothing matches “{query.trim()}”. Try wallet, purse or hunter.</p>
            )
          )}
        </div>
      </div>

      {/* added-to-bag note */}
      <p className={`${styles.added} ${added ? styles.addedOn : ""}`} role="status" aria-live="polite">
        {added && <><Check /> <span><strong className="v9-label">Added to bag</strong>{added}</span></>}
      </p>

      {/* phone drawer */}
      <div className={`${styles.drawer} ${drawer ? styles.drawerOn : ""}`} inert={!drawer} aria-hidden={!drawer} role="dialog" aria-label="Menu">
        <div className={styles.drawerTop}>
          <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.drawerLogo} />
          <button className={styles.icon} aria-label="Close menu" onClick={() => setDrawer(false)}><Close /></button>
        </div>
        <ul className={styles.drawerList}>
          {nav.map((n, i) => (
            <li key={n.label} style={{ "--i": i } as CSSProperties}>
              {n.columns ? (
                <>
                  <button className={`v9-caps ${styles.drawerItem}`} aria-expanded={section === i} onClick={() => setSection(section === i ? null : i)}>
                    {n.label}<Chevron />
                  </button>
                  <div className={`${styles.acc} ${section === i ? styles.accOn : ""}`}>
                    <ul>
                      {n.columns.flatMap((c) => c.links).map((l) => (
                        <li key={l.label}><a href={l.href} onClick={() => setDrawer(false)}>{l.label}</a></li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <a className={`v9-caps ${styles.drawerItem}`} href={n.href} onClick={() => setDrawer(false)}>{n.label}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button className={`${styles.scrim} ${drawer ? styles.scrimOn : ""}`} aria-hidden tabIndex={-1} onClick={() => setDrawer(false)} />
    </header>
  );
}
