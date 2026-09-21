import { supabase } from '../../../scripts/_db.mjs';
import { buildSteps, pickSpacedRecall } from '../../../lib/learn-steps.js';

const rows = (await supabase.from('sections').select('id,title')).data;
for (const corpus of ['data', 'draft']) {
  let secWith = 0, slots = 0, fromCh1 = 0, distinctSrc = 0, sectionsAllCh1 = 0, chaptersNeverSpaced = 0, chaptersEligible = 0;
  for (const { id } of rows) {
    const { data } = await supabase.from('section_content').select(corpus).eq('section_id', id).maybeSingle();
    let content = data?.[corpus];
    if (!content) continue;
    if (typeof content === 'string') { try { content = JSON.parse(content); } catch { continue; } }
    if (!Array.isArray(content)) continue;
    const steps = buildSteps(content);
    const used = new Set();
    const picks = [];
    steps.forEach((s, i) => { if (s.type !== 'checkin') return; const p = pickSpacedRecall(steps, i, used); if (p) { used.add(p.id); picks.push(p); } });
    if (!picks.length) continue;
    secWith += 1; slots += picks.length;
    const srcBlocks = new Set(picks.map((p) => p.fromBlockIndex));
    fromCh1 += picks.filter((p) => p.fromBlockIndex === 0).length;
    distinctSrc += srcBlocks.size;
    if (srcBlocks.size === 1 && srcBlocks.has(0)) sectionsAllCh1 += 1;
    // chapters that HAVE a recall and are never the source of any spaced showing
    const blocksWithRecall = new Set(steps.filter((s) => s.type === 'teach' && s.section?.recall).map((s) => s.blockIndex));
    const lastBlock = Math.max(...steps.map((s) => s.blockIndex));
    for (const b of blocksWithRecall) { if (b === lastBlock) continue; chaptersEligible += 1; if (!srcBlocks.has(b)) chaptersNeverSpaced += 1; }
  }
  console.log(`${corpus}: ${secWith} sections with spaced recalls · ${slots} slots · ${fromCh1} from chapter 1 (${(100*fromCh1/slots).toFixed(0)}%) · ${sectionsAllCh1} sections draw ALL slots from chapter 1 · source chapters ${distinctSrc}/${slots} · chapters with a recall never spaced: ${chaptersNeverSpaced}/${chaptersEligible}`);
}
