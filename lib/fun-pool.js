/**
 * Which questions a Blackjack game draws from.
 *
 * Blackjack used to read a hard-coded list of the Unit 1-2 sections, so Units 3-4 never reached it
 * although their banks sat in `section_quiz` in exactly the same shape. The pool is now whatever the
 * `units` and `sections` tables put under the chosen subject and unit numbers, so a new or rebuilt
 * section reaches the game with no code change.
 *
 * Units are a filter on the pool, not a separate ladder: XP and level stay one per subject (see
 * FUN_PROGRESS_SUBJECT_ID in components/fun/constants.js before touching how progress is keyed).
 */

export const FUN_SUBJECTS = ['economics', 'business'];
export const FUN_UNITS = [1, 2, 3, 4];

/* A request that names no units plays what Blackjack always played. */
export const DEFAULT_UNITS = [1, 2];

/**
 * `"3,1,3"` -> `[1, 3]`. Missing or empty -> DEFAULT_UNITS. Anything else outside 1-4 -> null, which
 * the route answers with a 400 rather than guessing at what was meant.
 */
export function parseUnits(raw) {
  if (raw == null || String(raw).trim() === '') return [...DEFAULT_UNITS];
  const units = new Set();
  for (const part of String(raw).split(',')) {
    const p = part.trim();
    if (!/^[1-4]$/.test(p)) return null;
    units.add(Number(p));
  }
  return [...units].sort((a, b) => a - b);
}

/**
 * The sections of `subject` that sit in `units`, each carrying its unit number and short title so
 * the game can say where a question comes from. `sectionRows` keep the order they arrive in (the
 * route asks for sort_order); units are then grouped 1 to 4.
 */
export function sectionsForUnits(unitRows, sectionRows, subject, units) {
  const unitNumberById = new Map();
  for (const u of unitRows || []) {
    if (u.subjects?.slug === subject && units.includes(u.number)) unitNumberById.set(u.id, u.number);
  }
  return (sectionRows || [])
    .filter((s) => unitNumberById.has(s.unit_id))
    .map((s) => ({ id: s.id, unit: unitNumberById.get(s.unit_id), title: s.short_title || s.title }))
    .sort((a, b) => a.unit - b.unit);
}

/**
 * The question pool for those sections. A paying student gets each bank whole; a free account gets
 * the first `previewLimit` of each, the same per-section preview as before (F119). Adding units adds
 * sections, never a bigger slice of any one of them.
 */
export function buildFunPool(sections, quizRows, { isPremium, previewLimit }) {
  const bankOf = new Map((quizRows || []).map((r) => [r.section_id, Array.isArray(r.data) ? r.data : []]));
  const questions = [];
  let totalAvailable = 0;
  for (const s of sections) {
    const bank = bankOf.get(s.id) || [];
    totalAvailable += bank.length;
    const served = isPremium ? bank : bank.slice(0, previewLimit);
    for (const q of served) questions.push({ ...q, sectionId: s.id, unit: s.unit, sectionTitle: s.title });
  }
  return { questions, totalAvailable, totalReturned: questions.length };
}

/**
 * The Quiz tab's "Play Blackjack" link, opened on the unit the student has just been quizzed on.
 * IAL unit codes are WEC11-WEC14 and WBS11-WBS14; the last digit is the unit. Anything else gets the
 * plain page rather than a guess.
 */
export function blackjackHref(unitCode) {
  const m = /^W(EC|BS)1([1-4])$/i.exec(String(unitCode || '').trim());
  if (!m) return '/fun';
  const subject = m[1].toUpperCase() === 'BS' ? 'business' : 'economics';
  return `/fun?subject=${subject}&unit=${m[2]}`;
}
