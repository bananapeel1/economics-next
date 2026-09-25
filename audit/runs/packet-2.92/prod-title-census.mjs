// Production (origin/main) diagram placement over EVERY live section: which check-ins get a diagram by
// something other than a diagramId pin (a legacy diagramRef, or the title fallback). Read-only.
//
//   node audit/runs/packet-2.92/prod-title-census.mjs <dir>
//
// <dir> holds origin/main's lib/ and components/learn-mode/ (see live-pins.mjs for the two commands).
// 25 Sep 2026, after every draft was published: 185 check-in diagrams, 10 not by diagramId. labour-markets
// ch1 and role-state-macroeconomy ch1 are pinned `diagramId: null` and still get a title match, because
// main does not have 831ca27's decidedNoDiagram. The next merge into main clears those two.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const PROD = process.argv[2];
const { placeChapterItems } = await import(pathToFileURL(`${PROD}/lib/checkin-placement.js`).href);
const { buildSteps } = await import(pathToFileURL(`${PROD}/lib/learn-steps.js`).href);
const env = {}; for (const l of readFileSync('.env.local', 'utf8').split('\n')) { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = m[2].trim(); }
const H = { apikey: env.SUPABASE_SERVICE_ROLE_KEY, Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}` };
const all = async (t) => { const r = await fetch(`${env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${t}?select=section_id,data`, { headers: H }); return Object.fromEntries((await r.json()).map((x) => [x.section_id, x.data])); };
const [C, D, Q, P] = await Promise.all(['section_content', 'section_diagrams', 'section_quiz', 'section_practice'].map(all));
let total = 0; const hits = [];
for (const id of Object.keys(C).sort()) {
  const content = C[id] || [], diagrams = D[id] || [];
  const steps = buildSteps(content);
  const { diagramMap } = placeChapterItems({ flatSteps: steps, contentData: content, diagramsData: diagrams, quizData: Q[id] || [], practiceData: P[id] || [] });
  steps.forEach((s, i) => {
    if (s.type !== 'checkin' || !diagramMap[i]) return;
    const d = diagramMap[i];
    const byPin = (typeof s.diagramId === 'string' && d.id === s.diagramId);
    total += 1;
    if (!byPin) hits.push(`${id} ch${s.blockIndex + 1} "${s.blockTitle}" <- "${d.title}"${s.diagramId === null ? '  [block says diagramId: null]' : s.diagramRef ? `  [legacy ref "${s.diagramRef}"]` : ''}`);
  });
}
console.log(`production placement over ${Object.keys(C).length} live sections: ${total} check-in diagrams, ${hits.length} NOT by diagramId pin`);
for (const h of hits) console.log('  ' + h);
