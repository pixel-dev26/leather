// Adds the `js` class to <html> before first paint, exactly like the static pages,
// so CSS can hide elements that animate in once the page script runs.
export default function JsFlag() {
  return <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" }} />;
}
