import { money, FIRMS } from '../format.mjs';

/**
 * Gearing ratio. Edexcel IAL Business, WBS13 (Unit 3), spec 3.3.5 Assessing competitiveness,
 * topic 2 "Ratio analysis" leaves a and b: calculate the "gearing ratio" and "Interpret ratios to
 * make business decisions" (bus_spec.txt:1218, :1229-1235). The formula is the specification's
 * own, from Appendix 9 (bus_spec.txt:2436-2441):
 *
 *   capital employed = non-current liabilities + total equity
 *   total equity     = share capital + retained profits
 *   gearing ratio    = non-current liabilities ÷ capital employed × 100%
 *
 * and the unit content says those ratios "will not be supplied in the examination"
 * (bus_spec.txt:1063-1066), so the method line is a drill aid the paper will not give.
 * Quantitative skills QS1 (ratios) and QS2 (percentages), bus_spec.txt:2267, :2270.
 *
 * ── The interpretation step, and the threshold it does not assert ──
 *
 * Textbooks commonly call a business "highly geared" above 50%. The specification sets no
 * threshold anywhere, so this drill does not assert one: the choice asks what the figure SHOWS —
 * whether non-current liabilities or total equity provide more than half of capital employed —
 * which is true by the definition above and needs no authority beyond it. A ratio of exactly
 * 50.0% is never drawn, since neither statement is then true, and it is also where the "upside
 * down" slip (equity ÷ capital employed) equals the answer.
 *
 * ── Drawn backwards, from the ratio ──
 *
 * Capital employed is drawn in whole thousands and the gearing ratio in tenths of a per cent;
 * non-current liabilities follow as ratio × capital employed, a whole number of dollars. The first
 * version drew the liabilities in whole thousands instead and let the ratio fall where it could,
 * which kept the stem round and made the answer guessable: wherever capital employed shares only
 * a factor of 10 with 1,000, whole-thousand liabilities can only produce a ratio that is a whole
 * multiple of 10%, and 50% of 5,000 draws answered 20, 30, 40, 60, 70 or 80. Drawing the ratio
 * makes every tenth of a per cent from 20.0 to 80.0 reachable.
 *
 * The side of 50% is chosen before anything else, so each interpretation is the right answer half
 * the time; drawn over the whole window, a highly geared business has little equity left to split
 * into share capital and retained profits, more of those draws were refused, and "total equity"
 * was right in 68% of draws — two in three for a student who never read the ratio.
 *
 * Equity is split into share capital (whole $10,000s) and retained profits (the remainder). Current
 * liabilities are printed as a distractor, because including them in capital employed is the error
 * this ratio is most often marked down for.
 *
 * ── Why the acceptance test is in three parts ──
 *
 * So `variants` can be counted by exhaustion in seconds rather than minutes. Every refusal
 * involves capital employed, the ratio, and at most one of the share capital or the current
 * liabilities, never both, so the count is a sum of products and `draw` refuses a set exactly when
 * one of the three tests does.
 */

const CAPITAL = { min: 200, max: 900, step: 10 };   // capital employed, $000
const SHARES = { min: 20, max: 400, step: 10 };     // share capital, $000
const CURRENT = { min: 20, max: 200, step: 5 };     // current liabilities, $000
const BELOW = { min: 200, max: 499 };               // gearing ratio in tenths of a per cent,
const ABOVE = { min: 501, max: 800 };               //   symmetric about 50.0%, which is excluded
const TOL = 0.05;

const BORROWED = 'Non-current liabilities provide more than half of capital employed';
const OWNED = 'Total equity provides more than half of capital employed';

const round1 = (x) => Math.round(x * 10) / 10;
/** A wrong method must stay clear of the answer even when the student rounds it to one place. */
const clear = (slip, answer) => Math.abs(slip - answer) > TOL + 1e-9 && Math.abs(round1(slip) - answer) > TOL + 1e-9;
/** Two wrong methods on one step must not share a figure, or the feedback names the wrong one. */
const apart = (s, t) => Math.abs(s - t) > 2 * TOL + 1e-9 && round1(s) !== round1(t);

/** All in dollars. `capital` is in $000 and `tenths` is the ratio × 10, as drawn. */
function figures(capital, tenths) {
  const employed = capital * 1000;
  const liabilities = tenths * capital;          // = tenths ÷ 1,000 × capital employed
  return { employed, liabilities, equity: employed - liabilities, gearing: tenths / 10 };
}

