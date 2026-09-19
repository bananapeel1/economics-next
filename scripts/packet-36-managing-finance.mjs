#!/usr/bin/env node
/**
 * PACKET 36 — managing-finance, Business Unit 2 (WBS12), IAL topic 2.3.3.
 * `audit/raw/bus_spec.txt:921-958`. FIVE blocks, twenty-four subsections, 24 substantive leaves.
 *
 *   node scripts/packet-36-managing-finance.mjs            # dry run, every check
 *   node scripts/packet-36-managing-finance.mjs --dump     # + write the bundle
 *   node scripts/packet-36-managing-finance.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. What this packet adds or
 * changes, with the reason:
 *
 *   - **THE PACKET'S FIRST FINDING IS THAT SIX OF ITS OWN ITEMS CITE A SPEC NUMBER THAT DOES NOT
 *     EXIST.** `structure-01` says the section's "2.3.3 / Managing Finance" does not match the IAL
 *     structure because "2.3 is Managing finance, with 2.3.1 Profit, 2.3.2 Liquidity, 2.3.3 Business
 *     failure". That is UK GCE numbering. `bus_spec.txt:921` is "2.3.3 Managing finance"; :885 is
 *     2.3.2 Financial planning (packet 31) and :840 is 2.3.1 (packet 19). Profit, Liquidity and
 *     Business failure are sub-topics 1, 2 and 3 INSIDE 2.3.3, at :925, :935 and :943 — and
 *     `specGap-01` to `-06` all repeat the same wrong numbers in their own text. The meta number is
 *     already right; `structure-01` is REFUSED on its remedy, and the runner asserts the oracle
 *     still agrees, so a renumber would fail the build rather than be inherited.
 *   - **FOUR FAMILIES OF VOCABULARY ARE BANNED WITH THE LINE THAT SETTLES EACH.** Gearing and ROCE
 *     are 3.3.2 · 2 (:1229-1236), Unit 3 — which is `practice-01` and `practice-02`, both confirmed
 *     by packet 0. Asset turnover and dividend yield are 0 hits in the whole specification.
 *     Break-even, contribution and cash-flow forecasting are 2.3.2, built by packet 31, which
 *     REMOVED two subsections from that section because they taught THIS one's leaves. And UK GAAP
 *     words — stock, debtors, creditors, turnover — are refused by Appendix 8 (:2299-2304), which
 *     states that the assessments use International Accounting Standards terminology.
 *   - **`depreciation` IS REFUSED, AND IT IS THE SHARPEST RULE-2 CASE IN THE PACKET.** `specGap-03`
 *     asks for "credit sales, depreciation, capital purchases, loan repayments". The word occurs
 *     ONCE in `bus_spec.txt`, at :1016, where it means a fall in the exchange rate — and exchange
 *     rates are a leaf of this very section at :954. Teaching an accounting depreciation the
 *     specification never names, under a word it uses for something else, is the defect rule 2
 *     exists to stop. The other three mechanisms are taught, in the specification's own vocabulary.
 *   - **`topFix-01`'s "10/12-mark Assess" IS REFUSED AGAINST THE CENSUS.** This is Unit 2, and
 *     :2238-2245 carries 12 for Units 3/4 only. The prose-tariff check refuses a 12-mark question
 *     anywhere in the section's text as well as in a practice item.
 *   - **THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG** (packet 30). `structure-04` is that
 *     block 4's `quizIndices` shows an acid-test question at the end of the failure chapter and
 *     block 3's `practiceIndices` shows an untaught gearing question at the end of liquidity, while
 *     blocks 1 and 4 have no practice at all. `topFix-04` asks for the indices to be re-mapped by
 *     hand; deriving them makes the defect unrepresentable instead, and the runner asserts that
 *     every block has a quiz, a practice item and a diagram.
 *   - **THE ARITHMETIC IS RE-DERIVED AND ITS PROPERTIES ASSERTED.** `accuracy-01` and `quiz-01` are
 *     one defect — the section calls the same computation operating profit in one place and net
 *     profit in another — so the three profits are three functions of one statement and the runner
 *     checks the ladder, the three margins, the two ratios, and the four liquidity moves against
 *     the figures the content prints. The two that carry the chapter are asserted directly: that a
 *     five per cent price cut halves the operating profit, and that extending supplier credit leaves
 *     working capital UNCHANGED while moving the two ratios in opposite directions, which is
 *     `topFix-04`'s Q19 stated as a property.
 *   - **`FAILED_SUBSTITUTION`, over every string INCLUDING the SVGs** (packet 29). Note the regex has
 *     NO trailing `\b`: `/\bundefined\b/` does not match `undefinedQ`, and the guard written for the
 *     defect would otherwise have passed it.
 *   - **THE ANSWER-RECOVERABLE RECALL CHECK, over every recall type**, at V029's corrected
 *     thresholds. `structure-12` and `topFix-02` are that all seven live fill-ins hint with the first
 *     three letters of the answer; the hint rule fixes that, and this check fixes the larger version
 *     of it, which is a recall answerable by scrolling up.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, qty, pct, ratio, days, round2,
  FIRM, INTERNAL_CAUSES, EXTERNAL_CAUSES,
  BANNED_ELSEWHERE, TEACHING_TERMS, teachingWords,
} from './_packet36-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5 } from './_packet36-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS, SFP_EXTRACT, SCI_EXTRACT } from './_packet36-assessment.mjs';
import { DIAGRAMS, ALL_DIAGRAMS, estWidth, GRD, MIN_FACE } from './_packet36-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5];
const F = FIRM;

const problems = [];
const svgOf = (d) => (d.scenarios || []).map((s) => s.svg).filter(Boolean);

/* ── pins, derived from each item's own block tag ──────────────────────────── */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCKS.map((b) => [b, quizByBlock[b]]));
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

const strip = ({ block, ...rest }) => rest;
const content = buildContent({ diagramIds, quizIndices, practiceIndices });

const bundle = {
  content,
  notes: NOTES,
  quiz: QUIZ.map(strip),
  practice: PRACTICE.map(strip),
  flashcards: FLASHCARDS,
  mistakes: MISTAKES,
  diagrams: ALL_DIAGRAMS,
  extras: EXTRAS,
};

/* ── every string a student can read ───────────────────────────────────────── */
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/*
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). Joined per diagram rather
 * than per `<text>` because a caption is wrapped a line per element, so a phrase spanning two lines
 * is in neither of them.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs ────────────── */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['a span of undefinedQ', 'the margin is NaN', 'the firm [object Object] pays', 'a profit of ${money(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
}

/* ── the section's banned vocabulary, each with the line that settles it ───── */
/*
 * NO `g` FLAG on the source patterns. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`,
 * so a second call against the same string starts past the match and returns false. Packet 29 lost a
 * round to exactly that: a stateful regex inside a filter is a bug that looks like a finding.
 */
/*
 * ONE BANNED FAMILY HAS TO BE SAYABLE IN ORDER TO BE REFUTED, and it is the one a student arrives
 * holding. Appendix 8 (:2299-2304) is a table of UK GAAP words against the International Accounting
 * Standards words the assessments use — stock against inventory, debtors against trade receivables,
 * creditors against trade payables — and a student who has been taught from a UK textbook needs to
 * be told which is which. A flat ban would delete the sentence that does the teaching, which is
 * packet 29's kinked-demand-curve problem and packet 35's "revenue maximisation".
 *
 * The rule: a UK GAAP word may appear ONLY in a string that also cites Appendix 8 or names the
 * International Accounting Standards, so the refutation travels with it. Nothing else is exempt.
 */
const GAAP_INDEX = BANNED_ELSEWHERE.findIndex(([re]) => /debtors/.test(re.source));
const citesAppendix8 = (s) => /Appendix 8|International Accounting Standards/i.test(s);
for (const [i, [re, why]] of BANNED_ELSEWHERE.entries()) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  let hits = readable.filter((s) => one.test(s));
  if (i === GAAP_INDEX) {
    const refuted = hits.filter(citesAppendix8);
    if (refuted.length < 1) problems.push('no string names the UK GAAP words and cites Appendix 8 — a student taught "stock" and "debtors" elsewhere needs the mapping, and this section is where it is given');
    hits = hits.filter((s) => !citesAppendix8(s));
  }
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 90)}"`);
}
{
  /*
   * A/B, BECAUSE A BAN THAT HAS NEVER FIRED IS NOT KNOWN TO WORK (packet 21). Each pattern is
   * planted against a string it must catch and one it must not. The negatives matter more than the
   * positives here: `\bstocks?\b` must not fire on "overstock", and the profit-and-loss pattern must
   * not fire on the specification's OWN phrasing, which this section teaches.
   */
  const fires = (re, str) => new RegExp(re.source, re.flags.replace('g', '')).test(str);
  const probes = [
    [0, 'the gearing ratio measures long-term borrowing', 'the interest on the loan is taken off last'],
    [1, 'asset turnover shows how hard the assets work', 'the warehouse is a non-current asset'],
    [2, 'the break-even point is where total revenue meets total costs', 'the firm covers its costs and keeps the rest'],
    [3, 'the debtors owe the business money', 'the trade receivables owe the business money'],
    [3, 'stock on the shelves is worth $240,000', 'the overstock left after a bad forecast'],
    [3, 'the profit and loss account for the year', 'the statement of comprehensive income (profit and loss account)'],
    [4, 'depreciation is charged on the vehicles each year', 'a fall in the exchange rate raises the cost of imports'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const [re, why] = BANNED_ELSEWHERE[i];
    if (!fires(re, mustFire)) problems.push(`the ban "${why.slice(0, 50)}" no longer fires on: "${mustFire}"`);
    if (fires(re, mustNot)) problems.push(`the ban "${why.slice(0, 50)}" fires on legitimate text: "${mustNot}"`);
  }
  /* and the Appendix 8 exemption itself, which is the only way a banned word may be written here */
  if (citesAppendix8('the debtors owe the business money')) problems.push('the Appendix 8 exemption fires on a sentence that does not cite it');
  if (!citesAppendix8('Appendix 8 settles it: inventory rather than stock, trade receivables rather than debtors')) problems.push('the Appendix 8 exemption no longer recognises a sentence that cites it');
}
ban(/\bExamine\b(?![a-z])/g, '"Examine", which is an ECONOMICS command word and has no Business tariff');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification');
ban(/\bnormal profit\b|\bsupernormal profit\b|\babnormal profit\b/gi, 'Economics vocabulary: normal and supernormal profit are 3.3.3 market structures, not Business 2.3.3');
ban(/\bVRIO\b|\bcore competenc|\bbalanced scorecard\b|\btriple bottom line\b/gi, 'vocabulary the IAL Business specification does not use (`terms.off-spec` carries these by name)');
/*
 * `ratio analysis` IS A UNIT 3 TERM AND `terms.later-unit` FIRES ON IT TODAY, on the live section.
 * The phrase is banned above with gearing; this is the check that the LIVE finding is actually
 * cleared rather than moved, because the rule matches on the specification's own leaf wording.
 */
ban(/\binvestment appraisal\b|\bdecision trees?\b|\bcritical path\b|\borganic growth\b/gi, 'Unit 3 and Unit 4 vocabulary (`terms.later-unit`)');

/* ── no note about OUR OWN PREVIOUS CONTENT in text a student reads ────────── */
/*
 * Packet 18 shipped this class twice ("the March version of this item asked for 4") and packet 35's
 * Verify B found four more, three of them inside SVG captions. A student has no idea what "the live
 * section" is; it reads as a claim about the specification. Over `readable`, so prose AND diagram
 * text, and over the SVG text JOINED PER DIAGRAM, because a caption is wrapped one `<text>` a line.
 */
const SELF_REFERENCE = /\bthe live section\b|\bthe March (?:version|notes|content)\b|\bthis section (?:previously|used to|formerly)\b|\bthe previous version\b|\bthe old (?:notes|section|version)\b|\bpreviously (?:taught|said|omitted|left out)\b|\bearlier version\b|\bthis packet\b/i;
for (const s of readable) {
  if (!SELF_REFERENCE.test(s)) continue;
  const m = s.match(SELF_REFERENCE);
  problems.push(`a note about our own previous content in text a student reads: "${s.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ')}"`);
}
{
  const mustFire = ['the live section teaches only two of the three margins', 'the March version of this item asked for net profit', 'this section previously taught a tax line', 'the old notes named a real company'];
  const mustNot = ['2.3.3 · 2b names four ways to improve liquidity, and each one moves a different measure.', 'Factoring is the one most often mistaken for a loan.'];
  problems.push(
    ...mustFire.filter((x) => !SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE no longer fires on: "${x}"`),
    ...mustNot.filter((x) => SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE fires on ordinary teaching: "${x}"`),
  );
}

/* ── no internal id in anything a student reads (packet 19) ────────────────── */
const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/;
for (const s of prose) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id in student-facing text: "${s.slice(0, 90)}"`);
for (const s of svgText) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id inside a diagram: "${s.slice(0, 90)}"`);

