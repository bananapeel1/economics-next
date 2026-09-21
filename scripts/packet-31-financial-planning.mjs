#!/usr/bin/env node
/**
 * PACKET 31 — financial-planning, Business Unit 2 (WBS12), IAL topic 2.3.2.
 * audit/raw/bus_spec.txt:885-914. FIVE blocks, twenty-five subsections, twenty-one substantive leaves.
 *
 *   node scripts/packet-31-financial-planning.mjs            # dry run, every check
 *   node scripts/packet-31-financial-planning.mjs --dump     # + write the bundle
 *   node scripts/packet-31-financial-planning.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. Carried forward from packet
 * 29 with its five newest guards intact, and these are the ones this packet adds or strengthens:
 *
 *   - **THE OFF-TOPIC LEAF BAN, and it is the whole of rule 2 for this section.** `moving average`
 *     and `extrapolation` are single hits in `bus_spec.txt` at :1150-1152, which is 3.3.3 · 1 —
 *     Unit 3, packet 14's `decision-making-techniques`. `total contribution`, `semi-variable` and
 *     `stepped` are **0 hits**. A sales-forecasting chapter reaches for a moving average by reflex
 *     and a break-even chapter reaches for total contribution to get to profit, and `specGap-03` asks
 *     for exactly that. The ban reads SVG `<text>` as well as prose, because packet 29 found a banned
 *     phrase in a diagram caption the moment the bans could see one.
 *   - **THE PROFIT ROUTE CHECK.** Refusing the phrase "total contribution" is not enough: the defect
 *     is the ARITHMETIC, and `contribution × units` written out in figures is the Unit 3 leaf without
 *     the words. So the runner recomputes every profit figure in the bundle from `tr(q) − tc(q)` and
 *     refuses any sentence that multiplies a contribution by an output.
 *   - **THE VARIANCE RECONCILIATION.** The revenue variance less the two cost variances must equal
 *     the profit variance, asserted against the spine rather than against the table, because a
 *     variance table that does not add up teaches a student that variances are independent — which
 *     is the misconception this section's own `structure-07` praises it for having.
 *   - **THE ONE MINUS SIGN.** A section that prints "−$8,400" in one place and "-$8,400" in another
 *     has two ways of writing the same number, and on a phone the hyphen reads as a word-break.
 *   - **`Construct` GOES ON THE CASH-FLOW FORECAST AND NEVER ON THE BREAK-EVEN CHART.** `3e` is
 *     interpretation only; `4a` is "Construction and interpretation". The live section demands
 *     "precise drawing" of a break-even chart, which is `structure-01` read against the text instead
 *     of against the specification. Asserted, not just written down.
 *   - **THE ANSWER-RECOVERABLE RECALL CHECK** (packet 29's, generalised). Verify B found 24 of 43 of
 *     packet 29's steps carrying a recall answerable by scrolling up, and not one was a reorder: the
 *     defect is a property of the SCREEN. The check measures whether the ANSWER is recoverable, not
 *     word overlap — overlap flags any recall that shares vocabulary with the teaching of its topic.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work, and two of packet 29's were wrong on their first run. Each block below that adds a check
 *     plants the defect, confirms it fires, removes it and confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline, printFindings } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { freeQuizPayload, PREVIEW_LIMITS, FREE_QUIZ_MAX, PRETEST_HEADROOM } from '../lib/preview-limits.js';
import { pickPretestQuestions } from '../lib/pretest-pool.js';
import { buildSteps } from '../lib/learn-steps.js';
import {
  SECTION, SUBJECT, UNIT, UNIT_CODE, TOPIC, SPEC_SPAN, round2,
  PLANT, CHANGES, CHANGE, CUT, FORECAST, CASHFLOW, BUDGET, MINUS,
  money, qty, teachingWords,
} from './_packet31-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, BLOCK_TITLES, B1, B2, B3, B4, B5 } from './_packet31-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet31-assessment.mjs';
import { DIAGRAMS, TABLE_MARGINS, estWidth, GRD } from './_packet31-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const P = PLANT;
const problems = [];
const notes = [];

/* ── pins ──────────────────────────────────────────────────────────────────── */
/*
 * `topFix-01`, `quiz-02` and `structure-02` are one defect: a block pinning a question from a
 * chapter the student has not reached. The finding prescribes "change content[1].quizIndices from
 * [1] to [8]", which is a correction to an index in a section that no longer exists. Every index
 * below is DERIVED from the item's own `block` tag, so the defect is unrepresentable — packet 20's
 * shape of fix. `topFix-02` and `structure-01` ask for `diagramRef`; that is the LEGACY string pin
 * and `lib/learn-steps.js:44-55` reads the block's `diagramId`, so `diagramId` is what is set.
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCK_TITLES.map((b) => [b, quizByBlock[b]]));
const practiceIndices = Object.fromEntries(BLOCK_TITLES.map((b) => [b, practiceByBlock[b]]));
const diagramIds = Object.fromEntries(BLOCK_TITLES.map((b, i) => [b, DIAGRAMS[i].id]));

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  mistakes: MISTAKES,
  diagrams: DIAGRAMS.map(({ _table, _checks, ...rest }) => rest),
  extras: EXTRAS,
};

const subsections = BLOCK_TITLES.flatMap((b) => SUBSECTIONS[b]);
const steps = buildSteps(content);

/* ── the strings a student can see ─────────────────────────────────────────── */
const svgText = (svg) => [...String(svg).matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]);
/* Joined per diagram: a caption is wrapped one <text> a line, so a phrase spanning two lines is in
   neither of them (packet 29). */
const diagramProse = DIAGRAMS.map((d) => [d.title, d.caption, ...svgText(d.svg)].join(' '));
const prose = [
  ...subsections.flatMap((s) => [s.title, s.keyIdea, s.realExample?.text, s.misconception, s.examMatters,
    ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])]),
    ...(s.recall ? [s.recall.prompt, ...(s.recall.template || []), ...(s.recall.items || []),
      ...(s.recall.groups || []).flatMap((g) => [g.name, ...g.items]),
      ...(s.recall.pairs || []).flatMap((p) => [p.left, p.right]),
      ...Object.values(s.recall.whys || {}), ...(s.recall.hints || []), ...(s.recall.distractors || [])] : [])]),
  ...content.flatMap((b) => [b.title, ...(b.takeaway || [])]),
  ...QUIZ.flatMap((q) => [q.question, ...q.options, q.explanation]),
  ...PRACTICE.flatMap((p) => [p.question, p.guidance]),
  ...FLASHCARDS.flatMap((c) => [c.front, c.back]),
  ...MISTAKES.flatMap((m) => [m.title, m.looks_like, m.why, m.instead]),
  ...EXTRAS.chains.flatMap((c) => [c.title, ...c.steps, c.result]),
  ...EXTRAS.evaluation.flatMap((e) => [e.title, e.content]),
  ...NOTES.flatMap((n) => [n.title, n.content]),
].filter(Boolean).map(String);
const everything = [...prose, ...diagramProse];

