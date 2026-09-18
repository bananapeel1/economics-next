#!/usr/bin/env node
/**
 * PACKET 37 — verification against the SERVED `draft`, not against the files.
 *
 *   node audit/runs/packet-37/verify-draft.mjs
 *
 * DECISIONS, 16 September: a content fix verified against the file is not verified at all. The
 * runner is the only writer to `draft`, so a module edited and re-dumped leaves a repository that
 * agrees with itself while the database still holds the defect — and nothing else in the gate can
 * see it, because `validate` and `npm test` read files and Verify A reads the diff.
 *
 * AND IT DOES NOT IMPORT THE SPINE. MEMORY's rule is that a check reusing the implementation
 * cannot see the implementation's blind spot. Every number below is parsed back OUT of the served
 * strings and re-derived from the other served strings, so a wrong figure in `_packet37-util.mjs`
 * would have to be wrong consistently in prose, in a diagram and in a recall to survive. The only
 * things imported are Node's own modules and the specification text.
 *
 * Two payloads are checked:
 *   - `GET /api/sections/national-income?draft=1` — what a SIGNED-OUT student is actually served,
 *     which is the free preview: three pre-test items plus one per chapter check-in.
 *   - the `draft` column of all eight tables, read straight from the database, which is the whole
 *     bank including the paid surfaces no signed-out walk can reach.
 * And `data` is asserted UNTOUCHED on all eight, because rule 6 says nothing publishes from here.
 */
import { readFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const SECTION = 'national-income';
const BASE = process.env.PACKET37_BASE || 'http://localhost:3001';
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };
let checks = 0;
const check = (cond, msg) => { checks += 1; ok(cond, msg); };

const env = {};
readFileSync('.env.local', 'utf8').split('\n').forEach((l) => { const [k, ...r] = l.split('='); if (k && r.length) env[k.trim()] = r.join('=').trim(); });
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const TABLES = ['section_content', 'section_notes', 'section_quiz', 'section_practice', 'section_flashcards', 'section_diagrams', 'section_extras', 'section_common_mistakes'];

/* ── the two payloads ──────────────────────────────────────────────────────── */
const served = await (await fetch(`${BASE}/api/sections/${SECTION}?draft=1`)).json();
const rows = {};
for (const t of TABLES) {
  const { data, error } = await sb.from(t).select('data, draft').eq('section_id', SECTION).single();
  if (error) { fails.push(`${t}: ${error.message}`); continue; }
  rows[t] = data;
}

