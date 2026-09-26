/**
 * Drawing drills: the public surface.
 *
 *   import { getSpec, mark, modelAttempt } from '@/lib/diagram/index.mjs';
 *   const result = mark(getSpec('indirect-tax'), { shifts: { S: 30 }, equilibrium, shaded: ['dwl'] });
 *
 * A spec is content: curves as equations, a named region family, and the things the mark scheme
 * expects. Nothing about pixels lives in a spec — see lib/diagram/view.mjs and components/diagram.
 * lib/diagram/schema.md is the author's guide.
 */
import indirectTax from './specs/indirect-tax.mjs';
import subsidy from './specs/subsidy.mjs';
import maxPrice from './specs/max-price.mjs';
import negativeExternality from './specs/negative-externality.mjs';
import minWage from './specs/min-wage.mjs';
import adAs from './specs/ad-as.mjs';
import breakEvenChart from './specs/break-even-chart.mjs';
import tariff from './specs/tariff.mjs';
import exchangeRate from './specs/exchange-rate.mjs';
import monopoly from './specs/monopoly.mjs';
import { marksFor } from './shape.mjs';

// 13.7: the six Economics specs. 13.8: a Business break-even chart and three WEC13/WEC14 specs.
// No PPF: the engine draws straight lines, and 1.3.1 asks for increasing opportunity cost.
const REGISTRY = [
  indirectTax, subsidy, maxPrice, negativeExternality, minWage, adAs,
  breakEvenChart, tariff, exchangeRate, monopoly,
];

export const specs = REGISTRY;
export { mark, modelAttempt, applyShifts } from './marking.mjs';
export { buildRegions, wholeFor, familyOf, familyNames } from './regions.mjs';
export { placeLabels, candidates, overlaps } from './layout.mjs';
export * from './geometry.mjs';
export * from './shape.mjs';
export * from './view.mjs';

export function getSpec(id) {
  const spec = REGISTRY.find((s) => s.id === id);
  if (!spec) throw new Error(`unknown diagram spec: ${id}`);
  return spec;
}

export const listSpecs = () =>
  REGISTRY.map((spec) => {
    const { id, subject, unit, specCode, specTerm, title, topic } = spec;
    return { id, subject, unit, specCode, specTerm, title, topic, marks: marksFor(spec) };
  });
