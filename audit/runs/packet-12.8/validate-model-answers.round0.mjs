// FROZEN COPY of audit/scripts/validate-model-answers.mjs as it stood before E057 fix round 1, imports re-pointed. The A side of validator-ab.sh. Do not edit.
/**
 * The guard on the model-answer bank. Packet 12.6, E033.
 *
 * WHY THIS FILE EXISTS. `npm run validate` reads the Supabase-staged section bundles and has never
 * read `data/modelAnswersData.js` at all — `grep -c modelAnswers audit/scripts/validate-content.mjs`
 * returns 0. Sixty-six model answers, thirty-two public pages built from them, and nothing in the
 * tree could fail on any of it. Packet 12.6 adds a field shape to that bank (`criteria`, `script`,
 * `stimulus`, `minutes`), and a shape with no guard is a shape that drifts the moment a second
 * author touches it.
 *
 * WHAT IT CHECKS, AND WHAT IT DELIBERATELY DOES NOT.
 * Every rule below fires ONLY on an item that carries `criteria`. That is not leniency, it is the
 * flag: sixty-five answers still carry the old shape and must keep passing, and an item renders the
 * new way if and only if it has been retrofitted. Packet 12.8 retrofits the rest; the day it does,
 * these rules start firing on them with no change here.
 *
 *   R1  criteria[].marks sums to the item's marks
 *   R2  every criteria[].seg resolves to a script[].segments[].id ON THE SAME ITEM
 *   R3  script[].segments[].id is unique within the item
 *   R4  the item's marks is a legal IAL tariff FOR ITS SUBJECT
 *   R5  criteria and script travel together — neither alone
 *   R6  stimulus, when present, resolves to a real file in content/data-response/
 *   R7  every criteria[].segRole is the literal 'earned' or 'missed' (packet 12.7, E039)
 *   R8  keyTerm, when present, is a non-empty string and an EXACT substring of `question`
 *       (packet 12.75, E052). The practice shell sets the first occurrence of it in DM Serif
 *       Display italic; a keyTerm that is not in the stem would render nothing and say nothing,
 *       so the rule is what keeps the emphasis honest. `question` itself never changes for it.
 *
 * PACKET 12.8 (E057): THE PAPER SHAPE. Five more rules, firing ONLY on items that carry `paper`
 * (`{ section, kind, part?, context? }`), the same opt-in as R1-R8, so every page without it is
 * untouched. Every number they test against is read from `audit/raw/ial-paper-structure.json`
 * through `lib/ial-paper.js`; this file states none of them.
 *
 *   R9   an item's kind, tariff and command word are legal for its unit's paper: the section letter
 *        exists and is of that kind, a short answer or essay carries that section's `marksEach` and
 *        one of its `commandWords`, a data-question part carries one of the section's `tariffs`
 *        with a command word the file allows for it (`commandWordByTariff`) and a part letter a-e.
 *        A short answer or essay carries a non-empty `context`; a Draw item names a `diagram`
 *        whose file is in public/diagrams/.
 *   R10  a page's data question is exactly the paper's tariff multiset, every part shares one
 *        non-empty `stimulus`, and part letters are unique
 *   R11  short answers, when a page has any, are exactly the paper's `parts` × `marksEach`, and only
 *        on a page whose paper has a short-answer section (Economics Units 1-2)
 *   R12  essays on a page number exactly the paper's `offered`
 *   R13  content/data-response/<stimulus>.md states the same questions as the bank's data-question
 *        parts: the same part letters, the same tariffs, the same wording, and no others
 *
 * R4 READS `lib/ial-marking.js`, THROUGH `lib/practice-tariffs.js`. There is no tariff list in this
 * file and there must never be one. IAL Economics has no 10-mark question and IAL Business has no
 * 14-mark one; a second copy of that fact here would be a second thing to keep in step, and the
 * programme has already paid for one of those (`lib/practice-tariffs.js`'s own header).
 *
 * R6 CHECKS THAT THE FILE EXISTS AND NOTHING ELSE. Five of the six files in `content/data-response/`
 * carry a 10-mark question, which is not a legal IAL Economics tariff (packet 12.7 re-tariffed the
 * sixth, econ-u1-market-failure, to 20). Those five are packet 12.9's, they are known, and widening
 * this rule to reach them would fail the gate on defects this packet did not cause and is not allowed
 * to fix. See audit/specs/packet-12.6.md, "Explicitly out of scope".
 *
 * R7 REQUIRES THE FIELD, IT DOES NOT DEFAULT IT. The component reads an absent `segRole` as
 * 'earned', so a page never breaks on one; the validator refuses the absence anyway, because a
 * criterion whose role nobody decided is exactly how a missed mark would be rendered as an earned
 * one (DECISIONS 2026-09-22: "Do not collapse the two roles back into one link type").
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2). It reads two static ES modules and one directory listing.
 *
 * Exit 0 when clean, 1 when any rule fires. `--json` prints machine-readable findings instead.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { MODEL_ANSWERS } from '../../../data/modelAnswersData.js';
import { tariffsFor } from '../../../lib/practice-tariffs.js';
import { paperFor, paperSection, sectionOfKind, commandWordsFor } from '../../../lib/ial-paper.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');
const STIMULUS_DIR = path.join(ROOT, 'content', 'data-response');
const DIAGRAM_DIR = path.join(ROOT, 'public');
const JSON_OUT = process.argv.includes('--json');

/** Basenames of the stimulus files actually on disk, read once. A missing directory is not a crash. */
function stimulusBasenames() {
  try {
    return new Set(
      fs.readdirSync(STIMULUS_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => f.slice(0, -3)),
    );
  } catch {
    return new Set();
  }
}

