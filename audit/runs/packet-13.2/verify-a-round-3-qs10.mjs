/* Verify A round 3 — the Economics QS10 card, read off the shipping build.
 *
 * Nothing here re-implements the template. Every string tested is the one CalculationItem
 * renders (stem, step.label, step.method, step.choices, the notes markStep returns, and
 * item.solution), pulled out of buildItem() and parsed for the numbers a student can see.
 *
 *   node audit/runs/packet-13.2/verify-a-round-3-qs10.mjs [draws]
 */
import { buildItem, markItem, markStep } from '../../../lib/quant/index.mjs';

const DRAWS = Number(process.argv[2]) || 20000;
const TOL = 0.05;                       // step one's own tolerance
const ID = 'percentage-change-economics';

const nums = (s) => [...String(s).replace(/\*\*/g, '').matchAll(/-?\d[\d,]*(?:\.\d+)?/g)]
  .map((m) => Number(m[0].replace(/,/g, '')));

const report = {
  faceDirect: [], facePair: [], noteDirect: [], notePair: [], methodPair: [],
  noteArith: [], solArith: [],
};
const seen = { stems: new Set(), pairs: new Set(), pcts: new Set(), econ: new Set() };
let maxAsPctErr = 0, maxSolLine3Err = 0, maxSolLine2Err = 0, maxForecastErr = 0;

const push = (bucket, seed, detail) => { if (report[bucket].length < 8) report[bucket].push(`${seed}: ${detail}`); };

