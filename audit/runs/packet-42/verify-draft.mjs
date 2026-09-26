/**
 * PACKET 42 — gate item 5, and the packet spec's acceptance checks 3 and 4.
 *
 *   node audit/runs/packet-42/verify-draft.mjs
 *
 * PROTOCOL.md gate item 5: "verify the result against
 * `curl localhost:3001/api/sections/<id>?draft=1` FIELD BY FIELD — not against the file", because
 * the runner is the only writer to `draft` and a repository that agrees with itself can sit beside
 * a database that still holds the defect.
 *
 * AND IT FINDS ITS EVIDENCE A DIFFERENT WAY FROM THE THING IT IS CHECKING. The runner builds the
 * bundle by importing `_packet42-*.mjs` and asserts properties of those objects. This file imports
 * NOTHING from the packet: it fetches the served JSON over HTTP, re-parses the Appendix tariff
 * table out of `bus_spec.txt` itself, re-reads the leaf oracle out of `spec-items.json`, and
 * re-greps the banned vocabulary out of the served payload. Every number below is measured on what
 * the route returned.
 *
 * `check-staged-drafts.mjs` already compares the served draft with the dumped bundle and reports
 * "matches, 0 drift". That is a same-shape comparison: it would agree with a bundle that was wrong
 * in the same way in both places. This is the independent read.
 */
import { readFileSync } from 'node:fs';
import { supabase } from '../../../scripts/_db.mjs';

const URL_ = process.env.PACKET42_URL || 'http://localhost:3001/api/sections/resource-management?draft=1';
const fails = [];
const notes = [];
const ok = (cond, why) => { if (!cond) fails.push(why); };

const res = await fetch(URL_);
if (!res.ok) { console.error(`${URL_} returned ${res.status}`); process.exit(1); }
const served = await res.json();
const S = served.section ?? served;

/* ── what the route actually served, named field by field ──────────────────── */
const content = S.content ?? [];
const quiz = S.quiz ?? [];
const practice = S.practice ?? [];
const diagrams = S.diagrams ?? [];
const notesTab = S.notes ?? [];
const flashcards = S.flashcards ?? [];
const mistakes = S.mistakes ?? S.common_mistakes ?? [];
const extras = S.extras ?? {};
const subs = content.flatMap((b) => b.sections ?? []);
const recalls = subs.map((x) => x.recall).filter(Boolean);

console.log(`served from ${URL_}`);
console.log(`  content ${content.length} blocks · ${subs.length} subsections · ${recalls.length} recalls`);
console.log(`  quiz ${quiz.length} · practice ${practice.length} · diagrams ${diagrams.length} · notes ${notesTab.length} · flashcards ${flashcards.length} · mistakes ${mistakes.length}`);
console.log(`  extras ${(extras.chains || []).length} chains · ${(extras.evaluation || []).length} evaluation`);

ok(content.length === 4, `${content.length} blocks served, not the specification's four sub-topics`);
ok(subs.length === 26, `${subs.length} subsections served, not 26`);
ok(recalls.length === subs.length, `${recalls.length} recalls over ${subs.length} subsections — structure-02 is that the live section has none`);
ok(diagrams.length === 4, `${diagrams.length} diagrams served — structure-03/specGap-01 are that the live section has none`);

/* ── the four chapters, in the specification's own order, read off the payload ─ */
const titles = content.map((b) => b.title);
const want = ['Production, Productivity and Efficiency', 'Capacity Utilisation', 'Inventory Control', 'Quality Management'];
want.forEach((w, i) => ok(titles[i] === w, `chapter ${i + 1} served as "${titles[i]}", not "${w}"`));

/* ── pins resolve on the SERVED payload (topFix-02, structure-01, quiz-01, structure-07) ── */
const dIds = new Set(diagrams.map((d) => d.id));
for (const b of content) {
  ok(!!b.diagramId, `chapter "${b.title}" served with no diagramId`);
  ok(dIds.has(b.diagramId), `chapter "${b.title}" pins ${b.diagramId}, which no served diagram carries`);
  ok((b.quizIndices || []).length > 0, `chapter "${b.title}" served with no quizIndices`);
  ok((b.practiceIndices || []).length > 0, `chapter "${b.title}" served with no practiceIndices`);
  ok(!('diagramRef' in b), `chapter "${b.title}" still carries the legacy diagramRef`);
}
/* the swap structure-01 reports: a chapter's pinned quiz must be about that chapter. Checked by
   TOPIC WORDS rather than by a tag, because the tag is stripped before the payload is written —
   so this cannot agree with the builder's own derivation by construction. */