/* ── claims about markers, frequency and how papers are built ──────────────── */
/*
 * `practice-03` IS THE INVERSE OF THIS RULE AND BOTH HALVES MATTER. The live guidance says "No
 * explicit judgement mark", which is wrong and steers students away from the top level; the fix is
 * to say what the COMMAND WORD requires, because Appendix 6 states it and it is citable. It is NOT
 * to say what a marker credits. `MARK_CLAIM` refuses the second in the guidance as well as in the
 * teaching text.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
/*
 * A MARK ALLOCATION IS NOT A TARIFF AND IS NOT A CLAIM ABOUT A MARKER. Packet 35 stripped only the
 * bare `(n marks)`; a scheme that says "(2 marks for the four stages, 1 mark for the arrows)" is the
 * same thing with the reason attached, and stripping only the bare form made the prose-tariff check
 * report a "1-mark question" that Business does not have. Any bracketed group containing the word
 * goes, which is also what `practice.levels` is really about.
 */
const withoutAllocations = (sent) => sent.replace(/\([^)]*\bmarks?\b[^)]*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.', 'Guidance is given at L1-L4.'];
  const mustNotFire = [`Gross profit = ${money(F.grossProfit)} (1 mark).`, 'Appendix 6 defines Assess as requiring a supported judgement.'];
  problems.push(
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM fires on a point allocation: "${x}"`),
  );
}
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
  if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);
}

/* ── tariffs, against the BUSINESS census, for UNIT 2 ─────────────────────── */
/*
 * `topFix-01` ASKS FOR "a 10/12-mark Assess". THIS IS UNIT 2, SO ASSESS IS 10 AND ONLY 10 — the
 * census carries 12 for Units 3/4 (`bus_spec.txt:2238-2245`, which prints "[Units 1/2]" and
 * "[Units 3/4]" against the two figures). A packet that took the finding at its word would have
 * shipped a tariff that does not exist on WBS12.
 */
const UNIT = 2;
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
const marksFor = (row) => (row.command === 'Assess' ? [UNIT <= 2 ? 10 : 12] : row.marks);
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice command "${pItem.command}" is not in the business census — this subject has no Examine and no Outline`);
  else if (!marksFor(row).includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — in Business Unit ${UNIT} that command carries ${marksFor(row).join(' or ')}`);
}
{
  const used = PRACTICE.map((p) => p.command);
  const missing = census.map((r) => r.command).filter((c) => !used.includes(c));
  if (missing.length) problems.push(`command words never practised: ${missing.join(', ')} — all eight appear in this section`);
}
/* A prose tariff is invisible to the census check above, which reads PRACTICE items only (packet 20). */
const PROSE_TARIFF = /\b(\d{1,2})[- ]marks?\b/gi;
const unitMarks = [...new Set(census.flatMap((r) => marksFor(r)))].sort((a, b) => a - b);
for (const s of prose) {
  const stripped = withoutAllocations(s);
  for (const m of stripped.matchAll(PROSE_TARIFF)) {
    const marks = Number(m[1]);
    if (!unitMarks.includes(marks)) problems.push(`a ${marks}-mark question named in prose; Business Unit ${UNIT} has ${unitMarks.join(', ')} only: "${stripped.slice(Math.max(0, m.index - 40), m.index + 40)}"`);
  }
}
{
  const probe = (text) => [...withoutAllocations(text).matchAll(PROSE_TARIFF)].map((m) => Number(m[1])).filter((n) => !unitMarks.includes(n));
  if (!probe('a 12-mark Assess').length) problems.push('the prose-tariff check no longer fires on a 12-mark question, which is Units 3/4 only');
  if (!probe('a 14-mark question').length) problems.push('the prose-tariff check no longer fires on a 14-mark question, which is Economics');
  if (probe('a 10-mark Assess and a 20-mark Evaluate').length) problems.push('the prose-tariff check fires on a valid Business Unit 2 tariff');
  if (probe(`Gross profit is ${money(F.grossProfit)} (1 mark).`).length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s) => String(s).toLowerCase().match(/[a-z]{4,}/g) || [];
const COMMANDS = census.map((r) => r.command).join('|');
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  const m = em.match(new RegExp(`Appendix 6[^.]*?\\b(${COMMANDS})\\b`));
  if (!m) continue;
  const row = census.find((r) => r.command === m[1]);
  if (!row) continue;
  const mine = new Set(words(em).filter((w) => !STOP.has(w)));
  const theirs = words(row.description).filter((w) => !STOP.has(w));
  const shared = theirs.filter((w) => mine.has(w));
  if (!shared.length) problems.push(`"${sec.title}": the ${m[1]} gloss cites Appendix 6 and shares NOTHING with the census description — read bus_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
}
/*
 * ASSESS REQUIRES A SUPPORTED JUDGEMENT, AND SAYING SO IS THE WHOLE OF `practice-03`. The live
 * guidance says the opposite. The census wording at :2244-2245 is "leading to a supported
 * judgement"; Discuss at :2235-2237 is "A brief assessment is required showing an awareness of
 * competing arguments/factors"; Evaluate at :2249-2251 is "a perceptive conclusion that proposes a
 * solution and/or recommendations".
 *
 * V036, 19 September 2026: the sentence above used to read `Discuss at :2236-2237 is "a brief
 * assessment ... showing" a conclusion`, which elided the census's own words and put the Evaluate
 * property back on Discuss — and the clause below accepted `assessment|conclusion`, so a gloss
 * promising a conclusion passed. Appendix 6 never uses the word for a Discuss, in either
 * specification. The clause now rejects it, as packet 35's does.
 */
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  if (/Appendix 6[^.]*\bAssess\b/.test(em) && !/judgement/i.test(em)) problems.push(`"${sec.title}": an Assess gloss that does not mention a judgement — the census names it, and it is what separates Assess (10) from Analyse (6)`);
  if (/Appendix 6[^.]*\bDiscuss\b/.test(em) && !/assessment/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss that does not mention the brief ASSESSMENT the census requires (bus_spec.txt:2234-2237)`);
  if (/Appendix 6[^.]*\bDiscuss\b/.test(em) && /\bconclusion\b/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss promising a "conclusion"; that is Evaluate at bus_spec.txt:2246-2250 (V036)`);
}
for (const p of PRACTICE) {
  if (p.command === 'Assess' && !/judgement/i.test(p.guidance)) problems.push(`the Assess practice "${p.question.slice(0, 40)}" does not name the supported judgement the command word requires (practice-03)`);
  if (p.command === 'Assess' && /no explicit judgement/i.test(p.guidance)) problems.push('an Assess item still carries the live section\'s "No explicit judgement mark" (practice-03)');
  if (p.command === 'Evaluate' && !/recommend|conclusion/i.test(p.guidance)) problems.push('the Evaluate practice guidance does not name the conclusion or recommendation the command word requires');
  if (p.command === 'Construct' && !/label/i.test(p.guidance)) problems.push('the Construct practice guidance does not mention labelling, which is what the command word asks for');
}

/* ── the word budget, measured the way the validator measures it ───────────── */
for (const sec of SUBSECTIONS) {
  const w = teachingWords(sec);
  if (w > 350) problems.push(`"${sec.title}": ${w} words of teaching text (budget 350)`);
}

