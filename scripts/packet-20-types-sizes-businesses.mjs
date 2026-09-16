#!/usr/bin/env node
/**
 * PACKET 20 — types-sizes-businesses, Economics Unit 3 topic 3.3.1 (37 spec leaves).
 *
 *   node scripts/packet-20-types-sizes-businesses.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-20-types-sizes-businesses.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-20-types-sizes-businesses.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet20-content.mjs (blocks and Notes), scripts/_packet20-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet20-diagrams.mjs (the five SVGs). This file
 * assembles the bundle, pins each block to its diagram, quiz and practice items, and runs the checks a
 * verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive: pounds sterling, "Outline" and "Assess" (neither is an IAL
 *     Economics command word), the UK GCE COMPANY-LAW vocabulary this specification never uses, the
 *     economies-of-scale vocabulary that belongs to 3.3.2, UK-only institutions, any uncited examiner
 *     claim, any claim about what a marker does, and any claim about how often a paper asks something;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for
 *     ECONOMICS, where there is no Assess and no 10-mark tariff;
 *   - the diagrams' own geometry, re-derived from the emitted SVG rather than asserted: every curve on
 *     the objectives diagram sampled from P = 60 − 2Q, MR = 60 − 4Q, MC = 20 and AC = 20 + 72/Q, the
 *     three marked outputs against the solved conditions, the size bars against SIZE_FIRMS, and every
 *     row of the types table against TYPE_ROWS;
 *   - Layer 5 by string: Imani's figures appear in the body AND in at least one other surface.
 *
 * ONE NOTE ON "SHAREHOLDER". The word is used in the demerger and divorce-of-ownership chapters as
 * ordinary English — a demerger cannot be defined without saying who ends up holding the two companies
 * — and it is NOT banned below. What is banned is the UK GCE company-law vocabulary the March section
 * taught as examinable terms: sole trader, partnership as a business form, limited liability, Ltd and
 * plc, none of which occurs anywhere in econ_spec.txt.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, FIRM, teachingWords, price, total, units, arAt, mrAt, acAt, trAt, tcAt, profitAt, A, B, MC, FIXED, Q_PROFIT, Q_REVENUE, Q_VOLUME, Q_BREAKEVEN_LOW, OBJECTIVES, SIZE_FIRMS, measuresDisagree } from './_packet20-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6 } from './_packet20-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet20-assessment.mjs';
import { DIAGRAMS, OX, OY, OQ, AC_SAMPLES, TYPE_ROWS, TYPES_TBL, sizeBarW, sizeBarY, SBAR, r2 } from './_packet20-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a signed-out student is sent only
 * PREVIEW_LIMITS.quiz items (F086), so a pre-test whose pool sits at the end of the array serves that
 * student two PINNED questions instead (packet 16's walkthrough).
 */
const unpinned = new Set(QUIZ.map((q, i) => (q.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'A state-owned enterprise is best defined as an organisation that is:'),
  [B2]: first(quizByBlock[B2], 'A refinery employs few people but uses a great deal of capital, while a cleaning contractor employs thousands and owns very little. This shows that:'),
  [B3]: first(quizByBlock[B3], 'Horizontal integration is best described as a merger or takeover between firms:'),
  [B4]: first(quizByBlock[B4], 'Which of the following is a constraint on business growth?'),
  [B5]: first(quizByBlock[B5], 'A demerger is best defined as:'),
  [B6]: first(quizByBlock[B6], 'Profit maximisation occurs where:'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5], [B6]: practiceByBlock[B6],
};
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why topFix-01's "add diagramRef" would not have
 * worked. Block 4 has none on purpose: constraints on growth and the impact of growth are an argument,
 * and a drawing of an argument is decoration.
 */
const diagramIds = {
  [B1]: DIAGRAMS[0].id, [B2]: DIAGRAMS[1].id, [B3]: DIAGRAMS[2].id,
  [B4]: undefined, [B5]: DIAGRAMS[3].id, [B6]: DIAGRAMS[4].id,
};

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  diagrams: DIAGRAMS,
  extras: EXTRAS,
  mistakes: MISTAKES,
};

