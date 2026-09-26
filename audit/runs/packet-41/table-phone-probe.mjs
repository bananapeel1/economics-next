/*
 * Fix round B1 — an INDEPENDENT reading of what a declared table emits.
 *
 * It does not import the emitter's constants. It parses the emitted SVG string for viewBox,
 * font-size and text geometry, and it carries its OWN width model and its OWN column figure
 * (313px, the Learn Mode card Verify B measured in the browser at 390px, not a number this
 * repository computes), so a change to TBLP cannot move the yardstick with the fix.
 */
import { ALL_DIAGRAMS } from '../../../scripts/_packet41-diagrams.mjs';

const CARD_390 = 313;     // Verify B, browser-measured at a 390px viewport
const SHEET_VIEWPORT = 390;
const FLOOR_PX = 12;

const nodes = (svg) => [...svg.matchAll(/<text x="([\d.\-]+)" y="([\d.\-]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)]
  .map((m) => ({ x: +m[1], y: +m[2], size: +m[3], anchor: m[4], text: m[5] }));
/* a width model of its own: 0.62em average over DM Sans lower case, 0.95em for a 1-3 char run */
const w = (s, size) => s.length * size * (s.length < 4 ? 0.95 : 0.62);

let bad = 0;
for (const d of ALL_DIAGRAMS) {
  for (const s of d.scenarios) {
    const vb = s.svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    const [vw, vh] = [+vb[1], +vb[2]];
    const ns = nodes(s.svg);
    const smallest = Math.min(...ns.map((n) => n.size));
    const inline = smallest * (CARD_390 / vw);
    const sheet = vw;                       // "Read" draws 1:1 with the viewBox
    const overflow = Math.max(0, ...ns.map((n) => (n.anchor === 'middle' ? n.x + w(n.text, n.size) / 2 : n.anchor === 'end' ? n.x : n.x + w(n.text, n.size)) - vw));
    const tag = d.kind === 'table' ? 'TABLE' : 'drawn';
    const ok = d.kind !== 'table' || (inline >= FLOOR_PX && sheet <= SHEET_VIEWPORT && overflow <= 0.5);
    if (!ok) bad += 1;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${tag} ${vw}x${vh} min=${smallest}u inline390=${inline.toFixed(2)}px readSheet=${sheet}px sideScroll=${sheet > SHEET_VIEWPORT ? 'YES' : 'none'} overflow=${overflow.toFixed(2)}u  ${d.title}`);
  }
}
console.log(bad ? `\n${bad} declared table(s) still fail the phone floor` : '\nevery declared table: >= 12px inline at 390px, and no sideways scroll at 1:1');
process.exit(bad ? 1 : 0);
