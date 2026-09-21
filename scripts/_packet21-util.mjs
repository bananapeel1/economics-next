/**
 * Packet 21 helpers: the id scheme scripts/mint-item-ids.mjs uses, so hand-authored items carry ids
 * of the same shape (`<section>:<kind>:<hash8(key)>`), the validator's own word counter, and Andara —
 * the one economy this section carries across its body, diagrams, notes and assessment.
 *
 * WHY ONE ECONOMY. Economics 2.3.1 is the quantitative macro topic: Appendix 7 puts **QS2**
 * (percentages and percentage changes) and **QS5** (calculate and interpret index numbers) in the
 * **IAS** column (econ_spec.txt:2766-2777), so both are Unit 2 skills. The March section taught the
 * whole topic in words and left every calculation to the quiz (structure-10), which is why a student
 * met a GDP deflator formula in a question having never seen a number in the notes.
 *
 * So the section carries ONE economy, and every figure in it — every body paragraph, every diagram,
 * every quiz stem, every practice item — is generated from the figures below. The runner re-derives
 * each result from its inputs and refuses to stage if a printed figure disagrees with its own
 * arithmetic.
 *
 * NOTE ON QS7. "Make calculations to convert from money to real terms" is in the **IA2** column only,
 * so deflating a series is NOT an IAS requirement. Real and nominal are taught as a distinction
 * (1c-1) and read off a table that is given; no practice item asks a student to deflate one.
 *
 * ANDARA IS FICTIONAL and, like packet 18's Maji and packet 17's Tafari, is deliberately given no
 * location. The March section framed the topic in the UK — 42 UK-framed mentions against 28 from
 * anywhere else, plus six UK institutions by name — and carried six dated claims about real economies
 * that nothing in the repository could check (topFix-05). Andara carries the arithmetic; the few real
 * illustrations name no country, no year and no figure. One currency: dollars.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'measures-economic-performance';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const r2 = (n) => Math.round(n * 100) / 100;
/** A percentage change, to one decimal place — the form every rate in this section is printed in. */
export const pct1 = (from, to) => Math.round(((to - from) / from) * 1000) / 10;

/* ── 1 · Andara's national accounts (1a, 1b, 1c, 1d, 1f, 1g) ───────────────── */
/*
 * Three years, chosen so that every figure a student reads is exact and so that the three teaching
 * points of sub-topic 1 fall OUT of the table instead of being asserted beside it:
 *
 *   - year 3 is a FALL in real output while the nominal figure still rises (1c-1 and 1f in one row);
 *   - real GDP rose 4% in year 2 and real GDP per capita did not move at all, because the population
 *     rose 4% too (1c-2, which no ledger item asks for);
 *   - two consecutive quarters of the year-3 contraction is the 1g definition of a recession.
 */
export const YEARS = [1, 2, 3];
/** Nominal GDP, $bn. Derived: real × index ÷ 100, so the two columns cannot drift apart. */
export const NOMINAL = [500, 550.16, 552.63];
/*
 * ONE PRICE INDEX FOR THE WHOLE SECTION, and this is a decision rather than a convenience.
 *
 * The first draft carried two: 100/105/108 in the national accounts and 100/105.8/108.4 in the
 * inflation chapter, both called "the price index" and both based at 100 in year 1. Layer 6 found it
 * by deflating $546bn with the consumer index and getting $516bn instead of the $520bn the whole
 * per-capita argument rests on. A student who does the same arithmetic is not making a mistake.
 *
 * The specification names exactly one index a student must build — the consumer price index, 2b —
 * and asks nowhere for a second one, nor for the distinction between them (the GDP deflator is zero
 * occurrences in econ_spec.txt). So the index built from the basket in block 4 IS the index that
 * deflates GDP in block 1, and the section says so. It is a simplification; carrying two unlabelled
 * indices was an error.
 */
export const GDP_INDEX = [100, 105.8, 109];
/** Population, millions. */
export const POP = [25, 26, 26];

/** Real GDP at year 1 prices, $bn. Divided out here rather than typed in. */
export const realAt = (i) => r2((NOMINAL[i] / GDP_INDEX[i]) * 100);          // 500, 520, 507
/** Real GDP per head, in dollars: $bn ÷ millions of people × 1,000. */
export const perCapitaAt = (i) => Math.round((realAt(i) / POP[i]) * 1000);   // 20000, 20000, 19500

