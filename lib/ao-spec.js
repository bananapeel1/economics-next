/**
 * Assessment-Objective Spec Map — Pure Functions
 * ==============================================
 * The single source of truth for which assessment objectives a question assesses and how many
 * marks Revvy allocates to each. No React, no Supabase, no browser APIs.
 *
 * TWO INPUTS, AND THEY ARE NOT THE SAME KIND OF THING. Read this before changing a number.
 *
 * (1) SPEC_ASSESSED — WHICH objectives a command word assesses. Source: the Pearson Edexcel
 *     Appendix 6 command-word tables. IAL Economics specification (Issue 2, June 2018) Appendix 6,
 *     p.67-68, extracted at audit/raw/econ_spec.txt L2696-2747. IAL Business specification
 *     (Issue 1, September 2017) Appendix 6, p.55-56, extracted at audit/raw/bus_spec.txt
 *     L2212-2252.
 *
 *     The ECONOMICS rows are VERBATIM. That table names the assessment objectives explicitly, in
 *     these words: Define "Requires knowledge and understanding only"; Explain "requires knowledge,
 *     understanding and application"; Analyse "Requires knowledge, understanding, application and
 *     analysis" and "Does not include evaluation"; Examine, Discuss and Evaluate each "Requires
 *     knowledge, understanding, application, analysis and evaluation". Each entry below carries the
 *     clause it is read from.
 *
 *     The BUSINESS rows are an INFERENCE, and are marked INFERRED one by one. The Business
 *     Appendix 6 table does not name an assessment objective anywhere: it describes only what the
 *     student must do ("Requires students to define a term or phrase", "Requires a coherent and
 *     logical chain of reasoning ... leading to a supported judgement"). We map those descriptions
 *     onto AO1-AO4 ourselves. The one exception is Business Analyse, whose "Does not include
 *     evaluation." is VERBATIM and is why Analyse has ao4 false in both subjects. Because the
 *     Business rows are inference rather than quotation, the conservative reading wins wherever the
 *     wording is ambiguous, and no student-facing sentence may cite Edexcel for a Business row.
 *
 * (2) ALLOCATION — HOW MANY of a question's marks each objective gets. THIS IS NOT AN EDEXCEL
 *     FIGURE. Neither specification publishes a split of a question's marks between AO1-AO4;
 *     both publish only a total tariff per command word. The split below is Revvy's own editorial
 *     choice, copied verbatim from the "MARK ALLOCATION BY QUESTION TYPE" table already inside
 *     SYSTEM_PROMPT in app/api/written-practice/evaluate/route.js, so that what we count is exactly
 *     what the marker was told. Every student-facing sentence built on these numbers must say so:
 *     "the marks we allocate to AO4", never "the marks Edexcel allocates" and never the bare "the
 *     marks available".
 *
 * THE TWO GATES, AND WHY THE SPEC GATE WINS. An objective is in play on an answer only when
 * SPEC_ASSESSED says the command word assesses it AND ALLOCATION gives it marks at that tariff.
 * A 6-mark Explain therefore has ao3 max 0 even though ALLOCATION[6].ao3 is 2: Appendix 6 adds
 * analysis to Explain only "When asking students to explain a reason or impact", and a content item
 * does not record which sub-case it is, so the conservative reading is the only one we can defend.
 *
 * THE TARIFF IS NOT ASSUMED TO BE VALID FOR THE COMMAND. The live content does not match the
 * spec — Economics serves Define at 4 marks where Appendix 6 says 2, and Explain at 6 where it says
 * 4 — and it contains command words that are not in Appendix 6 at all ("Outline" in either subject,
 * "Assess" in Economics). So aoMaxFor keys on (subject, command, tariff) as three independent
 * lookups, is happy to score a command at a tariff Edexcel never pairs it with, and returns null
 * rather than guessing when the command word is off-spec. The caller then stores the attempt with
 * excluded_reason = 'non_ial_command' so it is kept, counted in the exclusions footnote, and never
 * enters an aggregate. Nothing is hidden from practice on account of this file.
 *
 * WHAT THIS FILE DELIBERATELY DOES NOT CONTAIN: the published whole-qualification AO weightings.
 * They are real and quotable, but they describe a whole qualification. Applying them to the handful
 * of questions one student happened to attempt would be an invented projection.
 *
 * ALSO NOT HERE, AND FOR A MECHANICAL REASON: the two sha256 stamps this map feeds, AO_MAP_VERSION
 * and hashQuestion, live in lib/ao-rubric.js beside RUBRIC_VERSION. They are the row's provenance
 * fields and only the evaluate route ever writes them, whereas this file is reached from the client
 * through lib/ao-profile.js -> components/written-practice/WrittenFeedbackCard.jsx. A single
 * `import 'node:crypto'` here is enough to pull the whole crypto-browserify polyfill into the
 * written-practice browser bundle, which is the module-graph contamination the review flagged
 * against exporting constants from a route module. Keeping this file importable in a browser is
 * what lets one pure module phrase both the per-answer line and the aggregate.
 */