/* ── recalls: completeness, the fill-in contract, and copy-from-screen ─────── */
if (SUBSECTIONS.some((s) => !s.recall)) problems.push(`${SUBSECTIONS.filter((s) => !s.recall).length} subsections carry no recall`);
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  const orphan = ATTACH_SLUGS.filter((k) => !slugs.has(k));
  if (orphan.length) problems.push(`recall bank keyed to a subsection that does not exist: ${orphan.join(', ')}`);
}
/*
 * THE FILL-IN CONTRACT, WHICH IS `structure-12` AND `topFix-02`. All seven live fill-ins hint with
 * the first three letters of the answer — "Sal__" for "Sales" — so the widget tests spelling
 * completion rather than understanding, and `fillin.hint` fires on every one of them. One `___` a
 * template line; `answers.length` equal to the blank count; no duplicate answer, because the second
 * chip vanishes when its twin is placed and the recall cannot be completed; no answer printed in
 * the template outside its own blank; a hint that is not a prefix of its answer and does not reveal
 * its length; and two or three distractors so the chip bank is not a closed set.
 */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'fillin') continue;
  const lines = r.template || [];
  const blanks = lines.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
  const answers = r.answers || [];
  if (blanks !== answers.length) problems.push(`"${sec.title}": ${blanks} blanks against ${answers.length} answers`);
  for (const [i, l] of lines.entries()) {
    const n = (String(l).match(/_{3,}/g) || []).length;
    if (n !== 1) problems.push(`"${sec.title}": template line ${i + 1} has ${n} blanks — one a line, so the blanks and the answers cannot come apart`);
  }
  const lower = answers.map((a) => String(a).toLowerCase());
  const dups = lower.filter((a, i) => lower.indexOf(a) !== i);
  if (dups.length) problems.push(`"${sec.title}": duplicate answer ${JSON.stringify([...new Set(dups)])} — the second chip vanishes and the recall cannot be finished`);
  if (answers.some((a) => String(a).includes(','))) problems.push(`"${sec.title}": an answer contains a comma, which is two answers glued into one blank`);
  const bare = lines.join(' ').replace(/_{3,}/g, ' ');
  for (const a of answers) if (new RegExp(`\\b${String(a).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(bare)) problems.push(`"${sec.title}": the answer "${a}" is printed in the template outside its blank`);
  const ds = r.distractors || [];
  if (ds.length < 2 || ds.length > 3) problems.push(`"${sec.title}": ${ds.length} distractors (want 2 to 3)`);
  if (ds.some((d) => lower.includes(String(d).toLowerCase()))) problems.push(`"${sec.title}": a distractor equals an answer`);
  for (const [i, h] of (r.hints || []).entries()) {
    const a = String(answers[i] ?? '').toLowerCase();
    const shown = String(h).toLowerCase().replace(/_.*$/, '').trim();
    if (a && shown && a.startsWith(shown.slice(0, Math.max(3, Math.floor(shown.length))))) problems.push(`"${sec.title}": hint ${i + 1} ("${h}") is a prefix of its answer "${answers[i]}" — the live defect on all seven fill-ins`);
    if (/_/.test(String(h)) && String(h).replace(/[^_a-z0-9]/gi, '').length === String(answers[i] ?? '').length) problems.push(`"${sec.title}": hint ${i + 1} reveals the length of its answer`);
  }
}
{
  /* A/B: the two live defect shapes must fire and a well-formed fill-in must not. */
  const shape = (tpl, ans) => {
    const blanks = tpl.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
    const lower = ans.map((a) => String(a).toLowerCase());
    return blanks !== ans.length || lower.some((a, i) => lower.indexOf(a) !== i) || tpl.some((l) => (String(l).match(/_{3,}/g) || []).length !== 1);
  };
  if (!shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3', '4', '5'])) problems.push('the fill-in contract check no longer fires on five answers over three blanks');
  if (!shape(['a ___ b', 'c ___ d'], ['inventory', 'inventory'])) problems.push('the fill-in contract check no longer fires on a duplicate answer');
  if (!shape(['a ___ b ___ c'], ['1', '2'])) problems.push('the fill-in contract check no longer fires on two blanks in one line');
  if (shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3'])) problems.push('the fill-in contract check fires on a well-formed fill-in');
  /* and the live hint defect itself: "Sal__" against "Sales" */
  const prefixHint = (h, a) => { const shown = h.toLowerCase().replace(/_.*$/, '').trim(); return !!shown && a.toLowerCase().startsWith(shown); };
  if (!prefixHint('Sal__', 'Sales')) problems.push('the hint check no longer fires on the live "Sal__" defect');
  if (!prefixHint('dir___', 'direct')) problems.push('the hint check no longer fires on the live "dir___" defect');
  if (prefixHint('divide that by the revenue and multiply by a hundred', '30%')) problems.push('the hint check fires on a semantic hint');
}
{
  /*
   * `structure-02` — A FREE BLANK ON THE NEXT STEP.
   *
   * The item names one instance (a reorder shown spaced above the step that repeats it) and the
   * packet removed that one. The finding is not the instance: it is that a student meets the same
   * question twice in a row. One subsection is one step here, so "consecutive steps" is
   * "consecutive subsections", and the shape that survived the first build was two fill-ins whose
   * SECOND line was character for character identical — "Its gross profit margin is ___", answer
   * "30%" both times — with "30%" sitting in the later word bank. `verify-draft.mjs` compared whole
   * recall bodies and saw two different templates, which is the blind spot: the duplication is at
   * the BLANK, not at the widget.
   *
   * So the unit compared here is the (blank, answer) pair, and for the other three types the item
   * text, across every adjacent pair of steps.
   */
  const pairsOf = (r) => {
    if (!r) return [];
    if (r.type === 'fillin') {
      const lines = (r.template || []).filter((l) => /_{3,}/.test(String(l)));
      return lines.map((l, i) => `${String(l).toLowerCase().replace(/\s+/g, ' ').trim()}→${String((r.answers || [])[i] ?? '').toLowerCase().trim()}`);
    }
    if (r.type === 'reorder') return (r.correctOrder || []).map((x) => String(x).toLowerCase().trim());
    if (r.type === 'classify') return (r.groups || []).flatMap((g) => (g.items || []).map((x) => String(x).toLowerCase().trim()));
    if (r.type === 'match') return (r.pairs || []).map((p) => `${String(p.left).toLowerCase().trim()}→${String(p.right).toLowerCase().trim()}`);
    return [];
  };
  for (let i = 1; i < SUBSECTIONS.length; i += 1) {
    const prev = new Set(pairsOf(SUBSECTIONS[i - 1].recall));
    const shared = pairsOf(SUBSECTIONS[i].recall).filter((p) => prev.has(p));
    if (shared.length) problems.push(`"${SUBSECTIONS[i].title}" (step ${i + 1}) repeats ${shared.length} item(s) from the recall on the step before it — structure-02: "${shared[0].slice(0, 70)}"`);
  }
  /* and the word bank must not hand over an answer the previous step has just given */
  for (let i = 1; i < SUBSECTIONS.length; i += 1) {
    const here = SUBSECTIONS[i].recall;
    if (here?.type !== 'fillin') continue;
    const prevAnswers = new Set((SUBSECTIONS[i - 1].recall?.answers || []).map((a) => String(a).toLowerCase().trim()));
    const carried = (here.answers || []).map((a) => String(a).toLowerCase().trim()).filter((a) => prevAnswers.has(a));
    if (carried.length) problems.push(`"${SUBSECTIONS[i].title}" (step ${i + 1}) asks for ${JSON.stringify(carried)}, which the step before it has just answered — structure-02`);
  }
  {
    /* A/B: the exact pair the verifier found must fire, and two genuinely different fill-ins must not. */
    const a = { type: 'fillin', template: ['Its gross profit, in thousands of dollars, is $___ thousand', 'Its gross profit margin is ___', 'Against us it is therefore ___ profitable'], answers: ['240', '30%', 'less'] };
    const b = { type: 'fillin', template: ['Its gross profit margin is ___', 'Its operating profit margin is ___', 'Running the business costs it ___'], answers: ['30%', '8%', '22%'] };
    const c = { type: 'fillin', template: ['Cost of sales takes ___ of every dollar of revenue', 'Other operating expenses take ___ of every dollar of revenue', 'Its operating profit margin is therefore ___'], answers: ['60%', '32%', '8%'] };
    const overlap = (x, y) => { const s = new Set(pairsOf(x)); return pairsOf(y).filter((p) => s.has(p)).length; };
    if (!overlap(a, b)) problems.push('the duplicate-recall check no longer fires on the two templates the verifier rejected');
    if (overlap(a, c)) problems.push('the duplicate-recall check fires on the rewritten recall, which shares no blank with the step before it');
    if (!overlap(b, b)) problems.push('the duplicate-recall check cannot see a recall as a duplicate of itself');
  }
}
/*
 * COPY-FROM-SCREEN (packets 26, 27, 29): a subsection with a flow body may not carry a reorder,
 * because `learn-steps.js:10` renders the recall under the teaching on the same step, so the
 * answer's ORDER is printed above the widget.
 */
const tokens = (s) => new Set(String(s).toLowerCase().match(/[a-z]{3,}/g) || []);
const jac = (a, b) => { const A = tokens(a), B = tokens(b); const inter = [...A].filter((x) => B.has(x)).length; return inter / (A.size + B.size - inter || 1); };
const shareDistinctive = (a, b) => { const B = tokens(b); for (const w of tokens(a)) if (w.length >= 5 && B.has(w)) return true; return false; };
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flows = (sec.body || []).filter((b) => b.type === 'flow');
  if (flows.length) problems.push(`"${sec.title}" carries a flow box AND a reorder recall: the answer's ORDER is printed above it (packet 26)`);
  const steps = flows.flatMap((f) => (f.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)));
  for (const item of r.correctOrder || []) for (const st of steps) {
    if (jac(item, st) >= 0.6) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares ${Math.round(jac(item, st) * 100)}% of its words with a flow step on the same screen`);
    else if (shareDistinctive(item, st)) problems.push(`"${sec.title}": reorder item "${item.slice(0, 44)}" shares a distinctive word with a flow step on the same screen — a paraphrase is still a copy (packet 27)`);
  }
}
{
  const item = 'Cash buys inventory before anything is sold';
  const verbatim = 'Cash buys inventory before anything is sold';
  const paraphrase = 'Money purchases inventory before anything has been sold';
  const unrelated = 'A margin divides a profit by the revenue';
  if (jac(item, verbatim) < 0.6) problems.push('the reorder-overlap check no longer fires on a verbatim flow step');
  if (!shareDistinctive(item, paraphrase)) problems.push('the paraphrase check no longer fires on a reworded flow step');
  if (shareDistinctive(item, unrelated)) problems.push('the paraphrase check fires on a flow that teaches something else');
  const flowSubs = SUBSECTIONS.filter((s) => (s.body || []).some((b) => b.type === 'flow'));
  if (flowSubs.length !== 1) problems.push(`${flowSubs.length} flow bodies; this section is authored with exactly one, on the working capital cycle, and the copy-from-screen checks are calibrated for that`);
  if (flowSubs.some((s) => s.recall?.type === 'reorder')) problems.push('a reorder sits on the subsection that prints a flow — the answer is on screen above the widget (packet 29)');
}
/*
 * RULE 6 GENERALISED TO EVERY RECALL TYPE, at V029's corrected thresholds and sentence split
 * (packet 30's application of them). The measure is not word overlap, which any recall on a topic
 * shares with the teaching of that topic. It is whether the ANSWER is recoverable: for a fill-in, a
 * single sentence above that matches the template line AND supplies the missing word.
 */
const sentencesOf = (sec) => [sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || [])]), sec.realExample?.text, sec.misconception, sec.examMatters]
  .filter(Boolean).flatMap((x) => String(x).split(/(?<=[.!?])\s+/))
  .map((x) => String(x).toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim())
  .filter((x) => x.split(' ').length > 3);
const wordsOf = (x) => String(x).toLowerCase().replace(/\*\*/g, '').replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter((w) => w.length > 2);
const share = (a, b) => { const B = new Set(wordsOf(b)); const A = wordsOf(a); return A.length ? A.filter((w) => B.has(w)).length / A.length : 0; };
const recoverable = (sec) => {
  const r = sec.recall; if (!r) return [];
  const sents = sentencesOf(sec); const out = [];
  if (r.type === 'fillin') {
    (r.template || []).forEach((lineRaw, i) => {
      const stem = String(lineRaw).replace(/_{3,}/g, ' ');
      const ans = String((r.answers || [])[i] ?? '');
      const aw = wordsOf(ans);
      if (!aw.length) return;
      for (const sent of sents) if (share(stem, sent) >= 0.70 && aw.every((w) => sent.includes(w))) out.push(`fill-in line ${i + 1} and its answer "${ans}" are both in one sentence above it`);
    });
  } else if (r.type === 'classify') {
    for (const g of r.groups || []) for (const it of g.items || []) for (const sent of sents) if (share(it, sent) >= 0.70) out.push(`classify item all but printed above: "${String(it).slice(0, 44)}"`);
  } else if (r.type === 'match') {
    for (const pr2 of r.pairs || []) for (const sent of sents) if (share(pr2.left, sent) >= 0.70 && share(pr2.right, sent) >= 0.70) out.push(`match pair given in one sentence above: "${pr2.left}" / "${pr2.right}"`);
  } else if (r.type === 'reorder') {
    for (const it of r.correctOrder || []) for (const sent of sents) if (share(it, sent) >= 0.75) out.push(`reorder item printed verbatim above: "${String(it).slice(0, 44)}"`);
  }
  return [...new Set(out)];
};
for (const sec of SUBSECTIONS) for (const why of recoverable(sec)) problems.push(`"${sec.title}": ${why} — the recall is answerable by scrolling up (Verify B, packet 29)`);
{
  /*
   * THE NEGATIVE CONTROL IS A REAL SHIPPED SUBSECTION, NOT AN INVENTED ONE (V029's fourth reason).
   * A control stripped down to one sentence is a fake of the step it is clearing and of course it
   * passes. This control is `the-acid-test-ratio` exactly as built, body and all.
   */
  const real = SUBSECTIONS.find((x) => x.id.endsWith(':the-acid-test-ratio'));
  const teach = { keyIdea: real.keyIdea, body: real.body, realExample: real.realExample, misconception: real.misconception, examMatters: real.examMatters };
  const copied = { ...teach, recall: { type: 'fillin', template: ['The acid test takes inventory out of the current assets because inventory has to be ___ before it can pay anybody'], answers: ['sold'] } };
  const applied = { ...teach, recall: { type: 'fillin', template: [`A firm with current assets of ${money(F.currentAssets)} and current liabilities of ${money(F.currentLiabilities)} has a working capital of ___`], answers: [money(F.workingCapital)] } };
  if (!recoverable(copied).length) problems.push('the answer-recoverable check no longer fires on a fill-in that is the key idea with one word removed');
  if (recoverable(applied).length) problems.push('the answer-recoverable check fires on a fill-in that applies the idea to figures');
}
/* ── A RECALL MAY NOT NEED A LATER SUBSECTION (Layer 6, packet 35) ─────────── */
{
  const order = SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, ''));
  const firstTaught = new Map();
  SUBSECTIONS.forEach((sec, i) => {
    const text = `${sec.title} ${sec.keyIdea} ${(sec.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`.toLowerCase();
    for (const term of TEACHING_TERMS) if (!firstTaught.has(term) && text.includes(term)) firstTaught.set(term, i);
  });
  const recallStrings = (r) => {
    if (!r) return [];
    if (r.type === 'fillin') return [...(r.template || []), ...(r.answers || []), ...(r.distractors || [])];
    if (r.type === 'classify') return (r.groups || []).flatMap((g) => [g.name, ...(g.items || [])]);
    if (r.type === 'match') return (r.pairs || []).flatMap((x) => [x.left, x.right]);
    if (r.type === 'reorder') return r.correctOrder || [];
    return [];
  };
  SUBSECTIONS.forEach((sec, i) => {
    const text = recallStrings(sec.recall).join(' ').toLowerCase();
    for (const term of TEACHING_TERMS) {
      if (!text.includes(term)) continue;
      const at = firstTaught.get(term);
      if (at != null && at > i) problems.push(`"${sec.title}" (step ${i + 1}) has a recall naming "${term}", which is first taught in "${SUBSECTIONS[at].title}" (step ${at + 1}) — a student meeting this widget cannot answer it (Layer 6)`);
    }
  });
  {
    const probe = (mine, termIdx) => termIdx > mine;
    if (!probe(1, 4)) problems.push('the forward-reference check no longer fires on a term taught four steps later');
    if (probe(9, 3)) problems.push('the forward-reference check fires on a term taught earlier, which is synoptic and fine');
    if (!order.length) problems.push('the forward-reference check has no subsection order to work from');
  }
}

/* ── A PRACTICE ITEM MUST BE PINNED TO THE CHAPTER IT TESTS ────────────────── */
/*
 * The pins DERIVE from each item's own `block` tag, which makes a pin to a chapter that does not
 * exist unrepresentable — and cannot see a tag that is simply WRONG. `structure-04` is the live
 * instance in the other direction: the liquidity chapter is handed a gearing question. The tag is
 * checked against the CONTENT: a practice item has to share more distinctive vocabulary with the
 * block it is pinned to than with any other block.
 */
{
  const blockText = content.map((b) => `${b.title} ${b.sections.map((x) => `${x.title} ${x.keyIdea} ${(x.body || []).map((y) => `${y.text || ''} ${(y.items || []).join(' ')}`).join(' ')}`).join(' ')}`.toLowerCase());
  /*
   * SCORED ON THE SECTION'S OWN TAUGHT VOCABULARY, NOT ON ANY LONG WORD — because the first version
   * of this check was below its own noise floor and said so. Packet 35 scored every six-letter word
   * an item shared with a block. Run here it reported three items mis-pinned, and the words doing
   * the work were "settle", "measured", "neither", "available" and "growing": a section in which
   * every chapter is about one firm's accounts shares almost all of its prose across all five, so
   * the measurement was of English rather than of topic. Filtering to words fewer than three blocks
   * use sharpened it and did not fix it — "settle" is still in exactly one chapter by accident.
   *
   * What the check is FOR is the live defect: `structure-04` is a gearing question pinned to the
   * liquidity chapter, and gearing is a term this section does not teach at all. So the measure is
   * `TEACHING_TERMS` — the specification's own vocabulary, which is what the pin is really about.
   * An item must name at least one, the chapter it is pinned to must teach at least half of the ones
   * it names, and no other chapter may teach three more of them.
   *
   * The data extract still comes out first: "Calculate the current ratio and the acid test ratio
   * from the following statement of financial position" is a Liquidity item whose DATA is the
   * previous chapter's document, and scoring the data made it look like a Cash chapter item.
   */
  const stripExtract = (q) => String(q).replace(SFP_EXTRACT, ' ').replace(SCI_EXTRACT, ' ');
  const termsIn = (s2) => TEACHING_TERMS.filter((t) => String(s2).toLowerCase().includes(t));
  const blockTeaches = blockText.map((t) => new Set(TEACHING_TERMS.filter((term) => t.includes(term))));
  PRACTICE.forEach((pItem, i) => {
    const mine = BLOCKS.indexOf(pItem.block);
    const used = termsIn(`${stripExtract(pItem.question)} ${pItem.guidance}`);
    if (!used.length) { problems.push(`practice ${i} (${pItem.command}) names no term this section teaches — which is exactly structure-04's live gearing question, pinned to a chapter that never mentions gearing`); return; }
    const covered = used.filter((t) => blockTeaches[mine].has(t));
    if (covered.length * 2 < used.length) problems.push(`practice ${i} (${pItem.command}) is pinned to "${pItem.block}", which teaches only ${covered.length} of the ${used.length} specification terms it names`);
    const counts = blockTeaches.map((s2) => used.filter((t) => s2.has(t)).length);
    const best = counts.indexOf(Math.max(...counts));
    if (best !== mine && counts[best] - counts[mine] >= 3) problems.push(`practice ${i} (${pItem.command}) is pinned to "${pItem.block}" (${counts[mine]} of its terms) while "${BLOCKS[best]}" teaches ${counts[best]} of them — a student practising the wrong chapter (Layer 6)`);
  });
  {
    /*
     * A/B: the live defect must fire and a legitimate item must not. The gearing question is quoted
     * from `structure-04`; the Calculate is this packet's own, and it is the one the old check
     * rejected.
     */
    const gearing = 'Explain two possible reasons why a business might have a high gearing ratio.';
    if (termsIn(gearing).length) problems.push('the pin check finds a specification term in the live gearing question, which teaches none of them');
    if (termsIn('Calculate the current ratio and its acid test ratio').length < 2) problems.push('the pin check no longer finds the two liquidity terms in a question that names both');
    if (!blockTeaches[BLOCKS.indexOf(B4)].has('acid test')) problems.push('the liquidity chapter does not teach the acid test, which every check above assumes');
  }
}

/* Every reorder's sequence must be taught by an extras chain or by a flow. */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const candidates = [...EXTRAS.chains.map((c) => c.steps || []), ...SUBSECTIONS.flatMap((s) => (s.body || []).filter((b) => b.type === 'flow').map((f) => (f.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x))))];
  const sourced = candidates.some((steps) => {
    let last = -1, matched = 0;
    for (const item of r.correctOrder) {
      let best = -1, bestScore = 0;
      steps.forEach((st, i) => { if (i <= last) return; const j = Math.max(jac(item, st), shareDistinctive(item, st) ? 0.2 : 0); if (j > bestScore) { bestScore = j; best = i; } });
      if (best >= 0 && bestScore >= 0.2) { matched += 1; last = best; }
    }
    return matched / r.correctOrder.length >= 0.5;
  });
  if (!sourced) problems.push(`"${sec.title}": no extras chain or flow teaches this reorder's sequence in this order`);
}