/** The ratio's own slips, which depend on nothing but capital employed and the ratio. */
function coreSlips({ employed, liabilities, equity }) {
  return [(100 * liabilities) / equity, liabilities / employed, (100 * equity) / employed];
}

function coreOk(capital, tenths) {
  const f = figures(capital, tenths);
  const slips = coreSlips(f);
  if (!slips.every((s) => clear(s, f.gearing))) return false;
  return apart(slips[0], slips[1]) && apart(slips[0], slips[2]) && apart(slips[1], slips[2]);
}

/** Share capital: retained profits must be left over, and the two equity slips must differ. */
function shareOk(capital, tenths, share) {
  const { employed, liabilities, equity } = figures(capital, tenths);
  const retained = equity - share * 1000;
  if (retained < 10000) return false;
  // "Left out retained profits" and "total equity only" are both short of capital employed; they
  // meet when the retained profits equal the non-current liabilities.
  return liabilities + share * 1000 !== equity && employed !== share * 1000;
}

/** Current liabilities, printed as a distractor: a collision, and the "counted them" slip. */
function currentOk(capital, tenths, current) {
  const f = figures(capital, tenths);
  const cl = current * 1000;
  // Capital employed is larger than every component of it, so the only printed figure it can
  // equal is this one. The ratio cannot equal any printed figure: it is under 100, and the
  // smallest printed figure is $10,000.
  if (cl === f.employed) return false;
  const slip = (100 * (f.liabilities + cl)) / (f.employed + cl);
  if (!clear(slip, f.gearing)) return false;
  return coreSlips(f).every((s) => apart(slip, s));
}

/**
 * Counted by exhaustion over the same grid and the same three tests, as a sum of products:
 * `node --input-type=module -e "import { countVariants } from './lib/quant/templates/gearing.mjs';
 * console.log(countVariants())"`. Re-run after any change to the draw and copy it into `variants`.
 */
export function countVariants() {
  let n = 0;
  for (let capital = CAPITAL.min; capital <= CAPITAL.max; capital += CAPITAL.step) {
    for (const side of [BELOW, ABOVE]) {
      for (let tenths = side.min; tenths <= side.max; tenths++) {
        if (!coreOk(capital, tenths)) continue;
        let shares = 0;
        for (let s = SHARES.min; s <= SHARES.max; s += SHARES.step) if (shareOk(capital, tenths, s)) shares++;
        let currents = 0;
        for (let c = CURRENT.min; c <= CURRENT.max; c += CURRENT.step) if (currentOk(capital, tenths, c)) currents++;
        n += shares * currents;
      }
    }
  }
  return n * FIRMS.length;
}

