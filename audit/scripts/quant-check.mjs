#!/usr/bin/env node
// Quantitative drill guard. Draws every template many times over and asserts the
// properties that cannot be checked by reading the code, because they only fail on
// particular numbers.
//
//   node audit/scripts/quant-check.mjs             200 draws per template, exit 1 on failure
//   node audit/scripts/quant-check.mjs --draws 2000
//   node audit/scripts/quant-check.mjs --verbose   print a sample item per template
//
// Six checks run on every draw:
//
//   1. invariants  — the template's own conditions (whole units, rising cash flows, …)
//   2. precision   — every answer is exact at the number of decimal places it asks for
//   3. finite      — no NaN, no Infinity, anywhere in an answer or a slip
//   4. slips       — every named wrong method is further from the answer than the
//                    tolerance. A slip inside tolerance marks a wrong method CORRECT,
//                    which silently teaches the wrong thing and is invisible in review.
//   5. full marks  — the correct response set scores every mark
//   6. own figures — a wrong first step carried correctly through the second still scores
//
// Plus two checks per template over the whole run: the draw does not repeat itself, and
// the parameter space is big enough that the answers cannot be learned by heart.
//
// Static by design: no browser, no network, no database. It is the floor for drill
// content the way `npm run contrast` is the floor for light mode.
import { templates, buildItem, markItem, correctResponses } from '../../lib/quant/index.mjs';

const args = process.argv.slice(2);
const DRAWS = Number(args[args.indexOf('--draws') + 1]) || 200;
const VERBOSE = args.includes('--verbose');
const MIN_VARIANTS = 500;

const failures = [];
const fail = (template, seed, check, detail) => failures.push({ template, seed, check, detail });

const round = (n, dp) => Number(Number(n).toFixed(dp));

for (const template of templates) {
  const stems = new Set();
  let sample = null;

  for (let i = 0; i < DRAWS; i++) {
    const seed = `check-${template.id}-${i}`;
    let item;
    try {
      item = buildItem(template.id, seed);
    } catch (err) {
      fail(template.id, seed, 'draw', err.message);
      continue;
    }
    if (!sample) sample = item;
    stems.add(item.stem);

    // 1. the template's own invariants
    if (typeof template.invariants === 'function') {
      for (const problem of template.invariants(item.data)) fail(template.id, seed, 'invariants', problem);
    }

    for (const step of item.steps) {
      if (step.type === 'choice') {
        if (!step.choices?.includes(step.answer)) {
          fail(template.id, seed, 'choice', `${step.id}: answer "${step.answer}" is not one of the choices`);
        }
        continue;
      }

      // 3. finite
      if (!Number.isFinite(step.answer)) {
        fail(template.id, seed, 'finite', `${step.id}: answer is ${step.answer}`);
        continue;
      }
      if (!Number.isFinite(step.tolerance) || step.tolerance < 0) {
        fail(template.id, seed, 'finite', `${step.id}: tolerance is ${step.tolerance}`);
      }

      // 2. precision — the answer must be exact at the decimal places the label asks for
      if (typeof step.dp === 'number' && Math.abs(round(step.answer, step.dp) - step.answer) > 1e-9) {
        fail(template.id, seed, 'precision', `${step.id}: ${step.answer} is not exact to ${step.dp} dp`);
      }

      // 4. slip separation — the check that matters most
      for (const slip of step.slips || []) {
        if (!Number.isFinite(slip.value)) {
          fail(template.id, seed, 'finite', `${step.id}: slip value is ${slip.value}`);
          continue;
        }
        const target = step.acceptAbs ? Math.abs(step.answer) : step.answer;
        const given = step.acceptAbs ? Math.abs(slip.value) : slip.value;
        if (Math.abs(given - target) <= step.tolerance + 1e-9) {
          fail(
            template.id, seed, 'slips',
            `${step.id}: slip ${slip.value} is within tolerance ${step.tolerance} of the answer ${step.answer}, ` +
            `so a student using the wrong method would be marked correct`,
          );
        }
        if (!slip.note || slip.note.length < 20) {
          fail(template.id, seed, 'slips', `${step.id}: slip ${slip.value} has no usable feedback`);
        }
      }
    }

    // 5. the correct response set scores full marks
    const clean = markItem(item, correctResponses(item));
    if (clean.awarded !== clean.total) {
      const missed = Object.entries(clean.steps).filter(([, r]) => r.awarded < r.marks).map(([id, r]) => `${id}:${r.outcome}`);
      fail(template.id, seed, 'full marks', `scored ${clean.awarded}/${clean.total} on its own answers (${missed.join(', ')})`);
    }

    // 6. own figure rule — break step one, carry it correctly into whatever depends on it
    const dependants = item.steps.filter((s) => typeof s.ofr === 'function');
    if (dependants.length) {
      const first = item.steps[0];
      if (first.type !== 'choice' && Number.isFinite(first.answer)) {
        const wrong = first.answer + Math.max(1, Math.abs(first.answer) * 0.1);
        const responses = { [first.id]: wrong };
        const values = { [first.id]: wrong };
        for (const step of item.steps.slice(1)) {
          const carried = typeof step.ofr === 'function' ? step.ofr(values) : null;
          const value = carried !== null && Number.isFinite(carried) ? carried : step.answer;
          responses[step.id] = value;
          values[step.id] = step.type === 'choice' ? step.answer : value;
        }
        const carriedResult = markItem(item, responses);
        const dependant = dependants[0];
        const outcome = carriedResult.steps[dependant.id].outcome;
        if (outcome !== 'ofr' && outcome !== 'correct') {
          fail(
            template.id, seed, 'own figures',
            `${dependant.id}: a figure carried correctly from a wrong ${first.id} scored ${outcome}`,
          );
        }
      }
    }
  }

  // variety — the whole claim for these items is that the answer cannot be memorised
  // between reviews, so a small parameter space is a correctness problem, not a polish one
  const distinct = stems.size;
  if (distinct < Math.floor(DRAWS * 0.8)) {
    fail(template.id, '—', 'variety', `only ${distinct} distinct stems in ${DRAWS} draws — the draw is repeating`);
  }
  if (!(template.variants >= MIN_VARIANTS)) {
    fail(template.id, '—', 'variety', `${template.variants} number sets declared; under ${MIN_VARIANTS} is memorisable over a course`);
  }

  if (VERBOSE && sample) {
    console.log(`\n── ${template.id} · ${template.unit} · ${template.title}`);
    console.log(`   ${sample.stem.replace(/\*\*/g, '')}`);
    for (const step of sample.steps) {
      console.log(`   ${String(step.marks)}m  ${step.label}: ${step.answer}${step.suffix ? ' ' + step.suffix : ''}`);
    }
    console.log(`   ${distinct} distinct stems in ${DRAWS} draws · ~${template.variants.toLocaleString('en-US')} number sets available`);
  }
}

const total = templates.length * DRAWS;
if (failures.length === 0) {
  console.log(`quant-check: ${templates.length} templates × ${DRAWS} draws = ${total} items, all clean`);
  process.exit(0);
}

console.error(`\nquant-check: ${failures.length} failure${failures.length === 1 ? '' : 's'} in ${total} items\n`);
const byCheck = {};
for (const f of failures) (byCheck[f.check] ||= []).push(f);
for (const [check, list] of Object.entries(byCheck)) {
  console.error(`  ${check} (${list.length})`);
  for (const f of list.slice(0, 5)) console.error(`    ${f.template} [${f.seed}] ${f.detail}`);
  if (list.length > 5) console.error(`    …and ${list.length - 5} more`);
}
console.error('');
process.exit(1);
