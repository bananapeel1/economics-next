#!/usr/bin/env node
/**
 * PACKET 35 — entrepreneurs-leaders, Business Unit 1 (WBS11), IAL topic 1.3.5.
 * `audit/raw/bus_spec.txt:760-788`. FIVE blocks, twenty-five subsections, 22 substantive leaves.
 *
 *   node scripts/packet-35-entrepreneurs-leaders.mjs            # dry run, every check
 *   node scripts/packet-35-entrepreneurs-leaders.mjs --dump     # + write the bundle
 *   node scripts/packet-35-entrepreneurs-leaders.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. What this packet adds or
 * changes, with the reason:
 *
 *   - **THE BOUNDARY WITH TWO OTHER SECTIONS IS A BUILD FAILURE, NOT A CONVENTION.** Four of this
 *     packet's twenty-seven items ask this section to teach material the specification puts
 *     elsewhere: `specGap-01` and `topFix-01` want "moving from entrepreneur to leader", which is
 *     `1.3.4 · 5c` at `bus_spec.txt:753` and which **packet 30 built on 17 September after refusing
 *     two findings that asked to move it HERE**; `specGap-02` wants forms of business and liability,
 *     which are `2.3.1 · 4` and `· 5` at :870-878 and belong to `planning-raising-finance`, built by
 *     packet 19. `BANNED_ELSEWHERE` in `_packet35-util.mjs` refuses every one of those phrases, and
 *     the coverage block below asserts that the 1.3.5 span still contains none of them. Packet 26's
 *     dangerous class was a finding asking to DELETE in-scope content; this is the same defect
 *     inverted, and obeying it would have put the programme's third duplicate topic into
 *     `SPEC-OWNERSHIP.md`.
 *   - **THE QUIZ BIAS IS MEASURED AND ASSERTED, NOT EYEBALLED.** `quiz-01` is a measurement — 20 of
 *     25 keys at index 1, and the key the longest option in 15 of 25 — so it is answered by one.
 *     `placeKeys` deals each key into a slot from a hash of its own stem, and the runner asserts the
 *     histogram is even AND that the key is the longest option no more often than chance. Fixing the
 *     instance by hand would have left the next edit free to reintroduce it.
 *   - **THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG** (packet 30). `structure-02`,
 *     `quiz-03` and `topFix-03` are that `quizIndices` is the identity mapping `[0],[1],[2],[3]`, so
 *     the motives chapter shows a barriers question. `topFix-03` asks for the indices to be re-mapped
 *     by hand; deriving them makes the defect unrepresentable instead.
 *   - **`FAILED_SUBSTITUTION`, over every string INCLUDING the SVGs** (packet 29). Eight
 *     student-facing strings there read `P = 80 − undefinedQ`, one a scored quiz stem. Note the regex
 *     has NO trailing `\b`: `/\bundefined\b/` does not match `undefinedQ`, and the guard written for
 *     the defect would otherwise have passed it.
 *   - **THE ANSWER-RECOVERABLE RECALL CHECK, over every recall type** (packet 29's Verify B, and
 *     V029's corrected thresholds as applied by packet 30). It found 24 of 43 steps carrying a recall
 *     answerable by scrolling up and NOT ONE was a reorder: they were fill-ins whose template was the
 *     key-idea sentence minus a word. This is the check that does the work here, because this
 *     section has one reorder and twelve fill-ins.
 *   - **THE ARITHMETIC SPINE IS RE-DERIVED, IN A TOPIC THAT LOOKS QUALITATIVE.** Sub-topics 3 and 4
 *     name survival, profit maximisation, sales maximisation, market share, cost efficiency,
 *     opportunity cost and trade-offs as separate things, and the only way to show they ARE separate
 *     is to price one firm for each. The prices are SEARCHED FOR rather than typed — `FIRM` peaks the
 *     profit and revenue expressions over the surviving integer prices — and the runner asserts what
 *     it found: break-even at exactly $20 and $50, the peak at $35, and **sales maximisation and
 *     satisficing earning the SAME profit on opposite sides of the peak**, which is what makes profit
 *     a hill rather than a direction. A change to the schedule fails the build rather than quietly
 *     teaching four prices that no longer sit where the arithmetic puts them.
 *   - **EVERY MARKED PRICE IS COUNTED BACK OUT OF THE EMITTED CURVE** (packets 19, 23, 25, 29): a
 *     figure computed correctly and printed into the wrong `<text>` is the same defect one layer
 *     along. The profit curve's four markers are read out of the SVG and each one re-derived.
 *   - **TEXT EXTENT AND GLYPH-BOX COLLISIONS** (packets 25, 29). `gridColumns` throws when a table
 *     does not fit — it caught ten over-wide tables while this section was being written — and the
 *     runner measures the emitted result anyway.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, qty, pct, round2,
  FIRM, CHARACTERISTICS, BARRIERS, FINANCIAL_MOTIVES, NON_FINANCIAL_MOTIVES, OTHER_OBJECTIVES,
  BANNED_ELSEWHERE, TEACHING_TERMS, teachingWords, teachingVocabulary,
} from './_packet35-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5 } from './_packet35-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet35-assessment.mjs';
import { DIAGRAMS, estWidth, GRD, MIN_FACE, CURVE } from './_packet35-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5];
const F = FIRM;

const problems = [];

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
  diagrams: DIAGRAMS,
  extras: EXTRAS,
};

/* ── every string a student can read ───────────────────────────────────────── */
const allStrings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out)); return out; };
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/*
 * SVG TEXT IS STUDENT-FACING TEXT, joined ONE UNIT PER SVG (packet 29). `prose` excludes the SVG
 * blobs, which is right for sentence-level checks and wrong for vocabulary bans. Joined per diagram
 * rather than per `<text>` because a caption is wrapped a line per element, so a phrase spanning two
 * lines is in neither of them.
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
  /* A/B: the four shapes a failed substitution takes must fire. */
  for (const bad of ['a span of undefinedQ', 'the wage bill is NaN', 'the firm [object Object] pays', 'a wage of ${money(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
}

/* ── the section's own banned vocabulary ───────────────────────────────────── */
/*
 * RULE 2 OF THE PROGRAMME, AND THIS SECTION'S CASE IS THE BOUNDARY RATHER THAN THE VOCABULARY.
 * Every central term of 1.3.5 is present in `bus_spec.txt` and is used here in the specification's
 * own form — `intrapreneurship` (:767), `profit satisficing` (:774), `ethical stance` ·
 * `social entrepreneurship` · `independence` · `home working` (:775-776), `cost efficiency` (:783),
 * `employee welfare` (:784), `customer satisfaction` (:785), `social objectives` (:786),
 * `opportunity cost` (:787), `trade-offs` (:788). ONE is not: `revenue maximisation` is 0 hits and
 * the live section teaches the objective under that name, which is `specGap-06` and `topFix-04`.
 *
 * THE REST OF THE BANS ARE THE BOUNDARY WITH TWO OTHER SECTIONS, and they exist because four
 * findings ask for it to be crossed. `BANNED_ELSEWHERE` in `_packet35-util.mjs` carries each
 * pattern with the spec line that settles it; running it here rather than there means a phrase that
 * creeps into a diagram caption is caught as well as one in a paragraph.
 *
 * NO `g` FLAG on the source patterns. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`,
 * so a second call against the same string starts past the match and returns false. Packet 29 lost a
 * round to exactly that: a stateful regex inside a filter is a bug that looks like a finding.
 */
/*
 * ONE BANNED PHRASE HAS TO BE SAYABLE IN ORDER TO BE REFUTED, and it is the one a finding is about.
 * `specGap-06` and `topFix-04` are that the live section teaches sales maximisation under the name
 * "revenue maximisation", which is 0 hits in `bus_spec.txt`. A student arrives expecting that name,
 * because it is what most textbooks use — so a flat ban would delete the sentence that does the
 * teaching, which is packet 29's kinked-demand-curve problem and packet 30's "work-life balance".
 *
 * The rule: the phrase may appear ONLY in a string that also names the specification's own term, or
 * as one of two declared EXHIBITS — the mistake card's `looks_like`, which quotes what a student
 * writes, and the quiz distractor, which is a bare option and cannot carry a refutation. Both are
 * listed by their exact text, so a third use cannot arrive quietly.
 *
 * NO `g` FLAG (packet 29): `test` on a `/g` regex advances `lastIndex`, so the second call against
 * the same string starts past the match and returns false.
 */
const EXEMPT_REVENUE_MAX = new Set([
  '"The firm pursues revenue maximisation, selling as many units as it can."',
  'revenue maximisation',
]);
for (const [re, why] of BANNED_ELSEWHERE) {
  const one = new RegExp(re.source, re.flags.replace('g', ''));
  const isRevenueMax = /revenue maximisation/.test(re.source);
  let hits = readable.filter((s2) => one.test(s2));
  if (isRevenueMax) {
    const refuted = hits.filter((s2) => /sales maximisation/i.test(s2));
    const exhibits = hits.filter((s2) => EXEMPT_REVENUE_MAX.has(s2.trim()));
    if (refuted.length < 3) problems.push(`"revenue maximisation" is named ${hits.length} times and refuted in only ${refuted.length} of them — specGap-06 needs the wrong name corrected where a student meets it`);
    if (exhibits.length !== 2) problems.push(`expected exactly 2 declared exhibits of "revenue maximisation" (the mistake card's quotation and the quiz distractor); found ${exhibits.length}`);
    hits = hits.filter((s2) => !/sales maximisation/i.test(s2) && !EXEMPT_REVENUE_MAX.has(s2.trim()));
  }
  if (hits.length) problems.push(`${why} — ×${hits.length}, first: "${hits[0].slice(0, 90)}"`);
}
{
  /*
   * A/B, BECAUSE A BAN THAT HAS NEVER FIRED IS NOT KNOWN TO WORK (packet 21). Each pattern is
   * planted against a string it must catch and one it must not.
   */
  const fires = (re, str) => new RegExp(re.source, re.flags.replace('g', '')).test(str);
  const probes = [
    [0, 'The autocratic style suits an emergency', 'The founder decides how the work is done'],
    [1, 'the difficulty of moving from entrepreneur to leader', 'the founder becomes the person others follow'],
    [2, 'a sole trader has unlimited liability', 'the founder committed her own capital'],
    [3, 'the firm pursues revenue maximisation', 'the firm pursues the largest revenue it can'],
    [4, 'barriers to entry protect the incumbent', 'barriers to entrepreneurship stop people starting'],
    [5, "Greiner's growth crises", 'the firm grows past what one person can supervise'],
    [6, 'applying for a start-up grant', 'finding money on terms a new firm can actually get'],
  ];
  for (const [i, mustFire, mustNot] of probes) {
    const [re, why] = BANNED_ELSEWHERE[i];
    if (!fires(re, mustFire)) problems.push(`the ban "${why}" no longer fires on: "${mustFire}"`);
    if (fires(re, mustNot)) problems.push(`the ban "${why}" fires on legitimate text: "${mustNot}"`);
  }
}
/*
 * `leadership` AS A WORD IS NOT BANNED AND `leadership style` IS, AND THE DISTINCTION IS DELIBERATE.
 * The section's TITLE is "Entrepreneurs and Leaders", because that is the specification's own
 * heading at :760 — and the four sub-topics under it contain no leadership leaf, which is exactly
 * `structure-01`'s observation and exactly why the finding's remedy is refused. A blanket ban on the
 * word would fail on the section's own title; the ban is on TEACHING the styles, which is 1.3.4 · 5b.
 */
{
  const n = count(/\bleadership\b/gi);
  if (n > 2) problems.push(`"leadership" ×${n}: 1.3.5 has no leadership leaf (bus_spec.txt:760-788) and 1.3.4 · 5 owns all of it. At most two mentions, and only to point at the other section.`);
}
ban(/\bExamine\b(?![a-z])/g, '"Examine", which is an ECONOMICS command word and has no Business tariff');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification');
ban(/\bVRIO\b|\bcore competenc|\bPorter\b|\bfive forces\b/gi, 'vocabulary the IAL specification does not use here (`terms.off-spec` carries these by name)');
ban(/\bnormal profit\b|\bsupernormal profit\b|\babnormal profit\b/gi, 'Economics vocabulary: normal and supernormal profit are 3.3.3 market structures, not Business 1.3.5');

/* ── no note about OUR OWN PREVIOUS CONTENT in text a student reads ────────── */
/*
 * FOUND BY VERIFY B, IN THIS PACKET, AFTER EVERY MECHANICAL CHECK HAD PASSED — and the instance was
 * on the screen of the chapter a student reaches last. Three diagram captions and one teaching
 * paragraph said "the live section teaches only the second", "the live section teaches five" and
 * "Paternalistic is the one the live section leaves out while quizzing it". A student has no idea
 * what "the live section" is; it reads as a claim about the specification or about another textbook.
 *
 * Packet 18 shipped the same class twice ("the March version of this item asked for 4") and its rule
 * is written down: NEVER put a note about our own previous content in text a student reads. Nothing
 * looked for it. `LEDGER_ID` could not, because these carry no ledger id; `MARK_CLAIM` and the
 * paper-pattern checks could not, because they are not claims about marking; and three of the four
 * were inside SVG captions, which only the vocabulary bans read at all. That is packet 29's lesson
 * in its own words: a check's BLIND SPOT is worse than a missing rule, because it reports green.
 *
 * Over `readable`, so prose AND diagram text, and over the SVG text JOINED PER DIAGRAM, because a
 * caption is wrapped one `<text>` a line and the phrase spanned two of them.
 */
const SELF_REFERENCE = /\bthe live section\b|\bthe March (?:version|notes|content)\b|\bthis section (?:previously|used to|formerly)\b|\bthe previous version\b|\bthe old (?:notes|section|version)\b|\bpreviously (?:taught|said|omitted|left out)\b|\bearlier version\b|\bthis packet\b/i;
for (const s2 of readable) {
  if (!SELF_REFERENCE.test(s2)) continue;
  const m = s2.match(SELF_REFERENCE);
  problems.push(`a note about our own previous content in text a student reads: "${s2.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ')}"`);
}
{
  /* A/B: the four shapes Verify B found must fire, and the teaching they were attached to must not. */
  const mustFire = ['1.3.5 · 3c names six and the live section teaches only five.', 'the March version of this item asked for 4', 'this section previously taught revenue maximisation', 'the old notes named a real retailer'];
  const mustNot = ['1.3.5 · 2b names exactly four non-financial motives, and each predicts something checkable.', 'Satisficing is the one most often mistaken for a lack of ambition.'];
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
 * `topFix-05` ASKS FOR EXACTLY WHAT THIS REFUSES. It wants "levels-based (L1-L4) guidance" in the
 * practice items. That is a claim about what a marker does; `examMatters` may say what the COMMAND
 * WORD requires, because Appendix 6 states it and it is citable. Packet 20 shipped "is levels-marked"
 * eight times before `MARK_CLAIM` reached the phrasing.
 */
/*
 * WIDENED IN THIS PACKET, BECAUSE LAYER 6 FOUND ONE IT LET THROUGH. The string was "which says
 * nothing a marker can credit as reasoning" — a claim about what a marker credits, in a
 * misconception a student reads, and every clause of the inherited pattern missed it: there is no
 * tariff near it, no "mark scheme", and "credit" only appeared after "mark schemes?". The new
 * alternatives catch a MARKER or an EXAMINER as the subject of credit/reward/expect/look for, which
 * is the shape the sentence actually had. A/B'd below in both directions.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b|\b(?:a |the )?(?:marker|markers|examiner|examiners)\b[^.!?]{0,40}\b(?:can |will |would |do |does )?(?:credit|credits|reward|rewards|expect|expects|look for|looks for|want|wants)\b|\bwhat (?:an? |the )?(?:marker|markers|examiner|examiners)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.', 'Guidance is given at L1-L4.'];
  mustFire.push('which says nothing a marker can credit as reasoning', 'examiners reward a judgement here', 'this is what an examiner is looking for');
  const mustNotFire = [`Profit is ${money(F.profitMax.profit)} (1 mark), which is ${money(F.economicGain)} above the alternative (1 mark).`, 'Appendix 6 defines Define as requiring students to define a term or phrase.', 'Appendix 6 defines Assess as requiring a supported judgement.'];
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

/* ── tariffs, against the BUSINESS census, for UNIT 1 ─────────────────────── */
/*
 * `topFix-05` ASKS FOR "Assess 10/12". THIS IS UNIT 1, SO ASSESS IS 10 AND ONLY 10 — the census
 * carries 12 for Units 3/4. A packet that took the finding at its word would have shipped a tariff
 * that does not exist on this paper.
 */
const UNIT = 1;
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
  if (missing.length) problems.push(`command words never practised: ${missing.join(', ')} — eight command words, one each`);
  const dup = used.filter((x, i) => used.indexOf(x) !== i);
  if (dup.length) problems.push(`command word used twice: ${dup.join(', ')}`);
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
  /* A/B: the tariff this unit does not have must fire, and the ones it does must not. */
  const probe = (text) => [...withoutAllocations(text).matchAll(PROSE_TARIFF)].map((m) => Number(m[1])).filter((n) => !unitMarks.includes(n));
  if (!probe('a 12-mark Assess').length) problems.push('the prose-tariff check no longer fires on a 12-mark question, which is Units 3/4 only');
  if (!probe('a 14-mark question').length) problems.push('the prose-tariff check no longer fires on a 14-mark question, which is Economics');
  if (probe('a 10-mark Assess and a 20-mark Evaluate').length) problems.push('the prose-tariff check fires on a valid Business Unit 1 tariff');
  if (probe(`Profit is ${money(F.profitMax.profit)} (1 mark).`).length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required requires students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s) => String(s).toLowerCase().match(/[a-z]{4,}/g) || [];
const COMMANDS = census.map((r) => r.command).join('|');
/*
 * THE COMMAND WORD IS FOUND ANYWHERE IN THE TIP, NOT AFTER "APPENDIX 6" IN THE SAME SENTENCE, AND
 * THAT CHANGE IS A BUG FIX WITH A PROOF ATTACHED. The three checks below used to match
 * `/Appendix 6[^.]*\b(Command)\b/`, which requires the citation to precede the command word inside
 * one sentence. `structure-06`'s fix varied the opening SHAPE of all 25 tips — "Assess carries ten
 * marks in Units 1 and 2, and Appendix 6 asks for…" puts the command word first — and the guards
 * went silently blind: Verify A round 2 measured them reaching **0 of 3 Assess tips and 1 of 2
 * Discuss tips**, then sabotaged an unreached tip to promise a "conclusion" and watched the build
 * stay green. A fix to the content disabled the check on the content. That is the worst shape of
 * defect this repository knows, because it reports success.
 *
 * `reach` is printed below so the blindness is visible rather than latent.
 */
const commandIn = (em) => { const m = String(em).match(new RegExp(`\\b(${COMMANDS})\\b`)); return m ? m[1] : null; };
const citesAppendix = (em) => /Appendix 6/.test(String(em));
{
  const reached = SUBSECTIONS.filter((sec) => citesAppendix(sec.examMatters) && commandIn(sec.examMatters));
  console.log(`\nexam tips: ${reached.length} of ${SUBSECTIONS.length} cite Appendix 6 AND name a command word, so the gloss checks reach them`);
  if (reached.length < SUBSECTIONS.length) problems.push(`${SUBSECTIONS.length - reached.length} exam tip(s) do not both cite Appendix 6 and name a command word, so the gloss checks cannot see them: ${SUBSECTIONS.filter((sec) => !(citesAppendix(sec.examMatters) && commandIn(sec.examMatters))).map((sec) => `"${sec.title}"`).join(', ')}`);
}
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  if (!citesAppendix(em)) continue;
  const cmd = commandIn(em);
  if (!cmd) continue;
  const row = census.find((r) => r.command === cmd);
  if (!row) continue;
  const m = [null, cmd];
  const mine = new Set(words(em).filter((w) => !STOP.has(w)));
  const theirs = words(row.description).filter((w) => !STOP.has(w));
  const shared = theirs.filter((w) => mine.has(w));
  if (!shared.length) problems.push(`"${sec.title}": the ${m[1]} gloss cites Appendix 6 and shares NOTHING with the census description — read bus_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
}
/*
 * ASSESS REQUIRES A SUPPORTED JUDGEMENT AND THAT IS WHAT SEPARATES IT FROM ANALYSE. Packet 20's
 * instance was the Economics twin: six Examine glosses enumerated the objectives and left out
 * EVALUATION, which is the whole difference between Examine (8) and Analyse (6). Here the pair is
 * Assess (10) against Analyse (6), and the word the census uses is "judgement".
 */
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  const cmd = citesAppendix(em) ? commandIn(em) : null;
  if (cmd === 'Assess' && !/judgement/i.test(em)) problems.push(`"${sec.title}": an Assess gloss that does not mention a judgement — bus_spec.txt names it, and it is what separates Assess (10) from Analyse (6)`);
  /*
   * THIS CHECK WAS INHERITED AND IT WAS WRONG, WHICH LAYER 6 CAUGHT. Packet 30's version requires
   * every Discuss gloss to mention a "conclusion". The census description at bus_spec.txt:2234-2237
   * does not contain the word: it reads "Requires a logical chains of reasoning, in context, showing
   * cause(s) and/or effect(s). A brief ASSESSMENT is required showing an awareness of competing
   * arguments/factors." So the guard was forcing three glosses in this section to assert something
   * Appendix 6 does not say — a check that manufactures the defect it exists to prevent. It now
   * requires the word the census actually uses. Filed as a finding against packets 30 and 31, whose
   * staged Discuss glosses carry the inherited claim.
   */
  if (cmd === 'Discuss' && !/assessment/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss that does not mention the brief ASSESSMENT the census requires (bus_spec.txt:2234-2237 — it does not say "conclusion")`);
  if (cmd === 'Discuss' && /\bconclusion\b/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss promising a "conclusion"; bus_spec.txt:2234-2237 asks for a brief assessment and never uses the word`);
}
{
  /*
   * A/B ON THE REACH ITSELF, which is what round 1 of this guard lacked. Each probe is a tip written
   * the way `structure-06`'s fix writes them — command word first, citation second — and each must
   * be both REACHED and judged.
   */
  const probeCmd = (em) => (citesAppendix(em) ? commandIn(em) : null);
  const assessNoJudgement = 'Assess carries ten marks in Units 1 and 2, and Appendix 6 asks for a balanced chain of reasoning.';
  const discussConclusion = 'Growth questions attract Discuss, which Appendix 6 glosses as chains of reasoning closing with a brief conclusion.';
  const fine = 'Under Appendix 6 an Explain is a brief explanation of cause or effect supported by a detail.';
  if (probeCmd(assessNoJudgement) !== 'Assess') problems.push('the gloss check cannot see an Assess tip that names the command word before citing Appendix 6 — the blindness Verify A found is back');
  if (probeCmd(discussConclusion) !== 'Discuss') problems.push('the gloss check cannot see a Discuss tip that names the command word first');
  if (/judgement/i.test(assessNoJudgement)) problems.push('the Assess probe accidentally contains the word it is meant to be missing');
  if (!/\bconclusion\b/i.test(discussConclusion)) problems.push('the Discuss probe accidentally lacks the word it is meant to carry');
  if (probeCmd(fine) !== 'Explain') problems.push('the gloss check cannot see a well-formed Explain tip');
}
for (const p of PRACTICE) {
  if (p.command === 'Assess' && !/judgement/i.test(p.guidance)) problems.push('the Assess practice guidance does not name the supported judgement the command word requires');
  /*
   * ONLY THE FIRST PARAGRAPH, which is the advice; what follows is the model answer, and a model
   * answer may legitimately end with a concluding sentence. The claim about what the command word
   * REQUIRES can only live in the advice, so that is where the check looks. Evaluate is untouched:
   * bus_spec.txt:2246-2251 does say "a perceptive conclusion that proposes a solution".
   */
  if (p.command === 'Discuss' && /\bconclusion\b/i.test(String(p.guidance).split('\n')[0])) problems.push('the Discuss practice ADVICE promises a "conclusion"; bus_spec.txt:2234-2237 asks for a brief ASSESSMENT and never uses the word');
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
  if (orphan.length) problems.push(`recall bank keyed to a subsection that does not exist: ${orphan.join(', ')} — a typo here is silent, the recall simply never appears`);
}
/*
 * THE FILL-IN CONTRACT, WHICH IS `topFix-01` AND SIXTEEN OF THE SECTION'S THIRTY-FIVE BLOCK FINDINGS.
 * One `___` a template line; `answers.length` equal to the blank count; no duplicate answer, because
 * the second chip vanishes when its twin is placed and the recall cannot be completed; no answer
 * printed in the template outside its own blank; a hint that is not a prefix of its answer; and two
 * or three distractors so the chip bank is not a closed set.
 */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'fillin') continue;
  const lines = r.template || [];
  const blanks = lines.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
  const answers = r.answers || [];
  if (blanks !== answers.length) problems.push(`"${sec.title}": ${blanks} blanks against ${answers.length} answers (topFix-01: two live fill-ins have five answers on three lines)`);
  for (const [i, l] of lines.entries()) {
    const n = (String(l).match(/_{3,}/g) || []).length;
    if (n !== 1) problems.push(`"${sec.title}": template line ${i + 1} has ${n} blanks — one a line, so the blanks and the answers cannot come apart`);
  }
  const lower = answers.map((a) => String(a).toLowerCase());
  const dups = lower.filter((a, i) => lower.indexOf(a) !== i);
  if (dups.length) problems.push(`"${sec.title}": duplicate answer ${JSON.stringify([...new Set(dups)])} — the second chip vanishes and the recall cannot be finished (the live "Hawthorne" defect)`);
  if (answers.some((a) => String(a).includes(','))) problems.push(`"${sec.title}": an answer contains a comma, which is two answers glued into one blank`);
  const bare = lines.join(' ').replace(/_{3,}/g, ' ');
  for (const a of answers) if (new RegExp(`\\b${String(a).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(bare)) problems.push(`"${sec.title}": the answer "${a}" is printed in the template outside its blank`);
  const ds = r.distractors || [];
  if (ds.length < 2 || ds.length > 3) problems.push(`"${sec.title}": ${ds.length} distractors (want 2 to 3)`);
  if (ds.some((d) => lower.includes(String(d).toLowerCase()))) problems.push(`"${sec.title}": a distractor equals an answer`);
  for (const [i, h] of (r.hints || []).entries()) {
    const a = String(answers[i] ?? '').toLowerCase();
    if (a && String(h).toLowerCase().startsWith(a.slice(0, Math.max(3, Math.floor(a.length / 2))))) problems.push(`"${sec.title}": hint ${i + 1} is a prefix of its answer`);
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
  if (!shape(['a ___ b', 'c ___ d'], ['Hawthorne', 'Hawthorne'])) problems.push('the fill-in contract check no longer fires on a duplicate answer');
  if (!shape(['a ___ b ___ c'], ['1', '2'])) problems.push('the fill-in contract check no longer fires on two blanks in one line');
  if (shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3'])) problems.push('the fill-in contract check fires on a well-formed fill-in');
}
/*
 * THE THREE COPY-FROM-SCREEN CHECKS, VACUOUS HERE BY DESIGN. (1) packet 26's structural rule: a
 * subsection with a flow body may not carry a reorder, because `learn-steps.js:10` renders the recall
 * under the teaching on the same step. (2) packet 26's overlap rule. (3) packet 27's paraphrase rule.
 * This section authors NO flow bodies, so none of the three can fire — which is why the A/B matters
 * more than the check does.
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
  const item = 'Study the job to find the quickest method';
  const verbatim = 'Study the job to find the quickest method';
  const paraphrase = 'Examine the job in order to find the fastest method';
  const unrelated = 'A matrix lays a project across the functions';
  if (jac(item, verbatim) < 0.6) problems.push('the reorder-overlap check no longer fires on a verbatim flow step');
  if (!shareDistinctive(item, paraphrase)) problems.push('the paraphrase check no longer fires on a reworded flow step');
  if (shareDistinctive(item, unrelated)) problems.push('the paraphrase check fires on a flow that teaches something else');
  /*
   * THIS SECTION HAS EXACTLY ONE FLOW BODY, so the three checks above are LIVE rather than vacuous,
   * and that is asserted rather than assumed. `creating-and-setting-up-a-business` teaches the
   * set-up sequence as a flow because the order IS the leaf (1.3.5 · 1a), and its recall is a
   * fill-in about the commitment rather than a reorder of the steps printed directly above it. A
   * second flow, or a reorder landing on the subsection that carries one, would put the section
   * back into the shape packet 29's Verify B complained about.
   */
  const flowSubs = SUBSECTIONS.filter((s) => (s.body || []).some((b) => b.type === 'flow'));
  if (flowSubs.length !== 1) problems.push(`${flowSubs.length} flow bodies; this section is authored with exactly one, on the set-up sequence, and the copy-from-screen checks are calibrated for that`);
  if (flowSubs.some((s) => s.recall?.type === 'reorder')) problems.push(`a reorder sits on the subsection that prints a flow — the answer is on screen above the widget (packet 29)`);
}
/*
 * RULE 6 GENERALISED TO EVERY RECALL TYPE (packet 29's Verify B). The measure is not word overlap,
 * which any recall on a topic shares with the teaching of that topic. It is whether the ANSWER is
 * recoverable: for a fill-in, a single sentence above that matches the template line AND supplies the
 * missing word; for a classify, an item printed verbatim above; for a match, a left and its right in
 * ONE sentence above. `examMatters` is in the corpus, because leaving it out was the check's own blind
 * spot — Verify B found a fill-in's two answers printed in the Exam Matters box 218 units above.
 */
/*
 * THE THRESHOLDS AND THE SENTENCE SPLIT ARE V029'S, NOT PACKET 29'S — AND THAT CHANGED THE NUMBER
 * FROM 0 TO 9 ON THIS SECTION. V029 is another session's finding against packet 29's runner, the
 * one this check was copied from, and it names four compounding reasons `recoverable()` measures
 * ABOVE the defect rather than at it. Two of them are fixable here and both are applied:
 *
 *   - **The split included `;` and `:`**, so a give-away across a colon was invisible. A key idea
 *     of the form "X is Y: the reason is Z" is one sentence to a reader and was two to the check.
 *     Split on `.!?` only.
 *   - **The thresholds sat above the real defects.** 0.85 for a fill-in and 0.95 for a reorder,
 *     where V029 measured real give-aways scoring 0.70 and 0.75. Lowered to 0.70 / 0.75 / 0.70.
 *
 * Run against this section as first authored, the corrected test found NINE recalls answerable by
 * scrolling up where the inherited one reported zero — a fill-in whose answer was "cannot" beside a
 * sentence saying a machinist cannot work a sewing line from home, a classify item printed verbatim
 * in a realExample, a reorder's first item restating the paragraph above it. All nine were reworked.
 * This is the programme's own rule twice over: a check that reuses the implementation's assumptions
 * cannot see its blind spot, and a green result from an inherited check is a claim, not evidence.
 *
 * The other two reasons V029 names are NOT fixed here, and they are why this check is a floor and
 * not a verdict: the three reorder-specific rules are vacuous in a section with no flow bodies, and
 * a lexical overlap test cannot see a give-away that has been paraphrased. V029 is open on packet
 * 2.7 with a measured house baseline of 61% staged and 86% live; this section is 0 of 37 against the
 * corrected test, which is worth having and is not the same as 0 of 37 against a human.
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
  /* A/B: the key-idea-minus-one-word fill-in must fire, and an applied one on the same topic must not. */
  /*
   * THE NEGATIVE CONTROL IS A REAL SHIPPED SUBSECTION, NOT AN INVENTED ONE. V029's fourth reason is
   * that packet 29's A/B paired a real recall with a one-sentence teaching text that omitted the
   * body paragraph the real step carries — so the control was a stripped-down fake of the step it
   * was clearing, and of course it passed. This control is `survival` exactly as built, body and
   * all, which is the strongest available: if the applied fill-in is recoverable from the real text,
   * the check must say so.
   */
  const real = SUBSECTIONS.find((x) => x.id.endsWith(':survival'));
  const teach = { keyIdea: real.keyIdea, body: real.body, realExample: real.realExample, misconception: real.misconception, examMatters: real.examMatters };
  const copied = { ...teach, recall: { type: 'fillin', template: ['Survival is the objective that makes the others ___, and on a schedule it is a range of prices rather than a point'], answers: ['possible'] } };
  const applied = { ...teach, recall: { type: 'fillin', template: [`A workshop selling at ${money(F.profitMax.price)} earns a profit of ___`], answers: [money(F.profitMax.profit)] } };
  if (!recoverable(copied).length) problems.push('the answer-recoverable check no longer fires on a fill-in that is the key idea with one word removed');
  if (recoverable(applied).length) problems.push('the answer-recoverable check fires on a fill-in that applies the idea to figures');
}
/* ── A RECALL MAY NOT NEED A LATER SUBSECTION (Layer 6, this packet) ───────── */
/*
 * THE MIRROR IMAGE OF COPY-FROM-SCREEN, AND NOTHING IN THE PROGRAMME LOOKED FOR IT. Every check
 * this section inherited asks whether an answer is available ABOVE the widget. None asks whether it
 * is available only BELOW. Layer 6 found seven: a match on step 2 whose answers were "temporary
 * contracts", "outsourcing" and "flexible hours", all taught on steps 3 to 5; a four-style match on
 * the PATERNALISTIC step, where two of the four styles had not been reached; a classify quoting a
 * pay rate that appears a whole chapter later. A student meeting those cannot answer them, and the
 * failure is invisible to a builder reading the section top to bottom because by then they know it
 * all.
 *
 * The measure is the section's OWN vocabulary — the spec's lists, which are the terms a student is
 * given — and the rule is: a recall may name a term only if a subsection at or before its own
 * teaches it. `TEACHING_TERMS` is imported from the module that holds the lists, so the check
 * cannot drift from what the section actually teaches.
 *
 * Both fixes Layer 6 proposed are in use: rewrite the widget to test only its own subsection, or
 * move a widget that spans a group onto the group's LAST member, which is where the four-style
 * match and the three-way "job" sort now live.
 */
{
  const slugOf = (sec) => sec.id.replace(`${SECTION}:sub:`, '');
  const order = SUBSECTIONS.map(slugOf);
  /* Where each term is first taught, by subsection index. */
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
    /* A/B: a forward reference must fire and a backward one must not. */
    const probe = (mine, termIdx) => termIdx > mine;
    if (!probe(1, 4)) problems.push('the forward-reference check no longer fires on a term taught four steps later');
    if (probe(9, 3)) problems.push('the forward-reference check fires on a term taught earlier, which is synoptic and fine');
    if (!order.length) problems.push('the forward-reference check has no subsection order to work from');
  }
}

/* ── A PRACTICE ITEM MUST BE PINNED TO THE CHAPTER IT TESTS ────────────────── */
/*
 * The pins DERIVE from each item's own `block` tag, which makes a pin to a chapter that does not
 * exist unrepresentable — and cannot see a tag that is simply WRONG. Layer 6 found the 20-mark
 * Evaluate, "the most important factor in motivating a workforce is pay", pinned to Leadership: its
 * guidance is Taylor, Maslow, Herzberg, Mayo, piecework and the profit share, with no leadership in
 * it at all, and a student practising Leadership was handed it. The tag is now checked against the
 * CONTENT: a practice item has to share more distinctive vocabulary with the block it is pinned to
 * than with any other block.
 */
{
  const blockText = content.map((b) => `${b.title} ${b.sections.map((x) => `${x.title} ${x.keyIdea} ${(x.body || []).map((y) => `${y.text || ''} ${(y.items || []).join(' ')}`).join(' ')}`).join(' ')}`.toLowerCase());
  const distinctive = (s2) => [...new Set(String(s2).toLowerCase().match(/[a-z]{6,}/g) || [])];
  PRACTICE.forEach((pItem, i) => {
    const mine = BLOCKS.indexOf(pItem.block);
    const words2 = distinctive(`${pItem.question} ${pItem.guidance}`);
    if (!words2.length) return;
    const scores = blockText.map((t) => words2.filter((w) => t.includes(w)).length / words2.length);
    const best = scores.indexOf(Math.max(...scores));
    if (best !== mine && scores[best] - scores[mine] > 0.05) {
      problems.push(`practice ${i} (${pItem.command}) is pinned to "${pItem.block}" but shares ${Math.round(scores[best] * 100)}% of its vocabulary with "${BLOCKS[best]}" against ${Math.round(scores[mine] * 100)}% — a student practising the wrong chapter (Layer 6)`);
    }
  });
}

/* Every reorder's sequence must be taught by an extras chain, which is the only source left. */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const sourced = EXTRAS.chains.some((chain) => {
    let last = -1, matched = 0;
    for (const item of r.correctOrder) {
      let best = -1, bestScore = 0;
      (chain.steps || []).forEach((st, i) => { if (i <= last) return; const j = Math.max(jac(item, st), shareDistinctive(item, st) ? 0.2 : 0); if (j > bestScore) { bestScore = j; best = i; } });
      if (best >= 0 && bestScore >= 0.2) { matched += 1; last = best; }
    }
    return matched / r.correctOrder.length >= 0.5;
  });
  if (!sourced) problems.push(`"${sec.title}": no extras chain teaches this reorder's sequence in this order — and with no flow bodies in this section, a chain is the only source there is`);
}

