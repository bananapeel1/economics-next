import { money, FIRMS } from '../format.mjs';

/**
 * Return on capital employed. Edexcel IAL Business, WBS13 (Unit 3), spec 3.3.5 Assessing
 * competitiveness, topic 2 "Ratio analysis" leaf a: calculate "return on capital employed (ROCE)"
 * (bus_spec.txt:1218, :1229, :1234). The definitions are the specification's own, from Appendix 9
 * (bus_spec.txt:2405-2450):
 *
 *   gross profit − other operating expenses = operating profit
 *   operating profit − interest             = profit for the year (net profit)
 *   capital employed = non-current liabilities + total equity
 *   ROCE = operating profit ÷ capital employed × 100%
 *
 * The unit content says those ratios "will not be supplied in the examination"
 * (bus_spec.txt:1063-1066). Quantitative skills QS1 (ratios) and QS2 (percentages),
 * bus_spec.txt:2267, :2270.
 *
 * ── What the stem is built to test ──
 *
 * Which profit, and which capital. The stem prints interest as well as the two lines operating
 * profit comes from, so a student who stops at profit for the year — the most common ROCE error,
 * and a genuine one: capital employed includes the lenders' money, so the return on it is measured
 * before the lenders are paid — has a named slip waiting. Current liabilities are printed for the
 * same reason on the capital side. Interest is a plausible 4-10% of the non-current liabilities
 * rather than a free draw; an examiner would not print $38,000 of interest on a $15,000 loan.
 *
 * ── Drawn backwards, from the ratio ──
 *
 * Capital employed is drawn in whole thousands and ROCE in tenths of a per cent; operating profit
 * follows as ROCE × capital employed, a whole number of dollars. The first version drew operating
 * profit in whole thousands and let ROCE fall where it could, and that made the answer guessable:
 * wherever capital employed shares only a factor of 10 with 1,000, a whole-thousand profit can
 * only give a ROCE that is a whole multiple of 10%, and 56% of 5,000 draws answered 10, 20 or 30.
 *
 * ── Why the acceptance test is in three parts ──
 *
 * The parameter space is about 10¹¹ sets, too many to count by brute force, and `variants` has to
 * be counted, not guessed. Every refusal below involves capital employed, the ROCE, and at most
 * ONE of three groups: the loan and its interest (`loanOk`), the current liabilities (`currentOk`,
 * which also reads the loan), or the operating expenses (`expensesOk`, which also reads the loan).
 * Given the loan, the last two never meet — a named slip below the answer and one above it cannot
 * land on the same figure once each clears the answer — so the count is a sum of products,
 * exactly, and `draw` refuses a set if and only if one of the three tests refuses it.
 */

const CAPITAL = { min: 150, max: 1200, step: 10 };  // capital employed, $000
const ROCE = { min: 50, max: 350 };                 // ROCE in tenths of a per cent: 5.0% to 35.0%
const LOAN_STEP = 10;                               // non-current liabilities, $000 steps
const EXPENSES = { min: 40, max: 400, step: 5 };    // other operating expenses, $000
const CURRENT = { min: 20, max: 200, step: 5 };     // current liabilities, $000
const RATES = [4, 5, 6, 8, 10];                     // interest as % of non-current liabilities
const TOL = 0.05;                                   // ROCE is marked to one decimal place

const round1 = (x) => Math.round(x * 10) / 10;
/** A wrong method must stay clear of the answer even when the student rounds it to one place. */
const clear = (slip, answer) => Math.abs(slip - answer) > TOL + 1e-9 && Math.abs(round1(slip) - answer) > TOL + 1e-9;
/** Two wrong methods must not share a figure, or the feedback names the wrong one. */
const apart = (s, t) => Math.abs(s - t) > 2 * TOL + 1e-9 && round1(s) !== round1(t);

const loanWindow = (capital) => ({
  lo: Math.ceil(capital / (10 * LOAN_STEP)) * LOAN_STEP,
  hi: Math.floor((6 * capital) / (10 * LOAN_STEP)) * LOAN_STEP,
});

/**
 * Every figure the card prints or asks for, in dollars, from the drawn parameters: capital
 * employed, non-current liabilities, operating expenses and current liabilities in $000, ROCE in
 * tenths of a per cent, interest as a percentage of the loan.
 */
function figures(capital, tenths, loan, rate) {
  const employed = capital * 1000;
  const profit = tenths * capital;               // = tenths ÷ 1,000 × capital employed
  const interest = 10 * loan * rate;             // = rate% of loan × 1,000
  return {
    employed,
    profit,
    roce: tenths / 10,
    liabilities: loan * 1000,
    equity: employed - loan * 1000,
    interest,
    net: profit - interest,
  };
}

