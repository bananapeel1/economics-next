#!/usr/bin/env node
/**
 * PACKET 25 — market-failure, IAL Economics Unit 1 topic 1.3.5 (35 spec leaves — three times
 * packet 24's, and the largest content section in the programme so far).
 *
 *   node scripts/packet-25-market-failure.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-25-market-failure.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-25-market-failure.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet25-content.mjs (blocks and Notes), scripts/_packet25-assessment.mjs
 * (quiz, practice, flashcards, mistakes, extras) and scripts/_packet25-diagrams.mjs (eight diagrams,
 * where the section had four and a student could reach two). This file assembles the bundle, pins
 * each block to its diagram, quiz and practice items, and runs the checks a verifier will run.
 *
 * FOUR CHECKS CARRIED FROM PACKET 24, unchanged in substance:
 *   - PIN OWNERSHIP. A block's lead check-in question must belong to that block AND must not be one
 *     of the three the pre-test draws. `pins.reuse` only looks across blocks and a position check
 *     only looks at position, so packet 24 pinned a pre-test question as a check-in item and nothing
 *     in the repository saw it.
 *   - CANVAS BOUNDS. Every <line>, <circle>, <text>, <rect> and <polygon> against its own viewBox,
 *     after packet 23 drew a marker at y = −42.86 off the top of a frame. It earned its place here
 *     immediately: four of this section's own drawn scenarios had captions running below the frame,
 *     because the height was a constant and the caption wraps.
 *   - THE LENGTH-AWARE TABLE WIDTH GUARD. Packet 24 measured all 92 strings in its tables with
 *     getComputedTextLength(): four characters or more reach 0.601em, a lone character 0.874em. The
 *     bound is 0.9 below four characters and 0.7 at or above.
 *   - THE GUIDED OPENING. `practice.opening` is new since packet 24 and fires on 160 items across
 *     the repository. None of them is in this section, and this refuses a one-paragraph guidance, an
 *     opening that allocates marks and an opening containing a worked calculation.
 *
 * AND ONE THIS PACKET ADDS, because the table guard above is a DETECTOR and detectors are cheaper
 * than they look: _packet25-diagrams.mjs now COMPUTES its column positions from the widest cell in
 * each column and THROWS when a table does not fit, so a collision cannot be built. The guard below
 * is kept anyway — a check that agrees with the construction is still worth having, because it will
 * outlive any future edit that goes back to hand-picked columns. The independent measurement, which
 * neither of them is, is the browser one in Verify B.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, qty, round2, valueAt, meet, KUMBE, AMARA } from './_packet25-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7, B8 } from './_packet25-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet25-assessment.mjs';
import { DIAGRAMS, estWidth } from './_packet25-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const BLOCKS = [B1, B2, B3, B4, B5, B6, B7, B8];
const K = KUMBE, A = AMARA;

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
  [B1]: first(quizByBlock[B1], 'NOT one of the five sources'),
  [B2]: first(quizByBlock[B2], 'Social cost is equal to'),
  [B3]: first(quizByBlock[B3], 'the welfare loss from the external cost of production is'),
  [B4]: first(quizByBlock[B4], 'discharges waste into a river'),
  [B5]: first(quizByBlock[B5], 'The free-rider problem arises because'),
  [B6]: first(quizByBlock[B6], 'information that is'),
  [B7]: first(quizByBlock[B7], 'Moral hazard occurs when'),
  [B8]: first(quizByBlock[B8], 'A market bubble is best described'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why the March `diagramRef` string "Deadweight
 * Loss" rendered nothing at all (structure-03): it was matched by substring against four titles it
 * shares no words with, and no diagram of that name existed anywhere in the section. Every chapter
 * has one here, pinned by id.
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
 * OFF-SPEC VOCABULARY, each with the count that settles it. Eighth instance of the
 * packet 13/16/17/18/22/23/24 rule, and the worst case yet: the March section gave TWO of its seven
 * blocks to vocabulary that is zero in econ_spec.txt, and a third to a phrase that is zero.
 */