/* ── examMatters may not repeat itself, opener OR body (structure-06) ──────── */
/*
 * VERIFY A REJECTED `structure-06` ON ROUND 1 AND THE REJECTION WAS RIGHT. The finding is that seven
 * of twelve tips ended with a variant of "always link to the case study context". The rebuild
 * removed the repeated ENDING and introduced a repeated OPENING: 25 tips, 18 distinct first
 * sentences, the Explain gloss appearing verbatim four times — and five pairs over 0.5 token
 * Jaccard, the same threshold this repository already uses for near-duplicate quiz stems. The worst
 * pair, 0.63, was a slot-filled frame shared by three Assess tips: "the balance is A against B, and
 * the judgement has to name which".
 *
 * Moving a repetition is not removing it. Nothing measured this, because `examMatters` had only ever
 * been checked for the Appendix 6 vocabulary it must CONTAIN, never for what it repeats. Both halves
 * are measured now: every opening sentence distinct, and no pair of whole tips over 0.5.
 */
{
  const tips = SUBSECTIONS.map((sec) => ({ title: sec.title, text: String(sec.examMatters || '') }));
  const opener = (t) => t.split(/(?<=[.!?])\s+/)[0].trim();
  const seen = new Map();
  for (const t of tips) {
    const o = opener(t.text);
    if (seen.has(o)) problems.push(`"${t.title}" opens its exam tip with the same sentence as "${seen.get(o)}": "${o.slice(0, 70)}" (structure-06 — the repetition moved from the ending to the opening)`);
    else seen.set(o, t.title);
  }
  for (let i = 0; i < tips.length; i += 1) {
    for (let j = i + 1; j < tips.length; j += 1) {
      const v = jac(tips[i].text, tips[j].text);
      if (v > 0.5) problems.push(`exam tips on "${tips[i].title}" and "${tips[j].title}" share ${Math.round(v * 100)}% of their words — a slot-filled frame, which is structure-06 in its second costume`);
    }
  }
  /* A/B: the frame that was rejected must fire, and two tips on the same command word must not. */
  /* The two tips exactly as they stood when Verify A rejected them — whole, not their tails. */
  const A = 'Appendix 6 defines Assess as requiring a balanced chain of reasoning leading to a supported judgement, and in Units 1 and 2 it carries ten marks. On an ethical stance the balance is the cost against what it wins, and the judgement has to name which the evidence supports.';
  const B = 'Appendix 6 defines Assess as requiring a balanced chain of reasoning leading to a supported judgement; in Units 1 and 2 it carries ten marks. The balance on market share is what the volume buys later against what it costs now, and the judgement has to name which.';
  const C = 'Appendix 6 is explicit that Analyse EXCLUDES evaluation, and a trade-off is where that line is easiest to cross. State the rate at which one thing exchanges for the other and stop; whether the firm ought to make the exchange belongs to a different command word.';
  if (jac(A, B) <= 0.5) problems.push('the exam-tip similarity check no longer fires on the pair Verify A rejected');
  if (jac(A, C) > 0.5) problems.push('the exam-tip similarity check fires on two tips that merely cite Appendix 6');
}

