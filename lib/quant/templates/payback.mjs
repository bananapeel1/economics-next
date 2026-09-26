import { money, num, FIRMS } from '../format.mjs';

/**
 * Simple payback. Edexcel IAL Business, WBS13 (Unit 3), spec 3.3.3 Decision-making
 * techniques, topic 2 leaves a and d (bus_spec.txt:1146, :1155, :1158-1159).
 * Quantitative skill QS6, "calculate investment appraisal outcomes and interpret results"
 * (bus_spec.txt:2281) — the IA2 half of the appendix, which is why this is a Unit 3 drill.
 *
 * Generated backwards from the answer, for the reason `arr.mjs` gives. The payback month
 * is drawn first and the cash flows are derived from it, so the shortfall always falls
 * inside a year that can pay it off and the months come out whole. Drawing cash flows
 * forwards and hoping the payback lands on a whole month gives an ugly question most of
 * the time — "3 years and 7.43 months" is arithmetic, not appraisal.
 *
 * Payback is taught in years-and-months, and the months step is where students lose the
 * mark: the two named slips are the two ways they lose it.
 */
/** In words, not digits: "the next 4 years" put a bare 4 in the stem, and a payback of 4 months
 *  then read off the page. 37 draws in 5,000 — the last of three leaks this template has had. */
const COUNT_WORDS = { 3: 'three', 4: 'four', 5: 'five', 6: 'six' };

/*
 * Every year of the table is offered, in words, in order. Packet 13.3, from `quant-check` check 8:
 * the choices were the year before, the year itself and the year after — so the right one was
 * the MIDDLE choice on every draw, and the card renders choices in the order given. A student
 * who tapped the middle one scored the mark 5,000 times in 5,000 without adding anything up.
 * Offering the whole table puts the answer wherever the payback year is (second, third or fourth,
 * a third of draws each). The table is always five years long for the same reason: it was four
 * years unless the money came back in year 4, when it grew a fifth — so "five years" in the stem
 * meant "year 4", and five choices would have said it again.
 *
 * Words, not "year 3", so that no choice prints a digit. The previous choices printed three year
 * numbers, and the draw had to refuse any month count equal to one of them (check 7 reads a choice
 * without the small-integer exemption). Five numbered years would have ruled out months 1 to 5.
 */
const YEARS = 5;
const ORDINALS = ['the first year', 'the second year', 'the third year', 'the fourth year', 'the fifth year'];

const range = (low, high, by) => Array.from({ length: (high - low) / by + 1 }, (_, i) => low + i * by);
const INVESTMENTS = range(60000, 140000, 10000);
/** The window each year's cash flow is drawn from, by position in the table. */
const FLOW_RANGES = [
  range(18000, 34000, 2000),
  range(20000, 38000, 2000),
  range(24000, 42000, 2000),
  range(26000, 46000, 2000),
  range(26000, 46000, 2000),
];

/*
 * Never 0 and never 12 — both hide the method. Never 6 either, and that one is not cosmetic: at
 * 6 months the named slip `12 − months` IS the answer, so a student who counted the months
 * remaining would be marked correct. `npm run quant-check` fails the draw; excluding it here is
 * the fix.
 */
const MONTHS = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];

/**
 * The set (investment, the flows before the payback year) that pays back in `month` of `year`,
 * with that year's flow derived, or null if it is rejected.
 */
function clean(investment, earlier, year, month, before = earlier.reduce((a, b) => a + b, 0)) {
  // `before` is the cumulative cash at the end of the year BEFORE payback lands.
  const shortfall = investment - before;
  if (shortfall <= 0) return null;                // the money is already back
  // The cash received so far is a named slip on this step. Where the two are equal —
  // an investment that is exactly twice the cash banked — that slip IS the answer and
  // a student who never subtracted would be marked correct.
  if (Math.abs(before - shortfall) < 1) return null;

  // The payback year's flow is derived so that shortfall / flow is exactly the month drawn.
  const paybackFlow = (shortfall * 12) / month;
  if (paybackFlow % 1 !== 0) return null;         // a whole-dollar cash flow or nothing
  if (paybackFlow < 20000 || paybackFlow > 90000) return null;

  // No answer may be one of the figures printed above it: a student who copied a cash flow
  // out of the stem would take the marks for a subtraction they never did. See `arr`. The
  // flows AFTER the payback year are drawn later and kept off the shortfall there.
  if (shortfall === investment || shortfall === paybackFlow || earlier.includes(shortfall)) return null;

  return { investment, earlier, year, month, before, shortfall, paybackFlow };
}

