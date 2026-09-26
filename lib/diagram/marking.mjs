/**
 * Marking for drawing drills. Pure, synchronous, no network, no model call.
 *
 * Up to four decisions, which are the four an examiner actually looks for when a student draws a
 * shift-and-shade diagram: which curve moved, which way, where the market now settles, and which
 * area is the loss. Each one is a comparison of numbers. A drill with nothing to move (monopoly
 * against competition) has no M1 or M2; a drill with no area (AD/AS, a currency market) has no M4.
 * The ids stay M1–M4 whichever apply, so an id always names the same judgement.
 *
 * The third and fourth are judged against the student's OWN shifted curve, not the model
 * answer. Shift supply by $20 instead of $30 and the equilibrium mark is still winnable,
 * because reading your own diagram correctly is the skill being tested.
 */
import { near, readPoint, shift } from './geometry.mjs';
import { buildRegions } from './regions.mjs';
import { criteriaFor, curveMeta, directionOf, glyphsFor, glyphValue, hasShift, originSpec, pointSpec, unitOf } from './shape.mjs';

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

/** The rule line under M3: `|eq − intersect(D, S₂)| ≤ tol`, from the spec's own curves. */
function pointRule(spec) {
  const def = pointSpec(spec);
  const target = spec.expect?.curve;
  const tag = (n) => {
    const m = curveMeta(spec, n);
    return n === target ? (spec.curves[n]?.shiftedLabel ? m.shiftedLabel : `${m.short}₂`) : m.short;
  };
  const [a, b] = def.cross;
  const on = def.readOn || a;
  return on === a || on === b
    ? `|eq − intersect(${tag(a)}, ${tag(b)})| ≤ tol`
    : `|eq − (q at ${tag(a)} = ${tag(b)}, p on ${tag(on)})| ≤ tol`;
}

/**
 * @param {object} spec
 * @param {object} attempt  { shifts: {name: Δintercept}, equilibrium: {q,p}|null, shaded: string[] }
 */