/* ── 1 · failed substitutions, over EVERY string including the SVGs ───────── */
/*
 * Packet 29 shipped eight student-facing strings reading `P = 80 − undefinedQ`, one of them a scored
 * quiz stem and one its own explanation, because a gradient lived on `NILE.short.b` and the template
 * asked for `NILE.b`. Nothing saw it: the arithmetic was right so every figure re-derivation passed,
 * and the vocabulary bans filtered SVG strings out. NOTE THE MISSING TRAILING WORD BOUNDARY —
 * `/\bundefined\b/` does not match `undefinedQ`, which is the form the defect actually took.
 */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of everything) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  problems.push(`a failed template substitution in a student-facing string: "${s.slice(0, 110)}"`);
}
{
  const mustFire = ['P = 80 − undefinedQ', 'MR = 80 − NaNQ', 'the closing balance is undefined', 'cost is ${money(P.vcu)} a case'];
  const mustNotFire = ['A firm that is undefinedly profitable is not a phrase anyone writes', 'the plant makes 20,000 cases'];
  problems.push(
    ...mustFire.filter((x) => !FAILED_SUBSTITUTION.test(x)).map((x) => `the failed-substitution check no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => FAILED_SUBSTITUTION.test(x) && !/undefined/.test(x)).map((x) => `the failed-substitution check is looser than documented: "${x}"`),
  );
}

/* ── 2 · the off-topic leaf ban (rule 2) ──────────────────────────────────── */
/*
 * THE SINGLE MOST IMPORTANT CHECK IN THIS RUNNER, because the content it refuses is content a
 * competent author would write. Each phrase belongs to a leaf ANOTHER section owns, verified by grep
 * against bus_spec.txt before a word of this section was written:
 *
 *   moving average, extrapolation, line of best fit, time-series  →  3.3.3 · 1  (:1150-1152, Unit 3)
 *   total contribution                                            →  0 hits; 3.3.3 · 5 owns the use
 *   semi-variable, stepped fixed                                  →  0 hits anywhere in the spec
 *   break-even output                                             →  0 hits; the term is break-even point
 *   profit and cash / cash is not profit                          →  2.3.3 · 2a, managing-finance
 *   improving cash flow / improve liquidity                       →  2.3.3 · 2b, managing-finance
 *   gross profit, operating margin, net profit margin             →  2.3.3 · 1, managing-finance
 *
 * `terms.later-unit` would catch some of these; the ban makes them unrepresentable instead, and it
 * reads SVG `<text>` as well as prose.
 */
const OFF_TOPIC = [
  [/moving average/i, '3.3.3 · 1 (bus_spec.txt:1150) — Unit 3, decision-making-techniques'],
  [/extrapolat/i, '3.3.3 · 1 (bus_spec.txt:1152) — Unit 3, decision-making-techniques'],
  [/line of best fit|scatter graph/i, '3.3.3 · 1 (bus_spec.txt:1152) — Unit 3'],
  [/time.series/i, '3.3.3 · 1 (bus_spec.txt:1150) — Unit 3'],
  [/total contribution/i, '0 hits in bus_spec.txt; 3.3.3 · 5 (:1175) owns the use of contribution'],
  [/semi.variable/i, '0 hits in bus_spec.txt; 1b names fixed, variable, total and average only'],
  [/stepped fixed|stepped cost/i, '0 hits in bus_spec.txt'],
  [/break.even output/i, '0 hits in bus_spec.txt; the term is "break-even point" (:901)'],
  [/profit is not cash|cash is not profit|distinction between profit and cash/i, '2.3.3 · 2a (:934) — managing-finance'],
  [/improving cash flow|improve liquidity|acid test|current ratio|factoring/i, '2.3.3 · 2b (:935) — managing-finance'],
  [/gross profit|operating profit margin|net profit margin|profit for the year/i, '2.3.3 · 1 (:927) — managing-finance'],
  [/net present value|payback|decision tree|critical path/i, '3.3.3 · 2-4 (:1155) — Unit 3'],
];
for (const s of everything) {
  for (const [re, owner] of OFF_TOPIC) {
    if (re.test(s)) problems.push(`off-topic leaf "${s.match(re)[0]}" — that is ${owner}: "${s.slice(0, 90)}"`);
  }
}
{
  /* A/B: plant one of each shape and confirm the ban fires, including inside an SVG <text>. */
  const planted = [
    'A three-period moving average smooths the series.',
    'Total contribution is contribution per unit times units sold.',
    'Some costs are semi-variable.',
    'Calculate the break-even output for the plant.',
    '<text x="10" y="20">Extrapolated trend</text>',
  ];
  const fired = planted.map((s) => {
    const str = /<text/.test(s) ? svgText(s).join(' ') : s;
    return OFF_TOPIC.some(([re]) => re.test(str));
  });
  fired.forEach((ok, i) => { if (!ok) problems.push(`the off-topic ban does not fire on: "${planted[i]}"`); });
  const clean = ['Contribution is selling price minus variable cost per unit.', 'The break-even point is 15,000 cases.'];
  clean.forEach((s) => { if (OFF_TOPIC.some(([re]) => re.test(s))) problems.push(`the off-topic ban fires on in-scope prose: "${s}"`); });
}

/* ── 3 · the profit route ─────────────────────────────────────────────────── */
/*
 * Banning the PHRASE "total contribution" is not enough, and this is the check that matters for
 * `specGap-03`. The defect is the arithmetic: contribution × output is the Unit 3 route to profit
 * with the words removed. So every profit figure in the bundle is re-derived from tr(q) − tc(q), and
 * any sentence that multiplies a contribution by an output is refused.
 *
 * The one deliberate exception is the common mistake that SHOWS the wrong arithmetic in order to
 * correct it, which is keyed by its own id rather than by a looser regex.
 */
const CONTRIBUTION_TIMES_OUTPUT = new RegExp(`${money(P.contribution).replace(/[$.]/g, '\\$&')}\\s*(?:a case|per case)?\\s*(?:×|x|multiplied by)\\s*[\\d,]+`, 'i');
const mistakeException = MISTAKES.find((m) => /Reading contribution as profit per unit/.test(m.title));
for (const s of prose) {
  if (!CONTRIBUTION_TIMES_OUTPUT.test(s)) continue;
  if (mistakeException && [mistakeException.looks_like, mistakeException.why].includes(s)) continue;
  problems.push(`profit reached by contribution × output, which is 3.3.3 · 5b: "${s.slice(0, 100)}"`);
}
{
  const bad = `Contribution is ${money(P.contribution)} a case × 20,000 cases`;
  if (!CONTRIBUTION_TIMES_OUTPUT.test(bad)) problems.push('the contribution-times-output check does not fire on its own example');
  const good = `Contribution is ${money(P.price)} − ${money(P.vcu)} = ${money(P.contribution)} a case`;
  if (CONTRIBUTION_TIMES_OUTPUT.test(good)) problems.push('the contribution-times-output check fires on the in-scope subtraction');
}

/* ── 4 · the spine re-derived ─────────────────────────────────────────────── */
/*
 * Every identity the section teaches, recomputed here from the primitive figures rather than read
 * back from the exhibit — so a change to one of the four inputs cannot quietly leave a screen behind.
 */
{
  const c = round2(P.price - P.vcu);
  const bep = P.fc / c;
  if (c !== P.contribution) problems.push(`contribution: spine says ${P.contribution}, re-derived ${c}`);
  if (bep !== P.bep) problems.push(`break-even point: spine says ${P.bep}, re-derived ${bep}`);
  if (P.actual - bep !== P.mos) problems.push(`margin of safety: spine says ${P.mos}, re-derived ${P.actual - bep}`);
  if (round2(P.price * bep) !== round2(P.fc + P.vcu * bep)) problems.push('break-even does not satisfy TFC + TVC = TR');
  if (P.ac(bep) !== P.price) problems.push(`average cost at break-even is ${P.ac(bep)} and the price is ${P.price}; the identity the section teaches is broken`);
  for (const ch of CHANGES) {
    const re = ch.fc / round2(ch.price - ch.vcu);
    if (re !== ch.bep) problems.push(`change case ${ch.key}: says ${ch.bep}, re-derived ${re}`);
    if (ch.bep === P.bep) problems.push(`change case ${ch.key} does not move the break-even point, so it teaches nothing`);
  }
  if (round2(CUT.price * CUT.q) !== CUT.tr) problems.push('the price-cut revenue does not re-derive');
  if (round2(CUT.tr - CUT.tc) !== CUT.profit) problems.push('the price-cut profit is not TR − TC');
  if (!(CUT.tr > P.tr(P.actual) && CUT.profit < P.profit(P.actual))) problems.push('the price-cut case no longer shows revenue up and profit down, which is what 1c is built on');
  if (FORECAST.factors.reduce((q, f) => q + f.effect, FORECAST.base) !== FORECAST.revised) problems.push('the forecast factors do not sum to the revised forecast');
  if (!FORECAST.aboveBep) problems.push('the revised forecast has fallen below the break-even point, so the margin-of-safety tie-in is wrong');
  if (!(FORECAST.factors.some((f) => f.effect > 0) && FORECAST.factors.some((f) => f.effect < 0))) problems.push('the three forecast factors all point the same way, which is the thing chapter 2 exists to show they do not');
}

/* ── 5 · the cash-flow forecast re-derived ────────────────────────────────── */
{
  let opening = CASHFLOW.openingBalance;
  CASHFLOW.rows.forEach((r, i) => {
    if (r.opening !== opening) problems.push(`cash flow month ${i + 1}: opening balance ${r.opening} does not follow the previous closing balance ${opening}`);
    const net = round2(r.receipts - r.payments);
    if (net !== r.net) problems.push(`cash flow month ${i + 1}: net ${r.net}, re-derived ${net}`);
    if (round2(r.opening + net) !== r.closing) problems.push(`cash flow month ${i + 1}: closing ${r.closing}, re-derived ${round2(r.opening + net)}`);
    if (round2(r.priorVolume * r.priorPrice) !== r.receipts) problems.push(`cash flow month ${i + 1}: receipts are not the PREVIOUS month's sales, which is the whole point of the credit terms`);
    opening = r.closing;
  });
  if (!CASHFLOW.rows.some((r) => r.closing < 0)) problems.push('no month closes negative, so block 4 has nothing to interpret');
  if (!(CASHFLOW.rows[CASHFLOW.rows.length - 1].closing > 0)) problems.push('the forecast does not recover by month 3, so the "temporary shortfall" argument in 4b is not on the page');
  if (!CASHFLOW.changed.every((r) => r.closing < 0)) problems.push('the change case no longer turns every closing balance negative');
  if (CHANGE.vcu.vcu !== round2(P.vcu + 0.4)) problems.push('the cash-flow change case and the break-even change case are no longer the same change');
}

