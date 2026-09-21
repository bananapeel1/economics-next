#!/usr/bin/env node
/**
 * Packet 12.1 — the three section-number maps in data/modelAnswersData.js, E005's second half.
 *
 *   node scripts/packet-12-1-model-answer-maps.mjs           # report
 *   node scripts/packet-12-1-model-answer-maps.mjs --write
 *
 * Renumbering the 20 Business model answers is only half the job. Three maps in the same file are
 * keyed by section number, and two of them COLLIDE once Business uses IAL numbers, because IAL
 * Business 1.3.1 and IAL Economics 1.3.1 are different topics with the same number:
 *
 *   SECTION_MODEL_ANSWERS_LINKS — read by the Practice tab as LINKS[currentSection.number]. The app
 *     already numbers Business sections 1.3.1–2.3.5 (app/business/page.js), so today a Business
 *     student on Meeting Customer Needs is offered the ECONOMICS Introductory Concepts model
 *     answers, and the ten '1.1'–'2.5' Business entries match no section at all. Both halves of
 *     that bug are the same missing dimension: subject.
 *   SECTION_MODEL_ANSWERS_FAQ — read by SectionModelAnswersPage, same collision.
 *   MODEL_ANSWERS_SECTIONS — the browse filter's section list; its Business numbers are the old ones.
 *
 * So both keyed maps become `{ economics: {...}, business: {...} }`, and every reader passes the
 * subject it already knows.
 *
 * Two entries move on WORDING, not arithmetic, for the same reason E005 does:
 *   - the '1.2' FAQ pair is about primary and secondary market research, which bus_spec.txt:519-537
 *     puts under 1.3.1 Meeting customer needs. It merges into 1.3.1 rather than becoming 1.3.2.
 *   - the-market (1.3.2, demand/supply/elasticities) therefore has no FAQ and, after E005, no model
 *     answer either. Its LINKS entry is dropped rather than pointing the Practice tab at an empty
 *     page. Authoring a Business elasticity model answer is a content job, not this packet's.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILE = path.join(ROOT, 'data/modelAnswersData.js');
const WRITE = process.argv.includes('--write');

let text = fs.readFileSync(FILE, 'utf8');
const before = text;
const log = [];

/* Old unit-description heading -> IAL topic, one per Business model-answer page. Page identity, not
   item identity: the items were matched to the spec individually by the E005 script. */
const PAGE_TOPIC = {
  '1.1': '1.3.1', '1.2': '1.3.2', '1.3': '1.3.3', '1.4': '1.3.4', '1.5': '1.3.5',
  '2.1': '2.3.1', '2.2': '2.3.2', '2.3': '2.3.3', '2.4': '2.3.4', '2.5': '2.3.5',
};

function must(cond, msg) {
  if (!cond) throw new Error(msg);
}

function replaceOnce(from, to, label) {
  const i = text.indexOf(from);
  must(i >= 0, `not found: ${label}`);
  must(text.indexOf(from, i + 1) < 0, `ambiguous: ${label}`);
  text = text.slice(0, i) + to + text.slice(i + from.length);
  log.push(label);
}

/* ── 1. SECTION_MODEL_ANSWERS_FAQ ────────────────────────────────────────────────────────────── */

replaceOnce(
  'export const SECTION_MODEL_ANSWERS_FAQ = {\n',
  `/* Keyed by subject THEN section number: IAL Business 1.3.1 and IAL Economics 1.3.1 are different
   topics with the same number, so a flat map silently serves one subject's FAQ on the other's page.
   Packet 12.1, E005. */
const ECONOMICS_SECTION_FAQ = {\n`,
  'FAQ: split economics half',
);

/* The '1.1' and '1.2' entries both answer 1.3.1 questions. Dropping the `],` + `'1.2': [` pair
   between them merges the two arrays into one. */
