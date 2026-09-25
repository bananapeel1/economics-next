/**
 * The question a chapter check-in falls back to when its chapter pins none. V026.
 *
 * One ref anywhere puts a whole section on LearnModeTab's pinned path (LearnModeTab.jsx:205), and a
 * chapter carrying no `quizIndices` then resolves to nothing while every other chapter resolves its
 * own. Live on `introductory-concepts` ("Economic Systems") and `meeting-customer-needs`
 * ("Segmentation and Competitive Advantage"), and because it is a resolution failure rather than a
 * slice it was empty for a PAYING student too — measured with the whole bank.
 *
 * WHY IT MATCHES RATHER THAN TAKING THE NEXT ONE. The diagram path was given this same fallback in
 * F041 and it refuses to place a diagram that shares no vocabulary with the block: "never dump on
 * random blocks". The reason applies here. `checkinIntro` (LearnModeTab.jsx:474) is already built
 * from what the check-in actually carries, so a chapter with no question does not promise one — the
 * sentence simply omits it. The choice is therefore not between a question and a broken promise, it
 * is between a relevant question and one about a different chapter, and the second is worse than a
 * shorter check-in. So: the best match by shared vocabulary, or nothing.
 *
 * A chapter left with nothing is content debt, not a code defect — the authored fix is a pin, and
 * `audit/scripts/exposure-census.mjs` reports the two cases separately for exactly that reason.
 *
 * HOW LOOSE THIS IS, because "best match" reads stronger than it delivers. The bar is ONE shared
 * non-stop word, the same bar `matchDiagramsToBlocks` uses. Live consequence, from packet 2.5's
 * walkthrough: "Economic Systems" is given "The basic economic problem exists because:", matched on
 * `economic` alone — a scarcity question on the systems chapter. No scoring change fixes that,
 * because the chapter title and the questions actually about it share no words at all; the bank
 * names the systems ("command", "free market") where the title names the category. Read this as a
 * floor under an unpinned chapter, not as a substitute for pinning one.
 */

/* Matches the stop list in matchDiagramsToBlocks (components/learn-mode/utils.js), which is the
   same judgement about the same titles: joining words are not topic matches. */
const STOP = new Set(['and', 'the', 'for', 'its', 'with', 'from', 'into', 'that', 'this',
  'are', 'was', 'how', 'why', 'what', 'their', 'them', 'not', 'but', 'can', 'has', 'over',
  'which', 'following', 'would', 'best', 'most', 'describes', 'statement']);

const words = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
  .filter((w) => w.length > 2 && !STOP.has(w));

/**
 * True when the chapter's author DECIDED it asks no question: `quizIndices: []` (or `quizIds: []`)
 * with no pin in the other field. Packet 2.9.
 *
 * The fallback above exists for a chapter nobody decided about. It is the wrong tool for a chapter
 * somebody read and found nothing to ask about, and 2.9 had six of those: pinning the 21 unpinned
 * live sections put them on the pinned path, where the fallback then filled those chapters on
 * vocabulary alone — on global-markets-expansion, with a "push factor" question that no chapter of
 * the section teaches. The chooser and a blind reader had already rejected it; the fallback
 * cannot know that, because it reads titles, not chapters. So an explicit empty pin is honoured as
 * the decision it is, by the client placement and the signed-out payload both, and an absent pin
 * still falls back exactly as V026 decided. No block in the corpus carried an empty pin before
 * 2.9, so nothing that shipped changes meaning.
 */
export function decidedNoQuestion(block) {
  if (!block) return false;
  const has = (v) => Array.isArray(v) && v.length > 0;
  if (has(block.quizIds) || has(block.quizIndices)) return false;
  return Array.isArray(block.quizIds) || Array.isArray(block.quizIndices);
}

/**
 * True when the chapter's author DECIDED it shows no diagram: `diagramId: null`, with no
 * `diagramRef`. Packet 2.91, V056. Takes a block or a check-in step (buildSteps copies the field).
 *
 * The diagram half of `decidedNoQuestion`, and needed for the same reason. `matchDiagramsToBlocks`
 * fills a chapter nobody pinned with any unclaimed diagram sharing ONE title word, and a title
 * cannot say which chapter a diagram is about: on live types-sizes-businesses "Types of Business
 * Growth (Integration)" shares `types` and `business` with "Types of Business Organisation" and only
 * `growth` with "Growth of Firms", so the integration diagram sits under the chapter before the one
 * that teaches it. On role-state-macroeconomy the chapter on public goods showed "Crowding Out in
 * the Loanable Funds Market" on the word `market`. Reading the chapter is the only fix, and when the
 * reader finds that the chapter teaches none of the section's diagrams, that finding has to be
 * representable, or the fallback puts the rejected diagram straight back.
 *
 * `null`, not an empty string, because it is what JSON has for "none" and jsonb keeps it. Only an
 * explicit null counts: an ABSENT `diagramId` is undefined, is nobody's decision, and still falls
 * back as F041 decided. No block in the corpus carried `diagramId: null` before this (measured on
 * live and draft, 25 September 2026, 363 blocks), so nothing that shipped changes meaning.
 */
export function decidedNoDiagram(block) {
  if (!block || block.diagramRef) return false;
  return block.diagramId === null;
}

/**
 * The index of the unclaimed item that best matches `text`, or -1 when none shares any vocabulary
 * with it. Does NOT claim: the caller decides, because the server and the client claim differently.
 *
 * @param {Array} items   quiz items, in whatever order the caller holds them
 * @param {string} text   the chapter title to match against
 * @param {Set} used      indices already spoken for
 */
export function bestUnclaimedIndex(items, text, used) {
  if (!Array.isArray(items) || !items.length) return -1;
  const want = new Set(words(text));
  if (!want.size) return -1;

  let best = -1;
  let bestScore = 0;
  for (let i = 0; i < items.length; i += 1) {
    if (!items[i] || (used && used.has(i))) continue;
    // Count DISTINCT shared words, so a question repeating one term does not outscore a broader match.
    const score = new Set(words(items[i].question).filter((w) => want.has(w))).size;
    if (score > bestScore) { bestScore = score; best = i; }
  }
  return best;
}
