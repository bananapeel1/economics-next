/**
 * PACKET 43 — economic-growth helpers: the id scheme, the formatters, the specification's own
 * lists, and the ONE ECONOMY every figure in the section is read off.
 *
 * IAL Economics 2.3.5, Unit 2 (WEC12), `audit/raw/econ_spec.txt:1094-1125`. Four sub-topics —
 * Causes of growth · Benefits of growth · Costs of growth · Output gaps — and **23 leaves** in
 * `audit/raw/spec-items.json`.
 *
 * ════ RULE 1 · WHAT THE LIVE SECTION TEACHES THAT 2.3.5 DOES NOT CONTAIN ═══
 *
 *   THE TRADE CYCLE. The live section's third block is "The Business (Trade) Cycle" — boom,
 *   recession, recovery — with its own diagram. `cycle` is **0 hits in the whole of
 *   `econ_spec.txt`**, and so are `boom`, `slump` and `trough`. The one related word, `recession`,
 *   has ONE hit, `:902`, which is **2.3.1 · 1g** ("The concept of 'recession' as two consecutive
 *   quarters of negative economic growth") — owned by `measures-economic-performance`. The trade
 *   cycle is UK GCE material. The block is not rebuilt; what 2.3.5 DOES ask about fluctuations is
 *   `4a` (actual growth against the long-term trend) and `4c` (the characteristics of positive and
 *   negative output gaps), and both are built in full. `structure-03` (move the cycle overview to
 *   the top of its block) and the cycle-phase clauses of `topFix-04` and `structure-09` therefore
 *   have nothing left to act on. The runner re-greps the specification for every one of those words
 *   rather than trusting this paragraph.
 *
 *   `specGap-07` doubted the number. `:1094` reads `2.3.5 Economic growth`, a heading of its own
 *   between `2.3.4 National income` (`:1056`) and `2.3.6` (`:1132`). The runner asserts it by line.
 *
 *   `practice-02` is right that the FDI item is Unit 4: "developing countries" and FDI's role in
 *   development are 4.3.6. It is ALSO true that 2.3.5 · 1d-1 names "foreign direct investment
 *   (FDI)" as a cause of POTENTIAL growth, and the live section never teaches it. Two obligations:
 *   remove the Unit 4 framing, and teach 1d-1 in its own terms. Both are done.
 *
 *   `sustainable growth`, `inclusive growth` and the Human Development Index are each 0 hits in
 *   2.3.5 (HDI is Unit 4's measures of development). The live bank carries all three.
 *
 * ════ THE SPINE · one economy, and every figure derived from it ══════════
 *
 * NOTHING BELOW IS TYPED IN EXCEPT THE TREND RATE, ONE YEAR'S POTENTIAL OUTPUT, THE NINE OUTPUT
 * GAPS, THE LABOUR FORCE AND ITS OUTPUT PER WORKER, THE TWO GROWTH RATES THAT DRIVE CAPACITY, THE
 * AD COMPONENTS AND THE TAX SHARE. Every actual output, every actual growth rate, every gap in
 * billions and the doubling times are computed, and the runner re-derives each one a second way.
 *
 * Money is in dollars, billions. One minus sign, U+2212, emitted by `money` itself (packet 18).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'economic-growth';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;
export const round0 = (n) => Math.round(n);

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */

export const MINUS = '−';
const abs = (n) => Math.abs(n);
/** A money amount in dollars. Integers print plain; anything else to one decimal. */
export const money = (n) => {
  const a = abs(n);
  const body = Number.isInteger(round1(a)) ? round0(a).toLocaleString('en-GB') : round1(a).toFixed(1);
  return `${n < 0 && round1(a) !== 0 ? MINUS : ''}$${body}`;
};
/** Billions — the unit every money figure in this section is in. */
export const bn = (n) => `${money(n)}bn`;
/** A rate or a share. One decimal unless whole; a leading sign only when asked for. */
export const pct = (n, { signed = false } = {}) => {
  const r = round1(n);
  const body = Number.isInteger(r) ? String(abs(r)) : abs(r).toFixed(1);
  const sign = r < 0 ? MINUS : signed && r > 0 ? '+' : '';
  return `${sign}${body}%`;
};
/** Workers, in millions. */
export const mn = (n) => `${Number.isInteger(round1(n)) ? round0(n) : round1(n).toFixed(1)} million`;
/** A plain dollar amount per worker, with thousands separators. */
export const usd = (n) => `$${round0(n).toLocaleString('en-GB')}`;

