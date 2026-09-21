#!/usr/bin/env node
/**
 * PACKET 18 — the-market, the Business section on demand, supply and the two elasticities.
 *
 *   node scripts/packet-18-the-market.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-18-the-market.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-18-the-market.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet18-content.mjs (blocks and Notes), scripts/_packet18-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet18-diagrams.mjs (the five diagrams this
 * section has never had). This file assembles the bundle, pins each block to its diagram, quiz and
 * practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - THE WORDS THIS SECTION MAY NOT USE, which is the largest single risk in this packet. Business
 *     1.3.2 is the Economics 1.3.4/1.3.2 material in a different subject with a different vocabulary,
 *     and the March section was written in the Economics one. "Equilibrium" is absent from the entire
 *     Business specification (0 occurrences against 12 in econ_spec.txt), as are "excess demand",
 *     "excess supply", "market clearing", "movement along", "contraction" and "price elasticity of
 *     supply". Each is banned outright on every ASSESSMENT surface, and allowed in the teaching text
 *     only where the section is explicitly telling a student that the word belongs to another course;
 *     the runner checks the location, not just the count;
 *   - every practice command word and tariff against audit/raw/tariff-census.json FOR BUSINESS —
 *     Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8, Assess 10, Evaluate 20;
 *   - claims about what a marker does, how often a paper asks and how papers are built (packet 17);
 *   - every diagram figure re-derived from Qd = 900 − 30P and Qs = 100 + 20P by reading the emitted
 *     SVG back, so a figure that changes in the body and not in a diagram fails here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, pc, sig, minus, pedS, qdAt, qsAt, trAt, ped, pctQ, pctP, MEET_P, MEET_Q, PEAK_P, PEAK_Q, MAX_TR, CHOKE_P, PRICES, D_INTERCEPT, D_SLOPE, S_INTERCEPT, S_SLOPE, PED_INELASTIC, PED_ELASTIC, PED_UNIT, INCOME_RISE, PRESSE_Q, WATER_Q, MIX_Q, pctOf, YED_PRESSE, YED_WATER, YED_MIX } from './_packet18-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5 } from './_packet18-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet18-assessment.mjs';
import { DIAGRAMS, DX, DY, PQ, qd2At, qs2At, MEET_D2, MEET_S2, D_SHIFT, S_SHIFT, r2 } from './_packet18-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a signed-out student is sent only
 * PREVIEW_LIMITS.quiz items (F086), so a pre-test whose pool sits at the end of the array serves that
 * student PINNED questions instead (packet 16's walkthrough).
 */
