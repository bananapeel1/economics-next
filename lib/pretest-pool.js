/**
 * Which questions the pre-test asks — one place, because two callers need the same answer:
 * PreTest renders them, and LearnModeTab's offer promises how many there will be.
 *
 * THE RULE: never a question a chapter check-in is going to ask.
 *
 * F079 removed that overlap once. It came back through the paywall. `freeQuizPayload()` sends a
 * signed-out student about ten questions — two for the Quiz tab preview, then one per chapter — so
 * almost everything they receive is spoken for, and the pool of questions nobody else will ask is
 * two, sometimes one. The old code padded up to three from the reserved set rather than show a
 * short test, and the padding was the check-in question. Measured by an independent verifier over
 * both corpora, signed out: 43 of 43 LIVE sections spoiled a question (108 in all) and 11 of 11
 * staged ones (12 in all). For a Pro student, who gets the whole bank, 0 of either.
 *
 * Afterwards: 0 everywhere. Pre-test length across the 43 live sections is 34 threes, 6 twos and
 * 3 ones — not the 41/2/0 this fix originally claimed, which came from a harness blind to the
 * sections served by the legacy distribute path.
 *
 * So: a short pre-test. Two honest questions beat three where the third is spoiled, and a question
 * you have just been shown the answer to measures nothing. With no unreserved question at all the
 * pre-test does not run — PreTest calls onDone and the offer is hidden, which is the existing
 * empty-pool path.
 */
export const PRETEST_MAX = 3;

const key = (q) => String(q?.question || '').replace(/\s+/g, ' ').trim();

export function pickPretestQuestions(quizData, reservedQuestions) {
  const quiz = Array.isArray(quizData) ? quizData : [];
  if (!quiz.length) return [];
  const reserved = new Set((Array.isArray(reservedQuestions) ? reservedQuestions : []).map(key));
  // Stable order, so a reload does not swap the questions under a half-finished test.
  return quiz.filter((q) => !reserved.has(key(q))).slice(0, PRETEST_MAX);
}
