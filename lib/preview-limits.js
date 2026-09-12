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

/** Tabs a free student may use in full. */
export const FREE_SURFACES = ['content', 'notes', 'diagrams', 'practice'];

/** Tabs a free student sees a capped preview of. */
export const PREVIEW_SURFACES = ['quiz', 'flashcards', 'extras'];

/** Tabs that need a subscription, with no preview at all. */
export const PAID_SURFACES = ['mistakes'];
