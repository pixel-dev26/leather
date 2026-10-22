"use client";

// Bucherer's header: menu button and logo on the left, an underlined search field in the middle that suggests
// products as you type, and account, wishlist and bag on the right. The menu slides in from the left, with a second
// panel for each section. A slim grey service line sits above it (Morucha's live announcement bar).
import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties } from "react";
import type { MenuItem } from "@/content/home-v7";
import { WISHLIST_EVENT } from "./Motion";
import { Arrow, Bag, Chevron, Close, Heart, Menu, Search, User } from "./Icons";
import styles from "./Header.module.css";

export type SearchItem = { handle: string; title: string; subtitle: string; price: string; image: string; terms: string };

const popular = ["RFID wallet", "Hunter leather", "Clutch", "Card holder", "Coin pocket"];

type Props = { announcement: string; menu: MenuItem[]; search: SearchItem[] };

export default function Header({ announcement, menu, search }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false); // phones and tablets: the field drops down under the bar
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [saved, setSaved] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onSave = (e: Event) => setSaved((n) => Math.max(0, n + ((e as CustomEvent<number>).detail ?? 1)));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(WISHLIST_EVENT, onSave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(WISHLIST_EVENT, onSave);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) closeRef.current?.focus();
    else setPanel(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setFocused(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // close the suggestions when a click lands outside the search
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return search.filter((s) => words.every((w) => s.terms.includes(w))).slice(0, 6);
  }, [query, search]);

  const toggleSearch = () => {
    setSearchOpen((o) => !o);
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  // a result scrolls its card into view in the first rail that shows it (the rail scrolls sideways too)
  const pick = (handle: string) => {
    setFocused(false);
    setSearchOpen(false);
    setQuery("");
    const card = document.querySelector<HTMLElement>(`[data-handle="${handle}"]`);
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    card.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
  };

  return (
    <>
      <p className={styles.announce}>{announcement}</p>

      <header id="top" className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <button className={styles.icon} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Menu />
            </button>
            <a href="#top" className={styles.logo} aria-label="Morucha home">
              <Image src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} priority />
            </a>
          </div>

          <div ref={searchRef} className={`${styles.search} ${searchOpen ? styles.searchOpen : ""}`} role="search">
            <label className={styles.field}>
              <Search className={styles.fieldIcon} />
              <span className="v7-sr">Search the Morucha range</span>
              <input
                ref={inputRef}
                type="search"
                placeholder="Wallets, purses, card holders, …"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onKeyDown={(e) => { if (e.key === "Enter" && results[0]) pick(results[0].handle); }}
                role="combobox"
                aria-autocomplete="list"
                aria-controls={listId}
                aria-expanded={focused}
                autoComplete="off"
              />
            </label>
            <div id={listId} className={`${styles.suggest} ${focused ? styles.suggestOn : ""}`}>
              {query.trim() === "" ? (
                <>
                  <p className={styles.suggestTitle}>Popular searches</p>
                  <div className={styles.chips}>
                    {popular.map((p) => (
                      <button key={p} type="button" onClick={() => { setQuery(p); inputRef.current?.focus(); }}>{p}</button>
                    ))}
                  </div>
                </>
              ) : results.length ? (
                <>
                  <p className={styles.suggestTitle}>Products</p>
                  <ul className={styles.results}>
                    {results.map((r) => (
                      <li key={r.handle}>
                        <a href={`#${r.handle}`} onClick={(e) => { e.preventDefault(); pick(r.handle); }}>
                          <span className={styles.thumb}><Image src={r.image} alt="" width={120} height={120} /></span>
                          <span className={styles.resultText}>
                            <strong>{r.subtitle}</strong>
                            <span>{r.title}</span>
                          </span>
                          <span className={styles.resultPrice}>{r.price}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className={styles.empty}>No pieces match “{query.trim()}”. Try “wallet”, “purse” or “hunter”.</p>
              )}
            </div>
          </div>

          <div className={styles.tools}>
            <button className={`${styles.icon} ${styles.searchBtn}`} aria-label="Search" aria-expanded={searchOpen} onClick={toggleSearch}>
              {searchOpen ? <Close /> : <Search />}
            </button>
            <a href="#" className={`${styles.icon} ${styles.hideSm}`} aria-label="My account"><User /></a>
            <a href="#" className={styles.icon} aria-label={`Wishlist, ${saved} saved`}>
              <Heart />
              {saved > 0 && <span key={saved} className={styles.count} aria-hidden>{saved}</span>}
            </a>
            <a href="#" className={styles.icon} aria-label="Bag"><Bag /></a>
          </div>
        </div>
      </header>

      <div className={`${styles.drawer} ${open ? styles.open : ""}`} aria-hidden={!open} inert={!open} role="dialog" aria-label="Menu">
        <div className={styles.drawerTop}>
          <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.drawerLogo} />
          <button ref={closeRef} className={styles.icon} aria-label="Close menu" onClick={() => setOpen(false)}><Close /></button>
        </div>

        <div className={styles.levels}>
          <nav className={`${styles.level} ${panel !== null ? styles.levelAway : ""}`} aria-label="Main" inert={panel !== null}>
            <ul className={styles.mainList}>
              {menu.map((m, i) => (
                <li key={m.label} style={{ "--i": i } as CSSProperties}>
                  {m.links ? (
                    <button className={styles.mainItem} onClick={() => setPanel(i)} aria-expanded={panel === i}>
                      <span><strong>{m.label}</strong><small>{m.text}</small></span>
                      <Chevron />
                    </button>
                  ) : (
                    <a className={styles.mainItem} href={m.href} onClick={() => setOpen(false)}>
                      <span><strong>{m.label}</strong><small>{m.text}</small></span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className={styles.drawerFoot}>
              <a href="#"><User width={18} height={18} /> My account</a>
              <a href="mailto:sales@morucha.co.uk">sales@morucha.co.uk</a>
            </div>
          </nav>

          {menu.map((m, i) =>
            m.links ? (
              <div key={m.label} className={`${styles.level} ${styles.sub} ${panel === i ? styles.subOn : ""}`} inert={panel !== i}>
                <button className={styles.back} onClick={() => setPanel(null)}><Chevron dir="left" width={18} height={18} /> Back</button>
                <p className={styles.subTitle}>{m.label}</p>
                <ul className={styles.subList}>
                  {m.links.map((l) => (
                    <li key={l.label}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>
                  ))}
                </ul>
                {m.promo && (
                  <a className={styles.promo} href={m.promo.href} onClick={() => setOpen(false)}>
                    <span className={styles.promoMedia}><Image src={m.promo.image} alt={m.promo.alt} fill sizes="380px" /></span>
                    <span className="v7-link">{m.promo.title} <Arrow /></span>
                  </a>
                )}
              </div>
            ) : null,
          )}
        </div>
      </div>
      <button className={`${styles.scrim} ${open ? styles.open : ""}`} aria-hidden tabIndex={-1} onClick={() => setOpen(false)} />
    </>
  );
}