export function mark(spec, attempt) {
  const shifts = attempt.shifts || {};
  const expect = spec.expect;
  const fb = spec.feedback || {};
  const text = criteriaFor(spec);
  const unit = unitOf(spec);
  const label = (n) => curveMeta(spec, n).label;

  const criteria = [];
  const add = (id, heading, rule, got, note) => criteria.push({ id, text: heading, rule, got, note });

  const shiftStep = hasShift(spec);
  const movedNames = Object.keys(spec.curves).filter((n) => Math.abs(shifts[n] || 0) >= unit);
  const target = expect.curve;

  if (shiftStep) {
    const delta = shifts[target] || 0;
    const wanted = directionOf(spec);

    // ── M1 · which curve ──
    const m1rule = `attempt.curve === '${target}'`;
    if (!movedNames.length) {
      add('M1', text.M1, m1rule, false, fb.nothingMoved || 'Nothing moved yet.');
    } else if (movedNames.length > 1) {
      add('M1', text.M1, m1rule, false, fb.bothMoved
        || (Object.keys(spec.curves).length > 2 ? 'More than one curve moved. Only one shifts here.' : 'Both curves moved. Only one shifts here.'));
    } else if (movedNames[0] !== target) {
      add('M1', text.M1, m1rule, false, fb.wrongCurve || `You shifted ${label(movedNames[0])}. It is ${label(target)} that moves.`);
    } else {
      add('M1', text.M1, m1rule, true, fb.rightCurve || `${label(target)} shifts, as it should.`);
    }

    // ── M2 · which way ──
    const m2rule = `sign(dIntercept) === ${wanted}`;
    if (!movedNames.includes(target)) {
      add('M2', text.M2, m2rule, false, 'No shift on that curve to judge.');
    } else if (Math.sign(delta) !== wanted) {
      add('M2', text.M2, m2rule, false, fb.wrongDirection || 'Right curve, wrong way.');
    } else {
      const sizeOff = expect.size && Math.abs(Math.abs(delta) - expect.size) > Math.max(6, expect.size * 0.2);
      add('M2', text.M2, m2rule, true,
        sizeOff
          ? `Correct direction. Direction is what earns the mark, but the gap should read ${expect.size}.`
          : fb.rightDirection || 'Correct direction.');
    }
  }

  const own = applyShifts(spec.curves, shifts);
  const before = readPoint(spec.curves, originSpec(spec));
  const after = readPoint(own, pointSpec(spec));
  const glyph = glyphsFor(spec);
  const m3rule = pointRule(spec);
  const directionMark = criteria.find((c) => c.id === 'M2');

  // ── M3 · the point, read off the student's own diagram ──
  const eq = attempt.equilibrium;
  if (!eq) {
    add('M3', text.M3, m3rule, false, fb.noPoint || 'No new equilibrium marked.');
  } else if (!after) {
    add('M3', text.M3, m3rule, false, 'Those curves never cross.');
  } else if (!near(eq, after, spec.tolerance)) {
    // A named wrong point first (the quantity DEMANDED under a price ceiling, MR = MC read off MC,
    // the market equilibrium when the social optimum was asked for), then the generic "original
    // quantity" slip, then the catch-all.
    const decoy = (spec.distractors || []).find((d) => {
      const pt = readPoint(d.from === 'base' ? spec.curves : own, d);
      return pt && near(eq, pt, spec.tolerance);
    });
    const atOldQuantity = before && Math.abs(eq.q - before.q) < unit;
    add('M3', text.M3, m3rule, false,
      decoy
        ? decoy.feedback
        : atOldQuantity
          ? (fb.equilibriumAtOldQuantity || 'That is the price on the new curve at the original quantity. Quantity adjusts too.')
          : (fb.equilibriumWrong || 'Not where the two curves now cross.'));
  } else if (directionMark && !directionMark.got) {
    // M2 fails for two reasons, and only one of them is a direction. Moving the wrong curve used
    // to be told it had "moved the wrong way" too (packet 13.7, found running every branch).
    const curveMark = criteria.find((c) => c.id === 'M1');
    add('M3', text.M3, m3rule, false, curveMark && !curveMark.got
      ? 'You read the intersection correctly, but on a diagram where the wrong curve moved.'
      : 'You read the intersection correctly, but from a curve that moved the wrong way.');
  } else {
    add('M3', text.M3, m3rule, true,
      `${glyphValue(glyph.p2, after.p)} and ${glyphValue(glyph.q2, after.q)}, read off your own diagram as an examiner would.`);
  }

  // ── M4 · the shaded area, only when the question asks for one ──
  const regions = after ? buildRegions(spec, own) : null;
  if (expect.regions?.length) {
    const shaded = attempt.shaded || [];
    const wantedRegions = expect.regions;
    const m4rule = `shaded == [${wantedRegions.map((r) => `'${r}'`).join(', ')}]`;

    if (!regions) {
      const wrongCurve = shiftStep && movedNames.some((n) => n !== target);
      const rightShift = shiftStep && criteria.every((c) => c.id === 'M3' || c.got);
      add('M4', text.M4, m4rule, false,
        wrongCurve
          ? 'The areas are built from the curve that should move. Shift that one, and only that one, first.'
          : rightShift
            ? 'That shift leaves no area to shade on this diagram. Try a smaller one.'
            : 'The areas only mean something once the curve has moved the right way. Fix the direction first.');
    } else if (!shaded.length) {
      add('M4', text.M4, m4rule, false, 'Nothing shaded.');
    } else if (sameSet(shaded, wantedRegions)) {
      add('M4', text.M4, m4rule, true,
        fb.rightRegion || `${regions?.[wantedRegions[0]]?.name || 'That area'} — correct.`);
    } else {
      const named = shaded.map((k) => regions?.[k]?.name).filter(Boolean);
      add('M4', text.M4, m4rule, false,
        fb.regions?.[shaded.slice().sort().join('+')]
          || (shaded.some((k) => wantedRegions.includes(k))
            ? 'The right area is in your shading, but so are areas that are transfers rather than losses.'
            : named.length ? `That is ${named.join(' and ')}. A transfer moves surplus between people; it is not destroyed.`
              : 'Not the right area.'));
    }
  }

  const awarded = criteria.filter((c) => c.got).length;
  return { awarded, total: criteria.length, criteria, equilibrium: after, regions };
}

/** The attempt that scores full marks. Used by the guard and by "show me". */
export function modelAttempt(spec) {
  const shifts = hasShift(spec) ? { [spec.expect.curve]: directionOf(spec) * spec.expect.size } : {};
  const own = applyShifts(spec.curves, shifts);
  const eq = readPoint(own, pointSpec(spec));
  return { shifts, equilibrium: eq ? { q: eq.q, p: eq.p } : null, shaded: [...(spec.expect.regions || [])] };
}
