#!/usr/bin/env node
/**
 * PACKET 13's acceptance check: a term census over live content, all 43 sections, all 8 tables.
 *
 *   node audit/scripts/packet-13-census.mjs            report; exit 1 if anything is off-specification
 *   node audit/scripts/packet-13-census.mjs --verbose  print every hit with its path
 *
 * Two questions, asked of the database rather than of the plan that was supposed to change it:
 *
 *   D009  Is any framework the IAL specification does not contain still taught anywhere?
 *   D012  Is anything this packet removed still ASSESSED anywhere — a quiz question, a practice
 *         item or a flashcard testing material no section teaches any more? Removing a block and
 *         leaving the questions behind produces the assessed-but-never-taught defect the audit found
 *         seventeen times, so the census looks at the assessment tables specifically.
 *
 * The first strip missed eleven mentions because it worked from a list of sections. This works from
 * the corpus, which is why it is a census and not a checklist.
 *
 * Reads the database. Writes nothing.
 */
import { supabase } from '../../scripts/_db.mjs';
import { loadBundle } from '../../lib/content-gate.mjs';

const VERBOSE = process.argv.includes('--verbose');

/**
 * Each term, why it is off-specification, and where the specification does put it if anywhere.
 * `owner` null means the term appears nowhere in either specification.
 */
const BANNED = [
  { re: /\b(de)?merit goods?\b/i, label: 'merit / demerit good', owner: null,
    why: '"merit" appears 0 times in the IAL Economics specification; it says external benefits and costs of consumption (1.3.5.2c) and information gaps (1.3.5.4b)' },
  { re: /\bdeadweight\b/i, label: 'deadweight', owner: null,
    why: 'the specification says "welfare loss or gain areas" (1.3.5.2d) and "a net welfare loss" (1.3.6.2a), never deadweight' },
  { re: /\bVRIO\b/, label: 'VRIO', owner: null, why: '0 occurrences in the IAL Business specification' },
  { re: /\bcore competenc(y|ies|e)\b/i, label: 'core competencies', owner: null, why: '0 occurrences in the IAL Business specification' },
  { re: /\bdistinctive capabilit/i, label: 'distinctive capabilities', owner: null, why: '0 occurrences in the IAL Business specification' },
  { re: /\bbalanced scorecard\b/i, label: 'balanced scorecard', owner: null, why: '0 occurrences in the IAL Business specification' },
  { re: /\btriple bottom line\b/i, label: 'triple bottom line', owner: null, why: '0 occurrences in the IAL Business specification' },
  { re: /\baccelerator\b/i, label: 'the accelerator', owner: null, why: '0 occurrences in the IAL Economics specification; UK GCE Theme 2 material' },
];

/**
 * Terms that ARE in the specification but belong to a named topic. A section that is not the owner
 * teaching them is a duplication question, not an off-specification one, so these are reported and
 * do not fail the census. audit/SPEC-OWNERSHIP.md is the map.
 */
const OWNED_ELSEWHERE = [
  { re: /\bfive forces\b/i, label: "Porter's five forces", owners: ['business-objectives-strategy', 'global-markets-expansion'], spec: 'business 3.3.1.4c and 4.3.2.2b' },
  { re: /\bthe multiplier\b/i, label: 'the multiplier', owners: ['national-income', 'aggregate-demand'], spec: 'economics 2.3.4.4a-d' },
  { re: /\bdemerger/i, label: 'demergers', owners: ['types-sizes-businesses'], spec: 'economics 3.3.1.2g' },
  { re: /\bprice mechanism\b/i, label: 'the price mechanism', owners: ['price-determination'], spec: 'economics 1.3.4.3a-b' },
];

const TEACHING = ['content', 'notes', 'extras', 'diagrams'];
const ASSESSMENT = ['quiz', 'practice', 'flashcards', 'mistakes'];

/** Every string in a payload, with the path that reaches it. Keys named `id` are skipped: an id is
 *  a reference a student's progress row points at, and packet 13 deliberately never rewrites one. */
function strings(value, path = '', out = [], key = null) {
  if (key === 'id') return out;
  if (typeof value === 'string') { out.push([path, value]); return out; }
  if (Array.isArray(value)) { value.forEach((v, i) => strings(v, `${path}[${i}]`, out)); return out; }
  if (value && typeof value === 'object') { for (const [k, v] of Object.entries(value)) strings(v, `${path}.${k}`, out, k); return out; }
  return out;
}

const { data: sections, error } = await supabase.from('sections').select('id').order('sort_order');
if (error) { console.error(`sections: ${error.message}`); process.exit(1); }

const hits = [];
for (const { id } of sections) {
  const bundle = await loadBundle(supabase, id);
  for (const [table, payload] of Object.entries(bundle)) {
    for (const [path, text] of strings(payload)) {
      for (const term of BANNED) if (term.re.test(text)) hits.push({ id, table, path, text, term });
      for (const term of OWNED_ELSEWHERE) {
        // Only a TITLE counts as teaching a topic. Every section may mention the price mechanism in
        // passing; the duplication signal is a block or subsection built around it, which is what
        // the ownership map is about.
        const isTitle = /\.title$/.test(path) && /^\.content/.test(path);
        if (isTitle && term.re.test(text) && !term.owners.includes(id)) hits.push({ id, table, path, text, term, owned: true });
      }
    }
  }
}

const banned = hits.filter((h) => !h.owned);
const owned = hits.filter((h) => h.owned);

console.log(`census over ${sections.length} sections, ${TEACHING.length + ASSESSMENT.length} tables each\n`);

console.log('D009 — frameworks the IAL specification does not contain');
for (const term of BANNED) {
  const mine = banned.filter((h) => h.term === term);
  const assessed = mine.filter((h) => ASSESSMENT.includes(h.table));
  const flag = mine.length ? (assessed.length ? 'TAUGHT AND ASSESSED' : 'still present') : 'clear';
  console.log(`  ${term.label.padEnd(26)} ${String(mine.length).padStart(4)} hit${mine.length === 1 ? ' ' : 's'}   ${flag}`);
  if (VERBOSE) for (const h of mine) console.log(`      ${h.id} ${h.table}${h.path}\n        ${h.text.slice(0, 140)}`);
}

console.log('\nD012 — assessment left behind by a removal');
const strandedByTerm = new Map();
for (const h of banned.filter((x) => ASSESSMENT.includes(x.table))) {
  strandedByTerm.set(h.term.label, (strandedByTerm.get(h.term.label) || 0) + 1);
}
if (!strandedByTerm.size) console.log('  clear: no quiz, practice, flashcard or mistake item tests removed material');
else for (const [label, n] of strandedByTerm) console.log(`  ${label}: ${n} assessment item(s) still test it`);

console.log('\nD011 — terms the specification assigns to another section (reported, never failed)');
for (const term of OWNED_ELSEWHERE) {
  const mine = owned.filter((h) => h.term === term);
  const secs = [...new Set(mine.map((h) => h.id))];
  console.log(`  ${term.label.padEnd(26)} owner: ${term.owners.join(', ')} (${term.spec})`);
  console.log(`  ${''.padEnd(26)} taught under its own heading elsewhere in: ${secs.length ? secs.map((x) => `${x} (${mine.filter((h) => h.id === x).map((h) => `"${h.text}"`).join(', ')})`).join('; ') : 'nowhere'}`);
}

if (banned.length) {
  console.log(`\nFAIL: ${banned.length} off-specification mention(s) remain. Re-run with --verbose for paths.`);
  process.exit(1);
}
console.log('\nPASS: no off-specification framework is taught or assessed in live content.');
