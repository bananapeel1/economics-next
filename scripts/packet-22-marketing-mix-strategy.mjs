#!/usr/bin/env node
/**
 * PACKET 22 — marketing-mix-strategy, the Business section on the marketing mix and strategy.
 *
 *   node scripts/packet-22-marketing-mix-strategy.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-22-marketing-mix-strategy.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-22-marketing-mix-strategy.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet22-content.mjs (blocks and Notes), scripts/_packet22-assessment.mjs (quiz,
 * practice, flashcards, mistakes, extras) and scripts/_packet22-diagrams.mjs (the seven diagrams this
 * section has never had). This file assembles the bundle, pins each block to its diagram, quiz and
 * practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - THE WORDS THIS SECTION MAY NOT USE, which is the largest single risk in this packet. IAL
 *     Business 1.3.3 sets two OPEN requirements — 3a "Types of promotion." and 3b "Types of
 *     branding." — with no bullets under either, and the March section filled both from the UK GCE
 *     textbook. "Above the line", "below the line", ATL, BTL, public relations, sales promotion,
 *     personal selling, direct marketing, individual brand, family brand, corporate brand, own brand
 *     and manufacturer brand ALL return zero occurrences in bus_spec.txt. So do SMART, rational,
 *     disintermediation, e-commerce and the intensive/selective/exclusive distribution taxonomy the
 *     March quiz tested. Each is banned outright on every ASSESSED surface and allowed in the
 *     teaching text only where the section is explicitly telling a student the label is not on this
 *     course; the runner checks the LOCATION, not just the count;
 *   - "Ansoff", which appears twice in bus_spec.txt and both times in Units 3 and 4 (:1098, :1435);
 *   - every practice command word and tariff against audit/raw/tariff-census.json FOR BUSINESS —
 *     Define 2, Calculate 4, Construct 4, Explain 4, Analyse 6, Discuss 8, Assess 10, Evaluate 20;
 *   - claims about what a marker does, how often a paper asks and how papers are built (packet 17),
 *     and notes about this programme's own previous content in text a student reads (packet 18);
 *   - every diagram figure re-derived from Q = 160,000 − 5,000P and Q = 120,000 − 3,000P by reading
 *     the emitted SVG back, so a figure that changes in the body and not in a diagram fails here.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, units, el, share, minus, UNIT_COST, MARKET, TODAY_P, TODAY_Q, PRICES, qU, qB, revU, revB, profitU, profitB, shareU, pedU, pedB, addedValue, MARKUPS, costPlus, PSYCH_P, CHANNELS, chainOf, shelfOf, zolaKeeps, U_REV_PEAK, U_PROFIT_PEAK, B_REV_PEAK, B_PROFIT_PEAK, U_CHOKE, B_CHOKE, U_INTERCEPT, U_SLOPE, B_INTERCEPT, B_SLOPE } from './_packet22-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5, B6, B7 } from './_packet22-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet22-assessment.mjs';
import { DIAGRAMS, PX, PY, STAGES, SALES, PROFIT, EXT_SALES, EXT_FROM, QUADRANTS, OBJECTIVE_PRICES, gridRowY, r2 } from './_packet22-diagrams.mjs';

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

const BLOCKS = [B1, B2, B3, B4, B5, B6, B7];
const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); if (i < 0) throw new Error(`no quiz item: ${q}`); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'Which three marketing objectives does the specification name?'),
  [B2]: first(quizByBlock[B2], 'On a product life cycle diagram, profit:'),
  [B3]: first(quizByBlock[B3], 'Which of these is characteristic of a mass market strategy?'),
  [B4]: first(quizByBlock[B4], 'The three elements of the design mix are:'),
  [B5]: first(quizByBlock[B5], 'The three benefits of strong branding the specification names are:'),
  [B6]: first(quizByBlock[B6], 'Which of these is one of the six factors the specification names as determining the most appropriate pricing strategy?'),
  [B7]: first(quizByBlock[B7], 'A four stage distribution channel runs:'),
};
const practiceIndices = Object.fromEntries(BLOCKS.map((b) => [b, practiceByBlock[b]]));
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why topFix-03's "wire them via diagramRef on
 * blocks 0 and 5" describes a mechanism that has not existed since packet 5, and why this section
 * shipped with meta.diagrams = 0 and no way to have shown one anyway (structure-03).
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
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£|€/g, 'a currency other than dollars (locale.currency; one currency per section)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject — the live practice.command BLOCK)');
ban(/\bExamine\b/g, '"Examine" (an IAL Economics command word; Business has none)');
ban(/\bSMART\b/g, '"SMART" (0 occurrences in bus_spec.txt — structure-06)');
ban(/\bAnsoff\b/gi, '"Ansoff" (bus_spec.txt:1098 and :1435, both UNITS 3 AND 4 — terms.later-unit)');
ban(/\bKAA\b/g, '"KAA" (0 occurrences in bus_spec.txt — topFix-04 asked for it by name)');
ban(/\bdisintermediation\b/gi, '"disintermediation" (0 occurrences in bus_spec.txt — the March block 5 takeaway)');
ban(/\be-?commerce\b/gi, '"e-commerce" (0 occurrences in bus_spec.txt — the March block 5 takeaway)');
ban(/\b(zero|one|two)-level channel\b/gi, 'the "zero/one/two-level" channel naming (the specification says four stage, three stage, two stage — specGap-11)');
ban(/\bstate of the economy\b/gi, '"state of the economy" as a pricing factor (0 occurrences; not one of the six at :653-660 — accuracy-02)');
ban(/\bWarby Parker\b/gi, 'the Warby Parker example, whose "$3 billion valuation through direct distribution alone" was false and undated (accuracy-01)');
ban(/\b(NHS|Bank of England|HMRC|Ofgem|Ofcom|council tax|HS2|the Chancellor|Competition and Markets Authority)\b/g, 'a UK-only institution (locale.institution)');
ban(/\b(CMA|RPI|ONS|OBR)\b/g, 'a UK-only acronym (locale.institution)');
ban(/\bthe March (version|section|copy|item|content)\b/gi, 'a note about this programme\'s own previous content, in text a student reads');
ban(/\bC-[a-z-]+-(topFix|specGap|structure|accuracy|quiz|practice|specThin)-\d\d\b/g, 'a ledger id, in text a student reads (packet 19: "(specGap-03)" reached a paragraph)');

/*
 * A NEGATIVE NUMBER WHERE THE SENTENCE READS A MAGNITUDE. Layer 6 found "costs -8,000 fewer bottles"
 * in a common mistake: `units(qU(24) - qB(24))` subtracted the two the wrong way round, and because
 * JavaScript prints a negative with an ASCII hyphen it arrived as a double negative that said the
 * opposite of what was meant. The instance is one subtraction; the class is any figure that can go
 * negative reaching a sentence that expects a size.
 *
 * The guard is packet 18's minus-sign rule turned into a check: EVERY negative a student reads goes
 * through minus()/el(), which emit U+2212, so an ASCII hyphen-minus in front of a digit is either a
 * sign that should have been formatted or an arithmetic slip. Neither may ship.
 */
