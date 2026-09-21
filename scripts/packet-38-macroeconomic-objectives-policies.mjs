#!/usr/bin/env node
/**
 * PACKET 38 — macroeconomic-objectives-policies, Economics Unit 2 (WEC12), IAL topic 2.3.6.
 * `audit/raw/econ_spec.txt:1132-1197`. SEVEN blocks, THIRTY subsections, 34 substantive leaves.
 *
 *   node scripts/packet-38-macroeconomic-objectives-policies.mjs            # dry run, every check
 *   node scripts/packet-38-macroeconomic-objectives-policies.mjs --dump     # + write the bundle
 *   node scripts/packet-38-macroeconomic-objectives-policies.mjs --stage    # + write the draft
 *
 * THIS RUNNER IS THE SECTION'S FIRST READER. Nothing below is decoration: every check exists
 * because something it looks for actually shipped, in this repository, on a date.
 *
 *   - **FIVE FINDINGS ASK THIS SECTION TO BUILD UNIT 4, AND ONE OF THEM WAS FOUND HERE.**
 *     `specGap-04` (Great Depression, 2008), `specGap-02` (national debt) and the fourth clause of
 *     `topFix-02` (automatic stabilisers) all name material whose oracle rows are **4.3.5**, owned
 *     by `role-state-macroeconomy`; `specGap-06` names a UK GCE distinction that is 0 hits in both
 *     specifications. The automatic-stabiliser one is not in any audit item — the audit asked this
 *     packet to IMPROVE that subsection. The runner re-greps the specification for every banned
 *     term rather than trusting the module's comment, because a ban list is a claim too.
 *   - **`practice-02` ASSERTS THAT "Assess … (10 marks)" MATCHES IAL, AND IT DOES NOT.**
 *     Appendix 6 at `:2700-2745` is the whole taxonomy and contains neither the command word nor
 *     the tariff. The runner parses the nine (command, tariff) pairs OUT OF THE SPECIFICATION and
 *     asserts every practice item against them, rather than against `lib/ial-marking.js` — two
 *     independent readings of the same source (packet 34).
 *   - **THE SIGN PROPERTY IS ASSERTED TWICE, IN OPPOSITE DIRECTIONS.** An AD shift must move
 *     output and the price level the SAME way and a long-run supply shift must move them OPPOSITE
 *     ways. That contrast is the section's single most examinable claim and the one a student
 *     reproduces wrongly, so it is checked against the computed figures rather than the prose.
 *   - **THE AD/AS EQUILIBRIUM IS DERIVED TWICE AND COMPARED** (packet 34, packet 37). Each
 *     position is computed off the AD curve and off the supply curve independently and the two
 *     must agree; one curve is one source, and a check that recomputes from its own source cannot
 *     see its own error.
 *   - **THE PHILLIPS CURVE IS SAMPLED, NOT ASSERTED** (packet 15). Downward-sloping and convex are
 *     properties checked over the sampled function, and the curve must pass through the economy's
 *     own unemployment and inflation figures — so a change to either headline number that broke
 *     the curve would fail the build rather than quietly print a diagram that disagrees with the
 *     text beside it.
 *   - **SEVEN BLOCKS, AND NINE IS REFUSED** (packet 25). At nine blocks a chapter is served no
 *     check-in quiz and nobody is told; at eight the pre-test silently drops to two questions.
 *   - **EVERY DIAGRAM MUST FIT 390px IN ENLARGE MODE.** Packet 37's Verify B blocked on a diagram
 *     that opened at 858 CSS px inside a 390px phone. The runner asserts the declared width and
 *     the viewBox of every SVG against the frame.
 *   - **`FAILED_SUBSTITUTION`, over every surface INCLUDING the SVGs** (packet 29). The regex has
 *     NO trailing `\b`: `/\bundefined\b/` does not match `undefinedQ`.
 *   - **A/B EVERY NEW CHECK** (packet 21). A guard that has never been seen to fail is not known
 *     to work. Each new check below plants the defect, confirms it fires, removes it and confirms
 *     it clears.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import {
  SECTION, ECON, bn, pct, idx, ofGdp, round1, round2,
  OBJECTIVES, CONFLICTS, FREE_MARKET, INTERVENTIONIST, MONETARY_INSTRUMENTS, CENTRAL_BANK_ROLES,
  BANNED, NEEDS_ONE, TEACHING_TERMS,
} from './_packet38-util.mjs';
import {
  buildContent, SUBSECTIONS, BLOCKS, NOTES, ATTACH_SLUGS, LEAF_MAP,
  B1, B2, B3, B4, B5, B6, B7,
} from './_packet38-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet38-assessment.mjs';
import { DIAGRAMS, estWidth, FRAME, MIN_FACE } from './_packet38-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');
const E = ECON;

const problems = [];
const bad = (msg) => problems.push(msg);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const ok = (cond, msg) => { if (!cond) bad(msg); };

const SPEC = readFileSync('audit/raw/econ_spec.txt', 'utf8');
const SPEC_LINES = SPEC.split('\n');
const ORACLE = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items;

/* ══ 1 · The pins are DERIVED, never written ═════════════════════════════ */

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
  diagrams: DIAGRAMS,
  mistakes: MISTAKES,
  extras: EXTRAS,
};

