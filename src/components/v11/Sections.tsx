import Image from "next/image";
import { about, collections, craft, faq, feed, gifting, hunter, newArrivals, promises } from "@/content/home-v11";
import { DrawGroup, Drawn } from "./Drawn";
import { Rail } from "./ProductRow";
import SectionHead from "./SectionHead";
import styles from "./Sections.module.css";

/** v11rule.md §6 promise band: four drawn icons between hairlines, serif title and one light line each. */
export function Promises() {
  return (
    <section className="v11-wrap" aria-label="Why Morucha">
      <DrawGroup as="ul" className={styles.promises}>
        {promises.map((p) => (
          <li key={p.label} data-redraw>
            <Drawn name={p.icon} size={40} />
            <h3>{p.label}</h3>
            <p>{p.note}</p>
          </li>
        ))}
      </DrawGroup>
    </section>
  );
}

/** v11rule.md §6 collections: six products on stone wells with drawn icons, then two wide banners. */
export function Collections() {
  return (
    <section id="collections" className="v11-wrap">
      <SectionHead eyebrow={collections.eyebrow} title={collections.title} center />
      <DrawGroup as="ul" className={styles.cols}>
        {collections.items.map((c) => (
          <li key={c.title} data-redraw>
            <a href={c.href}>
              <span className={styles.well}><Image src={c.image.src} alt="" fill sizes="(max-width: 599px) 45vw, (max-width: 959px) 30vw, 220px" /></span>
              <Drawn name={c.icon} size={40} />
              <span className={styles.colTitle}>{c.title}</span>
              <span className={styles.colNote}>{c.note}</span>
            </a>
          </li>
        ))}
      </DrawGroup>
      <div className={styles.banners}>
        {collections.banners.map((b) => (
          <a key={b.title} href={b.href} className={styles.banner}>
            <Image src={b.image.src} alt={b.image.alt} fill sizes="(max-width: 959px) 100vw, 60vw" />
            <span className={styles.bannerText}>
              <span className="v11-eyebrow">{b.eyebrow}</span>
              <span className={styles.bannerTitle}>{b.title}</span>
              <span className="v11-link">{b.cta}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

/** v11rule.md §6 craft band: ink, heading, serif statement, three pillars. */
export function Craft() {
  return (
    <section className={styles.craft} aria-labelledby="v11-craft">
      <div className="v11-wrap">
        <SectionHead eyebrow={craft.eyebrow} title={craft.title} id="v11-craft" dark link={{ label: "Our leathers", href: "#about" }} />
        <p className={styles.statement}>{craft.statement}</p>
        <ol className={styles.pillars}>
          {craft.pillars.map((p) => <li key={p.title}><b>{p.title}</b><span>{p.text}</span></li>)}
        </ol>
      </div>
    </section>
  );
}

/** v11rule.md §6 new arrivals: an editorial spread, tall photo beside a big count and a rail of the newest products. */
export function NewArrivals() {
  return (
    <section id="new" className={`v11-wrap ${styles.na}`}>
      <a href="#new" className={styles.naPhoto}>
        <Image src={newArrivals.image.src} alt={newArrivals.image.alt} fill sizes="(max-width: 959px) 100vw, 52vw" />
        <span className={styles.naCaption}>{newArrivals.imageCaption}<span className="v11-link">Shop new in</span></span>
      </a>
      <div className={styles.naSide}>
        <SectionHead eyebrow={newArrivals.eyebrow} title={newArrivals.title} sub={newArrivals.text} />
        <p className={styles.count}><b>{newArrivals.items.length}</b><span>{newArrivals.countNote}</span></p>
        <Rail items={newArrivals.items} perView={[2, 2.2, 1.5]} label={newArrivals.title} />
      </div>
    </section>
  );
}

/** v11rule.md §6 gifting split. */
export function Gifting() {
  return (
    <section id="gifts" className={`v11-wrap ${styles.split}`}>
      <div className={styles.splitPhoto}><Image src={gifting.image.src} alt={gifting.image.alt} fill sizes="(max-width: 959px) 100vw, 55vw" /></div>
      <div className={styles.splitText}>
        <SectionHead eyebrow={gifting.eyebrow} title={gifting.title} sub={gifting.text} />
        <ul className={styles.dash}>{gifting.list.map((l) => <li key={l}>{l}</li>)}</ul>
        <a href="#bestsellers" className="v11-link">{gifting.cta}</a>
      </div>
    </section>
  );
}

/** v11rule.md §6 hunter leather: large photo beside a short story and a list of three products. */
export function Hunter() {
  return (
    <section id="hunter" className={`v11-wrap ${styles.hunter}`}>
      <div className={styles.hunterPhoto}><Image src={hunter.image.src} alt={hunter.image.alt} fill sizes="(max-width: 959px) 100vw, 56vw" /></div>
      <div className={styles.hunterText}>
        <SectionHead eyebrow={hunter.eyebrow} title={hunter.title} sub={hunter.text} />
        <ul className={styles.list}>
          {hunter.items.map((c) => (
            <li key={c.handle}>
              <a href={c.href}>
                <span className={styles.thumb}><Image src={c.image.src} alt="" fill sizes="64px" /></span>
                <b>{c.name}</b>
                <span>{c.price}</span>
              </a>
            </li>
          ))}
        </ul>
        <a href="#bestsellers" className="v11-link">{hunter.cta}</a>
      </div>
    </section>
  );
}

/** v11rule.md §6 feed: a mosaic of photos, each captioned with what to shop. */
export function Feed() {
  return (
    <section className="v11-wrap" aria-labelledby="v11-feed">
      <SectionHead eyebrow={feed.handle + " [TBC]"} title={feed.title} id="v11-feed" link={{ label: "Follow", href: "#" }} />
      <ul className={styles.feed}>
        {feed.photos.map((p) => (
          <li key={p.src}>
            <a href={p.href}>
              <span className={styles.feedImg}><Image src={p.src} alt={p.alt} fill sizes="(max-width: 599px) 50vw, 25vw" /></span>
              <span className={styles.feedCap}>{p.caption} <span aria-hidden>→</span></span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** v11rule.md §6 FAQ: answers drawn only from Morucha's own policies; the first question starts open. */
export function Faq() {
  return (
    <section className={`v11-wrap ${styles.faq}`} aria-labelledby="v11-faq">
      <SectionHead eyebrow={faq.eyebrow} title={faq.title} id="v11-faq" sub="Anything else? Contact us [TBC]." />
      <div className={styles.faqList}>
        {faq.items.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** v11rule.md §6 about: one large sentence beside the facts and three links. */
export function About() {
  const [before, after] = about.title.split(about.em);
  return (
    <section id="about" className={`v11-wrap ${styles.about}`} aria-labelledby="v11-about">
      <div className={styles.aboutHead}>
        <p className="v11-eyebrow">{about.eyebrow}</p>
        <h2 id="v11-about">{before}<em>{about.em}</em>{after}</h2>
      </div>
      <div className={styles.aboutText}>
        {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
        <p><span className="tbc">Founding story [TBC]</span></p>
        <div className={styles.aboutLinks}>{about.links.map((l) => <a key={l.label} href={l.href} className="v11-link">{l.label}</a>)}</div>
      </div>
    </section>
  );
}