/** The slips that need only the loan: profit for the year, total equity, and the missing × 100. */
const loanSlips = (f) => [(100 * f.net) / f.employed, (100 * f.profit) / f.equity, f.profit / f.employed];

/** The loan and its interest: collisions with operating profit, and the slips the loan fixes. */
function loanOk(capital, tenths, loan, rate) {
  const f = figures(capital, tenths, loan, rate);
  if (f.net <= 0) return false;
  // Printed figures operating profit could equal. It is always above the interest, and capital
  // employed is above every printed figure the loan fixes.
  if (f.profit === f.liabilities || f.profit === f.equity) return false;
  const [net, equity, decimal] = loanSlips(f);
  if (!clear(net, f.roce) || !clear(equity, f.roce) || !clear(decimal, f.roce)) return false;
  // Profit for the year can be small enough to sit on the "forgot × 100" slip.
  return apart(net, equity) && apart(net, decimal) && apart(equity, decimal);
}

/** Current liabilities, printed as a distractor: collisions, and the "included them" slip. */
function currentOk(capital, tenths, loan, rate, current) {
  const f = figures(capital, tenths, loan, rate);
  const cl = current * 1000;
  if (cl === f.profit || cl === f.employed) return false;
  const slip = (100 * f.profit) / (f.employed + cl);
  if (!clear(slip, f.roce)) return false;
  return loanSlips(f).every((s) => apart(slip, s));
}

/** Other operating expenses: collisions with both answers, and the gross-profit slip. */
function expensesOk(capital, tenths, loan, expenses) {
  const f = figures(capital, tenths, loan, RATES[0]);  // the rate moves only the interest, unread here
  const x = expenses * 1000;
  if (x === f.profit || x === f.employed || f.profit + x === f.employed) return false;
  const slip = (100 * (f.profit + x)) / f.employed;
  if (!clear(slip, f.roce)) return false;
  // Profit for the year sits below the answer and this slip above it, so only these two can meet.
  return apart(slip, (100 * f.profit) / f.equity) && apart(slip, f.profit / f.employed);
}

/**
 * Counted by exhaustion over the same grid and the same three tests, as a sum of products:
 * `node --input-type=module -e "import { countVariants } from './lib/quant/templates/roce.mjs';
 * console.log(countVariants())"` (about ten seconds). Re-run after any change to the draw and copy
 * the result into `variants`.
 */
export function countVariants() {
  let n = 0;
  for (let capital = CAPITAL.min; capital <= CAPITAL.max; capital += CAPITAL.step) {
    const loans = loanWindow(capital);
    for (let tenths = ROCE.min; tenths <= ROCE.max; tenths++) {
      for (let loan = loans.lo; loan <= loans.hi; loan += LOAN_STEP) {
        let expenses = 0;
        for (let x = EXPENSES.min; x <= EXPENSES.max; x += EXPENSES.step) if (expensesOk(capital, tenths, loan, x)) expenses++;
        if (!expenses) continue;
        for (const rate of RATES) {
          if (!loanOk(capital, tenths, loan, rate)) continue;
          let current = 0;
          for (let cl = CURRENT.min; cl <= CURRENT.max; cl += CURRENT.step) if (currentOk(capital, tenths, loan, rate, cl)) current++;
          n += expenses * current;
        }
      }
    }
  }
  return n * FIRMS.length;
}

