"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { announcementV4 as announcement, menu } from "@/content/home-v4";
import { ArrowNE, Chat, Chevron } from "./Icons";
import styles from "./Header.module.css";

/**
 * Announcement bar + fixed header + floating menu card (v4rule.md §7).
 * Transparent over the black hero; after the hero it gets the 56% black scrim with blur.
 * The logo starts centred at the top of the page and glides to the left corner as soon as the page scrolls.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [docked, setDocked] = useState(false); // logo sits centred at the top, docks to the left once the page scrolls
  const [offset, setOffset] = useState(36); // follows the announcement bar until it has scrolled away
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const limit = hero ? hero.offsetTop + hero.offsetHeight - 120 : window.innerHeight;
      setScrolled(window.scrollY > limit);
      setDocked(window.scrollY > 40);
      const bar = document.getElementById("v4-announce");
      setOffset(Math.max(0, (bar?.offsetHeight ?? 36) - window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!cardRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <div id="v4-announce" className={styles.announce}>
        <p>
          {announcement.split("·").map((part, i) => (
            <span key={i} className={i ? styles.announceMore : undefined}>{i ? " · " : ""}{part.trim()}</span>
          ))}
        </p>
      </div>

      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} style={{ top: offset }}>
        <a href="#top" className={`${styles.logo} ${docked ? styles.logoDocked : ""}`} aria-label="Morucha home">
          <Image src="/brand/morucha-logo-light.webp" alt="Morucha" width={667} height={256} priority />
        </a>
      </header>

      {/* Separate fixed layer so it can blend (difference) with the hero while the logo keeps its true colours */}
      <div className={`${styles.actionsBar} ${scrolled ? styles.scrolled : ""}`} style={{ top: offset }}>
        <div className={styles.actions}>
          <a href="#bestsellers" className={styles.bag}>Bag (0)</a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="v4-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.menuWord}>{open ? "Close" : "Menu"}</span>
            <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} aria-hidden><i /><i /></span>
          </button>
        </div>
      </div>

      <div ref={cardRef} id="v4-menu" className={`${styles.card} ${open ? styles.cardOpen : ""}`} aria-hidden={!open} inert={!open}>
        <ul className={styles.primary}>
          {menu.primary.map((item) => (
            <li key={item.label}>
              <div className={styles.row}>
                <a href={item.href} onClick={close}>{item.label}</a>
                {item.children && (
                  <button
                    type="button"
                    className={`${styles.caret} ${expanded === item.label ? styles.caretOpen : ""}`}
                    aria-label={`Show ${item.label} links`}
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((x) => (x === item.label ? null : item.label))}
                  >
                    <Chevron dir="down" />
                  </button>
                )}
              </div>
              {item.children && (
                <ul className={`${styles.sub} ${expanded === item.label ? styles.subOpen : ""}`}>
                  {item.children.map((c) => (
                    <li key={c.label}><a href={c.href} onClick={close}>{c.label}</a></li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div className={styles.cardFoot}>
          <div className={styles.secondary}>
            {menu.secondary.map((l) => <a key={l.label} href={l.href} onClick={close}>{l.label}</a>)}
          </div>
          <a href={menu.cta.href} className="v4-link" onClick={close}>{menu.cta.label}<ArrowNE /></a>
        </div>
      </div>

      <a href="#trade" className={`${styles.chat} ${open ? styles.chatHidden : ""}`} aria-label="Trade enquiries">
        <Chat />
      </a>
    </>
  );
}
