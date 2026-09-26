/**
 * `lib/stimulus.js` figures — packet 12.75, E047.
 *
 * Run against the REAL 1.3.5 extract, read off disk the way the page reads it, so an edit to the
 * extract that loses a figure fails here rather than silently unlinking the model answer.
 *
 * One correction to the spec it implements: audit/specs/packet-12.75.md writes the two elasticities
 * with a true minus sign (U+2212). The extract's `## Stimulus` section writes both with an ASCII
 * hyphen-minus, and so does every model answer, so the figures asserted below are the hyphen form.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseStimulus, figuresIn, figureSpans, withFigures, linkFigures } from './stimulus.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const extract = () => parseStimulus(fs.readFileSync(path.join(ROOT, 'content/data-response/econ-u1-market-failure.md'), 'utf8'));

test('figuresIn finds every figure the spec names in the 1.3.5 extract', () => {
  const texts = figuresIn(extract()).map((f) => f.text);
  for (const t of ['AED 0.25', 'AED 0.18', '45%', '-1.4', '32%', '-0.6', '12.3%', 'USD 25 billion']) {
    assert.ok(texts.includes(t), `missing ${t}`);
  }
});

test('years are not figures', () => {
  const texts = figuresIn(extract()).map((f) => f.text);
  for (const y of ['2017', '2024', '2025']) assert.ok(!texts.some((t) => t.includes(y)), `${y} read as a figure`);
});

test('ids are stable and unique, repeats numbered in document order', () => {
  const a = figuresIn(extract());
  const b = figuresIn(extract());
  assert.deepEqual(a.map((f) => f.id), b.map((f) => f.id));
  assert.equal(new Set(a.map((f) => f.id)).size, a.length);
  const aed = a.filter((f) => f.text === 'AED 0.25').map((f) => f.id);
  assert.deepEqual(aed, ['fig-aed-0-25', 'fig-aed-0-25-2'], 'paragraph first, then the table');
});

test('table figures carry their row, prose figures do not', () => {
  const f = figuresIn(extract());
  assert.equal(f.find((x) => x.text === '-1.4').row, 2, 'plastic bags is the third body row');
  assert.equal(f.find((x) => x.text === '45%').row, undefined);
});

test('a hyphenated word is not a signed figure, and a bare count is not a figure', () => {
  assert.deepEqual(figureSpans('type-2 diabetes in 2024').filter((p) => p.kind === 'figure'), []);
  assert.deepEqual(figureSpans('a PED of -1.4 (or −0.6)').filter((p) => p.kind === 'figure').map((p) => p.text), ['-1.4', '−0.6']);
});

test('withFigures keeps every character of the extract', () => {
  const blocks = extract();
  const joined = (bs) => bs.map((b) => (b.kind === 'table'
    ? [...(b.caption || []).map((t) => t.text), ...b.head, ...b.rows.flat()].join('|')
    : b.tokens.map((t) => t.text).join(''))).join('\n');
  const rejoined = withFigures(blocks).map((b) => (b.kind === 'table'
    ? [...(b.caption || []).map((t) => t.parts.map((p) => p.text).join('')), ...b.headParts.map((c) => c.map((p) => p.text).join('')), ...b.rowParts.flat().map((c) => c.map((p) => p.text).join(''))].join('|')
    : b.tokens.map((t) => t.parts.map((p) => p.text).join('')).join(''))).join('\n');
  assert.equal(rejoined, joined(blocks));
});

test('linkFigures wraps exact occurrences in text only, never inside a tag, longest first', () => {
  const html = '<strong class="x" title="AED 0.25">price of AED 0.25</strong>, USD 25 billion, -1.4 and −1.4, not 145%';
  const out = linkFigures(html, ['AED 0.25', 'USD 25 billion', '25 billion', '-1.4', '45%']);
  assert.match(out, /title="AED 0.25"/, 'attribute untouched');
  assert.equal((out.match(/class="ps-fig"/g) || []).length, 4);
  assert.match(out, /data-fig-text="USD 25 billion">USD 25 billion</);
  assert.match(out, /data-fig-text="-1.4">−1.4</, 'a true minus links to the extract’s hyphen figure');
  assert.doesNotMatch(out, /145<\/button>|>45%</, '45% inside 145% is not a figure');
});
