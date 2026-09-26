// packet-verifier round 3: grade candidate orders with the platform grader against the SERVED draft
import fs from 'node:fs';
import { gradeReorder, reorderStartOrder } from '../../../../lib/recall-widgets.js';
const j = JSON.parse(fs.readFileSync(new URL('./served-draft.json', import.meta.url)));
const recalls = [];
(function walk(o) { if (o && typeof o === 'object') { if (o.type === 'reorder' && Array.isArray(o.correctOrder)) recalls.push(o); for (const k in o) walk(o[k]); } })(j.content);
const r = recalls.find((x) => /loan/i.test(x.correctOrder[0]));
console.log('reorders served:', recalls.length);
console.log('correctOrder:', JSON.stringify(r.correctOrder));
const [loan, interest, gearing, downturn, cover] = r.correctOrder;
const cand = {
  key: [loan, interest, gearing, downturn, cover],
  'r2-alt downturn-in-first-year': [loan, interest, downturn, gearing, cover],
  'old key gearing-before-interest': [loan, gearing, interest, downturn, cover],
  'cover-before-downturn': [loan, interest, gearing, cover, downturn],
};
for (const [k, v] of Object.entries(cand)) console.log(k, JSON.stringify(gradeReorder(v, r.correctOrder)));
for (const s of ['first', 'spaced']) { const p = reorderStartOrder(r, s); console.log('start', s, JSON.stringify(p), '->', p.map((i) => r.correctOrder[i].slice(0, 40)).join(' | ')); }
