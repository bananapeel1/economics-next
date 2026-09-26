#!/usr/bin/env node
/**
 * Packet 15.1 — diagram guard for introductory-concepts, run against the dumped bundle.
 *   node audit/runs/packet-15.1/diagram-guard.mjs <bundle.json> <main diagram-enlarge.mjs>
 * Three measures, per scenario:
 *   1. collisions: packet 40's glyph-box guard at COLLIDE_TOL 1.2 of the face, and lines through labels
 *      including vertical segments (packet 31's fix) — the same code as scripts/packet-43-economic-growth.mjs;
 *   2. extent: no label runs off the viewBox;
 *   3. phone size: the smallest label inline at 390px (306.74px render width, packet 36) and in main's
 *      enlarge sheet at the "read" stop (lib/diagram-enlarge.js on origin/main, packet 11 / V037).
 * An A/B at the bottom proves the collision and line checks can fire.
 */
import { readFileSync } from 'node:fs';
const [bundlePath, enlargePath] = process.argv.slice(2);
const { enlargeWidthPx, TARGET_PX } = await import(enlargePath);
const t = JSON.parse(readFileSync(bundlePath, 'utf8')).tables;
const COLLIDE_TOL = 1.2, INLINE = 306.74;
const estWidth = (text, size) => String(text).length * size * 0.56;
const textsOf = (s) => [...s.matchAll(/<text\b([^>]*)>([\s\S]*?)<\/text>/g)].map((m) => {
  const attr = (k) => { const r = m[1].match(new RegExp(`\\b${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2].replace(/<[^>]+>/g, ''), x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 12, anchor: attr('text-anchor') || 'start', rotated: /rotate\(/.test(m[1]) };
});
const linesOf = (s) => [...s.matchAll(/<line\b([^>]*)\/?>/g)].map((m) => {
  const attr = (k) => { const r = m[1].match(new RegExp(`\\b${k}="([^"]*)"`)); return r ? parseFloat(r[1]) : null; };
  return { x1: attr('x1'), y1: attr('y1'), x2: attr('x2'), y2: attr('y2') };
});
const boxesOf = (s) => textsOf(s).filter((tx) => tx.body.trim() && !tx.rotated).map((tx) => {
  const w = estWidth(tx.body, tx.size);
  const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
  return { ...tx, left, right: left + w, top: tx.y - tx.size * 0.8, bottom: tx.y + tx.size * 0.25 };
});
const collides = (a, b) => Math.abs(a.y - b.y) <= COLLIDE_TOL * Math.max(a.size, b.size) * 0.5 + (a.size + b.size) * 0.25 && a.left < b.right && b.left < a.right && Math.abs(a.y - b.y) < Math.max(a.size, b.size) * COLLIDE_TOL;
const crossed = (ln, bx) => {
  if ([ln.x1, ln.y1, ln.x2, ln.y2].some((v) => v === null || Number.isNaN(v))) return false;
  const from = Math.max(Math.min(ln.x1, ln.x2), bx.left), to = Math.min(Math.max(ln.x1, ln.x2), bx.right);
  if (from > to) return false;
  const yAt = (x) => ln.y1 + ((x - ln.x1) / (ln.x2 - ln.x1)) * (ln.y2 - ln.y1);
  const ys = ln.x2 === ln.x1 ? [ln.y1, ln.y2] : [yAt(from), yAt(to)];
  return ys.some((y) => y >= bx.top && y <= bx.bottom) || (Math.min(...ys) < bx.top && Math.max(...ys) > bx.bottom);
};
let bad = 0;
for (const d of t.diagrams) for (const sc of (d.scenarios?.length ? d.scenarios : [{ label: "(single view)", svg: d.svg }])) {
  const svg = String(sc.svg || ''); const vb = svg.match(/viewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number) || [0, 0, 500, 330];
  const boxes = boxesOf(svg); const where = `${d.title} / ${sc.label || sc.title || '?'}`;
  for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++)
    if (collides(boxes[i], boxes[j])) { bad++; console.log(`COLLIDE  ${where}: "${boxes[i].body.slice(0, 28)}" y=${boxes[i].y} / "${boxes[j].body.slice(0, 28)}" y=${boxes[j].y}`); }
  for (const ln of linesOf(svg)) for (const bx of boxes) if (crossed(ln, bx)) { bad++; console.log(`LINE     ${where}: (${ln.x1},${ln.y1})→(${ln.x2},${ln.y2}) through "${bx.body.slice(0, 28)}"`); }
  for (const bx of boxes) if (bx.left < vb[0] - 2 || bx.right > vb[0] + vb[2] + 2) { bad++; console.log(`EXTENT   ${where}: "${bx.body.slice(0, 28)}" ${Math.round(bx.left)}-${Math.round(bx.right)} of ${vb[2]}`); }
  const minFace = Math.min(...textsOf(svg).map((x) => x.size));
  const read = enlargeWidthPx('read', { vbW: vb[2], minFace, paneWidth: 390, fitWidth: 358 });
  console.log(`size     ${where}: vb ${vb[2]}u, smallest ${minFace}u → inline ${(minFace * INLINE / vb[2]).toFixed(2)}px, enlarge "read" ${(minFace * read / vb[2]).toFixed(2)}px (target ${TARGET_PX})`);
}
// A/B: a pair drawn on top of each other must collide; a line straight through a label must cross it.
const a = boxesOf('<text x="100" y="100" font-size="12">Consumer goods</text>')[0], b = boxesOf('<text x="110" y="104" font-size="12">Capital</text>')[0];
const c = boxesOf('<text x="100" y="160" font-size="12">Capital</text>')[0];
if (!collides(a, b)) { bad++; console.log('A/B FAIL: overlapping pair not caught'); }
if (collides(a, c)) { bad++; console.log('A/B FAIL: pair 60 units apart reported'); }
if (!crossed({ x1: 120, y1: 50, x2: 120, y2: 150 }, a)) { bad++; console.log('A/B FAIL: vertical line through a label not caught'); }
console.log(bad ? `\n${bad} problem(s)` : '\nclean: 0 collisions, 0 lines through labels, 0 off-canvas; A/B fires');
process.exit(bad ? 1 : 0);
