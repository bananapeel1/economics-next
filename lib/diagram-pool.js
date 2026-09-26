/**
 * Which drawing drills a section gets, and where in Learn Mode they appear.
 *
 * Packet 13.7. The same decision packet 13.2 made for calculations (DECISIONS, 22 September
 * 2026): a section's drills are DERIVED from its spec number, not authored into its content. A
 * spec carries `specCode`, `unit` and `subject` (lib/diagram/schema.md), so a section gains a
 * drawing drill the day a spec claims its number — no content row changes, nothing is staged, and
 * nothing waits on a publish.
 *
 * The authored path packet 13.7 part 1 built — a subsection carrying
 * `recall: { type: 'diagram', specId }` — still works and is not replaced. A spec a section's
 * content already authors is left out here, so the two can never put the same drill on screen twice
 * (the failure PR #28 would have shipped for calculations had it been replayed).
 */
import { specs } from './diagram/index.mjs';
import { titleWords } from './quant-pool.js';

/** Every spec that claims this section, in registry order. Same join, same refusals, as quant. */
export function diagramSpecsForSection(section) {
  const subject = String(section?.subject || '').toLowerCase();
  const unitCode = String(section?.unitCode || '').toUpperCase();
  const number = String(section?.number || '').trim();
  // No unit code, no drill: see templatesForSection for why a guess is worse than nothing.
  if (!subject || !number || !unitCode) return [];
  return specs.filter((s) => (
    s.subject === subject && s.specCode === number && String(s.unit).toUpperCase() === unitCode
  ));
}

/** The spec ids a section's content already authors as a recall, so they are not derived again. */
export function authoredDiagramSpecIds(contentData) {
  const ids = new Set();
  for (const block of contentData || []) {
    for (const sub of block?.sections || []) {
      if (sub?.recall?.type === 'diagram' && sub.recall.specId) ids.add(sub.recall.specId);
    }
  }
  return ids;
}

/**
 * Words for matching a spec to the chapter that teaches it. A chapter says "Externalities" where a
 * spec says "externality", so a plural is folded to its singular on both sides (this pool only —
 * the calculations' matcher is left exactly as packet 13.2 verified it). A spec may also list
 * `placeWith`: the words a chapter teaching its diagram uses when its title does not name the
 * diagram. Market failure teaches the externality welfare loss under "Marginal Analysis and the
 * Welfare Areas", which shares no word with "Negative externality in production".
 */
const fold = (w) => (w.length > 4 && w.endsWith('ies') ? `${w.slice(0, -3)}y`
  : w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
const words = (text) => new Set([...titleWords(text)].map(fold));
const specWords = (spec) => new Set([...words(spec.title), ...words((spec.placeWith || []).join(' '))]);

/** How many words a spec shares with a title. The Diagrams tab matches drills to cards with it too. */
export const specMatchScore = (spec, title) => {
  const wanted = specWords(spec);
  return [...words(title)].filter((w) => wanted.has(w)).length;
};

/**
 * Place drawing drills on check-ins: `{ [checkinOrdinal]: specId }`.
 *
 * `checkinTitles` is what each check-in's chapter is about — its title, and the title of the
 * diagram the chapter shows where there is one, joined; the caller builds it.
 *
 * A drill takes the check-in's spaced-recall slot — it IS a recall, of a diagram, drawn from
 * memory — so a check-in carries no more than it did. Three rules:
 *
 *   1. It goes to the check-in of the chapter that TEACHES the diagram: the latest chapter whose
 *      title shares a word with the spec's title. That check-in follows the chapter's own steps,
 *      which is DRILLS.md's "a drill returns two or three steps after InlineDiagram taught the
 *      diagram". Drawing a diagram before the chapter that teaches it is a test of nothing.
 *   2. Never on a check-in that already holds a calculation (`occupied`): one heavy item per
 *      check-in. It moves to the next free check-in AFTER the match — later is still after the
 *      teaching; earlier is not.
 *   3. A spec whose chapter cannot be found goes to the LAST free check-in, when the whole section
 *      has been taught. If nothing is free it is not placed in Learn Mode at all; the Diagrams tab
 *      still offers it.
 */
export function placeDiagramDrills(specList, checkinTitles, occupied = new Set()) {
  const titles = Array.isArray(checkinTitles) ? checkinTitles : [];
  const taken = new Set(occupied);
  const map = {};
  for (const spec of specList || []) {
    let best = -1;
    let bestScore = 0;
    titles.forEach((title, ordinal) => {
      const score = specMatchScore(spec, title);
      if (score > 0 && score >= bestScore) { bestScore = score; best = ordinal; }
    });
    let slot = -1;
    if (best >= 0) {
      for (let i = best; i < titles.length; i++) if (!taken.has(i)) { slot = i; break; }
    } else {
      for (let i = titles.length - 1; i >= 0; i--) if (!taken.has(i)) { slot = i; break; }
    }
    if (slot >= 0) { map[slot] = spec.id; taken.add(slot); }
  }
  return map;
}

/** The recall object a placed drill renders as, shaped like an authored one. */
export const derivedDiagramRecall = (specId) => ({ type: 'diagram', specId });

/** The id a derived drill's score and skip are recorded under. Never collides with a content id. */
export const derivedDiagramRecallId = (specId) => `draw:${specId}`;
