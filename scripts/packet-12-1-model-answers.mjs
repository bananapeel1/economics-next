#!/usr/bin/env node
/**
 * Packet 12.1 — the model-answer bank's two data fixes, E004 and E005.
 *
 * Run once, idempotent, dry by default:
 *   node scripts/packet-12-1-model-answers.mjs          # report only
 *   node scripts/packet-12-1-model-answers.mjs --write  # rewrite the two data files
 *
 * E004 — the 30 `Analyse 8` items. `Analyse` is a 6-mark command in BOTH IAL subjects
 * (lib/ial-marking.js, from audit/raw/econ_spec.txt and bus_spec.txt). Eight marks is `Examine` in
 * Economics and `Discuss` in Business. Thirty model answers rehearsed a pairing that appears on no
 * paper, and their mark schemes were point-based ("1–2 marks: Knowledge…") where anything above six
 * marks is levels-marked. Each item gets: the right command word, a levels grid built from
 * audit/raw/tariff-census.json's VERBATIM description of that command, its old point scheme kept as
 * indicative content, a `type` that names the objectives the command actually assesses, and a
 * question stem whose first word matches.
 *
 * E005 — the 20 Business items carried `sectionNumber` 1.1–2.5. Those are the Business spec's UNIT
 * description headings, not topics; IAL Business topics are 1.3.1–4.3.4. The new number for each
 * item is chosen by matching the QUESTION'S WORDING to the specification text — never by arithmetic
 * on the old number, which would have put `market-research-8` in 1.3.2 when primary market research
 * is 1.3.1. The evidence is recorded on the item as `specSource: 'bus_spec.txt:<lines>'` and
 * `specItems`, both taken from audit/raw/spec-items.json, which is generated from bus_spec.txt.
 *
 * Nothing here touches a content table. This edits two source files only.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WRITE = process.argv.includes('--write');
const FILES = ['data/modelAnswersData.js', 'data/modelAnswersExpansion.js'].map((p) => path.join(ROOT, p));

const census = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/tariff-census.json'), 'utf8'));
const oracle = JSON.parse(fs.readFileSync(path.join(ROOT, 'audit/raw/spec-items.json'), 'utf8'));

function censusRow(subject, command, marks) {
  const row = census.rows.find(
    (r) => r.subject === subject && r.command === command && r.marks.includes(marks),
  );
  if (!row) throw new Error(`tariff-census has no ${subject} ${command} ${marks}`);
  return row;
}

/* ── E004: the levels grids ──────────────────────────────────────────────────────────────────── */

/**
 * A four-level grid for an 8-mark levels-marked command. Every descriptor is built from the clauses
 * of the census row's own description, so the grid cannot drift from the specification's wording:
 * the clause list is quoted at the top of each grid as `Command (8) requires: <description>`.
 */
function levelsGrid(subject, command, marks, ladder) {
  const row = censusRow(subject, command, marks);
  return [
    { range: `${command} (${marks})`, desc: `Appendix 6: ${row.description}` },
    ...ladder,
  ];
}

const EXAMINE_8_LADDER = [
  { range: 'Level 1 — 1–2 marks', desc: 'Isolated knowledge and understanding. No application to the context and no chain of reasoning.' },
  { range: 'Level 2 — 3–4 marks', desc: 'Knowledge applied to the context. A chain of reasoning is begun but not carried through; any data given is described rather than interpreted.' },
  { range: 'Level 3 — 5–6 marks', desc: 'A developed chain of reasoning in context, with a diagram where one is appropriate. Depth rather than breadth; data interpreted. Assessment is implied rather than made.' },
  { range: 'Level 4 — 7–8 marks', desc: 'A developed chain of reasoning in context AND a brief assessment of the arguments, factors or evidence — the clause that separates Examine from Analyse.' },
];

const DISCUSS_8_LADDER = [
  { range: 'Level 1 — 1–2 marks', desc: 'Isolated knowledge. Not set in the context of the business and no chain of reasoning.' },
  { range: 'Level 2 — 3–4 marks', desc: 'Knowledge used in the context of the business. A cause is identified but the chain is not carried through to an effect.' },
  { range: 'Level 3 — 5–6 marks', desc: 'A logical chain of reasoning in context showing cause and effect. No awareness of competing arguments or factors.' },
  { range: 'Level 4 — 7–8 marks', desc: 'A logical chain of reasoning in context showing cause(s) and effect(s) AND a brief assessment showing awareness of competing arguments or factors — the clause that separates Discuss from Analyse.' },
];

