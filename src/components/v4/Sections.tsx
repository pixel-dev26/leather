// Static v4 sections (v4rule.md §7, §10). Copy is shared with v1 via @/content/home.
import Image from "next/image";
import Photo from "@/components/ui/Photo";
import Reveal from "@/components/ui/Reveal";
import { collections, leathers, makers, process as processContent, story, sustainability, trade } from "@/content/home";
import { leathersV4, plain, sustainabilityV4, tradeV4 } from "@/content/home-v4";
import { v4Slot } from "@/content/images-v4";
import { ArrowNE, Leaf } from "./Icons";
import Slider from "./Slider";
import CursorGlow from "./CursorGlow";
import styles from "./Sections.module.css";

/** §10 row 5: swatch slider on the light band (Super Tannery /our-offerings "Finished Leather"). */
export function Leathers() {
  return (
    <section id="leathers" className={`v4-section ${styles.leathers}`} aria-labelledby="leathers-title">
      <div className={`v4-inner ${styles.leathersInner}`}>
        <Reveal>
          <h2 id="leathers-title" className={styles.h4}>{leathersV4.title}</h2>
        </Reveal>
        <div className={styles.intro}>
          {leathersV4.intro.map((p) => <p key={p}>{p}</p>)}
        </div>
        <Slider label="Our leathers" per={[3, 2, 1.15]} gap={20} interval={2600} speed={1000}>
          {leathers.items.map((l) => (
            <a key={l.name} href={leathers.link.href} className={styles.swatch}>
              <div className={styles.swatchImg}><Photo {...v4Slot(l.image)} sizes="(max-width: 767px) 85vw, 33vw" /></div>
              <p className={styles.swatchName}>{l.name}</p>
              <p className={styles.swatchMeta}>{l.price} · {l.meta}</p>
            </a>
          ))}
        </Slider>
        <div className={styles.center}>
          <a href="#trade" className="v4-link">Order a swatch box<ArrowNE /></a>
        </div>
      </div>
    </section>
  );
}

/** §10 row 9: side-label text panel (Super Tannery "Our Brand"). */
export function Story() {
  return (
    <section id="story" className="v4-section v4-rule" aria-labelledby="story-title">
      <div className="v4-inner v4-split">
        <Reveal className={styles.storyAside}>
          <h2 id="story-title" className="v4-label">{story.label}</h2>
          <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.storyMark} />
        </Reveal>
        <div className={styles.panel}>
          <p className={styles.panelLead}>{story.title}.</p>
          {story.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p>
            From the first cut to the final stitch, everything is done under one roof so the leather in your hand is the leather we tanned.{" "}
            <a href={story.cta.href} className={styles.readMore}>Read more…</a>
          </p>
        </div>
      </div>
    </section>
  );
}