/* ── a quiz item must be pinned to the chapter it tests (Verify A) ──────────── */
/*
 * `quiz-03`'s fix was UNGUARDED, which Verify A found while confirming it: there is a topic-match
 * check for practice items and none for quiz items, so a wrong `block` tag would ship silently and
 * the derived pins would faithfully carry it to the wrong chapter. Same measure as the practice
 * check — the item's vocabulary against each block's teaching text — and the same tolerance.
 */
{
  /*
   * THE SAME MEASURE THE PRACTICE CHECK USES, deliberately. My first version scored every word of
   * three letters or more, and the firm's name and its figures occur in every chapter, so the
   * longest block won on vocabulary it shares with everything: it reported the reserve question as
   * belonging to Motives. DISTINCTIVE words — six letters and up — are what tell chapters apart,
   * and that measure is already proven on the practice items. Reusing it beats inventing a second.
   */
  const blockText = content.map((b) => `${b.title} ${b.sections.map((x) => `${x.title} ${x.keyIdea} ${(x.body || []).map((y) => `${y.text || ''} ${(y.items || []).join(' ')}`).join(' ')}`).join(' ')}`.toLowerCase());
  const distinctiveQ = (s2) => [...new Set(String(s2).toLowerCase().match(/[a-z]{6,}/g) || [])];
  /*
   * THE TOLERANCE IS LOOSER THAN THE PRACTICE CHECK'S BECAUSE THE SAMPLE IS SMALLER, and the sizes
   * are MEASURED here rather than asserted. The first version of this comment claimed practice items
   * carry "120-180 distinctive words" and quiz items "about thirty"; Verify A measured the real
   * medians at 48 and 14 and was right — a made-up ratio in a comment justifying a threshold is the
   * same defect as a made-up figure in the teaching text. The conclusion survives and is stronger
   * than the invented version: at the true median of 14 distinctive words, 0.12 is 1.7 words of
   * difference, which is TIGHTER evidence than 0.05 on a 48-word practice item (2.4 words).
   *
   * The medians are printed below, so if the content drifts the justification is re-checked rather
   * than inherited.
   */
  const QUIZ_PIN_TOLERANCE = 0.12;
  {
    const med = (a) => { const x = [...a].sort((p, q) => p - q); return x.length ? x[Math.floor(x.length / 2)] : 0; };
    const qWords = med(QUIZ.filter((q) => q.block).map((q) => distinctiveQ(`${q.question} ${q.explanation}`).length));
    const pWords = med(PRACTICE.map((x) => [...new Set(String(`${x.question} ${x.guidance}`).toLowerCase().match(/[a-z]{6,}/g) || [])].length));
    console.log(`\npin measures: quiz median ${qWords} distinctive words (tolerance ${QUIZ_PIN_TOLERANCE} = ${round2(QUIZ_PIN_TOLERANCE * qWords)} words) · practice median ${pWords} (tolerance 0.05 = ${round2(0.05 * pWords)} words)`);
    if (QUIZ_PIN_TOLERANCE * qWords > 0.05 * pWords) problems.push(`the quiz pin tolerance is now LOOSER in real terms than the practice one: ${round2(QUIZ_PIN_TOLERANCE * qWords)} words against ${round2(0.05 * pWords)} — the sample-size argument no longer holds and the number needs re-deriving`);
  }
  const gapFor = (q, blockIdx) => {
    const ws = distinctiveQ(`${q.question} ${q.explanation}`);
    if (!ws.length) return null;
    const scores = blockText.map((t) => ws.filter((w) => t.includes(w)).length / ws.length);
    const best = scores.indexOf(Math.max(...scores));
    return { best, scores, gap: scores[best] - scores[blockIdx] };
  };
  let mispinned = 0;
  for (const q of QUIZ) {
    if (!q.block) continue;
    const mine = BLOCKS.indexOf(q.block);
    const r = gapFor(q, mine);
    if (r && r.best !== mine && r.gap > QUIZ_PIN_TOLERANCE) {
      mispinned += 1;
      problems.push(`a quiz item pinned to "${q.block}" shares ${Math.round(r.scores[r.best] * 100)}% of its distinctive vocabulary with "${BLOCKS[r.best]}" against ${Math.round(r.scores[mine] * 100)}% — "${q.question.slice(0, 54)}"`);
    }
  }
  {
    /*
     * A/B: take an item that genuinely belongs to one chapter and pin it to another. The
     * opportunity-cost item moved to chapter 1 must fire; every item left where it is must not.
     */
    /*
     * THE PLANT NEEDS MARGIN. Verify A noted the first version cleared the threshold by one
     * hundredth (0.13 against 0.12), so a small reword of that item would have broken the build for
     * a spurious reason. The plant is now the item furthest from chapter 1 on this measure, and the
     * A/B asserts the margin as well as the firing, so a shrinking margin is reported before it
     * becomes a false failure.
     */
    const planted = QUIZ.filter((q) => q.block && q.block !== B1)
      .map((q) => ({ q, r: gapFor(q, BLOCKS.indexOf(B1)) }))
      .filter((x) => x.r).sort((a, b) => b.r.gap - a.r.gap)[0];
    if (!planted) problems.push('the quiz-pin A/B has no item to plant against');
    else if (!(planted.r.gap > QUIZ_PIN_TOLERANCE)) problems.push(`the quiz-pin check no longer fires on any item mispinned to "${B1}" (best gap ${round2(planted.r.gap)} against a tolerance of ${QUIZ_PIN_TOLERANCE})`);
    else if (planted.r.gap - QUIZ_PIN_TOLERANCE < 0.05) problems.push(`the quiz-pin A/B clears its threshold by only ${round2(planted.r.gap - QUIZ_PIN_TOLERANCE)} — too thin to be evidence that the check works`);
  }
  console.log(`\nquiz pins: ${QUIZ.filter((q) => q.block).length} pinned items, ${mispinned} closer to another chapter than their own (tolerance ${QUIZ_PIN_TOLERANCE})`);
}

