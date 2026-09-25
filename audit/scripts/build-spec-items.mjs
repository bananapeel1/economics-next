#!/usr/bin/env node
// The spec-item oracle: one row per requirement in the IAL specifications, parsed from the extracted
// spec text, each with a stable id, its verbatim wording and its source lines.
//
//   node audit/scripts/build-spec-items.mjs             write audit/raw/spec-items.json
//   node audit/scripts/build-spec-items.mjs --check     exit 1 if the file on disk is stale
//   node audit/scripts/build-spec-items.mjs --sample 30 print a random sample for hand verification
//
// CONTENT-GATE.md Layer 2 and Layer 3. Layer 3 — "start at the spec bullet and ask which content
// evidences it" — needs an enumerated list of bullets with ids. spec-coverage.json (12 Sep) holds the
// 175 MISSING and 237 THIN wordings but only a COUNT for the 661 covered, so the full list cannot be
// recovered from it; it has to be parsed from the source. This is that parser.
//
// The asset rule applies: generated, never hand-edited, spot-verified against the source text by a
// human, and RECONCILED against the earlier audit's per-topic counts before anyone trusts it.
//
// Granularity, so the reconciliation is like for like: the earlier audit counted a lettered
// requirement's BULLETS where it has them, else the requirement itself ("1b) Inertia" is a bullet under
// 1.3.2 requirement 1b; "1a Mass markets…: characteristics" is a bullet under Business 1.3.1 1a). Rows
// here carry kind 'leaf' for exactly those units, and kind 'requirement' for a lettered line that has
// bullets beneath it (kept for context; not counted).
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = 'audit/raw/spec-items.json';
const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const SAMPLE = (() => { const i = args.indexOf('--sample'); return i >= 0 ? Number(args[i + 1]) || 30 : 0; })();

const SOURCES = [
  { subject: 'economics', prefix: 'ECON', file: 'audit/raw/econ_spec.txt' },
  { subject: 'business', prefix: 'BUS', file: 'audit/raw/bus_spec.txt' },
];

const HEADER = /^\s*([1-4]\.3\.\d+)\s+(\S.*)$/;
const FOOTER = /(Pearson Edexcel International|Specification – Issue|^\s*\d{1,3}\s*$|^\s*What students need to learn:\s*$|^\s*\(continued\)\s*$)/;
const LETTER = /^(.*?)\b([a-z])\)\s+(.+)$/;      // "...  d) Factors that may cause..."
const SUBTOPIC = /^\s*(\d{1,2})\s+(\S.*)$/;       // "2 The demand curve   a) ..."  or  "3 Price, income and"
const BULLET_CHAR = /[•●▪‣]/;
const BULLET = /^\s*[•●▪‣]\s*(.*)$/;

