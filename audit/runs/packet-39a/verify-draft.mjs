/**
 * PACKET 39a — gate item 5: the SERVED draft, field by field, against the staged bundle.
 *
 *   node audit/runs/packet-39a/verify-draft.mjs
 *
 * The runner is the only writer to `draft`, so a fix applied to a module and re-dumped leaves a
 * repository that agrees with itself while the database still holds the defect. Nothing else in the
 * gate can see that: `validate` and `npm test` read files, and Verify A reads the diff. This reads
 * what the API actually returns.
 *
 * TWO THINGS THAT ARE NOT DEFECTS, AND THE FIRST COST A WHOLE COMPARISON.
 *
 *   1. **`JSON.stringify` IS KEY-ORDER SENSITIVE.** The first version of this check compared
 *      stringified subsections and reported all 25 as differing; a deep diff showed the only
 *      difference was that the wire serialises `{text, type}` where the bundle holds `{type, text}`.
 *      Fifty-four mismatches, none of them real. Deep equality here is order-insensitive by
 *      construction, so the check cannot make that mistake again.
 *   2. **`quizIndices` IS REMAPPED ON THE WIRE**, because the anonymous payload is trimmed to
 *      `FREE_QUIZ_MAX` and the indices have to point into the trimmed array. The bundle's
 *      `[3,4,5,6]` becomes `[0]`. That is the shipping behaviour packet 33 measured, so this file
 *      asserts what the remapped index RESOLVES TO rather than that the numbers match.
 */
import { readFileSync } from 'node:fs';

const URL = process.argv[2] || 'http://localhost:3001/api/sections/trade-global-economy?draft=1';
const BUNDLE = 'audit/snapshots/packet-39a-bundle__economics__trade-global-economy.json';

const problems = [];
const bad = (m) => problems.push(m);

/** Order-insensitive deep equality. Arrays keep their order; object keys do not have one. */
function same(a, b, path = '') {
  if (a === b) return true;
  if (typeof a !== typeof b) { bad(`${path}: types differ (${typeof a} vs ${typeof b})`); return false; }
  if (a === null || b === null || typeof a !== 'object') { bad(`${path}: ${JSON.stringify(a)?.slice(0, 80)} vs ${JSON.stringify(b)?.slice(0, 80)}`); return false; }
  if (Array.isArray(a) !== Array.isArray(b)) { bad(`${path}: array against object`); return false; }
  if (Array.isArray(a)) {
    if (a.length !== b.length) { bad(`${path}: ${a.length} items against ${b.length}`); return false; }
    return a.every((x, i) => same(x, b[i], `${path}[${i}]`));
  }
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  let ok = true;
  for (const k of keys) {
    if (!(k in a)) { bad(`${path}.${k}: missing on the wire`); ok = false; continue; }
    if (!(k in b)) { bad(`${path}.${k}: on the wire and not in the bundle`); ok = false; continue; }
    if (!same(a[k], b[k], `${path}.${k}`)) ok = false;
  }
  return ok;
}

const res = await fetch(URL);
if (!res.ok) throw new Error(`${URL} returned ${res.status}`);
const wire = await res.json();
const mine = JSON.parse(readFileSync(BUNDLE, 'utf8'));

/* ── the teaching text, which is what a student reads ── */
if (wire.content.length !== mine.content.length) bad(`block count: ${wire.content.length} on the wire, ${mine.content.length} in the bundle`);
let subs = 0;
wire.content.forEach((wb, bi) => {
  const mb = mine.content[bi];
  if (!mb) return bad(`block ${bi} is on the wire and not in the bundle`);
  same(wb.title, mb.title, `content[${bi}].title`);
  same(wb.takeaway, mb.takeaway, `content[${bi}].takeaway`);
  same(wb.diagramId, mb.diagramId, `content[${bi}].diagramId`);
  same(wb.practiceIndices, mb.practiceIndices, `content[${bi}].practiceIndices`);
  (wb.sections || []).forEach((ws, si) => {
    subs += 1;
    same(ws, mb.sections[si], `content[${bi}].sections[${si}]`);
  });
});

