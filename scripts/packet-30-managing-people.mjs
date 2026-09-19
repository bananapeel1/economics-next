#!/usr/bin/env node
/**
 * PACKET 30 — managing-people, Business Unit 1 (WBS11), IAL topic 1.3.4.
 * `audit/raw/bus_spec.txt:676-753`. SIX blocks, thirty-seven subsections, 46 substantive leaves.
 *
 *   node scripts/packet-30-managing-people.mjs            # dry run, every check
 *   node scripts/packet-30-managing-people.mjs --dump     # + write the bundle
 *   node scripts/packet-30-managing-people.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. What this packet adds or
 * changes, with the reason:
 *
 *   - **THE FILL-IN CONTRACT IS CHECKED HERE BEFORE THE VALIDATOR SEES IT.** `topFix-01` is that four
 *     of this section's nine fill-ins cannot be displayed: two have more answers than blanks, one maps
 *     its blanks to the wrong lines, and one repeats "Hawthorne" as two answers, which makes the
 *     recall unfinishable — `fillin.dup-answers` records that the second chip vanishes when its twin
 *     is placed. Sixteen of the section's thirty-five BLOCK findings live in those nine widgets. The
 *     finding's optional clause asks for the RENDERER to be hardened; the renderer already draws
 *     several blanks a line (packet 7), so the defect is in the content and this is where it is caught.
 *   - **THE ARITHMETIC SPINE IS RE-DERIVED, IN A TOPIC WITH NO EQUILIBRIUM TO SOLVE.** Business Unit 1
 *     carries `Calculate (4)` and `Construct (4)`, and three of this topic's leaves are quantitative
 *     whether or not anybody notices: span of control, the costs of recruitment/selection/training,
 *     and the five financial methods. The headcount is SEARCHED FOR rather than typed — `ORG` finds
 *     the smallest firm two spans two levels apart both reach exactly — and the runner asserts the
 *     pair it found is (2,5) and (5,3) at 31. A change to that search fails the build rather than
 *     quietly teaching a tall firm and a flat firm of different sizes.
 *   - **`FAILED_SUBSTITUTION`, over every string INCLUDING the SVGs** (packet 29). Eight
 *     student-facing strings there read `P = 80 − undefinedQ`, one a scored quiz stem, because a
 *     gradient lived on `NILE.short.b` and the template asked for `NILE.b`. The arithmetic was right,
 *     so every figure re-derivation passed, and `ban()` filters SVG strings out of `prose`, so two
 *     were invisible twice over. Note the regex has NO trailing `\b`: `/\bundefined\b/` does not
 *     match `undefinedQ`, and the guard written for the defect would otherwise have passed it.
 *   - **THE ANSWER-RECOVERABLE RECALL CHECK, over every recall type** (packet 29's Verify B). It found
 *     24 of 43 steps carrying a recall answerable by scrolling up and NOT ONE was a reorder: they were
 *     fill-ins whose template was the key-idea sentence minus a word. This section has no `flow`
 *     bodies at all, so the three reorder-specific copy-from-screen checks are vacuous by
 *     construction, and this is the check that does the work.
 *   - **THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG.** `structure-01` and `topFix-02` are
 *     that `quizIndices` is the identity mapping `[0],[1],…,[5]`, so chapter 1 shows a question about
 *     piece rates and chapter 6 shows the one about the untaught paternalistic style. Deriving the
 *     indices makes that unrepresentable rather than corrected.
 *   - **TEXT EXTENT AND GLYPH-BOX COLLISIONS** (packets 25, 29). `gridColumns` throws when a table
 *     does not fit, which caught seven over-wide tables while this section was being written; the
 *     runner measures the emitted result anyway, and the collision check compares BOXES with a
 *     vertical tolerance rather than grouping by identical `y`.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, money, qty, pct, round2,
  ORG, RECRUIT, PAY, FLEXIBLE, TRAINING, STRUCTURE_TERMS, STRUCTURE_TYPES,
  THEORISTS, FINANCIAL, NON_FINANCIAL, STYLES, MASLOW, HERZBERG,
  teachingWords, TEACHING_TERMS,
} from './_packet30-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5, B6 } from './_packet30-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet30-assessment.mjs';
import { DIAGRAMS, estWidth, GRD, MIN_FACE } from './_packet30-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6];
const O = ORG, R = RECRUIT, P = PAY;

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
 * RULE 2 OF THE PROGRAMME. This topic is unusual in that its central vocabulary is entirely the
 * specification's own — every list in `_packet30-util.mjs` is transcribed from the spec span — so the
 * bans below are about what MUST NOT creep in rather than about what is missing.
 *
 * TWO OF THEM ARE THE FINDINGS THEMSELVES:
 *   - "work-life balance" is `specGap-10`, which asks whether the current WBS11 spec lists it under
 *     flexible working. It does not: `work-life` and `work life` are 0 hits in `bus_spec.txt`, and
 *     the bullet is "flexible hours and home working". Packet 29's rule — a hedge gets the same spec
 *     check as an assertion — and the answer is a ban rather than a chapter.
 *   - Named motivation and leadership frameworks the specification does not carry. `4b` names exactly
 *     four theorists and `5b` exactly four styles, so McGregor, Vroom, Tuckman, Belbin, Handy and the
 *     Blake/Tannenbaum continua are all 0 hits and all off-spec. The live section's own Extras
 *     material is where this kind of thing accumulates.
 *
 * MASLOW'S AND HERZBERG'S INTERNAL VOCABULARY IS NOT BANNED, AND THE DISTINCTION IS DELIBERATE.
 * `self-actualisation`, `esteem`, `hygiene` and `Hawthorne` are each 0 hits in `bus_spec.txt` — but
 * `4b` names "Maslow (hierarchy of needs)" and "Herzberg (two-factor theory)" explicitly, so the
 * internal vocabulary of a NAMED theory is required content and not another syllabus's language.
 * Packet 20's case was the opposite: a section's WHOLE central vocabulary belonged to a different
 * specification and displaced this one's.
 */