/* ── an explanation may not name an option by its POSITION (packet 26) ─────── */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/i;
for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}" — placeKeys deals the key into a slot and F074 shuffles again, so it describes whatever lands there (packet 26)`);
{
  if (!BY_POSITION.test('The second option divides by cost of sales instead.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test('Dividing by cost of sales rather than revenue answers a different question.')) problems.push('the option-position check fires on an option named by its content');
}

/* ── quiz shape ────────────────────────────────────────────────────────────── */
for (const q of QUIZ) {
  const opts = q.options.map((o) => String(o).trim().toLowerCase());
  if (new Set(opts).size !== opts.length) problems.push(`duplicate options in "${q.question.slice(0, 60)}"`);
  if (q.options.length !== 4) problems.push(`${q.options.length} options in "${q.question.slice(0, 60)}"`);
  if (!q.explanation || q.explanation.length < 80) problems.push(`thin explanation on "${q.question.slice(0, 60)}"`);
}
{
  /*
   * `topFix-04` NAMES TWO DUPLICATE PAIRS — Q5/Q17 and Q9/Q13. `quiz.near-dup` fires at a token
   * Jaccard of 0.5, so the check here is the same measure applied to this bank before the validator
   * sees it, and it reports the PAIR rather than one member.
   */
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    const s = jac(QUIZ[i].question, QUIZ[j].question);
    if (s >= 0.5) problems.push(`two quiz stems share ${Math.round(s * 100)}% of their words: "${QUIZ[i].question.slice(0, 50)}" and "${QUIZ[j].question.slice(0, 50)}"`);
  }
}
{
  /*
   * `quiz.long-correct` fires only above 1.5×, so a bank whose key is simply the LONGEST option 40%
   * of the time passes it (packet 21), and `topFix-04` records three live items where the length is
   * the giveaway. Baseline is 25%.
   */
  const longest = QUIZ.filter((x) => { const c = String(x.options[x.correctIndex]).length; return x.options.every((o, j) => j === x.correctIndex || String(o).length < c); }).length;
  const shareLong = longest / QUIZ.length;
  if (shareLong > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${QUIZ.length} items (${Math.round(shareLong * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}
{
  const hist = [0, 0, 0, 0];
  QUIZ.forEach((x) => { hist[x.correctIndex] += 1; });
  if (Math.max(...hist) - Math.min(...hist) > 3) problems.push(`answer histogram ${JSON.stringify(hist)} is lumpy`);
}
{
  /*
   * POSITIONAL PROSE IN AN EXPLANATION — `topFix-04` and `quiz-01`, one layer down.
   *
   * The keys in this bank are DEALT into position by `placeKeys`, and `QuizTab.jsx:150` and
   * `InlineQuiz.jsx:87` render `options` in array order. So an explanation that says "the last
   * figure" or "only the first" is describing the order the AUTHOR typed, which no student ever
   * sees. The packet shipped one of each: an item whose key is 8% explained that dividing the
   * interest by revenue "gives the last figure", when the rendered last figure WAS the 8% key and
   * 2% was third — a student who answered correctly was then taught the wrong method for it. That
   * is the defect topFix-04 and quiz-01 exist to remove, arriving in the explanation rather than
   * in the stem.
   *
   * The rule is absolute rather than clever: no ordinal at all inside a quiz explanation. Several
   * legitimate sentences were rewritten to name the thing instead of counting to it ("a question
   * containing the word 'during' is about the statement of comprehensive income"), which is better
   * prose anyway and leaves a check with no judgement in it to get wrong.
   */
  /*
   * One carve-out, and only one: these words are also units of TIME, and "last year's profit
   * settles no invoices" is a sentence about a calendar rather than about an options array. The
   * carve-out is a fixed list of time nouns, A/B'd in both directions below, not a judgement call.
   */
  const ORDINAL = /\b(?:first|second|third|fourth|fifth|last|final)\b(?!\s+(?:year|years|week|weeks|month|months|day|days|quarter|quarters|time)\b)/i;
  for (const q of QUIZ) {
    const m = String(q.explanation).match(ORDINAL);
    if (m) problems.push(`an ordinal in a quiz explanation, and the options are dealt into position by placeKeys: "${String(q.explanation).slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, ' ')}"`);
  }
  /* A/B, against the string that actually shipped and against the one that replaced it */
  if (!ORDINAL.test('Dividing the interest by revenue instead gives the last figure, and dividing the loan by revenue gives neither.')) problems.push('the positional-prose check no longer fires on the explanation the verifier rejected');
  if (!ORDINAL.test('Only the first grows revenue and cost of sales together.')) problems.push('the positional-prose check no longer fires on "Only the first"');
  if (ORDINAL.test('The rate is the interest divided by the amount borrowed, which is 8%. Dividing the interest by revenue instead gives 2%.')) problems.push('the positional-prose check fires on an explanation that names every figure by value');
  if (ORDINAL.test('Last year\'s profit settles no invoices.')) problems.push('the positional-prose check fires on "last year", which is a date and not a position');
  if (!ORDINAL.test('The last of them sits below the operating profit line.')) problems.push('the time carve-out has swallowed "the last of them", which IS a position');
}
/*
 * A SENTENCE THAT OPENS IN LOWER CASE, which is what an interpolated list looks like when the list
 * is held in the specification's own words and the specification writes them mid-sentence. Verify B
 * read the 10-mark Assess added for `structure-05` as an unfinished template join: "…failing to pay
 * a supplier. weak cash flow, overestimation of sales, overtrading, poor inventory control are all
 * suggested." Nothing was missing; `INTERNAL_CAUSES` simply starts a sentence here and starts it in
 * lower case, and the same shape sits behind a flashcard.
 *
 * `sentence()` fixes the two instances. This makes the class unrepresentable, because the next list
 * a packet interpolates will be the specification's words too. Figures are left alone: the
 * character after the full stop must be a LETTER, so "1.60:1" and "$1,300,000. 60% of the dollar"
 * are not sentence boundaries, and a fixed list of abbreviations carves out "e.g." and its kin.
 */
{
  /* The abbreviation lookbehind stops at the full stop the match starts on, not past it: written
     `(?:e\.g)\.` it tested the text before "e.g" and never fired at all — caught by its own A/B. */
  const SENTENCE_CASE = /(?<!\b(?:e\.g|i\.e|etc|vs|approx|Fig|No))(?<=[a-z0-9)%”"'\]])\.\s+[a-z]/;
  for (const s of prose) {
    const m = s.match(SENTENCE_CASE);
    if (m) problems.push(`a sentence opening in lower case, which reads as an unfinished template join: "${s.slice(Math.max(0, m.index - 60), m.index + 60).replace(/\s+/g, ' ')}"`);
  }
  /* A/B, against the string the verifier rejected and against the one that replaced it */
  if (!SENTENCE_CASE.test('A tile wholesaler with rising revenue closes after failing to pay a supplier. weak cash flow, overestimation of sales are all suggested.')) problems.push('the sentence-case check no longer fires on the practice stem the walkthrough rejected');
  if (SENTENCE_CASE.test('A tile wholesaler with rising revenue closes after failing to pay a supplier. Weak cash flow, overestimation of sales are all suggested.')) problems.push('the sentence-case check fires on the capitalised stem that replaced it');
  if (SENTENCE_CASE.test('Acid test = ($400,000 − $240,000) ÷ $250,000 = 0.64:1. The gap is the inventory.')) problems.push('the sentence-case check fires on a ratio worked to two decimal places');
  if (SENTENCE_CASE.test('Gross profit is $700,000, e.g. the first of the three remainders.')) problems.push('the abbreviation carve-out no longer covers "e.g."');
  if (!SENTENCE_CASE.test('The margin is 8%. the rest is interest.')) problems.push('the sentence-case check misses a lower-case opening after a percentage');
}
/*
 * EVERY PRINTED TOTAL IS THE SUM OF ITS OWN PRINTED PARTS. The working capital cycle is printed as
 * two stages and as their total, and the fill-in hint tells the student the total is "the two
 * stages of the cycle added together". With each term rounded at print time the page showed 67, 27
 * and 95: a student who did exactly what the hint said typed 94 and was marked wrong. The day
 * figures are rounded once, at source in `_packet36-util.mjs`, and this asserts the property the
 * hint promises off the figures as they are PRINTED.
 */
{
  const num = (s) => Number(String(s).match(/-?\d+/)?.[0]);
  const stage1 = num(days(FIRM.inventoryDays));
  const stage2 = num(days(FIRM.receivableDays));
  const total = num(days(FIRM.inventoryDays + FIRM.receivableDays));
  if (stage1 + stage2 !== total) problems.push(`the cycle prints ${stage1} and ${stage2} but totals ${total}, and a fill-in hint tells the student to add the two stages together`);
  if (!Number.isInteger(FIRM.inventoryDays) || !Number.isInteger(FIRM.receivableDays) || !Number.isInteger(FIRM.payableDays)) problems.push('a day figure is unrounded at source, so two places that print it can disagree');
}
/*
 * `structure-07` IS THAT THE QUIZ AND THE FLASHCARDS TEST WHAT `content[]` NEVER TAUGHT — the
 * statement of financial position, current assets and liabilities, working capital. Asserted
 * directly against the subsection titles and teaching text, in both directions.
 */
{
  const taught = SUBSECTIONS.map((s) => `${s.title} ${s.keyIdea} ${(s.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`).join(' ').toLowerCase();
  const required = [
    'gross profit', 'operating profit', 'profit for the year', 'statement of comprehensive income',
    'gross profit margin', 'operating profit margin', 'statement of financial position',
    'current assets', 'current liabilities', 'working capital', 'current ratio', 'acid test',
    'factoring', 'inventory jit', 'trade receivables', 'trade payables',
    ...INTERNAL_CAUSES, ...EXTERNAL_CAUSES,
  ];
  const parts = (t) => t.toLowerCase().split(/\s+(?:and|or|versus|vs)\s+|,\s*/).map((x) => x.trim()).filter(Boolean);
  const untaught = [...new Set(required.filter((t) => !parts(t).every((x) => taught.includes(x))))];
  if (untaught.length) problems.push(`the specification names these and the section does not teach them: ${untaught.join(', ')}`);
  {
    const probe = (text, term) => !parts(term).every((x) => text.includes(x));
    if (!probe('the current ratio and the acid test', 'working capital')) problems.push('the taught check no longer fires on a term the section omits');
    if (probe('poor marketing loses customers and poor quality loses them twice', 'poor marketing')) problems.push('the taught check fires on a bullet taught as two separate ideas');
  }
  const quizText = QUIZ.map((q) => `${q.question} ${q.options.join(' ')} ${q.explanation}`).join(' ').toLowerCase();
  const cardText = FLASHCARDS.map((c) => `${c.front} ${c.back}`).join(' ').toLowerCase();
  for (const [name, hay] of [['quizzed', quizText], ['flashcarded', cardText]]) {
    const notTaught = [...new Set(required.filter((t) => parts(t).some((x) => hay.includes(x)) && !parts(t).every((x) => taught.includes(x))))];
    if (notTaught.length) problems.push(`${name} but never taught: ${notTaught.join(', ')} (structure-07)`);
  }
}

/* ── pins, and the free-quiz ceiling ──────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-04: blocks 1 and 4 of the live section have none)`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; PreTest.jsx slices the unreserved pool at three`);
if (![...unpinned].every((i) => i < 3)) problems.push('the three unpinned quiz items are not FIRST in the array — a free student is served only PREVIEW_LIMITS.quiz items, so the pre-test pool must be at the front');
{
  const pinned = Object.values(quizIndices).flat();
  const dup = pinned.filter((x, i) => pinned.indexOf(x) !== i);
  if (dup.length) problems.push(`quiz item pinned by more than one block: ${dup.join(', ')}`);
  if (pinned.some((i) => unpinned.has(i))) problems.push('a pre-test item is also pinned to a chapter check-in — the student would meet the same question twice');
  if (BLOCKS.every((b, i) => (quizIndices[b] || [])[0] === i)) problems.push('quizIndices are 0,1,2,… in block order, which is `pins.identity` and the live defect');
  const pp = Object.values(practiceIndices).flat();
  const pdup = pp.filter((x, i) => pp.indexOf(x) !== i);
  if (pdup.length) problems.push(`practice item pinned by more than one block: ${pdup.join(', ')}`);
  const orphanPractice = PRACTICE.map((_, i) => i).filter((i) => !pp.includes(i));
  if (orphanPractice.length) problems.push(`practice item(s) ${orphanPractice.join(', ')} pinned to no block — structure-04 records two live items orphaned this way`);
}
/*
 * THE BLOCK COUNT IS A DECISION WITH A MEASURED PRICE, AND PACKET 31 SUPERSEDED PACKET 29's NUMBER
 * (DECISIONS, 17 September): since packet 2.5 `freeQuizPayload()` takes the chapter pins first and
 * tops the Quiz tab up only if the pins did not already fill it, so five chapters spend 5 of
 * `FREE_QUIZ_MAX` (10) and `PRETEST_HEADROOM` (3) is paid in full. The ceiling is ten chapters.
 * Five is measured here rather than inherited.
 */
if (BLOCKS.length > 10) problems.push(`${BLOCKS.length} blocks: past ten, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz for a signed-out student (lib/preview-limits.js)`);
if (content.length !== BLOCKS.length) problems.push(`${content.length} blocks built against ${BLOCKS.length} declared`);

/* ── practice guidance: two paragraphs, and a clean opening ────────────────── */
const ALLOCATION = /\(\s*\d+\s*marks?\s*\)|\(\s*\d+\s*\)/;
for (const p of PRACTICE) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 50)}" has one guidance paragraph — GUIDED mode would print the whole mark scheme above the answer box`);
  if (ALLOCATION.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" allocates marks in its OPENING paragraph, which is the half GUIDED mode shows`);
  if (/\$[\d,]/.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" puts a figure in its OPENING paragraph, which is the scaffold a student reads before writing`);
  if (p.marks > 6 && ALLOCATION.test(p.guidance)) problems.push(`practice "${p.question.slice(0, 50)}" is a ${p.marks}-mark item and its guidance allocates points; tariffs above 6 are not marked that way (\`practice.levels\`)`);
  if (p.marks > 6 && !/Level 1/.test(p.guidance)) problems.push(`practice "${p.question.slice(0, 50)}" is a ${p.marks}-mark item whose guidance names no levels (practice-03 is the live guidance doing exactly this)`);
  if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 50)}" does not end with its own tariff in brackets`);
}
{
  if (!ALLOCATION.test(`Gross profit = ${money(F.grossProfit)} (1 mark).`)) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Work down the ladder in the specification\'s own order.')) problems.push('the practice.opening check fires on planning advice');
}

/* ══ THE ARITHMETIC SPINE, RE-DERIVED ═══════════════════════════════════════ */
/*
 * THE PROPERTIES THE WHOLE SECTION RESTS ON, asserted from the functions rather than read off a
 * table. `accuracy-01` and `quiz-01` are one defect — the section calls the same computation
 * operating profit in one place and net profit in another — so the ladder is asserted rung by rung
 * before anything else. The four liquidity moves are asserted by SIGNATURE, because the teaching is
 * that they differ and a change that made two of them behave alike would leave a chapter arguing
 * for a distinction its own figures no longer show.
 */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };
