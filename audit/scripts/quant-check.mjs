#!/usr/bin/env node
// Quantitative drill guard. Draws every template many times over and asserts the
// properties that cannot be checked by reading the code, because they only fail on
// particular numbers.
//
//   node audit/scripts/quant-check.mjs             200 draws per template, exit 1 on failure
//   node audit/scripts/quant-check.mjs --draws 2000
//   node audit/scripts/quant-check.mjs --verbose   print a sample item per template
//
// Seven checks run on every draw:
//
//   1. invariants  — the template's own conditions (whole units, rising cash flows, …)
//   2. precision   — every answer is exact at the number of decimal places it asks for
//   3. finite      — no NaN, no Infinity, anywhere in an answer or a slip
//   4. slips       — every named wrong method is further from the answer than the
//                    tolerance. A slip inside tolerance marks a wrong method CORRECT,
//                    which silently teaches the wrong thing and is invisible in review.
//   5. full marks  — the correct response set scores every mark
//   6. own figures — a wrong first step carried correctly through the second still scores
//   7. printed answer — no step's answer appears anywhere the student can read it before
//                    answering. Five of the eight templates failed this when it was written
//                    (packet 13.2), three of them shipped and verified in 13.1: a stem that
//                    prints a figure which happens to BE an answer marks a student correct for
//                    copying it, and checks 1-6 cannot see it because every figure involved is
//                    individually correct.
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

    // 7. no answer is printed where the student can read it before answering.
    //
    // Added by packet 13.2, after Verify A round 3 found one instance and a probe reading the
    // shipping card found three more: `breakeven` where the variable cost equalled the
    // contribution (1 draw in 23), `arr` and `payback` where a cash flow equalled the figure
    // step one asks for (1 in 21 and 1 in 12), and `percentage-change-economics` where the
    // third CHOICE was step one's answer (1 in 5,890). Every one marked a student correct for
    // typing a number they could see. None of the six checks above can see it: from inside the
    // template every figure is correct, and it is the COMBINATION of a correct stem and a
    // correct answer that leaks.
    //
    // Choices are included — a distractor printing another step's answer is the subtlest case —
    // but a choice step's OWN answer is exempt, because printing it is what a choice is.
    //
    // A bare small integer in the STEM or a LABEL is exempt unless it carries a currency symbol
    // or a per cent sign: "Months into year 4" has to say 4, and a payback of 4 months is then a
    // coincidence rather than a leak.
    //
    // In a CHOICE it is never a coincidence. Choices are built from the answers, and `payback`
    // offered "3 years 7 months" against "4 years 7 months" — printing the answer to the step
    // above it, in two of three choices, on EVERY draw. Verify A round 4 defeated the first
    // version of this exemption exactly there: type the month that appears twice, score 2 of 2,
    // 5,000 draws out of 5,000, no arithmetic. So the stem and the labels are scanned with the
    // exemption and the choices are scanned without it.
    //
    // Thousands separators come out first, or "$6,240,000" reads as printing a 6.
    // The method line is excluded, and only the method line: it is a formula, never data, and
    // its constants are structure. "× 100" made every forecast that rounds to 100.0 read as a
    // printed answer, which is the "year 4" problem one size up and just as undesignable-away.
    const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1');
    const prose = strip([item.stem, ...item.steps.flatMap((s) => [s.label, s.prefix, s.suffix])]);
    const constructed = strip(item.steps.flatMap((s) => s.choices || []));
    for (const step of item.steps) {
      if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
      // `acceptAbs` steps are marked on the absolute value — an elasticity of −0.4 is accepted
      // as 0.4 — so the card printing "0.4" leaks the answer just as surely. Searching only the
      // signed form saw 758 of ped's leaks where the template's own invariant saw 1,082.
      const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1)))]);
      if (step.acceptAbs) {
        forms.add(String(Math.abs(step.answer)));
        forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
      }
      for (const form of forms) {
        // Lookarounds, not character classes. `([^0-9.]|$)` on the right excluded a full stop,
        // so the same leak fired mid-stem and went silent at the end of a sentence — 151 of
        // payback's 568. What must not follow is another digit, or a decimal point with a digit
        // after it; a sentence-ending full stop is not part of the number.
        const pattern = new RegExp(`(?<![0-9.])(\\$?)${form.replace('.', '\\.')}(%?)(?![0-9])(?!\\.[0-9])`);
        const inProse = pattern.exec(prose);
        const inChoice = pattern.exec(constructed);
        const smallInteger = Number.isInteger(step.answer) && Math.abs(step.answer) <= 12;
        const hit = inChoice || (inProse && (!smallInteger || inProse[1] === '$' || inProse[2] === '%') ? inProse : null);
        if (!hit) continue;
        fail(
          template.id, seed, 'printed answer',
          `${step.id}: the answer ${step.answer} is printed ${inChoice ? 'in a choice' : 'on the card'} as ` +
          `"${hit[1]}${form}${hit[2]}", so a student who typed a figure they could see would be marked correct`,
        );
        break;
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
      // The first NUMERIC step, not `steps[0]`. A template that opens with a choice — `payback`
      // does now, because naming the payback year in a later step's label handed the choice away
      // — would otherwise skip this check entirely and look green while the own figure rule went
      // unexercised. Packet 13.2, Verify A round 5.
      const first = item.steps.find((s) => s.type !== 'choice' && Number.isFinite(s.answer));
      if (first) {
        const wrong = first.answer + Math.max(1, Math.abs(first.answer) * 0.1);
        const responses = { [first.id]: wrong };
        const values = { [first.id]: wrong };
        for (const step of item.steps.slice(item.steps.indexOf(first) + 1)) {
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
  // between reviews, so a small parameter space is a correctness problem, not a polish one.
  //
  // The floor is 80% of what RANDOM SAMPLING CAN REACH, not 80% of the draws. Drawing D
  // times from V number sets is expected to touch V(1 − (1 − 1/V)^D) of them, and that
  // number falls below 0.8 × D as soon as D approaches V — so a flat `0.8 × DRAWS` rule
  // turns `--draws 2000` into three failures against templates whose draws are perfect
  // (packet 13.2 measured: ped 1302, percentage-change-economics 1212, multiplier 559,
  // all of them at or above what their own parameter spaces allow). A red herring in a
  // guard is worse than no guard: the next session "fixes" arithmetic that was right.
  //
  // `variants` is the template's own declaration, so under-declaring it lowers this floor.
  // It cannot be used to dodge the check: MIN_VARIANTS below is an absolute floor on the
  // same number, and a template that under-declares fails that instead.
  const distinct = stems.size;
  const reachable = template.variants > 0
    ? template.variants * (1 - Math.pow(1 - 1 / template.variants, DRAWS))
    : DRAWS;
  const floor = Math.floor(Math.min(DRAWS, reachable) * 0.8);
  if (distinct < floor) {
    fail(
      template.id, '—', 'variety',
      `only ${distinct} distinct stems in ${DRAWS} draws — the draw is repeating ` +
      `(${floor} is 80% of the ${Math.round(Math.min(DRAWS, reachable))} that ${template.variants.toLocaleString('en-US')} number sets can reach)`,
    );
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
