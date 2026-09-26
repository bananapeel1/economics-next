import { money, num, round, exactly, FIRMS, ECONOMIES } from '../format.mjs';

/**
 * Percentage change. One generator, registered twice — once per subject — because the
 * arithmetic is identical and the context is not, and a Business student calculating
 * market share should not be handed a GDP deflator.
 *
 *   business   Edexcel IAL Business, WBS11 (Unit 1), spec 1.3.1 Meeting customer needs,
 *              topic 1a "market size and market share" (bus_spec.txt:504, :510).
 *              Quantitative skill QS2 (bus_spec.txt:2270).
 *   economics  Edexcel IAL Economics, WEC12 (Unit 2), spec 2.3.5 Economic growth, topic 4a
 *              (econ_spec.txt:1094, :1121). Quantitative skills QS2 and QS10, "distinguish
 *              between changes in the level of a variable, and the rate of change"
 *              (econ_spec.txt:2766, :2795).
 *
 * The third step of the Economics item IS QS10, and it is the reason this template exists
 * rather than a bare "work out the percentage". A growth rate falling from 5.2% to 3.4% is
 * a fall of 1.8 PERCENTAGE POINTS, and output still rises. Read as "a fall of 1.8%", or as
 * the 34.6% by which the rate itself dropped, it becomes a recession that never happened.
 *
 * ── Why the number sets are enumerated rather than drawn and retried ──
 *
 * `multiplier.mjs` enumerates for one of these reasons; this template has four. Each draw
 * has to satisfy all of them at once, and a rejection loop that hits them at 3% would throw
 * on a run of `quant-check` often enough to matter:
 *
 *   1. the later figure is a whole number, so the stem reads like a published one;
 *   2. the same percentage applied again is exact to the cents/2dp the step asks for;
 *   3. the change in dollars is not also the change in per cent — at $100bn → $104bn the
 *      slip "you gave the change, not the percentage change" IS 4, the right answer, so a
 *      student who never divided would be marked correct;
 *   4. the same holds for dividing by the new figure instead of the original: the gap
 *      between them is pct² / (100 + pct), which closes as the percentage gets small.
 *
 * Checks 3 and 4 are the slip-separation rule `npm run quant-check` enforces, applied at
 * the point where the numbers are chosen instead of after they have failed.
 */

/** Percentage changes exact to 1 dp against the bases below. Nothing under 2.5: see 4 above. */
const PCTS = [2.5, 3, 4, 5, 6, 6.25, 7.5, 8, 10, 12.5, -2.5, -4, -5, -6.25, -8, -10, -12.5];

/** The Economics half is a growth rate, and the stem quotes it back as one: 12.5% a year is
 *  not a rate any of these economies has grown at, and a stem that implies it teaches the
 *  student to accept an implausible figure without blinking. */
const GROWTH_PCTS = [2.5, 3, 4, 5, 6, 6.25, 7.5];

/** Market shares that divide a whole revenue into a whole market. Never 50: share and its
 *  own inverse meet there, so "market ÷ firm" would be marked correct. */
const SHARES = [8, 10, 12.5, 16, 20, 25, 32];

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;

/**
 * Every (before, pct) pair in a range that satisfies the four conditions above.
 * @param {number} low   inclusive, in the item's own units
 * @param {number} high  inclusive
 * @param {number} stepBy
 * @param {number[]} pcts
 * @param {number} dp        decimal places the "same percentage again" step declares
 * @param {number} tolerance that step's tolerance, which the slips must clear
 * @param {number} dpFigures decimal places the stem's own figures are printed to
 * @param {boolean} forecastExact whether the doubly-applied percentage must land exactly on `dp`
 */
