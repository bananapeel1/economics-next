/**
 * Calculations in the spaced-repetition queue.
 *
 * Packet 13.3. A calculation is the first item in the product whose answer cannot be memorised
 * between reviews: the template repeats, the figures do not. That only means something if the
 * queue brings the item back — so a section's drills join the same SM-2 machinery the quiz bank
 * and the flashcards already use (`lib/spaced-repetition.js`), stored in the same table, and a
 * review draws a new set of numbers.
 *
 * Nothing about a calculation is stored except its schedule. The item itself is rebuilt from
 * `{ template, seed }` (lib/quant/schema.md), and the seed is chosen here.
 *
 * ── How it sits in `practice_question_progress` ──
 *
 * That table multiplexes item kinds through a prefix on `section_id` — `<section>` for the quiz,
 * `fc-<section>` for flashcards, `wa-<section>` for written answers — and keys a row on
 * `(user_id, section_id, question_index)`, where `question_index` is `INTEGER NOT NULL` and the
 * upsert conflict target (lib/progress-row.js). Calculations follow the same convention:
 *
 *   section_id      `qt-<section>`
 *   question_index  quantSlot(templateId) — a stable integer derived from the template id
 *   item_id         `<section>:quant:<templateId>` — packet 2's `<section>:<kind>:<key>` shape
 *
 * `question_index` cannot be the template's position in a list. A template registered later for
 * the same section would shift every position after it and hand one student's schedule to a
 * different calculation, silently. A hash of the id does not move. `lib/quant-practice.test.mjs`
 * asserts that no two registered templates collide within a section.
 *
 * No migration: the columns and the conflict target are the ones packet 2 left in place.
 */
import { templates, buildItem } from './quant/index.mjs';
import { templatesForSection } from './quant-pool.js';

/** The `section_id` prefix calculation rows carry, beside `fc-` and `wa-`. */
export const QUANT_PREFIX = 'qt-';

export const quantProgressSection = (sectionId) => `${QUANT_PREFIX}${sectionId}`;
export const isQuantProgressSection = (id) => String(id || '').startsWith(QUANT_PREFIX);
export const sectionFromQuantProgress = (id) => String(id || '').slice(QUANT_PREFIX.length);

/** Packet 2's item id shape: `<sectionId>:<kind>:<key>`. */
export const quantItemId = (sectionId, templateId) => `${sectionId}:quant:${templateId}`;

/**
 * A stable non-negative 31-bit integer for a template id (FNV-1a). It fits Postgres INTEGER, it
 * never changes when the registry is reordered, and it does not depend on which section asks.
 */
export function quantSlot(templateId) {
  let h = 0x811c9dc5;
  const s = String(templateId);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h & 0x7fffffff;
}

/**
 * The queue entries for one section: one per template that claims it. Shaped like a bank
 * question so `buildQueue` treats it like any other — `bankIndex` is what it keys on — with
 * `kind: 'quant'` so a renderer can tell the difference.
 *
 * `section` is `{ id, subject, unitCode, number }`; see templatesForSection for why a missing
 * unit code means no drill rather than a guess.
 */
export function quantBank(section) {
  if (!section?.id) return [];
  return templatesForSection(section).map((t) => ({
    kind: 'quant',
    templateId: t.id,
    bankIndex: quantSlot(t.id),
    id: quantItemId(section.id, t.id),
    title: t.title,
    topic: t.topic,
  }));
}

/** `{ 'qt-<section>': bank }` for every section that has at least one calculation. */
export function quantBanks(sections) {
  const out = {};
  for (const s of sections || []) {
    const bank = quantBank(s);
    if (bank.length) out[quantProgressSection(s.id)] = bank;
  }
  return out;
}

/**
 * The seed for the review a student is about to do.
 *
 * It must hold still while the item waits — a reload before answering has to show the same
 * figures, or the student can reroll a hard draw — and it must move once the item has been
 * answered, or "come back and the numbers will have changed" is untrue. The schedule's own
 * `nextReview` does exactly that: it is fixed until an answer is saved and changes with every
 * answer, including a wrong one (reset to ten minutes).
 *
 * `practice` keeps the namespace apart from Learn Mode's `${section}:${template}:${attempt}`
 * seeds, so the first practice review is never the calculation the student just did at a
 * check-in.
 */
export function quantReviewSeed(sectionId, templateId, progress) {
  const at = Number(progress?.nextReview);
  return `${sectionId}:${templateId}:practice:${Number.isFinite(at) && at > 0 ? at : 'new'}`;
}

/** The built item for one review, or null if the template no longer exists. */
export function quantPracticeItem(sectionId, templateId, progress) {
  if (!sectionId || !templateId) return null;
  try {
    return buildItem(templateId, quantReviewSeed(sectionId, templateId, progress));
  } catch {
    return null;
  }
}

/**
 * Whether a marked calculation counts as recalled for scheduling. Full marks only: the SM-2 step
 * is binary, and a calculation with a wrong step is one the student cannot yet do. The own
 * figure rule still awards the marks (so `awarded === total` can be true after a carried slip) —
 * which is right, because carrying a figure correctly IS the method.
 */
export const quantRecalled = (result) => !!result && result.total > 0 && result.awarded === result.total;

/** How many calculations a section offers — the dashboard's denominator for `qt-` rows. */
export const quantCount = (section) => templatesForSection(section).length;

/** Every registered template id, for tests that need to reason over the whole set. */
export const quantTemplateIds = () => templates.map((t) => t.id);
