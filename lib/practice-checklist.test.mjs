/**
 * The self-mark checklist against REAL live guidance (section_practice.data, 26 Sep 2026). Every
 * expected box is written out by hand from the guidance text, so this does not grade the function
 * against itself.
 *
 * The defect (packets 43 and 44 Verify B): economic-growth's 2-mark Define offered three boxes — the
 * advice paragraph fused onto mark point 1, and the closing "earns nothing" sentence as a box worth
 * nothing. A read-only census of all 354 live items on the day: 127 carried a 0-mark box and 110 offered
 * more boxes than the question has marks; with the split below, none, and all 887 marked boxes are
 * unchanged apart from losing the fused advice.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { checklistFrom } from './practice-checklist.js';

// economic-growth practice[0], Define, 2 marks.
const DEFINE_2 = "A definition has two parts to it, so say what increases and then say what that thing means. Be careful not to define actual growth by mistake: the two terms are the pair most often swapped.\nAn increase in an economy's productive capacity (1 mark), meaning the real output it could produce if all its resources were fully and efficiently employed (1 mark). \"An increase in real GDP\" defines actual growth and earns nothing here; \"when LRAS shifts right\" or \"when the PPF shifts out\" describes how it is shown, which can support a definition but does not replace one.";

// economic-growth practice[1], Explain, 4 marks.
const EXPLAIN_4 = "This asks for an impact, so it needs a chain of two linked steps, not a single assertion. Decide which part of aggregate demand exports belong to before you start, and say what has to be true of the economy for extra demand to become extra output.\nKnowledge and understanding: exports are a component of aggregate demand, so a rise in exports raises AD (1 mark). Application: foreign buyers ordering more means domestic firms receive more orders for their output (1 mark). Analysis, first stage: where there is spare capacity, firms meet the orders by producing more, so real output rises (1 mark). Analysis, second stage: the incomes earned are partly spent again, so AD and output rise by more than the first rise in exports — the multiplier of topic 2.3.4 (1 mark). An answer that says exports rise so GDP rises has the knowledge and none of the chain.";

test('a 2-mark Define offers two boxes, the two mark points, and nothing else', () => {
  assert.deepEqual(checklistFrom(DEFINE_2), [
    { text: "An increase in an economy's productive capacity", marks: 1 },
    { text: 'meaning the real output it could produce if all its resources were fully and efficiently employed', marks: 1 },
  ]);
});

test('the advice paragraph never fuses onto the first mark point', () => {
  const [first] = checklistFrom(EXPLAIN_4);
  assert.equal(first.text, 'Knowledge and understanding: exports are a component of aggregate demand, so a rise in exports raises AD');
  assert.doesNotMatch(first.text, /\n|This asks for an impact/);
});

test('the closing "earns nothing" sentence is not a box', () => {
  const boxes = checklistFrom(EXPLAIN_4);
  assert.deepEqual(boxes.map((c) => c.marks), [1, 1, 1, 1]);
  assert.ok(boxes.every((c) => !/has the knowledge and none of the chain/.test(c.text)));
});

test('a single paragraph of marked points still splits, with no "." box (packet 5)', () => {
  assert.deepEqual(checklistFrom('Define X (2 marks). Explain Y (2 marks).'), [
    { text: 'Define X', marks: 2 },
    { text: 'Explain Y', marks: 2 },
  ]);
});

test('guidance with no "(n marks)" anywhere keeps its single item, as before', () => {
  const levels = 'Weigh the two before you judge.\nLevel 1 describes. Level 2 explains. Level 3 evaluates.';
  assert.deepEqual(checklistFrom(levels), [{ text: 'Weigh the two before you judge.\nLevel 1 describes. Level 2 explains. Level 3 evaluates', marks: null }]);
  assert.deepEqual(checklistFrom(''), []);
  assert.deepEqual(checklistFrom(undefined), []);
});

test('the card renders the shared function, not a copy of its own', () => {
  const src = readFileSync('components/learn-mode/InlinePractice.jsx', 'utf8');
  assert.match(src, /import \{ checklistFrom \} from '@\/lib\/practice-checklist';/);
  assert.doesNotMatch(src, /function checklistFrom/);
});