/*
 * ONE DELIBERATE MENTION, AND IT IS DECLARED — packet 29's pattern for the kinked demand curve,
 * applied to the same shape of problem. A student arrives at this leaf expecting "work-life balance",
 * because every textbook puts it here, so the misconception is worth writing: it tells them the
 * specification's words are "flexible hours and home working" and that the phrase appears nowhere in
 * it. A flat ban would have removed the one sentence that does the teaching. So: zero UNDECLARED
 * mentions, and exactly one string that names the phrase in order to exclude it.
 *
 * NO `g` FLAG. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`, so a second call against
 * the same string starts past the match and returns false. Packet 29 lost a round to exactly that: a
 * stateful regex inside a filter is a bug that looks like a finding.
 */
{
  const WLB = /\bwork[- ]life balance\b/i;
  const hits = readable.filter((s2) => WLB.test(s2));
  const declared = hits.filter((s2) => /appears nowhere|not among them|not in the specification|specification's words are/i.test(s2));
  const undeclared = hits.filter((s2) => !/appears nowhere|not among them|not in the specification|specification's words are/i.test(s2));
  if (undeclared.length) problems.push(`"work-life balance" is 0 hits in bus_spec.txt and appears in ${undeclared.length} string(s) that do not exclude it: "${undeclared[0].slice(0, 90)}"`);
  if (declared.length !== 1) problems.push(`expected exactly ONE string naming "work-life balance" in order to exclude it (specGap-10, answered); found ${declared.length}`);
}
ban(/\bMcGregor\b|\bTheory [XY]\b|\bVroom\b|\bexpectancy theory\b|\bAdams\b|\bequity theory\b/gi, 'a motivation theorist the specification does not name — 4b names Taylor, Mayo, Maslow and Herzberg and no others');
ban(/\bTuckman\b|\bBelbin\b|\bHandy\b|\bBlake\b|\bMouton\b|\bTannenbaum\b|\bmanagerial grid\b|\bsituational leadership\b|\btransformational leader/gi, 'a leadership or team framework the specification does not name — 5b names four styles and nothing else');
ban(/\bbureaucratic leadership\b|\btransactional leadership\b/gi, 'a fifth or sixth leadership style; 1.3.4 · 5b names exactly four');
ban(/\bVRIO\b|\bcore competenc/gi, 'vocabulary the IAL specification does not use (`terms.off-spec` carries these by name)');
ban(/\bExamine\b(?![a-z])/g, '"Examine", which is an ECONOMICS command word and has no Business tariff');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification');
/*
 * `labour turnover` IS NOT IN THIS SPEC SPAN, and it is the phrase a Business teacher reaches for
 * first. `2b` asks for the COSTS of recruitment, selection and training, which is what this section
 * teaches; turnover as a measure with a formula belongs to 2.3.4 Resource management (packet 42).
 * Naming it once as a pointer is fine; teaching it is another section's leaf.
 */
{
  const n = count(/\blabour turnover\b/gi);
  if (n > 1) problems.push(`"labour turnover" ×${n}: the rate and its formula are 2.3.4's leaf (packet 42). This section teaches the COSTS of recruitment, selection and training — name turnover at most once as a pointer.`);
}

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
  const mustFire = ['1.3.4 · 1d names both and the live section teaches only the second.', 'the March version of this item asked for 4', 'this section previously taught seven layers', 'the old notes named Costco'];
  const mustNot = ['1.3.4 · 5b names exactly these four, and they differ in who takes the decision.', 'Paternalistic is the one most often mistaken for a softer word for autocratic.'];
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
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.', 'Guidance is given at L1-L4.'];
  const mustNotFire = [`The total is ${money(R.total)} (1 mark), which is ${pct(R.share)} of the salary (1 mark).`, 'Appendix 6 defines Define as requiring the meaning of a term.'];
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
  if (probe(`The total is ${money(R.total)} (1 mark).`).length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required requires students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
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
 * ASSESS REQUIRES A SUPPORTED JUDGEMENT AND THAT IS WHAT SEPARATES IT FROM ANALYSE. Packet 20's
 * instance was the Economics twin: six Examine glosses enumerated the objectives and left out
 * EVALUATION, which is the whole difference between Examine (8) and Analyse (6). Here the pair is
 * Assess (10) against Analyse (6), and the word the census uses is "judgement".
 */
/*
 * V036, 19 September 2026. THE DISCUSS CLAUSE BELOW USED TO REQUIRE THE WORD "conclusion" AND THAT
 * IS NOT WHAT APPENDIX 6 SAYS. `bus_spec.txt:2234-2237` reads: "Requires a logical chains of
 * reasoning, in context, showing cause(s) and/or effect(s). A brief ASSESSMENT is required showing
 * an awareness of competing arguments/factors." The word `conclusion` belongs to Evaluate, at
 * :2246-2250 — "a perceptive conclusion that proposes a solution and/or recommendations" — and the
 * Economics twin says the same: `econ_spec.txt:2733-2740` asks a Discuss for "recognition of
 * different viewpoints and/or a critical assessment of the evidence" and never uses the word
 * either. So this guard was not failing to catch a defect; it was REQUIRING one, and four
 * examMatters and one practice guidance in this packet's staged bundle assert it because the guard
 * would not pass without it. Packet 35 caught the same inherited check and inverted it; this is the
 * same pair of clauses. Fourth false Appendix 6 citation in the programme (packets 21, 23, 35).
 */
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  if (/Appendix 6[^.]*\bAssess\b/.test(em) && !/judgement/i.test(em)) problems.push(`"${sec.title}": an Assess gloss that does not mention a judgement — bus_spec.txt names it, and it is what separates Assess (10) from Analyse (6)`);
  if (/Appendix 6[^.]*\bDiscuss\b/.test(em) && !/assessment/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss that does not mention the brief ASSESSMENT the census requires (bus_spec.txt:2234-2237 — it does not say "conclusion")`);
  if (/Appendix 6[^.]*\bDiscuss\b/.test(em) && /\bconclusion\b/i.test(em)) problems.push(`"${sec.title}": a Discuss gloss promising a "conclusion"; bus_spec.txt:2234-2237 asks for a brief assessment and never uses the word — that is Evaluate at :2246-2250`);
}
/*
 * The same rule over practice guidance, but SENTENCE-SCOPED and not a ban on the word. A model
 * answer may reach a conclusion — "the conclusion the figures support is …" is ordinary English and
 * is not a claim about the paper. What may not happen is a sentence that cites Appendix 6 for a
 * Discuss and then tells the student a conclusion is what it asks for. Scoping it to the citing
 * sentence is the difference between correcting a falsehood and banning a word.
 */
const discussGlossFaults = (text) => {
  const out = [];
  for (const sent of String(text || '').split(/(?<=[.!?])\s+/)) {
    if (!/Appendix 6/.test(sent) || !/\bDiscuss\b/.test(sent)) continue;
    if (!/assessment/i.test(sent)) out.push('does not name the brief ASSESSMENT the census requires (bus_spec.txt:2234-2237)');
    if (/\bconclusion\b/i.test(sent)) out.push('promises a "conclusion"; that is Evaluate at bus_spec.txt:2246-2250');
  }
  return out;
};
for (const p of PRACTICE) {
  if (p.command !== 'Discuss') continue;
  for (const why of discussGlossFaults(p.guidance)) problems.push(`the Discuss practice "${p.question.slice(0, 40)}": its Appendix 6 sentence ${why} (V036)`);
}
{
  /* A/B in both directions, on strings this packet could plausibly hold. */
  const asserts = 'Appendix 6 defines Discuss as requiring logical chains of reasoning in context, with a brief conclusion.';
  const correct = 'Appendix 6 defines Discuss as requiring logical chains of reasoning in context, closing with a brief assessment of the competing arguments.';
  const modelAnswer = 'The conclusion the figures support is that piecework suits this firm if its orders are steady.';
  const glossHits = (em) => [
    /Appendix 6[^.]*\bDiscuss\b/.test(em) && !/assessment/i.test(em),
    /Appendix 6[^.]*\bDiscuss\b/.test(em) && /\bconclusion\b/i.test(em),
  ].filter(Boolean).length;
  if (glossHits(asserts) !== 2) problems.push('the Discuss gloss check no longer fires on a gloss that promises a conclusion and never names the assessment');
  if (glossHits(correct) !== 0) problems.push('the Discuss gloss check fires on a gloss that says what Appendix 6 actually says');
  if (discussGlossFaults(`${correct} ${modelAnswer}`).length) problems.push('the sentence-scoped practice check has become a ban on the word "conclusion" — a model answer may reach one');
  if (discussGlossFaults(`${asserts} ${modelAnswer}`).length !== 2) problems.push('the sentence-scoped practice check cannot see a false Appendix 6 sentence standing beside a legitimate one');
}
for (const p of PRACTICE) {
  if (p.command === 'Assess' && !/judgement/i.test(p.guidance)) problems.push('the Assess practice guidance does not name the supported judgement the command word requires');
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
  if (SUBSECTIONS.some((s) => (s.body || []).some((b) => b.type === 'flow'))) problems.push('a flow body appeared in this section — the three copy-from-screen checks stop being vacuous, so read them');
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
   * was clearing, and of course it passed. This control is `hierarchy-and-chain-of-command` exactly
   * as built, body and all, which is the strongest available: if the applied fill-in is recoverable
   * from the real text, the check must say so.
   */
  const real = SUBSECTIONS.find((x) => x.id.endsWith(':hierarchy-and-chain-of-command'));
  const teach = { keyIdea: real.keyIdea, body: real.body, realExample: real.realExample, misconception: real.misconception, examMatters: real.examMatters };
  const copied = { ...teach, recall: { type: 'fillin', template: ['The chain of command is counted in ___, not levels'], answers: ['links'] } };
  const applied = { ...teach, recall: { type: 'fillin', template: [`A firm with ${qty(O.tall.levels)} levels has a chain of ___ links`], answers: [qty(O.tall.chain)] } };
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

/* ── an explanation may not name an option by its POSITION (packet 26) ─────── */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/i;
for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}" — placeKeys deals the key into a slot and F074 shuffles again, so it describes whatever lands there (packet 26)`);
{
  if (!BY_POSITION.test('The second option uses the number of levels rather than the links.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test(`Counting ${qty(O.tall.levels)} counts the levels themselves.`)) problems.push('the option-position check fires on an option named by its content');
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
 * is that pins are derived, but the underlying property is worth asserting directly: every one of the
 * four leadership styles must be TAUGHT before any item can test it, and the same for the four
 * theorists and the thirteen methods. Measured against the subsection titles and teaching text.
 */
{
  const taught = SUBSECTIONS.map((s) => `${s.title} ${s.keyIdea} ${(s.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')}`).join(' ')}`).join(' ').toLowerCase();
  const required = [
    ...STYLES.map(([k]) => k), ...THEORISTS.map(([k]) => k), ...FINANCIAL, ...NON_FINANCIAL.map(([k]) => k),
    ...FLEXIBLE.map(([k]) => k), ...TRAINING.map(([k]) => k), ...STRUCTURE_TERMS.map(([k]) => k), ...STRUCTURE_TYPES,
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
  if (untaught.length) problems.push(`the specification names these and the section does not teach them: ${untaught.join(', ')} — three findings describe one such hole, paternalistic leadership quizzed and never taught`);
  {
    /* A/B: the hole those three findings describe must fire, and a bullet taught in two halves must not. */
    const probe = (text, term) => !parts(term).every((x) => text.includes(x));
    if (!probe('autocratic democratic laissez-faire', 'Paternalistic')) problems.push('the taught check no longer fires on a style the section omits');
    if (probe('part-time contracts and temporary contracts are both here', 'Part-time and temporary')) problems.push('the taught check fires on a bullet taught as two separate ideas');
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
  if (!ALLOCATION.test(`The total is ${money(R.total)} (1 mark).`)) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Work out the daily rate before you start.')) problems.push('the practice.opening check fires on planning advice');
}

/* ── the arithmetic spine, re-derived ──────────────────────────────────────── */
/*
 * THE PROPERTIES THE WHOLE SECTION RESTS ON, asserted from the functions rather than read off a
 * table. `ORG` SEARCHES for its headcount — the smallest firm under 60 that two spans two levels
 * apart both reach exactly — so these assertions are what stop a change to that search quietly
 * teaching a tall firm and a flat firm of different sizes.
 */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };
eq('headcount', O.headcount, 31);
eq('tall span', O.tall.span, 2);
eq('tall levels', O.tall.levels, 5);
eq('flat span', O.flat.span, 5);
eq('flat levels', O.flat.levels, 3);
eq('the two shapes reach the same headcount', O.tall.headcount, O.flat.headcount);
eq('tall headcount from the formula', O.tall.headcount, O.totalFor(O.tall.span, O.tall.levels));
eq('flat headcount from the formula', O.flat.headcount, O.totalFor(O.flat.span, O.flat.levels));
eq('tall levels sum', O.tall.perLevel.reduce((a, b) => a + b, 0), O.headcount);
eq('flat levels sum', O.flat.perLevel.reduce((a, b) => a + b, 0), O.headcount);
eq('tall chain of command in LINKS', O.tall.chain, O.tall.levels - 1);
eq('flat chain of command in LINKS', O.flat.chain, O.flat.levels - 1);
eq('tall managers', O.tall.managers, 15);
eq('tall workers', O.tall.workers, 16);
eq('flat managers', O.flat.managers, 6);
eq('flat workers', O.flat.workers, 25);
eq('posts moved from supervising to making', O.postsMoved, O.tall.managers - O.flat.managers);
eq('the wage saving is the posts moved times the pay difference', O.wageSaving, O.postsMoved * (O.managerSalary - O.workerSalary));
eq('the wage saving is also the two bills subtracted', O.wageSaving, O.tall.wageBill - O.flat.wageBill);
eq('worker day rate', O.workerDay, O.workerSalary / O.workingDays);
eq('manager hourly rate', O.managerHour, O.managerSalary / O.workingDays / 8);
/* The recruitment bill: the sum, its share of salary, and the three stages adding back to the total. */
eq('recruitment total', R.total, R.items.reduce((a, b) => a + b.amount, 0));
eq('recruitment total as a share of salary', R.share, round2((100 * R.total) / R.salary));
eq('the share is exactly 30%', R.share, 30);
eq('the agency fee is 15% of salary', R.items[1].amount, round2(0.15 * R.salary));
eq('induction is five days of the worker rate', R.items[3].amount, 5 * O.workerDay);
eq('lost output is ten days of the worker rate', R.items[5].amount, 10 * O.workerDay);
eq("managers' time is 20 hours of the manager rate", R.items[2].amount, 20 * O.managerHour);
eq('the three stages add back to the total', R.stages.reduce((a, [, v]) => a + v, 0), R.total);
eq('the retention saving', R.retentionSaving, R.total * (R.leaversBefore - R.leaversAfter));
/* The pay spine: all five methods equal at standard output, and two of them not equal away from it. */
eq('basic weekly wage', P.basic, P.hours * P.rate);
eq('piecework at standard output equals the basic wage', P.piece(P.pieceUnits), P.basic);
eq('commission at standard sales equals the basic wage', P.commission(P.commissionSales), P.basic);
eq('the piece rate', P.pieceRate, round2(P.basic / P.pieceUnits));
eq('the commission rate', P.commissionRate, round2((100 * P.basic) / P.commissionSales));
eq('the quarter of basic pay', P.quarterBasic, P.basic * P.quarterWeeks);
eq('the bonus', P.bonus, round2((P.bonusRate / 100) * P.quarterBasic));
eq('the bonus a week', P.bonusPerWeek, round2(P.bonus / P.quarterWeeks));
eq('the profit-share pool', P.pool, round2((P.shareRate / 100) * P.profit));
eq('the profit share per head', P.perHead, round2(P.pool / O.headcount));
eq('the performance-related rate', P.prpRate, round2(P.rate * (1 + P.prpUplift / 100)));
eq('the performance-related week', P.prpWeek, round2(P.prpRate * P.hours));
eq('the performance-related gain', P.prpGain, round2(P.prpWeek - P.basic));
if (P.piece(P.slowWeek) >= P.basic) problems.push('piecework in a slow week is not below the basic wage, so the risk transfer the section teaches is not shown');
if (P.piece(P.fastWeek) <= P.basic) problems.push('piecework in a good week is not above the basic wage');
if (P.perHead !== P.perHead) problems.push('the profit share per head is not a finite figure');
/* The spec's own list lengths, so a bullet cannot be dropped silently. */
eq('flexible workforce bullets', FLEXIBLE.length, 5);
eq('training types', TRAINING.length, 3);
eq('structure terms', STRUCTURE_TERMS.length, 4);
eq('types of structure', STRUCTURE_TYPES.length, 3);
eq('theorists', THEORISTS.length, 4);
eq('financial methods', FINANCIAL.length, 5);
eq('non-financial methods', NON_FINANCIAL.length, 8);
eq('leadership styles', STYLES.length, 4);
eq("Maslow's levels", MASLOW.length, 5);
eq("Herzberg's motivators", HERZBERG.motivators.length, 5);
eq("Herzberg's hygiene factors", HERZBERG.hygiene.length, 5);

/* ── every figure re-derived out of the emitted SVG ───────────────────────── */
/*
 * A figure computed correctly and printed into the wrong `<text>` is the same defect one layer along
 * (packets 19, 23, 25, 29). So the org charts are read BACK: the boxes on each level are counted out
 * of the emitted SVG and must equal `perLevel`, and the two labels the diagram promises — the span of
 * control and the chain of command in links — must be present with the right numbers.
 */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const a = m[1];
  const attr = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 11, anchor: attr('text-anchor') || 'start' };
});
const frameOf = (svg) => { const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].trim().split(/[\s,]+/).map(Number); return { w: vb[2], h: vb[3] }; };
{
  const structure = DIAGRAMS.find((d) => d.id === diagramIds[B3]);
  const views = svgOf(structure);
  for (const [shape, view] of [[O.tall, views[0]], [O.flat, views[1]]]) {
    /* One `<rect>` a person on every level but the top, which carries one box for the top job. */
    const boxes = [...view.svg.matchAll(/<rect\b[^>]*\by="([\d.]+)"/g)].map((m) => parseFloat(m[1]));
    const byRow = boxes.reduce((mm, y) => { mm[y] = (mm[y] || 0) + 1; return mm; }, {});
    const counts = Object.keys(byRow).map(Number).sort((a, b) => a - b).map((y) => byRow[y]);
    if (JSON.stringify(counts) !== JSON.stringify(shape.perLevel)) problems.push(`${structure.title} / ${view.label}: the emitted chart has ${JSON.stringify(counts)} boxes a level against perLevel ${JSON.stringify(shape.perLevel)}`);
    if (counts.reduce((a, b) => a + b, 0) !== shape.headcount) problems.push(`${structure.title} / ${view.label}: the boxes add to ${counts.reduce((a, b) => a + b, 0)}, not ${shape.headcount}`);
    const bodies = textsOf(view.svg).map((t) => t.body).join(' ');
    if (!bodies.includes(`span of control ${qty(shape.span)}`)) problems.push(`${structure.title} / ${view.label}: no "span of control ${qty(shape.span)}" label — Construct (4) credits the labels`);
    if (!bodies.includes(`chain of command: ${qty(shape.chain)} links`)) problems.push(`${structure.title} / ${view.label}: no "chain of command: ${qty(shape.chain)} links" label, or the wrong number of links`);
    if (!bodies.includes(`= ${qty(shape.headcount)}`) && !bodies.includes(`${qty(shape.headcount)} people`)) problems.push(`${structure.title} / ${view.label}: the headcount ${qty(shape.headcount)} is not stated on the chart`);
  }
  /* The cost table's own arithmetic, read out of the table. */
  const cost = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B2]))[0];
  const costBodies = textsOf(cost.svg).map((t) => t.body);
  for (const item of R.items) if (!costBodies.includes(money(item.amount))) problems.push(`the recruitment cost table does not print ${money(item.amount)} (${item.short})`);
  if (!costBodies.includes(money(R.total))) problems.push(`the recruitment cost table does not print its own total ${money(R.total)}`);
  const printed = costBodies.filter((b) => /^\$[\d,]+$/.test(b)).map((b) => Number(b.replace(/[$,]/g, '')));
  const itemsPrinted = R.items.map((i) => i.amount);
  const sumPrinted = itemsPrinted.reduce((a, b) => a + b, 0);
  if (!printed.includes(sumPrinted)) problems.push(`the cost table prints the items but not their sum ${money(sumPrinted)}`);
  /* Maslow's five tiers, bottom-first, read back out of the pyramid. */
  const maslowView = svgOf(DIAGRAMS.find((d) => d.id === diagramIds[B4]))[0];
  const tierLabels = textsOf(maslowView.svg).filter((t) => MASLOW.some(([k]) => k === t.body)).sort((a, b) => b.y - a.y).map((t) => t.body);
  const wantOrder = [...MASLOW].reverse().map(([k]) => k);
  if (JSON.stringify(tierLabels) !== JSON.stringify(wantOrder)) problems.push(`Maslow's tiers read bottom-first are ${JSON.stringify(tierLabels)}, not ${JSON.stringify(wantOrder)} — the ORDER is the theory`);
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
  if (!probe('chain of command: 4 links and then some more words', 430, 'start', 560)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
  if (probe('Tall', 100, 'start', 560)) problems.push('the canvas-extent check fires on a label that fits');
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
ban(/\bNHS\b|\bBank of England\b|\bHMRC\b|\bcouncil tax\b|\bOfgem\b|\bOfsted\b|\bJohn Lewis\b|\bMarks (?:&|and) Spencer\b|\bM&S\b|\bTesco\b|\bSainsbury\b|\bAsda\b|\bMorrisons\b/gi, 'a UK-only institution or a named real company — accuracy-01 is a fabricated M&S layer count, and this audience sits WBS11 in Hong Kong, Malaysia, Pakistan and the Gulf');
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
 * THE ORACLE SAYS 96% FOR THE LIVE SECTION AND THE ORACLE IS WRONG. Coverage matches by SUBSTRING and
 * this topic's leaves are single words — `bonus`, `hierarchy`, `induction`, `commission`,
 * `delegation`, `consultation`, `empowerment`, `flat`, `matrix` — so `specGap-08` ("bonus not taught")
 * and a 96% are both true at once. Every one of the 46 is mapped here to the subsection that teaches
 * it; the runner refuses if a mapping names a subsection that does not exist or if a leaf is
 * unmapped, and the oracle's own figure is printed beside it as a second opinion rather than the gate.
 */
const LEAF_MAP = {
  /* 1 Approaches to staffing */
  '1a': 'staff-as-asset-or-cost',
  '1b-1': 'multi-skilling', '1b-2': 'part-time-temporary-and-zero-hour', '1b-3': 'part-time-temporary-and-zero-hour',
  '1b-4': 'flexible-hours-and-home-working', '1b-5': 'outsourcing',
  '1c': 'dismissal-and-redundancy',
  '1d-1': 'individual-and-collective-approaches', '1d-2': 'individual-and-collective-approaches',
  /* 2 Recruitment, selection and training */
  '2a-1': 'internal-versus-external-recruitment',
  '2b': 'costs-of-recruitment-selection-training',
  '2c-1': 'induction-training', '2c-2': 'on-the-job-and-off-the-job-training', '2c-3': 'on-the-job-and-off-the-job-training',
  /* 3 Organisational design */
  '3a-1': 'hierarchy-and-chain-of-command', '3a-2': 'hierarchy-and-chain-of-command',
  '3a-3': 'span-of-control', '3a-4': 'centralised-and-decentralised',
  '3b-1': 'tall-and-flat-structures', '3b-2': 'tall-and-flat-structures', '3b-3': 'matrix-structures',
  '3c': 'structure-efficiency-and-motivation',
  /* 4 Motivation in theory and practice */
  '4a': 'importance-of-employee-motivation',
  '4b-1': 'taylor-scientific-management', '4b-2': 'mayo-human-relations',
  '4b-3': 'maslow-hierarchy-of-needs', '4b-4': 'herzberg-two-factor',
  '4c-1': 'piecework-and-commission', '4c-2': 'piecework-and-commission',
  '4c-3': 'bonus-and-profit-share', '4c-4': 'bonus-and-profit-share', '4c-5': 'performance-related-pay',
  '4d-1': 'delegation-and-consultation', '4d-2': 'delegation-and-consultation', '4d-3': 'empowerment',
  '4d-4': 'team-working', '4d-5': 'flexible-working', '4d-6': 'job-enrichment',
  '4d-7': 'job-rotation-and-enlargement', '4d-8': 'job-rotation-and-enlargement',
  /* 5 Leadership */
  '5a-1': 'management-and-leadership',
  '5b-1': 'autocratic-leadership', '5b-2': 'paternalistic-leadership',
  '5b-3': 'democratic-leadership', '5b-4': 'laissez-faire-leadership',
  '5c': 'entrepreneur-to-leader',
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, slug] of Object.entries(LEAF_MAP)) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const rows = (Array.isArray(oracle) ? oracle : oracle.items || oracle.rows).filter((r) => String(r.id || '').startsWith('BUS-1.3.4-'));
  /* A parent row whose children are listed separately is a heading, not a leaf. */
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('BUS-1.3.4-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `BUS-1.3.4-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);
  /*
   * 5c IS THIS SECTION'S LEAF, AND TWO FINDINGS ASKED FOR IT TO BE MOVED OUT. `structure-05` and the
   * last clause of `topFix-04` say "From Entrepreneur to Leader" is "IAL 1.5.6" and belongs in
   * `entrepreneurs-leaders`. BUS-1.3.4-5c is "The difficulty of moving from entrepreneur to leader"
   * at bus_spec.txt:753, and 1.3.5's twenty rows never mention it. Asserted here so that nobody
   * obeying the finding later can remove it quietly.
   */
  if (!LEAF_MAP['5c']) problems.push('5c, "the difficulty of moving from entrepreneur to leader", is unmapped — it is THIS section\'s leaf (bus_spec.txt:753) and structure-05 asks wrongly for it to be moved');
  const neighbour = (Array.isArray(oracle) ? oracle : oracle.items || oracle.rows).filter((r) => String(r.id || '').startsWith('BUS-1.3.5-'));
  if (neighbour.some((r) => /entrepreneur to leader/i.test(r.wording || ''))) problems.push('1.3.5 now carries an "entrepreneur to leader" row too — re-read both spans before keeping 5c here');
  console.log(`\nleaves: ${leaves.length} substantive, ${Object.keys(LEAF_MAP).length} mapped by hand to ${new Set(Object.values(LEAF_MAP)).size} subsections`);
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

console.log(`\n${SECTION} — packet 30`);
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

console.log('\npacket checks: no "work-life balance" (specGap-10, answered — 0 hits in bus_spec.txt) · no motivation or leadership framework the specification does not name · no Examine, no Outline, no 12-mark Assess · no internal ledger id in prose or in a diagram · no uncited marker, frequency or paper claim, and no levels-marked/L1-L4 (topFix-05’s second clause, refused) · every practice tariff in the BUSINESS census for Unit 1, all eight command words exactly once · Appendix 6 glosses share vocabulary with the census, Assess names a judgement, Discuss names the brief ASSESSMENT and never a conclusion (V036) · every subsection inside the 350-word budget · a recall on all 37 subsections, the fill-in contract enforced before the validator sees it (topFix-01), both reorders sourced from extras chains, three copy-from-screen checks A/B’d, the answer-recoverable check over every type · no quiz stem near-duplicates another (quiz-01), no explanation names an option by position, nothing quizzed that is not taught (quiz-03) · every block pinned to a quiz, a practice item and a diagram, pins DERIVED from each item’s block tag, no orphaned practice item, six blocks priced against FREE_QUIZ_MAX · the whole arithmetic spine re-derived: a searched-for headcount of 31 reached exactly by span 2 over 5 levels and span 5 over 3, chains in LINKS, nine posts moved at constant headcount, a wage saving equal to the posts times the pay gap, a recruitment bill of exactly 30% of salary, and five financial methods equal at standard output · every org chart counted BACK out of the emitted SVG against perLevel, Maslow’s five tiers read bottom-first, every cost figure and the total found in the table · text EXTENT inside every canvas · glyph-BOX collisions with a vertical tolerance · every extras chain carries `steps`, A/B’d against packet 28 as a real control · ids unique · one currency, one minus sign, no year and no named real company');

if (DUMP) {
  const path = `audit/snapshots/packet-30-bundle__business__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-30-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
