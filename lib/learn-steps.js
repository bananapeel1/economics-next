/**
 * The Learn Mode step model. Packet 5.
 *
 * One place decides what a step is, so the engine (components/LearnModeTab.jsx) and the overview
 * count (components/StudyApp.jsx) cannot disagree — they did, by 60% on some sections (F030).
 *
 * WHAT A STEP IS
 *
 *   teach    one subsection: its title, key idea, body, example, misconception, exam lens, and its
 *            own recall BELOW the teaching. One heading per step.
 *   checkin  the end of a chapter: diagram, quick quiz, practice question, a spaced recall from an
 *            earlier chapter, explain-it-back, takeaway. One per chapter that has subsections.
 *   legacy   an old-format block with `concepts` instead of `sections`; rendered whole.
 *
 * WHY. The previous model paired two subsections per step, hung every end-of-chapter widget on the
 * last pair, and put the previous step's recall at the TOP of the next step. The audit measured
 * the result: 5,300-5,900px steps on a 390px phone (F065), the same recall twice in a row on every
 * single-subsection step (F036, F053), a recall the student had not been taught anything about as
 * the first thing on a new step (F038, F066, F100), the second recall of every pair never shown at
 * all (F037), and a step count the overview could not predict (F047). Three quarters of section
 * opens ended on step 0.
 *
 * SPACING. A recall is shown on its own teach step, and once more, on a later check-in, only if
 * that check-in belongs to a LATER chapter and the recall has not been used as a spaced recall yet
 * this session. That is at least a full chapter apart — never one tap apart — and every recall is
 * spaced at most once, so none is lost and none is doubled.
 *
 * WHICH one, and this is V034. The rule used to be "the earliest unspaced recall", which reads as
 * fair and is not: a five-chapter section has four spaced slots, chapter 1 usually holds four or
 * more recalls, and it therefore filled every slot. Measured over the corpus before the change, 80%
 * of staged spaced showings and 64% of live ones came from chapter 1, and ten staged sections drew
 * EVERY slot from it — `financial-planning` read "Recall from chapter 1" at all four check-ins. The
 * rule now spreads first and ages second: the eligible chapter that has contributed the FEWEST
 * spaced recalls so far, oldest such chapter first, then the earliest unused recall inside it. A
 * chapter is only revisited once every other eligible chapter has been drawn from once.
 */

import { reorderStartOrder } from './recall-widgets.js';

/**
 * @param {Array} content  the section_content array (blocks)
 * @returns {Array} steps, in order
 */
export function buildSteps(content) {
  if (!Array.isArray(content) || !content.length) return [];
  const steps = [];
  const blockCount = content.length;
  content.forEach((block, bi) => {
    if (!block || typeof block !== 'object') return;
    const secs = Array.isArray(block.sections) ? block.sections.filter(Boolean) : null;
    if (!secs) { steps.push({ type: 'legacy', key: `legacy:${bi}`, block, blockIndex: bi, blockCount, blockTitle: block.title || '' }); return; }
    secs.forEach((section, si) => {
      steps.push({
        type: 'teach',
        key: `teach:${section.id || `${bi}-${si}`}`,
        blockIndex: bi,
        blockCount,
        blockTitle: block.title || '',
        partIndex: si,
        partCount: secs.length,
        isFirstInBlock: si === 0,
        isLastInBlock: si === secs.length - 1,
        section,
      });
    });
    steps.push({
      type: 'checkin',
      key: `checkin:${bi}`,
      blockIndex: bi,
      blockCount,
      blockTitle: block.title || '',
      takeaway: Array.isArray(block.takeaway) ? block.takeaway : null,
      diagramRef: block.diagramRef,
      diagramId: block.diagramId,
      quizIndices: block.quizIndices,
      quizIds: block.quizIds,
      practiceIndices: block.practiceIndices,
      practiceIds: block.practiceIds,
    });
  });
  return steps;
}

/** The number the overview shows and the engine counts. Same function, so the same number. */
export function countSteps(content) {
  return buildSteps(content).length;
}

/** Index of the first step of a chapter, for the chapter-dot strip and for resuming. */
export function firstStepOfBlock(steps, blockIndex) {
  const i = steps.findIndex((s) => s.blockIndex === blockIndex);
  return i < 0 ? 0 : i;
}