/* SVG source is markup, not prose: `transform="rotate(-90,...)"` is a coordinate, not a figure. The
   text a diagram SHOWS is checked by the collision guard and by the per-diagram assertions below. */
for (const s of texts.filter((x) => !/^<svg|<text\b/.test(String(x)))) {
  for (const m of String(s).matchAll(/(^|[\s(>])-\d[\d,.]*/g)) {
    problems.push(`an ASCII hyphen before a digit — a negative that did not go through minus()/el(), or a subtraction the wrong way round: "${String(s).slice(Math.max(0, m.index - 40), m.index + 40).trim()}"`);
  }
}

/*
 * THE OPEN-REQUIREMENT VOCABULARY CHECK, this packet's own rule. 3a and 3b carry no bullets, so the
 * specification prescribes no taxonomy for either, and the textbook ones are absent from the whole
 * document. They are not banned outright — a student who has met them elsewhere is better served by
 * being told where they belong — but they are allowed ONLY in a sentence that says so, and NEVER
 * anywhere a student is assessed.
 */
const OFF_SPEC = [
  [/\babove the line\b|\bbelow the line\b|\bATL\b|\bBTL\b/gi, 'above/below the line', /other textbooks|not in this specification|nothing in this course/i],
  [/\bindividual brand\w*\b|\bfamily brand\w*\b|\bcorporate brand\w*\b|\bown[- ]label brand\w*\b|\bmanufacturer brand\w*\b/gi, 'the individual/family/corporate/own-label branding taxonomy', /other textbooks|not in this specification|nothing in this course/i],
  [/\b(intensive|selective|exclusive) distribution\b/gi, 'the intensive/selective/exclusive distribution taxonomy', /other textbooks|not in this specification/i],
  [/\bpublic relations\b|\bsales promotion\b|\bpersonal selling\b|\bdirect marketing\b/gi, 'a promotion taxonomy term absent from bus_spec.txt', /other textbooks|not in this specification/i],
];
const RECALLS = bundle.content.flatMap((b) => b.sections.map((s) => s.recall));
const ASSESSED = allStrings([bundle.quiz, bundle.practice, bundle.flashcards, RECALLS]).filter((s) => !IDLIKE.test(s));
for (const [re, label, allowedIn] of OFF_SPEC) {
  for (const s of ASSESSED) if (new RegExp(re.source, 'i').test(s)) problems.push(`"${label}" appears on an ASSESSED surface, and it is not in the Business specification: "${String(s).slice(0, 90)}"`);
  for (const s of texts) for (const sent of String(s).split(/(?<=[.!?])\s+/)) {
    if (new RegExp(re.source, 'i').test(sent) && !allowedIn.test(sent)) problems.push(`"${label}" used as if it were this specification's vocabulary: "${sent.trim().slice(0, 90)}"`);
  }
}

for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * `claim.uncited` only fires on the word "examiners", so a sentence can assert the same thing without
 * naming them and pass the validator untouched (packet 16). Say what the COMMAND WORD requires,
 * which Appendix 6 states and which can therefore be cited; do not say what a marker does.
 */
/*
 * "mark-up" is this section's central arithmetic and the word "mark" carries a word boundary before
 * the hyphen, so packet 18's MARK_CLAIM matched fourteen innocent sentences about cost plus pricing.
 * Every alternative now refuses a following "-up" or " up".
 */
const NOT_MARKUP = '(?![-\\s]?up)';
const MARK_CLAIM = new RegExp(`\\b(earns?|earning|costs?|loses?|losing)\\b[^.!?]{0,60}\\bmarks?\\b${NOT_MARKUP}|\\b(earns?|scores?) nothing\\b|\\bmethod marks\\b|\\bscores? (?:poorly|badly)\\b|\\bfull marks\\b`, 'i');
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
// All eight Business command words, because the March set used four and two at the wrong tariff.
for (const row of census) if (!PRACTICE.some((p) => p.command === row.command)) problems.push(`the Business ladder's "${row.command}" is not used anywhere in this section`);

for (const b of BLOCKS) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-02: three of five were never surfaced)`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned (structure-03: diagrams[] was empty)`);
}
if (unpinned.size !== 3) problems.push(`${unpinned.size} unpinned quiz items; the pre-test takes exactly three`);
if ([...unpinned].some((i) => i > 2)) problems.push(`an unpinned quiz item is not in the first three of the array (indices ${[...unpinned].join(', ')}) — a free student would be served a pinned question instead`);
// pins.identity: quizIndices of [0],[1],[2],… is the tell that they were auto-assigned (structure-01).
if (BLOCKS.every((b, i) => quizIndices[b][0] === i)) problems.push('quizIndices are the identity mapping — the pins.identity tell the March section shipped with');
// Every quiz item on a block must be reachable, and no index may be claimed twice.
const claimed = BLOCKS.flatMap((b) => quizIndices[b]);
if (new Set(claimed).size !== claimed.length) problems.push('a quiz index is pinned to two blocks');
if (claimed.length + unpinned.size !== QUIZ.length) problems.push(`${QUIZ.length - claimed.length - unpinned.size} quiz item(s) are neither pinned nor in the pre-test pool`);

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). If a figure in the body changes and a diagram does not, these fail.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };

