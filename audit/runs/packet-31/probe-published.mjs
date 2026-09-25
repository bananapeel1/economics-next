/*
 * V035, the wider class: the probe over `audit/snapshots/*.json` can only see sections that a
 * packet has dumped a bundle for. It cannot see the BACK CATALOGUE — sections published straight
 * into `data` by the pre-remediation upgrade scripts, which never wrote a bundle file.
 *
 * `npm run validate` does read `data`, and `extras.shape` is BLOCK, so in principle it would have
 * shown these. In practice its 184 out-of-baseline findings are summarised BY RULE and
 * `extras.shape` does not appear in that summary — which is consistent with zero, but is not the
 * same as having asked. So ask, over both columns, for every section.
 */
import { supabase } from '../../../scripts/_db.mjs';

const { data: sections, error } = await supabase.from('sections').select('id').order('sort_order');
if (error) throw new Error(`sections: ${error.message}`);
if (!sections?.length) throw new Error('no sections returned — refusing to report green on an empty corpus');

const { data: rows, error: e2 } = await supabase.from('section_extras').select('section_id, data, draft');
if (e2) throw new Error(`section_extras: ${e2.message}`);

let checked = 0;
const bad = [];
for (const col of ['data', 'draft']) {
  for (const r of rows || []) {
    const evals = r[col]?.evaluation;
    if (!Array.isArray(evals)) continue;
    evals.forEach((e, i) => {
      checked++;
      const renders = typeof e?.content === 'string' && e.content.trim();
      if (!renders) bad.push(`${r.section_id} [${col}] frame ${i + 1}: keys {${Object.keys(e || {}).join(', ')}} — no \`content\` string, ExtrasTab prints an empty body`);
    });
  }
}

console.log(`${checked} evaluation frames checked across ${rows.length} section_extras rows, both \`data\` and \`draft\`.`);
if (bad.length) { console.log(`\n${bad.length} would render an empty card:`); for (const b of bad) console.log(`  ${b}`); process.exit(1); }
console.log('Every evaluation frame in the database renders a body.');