const near = (label, got, want, tol = 0.005) => { if (Math.abs(got - want) > tol) problems.push(`${label}: got ${got}, expected about ${want}`); };

/* the statement of comprehensive income, in Appendix 9's order */
eq('revenue', F.revenue, 2000000);
eq('cost of sales', F.costOfSales, 1300000);
eq('other operating expenses', F.operatingExpenses, 500000);
eq('interest', F.interest, 40000);
eq('gross profit is revenue less cost of sales', F.grossProfit, F.revenue - F.costOfSales);
eq('operating profit is gross profit less other operating expenses', F.operatingProfit, F.grossProfit - F.operatingExpenses);
eq('profit for the year is operating profit less interest', F.profitForYear, F.operatingProfit - F.interest);
if (!(F.grossProfit > F.operatingProfit && F.operatingProfit > F.profitForYear)) problems.push('the three profits are not in descending order, so the ladder does not go down');
/* the three margins, each over REVENUE (Appendix 9, :2400-2418) */
eq('gross profit margin', F.gpm, 35);
eq('operating profit margin', F.opm, 10);
eq('profit for the year margin', F.npm, 8);
for (const [name, profit, margin] of [['gross', F.grossProfit, F.gpm], ['operating', F.operatingProfit, F.opm], ['for the year', F.profitForYear, F.npm]]) {
  near(`${name} margin is its profit over REVENUE`, margin, (profit / F.revenue) * 100);
}
eq('the gap between the operating and final margins is the interest', round2(((F.opm - F.npm) / 100) * F.revenue), F.interest);
eq('the gap between the gross and operating margins is the operating expenses', round2(((F.gpm - F.opm) / 100) * F.revenue), F.operatingExpenses);

