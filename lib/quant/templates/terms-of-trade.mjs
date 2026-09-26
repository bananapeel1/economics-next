import { round, ECONOMIES } from '../format.mjs';

/**
 * The terms of trade in two years, the percentage change between them, and whether they improved.
 * Edexcel IAL Economics, WEC14 (Unit 4), spec 4.3.2 Trade and the global economy, topic 3a
 * "Understanding and calculation of the terms of trade" (econ_spec.txt:1646), with 3b-c on what
 * changes them and what a change does (:1647-1657). QS5 "Calculate and interpret index numbers"
 * and QS2 percentage changes (econ_spec.txt:2777, :2767).
 *
 *   terms of trade = index of export prices ÷ index of import prices × 100
 *
 * ── Words the specification does not use ──
 *
 * 4.3.2 speaks of "changes in a country's terms of trade" and never says "improve" or
 * "deteriorate". The choice step uses them anyway, because they are how a change in the terms of
 * trade is named in every mark scheme and textbook a student will meet, and the specification
 * offers no alternative word for the direction. Recorded as a rule-1 note in
 * audit/runs/packet-13.3/templates-economics.md rather than decided silently here.
 *
 * ── The draw ──
 *
 * Backwards from the answers: last year's terms of trade on a half-point grid, a clean percentage
 * change, and this year's figure from those two; then an import price index for each year, with the
 * export index derived from it and kept only when it lands on one decimal place, the way price
 * indices are published. Never 100 in either year — the stem prints "base year = 100", and at 100
 * the percentage change and the change in index points are the same number, so the named slip
 * between them would be the right answer.
 *
 * The first pass of an attempt picks every parameter in a fixed order and `accept` takes or
 * rejects the set whole; a retry under the same change is simply more picks. That is what lets
 * `variants` be counted by exhaustion (audit/runs/packet-13.3/templates-economics.md).
 */

/** Last year's terms of trade: 85.0 to 120.0 in half points, never 100. */
const FIRST_TOT = Array.from({ length: 71 }, (_, i) => 85 + i * 0.5).filter((x) => x !== 100);
// Nothing under 4 either way: at 2.5% the "divided by this year's figure" slip sits 0.06 from the
// answer, inside twice the tolerance, and the draw never survived with one.
const CHANGES = [-12.5, -10, -8, -6, -5, -4, 4, 5, 6, 8, 10, 12.5];
/** Import price indices a draw may use, and how far one may move in a year (−6 to +12 points). */
const IMPORT_INDICES = Array.from({ length: 51 }, (_, i) => 90 + i);
const MOVE_DOWN = 6;
const MOVE_UP = 12;

/**
 * The import indices that put the export index on one decimal place for a given terms of trade.
 * Picking from these, rather than picking any index and rejecting, is what keeps the draw from
 * failing: two independent one-decimal conditions pass together about one draw in two hundred.
 */
const compatible = (tot) => IMPORT_INDICES.filter((m) => exactTo((tot * m) / 100, 1));

const TOL = { tot1: 0.05, tot2: 0.05, change: 0.05 };

const exactTo = (x, dp) => Math.abs(x - Number(x.toFixed(dp))) < 1e-9;
const idx = (x) => x.toFixed(1);
const signed = (n, dp) => (n < 0 ? `−${Math.abs(n).toFixed(dp)}` : `+${n.toFixed(dp)}`);

function slipsFor(d) {
  const change = [
    { value: round(d.tot2 - d.tot1, 2), note: 'That is the change in index points. A percentage change divides it by last year’s terms of trade — and they are only the same number when last year’s figure is exactly 100.' },
    { value: round(((d.tot2 - d.tot1) / d.tot2) * 100, 2), note: 'You divided by this year’s figure. A percentage change is measured against the original, last year’s.' },
    { value: -d.change, note: `The size is right but the direction is not. The terms of trade ${d.change > 0 ? 'rose' : 'fell'}, so the change is ${d.change > 0 ? 'positive' : 'negative'}.` },
  ];
  /*
   * Subtracting the import-price change from the export-price change is the commonest shortcut,
   * and it is only an approximation — close enough, on some draws, to land inside the tolerance.
   * Rejecting those draws would remove exactly the cases where the approximation is good, so the
   * slip is named only where it is wrong by more than twice the tolerance.
   */
  const shortcut = round(((d.x2 - d.x1) / d.x1 - (d.m2 - d.m1) / d.m1) * 100, 2);
  if (Math.abs(shortcut - d.change) > TOL.change * 2 && change.every((s) => Math.abs(s.value - shortcut) > TOL.change * 2)) {
    change.push({ value: shortcut, note: 'You subtracted the change in import prices from the change in export prices. That only approximates it: the terms of trade are a ratio, so work out each year’s ratio and compare those.' });
  }
  return {
    tot1: [
      { value: round((d.m1 / d.x1) * 100, 2), note: 'That is import prices over export prices. The terms of trade put the export price index on top.' },
      { value: round(d.tot1 / 100, 4), note: 'You left out the × 100. The terms of trade are an index, like the two price indices they are built from.' },
    ],
    tot2: [
      { value: round((d.m2 / d.x2) * 100, 2), note: 'That is import prices over export prices. The terms of trade put the export price index on top.' },
      { value: round(d.tot2 / 100, 4), note: 'You left out the × 100. The terms of trade are an index, like the two price indices they are built from.' },
    ],
    change,
  };
}

