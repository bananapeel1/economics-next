/**
 * AO Profile — Aggregation and Claim Sentences
 * ============================================
 * Every assessment-objective number a student is shown, and every sentence that carries one, is
 * produced here. No React, no Supabase, no fetch, no Date.now() — the only ordering this module
 * knows is the order the caller hands it (oldest attempt first).
 *
 * WHY ONE MODULE. Two surfaces print these claims: the running line inside the marking flow
 * (app/api/written-practice/evaluate/route.js) and the session-summary panel
 * (app/api/written-practice/ao-profile/route.js). If either assembled its own sentence the two
 * would eventually disagree about the same student's numbers, and a claim that moves depending on
 * where you read it is not a claim. So: NO ROUTE AND NO COMPONENT COMPUTES A RATIO, AND NONE
 * ASSEMBLES A SENTENCE. A claim whose evidence floor is not met comes back as null and the caller
 * has nothing to render — it is physically unable to print a percentage it has not earned.
 *
 * THE THREE RULES THIS FILE EXISTS TO ENFORCE.
 *
 * (1) NOT ASSESSED IS NOT ZERO. When an objective's max is 0 on an answer, that answer contributes
 *     nothing to its numerator, its denominator OR its answer count. A student who has only written
 *     4- and 6-mark answers has an AO4 answer count of zero, and the row says "not assessed yet",
 *     never "0%".
 *
 * (2) THE FOUR OBJECTIVES ARE NEVER RANKED AGAINST EACH OTHER, AND NO SUPERLATIVE IS EVER ATTACHED
 *     TO ONE. AO1 is measured on 4-mark Defines and AO4 only on 20-mark Evaluates, so a
 *     cross-objective comparison measures question difficulty rather than the student, and would
 *     name AO4 for nearly every student on nearly every render. Iterate AO_KEYS; never sort by
 *     value. This is also why the only valid comparison unit is the FOCUS COMMAND: inside one
 *     command word at one tariff, the four objectives were marked on the same answers in the same
 *     call, so like is compared with like.
 *
 * (3) THE MARK SPLIT BETWEEN OBJECTIVES IS OURS. Neither IAL specification publishes one; ours is
 *     copied from the table SYSTEM_PROMPT hands the marker. Every sentence built on it says "the
 *     marks we allocate to AO4 Evaluation", never "the marks available" and never "the marks
 *     Edexcel allocates". The disclosure that says so is permanent and is returned on every call,
 *     including the empty one.
 *
 * RECURRENCE IS PAIRED WITH ITS OWN OBJECTIVE, ALWAYS. GAP_TAGS spans all four objectives and the
 * marker picks up to three freely, so a recurring 'no_definition' (AO1) printed beside an AO4
 * percentage would assert a causal link the data does not contain — arithmetically true, licensing
 * a false conclusion, which is the same defect as the cross-objective superlative wearing the
 * honesty machinery. The recurrence therefore carries its own `ao` and its own `ratio`, and a
 * headline prints a tag only beside the ratio of the objective that tag belongs to.
 */

import { AO_DISPLAY, AO_KEYS } from '@/lib/ao-labels';
import { aoMaxFor, GAP_TAGS, CHAIN_EXPECTATION, SPEC_ASSESSED, isSpecCitable } from '@/lib/ao-spec';

/**
 * The disclosed evidence floors. These are the only thresholds in the feature and they exist once,
 * so the copy under the rows ("We show a rate once an objective has been marked in four of your
 * answers") cannot drift from the arithmetic above it.
 */
export const AO_GATES = Object.freeze({
  ratio:      Object.freeze({ answers: 4, marks: 12 }),
  recurrence: Object.freeze({ count: 3, share: 0.4 }),
  chains:     Object.freeze({ answers: 4 }),
  coverage:   Object.freeze({ answers: 3 }),
});

/**
 * Permanent, never collapsed, never cut. Returned on every call including the empty profile.
 *
 * THREE VARIANTS, BECAUSE THE SENTENCE IS NOT TRUE OF BOTH SUBJECTS. The Economics Appendix 6
 * table names the assessment objectives per command word, so "Edexcel publishes which objectives a
 * command word assesses" is a statement of fact there. The Business Appendix 6 table names no
 * objective anywhere (audit/raw/bus_spec.txt L2212-2252: "Requires students to define a term or
 * phrase", and nothing else), so on a Business profile that same sentence hands our own inference
 * to the exam board — which is the specific failure lib/ao-spec.js forbids: "no student-facing
 * sentence may cite Edexcel for a Business row". The mixed/unknown variant claims the weaker thing
 * of both. Which one is shown changes; that one is shown does not.
 */
const DISCLOSURE_BY_SUBJECT = {
  economics:
    "Marked by Revvy's AI, not by an Edexcel examiner. The split of a question's marks between the " +
    'four objectives is ours: Edexcel publishes which objectives a command word assesses, not how ' +
    'many marks each one carries.',
  business:
    "Marked by Revvy's AI, not by an Edexcel examiner. Both halves of this are ours: the Edexcel " +
    'Business command-word table describes what each question asks for without naming an ' +
    'assessment objective, so which objectives a command word assesses is our reading of it, and ' +
    "the split of a question's marks between the four is our own allocation.",
};

