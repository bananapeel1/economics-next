/**
 * PACKET 54 — assessing-competitiveness helpers: the id scheme, the formatters, the ONE FIRM every
 * figure in the section is read off, and the bans.
 *
 * IAL Business 3.3.5 "Assessing competitiveness", Unit 3 (WBS13), `audit/raw/bus_spec.txt:1218-1248`.
 * Three sub-topics — 1 Interpretation of financial statements · 2 Ratio analysis · 3 Human
 * resources — and **18 leaves** (23 rows in `audit/raw/spec-items.json`, five of which are the
 * `requirement` parents 1a, 1b, 2a, 3a and 3c).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE AND IT DOES NOT EXIST HERE ══
 *
 * Twelve of the thirty-one ids cite "3.5.1"-"3.5.3", "3.1.2" or "3.1.4". None of those numbers is a
 * heading in `bus_spec.txt`; the heading "3.3.5 Assessing competitiveness" sits at `:1218`, between
 * "3.3.4 Influences on business decisions" and "3.3.6 Manging change" [sic]. Every claim was read by
 * its WORDING at `:1218-1248`. The runner asserts the headings by line.
 *
 *     `structure-08` is INVERTED: it says '3.3.5' is wrong and the topic is "3.5". The heading at
 *     `:1218` settles it the other way; the id is wont-fix.
 *
 * ════ THE FORMULAE ARE THE SPECIFICATION'S OWN (Appendix 9, `bus_spec.txt:2399-2446`) ═════
 *
 *   gross profit margin            gross profit ÷ revenue × 100
 *   profit for the year margin     profit for the year ÷ revenue × 100   ("(net profit) margin")
 *   current ratio                  current assets ÷ current liabilities
 *   acid test ratio                (current assets − inventory) ÷ current liabilities
 *   capital employed               non-current liabilities + total equity
 *   gearing ratio                  non-current liabilities ÷ capital employed × 100
 *   ROCE                           operating profit ÷ capital employed × 100
 *
 * The statement of comprehensive income in Appendix 9 runs revenue − cost of sales = gross profit −
 * other operating expenses = operating profit − interest = profit for the year. There is no tax line,
 * so this section has none. `accuracy-03`'s flashcard ("net profit margin = operating profit ÷
 * revenue") is the Unit 2 operating profit margin (2.3.3, `:931-933`) under the wrong name.
 *
 * ════ THE SPINE · one bakery chain, two years, every figure derived ═══════════════
 *
 *   INCOME (1a)     revenue $32m → $40m; cost of sales $17.6m → $24m; gross profit $14.4m → $16m;
 *                   other operating expenses $9.4m → $10m; operating profit $5m → $6m; interest
 *                   $0.2m → $0.8m; profit for the year $4.8m → $5.2m.
 *   POSITION (1b)   non-current assets $18.5m → $29m (a new central bakery); current assets $4.5m →
 *                   $6m (inventory $1.5m → $2.5m); current liabilities $3m → $5m; bank loans
 *                   (non-current liabilities) $2.5m → $10m at 8%; total equity $17.5m → $20m.
 *   RATIOS (2a)     GPM 45% → 40% · PFY margin 15% → 13% · current 1.5:1 → 1.2:1 · acid test
 *                   1:1 → 0.7:1 · capital employed $20m → $30m · gearing 12.5% → 33.3% · ROCE 25% → 20%,
 *                   against an 8% cost of borrowing.
 *   PEOPLE (3a)     bakers: 128,000 loaves a month from 40 → 150,000 from 50 (3,200 → 3,000 each);
 *                   shop staff: 27 of 180 left → 60 of 200 (turnover 15% → 30%); of those employed
 *                   at the start of the year, 153 of 170 stayed → 152 of 190 (retention 90% → 80%);
 *                   2.5 days lost per 100 → 1,350 of 45,000 days → 2,500 of 50,000 (absenteeism 3% → 5%).
 *                   Replacing a leaver costs $8,000, so turnover cost $216,000 → $480,000.
 *
 * Money: one symbol, `$` (Hong Kong dollars). No year, no real company, no UK frame; the firm is
 * invented, and the runner refuses the named real firms the live section carried (Tesla, Apple,
 * Samsung, Tesco, LVMH) and the one `topFix-04` proposed (Evergrande).
 */
