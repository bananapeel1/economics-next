#!/usr/bin/env node
/**
 * PACKET 32 — aggregate-demand, Economics Unit 2 (WEC12), IAL topic 2.3.2.
 * `audit/raw/econ_spec.txt:976-1018`. FIVE blocks, thirty subsections, 31 substantive leaves.
 *
 *   node scripts/packet-32-aggregate-demand.mjs            # dry run, every check
 *   node scripts/packet-32-aggregate-demand.mjs --dump     # + write the bundle
 *   node scripts/packet-32-aggregate-demand.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists because
 * something it looks for actually shipped, in this repository, on a date. What this packet adds:
 *
 *   - **THE OFF-SPEC BANS ARE THE FINDINGS.** Four topics are in the live section or in the audit's
 *     instructions and in NEITHER case in the specification: the multiplier (2.3.4 · 4), the
 *     accelerator (0 hits), animal spirits (0 hits) and automatic stabilisers (Unit 4). Rule 2 of the
 *     programme, and this is the first section where it is enforced by a ban rather than by care.
 *     One declared exception: the multiplier is named exactly once, in a string that says whose leaf
 *     it is, the way packet 30 kept one pointer to labour turnover.
 *   - **EVERY EMITTED COLOUR IS CHECKED AGAINST `processSvg.js`, PARSED.** `structure-09` was closed
 *     in the renderer on 12 September by remapping eighteen baked literals onto `--dg-*` tokens. That
 *     makes the palette an OBLIGATION on content: a literal the remapper does not know stays light
 *     text on a light page. The list is read out of the component rather than re-typed here, so the
 *     two cannot drift.
 *   - **THE SPACED RECALL IS MEASURED BY RUNNING THE SHIPPING FUNCTIONS.** `structure-05` is that a
 *     single-subsection step shows its recall immediately AND again at the top of the next step.
 *     Packet 5 fixed it in `lib/learn-steps.js`; this asserts the property by calling `buildSteps`
 *     and `pickSpacedRecall` over this packet's own content, not by reading the comment above them.
 *   - **THE TARIFFS ARE THE ECONOMICS CENSUS.** `practice-01` says Analyse is 8 and `topFix-05` asks
 *     for "Assess (10/12)". `audit/raw/tariff-census.json` says Analyse is 6, Examine is 8, and
 *     Assess is not an Economics command word. A packet that took either finding at its word would
 *     have shipped a tariff that does not exist on this paper.
 *   - **THE PINS ARE DERIVED FROM EACH ITEM'S OWN `block` TAG** (`structure-02`: the live indices are
 *     the identity mapping) **and the diagram pin is `diagramId`** (`structure-01`, `diagram-01`,
 *     `topFix-01`: two of three `diagramRef` strings match no title and one names a diagram that has
 *     never existed, so 0 of 3 diagrams reach a student).
 *   - **THE ARITHMETIC SPINE IS RE-DERIVED**, and here the identity IS a leaf: `1b-1` is the line
 *     `C + I + G + (X−M) =`, so a section whose components do not add up is failing what it teaches.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known to
 *     work. Each block below that adds one plants the defect, confirms it fires, removes it and
 *     confirms it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { buildSteps, pickSpacedRecall, recallId } from '../lib/learn-steps.js';
import { resolvePinnedItem, resolvePinnedDiagram } from '../components/learn-mode/utils.js';
import {
  SECTION, bn, money, pct, qty, round2, AD,
  COMPONENTS, CONSUMPTION, INVESTMENT, INVESTMENT_POLICY, GOVERNMENT, NET_TRADE,
  teachingWords, TEACHING_TERMS,
} from './_packet32-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, ATTACH_SLUGS, B1, B2, B3, B4, B5 } from './_packet32-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet32-assessment.mjs';
import { DIAGRAMS, estWidth, MIN_FACE, AXIS_HEX } from './_packet32-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5];

const problems = [];

/* ── pins, derived from each item's own block tag ──────────────────────────── */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));
/*
 * THE LEAD COMES FIRST, because `resolvePinnedItem` returns ONE item and takes the first unused
 * index (`components/learn-mode/utils.js:112`). Verify A rejected `topFix-01` on exactly this: the
 * 20-mark Evaluate was third in its block's list and rendered nowhere.
 */
const byBlock = (items, skip = new Set()) => {
  const m = items.reduce((acc, it, i) => { if (!skip.has(i)) (acc[it.block] ||= []).push(i); return acc; }, {});
  for (const b of Object.keys(m)) m[b].sort((a, c) => Number(!!items[c].lead) - Number(!!items[a].lead));
  return m;
};
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
const quizIndices = Object.fromEntries(BLOCKS.map((b) => [b, quizByBlock[b]]));
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
const diagramIds = Object.fromEntries(BLOCKS.map((b, i) => [b, DIAGRAMS[i].id]));

/*
 * `lead` IS AUTHORING SCAFFOLDING AND MUST NOT REACH THE DATABASE. Verify A caught it: `strip`
 * removed only `block`, so the boolean added to fix its own rejection survived onto all 25 quiz rows
 * and all 8 practice rows, and `app/api/sections/[id]/route.js` selects whole jsonb columns, so it
 * would have been served to every client and then sat in `data` for ever. Nothing reads it and
 * nothing failed: 187 tests, 0 BLOCK, 0 DEBT. A fix that leaks its own scaffolding is the shape to
 * watch for, so the guard below is against the CLASS rather than against this field.
 */
const strip = ({ block, lead, ...rest }) => rest;
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
 * rather than per `<text>`, because a caption is wrapped a line per element and a phrase spanning
 * two of them is in neither.
 */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const count = (re) => readable.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

/* ── a failed substitution, on every surface including the SVGs ────────────── */
/*
 * Packet 29 shipped eight student-facing strings reading `P = 80 − undefinedQ`, one of them a scored
 * quiz stem. NO TRAILING `\b`: `/\bundefined\b/` does not match `undefinedQ`, because the word
 * boundary needs a non-word character and `Q` is one — the guard written for the defect would have
 * passed it.
 */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
for (const s of texts) {
  if (!FAILED_SUBSTITUTION.test(s)) continue;
  const m = s.match(FAILED_SUBSTITUTION);
  problems.push(`a failed template substitution: "${s.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\s+/g, ' ')}"`);
}
{
  for (const bad of ['a return of undefinedQ', 'the balance is NaN', 'the economy [object Object] spends', 'a total of ${bn(x)}']) {
    if (!FAILED_SUBSTITUTION.test(bad)) problems.push(`the failed-substitution check no longer fires on: "${bad}"`);
  }
}

/* ══ RULE 2: FOUR TOPICS THAT ARE NOT IN THIS SPECIFICATION ════════════════ */
/*
 * Each ban below is a measurement against `audit/raw/econ_spec.txt`, not a preference:
 *   `accelerator`            0 hits in the whole Economics specification (`specGap-09`, answered).
 *   `animal spirits`         0 hits; `3b`'s words are "business confidence and expectations".
 *   `automatic stabilisers`  1 hit, line 1855, Unit 4 public sector borrowing; `4a-2` is "the level
 *                            of economic activity" (`specGap-06`, reassigned).
 *   `multiplier`             4 hits, all at 1078-1086 = 2.3.4 · 4, with MPC, MPS, MPT and MPM
 *                            (`specGap-08`, `topFix-04`, `structure-03`).
 *
 * `Assess` and `Outline` are command words this subject does not have; `Examine` IS an Economics
 * command word and is deliberately not banned here, which is the mirror of packet 30's ban on it.
 */
ban(/\baccelerat(or|ion)\b/gi, 'the accelerator, which is 0 hits in econ_spec.txt and already 0 hits in the live section (specGap-09, answered)');
ban(/\banimal spirits?\b/gi, '"animal spirits", 0 hits in econ_spec.txt — 3b\'s own words are "business confidence and expectations" (specGap-05, reassigned)');
ban(/\bautomatic stabilis[ez]/gi, '"automatic stabilisers", which is econ_spec.txt:1855 and Unit 4; 4a-2 is "the level of economic activity" (specGap-06, reassigned)');
ban(/\bmarginal propensity\b|\bMP[CSTM]\b|\bMPW\b/g, 'a marginal propensity, which is 2.3.4 · 4b and not 2.3.2 (specGap-08)');
ban(/\bAssess\b(?![a-z])/g, '"Assess", which is a BUSINESS command word and has no Economics tariff (topFix-05 asks for it)');
ban(/\bOutline\b(?![a-z])/g, '"Outline", which is in neither specification — and is one of the live section\'s five practice tariffs');
/*
 * THE ONE DECLARED MENTION. A student meeting "G rises by $40bn" will have been told elsewhere that
 * the effect is larger than the rise, and a flat ban would remove the one sentence that tells them
 * where that belongs. So: zero UNDECLARED mentions, and exactly one string that names the multiplier
 * in order to hand it to 2.3.4.
 *
 * NO `g` FLAG. `RegExp.prototype.test` on a `/g` regex advances `lastIndex`, so a second call against
 * the same string starts past the match and returns false — packet 29 lost a round to exactly that.
 */
{
  const MULT = /\bmultiplier\b/i;
  const DECLARED = /2\.3\.4|national income/i;
  const hits = readable.filter((s) => MULT.test(s));
  const declared = hits.filter((s) => DECLARED.test(s));
  const undeclared = hits.filter((s) => !DECLARED.test(s));
  if (undeclared.length) problems.push(`the multiplier is 2.3.4 · 4 and appears in ${undeclared.length} string(s) that do not hand it over: "${undeclared[0].slice(0, 90)}"`);
  if (declared.length !== 1) problems.push(`expected exactly ONE string naming the multiplier in order to assign it to 2.3.4; found ${declared.length}`);
}
{
  /* A/B: each ban must fire on the phrase it was written for, and not on the teaching beside it. */
  const fires = (re, s) => { const r = new RegExp(re.source, re.flags.replace('g', '')); return r.test(s); };
  const cases = [
    [/\baccelerat(or|ion)\b/i, 'the accelerator effect on investment', true],
    [/\banimal spirits?\b/i, 'Keynes called it animal spirits', true],
    [/\banimal spirits?\b/i, 'business confidence and expectations decide the expected return', false],
    [/\bautomatic stabilis[ez]/i, 'automatic stabilisers raise G in a downturn', true],
    [/\bautomatic stabilis[ez]/i, 'the level of economic activity raises G in a downturn', false],
    [/\bmarginal propensity\b|\bMP[CSTM]\b|\bMPW\b/, 'the marginal propensity to import is 0.25', true],
    [/\bmarginal propensity\b|\bMP[CSTM]\b|\bMPW\b/, 'an extra $100bn of spending takes $25bn abroad', false],
    [/\bAssess\b(?![a-z])/, 'Assess the impact on AD', true],
    [/\bAssess\b(?![a-z])/, 'a brief assessment of the arguments', false],
    [/\bOutline\b(?![a-z])/, 'Outline two reasons', true],
  ];
  for (const [re, s, want] of cases) {
    if (fires(re, s) !== want) problems.push(`off-spec ban A/B failed: ${want ? 'no longer fires' : 'fires'} on "${s}"`);
  }
}

