/**
 * `lib/practice-shell.js` — packet 12.75, E045/E046/E052. Pure functions the server component uses
 * to prepare the shell; the real bank is used where the claim is about the real page.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { hasShell, questionSets, stemParts, minutesFor, cardLabel, focusRowsFor, citedFigures } from './practice-shell.js';
import { minutesForMarks } from './exam-timing.js';
import { parseStimulus, figuresIn } from './stimulus.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bank = async () => (await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`)).MODEL_ANSWERS;
const section = async (subject, n) => (await bank()).filter((a) => a.subject === subject && a.sectionNumber === n);

test('the shell renders on a page iff one of its items carries criteria — 1.3.5 alone today', async () => {
  const all = await bank();
  const keys = [...new Set(all.map((a) => `${a.subject}|${a.sectionNumber}`))];
  const withShell = keys.filter((k) => hasShell(all.filter((a) => `${a.subject}|${a.sectionNumber}` === k)));
  assert.deepEqual(withShell, ['economics|1.3.5']);
  assert.equal(hasShell([]), false);
  assert.equal(hasShell([{ criteria: [] }]), false);
});

test('1.3.5 groups into the extract set first (2, 6, 20) and a standalone set (4, 8, 20)', async () => {
  const sets = questionSets(await section('economics', '1.3.5'));
  assert.deepEqual(sets.map((s) => [s.kind, s.label, s.items.map((i) => i.marks)]), [
    ['extract', 'Extract A', [2, 6, 20]],
    ['standalone', 'Standalone', [4, 8, 20]],
  ]);
});

test('every keyTerm on 1.3.5 is cut out of its own stem, and the stem reassembles exactly', async () => {
  for (const item of await section('economics', '1.3.5')) {
    assert.ok(item.keyTerm, `${item.id} has no keyTerm`);
    const p = stemParts(item.question, item.keyTerm);
    assert.equal(p.term, item.keyTerm);
    assert.equal(p.before + p.term + p.after, item.question);
  }
  assert.deepEqual(stemParts('Define X.', 'Y'), { before: 'Define X.', term: '', after: '' }, 'no guess');
  assert.equal(stemParts('a b a', 'a').before, '', 'first occurrence');
});

test('minutes: the item’s own figure first, else minutesForMarks — never a new formula', () => {
  assert.equal(minutesFor({ marks: 20, minutes: 26 }, 'economics', 1), 26);
  assert.equal(minutesFor({ marks: 20 }, 'economics', 1), minutesForMarks('economics', 1, 20));
  assert.equal(minutesFor({ marks: 6 }, 'business', 2), minutesForMarks('business', 2, 6));
});

test('AO codes come from the item: Define is AO1 only', async () => {
  const define = (await section('economics', '1.3.5')).find((a) => a.commandWord === 'Define');
  assert.deepEqual(define.ao, ['AO1']);
  assert.ok(define.criteria.every((c) => !/AO2/.test(c.band)), 'no AO2 band on a Define item');
});

test('card label is the keyTerm, capitalised, never cut', () => {
  assert.equal(cardLabel({ keyTerm: 'always necessary', commandWord: 'Evaluate' }), 'Always necessary');
  assert.equal(cardLabel({ commandWord: 'Explain' }), 'Explain');
});

test('focus rows are derived from the figures the script cites', async () => {
  const blocks = parseStimulus(fs.readFileSync(path.join(ROOT, 'content/data-response/econ-u1-market-failure.md'), 'utf8'));
  const figures = figuresIn(blocks);
  const tableBlock = blocks.findIndex((b) => b.kind === 'table');
  const analyse = (await section('economics', '1.3.5')).find((a) => a.commandWord === 'Analyse');
  assert.ok(citedFigures(analyse, figures).includes('-1.4'));
  assert.deepEqual(focusRowsFor(analyse, figures), [`${tableBlock}-2`], 'the plastic-bags row only');
  assert.deepEqual(focusRowsFor({ script: [{ segments: [{ html: 'no numbers here' }] }] }, figures), []);
});
