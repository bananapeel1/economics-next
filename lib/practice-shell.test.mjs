/**
 * `lib/practice-shell.js` — packet 12.75, E045/E046/E052. Pure functions the server component uses
 * to prepare the shell; the real bank is used where the claim is about the real page.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { hasShell, questionSets, stemParts, minutesFor, cardLabel, focusRowsFor, citedFigures, hasPaper, paperSets, sectionARow } from './practice-shell.js';
import { paperFor, sectionOfKind, sectionMarks } from './ial-paper.js';
import { minutesForMarks } from './exam-timing.js';
import { parseStimulus, figuresIn, parseBlocks } from './stimulus.js';

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

test('without `paper`, criteria-bearing items still group by extract, then standalone (the 12.75 path)', async () => {
  // questionSets is the path every shell page without `paper` takes. On 1.3.5's own items it still
  // groups the extract's five parts first, in tariff order; the page itself no longer uses it.
  const sets = questionSets(await section('economics', '1.3.5'));
  assert.deepEqual(sets.map((s) => [s.kind, s.label]), [['extract', 'Extract A'], ['standalone', 'Standalone']]);
  assert.deepEqual(sets[0].items.map((i) => i.marks), [2, 4, 6, 8, 14]);
});

/* ── Packet 12.8: the paper's sections ── */

test('1.3.5 is the only page laid out as its paper, and its sets follow the paper file, in order', async () => {
  const all = await bank();
  const keys = [...new Set(all.map((a) => `${a.subject}|${a.sectionNumber}`))];
  assert.deepEqual(keys.filter((k) => hasPaper(all.filter((a) => `${a.subject}|${a.sectionNumber}` === k))), ['economics|1.3.5']);

  const sets = paperSets(await section('economics', '1.3.5'), { subject: 'economics', unit: 1 });
  const paper = paperFor('economics', 1);
  // Section order and every number come from the structure file, not from this test.
  const letters = paper.sections.filter((s) => s.kind !== 'multiple_choice').map((s) => `paper-${s.id}`);
  assert.deepEqual(sets.map((s) => s.id), [...letters, 'more']);
  const [b, c, d, more] = sets;
  const sa = sectionOfKind('economics', 1, 'short_answer');
  const dq = sectionOfKind('economics', 1, 'data_question');
  const es = sectionOfKind('economics', 1, 'essay');
  assert.equal(b.items.length, sa.parts);
  assert.ok(b.items.every((i) => i.marks === sa.marksEach));
  assert.equal(b.heading, `Section ${sa.id} · Short answers · ${sa.parts} × ${sa.marksEach} marks`);
  assert.deepEqual(c.items.map((i) => i.paper.part), ['a', 'b', 'c', 'd', 'e'], 'parts in letter order');
  assert.deepEqual(c.items.map((i) => i.marks), dq.tariffs);
  assert.equal(c.heading, `Section ${dq.id} · Data question · ${dq.total} marks · Extract A`);
  assert.equal(c.total, c.items.reduce((n, i) => n + i.marks, 0));
  assert.equal(d.items.length, es.offered);
  assert.deepEqual(d.choice, { offered: es.offered, answer: es.answer });
  assert.equal(d.total, sectionMarks(es), 'an essay section banks one essay, never both');
  assert.ok(d.total < d.items.reduce((n, i) => n + i.marks, 0));
  assert.match(d.heading, /answer one of two$/);
  assert.deepEqual(more.items.map((i) => i.id), ['negative-externality-tax-8'], 'the 8-mark Examine stays, under More practice');
});

test('an item whose paper section does not exist is never dropped: it goes to More practice', () => {
  const it = (id, paper, marks = 4) => ({ id, marks, criteria: [{ id: 'c1', marks }], paper });
  const sets = paperSets([it('x', { section: 'Z', kind: 'essay' }), it('y', undefined)], { subject: 'economics', unit: 1 });
  assert.deepEqual(sets.map((s) => [s.id, s.items.map((i) => i.id)]), [['more', ['x', 'y']]]);
});

test('Section A is a link to the topic, and its copy never claims to land on the quiz', () => {
  const row = sectionARow({ subject: 'economics', unit: 1, sectionId: 'market-failure', topic: 'Market Failure' });
  const mc = sectionOfKind('economics', 1, 'multiple_choice');
  assert.equal(row.href, '/?section=market-failure');
  assert.equal(row.heading, `Section ${mc.id} · ${mc.parts} multiple-choice questions · ${mc.total} marks`);
  assert.match(row.note, /Quiz tab/);
  assert.doesNotMatch(`${row.linkText} ${row.note}`, /opens the quiz|takes you to the quiz|go to the quiz/i);
  assert.equal(sectionARow({ subject: 'economics', unit: 1, sectionId: '', topic: 'x' }), null);
});

test('every short answer and essay on 1.3.5 carries a context; the Calculate one carries its data as a table', async () => {
  const items = (await section('economics', '1.3.5')).filter((i) => i.paper && i.paper.kind !== 'data_question');
  for (const i of items) assert.ok(parseBlocks(i.paper.context).length > 0, `${i.id} has no context`);
  const calc = items.find((i) => i.commandWord === 'Calculate');
  const table = parseBlocks(calc.paper.context).find((b) => b.kind === 'table');
  assert.ok(table, 'the Calculate context holds a table');
  const answer = calc.script.flatMap((p) => p.segments.map((sg) => sg.html)).join(' ');
  for (const row of table.rows) assert.ok(answer.includes(row[1]), `the answer uses the table's ${row[1]}`);
  const draws = items.filter((i) => i.commandWord === 'Draw');
  assert.equal(draws.length, 1, 'exactly one Draw');
  assert.ok(fs.existsSync(path.join(ROOT, 'public', draws[0].diagram.src)));
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
