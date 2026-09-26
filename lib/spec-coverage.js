/**
 * Section spec-coverage — one implementation, two callers.
 *
 * Packet 12.2, E013. Until this file existed the only thing in the tree that could answer "how many
 * of this topic's spec leaves does a question examine?" was `audit/scripts/spec-coverage-check.mjs`,
 * and that is a CLI: `process.argv`, top-level `process.exit`, a printed table. A page cannot call
 * it, so a page that wanted the number had to restate the computation — and a restated computation
 * drifts. This module holds the computation; the CLI keeps the flags, the banks and the report.
 *
 * WHAT IT MEASURES, AND WHAT IT DOES NOT — the same distinction the CLI's header makes, restated
 * here because this is now the place a caller lands first:
 *
 *   - `validate-content.mjs`'s `spec.coverage` rule asks whether the TEACHING TEXT evidences a leaf.
 *   - `audit/raw/spec-coverage.json` is the March/packet-3 audit of that same teaching coverage.
 *   - THIS asks whether a QUESTION examines it. Only the third is the product's exam-practice claim,
 *     and the three numbers are different. Do not quote one as the other.
 *
 * THE DENOMINATOR is the count of `kind: 'leaf'` rows in `audit/raw/spec-items.json` for the
 * topic — 35 for Economics 1.3.5, 48 for 2.3.1 — not the requirement headers above them. The
 * 1,362-vs-1,073 reconciliation is already inside the oracle (`reconciliationNote`, 14 September)
 * and must not be re-done here.
 *
 * TAGGED vs UNTAGGED. `specItems` absent means "not tagged yet" and is counted as untagged, never as
 * a failure. `specItems: []` means "tagged, examines no leaf" and IS a failure — see
 * `lib/exam-item.js`. Collapsing the two would let an untagged bank read as a clean one.
 *
 * A TAG NAMING A LEAF IN ANOTHER TOPIC counts for nothing here (packet 12.4). It is a valid oracle
 * id, so the contract check passes it, but it is not one of the requirements this section is
 * measured against, and counting it would raise a percentage whose own list of examined
 * requirements could not explain it.
 *
 * NOTHING HERE OPENS A DATABASE CLIENT. It reads two JSON files off disk and nothing else, so it is
 * safe inside `next build` (rule 2) and inside CI. The oracle read is lazy and memoised: importing
 * this module costs nothing until something asks for a number.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isValidTariff } from './practice-tariffs.js';
import { practiceCommand } from './ial-commands.js';
import { contractProblems } from './exam-item.js';

/* ── Where the repository is ─────────────────────────────────────────────────────────────────── */

const ORACLE_REL = 'audit/raw/spec-items.json';
const SECTIONS_REL = 'audit/raw/spec-coverage.json';

const exists = (p) => {
  try { fs.accessSync(p); return true; } catch { return false; }
};

/**
 * The repository root, found by looking for the oracle rather than by assuming a layout.
 *
 * `import.meta.url` is right when this file is run from the tree (the CLI, `node --test`). It is not
 * reliable once a bundler has moved the module, which is what happens inside a Next.js server build,
 * so `process.cwd()` is tried second — Next runs with the project root as cwd. Returns null when
 * neither has the oracle, and every caller below degrades to "unavailable" rather than throwing: a
 * lab page that cannot read the oracle must say so, not 500.
 */