ban(/\bmerit goods?\b|\bdemerit goods?\b/gi, 'merit or demerit goods (0 each in econ_spec.txt, and both named `terms.off-spec` phrases — the March section gave them a whole block)');
ban(/\bdead[- ]?weight\b/gi, '"deadweight" (0 in econ_spec.txt; a named `terms.off-spec` phrase. The March section had THREE subsections of it and topFix-04 asks to MERGE them — 2d\'s own words are "welfare loss or gain areas")');
ban(/\bmarket power\b/gi, '"market power" (0 in econ_spec.txt — the March section made it a block and it is not one of 1b\'s five sources)');
ban(/\bmonopol(y|ies|ist|istic)\b/gi, 'monopoly (econ_spec.txt:1424, topic 3.3.6 — Unit 3, not a source of market failure in 1.3.5)');
ban(/\ballocativ(e|ely)\b/gi, '"allocative efficiency" (econ_spec.txt:1364, topic 3.3.3 — Unit 3; packet 24 removed it for the same reason)');
ban(/\badverse selection\b/gi, '"adverse selection" (0 in econ_spec.txt — specGap-06 is right about this half and wrong about moral hazard, which is 1.3.5 · 5)');
ban(/\bquasi[- ]public\b|\bcommon resources?\b|\bcommon[- ]access\b/gi, 'quasi-public goods or common resources (0 each in econ_spec.txt; 3a is exactly two lines, and topFix-04 asks for content the spec does not contain)');
ban(/\btragedy of the commons\b/gi, '"the tragedy of the commons" (0 in econ_spec.txt)');
ban(/\binformation failures?\b/gi, '"information failure" (0 in econ_spec.txt — it was a BLOCK TITLE and a subsection title in the March section; the spec says "imperfect market information" and "information gaps")');
ban(/\bspill[- ]?overs?\b/gi, '"spillover" (0 in econ_spec.txt — the spec\'s apparatus for an externality is private/external/social at 2a and 2b)');
ban(/\bPigou(vian)?\b/gi, 'a Pigouvian tax (0 in econ_spec.txt)');
ban(/\binternalis|internaliz/gi, '"internalise" (0 in econ_spec.txt)');
ban(/\bmissing markets?\b/gi, '"missing market" (0 in econ_spec.txt)');
/*
 * ANOTHER SECTION'S VOCABULARY. Government intervention is 1.3.6 (:824) — packet 26's section — and
 * property rights are :811 in the same topic. `herding` is 1.3.2 · 1b (:584) and packet 17 already
 * teaches it in `consumer-behaviour-demand`, so using it here would duplicate that section.
 */
