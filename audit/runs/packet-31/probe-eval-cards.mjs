/*
 * V035 probe — what does a student SEE on an evaluation card?
 *
 * Independence (the programme's rule: a check that reuses the fix's logic cannot see its blind
 * spot). This does NOT re-implement `extras.shape`, and it does not hard-code the field name
 * `content`. It PARSES `components/ExtrasTab.jsx`, extracts the `displayEvaluation.map` block by
 * brace matching, and reads out every `{point.<path>}` the component interpolates. The set of
 * fields a card renders is therefore whatever the SHIPPING FILE says it is — if somebody widens
 * the component tomorrow, this probe follows it without being edited. Packet 32's "import the
 * shipping resolver and run it", applied across a file boundary the way packet 2.6 forced.
 */
import { readFileSync, readdirSync } from 'node:fs';

const SRC = readFileSync('components/ExtrasTab.jsx', 'utf8');
const THROWS = 'RENDER-THROWS';

/* ── 1. find the evaluation card block, by brace matching from `displayEvaluation.map` ───────── */
const start = SRC.indexOf('displayEvaluation.map');
if (start < 0) throw new Error('ExtrasTab.jsx no longer contains `displayEvaluation.map` — the probe is reading the wrong file or the component was restructured');
let depth = 0, i = SRC.indexOf('(', start), end = -1;
for (; i < SRC.length; i++) {
  if (SRC[i] === '(') depth++;
  else if (SRC[i] === ')') { depth--; if (depth === 0) { end = i; break; } }
}
if (end < 0) throw new Error('could not brace-match the displayEvaluation.map call');
const BLOCK = SRC.slice(start, end);

/* ── 2. every field of the mapped item the block interpolates ────────────────────────────────── */
const param = (BLOCK.match(/displayEvaluation\.map\(\s*\(?\s*([A-Za-z_$][\w$]*)/) || [])[1];
if (!param) throw new Error('could not read the map callback parameter name');
const fieldsIn = (s) => [...new Set([...s.matchAll(new RegExp(`\\b${param}\\.([A-Za-z_$][\\w$]*)`, 'g'))].map((m) => m[1]))];
const READS = fieldsIn(BLOCK);
if (!READS.length) throw new Error(`the card block reads no field off \`${param}\` — the probe is not measuring anything`);

/* Which of those the component puts in the CARD BODY and which in the heading, so the report can
 * say "a question and no answer" rather than only "a field is missing". */
const bodyMatch = BLOCK.match(/className="eval-content"[\s\S]*?<\/div>/);
const headMatch = BLOCK.match(/extras-card-title[\s\S]*?<\/h3>/);
const bodyReads = bodyMatch ? fieldsIn(bodyMatch[0]) : [];
const headReads = headMatch ? fieldsIn(headMatch[0]) : [];
if (!bodyReads.length) throw new Error('could not locate the card body in ExtrasTab.jsx — refusing to report green from a selector that matched nothing');

console.log(`ExtrasTab.jsx renders an evaluation card from: ${READS.map((r) => `${param}.${r}`).join(', ')}`);
console.log(`  heading: ${headReads.join(', ') || '(none)'}   body: ${bodyReads.join(', ')}\n`);

/* ── 3. what React would print for each field: null/undefined/booleans print nothing, an array of
 *      strings concatenates, a plain object THROWS ──────────────────────────────────────────── */
const printed = (v) => {
  if (v == null || v === false || v === true) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) return v.map(printed).join('');
  return THROWS;
};

const BUNDLES = readdirSync('audit/snapshots').filter((f) => /^packet-[\d.a-z]+-bundle__/.test(f)).sort();
/* A selector that matches nothing exits 0 and reads as a pass. The programme has been bitten by
 * that shape twice (packet 35's unreachable gloss guards, packet 38's wrong DB column), so the
 * probe refuses to report green on an empty corpus. */
if (!BUNDLES.length) throw new Error('no staged bundles matched in audit/snapshots — refusing to report green on an empty corpus');
let blank = 0, total = 0;
const sections = new Set();
const rows = [];

for (const f of BUNDLES) {
  const b = JSON.parse(readFileSync(`audit/snapshots/${f}`, 'utf8'));
  const evals = b?.tables?.extras?.evaluation;
  if (!Array.isArray(evals)) continue;
  evals.forEach((e, n) => {
    total++;
    const head = headReads.map((k) => printed(e?.[k])).join('').trim();
    const body = bodyReads.map((k) => printed(e?.[k])).join('').trim();
    if (!body || body === THROWS) {
      blank++;
      sections.add(b.section_id);
      rows.push({ section: b.section_id, n: n + 1, head, body, keys: Object.keys(e || {}) });
    }
  });
}

console.log(`${total} evaluation frames across ${BUNDLES.length} staged bundles.`);
console.log(`${blank} render an EMPTY BODY, across ${sections.size} sections: ${[...sections].join(', ')}\n`);
for (const r of rows) {
  const unread = r.keys.filter((k) => !READS.includes(k));
  console.log(`  ${r.section} #${r.n}`);
  console.log(`    heading: ${r.head ? `"${r.head.slice(0, 72)}"` : '(BLANK TOO)'}`);
  console.log(`    body:    ${r.body === THROWS ? 'THROWS (object child)' : '(BLANK)'}`);
  console.log(`    authored keys: {${r.keys.join(', ')}}   never read: {${unread.join(', ') || '—'}}`);
}
process.exit(blank ? 1 : 0);