function parse({ subject, prefix, file }) {
  const lines = readFileSync(file, 'utf8').replace(/\f/g, '').split('\n');

  // Topic boundaries: first occurrence of each topic number is its start; a later occurrence of the
  // same number is a continuation page and stays inside the span.
  const starts = [];
  lines.forEach((l, i) => {
    const m = HEADER.exec(l);
    if (!m) return;
    if (/\(continued\)/.test(m[2])) return;
    if (!starts.find((s) => s.topic === m[1])) starts.push({ topic: m[1], title: m[2].trim(), line: i });
  });
  // Titles that wrap onto the next line (4.3.3, 4.3.6 in Economics).
  for (const s of starts) {
    const next = lines[s.line + 1] || '';
    if (next.trim() && !HEADER.test(next) && !FOOTER.test(next) && !/^\s*\d+\s+\S/.test(next) && !LETTER.test(next) && next.trim().length < 60 && !/^\s*What students/.test(next)) {
      s.title = `${s.title} ${next.trim()}`.replace(/\s+/g, ' ');
    }
  }

  // Hard stops that are not topic headers: the next unit's introduction page, and the assessment
  // section that follows the last unit. The last topic of every unit runs into one of these.
  const UNIT_STOP = /^\s*(Unit [1-4]:\s+\S|Assessment information\s*$|Assessment objectives)/;
  const stops = [];
  lines.forEach((l, i) => { if (UNIT_STOP.test(l) && i > (starts[0]?.line ?? 0)) stops.push(i); });

  const items = [];
  for (let t = 0; t < starts.length; t += 1) {
    const { topic, title, line } = starts[t];
    const nextTopic = t + 1 < starts.length ? starts[t + 1].line : lines.length;
    const nextStop = stops.find((i) => i > line) ?? lines.length;
    const end = Math.min(nextTopic, nextStop);
    let sub = null;      // current sub-topic number
    let subLabel = '';   // the left-column label of the current sub-topic, e.g. "The demand curve"
    let req = null;      // current lettered requirement row
    let bullet = null;   // current bullet row
    const letterColumn = { at: null }; // indent where the letter column starts, learned per topic

    for (let i = line + 1; i < end; i += 1) {
      const raw = lines[i];
      if (!raw.trim()) continue;
      if (HEADER.test(raw) && HEADER.exec(raw)[1] === topic) continue; // "(continued)" header
      if (FOOTER.test(raw)) continue;

      const b = BULLET.exec(raw);
      if (b && req) {
        bullet = { id: `${req.id}-${req.bullets.length + 1}`, subject, topic, title, subtopic: req.subtopic, subtopicLabel: req.subtopicLabel, letter: req.letter, kind: 'leaf', parent: req.id, wording: b[1].trim(), lines: [i + 1, i + 1] };
        req.bullets.push(bullet);
        items.push(bullet);
        continue;
      }

      const lm = LETTER.exec(raw);
      if (lm) {
        const left = lm[1];
        const sm = SUBTOPIC.exec(left);
        if (sm) { sub = Number(sm[1]); subLabel = sm[2].trim(); }
        else if (left.trim() && !/\(continued\)/.test(left)) { subLabel = `${subLabel} ${left.trim()}`.replace(/\s+/g, ' ').trim(); }
        if (letterColumn.at == null) letterColumn.at = left.length;
        if (sub == null) sub = 0;
        req = { id: `${prefix}-${topic}-${sub}${lm[2]}`, subject, topic, title, subtopic: sub, subtopicLabel: subLabel, letter: lm[2], kind: 'requirement', wording: lm[3].trim(), lines: [i + 1, i + 1], bullets: [] };
        bullet = null;
        items.push(req);
        continue;
      }

      const sm = SUBTOPIC.exec(raw);
      if (sm && raw.search(/\S/) < 6) { sub = Number(sm[1]); subLabel = sm[2].trim(); bullet = null; continue; } // a sub-topic label with no letter on the same line
      // A wrapped label line ("   decision making") extends the current label when no requirement text sits to its right.
      if (letterColumn.at != null && raw.search(/\S/) < letterColumn.at - 2 && !raw.slice(letterColumn.at - 1).trim() && !/\(continued\)/.test(raw)) { subLabel = `${subLabel} ${raw.trim()}`.replace(/\s+/g, ' ').trim(); continue; }

      // Continuation prose. The left column may hold a wrapped sub-topic label on the same row as
      // the requirement's continuation ("   price mechanism          mechanism for allocating…"), so
      // the line is split at the letter column and only the right-hand part is kept.
      // A two-column row has a run of spaces before the letter column; a full-width prose line that
      // merely starts left of it does not, and slicing it there cut words in half ("onomies of
      // scale", "he distinction") in 20 of 1,319 rows until the token census in npm test caught it.
      const indent = raw.search(/\S/);
      let text;
      let split = false;
      // The letter column is learned once from the topic's first lettered line, but a "(continued)"
      // page can set its columns a character or two differently, and slicing at the stale column cut
      // PAST the bullet on the six rows that open a list on such a page (econ 936, 1179, 1180, 1417,
      // 1684, 1760). A bullet with a run of spaces before it IS the start of the right column, so it
      // bounds the cut. Rows whose bullet already sits right of the column are untouched.
      const bulletAt = raw.search(BULLET_CHAR);
      let cut = letterColumn.at != null ? letterColumn.at - 1 : null;
      if (cut != null && bulletAt > 0 && bulletAt < cut && /\s\s$/.test(raw.slice(0, bulletAt))) cut = bulletAt;
      const left = cut != null ? raw.slice(0, cut) : '';
      const gap = (left.match(/\s+$/) || [''])[0].length;
      if (cut != null && indent < cut - 1 && gap >= 2) {
        text = raw.slice(cut).trim();
        if (!text) continue;
        split = true;
      } else {
        text = raw.trim();
      }

      // V001. The extraction puts a wrapped left-column topic title on the same row as a list's FIRST
      // bullets ("   possibility        •   the maximum productive potential of an economy"), so those
      // bullets are only visible after the column split above. Until 16 Sep 2026 they fell through to
      // the append below and the row before them swallowed them: ECON-1.3.1-4a carried two of its own
      // five bullets inside its wording and reported three, and 60 leaves (31 Economics, 29 Business)
      // were invisible to the coverage oracle that every content packet measures itself against.
      // The test is re-applied to the split text rather than to the raw line, because a bullet matched
      // anywhere in a line would join the two-column calculator pages into one row.
      const rb = split ? BULLET.exec(text) : null;
      if (rb && req) {
        // The left-hand fragment is this sub-topic's label wrapping, and it is DISCARDED here, as the
        // continuation-prose branch below discards it. Folding it in was tried and reverted: it gives
        // "Patterns and volume of world trade" only if the middle line is folded too, and that branch
        // does not fold, so 4.3.2·2 came out as "Patterns and trade" and put a mangled term into the
        // terms.later-unit lint. Completing subtopicLabel is a separate defect (logged as V004); this
        // packet is about no leaf being invisible, and changes no label.
        bullet = { id: `${req.id}-${req.bullets.length + 1}`, subject, topic, title, subtopic: req.subtopic, subtopicLabel: req.subtopicLabel, letter: req.letter, kind: 'leaf', parent: req.id, wording: rb[1].trim(), lines: [i + 1, i + 1] };
        req.bullets.push(bullet);
        items.push(bullet);
        continue;
      }

      if (bullet) { bullet.wording = `${bullet.wording} ${text}`.replace(/\s+/g, ' '); bullet.lines[1] = i + 1; }
      else if (req) { req.wording = `${req.wording} ${text}`.replace(/\s+/g, ' '); req.lines[1] = i + 1; }
    }
  }

  // A requirement with no bullets is itself a leaf.
  for (const it of items) if (it.kind === 'requirement' && it.bullets.length === 0) it.kind = 'leaf';
  for (const it of items) { it.source = `${file}:${it.lines[0]}-${it.lines[1]}`; delete it.bullets; }
  return { starts, items };
}