/* ── 6 · the variance reconciliation ──────────────────────────────────────── */
{
  const [rev, varc, fix] = BUDGET.lines;
  const recon = round2(rev.signedDiff - varc.signedDiff - fix.signedDiff);
  if (recon !== BUDGET.profit.signedDiff) problems.push(`the variances do not reconcile: ${recon} against a profit variance of ${BUDGET.profit.signedDiff}`);
  if (recon !== BUDGET.reconciliation) problems.push('BUDGET.reconciliation disagrees with the re-derivation');
  if (!(rev.favourable && !BUDGET.profit.favourable)) problems.push('revenue favourable with profit adverse is the case block 5 is built on, and it is no longer true');
  if (round2(rev.actual - varc.actual - fix.actual) !== BUDGET.profit.actual) problems.push('actual profit is not actual revenue less the actual costs');
  /* A variance is a positive amount and a word, never a signed number (the convention is in
     _packet31-util.mjs). A leading sign in front of a variance is the defect this refuses. */
  for (const s of everything) {
    if (/(?:\+|−)\$[\d,]+\s*(?:favourable|adverse)/i.test(s)) problems.push(`a variance printed with a leading sign: "${s.slice(0, 90)}"`);
  }
}

/* ── 7 · one minus sign ───────────────────────────────────────────────────── */
/*
 * U+2212 everywhere, never a hyphen. On a phone a hyphen before a digit reads as a word-break, and a
 * section that uses both has two ways of writing the same number. Excludes hyphenated words
 * ("break-even", "zero-based", "thirty-day") by requiring a digit or a currency symbol after it.
 */
for (const s of everything) {
  const m = s.match(/(?:^|[\s(])-(?=[\d$])/);
  if (m) problems.push(`an ASCII hyphen used as a minus sign (use ${MINUS}): "${s.slice(0, 90)}"`);
}
{
  if (!/(?:^|[\s(])-(?=[\d$])/.test('the balance is -$8,400')) problems.push('the minus-sign check does not fire on its own example');
  if (/(?:^|[\s(])-(?=[\d$])/.test('a zero-based budget for the break-even point')) problems.push('the minus-sign check fires on a hyphenated word');
}

/* ── 8 · Construct belongs to the cash-flow forecast ──────────────────────── */
/*
 * `3e` is "Interpretation of break-even charts" and `4a` is "Construction and interpretation of
 * simple cash-flow forecasts" (bus_spec.txt:905, :907). So the drawing command goes on the cash-flow
 * forecast and the break-even chapter asks a student to READ one. `structure-01` reports the live
 * examMatters demanding "precise drawing" of a break-even chart; this asserts the other direction.
 */
{
  const constructs = PRACTICE.filter((p) => p.command === 'Construct');
  if (constructs.length !== 1) problems.push(`${constructs.length} Construct items; 4a names exactly one constructible surface in this topic`);
  for (const p of constructs) {
    if (p.block !== B4) problems.push(`Construct is pinned to "${p.block}"; 4a puts construction on the cash-flow forecast`);
    if (/break.even/i.test(p.question)) problems.push('a Construct item asks for a break-even chart; 3e is interpretation only');
  }
  for (const s of [...subsections.map((x) => x.examMatters), ...PRACTICE.map((p) => p.guidance)].filter(Boolean)) {
    if (/(?:draw|drawing|construct)[^.!?]{0,40}break.even (?:chart|diagram)/i.test(s)) {
      problems.push(`asks a student to DRAW a break-even chart, and 3e is interpretation only: "${s.slice(0, 90)}"`);
    }
  }
  if (!/(?:draw|drawing|construct)[^.!?]{0,40}break.even chart/i.test('students must practise drawing a break-even chart')) {
    problems.push('the draw-a-break-even-chart check does not fire on its own example');
  }
}

/* ── 9 · ledger ids, marker claims, paper claims ──────────────────────────── */
const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/;
for (const s of everything) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id in student-facing text: "${s.slice(0, 90)}"`);

/*
 * `examMatters` says what the COMMAND WORD requires, which Appendix 6 states and is therefore
 * citable. It never says what a marker does, never how often a paper asks, and never how a paper is
 * built. Packet 20 shipped "is levels-marked" eight times and this is the check that catches it —
 * which is also why `topFix-03`, `practice-02` and `practice-03` cannot be built as written.
 */
const withoutAllocations = (s) => String(s).replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
for (const s of everything) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = ['IAL 20-markers are levels-marked across KAA and evaluation.', 'A bare figure earns no marks.', 'This scores poorly.'];
  const mustNotFire = [`Total cost is ${money(P.tc(25000))} (1 mark).`, 'Appendix 6 defines Calculate as requiring workings.'];
  problems.push(
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM fires on a point allocation or an Appendix 6 citation: "${x}"`),
  );
}
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of everything) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
  if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);
}

