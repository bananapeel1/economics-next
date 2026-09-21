#!/usr/bin/env node
/**
 * PACKET 19 — planning-raising-finance, IAL Business Unit 2 topic 2.3.1 (23 spec leaves).
 *
 *   node scripts/packet-19-planning-raising-finance.mjs            dry run: build, measure, validate, print
 *   node scripts/packet-19-planning-raising-finance.mjs --stage    stage every changed table as a draft
 *   node scripts/packet-19-planning-raising-finance.mjs --dump     also write the bundle to audit/snapshots/
 *
 * Content in scripts/_packet19-content.mjs (blocks and Notes), scripts/_packet19-assessment.mjs
 * (quiz, practice, flashcards, mistakes, extras) and scripts/_packet19-diagrams.mjs (the five
 * diagrams, three of which are grids). This file assembles the bundle, pins each block to its
 * diagram, quiz and practice items, and runs the checks a verifier will run:
 *
 *   - the validator over the whole would-be section against the committed baseline;
 *   - the reading budget per subsection (step.words, 350), printed for every one;
 *   - phrases that must not survive: pounds sterling, "Outline" and "Examine" (neither is an IAL
 *     BUSINESS command word), "cash-flow forecast" (IAL 2.3.2 · 4, which financial-planning owns —
 *     specGap-05 and topFix-02 asked for it and the spec refuses it), the invented Tesla narrative
 *     and the nine other UK examples this packet replaced, UK-only institutions including the
 *     Companies House and HMRC references topFix-04 names, "per pound", any uncited examiner claim,
 *     any claim about what a marker does, and any claim about how often a paper asks something;
 *   - every practice command word and tariff checked against audit/raw/tariff-census.json for
 *     BUSINESS, where Assess is 10 in Units 1-2 and there is no Outline and no Examine;
 *   - the diagrams' own geometry, re-derived from the emitted SVG rather than asserted: the funding
 *     stack's segments against the sums they carry, the retained-profit bars against the year's
 *     figures, the ownership bands against the share counts, and every grid cell on its own row;
 *   - Layer 5 by string: Yusra Foods' figures appear in the body AND in at least one other surface.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { stageBundle, loadBundle, contextFor, loadBaseline } from './_content-write.mjs';
import { validateSection } from '../lib/content-validator.mjs';
import { SECTION, teachingWords, money, pc, NEED, STACK, stackTotal, OWNER_CAPITAL, FAMILY, BANK_LOAN, ANGEL, PROFIT_AFTER_TAX, DIVIDENDS, retained, DEPOSIT_RATE, retainedOpportunityCost, VAN_SALE, FOUNDER_SHARES, ANGEL_SHARES, ANGEL_PRICE, FLOAT_SHARES, FLOAT_PRICE, floatRaised, sharesAfterAngel, sharesAfterFloat, FOUNDER_AFTER_ANGEL, ANGEL_AFTER_ANGEL, FOUNDER_AFTER_FLOAT, ANGEL_AFTER_FLOAT, PUBLIC_AFTER_FLOAT, stake, LOAN_MONTHLY, LOAN_YEARS, loanRepaid, loanInterest, MACHINE_PRICE, LEASE_MONTHLY, LEASE_MONTHS, leaseTotal, leasePremium, SUPPLY_MONTHLY, CREDIT_DAYS, tradeCreditHeld, GRANT } from './_packet19-util.mjs';
import { buildContent, SUBSECTIONS, NOTES, B1, B2, B3, B4, B5 } from './_packet19-content.mjs';
import { QUIZ, PRACTICE, FLASHCARDS, MISTAKES, EXTRAS } from './_packet19-assessment.mjs';
import { DIAGRAMS, GRD, gridRowY, IBAR, iH, STK, stkW, stkX, OWN, ownW, r2 } from './_packet19-diagrams.mjs';

const args = process.argv.slice(2);
const STAGE = args.includes('--stage');
const DUMP = args.includes('--dump');

/* ── assemble ──────────────────────────────────────────────────────────────── */

