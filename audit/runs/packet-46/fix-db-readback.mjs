// READ-ONLY. Each table's `draft` and `data` columns for growth-development, compared key-sorted (jsonb reorders keys):
// draft against the new dump (worktree), data (live) against the pre-fix dump (git index). Covers the whole bank,
// not only the signed-out slice. Run from the worktree root: node audit/runs/packet-46/fix-db-readback.mjs
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { supabase } from '../../../scripts/_db.mjs';
const P = 'audit/snapshots/packet-46-bundle__economics__growth-development.json';
const after = JSON.parse(readFileSync(P, 'utf8')).tables;
const before = JSON.parse(execFileSync('git', ['show', `:${P}`], { encoding: 'utf8', maxBuffer: 1 << 26 })).tables;
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const J = (v) => JSON.stringify(canon(v));
const TABLES = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
let bad = 0;
for (const [k, t] of Object.entries(TABLES)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'growth-development').single();
  if (error) { console.log(`${t}: ${error.message}`); bad++; continue; }
  // A NULL draft is what publish leaves behind; ?draft=1 then serves `data` for that table (app/api/sections/[id]/route.js:78),
  // and stageBundle writes only tables that differ from live. So the EFFECTIVE draft is draft ?? data.
  const nullDraft = data.draft === null;
  const dOk = J(nullDraft ? data.data : data.draft) === J(after[k]), lOk = J(data.data) === J(before[k]);
  if (!dOk || !lOk) bad++;
  let extra = '';
  if (k === 'quiz') {
    const changed = data.draft.map((q, i) => (J(q) !== J(data.data[i]) ? i : -1)).filter((i) => i >= 0);
    extra = ` · draft vs data item by item: ${data.draft.length} vs ${data.data.length} items, differ at [${changed.join(', ')}]; draft[14].id ${data.draft[14].id}, correctIndex ${data.draft[14].correctIndex} -> "${data.draft[14].options[data.draft[14].correctIndex]}"`;
  }
  console.log(`${t.padEnd(24)} ${nullDraft ? 'draft NULL (serves data)' : 'draft present'}; effective draft ${dOk ? '==' : '!='} new dump · data ${lOk ? '==' : '!='} pre-fix dump${extra}`);
}
console.log(bad ? `${bad} table(s) not as expected` : 'all 8 tables as expected');
process.exit(bad ? 1 : 0);
