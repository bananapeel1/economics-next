import { test } from 'node:test';
import assert from 'node:assert/strict';
import { listSpecs, specs, getSpec } from './diagram/index.mjs';
import { checkSpecCitation, specSection } from './spec-sections.mjs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  mark, modelAttempt, applyShifts, buildRegions, readPoint, quantityAt, interceptDelta, marksFor,
  tickStep, ticks, segment, labelLayout, keyDirection, nudgeLabels, drillReducer, initialDrill,
  stepsFor, pointSpec, originSpec,
} from './diagram/index.mjs';
import { shapes } from './diagram/fixtures.mjs';

/*
 * Packet 13.7 part 1. `npm run diagram-check` already marks every spec, samples its regions and
 * places its labels; nothing here repeats that. What is here is the one assertion the PROTOCOL's
 * gate can see: `audit/PROTOCOL.md` §5 runs build, unverified, validate, test, exposure and
 * recalls — NOT diagram-check. So the check that a drill cites a real section lives in a test too,
 * over the same function, because a guard the gate does not run is a guard that goes quiet.
 */

test('every diagram spec cites a section that exists, in its own unit, that covers it', () => {
  for (const spec of listSpecs()) {
    assert.equal(checkSpecCitation(spec), null, `${spec.id}: ${checkSpecCitation(spec)}`);
  }
});

/*
 * The control. Both live specs shipped `1.4.3` — a UK GCE number, and in the IAL specification
 * every section number has 3 as its middle digit — so the chip above the drill named a section
 * that does not exist. Each arm below is one way that defect can be written, and the last is the
 * one a shape test cannot see: a REAL heading that is the wrong one.
 */
test('the citation check fires on every way of getting it wrong', () => {
  // The base is the SHIPPING citation. It used to be 1.3.6 / 'indirect taxation', which is the
  // filing the board ruled out in 13.7 — every arm still fired, but this is where a reader looks
  // to see what a correct citation is, and it was modelling the rejected one.
  const base = { subject: 'economics', unit: 'WEC11', specCode: '1.3.4', specTerm: 'indirect taxes' };
  assert.equal(checkSpecCitation(base), null, 'the correct citation must pass, or the arms below prove nothing');

  assert.match(checkSpecCitation({ ...base, specCode: '1.4.3' }), /not an IAL section number/);
  assert.match(checkSpecCitation({ ...base, specCode: '2.3.4' }), /different units/);
  assert.match(checkSpecCitation({ ...base, specTerm: undefined }), /no specTerm/);
  assert.match(checkSpecCitation({ ...base, specCode: '1.3.1' }), /does not use "indirect taxes" anywhere under 1\.3\.1/);
});

/*
 * The reader has to STOP at its own section's end. It did not: tracking only `n.3.n` headings let
 * the last section of a unit run on through the next unit's title page, so 1.3.6 was 86 lines and
 * "macroeconomic performance" — Unit 2's title — passed a specTerm check under a market-failure
 * section. A guard that accepts a term from the wrong unit is the defect it exists to catch.
 */
test('a section stops at its own boundary rather than absorbing the next unit', () => {
  const body = specSection('economics', '1.3.6');
  assert.ok(body.includes('indirect taxation'), '1.3.6 must still contain its own content');
  assert.ok(body.includes('subsidies'), '1.3.6 must still contain its own content');
  assert.ok(!body.includes('macroeconomic performance'), 'Unit 2 title page leaked into 1.3.6');
  assert.ok(!body.includes('unit description'), "the next unit's front matter leaked into 1.3.6");
});

test('a recall can only name a spec the registry has, and getSpec throws on one it does not', () => {
  assert.equal(new Set(specs.map((s) => s.id)).size, specs.length, 'two specs share an id');
  for (const s of specs) assert.equal(getSpec(s.id).id, s.id);
  assert.throws(() => getSpec('no-such-spec'), /no-such-spec/);
});

