/*
 * Verify A round 4. A faithful re-implementation of quant-check.mjs check 7 (:123-143) with each
 * of its three exemptions on a switch, so each can be attacked separately. Read-only.
 *
 *   node audit/runs/packet-13.2/verify-a-round-4-check7-switchboard.mjs
 *
 * Result (5,000 draws per template): only `payback` changes, and only when the small-integer
 * exemption is lifted — 5,000 of 5,000 draws, because the `months` answer is printed in two of the
 * three `verdict` choices by construction. The 9 hits the method line adds on
 * percentage-change-economics are "× 100" against a forecast of 100.05: true false positives.
 */
import { templates } from '../../../lib/quant/index.mjs';
import { makeRng } from '../../../lib/quant/rng.mjs';

export const buildFrom = (template, seed) => {
  const data = template.draw(makeRng(seed));
  return { ...template.build(data), data, template: template.id };
};

export function check7(item, opt = {}) {
  const visible = [
    item.stem,
    ...item.steps.flatMap((s) => [s.label, ...(opt.includeMethod ? [s.method] : []), s.prefix, s.suffix, ...(s.choices || [])]),
  ].filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');
  const out = [];
  for (const step of item.steps) {
    if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
    const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1)))]);
    // acceptAbs: marking.mjs:57-58 accepts the magnitude, so the card prints "10" for an
    // answer of -10 and the shipping check, which searches for "-10", cannot see it.
    if (opt.absAware && step.acceptAbs) {
      forms.add(String(Math.abs(step.answer)));
      forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
    }
    for (const form of forms) {
      const hit = new RegExp(`(^|[^0-9.])(\\$?)${form.replace('.', '\\.')}(%?)([^0-9.]|$)`).exec(visible);
      if (!hit) continue;
      const marked = hit[2] === '$' || hit[3] === '%';
      const smallInteger = Number.isInteger(step.answer) && Math.abs(step.answer) <= 12;
      if (!opt.noSmallInt && !marked && smallInteger) continue;
      out.push({ step: step.id, answer: step.answer, printed: `${hit[2]}${form}${hit[3]}` });
      break;
    }
  }
  return out;
}

if (process.argv[1]?.endsWith('verify-a-round-4-check7-switchboard.mjs')) {
  const D = 5000;
  const arms = [
    ['as shipped', {}],
    ['small-int exemption off', { noSmallInt: true }],
    ['method line included', { includeMethod: true }],
    ['abs-aware (acceptAbs)', { absAware: true }],
  ];
  for (const t of templates) {
    const cells = arms.map(([label, opt]) => {
      let n = 0;
      for (let i = 0; i < D; i++) n += check7(buildFrom(t, `check-${t.id}-${i}`), opt).length;
      return `${label} ${String(n).padStart(5)}`;
    });
    console.log(t.id.padEnd(28), cells.join(' | '));
  }
}
