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
import capacityUtilisation from './templates/capacity-utilisation.mjs';
import npv from './templates/npv.mjs';
import decisionTree from './templates/decision-tree.mjs';
import gearing from './templates/gearing.mjs';
import roce from './templates/roce.mjs';
import labourProductivity from './templates/labour-productivity.mjs';
import { yedEconomics, yedBusiness } from './templates/yed.mjs';
import xed from './templates/xed.mjs';
import pes from './templates/pes.mjs';
import revenueCosts from './templates/revenue-costs.mjs';
import { exchangeRateEconomics, exchangeRateBusiness } from './templates/exchange-rate.mjs';
import termsOfTrade from './templates/terms-of-trade.mjs';

/**
 * Packet 13.2 registers the six areas DRILLS.md names, across eight entries: percentage
 * change is one generator registered once per subject, and investment appraisal is payback
 * and ARR rather than one item doing both badly. Order is the order a student meets them,
 * within each subject, and it is also the order the pool offers a section's drills in.
 *
 * Packet 13.3 adds twelve templates as fourteen entries. Business: income elasticity (1.3.2),
 * the effect of an exchange-rate movement on a firm's prices (2.3.5), capacity utilisation (2.3.4),
 * net present value and the decision tree's expected values (3.3.3 — a decision tree is
 * arithmetic, so it is a calculation here rather than the drawing drill DRILLS.md filed it as),
 * and gearing, ROCE and labour productivity (3.3.5). Economics: income and cross elasticity
 * (1.3.2), price elasticity of supply (1.3.3), marginal and average revenue and cost (3.3.2 — the
 * first WEC13 drill), and the terms of trade (4.3.2) and exchange rates (4.3.3) — the first WEC14
 * drills. YED and the exchange rate are one generator each, registered once per subject.
 */
const REGISTRY = [
  percentageChangeBusiness,
  yedBusiness,
  breakeven,
  capacityUtilisation,
  exchangeRateBusiness,
  arr,
  payback,
  npv,
  decisionTree,
  gearing,
  roce,
  labourProductivity,
  ped,
  yedEconomics,
  xed,
  pes,
  percentageChangeEconomics,
  indexNumbers,
  multiplier,
  revenueCosts,
  termsOfTrade,
  exchangeRateEconomics,
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