/* ── 10 · the leaf map, by hand (V025) ────────────────────────────────────── */
/*
 * The coverage oracle matches by SUBSTRING, and this topic has leaves as short as "zero based",
 * "Margin of safety" and "Variance analysis" — so a percentage from the oracle is not evidence. Every
 * one of the 21 substantive leaves names the subsection that teaches it, and the runner fails if a
 * leaf is unmapped or names a subsection that does not exist. `1b` is ONE oracle row carrying four
 * calculations, so it is mapped twice and the four terms are separately asserted below.
 */
const LEAF_MAP = {
  '1a': 'sales-volume-and-revenue',
  '1b': ['fixed-and-variable-costs', 'total-and-average-costs'],
  '1c': ['improving-sales-volumes', 'improving-sales-revenues'],
  '2a': 'purpose-of-sales-forecasts',
  '2b-1': 'consumer-trends',
  '2b-2': 'economic-variables',
  '2b-3': 'actions-of-competitors',
  '2c': 'difficulties-of-sales-forecasting',
  '3a': 'contribution-per-unit',
  '3b-1': 'the-break-even-point',
  '3c': 'using-contribution-to-find-break-even',
  '3d': 'margin-of-safety',
  '3e': 'interpreting-a-break-even-chart',
  '3f': 'limitations-of-break-even-analysis',
  '4a': ['constructing-a-cash-flow-forecast', 'interpreting-a-cash-flow-forecast', 'changing-one-cash-flow-variable'],
  '4b': 'use-and-limitations-of-cash-flow-forecasts',
  '5a': 'purposes-of-budgets',
  '5b-1': 'budgets-based-on-historical-figures',
  '5b-2': 'zero-based-budgets',
  '5c': 'variance-analysis',
  '5d': 'difficulties-of-budgeting',
};
{
  const specItems = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items
    .filter((r) => r.id.startsWith('BUS-2.3.2-') && r.kind === 'leaf');
  const slugs = new Set(subsections.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  const mapped = new Set(Object.keys(LEAF_MAP));
  for (const leaf of specItems) {
    const key = leaf.id.replace('BUS-2.3.2-', '');
    if (!mapped.has(key)) { problems.push(`spec leaf ${key} ("${leaf.wording.slice(0, 60)}") is not in LEAF_MAP`); continue; }
    for (const slug of [LEAF_MAP[key]].flat()) {
      if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${key} to "${slug}", which is not a subsection of this section`);
    }
  }
  for (const key of mapped) {
    if (!specItems.some((l) => l.id === `BUS-2.3.2-${key}`)) problems.push(`LEAF_MAP names ${key}, which is not a leaf of BUS-2.3.2`);
  }
  if (specItems.length !== 21) notes.push(`the oracle now reports ${specItems.length} leaves for BUS-2.3.2, not the 21 this packet was built against`);
  /* `1b`'s four terms, asserted separately, because one oracle row can hide three unbuilt leaves. */
  const costProse = ['fixed-and-variable-costs', 'total-and-average-costs']
    .map((slug) => subsections.find((s) => s.id.endsWith(slug)))
    .flatMap((s) => [s.keyIdea, ...(s.body || []).map((b) => b.text)]).join(' ').toLowerCase();
  for (const term of ['fixed cost', 'variable cost', 'total cost', 'average cost']) {
    if (!costProse.includes(term)) problems.push(`1b names "${term}" and no subsection of chapter 1 teaches it`);
  }
}

/* ── 11 · structure, pins and the free-quiz payload ───────────────────────── */
{
  if (content.length !== 5) problems.push(`${content.length} blocks; the specification has five sub-topics`);
  if (subsections.length !== 25) notes.push(`${subsections.length} subsections, not the 25 in the spec block`);
  const ids = subsections.map((s) => s.id);
  if (new Set(ids).size !== ids.length) problems.push('duplicate subsection id');
  content.forEach((b) => {
    if (!b.diagramId) problems.push(`block "${b.title}" carries no diagramId`);
    if (!b.quizIndices?.length) problems.push(`block "${b.title}" pins no quiz question`);
    if (!b.practiceIndices?.length) problems.push(`block "${b.title}" pins no practice question`);
    if (!b.takeaway?.length) problems.push(`block "${b.title}" has no takeaway`);
  });
  if (unpinned.size !== PRETEST_HEADROOM) problems.push(`${unpinned.size} unpinned quiz items; PRETEST_HEADROOM is ${PRETEST_HEADROOM}`);
  if ([...unpinned].some((i) => i >= PRETEST_HEADROOM)) problems.push(`the unpinned items are not first in the array (at ${[...unpinned].join(', ')}); the payload's spare scan starts at 0`);
  const pinnedAll = Object.values(quizIndices).flat();
  if (new Set(pinnedAll).size !== pinnedAll.length) problems.push('a quiz item is pinned by more than one block');
  if (pinnedAll.some((i) => unpinned.has(i))) problems.push('a pre-test item is also a chapter pin');
  if (BLOCK_TITLES.every((b, i) => quizIndices[b]?.[0] === i)) problems.push('quizIndices are 0,1,2,… in block order (pins.identity)');
  /* Diagram ids are distinct and in block order, so no chapter shows another chapter's picture. */
  if (new Set(Object.values(diagramIds)).size !== 5) problems.push('two blocks share a diagramId');

  /*
   * MEASURED AGAINST THE SHIPPING FUNCTION, not predicted. Since packet 2.5 the pins are taken FIRST
   * and the Quiz tab's preview is topped up only if they did not fill it, so five chapters cost
   * nothing: the payload is 5 + 3 = 8 of FREE_QUIZ_MAX and the pre-test gets its full three.
   */
  const free = freeQuizPayload(bundle.quiz, content);
  const served = free.content.filter((b) => b.quizIndices?.length).length;
  if (served !== 5) problems.push(`${served} of 5 chapters resolve a check-in question for a signed-out student`);
  if (free.quiz.length > FREE_QUIZ_MAX) problems.push(`the free payload is ${free.quiz.length}, above FREE_QUIZ_MAX ${FREE_QUIZ_MAX}`);
  const reserved = free.content.flatMap((b) => (b.quizIndices || []).map((i) => free.quiz[i])).filter(Boolean);
  const pretest = pickPretestQuestions(free.quiz, reserved);
  if (pretest.length !== PRETEST_HEADROOM) problems.push(`the signed-out pre-test is ${pretest.length} questions, not ${PRETEST_HEADROOM}`);
  const reservedText = new Set(reserved.map((q) => q.question));
  for (const q of pretest) if (reservedText.has(q.question)) problems.push(`a pre-test question is also a check-in question: "${q.question.slice(0, 60)}"`);
  notes.push(`free payload ${free.quiz.length} of ${FREE_QUIZ_MAX} · ${served} of 5 chapters served · pre-test ${pretest.length}`);

  const teach = steps.filter((s) => s.type === 'teach').length;
  const checkin = steps.filter((s) => s.type === 'checkin').length;
  if (teach !== 25 || checkin !== 5) problems.push(`buildSteps gives ${teach} teach + ${checkin} check-in steps, not 25 + 5`);
  notes.push(`${steps.length} steps (${teach} teach + ${checkin} check-in)`);
}

/* ── 12 · recalls: type mix, and the answer is not on the screen ──────────── */
/*
 * PACKET 29'S SHARPEST FINDING, and it came from Verify B rather than from any check here: 24 of 43
 * steps carried a recall answerable by scrolling up, and NOT ONE of them was a reorder. Every
 * copy-from-screen rule this programme carries reads a reorder against a flow box; the defect was a
 * property of the SCREEN all along.
 *
 * The check asks whether the ANSWER is recoverable, not whether words overlap: a recall about a topic
 * always shares vocabulary with the teaching of that topic, so overlap flags almost everything. For a
 * fillin, the answer is recoverable when the answer STRING appears in the teaching on the same step
 * — including the examMatters box, which packet 29's own check had never read. For a match or a
 * classify, when a step's prose contains the left and the right (or the item and its group name)
 * within one sentence. For a reorder, when the items appear in the prose in their correct order.
 */
{
  const recalls = subsections.filter((s) => s.recall).map((s) => ({ s, r: s.recall }));
  const types = recalls.reduce((m, { r }) => ({ ...m, [r.type]: (m[r.type] || 0) + 1 }), {});
  if (recalls.length / subsections.length < 0.5) problems.push(`${recalls.length} recalls over ${subsections.length} subsections (depth.recalls wants ≥0.5)`);
  if (Object.keys(types).length < 3) problems.push(`only ${Object.keys(types).length} recall types used; structure-04's authoring half asks for variety`);
  notes.push(`recalls ${recalls.length}/${subsections.length}: ${Object.entries(types).map(([k, v]) => `${v} ${k}`).join(', ')}`);

  const screenOf = (s) => [s.keyIdea, ...(s.body || []).flatMap((b) => [b.text, ...(b.items || [])]),
    s.realExample?.text, s.misconception, s.examMatters].filter(Boolean).join(' ');
  const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9.,$%−\s]/g, '').replace(/\s+/g, ' ').trim();
  /*
   * TOKENS, NOT SUBSTRINGS, and this was wrong on its first run — which is why every check here is
   * A/B'd. A substring match reports the answer "6" as recoverable from any screen containing
   * "$6.00", and "14" from any screen containing "$14,400": the check would have refused content
   * that is perfectly safe and, worse, would have been believed. A token set built the same way for
   * both sides compares whole values.
   */
  /* A thousands separator is part of the number, not a token boundary: splitting on it turned
     "$6,000 a month" into the tokens "6" and "000", so the answer "6" matched a screen that never
     printed it. Commas between digits are removed before the split. */
  const tokensOf = (x) => new Set(norm(x).replace(/(\d),(?=\d)/g, '$1').split(/[^a-z0-9.]+/).filter(Boolean));
  const recoverable = (s, r) => {
    const screen = norm(screenOf(s));
    const screenTokens = tokensOf(screenOf(s));
    const sentences = screen.split(/(?<=[.!?])\s+/);
    const onScreen = (a) => {
      const t = [...tokensOf(a)];
      return t.length > 0 && t.every((w) => screenTokens.has(w));
    };
    if (r.type === 'fillin') {
      const hits = (r.answers || []).filter(onScreen);
      return hits.length / Math.max(1, (r.answers || []).length) > 0.5 ? hits : null;
    }
    if (r.type === 'match') {
      const hits = (r.pairs || []).filter((p) => sentences.some((x) => x.includes(norm(p.left)) && x.includes(norm(p.right))));
      return hits.length / Math.max(1, (r.pairs || []).length) > 0.5 ? hits.map((p) => p.left) : null;
    }
    if (r.type === 'classify') {
      const items = (r.groups || []).flatMap((g) => g.items.map((it) => ({ it, g: g.name })));
      const hits = items.filter(({ it, g }) => sentences.some((x) => x.includes(norm(it)) && x.includes(norm(g))));
      return hits.length / Math.max(1, items.length) > 0.5 ? hits.map((h) => h.it) : null;
    }
    if (r.type === 'reorder') {
      let last = -1, matched = 0;
      for (const it of r.correctOrder || []) {
        const at = screen.indexOf(norm(it).slice(0, 24));
        if (at > last) { matched += 1; last = at; }
      }
      return matched === (r.correctOrder || []).length && matched > 0 ? r.correctOrder : null;
    }
    return null;
  };
  for (const { s, r } of recalls) {
    const hit = recoverable(s, r);
    if (hit) problems.push(`the recall on "${s.title}" is answerable from its own screen (${hit.slice(0, 3).map((x) => `"${String(x).slice(0, 34)}"`).join(', ')})`);
  }
  {
    /* A/B, and both halves earned their place. The first fires on a fillin whose answers are printed
       in the teaching — including in `examMatters`, which is the box packet 29's Verify B found on
       its THIRD round printing both answers of step 6's recall, and which no check had ever read.
       The second and third are the substring false positives the token fix removes. */
    const planted = {
      title: 'planted',
      keyIdea: 'The break-even point is 15,000 cases and the margin of safety is 5,000 cases.',
      body: [{ type: 'paragraph', text: 'Contribution is $2.40 a case.' }],
      examMatters: 'The answer is adverse.',
      recall: { type: 'fillin', answers: ['15,000', '5,000', 'adverse'] },
    };
    if (!recoverable(planted, planted.recall)) problems.push('the answer-recoverable check does not fire on a fillin whose answers are printed above it');
    const clean = { ...planted, recall: { type: 'fillin', answers: ['17.5', '1.2', 'favourable'] } };
    if (recoverable(clean, clean.recall)) problems.push('the answer-recoverable check fires on a fillin that applies the idea to new figures');
    const substring = { ...planted, keyIdea: 'Average cost is $6.00 and the variance is $14,400.', body: [], examMatters: 'Nothing else.',
      recall: { type: 'fillin', answers: ['6', '14', '400'] } };
    if (recoverable(substring, substring.recall)) problems.push('the answer-recoverable check still matches a short answer inside a longer figure');
    /* The separator case plants NOTHING else, because an earlier version of it also carried
       "Appendix 6 defines Calculate" in examMatters — where a standalone "6" genuinely IS on the
       screen — so it was testing two things and failing for the honest reason. Every examMatters in
       this section cites Appendix 6, which is why no recall here answers with a single digit. */
    const separator = { title: 'planted', keyIdea: 'Fixed costs rise by $6,000 a month.', body: [], examMatters: 'Nothing else.',
      recall: { type: 'fillin', answers: ['6', '6', '6'] } };
    if (recoverable(separator, separator.recall)) problems.push('a thousands separator is still splitting a figure into short tokens');
    const commaFigure = { ...planted, keyIdea: 'The break-even point is 17,500 cases.', body: [], examMatters: 'Nothing else.',
      recall: { type: 'fillin', answers: ['17,500', '17500'] } };
    if (!recoverable(commaFigure, commaFigure.recall)) problems.push('a figure printed with a separator is no longer matched at all');
  }
  /* No reorder may sit in a subsection with a flow body, and this section authors no flows at all —
     so the rule is vacuous by construction, which is stronger than satisfied (packet 26, 27, 29). */
  const flowSubs = subsections.filter((s) => (s.body || []).some((b) => b.type === 'flow'));
  if (flowSubs.length) {
    for (const s of flowSubs) if (s.recall?.type === 'reorder') problems.push(`a reorder sits under a flow box on "${s.title}"`);
    notes.push(`${flowSubs.length} subsections carry a flow body; the no-reorder-under-a-flow rule is live rather than vacuous`);
  }
  /* Every reorder is sourced from an extras chain (`reorder.source` accepts a chain), and with no
     flows in the section a chain is the only place it can come from. */
  for (const { s, r } of recalls.filter(({ r }) => r.type === 'reorder')) {
    const ok = EXTRAS.chains.some((c) => {
      let last = -1, matched = 0;
      for (const it of r.correctOrder) {
        const words = new Set(norm(it).split(' ').filter((w) => w.length >= 5));
        const at = c.steps.findIndex((st, i) => i > last && [...words].some((w) => norm(st).includes(w)));
        if (at > last) { matched += 1; last = at; }
      }
      return matched / r.correctOrder.length >= 0.5;
    });
    if (!ok) problems.push(`the reorder on "${s.title}" is not sourced from any extras chain (reorder.source)`);
  }
}

/* ── 13 · quiz and practice construction ──────────────────────────────────── */
{
  QUIZ.forEach((q) => {
    if (q.options.length < 4 || q.options.length > 6) problems.push(`quiz "${q.question.slice(0, 50)}" has ${q.options.length} options`);
    if (new Set(q.options).size !== q.options.length) problems.push(`duplicate options on "${q.question.slice(0, 50)}"`);
    if (typeof q.correctIndex !== 'number' || !q.options[q.correctIndex]) problems.push(`bad correctIndex on "${q.question.slice(0, 50)}"`);
    const key = q.options[q.correctIndex].length;
    const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    if (key > 1.5 * longest) problems.push(`the length tell (quiz-03) on "${q.question.slice(0, 50)}": key ${key} against ${longest}`);
    /* Packet 26: an explanation may not name an option by POSITION. Items are dealt here and
       shuffled again at render, so "the second option" describes whatever lands there. */
    if (/\b(?:first|second|third|fourth|last)\s+(?:option|answer|choice)\b|\boption [A-D]\b/i.test(q.explanation)) {
      problems.push(`an explanation names an option by position: "${q.question.slice(0, 50)}"`);
    }
    if (/^(evaluate|assess|discuss|examine|to what extent)\b/i.test(q.question)) problems.push(`an essay command opens an MCQ stem: "${q.question.slice(0, 50)}"`);
  });
  const hist = [0, 0, 0, 0];
  QUIZ.forEach((q) => { hist[q.correctIndex] += 1; });
  hist.forEach((n, i) => {
    const share = n / QUIZ.length;
    if (share > 0.4 || share < 0.1) problems.push(`quiz.histogram: position ${i} holds ${n} of ${QUIZ.length} keys`);
  });
  if (QUIZ.length < 20) problems.push(`${QUIZ.length} quiz items (depth.quiz wants ≥20)`);

  /* The Business census, read from the file rather than remembered. Assess is 10 in Units 1-2. */
  const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === SUBJECT);
  const tariffs = Object.fromEntries(census.map((r) => [r.command, r.marks]));
  PRACTICE.forEach((p) => {
    if (!tariffs[p.command]) { problems.push(`"${p.command}" is not an IAL ${SUBJECT} command word`); return; }
    const ok = p.command === 'Assess' ? p.marks === (UNIT <= 2 ? 10 : 12) : tariffs[p.command].includes(p.marks);
    if (!ok) problems.push(`${p.command} (${p.marks}) is not a valid IAL ${SUBJECT} Unit ${UNIT} tariff — ${tariffs[p.command].join(' or ')}`);
    const paras = p.guidance.split('\n').map((x) => x.trim()).filter(Boolean);
    if (paras.length < 2) problems.push(`one-paragraph guidance on "${p.question.slice(0, 50)}"; guided mode prints it whole above the answer box`);
    /* practice.opening: the FIRST paragraph is printed before the student writes, so it may not
       carry a figure from the answer or a mark allocation. */
    if (/\(\s*\d+\s*marks?\s*\)/i.test(paras[0])) problems.push(`the opening paragraph of "${p.question.slice(0, 50)}" carries a mark allocation`);
    if (p.marks > 6 && /\(\s*\d+\s*marks?\s*\)/i.test(p.guidance)) problems.push(`the ${p.marks}-mark "${p.command}" allocates points (practice.levels)`);
  });
  for (const b of BLOCK_TITLES) if (!practiceByBlock[b]?.length) problems.push(`no practice item tagged to "${b}"`);
  if (!PRACTICE.some((p) => p.command === 'Calculate')) problems.push('no Calculate item, which is practice-04');
  if (PRACTICE.some((p) => /\(4 marks\)/.test(p.question) && p.command === 'Define')) problems.push('a Define item at 4 marks, which is practice-01');

  const ids = [...QUIZ, ...PRACTICE, ...FLASHCARDS, ...MISTAKES, ...DIAGRAMS].map((x) => x.id);
  if (new Set(ids).size !== ids.length) problems.push('duplicate item id in the bundle');
}