export function specCoverageRoot() {
  const candidates = [];
  try {
    candidates.push(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
  } catch { /* no import.meta.url under some bundlers */ }
  try {
    candidates.push(process.cwd());
  } catch { /* no cwd in an edge runtime */ }
  for (const root of candidates) {
    if (root && exists(path.join(root, ORACLE_REL))) return root;
  }
  return null;
}

/* ── The oracle ──────────────────────────────────────────────────────────────────────────────── */

let cachedOracle = null;

/**
 * `{ available, items, leaves, leafIds, allIds, leavesByTopic, wordingById }`.
 *
 * `leaves` is every `kind: 'leaf'` row, in oracle order. `leavesByTopic` is keyed
 * `'<subject>:<topic>'`, e.g. `'economics:1.3.5'`, and its arrays are the leaf-id universe a section
 * is measured against. Memoised: the file is half a megabyte and a page may ask twice per render.
 */
export function loadOracle() {
  if (cachedOracle) return cachedOracle;
  const root = specCoverageRoot();
  let items = [];
  let available = false;
  if (root) {
    try {
      items = JSON.parse(fs.readFileSync(path.join(root, ORACLE_REL), 'utf8')).items || [];
      available = true;
    } catch {
      items = [];
      available = false;
    }
  }
  const leaves = items.filter((r) => r.kind === 'leaf');
  const leavesByTopic = new Map();
  const wordingById = new Map();
  for (const row of items) wordingById.set(row.id, row.wording);
  for (const leaf of leaves) {
    const key = `${leaf.subject}:${leaf.topic}`;
    if (!leavesByTopic.has(key)) leavesByTopic.set(key, []);
    leavesByTopic.get(key).push(leaf.id);
  }
  cachedOracle = {
    available,
    items,
    leaves,
    leafIds: new Set(leaves.map((r) => r.id)),
    allIds: new Set(items.map((r) => r.id)),
    leavesByTopic,
    wordingById,
  };
  return cachedOracle;
}

/** The 43 sections the coverage audit knows about: `{ slug, subject, topic, title, unit }`. */
export function loadSections() {
  const root = specCoverageRoot();
  if (!root) return [];
  let coverage;
  try {
    coverage = JSON.parse(fs.readFileSync(path.join(root, SECTIONS_REL), 'utf8'));
  } catch {
    return [];
  }
  return (coverage.bySection || []).map((s) => {
    const [subject, slug] = s.key.split('__');
    return { slug, subject, topic: s.number, title: s.title, unit: Number(s.number.split('.')[0]) };
  });
}

/** The leaf ids for one `subject:topic`, in oracle order. `[]` when the topic is unknown. */
export function leafIdsForTopic(subject, topic) {
  return loadOracle().leavesByTopic.get(`${subject}:${topic}`) || [];
}

/** The spec wording behind an id, or `''`. The ids are the contract; the wording lives here. */
export function wordingFor(id) {
  return loadOracle().wordingById.get(id) || '';
}

/** `[{ id, wording }]` for a list of ids, for a caller that wants to render them. */
export function describeLeaves(ids) {
  return ids.map((id) => ({ id, wording: wordingFor(id) }));
}

/* ── Evaluative questions ────────────────────────────────────────────────────────────────────── */

/**
 * Evaluative means `Evaluate 20` in either subject, or `Discuss 14` in Economics. Business `Discuss`
 * is 8 marks and is NOT evaluative for this rule; Business's evaluative items are Assess and
 * Evaluate. Kept here rather than in `lib/ial-marking.js` because it is a rule of this guard, not a
 * fact about the tariff table.
 */
export const EVALUATIVE = { economics: [['Evaluate', 20], ['Discuss', 14]], business: [['Evaluate', 20]] };

export function isEvaluative(subject, command, marks) {
  return (EVALUATIVE[subject] || []).some(([c, m]) => c === command && m === Number(marks));
}

/* ── The computation ─────────────────────────────────────────────────────────────────────────── */

/**
 * Coverage for ONE section, from a list of items already in the `lib/exam-item.js` shape.
 *
 * The caller supplies the items, which is the whole point of the split: the CLI passes both banks
 * (`section_practice` from the t=0 dump plus `modelAnswersData`), and the lab page passes only the
 * questions it actually puts in front of a student. The two therefore report different numbers for
 * the same section, correctly — 7 of 35 for market-failure across both banks, 2 of 35 for the three
 * model answers the lab page displays — and neither is rounded up to meet the other.
 *
 * Each item wants `{ ref, bank, command | commandWord, marks, question, specItems, kind, ao,
 * stimulusRef }`. `command` may be absent: 24 sections' t=0 practice rows carry none and the
 * Practice tab derives it from the question's first word, so `practiceCommand` does the same here.
 *
 * The three failure rules, unchanged from the CLI they came from:
 *   tariff   a (command, marks) pair not in `lib/ial-marking.js` for that subject
 *   specid   a `specItems` id not in the oracle, or an empty `specItems` array
 *   noeval   at least one question and no evaluative question
 *
 * Failures are returned in item order, tariff before specid within an item, `noeval` last — the CLI
 * concatenates them section by section and prints them in that order, so the order is load-bearing.
 *
 * @returns {{questions:number, untagged:number, leaves:number, examined:number, examinedIds:string[],
 *   pct:number, unexamined:string[], commands:[string,number][], failures:object[]}}
 */
export function sectionCoverage({ subject, topic, slug, items = [] }) {
  const oracle = loadOracle();
  const leafIds = leafIdsForTopic(subject, topic);
  // THIS SECTION's leaves, not the oracle's 1,165. `examined` is the numerator of `pct` and
  // `examinedIds` is the list the page renders from it, and until packet 12.4 the two were counted
  // against different universes: a tag naming a leaf in ANOTHER topic was added to `examined` (it
  // is a real leaf) but filtered out of `examinedIds` (it is not this section's), so the page could
  // print a percentage no list of requirements accounted for. The contract check does not catch it
  // either — it validates an id against the whole oracle. See packet 12.4's two `types-sizes-
  // businesses` questions, which examine 3.3.2 and sit on a 3.3.1 page.
  const sectionLeaves = new Set(leafIds);
  const examined = new Set();
  const commandCounts = new Map();
  const failures = [];
  let untagged = 0;

  for (const item of items) {
    const command = practiceCommand({ command: item.command, question: item.question });
    const marks = Number(item.marks);
    commandCounts.set(`${command} ${marks}`, (commandCounts.get(`${command} ${marks}`) || 0) + 1);

    if (!isValidTariff(subject, command, marks)) {
      failures.push({
        rule: 'tariff', section: slug, ref: item.ref, bank: item.bank,
        detail: `${command} ${marks} is not ${subject === 'economics' ? 'an Economics' : 'a Business'} tariff (lib/ial-marking.js)`,
        key: `tariff|${slug}|${item.ref}|${command} ${marks}`,
      });
    }

    for (const problem of contractProblems(item, { specItemIds: oracle.allIds })) {
      failures.push({
        rule: 'specid', section: slug, ref: item.ref, bank: item.bank,
        detail: problem, key: `specid|${slug}|${item.ref}|${problem}`,
      });
    }

    if (item.specItems === undefined) untagged++;
    else for (const id of item.specItems || []) if (sectionLeaves.has(id)) examined.add(id);
  }

  if (items.length > 0 && !items.some((i) => isEvaluative(subject, practiceCommand({ command: i.command, question: i.question }), i.marks))) {
    const wanted = (EVALUATIVE[subject] || []).map(([c, m]) => `${c} ${m}`).join(' or ');
    failures.push({
      rule: 'noeval', section: slug, ref: '-', bank: '-',
      detail: `${items.length} question(s) and no evaluative question (${wanted})`,
      key: `noeval|${slug}`,
    });
  }

  return {
    questions: items.length,
    untagged,
    leaves: leafIds.length,
    examined: examined.size,
    examinedIds: leafIds.filter((id) => examined.has(id)),
    pct: leafIds.length ? (examined.size / leafIds.length) * 100 : 0,
    unexamined: leafIds.filter((id) => !examined.has(id)),
    commands: [...commandCounts.entries()].sort((a, b) => b[1] - a[1]),
    failures,
  };
}
