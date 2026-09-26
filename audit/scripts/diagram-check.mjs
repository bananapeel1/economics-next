#!/usr/bin/env node
// Drawing-drill guard. Every spec is marked, its regions are sampled, and its labels are
// placed, across the whole range of shifts a student can produce.
//
//   node audit/scripts/diagram-check.mjs                          exit 1 on failure
//   node audit/scripts/diagram-check.mjs --verbose                per-spec detail
//   node audit/scripts/diagram-check.mjs --module lib/diagram/specs/min-wage.mjs
//   node audit/scripts/diagram-check.mjs --module a.mjs --module b.mjs --only min-wage,ad-as
//
// It runs over every registered spec AND every shape fixture (lib/diagram/fixtures.mjs): the
// fixtures are how a region family or a point shape is proved before the spec that ships it is
// written. Checks 6 and 8's feedback clause are about content, so they run on registered specs
// and --module specs, not on fixtures.
//
// `--module <path>` (repeatable) loads a spec file that is not registered yet — its default export
// and any named export shaped like a spec — so a new spec goes through every check before anyone
// touches lib/diagram/index.mjs, which is one file shared by every author. A module spec whose id
// is already registered is checked INSTEAD of the registered one, and the run says so. `--only
// a,b` narrows the run to those ids (registered, fixture or module). Same shape as quant-check.
//
// Eight checks:
//
//   1. model        the model attempt scores full marks
//   2. wrong way    a shift in the opposite direction keeps the curve mark and loses the
//                   direction mark (the point mark cascades off it, by design). Skipped for a
//                   drill with nothing to move
//   3. disjoint     no point on the canvas belongs to two named regions, at any shift of ANY
//                   movable curve — the wrong curve too, which until 13.7 was never swept and
//                   built overlapping regions. An overlap means two regions answer to one click
//                   and the shading mark becomes a coin toss
//   4. covering     the regions' union is exactly the area the family says it partitions
//                   (regions.mjs WHOLE, written separately from the recipes) — no gap left
//                   unnamed, no region leaking past a curve — and their areas sum to that union,
//                   so nothing is double-counted. Until 13.7 only the second half ran, which a
//                   region overshooting demand passes
//   5. labels       the placement solver, run on the labels the component actually draws (their
//                   real anchors, from lib/diagram/view.mjs labelLayout, with estimated widths),
//                   never leaves two labels on each other or a label on a tick or axis title, at
//                   phone width and desktop width, at every shift
//   6. spec code    the section the drill cites exists in the IAL specification, belongs to the
//                   unit the drill names, and actually covers the thing being drawn
//   7. backwards    the region family builds NOTHING for its own curve shifted the wrong way —
//                   the declared direction is enforced, not just documented
//   8. shape        the spec fits its family: the curves the family reads exist, the curve it
//                   moves is the one the drill expects, in the same direction; any point/origin
//                   the spec states is the family's; the model point and the original point are
//                   on the canvas; every expected region exists; the marks the listing shows are
//                   the marks the scheme awards; and a registered spec has the per-branch
//                   feedback its steps can reach
//
// Static by design: no browser, no network, no database — the same shape as npm run contrast
// and npm run quant-check. Text metrics are supplied by the browser at runtime, so the label
// check estimates widths (generously) to test the ALGORITHM on the real positions; real metrics
// are the component's job.
import {
  specs, listSpecs, mark, modelAttempt, applyShifts, buildRegions, wholeFor, placeLabels, overlaps, contains, area,
  readPoint, familyOf, hasShift, movableOf, directionOf, unitOf, rangeOf, pointSpec, originSpec, marksFor,
  labelLayout, estimateBox, fixedBoxes, lineObstacles, PLOT, plotFor,
} from '../../lib/diagram/index.mjs';
import { shapes } from '../../lib/diagram/fixtures.mjs';
import { checkSpecCitation } from '../../lib/spec-sections.mjs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const valuesOf = (flag) => args.flatMap((a, i) => (a === flag && args[i + 1] ? [args[i + 1]] : []));