const template = {
  id: 'gearing',
  subject: 'business',
  unit: 'WBS13',
  specCode: '3.3.5',
  specLeaf: '3.3.5 · 2a, 2b',
  qs: 'QS1, QS2',
  specTerm: 'gearing ratio',
  title: 'Gearing ratio',
  topic: 'Assessing competitiveness',
  // Counted, not multiplied out: 71 capitals × 600 ratios × 39 share capitals × 37 current
  // liabilities × 7 firms is 430 million before the refusals. See countVariants.
  variants: 253823003,

  draw(rng) {
    const side = rng.next() < 0.5 ? ABOVE : BELOW;
    for (let attempt = 0; attempt < 200; attempt++) {
      const capital = rng.step(CAPITAL.min, CAPITAL.max, CAPITAL.step);
      const tenths = rng.int(side.min, side.max);
      const share = rng.step(SHARES.min, SHARES.max, SHARES.step);
      const current = rng.step(CURRENT.min, CURRENT.max, CURRENT.step);
      if (!coreOk(capital, tenths) || !shareOk(capital, tenths, share) || !currentOk(capital, tenths, current)) continue;
      const f = figures(capital, tenths);
      return {
        firm: rng.pick(FIRMS),
        ...f,
        share: share * 1000,
        retained: f.equity - share * 1000,
        current: current * 1000,
      };
    }
    throw new Error('gearing: no clean draw in 200 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.share + d.retained !== d.equity) bad.push('share capital and retained profits do not sum to total equity');
    if (d.liabilities + d.equity !== d.employed) bad.push('capital employed is not non-current liabilities + total equity');
    if (Math.abs((100 * d.liabilities) / d.employed - d.gearing) > 1e-9) bad.push('the gearing ratio does not reproduce the draw');
    if (Math.abs(Number(d.gearing.toFixed(1)) - d.gearing) > 1e-9) bad.push('the gearing ratio is not exact to one decimal place');
    if (d.gearing === 50) bad.push('gearing is exactly 50%, so neither interpretation is true');
    if (!Number.isInteger(d.liabilities)) bad.push('non-current liabilities are not a whole number of dollars');
    if (d.retained <= 0) bad.push('retained profits are not positive');
    if ([d.liabilities, d.current, d.share, d.retained].includes(d.employed)) {
      bad.push('capital employed is one of the figures printed in the stem');
    }
    return bad;
  },

  build(d) {
    const borrowed = d.gearing > 50;
    const g = d.gearing.toFixed(1);
    return {
      stem:
        `The statement of financial position of **${d.firm}** shows share capital of **${money(d.share)}**, ` +
        `retained profits of **${money(d.retained)}**, non-current liabilities of **${money(d.liabilities)}** ` +
        `and current liabilities of **${money(d.current)}**.`,
      steps: [
        {
          id: 'capitalEmployed',
          label: 'Capital employed',
          method: 'non-current liabilities + total equity (share capital + retained profits)',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.employed,
          tolerance: 0.5,
          slips: [
            { value: d.equity, note: 'That is total equity. Capital employed adds the non-current liabilities to it.' },
            { value: d.employed + d.current, note: 'You included current liabilities. Capital employed is non-current liabilities plus total equity; short-term debts are left out.' },
            { value: d.liabilities + d.share, note: 'You left out retained profits. Total equity is share capital plus retained profits, and both belong in capital employed.' },
          ],
        },
        {
          id: 'gearing',
          label: 'Gearing ratio, to one decimal place',
          method: 'non-current liabilities ÷ capital employed × 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.gearing,
          tolerance: TOL,
          ofr: (v) => (Number.isFinite(v.capitalEmployed) && v.capitalEmployed > 0
            ? (d.liabilities / v.capitalEmployed) * 100
            : null),
          slips: [
            { value: (100 * d.liabilities) / d.equity, note: 'You divided by total equity. The gearing ratio divides non-current liabilities by capital employed, which includes them.' },
            { value: d.liabilities / d.employed, note: 'That is the ratio as a decimal. Multiply by 100 to give the gearing ratio as a percentage.' },
            { value: (100 * (d.liabilities + d.current)) / (d.employed + d.current), note: 'You counted current liabilities as long-term borrowing. Gearing uses non-current liabilities only.' },
            { value: (100 * d.equity) / d.employed, note: 'That is the share of capital employed that comes from total equity. Gearing puts non-current liabilities on top.' },
          ],
        },
        {
          id: 'verdict',
          label: 'What the gearing ratio shows',
          method: 'the gearing ratio is the percentage of capital employed that comes from non-current liabilities',
          type: 'choice',
          marks: 1,
          choices: [BORROWED, OWNED],
          answer: borrowed ? BORROWED : OWNED,
          correctNote: borrowed
            ? `${g}% of capital employed is non-current liabilities, so lenders rather than shareholders provide most of the long-term finance, and the interest on it is owed whether or not the business makes a profit.`
            : `Only ${g}% of capital employed is non-current liabilities; the other ${(100 - d.gearing).toFixed(1)}% is total equity, so shareholders rather than lenders provide most of the long-term finance.`,
          wrongNote:
            `The gearing ratio is ${g}%: that is the share of capital employed that comes from non-current ` +
            `liabilities, and it is ${borrowed ? 'more' : 'less'} than half.`,
        },
      ],
      solution: [
        `Total equity = ${money(d.share)} + ${money(d.retained)} = ${money(d.equity)}`,
        `Capital employed = ${money(d.liabilities)} + ${money(d.equity)} = **${money(d.employed)}**`,
        `Gearing ratio = ${money(d.liabilities)} ÷ ${money(d.employed)} × 100 = **${g}%**`,
        `${g}% is ${borrowed ? 'more' : 'less'} than half, so **${(borrowed ? BORROWED : OWNED).toLowerCase()}**`,
      ],
    };
  },
};

export default template;