/* ── no note about OUR OWN PREVIOUS CONTENT in text a student reads ────────── */
/*
 * Packet 18's rule, and packet 30 shipped four instances of it past every mechanical check — three
 * diagram captions and a teaching paragraph saying "the live section". A student has no idea what
 * "the live section" is; it reads as a claim about the specification. Over `readable`, so the SVG
 * text is included, because three of those four were inside SVGs.
 */
const SELF_REFERENCE = /\bthe live section\b|\bthis section (?:previously|used to|formerly)\b|\bthe previous version\b|\bthe old (?:notes|section|version)\b|\bpreviously (?:taught|said|omitted|left out)\b|\bearlier version\b|\bthis packet\b/i;
for (const s of readable) {
  if (!SELF_REFERENCE.test(s)) continue;
  const m = s.match(SELF_REFERENCE);
  problems.push(`a note about our own previous content in text a student reads: "${s.slice(Math.max(0, m.index - 70), m.index + 90).replace(/\s+/g, ' ')}"`);
}
{
  const mustFire = ['2.3.2 · 1c and the live section teaches only half of it.', 'this section previously taught the multiplier', 'the old notes named a UK benefit'];
  const mustNot = ['This section deliberately does not teach it.', 'The specification names five influences and no others.'];
  problems.push(
    ...mustFire.filter((x) => !SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE no longer fires on: "${x}"`),
    ...mustNot.filter((x) => SELF_REFERENCE.test(x)).map((x) => `SELF_REFERENCE fires on ordinary teaching: "${x}"`),
  );
}

/* ── no internal id in anything a student reads (packet 19) ────────────────── */
const LEDGER_ID = /\b(?:topFix|specGap|specThin|accuracy|structure|quiz|practice|diagram)-\d{2}\b|\bF\d{3}\b|\bV\d{3}\b|\bC-[a-z-]+-(?:topFix|specGap|accuracy|structure)-\d{2}\b/;
for (const s of prose) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id in student-facing text: "${s.slice(0, 90)}"`);
for (const s of svgText) if (LEDGER_ID.test(s)) problems.push(`an internal ledger id inside a diagram: "${s.slice(0, 90)}"`);

/* ── claims about markers, frequency and how papers are built ──────────────── */
/*
 * `topFix-05` ASKS FOR EXACTLY WHAT THIS REFUSES: "levels-based guidance that sums correctly". That
 * is a claim about what a marker does. `examMatters` may say what the COMMAND WORD requires, because
 * Appendix 6 states it and it is citable.
 */
/*
 * WIDENED BY LAYER 6, WHICH WALKED PAST THE INHERITED VERSION THREE TIMES. It found "An examiner
 * reading 'AD falls' ... cannot tell whether you know the difference", "the marks are in reading the
 * two against each other" and "a conclusion ... earns you nothing here" — all claims about marking,
 * and none of them matched. The inherited regex wanted an earn/cost verb WITHIN 60 characters of the
 * word "marks", or the exact phrase "earns nothing"; "earns YOU nothing" has a word in between, and
 * "the marks are in" has no verb at all. Three shapes added: any mention of an examiner, marks
 * located somewhere ("the marks are in/sit in/live in"), and an intervening pronoun before "nothing".
 * A rule written for one phrasing is a rule for one phrasing.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?)\b(?: (?:you|them|a student))? nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bL1[ -]L4\b|\bmark schemes? (?:accept|allow|list|credit)\b|\bexaminers?\b|\bmarks?\b[^.!?]{0,30}\b(?:are in|sit in|live in|go to)\b/i;
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
{
  /* The first four are inherited; the last three are the strings Layer 6 found and this missed. */
  const mustFire = ['An answer that stops there earns nothing.', 'This is levels-marked against the KAA criteria.', 'Mark schemes accept either form.', 'Guidance is given at L1-L4.',
    'An examiner reading "AD falls" cannot tell whether you know the difference.', 'the marks are in reading the two against each other', 'a conclusion about which factor matters more earns you nothing here'];
  const mustNotFire = [`Saving is ${pct(18)} of ${bn(900)} (1 mark).`, 'Appendix 6 defines Analyse as requiring a chain of reasoning.', 'Appendix 6 says Analyse does not include evaluation, so a conclusion is outside what this command word asks for.'];
  problems.push(
    ...mustFire.filter((x) => !MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM no longer fires on: "${x}"`),
    ...mustNotFire.filter((x) => MARK_CLAIM.test(withoutAllocations(x))).map((x) => `MARK_CLAIM fires on a point allocation: "${x}"`),
  );
}
const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) {
  if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
  if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`);
}

/* ── tariffs, against the ECONOMICS census ────────────────────────────────── */
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const pItem of PRACTICE) {
  const row = census.find((r) => r.command === pItem.command);
  if (!row) problems.push(`practice command "${pItem.command}" is not in the economics census — this subject has no Assess and no Outline`);
  else if (!row.marks.includes(pItem.marks)) problems.push(`practice ${pItem.command} (${pItem.marks}) — in Economics that command carries ${row.marks.join(' or ')}`);
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
const subjectMarks = [...new Set(census.flatMap((r) => r.marks))].sort((a, b) => a - b);
for (const s of prose) {
  const stripped = withoutAllocations(s);
  for (const m of stripped.matchAll(PROSE_TARIFF)) {
    const marks = Number(m[1]);
    if (!subjectMarks.includes(marks)) problems.push(`a ${marks}-mark question named in prose; Economics has ${subjectMarks.join(', ')} only: "${stripped.slice(Math.max(0, m.index - 40), m.index + 40)}"`);
  }
}
{
  /* A/B: the two tariffs the findings ask for must fire, and the ones this subject has must not. */
  const probe = (text) => [...withoutAllocations(text).matchAll(PROSE_TARIFF)].map((m) => Number(m[1])).filter((n) => !subjectMarks.includes(n));
  if (!probe('a 10-mark Analyse').length) problems.push('the prose-tariff check no longer fires on a 10-mark question, which is practice-01\'s defect and not an Economics tariff');
  if (!probe('a 12-mark Assess').length) problems.push('the prose-tariff check no longer fires on a 12-mark question, which is Business Units 3/4');
  if (probe('an 8-mark Examine and a 14-mark Discuss').length) problems.push('the prose-tariff check fires on a valid Economics tariff');
  if (probe(`Saving is ${bn(162)} (1 mark).`).length) problems.push('the prose-tariff check fires on a mark ALLOCATION inside guidance, which is not a question tariff');
}

/* ── the Appendix 6 gloss must share vocabulary with the census description ── */
const STOP = new Set('a an the and or of to in for on with that this these those is are be requires required students needs need it its as at by from any relevant where appropriate their there which what when who how also should may can will not no'.split(' '));
const words = (s) => String(s).toLowerCase().match(/[a-z]{4,}/g) || [];
const COMMANDS = census.map((r) => r.command).join('|');
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  const m = em.match(new RegExp(`Appendix 6[^.]*?\\b(${COMMANDS})\\b`));
  if (!m) { problems.push(`"${sec.title}": examMatters does not cite Appendix 6 for a command word`); continue; }
  const row = census.find((r) => r.command === m[1]);
  const mine = new Set(words(em).filter((w) => !STOP.has(w)));
  const theirs = words(row.description).filter((w) => !STOP.has(w));
  if (!theirs.filter((w) => mine.has(w)).length) problems.push(`"${sec.title}": the ${m[1]} gloss cites Appendix 6 and shares NOTHING with the census description — read econ_spec.txt:${row.lines[0]}-${row.lines[1]} and restate it`);
}
/*
 * THE WORD THAT SEPARATES EACH PAIR. Packet 20's instance was six Examine glosses that enumerated
 * the objectives and left out EVALUATION, which is the whole difference between Examine (8) and
 * Analyse (6). The census states each one: Analyse "does not include evaluation", Examine requires
 * "a brief assessment", Discuss "different viewpoints", Evaluate "informed judgements".
 */
const GLOSS_MUST = [['Analyse', /evaluation|depth/i], ['Examine', /assessment|evaluation/i], ['Discuss', /viewpoint|assessment|conclusion/i], ['Evaluate', /judgement|assessment/i], ['Explain', /two[- ]stage|chain/i], ['Draw', /label/i], ['Calculate', /workings|stages?/i], ['Define', /meaning/i]];
for (const sec of SUBSECTIONS) {
  const em = sec.examMatters || '';
  for (const [cmd, must] of GLOSS_MUST) {
    if (new RegExp(`Appendix 6[^.]*\\b${cmd}\\b`).test(em) && !must.test(em)) problems.push(`"${sec.title}": the ${cmd} gloss leaves out the property the census uses to define it (${must})`);
  }
}
for (const p of PRACTICE) {
  if (p.command === 'Examine' && !/assess/i.test(p.guidance)) problems.push('the Examine practice guidance does not name the brief assessment the command word requires');
  if (p.command === 'Analyse' && !/evaluation|does not include/i.test(p.guidance)) problems.push('the Analyse practice guidance does not say that evaluation is not credited — the one thing separating it from Examine');
  if (p.command === 'Draw' && !/label/i.test(p.guidance)) problems.push('the Draw practice guidance does not mention labelling, which is what the command word asks for');
  if (p.command === 'Calculate' && !/workings|line|step/i.test(p.guidance)) problems.push('the Calculate practice guidance does not ask for workings');
}

/* ── the word budget, measured the way the validator measures it ───────────── */
for (const sec of SUBSECTIONS) {
  const w = teachingWords(sec);
  if (w > 350) problems.push(`"${sec.title}": ${w} words of teaching text (budget 350)`);
}

/* ── recalls: completeness and the fill-in contract ────────────────────────── */
if (SUBSECTIONS.some((s) => !s.recall)) problems.push(`${SUBSECTIONS.filter((s) => !s.recall).length} subsections carry no recall`);
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  const orphan = ATTACH_SLUGS.filter((k) => !slugs.has(k));
  if (orphan.length) problems.push(`recall bank keyed to a subsection that does not exist: ${orphan.join(', ')} — a typo here is silent, the recall simply never appears`);
}
/*
 * THE FILL-IN CONTRACT, ENFORCED BEFORE THE VALIDATOR SEES IT (packet 30's `topFix-01`, where four of
 * nine live fill-ins could not be displayed at all). One `___` a template line; `answers.length`
 * equal to the blank count; no duplicate answer, because the second chip vanishes when its twin is
 * placed and the recall cannot be finished; no answer printed in the template outside its own blank;
 * a hint that is not a prefix of its answer (`topFix-03`'s "drop leading-letter hints everywhere");
 * and two or three distractors so the chip bank is not a closed set.
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
    if (a && String(h).toLowerCase().startsWith(a.slice(0, Math.max(3, Math.floor(a.length / 2))))) problems.push(`"${sec.title}": hint ${i + 1} is a prefix of its answer (topFix-03)`);
  }
}
{
  const shape = (tpl, ans) => {
    const blanks = tpl.reduce((n, l) => n + (String(l).match(/_{3,}/g) || []).length, 0);
    const lower = ans.map((a) => String(a).toLowerCase());
    return blanks !== ans.length || lower.some((a, i) => lower.indexOf(a) !== i) || tpl.some((l) => (String(l).match(/_{3,}/g) || []).length !== 1);
  };
  if (!shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3', '4', '5'])) problems.push('the fill-in contract check no longer fires on five answers over three blanks');
  if (!shape(['a ___ b', 'c ___ d'], ['shift', 'shift'])) problems.push('the fill-in contract check no longer fires on a duplicate answer');
  if (!shape(['a ___ b ___ c'], ['1', '2'])) problems.push('the fill-in contract check no longer fires on two blanks in one line');
  if (shape(['a ___ b', 'c ___ d', 'e ___ f'], ['1', '2', '3'])) problems.push('the fill-in contract check fires on a well-formed fill-in');
}
/*
 * THE THREE COPY-FROM-SCREEN CHECKS, VACUOUS HERE BY CONSTRUCTION AND ASSERTED TO BE SO. This
 * section authors NO reorders — its content is lists of influences, not sequences — so packet 26's
 * structural rule, packet 26's overlap rule and packet 27's paraphrase rule can none of them fire.
 * That makes the A/B the only thing keeping them honest, and the last line makes the vacuum visible:
 * if a reorder ever appears here, the guard says to come back and read these.
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
  const item = 'The demand for money falls and market rates fall with it';
  const paraphrase = 'Demand for money declines so market interest rates decline too';
  const unrelated = 'A tariff raises the price a buyer at home pays';
  if (jac(item, item) < 0.6) problems.push('the reorder-overlap check no longer fires on a verbatim flow step');
  if (!shareDistinctive(item, paraphrase)) problems.push('the paraphrase check no longer fires on a reworded flow step');
  if (shareDistinctive(item, unrelated)) problems.push('the paraphrase check fires on a flow that teaches something else');
  if (SUBSECTIONS.some((s) => s.recall?.type === 'reorder')) problems.push('a reorder appeared in this section — the three copy-from-screen checks stop being vacuous, so read them and source it from an extras chain');
}
/*
 * RULE 6 GENERALISED TO EVERY RECALL TYPE, with V029's corrections rather than packet 29's version:
 * the sentence split is on `.!?` ONLY (a give-away across a colon was invisible) and the thresholds
 * are 0.70 / 0.75 / 0.70 rather than 0.85 / 0.95. Corrected, the same check found nine on packet 30
 * where the inherited one reported zero. A green result from an inherited check is a claim, not
 * evidence. `examMatters` is in the corpus because leaving it out was the check's own blind spot.
 */
