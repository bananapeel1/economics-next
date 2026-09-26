#!/usr/bin/env node
/**
 * Packet 44 Verify B fix: DOM-side leak check. It shares no code with leak-probe.mjs.
 *
 * Surfaces come from the RENDERED page (verify-b-fix-surfaces.json): every text node above the quiz
 * card on each check-in, unioned across every diagram view. Nothing is read from the diagrams table.
 * Quiz items come from a bundle (all pinned items) or a served payload (the free items signed out).
 *
 * For every option of every pinned item:
 *   FIG     a unit-bearing figure ($750bn, 45 million, 4%) that also appears unit-bearing on a surface
 *   NUM     a numeral >= 13 of the option that stands alone on a surface (an axis tick "800")
 *   PHRASE  a run of >= 3 of the option's words on a surface
 * Figures and numerals the stem gives are exempt. A hit on the KEY is a leak: FIG/verbatim = HARD,
 * NUM/PHRASE = SOFT. A hit on a distractor is reported as NOTE (a lure, not a leak).
 *
 *   node verify-b-fix-dom-leak.mjs <surfaces.json> <bundle-or-served.json>
 * Exit 1 on any HARD.
 */
import { readFileSync } from 'node:fs';

const [surfFile, quizFile] = process.argv.slice(2);
const surf = JSON.parse(readFileSync(surfFile, 'utf8')).checkins;
const src = JSON.parse(readFileSync(quizFile, 'utf8'));
const t = src.tables || src;
const quiz = t.quiz || t.section_quiz;
const content = t.content || t.section_content;
const pins = content.map((b) => b.quizIndices || []);

const clean = (s) => String(s).replace(/[−–—]/g, '-').replace(/ /g, ' ');
const MULT = { bn: 1e9, billion: 1e9, million: 1e6, m: 1e6, k: 1e3, thousand: 1e3 };
function unitFigs(s) {
  const out = [];
  const re = /(\$?)(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)(?:\s?(%|bn|billion|million|thousand)\b|(%))?/gi;
  for (const m of clean(s).matchAll(re)) {
    const unit = (m[3] || m[4] || '').toLowerCase();
    const n = Number(m[2].replace(/,/g, ''));
    if (unit === '%') out.push(`pct:${n}`);
    else if (m[1] === '$') out.push(`usd:${n * (MULT[unit] || 1)}`);
    else if (unit) out.push(`qty:${n * MULT[unit]}`);
  }
  return out;
}
const numerals = (s) => [...clean(s).matchAll(/\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?/g)].map((m) => m[0].replace(/,/g, ''));
const words = (s) => clean(s).toLowerCase().replace(/[^a-z0-9%$. ]/g, ' ').split(/\s+/).filter(Boolean);

let hard = 0, soft = 0, notes = 0, ok = 0;
const lines = [];
pins.forEach((idxs, b) => {
  const ci = surf.find((c) => +c.chapter === b + 1);
  if (!ci) { lines.push(`!! block ${b + 1}: no check-in surfaces captured`); return; }
  const segs = ci.segments;
  const segFigs = new Set(segs.flatMap(unitFigs));
  const segNums = new Set(segs.filter((s) => /^\s*\d[\d,.]*\s*$/.test(s)).map((s) => s.trim().replace(/,/g, '')));
  const joined = ' ' + words(segs.join(' | ')).join(' ') + ' ';
  for (const i of idxs) {
    const q = quiz[i];
    if (!q) { lines.push(`!! quiz[${i}] missing`); continue; }
    const stemFigs = new Set(unitFigs(q.question));
    const stemNums = new Set(numerals(q.question));
    const hits = [];
    q.options.forEach((o, oi) => {
      const isKey = oi === q.correctIndex;
      const tag = isKey ? 'KEY' : 'distractor';
      for (const f of unitFigs(o)) if (!stemFigs.has(f) && segFigs.has(f)) {
        const where = segs.find((s) => unitFigs(s).includes(f));
        hits.push({ tier: isKey ? 'HARD' : 'NOTE', kind: 'FIG', tag, o, f, where });
      }
      for (const n of numerals(o)) if (Number(n) >= 13 && !stemNums.has(n) && segNums.has(n))
        hits.push({ tier: isKey ? 'SOFT' : 'NOTE', kind: 'NUM', tag, o, f: n, where: `axis/label "${n}"` });
      const w = words(o);
      if (w.length >= 3 && joined.includes(' ' + w.join(' ') + ' '))
        hits.push({ tier: isKey ? 'HARD' : 'NOTE', kind: 'VERBATIM', tag, o, where: 'full option text' });
      else for (let k = w.length - 1; k >= 3; k--) {
        const g = [...Array(w.length - k + 1).keys()].map((s) => w.slice(s, s + k).join(' ')).find((g) => joined.includes(' ' + g + ' '));
        if (g) { hits.push({ tier: isKey ? 'SOFT' : 'NOTE', kind: 'PHRASE', tag, o, f: g, where: segs.find((s) => words(s).join(' ').includes(g)) }); break; }
      }
    });
    const worst = hits.some((h) => h.tier === 'HARD') ? 'HARD' : hits.some((h) => h.tier === 'SOFT') ? 'SOFT' : hits.length ? 'NOTE' : 'ok';
    if (worst === 'HARD') hard++; else if (worst === 'SOFT') soft++; else if (worst === 'NOTE') notes++; else ok++;
    lines.push(`${worst.padEnd(4)} step ${ci.step} (block ${b + 1}) quiz[${i}] key "${q.options[q.correctIndex]}" :: ${q.question.slice(0, 90)}`);
    for (const h of hits) lines.push(`       ${h.tier} ${h.kind} ${h.tag} "${h.o}"${h.f ? ` [${h.f}]` : ''} on: ${String(h.where).slice(0, 110)}`);
  }
});
console.log(`=== ${quizFile.split('/').pop()} against DOM surfaces of ${surf.length} check-ins`);
console.log(lines.join('\n'));
console.log(`\n${hard} HARD · ${soft} SOFT · ${notes} NOTE-only · ${ok} ok`);
process.exit(hard ? 1 : 0);