/*
 * Packet 13.7 part 2: the engine generalised past two straight curves named D and S. The guard
 * (audit/scripts/diagram-check.mjs) proves every spec and shape fixture at every shift; the PROTOCOL
 * gate does not run it, so the gate runs it here, whole. The tests after it pin the pieces a spec
 * author and the component lean on, each with the defect it exists to catch.
 */

test('the drawing-drill guard is green (it is not in the gate otherwise)', () => {
  const script = fileURLToPath(new URL('../audit/scripts/diagram-check.mjs', import.meta.url));
  const out = execFileSync(process.execPath, [script], { encoding: 'utf8' });
  assert.match(out, /all clean/);
});

test('horizontal lines: a price line has no quantity at a price, and meets a curve where it should', () => {
  const pmax = { intercept: 50, slope: 0 };
  assert.equal(quantityAt(pmax, 50), null, 'a horizontal line answers null, not Infinity or NaN');
  assert.deepEqual(readPoint({ Pmax: pmax, S: { intercept: 20, slope: 1 } }, { cross: ['Pmax', 'S'] }), { q: 30, p: 50 });
  assert.equal(interceptDelta(pmax, 40, -7), -7, 'dragging a price line sideways does nothing; only up and down move it');
  const seg = segment(pmax, 120, 160);
  assert.equal(seg.p0, 50);
  assert.equal(seg.pEnd, 50);
  assert.ok(seg.qEnd > 100 && Number.isFinite(seg.qEnd), `a horizontal line is drawn across the plot (qEnd ${seg.qEnd})`);
});

test('the point generalises: price can be read on a third curve (monopoly)', () => {
  const curves = { AR: { intercept: 120, slope: -1 }, MR: { intercept: 120, slope: -2 }, MC: { intercept: 40, slope: 0 } };
  assert.deepEqual(readPoint(curves, { cross: ['MR', 'MC'], readOn: 'AR' }), { q: 40, p: 80 });
  assert.deepEqual(readPoint(curves, { cross: ['MR', 'MC'] }), { q: 40, p: 40 }, 'without readOn the price is read on the first curve');
  const mono = shapes.find((s) => s.id === 'shape:monopoly');
  assert.deepEqual(pointSpec(mono), { cross: ['MR', 'MC'], readOn: 'AR' }, 'a spec inherits its point from its family');
  assert.deepEqual(originSpec(mono), { cross: ['AR', 'MC'] }, 'and its origin, which is a different pair');
});

test('marks follow the shape: no shift means no M1/M2, no area means no M4', () => {
  const byId = Object.fromEntries(shapes.map((s) => [s.id, s]));
  const ids = (spec) => mark(spec, modelAttempt(spec)).criteria.map((c) => c.id).join(',');
  assert.equal(ids(byId['shape:monopoly']), 'M3,M4');
  assert.equal(ids(byId['shape:ad-as']), 'M1,M2,M3');
  assert.equal(ids(getSpec('max-price')), 'M1,M2,M3,M4');
  for (const s of [...specs, ...shapes]) assert.equal(marksFor(s), mark(s, modelAttempt(s)).total, s.id);
});

/*
 * The defect the generalisation found. A family used to check only the SIGN of whichever curve moved
 * first, so moving demand on the tax drill built tax regions on a diagram whose supply never moved:
 * the two burden rectangles were the same rectangle and the loss triangle had no area, yet shading
 * it was marked correct. A family now builds only from its own curve moving its own way.
 */
test('regions are built only when the family’s own curve moved, alone, its own way', () => {
  const tax = getSpec('indirect-tax');
  assert.ok(buildRegions(tax, applyShifts(tax.curves, { S: 30 })), 'the right shift builds regions');
  assert.equal(buildRegions(tax, applyShifts(tax.curves, { D: 30 })), null, 'the wrong curve builds nothing');
  assert.equal(buildRegions(tax, applyShifts(tax.curves, { D: 30, S: 30 })), null, 'two curves moved builds nothing');
  assert.equal(buildRegions(tax, applyShifts(tax.curves, { S: -30 })), null, 'the wrong way builds nothing');
  const wrongCurve = mark(tax, { shifts: { D: 30 }, equilibrium: null, shaded: ['dwl'] });
  assert.equal(wrongCurve.criteria.find((c) => c.id === 'M4').got, false, 'shading "dwl" on a demand shift is not the welfare loss');
});

