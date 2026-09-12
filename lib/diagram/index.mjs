/**
 * Drawing drills: the public surface.
 *
 *   import { getSpec, mark, modelAttempt } from '@/lib/diagram/index.mjs';
 *   const result = mark(getSpec('indirect-tax'), { shifts: { S: 30 }, equilibrium, shaded: ['dwl'] });
 *
 * A spec is content: curves as equations, a named region family, and the four things the
 * mark scheme expects. Nothing about pixels lives here — see components/diagram for that.
 */
import indirectTax from './specs/indirect-tax.mjs';
import subsidy from './specs/subsidy.mjs';

const REGISTRY = [indirectTax, subsidy];

export const specs = REGISTRY;
export { mark, modelAttempt, applyShifts } from './marking.mjs';
export { buildRegions } from './regions.mjs';
export { placeLabels, candidates, overlaps } from './layout.mjs';
export * from './geometry.mjs';

export function getSpec(id) {
  const spec = REGISTRY.find((s) => s.id === id);
  if (!spec) throw new Error(`unknown diagram spec: ${id}`);
  return spec;
}

export const listSpecs = () =>
  REGISTRY.map(({ id, subject, unit, specCode, title, topic, expect }) => ({
    id, subject, unit, specCode, title, topic, marks: 3 + (expect.regions?.length ? 1 : 0),
  }));
