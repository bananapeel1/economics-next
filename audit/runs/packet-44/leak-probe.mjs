#!/usr/bin/env node
/**
 * Packet 44 fix round — does any check-in quiz key show on the surfaces rendered ABOVE it?
 *
 * Independent of the runner: it imports nothing from scripts/_packet44-*.mjs. It reads a bundle
 * JSON (the --dump snapshot, a prepublish backup, or a draft read back from the database) and,
 * for every block, the fields `components/learn-mode/InlineDiagram.jsx:66-100` renders for the
 * block's diagram: title, description, every scenario label, every <text>/<title> in every
 * scenario's SVG (all views are one tap away), and the checklist.
 *
 * For each quiz item pinned to the block (block.quizIndices), the key is options[correctIndex].
 *   HARD  the key's text verbatim, or a unit-bearing figure of the key ($800bn, 40 million, 2%)
 *         whose value appears unit-bearing on a surface. Figures the stem already gives are exempt.
 *   SOFT  a bare number on a surface (an axis tick "800") equal to the key figure's numeral.
 *         Reported, never exempted for a choice figure >= 13 (a number in a choice is never a
 *         coincidence), ignored below 13.
 *
 *   node audit/runs/packet-44/leak-probe.mjs <bundle.json> [...]
 * Exit 1 when any HARD match is found.
 */
import { readFileSync } from 'node:fs';

const norm = (s) => String(s).toLowerCase().replace(/[−–]/g, '-').replace(/\s+/g, ' ').trim();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#36;/g, '$');

/** Unit-bearing figures in a string → [{kind, value, raw}] with value in base units. */
const SCALE = { bn: 1e9, billion: 1e9, m: 1e6, million: 1e6, mn: 1e6, k: 1e3, thousand: 1e3 };
function figures(s) {
  const out = [];
  const re = /(\$)?\s?(-?\d[\d,]*(?:\.\d+)?)\s?(%|bn\b|billion\b|million\b|mn\b|m\b|k\b|thousand\b)?/gi;
  for (const m of decode(s).matchAll(re)) {
    const [raw, dollar, num, unitRaw] = m;
    const n = Number(num.replace(/,/g, ''));
    if (!Number.isFinite(n)) continue;
    const unit = unitRaw?.toLowerCase();
    if (unit === '%') { out.push({ kind: 'pct', value: n, raw: raw.trim(), numeral: n }); continue; }
    const scale = unit ? SCALE[unit] : 1;
    if (dollar || unit) out.push({ kind: dollar ? 'money' : 'count', value: n * scale, raw: raw.trim(), numeral: n });
    else out.push({ kind: 'bare', value: n, raw: raw.trim(), numeral: n });
  }
  return out;
}
const sameFig = (a, b) => a.kind === b.kind && Math.abs(a.value - b.value) <= 1e-9 * Math.max(1, Math.abs(a.value));

function tablesOf(file) {
  const j = JSON.parse(readFileSync(file, 'utf8'));
  const t = j.tables || j;
  const pick = (k) => t[k] ?? t[`section_${k}`] ?? (k === 'mistakes' ? t.section_common_mistakes : undefined);
  return { content: pick('content'), quiz: pick('quiz'), diagrams: pick('diagrams') };
}

function surfacesOf(d) {
  if (!d) return [];
  const rows = [];
  if (d.title) rows.push(['title', d.title]);
  if (d.description) rows.push(['description', d.description]);
  (d.checklist || []).forEach((c, i) => rows.push([`checklist[${i}]`, c]));
  (d.scenarios || []).forEach((s, i) => {
    if (s.label) rows.push([`scenario[${i}].label`, s.label]);
    const svg = s.svg || '';
    [...svg.matchAll(/<(text|title|tspan)\b[^>]*>([^<]*)<\/\1>/g)].forEach((m, j) => { if (m[2].trim()) rows.push([`scenario[${i}] "${s.label}" svg text ${j}`, decode(m[2])]); });
  });
  return rows;
}

let hardTotal = 0;
for (const file of process.argv.slice(2)) {
  const { content, quiz, diagrams } = tablesOf(file);
  console.log(`\n=== ${file}`);
  let step = 0; // informational only
  content.forEach((block, bi) => {
    const d = diagrams.find((x) => x.id === block.diagramId);
    const rows = surfacesOf(d);
    for (const qi of block.quizIndices || []) {
      const q = quiz[qi];
      const key = q.options[q.correctIndex];
      const stemFigs = figures(q.question);
      const keyFigs = figures(key).filter((f) => !stemFigs.some((g) => sameFig(f, g)));
      const hits = [];
      for (const [where, text] of rows) {
        if (norm(text).includes(norm(key))) hits.push(['HARD', where, `key text "${key}"`, text]);
        const tf = figures(text);
        for (const kf of keyFigs) {
          if (kf.kind === 'bare') continue;
          if (tf.some((f) => sameFig(f, kf))) hits.push(['HARD', where, `figure ${kf.raw}`, text]);
          else if (Math.abs(kf.numeral) >= 13 && tf.some((f) => f.kind === 'bare' && f.value === kf.numeral)) hits.push(['SOFT', where, `bare ${kf.numeral} (key ${kf.raw})`, text]);
        }
      }
      const tag = hits.some((h) => h[0] === 'HARD') ? 'LEAK' : hits.length ? 'soft' : 'ok  ';
      console.log(`${tag} block ${bi + 1} "${block.title}" quiz[${qi}] key "${key}" · diagram "${d?.title}" · ${rows.length} surfaces`);
      console.log(`       stem: ${q.question}`);
      for (const [lvl, where, what, text] of hits) {
        console.log(`       ${lvl} ${what} in ${where}: "${text}"`);
        if (lvl === 'HARD') hardTotal++;
      }
    }
  });
}
console.log(`\n${hardTotal} HARD match(es)`);
process.exit(hardTotal ? 1 : 0);