function cleanPairs(low, high, stepBy, pcts, dp, tolerance, dpFigures = 0, forecastExact = true) {
  const out = [];
  const steps = Math.round((high - low) / stepBy);
  for (let n = 0; n <= steps; n++) {
    const before = round(low + n * stepBy, dpFigures);
    for (const pct of pcts) {
      const after = round(before * (1 + pct / 100), 6);
      if (!exactTo(after, dpFigures) || after <= 0) continue;
      const forecast = after * (1 + pct / 100);
      // Requiring the SECOND application to land exactly is what makes these sets scarce: it
      // cost the Economics half all but 169 of its number sets, and a stem that can only be
      // written 169 ways is a stem a student meets twice. The step is marked to a tolerance
      // either way, so where `forecastExact` is off the answer is simply the rounded figure
      // and a student computing the exact one is inside it by four orders of magnitude.
      if (forecastExact && !exactTo(forecast, dp)) continue;
      const delta = after - before;
      // 3. the absolute change must not be the percentage change
      if (Math.abs(delta - pct) <= 0.05 * 2) continue;
      // 4. dividing by the new figure must not land on the right answer
      if (Math.abs((delta / after) * 100 - pct) <= 0.05 * 2) continue;
      // the "same amount again" slip must clear the forecast step's tolerance
      if (Math.abs(before * (pct / 100) ** 2) <= tolerance * 2) continue;
      out.push({ before, after, pct, forecast: round(forecast, dp), dpFigures });
    }
  }
  if (!out.length) throw new Error('percentage-change: no clean number sets in the range given');
  return out;
}

const BUSINESS_SETS = cleanPairs(400000, 4000000, 10000, PCTS, 2, 0.5);
const ECONOMICS_SETS = ECONOMIES.flatMap((economy) =>
  cleanPairs(economy.low, economy.high, 0.1, GROWTH_PCTS, 2, 0.05, 1, false)
    .map((set) => ({ ...set, economy: economy.name })));

/*
 * The Economics draw picks the growth RATE first, evenly, and then a set with that rate.
 *
 * It picked a set uniformly from all of them, and the rates are not equally easy to land on: a
 * whole-tenth figure grown by 6.25% (× 17/16) stays on a whole tenth three times as often as one
 * grown by 6%. The growth rate was 6.25% in 32% of draws, and a student who typed 6.25 without
 * dividing took two marks one time in three (`quant-check` check 8, packet 13.3). Five rates
 * survive the four conditions above — 2.5 and 3 are in GROWTH_PCTS but never pass condition 4 at
 * this tolerance, since 3 ÷ 1.03 is 2.91 — so each is now a fifth of draws. The sets within a rate
 * are still drawn uniformly, so no stem is lost; the thinner rates simply recur more often.
 */
const ECONOMICS_RATES = [...new Set(ECONOMICS_SETS.map((set) => set.pct))];
const ECONOMICS_BY_RATE = new Map(ECONOMICS_RATES.map((pct) => [pct, ECONOMICS_SETS.filter((set) => set.pct === pct)]));

/**
 * The QS10 step compares TWO FORECAST rates, and neither of them is the rate the student is
 * asked to calculate. That is the third arrangement of this step and the reason for it is worth
 * keeping, because the first two both failed the same way from opposite ends.
 *
 * Arrangement one quoted "growth is expected to fall from X% to Y%" where X was this year's
 * rate — which is step one's answer, printed in the stem.
 *
 * Arrangement two moved X out and left Y in the stem. But every step of a card renders at once,
 * and step three's own choices print the fall in points, so `Y + fall` reconstructed X on screen
 * anyway — and worse, X could carry two decimals (6.25%) while Y was rounded to one, so
 * "6.25% to 5.7% is a fall of 0.6 percentage points" was a subtraction that does not hold. A
 * drill that prints false arithmetic in its own feedback is not a drill with a leak; it is wrong.
 *
 * Both rates are now drawn here, one decimal place each, with the fall between them exact by
 * construction. Nothing about them is derivable from the student's own answer and nothing about
 * their answer is derivable from them. Both stay above 0.5% so the fall never reaches zero
 * growth, which is the one case where "real GDP still rises" would be false.
 */
const FORECAST_PAIRS = (() => {
  const out = [];
  for (let first = 20; first <= 70; first += 1) {           // 2.0% … 7.0%, in tenths
    for (let fall = 5; fall <= 20; fall += 1) {             // 0.5 … 2.0 points, in tenths
      const second = first - fall;
      if (second < 5) continue;
      const rateNow = round(first / 10, 1);
      const rateNext = round(second / 10, 1);
      const points = round(fall / 10, 1);
      const asPctOfRate = round((points / rateNow) * 100, 1);
      // The two readings of the same fall have to be tellable apart, or the QS10 step has no
      // wrong answer to offer: at 10% falling 1.0 point, "1 point" and "10%" and their own
      // choices collide.
      if (Math.abs(asPctOfRate - points) < 0.3) continue;
      out.push({ rateNow, rateNext, points, asPctOfRate });
    }
  }
  return out;
})();

