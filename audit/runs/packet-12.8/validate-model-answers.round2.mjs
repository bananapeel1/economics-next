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
 *   R13  content/data-response/<stimulus>.md states the same questions as the bank's data-question
 *        parts: the same part letters, the same tariffs, the same wording, and no others. "No
 *        others" is enforced three ways (fix round 1): `## Questions` holds question lines and blank
 *        lines only, any other line is named; the `## Model Answers` headings carry the same parts
 *        and tariffs; and a whole-file token scan names any `Question (x)` / `Question N` that is not
 *        a bank part. From the file side, a data-response file lettered (a)-(e) that no opted-in
 *        page's data question claims is a finding, so stripping every `paper` field off a page does
 *        not take it out of the check.
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
    const hit = String(text || '').replace(/<[^>]*>/g, '').match(new RegExp(TARIFF_RE.source, 'i'));
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

/** The bodies of every `## <title>` section of a markdown file, in file order. */
function mdSections(markdown, title) {
  const lines = String(markdown || '').split('\n');
  const out = [];
  let cur = null;
  for (const line of lines) {
    if (/^## /.test(line)) {
      cur = new RegExp(`^## ${title}\\s*$`).test(line) ? [] : null;
      if (cur) out.push(cur);
      continue;
    }
    if (cur) cur.push(line);
  }
  return out;
}

/**
 * The `## Questions` of a data-response file, as `{ part, marks, text }`. A question line reads
 * `**Question (a) (2 marks)** — Define the term …`. Lines in the old numbered form
 * (`**Question 1 (2 marks)**`) are returned with `part: null`, so a file that has not been rewritten
 * to the paper's part letters fails R13 by name rather than parsing as empty.
 *
 * STRICT, NOT PERMISSIVE (fix round 1, E057). The section may hold question lines and blank lines
 * and nothing else. Every other non-blank line — a sixth part `(f)`, a heading-style `### Question`,
 * a question split over two lines, a numbered list — comes back as `{ unparsed: true, text }` and
 * R13 names it. The first version skipped any line it could not read, so an extra question in a
 * shape the regex did not expect was invisible to "no other questions" (verifier, round 1). Every
 * `## Questions` section in the file is read, not just the first.
 */
export function mdQuestions(markdown) {
  const out = [];
  for (const section of mdSections(markdown, 'Questions')) {
    for (const line of section) {
      if (!line.trim()) continue;
      const m = line.match(/^\*\*Question (?:\(([a-z])\)|(\d+)) \((\d+) marks?\)\*\*\s*[—-]\s*(\S.*)$/);
      if (m) out.push({ part: m[1] || null, marks: Number(m[3]), text: m[4].trim() });
      else out.push({ part: null, marks: null, text: line.trim(), unparsed: true });
    }
  }
  return out;
}

/** How many `## Questions` sections a file has. More than one is a second question list. */
export const mdQuestionSectionCount = (markdown) => mdSections(markdown, 'Questions').length;

/**
 * The `### Question (x) (n marks)` headings of `## Model Answers`, as `{ part, marks }`; any other
 * non-blank `#` heading in that section comes back `{ unparsed: true, text }`. The model answers
 * state a tariff per part too, so they are a second place a sixth part or a drifted tariff can live.
 */
