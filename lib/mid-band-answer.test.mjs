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
import { midBandAttempt, highestTariffItem, markRange, topsOutInModelAnswersOwnBand, isLevelBanded, pagePanelItem } from './mid-band-answer.js';

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

/* ── E028, packet 12.4: a panel that tops out where the model answer already sits ────────────── */

const levels8 = [
  { range: 'Level 1 — 1–2 marks', desc: 'Isolated knowledge.' },
  { range: 'Level 2 — 3–4 marks', desc: 'A chain begun.' },
  { range: 'Level 3 — 5–6 marks', desc: 'A developed chain. Assessment implied.' },
  { range: 'Level 4 — 7–8 marks', desc: 'A developed chain AND a brief assessment.' },
];
const threePara = [para('Para 1', '1'), para('Para 2', '2'), para('Para 3', '3')];

test('markRange reads every shape the bank writes a range in', () => {
  assert.deepEqual(markRange('Level 3 — 5–6 marks'), [5, 6], 'the level number must not win');
  assert.deepEqual(markRange('Level 10 - 18-20 marks'), [18, 20]);
  assert.deepEqual(markRange('3–4 marks'), [3, 4]);
  assert.deepEqual(markRange('8 marks'), [8, 8]);
  assert.deepEqual(markRange('5–6 '), [5, 6]);
  assert.equal(markRange('Indicative content'), null);
  assert.equal(markRange(''), null);
  assert.equal(markRange(null), null);
});

test('a panel whose ceiling is the model answer\'s own band is suppressed', () => {
  const item = { marks: 8, likelyScore: '5–6 / 8', answerParagraphs: threePara, markScheme: levels8 };
  assert.equal(midBandAttempt(item), null, 'the model answer is already marked 5–6; a 5–6 ceiling teaches nothing');
});

test('a panel whose ceiling is a band below the model answer survives', () => {
  const item = { marks: 8, likelyScore: '7–8 / 8', answerParagraphs: threePara, markScheme: levels8 };
  const a = midBandAttempt(item);
  assert.ok(a, 'a 7–8 model answer losing to a 5–6 ceiling is a real near miss');
  assert.deepEqual(a.ceiling.map((r) => r.range), ['Level 3 — 5–6 marks']);
  assert.equal(topsOutInModelAnswersOwnBand(item, a), false);
});

test('the rule does not fire on an objectives scheme, where the numbers are not comparable', () => {
  const item = {
    marks: 20,
    likelyScore: '18–20 / 20',
    answerParagraphs: [para('Introduction', 'i'), para('Argument 1', 'a'), para('Conclusion', 'c')],
    markScheme: [
      { range: 'AO1 (4 marks)', desc: 'Knowledge' },
      { range: 'AO2 (4 marks)', desc: 'Application' },
      { range: 'AO3 (6 marks)', desc: 'Analysis' },
      { range: 'AO4 (6 marks)', desc: 'Evaluation' },
    ],
  };
  const a = midBandAttempt(item);
  assert.ok(a, 'AO3 6 marks is an allocation, not a band containing 18–20');
  assert.equal(topsOutInModelAnswersOwnBand(item, a), false);
});

test('an item with no likelyScore is not suppressed — the rule needs both numbers', () => {
  assert.ok(midBandAttempt({ marks: 8, answerParagraphs: threePara, markScheme: levels8 }));
});

test('a section keeps a panel when a second item can carry an honest one', () => {
  const sameBand = { id: 'same', marks: 8, likelyScore: '5–6 / 8', answerParagraphs: threePara, markScheme: levels8 };
  const honest = { id: 'honest', marks: 8, likelyScore: '7–8 / 8', answerParagraphs: threePara, markScheme: levels8 };
  assert.equal(highestTariffItem([sameBand, honest]).id, 'honest');
  assert.equal(highestTariffItem([sameBand]), null, 'and loses it altogether when none can');
});

test('no page in the real bank shows a panel that tops out in its own band', async () => {
  const answers = await load();
  const sections = [...new Set(answers.map((a) => `${a.subject}|${a.sectionNumber}`))];
  let panels = 0;
  for (const key of sections) {
    const [subject, sectionNumber] = key.split('|');
    const top = highestTariffItem(answers.filter((a) => a.subject === subject && a.sectionNumber === sectionNumber));
    if (!top) continue;
    const a = midBandAttempt(top);
    assert.ok(a, 'highestTariffItem must never return an item midBandAttempt then refuses');
    assert.equal(topsOutInModelAnswersOwnBand(top, a), false, `${key} shows a panel in its own band`);
    panels++;
  }
  assert.ok(panels > 0);
});

/* ── Packet 12.75, E053: an AO-split scheme names what an objective REQUIRES, not a level reached ── */

const aoSplit20 = [
  { range: 'Evaluate (20)', desc: 'Appendix 6: requires evaluation and a supported judgement.' },
  { range: 'AO1 (4 marks)', desc: 'Knowledge of the externality and the tax.' },
  { range: 'AO2 (4 marks)', desc: 'Application: the extract’s figures.' },
  { range: 'AO3 (6 marks)', desc: 'Analysis: multi-stage chains for the tax and against it.' },
  { range: 'AO4 (6 marks)', desc: 'Evaluation: weighing, and a supported judgement.' },
];
const forAndAgainst = [
  para('Introduction', 'intro'),
  para('The case for the tax', 'for'),
  para('Evaluation — inelastic demand', 'against 1'),
  para('Evaluation — regressivity', 'against 2'),
  para('Conclusion', 'judgement'),
];

