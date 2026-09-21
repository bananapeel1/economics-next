/**
 * Strength Meter
 *
 * F004. The old model was `base * 0.85^days`: a flat 15% a day, no matter how many times the
 * student had successfully recalled the topic. So base after finishing a section was about 45,
 * which is amber — the completion screen told a student who had just done everything right that
 * they were half way. Two days later it was red, and after a week about 11%.
 *
 * That inverts what spacing is for. In every real model of forgetting, each successful retrieval
 * makes the next forgetting curve FLATTER. Reviewing should buy time, and here it bought nothing.
 *
 * The model now is the standard one: a stability in days that grows with each successful review,
 * and retention decaying exponentially against it.
 *
 *     strength = 100 * exp(-daysSinceReview / stability)
 *
 * A student who has just finished reads ~100 and is green. One who reviewed three times a week ago
 * is still green, because three retrievals bought about two weeks of stability. One who finished
 * once and never came back goes red inside a week, which is true and is the point.
 */

// How much one successful retrieval multiplies stability. 2.3 is the SM-2 family's default ease
// and is what the practice engine already uses, so the two agree about what a review is worth.
const STABILITY_GROWTH = 2.3;

// Stability in days after a single exposure, before any review multiplies it.
const INITIAL_STABILITY = 1.2;

function storageKey(subjectId, sectionId) {
  return `revvy_strength_${subjectId}_${sectionId}`;
}

/** Get raw strength data from localStorage */
export function getStrengthData(subjectId, sectionId) {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey(subjectId, sectionId));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Save strength data to localStorage */
export function setStrengthData(subjectId, sectionId, data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(storageKey(subjectId, sectionId), JSON.stringify(data));
  } catch {}
}

/**
 * Calculate effective (time-decayed) strength 0–100.
 * Base strength rises with reviews, quiz accuracy, and pre-test score.
 * Then decays 15% per day since last review.
 */
/**
 * Days this topic should survive before it needs seeing again.
 * Grows with successful reviews and with how well they went, so a topic that keeps being recalled
 * correctly decays more slowly each time — which is the whole point of spacing.
 */
export function calcStability(data) {
  if (!data) return INITIAL_STABILITY;
  const reviews = Math.max(0, data.reviews || 0);
  // Accuracy scales the growth between about half and full: recalling it badly still counts, but
  // buys less time than recalling it cleanly.
  const accuracy = typeof data.quizAccuracy === 'number' ? Math.max(0, Math.min(1, data.quizAccuracy)) : 0.6;
  const growth = Math.pow(STABILITY_GROWTH * (0.55 + accuracy * 0.45), reviews);
  return INITIAL_STABILITY * growth;
}

/** Effective strength 0-100: retention against the stability the student has actually earned. */
export function calcEffectiveStrength(data) {
  if (!data) return 0;
  if (!data.lastReview) return 0;

  const daysSince = Math.max(0, (Date.now() - data.lastReview) / (1000 * 60 * 60 * 24));
  const stability = calcStability(data);
  const retention = Math.exp(-daysSince / stability);

  return Math.round(Math.max(0, Math.min(100, retention * 100)));
}

/**
 * When this topic next needs seeing, as a timestamp. The completion screen should show a date the
 * student can act on rather than a percentage that only ever falls (F004, and the audit's point
 * that "next review: Thursday" beats a decaying bar).
 */
export function nextReviewAt(data) {
  if (!data?.lastReview) return null;
  // 60 is the green threshold below, so this is the moment the meter would stop being green.
  const days = calcStability(data) * Math.log(100 / 60);
  return data.lastReview + days * 24 * 60 * 60 * 1000;
}

/** Map effective strength to a color class: green / amber / red */
export function getStrengthColor(effective) {
  if (effective >= 60) return 'green';
  if (effective >= 30) return 'amber';
  return 'red';
}

/**
 * Record a review (quiz completion, spaced review, etc.).
 * Increments review count, updates lastReview timestamp + quiz accuracy.
 */
export function recordReview(subjectId, sectionId, score) {
  const existing = getStrengthData(subjectId, sectionId) || {
    strength: 0,
    lastReview: null,
    reviews: 0,
    quizAccuracy: 0,
    pretestScore: 0,
  };

  const updated = {
    ...existing,
    reviews: (existing.reviews || 0) + 1,
    lastReview: Date.now(),
    quizAccuracy: score != null ? score : existing.quizAccuracy,
  };

  setStrengthData(subjectId, sectionId, updated);
  return updated;
}

/**
 * Record pre-test score (0–1) into strength data.
 */
export function recordPretest(subjectId, sectionId, score) {
  const existing = getStrengthData(subjectId, sectionId) || {
    strength: 0,
    lastReview: null,
    reviews: 0,
    quizAccuracy: 0,
    pretestScore: 0,
  };

  const updated = {
    ...existing,
    pretestScore: score,
    lastReview: existing.lastReview || Date.now(),
  };

  setStrengthData(subjectId, sectionId, updated);
  return updated;
}