/** The draw, as a pure function of its picks. Returns null to reject. */
function accept({ economy, tot1, change, m1, m2 }) {
  if (m2 === null) return null;
  const tot2 = round(tot1 * (1 + change / 100), 9);
  if (!exactTo(tot2, 2) || Math.abs(tot2 - 100) < 1e-9) return null;
  const x1 = round((tot1 * m1) / 100, 9);
  const x2 = round((tot2 * m2) / 100, 9);
  if (!exactTo(x1, 1) || !exactTo(x2, 1)) return null;

  const d = { economy, x1: round(x1, 1), m1, x2: round(x2, 1), m2, tot1, tot2: round(tot2, 2), change };

  const slips = slipsFor(d);
  const answers = { tot1: d.tot1, tot2: d.tot2, change: d.change };
  for (const [step, xs] of Object.entries(slips)) {
    if (xs.some((x) => !Number.isFinite(x.value) || Math.abs(x.value - answers[step]) <= TOL[step] * 2)) return null;
    for (let i = 0; i < xs.length; i++) for (let j = i + 1; j < xs.length; j++) {
      if (Math.abs(xs[i].value - xs[j].value) <= TOL[step] * 2) return null;
    }
  }
  // No answer may be a figure printed on the card: the four indices and the base year's 100.
  const printed = [d.x1, d.m1, d.x2, d.m2, 100];
  const forms = (a) => [a, Math.abs(a), round(a, 1), Math.abs(round(a, 1))];
  if (Object.values(answers).some((a) => forms(a).some((f) => printed.includes(f)))) return null;
  return d;
}