/* ── 14 · extras: every chain carries steps (V028) ────────────────────────── */
{
  EXTRAS.chains.forEach((c, i) => {
    if (!Array.isArray(c.steps) || !c.steps.length) problems.push(`extras chain ${i} ("${c.title}") has no steps[]; ExtrasTab.jsx:62 throws on it (V028)`);
    if (c.steps && c.steps.length < 2) problems.push(`extras chain ${i} has one step`);
  });
  if (!EXTRAS.evaluation.length) problems.push('no evaluation frames, so the Extras tab renders one section');
  /* The component's own expression, run over the bundle — packet 29's method for finding V028. */
  try { EXTRAS.chains.forEach((c) => c.steps.map((s) => String(s))); }
  catch (e) { problems.push(`ExtrasTab's own expression throws on this bundle: ${e.message}`); }
  { const bad = { title: 'planted', points: ['a', 'b'] };
    let threw = false;
    try { bad.steps.map((x) => x); } catch { threw = true; }
    if (!threw) problems.push('the V028 reproduction no longer throws, so the check is not testing what it claims'); }
}

/* ── 15 · emoji, schema lengths and the word budget ───────────────────────── */
{
  const emoji = subsections.map((s) => s.realExample?.emoji);
  if (emoji.some((e) => !e)) problems.push('a subsection has no realExample.emoji');
  if (new Set(emoji).size !== emoji.length) {
    const dupes = emoji.filter((e, i) => emoji.indexOf(e) !== i);
    problems.push(`duplicate realExample emoji ${[...new Set(dupes)].join(' ')} (structure-08)`);
  }
  subsections.forEach((s) => {
    if (s.keyIdea.length > 180) problems.push(`keyIdea over 180 chars on "${s.title}" (${s.keyIdea.length})`);
    if (/\*\*/.test(s.keyIdea)) problems.push(`bold in the keyIdea on "${s.title}"`);
    if (!s.misconception || !s.examMatters) problems.push(`"${s.title}" is missing a misconception or examMatters`);
    const w = teachingWords(s);
    if (w > 350) problems.push(`"${s.title}" is ${w} teaching words (step.words budget is 350)`);
  });
  content.forEach((b) => b.takeaway.forEach((t) => { if (t.length > 100) problems.push(`takeaway over 100 chars in "${b.title}"`); }));
}