{ // 1 · the mix, and the objectives table generated from the demand line
  const [mix, objectives] = svgOf(DIAGRAMS[0]);
  for (const el of ['Product', 'Promotion', 'Price', 'Place']) has(mix, `>${el}<`, `the marketing mix diagram does not name "${el}"`);
  for (const p of OBJECTIVE_PRICES) {
    has(objectives, `>${money(p)}</text>`, `the objectives table has no ${money(p)} row`);
    has(objectives, `>${share(shareU(p))}</text>`, `the objectives table does not print a share of ${share(shareU(p))} at ${money(p)}`);
    has(objectives, `>${money(revU(p))}</text>`, `the objectives table does not print revenue of ${money(revU(p))} at ${money(p)}`);
    has(objectives, `>${money(profitU(p))}</text>`, `the objectives table does not print profit of ${money(profitU(p))} at ${money(p)}`);
  }
}
{ // 2 · the life cycle curve and the Boston Matrix
  const [plc, boston] = svgOf(DIAGRAMS[1]);
  for (const s of STAGES) has(plc, `>${s}<`, `the life cycle diagram does not name the "${s}" stage`);
  for (const q of QUADRANTS) has(boston, `>${q.name}<`, `the Boston Matrix does not name the "${q.name}" quadrant`);
  has(boston, '>Market growth<', 'the Boston Matrix does not label the market growth axis');
  has(boston, '>Market share<', 'the Boston Matrix does not label the market share axis');
  // The shape properties a life cycle MUST have, checked against the series rather than asserted.
  const peakSales = SALES.indexOf(Math.max(...SALES)), peakProfit = PROFIT.indexOf(Math.max(...PROFIT));
  if (!(peakProfit < peakSales)) problems.push('profit does not peak before sales, which is the property the life cycle diagram exists to show');
  if (!(PROFIT[0] < 0)) problems.push('the profit curve does not start below zero at introduction');
  if (PROFIT.filter((v, i) => i && Math.sign(v) !== Math.sign(PROFIT[i - 1])).length !== 2) problems.push('the profit curve does not cross zero exactly twice (up in growth, down in decline)');
  if (!SALES.slice(0, peakSales).every((v, i) => v < SALES[i + 1])) problems.push('sales do not rise monotonically to their peak');
  if (!SALES.slice(peakSales).every((v, i, a) => i === 0 || v < a[i - 1])) problems.push('sales do not fall monotonically after their peak');
  if (!(EXT_SALES[EXT_SALES.length - 1] > SALES[SALES.length - 1])) problems.push('the extension strategy does not hold sales ABOVE the unextended curve, so it is not shown as an extension');
}
{ // 3 · the two market-type grids
  const [types, b2b] = svgOf(DIAGRAMS[2]);
  for (const w of ['Mass market', 'Niche market']) has(types, `>${w}</text>`, `the market-types grid does not name "${w}"`);
  for (const w of ['B2B', 'B2C']) has(b2b, `>${w}</text>`, `the B2B grid does not name "${w}"`);
}
{ // 4 · the design mix triangle and the trends grid
  const [tri, trends] = svgOf(DIAGRAMS[3]);
  for (const w of ['Function', 'Aesthetics', 'Cost']) has(tri, `>${w}<`, `the design mix triangle does not name "${w}"`);
  for (const w of ['Waste minimisation', 'Re-use and recycling', 'Ethical sourcing']) has(trends, `>${w}</text>`, `the design trends grid does not name "${w}"`);
  has(trends, '>Lower</text>', 'the design trends grid does not show waste minimisation LOWERING cost, which is the misconception it exists to correct');
}
{ // 5 · the branding pivot, sampled from both demand functions
  const [pivot] = svgOf(DIAGRAMS[4]);
  has(pivot, `${PX(qU(0))},${PY(0)}`, `the unbranded line does not start where Q = ${units(U_INTERCEPT)} − ${units(U_SLOPE)}P puts it at a price of zero`);
  has(pivot, `${PX(qB(0))},${PY(0)}`, `the branded line does not start where Q = ${units(B_INTERCEPT)} − ${units(B_SLOPE)}P puts it at a price of zero`);
  for (const p of [TODAY_P, 24]) {
    has(pivot, `cx="${PX(qU(p))}" cy="${PY(p)}"`, `the unbranded point at ${money(p)} is not plotted at ${units(qU(p))} bottles`);
    has(pivot, `cx="${PX(qB(p))}" cy="${PY(p)}"`, `the branded point at ${money(p)} is not plotted at ${units(qB(p))} bottles`);
  }
  if (PX(qU(TODAY_P)) !== PX(qB(TODAY_P))) problems.push('the two lines do not meet at today\'s price, so the diagram shows a shift rather than a pivot');
  if (PY(B_CHOKE) >= PY(0)) problems.push('the price axis is inverted: a higher price must be drawn higher');
  /*
   * The benefits grid moved out of this diagram (a checklist and a table cannot share one), so the
   * six figures it carried are checked where a student now meets them instead: the teaching text,
   * and at least one of Notes, flashcards or extras.
   */
  for (const v of [el(pedU(TODAY_P)), el(pedB(TODAY_P)), units(qU(24)), units(qB(24)), money(profitU(24)), money(profitB(24)), money(U_PROFIT_PEAK), money(B_PROFIT_PEAK)]) {
    if (!allStrings(bundle.content).some((x) => x.includes(v))) problems.push(`"${v}" is not in the teaching text, and the branding grid that used to carry it has gone`);
    if (!allStrings([bundle.notes, bundle.flashcards, bundle.extras]).some((x) => x.includes(v))) problems.push(`"${v}" is in the body but in no Note, card or chain`);
  }
}
{ // 6 · the six strategies and the cost-plus bars
  const [strategies, costplus] = svgOf(DIAGRAMS[5]);
  for (const w of ['Cost plus', 'Price skimming', 'Penetration', 'Predatory', 'Competitive', 'Psychological']) has(strategies, `>${w}</text>`, `the pricing grid does not name "${w}"`);
  for (const m of MARKUPS) {
    has(costplus, `>${m}% mark-up</text>`, `the cost-plus diagram has no ${m}% row`);
    has(costplus, `>= ${money(costPlus(m))}</text>`, `the cost-plus diagram does not print ${money(costPlus(m))} for the ${m}% mark-up`);
  }
}
{ // 7 · the channel ladder, every price the mark-up chain produces
  const [ladder] = svgOf(DIAGRAMS[6]);
  for (const ch of CHANNELS) {
    has(ladder, `>${ch.name}: ${ch.path}</text>`, `the channel ladder does not name the ${ch.name} channel and its route`);
    for (const p of chainOf(ch)) has(ladder, `>${money(p)}</text>`, `the ${ch.name} chain does not print ${money(p)}`);
    has(ladder, `>Zola keeps ${money(zolaKeeps(ch))}</text>`, `the ladder does not say what Zola keeps on the ${ch.name} channel`);
  }
  if (shelfOf(CHANNELS[0]) !== shelfOf(CHANNELS[1])) problems.push('the four stage and three stage channels no longer reach the consumer at the same price, which is the point the chapter makes');
}