/**
 * Every finding on one item. An item with no `criteria` and no `script` returns [] without
 * reading anything else — that is the sixty-five-answer path and it must stay free.
 */
export function checkItem(item, { stimuli }) {
  const out = [];
  const id = item.id || '(item with no id)';
  const push = (rule, detail) => out.push({ rule, id, subject: item.subject, detail });

  const hasCriteria = Array.isArray(item.criteria) && item.criteria.length > 0;
  const hasScript = Array.isArray(item.script) && item.script.length > 0;

  // R5 first: it is the only rule that can fire on an item without `criteria`, and it is the reason
  // half a shape cannot slip through by simply not carrying the half the other rules look at.
  if (hasCriteria !== hasScript) {
    push('R5', hasCriteria
      ? 'carries `criteria` but no `script` — a criterion with nowhere to point is not tickable'
      : 'carries `script` but no `criteria` — a segmented script with no marks against it renders as prose');
  }

  // R8 — runs on every item, not only the retrofitted ones: `keyTerm` is its own optional field.
  // Exact, case-sensitive substring. A near miss ("negative externalities" against a stem that says
  // "negative externality") is a finding, because the shell would silently emphasise nothing.
  if (item.keyTerm !== undefined) {
    if (typeof item.keyTerm !== 'string' || !item.keyTerm.trim()) {
      push('R8', `keyTerm is ${JSON.stringify(item.keyTerm)}; it must be a non-empty string`);
    } else if (!String(item.question || '').includes(item.keyTerm)) {
      push('R8', `keyTerm "${item.keyTerm}" is not an exact substring of the question`);
    }
  }

  // R9 — the item's place in its paper. Runs whether or not the item carries `criteria`: `paper` is
  // its own opt-in, and a paper-shaped item with no criteria would still sit in a paper section.
  if (item.paper !== undefined) out.push(...checkPaperItem(item, push));

  if (!hasCriteria) return out;

  // R3 before R2: the seg index is built from the segment ids, so a duplicate id must be reported
  // as a duplicate rather than silently making two criteria resolve to the same place.
  const segIds = [];
  for (const para of item.script || []) {
    for (const seg of para.segments || []) segIds.push(seg.id);
  }
  const seen = new Set();
  const dupes = new Set();
  for (const s of segIds) {
    if (seen.has(s)) dupes.add(s);
    seen.add(s);
  }
  for (const d of [...dupes].sort()) {
    push('R3', `segment id "${d}" appears ${segIds.filter((s) => s === d).length} times in this item's script`);
  }

  // R1 — the criteria are the tariff, broken up. If they are not, the running total the student
  // sees counts against a number the question does not carry.
  const sum = item.criteria.reduce((n, c) => n + (Number(c.marks) || 0), 0);
  if (sum !== Number(item.marks)) {
    push('R1', `criteria marks sum to ${sum}, item is ${item.marks} marks`);
  }

  // R2 — every criterion points somewhere real, on THIS item. Cross-item resolution is not a
  // near miss to be forgiven: it is how a copied block ends up ticking another question's script.
  for (const c of item.criteria) {
    if (!seen.has(c.seg)) {
      push('R2', `criterion ${c.id || '(no id)'} points at seg "${c.seg}", which is not a segment id on this item`);
    }
  }

  // R7 — every criterion says whether the script earned it at its segment or missed it there. An
  // exact-literal check: 'Missed', 'miss' or a boolean is a typo the renderer would read as earned.
  for (const c of item.criteria) {
    if (c.segRole !== 'earned' && c.segRole !== 'missed') {
      push('R7', `criterion ${c.id || '(no id)'} has segRole ${c.segRole === undefined ? '(absent)' : JSON.stringify(c.segRole)}; it must be 'earned' or 'missed'`);
    }
  }

  // R4 — the tariff itself. Read from lib/ial-marking.js via tariffsFor; never a list here.
  const legal = tariffsFor(item.subject);
  if (!legal.includes(Number(item.marks))) {
    push('R4', `${item.marks} marks is not a legal IAL ${item.subject} tariff (legal: ${legal.join(', ')})`);
  }

  // R6 — the extract is on disk, or the page renders a promise it cannot keep.
  if (item.stimulus != null && !stimuli.has(String(item.stimulus))) {
    push('R6', `stimulus "${item.stimulus}" has no file at content/data-response/${item.stimulus}.md`);
  }

  return out;
}

