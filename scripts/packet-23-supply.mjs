#!/usr/bin/env node
/**
 * PACKET 23 — supply, IAL Economics Unit 1 topic 1.3.3 (19 spec leaves).
 *
 *   node scripts/packet-23-supply.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-23-supply.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-23-supply.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet23-content.mjs (blocks and Notes), scripts/_packet23-assessment.mjs
 * (quiz, practice, flashcards, mistakes, extras) and scripts/_packet23-diagrams.mjs (five diagrams,
 * two of which are tables). This file assembles the bundle, pins each block to its diagram, quiz and
 * practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive. Two groups, and the first is the one nothing automated can see:
 *     UNIT 3 VOCABULARY, because the March block 3 taught marginal product, the law of diminishing
 *     returns and returns to scale in a WEC11 section (accuracy-02, structure-03); and OFF-SPEC
 *     VOCABULARY — `momentary`, `joint supply`, `competitive supply`, `KAA` — each of which an audit
 *     finding asked this packet to BUILD, and each of which is 0 in econ_spec.txt;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for
 *     ECONOMICS, where there is no Assess, no Outline and no 10-mark item;
 *   - the diagrams' own geometry, re-derived from the emitted SVG rather than asserted: every supply
 *     line's endpoints against the function that drew it, the specific tax's constant vertical gap,
 *     the ad valorem tax's widening one, and every grid cell on its own row;
 *   - Layer 5 by string: Kavira Ceramics' figures appear in the body AND in at least one other
 *     surface, so a number cannot change in one place and not another.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, pc, qty, pesStr, round2, P0, P1, Q0, Q_SR, Q_LR, PCT_P, PCT_Q_SR, PCT_Q_LR, PES_SR, PES_LR, SR, LR, qAt, pAt, SPECIFIC_TAX, AD_VALOREM, SUBSIDY, adValoremGap } from './_packet23-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5 } from './_packet23-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet23-assessment.mjs';
import { DIAGRAMS, PLOT, X, Y, GRD, gridRowY, r2 } from './_packet23-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a free student's bank is sliced server-side
 * (F086, and V005's freeQuizPayload() since 16 Sep), so a pre-test whose pool sits at the end of the
 * array serves that student PINNED questions instead. A fourth unpinned item would reach no surface
 * at all, because the pre-test slices at three.
 */
const unpinned = new Set(QUIZ.map((x, i) => (x.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, question) => { const i = QUIZ.findIndex((x) => x.question === question); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Which phrase correctly describes a rightward shift of the supply curve?'),
  [B2]: first(quizByBlock[B2], `An ad valorem tax of ${pc(AD_VALOREM)} differs from a specific tax because:`),
  [B3]: first(quizByBlock[B3], 'A supply curve drawn as a straight line through the origin has:'),
  [B4]: first(quizByBlock[B4], 'Which of these would make the supply of a good more price elastic?'),
  [B5]: first(quizByBlock[B5], `Given more time, Kavira's response to the same ${pc(PCT_P())} price rise changes from ${pc(PCT_Q_SR())} to ${pc(PCT_Q_LR())} on quantity. PES therefore moves from:`),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5],
};
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why this section's three `diagramRef` pins
 * put ONE diagram in front of a student and left the two carrying the whole PES half unseen
 * (structure-02).
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
const texts = allStrings(bundle);
// the SVG source is machine-written and full of colour tokens; prose bans apply to what a student reads
const prose = allStrings({ content: bundle.content, notes: bundle.notes, quiz: bundle.quiz, practice: bundle.practice, flashcards: bundle.flashcards, extras: bundle.extras, mistakes: bundle.mistakes })
  .concat(DIAGRAMS.flatMap((d) => [d.title, d.description, ...(d.checklist || []), ...(d.scenarios || []).map((s) => s.label)]));
const problems = [];
const count = (re) => prose.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£/g, 'pounds sterling (one currency per section, dollars)');
/*
 * UNIT 3 VOCABULARY. The heart of accuracy-02 and structure-03: block 3 of the March section taught
 * marginal product, the law of diminishing returns and returns to scale, and never mentioned
 * elasticity, in a section whose leaf 2d asks for the short run and long run's SIGNIFICANCE FOR PES.
 * `diminishing returns` is econ_spec.txt:1306 and `marginal product` :1316, both inside the Unit 3
 * costs span (3.3.2); `returns to scale` is 0 in the WHOLE specification, so even the ledger's
 * instruction to "move it to WEC13 costs" names something IAL does not have.
 *
 * `marginal cost` is the same trap one step quieter: the March body explained the upward slope by
 * "increasing marginal costs of production", and marginal cost is :1316, Unit 3. IAL 1.3.3 · 1a
 * gives no mechanism for the slope at all, so the mechanism is taught in the spec's own "costs of
 * production" (1c-1). Sixth instance of the packet 13/16/17/18/22 rule.
 */