/*
 * TEXT COLLISION, the class rather than the instance. The 390x844 walkthrough found the Boston
 * Matrix caption printing on top of the "Market share" axis label — six units apart with
 * eleven-unit text. Nothing could have caught it: the runner checks which STRINGS an SVG contains,
 * the validator checks that cells are legible, and Layer 6 reads the JSON, so none of the three can
 * see two labels land in the same place. Packet 19 measured horizontal overflow inside a grid; this
 * is the same measurement in the other axis, over every diagram in the section.
 *
 * Width is estimated pessimistically at 0.62em per character against the 0.642em packet 19 measured
 * with getComputedTextLength(), so the guard errs towards reporting a collision that is not there.
 */
const textBoxes = (svg) => [...svg.matchAll(/<text\b([^>]*)>([^<]*)</g)].map(([, attrs, body]) => {
  const at = (n) => { const m = attrs.match(new RegExp(`\\b${n}="([^"]*)"`)); return m ? m[1] : null; };
  const size = parseFloat(at('font-size') || '10');
  const w = body.length * size * 0.62;
  const x = parseFloat(at('x') || '0');
  const anchor = at('text-anchor') || 'start';
  const left = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x;
  return { y: parseFloat(at('y') || '0'), left, right: left + w, size, body, rotated: /transform="rotate/.test(attrs) };
});
for (const d of DIAGRAMS) {
  for (const [vi, sc] of (d.scenarios || [{ svg: d.svg }]).entries()) {
    const boxes = textBoxes(sc.svg).filter((b) => !b.rotated && b.body.trim());
    for (let i = 0; i < boxes.length; i += 1) for (let j = i + 1; j < boxes.length; j += 1) {
      const a = boxes[i]; const b = boxes[j];
      const apart = Math.abs(a.y - b.y);
      if (apart >= Math.max(a.size, b.size) * 1.1) continue;     // different lines
      if (a.right <= b.left || b.right <= a.left) continue;      // side by side
      problems.push(`"${d.title}" view ${vi + 1}: "${a.body.slice(0, 28)}" and "${b.body.slice(0, 28)}" are ${apart.toFixed(1)} units apart and overlap horizontally`);
    }
  }
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Zola's figures are the same figures wherever they appear.
const must = [money(TODAY_P), units(TODAY_Q), share(shareU(TODAY_P)), money(revU(TODAY_P)), el(pedU(TODAY_P)), el(pedB(TODAY_P)), money(costPlus(MARKUPS[2])), money(shelfOf(CHANNELS[1])), money(zolaKeeps(CHANNELS[0])), money(addedValue(TODAY_P))];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}
// and the arithmetic itself, recomputed here rather than trusted
for (const p of PRICES) {
  if (qU(p) !== U_INTERCEPT - U_SLOPE * p) problems.push(`qU(${p}) disagrees with Q = ${U_INTERCEPT} − ${U_SLOPE}P`);
  if (qB(p) !== B_INTERCEPT - B_SLOPE * p) problems.push(`qB(${p}) disagrees with Q = ${B_INTERCEPT} − ${B_SLOPE}P`);
  if (revU(p) !== p * qU(p)) problems.push(`revU(${p}) is not price × quantity`);
  if (profitU(p) !== (p - UNIT_COST) * qU(p)) problems.push(`profitU(${p}) is not margin × quantity`);
}
if (qU(TODAY_P) !== qB(TODAY_P)) problems.push('the two demand lines do not pass through the same point at today\'s price, so branding is not drawn as a pivot');
if (PRICES.some((p) => revU(p) > revU(U_REV_PEAK))) problems.push('a price in the table beats the revenue peak, so U_REV_PEAK is not where revenue is highest');
if (PRICES.some((p) => profitU(p) > profitU(U_PROFIT_PEAK))) problems.push('a price in the table beats the unbranded profit peak');
if (PRICES.some((p) => profitB(p) > profitB(B_PROFIT_PEAK))) problems.push('a price in the table beats the branded profit peak');
if (!(U_REV_PEAK !== U_PROFIT_PEAK)) problems.push('revenue and profit peak at the same price, so the objectives block has nothing to show');
if (!(Math.abs(pedB(TODAY_P)) < Math.abs(pedU(TODAY_P)))) problems.push('branding does not REDUCE price elasticity of demand, which is the benefit 3c-3 names');
if (!(B_PROFIT_PEAK > U_PROFIT_PEAK)) problems.push('branding does not raise the profit-maximising price, so the premium price benefit is not shown');
if (!(profitB(24) > profitU(24))) problems.push(`profit at ${money(24)} is not higher with the brand than without it`);
if (!(profitU(24) < profitU(TODAY_P))) problems.push(`raising the price to ${money(24)} does not LOSE profit without the brand, so the contrast is not there`);
for (const m of MARKUPS) if (costPlus(m) !== UNIT_COST * (1 + m / 100)) problems.push(`the ${m}% cost-plus price disagrees with its own mark-up`);
if (!MARKUPS.every((m) => PRICES.includes(costPlus(m)))) problems.push('a cost-plus mark-up produces a price the objectives table has no row for');
for (const ch of CHANNELS) {
  const chain = chainOf(ch);
  if (chain.length !== ch.steps.length) problems.push(`the ${ch.name} chain has ${chain.length} prices for ${ch.steps.length} stages`);
  if (zolaKeeps(ch) !== r2(chain[0] - UNIT_COST)) problems.push(`what Zola keeps on the ${ch.name} channel is not its receipt less the unit cost`);
}
if (!(zolaKeeps(CHANNELS[2]) > zolaKeeps(CHANNELS[1]) && zolaKeeps(CHANNELS[1]) > zolaKeeps(CHANNELS[0]))) problems.push('a shorter channel does not leave the producer more, which is the chapter\'s whole point');

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 22 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + d.scenarios.length, 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`Zola: unbranded Q = ${units(U_INTERCEPT)} − ${units(U_SLOPE)}P, branded Q = ${units(B_INTERCEPT)} − ${units(B_SLOPE)}P, both through ${money(TODAY_P)} / ${units(TODAY_Q)}; unit cost ${money(UNIT_COST)}`);
console.log(`  ${PRICES.map((p) => `${money(p)}→${units(qU(p))} (${share(shareU(p))}, ${money(revU(p))}, ${money(profitU(p))})`).join('  ')}`);
console.log(`  peaks: revenue ${money(U_REV_PEAK)} · profit ${money(U_PROFIT_PEAK)} unbranded, ${money(B_PROFIT_PEAK)} branded · PED at ${money(TODAY_P)} ${el(pedU(TODAY_P))} → ${el(pedB(TODAY_P))}`);
console.log(`  cost plus: ${MARKUPS.map((m) => `${m}%→${money(costPlus(m))}`).join('  ')}`);
console.log(`  channels: ${CHANNELS.map((c) => `${c.stages}-stage ${chainOf(c).map(money).join('→')} keeps ${money(zolaKeeps(c))}`).join(' · ')}`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.slice(0, 34).padEnd(34)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 68)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: one currency, no Outline/Examine/SMART/Ansoff/KAA, no ATL or BTL or branding taxonomy or intensive-selective-exclusive on any assessed surface, no "state of the economy" pricing factor, no Warby Parker claim, no UK-only institution, no uncited examiner or marker or paper claim, no ledger id in student text, every practice tariff in the BUSINESS census and all eight command words used, every block pinned to a quiz, a practice item and a diagram, pins not the identity mapping, every diagram figure re-derived from the two demand functions, ids unique, Zola\'s figures agreeing across every surface');

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

if (DUMP) { const p = `audit/snapshots/packet-22-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-22-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
