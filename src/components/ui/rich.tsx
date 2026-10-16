import { Fragment, type ReactNode } from "react";

/** Turns "The *Hides*" into "The <em>Hides</em>" and "\n" into line breaks. */
export function rich(text: string): ReactNode {
  return text.split("\n").map((line, li, lines) => (
    <Fragment key={li}>
      {line.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
      {li < lines.length - 1 && <br />}
    </Fragment>
  ));
}
