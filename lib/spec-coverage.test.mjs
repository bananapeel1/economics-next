/**
 * `lib/spec-coverage.js` — the extracted computation's own tests. Packet 12.2, E013.
 *
 * `audit/scripts/spec-coverage.test.mjs` tests the GUARD: it runs the CLI as a subprocess and reads
 * its exit code, because a gate reads an exit code. These tests are the other half — they call the
 * module directly, which is how the lab page calls it, and they check the numbers rather than the
 * exit status.
 *
 * VERIFY INDEPENDENTLY. Every expected number below is obtained by a method other than the one
 * under test. The leaf denominator is re-counted here with a plain `filter` over the raw oracle
 * JSON rather than read back out of `leavesByTopic`; the examined set for the real market-failure
 * items is re-derived with a flat reduce over `specItems` rather than read out of the returned
 * `examinedIds`. A check that found its evidence the way the implementation does could not see the
 * implementation's blind spot.
 *
 * Each failing case has a CONTROL: the same item with one field changed back. Three fixtures that
 * fail prove only that something fails.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  sectionCoverage, leafIdsForTopic, loadOracle, loadSections, wordingFor, isEvaluative,
} from './spec-coverage.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** A contract-clean, validly-tariffed, evaluative Economics item. The control for everything below. */
const CLEAN = {
  bank: 'test', ref: 'r1', command: 'Evaluate', commandWord: 'Evaluate', marks: 20,
  question: 'Evaluate the view that government intervention is always necessary.',
  specItems: ['ECON-1.3.5-2c-3'], kind: 'written', subject: 'economics',
};

const cover = (items) => sectionCoverage({ subject: 'economics', topic: '1.3.5', slug: 'test', items });

test('the control passes: a valid tariff, a real spec id, an evaluative question', () => {
  const r = cover([CLEAN]);
  assert.deepEqual(r.failures, []);
  assert.equal(r.questions, 1);
  assert.equal(r.untagged, 0);
  assert.equal(r.examined, 1);
  assert.deepEqual(r.examinedIds, ['ECON-1.3.5-2c-3']);
});

test('an off-ladder tariff fails on the tariff rule only — Analyse is 6 marks in IAL Economics', () => {
  const r = cover([{ ...CLEAN, command: 'Analyse', commandWord: 'Analyse', marks: 10 }]);
  const rules = [...new Set(r.failures.map((f) => f.rule))].sort();
  // Analyse 10 is also not evaluative, so noeval fires too: that is the rule working, not a leak.
  assert.deepEqual(rules, ['noeval', 'tariff']);
  assert.ok(r.failures.some((f) => f.detail.includes('Analyse 10 is not an Economics tariff')));
});

test('an invented spec id fails on the specid rule, and the control with a real id does not', () => {
  const bad = cover([{ ...CLEAN, specItems: ['ECON-9.9.9-01'] }]);
  assert.deepEqual([...new Set(bad.failures.map((f) => f.rule))], ['specid']);
  assert.ok(bad.failures[0].detail.includes('ECON-9.9.9-01'));
  assert.deepEqual(cover([CLEAN]).failures, []);
});

test('an empty specItems array is a failure; an absent one is untagged and is not', () => {
  const empty = cover([{ ...CLEAN, specItems: [] }]);
  assert.deepEqual([...new Set(empty.failures.map((f) => f.rule))], ['specid']);
  assert.equal(empty.untagged, 0, 'an empty array is tagged-as-nothing, not untagged');

  const absent = cover([{ ...CLEAN, specItems: undefined }]);
  assert.deepEqual(absent.failures, []);
  assert.equal(absent.untagged, 1);
  assert.equal(absent.examined, 0);
});

test('questions with no evaluative item fail on noeval; an empty section does not', () => {
  const noEval = cover([{ ...CLEAN, command: 'Explain', commandWord: 'Explain', marks: 4 }]);
  assert.deepEqual([...new Set(noEval.failures.map((f) => f.rule))], ['noeval']);
  assert.ok(noEval.failures[0].detail.includes('Evaluate 20 or Discuss 14'));

  const none = cover([]);
  assert.deepEqual(none.failures, [], 'a section with no questions is not a noeval failure');
  assert.equal(none.questions, 0);
});

test('Business Discuss 8 is not evaluative; Economics Discuss 14 is', () => {
  assert.equal(isEvaluative('business', 'Discuss', 8), false);
  assert.equal(isEvaluative('economics', 'Discuss', 14), true);
  assert.equal(isEvaluative('business', 'Evaluate', 20), true);
});

test('the command is derived from the question when the item carries none', () => {
  const r = cover([{ ...CLEAN, command: undefined, commandWord: undefined }]);
  assert.ok(r.commands.some(([c]) => c === 'Evaluate 20'), JSON.stringify(r.commands));
  assert.deepEqual(r.failures, [], 'a derived Evaluate 20 is a valid tariff and is evaluative');
});

test('the denominator matches a plain count of leaf rows in the oracle, counted here', () => {
  // Re-counted from the raw file with a filter, NOT read back out of leavesByTopic.
  const raw = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));
  for (const [subject, topic] of [['economics', '1.3.5'], ['economics', '2.3.1']]) {
    const expected = raw.items.filter(
      (r) => r.kind === 'leaf' && r.subject === subject && r.topic === topic,
    ).length;
    assert.ok(expected > 0, `${subject} ${topic} should have leaves in the oracle`);
    assert.equal(leafIdsForTopic(subject, topic).length, expected);
    assert.equal(cover([]).leaves > 0, true);
  }
  assert.equal(loadOracle().available, true);
});

