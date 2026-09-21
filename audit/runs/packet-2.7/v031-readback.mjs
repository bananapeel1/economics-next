/* V031: read the claim back OUT of the emitted SVG, never off the source. */
import { DIAGRAMS } from '../../../scripts/_packet29-diagrams.mjs';
import { PD } from '../../../scripts/_packet29-util.mjs';

const d = DIAGRAMS[6];
const view = d.scenarios[2];
const svg = view.svg;
const fail = [];

console.log(`diagram[6] "${d.title}" · scenario[2] "${view.label}"`);

const texts = [...svg.matchAll(/<text([^>]*)x="([\d.]+)"([^>]*)y="([\d.]+)"([^>]*)>([^<]*)<\/text>/g)]
  .map((m) => ({ x: +m[2], y: +m[4], s: m[6], attrs: m[1] + m[3] + m[5] }));
console.log('labels:', texts.map((t) => `"${t.s}"`).join(' · '));

/* The key, which replaced four on-curve labels Verify B found colliding. Both halves must be there
   and both markets must still be named somewhere, or the picture labels nothing. */
if (!texts.some((t) => /solid: AR = D/.test(t.s))) fail.push('no "solid: AR = D" key entry in the SVG');
if (!texts.some((t) => /dashed: MR/.test(t.s))) fail.push('no "dashed: MR" key entry in the SVG');
for (const m of [PD.less, PD.more]) {
  if (!texts.some((t) => t.s.startsWith(`${m.label}:`))) fail.push(`${m.label} is not named anywhere in the SVG`);
}

/* CLEARANCE, measured rather than hoped for. Every label's glyph box against every line in the
   frame, and against every other label's box. The runner's own strike test uses a 25-unit
   threshold calibrated to the three cases Verify B reported at 46, 51 and 240 units; the two
   labels it passed here were 3.3 units apart and a guide line ran 1.4 units above a third, which
   reads as a strike on a 390px phone. This prints the worst of each so the number is on the record
   rather than a pass/fail nobody can see behind. */
/* ANCHOR MATTERS, and the first version of this check did not read it: every read-off value is
   anchor="end", so measuring it as anchor="start" put its box 90 units to the right of where it is
   and the read-off's own dashed line — which begins exactly where the label ends — looked like a
   strike through "$72". A measurement that has not been told where the thing is is not one. */
const boxes = texts.map((t) => {
  const w = 0.62 * t.s.length * 11;
  const anchor = /text-anchor="([a-z]+)"/.exec(t.attrs)?.[1] || 'start';
  const l = anchor === 'end' ? t.x - w : anchor === 'middle' ? t.x - w / 2 : t.x;
  return { s: t.s, anchor, l, r: l + w, t: t.y - 8.8, b: t.y + 2.2 };
});
console.log(`anchors parsed: ${['start', 'middle', 'end'].map((a) => `${a} ${boxes.filter((b) => b.anchor === a).length}`).join(' · ')}`);
const plotBoxes = boxes.filter((b) => b.t > 40 && b.b < 305);
let worstPair = { gap: 1e9 };
for (let i = 0; i < plotBoxes.length; i += 1) for (let j = i + 1; j < plotBoxes.length; j += 1) {
  const a = plotBoxes[i]; const b2 = plotBoxes[j];
  if (a.r < b2.l || b2.r < a.l) continue;                    // no horizontal overlap: cannot collide
  const gap = Math.max(a.t - b2.b, b2.t - a.b);
  if (gap < worstPair.gap) worstPair = { gap: +gap.toFixed(1), a: a.s, b: b2.s };
}
const allLines = [...svg.matchAll(/<line x1="([-\d.]+)" y1="([-\d.]+)" x2="([-\d.]+)" y2="([-\d.]+)"/g)]
  .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
let worstLine = { gap: 1e9 };
for (const b of plotBoxes) for (const ln of allLines) {
  const lo = Math.min(ln.x1, ln.x2); const hi = Math.max(ln.x1, ln.x2);
  if (hi < b.l || lo > b.r) continue;
  /* the line's y over the label's x-span, then the clearance to the nearer edge of the box */
  const at = (x) => (ln.x2 === ln.x1 ? null : ln.y1 + ((x - ln.x1) / (ln.x2 - ln.x1)) * (ln.y2 - ln.y1));
  const ys = [at(Math.max(lo, b.l)), at(Math.min(hi, b.r))].filter((y) => y != null);
  if (ln.x1 === ln.x2) ys.push(Math.min(ln.y1, ln.y2), Math.max(ln.y1, ln.y2));
  for (const y of ys) {
    const gap = y < b.t ? b.t - y : (y > b.b ? y - b.b : -1);
    if (gap < worstLine.gap) worstLine = { gap: +gap.toFixed(1), label: b.s, line: `(${ln.x1},${ln.y1})-(${ln.x2},${ln.y2})` };
  }
}
console.log(`\nclosest two labels: ${worstPair.gap} units  ("${worstPair.a}" / "${worstPair.b}")`);
console.log(`closest label to a line: ${worstLine.gap} units  ("${worstLine.label}" vs ${worstLine.line})`);
if (worstPair.gap < 6) fail.push(`two labels are ${worstPair.gap} units apart: "${worstPair.a}" and "${worstPair.b}"`);
console.log(`  worst line detail: ${JSON.stringify(worstLine)}`);
if (worstLine.gap < 4) fail.push(`a line passes ${worstLine.gap} units from "${worstLine.label}" — it reads as a strike at 390px`);