const sentencesOf = (sec) => [sec.keyIdea, ...(sec.body || []).flatMap((b) => [b.text, ...(b.items || []), ...((b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)))]), sec.realExample?.text, sec.misconception, sec.examMatters]
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
    for (const pr of r.pairs || []) for (const sent of sents) if (share(pr.left, sent) >= 0.70 && share(pr.right, sent) >= 0.70) out.push(`match pair given in one sentence above: "${pr.left}" / "${pr.right}"`);
  } else if (r.type === 'reorder') {
    for (const it of r.correctOrder || []) for (const sent of sents) if (share(it, sent) >= 0.75) out.push(`reorder item printed verbatim above: "${String(it).slice(0, 44)}"`);
  }
  return [...new Set(out)];
};
for (const sec of SUBSECTIONS) for (const why of recoverable(sec)) problems.push(`"${sec.title}": ${why} — the recall is answerable by scrolling up (Verify B, packet 29)`);
{
  /*
   * THE NEGATIVE CONTROL IS A REAL SHIPPED SUBSECTION, BODY AND ALL. V029's fourth reason is that
   * packet 29's A/B paired a real recall with an INVENTED one-sentence teaching text that omitted the
   * body paragraph the real step carries, so the control cleared a stripped-down fake of the step it
   * was clearing. This control is `the-savings-ratio` exactly as built.
   */
  const real = SUBSECTIONS.find((x) => x.id.endsWith(':the-savings-ratio'));
  const teach = { keyIdea: real.keyIdea, body: real.body, realExample: real.realExample, misconception: real.misconception, examMatters: real.examMatters };
  const copied = { ...teach, recall: { type: 'fillin', template: ['The savings ratio is saving expressed as a percentage of disposable ___'], answers: ['income'] } };
  const applied = { ...teach, recall: real.recall };
  if (!recoverable(copied).length) problems.push('the answer-recoverable check no longer fires on a fill-in that is the key idea with one word removed');
  if (recoverable(applied).length) problems.push('the answer-recoverable check fires on the real applied fill-in it was written to clear');
}

