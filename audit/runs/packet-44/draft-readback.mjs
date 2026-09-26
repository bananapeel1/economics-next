import { readFileSync } from 'node:fs';
import { supabase } from '/Users/arongijsel/Claude APP/economics-next-remediation/scripts/_db.mjs';
const S = '/private/tmp/claude-503/-Users-arongijsel-Claude-APP/2ab1c00b-3f71-4269-8577-3978d18a4b92/scratchpad/';
const W = '/Users/arongijsel/Claude APP/economics-next-remediation/';
const api = JSON.parse(readFileSync(S + 'p44-api.json', 'utf8'));
const dump = JSON.parse(readFileSync(W + 'audit/snapshots/packet-44-bundle__economics__aggregate-supply.json', 'utf8')).tables;
// 1. the free payload's items are the bundle's items, byte for byte, by id
const byId = (arr) => new Map(arr.map((x) => [x.id, JSON.stringify(Object.fromEntries(Object.entries(x).sort()))]));
for (const k of ['quiz', 'flashcards']) {
  const b = byId(dump[k]); let ok = 0, bad = 0;
  for (const x of api[k]) (b.get(x.id) === JSON.stringify(Object.fromEntries(Object.entries(x).sort())) ? ok++ : bad++);
  console.log(`api ${k}: ${ok} served items identical to the bundle, ${bad} differ`);
}
api.content.forEach((blk, i) => console.log(`block ${i + 1} serves quiz ${JSON.stringify(blk.quizIndices)} -> ${api.quiz[blk.quizIndices[0]]?.id === dump.quiz[dump.content[i].quizIndices[0]]?.id ? 'the block\'s own first item' : 'SOMETHING ELSE'}`));
// 2. every table's draft column, read directly, against the dump (premium fields included)
const TABLES = { content: 'section_content', notes: 'section_notes', quiz: 'section_quiz', practice: 'section_practice', flashcards: 'section_flashcards', diagrams: 'section_diagrams', extras: 'section_extras', mistakes: 'section_common_mistakes' };
const canon = (v) => (Array.isArray(v) ? v.map(canon) : v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, canon(v[k])])) : v);
for (const [k, t] of Object.entries(TABLES)) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'aggregate-supply').single();
  if (error) { console.log(t, error.message); continue; }
  const same = JSON.stringify(canon(data.draft)) === JSON.stringify(canon(dump[k]));
  const liveUntouched = JSON.stringify(canon(data.data)) !== JSON.stringify(canon(dump[k]));
  console.log(`${t}: draft ${same ? '==' : '!='} bundle; data (live) ${liveUntouched ? 'still the old content' : 'EQUALS THE BUNDLE'}`);
}