const looksLikeSpec = (x) => x && typeof x === 'object' && typeof x.id === 'string' && x.curves && x.expect && x.axes;
const fromModules = [];
for (const path of valuesOf('--module')) {
  const mod = await import(pathToFileURL(resolve(path)).href);
  const found = [...new Set(Object.values(mod).filter(looksLikeSpec))];
  if (!found.length) { console.error(`diagram-check: ${path} exports nothing shaped like a spec (id, axes, curves, expect)`); process.exit(1); }
  for (const s of found) if (!fromModules.some((x) => x.id === s.id)) fromModules.push(s);
}
const moduleIds = new Set(fromModules.map((s) => s.id));
for (const s of specs) if (moduleIds.has(s.id)) console.error(`diagram-check: --module ${s.id} replaces the registered spec of that id for this run`);

const everything = [...specs.filter((s) => !moduleIds.has(s.id)), ...fromModules, ...shapes];
const ONLY = valuesOf('--only').flatMap((v) => v.split(',')).map((v) => v.trim()).filter(Boolean);
if (ONLY.length) {
  const unknown = ONLY.filter((id) => !everything.some((s) => s.id === id));
  if (unknown.length) { console.error(`diagram-check: no spec or fixture ${unknown.join(', ')}`); process.exit(1); }
}
const checked = ONLY.length ? everything.filter((s) => ONLY.includes(s.id)) : everything;
const failures = [];
const fail = (spec, check, detail) => failures.push({ spec, check, detail });
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Shifts a student can plausibly produce, in both directions, in the spec's own steps. */
const sweepOf = (spec) => {
  const out = [];
  const unit = unitOf(spec);
  for (let d = -rangeOf(spec); d <= rangeOf(spec) + 1e-9; d += unit) if (Math.abs(d) > 1e-9) out.push(Math.round(d / unit) * unit);
  return out;
};

const onCanvas = (spec, pt) => pt && pt.q > 0 && pt.q < spec.axes.x.max && pt.p > 0 && pt.p < spec.axes.y.max;

let evaluated = 0;
const registered = new Set(specs.map((s) => s.id));
const listed = Object.fromEntries(listSpecs().map((s) => [s.id, s]));