const template = {
  id: 'roce',
  subject: 'business',
  unit: 'WBS13',
  specCode: '3.3.5',
  specLeaf: '3.3.5 · 2a, 2b',
  qs: 'QS1, QS2',
  specTerm: 'return on capital employed',
  title: 'Return on capital employed (ROCE)',
  topic: 'Assessing competitiveness',
  // Counted, not multiplied out: see countVariants and the note on the three-part test above.
  variants: 97345444910,

  draw(rng) {
    for (let attempt = 0; attempt < 200; attempt++) {
      const capital = rng.step(CAPITAL.min, CAPITAL.max, CAPITAL.step);
      const tenths = rng.int(ROCE.min, ROCE.max);
      const loans = loanWindow(capital);
      const loan = rng.step(loans.lo, loans.hi, LOAN_STEP);
      const rate = rng.pick(RATES);
      const expenses = rng.step(EXPENSES.min, EXPENSES.max, EXPENSES.step);
      const current = rng.step(CURRENT.min, CURRENT.max, CURRENT.step);
      if (!loanOk(capital, tenths, loan, rate)) continue;
      if (!currentOk(capital, tenths, loan, rate, current)) continue;
      if (!expensesOk(capital, tenths, loan, expenses)) continue;
      const f = figures(capital, tenths, loan, rate);
      return {
        firm: rng.pick(FIRMS),
        ...f,
        rate,
        expenses: expenses * 1000,
        gross: f.profit + expenses * 1000,
        current: current * 1000,
      };
    }
    throw new Error('roce: no clean draw in 200 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
  invariants(d) {
    const bad = [];
    if (d.gross - d.expenses !== d.profit) bad.push('operating profit is not gross profit − other operating expenses');
    if (d.liabilities + d.equity !== d.employed) bad.push('capital employed is not non-current liabilities + total equity');
    if (Math.abs((100 * d.profit) / d.employed - d.roce) > 1e-9) bad.push('ROCE does not reproduce the draw');
    if (Math.abs(Number(d.roce.toFixed(1)) - d.roce) > 1e-9) bad.push('ROCE is not exact to one decimal place');
    if (!Number.isInteger(d.profit)) bad.push('operating profit is not a whole number of dollars');
    if (d.net <= 0) bad.push('profit for the year is not positive');
    const share = d.interest / d.liabilities;
    if (share < 0.04 - 1e-9 || share > 0.1 + 1e-9) bad.push('interest is not a plausible 4-10% of non-current liabilities');
    const printed = [d.gross, d.expenses, d.interest, d.liabilities, d.current, d.equity];
    if (printed.includes(d.profit) || printed.includes(d.employed)) bad.push('an answer is one of the figures printed in the stem');
    return bad;
  },

  build(d) {
    return {
      stem:
        `The statement of comprehensive income of **${d.firm}** shows gross profit of **${money(d.gross)}**, ` +
        `other operating expenses of **${money(d.expenses)}** and interest of **${money(d.interest)}**. Its ` +
        `statement of financial position shows non-current liabilities of **${money(d.liabilities)}**, current ` +
        `liabilities of **${money(d.current)}** and total equity of **${money(d.equity)}**.`,
      steps: [
        {
          id: 'operatingProfit',
          label: 'Operating profit',
          method: 'gross profit − other operating expenses',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.profit,
          tolerance: 0.5,
          slips: [
            { value: d.net, note: 'That is profit for the year: interest has already come off. Operating profit is measured before interest.' },
            { value: d.gross, note: 'That is gross profit. Other operating expenses come off it to leave operating profit.' },
          ],
        },
        {
          id: 'capitalEmployed',
          label: 'Capital employed',
          method: 'non-current liabilities + total equity',
          prefix: '$',
          marks: 1,
          dp: 0,
          answer: d.employed,
          tolerance: 0.5,
          slips: [
            { value: d.equity, note: 'That is total equity. Capital employed adds the non-current liabilities to it.' },
            { value: d.employed + d.current, note: 'You included current liabilities. Capital employed is non-current liabilities plus total equity; short-term debts are left out.' },
          ],
        },
        {
          id: 'roce',
          label: 'Return on capital employed, to one decimal place',
          method: 'operating profit ÷ capital employed × 100',
          suffix: '%',
          marks: 2,
          dp: 1,
          answer: d.roce,
          tolerance: TOL,
          ofr: (v) => {
            const profit = Number.isFinite(v.operatingProfit) ? v.operatingProfit : d.profit;
            const capital = Number.isFinite(v.capitalEmployed) ? v.capitalEmployed : d.employed;
            return capital > 0 ? (profit / capital) * 100 : null;
          },
          slips: [
            { value: (100 * d.net) / d.employed, note: 'You used profit for the year. ROCE uses operating profit: capital employed includes the lenders’ money, so the return is measured before they are paid interest.' },
            { value: (100 * d.gross) / d.employed, note: 'You used gross profit. ROCE uses operating profit, after other operating expenses.' },
            { value: (100 * d.profit) / d.equity, note: 'You divided by total equity. ROCE divides by capital employed, which adds the non-current liabilities.' },
            { value: d.profit / d.employed, note: 'That is the ratio as a decimal. Multiply by 100 to give ROCE as a percentage.' },
            { value: (100 * d.profit) / (d.employed + d.current), note: 'You included current liabilities in capital employed. Only non-current liabilities and total equity belong in it.' },
          ],
        },
      ],
      solution: [
        `Operating profit = ${money(d.gross)} − ${money(d.expenses)} = **${money(d.profit)}**`,
        `Capital employed = ${money(d.liabilities)} + ${money(d.equity)} = **${money(d.employed)}**`,
        `ROCE = ${money(d.profit)} ÷ ${money(d.employed)} × 100 = **${d.roce.toFixed(1)}%**`,
        `Interest (${money(d.interest)}) is left out: it is paid out of operating profit to the lenders whose money is part of capital employed.`,
      ],
    };
  },
};

export default template;
