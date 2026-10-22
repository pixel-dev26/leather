"use client";

// The mailing-list sign-up, in two places: the footer form (email, interest boxes, sand button) and the reference's
// pop-up, which opens once per visit after a few seconds and can be brought back from a navy tab in the corner.
// Nothing is sent yet: the form only thanks the visitor [TBC: connect to Shopify customer marketing].
import Image from "next/image";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Close } from "./Icons";
import styles from "./Newsletter.module.css";

type FormProps = { interests?: string[]; button: string; compact?: boolean };

export function NewsletterForm({ interests = [], button, compact = false }: FormProps) {
  const [sent, setSent] = useState(false);
  const id = useId();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (e.currentTarget.reportValidity()) setSent(true);
  };

  if (sent) return <p className={styles.thanks} role="status">Thank you. You&apos;re on the list.</p>;

  return (
    <form className={`${styles.form} ${compact ? styles.compact : ""}`} onSubmit={submit} noValidate>
      <label className="v8-sr" htmlFor={`${id}-email`}>Email address</label>
      <input id={`${id}-email`} className={styles.email} type="email" name="email" placeholder="Your Email" autoComplete="email" required />
      <div className={styles.row}>
        {interests.length > 0 && (
          <fieldset className={styles.interests}>
            <legend className="v8-sr">I&apos;m interested in</legend>
            {interests.map((label) => (
              <label key={label} className={styles.check}>
                <input type="checkbox" name="interest" value={label} />
                <span aria-hidden />
                {label}
              </label>
            ))}
          </fieldset>
        )}
        <button type="submit" className={`v8-btn ${styles.submit}`}>{button}</button>
      </div>
    </form>
  );
}

type PopupProps = { title: string; text: string; image: string; alt: string };

const SEEN_KEY = "v8-newsletter-seen";

export function NewsletterPopup({ title, text, image, alt }: PopupProps) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(true);
  const [terms, setTerms] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  // once per visit, a few seconds in (storage can be blocked, so it is only a convenience)
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 7000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
    } else if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      {tab && (
        <div className={styles.tab}>
          <button onClick={() => setOpen(true)}>Join our mailing list</button>
          <button className={styles.tabClose} aria-label="Hide the mailing list tab" onClick={() => setTab(false)}><Close /></button>
        </div>
      )}
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby="v8-popup-title"
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      >
        <div className={styles.panel}>
          <div className={styles.copy}>
            <h2 id="v8-popup-title" className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
            <NewsletterForm button="Submit" compact />
            <button className={styles.terms} aria-expanded={terms} onClick={() => setTerms((t) => !t)}>
              Terms &amp; Privacy <span aria-hidden>{terms ? "−" : "+"}</span>
            </button>
            {terms && <p className={styles.small}>By signing up you agree to receive marketing emails from Morucha. You can unsubscribe at any time. See our Privacy Policy.</p>}
          </div>
          <div className={styles.photo}><Image src={image} alt={alt} fill sizes="300px" /></div>
          <button className={styles.close} aria-label="Close" onClick={() => setOpen(false)}><Close /></button>
        </div>
      </dialog>
    </>
  );
}