/** Own-property lookup, so a command word like "constructor" cannot reach Object.prototype. */
const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const deepFreeze = (obj) => {
  for (const value of Object.values(obj)) {
    if (value && typeof value === 'object') deepFreeze(value);
  }
  return Object.freeze(obj);
};

/**
 * Which of AO1-AO4 the Appendix 6 entry for a command word says are assessed.
 *
 * Calculate, Draw and Construct are absent on purpose: they are quantitative commands
 * ("Assesses quantitative skills") and our marker runs a prose rubric, so an attempt at one is
 * excluded whole rather than scored against the wrong thing. Any command word absent from a
 * subject's map is off-spec for that subject and excludes the attempt.
 */
export const SPEC_ASSESSED = deepFreeze({
  economics: {
    // VERBATIM: "Requires knowledge and understanding only. Requires students to give the meaning
    // of a term, concept or phrase."
    Define:   { ao1: true, ao2: false, ao3: false, ao4: false },
    // VERBATIM: "When asking students to explain a term or the characteristics, this requires
    // knowledge, understanding and application." The table's second sub-case ("When asking students
    // to explain a reason or impact, this also includes analysis") would add AO3, but the content
    // does not record which sub-case an item is, so AO3 stays off.
    Explain:  { ao1: true, ao2: true, ao3: false, ao4: false },
    // VERBATIM: "Requires knowledge, understanding, application and analysis ... Does not include
    // evaluation."
    Analyse:  { ao1: true, ao2: true, ao3: true, ao4: false },
    // VERBATIM: "Requires knowledge, understanding, application, analysis and evaluation ... There
    // should be a brief assessment of the arguments/factors/evidence."
    Examine:  { ao1: true, ao2: true, ao3: true, ao4: true },
    // VERBATIM: "Requires knowledge, understanding, application, analysis and evaluation ... There
    // should also be a recognition of different viewpoints and/or a critical assessment of the
    // evidence."
    Discuss:  { ao1: true, ao2: true, ao3: true, ao4: true },
    // VERBATIM, from the row headed "Evaluate/ To what extent": "Requires knowledge, understanding,
    // application, analysis and evaluation ... so that informed judgements arguments may be made."
    Evaluate: { ao1: true, ao2: true, ao3: true, ao4: true },
  },
  business: {
    // INFERRED from "Requires students to define a term or phrase." No objective is named; a
    // definition with no context, reasoning or judgement asked for reads as AO1 alone.
    Define:   { ao1: true, ao2: false, ao3: false, ao4: false },
    // INFERRED from "Requires students to provide a brief explanation of cause or effect, which is
    // supported by details or example(s)." The supporting detail is read as AO2. "Brief" is read as
    // short of a developed chain, so AO3 stays off — the conservative reading.
    Explain:  { ao1: true, ao2: true, ao3: false, ao4: false },
    // INFERRED from "Requires a brief chain of reasoning, explanation and/or justification. If
    // applied to given diagrams or data, it will include interpretation." — chain of reasoning read
    // as AO3, interpretation of given data as AO2. The exclusion of AO4 is NOT inferred: "Does not
    // include evaluation." is VERBATIM.
    Analyse:  { ao1: true, ao2: true, ao3: true, ao4: false },
    // INFERRED from "Requires a logical chains of reasoning, in context, showing cause(s) and/or
    // effect(s). A brief assessment is required showing an awareness of competing
    // arguments/factors." — "in context" read as AO2, "chains of reasoning" as AO3, "a brief
    // assessment ... competing arguments/factors" as AO4.
    Discuss:  { ao1: true, ao2: true, ao3: true, ao4: true },
    // INFERRED from "Requires a coherent and logical chain of reasoning, showing cause(s) and/or
    // effect(s) which is well contextualised. Assessment is balanced and wide ranging showing an
    // awareness of competing arguments/factors, leading to a supported judgement."
    Assess:   { ao1: true, ao2: true, ao3: true, ao4: true },
    // INFERRED from "Requires fully developed, coherent and logical chains of reasoning, showing a
    // range of cause and/or effect(s). A full awareness of the validity and significance of
    // competing arguments/factors leading to a perceptive conclusion that proposes a solution
    // and/or recommendations."
    Evaluate: { ao1: true, ao2: true, ao3: true, ao4: true },
  },
});

