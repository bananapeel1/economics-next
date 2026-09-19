/**
 * Practice-item tariffs, derived — never restated.
 *
 * Two surfaces used to carry their own `4 / 6 / 10 / 20` ladder: the mark-filter chips in
 * `components/PracticeQuestionsTab.jsx` and the colour map in `components/learn-mode/utils.js`.
 * That ladder is wrong for both subjects. IAL Economics has no 10-mark question at all (see
 * DECISIONS, 2026-09-11, "IAL tariffs are canonical and per subject"), and Business has 2, 8, 10
 * and 12 marks that the chips never offered. A student revising Economics was being shown a filter
 * for a tariff that does not exist in the papers she will sit.
 *
 * Everything here is computed from `lib/ial-marking.js`, which is the one place a tariff is stated.
 * Add a tariff there and it appears here; there is no second list to keep in step.
 *
 * Packet 12.1, E006.
 */

import { ECONOMICS, BUSINESS, specForUnitCode } from './ial-marking.js';

/** The spec object for a unit code or a subject slug. Defaults to Economics, as ial-marking does. */
export function specFor(unitCodeOrSubject) {
  const s = String(unitCodeOrSubject || '').toLowerCase();
  if (s === 'business') return BUSINESS;
  if (s === 'economics') return ECONOMICS;
  return specForUnitCode(unitCodeOrSubject);
}

/**
 * Every tariff the subject's papers can carry, ascending and de-duplicated.
 * Economics: 2, 4, 6, 8, 14, 20. Business: 2, 4, 6, 8, 10, 12, 20.
 */
export function tariffsFor(unitCodeOrSubject) {
  const spec = specFor(unitCodeOrSubject);
  const all = new Set();
  for (const marks of Object.values(spec.tariffs)) {
    for (const m of marks) all.add(m);
  }
  return [...all].sort((a, b) => a - b);
}

/** Every command word the subject's papers use, in the order ial-marking lists them. */
export function commandsFor(unitCodeOrSubject) {
  return Object.keys(specFor(unitCodeOrSubject).tariffs);
}

/** True when this (command, marks) pair appears in the subject's tariff table. */
export function isValidTariff(unitCodeOrSubject, command, marks) {
  const table = specFor(unitCodeOrSubject).tariffs;
  const cmd = String(command || '').trim();
  if (!Object.prototype.hasOwnProperty.call(table, cmd)) return false;
  return table[cmd].includes(Number(marks));
}

/**
 * The colour tokens for one tariff. One triple per mark value, defined in `app/globals.css` for
 * both themes. A tariff with no triple of its own falls back to the 4-mark palette rather than
 * rendering an unresolved `var()`, which paints nothing.
 */
const TOKENED_MARKS = new Set([2, 4, 6, 8, 10, 12, 14, 20]);

export function markColor(marks) {
  const m = TOKENED_MARKS.has(Number(marks)) ? Number(marks) : 4;
  return {
    bg: `var(--practice-${m}-bg)`,
    border: `var(--practice-${m}-border)`,
    badge: `var(--practice-${m}-badge)`,
  };
}

/** `{ 2: {...}, 4: {...}, … }` for one subject's ladder. Replaces the hardcoded MARK_COLORS. */
export function markColorsFor(unitCodeOrSubject) {
  const out = {};
  for (const m of tariffsFor(unitCodeOrSubject)) out[m] = markColor(m);
  return out;
}

/**
 * The mark-filter chips for one subject: `All Questions` then one chip per tariff, ascending.
 * The whole ladder is offered even where the section has no question at that tariff yet, because
 * the ladder is what the paper contains and a missing chip reads as "this tariff does not exist".
 * The caller disables a chip whose count is 0 so it cannot be clicked into an empty list.
 */
export function markFiltersFor(unitCodeOrSubject) {
  return markFiltersForSection(unitCodeOrSubject, []);
}

/**
 * The chips for ONE SECTION: the subject's ladder, plus any tariff this section's VISIBLE questions
 * actually carry that the ladder does not contain.
 *
 * Founder decision, 18 September 2026, after packet 12.1's Verify B. Deriving the chips from the
 * ladder alone was correct about the papers and wrong about the product: two live Economics
 * sections (aggregate-demand, consumer-behaviour-demand) serve a 10-mark `Analyse` question, and
 * Economics has no 10-mark tariff, so the chip row summed to 3 under a heading reading
 * "All Questions 4" and no chip reached that question. It had been filterable before packet 12.1.
 *
 * An off-ladder tariff therefore gets its own chip, labelled so the student is not told it is
 * something it is not: `10 · not IAL` rather than `10 Marks`. Nothing becomes unreachable and no
 * live question is hidden — hiding them is `isPracticeVisible`'s job and it stays off (NEXT.md
 * reserves tariff enforcement for the founder).
 *
 * `presentMarks` is the section's visible questions' tariffs; an empty list gives the bare ladder,
 * which is what `markFiltersFor` is.
 */
export function markFiltersForSection(unitCodeOrSubject, presentMarks = []) {
  const ladder = tariffsFor(unitCodeOrSubject);
  const onLadder = new Set(ladder);
  // A positive whole number or nothing. An item with a missing or malformed `marks` must not mint a
  // `0 · not IAL` chip: Number(null) is 0, which is finite.
  const offLadder = [
    ...new Set(
      [...presentMarks]
        .map(Number)
        .filter((m) => Number.isInteger(m) && m > 0 && !onLadder.has(m)),
    ),
  ];
  const chips = [...ladder, ...offLadder].sort((a, b) => a - b);
  return [
    { value: 'all', label: 'All Questions' },
    ...chips.map((m) =>
      onLadder.has(m)
        ? { value: m, label: `${m} Marks`, offLadder: false }
        : { value: m, label: `${m} · not IAL`, offLadder: true },
    ),
  ];
}
