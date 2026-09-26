/**
 * PACKET 53 — influences-business-decisions helpers: the id scheme, the formatters, the
 * specification's own words, the bans and asides, and the ONE FIRM every figure is read off.
 *
 * IAL Business 3.3.4 "Influences on business decisions", Unit 3 (WBS13), `audit/raw/bus_spec.txt:1184-1211`
 * (next heading, 3.3.5, at `:1218`). Three sub-topics — 1 Corporate culture (1a-1d) · 2 Stakeholder
 * model versus shareholder model (2a-2d) · 3 Business ethics (3a-3c) — and **15 leaves** (17 rows in
 * `audit/raw/spec-items.json`; 1b and 2c are `requirement` parents).
 *
 * ════ RULE 1 · THE LEDGER'S NUMBERING IS UK GCE AND IT DOES NOT EXIST HERE ══════════
 *
 * Fifteen of the twenty-six open ids cite `3.4.1`-`3.4.4`. In `bus_spec.txt` the heading
 * `3.3.4 Influences on business decisions` sits at `:1184`, and no `3.4.1`-`3.4.4` exists in the file
 * (the runner re-measures this). Every claim was read by its WORDING at `:1184-1211`.
 *
 *   - `3.4.1 Corporate influences` (short-termism vs long-termism; evidence-based vs subjective
 *     decision-making) is a UK GCE topic. The words "short-termis", "long-termis", "subjective" and
 *     "intuitive" are 0 hits in `bus_spec.txt`; "evidence-based" appears only in the assessment-
 *     objective prose (`:1566`, `:2129`), never as content. `specGap-01`/`-02` are wont-fix; the live
 *     practice item on short-termism is replaced, not taught to.
 *   - `specGap-08` "environmental considerations and animal welfare": "animal" is 0 hits. 3.3.4 · 3 has
 *     three leaves (trade-offs, pay and rewards, CSR). Environmental CONDUCT is taught inside CSR (3c);
 *     "environmental considerations" as its own bullet is 4.3.4 · 2b (`:1471`), a Unit 4 topic.
 *
 * ════ THE ASIDES · names the specification does not use, named once and never assessed ═══
 *
 * DECISIONS.md (packets 13/16/18): "where the specification supplies no vocabulary for a leaf, teach
 * the mechanism in the specification's own words, name the standard term once as an aside, and never
 * assess it." Measured in `bus_spec.txt`, 0 hits each: Handy, Mendelow, Friedman, Freeman, Carroll,
 * greenwash, groupthink. The spec's own words are power / role / task / person, internal / external
 * stakeholders, the stakeholder and shareholder models, trade-offs between profit and ethics, pay and
 * rewards, CSR. So:
 *
 *   Handy, Friedman, Freeman, Mendelow, greenwashing, groupthink   ≤ 1 mention each, teaching text
 *                                                                   only, never on an assessed surface
 *   Carroll's pyramid                                               banned (topFix-05)
 *
 * ════ THE SPINE · one listed snack maker, and every figure derived ═══════════════════
 *
 *   CULTURE (1)     Orvana, a Malaysian snack maker, founded by one family and grown to 2,400 staff.
 *                   Founder-led power culture; role culture in the factories; a new chief executive
 *                   from outside wants decisions made in cross-functional teams.
 *   CONFLICT (2d)   Close the older Ipoh factory (300 jobs) and move the work to an automated plant in
 *                   Johor: saves RM9m a year, costs RM12m once. Profit RM60m → RM69m a year.
 *   TRADE-OFF (3a)  Certified sustainable palm oil: 20,000 tonnes a year at RM300 a tonne more
 *                   = RM6m a year, profit RM60m → RM54m (a 10% fall), covered by a 1.2% price rise on
 *                   RM500m of sales.
 *   PAY (3b)        Chief executive RM4.8m, median employee RM48,000: 100 to 1. A proposed RM1.2m
 *                   profit bonus takes it to RM6m: 125 to 1. Those two ratios are taught and drawn.
 *                   The Calculate item asks for the ratio to the LOWEST-paid factory workers
 *                   (RM30,000: 160 and 200 to 1), figures printed nowhere a student meets before it —
 *                   fix round 1, C-…-specGap-07: the median ratio was printed above the item.
 *
 * Money: one currency, the ringgit, written `RM`. No year, no real company; the runner refuses the
 * live section's named firms (Google, Volkswagen, Patagonia, BP) and their dated claims.
 */
import { createHash } from 'node:crypto';

export const SECTION = 'influences-business-decisions';

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const hash8 = (s) => createHash('sha1').update(norm(s)).digest('hex').slice(0, 8);
export const id = (kind, key) => `${SECTION}:${kind}:${hash8(key)}`;
export const subId = (s) => `${SECTION}:sub:${s}`;

export const round2 = (n) => Math.round(n * 100) / 100;