export function makePercentageChange(config) {
  const business = config.flavour === 'business';

  return {
    id: config.id,
    subject: config.subject,
    unit: config.unit,
    specCode: config.specCode,
    specLeaf: config.specLeaf,
    qs: config.qs,
    specTerm: config.specTerm,
    title: config.title,
    topic: config.topic,
    /*
     * The number of distinct QUESTIONS, which for the Economics half is the number of number
     * sets and not the number of sets times the forecast pairs. The pair is printed in step
     * three's label, so it varies the item; it does not vary the stem, and `quant-check` counts
     * stems — rightly, because the stem is what a student recognises. Declaring the larger
     * figure told the guard that sampling could reach further than it can, which made the
     * variety floor too high by exactly the factor the pair contributes.
     */
    variants: business
      ? BUSINESS_SETS.length * SHARES.length * FIRMS.length
      : ECONOMICS_SETS.length,

    draw(rng) {
      if (business) {
        const set = rng.pick(BUSINESS_SETS);
        // Only the shares that divide this revenue into a whole market, and never the one
        // that equals the percentage change: two steps answering the same number teaches
        // nothing and reads like a mistake.
        const usable = SHARES.filter((s) => Number.isInteger((set.after * 100) / s) && Math.abs(s - set.pct) > 1);
        const share = rng.pick(usable.length ? usable : [10, 20, 25]);
        return { ...set, context: rng.pick(FIRMS), share, market: (set.after * 100) / share };
      }
      const set = rng.pick(ECONOMICS_BY_RATE.get(rng.pick(ECONOMICS_RATES)));
      // Neither forecast rate may land on the growth rate the student is asked for: both are
      // printed, step one is marked to a tolerance of 0.05, and a student who read one off the
      // question instead of dividing would be marked correct. The draw keeps 0.1 clear and
      // `invariants` asserts 0.05, so the guard is the looser of the two and fires only on a
      // collision the draw actually let through.
      const pairs = FORECAST_PAIRS.filter((f) => (
        Math.abs(f.rateNow - set.pct) >= 0.1
        && Math.abs(f.rateNext - set.pct) >= 0.1
        // The third choice prints the same fall measured against the rate itself, and Verify A
        // round 3 counted 99 of 542,810 combinations where THAT figure is step one's answer:
        // "7.5% — real GDP falls" offered as a wrong answer while 7.5% is the right one, worth
        // 2 marks to a student who never divided. One draw in 5,890, and `quant-check` cannot
        // see it, because from inside the template every printed number is correct.
        && Math.abs(f.asPctOfRate - set.pct) >= 0.1
      ));
      // Where the right choice sits among the three on step three. It was always first, and the
      // card renders choices in the order given, so "tap the top one" scored two marks on every
      // draw without reading a word (`quant-check` check 8, packet 13.3).
      return { ...set, context: set.economy, ...rng.pick(pairs), answerAt: rng.int(0, 2) };
    },

    /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
    invariants(d) {
      const bad = [];
      if (!exactTo(d.after, d.dpFigures)) bad.push(`the later figure is not exact to ${d.dpFigures} dp`);
      if (Math.abs(round(((d.after - d.before) / d.before) * 100, 2) - d.pct) > 1e-9) {
        bad.push('the percentage change does not reproduce the draw');
      }
      if (Math.abs((d.after - d.before) - d.pct) <= 0.1) {
        bad.push('the change in units is also the change in per cent, so the first slip is the answer');
      }
      if (business) {
        if (!Number.isInteger(d.market)) bad.push('market size is not a whole number');
        if (Math.abs((d.after / d.market) * 100 - d.share) > 1e-9) bad.push('market share does not reproduce the draw');
        if (d.share >= 50) bad.push('a share of 50% or more cannot be told from its own inverse');
      } else {
        if (d.pct <= 0) bad.push('the economy is not growing, so the QS10 step contradicts the stem');
        if (d.rateNext >= d.rateNow) bad.push('the second forecast rate is not below the first');
        if (d.rateNext <= 0) bad.push('the second forecast rate is not positive, so output does not still rise');
        if (Math.abs(round(d.rateNow - d.rateNext, 1) - d.points) > 1e-9) bad.push('the stated fall is not the difference between the two forecast rates');
        if (Math.abs(d.rateNow - d.pct) < 0.05) bad.push('a forecast rate equals the growth rate the student is asked to calculate');
        if (Math.abs(d.rateNext - d.pct) < 0.05) bad.push('a forecast rate equals the growth rate the student is asked to calculate');
        if (Math.abs(d.asPctOfRate - d.pct) < 0.05) bad.push('the third choice prints the growth rate the student is asked to calculate');
        if (Math.abs(d.asPctOfRate - d.points) < 0.3) bad.push('the fall in points and the fall as a share of the rate are indistinguishable');
        if (![0, 1, 2].includes(d.answerAt)) bad.push('the right choice on step three has no place among the three');
      }
      return bad;
    },

    build(d) {
      return business ? buildBusiness(d) : buildEconomics(d);
    },
  };
}

