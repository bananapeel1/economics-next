/**
 * How much of a paywalled surface a free student may see, in one place.
 *
 * F086. These numbers lived only inside the three tab components, which each sliced a full array
 * the server had already sent. So the paywall was a client-side render decision on top of a
 * complete payload: `GET /api/sections/[id]` returned every quiz question with its `correctIndex`,
 * every flashcard and every extras chain to anyone who asked, signed in or not. The server now
 * slices, and the components render what they are given.
 *
 * Keep the numbers here identical to what the components show in their paywall copy, and keep the
 * copy driven by the `counts` the API returns rather than by the length of the sliced array —
 * otherwise "you have previewed 2 of 25" turns into "2 of 2".
 */
export const PREVIEW_LIMITS = {
  quiz: 2,
  flashcards: 2,
  extrasChains: 1,
  extrasEvaluation: 1,
};

/**
 * The free quiz payload, and the pins that point into it.
 *
 * `quiz: 2` above is what the Quiz TAB shows, and that is unchanged. It was also the whole payload,
 * which starved a different surface: Learn Mode is a free feature, its optional pre-test wants three
 * questions, and each chapter check-in pins one of its own. So a signed-out student got the pre-test
 * and then a check-in with no question at every chapter, on the busiest path in the product.
 *
 * Raising the number does not fix it, and this is the part worth reading before someone tries.
 * **A block pins its question by ARRAY POSITION** (`quizIndices`; `LearnModeTab` resolves them
 * against the array the API sent), and the section template gives each chapter its own questions
 * spread through the bank — chapter 5's sit at 29-31. A prefix slice therefore drops every chapter
 * pinned past the cut: measured over the four rewritten sections, a flat "first 8" serves 1 to 3 of
 * their 5 to 6 chapters, and today's cap of 2 serves 0 or 1. That is a live defect, not a new one.
 * And sending a NON-prefix set — the right questions, gathered from across the bank — is worse
 * unless the pins move with them, because position 14 in the bank is a different question at
 * position 3 of the payload. Hence the remap below, and the test that fails without it.
 *
 * So the server sends the questions the section actually needs — the tab's two, plus the first
 * unused pin of each chapter — and rewrites that section's `quizIndices` to point at their new
 * positions. The client is unchanged, ids (packet 2 onward) are untouched because they survive a
 * slice, and a premium student gets the whole bank with its pins as authored.
 *
 * `FREE_QUIZ_MAX` bounds exposure whatever the content does: a section pinning twenty would
 * otherwise hand a free account most of its bank.
 */
export const FREE_QUIZ_MAX = 10;

export function freeQuizPayload(allQuiz, allContent) {
  const quiz = Array.isArray(allQuiz) ? allQuiz : [];
  const content = Array.isArray(allContent) ? allContent : [];
  if (!quiz.length) return { quiz: [], content };

  const picked = [];              // items, in payload order
  const positionOf = new Map();   // original index -> payload index
  const take = (i) => {
    if (i == null || i < 0 || i >= quiz.length) return null;
    if (positionOf.has(i)) return positionOf.get(i);
    if (picked.length >= FREE_QUIZ_MAX) return null;
    positionOf.set(i, picked.length);
    picked.push(quiz[i]);
    return positionOf.get(i);
  };

  // The tab's preview first: QuizTab renders the first PREVIEW_LIMITS.quiz of what it is given.
  for (let i = 0; i < PREVIEW_LIMITS.quiz; i += 1) take(i);

  // Then one per chapter, chosen the way LearnModeTab chooses: first pin not already spoken for.
  const byId = new Map(quiz.map((q, i) => [q && q.id, i]));
  const claimed = new Set();
  const nextContent = content.map((block) => {
    if (!block || typeof block !== 'object') return block;

    if (Array.isArray(block.quizIds) && block.quizIds.length) {
      const original = block.quizIds.map((id) => byId.get(id)).find((i) => i != null && !claimed.has(i));
      if (original != null && take(original) != null) claimed.add(original);
      return block; // ids survive a slice untouched
    }

    if (Array.isArray(block.quizIndices) && block.quizIndices.length) {
      const original = block.quizIndices.find((i) => i >= 0 && i < quiz.length && !claimed.has(i));
      const pos = original == null ? null : take(original);
      if (pos == null) return { ...block, quizIndices: [] };
      claimed.add(original);
      return { ...block, quizIndices: [pos] };
    }

    return block;
  });

  return { quiz: picked, content: nextContent };
}

