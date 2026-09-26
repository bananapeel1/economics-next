#!/usr/bin/env node
/**
 * Packet 54, fix round 3 (topFix-05). Reads a STAGED/SERVED bundle as JSON — never the source modules the
 * runner imports — so it cannot share the runner's view of the content.
 *
 *   node audit/runs/packet-54/fix3-probe.mjs <bundle.json | http://…?draft=1>
 *
 * 1. Reproduces verify-a round 2: grades three orders with the platform grader (lib/recall-widgets.js).
 * 2. The CLASS the rejection is one path of: every place in the bundle that narrates the downturn must
 *    (a) name what it follows (an antecedent anchored to the year-end accounts), and (b) put it AFTER the
 *    year-end gearing. Arrays (correctOrder, why, extras steps) are checked by element index; prose by
 *    character position of the event phrases inside the same string.
 */
import { readFileSync } from 'node:fs';
import { gradeReorder, reorderStartOrder } from '../../../lib/recall-widgets.js';

const src = process.argv[2];
const raw = src.startsWith('http') ? await (await fetch(src)).text() : readFileSync(src, 'utf8');
const root = JSON.parse(raw);

const DOWN = /downturn|sales fell|sales fall|fall in sales/i;
const GEAR = /gearing (ratio|pushed|is read)|higher gearing|reveal a higher gearing|shows higher gearing/i;
const INT = /interest (owed|charge|is owed)|fixed interest|interest must be paid/i;
const ANCHOR = /(after|following) (those|the year-end|these) accounts|after the year[- ]end|the year after\b.*accounts/i;
const BARE = /\b(in the year that follows|in the following year|the following year|the year that follows)\b/i;

/* walk every string and every array of strings */
const strings = []; const arrays = [];
(function walk(v, path) {
  if (typeof v === 'string') { strings.push([path, v]); return; }
  if (Array.isArray(v)) { if (v.length && v.every((x) => typeof x === 'string')) arrays.push([path, v]); v.forEach((x, i) => walk(x, `${path}[${i}]`)); return; }
  if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
})(root, '$');

let fails = 0;
const say = (ok, msg) => { if (!ok) fails += 1; console.log(`${ok ? 'ok  ' : 'FAIL'} ${msg}`); };

/* 1 · reproduce */
const reorders = [];
(function find(v) { if (Array.isArray(v)) v.forEach(find); else if (v && typeof v === 'object') { if (v.type === 'reorder' && Array.isArray(v.correctOrder) && /loan/i.test(v.correctOrder[0])) reorders.push(v); Object.values(v).forEach(find); } })(root);
const r = reorders[0];
if (!r) { console.log('FAIL no loan reorder found'); process.exit(1); }
const [loan, int, gear, down, cover] = r.correctOrder;
console.log('correctOrder:', JSON.stringify(r.correctOrder));
for (const [name, ord] of [['key', [loan, int, gear, down, cover]], ['old-key', [loan, gear, int, down, cover]], ['downturn-in-first-year', [loan, int, down, gear, cover]]]) {
  console.log(`grade ${name.padEnd(24)} ${JSON.stringify(gradeReorder(ord, r.correctOrder))}`);
}
console.log('start first', JSON.stringify(reorderStartOrder(r, 'first')), 'spaced', JSON.stringify(reorderStartOrder(r, 'spaced')));

/* 2a · every string that narrates the downturn names its antecedent, and none uses a bare relative anchor */
for (const [p, s] of strings) {
  if (BARE.test(s)) say(false, `bare relative anchor at ${p}: "${s.slice(0, 110)}"`);
}
/* 2b · arrays narrating the sequence: element index order interest < gearing < downturn, and the downturn element is anchored */
for (const [p, a] of arrays) {
  const at = (re) => a.findIndex((x) => re.test(x));
  const i = at(INT), g = at(GEAR), d = at(DOWN);
  if (d < 0 || g < 0) continue;
  say(g < d && (i < 0 || i < g), `order in ${p}: interest@${i} gearing@${g} downturn@${d}`);
  say(ANCHOR.test(a[d]), `downturn element anchored to the accounts at ${p}[${d}]: "${a[d]}"`);
}
/* 2c · prose that narrates all three: character order interest < gearing < downturn */
for (const [p, s] of strings) {
  if (!(DOWN.test(s) && GEAR.test(s) && INT.test(s))) continue;
  const i = s.search(INT), g = s.search(GEAR), d = s.search(DOWN);
  say(i < g && g < d, `prose order at ${p}: interest@${i} gearing@${g} downturn@${d} — "${s.slice(Math.max(0, i - 40), d + 60)}"`);
}
console.log(fails ? `\n${fails} FAIL` : '\nall ok');
process.exit(fails ? 1 : 0);