/** The earlier flows for a payback in `year`: every combination of the windows before it. */
const earlierFlows = (year) => FLOW_RANGES.slice(0, year - 1)
  .reduce((combos, window) => combos.flatMap((c) => window.map((f) => [...c, f])), [[]]);

/*
 * The payback YEAR is drawn first, evenly, then a month, evenly among those that year can reach,
 * and only then a set — enumerated, not found by redrawing.
 *
 * The draw used to pick everything at once and throw the whole set away on any rejection, so a
 * month survived in proportion to how many sets could produce it. 10 months fits almost any
 * shortfall (the flow is 1.2 × it); 1 month needs a shortfall a twelfth of a year's cash. The
 * months step was 10 in 36% of draws, and typing 10 without working scored it (`quant-check`
 * check 8, packet 13.3). Not every pair exists: a year-2 payback leaves at least $26,000 to
 * repay, which no flow under $90,000 clears in three months or fewer, so year 2 draws from seven
 * months and years 3 and 4 from all ten. Each month is 6.7-11.4% of draws.
 *
 * Enumerated because redrawing cannot find the rare pairs: year 2 at 4 months has 2 sets among
 * 81, and a 200-attempt loop would throw on a run of `quant-check` often enough to matter. Built
 * per year on first use rather than at import, because this module loads in the browser and
 * year 4 alone is 81,000 candidates — about 14ms that a card for year 2 never needs.
 */
const SETS = new Map();
function setsFor(year) {
  if (!SETS.has(year)) {
    const byMonth = new Map(MONTHS.map((month) => [month, []]));
    const earlier = earlierFlows(year);
    for (const investment of INVESTMENTS) {
      for (const e of earlier) {
        const before = e.reduce((a, b) => a + b, 0);
        if (investment <= before) continue;       // `clean` refuses these too; skipped for speed
        for (const month of MONTHS) {
          const set = clean(investment, e, year, month, before);
          if (set) byMonth.get(month).push(set);
        }
      }
    }
    for (const [month, sets] of byMonth) if (!sets.length) byMonth.delete(month);
    SETS.set(year, byMonth);
  }
  return SETS.get(year);
}

/*
 * 3,258,661, counted by exhaustion rather than multiplied out as a floor: every clean set, times
 * the flows after the payback year that stay off the shortfall, times seven firms. The stem prints
 * the firm, the investment and all five flows, and those fix everything else, so each is a
 * distinct question. Counted on first read — only `quant-check` and /admin/quant read it.
 */
let variants = null;
const countVariants = () => (variants ??= [2, 3, 4].reduce((n, year) => n + [...setsFor(year).values()].flat()
  .reduce((m, set) => m + FLOW_RANGES.slice(year)
    .reduce((k, window) => k * (window.length - (window.includes(set.shortfall) ? 1 : 0)), 1), 0), 0) * FIRMS.length);