const TOPIC = [
  [/production|productivity|efficien|worker|method|batch|flow|cell|labour|capital|lead-in/i, want[0]],
  [/capacity|utilisation|idle|maximum possible|spare/i, want[1]],
  [/inventor|buffer|just in time|jit|waste|lean|deliver|usage|held/i, want[2]],
  [/quality|assurance|circle|kaizen|tqm|defect|inspect|warrant/i, want[3]],
];
for (const b of content) {
  for (const i of b.quizIndices || []) {
    const q = quiz[i];
    ok(!!q, `chapter "${b.title}" pins quiz index ${i} and the served bank has ${quiz.length} items`);
    if (!q) continue;
    const hay = `${q.question} ${(q.options || []).join(' ')}`;
    const matched = TOPIC.filter(([re]) => re.test(hay)).map(([, t]) => t);
    ok(matched.includes(b.title), `chapter "${b.title}" serves a quiz item whose topic words point at ${matched.join('/') || 'nothing'}: "${q.question.slice(0, 60)}"`);
  }
  ok((b.practiceIndices || []).every((i) => practice[i]), `chapter "${b.title}" pins a practice index outside the served array of ${practice.length}`);
}
/* nothing orphaned — structure-07 is three practice items reachable from no block */
const reachedP = new Set(content.flatMap((b) => b.practiceIndices || []));
practice.forEach((p, i) => ok(reachedP.has(i), `served practice item ${i} (${p.command} ${p.marks}) is reachable from no chapter — structure-07`));

/* ── topFix-01 / quiz-02: the histogram, on the WHOLE bank ─────────────────── */
/*
 * THE ANONYMOUS ROUTE SERVES A SLICE, NOT THE BANK. It returns 7 of the 35 items, which is the
 * free-quiz budget doing its job — and a histogram over 7 items is not evidence about a
 * distribution. So the bank is read straight out of the `draft` COLUMN: a third access path,
 * neither the HTTP route above nor the packet's own modules. The served slice is still checked
 * item by item for a correctIndex inside its own options array.
 */
for (const q of quiz) ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < (q.options || []).length, `a served quiz item has correctIndex ${q.correctIndex} against ${(q.options || []).length} options`);
const { data: quizRow, error: quizErr } = await supabase.from('section_quiz').select('draft').eq('section_id', 'resource-management').single();
if (quizErr) fails.push(`could not read section_quiz.draft: ${quizErr.message}`);
const bank = quizRow?.draft ?? [];
const hist = [0, 0, 0, 0];
for (const q of bank) hist[q.correctIndex] += 1;
console.log(`  correctIndex histogram on the WHOLE staged bank (draft column): ${hist.join(' / ')} of ${bank.length}; the route served ${quiz.length}`);
ok(bank.length >= 25, `the draft column holds ${bank.length} quiz items`);
const share = hist.map((v) => v / bank.length);
ok(Math.max(...share) <= 0.4 && Math.min(...share) >= 0.1, `staged histogram ${hist.join('/')} of ${bank.length} — topFix-01's defect (23 of 25 at one index) reproduced`);
/* packet 26: no explanation may name an option by letter or position — over the whole bank */
for (const q of bank) {
  ok(!/\(\s*[A-F]\s*\)/.test(q.explanation || ''), `a served explanation names an option by letter: "${(q.explanation || '').slice(0, 60)}"`);
  ok(!/\b(first|second|third|fourth|last|final)\s+(option|answer|choice)\b|\boption [A-D]\b/i.test(q.explanation || ''), `a served explanation names an option by position: "${(q.explanation || '').slice(0, 60)}"`);
}

/* ── ACCEPTANCE CHECK 4 · RULE 2, GREPPED OVER THE SERVED PAYLOAD ──────────── */
/*
 * The packet spec's own wording: the five phrases must be "0 outside diagram labels". So the
 * payload is walked twice — once with every SVG `<text>` body removed, which must be clean, and
 * once over the diagram SVGs alone, which must CARRY them, because a grep satisfied by deleting
 * the drawing has removed leaf 3a instead of meeting it.
 */
