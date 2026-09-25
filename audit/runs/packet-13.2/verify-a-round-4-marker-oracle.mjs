/*
 * Verify A round 4. The independent probe.
 *
 * check 7 asks "is the answer's STRING printed?". This asks the question the defect is actually
 * about — "is there any number a student can see before answering that the REAL MARKER would score
 * correct?" — by tokenising every visible field and handing each token to markStep. It is blind to
 * check 7's sign, boundary and formatting decisions, which is the point: a check that reuses the
 * implementation cannot see the implementation's blind spot.
 *
 *   node audit/runs/packet-13.2/verify-a-round-4-marker-oracle.mjs
 *
 * Result (5,000 draws × 8 templates): seven templates CLEAN. `payback` leaks its 2-mark `months`
 * answer into verdict.choice1 and verdict.choice2 in 5,000 of 5,000 draws. The remaining rows are
 * the coincidences the small-integer exemption exists for, and the "× 100" method-line false
 * positive — i.e. this probe also shows what the exemptions legitimately buy.
 */
import { templates, buildItem, markStep } from '../../../lib/quant/index.mjs';

const fieldsOf = (item) => {
  const f = [['stem', item.stem]];
  for (const s of item.steps) {
    if (s.label) f.push([`${s.id}.label`, s.label]);
    if (s.method) f.push([`${s.id}.method`, s.method]);
    if (s.prefix) f.push([`${s.id}.prefix`, s.prefix]);
    if (s.suffix) f.push([`${s.id}.suffix`, s.suffix]);
    (s.choices || []).forEach((c, i) => f.push([`${s.id}.choice${i + 1}`, c]));
  }
  return f;
};
const tokens = (text) =>
  [...String(text).replace(/(\d),(?=\d)/g, '$1').matchAll(/-?\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));

const D = Number(process.argv[2]) || 5000;
for (const t of templates) {
  const tally = {};
  for (let i = 0; i < D; i++) {
    const item = buildItem(t.id, `check-${t.id}-${i}`);
    const fields = fieldsOf(item);
    for (const step of item.steps) {
      if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
      const seen = new Set();
      for (const [name, text] of fields) {
        if (name.startsWith(`${step.id}.`)) continue;      // the step's own affixes are not a leak
        for (const v of tokens(text)) {
          if (markStep(step, v, {}).outcome !== 'correct' || seen.has(name)) continue;
          seen.add(name);
          const k = `${step.id} ← ${name}`;
          (tally[k] ||= { n: 0, eg: null }).n++;
          tally[k].eg ??= { seed: `check-${t.id}-${i}`, v, answer: step.answer, text: String(text).slice(0, 90) };
        }
      }
    }
  }
  const rows = Object.entries(tally).sort((a, b) => b[1].n - a[1].n);
  console.log(`\n${t.id}  —  ${rows.length ? `${rows.length} leaking (step ← field) pairs` : 'CLEAN'}`);
  for (const [k, v] of rows) {
    console.log(`   ${String(v.n).padStart(5)}/${D}  ${k}   e.g. ${v.eg.seed}: answer ${v.eg.answer}, visible ${v.eg.v}`);
    console.log(`            "${v.eg.text.replace(/\*\*/g, '')}"`);
  }
}