test('the externality loss is not the tax triangle', () => {
  const ext = getSpec('negative-externality');
  const r = mark(ext, modelAttempt(ext)).regions;
  // apex at the social optimum (40, 90), base on the MARKET output (60) from D (70) up to MSC (110)
  assert.deepEqual(r.dwl.points, [[40, 90], [60, 110], [60, 70]]);
  const pvt = mark(ext, { ...modelAttempt(ext), shaded: ['pvt'] }).criteria.find((c) => c.id === 'M4');
  assert.equal(pvt.got, false);
  assert.match(pvt.note, /tax diagram/, 'shading the tax-shaped triangle gets the feedback written for it');
});

test('a maximum price is marked on the quantity SUPPLIED, and the quantity demanded gets its own feedback', () => {
  const mp = getSpec('max-price');
  const attempt = modelAttempt(mp);
  assert.deepEqual(attempt.equilibrium, { q: 30, p: 50 });
  const atQd = mark(mp, { ...attempt, equilibrium: { q: 90, p: 50 } }).criteria.find((c) => c.id === 'M3');
  assert.equal(atQd.got, false);
  assert.match(atQd.note, /excess demand/);
  const raised = mark(mp, { ...attempt, shifts: { Pmax: 30 } });
  assert.equal(raised.criteria.find((c) => c.id === 'M2').got, false, 'a ceiling above equilibrium does not bind');
});

test('tick spacing adapts to the axis, and the two 13.5 specs keep their 20s', () => {
  assert.equal(tickStep(120), 20);
  assert.equal(tickStep(140), 20);
  assert.equal(tickStep(160), 20);
  assert.equal(tickStep(1000), 200);
  assert.equal(tickStep(10000), 2000);
  assert.equal(tickStep(20), 2.5);
  assert.deepEqual(ticks({ max: 140 }), [0, 20, 40, 60, 80, 100, 120, 140]);
  assert.deepEqual(ticks({ max: 100, tick: 25 }), [0, 25, 50, 75, 100], 'axes.x.tick overrides');
});

test('nudge and arrow keys follow the slope: up is right on a downward curve', () => {
  assert.equal(keyDirection({ slope: -1 }, 'ArrowRight'), 1, 'demand: right is an increase');
  assert.equal(keyDirection({ slope: 1 }, 'ArrowRight'), -1, 'supply: right is an increase in supply, i.e. down');
  assert.equal(keyDirection({ slope: 0 }, 'ArrowRight'), 0, 'a price line does not move sideways');
  assert.equal(keyDirection({ slope: 0 }, 'ArrowUp'), 1);
  assert.match(nudgeLabels({ slope: -1 }).up, /right/);
  assert.match(nudgeLabels({ slope: 1 }).up, /left/);
});

/*
 * The step machine, walked without a DOM. The 13.6 drill advanced from step 1 the moment a curve had
 * moved, and the arrows exist only in step 1: one tap moved the curve 5 and took the arrows away.
 */
test('a nudge never leaves the shift step; a finished drag or Next does', () => {
  const spec = getSpec('indirect-tax');
  const run = (actions) => actions.reduce((s, a) => drillReducer(spec, s, a), initialDrill());
  let s = run([{ type: 'nudge', curve: 'S', direction: 1 }, { type: 'nudge', curve: 'S', direction: 1 }]);
  assert.equal(s.stepIndex, 0, 'still in the shift step after two taps');
  assert.equal(s.shifts.S, 10);
  s = drillReducer(spec, s, { type: 'next' });
  assert.equal(s.stepIndex, 1);
  s = run([{ type: 'drag', curve: 'S', value: 31.7 }, { type: 'dragEnd' }]);
  assert.equal(s.shifts.S, 30, 'a drag snaps to the step');
  assert.equal(s.stepIndex, 1, 'the end of a drag moves on, as it did');
  assert.equal(drillReducer(spec, initialDrill(), { type: 'next' }).stepIndex, 0, 'Next is refused until something moved');
  s = drillReducer(spec, s, { type: 'point', point: { q: 35, p: 85, snapped: true } });
  assert.equal(stepsFor(spec)[s.stepIndex].key, 'shade', 'marking the point moves on to shading');
  assert.equal(drillReducer(spec, s, { type: 'nudge', curve: 'S', direction: 1 }), s, 'curves cannot move outside the shift step');
});

