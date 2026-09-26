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
// Plus three checks per template over the whole run: the draw does not repeat itself, the
// parameter space is big enough that the answers cannot be learned by heart, and
//
//   8. concentration — no single answer is right in so many draws that typing it without
//                    working scores. See the comment above the check for the numbers.
//
// Static by design: no browser, no network, no database. It is the floor for drill
// content the way `npm run contrast` is the floor for light mode.
import { templates, buildItem, markItem, correctResponses } from '../../lib/quant/index.mjs';

const args = process.argv.slice(2);
const DRAWS = Number(args[args.indexOf('--draws') + 1]) || 200;
const VERBOSE = args.includes('--verbose');
const MIN_VARIANTS = 500;

// `--module <path>` (repeatable) loads a template file that is not registered yet, so a new
// template can be put through all seven checks before it touches the shared registry — packet
// 13.3 authored twelve at once, and the registry is one file. `--only a,b` narrows the run.
// Every export that looks like a template is taken, so a generator registered twice (one per
// subject, like percentage change) is checked as both.
const valuesOf = (flag) => args.flatMap((a, i) => (a === flag && args[i + 1] ? [args[i + 1]] : []));
for (const path of valuesOf('--module')) {
  const mod = await import(new URL(path, `file://${process.cwd()}/`).href);
  for (const t of Object.values(mod)) {
    if (t && typeof t === 'object' && t.id && typeof t.draw === 'function' && !templates.some((x) => x.id === t.id)) {
      templates.push(t);
    }
  }
}
const ONLY = valuesOf('--only').flatMap((v) => v.split(',')).filter(Boolean);
if (ONLY.length) {
  const unknown = ONLY.filter((id) => !templates.some((t) => t.id === id));
  if (unknown.length) { console.error(`quant-check: no template ${unknown.join(', ')}`); process.exit(1); }
}
const checked = ONLY.length ? templates.filter((t) => ONLY.includes(t.id)) : templates;

const failures = [];
const fail = (template, seed, check, detail) => failures.push({ template, seed, check, detail });

const round = (n, dp) => Number(Number(n).toFixed(dp));

// 8. concentration — thresholds, and the helper that measures a numeric step. The reasoning is
// with the check itself, below the variety check.
const CONCENTRATION_MIN_DRAWS = 200;
const NUMERIC_CAP = 0.25;
const CHOICE_CAP = 0.75;
const noiseAllowance = (cap, n) => 3 * Math.sqrt((cap * (1 - cap)) / n);
const pct = (x) => `${(x * 100).toFixed(1)}%`;
const ordinal = (i) => ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'][i] || `#${i + 1}`;

/**
 * The single typed figure that the most draws would mark correct, and how many. A typed x is
 * right on draw i when it sits inside THAT draw's tolerance of THAT draw's answer — the marker's
 * own rule — so answers of 2.49, 2.5 and 2.51 under a 0.02 tolerance are one answer here, not
 * three. Candidates are the answers themselves.
 * @param {{value:number,tolerance:number}[]} entries  `value` already absolute on `acceptAbs` steps
 */
function mostCommonAnswer(entries) {
  const sorted = entries.slice().sort((a, b) => a.value - b.value);
  const maxTol = sorted.reduce((m, e) => Math.max(m, e.tolerance), 0);
  let best = { value: null, count: 0 };
  let lo = 0;
  let previous = null;
  for (const { value: x } of sorted) {
    if (x === previous) continue;
    previous = x;
    while (sorted[lo].value < x - maxTol - 1e-9) lo++;
    let count = 0;
    for (let i = lo; i < sorted.length && sorted[i].value <= x + maxTol + 1e-9; i++) {
      if (Math.abs(sorted[i].value - x) <= sorted[i].tolerance + 1e-9) count++;
    }
    if (count > best.count) best = { value: x, count };
  }
  return best;
}

