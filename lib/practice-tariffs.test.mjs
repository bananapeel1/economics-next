/**
 * The mark-filter chip row. Packet 12.1 fix round B1.
 *
 * The regression this file exists to stop: packet 12.1 derived the chips from the subject's tariff
 * ladder alone, which is right about the papers and dropped the `10 Marks` chip while two live
 * Economics sections still served a 10-mark `Analyse` question. The question stayed in the list and
 * no chip reached it, so the chip counts summed to 3 under a heading reading "All Questions 4".
 *
 * The invariant, in one sentence, and it is what the first test asserts: **every tariff a visible
 * question carries has a chip.** Founder decision, 18 September 2026 — the off-ladder tariff gets
 * its own chip, labelled so it is not read as an exam tariff, and nothing is hidden.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { markFiltersFor, markFiltersForSection, tariffsFor } from './practice-tariffs.js';

/** What the component does: chips built from the tariffs of the questions it is about to render. */
function chipsFor(unitCode, questionMarks) {
  const counts = {};
  for (const m of questionMarks) counts[m] = (counts[m] || 0) + 1;
  return {
    filters: markFiltersForSection(unitCode, Object.keys(counts).map(Number)),
    counts,
  };
}

test('every tariff a visible question carries has a chip, and the chip counts sum to All Questions', () => {
  // The two live sections from Verify B: 4 Define, 6 Explain, 10 Analyse, 20 Evaluate.
  const marks = [4, 6, 10, 20];
  const { filters, counts } = chipsFor('WEC12', marks);

  for (const m of marks) {
    assert.ok(
      filters.some((f) => f.value === m),
      `no chip reaches the ${m}-mark question`,
    );
  }

  const summed = filters
    .filter((f) => f.value !== 'all')
    .reduce((n, f) => n + (counts[f.value] || 0), 0);
  assert.equal(summed, marks.length, 'the chip counts must account for every visible question');
});

test('an off-ladder tariff is labelled as one, and an on-ladder tariff is not', () => {
  const { filters } = chipsFor('WEC12', [4, 6, 10, 20]);
  const ten = filters.find((f) => f.value === 10);
  assert.equal(ten.label, '10 · not IAL');
  assert.equal(ten.offLadder, true);

  const twenty = filters.find((f) => f.value === 20);
  assert.equal(twenty.label, '20 Marks');
  assert.equal(twenty.offLadder, false);
});

test('Business carries 10 on its own ladder, so the same question gets an ordinary chip', () => {
  const { filters } = chipsFor('WBS11', [4, 6, 10, 20]);
  const ten = filters.find((f) => f.value === 10);
  assert.equal(ten.label, '10 Marks');
  assert.equal(ten.offLadder, false);
});

test('the whole ladder is still offered when the section has no question at that tariff', () => {
  const { filters } = chipsFor('WEC12', [4]);
  const values = filters.filter((f) => f.value !== 'all').map((f) => f.value);
  assert.deepEqual(values, tariffsFor('WEC12'), 'the paper’s ladder must still read as the ladder');
});

test('chips are ascending and unique, with All Questions first', () => {
  const { filters } = chipsFor('WEC12', [10, 4, 10, 20]);
  assert.equal(filters[0].value, 'all');
  const values = filters.slice(1).map((f) => f.value);
  assert.deepEqual(values, [...new Set(values)].sort((a, b) => a - b));
});

test('a malformed marks value mints no chip', () => {
  // Number(null) is 0. A question whose `marks` is missing must not produce a `0 · not IAL` chip.
  const filters = markFiltersForSection('WEC12', [null, undefined, NaN, 0, -5, 7.5, 'x']);
  assert.deepEqual(
    filters.slice(1).map((f) => f.value),
    tariffsFor('WEC12'),
  );
});

test('markFiltersFor is still the bare ladder', () => {
  assert.deepEqual(
    markFiltersFor('WEC12').map((f) => f.label),
    ['All Questions', '2 Marks', '4 Marks', '6 Marks', '8 Marks', '14 Marks', '20 Marks'],
  );
});
