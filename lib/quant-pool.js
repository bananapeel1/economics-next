/**
 * Which quantitative drill a section gets, and with which numbers.
 *
 * Packet 13.2. Nothing here is stored and nothing here is authored: a section's drills are
 * derived from its subject and its spec number, and the figures are rebuilt from a seed.
 * That is deliberate, and it is the reason this packet needed no content write and no
 * migration — a section gains a calculation the moment a template claims its spec number.
 *
 * The join is `template.specCode === section.number`, which is why packet 13.2 began by
 * correcting three of the four templates packet 13.1 shipped: they carried UK GCE numbers
 * (`1.2.4`, `2.4.2`) and one leaf from the wrong IAL section (`2.3.1` for break-even). In
 * the IAL specification every section number has 3 as its middle digit — `1.3.1` … `4.3.6`
 * — so those codes match no section in the product, and the drills would have appeared
 * nowhere at all. `unitCode` is checked too, so a Business 1.3.1 template cannot surface on
 * Economics 1.3.1, which is a different topic entirely.
 *
 * 13.3 adds the SM-2 queue and 13.4 the calculations session; both key off `item.id`
 * (`quant:<template>:<seed>`), which is why the seed is a pure function of things that are
 * stable — the section, the template and the attempt number — rather than of the clock.
 */
import { templates, buildItem } from './quant/index.mjs';

/** Every template that claims this section, in registry order. */
export function templatesForSection(section) {
  const subject = String(section?.subject || '').toLowerCase();
  const unitCode = String(section?.unitCode || '').toUpperCase();
  const number = String(section?.number || '').trim();
  if (!subject || !number) return [];

  // No unit code, no drill. This used to fall through to "the spec number identifies the
  // section within a subject", which is true and beside the point: the SUBJECT comes from
  // `subjectFrom(unitCode)` at both call sites, and that defaults to economics on an empty
  // string (lib/ial-commands.js:36-40). A Business section arriving without its unit code would
  // therefore be read as Economics and handed `multiplier` on 2.3.4 — a macro drill on
  // resource management. Not reachable today; one missing prop away.
  if (!unitCode) return [];

  return templates.filter((t) => (
    t.subject === subject
    && t.specCode === number
    && String(t.unit).toUpperCase() === unitCode
  ));
}

/**
 * The seed for one attempt at one template in one section.
 *
 * Stable across a reload, a re-render and a device, so a student who refreshes does not
 * lose the question they were halfway through; different on the next attempt, so the
 * figures change and only the method carries over. `attempt` is an integer the surface
 * owns — Learn Mode bumps it when the student asks for new figures.
 */
export function quantSeed(sectionId, templateId, attempt = 0) {
  return `${sectionId}:${templateId}:${attempt}`;
}

/** The built item for one template in one section, or null if the template is unknown. */
export function quantItem(section, templateId, attempt = 0) {
  if (!section?.sectionId || !templateId) return null;
  try {
    return buildItem(templateId, quantSeed(section.sectionId, templateId, attempt));
  } catch {
    // A template id that no longer exists must not take the section down with it.
    return null;
  }
}

/**
 * Words too common in a chapter title to mean anything. "Even" is here because
 * "break-even" tokenises into it and half the chapters in Business contain the word.
 */
const TITLE_STOP = new Set(['even', 'this', 'that', 'from', 'into', 'with', 'what', 'when',
  'their', 'them', 'your', 'more', 'than', 'they', 'have', 'been', 'does', 'using', 'used',
  'other', 'over', 'some', 'only', 'also', 'both', 'each', 'about']);

export const titleWords = (text) => new Set(
  String(text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter((w) => w.length >= 4 && !TITLE_STOP.has(w)),
);

/**
 * Place this section's drills on its check-in steps: `{ [checkinOrdinal]: templateId }`,
 * keyed by position in the array of check-ins, not by flat step index — the caller knows
 * which flat steps those are.
 *
 * `checkinTitles` is the chapter title behind each check-in, in order.
 *
 *   1. A drill goes to the chapter that TEACHES it, when a chapter title and the template's
 *      title share a word. The multiplier drill belongs to the check-in after "The Multiplier
 *      Formula", not three chapters earlier where nothing has introduced 1/MPW yet; the even
 *      spread put it there, which is how this rule came to be written.
 *   2. Otherwise, spread what is left over the check-ins after the first — never the first
 *      itself, because a six-mark calculation as the first thing a student is asked for is
 *      the step-0 wall packet 5 exists to pull down, moved four screens later. A matched
 *      drill may use the first check-in: there the chapter it belongs to is the reason.
 *   3. One drill per check-in, always — but the reservation in 2 yields before a drill goes
 *      unplaced. `decision-making-techniques` is the case that forced this: two check-ins, two
 *      drills, and reserving slot 0 left `payback` rendering nowhere in the product while
 *      passing every guard in the tree. An unreachable drill is worse than an early one.
 *
 * Matching is only ever a preference. A section whose chapter titles say nothing useful
 * still gets its drills, in the order the registry lists them.
 */
export function placeQuantItems(templateList, checkinTitles) {
  const map = {};
  const titles = Array.isArray(checkinTitles) ? checkinTitles : [];
  const count = Array.isArray(checkinTitles) ? titles.length : Number(checkinTitles) || 0;
  const list = (templateList || []).map((t) => (typeof t === 'string' ? { id: t, title: '' } : t));
  if (!list.length || count < 1) return map;

  const taken = new Set();
  const unmatched = [];

  for (const template of list) {
    const words = titleWords(template.title);
    let best = -1;
    let bestScore = 0;
    titles.forEach((title, ordinal) => {
      if (taken.has(ordinal)) return;
      const score = [...titleWords(title)].filter((w) => words.has(w)).length;
      // `>=` so the LATEST chapter with the best score wins: a topic named early and taught
      // late belongs to the check-in after it was taught.
      if (score > 0 && score >= bestScore) { bestScore = score; best = ordinal; }
    });
    if (best >= 0) { map[best] = template.id; taken.add(best); } else unmatched.push(template);
  }

  if (unmatched.length) {
    const free = [];
    for (let i = 1; i < count; i++) if (!taken.has(i)) free.push(i);   // rule 2: not slot 0…
    // …unless holding it back would leave a drill with nowhere to go (rule 3).
    if (free.length < unmatched.length && !taken.has(0)) free.unshift(0);
    const n = Math.min(unmatched.length, free.length);
    for (let i = 0; i < n; i++) {
      const pos = Math.max(0, Math.min(Math.round(((i + 0.5) * free.length) / n) - 1, free.length - 1));
      const slot = free[pos] ?? free[i];
      map[slot] = unmatched[i].id;
      taken.add(slot);
    }
  }
  return map;
}

/** One line for the check-in sentence and the Quiz tab heading. */
export function quantLabel(item) {
  if (!item) return '';
  return `${item.title} · ${item.marks} marks`;
}