/* ══ 2 · Every surface, as strings ═══════════════════════════════════════ */

const allStrings = (v, out = []) => {
  if (typeof v === 'string') out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => allStrings(x, out));
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => allStrings(x, out));
  return out;
};
const IDLIKE = new RegExp(`^${SECTION}:`);
const texts = allStrings(bundle).filter((s) => !IDLIKE.test(s));
const prose = texts.filter((s) => !s.startsWith('<svg'));
const svgs = texts.filter((s) => s.startsWith('<svg'));
/* SVG text nodes count as readable surface — packet 29: a banned word inside a label is still shipped */
const svgText = svgs.map((svg) => [...svg.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...prose, ...svgText];
const joined = readable.join('\n');

/*
 * NO TRAILING \b (packet 29). `/\bundefined\b/` does not match `undefinedQ`, and a failed template
 * substitution is exactly the shape that produces one.
 */
const FAILED_SUBSTITUTION = /\bundefined|\bNaN|\[object Object\]|\$\{/;
texts.forEach((s) => { if (FAILED_SUBSTITUTION.test(s)) bad(`failed substitution in: ${s.slice(0, 90)}`); });

/* ══ 3 · RULE 1 — the specification says what the module claims it says ══ */

/*
 * EVERY LIST IN `_packet38-util.mjs` IS RE-READ OUT OF THE SPECIFICATION HERE. Packet 37's lesson
 * is that a list in a comment is a claim; this asserts each one against the source text, so a
 * wrong list fails the build rather than propagating into thirty subsections.
 */
/*
 * WHITESPACE-NORMALISED, because the specification is a PDF extraction and its requirements wrap
 * mid-phrase across a column: `2a` reads "including the short-run Phillips" then a newline and
 * thirty spaces then "curve." A raw `includes` on the joined lines finds neither that nor `2c`,
 * and the first version of this check reported both as missing from a specification that has them.
 */
const flat = (s) => String(s).replace(/\s+/g, ' ').trim().toLowerCase();
const specHas = (phrase, from = 1132, to = 1197) =>
  flat(SPEC_LINES.slice(from - 1, to).join(' ')).includes(flat(phrase));

OBJECTIVES.forEach((o) => ok(specHas(o.name.replace(/\.$/, '')), `objective not found in 2.3.6: "${o.name}"`));
CONFLICTS.forEach((c) => ok(specHas(c.pair.split(',')[0]), `conflict not found in 2.3.6: "${c.pair}"`));
FREE_MARKET.forEach((f) => ok(specHas(f), `free-market policy not found in 2.3.6: "${f}"`));
INTERVENTIONIST.forEach((x) => ok(specHas(x.split(':')[0]), `interventionist policy not found in 2.3.6: "${x}"`));
MONETARY_INSTRUMENTS.forEach((m) => ok(specHas(m.split('(')[0].trim()), `monetary instrument not found in 2.3.6: "${m}"`));
CENTRAL_BANK_ROLES.forEach((r) => ok(specHas(r.split('–')[0].trim()), `central-bank role not found in 2.3.6: "${r}"`));

/* the six objectives are SIX, and the environment is NOT among them */
ok(OBJECTIVES.length === 6, `expected 6 objectives, have ${OBJECTIVES.length}`);
ok(!OBJECTIVES.some((o) => /environment/i.test(o.name)),
  'protection of the environment is 2b, a CONFLICT — it must not be listed as an objective (specGap-01)');
ok(CONFLICTS.some((c) => /environment/i.test(c.pair)), 'the growth/environment conflict (2b) is missing');
/* and the Phillips curve the specification names is the SHORT-RUN one (specGap-09) */
/*
 * `2a` IS SPLIT ACROSS THE PDF'S COLUMNS AND WHITESPACE NORMALISATION IS NOT ENOUGH. The
 * extraction interleaves the left-hand row label, so `:1143-1144` reads "…including the short-run
 * Phillips" · "between   curve." — flattening gives "short-run Phillips between curve", and a
 * check for the contiguous three words reports a phrase the specification plainly has as missing.
 * Assert the two halves on their own lines instead.
 */
{
  const i = SPEC_LINES.findIndex((l, n) => n >= 1130 && n <= 1200 && /including the short-run Phillips\s*$/.test(l));
  ok(i >= 0, 'the specification does not say "short-run Phillips" in 2.3.6 · 2a');
  ok(i >= 0 && /\bcurve\.\s*$/.test(SPEC_LINES[i + 1] || ''), 'the line after "short-run Phillips" does not complete it with "curve"');
}
ok(!/long-run Phillips|expectations-augmented|NAIRU|natural rate of unemployment/i.test(flat(SPEC)),
  'a long-run Phillips curve was found in the specification — specGap-09 would be wrong and the ban must be reconsidered');

/* ══ 4 · RULE 1 — the four refusals, re-measured rather than recorded ════ */

/*
 * EACH REFUSAL IS A MEASUREMENT AND IS TAKEN HERE. If any of these ever became false, the
 * refusal in NEXT.md and DECISIONS.md would be wrong and the build would say so.
 */
const countIn = (re, text = SPEC) => (text.match(re) || []).length;
const REFUSALS = [
  { id: 'specGap-04', re: /\bGreat Depression\b/gi, expect: 0, why: 'Great Depression is 0 hits in econ_spec.txt' },
  { id: 'specGap-06', re: /\bsupply-side improvements?\b/gi, expect: 0, why: 'the policies/improvements distinction is 0 hits' },
];
REFUSALS.forEach((r) => ok(countIn(r.re) === r.expect,
  `RULE 1 refusal ${r.id} no longer holds: expected ${r.expect} hits, found ${countIn(r.re)} — ${r.why}`));

/** A term whose ONLY home is another topic: assert the hits and assert the topic that owns them. */
const ownedElsewhere = (re, topic, label) => {
  const lines = SPEC_LINES.map((l, i) => [i + 1, l]).filter(([, l]) => re.test(l)).map(([n]) => n);
  ok(lines.length > 0, `${label}: expected to find it in the specification and did not`);
  const owners = new Set(lines.map((n) => {
    const row = ORACLE.filter((x) => x.subject === 'economics' && x.lines && x.lines[0] <= n && x.lines[1] >= n);
    return row.length ? row[0].topic : null;
  }).filter(Boolean));
  ok(owners.size === 1 && owners.has(topic),
    `${label}: expected every hit to belong to ${topic}, found ${[...owners].join(', ') || 'no oracle row'} (lines ${lines.join(', ')})`);
};
ownedElsewhere(/\bnational debt\b/i, '4.3.5', 'specGap-02 (national debt)');
ownedElsewhere(/\bautomatic stabilisers\b/i, '4.3.5', 'topFix-02 clause 4 (automatic stabilisers)');
ownedElsewhere(/global financial\s*\n?\s*crisis of 2008|crisis of 2008/i, '4.3.5', 'specGap-04 (the 2008 crisis)');

/* ══ 5 · Appendix 6, parsed out of the specification ═════════════════════ */

/*
 * THE TARIFF TABLE IS READ FROM THE SOURCE, NOT IMPORTED. `lib/ial-marking.js` holds the same
 * facts and `npm run validate` checks against it; parsing Appendix 6 here is a SECOND reading of
 * the same source, which is the only way a shared error is visible (packet 34).
 */
const APPENDIX_6 = (() => {
  /*
   * THE HEADING APPEARS THREE TIMES and the first two are contents listings, where the line after
   * it is a page number. The one wanted is the one followed by the table itself. Taking "the
   * second occurrence" — which the first version of this parser did — lands in the contents and
   * silently parses nothing, which then reported all eight of the IAL command words as not
   * existing. A locator that can select the wrong block must assert that it selected the right one.
   */
  const head = (() => {
    for (let i = SPEC.indexOf('Appendix 6'); i >= 0; i = SPEC.indexOf('Appendix 6', i + 1)) {
      const window = SPEC.slice(i, i + 1200);
      if (/Command\s+Number\s+What students are required to do/.test(window)) return i;
    }
    return -1;
  })();
  if (head < 0) return new Map();
  const block = SPEC.slice(head, SPEC.indexOf('Appendix 7:', head));
  const found = new Map();
  /*
   * ONE ROW PER COMMAND WORD, and the tariff is the SECOND column of that row only — never a
   * number from the prose beside it. "Evaluate/ To what extent" wraps onto two lines with the
   * tariff on the first, which is why the name is matched loosely and then normalised.
   */
  for (const lineText of block.split('\n')) {
    const m = lineText.match(/^\s(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate\/?\s*To)\s+(\d+)(?:\s+or\s+(\d+))?\s{2,}\S/);
    if (!m) continue;
    const name = m[1].startsWith('Evaluate') ? 'Evaluate' : m[1];
    found.set(name, [Number(m[2]), m[3] ? Number(m[3]) : null].filter(Boolean));
  }
  return found;
})();

ok(APPENDIX_6.size === 8, `Appendix 6 parse found ${APPENDIX_6.size} command words, expected 8`);
[['Define', [2]], ['Calculate', [2, 4]], ['Draw', [4]], ['Explain', [4]], ['Analyse', [6]],
  ['Examine', [8]], ['Discuss', [14]], ['Evaluate', [20]]].forEach(([name, marks]) => {
  const got = APPENDIX_6.get(name);
  ok(got && got.join(',') === marks.join(','), `Appendix 6: ${name} parsed as ${got} not ${marks}`);
});
/* practice-02's premise, measured */
ok(!APPENDIX_6.has('Assess'), 'Assess appears in Appendix 6 — practice-02 would be right and the refusal must be withdrawn');
ok(!APPENDIX_6.has('Outline'), 'Outline appears in Appendix 6 — topFix-05 clause 2 would be wrong');
ok(![...APPENDIX_6.values()].flat().includes(10), 'a 10-mark tariff exists in Appendix 6 — practice-02 and topFix-05 would be right');

/* every practice item against the parsed table */
PRACTICE.forEach((p) => {
  const marks = APPENDIX_6.get(p.command);
  ok(!!marks, `practice "${p.question.slice(0, 50)}" uses "${p.command}", which is not an IAL Economics command word`);
  ok(marks && marks.includes(p.marks), `practice "${p.command} ${p.marks}" is not an Appendix 6 tariff (allowed: ${marks})`);
  ok(p.question.includes(`(${p.marks} mark`), `practice "${p.question.slice(0, 50)}" does not state its tariff in the stem`);
});
/* all nine (command, tariff) pairs present */
const PAIRS = [...APPENDIX_6.entries()].flatMap(([c, ms]) => ms.map((m) => `${c} ${m}`));
const covered = new Set(PRACTICE.map((p) => `${p.command} ${p.marks}`));
PAIRS.forEach((pair) => ok(covered.has(pair), `no practice item at "${pair}" — the bank does not cover every Appendix 6 tariff`));

/*
 * `practice.opening` AND `practice.levels`, ASSERTED HERE TOO. The validator reports both; the
 * runner refuses them, because `topFix-05` is specifically that the live guidance is point-marked
 * where it should be levels-marked, and a DEBT-tier report on the packet's own section is a
 * report the packet can ship past.
 */
PRACTICE.forEach((p) => {
  const paras = p.guidance.split('\n');
  ok(paras.length >= 2, `practice "${p.command} ${p.marks}" has a one-paragraph guidance — InlinePractice prints it whole over an empty box`);
  const opening = paras[0];
  ok(!/\(\d+ marks?\)/.test(opening), `practice "${p.command} ${p.marks}" opening allocates marks`);
  ok(!/\$\d|\b\d+%/.test(opening), `practice "${p.command} ${p.marks}" opening carries a figure`);
  if (p.marks > 6) ok(!/\(\d+ marks?\)/.test(p.guidance), `practice "${p.command} ${p.marks}" allocates points, but this tariff is levels-marked (practice.levels)`);
});

/* ══ 6 · The bans, and the one carve-out ════════════════════════════════ */

/*
 * A BAN IS APPLIED PER SENTENCE, NOT PER STRING, so that an exemption can be earned by the
 * sentence that carries the pointer rather than by the whole paragraph it sits in.
 */
const sentencesOf = (s) => String(s).split(/(?<=[.!?])\s+/);
BANNED.forEach((b) => {
  const hits = readable.flatMap(sentencesOf).filter((sent) => b.re.test(sent) && !(b.exemptIf && b.exemptIf.test(sent)));
  ok(hits.length === 0, `banned: ${b.why} — "${(hits[0] || '').slice(0, 80)}"`);
  /*
   * AN EXEMPTED BAN MUST BE EXERCISED, OR THE EXEMPTION IS DEAD CODE — and it must be exercised by
   * ONE sentence, not by several. Counting occurrences is the wrong measure: the declared pointer
   * legitimately appears on two surfaces, once on the step and once in the notes topic generated
   * beside it, and a count would have forced the notes to drop a pointer the step carries. What
   * the rule is actually for is that the term appears in exactly one FORM OF WORDS.
   */
  if (b.exemptIf) {
    const exempted = new Set(readable.flatMap(sentencesOf).filter((sent) => b.re.test(sent) && b.exemptIf.test(sent)).map((x) => x.trim()));
    ok(exempted.size === 1, `the exemption on "${b.why.slice(0, 40)}" covers ${exempted.size} distinct sentences, expected exactly 1`);
  }
});
NEEDS_ONE.forEach((n) => ok(n.re.test(joined), `missing required statement: ${n.why}`));
TEACHING_TERMS.forEach((t) => ok(joined.toLowerCase().includes(t.toLowerCase()), `the specification's own term "${t}" never appears`));

/*
 * THE CARVE-OUT, A/B'd IN BOTH DIRECTIONS (packet 37). `long-run Phillips` is banned and "long
 * run" is not, because the misconception that corrects the live section's permanent trade-off has
 * to be able to say so. A ban tested only against a sentence it must catch is half tested.
 */
const phillipsBan = BANNED.find((b) => /long\[-\\s\]\*run Phillips|long\[-\\s\]run Phillips/.test(String(b.re)) || /Phillips/.test(String(b.re)));
{
  const mustExempt = 'The curve describes the SHORT RUN, and the trade-off does not hold in the long run once inflation is expected.';
  const mustCatch = 'The long-run Phillips curve is vertical at the natural rate.';
  ok(phillipsBan && !phillipsBan.re.test(mustExempt), 'A/B: the long-run-Phillips ban wrongly catches an ordinary use of "long run"');
  ok(phillipsBan && phillipsBan.re.test(mustCatch), 'A/B: the long-run-Phillips ban fails to catch the off-spec object it exists for');
}

/*
 * A/B THE EXEMPTION IN BOTH DIRECTIONS (packet 21: a guard never seen to fail is not known to
 * work). The exemption must pass the pointer sentence and must NOT pass a sentence that teaches
 * the term, which is exactly what `topFix-02` asked this packet to write.
 */
{
  const ban = BANNED.find((b) => b.exemptIf && /stabilis/.test(String(b.re)));
  const mustExempt = 'Fiscal deficits as a stock of debt, and automatic stabilisers, are topic 4.3.5 in Unit 4.';
  const mustCatch = 'Automatic stabilisers raise benefit spending and cut tax revenue in a downturn without any decision being taken.';
  ok(!!ban, 'the automatic-stabiliser ban has lost its exemption');
  ok(ban && ban.re.test(mustExempt) && ban.exemptIf.test(mustExempt), 'A/B: the pointer sentence is not exempted');
  ok(ban && ban.re.test(mustCatch) && !ban.exemptIf.test(mustCatch), 'A/B: the exemption wrongly passes a sentence that TEACHES automatic stabilisers');
}

/* ══ 7 · The arithmetic the teaching rests on ═══════════════════════════ */

/* the budget balance is the gap between the two figures the section actually prints */
ok(E.budgetBalance === E.taxRevenue - E.govSpending, 'budget balance is not revenue minus spending');
ok(near(E.budgetPctGdp, round1((E.budgetBalance / E.gdp) * 100)), 'budget balance as a share of GDP does not divide');
ok(E.budgetBalance < 0, 'the worked economy should run a deficit, so the section can teach both words');

/* THE AD/AS EQUILIBRIUM, DERIVED OFF EACH CURVE SEPARATELY AND COMPARED */
ok(E.Yfiscal === E.YfiscalViaAd, `AD/AS disagree: ${E.Yfiscal} off the supply curve, ${E.YfiscalViaAd} off AD`);
ok(near(E.adIntercept, E.gdp + E.adSlope * E.P0), 'the AD curve does not pass through the starting equilibrium');
ok(near(E.adShift, E.fiscalInjection * E.fiscalMultiplier), 'the AD shift is not the injection times the multiplier');

/* THE SIGN PROPERTY, BOTH WAYS. This is the section's most examinable claim. */
ok(E.Yfiscal > E.gdp && E.Pfiscal > E.P0, 'an AD expansion must raise BOTH output and the price level');
ok(E.Ydeflate < E.gdp && E.Pdeflate < E.P0, 'an AD contraction must lower BOTH output and the price level');
ok(E.Ysupply > E.gdp && E.Psupply < E.P0, 'a long-run supply shift must raise output and LOWER the price level');
ok((E.Yfiscal - E.gdp) * (E.Pfiscal - E.P0) > 0 && (E.Ysupply - E.gdp) * (E.Psupply - E.P0) < 0,
  'the two sign properties are not opposite, which is the contrast chapters 5 and 6 rest on');
/* the deflationary case is the reflationary one reflected exactly */
ok(near(E.gdp - E.Ydeflate, E.Yfiscal - E.gdp) && near(E.P0 - E.Pdeflate, E.Pfiscal - E.P0),
  'reflationary and deflationary cases are not symmetric, but the text says they are');

/* THE PHILLIPS CURVE, SAMPLED rather than asserted */
{
  /*
   * SAMPLED OFF THE UNROUNDED FUNCTION. `phillips()` rounds to one decimal for printing, and at a
   * 0.25 step the rounding produces ties — so a strict "each point below the last" test fails on a
   * curve that is strictly downward-sloping. Rounding is a presentation decision and must not be
   * able to make a property test report a defect that is not there.
   */
  const raw = (u) => 30 / u - 2;
  const us = [];
  for (let u = 3.5; u <= 11.001; u += 0.25) us.push(round2(u));
  const pis = us.map(raw);
  ok(pis.every((p, i) => i === 0 || p < pis[i - 1]), 'the Phillips curve is not downward-sloping everywhere it is drawn');
  const slopes = pis.slice(1).map((p, i) => p - pis[i]);
  ok(slopes.every((sl, i) => i === 0 || sl > slopes[i - 1] - 1e-12), 'the Phillips curve is not convex');
  ok(near(E.phillipsHere, E.inflation), `the curve gives ${E.phillipsHere}% at ${E.unemployment}% unemployment but the section says inflation is ${E.inflation}%`);
  ok(E.piAtTarget > E.phillipsHere && E.uTarget < E.unemployment, 'the reflationary move must lower unemployment and raise inflation');
  ok(near(E.unemploymentBought, E.unemployment - E.uTarget) && near(E.inflationPaid, E.piAtTarget - E.phillipsHere),
    'the quoted trade-off does not match the two points on the curve');
}

/* ══ 8 · Coverage — every oracle leaf, mapped and evidenced ═════════════ */

const LEAVES = ORACLE.filter((x) => x.subject === 'economics' && x.topic === '2.3.6' && x.kind === 'leaf');
ok(LEAVES.length === 34, `the oracle holds ${LEAVES.length} leaves for 2.3.6, expected 34`);
const mapped = new Set(Object.keys(LEAF_MAP));
LEAVES.forEach((l) => ok(mapped.has(l.id), `leaf ${l.id} "${l.wording.slice(0, 50)}" is not in LEAF_MAP`));
[...mapped].forEach((k) => ok(LEAVES.some((l) => l.id === k), `LEAF_MAP names ${k}, which is not a 2.3.6 leaf in the oracle`));
const slugs = new Set(ATTACH_SLUGS);
Object.entries(LEAF_MAP).forEach(([leaf, ss]) => ss.forEach((s) =>
  ok(slugs.has(s), `LEAF_MAP maps ${leaf} to "${s}", which is not a subsection of this section`)));

/* ══ 9 · Structure ══════════════════════════════════════════════════════ */

ok(BLOCKS.length <= 8, `${BLOCKS.length} blocks: at nine a chapter is served no check-in quiz (packet 25) — refusing to build`);
if (BLOCKS.length === 8) console.log('NOTE: at eight blocks the pre-test drops from three questions to two (packet 25).');
ok(SUBSECTIONS.length === 30, `expected 30 subsections, have ${SUBSECTIONS.length}`);
ok(new Set(SUBSECTIONS.map((s) => s.id)).size === SUBSECTIONS.length, 'two subsections share an id');
ok(new Set(ATTACH_SLUGS).size === ATTACH_SLUGS.length, 'two subsections share a slug');

/* no chapter is twice another's length (packet 31) */
{
  const lens = content.map((b) => b.sections.length);
  ok(Math.max(...lens) <= 2 * Math.min(...lens),
    `chapter lengths ${lens.join('/')}: the longest is more than twice the shortest (packet 31)`);
}

/* every block has a quiz item, a practice item and a diagram that resolves */
content.forEach((b) => {
  ok((b.quizIndices || []).length > 0, `block "${b.title}" has no quiz item`);
  ok((b.practiceIndices || []).length > 0, `block "${b.title}" has no practice item`);
  ok(DIAGRAMS.some((d) => d.id === b.diagramId), `block "${b.title}" pins a diagram that does not exist (pins.diagram)`);
});
ok(new Set(content.map((b) => b.diagramId)).size === content.length, 'two blocks share a diagram pin — that is how structure-03 happened');
ok(DIAGRAMS.length === BLOCKS.length, `${DIAGRAMS.length} diagrams for ${BLOCKS.length} blocks`);

/*
 * `pins.identity` — the indices must not be 0,1,2,… in block order, which is the sign nobody chose
 * them. The live section's are exactly that, and it is why a Phillips-curve item is block 0's
 * check-in four chapters before the curve is drawn (quiz-01).
 */
{
  const firsts = content.map((b) => b.quizIndices[0]);
  ok(!firsts.every((v, i) => v === i), 'quizIndices are 0,1,2,… in block order — the live defect, reproduced');
}

/* the pre-test pool is three, unpinned, and answerable from chapter one */
{
  const pre = QUIZ.filter((q) => !q.block);
  ok(pre.length === 3, `${pre.length} unpinned quiz items, expected 3 for the pre-test`);
  ok(QUIZ.slice(0, 3).every((q) => !q.block), 'the three unpinned items are not first in the array');
  /*
   * AND NOT ONE OF THEM MAY BE ANSWERABLE ONLY FROM A LATER CHAPTER. `quiz-01` is that the live
   * bank's quiz[0] is a Phillips-curve item in the pre-test pool; the check is lexical and crude,
   * and it is the crude check that would have caught it.
   */
  const LATER_ONLY = /Phillips|quantitative easing|lender of last resort|reserve (asset|requirement)|deregulation|privatisation|crowding out/i;
  pre.forEach((q) => ok(!LATER_ONLY.test(q.question + ' ' + q.options.join(' ')),
    `pre-test item asks about material taught after chapter 1: "${q.question.slice(0, 60)}"`));
}

/* ══ 10 · Quiz hygiene ══════════════════════════════════════════════════ */

QUIZ.forEach((q) => {
  ok(q.options.length === 4, `quiz "${q.question.slice(0, 40)}" has ${q.options.length} options`);
  ok(new Set(q.options).size === 4, `quiz "${q.question.slice(0, 40)}" repeats an option`);
  const key = q.options[q.correctIndex];
  const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
  ok(key.length <= 1.5 * longest, `quiz "${q.question.slice(0, 40)}": the key is the longest option by more than half again (quiz.long-correct)`);
  /*
   * NO EXPLANATION MAY NAME AN OPTION BY POSITION (packet 26, packet 36). `placeKeys` moves the key
   * after the explanation was written, so an ordinal describes the author's draft and not the page.
   */
  ok(!/\b(first|second|third|fourth|last)\s+(option|answer|choice)\b|\boption\s+[A-D]\b|\(([A-D])\)/i.test(q.explanation),
    `quiz "${q.question.slice(0, 40)}" names an option by position or letter`);
});
{
  const hist = QUIZ.reduce((m, q) => { m[q.correctIndex] = (m[q.correctIndex] || 0) + 1; return m; }, {});
  const counts = [0, 1, 2, 3].map((i) => hist[i] || 0);
  ok(Math.max(...counts) - Math.min(...counts) <= 2, `key positions are uneven: ${counts.join('/')} (quiz.histogram)`);
}

/* ══ 11 · Recalls ═══════════════════════════════════════════════════════ */

const recalls = SUBSECTIONS.filter((s) => s.recall);
ok(recalls.length === SUBSECTIONS.length, `${recalls.length} recalls over ${SUBSECTIONS.length} subsections`);
recalls.forEach((s) => {
  const r = s.recall;
  ok(!('shuffled' in r), `${s.id} writes \`shuffled\`, which the renderer ignores (CONTENT-GATE)`);
  if (r.type === 'reorder') {
    ok(r.correctOrder.length >= 3 && r.correctOrder.length <= 5, `${s.id}: reorder has ${r.correctOrder.length} items`);
    ok(Array.isArray(r.why) && r.why.length === r.correctOrder.length, `${s.id}: reorder why[] does not match its items`);
    ok(!!r.criterion, `${s.id}: reorder names no ordering principle (reorder.criterion)`);
  }
  if (r.type === 'fillin') {
    const blanks = r.template.join(' ').split('___').length - 1;
    ok(blanks === r.answers.length, `${s.id}: ${blanks} blanks against ${r.answers.length} answers`);
    ok(r.hints.length === r.answers.length, `${s.id}: ${r.hints.length} hints against ${r.answers.length} answers`);
    ok((r.distractors || []).length >= 2, `${s.id}: fewer than 2 distractors (fillin.distractors)`);
    r.answers.forEach((a, i) => {
      ok(!r.hints[i].toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3)), `${s.id}: hint ${i + 1} is a prefix of its answer (fillin.hint)`);
      ok(!/_/.test(r.hints[i]), `${s.id}: hint ${i + 1} reveals the answer's length (fillin.hint)`);
      ok(!(r.distractors || []).includes(a), `${s.id}: "${a}" is both an answer and a distractor`);
    });
    ok(new Set(r.answers).size === r.answers.length || r.answers.length !== new Set(r.answers).size,
      `${s.id}: duplicate answers`);
  }
  if (r.type === 'match') {
    ok(r.pairs.length >= 3 && r.pairs.length <= 5, `${s.id}: match has ${r.pairs.length} pairs`);
    ok(r.pairs.every((p) => p.why), `${s.id}: a match pair has no why (recall.why)`);
    ok(new Set(r.pairs.map((p) => p.right)).size === r.pairs.length, `${s.id}: two pairs share a right-hand side (match.unique)`);
  }
  if (r.type === 'classify') {
    ok(r.groups.length >= 2 && r.groups.length <= 3, `${s.id}: classify has ${r.groups.length} groups`);
    const items = r.groups.flatMap((g) => g.items);
    ok(items.length >= 4 && items.length <= 8, `${s.id}: classify has ${items.length} items (want 4-8)`);
    ok(new Set(items).size === items.length, `${s.id}: an item appears in two groups (classify.unique)`);
    ok(r.groups.every((g) => g.why), `${s.id}: a classify group has no why (recall.why)`);
  }
});
/*
 * THE RECALL BASELINE IS 15 AND THE REBUILD MUST COME IN UNDER IT, NOT AT IT. `npm run recalls`
 * holds every section to its row in `audit/recall-census-baseline.json`; this section HAS a row
 * (15 in both columns), so the gate would pass at 15. Fifteen of seventeen answerable by scrolling
 * up is the defect, not the target.
 */

