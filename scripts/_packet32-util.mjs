/**
 * PACKET 32 — aggregate-demand helpers: the id scheme, the formatters, the specification's own five
 * lists, and the ONE ECONOMY that carries every figure in the section.
 *
 * IAL Economics 2.3.2, Unit 2 (WEC12), `audit/raw/econ_spec.txt:976-1018`. Five sub-topics, 37 oracle
 * rows, **31 substantive leaves**.
 *
 * ════ THREE TOPICS ARE NOT IN THIS SPECIFICATION AND TWO OF THEM ARE IN THE LIVE SECTION ════
 *
 * `multiplier` appears in `econ_spec.txt` four times and every one of them is at lines 1078-1086,
 * which is **2.3.4 · 4** — the ratio, the process, MPC, MPS, MPT, MPM and both formulae. The live
 * section carries a three-subsection block teaching it, and `structure-03` records that it shares the
 * subsection id `multiplier-formula` with `national-income`, which is where the leaf lives. So the
 * whole block goes, and with it `accuracy-04` and `quiz-01`: the body defines MPC as spending "on
 * domestic goods and services" and then marks 1/(1−MPC) WRONG in Q21, which is a contradiction that
 * only exists because the topic is here at all.
 *
 * `accelerator` is **0 hits in the whole Economics specification**, and `specGap-09` hedges about it
 * ("unsure whether the 2018 IAL WEC12 spec requires it explicitly"). Packet 29's rule is that a hedge
 * gets the same spec check as an assertion, and the check answers it. It is also already 0 hits in the
 * live section, which is worth saying because three findings are written against it.
 *
 * `animal spirits` is **0 hits**, and it IS in the live section three times. The specification's own
 * words for the same influence are `3b`'s third bullet, "business confidence and expectations".
 * `automatic stabilisers` is one hit, at line 1855, under Unit 4 public sector borrowing; `4a-2` is
 * "the level of economic activity", and that is how the mechanism is taught here.
 *
 * All four are banned in the runner over every student-facing string INCLUDING the SVGs, with one
 * declared exception: the multiplier is named exactly once, in a sentence that says it is 2.3.4's
 * topic, the way packet 30 kept one pointer to labour turnover.
 *
 * ════ ONE ECONOMY, AND EVERY SHIFT IS THAT IDENTITY RECOMPUTED ════
 *
 *     C 640 + I 180 + G 220 + (X 260 − M 300) = 1,000        64%, 18%, 22%, −4%
 *     Yd 800 − C 640 = S 160                                  savings ratio 20%
 *     gross I 180 − depreciation 120 = net I 60               the capital stock grows
 *     gross I 110 − depreciation 120 = net I −10              the capital stock shrinks
 *
 * Packet 17's rule, re-earned by packets 20, 24, 28, 29 and 30: where a section's arithmetic recurs,
 * define it once as a function and generate every surface from it. Here that matters more than usual,
 * because the identity IS the leaf — `1b-1` is the line `C + I + G + (X−M) =` — so a section whose
 * components do not add up is failing the thing it is teaching. `AD.total` is a SUM, never a typed
 * number, and `AD.shift()` rebuilds the whole identity from whichever component moved.
 *
 * Money is in dollars, billions, one scale throughout. One minus sign, U+2212, emitted by `money`
 * itself (packet 18: 55 ASCII hyphens shipped beside 13 typed ones in a section about negative
 * numbers, because the sign lived in a helper somebody had to remember to reach for).
 *
 * NO YEAR, NO NAMED COUNTRY, NO NAMED FIRM, NO UK INSTITUTION. `structure-07` measures 11 of 14 real
 * examples UK-centric — house prices, Brexit, furlough, the Bank of England, the OBR, London 2012 —
 * and `quiz-02` records a question a student can only answer by knowing what Jobseeker's Allowance
 * is. This audience sits WEC12 in Hong Kong, Malaysia, Pakistan, Sri Lanka and the Gulf. Every
 * example here is a KIND of economy or a KIND of firm.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'aggregate-demand';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
export const money = (n) => `${n < 0 ? MINUS : ''}$${Number.isInteger(Math.abs(n)) ? Math.abs(n).toLocaleString('en-GB') : Math.abs(n).toFixed(2)}`;
/** Billions, the one scale this section works in. */
export const bn = (n) => `${money(n)}bn`;
export const qty = (n) => (Number.isInteger(n) ? n.toLocaleString('en-GB') : n.toFixed(2));
/* The minus sign lives in the formatter, never in the caller (packet 18): a negative share is a
 * real case here, because (X − M) is negative in this economy. */
