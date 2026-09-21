#!/usr/bin/env node
/**
 * PACKET 27 — business-objectives-strategy, IAL Business Unit 3 (WBS13) topic 3.3.1 (11 spec leaves).
 *
 *   node scripts/packet-27-business-objectives-strategy.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-27-business-objectives-strategy.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-27-business-objectives-strategy.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet27-content.mjs (blocks and Notes), scripts/_packet27-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet27-diagrams.mjs (seven diagrams, where the
 * section had NONE). This file assembles the bundle, pins each block to its diagram, quiz and practice
 * items, and runs the checks a verifier will run.
 *
 * CARRIED FROM PACKET 25, unchanged in substance: pin ownership; the canvas-bounds check; the text
 * EXTENT check with its A/B; the length-aware width guard; the guided-opening rule; the ledger-id and
 * previous-content bans in their widened form; the marker-claim check with its A/B; the copy-from-screen
 * reorder check with its A/B; and the block-count guard, which this section is designed against rather
 * than caught by.
 *
 * WHAT THIS PACKET ADDS, and why each one exists:
 *   - THE CENSUS IS THE BUSINESS ONE, AND ASSESS IS 12. Every earlier content packet in this programme
 *     except 16, 18, 19, 20 and 22 was Economics. The March bank carried a 10-mark Assess, which is the
 *     Units 1/2 tariff, in a Unit 3 section (bus_spec.txt:2238-2245), a 4-mark Define where Define is 2,
 *     and an Outline, which is not a command word in either subject. All three are refused here.
 *   - THE MATRIX CHECKS. Three of the seven diagrams are 2x2 matrices and the section's whole claim is
 *     that a matrix has cells in positions. Each is re-derived from the emitted SVG: both dimension
 *     names, both values of each dimension, and all four cell titles.
 *   - "THREE STRATEGIES" IS BANNED OUTRIGHT (accuracy-01). `generic strateg` is 0 in bus_spec.txt and
 *     :1099 reads "Porter's Strategic Matrix". A matrix built from two dimensions has four cells.
 *   - THE RANKING CHECK (topFix-03). The March takeaway ranked product development below market
 *     development while the Notes called both medium risk. Nothing in Ansoff ranks them. This refuses
 *     any sentence that puts one of the two middle cells above or below the other, and it carries an
 *     A/B, because a ban that has never disagreed with anything is a claim about itself.
 *   - THE UK-GCE VOCABULARY BAN. `distinctive capabilit` is 0 in bus_spec.txt and `specGap-05` asks for
 *     it by name; `VRIO`, `core competenc`, `balanced scorecard` and `triple bottom line` are the four
 *     the validator's own `terms.off-spec` list already carries for Business. `distinctive capabilities`
 *     is the same family and the validator cannot see it, so it is banned here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, pc, round2, ADISA, DECISIONS, CAPITAL_SHARE } from './_packet27-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7 } from './_packet27-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet27-assessment.mjs';
import { DIAGRAMS, estWidth, ANSOFF_CELLS, PORTER_CELLS, SWOT_CELLS, PESTLE_ROWS, FORCES_ROWS } from './_packet27-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7];
const A = ADISA;

/* ── assemble ──────────────────────────────────────────────────────────────── */

const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
/*
 * The first index is what the chapter check-in shows. The search is over the BLOCK'S OWN pool, never
 * the whole bank: searching the bank is how packet 24 reserved a pre-test item as a check-in question,
 * silently changing which three the pre-test draws.
 */
const first = (list, needle) => {
  const i = list.find((j) => QUIZ[j].question.includes(needle));
  if (i == null) throw new Error(`no quiz item in this block matching "${needle}"`);
  return [i, ...list.filter((x) => x !== i)];
};
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Corporate objectives are developed from'),
  [B2]: first(quizByBlock[B2], 'existing product in a new country'),
  [B3]: first(quizByBlock[B3], 'is built from two dimensions'),
  [B4]: first(quizByBlock[B4], 'The aim of portfolio analysis is to'),
  [B5]: first(quizByBlock[B5], 'whether a decision is strategic'),
  [B6]: first(quizByBlock[B6], 'the first question to ask about any item'),
  [B7]: first(quizByBlock[B7], 'PESTLE stands for'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so a
 * diagramId on a subsection is never read. The March section had no diagrams at all (structure-03).
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
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€|¥/g, 'a currency other than dollars (locale.currency)');

/*
 * OFF-SPEC VOCABULARY, each with the count that settles it. Every phrase below greps ZERO in
 * bus_spec.txt and belongs to the UK GCE A-level Business specification, which is the trap 154 ledger
 * items across this programme fall into.
 */