/* ── formatting: one formatter a kind of figure (packet 18) ────────────────── */
export const MINUS = '−';
const plain = (n) => (Number.isInteger(n)
  ? n.toLocaleString('en-GB')
  : round2(n).toLocaleString('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 2 }));

/** Ringgit, the ONLY currency this section emits: RM48,000. */
export const rm = (n) => `${n < 0 ? MINUS : ''}RM${plain(Math.abs(n))}`;
/** Ringgit in millions: RM4.8m. */
export const rmm = (n) => `${n < 0 ? MINUS : ''}RM${(round2(Math.abs(n) / 1e6)).toLocaleString('en-GB', { maximumFractionDigits: 2 })}m`;
/** A count. */
export const units = (n, noun) => `${plain(n)}${noun ? ` ${noun}` : ''}`;
/** A percentage. */
export const pct = (n) => `${plain(round2(n))}%`;
/** A ratio "to 1". */
export const ratio = (n) => `${plain(round2(n))} to 1`;

/* ══ THE FIRM ═══════════════════════════════════════════════════════════════ */

export const FIRM = (() => {
  const name = 'Orvana';
  const home = 'Malaysia';
  const staff = 2_400;                 // typed

  /* 2d · the factory decision */
  const sales = 500_000_000;           // typed: yearly sales revenue
  const profit = 60_000_000;           // typed: yearly profit
  const oldSite = 'Ipoh';
  const newSite = 'Johor';
  const jobs = 300;                    // typed: jobs at the older factory
  const closureSaving = 9_000_000;     // typed: yearly saving
  const closureCost = 12_000_000;      // typed: one-off redundancy and moving cost
  const profitAfterClosure = profit + closureSaving;              // 69m

  /* 3a / 3c · the palm oil decision */
  const oilTonnes = 20_000;            // typed
  const oilPremium = 300;              // typed: RM a tonne more for certified oil
  const oilCost = oilTonnes * oilPremium;                         // 6m
  const profitWithOil = profit - oilCost;                         // 54m
  const oilProfitFallPct = (oilCost / profit) * 100;              // 10
  const oilPriceRisePct = (oilCost / sales) * 100;                // 1.2

  /* 3b · pay and rewards */
  const ceoPay = 4_800_000;            // typed: total yearly pay
  const medianPay = 48_000;            // typed
  const bonus = 1_200_000;             // typed: proposed profit bonus
  const payRatio = ceoPay / medianPay;                            // 100
  const ceoPayAfter = ceoPay + bonus;                             // 6m
  const payRatioAfter = ceoPayAfter / medianPay;                  // 125
  /* the Calculate item's own figures: never on the chapter-4 diagram, the body or the notes */
  const lowPay = 30_000;               // typed: yearly pay of the lowest-paid factory workers
  const lowRatio = ceoPay / lowPay;                               // 160
  const lowRatioAfter = ceoPayAfter / lowPay;                     // 200
  const lowRatioRise = bonus / lowPay;                            // 40

  return {
    name, home, staff, sales, profit, oldSite, newSite, jobs, closureSaving, closureCost, profitAfterClosure,
    oilTonnes, oilPremium, oilCost, profitWithOil, oilProfitFallPct, oilPriceRisePct,
    ceoPay, medianPay, bonus, payRatio, ceoPayAfter, payRatioAfter, lowPay, lowRatio, lowRatioAfter, lowRatioRise,
  };
})();

/* ══ The specification's own words (`bus_spec.txt:1188-1211`) ═════════════════ */

export const CULTURE_TYPES = ['power', 'role', 'task', 'person'];

/*
 * BANNED OUTRIGHT: the UK GCE topics the ledger cites and the off-specification frameworks. Each is
 * re-measured against bus_spec.txt by the runner, and each is A/B'd both ways.
 */
export const BANNED = [
  [/\bshort[- ]termis\w*|\blong[- ]termis\w*|\bcorporate timescales?\b/i, 'short-termism / long-termism — UK GCE "3.4.1 Corporate influences", 0 hits in bus_spec.txt (topFix-01, specGap-01, practice-01)'],
  [/\bevidence[- ]based decision|\bsubjective decision|\bintuitive decision|\bintuition\b/i, 'evidence-based vs subjective decision-making — UK GCE 3.4.1(b), not a 3.3.4 leaf (specGap-02)'],
  [/\banimal welfare\b|\banimal testing\b/i, 'animal welfare — 0 hits in bus_spec.txt; UK GCE business ethics (specGap-08, topFix-04)'],
  [/\bCarroll\b|\bCSR pyramid\b|\bpyramid of (?:CSR|corporate social responsibility)\b/i, 'Carroll\'s CSR pyramid — 0 hits in bus_spec.txt (topFix-05)'],
  [/\bOutline\b|\bAnalyse\b[^()]{0,200}\(\s*\d+\s*marks?\s*\)|\bExamine\b|\bDefine\b[^()]{0,200}\(\s*4\s*marks?\s*\)/, 'command words or tariffs this paper does not set: Outline is not IAL, Examine is Economics, Define is 2 marks, and the Units 3-4 source set has no Analyse'],
  [/\bpower[- ]interest\b|\bkey players?\b|\bkeep (?:satisfied|informed)\b/i, 'the Mendelow grid as TAUGHT structure — not a 3.3.4 leaf; one aside only (accuracy-01)'],
];

/*
 * THE ASIDES: at most `max` mentions, all in the teaching text (content sections), none on an assessed
 * surface (quiz, practice, recalls, flashcards, mistakes).
 */
export const ASIDES = [
  { re: /\bHandy\b/, why: 'Handy — the spec lists the four cultures unattributed (specGap-09)', max: 1 },
  { re: /\bMendelow\b/, why: 'Mendelow — 0 hits in bus_spec.txt (accuracy-01, specGap-09)', max: 1 },
  { re: /\bFriedman\b/, why: 'Friedman — the spec says "shareholder model"', max: 1 },
  { re: /\bFreeman\b/, why: 'Freeman — the spec says "stakeholder model"', max: 1 },
  { re: /\bgreenwash\w*/i, why: 'greenwashing — the spec says CSR', max: 1 },
  { re: /\bgroupthink\b/i, why: 'groupthink — the spec says strong and weak cultures', max: 1 },
];

/* The vocabulary a subsection teaches with; every subsection must use at least one. */
export const TEACHING_TERMS = [
  'culture', 'strong culture', 'weak culture', 'power culture', 'role culture', 'task culture',
  'person culture', 'founder', 'change', 'stakeholder', 'shareholder', 'internal', 'external',
  'objective', 'profit', 'ethic', 'trade-off', 'pay', 'reward', 'corporate social responsibility', 'csr',
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