/** §10 row 10: centred alternating timeline (Super Tannery recognitions). */
export function Process() {
  return (
    <section id="process" className={`v4-section v4-rule ${styles.process}`} aria-labelledby="process-title">
      <div className={styles.timelineHead}>
        <Image src="/brand/morucha-logo.webp" alt="" width={667} height={256} className={styles.timelineMark} />
        <h2 id="process-title" className="v4-label">{processContent.label}</h2>
        <p className={styles.timelineIntro}>{plain(processContent.title)}</p>
      </div>
      <ol className={styles.timeline}>
        {processContent.steps.map((s, k) => (
          <li key={s.title} className={k % 2 ? styles.right : styles.left}>
            <Reveal className={styles.step}>
              <p className={styles.stepNo}>{String(k + 1).padStart(2, "0")}</p>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
      <div className={styles.center}>
        <a href={processContent.cta.href} className="v4-btn">{processContent.cta.label}</a>
      </div>
    </section>
  );
}

/** §10 row 11: centred display word + 2-up image slider (Super Tannery "Events"). */
export function Collections() {
  return (
    <section id="collections" className={`v4-section v4-rule ${styles.collections}`} aria-labelledby="collections-title">
      <Reveal>
        <h2 id="collections-title" className="v4-display">Collections</h2>
      </Reveal>
      <div className="v4-inner">
        <Slider label="Collections" per={[2, 2, 1.15]} gap={40} step={2} interval={5000} speed={500} arrows>
          {collections.items.map((c) => (
            <a key={c.name} href={c.href} className={styles.coll}>
              <div className={styles.collImg}><Photo {...v4Slot(c.image)} sizes="(max-width: 767px) 85vw, 48vw" /></div>
              <div className={styles.collCap}>
                <span className={styles.collName}>{c.name}</span>
                <span className={styles.collCount}>{c.count}</span>
              </div>
            </a>
          ))}
        </Slider>
      </div>
    </section>
  );
}

/** §10 row 12: black glow band (Super Tannery "Experience") + centred outline button below. */
export function Sustainability() {
  return (
    <>
      <section id="sustainability" className={`v4-glow v4-glow--left ${styles.glowBand}`} aria-labelledby="sus-title">
        <CursorGlow side="left" />
        <div className={`v4-inner ${styles.glowGrid}`}>
          <h2 id="sus-title" className={`v4-label ${styles.glowLabel}`}>{sustainability.label}</h2>
          <div className={styles.glowBody}>
            <p className={styles.glowText}>{sustainabilityV4.statement}</p>
            <ul className={styles.points}>
              {sustainability.points.map((p) => (
                <li key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className={styles.belowBand}>
        <a href={sustainabilityV4.cta.href} className="v4-btn"><Leaf />{sustainabilityV4.cta.label}</a>
      </div>
    </>
  );
}

/** §10 row 13: side label + 3 × 2 square grid. */
export function Makers() {
  return (
    <section id="makers" className="v4-section" aria-labelledby="makers-title">
      <div className="v4-inner v4-split">
        <Reveal className={styles.makersAside}>
          <h2 id="makers-title" className="v4-label">{makers.label}</h2>
          <p className={styles.makersText}>{makers.text}</p>
          <a href={makers.href} className="v4-link">Follow {makers.handle}<ArrowNE /></a>
        </Reveal>
        <ul className={styles.makersGrid}>
          {makers.items.map((m, k) => (
            <Reveal as="li" key={m.caption} delay={k % 3}>
              <a href={makers.href} className={styles.maker}>
                <div className={styles.makerImg}><Photo {...v4Slot(m.image)} sizes="(max-width: 767px) 50vw, 25vw" /></div>
                <span className={styles.makerCap}>{m.caption}</span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** §10 row 14: side label + white panel with hairline benefits and an underline-input enquiry form. */
export function Trade() {
  return (
    <section id="trade" className={`v4-section ${styles.trade}`} aria-labelledby="trade-title">
      <div className="v4-inner v4-split">
        <Reveal className={styles.tradeAside}>
          <span className="v4-overline">{tradeV4.overline}</span>
          <h2 id="trade-title" className="v4-label">{trade.label}</h2>
          <p className={styles.tradeText}>{trade.text}</p>
        </Reveal>
        <div className={`${styles.panel} ${styles.tradePanel}`}>
          <ul className={styles.benefits}>
            {trade.benefits.map((b) => (
              <li key={b.n}>
                <span className={styles.benefitNo}>{b.n}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
          <form className={styles.form} action={`mailto:${trade.email}`} method="post" encType="text/plain">
            <div className="v4-field"><label htmlFor="t-name">Name</label><input id="t-name" name="name" className="v4-input" autoComplete="name" required /></div>
            <div className="v4-field"><label htmlFor="t-biz">Business</label><input id="t-biz" name="business" className="v4-input" autoComplete="organization" /></div>
            <div className="v4-field"><label htmlFor="t-email">Email</label><input id="t-email" name="email" type="email" className="v4-input" autoComplete="email" required /></div>
            <div className="v4-field"><label htmlFor="t-phone">Phone</label><input id="t-phone" name="phone" type="tel" className="v4-input" autoComplete="tel" /></div>
            <div className={`v4-field ${styles.wide}`}><label htmlFor="t-msg">What are you making?</label><textarea id="t-msg" name="message" className="v4-input" rows={3} /></div>
            <div className={styles.formActions}>
              <button type="submit" className="v4-btn">{trade.primary.label}</button>
              <a href={trade.secondary.href} className="v4-link v4-link--muted">{trade.secondary.label}<ArrowNE /></a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