test('unexamined + examined is the whole topic, and neither list invents an id', () => {
  const r = cover([CLEAN]);
  const ids = new Set(leafIdsForTopic('economics', '1.3.5'));
  assert.equal(r.examinedIds.length + r.unexamined.length, ids.size);
  for (const id of [...r.examinedIds, ...r.unexamined]) assert.ok(ids.has(id), id);
  assert.equal(new Set([...r.examinedIds, ...r.unexamined]).size, ids.size);
});

test('pct is examined/leaves, and a topic with no leaves is 0 rather than NaN', () => {
  const r = cover([CLEAN]);
  assert.equal(r.pct, (r.examined / r.leaves) * 100);
  const unknown = sectionCoverage({ subject: 'economics', topic: '9.9.9', slug: 'x', items: [] });
  assert.equal(unknown.leaves, 0);
  assert.equal(unknown.pct, 0);
});

test('wording comes back for a real id and is empty, not undefined, for an invented one', () => {
  assert.ok(wordingFor('ECON-1.3.5-2c-3').length > 0);
  assert.equal(wordingFor('ECON-9.9.9-01'), '');
});

test('the real market-failure model answers examine exactly the leaves their own tags name', async () => {
  const mod = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);
  const items = mod.MODEL_ANSWERS.filter(
    (a) => a.subject === 'economics' && a.sectionNumber === '1.3.5',
  );
  assert.ok(items.length >= 3, 'the bank should still hold market-failure items');

  // Independent derivation: flatten specItems, keep the ids the oracle calls leaves of 1.3.5.
  const topicLeaves = new Set(leafIdsForTopic('economics', '1.3.5'));
  const expected = [...new Set(items.flatMap((a) => a.specItems || []))]
    .filter((id) => topicLeaves.has(id))
    .sort();

  const r = sectionCoverage({
    subject: 'economics', topic: '1.3.5', slug: 'market-failure',
    items: items.map((a) => ({
      bank: 'modelAnswers', ref: a.id, command: a.commandWord, commandWord: a.commandWord,
      marks: a.marks, question: a.question, specItems: a.specItems, kind: a.kind, ao: a.ao,
      stimulusRef: a.stimulusRef, subject: 'economics',
    })),
  });

  assert.deepEqual(r.examinedIds.slice().sort(), expected);
  assert.equal(r.examined, expected.length);
  assert.ok(
    r.examined < r.leaves,
    'the lab page must not be able to claim full coverage of 1.3.5 from three questions',
  );
});

test('loadSections returns the 43 audited sections, keyed subject-first', () => {
  const sections = loadSections();
  assert.equal(sections.length, 43);
  const mf = sections.find((s) => s.slug === 'market-failure');
  assert.deepEqual(
    { subject: mf.subject, topic: mf.topic, unit: mf.unit },
    { subject: 'economics', topic: '1.3.5', unit: 1 },
  );
});

/* ── Packet 12.4: a real leaf belonging to another topic ─────────────────────────────────────── */

test('a tag naming a leaf in another topic raises no percentage it cannot list', () => {
  // ECON-3.3.2-4a is a real oracle leaf, so the contract check passes it — this is precisely the
  // case an id-validity check cannot see. It is not one of 1.3.5's leaves, so it must count for
  // nothing here. The control below is the same item tagged with a leaf that IS 1.3.5's.
  const foreign = cover([{ ...CLEAN, specItems: ['ECON-3.3.2-4a'] }]);
  assert.deepEqual(foreign.failures, [], 'a real id passes the contract check, as before');
  assert.equal(foreign.examined, 0, 'it examines none of THIS section\'s requirements');
  assert.deepEqual(foreign.examinedIds, []);
  assert.equal(foreign.pct, 0, 'pct and examinedIds must agree — the bug was pct 2.9% over an empty list');
  assert.equal(foreign.unexamined.length, foreign.leaves);

  const control = cover([CLEAN]);
  assert.equal(control.examined, 1);
  assert.ok(control.pct > 0);
});

test('a mixed tag list counts only the leaves that are this section\'s', () => {
  const r = cover([{ ...CLEAN, specItems: ['ECON-1.3.5-2c-3', 'ECON-3.3.2-4a', 'ECON-1.3.5-2d-2'] }]);
  assert.equal(r.examined, 2);
  assert.deepEqual(r.examinedIds, ['ECON-1.3.5-2c-3', 'ECON-1.3.5-2d-2']);
  assert.equal(r.examined, r.examinedIds.length, 'the numerator is the list, always');
});

test('every tag in the real economics bank names a leaf of its own section', async () => {
  const answers = (await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`)).MODEL_ANSWERS;
  const oracle = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));
  const leafOf = new Map(oracle.items.filter((r) => r.kind === 'leaf').map((r) => [r.id, `${r.subject}:${r.topic}`]));
  const offenders = [];
  for (const a of answers) {
    for (const id of a.specItems || []) {
      if (leafOf.get(id) !== `${a.subject}:${a.sectionNumber}`) offenders.push(`${a.id} → ${id}`);
    }
  }
  assert.deepEqual(offenders, [], 'a tag on the wrong section is invisible to the id check');
  assert.ok(answers.some((a) => (a.specItems || []).length > 0));
});
