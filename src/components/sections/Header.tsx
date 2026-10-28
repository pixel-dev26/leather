"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { announcement, brand, nav } from "@/content/home";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

      <header className={`${styles.header} ${scrolled ? `${styles.scrolled} ${styles.solid}` : ""}`}>
        <div className={styles.inner}>
          <a href="#top" className={styles.logo} aria-label={`${brand.name} home`}>
            <Image src={brand.logoLight} alt={brand.name} {...brand.logoSize} priority className={styles.logoLight} />
            <Image src={brand.logo} alt="" {...brand.logoSize} priority className={styles.logoDark} aria-hidden />
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
          </div>
        </div>
      </header>
    </>
  );
}