const DISCLOSURE_GENERAL =
  "Marked by Revvy's AI, not by an Edexcel examiner. The split of a question's marks between the " +
  'four objectives is ours. Edexcel publishes which objectives a command word assesses for ' +
  'Economics; for Business it does not, so there that mapping is our reading too.';

function disclosureFor(subject) {
  return Object.prototype.hasOwnProperty.call(DISCLOSURE_BY_SUBJECT, subject)
    ? DISCLOSURE_BY_SUBJECT[subject]
    : DISCLOSURE_GENERAL;
}

const FLOOR_RULE = 'We show a rate once an objective has been marked in four of your answers.';

/**
 * The short form of the disclosure, for the running line inside the feedback card.
 *
 * The panel carries the full sentence permanently, but the running line renders on a different
 * surface — WrittenFeedbackCard — which has no disclosure of its own. Only the branch that prints
 * an aggregate percentage needs it: the first-answer, coverage and recurrence lines make no
 * numerical claim about the allocation, and "the marks we allocate" already owns the split in the
 * sentence itself. What that phrasing does not carry is who did the marking, so that is what this
 * adds, in the fewest words that stay true.
 */
const INLINE_DISCLOSURE = "Marked by Revvy's AI, not by an Edexcel examiner.";

const RECORD_LINE = 'Two answers is a record, not a pattern, and we will not draw one from it.';

const EMPTY_HEADLINE =
  'Nothing here yet. Every answer you submit is marked against the four Edexcel assessment ' +
  'objectives — AO1 Knowledge, AO2 Application, AO3 Analysis, AO4 Evaluation — and this fills ' +
  'itself in as you write.';

// Shown only to a user who has written answers that predate this table. Without it, the honesty
// feature's first impression on an existing subscriber is "Nothing here yet" over forty answers
// they remember writing, which reads as data loss. No backfill is possible: nothing before the
// table existed recorded per-objective marks.
const PRIOR_RECORD_NOTE =
  'We only started keeping this record recently, so answers you marked before then are not in it.';

// Which command words carry evaluation in each subject, phrased for running prose. Read off
// SPEC_ASSESSED but written out rather than generated, because the sentence names only the command
// words a student can actually reach in the content: Economics has zero Examine and zero Discuss
// items, and naming a question type we do not serve would be an instruction we cannot honour.
const EVALUATION_COMMANDS_PHRASE = {
  economics: 'Evaluate questions',
  business: 'Assess and Evaluate questions',
};

const SUBJECT_TITLE = { economics: 'IAL Economics', business: 'IAL Business' };

const SUBJECTS = ['economics', 'business'];

/* ── copy helpers ───────────────────────────────────────────────────────────────────────────── */

const SPELLED = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

/** "three" for small counts, "17" beyond — matching how the copy writes numbers in running prose. */
function spell(n) {
  return Number.isInteger(n) && n >= 0 && n < SPELLED.length ? SPELLED[n] : String(n);
}

