#!/usr/bin/env node
//
// node audit/scripts/spec-overlap.mjs <sectionA> <sectionB>
//
//   exit 0  the two sections' topics share no spec item
//   exit 1  they share at least one, and the shared ids are printed
//   exit 2  a section slug was not recognised
//
// Packet 12.1, E008.
//
// WHY THIS IS NOT A CURIOSITY. IAL Economics and IAL Business number their topics in the same
// space. Business 4.3.1 is "Globalisation" and Economics 4.3.1 is "Causes and effects of
// globalisation", and they are different requirements with the same label. Packet 33's brief is the
// worked example: four findings asked the Business section to teach trade creation, trade diversion
// and the ladder of economic integration, and every one of those phrases appears in the Economics
// specification at econ_spec.txt:1659-1670 and NOWHERE in the Business one. The Business 4.3.1
// requirement asks only for "Expansion of trading blocs" and "The impact on businesses of trading
// blocs". A packet that had looked its number up instead of its wording would have taught a
// Business student an Economics topic — and rule 1 exists because 154 ledger items cite numbers
// that do not exist in the IAL specification at all.
//
// HOW A SECTION RESOLVES. Slug -> topic number, through the `bySection` keys of
// audit/raw/spec-coverage.json. A topic's spec items are then every row in
// audit/raw/spec-items.json carrying that number, IN EITHER SUBJECT — which is the point. Resolving
// within one subject would make every cross-subject collision invisible, and the collision is the
// thing worth a non-zero exit.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

const [a, b] = process.argv.slice(2).filter((x) => !x.startsWith('--'));
const QUIET = process.argv.includes('--quiet');

if (!a || !b) {
  console.error('usage: node audit/scripts/spec-overlap.mjs <sectionA> <sectionB>');
  process.exit(2);
}

const coverage = read('audit/raw/spec-coverage.json');
const oracle = read('audit/raw/spec-items.json');

const sections = new Map();
for (const s of coverage.bySection) {
  const [subject, slug] = s.key.split('__');
  sections.set(slug, { slug, subject, topic: s.number, title: s.title });
}

function resolve(slug) {
  const s = sections.get(slug);
  if (!s) {
    console.error(`no section "${slug}". Known slugs are the 43 keys of audit/raw/spec-coverage.json, e.g. ${[...sections.keys()].slice(0, 3).join(', ')}…`);
    process.exit(2);
  }
  return s;
}

const A = resolve(a);
const B = resolve(b);

const idsFor = (topic) => oracle.items.filter((r) => r.topic === topic);
const rowsA = idsFor(A.topic);
const rowsB = idsFor(B.topic);
const setB = new Set(rowsB.map((r) => r.id));
const shared = rowsA.filter((r) => setB.has(r.id));

if (!QUIET) {
  console.log('');
  console.log(`${a}  ->  ${A.subject} ${A.topic}  ${A.title}   (${rowsA.length} spec items)`);
  console.log(`${b}  ->  ${B.subject} ${B.topic}  ${B.title}   (${rowsB.length} spec items)`);
  console.log('');
  if (!shared.length) {
    console.log('disjoint — the two topics share no spec item.');
  } else {
    if (A.subject !== B.subject) {
      console.log(`Both sections are numbered ${A.topic}, in different subjects. A requirement cited by number`);
      console.log('alone is ambiguous between them; find it by its wording in audit/raw/*_spec.txt instead.');
      console.log('');
    }
    console.log(`${shared.length} shared spec item${shared.length === 1 ? '' : 's'}:`);
    for (const r of shared) {
      console.log(`  ${r.id.padEnd(20)}${r.kind.padEnd(12)}${r.wording.slice(0, 84)}`);
    }
  }
  console.log('');
}

process.exit(shared.length ? 1 : 0);
