/**
 * The exam-practice item contract — one shape for both question banks.
 *
 * Packet 12.1, E001. This is the module the coverage guard reads, and the documentation of the
 * contract is this file: there is no separate prose copy to fall out of step with it.
 *
 * WHY THE CONTRACT EXISTS. The product makes one claim it has never been able to check: that a
 * student who works through a section is examined on what the specification asks. Two banks answer
 * questions today and neither records WHAT a question examines:
 *
 *   - `data/modelAnswersData.js` + `modelAnswersExpansion.js` — 66 items behind the 22 SEO
 *     model-answer pages;
 *   - the `section_practice` table — ~215 items behind the app's Practice tab.
 *
 * Nothing reconciles them and nothing counts them against the specification. `specItems` is the
 * whole point of this contract; everything else on it is presentation or provenance.
 *
 * THE FIELDS, all four optional so that the 22 live pages and the Practice tab ignore what they do
 * not read:
 *
 *   specItems   string[]  Spec-item ids from `audit/raw/spec-items.json`, e.g. 'ECON-1.3.5-2a'.
 *                         What this question examines. Ids only: the wording lives in the oracle.
 *                         ABSENT means "not tagged yet" and the guard reports it as untagged.
 *                         An EMPTY ARRAY means "tagged, examines no leaf" and is a guard failure —
 *                         the two must stay distinguishable or an untagged bank reads as a clean one.
 *   kind        string    'mcq' | 'written' | 'quant' | 'draw'. What the student does, which is not
 *                         derivable from the command word: Economics `Calculate 4` is quant and
 *                         `Draw 4` is draw, but both are "written" in the sense the page uses.
 *   ao          string[]  Subset of ['AO1','AO2','AO3','AO4'], DERIVED from lib/ao-spec.js by
 *                         `aoListFor`. Never hand-typed. Which objectives a command word assesses is
 *                         an Appendix 6 fact for Economics and a documented inference for Business,
 *                         and ao-spec.js is where that distinction is kept.
 *   stimulusRef string|null  The id of the extract, data table or figure the item is anchored to,
 *                         or null for a standalone item. IAL Business anchors every question to an
 *                         extract line, so this is how a Business item says which one.
 *
 * WHAT IS NOT HERE. No tariff table: lib/ial-marking.js is the only place a tariff is stated, and
 * lib/practice-tariffs.js derives everything else from it.
 */

import { SPEC_ASSESSED } from './ao-spec.js';

/** The four values `kind` may take. Frozen so a typo is a TypeError in strict mode, not a new kind. */
export const ITEM_KINDS = Object.freeze(['mcq', 'written', 'quant', 'draw']);

/** The four assessment objectives, in order. */
export const AO_CODES = Object.freeze(['AO1', 'AO2', 'AO3', 'AO4']);

/** 'economics' | 'business' from a unit code (WEC11, WBS13) or a subject slug. */
export function subjectOf(subjectOrUnitCode) {
  const s = String(subjectOrUnitCode || '').toLowerCase();
  if (s.startsWith('wbs') || s === 'business') return 'business';
  if (s.startsWith('wec') || s === 'economics') return 'economics';
  return 'economics';
}

/**
 * The `ao` array for a (subject, command) pair, read from lib/ao-spec.js.
 *
 * Returns null — not [] — when the command word is not in that subject's Appendix 6 table. Null is
 * "we have no basis", an empty array would be "assesses nothing", and the difference is the same
 * one `specItems` makes above.
 *
 * @returns {string[]|null}
 */
export function aoListFor(subjectOrUnitCode, command) {
  const subject = subjectOf(subjectOrUnitCode);
  const table = SPEC_ASSESSED[subject];
  const cmd = String(command || '').trim();
  if (!table || !Object.prototype.hasOwnProperty.call(table, cmd)) return null;
  const assessed = table[cmd];
  return AO_CODES.filter((code) => assessed[code.toLowerCase()] === true);
}

/**
 * The `kind` a written-bank item takes, from its command word. Deliberately narrow: it answers only
 * for the command words whose activity is unambiguous, and returns 'written' otherwise rather than
 * guessing. An item that is really an MCQ has to say so; no command word implies one.
 */
export function kindForCommand(command) {
  const cmd = String(command || '').trim();
  if (cmd === 'Calculate') return 'quant';
  if (cmd === 'Draw' || cmd === 'Construct') return 'draw';
  return 'written';
}

/**
 * Check one item against the contract. Returns an array of problem strings, empty when the item is
 * contract-clean. It does NOT check the tariff — that is lib/practice-tariffs.js's `isValidTariff`,
 * and the guard runs both so that a failure names which rule it broke.
 *
 * @param {object} item
 * @param {{ specItemIds?: Set<string> }} [opts] - the oracle's id set, when it is available
 */
export function contractProblems(item, opts = {}) {
  const problems = [];
  const { specItemIds } = opts;

  if (item.specItems !== undefined) {
    if (!Array.isArray(item.specItems)) {
      problems.push('specItems is present but not an array');
    } else if (item.specItems.length === 0) {
      problems.push('specItems is an empty array — omit the field instead, so untagged stays visible');
    } else {
      for (const id of item.specItems) {
        if (typeof id !== 'string') problems.push(`specItems contains a non-string: ${JSON.stringify(id)}`);
        else if (specItemIds && !specItemIds.has(id)) problems.push(`specItems id not in spec-items.json: ${id}`);
      }
      if (new Set(item.specItems).size !== item.specItems.length) problems.push('specItems has a duplicate id');
    }
  }

  if (item.kind !== undefined && !ITEM_KINDS.includes(item.kind)) {
    problems.push(`kind is not one of ${ITEM_KINDS.join(' | ')}: ${JSON.stringify(item.kind)}`);
  }

  if (item.ao !== undefined) {
    if (!Array.isArray(item.ao)) problems.push('ao is present but not an array');
    else {
      for (const code of item.ao) {
        if (!AO_CODES.includes(code)) problems.push(`ao contains an unknown objective: ${JSON.stringify(code)}`);
      }
      const command = item.commandWord || item.command;
      const derived = aoListFor(item.subject || item.unitCode, command);
      if (derived && derived.join(',') !== [...item.ao].join(',')) {
        problems.push(`ao ${JSON.stringify(item.ao)} does not match lib/ao-spec.js for ${command}: ${JSON.stringify(derived)}`);
      }
    }
  }

  if (item.stimulusRef !== undefined && item.stimulusRef !== null && typeof item.stimulusRef !== 'string') {
    problems.push('stimulusRef is neither a string nor null');
  }

  return problems;
}