ban(/\breturns to scale\b/gi, '"returns to scale" (0 in econ_spec.txt — not Unit 3, not anywhere)');
ban(/\bdiminishing (returns|marginal (returns|product|productivity))\b/gi, 'diminishing returns (econ_spec.txt:1305-1306, Unit 3 costs — terms.later-unit here)');
ban(/\bmarginal (product|cost|revenue)\b/gi, 'marginal product / cost / revenue (econ_spec.txt:1316, Unit 3 costs — the March section explained the slope with it)');
ban(/\b(dis)?economies of scale\b/gi, 'economies of scale (econ_spec.txt:1321-1336, Unit 3)');
ban(/\bfixed cost|\bvariable cost|\baverage (total|variable|fixed) cost\b/gi, 'a cost classification from Unit 3 (3.3.2)');
/*
 * OFF-SPEC VOCABULARY, and every one of these was something a finding asked this packet to BUILD.
 * Counts are word-boundary over the whole Economics specification, run before a word was written.
 */
ban(/\bmomentary\b/gi, '"momentary" (0 in econ_spec.txt — topFix-02 asked for a block built on it, and the word was already live in this section\'s own second mistake)');
ban(/\b(joint|competitive) suppl(y|ies)\b/gi, '"joint/competitive supply" (0 in econ_spec.txt; `joint` hits twice, both joint VENTURES — specGap-03 and topFix-05 asked to teach it)');
ban(/\bproducer expectations\b/gi, '"producer expectations" (0 in econ_spec.txt — the rest of specGap-03)');
ban(/\bKAA\b/g, '"KAA" (0 in econ_spec.txt — a UK GCE mark-scheme abbreviation topFix-05 asked for)');
/*
 * 1.3.4's vocabulary. specGap-04 and structure-09 ask this section to show the effect of a supply
 * shift on equilibrium price and quantity; that is 1.3.4 · 1b (:697-698) and producer surplus is
 * 1.3.4 · 2a (:703-706). Both findings are reassigned to packet 24, and the examMatters sentences
 * that demanded an equilibrium diagram in a 1.3.3 answer — which is what made the findings look
 * true — are gone. Fourth instance of packet 19's wrong-SECTION sub-class.
 */
