// Fix round 2: placeKeys deals every key by the stem-hash RANK over the whole bank, so a reworded
// stem can re-deal the keys of unchanged (published) items. For each rewritten item, list which of
// its candidate wordings hash into the old item's rank, so 0 other keys move (packet 44's method).
import { hash8 } from '../../../scripts/_packet45-util.mjs';
import { QUIZ } from '../../../scripts/_packet45-assessment.mjs';
const stems = QUIZ.map((q) => q.question);
const rankOf = (arr) => { const s = arr.map((q, i) => [i, hash8(q)]).sort((a, b) => (a[1] < b[1] ? -1 : 1)); const r = new Map(); s.forEach(([i], k) => r.set(i, k)); return r; };
const base = rankOf(stems);
const cands = JSON.parse(process.argv[2]);
for (const [idx, list] of Object.entries(cands)) {
  for (const c of list) {
    const arr = [...stems]; arr[idx] = c; const r = rankOf(arr);
    const moved = [...base.keys()].filter((i) => base.get(i) !== r.get(i));
    console.log(`${idx} ${moved.length ? 'MOVES ' + moved.length : 'OK     '} ${hash8(c)} ${c}`);
  }
}
