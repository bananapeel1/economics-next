#!/usr/bin/env node
/**
 * PACKET 21 — measures-economic-performance, the Economics Unit 2 section on GDP, inflation,
 * unemployment and the balance of payments.
 *
 *   node scripts/packet-21-measures-economic-performance.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-21-measures-economic-performance.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-21-measures-economic-performance.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet21-content.mjs (blocks and Notes), scripts/_packet21-assessment.mjs
 * (quiz, practice, flashcards, mistakes, extras) and scripts/_packet21-diagrams.mjs (ten diagrams,
 * where the section had two and showed a student neither). This file assembles the bundle, pins each
 * block to its diagram, quiz and practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline. The live section
 *     is the worst in the repository at 56 BLOCK / 89 DEBT / 88%;
 *   - the reading budget per subsection (step.words, 350), printed for every one of the 45;
 *   - THE WORDS THIS SECTION MAY NOT USE, which is the largest single risk in this packet and the
 *     fifth instance of the packet 13/16/17/18 rule. A QUARTER of the March section taught material
 *     that is not in topic 2.3.1, and one whole block taught material that is nowhere in the
 *     Economics specification at all: "expenditure method", "income method", "output method" and
 *     "value added" are each ZERO occurrences in econ_spec.txt, as are RPI, CPIH, substitution bias,
 *     liquidity trap, fiscal drag and interconnectedness. HDI is 4.3.6 and quantitative easing is
 *     4.3.3 — both Unit 4. Phillips curves are 2.3.6 and output gaps 2.3.5, which are other sections
 *     of this same unit. Nothing in the validator can see any of it: `terms.off-spec` carries six
 *     named phrases and none of these is one of them, and lexical coverage scored the section 88%
 *     while a quarter of it taught another syllabus;
 *   - every practice command word and tariff against audit/raw/tariff-census.json FOR ECONOMICS —
 *     Define 2, Calculate 2/4, Draw 4, Explain 4, Analyse 6, Examine 8, Discuss 14, Evaluate 20.
 *     There is no Assess and no 10-mark tariff in this subject, and the live section used both;
 *   - claims about what a marker does, how often a paper asks and how papers are built (packet 17),
 *     plus the sixteen live `claim.uncited` BLOCKs, which were all "Examiners expect…";
 *   - EVERY FIGURE RE-DERIVED FROM ANDARA'S OWN INPUTS, and every diagram figure re-derived from the
 *     emitted SVG by reading it back, so a figure that changes in the body and not in a diagram
 *     fails here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, teachingWords, money, bn, pc, rate, idx, minus, r2,
  NOMINAL, GDP_INDEX, POP, realAt, perCapitaAt, realGrowth, nominalGrowth, perCapitaGrowth,
  OIL, oilValue, OIL_VOLUME_CHANGE, OIL_VALUE_CHANGE,
  BASKET, HOUSEHOLD_BASKET, weighted, weightSum, indexOf, CPI, CPI_HOUSEHOLD, INFLATION,
  INFLATION_HOUSEHOLD, CPI_SERIES, INFLATION_Y3, PPI, PPI_CHANGE, SAVINGS, SAVINGS_RATE,
  savingsNominal, savingsReal,
  WORKING_AGE, EMPLOYED, UNEMPLOYED, LABOUR_FORCE, INACTIVE, UNDEREMPLOYED,
  unemploymentRate, employmentRate, inactivityRate,
  MIGRATION, mWorkingAge, mLabourForce, mEmployed, mUnemployed, mUnemploymentRate,
  BOP, tradeInGoodsAndServices, currentAccount,
} from './_packet21-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7, B8, B9, B10 } from './_packet21-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet21-assessment.mjs';
import {
  DIAGRAMS, QUARTERS, PPP_ROWS, atMarket, atPPP,
  BASE, DEMAND_PULL, COST_PUSH, AD_FALL, AS_RISE,
  LAB_MEET, WAGE_FLOOR, FLOOR_DEMAND, FLOOR_SUPPLY, FLOOR_GAP, PPF_INSIDE, PPF_ON,
} from './_packet21-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10];

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
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question.includes(q)); if (i < 0) throw new Error(`no quiz item matching "${q}"`); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Gross National Income differs'),
  [B2]: first(quizByBlock[B2], 'A recession is defined by the specification as'),
  [B3]: first(quizByBlock[B3], 'previously done unpaid at home'),
  [B4]: first(quizByBlock[B4], 'The consumer price index is'),
  [B5]: first(quizByBlock[B5], 'rising price level alongside falling real output'),
  [B6]: first(quizByBlock[B6], 'Unexpected inflation moves real income towards'),
  [B7]: first(quizByBlock[B7], 'The unemployment rate is'),
  [B8]: first(quizByBlock[B8], 'unfilled vacancies requiring skills'),
  [B9]: first(quizByBlock[B9], 'production possibility frontier diagram'),
  [B10]: first(quizByBlock[B10], 'The current account of the balance of payments records'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why the March `diagramRef` string
 * "Demand-Pull and Cost-Push Inflation" rendered nothing even before you notice that no diagram of
 * that name existed (structure-02, diagram-01, and the live `pins.diagram` BLOCK). Every chapter has
 * one here. The section asks for two drawn diagrams by name — 2e/2f need the price level against real
 * output, and 3c-5 names the production possibility frontier — and both are in this list.
 */
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

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
// Ids are excluded from every text check; fifteen March subsection slugs are kept because progress
// rows point at them, and scanning a slug as if it were prose reports a word no reader ever sees.
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
// The SVG source is excluded from the prose scans and checked separately: its attribute names and
// colour values are not sentences, and a `<text>` element is read back by the geometry checks below.
const prose = texts.filter((s) => !s.startsWith('<svg'));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€|¥/g, 'a currency other than dollars (locale.currency; the live section mixed GBP and USD)');

