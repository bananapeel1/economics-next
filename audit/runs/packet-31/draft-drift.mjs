/*
 * V035 drift check — what ELSE would re-staging change?
 *
 * Packets 23, 24, 25 and 27 staged days ago and were verified as staged. This packet edits one
 * key in each of their modules and must re-run `--stage`, which REPLACES THE WHOLE DRAFT. If any
 * of those modules drifted in the meantime — a shared helper moved, a bound was re-parsed, another
 * packet touched a util — re-staging silently ships a different, unverified section under a V035
 * fix, and nothing in the gate would say so: `validate` and `npm test` read files, Verify A reads
 * the diff, and the runners' own `loadBundle` reads `data`, not `draft` (packet 38, point 3).
 *
 * So: read the `draft` column that is live NOW, diff it against the bundle just built, and require
 * that the ONLY differences are inside extras.evaluation.
 *
 * Usage: node audit/runs/packet-31/draft-drift.mjs [--after]
 *   (default) compares live draft against the rebuilt bundle, expecting only evaluation to differ
 *   --after   run it again post-stage, expecting NOTHING to differ
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';

const AFTER = process.argv.includes('--after');

const TABLE_TO_KEY = {
  section_content: 'content', section_notes: 'notes', section_quiz: 'quiz',
  section_practice: 'practice', section_flashcards: 'flashcards', section_diagrams: 'diagrams',
  section_extras: 'extras', section_common_mistakes: 'mistakes',
};

const SECTIONS = [
  { n: 23, id: 'supply', bundle: 'audit/snapshots/packet-23-bundle__economics__supply.json' },
  { n: 24, id: 'price-determination', bundle: 'audit/snapshots/packet-24-bundle__economics__price-determination.json' },
  { n: 25, id: 'market-failure', bundle: 'audit/snapshots/packet-25-bundle__economics__market-failure.json' },
  { n: 27, id: 'business-objectives-strategy', bundle: 'audit/snapshots/packet-27-bundle__business__business-objectives-strategy.json' },
];

/** Every leaf path where two JSON trees disagree. */
function diffPaths(a, b, path = '', out = []) {
  if (a === b) return out;
  const ta = a === null ? 'null' : Array.isArray(a) ? 'array' : typeof a;
  const tb = b === null ? 'null' : Array.isArray(b) ? 'array' : typeof b;
  if (ta !== tb) { out.push(path || '(root)'); return out; }
  if (ta === 'array') {
    if (a.length !== b.length) { out.push(`${path}.length`); }
    for (let i = 0; i < Math.max(a.length, b.length); i++) diffPaths(a[i], b[i], `${path}[${i}]`, out);
    return out;
  }
  if (ta === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], path ? `${path}.${k}` : k, out);
    return out;
  }
  out.push(path || '(root)');
  return out;
}

let bad = [];
for (const s of SECTIONS) {
  const built = JSON.parse(readFileSync(s.bundle, 'utf8')).tables;
  const live = {};
  for (const [table, key] of Object.entries(TABLE_TO_KEY)) {
    const { data, error } = await supabase.from(table).select('draft').eq('section_id', s.id).maybeSingle();
    if (error) throw new Error(`${s.id} ${table}: ${error.message}`);
    live[key] = data ? data.draft : null;
  }

  const staged = Object.values(live).some((v) => v != null);
  if (!staged) { bad.push(`${s.id}: NOTHING is staged in \`draft\` — this section is not in the state the finding describes`); continue; }

  const paths = diffPaths(live, built);
  const evalOnly = paths.filter((p) => /^extras\.evaluation\b/.test(p));
  const other = paths.filter((p) => !/^extras\.evaluation\b/.test(p));

  console.log(`${s.id}  (packet ${s.n})`);
  console.log(`  draft vs rebuilt bundle: ${paths.length} differing paths — ${evalOnly.length} inside extras.evaluation, ${other.length} elsewhere`);
  if (other.length) {
    console.log(`  ELSEWHERE:`);
    for (const p of other.slice(0, 25)) console.log(`    ${p}`);
    if (other.length > 25) console.log(`    … and ${other.length - 25} more`);
  }
  if (AFTER && paths.length) bad.push(`${s.id}: ${paths.length} paths still differ AFTER staging — the draft does not match the bundle`);
  if (!AFTER && other.length) bad.push(`${s.id}: ${other.length} differing paths OUTSIDE extras.evaluation — re-staging would change more than V035`);
  if (!AFTER && !evalOnly.length) bad.push(`${s.id}: the draft already matches the rebuilt evaluation — nothing to fix, or the bundle was not rebuilt`);
}

if (bad.length) { console.log(`\nDRIFT CHECK FAILED:\n${bad.map((b) => `  - ${b}`).join('\n')}`); process.exit(1); }
console.log(AFTER
  ? '\nPost-stage: every field of all four drafts matches the bundle exactly.'
  : '\nPre-stage: the only thing re-staging changes in any of the four is extras.evaluation.');