const strings = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (Array.isArray(v)) v.forEach((x) => strings(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, out)); return out; };
const draftStrings = strings(Object.fromEntries(Object.entries(rows).map(([t, r]) => [t, r?.draft])));
const proseAll = draftStrings.filter((s) => !s.startsWith('<svg') && !/^national-income:/.test(s));
const svgAll = draftStrings.filter((s) => s.startsWith('<svg'));
const svgWords = svgAll.map((s) => [...s.matchAll(/<text\b[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]).join(' '));
const readable = [...proseAll, ...svgWords];
const hay = readable.join('\n');

/* ══ 1 · `data` IS UNTOUCHED ═══════════════════════════════════════════════ */
for (const t of TABLES) {
  const r = rows[t];
  if (!r) continue;
  check(r.draft !== null && r.draft !== undefined, `${t}: draft is empty`);
  check(JSON.stringify(r.data) !== JSON.stringify(r.draft), `${t}: data and draft are identical — this packet has not published, so they must differ`);
}
{
  const liveContent = rows.section_content?.data;
  check(Array.isArray(liveContent) && liveContent.length === 4, `data on section_content has ${liveContent?.length} blocks; the live section is the 4-block one and must be untouched`);
  const liveQuiz = rows.section_quiz?.data;
  check(Array.isArray(liveQuiz) && liveQuiz.length === 24, `data on section_quiz has ${liveQuiz?.length} items; the live bank is 24 and must be untouched`);
}

/* ══ 2 · THE ARITHMETIC, RE-DERIVED FROM THE SERVED TEXT ═══════════════════ */
/*
 * Nothing here is imported. Each figure is parsed out of a served string and checked against the
 * OTHER served strings, so the spine would have to be wrong in the same way in several places to
 * pass. Packet 34's Layer 6 found a printed ratio that did not divide the printed figures because
 * every check recomputed from one unrounded source; this reads the printed characters.
 */
{
  /* the four propensities, taken off the line that prints all four */
  const line = readable.find((s) => /MPC 0\.\d+ \+ MPS 0\.\d+ \+ MPT 0\.\d+ \+ MPM 0\.\d+/.test(s))
    || readable.find((s) => /MPC.{0,6}0\.\d+/.test(s) && /MPM.{0,6}0\.\d+/.test(s));
  check(!!line, 'no served string prints all four marginal propensities together');
  if (line) {
    const [mpc, mps, mpt, mpm] = ['MPC', 'MPS', 'MPT', 'MPM'].map((k) => Number((line.match(new RegExp(`${k}[^0-9]{0,8}(0\\.\\d+)`)) || [])[1]));
    check([mpc, mps, mpt, mpm].every((x) => x > 0), `could not parse all four propensities out of "${line.slice(0, 80)}"`);
    const sum = Math.round((mpc + mps + mpt + mpm) * 100) / 100;
    check(sum === 1, `the four propensities the section PRINTS sum to ${sum}, not 1 — and unless they do, the two formulae it also prints cannot both be right`);
    const mpw = Math.round((mps + mpt + mpm) * 100) / 100;
    check(mpw === Math.round((1 - mpc) * 100) / 100, `printed MPW ${mpw} is not 1 − printed MPC ${mpc}`);
    /* both formulae, computed from the PARSED propensities and compared to the PRINTED multiplier */
    /*
     * READ OFF THE SPINE'S OWN LINE. `specGap-04`'s worked example is deliberately a DIFFERENT
     * economy with k = 4, so the first "multiplier is N" in the document is not this economy's —
     * which is what the first draft of this verifier matched, and it is the same class of error as
     * looking a requirement up by the wrong number.
     */
    const kPrinted = Number((hay.match(/\$\d+bn\s+×\s+(\d+(?:\.\d+)?)\s+=\s+\$\d+bn/) || [])[1]);
    check(kPrinted === Math.round((1 / (1 - mpc)) * 100) / 100, `the section prints a multiplier of ${kPrinted}; 1/(1−MPC) on its own printed MPC gives ${Math.round((1 / (1 - mpc)) * 100) / 100}`);
    check(kPrinted === Math.round((1 / mpw) * 100) / 100, `the section prints a multiplier of ${kPrinted}; 1/MPW on its own printed propensities gives ${Math.round((1 / mpw) * 100) / 100}`);
    /* the rounds, parsed off the diagram, must each be MPC times the one before */
    /*
     * THE BAR VALUES ARE THE COLOURED LABELS AND THE ROUND NUMBERS ARE THE MUTED ONES. Reading
     * every numeric token off the joined caption picked up the axis labels 1..6 and "verified"
     * that round 3 was 2 — a parser that finds the wrong characters reads green just as easily as
     * one that finds the right ones, which is why this pulls the fills apart.
     */
    const barSvg = svgAll.find((x) => /Each round is/.test(x)) || '';
    const rounds = [...barSvg.matchAll(/<text[^>]*fill="(#f59e0b|#60a5fa)"[^>]*>([\d.]+)<\/text>/g)].map((m) => Number(m[2]));
    check(rounds.length >= 4, `only ${rounds.length} decreasing round values found on the multiplier diagram`);
    for (let i = 1; i < Math.min(rounds.length, 5); i += 1) {
      const want = Math.round(rounds[i - 1] * mpc * 100) / 100;
      check(Math.abs(rounds[i] - want) <= 0.01, `round ${i + 1} is printed as ${rounds[i]} and the printed MPC gives ${want} from round ${i}`);
    }
  }
}
{
  /* the circuit: the six components printed in the notes must add to the printed national income */
  const inj = hay.match(/investment \$(\d+)bn \+ government expenditure \$(\d+)bn \+ exports \$(\d+)bn = \$(\d+)bn/i);
  check(!!inj, 'no served string totals the three injections');
  if (inj) {
    const [, i, g, x, total] = inj.map(Number);
    check(i + g + x === total, `the section prints ${i} + ${g} + ${x} and calls it ${total}`);
  }
  const wdl = hay.match(/savings \$(\d+)bn \+ taxation \$(\d+)bn \+ imports \$(\d+)bn = \$(\d+)bn/i);
  check(!!wdl, 'no served string totals the three withdrawals');
  if (inj && wdl) {
    const [, s2, t2, m2, wtotal] = wdl.map(Number);
    check(s2 + t2 + m2 === wtotal, `the section prints ${s2} + ${t2} + ${m2} and calls it ${wtotal}`);
    check(Number(inj[4]) === wtotal, `injections total ${inj[4]} against withdrawals ${wtotal}, and the section teaches this economy as being in equilibrium`);
  }
  /* the multiplied change and the new equilibrium, both parsed */
  const mult = hay.match(/\$(\d+)bn\s+×\s+(\d+(?:\.\d+)?)\s+=\s+\$(\d+)bn/);
  check(!!mult, 'no served string prints the injection, the multiplier and the result together');
  if (mult) {
    const [, shock, k, dy] = mult.map(Number);
    check(shock * k === dy, `the diagram prints ${shock} × ${k} = ${dy}`);
    const newEq = hay.match(/withdrawals \$(\d+)bn now match injections \$(\d+)bn/i);
    check(!!newEq, 'no served string shows the new equilibrium where withdrawals match injections again');
    if (newEq && inj) check(Number(newEq[1]) === Number(newEq[2]) && Number(newEq[1]) === Number(inj[4]) + shock,
      `the new equilibrium prints ${newEq[1]} against ${newEq[2]}, and the old injections plus the shock give ${Number(inj[4]) + shock}`);
  }
}
{
  /* THE SIGN PROPERTY, read off the served diagram rather than off the prose that claims it */
  const eq = svgWords.find((s) => /AD shifts right/.test(s)) || '';
  const as = svgWords.find((s) => /AS shifts right/.test(s)) || '';
  check(!!eq && !!as, 'the AD-shift and AS-shift scenarios are not both served');
  const base = svgWords.find((s) => /Equilibrium: real output/.test(s)) || '';
  const baseOut = Number((base.match(/real output \$(\d+)bn/) || [])[1]);
  const basePrice = Number((base.match(/price level of (\d+(?:\.\d+)?)/) || [])[1]);
  check(baseOut > 0 && basePrice > 0, 'could not read the base equilibrium off the served diagram');
  const readMark = (svg) => {
    const outs = [...svg.matchAll(/\b(\d{3})\b/g)].map((m) => Number(m[1])).filter((n) => n >= 400 && n <= 700);
    const prices = [...svg.matchAll(/\b(\d{2,3}(?:\.\d)?)\b/g)].map((m) => Number(m[1])).filter((n) => n >= 85 && n <= 135);
    return { outs, prices };
  };
  if (eq && baseOut) {
    const { outs, prices } = readMark(eq);
    const newOut = outs.find((n) => n !== baseOut);
    const newPrice = prices.find((n) => n !== basePrice);
    check(newOut > baseOut, `an AD shift right must RAISE output: the diagram shows ${newOut} against ${baseOut}`);
    check(newPrice > basePrice, `an AD shift right must RAISE the price level: the diagram shows ${newPrice} against ${basePrice}`);
  }
  if (as && baseOut) {
    const { outs, prices } = readMark(as);
    const newOut = outs.find((n) => n !== baseOut);
    const newPrice = prices.find((n) => n !== basePrice);
    check(newOut > baseOut, `an AS shift right must RAISE output: the diagram shows ${newOut} against ${baseOut}`);
    check(newPrice < basePrice, `an AS shift right must LOWER the price level: the diagram shows ${newPrice} against ${basePrice} — this is the section's single most examinable claim`);
  }
}

/* ══ 3 · WHAT A SIGNED-OUT STUDENT IS SERVED ══════════════════════════════ */
{
  check(served.content?.length === 6, `the served draft has ${served.content?.length} blocks`);
  const dIds = new Set((served.diagrams || []).map((d) => d.id));
  for (const b of served.content || []) {
    check(!!b.diagramId && dIds.has(b.diagramId), `served block "${b.title}" resolves no diagram`);
    check((b.quizIndices || []).length > 0, `served block "${b.title}" has no quiz index`);
    check((b.practiceIndices || []).length > 0, `served block "${b.title}" has no practice index`);
    for (const i of b.quizIndices || []) check(!!served.quiz?.[i], `served block "${b.title}" points at quiz ${i}, which the free payload does not carry`);
    for (const i of b.practiceIndices || []) check(!!served.practice?.[i], `served block "${b.title}" points at practice ${i}, which the free payload does not carry`);
    check(!('diagramRef' in b), `served block "${b.title}" still carries the legacy string pin`);
  }
  const steps = (served.content || []).reduce((n, b) => n + b.sections.length, 0);
  check(steps === 23, `${steps} teaching steps served, not 23`);
  check((served.quiz || []).length <= 10, `${served.quiz?.length} quiz items in the free payload, above FREE_QUIZ_MAX 10`);
  /* the three pre-test items must be the ones no chapter claims */
  const claimed = new Set((served.content || []).flatMap((b) => b.quizIndices || []));
  const free = (served.quiz || []).map((_, i) => i).filter((i) => !claimed.has(i));
  check(free.length === 3, `${free.length} unclaimed quiz items in the free payload, and the pre-test asks three`);
  /*
   * THE FREE PAYLOAD REMAPS THE INDICES, so the three pre-test items are served LAST here even
   * though they are FIRST in the bank; the ordering constraint belongs on the bank and is checked
   * there. What matters to a student is packet 20's finding: the pre-test must not ask a question
   * a check-in then asks again.
   */
  const claimedQs = new Set([...claimed].map((i) => served.quiz[i]?.question));
  for (const i of free) check(!claimedQs.has(served.quiz[i]?.question), `the pre-test and a chapter check-in serve the same question: "${served.quiz[i]?.question.slice(0, 50)}"`);
  const bank = rows.section_quiz?.draft || [];
  const bankClaimed = new Set((rows.section_content?.draft || []).flatMap((b) => b.quizIndices || []));
  const bankFree = bank.map((_, i) => i).filter((i) => !bankClaimed.has(i));
  check(bankFree.length === 3 && bankFree.every((i) => i < 3), `the draft bank's unpinned items are at ${JSON.stringify(bankFree)}, and the pre-test pool must be the first three`);
}

/* ══ 4 · VOCABULARY AND SHAPE, ON THE SERVED STRINGS ══════════════════════ */
{
  const spec = readFileSync('audit/raw/econ_spec.txt', 'utf8');
  /* the bans, re-derived: a word is banned here because it is absent THERE */
  for (const word of ['leakage', 'unplanned', 'inventories', 'paradox of thrift', 'full employment', 'spare capacity', 'accelerator', 'factor market', 'output gap', 'crowding out', 'Phillips curve', 'purchasing power parit']) {
    const inSpecAt234 = new RegExp(word, 'i').test(spec.split('\n').slice(1055, 1082).join('\n'));
    check(!inSpecAt234, `"${word}" turns out to be inside the 2.3.4 span after all; the ban rests on it not being`);
    const hits = readable.filter((s) => new RegExp(`\\b${word}`, 'i').test(s));
    const refuted = hits.filter((s) => /specification/i.test(s) && /withdrawal/i.test(s));
    check(hits.length === refuted.length, `"${word}" appears ×${hits.length - refuted.length} in the served draft: "${(hits.find((s) => !refuted.includes(s)) || '').slice(0, 90)}"`);
  }
  for (const word of ['Assess', 'Outline', 'real GDP', 'GDP per capita', 'standard of living', 'living standards']) {
    const hits = readable.filter((s) => new RegExp(`\\b${word}\\b`).test(s));
    check(hits.length === 0, `"${word}" appears ×${hits.length} in the served draft: "${(hits[0] || '').slice(0, 90)}"`);
  }
  check(/\bwithdrawal/i.test(hay), 'the served draft never uses the specification\'s own word for a withdrawal');
  /* one mention of transfer payments, with its pointer, and never called an injection */
  const tp = readable.filter((s) => /transfer payments?/i.test(s));
  check(tp.length >= 1 && tp.some((s) => /4\.3\.5/.test(s)), 'transfer payments are not named with the pointer to 4.3.5 · 1a');
  check(!tp.some((s) => /transfer payments?[^.]{0,80}\bis an injection\b/i.test(s)), 'the served draft calls transfer payments an injection — accuracy-01 regressed');
  /* failed substitutions, on every served surface */
  for (const s of draftStrings) check(!/\bundefined|\bNaN|\[object Object\]|\$\{/.test(s), `a failed substitution in the served draft: "${s.slice(0, 90)}"`);
}

/* ══ 5 · PRACTICE, AGAINST APPENDIX 6 READ FROM THE SPECIFICATION ═════════ */
{
  /* the tariffs are parsed out of the document, not restated */
  const app6 = readFileSync('audit/raw/econ_spec.txt', 'utf8').split('\n').slice(2695, 2746).join('\n');
  const TARIFFS = {};
  for (const m of app6.matchAll(/^\s(Define|Calculate|Draw|Explain|Analyse|Examine|Discuss|Evaluate\/ To)\s+(\d+(?: or \d+)?)\s/gm)) {
    TARIFFS[m[1].replace('/ To', '')] = m[2].split(' or ').map(Number);
  }
  check(Object.keys(TARIFFS).length === 8, `parsed ${Object.keys(TARIFFS).length} command words out of Appendix 6, not 8 — the parse is wrong, not the appendix`);
  const practice = rows.section_practice?.draft || [];
  check(practice.length === 9, `${practice.length} practice items in the draft`);
  for (const p of practice) {
    const allowed = TARIFFS[p.command];
    check(!!allowed, `"${p.command}" is not in Appendix 6`);
    if (allowed) check(allowed.includes(p.marks), `${p.command} (${p.marks}) against Appendix 6's ${allowed.join(' or ')}`);
    const paras = String(p.guidance || '').split('\n').filter((x) => x.trim());
    check(paras.length >= 2, `${p.command}: one guidance paragraph, so guided mode prints the whole mark scheme over the empty box`);
    check(!/\(\s*\d+\s*marks?\s*\)/i.test(paras[0] || ''), `${p.command}: the opening allocates marks`);
    check(!/\$[\d,]/.test(paras[0] || ''), `${p.command}: the opening carries a figure`);
    if (p.marks > 6) check(!/\(\s*\d+\s*marks?\s*\)/i.test(p.guidance), `${p.command} (${p.marks}): levels-marked tariffs may not allocate points`);
  }
  for (const cmd of Object.keys(TARIFFS)) check(practice.some((p) => p.command === cmd), `no practice item uses ${cmd}`);
}

/* ══ 6 · RECALLS, ON THE SERVED DRAFT ═════════════════════════════════════ */
{
  const subs = (rows.section_content?.draft || []).flatMap((b) => b.sections || []);
  check(subs.length === 23, `${subs.length} subsections in the draft`);
  check(subs.every((s) => s.recall), 'a subsection in the draft carries no recall');
  for (const s of subs) {
    const r = s.recall; const where = String(s.id).split(':').pop();
    check(!('shuffled' in r), `${where}: the draft recall carries \`shuffled\``);
    if (r.type === 'fillin') {
      const blanks = r.template.join(' ').split('___').length - 1;
      check(blanks === r.answers.length, `${where}: ${blanks} blanks against ${r.answers.length} answers in the draft`);
      check(r.distractors?.length >= 2 && r.distractors?.length <= 3, `${where}: ${r.distractors?.length} distractors in the draft`);
      r.answers.forEach((a, i) => {
        const h = String(r.hints[i] || '');
        check(!(String(a).length >= 3 && h.toLowerCase().startsWith(String(a).toLowerCase().slice(0, 3))), `${where}: draft hint "${h}" is a prefix of "${a}"`);
        check(!(String(a).length > 3 && r.template.join(' ').toLowerCase().includes(String(a).toLowerCase())), `${where}: the draft prints the answer "${a}" in its own template`);
      });
    }
    if (r.type === 'classify') {
      check((r.groups || []).every((g) => String(g.why ?? '').trim()), `${where}: a draft classify group has no \`why\``);
      check(!('why' in r), `${where}: the draft classify carries a recall-level \`why\`, which nothing reads`);
    }
    if (r.type === 'reorder') check(!!r.criterion, `${where}: the draft reorder names no ordering principle`);
    if (r.type === 'match') check((r.pairs || []).every((p) => p.why), `${where}: a draft match pair has no \`why\``);
  }
}

/* ══ 7 · QUIZ, ON THE WHOLE DRAFT BANK ════════════════════════════════════ */
{
  const quiz = rows.section_quiz?.draft || [];
  check(quiz.length === 32, `${quiz.length} quiz items in the draft bank`);
  const hist = [0, 0, 0, 0];
  for (const q of quiz) {
    hist[q.correctIndex] += 1;
    const correct = q.options[q.correctIndex];
    const longest = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map((o) => o.length));
    check(correct.length <= 1.5 * longest, `the draft key is ${correct.length} chars against ${longest}: "${q.question.slice(0, 44)}"`);
    check(!/\(\s*[A-D]\s*\)|option\s+[A-D]\b/.test(q.explanation), `a draft explanation names an option by letter: "${q.question.slice(0, 44)}"`);
    const stripped = q.explanation.replace(/\b(first|second|third|fourth|fifth|last|final)\s+(round|step|stage|chapter|year|period|line|leg|time)s?\b/gi, ' ').replace(/\bthan the last\b/gi, ' ');
    check(!/\b(first|second|third|fourth|fifth|last|final|former|latter|top|bottom)\b/i.test(stripped), `a draft explanation names a position: "${q.question.slice(0, 44)}"`);
  }
  const share = hist.map((n) => (n / quiz.length) * 100);
  check(share.every((p) => p >= 10 && p <= 40), `the draft histogram is ${share.map((p) => `${Math.round(p)}%`).join('/')}`);
}

/* ══ 8 · THE STAGED BUNDLE MATCHES THE FILE THE PACKET DUMPED ═════════════ */
{
  /*
   * The last thing, and the one DECISIONS 16 September is actually about: the dumped bundle and
   * the served draft must agree FIELD BY FIELD, not by `JSON.stringify` equality — a jsonb round
   * trip does not preserve key order (packet 31).
   */
  const dumped = JSON.parse(readFileSync('audit/snapshots/packet-37-bundle__economics__national-income.json', 'utf8')).tables;
  const KEY = { section_content: 'content', section_notes: 'notes', section_quiz: 'quiz', section_practice: 'practice', section_flashcards: 'flashcards', section_diagrams: 'diagrams', section_extras: 'extras', section_common_mistakes: 'mistakes' };
  const sorted = (v) => (Array.isArray(v) ? v.map(sorted) : (v && typeof v === 'object' ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, sorted(v[k])])) : v));
  for (const [table, key] of Object.entries(KEY)) {
    const a = sorted(dumped[key]); const b = sorted(rows[table]?.draft);
    check(JSON.stringify(a) === JSON.stringify(b), `${table}: the served draft does not match the dumped bundle field for field`);
  }
}

/* ── report ────────────────────────────────────────────────────────────────── */
console.log(`packet 37 — ${checks} checks against the SERVED draft at ${BASE}`);
if (fails.length) {
  console.error(`\n${fails.length} failed:`);
  for (const f of fails) console.error(`  - ${f}`);
  process.exit(1);
}
console.log('  data untouched on all eight tables · the arithmetic re-derived from the served characters');
console.log('  · the sign property read off the served diagram · Appendix 6 parsed out of the specification');
console.log('  · the served draft matches the dumped bundle field for field');
console.log('all clear');
