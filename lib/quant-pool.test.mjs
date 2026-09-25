import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { templates, buildItem, markItem, correctResponses, listTemplates } from './quant/index.mjs';
import { templatesForSection, quantSeed, quantItem, placeQuantItems } from './quant-pool.js';

/*
 * Packet 13.2. `npm run quant-check` already draws every template 200 times and checks the
 * arithmetic; nothing here repeats that. What is here is everything that check cannot see:
 * whether a template points at a section that exists, whether the pool hands it to the right
 * one, and whether the two surfaces still mount it.
 */

const SPEC = {
  economics: readFileSync(new URL('../audit/raw/econ_spec.txt', import.meta.url), 'utf8'),
  business: readFileSync(new URL('../audit/raw/bus_spec.txt', import.meta.url), 'utf8'),
};

/**
 * The body of one specification section, joined from every block that carries its number —
 * the spec continues a long section on the next page under the same number plus
 * "(continued)", so a single-block read loses half of 1.3.2 and all of 2.3.6.
 */
function specSection(subject, code) {
  const lines = SPEC[subject].split('\n');
  const heading = /^[\f ]*([1-4]\.3\.[1-9])\s+\S/;
  let current = null;
  const out = [];
  for (const line of lines) {
    const m = line.match(heading);
    if (m) current = m[1];
    if (current === code) out.push(line);
  }
  return out.join('\n').toLowerCase();
}

/*
 * THE CHECK THAT WOULD HAVE CAUGHT 13.1's THREE WRONG SPEC CODES, AND THE SECOND HALF OF IT
 * THAT IS THE REASON THE FIRST HALF IS NOT ENOUGH.
 *
 * `ped` shipped `1.2.4` and `multiplier` `2.4.2`: UK GCE numbers, and in the IAL specification
 * every section number has 3 as its middle digit, so neither matches a section in the product
 * and both drills would have been mounted and rendered nowhere. A shape check catches those.
 *
 * It does not catch `breakeven`, which shipped `2.3.1` — a real heading, Planning and raising
 * finance, and the wrong one: break-even is `2.3.2`. Measured, not assumed: packet 13.2 put
 * all three codes back one at a time and the shape check failed two of them and passed this
 * one (`audit/runs/packet-13.2/spec-code-ab.txt`). So each template also names a phrase the
 * specification uses under its own heading, and this asserts the phrase is there. "Margin of
 * safety" appears under 2.3.2 and nowhere near 2.3.1.
 */
test('every template cites a section heading that exists in its own subject specification', () => {
  for (const t of listTemplates()) {
    assert.match(t.specCode, /^[1-4]\.3\.[1-9]$/, `${t.id}: "${t.specCode}" is not an IAL section number`);
    assert.equal(t.specCode[0], t.unit.slice(-1), `${t.id}: ${t.unit} and ${t.specCode} are different units`);
    // A page break sits in front of some headings: the PDF extract carries \f, and a heading
    // that starts a page is `\f2.3.2 Financial planning`. Anchoring on ^ alone finds the
    // Economics headings and misses half the Business ones.
    const body = specSection(t.subject, t.specCode);
    assert.ok(body, `${t.id}: ${t.specCode} is not a heading in the ${t.subject} specification`);
    assert.ok(t.specTerm, `${t.id}: no specTerm, so nothing ties this template to its section`);
    assert.ok(body.includes(t.specTerm.toLowerCase()),
      `${t.id}: the ${t.subject} specification does not use "${t.specTerm}" anywhere under ${t.specCode}`);
  }
});

test('the six areas DRILLS.md names are all registered, and every id is unique', () => {
  const ids = templates.map((t) => t.id);
  assert.equal(new Set(ids).size, ids.length, 'two templates share an id');
  for (const id of ['breakeven', 'arr', 'payback', 'percentage-change-business',
    'percentage-change-economics', 'index-numbers', 'multiplier', 'ped']) {
    assert.ok(ids.includes(id), `${id} is not registered`);
  }
});

/* `quant.unit` in lib/content-validator.mjs counts templates per unit code. These five are what
   packet 13.2 registers; 13.3's twelve templates are what clear WEC13, WEC14, WBS14 and the
   rest. Stated rather than derived, so dropping a template shows up here as a decision. */
test('five unit codes carry at least one template', () => {
  const units = new Set(templates.map((t) => t.unit));
  assert.deepEqual([...units].sort(), ['WBS11', 'WBS12', 'WBS13', 'WEC11', 'WEC12']);
});