const template = {
  id: 'terms-of-trade',
  subject: 'economics',
  unit: 'WEC14',
  specCode: '4.3.2',
  specLeaf: '4.3.2 · 3a',
  qs: 'QS2, QS5',
  specTerm: 'calculation of the terms of trade',
  title: 'The terms of trade',
  topic: 'Trade and the global economy',
  // Distinct stems, counted by exhaustion over every pick the draw can make
  // (audit/runs/packet-13.3/templates-economics.md).
  variants: 31_230,

  draw(rng) {
    for (let attempt = 0; attempt < 50; attempt++) {
      /*
       * The change first, and then the figures are re-picked UNDER that change until they work.
       * Rejecting the whole attempt instead weights each change by how often its figures survive:
       * picked freely, −4% was the answer to step three in one draw in five; with the starting
       * figure filtered but the attempt still restarting, ±12.5% took half the draws between them.
       * Retrying inside the change gives each of the twelve changes an equal share.
       *
       * The first pass through the inner loop makes five picks in a fixed order, and a retry is a
       * sixth, which is what lets `variants` still be counted by exhaustion.
       */
      const economy = rng.pick(ECONOMIES).name;
      const change = rng.pick(CHANGES);
      const starts = FIRST_TOT.filter((t) => {
        const next = round(t * (1 + change / 100), 9);
        return exactTo(next, 2) && Math.abs(next - 100) > 1e-9;
      });
      for (let retry = 0; retry < 60; retry++) {
        const tot1 = rng.pick(starts);
        const m1 = rng.pick(compatible(tot1));
        // This year's import index: one that suits this year's terms of trade, within a year's
        // move of last year's, and never the same — with import prices flat the change in the terms
        // of trade is just the change in export prices, and the ratio does no work. Where none
        // suits, a placeholder is picked so the pick count never varies.
        const tot2 = round(tot1 * (1 + change / 100), 9);
        const options = compatible(tot2).filter((m) => m !== m1 && m >= m1 - MOVE_DOWN && m <= m1 + MOVE_UP);
        const d = accept({ economy, tot1, change, m1, m2: rng.pick(options.length ? options : [null]) });
        if (d) return d;
      }
    }
    throw new Error('terms-of-trade: no clean draw in 50 attempts');
  },

  /** Checked independently by audit/scripts/quant-check.mjs on every draw, from the printed indices. */
  invariants(d) {
    const bad = [];
    if (Math.abs((d.x1 / d.m1) * 100 - d.tot1) > 1e-9) bad.push('last year’s terms of trade do not reproduce the printed indices');
    if (Math.abs((d.x2 / d.m2) * 100 - d.tot2) > 1e-9) bad.push('this year’s terms of trade do not reproduce the printed indices');
    if (Math.abs(((d.tot2 - d.tot1) / d.tot1) * 100 - d.change) > 1e-9) bad.push('the percentage change does not reproduce the two years');
    if (d.tot1 === 100 || d.tot2 === 100) bad.push('a terms-of-trade figure is exactly 100, where points and per cent coincide');
    if (d.change === 0) bad.push('the terms of trade did not change');
    if (d.m2 === d.m1) bad.push('import prices did not move, so the ratio does no work');
    if (d.m2 - d.m1 < -MOVE_DOWN || d.m2 - d.m1 > MOVE_UP) bad.push('the import price index moved further in a year than the draw allows');
    return bad;
  },

  build(d) {
    const improved = d.change > 0;
    const why = improved
      ? `The terms of trade rose from ${d.tot1.toFixed(2)} to ${d.tot2.toFixed(2)}: export prices rose relative to import prices, so each unit of exports now pays for more imports — an improvement.`
      : `The terms of trade fell from ${d.tot1.toFixed(2)} to ${d.tot2.toFixed(2)}: export prices fell relative to import prices, so each unit of exports now pays for fewer imports — a deterioration.`;
    return {
      stem:
        `In **${d.economy}** the index of export prices was **${idx(d.x1)}** last year and **${idx(d.x2)}** this year. ` +
        `The index of import prices was **${idx(d.m1)}** last year and **${idx(d.m2)}** this year. Both indices use the same base year, in which each was 100.`,
      steps: [
        {
          id: 'tot1',
          label: 'Terms of trade last year, to two decimal places',
          method: 'index of export prices ÷ index of import prices × 100',
          marks: 1,
          dp: 2,
          answer: d.tot1,
          tolerance: TOL.tot1,
          slips: slipsFor(d).tot1,
        },
        {
          id: 'tot2',
          label: 'Terms of trade this year, to two decimal places',
          method: 'index of export prices ÷ index of import prices × 100',
          marks: 1,
          dp: 2,
          answer: d.tot2,
          tolerance: TOL.tot2,
          slips: slipsFor(d).tot2,
        },
        {
          id: 'change',
          label: 'Percentage change in the terms of trade',
          method: '(this year − last year) ÷ last year × 100',
          suffix: '%',
          marks: 2,
          dp: 2,
          answer: d.change,
          tolerance: TOL.change,
          ofr: (v) => (Number.isFinite(v.tot1) && Number.isFinite(v.tot2) && v.tot1 !== 0 ? ((v.tot2 - v.tot1) / v.tot1) * 100 : null),
          slips: slipsFor(d).change,
        },
        {
          id: 'verdict',
          label: `Between the two years, ${d.economy}’s terms of trade have`,
          method: 'a rise in the terms of trade is an improvement; a fall is a deterioration',
          type: 'choice',
          marks: 1,
          choices: ['Improved', 'Deteriorated'],
          answer: improved ? 'Improved' : 'Deteriorated',
          correctNote: why,
          wrongNote: `Not quite. ${why}`,
        },
      ],
      solution: [
        `Last year: ${idx(d.x1)} ÷ ${idx(d.m1)} × 100 = **${d.tot1.toFixed(2)}**`,
        `This year: ${idx(d.x2)} ÷ ${idx(d.m2)} × 100 = **${d.tot2.toFixed(2)}**`,
        `%Δ = (${d.tot2.toFixed(2)} − ${d.tot1.toFixed(2)}) ÷ ${d.tot1.toFixed(2)} × 100 = **${signed(d.change, 2)}%**`,
        `The terms of trade ${improved ? 'rose' : 'fell'}, so they have **${improved ? 'improved' : 'deteriorated'}**`,
      ],
    };
  },
};

export default template;