test('a drill with nothing to move starts at the point step', () => {
  const mono = shapes.find((s) => s.id === 'shape:monopoly');
  assert.deepEqual(stepsFor(mono).map((s) => s.key), ['point', 'shade']);
  const s = drillReducer(mono, initialDrill(), { type: 'point', point: { q: 40, p: 80, snapped: true } });
  assert.equal(stepsFor(mono)[s.stepIndex].key, 'shade');
  assert.equal(drillReducer(mono, initialDrill(), { type: 'nudge', curve: 'MC', direction: 1 }).shifts.MC, undefined, 'nothing is movable');
});

test('labels come in a fixed priority order, stable ones first, so the moving curve yields', () => {
  const spec = getSpec('indirect-tax');
  const own = applyShifts(spec.curves, { S: 30 });
  const ids = labelLayout(spec, {
    own, before: readPoint(spec.curves, { cross: ['D', 'S'] }), point: { q: 35, p: 85, snapped: true }, moved: ['S'],
  }).map((l) => `${l.id}=${l.text}`);
  assert.deepEqual(ids, ['P1=P₁ 70', 'Q1=Q₁ 50', 'c:D=D', 'g:S=S₁', 'P2=P₂ 85', 'Q2=Q₂ 35', 'c:S=S₂']);
});

/*
 * Packet 13.7, found walking indirect-tax at 390px: with the tax drawn and the new equilibrium
 * marked, "P₁ 70" was placed across the dashed guide from P₂ — it read as struck through. The
 * solver kept labels off curves but did not know the guides were lines. It does now, each guide
 * owned by its own point's labels (which sit against it by design).
 */
test('no equilibrium label is struck through by the OTHER point’s guide (indirect tax, phone frames)', async () => {
  const { getSpec, applyShifts, readPoint, labelLayout, lineObstacles, fixedBoxes, estimateBox, placeLabels, plotFor, PLOT } = await import('./diagram/index.mjs');
  const { crosses } = await import('./diagram/layout.mjs');
  const { originSpec, pointSpec } = await import('./diagram/shape.mjs');
  const spec = getSpec('indirect-tax');
  const own = applyShifts(spec.curves, { S: 30 });
  const before = readPoint(spec.curves, originSpec(spec));
  const point = { ...readPoint(own, pointSpec(spec)), snapped: true };
  for (const plot of [plotFor(271), plotFor(291), PLOT]) {
    const layout = labelLayout(spec, { own, before, point, moved: ['S'] }, plot);
    const labels = layout.map((l) => ({ id: l.id, box: estimateBox(l), slide: l.slide, optional: l.optional }));
    const lines = lineObstacles(spec, { own, moved: ['S'], before, point }, plot);
    const placed = placeLabels(labels, { bounds: { width: plot.w, height: plot.h }, fixed: fixedBoxes(spec, 1, plot), lines });
    const p1 = placed.find((p) => p.id === 'P1');
    const box = labels.find((l) => l.id === 'P1').box;
    const at = { x: box.x + p1.dx, y: box.y + p1.dy, w: box.width, h: box.height };
    const others = lines.filter((l) => !Array.isArray(l) && !l.owners.includes('P1'));
    assert.ok(others.length === 2, 'the P₂ guides are obstacles');
    for (const g of others) assert.ok(!crosses(g.seg, at), `P₁ crosses a P₂ guide on the ${plot.w}-wide frame`);
  }
});