/** Real growth from the year before, %. Year 2 is +4.0 and year 3 is −2.5, both exact. */
export const realGrowth = (i) => pct1(realAt(i - 1), realAt(i));
/** Nominal growth from the year before, %. */
export const nominalGrowth = (i) => pct1(NOMINAL[i - 1], NOMINAL[i]);
/** Growth in real GDP per head, %. Year 2 is exactly zero, which is the point of the row. */
export const perCapitaGrowth = (i) => pct1(perCapitaAt(i - 1), perCapitaAt(i));

/* ── 2 · Value against volume (1c-3) ───────────────────────────────────────── */
/*
 * The clearest case in macroeconomics, and it needs no index at all: an oil exporter ships MORE and
 * earns LESS. specThin-01 records that the specification names value and volume and the section never
 * defined either.
 */
export const OIL = [{ barrels: 100, price: 60 }, { barrels: 110, price: 50 }];   // barrels in millions
/** Export earnings, $bn: millions of barrels × dollars = millions of dollars. */
export const oilValue = (i) => r2((OIL[i].barrels * OIL[i].price) / 1000);       // 6.0, 5.5
export const OIL_VOLUME_CHANGE = pct1(OIL[0].barrels, OIL[1].barrels);           // +10.0
export const OIL_VALUE_CHANGE = pct1(oilValue(0), oilValue(1));                  // −8.3

/* ── 3 · The consumer price index (2a, 2b, 2c, specGap-10) ─────────────────── */
/*
 * The weighted basket, as a grid — a diagram is the only surface in the schema that can carry one.
 * Weights sum to 100 and every product is exact.
 */
export const BASKET = [
  { group: 'Food', weight: 30, index: 108 },
  { group: 'Housing', weight: 25, index: 104 },
  { group: 'Transport', weight: 20, index: 112 },
  { group: 'Everything else', weight: 25, index: 100 },
];
/*
 * THE LIMITATION, AS ARITHMETIC RATHER THAN JARGON (2c). The specification asks for "limitations of
 * the CPI as a measure of the rate of inflation" and supplies no vocabulary for them; "substitution
 * bias" returns ZERO hits in the whole document, so the section does not use it. Instead the same
 * four price changes are re-weighted to a household that spends more of its money on food and less
 * on everything else, and the index comes out nearly a fifth higher. One national average, two
 * different experiences of it.
 */
export const HOUSEHOLD_BASKET = [
  { group: 'Food', weight: 45, index: 108 },
  { group: 'Housing', weight: 25, index: 104 },
  { group: 'Transport', weight: 20, index: 112 },
  { group: 'Everything else', weight: 10, index: 100 },
];

export const weightSum = (b) => b.reduce((n, g) => n + g.weight, 0);
export const weighted = (g) => g.weight * g.index;
export const indexOf = (b) => r2(b.reduce((n, g) => n + weighted(g), 0) / weightSum(b));
export const CPI = indexOf(BASKET);                        // 105.8
export const CPI_HOUSEHOLD = indexOf(HOUSEHOLD_BASKET);    // 107.0
/** Inflation is the percentage change in the index, and year 1 is 100, so it reads straight off. */
export const INFLATION = r2(CPI - 100);                    // 5.8
export const INFLATION_HOUSEHOLD = r2(CPI_HOUSEHOLD - 100); // 7.0

/*
 * Three years of the index, for inflation against deflation against disinflation (2a). Prices are
 * still RISING between years 2 and 3 and the RATE has fallen: that is disinflation, and it is the
 * distinction students most often lose.
 */
export const CPI_SERIES = GDP_INDEX;
export const INFLATION_Y3 = pct1(CPI_SERIES[1], CPI_SERIES[2]);     // +2.5 (1 dp)

/** The producer price index (2d), which moves before the consumer index does. */
export const PPI = [100, 111];
export const PPI_CHANGE = pct1(PPI[0], PPI[1]);                     // +9.0

/** A saver's $10,000 at 3% nominal interest, against inflation of 5.8% (2g-1, 2g-5). */
export const SAVINGS = 10000;
export const SAVINGS_RATE = 3;
export const savingsNominal = () => Math.round(SAVINGS * (1 + SAVINGS_RATE / 100));       // 10300
/** What that money buys once prices are CPI% higher — the real value, rounded to the dollar. */
export const savingsReal = () => Math.round(savingsNominal() / (CPI / 100));              // 9735