/**
 * WHETHER A ROW MAY BE ATTRIBUTED TO EDEXCEL IN STUDENT-FACING COPY.
 *
 * SPEC_ASSESSED holds two different kinds of thing and a sentence may only cite Edexcel for one of
 * them. A row is citable when the Appendix 6 entry names the objectives AND names them
 * EXHAUSTIVELY, so that "Edexcel assesses <command> against AO1 only" is a quotation rather than a
 * reading.
 *
 * Economics Explain is the one Economics row that is NOT citable, and it is the second most-served
 * item in the bank. Appendix 6 gives it two sub-cases: "When asking students to explain a term or
 * the characteristics, this requires knowledge, understanding and application" and "When asking
 * students to explain a reason or impact, this also includes analysis". We turn AO3 off because the
 * content does not record which sub-case an item is — a conservative reading of ours, and saying
 * "Edexcel assesses Explain against AO1 and AO2 only" would hand our own caution to the exam board
 * and contradict the table on the next line of this file.
 *
 * Every Business row is uncitable for the reason given above SPEC_ASSESSED: the Business Appendix 6
 * table names no assessment objective anywhere, so all four columns are our inference.
 */
export const SPEC_CITABLE = deepFreeze({
  economics: {
    Define:   true,  // "Requires knowledge and understanding ONLY" — exhaustive
    Explain:  false, // two sub-cases, one of which adds analysis; ours is the conservative reading
    Analyse:  true,  // "knowledge, understanding, application and analysis ... Does not include evaluation"
    Examine:  true,  // "knowledge, understanding, application, analysis and evaluation"
    Discuss:  true,
    Evaluate: true,
  },
  business: {
    Define: false, Explain: false, Analyse: false, Discuss: false, Assess: false, Evaluate: false,
  },
});

/**
 * True only when a student-facing sentence may say "Edexcel assesses <command> against ...".
 * Defaults to false for anything unknown: the cost of under-citing is a slightly weaker sentence,
 * and the cost of over-citing is putting words in the exam board's mouth.
 *
 * @param {string|null} subject
 * @param {string|null} command
 * @returns {boolean}
 */
export function isSpecCitable(subject, command) {
  const subj = typeof subject === 'string' ? subject : '';
  const cmd = typeof command === 'string' ? command.trim() : '';
  if (!subj || !cmd || !has(SPEC_CITABLE, subj)) return false;
  return has(SPEC_CITABLE[subj], cmd) ? SPEC_CITABLE[subj][cmd] === true : false;
}

/**
 * REVVY'S OWN mark split per SERVED tariff, copied from the SYSTEM_PROMPT table the marker is given
 * (app/api/written-practice/evaluate/route.js, "MARK ALLOCATION BY QUESTION TYPE"). Not an Edexcel
 * figure: neither specification publishes a per-objective split. A tariff absent here is unknown,
 * and an attempt at one is excluded rather than scored against a guessed split.
 */
export const ALLOCATION = deepFreeze({
  4:  { ao1: 2, ao2: 2, ao3: 0, ao4: 0 }, // "4-mark questions (Define/Explain)"
  6:  { ao1: 2, ao2: 2, ao3: 2, ao4: 0 }, // "6-mark questions (Explain)"
  8:  { ao1: 2, ao2: 2, ao3: 4, ao4: 0 }, // "8-mark questions (Analyse/Explain)"
  10: { ao1: 2, ao2: 2, ao3: 4, ao4: 2 }, // "10-mark questions (Assess/Analyse)"
  20: { ao1: 4, ao2: 4, ao3: 6, ao4: 6 }, // "20-mark questions (Evaluate/Discuss)"
});

/**
 * The number of developed chains of reasoning SYSTEM_PROMPT asks the marker to expect at each
 * tariff. Ours, not Edexcel's — no Edexcel document states a chain count — so any copy built on it
 * says "our mark scheme looks for", never "Edexcel expects".
 */
