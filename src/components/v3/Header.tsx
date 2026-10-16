"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADD_TO_BASKET_EVENT, nav, promo } from "@/content/home-v3";
import Icon from "./Icons";
import styles from "./Header.module.css";

/** v3rule.md §7: 80px white header with a hairline (not sticky), then the coral promo strip. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [basket, setBasket] = useState(0);

  useEffect(() => {
    const onAdd = (e: Event) => setBasket((n) => n + ((e as CustomEvent<number>).detail || 1));
    window.addEventListener(ADD_TO_BASKET_EVENT, onAdd);
    return () => window.removeEventListener(ADD_TO_BASKET_EVENT, onAdd);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.mobileLeft}>
            <button className={styles.iconBtn} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
              <Icon name="menu" />
            </button>
            <button className={styles.iconBtn} aria-label="Search">
              <Icon name="search" />
            </button>
          </div>

          <Link href="/v3" className={styles.logo} aria-label="Morucha home">
            <Image src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} priority />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {nav.map((l) => (
              <a key={l.label} href={l.href} className={`${styles.link} ${l.accent ? styles.accent : ""}`}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className={styles.icons}>
            <button className={`${styles.iconBtn} ${styles.desktopOnly}`} aria-label="Search">
              <Icon name="search" size={20} />
            </button>
            <a href="#" className={styles.iconBtn} aria-label="Account">
              <Icon name="account" size={20} />
            </a>
            <a href="#" className={styles.iconBtn} aria-label={`Basket, ${basket} ${basket === 1 ? "item" : "items"}`}>
              <Icon name="basket" size={20} />
              {basket > 0 && (
                <span key={basket} className={styles.count} aria-hidden>
                  {basket}
                </span>
              )}
            </a>
          </div>
        </div>
      </header>

      <a href={promo.href} className={styles.strip}>
        <span className={styles.stripText}>{promo.text}</span>
        <span className={styles.pill}>{promo.pill}</span>
      </a>

      <div className={`${styles.scrim} ${open ? styles.scrimOn : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside className={`${styles.drawer} ${open ? styles.drawerOn : ""}`} aria-hidden={!open} aria-label="Menu">
        <div className={styles.drawerTop}>
          <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.drawerLogo} />
          <button className={styles.iconBtn} aria-label="Close menu" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            <Icon name="close" />
          </button>
        </div>
        {nav.map((l) => (
          <a key={l.label} href={l.href} className={styles.drawerLink} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
            <Icon name="chevronRight" size={18} />
          </a>
        ))}
      </aside>
    </>
  );
}