/* ── A RECALL MAY NOT NEED A LATER SUBSECTION (packet 30's Layer 6) ────────── */
/*
 * The mirror image of copy-from-screen, and the check that found seven on packet 30. Every inherited
 * check asks whether an answer is available ABOVE the widget; none asks whether it is available only
 * BELOW. A builder reading top to bottom cannot see this, because by then they know it all. The
 * measure is the section's OWN vocabulary — the specification's five lists, imported from the module
 * that holds them, so the check cannot drift from what the section teaches.
 */
{
  const firstTaught = new Map();
  SUBSECTIONS.forEach((sec, i) => {
    const text = `${sec.title} ${sec.keyIdea} ${(sec.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')} ${(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)).join(' ')}`).join(' ')}`.toLowerCase();
    for (const term of TEACHING_TERMS) if (!firstTaught.has(term) && text.includes(term)) firstTaught.set(term, i);
  });
  const recallStrings = (r) => {
    if (!r) return [];
    if (r.type === 'fillin') return [r.prompt, ...(r.template || []), ...(r.answers || []), ...(r.distractors || [])];
    if (r.type === 'classify') return [r.prompt, ...(r.groups || []).flatMap((g) => [g.name, ...(g.items || [])])];
    if (r.type === 'match') return [r.prompt, ...(r.pairs || []).flatMap((x) => [x.left, x.right])];
    if (r.type === 'reorder') return [r.prompt, ...(r.correctOrder || [])];
    return [];
  };
  SUBSECTIONS.forEach((sec, i) => {
    const text = recallStrings(sec.recall).join(' ').toLowerCase();
    for (const term of TEACHING_TERMS) {
      if (!text.includes(term)) continue;
      const at = firstTaught.get(term);
      if (at != null && at > i) problems.push(`"${sec.title}" (step ${i + 1}) has a recall naming "${term}", first taught in "${SUBSECTIONS[at].title}" (step ${at + 1}) — a student meeting this widget cannot answer it (Layer 6, packet 30)`);
    }
  });
  {
    const probe = (mine, termIdx) => termIdx > mine;
    if (!probe(1, 4)) problems.push('the forward-reference check no longer fires on a term taught four steps later');
    if (probe(9, 3)) problems.push('the forward-reference check fires on a term taught earlier, which is synoptic and fine');
    if (!firstTaught.size) problems.push('the forward-reference check found no taught terms at all, so it can never fire');
  }
}

/* ── A PRACTICE ITEM MUST BE PINNED TO THE CHAPTER IT TESTS (packet 30) ────── */
{
  const blockText = content.map((b) => `${b.title} ${b.sections.map((x) => `${x.title} ${x.keyIdea} ${(x.body || []).map((y) => `${y.text || ''} ${(y.items || []).join(' ')}`).join(' ')}`).join(' ')}`.toLowerCase());
  const distinctive = (s) => [...new Set(String(s).toLowerCase().match(/[a-z]{6,}/g) || [])];
  PRACTICE.forEach((pItem, i) => {
    const mine = BLOCKS.indexOf(pItem.block);
    const ws = distinctive(`${pItem.question} ${pItem.guidance}`);
    if (!ws.length) return;
    const scores = blockText.map((t) => ws.filter((w) => t.includes(w)).length / ws.length);
    const best = scores.indexOf(Math.max(...scores));
    if (best !== mine && scores[best] - scores[mine] > 0.05) {
      problems.push(`practice ${i} (${pItem.command}) is pinned to "${pItem.block}" but shares ${Math.round(scores[best] * 100)}% of its vocabulary with "${BLOCKS[best]}" against ${Math.round(scores[mine] * 100)}% — a student practising the wrong chapter`);
    }
  });
}

/* ── an explanation may not name an option by its POSITION (packet 26) ─────── */
const BY_POSITION = /\bthe (first|second|third|fourth|last|other|final) (option|answer|choice|distractor|one)\b|\boption (?:A|B|C|D|one|two|three|four)\b|\b(?:answer|option) \((?:a|b|c|d)\)/i;
for (const q of QUIZ) if (BY_POSITION.test(q.explanation)) problems.push(`quiz explanation names an option by position: "${q.question.slice(0, 60)}" — placeKeys deals the key into a slot and F074 shuffles again, so it describes whatever lands there`);
{
  if (!BY_POSITION.test('The second option adds the two trade figures instead of subtracting.')) problems.push('the option-position check no longer fires on "the second option"');
  if (BY_POSITION.test(`Adding the two trade figures gives ${bn(1460)}, which is not the identity.`)) problems.push('the option-position check fires on an option named by its content');
}

/* ── quiz shape ────────────────────────────────────────────────────────────── */
for (const q of QUIZ) {
  const opts = q.options.map((o) => String(o).trim().toLowerCase());
  if (new Set(opts).size !== opts.length) problems.push(`duplicate options in "${q.question.slice(0, 60)}"`);
  if (q.options.length !== 4) problems.push(`${q.options.length} options in "${q.question.slice(0, 60)}"`);
  if (!q.explanation || q.explanation.length < 80) problems.push(`thin explanation on "${q.question.slice(0, 60)}"`);
}
for (let i = 0; i < QUIZ.length; i += 1) for (let j = i + 1; j < QUIZ.length; j += 1) {
  const s = jac(QUIZ[i].question, QUIZ[j].question);
  if (s >= 0.5) problems.push(`two quiz stems share ${Math.round(s * 100)}% of their words: "${QUIZ[i].question.slice(0, 50)}" and "${QUIZ[j].question.slice(0, 50)}"`);
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
 * NOTHING QUIZZED THAT IS NOT TAUGHT. `structure-04` is that the pre-test can draw a circular-flow or
 * a paradox-of-thrift item this section never teaches; `quiz-02` is an item answerable only by
 * knowing a UK benefit. Measured against every term the SPECIFICATION names, from the same lists the
 * content is built from.
 */
{
  const taught = SUBSECTIONS.map((s) => `${s.title} ${s.keyIdea} ${(s.body || []).map((b) => `${b.text || ''} ${(b.items || []).join(' ')} ${(b.steps || []).map((x) => (typeof x === 'object' ? `${x.title} ${x.subtitle || ''}` : x)).join(' ')}`).join(' ')}`).join(' ').toLowerCase();
  const required = [
    ...COMPONENTS.map(([, k]) => k), ...CONSUMPTION.map(([k]) => k), ...INVESTMENT.map(([k]) => k),
    ...INVESTMENT_POLICY.map(([k]) => k), ...GOVERNMENT.map(([k]) => k), ...NET_TRADE.map(([k]) => k),
    'gross investment', 'net investment', 'savings ratio',
  ];
  /* A multi-word bullet is taught when its PARTS are, not when its heading is (packet 30). */
  const parts = (t) => t.toLowerCase().replace(/^(the|level of|degree of)\s+/, '').split(/\s+(?:and|or|versus|vs)\s+|,\s*/).map((x) => x.trim()).filter(Boolean);
  const untaught = [...new Set(required.filter((t) => !parts(t).every((x) => taught.includes(x))))];
  if (untaught.length) problems.push(`the specification names these and the section does not teach them: ${untaught.join(', ')}`);
  {
    const probe = (text, term) => !parts(term).every((x) => text.includes(x));
    if (!probe('disposable income interest rates consumer confidence', 'wealth effects')) problems.push('the taught check no longer fires on an influence the section omits');
    if (probe('business confidence matters and expectations decide the return', 'business confidence and expectations')) problems.push('the taught check fires on a bullet taught in two halves');
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
  if (BLOCKS.every((b, i) => (quizIndices[b] || [])[0] === i)) problems.push('quizIndices are 0,1,2,… in block order, which is `pins.identity` and exactly the live defect (structure-02)');
  const pp = Object.values(practiceIndices).flat();
  const pdup = pp.filter((x, i) => pp.indexOf(x) !== i);
  if (pdup.length) problems.push(`practice item pinned by more than one block: ${pdup.join(', ')}`);
  const orphanPractice = PRACTICE.map((_, i) => i).filter((i) => !pp.includes(i));
  if (orphanPractice.length) problems.push(`practice item(s) ${orphanPractice.join(', ')} pinned to no block`);
}
/*
 * FIVE BLOCKS COSTS NOTHING, AND THE PRICE IS RE-MEASURED RATHER THAN INHERITED. Packet 2.5 changed
 * the order in `freeQuizPayload()`: the chapter pins are taken FIRST and the Quiz tab's
 * `PREVIEW_LIMITS.quiz` is only topped up afterwards, so five chapters spend 5 of `FREE_QUIZ_MAX`
 * (10) and `PRETEST_HEADROOM` (3) is paid in full. The eight-block ceiling in packet 29's note was
 * arithmetic under the PRE-2.5 order; the ceiling is ten. Never inherit another section's price.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz for a signed-out student`);
if (content.length !== BLOCKS.length) problems.push(`${content.length} blocks built against ${BLOCKS.length} declared`);

/* ══ WHAT EACH CHECK-IN ACTUALLY RESOLVES, BY RUNNING THE APP'S OWN RESOLVER ══ */
/*
 * VERIFY A REJECTED `topFix-01` HERE, AND THE REJECTION WAS RIGHT. The guard above asserts that
 * every practice item is pinned to SOME block and that no index is pinned twice. That validates the
 * PIN LIST. It says nothing about what the page RESOLVES — and `resolvePinnedItem`
 * (`components/learn-mode/utils.js:112`) returns exactly ONE item, the first unused index in the
 * list. Block 2 was pinned `[2, 3, 7]`, so it rendered the Calculate and silently dropped the
 * Explain and the 20-mark Evaluate, which is the item `topFix-01` names by tariff.
 *
 * This is the programme's own rule met again from a new direction: a check built from the builder's
 * model of the artefact (a list of indices) cannot see a property of the thing that renders it. So
 * this block imports `resolvePinnedItem` and `resolvePinnedDiagram` from the component directory and
 * runs them over the built content, with the same shared `used` sets and in the same order
 * `LearnModeTab.jsx:212-221` uses. What it asserts is what a student is shown.
 *
 * Eight command words over five chapters means three practice items can only ever be reached from
 * the Practice tab. WHICH three is now a decision — `lead: true` in `_packet32-assessment.mjs` — and
 * the three left out are Define, Calculate and Explain, the lowest three tariffs.
 */
{
  const usedD = new Set(), usedQ = new Set(), usedP = new Set();
  const resolved = content.map((block) => ({
    block: block.title,
    diagram: resolvePinnedDiagram(DIAGRAMS, { id: block.diagramId, ref: block.diagramRef }, usedD),
    quiz: resolvePinnedItem(QUIZ, { indices: block.quizIndices }, usedQ),
    practice: resolvePinnedItem(PRACTICE, { indices: block.practiceIndices }, usedP),
  }));
  for (const r of resolved) {
    if (!r.diagram) problems.push(`check-in "${r.block}" resolves NO diagram — 0 of 3 was the live defect (structure-01, diagram-01)`);
    if (!r.quiz) problems.push(`check-in "${r.block}" resolves NO quiz item`);
    if (!r.practice) problems.push(`check-in "${r.block}" resolves NO practice item`);
    if (r.quiz && !r.quiz.lead) problems.push(`check-in "${r.block}" resolves the quiz item "${r.quiz.question.slice(0, 50)}", which is not the one marked lead — the pin order decides this, not the author`);
    if (r.practice && !r.practice.lead) problems.push(`check-in "${r.block}" resolves ${r.practice.command} (${r.practice.marks}), which is not the one marked lead`);
    if (r.diagram && r.diagram.id !== diagramIds[r.block]) problems.push(`check-in "${r.block}" resolves the diagram "${r.diagram.title}", which is not the one it pins`);
  }
  /* The Evaluate is the item topFix-01 names, so assert it by tariff rather than by flag. */
  const tariffsShown = resolved.map((r) => r.practice?.marks).filter(Boolean).sort((a, b) => a - b);
  if (!tariffsShown.includes(20)) problems.push('no check-in resolves the 20-mark Evaluate — topFix-01 asks for it in Learn Mode by name, and Verify A rejected the packet over it');
  const unreachable = PRACTICE.map((x, i) => (resolved.some((r) => r.practice?.id === x.id) ? null : `${x.command} (${x.marks})`)).filter(Boolean);
  if (unreachable.length !== 3) problems.push(`${unreachable.length} practice items are unreachable from Learn Mode; with 8 command words over ${BLOCKS.length} chapters it must be exactly 3 — ${unreachable.join(', ')}`);
  if (unreachable.some((u) => /Evaluate|Discuss|Examine|Analyse/.test(u))) problems.push(`a high-tariff item is unreachable from Learn Mode: ${unreachable.join(', ')} — the three left to the Practice tab should be the three lowest`);
  {
    /*
     * A/B AGAINST THE REAL DEFECT. The first list is block 2's pin order exactly as Verify A found
     * it; the second is the order the `lead` flag produces. Run through the SHIPPING resolver, not
     * through a re-implementation of it.
     */
    const asFound = resolvePinnedItem(PRACTICE, { indices: [2, 3, 7] }, new Set());
    const asFixed = resolvePinnedItem(PRACTICE, { indices: [7, 2, 3] }, new Set());
    if (asFound?.marks === 20) problems.push('the resolver no longer drops a 20-mark item that is third in its pin list — re-read Verify A’s rejection before trusting this check');
    if (asFixed?.marks !== 20) problems.push('the resolver does not return the 20-mark item when it is first in its pin list');
  }
  console.log(`check-ins: ${resolved.map((r) => `${r.practice ? `${r.practice.command} ${r.practice.marks}` : 'none'}`).join(' · ')} — ${unreachable.length} practice items reachable only from the Practice tab (${unreachable.join(', ')})`);
}