/*
 * Exactly THREE quiz items are left unpinned, and they are the FIRST three in the array. PreTest.jsx
 * takes the first three items no block has reserved, in array order and stably since F079, so those
 * three ARE the pre-test — and they go first because a free student's bank is sliced server-side
 * (F086, and V005's freeQuizPayload() since 16 Sep), so a pre-test whose pool sits at the end of the
 * array serves that student PINNED questions instead (packet 16's walkthrough). A fourth unpinned
 * item would reach no surface at all, because the pre-test slices at three (packet 15).
 */
const unpinned = new Set(QUIZ.map((q, i) => (q.block ? -1 : i)).filter((i) => i >= 0));

const byBlock = (items, skip = new Set()) => items.reduce((m, it, i) => { if (!skip.has(i)) (m[it.block] ||= []).push(i); return m; }, {});
const quizByBlock = byBlock(QUIZ, unpinned);
const practiceByBlock = byBlock(PRACTICE);
// The first index is what the chapter check-in shows, so it is the item that best closes the chapter.
const first = (list, q) => { const i = QUIZ.findIndex((x) => x.question === q); return [i, ...list.filter((x) => x !== i)]; };
const quizIndices = {
  [B1]: first(quizByBlock[B1], 'The most important limitation of a business plan is that:'),
  [B2]: first(quizByBlock[B2], 'Which statement about the cost of retained profit is correct?'),
  [B3]: first(quizByBlock[B3], 'Which circumstance most strongly favours equity finance over a bank loan?'),
  [B4]: first(quizByBlock[B4], 'A sole trader cannot raise finance by issuing shares because:'),
  [B5]: first(quizByBlock[B5], 'A profitable partnership wants to raise substantial equity finance for expansion. It must first:'),
};
const practiceIndices = {
  [B1]: practiceByBlock[B1], [B2]: practiceByBlock[B2], [B3]: practiceByBlock[B3],
  [B4]: practiceByBlock[B4], [B5]: practiceByBlock[B5],
};
/*
 * Only a CHECK-IN step carries a diagram, and it comes from the BLOCK (lib/learn-steps.js:44-55), so
 * a diagramId on a subsection is never read — which is why the March section's three `diagramRef`
 * pins resolved to nothing. Every chapter has one here, because this section had ZERO diagrams and
 * two of its five chapters are the ones a table serves best (structure-10).
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
const problems = [];
const count = (re) => texts.reduce((n, s) => n + (s.match(re) || []).length, 0);
const ban = (re, why) => { const n = count(re); if (n) problems.push(`${why} ×${n}`); };

ban(/£/g, 'pounds sterling (one currency per section, dollars)');
ban(/\bper pound\b/gi, '"per pound" (topFix-04: sterling as the unit of comparison)');
ban(/\bOutline\b/g, '"Outline" (not an IAL command word in either subject)');
ban(/\bExamine\b/g, '"Examine" (an IAL Economics command word; Business has none)');
/*
 * The scope decision this packet turns on. specGap-05 and topFix-02 both ask for a subsection on
 * constructing and interpreting a cash-flow forecast. In IAL that is 2.3.2 · 4 (bus_spec.txt:907-908)
 * and the financial-planning section owns it; teaching it here would take another section's leaf,
 * exactly as importing price skimming would have done in packet 18. "Cash flow" as ordinary business
 * language is fine and the spec itself uses it elsewhere; the FORECAST as a taught artefact is not.
 */