for (let i = 0; i < DRAWS; i++) {
  const seed = `r3-${i}`;
  const item = buildItem(ID, seed);
  const d = item.data;
  const pct = d.pct;
  seen.stems.add(item.stem);
  seen.pcts.add(pct);
  seen.econ.add(d.context);
  seen.pairs.add(`${d.rateNow}/${d.rateNext}/${d.points}/${d.asPctOfRate}`);

  const [s1, s2, s3] = item.steps;

  // ── what the card shows BEFORE anything is answered ──────────────────────────────
  const faceStrings = [item.stem, s1.label, s2.label, s3.label, ...(s3.choices || [])];
  const face = faceStrings.flatMap(nums);
  const methodConsts = [s1.method, s2.method, s3.method].flatMap(nums);   // 100, 1, …

  for (const t of face) if (Math.abs(t - pct) <= TOL) push('faceDirect', seed, `${t} is step one's answer ${pct}`);
  for (let a = 0; a < face.length; a++) for (let b = 0; b < face.length; b++) {
    if (a === b) continue;
    if (Math.abs(face[a] + face[b] - pct) <= TOL) push('facePair', seed, `${face[a]} + ${face[b]} = ${pct}`);
    if (Math.abs(face[a] - face[b] - pct) <= TOL) push('facePair', seed, `${face[a]} − ${face[b]} = ${pct}`);
  }
  for (const m of methodConsts) for (const t of face) {
    if (Math.abs(m - t - pct) <= TOL) push('methodPair', seed, `${m} (method line) − ${t} = ${pct}`);
  }

  // ── what the card shows AFTER marking, excluding step one's own note (which gives the
  //    answer on purpose: marking.mjs:96-101, packet 13.2 fix 6) ─────────────────────
  const noteStrings = [];
  for (const slip of s2.slips || []) noteStrings.push(slip.note);
  noteStrings.push(markStep(s2, s2.answer + 12345.6, { change: null }).note);   // step two, wrong
  noteStrings.push(s3.correctNote, s3.wrongNote);
  noteStrings.push(markStep(s3, 'nonsense', {}).note);
  const noteNums = noteStrings.flatMap(nums);
  for (const t of noteNums) if (Math.abs(t - pct) <= TOL) push('noteDirect', seed, `${t} in a note is step one's answer ${pct}`);
  const all = [...face, ...noteNums];
  for (let a = 0; a < all.length; a++) for (let b = 0; b < all.length; b++) {
    if (a === b) continue;
    if (Math.abs(all[a] + all[b] - pct) <= TOL || Math.abs(all[a] - all[b] - pct) <= TOL) {
      if (!(face.includes(all[a]) && face.includes(all[b]))) push('notePair', seed, `${all[a]} ± ${all[b]} = ${pct}`);
    }
  }

  // ── is the arithmetic the card asserts TRUE? ─────────────────────────────────────
  // correctNote: "X% to Y% is a fall of Z percentage point(s)."
  const cn = nums(s3.correctNote);
  if (Math.abs((cn[0] - cn[1]) - cn[2]) > 1e-9) push('noteArith', seed, `correctNote: ${cn[0]} − ${cn[1]} ≠ ${cn[2]}`);
  // wrongNote: "It is Z percentage points … W% is the same fall measured against the rate itself"
  const wn = nums(s3.wrongNote);
  const asPctTrue = (wn[0] / d.rateNow) * 100;
  maxAsPctErr = Math.max(maxAsPctErr, Math.abs(wn[1] - asPctTrue));
  if (Math.abs(wn[1] - asPctTrue) > 0.05 + 1e-9) push('noteArith', seed, `wrongNote: ${wn[1]}% vs true ${asPctTrue.toFixed(4)}%`);

  // solution lines, each parsed and re-computed
  const L = item.solution.map(nums);
  if (Math.abs((L[0][0] - L[0][1]) - L[0][2]) > 1e-6) push('solArith', seed, `line 1: ${L[0][0]} − ${L[0][1]} ≠ ${L[0][2]}`);
  const line2 = (L[1][0] / L[1][1]) * 100;
  maxSolLine2Err = Math.max(maxSolLine2Err, Math.abs(line2 - L[1][3]));
  if (Math.abs(line2 - L[1][3]) > 0.005) push('solArith', seed, `line 2: ${L[1][0]}/${L[1][1]}×100 = ${line2.toFixed(4)} printed ${L[1][3]}`);
  const line3 = L[2][0] * L[2][1];
  maxSolLine3Err = Math.max(maxSolLine3Err, Math.abs(line3 - L[2][2]));
  if (Math.abs(line3 - L[2][2]) > 0.005 + 1e-9) push('solArith', seed, `line 3: ${L[2][0]} × ${L[2][1]} = ${line3} printed ${L[2][2]}`);
  const L4 = L[3];
  if (Math.abs((L4[0] - L4[1]) - L4[2]) > 1e-9) push('solArith', seed, `line 4: ${L4[0]} − ${L4[1]} ≠ ${L4[2]}`);

  // step two's declared answer against the exact figure
  maxForecastErr = Math.max(maxForecastErr, Math.abs(s2.answer - d.after * (1 + pct / 100)));

  // the marker still gives full marks on the card's own answers
  const clean = markItem(item, Object.fromEntries(item.steps.map((s) => [s.id, s.answer])));
  if (clean.awarded !== clean.total) push('solArith', seed, `own answers scored ${clean.awarded}/${clean.total}`);
}

console.log(`draws: ${DRAWS}`);
console.log(`distinct stems: ${seen.stems.size} · economies: ${seen.econ.size} · growth rates drawn: ${[...seen.pcts].sort((a, b) => a - b).join(', ')}`);
console.log(`distinct forecast pairs seen: ${seen.pairs.size}`);
console.log(`max |asPctOfRate printed − true|: ${maxAsPctErr.toFixed(4)} pp`);
console.log(`max |solution line 2 − printed|: ${maxSolLine2Err.toFixed(6)}`);
console.log(`max |solution line 3 product − printed|: ${maxSolLine3Err.toFixed(6)} bn`);
console.log(`max |step two answer − exact|: ${maxForecastErr.toFixed(6)} bn`);
for (const [k, v] of Object.entries(report)) {
  console.log(`\n${k}: ${v.length === 0 ? 'none' : `${v.length}${v.length >= 8 ? '+' : ''}`}`);
  for (const line of v) console.log(`   ${line}`);
}