/*
 * OFF-SPEC VOCABULARY, each with the count that settles it. These are not stylistic preferences: a
 * student who learns a word here writes it in an answer, and none of these words appears in the
 * document the answer is marked against.
 */
ban(/\b(expenditure|income|output)\s+method\b/gi, 'a GDP measurement method (0 occurrences in econ_spec.txt; the March block 1 was UK GCE material end to end)');
ban(/\b(gross\s+)?value added\b/gi, '"value added" (0 occurrences in econ_spec.txt)');
ban(/\bRPI\b|\bretail price\b/gi, 'RPI (0 occurrences in econ_spec.txt; a UK measure, and the live section carried a whole subsection of it)');
ban(/\bCPIH\b/gi, 'CPIH (0 occurrences in econ_spec.txt — quiz-01 turned on it and had it backwards)');
ban(/\bHDI\b|\bhuman development\b/gi, 'the Human Development Index (econ_spec.txt:1904-1907, topic 4.3.6 — Unit 4, not this unit)');
ban(/\bquantitative easing\b/gi, 'quantitative easing (econ_spec.txt:1725, topic 4.3.3 — Unit 4)');
ban(/\bliquidity trap\b/gi, 'the liquidity trap (0 occurrences in econ_spec.txt)');
ban(/\bsubstitution bias\b/gi, 'substitution bias (0 occurrences in econ_spec.txt — specGap-03 named it and 2c supplies no such vocabulary)');
ban(/\bfiscal drag\b/gi, 'fiscal drag (0 occurrences in econ_spec.txt — specGap-04 named it)');
ban(/\binterconnectedness\b/gi, 'interconnectedness (0 occurrences in econ_spec.txt — specGap-08 asked for it and it is not in 2.3.1)');
ban(/\bGDP deflator\b/gi, 'the GDP deflator (0 occurrences in econ_spec.txt; two March quiz items tested its formula)');
ban(/\bclaimant count\b/gi, 'the claimant count (0 occurrences in econ_spec.txt; 3a names the ILO definition)');
ban(/\bhyperinflation\b|\bstagflation\b|\bmisery index\b/gi, 'a term the specification does not use (0 occurrences each)');
ban(/\bnatural rate\b/gi, '"natural rate" (0 occurrences in econ_spec.txt)');
ban(/\bPhillips\b/gi, 'the Phillips curve (econ_spec.txt:1143, topic 2.3.6 — another section of this unit)');
ban(/\boutput gaps?\b/gi, 'output gaps (econ_spec.txt:1121-1125, topic 2.3.5 — another section of this unit)');
/*
 * TWO TERMS THAT MAY BE NAMED AND MAY NOT BE TAUGHT, so the check is on the SENTENCE rather than the
 * count. "Exchange rate" is 4.3.3 and is the live section's one `terms.later-unit` hit, but 1e cannot
 * introduce a purchasing power parity without saying what it is not. The capital and financial
 * accounts are 4.3.3 too, and 4a asks for the components of the balance of payments by name, so they
 * have to appear in a list of three and nowhere else. Each is allowed only in a sentence that marks
 * it as a boundary — which is what the March section did not do, and why a whole subsection of
 * Unit 4 policy ended up inside a Unit 2 chapter.
 */