/* ── NO RECALL SHOWN TWICE INSIDE ONE CHAPTER (structure-05), MEASURED ────── */
/*
 * `structure-05` is that a single-subsection step shows its recall as "immediate" at the bottom of
 * that step and again as "spaced" at the top of the next one, so the widget a student meets twice in
 * a row is the one they have just done. Packet 5 fixed it in `lib/learn-steps.js`: a recall is spaced
 * only onto a check-in belonging to a LATER chapter, and each is spaced at most once.
 *
 * THIS IS THE SHIPPING FUNCTION, CALLED, over this packet's own content — not the comment above it
 * read and believed. `revvylearn-verify-independently`: a check that reuses the implementation's
 * reasoning cannot see its blind spot, so the evidence here is a simulated walk.
 */
{
  const steps = buildSteps(content);
  const walk = (stepList) => {
    const used = new Set();
    const shown = [];
    stepList.forEach((s, i) => {
      if (s.type === 'teach' && s.section?.recall) shown.push({ id: recallId(s.section.recall, s), at: i, block: s.blockIndex, how: 'immediate' });
      if (s.type !== 'checkin') return;
      const picked = pickSpacedRecall(stepList, i, used);
      if (!picked) return;
      used.add(picked.id);
      shown.push({ id: picked.id, at: i, block: s.blockIndex, how: 'spaced', from: picked.fromBlockIndex });
    });
    return shown;
  };
  const shown = walk(steps);
  const teachSteps = steps.filter((s) => s.type === 'teach').length;
  const checkins = steps.filter((s) => s.type === 'checkin').length;
  if (teachSteps !== SUBSECTIONS.length) problems.push(`buildSteps produced ${teachSteps} teach steps against ${SUBSECTIONS.length} subsections`);
  if (checkins !== BLOCKS.length) problems.push(`buildSteps produced ${checkins} check-ins against ${BLOCKS.length} blocks`);
  for (const s of shown.filter((x) => x.how === 'spaced')) {
    if (s.from >= s.block) problems.push(`a recall from chapter ${s.from + 1} is spaced onto chapter ${s.block + 1}'s check-in — that is the same chapter or later, which is structure-05`);
    const twin = shown.find((x) => x.id === s.id && x.how === 'immediate');
    if (twin && twin.block === s.block) problems.push(`recall ${s.id} is shown immediately and spaced inside chapter ${s.block + 1} — one tap apart, which is structure-05`);
  }
  const ids = shown.map((x) => `${x.id}@${x.at}`);
  if (new Set(ids).size !== ids.length) problems.push('a recall is shown twice at the same step');
  const spacedIds = shown.filter((x) => x.how === 'spaced').map((x) => x.id);
  if (new Set(spacedIds).size !== spacedIds.length) problems.push('a recall is used as a spaced recall more than once');
  {
    /*
     * A/B: plant the defect the finding describes — a one-subsection chapter whose recall is eligible
     * for its OWN check-in — and confirm the detector would report it, then confirm the real content
     * clears. The planted case is built by asking `pickSpacedRecall` with the guard's own question
     * rather than by calling it, because the shipping function cannot produce the defect any more;
     * what is under test here is the DETECTOR, not `learn-steps.js`.
     */
    const planted = [{ id: 'x', how: 'immediate', block: 2, at: 4 }, { id: 'x', how: 'spaced', block: 2, at: 5, from: 2 }];
    const caught = planted.filter((s) => s.how === 'spaced' && (s.from >= s.block || planted.some((t) => t.id === s.id && t.how === 'immediate' && t.block === s.block)));
    if (!caught.length) problems.push('the same-chapter recall detector no longer fires on a recall shown immediately and spaced in one chapter');
    const clean = [{ id: 'y', how: 'immediate', block: 0, at: 1 }, { id: 'y', how: 'spaced', block: 3, at: 20, from: 0 }];
    if (clean.filter((s) => s.how === 'spaced' && (s.from >= s.block || clean.some((t) => t.id === s.id && t.how === 'immediate' && t.block === s.block))).length) problems.push('the same-chapter recall detector fires on a recall spaced three chapters later');
  }
  console.log(`\nsteps: ${steps.length} (${teachSteps} teach + ${checkins} check-in) · ${shown.filter((x) => x.how === 'spaced').length} spaced recalls, all from an earlier chapter`);
}

/* ── practice guidance: two paragraphs, and a clean opening ────────────────── */
/*
 * `InlinePractice.jsx:142-158` prints `guidance.split('\n')[0]` above the answer box in GUIDED mode
 * and hides the rest behind "See full guidance". A one-paragraph mark scheme is therefore printed
 * above the empty box asking the student to write it — the defect Ronald found by opening the app.
 * All five live items here have ONE paragraph.
 */
const ALLOCATION = /\(\s*\d+\s*marks?\s*\)|\(\s*\d+\s*\)/;
for (const p of PRACTICE) {
  const paras = String(p.guidance).split('\n').filter((x) => x.trim());
  if (paras.length < 2) problems.push(`practice "${p.question.slice(0, 50)}" has one guidance paragraph — GUIDED mode would print the whole mark scheme above the answer box`);
  if (ALLOCATION.test(paras[0] || '')) problems.push(`practice "${p.question.slice(0, 50)}" allocates marks in its OPENING paragraph, which is the half GUIDED mode shows`);
  if (p.marks > 6 && ALLOCATION.test(p.guidance)) problems.push(`practice "${p.question.slice(0, 50)}" is a ${p.marks}-mark item and its guidance allocates points; tariffs above 6 are not marked that way (\`practice.levels\`)`);
  if (!new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question.trim())) problems.push(`practice "${p.question.slice(0, 50)}" does not end with its own tariff in brackets`);
}
{
  if (!ALLOCATION.test(`Saving is ${bn(162)} (1 mark).`)) problems.push('the practice.opening check no longer fires on a mark allocation');
  if (ALLOCATION.test('Work out what is saved before you start.')) problems.push('the practice.opening check fires on planning advice');
}

/* ══ THE ARITHMETIC SPINE, RE-DERIVED ═════════════════════════════════════ */
/*
 * AND HERE THE IDENTITY IS ITSELF A LEAF. `1b-1` is the line `C + I + G + (X−M) =`, so a section
 * whose components do not add to its own total is failing the thing it teaches. `AD.total` is a SUM
 * and `AD.compose()` rebuilds the whole identity from whichever component moved, so every scenario
 * below is the same function called with a different argument.
 */
const eq = (label, got, want) => { if (got !== want) problems.push(`${label}: got ${got}, expected ${want}`); };
eq('the identity adds to its own total', AD.C + AD.I + AD.G + AD.netTrade, AD.total);
eq('net trade is exports minus imports', AD.netTrade, AD.X - AD.M);
eq('the component shares add to 100', [AD.C, AD.I, AD.G, AD.netTrade].map(AD.shareOf).reduce((a, b) => a + b, 0), 100);
eq('compose() with no argument is the base economy', AD.compose().total, AD.total);
eq('disposable income splits into consumption and saving', AD.C + AD.S, AD.Yd);
eq('the savings ratio is saving over disposable income', AD.ratio, round2((AD.S / AD.Yd) * 100));
for (const r of [AD.ratioDown, AD.ratio, AD.ratioUp]) {
  const c = AD.savingCase(r);
  eq(`savings case ${r}%: saved + spent = Yd`, c.saved + c.spent, AD.Yd);
  eq(`savings case ${r}%: AD rebuilt from the new C`, c.ad.total, c.spent + AD.I + AD.G + AD.netTrade);
}
eq('a higher savings ratio lowers AD', AD.afterSaving.total < AD.total, true);
eq('a lower savings ratio raises AD', AD.savingCase(AD.ratioDown).ad.total > AD.total, true);
eq('net investment is gross minus depreciation', AD.netInvestment(AD.I), AD.I - AD.depreciation);
eq('the weak year has NEGATIVE net investment', AD.netInvestment(AD.grossLow) < 0, true);
{
  const p = AD.project;
  eq('rate of return is the yearly gain over the outlay', p.rateOfReturn, round2((p.yearly / p.cost) * 100));
  eq('the project clears the low interest rate', p.interestCost(p.interestLow) < p.yearly, true);
  eq('the project fails the high interest rate', p.interestCost(p.interestHigh) > p.yearly, true);
  eq('a profit tax lowers the kept return', p.returnAfterTax(p.profitTax) < p.rateOfReturn, true);
  eq('a higher profit tax lowers it further', p.returnAfterTax(p.profitTaxHigh) < p.returnAfterTax(p.profitTax), true);
  eq('cutting the profit tax raises the kept return', p.returnAfterTax(p.profitTaxCut) > p.returnAfterTax(p.profitTax), true);
  /*
   * ONE TAX WORLD (Layer 6, finding 4). The first version divided a PRE-tax $40 by a POST-tax outlay
   * and made relief look better than it is. Every return in 3c is now the KEPT return over what the
   * firm PAYS, so the three cases are comparable — and these assertions are what stop the two coming
   * apart again.
   */
  eq('the kept return is the yearly gain less the profit tax', p.kept, p.keptAt(p.profitTax));
  eq('a subsidy shrinks the outlay', p.costAfterSubsidy, p.cost - p.subsidy);
  eq('the subsidy case uses the KEPT return, not the pre-tax one', p.returnAfterSubsidy, round2((p.kept / p.costAfterSubsidy) * 100));
  eq('a subsidy raises the return above the taxed base case', p.returnAfterSubsidy > p.returnAfterTax(p.profitTax), true);
  eq('relief shrinks the outlay by the tax share', p.costAfterRelief, round2(p.cost * (1 - p.profitTax / 100)));
  eq('the relief case uses the KEPT return too', p.returnAfterRelief, round2((p.kept / p.costAfterRelief) * 100));
  eq('relief is worth more here than the subsidy is', p.reliefWorth > p.subsidy, true);
  eq('so relief raises the return further than this subsidy', p.returnAfterRelief > p.returnAfterSubsidy, true);
  /* THE TWO TOOLS WORK ON DIFFERENT SIDES, which is the chapter's whole point. */
  eq('the subsidy leaves the yearly return untouched', p.yearly, 40);
  eq('the profit tax leaves the outlay untouched', p.cost, 500);
  /*
   * AND THE DECISION RULE AGREES WITH THE WORKED EXAMPLE (Layer 6, finding 3). The section teaches
   * that a project goes ahead when its return BEATS the interest rate, so a tie must not clear. At a
   * 25% profit tax the kept return was exactly 6.0% against a 6% rate and the body said it cleared,
   * which also gave the 8%-return quiz item a second defensible answer.
   */
  eq('the taxed base case STRICTLY beats the low interest rate', p.returnAfterTax(p.profitTax) > p.interestLow, true);
  eq('and is not a tie', p.returnAfterTax(p.profitTax) === p.interestLow, false);
  eq('the high-tax case strictly fails it', p.returnAfterTax(p.profitTaxHigh) < p.interestLow, true);
}
eq('the interest bill is the debt times the rate', AD.interestOnDebt(AD.rateHigh), round2((AD.debt * AD.rateHigh) / 100));
eq('the rise in the interest bill is the difference of the two', AD.interestRise, round2(AD.interestOnDebt(AD.rateHigh) - AD.interestOnDebt(AD.rateLow)));
eq('that rise comes out of consumption', AD.afterInterest.C, AD.C - AD.interestRise);
eq('and AD falls by exactly the same amount', AD.total - AD.afterInterest.total, AD.interestRise);
eq('a fiscal rise moves only G', AD.afterFiscal.G - AD.G, AD.fiscalRise);
eq('and AD rises by exactly that', AD.afterFiscal.total - AD.total, AD.fiscalRise);
eq('a downturn raises G with no decision', AD.afterDownturn.G - AD.G, AD.benefitRise);
eq('extra real income raises imports only', AD.afterIncome.M - AD.M, AD.importsFromIncome);
eq('and exports are untouched', AD.afterIncome.X, AD.X);
eq('so the net trade balance falls by the import rise', AD.netTrade - AD.afterIncome.netTrade, AD.importsFromIncome);
{
  const f = AD.fx;
  eq('more units per dollar is a smaller unit', f.valueOf(f.after) < f.valueOf(f.before), true);
  eq('the depreciation is the fall in what a unit is worth', f.depreciation, round2(((f.valueOf(f.before) - f.valueOf(f.after)) / f.valueOf(f.before)) * 100));
  eq('the quote rise and the currency fall are DIFFERENT numbers', f.depreciation === f.quoteRise, false);
  eq('a depreciation makes exports cheaper abroad', f.exportCostsAbroad(f.after) < f.exportCostsAbroad(f.before), true);
  eq('a depreciation makes imports dearer at home', f.importCostsAtHome(f.after) > f.importCostsAtHome(f.before), true);
}
eq('a tariff raises the home price by its own percentage', AD.tariffPrice(100), round2(100 * (1 + AD.tariff / 100)));
/* The specification's five lists are the right length, so a dropped bullet fails the build. */
eq('components', COMPONENTS.length, 4);
eq('influences on consumption (2a)', CONSUMPTION.length, 6);
eq('influences on investment (3b)', INVESTMENT.length, 5);
eq('policies to promote investment (3c)', INVESTMENT_POLICY.length, 3);
eq('influences on government expenditure (4a)', GOVERNMENT.length, 4);
eq('influences on the net trade balance (5a)', NET_TRADE.length, 5);