/* ── the packet's own checks ───────────────────────────────────────────────── */

const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const texts = allStrings(bundle);
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£/g, 'pounds sterling (one currency per section, dollars)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject)');
ban(/\bAssess\b/g, '"Assess" (an IAL Business command word; Economics has no Assess and no 10-mark tariff)');
/*
 * The UK GCE company-law vocabulary, measured rather than assumed: `sole trader`, `limited liability`
 * and `shareholder` return ZERO occurrences in econ_spec.txt, and `partnership` and `plc` occur once
 * each on the acknowledgements pages (:2419, :2407). The March section spent two of its eight
 * subsections, one misconception, six flashcards and its only Define practice on them, while four of
 * the five organisation types the specification actually lists were absent.
 */
ban(/\bsole trader/gi, '"sole trader" (0 occurrences in econ_spec.txt — UK GCE Business vocabulary)');
ban(/\b(?:un)?limited liability\b/gi, '"limited liability" (0 occurrences in econ_spec.txt)');
ban(/\bplc\b|\bLtd\b|\bprivate limited company\b|\bpublic limited company\b/gi, 'a UK company form (plc/Ltd — acknowledgements pages only in econ_spec.txt)');
/*
 * 3.3.2's vocabulary, kept out so the scope boundary holds. Long-run cost curves, minimum efficient
 * scale and the sources of internal and external economies are econ_spec.txt:1320-1345 and belong to
 * packet 28 (topFix-03, structure-04). "Fixed cost per unit" is taught here and is not the same thing.
 */
ban(/\b(?:dis)?economies of scale\b/gi, 'economies of scale (3.3.2 sub-topic 3, packet 28 — not a leaf of 3.3.1)');
ban(/\bminimum efficient scale\b|\bMES\b/g, 'minimum efficient scale (3.3.2 · 3b, packet 28)');
ban(/levels[- ]marked|levels[- ]based marking|banded mark|mark bands?/gi, 'a claim about how a response is MARKED — Appendix 6 states what the command word REQUIRES and nothing about marking (Layer 6 found eight; MARK_CLAIM reached none of them)');
ban(/\bthe commonest error\b|\bthe most common error\b/gi, 'a claim about what is commonest in scripts, which nobody cited');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|HS2|the Chancellor|Competition and Markets Authority)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(CMA|RPI|ONS|OBR)\b/g, 'a UK-only acronym (locale.institution) — topFix-05 asks for the regulator references to be internationalised');

