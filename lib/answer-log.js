/**
 * What the student actually got wrong, kept per section.
 *
 * F017. The inline quiz used to call `onResult(correct)`, which incremented a counter on the
 * completion screen, and that was the entire afterlife of a wrong answer: it did not come back in
 * the post-test, it did not affect the review schedule, and it was not recorded anywhere a later
 * session could see. The "How sure were you?" row wrote a confidence record to localStorage that
 * nothing has ever read. A student could answer the same question wrong on three consecutive
 * visits and the product would treat all three as new.
 *
 * One log per section, keyed by the question text rather than by step index, because step indices
 * shift whenever the content is re-blocked and the same question then reads as a different one.
 *
 * Signed-out students keep this locally, which is all there is for them. It is deliberately not
 * sent to the server: `user_section_state` holds the summary the schedule needs (accuracy, review
 * count), and per-question history needs a table that does not exist yet.
 */

const PREFIX = 'revvy_answers';

function key(subjectId, sectionId) {
  return `${PREFIX}_${subjectId}_${sectionId}`;
}

/** Stable identity for a question. Text, normalised, so re-blocking content cannot rename it. */
export function questionKey(question) {
  const text = typeof question === 'string' ? question : question?.question;
  return (text || '').replace(/\s+/g, ' ').trim().slice(0, 160);
}

export function readAnswerLog(subjectId, sectionId) {
  if (typeof window === 'undefined' || !subjectId || !sectionId) return [];
  try {
    const raw = localStorage.getItem(key(subjectId, sectionId));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(subjectId, sectionId, entries) {
  if (typeof window === 'undefined' || !subjectId || !sectionId) return;
  try {
    // Most recent 200 questions is far more than any section holds; the cap exists so a student
    // who revisits a section for a year cannot grow this without bound.
    localStorage.setItem(key(subjectId, sectionId), JSON.stringify(entries.slice(-200)));
  } catch { /* private window or quota: the drill falls back to its old shuffle */ }
}

/** Upsert one answer. Keeps any confidence already given for that question. */
export function recordAnswer(subjectId, sectionId, question, correct) {
  const k = questionKey(question);
  if (!k) return;
  const log = readAnswerLog(subjectId, sectionId);
  const existing = log.find((e) => e.q === k);
  if (existing) {
    existing.correct = !!correct;
    existing.ts = Date.now();
    existing.attempts = (existing.attempts || 1) + 1;
    // A new attempt is a new state of mind: last time's confidence does not describe this answer.
    existing.confidence = null;
  } else {
    log.push({ q: k, correct: !!correct, confidence: null, attempts: 1, ts: Date.now() });
  }
  write(subjectId, sectionId, log);
}

/** Attach confidence to the answer just given. */
export function recordConfidence(subjectId, sectionId, question, level) {
  const k = questionKey(question);
  if (!k) return;
  const log = readAnswerLog(subjectId, sectionId);
  const existing = log.find((e) => e.q === k);
  if (existing) { existing.confidence = level; existing.ts = Date.now(); }
  else log.push({ q: k, correct: null, confidence: level, attempts: 0, ts: Date.now() });
  write(subjectId, sectionId, log);
}

/**
 * Confidence × correctness, lower is practised sooner.
 *
 * The ordering is the point of collecting confidence at all. Being wrong while certain is the
 * most valuable thing this product can find out about a student: it is a belief, not a slip, and
 * it is the one a marker will punish. Being right while guessing is the second, because the
 * score already looks fine and nothing else would ever flag it.
 */
export function priority(entry) {
  if (!entry || entry.correct === null || entry.correct === undefined) return 2.5; // never answered
  if (!entry.correct) {
    if (entry.confidence === 'certain') return 0;
    if (entry.confidence === 'somewhat') return 1;
    return 2;
  }
  if (entry.confidence === 'guessed') return 3;
  if (entry.confidence === 'somewhat') return 4;
  return 5;
}

/**
 * Order questions so the ones worth re-asking come first, shuffling within a priority band so a
 * repeated drill is not identical. `rand` is injected so this is testable.
 */
export function orderByPriority(questions, log, rand = Math.random) {
  const byKey = new Map((log || []).map((e) => [e.q, e]));
  return [...(questions || [])]
    .map((question, i) => ({ question, i, p: priority(byKey.get(questionKey(question))), r: rand() }))
    .sort((a, b) => (a.p - b.p) || (a.r - b.r))
    .map((x) => x.question);
}

/** How many questions in this section the student has got wrong and not since put right. */
export function outstandingMisses(subjectId, sectionId) {
  return readAnswerLog(subjectId, sectionId).filter((e) => e.correct === false).length;
}
