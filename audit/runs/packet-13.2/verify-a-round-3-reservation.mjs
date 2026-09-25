/* Verify A round 3 — D030 as a property, not an anecdote.
 *
 * The live sweep shows one unmatched drill on the first check-in, on one section. That is one
 * data point for a rule stated in general terms, so the rule itself is tested here over every
 * shape a section can have: 1-6 check-ins, every subset of them already claimed by a matched
 * drill, 0-4 unmatched drills. The control is the same placement with the yield removed —
 * "reserve slot 0 always" — so "would a drill have been unplaced?" is measured.
 *
 * Titles are synthetic (`topic0`, `topic1`, … and `zzzzz` for a template that matches nothing),
 * which is the only way to drive the matcher into every configuration; the function under test
 * is the shipping lib/quant-pool.js.
 */
import { placeQuantItems } from '../../../lib/quant-pool.js';

function placeReserved(list, titles) {
  const map = {}; const taken = new Set(); const unmatched = [];
  const w = (t) => new Set(String(t || '').toLowerCase().split(/\s+/).filter((x) => x.length >= 4));
  for (const t of list) {
    const tw = w(t.title); let best = -1, bestScore = 0;
    titles.forEach((title, ord) => {
      if (taken.has(ord)) return;
      const score = [...w(title)].filter((x) => tw.has(x)).length;
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

const subsets = (n) => { const out = []; for (let m = 0; m < (1 << n); m++) out.push([...Array(n).keys()].filter((i) => m & (1 << i))); return out; };

let cases = 0, slotZero = 0, violationsA = 0, violationsB = 0, fewerPlaced = 0;
const bad = [];
for (let count = 1; count <= 6; count++) {
  const titles = [...Array(count).keys()].map((i) => `topic${i}`);
  for (const matchedOrdinals of subsets(count)) {
    for (let u = 0; u <= 4; u++) {
      cases++;
      const list = [
        ...matchedOrdinals.map((o) => ({ id: `m${o}`, title: `topic${o}` })),
        ...[...Array(u).keys()].map((i) => ({ id: `u${i}`, title: 'zzzzz' })),
      ];
      if (!list.length) continue;
      const now = placeQuantItems(list, titles);
      const control = placeReserved(list, titles);
      const unmatchedIds = new Set(list.filter((t) => t.title === 'zzzzz').map((t) => t.id));
      const nowPlaced = new Set(Object.values(now));
      const controlPlaced = new Set(Object.values(control));
      const controlUnplaced = list.filter((t) => !controlPlaced.has(t.id)).length;

      if (nowPlaced.size < controlPlaced.size) { fewerPlaced++; bad.push(`count=${count} matched=[${matchedOrdinals}] u=${u}: shipping placed ${nowPlaced.size}, control ${controlPlaced.size}`); }

      const zeroIsUnmatched = now[0] !== undefined && unmatchedIds.has(now[0]);
      if (zeroIsUnmatched) {
        slotZero++;
        // A: it took the first check-in only because a drill would otherwise reach no student
        if (controlUnplaced === 0) { violationsA++; bad.push(`A count=${count} matched=[${matchedOrdinals}] u=${u}: slot 0 taken by ${now[0]} yet the control placed everything`); }
      } else {
        // B: with room later, the first check-in is clear of unmatched drills
        const laterFree = [...Array(count).keys()].slice(1).filter((i) => !matchedOrdinals.includes(i)).length;
        if (laterFree < u && controlUnplaced > 0 && now[0] === undefined && !matchedOrdinals.includes(0)) {
          violationsB++; bad.push(`B count=${count} matched=[${matchedOrdinals}] u=${u}: slot 0 left empty while ${controlUnplaced} drill(s) reach nobody`);
        }
      }
    }
  }
}
console.log(`configurations tested: ${cases}`);
console.log(`configurations where an unmatched drill takes the first check-in: ${slotZero}`);
console.log(`violations of "only when a drill would otherwise reach no student": ${violationsA}`);
console.log(`violations of "takes it whenever that is the alternative": ${violationsB}`);
console.log(`configurations where the shipping placement places fewer drills than the control: ${fewerPlaced}`);
for (const b of bad.slice(0, 10)) console.log(`   ${b}`);
