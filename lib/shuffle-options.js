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

/**
 * Rewrite option letters in prose so they still point at the option they always meant.
 *
 * Two safe forms, handled exactly:
 *
 *   1. A keyword list — "Option A", "Options A, C and D", "Statements A and B" — including when
 *      the whole thing sits inside brackets, as in "(Options A and C)". The list ends at the first
 *      token that is not a letter, a separator or a bracket, so "Option A describes area B only"
 *      moves A and leaves the Lorenz curve's area B alone.
 *   2. A bare bracketed letter — "TV ads (A), billboards (B)".
 *
 * Anything else is not guessed at. `(A is wrong)` is a real reference and `(A rise in demand)` is
 * the indefinite article, and no rule separates them without reading the sentence. Questions
 * carrying one of those are left unshuffled by `shuffleOptions` instead, which costs those few
 * questions their shuffle and costs nobody a corrupted explanation.
 *
 * This was a regex over the whole run, and it was wrong: the separator ate the whitespace the next
 * repetition needed, so only the FIRST letter of any list was rewritten. 18 references across 14
 * questions pointed at the wrong option, six explanations named one letter twice, and four told
 * the student the correct answer was a distractor. It passed its own test because the test reused
 * the same regex to find references, so it could not see its own blind spot. Caught in
 * verification; the test below it now walks the text independently.
 */
const KEYWORD = /^(Options?|Answers?|Statements?)$/;
const JOINER = /^(and|or)$/i;

/** Lossless split: every character lands in exactly one token, so join() rebuilds the input. */
function tokenise(text) {
  return String(text).match(/[A-Za-z][A-Za-z'\u2019-]*|\s+|[^\sA-Za-z]/g) || [];
}

export function remapOptionLetters(text, oldToNew) {
  if (!text) return text;

  const move = (L) => {
    const from = LETTERS.indexOf(L.toUpperCase());
    const to = from >= 0 ? oldToNew[from] : -1;
    return to >= 0 && to < LETTERS.length ? LETTERS[to] : L;
  };

  const t = tokenise(text);
  let inList = false;

  for (let i = 0; i < t.length; i += 1) {
    const tok = t[i];
    if (/^\s+$/.test(tok)) continue;

    if (KEYWORD.test(tok)) { inList = true; continue; }

    if (/^[A-F]$/.test(tok)) {
      // Form 2: a bare bracketed letter, "(A)". Brackets may be separated by nothing else.
      const prev = t.slice(0, i).reverse().find((x) => !/^\s+$/.test(x));
      const next = t.slice(i + 1).find((x) => !/^\s+$/.test(x));
      if (inList || (prev === '(' && next === ')')) { t[i] = move(tok); continue; }
      continue;
    }

    // Separators and brackets keep a list open; anything else closes it.
    if (inList && !(tok === ',' || tok === '&' || tok === '(' || tok === ')' || JOINER.test(tok))) {
      inList = false;
    }
  }

  return t.join('');
}

/**
 * Does this text mention an option letter in a form `remapOptionLetters` will not touch?
 *
 * Used to decline the shuffle rather than ship a wrong explanation. Deliberately cautious: a false
 * positive costs one question its shuffle, a false negative tells a student the right answer is a
 * distractor.
 */
export function hasUnhandledLetterReference(text, optionCount = 6) {
  if (!text) return false;
  const t = tokenise(text);
  let inList = false;
  for (let i = 0; i < t.length; i += 1) {
    const tok = t[i];
    if (/^\s+$/.test(tok)) continue;
    if (KEYWORD.test(tok)) { inList = true; continue; }
    if (/^[A-F]$/.test(tok)) {
      if (LETTERS.indexOf(tok) >= optionCount) { continue; }
      const prev = t.slice(0, i).reverse().find((x) => !/^\s+$/.test(x));
      const next = t.slice(i + 1).find((x) => !/^\s+$/.test(x));
      if (inList || (prev === '(' && next === ')')) continue;
      // A letter inside brackets that is not alone there — "(A is wrong)" — or one followed by
      // "is wrong" / "is correct" in the open. Both are references we cannot rewrite safely.
      if (prev === '(') return true;
      if (/^(is|are|was|were|describes?|refers?)$/i.test(String(next))) return true;
      continue;
    }
    if (inList && !(tok === ',' || tok === '&' || tok === '(' || tok === ')' || JOINER.test(tok))) {
      inList = false;
    }
  }
  return false;
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

  // Decline rather than corrupt: see hasUnhandledLetterReference.
  if (hasUnhandledLetterReference(question.explanation, options.length)) return question;

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
