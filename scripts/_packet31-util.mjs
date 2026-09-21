/**
 * PACKET 31 — financial-planning, Business Unit 2 (WBS12), IAL topic 2.3.2.
 * audit/raw/bus_spec.txt:885-914. FIVE blocks — the specification's own five sub-topics — twenty-five
 * subsections, twenty-one substantive leaves.
 *
 * ONE SPINE OF ARITHMETIC, AND EVERY SURFACE SAMPLES IT. The live section's figures are typed in
 * beside each other, which is how `quiz[3]` came to offer the same £500 twice (closed by packet 0).
 * Here one plant is defined once and the cost table, the break-even chart, the forecast, the
 * cash-flow forecast, the variance table, every quiz stem and every recall are generated from it,
 * so two screens cannot disagree about a number.
 *
 * THE SPINE IS BUILT SO THE IDENTITIES ARE VISIBLE RATHER THAN ASSERTED:
 *
 *   - average cost at the break-even point is **exactly the price**, which is what break-even MEANS
 *     and is the one line that ties `1b` (average costs) to `3b` (break-even point);
 *   - the price cut in `1c` raises revenue and lowers profit, so the volume/revenue pair the
 *     specification names together has a worked case where they part company;
 *   - the same rise in variable cost per case moves the break-even point in block 3 AND turns the
 *     cash-flow forecast negative in block 4 — one change, two surfaces;
 *   - the variances in block 5 reconcile to the profit variance, so "favourable" and "good" come
 *     apart in the section's own numbers rather than in a warning sentence.
 *
 * WHAT IS NOT HERE, AND WHY — the rule-2 greps, run before a word was written (NEXT.md):
 *
 *   - **No `total contribution` and no contribution × units route to profit.** 0 hits in
 *     `bus_spec.txt`. This section's contribution leaves are `3a` (selling price − variable cost per
 *     unit) and `3c` (using it to find the break-even point). "Calculation and interpretation of
 *     contribution" and "Use of contribution as a decision-making technique" are 3.3.3 · 5 at
 *     :1175-1177 — Unit 3, packet 14's section — and profit calculation is 2.3.3 · 1a. `specGap-03`
 *     asks for the Unit 3 leaf; profit here is `tr(q) - tc(q)`, from `1a` and `1b`, and nothing else.
 *   - **No moving averages and no extrapolation.** Both are single hits at :1150-1152, which is
 *     3.3.3 · 1, Unit 3. A sales-forecasting chapter reaches for them by reflex; 2.3.2 · 2b's own
 *     apparatus is three factors, and `FORECAST` below is those three factors quantified.
 *   - **No semi-variable costs and no stepped fixed costs.** 0 hits each. `1b` names fixed,
 *     variable, total and average costs and stops. They are in the live `extras.evaluation`.
 *   - **`break-even output` is 0 hits**; the term is `break-even point` (:901, :903).
 *
 * Money is in dollars throughout — one currency a section (`locale.currency`); the live section is
 * in pounds. The plant is named so the worked arithmetic has a subject; every `realExample` names a
 * KIND of firm with no year, no named company and no figure, which is packet 29's method for
 * clearing `locale.uk`, `locale.institution` and `claim.uncited` at the same time.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'financial-planning';
export const SUBJECT = 'business';
export const UNIT = 2;
export const UNIT_CODE = 'WBS12';
export const TOPIC = '2.3.2';
export const SPEC_SPAN = 'audit/raw/bus_spec.txt:885-914';

const norm = (s) => String(s ?? '').replace(/\s+/g, ' ').trim().toLowerCase();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/*
 * ONE MINUS SIGN FOR THE SECTION. U+2212, not a hyphen: a hyphen in "−$8,400" reads as a
 * word-break on a phone, and a section that mixes the two has two ways of writing the same number.
 * The runner asserts that no student-facing string carries "-$" or a hyphen between digits.
 */
