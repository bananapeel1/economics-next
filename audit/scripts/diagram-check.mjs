#!/usr/bin/env node
// Drawing-drill guard. Every spec is marked, its regions are sampled, and its labels are
// placed, across the whole range of shifts a student can produce.
//
//   node audit/scripts/diagram-check.mjs            exit 1 on failure
//   node audit/scripts/diagram-check.mjs --verbose  per-spec detail
//
// Five checks:
//
//   1. model        the model attempt scores full marks
//   2. wrong way    a shift in the opposite direction keeps the curve mark and loses the
//                   direction mark (the equilibrium mark cascades off it, by design)
//   3. disjoint     no point on the canvas belongs to two named regions. An overlap means
//                   two regions answer to one click and the shading mark becomes a coin toss
//   4. covering     the region areas sum to the area they jointly cover, so nothing is
//                   double-counted and no gap is left unnamed
//   5. labels       the placement solver never returns two overlapping boxes, at phone width
//                   and desktop width, at every shift
//
// Static by design: no browser, no network, no database — the same shape as npm run contrast
// and npm run quant-check. Text metrics are supplied by the browser at runtime, so the label
// check uses synthetic boxes to test the ALGORITHM; real metrics are the component's job.
import { specs, mark, modelAttempt, applyShifts, buildRegions, placeLabels, overlaps, contains, area, intersect } from '../../lib/diagram/index.mjs';

const VERBOSE = process.argv.includes('--verbose');
const failures = [];
const fail = (spec, check, detail) => failures.push({ spec, check, detail });

/** Shifts a student can plausibly produce, in both directions. */
const SWEEP = [];
for (let d = -55; d <= 55; d += 5) if (d !== 0) SWEEP.push(d);