/** Tabs a free student may use in full. */
export const FREE_SURFACES = ['content', 'notes', 'diagrams', 'practice'];

/** Tabs a free student sees a capped preview of. */
export const PREVIEW_SURFACES = ['quiz', 'flashcards', 'extras'];

/** Tabs that need a subscription, with no preview at all. */
export const PAID_SURFACES = ['mistakes'];

/**
 * The one description of what a section looks like to a given reader.
 *
 * Two callers need it and they must not drift: `GET /api/sections/[id]`, which knows who is asking,
 * and the topic pages, which do not and never can. A topic page carries `revalidate` and
 * `generateStaticParams` — one document is built and served to everyone — so it may only ever hold
 * the free preview. That is not a limitation to work around; it is the rule. An entitlement check
 * on those pages would force them dynamic and undo the caching work that took them to a CDN hit.
 *
 * Before this existed the pages read all eight tables with the anonymous key and shipped the lot:
 * every quiz question with its `correctIndex`, the flashcards, the extras chains and the paid-only
 * common mistakes, in the HTML of a page that needs no account (V007). The Quiz tab sliced to two
 * in the browser, so it looked gated. Measured on `supply`: the API correctly sent 3 questions
 * while the completion screen's drill offered 25, because the drill read the page payload.
 *
 * `paidPending` is the part that makes the upgrade honest. It says "not here yet", which is a
 * different fact from "this section has none" — without it a Pro student's first paint is
 * indistinguishable from a section with an empty bank, and that is how a paywall flash starts.
 */
export function sectionPayload(tables, { isPremium = false } = {}) {
  const arr = (v) => (Array.isArray(v) ? v : []);
  const content = arr(tables?.content);
  const allQuiz = arr(tables?.quiz);
  const allCards = arr(tables?.flashcards);
  const rawExtras = tables?.extras || { chains: [], evaluation: [] };
  const chains = arr(rawExtras.chains);
  const evaluation = arr(rawExtras.evaluation);
  const mistakes = arr(tables?.mistakes);

  const cap = (list, n) => (isPremium ? list : list.slice(0, n));
  const free = isPremium ? null : freeQuizPayload(allQuiz, content);

  return {
    // Free, unchanged, no account needed.
    content: isPremium ? content : free.content,
    notes: arr(tables?.notes),
    diagrams: arr(tables?.diagrams),
    practice: arr(tables?.practice),

    // Preview then paywall. Sliced on the server, never in the browser.
    quiz: isPremium ? allQuiz : free.quiz,
    flashcards: cap(allCards, PREVIEW_LIMITS.flashcards),
    extras: {
      chains: cap(chains, PREVIEW_LIMITS.extrasChains),
      evaluation: cap(evaluation, PREVIEW_LIMITS.extrasEvaluation),
    },

    // Paid, no preview at all.
    mistakes: isPremium ? mistakes : [],

    // True sizes, so paywall copy stays honest once the arrays are capped.
    counts: {
      quiz: allQuiz.length,
      flashcards: allCards.length,
      extrasChains: chains.length,
      extrasEvaluation: evaluation.length,
      mistakes: mistakes.length,
    },
    isPremium,
  };
}

/**
 * What a cached page may hold. It is `sectionPayload` with the counts of the paid surfaces removed
 * as well as their contents — a page that says "25 questions" while sending 3 has told a reader
 * how big the bank is, which is not the leak but is not the page's business either — plus the flag
 * the client reads to know it must fetch the rest.
 */
export function cachedPagePayload(tables) {
  return { ...sectionPayload(tables, { isPremium: false }), paidPending: true };
}