test('a section gets the templates that claim its number, and only those', () => {
  const nationalIncome = { subject: 'economics', unitCode: 'WEC12', number: '2.3.4' };
  assert.deepEqual(templatesForSection(nationalIncome).map((t) => t.id), ['multiplier']);

  // Two templates, one section: investment appraisal is payback AND ARR.
  const decisions = { subject: 'business', unitCode: 'WBS13', number: '3.3.3' };
  assert.deepEqual(templatesForSection(decisions).map((t) => t.id).sort(), ['arr', 'payback']);

  // A section nothing claims gets nothing rather than something loosely related.
  assert.deepEqual(templatesForSection({ subject: 'business', unitCode: 'WBS14', number: '4.3.1' }), []);
});

/* 1.3.1 is a section number in BOTH specifications — Meeting customer needs in Business,
   Introductory concepts in Economics — so subject alone is not enough and neither is the
   number. A drill about market share on an Economics PPF section would be the visible failure. */
test('the same section number in the other subject does not pick up the drill', () => {
  const business = templatesForSection({ subject: 'business', unitCode: 'WBS11', number: '1.3.1' });
  assert.deepEqual(business.map((t) => t.id), ['percentage-change-business']);
  assert.deepEqual(templatesForSection({ subject: 'economics', unitCode: 'WEC11', number: '1.3.1' }), []);
  // And a unit code that disagrees with the template's own withholds it.
  assert.deepEqual(templatesForSection({ subject: 'business', unitCode: 'WBS13', number: '1.3.1' }), []);
});

test('the seed is a pure function of section, template and attempt', () => {
  assert.equal(quantSeed('national-income', 'multiplier', 0), quantSeed('national-income', 'multiplier', 0));
  assert.notEqual(quantSeed('national-income', 'multiplier', 0), quantSeed('national-income', 'multiplier', 1));
  assert.notEqual(quantSeed('national-income', 'multiplier', 0), quantSeed('aggregate-demand', 'multiplier', 0));
});

test('the same attempt rebuilds the same item; the next attempt redraws it', () => {
  const section = { sectionId: 'meeting-customer-needs' };
  const first = quantItem(section, 'percentage-change-business', 0);
  assert.equal(first.stem, quantItem(section, 'percentage-change-business', 0).stem);
  assert.notEqual(first.stem, quantItem(section, 'percentage-change-business', 1).stem);
  // The method survives the redraw. That is the claim the drill makes to the student.
  assert.deepEqual(
    quantItem(section, 'percentage-change-business', 1).steps.map((s) => s.id),
    first.steps.map((s) => s.id),
  );
});

test('an unknown template id returns null rather than throwing the step away', () => {
  assert.equal(quantItem({ sectionId: 'x' }, 'no-such-template', 0), null);
  assert.equal(quantItem({ sectionId: '' }, 'multiplier', 0), null);
});

test('a drill goes to the check-in of the chapter that teaches it', () => {
  const multiplier = [{ id: 'multiplier', title: 'The multiplier' }];
  const chapters = ['The Circular Flow of Income', 'Injections and Withdrawals',
    'Equilibrium Output', 'The Multiplier Formula'];
  // Measured on the running section before this rule existed: the even spread put the
  // multiplier drill on check-in 2, one chapter BEFORE 1/MPW is introduced.
  assert.deepEqual(placeQuantItems(multiplier, chapters), { 3: 'multiplier' });
  assert.deepEqual(placeQuantItems(multiplier, ['A', 'B', 'C', 'D']), { 2: 'multiplier' });
});

test('an unmatched drill never lands on the first check-in while there is room elsewhere', () => {
  const two = [{ id: 'arr', title: 'Average rate of return' }, { id: 'payback', title: 'Payback period' }];
  const spread = placeQuantItems(two, ['A', 'B', 'C', 'D', 'E']);
  assert.deepEqual(spread, { 1: 'arr', 3: 'payback' });
  assert.ok(!('0' in spread), 'the first check-in is the one to leave clear when there is a choice');
  assert.equal(new Set(Object.values(spread)).size, 2);

  // A match may use any check-in, including the first: there the chapter is the reason.
  assert.deepEqual(
    placeQuantItems([{ id: 'payback', title: 'Payback period' }], ['Investment appraisal: payback', 'B', 'C']),
    { 0: 'payback' },
  );
});

/*
 * The case Verify A found, and the reason the reservation above is a preference rather than a rule.
 * `decision-making-techniques` is the only WBS13 3.3.3 section and has two chapters, so two
 * check-ins. With slot 0 held back, `arr` took the single free slot and **`payback` rendered
 * nowhere in the product** — built, drawn, marked, tested, green in `quant-check` and unreachable,
 * which is the defect this packet opened with arriving by another route.
 */
test('the reservation yields before a drill goes unplaced', () => {
  const two = [{ id: 'arr', title: 'Average rate of return' }, { id: 'payback', title: 'Payback period' }];
  assert.deepEqual(placeQuantItems(two, ['Quantitative sales forecasting', 'Decision trees']), { 0: 'arr', 1: 'payback' });
  assert.deepEqual(placeQuantItems([{ id: 'a', title: 'A' }], 1), { 0: 'a' }, 'one check-in is still a place to be');
  const three = placeQuantItems([{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }, { id: 'c', title: 'C' }], ['x', 'y', 'z']);
  assert.equal(Object.keys(three).length, 3);
  assert.equal(new Set(Object.values(three)).size, 3, 'and never two drills on one check-in');
});