for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert the same thing without
 * naming them — "that earns half the marks", "scores poorly", "will not earn full marks" — and pass
 * the validator untouched (packet 16's Layer 6 found thirteen). Say what the COMMAND WORD requires,
 * which Appendix 6 states and which can therefore be cited; not what a marker does with an answer,
 * which cannot. This is also the half of topFix-05 that is REFUSED: "describe levels-based marking"
 * asks for exactly the claim this regex exists to stop.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b/i;
/*
 * A stem's own tariff — "(4 marks)" — is a citation of Appendix 6, not a claim about a marker, and
 * leaving it in gives the regex a "marks" to pair with any nearby "cost". It is stripped before the
 * test; nothing else is. (Found by this runner on the Draw stem, which pairs "marginal cost" with the
 * tariff sixty characters later.)
 */
const TARIFF = /\(\s*\d+\s*marks?\s*\)/gi;
for (const s of texts) for (const sent of s.replace(TARIFF, '').split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

/*
 * Command words described in PROSE. The census check below reads PRACTICE items only, so an
 * examMatters that cites a tariff Appendix 6 does not give that command, or that enumerates the
 * assessment objectives and leaves one out, passes every other check in this file. Layer 6 found both:
 * an "Explain (6 marks)" and six Examines described as analysis when :2726-2731 requires evaluation
 * and a brief assessment, which is the whole difference between Examine (8) and Analyse (6).
 */
const LADDER = { Define: [2], Calculate: [2, 4], Draw: [4], Explain: [4], Analyse: [6], Examine: [8], Discuss: [14], Evaluate: [20] };
for (const s of texts) for (const m of s.matchAll(/\b(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\s*\((\d+)\s*marks?/g)) {
  if (!LADDER[m[1]].includes(Number(m[2]))) problems.push(`prose cites ${m[1]} (${m[2]} marks); the Economics ladder gives ${m[1]} ${LADDER[m[1]].join(' or ')}`);
}
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (/\bExamine \(8 marks/.test(sent) && !/evaluat|assessment|weigh/i.test(sent)) problems.push(`an Examine described without evaluation or assessment: "${sent.trim().slice(0, 90)}"`);
}

// Practice command words and tariffs against the specification's own Appendix 6, for ECONOMICS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}
for (const b of [B1, B2, B3, B4, B5, B6]) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-01: the 20-mark Evaluate never reached a student)`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
}

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). If a figure in the body changes and a diagram does not, these fail.
 */
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };
{ // 1 · the types table — every row of TYPE_ROWS actually reaches the grid, ON ITS OWN ROW
  /*
   * Read the emitted <text> elements back out and group them by their y, rather than asserting the
   * string the generator was about to write. A cell that drifts onto a neighbouring row is the one
   * failure a table can have that still looks well-formed.
   */
  const svg = DIAGRAMS[0].svg;
  const cells = [...svg.matchAll(/<text[^>]*\sy="([\d.]+)"[^>]*>([^<]*)<\/text>/g)]
    .reduce((m, [, y, s]) => { (m[y] ||= []).push(s); return m; }, {});
  TYPE_ROWS.forEach((row, i) => {
    const y = String(r2(TYPES_TBL.y0 + (i + 1) * TYPES_TBL.rowH));
    const onRow = cells[y] || [];
    for (const cell of row) if (!onRow.includes(cell)) problems.push(`the types table does not carry "${cell}" on the row for "${row[0]}" (y=${y})`);
    if (onRow.length !== row.length) problems.push(`the row for "${row[0]}" holds ${onRow.length} cells, not ${row.length}`);
  });
  if (TYPE_ROWS.length !== 6) problems.push(`the types table has ${TYPE_ROWS.length} rows; 1a's five bullets need six, because "for-profit and not-for-profit" is one bullet and two rows`);
  for (const w of ['For-profit', 'Not-for-profit']) if (!TYPE_ROWS.some((r) => r[0] === w)) problems.push(`the types table has no "${w}" row, and :1252 names both halves`);
  /*
   * At 390px a cell wider than its column runs into the next one, which every structural check passes
   * (Verify B found it on the four-column build). 9px DM Sans averages ~4.9 units a character, so a
   * cell is refused if it would cross into the column beside it.
   */
  const COLS = [[TYPES_TBL.x0 + 4, TYPES_TBL.colOwner], [TYPES_TBL.colOwner, TYPES_TBL.colSurplus], [TYPES_TBL.colSurplus, TYPES_TBL.x0 + TYPES_TBL.w]];
  for (const row of TYPE_ROWS) row.forEach((cell, ci) => {
    const room = COLS[ci][1] - COLS[ci][0] - 4;
    const wide = cell.length * 4.9;
    if (wide > room) problems.push(`"${cell}" needs ~${Math.round(wide)} units and its column gives ${room} — it will overlap the cell beside it at 390px`);
  });
}
{ // 2 · the size bars, from SIZE_FIRMS rather than drawn
  const svg = DIAGRAMS[1].svg;
  [['employees', 0], ['capital', 1]].forEach(([k, gi]) => SIZE_FIRMS.forEach((f, fi) => {
    has(svg, `y="${sizeBarY(gi, fi)}" width="${sizeBarW(k, f[k])}"`, `${f.name}'s ${k} bar is not drawn at the width its figure gives`);
    has(svg, `>${f[k]}${k === 'capital' ? ' $m' : ''}</text>`, `${f.name}'s ${k} figure is not printed beside its bar with its unit`);
  }));
  if (!measuresDisagree()) problems.push('the two size measures rank the firms the same way, so the diagram makes no point');
}
{ // 3 · the integration map — all four directions named
  const svg = DIAGRAMS[2].svg;
  for (const d of ['Backward vertical', 'Forward vertical', 'Horizontal', 'Conglomerate']) has(svg, `>${d}<`, `the integration map does not label "${d}"`);
  for (const stage of ['Coffee farms', 'Roastery', 'Cafés']) has(svg, `>${stage}<`, `the integration map has no "${stage}" stage`);
}
{ // 4 · the demerger panel — both routes, and the distinction stated on each
  const svg = DIAGRAMS[3].svg;
  has(svg, 'DEMERGER — nobody buys it', 'the demerger row is not labelled as the one with no buyer');
  has(svg, 'DIVESTMENT — somebody buys it', 'the divestment row is not labelled as the one with a buyer');
  has(svg, '>Company A<', 'the demerger does not produce a separately named company');
  if ((svg.match(/Group: A \+ B/g) || []).length !== 2) problems.push('the two routes do not start from the same combined group');
}
{ // 5 · the objectives diagram, every point sampled from the four functions
  const svg = DIAGRAMS[4].svg;
  has(svg, `x1="${OX(0)}" y1="${OY(arAt(0))}" x2="${OX(OQ.qMax)}" y2="${OY(arAt(OQ.qMax))}"`, `AR is not drawn between the two ends P = ${A} − ${B}Q gives`);
  has(svg, `x1="${OX(0)}" y1="${OY(mrAt(0))}" x2="${OX(Q_REVENUE)}" y2="${OY(0)}"`, `MR does not run from ${A} to zero at ${units(Q_REVENUE)}`);
  has(svg, `x1="${OX(0)}" y1="${OY(MC)}" x2="${OX(OQ.qMax)}" y2="${OY(MC)}"`, `MC is not drawn as the constant ${price(MC)}`);
  for (const o of OBJECTIVES) has(svg, `cx="${OX(o.q)}" cy="${OY(arAt(o.q))}"`, `${o.name} is not marked at ${units(o.q)} and ${price(arAt(o.q))}`);
  for (const o of OBJECTIVES) has(svg, `>${o.formula}</text>`, `the diagram does not name the formula ${o.formula}`);
  // every value a practice item reads off this diagram has to be printed on it
  for (const v of [arAt(Q_PROFIT), arAt(Q_REVENUE), arAt(Q_VOLUME), MC]) has(svg, `>${price(v)}</text>`, `the diagram does not print ${price(v)} on its price axis`);
  // the AC polyline is sampled, so check it against the function rather than against a drawing
  const pts = (svg.match(/<polyline points="([^"]+)"/) || [])[1].split(' ').map((pair) => pair.split(',').map(Number));
  if (pts.length !== AC_SAMPLES.length) problems.push(`the AC curve has ${pts.length} samples, not the ${AC_SAMPLES.length} AC_SAMPLES gives`);
  AC_SAMPLES.forEach((q, i) => { if (Math.abs(pts[i][0] - OX(q)) > 0.02 || Math.abs(pts[i][1] - OY(acAt(q))) > 0.02) problems.push(`the AC curve's sample at Q=${q} is not at ${price(acAt(q))}`); });
  if (pts.some((p, i) => i && p[1] < pts[i - 1][1])) problems.push('the AC curve does not fall from left to right, which MC + FIXED/Q requires');
  if (OY(A) >= OY(0)) problems.push('the price axis is inverted: a higher price must be drawn higher');
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Imani's figures are the same figures wherever they appear.
const must = [units(Q_PROFIT), units(Q_REVENUE), units(Q_VOLUME), price(arAt(Q_PROFIT)), price(arAt(Q_REVENUE)), price(arAt(Q_VOLUME)), total(profitAt(Q_PROFIT)), total(trAt(Q_REVENUE)), price(MC), total(FIXED)];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// and the arithmetic itself, recomputed here rather than trusted
if (mrAt(Q_PROFIT) !== MC) problems.push(`MC = MR does not hold at ${units(Q_PROFIT)}: MR is ${mrAt(Q_PROFIT)} and MC is ${MC}`);
if (mrAt(Q_REVENUE) !== 0) problems.push(`MR is ${mrAt(Q_REVENUE)} at ${units(Q_REVENUE)}, not zero`);
if (Math.abs(arAt(Q_VOLUME) - acAt(Q_VOLUME)) > 1e-9) problems.push(`AR (${arAt(Q_VOLUME)}) does not equal AC (${acAt(Q_VOLUME)}) at ${units(Q_VOLUME)}`);
if (Math.abs(profitAt(Q_VOLUME)) > 1e-9) problems.push('sales volume maximisation does not leave zero profit, which AR = AC requires');
if (!(Q_PROFIT < Q_REVENUE && Q_REVENUE < Q_VOLUME)) problems.push('the three objectives are not in increasing order of output, which is the section\'s central comparison');
if (!(profitAt(Q_PROFIT) > profitAt(Q_REVENUE) && profitAt(Q_REVENUE) > profitAt(Q_VOLUME))) problems.push('profit does not fall as the objective moves from profit to revenue to volume');
if (!(trAt(Q_REVENUE) > trAt(Q_PROFIT) && trAt(Q_REVENUE) > trAt(Q_VOLUME))) problems.push('revenue does not peak at the revenue-maximising output, so MR = 0 is not where it is claimed');
if (trAt(Q_VOLUME) >= trAt(Q_REVENUE)) problems.push('selling the most units also earns the most revenue here, which destroys the chapter\'s central distinction');
for (const q of [Q_PROFIT, Q_REVENUE, Q_VOLUME]) if (!Number.isInteger(q)) problems.push(`objective output ${q} is not a whole number, so the arithmetic will not read cleanly`);
if (!Number.isInteger(Q_BREAKEVEN_LOW) || Q_BREAKEVEN_LOW >= Q_PROFIT) problems.push('the lower break-even root is not a clean figure below the profit-maximising output');
for (const q of [Q_PROFIT, Q_REVENUE, Q_VOLUME]) if (trAt(q) !== q * arAt(q) || tcAt(q) !== MC * q + FIXED) problems.push(`the revenue or cost function disagrees with itself at Q=${q}`);

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 20 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`${FIRM}: ${OBJECTIVES.map((o) => `${o.formula} → ${units(o.q)} @ ${price(arAt(o.q))} (profit ${total(profitAt(o.q))})`).join('  ·  ')}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(38)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no Outline or Assess, no UK company-law vocabulary, no economies of scale (3.3.2), no UK-only institution, no uncited examiner claim, no marker claim, no paper-frequency claim, every practice tariff in the Economics census, every block pinned to a quiz and a practice item, every diagram figure re-derived from the four functions, ids unique, Imani\'s figures agreeing across every surface');

const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx).findings;
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
console.log(`\nvalidator: before ${before.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${before.filter((f) => f.tier === 'DEBT').length} DEBT → after ${after.summary.block} BLOCK / ${after.summary.debt} DEBT; ${cleared.length} baselined findings cleared, ${carried.length} carried, ${newBlocks.length} new BLOCK, ${newDebt.length} new DEBT`);
for (const f of newBlocks) console.log(`  NEW BLOCK  ${f.rule.padEnd(24)} ${f.detail}`);
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 160)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 160)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-20-bundle__economics__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-20-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