import { createHash } from 'node:crypto';

export const SECTION = 'assessing-competitiveness';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;
export const round1 = (n) => Math.round(n * 10) / 10;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

/** Money. The ONLY currency symbol this section emits. */
export const usd = (n) => `${n < 0 ? MINUS : ''}$${plain(Math.abs(n))}`;
/** Money in millions: $4.8m, $0.8m, $17.6m. */
export const usdm = (n) => `${n < 0 ? MINUS : ''}$${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count of things. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage, to one decimal place at most. */
export const pct = (n) => `${round1(n).toLocaleString('en-GB', { maximumFractionDigits: 1 })}%`;
/** A ratio written n:1. */
export const ratio = (n) => `${round2(n).toLocaleString('en-GB', { maximumFractionDigits: 2 })}:1`;

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Orla Bakeries';
  const short = 'Orla';
  const home = 'Hong Kong';

  /* 1a · the statement of comprehensive income, last year (L) and this year (T) */
  const incomeL = { revenue: 32e6, cos: 17.6e6, opex: 9.4e6, interest: 0.2e6 };
  const incomeT = { revenue: 40e6, cos: 24e6, opex: 10e6, interest: 0.8e6 };
  const derive = (x) => {
    const gp = x.revenue - x.cos;
    const op = gp - x.opex;
    const pfy = op - x.interest;
    return { ...x, gp, op, pfy, gpm: (gp / x.revenue) * 100, pfym: (pfy / x.revenue) * 100 };
  };
  const L = derive(incomeL);
  const T = derive(incomeT);

  /* 1b · the statement of financial position, at the end of each year */
  const posL = { nca: 18.5e6, inventory: 1.5e6, receivables: 1e6, cash: 2e6, cl: 3e6, ncl: 2.5e6, shareCapital: 8e6, retained: 9.5e6 };
  const posT = { nca: 29e6, inventory: 2.5e6, receivables: 1.5e6, cash: 2e6, cl: 5e6, ncl: 10e6, shareCapital: 8e6, retained: 12e6 };
  const pos = (p, inc) => {
    const ca = p.inventory + p.receivables + p.cash;
    const netAssets = p.nca + ca - p.cl - p.ncl;
    const equity = p.shareCapital + p.retained;
    const ce = p.ncl + equity;
    return {
      ...p, ca, netAssets, equity, ce,
      current: ca / p.cl, acid: (ca - p.inventory) / p.cl,
      gearing: (p.ncl / ce) * 100, roce: (inc.op / ce) * 100,
    };
  };
  const PL = pos(posL, L);
  const PT = pos(posT, T);
  const borrowRate = 8;                 // typed: % a year on the bank loans

  /* 3a · people */
  const bakersL = { staff: 40, loaves: 128_000 };      // a month
  const bakersT = { staff: 50, loaves: 150_000 };
  const prodL = bakersL.loaves / bakersL.staff;         // 3,200
  const prodT = bakersT.loaves / bakersT.staff;         // 3,000
  const prodChangePct = ((prodT - prodL) / prodL) * 100; // −6.25
  const shopsL = { avg: 180, leavers: 27, start: 170, stayed: 153, daysLost: 1_350 };
  const shopsT = { avg: 200, leavers: 60, start: 190, stayed: 152, daysLost: 2_500 };
  const daysPerWorker = 250;            // typed: working days a year
  const hr = (s) => ({
    ...s,
    turnover: (s.leavers / s.avg) * 100,
    retention: (s.stayed / s.start) * 100,
    possibleDays: s.avg * daysPerWorker,
    absence: (s.daysLost / (s.avg * daysPerWorker)) * 100,
  });
  const HL = hr(shopsL);
  const HT = hr(shopsT);
  const replaceCost = 8_000;            // typed: recruiting and training one replacement
  const turnoverCostL = HL.leavers * replaceCost;   // 216,000
  const turnoverCostT = HT.leavers * replaceCost;   // 480,000
  /* Pay must fit the accounts: 200 shop staff × $2,000 × 12 = $4.8m, inside other operating expenses
   * of $10m with the rent of 24 shops, delivery and head office (fix round 1: $14,000 gave $33.6m). */
  const shopPay = 2_000;                // typed: a month
  const rivalPay = 2_200;               // typed: a month, at the two largest rival chains
  const esopCost = 500_000;             // typed: a year, the share scheme under discussion

  return {
    name, short, home, L, T, PL, PT, borrowRate,
    bakersL, bakersT, prodL, prodT, prodChangePct,
    HL, HT, daysPerWorker, replaceCost, turnoverCostL, turnoverCostT, shopPay, rivalPay, esopCost,
  };
})();

/*
 * BANNED, BECAUSE THE SPECIFICATION DOES NOT CONTAIN IT OR ANOTHER TOPIC OWNS IT. Each entry cites
 * the measurement that settles it; the runner A/Bs every one both ways and re-measures the spec.
 */
export const BANNED_ELSEWHERE = [
  [/\bVRIO\b|\bcore competenc\w*|\bdistinctive capabilit\w*|\bbalanced scorecard\b|\btriple bottom line\b/i, 'VRIO / core competencies / balanced scorecard / triple bottom line — 0 hits in bus_spec.txt; removed by packet 13 (topFix-03, accuracy-02, structure-01, specGap-07)'],
  [/\bBowman\b|\bstrategic clock\b/i, 'Bowman\'s Strategic Clock — 0 hits in bus_spec.txt (practice-02)'],
  [/\bPorter\b|\bfive forces\b|\bgeneric strateg\w*|\bcost leadership\b/i, 'Porter\'s five forces and strategic matrix — 3.3.1 · 2a/4c and 4.3.2 · 2b (bus_spec.txt:1099, :1110, :1390), not 3.3.5 (practice-01; SPEC-OWNERSHIP row "Porter\'s five forces")'],
  [/\bbenchmark\w*/i, 'benchmarking as a named technique — not a business bullet in bus_spec.txt; the live extras were built on it. Comparing with rivals and industry averages is taught as interpretation instead'],
  [/\bOutline\b|\bAnalyse\b[^()]{0,200}\(\s*\d+\s*marks?\s*\)|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)/, 'command words and tariffs this paper does not set: Outline is not IAL, Examine is Economics, the Units 3-4 source set has no 6-mark Analyse, and Define is 2 marks (practice-01, practice-02)'],
  [/\bcompetitive advantage\b/i, 'competitive advantage as a topic — a bullet at 1.3.2 · 2d (bus_spec.txt:542) and 2.3.4, not at 3.3.5; the live practice was built on it (practice-01 p0 "Define competitive advantage", practice-03)'],
];

/*
 * THE NEIGHBOURS THAT MAY BE POINTED AT AND MAY NOT BE TAUGHT. `max` mentions, each carrying its
 * topic number in the same string.
 */
export const POINTER_ONLY = [
  { re: /\boperating profit margin\b/i, why: 'the operating profit margin is a Unit 2 ratio (2.3.3 · 1c, bus_spec.txt:931-933) and not a 3.3.5 ratio; accuracy-03\'s flashcard gave its formula the wrong name', max: 1, mustCite: /2\.3\.3/ },
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'statement of comprehensive income', 'statement of financial position', 'revenue', 'cost of sales',
  'gross profit', 'operating profit', 'profit for the year', 'current assets', 'current liabilities',
  'non-current', 'total equity', 'stakeholder', 'margin', 'liquidity', 'current ratio', 'acid test',
  'gearing', 'capital employed', 'roce', 'interest', 'ratio analysis', 'window dressing',
  'labour productivity', 'labour turnover', 'retention', 'absenteeism', 'financial reward',
  'share ownership', 'consultation', 'empowerment',
];

/** The word budget, counted the way `lib/content-validator.mjs` counts it (packet 44). */
export function teachingWords(sec) {
  const normText = (s) => String(s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
  const words = (s) => normText(s).split(' ').filter(Boolean).length;
  const teaching = [sec?.keyIdea, ...(sec?.body || []).flatMap((b) => [b?.text, ...(b?.items || []), ...((b?.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))), b?.result]), sec?.realExample?.text, sec?.misconception, sec?.examMatters];
  return words(teaching.filter(Boolean).join(' '));
}

/** The terms a subsection actually teaches with. */
export function teachingVocabulary(sec) {
  const hay = [sec.title, sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))])].join(' ').toLowerCase();
  return TEACHING_TERMS.filter((t) => hay.includes(t));
}