const walk = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => walk(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => walk(x, out)); return out; };
const allText = walk(S);
const svgStrings = allText.filter((s) => s.trimStart().startsWith('<svg'));
const nonSvg = allText.filter((s) => !s.trimStart().startsWith('<svg'));
const BANNED = [/stock control/i, /buffer stock/i, /re-?order level/i, /lead time/i, /stock-?out/i, /seven wastes/i];
let bannedHits = 0;
for (const re of BANNED) for (const s of nonSvg) if (re.test(s)) { bannedHits += 1; fails.push(`Rule 2: ${re} matched served teaching text: "${s.slice(0, 90)}"`); }
/* and inside the SVGs, only the `<text>` bodies are exempt — an attribute or a comment is not */
for (const re of BANNED) for (const s of svgStrings) {
  const stripped = s.replace(/<text\b[^>]*>[^<]*<\/text>/g, ' ');
  if (re.test(stripped)) { bannedHits += 1; fails.push(`Rule 2: ${re} matched outside a <text> body inside an SVG`); }
}
console.log(`  Rule 2: ${bannedHits} occurrence(s) of the five banned phrases outside diagram <text> bodies (gate: 0)`);
const invSvgText = svgStrings.flatMap((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1])).join(' | ');
for (const label of ['Maximum level', 'Re-order level', 'Buffer inventory', 'Lead time', 'Re-order quantity']) {
  ok(invSvgText.includes(label), `the served diagrams carry no "${label}" label — leaf 3a asks a student to interpret the standard drawing`);
}
/* the specification's own vocabulary must be the vocabulary that IS used */
const teachingJoined = nonSvg.join(' ').toLowerCase();
for (const w of ['inventory control', 'buffer inventory', 'waste minimisation', 'lean production', 'just in time', 'kaizen', 'quality circle', 'minimum average cost', 'capacity utilisation', 'lead-in time']) {
  ok(teachingJoined.includes(w), `the served payload never says "${w}", which is the specification's own phrase`);
}

/* ── accuracy-01 / topFix-03, on the served payload ────────────────────────── */
/*
 * SCOPED TO WHAT A STUDENT READS. An SVG's `xmlns="http://www.w3.org/2000/svg"` carries the digits
 * 2000 and the row's own timestamp carries today's date; neither is teaching text, and a sweep
 * firing on them would be reporting its own scope as a defect. So the ban runs over the non-SVG
 * strings with ISO timestamps excluded, plus every SVG `<text>` body — and is then A/B'd against
 * the live sentence it exists to keep out, so the narrowing cannot have emptied it.
 */
const studentText = [
  ...nonSvg.filter((s) => !/^\d{4}-\d{2}-\d{2}T[\d:.]+Z?$/.test(s.trim())),
  ...svgStrings.flatMap((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1])),
];
const COMPANY = /toyota|rolls-royce|jaguar|land rover|\bjlr\b|brewdog/i;
const YEAR = /\b(19|20)\d\d\b/;
for (const s of studentText) {
  ok(!COMPANY.test(s), `a named real company survives in the served payload: "${s.slice(0, 80)}"`);
  ok(!YEAR.test(s), `a year survives in the served payload: "${s.slice(0, 80)}"`);
  ok(!/�/.test(s), `a replacement character survives in the served payload: "${s.slice(0, 80)}"`);
  ok(!/\bundefined|\bNaN\b|\[object Object\]|\$\{/.test(s), `a failed substitution in the served payload: "${s.slice(0, 80)}"`);
}
{
  const live = 'During the 2021 semiconductor shortage, Toyota had to halt production at 14 factories.';
  ok(COMPANY.test(live) && YEAR.test(live), 'the accuracy-01 sweep no longer catches the live Toyota sentence it exists to keep out');
  ok(!COMPANY.test('An assembler of bicycles raises output per worker.') && !YEAR.test('An assembler of bicycles raises output per worker.'), 'the accuracy-01 sweep fires on ordinary teaching prose');
}

/* ── the practice set against the Appendix, RE-PARSED here ─────────────────── */
const specLines = readFileSync('audit/raw/bus_spec.txt', 'utf8').split('\n');
const TARIFFS = {};
for (const m of specLines.slice(2218, 2252).join('\n').matchAll(/^(Define|Calculate|Construct|Explain|Analyse|Discuss|Assess|Evaluate)\s+(\d+)/gm)) TARIFFS[m[1]] = Number(m[2]);
console.log(`  tariffs re-parsed here: ${Object.entries(TARIFFS).map(([k, v]) => `${k} ${v}`).join(' · ')}`);
const seen = new Set();
for (const p of practice) {
  seen.add(p.command);
  ok(TARIFFS[p.command] === p.marks, `served practice "${p.command}" carries ${p.marks} marks against the Appendix's ${TARIFFS[p.command]}`);
  ok(new RegExp(`\\(${p.marks} marks?\\)\\s*$`).test(p.question), `served practice "${p.command}" does not end in its own tariff`);
  const first = String(p.guidance || '').split('\n')[0];
  ok(String(p.guidance || '').split('\n').length >= 2, `served practice "${p.command}" has one guidance paragraph — guided mode would print the mark scheme over an empty box`);
  ok(!/\b\d+\s*marks?\b/i.test(first) && !/\$[\d,]/.test(first) && !/\bLevel\s*\d/i.test(first), `served practice "${p.command}": the opening paragraph gives something away`);
}
for (const c of Object.keys(TARIFFS)) ok(seen.has(c), `no served practice item uses the command word "${c}"`);

/* ── ACCEPTANCE CHECK 5 · leaf coverage, against the oracle, on the served text ── */
const oracle = JSON.parse(readFileSync('audit/raw/spec-items.json', 'utf8')).items.filter((x) => /^BUS-2\.3\.4-/.test(x.id) && x.kind === 'leaf');
console.log(`  oracle: ${oracle.length} substantive leaves at 2.3.4`);
ok(oracle.length === 28, `${oracle.length} substantive leaves in the oracle, not 28`);
/*
 * The leaf-by-leaf evidence is measured by DISTINCTIVE WORDING out of the oracle row, not by the
 * builder's LEAF_MAP — a different method from the one that produced the mapping. A leaf counts as
 * evidenced when every distinctive word of its wording appears inside one served teaching field.
 */
const STOP = new Set(['the', 'of', 'and', 'a', 'an', 'in', 'to', 'from', 'per', 'between', 'at', 'on', 'for', 'or', 'by', 'unit', 'time', 'period', 'ways', 'factors', 'implications', 'interpretation', 'distinction', 'competitive', 'advantage', 'improving', 'influencing', 'improve', 'production', 'quality', 'utilisation', 'capacity']);
const fields = subs.flatMap((s) => [s.title, s.keyIdea, ...(s.body || []).map((b) => b.text || ''), s.misconception, s.examMatters, s.realExample?.text].filter(Boolean)).map((x) => String(x).toLowerCase());
const uncovered = [];
for (const leaf of oracle) {
  const words = String(leaf.wording).toLowerCase().replace(/[^a-z0-9\- ]+/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));
  const key = words.length ? words : String(leaf.wording).toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').trim().split(/\s+/);
  if (!fields.some((f) => key.every((w) => f.includes(w)))) uncovered.push(`${leaf.id} "${leaf.wording}"`);
}
console.log(`  leaf evidence by distinctive wording: ${oracle.length - uncovered.length} of ${oracle.length}`);
for (const u of uncovered) notes.push(`leaf not matched by the wording probe: ${u}`);
ok(uncovered.length === 0, `${uncovered.length} leaf/leaves not evidenced by an independent wording probe: ${uncovered.join('; ')}`);

