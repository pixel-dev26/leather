// Version list: one card per homepage version with its number, name and a View button that opens it.
// Links are relative ("v5/"), so the list works at the site root and under an export's base path alike.
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
      <header>
        <p className="eyebrow">Morucha</p>
        <h1>Homepage versions</h1>
      </header>
      <ol>
        {versions.map((v, i) => (
          <li key={v.id}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="name">{v.name}</span>
            <a className="btn" href={`${v.id}/`} aria-label={`View version ${i + 1}, ${v.name}`}>
              <span className="btn__label">
                <span data-text="View">View</span>
              </span>
              <span className="btn__arrow" aria-hidden="true">
                <Arrow />
                <Arrow />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </main>
  );
}