for (const spec of checked) {
  const isContent = !spec.fixture && (registered.has(spec.id) || moduleIds.has(spec.id));
  const shifting = hasShift(spec);
  const target = spec.expect.curve;
  const wanted = directionOf(spec);
  const family = familyOf(spec.regions);

  /* 6. spec code. Both specs shipped `1.4.3`, a UK GCE number: in the IAL specification every
     section number has 3 as its middle digit, so it names nothing in this product and the chip
     above the drill told a student to revise a section that does not exist. The same class of
     defect lib/quant-pool.test.mjs found in three of 13.1's four templates, in code that had no
     equivalent guard until this check. The shape test alone is not enough — `2.3.1` is a real
     heading and still the wrong one — so the drill also names a phrase the specification uses
     under its own section, and this asserts the phrase is there. */
  if (isContent) {
    const citation = checkSpecCitation(spec);
    if (citation) fail(spec.id, 'spec code', citation);
  }

  /* 8. shape. Everything below trusts these, so they go first. */
  const shapeFail = (detail) => fail(spec.id, 'shape', detail);
  if (spec.regions && !family) shapeFail(`regions names "${spec.regions}", which is not a family in lib/diagram/regions.mjs`);
  if (family) {
    const missing = family.curves.filter((n) => !spec.curves[n]);
    if (missing.length) shapeFail(`family ${spec.regions} reads curve(s) ${missing.join(', ')}, which the spec does not define`);
    if ((family.moves || null) !== (target || null)) shapeFail(`family ${spec.regions} moves ${family.moves || 'nothing'}, but expect.curve is ${target || 'absent'}`);
    if (family.direction !== wanted) shapeFail(`family ${spec.regions} assumes direction ${family.direction}, but the drill expects ${wanted}`);
    if (spec.point && !same(spec.point, family.point)) shapeFail(`spec.point ${JSON.stringify(spec.point)} is not the point its family computes regions from (${JSON.stringify(family.point)})`);
    if (spec.origin && !same(spec.origin, family.origin)) shapeFail(`spec.origin ${JSON.stringify(spec.origin)} is not its family's (${JSON.stringify(family.origin)})`);
  }
  if (spec.expect.regions?.length && !spec.regions) shapeFail('expect.regions is set but the spec names no region family');
  for (const def of [pointSpec(spec), originSpec(spec)]) {
    for (const n of [...def.cross, def.readOn].filter(Boolean)) if (!spec.curves[n]) shapeFail(`the point reads curve ${n}, which the spec does not define`);
  }
  if (shifting) {
    if (!spec.curves[target]) shapeFail(`expect.curve ${target} is not a curve`);
    if (!movableOf(spec).includes(target)) shapeFail(`expect.curve ${target} is not movable, so the drill cannot be answered`);
    if (!(spec.expect.size > 0)) shapeFail('a drill with a shift needs expect.size > 0');
  }
  for (const d of spec.distractors || []) {
    if (!d.feedback) shapeFail(`distractor ${JSON.stringify(d.cross)} has no feedback`);
    for (const n of d.cross) if (!spec.curves[n]) shapeFail(`distractor reads curve ${n}, which the spec does not define`);
  }

  const model = modelAttempt(spec);
  const modelMark = mark(spec, model);
  const origin = readPoint(spec.curves, originSpec(spec));
  if (!onCanvas(spec, origin)) shapeFail(`the original point ${JSON.stringify(origin)} is off the canvas`);
  if (!onCanvas(spec, model.equilibrium)) shapeFail(`the model point ${JSON.stringify(model.equilibrium)} is off the canvas`);
  for (const k of spec.expect.regions || []) if (!modelMark.regions?.[k]) shapeFail(`expected region "${k}" is not one the family builds on the model answer`);
  if (marksFor(spec) !== modelMark.total) shapeFail(`the drill shows ${marksFor(spec)} marks but the scheme awards out of ${modelMark.total}`);
  if (registered.has(spec.id) && !moduleIds.has(spec.id) && listed[spec.id]?.marks !== modelMark.total) shapeFail(`listSpecs says ${listed[spec.id]?.marks} marks; the scheme awards out of ${modelMark.total}`);
  if (isContent) {
    const fb = spec.feedback || {};
    const needs = [
      ...(shifting ? ['rightCurve', 'wrongCurve', 'bothMoved', 'nothingMoved', 'wrongDirection', 'rightDirection'] : []),
      'equilibriumAtOldQuantity',
      ...(spec.expect.regions?.length ? ['rightRegion'] : []),
    ];
    const absent = needs.filter((k) => !fb[k]);
    if (spec.expect.regions?.length && !Object.keys(fb.regions || {}).length) absent.push('regions');
    if (absent.length) shapeFail(`no spec-written feedback for: ${absent.join(', ')} — the student would get the generic line`);
  }

  // 1. model
  if (modelMark.awarded !== modelMark.total) {
    fail(spec.id, 'model', `the model attempt scores ${modelMark.awarded}/${modelMark.total}: ` +
      modelMark.criteria.filter((c) => !c.got).map((c) => `${c.id} ${c.note}`).join('; '));
  }

  // 2. wrong way
  if (shifting) {
    const shifts = { [target]: -wanted * spec.expect.size };
    const eq = readPoint(applyShifts(spec.curves, shifts), pointSpec(spec));
    const wrong = mark(spec, { ...model, shifts, equilibrium: eq ? { q: eq.q, p: eq.p } : null });
    const m1 = wrong.criteria.find((c) => c.id === 'M1');
    const m2 = wrong.criteria.find((c) => c.id === 'M2');
    if (!m1?.got) fail(spec.id, 'wrong way', 'shifting the right curve the wrong way lost the CURVE mark, which should still be earned');
    if (m2?.got) fail(spec.id, 'wrong way', 'shifting the wrong way still earned the direction mark');
  }

  // 7. backwards
  if (family?.moves) {
    for (const d of sweepOf(spec)) {
      if (Math.sign(d) !== -wanted) continue;
      const regions = buildRegions(spec, applyShifts(spec.curves, { [target]: d }));
      if (regions) {
        fail(spec.id, 'backwards', `shift ${target} ${d} (the wrong way) still builds regions: ${Object.keys(regions).join(', ')}`);
        break;
      }
    }
  }

  // 3 + 4. regions, across the sweep of every movable curve (or once, if nothing moves)
  const cases = shifting
    ? movableOf(spec).flatMap((name) => sweepOf(spec).map((d) => ({ [name]: d })))
    : [{}];
  const stop = new Set();
  for (const shifts of cases) {
    const label = Object.entries(shifts).map(([n, d]) => `${n} ${d}`).join('') || 'no shift';
    const curves = applyShifts(spec.curves, shifts);
    const after = readPoint(curves, pointSpec(spec));
    if (!onCanvas(spec, after)) continue;

    let regions;
    try {
      regions = buildRegions(spec, curves);
    } catch (err) {
      fail(spec.id, 'regions', `${label}: ${err.message}`);
      continue;
    }
    if (!regions) continue;
    evaluated++;

    const names = Object.keys(regions);
    const summed = names.reduce((n, k) => n + area(regions[k].points), 0);
    const whole = wholeFor(spec, curves) || [];

    // grid sample: deterministic, fine enough to catch a sliver
    const stepQ = spec.axes.x.max / 240;
    const stepP = spec.axes.y.max / 240;
    let covered = 0;
    let doubled = 0;
    let firstDouble = null;
    let astray = 0;
    let wholeCells = 0;
    let firstAstray = null;
    for (let q = stepQ / 2; q < spec.axes.x.max; q += stepQ) {
      for (let p = stepP / 2; p < spec.axes.y.max; p += stepP) {
        let claims = 0;
        const who = [];
        for (const k of names) if (contains(regions[k].points, q, p)) { claims++; who.push(k); }
        if (claims >= 1) covered++;
        if (claims > 1) { doubled++; if (!firstDouble) firstDouble = `${who.join(' + ')} both contain (${q.toFixed(1)}, ${p.toFixed(1)})`; }
        const inWhole = whole.some((poly) => contains(poly, q, p));
        if (inWhole) wholeCells++;
        if (inWhole !== claims >= 1) {
          astray++;
          if (!firstAstray) firstAstray = inWhole ? `(${q.toFixed(1)}, ${p.toFixed(1)}) is in the area but in no region` : `${who.join(' + ')} reach(es) (${q.toFixed(1)}, ${p.toFixed(1)}), outside the area the family partitions`;
        }
      }
    }

    if (doubled > 0 && !stop.has('disjoint')) {
      fail(spec.id, 'disjoint', `${label}: ${doubled} sampled point(s) in more than one region — ${firstDouble}`);
      stop.add('disjoint');
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
    if (Math.abs(sampledArea - summed) > allowance && !stop.has('covering')) {
      fail(spec.id, 'covering', `${label}: regions sum to ${summed.toFixed(0)} but cover ${sampledArea.toFixed(0)} (allowance ${allowance.toFixed(0)})`);
      stop.add('covering');
    }
    // The regions and the whole share their outer edges exactly, so on a correct family the two
    // tests agree on every sampled point (measured: 0 disagreements at every shift of all ten
    // specs and fixtures). A handful are allowed for a sample landing on an edge, and no more.
    if (astray > Math.max(3, wholeCells * 0.002) && !stop.has('covering')) {
      fail(spec.id, 'covering', `${label}: ${astray} sampled point(s) where the regions and the area the family partitions disagree — ${firstAstray}`);
      stop.add('covering');
    }
  }

  // 5. labels — the component's own layout, estimated widths, at every shift of the target curve
  //    with the point marked where the student should mark it (the most crowded the canvas gets).
  const labelCases = shifting ? [{}, ...sweepOf(spec).map((d) => ({ [target]: d }))] : [{}];
  // The frames the student actually gets (view.mjs plotFor). Phones render the canvas 1:1 in a
  // narrow frame since packet 13.7; the widths are the canvas as measured at 390px and 375px — the
  // Diagrams tab is the narrowest surface (271px at 390) — plus the wide 560 frame for a laptop.
  const FRAMES = [
    { width: 390, plot: plotFor(271) },
    { width: 375, plot: plotFor(256) },
    { width: 1024, plot: PLOT },
  ];
  for (const { width, plot } of FRAMES) {
    // Narrow frames render 1:1, so nothing is scaled — but estimated widths still err wide there,
    // as 13.5 did: the frame is tight enough that an underestimate would be the one that bites.
    const widen = plot.narrow ? 1.25 : 1;
    let reported = false;
    for (const shifts of labelCases) {
      if (reported) break;
      const own = applyShifts(spec.curves, shifts);
      const unit = unitOf(spec);
      const moved = Object.keys(spec.curves).filter((n) => Math.abs(shifts[n] || 0) >= unit);
      const before = readPoint(spec.curves, originSpec(spec));
      const pt = readPoint(own, pointSpec(spec));
      for (const point of [null, pt && onCanvas(spec, pt) ? { ...pt, snapped: true } : null]) {
        if (reported) break;
        const layout = labelLayout(spec, { own, before, point, moved }, plot);
        const labels = layout.map((l) => ({ id: l.id, box: estimateBox(l, widen), slide: l.slide, optional: l.optional }));
        const fixed = fixedBoxes(spec, widen, plot);
        const lines = lineObstacles(spec, { own, moved, before, point }, plot);
        const placed = placeLabels(labels, { bounds: { width: plot.w, height: plot.h }, fixed, lines });
        const bad = overlaps(labels, placed, fixed);
        if (bad.length) {
          const where = Object.entries(shifts).map(([n, d]) => `${n} ${d}`).join('') || 'no shift';
          fail(spec.id, 'labels', `at ${width}px, ${where}${point ? ', point marked' : ''}: ${bad.map((p) => p.join(' × ')).join(', ')}`);
          reported = true;
        }
      }
    }
  }

  if (VERBOSE) {
    console.log(`\n── ${spec.id}${isContent ? ` · ${spec.unit} ${spec.specCode}` : ' · shape fixture'} · ${spec.title}`);
    console.log(`   ${spec.prompt.replace(/\*\*/g, '')}`);
    console.log(`   model scores ${modelMark.awarded}/${modelMark.total}; regions: ${modelMark.regions ? Object.keys(modelMark.regions).join(', ') : 'none'}`);
    for (const c of modelMark.criteria) console.log(`   ${c.got ? '✓' : '✗'} ${c.id} ${c.text}  ${c.rule}`);
  }
}

const nContent = checked.filter((s) => !s.fixture).length;
const nFixture = checked.length - nContent;
const nModule = checked.filter((s) => moduleIds.has(s.id)).length;
const what = `${nContent} spec(s)${nModule ? ` (${nModule} from --module)` : ''} + ${nFixture} shape fixture(s)`;
if (!failures.length) {
  console.log(`diagram-check: ${what}, ${evaluated} region sets sampled, all clean`);
  process.exit(0);
}

console.error(`\ndiagram-check: ${failures.length} failure(s) across ${what}\n`);
const grouped = {};
for (const f of failures) (grouped[f.check] ||= []).push(f);
for (const [check, list] of Object.entries(grouped)) {
  console.error(`  ${check} (${list.length})`);
  for (const f of list.slice(0, 4)) console.error(`    ${f.spec}: ${f.detail}`);
  if (list.length > 4) console.error(`    …and ${list.length - 4} more`);
}
console.error('');
process.exit(1);