const PAPER_KINDS = ['short_answer', 'data_question', 'essay'];
const PARTS = ['a', 'b', 'c', 'd', 'e'];

/** R9 on one item. `push` is checkItem's, so the finding carries the item's id and subject. */
function checkPaperItem(item, push) {
  const pp = item.paper;
  if (!pp || typeof pp !== 'object') {
    push('R9', `paper is ${JSON.stringify(pp)}; it must be an object { section, kind, part?, context? }`);
    return [];
  }
  const paper = paperFor(item.subject, item.unit);
  if (!paper) {
    push('R9', `no paper layout in ial-paper-structure.json for ${item.subject} unit ${item.unit}`);
    return [];
  }
  if (!PAPER_KINDS.includes(pp.kind)) {
    push('R9', `paper.kind ${JSON.stringify(pp.kind)} is not one of ${PAPER_KINDS.join(' | ')}`);
    return [];
  }
  const section = paperSection(item.subject, item.unit, pp.section);
  if (!section) {
    push('R9', `paper.section ${JSON.stringify(pp.section)} is not a section of ${paper.papers.join('/')}`);
    return [];
  }
  if (section.kind !== pp.kind) {
    push('R9', `section ${pp.section} of ${paper.papers.join('/')} is ${section.kind}, not ${pp.kind}`);
    return [];
  }
  const marks = Number(item.marks);
  const allowed = commandWordsFor(section, marks);
  if (pp.kind === 'data_question') {
    if (!section.tariffs.includes(marks)) {
      push('R9', `${marks} marks is not a data-question tariff of ${paper.papers.join('/')} (${section.tariffs.join(', ')})`);
    }
    if (!PARTS.includes(pp.part)) push('R9', `a data-question part needs paper.part a-e, not ${JSON.stringify(pp.part)}`);
  } else {
    if (marks !== section.marksEach) {
      push('R9', `a ${pp.kind.replace('_', ' ')} in ${paper.papers.join('/')} is ${section.marksEach} marks, not ${marks}`);
    }
    if (typeof pp.context !== 'string' || !pp.context.trim()) {
      push('R9', `a ${pp.kind.replace('_', ' ')} opens with its own context; paper.context is missing or empty`);
    }
  }
  if (allowed && !allowed.includes(item.commandWord)) {
    push('R9', `${item.commandWord} is not a command word for ${marks} marks in section ${pp.section} (${allowed.join(', ') || 'none'})`);
  }
  if (item.commandWord === 'Draw') {
    const src = item.diagram && item.diagram.src;
    if (typeof src !== 'string' || !/^\/diagrams\/[a-z0-9-]+\.svg$/.test(src) || !fs.existsSync(path.join(DIAGRAM_DIR, src))) {
      push('R9', `a Draw item's model answer is a diagram; diagram.src ${JSON.stringify(src)} is not a file in public/diagrams/`);
    }
  }
  return [];
}

