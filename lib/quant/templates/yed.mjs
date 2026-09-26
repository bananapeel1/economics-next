import { money, num, round } from '../format.mjs';

/**
 * Income elasticity of demand from a pair of income/quantity observations. One generator,
 * registered twice — once per subject, the way `percentage-change.mjs` is — because the
 * arithmetic is identical and the specification's reading of the answer is not.
 *
 *   economics  Edexcel IAL Economics, WEC11 (Unit 1), spec 1.3.2 Consumer behaviour and demand,
 *              topic 3 leaves b "How to use formulae to calculate price, income and
 *              cross-elasticities of demand" (econ_spec.txt:604-605) and h "Interpretation of
 *              numerical values of income elasticity of demand" (:635-642), whose bullets are
 *              "income elastic demand", "income inelastic demand" and "the distinction between
 *              normal goods and inferior goods". QS2 and QS8 (econ_spec.txt:2767, :2785).
 *   business   Edexcel IAL Business, WBS11 (Unit 1), spec 1.3.2 The market, topic 5 leaves a
 *              "Calculation of income elasticity of demand", b "Normal and inferior goods" and c
 *              "Interpretation of numerical values" (bus_spec.txt:582-586). QS2 and QS7
 *              (bus_spec.txt:2270, :2284).
 *
 * ── Vocabulary: what the classification step may say ──
 *
 * Neither specification uses "necessity" or "luxury". Economics names income elastic and income
 * inelastic demand and normal and inferior goods, so the Economics classification offers exactly
 * those; Business names normal and inferior goods only, so that is all its choice offers. A
 * textbook label the specification does not use is a label a student can lose a mark defending.
 *
 * The Economics choice is ONE step with three options rather than two steps (normal/inferior,
 * then elastic/inelastic), because "is demand for an inferior good income elastic?" is read two
 * ways in textbooks, and a drill must not mark a defensible answer wrong. For a normal good the
 * size question is unambiguous, so it is asked there and only there.
 *
 * ── The sign is the answer's meaning ──
 *
 * `acceptAbs` is deliberately absent. PED conventionally drops its sign; YED does not — +0.6 and
 * −0.6 are a normal and an inferior good. A student who drops the sign meets a named slip saying
 * so, and nothing here accepts the absolute value.
 *
 * ── The draw ──
 *
 * The first pass of an attempt picks every parameter in a fixed order and `accept` takes or
 * rejects the set whole; a retry is simply more picks. That shape is what lets `variants` be
 * counted by exhaustion (audit/runs/packet-13.3/templates-economics.md) rather than multiplied out
 * and hoped for. Rejected: a YED of exactly 1 (Economics' elastic/inelastic boundary; excluded in
 * Business too so the two registrations share one parameter space), a YED above 3 in size, a YED
 * that is not exact to two decimal places, a later figure that is not a whole number, and any draw
 * where a named slip lands within twice its step's tolerance of the right answer.
 */

/** Size of the change in income, in per cent; the direction is drawn separately. Not 4, for the
 *  reason given under QUANTITY_PCTS. */
const INCOME_PCTS = [5, 8, 10, 12.5, 16, 20, 25];

// Size of the change in quantity demanded, in per cent. Nothing under 5. Below it, "divided by the new quantity" lands within twice the step's
// tolerance of the answer (4% against 3.85%), the draw rejects every such set, and a size that can
// never be drawn only makes the parameter space look larger than it is.
const QUANTITY_PCTS = [5, 6, 7.5, 8, 9, 10, 12, 12.5, 15, 16, 18, 20, 24, 25, 30, 36, 40];

/** Average monthly income, in dollars: $400 to $3,000 in $50 steps. */
const INCOMES = Array.from({ length: 53 }, (_, i) => 400 + i * 50);

/** Monthly quantity demanded before the change. */
const QUANTITIES = [200, 240, 300, 400, 480, 500, 600, 750, 800, 900, 1000, 1200, 1500, 1600, 2000, 2400, 2500, 3000];

/**
 * Goods where either sign is believable. A good that is obviously inferior ("instant noodles")
 * would answer the classification step before the student had calculated anything; a bicycle is
 * normal where incomes are low and inferior where a rise in income buys a motorbike instead.
 */
const ECONOMICS_GOODS = [
  { good: 'bicycles', measure: '' },
  { good: 'bus journeys', measure: ' thousand' },
  { good: 'rice', measure: ' tonnes' },
  { good: 'motorcycles', measure: '' },
  { good: 'second-hand cars', measure: '' },
  { good: 'street-food meals', measure: ' thousand' },
];

