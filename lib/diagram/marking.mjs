/**
 * Marking for drawing drills. Pure, synchronous, no network, no model call.
 *
 * Four decisions, which are the four an examiner actually looks for when a student draws a
 * shift-and-shade diagram: which curve moved, which way, where the market now clears, and
 * which area is the loss. Each one is a comparison of numbers.
 *
 * The third and fourth are judged against the student's OWN shifted curve, not the model
 * answer. Shift supply by $20 instead of $30 and the equilibrium mark is still winnable,
 * because reading your own diagram correctly is the skill being tested.
 */
import { intersect, near, shift } from './geometry.mjs';
import { buildRegions } from './regions.mjs';

const MOVED = 5; // economic units; below this a curve counts as untouched

/** The student's curves after their shift. */
export function applyShifts(curves, shifts = {}) {
  const out = {};
  for (const [name, curve] of Object.entries(curves)) out[name] = shift(curve, shifts[name] || 0);
  return out;
}

const sameSet = (a, b) => {
  const A = new Set(a || []);
  const B = new Set(b || []);
  return A.size === B.size && [...A].every((x) => B.has(x));
};

/**
 * @param {object} spec
 * @param {object} attempt  { shifts: {D,S}, equilibrium: {q,p}|null, shaded: string[] }
 */
export function mark(spec, attempt) {
  const shifts = attempt.shifts || {};
  const expect = spec.expect;
  const fb = spec.feedback || {};

  const movedNames = Object.keys(spec.curves).filter((n) => Math.abs(shifts[n] || 0) >= MOVED);
  const target = expect.curve;
  const delta = shifts[target] || 0;
  const wanted = expect.direction === 'up' ? 1 : -1;

  const criteria = [];
  const add = (id, text, rule, got, note) => criteria.push({ id, text, rule, got, note });

  // ── M1 · which curve ──
  if (!movedNames.length) {
    add('M1', 'Correct curve shifted', `attempt.curve === '${target}'`, false, fb.nothingMoved || 'Nothing moved yet.');
  } else if (movedNames.length > 1) {
    add('M1', 'Correct curve shifted', `attempt.curve === '${target}'`, false, fb.bothMoved || 'Both curves moved. Only one shifts here.');
  } else if (movedNames[0] !== target) {
    add('M1', 'Correct curve shifted', `attempt.curve === '${target}'`, false, fb.wrongCurve || `You shifted ${movedNames[0]}. It is ${target} that moves.`);
  } else {
    add('M1', 'Correct curve shifted', `attempt.curve === '${target}'`, true, fb.rightCurve || `${target} shifts, as it should.`);
  }

  // ── M2 · which way ──
  if (!movedNames.includes(target)) {
    add('M2', 'Correct direction of shift', `sign(dIntercept) === ${wanted}`, false, 'No shift on that curve to judge.');
  } else if (Math.sign(delta) !== wanted) {
    add('M2', 'Correct direction of shift', `sign(dIntercept) === ${wanted}`, false, fb.wrongDirection || 'Right curve, wrong way.');
  } else {
    const sizeOff = expect.size && Math.abs(Math.abs(delta) - expect.size) > Math.max(6, expect.size * 0.2);
    add('M2', 'Correct direction of shift', `sign(dIntercept) === ${wanted}`, true,
      sizeOff
        ? `Correct direction. Direction is what earns the mark, but the gap should read ${expect.size}.`
        : fb.rightDirection || 'Correct direction.');
  }

  const own = applyShifts(spec.curves, shifts);
  const before = intersect(spec.curves.D, spec.curves.S);
  const after = intersect(own.D, own.S);

  // ── M3 · the new equilibrium, read off the student's own diagram ──
  const eq = attempt.equilibrium;
  if (!eq) {
    add('M3', 'New equilibrium identified', '|eq − intersect(D, S₂)| ≤ tol', false, 'No new equilibrium marked.');
  } else if (!after) {
    add('M3', 'New equilibrium identified', '|eq − intersect(D, S₂)| ≤ tol', false, 'Those curves never cross.');
  } else if (!near(eq, after, spec.tolerance)) {
    const atOldQuantity = before && Math.abs(eq.q - before.q) < MOVED;
    add('M3', 'New equilibrium identified', '|eq − intersect(D, S₂)| ≤ tol', false,
      atOldQuantity
        ? (fb.equilibriumAtOldQuantity || 'That is the price on the new curve at the original quantity. Quantity adjusts too.')
        : (fb.equilibriumWrong || 'Not where the two curves now cross.'));
  } else if (!criteria[1].got) {
    add('M3', 'New equilibrium identified', '|eq − intersect(D, S₂)| ≤ tol', false,
      'You read the intersection correctly, but from a curve that moved the wrong way.');
  } else {
    add('M3', 'New equilibrium identified', '|eq − intersect(D, S₂)| ≤ tol', true,
      `P₂ ${Math.round(after.p)} and Q₂ ${Math.round(after.q)}, read off your own diagram as an examiner would.`);
  }

  // ── M4 · the shaded area, only when the question asks for one ──
  if (expect.regions?.length) {
    const shaded = attempt.shaded || [];
    const regions = after ? buildRegions(spec.regions, spec.curves, own) : null;
    const wantedRegions = expect.regions;

    if (!regions) {
      add('M4', 'Correct area shaded', `shaded == [${wantedRegions.map((r) => `'${r}'`).join(', ')}]`, false,
        'The areas only mean something once the curve has moved the right way. Fix the direction first.');
    } else if (!shaded.length) {
      add('M4', 'Correct area shaded', `shaded == [${wantedRegions.map((r) => `'${r}'`).join(', ')}]`, false, 'Nothing shaded.');
    } else if (sameSet(shaded, wantedRegions)) {
      add('M4', 'Correct area shaded', `shaded == [${wantedRegions.map((r) => `'${r}'`).join(', ')}]`, true,
        fb.rightRegion || `${regions?.[wantedRegions[0]]?.name || 'That area'} — correct.`);
    } else {
      const named = shaded.map((k) => regions?.[k]?.name).filter(Boolean);
      add('M4', 'Correct area shaded', `shaded == [${wantedRegions.map((r) => `'${r}'`).join(', ')}]`, false,
        fb.regions?.[shaded.slice().sort().join('+')]
          || (shaded.some((k) => wantedRegions.includes(k))
            ? 'The right area is in your shading, but so are areas that are transfers rather than losses.'
            : named.length ? `That is ${named.join(' and ')}. A transfer moves surplus between people; it is not destroyed.`
              : 'Not the right area.'));
    }
  }

  const awarded = criteria.filter((c) => c.got).length;
  return { awarded, total: criteria.length, criteria, equilibrium: after, regions: after ? buildRegions(spec.regions, spec.curves, own) : null };
}

/** The attempt that scores full marks. Used by the guard and by "show me". */
export function modelAttempt(spec) {
  const shifts = { [spec.expect.curve]: spec.expect.direction === 'up' ? spec.expect.size : -spec.expect.size };
  const own = applyShifts(spec.curves, shifts);
  const eq = intersect(own.D, own.S);
  return { shifts, equilibrium: eq ? { q: eq.q, p: eq.p } : null, shaded: [...(spec.expect.regions || [])] };
}
