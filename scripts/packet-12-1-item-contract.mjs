#!/usr/bin/env node
/**
 * Packet 12.1, E001 — put the item contract on the model-answer bank.
 *
 *   node scripts/packet-12-1-item-contract.mjs           # report
 *   node scripts/packet-12-1-item-contract.mjs --write
 *
 * Adds `kind`, `ao` and `stimulusRef` to all 66 items in data/modelAnswersData.js and
 * modelAnswersExpansion.js. `ao` is DERIVED from lib/ao-spec.js via lib/exam-item.js and never
 * typed; run this again after any command-word change and the arrays follow.
 *
 * `specItems` is NOT written here. It is written by the pass that reads a question against the
 * oracle — E005's wording match for the 20 Business items, E007's two-pass tagging for Market
 * Failure — because a tag produced by the same pass that wrote the question certifies nothing.
 * See audit/EXAM-PRACTICE.md, "The independence rule".
 *
 * Idempotent: the fields are replaced in place when they already exist.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { aoListFor, kindForCommand } from '../lib/exam-item.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const FILES = ['data/modelAnswersData.js', 'data/modelAnswersExpansion.js'].map((p) => path.join(ROOT, p));

const { MODEL_ANSWERS } = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);

const texts = new Map(FILES.map((f) => [f, fs.readFileSync(f, 'utf8')]));

/** The `{ … }` block of one item, by its id line, closed by brace matching outside strings. */
function blockFor(text, id) {
  const idLine = `\n    id: '${id}',\n`;
  const at = text.indexOf(idLine);
  if (at < 0) return null;
  const open = text.lastIndexOf('{', at);
  let depth = 0;
  let inStr = null;
  for (let i = open; i < text.length; i++) {
    const c = text[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === "'" || c === '"' || c === '`') { inStr = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) return { start: open, end: i + 1, body: text.slice(open, i + 1) };
    }
  }
  return null;
}

function setOrInsert(body, key, literal) {
  const existing = new RegExp(`\\n    ${key}: [\\s\\S]*?,\\n(?=    [A-Za-z]|  \\})`);
  if (existing.test(body)) return body.replace(existing, `\n    ${key}: ${literal},\n`);
  // New fields sit directly after `marks`, beside the other facts about the question itself.
  return body.replace(/(\n    marks: [^\n]*,\n)/, `$1    ${key}: ${literal},\n`);
}

let changed = 0;
const unknownAO = [];

for (const item of MODEL_ANSWERS) {
  const ao = aoListFor(item.subject, item.commandWord);
  if (!ao) { unknownAO.push(`${item.id} (${item.subject} ${item.commandWord})`); continue; }
  const kind = kindForCommand(item.commandWord);

  let hit = false;
  for (const file of FILES) {
    const text = texts.get(file);
    const block = blockFor(text, item.id);
    if (!block) continue;
    hit = true;
    let body = block.body;
    body = setOrInsert(body, 'kind', `'${kind}'`);
    body = setOrInsert(body, 'ao', `[${ao.map((a) => `'${a}'`).join(', ')}]`);
    body = setOrInsert(body, 'stimulusRef', 'null');
    if (body !== block.body) changed++;
    texts.set(file, text.slice(0, block.start) + body + text.slice(block.end));
    break;
  }
  if (!hit) throw new Error(`${item.id}: not found in either data file`);
}

console.log(`${changed} of ${MODEL_ANSWERS.length} items given kind / ao / stimulusRef${WRITE ? '' : ' (dry run)'}`);
if (unknownAO.length) {
  console.log(`\n${unknownAO.length} item(s) whose command word is not in Appendix 6 for their subject — left untouched:`);
  for (const u of unknownAO) console.log(`  ${u}`);
}
if (WRITE) {
  for (const [file, text] of texts) fs.writeFileSync(file, text);
  console.log('written');
}