/* ── 16 · diagrams: figures re-derived from the emitted SVG ───────────────── */
/*
 * A figure computed correctly and then printed into the wrong `<text>` is the same defect one layer
 * along (packets 19, 23, 25, 29), so every number the break-even chart shows is read back OUT of the
 * SVG and compared with the spine.
 */
{
  const chart = DIAGRAMS[2];
  const text = svgText(chart.svg).join(' ');
  const want = [
    [qty(P.bep), 'the break-even output'],
    [money(P.trAtBep), 'the revenue at break-even'],
    [money(P.profit(P.actual)), 'the profit at the actual output'],
    [qty(P.mos), 'the margin of safety'],
  ];
  for (const [fig, what] of want) if (!text.includes(fig)) problems.push(`the break-even chart does not print ${what} (${fig})`);
  /* The three curves are labelled TR, TC and FC in the right margin — a short label there cannot be
     crossed by a line, which is what the check below found the full names doing — and all three are
     written out in the note, which the check reads as well. */
  for (const label of ['TR', 'TC', 'FC', 'Break-even point', 'Margin of safety']) {
    if (!text.includes(label)) problems.push(`the break-even chart is missing its "${label}" label`);
  }
  for (const full of ['sales revenue', 'total costs', 'fixed costs']) {
    if (!chart.svg.toLowerCase().includes(full)) problems.push(`the break-even chart abbreviates a curve without writing "${full}" out anywhere`);
  }
  /*
   * `topFix-02` asks for the profit and loss ZONES, and they are shaded rather than worded, so the
   * check reads the shading itself: two polygons, one red and one green, each with an opacity. The
   * earlier version looked for the words "PROFIT" and "LOSS" — which is a check on one
   * IMPLEMENTATION of the requirement, and it started failing the moment the labels moved for a
   * collision. A requirement's check should read the requirement.
   */
  const zones = [...chart.svg.matchAll(/<polygon points="[^"]+" fill="(#[0-9a-f]{6})" opacity="([\d.]+)"/g)].map((m) => m[1]);
  if (!zones.includes('#ef4444')) problems.push('the break-even chart shades no loss zone');
  if (!zones.includes('#059669')) problems.push('the break-even chart shades no profit zone');
  /* And the two measured gaps have to be the real ones, re-derived: equal, and equal to the profit. */
  const lossQ = P.bep - P.mos;
  if (Math.abs(P.profit(lossQ)) !== P.profit(P.actual)) {
    problems.push(`the chart's two gaps are ${Math.abs(P.profit(lossQ))} and ${P.profit(P.actual)}; the caption says they are equal`);
  }
  /* The two gap OUTPUTS are marked on the axis and the two figures are in the caption, so the check
     reads both places rather than assuming the number is inside the frame. */
  if (!text.includes(qty(lossQ)) || !text.includes(qty(P.actual))) problems.push('the chart does not mark both gap outputs on the axis');
  if (!chart.caption.includes(qty(P.bep)) || !chart.svg.includes(money(Math.abs(P.profit(lossQ))))) {
    problems.push('the chart neither prints nor captions its gap figure');
  }
  /* Nothing drawn outside its canvas: the EXTENT, not the anchor, because SVG text neither wraps
     nor clips (packet 25's fifth instance, eleven found on packet 29's first run). */
  for (const d of DIAGRAMS) {
    const vbW = parseFloat((d.svg.match(/viewBox="([^"]+)"/) || [])[1].split(/\s+/)[2]);
    for (const m of d.svg.matchAll(/<text x="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)</g)) {
      const [, x, size, anchor, body] = m;
      const w = estWidth(body, parseFloat(size));
      const left = anchor === 'end' ? +x - w : anchor === 'middle' ? +x - w / 2 : +x;
      if (left < 0 || left + w > vbW) problems.push(`"${body.slice(0, 40)}" runs outside the ${vbW}-unit canvas of "${d.title}" (${Math.round(left)}..${Math.round(left + w)})`);
    }
  }
  /* Glyph BOXES with a vertical tolerance, not exact rounded y (packet 29: grouping by exact y
     reported zero collisions while twelve of nineteen scenarios were colliding). */
  for (const d of DIAGRAMS) {
    const boxes = [...d.svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)</g)].map((m) => {
      const [, x, y, size, anchor, body] = m;
      const w = estWidth(body, parseFloat(size));
      const left = anchor === 'end' ? +x - w : anchor === 'middle' ? +x - w / 2 : +x;
      return { left, right: left + w, y: +y, h: parseFloat(size), body };
    });
    for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i], b = boxes[j];
      /* 1.2 of the larger face, not 0.75. At 0.75 the tolerance was 9 units for an 11-unit label,
         so a pair 15 units apart was skipped — and rendered, "Total costs" 15 units above "Profit
         $12,000" reads as one cluster. A glyph box is about a face tall and a reader needs a gap of
         its own between two lines of text, so the bound has to exceed one face rather than fall
         short of it. Found by LOOKING at the chart, which is the only thing that finds this class. */
      if (Math.abs(a.y - b.y) > Math.max(a.h, b.h) * 1.2) continue;
      if (a.right <= b.left + 1 || b.right <= a.left + 1) continue;
      problems.push(`"${a.body.slice(0, 26)}" and "${b.body.slice(0, 26)}" overlap in "${d.title}" (y ${a.y}/${b.y})`);
    }
  }
  /*
   * A LABEL MAY NOT BE CROSSED BY A LINE — the class packet 29's Verify B found on its third round
   * and nothing in this repository looks for. A horizontal read-off drawn at a label's own y passes
   * along the whole string; a SLOPING curve is worse, because it passes UNDER a long label at one
   * end and OVER it at the other whatever vertical offset the label is given, so no amount of
   * nudging fixes it. The extent check and the collision check both pass it, because a line is not
   * text. This was found by rendering the chart and looking at it; the check exists so the next
   * change cannot reintroduce it silently.
   */
  for (const d of DIAGRAMS) {
    const boxes = [...d.svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)</g)].map((m) => {
      const [, x, y, size, anchor, bodyTxt] = m;
      const w = estWidth(bodyTxt, parseFloat(size));
      const left = anchor === 'end' ? +x - w : anchor === 'middle' ? +x - w / 2 : +x;
      const h = parseFloat(size);
      /* A glyph box: ascenders about 0.8 of the face above the baseline, descenders 0.2 below. */
      return { left, right: left + w, top: +y - h * 0.8, bottom: +y + h * 0.2, body: bodyTxt };
    }).filter((b) => b.body.trim());
    const segs = [...d.svg.matchAll(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/g)]
      .map((m) => ({ x1: +m[1], y1: +m[2], x2: +m[3], y2: +m[4] }));
    for (const b of boxes) for (const g of segs) {
      const lo = Math.min(g.x1, g.x2), hi = Math.max(g.x1, g.x2);
      const from = Math.max(lo, b.left), to = Math.min(hi, b.right);
      if (from > to) continue;                       // no horizontal overlap with the glyph box
      const yAt = (x) => (g.x2 === g.x1 ? g.y1 : g.y1 + ((x - g.x1) / (g.x2 - g.x1)) * (g.y2 - g.y1));
      const ys = [yAt(from), yAt(to)];
      const crosses = ys.some((y) => y >= b.top && y <= b.bottom)
        || (Math.min(...ys) < b.top && Math.max(...ys) > b.bottom);
      if (crosses) problems.push(`"${b.body.slice(0, 30)}" is crossed by a line in "${d.title}" (glyph ${Math.round(b.top)}..${Math.round(b.bottom)}, line ${ys.map((y) => Math.round(y)).join('..')})`);
    }
  }
  {
    /* A/B: a label sitting on a sloping line must fire; the same label clear of it must not. */
    const sloping = '<svg viewBox="0 0 560 400"><line x1="100" y1="200" x2="300" y2="140"/><text x="120" y="180" font-size="12" text-anchor="start">Sales revenue</text></svg>';
    const clear = '<svg viewBox="0 0 560 400"><line x1="100" y1="200" x2="300" y2="140"/><text x="120" y="80" font-size="12" text-anchor="start">Sales revenue</text></svg>';
    const cross = (svg) => {
      const m = svg.match(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="([\d.]+)"[^>]*>([^<]*)</);
      const w = estWidth(m[4], parseFloat(m[3])), h = parseFloat(m[3]);
      const box = { left: +m[1], right: +m[1] + w, top: +m[2] - h * 0.8, bottom: +m[2] + h * 0.2 };
      const g = svg.match(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/).slice(1).map(Number);
      const yAt = (x) => g[1] + ((x - g[0]) / (g[2] - g[0])) * (g[3] - g[1]);
      const from = Math.max(Math.min(g[0], g[2]), box.left), to = Math.min(Math.max(g[0], g[2]), box.right);
      if (from > to) return false;
      const ys = [yAt(from), yAt(to)];
      return ys.some((y) => y >= box.top && y <= box.bottom) || (Math.min(...ys) < box.top && Math.max(...ys) > box.bottom);
    };
    if (!cross(sloping)) problems.push('the line-crossing check does not fire on a label sitting on a sloping line');
    if (cross(clear)) problems.push('the line-crossing check fires on a label well clear of the line');
  }

  /* V022, and this section clears it rather than reporting it — see _packet31-diagrams.mjs. */
  for (const d of DIAGRAMS) {
    if (d.kind !== 'table') continue;
    const vbW = parseFloat((d.svg.match(/viewBox="([^"]+)"/) || [])[1].split(/\s+/)[2]);
    const worst = Math.min(...[...d.svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => parseFloat(m[1])));
    const px = round2(worst * (530 / vbW));
    if (px < 12) problems.push(`"${d.title}" renders its smallest text at ${px}px in the 530px column (diagram.table-legible)`);
  }
  notes.push(`table margins at ${GRD.size} units: ${TABLE_MARGINS.map((t) => round2(t.margin)).join(', ')} of ${GRD.right - GRD.x0}`);
}