const unpinned = new Set(QUIZ.map((q, i) => (q.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Which of these is a factor leading to a change in demand named in the specification?'),
  [B2]: first(quizByBlock[B2], 'Which of these shifts the supply curve to the right?'),
  [B3]: first(quizByBlock[B3], 'A market shows a rising price alongside a falling quantity traded. The cause was most likely:'),
  [B4]: first(quizByBlock[B4], 'Demand for a product has a price elasticity of demand of −2.5. A rise in its price will:'),
  [B5]: first(quizByBlock[B5], 'Why might a business deliberately keep an inferior good in its range?'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5],
};
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why the March `diagramRef` strings
 * "demand-curve", "supply-curve" and "equilibrium-diagram" rendered nothing even before you notice
 * that no diagram of any name existed (structure-01, diagram-01 to -03). Every chapter has one here,
 * because 3b asks for demand and supply diagrams in as many words.
 */
const diagramIds = {
  [B1]: DIAGRAMS[0].id, [B2]: DIAGRAMS[1].id, [B3]: DIAGRAMS[2].id,
  [B4]: DIAGRAMS[3].id, [B5]: DIAGRAMS[4].id,
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
/*
 * Ids are excluded from every text check. Eight March subsection ids are kept because progress rows
 * point at them (the packet-13 rule), and one of them is literally `…:sub:equilibrium-price-and-
 * quantity` — a slug from when the section was written in the Economics vocabulary. Renaming it would
 * orphan a student's progress; scanning it as if it were prose reports a word no reader ever sees.
 */
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€/g, 'a currency other than dollars (locale.currency; one currency per section)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the live practice.command BLOCK)');
ban(/\bExamine\b/g, '"Examine" (an IAL Economics command word; Business has none)');
ban(/\bprice elasticity of supply\b|\bPES\b/gi, 'price elasticity of supply (0 occurrences in bus_spec.txt — quiz-02)');
ban(/\bmovement along\b/gi, '"movement along" (0 occurrences in bus_spec.txt; UK GCE vocabulary — specGap-06)');
ban(/\bcontraction\b/gi, '"contraction" (0 occurrences in bus_spec.txt — specGap-06)');
ban(/\bextension in (?:quantity )?demand\b/gi, '"extension in demand" (bus_spec.txt uses "extension" only of product life-cycle strategies, 1.3.3)');
ban(/\bprice skimming\b|\bpenetration pricing\b/gi, 'a pricing strategy from 1.3.3 (bus_spec.txt:649-650 — specGap-04 asked for it and it belongs to marketing-mix-strategy)');
ban(/\bmarket research\b|\bmarket segmentation\b/gi, 'material from 1.3.1 (the March extras chains were the wrong section — structure-04)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|HS2|the Chancellor|Competition and Markets Authority)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(CMA|RPI|ONS|OBR)\b/g, 'a UK-only acronym (locale.institution)');
/*
 * Layer 6 found the class, and the class is the point: two practice items explained their own tariff
 * by saying what "the March version of this item" had asked for. That is a note about this
 * programme's previous content sitting in text a student reads, and the reviewer took it for a claim
 * about a past paper — which is exactly how a student would take it. Provenance belongs in this
 * packet's files, never in guidance.
 */
ban(/\bthe March (version|section|copy|item|content)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/*
 * THE CROSS-SUBJECT VOCABULARY CHECK, which is this packet's own rule rather than an inherited one.
 * "Equilibrium" and the shortage/surplus vocabulary around it are Economics 1.3.4's, and every one of
 * them returns zero hits in bus_spec.txt. They are not banned outright, because a student who has met
 * them elsewhere is better served by being told where they belong than by never seeing them — but
 * they are allowed ONLY where the section says so, and never anywhere a student is assessed.
 */
const OTHER_SUBJECT = [
  [/\bequilibri\w*/gi, 'equilibrium', /textbook/i],
  [/\bexcess (?:demand|supply)\b/gi, 'excess demand / excess supply', /language of the question|another course|from Economics/i],
  [/\bmarket clearing\b/gi, 'market clearing', /language of the question|another course|from Economics/i],
];
const ASSESSED = allStrings([bundle.quiz, bundle.practice, bundle.flashcards, bundle.content.flatMap((b) => b.sections.map((s) => s.recall))]).filter((s) => !IDLIKE.test(s));
for (const [re, label, allowedIn] of OTHER_SUBJECT) {
  for (const s of ASSESSED) if (re.test(s)) problems.push(`"${label}" appears on an ASSESSED surface, and it is not in the Business specification: "${String(s).slice(0, 90)}"`);
  for (const s of texts) for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
    if (new RegExp(re.source, 'i').test(sent) && !allowedIn.test(sent)) problems.push(`"${label}" used as if it were this specification's word: "${sent.trim().slice(0, 90)}"`);
  }
}

for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert exactly the same thing
 * without naming them — "that earns half the marks", "scores poorly", "will not earn full marks" — and
 * pass the validator untouched (packet 16). Say what the COMMAND WORD requires, which Appendix 6
 * states and which can therefore be cited; do not say what a marker does with an answer.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

// Practice command words and tariffs against the specification's own Appendix 6, for BUSINESS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Business command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}
for (const b of [B1, B2, B3, B4, B5]) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned, and 3b asks for demand and supply diagrams`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). If a figure in the body changes and a diagram does not, these fail.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };
const onCurve = (svg, q, p, why) => has(svg, `${DX(q)},${DY(p)}`, why);

{ // 1 · the demand line and its marked points, from Qd = 900 − 30P
  const [priced, shifted] = svgOf(DIAGRAMS[0]);
  onCurve(priced, qdAt(0), 0, `the demand line does not start where Qd = ${D_INTERCEPT} − ${D_SLOPE}P puts it at a price of zero`);
  onCurve(priced, qdAt(CHOKE_P), CHOKE_P, `the demand line does not reach zero cases at ${money(CHOKE_P)}`);
  for (const p of [10, 20]) has(priced, `cx="${DX(qdAt(p))}" cy="${DY(p)}"`, `the point at ${money(p)} is not plotted at the ${qdAt(p)} cases the schedule gives`);
  onCurve(shifted, qdAt(0), 0, 'D₁ on the shift view is not the same line as the curve on the price view');
  onCurve(shifted, qd2At(0), 0, `D₂ is not drawn ${D_SHIFT} cases to the right of D₁ at a price of zero`);
  has(shifted, `cx="${DX(qd2At(16))}" cy="${DY(16)}"`, `the new quantity at ${money(16)} is not marked at ${qd2At(16)} cases`);
  if (DY(CHOKE_P) >= DY(0)) problems.push('the price axis is inverted: a higher price must be drawn higher');
}
{ // 2 · the supply line, from Qs = 100 + 20P
  const [sloped, shifted] = svgOf(DIAGRAMS[1]);
  onCurve(sloped, qsAt(0), 0, `the supply line does not start where Qs = ${S_INTERCEPT} + ${S_SLOPE}P puts it at a price of zero`);
  onCurve(sloped, qsAt(CHOKE_P), CHOKE_P, `the supply line does not reach ${qsAt(CHOKE_P)} cases at ${money(CHOKE_P)}`);
  for (const p of [10, 20]) has(sloped, `cx="${DX(qsAt(p))}" cy="${DY(p)}"`, `the supply point at ${money(p)} is not plotted at ${qsAt(p)} cases`);
  if (DX(qsAt(20)) <= DX(qsAt(10))) problems.push('the supply line does not slope upward: a higher price must offer more');
  onCurve(shifted, qs2At(CHOKE_P), CHOKE_P, `S₂ is not drawn ${Math.abs(S_SHIFT)} cases to the left of S₁`);
}
{ // 3 · the two lines together, and the two shifts — this is requirement 3b
  const [both, dUp, sDown] = svgOf(DIAGRAMS[2]);
  has(both, `cx="${DX(MEET_Q)}" cy="${DY(MEET_P)}"`, `the point where the two lines meet is not plotted at ${MEET_Q} cases and ${money(MEET_P)}`);
  onCurve(both, qdAt(MEET_P), MEET_P, 'the demand line does not pass through the point the two schedules share');
  onCurve(both, qsAt(MEET_P), MEET_P, 'the supply line does not pass through the point the two schedules share');
  has(dUp, `cx="${DX(MEET_D2[1])}" cy="${DY(MEET_D2[0])}"`, `the new point after the demand increase is not at ${MEET_D2[1]} cases and ${money(MEET_D2[0])}`);
  has(sDown, `cx="${DX(MEET_S2[1])}" cy="${DY(MEET_S2[0])}"`, `the new point after the supply decrease is not at ${MEET_S2[1]} cases and ${money(MEET_S2[0])}`);
  if (!(MEET_D2[0] > MEET_P && MEET_D2[1] > MEET_Q)) problems.push('the demand increase does not raise BOTH price and quantity, which is the pattern the chapter teaches');
  if (!(MEET_S2[0] > MEET_P && MEET_S2[1] < MEET_Q)) problems.push('the supply decrease does not raise price and lower quantity, which is the pattern that distinguishes it');
}
{ // 4 · the three PED tables, every cell generated from the demand function
  const [schedule, worked, revenue] = svgOf(DIAGRAMS[3]);
  for (const p of PRICES) {
    has(schedule, `>${money(p)}</text>`, `the schedule has no ${money(p)} row`);
    has(schedule, `>${qdAt(p)} cases</text>`, `the schedule does not print ${qdAt(p)} cases for ${money(p)}`);
    has(schedule, `>${money(trAt(p))}</text>`, `the schedule does not print ${money(trAt(p))} of revenue for ${money(p)}`);
  }
  for (const [a, b] of [PED_INELASTIC, PED_UNIT, PED_ELASTIC]) {
    has(worked, `>${money(a)} → ${money(b)}</text>`, `the worked table has no ${money(a)} → ${money(b)} row`);
    has(worked, `>${pedS(a, b)}</text>`, `the worked table does not print a PED of ${ped(a, b)} for ${money(a)} → ${money(b)}`);
    has(worked, `>${pc(pctQ(a, b))}</text>`, `the worked table does not print the ${pc(pctQ(a, b))} quantity change for ${money(a)} → ${money(b)}`);
    if (!PRICES.includes(a) || !PRICES.includes(b)) { /* the end price need not be a schedule row */ }
    if (!PRICES.includes(a)) problems.push(`a PED example starts from ${money(a)}, which the schedule does not have a row for`);
  }
  has(revenue, `>${money(trAt(PED_INELASTIC[0]))} → ${money(trAt(PED_INELASTIC[1]))} ▲</text>`, 'the revenue table does not show revenue RISING across the price inelastic range');
  has(revenue, `>${money(trAt(PED_ELASTIC[0]))} → ${money(trAt(PED_ELASTIC[1]))} ▼</text>`, 'the revenue table does not show revenue FALLING across the price elastic range');
  // Layer 6: the unitary row showed revenue falling beside the word "unitary", which reads as "unitary
  // demand means revenue falls" rather than "$15 is the maximum and any move leaves it". The cell has
  // to name the peak, and the peak has to be the row the unitary example starts from.
  has(revenue, `>${money(trAt(PEAK_P))} is the peak`, 'the unitary row does not say that its starting revenue IS the peak');
  if (trAt(PED_UNIT[0]) !== MAX_TR) problems.push('the unitary example does not start at the revenue-maximising price, so the row cannot claim a peak');
}
{ // 5 · the YED table and number line, from the elasticity values themselves
  const [table, numberLine] = svgOf(DIAGRAMS[4]);
  for (const [pair, v] of [[PRESSE_Q, YED_PRESSE()], [WATER_Q, YED_WATER()], [MIX_Q, YED_MIX()]]) {
    has(table, `>${pair[0]} → ${pair[1]}</text>`, `the YED table has no ${pair[0]} → ${pair[1]} row`);
    has(table, `>${sig(v)}</text>`, `the YED table does not print a value of ${sig(v)}`);
    has(numberLine, `>${sig(v)}</text>`, `the number line does not mark ${sig(v)}`);
  }
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Maji's figures are the same figures wherever they appear.
const must = [money(MEET_P), `${MEET_Q}`, money(MAX_TR), pedS(...PED_INELASTIC), pedS(...PED_ELASTIC), money(trAt(PED_INELASTIC[1])), sig(YED_PRESSE()), sig(YED_MIX())];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// and the arithmetic itself, recomputed here rather than trusted
for (const p of PRICES) if (qdAt(p) !== D_INTERCEPT - D_SLOPE * p) problems.push(`qdAt(${p}) disagrees with Qd = ${D_INTERCEPT} − ${D_SLOPE}P`);
for (const p of PRICES) if (qsAt(p) !== S_INTERCEPT + S_SLOPE * p) problems.push(`qsAt(${p}) disagrees with Qs = ${S_INTERCEPT} + ${S_SLOPE}P`);
for (const p of PRICES) if (trAt(p) !== p * qdAt(p)) problems.push(`trAt(${p}) is not price × quantity demanded`);
if (qdAt(MEET_P) !== qsAt(MEET_P)) problems.push(`the two schedules do not give the same quantity at ${money(MEET_P)}`);
if (qdAt(MEET_P) !== MEET_Q) problems.push('MEET_Q is not the quantity the schedules actually share');
if (PRICES.some((p) => trAt(p) > MAX_TR)) problems.push('a price in the table beats the revenue peak, so PEAK_P is not where revenue is highest');
if (trAt(PEAK_P) !== MAX_TR || qdAt(PEAK_P) !== PEAK_Q) problems.push('the revenue peak constants disagree with the demand function');
if (Math.abs(ped(...PED_UNIT)) !== 1) problems.push('the range called unitary does not have a PED of 1 in size');
if (Math.abs(ped(...PED_INELASTIC)) >= 1) problems.push('the range called price inelastic has a PED of 1 or more in size');
if (Math.abs(ped(...PED_ELASTIC)) <= 1) problems.push('the range called price elastic has a PED of 1 or less in size');
if (trAt(PED_INELASTIC[1]) <= trAt(PED_INELASTIC[0])) problems.push('revenue does not rise across the price inelastic range, which is what price inelastic demand means');
if (trAt(PED_ELASTIC[1]) >= trAt(PED_ELASTIC[0])) problems.push('revenue does not fall across the price elastic range, which is what price elastic demand means');
if (PEAK_P !== PED_UNIT[0]) problems.push('the price where revenue peaks is not the price the unitary example starts from, so 4b and 4e are not the same fact');
if (YED_PRESSE() <= 1) problems.push('the income elastic product does not have a YED above 1');
if (YED_WATER() <= 0 || YED_WATER() >= 1) problems.push('the income inelastic product is not between 0 and 1');
if (YED_MIX() >= 0) problems.push('the inferior good does not have a negative YED');
for (const [pair, v] of [[PRESSE_Q, YED_PRESSE()], [WATER_Q, YED_WATER()], [MIX_Q, YED_MIX()]]) {
  if (Math.round((pctOf(pair) / INCOME_RISE) * 100) / 100 !== v) problems.push(`the YED for ${pair[0]} → ${pair[1]} disagrees with its own percentages`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 18 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`the market: Qd = ${D_INTERCEPT} − ${D_SLOPE}P, Qs = ${S_INTERCEPT} + ${S_SLOPE}P, meeting at ${money(MEET_P)} / ${MEET_Q} cases`);
console.log(`  schedule: ${PRICES.map((p) => `${money(p)}→${qdAt(p)} (${money(trAt(p))})`).join('  ')}`);
console.log(`  PED from ${money(PED_INELASTIC[0])} ${ped(...PED_INELASTIC)} · from ${money(PED_UNIT[0])} ${ped(...PED_UNIT)} · from ${money(PED_ELASTIC[0])} ${ped(...PED_ELASTIC)} · revenue peaks ${money(MAX_TR)} at ${money(PEAK_P)}`);
console.log(`  YED at ${pc(INCOME_RISE)} income: pressé ${sig(YED_PRESSE())} · water ${sig(YED_WATER())} · mix ${sig(YED_MIX())}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(30)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 72)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: one currency, no Outline or Examine, no price elasticity of supply, no "movement along"/"contraction", no 1.3.3 pricing strategies, no 1.3.1 material, no UK-only institution, no uncited examiner or marker or paper claim, "equilibrium" nowhere a student is assessed and only where the section says it belongs to another course, every practice tariff in the BUSINESS census, every block pinned to a quiz, a practice item and a diagram, every diagram figure re-derived from the two schedules, ids unique, Maji\'s figures agreeing across every surface');

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

if (DUMP) { const p = `audit/snapshots/packet-18-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-18-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