/* ══ THE ECONOMY · Loriana ════════════════════════════════════════════════ */

/*
 * A fictional mid-sized open economy, so that no real country is given a figure it does not have.
 * The REAL examples in the content are real and carry no figures or years (packet 15's rule: a
 * conceptual topic does not need statistics to work, and nothing is left to overstate). The
 * ARITHMETIC is Loriana's.
 */
export const ECON = (() => {
  const country = 'Loriana';
  const what = 'an economy that assembles electronics for export and imports much of its fuel and machinery';

  /* ── 4a · the long-term trend, and nine years of actual output around it ─── */
  const trendRate = 2.5;               // %, the long-term trend rate of growth of potential output
  const refYear = 3;                   // the year whose potential output is typed in
  const potentialRef = 500;            // $bn, potential output in Year 3
  /* the output gap each year, % of potential. Typed in; everything else is derived from it */
  const GAPS = [0, -1, -2, -1, 0, 1, 2, 1, 0];
  const YEARS = GAPS.map((_, i) => i + 1);                                 // Year 1 … Year 9
  const potential = YEARS.map((y) => potentialRef * (1 + trendRate / 100) ** (y - refYear));
  const actual = potential.map((p, i) => p * (1 + GAPS[i] / 100));
  /* actual growth, Year 2 onward — the rate a statistician would publish */
  const growth = actual.map((a, i) => (i === 0 ? null : (a / actual[i - 1] - 1) * 100));
  const at = (year) => year - 1;

  /* the two years the teaching reads off, in dollars */
  const neg = { year: 3, potential: potential[at(3)], actual: actual[at(3)] };
  neg.gapBn = neg.actual - neg.potential;                                  // −10
  neg.gapPct = (neg.gapBn / neg.potential) * 100;                          // −2
  const pos = { year: 7, potential: potential[at(7)], actual: actual[at(7)] };
  pos.gapBn = pos.actual - pos.potential;                                  // +11.0
  pos.gapPct = (pos.gapBn / pos.potential) * 100;                          // +2

  /* ── 4d · three estimates of the same capacity, disagreeing only about the trend since Year 3 */
  const judgeYear = 5;
  const ESTIMATES = [2.0, 2.5, 3.0].map((rate) => {
    const cap = potentialRef * (1 + rate / 100) ** (judgeYear - refYear);
    return { rate, potential: cap, gapPct: (actual[at(judgeYear)] / cap - 1) * 100 };
  });

  /* ── 1e · capacity from people and productivity, in Year 3 ─────────────── */
  const workers = 20;                  // million
  const outputPerWorker = 25000;       // $ a year, real
  const capacityCheck = (workers * 1e6 * outputPerWorker) / 1e9;          // $bn, must equal potentialRef
  const labourGrowth = 0.5;            // %, the labour force, including net migration (1d-3)
  const productivityGrowth = 2.0;      // %, output per worker (1e)
  const nextWorkers = workers * (1 + labourGrowth / 100);
  const nextOutputPerWorker = outputPerWorker * (1 + productivityGrowth / 100);
  const nextCapacity = (nextWorkers * 1e6 * nextOutputPerWorker) / 1e9;   // $bn
  const capacityGrowth = (nextCapacity / capacityCheck - 1) * 100;         // 2.51
  /* the importance of productivity for the RATE: halve productivity growth and see what happens */
  const slowProductivity = 1.0;
  const slowRate = ((1 + labourGrowth / 100) * (1 + slowProductivity / 100) - 1) * 100;
  const doubling = (r) => Math.log(2) / Math.log(1 + r / 100);
  const doublingFast = doubling(capacityGrowth);                          // ~28 years
  const doublingSlow = doubling(slowRate);                                // ~46 years

  /* ── 1b · aggregate demand in Year 3, component by component ───────────── */
  const C = 300, I = 70, G = 100, X = 180, M = 160;
  const AD = C + I + G + (X - M);                                          // must equal actual in Year 3
  /* 1c · a rise in export demand, before any multiplier effect (topic 2.3.4) */
  const exportRise = 10;

  /* ── 2a-5 · tax revenue as a share of GDP, Year 3 to Year 4 ────────────── */
  const taxShare = 20;                 // % of GDP
  const taxFrom = (taxShare / 100) * actual[at(3)];
  const taxTo = (taxShare / 100) * actual[at(4)];

  /* ── 3a-3 · the trade balance, Year 3 against Year 7 ───────────────────── */
  const tradeEarly = { X, M };                                             // surplus of 20
  const tradeLate = { X: 196, M: 204 };                                    // imports sucked in by growth
  const balanceEarly = tradeEarly.X - tradeEarly.M;
  const balanceLate = tradeLate.X - tradeLate.M;

  return {
    country, what,
    trendRate, refYear, potentialRef, GAPS, YEARS, potential, actual, growth, at,
    neg, pos, judgeYear, ESTIMATES,
    workers, outputPerWorker, capacityCheck, labourGrowth, productivityGrowth,
    nextWorkers, nextOutputPerWorker, nextCapacity, capacityGrowth,
    slowProductivity, slowRate, doubling, doublingFast, doublingSlow,
    C, I, G, X, M, AD, exportRise,
    taxShare, taxFrom, taxTo,
    tradeEarly, tradeLate, balanceEarly, balanceLate,
  };
})();