ban(/\bgovernment failure\b/gi, '"government failure" (econ_spec.txt:824, topic 1.3.6 — packet 26\'s section)');
ban(/\bproperty rights?\b/gi, '"property rights" (econ_spec.txt:811, topic 1.3.6 — packet 26\'s section)');
ban(/\bherding\b/gi, '"herding" (econ_spec.txt:584, topic 1.3.2 · 1b — already taught by packet 17 in `consumer-behaviour-demand`)');
/*
 * AND THE ONE THAT IS NOT BANNED, recorded here so nobody bans it later. `social cost` greps 0 in
 * econ_spec.txt and IS the specification's own phrase: :739-740 reads "private costs, external costs
 * and social / costs" — the phrase wraps the line. So does "social benefits" at :736-737. A grep
 * that returns zero is evidence about the grep as well as about the text.
 */

ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the March practice[4] used it)');
ban(/\bAssess\b/g, '"Assess" (not an IAL ECONOMICS command word at any tariff)');
ban(/\b10.mark|\(10 marks\)/g, 'a 10-mark item (Economics has no 10-mark tariff)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|Universal Credit|the Chancellor|Office for National Statistics|Trinity House|General Lighthouse Fund|light dues)\b/g, 'a UK-only institution (locale.institution; accuracy-02 was a Trinity House and light-dues claim)');
ban(/\b(ONS|OBR|DWP|CAP)\b/g, 'a UK-only or EU-only acronym (locale.institution)');
ban(/\b(the UK|United Kingdom|Britain|British|London|England|English)\b/g, 'a UK framing (an international cohort sits WEC11 in Hong Kong, Singapore, Malaysia, Pakistan, the Gulf, Nigeria and Kenya)');
ban(/\blighthouse\b/gi, 'the lighthouse example (accuracy-02: the March version was wrong about who paid for lighthouses, and a corrected version is a dated claim about a real market — removed, not fixed)');

/*
 * AN INTERNAL LEDGER ID IN TEXT A STUDENT READS. Packet 19's Layer 6 found one inside a paragraph and
 * its runner banned the PARENTHESISED form, `(specGap-03)`. Copied here unchanged, that ban missed
 * five bare ones in this section's own diagram notes — `accuracy-01`, `specThin-01` and three more,
 * printed under a table a student is looking at. The parentheses were never the thing that made it
 * wrong, so the shape banned here is the id itself.
 */
ban(/\b(?:specGap|topFix|structure|accuracy|specThin)-\d+\b/g, 'an internal ledger id left in text a student reads (packet 19\'s Layer 6 finding, widened: the bare form is as visible as the bracketed one)');
ban(/\((?:quiz|practice|diagram)-\d+\)/g, 'an internal ledger id left in text a student reads');
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — where a student reads it');
/*
 * A NOTE ABOUT OUR OWN PREVIOUS CONTENT, in text a student reads. Packet 24's version required the
 * word "this" in front of "section", so it missed "**The** section used to say …" — which Layer 6
 * found sitting in a misconception card, where a student reads it as if it were about economics. The
 * determiner was never the thing that made it wrong.
 */
ban(/\b(the|this) (March |previous |old )?(version|section|copy|item|content|bank|quiz) (used to|previously|once) \b|\bthe March (version|section|copy|item|content|bank|quiz)\b|\bin the previous version\b|\bused to say\b|\bthe section\'s own (quiz|notes|body|card)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');

/*
 * NO DATED CLAIM ABOUT A REAL MARKET. accuracy-01 and accuracy-02 were both claims this repository
 * could not check, and the second used the canonical counterexample to private provision as if it
 * supported the opposite. They are removed rather than corrected, and this refuses their shape: a
 * four-digit year anywhere in text a student reads.
 */
for (const s of prose) for (const sent of String(s).split(/(?<=[.!?])\s+/)) if (/\b(19|20)\d{2}\b/.test(sent)) problems.push(`a dated claim about a real market: "${sent.trim().slice(0, 90)}"`);

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert exactly the same thing
 * without naming them — "that earns half the marks", "scores poorly" — and pass the validator
 * untouched (packet 16). accuracy-04 is one of these in reverse: the March section told students
 * examiners PENALISE a particular diagram, which is a claim about marking twice over. Say what the
 * COMMAND WORD requires, which Appendix 6 states and which can therefore be cited.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b|\blevels?-marked\b|\bKAA\b|\bmark schemes? (?:accept|allow|list|credit)\b/i;
/*
 * A POINT ALLOCATION IS NOT A CLAIM ABOUT A MARKER, and this check could not tell them apart.
 * Packet 24's version ran clean only because none of its mark schemes happened to put the word
 * "cost", "earn" or "lose" within sixty characters of a "(1 mark)". This topic is about costs, so
 * four legitimate mark-scheme lines fired it — "so that cost alone is what the supply curve is built
 * from (1 mark)". The allocation shape is stripped before the sentence is tested; what the rule is
 * actually for ("that earns half the marks", "scores poorly", "mark schemes accept") is untouched,
 * and the A/B below proves it rather than asserting it.
 */
const withoutAllocations = (sent) => sent.replace(/\(\s*\d+\s*marks?\s*\)/gi, '');
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(withoutAllocations(sent))) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`);
/*
 * A/B, run every time rather than recorded once (packet 21: a guard written for one defect read green
 * because nothing ever disagreed with it). Each planted sentence must still fire, and the mark-scheme
 * line beside them must not. If this block ever reports a failure, the narrowing above has gone too far.
 */
{
  const mustFire = [
    'A chain that stops at the diagram earns half the marks (3 marks) available.',
    'An answer without a diagram scores poorly.',
    'Mark schemes accept an external-cost diagram here.',
    'Naming the curve costs you a mark (1 mark) if you get it wrong.',
  ];
  const mustNotFire = [
    'The producer pays only the private cost, so that cost alone is what the supply curve is built from (1 mark).',
    'Social cost is private cost plus external cost (1 mark).',
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
 * answer. `InlinePractice.jsx` in GUIDED mode prints `guidance.split('\n')[0]` above the answer box
 * as "the opening" and hides the rest behind "See full guidance"; `getPracticeMode` puts every item
 * except the first and last of a section into that mode (LearnModeTab.jsx:249-256).
 */
for (const x of PRACTICE) {
  const paras = String(x.guidance).split('\n').filter(Boolean);
  if (paras.length < 2) problems.push(`practice ${x.command}: one-paragraph guidance, so guided mode prints the whole mark scheme above the answer box`);
  const opening = paras[0] || '';
  if (/\(\s*\d+\s*marks?\s*\)/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph allocates marks, and it is shown BEFORE the student writes`);
  if (/=/.test(opening)) problems.push(`practice ${x.command}: the opening paragraph contains a worked calculation, and it is shown BEFORE the student writes`);
}
/*
 * THE BANK-LEVEL GAP, kept as a check rather than as a memory. THREE of this topic's six sub-topics
 * had no practice item at all in the March bank — imperfect market information, moral hazard, and
 * speculation and market bubbles — and the last of those had no content anywhere in the section.
 */
for (const [needle, what] of [
  [/welfare loss/i, 'the welfare loss'], [/external cost/i, 'external costs'], [/external benefit/i, 'external benefits'],
  [/public good/i, 'public goods'], [/information/i, 'imperfect market information'],
  [/moral hazard/i, 'moral hazard'], [/bubble/i, 'market bubbles'],
]) {
  if (!PRACTICE.some((x) => needle.test(x.question))) problems.push(`no practice item covers ${what}`);
}

