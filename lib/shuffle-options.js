/**
 * Shuffle MCQ options so the answer is not always B.
 *
 * F074, critical. Measured across the live corpus: of 769 quiz questions, the correct answer is
 * option B in 492 of them. **A student who picks B every time, without reading the question,
 * scores 64%.** Option A is correct 4.8% of the time. Nothing shuffles anywhere — not the
 * pre-test, not the inline quiz, not the quiz tab, not the drill — so the pattern is learnable in
 * one session and, once learned, every score the product reports is meaningless.
 *
 * The shuffle is **deterministic**, seeded from the question text. Three reasons:
 *
 * 1. A random shuffle at render is a hydration bug. The server and the client would order the
 *    options differently and React would throw the server's markup away — the same failure as
 *    F118, which took four sessions to find.
 * 2. The answer must not move under a student who re-renders mid-question.
 * 3. Stored attempts record the option index they chose. A shuffle that changed between visits
 *    would silently reinterpret every attempt already in the table.
 *
 * 103 of the 769 explanations refer to options by letter — "Option A describes a mass market",
 * "TV ads (A), billboards (B)". Moving the options without touching those sentences would make
 * them lie, so the letters are remapped to where their option actually went. Only the shapes that
 * really refer to an option are touched, so "Plan B" and "Grade A" are left alone.
 */

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/** FNV-1a. Small, stable across engines, and good enough to decorrelate 769 short strings. */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** mulberry32: a tiny seeded PRNG, so the same question always shuffles the same way. */
function seeded(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Rewrite option letters in prose so they still point at the option they always meant. */
export function remapOptionLetters(text, oldToNew) {
  if (!text) return text;
  const move = (L) => {
    const from = LETTERS.indexOf(L.toUpperCase());
    const to = from >= 0 ? oldToNew[from] : -1;
    return to >= 0 && to < LETTERS.length ? LETTERS[to] : L;
  };
  return String(text)
    // "Option A", "Options C and D", "Answer B", "Statements A, B and C"
    .replace(/\b(Options?|Answers?|Statements?)((?:\s+[A-F]\b(?:\s*(?:,|and|or|&)\s*)?)+)/g,
      (m, word, run) => word + run.replace(/[A-F]\b/g, move))
    // "(A)", "(B)"
    .replace(/\(([A-F])\)/g, (m, L) => `(${move(L)})`);
}

/**
 * Returns the question with its options reordered and `correctIndex` moved to match.
 * Anything it cannot safely shuffle it returns untouched.
 *
 * @param {object} question  needs `options` and a numeric `correctIndex`
 * @param {string} salt      distinguishes surfaces if they ever need different orders
 */
export function shuffleOptions(question, salt = '') {
  const options = question?.options;
  const correct = question?.correctIndex;
  if (!Array.isArray(options) || options.length < 2) return question;
  if (typeof correct !== 'number' || correct < 0 || correct >= options.length) return question;

  const rand = seeded(hash(`${question.question || ''}|${salt}`));
  // order[newPosition] = oldIndex
  const order = options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const oldToNew = [];
  order.forEach((oldIndex, newIndex) => { oldToNew[oldIndex] = newIndex; });

  return {
    ...question,
    options: order.map((oldIndex) => options[oldIndex]),
    correctIndex: oldToNew[correct],
    explanation: remapOptionLetters(question.explanation, oldToNew),
    // The stem is deliberately NOT remapped. It is the key the answer log, the mistakes tab and
    // the drill ordering all match on, and rewriting it would orphan every record already stored.
    // No stem in the corpus refers to an option by letter; the 103 that do are all explanations.
  };
}

/** Shuffle a list, keeping each question's own deterministic order. */
export function shuffleAllOptions(questions, salt = '') {
  return (questions || []).map((q) => shuffleOptions(q, salt));
}