for (const spec of specs) {
  const target = spec.expect.curve;
  const wanted = spec.expect.direction === 'up' ? 1 : -1;

  // 1. model
  const model = mark(spec, modelAttempt(spec));
  if (model.awarded !== model.total) {
    fail(spec.id, 'model', `the model attempt scores ${model.awarded}/${model.total}: ` +
      model.criteria.filter((c) => !c.got).map((c) => `${c.id} ${c.note}`).join('; '));
  }

  // 2. wrong way
  const backwards = modelAttempt(spec);
  backwards.shifts = { [target]: -wanted * spec.expect.size };
  const own = applyShifts(spec.curves, backwards.shifts);
  const eq = intersect(own.D, own.S);
  backwards.equilibrium = eq ? { q: eq.q, p: eq.p } : null;
  const wrong = mark(spec, backwards);
  const m1 = wrong.criteria.find((c) => c.id === 'M1');
  const m2 = wrong.criteria.find((c) => c.id === 'M2');
  if (!m1.got) fail(spec.id, 'wrong way', 'shifting the right curve the wrong way lost the CURVE mark, which should still be earned');
  if (m2.got) fail(spec.id, 'wrong way', 'shifting the wrong way still earned the direction mark');

  // 3 + 4. regions, across the sweep
  for (const d of SWEEP) {
    const shifts = { [target]: d };
    const curves = applyShifts(spec.curves, shifts);
    const after = intersect(curves.D, curves.S);
    if (!after || after.q <= 0 || after.q > spec.axes.x.max || after.p <= 0 || after.p > spec.axes.y.max) continue;

    let regions;
    try {
      regions = buildRegions(spec.regions, spec.curves, curves);
    } catch (err) {
      fail(spec.id, 'regions', `shift ${d}: ${err.message}`);
      continue;
    }
    if (!regions) continue;

    const names = Object.keys(regions);
    const summed = names.reduce((n, k) => n + area(regions[k].points), 0);

    // grid sample: deterministic, fine enough to catch a sliver
    const stepQ = spec.axes.x.max / 240;
    const stepP = spec.axes.y.max / 240;
    let covered = 0;
    let doubled = 0;
    let firstDouble = null;
    for (let q = stepQ / 2; q < spec.axes.x.max; q += stepQ) {
      for (let p = stepP / 2; p < spec.axes.y.max; p += stepP) {
        let claims = 0;
        let who = [];
        for (const k of names) if (contains(regions[k].points, q, p)) { claims++; who.push(k); }
        if (claims >= 1) covered++;
        if (claims > 1) { doubled++; if (!firstDouble) firstDouble = `${who.join(' + ')} both contain (${q.toFixed(1)}, ${p.toFixed(1)})`; }
      }
    }

    if (doubled > 0) {
      fail(spec.id, 'disjoint', `shift ${d}: ${doubled} sampled point(s) in more than one region — ${firstDouble}`);
      break;
    }

    // Grid sampling counts a whole cell whenever its centre is inside, so a thin region is
    // systematically over-measured by roughly its perimeter times the cell size. Compare
    // against that allowance rather than a flat percentage, or every small shift fails.
    const sampledArea = covered * stepQ * stepP;
    const perimeter = names.reduce((n, k) => {
      const pts = regions[k].points;
      let len = 0;
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % pts.length];
        len += Math.hypot((x2 - x1) / stepQ, (y2 - y1) / stepP);
      }
      return n + len;
    }, 0);
    const allowance = perimeter * stepQ * stepP * 1.5;
    if (Math.abs(sampledArea - summed) > allowance) {
      fail(spec.id, 'covering', `shift ${d}: regions sum to ${summed.toFixed(0)} but cover ${sampledArea.toFixed(0)} (allowance ${allowance.toFixed(0)})`);
      break;
    }
  }

  // 5. labels — synthetic boxes standing in for measured text
  for (const width of [390, 1024]) {
    const scale = width / 560;
    const labels = [
      { id: 'P1', box: { x: 60, y: 180, width: 52, height: 14 }, slide: { axis: 'x', limit: 250 } },
      { id: 'Q1', box: { x: 250, y: 352, width: 52, height: 14 }, slide: { axis: 'y', rows: 5 } },
      { id: 'P2', box: { x: 60, y: 186, width: 52, height: 14 }, slide: { axis: 'x', limit: 250 } },
      { id: 'Q2', box: { x: 246, y: 352, width: 52, height: 14 }, slide: { axis: 'y', rows: 5 } },
      { id: 'S2', box: { x: 470, y: 30, width: 26, height: 18 }, slide: { axis: 'y', rows: 2, both: true, alsoX: true } },
      { id: 'S1', box: { x: 468, y: 44, width: 26, height: 18 }, slide: { axis: 'y', rows: 2, both: true, alsoX: true } },
      { id: 'region', box: { x: 240, y: 290, width: 70, height: 12 }, slide: { axis: 'y', rows: 3, both: true, alsoX: true }, optional: true },
    ].map((l) => ({ ...l, box: { ...l.box, width: l.box.width * (scale < 1 ? 1.25 : 1) } }));

    const placed = placeLabels(labels, { bounds: { width: 560, height: 420 } });
    const bad = overlaps(labels, placed);
    if (bad.length) fail(spec.id, 'labels', `at ${width}px: ${bad.map((p) => p.join(' × ')).join(', ')}`);
  }

  if (VERBOSE) {
    console.log(`\n── ${spec.id} · ${spec.unit} · ${spec.title}`);
    console.log(`   ${spec.prompt.replace(/\*\*/g, '')}`);
    console.log(`   model scores ${model.awarded}/${model.total}; regions: ${Object.keys(model.regions).join(', ')}`);
    for (const c of model.criteria) console.log(`   ${c.got ? '✓' : '✗'} ${c.id} ${c.text}  ${c.rule}`);
  }
}

if (!failures.length) {
  console.log(`diagram-check: ${specs.length} spec(s) × ${SWEEP.length} shifts, all clean`);
  process.exit(0);
}

console.error(`\ndiagram-check: ${failures.length} failure(s)\n`);
const grouped = {};
for (const f of failures) (grouped[f.check] ||= []).push(f);
for (const [check, list] of Object.entries(grouped)) {
  console.error(`  ${check} (${list.length})`);
  for (const f of list.slice(0, 4)) console.error(`    ${f.spec}: ${f.detail}`);
  if (list.length > 4) console.error(`    …and ${list.length - 4} more`);
}
console.error('');
process.exit(1);