export const pct = (n) => `${n < 0 ? MINUS : ''}${Number.isInteger(round2(Math.abs(n))) ? round2(Math.abs(n)) : round2(Math.abs(n)).toFixed(1)}%`;
export const signedPct = (n) => `${n < 0 ? MINUS : ''}${pct(Math.abs(n))}`;

/* ══ THE ECONOMY · 2.3.2 · 1b, and every leaf that moves a component ═══════ */

export const AD = (() => {
  const C = 640, I = 180, G = 220, X = 260, M = 300;
  const netTrade = X - M;
  const total = C + I + G + netTrade;

  /** The identity, rebuilt from whichever components moved. Nothing downstream types a total. */
  const compose = ({ c = C, i = I, g = G, x = X, m = M } = {}) => {
    const nt = x - m;
    return { C: c, I: i, G: g, X: x, M: m, netTrade: nt, total: c + i + g + nt };
  };
  const base = compose();
  const shareOf = (n) => round2((n / total) * 100);
  const changeIn = (after) => round2(((after.total - total) / total) * 100);

  /* ── 2b, 2c, 2d · saving is what is left of disposable income ───────────── */
  const Yd = 800;
  const S = Yd - C;
  const ratio = round2((S / Yd) * 100);
  /* 2d: the ratio rises and consumption is the residual that falls. */
  const ratioUp = 25;
  const ratioDown = 15;
  /** The residual, both ways: saving is decided and consumption is what is left of Yd. */
  const savingCase = (r) => {
    const saved = round2((Yd * r) / 100);
    const spent = Yd - saved;
    return { ratio: r, saved, spent, ad: compose({ c: spent }) };
  };
  const savedUp = savingCase(ratioUp).saved;
  const spentUp = savingCase(ratioUp).spent;
  const afterSaving = savingCase(ratioUp).ad;

  /* ── 3a · gross investment, depreciation and net investment ─────────────── */
  const depreciation = 120;
  const netInvestment = (gross) => gross - depreciation;
  const grossLow = 110;

  /* ── 3b-2, 3b-5, 3c · one project, priced three ways ────────────────────── */
  /*
   * ONE TAX WORLD, NOT TWO — Layer 6's finding 4, and it was a real error. The first version priced
   * the subsidy and the relief cases with a PRE-tax numerator ($40) over a POST-tax denominator
   * ($450, $375), which inflated relief against the subsidy and taught two different economies on
   * consecutive steps. Every return below is what the firm KEEPS over what the firm PAYS:
   *
   *     base      $32 / $500 = 6.4%      (kept at a 20% profit tax)
   *     subsidy   $32 / $450 = 7.11%     the state pays $50 of the price
   *     relief    $32 / $400 = 8%        the outlay is set against taxable profit, so the state
   *                                      bears 20% of it — worth $100 here, twice the subsidy
   *
   * AND THE PROFIT TAX IS 20%, NOT 25%, FOR A SECOND REASON (finding 3). At 25% the kept return is
   * exactly 6.0% against an interest rate of 6% — a TIE, which the section's own rule ("beats the
   * interest rate") says does not clear, while the body said it did. That contradiction also gave
   * the 8%-return quiz item a second defensible answer. At 20% the kept return is 6.4% and strictly
   * beats 6, so the rule and the worked example agree.
   */
  const project = (() => {
    const cost = 500, yearly = 40;
    const ret = (c, y) => round2((y / c) * 100);
    const profitTax = 20, profitTaxCut = 15, profitTaxHigh = 40;
    const afterTax = (rate) => round2(yearly * (1 - rate / 100));
    const kept = afterTax(profitTax);
    const subsidy = 50;
    const costAfterRelief = round2(cost * (1 - profitTax / 100));
    return {
      cost, yearly,
      rateOfReturn: ret(cost, yearly),
      interestLow: 6, interestHigh: 10,
      interestCost: (rate) => round2((cost * rate) / 100),
      profitTax, profitTaxHigh, profitTaxCut,
      keptAt: afterTax,
      kept,
      returnAfterTax: (rate) => ret(cost, afterTax(rate)),
      subsidy,
      costAfterSubsidy: cost - subsidy,
      /* Both policy tools priced on the SAME kept return, which is the point of the comparison. */
      returnAfterSubsidy: ret(cost - subsidy, kept),
      costAfterRelief,
      reliefWorth: round2(cost - costAfterRelief),
      returnAfterRelief: ret(costAfterRelief, kept),
    };
  })();

  /* ── 2a-2 · the same interest rate, read on the household side ──────────── */
  const debt = 600;
  const interestOnDebt = (rate) => round2((debt * rate) / 100);
  const rateLow = 5, rateHigh = 8;
  const interestRise = round2(interestOnDebt(rateHigh) - interestOnDebt(rateLow));
  const afterInterest = compose({ c: C - interestRise });

  /* ── 4a-1, 4a-2 · government expenditure ────────────────────────────────── */
  const fiscalRise = 40;
  const afterFiscal = compose({ g: G + fiscalRise });
  const benefitRise = 25;
  const afterDownturn = compose({ g: G + benefitRise });

  /* ── 5a · the net trade balance ─────────────────────────────────────────── */
  /*
   * PER UNIT OF CURRENCY, WHICH IS ALL `5a-2` ASKS FOR. The exchange rate is quoted as units of home
   * currency per dollar, so a DEPRECIATION is more units per dollar. Both figures below are exact
   * divisions; nothing here claims an elasticity, because the size of the volume response is
   * Marshall-Lerner and the J-curve, which `econ_spec.txt:1740` puts in 4.3.x and `practice-01`
   * correctly says has no place in a WEC12 mark scheme.
   */
  const fx = (() => {
    const before = 4, after = 5;
    const exportPrice = 800;          // priced at home, in units
    const importPrice = 100;          // priced abroad, in dollars
    /*
     * THE DEPRECIATION IS THE FALL IN WHAT THE HOME CURRENCY IS WORTH, NOT THE RISE IN THE QUOTE.
     * 4 units per dollar to 5 is a 25% rise in the quote and a 20% fall in the currency: one unit is
     * worth $0.25 before and $0.20 after. Students write the first number and it is the wrong one.
     */
    const valueOf = (rate) => round2(1 / rate * 100) / 100;
    return {
      before, after, valueOf,
      depreciation: round2(((valueOf(before) - valueOf(after)) / valueOf(before)) * 100),
      quoteRise: round2(((after - before) / before) * 100),
      exportPrice, importPrice,
      exportCostsAbroad: (rate) => round2(exportPrice / rate),
      importCostsAtHome: (rate) => round2(importPrice * rate),
    };
  })();
  /* 5a-1: the one exact aggregate on this leaf. Extra real income is spent partly abroad. */
  const incomeRise = 100;
  const importsFromIncome = 25;
  const afterIncome = compose({ m: M + importsFromIncome });
  /* 5a-4: a tariff is a percentage added to the price a buyer at home pays. */
  const tariff = 25;
  const tariffPrice = (p) => round2(p * (1 + tariff / 100));

  return {
    C, I, G, X, M, netTrade, total, base, compose, shareOf, changeIn,
    Yd, S, ratio, ratioUp, ratioDown, savingCase, savedUp, spentUp, afterSaving,
    depreciation, netInvestment, grossLow,
    project,
    debt, interestOnDebt, rateLow, rateHigh, interestRise, afterInterest,
    fiscalRise, afterFiscal, benefitRise, afterDownturn,
    fx, incomeRise, importsFromIncome, afterIncome, tariff, tariffPrice,
  };
})();

