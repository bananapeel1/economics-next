/**
 * Packet 43 — what each check-in actually shows, computed by the APP'S OWN placement code
 * (lib/learn-steps.js buildSteps + lib/checkin-placement.js placeChapterItems) over the draft read
 * straight from the database. `npm run diagrams` reads the t=0 corpus in audit/content-sections and
 * cannot see a staged draft, so this is the post-authoring check diagram-01/02/03 ask for.
 */
import { supabase } from '../../../scripts/_db.mjs';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
const get = async (t) => (await supabase.from(t).select('draft').eq('section_id', 'economic-growth').single()).data.draft;
const [contentData, diagramsData, quizData, practiceData] = await Promise.all(['section_content', 'section_diagrams', 'section_quiz', 'section_practice'].map(get));
const flatSteps = buildSteps(contentData);
const { diagramMap, quizMap, practiceMap, diagramHow } = placeChapterItems({ flatSteps, contentData, diagramsData, quizData, practiceData });
let n = 0;
flatSteps.forEach((s, i) => {
  if (s.type !== 'checkin') return;
  n += 1;
  const blk = contentData[n - 1];
  console.log(`check-in ${n} (step ${i + 1}/${flatSteps.length}) "${blk.title}": diagram=${diagramMap[i]?.title ?? 'none'} [${diagramHow[i] ?? '-'}] · quiz="${(quizMap[i]?.question || 'none').slice(0, 50)}" · practice="${(practiceMap[i]?.question || 'none').slice(0, 45)}"`);
});
