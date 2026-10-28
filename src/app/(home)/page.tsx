// Version list: one card per homepage version with a screenshot of its opening screen, its number, name, summary,
// type pairing, reference site and palette, and a View button. The whole card opens the version.
// Links are relative ("morucha/"), so the list works at the site root and under an export's base path alike.
// Screenshots: public/images/previews/<id>.webp, 800×450 crops of each version at 1440×900.
import Image from "next/image";
import { versions } from "@/content/versions";

// two copies of the arrow: on hover the first slides out to the right while the second slides in from the left
const Arrow = () => (
  <svg viewBox="0 0 24 24">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function VersionList() {
  return (
    <main>
      <header className="intro">
        <Image className="logo" src="/brand/morucha-logo.webp" alt="Morucha" width={667} height={256} priority />
        <p className="eyebrow">Design review</p>
        <h1>Homepage versions</h1>
        <p className="lede">
          {versions.length} directions for the new Morucha homepage. Open any of them to see it at full size, on desktop or
          phone.
        </p>
      </header>

      <ol className="grid">
        {versions.map((v, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <li key={v.id}>
              <a className="card" href={`${v.id}/`} aria-label={`View version ${num}, ${v.name}`}>
                <div className="frame">
                  <div className="frame__bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <em>{v.domain ?? "morucha.co.uk"}</em>
                  </div>
                  <div className="frame__shot">
                    <Image
                      src={`/images/previews/${v.id}.webp`}
                      alt=""
                      width={800}
                      height={450}
                      sizes="(max-width: 760px) 100vw, 560px"
                      priority={i < 2}
                    />
                  </div>
                </div>

                <div className="body">
                  <div className="title">
                    <span className="num">{num}</span>
                    <h2>{v.name}</h2>
                  </div>
                  <p className="summary">{v.summary}</p>

                  <dl className="meta">
                    <div>
                      <dt>Type</dt>
                      <dd>{v.type}</dd>
                    </div>
                    <div>
                      <dt>Reference</dt>
                      <dd>{v.reference}</dd>
                    </div>
                  </dl>

                  <div className="foot">
                    <ul className="swatches" aria-label="Palette">
                      {v.swatches.map((c) => (
                        <li key={c} style={{ background: c }} title={c} />
                      ))}
                    </ul>
                    <span className="btn" aria-hidden="true">
                      <span className="btn__label">
                        <span data-text="View">View</span>
                      </span>
                      <span className="btn__arrow">
                        <Arrow />
                        <Arrow />
                      </span>
                    </span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
