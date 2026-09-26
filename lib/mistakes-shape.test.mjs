/**
 * The mistakes reader against REAL live cards, one per shape found in section_common_mistakes.data on
 * 26 Sep 2026 (read-only census: audit/runs/mistakes-shape/samples.mjs). Each expectation names the
 * source field by hand, so this does not grade the reader against itself: if a field mapping changes,
 * the named field stops matching. Plus the tab must read through the reader and never a raw field.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readMistake, mistakeGaps } from './mistakes-shape.js';

const REAL = [
 {
  "shape": "correction|examTip|mistake|title",
  "section": "supply",
  "card": {
   "id": "supply:mistake:399b1863",
   "title": "Confusing a movement along the curve with a shift of it",
   "examTip": "Say \"quantity supplied rose\" for a price change, and \"supply rose\" only when something other than the price has changed.",
   "mistake": "Writing that a rise in the price of a good \"increases supply\", or drawing a second curve when only the price has changed.",
   "correction": "The curve is the answer to \"how much at each price\", so the good's own price cannot move it. A price change is an extension or contraction along the existing curve; only a non-price factor shifts the curve itself."
  },
  "wrong": "mistake",
  "why": "",
  "right": "correction"
 },
 {
  "shape": "instead|looks_like|title|why",
  "section": "market-failure",
  "card": {
   "id": "market-failure:mistake:fff22e39",
   "why": "That band is the external cost on EVERY unit produced, including the units that were worth making. IAL 1.3.5 · 2d asks for identification of the welfare loss area, which is the triangle bounded by the social optimum and the market quantity, between MSC and MPB. In the cement market the two are $50 and $500 a day — ten times apart, on one diagram.",
   "title": "Marking the total external cost as the welfare loss",
   "instead": "Find both quantities first, then shade only between them. A cost is not a loss if the unit it buys is worth more than it costs society.",
   "looks_like": "Shading the whole band between MPC and MSC, from the origin out to the market quantity, and calling it the welfare loss."
  },
  "wrong": "looks_like",
  "why": "why",
  "right": "instead"
 },
 {
  "shape": "fix|looks_like|title|why",
  "section": "aggregate-demand",
  "card": {
   "id": "aggregate-demand:mistake:4b2caa6a",
   "fix": "Say which property you mean. C is the largest and the most stable; I is the most volatile.",
   "why": "Size and volatility are different properties of the same component. Consumption is much the largest because households buy most of what an economy produces, and it is the STEADIEST, because households smooth their spending across good years and bad. Investment is the smallest of the three positive components and by far the most volatile: a firm can buy no machines at all this year and still open tomorrow, and nobody can postpone eating.",
   "title": "Saying consumption is the most volatile component",
   "looks_like": "Writing that consumption is both the largest component of AD and the most volatile, because it is the biggest so it must move the most."
  },
  "wrong": "looks_like",
  "why": "why",
  "right": "fix"
 },
 {
  "shape": "fix|quote|title|why",
  "section": "resource-management",
  "card": {
   "id": "resource-management:mistake:10977f9d",
   "fix": "Before writing either word, ask whether the figure has been divided by anything. If it has not, it is production.",
   "why": "Production is how much came out. Productivity is how much came out for each unit of input. Hire enough extra people and a business raises the first while lowering the second, which is exactly the case an examiner sets.",
   "quote": "\"Output rose by 5%, so productivity improved.\"",
   "title": "Using productivity and production as the same word"
  },
  "wrong": "quote",
  "why": "why",
  "right": "fix"
 },
 {
  "shape": "correction|mistake|title",
  "section": "poverty-inequality",
  "card": {
   "id": "poverty-inequality:mistake:d380cba7",
   "title": "Not interpreting the Lorenz curve correctly",
   "mistake": "Students confuse which axis shows cumulative income and which shows cumulative population, or cannot identify what a shift means.",
   "correction": "X-axis = cumulative % of population (from poorest to richest). Y-axis = cumulative % of income. The 45° line = perfect equality. The further the Lorenz curve bows from the 45° line, the greater the inequality."
  },
  "wrong": "mistake",
  "why": "",
  "right": "correction"
 },
 {
  "shape": "error|fix|title|why",
  "section": "planning-raising-finance",
  "card": {
   "id": "planning-raising-finance:mistake:ff37fed1",
   "fix": "Ask who handed over the money. If the answer is anyone other than the business or its owner, the source is external, whether the arrangement is a loan, a lease, supplier credit or a share issue.",
   "why": "The test is not whether ownership changed — it is where the money came from. Internal finance is generated by the business itself: the owner's capital, profit it retained, assets it owned and sold. Everything else is external, however it is structured, because someone outside the business provided it.",
   "error": "Students list a bank overdraft or trade credit as internal finance because no shares were issued for it.",
   "title": "Confusing Internal and External Sources"
  },
  "wrong": "error",
  "why": "why",
  "right": "fix"
 }
];

for (const c of REAL) {
  test(`a live ${c.shape} card (${c.section}) renders both boxes from the fields that hold them`, () => {
    const m = readMistake(c.card);
    assert.equal(m.title, c.card.title.trim());
    assert.equal(m.wrong, c.card[c.wrong].trim(), `the mistake box shows ${c.wrong}`);
    assert.equal(m.right, c.card[c.right].trim(), `the correct-approach box shows ${c.right}`);
    assert.equal(m.why, c.why ? c.card[c.why].trim() : '');
    assert.deepEqual(mistakeGaps(c.card), []);
  });
}

test('a card in a shape nobody reads is reported, not rendered blank', () => {
  assert.deepEqual(mistakeGaps({ title: 'X', trap: 'a', better: 'b' }).length, 2);
  assert.deepEqual(mistakeGaps({ looks_like: 'a', instead: 'b' }), ['title']);
  assert.deepEqual(mistakeGaps(null), ['not an object']);
});

test('MistakesTab reads authored cards only through readMistake', () => {
  const src = readFileSync('components/MistakesTab.jsx', 'utf8');
  assert.match(src, /import \{ readMistake \} from '@\/lib\/mistakes-shape'/);
  assert.match(src, /const item = readMistake\(raw\)/);
  assert.doesNotMatch(src, /item\.(mistake|correction|looks_like|instead|quote|error|fix)\b/, 'no raw field read survives in the tab');
});