/* ── 4 · The labour force (3a, 3d, 3e, 3f) ─────────────────────────────────── */
/*
 * Tied to Andara's year-3 population of 26.0m, so the unemployment chapters are measuring the same
 * economy the growth chapters measured. Every rate below is exact.
 */
export const WORKING_AGE = 16.0;     // millions
export const EMPLOYED = 11.4;
export const UNEMPLOYED = 0.6;
export const LABOUR_FORCE = r2(EMPLOYED + UNEMPLOYED);                       // 12.0
export const INACTIVE = r2(WORKING_AGE - LABOUR_FORCE);                      // 4.0

export const unemploymentRate = () => r2((UNEMPLOYED / LABOUR_FORCE) * 100);  // 5.0
export const employmentRate = () => r2((EMPLOYED / WORKING_AGE) * 100);       // 71.25
export const inactivityRate = () => r2((INACTIVE / WORKING_AGE) * 100);       // 25.0

/** Of the employed, those working part-time who want full-time work (3d). They are still employed. */
export const UNDEREMPLOYED = 0.9;

/*
 * Net migration of working age (3f). More people are in work afterwards AND the unemployment rate is
 * higher, which is the whole reason the specification asks for the significance of net migration for
 * employment and unemployment as one requirement rather than two.
 */
export const MIGRATION = { workingAge: 0.2, joinLabourForce: 0.15, findWork: 0.12 };
export const mWorkingAge = () => r2(WORKING_AGE + MIGRATION.workingAge);           // 16.2
export const mLabourForce = () => r2(LABOUR_FORCE + MIGRATION.joinLabourForce);    // 12.15
export const mEmployed = () => r2(EMPLOYED + MIGRATION.findWork);                  // 11.52
export const mUnemployed = () => r2(mLabourForce() - mEmployed());                 // 0.63
export const mUnemploymentRate = () => Math.round((mUnemployed() / mLabourForce()) * 1000) / 10;  // 5.2

/* ── 5 · The balance of payments (4a, 4b, 4c) ──────────────────────────────── */
/*
 * A SURPLUS on trade in goods and services sitting inside a DEFICIT on the current account. That is
 * exactly the distinction 4b and 4c draw between them, and the March section — which taught the
 * current account as though it were the trade balance — had no way to show it.
 */
export const BOP = { goods: 18, services: -6, primary: -9, secondary: -5 };   // $bn
export const tradeInGoodsAndServices = () => r2(BOP.goods + BOP.services);    // +12
export const currentAccount = () => r2(tradeInGoodsAndServices() + BOP.primary + BOP.secondary);  // −2

/* ── formatting ────────────────────────────────────────────────────────────── */
/*
 * ONE FORMATTER PER KIND OF FIGURE (packet 18's Layer 6 rule). JavaScript renders a negative number
 * with an ASCII hyphen and a sentence typed by hand carries U+2212, and packet 18's first draft put
 * 55 of one beside 13 of the other in a section about negative numbers. This one is worse: a fall in
 * real output, a trade deficit and a negative growth rate are its subject matter. Every number a
 * student reads goes through one of these, and they all use U+2212.
 */
export const minus = (s) => String(s).replace(/-/g, '−');
/** Whole dollars, with thousands separators: a per-capita figure or a cash sum. */
export const money = (n) => (n < 0 ? `−$${Math.abs(n).toLocaleString('en-GB')}` : `$${n.toLocaleString('en-GB')}`);
/**
 * Billions, as the national accounts print them: the decimals that are actually there and no more,
 * so $18bn, $5.5bn and $547.56bn all read the way a table of them would.
 */
export const bn = (n) => {
  const a = Math.abs(n);
  const body = Number.isInteger(a) ? String(a) : String(r2(a));
  return `${n < 0 ? '−' : ''}$${body}bn`;
};
/** A percentage, sign kept, one decimal place. */
export const pc = (n) => (n > 0 ? `+${n}%` : `${minus(n)}%`);
/** A percentage with no sign forced, for a rate rather than a change: "5.0%", "71.25%". */
export const rate = (n) => `${n}%`;
/** An index value as the tables print it. */
export const idx = (n) => String(n);

/** Words of teaching text in a subsection, exactly as lib/content-validator.mjs counts them. */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((s) => (typeof s === 'object' ? `${s.title} ${s.subtitle || ''}` : s))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}
