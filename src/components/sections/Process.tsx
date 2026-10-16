"use client";

import { useEffect, useState } from "react";
import { process as processContent } from "@/content/home";
import Photo from "@/components/ui/Photo";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { rich } from "@/components/ui/rich";
import styles from "./Process.module.css";

/** Oliver Co-style: full-width photo band, then a dark panel with a statement and an accordion of steps. */
export default function Process() {
  const [open, setOpen] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { film } = processContent;
  const isEmbed = /youtube|vimeo/.test(film.src);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  return (
    <section id="process" className={`bg-dark ${styles.process}`}>
      <div className={styles.band}>
        <Photo {...processContent.band} sizes="100vw" position="50% 45%" />
        <span className={styles.bandShade} aria-hidden />
        <button className={styles.play} onClick={() => setPlaying(true)} aria-label={`${film.label}: ${film.title}`}>
          <span className={styles.playRing} aria-hidden>
            <svg width="22" height="24" viewBox="0 0 22 24" aria-hidden>
              <path d="M2 1.5v21L20.5 12z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.playText}>
            <b>{film.label}</b>
            <span>
              {film.title} · {film.duration}
            </span>
          </span>
        </button>
      </div>

      {playing && (
        <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={film.title} onClick={() => setPlaying(false)}>
          <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
            {film.src ? (
              isEmbed ? (
                <iframe src={`${film.src}${film.src.includes("?") ? "&" : "?"}autoplay=1`} title={film.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
              ) : (
                <video src={film.src} controls autoPlay playsInline />
              )
            ) : (
              <div className={styles.soon}>
                <Photo {...processContent.band} sizes="80vw" />
                <p>
                  <em>{film.title}</em>
                  Film coming soon [TBC]
                </p>
              </div>
            )}
            <button className={styles.close} onClick={() => setPlaying(false)} aria-label="Close video" autoFocus>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className={`container ${styles.panel}`}>
        <div className={styles.lead}>
          <Reveal>
            <p className={styles.label}>
              <span aria-hidden />
              {processContent.label}
            </p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className={styles.title}>{rich(processContent.title)}</h2>
          </Reveal>
          <Reveal delay={2}>
            <Button href={processContent.cta.href} variant="ghostLight">
              {processContent.cta.label}
            </Button>
          </Reveal>
        </div>

        <ol className={styles.steps}>
          {processContent.steps.map((step, i) => {
            const isOpen = open === i;
            return (
              <li key={step.title} className={`${styles.step} ${isOpen ? styles.open : ""}`}>
                <button className={styles.trigger} aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <i className={styles.plus} aria-hidden />
                </button>
                <div className={styles.body}>
                  <div className={styles.bodyInner}>
                    <p>{step.text}</p>
                    <div className={styles.thumb}>
                      <Photo {...step.image} sizes="160px" />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