/* ══ The specification's own five lists, transcribed ══════════════════════ */
/*
 * EVERY ENTRY'S FIRST FIELD IS THE SPECIFICATION'S WORDING. `econ_spec.txt:976-1018`. The runner
 * checks that each one is taught and that nothing is quizzed which is not, so a paraphrase here would
 * quietly widen what counts as covered.
 */

/** 2.3.2 · 2a — influences on consumption. [spec wording, short label, what it does to C] */
export const CONSUMPTION = [
  ['disposable income', 'Disposable income', 'income after tax and benefits, which is what there is to spend at all'],
  ['interest rates', 'Interest rates', 'the price of borrowing and the reward for saving'],
  ['consumer confidence', 'Consumer confidence', 'what households expect their income and job to be worth next year'],
  ['level of welfare payments', 'Welfare payments', 'transfers to households with little or no earned income'],
  ['wealth effects', 'Wealth effects', 'what households already own, as distinct from what they earn'],
  ['availability of credit', 'Availability of credit', 'whether banks will lend at all, as distinct from the price'],
];

/** 2.3.2 · 3b — influences on investment. */
export const INVESTMENT = [
  ['the rate of economic growth', 'Rate of economic growth', 'how fast the demand a new machine would serve is itself growing'],
  ['interest rates', 'Interest rates', 'what borrowing the money for the machine costs, or what lending it out would earn'],
  ['business confidence and expectations', 'Business confidence and expectations', 'what firms expect demand to be over the life of the asset'],
  ['availability of credit', 'Availability of credit', 'whether a bank will lend for the project at any price'],
  ['tax on company profits', 'Tax on company profits', 'what share of the return the firm keeps'],
];