ban(/cash.?flow forecast/gi, '"cash-flow forecast" (IAL 2.3.2 · 4 — financial-planning owns it; specGap-05 is refuted)');
ban(/\b(Tesla|JCB|Raspberry Pi|BHS|Pimlico|ASOS|BrewDog|Deliveroo|Grind|Aldi)\b/g, 'a March example this packet replaced (accuracy-01 invented the Tesla narrative; the other nine are the UK skew of structure-09)');
ban(/\b(HMRC|Companies House|NHS|Bank of England|Ofgem|Ofcom|council tax|the Chancellor|Competition and Markets Authority)\b/g, 'a UK-only institution (locale.institution; topFix-04 names HMRC and Companies House)');
ban(/\b(CMA|RPI|ONS|OBR|FTSE)\b/g, 'a UK-only acronym (locale.institution)');
/*
 * Layer 6 found "(specGap-03)" inside a paragraph a student reads — an internal ledger id that had
 * leaked out of the authoring note it belonged in. Nothing else in the pipeline looks for one: the
 * validator has no rule for it and it reads as plausible prose. So every ledger id shape is banned
 * from the content itself, which is the whole class rather than the one instance.
 */
ban(/\((?:specGap|topFix|structure|accuracy|quiz|practice|specThin)-\d+\)/g, 'an internal ledger id left in text a student reads');