ban(/\bequilibrium\b/gi, '"equilibrium" (IAL 1.3.4 — price-determination owns it; specGap-04 is reassigned, not built)');
ban(/\bproducer surplus\b/gi, '"producer surplus" (econ_spec.txt:703-706, IAL 1.3.4 · 2a)');
ban(/\bexcess (demand|supply)\b/gi, 'excess demand/supply (IAL 1.3.4 · 1c)');
// the March examples this packet replaced, including the one accuracy-01 was written about
ban(/\b(Saudi Arabia|Saudi Aramco|Airbus|Domino's|John Deere|Toyota|TSMC|Taiwan Semiconductor)\b/g, 'a March example this packet replaced (accuracy-01: Saudi Arabia has the lowest lifting costs in the world and RAISED output as prices collapsed in 2014-16; the passage described US shale behaviour)');
ban(/\b(Help to Buy|green belt|HMRC|the Chancellor|Bank of England|Ofgem|ONS|OBR|FTSE)\b/g, 'a UK-only institution or scheme (locale.institution; practice-02 named Help to Buy as a SUPPLY factor, and it is a demand-side scheme)');
ban(/\b(the UK|United Kingdom|Britain|British)\b/g, 'a UK-only framing (practice-02: an international cohort gets contexts like Malaysian palm oil, not London housing)');
ban(/\b(Outline|Assess)\b/g, '"Outline" or "Assess" (neither is an IAL ECONOMICS command word; the March bank had one of each)');
ban(/\b10.mark|\(10 marks\)/g, 'a 10-mark item (Economics has no 10-mark tariff — the March "Assess … (10 marks)" was invalid twice over)');
/*
 * Packet 19's Layer 6 found "(specGap-03)" inside a paragraph a student reads — an internal ledger
 * id that had leaked out of the authoring note it belonged in. Nothing else in the pipeline looks
 * for one: the validator has no rule for it and it reads as plausible prose.
 */
ban(/\((?:specGap|topFix|structure|accuracy|quiz|practice|specThin)-\d+\)/g, 'an internal ledger id left in text a student reads');
/*
 * The same class again, and Layer 6 found it: "leaf" is THIS PLATFORM's word for a specification
 * sub-bullet. It appears in no Pearson document and no student has met it, yet six body paragraphs
 * opened with "Leaf 2b-3 names…". The diagram descriptions had it right all along — "IAL 1.3.3 · 1c-3"
 * — so the body was made to follow them. Internal vocabulary reads as ordinary prose, which is
 * exactly why nothing else catches it.
 */
ban(/\bLeaf \d|\bleaf \d/g, 'the word "leaf" — this platform\'s internal name for a spec sub-bullet — in text a student reads');

for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give|set)/i.test(sent) && !/\bWEC1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * The same class one step out: `claim.uncited` only fires on the word "examiners", so a sentence can
 * assert the same thing without naming them. The March section had five — "Marks are consistently
 * lost for unlabelled diagrams", "Labelling your diagram with arrows earns additional marks"
 * (topFix-03 asked for this one to be SOFTENED; it is removed), "this applied approach scores far
 * higher". Say what the COMMAND WORD requires, which Appendix 6 states and can therefore be cited;
 * do not say what a marker does with an answer, which cannot. Practice GUIDANCE is exempt: a mark
 * scheme allocating "(1 mark)" is the artefact itself, not a claim about one.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly|far higher|higher)\b|\bfull marks\b|\bmarks are (?:consistently )?lost\b/i;
const guidance = new Set(PRACTICE.map((x) => x.guidance));
const guidanceCommand = new Map(PRACTICE.map((x) => [x.guidance, x.command]));
for (const s of prose) { if (guidance.has(s)) continue; for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`); }

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love|in almost every|frequently set|trap questions)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of prose) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of prose) { if (guidance.has(s)) continue; for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWEC1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`); }

/*
 * Never put a note about our own previous content in text a student reads (packet 18: two practice
 * items said "the March version of this item asked for 4", which Layer 6 read as a claim about a
 * past paper).
 */
ban(/\b(the March version|previously|in the previous version|this section used to|earlier version)\b/gi, 'a note about our own previous content in text a student reads');

