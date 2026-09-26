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
 *        non-empty `stimulus`, and part letters are unique. A page that opts in (any item carries
 *        `paper`) and has NO data-question part fails too: absence is not a pass (fix round 1).
 *   R11  short answers are exactly the paper's `parts` × `marksEach`, and only on a page whose paper
 *        has a short-answer section (Economics Units 1-2); an opted-in page on such a paper with none
 *        fails
 *   R12  essays on a page number exactly the paper's `offered`; none, on an opted-in page, fails
 *   R13  STRUCTURAL (close-out, 26 Sep). The data-response page renders a bank-backed file's
 *        Questions FROM THE BANK (`app/data-response/[slug]/page.jsx`), so the questions have one
 *        source. R13 holds the rest of `content/data-response/<stimulus>.md` to it, parsed with the
 *        page's own markdown parser: (a) no `## Questions` of its own; (b) one H1 and H2s from
 *        ALLOWED_H2 only, each once, and no sub-heading outside `## Model Answers`; (c) the
 *        `## Model Answers` headings are exactly `### Question (x) (n marks)` for the bank's
 *        parts, same letters, tariffs and order. A stimulus claimed by two pages is a finding, and
 *        from the file side a data-response file lettered `Question (x)` that no opted-in page
 *        claims is one too. Free prose inside the allowed sections is NOT scanned (stated residual).
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

import { MODEL_ANSWERS } from '../../data/modelAnswersData.js';
import { tariffsFor } from '../../lib/practice-tariffs.js';
import { paperFor, paperSection, sectionOfKind, commandWordsFor } from '../../lib/ial-paper.js';
// The page's markdown pipeline (react-markdown runs unified + remark-parse + remarkPlugins): R13 reads
// the outline the page renders, not a regex over the text.
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
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
  // Fix round 2 (E057, rule 4): the shell states the tariff from `marks`; a tariff inside the question
  // or the context it renders is a second task on the page, the bank-side twin of the md scan.
  for (const [field, text] of [['question', item.question], ['paper.context', pp.context]]) {
    const hit = stripTags(text).match(new RegExp(TARIFF_RE.source, 'i'));
    if (hit) push('R9', `${field} states a tariff "${hit[0]}"; the shell prints the tariff from marks, so this reads as a second task`);
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

/*
 * R9's bank-side twin (fix round 2): a tariff stated inside a paper item's `question` or
 * `paper.context`, which the shell renders beside the tariff it prints from `marks`. A tariff is a
 * number (digits or a number word) followed by mark/marks, with or without a hyphen, or a bare one-
 * or two-digit number in parentheses or brackets (the printed-paper form).
 */
const NUMBER_WORDS = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty-five|twenty|thirty|forty|fifty';
export const TARIFF_RE = new RegExp(`\\b(?:\\d+|${NUMBER_WORDS})\\s*[-\u2010-\u2014]?\\s*marks?\\b|[(\\[]\\s*\\d{1,2}\\s*[)\\]]`, 'gi');

/**
 * Remove HTML tags without eating text (close-out, E057). A tag starts `<` + a letter, `/` or `!`
 * and never crosses a line or another `<`, so prose such as "(0 < |PED| < 1)" is text, as the
 * renderer treats it. The old `/<[^>]*>/` ran from a prose `<` to the next `>` anywhere, even lines
 * later, and blanked what lay between.
 */
export const stripTags = (s) => String(s || '').replace(/<[A-Za-z\/!][^<>\n]*>/g, '');

/*
 * R13, STRUCTURAL (packet 12.8, E057 close-out). Rounds 1 and 2 tried to detect, by regex over
 * flattened text, every way a sixth task could be written anywhere in the file ("(20 marks)",
 * "[Marks: 20]", a table row...). That is an unbounded arms race, and not the class. The class is
 * "the data-response page can state questions the bank does not", and it is closed by SINGLE
 * SOURCE: `app/data-response/[slug]/page.jsx` renders the Questions section of a bank-backed file
 * from the bank's data-question items. What is left for the validator is the file's STRUCTURE,
 * read with the markdown parser the page renders with (unified + remark-parse + remark-gfm, the
 * pipeline react-markdown runs), so a heading here is exactly a heading on the page:
 *   (a) a bank-backed file has no `## Questions` of its own;
 *   (b) its outline is one H1 title and H2s from ALLOWED_H2 only, each at most once; any other H2,
 *       or any H3+ outside `## Model Answers`, is a finding;
 *   (c) the headings under `## Model Answers` are exactly `### Question (x) (n marks)` for the
 *       bank's parts: same letters, same tariffs, same order, none missing, no extras, nothing
 *       deeper than H3.
 * STATED RESIDUAL: free prose inside the allowed sections (the stimulus, model-answer bodies,
 * Common Mistakes, Diagram Reference) is not scanned for extra tasks. Whether a paragraph reads as a
 * task is a semantic question for review, not a validator rule.
 */

/** The H2 sections a bank-backed data-response file may carry (read from the file, 26 Sep 2026). */
export const ALLOWED_H2 = ['Stimulus', 'Model Answers', 'Common Mistakes', 'Diagram Reference'];
const QUESTION_HEAD = /^Question \(([a-z])\) \((\d+) marks?\)$/;

const textOf = (node) => (typeof node.value === 'string' ? node.value : (node.children || []).map(textOf).join(''));

/** Every heading of a markdown file, as the page's parser sees it: `{ depth, text, line }`, in order. */
export function mdOutline(markdown) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(String(markdown || ''));
  const out = [];
  const visit = (node) => {
    if (node.type === 'heading') {
      out.push({ depth: node.depth, text: textOf(node).replace(/\s+/g, ' ').trim(), line: node.position ? node.position.start.line : null });
      return;
    }
    (node.children || []).forEach(visit);
  };
  visit(tree);
  return out;
}

