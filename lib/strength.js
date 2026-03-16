/**
 * Strength Meter Utility
 * Tracks per-section "retrieval strength" using localStorage.
 * Strength decays over time (Ebbinghaus-style) to encourage spaced review.
 */

const DECAY_RATE = 0.85; // 15% decay per day

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
export function calcEffectiveStrength(data) {
  if (!data) return 0;

  const base = Math.min(
    100,
    20 + (data.reviews || 0) * 15 + (data.quizAccuracy || 0) * 20 + (data.pretestScore || 0) * 10
  );

  if (!data.lastReview) return Math.round(base);

  const daysSince = (Date.now() - data.lastReview) / (1000 * 60 * 60 * 24);
  const decayed = base * Math.pow(DECAY_RATE, daysSince);

  return Math.round(Math.max(0, Math.min(100, decayed)));
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