// Practice command words and tariffs against the specification's own Appendix 6, for ECONOMICS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'economics');
for (const x of PRACTICE) {
  const row = census.find((r) => r.command === x.command);
  if (!row) problems.push(`practice "${x.command}" is not an IAL Economics command word`);
  else if (!row.marks.includes(x.marks)) problems.push(`practice ${x.command} (${x.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!x.question.includes(`(${x.marks} marks)`)) problems.push(`practice ${x.command}: the stem does not say "(${x.marks} marks)"`);
  if (x.marks > 6 && /\(\d+\s*marks?\)/.test(x.guidance)) problems.push(`practice ${x.command} (${x.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}
// every command word in the Economics census is used exactly once — the section's own completeness check
for (const row of census) if (!PRACTICE.some((x) => x.command === row.command)) problems.push(`no practice item uses the Economics command word "${row.command}" (${row.marks.join('/')})`);

/*
 * APPENDIX 6 ATTRIBUTION. This packet's own rule is that examMatters may say what the COMMAND WORD
 * requires, because Appendix 6 states it and it is therefore citable. Layer 6 found the failure mode
 * that rule creates: a sentence that cites Appendix 6 for something Appendix 6 does not say. Two
 * here — Calculate was credited with requiring "interpretation" (that comes from the spec CONTENT,
 * 1.3.3 · 2b, not the command word), and the Discuss guidance claimed "diagrams where appropriate",
 * which appears in the Analyse and Examine rows only.
 *
 * A citation is checkable, so it is checked: a sentence naming Appendix 6 and a command word may
 * only assert what that command's own census description contains. The keywords are the claims the
 * descriptions actually distinguish between, which is what makes a wrong attribution possible.
 */
const APPENDIX_CLAIMS = [
  [/\bdiagram/i, /diagram/i, 'diagrams'],
  [/\binterpret/i, /interpret/i, 'interpretation'],
  [/\bworkings?\b/i, /workings/i, 'showing workings'],
  [/chain of reasoning|chains of reasoning/i, /chains? of reasoning/i, 'a chain of reasoning'],
  [/\bbrief assessment\b/i, /brief assessment/i, 'a brief assessment'],
  [/\bdepth rather than breadth\b/i, /depth rather than breadth/i, 'depth rather than breadth'],
  [/\bjudgement/i, /judgements?/i, 'a judgement'],
];
for (const s of prose) {
  for (const sent of s.split(/(?<=[.!?])\s+/)) {
    if (!/appendix\s*6/i.test(sent)) continue;
    /*
     * Practice guidance carries its command word in its own FIELD, not in its prose, so the sentence
     * scope has to be widened to the item. examMatters names the command in the sentence itself.
     */
    const cmd = census.find((row) => new RegExp(`\\b${row.command}\\b`).test(sent))
      || census.find((row) => row.command === guidanceCommand.get(s));
    if (!cmd) { problems.push(`a sentence cites Appendix 6 but names no command word: "${sent.trim().slice(0, 80)}"`); continue; }
    for (const [inSentence, inDescription, what] of APPENDIX_CLAIMS) {
      if (inSentence.test(sent) && !inDescription.test(cmd.description)) {
        problems.push(`Appendix 6 is cited for ${what} under ${cmd.command}, which its description does not mention: "${sent.trim().slice(0, 90)}"`);
      }
    }
  }
}

for (const b of [B1, B2, B3, B4, B5]) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-01: block 1 had none at all)`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned (structure-02: only content[0] had one)`);
}
// pins.identity: the March section pinned 0,1,2 in block order, which is the sign nobody chose them.
const firstPins = [B1, B2, B3, B4, B5].map((b) => quizIndices[b][0]);
if (firstPins.every((v, i) => v === i)) problems.push('quizIndices are 0,1,2,3,4 in block order again (pins.identity)');
// structure-01's actual defect: the PES quiz items must be pinned to the PES blocks, not to whatever came next
for (const i of quizIndices[B3].concat(quizIndices[B4])) if (!/PES|elastic|elasticity|perishes|licence|licences|spare capacity|immobile/i.test(QUIZ[i].question + QUIZ[i].options.join(' '))) problems.push(`quiz item ${i} is pinned to a PES chapter but is not about PES: "${QUIZ[i].question.slice(0, 60)}"`);

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). Every supply line IS a function, so its endpoints can be recomputed and looked for.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };
/** The endpoints X()/Y() would give for a line drawn from the function `fn` across the frame. */
const endsOf = (fn) => {
  const pLow = fn(0) >= 0 ? 0 : (() => { let p = 0; while (fn(p) < 0 && p < PLOT.pMax) p += 0.001; return round2(p); })();
  const qLow = Math.max(0, r2(fn(pLow)));
  const pHigh = (() => { let p = PLOT.pMax; while (fn(p) > PLOT.qMax && p > 0) p -= 0.001; return round2(p); })();
  return `x1="${X(qLow)}" y1="${Y(pLow)}" x2="${X(r2(fn(pHigh)))}" y2="${Y(pHigh)}"`;
};
{ // 1 · the movement along, and the shift
  const [move, shift] = svgOf(DIAGRAMS[0]);
  has(move, endsOf((p) => qAt(SR, p)), 'the supply line in the movement view is not drawn from Qs = 30P + 160');
  for (const [q, p] of [[Q0, P0], [Q_SR, P1]]) {
    has(move, `cx="${X(q)}" cy="${Y(p)}"`, `the point ${qty(q)} tiles at ${money(p)} is not plotted where the scales put it`);
    has(move, `>${qty(q)}</text>`, `the movement view does not print ${qty(q)}`);
    has(move, `>${money(p)}</text>`, `the movement view does not print ${money(p)}`);
  }
  has(shift, endsOf((p) => qAt(SR, p)), 'the original curve in the shift view is not the same function as in the movement view');
  has(shift, endsOf((p) => qAt(SR, p) + 120), 'the increased-supply curve is not drawn 120 tiles to the right at every price');
}
{ // 2 · a specific tax is parallel; an ad valorem tax is not
  const [spec, adval, sub] = svgOf(DIAGRAMS[1]);
  has(spec, endsOf((p) => qAt(SR, p - SPECIFIC_TAX)), `the taxed curve is not Qs = 30(P ${'−'} ${SPECIFIC_TAX}) + 160`);
  // the gap is the tax, at the quantity it is measured
  const gapTop = Y(pAt(SR, Q0) + SPECIFIC_TAX), gapBot = Y(pAt(SR, Q0));
  has(spec, `y1="${gapBot}" x2="${X(Q0)}" y2="${gapTop}"`, 'the marked vertical gap is not drawn between the two curves at that quantity');
  has(spec, `>${money(SPECIFIC_TAX)}</text>`, `the specific tax view does not print ${money(SPECIFIC_TAX)}`);
  // parallel: the same price gap at two different quantities
  const g1 = round2(pAt(SR, Q0) + SPECIFIC_TAX - pAt(SR, Q0));
  const g2 = round2(pAt(SR, Q_LR) + SPECIFIC_TAX - pAt(SR, Q_LR));
  if (g1 !== g2 || g1 !== SPECIFIC_TAX) problems.push(`a specific tax is not drawn parallel: gap ${g1} at ${qty(Q0)} and ${g2} at ${qty(Q_LR)}`);
  has(adval, endsOf((p) => qAt(SR, p / (1 + AD_VALOREM / 100))), 'the ad valorem curve is not the supply function with the price grossed up by the rate');
  const a1 = adValoremGap(SR, Q0), a2 = adValoremGap(SR, Q_LR);
  if (!(a2 > a1)) problems.push(`an ad valorem tax is not drawn as a pivot: gap ${a1} at ${qty(Q0)} and ${a2} at ${qty(Q_LR)}`);
  for (const g of [a1, a2]) has(adval, `>${money(g)}</text>`, `the ad valorem view does not print the ${money(g)} gap`);
  has(sub, endsOf((p) => qAt(SR, p + SUBSIDY)), 'the subsidised curve is not the supply function with the subsidy added to the price received');
  has(sub, `>${money(SUBSIDY)}</text>`, `the subsidy view does not print ${money(SUBSIDY)}`);
}
{ // 3 · the five values, and Kavira's two curves through one point
  const [five, two] = svgOf(DIAGRAMS[2]);
  for (const label of ['Perfectly inelastic', 'Inelastic', 'Unitary elastic', 'Elastic', 'Perfectly elastic']) has(five, `>${label}</text>`, `the five-values view does not name "${label}" (2b-1 … 2b-5)`);
  for (const v of ['PES = 0', 'PES &lt; 1', 'PES < 1', 'PES = 1', 'PES &gt; 1', 'PES > 1', 'PES = ∞'].filter((x) => five.includes(x))) if (!v) problems.push('unreachable');
  has(two, endsOf((p) => qAt(SR, p)), "the short-run curve in Kavira's view is not the same function as everywhere else");
  has(two, endsOf((p) => qAt(LR, p)), 'the long-run curve is not drawn from Qs = 120P − 560');
  // both curves must pass through the one shared point, which is the whole claim of the view
  if (round2(qAt(SR, P0)) !== Q0 || round2(qAt(LR, P0)) !== Q0) problems.push(`the two curves do not meet at ${qty(Q0)} tiles at ${money(P0)}, which the caption says they do`);
  for (const q of [Q0, Q_SR, Q_LR]) has(two, `>${qty(q)}</text>`, `Kavira's view does not print ${qty(q)}`);
  for (const v of [PES_SR(), PES_LR()]) has(two, pesStr(v), `Kavira's view does not print PES ${pesStr(v)}`);
}
{ // 4 and 5 · the two grids: every row on the row the geometry gives
  const [determinants] = svgOf(DIAGRAMS[3]);
  for (let r = 0; r < 5; r += 1) has(determinants, `y="${gridRowY(r)}"`, `the determinants grid has no cell on row ${r}`);
  for (const f of ['The time period', 'Stock / perishability', 'Mobility of factors', 'Legal constraints', 'Capacity']) has(determinants, `>${f}</text>`, `the determinants grid does not name "${f}" (2c-1 … 2c-5)`);
  const [horizons] = svgOf(DIAGRAMS[4]);
  for (let r = 0; r < 6; r += 1) has(horizons, `y="${gridRowY(r)}"`, `the horizons grid has no cell on row ${r}`);
  has(horizons, `>+${pc(PCT_Q_SR())}</text>`, `the horizons grid does not print the short-run quantity change ${pc(PCT_Q_SR())}`);
  has(horizons, `>+${pc(PCT_Q_LR())}</text>`, `the horizons grid does not print the long-run quantity change ${pc(PCT_Q_LR())}`);
  has(horizons, `>${pesStr(PES_SR())}</text>`, `the horizons grid does not print PES ${pesStr(PES_SR())}`);
  has(horizons, `>${pesStr(PES_LR())}</text>`, `the horizons grid does not print PES ${pesStr(PES_LR())}`);
  // the arithmetic the grid asserts, re-derived rather than trusted
  if (round2(PCT_Q_SR() / PCT_P()) !== PES_SR()) problems.push('PES_SR() disagrees with its own percentage changes');
  if (round2(PCT_Q_LR() / PCT_P()) !== PES_LR()) problems.push('PES_LR() disagrees with its own percentage changes');
  if (!(PES_SR() < 1 && PES_LR() > 1)) problems.push(`the section's whole claim fails: PES ${pesStr(PES_SR())} and ${pesStr(PES_LR())} are not one inelastic and one elastic`);
}
/*
 * Grid legibility and cell collision. A table is the one shape whose cells can silently land on top
 * of each other: nothing in the schema or the validator knows how wide a string is, and packet 19
 * measured three real collisions with getComputedTextLength() in the browser. It runs over every
 * view, not only the grids: SVG text does not wrap, so a caption longer than its frame simply runs
 * off the side, which is how five of them were caught here.
 *
 * THE 0.65em FIGURE PACKET 19 SET IS NOT A BOUND, and this packet measured why. All 139 strings in
 * the nine views were measured with getComputedTextLength() in the browser pane at DM Sans: the
 * widest per-character advance is 0.781em — but every string at that ratio is the ONE-CHARACTER axis
 * label "Q", where the whole error is 1.6 units. Averaged over a string long enough to collide with
 * anything the ratio falls fast: 0.55em at 8 characters or more, 0.525em at 15 or more. So 0.65em is
 * genuinely pessimistic exactly where a collision is possible and genuinely optimistic where it is
 * not, and stating it as "above the widest advance measured" was wrong. The estimator now uses 0.8em
 * below four characters and 0.65em at or above it, which is above the measured maximum in both
 * ranges. Measured, not assumed: 0 overlaps and 0 overflows in the browser across all nine views.
 */