test('placement degrades rather than failing', () => {
  assert.deepEqual(placeQuantItems([], ['A', 'B']), {});
  assert.deepEqual(placeQuantItems(['a'], 5), { 2: 'a' }, 'a bare id still places');
  // More drills than check-ins: the section takes what fits rather than doubling up.
  const many = placeQuantItems(
    [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }, { id: 'c', title: 'C' }, { id: 'd', title: 'D' }],
    ['x', 'y'],
  );
  assert.equal(Object.keys(many).length, 2);
  assert.equal(new Set(Object.values(many)).size, 2);
});

/*
 * Verify A, under D020: an empty unit code used to SKIP the unit check, and the subject at both
 * call sites comes from `subjectFrom(unitCode)`, which defaults to economics on an empty string.
 * A Business section arriving without its unit code would therefore have been read as Economics
 * and handed `multiplier` on 2.3.4 — a macro drill on resource management.
 */
test('a section with no unit code gets no drill rather than another subject\'s', () => {
  assert.deepEqual(templatesForSection({ subject: 'economics', unitCode: '', number: '2.3.4' }), []);
  assert.deepEqual(templatesForSection({ subject: 'business', unitCode: '', number: '2.3.4' }), []);
  assert.deepEqual(templatesForSection({ subject: 'economics', unitCode: null, number: '1.3.2' }), []);
});

/* The own figure rule, end to end on an item the pool built, because it is the one marking
   behaviour a student is told about in the card's own copy and in Verify B's script. */
test('a second step built on a wrong first answer scores, and is badged as the own figure rule', () => {
  const item = quantItem({ sectionId: 'financial-planning' }, 'breakeven', 0);
  const right = correctResponses(item);
  const contribution = item.steps.find((s) => s.id === 'contribution');
  const breakEven = item.steps.find((s) => s.id === 'breakEven');

  const wrongContribution = contribution.answer + 2;
  const carried = breakEven.ofr({ ...right, contribution: wrongContribution });
  const marked = markItem(item, { ...right, contribution: wrongContribution, breakEven: carried });

  assert.equal(marked.steps.contribution.outcome, 'wrong');
  assert.equal(marked.steps.breakEven.outcome, 'ofr');
  assert.equal(marked.steps.breakEven.awarded, breakEven.marks);
  assert.ok(marked.usedOfr);
  assert.match(marked.steps.breakEven.note, /own earlier figure/);
});

test('every registered template has a step that carries an earlier answer forward', () => {
  for (const t of templates) {
    const item = buildItem(t.id, `ofr-${t.id}`);
    assert.ok(item.steps.some((s) => typeof s.ofr === 'function'),
      `${t.id}: no step applies the own figure rule, so a wrong first answer ends the item`);
  }
});

/*
 * Nothing renders these two components in a test, so deleting the mount would fail nothing.
 * `lib/preview-limits.test.mjs` guards the paywall slice by reading QuizTab.jsx for the same
 * reason; this is that idiom applied to the two surfaces packet 13.2 exists to reach.
 */
const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8');

test('Learn Mode mounts the calculation at its check-ins and names it in the sentence', () => {
  const src = read('../components/LearnModeTab.jsx');
  assert.match(src, /import CalculationItem from '\.\/quant\/CalculationItem'/);
  assert.match(src, /templatesForSection|placeQuantItems/);
  // Two mounts: the check-in step and the legacy block, which is the other shape that renders
  // a quiz. A section on the old content shape must not lose its drill.
  assert.equal((src.match(/<CalculationItem/g) || []).length, 2);
  // Packet 16's defect in a new place: a check-in that carries a calculation and promises
  // only "a quick question" is describing a page the student is not looking at.
  assert.match(src, /currentQuant && 'a calculation'/);
});

test('the Quiz tab mounts the calculation and keeps it out of the quiz score', () => {
  const src = read('../components/QuizTab.jsx');
  assert.match(src, /import CalculationItem from '\.\/quant\/CalculationItem'/);
  assert.match(src, /<CalculationItem/);
  // The score posted to /api/progress/quiz is still the multiple choice only. `displayQuestions`
  // is what it reduces over, and a quant answer never enters `answers`.
  assert.match(src, /const finalScore = displayQuestions\.reduce/);
  assert.ok(!/finalScore \+= |quant.*finalScore|finalScore.*quant/.test(src),
    'the calculation must not be added to the quiz score: /api/progress/quiz compares bests on `total`');
});
