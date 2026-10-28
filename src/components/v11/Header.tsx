"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { announcement, logo, navLeft, navRight, type NavItem } from "@/content/home-v11";
import Icon from "./Icons";
import styles from "./Header.module.css";

/**
 * v11rule.md §6 header (premium pass): a one-line announcement, then a light sticky bar with the shop links left of the
 * centred logo and the help links and icons on the right. Items with columns open a full-width menu on hover or focus.
 * Under 1100px the links fold into a drawer with the same columns.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const link = (n: NavItem) => (
    <li key={n.label} className={styles.item} onMouseEnter={() => setMega(n.columns ? n.label : null)} onFocus={() => setMega(n.columns ? n.label : null)}>
      <a href={n.href} className={mega === n.label ? styles.hot : undefined} aria-expanded={n.columns ? mega === n.label : undefined} aria-haspopup={n.columns ? "true" : undefined}>
        {n.label}
      </a>
      {n.columns && (
        <div className={`${styles.mega} ${mega === n.label ? styles.megaOpen : ""}`}>
          <div className={styles.megaInner}>
            {n.columns.map((c) => (
              <div key={c.title}>
                <p className="v11-eyebrow">{c.title}</p>
                <ul>{c.links.map((l) => <li key={l.label}><a href={l.href} onClick={() => setMega(null)}>{l.label}</a></li>)}</ul>
              </div>
            ))}
            {n.feature && (
              <a href={n.feature.href} className={styles.feature} onClick={() => setMega(null)}>
                <span className={styles.featureImg}><Image src={n.feature.image.src} alt={n.feature.image.alt} fill sizes="420px" /></span>
                <span className={styles.featureText}>{n.feature.title} <span className="v11-link">Shop</span></span>
              </a>
            )}
          </div>
        </div>
      )}
    </li>
  );

  return (
    <>
      <p className={styles.bar}>{announcement}</p>
      <header className={styles.header} onMouseLeave={() => setMega(null)}>
        <button className={styles.menuBtn} aria-label="Open menu" aria-expanded={open} aria-controls="v11-drawer" onClick={() => setOpen(true)}>
          <Icon name="menu" size={20} />
        </button>
        <nav aria-label="Shop" className={styles.left}><ul>{navLeft.map(link)}</ul></nav>
        <a href="#top" className={styles.logo} aria-label="Morucha home">
          <Image src={logo.dark} alt="" width={180} height={45} priority />
        </a>
        <div className={styles.right}>
          <nav aria-label="Help"><ul>{navRight.map(link)}</ul></nav>
          <div className={styles.icons}>
            <button aria-label="Search"><Icon name="search" size={18} /></button>
            <a href="#" aria-label="Wishlist" className={styles.hideSm}><Icon name="heart" size={18} /></a>
            <a href="#" aria-label="Basket"><Icon name="basket" size={18} /></a>
          </div>
        </div>
      </header>

      <div className={`${styles.scrim} ${open ? styles.open : ""}`} onClick={() => setOpen(false)} aria-hidden />
      <aside id="v11-drawer" className={`${styles.drawer} ${open ? styles.open : ""}`} aria-label="Menu" aria-hidden={!open} inert={!open}>
        <button className={styles.close} aria-label="Close menu" onClick={() => setOpen(false)}>
          <Icon name="close" size={20} />
        </button>
        <nav>
          <ul className={styles.drawerList}>
            {[...navLeft, ...navRight].map((n) => (
              <li key={n.label}>
                {n.columns ? (
                  <details>
                    <summary>{n.label}</summary>
                    {n.columns.map((c) => (
                      <div key={c.title} className={styles.drawerCol}>
                        <p className="v11-eyebrow">{c.title}</p>
                        <ul>{c.links.map((l) => <li key={l.label}><a href={l.href} onClick={() => setOpen(false)}>{l.label}</a></li>)}</ul>
                      </div>
                    ))}
                  </details>
                ) : (
                  <a href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
