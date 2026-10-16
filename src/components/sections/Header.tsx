"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { announcement, nav } from "@/content/home";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <div className={styles.bar}>
        <p>
          {announcement.split("·").map((part, i) => (
            <span key={i} className={i > 0 ? styles.barExtra : undefined}>
              {i > 0 && <span aria-hidden>  ·  </span>}
              {part.trim()}
            </span>
          ))}
        </p>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${solid ? styles.solid : ""}`}>
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} aria-label="Morucha home">
            <Image src="/brand/morucha-logo-light.webp" alt="Morucha" width={667} height={256} priority className={styles.logoLight} />
            <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} priority className={styles.logoDark} aria-hidden />
          </a>

          <nav className={styles.nav} aria-label="Main">
            <ul>
              {nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <a href="#" className={styles.cart} aria-label="Basket, 0 items">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
                <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </a>
            <button
              className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} aria-hidden={!open}>
        <ul>
          {nav.map((item, i) => (
            <li key={item.label} style={{ transitionDelay: open ? `${0.1 + i * 0.06}s` : "0s" }}>
              <a href={item.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.menuFoot}>sales@morucha.co.uk</p>
      </div>
    </>
  );
}
