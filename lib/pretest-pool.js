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
 * short test, and the padding was the check-in question: measured across the eleven rewritten
 * sections, 11 of 11 asked a signed-out student something the check-in then asked again minutes
 * later with the answer already revealed. For a Pro student, who gets the whole bank, 0 of 11.
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