ban(/\bdistinctive capabilit(y|ies)\b/gi, '"distinctive capabilities" (0 in bus_spec.txt; UK GCE 3.1.2 — specGap-05 asks for it by name and is wont-fix)');
ban(/\bVRIO\b/g, '"VRIO" (0 in bus_spec.txt; a named `terms.off-spec` phrase)');
ban(/\bcore competenc(y|ies)\b/gi, '"core competencies" (0 in bus_spec.txt; a named `terms.off-spec` phrase)');
ban(/\bbalanced scorecard\b/gi, '"balanced scorecard" (0 in bus_spec.txt; a named `terms.off-spec` phrase)');
ban(/\btriple bottom line\b/gi, '"triple bottom line" (0 in bus_spec.txt; a named `terms.off-spec` phrase)');
ban(/\bgeneric strateg(y|ies)\b/gi, '"generic strategies" (0 in bus_spec.txt; :1099 reads "Porter\'s Strategic Matrix" — accuracy-01)');
ban(/\bthree strategies\b/gi, '"three strategies" (accuracy-01: two dimensions with two values each give FOUR cells)');
ban(/\bfunctional objectives?\b/gi, '"functional objectives" (0 in bus_spec.txt — the tier structure-09 found in the Notes and not in the content)');
ban(/\bBCG\b/g, '"BCG" (0 in bus_spec.txt; the spec says "the Boston Matrix", and that is 1.3.3 · 1c in Unit 1)');
/*
 * THE BOSTON MATRIX IS ANOTHER SECTION'S LEAF (bus_spec.txt:605, IAL 1.3.3 · 1c — `marketing-mix-strategy`,
 * which packet 22 rebuilt and where it appears 19 times). 3.3.1 · 2b asks only for the AIM of portfolio
 * analysis. It may be NAMED here, once, as the Unit 1 tool it is; it may not be taught. So the ban is on
 * the cells rather than on the name, and the name itself is bounded below.
 */
ban(/\bcash cows?\b|\bquestion marks?\b|\bstars? and dogs?\b|\bdogs?\b(?![\w-])/gi, 'a Boston Matrix cell name (the matrix is IAL 1.3.3 · 1c, Unit 1 — this section owns the AIM of portfolio analysis at :1100)');
{
  const boston = count(/\bBoston Matrix\b/g);
  if (boston > 2) problems.push(`"Boston Matrix" appears ${boston} times; it is 1.3.3 · 1c and may be NAMED as the Unit 1 tool, not taught here`);
}
{
  /*
   * SMART greps 0 in bus_spec.txt and was the March section's spine — its block title, its first
   * takeaway and its opening subsection — and NO finding says so, which is packet 20's shape. It
   * survives as one named mention per SURFACE: once in the Learn body, in the subsection about
   * writing objectives, and once in the Notes, which mirror that body. Two is the bound, and a third
   * would mean it had started being a spine again.
   */
  const smart = count(/\bSMART\b/g);
  if (smart > 2) problems.push(`"SMART" appears ${smart} times; it is 0 in bus_spec.txt and is allowed one named mention per surface — the Learn body and the Notes`);
}

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the March practice[4] used it)');
ban(/\bExamine\b/g, '"Examine" (an Economics command word; Business has none)');
ban(/\bAssess[^.!?]{0,40}\(10 marks\)|\b10.mark Assess/g, 'a 10-mark Assess (Assess is 10 in Units 1/2 and 12 in Units 3/4; this is WBS13 — bus_spec.txt:2238-2245)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|the Chancellor|Office for National Statistics)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(ONS|OBR|DWP|CAP)\b/g, 'a UK-only or EU-only acronym (locale.institution)');
ban(/\b(the UK|United Kingdom|Britain|British|London|England|English)\b/g, 'a UK framing (an international cohort sits WBS13 in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya)');

ban(/\b(?:specGap|topFix|structure|accuracy|specThin)-\d+\b/g, 'an internal ledger id left in text a student reads (packet 19\'s Layer 6 finding, widened: the bare form is as visible as the bracketed one)');
ban(/\((?:quiz|practice|diagram)-\d+\)/g, 'an internal ledger id left in text a student reads');
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — where a student reads it');
ban(/\b(the|this) (March |previous |old )?(version|section|copy|item|content|bank|quiz) (used to|previously|once) \b|\bthe March (version|section|copy|item|content|bank|quiz)\b|\bin the previous version\b|\bused to say\b|\bthe section\'s own (quiz|notes|body|card)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/*
 * NO DATED CLAIM ABOUT A REAL FIRM. This is how topFix-04 and accuracy-02 are answered: the Netflix
 * SWOT ("password-sharing crackdowns", "high debt from original content spend") and the Amazon Ansoff
 * example were claims about named firms at a moment in time that this repository cannot check, and one
 * of them modelled the exact categorisation error the section is teaching against. They are replaced
 * rather than corrected, and this refuses their shape.
 */
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (/\b(19|20)\d{2}\b/.test(sent)) problems.push(`a dated claim about a real firm: "${sent.trim().slice(0, 90)}"`);

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = [
    'A chain that stops at the diagram earns half the marks (3 marks) available.',
    'An answer without a diagram scores poorly.',
    'Mark schemes accept a four-cell matrix here.',
    'Naming the cell costs you a mark (1 mark) if you get it wrong.',
  ];
  const mustNotFire = [
    'A target for the whole business (1 mark) that carries a figure and a date (1 mark).',
    'The mission statement states the purpose the business exists to serve (1 mark).',
  ];
  const wrong = [
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `still fires on a point allocation: "${x}"`),
  ];
  if (wrong.length) problems.push(`the marker-claim check is broken: ${wrong.join('; ')}`);
}

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