function capitalise(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

/**
 * Sentence-case a gap-tag label for running prose: "No conclusion" → "no conclusion". The label's
 * words are never changed — only the sentence case, because the label is a fixed classification the
 * marker emitted and the copy places it mid-sentence ("flagged the same thing: no conclusion").
 */
function lowerFirst(s) {
  return s ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}

function plural(n, word) {
  return n === 1 ? word : `${word}s`;
}

function ordinal(n) {
  const rem100 = n % 100;
  if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
}

/**
 * "your 6 marked Evaluate answers", or "your most recent 6 marked Evaluate answers" when the read
 * was row-limited. Both forms exist because an ascending row limit silently freezes the profile on
 * old data; once the caller reports truncation, "your N marked answers" would be a false total.
 */
function answersPhrase(n, { command = null, truncated = false } = {}) {
  const noun = command ? `marked ${command} ${plural(n, 'answer')}` : `marked ${plural(n, 'answer')}`;
  return truncated ? `your most recent ${n} ${noun}` : `your ${n} ${noun}`;
}

/** Integer percentage with the explicit denominator guard used everywhere else in the app. */
function pctOf(earned, available) {
  return available > 0 ? Math.round((earned / available) * 100) : null;
}

/* ── row preparation ────────────────────────────────────────────────────────────────────────── */

/**
 * Recompute one stored attempt against the CURRENT spec map.
 *
 * The stored ao{n}_max / ao{n}_counts columns are the frozen audit record of what the student was
 * shown at the time; the aggregate deliberately does not use them. The map is a spec-derived fact
 * rather than a judgement about the student, so if it is ever corrected the corrected version is
 * the truthful one and no answer has to be thrown away — marks earned never change under a
 * correction, only the denominator does.
 */
function prepare(row) {
  const subject = typeof row?.subject === 'string' ? row.subject : null;
  const rawCommand = typeof row?.command === 'string' ? row.command.trim() : '';
  const command = rawCommand || null;
  const tariffNum = Number(row?.tariff);
  const tariff = Number.isFinite(tariffNum) ? Math.round(tariffNum) : null;
  const maxes = aoMaxFor(subject, command, tariff);

  const max = {};
  const marks = {};
  for (const key of AO_KEYS) {
    const cap = maxes ? maxes[key] : 0;
    const awarded = Number(row?.[`${key}_marks`]);
    max[key] = cap;
    // Clamped again on read: the write clamp used the map as it stood then, and a corrected map may
    // be tighter. A ratio can never exceed 100%.
    marks[key] = Number.isFinite(awarded) ? Math.min(Math.max(Math.round(awarded), 0), cap) : 0;
  }

  const chainsNum = Number(row?.ao3_chains);
  const chains = Number.isInteger(chainsNum) ? chainsNum : null;

  const tags = Array.isArray(row?.gap_tags)
    ? row.gap_tags.filter((t) => typeof t === 'string' && Object.prototype.hasOwnProperty.call(GAP_TAGS, t))
    : [];

  const excludedReason = typeof row?.excluded_reason === 'string' && row.excluded_reason ? row.excluded_reason : null;

  return {
    subject,
    command,
    tariff,
    sectionId: typeof row?.section_id === 'string' ? row.section_id : null,
    excludedReason,
    max,
    marks,
    chains,
    tags,
    // All four objectives in play. The focus command is chosen from these rows only, because it is
    // the only shape in which the four objectives are comparable at all.
    fullAO: AO_KEYS.every((key) => max[key] > 0),
  };
}

/** Numerator, denominator and answer count for one objective over a set of prepared rows. */
function tally(rows, key) {
  let answers = 0;
  let available = 0;
  let earned = 0;
  for (const row of rows) {
    if (row.max[key] <= 0) continue; // absent, not zero
    answers += 1;
    available += row.max[key];
    earned += row.marks[key];
  }
  const meetsFloor = answers >= AO_GATES.ratio.answers && available >= AO_GATES.ratio.marks;
  // pct is null AT SOURCE below the floor, not hidden downstream, so no renderer can reach a
  // percentage it has not earned.
  const pct = meetsFloor ? pctOf(earned, available) : null;
  return {
    key,
    answers,
    available,
    earned,
    pct,
    state: available === 0 ? 'not-assessed' : pct === null ? 'below-floor' : 'ok',
  };
}

/** The four objective rows, in fixed AO1→AO4 order, each carrying its own copy. */
function buildObjectives(rows) {
  const out = {};
  for (const key of AO_KEYS) {
    const stat = tally(rows, key);
    const display = AO_DISPLAY[key];
    let text = null;
    if (stat.state === 'not-assessed') {
      text = `Not assessed yet — none of your marked answers has carried ${display.label} marks.`;
    } else if (stat.state === 'below-floor') {
      text = `${stat.earned} of ${stat.available} marks, from ${stat.answers} ${plural(stat.answers, 'answer')}.`;
    }
    out[key] = {
      ...stat,
      label: display.label,
      noun: display.noun,
      color: display.color,
      fraction: stat.available > 0 ? `${stat.earned}/${stat.available}` : null,
      answersLabel: `${stat.answers} ${plural(stat.answers, 'answer')}`,
      text,
    };
  }
  return out;
}

/**
 * How many more answers before this objective could carry a rate. Both floors are real: four
 * answers AND twelve allocated marks, so an objective sitting at 2 marks an answer needs more
 * answers than the answer floor alone implies.
 */
function answersToFloor(stat) {
  const byAnswers = Math.max(AO_GATES.ratio.answers - stat.answers, 0);
  let byMarks = 0;
  if (stat.answers > 0 && stat.available < AO_GATES.ratio.marks) {
    const perAnswer = stat.available / stat.answers;
    byMarks = perAnswer > 0 ? Math.ceil((AO_GATES.ratio.marks - stat.available) / perAnswer) : 0;
  }
  return Math.max(byAnswers, byMarks, 1);
}

/* ── the aggregate ──────────────────────────────────────────────────────────────────────────── */

/**
 * Build the whole profile from one user's stored attempts.
 *
 * @param {Array<object>} rows - written_ao_attempts rows, OLDEST FIRST. The read is ordered
 *   descending and reversed by the caller, so a row limit drops the oldest answers rather than the
 *   newest; pass `truncated` when the limit was hit.
 * @param {object} [options]
 * @param {string|null} [options.subject] - 'economics' | 'business', or null for every subject.
 * @param {boolean} [options.truncated] - the read hit its row limit, so counts are "most recent N".
 * @param {number} [options.priorWaRows] - count of this user's pre-existing written-practice
 *   progress rows, used only to explain an empty profile to a student who has marked answers that
 *   predate this table.
 * @param {object|Map} [options.sections] - optional { [sectionId]: { title, unitNumber,
 *   subjectSlug } } lookup. Supplied only so the secondary remediation link can name a section;
 *   without it that link is simply absent.
 * @returns {object} { meta, focus, objectives, recurrence, chains, coverage, headline, disclosure,
 *   exclusions, floorNote, nextAction, inline }
 */
export function buildAOProfile(rows, options = {}) {
  const { subject = null, truncated = false, priorWaRows = 0, sections = null } = options || {};
  const subjectFilter = SUBJECTS.includes(subject) ? subject : null;

  const all = (Array.isArray(rows) ? rows : [])
    .map(prepare)
    // Subject scoping only. This is the same filter the query applies; it is not an honesty
    // exclusion, so it moves the exclusions footnote's denominator with it and nothing is
    // reported as "not counted" that was never in scope.
    //
    // ONE DELIBERATE EXCEPTION: a row whose subject could not be resolved stays in scope. It always
    // carries an excluded_reason (CHECK waoa_subj_or_excl), so it can never reach a numerator, a
    // denominator or an answer count — `counted` drops it on the next line. But filtering it out
    // HERE would undo the whole reason the subject column is nullable
    // (scripts/create-written-ao-attempts-table.sql header): the answer was genuinely marked, the
    // student genuinely wrote it, and under a subject scope it would vanish from their own record
    // with no trace, leaving "Not counted here: N of your M" unable to reconcile. Keeping it claims
    // nothing about which subject it was — that is precisely what its reason says we do not know.
    .filter((row) => !subjectFilter || row.subject === subjectFilter || (row.subject === null && row.excludedReason));

  const counted = all.filter((row) => !row.excludedReason);
  const excluded = all.filter((row) => row.excludedReason);
  const answersMarked = all.length;
  const answersCounted = counted.length;
  const isTruncated = truncated === true;

  // The subject the copy speaks in. Never guessed: taken from the caller, else from the rows
  // themselves, and left null when they disagree — a sentence that names the wrong specification
  // is exactly the failure this feature exists to prevent.
  const distinctSubjects = [...new Set(counted.map((row) => row.subject).filter((s) => SUBJECTS.includes(s)))];
  const effectiveSubject = subjectFilter || (distinctSubjects.length === 1 ? distinctSubjects[0] : null);

  const objectives = buildObjectives(counted);

  /* FOCUS COMMAND — the only valid comparison unit. Commands where all four objectives are in play
     (Economics: Examine, Discuss, Evaluate; Business: Discuss, Assess, Evaluate), most counted
     answers first, tie-broken on the higher tariff. At one or two counted answers there is no focus
     at all: a record is not a pattern, and picking a comparison unit out of two answers would be
     the first step in drawing one. */
  let focus = null;
  if (answersCounted > 2) {
    const byCommand = new Map();
    for (const row of counted) {
      if (!row.fullAO || !row.command) continue;
      const entry = byCommand.get(row.command) || { command: row.command, count: 0, tariff: 0 };
      entry.count += 1;
      entry.tariff = Math.max(entry.tariff, row.tariff || 0);
      byCommand.set(row.command, entry);
    }
    let best = null;
    for (const entry of byCommand.values()) {
      if (!best || entry.count > best.count || (entry.count === best.count && entry.tariff > best.tariff)) {
        best = entry;
      }
    }
    if (best) {
      const focusRows = counted.filter((row) => row.command === best.command);
      const sectionIds = [];
      for (let i = focusRows.length - 1; i >= 0 && sectionIds.length < 3; i -= 1) {
        const id = focusRows[i].sectionId;
        if (id && !sectionIds.includes(id)) sectionIds.push(id);
      }
      focus = {
        command: best.command,
        tariff: best.tariff,
        answers: focusRows.length,
        sectionIds,
        objectives: buildObjectives(focusRows),
        rows: focusRows,
        ao: 'ao4', // the headline objective, re-pointed below if a recurring tag belongs elsewhere
      };
    }
  }

  /* RECURRENCE, scoped to one objective. Counted per objective over the focus command's rows where
     THAT objective was in play, so the denominator in "5 of your 6" is the same set of answers the
     ratio beside it is computed over. A tag is never paired with another objective's percentage. */
  let recurrence = null;
  if (focus) {
    let best = null;
    for (const key of AO_KEYS) {
      const elig = focus.rows.filter((row) => row.max[key] > 0);
      if (elig.length === 0) continue;
      const counts = new Map();
      const lastSeen = new Map();
      elig.forEach((row, index) => {
        for (const tag of row.tags) {
          if (GAP_TAGS[tag].ao !== key) continue;
          counts.set(tag, (counts.get(tag) || 0) + 1); // once per row: tags are de-duplicated on write
          lastSeen.set(tag, index);
        }
      });
      for (const [tag, count] of counts) {
        const share = count / elig.length;
        if (count < AO_GATES.recurrence.count || share < AO_GATES.recurrence.share) continue;
        const candidate = { tag, ao: key, count, eligible: elig.length, share, last: lastSeen.get(tag) };
        // Highest count wins; ties go to the more recent occurrence, then to fixed AO order.
        if (!best || candidate.count > best.count || (candidate.count === best.count && candidate.last > best.last)) {
          best = candidate;
        }
      }
    }
    if (best) {
      const stat = focus.objectives[best.ao];
      recurrence = {
        tag: best.tag,
        ao: best.ao,
        label: GAP_TAGS[best.tag].label,
        technique: GAP_TAGS[best.tag].technique,
        count: best.count,
        eligible: best.eligible,
        share: best.share,
        command: focus.command,
        // The standalone sentence, with no ratio in it. A renderer that wants a magnitude must use
        // `ratio` below, which is this tag's OWN objective and can be null.
        text:
          `On ${best.count} of ${answersPhrase(best.eligible, { command: focus.command, truncated: isTruncated })} ` +
          `your marker flagged the same thing: ${lowerFirst(GAP_TAGS[best.tag].label)}.`,
        ratio: stat.pct === null ? null : { earned: stat.earned, available: stat.available, pct: stat.pct },
      };
    }
  }

  /* CHAINS. The marker's own count, over the focus command at the focus tariff so the expectation
     printed beside it is the one that applies to those answers. Always attributed: "your marker
     counted", never "you wrote" — the count is the model's impression of the prose, not a
     measurement of it — and the expectation is ours, never Edexcel's. */
  const chainRows = focus
    ? focus.rows.filter((row) => row.tariff === focus.tariff && row.max.ao3 > 0 && row.chains !== null)
    : [];
  const chainAnswers = chainRows.length;
  const chainTotal = chainRows.reduce((sum, row) => sum + row.chains, 0);
  const chainExpectation = focus && Object.prototype.hasOwnProperty.call(CHAIN_EXPECTATION, focus.tariff)
    ? CHAIN_EXPECTATION[focus.tariff]
    : null;
  const chainsShown = chainAnswers >= AO_GATES.chains.answers;
  const chainMean = chainsShown ? Math.round((chainTotal / chainAnswers) * 10) / 10 : null;
  const expectationClause = chainExpectation === null
    ? null
    : `Our mark scheme for a ${focus.tariff}-mark ${focus.command} looks for ${spell(chainExpectation)}.`;
  let chainsText = null;
  if (chainsShown) {
    chainsText =
      `Your marker counted ${chainMean.toFixed(1)} developed chains per answer across ${chainAnswers} ` +
      `${plural(chainAnswers, 'answer')}.` + (expectationClause ? ` ${expectationClause}` : '');
  } else if (chainAnswers === 2) {
    // The two-answer case is listed in the copy verbatim; three is left to the raw values, because
    // a mean is never shown below the floor and no sentence exists for it.
    chainsText = `Your marker counted ${chainRows[0].chains} ${plural(chainRows[0].chains, 'chain')} in one answer ` +
      `and ${chainRows[1].chains} in the other.`;
  }
  const chains = {
    answers: chainAnswers,
    mean: chainMean,
    expectation: chainExpectation,
    command: focus ? focus.command : null,
    tariff: focus ? focus.tariff : null,
    values: chainRows.map((row) => row.chains),
    shown: chainsShown,
    text: chainsText,
  };

  /* COVERAGE. The modal real state for Economics, where the whole subject holds 23 AO4-bearing
     items — one Evaluate per section — and zero Examine and zero Discuss. A true, specific,
     immediately actionable diagnosis produced from no AO4 data at all. */
  const commandsInPlay = effectiveSubject
    ? Object.keys(SPEC_ASSESSED[effectiveSubject]).filter((cmd) => SPEC_ASSESSED[effectiveSubject][cmd].ao4)
    : [];
  const attemptedCommands = [...new Set(counted.map((row) => row.command).filter(Boolean))];
  const coverageShown =
    answersCounted >= AO_GATES.coverage.answers &&
    objectives.ao4.answers === 0 &&
    Boolean(effectiveSubject);
  const coverage = {
    ao4: { answers: objectives.ao4.answers, commandsInPlay, attemptedCommands },
    shown: coverageShown,
  };

  /* HEADLINE LADDER, first match wins. Recurrence and chains sit above the ratio deliberately: they
     are the two figures that actually differ between two students, and the ratio is the one a
     student could largely predict before signing up. */
  const headline = { text: '', variant: 'below-floor', technique: null };

  if (answersCounted === 0) {
    headline.variant = 'empty';
    headline.text = priorWaRows > 0 ? `${EMPTY_HEADLINE} ${PRIOR_RECORD_NOTE}` : EMPTY_HEADLINE;
  } else if (coverageShown) {
    headline.variant = 'coverage';
    headline.text =
      `Across ${answersPhrase(answersCounted, { truncated: isTruncated })}, none has carried ` +
      `${AO_DISPLAY.ao4.label} marks. In ${SUBJECT_TITLE[effectiveSubject]} evaluation is assessed on ` +
      `${EVALUATION_COMMANDS_PHRASE[effectiveSubject]}, and you have not written one yet. That is the gap, ` +
      'not the score.';
  } else if (recurrence && recurrence.ratio) {
    // Rung 3 fires only when the ratio belongs to the tag's OWN objective. When it does not clear
    // its floor the ladder falls through rather than borrowing another objective's number.
    headline.variant = 'recurrence';
    focus.ao = recurrence.ao;
    headline.text =
      `${recurrence.text} Across those ${spell(recurrence.eligible)} answers you earned ` +
      `${recurrence.ratio.earned} of the ${recurrence.ratio.available} marks we allocate to ` +
      `${AO_DISPLAY[recurrence.ao].label} — ${recurrence.ratio.pct}%.`;
    headline.technique = recurrence.technique;
  } else if (chainsShown && chainExpectation !== null && chainMean <= chainExpectation - 0.5) {
    headline.variant = 'chains';
    focus.ao = 'ao3';
    headline.text =
      `Across ${answersPhrase(chainAnswers, { command: focus.command, truncated: isTruncated })} your marker ` +
      `counted ${chainMean.toFixed(1)} developed chains of reasoning per answer. ${expectationClause}`;
  } else if (focus && focus.objectives.ao4.pct !== null) {
    const stat = focus.objectives.ao4;
    headline.variant = 'ratio';
    focus.ao = 'ao4';
    headline.text =
      `Across ${answersPhrase(stat.answers, { command: focus.command, truncated: isTruncated })} you earned ` +
      `${stat.earned} of the ${stat.available} marks we allocate to ${AO_DISPLAY.ao4.label} — ${stat.pct}%.`;
  } else {
    headline.variant = 'below-floor';
    headline.text = belowFloorHeadline({ counted, focus, objectives });
  }

  /* EXCLUSIONS. Kept, counted and shown with their reason. A silent exclusion is a way of quietly
     improving a number, and printing this is what makes every other figure on the panel credible. */
  const reasons = {};
  for (const row of excluded) reasons[row.excludedReason] = (reasons[row.excludedReason] || 0) + 1;
  const allNonIal = excluded.length > 0 && excluded.every((row) => row.excludedReason === 'non_ial_command');
  const exclusions = excluded.length === 0
    ? null
    : {
        count: excluded.length,
        total: answersMarked,
        reasons,
        // The second sentence is a claim about the command word, so it is printed only when every
        // excluded row actually carries that reason. A mixed set gets the count alone rather than a
        // reason that is true of some of them.
        // answersPhrase, not a bare count: under truncation the student HAS more marked answers
        // than we hold, so "of your 15 marked answers" would be a false total in the one sentence
        // whose whole job is to let the other numbers reconcile.
        text:
          `Not counted here: ${excluded.length} of ${answersPhrase(answersMarked, { truncated: isTruncated })}.` +
          (allNonIal
            ? ' They used a command word that does not appear in IAL papers, so there is no published basis ' +
              'for saying which objectives they assess.'
            : ''),
      };

  const anyBelowFloor = AO_KEYS.some((key) => objectives[key].state === 'below-floor');
  const floorNote = {
    // The one interpretive sentence in the whole panel, and it is a statement about the product
    // rather than about the student.
    text: anyBelowFloor && answersCounted > 0 ? FLOOR_RULE : null,
    recordLine: answersCounted > 0 && answersCounted <= 2 ? RECORD_LINE : null,
  };

  const nextAction = buildNextAction({
    variant: headline.variant,
    subject: effectiveSubject,
    focus,
    sections,
  });

  const inline = buildInline({
    counted,
    answersCounted,
    coverageShown,
    effectiveSubject,
    focus,
    recurrence,
    truncated: isTruncated,
  });

  // `rows` is internal scaffolding for the focus arithmetic and must not reach a response body.
  const focusOut = focus
    ? {
        command: focus.command,
        tariff: focus.tariff,
        ao: focus.ao,
        answers: focus.answers,
        sectionIds: focus.sectionIds,
        objectives: focus.objectives,
      }
    : null;

  return {
    meta: {
      answersMarked,
      answersCounted,
      answersExcluded: excluded.length,
      subject: effectiveSubject,
      truncated: isTruncated,
      priorWaRows: Number.isFinite(Number(priorWaRows)) ? Number(priorWaRows) : 0,
      gates: AO_GATES,
    },
    focus: focusOut,
    objectives,
    recurrence,
    chains,
    coverage,
    headline,
    disclosure: disclosureFor(effectiveSubject),
    exclusions,
    floorNote,
    nextAction,
    inline,
  };
}

/**
 * "2 marked Evaluate answers on the record. Two more and we can show you a rate rather than a
 * count. So far: AO4 Evaluation, 5 of 12 marks."
 *
 * The command and objective named here are chosen by WHERE THE EVIDENCE IS, never by score: the
 * most-attempted command word, and within it the objective that has been marked most often. That is
 * a disclosure choice about which record to print, not a claim that one objective is better or
 * worse than another.
 */
function belowFloorHeadline({ counted, focus, objectives }) {
  let command = focus ? focus.command : null;
  let rows = focus ? focus.rows : null;
  if (!command) {
    const byCommand = new Map();
    for (const row of counted) {
      if (!row.command) continue;
      const entry = byCommand.get(row.command) || { command: row.command, count: 0, tariff: 0, rows: [] };
      entry.count += 1;
      entry.tariff = Math.max(entry.tariff, row.tariff || 0);
      entry.rows.push(row);
      byCommand.set(row.command, entry);
    }
    let best = null;
    for (const entry of byCommand.values()) {
      if (!best || entry.count > best.count || (entry.count === best.count && entry.tariff > best.tariff)) best = entry;
    }
    if (best) {
      command = best.command;
      rows = best.rows;
    }
  }

  // Most marked, then most marks allocated, then the last objective in fixed order. The last
  // tie-break is arbitrary by design: at a tie every objective has identical evidence behind it, so
  // any rule is a disclosure choice about which record to print rather than a claim about the
  // student, and a fixed one keeps the sentence stable between renders.
  const scoped = rows ? buildObjectives(rows) : objectives;
  let record = null;
  for (const key of AO_KEYS) {
    const stat = scoped[key];
    if (stat.available <= 0) continue;
    if (
      !record ||
      stat.answers > record.answers ||
      (stat.answers === record.answers && stat.available >= record.available)
    ) {
      record = stat;
    }
  }

  const n = rows ? rows.length : counted.length;
  const opener = command
    ? `${n} marked ${command} ${plural(n, 'answer')} on the record.`
    : `${n} marked ${plural(n, 'answer')} on the record.`;

  if (!record) return opener; // no objective carries marks at all — nothing further is true yet

  const needed = answersToFloor(record);
  return (
    `${opener} ${capitalise(spell(needed))} more and we can show you a rate rather than a count. ` +
    `So far: ${record.label}, ${record.earned} of ${record.available} marks.`
  );
}

/**
 * The single primary action, plus an optional secondary link into the app's own remediation
 * content. Every label is an instruction the app can actually honour: the practice link carries the
 * subject and the tariff only, so the engine lands the student on the marks step with the Start
 * button in reach rather than on a preselection it might not be able to serve.
 */
function buildNextAction({ variant, subject, focus, sections }) {
  const secondary = buildSecondaryLink({ focus, sections });

  if (variant === 'empty') {
    return { kind: 'practise-any', label: 'Mark your first answer', sublabel: null, href: '/written-practice', secondary };
  }
  if (variant === 'below-floor') {
    return { kind: 'practise-any', label: 'Practise another answer', sublabel: null, href: '/written-practice', secondary };
  }
  if (variant === 'coverage') {
    // Evaluate at 20 is the AO4-bearing shape both subjects serve, and the one the coverage
    // sentence has just named.
    const href = subject ? `/written-practice?subject=${subject}&marks=20` : '/written-practice';
    return {
      kind: 'practise',
      label: 'Practise a 20-mark Evaluate',
      // A claim about OUR BANK, never about the qualification. Appendix 6 gives evaluation marks to
      // Examine (8) and Discuss (14) as well as Evaluate, and this repo's own SPEC_ASSESSED says so,
      // so "the only question type in IAL Economics that carries evaluation marks" would be false —
      // and false in the direction that narrows a student's revision. What is true, and what the
      // button can actually honour, is that the Economics bank holds 23 Evaluate items and zero
      // Examine and zero Discuss. In Business, Assess carries evaluation marks too, so no sentence.
      sublabel: subject === 'economics' ? 'It is the only question type we serve in Economics that carries evaluation marks.' : null,
      href,
      secondary,
    };
  }
  if (!focus) return { kind: 'practise-any', label: 'Practise another answer', sublabel: null, href: '/written-practice', secondary };
  const href = subject
    ? `/written-practice?subject=${subject}&marks=${focus.tariff}`
    : `/written-practice?marks=${focus.tariff}`;
  return {
    kind: 'practise',
    label: `Practise a ${focus.tariff}-mark ${focus.command}`,
    sublabel: null,
    href,
    secondary,
  };
}

/**
 * "Read the evaluation points for Market Failure" — the section, among those the student has
 * actually attempted, where the focus objective scored lowest. Within ONE objective, across the
 * student's own sections, so this is not a cross-objective ranking.
 *
 * Absent unless the caller supplies a section lookup, and absent unless the focus objective is AO4,
 * because "evaluation points" names a specific body of hand-authored content in ExtrasTab. The
 * sublabel instructs rather than promises: StudyApp accepts no tab parameter, so the tab cannot be
 * deep-linked.
 */
function buildSecondaryLink({ focus, sections }) {
  if (!focus || focus.ao !== 'ao4' || !sections) return null;

  const lookup = (id) => {
    if (sections instanceof Map) return sections.get(id) || null;
    return typeof sections === 'object' ? sections[id] || null : null;
  };

  const bySection = new Map();
  for (const row of focus.rows) {
    if (!row.sectionId || row.max.ao4 <= 0) continue;
    const entry = bySection.get(row.sectionId) || { sectionId: row.sectionId, earned: 0, available: 0 };
    entry.earned += row.marks.ao4;
    entry.available += row.max.ao4;
    bySection.set(row.sectionId, entry);
  }

  let worst = null;
  for (const entry of bySection.values()) {
    if (entry.available <= 0) continue;
    const share = entry.earned / entry.available;
    if (!worst || share < worst.share) worst = { ...entry, share };
  }
  if (!worst) return null;

  const meta = lookup(worst.sectionId);
  if (!meta || !meta.title || !meta.unitNumber || !meta.subjectSlug) return null;

  return {
    kind: 'extras',
    label: `Read the evaluation points for ${meta.title}`,
    sublabel: 'Open the Extras tab.',
    href: `/${meta.subjectSlug}/unit-${meta.unitNumber}/${worst.sectionId}`,
    sectionId: worst.sectionId,
  };
}

/**
 * The running line for the feedback card — the highest-value surface in the feature, because it is
 * the only one that reaches a student at the moment of maximum relevance with no navigation.
 *
 * Every variant that says "that is your Nth" is gated on the answer JUST MARKED actually being one
 * of them: the profile is built after the new row is written, so without that gate the sentence
 * would claim the student's latest answer carried a tag the marker never put on it.
 */
function buildInline({ counted, answersCounted, coverageShown, effectiveSubject, focus, recurrence, truncated }) {
  if (answersCounted === 0) return null;

  if (answersCounted === 1) {
    return {
      text: 'That is your first marked answer on the record. Write a few more and we will tell you what keeps happening.',
      technique: null,
    };
  }

  if (coverageShown) {
    return {
      text:
        `That is ${answersCounted} marked ${plural(answersCounted, 'answer')} now, and none has carried ` +
        `${AO_DISPLAY.ao4.label} marks yet. Evaluation is assessed on ${EVALUATION_COMMANDS_PHRASE[effectiveSubject]}.`,
      technique: null,
    };
  }

  const latest = counted[counted.length - 1];

  // latest.max[recurrence.ao] > 0 is load-bearing, not belt-and-braces: the recurrence count is
  // taken over answers where that objective was IN PLAY, so an answer where it was not was never
  // counted and "that is the 5th of your 6" would be claiming this answer as one of the five.
  if (
    recurrence && latest && latest.command === recurrence.command
    && latest.max[recurrence.ao] > 0 && latest.tags.includes(recurrence.tag)
  ) {
    const of = truncated ? `your most recent ${recurrence.eligible}` : `your ${recurrence.eligible}`;
    return {
      text:
        `That is the ${ordinal(recurrence.count)} of ${of} ${recurrence.command} ` +
        `${plural(recurrence.eligible, 'answer')} where your marker has flagged ${lowerFirst(recurrence.label)}.`,
      technique: recurrence.technique,
    };
  }

  if (focus && focus.objectives.ao4.pct !== null && latest && latest.command === focus.command && latest.max.ao4 > 0) {
    const stat = focus.objectives.ao4;
    // The ordinal counts answers we hold. Under truncation we no longer hold all of them, so the
    // ordinal is dropped rather than understated and only the ratio, which is true of the answers
    // we do hold, is printed.
    const opener = truncated ? '' : `That is your ${ordinal(stat.answers)} marked ${focus.command} answer. `;
    return {
      text:
        `${opener}You are at ${stat.earned} of the ${stat.available} marks we allocate to ` +
        `${AO_DISPLAY.ao4.label} — ${stat.pct}%.`,
      technique: null,
      // The only inline branch that prints a percentage, so the only one that has to say who
      // produced it. The card it renders in carries no disclosure of its own.
      disclosure: INLINE_DISCLOSURE,
    };
  }

  return null;
}

/**
 * The line under a single answer's AO breakdown when the objectives assessed do not add up to the
 * tariff the question was served at — a 4-mark Define whose AO rows total 2, which is the first
 * thing most students hit.
 *
 * The maxima are NEVER renormalised up to the tariff: inventing an allocation for an objective the
 * command word does not assess is exactly the fabrication this feature exists to prevent. The
 * mismatch is explained instead. Economics may cite Edexcel, because those rows are verbatim
 * Appendix 6; Business may not, because those rows are our inference from a table that names no
 * objective at all.
 *
 * @param {object} answer
 * @param {string|null} answer.subject
 * @param {string|null} answer.command
 * @param {number|null} answer.tariff
 * @returns {string|null} null when there is no shortfall, or no defensible mapping to explain
 */
export function aoShortfallLine({ subject, command, tariff } = {}) {
  const maxes = aoMaxFor(subject, command, tariff);
  if (!maxes) return null; // an excluded attempt makes no claim about what was assessed

  const total = AO_KEYS.reduce((sum, key) => sum + maxes[key], 0);
  const served = Number(tariff);
  if (!Number.isFinite(served) || total >= served) return null;

  const assessed = AO_KEYS.filter((key) => maxes[key] > 0).map((key) => key.toUpperCase());
  if (assessed.length === 0) return null;

  const list = assessed.length === 1
    ? assessed[0]
    : `${assessed.slice(0, -1).join(', ')} and ${assessed[assessed.length - 1]}`;

  // Edexcel is named only where the Appendix 6 entry names the objectives exhaustively. Economics
  // Explain is deliberately not one of them: the table gives it a second sub-case that "also
  // includes analysis", and our AO3-off reading is a conservative choice of ours, not a quotation.
  // Every Business row is ours as well — that table names no objective at all.
  const attribution = isSpecCitable(subject, command) ? `Edexcel assesses ${command}` : `we assess ${command}`;
  return (
    `This question is served at ${served} marks; ${attribution} against ${list} only, ` +
    `so we score the ${list} ${plural(assessed.length, 'part')}.`
  );
}

/**
 * The line that replaces the AO breakdown entirely when the command word is not one the IAL papers
 * use — Outline in either subject, Assess in Economics.
 *
 * Without it the breakdown simply vanishes for roughly four in ten Economics practice items, which
 * reads as a bug rather than a decision: the student saw bars on their last answer and sees none on
 * this one, with no explanation. Saying nothing would also be the less honest option, because the
 * absence is the one place the app is admitting that a question it served does not match the paper.
 *
 * Returns null whenever a mapping DOES exist, so a caller can use a non-null return as its own test
 * for "this attempt is outside the spec".
 *
 * @param {{ subject: string|null, command: string|null, tariff: number|null }} answer
 * @returns {string|null}
 */
export function aoUnmappedLine({ subject, command, tariff } = {}) {
  if (aoMaxFor(subject, command, tariff)) return null; // it maps; the breakdown renders normally
  if (!command) return null; // we could not resolve the item at all, so we cannot name a reason
  return (
    `No assessment-objective breakdown for this one: "${command}" is not a command word the IAL ` +
    'papers use, so there is no published basis for splitting its marks between the objectives. ' +
    'Your marks and feedback above still stand, and this answer is left out of your AO record.'
  );
}