test('an AO-split item is not level-banded, and the shell never builds its panel on one', () => {
  const ao = { id: 'ao', marks: 20, likelyScore: '20 / 20', answerParagraphs: forAndAgainst, markScheme: aoSplit20 };
  assert.equal(isLevelBanded(ao), false);
  // The unrestricted choice still takes it (pagePanelItem then gates it out, below) and would print
  // its AO3 row, which asks for chains AGAINST the tax, over two paragraphs that argue FOR.
  const a = midBandAttempt(ao);
  assert.deepEqual(a.kept.map((p) => p.label), ['Introduction', 'The case for the tax']);
  assert.match(a.ceiling[0].desc, /against/);
  assert.equal(highestTariffItem([ao]).id, 'ao');
  // Restricted to level-banded schemes, it is never chosen.
  assert.equal(highestTariffItem([ao], { levelsOnly: true }), null);
});

test('levelsOnly passes over an AO-split 20 to a level-banded item when one can carry a panel', () => {
  const ao = { id: 'ao', marks: 20, likelyScore: '20 / 20', answerParagraphs: forAndAgainst, markScheme: aoSplit20 };
  const lv = { id: 'lv', marks: 8, likelyScore: '7–8 / 8', answerParagraphs: threePara, markScheme: levels8 };
  assert.equal(isLevelBanded(lv), true);
  assert.equal(highestTariffItem([ao, lv]).id, 'ao', 'unrestricted: the tariff wins');
  assert.equal(highestTariffItem([ao, lv], { levelsOnly: true }).id, 'lv');
});

test('Economics 1.3.5 in the real bank: no item can carry an honest panel once AO-split schemes are excluded', async () => {
  const answers = await load();
  const section = answers.filter((a) => a.subject === 'economics' && a.sectionNumber === '1.3.5');
  // Both 20-mark items are AO-split: the extract Evaluate AND the generic government-intervention
  // item the panel sat on before 12.7. The only level-banded item (Examine 8) is a 5–6/8 mid-band
  // exemplar whose panel E028 already suppresses. So the shell shows no panel on 1.3.5.
  const twenties = section.filter((a) => Number(a.marks) === 20);
  assert.equal(twenties.length, 2);
  for (const t of twenties) assert.equal(isLevelBanded(t), false, `${t.id} is AO-split`);
  assert.equal(highestTariffItem(section, { levelsOnly: true }), null);
});

/* ── E053 on every page (founder, 26 Sep 2026): the default, non-shell path gates on scheme shape ── */

test('the default path returns no panel for an objectives-split item', () => {
  const ao = { id: 'ao', marks: 20, likelyScore: '20 / 20', answerParagraphs: forAndAgainst, markScheme: aoSplit20 };
  assert.ok(midBandAttempt(ao), 'the item could carry a panel; only the scheme shape stops it');
  assert.equal(pagePanelItem([ao]), null);
});

test('the default path removes the panel rather than moving it to a lower level-banded item', () => {
  const ao = { id: 'ao', marks: 20, likelyScore: '20 / 20', answerParagraphs: forAndAgainst, markScheme: aoSplit20 };
  const lv = { id: 'lv', marks: 8, likelyScore: '7–8 / 8', answerParagraphs: threePara, markScheme: levels8 };
  assert.equal(pagePanelItem([ao, lv]), null, 'the top item is AO-split, so the page shows no panel');
  assert.equal(pagePanelItem([lv]).id, 'lv', 'a level-banded top item keeps its panel');
});

test('the real bank: exactly the eight objectives pages lose the default panel, the levels pages keep theirs', async () => {
  const answers = await load();
  const { isValidTariff } = await import(`file://${path.join(ROOT, 'lib/practice-tariffs.js')}`);
  const written = (subject, n) => answers
    .filter((a) => a.subject === subject && a.sectionNumber === n)
    .filter((a) => isValidTariff(subject, a.commandWord, a.marks));
  // Written down from audit/runs/packet-12.75/midband-census.txt, produced before the change.
  const lose = ['economics 2.3.2', 'economics 2.3.5', 'economics 2.3.6', 'economics 3.3.3', 'economics 4.3.2',
    'business 1.3.4', 'business 2.3.3', 'business 2.3.5'];
  const keep = {
    'business 1.3.1': 'market-research-8', 'business 2.3.2': 'break-even-8',
    'economics 1.3.3': 'supply-shift-8', 'economics 1.3.6': 'indirect-tax-8',
    'economics 2.3.1': 'unemployment-types-8', 'economics 2.3.3': 'supply-side-lras-8',
    'economics 2.3.4': 'multiplier-effect-8', 'economics 4.3.1': 'mnc-host-country-8',
    'economics 4.3.3': 'econ-j-curve-depreciation-8', 'economics 4.3.4': 'gini-lorenz-inequality-8',
    'economics 4.3.6': 'aid-vs-trade-development-8',
  };
  for (const key of lose) {
    const items = written(...key.split(' '));
    assert.ok(highestTariffItem(items), `${key} had a panel before`);
    assert.equal(pagePanelItem(items), null, `${key} must lose its panel`);
  }
  for (const [key, id] of Object.entries(keep)) {
    assert.equal(pagePanelItem(written(...key.split(' ')))?.id, id, `${key} keeps its panel on ${id}`);
  }
});
