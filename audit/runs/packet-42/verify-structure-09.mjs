/**
 * PACKET 42, fix round 1 — an INDEPENDENT check of C-resource-management-structure-09.
 *
 * The rejection: the three replacement misconceptions were present, but two of the three the
 * finding calls filler survived in `content[3]` subsection `misconception` fields — TQM
 * "guarantees zero defects" and kaizen "a project with a start and an end".
 *
 * WHY THIS FILE EXISTS RATHER THAN A RE-READ OF THE RUNNER'S OWN GATE. The runner's structure-09
 * gate passed the whole time both claims were live, because it read `MISTAKES[].title` and matched
 * two literal strings. A check that finds its evidence the same way the fix does cannot see the
 * fix's blind spot, so this one differs on BOTH axes:
 *
 *   evidence   over HTTP from the served draft (`/api/sections/...?draft=1`) — the row a student
 *              would be served — not from `_packet42-content.mjs` and not from the bundle file the
 *              runner writes. If the module were fixed and the draft never re-staged, this fails.
 *   detection  token overlap against the two REJECTED strings as the verifier quoted them, plus a
 *              claim-shaped scan for all THREE fillers. Not the runner's regexes.
 *
 * And it is A/B'd: the same detector runs over the pre-fix bundle (the control), where it MUST
 * fire twice. A detector that fires nowhere is not evidence of a fix.
 *
 *   node audit/runs/packet-42/verify-structure-09.mjs [controlBundle.json]
 */
import { readFileSync } from 'node:fs';

const URL_ = 'http://localhost:3001/api/sections/resource-management?draft=1';
const CONTROL = process.argv[2];

/* The two fields exactly as the verifier quoted them in the rejection. */
const REJECTED = {
  'Total Quality Management': 'Students write that TQM guarantees zero defects.',
  'Continuous Improvement (Kaizen)': 'Students describe kaizen as a project with a start and an end.',
};

/* Claim-shaped, phrasing-agnostic. Deliberately NOT the runner's patterns. */
const FILLER = [
  ['TQM guarantees zero defects', (s) => /\b(tqm|total quality)\b/i.test(s) && /\b(guarantee|guarantees|promise|promises|ensures?)\b/i.test(s) && /\b(zero|no)\b[^.]{0,40}\b(defect|defects|fault|faults)\b/i.test(s)],
  ['kaizen is a one-off project', (s) => /\b(kaizen|continuous improvement)\b/i.test(s) && /(one-off|one off|a project with|is a project|has a start|start and an end|begins and ends|\bfinite\b)/i.test(s)],
  ['quality control is a bad method businesses should never use', (s) => /\b(quality control|qc)\b/i.test(s) && /(bad method|poor method|should never|never be used|never use|inferior|always worse)/i.test(s)],
];

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
/** Share of the rejected sentence's own words present in the field. Directional on purpose. */
const overlap = (rejected, field) => {
  const A = new Set(norm(rejected));
  const B = new Set(norm(field));
  let n = 0; for (const w of A) if (B.has(w)) n += 1;
  return A.size ? n / A.size : 0;
};

/** Every surface that TEACHES a student error. A wrong quiz option is supposed to state one. */
const surfaces = (tables) => {
  const out = [];
  for (const [bi, b] of (tables.content || []).entries()) {
    for (const [si, s] of (b.sections || []).entries()) {
      out.push({ where: `content[${bi}].sections[${si}]`, title: s.title, text: String(s.misconception ?? '') });
    }
  }
  for (const [mi, m] of (tables.mistakes || []).entries()) {
    out.push({ where: `mistakes[${mi}]`, title: m.title, text: [m.title, m.quote, m.why, m.fix].filter(Boolean).join(' ') });
  }
  return out;
};

const judge = (label, tables) => {
  const rows = surfaces(tables);
  const fired = [];
  for (const r of rows) {
    for (const [why, hit] of FILLER) if (hit(r.text)) fired.push(`${r.where} (${r.title}) still teaches "${why}"`);
    for (const [title, rejected] of Object.entries(REJECTED)) {
      const sc = overlap(rejected, r.text);
      if (r.title === title && sc >= 0.8) fired.push(`${r.where} (${r.title}) is ${(sc * 100).toFixed(0)}% of the rejected sentence's own words`);
    }
  }
  console.log(`\n${label}: ${rows.length} student-error surfaces · ${fired.length} filler claim(s)`);
  for (const f of fired) console.log(`   ${f}`);
  return fired.length;
};

/* ── the served draft ───────────────────────────────────────────────────────── */
const res = await fetch(URL_);
if (!res.ok) { console.error(`draft route ${res.status}`); process.exit(2); }
const served = await res.json();
const tables = served.tables ?? served;
/* `mistakes` is PREMIUM-GATED: the anonymous draft route returns [] while `counts.mistakes` says 8,
   so that surface cannot be evidenced over HTTP signed out. It is judged from the dumped bundle
   instead, and the two are cross-checked for drift below — say which surface came from where rather
   than letting a 0 from an empty array read as a clean one. */
const BUNDLE = 'audit/snapshots/packet-42-bundle__business__resource-management.json';
const dumped = JSON.parse(readFileSync(BUNDLE, 'utf8')).tables;
console.log(`mistakes over HTTP: ${(tables.mistakes || []).length} rows, counts.mistakes ${served.counts?.mistakes} — premium-gated, judged from ${BUNDLE}`);
const live = judge('SERVED DRAFT (HTTP) — subsections', { content: tables.content })
  + judge(`DUMPED BUNDLE — mistakes only (premium-gated over HTTP)`, { mistakes: dumped.mistakes });

/* the dumped file and the served draft must agree on the two fields, or the fix is in the file and
   not in the row: every subsection misconception compared string for string. */
const servedSubs = (tables.content || []).flatMap((b) => b.sections || []);
const dumpedSubs = (dumped.content || []).flatMap((b) => b.sections || []);
const drift = dumpedSubs.filter((d, i) => String(d.misconception) !== String(servedSubs[i]?.misconception));
console.log(`\ndrift file vs served draft, misconception fields: ${drift.length} of ${dumpedSubs.length}`);
for (const d of drift) console.log(`   ${d.title}`);
if (drift.length) process.exit(1);

/* the two fields, printed in full, so a reader is not taking a boolean on trust */
for (const [title] of Object.entries(REJECTED)) {
  const s = (tables.content || []).flatMap((b) => b.sections || []).find((x) => x.title === title);
  console.log(`\n${title}\n   ${s ? s.misconception : 'SUBSECTION MISSING'}`);
}

/* ── A/B: the control must fire, or the detector proves nothing ─────────────── */
let control = null;
if (CONTROL) {
  const c = JSON.parse(readFileSync(CONTROL, 'utf8'));
  control = judge(`CONTROL (${CONTROL})`, c.tables ?? c);
}

const ok = live === 0 && (control === null || control >= 2);
console.log(`\n${ok ? 'PASS' : 'FAIL'} — served draft ${live} filler claim(s)${control === null ? '' : `, control ${control} (must be >= 2)`}`);
process.exit(ok ? 0 : 1);