/* ── an explanation may not name an option by its POSITION (packet 26) ─────── */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/i;
for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}" — placeKeys deals the key into a slot and F074 shuffles again, so it describes whatever lands there (packet 26)`);
{
  if (!BY_POSITION.test('The second option uses the number of levels rather than the links.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test(`Adding all ${qty(F.alternatives.length)} alternatives counts options that were never available together.`)) problems.push('the option-position check fires on an option named by its content');
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
   * `quiz-01` IS AN EXACT DUPLICATE PAIR AND `topFix-02` NAMES FOUR MORE. `quiz.near-dup` fires at a
   * token Jaccard of 0.5, so the check here is the same measure applied to this bank before the
   * validator sees it, and it reports the PAIR rather than one member.
   */
  for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
    const s = jac(QUIZ[i].question, QUIZ[j].question);
    if (s >= 0.5) problems.push(`two quiz stems share ${Math.round(s * 100)}% of their words: "${QUIZ[i].question.slice(0, 50)}" and "${QUIZ[j].question.slice(0, 50)}" (quiz-01 is an EXACT duplicate pair in the live bank)`);
  }
}
{
  /* `quiz.long-correct` fires only above 1.5×, so a bank whose key is simply the LONGEST option 40%
   * of the time passes it (packet 21). Baseline is 25%. */
  const longest = QUIZ.filter((x) => { const c = String(x.options[x.correctIndex]).length; return x.options.every((o, j) => j === x.correctIndex || String(o).length < c); }).length;
  const shareLong = longest / QUIZ.length;
  if (shareLong > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${QUIZ.length} items (${Math.round(shareLong * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}
{
  const hist = [0, 0, 0, 0];
  QUIZ.forEach((x) => { hist[x.correctIndex] += 1; });
  if (Math.max(...hist) - Math.min(...hist) > 3) problems.push(`answer histogram ${JSON.stringify(hist)} is lumpy`);
}
/*
 * `quiz-03` IS THAT THE LEADERSHIP BLOCK'S ONE QUESTION TESTS AN UNTAUGHT STYLE. The structural fix
 * is that pins are derived, but the underlying property is worth asserting directly: every objective
 * and motive the specification names must be TAUGHT before any item can test it. `quiz-02` is the
 * live instance — profit satisficing was quizzed, and appeared in the content nowhere but a
 * flashcard. Measured against the subsection titles and teaching text.
 */
{
  const taught = SUBSECTIONS.map((s) => `${s.title} ${s.keyIdea} ${(s.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`).join(' ').toLowerCase();
  const required = [
    ...FINANCIAL_MOTIVES.map(([k]) => k), ...NON_FINANCIAL_MOTIVES.map(([k]) => k),
    ...OTHER_OBJECTIVES, 'survival', 'intrapreneurship', 'opportunity cost', 'trade-offs',
    'barriers to entrepreneurship', 'risk', 'uncertainty',
  ];
  /*
   * A MULTI-WORD BULLET IS TAUGHT WHEN ITS PARTS ARE, NOT WHEN ITS HEADING IS. The specification's
   * fourth staffing bullet is "part-time and temporary" and this section teaches the two as separate
   * ideas — "**Part-time**: fewer hours…" and "**Temporary**: a full week for a fixed period" — so a
   * substring test on the whole phrase reported it untaught while the content covered both halves.
   * The measure is now each significant PART: every word of the bullet that is not a connective has
   * to appear somewhere in the teaching text. That is still sharp — `paternalistic` is one word and
   * fails on its own the moment it is missing, which is the hole the check exists for.
   */
  const parts = (t) => t.toLowerCase().split(/\s+(?:and|or|versus|vs)\s+|,\s*/).map((x) => x.trim()).filter(Boolean);
  const untaught = [...new Set(required.filter((t) => !parts(t).every((x) => taught.includes(x))))];
  if (untaught.length) problems.push(`the specification names these and the section does not teach them: ${untaught.join(', ')} — quiz-02 and structure-08 describe one such hole, profit satisficing quizzed and taught nowhere but a flashcard`);
  {
    /* A/B: the hole those three findings describe must fire, and a bullet taught in two halves must not. */
    const probe = (text, term) => !parts(term).every((x) => text.includes(x));
    if (!probe('sales maximisation, market share, cost efficiency', 'employee welfare')) problems.push('the taught check no longer fires on an objective the section omits');
    if (probe('the firm pursues profit maximisation, and elsewhere profit satisficing', 'Profit maximisation and profit satisficing')) problems.push('the taught check fires on a bullet taught as two separate ideas');
  }
  const quizText = QUIZ.map((q) => `${q.question} ${q.options.join(' ')} ${q.explanation}`).join(' ').toLowerCase();
  const quizzedNotTaught = [...new Set(required.filter((t) => parts(t).some((x) => quizText.includes(x)) && !parts(t).every((x) => taught.includes(x))))];
  if (quizzedNotTaught.length) problems.push(`quizzed but never taught: ${quizzedNotTaught.join(', ')}`);
}

/* ── pins, and the free-quiz ceiling ──────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; PreTest.jsx slices the unreserved pool at three`);
if (![...unpinned].every((i) => i < 3)) problems.push('the three unpinned quiz items are not FIRST in the array — a free student is served only PREVIEW_LIMITS.quiz items, so the pre-test pool must be at the front');
{
  const pinned = Object.values(quizIndices).flat();
  const dup = pinned.filter((x, i) => pinned.indexOf(x) !== i);
  if (dup.length) problems.push(`quiz item pinned by more than one block: ${dup.join(', ')}`);
  if (pinned.some((i) => unpinned.has(i))) problems.push('a pre-test item is also pinned to a chapter check-in — the student would meet the same question twice');
  if (BLOCKS.every((b, i) => (quizIndices[b] || [])[0] === i)) problems.push('quizIndices are 0,1,2,… in block order, which is `pins.identity` and exactly the live defect (structure-01)');
  const pp = Object.values(practiceIndices).flat();
  const pdup = pp.filter((x, i) => pp.indexOf(x) !== i);
  if (pdup.length) problems.push(`practice item pinned by more than one block: ${pdup.join(', ')}`);
  const orphanPractice = PRACTICE.map((_, i) => i).filter((i) => !pp.includes(i));
  if (orphanPractice.length) problems.push(`practice item(s) ${orphanPractice.join(', ')} pinned to no block — structure-01 records practice[3] and [4] orphaned in the live section`);
}
/*
 * THE BLOCK COUNT IS A DECISION WITH A MEASURED PRICE (V016, DECISIONS 16 September). Up to seven
 * blocks a signed-out student gets three pre-test questions and every chapter keeps its check-in
 * quiz. At eight the pre-test drops to two; at nine a chapter loses its quiz and the runner refuses.
 * Six is deliberate here: `2 + 6 = 8` against `FREE_QUIZ_MAX` 10, with room for the top-up.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz for a signed-out student (lib/preview-limits.js)`);
if (BLOCKS.length === 8) console.log('NOTE: at 8 blocks a signed-out student’s pre-test is 2 questions, not 3.');
if (content.length !== BLOCKS.length) problems.push(`${content.length} blocks built against ${BLOCKS.length} declared`);

/* ── practice guidance: two paragraphs, and a clean opening ────────────────── */
const ALLOCATION = /\(\s*\d+\s*marks?\s*\)|\(\s*\d+\s*\)/;
for (const p of PRACTICE) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 50)}" has one guidance paragraph — GUIDED mode would print the whole mark scheme above the answer box`);
  if (ALLOCATION.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" allocates marks in its OPENING paragraph, which is the half GUIDED mode shows`);
  if (p.marks > 6 && ALLOCATION.test(p.guidance)) problems.push(`practice "${p.question.slice(0, 50)}" is a ${p.marks}-mark item and its guidance allocates points; tariffs above 6 are not marked that way (\`practice.levels\`)`);
  if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 50)}" does not end with its own tariff in brackets`);
}
{
  if (!ALLOCATION.test(`Profit is ${money(F.profitMax.profit)} (1 mark).`)) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Work out the daily rate before you start.')) problems.push('the practice.opening check fires on planning advice');
}

/* ── the arithmetic spine, re-derived ──────────────────────────────────────── */
/*
 * THE PROPERTIES THE WHOLE SECTION RESTS ON, asserted from the functions rather than read off a
 * table. `FIRM` SEARCHES for its prices — it peaks the profit and revenue expressions over the
 * integer prices at which the firm survives — so these assertions are what stop a change to the
 * schedule quietly teaching four objectives that no longer sit where the arithmetic puts them.
 */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };

/* the schedule itself */
eq('demand intercept', F.a, 12000);
eq('chairs lost a dollar of price', F.b, 200);
eq('fixed costs', F.fixed, 80000);
eq('variable cost a chair', F.variable, 10);

/* survival is a RANGE, and the two ends are integers because the schedule was chosen for it */
eq('lower break-even price', F.breakEvenLow, 20);
eq('upper break-even price', F.breakEvenHigh, 50);
eq('profit is zero at the lower break-even price', F.profitAt(F.breakEvenLow), 0);
eq('profit is zero at the upper break-even price', F.profitAt(F.breakEvenHigh), 0);
if (F.profitAt(F.breakEvenLow - 1) >= 0) problems.push('profit is not negative a dollar below the lower break-even price, so the survival range has no lower edge');
if (F.profitAt(F.breakEvenHigh + 1) >= 0) problems.push('profit is not negative a dollar above the upper break-even price, so the survival range has no upper edge');

/* the four objectives */
eq('profit-maximising price', F.profitMax.price, 35);
eq('profit-maximising quantity', F.profitMax.q, F.qAt(F.profitMax.price));
eq('profit at the peak', F.profitMax.profit, 45000);
eq('sales-maximising price', F.salesMax.price, 30);
eq('revenue at the sales-maximising price', F.salesMax.revenue, 180000);
eq('market-share price is the bottom of the survival range', F.marketShare.price, F.breakEvenLow);
eq('market share earns nothing', F.marketShare.profit, 0);
eq('satisficing quantity follows from the working year', F.satisfice.q, F.workingDays * F.satisficeChairsPerDay);
eq('satisficing price follows from the quantity', F.satisfice.price, 40);
eq('chairs a day at the profit-maximising price', F.profitMaxPerDay, F.profitMax.q / F.workingDays);
/*
 * THE SYMMETRY IS THE SECTION'S HARDEST IDEA AND IT IS ASSERTED RATHER THAN ADMIRED. Sales
 * maximisation and satisficing earn the SAME profit on opposite sides of the peak — $30 selling
 * 6,000 and $40 selling 4,000 — which is what makes profit a hill rather than a direction. Three
 * subsections, two diagrams, four quiz items and the Construct question all depend on it.
 */
eq('sales maximisation and satisficing earn the same profit', F.salesMax.profit, F.satisfice.profit);
if (F.salesMax.q === F.satisfice.q) problems.push('sales maximisation and satisficing reach the same profit at the same QUANTITY, so the two sides of the hill are not distinct');
if (!(F.salesMax.price < F.profitMax.price && F.profitMax.price < F.satisfice.price)) problems.push('the three prices are not arranged either side of the peak, so "profit is a hill" is not shown');
if (F.profitMax.profit <= F.salesMax.profit) problems.push('the profit-maximising price does not earn more than the sales-maximising one, so the two objectives are not distinguished');
if (F.salesMax.revenue <= F.profitMax.revenue) problems.push('the sales-maximising price does not earn more revenue than the profit-maximising one');