/* the statement of financial position, and that it balances (Appendix 9, :2420-2445) */
eq('current assets', F.currentAssets, F.inventory + F.receivables + F.cash);
eq('current liabilities', F.currentLiabilities, F.payables + F.overdraft + F.otherPayables);
eq('net assets', F.netAssets, F.nonCurrentAssets + F.currentAssets - F.currentLiabilities - F.loan);
eq('the statement balances: net assets equal total equity', F.netAssets, F.shareCapital + F.retainedProfits);
eq('working capital', F.workingCapital, F.currentAssets - F.currentLiabilities);
near('current ratio', F.currentRatio, 1.6);
near('acid test ratio', F.acidTest, 0.64);
if (!(F.currentRatio > 1 && F.acidTest < 1)) problems.push('the current ratio is not above one while the acid test is below it — the gap between the two measures is what this chapter is about, and it has to point in opposite directions to be worth teaching');
eq('the whole gap between the two ratios is the inventory', round2((F.currentRatio - F.acidTest) * F.currentLiabilities), F.inventory);
near('the interest rate on the loan', F.interestRate, 8);

/* profit against cash: the reconciliation must land exactly on the closing balance */
eq('the cash movement reconciles', F.cashMovement, F.profitForYear - F.inventoryRise - F.receivableRise + F.payableRise - F.assetBought - F.loanRepaid);
eq('opening cash plus the movement is the closing balance', F.openingCash + F.cashMovement, F.cash);
if (F.cashMovement >= 0) problems.push('the cash movement is not negative, so the section\'s central claim — a profitable year that ends with less money — is not shown by its own figures');
if (F.profitForYear <= 0) problems.push('the year is not profitable, so "profitable and out of cash" is not what the figures show');

/* the four ways to improve liquidity, asserted by SIGNATURE */
eq('selling an asset raises working capital', F.sellAsset.workingCapital, F.workingCapital + F.assetSale);
if (!(F.sellAsset.currentRatio > F.currentRatio && F.sellAsset.acidTest > F.acidTest && F.sellAsset.cash > F.cash)) problems.push('selling an underused asset does not improve all three measures, and the chapter teaches that it does');
eq('extending supplier credit leaves working capital UNCHANGED', F.supplierCredit.workingCapital, F.workingCapital);
if (!(F.supplierCredit.currentRatio < F.currentRatio)) problems.push('extending supplier credit does not LOWER the current ratio; this is topFix-04\'s Q19, and the arithmetic has to show it');
if (!(F.supplierCredit.acidTest > F.acidTest)) problems.push('extending supplier credit does not RAISE the acid test; the teaching is that equal amounts on both sides drag every ratio towards one to one, so a ratio below one must rise');
eq('factoring costs exactly the fee', round2(F.workingCapital - F.factoring.workingCapital), F.factorFee);
if (!(F.factoring.acidTest < F.acidTest && F.factoring.cash > F.cash)) problems.push('factoring does not raise the cash while lowering the acid test, which is the single sharpest point in the liquidity chapter');
eq('inventory JIT leaves the current ratio unchanged', round2(F.jit.currentRatio), round2(F.currentRatio));
eq('inventory JIT leaves working capital unchanged', F.jit.workingCapital, F.workingCapital);
if (!(F.jit.acidTest > F.acidTest)) problems.push('inventory JIT does not raise the acid test, and it is the largest single move on it');
{
  /* the four signatures must be DISTINCT, or the chapter is arguing for a difference it cannot show */
  const sig = (o) => [Math.sign(round2(o.workingCapital - F.workingCapital)), Math.sign(round2(o.currentRatio - F.currentRatio)), Math.sign(round2(o.acidTest - F.acidTest))].join(',');
  const sigs = [F.sellAsset, F.supplierCredit, F.factoring, F.jit].map(sig);
  if (new Set(sigs).size !== 4) problems.push(`the four ways to improve liquidity do not have four distinct signatures: ${JSON.stringify(sigs)}`);
}

