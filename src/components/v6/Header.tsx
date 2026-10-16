"use client";

// One-line black announcement bar over a white sticky header that hides while scrolling down and comes back on
// the way up. The bag count goes up with every "Add to bag" on the page.
import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { ADD_TO_BAG_EVENT } from "./events";
import { Bag, Close, Heart, Menu, Search, User } from "./Icons";
import styles from "./Header.module.css";

type Props = { announcement: string; nav: { label: string; href: string }[] };

export default function Header({ announcement, nav }: Props) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 480 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    const onAdd = (e: Event) => {
      setBag((n) => n + ((e as CustomEvent<number>).detail ?? 1));
      setBump((n) => n + 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(ADD_TO_BAG_EVENT, onAdd);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(ADD_TO_BAG_EVENT, onAdd);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <p className={styles.announce}>{announcement}</p>

      <header className={`${styles.header} ${hidden && !open ? styles.hidden : ""} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <button className={styles.burger} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Menu />
          </button>
          <a href="#top" className={styles.logo} aria-label="Morucha home">
            <Image src="/brand/morucha-logo.png" alt="Morucha" width={667} height={256} priority />
          </a>
          <nav className={styles.nav} aria-label="Main">
            {nav.map((n) => (
              <a key={n.label} href={n.href}><span>{n.label}</span></a>
            ))}
          </nav>
          <div className={styles.tools}>
            <button aria-label="Search" className={styles.hideSm}><Search /></button>
            <button aria-label="Account" className={styles.hideSm}><User /></button>
            <button aria-label="Wishlist" className={styles.hideSm}><Heart /></button>
            <a href="#shop" className={styles.bag} aria-label={`Bag, ${bag} item${bag === 1 ? "" : "s"}`}>
              <Bag />
              <span key={bump} className={`${styles.count} ${bump ? styles.bump : ""}`} aria-hidden>{bag}</span>
            </a>
          </div>
        </div>
      </header>

      <div className={`${styles.drawer} ${open ? styles.open : ""}`} aria-hidden={!open} inert={!open}>
        <div className={styles.drawerTop}>
          <Image src="/brand/morucha-logo.png" alt="" width={667} height={256} className={styles.drawerLogo} />
          <button aria-label="Close menu" onClick={() => setOpen(false)}><Close /></button>
        </div>
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <a key={n.label} href={n.href} onClick={() => setOpen(false)} style={{ "--i": i } as CSSProperties}>{n.label}</a>
          ))}
        </nav>
        <p className={styles.drawerNote}>{announcement}</p>
      </div>
      <button className={`${styles.scrim} ${open ? styles.open : ""}`} aria-hidden tabIndex={-1} onClick={() => setOpen(false)} />
    </>
  );
}