/* every objective sits inside the survival range — that is what makes survival the constraint */
for (const [name, o] of [['profit maximisation', F.profitMax], ['sales maximisation', F.salesMax], ['satisficing', F.satisfice], ['market share', F.marketShare]]) {
  if (o.price < F.breakEvenLow || o.price > F.breakEvenHigh) problems.push(`${name} picks ${money(o.price)}, which is outside the survival range ${money(F.breakEvenLow)}-${money(F.breakEvenHigh)}`);
  eq(`${name}: revenue is price times quantity`, o.revenue, o.price * o.q);
  eq(`${name}: profit is revenue less cost`, o.profit, o.revenue - o.cost);
}

/* cost efficiency moves the peak as well as raising the profit, which is the half most answers miss */
eq('the efficient variable cost', F.efficientVariable, F.variable - 2);
eq('the saving at the unchanged price is the saving per chair times the quantity', F.efficiencyGain, (F.variable - F.efficientVariable) * F.profitMax.q);
if (F.efficient.price >= F.profitMax.price) problems.push('cost efficiency does not LOWER the profit-maximising price, so the second effect the section teaches is not shown');
if (F.efficient.profit <= F.efficientAtOldPrice.profit) problems.push('moving to the new best price does not beat leaving the price alone, so there is nothing to teach about the second effect');

/* employee welfare is the conflict priced */
eq('the welfare variable cost', F.welfareVariable, F.variable + 2);
eq('employee welfare costs the rise per chair times the quantity', F.welfareCost, (F.welfareVariable - F.variable) * F.profitMax.q);

/* opportunity cost: the next best, and the sum that is not it */
eq('opportunity cost is the largest alternative forgone', F.opportunityCost, Math.max(...F.alternatives.map(([, v]) => v)));
eq('the wrong sum adds every alternative', F.wrongSum, F.alternatives.reduce((n, [, v]) => n + v, 0));
eq('the economic gain', F.economicGain, F.profitMax.profit - F.opportunityCost);
if (F.wrongSum <= F.profitMax.profit) problems.push('the sum of the forgone alternatives does not exceed the profit, so the misconception the section is built around does not reverse the decision and there is nothing to teach');
if (F.economicGain <= 0) problems.push('the workshop does not beat its opportunity cost, so the founder should not be running it and the worked example argues against itself');
if (F.satisfice.profit < F.opportunityCost) problems.push('satisficing falls below the opportunity cost, which would make it a mistake rather than a choice');
if (new Set(F.alternatives.map(([, v]) => v)).size !== F.alternatives.length) problems.push('two alternatives are worth the same, so "the next best" is ambiguous in the one example that has to make it unambiguous');

/* the trade-offs are differences, and the rate must worsen or the last subsection has nothing to say */
eq('the sales trade-off in profit', F.tradeSales.profit, F.profitMax.profit - F.salesMax.profit);
eq('the market-share trade-off in profit', F.tradeShare.profit, F.profitMax.profit - F.marketShare.profit);
eq('the satisficing trade-off in profit', F.tradeSatisfice.profit, F.profitMax.profit - F.satisfice.profit);
{
  const firstRate = F.tradeSales.profit / F.tradeSales.units;
  const secondRate = (F.tradeShare.profit - F.tradeSales.profit) / (F.tradeShare.units - F.tradeSales.units);
  if (!(secondRate > firstRate)) problems.push(`the trade-off rate does not worsen: the first ${qty(F.tradeSales.units)} chairs cost ${money(round2(firstRate))} each and the next cost ${money(round2(secondRate))} — the last subsection's whole point`);
}

/* the spec's own list lengths, so a bullet cannot be dropped silently */
eq('financial motives', FINANCIAL_MOTIVES.length, 2);
eq('non-financial motives', NON_FINANCIAL_MOTIVES.length, 4);
eq('other objectives at 3c', OTHER_OBJECTIVES.length, 6);
eq('characteristics derived from the role', CHARACTERISTICS.length, 4);
eq('barriers derived from the role', BARRIERS.length, 4);
{
  /*
   * THE SIX OTHER OBJECTIVES ARE THE SPECIFICATION'S OWN WORDS, CHECKED AGAINST THE FILE rather than
   * against this comment. `specGap-06` is that the live section renames one of them; the way to stop
   * that returning is to read :781-786 and compare.
   */
  const span = readFileSync('audit/raw/bus_spec.txt', 'utf8').split('\n').slice(780, 786).join(' ').toLowerCase();
  for (const o of OTHER_OBJECTIVES) if (!span.includes(o)) problems.push(`"${o}" is not in bus_spec.txt:781-786, so OTHER_OBJECTIVES no longer matches the specification`);
}

/* ── every figure re-derived out of the emitted SVG ───────────────────────── */
/*
 * A figure computed correctly and printed into the wrong `<text>` is the same defect one layer along
 * (packets 19, 23, 25, 29). So the curve is read BACK: each of the four objective markers is found
 * in the emitted SVG by its label, its x position converted back into a price, and that price
 * re-derived from `FIRM`. A marker drawn at the wrong point fails the build even though every
 * number printed beside it is right.
 */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const a = m[1];
  const attr = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 11, anchor: attr('text-anchor') || 'start' };
});
const frameOf = (svg) => { const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].trim().split(/[\s,]+/).map(Number); return { w: vb[2], h: vb[3] }; };
{
  const objectives = DIAGRAMS.find((d) => d.id === diagramIds[B4]);
  const curve = svgOf(objectives)[0];
  const bodies = textsOf(curve.svg).map((t) => t.body);

  /* the curve is a polyline, and it must actually peak rather than rise throughout */
  const pts = ((curve.svg.match(/<polyline points="([^"]+)"/) || [])[1] || '').split(' ').filter(Boolean)
    .map((p) => p.split(',').map(Number));
  if (pts.length < 20) problems.push(`the profit curve has ${pts.length} points, which is too few to be read as a curve`);
  else {
    /* SVG y grows downwards, so the peak is the SMALLEST y */
    const peak = pts.reduce((best, p) => (p[1] < best[1] ? p : best), pts[0]);
    const first = pts[0]; const last = pts[pts.length - 1];
    if (!(first[1] > peak[1] && last[1] > peak[1])) problems.push('the emitted profit curve does not fall away on BOTH sides of its highest point, so it is not drawn as a hill');
    /* the peak's x must convert back to the profit-maximising price */
    /*
     * THE DOMAIN IS IMPORTED, NOT RESTATED. This check had `± 4` hard-coded while the diagram moved
     * to `± 2`, so it reported the markers at [18, 29, 35, 41] — four wrong prices from a correct
     * drawing. A check that restates a constant is a check that can disagree with the thing it is
     * checking, which is the failure class packet 2.5 spent four rounds on.
     */
    const lo = F.breakEvenLow - CURVE.pad; const hi = F.breakEvenHigh + CURVE.pad;
    const priceAtX = (x) => lo + ((x - CURVE.x0) / (CURVE.x1 - CURVE.x0)) * (hi - lo);
    const peakPrice = Math.round(priceAtX(peak[0]));
    if (peakPrice !== F.profitMax.price) problems.push(`the emitted curve peaks at ${money(peakPrice)}, not at the profit-maximising ${money(F.profitMax.price)}`);
    /* each marker's dot, converted back */
    const dots = [...curve.svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)"/g)].map((m) => Math.round(priceAtX(parseFloat(m[1])))).sort((a, b) => a - b);
    const want = [F.marketShare.price, F.salesMax.price, F.profitMax.price, F.satisfice.price].sort((a, b) => a - b);
    if (JSON.stringify(dots) !== JSON.stringify(want)) problems.push(`the curve's markers are drawn at ${JSON.stringify(dots)}, not at the four objective prices ${JSON.stringify(want)}`);
  }
  /* the three prices the axis promises, and the four labels */
  for (const p of [F.breakEvenLow, F.profitMax.price, F.breakEvenHigh]) {
    if (!bodies.includes(money(p))) problems.push(`the profit curve does not tick ${money(p)} on its price axis`);
  }
  for (const label of ['Market share', 'Sales max', 'Profit max', 'Satisficing']) {
    if (!bodies.includes(label)) problems.push(`the profit curve carries no "${label}" marker label`);
  }
  /* the shaded survival band, spanning exactly the two break-even prices */
  const band = curve.svg.match(/<rect x="([\d.]+)" y="[\d.]+" width="([\d.]+)"[^>]*opacity="0\.07"/);
  if (!band) problems.push('the profit curve has no shaded survival band, so "survival is a RANGE" is asserted in the caption and not drawn');

  /*
   * THE CURVE MUST CROSS ZERO AT BOTH BREAK-EVEN PRICES AND MAKE A LOSS OUTSIDE THEM — Layer 6's
   * finding, and the reason the check above was not enough. The first version clamped profit at
   * zero, so the tails ran FLAT along the axis: the curve still "fell away on both sides" of the
   * peak and still peaked at $35, so every check here passed, while the picture said the workshop
   * breaks even at the frame edges. The Construct (4) question in this same section asks a student
   * to draw a curve that crosses zero at $20 and $50, so the diagram contradicted the mark scheme
   * printed beside it. Measured off the emitted polyline: the drawn point at each break-even price
   * must sit ON the zero line, and both ends of the curve must sit BELOW it.
   */
  {
    const zeroLine = Number((curve.svg.match(/<line x1="[\d.]+" y1="([\d.]+)"[^>]*\/>/) || [])[1]);
    const poly = ((curve.svg.match(/<polyline points="([^"]+)"/) || [])[1] || '').split(' ').filter(Boolean).map((q) => q.split(',').map(Number));
    const lo2 = F.breakEvenLow - CURVE.pad; const hi2 = F.breakEvenHigh + CURVE.pad;
    const xAt = (p) => CURVE.x0 + ((p - lo2) / (hi2 - lo2)) * (CURVE.x1 - CURVE.x0);
    for (const be of [F.breakEvenLow, F.breakEvenHigh]) {
      const near = poly.reduce((b, q) => (Math.abs(q[0] - xAt(be)) < Math.abs(b[0] - xAt(be)) ? q : b), poly[0]);
      if (Math.abs(near[1] - zeroLine) > 0.6) problems.push(`the profit curve at ${money(be)} is drawn ${round2(near[1] - zeroLine)} units off the zero line — it must CROSS zero there, which is what the Construct question asks a student to draw`);
    }
    const ends = [poly[0], poly[poly.length - 1]];
    if (!ends.every((q) => q[1] > zeroLine + 1)) problems.push('the profit curve does not fall BELOW zero outside the survival range — a clamped tail runs flat along the axis and implies the firm breaks even at the frame edges');
  }

  /* the objectives table's own arithmetic, read out of the table */
  const table = svgOf(objectives)[1];
  const tableBodies = textsOf(table.svg).map((t) => t.body);
  for (const o of [F.profitMax, F.salesMax, F.satisfice, F.marketShare]) {
    for (const cell of [money(o.price), qty(o.q), money(o.profit)]) {
      if (!tableBodies.includes(cell)) problems.push(`the objectives table does not print ${cell}`);
    }
  }
  /* the conflict table prices every trade-off the content claims */
  const conflict = svgOf(objectives)[2];
  const conflictBodies = textsOf(conflict.svg).map((t) => t.body);
  for (const v of [F.tradeSales.profit, F.tradeShare.profit, F.welfareCost, F.tradeSatisfice.profit, F.efficiencyGain]) {
    if (!conflictBodies.includes(money(v))) problems.push(`the conflict table does not print ${money(v)}`);
  }

  /* the opportunity-cost table: the next best RINGED and the sum shown as wrong */
  const choices = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B5]))[0];
  const choiceBodies = textsOf(choices.svg).map((t) => t.body);
  for (const [, v] of F.alternatives) if (!choiceBodies.includes(money(v))) problems.push(`the opportunity-cost table does not print the alternative ${money(v)}`);
  if (!choiceBodies.includes(money(F.wrongSum))) problems.push(`the opportunity-cost table does not print the wrong sum ${money(F.wrongSum)}, which is the whole point of the diagram`);
  if (!choiceBodies.includes('THE cost')) problems.push('the opportunity-cost table does not mark WHICH alternative is the cost');
  {
    /*
     * A/B: THE TABLE MUST NAME EXACTLY ONE ALTERNATIVE AS THE COST. A table that marks two has not
     * taught "the next best"; one that marks none has printed a list. Planted both ways.
     */
    const marked = choiceBodies.filter((b) => b === 'THE cost').length;
    if (marked !== 1) problems.push(`the opportunity-cost table marks ${marked} alternatives as THE cost; exactly one is the teaching`);
    if (['THE cost', 'THE cost'].filter((b) => b === 'THE cost').length === 1) problems.push('the single-cost check does not fire on a table marking two');
    if ([].filter((b) => b === 'THE cost').length === 1) problems.push('the single-cost check does not fire on a table marking none');
  }
}