const parsed = SOURCES.map(parse);
const items = parsed.flatMap((p) => p.items);
const topics = parsed.flatMap((p, k) => p.starts.map((s) => ({ subject: SOURCES[k].subject, ...s, line: s.line + 1 })));

// Reconcile against the earlier audit, topic by topic. Its unit was the leaf.
let coverage = null;
try { coverage = JSON.parse(readFileSync('audit/raw/spec-coverage.json', 'utf8')); } catch { /* optional */ }
const reconciliation = [];
if (coverage) {
  for (const s of coverage.bySection) {
    const audited = (s.covered || 0) + (s.thin || 0) + (s.missing || 0);
    const parsedLeaves = items.filter((it) => it.kind === 'leaf' && it.subject === s.subject && it.topic === s.number).length;
    reconciliation.push({ key: s.key, topic: s.number, subject: s.subject, audited, parsed: parsedLeaves, delta: parsedLeaves - audited });
  }
}

const out = {
  generated: new Date().toISOString().slice(0, 10),
  note: 'Generated by audit/scripts/build-spec-items.mjs from the extracted specification text. Do not edit by hand. kind=leaf is the countable unit (a bullet, or a lettered requirement with no bullets); kind=requirement is a lettered line that has bullets beneath it, kept for context.',
  reconciliationNote: [
    'This file does NOT reconcile to the 1,073 requirements counted by audit/raw/spec-coverage.json, and it should not be edited until it does. The two counts were checked against the source text where they disagree most, and the disagreement is the earlier audit\'s granularity, not this parser\'s.',
    'Verified in both directions on 14 Sep 2026: Economics 1.3.4 Price determination has eleven lettered requirements and no bullets in the spec (econ_spec.txt L692-722); this file has 11, the earlier audit counted 17. Economics 2.3.1 requirement 3c lists six bullets (L953-958, ending "society."); this file has all six, the earlier audit counted fewer.',
    'Mechanical completeness: every line inside every topic span that CONTAINS a bullet character at any position, or a lettered marker, STARTS exactly one row, and no row points at any other kind of line (0 leaks, 0 missed, both subjects). A deterministic 30-row sample (--sample 30) was read against its cited lines by hand: 30 of 30 verbatim, and every one of the 1,362 rows has the words of its wording, in order, inside the lines it cites.',
    'V001, fixed 16 Sep 2026 (packet 3.1): until this date the bullet test was anchored to line start, and the extraction puts a wrapped left-column topic title on the same row as a list\'s FIRST bullets. Those bullets did not become rows — they were appended to the row before them, so 32 rows carried a bullet character inside their own wording and 43 leaves (23 Economics, 20 Business) were invisible to the coverage oracle. The ledger item V001 estimated 60 (31/29); 43 is the measured figure, counted by scanning the raw text for the bullet character independently of the parser. Six of the 43 also needed the column cut to be bounded by the bullet, because a \'(continued)\' page sets its columns a character or two differently from the page that taught the parser where the letter column is.',
    'Consequence for Layer 3: coverage is measured against THESE rows. A section\'s coverage percentage here will differ from spec-coverage.json\'s, and this one is the auditable figure because every row cites its line.',
  ],
  topics,
  counts: { leaves: items.filter((i) => i.kind === 'leaf').length, requirements: items.filter((i) => i.kind === 'requirement').length, total: items.length },
  reconciliation,
  items,
};