/** The item's old point-based scheme, kept verbatim as the grid's indicative content. */
function indicativeFrom(markScheme) {
  const parts = markScheme
    .map((r) => String(r.desc || '').trim())
    .filter(Boolean)
    .map((d) => (/[.!?]$/.test(d) ? d : `${d}.`));
  return { range: 'Indicative content', desc: parts.join(' ') };
}

/* ── E005: the Business section numbers, matched by wording ──────────────────────────────────── */

/**
 * One row per Business model answer: the spec-item ids its question examines, found by reading the
 * question against the specification text rather than by renumbering. `lines` is the span in
 * bus_spec.txt those ids cover and becomes the item's `specSource`.
 *
 * The three that do NOT follow from arithmetic on the old number are marked. They are the reason
 * this is a wording match: `1.2` is "The Market", but a question about primary market research is
 * examined under 1.3.1 Meeting Customer Needs, where the spec puts market research.
 */
const BUSINESS_SPEC_MATCH = {
  'market-segmentation-4':          ['BUS-1.3.1-3c'],
  'market-research-8':              ['BUS-1.3.1-2a-1', 'BUS-1.3.1-2a-2', 'BUS-1.3.1-2a-3', 'BUS-1.3.1-2b-1', 'BUS-1.3.1-2b-2', 'BUS-1.3.1-2b-3', 'BUS-1.3.1-2b-4'], // NOT 1.3.2: market research is 1.3.1
  'biz-niche-mass-advantages-8':    ['BUS-1.3.1-1a-1', 'BUS-1.3.1-1a-2'],
  'marketing-mix-4':                ['BUS-1.3.3-1d'],
  'biz-product-life-cycle-8':       ['BUS-1.3.3-1b'],
  'motivation-maslow-4':            ['BUS-1.3.4-4a', 'BUS-1.3.4-4b-3'],
  'recruitment-approaches-8':       ['BUS-1.3.4-2a-1'],
  'biz-motivation-productivity-20': ['BUS-1.3.4-4c-1', 'BUS-1.3.4-4c-2', 'BUS-1.3.4-4c-3', 'BUS-1.3.4-4c-4', 'BUS-1.3.4-4c-5', 'BUS-1.3.4-4d-1', 'BUS-1.3.4-4d-6'],
  'entrepreneur-role-4':            ['BUS-1.3.5-1a', 'BUS-1.3.5-1b'],
  'biz-entrepreneur-role-8':        ['BUS-1.3.5-2a'],
  'sources-finance-8':              ['BUS-2.3.1-3a-1', 'BUS-2.3.1-3a-2', 'BUS-2.3.1-3a-3', 'BUS-2.3.1-3a-4', 'BUS-2.3.1-3a-5'],
  'biz-internal-external-finance-4': ['BUS-2.3.1-2a', 'BUS-2.3.1-2b', 'BUS-2.3.1-2c', 'BUS-2.3.1-3a-1', 'BUS-2.3.1-3a-2'],
  'break-even-8':                   ['BUS-2.3.2-3c', 'BUS-2.3.2-3e', 'BUS-2.3.2-3f'],
  'biz-break-even-definition-4':    ['BUS-2.3.2-3b-1', 'BUS-2.3.2-3c'],
  'liquidity-ratios-4':             ['BUS-2.3.3-2b-1', 'BUS-2.3.3-2c'],
  'cash-flow-management-8':         ['BUS-2.3.3-2b-2', 'BUS-2.3.3-2c'],
  'biz-cash-flow-profit-20':        ['BUS-2.3.3-2a', 'BUS-2.3.3-2c', 'BUS-2.3.3-3a-1'],
  'lean-production-8':              ['BUS-2.3.4-3d', 'BUS-2.3.4-3e', 'BUS-2.3.4-3f'],
  'biz-capacity-utilisation-4':     ['BUS-2.3.4-2a', 'BUS-2.3.4-2c'],
  'interest-rate-retail-20':        ['BUS-2.3.5-1a-3'],
};

const byId = new Map(oracle.items.map((r) => [r.id, r]));

function specFactsFor(itemId) {
  const ids = BUSINESS_SPEC_MATCH[itemId];
  if (!ids) return null;
  const rows = ids.map((id) => {
    const r = byId.get(id);
    if (!r) throw new Error(`spec-items.json has no ${id} (cited for ${itemId})`);
    return r;
  });
  const topics = [...new Set(rows.map((r) => r.topic))];
  if (topics.length !== 1) throw new Error(`${itemId} cites ids across topics ${topics.join(', ')}`);
  const lo = Math.min(...rows.map((r) => r.lines[0]));
  const hi = Math.max(...rows.map((r) => r.lines[1]));
  return { topic: topics[0], specSource: `bus_spec.txt:${lo}-${hi}`, specItems: ids };
}