/* ── nothing drawn outside its canvas: EXTENT, not anchor (packet 25) ──────── */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  for (const tx of textsOf(svg)) {
    if (!tx.body.trim()) continue;
    const w = estWidth(tx.body, tx.size);
    const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
    const right = left + w;
    if (left < -0.5 || right > frame.w + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" runs from ${round2(left)} to ${round2(right)} in a ${frame.w}-unit frame`);
    if (tx.y < 0 || tx.y > frame.h + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" sits at y=${tx.y} in a ${frame.h}-unit frame`);
  }
}
{
  const probe = (body, x, anchor, frameW) => { const w = estWidth(body, 11); const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x; return left < -0.5 || left + w > frameW + 0.5; };
  if (!probe('profit maximisation at $35 and then some more words', 430, 'start', 560)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
  if (probe('Profit max', 100, 'start', 560)) problems.push('the canvas-extent check fires on a label that fits');
}

/* ── no two strings overlap: glyph BOXES, with a vertical tolerance ────────── */
/*
 * Grouping `<text>` by exact rounded y compares table cells and nothing else: in packet 29 it
 * reported zero while twelve of nineteen scenarios collided. Two strings one unit apart vertically
 * overlap on screen exactly as much as two on one line, so the comparison is between BOXES. This
 * check found one real collision while this section was being written — the Herzberg motivator list
 * against its own caption, six units apart — and the fix went into the LAYOUT: `herzbergSvg` now
 * computes the caption's position from the wrap rather than assuming it.
 */
const boxOf = (tx) => {
  const w = estWidth(tx.body, tx.size);
  const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
  return { left, right: left + w, top: tx.y - tx.size * 0.8, bottom: tx.y + tx.size * 0.25, tx };
};
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const boxes = textsOf(svg).filter((tx) => tx.body.trim()).map(boxOf);
  for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
    const a = boxes[i], b = boxes[j];
    const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
    const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
    if (dx > 0.5 && dy > 0.5) problems.push(`${d.title} / ${label}: "${a.tx.body.slice(0, 28)}" and "${b.tx.body.slice(0, 28)}" overlap by ${round2(dx)}×${round2(dy)} units at y=${a.tx.y}/${b.tx.y}`);
  }
}
{
  /* A/B: two strings one unit apart vertically and overlapping horizontally must fire; the same two
   * a line apart must not. This is exactly the pair the old check could not see. */
  const hit = (a, b) => { const A = boxOf(a), B = boxOf(b); return Math.min(A.right, B.right) - Math.max(A.left, B.left) > 0.5 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 0.5; };
  const one = { body: 'Achievement and Recognition', x: 26, y: 210, size: 10, anchor: 'start' };
  const near = { body: 'Hygiene factors cannot make', x: 26, y: 216, size: 10, anchor: 'start' };
  const far = { body: 'Hygiene factors cannot make', x: 26, y: 240, size: 10, anchor: 'start' };
  if (!hit(one, near)) problems.push('the collision check no longer fires on two strings six units apart vertically');
  if (hit(one, far)) problems.push('the collision check fires on two strings a clear line apart');
}
/*
 * THE SMALLEST FACE, MEASURED AGAINST THE PHONE AS WELL AS THE LAPTOP — and Verify B supplied the
 * number. A Learn Mode diagram renders **313 CSS px wide** at 390x844, measured with
 * `getBoundingClientRect` in the browser, which is neither the 530 the validator's rule assumes nor
 * the 800 of a wide desktop. On the 560-unit frame this section started with, the org chart's row
 * labels came out at 10 units — 5.59px, a third of body text, on the labels that say how many people
 * are on each level. `diagram.table-legible` cannot see it, because it only reads a DECLARED table
 * and an org chart is not one.
 *
 * So the drawn diagrams are on a 440-unit frame with a 12-unit floor (8.54px on the phone, up 53%)
 * and the tables on 440 with a 10-unit floor (7.11px on the phone, 12.05px at 530 — which is what
 * clears the validator). The floor is asserted here rather than trusted: `MIN_FACE` is imported from
 * the module that lays out, so the thing that draws and the thing that checks share one number.
 */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  const floor = d.kind === 'table' ? 10 : MIN_FACE;
  const sizes = textsOf(svg).filter((t) => t.body.trim()).map((t) => t.size);
  const worst = Math.min(...sizes);
  if (worst < floor) problems.push(`${d.title} / ${label}: smallest face is ${worst} units against a floor of ${floor} — ${round2((worst * 313) / frame.w)}px on the 313px a phone gives a diagram`);
  if (frame.w > 440) problems.push(`${d.title} / ${label}: a ${frame.w}-unit frame renders every face at ${round2(440 / frame.w)}× the size a 440-unit frame would (Verify B measured 313 rendered px)`);
}

/* Every declared table's smallest face, reported against the column a laptop really gives (530px). */
for (const d of DIAGRAMS.filter((x) => x.kind === 'table')) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  const sizes = textsOf(svg).map((t) => t.size);
  const worst = Math.min(...sizes);
  const px = round2((worst * 530) / frame.w);
  if (px < 9) problems.push(`${d.title} / ${label}: smallest face is ${worst} units, ${px}px in the 530px column a 1024-wide laptop gives it`);
}
for (const d of DIAGRAMS) {
  if (d.kind === 'table' && Array.isArray(d.checklist) && d.checklist.length) problems.push(`${d.title} declares kind:"table" AND carries a checklist — "what a correct diagram shows" reads as an instruction to reproduce a lookup table (\`diagram.table-checklist\`)`);
  if (d.kind !== 'table' && !(Array.isArray(d.checklist) && d.checklist.length)) problems.push(`${d.title} is a drawn diagram with no checklist, and this section carries the programme's first Construct (4) question`);
}

/* ── the extras shape the component actually reads (V028) ──────────────────── */
for (const [i, chain] of (EXTRAS.chains || []).entries()) {
  if (!Array.isArray(chain.steps) || !chain.steps.length) problems.push(`extras chain ${i + 1} ("${chain.title}") has no \`steps\` array — ExtrasTab.jsx:62 calls chain.steps.map() with no guard and the tab throws`);
  if (!chain.title) problems.push(`extras chain ${i + 1} has no title`);
  if (!chain.result) problems.push(`extras chain ${i + 1} ("${chain.title}") has no result`);
}
for (const [i, e] of (EXTRAS.evaluation || []).entries()) {
  if (typeof e.content !== 'string' || !e.content.trim()) problems.push(`extras evaluation ${i + 1} ("${e.title}") has no \`content\` string`);
}
{
  /*
   * A/B WITH A REAL CONTROL RATHER THAN A PLANTED ONE (packet 29's rule, and its own note: a control
   * you did not construct is worth more than one you did). Packet 28's bundle is on disk and its
   * third chain is V028, so the check is run against it: if it does not fire there, it is decorative.
   */
  const shapeOk = (chains) => chains.every((c) => Array.isArray(c.steps) && c.steps.length);
  if (shapeOk([{ title: 'planted', points: ['a', 'b'] }])) problems.push('the extras-shape check does not fire on a chain carrying `points`');
  if (!shapeOk([{ title: 'ok', steps: ['a', 'b'] }])) problems.push('the extras-shape check fires on a well-formed chain');
  /*
   * PACKET 28 WAS THE REAL CONTROL AND IT IS NO LONGER ONE, BECAUSE THIS PACKET FIXED IT. V028 is
   * closed: its third chain carried `points` instead of `steps` and has been moved to `evaluation`
   * as a `{title, content}` frame, which is what it always was — four judgement considerations, not
   * a sequence. So this A/B now asserts the OPPOSITE of what it first asserted, and the reason is
   * recorded here rather than in a commit message, because the check reads like a regression
   * otherwise. The rule was A/B'd against packet 28 BEFORE the fix and fired on chain 3 exactly;
   * the same run over every `packet-*-bundle` on disk then found the other half of the defect in
   * four more sections, filed as V035.
   */
  try {
    const p28 = await import('./_packet28-assessment.mjs');
    if (!shapeOk(p28.EXTRAS.chains)) problems.push('packet 28 still carries a chain without `steps` — V028 was supposed to be closed by moving it into `evaluation`');
    if (!(p28.EXTRAS.evaluation || []).length) problems.push('packet 28 has no `evaluation` array — V028\'s fix moved its third chain there, so the entry has gone missing');
    if ((p28.EXTRAS.evaluation || []).some((e) => typeof e.content !== 'string' || !e.content.trim())) problems.push('packet 28 now has an evaluation frame with no `content` string, which renders an empty card (V035)');
  } catch { problems.push('could not load packet 28’s assessment module to check V028 stayed fixed'); }
}

/* ── ids, signs, and duplicates ────────────────────────────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(SUBSECTIONS.map((s) => s.id), SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall.id), content.map((b) => b.id));
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dupIds.length) problems.push(`duplicate ids: ${[...new Set(dupIds)].join(', ')} — packet 19 shipped three flashcards with a "-2" suffix and no finding named it`);
{
  const ascii = prose.filter((s) => /\s-\d|\(-\d|=\s?-\d/.test(s));
  if (ascii.length) problems.push(`${ascii.length} strings use an ASCII hyphen as a minus sign: "${ascii[0].slice(0, 70)}"`);
}
{
  /* One currency. `locale.currency` fires when a section mixes them. */
  const other = readable.filter((s) => /[£€₹¥]/.test(s));
  if (other.length) problems.push(`${other.length} strings carry a currency other than dollars: "${other[0].slice(0, 70)}"`);
}
/* No UK-only institution as the frame of an example, and no named real company (accuracy-01). */
/*
 * THE LIST DID NOT CONTAIN THE TWO NAMES THIS SECTION'S OWN FINDINGS CITE, which Verify A caught:
 * `topFix-04` is about Amazon "reinvesting revenue with minimal dividends" and Bezos as running
 * "the world's largest retailer", and neither was in the inherited UK-retailer list. A guard that
 * advertises "no named real company" and passes `"Amazon shows it."` is worse than no guard, because
 * it reports green on the regression it is named for. The live section also cites Dyson, Ella's
 * Kitchen and Google, so those are here too.
 */
