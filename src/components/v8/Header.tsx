"use client";

// A sand announcement bar that cycles two messages, over a header that sits clear on top of the hero (white text)
// and turns solid once the page scrolls, the pointer is over it, or a menu is open. Men, Women, Explore and Gifts
// open a full-width mega menu with link columns and a photo card; the page behind dims. Under 1024px the nav moves
// into a drawer with the same columns as accordions.
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { NavItem } from "@/content/home-v8";
import { Bag, Chevron, Close, Menu, Search, UkFlag } from "./Icons";
import styles from "./Header.module.css";

type Props = {
  announcements: { text: string; href: string }[];
  utility: { label: string; href: string }[];
  nav: NavItem[];
};

export default function Header({ announcements, utility, nav }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(false);
  const [mega, setMega] = useState<number | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [openGroup, setOpenGroup] = useState<number | null>(null);
  const [search, setSearch] = useState(false);
  const [msg, setMsg] = useState(0);
  const closeTimer = useRef<number>(0);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The bar swaps messages every 5s (not when the visitor prefers reduced motion)
  useEffect(() => {
    if (announcements.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setMsg((m) => (m + 1) % announcements.length), 5000);
    return () => window.clearInterval(id);
  }, [announcements.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMega(null);
      setDrawer(false);
      setSearch(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = drawer ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [drawer]);

  useEffect(() => { if (search) searchInput.current?.focus(); }, [search]);

  // A short grace period, so moving the pointer from a nav item down into its panel doesn't close it
  const openMega = (i: number | null) => { window.clearTimeout(closeTimer.current); setMega(i); };
  const closeMegaSoon = () => { closeTimer.current = window.setTimeout(() => setMega(null), 120); };

  const solid = scrolled || hover || mega !== null || search || drawer;
  const active = mega !== null ? nav[mega] : null;

  return (
    <>
      <div
        className={`${styles.top} ${solid ? styles.solid : ""}`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); closeMegaSoon(); }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(null); }}
      >
        <div className={styles.bar}>
          <div className={styles.messages} aria-live="polite">
            {announcements.map((a, i) => (
              <a key={a.text} href={a.href} className={`${styles.message} ${i === msg ? styles.messageOn : ""}`} aria-hidden={i !== msg} tabIndex={i === msg ? 0 : -1}>
                {a.text}
              </a>
            ))}
          </div>
          <nav className={styles.utility} aria-label="Help and account">
            {utility.map((u) => <a key={u.label} href={u.href}>{u.label}</a>)}
            <span className={styles.region}><UkFlag /> UK</span>
          </nav>
        </div>

        <header className={styles.header}>
          <a href="#top" className={styles.logo} aria-label="Morucha home">
            <Image src="/brand/morucha-logo-white.webp" alt="Morucha" width={667} height={256} priority />
          </a>

          <nav className={styles.nav} aria-label="Main">
            {nav.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                className={`${styles.navLink} ${n.accent ? styles.accent : ""} ${mega === i ? styles.navOn : ""}`}
                aria-haspopup={n.columns ? "true" : undefined}
                aria-expanded={n.columns ? mega === i : undefined}
                onMouseEnter={() => openMega(n.columns ? i : null)}
                onFocus={() => openMega(n.columns ? i : null)}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className={styles.tools}>
            <button aria-label={search ? "Close search" : "Search"} aria-expanded={search} onClick={() => { setSearch((s) => !s); setMega(null); }}>
              {search ? <Close /> : <Search />}
            </button>
            <a href="#bag" className={styles.bag} aria-label="Bag, 0 items"><Bag /><span aria-hidden>0</span></a>
            <button className={styles.burger} aria-label="Open menu" aria-expanded={drawer} onClick={() => setDrawer(true)}><Menu /></button>
          </div>
        </header>

        <form className={`${styles.search} ${search ? styles.searchOpen : ""}`} role="search" onSubmit={(e) => e.preventDefault()} inert={!search}>
          <Search />
          <label className="v8-sr" htmlFor="v8-search">Search</label>
          <input ref={searchInput} id="v8-search" type="search" placeholder="Search wallets, purses, card holders…" autoComplete="off" />
        </form>

        {/* one panel; its contents follow the hovered item */}
        <div
          className={`${styles.mega} ${active ? styles.megaOpen : ""}`}
          onMouseEnter={() => openMega(mega)}
          aria-hidden={!active}
          inert={!active}
        >
          {active?.columns && (
            <div key={active.label} className={styles.megaInner}>
              <div className={styles.megaCols}>
                {active.columns.map((c, ci) => (
                  <div key={c.title} className={styles.megaCol} style={{ "--i": ci } as CSSProperties}>
                    <p className={styles.megaTitle}>{c.title}</p>
                    <ul>
                      {c.links.map((l) => <li key={l.label}><a href={l.href} onClick={() => setMega(null)}>{l.label}</a></li>)}
                    </ul>
                  </div>
                ))}
              </div>
              {active.feature && (
                <a href={active.feature.href} className={styles.megaCard} onClick={() => setMega(null)}>
                  <Image src={active.feature.image} alt={active.feature.alt} fill sizes="280px" />
                  <span>{active.feature.caption}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {/* the header overlays the hero, so only the bar's height is reserved */}
      <div className={styles.spacer} id="top" />
      <button className={`${styles.dim} ${active ? styles.dimOn : ""}`} aria-hidden tabIndex={-1} onClick={() => setMega(null)} />

      <div className={`${styles.drawer} ${drawer ? styles.drawerOpen : ""}`} aria-hidden={!drawer} inert={!drawer} role="dialog" aria-label="Menu">
        <div className={styles.drawerTop}>
          <span className={styles.drawerLogo}><Image src="/brand/morucha-logo-white.webp" alt="" width={667} height={256} /></span>
          <button aria-label="Close menu" onClick={() => setDrawer(false)}><Close /></button>
        </div>
        <ul className={styles.drawerNav}>
          {nav.map((n, i) => (
            <li key={n.label}>
              {n.columns ? (
                <>
                  <button className={`${styles.drawerItem} ${n.accent ? styles.accent : ""}`} aria-expanded={openGroup === i} onClick={() => setOpenGroup(openGroup === i ? null : i)}>
                    {n.label}<Chevron />
                  </button>
                  <div className={`${styles.drawerGroup} ${openGroup === i ? styles.drawerGroupOpen : ""}`}>
                    <div>
                      {n.columns.map((c) => (
                        <div key={c.title}>
                          <p>{c.title}</p>
                          {c.links.map((l) => <a key={l.label} href={l.href} onClick={() => setDrawer(false)}>{l.label}</a>)}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a href={n.href} className={styles.drawerItem} onClick={() => setDrawer(false)}>{n.label}</a>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.drawerFoot}>
          {utility.map((u) => <a key={u.label} href={u.href}>{u.label}</a>)}
          <span><UkFlag /> United Kingdom (GBP £)</span>
        </div>
      </div>
    </>
  );
}