const estWidth = (text, size) => { const n = String(text).length; return n * size * (n < 4 ? 0.8 : 0.65); };
for (const [di, d] of DIAGRAMS.entries()) {
  for (const [si, view] of (d.scenarios || [{ svg: d.svg }]).entries()) {
    const rows = {};
    for (const m of view.svg.matchAll(/<text x="([\d.-]+)" y="([\d.-]+)"[^>]*font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
      const [, x, y, size, anchor, text] = m;
      const w = estWidth(text, Number(size));
      const x0 = anchor === 'middle' ? Number(x) - w / 2 : anchor === 'end' ? Number(x) - w : Number(x);
      (rows[y] ||= []).push({ text, x0, x1: x0 + w });
    }
    const width = Number((view.svg.match(/viewBox="0 0 (\d+)/) || [])[1] || 500);
    for (const [y, cells] of Object.entries(rows)) {
      cells.sort((a, c) => a.x0 - c.x0);
      for (let i = 1; i < cells.length; i += 1) if (cells[i].x0 < cells[i - 1].x1) problems.push(`diagram ${di}.${si} row y=${y}: "${cells[i - 1].text}" overlaps "${cells[i].text}"`);
      for (const c of cells) if (c.x1 > width - 2) problems.push(`diagram ${di}.${si}: "${c.text.slice(0, 40)}" runs past the ${width}-unit frame`);
    }
    /*
     * THE AXIS THIS GUARD WAS BLIND TO. It measured x and never y, and Layer 6 found the consequence:
     * SEVEN of these nine views drew content outside their own canvas. The worst was the ad valorem
     * view, where the $3.20 gap marker — the second of the two measurements the panel exists to make
     * — ran to y = -42.86 on a 360-unit box, because at 640 tiles the taxed curve needs $19.20 and
     * the price axis stopped at $14. Five more lost the last line of a wrapped caption below the
     * bottom edge, and the five-values panel lost two of its five labels. Nothing else can see this:
     * an SVG with content outside its viewBox is valid, renders without error, and simply does not
     * show that content.
     */
    const height = Number((view.svg.match(/viewBox="0 0 \d+ (\d+)"/) || [])[1] || 0);
    const ys = [...view.svg.matchAll(/\by2?="(-?[\d.]+)"/g)].map((m) => Number(m[1]))
      .concat([...view.svg.matchAll(/cy="(-?[\d.]+)"/g)].map((m) => Number(m[1])));
    for (const y of ys) if (y < 0 || y > height) problems.push(`diagram ${di}.${si}: content at y=${y} is outside its own ${height}-unit canvas, so it does not render`);
    const xs = [...view.svg.matchAll(/\bx2?="(-?[\d.]+)"/g)].map((m) => Number(m[1]))
      .concat([...view.svg.matchAll(/cx="(-?[\d.]+)"/g)].map((m) => Number(m[1])));
    for (const x of xs) if (x < 0 || x > width) problems.push(`diagram ${di}.${si}: content at x=${x} is outside its own ${width}-unit canvas`);
  }
}

/*
 * Id uniqueness across every surface. Packet 19 found three flashcards that were exact duplicates
 * with a `-2` id suffix, and no ledger item named it.
 */
const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);
// and the same for flashcard fronts and quiz stems, which duplicate without the id noticing
for (const [what, list] of [['flashcard front', FLASHCARDS.map((f) => f.front)], ['quiz stem', QUIZ.map((x) => x.question)]]) {
  const d = list.filter((x, i) => list.indexOf(x) !== i);
  if (d.length) problems.push(`duplicate ${what}: ${[...new Set(d)].join(' | ')}`);
}

// Layer 5 by string: Kavira Ceramics' figures are the same figures wherever they appear.
const must = [money(P0), money(P1), qty(Q0), qty(Q_SR), qty(Q_LR), pc(PCT_P()), pc(PCT_Q_SR()), pc(PCT_Q_LR()), pesStr(PES_SR()), pesStr(PES_LR())];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 23 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((x) => { pos[x.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`the spine: ${money(P0)} → ${money(P1)} (+${pc(PCT_P())}) · short run ${qty(Q0)} → ${qty(Q_SR)} (+${pc(PCT_Q_SR())}) PES ${pesStr(PES_SR())} · long run ${qty(Q0)} → ${qty(Q_LR)} (+${pc(PCT_Q_LR())}) PES ${pesStr(PES_LR())}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(30)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const x of PRACTICE) console.log(`  ${x.command.padEnd(10)} ${String(x.marks).padStart(2)}  ${x.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const x of problems) console.log(`  - ${x}`); }
else console.log('\npacket checks: no Unit 3 vocabulary, no off-spec term, no 1.3.4 vocabulary, no March example, no UK-only framing, no Outline or Assess, no 10-mark item, no uncited examiner claim, no marker claim, no paper-frequency claim, every Economics command word used exactly once at its own tariff, every block pinned to a quiz item, a practice item and a diagram, every curve re-derived from its function, no cell collision in any view, ids unique, Kavira\'s figures agreeing across every surface');

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

if (DUMP) { const p = `audit/snapshots/packet-23-bundle__economics__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'economics', label: 'packet-23-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
