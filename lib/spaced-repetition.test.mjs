/**
 * `lib/spaced-repetition.js` — the Smart Practice confidence redesign. Confidence is asked with the
 * answer, and each of the four outcomes has to do something different, or the question is noise.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeNextReview, createDefaultProgress, classifyAnswer } from './spaced-repetition.js';

const DAY = 24 * 60 * 60 * 1000;
const fresh = () => createDefaultProgress('s1', 0);
const after = (p, ...answers) => answers.reduce((acc, [c, conf]) => computeNextReview(acc, c, conf), p);

test('right and sure advances the step', () => {
  const p = after(fresh(), [true, 'certain']);
  assert.equal(p.repetitions, 1);
  assert.equal(p.intervalDays, 1);
});

test('a lucky guess does not advance and comes back tomorrow', () => {
  const p = after(fresh(), [true, 'guessed']);
  assert.equal(p.repetitions, 0);
  assert.equal(p.intervalDays, 1);
  assert.ok(Math.abs(p.nextReview - Date.now() - DAY) < 5000);
});

test('a lucky guess on a card that was far out pulls it back to tomorrow', () => {
  const p = after(fresh(), [true, 'certain'], [true, 'certain'], [true, 'certain'], [true, 'guessed']);
  assert.equal(p.repetitions, 3);
  assert.equal(p.intervalDays, 1);
});

test('guessing can never reach mastery (repetitions >= 3)', () => {
  const p = after(fresh(), ...Array(10).fill([true, 'guessed']));
  assert.equal(p.repetitions, 0);
});

test('wrong resets, and wrong while sure costs more ease than wrong while guessing', () => {
  const sure = after(fresh(), [false, 'certain']);
  const guess = after(fresh(), [false, 'guessed']);
  assert.equal(sure.repetitions, 0);
  assert.equal(guess.repetitions, 0);
  assert.ok(sure.intervalDays < 0.01);
  assert.ok(sure.ease < guess.ease);
});

test('null and Learn Mode\'s "somewhat" take the plain SM-2 step (flashcards, written practice)', () => {
  for (const conf of [null, 'somewhat']) {
    const p = after(fresh(), [true, conf]);
    assert.equal(p.repetitions, 1);
    assert.equal(p.intervalDays, 1);
  }
});

test('classifyAnswer names the four outcomes', () => {
  assert.equal(classifyAnswer(true, 'certain'), 'knew');
  assert.equal(classifyAnswer(true, 'guessed'), 'lucky');
  assert.equal(classifyAnswer(false, 'certain'), 'misconception');
  assert.equal(classifyAnswer(false, 'guessed'), 'gap');
});