const BUSINESS_CONTEXTS = [
  { firm: 'Kandy Cycle Works, Sri Lanka', product: 'bicycles' },
  { firm: 'Mombasa Coach Lines, Kenya', product: 'intercity coach tickets' },
  { firm: 'Chattogram Rice Traders, Bangladesh', product: 'sacks of rice' },
  { firm: 'Penang Phone Mart, Malaysia', product: 'basic mobile phones' },
  { firm: 'Accra Motor Traders, Ghana', product: 'second-hand cars' },
  { firm: 'Zahrat Cafés, Dubai', product: 'takeaway meals' },
];

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;

/** The starting figures a percentage change turns into a whole number, in either direction. Never
 *  empty for the sets above: every value in them divides cleanly by at least one figure. */
const wholeAfter = (figures, pct) => figures.filter((x) => exactTo((x * pct) / 100, 0));

/** Signed with a true minus sign, for the worked solution. */
const signed = (n, dp) => (n < 0 ? `−${Math.abs(n).toFixed(dp)}` : `+${n.toFixed(dp)}`);
const bare = (n) => (n < 0 ? `−${Math.abs(n)}` : `${n}`);

/** Every named wrong method, per step, as the step will carry them. One definition, used by the
 *  draw (to reject a draw where a slip lands near the answer) and by `build`. */
function slipsFor(d) {
  const pctQ = [
    { value: round(((d.q2 - d.q1) / d.q2) * 100, 2), note: 'You divided by the new quantity. A percentage change is always measured against the original figure.' },
    { value: round(d.pctQ / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctQ < 0) {
    pctQ.push({ value: -d.pctQ, note: 'Quantity demanded fell, so the percentage change is negative. Keep the sign: in income elasticity it decides whether the good is normal or inferior.' });
  }
  const pctY = [
    { value: round(((d.y2 - d.y1) / d.y2) * 100, 2), note: 'You divided by the new income. The original income is the base.' },
    { value: round(d.pctY / 100, 4), note: 'That is the change as a decimal. Multiply by 100 to turn it into a percentage.' },
  ];
  if (d.pctY < 0) {
    pctY.push({ value: -d.pctY, note: 'Income fell, so the percentage change is negative. Keep the sign: it carries straight into the sign of YED.' });
  }
  const yed = [
    { value: round(d.pctY / d.pctQ, 2), note: 'That is the income change over the quantity change. YED puts the percentage change in quantity demanded on top.' },
    { value: round((d.q2 - d.q1) / (d.y2 - d.y1), 2), note: 'You divided the change in quantity by the change in income. Elasticity compares PERCENTAGE changes, so turn both into percentages first.' },
  ];
  if (d.yed < 0) {
    yed.push({ value: -d.yed, note: 'The size is right but the sign is not. For YED the sign IS the answer: negative means an inferior good, and dropping it turns the good into a normal one.' });
  }
  return { pctQ, pctY, yed };
}

const TOL = { pctQ: 0.1, pctY: 0.1, yed: 0.02 };

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ context, incomeRises, incomeSize, y1, normal, quantitySize, q1 }) {
  const pctY = incomeRises ? incomeSize : -incomeSize;
  const y2 = y1 * (1 + pctY / 100);
  if (!Number.isInteger(round(y2, 6)) || y2 <= 0) return null;
  // A normal good's demand moves with income; an inferior good's moves against it.
  const pctQ = (normal === incomeRises) ? quantitySize : -quantitySize;
  const q2 = q1 * (1 + pctQ / 100);
  if (!Number.isInteger(round(q2, 6)) || q2 <= 0) return null;
  const yed = pctQ / pctY;
  if (!exactTo(yed, 2)) return null;
  if (Math.abs(yed) === 1) return null;
  // Nothing past 3 either way: a 5% rise in income moving demand by 40% is arithmetic, not a market.
  if (Math.abs(yed) > 3) return null;

  const d = { context, y1, y2: round(y2, 6), q1, q2: round(q2, 6), pctY, pctQ, yed: round(yed, 2) };

  // Every named slip clear of its answer by twice the tolerance: `quant-check` asserts once.
  const slips = slipsFor(d);
  const answers = { pctQ: d.pctQ, pctY: d.pctY, yed: d.yed };
  for (const [step, list] of Object.entries(slips)) {
    if (list.some((s) => !Number.isFinite(s.value) || Math.abs(s.value - answers[step]) <= TOL[step] * 2)) return null;
  }
  // No answer may be a figure printed on the card. The stem prints two incomes and two
  // quantities, all in the hundreds; the answers are percentages and an elasticity. They cannot
  // meet today, and this line is here so that widening a range cannot quietly make them.
  const printed = [d.y1, d.y2, d.q1, d.q2];
  if (Object.values(answers).some((a) => printed.includes(a) || printed.includes(Math.abs(a)))) return null;
  return d;
}

