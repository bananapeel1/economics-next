/**
 * The IAL paper layouts, read from ONE file. Packet 12.8, E057/E061.
 *
 * `audit/raw/ial-paper-structure.json` holds the part-level layouts read from Pearson's Sample
 * Assessment Materials (sources in the file). This module is the only reader of it: the validator
 * (`audit/scripts/validate-model-answers.mjs`, R9-R13) and the practice shell's server preparation
 * (`lib/practice-shell.js`, `components/SectionModelAnswersPage.jsx`) both ask it, and neither
 * repeats a number from it. "Five short answers of four marks", "2/4/6/8/14", "two essays, answer
 * one" appear nowhere else in code; a page header that says them reads them from here.
 *
 * WHY fs AND NOT AN IMPORT. The same file must load under `node` (the validator, `node --test`) and
 * inside a Next server build. A bare JSON import fails under Node's ESM loader without an import
 * attribute, and this repository has no import-attribute precedent in a Next build. So it follows
 * `lib/spec-coverage.js`: find the repository root by looking for the file (`import.meta.url` first,
 * then `process.cwd()`), read it once, and cache it. The two model-answer routes trace the file via
 * `outputFileTracingIncludes` in `next.config.mjs`, as they already do for the spec oracle.
 *
 * NOTHING HERE TOUCHES SUPABASE (rule 2): one guarded `readFileSync`. A missing file returns null
 * from every accessor, and the shell then renders exactly as it did before this packet.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PAPER_STRUCTURE_REL = 'audit/raw/ial-paper-structure.json';

let cached;

function load() {
  if (cached !== undefined) return cached;
  const roots = [];
  try {
    roots.push(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'));
  } catch { /* no import.meta.url under some bundlers */ }
  try {
    roots.push(process.cwd());
  } catch { /* no cwd in an edge runtime */ }
  cached = null;
  for (const root of roots) {
    try {
      cached = JSON.parse(fs.readFileSync(path.join(root, PAPER_STRUCTURE_REL), 'utf8'));
      break;
    } catch { /* try the next root */ }
  }
  return cached;
}

/** The whole parsed structure file, or null when it cannot be read. */
export function paperStructure() {
  return load();
}

/**
 * The paper a unit sits in: `{ papers, minutes, marks, sections }` from the structure file, or null.
 * Units 1 and 2 share a layout, as do 3 and 4 (the file keys them `units_1_2`, `units_3_4`).
 */
export function paperFor(subject, unit) {
  const all = load();
  const bySubject = all && all[String(subject || '').toLowerCase()];
  if (!bySubject) return null;
  const u = Number(unit);
  const key = u === 1 || u === 2 ? 'units_1_2' : u === 3 || u === 4 ? 'units_3_4' : null;
  return (key && bySubject[key]) || null;
}

/** One section of a unit's paper by its letter ('A'…'D'), or null. */
export function paperSection(subject, unit, id) {
  const paper = paperFor(subject, unit);
  return (paper && paper.sections.find((s) => s.id === id)) || null;
}

/** The first section of a unit's paper of a given kind ('short_answer', 'data_question', …), or null. */
export function sectionOfKind(subject, unit, kind) {
  const paper = paperFor(subject, unit);
  return (paper && paper.sections.find((s) => s.kind === kind)) || null;
}

/** A section's total marks as the file states them: `total`, else `marksEach × answer`. */
export function sectionMarks(section) {
  if (!section) return null;
  if (Number.isFinite(section.total)) return section.total;
  if (Number.isFinite(section.marksEach) && Number.isFinite(section.answer)) return section.marksEach * section.answer;
  return null;
}

/** The command words the file allows for a tariff in a section, or null when it names none. */
export function commandWordsFor(section, marks) {
  if (!section) return null;
  if (section.commandWordByTariff) return section.commandWordByTariff[String(marks)] || [];
  return Array.isArray(section.commandWords) ? section.commandWords : null;
}