/* ── the recall contract, on the served objects ────────────────────────────── */
const byType = {};
for (const r of recalls) {
  byType[r.type] = (byType[r.type] || 0) + 1;
  ok(['fillin', 'reorder', 'match', 'classify'].includes(r.type), `a served recall has type "${r.type}"`);
  ok(!!r.prompt, 'a served recall has no prompt');
  ok(!('shuffled' in r), 'a served recall carries `shuffled`');
  if (r.type === 'fillin') {
    const blanks = (r.template || []).join(' ').split('___').length - 1;
    ok(blanks === (r.answers || []).length, `a served fill-in has ${blanks} blanks against ${(r.answers || []).length} answers`);
    ok((r.answers || []).every((a) => !/,/.test(a)), 'a served fill-in answer contains a comma');
    ok(new Set((r.answers || []).map((a) => a.toLowerCase())).size === (r.answers || []).length, 'a served fill-in has a duplicated answer');
  }
  if (r.type === 'reorder') ok(!!r.criterion && (r.why || []).length === (r.correctOrder || []).length, 'a served reorder is missing its criterion or a why line');
  if (r.type === 'match') ok((r.pairs || []).every((p) => p.why), 'a served match pair has no why');
  if (r.type === 'classify') ok((r.groups || []).every((g) => String(g.why || '').trim()), 'a served classify group has no why');
}
console.log(`  recall types served: ${Object.entries(byType).map(([k, v]) => `${v} ${k}`).join(', ')}`);
for (const t of ['fillin', 'reorder', 'match', 'classify']) ok(byType[t], `no ${t} recall served`);

/* ── report ────────────────────────────────────────────────────────────────── */
console.log('');
if (notes.length) for (const n of notes) console.log(`NOTE ${n}`);
if (fails.length) {
  console.error(`${fails.length} field-by-field check(s) FAILED against the served draft:`);
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`all field-by-field checks pass against the SERVED draft (${URL_}).`);
console.log('Scope of that sentence: this is the anonymous draft slice the route returns. Every field it');
console.log('printed a count for above was checked; an entitled-only field the route does not serve was not');
console.log('reached by this file and is not claimed.');
