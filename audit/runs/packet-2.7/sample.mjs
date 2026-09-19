/* A deterministic sample of recalls with the sentence the measure matched, for hand adjudication. */
import { supabase } from '../../../scripts/_db.mjs';
import { validateSection, RECOVERABLE_AT } from '../../../lib/content-validator.mjs';
import { contextFor } from '../../../scripts/_content-write.mjs';
import { CONTENT_TABLES, TABLE_TO_KEY } from '../../../lib/content-gate.mjs';

const WANT = process.argv.includes('--miss') ? 'miss' : 'hit';
const N = Number(process.argv[process.argv.indexOf('--n') + 1]) || 20;
const CORPUS = process.argv.includes('--draft') ? 'draft' : 'data';

const h = (s) => { let x = 0; for (const c of String(s)) x = (x * 31 + c.charCodeAt(0)) >>> 0; return x; };
const { data: sections } = await supabase.from('sections').select('id').order('sort_order');
const rows = [];
for (const { id } of sections) {
  const b = {};
  for (const t of CONTENT_TABLES) {
    const { data } = await supabase.from(t).select('data, draft').eq('section_id', id).maybeSingle();
    b[TABLE_TO_KEY[t]] = (CORPUS === 'draft' ? (data?.draft ?? data?.data) : data?.data) ?? null;
  }
  if (!Array.isArray(b.content) || !b.content.length) continue;
  const hitKeys = new Set(validateSection(b, await contextFor(id)).findings
    .filter((f) => f.rule === 'recall.recoverable').map((f) => `${f.where}|${f.detail}`));
  const byWhere = new Map();
  for (const k of hitKeys) { const [w, d] = k.split('|'); byWhere.set(w, d); }
  for (const blk of b.content) for (const sec of (blk.sections || [])) {
    if (!sec?.recall) continue;
    const where = `sub:${sec.id}:recall`;
    const detail = byWhere.get(where);
    if ((WANT === 'hit') !== Boolean(detail)) continue;
    rows.push({ id, sec, detail });
  }
}
rows.sort((a, b2) => h(a.sec.id) - h(b2.sec.id));
const pick = rows.slice(0, N);
console.log(`${WANT.toUpperCase()}S in ${CORPUS}: ${rows.length} total, showing ${pick.length}\n`);
const visible = (sec) => [sec.title, sec.keyIdea,
  ...(sec.body || []).flatMap((b) => [b?.text, ...(b?.items || []),
    ...((b?.steps || []).map((x) => (x && typeof x === 'object' ? `${x.title || ''} ${x.subtitle || ''}` : x))), b?.result]),
  sec.realExample?.text, sec.misconception, sec.examMatters].filter(Boolean).map(String);
for (const [i, r] of pick.entries()) {
  const rc = r.sec.recall;
  console.log(`── ${i + 1}. ${r.id} · "${r.sec.title}" · ${rc.type}`);
  if (rc.type === 'fillin') console.log(`   ASK: ${(rc.template || []).join(' / ')}\n   ANS: ${JSON.stringify(rc.answers)}`);
  if (rc.type === 'classify') console.log(`   ASK: ${rc.prompt}\n   ITEMS: ${(rc.groups || []).flatMap((g) => g.items || []).join(' | ')}`);
  if (rc.type === 'match') console.log(`   ASK: ${rc.prompt}\n   PAIRS: ${(rc.pairs || []).map((p) => `${p.left} → ${p.right}`).join(' | ')}`);
  if (rc.type === 'reorder') console.log(`   ASK: ${rc.prompt}\n   ORDER: ${(rc.correctOrder || []).join(' → ')}`);
  console.log(`   SCREEN: ${visible(r.sec).join('  ¶  ').replace(/\s+/g, ' ').slice(0, 900)}`);
  if (r.detail) console.log(`   MEASURE: ${r.detail}`);
  console.log();
}