/**
 * The spaced recall for a check-in: a recall from an EARLIER chapter that has not yet been used as
 * a spaced recall, chosen to spread the showings across chapters (V034). Returns
 * { recall, id, fromStep, fromTitle, fromBlockIndex, fromBlockTitle } or null.
 *
 * @param {Array} steps       from buildSteps
 * @param {number} checkinIdx index of the check-in step
 * @param {Set<string>} used  recall ids already shown as spaced this session
 * @param {Set<string>} prefer recall ids the student skipped: shown first when eligible (F055)
 */
export function pickSpacedRecall(steps, checkinIdx, used = new Set(), prefer = new Set()) {
  const here = steps[checkinIdx];
  if (!here || here.type !== 'checkin') return null;

  /* How many spaced showings each chapter has already supplied. `used` holds ids and not chapters,
     so it is counted back off the step list rather than tracked — which also means the caller's
     contract does not change and a resumed session with a half-filled `used` set still spreads. */
  const contributed = new Map();
  const candidates = [];
  for (let i = 0; i < checkinIdx; i += 1) {
    const s = steps[i];
    if (s.type !== 'teach' || s.blockIndex >= here.blockIndex) continue;
    const r = s.section?.recall;
    if (!r || typeof r !== 'object') continue;
    const id = recallId(r, s);
    if (used.has(id)) { contributed.set(s.blockIndex, (contributed.get(s.blockIndex) || 0) + 1); continue; }
    candidates.push({ recall: r, id, fromStep: i, fromTitle: s.section.title || '', fromBlockIndex: s.blockIndex, fromBlockTitle: s.blockTitle });
  }

  // F055: a skipped recall is not gone. It comes back here, ahead of the default pick, so skipping
  // has a consequence the student can see.
  const skipped = candidates.find((c) => prefer.has(c.id));
  if (skipped) return skipped;

  /* V034. Spread first, age second. `candidates` is already in step order, so the reduce keeps the
     earliest chapter and the earliest recall inside it whenever the contribution counts tie — which
     is the old behaviour on the first pass over the chapters, and the whole of the change on the
     second. */
  return candidates.reduce((best, c) => {
    if (!best) return c;
    const a = contributed.get(c.fromBlockIndex) || 0;
    const b = contributed.get(best.fromBlockIndex) || 0;
    return a < b ? c : best;
  }, null);
}

/** A stable id for a recall even when the content has not minted one. */
export function recallId(recall, step) {
  return recall?.id || `${step?.key || 'recall'}:recall`;
}

/* ── the second showing of a reorder ───────────────────────────────────── */

/**
 * The order a reorder starts from on its spaced showing. Packet 7 moved the rule into the recall
 * contract (lib/recall-widgets.js): seeded by the recall id, never the identity, never with the
 * first item already in place, and never the first showing's order (F053, F113). Kept here as the
 * name the engine and the tests use.
 */
export function spacedPermutation(recall) {
  return reorderStartOrder(recall, 'spaced');
}

/** Clamp a saved step pointer into the current step range (F026: "Step 9 of 5"). */
export function clampStep(step, totalSteps) {
  if (!Number.isFinite(step) || totalSteps <= 0) return 0;
  return Math.max(0, Math.min(Math.floor(step), totalSteps - 1));
}

/**
 * The furthest step to STORE, given the one already stored and the one just reached.
 *
 * `furthest_step` is a high-water mark, so it needs the same clamp on the way in as on the way out.
 * Without one, a pointer written against a longer step list — a section rewritten smaller, or the
 * model above counting the same blocks differently from the one it replaced — is carried forward
 * for ever by the max and can never come back down. That is the other half of F026: "Step 20 of 9",
 * an empty body, and a "Next" that never becomes "Complete topic" because `isLastStep` can only be
 * true AT the last index, never past it. On 15 Sep 2026, 120 rows across 43 students were already
 * past their own total_steps. Clamping the carried-forward value as well as the new one lets a
 * poisoned row heal itself the next time the student takes a step.
 */
export function furthestStep(prev, step, totalSteps, complete = false) {
  if (totalSteps <= 0) return 0;
  const last = totalSteps - 1;
  if (complete) return last;
  return Math.max(clampStep(prev, totalSteps), clampStep(step, totalSteps));
}