/* the causes of failure, each a percentage on one line of the statement */
eq('a price cut leaves cost of sales untouched', F.competitionProfit, F.competitionRevenue - F.costOfSales - F.operatingExpenses);
eq('a price cut of five per cent halves the operating profit', F.competitionProfit, F.operatingProfit / 2);
if (!(F.competitionProfit < F.demandProfit)) problems.push(`a ${pct(F.priceCut)} price cut does less damage than a ${pct(F.demandFall)} fall in volume; the chapter's sharpest point is that the smaller-sounding shock is the worse one`);
eq('a currency fall lands on cost of sales', F.currencyProfit, F.revenue - F.currencyCostOfSales - F.operatingExpenses);
if (!(F.currencyProfit < F.operatingProfit * 0.5)) problems.push('the currency movement does not take more than half the operating profit, so the importer example understates what a currency does to a thin margin');
eq('an interest rate rise leaves the operating profit untouched', F.operatingProfit, F.grossProfit - F.operatingExpenses);
eq('an interest rate rise moves only the profit for the year', F.rateProfitForYear, F.operatingProfit - F.rateInterest);
if (!(F.rateProfitForYear < F.profitForYear)) problems.push('the interest rate rise does not reduce the profit for the year');
eq('overtrading needs the extra current assets less the extra payables', F.overtradeNeed, F.overtradeInventory + F.overtradeReceivables - F.overtradePayables);
if (!(F.overtradeNeed > F.cash)) problems.push('the growth the overtrading example describes could be funded out of the bank balance, so it is not overtrading');
eq('the write-off is a quarter of the overstock', F.writeOff, round2((F.overstock * F.writeOffShare) / 100));
eq('poor quality raises the cost of sales', F.qualityProfit, F.revenue - (F.costOfSales + F.qualityExtraCost) - F.operatingExpenses);
eq('supplier revenue lost is the daily revenue times the days', F.supplierRevenueLost, Math.round(F.dailyRevenue * F.supplierDaysLost));
/* every cause must leave the firm worse off, or the row is teaching nothing */
for (const [name, profit] of [['competition', F.competitionProfit], ['market conditions', F.demandProfit], ['poor marketing', F.marketingProfit], ['supplier problems', F.supplierProfit], ['exchange rates', F.currencyProfit], ['poor quality', F.qualityProfit]]) {
  if (profit >= F.operatingProfit) problems.push(`${name} does not reduce the operating profit below ${money(F.operatingProfit)}`);
}

/* ══ DIAGRAMS ═══════════════════════════════════════════════════════════════ */
/*
 * THE WATERFALL IS COUNTED BACK OUT OF THE EMITTED SVG (packets 19, 23, 25, 29): a figure computed
 * correctly and printed into the wrong `<text>` is the same defect one layer along. The bar heights
 * are read out of the `<rect>` elements and each is re-derived from `FIRM`.
 */
{
  const wf = svgOf(DIAGRAMS[0])[0];
  for (const v of [F.revenue, F.grossProfit, F.operatingProfit, F.profitForYear]) {
    if (!wf.includes(money(v))) problems.push(`the waterfall does not print ${money(v)}, which is one of the four figures it exists to show`);
  }
  const rects = [...wf.matchAll(/<rect[^>]*\by="([\d.]+)"[^>]*\bheight="([\d.]+)"/g)].map((m) => ({ y: parseFloat(m[1]), h: parseFloat(m[2]) }));
  if (rects.length !== 4) problems.push(`the waterfall emits ${rects.length} bars; it teaches four`);
  else {
    for (let i = 1; i < rects.length; i += 1) if (rects[i].h >= rects[i - 1].h) problems.push(`waterfall bar ${i + 1} is not shorter than bar ${i}, so the ladder does not descend`);
    const ratios = rects.map((r) => r.h / rects[0].h);
    const want = [1, F.grossProfit / F.revenue, F.operatingProfit / F.revenue, F.profitForYear / F.revenue];
    ratios.forEach((r, i) => { if (Math.abs(r - want[i]) > 0.01) problems.push(`waterfall bar ${i + 1} is ${Math.round(r * 100)}% of the revenue bar and the arithmetic says ${Math.round(want[i] * 100)}%`); });
  }
  /* A/B: the descent check must fire on an ascending set and not on a descending one. */
  const descends = (hs) => hs.every((h, i) => i === 0 || h < hs[i - 1]);
  if (descends([10, 20, 30])) problems.push('the waterfall descent check no longer fires on bars that grow');
  if (!descends([100, 35, 10, 8])) problems.push('the waterfall descent check fires on a correct ladder');
}
/*
 * TEXT EXTENT AND THE MINIMUM FACE (packets 25, 29). `gridColumns` throws when a table does not fit;
 * the runner measures the emitted result anyway, because a label placed by a function that was
 * given the wrong width is still off the canvas.
 */
/*
 * TWO FLOORS, AND WHICH ONE APPLIES DEPENDS ON WHETHER THE STUDENT IS OFFERED THE SHEET. A DRAWN
 * diagram renders inline and nowhere else, so its floor is `MIN_FACE` in viewBox units — Verify B
 * measured the inline canvas at 313 CSS px, where 12 units is 8.5px and 11 is 7.8. A DECLARED table
 * always offers the full-screen sheet, and the rule that governs it is the validator's own:
 * `diagram.table-legible` scales the smallest face by 620/viewBoxWidth and refuses below 12px. At
 * the 440-unit frame a 10-unit cell is 14.1px, which is why the tables here are authored at 10 and
 * the drawings at 12. Applying the drawing floor to a table would have failed 150 legible cells.
 */
const TABLE_COLUMN_PX = 620;
for (const d of ALL_DIAGRAMS) {
  const declared = d.kind === 'table';
  for (const svg of svgOf(d)) {
    const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1];
    const [, , vbW, vbH] = vb ? vb.trim().split(/[\s,]+/).map(Number) : [];
    if (!vbW || !vbH) { problems.push(`"${d.title}": a scenario has no usable viewBox`); continue; }
    const floorFails = (s) => (declared ? s * (TABLE_COLUMN_PX / vbW) < 12 : s < MIN_FACE);
    const floorWhy = (s) => (declared ? `${round2(s * (TABLE_COLUMN_PX / vbW))}px in the ${TABLE_COLUMN_PX}px column, below the 12px \`diagram.table-legible\` floor` : `a ${s}-unit face, below the ${MIN_FACE}-unit floor`);
    for (const m of svg.matchAll(/<text\b[^>]*\bx="([\d.-]+)"[^>]*\by="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*\btext-anchor="([a-z]+)"[^>]*>([^<]*)<\/text>/g)) {
      const [, xs, ys, size, anchor, txt] = m;
      const x = parseFloat(xs), y = parseFloat(ys), s = parseFloat(size);
      if (floorFails(s)) problems.push(`"${d.title}": ${floorWhy(s)}: "${txt.slice(0, 40)}"`);
      const w = estWidth(txt, s);
      const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x;
      const right = left + w;
      if (left < -1 || right > vbW + 1) problems.push(`"${d.title}": "${txt.slice(0, 40)}" runs from ${round2(left)} to ${round2(right)} on a ${vbW}-unit canvas`);
      if (y < 0 || y > vbH) problems.push(`"${d.title}": "${txt.slice(0, 40)}" sits at y=${y} on a ${vbH}-unit canvas`);
    }
    for (const m of svg.matchAll(/<text\b(?![^>]*text-anchor)[^>]*\bx="([\d.-]+)"[^>]*\bfont-size="([\d.]+)"[^>]*>([^<]*)<\/text>/g)) {
      const x = parseFloat(m[1]), s = parseFloat(m[2]), txt = m[3];
      if (floorFails(s)) problems.push(`"${d.title}": ${floorWhy(s)}: "${txt.slice(0, 40)}"`);
      if (x + estWidth(txt, s) > vbW + 1) problems.push(`"${d.title}": "${txt.slice(0, 40)}" overruns the ${vbW}-unit canvas`);
    }
  }
  if (declared && Array.isArray(d.checklist) && d.checklist.length) problems.push(`"${d.title}" declares kind:"table" and carries a checklist, which \`diagram.table-checklist\` refuses`);
  if (!declared && !(Array.isArray(d.checklist) && d.checklist.length)) problems.push(`"${d.title}" is a drawn diagram with no checklist — the Construct command word is answered from one`);
}
{
  /* A/B: each floor must fire at the size the other one forgives. */
  const drawnFails = (s) => s < MIN_FACE;
  const tableFails = (s) => s * (TABLE_COLUMN_PX / 440) < 12;
  if (!drawnFails(10)) problems.push('the drawn-diagram floor no longer fires at 10 units');
  if (drawnFails(12)) problems.push('the drawn-diagram floor fires at the 12 units it is set to allow');
  if (tableFails(10)) problems.push('the table floor fires at 10 units on a 440-unit frame, which is 14.1px and legible');
  if (!tableFails(8)) problems.push('the table floor no longer fires at 8 units on a 440-unit frame');
}
{
  /* A/B: the extent check must catch a label pushed off the right edge and pass one that fits. */
  const fits = (x, txt, size, vbW) => x + estWidth(txt, size) <= vbW + 1;
  if (fits(400, 'Statement of financial position', 12, 440)) problems.push('the text-extent check no longer fires on a label that overruns the canvas');
  if (!fits(20, 'Gross profit', 12, 440)) problems.push('the text-extent check fires on a label that fits');
}