const template = {
  id: 'payback',
  subject: 'business',
  unit: 'WBS13',
  specCode: '3.3.3',
  specLeaf: '3.3.3 · 2a, 2d',
  qs: 'QS6',
  specTerm: 'payback',
  title: 'Payback period',
  topic: 'Decision-making techniques',
  get variants() { return countVariants(); },

  draw(rng) {
    const paybackYear = rng.pick([2, 3, 4]);          // the year the money comes back in
    const byMonth = setsFor(paybackYear);
    const paybackMonth = rng.pick([...byMonth.keys()]);
    const { investment, earlier, before, shortfall, paybackFlow } = rng.pick(byMonth.get(paybackMonth));
    // The years after the payback year, so the table does not end on the year that pays back and
    // give it away. None may be the shortfall, for the reason `clean` gives.
    const later = FLOW_RANGES.slice(paybackYear).map((window) => rng.pick(window.filter((f) => f !== shortfall)));
    const flows = [...earlier, paybackFlow, ...later];
    return { firm: rng.pick(FIRMS), investment, flows, paybackYear, paybackMonth, before, shortfall, paybackFlow };
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    const cum = d.flows.slice(0, d.paybackYear - 1).reduce((a, b) => a + b, 0);
    if (cum !== d.before) bad.push('cumulative cash before the payback year does not match the draw');
    if (d.shortfall <= 0) bad.push('the investment is already repaid before the payback year');
    if (d.shortfall >= d.flows[d.paybackYear - 1]) bad.push('the payback year cannot cover the shortfall');
    if ((d.shortfall * 12) % d.flows[d.paybackYear - 1] !== 0) bad.push('the payback month is not whole');
    if (d.paybackMonth < 1 || d.paybackMonth > 11) bad.push('payback month is 0 or 12');
    if (d.paybackMonth === 6) bad.push('payback month is 6, where the “months remaining” slip equals the answer');
    if (d.flows.length !== YEARS) bad.push('the table is not five years long, so its length hints at the payback year');
    if (d.paybackYear >= d.flows.length) bad.push('the table ends on the payback year');
    if ([d.shortfall, d.paybackMonth].some((a) => [d.investment, ...d.flows].includes(a))) {
      bad.push('an answer is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    /*
     * The cash flows are listed in order rather than labelled "year 1 … year 4". The labels made
     * the numbers 1 to 4 appear in the stem, and a payback of 2 months then coincided with one
     * of them in 369 draws of 5,000 — not exploitable, since there are seven candidate months
     * and guessing a visible year number is worse than guessing, but it is the same shape as the
     * leaks this template has already had twice, and an ordered list says the same thing.
     */
    // Joined from the array, not patched with a regex afterwards: every figure already contains
    // a thousands comma, so "replace the last comma" finds the wrong one and the list reads
    // "$22,000, $22,000, $84,000, $36,000" with no "and" in it.
    const amounts = d.flows.map((f) => `**${money(f)}**`);
    const years = `${amounts.slice(0, -1).join(', ')} and ${amounts[amounts.length - 1]}`;
    return {
      stem:
        `**${d.firm}** is considering a machine costing **${money(d.investment)}**. Its net cash ` +
        `flows over the next ${COUNT_WORDS[d.flows.length] || d.flows.length} years, in order, are ` +
        `expected to be ${years}.`,
      /*
       * The year comes FIRST, and no later label names it. Verify A round 5: the previous
       * arrangement put "Months into year 4 before the investment is repaid" above a choice
       * whose answer was "year 4", so the last mark was free in 5,000 draws of 5,000 — a
       * smaller version of exactly the leak round 4 had just closed, introduced by the fix for
       * it. Every label below says "that year" and means the one the student has just chosen,
       * which is also the better item: working out WHICH year the money comes back in is the
       * method, not a fact to be handed over in a heading.
       */
      steps: [
        {
          id: 'verdict',
          label: 'The investment is paid back during',
          method: 'the year in which the cumulative cash flow first passes the cost',
          type: 'choice',
          marks: 1,
          answer: ORDINALS[d.paybackYear - 1],
          choices: ORDINALS.slice(0, d.flows.length),
          correctNote:
            `Cumulative cash reaches ${money(d.before)} by the end of the year before, so the investment is ` +
            `still ${money(d.shortfall)} short \u2014 and that year's ${money(d.paybackFlow)} is what clears it.`,
          wrongNote:
            `Add the cash flows up year by year: the payback year is the first one whose running total passes ` +
            `${money(d.investment)}, not the last one that falls short of it.`,
        },
        {
          id: 'shortfall',
          label: 'Cash still to be repaid when that year begins',
          method: 'cost of the investment \u2212 cumulative net cash flow before it',
          prefix: '$',
          marks: 2,
          dp: 0,
          answer: d.shortfall,
          tolerance: 0.5,
          slips: [
            {
              value: d.before,
              note: 'That is the cash received so far, not what is left to repay. Take it off the cost of the investment.',
            },
            {
              value: d.investment + d.before,
              note: 'You added the cash received to the cost. Payback counts the outlay down, so it comes off.',
            },
          ],
        },
        {
          id: 'months',
          label: 'Months into that year before the investment is repaid',
          method: 'cash still to be repaid \u00f7 that year\u2019s net cash flow \u00d7 12',
          suffix: 'months',
          marks: 2,
          dp: 0,
          answer: d.paybackMonth,
          tolerance: 0.5,
          ofr: (v) => (Number.isFinite(v.shortfall) ? (v.shortfall * 12) / d.paybackFlow : null),
          slips: [
            {
              value: Number((d.shortfall / d.paybackFlow).toFixed(2)),
              note: 'That is the fraction of the year, not the number of months. Multiply it by 12.',
            },
            {
              value: 12 - d.paybackMonth,
              note: 'You counted the months left in the year instead of the months used to repay the balance.',
            },
          ],
        },
      ],
      solution: [
        `Cumulative cash by the end of year ${d.paybackYear - 1} = ${money(d.before)}`,
        `Still to repay = ${money(d.investment)} − ${money(d.before)} = **${money(d.shortfall)}**`,
        `Months into year ${d.paybackYear} = ${money(d.shortfall)} ÷ ${money(d.paybackFlow)} × 12 = **${num(d.paybackMonth)} months**`,
        `Payback = **${d.paybackYear - 1} year${d.paybackYear - 1 === 1 ? '' : 's'} ${d.paybackMonth} months**`,
      ],
    };
  },
};

export default template;