/* ── the free quiz payload: what each chapter's remapped index RESOLVES TO ── */
const mineIds = mine.quiz.map((q) => q.id);
const pinnedPerBlock = mine.content.map((b) => (b.quizIndices || []).map((i) => mineIds[i]));
const allPinned = new Set(pinnedPerBlock.flat());
const unpinned = mineIds.filter((id) => !allPinned.has(id));

for (const q of wire.quiz) if (!mineIds.includes(q.id)) bad(`served quiz item ${q.id} is not in the staged bundle`);
wire.content.forEach((wb, bi) => {
  const resolved = (wb.quizIndices || []).map((i) => wire.quiz[i]).filter(Boolean);
  if (!resolved.length) return bad(`chapter ${bi} "${wb.title}" resolves no question in the anonymous payload`);
  for (const item of resolved) {
    if (!pinnedPerBlock[bi].includes(item.id)) bad(`chapter ${bi} "${wb.title}" resolves ${item.id}, which is pinned to another chapter`);
  }
});
const servedUnpinned = wire.quiz.filter((q) => unpinned.includes(q.id)).length;
if (servedUnpinned < 3) bad(`only ${servedUnpinned} of the three pre-test items reached the anonymous payload`);

/* ── everything else that ships whole ── */
for (const key of ['practice', 'diagrams', 'notes']) same(wire[key], mine[key], key);

/*
 * EXTRAS ARE SLICED FOR AN ANONYMOUS READER — `previewMode` hands over one chain and one
 * evaluation frame out of six each (packet 28, V028). So the assertion is that what ships is
 * IDENTICAL TO THE BUNDLE'S FIRST ENTRY, not that the lists are the same length.
 */
for (const key of ['chains', 'evaluation']) {
  const served = wire.extras?.[key] || [];
  const bundled = mine.extras?.[key] || [];
  if (!served.length) { bad(`extras.${key}: nothing shipped to an anonymous reader`); continue; }
  if (served.length >= bundled.length) { bad(`extras.${key}: ${served.length} shipped of ${bundled.length} — the preview slice is not applying`); continue; }
  served.forEach((entry, i) => same(entry, bundled[i], `extras.${key}[${i}]`));
}

/* ── figures re-parsed out of the SERVED characters, not imported ── */
const text = JSON.stringify(wire);
const must = [
  ['109.1', 'the terms of trade'],
  ['84', 'the export revenue index'],
  ['$42.0bn', 'exports after the price rise'],
  ['$55.0bn', 'imports after the price rise'],
  ['$13.0bn', 'the trade deficit'],
  ['100 grain', 'output with trade'],
];
for (const [figure, what] of must) if (!text.includes(figure)) bad(`${what} (${figure}) is not in the served draft`);
for (const banned of ['Marshall', 'Prebisch']) if (text.includes(banned)) bad(`"${banned}" is on the wire`);

/* The printed ratio must divide the printed quantities, checked on the served characters. */
{
  const m = text.match(/(\d+) ÷ (\d+) × 100 = \*?\*?(\d+\.\d)/);
  if (!m) bad('the terms-of-trade calculation is not printed in the served draft');
  else {
    const [, x, i, r] = m;
    const want = (Math.round((1000 * Number(x)) / Number(i)) / 10).toFixed(1);
    if (r !== want) bad(`the served draft prints ${x} ÷ ${i} × 100 = ${r}, and those figures give ${want}`);
  }
}

console.log(`served draft · ${URL}`);
console.log(`  ${wire.content.length} blocks · ${subs} subsections compared field by field`);
console.log(`  anonymous payload: ${wire.quiz.length} quiz items, ${wire.content.length} chapters each resolving one, ${servedUnpinned} for the pre-test`);
console.log(`  practice ${wire.practice.length} · diagrams ${wire.diagrams.length} · notes ${wire.notes.length}`);
console.log(`  extras sliced for preview: ${wire.extras?.chains?.length ?? 0} of ${mine.extras.chains.length} chains, ${wire.extras?.evaluation?.length ?? 0} of ${mine.extras.evaluation.length} evaluation frames`);
if (problems.length) {
  console.log(`\n${problems.length} mismatch${problems.length === 1 ? '' : 'es'}:`);
  for (const p of problems.slice(0, 40)) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log('\nthe served draft matches the staged bundle field by field.');