replaceOnce(
  `  '1.1': [\n`,
  `};

/* Business FAQs. '1.1' and '1.2' merge: both pairs answer 1.3.1 questions — bus_spec.txt:508-546
   holds the market, market research and market positioning. 1.3.2 (demand, supply, elasticities)
   has no FAQ yet and is deliberately absent rather than filled with 1.3.1's. */
const BUSINESS_SECTION_FAQ = {
  '1.3.1': [\n`,
  'FAQ: open business half at 1.3.1',
);

replaceOnce(`  ],\n  '1.2': [\n`, '', 'FAQ: merge 1.2 market-research pair into 1.3.1');

for (const [oldKey, topic] of Object.entries(PAGE_TOPIC)) {
  if (oldKey === '1.1' || oldKey === '1.2') continue;
  replaceOnce(`  '${oldKey}': [\n`, `  '${topic}': [\n`, `FAQ: ${oldKey} -> ${topic}`);
}

/* Close BUSINESS_SECTION_FAQ and export the pair. The map's own closing `};` is the one directly
   before the browse-filter comment. */
replaceOnce(
  `};\n\n/* ── Section metadata for hierarchical browse filter ── */`,
  `};

export const SECTION_MODEL_ANSWERS_FAQ = {
  economics: ECONOMICS_SECTION_FAQ,
  business: BUSINESS_SECTION_FAQ,
};

/* ── Section metadata for hierarchical browse filter ── */`,
  'FAQ: export subject-keyed map',
);

/* ── 2. MODEL_ANSWERS_SECTIONS — the browse filter's Business numbers ────────────────────────── */

for (const [oldKey, topic] of Object.entries(PAGE_TOPIC)) {
  replaceOnce(`{ number: '${oldKey}', title:`, `{ number: '${topic}', title:`, `SECTIONS: ${oldKey} -> ${topic}`);
}

/* ── 3. SECTION_MODEL_ANSWERS_LINKS ──────────────────────────────────────────────────────────── */

replaceOnce(
  `export const SECTION_MODEL_ANSWERS_LINKS = {\n  // Economics\n`,
  `/* Subject THEN number, for the collision described above SECTION_MODEL_ANSWERS_FAQ. The Practice
   tab reads LINKS[subject][section.number]; before packet 12.1 it read LINKS[section.number] and
   offered every Business section the Economics page that shares its number. */
export const SECTION_MODEL_ANSWERS_LINKS = {
  economics: {\n`,
  'LINKS: open economics half',
);

replaceOnce(
  `  // Business\n  '1.1': '/business/meeting-customer-needs-model-answers',\n  '1.2': '/business/the-market-model-answers',\n`,
  `  },
  business: {
    // 1.3.2 (the-market) is absent on purpose: after E005 no model answer in the bank examines
    // Business demand, supply or elasticity, so the card would open an empty page.
    '1.3.1': '/business/meeting-customer-needs-model-answers',\n`,
  'LINKS: open business half, drop empty 1.3.2',
);

for (const [oldKey, topic] of Object.entries(PAGE_TOPIC)) {
  if (oldKey === '1.1' || oldKey === '1.2') continue;
  replaceOnce(`  '${oldKey}': '/business/`, `    '${topic}': '/business/`, `LINKS: ${oldKey} -> ${topic}`);
}

/* Indent the economics entries into their new nesting and close the object. */
text = text.replace(
  /(export const SECTION_MODEL_ANSWERS_LINKS = \{\n  economics: \{\n)([\s\S]*?)(\n  \},\n  business: \{)/,
  (_, head, body, tail) => head + body.replace(/^ {2}'/gm, "    '") + tail,
);
replaceOnce(
  `  '2.3.5': '/business/external-influences-model-answers',\n};`,
  `    '2.3.5': '/business/external-influences-model-answers',\n  },\n};`,
  'LINKS: close business half',
);

for (const l of log) console.log(`  ok  ${l}`);
console.log(`\n${log.length} edits${WRITE ? '' : ' (dry run — pass --write)'}`);
if (WRITE && text !== before) {
  fs.writeFileSync(FILE, text);
  console.log('written');
}
