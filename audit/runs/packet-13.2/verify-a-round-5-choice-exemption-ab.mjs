// Verify A round 5 — re-derivation of the builder's `choice-exemption-ab.txt`.
// Three arms, one variable: whether the small-integer exemption applies to CHOICES.
// Nothing is written and no source file is imported in a modified form; the sabotage
// rebuilds payback's `verdict` step from the shipped draw data, in memory.
import { templates, buildItem } from '../../../lib/quant/index.mjs';

const D = Number(process.argv[2]) || 5000;
const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');

/** check 7, with the one exemption on a switch. `split` = as shipped. */
function check7(item, { split }) {
  const out = [];
  const prose = strip([item.stem, ...item.steps.flatMap((s) => [s.label, s.prefix, s.suffix])]);
  const constructed = strip(item.steps.flatMap((s) => s.choices || []));
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1)))]);
    if (step.acceptAbs) {
      forms.add(String(Math.abs(step.answer)));
      forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
    }
    for (const form of forms) {
      const pattern = new RegExp(`(?<![0-9.])(\\$?)${form.replace('.', '\\.')}(%?)(?![0-9])(?!\\.[0-9])`);
      const inProse = pattern.exec(prose);
      const inChoice = pattern.exec(constructed);
      const smallInteger = Number.isInteger(step.answer) && Math.abs(step.answer) <= 12;
      const exempt = (m) => smallInteger && m[1] !== '$' && m[2] !== '%';
      let hit;
      if (split) {
        // AS SHIPPED: choices scanned without the exemption, prose with it.
        hit = inChoice || (inProse && !exempt(inProse) ? inProse : null);
      } else {
        // AS IT WAS: small integers exempt everywhere.
        const m = inProse || inChoice;
        hit = m && !exempt(m) ? m : null;
      }
      if (!hit) continue;
      out.push(`${step.id}: the answer ${step.answer} is printed ${inChoice ? 'in a choice' : 'on the card'} as "${hit[1]}${form}${hit[2]}"`);
      break;
    }
  }
  return out;
}

/** The step as it stood before fix round 4: the whole period, months printed twice. */
function sabotage(item) {
  if (item.template !== 'payback') return item;
  const d = item.data;
  const Y = d.paybackYear, M = d.paybackMonth;
  const period = (y, m) => `${y} years ${m} months`;
  const steps = item.steps.map((s) => (s.id !== 'verdict' ? s : {
    ...s,
    label: 'Payback period',
    answer: period(Y - 1, M),
    choices: [period(Y - 1, M), period(Y, M), period(Y - 1, 12 - M)],
  }));
  return { ...item, steps };
}

const ARMS = [
  ['A  · control: the year-only choice, guard AS SHIPPED', (i) => i, { split: true }],
  ['B1 · whole-period choice restored, guard AS SHIPPED', sabotage, { split: true }],
  ['B2 · the same sabotage, guard AS IT WAS (small ints exempt everywhere)', sabotage, { split: false }],
  ['B3 · control item, guard AS IT WAS  (does the split cost false positives?)', (i) => i, { split: false }],
];

for (const [label, mutate, opt] of ARMS) {
  const per = {};
  let fails = 0, eg = null;
  for (const t of templates) {
    for (let i = 0; i < D; i++) {
      const hits = check7(mutate(buildItem(t.id, `check-${t.id}-${i}`)), opt);
      if (hits.length) { fails++; per[t.id] = (per[t.id] || 0) + 1; if (!eg) eg = `${t.id} [check-${t.id}-${i}] ${hits[0]}`; }
    }
  }
  const total = templates.length * D;
  console.log(`\n${label}`);
  if (!fails) console.log(`   printed answer: 0 in ${total} items`);
  else {
    console.log(`   printed answer: ${fails} in ${total} items`);
    for (const [k, v] of Object.entries(per)) console.log(`     ${k} (${v})`);
    console.log(`     e.g. ${eg}`);
  }
}