/*
 * THE RANKING CHECK (topFix-03). The March block takeaway read "penetration (safe) → product dev →
 * market dev → diversification (risky)", ranking the two middle cells against each other, while the
 * Notes in the same section called both medium risk. Nothing in Ansoff ranks them: both ask the firm to
 * learn exactly one new thing. This refuses any sentence that puts one above the other.
 */
const RANKING = /\b(market|product) development\b[^.!?]{0,60}\b(riskier|safer|less risky|more risky|higher risk|lower risk|above|below)\b[^.!?]{0,60}\b(market|product) development\b/i;
/*
 * A MISCONCEPTION CARD HAS TO BE ABLE TO QUOTE THE ERROR IT CORRECTS, and the first version of this
 * check could not tell a claim from a refusal of one: it fired on both of this section's own cards,
 * whose whole purpose is to say that the ranking is wrong. So a sentence carrying a refusal cue is
 * exempt, and the A/B below proves the exemption does not swallow the claim itself.
 */
const REFUSES = /\b(students|instead|nothing in the matrix|not ranked|never ranked|writing that|does not rank|do not rank|neither cell)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (RANKING.test(sent) && !REFUSES.test(sent)) problems.push(`the two middle Ansoff cells are ranked against each other (topFix-03): "${sent.trim().slice(0, 90)}"`);
{
  /* A/B, run every time (packet 21): a guard nothing has ever disagreed with is a claim about itself. */
  const fires = (x) => RANKING.test(x) && !REFUSES.test(x);
  const mustFire = [
    'Market development is safer than product development.',
    'Product development sits below market development on the risk ladder.',
  ];
  const mustNotFire = [
    'Students rank the four cells as a fixed ladder with product development always riskier than market development.',
    'Both product development and market development ask the firm to learn exactly one new thing.',
  ];
  for (const x of mustFire) if (!fires(x)) problems.push(`the Ansoff ranking check no longer fires on a ranking claim: "${x}"`);
  for (const x of mustNotFire) if (fires(x)) problems.push(`the Ansoff ranking check fires on a sentence that is not a ranking claim: "${x}"`);
}

/* ── practice: the exam shape, against BUSINESS' own Appendix 6 ────────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
const UNIT = 3;
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice "${pItem.command}" is not an IAL Business command word`);
  else if (!row.marks.includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — the census allows ${row.marks.join(' or ')}`);
  /*
   * AND THE UNIT, WHICH IS THE HALF THE CENSUS CANNOT CHECK ALONE. Assess carries two tariffs and the
   * census row lists both; only the unit says which. This section is WBS13, so Assess is 12.
   */
  if (pItem.command === 'Assess' && pItem.marks !== 12) problems.push(`practice Assess (${pItem.marks}) — Assess is 10 in Units 1/2 and 12 in Units 3/4, and this section is Unit ${UNIT} (bus_spec.txt:2238-2245)`);
  if (!pItem.question.includes(`(${pItem.marks} marks)`)) problems.push(`practice ${pItem.command}: the stem does not say "(${pItem.marks} marks)"`);
  if (pItem.marks > 6 && /\(\d+\s*marks?\)/.test(pItem.guidance)) problems.push(`practice ${pItem.command} (${pItem.marks}): guidance allocates points, but tariffs above 6 are levels-marked (practice.levels)`);
}
for (const cmd of ['Define', 'Calculate', 'Construct', 'Explain', 'Analyse', 'Discuss', 'Assess', 'Evaluate']) {
  if (!PRACTICE.some((x) => x.command === cmd)) problems.push(`no practice item uses the Business command word "${cmd}"`);
}
for (const x of PRACTICE) {
  const paras = String(x.guidance).split('\n').filter(Boolean);
  if (paras.length < 2) problems.push(`practice ${x.command}: one-paragraph guidance, so guided mode prints the whole mark scheme above the answer box`);
  const opening = paras[0] || '';
  if (/\(\s*\d+\s*marks?\s*\)/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph allocates marks, and it is shown BEFORE the student writes`);
  if (/=/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph contains a worked calculation, and it is shown BEFORE the student writes`);
}
/*
 * THE BANK-LEVEL GAP (structure-08). The March bank had NO applied question on Ansoff or Porter — the
 * two most examinable frameworks in the topic — while two of its five items covered ideas the content
 * never taught. Every sub-topic now has a practice item, checked rather than remembered.
 */
