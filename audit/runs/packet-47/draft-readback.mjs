/**
 * Packet 47 — read every table's `draft` and `data` columns DIRECTLY (not through the API that
 * check-staged-drafts.mjs uses), canonicalise, and compare with the dumped bundle. Premium-only
 * fields (mistakes, the full quiz, extras) are included, which the signed-out API slice is not.
 * Read-only: select only.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const SECTION = 'global-markets-expansion';
const dump = JSON.parse(readFileSync(`audit/snapshots/packet-47-bundle__business__${SECTION}.json`, 'utf8')).tables;
const pre = JSON.parse(readFileSync(`audit/snapshots/2026-09-26-pre-packet-47__business__${SECTION}.json`, 'utf8'));
const TABLES = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const eq = (a, b) => JSON.stringify(canon(a)) === JSON.stringify(canon(b));
let bad = 0;
for (const [k, t] of Object.entries(TABLES)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', SECTION).maybeSingle();
  if (error || !data) { console.log(`${t}: ${error?.message || 'no row'}`); bad += 1; continue; }
  const draftOk = eq(data.draft, dump[k]);
  /* no row at t=0 reads as null through loadBundle; staging creates the row with `data` = [] — both serve an empty list */
  const liveIsPre = eq(data.data, pre[k]) || (pre[k] == null && Array.isArray(data.data) && data.data.length === 0);
  if (!draftOk || !liveIsPre) bad += 1;
  console.log(`${t.padEnd(24)} draft ${draftOk ? '== bundle' : '!= BUNDLE'} · data ${liveIsPre ? '== the t=0 snapshot (live untouched)' : '!= t=0 snapshot'}`);
}
process.exit(bad ? 1 : 0);