/** The sub-headings inside every `## Model Answers` section, with their H2 context. */
function modelAnswerHeads(outline) {
  const out = [];
  let inAnswers = false;
  for (const h of outline) {
    if (h.depth <= 2) { inAnswers = h.depth === 2 && h.text === 'Model Answers'; continue; }
    if (inAnswers) out.push(h);
  }
  return out;
}

/** True when a file's outline letters its questions to the paper layout (a `Question (x)` heading). */
const letteredOutline = (outline) => outline.some((h) => h.depth >= 2 && /^Question \([a-z]\)/.test(h.text));

/**
 * R13 on one bank-backed file. `parts` are the page's data-question items. Returns nothing; `say`
 * pushes one finding per defect, naming the line.
 */
export function r13(md, file, parts, say) {
  const outline = mdOutline(md);
  const at = (h) => `${file}:${h.line}`;

  // (a) and (b): the outline outside Model Answers.
  const h1 = outline.filter((h) => h.depth === 1);
  if (h1.length > 1) for (const h of h1.slice(1)) say(`(b) ${at(h)} has a second H1 "# ${h.text}"; the file has one title`);
  const seenH2 = new Map();
  let inAnswers = false;
  for (const h of outline) {
    if (h.depth === 2) {
      inAnswers = h.text === 'Model Answers';
      if (/^questions?$/i.test(h.text)) {
        say(`(a) ${at(h)} carries its own "## ${h.text}"; the page renders the questions from the bank's data-question items, so the file must not state them`);
      } else if (!ALLOWED_H2.includes(h.text)) {
        say(`(b) ${at(h)} has H2 "## ${h.text}", which is not one of ${ALLOWED_H2.map((t) => `"${t}"`).join(', ')}; the page renders every section as part of the question paper`);
      } else if (seenH2.has(h.text)) {
        say(`(b) ${at(h)} repeats "## ${h.text}" (first at line ${seenH2.get(h.text)})`);
      }
      if (!seenH2.has(h.text)) seenH2.set(h.text, h.line);
    } else if (h.depth >= 3 && !inAnswers) {
      say(`(b) ${at(h)} has a sub-heading "${'#'.repeat(h.depth)} ${h.text}" outside "## Model Answers"; only the model answers are headed below H2`);
    }
  }

  // (c): the model-answer headings are exactly the bank's parts, in part order.
  const want = [...parts].sort((x, y) => String(x.paper.part).localeCompare(String(y.paper.part)))
    .map((i) => ({ part: i.paper.part, marks: Number(i.marks), id: i.id }));
  const got = [];
  for (const h of modelAnswerHeads(outline)) {
    const m = h.depth === 3 ? h.text.match(QUESTION_HEAD) : null;
    if (!m) { say(`(c) ${at(h)} "${'#'.repeat(h.depth)} ${h.text}" under "## Model Answers" is not "### Question (x) (n marks)" for a bank part`); continue; }
    got.push({ part: m[1], marks: Number(m[2]), line: h.line });
  }
  const wantBy = new Map(want.map((w) => [w.part, w]));
  const gotParts = got.map((g) => g.part);
  for (const w of want) {
    if (!gotParts.includes(w.part)) say(`(c) ${file} "## Model Answers" has no "### Question (${w.part}) (${w.marks} marks)" for ${w.id}`);
  }
  gotParts.forEach((p, n) => {
    const g = got[n];
    if (gotParts.indexOf(p) !== n) { say(`(c) ${file}:${g.line} heads Question (${p}) a second time`); return; }
    const w = wantBy.get(p);
    if (!w) { say(`(c) ${file}:${g.line} heads Question (${p}) (${g.marks} marks), which no bank data-question item carries`); return; }
    if (w.marks !== g.marks) say(`(c) ${file}:${g.line} heads Question (${p}) at ${g.marks} marks; the bank's ${w.id} is ${w.marks}`);
  });
  const common = gotParts.filter((p, n) => wantBy.has(p) && gotParts.indexOf(p) === n);
  const order = want.map((w) => w.part).filter((p) => common.includes(p));
  if (common.join() !== order.join()) say(`(c) ${file} "## Model Answers" heads the parts in the order ${common.join(', ')}; the bank's order is ${order.join(', ')}`);
}

