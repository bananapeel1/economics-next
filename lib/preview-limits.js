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
/* How many unclaimed questions the payload keeps back for the pre-test. Three is what PreTest asks
   for; lib/pretest-pool.js owns the rule about which ones it may use. */
export const PRETEST_HEADROOM = 3;

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

  /* CHAPTERS FIRST (V016).
   *
   * This used to spend PREVIEW_LIMITS.quiz (2) on the Quiz tab before taking a single pin, which
   * left room for exactly 8 chapters under FREE_QUIZ_MAX. A ninth or tenth chapter got
   * `quizIndices: []` — a check-in that says "and a quick question" and then has none, which is the
   * defect this function exists to prevent. packet-21 measures-economic-performance has ten blocks
   * and shipped two of them empty; it was staged for publish. Packet 27 chose seven chapters to
   * stay clear of the ceiling, so it had begun shaping the content itself.
   *
   * The tab never needed its own items: QuizTab renders the first PREVIEW_LIMITS.quiz of whatever
   * it is handed. So take the pins first and let the tab show the first two of those. Measured over
   * 58 sections: chapters served 210/212 -> 212/212, and the average a signed-out reader receives
   * goes DOWN, 7.48 -> 7.26, because two dedicated slots stop being spent. No freemium boundary
   * moves, which is why this did not need the cap raised.
   *
   * The ceiling is ten chapters now rather than eight. At nine or ten the payload is full, so
   * PRETEST_HEADROOM gets nothing and the pre-test does not run — it hides rather than spoils
   * itself (lib/pretest-pool.js). One section in the corpus is in that position today.
   */
  // One per chapter, chosen the way LearnModeTab chooses: first pin not already spoken for.
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

  /* The tab's preview, only if the chapters did not already fill it. */
  for (let i = 0; i < quiz.length && picked.length < PREVIEW_LIMITS.quiz; i += 1) take(i);

  /*
   * Headroom for the pre-test (V015).
   *
   * Everything taken so far is spoken for: the first PREVIEW_LIMITS.quiz render in the Quiz tab,
   * and the rest are the questions each chapter's check-in will ask. PreTest refuses to ask a
   * question a check-in will ask again — see lib/pretest-pool.js for why — so on a section where
   * the pins claim the whole payload there is nothing left and the pre-test does not run. Measured
   * over the 43 live sections: 22 of them, because their pins are 0,1,2… in block order and so
   * claim the preview items themselves (the `pins.identity` debt).
   *
   * So top up with questions nobody has claimed, to PRETEST_MAX, still bounded by FREE_QUIZ_MAX.
   * On the live corpus that moves the average a signed-out student receives from 3.65 to 6.60 —
   * from a fifth of the bank to a bit over a third, well inside the cap, and against 25 before the
   * API was gated. It is the only way the fix reaches sections nobody has rewritten yet.
   *
   * (An earlier version of this comment said 5.6. That came from a harness that resolved pinned
   * blocks only and was blind to the 21 live sections LearnModeTab serves through its legacy
   * `distributeItems` fallback — see V015's verification. 6.60 is the measured figure.)
   *
   * `claimed` holds ORIGINAL indices, so a question is spare when no block resolved to it.
   */
  const spare = [];
  for (let i = 0; i < quiz.length && spare.length < PRETEST_HEADROOM; i += 1) {
    if (positionOf.has(i) || claimed.has(i)) continue;
    spare.push(i);
  }
  for (const i of spare) take(i);

  return { quiz: picked, content: nextContent };
}

/** Tabs a free student may use in full. */
export const FREE_SURFACES = ['content', 'notes', 'diagrams', 'practice'];

/** Tabs a free student sees a capped preview of. */
export const PREVIEW_SURFACES = ['quiz', 'flashcards', 'extras'];

/** Tabs that need a subscription, with no preview at all. */
export const PAID_SURFACES = ['mistakes'];

