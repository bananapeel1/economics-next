#!/usr/bin/env node
/**
 * PACKET 28 — revenue-costs-profits, IAL Economics Unit 3 topic 3.3.2 (34 spec leaves).
 *
 *   node scripts/packet-28-revenue-costs-profits.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-28-revenue-costs-profits.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-28-revenue-costs-profits.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet28-content.mjs (blocks and Notes), scripts/_packet28-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet28-diagrams.mjs (seven diagrams, where the
 * section had four and a student could reach two). This file assembles the bundle, pins each block to
 * its diagram, quiz and practice items, and runs the checks a verifier will run.
 *
 * COPIED FROM PACKET 25 UNCHANGED IN SUBSTANCE, because each exists for a defect that got past
 * everything else: pin ownership; canvas bounds; the text-EXTENT check and its A/B; the table-width
 * guard; the guided opening; the copy-from-screen check and its A/B; the marker-claim check and its
 * A/B; the widened ledger-id and previous-content bans; the block-count guard; and `gridColumns`,
 * which computes each table column from its own widest cell and THROWS rather than laying out a
 * collision. That last one earned its place here on the FIRST run: the source-list tables were refused
 * at 868 units against a frame of 508, before a single collision could be built.
 *
 * AND FOUR THIS PACKET ADDS, all of them because 3.3.2 is arithmetic where earlier sections were prose:
 *
 *   - THE RELATIONSHIP CHECKS. 2d names four relationships between measures — MP↔MC, AP↔AC, TP↔TC and
 *     short-run↔long-run — and each is re-derived here at EVERY row rather than trusted: MC = wage/MP,
 *     AVC = wage/AP, AC = AFC + AVC exactly, MC least where MP greatest, AVC least where AP greatest.
 *     A cost table that disagrees with the product table it came from is the one defect in this section
 *     that a reader would find and no validator rule could.
 *   - THE ENVELOPE CHECK. LRAC(q) ≤ SRAC(q) at every row of the short-run table. A long-run average
 *     cost curve lying above a short-run one is impossible — the long run contains the short run as an
 *     option — and nothing in the schema, the validator or a diff can see it.
 *   - THE ANOTHER-SECTION BAN. Sections 3.3.1 and 3.3.3 sit on either side of this one and share its
 *     vocabulary. Profit maximisation, perfect competition, monopoly, allocative and productive
 *     efficiency, barriers to entry and sunk costs are all theirs, and two ledger items ask this packet
 *     to build the first of them. X-inefficiency is NOT banned and is asserted PRESENT, because two
 *     other ledger items ask for it to be deleted and it is 3.3.2 · 3f-3.
 *   - THE SIGN CHECK, WIDENED. Marginal revenue goes negative in this section's own schedule and price
 *     elasticity of demand is negative on a dozen surfaces, so `money` itself emits U+2212 and the
 *     ASCII-hyphen scan covers every surface rather than only hand-typed figures.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, teachingWords, money, qty, elasticity, round2,
  NADIRA, BAHRI, LONGRUN, INTERNAL_SOURCES, EXTERNAL_SOURCES, DISECONOMY_SOURCES,
} from './_packet28-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7 } from './_packet28-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet28-assessment.mjs';
import { DIAGRAMS, estWidth } from './_packet28-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7];
const N = NADIRA, B = BAHRI, L = LONGRUN;

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a free student's bank is sliced server-side
 * (F086, and freeQuizPayload() since 16 Sep), so a pre-test whose pool sat at the end of the array
 * would serve that student PINNED questions instead.
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
/*
 * The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
 * The search is over the BLOCK'S OWN pool, never the whole bank: searching the bank is how packet 24
 * reserved a pre-test item as a check-in question, silently changing which three the pre-test draws.
 */
const first = (list, needle) => {
  const i = list.find((j) => QUIZ[j].question.includes(needle));
  if (i == null) throw new Error(`no quiz item in this block matching "${needle}"`);
  return [i, ...list.filter((x) => x !== i)];
};
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Total revenue is at its greatest'),
  [B2]: first(quizByBlock[B2], 'total revenue rises'),
  [B3]: first(quizByBlock[B3], 'Marginal product crosses average product'),
  [B4]: first(quizByBlock[B4], 'Marginal cost passes through average cost'),
  [B5]: first(quizByBlock[B5], 'Minimum efficient scale is'),
  [B6]: first(quizByBlock[B6], 'TECHNICAL economy of scale'),
  [B7]: first(quizByBlock[B7], 'In the short run a firm should shut down'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so a
 * `diagramId` on a subsection is never read and the legacy `diagramRef` string is matched by substring
 * against diagram titles. `structure-02` computed what that cost the March section: two of its four
 * diagrams shared no title word with any block and were never shown to anybody, and both of them
 * carried a sub-topic — long-run average cost, and the shutdown points. Every chapter here has one,
 * pinned by id.
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
// Ids are excluded from every text check: scanning a slug as if it were prose reports a word no
// reader ever sees.
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
// The SVG source is excluded from the prose scans and checked separately: its attribute names and
// colour values are not sentences, and a <text> element is read back by the geometry checks below.
const prose = texts.filter((s) => !s.startsWith('<svg'));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€|¥/g, 'a currency other than dollars (locale.currency)');

/*
 * OFF-SPEC VOCABULARY, each with the count that settles it. Ninth instance of the
 * packet 13/16/17/18/20/22/23/24/25 rule.
 */