/** The pages of the bank: items grouped by subject and section number, in bank order. */
function pagesOf(items) {
  const pages = new Map();
  for (const item of items) {
    const key = `${item.subject}|${item.sectionNumber}`;
    if (!pages.has(key)) pages.set(key, []);
    pages.get(key).push(item);
  }
  return pages;
}

const sortedNums = (xs) => xs.map(Number).sort((a, b) => a - b).join(',');

/**
 * The `## Questions` of a data-response file, as `{ part, marks, text }`. A question line reads
 * `**Question (a) (2 marks)** — Define the term …`. Lines in the old numbered form
 * (`**Question 1 (2 marks)**`) are returned with `part: null`, so a file that has not been rewritten
 * to the paper's part letters fails R13 by name rather than parsing as empty.
 */
export function mdQuestions(markdown) {
  const body = String(markdown || '');
  const start = body.search(/^## Questions\s*$/m);
  if (start === -1) return [];
  const after = body.slice(start).replace(/^## Questions\s*\n/, '');
  const end = after.search(/^## /m);
  const section = end === -1 ? after : after.slice(0, end);
  const out = [];
  for (const line of section.split('\n')) {
    const m = line.match(/^\*\*Question (?:\(([a-e])\)|(\d+)) \((\d+) marks?\)\*\*\s*[—-]\s*(.+)$/);
    if (m) out.push({ part: m[1] || null, marks: Number(m[3]), text: m[4].trim() });
  }
  return out;
}

/** Question wording, compared: markup, quote marks and whitespace are presentation, words are not. */
export const sameWords = (s) => String(s || '')
  .replace(/<[^>]+>/g, '')
  .replace(/\*\*|\*/g, '')
  .replace(/[‘’'“”"]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

/** R10-R13 on the pages that carry any `paper` item. `readMd` is injectable for a test. */
export function checkPages(items = MODEL_ANSWERS, { readMd = (slug) => fs.readFileSync(path.join(STIMULUS_DIR, `${slug}.md`), 'utf8') } = {}) {
  const out = [];
  for (const [key, pageItems] of pagesOf(items)) {
    const shaped = pageItems.filter((i) => i.paper && typeof i.paper === 'object');
    if (!shaped.length) continue;
    const { subject, unit } = shaped[0];
    const page = `${subject} ${shaped[0].sectionNumber}`;
    const push = (rule, detail) => out.push({ rule, id: page, subject, detail });
    const paper = paperFor(subject, unit);
    if (!paper) continue; // R9 has already said so, per item

    // R10 — the data question.
    const parts = shaped.filter((i) => i.paper.kind === 'data_question');
    const dq = sectionOfKind(subject, unit, 'data_question');
    if (parts.length && dq) {
      if (sortedNums(parts.map((i) => i.marks)) !== sortedNums(dq.tariffs)) {
        push('R10', `data-question tariffs are ${sortedNums(parts.map((i) => i.marks))}; ${paper.papers.join('/')} is ${sortedNums(dq.tariffs)}`);
      }
      const stimuli = [...new Set(parts.map((i) => i.stimulus || ''))];
      if (stimuli.length !== 1 || !stimuli[0]) {
        push('R10', `data-question parts must share one stimulus; they carry ${JSON.stringify(stimuli)}`);
      }
      const letters = parts.map((i) => i.paper.part);
      const dupes = letters.filter((l, n) => letters.indexOf(l) !== n);
      if (dupes.length) push('R10', `part letter(s) ${[...new Set(dupes)].join(', ')} used more than once`);

      // R13 — the data-response file says the same thing.
      if (stimuli.length === 1 && stimuli[0]) {
        let md = null;
        try { md = readMd(stimuli[0]); } catch { /* R6 reports a missing file */ }
        if (md !== null) {
          const qs = mdQuestions(md);
          const byPart = new Map(qs.filter((q) => q.part).map((q) => [q.part, q]));
          if (qs.some((q) => !q.part)) {
            push('R13', `${stimuli[0]}.md numbers its questions (${qs.filter((q) => !q.part).map((q) => `Question ${q.marks}m`).join(', ')}); the bank's parts are lettered`);
          }
          for (const item of parts) {
            const q = byPart.get(item.paper.part);
            if (!q) { push('R13', `${stimuli[0]}.md has no Question (${item.paper.part}) for ${item.id}`); continue; }
            if (q.marks !== Number(item.marks)) push('R13', `Question (${item.paper.part}) is ${q.marks} marks in ${stimuli[0]}.md, ${item.marks} in the bank`);
            if (sameWords(q.text) !== sameWords(item.question)) push('R13', `Question (${item.paper.part}) wording differs: md "${q.text}" / bank "${item.question}"`);
          }
          const bankParts = new Set(parts.map((i) => i.paper.part));
          for (const q of qs) {
            if (q.part && !bankParts.has(q.part)) push('R13', `${stimuli[0]}.md has Question (${q.part}) (${q.marks} marks), which no bank item carries`);
          }
        }
      }
    }

    // R11 — short answers.
    const shorts = shaped.filter((i) => i.paper.kind === 'short_answer');
    if (shorts.length) {
      const sa = sectionOfKind(subject, unit, 'short_answer');
      if (!sa) {
        push('R11', `${shorts.length} short answer(s) on a page whose paper (${paper.papers.join('/')}) has no short-answer section`);
      } else if (shorts.length !== sa.parts || shorts.some((i) => Number(i.marks) !== sa.marksEach)) {
        push('R11', `short answers are ${shorts.map((i) => i.marks).join(' + ')}; ${paper.papers.join('/')} sets ${sa.parts} × ${sa.marksEach}`);
      }
    }

    // R12 — essays offered.
    const essays = shaped.filter((i) => i.paper.kind === 'essay');
    if (essays.length) {
      const es = sectionOfKind(subject, unit, 'essay');
      if (es && essays.length !== es.offered) {
        push('R12', `${essays.length} essay(s) offered; ${paper.papers.join('/')} offers ${es.offered}`);
      }
    }
  }
  return out;
}

/** Findings across the whole bank. Exported so a test can call it without spawning a process. */
export function checkBank(items = MODEL_ANSWERS, opts = {}) {
  const stimuli = stimulusBasenames();
  return [...items.flatMap((item) => checkItem(item, { stimuli })), ...checkPages(items, opts)];
}

const findings = checkBank();
const retrofitted = MODEL_ANSWERS.filter((a) => Array.isArray(a.criteria) && a.criteria.length > 0);

if (JSON_OUT) {
  console.log(JSON.stringify({
    items: MODEL_ANSWERS.length,
    retrofitted: retrofitted.length,
    findings,
  }, null, 1));
  process.exit(findings.length ? 1 : 0);
}

console.log(`model answers: ${MODEL_ANSWERS.length} in the bank, ${retrofitted.length} carrying the marked-script shape`);
for (const item of retrofitted) {
  const segs = (item.script || []).reduce((n, p) => n + (p.segments || []).length, 0);
  console.log(`  ${String(item.id).padEnd(44)} ${String(item.marks).padStart(2)} marks  ${String(item.criteria.length).padStart(2)} criteria  ${String(segs).padStart(2)} segments  ${item.stimulus || '(no stimulus)'}`);
}

if (!findings.length) {
  console.log('\n0 findings.');
  process.exit(0);
}

console.log(`\n${findings.length} finding${findings.length === 1 ? '' : 's'}:`);
for (const f of findings) console.log(`  ${f.rule}  ${String(f.id).padEnd(44)} ${f.detail}`);
process.exit(1);
