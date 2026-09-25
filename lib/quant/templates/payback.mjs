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
  // 9 investments × 3 payback years × 10 payback months × 9 first-year flows × 7 firms.
  // A floor, not a count: the later cash flows are drawn too and rejection only removes sets.
  variants: 9 * 3 * 10 * 9 * FIRMS.length,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      const investment = rng.step(60000, 140000, 10000);
      const paybackYear = rng.int(2, 4);          // the year the money comes back in
      // Never 0 and never 12 — both hide the method. Never 6 either, and that one is not
      // cosmetic: at 6 months the named slip `12 − months` IS the answer, so a student who
      // counted the months remaining would be marked correct, and the third choice below would
      // appear twice. `npm run quant-check` fails the draw; excluding it here is the fix.
      const paybackMonth = rng.pick([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
      const y1 = rng.step(18000, 34000, 2000);
      const y2 = rng.step(20000, 38000, 2000);
      const y3 = rng.step(24000, 42000, 2000);

      const flows = [y1, y2, y3];
      // Cumulative cash at the end of the year BEFORE payback lands.
      const before = flows.slice(0, paybackYear - 1).reduce((a, b) => a + b, 0);
      const shortfall = investment - before;
      if (shortfall <= 0) continue;               // the money is already back; redraw
      // The cash received so far is a named slip on this step. Where the two are equal —
      // an investment that is exactly twice the cash banked — that slip IS the answer and
      // a student who never subtracted would be marked correct.
      if (Math.abs(before - shortfall) < 1) continue;

      // The payback year's flow is derived so that shortfall / flow is exactly the month drawn.
      const paybackFlow = (shortfall * 12) / paybackMonth;
      if (paybackFlow % 1 !== 0) continue;        // a whole-dollar cash flow or nothing
      if (paybackFlow < 20000 || paybackFlow > 90000) continue;

      flows[paybackYear - 1] = paybackFlow;
      // A fourth year, so the table does not end on the year that pays back and give it away.
      flows.push(rng.step(26000, 46000, 2000));

      // No answer may be one of the figures printed above it: a student who copied a cash flow
      // out of the stem would take the marks for a subtraction they never did. See `arr`.
      const printed = [investment, ...flows];
      if ([shortfall, paybackMonth].some((answer) => printed.includes(answer))) continue;
      // The three choices on the last step print year numbers, and a month count that happens
      // to equal one of them is readable off the page even though nothing intends it.
      if ([paybackYear - 1, paybackYear, paybackYear + 1].includes(paybackMonth)) continue;

      return { firm: rng.pick(FIRMS), investment, flows, paybackYear, paybackMonth, before, shortfall, paybackFlow };
    }
    throw new Error('payback: no clean draw in 200 attempts');
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
    if ([d.paybackYear - 1, d.paybackYear, d.paybackYear + 1].includes(d.paybackMonth)) {
      bad.push('the month count is one of the year numbers printed in the last step\u2019s choices');
    }
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
          answer: `year ${d.paybackYear}`,
          choices: [`year ${d.paybackYear - 1}`, `year ${d.paybackYear}`, `year ${d.paybackYear + 1}`],
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
