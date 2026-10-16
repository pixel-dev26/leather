"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADD_TO_BAG_EVENT, announcement, nav } from "@/content/home-v2";
import styles from "./Header.module.css";

/** v2rule.md §7 header: 3-column grid, centred bold wordmark, hides on scroll down and returns on scroll up. */
export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const onAdd = (e: Event) => {
      setBag((n) => n + ((e as CustomEvent<number>).detail || 1));
      setBump(true);
      setTimeout(() => setBump(false), 500);
    };
    window.addEventListener(ADD_TO_BAG_EVENT, onAdd);
    return () => window.removeEventListener(ADD_TO_BAG_EVENT, onAdd);
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <p className={styles.announcement}>{announcement}</p>
      <header className={`${styles.header} ${hidden && !open ? styles.hidden : ""}`}>
        <div className={styles.inner}>
          <nav className={styles.left} aria-label="Main">
            <button className={styles.burger} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              <span />
              <span />
            </button>
            {nav.left.map((l) => (
              <a key={l.label} href={l.href} className={styles.link}>
                {l.label}
              </a>
            ))}
          </nav>
          <Link href="/v2" className={styles.logo} aria-label="Morucha home">
            <Image src="/brand/morucha-logo.png" alt="Morucha" width={667} height={256} priority />
          </Link>
          <div className={styles.right}>
            {nav.right.map((l) => (
              <a key={l.label} href={l.href} className={`${styles.link} ${styles.util}`}>
                {l.label}
              </a>
            ))}
            <a href="#" className={styles.link}>
              Bag <span className={`${styles.count} ${bump ? styles.bump : ""}`} aria-live="polite">{bag}</span>
            </a>
          </div>
        </div>
      </header>

      <div className={`${styles.menu} ${open ? styles.menuOpen : ""}`} aria-hidden={!open}>
        {[...nav.left, ...nav.right].map((l) => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