/*
 * A GLOSS THAT CITES APPENDIX 6 MUST SAY WHAT APPENDIX 6 SAYS (packet 21), and MUST NOT BOLT AN EXTRA
 * REQUIREMENT ONTO IT (packet 23). Three packets shipped the first error independently on one day;
 * `claim.uncited` cannot see either, because the sentence carries a citation, which is exactly what
 * that rule looks for. Both checks are carried here unchanged.
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

/*
 * THE LENGTH TELL THE VALIDATOR CANNOT SEE. `quiz.long-correct` fires only when the correct option is
 * more than 1.5× the longest distractor, which catches the egregious case and nothing else. A
 * systematic tendency for the key to be simply the LONGEST of the four survives the render-time
 * shuffle, unlike answer position, so the share is bounded here at 35% against a 25% baseline.
 */
{
  const longest = bundle.quiz.filter((x) => {
    const c = String(x.options[x.correctIndex]).length;
    return x.options.every((o, j) => j === x.correctIndex || String(o).length < c);
  }).length;
  const share = longest / bundle.quiz.length;
  if (bundle.quiz.length >= 8 && share > 0.35) problems.push(`the correct option is the longest of the four in ${longest} of ${bundle.quiz.length} items (${Math.round(share * 100)}%, baseline 25%) — a length tell that survives the render-time shuffle`);
}

/*
 * A REORDER MAY NOT BE THE FLOW BOX ON THE SCREEN ABOVE IT.
 *
 * `lib/learn-steps.js:10` puts a subsection's own recall BELOW its teaching on the same step, so a
 * reorder whose items are the flow's step titles verbatim is a copy-from-screen task rather than
 * retrieval. That is `structure-04` word for word — "the 'immediate' recall renders at the bottom of
 * the same step where that flow box is visible" — and this packet reproduced it in all EIGHT of its
 * reorders while claiming to close the finding, because `reorder.source` requires the items to come
 * from a taught sequence and the laziest way to satisfy it is to copy one.
 *
 * `reorder.source` asks for PARAPHRASE ("Identify options" against "Identify all available options")
 * and matches on shared distinctive words, so paraphrase satisfies it and repetition is never
 * necessary. Found by Layer 6 on one recall; the class is closed here.
 */
for (const sec of SUBSECTIONS) {
  const r = sec.recall;
  if (!r || r.type !== 'reorder') continue;
  const flow = (sec.body || []).find((b) => b.type === 'flow');
  if (!flow) continue;
  const titles = new Set((flow.steps || []).map((x) => (typeof x === 'object' ? x.title : x)));
  const copied = (r.correctOrder || []).filter((x) => titles.has(x));
  if (copied.length) problems.push(`"${sec.title}": ${copied.length} of ${r.correctOrder.length} reorder items are the flow box on the same step, word for word — a copy-from-screen task (structure-04): "${copied[0].slice(0, 50)}"`);
}
/*
 * A/B: the check must fire on a copy and clear on a paraphrase (packet 21 — a guard nothing has ever
 * disagreed with is a claim about itself).
 */
{
  const flowTitles = new Set(['Buyers and sellers act on the price they see']);
  const fires = (items) => items.filter((x) => flowTitles.has(x)).length > 0;
  if (!fires(['Buyers and sellers act on the price they see'])) problems.push('the copy-from-screen check no longer fires on a verbatim flow step');
  if (fires(['Buyers and sellers each act on what they can see'])) problems.push('the copy-from-screen check fires on a paraphrase, which `reorder.source` is designed to accept');
}

