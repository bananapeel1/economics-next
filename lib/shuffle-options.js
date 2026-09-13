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
const KEYWORD = /^(options?|answers?|statements?)$/i;
const JOINER = /^(and|or)$/i;
const SEPARATOR = new Set([',', '&', ';']);

/** Lossless split: every character lands in exactly one token, so join() rebuilds the input. */
function tokenise(text) {
  return String(text).match(/[A-Za-z][A-Za-z'\u2019-]*|\s+|[^\sA-Za-z]/g) || [];
}

const isSpace = (tok) => /^\s+$/.test(tok);
const isLetter = (tok) => /^[A-F]$/.test(tok);

/** Index of the next non-whitespace token at or after i, or -1. */
function nextReal(t, i) {
  for (let k = i; k < t.length; k += 1) if (!isSpace(t[k])) return k;
  return -1;
}

/** Index of the token closing the bracket that opens at i, or -1 if it never closes. */
function closeBracket(t, i) {
  for (let k = i + 1; k < t.length; k += 1) if (t[k] === ')') return k;
  return -1;
}

/**
 * Walk the text once, calling back for each token that is an option-letter reference.
 *
 * Shared by the rewriter and by the safety check, so the two can never disagree about what counts
 * as a reference. `onLetter(index)` is called for every reference; `onUnhandled()` for a letter
 * that looks like a reference but sits in a form we will not rewrite.
 *
 * Three list rules, each learned from a real failure in the corpus:
 *
 *  - The keyword may be lowercase. "but option D says 'all goods'" is a reference, and a
 *    case-sensitive test left it alone while the shuffle moved the answer underneath it — the
 *    explanation then told the student the correct answer was wrong.
 *  - A bracketed gloss does not end the list. "Options A (tax cuts), B (deregulation), and D
 *    (privatisation)" is one list; treating "tax" as the end of it rewrote only the first letter
 *    and left two pointing at the wrong policy.
 *  - A keyword only opens a list when a letter actually follows it, so "the options available to a
 *    firm" is prose, not a list.
 */
function walkReferences(text, onLetter, onUnhandled) {
  const t = tokenise(text);
  let inList = false;

  for (let i = 0; i < t.length; i += 1) {
    const tok = t[i];
    if (isSpace(tok)) continue;

    if (KEYWORD.test(tok)) {
      const n = nextReal(t, i + 1);
      inList = n >= 0 && (isLetter(t[n]) || t[n] === '(');
      continue;
    }

    if (isLetter(tok)) {
      const p = (() => { for (let k = i - 1; k >= 0; k -= 1) if (!isSpace(t[k])) return t[k]; return null; })();
      const n = nextReal(t, i + 1);
      const bare = p === '(' && n >= 0 && t[n] === ')';
      if (inList || bare) { onLetter(t, i); continue; }
      // Inside a bracket but not alone there — "(A is wrong)" — or a letter the prose leans on.
      if (p === '(') { onUnhandled(); continue; }
      continue;
    }

    if (!inList) continue;

    if (SEPARATOR.has(tok) || JOINER.test(tok)) continue;

    if (tok === '(') {
      // A gloss between the letters. Step over it; a lone letter inside is still a reference.
      const close = closeBracket(t, i);
      if (close < 0) { inList = false; continue; }
      const inner = nextReal(t, i + 1);
      if (inner >= 0 && inner < close && isLetter(t[inner]) && nextReal(t, inner + 1) === close) {
        onLetter(t, inner);
      }
      i = close;
      continue;
    }

    if (tok === ')') continue;

    inList = false;
  }

  return t;
}

export function remapOptionLetters(text, oldToNew) {
  if (!text) return text;
  const move = (L) => {
    const from = LETTERS.indexOf(L.toUpperCase());
    const to = from >= 0 ? oldToNew[from] : -1;
    return to >= 0 && to < LETTERS.length ? LETTERS[to] : L;
  };
  const t = walkReferences(text, (toks, i) => { toks[i] = move(toks[i]); }, () => {});
  return t.join('');
}

/**
 * Does this text mention an option letter in a form `remapOptionLetters` will not rewrite?
 *
 * Used to decline the shuffle rather than ship a wrong explanation. A false positive costs one
 * question its shuffle; a false negative tells a student the correct answer is a distractor.
 */
export function hasUnhandledLetterReference(text) {
  if (!text) return false;
  let unhandled = false;
  walkReferences(text, () => {}, () => { unhandled = true; });
  return unhandled;
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
  if (hasUnhandledLetterReference(question.explanation)) return question;

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