if (SAMPLE) {
  const leaves = items.filter((i) => i.kind === 'leaf');
  // Deterministic sample so two people verify the same rows.
  let seed = 20260914;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const picked = [...leaves].sort(() => rnd() - 0.5).slice(0, SAMPLE);
  for (const p of picked) console.log(`${p.id.padEnd(22)} ${p.source.padEnd(34)} ${p.wording.slice(0, 90)}`);
  process.exit(0);
}

const json = JSON.stringify(out, null, 1) + '\n';
if (CHECK) {
  let disk = ''; try { disk = readFileSync(OUT, 'utf8'); } catch { /* absent */ }
  const strip = (s) => s.replace(/"generated": "[^"]+"/, '');
  if (strip(disk) !== strip(json)) { console.error(`${OUT} is stale; regenerate`); process.exit(1); }
  console.log(`${OUT} matches the specification text`); process.exit(0);
}
writeFileSync(OUT, json);
console.log(`wrote ${OUT}: ${out.counts.leaves} leaves, ${out.counts.requirements} parent requirements, ${topics.length} topics`);
if (reconciliation.length) {
  const tot = reconciliation.reduce((a, r) => ({ audited: a.audited + r.audited, parsed: a.parsed + r.parsed }), { audited: 0, parsed: 0 });
  console.log(`reconciliation vs spec-coverage.json: audited ${tot.audited}, parsed ${tot.parsed}`);
  const off = reconciliation.filter((r) => r.delta !== 0).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  console.log(`topics that agree exactly: ${reconciliation.length - off.length} of ${reconciliation.length}`);
  for (const r of off.slice(0, 43)) console.log(`  ${r.key.padEnd(44)} audited ${String(r.audited).padStart(3)}  parsed ${String(r.parsed).padStart(3)}  delta ${r.delta > 0 ? '+' : ''}${r.delta}`);
}
