"use client";

import { useEffect, useRef, useState } from "react";
import { process as processContent } from "@/content/home";
import { rich } from "@/components/ui/rich";
import { withBase } from "@/lib/image-loader";
import styles from "./Process.module.css";

const stamp = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
const pad = (n: number) => String(n).padStart(2, "0");

/** "The Workshop Reel" (Red Wing Heritage / Ghurka / Smythson): a muted intro loop until play, then five chapter
 *  clips back to back, with a progress bar per chapter and thumbnails to jump between them. */
export default function Process() {
  const { film, reel, chapters } = processContent;
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [chapter, setChapter] = useState(0);
  const [progress, setProgress] = useState(0); // 0–1 through the current chapter
  const section = useRef<HTMLElement>(null);
  const intro = useRef<HTMLVideoElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const total = chapters.reduce((t, c) => t + c.clip.length, 0);
  const current = chapters[chapter];

  // the intro loop plays only while the section is on screen, and never with reduced motion
  useEffect(() => {
    const el = section.current;
    const loop = intro.current;
    if (!el || !loop || started || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? void loop.play().catch(() => {}) : loop.pause()), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // pause the film when it scrolls out of view
  useEffect(() => {
    const el = section.current;
    if (!el || !started) return;
    const io = new IntersectionObserver(([e]) => !e.isIntersecting && video.current?.pause(), { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  const go = (i: number) => {
    setStarted(true);
    setChapter(i);
    setProgress(0);
    setPlaying(true);
  };

  const toggle = () => {
    const v = video.current;
    if (!started) return go(0);
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  };

  const finish = () => {
    if (chapter < chapters.length - 1) return go(chapter + 1);
    setStarted(false);
    setPlaying(false);
    setChapter(0);
    setProgress(0);
  };

  const onTime = () => {
    const v = video.current;
    if (!v) return;
    const p = (v.currentTime - current.clip.start) / current.clip.length;
    if (p >= 1) return finish();
    setProgress(Math.max(0, p));
  };

  return (
    <section ref={section} id="process" className={`bg-darkest ${styles.reel}`} aria-label={`${film.label}: ${film.title}`}>
      <p className={styles.watermark} aria-hidden>
        Film
      </p>

      <div className={styles.head}>
        <div>
          <p className={styles.label}>
            {processContent.label} · {film.label} · {stamp(total)}
          </p>
          <h2 className={styles.title}>{rich(reel.title)}</h2>
        </div>
        <p className={styles.text}>{reel.text}</p>
      </div>

      <div className={`${styles.frame} ${started ? styles.live : ""}`}>
        {!started ? (
          <>
            <video ref={intro} className={styles.media} src={withBase(reel.intro.src)} poster={withBase(reel.intro.poster)} muted loop playsInline preload="metadata" aria-hidden />
            <span className={styles.shade} aria-hidden />
            <button className={styles.play} onClick={() => go(0)} aria-label={`Play the film: ${film.title}, ${stamp(total)}`}>
              <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden>
                <path d="M2 2l22 13L2 28z" fill="currentColor" />
              </svg>
            </button>
            <p className={styles.cue}>
              <em>{film.title}</em>
              {chapters.length} chapters · {stamp(total)}
            </p>
          </>
        ) : (
          <>
            <video
              key={chapter}
              ref={video}
              className={styles.media}
              src={withBase(current.clip.src)}
              poster={withBase(current.clip.poster)}
              muted={muted}
              autoPlay={playing}
              playsInline
              preload="auto"
              onLoadedMetadata={(e) => (e.currentTarget.currentTime = current.clip.start)}
              onTimeUpdate={onTime}
              onEnded={finish}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onClick={toggle}
            />
            <span className={styles.shade} aria-hidden />
            <div className={styles.caption} aria-live="polite">
              <span className={styles.captionN}>
                Chapter {pad(chapter + 1)} / {pad(chapters.length)}
              </span>
              <span className={styles.captionTitle}>{current.title}</span>
              <span className={styles.captionText}>{current.text}</span>
            </div>
            <div className={styles.controls}>
              <button onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                {playing ? (
                  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden><path d="M1 1h4v14H1zM9 1h4v14H9z" fill="currentColor" /></svg>
                ) : (
                  <svg width="14" height="16" viewBox="0 0 14 16" aria-hidden><path d="M1 1l12 7-12 7z" fill="currentColor" /></svg>
                )}
              </button>
              <button onClick={() => setMuted((m) => !m)} aria-label={muted ? "Turn sound on" : "Turn sound off"} aria-pressed={!muted}>
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <path d="M1 5.5h3L8 2v12L4 10.5H1z" fill="currentColor" stroke="none" />
                  {muted ? <path d="M11.5 5.5l5 5M16.5 5.5l-5 5" /> : <path d="M11 5c1.3 1.6 1.3 4.4 0 6M13.5 3c2.4 2.8 2.4 7.2 0 10" />}
                </svg>
              </button>
              <button onClick={() => go(0)} aria-label="Start again">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2 1.5V5h3.5" />
                </svg>
              </button>
            </div>
          </>
        )}
        <span className={styles.bars} aria-hidden />
      </div>

      <ol className={styles.chapters}>
        {chapters.map((c, i) => {
          const fill = !started ? 0 : i < chapter ? 1 : i === chapter ? progress : 0;
          const on = started && i === chapter;
          return (
            <li key={c.title}>
              <button className={on ? styles.on : ""} aria-current={on ? "step" : undefined} onClick={() => go(i)}>
                <span className={styles.bar} aria-hidden>
                  <span style={{ transform: `scaleX(${fill})` }} />
                </span>
                <span className={styles.thumb}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(c.clip.poster)} alt="" loading="lazy" />
                </span>
                <span className={styles.time}>
                  {pad(i + 1)} · {stamp(c.clip.length)}
                </span>
                <span className={styles.chapterTitle}>{c.title}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