export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(round2(n))) ? Math.abs(round2(n)).toLocaleString('en-GB') : Math.abs(round2(n)).toFixed(2)}`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
export const pct = (n) => `${Number.isInteger(n) ? n : n.toFixed(1)}%`;
export const signed = (n) => `${n < 0 ? MINUS : '+'}$${Math.abs(round2(n)).toLocaleString('en-GB')}`;

/* ══ the plant ═══════════════════════════════════════════════════════════════ */
/*
 * A bottling plant selling into a regional market, by the case. Chosen because every leaf of 2.3.2
 * can be asked of it honestly: it has a volume and a revenue that are different quantities (`1a`),
 * costs that split cleanly into fixed and variable (`1b`), a price it can cut (`1c`), a forecast
 * that three named factors move (`2b`), a contribution per case that divides into fixed costs
 * without a remainder (`3a`, `3c`), customers who pay on credit (`4a`) and a monthly budget (`5`).
 *
 * The figures are chosen so that every derived quantity is exact. That is not tidiness: a
 * break-even point of 15,000 and an average cost of $6.00 can be checked by a student on paper,
 * and a recall that asks for a figure the student cannot verify teaches them to trust the screen.
 */
export const PLANT = (() => {
  const p = {
    name: 'Melaka Bottling',
    short: 'the plant',
    good: 'bottled fruit drink',
    unit: 'case',
    units: 'cases',
    per: 'a month',
    price: 6,
    vcu: 3.6,
    fc: 36000,
    actual: 20000,
  };
  p.contribution = round2(p.price - p.vcu);              // 3a: selling price − variable cost per unit
  p.bep = p.fc / p.contribution;                          // 3c: fixed costs ÷ contribution per unit
  p.mos = p.actual - p.bep;                               // 3d
  p.tr = (q) => round2(p.price * q);                      // 1a: sales revenue = price × sales volume
  p.tvc = (q) => round2(p.vcu * q);                       // 1b: total variable cost
  p.tc = (q) => round2(p.fc + p.tvc(q));                  // 1b: total cost = fixed + variable
  p.ac = (q) => round2(p.tc(q) / q);                      // 1b: average cost = total cost ÷ output
  p.profit = (q) => round2(p.tr(q) - p.tc(q));            // TR − TC, never contribution × units
  p.trAtBep = p.tr(p.bep);
  p.mosPct = round2((p.mos / p.actual) * 100);
  p.outputs = [10000, 15000, 20000, 25000];
  return p;
})();

/* ══ the three change cases (specGap-05) ════════════════════════════════════ */
/*
 * "The effect on the break-even point of a change in price, in fixed costs or in variable cost per
 * unit" is not its own bullet. It is `3c` and `3e` asked of a changed figure, which is what a
 * `Calculate [4]` does, and `specGap-05` is right that the live section never works one through.
 * Each case changes ONE figure and the runner re-derives all three from `PLANT`.
 */
export const CHANGES = (() => {
  const bepWith = ({ price = PLANT.price, vcu = PLANT.vcu, fc = PLANT.fc }) => {
    const c = round2(price - vcu);
    return { contribution: c, bep: fc / c, price, vcu, fc };
  };
  const cases = [
    { key: 'price', label: 'Price rises by $0.60 a case', ...bepWith({ price: round2(PLANT.price + 0.6) }), moved: 'price' },
    { key: 'fc', label: 'Fixed costs rise by $6,000 a month', ...bepWith({ fc: PLANT.fc + 6000 }), moved: 'fixed costs' },
    { key: 'vcu', label: 'Variable cost rises by $0.40 a case', ...bepWith({ vcu: round2(PLANT.vcu + 0.4) }), moved: 'variable cost per case' },
  ];
  return cases.map((c) => ({ ...c, shift: c.bep - PLANT.bep }));
})();
export const CHANGE = Object.fromEntries(CHANGES.map((c) => [c.key, c]));

/* ══ the price cut (1c) ══════════════════════════════════════════════════════ */
/*
 * `1c` is "Ways of improving sales volumes AND sales revenues" and `specThin-01` quotes only the
 * revenue half. The pair is the point, and this is the case that makes it: the cut lifts volume and
 * revenue and lowers profit, and it lifts the break-even point above the output the plant used to
 * make. Profit is computed TR − TC at the new price, which is why `cut.profit` does not reuse
 * `PLANT.profit` — the price has changed and `PLANT.tr` no longer describes this firm.
 */
export const CUT = (() => {
  const price = 5.4, q = 24000;
  const tr = round2(price * q);
  const tvc = PLANT.tvc(q);
  const tc = round2(PLANT.fc + tvc);
  const contribution = round2(price - PLANT.vcu);
  return {
    price, q, tr, tvc, tc,
    profit: round2(tr - tc),
    contribution,
    bep: PLANT.fc / contribution,
    mos: q - PLANT.fc / contribution,
    revenueGain: round2(tr - PLANT.tr(PLANT.actual)),
    profitLoss: round2(PLANT.profit(PLANT.actual) - round2(tr - tc)),
  };
})();

/* ══ the forecast (2a, 2b, 2c) ══════════════════════════════════════════════ */
/*
 * `structure-07`'s one actionable complaint is that the forecasting block is "entirely descriptive
 * with no calculation or data". This is the data, and it is the specification's own three factors
 * and no others — no trend line, no moving average, nothing from 3.3.3 · 1. The revised forecast
 * stays above the break-even point, which is what makes the margin of safety worth recomputing and
 * ties block 2 to block 3 without either borrowing the other's leaf.
 */
export const FORECAST = (() => {
  const base = PLANT.actual;
  const factors = [
    { spec: '2b-1', factor: 'Consumer trends', effect: -2000, why: 'buyers in this market are moving from sweetened drinks to lower-sugar ones, and half the range is sweetened' },
    { spec: '2b-2', factor: 'Economic variables', effect: +1200, why: 'real incomes in the region are rising, and a bottled drink is bought more often when there is more to spend' },
    { spec: '2b-3', factor: 'Actions of competitors', effect: -3000, why: 'a rival is opening a plant in the same region and will take shelf space the plant currently holds' },
  ];
  const revised = factors.reduce((q, f) => q + f.effect, base);
  return { base, factors, revised, mos: revised - PLANT.bep, aboveBep: revised > PLANT.bep };
})();

/* ══ the cash-flow forecast (4a, 4b) ════════════════════════════════════════ */
/*
 * Three months, on the plant's own sales, with customers paying thirty days after the sale — so a
 * month's receipts are the PREVIOUS month's sales, which is the one mechanic that makes a
 * construction worth doing rather than a table worth copying. `4a` says "Construction and
 * interpretation", so this is the surface the `Construct [4]` practice item asks a student to build.
 *
 * The closing balance goes negative while the plant's trading is unchanged. That is interpretation
 * of the forecast (`4a`) and the reason a forecast is used (`4b`). It is NOT developed into the
 * distinction between profit and cash, which is 2.3.3 · 2a, `managing-finance` — the runner bans
 * the phrase from this section's prose.
 *
 * The change case is `CHANGE.vcu`, the same $0.40 a case that moves the break-even point in block 3.
 */
export const CASHFLOW = (() => {
  const sales = [
    { month: 'Month 1', volume: 20000, price: PLANT.price, priorVolume: 12000, priorPrice: PLANT.price },
    { month: 'Month 2', volume: CUT.q, price: CUT.price, priorVolume: 20000, priorPrice: PLANT.price },
    { month: 'Month 3', volume: 20000, price: PLANT.price, priorVolume: CUT.q, priorPrice: CUT.price },
  ];
  const build = (vcu) => {
    let opening = 30000;
    return sales.map((m) => {
      const receipts = round2(m.priorVolume * m.priorPrice);
      const payments = round2(PLANT.fc + m.volume * vcu);
      const net = round2(receipts - payments);
      const closing = round2(opening + net);
      const row = { ...m, opening, receipts, payments, net, closing };
      opening = closing;
      return row;
    });
  };
  const rows = build(PLANT.vcu);
  const changed = build(CHANGE.vcu.vcu);
  return {
    rows,
    changed,
    openingBalance: 30000,
    creditDays: 30,
    lowest: rows.reduce((a, b) => (b.closing < a.closing ? b : a)),
    changedLowest: changed.reduce((a, b) => (b.closing < a.closing ? b : a)),
  };
})();

/* ══ the budget and its variances (5a, 5b, 5c, 5d) ══════════════════════════ */
/*
 * Month 2 of the forecast above, budgeted at the old price and volume and delivered at the cut
 * price and the higher volume. Revenue is favourable and profit is adverse, and the three variances
 * reconcile to the profit variance — 9,600 F against 14,400 A and 2,400 A is 7,200 A — so the
 * section's own "favourable always means good" misconception is answered with arithmetic the student
 * can add up rather than a sentence telling them not to think it. `structure-07` asks for a
 * calculation here and this is it.
 *
 * SIGN CONVENTION, WRITTEN DOWN ONCE: a variance is stated as a positive amount with the word
 * FAVOURABLE or ADVERSE, never as a signed number, because the sign of a favourable cost variance
 * and a favourable revenue variance point opposite ways and every year some students learn the
 * arithmetic of one and apply it to the other. The runner asserts that no variance in this section
 * is printed with a leading sign.
 */
export const BUDGET = (() => {
  const line = (label, budget, actual, kind) => {
    const diff = round2(actual - budget);
    const favourable = kind === 'revenue' ? diff > 0 : diff < 0;
    return { label, budget, actual, variance: Math.abs(diff), favourable, kind, signedDiff: diff };
  };
  const revenue = line('Sales revenue', PLANT.tr(PLANT.actual), CUT.tr, 'revenue');
  const variable = line('Variable costs', PLANT.tvc(PLANT.actual), PLANT.tvc(CUT.q), 'cost');
  const fixed = line('Fixed costs', PLANT.fc, 38400, 'cost');
  const budgetProfit = round2(revenue.budget - variable.budget - fixed.budget);
  const actualProfit = round2(revenue.actual - variable.actual - fixed.actual);
  const profit = line('Operating profit', budgetProfit, actualProfit, 'revenue');
  return {
    month: 'Month 2',
    lines: [revenue, variable, fixed],
    profit,
    /* The reconciliation the runner asserts: the revenue variance LESS the two cost variances is the
       profit variance, to the cent. `signedDiff` is actual − budget on every line, so a cost line's
       positive signedDiff is money spent above budget and subtracts. */
    reconciliation: round2(revenue.signedDiff - variable.signedDiff - fixed.signedDiff),
  };
})();

/* ══ reference lists the content and the assessment both read ═══════════════ */

/** `2c` — difficulties of sales forecasting, in the spec's own frame: the three factors are why. */
export const FORECAST_DIFFICULTIES = [
  ['No history to forecast from', 'a product the market has not seen has no past sales to reason from, so the forecast rests on judgement'],
  ['The factors move together', 'incomes, tastes and a competitor can all change in one quarter, and their effects do not simply add'],
  ['The forecaster is not neutral', 'a forecast that has to justify a decision already taken is pulled towards the number that justifies it'],
  ['Information costs money', 'a better forecast needs research, and the research has to be worth less than the error it removes'],
];

/** `3f` — limitations of break-even analysis. Fixed and variable is an assumption, not a fact. */
export const BREAKEVEN_LIMITS = [
  ['One price for every case', 'the chart draws revenue as a straight line, so it cannot show a discount for a large order'],
  ['Costs split cleanly in two', 'the split into fixed and variable is an assumption about the period, and a long enough period makes every cost variable'],
  ['Everything made is sold', 'output and sales are the same axis on the chart, so unsold stock is invisible'],
  ['A picture of one moment', 'the chart holds price and costs still, and the three change cases show how far the point moves when they do not'],
];

/** `4b` — uses and limitations of a cash-flow forecast. */
export const CASHFLOW_USES = [
  ['Ask for finance early', 'a shortfall shown three months ahead is a negotiation rather than an emergency'],
  ['Time the spending you control', 'an equipment payment can move to a month with a receipt in it; a wage bill cannot'],
  ['Price the terms you offer', 'the table says what thirty days of credit costs, which makes it a decision'],
];

export const CASHFLOW_LIMITS = [
  ['The receipts are forecasts', 'each one is a sales forecast, so chapter 2\'s difficulties are in this table'],
  ['A customer can pay late', 'one large customer taking sixty days moves every balance after it'],
  ['It says nothing about why', 'it shows a shortfall and not its cause, so it starts the investigation'],
];

/** `5a` — purposes of budgets. */
export const BUDGET_PURPOSES = [
  ['Plan', 'a budget turns a target into figures a department can be given'],
  ['Control', 'spending can be compared with the figure agreed, monthly, while there is time to act'],
  ['Motivate', 'a figure somebody accepted is a target they own, which an instruction is not'],
  ['Allocate', 'a fixed total forces a choice between the departments asking for it'],
];

/** `5d` — difficulties of budgeting. */
export const BUDGET_DIFFICULTIES = [
  ['It is built on a forecast', 'a budget starts from a sales forecast and inherits chapter 2\'s difficulties'],
  ['Spending to protect the allowance', 'a department that underspends can expect less next year'],
  ['A target set too high demotivates', 'a figure nobody believes is a figure nobody works towards'],
  ['It takes time to set', 'the meetings and the negotiation are a real cost, felt most by a small firm'],
];

/* ── the word counter the validator itself uses ────────────────────────────── */

/** The validator's own word counter, so the 350-word budget is measured the way `step.words` does. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