ban(/\bprice[- ]tak(er|ers|ing)\b|\bprice[- ]mak(er|ers|ing)\b/gi, '"price taker" or "price maker" (0 each in econ_spec.txt — structure-06 is right about the ORDER and wrong about the words; 1a asks for the relationship between the three revenue measures and the two cases are taught in the spec\'s own terms)');
ban(/\beconom(y|ies) of scope\b/gi, '"economies of scope" (0 in econ_spec.txt — it was a March flashcard, structure-05)');
ban(/\breturns to scale\b/gi, '"returns to scale" (0 in econ_spec.txt; the spec\'s phrases are economies and diseconomies of scale)');
ban(/\bdiminishing marginal returns\b/gi, '"diminishing marginal returns" (0 in econ_spec.txt — the spec says "the law of diminishing returns" at 2b and "diminishing marginal productivity" at 2a)');
ban(/\baccounting profit\b|\beconomic profit\b/gi, '"accounting profit" or "economic profit" (0 each in econ_spec.txt — specGap-06 asks for the distinction and is unsure whether it is in scope; it is not. 4a names normal profit, supernormal profit and losses)');
ban(/\bbulk[- ]buy/gi, '"bulk buying" (`bulk` is 0 in econ_spec.txt; 3d-5 is "purchasing")');

/*
 * ANOTHER SECTION'S VOCABULARY. 3.3.1 is `types-sizes-businesses` (packet 20, built 16 Sep) and 3.3.3
 * is `market-structures-contestability` (packet 29). They sit either side of this section and share
 * its apparatus, and TWO ledger items ask this packet to build the first of them.
 */