/* ── ids, signs, currency, and the things that are not allowed at all ─────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(SUBSECTIONS.map((s) => s.id), SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall.id), content.map((b) => b.id));
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dupIds.length) problems.push(`duplicate ids: ${[...new Set(dupIds)].join(', ')} — structure-08 is three flashcards printed twice, and a hashed id makes that a build failure`);
{
  const fronts = FLASHCARDS.map((c) => c.front.trim().toLowerCase());
  const dupFronts = fronts.filter((x, i) => fronts.indexOf(x) !== i);
  if (dupFronts.length) problems.push(`duplicate flashcard fronts: ${[...new Set(dupFronts)].join(' | ')} (structure-08)`);
  const backs = FLASHCARDS.map((c) => c.back.trim().toLowerCase());
  const dupBacks = backs.filter((x, i) => backs.indexOf(x) !== i);
  if (dupBacks.length) problems.push(`duplicate flashcard backs: ${dupBacks.length} (structure-08 is cards 19-21 repeating 22-24 exactly)`);
}
{
  const ascii = prose.filter((s) => /\s-\d|\(-\d|=\s?-\d/.test(s));
  if (ascii.length) problems.push(`${ascii.length} strings use an ASCII hyphen as a minus sign: "${ascii[0].slice(0, 70)}"`);
}
{
  const other = readable.filter((s) => /[£€₹¥]/.test(s));
  if (other.length) problems.push(`${other.length} strings carry a currency other than dollars: "${other[0].slice(0, 70)}"`);
}
/*
 * NO NAMED REAL COMPANY AND NO YEAR. `topFix-05` asks for the Carillion example to be CORRECTED; it
 * is removed instead, which is packet 15's rule — keep the shape of the claim and drop the claim. A
 * four-digit year in student-facing prose is the signature of a dated assertion about a real firm
 * coming back, and a named company is the other half of it.
 */
ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bcouncil tax\b|\bOfgem\b|\bOfsted\b|\bCarillion\b|\bNike\b|\bAmazon\b|\bTesco\b|\bJohn Lewis\b|\bMarks (?:&|and) Spencer\b|\bM&S\b/gi, 'a UK-only institution or a named real company — topFix-05 is a dated and untrue claim about a real firm\'s accounts, and this audience sits WBS12 in Hong Kong, Malaysia, Pakistan, the Gulf, Nigeria and Kenya');
{
  const years = prose.filter((s) => /\b(?:19|20)\d{2}\b/.test(s));
  if (years.length) problems.push(`${years.length} strings carry a year, which is the signature of a dated claim about a real firm: "${years[0].slice(0, 80)}"`);
}

/* ── coverage, mapped BY HAND (V025) ──────────────────────────────────────── */
/*
 * A LEAF MAY NAME SEVERAL SUBSECTIONS, and several leaves may share one. The map is keyed on the
 * ORACLE's ids, so the gate is a comparison against `spec-items.json` rather than against a number
 * in a comment; the hand count of 24 substantive leaves is printed beside it.
 */
const LEAF_MAP = {
  /* 1 Profit */
  '1a-1': ['gross-profit'],
  '1a-2': ['operating-profit'],
  '1a-3': ['profit-for-the-year'],
  '1b': ['ways-to-increase-profits'],
  '1c-1': ['gross-profit-margin', 'operating-profit-margin', 'profit-for-the-year-margin'],
  '1c-2': ['ways-to-improve-profitability'],
  /* 2 Liquidity */
  '2a': ['profit-is-not-cash'],
  '2b-1': ['the-current-ratio', 'the-acid-test-ratio'],
  '2b-2': ['improving-liquidity-assets-and-supplier-credit', 'improving-liquidity-factoring-and-inventory-jit'],
  '2c': ['working-capital', 'the-importance-of-cash'],
  /* 3 Business failure */
  '3a-1': ['internal-causes-cash-flow-and-overtrading'],
  '3a-2': ['internal-causes-overestimation-and-inventory'],
  '3a-3': ['internal-causes-cash-flow-and-overtrading'],
  '3a-4': ['internal-causes-overestimation-and-inventory'],
  '3a-5': ['internal-causes-marketing-and-quality'],
  '3a-6': ['internal-causes-marketing-and-quality'],
  '3b-1': ['external-causes-market-competition-and-the-economy'],
  '3b-2': ['external-causes-market-competition-and-the-economy'],
  '3b-3': ['external-causes-market-competition-and-the-economy'],
  '3b-4': ['external-causes-exchange-rates-and-interest-rates'],
  '3b-5': ['external-causes-exchange-rates-and-interest-rates'],
  '3b-6': ['external-causes-regulation-suppliers-and-natural-phenomena'],
  '3b-7': ['external-causes-regulation-suppliers-and-natural-phenomena'],
  '3b-8': ['external-causes-regulation-suppliers-and-natural-phenomena'],
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, list] of Object.entries(LEAF_MAP)) {
    for (const slug of list) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  }
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const all = Array.isArray(oracle) ? oracle : oracle.items || oracle.rows;
  const rows = all.filter((r) => String(r.id || '').startsWith('BUS-2.3.3-'));
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('BUS-2.3.3-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `BUS-2.3.3-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);

  /*
   * THE NEGATIVE ASSERTIONS, AND THEY ARE THE PACKET'S RULE-1 WORK MADE INTO A BUILD FAILURE.
   * `structure-01` says this section should be numbered 2.3 with sub-topics 2.3.1 Profit, 2.3.2
   * Liquidity and 2.3.3 Business failure. If that were true the oracle would carry those rows.
   * It carries the opposite, and this asserts it against the oracle rather than against a comment,
   * so a respan or a renumber is caught rather than inherited.
   */
  const wording = (r) => String(r.wording || r.text || '').toLowerCase();
  if (!rows.some((r) => /^profit$|calculation of/i.test(wording(r)) || /gross profit/.test(wording(r)))) problems.push('BUS-2.3.3 no longer carries the profit calculations — re-read bus_spec.txt:921-958 before keeping structure-01\'s refusal');
  for (const [topic, label] of [['BUS-2.3.1-', '2.3.1'], ['BUS-2.3.2-', '2.3.2']]) {
    const near2 = all.filter((r) => String(r.id || '').startsWith(topic));
    if (!near2.length) { problems.push(`the oracle has no ${label} rows at all, which is not a state this section's numbering argument survives`); continue; }
    const looksLikeThis = near2.filter((r) => /acid test|working capital|statement of financial position|business failure/i.test(wording(r)));
    if (looksLikeThis.length) problems.push(`${label} now carries a row this section teaches: "${wording(looksLikeThis[0]).slice(0, 60)}" — structure-01 claims the sub-topics are numbered 2.3.1/2.3.2/2.3.3, and if that has become true the refusal has to be revisited`);
  }
  /* and the boundary the other way: 2.3.2 must still own break-even and cash-flow forecasting */
  const fin = all.filter((r) => String(r.id || '').startsWith('BUS-2.3.2-'));
  if (!fin.some((r) => /break-even/i.test(wording(r)))) problems.push('2.3.2 no longer carries break-even — packet 31 teaches it there, and if it has moved the ban in this section stops being correct');

  const hand = Object.values(LEAF_MAP).flat();
  console.log(`\nleaves: ${leaves.length} oracle rows (24 substantive by hand), ${Object.keys(LEAF_MAP).length} mapped to ${new Set(hand).size} of ${SUBSECTIONS.length} subsections`);
}

/* ── the validator, and the baseline ──────────────────────────────────────── */
const live = await loadBundle(SECTION);
const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const carried = after.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));

const subs = content.reduce((n, b) => n + b.sections.length, 0);
const recalls = SUBSECTIONS.filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});

console.log(`\n${SECTION} — packet 36`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${ALL_DIAGRAMS.length} diagrams (${ALL_DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
console.log(`  recalls: ${recalls.length} of ${SUBSECTIONS.length} subsections — ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
for (const f of newBlocks) console.log(`  NEW BLOCK ${f.rule} ${f.where}: ${f.detail}`);
for (const f of newDebt) console.log(`  NEW DEBT  ${f.rule} ${f.where}: ${f.detail}`);

if (problems.length) {
  console.error(`\n${problems.length} packet check${problems.length === 1 ? '' : 's'} failed:`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
if (newBlocks.length) { console.error('\nnew BLOCK findings; refusing.'); process.exit(1); }
if (newDebt.length) { console.error('\nnew DEBT findings; refusing (the per-packet gate is 0 new DEBT on my own section).'); process.exit(1); }

console.log(`
packet checks
  NUMBERING  the oracle re-read and asserted: 2.3.3 still holds Profit, Liquidity and Business
             failure as sub-topics 1, 2 and 3, and 2.3.1/2.3.2 still hold what packets 19 and 31
             built — which is structure-01 refused against the source rather than against a comment
  BOUNDARY   no gearing, no ROCE, no ratio analysis, no asset turnover, no dividend yield, no
             break-even, no contribution, no cash-flow forecast, no accounting depreciation, and no
             UK GAAP vocabulary — each banned with the spec line that settles it, each A/B'd against
             a string it must catch and one it must not
  SCOPE      no Examine, no Outline, no 12-mark Assess (Units 3/4 only), no Economics profit
             vocabulary, no internal ledger id in prose or in a diagram, no note about our own
             previous content
  CLAIMS     no uncited claim about what a marker does, how often a paper asks, or how papers are
             built — and every Assess item naming the supported judgement the census requires, which
             is practice-03 inverted
  PRACTICE   all eight Business command words, every tariff checked against the census for UNIT 2,
             every item ending in its own tariff, two guidance paragraphs with no figure and no
             allocation in the first, and level bands on everything above six marks
  CONTENT    every subsection inside the 350-word budget, a recall on all ${SUBSECTIONS.length}, the fill-in contract
             enforced before the validator sees it — including the live "Sal__" prefix-hint defect
             A/B'd directly — exactly one flow body and no reorder on it, the answer-recoverable
             check over every recall type against a REAL negative control, and nothing quizzed or
             flashcarded that no subsection teaches
  QUIZ       ${unpinned.size} unpinned items first for the pre-test, keys dealt from a hash of each stem, the
             histogram measured, the key no more often the longest option than chance, and every
             pair of stems checked at the same Jaccard \`quiz.near-dup\` uses
  PINS       every block pinned to a quiz, a practice item and a diagram, all DERIVED from each
             item's own block tag, no orphaned practice item, ${BLOCKS.length} blocks priced against FREE_QUIZ_MAX
  ARITHMETIC the ladder asserted rung by rung, all three margins over revenue, the statement of
             financial position BALANCING, the cash reconciliation landing exactly on ${money(F.cash)},
             a ${pct(F.priceCut)} price cut halving the operating profit, supplier credit leaving working capital
             UNCHANGED while moving the two ratios in OPPOSITE directions, factoring raising cash and
             lowering the acid test, and the four liquidity moves having four DISTINCT signatures
  DIAGRAMS   the waterfall's four figures counted BACK out of the emitted SVG and each bar height
             re-derived as a share of revenue, every bar shorter than the one before it, text EXTENT
             inside every canvas, and every face at or above ${MIN_FACE} units
  SHAPE      ids unique and flashcard fronts and backs distinct (structure-08) · one currency, one
             minus sign, no year, no named real company`);

if (DUMP) {
  const path = `audit/snapshots/packet-36-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-36-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
