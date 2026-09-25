// Packet 2.91 (V056). Read-only census: which diagram each chapter check-in SHOWS, and how it got
// there, on live `data` and on `?draft=1` (draft per table, falling back to data, as the route does).
// Placement comes from lib/checkin-placement.js, the function the client calls.
//
//   node audit/runs/packet-2.91/census.mjs <db-dump.json> [--json out.json]
import { readFileSync, writeFileSync } from 'node:fs';
import { buildSteps } from '../../../lib/learn-steps.js';
import { placeChapterItems } from '../../../lib/checkin-placement.js';
import { resolvePinnedDiagram } from '../../../components/learn-mode/utils.js';

const [dumpPath] = process.argv.slice(2);
const out = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null;
const db = JSON.parse(readFileSync(dumpPath, 'utf8'));
const PIN_KEYS = ['diagramRef', 'quizIndices', 'practiceIndices', 'diagramId', 'quizIds', 'practiceIds'];

function census(tables) {
  const content = tables.content || [];
  const diagrams = tables.diagrams || [];
  const flatSteps = buildSteps(content) || [];
  const { diagramMap } = placeChapterItems({
    flatSteps, contentData: content, diagramsData: diagrams, quizData: tables.quiz || [], practiceData: tables.practice || [],
  });
  const pinned = content.some((b) => PIN_KEYS.some((k) => b[k]));
  // Which slots a PIN filled: the pinned path's first pass, with the same resolver and the same
  // shared used-set. Anything else in diagramMap came from a title match.
  const byPin = new Set();
  if (pinned) {
    const used = new Set();
    flatSteps.forEach((s, i) => {
      if (s.type === 'checkin' && resolvePinnedDiagram(diagrams, { id: s.diagramId, ref: s.diagramRef }, used)) byPin.add(i);
    });
  }
  const rows = [];
  const placed = new Set();
  flatSteps.forEach((s, i) => {
    if (s.type !== 'checkin') return;
    const b = content[s.blockIndex] || {};
    const d = diagramMap[i];
    if (d) placed.add(d.id || d.title);
    const how = !d ? null
      : byPin.has(i) ? (b.diagramId ? 'pin:id' : 'pin:ref')
      : pinned ? 'fallback' : 'unpinned-match';
    rows.push({ block: s.blockIndex, title: b.title, diagram: d ? (d.id || d.title) : null, diagramTitle: d?.title ?? null, how, pinId: b.diagramId ?? null, pinRef: b.diagramRef ?? null });
  });
  const unplaced = diagrams.filter((d) => !placed.has(d.id || d.title)).map((d) => ({ id: d.id, title: d.title }));
  return { pinned, chapters: rows, unplaced, diagrams: diagrams.length };
}

const report = {};
for (const [id, s] of Object.entries(db)) {
  const hasDraft = Object.values(s.draft).some((v) => v != null);
  const live = census(s.live);
  const staged = hasDraft
    ? census(Object.fromEntries(Object.keys(s.live).map((k) => [k, s.draft[k] ?? s.live[k]])))
    : null;
  report[id] = { live, staged, draftTables: Object.keys(s.draft).filter((k) => s.draft[k] != null) };
}

const fmt = (r) => r.chapters.map((c) => `    ${String(c.block + 1).padStart(2)} ${String(c.title).slice(0, 44).padEnd(44)} ${c.how ? `[${c.how}] ${String(c.diagramTitle).slice(0, 60)}` : '—'}`).join('\n')
  + (r.unplaced.length ? `\n    unplaced: ${r.unplaced.map((d) => d.title).join(' | ')}` : '');
for (const [id, r] of Object.entries(report)) {
  console.log(`\n${id}  (${r.live.diagrams} diagrams live${r.staged ? `, draft of [${r.draftTables.join(',')}]` : ''})`);
  console.log(`  LIVE ${r.live.pinned ? 'pinned' : 'UNPINNED'}\n${fmt(r.live)}`);
  if (r.staged) console.log(`  STAGED ${r.staged.pinned ? 'pinned' : 'UNPINNED'}\n${fmt(r.staged)}`);
}
const tally = (side) => {
  const t = {};
  for (const r of Object.values(report)) { const x = r[side]; if (!x) continue; for (const c of x.chapters) t[c.how || 'none'] = (t[c.how || 'none'] || 0) + 1; }
  return t;
};
console.log('\nLIVE how:', tally('live'));
console.log('STAGED how:', tally('staged'));
if (out) writeFileSync(out, JSON.stringify(report, null, 1));