ban(/\bprofit[- ]maximis|\bprofit[- ]maximiz|\bprofit[- ]max\b/gi, 'profit maximisation (econ_spec.txt:1278 and :1285, topic 3.3.1 · 3 — packet 20\'s section — and "profit-maximising equilibrium" at :1374, :1383 and :1426, all 3.3.3. topFix-04 and structure-01 both ask for it; 3.3.2 · 4 asks only for the DISTINCTION between normal profit, supernormal profit and losses)');
ban(/\bMR\s*=\s*MC\b|\bMC\s*=\s*MR\b/g, 'the MR = MC rule (3.3.3 · 3b, :1374 — packet 29\'s section)');
ban(/\brevenue maximis|\bsales volume maximis|\bsatisfic|\bprincipal[- ]agent\b/gi, 'a business objective (econ_spec.txt:1279-1286, topic 3.3.1 · 3 — packet 20\'s section)');
ban(/\bperfect(ly)? competit/gi, '"perfect competition" (econ_spec.txt:1373, topic 3.3.3 · 3 — packet 29\'s section)');
ban(/\bmonopol(y|ies|ist|istic)\b|\boligopol/gi, 'monopoly or oligopoly (econ_spec.txt:1388-1431, topic 3.3.3 — packet 29\'s section)');
ban(/\ballocativ(e|ely)\b/gi, '"allocative efficiency" (econ_spec.txt:1364, topic 3.3.3 · 1a — structure-04 and specGap-07 are right about this one)');
ban(/\bproductive(ly)? (efficien|inefficien)/gi, '"productive efficiency" (econ_spec.txt:1365, topic 3.3.3 · 1a — topFix-03 asks for a sentence about it to be QUALIFIED; it is removed instead)');
ban(/\bdynamic efficien/gi, '"dynamic efficiency" (econ_spec.txt:1366, topic 3.3.3 · 1a)');
ban(/\bbarriers? to (entry|exit)\b/gi, '"barriers to entry" (econ_spec.txt:1386 and :1425, topic 3.3.3)');
ban(/\bsunk costs?\b/gi, '"sunk cost" (econ_spec.txt:1391 and :1440, topic 3.3.3)');
ban(/\bcontestab/gi, '"contestability" (topic 3.3.3 — packet 29\'s section)');
/*
 * AND THE ONE THAT IS NOT BANNED, recorded here so nobody bans it later, and ASSERTED PRESENT below.
 * `X-inefficiency` is econ_spec.txt:1339, which is 3.3.2 · 3f-3 — one of exactly three sources of
 * diseconomies of scale, a requirement of THIS section. `structure-04` and `specGap-07` both list it
 * beside allocative, productive and dynamic efficiency and ask for all four to be moved out as 3.3.3
 * material. Three of the four are banned above. Obeying the fourth would have deleted a leaf.
 */

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the March practice[4] used it)');
ban(/\bAssess\b/g, '"Assess" (a BUSINESS command word; not an IAL ECONOMICS command word at any tariff — the March practice[2] was an Assess 10, and topFix-05 asks for its guidance to be re-presented rather than for the item to be replaced)');
ban(/\b10.mark|\(10 marks\)|\(12 marks\)/g, 'a 10- or 12-mark item (Economics has neither tariff; both are Business Assess)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|the Chancellor|Office for National Statistics)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(ONS|OBR|DWP|CAP)\b/g, 'a UK-only or EU-only acronym (locale.institution)');
ban(/\b(the UK|United Kingdom|Britain|British|London|England|English)\b/g, 'a UK framing (an international cohort sits WEC13 in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya)');
/*
 * THE TWO NAMED COMPANIES accuracy-01 and accuracy-02 found. Neither is corrected and neither is
 * replaced by another real firm: the first said airlines sell early seats dear and late seats cheap,
 * which is backwards, and the second said a firm reporting billions in losses was earning supernormal
 * profit. Both were dated claims about a real market that this repository cannot check, so the SHAPE
 * is banned rather than the two names — a four-digit year anywhere a student reads, below.
 */
ban(/\bBritish Airways\b|\bOpenAI\b/gi, 'a company named in accuracy-01 or accuracy-02');

/*
 * AN INTERNAL LEDGER ID IN TEXT A STUDENT READS, in the widened form packet 25 settled on: the bare
 * id as well as the parenthesised one, because the parentheses were never what made it wrong.
 */
ban(/\b(?:specGap|topFix|structure|accuracy|specThin)-\d+\b/g, 'an internal ledger id left in text a student reads');
ban(/\((?:quiz|practice|diagram)-\d+\)/g, 'an internal ledger id left in text a student reads');
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — where a student reads it');
ban(/\b(the|this) (March |previous |old )?(version|section|copy|item|content|bank|quiz) (used to|previously|once) \b|\bthe March (version|section|copy|item|content|bank|quiz)\b|\bin the previous version\b|\bused to say\b|\bthe section\'s own (quiz|notes|body|card)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/* NO DATED CLAIM ABOUT A REAL MARKET (accuracy-01 and accuracy-02 were both). */
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (/\b(19|20)\d{2}\b/.test(sent)) problems.push(`a dated claim about a real market: "${sent.trim().slice(0, 90)}"`);

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert the same thing without
 * naming them — "that earns half the marks", "scores poorly" — and pass untouched (packet 16). A point
 * ALLOCATION is not a claim about a marker, and packet 25 found this check could not tell them apart
 * in a topic full of the word "cost"; the allocation shape is stripped before the sentence is tested.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
/* A/B, run every time (packet 21: a guard nothing has ever disagreed with is a claim about itself). */
{
  const mustFire = [
    'A chain that stops at the diagram earns half the marks (3 marks) available.',
    'An answer without a diagram scores poorly.',
    'Mark schemes accept a cost diagram here.',
    'Naming the curve costs you a mark (1 mark) if you get it wrong.',
  ];
  const mustNotFire = [
    'Marginal cost is the wage divided by marginal product (1 mark).',
    'Average fixed cost falls at every level of output (1 mark).',
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
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);

/* ── practice: the exam shape, against ECONOMICS' own Appendix 6 ───────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice "${pItem.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!pItem.question.includes(`(${pItem.marks} marks)`)) problems.push(`practice ${pItem.command}: the stem does not say "(${pItem.marks} marks)"`);
  if (pItem.marks > 6 && /\(\d+\s*marks?\)/.test(pItem.guidance)) problems.push(`practice ${pItem.command} (${pItem.marks}): guidance allocates points, but tariffs above 6 are levels-marked (practice.levels)`);
}
for (const cmd of ['Define', 'Calculate', 'Draw', 'Explain', 'Analyse', 'Examine', 'Discuss', 'Evaluate']) {
  if (!PRACTICE.some((x) => x.command === cmd)) problems.push(`no practice item uses the Economics command word "${cmd}"`);
}

/*
 * THE FIRST PARAGRAPH OF A GUIDANCE IS SHOWN BEFORE THE STUDENT WRITES, so it may not contain the
 * answer. `InlinePractice.jsx` in GUIDED mode prints `guidance.split('\n')[0]` above the answer box and
 * hides the rest behind "See full guidance"; `getPracticeMode` puts every item except the first and
 * last of a section into that mode (LearnModeTab.jsx:249-256). In a topic this numerical the "=" test
 * matters more than anywhere: four of these ten items are calculations.
 */
for (const x of PRACTICE) {
  const paras = String(x.guidance).split('\n').filter(Boolean);
  if (paras.length < 2) problems.push(`practice ${x.command}: one-paragraph guidance, so guided mode prints the whole mark scheme above the answer box`);
  const opening = paras[0] || '';
  if (/\(\s*\d+\s*marks?\s*\)/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph allocates marks, and it is shown BEFORE the student writes`);
  if (/=/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph contains a worked calculation, and it is shown BEFORE the student writes`);
}

/*
 * THE BANK-LEVEL GAP, kept as a check rather than as a memory. The March practice bank had five items
 * and covered two of this topic's four sub-topics; there was nothing at all on the revenue measures
 * beyond a definition, on elasticity, on the seven cost formulae or on minimum efficient scale.
 */
for (const [needle, what] of [
  [/marginal revenue/i, 'marginal revenue'], [/elastic/i, 'price elasticity of demand'],
  [/diminishing returns/i, 'the law of diminishing returns'], [/average variable cost/i, 'the cost measures'],
  [/minimum efficient scale/i, 'minimum efficient scale'], [/normal profit/i, 'normal profit'],
  [/loss/i, 'losses and the shutdown decision'],
]) {
  if (!PRACTICE.some((x) => needle.test(x.question))) problems.push(`no practice item covers ${what}`);
}

/* A gloss that cites Appendix 6 must say what Appendix 6 says (packet 21) and must not bolt an extra
 * requirement onto it (packet 23). Both checks carried unchanged. */
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
{
  const APPENDIX_CLAIMS = [
    [/\bdiagram/i, /diagram/i, 'diagrams'],
    [/\binterpret/i, /interpret/i, 'interpretation'],
    [/\bworkings?\b/i, /workings/i, 'showing workings'],
    [/chains? of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
    [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'],
    [/\bdepth rather than breadth\b/i, /depth rather than breadth/i, 'depth rather than breadth'],
    [/\bjudgement/i, /judgements?/i, 'a judgement'],
    [/different viewpoints/i, /different viewpoints/i, 'different viewpoints'],
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

/* THE LENGTH TELL THE VALIDATOR CANNOT SEE (packet 25): a systematic tendency for the key to be the
 * longest of the four survives the render-time shuffle, unlike answer position. */
{
  const longest = bundle.quiz.filter((x) => {
    const c = String(x.options[x.correctIndex]).length;
    return x.options.every((o, j) => j === x.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/* A REORDER MAY NOT BE THE FLOW BOX ON THE SCREEN ABOVE IT (packet 25's copy-from-screen check). */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flow = (sec.body || []).find((b) => b.type === 'flow');
  if (!flow) continue;
  const titles = new Set((flow.steps || []).map((x) => (typeof x === 'object' ? x.title : x)));
  const copied = (r.correctOrder || []).filter((x) => titles.has(x));
  if (copied.length) problems.push(`"${sec.title}": ${copied.length} of ${r.correctOrder.length} reorder items are the flow box on the same step, word for word — a copy-from-screen task (structure-04): "${copied[0].slice(0, 50)}"`);
}
{
  const flowTitles = new Set(['The firm lowers its price to sell one more']);
  const fires = (items) => items.filter((x) => flowTitles.has(x)).length > 0;
  if (!fires(['The firm lowers its price to sell one more'])) problems.push('the copy-from-screen check no longer fires on a verbatim flow step');
  if (fires(['The firm drops its price in order to sell one more'])) problems.push('the copy-from-screen check fires on a paraphrase, which `reorder.source` is designed to accept');
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
/*
 * THE FREE-QUIZ CEILING IS A FUNCTION OF BLOCK COUNT (packet 25, measured). `freeQuizPayload()` spends
 * PREVIEW_LIMITS.quiz (2) on the Quiz tab, then one pin per block, then tops up the pre-test's
 * headroom — all bounded by FREE_QUIZ_MAX (10). At EIGHT blocks a signed-out student's pre-test drops
 * from three questions to two; at NINE a chapter loses its check-in question outright. This section is
 * SEVEN blocks deliberately, which leaves the headroom intact.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz at all for a signed-out student (lib/preview-limits.js). Split the section or raise the cap with the founder.`);
if (BLOCKS.length === 8) console.log('\nNOTE: at 8 blocks a signed-out student\'s pre-test is 2 questions, not 3.');
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  for (const i of flat) if (unpinned.has(i)) problems.push(`quiz item ${i} is pinned by a block AND left for the pre-test pool ("${QUIZ[i].question.slice(0, 50)}")`);
  for (const b of BLOCKS) for (const i of quizIndices[b]) if (QUIZ[i].block !== b) problems.push(`block "${b}" pins quiz item ${i}, which belongs to "${QUIZ[i].block || 'the pre-test'}"`);
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity) — which is the March section\'s structure-02 exactly');
}
/* Each block's LEAD check-in item must be about that block (structure-02 named four mis-pins). */
for (const [b, needle, what] of [
  [B1, /revenue|AR|MR/i, 'the revenue measures'],
  [B2, /elastic|price cut|elasticity/i, 'price elasticity of demand'],
  [B3, /product|diminishing|marginal cost/i, 'the product curves'],
  [B4, /cost/i, 'the cost measures'],
  [B5, /long run|minimum efficient scale|LRAC|short-run average/i, 'the long run'],
  [B6, /scale|economies|TECHNICAL/i, 'economies of scale'],
  [B7, /profit|shut down|supernormal/i, 'profit and the shutdown points'],
]) {
  const lead = QUIZ[(quizIndices[b] || [])[0]]?.question || '';
  if (!needle.test(lead)) problems.push(`block "${b}" opens its check-in with an item that is not about ${what}: "${lead.slice(0, 60)}"`);
}

/* ── the arithmetic, recomputed here rather than trusted ───────────────────── */
/*
 * NADIRA — 1a's relationship between the three revenue measures, re-derived from the demand line.
 */
for (const r of N.schedule) {
  if (r.tr !== round2(r.ar * r.q)) problems.push(`revenue schedule: TR at Q=${r.q} is ${money(r.tr)}, not price × quantity`);
  if (r.ar !== round2(N.a - N.b * r.q)) problems.push(`revenue schedule: AR at Q=${r.q} is not the demand line`);
}
/*
 * MR IS THE SLOPE OF TR, CHECKED AS ONE — the twice-the-gradient claim is the whole of this chapter
 * and asserting it is not the same as deriving it. The discrete marginal revenue between two rows must
 * equal the continuous MR at their MIDPOINT, which is the only honest way to print a formula beside a
 * schedule read in steps of two.
 */
for (let i = 1; i < N.schedule.length; i += 1) {
  const a = N.schedule[i - 1], b = N.schedule[i];
  const discrete = round2((b.tr - a.tr) / (b.q - a.q));
  const atMid = N.mr(round2((a.q + b.q) / 2));
  if (discrete !== atMid) problems.push(`marginal revenue between Q=${a.q} and Q=${b.q} is ${money(discrete)} from the totals and ${money(atMid)} from the formula`);
}
if (N.mr(N.trMaxQ) !== 0) problems.push(`marginal revenue at Q=${N.trMaxQ} is ${money(N.mr(N.trMaxQ))}, not zero, so total revenue does not peak there`);
if (N.trMax !== Math.max(...N.schedule.map((r) => r.tr))) problems.push('the quantity where MR = 0 is not where total revenue is greatest in the schedule');
if (round2(N.ped(N.trMaxQ)) !== -1) problems.push(`price elasticity of demand where MR = 0 is ${elasticity(N.ped(N.trMaxQ))}, not ${elasticity(-1)} — the whole of 1b's link between elasticity and revenue`);
/* The two worked cases must sit on opposite sides of unit elasticity and move revenue opposite ways. */
if (!(N.elastic.ped < -1)) problems.push(`the "elastic" case has PED ${elasticity(N.elastic.ped)}, which is not elastic`);
if (!(N.inelastic.ped > -1 && N.inelastic.ped < 0)) problems.push(`the "inelastic" case has PED ${elasticity(N.inelastic.ped)}, which is not inelastic`);
if (!(N.elastic.tr1 > N.elastic.tr0)) problems.push('a price cut on the elastic part of the demand line does not raise total revenue');
if (!(N.inelastic.tr1 < N.inelastic.tr0)) problems.push('a price cut on the inelastic part of the demand line does not lower total revenue');
if (N.elastic.tr0 !== N.inelastic.tr0) problems.push(`the two worked cases start from different revenues (${money(N.elastic.tr0)} and ${money(N.inelastic.tr0)}); the contrast the chapter draws needs one starting point`);
if (N.elastic.p0 - N.elastic.p1 !== N.inelastic.p0 - N.inelastic.p1) problems.push('the two worked price cuts are not the same size in cash, so the comparison is not like for like');

/*
 * BAHRI — 2c and 2d, every relationship re-derived at EVERY row. This is the check this packet adds,
 * and it is the one a reader of the table could do themselves.
 */
for (const r of B.rows) {
  if (r.tc !== round2(r.tfc + r.tvc)) problems.push(`cost table L=${r.l}: TC ${money(r.tc)} is not TFC + TVC`);
  if (r.tvc !== round2(B.wage * r.l)) problems.push(`cost table L=${r.l}: TVC is not the wage times the workers`);
  if (r.q === 0) continue;
  if (r.ac !== round2(r.tc / r.q)) problems.push(`cost table Q=${r.q}: AC is not TC ÷ Q`);
  if (r.afc !== round2(r.tfc / r.q)) problems.push(`cost table Q=${r.q}: AFC is not TFC ÷ Q`);
  if (r.avc !== round2(r.tvc / r.q)) problems.push(`cost table Q=${r.q}: AVC is not TVC ÷ Q`);
  /* AC = AFC + AVC TO THE PENNY. The table stops at five workers because at six it does not. */
  if (round2(r.afc + r.avc) !== r.ac) problems.push(`cost table Q=${r.q}: AFC ${money(r.afc)} + AVC ${money(r.avc)} = ${money(round2(r.afc + r.avc))}, which is not AC ${money(r.ac)} — a student reading the row would find this`);
  if (r.mc !== round2(B.wage / r.mp)) problems.push(`cost table Q=${r.q}: MC ${money(r.mc)} is not wage ÷ MP (2d-1)`);
  if (r.avc !== round2(B.wage / r.ap)) problems.push(`cost table Q=${r.q}: AVC ${money(r.avc)} is not wage ÷ AP (2d-2)`);
  if (r.ap !== round2(r.q / r.l)) problems.push(`cost table L=${r.l}: AP is not TP ÷ L`);
}
{
  const withMp = B.rows.filter((r) => r.mp != null);
  const bestMp = withMp.reduce((a, b) => (b.mp > a.mp ? b : a));
  const leastMc = withMp.reduce((a, b) => (b.mc < a.mc ? b : a));
  if (bestMp.l !== leastMc.l) problems.push(`marginal product is greatest at L=${bestMp.l} and marginal cost is least at L=${leastMc.l}; 2d-1 says they are the same row`);
  const bestAp = withMp.reduce((a, b) => (b.ap > a.ap ? b : a));
  if (round2(B.wage / bestAp.ap) !== B.minAvc) problems.push('average variable cost is not least where average product is greatest (2d-2)');
  /* Diminishing returns must actually set in, or 2b is being asserted and not shown. */
  const falls = withMp.slice(1).filter((r, i) => r.mp < withMp[i].mp).length;
  if (falls < 2) problems.push(`marginal product falls at only ${falls} step(s); the law of diminishing returns is not visible in the table`);
  if (withMp[0].mp >= withMp[1].mp) problems.push('marginal product does not RISE first, so the word "eventually" in the law has nothing to stand on');
  /* MC cuts AC at AC's minimum — the property every cost diagram turns on, derived not drawn. */
  const cut = B.rows.find((r) => r.mc === B.minAc);
  if (!cut || cut.ac !== B.minAc) problems.push(`no row has MC equal to AC at AC's minimum of ${money(B.minAc)}; the crossing is asserted in three places and would not be visible in the table`);
  if (!(B.rows.findIndex((r) => r.avc === B.minAvc) <= B.rows.findIndex((r) => r.ac === B.minAc))) problems.push('AVC reaches its minimum AFTER AC does, which is impossible while average fixed cost is still falling');
  /* AFC falls at every row, without exception — specThin-01 is that it was never explained. */
  const afcs = B.rows.filter((r) => r.afc != null).map((r) => r.afc);
  if (!afcs.every((v, i) => i === 0 || v < afcs[i - 1])) problems.push('average fixed cost does not fall at every row, which a constant divided by a growing number must');
}

/*
 * THE ENVELOPE, AND THE TANGENCY. LRAC(q) ≤ SRAC(q) at every row, because the long run contains the
 * short run as an option. But the inequality alone is not enough and Layer 6 found why: a long-run
 * curve lying STRICTLY below every short-run point says the plant the student has spent two chapters
 * on is the best plant for no output at all. So the two must also TOUCH, at this plant's own minimum.
 */
for (const r of B.rows.filter((x) => x.ac != null)) {
  if (L.lrac(r.q) > r.ac) problems.push(`long-run average cost at ${qty(r.q)} ${B.units} is ${money(L.lrac(r.q))}, ABOVE the short-run ${money(r.ac)} — the long run contains the short run as an option, so this cannot happen`);
}
{
  const touching = B.rows.filter((r) => r.ac != null && L.lrac(r.q) === r.ac);
  if (!touching.length) problems.push(`the long-run curve never touches this plant's short-run curve — at ${qty(B.ref.q)} ${B.units} they are ${money(L.lrac(B.ref.q))} and ${money(B.ref.ac)}. The envelope holds and the plant taught in chapters 3 and 4 is the best plant for no output at all`);
  else if (!touching.some((r) => r.ac === B.minAc)) problems.push(`the long-run curve touches this plant somewhere other than its minimum (${touching.map((r) => qty(r.q)).join(', ')} ${B.units})`);
}
/* Minimum efficient scale is DERIVED — the lowest output at which LRAC is least — not typed. */
{
  const least = Math.min(...L.outputs.map((q) => L.lrac(q)));
  const firstAt = L.outputs.find((q) => L.lrac(q) === least);
  if (least !== L.floor) problems.push(`the least long-run average cost on the schedule is ${money(least)}, not ${money(L.floor)}`);
  if (firstAt !== L.mes) problems.push(`the LOWEST output achieving the minimum is ${qty(firstAt)}, not the ${qty(L.mes)} the section calls minimum efficient scale (3b)`);
  if (!(L.flatTo > L.mes)) problems.push('the LRAC minimum is a single point, so the distinction between minimum efficient scale and the rest of the flat stretch has nothing to stand on');
  if (!(L.lrac(L.outputs[0]) > L.floor)) problems.push('long-run average cost does not fall before minimum efficient scale, so there are no economies of scale to show');
  if (!(L.lrac(L.outputs[L.outputs.length - 1]) > L.floor)) problems.push('long-run average cost does not rise after the flat stretch, so there are no diseconomies of scale to show');
}

/* THE FOUR PROFIT CASES: one output, one cost column, four prices, four different outcomes. */
{
  const { supernormal: sup, normal: nor, shortRunLoss: srl, shutdown: sd } = B;
  for (const [name, o] of [['supernormal', sup], ['normal', nor], ['short-run loss', srl], ['shutdown', sd]]) {
    if (o.revenue !== round2(o.price * B.ref.q)) problems.push(`the ${name} case: revenue is not price × quantity`);
    if (o.profit !== round2(o.revenue - B.ref.tc)) problems.push(`the ${name} case: profit is not revenue − total cost`);
  }
  if (!(sup.profit > 0)) problems.push('the supernormal case does not produce a profit above zero');
  if (nor.profit !== 0) problems.push(`the normal-profit case shows ${money(nor.profit)}, not zero — AR must equal AC exactly`);
  if (nor.price !== B.ref.ac) problems.push('the normal-profit price is not average cost');
  if (!(srl.profit < 0 && Math.abs(srl.profit) < B.tfc)) problems.push(`the short-run loss case loses ${money(Math.abs(srl.profit))} against ${money(B.tfc)} for shutting down; it must be the SMALLER loss or the chapter's whole argument fails`);
  if (!(sd.profit < 0 && Math.abs(sd.profit) > B.tfc)) problems.push(`the shutdown case loses ${money(Math.abs(sd.profit))}, which is not worse than the ${money(B.tfc)} of stopping`);
  if (!(srl.price > B.ref.avc && srl.price < B.ref.ac)) problems.push('the short-run loss price is not between average variable cost and average cost, so it does not illustrate the rule');
  if (!(sd.price < B.ref.avc)) problems.push('the shutdown price is not below average variable cost');
  /* The contribution identity: producing beats stopping by exactly (P − AVC) × Q. */
  if (round2(B.tfc - Math.abs(srl.profit)) !== srl.contribution) problems.push(`the saving from producing at ${money(srl.price)} is ${money(round2(B.tfc - Math.abs(srl.profit)))}, which is not (price − AVC) × quantity = ${money(srl.contribution)}`);
}

/* ── the specification's own lists, asserted by length and by content ──────── */
if (INTERNAL_SOURCES.length !== 6) problems.push(`3d names six sources of internal economies of scale; this section has ${INTERNAL_SOURCES.length}`);
if (EXTERNAL_SOURCES.length !== 3) problems.push(`3e names three sources of external economies of scale; this section has ${EXTERNAL_SOURCES.length}`);
if (DISECONOMY_SOURCES.length !== 3) problems.push(`3f names three sources of diseconomies of scale; this section has ${DISECONOMY_SOURCES.length}`);
for (const [name, list] of [['internal', INTERNAL_SOURCES], ['external', EXTERNAL_SOURCES], ['diseconomies', DISECONOMY_SOURCES]]) {
  for (const row of list) if (row.length !== 3) problems.push(`the ${name} list has a row without both a short and a long form: "${row[0]}"`);
}
/*
 * X-INEFFICIENCY, ASSERTED PRESENT. Two ledger items ask for it to be moved out of this section as
 * 3.3.3 material; econ_spec.txt:1339 puts it at 3.3.2 · 3f-3. A ban would be a silent deletion, so the
 * opposite of a ban is written here: it must appear as one of the three diseconomies, in the teaching
 * body, in a quiz item and in the diagram a student sees.
 */
if (!DISECONOMY_SOURCES.some(([n]) => /X-inefficiency/i.test(n))) problems.push('X-inefficiency is not one of the three sources of diseconomies (econ_spec.txt:1339 is 3.3.2 · 3f-3 — structure-04 and specGap-07 ask for it to be removed and are wrong)');
for (const [where, strings] of [['the teaching body', allStrings(bundle.content)], ['the quiz', allStrings(bundle.quiz)], ['the diagrams', allStrings(bundle.diagrams)], ['the notes', allStrings(bundle.notes)]]) {
  if (!strings.some((s) => /X-inefficiency/i.test(s))) problems.push(`X-inefficiency does not appear in ${where}; it is 3.3.2 · 3f-3 and this section is its only owner`);
}

/* ── diagram content, re-derived from the emitted SVG ──────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the revenue schedule and the two curves
  const [schedule, curves] = svgOf(DIAGRAMS[0]);
  for (const r of N.schedule) has(schedule, `>${money(r.tr)}</text>`, `the revenue schedule has no cell reading TR ${money(r.tr)} at Q=${r.q}`);
  has(schedule, `>${money(0)}</text>`, 'the revenue schedule never prints MR = $0, which is the row the chapter turns on');
  has(curves, `MR = ${N.a} ${'−'} ${N.b * 2}Q`, 'the revenue drawing does not label the MR line with its equation');
  has(curves, `AR = ${N.a} ${'−'} ${N.b}Q`, 'the revenue drawing does not label the AR line with its equation');
  has(curves, money(N.trMax), `the revenue drawing does not name the greatest total revenue ${money(N.trMax)}`);
}
{ // 2 · the three regions and the two worked calculations
  const [regions, worked] = svgOf(DIAGRAMS[1]);
  for (const cell of ['elastic', 'unit elastic', 'inelastic', 'raises TR', 'lowers TR']) has(regions, `>${cell}</text>`, `the elasticity table has no cell reading "${cell}"`);
  has(worked, `>${elasticity(N.elastic.ped)}</text>`, `the worked table does not print the elastic PED ${elasticity(N.elastic.ped)}`);
  has(worked, `>${elasticity(N.inelastic.ped)}</text>`, `the worked table does not print the inelastic PED ${elasticity(N.inelastic.ped)}`);
  has(worked, `>${money(N.elastic.tr1)}</text>`, 'the worked table does not print the revenue after the elastic price cut');
  has(worked, `>${money(N.inelastic.tr1)}</text>`, 'the worked table does not print the revenue after the inelastic price cut');
}
{ // 3 · the product schedule and the drawn curves
  const [schedule, curves] = svgOf(DIAGRAMS[2]);
  for (const r of B.rows.filter((x) => x.mp != null)) has(schedule, `>${qty(r.mp)}</text>`, `the product schedule has no marginal product cell reading ${qty(r.mp)}`);
  has(curves, '>MP</text>', 'the product drawing does not label the marginal product curve');
  has(curves, '>AP</text>', 'the product drawing does not label the average product curve');
  has(curves, 'diminishing returns from here', 'the product drawing does not mark where diminishing returns set in (2b)');
}
{ // 4 · the seven cost measures and the cost curves
  const [schedule, curves] = svgOf(DIAGRAMS[3]);
  for (const h of ['TFC', 'TVC', 'TC', 'AFC', 'AVC', 'AC', 'MC']) has(schedule, `>${h}</text>`, `the cost schedule has no column for ${h} — 2c names all seven`);
  has(schedule, `>${money(B.ref.afc)}</text>`, `the cost schedule does not print AFC ${money(B.ref.afc)} (specThin-01)`);
  has(schedule, `>${money(B.ref.avc)}</text>`, `the cost schedule does not print AVC ${money(B.ref.avc)} (specThin-02)`);
  for (const curve of ['AFC', 'AVC', 'AC', 'MC']) has(curves, `>${curve}</text>`, `the cost drawing does not label the ${curve} curve`);
  has(curves, `MC = AC = ${money(B.minAc)}`, 'the cost drawing does not mark the point where marginal cost meets average cost');
}
{ // 5 · the LRAC schedule and curve
  const [schedule, curve] = svgOf(DIAGRAMS[4]);
  has(schedule, '>minimum efficient scale</text>', 'the long-run schedule does not name minimum efficient scale on its own row (3b)');
  has(schedule, '>economies of scale</text>', 'the long-run schedule does not name the economies-of-scale stretch (3a)');
  has(schedule, '>diseconomies of scale</text>', 'the long-run schedule does not name the diseconomies stretch (3a)');
  has(curve, '>LRAC</text>', 'the long-run drawing does not label the curve');
  has(curve, '>minimum efficient scale</text>', 'the long-run drawing does not mark minimum efficient scale');
  has(curve, `>${qty(L.mes)}</text>`, `the long-run drawing does not read off ${qty(L.mes)} ${B.units}`);
  has(curve, `>${money(L.floor)}</text>`, `the long-run drawing does not read off ${money(L.floor)}`);
}
{ // 6 · the three specification lists, in the specification's own words
  const [internal, external, dis] = svgOf(DIAGRAMS[5]);
  for (const [name] of INTERNAL_SOURCES) has(internal, `>${name}</text>`, `the internal table has no row for "${name}" (3d)`);
  for (const [name] of EXTERNAL_SOURCES) has(external, `>${name}</text>`, `the external table has no row for "${name}" (3e)`);
  for (const [name] of DISECONOMY_SOURCES) has(dis, `>${name}</text>`, `the diseconomies table has no row for "${name}" (3f)`);
}
{ // 7 · the four prices and the shutdown comparison
  const [prices, shutdown] = svgOf(DIAGRAMS[6]);
  for (const label of ['supernormal profit', 'normal profit']) has(prices, `>${label}</text>`, `the profit table has no row labelled "${label}" (4a)`);
  has(prices, `>${money(B.normal.price)}</text>`, 'the profit table does not show the price at which the firm earns normal profit');
  has(shutdown, '>keep producing</text>', 'the shutdown table does not say "keep producing" for the case above average variable cost');
  has(shutdown, '>shut down</text>', 'the shutdown table does not say "shut down" for the case below average variable cost');
  has(shutdown, `>${money(B.tfc)}</text>`, `the shutdown table does not print the ${money(B.tfc)} that stopping costs`);
  /*
   * THE THIRD VIEW IS specGap-05 ITSELF: "loss-making firm diagram (AR < ATC) and the profit/loss
   * rectangles". Both rectangles must be shaded AND labelled with the figure they measure, and both
   * cost lines must be on the same axes, or the finding is answered by a picture of only half of it.
   */
  const rects = svgOf(DIAGRAMS[6])[2];
  has(rects, '<polygon', 'the rectangles view shades no area, and specGap-05 asks for the profit/loss rectangles');
  has(rects, `profit ${money(B.supernormal.profit)}`, `the rectangles view does not label the profit rectangle ${money(B.supernormal.profit)}`);
  has(rects, `loss ${money(Math.abs(B.shortRunLoss.profit))}`, `the rectangles view does not label the loss rectangle ${money(Math.abs(B.shortRunLoss.profit))}`);
  has(rects, `AC ${money(B.ref.ac)}`, 'the rectangles view does not draw and label average cost, which both rectangles are measured from');
  has(rects, `AVC ${money(B.ref.avc)}`, 'the rectangles view does not draw average variable cost, which is what decides the loss case (4b)');
  for (const p of [B.supernormal.price, B.shortRunLoss.price, B.shutdown.price]) has(rects, `P ${money(p)}`, `the rectangles view does not draw the ${money(p)} price line`);
}

/* EVERY PLOTTED POINT INSIDE ITS CANVAS (packet 23's check, packet 25's polygon handling). */
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
      const pts = (m[0].match(/points="([^"]+)"/) || [])[1];
      if (pts) for (const p of pts.split(' ')) {
        const [x, y] = p.split(',').map(Number);
        if (x < -2 || x > vw + 2) outside.push(`polygon x=${x} (frame ${vw})`);
        if (y < -2 || y > vh + 2) outside.push(`polygon y=${y} (frame ${vh})`);
      }
    }
    if (outside.length) problems.push(`${d.title} scenario ${i + 1} draws outside its canvas: ${[...new Set(outside)].slice(0, 4).join(', ')}`);
  }
}

/*
 * AND THE SAME CHECK FOR THE TEXT'S WIDTH, WHICH IS THE PART THE BOUNDS CHECK CANNOT SEE. It reads a
 * <text> element's ANCHOR, and an anchor inside the frame says nothing about where the string ENDS:
 * SVG text does not wrap or clip, it runs off the side. Packet 25's Verify B found a label doing
 * exactly that on the phone, at x = 514.2 in a 500-unit frame, with the canvas check, the validator
 * and Verify A all passing it.
 */
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
{ // A/B, run every time (packet 21). The label as Verify B found it must fire; a short one must not.
  const frame = 500;
  const probe = (text, x, size, anchor) => {
    const w = estWidth(text, size);
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    return left + w > frame + 1 || left < -1;
  };
  if (!probe('welfare loss $50 a day', 396.7, 11, 'start')) problems.push('the text-extent check no longer fires on the label Verify B found running off the frame');
  if (probe('welfare loss $50', 496, 11, 'end')) problems.push('the text-extent check fires on a label that measures inside the frame');
}

/* A TABLE'S CELLS MUST NOT COLLIDE. A regression guard, sharing `estWidth` with the layout so the two
 * cannot disagree; the independent measurement is getComputedTextLength() in Verify B. */
for (const d of DIAGRAMS.filter((x) => x.kind === 'table')) {
  for (const [i, svg] of svgOf(d).entries()) {
    const rows = new Map();
    for (const m of svg.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*>([^<]*)</g)) {
      const [, x, y, size, text] = m;
      const left = Number(x);
      const row = Math.round(Number(y));
      (rows.get(row) || rows.set(row, []).get(row)).push({ left, right: left + estWidth(text, Number(size)), text });
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
 * EVERY FIGURE THE SPEC BLOCK NAMES MUST BE IN THE BODY AND SOMEWHERE ELSE. Packet 25's lesson: its
 * acceptance check named $240 and the runner's list did not contain it, so the check was written and
 * never run — and Verify A found the figure appearing exactly once in the whole bundle, as a
 * wrong-answer distractor. An acceptance check that no code runs is a wish. This list IS the list in
 * the NEXT.md spec block, and nothing may be added there without being added here.
 */
const must = [
  money(N.trMax), money(B.minAc), money(B.minAvc), money(B.tfc), money(L.floor), qty(L.mes),
  money(B.supernormal.profit), money(Math.abs(B.shortRunLoss.profit)), money(Math.abs(B.shutdown.profit)),
  elasticity(N.elastic.ped), elasticity(N.inelastic.ped),
];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
/* ONE MINUS SIGN. Marginal revenue and every elasticity in this section are negative. */
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 28 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('\nthe two firms:');
console.log(`  ${N.name}  demand P = ${N.a} ${'−'} ${N.b}Q → AR = ${N.a} ${'−'} ${N.b}Q · MR = ${N.a} ${'−'} ${N.b * 2}Q · TR greatest ${money(N.trMax)} at ${qty(N.trMaxQ)} ${N.units}, where MR = ${money(0)} and PED = ${elasticity(N.ped(N.trMaxQ))}`);
console.log(`                  elastic ${money(N.elastic.p0)}→${money(N.elastic.p1)}: PED ${elasticity(N.elastic.ped)}, TR ${money(N.elastic.tr0)}→${money(N.elastic.tr1)} · inelastic ${money(N.inelastic.p0)}→${money(N.inelastic.p1)}: PED ${elasticity(N.inelastic.ped)}, TR ${money(N.inelastic.tr0)}→${money(N.inelastic.tr1)}`);
console.log(`  ${B.name}   TFC ${money(B.tfc)} · wage ${money(B.wage)} · TP ${B.rows.map((r) => qty(r.q)).join('/')} ${B.units} for ${B.rows.length - 1} workers`);
console.log(`                  min AVC ${money(B.minAvc)} · min AC ${money(B.minAc)} · MC = AC at ${qty(B.rows.find((r) => r.mc === B.minAc)?.q ?? 0)} ${B.units}`);
console.log(`                  at ${qty(B.ref.q)} ${B.units} (AC ${money(B.ref.ac)}, AVC ${money(B.ref.avc)}): ${money(B.supernormal.price)} → ${money(B.supernormal.profit)} · ${money(B.normal.price)} → normal · ${money(B.shortRunLoss.price)} → ${money(B.shortRunLoss.profit)} (vs ${money(B.tfc)} to stop) · ${money(B.shutdown.price)} → ${money(B.shutdown.profit)} (shut down)`);
console.log(`  long run        LRAC ${money(L.lrac(L.outputs[0]))} at ${qty(L.outputs[0])} → ${money(L.floor)} at ${qty(L.mes)} (minimum efficient scale), flat to ${qty(L.flatTo)}, ${money(L.lrac(90))} at ${qty(90)}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(44)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 74)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: one currency · no price taker/maker, economies of scope, returns to scale, diminishing marginal returns, accounting or economic profit, bulk buying · nothing from 3.3.1 or 3.3.3 (profit maximisation, MR = MC, perfect competition, monopoly, allocative/productive/dynamic efficiency, barriers to entry, sunk costs) · X-inefficiency PRESENT on four surfaces · no Assess, Outline, 10- or 12-mark · no UK framing, named company or dated claim · no uncited examiner, marker, frequency or paper claim · every practice tariff in the ECONOMICS census, all eight command words, every guidance two paragraphs with a clean opening · both Appendix 6 gloss checks · every block pinned to a quiz, a practice item and a diagram, each on its own topic, none of them the pre-test\'s · MR re-derived as the slope of TR at every midpoint · MC = wage/MP, AVC = wage/AP and AC = AFC + AVC at every row · the LRAC envelope at every row · minimum efficient scale derived, not typed · every diagram figure re-derived from the emitted SVG · nothing drawn outside its canvas · no table cell collisions · ids unique · one minus sign');

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

if (DUMP) { const path = `audit/snapshots/packet-28-bundle__economics__${SECTION}.json`; writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-28-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${path}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