/* ══ THE SPECIFICATION'S OWN LISTS ════════════════════════════════════════ */

/*
 * Each is the specification's wording, and the runner asserts every one against
 * `audit/raw/econ_spec.txt:1094-1125` rather than against this comment.
 */
/** 1d, `:1102-1106`. FOUR causes of potential growth — the live section teaches two of them. */
export const POTENTIAL_CAUSES = [
  'domestic investment and foreign direct investment (FDI)',
  'innovation',
  'growth in size of labour force, including net migration',
  'the degree of competition',
];
/** 2a, `:1108-1114`. SIX possible benefits. */
export const BENEFITS = [
  'higher living standards',
  'lower unemployment',
  'increased profits for firms',
  'higher levels of investment',
  'increased tax revenues',
  'improved public services',
];
/** 3a, `:1115-1120`. FIVE possible costs — the live costs list names two. */
export const COSTS = [
  'opportunity costs',
  'environmental costs',
  'balance of trade deficits',
  'increased inequality',
  'inflation',
];

/* ══ RULE 1 / RULE 2 · WHAT THIS SECTION MAY NOT SAY ════════════════════════ */

/*
 * Every entry is 0 hits in `econ_spec.txt` unless its note says otherwise, and the runner re-greps
 * the specification for each rather than trusting the list (`specZero: true` asks it to).
 */
export const BANNED = [
  /* the trade cycle: 0 hits for every one of these words in the whole specification */
  { re: /\btrade cycle\b|\bbusiness cycle\b|\beconomic cycle\b/i, specRe: /\bcycle\b/gi, why: 'the trade cycle is 0 hits in econ_spec.txt ("cycle" appears nowhere); UK GCE material' },
  { re: /\bboom\b/i, specRe: /\bboom\b/gi, why: '"boom" is 0 hits in econ_spec.txt — the trade-cycle vocabulary the live block 3 was built on' },
  { re: /\bslump\b|\btrough\b/i, specRe: /\bslump\b|\btrough\b/gi, why: '0 hits in econ_spec.txt' },
  { re: /\brecovery phase\b|\bphases? of the\b/i, specRe: /\bphases? of the\b/gi, why: 'cycle phases are not in the specification' },
  /*
   * THE ONE CARVE-OUT. `recession` has ONE hit, `:902`, 2.3.1 · 1g. A student who meets a negative
   * output gap WILL ask whether it is a recession, and the section must answer — so the word is
   * sayable in a sentence that sends it to 2.3.1, and nowhere else. `NEEDS_ONE` makes the pointer
   * compulsory, so the ban cannot be met by silence. A/B'd both ways in the runner.
   */
  { re: /\brecessions?\b/i, exemptIf: /\b2\.3\.1\b/, specRe: /\brecession\b/gi, specHits: 1, owner: '2.3.1', why: 'recession is 2.3.1 · 1g (measures-economic-performance); sayable only with its pointer' },
  /* 0 hits in 2.3.5, and the live bank carries each */
  { re: /\bsustainable growth\b|\bsustainable economic growth\b/i, specRe: /\bsustainable (economic )?growth\b/gi, why: '"sustainable growth" is 0 hits in econ_spec.txt; structure-09\'s drift is between two quiz items defining a term the specification does not use' },
  { re: /\binclusive growth\b/i, specRe: /\binclusive growth\b/gi, why: '0 hits in econ_spec.txt' },
  { re: /\bHuman Development Index\b|\bHDI\b/, specRe: /\bHuman Development Index\b|\bHDI\b/g, specHits: 3, owner: '4.3.6', why: 'HDI is 4.3.6 · 1 (Unit 4, measures of development), not 2.3.5' },
  { re: /\bdeveloping (countries|economies|nations)\b/i, why: 'practice-02: FDI "in developing countries" is 4.3.6 (Unit 4) framing' },
  { re: /\baccelerator\b/i, specRe: /\baccelerator\b/gi, why: '0 hits in econ_spec.txt' },
  { re: /\bOkun\b/, specRe: /\bOkun\b/g, why: '0 hits in econ_spec.txt' },
  /* Appendix 6: neither exists in IAL Economics */
  { re: /\bAssess\b/, why: 'Assess is not an IAL Economics command word (Appendix 6)' },
  { re: /\bOutline\b/, why: 'Outline is not a command word in the IAL Economics specification (Appendix 6)' },
  { re: /\b10 marks?\b/i, why: 'there is no 10-mark tariff in IAL Economics (Appendix 6)' },
  /* terms.later-unit and terms.off-spec, held here too so a DEBT cannot be shipped past */
  { re: /\bpublic sector\b|\bpublic expenditure\b|\bterms of trade\b|\bmeasures of development\b|\bprofits and losses\b/i, why: 'terms.later-unit — a Unit 3/4 topic label' },
  { re: /\bmerit goods?\b|\bdemerit goods?\b|\bdeadweight loss\b/i, why: 'terms.off-spec' },
];