for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (/\bexaminers?\s+(?:will\s+|often\s+|usually\s+|typically\s+)?(reward|penalise|penalize|expect|look\s+for|want|like|credit|mark\s+down|award|give)/i.test(sent) && !/\bWBS1[1-4]\b|mark scheme|appendix\s*\d|\(source/i.test(sent)) problems.push(`uncited examiner claim: "${sent.slice(0, 80)}"`);

/*
 * The same class one step out (packet 16's Layer 6 found thirteen): `claim.uncited` only fires on
 * the word "examiners", so a sentence can assert the same thing without naming them. Say what the
 * COMMAND WORD requires, which Appendix 6 states and can therefore be cited; do not say what a
 * marker does with an answer, which cannot. Practice GUIDANCE is exempt: a mark scheme allocating
 * "(1 mark)" is the artefact itself, not a claim about one.
 */
const MARK_CLAIM = /\b(earns?|earning|costs?|loses?|losing)\b[^.!?]{0,60}\bmarks?\b|\b(earns?|scores?) nothing\b|\bmethod marks\b|\bscores? (?:poorly|badly)\b|\bfull marks\b/i;
const guidance = new Set(PRACTICE.map((p) => p.guidance));
for (const s of texts) { if (guidance.has(s)) continue; for (const sent of s.split(/(?<=[.!?])\s+/)) if (MARK_CLAIM.test(sent)) problems.push(`claim about what a marker does: "${sent.trim().slice(0, 90)}"`); }

const FREQUENCY_CLAIM = /\b(almost every paper|every paper|often open|commonly opens?|a common \d+-mark|appear frequently|come up (?:a lot|often)|tested relentlessly|always tested|love this topic|questions love)\b/i;
const PAPER_PATTERN_CLAIM = /\b(a |the |an )?(question|questions|paper|papers|extract|extracts|stem|stems|source|sources)\b[^.!?]{0,40}\b(rarely|usually|typically|normally|often|generally|most of the time|nearly always|hardly ever|seldom)\b/i;
for (const s of texts) for (const sent of s.split(/(?<=[.!?])\s+/)) if (FREQUENCY_CLAIM.test(sent)) problems.push(`claim about how often a paper asks something: "${sent.trim().slice(0, 90)}"`);
for (const s of texts) { if (guidance.has(s)) continue; for (const sent of s.split(/(?<=[.!?])\s+/)) if (PAPER_PATTERN_CLAIM.test(sent) && !/\bWBS1[1-4]\b|appendix\s*\d|mark scheme/i.test(sent)) problems.push(`uncited claim about how papers are built: "${sent.trim().slice(0, 90)}"`); }

// Practice command words and tariffs against the specification's own Appendix 6, for BUSINESS.
const census = JSON.parse(readFileSync('audit/raw/tariff-census.json', 'utf8')).rows.filter((r) => r.subject === 'business');
for (const p of PRACTICE) {
  const row = census.find((r) => r.command === p.command);
  if (!row) problems.push(`practice "${p.command}" is not an IAL Business command word`);
  else if (!row.marks.includes(p.marks)) problems.push(`practice ${p.command} (${p.marks}) — the census allows ${row.marks.join(' or ')}`);
  if (!p.question.includes(`(${p.marks} marks)`)) problems.push(`practice ${p.command}: the stem does not say "(${p.marks} marks)"`);
  if (p.marks > 6 && /\(\d+\s*marks?\)/.test(p.guidance)) problems.push(`practice ${p.command} (${p.marks}): guidance allocates points, but tariffs above 6 are levels-marked`);
}
for (const b of [B1, B2, B3, B4, B5]) {
  if (!(practiceIndices[b] || []).length) problems.push(`block "${b}" has no practice item pinned (structure-02: three of the five practice items never reached a student)`);
  if (!(quizIndices[b] || []).length) problems.push(`block "${b}" has no quiz item pinned`);
  if (!diagramIds[b]) problems.push(`block "${b}" has no diagram pinned (structure-10: the section had zero)`);
}
// pins.identity: the March section pinned 0,1,2,3,4 in block order, which is the sign nobody chose them.
const firstPins = [B1, B2, B3, B4, B5].map((b) => quizIndices[b][0]);
if (firstPins.every((v, i) => v === i)) problems.push('quizIndices are 0,1,2,3,4 in block order again (pins.identity)');

/*
 * Diagram geometry, re-derived from the emitted SVG rather than asserted (packet 15's accuracy-01
 * rule). If a figure in the body changes and a diagram does not, these fail.
 */
const svgOf = (d) => (d.svg ? [d.svg] : d.scenarios.map((s) => s.svg));
const has = (svg, needle, why) => { if (!svg.includes(needle)) problems.push(why); };
{ // 2 · the retained-profit bars, from the year's own figures
  const [bars] = svgOf(DIAGRAMS[1]);
  for (const v of [PROFIT_AFTER_TAX, DIVIDENDS, retained()]) {
    has(bars, `height="${iH(v)}"`, `the bar for ${money(v)} is not drawn at the height the figure gives`);
    has(bars, `>${money(v)}</text>`, `the diagram does not print ${money(v)}`);
  }
  if (iH(PROFIT_AFTER_TAX) <= iH(DIVIDENDS) || iH(PROFIT_AFTER_TAX) <= iH(retained())) problems.push('the profit-after-tax bar is not the tallest, which the arithmetic requires');
  if (PROFIT_AFTER_TAX - DIVIDENDS !== retained()) problems.push('retained() disagrees with profit after tax minus dividends');
  has(bars, money(retainedOpportunityCost()), 'the opportunity cost is not stated on the diagram');
}
{ // 3 · the funding stack: every segment as wide as its share, and the four filling the bar exactly
  const [stackSvg, debtEquity, methods] = svgOf(DIAGRAMS[2]);
  STACK.forEach((s, i) => {
    has(stackSvg, `x="${stkX(i)}" y="${STK.y}" width="${stkW(s.amount)}"`, `the ${s.label} segment is not drawn at the width ${money(s.amount)} gives`);
    has(stackSvg, `>${money(s.amount)}</text>`, `the stack does not print ${money(s.amount)} for ${s.label}`);
  });
  const widths = STACK.reduce((n, s) => n + stkW(s.amount), 0);
  if (Math.abs(widths - STK.w) > 0.05) problems.push(`the four segments come to ${widths} units, not the ${STK.w} of the bar`);
  if (stackTotal() !== NEED) problems.push(`the package comes to ${money(stackTotal())}, not the ${money(NEED)} the section says is needed`);
  // the two grids: each row's cells sit on the row the geometry gives
  for (const [gi, g] of [[0, debtEquity], [1, methods]]) {
    for (let r = 0; r < 6; r += 1) has(g, `y="${gridRowY(r)}"`, `grid ${gi} has no cell on row ${r}`);
  }
  has(methods, `>${money(leaseTotal())} (${money(leasePremium())} over buying)</text>`, 'the methods grid does not carry the lease total and its premium');
  has(methods, `>${money(loanRepaid())} (${money(loanInterest())} interest)</text>`, 'the methods grid does not carry the loan total and its interest');
  if (leaseTotal() !== LEASE_MONTHLY * LEASE_MONTHS) problems.push('leaseTotal() disagrees with its own inputs');
  if (leasePremium() !== leaseTotal() - MACHINE_PRICE) problems.push('leasePremium() is not the lease total less the purchase price');
  if (leasePremium() <= 0) problems.push('leasing is drawn as cheaper than buying, which the figures do not say');
  if (loanRepaid() !== LOAN_MONTHLY * LOAN_YEARS * 12) problems.push('loanRepaid() disagrees with its own inputs');
  if (loanInterest() !== loanRepaid() - BANK_LOAN) problems.push('loanInterest() is not the total repaid less the sum borrowed');
  if (tradeCreditHeld() !== SUPPLY_MONTHLY * (CREDIT_DAYS / 30)) problems.push('tradeCreditHeld() disagrees with its own inputs');
}
{ // 4 · the ownership bands, from the share counts
  const [forms, dilution] = svgOf(DIAGRAMS[3]);
  for (let r = 0; r < 4; r += 1) has(forms, `y="${gridRowY(r)}"`, `the forms grid has no cell on row ${r}`);
  const stages = [[100], [FOUNDER_AFTER_ANGEL(), ANGEL_AFTER_ANGEL()], [FOUNDER_AFTER_FLOAT(), ANGEL_AFTER_FLOAT(), PUBLIC_AFTER_FLOAT()]];
  stages.forEach((parts, i) => {
    if (Math.abs(parts.reduce((a, b) => a + b, 0) - 100) > 0.05) problems.push(`the ownership bands at stage ${i} come to ${parts.reduce((a, b) => a + b, 0)}%, not 100%`);
    let x = OWN.x0;
    for (const p of parts) { has(dilution, `x="${x}" y="${OWN.rows[i]}" width="${ownW(p)}"`, `the ${pc(p)} band at stage ${i} is not drawn at the width its percentage gives`); x = r2(x + ownW(p)); }
    if (Math.abs(x - (OWN.x0 + OWN.w)) > 0.05) problems.push(`the bands at stage ${i} do not fill the bar`);
  });
  if (stake(FOUNDER_SHARES, sharesAfterAngel()) !== FOUNDER_AFTER_ANGEL()) problems.push('FOUNDER_AFTER_ANGEL() disagrees with the share counts');
  if (stake(FOUNDER_SHARES, sharesAfterFloat()) !== FOUNDER_AFTER_FLOAT()) problems.push('FOUNDER_AFTER_FLOAT() disagrees with the share counts');
  if (sharesAfterAngel() !== FOUNDER_SHARES + ANGEL_SHARES) problems.push('sharesAfterAngel() is not the two holdings added');
  if (ANGEL_SHARES * ANGEL_PRICE !== ANGEL) problems.push(`the angel's shares at ${money(ANGEL_PRICE)} do not come to the ${money(ANGEL)} invested`);
  if (FLOAT_SHARES * FLOAT_PRICE !== floatRaised()) problems.push('floatRaised() disagrees with the shares and price at flotation');
  if (FOUNDER_AFTER_FLOAT() >= 50.05) problems.push('the founder is still a majority holder after flotation, which the chapter says they are not');
}
{ // 5 · the liability grid, one row per source
  const [liability] = svgOf(DIAGRAMS[4]);
  for (let r = 0; r < 7; r += 1) has(liability, `y="${gridRowY(r)}"`, `the liability grid has no cell on row ${r}`);
  has(liability, '>Business angel</text>', 'the liability grid does not name the business angel row');
  has(liability, '>Stock market flotation</text>', 'the liability grid does not name the flotation row');
}

/*
 * Grid legibility, and the reason this check exists. Three of the five diagrams are tables, and a
 * table is the one shape whose cells can silently land on top of each other: nothing in the schema
 * or the validator knows how wide a string is. Verify B measured three real collisions with
 * getComputedTextLength() in the browser — "Overdraft, leasing, trade credit" ran 23 units under
 * its own "Yes" — so the geometry was widened and this estimator now stands guard over it. It is
 * set at 0.65em, which is ABOVE the widest per-character advance the browser actually measured
 * across all eight views (0.642em), so it fires before a real overlap can appear. The browser
 * measurement is the ground truth it was set from; it is the cheap guard that keeps it true.
 */
const estWidth = (text, size) => String(text).length * size * 0.65;
for (const [di, d] of DIAGRAMS.entries()) {
  for (const [si, view] of (d.scenarios || [{ svg: d.svg }]).entries()) {
    const rows = {};
    for (const m of view.svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)"[^>]*font-size="(\d+)"[^>]*text-anchor="(\w+)"[^>]*>([^<]*)<\/text>/g)) {
      const [, x, y, size, anchor, text] = m;
      const w = estWidth(text, Number(size));
      const x0 = anchor === 'middle' ? Number(x) - w / 2 : anchor === 'end' ? Number(x) - w : Number(x);
      (rows[y] ||= []).push({ text, x0, x1: x0 + w });
    }
    const width = Number((view.svg.match(/viewBox="0 0 (\d+)/) || [])[1] || 500);
    for (const [y, cells] of Object.entries(rows)) {
      cells.sort((a, c) => a.x0 - c.x0);
      for (let i = 1; i < cells.length; i += 1) if (cells[i].x0 < cells[i - 1].x1) problems.push(`diagram ${di}.${si} row y=${y}: "${cells[i - 1].text}" overlaps "${cells[i].text}"`);
      for (const c of cells) if (c.x1 > width - 2) problems.push(`diagram ${di}.${si}: "${c.text}" runs past the ${width}-unit frame`);
    }
  }
}

const ids = [bundle.quiz, bundle.practice, bundle.flashcards, bundle.mistakes, bundle.diagrams].flatMap((a) => a.map((x) => x.id))
  .concat(bundle.content.map((b) => b.id), bundle.content.flatMap((b) => b.sections.map((s) => s.id)), bundle.content.flatMap((b) => b.sections.map((s) => s.recall?.id)));
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) problems.push(`duplicate ids: ${[...new Set(dup)].join(', ')}`);

// Layer 5 by string: Yusra Foods' figures are the same figures wherever they appear.
const must = [money(NEED), money(OWNER_CAPITAL), money(BANK_LOAN), money(ANGEL), money(retained()), money(retainedOpportunityCost()), money(leaseTotal()), money(leasePremium()), pc(FOUNDER_AFTER_ANGEL()), pc(FOUNDER_AFTER_FLOAT()), money(floatRaised())];
for (const m of must) {
  const inBody = allStrings(bundle.content).some((s) => s.includes(m));
  const inOther = allStrings([bundle.notes, bundle.diagrams, bundle.quiz, bundle.practice, bundle.flashcards, bundle.extras]).some((s) => s.includes(m));
  if (!inBody || !inOther) problems.push(`figure "${m}" is ${inBody ? '' : 'NOT '}in the body and ${inOther ? '' : 'NOT '}in notes/diagrams/assessment`);
}

/* ── report ────────────────────────────────────────────────────────────────── */

console.log(`=== ${SECTION} — packet 19 ${STAGE ? 'STAGE' : 'dry run'}`);
console.log('\nreading budget (step.words, 350):');
for (const s of SUBSECTIONS) { const w = teachingWords(s); console.log(`  ${String(w).padStart(4)}${w > 350 ? '  OVER' : '      '} ${s.title}`); }
const subs = bundle.content.reduce((n, b) => n + b.sections.length, 0);
const recalls = bundle.content.flatMap((b) => b.sections).filter((s) => s.recall);
const byType = recalls.reduce((m, s) => { m[s.recall.type] = (m[s.recall.type] || 0) + 1; return m; }, {});
console.log(`\ncounts: ${bundle.content.length} blocks · ${subs} subsections · ${recalls.length} recalls (${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}) · ${bundle.quiz.length} quiz · ${bundle.practice.length} practice · ${bundle.diagrams.length} diagrams (${bundle.diagrams.reduce((n, d) => n + (d.scenarios?.length || 1), 0)} views) · ${bundle.flashcards.length} cards · ${bundle.mistakes.length} mistakes · ${bundle.extras.chains.length} chains`);
const pos = [0, 0, 0, 0]; bundle.quiz.forEach((q) => { pos[q.correctIndex] += 1; });
console.log(`quiz answer positions: ${pos.join(' / ')} · unpinned for the pre-test: ${[...unpinned].join(', ')}`);
console.log(`the funding package: ${STACK.map((s) => `${s.label} ${money(s.amount)}`).join('  ·  ')}  =  ${money(stackTotal())}`);
console.log(`ownership: 100% → ${pc(FOUNDER_AFTER_ANGEL())} (angel ${pc(ANGEL_AFTER_ANGEL())}) → ${pc(FOUNDER_AFTER_FLOAT())} (angel ${pc(ANGEL_AFTER_FLOAT())}, public ${pc(PUBLIC_AFTER_FLOAT())})`);
console.log('pins:');
for (const b of bundle.content) console.log(`  ${b.title.padEnd(20)} diagram ${(b.diagramId || '—').split(':').pop().padEnd(9)} quiz [${(b.quizIndices || []).join(',')}]  practice [${(b.practiceIndices || []).join(',')}]`);
console.log('practice:'); for (const p of PRACTICE) console.log(`  ${p.command.padEnd(10)} ${String(p.marks).padStart(2)}  ${p.question.slice(0, 74)}`);
if (problems.length) { console.log('\nPROBLEMS:'); for (const p of problems) console.log(`  - ${p}`); }
else console.log('\npacket checks: no pounds, no Outline or Examine, no cash-flow forecast, no March example, no UK-only institution, no uncited examiner claim, no marker claim, no paper-frequency claim, every practice tariff in the Business census, every block pinned to a quiz, a practice item and a diagram, every diagram figure re-derived from the emitted SVG, ids unique, Yusra Foods\' figures agreeing across every surface');

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

if (DUMP) { const p = `audit/snapshots/packet-19-bundle__business__${SECTION}.json`; writeFileSync(p, JSON.stringify({ section_id: SECTION, subject: 'business', label: 'packet-19-bundle', tables: bundle }, null, 1) + '\n'); console.log(`\nbundle written to ${p}`); }

if (!STAGE) { console.log(`\nDry run. Nothing written. Add --stage to write drafts. NOTE: this section is NOT publishable until packets 5 and 7 are on main (DECISIONS 2026-09-15) — its recalls are written to the packet-7 contract and main's ReorderRecall reads recall.shuffled.`); process.exit(problems.length || newBlocks.length ? 1 : 0); }
if (problems.length || newBlocks.length) { console.log('\nNOT STAGED: fix the problems above first.'); process.exit(1); }
const res = await stageBundle(SECTION, bundle);
if (!res.ok) { console.log(`REFUSED: ${res.newBlocks.map((f) => `${f.rule} ${f.detail}`).join('; ')}`); process.exit(1); }
console.log(`\nstaged ${res.staged.length} table(s): ${res.staged.join(', ')}${res.unchanged.length ? ` · unchanged: ${res.unchanged.join(', ')}` : ''}`);
console.log('DO NOT PUBLISH: hold for the packet 5/7 checkpoint (DECISIONS 2026-09-15).');
