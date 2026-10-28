"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { announcement, logo, navLeft, navRight } from "@/content/home-v12";
import Icon from "@/components/v11/Icons";
import styles from "./Header.module.css";

/**
 * v12rule.md §6 header: a one-message announcement band that can be closed, then a 64px white sticky bar with the shop
 * links left, the logo centred, and Our Story plus the icons right. Under 960px the links move into a drawer and the
 * bar shows menu and search left, account and bag right, as Ghurka does.
 */
export default function Header() {
  const [bar, setBar] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {bar && (
        <p className={styles.bar}>
          {announcement}
          <button className={styles.barClose} aria-label="Close announcement" onClick={() => setBar(false)}><Icon name="close" size={14} /></button>
        </p>
      )}
      <header className={styles.header}>
        <div className={styles.left}>
          <button className={styles.menuBtn} aria-label="Open menu" aria-expanded={open} aria-controls="v12-drawer" onClick={() => setOpen(true)}>
            <Icon name="menu" size={20} />
          </button>
          <nav aria-label="Shop"><ul>{navLeft.map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}</ul></nav>
          <button className={styles.searchSm} aria-label="Search"><Icon name="search" size={19} /></button>
        </div>
        <a href="#top" className={styles.logo} aria-label="Morucha home">
          <Image src={logo} alt="" width={180} height={45} priority />
        </a>
        <div className={styles.right}>
          <nav aria-label="About"><ul>{navRight.map((n) => <li key={n.label}><a href={n.href}>{n.label}</a></li>)}</ul></nav>
          <button className={styles.searchLg} aria-label="Search"><Icon name="search" size={19} /></button>
          <a href="#" aria-label="Account"><Icon name="account" size={19} /></a>
          <a href="#" aria-label="Basket"><Icon name="basket" size={19} /></a>
        </div>
      </header>

      <div className={`${styles.scrim} ${open ? styles.open : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside id="v12-drawer" className={`${styles.drawer} ${open ? styles.open : ""}`} aria-label="Menu" aria-hidden={!open} inert={!open}>
        <button className={styles.close} aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="close" size={20} /></button>
        <nav>
          <ul>{[...navLeft, ...navRight].map((n) => <li key={n.label}><a href={n.href} onClick={() => setOpen(false)}>{n.label}</a></li>)}</ul>
        </nav>
      </aside>
    </>
  );
}