const BOUNDED = [
  // Allowed only in a sentence that is distinguishing a PPP from a market rate, which is what 1e asks.
  [/\bexchange rates?\b/i, 'exchange rate', /purchasing power parit|\bPPP\b|market (exchange )?rate|what the (money|currency) (actually )?buys|trades? for|convert/i],
  // Allowed only in a sentence that places them against the current account or the balance of
  // payments as a whole, which is the only thing 4a asks for. A sentence that taught what either
  // account does, without that framing, would be teaching 4.3.3 inside a Unit 2 chapter.
  [/\b(capital|financial) accounts?\b/i, 'the capital or financial account', /current account|balance of payments|Unit 4|studied in/i],
];
for (const [re, label, allowedIn] of BOUNDED) {
  for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
    if (re.test(sent) && !allowedIn.test(sent)) problems.push(`"${label}" used as this chapter's own material rather than as a boundary: "${sent.trim().slice(0, 90)}"`);
  }
}

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — a live practice.command BLOCK)');
ban(/\bAssess\b/g, '"Assess" (not an IAL ECONOMICS command word at any tariff — the other live practice.command BLOCK)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|furlough|the Chancellor|Office for National Statistics)\b/g, 'a UK-only institution (locale.institution; the live section carried six)');
ban(/\b(ONS|OBR|DWP)\b/g, 'a UK-only acronym (locale.institution)');
/*
 * Packet 18's Layer 6 finding, and the class is the point: two practice items explained their own
 * tariff by saying what "the March version of this item" had asked for, and the reviewer took it for
 * a claim about a past paper — which is how a student would take it too. Provenance belongs in this
 * packet's files, never in text a student reads.
 */
ban(/\bthe March (version|section|copy|item|content)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/*
 * NO DATED CLAIM ABOUT A REAL ECONOMY. topFix-05 lists six the March section made — the US current
 * account "every year since 1982", a 2023 index gap, a rail-fare claim, an unverified 2024 basket,
 * 2021-22 US inflation and the 1930s New Deal — and nothing in this repository could check any of
 * them. They are removed rather than corrected, and this refuses their shape: a four-digit year
 * anywhere in text a student reads.
 */
const YEAR_CLAIM = /\b(19|20)\d{2}\b/;
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (YEAR_CLAIM.test(sent)) problems.push(`a dated claim about a real economy: "${sent.trim().slice(0, 90)}"`);

/*
 * NO REAL COUNTRY IS NAMED. The live section framed the topic in the UK — 42 UK-framed mentions
 * against 28 from anywhere else — and topFix-03 asks for Asian and Middle-East examples instead.
 * Swapping one country for another swaps one unverifiable claim for another; Andara carries the
 * arithmetic and the few real illustrations name no country at all.
 */
const COUNTRY = /\b(the UK|Britain|the United Kingdom|England|the US|the USA|the United States|America|China|Japan|India|Germany|France|Brazil|Nigeria|Egypt|Saudi Arabia|the UAE|Dubai|Singapore|Malaysia|Indonesia|Pakistan|Bangladesh|Turkey|Russia)\b/g;
ban(COUNTRY, 'a real country named in a section whose figures are all fictional');

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert exactly the same thing
 * without naming them — "that earns half the marks", "scores poorly", "will not earn full marks" —
 * and pass the validator untouched (packet 16). Say what the COMMAND WORD requires, which Appendix 6
 * states and which can therefore be cited; do not say what a marker does with an answer. topFix-04
 * asks for the schemes to be rewritten "as levels (KAA + Evaluation)", which is this exact shape, and
 * it is refused for that reason.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

/* ── practice: the exam shape, against ECONOMICS' own Appendix 6 ───────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked (practice.levels)`);
}
// practice-02 and topFix-04 both instruct this item to be removed, on a premise the specification
// refutes twice over: econ_spec.txt:379-399 and :1989-2001 state that WEC12 Section D is one 20-mark
// essay from a choice of two. If it ever disappears, this fails rather than passing quietly.
if (!PRACTICE.some((p) => p.command === 'Evaluate' && p.marks === 20)) problems.push('the 20-mark Evaluate is gone — WEC12 Section D IS a 20-mark essay (econ_spec.txt:379-399, :1989-2001); practice-02 and topFix-04 are refused, not obeyed');
for (const cmd of ['Define', 'Calculate', 'Draw', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) {
  if (!PRACTICE.some((p) => p.command === cmd)) problems.push(`no practice item uses the Economics command word "${cmd}"`);
}

/*
 * A GLOSS THAT CITES APPENDIX 6 MUST SAY WHAT APPENDIX 6 SAYS. This is the check the packet did not
 * have, and Layer 6 found what it was for: five `examMatters` and one practice guidance said
 * "An Examine (8 marks, WEC12 Appendix 6) requires the relationship between two things to be set out
 * and considered". Appendix 6 says nothing of the kind — it says Examine "requires knowledge,
 * understanding, application, analysis and evaluation ... There should be a brief assessment of the
 * arguments/factors/evidence" (econ_spec.txt:2727-2731). Examine is the lowest tariff in this subject
 * that asks for evaluation, and a student told only to set out a relationship writes an Analyse.
 *
 * `claim.uncited` cannot see this: the sentence carries a citation, which is exactly what that rule
 * looks for. A citation to a document that does not support the claim is worse than no citation.
 *
 * The check is on the WHOLE gloss field rather than one sentence, because a gloss routinely names the
 * command word in one sentence and restates its requirement in the next, and because the census
 * descriptions are short enough that one shared distinctive word is a real signal. Zero is the
 * failure: it means the gloss and the specification have nothing in common but the command word.
 */
{
  const STOP = new Set(['requires', 'required', 'students', 'student', 'needs', 'relevant', 'includes', 'including', 'appropriate', 'provided', 'should', 'there', 'which', 'their', 'these', 'those', 'where', 'marks', 'other', 'while', 'about']);
  const words = (t) => new Set(String(t).toLowerCase().replace(/[^a-z ]/g, ' ').split(/\s+/).filter((w) => w.length >= 5 && !STOP.has(w)));
  const glosses = [
    ...SUBSECTIONS.map((x) => [x.title, x.examMatters]),
    ...PRACTICE.map((x) => [`practice ${x.command} (${x.marks})`, x.guidance]),
  ];
  for (const [where, gloss] of glosses) {
    if (!gloss || !/Appendix\s*6/i.test(gloss)) continue;
    const named = [...String(gloss).matchAll(/\b(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate)\b/g)].map((m) => m[1]);
    if (!named.length) { problems.push(`"${where}" cites Appendix 6 without naming a command word`); continue; }
    const cmd = named[0];
    const row = census.find((r) => r.command === cmd);
    if (!row) { problems.push(`"${where}" cites Appendix 6 for "${cmd}", which is not an Economics command word`); continue; }
    const shared = [...words(row.description)].filter((w) => words(gloss).has(w));
    if (!shared.length) problems.push(`"${where}": the ${cmd} gloss cites Appendix 6 and shares NOTHING with the census description — read econ_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
  }
}

/*
 * AND THE OTHER HALF OF THE SAME CLASS, taken from packet 23, which found it independently the same day
 * (DECISIONS, 16 Sep). The check above asks whether a gloss says anything its Appendix 6 row says. It
 * cannot see the opposite failure: an EXTRA requirement bolted onto an otherwise accurate citation —
 * packet 23 shipped "Calculate ... requires interpretation" (the row says nothing about interpretation;
 * that requirement comes from the specification CONTENT) and "Discuss ... diagrams where appropriate"
 * (that phrase is in the Analyse and Examine rows only). Both pass the check above. Seven claims the
 * Appendix 6 rows genuinely distinguish between must appear in the row of the command they are pinned to.
 */
{
  const APPENDIX_CLAIMS = [
    [/\bdiagram/i, /diagram/i, 'diagrams'],
    [/\binterpret/i, /interpret/i, 'interpretation'],
    [/\bworkings?\b/i, /workings/i, 'showing workings'],
    [/chains? of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
    [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'],
    [/\bdepth rather than breadth\b/i, /depth rather than breadth/i, 'depth rather than breadth'],
    [/\bjudgement/i, /judgements?/i, 'a judgement'],
  ];
  // Practice guidance carries its command in its own FIELD; examMatters names it in the sentence.
  const guidanceCommand = new Map(PRACTICE.map((x) => [x.guidance, x.command]));
  for (const s of prose) {
    for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
      if (!/appendix\s*6/i.test(sent)) continue;
      const row = census.find((r) => new RegExp(`\\b${r.command}\\b`).test(sent))
        || census.find((r) => r.command === guidanceCommand.get(s));
      if (!row) { problems.push(`a sentence cites Appendix 6 but names no command word: "${sent.trim().slice(0, 80)}"`); continue; }
      for (const [inSentence, inDescription, what] of APPENDIX_CLAIMS) {
        if (inSentence.test(sent) && !inDescription.test(row.description)) {
          problems.push(`Appendix 6 is cited for ${what} under ${row.command}, which its description does not mention: "${sent.trim().slice(0, 90)}"`);
        }
      }
    }
  }
}

/*
 * THE LENGTH TELL THE VALIDATOR CANNOT SEE. `quiz.long-correct` fires only when the correct option is
 * more than 1.5x the longest distractor, which catches the egregious case and nothing else. Verify A
 * measured what it misses: as first authored, the correct option was simply the LONGEST of the four in
 * 40% of this bank against a 25% baseline — every one of them under the 1.5x bar. A student who always
 * picks the longest option would have been right well over half again as often as chance, and unlike
 * answer POSITION, length survives the render-time shuffle. So the share is bounded here.
 *
 * 35% rather than 25%: with 43 items the binomial noise around 25% is wide, and a key that happens to
 * be the longest is not by itself a defect — a systematic tendency is.
 */
{
  const longest = bundle.quiz.filter((q) => {
    const c = String(q.options[q.correctIndex]).length;
    return q.options.every((o, j) => j === q.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity)');
}

/* ── the arithmetic, recomputed here rather than trusted ───────────────────── */
for (const i of [0, 1, 2]) {
  if (realAt(i) !== r2((NOMINAL[i] / GDP_INDEX[i]) * 100)) problems.push(`realAt(${i}) disagrees with nominal ÷ index × 100`);
  if (perCapitaAt(i) !== Math.round((realAt(i) / POP[i]) * 1000)) problems.push(`perCapitaAt(${i}) is not real GDP ÷ population`);
}
if (realAt(0) !== 500 || realAt(1) !== 520 || realAt(2) !== 507) problems.push(`real GDP is ${[0, 1, 2].map(realAt).join('/')}, not 500/520/507`);
if (realGrowth(1) !== 4 || realGrowth(2) !== -2.5) problems.push(`real growth is ${realGrowth(1)}/${realGrowth(2)}, not +4.0/−2.5`);
if (perCapitaGrowth(1) !== 0) problems.push('real GDP per capita changed in year 2 — the whole point of the row is that it did not');
if (nominalGrowth(2) <= 0) problems.push('nominal GDP did not rise in year 3, so the section\'s headline contrast does not hold');
if (realGrowth(2) >= 0) problems.push('real GDP did not fall in year 3');
if (perCapitaAt(2) !== 19500) problems.push(`year 3 per capita is ${perCapitaAt(2)}, not 19500`);
// The four quarters must compound to the annual figure, not merely sum to it.
{
  const compounded = Math.round((QUARTERS.reduce((a, q) => a * (1 + q / 100), 1) - 1) * 1000) / 10;
  if (compounded !== realGrowth(2)) problems.push(`the four quarters compound to ${compounded}%, but year 3's real growth is ${realGrowth(2)}%`);
  if (!(QUARTERS[1] < 0 && QUARTERS[2] < 0)) problems.push('Q2 and Q3 are not both negative, so the recession definition is not met where the section says it is');
  if (QUARTERS[0] >= 0 === false) problems.push('Q1 is negative, which would start the run a quarter earlier than the section says');
}
if (OIL_VOLUME_CHANGE <= 0 || OIL_VALUE_CHANGE >= 0) problems.push('the value-against-volume example does not have volume rising and value falling');
if (oilValue(0) !== r2((OIL[0].barrels * OIL[0].price) / 1000)) problems.push('oil earnings disagree with barrels × price');
if (atPPP(PPP_ROWS[1]) !== atPPP(PPP_ROWS[0])) problems.push('the two countries\' incomes are not equal at PPP, which is the point of the table');
if (atMarket(PPP_ROWS[1]) >= atMarket(PPP_ROWS[0])) problems.push('the PPP example does not show the market rate understating the second country');

if (weightSum(BASKET) !== 100 || weightSum(HOUSEHOLD_BASKET) !== 100) problems.push('a basket\'s weights do not sum to 100');
if (CPI !== indexOf(BASKET)) problems.push('CPI disagrees with the weighted basket it is built from');
if (CPI !== 105.8) problems.push(`the CPI is ${CPI}, not 105.8`);
if (CPI_HOUSEHOLD !== 107) problems.push(`the re-weighted index is ${CPI_HOUSEHOLD}, not 107.0`);
if (CPI_HOUSEHOLD <= CPI) problems.push('the re-weighted household index is not higher than the national one, so 2c\'s example does not work');
if (BASKET.some((g, i) => g.index !== HOUSEHOLD_BASKET[i].index)) problems.push('the two baskets use different price indices — the example only works if ONLY the weights differ');
if (INFLATION !== r2(CPI - 100)) problems.push('inflation disagrees with the index it is read from');
if (Math.round(((CPI_SERIES[2] - CPI_SERIES[1]) / CPI_SERIES[1]) * 1000) / 10 !== INFLATION_Y3) problems.push('year 3 inflation disagrees with the series it is read from');
if (INFLATION_Y3 >= INFLATION) problems.push('the rate did not fall between the two years, so there is no disinflation to teach');
if (CPI_SERIES[2] <= CPI_SERIES[1]) problems.push('the index fell in year 3, which would make it deflation rather than disinflation');
if (r2(CPI_SERIES[2] - 100) === INFLATION_Y3) problems.push('subtracting 100 gives the same answer as the correct method, so the section\'s commonest-error example proves nothing');
if (PPI_CHANGE <= INFLATION) problems.push('the producer index did not move further than the consumer index, so 2d\'s example does not illustrate a lead');
if (savingsReal() >= SAVINGS) problems.push('the saver did not lose in real terms, which is what the worked example claims');
if (savingsNominal() <= SAVINGS) problems.push('the saver\'s balance did not rise, so the example is not the paradox the section says it is');

if (LABOUR_FORCE !== r2(EMPLOYED + UNEMPLOYED)) problems.push('the labour force is not the employed plus the unemployed');
if (INACTIVE !== r2(WORKING_AGE - LABOUR_FORCE)) problems.push('the inactive are not the working-age population less the labour force');
if (unemploymentRate() !== 5 || employmentRate() !== 71.25 || inactivityRate() !== 25) problems.push(`the three rates are ${unemploymentRate()}/${employmentRate()}/${inactivityRate()}, not 5.0/71.25/25.0`);
if (r2(unemploymentRate() + employmentRate() + inactivityRate()) === 100) problems.push('the three rates sum to 100, which would contradict the subsection that explains why they do not');
if (UNDEREMPLOYED >= EMPLOYED) problems.push('more people are underemployed than employed');
if (mEmployed() <= EMPLOYED) problems.push('employment did not rise after migration');
if (mUnemploymentRate() <= unemploymentRate()) problems.push('the unemployment rate did not rise after migration, so the subsection\'s point does not hold');
if (mUnemployed() !== r2(mLabourForce() - mEmployed())) problems.push('the post-migration unemployed figure is not the labour force less employment');

if (tradeInGoodsAndServices() !== r2(BOP.goods + BOP.services)) problems.push('the trade balance is not goods plus services');
if (currentAccount() !== r2(tradeInGoodsAndServices() + BOP.primary + BOP.secondary)) problems.push('the current account is not the four lines added');
if (!(tradeInGoodsAndServices() > 0 && currentAccount() < 0)) problems.push('the balance of payments example is not a trade SURPLUS inside a current account DEFICIT, which is the distinction 4b and 4c draw');

if (FLOOR_GAP !== r2(FLOOR_SUPPLY - FLOOR_DEMAND)) problems.push('the wage-floor gap is not supply less demand at the floor');
if (WAGE_FLOOR <= LAB_MEET[1]) problems.push('the wage floor is not above the wage at which the two quantities are equal, so it creates no unemployment');
if (PPF_INSIDE[1] >= PPF_ON[1]) problems.push('the point called "inside" the frontier is not below the frontier at the same output of consumer goods');

/* ── diagram geometry, re-derived from the emitted SVG ─────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the accounts table and the two-line chart
  const [accounts, chart, valueVolume] = svgOf(DIAGRAMS[0]);
  for (const i of [0, 1, 2]) {
    has(accounts, `>${bn(NOMINAL[i])}</text>`, `the accounts table does not print nominal GDP of ${bn(NOMINAL[i])} for year ${i + 1}`);
    has(accounts, `>${bn(realAt(i))}</text>`, `the accounts table does not print real GDP of ${bn(realAt(i))} for year ${i + 1}`);
    has(accounts, `>${money(perCapitaAt(i))}</text>`, `the accounts table does not print ${money(perCapitaAt(i))} per head for year ${i + 1}`);
  }
  has(chart, `${pc(realGrowth(1))} then ${pc(realGrowth(2))}`, 'the chart does not print the two real growth rates');
  has(chart, `${pc(nominalGrowth(1))} then ${pc(nominalGrowth(2))}`, 'the chart does not print the two nominal growth rates');
  has(valueVolume, `>${bn(oilValue(0))}</text>`, `the value/volume table does not print ${bn(oilValue(0))}`);
  has(valueVolume, `>${bn(oilValue(1))}</text>`, `the value/volume table does not print ${bn(oilValue(1))}`);
  has(valueVolume, `${pc(OIL_VOLUME_CHANGE)} and value ${pc(OIL_VALUE_CHANGE)}`, 'the value/volume table does not state both percentage changes');
}
{ // 2 · growth bars, the recession quarters and the PPP table
  const [bars, recession, ppp] = svgOf(DIAGRAMS[1]);
  has(bars, `>${pc(realGrowth(1))}</text>`, 'the growth bars do not label the positive rate');
  has(bars, `>${pc(realGrowth(2))}</text>`, 'the growth bars do not label the negative rate');
  for (const q of QUARTERS) has(recession, `>${pc(q)}</text>`, `the recession diagram does not label a quarter of ${pc(q)}`);
  for (const r of PPP_ROWS) {
    has(ppp, `>${money(atMarket(r))}</text>`, `the PPP table does not print ${money(atMarket(r))} at the market rate`);
    has(ppp, `>${money(atPPP(r))}</text>`, `the PPP table does not print ${money(atPPP(r))} at PPP`);
  }
}
{ // 4 · the weighted basket, every cell generated from the basket itself
  const [basket, household, series, ppi] = svgOf(DIAGRAMS[3]);
  for (const g of BASKET) {
    has(basket, `>${g.group}</text>`, `the basket has no ${g.group} row`);
    has(basket, `>${weighted(g).toLocaleString('en-GB')}</text>`, `the basket does not print ${g.weight} × ${g.index} = ${weighted(g)}`);
  }
  has(basket, `${idx(CPI)}`, `the basket does not reach an index of ${idx(CPI)}`);
  for (const g of HOUSEHOLD_BASKET) has(household, `>${String(g.weight)}</text>`, `the household table has no weight of ${g.weight}`);
  has(household, `${idx(CPI_HOUSEHOLD)}`, `the household table does not reach ${idx(CPI_HOUSEHOLD)}`);
  for (const v of CPI_SERIES) has(series, `>${idx(v)}</text>`, `the series table has no index of ${idx(v)}`);
  has(series, `>${pc(INFLATION_Y3)}</text>`, `the series table does not print ${pc(INFLATION_Y3)}`);
  has(ppi, `>${pc(PPI_CHANGE)}</text>`, `the producer index table does not print ${pc(PPI_CHANGE)}`);
}
{ // 5 · AD/AS — the pairs of movements are the whole teaching point, so they are asserted
  const [dp, cp, adf, asr] = svgOf(DIAGRAMS[4]);
  for (const [svg, label] of [[dp, 'demand-pull'], [cp, 'cost-push'], [adf, 'falling AD'], [asr, 'rising AS']]) {
    has(svg, '>Price level<', `the ${label} diagram does not label the price level axis`);
    has(svg, '>Real output<', `the ${label} diagram does not label the real output axis`);
    has(svg, '>P₁<', `the ${label} diagram does not mark the original price level`);
    has(svg, '>P₂<', `the ${label} diagram does not mark the new price level`);
  }
  if (!(DEMAND_PULL[1] > BASE[1] && DEMAND_PULL[0] > BASE[0])) problems.push('demand-pull does not raise BOTH the price level and real output');
  if (!(COST_PUSH[1] > BASE[1] && COST_PUSH[0] < BASE[0])) problems.push('cost-push does not raise the price level while lowering real output');
  if (!(AD_FALL[1] < BASE[1] && AD_FALL[0] < BASE[0])) problems.push('falling AD does not lower BOTH the price level and real output');
  if (!(AS_RISE[1] < BASE[1] && AS_RISE[0] > BASE[0])) problems.push('rising AS does not lower the price level while raising real output');
  has(dp, '>AD₂<', 'the demand-pull diagram does not label the shifted demand curve');
  has(cp, '>SRAS₂<', 'the cost-push diagram does not label the shifted supply curve');
  has(dp, '>AD₁<', 'the demand-pull diagram does not keep the original curve labelled beside the new one');
}
{ // 6 · the saver, worked through
  const [, saver] = svgOf(DIAGRAMS[5]);
  has(saver, `>${money(SAVINGS)}</text>`, 'the saver table does not print the opening balance');
  has(saver, `>${money(savingsNominal())}</text>`, 'the saver table does not print the closing balance');
  has(saver, `>${money(savingsReal())}</text>`, 'the saver table does not print what the balance buys');
}
{ // 7 · the labour force decomposition and the two denominators
  const [force, , migration] = svgOf(DIAGRAMS[6]);
  for (const v of [EMPLOYED, UNEMPLOYED, INACTIVE]) has(force, `>${v}m</text>`, `the labour-force bar does not label a segment of ${v}m`);
  has(force, `= ${rate(unemploymentRate())} — measured against the LABOUR FORCE`, 'the labour-force diagram does not show the unemployment rate against the labour force');
  has(force, `= ${rate(employmentRate())}`, 'the labour-force diagram does not show the employment rate');
  has(force, `= ${rate(inactivityRate())}`, 'the labour-force diagram does not show the inactivity rate');
  has(migration, `>${rate(mUnemploymentRate())}</text>`, 'the migration table does not print the new unemployment rate');
  has(migration, `>${mEmployed()}m</text>`, 'the migration table does not print the new employment figure');
}
{ // 8 · the wage floor, read back off the labour-market diagram, which is now its only scenario
  const [realWage] = svgOf(DIAGRAMS[7]);
  has(realWage, `>${FLOOR_GAP}m unemployed</text>`, `the real-wage diagram does not mark the ${FLOOR_GAP}m gap`);
  has(realWage, `firms want ${FLOOR_DEMAND}m workers and ${FLOOR_SUPPLY}m want to work`, 'the real-wage diagram does not state both quantities at the floor');
}
{ // 9 · the frontier, with the economy inside it — the only scenario on this diagram
  const [ppf] = svgOf(DIAGRAMS[8]);
  if (DIAGRAMS[8].scenarios.length !== 1) problems.push('the PPF diagram has gained a scenario; if it is a table, the drawing checklist has to go with it');
  has(ppf, '>production possibility frontier<', 'the PPF diagram does not label the frontier');
  has(ppf, '>A<', 'the PPF diagram does not mark the point inside the frontier');
  has(ppf, '>B<', 'the PPF diagram does not mark the point on the frontier');
}
{ // 10 · the current account, added line by line
  const [components, ca] = svgOf(DIAGRAMS[9]);
  for (const k of ['Current account', 'Capital account', 'Financial account']) has(components, `>${k}</text>`, `the components table does not name the ${k}`);
  for (const v of [BOP.goods, BOP.services, BOP.primary, BOP.secondary]) has(ca, `>${bn(v)}</text>`, `the current account table does not print ${bn(v)}`);
  has(ca, `>${bn(currentAccount())}</text>`, 'the current account table does not print the total');
}

/*
 * EVERY INDEX-SHAPED FIGURE IN THE PROSE MUST BE ONE THE SPINE PRODUCES. The instance: a realExample
 * read "An index moves from 105.8 to 108.4" after the section had been moved onto a single price
 * index ending at 109.0. It was typed rather than derived, so it did not move with everything else,
 * and it sat one paragraph away from the correct arithmetic. The class is the whole reason DECISIONS
 * now says to derive any figure a student could compute: a figure typed twice is eventually typed
 * differently, and nothing else in this runner would have looked at it.
 */
{
  /*
   * Three figures in this range are deliberately NOT Andara's, and saying so here is the point: an
   * exception that is declared is a decision, and an exception that is silent is the bug above.
   *   102 — a hypothetical index FALLING, in the classify recall that separates deflation from
   *         disinflation. Andara's index never falls, so the case has to be borrowed.
   *   106 — a distractor in the CPI calculation quiz item: a plausible wrong answer has to be a
   *         number the basket does not give.
   */
  const ILLUSTRATIVE = ['102', '106'];
  const legitimate = new Set([
    ...GDP_INDEX, ...CPI_SERIES, ...PPI, ...BASKET.map((g) => g.index), ...HOUSEHOLD_BASKET.map((g) => g.index),
    CPI, CPI_HOUSEHOLD, r2(CPI_SERIES[2] - 100), 100,
  ].map((n) => String(n)).concat(ILLUSTRATIVE));
  const seen = new Map();
  /*
   * `(?![\d%A-Za-z])` keeps "110m barrels" and "108 cases" out of it: a quantity is not an index. The
   * first version also excluded a following "." and so could not see "108.4." at the end of a sentence
   * — which is exactly where the figure it was written for sat. A/B'd both ways before it was trusted.
   */
  for (const s of prose) for (const m of String(s).matchAll(/(?<![\d.,$])1[0-2]\d(?:\.\d)?(?![\d%A-Za-z])/g)) {
    if (!legitimate.has(m[0])) seen.set(m[0], (seen.get(m[0]) || String(s).slice(Math.max(0, m.index - 60), m.index + 40)));
  }
  for (const [n, ctx] of seen) problems.push(`the index-shaped figure ${n} is not one this section's own series produces: "…${ctx.trim()}…"`);
}

/* ── ids, and the figures agreeing across every surface ────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Andara's figures are the same figures wherever they appear.
const must = [bn(realAt(2)), pc(realGrowth(2)), money(perCapitaAt(1)), idx(CPI), idx(CPI_HOUSEHOLD), pc(INFLATION), rate(unemploymentRate()), rate(employmentRate()), bn(tradeInGoodsAndServices()), bn(currentAccount()), money(savingsReal())];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// ONE MINUS SIGN. A negative number typed by hand carries U+2212 and one printed by JavaScript
// carries an ASCII hyphen; packet 18 shipped 55 of one beside 13 of the other in a section about
// negative numbers, and this section's subject matter is a contracting economy and a trade deficit.
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 21 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('\nAndara:');
console.log(`  accounts  ${[0, 1, 2].map((i) => `y${i + 1} ${bn(NOMINAL[i])}/${idx(GDP_INDEX[i])} → ${bn(realAt(i))}, ${money(perCapitaAt(i))} a head`).join('  ')}`);
console.log(`  growth    real ${pc(realGrowth(1))} then ${pc(realGrowth(2))} · nominal ${pc(nominalGrowth(1))} then ${pc(nominalGrowth(2))} · per capita ${pc(perCapitaGrowth(1))} then ${pc(perCapitaGrowth(2))}`);
console.log(`  quarters  ${QUARTERS.map((q) => pc(q)).join(' ')} — recession met at the end of Q${QUARTERS.findIndex((q, i) => i > 0 && q < 0 && QUARTERS[i - 1] < 0) + 1}`);
console.log(`  prices    CPI ${idx(CPI)} (${pc(INFLATION)}) · re-weighted ${idx(CPI_HOUSEHOLD)} (${pc(INFLATION_HOUSEHOLD)}) · year 3 ${pc(INFLATION_Y3)} · PPI ${pc(PPI_CHANGE)}`);
console.log(`  labour    ${EMPLOYED}m + ${UNEMPLOYED}m = ${LABOUR_FORCE}m of ${WORKING_AGE}m · rates ${rate(unemploymentRate())} / ${rate(employmentRate())} / ${rate(inactivityRate())} · after migration ${rate(mUnemploymentRate())}`);
console.log(`  trade     goods ${bn(BOP.goods)} + services ${bn(BOP.services)} = ${bn(tradeInGoodsAndServices())} surplus; current account ${bn(currentAccount())} deficit`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(38)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 76)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: one currency, no GDP measurement method, no RPI or CPIH, no HDI or quantitative easing, no Phillips curve or output gap, no Assess or Outline, no UK-only institution, no real country and no dated claim, no uncited examiner or marker or paper claim, every practice tariff in the ECONOMICS census, the 20-mark Evaluate kept against practice-02, every block pinned to a quiz, a practice item and a diagram, every diagram figure re-derived from the emitted SVG, every rate recomputed from its own inputs, ids unique, one minus sign');

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
for (const f of newDebt) console.log(`  new debt   ${f.rule.padEnd(24)} ${f.detail.slice(0, 170)}`);
for (const f of carried) console.log(`  carried    ${f.rule.padEnd(24)} ${f.detail.slice(0, 170)}`);
for (const f of after.findings.filter((x) => x.tier === 'INFO')) console.log(`  info       ${f.rule.padEnd(24)} ${f.detail}`);

if (DUMP) { const p = `audit/snapshots/packet-21-bundle__economics__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-21-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
