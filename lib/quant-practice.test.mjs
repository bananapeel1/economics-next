/**
 * Packet 13.3: calculations in the SM-2 queue.
 *
 * The acceptance line in audit/DRILLS.md is "a due quant item appears in a /practice session, is
 * rescheduled by SM-2 after answering, and shows different numbers on the next review". Smart
 * Practice is signed-in only (F086), and a verification session cannot sign in, so that sentence
 * is proved here against the real functions the engine calls — buildQueue, computeNextReview,
 * buildProgressRow — rather than against a copy of them.
 */
import test from 'node:test';
import assert from 'node:assert/strict';
import { templates } from './quant/index.mjs';
import { quantSeed } from './quant-pool.js';
import {
  QUANT_PREFIX, quantSlot, quantBank, quantBanks, quantItemId, quantProgressSection,
  sectionFromQuantProgress, quantReviewSeed, quantPracticeItem, quantRecalled, quantCount,
} from './quant-practice.js';
import { buildQueue, computeNextReview, createDefaultProgress, queueStats } from './spaced-repetition.js';
import { buildProgressRow, PROGRESS_CONFLICT_TARGET } from './progress-row.js';

// An Economics 1.3.2 section: `ped` claims it, so it has at least one calculation.
const DEMAND = { id: 'consumer-behaviour-demand', subject: 'economics', unitCode: 'WEC11', number: '1.3.2' };

test('a template keeps one question_index for ever: a Postgres INTEGER that ignores registry order', () => {
  for (const t of templates) {
    const slot = quantSlot(t.id);
    assert.ok(Number.isInteger(slot) && slot >= 0 && slot <= 0x7fffffff, `${t.id}: ${slot}`);
    assert.equal(quantSlot(t.id), slot, 'pure');
  }
  // Pinned, so a change to the hash cannot silently re-key every stored schedule.
  assert.equal(quantSlot('ped'), 2035000238); // FNV-1a of "ped", computed independently in Python
});

test('no two registered templates share a question_index (the upsert key would merge their schedules)', () => {
  const seen = new Map();
  for (const t of templates) {
    const slot = quantSlot(t.id);
    assert.ok(!seen.has(slot), `${t.id} collides with ${seen.get(slot)} at ${slot}`);
    seen.set(slot, t.id);
  }
});

test('a section\'s bank is one entry per template that claims it, shaped for buildQueue', () => {
  const bank = quantBank(DEMAND);
  assert.ok(bank.length >= 1);
  assert.equal(bank.length, quantCount(DEMAND));
  for (const q of bank) {
    assert.equal(q.kind, 'quant');
    assert.equal(q.bankIndex, quantSlot(q.templateId));
    assert.equal(q.id, `${DEMAND.id}:quant:${q.templateId}`);
  }
  assert.ok(bank.some((q) => q.templateId === 'ped'));
  // No unit code, no drill — the same rule as Learn Mode's pool.
  assert.deepEqual(quantBank({ ...DEMAND, unitCode: '' }), []);
});

test('banks live under qt-<section>, beside the quiz bank, never inside it', () => {
  const banks = quantBanks([DEMAND, { id: 'nothing-here', subject: 'economics', unitCode: 'WEC11', number: '1.3.9' }]);
  assert.deepEqual(Object.keys(banks), [`${QUANT_PREFIX}${DEMAND.id}`]);
  assert.equal(sectionFromQuantProgress(quantProgressSection(DEMAND.id)), DEMAND.id);
});

test('ACCEPTANCE: a due calculation is queued, rescheduled by SM-2 on answering, and returns with new figures', () => {
  const key = quantProgressSection(DEMAND.id);
  const allQuizData = { [DEMAND.id]: [], [key]: quantBank(DEMAND) };
  const ids = [DEMAND.id, key];

  // 1. Never seen: it is in the session.
  let progressMap = {};
  const q1 = buildQueue(progressMap, ids, allQuizData, 20);
  const entry = q1.find((x) => x.sectionId === key && x.question.templateId === 'ped');
  assert.ok(entry, 'an unseen calculation is offered');

  // 2. The student answers it; the card builds the item from the schedule as it stood.
  const mapKey = `${entry.sectionId}:${entry.questionIndex}`;
  const before = progressMap[mapKey] || createDefaultProgress(entry.sectionId, entry.questionIndex);
  const firstItem = quantPracticeItem(DEMAND.id, 'ped', progressMap[mapKey]);
  const updated = computeNextReview(before, true, null);
  assert.ok(updated.nextReview > Date.now(), 'rescheduled into the future');
  assert.equal(updated.repetitions, 1);
  progressMap = { ...progressMap, [mapKey]: updated };

  // 3. Not due yet: a fresh session does not offer it.
  const q2 = buildQueue(progressMap, ids, allQuizData, 20);
  assert.ok(!q2.some((x) => `${x.sectionId}:${x.questionIndex}` === mapKey), 'not offered before it is due');
  assert.equal(queueStats(progressMap, ids, allQuizData).scheduled, 1);

  // 4. Time passes and it falls due: offered again, and built from different figures.
  const due = { ...updated, nextReview: Date.now() - 1000 };
  progressMap = { ...progressMap, [mapKey]: due };
  const q3 = buildQueue(progressMap, ids, allQuizData, 20);
  assert.ok(q3.some((x) => `${x.sectionId}:${x.questionIndex}` === mapKey), 'offered once due');
  const secondItem = quantPracticeItem(DEMAND.id, 'ped', due);
  assert.notEqual(secondItem.id, firstItem.id);
  assert.notEqual(secondItem.stem, firstItem.stem, 'the review shows different numbers');
});

test('the figures hold still while an item waits, so a reload cannot reroll a hard draw', () => {
  const p = { nextReview: 1790000000000 };
  assert.equal(quantPracticeItem(DEMAND.id, 'ped', p).stem, quantPracticeItem(DEMAND.id, 'ped', { ...p }).stem);
  assert.equal(quantReviewSeed(DEMAND.id, 'ped', null), quantReviewSeed(DEMAND.id, 'ped', undefined));
});

test('a practice review never reuses the figures of the Learn Mode check-in', () => {
  for (let attempt = 0; attempt < 5; attempt++) {
    assert.notEqual(quantReviewSeed(DEMAND.id, 'ped', null), quantSeed(DEMAND.id, 'ped', attempt));
  }
});

test('full marks is recalled; anything less resets the step, own-figure marks included', () => {
  assert.equal(quantRecalled({ awarded: 4, total: 4 }), true);
  assert.equal(quantRecalled({ awarded: 3, total: 4 }), false);
  assert.equal(quantRecalled(null), false);
  assert.equal(quantRecalled({ awarded: 0, total: 0 }), false);
});

test('the stored row: qt- section, integer index on the existing conflict target, packet 2 item id', () => {
  const row = buildProgressRow({
    userId: 'u', sectionId: quantProgressSection(DEMAND.id), questionIndex: quantSlot('ped'),
    itemId: quantItemId(DEMAND.id, 'ped'), ease: 2.6, intervalDays: 1, repetitions: 1, nextReview: Date.now(),
  });
  assert.equal(row.section_id, 'qt-consumer-behaviour-demand');
  assert.ok(Number.isInteger(row.question_index));
  assert.equal(row.item_id, 'consumer-behaviour-demand:quant:ped');
  assert.equal(PROGRESS_CONFLICT_TARGET, 'user_id,section_id,question_index');
});

test('a template id the registry no longer knows yields null, not a crash', () => {
  assert.equal(quantPracticeItem(DEMAND.id, 'no-such-template', null), null);
});
