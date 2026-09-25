/* Verify A round 3 — where every drill lands, read off the LIVE content on :3001.
 *
 * Judges D029 (chapter match) and D030 (the reservation on the first check-in and the one
 * condition under which it yields). The control for D030 is the same placement run with the
 * yield disabled, so "would this drill have been unplaced?" is measured, not assumed.
 */
import { readFileSync } from 'node:fs';
const ROOT = '/Users/arongijsel/Claude APP/economics-next-remediation';
const { buildSteps } = await import(`${ROOT}/lib/learn-steps.js`);
const { templatesForSection, placeQuantItems, quantItem } = await import(`${ROOT}/lib/quant-pool.js`);
const { subjectFrom } = await import(`${ROOT}/lib/ial-commands.js`);
const { markItem, correctResponses } = await import(`${ROOT}/lib/quant/index.mjs`);

const TITLE_STOP = new Set(['even', 'this', 'that', 'from', 'into', 'with', 'what', 'when', 'their', 'them',
  'your', 'more', 'than', 'they', 'have', 'been', 'does', 'using', 'used', 'other', 'over', 'some', 'only',
  'also', 'both', 'each', 'about']);
const words = (t) => new Set(String(t || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
  .filter((w) => w.length >= 4 && !TITLE_STOP.has(w)));

/** The shipping placement with rule 3 (the yield) removed — the "reserve slot 0 always" control. */
function placeReserved(list, titles) {
  const map = {}; const taken = new Set(); const unmatched = [];
  for (const t of list) {
    const w = words(t.title); let best = -1, bestScore = 0;
    titles.forEach((title, ord) => {
      if (taken.has(ord)) return;
      const score = [...words(title)].filter((x) => w.has(x)).length;
      if (score > 0 && score >= bestScore) { bestScore = score; best = ord; }
    });
    if (best >= 0) { map[best] = t.id; taken.add(best); } else unmatched.push(t);
  }
  const free = [];
  for (let i = 1; i < titles.length; i++) if (!taken.has(i)) free.push(i);
  const n = Math.min(unmatched.length, free.length);
  for (let i = 0; i < n; i++) {
    const pos = Math.max(0, Math.min(Math.round(((i + 0.5) * free.length) / n) - 1, free.length - 1));
    map[free[pos] ?? free[i]] = unmatched[i].id;
  }
  return map;
}

const index = JSON.parse(readFileSync(`${ROOT}/audit/raw/section-index.json`, 'utf8'));
const rows = Array.isArray(index) ? index : index.sections;

let drilled = 0, placements = 0, matched = 0, slotZeroUnmatched = 0, unplaced = 0, onLegacy = 0;
const lines = [];
for (const row of rows) {
  const unitCode = row.unitCode || '';
  const forSection = templatesForSection({ subject: subjectFrom(unitCode), unitCode, number: row.number });
  if (!forSection.length) continue;
  drilled++;
  const res = await fetch(`http://localhost:3001/api/sections/${row.id}`);
  const json = await res.json();
  const flat = buildSteps(json.content);
  const slots = flat.map((s, i) => ({ s, i })).filter(({ s }) => s.type === 'checkin' || s.type === 'legacy');
  const titles = slots.map(({ s }) => s.blockTitle || s.block?.title || '');
  const now = placeQuantItems(forSection, titles);
  const control = placeReserved(forSection, titles);

  lines.push(`\n${row.id} (${unitCode} ${row.number}) — ${slots.length} check-in slot(s), ${flat.length} flat steps`);
  const placedIds = new Set(Object.values(now));
  for (const t of forSection) if (!placedIds.has(t.id)) { unplaced++; lines.push(`   UNPLACED: ${t.id}`); }

  for (const [ord, id] of Object.entries(now).sort((a, b) => a[0] - b[0])) {
    placements++;
    const slot = slots[Number(ord)];
    const title = titles[Number(ord)];
    const tpl = forSection.find((t) => t.id === id);
    const shared = [...words(tpl.title)].filter((w) => words(title).has(w));
    const isMatched = shared.length > 0;
    if (isMatched) matched++;
    if (!isMatched && Number(ord) === 0) {
      slotZeroUnmatched++;
      const controlPlaced = new Set(Object.values(control));
      const wouldBeUnplaced = forSection.filter((t) => !controlPlaced.has(t.id)).map((t) => t.id);
      lines.push(`   ord ${ord} (flat ${slot.i + 1} of ${flat.length}, type ${slot.s.type}) = ${id} — UNMATCHED ON THE FIRST CHECK-IN`);
      lines.push(`      control (reserve slot 0 always) would leave unplaced: ${wouldBeUnplaced.join(', ') || 'nothing'}`);
    } else {
      lines.push(`   ord ${ord} (flat ${slot.i + 1} of ${flat.length}, type ${slot.s.type}) = ${id} — ${isMatched ? `matched on "${title}" via [${shared.join(', ')}]` : `unmatched, chapter "${title}"`}`);
    }
    if (slot.s.type === 'legacy') onLegacy++;
    const item = quantItem({ sectionId: row.id }, id, 0);
    const clean = markItem(item, correctResponses(item));
    if (clean.awarded !== clean.total) lines.push(`      MARKING FAIL ${clean.awarded}/${clean.total}`);
  }
}
console.log(lines.join('\n'));
console.log(`\nsections with drills: ${drilled} · placements: ${placements} · matched to their chapter: ${matched} · unmatched on slot 0: ${slotZeroUnmatched} · drills reaching no check-in: ${unplaced} · placements on a legacy block: ${onLegacy}`);