/* ── pins ──────────────────────────────────────────────────────────────────── */
for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned`);
}
/*
 * THE FREE-QUIZ CEILING IS A FUNCTION OF BLOCK COUNT, and this section is the first to reach it.
 * `freeQuizPayload()` spends PREVIEW_LIMITS.quiz (2) on the Quiz tab, then one pin per block, then
 * tops up the pre-test's headroom — all bounded by FREE_QUIZ_MAX (10). Measured against this bank:
 *
 *      blocks   4    5    6    7    8    9   10
 *      pre-test 3    3    3    3    2    2    2
 *      chapters with NO check-in quiz
 *               0    0    0    0    0    1    2
 *
 * At EIGHT blocks a signed-out student's pre-test drops from three questions to two — which is why
 * this packet's own Verify B script asked for three and the screen showed two. At NINE a chapter
 * loses its check-in question outright. This does not fail the packet: `pretest-pool.js` is explicit
 * that a short pre-test is the intended degradation. It refuses anything that would silently drop a
 * CHAPTER's question, and warns at the boundary, so packet 26 knows before it chooses a block count.
 */
if (BLOCKS.length > 8) problems.push(`${BLOCKS.length} blocks: past eight, freeQuizPayload() runs out of FREE_QUIZ_MAX and a chapter is served NO check-in quiz at all for a signed-out student (lib/preview-limits.js). Split the section or raise the cap with the founder.`);
if (BLOCKS.length === 8) console.log('\nNOTE: at 8 blocks a signed-out student\'s pre-test is 2 questions, not 3 — 2 + 8 pins = FREE_QUIZ_MAX, so PRETEST_HEADROOM has nothing to spend. Every chapter still gets its check-in quiz. At 9 blocks one would not.');
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
{
  const flat = Object.values(quizIndices).flat();
  if (new Set(flat).size !== flat.length) problems.push('a quiz item is pinned by more than one block (pins.reuse)');
  for (const i of flat) if (unpinned.has(i)) problems.push(`quiz item ${i} is pinned by a block AND left for the pre-test pool ("${QUIZ[i].question.slice(0, 50)}")`);
  for (const b of BLOCKS) for (const i of quizIndices[b]) if (QUIZ[i].block !== b) problems.push(`block "${b}" pins quiz item ${i}, which belongs to "${QUIZ[i].block || 'the pre-test'}"`);
  const firsts = BLOCKS.map((b) => quizIndices[b][0]);
  if (firsts.every((v, i) => i === 0 || v === firsts[i - 1] + 1)) problems.push('quizIndices are consecutive in block order (pins.identity) — which is the March section\'s structure-01 exactly');
}
/*
 * structure-01 named the specific mis-pins: four of seven blocks showed an inline question about
 * another chapter's topic, because quizIndices were block n → quiz n. Each block's LEAD item must be
 * about that block.
 */
for (const [b, needle, what] of [
  [B1, /sources|misallocat|rational|externality from the other/i, 'the sources of market failure'],
  [B2, /social cost|social benefit|external/i, 'private, external and social'],
  [B3, /welfare|MSC|MSB|marginal/i, 'the welfare areas'],
  [B4, /river|vaccination|environmental|bank takes on/i, 'a context'],
  [B5, /public good|private good|free-rider|road/i, 'public goods'],
  [B6, /information|healthcare|education and pensions/i, 'imperfect market information'],
  [B7, /moral hazard|excess|insurance|banking|workers/i, 'moral hazard'],
  [B8, /bubble|speculat|housing|share/i, 'speculation and bubbles'],
]) {
  const lead = QUIZ[(quizIndices[b] || [])[0]]?.question || '';
  if (!needle.test(lead)) problems.push(`block "${b}" opens its check-in with an item that is not about ${what}: "${lead.slice(0, 60)}" (structure-01)`);
}

/* ── the arithmetic, recomputed here rather than trusted ───────────────────── */
/*
 * Both markets are re-derived from their own lines rather than read off the util module's exports, so
 * a slope that changes and a figure that does not fails the build.
 */
if (meet(K.mpb, K.mpc) !== K.marketQ) problems.push('the cement market quantity is not where MPB meets MPC');
if (meet(K.mpb, K.msc) !== K.optimumQ) problems.push('the cement social optimum is not where MPB meets MSC');
if (K.marketQ !== 50 || K.optimumQ !== 40) problems.push(`the cement quantities are ${K.marketQ} and ${K.optimumQ}, not 50 and 40`);
if (valueAt(K.msc, K.marketQ) - valueAt(K.mpc, K.marketQ) !== K.externalCost) problems.push('the gap between MSC and MPC is not the external cost');
if (valueAt(K.msc, 0) - valueAt(K.mpc, 0) !== K.externalCost) problems.push('the MSC/MPC gap is not constant, so the shift is not parallel and ½ × gap × range is the wrong area');
if (K.welfareLoss !== round2(0.5 * K.externalCost * (K.marketQ - K.optimumQ))) problems.push('the welfare loss disagrees with ½ × gap × range');
if (K.totalExternalCost !== round2(K.externalCost * K.marketQ)) problems.push('the total external cost is not the per-unit cost times the market quantity');
/*
 * THE DISTINCTION THE WHOLE SECTION TURNS ON, asserted rather than assumed. The March Q18 keyed the
 * total external cost as the welfare loss. If these two ever coincide, three subsections, a mistake
 * card, a chain, two quiz items and a practice item all stop making their point.
 */
if (K.welfareLoss === K.totalExternalCost) problems.push('the welfare loss and the total external cost are the same number, so the distinction this section is built on has collapsed');
if (!(K.totalExternalCost > K.welfareLoss * 5)) problems.push(`the total external cost (${money(K.totalExternalCost)}) is not comfortably larger than the welfare loss (${money(K.welfareLoss)}); the contrast the section draws needs to be visible`);
if (!(K.marketQ > K.optimumQ)) problems.push('an external COST of production does not put the market above the social optimum, which every surface in chapter 3 asserts');

if (meet(A.mpb, A.mpc) !== A.marketQ) problems.push('the courses market quantity is not where MPB meets MSC');
if (meet(A.msb, A.msc) !== A.optimumQ) problems.push('the courses social optimum is not where MSB meets MSC');
if (A.marketQ !== 20 || A.optimumQ !== 23) problems.push(`the courses quantities are ${A.marketQ} and ${A.optimumQ}, not 20 and 23`);
if (valueAt(A.msb, A.marketQ) - valueAt(A.mpb, A.marketQ) !== A.externalBenefit) problems.push('the gap between MSB and MPB is not the external benefit');
if (A.welfareGain !== round2(0.5 * A.externalBenefit * (A.optimumQ - A.marketQ))) problems.push('the welfare gain disagrees with ½ × gap × range');
if (!(A.optimumQ > A.marketQ)) problems.push('an external BENEFIT of consumption does not put the market below the social optimum, which every surface in chapter 3 asserts');
// At the optimum the two social curves must actually meet, in both markets: it is the definition.
if (valueAt(A.msb, A.optimumQ) !== valueAt(A.msc, A.optimumQ)) problems.push('MSB and MSC do not meet at the courses optimum');
if (valueAt(K.mpb, K.optimumQ) !== valueAt(K.msc, K.optimumQ)) problems.push('MPB and MSC do not meet at the cement optimum');
/*
 * AND THE GENERAL CLAIM, DERIVED RATHER THAN ASSERTED — packet 24's lesson, that a section which says
 * an outcome holds "whatever the slopes" has to prove it across a range. Chapter 2's takeaway is that
 * a missed COST always means too much and a missed BENEFIT always means too little. That is a claim
 * about every pair of downward and upward sloping lines, not about these two, so it is tested against
 * demand slopes spanning nearly flat to nearly vertical.
 */
{
  const failures = [];
  for (const slope of [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 20, 100]) {
    const mpb = { at0: 60, perUnit: -slope };
    const mpc = { at0: 10, perUnit: 0.5 };
    const msc = { at0: 10 + K.externalCost, perUnit: 0.5 };
    if (!(meet(mpb, mpc) > meet(mpb, msc))) failures.push(`cost, demand slope ${slope}: market ${meet(mpb, mpc)} not above optimum ${meet(mpb, msc)}`);
    const msb = { at0: 60 + A.externalBenefit, perUnit: -slope };
    if (!(meet(msb, mpc) > meet(mpb, mpc))) failures.push(`benefit, demand slope ${slope}: optimum ${meet(msb, mpc)} not above market ${meet(mpb, mpc)}`);
  }
  if (failures.length) problems.push(`the direction rule fails for some slopes, and the section states it without qualification: ${failures.join('; ')}`);
}

/* ── diagram geometry, re-derived from the emitted SVG ─────────────────────── */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the five sources, in the specification's own order
  const [sources, direction] = svgOf(DIAGRAMS[0]);
  for (const name of ['Externalities', 'The free-rider problem', 'Imperfect market information', 'Moral hazard', 'Speculation and bubbles']) {
    has(sources, `>${name}</text>`, `the sources table has no row for "${name}"`);
  }
  has(direction, '>too much</text>', 'the direction table does not say "too much" for a missed cost');
  has(direction, '>too little</text>', 'the direction table does not say "too little" for a missed benefit');
}
{ // 2 · the two identities and the four kinds
  const [identities, kinds] = svgOf(DIAGRAMS[1]);
  for (const cell of ['Private cost', 'external cost', 'social cost', 'Private benefit', 'external benefit', 'social benefit']) {
    has(identities, `>${cell}</text>`, `the identities table has no cell for "${cell}"`);
  }
  for (const cell of ['MSC above MPC', 'MSB below MPB', 'MSC below MPC', 'MSB above MPB']) {
    has(kinds, `>${cell}</text>`, `the four-kinds table has no row reading "${cell}"`);
  }
}
{ // 3 · the two marginal diagrams the specification names, and the third area
  const [loss, total, gain] = svgOf(DIAGRAMS[2]);
  has(loss, `welfare loss ${money(K.welfareLoss)}`, `the loss panel does not label the triangle ${money(K.welfareLoss)}`);
  has(total, `total external cost ${money(K.totalExternalCost)}`, `the total-cost panel does not label the band ${money(K.totalExternalCost)}`);
  has(gain, `welfare gain ${money(A.welfareGain)}`, `the gain panel does not label the triangle ${money(A.welfareGain)}`);
  has(loss, `>Qm ${qty(K.marketQ)}<`, 'the loss panel does not read off the market quantity');
  has(loss, `>Qopt ${qty(K.optimumQ)}<`, 'the loss panel does not read off the social optimum');
  has(gain, `>Qm ${qty(A.marketQ)}<`, 'the gain panel does not read off the market quantity');
  has(gain, `>Qopt ${qty(A.optimumQ)}<`, 'the gain panel does not read off the social optimum');
  has(loss, `>${money(K.marketP)}</text>`, 'the loss panel does not read off the market price');
  has(gain, `>${money(A.optimumP)}</text>`, 'the gain panel does not read off the price at the optimum');
  for (const svg of [loss, total, gain]) {
    // topFix-02 asks for exactly this relabelling: the vertical axis of a marginal diagram is not a price.
    has(svg, 'Costs, Benefits', 'a marginal panel labels its vertical axis something other than "Costs, Benefits" (topFix-02)');
    has(svg, '<polygon', 'a marginal panel shades no area, and 2d asks for identification of the welfare loss or gain AREA');
  }
  for (const curve of ['MPB = MSB', 'MPC', 'MSC']) has(loss, `>${curve}</text>`, `the loss panel does not label the ${curve} curve`);
  for (const curve of ['MPB', 'MSB', 'MPC = MSC']) has(gain, `>${curve}</text>`, `the gain panel does not label the ${curve} curve`);
}
{ // 4 · the five contexts 2e names, in the specification's order
  const [contexts, direction] = svgOf(DIAGRAMS[3]);
  for (const c of ['Transport', 'Health', 'Education', 'Environment', 'Financial']) {
    has(contexts, `>${c}</text>`, `the contexts table has no row for ${c}`);
    has(direction, `>${c}</text>`, `the direction table has no row for ${c}`);
  }
}
{ // 5 · the two tests, and the free-rider chain
  const [goods, freeRider] = svgOf(DIAGRAMS[4]);
  for (const cell of ['Private good', 'Public good', 'rival', 'excludable', 'non-rival', 'non-excludable']) {
    has(goods, `>${cell}</text>`, `the goods table has no cell reading "${cell}"`);
  }
  has(freeRider, 'MAY NOT be provided', 'the free-rider table does not carry the specification\'s "may not" (accuracy-01)');
}
{ // 6 · symmetric, asymmetric, and the four contexts of 4c
  const [symmetry, contexts] = svgOf(DIAGRAMS[5]);
  for (const cell of ['Symmetric', 'Asymmetric', 'Information gap']) has(symmetry, `>${cell}</text>`, `the symmetry table has no row for "${cell}" (specGap-01)`);
  for (const c of ['Healthcare', 'Education', 'Pensions', 'Insurance']) has(contexts, `>${c}</text>`, `the 4c table has no row for ${c}`);
}
{ // 7 · how moral hazard occurs, and the four groups
  const [how, impact] = svgOf(DIAGRAMS[6]);
  has(how, 'Behaviour changes', 'the moral hazard table does not name the change in behaviour');
  for (const g of ['Consumers', 'Producers', 'Workers', 'Governments']) has(impact, `>${g}</text>`, `the moral hazard impact table has no row for ${g} — 5b names all four`);
}
{ // 8 · the bubble, drawn
  const [rise, burst] = svgOf(DIAGRAMS[7]);
  for (const svg of [rise, burst]) {
    has(svg, '>Time<', 'a bubble panel does not label the horizontal axis');
    has(svg, '>Price<', 'a bubble panel does not label the vertical axis');
    has(svg, '>value<', 'a bubble panel does not draw the value line the price departs from');
  }
  has(burst, 'the rise is the reason', 'the burst panel does not mark the stage at which the rise becomes its own cause');
}

/*
 * EVERY PLOTTED POINT INSIDE ITS CANVAS (packet 23's check). It found four real defects on this
 * file's first run: captions on the drawn scenarios wrapped below a frame whose height was a
 * constant. Polygons are included here as well as lines, circles, text and rects, because three of
 * this section's shaded areas are polygons and packet 24's version did not read `points`.
 */
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
 * AND THE SAME CHECK FOR THE TEXT'S WIDTH, WHICH IS THE PART IT COULD NOT SEE.
 *
 * The bounds check above reads a <text> element's ANCHOR. An anchor inside the frame says nothing
 * about where the string ENDS, and SVG text does not wrap or clip — it simply runs off the side.
 * Verify B found "welfare loss $50 a day" doing exactly that on the phone, at x = 514.2 in a
 * 500-unit frame, on the one diagram the specification asks for by name. Packet 23's canvas check
 * passed it, the validator passed it, and Verify A read the source.
 *
 * So the frame test is now on the text's EXTENT. `estWidth` is the same bound the tables use, which
 * makes this a pessimistic guard rather than a measurement — the real measurement is
 * getComputedTextLength() in the browser, and against all 323 strings in this section's diagrams the
 * estimate is conservative everywhere it matters.
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
/*
 * A/B, run every time (packet 21). The label as it was written must fire, and a short one must not.
 * Without this the check is a claim about itself.
 */
{
  const frame = 500;
  const probe = (text, x, size, anchor) => {
    const w = estWidth(text, size);
    const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
    return left + w > frame + 1 || left < -1;
  };
  if (!probe('welfare loss $50 a day', 396.7, 11, 'start')) problems.push('the text-extent check no longer fires on the label Verify B found running off the frame');
  if (probe('welfare loss $50', 496, 11, 'end')) problems.push('the text-extent check fires on a label that measures inside the frame');
}

/*
 * A TABLE'S CELLS MUST NOT COLLIDE. `estWidth` is imported from the diagrams module rather than
 * redefined, because the layout there now uses the same bound to PLACE the columns — the two must
 * not be able to disagree about what fits. That makes this a regression guard rather than an
 * independent measurement, and it is labelled as such: the independent one is getComputedTextLength()
 * in the browser, in Verify B.
 */
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

// Layer 5 by string: the two markets' figures are the same figures wherever they appear.
/*
 * `money(A.totalExternalBenefit)` — $240 — was named in this packet's own acceptance check 8 and was
 * NOT in this list, so the check was written and never enforced. Verify A found the consequence: the
 * figure appeared exactly once in the whole bundle, as a wrong-answer DISTRACTOR, while its cost-side
 * twin ($500) is taught on eight surfaces. A distractor built from a figure the student has never been
 * shown is not a distractor, it is a trick. An acceptance check that no code runs is a wish.
 */
const must = [money(K.welfareLoss), money(K.totalExternalCost), money(K.marketP), money(K.optimumP), qty(K.marketQ), qty(K.optimumQ), money(A.welfareGain), money(A.totalExternalBenefit), money(A.marketP), money(A.optimumP), qty(A.marketQ), qty(A.optimumQ)];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// ONE MINUS SIGN. A negative number typed by hand carries U+2212 and one printed by JavaScript
// carries an ASCII hyphen; packet 18 shipped 55 of one beside 13 of the other.
{
  const hyphenNumbers = prose.flatMap((s) => s.match(/(?<![\w-])-\s?[\d$]/g) || []);
  if (hyphenNumbers.length) problems.push(`${hyphenNumbers.length} negative figure(s) using an ASCII hyphen instead of U+2212: ${[...new Set(hyphenNumbers)].slice(0, 6).join(', ')}`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 25 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log('\nthe two markets:');
console.log(`  Kumbe Cement   MPB 60 − 0.5Q · MPC 10 + 0.5Q · external cost ${money(K.externalCost)} → MSC 20 + 0.5Q`);
console.log(`                 market ${qty(K.marketQ)} at ${money(K.marketP)} · optimum ${qty(K.optimumQ)} at ${money(K.optimumP)} · welfare LOSS ${money(K.welfareLoss)} · total external cost ${money(K.totalExternalCost)}`);
console.log(`  Amara Skills   MPB 100 − 2Q · MPC = MSC 20 + 2Q · external benefit ${money(A.externalBenefit)} → MSB 112 − 2Q`);
console.log(`                 market ${qty(A.marketQ)} at ${money(A.marketP)} · optimum ${qty(A.optimumQ)} at ${money(A.optimumP)} · welfare GAIN ${money(A.welfareGain)} · total external benefit ${money(A.totalExternalBenefit)}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(40)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 76)}`);
if (problems.length) { console.log(`\nPROBLEMS (${problems.length}):`); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: one currency · no merit/demerit goods, deadweight, market power, monopoly, allocative efficiency, adverse selection, quasi-public goods, information failure, spillover or tragedy of the commons · nothing from 1.3.6 or 1.3.2 · no Assess, Outline or 10-mark · no UK framing, lighthouse or dated claim · no uncited examiner, marker, frequency or paper claim · every practice tariff in the ECONOMICS census, every command word used, every guidance two paragraphs with a clean opening · both Appendix 6 gloss checks · every block pinned to a quiz, a practice item and a diagram, each on its own topic, none of them the pre-test\'s · both markets recomputed from their own lines and the direction rule derived across nine demand slopes · every diagram figure re-derived from the emitted SVG · nothing drawn outside its canvas · no table cell collisions · ids unique · one minus sign');

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

if (DUMP) { const path = `audit/snapshots/packet-25-bundle__economics__${SECTION}.json`; writeFileSync(path, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-25-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${path}`); }

if (!STAGE) { console.log('\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract.'); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
