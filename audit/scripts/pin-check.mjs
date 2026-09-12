#!/usr/bin/env node
// Pin guard. Every quizIndices / practiceIndices / diagramRef pin in every section is
// resolved the way LearnModeTab resolves it, and reported.
//
//   node audit/scripts/pin-check.mjs              exit 1 if any pin resolves to nothing
//   node audit/scripts/pin-check.mjs --verbose     list every weak pin too
//   node audit/scripts/pin-check.mjs --section supply
//   node audit/scripts/pin-check.mjs --max-broken 15   tolerate a known baseline, fail on a regression
//
// 15 blocks currently render no diagram at all and cannot be rescued by the fallback —
// 3 of them in the-market, which has no diagrams in the database. That is content debt
// owned by the section packets, so CI should run this with --max-broken 15 until they
// land, and packet 3's validator should adopt it with a proper baseline file.
//
// Two tiers, deliberately:
//
//   BLOCK  the student sees an empty slot where a question or diagram should be. Diagram
//          pins are judged AFTER the per-block title fallback, because that is what the
//          student actually gets: a ref that matches no title but whose block is rescued by
//          the fallback is debt, not breakage.
//   DEBT   a pin that resolves, but to an item sharing no vocabulary with the block it is
//          pinned to. This is the lint F013 asks for. It is content debt, not a code bug:
//          fixing it means re-pinning in that section's own packet, so it never exits 1.
//
// Reads the live database. No writes.
import { supabase } from '../../scripts/_db.mjs';
import { matchDiagramsToBlocks, resolvePinnedDiagram } from '../../components/learn-mode/utils.js';

const args = process.argv.slice(2);
const VERBOSE = args.includes('--verbose');
const ONLY = (() => { const i = args.indexOf('--section'); return i >= 0 ? args[i + 1] : null; })();
const MAX_BROKEN = (() => { const i = args.indexOf('--max-broken'); return i >= 0 ? Number(args[i + 1]) : 0; })();

const STOP = new Set(
  ('the a an of and or to in on for with is are be by as at from that this what two one three explain outline ' +
   'assess evaluate discuss define calculate marks mark using their its it more than how why which state give ' +
   'business firm firms market markets').split(' '),
);
const words = (s) =>
  new Set(String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 3 && !STOP.has(w)));
const overlap = (a, b) => { const A = words(a), B = words(b); let n = 0; for (const w of A) if (B.has(w)) n++; return n; };

const blockContext = (block) =>
  [block.title, ...(Array.isArray(block.sections) ? block.sections.map((s) => s.title) : [])].filter(Boolean).join(' ');

const { data: sections, error } = await supabase.from('sections').select('id').order('id');
if (error) { console.error(`sections: ${error.message}`); process.exit(1); }

const broken = [];
const weak = [];
const rescued = [];
const missedRefs = [];
let pins = 0;

for (const { id } of sections) {
  if (ONLY && id !== ONLY) continue;

  const [content, practice, quiz, diagrams] = await Promise.all([
    supabase.from('section_content').select('data').eq('section_id', id).maybeSingle(),
    supabase.from('section_practice').select('data').eq('section_id', id).maybeSingle(),
    supabase.from('section_quiz').select('data').eq('section_id', id).maybeSingle(),
    supabase.from('section_diagrams').select('data').eq('section_id', id).maybeSingle(),
  ]);

  const blocks = content.data?.data || [];
  const practiceData = practice.data?.data || [];
  const quizData = quiz.data?.data || [];
  const diagramsData = diagrams.data?.data || [];

  for (const block of blocks) {
    const ctx = blockContext(block);

    for (const i of block.quizIndices || []) {
      pins++;
      const item = quizData[i];
      if (!item) { broken.push({ id, block: block.title, kind: 'quizIndices', detail: `index ${i} of ${quizData.length}` }); continue; }
      const score = overlap(ctx, item.question);
      if (score === 0) weak.push({ id, block: block.title, kind: 'quiz', detail: (item.question || '').slice(0, 80) });
    }

    // Resolved against the RAW array, matching LearnModeTab after the F013 fix.
    for (const i of block.practiceIndices || []) {
      pins++;
      const item = practiceData[i];
      if (!item) { broken.push({ id, block: block.title, kind: 'practiceIndices', detail: `index ${i} of ${practiceData.length}` }); continue; }
      const score = overlap(ctx, item.question);
      if (score === 0) weak.push({ id, block: block.title, kind: 'practice', detail: (item.question || '').slice(0, 80) });
    }

  }

  // Diagrams resolve across the whole section: pinned first, then the title fallback fills
  // whatever is left, exactly as LearnModeTab does it.
  const usedDiagrams = new Set();
  const resolved = {};
  blocks.forEach((block, i) => {
    if (!block.diagramRef && !block.diagramId) return;
    pins++;
    const hit = resolvePinnedDiagram(diagramsData, { id: block.diagramId, ref: block.diagramRef }, usedDiagrams);
    if (hit) resolved[i] = { via: 'pin' };
    else missedRefs.push({ id, block: block.title, i, ref: block.diagramRef || block.diagramId });
  });

  const unclaimed = diagramsData.map((d, di) => ({ d, di })).filter(({ di }) => !usedDiagrams.has(di));
  if (unclaimed.length) {
    const empty = blocks.map((b, i) => ({ b, i })).filter(({ i }) => !resolved[i]);
    const byTitle = matchDiagramsToBlocks(unclaimed.map(({ d }) => d), empty.map(({ b }) => ({ title: b.title })));
    for (const localIdx of Object.keys(byTitle)) {
      const slot = empty[Number(localIdx)];
      if (slot) resolved[slot.i] = { via: 'fallback' };
    }
  }

  for (const miss of missedRefs.filter((m) => m.id === id)) {
    const entry = { id, block: miss.block, kind: 'diagramRef', detail: `"${miss.ref}" matches no diagram title` };
    if (resolved[miss.i]?.via === 'fallback') rescued.push(entry);
    else broken.push({ ...entry, detail: entry.detail + ' — and the title fallback found nothing either' });
  }
}

const line = (r) => `  ${r.id.padEnd(34)} ${r.kind.padEnd(15)} ${String(r.block || '').slice(0, 28).padEnd(30)} ${r.detail}`;

console.log(`pin-check: ${pins} pins across ${ONLY ? 1 : sections.length} section(s)\n`);

if (broken.length) {
  console.log(`BLOCK — ${broken.length} pin(s) resolve to nothing:`);
  broken.forEach((r) => console.log(line(r)));
  console.log('');
}

if (rescued.length) {
  console.log(`DEBT — ${rescued.length} diagramRef(s) match no title; the per-block fallback covers them, so a student still sees a diagram:`);
  if (VERBOSE) rescued.forEach((r) => console.log(line(r)));
  else console.log('       (--verbose to list them; re-pin by id in that section\'s packet)');
  console.log('');
}

console.log(`DEBT — ${weak.length} pin(s) resolve, but share no vocabulary with their block`);
if (weak.length && VERBOSE) { weak.forEach((r) => console.log(line(r))); console.log(''); }
else if (weak.length) console.log('       (--verbose to list them; re-pinning is that section\'s own packet)\n');

if (broken.length > MAX_BROKEN) {
  console.error(`\npin-check FAILED: ${broken.length} broken pin(s), tolerating ${MAX_BROKEN}`);
  process.exit(1);
}
console.log(broken.length
  ? `\npin-check passed: ${broken.length} broken pin(s), within the agreed baseline of ${MAX_BROKEN}`
  : '\npin-check passed: every pin resolves to something the student can see');