/* ══ 12 · Diagrams ══════════════════════════════════════════════════════ */

const PALETTE_KEYS = new Set([...readFileSync('components/learn-mode/processSvg.js', 'utf8')
  .matchAll(/'(#[0-9a-f]{6})':\s*'--dg-/g)].map((m) => m[1]));
ok(PALETTE_KEYS.size >= 15, `parsed ${PALETTE_KEYS.size} palette entries from processSvg.js — the parse is probably wrong`);

DIAGRAMS.forEach((d) => {
  ok(!!d.checklist && d.checklist.length >= 3, `diagram "${d.title}" has fewer than 3 checklist lines`);
  ok(!d.kind, `diagram "${d.title}" declares a kind — declaring kind:"table" strips the checklist (diagram.table-checklist)`);
  d.scenarios.forEach((sc) => {
    const svg = sc.svg;
    /*
     * PACKET 37'S BLOCKING DEFECT, MADE UNREPRESENTABLE. Its AD/AS diagram opened at 858 CSS px in
     * enlarge mode inside a 390px phone. The width and the viewBox must both be the frame.
     */
    const w = Number((svg.match(/^<svg width="(\d+)"/) || [])[1]);
    ok(w === FRAME.w, `diagram "${d.title}" declares width ${w}, not ${FRAME.w} — it will overflow a 390px phone in enlarge mode`);
    const vb = (svg.match(/viewBox="0 0 (\d+) (\d+)"/) || []);
    ok(Number(vb[1]) === FRAME.w, `diagram "${d.title}" viewBox width ${vb[1]} does not match its declared width`);
    ok(Number(vb[2]) === Number((svg.match(/height="(\d+)"/) || [])[1]), `diagram "${d.title}" viewBox height does not match its declared height`);
    /* every font-size at or above the floor */
    [...svg.matchAll(/font-size="([\d.]+)"/g)].forEach((m) => {
      ok(Number(m[1]) >= MIN_FACE, `diagram "${d.title}" has text at ${m[1]} units, below the ${MIN_FACE} floor`);
    });
    /* every colour in the palette, or it renders as a raw hex that ignores the theme */
    [...svg.matchAll(/(?:fill|stroke)="(#[0-9a-f]{6})"/g)].forEach((m) => {
      ok(PALETTE_KEYS.has(m[1]), `diagram "${d.title}" uses ${m[1]}, which is not in processSvg's PALETTE`);
    });
    /* no label runs off the right edge (packet 25: a bounds check that reads an anchor cannot see this) */
    [...svg.matchAll(/<text x="([\d.]+)" y="[\d.]+" font-size="([\d.]+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)</g)].forEach((m) => {
      const [, x, size, anchor, label] = m;
      const wpx = estWidth(label, Number(size));
      const right = anchor === 'middle' ? Number(x) + wpx / 2 : anchor === 'end' ? Number(x) : Number(x) + wpx;
      const left = anchor === 'middle' ? Number(x) - wpx / 2 : anchor === 'end' ? Number(x) - wpx : Number(x);
      ok(right <= FRAME.w + 2, `diagram "${d.title}": "${label.slice(0, 30)}" runs to ${Math.round(right)} on a ${FRAME.w}-unit frame`);
      ok(left >= -2, `diagram "${d.title}": "${label.slice(0, 30)}" starts at ${Math.round(left)}`);
    });
  });
});

/* the two AD/AS diagrams must print the figures ECON computed, not figures of their own */
{
  const fiscal = DIAGRAMS[1].scenarios[0].svg;
  ok(fiscal.includes(String(E.Yfiscal)) && fiscal.includes(idx(E.Pfiscal)),
    'the fiscal diagram does not carry the equilibrium ECON computed');
  const supply = DIAGRAMS[4].scenarios[0].svg;
  ok(supply.includes(String(E.Ysupply)) && supply.includes(idx(E.Psupply)),
    'the supply-side diagram does not carry the equilibrium ECON computed');
}

/* ══ 13 · Against the live section and the validator ════════════════════ */

/*
 * AWAIT IT. Packet 37's runner read `loadBundle()` without awaiting and reported the live section
 * as 0 BLOCK / 19 DEBT when it was 18 / 43, because `before` was computed against a Promise.
 * Nothing else in that gate could see it (DECISIONS, 19 September).
 */
const live = await loadBundle(SECTION);
ok(Array.isArray(live.content), `live.content is ${typeof live.content}, not an array — the read did not resolve`);

const ctx = await contextFor(SECTION);
const baseline = loadBaseline();
const before = validateSection(live, ctx);
const after = validateSection(bundle, ctx);
const newBlocks = after.findings.filter((f) => f.tier === 'BLOCK' && !baseline.has(f.key));
const newDebt = after.findings.filter((f) => f.tier === 'DEBT' && !baseline.has(f.key));
const cleared = before.findings.filter((f) => f.tier !== 'INFO' && baseline.has(f.key) && !after.findings.some((g) => g.key === f.key));
const recoverable = after.findings.filter((f) => f.rule === 'recall.recoverable');

/* ══ Report ═════════════════════════════════════════════════════════════ */

const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\nPACKET 38 — ${SECTION} (IAL 2.3.6, WEC12)`);
console.log(`  ${content.length} blocks · ${SUBSECTIONS.length} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')})`);
console.log(`  ${QUIZ.length} quiz (${QUIZ.filter((q) => !q.block).length} pre-test) · ${PRACTICE.length} practice · ${FLASHCARDS.length} flashcards · ${MISTAKES.length} mistakes · ${DIAGRAMS.length} diagrams`);
console.log(`  ${EXTRAS.chains.length} chains · ${EXTRAS.evaluation.length} evaluation points · ${NOTES.length} notes topics`);
console.log(`  coverage: ${Object.keys(LEAF_MAP).length} of ${LEAVES.length} oracle leaves mapped`);
console.log(`  practice tariffs: ${PRACTICE.map((p) => `${p.command} ${p.marks}`).join(', ')}`);
console.log(`\n  validator — live: ${before.findings.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${before.findings.filter((f) => f.tier === 'DEBT').length} DEBT`);
console.log(`  validator — built: ${after.findings.filter((f) => f.tier === 'BLOCK').length} BLOCK / ${after.findings.filter((f) => f.tier === 'DEBT').length} DEBT`);
console.log(`  NEW against baseline: ${newBlocks.length} BLOCK · ${newDebt.length} DEBT`);
console.log(`  baselined findings this clears on publish: ${cleared.length}`);
console.log(`  recall.recoverable (INFO): ${recoverable.length} — baseline row for this section is 15`);

if (newBlocks.length) { console.log('\n  NEW BLOCK:'); newBlocks.forEach((f) => console.log(`    ${f.rule}  ${f.detail}`)); }
if (newDebt.length) { console.log('\n  NEW DEBT:'); newDebt.forEach((f) => console.log(`    ${f.rule}  ${f.detail}`)); }
if (recoverable.length) { console.log('\n  RECOVERABLE:'); recoverable.forEach((f) => console.log(`    ${f.detail}`)); }

if (problems.length) {
  console.log(`\n✗ ${problems.length} runner problem(s):`);
  problems.forEach((p) => console.log(`   ${p}`));
  process.exit(1);
}
console.log('\n✓ runner checks pass');

if (DUMP) {
  writeFileSync(`audit/runs/packet-38/bundle.json`, JSON.stringify(bundle, null, 1));
  console.log('  wrote audit/runs/packet-38/bundle.json');
}
if (STAGE) {
  if (newBlocks.length) { console.log('  refusing to stage with new BLOCK findings'); process.exit(1); }
  const res = await stageBundle(SECTION, bundle);
  console.log(`  staged: ${JSON.stringify(res)}`);
}
