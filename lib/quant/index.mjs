/**
 * Quantitative drill items: the public surface.
 *
 * A drill item is never stored. Only `{ template, seed }` is — the numbers are rebuilt
 * on demand, identically, wherever and whenever they are needed. That is what makes
 * these items the one thing in the product a student cannot memorise between reviews:
 * come back to the same item next week and the method is the same, the figures are not.
 *
 *   import { buildItem, newSeed } from '@/lib/quant/index.mjs';
 *   const item = buildItem('breakeven', newSeed());
 *   const result = markItem(item, { contribution: '12', breakEven: '480' });
 */
import { makeRng, newSeed } from './rng.mjs';
import breakeven from './templates/breakeven.mjs';
import ped from './templates/ped.mjs';
import arr from './templates/arr.mjs';
import payback from './templates/payback.mjs';
import multiplier from './templates/multiplier.mjs';
import indexNumbers from './templates/index-numbers.mjs';
import { percentageChangeBusiness, percentageChangeEconomics } from './templates/percentage-change.mjs';

/**
 * Packet 13.2 registers the six areas DRILLS.md names, across eight entries: percentage
 * change is one generator registered once per subject, and investment appraisal is payback
 * and ARR rather than one item doing both badly. Order is the order a student meets them.
 */
const REGISTRY = [
  percentageChangeBusiness,
  breakeven,
  arr,
  payback,
  ped,
  percentageChangeEconomics,
  indexNumbers,
  multiplier,
];

export const templates = REGISTRY;
export { newSeed };
export { markItem, markStep, parseNumber, correctResponses } from './marking.mjs';

export function getTemplate(id) {
  const t = REGISTRY.find((x) => x.id === id);
  if (!t) throw new Error(`unknown quant template: ${id}`);
  return t;
}

export function listTemplates() {
  return REGISTRY.map(({ id, subject, unit, specCode, specLeaf, specTerm, qs, title, topic, variants }) => ({
    id, subject, unit, specCode, specLeaf, specTerm, qs, title, topic, variants,
  }));
}

/**
 * Build one item. The same (template, seed) always produces the same question.
 * @param {string} templateId
 * @param {string|number} seed
 */
export function buildItem(templateId, seed) {
  const template = getTemplate(templateId);
  const data = template.draw(makeRng(seed));
  const built = template.build(data);

  return {
    id: `quant:${template.id}:${seed}`,
    template: template.id,
    seed,
    subject: template.subject,
    unit: template.unit,
    specCode: template.specCode,
    specLeaf: template.specLeaf,
    qs: template.qs,
    title: template.title,
    topic: template.topic,
    marks: built.steps.reduce((n, s) => n + s.marks, 0),
    data,
    ...built,
  };
}
