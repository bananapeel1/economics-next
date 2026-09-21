/**
 * What free gets and what Pro gets, stated once.
 *
 * F031: this was written out three times — in the upgrade page's own arrays, in the paywall
 * overlay's own array, and in prose on the section overview — and the three disagreed. The upgrade
 * page sold "Model answers" flatly while the paywall said "not just the first"; the overview
 * described a free tier that did not match either. A student who read one surface and hit another
 * had been told something untrue by us, which is the same defect class as the 182 marketing claims.
 *
 * This is the single source. It must agree with what the code actually enforces, which is
 * `components/StudyApp.jsx` FREE_TABS / PREVIEW_TABS / PREMIUM_TABS and the per-surface caps in
 * `lib/preview-limits.js`. If you change one, change all three together.
 */
import { PREVIEW_LIMITS } from './preview-limits';

export const FREE_FEATURES = [
  ['Revision notes', 'Every section of both subjects, no account needed'],
  ['Diagrams', 'Annotated, on the Economics sections that have them'],
  ['Practice questions', 'With guidance, on every section'],
  ['Learn Mode', 'The guided path through a section'],
];

export const PRO_FEATURES = [
  ['Everything in Free', null],
  ['Flashcards', `Every card, not the first ${PREVIEW_LIMITS.flashcards}, on a spaced repetition schedule`],
  ['Quizzes', `The full bank, not the first ${PREVIEW_LIMITS.quiz} questions, with explanations`],
  ['AI tutor', 'Answers in IAL exam language, marked against what the section teaches'],
  ['Evaluation chains', 'The 20-mark technique, built step by step'],
  ['Model answers', 'Every answer on a page, not only the first'],
  ['Mistakes review', 'The questions you got wrong, gathered in one place'],
];

export const LIFETIME_FEATURES = [
  ['Everything in Pro', null],
  ['Both years', 'IAS and IA2, all four units'],
  ['Every exam series', 'January and June, for as long as you need'],
  ['Every future update', 'New topics and tools, included'],
  ['No renewals, ever', 'One payment and you are done'],
];

/** The short list the paywall overlay shows. Derived, so it cannot drift from the table above. */
export const PAYWALL_FEATURES = PRO_FEATURES
  .filter(([, detail]) => detail)
  .map(([name]) => name);

/**
 * One sentence stating the boundary, for anywhere that needs prose rather than a list.
 * Used on the subject hubs so they stop inventing their own wording.
 */
export const BOUNDARY_SENTENCE =
  'Notes, diagrams and practice questions are free. Flashcards, quizzes and the AI tutor unlock with Pro.';
