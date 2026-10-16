"use client";

import { useEffect, useState } from "react";
import Photo from "@/components/ui/Photo";
import { newsletter } from "@/content/home-v2";
import styles from "./NewsletterPopup.module.css";

const KEY = "morucha-v2-newsletter-dismissed";

/** v2rule.md §12B: flyout shown once per visitor, 8s after load or at 50% scroll. */
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return;
    } catch {}
    const show = () => {
      setOpen(true);
      cleanup();
    };
    const onScroll = () => {
      const h = document.documentElement;
      const range = h.scrollHeight - h.clientHeight;
      if (range > 0 && h.scrollTop / range > 0.5) show();
    };
    const t = setTimeout(show, 8000);
    window.addEventListener("scroll", onScroll, { passive: true });
    const cleanup = () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }

  return (
    <div className={`${styles.flyout} ${open ? styles.open : ""}`} role="dialog" aria-modal="false" aria-labelledby="nl-title" aria-hidden={!open}>
      <div className={styles.body}>
        <p className={styles.label}>{newsletter.label}</p>
        <h2 className={styles.title} id="nl-title">
          {done ? "Thank you, you're on the list" : newsletter.title}
        </h2>
        <p className={styles.text}>{done ? "Look out for our first letter soon." : newsletter.text}</p>
        {!done && (
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              // TODO: connect to the newsletter provider (e.g. Klaviyo / Shopify customer list).
              setDone(true);
              try {
                localStorage.setItem(KEY, "1");
              } catch {}
            }}
          >
            <label htmlFor="nl-email" className="visually-hidden">
              Email address
            </label>
            <input id="nl-email" type="email" required placeholder="Email address" autoComplete="email" tabIndex={open ? 0 : -1} />
            <button type="submit" tabIndex={open ? 0 : -1}>
              Subscribe
            </button>
          </form>
        )}
      </div>
      <div className={styles.media}>
        <Photo {...newsletter.image} sizes="390px" />
      </div>
      <button className={styles.close} onClick={close} aria-label="Close newsletter sign-up" tabIndex={open ? 0 : -1}>
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.3" aria-hidden>
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </div>
  );
}