export function makeYed(config) {
  const economics = config.subject === 'economics';

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
    // Distinct stems, counted by exhaustion over every pick the draw can make (the method and the
    // command are in audit/runs/packet-13.3/templates-economics.md). The same number for both
    // registrations: six contexts each, one parameter space.
    variants: 1_132_272,

    draw(rng) {
      for (let attempt = 0; attempt < 50; attempt++) {
        /*
         * The change in income first, and the rest re-picked UNDER it until the draw works.
         * Picking everything freely and restarting weighted each income change by how often its
         * figures survive, and a 20% change was the answer to step two in 19% of draws: every $50
         * income takes 20% cleanly, 12.5% only one income in four, and 20% divides more of the
         * quantity changes into an exact YED. Each figure is also picked only from those the
         * percentage turns into a whole number. The first pass makes seven picks in a fixed order;
         * a retry is an eighth, which is what lets `variants` still be counted by exhaustion.
         */
        const context = rng.pick(economics ? ECONOMICS_GOODS : BUSINESS_CONTEXTS);
        const incomeRises = rng.pick([true, true, true, false]);
        const incomeSize = rng.pick(INCOME_PCTS);
        for (let retry = 0; retry < 60; retry++) {
          const y1 = rng.pick(wholeAfter(INCOMES, incomeSize));
          const normal = rng.pick([true, true, false]);
          const quantitySize = rng.pick(QUANTITY_PCTS);
          const q1 = rng.pick(wholeAfter(QUANTITIES, quantitySize));
          const d = accept({ context, incomeRises, incomeSize, y1, normal, quantitySize, q1 });
          if (d) return d;
        }
      }
      throw new Error(`${config.id}: no clean draw in 50 attempts`);
    },

    /** Checked independently by audit/scripts/quant-check.mjs on every draw. */
    invariants(d) {
      const bad = [];
      if (!Number.isInteger(d.q2) || !Number.isInteger(d.y2)) bad.push('a later figure is not a whole number');
      if (Math.abs(((d.q2 - d.q1) / d.q1) * 100 - d.pctQ) > 1e-9) bad.push('the quantity change does not reproduce the draw');
      if (Math.abs(((d.y2 - d.y1) / d.y1) * 100 - d.pctY) > 1e-9) bad.push('the income change does not reproduce the draw');
      if (Math.abs(d.pctQ / d.pctY - d.yed) > 1e-9) bad.push('YED is not exact to two decimal places');
      if (Math.abs(d.yed) === 1) bad.push('YED is exactly 1, the boundary between income elastic and inelastic');
      if (d.yed === 0) bad.push('YED is zero, which is neither normal nor inferior');
      if (Math.abs(d.yed) > 3) bad.push('YED is larger than any market a drill should describe');
      if ([d.pctQ, d.pctY, d.yed].some((a) => [d.y1, d.y2, d.q1, d.q2].includes(Math.abs(a)))) {
        bad.push('an answer is one of the figures printed in the stem');
      }
      return bad;
    },

    build(d) {
      return economics ? buildEconomics(d) : buildBusiness(d);
    },
  };
}

const moves = (from, to, rises, falls) => (to > from ? rises : falls);

function numericSteps(d, incomeLabel) {
  const slips = slipsFor(d);
  return [
    {
      id: 'pctQ',
      label: 'Percentage change in quantity demanded',
      method: '(new quantity − original quantity) ÷ original quantity × 100',
      suffix: '%',
      marks: 1,
      dp: 1,
      answer: d.pctQ,
      tolerance: TOL.pctQ,
      slips: slips.pctQ,
    },
    {
      id: 'pctY',
      label: incomeLabel,
      method: '(new income − original income) ÷ original income × 100',
      suffix: '%',
      marks: 1,
      dp: 1,
      answer: d.pctY,
      tolerance: TOL.pctY,
      slips: slips.pctY,
    },
    {
      id: 'yed',
      label: 'Income elasticity of demand (YED), to two decimal places, with its sign',
      method: '% change in quantity demanded ÷ % change in income',
      marks: 1,
      dp: 2,
      answer: d.yed,
      tolerance: TOL.yed,
      ofr: (v) => (Number.isFinite(v.pctQ) && Number.isFinite(v.pctY) && v.pctY !== 0 ? v.pctQ / v.pctY : null),
      slips: slips.yed,
    },
  ];
}