/* ── every figure re-derived out of the emitted SVG ───────────────────────── */
/*
 * A figure computed correctly and printed into the wrong `<text>` is the same defect one layer along
 * (packets 19, 23, 25, 29). So the tables are read BACK: every figure the spine produces must be
 * found in the diagram that claims to show it.
 */
const svgOf = (d) => (d.svg ? [{ label: d.title, svg: d.svg }] : d.scenarios);
const textsOf = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)<\/text>/g)].map((m) => {
  const a = m[1];
  const attr = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
  return { body: m[2], x: parseFloat(attr('x')), y: parseFloat(attr('y')), size: parseFloat(attr('font-size')) || 11, anchor: attr('text-anchor') || 'start' };
});
const frameOf = (svg) => { const vb = (svg.match(/viewBox="([^"]+)"/) || [])[1].trim().split(/[\s,]+/).map(Number); return { w: vb[2], h: vb[3] }; };
const bodiesOf = (d, i = 0) => textsOf(svgOf(d)[i].svg).map((t) => t.body);
{
  const need = (d, i, wanted, why) => { const b = bodiesOf(d, i).join(' § '); for (const w of wanted) if (!b.includes(w)) problems.push(`${d.title}: "${w}" is not printed on the diagram (${why})`); };
  /* Chapter 2: the three savings cases, each with its own C, S and AD. */
  const saving = DIAGRAMS[1];
  for (const r of [AD.ratioDown, AD.ratio, AD.ratioUp]) {
    const c = AD.savingCase(r);
    need(saving, 0, [pct(r), bn(c.spent), bn(c.saved), bn(c.ad.total)], 'the table is the leaf: income, the split, and the identity rebuilt');
  }
  /* Chapter 3: gross, depreciation and net, in both directions. */
  need(DIAGRAMS[2], 0, [bn(AD.I), bn(AD.depreciation), bn(AD.netInvestment(AD.I)), bn(AD.grossLow), bn(AD.netInvestment(AD.grossLow))], 'specGap-03: the whole leaf is this subtraction, including the negative case');
  /* Chapter 1: both views of the AD curve carry their own figures. */
  const adc = DIAGRAMS[0];
  const movement = bodiesOf(adc, 0).join(' ');
  if (!/964|1,036/.test(movement)) problems.push(`${adc.title} / movement: neither point is labelled with its output`);
  const shift = bodiesOf(adc, 1).join(' ');
  for (const w of [qty(AD.total), qty(AD.afterFiscal.total)]) if (!shift.includes(w)) problems.push(`${adc.title} / shift: "${w}" is missing, so the shift is drawn and not measured`);
  if (!shift.includes('AD₁') || !shift.includes('AD₂')) problems.push(`${adc.title} / shift: both curves must be labelled — Draw (4) credits the labels`);
}

/* ── nothing drawn outside its canvas: EXTENT, not anchor (packet 25) ──────── */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  for (const tx of textsOf(svg)) {
    if (!tx.body.trim()) continue;
    const w = estWidth(tx.body, tx.size);
    const left = tx.anchor === 'end' ? tx.x - w : tx.anchor === 'middle' ? tx.x - w / 2 : tx.x;
    if (left < -0.5 || left + w > frame.w + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" runs from ${round2(left)} to ${round2(left + w)} in a ${frame.w}-unit frame`);
    if (tx.y < 0 || tx.y > frame.h + 0.5) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 40)}" sits at y=${tx.y} in a ${frame.h}-unit frame`);
  }
}
{
  const probe = (body, x, anchor, frameW) => { const w = estWidth(body, 12); const left = anchor === 'end' ? x - w : anchor === 'middle' ? x - w / 2 : x; return left < -0.5 || left + w > frameW + 0.5; };
  if (!probe('a label with a great many more words than will fit', 330, 'start', 440)) problems.push('the canvas-extent check no longer fires on a label that overruns its frame');
  if (probe('AD₂', 100, 'start', 440)) problems.push('the canvas-extent check fires on a label that fits');
}

