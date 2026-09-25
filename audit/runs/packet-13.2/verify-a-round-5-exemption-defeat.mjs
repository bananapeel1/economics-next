/*
 * Verify A round 5 — can the small-integer exemption still be defeated?
 *
 * Not on the eight shipping templates: check 7 is clean and round 4's marker oracle is clean
 * except for one coincidence and one method-line false positive. But the exemption is a
 * property of the GUARD, and 13.3 inherits it. This constructs the two cases it would miss,
 * and scores each through the real marker so the claim is not a claim about a regex.
 */
import { markStep } from '../../../lib/quant/index.mjs';

const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');

/** check 7 verbatim (audit/scripts/quant-check.mjs:137-168), on one item. */
function check7(item) {
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
      const hit = inChoice || (inProse && (!smallInteger || inProse[1] === '$' || inProse[2] === '%') ? inProse : null);
      if (hit) { out.push(`${step.id}: "${hit[1]}${form}${hit[2]}"`); break; }
    }
  }
  return out;
}

const CASES = [
  {
    name: 'A · a bare small integer in the stem (the exemption, used as designed)',
    item: {
      stem: 'Nairobi Fresh Juice Ltd runs 8 delivery vans. Fixed costs are $4,800 a month and each van ' +
            'carries a contribution of $600 a month.',
      steps: [{
        id: 'vans', label: 'Vans needed to break even', method: 'fixed costs ÷ contribution per van',
        suffix: 'vans', marks: 2, dp: 0, answer: 8, tolerance: 0.5, slips: [],
      }],
    },
    attack: 8,
  },
  {
    name: 'B · a per cent written out in words rather than with the sign',
    item: {
      stem: 'Real GDP in Oman grew by 6 per cent last year, from $80 billion to $84.8 billion.',
      steps: [{
        id: 'growth', label: 'Rate of growth this year', method: 'change ÷ original × 100',
        suffix: '%', marks: 2, dp: 1, answer: 6, tolerance: 0.05, slips: [],
      }],
    },
    attack: 6,
  },
  {
    name: 'C · the same figure with a $ in front of it (the escape hatch)',
    item: {
      stem: 'A unit sells for $12 and variable costs are $4.',
      steps: [{
        id: 'x', label: 'Contribution per unit', method: 'price − variable cost',
        prefix: '$', marks: 1, dp: 0, answer: 12, tolerance: 0.01, slips: [],
      }],
    },
    attack: 12,
  },
];

for (const c of CASES) {
  const hits = check7(c.item);
  const step = c.item.steps[0];
  const marked = markStep(step, c.attack, { [step.id]: c.attack });
  console.log(`\n${c.name}`);
  console.log(`   stem            : ${c.item.stem}`);
  console.log(`   step            : ${step.label} (${step.marks} mark${step.marks > 1 ? 's' : ''}), answer ${step.answer}`);
  console.log(`   check 7         : ${hits.length ? 'FIRES  ' + hits.join(', ') : '*** SILENT ***'}`);
  console.log(`   real marker on a student who typed what they could see: ${marked.outcome} ${marked.awarded}/${marked.marks}`);
}
