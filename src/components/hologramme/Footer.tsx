"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { footer, logo } from "@/content/home-hologramme";
import Icon from "./Icons";
import styles from "./Footer.module.css";

/** hologramme-rule.md §7 footer: leather-brown with a stitched inset border, newsletter, link columns, contact and legal line. */
export default function Footer() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <Image src={logo.light} alt="Hologramme Paris" width={logo.width} height={logo.height} className={styles.logo} unoptimized />
          <p>{footer.line}</p>
          <p>{footer.phoneLine}</p>
          {sent ? (
            <p className={styles.thanks}>Thanks for subscribing.</p>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <label htmlFor="holo-email" className="visually-hidden">Email address</label>
              <input id="holo-email" type="email" required placeholder="Your email address" />
              <button type="submit">Subscribe <Icon name="arrowRight" size={14} /></button>
            </form>
          )}
        </div>
        {footer.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <h2>Contact</h2>
          <ul>
            {footer.contact.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.bar}>
        <span>© {new Date().getFullYear()} Hologramme. All rights reserved.</span>
        <span>{footer.legal}</span>
      </div>
    </footer>
  );
}
