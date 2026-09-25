/**
 * What a student can report, and on which surface.
 *
 * One home for the category list: the report sheet reads its choices from here, the ingest route
 * validates against it, and severity.js ranks from it. A category the route does not know is
 * refused, never stored as free text, so the admin filters always add up.
 *
 * Labels are written from the student's side of the screen. "The marked answer is wrong" is what
 * they saw; "answer_key_error" is what we would call it.
 */

export const CATEGORIES = {
  answer_wrong:      { label: 'The marked answer is wrong',               base: 'high' },
  multiple_correct:  { label: 'More than one answer is right',            base: 'high' },
  explanation_wrong: { label: 'The explanation is wrong',                 base: 'high' },
  mark_scheme_wrong: { label: 'The mark scheme or model answer is wrong', base: 'high' },
  diagram_wrong:     { label: 'The diagram is wrong',                     base: 'high' },
  marking_unfair:    { label: 'My answer was marked unfairly',            base: 'medium' },
  off_spec:          { label: "It's not on my Edexcel IAL spec",          base: 'medium' },
  unclear:           { label: "It's hard to understand",                  base: 'medium' },
  display_broken:    { label: "It doesn't display properly",              base: 'medium' },
  typo:              { label: 'Typo or wording',                          base: 'low' },
  other:             { label: 'Something else',                           base: 'medium' },
};

// A category whose truth changes what a student learns. Two independent reporters on one of
// these is critical: the app is teaching, or marking against, a wrong answer.
export const ANSWER_KEY_CATEGORIES = new Set(['answer_wrong', 'multiple_correct', 'mark_scheme_wrong']);

// Categories that only make sense once the student has SEEN the answer or the guidance. PreTest
// never reveals an answer (PreTest.jsx:40-48), and a quiz question can be reported before it is
// answered, so these are withheld until `revealed` is true.
const NEEDS_REVEAL = new Set(['answer_wrong', 'explanation_wrong', 'mark_scheme_wrong', 'marking_unfair']);

const MCQ = ['answer_wrong', 'multiple_correct', 'explanation_wrong', 'unclear', 'off_spec', 'typo', 'display_broken', 'other'];

export const SURFACES = {
  quiz:       { label: 'quiz question',     table: 'section_quiz',            categories: MCQ },
  pretest:    { label: 'pre-test question', table: 'section_quiz',            categories: MCQ },
  checkin:    { label: 'check-in question', table: 'section_quiz',            categories: MCQ },
  review:     { label: 'review question',   table: 'section_quiz',            categories: MCQ },
  practice:   { label: 'practice question', table: 'section_practice',        categories: ['mark_scheme_wrong', 'unclear', 'off_spec', 'typo', 'display_broken', 'other'] },
  written:    { label: 'written question',  table: 'section_practice',        categories: ['marking_unfair', 'mark_scheme_wrong', 'unclear', 'off_spec', 'typo', 'other'] },
  flashcard:  { label: 'flashcard',         table: 'section_flashcards',      categories: ['answer_wrong', 'unclear', 'off_spec', 'typo', 'other'] },
  diagram:    { label: 'diagram',           table: 'section_diagrams',        categories: ['diagram_wrong', 'display_broken', 'unclear', 'typo', 'other'] },
  mistake:    { label: 'common mistake',    table: 'section_common_mistakes', categories: ['explanation_wrong', 'unclear', 'typo', 'other'] },
  learn_step: { label: 'Learn Mode step',   table: 'section_content',         categories: ['explanation_wrong', 'unclear', 'off_spec', 'typo', 'display_broken', 'other'] },
  notes:      { label: 'note',              table: 'section_notes',           categories: ['explanation_wrong', 'unclear', 'off_spec', 'typo', 'display_broken', 'other'] },
};

// Where a surface names the same problem differently. A flashcard has no "marked answer".
const LABELS = {
  flashcard: { answer_wrong: 'The answer on the back is wrong' },
  written: { mark_scheme_wrong: 'The guidance or model answer is wrong' },
};

/** The choices to offer. `revealed: false` withholds the categories that need the answer shown. */
export function categoriesFor(surface, { revealed = true } = {}) {
  const ids = SURFACES[surface]?.categories || ['other'];
  return ids
    .filter((id) => revealed || !NEEDS_REVEAL.has(id))
    .map((id) => ({ id, label: LABELS[surface]?.[id] ?? CATEGORIES[id].label }));
}

export function isAllowed(surface, category, { revealed = true } = {}) {
  if (!SURFACES[surface]) return false; // categoriesFor falls back to 'other' for display; the route must not
  return categoriesFor(surface, { revealed }).some((c) => c.id === category);
}

// What each category asks the student to add. The placeholder is the prompt; an empty note is fine.
export const NOTE_PROMPTS = {
  answer_wrong: 'Which answer do you think is right, and why?',
  multiple_correct: 'Which other answer is also right?',
  explanation_wrong: 'What does it get wrong?',
  mark_scheme_wrong: 'What should the mark scheme say?',
  diagram_wrong: 'What is wrong with it? A label, a shift, an axis?',
  marking_unfair: 'Which point did the marking miss?',
  off_spec: 'Where did you learn it differently?',
  unclear: 'Which part lost you?',
  display_broken: 'What do you see instead?',
  typo: 'What should it say?',
  other: 'Tell us what you noticed',
};

// The feedback card's follow-up chips, by rating band. Stored as ids; the CHECK constraint on
// user_feedback.reasons carries the same list, so a chip added here must be added there too.
export const REASONS = {
  low:  [['too_long', 'Too long'], ['hard_to_follow', 'Hard to follow'], ['not_like_exam', 'Not like my exam'], ['found_mistake', 'Found a mistake'], ['something_broke', 'Something broke']],
  mid:  [['more_examples', 'More examples'], ['more_questions', 'More practice questions'], ['too_long', 'Too long'], ['hard_to_follow', 'Hard to follow']],
  high: [['clear', 'Clear explanations'], ['good_questions', 'Good questions'], ['diagrams_helped', 'Diagrams helped'], ['more_topics', 'Want more like this']],
};
export const REASON_IDS = new Set(Object.values(REASONS).flat().map(([id]) => id));
export const bandFor = (rating) => (rating <= 2 ? 'low' : rating === 3 ? 'mid' : 'high');

// What a student can say from the always-available "Send feedback" entry, where there is no rating.
export const TOPICS = [['idea', 'An idea'], ['broken', 'Something broke'], ['content', 'A content mistake'], ['praise', 'Something I like'], ['other', 'Something else']];
export const TOPIC_IDS = new Set(TOPICS.map(([id]) => id));
export const MOMENTS = ['section_complete', 'quiz_complete', 'practice_complete', 'flashcards_complete'];