export function mdAnswerHeadings(markdown) {
  const out = [];
  for (const section of mdSections(markdown, 'Model Answers')) {
    for (const line of section) {
      if (!/^#/.test(line)) continue;
      const m = line.match(/^### Question \(([a-z])\) \((\d+) marks?\)\s*$/);
      if (m) out.push({ part: m[1], marks: Number(m[2]) });
      else out.push({ part: null, marks: null, text: line.trim(), unparsed: true });
    }
  }
  return out;
}

/**
 * Every mention of a question ANYWHERE in the file, located by a different method from the two
 * parsers above: a token scan of the whole text, not a line grammar inside a named section. Returns
 * the lettered parts (`Question (f)`, `Question(f)`, `question (f)`) and numbered ones (`Question 6`)
 * with their line numbers. A sixth question under any heading, in any shape that still calls itself a
 * question, is in here even when both line parsers miss it.
 */
export function mdQuestionMentions(markdown) {
  const out = [];
  String(markdown || '').split('\n').forEach((line, n) => {
    for (const m of line.matchAll(/\bquestions?\s*(?:\(\s*([a-z])\s*\)|(\d+)\b)/gi)) {
      out.push({ line: n + 1, part: m[1] ? m[1].toLowerCase() : null, number: m[2] ? Number(m[2]) : null });
    }
  });
  return out;
}

/*
 * FIX ROUND 2 (E057). `mdQuestionMentions` keys on the word "question", so a sixth task that never
 * says it — `**Extension (20 marks):** …`, `| (f) 20 marks |`, `**(f) (20 marks)** — …` under a
 * `## Extension task` heading — passed, while the page renders the whole file. The class is a TARIFF
 * or a PART LABEL the bank does not own, stated anywhere in the file. So the scan below keys on
 * neither the word "question" nor any heading:
 *   - a tariff is a number (digits, or a number word) followed by mark/marks, with or without a
 *     hyphen or parentheses (`(20 marks)`, `20 marks`, `20-mark`, `(twenty marks)`), or a bare
 *     one- or two-digit number in parentheses or brackets (`(20)`, `[20]`, the printed-paper form);
 *   - a part label is a parenthesised single letter or roman numeral (`(f)`, `(ii)`).
 * The ONLY places a tariff may be stated are the `**Question (x) (n marks)**` prefix of each of the
 * bank's question lines and each `### Question (x) (n marks)` heading of `## Model Answers` for a
 * bank part; those spans are blanked before the scan and nothing else is. Any tariff elsewhere —
 * including prose after a question line's prefix, an examiner note, a table, the stimulus — is a
 * finding, and so is any part label that is not one of the bank's letters. Consequence for authors:
 * prose names a part by its letter ("in (d)"), never by its tariff ("the 8-mark part").
 * Markup is flattened first (`*`, `_`, backticks, tags, `&#40;`-style entities) so `**20** marks`
 * and a tariff split over a line break are still one token; line numbers are kept.
 */
const NUMBER_WORDS = 'one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty-five|twenty|thirty|forty|fifty';
export const TARIFF_RE = new RegExp(`\\b(?:\\d+|${NUMBER_WORDS})\\s*[-\u2010-\u2014]?\\s*marks?\\b|[(\\[]\\s*\\d{1,2}\\s*[)\\]]`, 'gi');
const PART_RE = /\(\s*([a-z]|[ivx]{2,4})\s*\)/gi;

/** Flatten markdown/HTML presentation without moving any newline, so offsets map to the same lines. */
function flattenKeepingLines(text) {
  return String(text || '')
    .replace(/<[^>]*>/g, (t) => t.replace(/[^\n]/g, ''))
    .replace(/&#0*40;|&lpar;/gi, '(').replace(/&#0*41;|&rpar;/gi, ')')
    .replace(/&#0*91;|&lsqb;|&lbrack;/gi, '[').replace(/&#0*93;|&rsqb;|&rbrack;/gi, ']')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/[*_`]/g, '');
}

/**
 * Every tariff and every part label in the file that is not in one of the bank's own ten slots
 * (five question-line prefixes, five model-answer headings). `bankParts` is the set of the page's
 * data-question letters. Returns `{ line, kind: 'tariff' | 'part', token }`.
 */
export function mdStrayTariffs(markdown, bankParts) {
  const bank = new Set(bankParts);
  const lines = String(markdown || '').split('\n');
  let where = null; // 'q' inside ## Questions, 'a' inside ## Model Answers
  const kept = lines.map((line) => {
    if (/^## /.test(line)) {
      where = /^## Questions\s*$/.test(line) ? 'q' : /^## Model Answers\s*$/.test(line) ? 'a' : null;
      return line;
    }
    if (where === 'q') {
      const m = line.match(/^\*\*Question \(([a-z])\) \(\d+ marks?\)\*\*/);
      if (m && bank.has(m[1])) return ' '.repeat(m[0].length) + line.slice(m[0].length);
    }
    if (where === 'a') {
      const m = line.match(/^### Question \(([a-z])\) \(\d+ marks?\)\s*$/);
      if (m && bank.has(m[1])) return '';
    }
    return line;
  }).join('\n');
  const flat = flattenKeepingLines(kept);
  const lineAt = (i) => flat.slice(0, i).split('\n').length;
  const out = [];
  for (const m of flat.matchAll(TARIFF_RE)) out.push({ line: lineAt(m.index), kind: 'tariff', token: m[0].replace(/\s+/g, ' ') });
  for (const m of flat.matchAll(PART_RE)) {
    if (!bank.has(m[1].toLowerCase())) out.push({ line: lineAt(m.index), kind: 'part', token: m[0] });
  }
  return out.sort((x, y) => x.line - y.line);
}

/** Question wording, compared: markup, quote marks and whitespace are presentation, words are not. */
export const sameWords = (s) => String(s || '')
  .replace(/<[^>]+>/g, '')
  .replace(/\*\*|\*/g, '')
  .replace(/[‘’'“”"]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

/**
 * R10-R13 on the pages that carry any `paper` item, then R13 from the other side: every
 * data-response file lettered to the paper must be some page's data question. `readMd` and `listMd`
 * are injectable for a test; a test that injects `readMd` and not `listMd` lists nothing.
 *
 * FIX ROUND 1 (E057). Two holes the verifier found are closed here:
 *   - R10, R11 and R12 ran only when a page had at least one item of that kind, so a page stripped of
 *     all its data-question (or short-answer, or essay) `paper` fields passed. Once a page opts in
 *     (any item carries `paper`), every section of its paper that the shell teaches — data question,
 *     short answers, essays; not Section A, which is a link to the quiz, and not Business's
 *     `source_set`, reserved for its rollout — must be on the page. Absence is a finding.
 *   - A page stripped of EVERY `paper` field was not a paper page any more, so nothing looked at it.
 *     Its data-response file still says it is: a file whose questions are lettered (a)-(e) is a paper
 *     layout, and the last block below finds it from the file side and asks which page claims it.
 */
export function checkPages(items = MODEL_ANSWERS, opts = {}) {
  const injected = typeof opts.readMd === 'function';
  const readMd = injected ? opts.readMd : (slug) => fs.readFileSync(path.join(STIMULUS_DIR, `${slug}.md`), 'utf8');
  const listMd = typeof opts.listMd === 'function' ? opts.listMd : () => (injected ? [] : [...stimulusBasenames()]);
  const out = [];
  const claimed = new Set(); // stimuli that some page's paper-shaped data question names
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
      for (const s of stimuli) if (s) claimed.add(s);

      // R13 — the data-response file says the same thing, and nothing more.
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

  // R13 from the file side — a lettered data-response file that no paper-shaped page claims.
  for (const slug of listMd()) {
    if (claimed.has(slug)) continue;
    let md = null;
    try { md = readMd(slug); } catch { continue; }
    const lettered = mdQuestions(md).some((q) => q.part) || mdAnswerHeadings(md).some((h) => h.part);
    if (!lettered) continue; // a numbered file is an unconverted page, the same opt-out as R1-R8
    const users = items.filter((i) => i.stimulus === slug);
    const where = users.length ? `; bank items naming it: ${[...new Set(users.map((i) => `${i.subject} ${i.sectionNumber}`))].join(', ')}, none with paper.kind data_question` : '; no bank item names it';
    out.push({ rule: 'R13', id: `${slug}.md`, subject: users[0] ? users[0].subject : null, detail: `${slug}.md letters its questions to the paper layout, but no page's data question claims it${where}` });
  }
  return out;
}

/** R13 on one data-response file against the bank's data-question parts. Returns nothing; `say` pushes. */
function r13(md, file, parts, say) {
  const qs = mdQuestions(md);
  const bank = new Map(parts.map((i) => [i.paper.part, i]));
  const sections = mdQuestionSectionCount(md);
  if (sections !== 1) say(`${file} has ${sections} "## Questions" sections; it must have exactly one`);
  for (const q of qs.filter((x) => x.unparsed)) {
    say(`${file} "## Questions" has a line that is not a question line in the paper form: "${q.text.slice(0, 120)}"`);
  }
  const numbered = qs.filter((q) => !q.part && !q.unparsed);
  if (numbered.length) {
    say(`${file} numbers its questions (${numbered.map((q) => `Question ${q.marks}m`).join(', ')}); the bank's parts are lettered`);
  }
  const lettered = qs.filter((q) => q.part);
  const seen = lettered.map((q) => q.part);
  const dupes = [...new Set(seen.filter((p, n) => seen.indexOf(p) !== n))];
  if (dupes.length) say(`${file} states Question (${dupes.join('), (')}) more than once`);
  const byPart = new Map(lettered.map((q) => [q.part, q]));
  for (const item of parts) {
    const q = byPart.get(item.paper.part);
    if (!q) { say(`${file} has no Question (${item.paper.part}) for ${item.id}`); continue; }
    if (q.marks !== Number(item.marks)) say(`Question (${item.paper.part}) is ${q.marks} marks in ${file}, ${item.marks} in the bank`);
    if (sameWords(q.text) !== sameWords(item.question)) say(`Question (${item.paper.part}) wording differs: md "${q.text}" / bank "${item.question}"`);
  }
  for (const q of lettered) {
    if (!bank.has(q.part)) say(`${file} has Question (${q.part}) (${q.marks} marks), which no bank item carries`);
  }

  // The model-answer headings state a tariff per part as well.
  const heads = mdAnswerHeadings(md);
  for (const h of heads.filter((x) => x.unparsed)) say(`${file} "## Model Answers" has a heading not in the form "### Question (x) (n marks)": "${h.text.slice(0, 120)}"`);
  const hs = heads.filter((h) => h.part);
  const hSeen = hs.map((h) => h.part);
  const hDupes = [...new Set(hSeen.filter((p, n) => hSeen.indexOf(p) !== n))];
  if (hDupes.length) say(`${file} "## Model Answers" heads Question (${hDupes.join('), (')}) more than once`);
  const hByPart = new Map(hs.map((h) => [h.part, h]));
  for (const item of parts) {
    const h = hByPart.get(item.paper.part);
    if (!h) say(`${file} "## Model Answers" has no "### Question (${item.paper.part})" for ${item.id}`);
    else if (h.marks !== Number(item.marks)) say(`${file} "## Model Answers" heads Question (${item.paper.part}) at ${h.marks} marks, ${item.marks} in the bank`);
  }
  for (const h of hs) if (!bank.has(h.part)) say(`${file} "## Model Answers" has Question (${h.part}) (${h.marks} marks), which no bank item carries`);

  // A third method (fix round 2): every tariff or part label outside the bank's own ten slots,
  // keyed on neither the word "question" nor any heading.
  for (const t of mdStrayTariffs(md, [...bank.keys()])) {
    say(t.kind === 'tariff'
      ? `${file} line ${t.line} states a tariff "${t.token}" outside the bank's question lines and model-answer headings; the page renders it as a task`
      : `${file} line ${t.line} labels a part ${t.token}, which is not one of the bank's parts (${[...bank.keys()].sort().join(', ')})`);
  }

  // A different method: every mention of a question anywhere in the file, by token, not by line grammar.
  const stray = mdQuestionMentions(md).filter((m) => (m.part ? !bank.has(m.part) : true));
  for (const m of stray) {
    say(`${file} line ${m.line} mentions ${m.part ? `Question (${m.part})` : `Question ${m.number}`}, which is not one of the bank's parts (${[...bank.keys()].sort().join(', ')})`);
  }
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