export const CHAIN_EXPECTATION = Object.freeze({
  4:  0, // "No evaluation needed", and no analytical chain is asked for at all
  6:  1, // "AO3: 2 marks (1 developed chain of analysis)"
  8:  2, // "AO3: 4 marks (2 developed chains of analysis)"
  10: 2, // "AO3: 4 marks (2 developed chains)"
  20: 3, // "AO3: 6 marks (3 developed chains of analysis, for AND against)"
});

/**
 * The frozen enum of gap tags the marker may emit, with the fixed student-facing label for each and
 * the technique shown alongside it. Exactly ten keys. `ao` is the objective the tag belongs to, and
 * it is load-bearing: a recurrence sentence may only be printed beside the ratio for the SAME
 * objective, or the juxtaposition asserts a cause the data does not contain.
 *
 * There is deliberately no keyword matcher over the marker's prose anywhere in this feature. A tag
 * exists only because the marker chose it from this list, which is what makes "your marker flagged"
 * an exact attribution rather than a classification the app invented.
 */
export const GAP_TAGS = deepFreeze({
  no_definition:        { ao: 'ao1', label: 'Key term not defined',          technique: 'Open by defining the key term in the question, in one sentence.' },
  term_misused:         { ao: 'ao1', label: 'Term used incorrectly',         technique: 'Check the definition of the term before you build an argument on it.' },
  no_context:           { ao: 'ao2', label: 'Not applied to the context',    technique: 'Use a figure, a name or a detail from the question in every paragraph.' },
  generic_example:      { ao: 'ao2', label: 'Example too generic',           technique: 'Replace the general example with the specific one the question gives you.' },
  chain_stops_short:    { ao: 'ao3', label: 'Chain of reasoning stops short', technique: 'Extend each chain by one more link: cause, mechanism, effect, consequence.' },
  one_sided:            { ao: 'ao3', label: 'Only one side developed',       technique: 'Develop the opposing argument to the same depth as your own.' },
  no_counterargument:   { ao: 'ao4', label: 'No counter-argument',           technique: "Add a 'However…' paragraph that argues the opposite case before you conclude." },
  no_conclusion:        { ao: 'ao4', label: 'No conclusion',                 technique: "Finish with one sentence that answers the question directly: 'Overall, X matters more than Y, because…'" },
  judgement_unsupported:{ ao: 'ao4', label: 'Judgement not supported',       technique: 'Tie your judgement back to a specific point you made earlier, not to a new idea.' },
  no_magnitude:         { ao: 'ao4', label: 'No sense of scale',             technique: "Say how big the effect is and why: 'the effect is large because demand is highly inelastic.'" },
});

/** The valid gap-tag keys, in AO order. Anything else the marker returns is dropped. */
export const GAP_TAG_KEYS = Object.freeze(Object.keys(GAP_TAGS));

/**
 * The write-side exclusion vocabulary, frozen to match CHECK waoa_excl_vals in
 * scripts/create-written-ao-attempts-table.sql. Both sides must be edited together.
 */
const EXCLUDED_REASONS = new Set(['non_ial_command', 'hidden_item', 'unknown_tariff', 'item_unresolved']);

/** The four objective keys, in fixed order. Never sorted by value — sorting is a ranking claim. */
const AO_KEYS = Object.freeze(['ao1', 'ao2', 'ao3', 'ao4']);

/** The allocation row for a served tariff, or null when we have no split for that tariff. */
function allocationFor(tariff) {
  const n = Number(tariff);
  if (!Number.isInteger(n)) return null;
  return has(ALLOCATION, n) ? ALLOCATION[n] : null;
}

/**
 * Revvy's mark allocation per objective for one question.
 *
 * Returns null — meaning "we have no defensible basis for scoring this attempt" — when the subject
 * is not one we map, when the command word is not in Appendix 6 for that subject, or when we have
 * no allocation for that tariff. Null is not a failure: the caller keeps the attempt and records
 * why it cannot be counted.
 *
 * @param {string} subject - 'economics' | 'business'
 * @param {string} command - the command word as stored on the content item, e.g. 'Evaluate'
 * @param {number} tariff - the marks the item is SERVED at, which may not be the Appendix 6 tariff
 * @returns {{ao1:number, ao2:number, ao3:number, ao4:number}|null}
 */