/**
 * The whole section response body, for one student, in one place. V007.
 *
 * `GET /api/sections/[id]` was not the only door. Both topic pages and the homepage are server
 * components that read all eight tables with the ANON client and hand the result to `StudyApp` as
 * `initialSectionData`, so every quiz question with its `correctIndex`, every flashcard, every
 * extras chain and the paid-only common mistakes sat in the HTML of a page that needs no account.
 * The Quiz tab still sliced to two in the browser, which is why it looked gated; Learn Mode's Quick
 * Fire drill read the page payload and offered the whole bank. Measured signed out on `supply`: the
 * API returned 3 of 25 while the drill offered 25.
 *
 * The lesson of F086 was that a cap in the component is a picture of a paywall. The lesson of this
 * one is that a cap in ONE server is not enough either, so the shape of the fix is a single
 * function every server path calls: the route below, both `[unit]/[topic]` pages, and `app/page.js`.
 * Two copies of a cap is how `PREVIEW_LIMITS.quiz` and the Learn Mode pins drifted apart.
 *
 * Callers that cannot know who is asking pass `isPremium: false`. A page that may be cached — and
 * these pages carry `revalidate` and `generateStaticParams` — may only ever hold the free preview,
 * whatever the entitlement of whoever warmed the cache. The client upgrades through this route,
 * which is the only path that checks entitlement.
 *
 * `isPremium` is returned on the body so the client can tell a preview from a full payload without
 * re-deriving it. `StudyApp` reads it to decide whether it still owes an entitled fetch.
 */
export function sectionPayload(tables, { isPremium = false } = {}) {
  const list = (v) => (Array.isArray(v) ? v : []);
  const allContent = list(tables?.content);
  const allQuiz = list(tables?.quiz);
  const allCards = list(tables?.flashcards);
  const allMistakes = list(tables?.mistakes);
  const rawExtras = (tables?.extras && typeof tables.extras === 'object') ? tables.extras : {};
  const chains = list(rawExtras.chains);
  const evaluation = list(rawExtras.evaluation);

  const cap = (items, n) => (isPremium ? items : items.slice(0, n));

  /* The quiz is not a flat slice: a block pins its question by array position, so slicing the array
     repoints the pins. freeQuizPayload picks the questions the section needs and rewrites that
     section's pins to match what is sent. Premium gets the bank and the pins as authored. */
  const free = isPremium ? null : freeQuizPayload(allQuiz, allContent);

  return {
    // Free, no account needed.
    content: isPremium ? allContent : free.content,
    notes: list(tables?.notes),
    diagrams: list(tables?.diagrams),
    practice: list(tables?.practice),

    // Preview then paywall. Sliced on the server, not in the browser.
    quiz: isPremium ? allQuiz : free.quiz,
    flashcards: cap(allCards, PREVIEW_LIMITS.flashcards),
    extras: {
      chains: cap(chains, PREVIEW_LIMITS.extrasChains),
      evaluation: cap(evaluation, PREVIEW_LIMITS.extrasEvaluation),
    },

    // Paid, no preview.
    mistakes: isPremium ? allMistakes : [],

    // True sizes, so paywall copy stays honest once the arrays are capped.
    counts: {
      quiz: allQuiz.length,
      flashcards: allCards.length,
      extrasChains: chains.length,
      extrasEvaluation: evaluation.length,
      mistakes: allMistakes.length,
    },
    isPremium,
  };
}

/**
 * What a server-rendered PAGE may put in its HTML: the free surfaces, and nothing else. V007.
 *
 * The brief for this finding asked the pages to ship the same capped preview the API sends. They
 * cannot, and the two halves of that plan contradict each other: the second half revokes anonymous
 * `select` on the four paid tables, and these pages read Supabase with the anon key. A page that
 * can still build a quiz preview is a page RLS has not closed. Capping the payload would shut the
 * casual door (view source, the Quick Fire drill) and leave the deliberate one open, because the
 * anon key ships in the browser bundle and can query those tables directly.
 *
 * So the paid surfaces are withheld here and fetched by `StudyApp` from `GET /api/sections/[id]`,
 * which uses the service role and checks entitlement — free students included. The extra request
 * buys a page whose HTML holds no paid content for anyone, which is the only version of this that
 * survives the RLS step and the only one a cached document may hold.
 *
 * `paidPending` is the marker the client reads: it means "these arrays are withheld, not empty".
 * Without it a student would see "0 cards" rather than a loading state, and `StudyApp` could not
 * tell a genuinely empty section from one whose paid half has not arrived.
 */
export function publicSectionPayload(tables) {
  const list = (v) => (Array.isArray(v) ? v : []);
  return {
    content: list(tables?.content),
    notes: list(tables?.notes),
    diagrams: list(tables?.diagrams),
    practice: list(tables?.practice),

    quiz: [],
    flashcards: [],
    extras: { chains: [], evaluation: [] },
    mistakes: [],

    // No counts: every one of them is the length of a paid table this page may not read.
    paidPending: true,
    isPremium: false,
  };
}
