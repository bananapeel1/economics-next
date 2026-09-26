#!/usr/bin/env node
/**
 * Merge the three tagging passes and write the agreed tags into the two data files — packet 12.4,
 * E023/E024.
 *
 * THE RULE, fixed before any pass output was read: a tag is written when at least TWO of the three
 * passes proposed it. A tag one pass made alone is not a tag; it is a line on the review list.
 *
 *   pass 1  the packet author, reading each question's TEXT ONLY against that topic's oracle rows
 *   pass 2  four separate agents, one per unit, given only the question text and that topic's rows
 *   pass 3  audit/scripts/tag-lexical.mjs, the deterministic lexical matcher from packet 12.1
 *
 * Items with no agreed tag stay UNTAGGED — `specItems` absent, never `[]`. `lib/spec-coverage.js`
 * counts an absent `specItems` as untagged and an empty array as a contract failure, and collapsing
 * the two would let an untagged bank read as a clean one.
 *
 * The one item already tagged by packet 12.1 (`negative-externality-tax-8`) is a CONTROL: it runs
 * through all three passes and its result is reported, but its `specItems` are not rewritten here.
 */

import fs from 'node:fs';

const RUN = 'audit/runs/packet-12.4';
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

const p1 = read(`${RUN}/pass1-tags.json`).tags;
const p2 = read(`${RUN}/pass2-tags.json`).tags;
const p3 = read(`${RUN}/pass3-tags.json`).tags;
const oracle = read('audit/raw/spec-items.json');
const leafIds = new Set(oracle.items.filter((r) => r.kind === 'leaf').map((r) => r.id));
const wording = new Map(oracle.items.map((r) => [r.id, r.wording]));

const CONTROL = 'negative-externality-tax-8';

const keys = Object.keys(p1).sort();
const rows = keys.map((key) => {
  const s = [new Set(p1[key] || []), new Set(p2[key] || []), new Set(p3[key] || [])];
  const all = [...new Set([...s[0], ...s[1], ...s[2]])].sort();
  const votesFor = (id) => s.map((set, i) => (set.has(id) ? i + 1 : 0)).filter(Boolean);
  const agreed = all.filter((id) => votesFor(id).length >= 2);
  const dissent = all
    .filter((id) => votesFor(id).length === 1)
    .map((id) => ({ id, pass: votesFor(id)[0] }));
  const partial = agreed
    .filter((id) => votesFor(id).length === 2)
    .map((id) => ({ id, passes: votesFor(id) }));
  return { key, agreed, dissent, partial, counts: s.map((x) => x.size) };
});

for (const r of rows) for (const id of r.agreed) if (!leafIds.has(id)) throw new Error(`not a leaf: ${id}`);

/* ── write the data files ────────────────────────────────────────────────────────────────────── */

const FILES = ['data/modelAnswersData.js', 'data/modelAnswersExpansion.js'];
let written = 0;
const skippedControl = [];
for (const file of FILES) {
  let txt = fs.readFileSync(file, 'utf8');
  for (const r of rows) {
    if (!r.agreed.length) continue;
    if (r.key === CONTROL) { skippedControl.push(r.key); continue; }
    const anchor = `    id: '${r.key}',\n`;
    if (!txt.includes(anchor)) continue;
    if (txt.includes(`${anchor}    specItems:`)) throw new Error(`${r.key} already carries specItems`);
    const line = `    specItems: [${r.agreed.map((id) => `'${id}'`).join(', ')}],\n`;
    txt = txt.replace(anchor, anchor + line);
    written++;
  }
  fs.writeFileSync(file, txt);
}

const noTag = rows.filter((r) => !r.agreed.length).map((r) => r.key);
console.log(`agreed tags: ${rows.reduce((n, r) => n + r.agreed.length, 0)}`);
console.log(`items written: ${written}  (control skipped: ${[...new Set(skippedControl)].join(', ') || 'none'})`);
console.log(`items left untagged: ${noTag.length} — ${noTag.join(', ')}`);

fs.writeFileSync(`${RUN}/agreed-tags.json`, `${JSON.stringify({
  rule: 'a tag is written when at least two of the three passes proposed it',
  control: CONTROL,
  controlNote: 'ran through all three passes; its specItems were NOT rewritten — packet 12.1 owns them',
  rows,
}, null, 1)}\n`);

fs.writeFileSync(`${RUN}/merge-summary.json`, `${JSON.stringify({
  questions: rows.length,
  agreed: rows.reduce((n, r) => n + r.agreed.length, 0),
  unanimous: rows.reduce((n, r) => n + (r.agreed.length - r.partial.length), 0),
  twoOfThree: rows.reduce((n, r) => n + r.partial.length, 0),
  singlePass: rows.reduce((n, r) => n + r.dissent.length, 0),
  itemsWritten: written,
  itemsUntagged: noTag,
}, null, 1)}\n`);
console.log('wrote agreed-tags.json and merge-summary.json');