/** Step one, shared: the percentage change itself, and the three ways it is got wrong. */
function changeStep(d, { label, unitWord }) {
  const delta = d.after - d.before;
  return {
    id: 'change',
    label,
    method: '(new figure − original figure) ÷ original figure × 100',
    suffix: '%',
    marks: 2,
    dp: 2,
    answer: d.pct,
    tolerance: 0.05,
    slips: [
      {
        value: delta,
        note: `That is the change in ${unitWord}, not the percentage change. Divide it by the original figure and multiply by 100.`,
      },
      {
        value: round((delta / d.after) * 100, 2),
        note: 'You divided by the new figure. A percentage change is always measured against where it started.',
      },
      {
        value: round((d.after / d.before) * 100, 2),
        note: 'That is the new figure as a percentage of the old one. The change is the part above or below 100%.',
      },
    ],
  };
}

/** Step two, shared: the student's OWN percentage, applied again. This is the own figure rule. */
function forecastStep(d, { label, prefix, suffix, dp, tolerance }) {
  return {
    id: 'forecast',
    label,
    method: 'this year’s figure × (1 + the percentage change ÷ 100)',
    prefix,
    suffix,
    marks: 2,
    dp,
    answer: round(d.forecast, dp),
    tolerance,
    ofr: (v) => (Number.isFinite(v.change) ? d.after * (1 + v.change / 100) : null),
    slips: [
      {
        value: round(d.after + (d.after - d.before), dp),
        note: 'You added the same amount again rather than the same percentage. The base has grown, so the amount grows with it.',
      },
      {
        value: round(d.after * (d.pct / 100), dp),
        note: 'That is the increase on its own. The question asks for the figure it produces, so add it to this year’s.',
      },
    ],
  };
}

function buildBusiness(d) {
  const delta = d.after - d.before;
  return {
    stem:
      `**${d.context}** had sales revenue of **${money(d.before)}** last year and ` +
      `**${money(d.after)}** this year. The market it sells into was worth ` +
      `**${money(d.market)}** this year.`,
    steps: [
      changeStep(d, { label: 'Percentage change in sales revenue', unitWord: 'dollars' }),
      forecastStep(d, {
        label: 'Sales revenue next year, if it changes by the same percentage again',
        prefix: '$',
        dp: 2,
        tolerance: 0.5,
      }),
      {
        id: 'share',
        label: 'Market share this year',
        method: 'the firm’s sales revenue ÷ total market size × 100',
        suffix: '%',
        marks: 2,
        dp: 2,
        answer: d.share,
        tolerance: 0.05,
        slips: [
          {
            value: round((d.market / d.after) * 100, 2),
            note: 'You divided the market by the firm. Market share is the firm’s slice of the market, so the firm goes on top.',
          },
          {
            value: round((d.before / d.market) * 100, 2),
            note: 'That is last year’s revenue against this year’s market. Both figures have to be from the same year.',
          },
        ],
      },
    ],
    solution: [
      `Change in revenue = ${money(d.after)} − ${money(d.before)} = **${money(delta)}**`,
      `Percentage change = ${money(delta)} ÷ ${money(d.before)} × 100 = **${d.pct}%**`,
      `Next year = ${money(d.after)} × ${round(1 + d.pct / 100, 4)} ${exactly(d.after * (1 + d.pct / 100), 2)} **${money(round(d.forecast, 2))}**`,
      `Market share = ${money(d.after)} ÷ ${money(d.market)} × 100 = **${d.share}%**`,
    ],
  };
}