export function aoMaxFor(subject, command, tariff) {
  const subj = typeof subject === 'string' ? subject : '';
  if (!subj || !has(SPEC_ASSESSED, subj)) return null;

  // Exact key match, matching isIALCommand in lib/ial-commands.js. A looser match here would let
  // this file count a command word that the capture path has already called off-spec.
  const cmd = typeof command === 'string' ? command.trim() : '';
  const commands = SPEC_ASSESSED[subj];
  if (!cmd || !has(commands, cmd)) return null;

  const split = allocationFor(tariff);
  if (!split) return null;

  const assessed = commands[cmd];
  return {
    ao1: assessed.ao1 ? split.ao1 : 0,
    ao2: assessed.ao2 ? split.ao2 : 0,
    ao3: assessed.ao3 ? split.ao3 : 0,
    ao4: assessed.ao4 ? split.ao4 : 0,
  };
}

/**
 * Turn one marker result into the row we store, clamped to what the question could have carried.
 *
 * Never throws and never returns marks above their max, so nothing downstream has to re-validate.
 * An objective that was not assessed comes back as { marks: 0, max: 0, counts: false } — absent
 * from the arithmetic, which is what stops a 4-mark Define from manufacturing an AO4 weakness that
 * was never tested. `counts: false` is the carrier of absence; a zero is never one.
 *
 * CALLER CONTRACT: when the subject or the command word could not be RESOLVED at all (a failed
 * section join, say), pass excludedReason: 'item_unresolved'. Never pass a guessed subject —
 * subjectFrom('') returns 'economics', and a guess here is the one thing this feature exists to
 * prevent. Leaving them null is safe: an unresolved subject or command is labelled
 * 'item_unresolved' here too, never 'non_ial_command'.
 *
 * @param {object} modelResult - the marker's parsed JSON, or anything at all
 * @param {object} ctx
 * @param {string|null} ctx.subject
 * @param {string|null} ctx.command
 * @param {number|null} ctx.tariff
 * @param {boolean} [ctx.hidden] - the content item's `hidden` flag
 * @param {string|null} [ctx.excludedReason] - a reason the caller already knows
 * @returns {{perAO:object, chains:number|null, gapTags:string[], excludedReason:string|null}}
 */
export function normaliseAO(modelResult, ctx = {}) {
  const { subject = null, command = null, tariff = null, hidden = false, excludedReason = null } = ctx || {};

  // Coerced to the frozen vocabulary, because waoa_excl_vals is a CHECK: an unrecognised string
  // would reject the whole row rather than exclude the answer, and a marked answer that never
  // reaches the table is the silent vanishing this feature exists to stop. An unrecognised reason
  // still means "the caller could not resolve this", which is what 'item_unresolved' says.
  let reason = typeof excludedReason === 'string' && excludedReason
    ? (EXCLUDED_REASONS.has(excludedReason) ? excludedReason : 'item_unresolved')
    : null;
  if (!reason && hidden) reason = 'hidden_item';

  const maxes = aoMaxFor(subject, command, tariff);
  if (!maxes && !reason) {
    // 'non_ial_command' is a claim ABOUT THE QUESTION — the footnote it drives tells the student
    // "they used a command word that does not appear in IAL papers". We may only say that about a
    // command word we actually read off the content item, under a subject whose Appendix 6 table we
    // hold. A null or unmapped one is a failed lookup on our side, and saying otherwise would be a
    // false statement about an item we simply could not find.
    const resolved = typeof subject === 'string' && has(SPEC_ASSESSED, subject)
      && typeof command === 'string' && command.trim() !== '';
    if (!resolved) reason = 'item_unresolved';
    else reason = allocationFor(tariff) ? 'non_ial_command' : 'unknown_tariff';
  }

  const perAO = {};
  for (const key of AO_KEYS) {
    const max = maxes ? maxes[key] : 0;
    const raw = Number(modelResult?.[key]?.marks);
    const marks = Number.isFinite(raw) ? Math.min(Math.max(Math.round(raw), 0), max) : 0;
    perAO[key] = { marks, max, counts: max > 0 && !reason };
  }

  const rawChains = Number(modelResult?.ao3?.chains);
  const chains = Number.isFinite(rawChains) ? Math.min(Math.max(Math.round(rawChains), 0), 20) : null;

  const seen = new Set();
  const gapTags = [];
  const emitted = Array.isArray(modelResult?.gapTags) ? modelResult.gapTags : [];
  for (const tag of emitted) {
    if (typeof tag !== 'string' || seen.has(tag) || !has(GAP_TAGS, tag)) continue;
    seen.add(tag);
    gapTags.push(tag);
    if (gapTags.length === 3) break;
  }

  return { perAO, chains, gapTags, excludedReason: reason };
}