/** 2.3.2 · 3c — government policy to promote investment. */
export const INVESTMENT_POLICY = [
  ['tax relief', 'Tax relief', 'letting the outlay be set against taxable profit, so the state bears part of the cost'],
  ['subsidies', 'Subsidies', 'paying part of the price of the asset directly'],
  ['reductions on the rate of corporation tax', 'Lower corporation tax', 'leaving a larger share of every return in the firm'],
];

/** 2.3.2 · 4a — influences on government expenditure. */
export const GOVERNMENT = [
  ['fiscal policy', 'Fiscal policy', 'a deliberate decision about spending and taxation'],
  ['the level of economic activity', 'The level of economic activity', 'what output and employment are doing, which moves some spending with no decision at all'],
  ['correction of market failures', 'Correction of market failures', 'spending on what the market provides too little of'],
  ['political priorities', 'Political priorities', 'what the government of the day has chosen to be for'],
];

/** 2.3.2 · 5a — the impact on the net trade balance of changes in: */
export const NET_TRADE = [
  ['real income', 'Real income', 'higher real income at home is spent partly on imports'],
  ['the exchange rate', 'The exchange rate', 'what a home price is worth abroad and a foreign price is worth at home'],
  ['the state of the global economy', 'The state of the global economy', 'the real income of the countries that buy the exports'],
  ['degree of protectionism', 'Degree of protectionism', 'tariffs and quotas, at home on imports and abroad on the exports'],
  ['non-price factors', 'Non-price factors', 'quality, design, reliability and delivery, which decide sales at an unchanged price'],
];

/** The four components, in the order the specification writes them. */
export const COMPONENTS = [
  ['C', 'Consumption', 'household spending on goods and services'],
  ['I', 'Investment', 'firms spending on capital goods'],
  ['G', 'Government expenditure', 'government spending on goods and services'],
  ['X − M', 'Net trade balance', 'exports minus imports'],
];

/*
 * THE WORDS THIS SECTION TEACHES, for the forward-reference check (packet 30's Layer 6 finding: a
 * recall may not need a LATER subsection). Kept beside the lists so it cannot drift from them.
 */
export const TEACHING_TERMS = [
  ...CONSUMPTION.map(([k]) => k), ...INVESTMENT.map(([k]) => k),
  ...INVESTMENT_POLICY.map(([k]) => k), ...GOVERNMENT.map(([k]) => k), ...NET_TRADE.map(([k]) => k),
  'savings ratio', 'gross investment', 'net investment', 'depreciation', 'corporation tax',
  'tariff', 'protectionism', 'wealth effect', 'market failure', 'welfare payment',
].map((s) => s.toLowerCase());

/**
 * The word budget, counted the way `lib/content-validator.mjs` counts it, so the runner and the
 * validator cannot disagree about whether a subsection is over 350.
 */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
