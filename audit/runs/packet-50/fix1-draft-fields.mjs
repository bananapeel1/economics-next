/* Packet 50 fix round 1 — read the two fixed fields straight out of the draft columns (select only),
   by searching the stored JSON text, not by walking the bundle the runner wrote. */
import { supabase } from '../../../scripts/_db.mjs';
const out = {};
for (const t of ['section_content', 'section_notes']) {
  const { data, error } = await supabase.from(t).select('draft, data').eq('section_id', 'managing-change').maybeSingle();
  if (error) throw error;
  const d = JSON.stringify(data.draft), l = JSON.stringify(data.data);
  out[t] = {
    draftHasNewTitle: d.includes('Triggers, Effects and Speed of Change'),
    draftHasOldTitle: d.includes('Why Change Happens and How Fast'),
    draftHasBolder: /bolder|step change is always better/.test(d),
    draftHasNewMisconception: d.includes('as if slower were always safer'),
    firstTitle: data.draft?.[0]?.title,
    liveHasNewTitle: l.includes('Triggers, Effects and Speed of Change'),
  };
}
console.log(JSON.stringify(out, null, 1));