/* ── no two strings overlap: glyph BOXES, with a vertical tolerance ────────── */
/*
 * Grouping `<text>` by exact rounded y compares table cells and nothing else: on packet 29 it
 * reported zero while twelve of nineteen scenarios collided. Two strings one unit apart vertically
 * overlap on screen exactly as much as two on one line, so the comparison is between BOXES. This
 * check found seven real collisions while the AD curve was being drawn, and the fix went into the
 * LAYOUT rather than into the check.
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
  const hit = (a, b) => { const A = boxOf(a), B = boxOf(b); return Math.min(A.right, B.right) - Math.max(A.left, B.left) > 0.5 && Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top) > 0.5; };
  const one = { body: 'so the economy slides down its own curve', x: 20, y: 58, size: 12, anchor: 'start' };
  const near = { body: 'Price level', x: 58, y: 62, size: 12, anchor: 'start' };
  const far = { body: 'Price level', x: 58, y: 90, size: 12, anchor: 'start' };
  if (!hit(one, near)) problems.push('the collision check no longer fires on two strings four units apart vertically');
  if (hit(one, far)) problems.push('the collision check fires on two strings a clear line apart');
}

/* ══ A LABEL MAY NOT BE STRUCK THROUGH BY AN AXIS (Verify B, this packet) ══ */
/*
 * FOUND BY LOOKING AT THE SCREEN, AFTER EVERY OTHER DIAGRAM CHECK HAD PASSED. The movement view's
 * point label read "964 at 106", end-anchored to the left of its point — and the price-level axis
 * was drawn straight through the first digit, with the label's tail running out into the left
 * margin beyond `PLOT.x0`.
 *
 * NEITHER EXISTING CHECK COULD SEE IT, and the reason is the programme's own rule about what a check
 * faces. The extent check measures a label against the FRAME, and 36.8 to 129.2 is comfortably
 * inside a 440-unit frame. The collision check compares a text box with another TEXT box, and there
 * is no text there — there is a LINE. Packet 29's Verify B found the same class on its third round
 * ("a label struck through by its own guide line") and the fix went into the layout without a guard
 * following it; this is that guard.
 *
 * AND IT COVERS EVERY LINE, DASHED ONES INCLUDED \u2014 which it did not on its first draft. I wrote it
 * for solid axis lines only, on the reasoning that a dashed guide is faint and a label beside one is
 * still readable. Verify B then found `AD\u2081` in the shift view with the 1,040 GUIDE drawn through it,
 * which is packet 29's round-three finding word for word: "a label struck through by its own guide
 * line". The first version of this check excluded the exact case its own precedent names. Every
 * `<line>` counts, and the layout moved the curve labels to the top end where no guide reaches.
 */
{
  const linesOf = (svg) => [...svg.matchAll(/<line\b([^>]*)\/>/g)].map((m) => {
    const a = m[1];
    const at = (k) => { const r = a.match(new RegExp(`${k}="([^"]*)"`)); return r ? r[1] : null; };
    return { x1: +at('x1'), y1: +at('y1'), x2: +at('x2'), y2: +at('y2'), stroke: String(at('stroke') || '').toLowerCase(), w: +(at('stroke-width') || 1), dashed: /stroke-dasharray/.test(a) };
  });
  /*
   * SEGMENT AGAINST RECTANGLE, NOT BOUNDING BOX AGAINST BOUNDING BOX \u2014 and the difference is the
   * whole check. Compared by bounding box, the AD curve is a diagonal running corner to corner, so
   * its box covers most of the chart and EVERY label inside the plot reads as struck through: the
   * first run reported six, all of them false. What the student sees is whether the drawn segment
   * passes through the glyph box, which is Liang\u2013Barsky clipping against the box inflated by half
   * the stroke. A vertical guide through a label still fires; a diagonal passing well above it does
   * not.
   */
  const strikes = (box, l) => {
    const pad = l.w / 2 + 0.5;
    const x0 = box.left - pad, x1 = box.right + pad, y0 = box.top - pad, y1 = box.bottom + pad;
    const dx = l.x2 - l.x1, dy = l.y2 - l.y1;
    let t0 = 0, t1 = 1;
    for (const [p2, q] of [[-dx, l.x1 - x0], [dx, x1 - l.x1], [-dy, l.y1 - y0], [dy, y1 - l.y1]]) {
      if (p2 === 0) { if (q < 0) return false; continue; }
      const r = q / p2;
      if (p2 < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; }
    }
    return t1 - t0 > 0.001;
  };
  for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
    const lines = linesOf(svg);
    if (!lines.length) continue;
    for (const tx of textsOf(svg)) {
      if (!tx.body.trim()) continue;
      const box = boxOf(tx);
      for (const l of lines) if (strikes(box, l)) problems.push(`${d.title} / ${label}: "${tx.body.slice(0, 32)}" is struck through by an axis line at ${round2(l.x1)},${round2(l.y1)}-${round2(l.x2)},${round2(l.y2)} — inside the frame, and unreadable on the phone`);
    }
  }
  {
    /*
     * A/B AGAINST THE REAL DEFECT, NOT A PLANTED ONE. The first pair is the label exactly where it
     * was when Verify B found it: end-anchored at px(964) − 8 = 129.24, running back to 36.84, with
     * the price-level axis at x = 62. The second is where it is now.
     */
    const axis = { x1: 62, y1: 84, x2: 62, y2: 246, stroke: AXIS_HEX.toLowerCase(), w: 1.5 };
    const wasStruck = boxOf({ body: '964 at 106', x: 129.24, y: 134.5, size: 12, anchor: 'end' });
    const nowPlaced = boxOf({ body: '964 at 106', x: 145.24, y: 120.5, size: 12, anchor: 'start' });
    if (!strikes(wasStruck, axis)) problems.push('the struck-through check no longer fires on the label Verify B found crossing the price-level axis');
    if (strikes(nowPlaced, axis)) problems.push('the struck-through check fires on the label in its corrected position, to the right of its point');
    /* The SECOND instance, which the first draft of this check could not see: a dashed guide. */
    const guide = { x1: 267.2, y1: 169.25, x2: 267.2, y2: 246, stroke: '#7a8299', w: 1 };
    const oldAd1 = boxOf({ body: 'AD\u2081', x: 293.4, y: 237.2, size: 13, anchor: 'end' });
    const newAd1 = boxOf({ body: 'AD\u2081', x: 104.2, y: 96.8, size: 13, anchor: 'start' });
    if (!strikes(oldAd1, guide)) problems.push('the struck-through check does not fire on AD\u2081 where the 1,040 guide line was drawn through it \u2014 this is the case the first draft of this check excluded');
    if (strikes(newAd1, guide)) problems.push('the struck-through check fires on AD\u2081 at the top of its curve, where no guide reaches');
    const belowAxis = boxOf({ body: 'Real output', x: 414, y: 266, size: 12, anchor: 'end' });
    if (strikes(belowAxis, { x1: 62, y1: 246, x2: 414, y2: 246, stroke: AXIS_HEX.toLowerCase(), w: 1.5 })) problems.push('the struck-through check fires on an axis label sitting clear beneath its own axis');
  }
}

/* ── the smallest face, against the 313px a phone gives a diagram ─────────── */
for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
  const frame = frameOf(svg);
  const floor = d.kind === 'table' ? 10 : MIN_FACE;
  const worst = Math.min(...textsOf(svg).filter((t) => t.body.trim()).map((t) => t.size));
  if (worst < floor) problems.push(`${d.title} / ${label}: smallest face is ${worst} units against a floor of ${floor} — ${round2((worst * 313) / frame.w)}px on the 313px a phone gives a diagram`);
  if (frame.w > 440) problems.push(`${d.title} / ${label}: a ${frame.w}-unit frame renders every face at ${round2(440 / frame.w)}× the size a 440-unit frame would (packet 30's Verify B measured 313 rendered px)`);
}
/*
 * EVERY DECLARED TABLE'S SMALLEST FACE, AGAINST THE COLUMN THE VALIDATOR ACTUALLY USES — READ OUT
 * OF THE VALIDATOR RATHER THAN TYPED HERE. That number changed underneath this packet while it was
 * being written: packet 2.6 landed on 18 September, gave a declared table the whole reading column,
 * and moved `diagram.table-legible` from 530px to 620px. A runner carrying its own copy of 530 would
 * now be checking a column that no longer exists and reporting green for the wrong reason — packet
 * 25's rule, that the thing which lays out and the thing which checks must share ONE bound, applied
 * to a bound owned by another file. Parsed, so the next session that moves it moves this too.
 */
{
  const vsrc = readFileSync('lib/content-validator.mjs', 'utf8');
  const m = vsrc.match(/const scale = (\d{3}) \/ vbW;/);
  if (!m) problems.push('could not read the laptop column out of lib/content-validator.mjs — this check is now measuring a number nobody owns');
  const COLUMN = m ? Number(m[1]) : 620;
  for (const d of DIAGRAMS.filter((x) => x.kind === 'table')) for (const { label, svg } of svgOf(d)) {
    const frame = frameOf(svg);
    const worst = Math.min(...textsOf(svg).map((t) => t.size));
    const px = round2((worst * COLUMN) / frame.w);
    if (px < 12) problems.push(`${d.title} / ${label}: smallest face is ${worst} units, ${px}px in the ${COLUMN}px column a 1024-wide laptop gives it (\`diagram.table-legible\` floor is 12)`);
  }
  if (COLUMN !== 620) console.log(`NOTE: the laptop column is now ${COLUMN}px, not the 620 this packet was measured against — re-read diagram.table-legible.`);
}
for (const d of DIAGRAMS) {
  if (d.kind === 'table' && Array.isArray(d.checklist) && d.checklist.length) problems.push(`${d.title} declares kind:"table" AND carries a checklist — "what a correct diagram shows" reads as an instruction to reproduce a lookup table (\`diagram.table-checklist\`)`);
  if (d.kind !== 'table' && !(Array.isArray(d.checklist) && d.checklist.length)) problems.push(`${d.title} is a drawn diagram with no checklist, and this section carries a Draw (4) question`);
}