/**
 * R10-R12 on the pages that carry any `paper` item, R13 on the file each page's data question
 * names, then R13 from the other side. `readMd` and `listMd` are injectable for a test; a test
 * that injects `readMd` and not `listMd` lists nothing.
 *
 * FIX ROUND 1 (E057), kept. Once a page opts in (any item carries `paper`), every section of its
 * paper that the shell teaches — data question, short answers, essays; not Section A, which is a
 * link to the quiz, and not Business's `source_set`, reserved for its rollout — must be on the
 * page: absence is a finding. A page stripped of EVERY `paper` field is found from the file side:
 * a data-response file whose outline letters its questions `Question (x)` is a paper layout, and
 * the last block asks which page claims it (the page would otherwise render it with no questions).
 * CLOSE-OUT: the page renders ALL bank data-question items naming a stimulus, whichever page they
 * sit on, so one stimulus claimed by two pages is a finding too.
 */
export function checkPages(items = MODEL_ANSWERS, opts = {}) {
  const injected = typeof opts.readMd === 'function';
  const readMd = injected ? opts.readMd : (slug) => fs.readFileSync(path.join(STIMULUS_DIR, `${slug}.md`), 'utf8');
  const listMd = typeof opts.listMd === 'function' ? opts.listMd : () => (injected ? [] : [...stimulusBasenames()]);
  const out = [];
  const claimed = new Map(); // stimulus -> the pages whose paper-shaped data question names it
  for (const [, pageItems] of pagesOf(items)) {
    const shaped = pageItems.filter((i) => i.paper && typeof i.paper === 'object');
    if (!shaped.length) continue;
    const { subject, unit } = shaped[0];
    const page = `${subject} ${shaped[0].sectionNumber}`;
    const push = (rule, detail) => out.push({ rule, id: page, subject, detail });
    const paper = paperFor(subject, unit);
    if (!paper) continue; // R9 has already said so, per item
    const papers = paper.papers.join('/');

    // R10 — the data question. Required on an opted-in page whose paper has one.
    const parts = shaped.filter((i) => i.paper.kind === 'data_question');
    const dq = sectionOfKind(subject, unit, 'data_question');
    if (dq && !parts.length) {
      push('R10', `the page carries \`paper\` but no data-question part; ${papers} section ${dq.id} is ${sortedNums(dq.tariffs)}`);
    }
    if (parts.length && dq) {
      if (sortedNums(parts.map((i) => i.marks)) !== sortedNums(dq.tariffs)) {
        push('R10', `data-question tariffs are ${sortedNums(parts.map((i) => i.marks))}; ${papers} is ${sortedNums(dq.tariffs)}`);
      }
      const stimuli = [...new Set(parts.map((i) => i.stimulus || ''))];
      if (stimuli.length !== 1 || !stimuli[0]) {
        push('R10', `data-question parts must share one stimulus; they carry ${JSON.stringify(stimuli)}`);
      }
      const letters = parts.map((i) => i.paper.part);
      const dupes = letters.filter((l, n) => letters.indexOf(l) !== n);
      if (dupes.length) push('R10', `part letter(s) ${[...new Set(dupes)].join(', ')} used more than once`);
      for (const s of stimuli) if (s) claimed.set(s, [...(claimed.get(s) || []), page]);

      // R13 — the data-response file's structure against the bank.
      if (stimuli.length === 1 && stimuli[0]) {
        let md = null;
        try { md = readMd(stimuli[0]); } catch { /* R6 reports a missing file */ }
        if (md !== null) r13(md, `${stimuli[0]}.md`, parts, (detail) => push('R13', detail));
      }
    }

    // R11 — short answers. Required on an opted-in page whose paper has a short-answer section.
    const shorts = shaped.filter((i) => i.paper.kind === 'short_answer');
    const sa = sectionOfKind(subject, unit, 'short_answer');
    if (shorts.length && !sa) {
      push('R11', `${shorts.length} short answer(s) on a page whose paper (${papers}) has no short-answer section`);
    } else if (sa && (shorts.length !== sa.parts || shorts.some((i) => Number(i.marks) !== sa.marksEach))) {
      push('R11', `short answers are ${shorts.map((i) => i.marks).join(' + ') || 'none'}; ${papers} sets ${sa.parts} × ${sa.marksEach}`);
    }

    // R12 — essays offered. Required on an opted-in page whose paper has an essay section.
    const essays = shaped.filter((i) => i.paper.kind === 'essay');
    const es = sectionOfKind(subject, unit, 'essay');
    if (essays.length && !es) {
      push('R12', `${essays.length} essay(s) on a page whose paper (${papers}) has no essay section`);
    } else if (es && essays.length !== es.offered) {
      push('R12', `${essays.length} essay(s) offered; ${papers} offers ${es.offered}`);
    }
  }

  for (const [slug, pages] of claimed) {
    if (pages.length > 1) out.push({ rule: 'R13', id: `${slug}.md`, subject: null, detail: `${slug}.md is the data question of ${pages.length} pages (${pages.join(', ')}); the data-response page would render all their parts as one question` });
  }

  // R13 from the file side — a lettered data-response file that no paper-shaped page claims.
  for (const slug of listMd()) {
    if (claimed.has(slug)) continue;
    let md = null;
    try { md = readMd(slug); } catch { continue; }
    if (!letteredOutline(mdOutline(md))) continue; // a numbered file is an unconverted page, the same opt-out as R1-R8
    const users = items.filter((i) => i.stimulus === slug);
    const where = users.length ? `; bank items naming it: ${[...new Set(users.map((i) => `${i.subject} ${i.sectionNumber}`))].join(', ')}, none with paper.kind data_question` : '; no bank item names it';
    out.push({ rule: 'R13', id: `${slug}.md`, subject: users[0] ? users[0].subject : null, detail: `${slug}.md letters its questions to the paper layout, but no page's data question claims it, so its page renders no questions${where}` });
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