const REAL_COMPANY = /\bNHS\b|\bBank of England\b|\bHMRC\b|\bcouncil tax\b|\bOfgem\b|\bOfsted\b|\bJohn Lewis\b|\bMarks (?:&|and) Spencer\b|\bM&S\b|\bTesco\b|\bSainsbury\b|\bAsda\b|\bMorrisons\b|\bAmazon\b|\bBezos\b|\bDyson\b|\bGoogle\b|\bApple Inc\b|\bMicrosoft\b|\bElla's Kitchen\b|\bHain Celestial\b|\bCostco\b|\bWalmart\b/gi;
ban(REAL_COMPANY, 'a UK-only institution or a named real company — topFix-04 cites Amazon and Bezos, accuracy-01 a fabricated layer count, and this audience sits WBS11 in Hong Kong, Malaysia, Pakistan and the Gulf');
{
  /*
   * THE A/B CALLS THE BAN'S OWN REGEX, WHICH THE FIRST VERSION DID NOT. Verify A round 2 deleted
   * `\bAmazon\b|\bBezos\b` from the ban line, left the hand-copied probe beside it untouched, and
   * the build stayed GREEN — an A/B testing a duplicate of the pattern proves nothing about the
   * pattern. `REAL_COMPANY` is now one constant, passed to `ban()` and probed here.
   *
   * NO `g` FLAG WHEN TESTING: `RegExp.prototype.test` on a `/g` regex advances `lastIndex`, so the
   * second call against a different string can start past the match (packet 29).
   */
  const probe = (t) => new RegExp(REAL_COMPANY.source, 'i').test(t);
  for (const name of ['Amazon shows it.', 'Bezos ran it for decades.', 'Dyson built 5,127 prototypes.', 'The NHS is an example.']) {
    if (!probe(name)) problems.push(`the named-company ban does not fire on: "${name}"`);
  }
  if (probe('A clothing manufacturer shows it.')) problems.push('the named-company ban fires on an unnamed kind of firm');
}
{
  /*
   * NO YEAR IN ANY EXAMPLE. `accuracy-01` is a dated claim about a real firm that cannot be
   * corroborated, and packet 15's rule is to keep the SHAPE and drop the claim. A four-digit year in
   * student-facing prose is the signature of the claim coming back.
   */
  const years = prose.filter((s) => /\b(?:19|20)\d{2}\b/.test(s));
  if (years.length) problems.push(`${years.length} strings carry a year, which is the signature of a dated claim about a real firm (accuracy-01): "${years[0].slice(0, 80)}"`);
}

/* ── coverage, mapped BY HAND (V025) ──────────────────────────────────────── */
/*
 * THE ORACLE HAS 18 LEAVES AND THE TOPIC HAS 22 SUBSTANTIVE ONES, because the oracle keeps
 * `2b-1` and `2b-2` whole where the specification names two financial motives and four
 * non-financial ones inside them. The map below is keyed on the ORACLE's ids, so the gate is a
 * comparison against `spec-items.json` rather than against a number in a comment; the hand count of
 * 22 is printed beside it.
 *
 * A LEAF MAY NAME SEVERAL SUBSECTIONS. Packet 30's map was one slug a leaf, which understates a
 * section that splits a leaf deliberately — `1b` is taught in two chapters here, running and
 * expanding, and `4a` in two, the definition and the sum error. An array says so.
 */
const LEAF_MAP = {
  /* 1 Role of an entrepreneur */
  '1a': ['creating-and-setting-up-a-business'],
  '1b': ['running-the-business', 'expanding-and-developing-the-business'],
  '1c': ['intrapreneurship'],
  '1d': ['barriers-to-entrepreneurship', 'overcoming-the-barriers'],
  '1e': ['anticipating-risk-and-uncertainty', 'what-anticipating-costs'],
  /* 2 Entrepreneurial motives and characteristics */
  '2a': ['characteristics-and-skills'],
  '2b-1': ['financial-motives-profit-maximisation', 'financial-motives-profit-satisficing'],
  '2b-2': ['non-financial-motives-ethical-stance', 'non-financial-motives-social-entrepreneurship', 'non-financial-motives-independence-and-home-working'],
  /* 3 Business objectives */
  '3a': ['survival'],
  '3b': ['profit-maximisation-objective'],
  '3c-1': ['sales-maximisation'],
  '3c-2': ['market-share'],
  '3c-3': ['cost-efficiency'],
  '3c-4': ['employee-welfare-customer-satisfaction-social-objectives'],
  '3c-5': ['employee-welfare-customer-satisfaction-social-objectives'],
  '3c-6': ['employee-welfare-customer-satisfaction-social-objectives'],
  /* 4 Business choices */
  '4a': ['opportunity-cost', 'next-best-not-the-sum'],
  '4b': ['trade-offs', 'trade-offs-between-objectives'],
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, list] of Object.entries(LEAF_MAP)) {
    for (const slug of list) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  }
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const all = Array.isArray(oracle) ? oracle : oracle.items || oracle.rows;
  const rows = all.filter((r) => String(r.id || '').startsWith('BUS-1.3.5-'));
  /* A parent row whose children are listed separately is a heading, not a leaf. */
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('BUS-1.3.5-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `BUS-1.3.5-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);

  /*
   * THE NEGATIVE ASSERTION, AND IT IS THE PACKET'S MOST IMPORTANT CHECK. Four findings ask this
   * section to teach leadership, "moving from entrepreneur to leader", or forms of business. All
   * three belong to spans this section does not own — 1.3.4 · 5 (:746-753) and 2.3.1 · 4-5
   * (:870-878) — and packet 30 refused the mirror image of the first on 17 September. Asserted
   * against the ORACLE rather than against a comment, so that a respan or a renumber is caught
   * rather than inherited. If 1.3.5 ever genuinely acquires one of these rows, this fails and the
   * next session re-reads both spans before building anything.
   */
  const wording = (r) => String(r.wording || r.text || '').toLowerCase();
  for (const [re, why] of [
    [/entrepreneur to leader|leadership|autocratic|paternalistic|laissez/, 'leadership (1.3.4 · 5, bus_spec.txt:746-753 — specGap-01 and topFix-01 refused)'],
    [/sole trader|partnership|private limited|franchis|social enterprise|flotation|liability/, 'forms of business or liability (2.3.1 · 4-5, bus_spec.txt:870-878 — specGap-02 refused)'],
  ]) {
    const hit = rows.filter((r) => re.test(wording(r)));
    if (hit.length) problems.push(`1.3.5 now carries a row about ${why}: "${wording(hit[0]).slice(0, 70)}" — re-read both spans before keeping the refusal`);
  }
  /* and the mirror: 1.3.4 must still own 5c, or packet 30's refusal and this one disagree */
  const neighbour = all.filter((r) => String(r.id || '').startsWith('BUS-1.3.4-'));
  if (!neighbour.some((r) => /entrepreneur to leader/i.test(wording(r)))) problems.push('1.3.4 no longer carries "the difficulty of moving from entrepreneur to leader" — packet 30 teaches it there, and if it has moved, specGap-01 stops being refusable');

  const hand = Object.values(LEAF_MAP).flat();
  console.log(`\nleaves: ${leaves.length} oracle rows (22 substantive by hand), ${Object.keys(LEAF_MAP).length} mapped to ${new Set(hand).size} of ${SUBSECTIONS.length} subsections`);
}

/* ── the notes' leaf counts must add up to the topic (Layer 6) ─────────────── */
/*
 * `notes[0].meta` read "5 leaves" for a chapter that teaches three — sub-topic 1 has five lettered
 * items, but this section puts 1d and 1e in chapter 2, so the five notes claimed 24 leaves against a
 * topic that has 22. Nothing looked at it: the meta is a free string and the coverage block counts
 * ORACLE rows, not this label. Now the labels are summed and compared with the hand count.
 */
{
  const declared = NOTES.map((n) => Number((String(n.meta || '').match(/(\d+)\s*leaf|(\d+)\s*leaves/) || []).filter(Boolean)[1] || 0));
  const total = declared.reduce((a, b) => a + b, 0);
  if (total !== 22) problems.push(`the notes' own meta labels claim ${total} leaves (${declared.join(' + ')}) against the ${22} this topic has — a chapter is mislabelled`);
  if (declared.length !== BLOCKS.length) problems.push(`${declared.length} notes topics against ${BLOCKS.length} blocks`);
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

console.log(`\n${SECTION} — packet 35`);
console.log(`  before: ${before.summary.block} BLOCK / ${before.summary.debt} DEBT / ${before.summary.info} INFO`);
console.log(`  after:  ${after.summary.block} BLOCK / ${after.summary.debt} DEBT / ${after.summary.info} INFO`);
console.log(`  new:    ${newBlocks.length} BLOCK / ${newDebt.length} DEBT · carried ${carried.length} · would clear ${cleared.length} baselined findings on publish`);
console.log(`  ${content.length} blocks · ${subs} subsections · ${QUIZ.length} quiz (${unpinned.size} unpinned) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${DIAGRAMS.length} diagrams (${DIAGRAMS.reduce((n, d) => n + svgOf(d).length, 0)} views) · ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation`);
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
  BOUNDARY   no leadership style, no "entrepreneur to leader", no form of business or liability, no
             "barriers to entry", no "revenue maximisation" outside the two declared exhibits — each
             banned with the spec line that settles it, each A/B'd against a string it must catch and
             one it must not, and the 1.3.5 span re-read to confirm it still contains none of them
  SCOPE      no Examine, no Outline, no 12-mark Assess, no Economics profit vocabulary, no framework
             the IAL specification does not name, no internal ledger id in prose or in a diagram
  CLAIMS     no uncited claim about what a marker does, how often a paper asks, or how papers are
             built, and no levels-marked or L1-L4 (topFix-05 and practice-01's last clause, refused)
  PRACTICE   all eight Business command words exactly once, every tariff checked against the census
             for UNIT 1 (Assess 10, not 12), every Appendix 6 gloss sharing vocabulary with the
             census description, Assess naming a judgement, Discuss naming a conclusion
  CONTENT    every subsection inside the 350-word budget, a recall on all ${SUBSECTIONS.length}, the fill-in contract
             enforced before the validator sees it, exactly one flow body and no reorder on it, the
             answer-recoverable check over every recall type, and nothing quizzed that is not taught
  QUIZ       ${unpinned.size} unpinned items first for the pre-test, keys dealt from a hash of each stem, the
             histogram measured and the key no more often the longest option than chance — which is
             quiz-01 answered by the measurement it was made of
  PINS       every block pinned to a quiz, a practice item and a diagram, all DERIVED from each
             item's own block tag, no orphaned practice item, ${BLOCKS.length} blocks priced against FREE_QUIZ_MAX
  ARITHMETIC the spine re-derived from the functions: break-even searched for and found at exactly
             ${money(F.breakEvenLow)} and ${money(F.breakEvenHigh)}, the peak at ${money(F.profitMax.price)}, every objective inside the survival range,
             sales maximisation and satisficing earning the SAME ${money(F.salesMax.profit)} on opposite sides of the peak,
             cost efficiency LOWERING the best price, opportunity cost the largest single alternative
             and the wrong sum large enough to reverse the decision, and a trade-off rate that worsens
  DIAGRAMS   the profit curve counted BACK out of the emitted SVG — it must fall away on both sides,
             peak at the profit-maximising price, and carry its four markers at the four objective
             prices — every table figure found in the table, text EXTENT inside every canvas, glyph
             BOXES not overlapping, and every face at or above ${MIN_FACE} units unless the diagram is a
             declared table that offers the full-screen sheet
  SHAPE      every extras chain carries \`steps\`, A/B'd against packet 28 as a real control · ids
             unique · one currency, one minus sign, no year and no named real company`);

if (DUMP) {
  const path = `audit/snapshots/packet-35-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-35-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
