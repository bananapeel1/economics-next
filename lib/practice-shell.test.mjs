/**
 * `lib/practice-shell.js` — packet 12.75, E045/E046/E052. Pure functions the server component uses
 * to prepare the shell; the real bank is used where the claim is about the real page.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { hasShell, questionSets, stemParts, minutesFor, cardLabel, focusRowsFor, citedFigures, hasPaper, paperSets, sectionARow, isLevelsItem, isPointsItem, objectiveGroups, objectiveOf, pointsVerdict, levelsScheme, levelsVerdict } from './practice-shell.js';
import { paperFor, sectionOfKind, sectionMarks, levelsFor, bandOf } from './ial-paper.js';
import { readAttempt, writeAttempt } from './attempt-storage.js';
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

/* ── Packet 12.85: marking in Pearson's format ── */

test('E067: every point-marked 1.3.5 item is headed by objective, and each heading states its group\'s marks', async () => {
  const items = (await section('economics', '1.3.5')).filter(isPointsItem);
  assert.equal(items.length, 10);
  for (const it of items) {
    for (const g of objectiveGroups(it.criteria)) {
      const m = /^(Knowledge|Application|Analysis|Evaluation) (\d+)$/.exec(g.band);
      assert.ok(m, `${it.id}: heading "${g.band}" is not Pearson's "Objective N"`);
      assert.equal(Number(m[2]), g.marks, `${it.id}: "${g.band}" heads ${g.marks} marks of points`);
    }
  }
});

test('E067: both 8-mark Examine items carry Knowledge 2 · Application 2 · Analysis 2 · Evaluation 2', async () => {
  const eights = (await section('economics', '1.3.5')).filter((i) => i.marks === 8);
  assert.deepEqual(eights.map((i) => i.id).sort(), ['mf-extract-examine-bag-charge-optimum-8', 'negative-externality-tax-8']);
  for (const it of eights) {
    assert.deepEqual(objectiveGroups(it.criteria).map((g) => g.band), ['Knowledge 2', 'Application 2', 'Analysis 2', 'Evaluation 2'], it.id);
  }
  // The verdict counts what the model script earns: the negative-externality script makes no assessment.
  assert.equal(pointsVerdict(eights.find((i) => i.id === 'mf-extract-examine-bag-charge-optimum-8')), 'K2 · App2 · An2 · E2 = 8/8');
  assert.equal(pointsVerdict(eights.find((i) => i.id === 'negative-externality-tax-8')), 'K2 · App2 · An2 = 6/8');
  assert.equal(objectiveOf('Analysis 2').abbr, 'An');
});

test('E068: the level bands are the WEC11 sample mark scheme\'s, read from the structure file', () => {
  const edges = (t) => levelsFor('economics', t).strands.map((s) => [s.strand, s.marks, s.levels.map((l) => `${l.lo}-${l.hi}`)]);
  assert.deepEqual(edges(14), [['KAA', 8, ['1-3', '4-6', '7-8']], ['E', 6, ['1-2', '3-4', '5-6']]]);
  assert.deepEqual(edges(20), [['KAA', 12, ['1-3', '4-6', '7-9', '10-12']], ['E', 8, ['1-3', '4-6', '7-8']]]);
  assert.equal(levelsFor('economics', 8), null);
  assert.equal(levelsFor('business', 20), null);
  const kaa = levelsFor('economics', 20).strands[0];
  assert.equal(bandOf(kaa, 11).level, 4);
  assert.equal(bandOf(kaa, 0), null);
});

test('E068: 1.3.5\'s Discuss 14 and both essays are marked by levels, with no point list, and verdicts in band', async () => {
  const items = (await section('economics', '1.3.5')).filter(isLevelsItem);
  assert.deepEqual(items.map((i) => i.id).sort(), ['market-failure-government-intervention-20', 'mf-essay-deposit-protection-moral-hazard-20', 'mf-extract-evaluate-soft-drinks-excise-20']);
  for (const it of items) {
    assert.equal(it.criteria, undefined, `${it.id} keeps no point list`);
    const scheme = levelsScheme(it);
    assert.deepEqual(scheme.map((s) => s.strand), ['KAA', 'E']);
    for (const s of scheme) assert.ok(s.indicative.length > 0);
    for (const p of it.script) for (const sg of p.segments) assert.ok(['KAA', 'E'].includes(sg.strand), `${it.id} ${sg.id}`);
  }
  const line = (id) => levelsVerdict(items.find((i) => i.id === id));
  assert.equal(line('mf-extract-evaluate-soft-drinks-excise-20'), 'KAA Level 3 (8) · E Level 3 (6) = 14/14');
  assert.equal(line('mf-essay-deposit-protection-moral-hazard-20'), 'KAA Level 4 (12) · E Level 3 (8) = 20/20');
  assert.equal(line('market-failure-government-intervention-20'), 'KAA Level 4 (11) · E Level 3 (7) = 18/20');
});

test('E069: the Section A row says "Six 1-mark questions" and where the quiz is, never that the link lands on it', () => {
  const row = sectionARow({ subject: 'economics', unit: 1, sectionId: 'market-failure', topic: 'Market Failure' });
  assert.equal(row.lead, 'Six 1-mark questions.');
  assert.equal(row.href, '/?section=market-failure');
  assert.match(row.note, /Quiz tab/);
  assert.doesNotMatch(row.linkText, /quiz/i, 'the link names the topic, not the quiz');
  assert.doesNotMatch(row.note, /opens the quiz|takes you to the quiz|go to the quiz|lands/i);
});

test('E072: the attempt record is extended with levels, never renamed; old records still read', () => {
  const store = new Map();
  globalThis.window = { localStorage: { getItem: (k) => (store.has(k) ? store.get(k) : null), setItem: (k, v) => store.set(k, String(v)) } };
  try {
    store.set('rl:attempt:v1:old', JSON.stringify({ draft: 'a 12.6 draft', ticked: ['c1'] }));
    assert.deepEqual(readAttempt('old'), { draft: 'a 12.6 draft', ticked: ['c1'], levels: {}, phase: 'marking', time: 0, open: false });
    writeAttempt('lv', { draft: 'x', phase: 'marking', levels: { KAA: 6, E: 3 } });
    writeAttempt('lv', { time: 4 });
    assert.deepEqual(readAttempt('lv').levels, { KAA: 6, E: 3 }, 'a merge keeps the levels');
    store.set('rl:attempt:v1:lv2', JSON.stringify({ draft: 'y', levels: { KAA: 5 } }));
    assert.equal(readAttempt('lv2').phase, 'marking', 'a level choice means the student marked');
  } finally {
    delete globalThis.window;
  }
});