/* ══ EVERY COLOUR A DIAGRAM EMITS MUST BE ONE processSvg.js KNOWS (structure-09) ══ */
/*
 * `structure-09` — "diagram SVGs hard-code light text (#e8ecf5) with a transparent background:
 * legible only on a dark theme" — was closed on 12 September in the RENDERER, not in the content:
 * `components/learn-mode/processSvg.js` remaps eighteen baked literals onto `--dg-*` tokens at render
 * time, so dark mode is unchanged and light mode repaints on a theme toggle.
 *
 * That makes the palette an OBLIGATION rather than a freedom. A literal the remapper does not know
 * about is not remapped, so it stays light text on a light page — the exact defect, reintroduced by a
 * content packet choosing a pleasant new colour. The list is PARSED out of the component rather than
 * re-typed here, so the thing that remaps and the thing that checks cannot drift apart (packet 25's
 * rule: make the layout and the guard share one bound).
 *
 * White is allowed and is the one exception the component documents: it is used for letters inside
 * filled circles, which darken in light mode, so its contrast improves on its own.
 */
{
  const src = readFileSync('components/learn-mode/processSvg.js', 'utf8');
  const PALETTE = new Set([...src.matchAll(/'(#[0-9a-f]{6})':\s*'--dg-/g)].map((m) => m[1]));
  if (PALETTE.size < 10) problems.push(`only ${PALETTE.size} literals parsed out of processSvg.js — the parse has broken and this check is now decorative`);
  const WHITE = new Set(['#fff', '#ffffff']);
  for (const d of DIAGRAMS) for (const { label, svg } of svgOf(d)) {
    for (const m of svg.matchAll(/(?:fill|stroke|stop-color)="(#[0-9a-fA-F]{3,6})"/g)) {
      const hex = m[1].toLowerCase();
      if (WHITE.has(hex) || PALETTE.has(hex)) continue;
      problems.push(`${d.title} / ${label}: the colour ${hex} is not in processSvg.js's PALETTE, so it is NOT remapped and stays a dark-mode colour on a light page (structure-09)`);
    }
  }
  {
    /* A/B: a colour outside the map must fire, and every colour this section uses must not. */
    const known = (hex) => WHITE.has(hex) || PALETTE.has(hex);
    if (known('#ff7ac6')) problems.push('the palette check no longer fires on a colour processSvg.js does not remap');
    if (!known('#e8ecf5')) problems.push('the palette check fires on #e8ecf5, which is the first entry of the map it just parsed');
    if (!known('#ffffff')) problems.push('the palette check fires on white, which the component documents as deliberately unmapped');
  }
}

/* ══ NOTHING BUT THE SHIPPED SHAPE REACHES THE DATABASE ═══════════════════ */
/*
 * THE CONTRACT IS READ OFF A BUNDLE SOMEBODY ELSE SHIPPED, NOT TYPED HERE. Packet 28's bundle is on
 * disk, went through its own gate and is live-shaped, so it is a control I did not construct
 * (packet 29's rule). Any key this packet's rows carry that packet 28's do not is authoring
 * scaffolding that has escaped `strip` — which is exactly what `lead` did until Verify A read the
 * staged bundle rather than the code that wrote it.
 */
{
  try {
    const ref = JSON.parse(readFileSync('audit/snapshots/packet-28-bundle__economics__revenue-costs-profits.json', 'utf8')).tables;
    for (const [table, mine, theirs] of [['quiz', bundle.quiz, ref.quiz], ['practice', bundle.practice, ref.practice]]) {
      const allowed = new Set(theirs.flatMap((r) => Object.keys(r)));
      const extra = [...new Set(mine.flatMap((r) => Object.keys(r)))].filter((k) => !allowed.has(k));
      if (extra.length) problems.push(`${table} rows carry ${extra.map((k) => `\`${k}\``).join(', ')}, which packet 28's shipped bundle does not — authoring scaffolding that escaped strip() and would sit in the database for ever`);
      const missing = [...allowed].filter((k) => mine.some((r) => !(k in r)));
      if (missing.length) problems.push(`${table} rows are missing ${missing.join(', ')}, which packet 28's shipped bundle carries`);
    }
    /* A/B: the field Verify A found must fire, and a well-formed row must not. */
    const allowed = new Set(ref.quiz.flatMap((r) => Object.keys(r)));
    if (!Object.keys({ ...ref.quiz[0], lead: true }).some((k) => !allowed.has(k))) problems.push('the shipped-shape check no longer fires on a stray `lead` key');
    if (Object.keys(ref.quiz[0]).some((k) => !allowed.has(k))) problems.push('the shipped-shape check fires on packet 28’s own rows, which are the control');
  } catch (e) { problems.push(`could not read packet 28's bundle to check the shipped shape: ${e.message}`); }
}

/* ── ids, signs, currency, years and places ───────────────────────────────── */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(SUBSECTIONS.map((s) => s.id), SUBSECTIONS.filter((s) => s.recall).map((s) => s.recall.id), content.map((b) => b.id));
const dupIds = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dupIds.length) problems.push(`duplicate ids: ${[...new Set(dupIds)].join(', ')}`);
{
  const ascii = prose.filter((s) => /\s-\d|\(-\d|=\s?-\d/.test(s));
  if (ascii.length) problems.push(`${ascii.length} strings use an ASCII hyphen as a minus sign: "${ascii[0].slice(0, 70)}"`);
}
{
  const other = readable.filter((s) => /[£€₹¥]/.test(s));
  if (other.length) problems.push(`${other.length} strings carry a currency other than dollars: "${other[0].slice(0, 70)}"`);
}
/*
 * `structure-07` MEASURES 11 OF 14 LIVE EXAMPLES UK-CENTRIC and `quiz-02` records an item answerable
 * only by knowing that Jobseeker's Allowance is a UK unemployment benefit and the NHS a health
 * service. This cohort sits WEC12 in Hong Kong, Malaysia, Pakistan, Sri Lanka and the Gulf.
 */
ban(/\bNHS\b|\bJobseeker|\bBank of England\b|\bHMRC\b|\bOBR\b|\bfurlough\b|\bBrexit\b|\bcouncil tax\b|\bthe pound\b|\bsterling\b|\bBudget Responsibility\b/gi, 'a UK-only institution, policy or currency — quiz-02 and structure-07 are exactly this, for an audience sitting WEC12 in Hong Kong, Malaysia, Pakistan and the Gulf');
{
  /* A dated claim about a real economy cannot be corroborated, and a four-digit year is its signature. */
  const years = prose.filter((s) => /\b(?:19|20)\d{2}\b/.test(s));
  if (years.length) problems.push(`${years.length} strings carry a year, which is the signature of a dated claim (accuracy-02 and accuracy-03 are both dated claims that turned out to be wrong): "${years[0].slice(0, 80)}"`);
}

/* ══ COVERAGE, MAPPED BY HAND (V025) ══════════════════════════════════════ */
/*
 * Coverage matches by SUBSTRING and this topic's leaves include `interest rates`, `subsidies` and
 * `real income`, so a high percentage and a missing leaf are both true at once. Every one of the 31
 * is mapped here to the subsection that teaches it; the runner refuses if a mapping names a
 * subsection that does not exist or if a leaf is unmapped.
 */
const LEAF_MAP = {
  /* 1 The characteristics of AD */
  '1a': 'what-aggregate-demand-is',
  '1b-1': 'the-four-components', '1b-2': 'the-ad-curve',
  '1c': 'movement-or-shift',
  /* 2 Consumption */
  '2a-1': 'disposable-income', '2a-2': 'interest-rates-and-consumption', '2a-3': 'consumer-confidence',
  '2a-4': 'welfare-payments', '2a-5': 'wealth-effects', '2a-6': 'availability-of-credit',
  '2b': 'saving-and-consumption', '2c': 'the-savings-ratio', '2d': 'changes-in-the-savings-ratio',
  /* 3 Investment */
  '3a': 'gross-and-net-investment',
  '3b-1': 'the-rate-of-economic-growth', '3b-2': 'interest-rates-and-investment',
  '3b-3': 'business-confidence-and-expectations', '3b-4': 'availability-of-credit-for-firms',
  '3b-5': 'tax-on-company-profits',
  '3c-1': 'tax-relief-and-subsidies', '3c-2': 'tax-relief-and-subsidies', '3c-3': 'lower-corporation-tax',
  /* 4 Government expenditure */
  '4a-1': 'fiscal-policy', '4a-2': 'the-level-of-economic-activity',
  '4a-3': 'correction-of-market-failures', '4a-4': 'political-priorities',
  /* 5 Net trade balance */
  '5a-1': 'real-income-and-imports', '5a-2': 'the-exchange-rate', '5a-3': 'the-state-of-the-global-economy',
  '5a-4': 'degree-of-protectionism', '5a-5': 'non-price-factors',
};
{
  const slugs = new Set(SUBSECTIONS.map((s) => s.id.replace(`${SECTION}:sub:`, '')));
  for (const [leaf, slug] of Object.entries(LEAF_MAP)) if (!slugs.has(slug)) problems.push(`LEAF_MAP sends ${leaf} to "${slug}", which is not a subsection of this section`);
  const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8'));
  const all = Array.isArray(oracle) ? oracle : oracle.items || oracle.rows;
  const rows = all.filter((r) => String(r.id || '').startsWith('ECON-2.3.2-'));
  const idsAll = new Set(rows.map((r) => r.id));
  const leaves = rows.filter((r) => ![...idsAll].some((other) => other !== r.id && other.startsWith(`${r.id}-`)));
  const unmapped = leaves.map((r) => r.id.replace('ECON-2.3.2-', '')).filter((k) => !LEAF_MAP[k]);
  if (unmapped.length) problems.push(`${unmapped.length} specification leaves are not in LEAF_MAP: ${unmapped.join(', ')}`);
  const stale = Object.keys(LEAF_MAP).filter((k) => !leaves.some((r) => r.id === `ECON-2.3.2-${k}`));
  if (stale.length) problems.push(`LEAF_MAP names leaves the oracle does not have: ${stale.join(', ')} — a renumbered leaf silently forgives the one it used to name (packet 3.1)`);
  const unusedSubs = [...slugs].filter((s) => !Object.values(LEAF_MAP).includes(s));
  if (unusedSubs.length) problems.push(`subsection(s) teaching no mapped leaf: ${unusedSubs.join(', ')} — in a section this size that is the multiplier block coming back`);
  /*
   * THE MULTIPLIER IS 2.3.4's AND THE ORACLE SAYS SO. Asserted here so that a later packet obeying
   * `topFix-01` — which asks for "The Multiplier Effect" to be pinned to block 4 — cannot quietly
   * reinstate it without this check disagreeing.
   */
  const neighbour = all.filter((r) => String(r.id || '').startsWith('ECON-2.3.4-'));
  if (!neighbour.some((r) => /multiplier/i.test(r.wording || ''))) problems.push('2.3.4 no longer carries the multiplier in the oracle — re-read both spans before leaving it out of this section');
  if (rows.some((r) => /multiplier|accelerator/i.test(r.wording || ''))) problems.push('2.3.2 now carries a multiplier or accelerator row — re-read the span, because this section was built without either');
  console.log(`leaves: ${leaves.length} substantive, ${Object.keys(LEAF_MAP).length} mapped by hand to ${new Set(Object.values(LEAF_MAP)).size} subsections`);
}

/* ══ the validator, and the baseline ══════════════════════════════════════ */
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

console.log(`\n${SECTION} — packet 32`);
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

console.log('\npacket checks: no accelerator (0 hits in econ_spec.txt), no animal spirits (0), no automatic stabilisers (Unit 4), no marginal propensity (2.3.4 · 4b) — the multiplier named exactly once, handed to 2.3.4 · no Assess, no Outline, no 10- or 12-mark tariff · every practice tariff in the ECONOMICS census, all eight command words exactly once, every Appendix 6 gloss sharing vocabulary with the census and carrying the property that defines its command word · every subsection inside the 350-word budget · a recall on all 30 subsections, the fill-in contract enforced before the validator sees it, no hint a prefix of its answer, the answer-recoverable check at V029\'s thresholds with a REAL subsection as its negative control, and the forward-reference check over the specification\'s own five lists · no quiz stem near-duplicates another, no explanation names an option by position, nothing quizzed that is not taught, the key dealt by hash · every block pinned to a quiz, a practice item and a diagram by diagramId, pins DERIVED from each item\'s block tag, five blocks re-measured against FREE_QUIZ_MAX rather than inherited · the spaced recall measured by RUNNING buildSteps and pickSpacedRecall: 4 spaced, none inside its own chapter · the whole identity re-derived, shares adding to 100, every scenario rebuilt by compose(), the depreciation measured as the fall in what a unit is worth rather than the rise in the quote · every table figure found BACK in the emitted SVG · text EXTENT inside every canvas · glyph-BOX collisions with a vertical tolerance · no label struck through by an axis line, A/B\'d against the position Verify B found · every declared table measured against the laptop column PARSED out of content-validator.mjs (620px since packet 2.6), all four at 14.09px against a 12px floor · every emitted colour checked against the PALETTE parsed out of processSvg.js · nothing but the shipped shape in the bundle, checked against packet 28\'s live-shaped rows · ids unique · one currency, one minus sign, no year, no UK institution');

if (DUMP) {
  const path = `audit/snapshots/packet-32-bundle__economics__${SECTION}.json`;
  writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-32-bundle', tables: bundle }, null, 1) + '\n');
  console.log(`\nbundle written to ${path}`);
}
if (STAGE) {
  const res = await stageBundle(SECTION, bundle);
  console.log(`\nstaged to draft: ${JSON.stringify(res)}`);
}
