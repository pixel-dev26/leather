// Stitch letters (v2rule.md §7): each glyph is a 5×5 grid of vertical rounded dashes, like saddle-stitch
// holes running down a strap. Drawn as SVG so it scales to any size without a custom font file.

const GLYPHS: Record<string, string[]> = {
  A: [".###.", "#...#", "#####", "#...#", "#...#"],
  B: ["####.", "#...#", "####.", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "####.", "#....", "#####"],
  F: ["#####", "#....", "####.", "#....", "#...."],
  G: [".####", "#....", "#..##", "#...#", ".###."],
  H: ["#...#", "#...#", "#####", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "###..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "####.", "#....", "#...."],
  Q: [".###.", "#...#", "#.#.#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "####.", "#..#.", "#...#"],
  S: [".####", "#....", ".###.", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
  Y: ["#...#", ".#.#.", "..#..", "..#..", "..#.."],
  Z: ["#####", "...#.", "..#..", ".#...", "#####"],
  "0": [".###.", "#..##", "#.#.#", "##..#", ".###."],
  "1": [".##..", "..#..", "..#..", "..#..", ".###."],
  "2": ["####.", "....#", ".###.", "#....", "#####"],
  "3": ["####.", "....#", ".###.", "....#", "####."],
  "4": ["#...#", "#...#", "#####", "....#", "....#"],
  "5": ["#####", "#....", "####.", "....#", "####."],
  "6": [".###.", "#....", "####.", "#...#", ".###."],
};

const CELL_W = 1;
const CELL_H = 1.6;
const DASH_W = 0.42;
const DASH_H = 1.22;
const LETTER_GAP = 1;

type Props = { text: string; className?: string; title?: string };

export default function Stitch({ text, className = "", title }: Props) {
  const chars = [...text.toUpperCase()].filter((c) => GLYPHS[c] || c === " ");
  const dashes: { x: number; y: number }[] = [];
  let cursor = 0;
  chars.forEach((c) => {
    if (c === " ") {
      cursor += 3 * CELL_W;
      return;
    }
    GLYPHS[c].forEach((row, r) =>
      [...row].forEach((cell, col) => {
        if (cell === "#") dashes.push({ x: cursor + col * CELL_W + (CELL_W - DASH_W) / 2, y: r * CELL_H + (CELL_H - DASH_H) / 2 });
      }),
    );
    cursor += 5 * CELL_W + LETTER_GAP;
  });
  const width = Math.max(cursor - LETTER_GAP, 1);
  const height = 5 * CELL_H;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="currentColor"
    >
      {dashes.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width={DASH_W} height={DASH_H} rx={DASH_W / 2} />
      ))}
    </svg>
  );
}
