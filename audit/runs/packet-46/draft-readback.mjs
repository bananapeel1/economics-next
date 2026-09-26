/* Packet 46: verify the staged draft by two methods other than stageBundle's own read-back —
   (1) the dev server's served ?draft=1 payload, compared by item id; (2) each table's draft and data
   columns read directly, compared to the dumped bundle and to the t=0 snapshot. */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';
const W = decodeURIComponent(new URL('../../../', import.meta.url).pathname);
const dump = JSON.parse(readFileSync(W + 'audit/snapshots/packet-46-bundle__economics__growth-development.json', 'utf8')).tables;
const t0 = JSON.parse(readFileSync(W + 'audit/snapshots/2026-09-26-pre-packet-46__economics__growth-development.json', 'utf8'));
const api = JSON.parse(readFileSync(W + 'audit/runs/packet-46/api-draft.json', 'utf8'));
const apiLive = JSON.parse(readFileSync(W + 'audit/runs/packet-46/api-live.json', 'utf8'));
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
const J = (v) => JSON.stringify(canon(v));
const byId = (arr) => new Map((arr || []).map((x) => [x.id, J(x)]));
for (const k of ['quiz', 'practice', 'flashcards', 'diagrams', 'mistakes']) {
  if (!Array.isArray(api[k])) { console.log(`api ${k}: not served (${typeof api[k]})`); continue; }
  const b = byId(dump[k]); let ok = 0, bad = 0;
  for (const x of api[k]) (b.get(x.id) === J(x) ? ok++ : bad++);
  console.log(`api ?draft=1 ${k}: ${api[k].length} served, ${ok} identical to the bundle by id, ${bad} differ (bundle has ${dump[k].length})`);
}
if (Array.isArray(api.content)) {
  console.log(`api ?draft=1 content: ${api.content.length} blocks, ${api.content.reduce((n, b) => n + b.sections.length, 0)} subsections, ${api.content.reduce((n, b) => n + b.sections.filter((s) => s.recall).length, 0)} recalls; titles ${api.content.map((b) => b.title).join(' | ')}`);
  api.content.forEach((blk, i) => console.log(`  block ${i + 1}: diagramId ${blk.diagramId === dump.content[i].diagramId ? 'matches' : 'DIFFERS'}; first pinned quiz served -> ${api.quiz[blk.quizIndices?.[0]]?.id === dump.quiz[dump.content[i].quizIndices[0]]?.id ? "the block's own item" : 'SOMETHING ELSE'}`));
}
console.log(`api live content: ${apiLive.content?.length} blocks, first title "${apiLive.content?.[0]?.title}" (t=0: "${t0.content[0].title}")`);
const TABLES = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
for (const [k, t] of Object.entries(TABLES)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'growth-development').single();
  if (error) { console.log(t, error.message); continue; }
  console.log(`${t}: draft ${J(data.draft) === J(dump[k]) ? '==' : '!='} bundle; data (live) ${J(data.data) === J(t0[k]) ? '== t=0 snapshot (untouched)' : '!= t=0 snapshot'}`);
}
