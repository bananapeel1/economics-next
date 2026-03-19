/**
 * Spaced Repetition (SM-2) — Pure Functions
 * ==========================================
 * Per-question scheduling for the Smart Practice Engine.
 * No React, no Supabase, no browser APIs.
 */

const MIN_EASE = 1.3;
const MAX_EASE = 3.0;
const DEFAULT_EASE = 2.5;
const TEN_MINUTES_IN_DAYS = 10 / (60 * 24); // ~0.00694

/**
 * Create a default progress object for a new question.
 */
export function createDefaultProgress(sectionId, questionIndex) {
  return {
    sectionId,
    questionIndex,
    ease: DEFAULT_EASE,
    intervalDays: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastResult: null,
    lastConfidence: null,
  };
}

/**
 * Compute the next review schedule after answering a question.
 *
 * @param {Object} progress - Current progress object
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {string|null} confidence - 'guessed' | 'somewhat' | 'certain' | null
 * @returns {Object} Updated progress object
 */
export function computeNextReview(progress, isCorrect, confidence = null) {
  let { ease, intervalDays, repetitions } = progress;

  if (isCorrect) {
    repetitions += 1;

    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 3;
    } else {
      intervalDays = intervalDays * ease;
    }

    // Base ease increase for correct answer
    ease += 0.1;

    // Confidence modulation
    if (confidence === 'guessed') {
      ease -= 0.15; // net: -0.05 (still penalise lucky guesses)
      intervalDays *= 0.7; // come back sooner
    } else if (confidence === 'certain') {
      ease += 0.05; // net: +0.15 (reward confident knowledge)
    }
  } else {
    // Wrong answer — reset
    repetitions = 0;
    intervalDays = TEN_MINUTES_IN_DAYS;
    ease -= 0.2;

    // Extra penalty for overconfident wrong answers
    if (confidence === 'certain') {
      ease -= 0.1;
    }
  }

  // Clamp ease
  ease = Math.max(MIN_EASE, Math.min(MAX_EASE, ease));

  const nextReview = Date.now() + intervalDays * 24 * 60 * 60 * 1000;

  return {
    ...progress,
    ease: Math.round(ease * 100) / 100,
    intervalDays: Math.round(intervalDays * 1000) / 1000,
    repetitions,
    nextReview,
    lastResult: isCorrect,
    lastConfidence: confidence,
  };
}

/**
 * Build a prioritised question queue for a practice session.
 *
 * @param {Object} progressMap - Map of "sectionId:questionIndex" → progress object
 * @param {string[]} selectedSectionIds - Section IDs the user selected
 * @param {Object} allQuizData - Map of sectionId → question array
 * @param {number} sessionSize - Max questions in the session
 * @returns {Array} Queue of { sectionId, questionIndex, question, priority }
 */
export function buildQueue(progressMap, selectedSectionIds, allQuizData, sessionSize = 20) {
  const now = Date.now();
  const overdue = [];
  const unseen = [];

  for (const sectionId of selectedSectionIds) {
    const questions = allQuizData[sectionId] || [];

    for (let qi = 0; qi < questions.length; qi++) {
      const key = `${sectionId}:${qi}`;
      const progress = progressMap[key];
      const item = { sectionId, questionIndex: qi, question: questions[qi] };

      if (!progress) {
        // Never seen before
        unseen.push({ ...item, priority: 0 });
      } else if (progress.nextReview <= now) {
        // Due for review — more overdue = higher priority
        const overdueMs = now - progress.nextReview;
        overdue.push({ ...item, priority: overdueMs });
      }
      // Future reviews are skipped
    }
  }

  // Sort overdue by most overdue first
  overdue.sort((a, b) => b.priority - a.priority);

  // Shuffle unseen to avoid always starting with same section
  shuffle(unseen);

  // Build queue: 70% overdue, 30% new (with backfill)
  const overdueTarget = Math.min(overdue.length, Math.ceil(sessionSize * 0.7));
  const newTarget = Math.min(unseen.length, sessionSize - overdueTarget);
  const overdueBackfill = Math.min(overdue.length - overdueTarget, sessionSize - overdueTarget - newTarget);

  const queue = [
    ...overdue.slice(0, overdueTarget),
    ...unseen.slice(0, newTarget),
    ...overdue.slice(overdueTarget, overdueTarget + overdueBackfill),
  ];

  // Final shuffle to mix overdue and new together
  shuffle(queue);

  return queue.slice(0, sessionSize);
}

/** Fisher-Yates shuffle (in place) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
