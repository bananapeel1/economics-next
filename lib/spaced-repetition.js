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
 * Smart Practice asks for confidence WITH the answer ("Check answer" or "Check — I guessed"), so
 * it is not hindsight: once the reveal shows a student they were right, "certain" is what they
 * say. Only two levels change what should happen next, so only two are asked for.
 *
 * - right and sure: the normal SM-2 step.
 * - right but guessed: not learned yet. The step does not advance (so it cannot count towards
 *   mastery, which is repetitions >= 3) and it comes back tomorrow. It used to advance and come
 *   back in 17 hours instead of 24, so a lucky guess was treated as knowledge.
 * - wrong: reset to ten minutes. Wrong while sure costs extra ease, because a confident wrong
 *   answer is a misconception, not a slip.
 *
 * @param {Object} progress - Current progress object
 * @param {boolean} isCorrect - Whether the answer was correct
 * @param {string|null} confidence - 'guessed' | 'certain' | null. Learn Mode's 'somewhat', and
 *   null from flashcards and written practice, take the plain SM-2 step.
 * @returns {Object} Updated progress object
 */
export function computeNextReview(progress, isCorrect, confidence = null) {
  let { ease, intervalDays, repetitions } = progress;

  if (isCorrect && confidence === 'guessed') {
    intervalDays = 1;
    ease -= 0.05;
  } else if (isCorrect) {
    repetitions += 1;

    if (repetitions === 1) {
      intervalDays = 1;
    } else if (repetitions === 2) {
      intervalDays = 3;
    } else {
      intervalDays = intervalDays * ease;
    }

    ease += 0.1;
    if (confidence === 'certain') ease += 0.05;
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
 * What an answer says about the student, from correctness and the confidence given with it.
 * The session summary groups by this, so the four names are the student-facing ones.
 *
 * @returns {'knew'|'lucky'|'misconception'|'gap'}
 */
export function classifyAnswer(isCorrect, confidence) {
  const guessed = confidence === 'guessed';
  if (isCorrect) return guessed ? 'lucky' : 'knew';
  return guessed ? 'gap' : 'misconception';
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
export function buildQueue(progressMap, selectedSectionIds, allQuizData, sessionSize = 20, options = {}) {
  const { includeNotDue = false } = options;
  const now = Date.now();
  const overdue = [];
  const unseen = [];
  const notDue = [];

  for (const sectionId of selectedSectionIds) {
    const questions = allQuizData[sectionId] || [];

    for (let qi = 0; qi < questions.length; qi++) {
      // Written practice hands us a marks-filtered array, so qi is not the question's
      // position in the bank that the renderer and the stored schedule are keyed on.
      // Quiz and flashcards pass raw bank arrays: no bankIndex, so qi stands.
      const idx = questions[qi]?.bankIndex ?? qi;
      const key = `${sectionId}:${idx}`;
      const progress = progressMap[key];
      const item = { sectionId, questionIndex: idx, question: questions[qi] };

      if (!progress) {
        // Never seen before
        unseen.push({ ...item, sectionId, priority: 0 });
      } else if (progress.nextReview <= now) {
        // Due for review — more overdue = higher priority
        const overdueMs = now - progress.nextReview;
        overdue.push({ ...item, sectionId, priority: overdueMs });
      } else {
        // Scheduled, not yet due. Normally skipped; drawn on only when the student has asked to
        // practise early, so "nothing due" can be a real state instead of an empty screen (F078).
        notDue.push({ ...item, sectionId, priority: -(progress.nextReview - now), nextReview: progress.nextReview });
      }
    }
  }

  // Sort overdue by most overdue first
  overdue.sort((a, b) => b.priority - a.priority);

  // F084: a plain shuffle let one topic dominate — pick 20 at random from a pool where one
  // section holds 25 of 40 questions and that section supplies most of the session. Interleave
  // by section first, so a student who picked five topics practises five topics.
  shuffle(unseen);
  const interleaved = roundRobinBySection(unseen);

  // Build queue: 70% overdue, 30% new (with backfill)
  const overdueTarget = Math.min(overdue.length, Math.ceil(sessionSize * 0.7));
  const newTarget = Math.min(interleaved.length, sessionSize - overdueTarget);
  const overdueBackfill = Math.min(overdue.length - overdueTarget, sessionSize - overdueTarget - newTarget);

  const queue = [
    ...overdue.slice(0, overdueTarget),
    ...interleaved.slice(0, newTarget),
    ...overdue.slice(overdueTarget, overdueTarget + overdueBackfill),
  ];

  // Practising early: only once nothing is due and nothing is unseen, and soonest-due first so
  // the student reviews what is closest to slipping.
  if (includeNotDue && queue.length < sessionSize) {
    notDue.sort((a, b) => a.nextReview - b.nextReview);
    queue.push(...notDue.slice(0, sessionSize - queue.length).map((x) => ({ ...x, early: true })));
  }

  // Final shuffle to mix overdue and new together
  shuffle(queue);

  return queue.slice(0, sessionSize);
}

/**
 * Deal items out one section at a time, so a long section cannot crowd out the others.
 * Input order within a section is preserved, which keeps the caller's shuffle meaningful.
 */
function roundRobinBySection(items) {
  const bySection = new Map();
  for (const item of items) {
    if (!bySection.has(item.sectionId)) bySection.set(item.sectionId, []);
    bySection.get(item.sectionId).push(item);
  }
  const lanes = [...bySection.values()];
  const out = [];
  let drew = true;
  while (drew) {
    drew = false;
    for (const lane of lanes) {
      const next = lane.shift();
      if (next) { out.push(next); drew = true; }
    }
  }
  return out;
}

/**
 * What a section holds right now, so the UI can say "nothing is due" rather than showing an
 * empty screen that reads as missing content (F078).
 */
export function queueStats(progressMap, selectedSectionIds, allQuizData) {
  const now = Date.now();
  let total = 0, due = 0, unseen = 0, scheduled = 0;
  let nextReview = null;
  for (const sectionId of selectedSectionIds) {
    const questions = allQuizData[sectionId] || [];
    for (let qi = 0; qi < questions.length; qi++) {
      total++;
      const idx = questions[qi]?.bankIndex ?? qi;
      const progress = progressMap[`${sectionId}:${idx}`];
      if (!progress) { unseen++; continue; }
      if (progress.nextReview <= now) { due++; continue; }
      scheduled++;
      if (nextReview === null || progress.nextReview < nextReview) nextReview = progress.nextReview;
    }
  }
  return { total, due, unseen, scheduled, nextReview };
}

/** Fisher-Yates shuffle (in place) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
