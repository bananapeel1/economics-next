import { supabase } from '../../../scripts/_db.mjs';
import { buildSteps, pickSpacedRecall } from '../../../lib/learn-steps.js';
for (const corpus of ['data', 'draft']) {
  const { data } = await supabase.from('section_content').select(corpus).eq('section_id', 'financial-planning').maybeSingle();
  let c = data?.[corpus]; if (typeof c === 'string') c = JSON.parse(c);
  if (!Array.isArray(c)) { console.log(`${corpus}: none`); continue; }
  const steps = buildSteps(c);
  const used = new Set();
  console.log(`\n${corpus}: ${c.length} chapters, ${steps.length} steps`);
  c.forEach((b, i) => console.log(`  ch${i + 1} "${b.title}" — ${(b.sections || []).filter((s) => s?.recall).length} recalls`));
  steps.forEach((s, i) => {
    if (s.type !== 'checkin') return;
    const p = pickSpacedRecall(steps, i, used);
    if (p) used.add(p.id);
    console.log(`  check-in after ch${s.blockIndex + 1} → ${p ? `RECALL FROM CHAPTER ${p.fromBlockIndex + 1} ("${p.fromTitle}")` : 'no spaced recall'}`);
  });
}