/* The frame, re-derived from the axes rather than imported: x0/yBot are the corner of the two axis
   lines, and the two scales come from a point whose (q, v) is known — the MC line's own y. */
const x0 = 66, x1 = 470, yTop = 60, yBot = 300, xMax = 24, yMax = 130;
const X = (q) => 66 + (q / xMax) * (x1 - x0);
const Y = (v) => yBot - (v / yMax) * (yBot - yTop);

/* Every sloping line in the SVG, as (q, v) endpoints in the plot's own units. */
const lines = [...svg.matchAll(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)" stroke="([^"]+)" stroke-width="([\d.]+)"([^/]*)\//g)]
  .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4], stroke: m[5], w: +m[6], dash: /dasharray/.test(m[7]) }))
  .filter((l) => Math.abs(l.x1 - l.x2) > 1 && Math.abs(l.y1 - l.y2) > 1 && l.w >= 2)
  .map((l) => ({ ...l, q1: ((l.x1 - x0) / (x1 - x0)) * xMax, v1: ((yBot - l.y1) / (yBot - yTop)) * yMax,
                 q2: ((l.x2 - x0) / (x1 - x0)) * xMax, v2: ((yBot - l.y2) / (yBot - yTop)) * yMax }));
console.log(`sloping lines drawn: ${lines.length}`);
for (const l of lines) console.log(`  ${l.dash ? 'dashed' : 'solid '} ${l.stroke}  (${l.q1.toFixed(2)}, ${l.v1.toFixed(2)}) → (${l.q2.toFixed(2)}, ${l.v2.toFixed(2)})  gradient ${((l.v2 - l.v1) / (l.q2 - l.q1)).toFixed(2)}`);

/* For each market: a DASHED line of gradient -2b from the AR intercept, crossing MC at the marked q. */
for (const m of [PD.less, PD.more]) {
  const mr = lines.find((l) => l.dash && Math.abs(l.v1 - m.a) < 0.5 && Math.abs((l.v2 - l.v1) / (l.q2 - l.q1) + 2 * m.b) < 0.05);
  if (!mr) { fail.push(`${m.label}: no MR line of gradient ${-2 * m.b} from the AR intercept ${m.a}`); continue; }
  const qAtMc = (m.a - PD.mc) / (2 * m.b);
  if (Math.abs(qAtMc - m.q) > 0.01) fail.push(`${m.label}: the drawn MR meets MC=${PD.mc} at ${qAtMc}, but the read-off is marked at ${m.q}`);
  const ar = lines.find((l) => !l.dash && Math.abs(l.v1 - m.a) < 0.5 && Math.abs((l.v2 - l.v1) / (l.q2 - l.q1) + m.b) < 0.05);
  if (!ar) fail.push(`${m.label}: no AR line of gradient ${-m.b}`);
  else if (Math.abs((m.a - m.b * m.q) - m.price) > 0.01) fail.push(`${m.label}: the price above q=${m.q} is not on the drawn AR`);
  else console.log(`  ${m.label}: MR (gradient ${-2 * m.b}) meets MC=${PD.mc} at q=${qAtMc}, AR gives $${m.a - m.b * m.q} there — matches the marked read-off ${m.q} at ${m.price}`);
}

/* The note may not name a curve the picture does not draw — and this parser PRINTS what it parsed,
   because its first version matched <tspan>, found nothing, and reported "caption mentions MR:
   false" over a caption that says MR twice. A check that reads an empty string always passes. */
const noteLines = texts.filter((t) => t.y > 300).map((t) => t.s);
const note = noteLines.join(' ');
if (!note.trim()) fail.push('the caption parser read NOTHING — it is not measuring the caption');
console.log(`\ncaption parsed (${noteLines.length} lines, ${note.length} chars): ${note.slice(0, 90)}…`);
for (const curve of ['MR', 'AR']) {
  const named = new RegExp(`\\b${curve}\\b`).test(note);
  const drawn = texts.some((t) => t.y <= 300 && new RegExp(`(^|\\W)${curve}(\\W|$)`).test(t.s));
  console.log(`  caption names ${curve}: ${named} · ${curve} labelled in the plot: ${drawn}`);
  if (named && !drawn) fail.push(`the caption names ${curve} and no ${curve} label is drawn — the V031 defect`);
}

console.log(fail.length ? `\nFAIL:\n  ${fail.join('\n  ')}` : '\nOK: every claim in the caption is drawn in the picture');
process.exit(fail.length ? 1 : 0);
