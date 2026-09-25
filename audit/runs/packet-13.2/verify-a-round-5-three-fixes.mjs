// Verify A round 5 — the other three round-4 fixes, each A/B'd against the guard as it was.
// Content is held constant and the GUARD is the variable, so a 100%/0% split is the evidence.
import { templates, buildItem } from '../../../lib/quant/index.mjs';
import { exactly } from '../../../lib/quant/format.mjs';

const D = Number(process.argv[2]) || 5000;
const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');

/** Four guards. `abs` = acceptAbs-aware forms; `look` = lookaround boundaries. */
function detect(prose, step, { abs, look }) {
  const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1)))]);
  if (abs && step.acceptAbs) {
    forms.add(String(Math.abs(step.answer)));
    forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
  }
  for (const form of forms) {
    const f = form.replace('.', '\\.');
    const re = look
      ? new RegExp(`(?<![0-9.])(\\$?)${f}(%?)(?![0-9])(?!\\.[0-9])`)
      : new RegExp(`(^|[^0-9.])(\\$?)${f}(%?)([^0-9.]|$)`);
    if (re.test(prose)) return form;
  }
  return null;
}

// ---- 1. acceptAbs ---------------------------------------------------------------------------
// Plant the answer as the card would print it — magnitude only, because marking.mjs:57-58
// accepts the magnitude — then ask each guard whether it sees it.
console.log('1. acceptAbs forms  (the leak is planted; only the guard changes)');
let absSeen = 0, signedSeen = 0, absSteps = 0;
for (let i = 0; i < D; i++) {
  const item = buildItem('ped', `check-ped-${i}`);
  for (const step of item.steps) {
    if (!step.acceptAbs || !Number.isFinite(step.answer) || step.answer >= 0) continue;
    absSteps++;
    const planted = `${item.stem} Quantity fell by ${Math.abs(step.answer)} last week.`;
    if (detect(planted, step, { abs: true, look: true })) absSeen++;
    if (detect(planted, step, { abs: false, look: true })) signedSeen++;
  }
}
console.log(`   ped, ${absSteps} acceptAbs steps with a negative answer over ${D} draws`);
console.log(`   guard AS SHIPPED (abs-aware) sees : ${absSeen}`);
console.log(`   guard AS IT WAS  (signed only) sees: ${signedSeen}`);

// ---- 2. the right boundary --------------------------------------------------------------------
// Round 4's demonstration, re-run: the same leak mid-sentence and sentence-final.
console.log('\n2. the right boundary  (same leak, two positions)');
let midLook = 0, endLook = 0, midClass = 0, endClass = 0, n = 0;
for (let i = 0; i < D; i++) {
  const item = buildItem('payback', `check-payback-${i}`);
  const step = item.steps.find((s) => s.id === 'shortfall');
  n++;
  const mid = `Cash flows are year 1 $20,000, year 2 $${step.answer.toLocaleString('en-US')}, year 3 $40,000.`;
  const end = `Cash flows are year 1 $20,000, year 2 $40,000, year 3 $${step.answer.toLocaleString('en-US')}.`;
  if (detect(strip([mid]), step, { abs: true, look: true })) midLook++;
  if (detect(strip([end]), step, { abs: true, look: true })) endLook++;
  if (detect(strip([mid]), step, { abs: true, look: false })) midClass++;
  if (detect(strip([end]), step, { abs: true, look: false })) endClass++;
}
console.log(`   ${n} planted stems`);
console.log(`   lookarounds  (AS SHIPPED): mid-sentence ${midLook}, sentence-final ${endLook}`);
console.log(`   char classes (AS IT WAS ): mid-sentence ${midClass}, sentence-final ${endClass}`);

// ---- 3. exactly() in index-numbers and percentage-change ---------------------------------------
console.log('\n3. `exactly` — is every `=` in a worked solution actually exact?');
const SITES = {
  'index-numbers': (d) => ({ value: (d.newMoneyWage * 100) / d.laterIndex, dp: 2, line: 2 }),
  'percentage-change-business': (d) => ({ value: d.after * (1 + d.pct / 100), dp: 2, line: 2 }),
  'percentage-change-economics': (d) => ({ value: d.after * (1 + d.pct / 100), dp: 2, line: 2 }),
};
for (const [id, pick] of Object.entries(SITES)) {
  let approx = 0, eq = 0, lies = 0, egLie = null;
  for (let i = 0; i < D; i++) {
    const item = buildItem(id, `check-${id}-${i}`);
    const { value, dp, line } = pick(item.data);
    const sign = exactly(value, dp);
    const text = item.solution[line];
    if (!text.includes(sign)) { lies++; egLie = egLie || `sign ${sign} not in: ${text}`; continue; }
    if (sign === '≈') approx++;
    else {
      eq++;
      if (Math.abs(value - Number(value.toFixed(dp))) > 1e-9) { lies++; egLie = egLie || text; }
    }
  }
  console.log(`   ${id.padEnd(28)} = ${String(eq).padStart(5)}   ≈ ${String(approx).padStart(5)}   dishonest ${lies}`);
  if (egLie) console.log(`      e.g. ${egLie}`);
}

// Every OTHER solution line, in every template, that claims `=` over a rounded figure.
console.log('\n   any remaining `=` over a rounding, all 8 templates, scanned from the rendered line:');
let remaining = 0, egRem = null;
for (const t of templates) {
  for (let i = 0; i < D; i++) {
    const item = buildItem(t.id, `check-${t.id}-${i}`);
    for (const line of item.solution) {
      // "<lhs> = <rhs>" where both sides are evaluable is out of scope; what is checkable
      // cheaply is the pattern this round is about: "A ÷ B × 100 = C" and "A × r = C".
      const m = line.replace(/\*\*/g, '').replace(/[$,]/g, '').replace(/bn/g, '')
        .match(/(-?[\d.]+)\s*÷\s*(-?[\d.]+)\s*×\s*100\s*=\s*(-?[\d.]+)/)
        || line.replace(/\*\*/g, '').replace(/[$,]/g, '').replace(/bn/g, '')
          .match(/(-?[\d.]+)\s*×\s*(-?[\d.]+)\s*=\s*(-?[\d.]+)/);
      if (!m) continue;
      const [, a, b, c] = m.map(Number);
      const truth = line.includes('÷') ? (a / b) * 100 : a * b;
      if (Math.abs(truth - c) > 1e-9) {
        remaining++;
        egRem = egRem || `${t.id}: ${line}   (true value ${truth})`;
      }
    }
  }
}
console.log(`   ${remaining} lines write «=» over a value that is not exact`);
if (egRem) console.log(`      e.g. ${egRem}`);