/**
 * RULE 3 (packet 42): words that address the audit or the build rather than the student. Verify B
 * blocked packet 42 on 25 of these in body text. No exemption: nothing a student reads needs them.
 */
export const SCAFFOLDING_IN_PROSE = [
  [/\bLeaf\s+\d|\bleaf\s+\d[a-z]?\b|\bleaves\s+\d/i, 'the build\'s own leaf numbering'],
  [/\bsub-?topic\s+\d/i, 'the build\'s sub-topic numbering'],
  [/\bspec(?:ification)? point\b/i, '"spec point" is audit vocabulary'],
  [/\bthe audit\b|\bspecGap\b|\btopFix\b|\bpacket\s+\d/i, 'the audit or the build speaking in student text'],
  [/\bthe specification (?:says|asks|lists|names|defines|wants|requires|calls)\b/i, 'the specification as the SPEAKER'],
  [/\bthis (?:section|packet) (?:rebuilds|was rebuilt|replaces)\b/i, 'the build describing itself'],
];

/*
 * A BAN WITH NO POSITIVE OBLIGATION CAN BE SATISFIED BY SILENCE. These are the statements the
 * section must make.
 */
export const NEEDS_ONE = [
  { re: /\brecession\b[^.]*\b2\.3\.1\b|\b2\.3\.1\b[^.]*\brecession\b/i, why: 'the recession pointer to 2.3.1 must exist — a negative output gap is not a recession, and the student must be told where recession IS taught' },
  { re: /\bmultiplier\b[^.]*\b2\.3\.4\b|\b2\.3\.4\b[^.]*\bmultiplier\b/i, why: 'the multiplier is used and not taught here; it must carry its pointer to 2.3.4' },
  { re: /\bfrom inside\b[^.]*\bfrontier\b|\binside the (?:PPF|frontier)\b[^.]*\btowards\b/i, why: 'accuracy-01: actual growth from spare capacity must be stated as a movement from INSIDE the frontier towards it' },
  { re: /\bbalance of trade deficits?\b/i, why: 'the specification\'s own phrase for 3a-3 must appear' },
  { re: /\bforeign direct investment\b/i, why: '1d-1: FDI must be taught as a cause of potential growth' },
  { re: /\bdegree of competition\b/i, why: '1d-4 is MISSING from the live section (spec-coverage.json)' },
  { re: /\bexport-led growth\b/i, why: '1c (specGap-01)' },
  { re: /\btrend rate of growth\b|\blong-term trend\b/i, why: '4a (specGap-02)' },
];

/** Terms the section MUST use, because they are the specification's own words for its leaves. */
export const TEACHING_TERMS = [
  'actual growth', 'potential growth', 'export-led growth', 'foreign direct investment', 'innovation',
  'net migration', 'degree of competition', 'productivity', 'living standards', 'unemployment',
  'profits', 'investment', 'tax revenue', 'public services', 'opportunity cost', 'environmental',
  'balance of trade', 'inequality', 'inflation', 'output gap', 'positive output gap',
  'negative output gap', 'trend',
];