/* ── Rewriting the source text ───────────────────────────────────────────────────────────────── */

/** The `{ … }` block of one item, located by its id line and closed by brace matching. */
function blockFor(text, id) {
  const marker = new RegExp(`^(\\s*)id: '${id.replace(/[.*+?^$()|[\\]\\\\]/g, '\\\\$&')}',$`, 'm');
  const m = marker.exec(text);
  if (!m) return null;
  let open = text.lastIndexOf('{', m.index);
  if (open < 0) return null;
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

/** Replace one top-level `key: <value>,` inside an item block. Indent is four spaces in both files. */
function setField(body, key, literal) {
  const re = new RegExp(`\\n    ${key}: [\\s\\S]*?,\\n(?=    [A-Za-z]|  \\})`);
  if (!re.test(body)) return null;
  return body.replace(re, `\n    ${key}: ${literal},\n`);
}

/** Insert `key: <literal>,` immediately after the item's `id:` line when the key is absent. */
function addFieldAfterId(body, key, literal) {
  return body.replace(/(\n    id: '[^']*',\n)/, `$1    ${key}: ${literal},\n`);
}

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function markSchemeLiteral(rows) {
  const lines = rows.map((r) => `      { range: ${q(r.range)}, desc: ${q(r.desc)} },`);
  return `[\n${lines.join('\n')}\n    ]`;
}

function arrayLiteral(items) {
  return `[${items.map(q).join(', ')}]`;
}

/* ── Main ────────────────────────────────────────────────────────────────────────────────────── */

const { MODEL_ANSWERS } = await import(`file://${path.join(ROOT, 'data/modelAnswersData.js')}`);
const answers = new Map(MODEL_ANSWERS.map((a) => [a.id, a]));

const changes = [];
const texts = new Map(FILES.map((f) => [f, fs.readFileSync(f, 'utf8')]));

for (const [id, item] of answers) {
  const edits = [];

  /* E004 */
  if (item.commandWord === 'Analyse' && item.marks === 8) {
    const command = item.subject === 'business' ? 'Discuss' : 'Examine';
    const ladder = command === 'Discuss' ? DISCUSS_8_LADDER : EXAMINE_8_LADDER;
    const grid = [...levelsGrid(item.subject, command, 8, ladder), indicativeFrom(item.markScheme)];
    edits.push(['commandWord', q(command)]);
    edits.push(['type', q('Analysis & Evaluation')]);
    edits.push(['markScheme', markSchemeLiteral(grid)]);
    const stem = item.question.replace(/^Analyse\b/, command);
    if (stem === item.question) throw new Error(`${id}: question does not start with "Analyse"`);
    edits.push(['question', q(stem)]);
  }

  /* E005 */
  if (item.subject === 'business') {
    const facts = specFactsFor(id);
    if (!facts) throw new Error(`no spec match recorded for Business item ${id}`);
    edits.push(['sectionNumber', q(facts.topic)]);
    edits.push(['__add:specSource', q(facts.specSource)]);
    edits.push(['__add:specItems', arrayLiteral(facts.specItems)]);
  }

  if (!edits.length) continue;

  let hit = false;
  for (const file of FILES) {
    const text = texts.get(file);
    const block = blockFor(text, id);
    if (!block) continue;
    hit = true;
    let body = block.body;
    for (const [key, literal] of edits) {
      if (key.startsWith('__add:')) {
        const real = key.slice(6);
        body = setField(body, real, literal) ?? addFieldAfterId(body, real, literal);
      } else {
        const next = setField(body, key, literal);
        if (next === null) throw new Error(`${id}: could not find field ${key}`);
        body = next;
      }
    }
    texts.set(file, text.slice(0, block.start) + body + text.slice(block.end));
    changes.push({ id, file: path.relative(ROOT, file), fields: edits.map(([k]) => k.replace('__add:', '')) });
    break;
  }
  if (!hit) throw new Error(`${id}: not found in either data file`);
}

for (const c of changes) console.log(`${c.file.padEnd(32)} ${c.id.padEnd(34)} ${c.fields.join(' ')}`);
console.log(`\n${changes.length} items changed${WRITE ? '' : ' (dry run — pass --write)'}`);

if (WRITE) {
  for (const [file, text] of texts) fs.writeFileSync(file, text);
  console.log('written');
}
