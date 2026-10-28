"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { announcements, logo, nav } from "@/content/home-hologramme";
import Icon from "./Icons";
import styles from "./Header.module.css";

/**
 * hologramme-rule.md §7: sage announcement bar with arrows, then a sticky header with a one-row serif nav, the logo centred
 * and animated icons (each has its own hover motion, a tooltip, and the heart toggles on click).
 */
export default function Header() {
  const [msg, setMsg] = useState(0);
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const step = (d: number) => setMsg((m) => (m + d + announcements.length) % announcements.length);

  useEffect(() => {
    const id = setInterval(() => step(1), 5000);
    return () => clearInterval(id);
  }, [msg]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className={styles.bar}>
        <button aria-label="Previous message" onClick={() => step(-1)}>
          <Icon name="chevronLeft" size={14} />
        </button>
        <p key={msg} className={styles.msg} aria-live="polite">
          {announcements[msg]}
        </p>
        <button aria-label="Next message" onClick={() => step(1)}>
          <Icon name="chevronRight" size={14} />
        </button>
      </div>

      <header className={styles.header}>
        <div className={styles.inner}>
          <button className={`${styles.iconBtn} ${styles.menuBtn}`} aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <Icon name="menu" size={22} />
          </button>

          <nav className={styles.nav} aria-label="Main">
            {nav.map((l) => (
              <a key={l.label} href={l.href} className={styles.link}>
                {l.pill && <span className={styles.pill}>{l.pill}</span>}
                {l.label}
              </a>
            ))}
          </nav>

          <Link href="/hologramme" className={styles.logo} aria-label="Hologramme Paris home">
            <Image src={logo.dark} alt="Hologramme Paris" width={logo.width} height={logo.height} priority unoptimized />
          </Link>

          <div className={styles.icons}>
            <span className={styles.currency}>EN · FR</span>
            <button className={`${styles.iconBtn} ${styles.desktopOnly} ${styles.search}`} aria-label="Search" data-tip="Search">
              <Icon name="search" size={19} />
            </button>
            <a href="#" className={`${styles.iconBtn} ${styles.desktopOnly} ${styles.account}`} aria-label="Log in or register" data-tip="Log in">
              <Icon name="account" size={19} />
            </a>
            <button className={`${styles.iconBtn} ${styles.desktopOnly} ${styles.heart} ${liked ? styles.liked : ""}`}
              aria-label="Wishlist" aria-pressed={liked} data-tip={liked ? "Saved" : "Wishlist"} onClick={() => setLiked((v) => !v)}>
              <Icon name="heart" size={19} />
              <span className={styles.burst} aria-hidden />
            </button>
            <a href="#" className={`${styles.iconBtn} ${styles.basket}`} aria-label="Basket" data-tip="Basket">
              <Icon name="basket" size={19} />
            </a>
          </div>
        </div>
      </header>

      <div className={`${styles.scrim} ${open ? styles.scrimOn : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside className={`${styles.drawer} ${open ? styles.drawerOn : ""}`} aria-hidden={!open} aria-label="Menu">
        <div className={styles.drawerTop}>
          <Image src={logo.dark} alt="" width={logo.width} height={logo.height} className={styles.drawerLogo} unoptimized />
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