for (const template of checked) {
  const stems = new Set();
  let sample = null;
  /** step id → what check 8 needs: every numeric answer, or every choice answer and its place. */
  const answers = new Map();
  const record = (step) => {
    if (!answers.has(step.id)) answers.set(step.id, { choice: step.type === 'choice', numeric: [], text: new Map(), place: new Map(), n: 0 });
    const a = answers.get(step.id);
    a.n++;
    if (step.type === 'choice') {
      a.text.set(step.answer, (a.text.get(step.answer) || 0) + 1);
      const key = `${step.choices.indexOf(step.answer)}/${step.choices.length}`;
      a.place.set(key, (a.place.get(key) || 0) + 1);
    } else {
      a.numeric.push({ value: step.acceptAbs ? Math.abs(step.answer) : step.answer, tolerance: step.tolerance });
    }
  };

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
        } else {
          record(step);
        }
        continue;
      }

      // 3. finite
      if (!Number.isFinite(step.answer)) {
        fail(template.id, seed, 'finite', `${step.id}: answer is ${step.answer}`);
        continue;
      }
      if (Number.isFinite(step.tolerance) && step.tolerance >= 0) record(step);
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
    // A true minus reads as a minus: `money` writes a negative sum as −$3.10 (U+2212 before the
    // dollar), which the signed patterns below would not see as -3.1 without this.
    const strip = (parts) => parts.filter(Boolean).join(' · ').replace(/(\d),(?=\d)/g, '$1')
      .replace(/\u2212\$/g, '$-').replace(/\u2212/g, '-');
    const prose = strip([item.stem, ...item.steps.flatMap((s) => [s.label, s.prefix, s.suffix])]);
    const constructed = strip(item.steps.flatMap((s) => s.choices || []));
    for (const step of item.steps) {
      if (step.type === 'choice' || !Number.isFinite(step.answer)) continue;
      // `acceptAbs` steps are marked on the absolute value — an elasticity of −0.4 is accepted
      // as 0.4 — so the card printing "0.4" leaks the answer just as surely. Searching only the
      // signed form saw 758 of ped's leaks where the template's own invariant saw 1,082.
      // The two-decimal form too: a stem that prints money the way a till does ("$62.50") hid a
      // 62.5 answer from the patterns below, because "62.5" followed by a digit is not a match.
      // Packet 13.3 started printing prices that way, so the check learnt to read them first.
      const forms = new Set([String(step.answer), String(Number(step.answer.toFixed(1))), step.answer.toFixed(2)]);
      if (step.acceptAbs) {
        forms.add(String(Math.abs(step.answer)));
        forms.add(String(Number(Math.abs(step.answer).toFixed(1))));
        forms.add(Math.abs(step.answer).toFixed(2));
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

  // 8. concentration — no answer is right so often that it can be typed without working.
  //
  // The variety check counts STEMS, and a template can print thousands of different stems whose
  // answers are nearly always the same number. Packet 13.3 measured the eight templates packet
  // 13.2 shipped over 3,000 draws: `multiplier`'s `k` was 2.5 in 69.6% of draws, and its
  // `leakages` 0.4 in the same 69.6% — only three leakage totals divide cleanly (0.2, 0.25, 0.4)
  // and 0.4 has by far the most (MPS, MRT, MPM) triples summing to it, so a student who typed
  // 2.5 was right seven times in ten without reading the stem. `ped`'s price change was 10% in
  // 39.1%, `payback`'s months 10 in 35.5%, and `percentage-change-economics`'s growth rate 6.25%
  // in 32.0%. Every one passed checks 1-7 and the variety floor, because every figure was correct
  // and the stems all differed. The whole claim for these items is that the answer cannot be
  // learned by heart; a dominant answer defeats that as surely as a small parameter space does.
  //
  // The rule, per step, over the whole run:
  //   numeric  the single typed figure the most draws would mark correct is right in at most
  //            25% of them. "Would mark correct" is the marker's rule — inside that draw's
  //            tolerance, on the absolute value where the step is `acceptAbs` — so a cluster of
  //            near-identical answers counts as the one answer it is to a student.
  //   choice   no choice TEXT is the right one in more than 75% of draws, and no choice POSITION
  //            either. CalculationItem.jsx renders `step.choices` in array order and does not
  //            shuffle, so "always the middle one" is as learnable as "always Price elastic": a
  //            student who learns where the answer sits scores without reading a word. 75% for a
  //            two-choice step, and the same 75% for three or more, which is lenient there on
  //            purpose — a choice step's job is the concept, and the cap is for the case where
  //            the concept is not needed at all.
  //
  // Robust at small runs, in two ways, because a guard that fails on noise gets "fixed" (see the
  // variety comment above). First, a share fails only when it is above the cap by more than three
  // standard errors of a share AT the cap: +9.2 points at 200 draws, +2.9 at 2,000, +1.8 at 5,000
  // for the numeric cap. A template drawn honestly at 20-23% then trips it by sampling about once
  // in ten thousand runs, and a real 30% fails at 2,000 draws and above. The cost is at the default
  // 200: only a gross concentration (over 34%) fails there — `percentage-change-economics` at 31%
  // passed 200 and failed 2,000 — so hold a template to 25% with `--draws 2000`. Second, under 200
  // draws the check does not run at all. Three standard errors is a normal approximation, and it
  // is poor on a 20-draw smoke run; the final line says the check was skipped rather than letting
  // "all clean" imply it ran. The seeds are fixed, so a failure reproduces at the same `--draws`.
  const readings = [];
  for (const [stepId, a] of answers) {
    if (!a.choice) {
      const top = mostCommonAnswer(a.numeric);
      readings.push({
        stepId, share: top.count / a.n, cap: NUMERIC_CAP, n: a.n,
        what: `${top.value} is right in ${pct(top.count / a.n)} of ${a.n} draws (cap ${pct(NUMERIC_CAP)}), ` +
          `so a student who types it without working scores ${pct(top.count / a.n)} of the time`,
      });
      continue;
    }
    const [text, textCount] = [...a.text].sort((x, y) => y[1] - x[1])[0];
    readings.push({
      stepId, share: textCount / a.n, cap: CHOICE_CAP, n: a.n,
      what: `"${text}" is the right choice in ${pct(textCount / a.n)} of ${a.n} draws (cap ${pct(CHOICE_CAP)})`,
    });
    // Position is read WITHIN each number of choices, because the student sees the count: a step
    // that offers five choices only when the answer is the fourth is 100% by position on those
    // draws, however rare they are overall.
    const byCount = new Map();
    for (const [place, count] of a.place) {
      const [index, of] = place.split('/').map(Number);
      const g = byCount.get(of) || { n: 0, top: null, topCount: 0 };
      g.n += count;
      if (count > g.topCount) Object.assign(g, { top: index, topCount: count });
      byCount.set(of, g);
    }
    for (const [of, g] of byCount) {
      const among = byCount.size > 1 ? ` of the ${g.n} draws that offer ${of}` : ` of ${g.n} draws`;
      readings.push({
        stepId, share: g.topCount / g.n, cap: CHOICE_CAP, n: g.n,
        what: `the right choice is the ${ordinal(g.top)} of ${of} in ${pct(g.topCount / g.n)}${among} ` +
          `(cap ${pct(CHOICE_CAP)}); the card does not shuffle, so it can be tapped by position`,
      });
    }
  }
  if (DRAWS >= CONCENTRATION_MIN_DRAWS) {
    for (const r of readings) {
      if (r.share > r.cap + noiseAllowance(r.cap, r.n)) fail(template.id, '—', 'concentration', `${r.stepId}: ${r.what}`);
    }
  }

  if (VERBOSE && sample) {
    console.log(`\n── ${template.id} · ${template.unit} · ${template.title}`);
    console.log(`   ${sample.stem.replace(/\*\*/g, '')}`);
    for (const step of sample.steps) {
      console.log(`   ${String(step.marks)}m  ${step.label}: ${step.answer}${step.suffix ? ' ' + step.suffix : ''}`);
    }
    console.log(`   ${distinct} distinct stems in ${DRAWS} draws · ~${template.variants.toLocaleString('en-US')} number sets available`);
    for (const r of readings) console.log(`   concentration · ${r.stepId}: ${r.what}`);
  }
}

const total = checked.length * DRAWS;
if (failures.length === 0) {
  const skipped = DRAWS < CONCENTRATION_MIN_DRAWS ? ` (concentration not measured under ${CONCENTRATION_MIN_DRAWS} draws)` : '';
  console.log(`quant-check: ${checked.length} templates × ${DRAWS} draws = ${total} items, all clean${skipped}`);
  process.exit(0);
}

console.error(`\nquant-check: ${failures.length} failure${failures.length === 1 ? '' : 's'} in ${total} items\n`);
const byCheck = {};
for (const f of failures) (byCheck[f.check] ||= []).push(f);
for (const [check, list] of Object.entries(byCheck)) {
  console.error(`  ${check} (${list.length})`);
  // Concentration is one line per template step, not per draw, so every one is shown.
  const shown = check === 'concentration' ? list.length : 5;
  for (const f of list.slice(0, shown)) console.error(`    ${f.template} [${f.seed}] ${f.detail}`);
  if (list.length > shown) console.error(`    …and ${list.length - shown} more`);
}
console.error('');
process.exit(1);
