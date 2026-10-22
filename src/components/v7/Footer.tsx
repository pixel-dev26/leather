"use client";

// Bucherer's black footer: a sign-up row (the outlined REGISTER NOW button opens an email field in place), four
// columns of links, a language line, then a white strip (Bucherer's Trustpilot bar) with the payment cards.
import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import type { footer as footerData } from "@/content/home-v7";
import { Arrow, At, Globe } from "./Icons";
import styles from "./Footer.module.css";

const paymentNames: Record<string, string> = { visa: "Visa", mastercard: "Mastercard", amex: "American Express", applepay: "Apple Pay", googlepay: "Google Pay" };

export default function Footer({ data }: { data: typeof footerData }) {
  const [stage, setStage] = useState<"closed" | "open" | "done">("closed");
  const input = useRef<HTMLInputElement>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (input.current?.checkValidity()) setStage("done");
  };

  return (
    <footer className={styles.footer}>
      <div className={`v7-wrap ${styles.signup}`}>
        <p className={styles.signupText}><At className={styles.at} />{data.newsletter}</p>
        <div className={styles.signupAction}>
          {stage === "closed" && (
            <button className="v7-btn v7-btn--outline" onClick={() => { setStage("open"); requestAnimationFrame(() => input.current?.focus()); }}>Register now</button>
          )}
          {stage === "open" && (
            <form className={styles.form} onSubmit={submit}>
              <label className="v7-sr" htmlFor="v7-email">Email address</label>
              <input ref={input} id="v7-email" type="email" required placeholder="Email address" autoComplete="email" />
              <button type="submit" aria-label="Subscribe"><Arrow /></button>
            </form>
          )}
          {stage === "done" && <p className={styles.thanks} role="status">Thank you. Look out for our next email.</p>}
        </div>
      </div>

      <div className={`v7-wrap ${styles.cols}`}>
        {data.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <p className={styles.colTitle}>{c.title}</p>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </nav>
        ))}
        <div>
          <p className={styles.colTitle}>{data.care.title}</p>
          <ul>
            {data.care.lines.map((l) => <li key={l}>{l.includes("@") ? <a href={`mailto:${l}`}>{l}</a> : l}</li>)}
            <li><a href={data.care.contact.href}>{data.care.contact.label}</a></li>
          </ul>
        </div>
      </div>

      <div className={`v7-wrap ${styles.bottom}`}>
        <p className={styles.locale}><Globe /> English / United Kingdom · £ GBP</p>
        <p className={styles.legal}>{data.legal}</p>
        <p className={styles.copy}>© 2026 Morucha</p>
      </div>

      <div className={styles.strip}>
        <span>Secure checkout</span>
        <ul className={styles.payments} aria-label="We accept">
          {data.payments.map((p) => (
            <li key={p}><Image src={`/images/payments/${p}.svg`} alt={paymentNames[p] ?? p} width={40} height={25} /></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