/** "1 percentage point", not "1 percentage points" — the drill is about the unit, so the unit
 *  has to be written the way an examiner writes it. */
const points = (d) => `${d.points} percentage point${d.points === 1 ? '' : 's'}`;


function buildEconomics(d) {
  const delta = d.after - d.before;
  const right = `${points(d)} — real GDP still rises, more slowly`;
  const wrong = [`${d.points}% — real GDP falls`, `${d.asPctOfRate}% — real GDP falls`];
  return {
    // ONE rate in the stem, and it is the one the student is not being asked for. This read
    // "the rate of growth is expected to fall from X% to Y%", and X IS the answer to step one —
    // the stem printed it, so the growth rate could be read off the question without dividing,
    // and since the other two steps carry from step one the own figure rule never got exercised
    // either. Dropping the forecast sentence altogether was the first repair and it cost the
    // stem its variety: 94 distinct stems in 200 draws, which `quant-check` failed. The data
    // belongs in the stem; only the giveaway did not.
    stem:
      `Real GDP in **${d.context}** was **$${num(d.before)} billion** last year and ` +
      `**$${num(d.after)} billion** this year.`,
    steps: [
      changeStep(d, { label: 'Rate of economic growth this year', unitWord: 'billions of dollars' }),
      forecastStep(d, {
        label: 'Real GDP next year, if it grows at the same rate again',
        prefix: '$',
        suffix: 'billion',
        dp: 2,
        tolerance: 0.05,
      }),
      {
        id: 'points',
        label: `Forecasters instead expect growth of ${d.rateNow}% next year and ${d.rateNext}% the year after. Between those two, the rate of growth changes by`,
        method: 'a fall in a rate is measured in percentage points',
        type: 'choice',
        marks: 2,
        answer: right,
        choices: [...wrong.slice(0, d.answerAt), right, ...wrong.slice(d.answerAt)],
        correctNote:
          `${d.rateNow}% to ${d.rateNext}% is a fall of ${points(d)}. Both rates are positive, ` +
          `so real GDP is still growing — it is the growth that slows, not output that shrinks.`,
        wrongNote:
          `It is ${points(d)}, and output still rises. ${d.asPctOfRate}% is the same fall measured ` +
          `against the rate itself, which is a different quantity; and a positive growth rate, however small, ` +
          `leaves real GDP larger than the year before.`,
      },
    ],
    solution: [
      `Change in real GDP = $${num(d.after)}bn − $${num(d.before)}bn = **$${num(delta)}bn**`,
      `Growth rate = $${num(delta)}bn ÷ $${num(d.before)}bn × 100 = **${d.pct}%**`,
      `Next year = $${num(d.after)}bn × ${round(1 + d.pct / 100, 4)} ${exactly(d.after * (1 + d.pct / 100), 2)} **$${num(round(d.forecast, 2))}bn**`,
      `The two forecasts: ${d.rateNow}% − ${d.rateNext}% = **${points(d)}**, not ${d.points}% — and not the ${d.asPctOfRate}% fall in the rate itself`,
    ],
  };
}

export const percentageChangeBusiness = makePercentageChange({
  id: 'percentage-change-business',
  flavour: 'business',
  subject: 'business',
  unit: 'WBS11',
  specCode: '1.3.1',
  specLeaf: '1.3.1 · 1a',
  qs: 'QS2',
  specTerm: 'market size and market share',
  title: 'Percentage change and market share',
  topic: 'Meeting customer needs',
});

export const percentageChangeEconomics = makePercentageChange({
  id: 'percentage-change-economics',
  flavour: 'economics',
  subject: 'economics',
  unit: 'WEC12',
  specCode: '2.3.5',
  specLeaf: '2.3.5 · 4a',
  qs: 'QS2, QS10',
  specTerm: 'actual growth rate',
  title: 'Growth rates and percentage points',
  topic: 'Economic growth',
});