function solutionLines(d, incomeWord) {
  return [
    `%ΔQd = (${num(d.q2)} − ${num(d.q1)}) ÷ ${num(d.q1)} × 100 = **${signed(d.pctQ, 1)}%**`,
    `%Δ ${incomeWord} = (${money(d.y2)} − ${money(d.y1)}) ÷ ${money(d.y1)} × 100 = **${signed(d.pctY, 1)}%**`,
    `YED = ${bare(d.pctQ)} ÷ ${bare(d.pctY)} = **${signed(d.yed, 2)}**`,
  ];
}

function buildEconomics(d) {
  const inferior = d.yed < 0;
  const elastic = d.yed > 1;
  const answer = inferior
    ? 'An inferior good'
    : elastic ? 'A normal good, with income elastic demand' : 'A normal good, with income inelastic demand';
  const why = inferior
    ? `YED is ${signed(d.yed, 2)}: negative, so demand moves against income and the good is inferior.`
    : `YED is ${signed(d.yed, 2)}: positive, so the good is normal, and ${elastic ? 'greater' : 'less'} than 1, so demand is income ${elastic ? 'elastic' : 'inelastic'}.`;
  return {
    stem:
      `When average real income ${moves(d.y1, d.y2, 'rises', 'falls')} from **${money(d.y1)}** to **${money(d.y2)}** a month, ` +
      `the quantity of **${d.context.good}** demanded ${moves(d.q1, d.q2, 'rises', 'falls')} from ` +
      `**${num(d.q1)}**${d.context.measure} to **${num(d.q2)}**${d.context.measure} a month.`,
    steps: [
      ...numericSteps(d, 'Percentage change in real income'),
      {
        id: 'verdict',
        label: 'The good is therefore',
        method: 'the sign of YED says normal (+) or inferior (−); for a normal good, compare its size with 1',
        type: 'choice',
        marks: 1,
        choices: ['A normal good, with income elastic demand', 'A normal good, with income inelastic demand', 'An inferior good'],
        answer,
        correctNote: why,
        wrongNote: `Not quite. ${why}`,
      },
    ],
    solution: [
      ...solutionLines(d, 'real income'),
      inferior
        ? `YED < 0, so ${d.context.good} are an **inferior good** here`
        : `YED > 0, so a **normal good**; ${signed(d.yed, 2)} ${elastic ? '>' : '<'} 1, so demand is **income ${elastic ? 'elastic' : 'inelastic'}**`,
    ],
  };
}

function buildBusiness(d) {
  const inferior = d.yed < 0;
  const why = inferior
    ? `YED is ${signed(d.yed, 2)}. It is negative: demand fell as income rose (or rose as income fell), which is what makes a good inferior.`
    : `YED is ${signed(d.yed, 2)}. It is positive: demand moved in the same direction as income, which is what makes a good normal.`;
  return {
    stem:
      `**${d.context.firm}** finds that when average consumer income in its market ${moves(d.y1, d.y2, 'rises', 'falls')} ` +
      `from **${money(d.y1)}** to **${money(d.y2)}** a month, demand for its **${d.context.product}** ` +
      `${moves(d.q1, d.q2, 'rises', 'falls')} from **${num(d.q1)}** to **${num(d.q2)}** a month.`,
    steps: [
      ...numericSteps(d, 'Percentage change in average consumer income'),
      {
        id: 'verdict',
        label: `Its ${d.context.product} are therefore`,
        method: 'a positive YED means a normal good; a negative YED means an inferior good',
        type: 'choice',
        marks: 1,
        choices: ['A normal good', 'An inferior good'],
        answer: inferior ? 'An inferior good' : 'A normal good',
        correctNote: why,
        wrongNote: `Not quite. ${why}`,
      },
    ],
    solution: [
      ...solutionLines(d, 'income'),
      `YED ${inferior ? '<' : '>'} 0, so the ${d.context.product} are **${inferior ? 'an inferior' : 'a normal'} good**`,
    ],
  };
}

export const yedEconomics = makeYed({
  id: 'yed-economics',
  subject: 'economics',
  unit: 'WEC11',
  specCode: '1.3.2',
  specLeaf: '1.3.2 · 3b, 3h',
  qs: 'QS2, QS8',
  specTerm: 'income elasticity',
  title: 'Income elasticity of demand',
  topic: 'Consumer behaviour and demand',
});

export const yedBusiness = makeYed({
  id: 'yed-business',
  subject: 'business',
  unit: 'WBS11',
  specCode: '1.3.2',
  specLeaf: '1.3.2 · 5a, 5b, 5c',
  qs: 'QS2, QS7',
  specTerm: 'calculation of income elasticity of demand',
  title: 'Income elasticity of demand',
  topic: 'The market',
});