for (const [needle, what] of [
  [/mission statement/i, 'the mission statement'], [/corporate objective/i, 'corporate objectives'],
  [/Ansoff/i, "Ansoff's Matrix"], [/narrow position|low-cost position/i, "Porter's positions"],
  [/revenue by line|market\b/i, 'the portfolio'], [/human, physical and financial/i, 'the three resources'],
  [/SWOT/i, 'SWOT'], [/external environment/i, 'external influences'],
]) {
  if (!PRACTICE.some((x) => needle.test(x.question))) problems.push(`no practice item covers ${what}`);
}

/*
 * A GLOSS THAT CITES APPENDIX 6 MUST SAY WHAT APPENDIX 6 SAYS (packet 21) and MUST NOT BOLT AN EXTRA
 * REQUIREMENT ONTO IT (packet 23). Both checks carried, against the BUSINESS census rows.
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
    const named = [...String(gloss).matchAll(/\b(Define|Calculate|Construct|Explain|Analyse|Discuss|Assess|Evaluate)\b/g)].map((m) => m[1]);
    if (!named.length) { problems.push(`"${where}" cites Appendix 6 without naming a command word`); continue; }
    const cmd = named[0];
    const row = census.find((r) => r.command === cmd);
    if (!row) { problems.push(`"${where}" cites Appendix 6 for "${cmd}", which is not a Business command word`); continue; }
    const shared = [...words(row.description)].filter((w) => words(gloss).has(w));
    if (!shared.length) problems.push(`"${where}": the ${cmd} gloss cites Appendix 6 and shares NOTHING with the census description — read bus_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
  }
}
{
  const APPENDIX_CLAIMS = [
    [/\bdiagram/i, /diagram/i, 'diagrams'],
    [/\binterpret/i, /interpret/i, 'interpretation'],
    [/\bworkings?\b/i, /workings/i, 'showing workings'],
    [/chains? of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
    [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'],
    [/\bjudgement/i, /judgement/i, 'a judgement'],
    [/\bcontextualised\b/i, /contextualised/i, 'contextualisation'],
    [/\brecommendations?\b/i, /recommendations/i, 'recommendations'],
  ];
  const guidanceCommand = new Map(PRACTICE.map((x) => [x.guidance, x.command]));
  for (const s of prose) {
    for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
      if (!/appendix\s*6/i.test(sent)) continue;
      const row = census.find((r) => new RegExp(`\\b${r.command}\\b`).test(sent)) || census.find((r) => r.command === guidanceCommand.get(s));
      if (!row) { problems.push(`a sentence cites Appendix 6 but names no command word: "${sent.trim().slice(0, 80)}"`); continue; }
      for (const [inSentence, inDescription, what] of APPENDIX_CLAIMS) {
        if (inSentence.test(sent) && !inDescription.test(row.description)) {
          problems.push(`Appendix 6 is cited for ${what} under ${row.command}, which its description does not mention: "${sent.trim().slice(0, 90)}"`);
        }
      }
    }
  }
}

/* the length tell the validator cannot see */
{
  const longest = bundle.quiz.filter((x) => {
    const c = String(x.options[x.correctIndex]).length;
    return x.options.every((o, j) => j === x.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/*
 * A REORDER MAY NOT BE SOURCED BY THE FLOW ON ITS OWN STEP — and PARAPHRASE IS NOT AN ESCAPE.
 *
 * `lib/learn-steps.js:10` puts a subsection's recall BELOW its teaching on the same step, so a
 * reorder whose sequence is the flow box above it is a copy-from-screen task rather than retrieval.
 * Packet 25 closed the verbatim case by banning string-identical items. THIS PACKET REPRODUCED THE
 * DEFECT THROUGH THE GAP IN THAT BAN, and did it while fixing a different rule: `reorder.source`
 * (DEBT) requires the sequence to be taught by a flow in the same subsection OR by an extras chain,
 * and the cheapest way to satisfy it is to add the flow — at which point the answer is on the screen.
 * Layer 6 found it on three of the five reorders built that way, in paraphrase, which the packet-25
 * ban could not see.
 *
 * So the check is no longer about identical strings. It asks whether the subsection's OWN flow would
 * source the reorder, using the same paraphrase-tolerant matching `content-validator.mjs:396-410`
 * uses — a shared distinctive word of five letters or more, or a fifth of the vocabulary, matched in
 * order, over half the items. If the answer is yes, the sequence is on the screen.
 *
 * The resolution is not to delete the reorders: it is to source them from an EXTRAS CHAIN, which the
 * validator accepts and which is on a different tab. Five flows were removed here and four chains
 * added, and `reorder.source` still passes on all six.
 */
{
  const tokens = (x) => new Set(String(x).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean));
  const jaccard = (a, b) => { const A = tokens(a), B = tokens(b); const inter = [...A].filter((w) => B.has(w)).length; const uni = new Set([...A, ...B]).size; return uni ? inter / uni : 0; };
  const shareDistinctive = (a, b) => { const A = tokens(a), B = tokens(b); for (const w of A) if (w.length >= 5 && B.has(w)) return true; return false; };
  const sources = (steps, items) => {
    let last = -1, matched = 0;
    for (const item of items) {
      let best = -1, bestScore = 0;
      steps.forEach((st, i) => { if (i <= last) return; const j = Math.max(jaccard(item, st), shareDistinctive(item, st) ? 0.2 : 0); if (j > bestScore) { bestScore = j; best = i; } });
      if (best >= 0 && bestScore >= 0.2) { matched += 1; last = best; }
    }
    return items.length ? matched / items.length >= 0.5 : false;
  };
  for (const sec of SUBSECTIONS) {
    const r = sec.recall;
    if (!r || r.type !== 'reorder') continue;
    const flow = (sec.body || []).find((b) => b.type === 'flow');
    if (!flow) continue;
    const steps = (flow.steps || []).map((x) => (typeof x === 'object' ? x.title : x));
    if (sources(steps, r.correctOrder || [])) {
      problems.push(`"${sec.title}": the flow box on this same step teaches the reorder's sequence, so the answer is on the screen above it — source the reorder from an extras chain instead (Layer 6, packet 27)`);
    }
  }
  /*
   * A/B, run every time (packet 21). The paraphrase Layer 6 found must fire; a flow that teaches
   * something genuinely different from its subsection's reorder must not.
   */
  const flowThatGivesItAway = ['A known product, known buyers', 'A known product, new buyers', 'A new product, known buyers', 'A new product, new buyers'];
  const reorderItems = ['Selling more of a known product to known buyers', 'Taking a known product to buyers it does not have', 'Bringing an unknown product to buyers it knows', 'Building an unknown product for buyers it does not have'];
  const unrelatedFlow = ['Mission statement', 'Corporate aims', 'Corporate objectives'];
  if (!sources(flowThatGivesItAway, reorderItems)) problems.push('the copy-from-screen check no longer fires on the paraphrased flow Layer 6 found');
  if (sources(unrelatedFlow, reorderItems)) problems.push('the copy-from-screen check fires on a flow that teaches something else');
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
/*
 * THE FREE-QUIZ CEILING IS A FUNCTION OF BLOCK COUNT (packet 25's measured table). `freeQuizPayload()`
 * spends PREVIEW_LIMITS.quiz (2) on the Quiz tab, then one pin per block, then the pre-test's headroom,
 * all bounded by FREE_QUIZ_MAX (10). At EIGHT blocks a signed-out student's pre-test drops from three
 * questions to two; at NINE a chapter is served no check-in quiz at all. This section is SEVEN by
 * design, which is the largest block count that still leaves a signed-out student a full pre-test.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz at all for a signed-out student (lib/preview-limits.js)`);
if (BLOCKS.length === 8) console.log('\nNOTE: at 8 blocks a signed-out student\'s pre-test is 2 questions, not 3.');
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  for (const i of flat) if (unpinned.has(i)) problems.push(`quiz item ${i} is pinned by a block AND left for the pre-test pool ("${QUIZ[i].question.slice(0, 50)}")`);
  for (const b of BLOCKS) for (const i of quizIndices[b]) if (QUIZ[i].block !== b) problems.push(`block "${b}" pins quiz item ${i}, which belongs to "${QUIZ[i].block || 'the pre-test'}"`);
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity)');
}
/*
 * structure-04 named the specific mismatch: five of ten items tested material no chapter taught. Each
 * block's LEAD item must be about that block.
 */
for (const [b, needle, what] of [
  [B1, /mission|corporate objective|corporate aims/i, 'mission, aims and corporate objectives'],
  [B2, /Ansoff|new country|diversification|matrix/i, "Ansoff's Matrix"],
  [B3, /Porter|dimensions|cost leader|focus/i, "Porter's Strategic Matrix"],
  [B4, /portfolio|market.*growing|revenue/i, 'portfolio analysis'],
  [B5, /strategic|tactical|resource/i, 'strategic and tactical decisions'],
  [B6, /SWOT|internal|external|item/i, 'SWOT'],
  [B7, /PESTLE|force|market growing|external/i, 'external influences'],
]) {
  const lead = QUIZ[(quizIndices[b] || [])[0]]?.question || '';
  if (!needle.test(lead)) problems.push(`block "${b}" opens its check-in with an item that is not about ${what}: "${lead.slice(0, 60)}" (structure-04)`);
}

/* ── the figures, recomputed here rather than trusted ──────────────────────── */
{
  const sum = A.lines.reduce((n, l) => n + l.revenue, 0);
  if (sum !== A.totalRevenue) problems.push(`the four lines sum to ${sum} and the total is ${A.totalRevenue}`);
  for (const l of A.lines) {
    if (round2((100 * l.revenue) / A.totalRevenue) !== l.revenueShare) problems.push(`${l.name}: revenue share ${l.revenueShare} disagrees with ${l.revenue}/${A.totalRevenue}`);
    if (round2(l.marketSize * (l.share / 100)) !== l.revenue) problems.push(`${l.name}: ${l.share}% of a ${l.marketSize} market is not ${l.revenue}`);
  }
  if (A.fastRevenueShare + A.slowRevenueShare !== 100) problems.push('the fast and slow revenue shares do not sum to 100');
  if (round2((100 * DECISIONS.strategic.capital) / A.totalRevenue) !== CAPITAL_SHARE) problems.push('the capital share disagrees with the capital and the revenue');
  /*
   * THE CLAIM THE WHOLE PORTFOLIO CHAPTER RESTS ON, asserted rather than assumed: the firm is strongest
   * where the market grows slowest. If this ever stops being true, four subsections, a diagram, a chain,
   * three quiz items and a practice item all stop making their point.
   */
  const byGrowth = [...A.lines].sort((a, b) => a.growth - b.growth);
  if (!(byGrowth[0].share > byGrowth[byGrowth.length - 1].share)) problems.push('the firm is not strongest in its slowest-growing market, which is what the portfolio chapter is about');
  if (!(A.slowRevenueShare > A.fastRevenueShare * 2)) problems.push(`the revenue is not clearly concentrated in the slow-growing lines (${A.slowRevenueShare} against ${A.fastRevenueShare})`);
}

/* ── diagram content, re-derived from the emitted SVG ──────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the chain, and the appraisal
  const [chain, appraisal] = svgOf(DIAGRAMS[0]);
  for (const level of ['Mission statement', 'Corporate aims', 'Corporate objectives']) {
    has(chain, `>${level}</text>`, `the chain table has no row for "${level}"`);
  }
  has(appraisal, 'The case for one', 'the appraisal table does not give the case FOR a mission statement');
  has(appraisal, 'The case against', 'the appraisal table does not give the case AGAINST (1b asks for a CRITICAL appraisal)');
}
/*
 * THE THREE MATRICES, each re-derived: both dimension names, both values of each dimension, and all
 * four cell titles. topFix-02 asks for exactly these three diagrams and the section had none.
 */
for (const [d, cells, xName, xValues, yName, yValues] of [
  [DIAGRAMS[1], ANSOFF_CELLS, 'Markets', ['Existing markets', 'New markets'], 'Products', ['Existing', 'New']],
  [DIAGRAMS[2], PORTER_CELLS, 'Source of advantage', ['Lower cost', 'Being different'], 'Target', ['Broad', 'Narrow']],
  [DIAGRAMS[5], SWOT_CELLS, 'Effect', ['Helps', 'Holds back'], 'Origin', ['Internal', 'External']],
]) {
  const [grid] = svgOf(d);
  has(grid, `${yName} ↓`, `${d.title}: the vertical dimension is not named "${yName}"`);
  has(grid, `${xName} →`, `${d.title}: the horizontal dimension is not named "${xName}"`);
  for (const v of [...xValues, ...yValues]) has(grid, `>${v}</text>`, `${d.title}: the dimension value "${v}" is not on the grid`);
  for (const cell of cells.flat()) has(grid, `>${cell}</text>`, `${d.title}: the cell "${cell}" is not drawn`);
  if (cells.flat().length !== 4) problems.push(`${d.title}: ${cells.flat().length} cells, and a matrix built from two dimensions has four`);
  if (!Array.isArray(d.checklist) || d.checklist.length < 4) problems.push(`${d.title}: a diagram a student is asked to Construct carries a checklist of what a correct one shows`);
}
{ // 4 · the portfolio, every figure from the util module
  const [portfolio, aim] = svgOf(DIAGRAMS[3]);
  for (const l of A.lines) {
    has(portfolio, `>${l.name}</text>`, `the portfolio table has no row for ${l.name}`);
    has(portfolio, `>${money(l.revenue)}</text>`, `the portfolio table does not print ${l.name}'s revenue as ${money(l.revenue)}`);
    has(portfolio, `>${pc(l.growth)}</text>`, `the portfolio table does not print ${l.name}'s market growth as ${pc(l.growth)}`);
  }
  has(aim, 'Is the set balanced?', 'the aim table does not ask whether the set is balanced');
  /* The note wraps, so "Boston Matrix" can be split across two <text> elements and a check for the
   * phrase reads false on a diagram that carries it. Each half is checked on its own. */
  has(aim, 'Boston', 'the aim table does not name the Boston Matrix as the tool this analysis is usually drawn with');
  has(aim, '1.3.3', 'the aim table does not say where the Boston Matrix actually belongs (1.3.3, Unit 1)');
}
{ // 5 · the four tests, and the three resources 2c names
  const [tests, resources] = svgOf(DIAGRAMS[4]);
  for (const test of ['Time horizon', 'Scope', 'Reversible?', 'Decided by']) has(tests, `>${test}</text>`, `the tests table has no row for "${test}"`);
  for (const r of ['Human', 'Physical', 'Financial']) has(resources, `>${r}</text>`, `the resources table has no row for ${r} — 2c names all three`);
  has(resources, money(DECISIONS.strategic.capital), `the resources table does not print the capital as ${money(DECISIONS.strategic.capital)}`);
}
{ // 7 · all six PESTLE letters and all five forces
  const [pestle, forces] = svgOf(DIAGRAMS[6]);
  for (const [letter] of PESTLE_ROWS) has(pestle, `>${letter}</text>`, `the PESTLE table has no row for ${letter} — 4a names all six`);
  if (PESTLE_ROWS.length !== 6) problems.push(`${PESTLE_ROWS.length} PESTLE rows; 4a names six`);
  for (const [force] of FORCES_ROWS) has(forces, `>${force}</text>`, `the forces table has no row for ${force}`);
  if (FORCES_ROWS.length !== 5) problems.push(`${FORCES_ROWS.length} forces; 4c names five`);
}

/* every plotted point inside its canvas (packet 23) */
for (const d of DIAGRAMS) {
  for (const [i, svg] of svgOf(d).entries()) {
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    if (!vb) { problems.push(`${d.title} scenario ${i + 1} has no viewBox`); continue; }
    const [, , vw, vh] = vb.trim().split(/[\s,]+/).map(Number);
    const outside = [];
    for (const m of svg.matchAll(/<(?:line|circle|text|rect|polygon)\b[^>]*>/g)) {
      for (const attr of ['x', 'y', 'x1', 'y1', 'x2', 'y2', 'cx', 'cy']) {
        const v = (m[0].match(new RegExp(`\\b${attr}="(-?[\\d.]+)"`)) || [])[1];
        if (v == null) continue;
        const n = Number(v);
        const limit = /x/.test(attr) ? vw : vh;
        if (n < -2 || n > limit + 2) outside.push(`${attr}=${n} (frame ${limit})`);
      }
    }
    if (outside.length) problems.push(`${d.title} scenario ${i + 1} draws outside its canvas: ${[...new Set(outside)].slice(0, 4).join(', ')}`);
  }
}
/* and the same check for the text's EXTENT, which is the part it cannot see (packet 25) */
for (const d of DIAGRAMS) {
  for (const [i, svg] of svgOf(d).entries()) {
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    if (!vb) continue;
    const [, , vw] = vb.trim().split(/[\s,]+/).map(Number);
    for (const m of svg.matchAll(/<text\b[^>]*>([^<]*)</g)) {
      const tag = m[0];
      const text = m[1];
      const x = Number((tag.match(/\bx="(-?[\d.]+)"/) || [])[1]);
      const size = Number((tag.match(/\bfont-size="([\d.]+)"/) || [])[1] || 10);
      const anchor = (tag.match(/\btext-anchor="(\w+)"/) || [])[1] || 'start';
      if (!Number.isFinite(x)) continue;
      const w = estWidth(text, size);
      const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
      if (left + w > vw + 1 || left < -1) {
        problems.push(`${d.title} scenario ${i + 1}: "${text.slice(0, 40)}" runs from ${round2(left)} to ${round2(left + w)} in a ${vw}-unit frame`);
      }
    }
  }
}
{
  const frame = 560;
  const probe = (text, x, size, anchor) => {
    const w = estWidth(text, size);
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    return left + w > frame + 1 || left < -1;
  };
  if (!probe('welfare loss $50 a day', 456.7, 11, 'start')) problems.push('the text-extent check no longer fires on a label that runs off the frame');
  if (probe('Cost leadership', 300, 13, 'middle')) problems.push('the text-extent check fires on a label that measures inside the frame');
}
/* no two cells on one row overlap */
for (const d of DIAGRAMS) {
  for (const [i, svg] of svgOf(d).entries()) {
    const rows = new Map();
    for (const m of svg.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*>([^<]*)</g)) {
      const [, x, y, size, text] = m;
      const left = Number(x);
      const anchor = (m[0].match(/\btext-anchor="(\w+)"/) || [])[1] || 'start';
      const w = estWidth(text, Number(size));
      const l = anchor === 'middle' ? left - w / 2 : anchor === 'end' ? left - w : left;
      const row = Math.round(Number(y));
      (rows.get(row) || rows.set(row, []).get(row)).push({ left: l, right: l + w, text });
    }
    for (const [row, cells] of rows) {
      cells.sort((a, b) => a.left - b.left);
      for (let k = 1; k < cells.length; k += 1) {
        if (cells[k].left < cells[k - 1].right - 0.5) problems.push(`${d.title} scenario ${i + 1}, row y=${row}: "${cells[k - 1].text}" and "${cells[k].text}" overlap`);
      }
    }
  }
}

/* ── ids, and the figures agreeing across every surface ────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

/*
 * Layer 5 by string: every figure this section carries appears in the body AND somewhere else. Packet
 * 25's lesson — an acceptance check that no code runs is a wish, and the figure it missed appeared once
 * in the whole bundle, as a distractor built from a number the student had never been shown.
 */
const must = [
  money(A.totalRevenue), ...A.lines.map((l) => money(l.revenue)), ...A.lines.map((l) => pc(l.growth)),
  ...A.lines.map((l) => pc(l.share)), money(A.lines[2].marketSize), pc(A.fastRevenueShare), pc(A.slowRevenueShare),
  money(DECISIONS.strategic.capital), pc(CAPITAL_SHARE), String(DECISIONS.strategic.hires),
];
for (const m of [...new Set(must)]) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 27 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views, ${bundle.diagrams.filter((d) => d.kind === 'table').length} tables, 3 matrices) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`\n${A.name}: ${money(A.totalRevenue)} a year across four lines`);
for (const l of A.lines) console.log(`  ${l.name.padEnd(18)} ${money(l.revenue).padStart(6)}  ${pc(l.revenueShare).padStart(5)} of revenue · market ${pc(l.growth).padStart(4)} growth, ${money(l.marketSize).padStart(7)} · share ${pc(l.share)}`);
console.log(`  ${pc(A.slowRevenueShare)} of revenue in the slow markets where it is strongest; ${pc(A.fastRevenueShare)} in the fast ones where it is weakest`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.slice(0, 40).padEnd(40)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 74)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: one currency · no distinctive capabilities, VRIO, core competencies, balanced scorecard, triple bottom line, generic strategies, "three strategies", functional objectives, BCG or a Boston Matrix cell · SMART once per surface · no Outline, Examine or 10-mark Assess · no UK framing or dated claim · no uncited examiner, marker, frequency or paper claim · the two middle Ansoff cells not ranked, with its A/B · every practice tariff in the BUSINESS census with Assess at 12, every command word used, every guidance two paragraphs with a clean opening · both Appendix 6 gloss checks · every block pinned to a quiz, a practice item and a diagram, each on its own topic, none of them the pre-test\'s · every figure re-derived from the four product lines · all three matrices re-derived from the emitted SVG, four cells and both dimensions each · nothing drawn outside its canvas · no text running off a frame · no cell collisions · ids unique · one minus sign');

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

if (DUMP) { const path = `audit/snapshots/packet-27-bundle__business__${SECTION}.json`; writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-27-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${path}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