/* ── 17 · the validator, and the baseline ─────────────────────────────────── */
/*
 * `contextFor` reads the subject, unit code and spec number from the DATABASE rather than from the
 * constants at the top of this file, so a disagreement between the two is itself a finding — and
 * `before`/`after` are both computed so the report can say what this rebuild CLEARS as well as what
 * it adds. The baseline only ever shrinks (PROTOCOL, gate step 4).
 */
const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
if (ctx.subject !== SUBJECT || ctx.unitCode !== UNIT_CODE) {
  problems.push(`the database says ${ctx.subject}/${ctx.unitCode} and this runner says ${SUBJECT}/${UNIT_CODE}`);
}
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const findings = after.findings;
const blocks = findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const debt = findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && !after.findings.some((g) => g.key === f.key));
notes.push(`validator: ${before.findings.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${before.findings.filter((f) => f.tier === 'DEBT').length} DEBT live → ${findings.filter((f) => f.tier === 'BLOCK').length} / ${findings.filter((f) => f.tier === 'DEBT').length}, ${cleared.length} findings cleared`);

/* ── report ───────────────────────────────────────────────────────────────── */
console.log(`packet 31 — ${SECTION}, ${SUBJECT} Unit ${UNIT} (${UNIT_CODE}), IAL ${TOPIC}`);
console.log(`${SPEC_SPAN}\n`);
console.log(`${content.length} blocks · ${subsections.length} subsections · ${QUIZ.length} quiz · ${PRACTICE.length} practice · ${DIAGRAMS.length} diagrams · ${FLASHCARDS.length} cards · ${MISTAKES.length} mistakes · ${EXTRAS.chains.length} chains + ${EXTRAS.evaluation.length} evaluation\n`);
for (const n of notes) console.log(`  · ${n}`);
console.log('');
if (blocks.length || debt.length) {
  console.log(`validator: ${blocks.length} new BLOCK, ${debt.length} new DEBT`);
  for (const f of [...blocks, ...debt]) console.log(`  ${f.tier.padEnd(5)} ${f.rule.padEnd(26)} ${String(f.detail).slice(0, 96)}`);
  console.log('');
}
for (const b of blocks) problems.push(`validator BLOCK ${b.rule}: ${b.detail}`);

if (problems.length) {
  console.log(`${problems.length} PROBLEM${problems.length === 1 ? '' : 'S'}:`);
  for (const p of problems) console.log(`  ✗ ${p}`);
  process.exit(1);
}
console.log(`no problems. ${findings.length} validator findings in all, ${debt.length} new DEBT.`);

if (DUMP) {
  const path = `audit/snapshots/packet-31-bundle__${SUBJECT}__${SECTION}.json`;
  writeFileSync(path, `${JSON.stringify({ ...ctx, ...bundle }, null, 2)}\n`);
  console.log(`bundle → ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`staged to draft: ${JSON.stringify(res)}`);
}
