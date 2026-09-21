/**
 * `lib/mid-band-answer.js` — the "why this loses marks" derivation. Packet 12.2, E011.
 *
 * The bug these tests exist for: a first version bucketed mark-scheme rows by keyword, which put
 * "Level 3 — assessment is implied" in the out-of-reach list and "Level 1 — no chain of reasoning"
 * in the partly-reached list, exactly backwards, because `Examine 8`'s band descriptions all
 * contain the same vocabulary. The scheme is ordinal, not lexical, and the last two tests here are
 * against the real bank rather than a fixture so a future edit to a mark scheme cannot pass them by
 * accident.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { midBandAttempt, highestTariffItem } from './mid-band-answer.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const load = async () => (await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`)).MODEL_ANSWERS;

const para = (label, html) => ({ label, html });

test('an item with fewer than two paragraphs yields no panel at all', () => {
  assert.equal(midBandAttempt({ answerParagraphs: [] }), null);
  assert.equal(midBandAttempt({ answerParagraphs: [para('Only', 'x')] }), null);
  assert.equal(midBandAttempt({}), null);
});

test('the closing paragraph is always cut, labelled or not', () => {
  const a = midBandAttempt({
    answerParagraphs: [para(null, 'one'), para(null, 'two'), para(null, 'three')],
    markScheme: [],
  });
  assert.equal(a.kept.length, 2);
  assert.deepEqual(a.dropped.map((d) => d.index), [2]);
  assert.equal(a.kept[0].label, 'Paragraph 1', 'an unlabelled paragraph gets a positional label');
});

test('evaluation, counter-argument and conclusion are cut wherever they sit', () => {
  const a = midBandAttempt({
    answerParagraphs: [
      para('Introduction', 'i'), para('Argument 1', 'a'), para('Argument 2 — against', 'b'),
      para('Evaluation — government failure', 'e'), para('Conclusion', 'c'),
    ],
    markScheme: [],
  });
  assert.deepEqual(a.kept.map((k) => k.label), ['Introduction', 'Argument 1']);
  assert.equal(a.dropped.length, 3);
});

test('a levels scheme is read ordinally: the top level is out of reach, the one below is the ceiling', () => {
  const a = midBandAttempt({
    answerParagraphs: [para('Para 1', '1'), para('Para 2', '2'), para('Para 3', '3')],
    markScheme: [
      { range: 'Examine (8)', desc: 'Appendix 6 wording, mentions evaluation and assessment' },
      { range: 'Level 1 — 1–2 marks', desc: 'Isolated knowledge. No chain of reasoning.' },
      { range: 'Level 2 — 3–4 marks', desc: 'A chain of reasoning is begun but not carried through.' },
      { range: 'Level 3 — 5–6 marks', desc: 'A developed chain of reasoning. Assessment is implied rather than made.' },
      { range: 'Level 4 — 7–8 marks', desc: 'A developed chain of reasoning AND a brief assessment.' },
      { range: 'Indicative content', desc: 'Knowledge: …' },
    ],
  });
  assert.equal(a.scheme, 'levels');
  assert.deepEqual(a.outOfReach.map((r) => r.range), ['Level 4 — 7–8 marks']);
  assert.deepEqual(a.ceiling.map((r) => r.range), ['Level 3 — 5–6 marks']);
  // The control for the bug: neither bucket may contain a low level or a context row.
  const named = [...a.outOfReach, ...a.ceiling].map((r) => r.range);
  for (const wrong of ['Level 1 — 1–2 marks', 'Level 2 — 3–4 marks', 'Indicative content', 'Examine (8)']) {
    assert.ok(!named.includes(wrong), `${wrong} must not be bucketed`);
  }
});

test('an objectives scheme puts AO4 out of reach and AO3 at the ceiling', () => {
  const a = midBandAttempt({
    answerParagraphs: [para('Introduction', 'i'), para('Argument 1', 'a'), para('Conclusion', 'c')],
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge' },
      { range: 'AO2 (4 marks)', desc: 'Application' },
      { range: 'AO3 (6 marks)', desc: 'Analysis' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation' },
    ],
  });
  assert.equal(a.scheme, 'objectives');
  assert.deepEqual(a.outOfReach.map((r) => r.range), ['AO4 (6 marks)']);
  assert.deepEqual(a.ceiling.map((r) => r.range), ['AO3 (6 marks)']);
});

test('a two-band scheme names no evaluation band rather than inventing one', () => {
  const a = midBandAttempt({
    answerParagraphs: [para('Para 1', '1'), para('Para 2', '2')],
    markScheme: [{ range: '1–2 marks', desc: 'Definition' }, { range: '3–4 marks', desc: 'Developed example' }],
  });
  assert.equal(a.scheme, 'unknown');
  assert.deepEqual(a.outOfReach, []);
  assert.deepEqual(a.ceiling, []);
});

test('nothing in the attempt is prose this module wrote', () => {
  const html = ['<p>alpha</p>', '<p>beta</p>', '<p>gamma</p>'];
  const a = midBandAttempt({ answerParagraphs: html.map((h, i) => para(`Para ${i + 1}`, h)), markScheme: [] });
  for (const k of a.kept) assert.ok(html.includes(k.html), 'kept html must be the item\'s own');
  assert.ok(a.basis.includes('2 of 3 paragraphs'));
  assert.ok(a.basis.includes('Nothing is rewritten'));
});

test('the real market-failure panel is built on Evaluate 20 and loses AO4', async () => {
  const answers = await load();
  const items = answers.filter((a) => a.subject === 'economics' && a.sectionNumber === '1.3.5');
  const top = highestTariffItem(items);
  assert.equal(top.marks, 20);
  assert.equal(top.commandWord, 'Evaluate');
  const a = midBandAttempt(top);
  assert.equal(a.scheme, 'objectives');
  assert.ok(a.outOfReach[0].range.startsWith('AO4'));
  assert.ok(a.kept.length >= 1 && a.dropped.length >= 1);
});

test('the real 2.3.1 panel is built on Examine 8 and tops out at Level 3', async () => {
  const answers = await load();
  const items = answers.filter((a) => a.subject === 'economics' && a.sectionNumber === '2.3.1');
  const top = highestTariffItem(items);
  assert.equal(top.marks, 8);
  const a = midBandAttempt(top);
  assert.equal(a.scheme, 'levels');
  assert.ok(/Level\s*4/.test(a.outOfReach[0].range));
  assert.ok(/Level\s*3/.test(a.ceiling[0].range));
});

test('highestTariffItem ignores items that cannot support a panel, and returns null when none can', () => {
  const thin = { id: 'thin', marks: 20, answerParagraphs: [] };
  const usable = { id: 'usable', marks: 8, answerParagraphs: [para('a', '1'), para('b', '2')], markScheme: [] };
  assert.equal(highestTariffItem([thin, usable]).id, 'usable');
  assert.equal(highestTariffItem([thin]), null);
  assert.equal(highestTariffItem([]), null);
});
