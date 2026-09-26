/**
 * "Why this loses marks" — a mid-band attempt, derived from the item, never invented.
 *
 * Packet 12.2, E011. A full model answer shows a student what 18–20/20 looks like and tells her
 * nothing about the gap between that and what she actually wrote. The panel this module feeds shows
 * the other end: an answer that is not wrong, stops where most answers stop, and loses marks for a
 * reason the mark scheme states in its own words.
 *
 * WHERE THE PROSE COMES FROM. Nowhere new. The mid-band attempt is the item's own
 * `answerParagraphs` with its closing material removed — the evaluation, the counter-argument, the
 * conclusion, the paragraph that carries the judgement. Nothing is rewritten and nothing is added,
 * so the panel cannot drift from the model answer it is cut from, and a reader can check the claim
 * by opening the full answer directly above it. The page says so in as many words; a constructed
 * example presented as a real script would be the same dishonesty this page exists to argue against.
 *
 * WHAT IT LOSES. Also from the item: the `markScheme` rows the removed paragraphs were the evidence
 * for. Two shapes appear in the bank and both are handled —
 *   - levels ("Level 1 — 1–2 marks" … "Level 4 — 7–8 marks"), used by Examine 8;
 *   - assessment objectives ("AO1 (4 marks)" … "AO4 (6 marks)"), used by Evaluate 20.
 * A row is "out of reach" when its own wording is about judgement, assessment or evaluation, which
 * is precisely what was cut. Nothing is scored: naming a mark out of 20 for an answer nobody wrote
 * would be an invented number.
 */

/** Paragraphs whose label says they carry the closing judgement rather than the case. */
const CLOSING_LABEL = /evaluat|conclusion|counter-?argument|argument\s*2|judg/i;

/**
 * Two mark-scheme shapes exist in the bank and they must be read differently, which is the one
 * thing this module got wrong first time and the walkthrough caught:
 *
 *   LEVELS — "Level 1 — 1–2 marks" … "Level 4 — 7–8 marks", used by `Examine 8`. Matching on words
 *     like "assess" buckets Level 3 as out of reach (its wording is "assessment is implied") and
 *     Levels 1 and 2 as partial (their wording contains "chain of reasoning"), which is backwards.
 *     The structure is ordinal: the TOP level is what the cut paragraph was carrying, and the one
 *     below it is the ceiling the remaining paragraphs reach.
 *   OBJECTIVES — "AO1 (4 marks)" … "AO4 (6 marks)", used by `Evaluate 20`. Here AO4 is evaluation by
 *     definition and AO3 is the analysis that a truncated answer only half-develops.
 *
 * Rows that are neither — the Appendix 6 command definition, "Indicative content" — are context,
 * and are returned separately rather than forced into a bucket they do not belong in.
 */
const LEVEL_RANGE = /^\s*Level\s*(\d+)/i;
const AO_RANGE = /^\s*AO([1-4])\b/i;

const text = (v) => String(v == null ? '' : v);

/**
 * Split a mark scheme into the band the cut paragraphs were carrying (`outOfReach`) and the band
 * the remaining paragraphs top out at (`ceiling`).
 *
 * @returns {{ outOfReach: object[], ceiling: object[], scheme: 'levels'|'objectives'|'unknown' }}
 */
function bandsFor(rows) {
  const levels = rows
    .map((r) => ({ row: r, n: Number((r.range.match(LEVEL_RANGE) || [])[1]) }))
    .filter((x) => Number.isInteger(x.n))
    .sort((a, b) => a.n - b.n);

  if (levels.length >= 2) {
    return {
      scheme: 'levels',
      outOfReach: [levels[levels.length - 1].row],
      ceiling: [levels[levels.length - 2].row],
    };
  }

  const aos = rows
    .map((r) => ({ row: r, n: Number((r.range.match(AO_RANGE) || [])[1]) }))
    .filter((x) => Number.isInteger(x.n))
    .sort((a, b) => a.n - b.n);

  if (aos.length >= 2) {
    return {
      scheme: 'objectives',
      outOfReach: aos.filter((x) => x.n === 4).map((x) => x.row),
      ceiling: aos.filter((x) => x.n === 3).map((x) => x.row),
    };
  }

  // A two-band `Explain 4` scheme ("1–2 marks" / "3–4 marks") has no evaluation band at all. Saying
  // so is better than inventing one; the component renders a sentence for this case.
  return { scheme: 'unknown', outOfReach: [], ceiling: [] };
}

/* ── The near-miss condition ─────────────────────────────────────────────────────────────────── */

/**
 * `[low, high]` for a mark range written any of the ways the bank writes one, or null.
 *
 * Handles "Level 3 — 5–6 marks" (the level prefix is stripped first, or "3" would win), "3–4 marks",
 * "8 marks" and the numerator of a likely score ("5–6 / 8"). En dash, em dash and hyphen all occur.
 */
export function markRange(text) {
  const t = String(text == null ? '' : text).replace(/^\s*Level\s*\d+\s*[—–-]?\s*/i, '');
  const m = t.match(/(\d+)\s*[—–-]\s*(\d+)|(\d+)/);
  if (!m) return null;
  return m[1] ? [Number(m[1]), Number(m[2])] : [Number(m[3]), Number(m[3])];
}

/**
 * TRUE when the panel would claim the attempt "tops out" in the band the model answer above it is
 * already marked in — which teaches nothing, because the student is being shown two answers, told
 * one is worse, and given the same band for both.
 *
 * Measured before this rule existed: 10 of the 29 pages that carried a panel were in this state,
 * every one of them an 8-mark `levels` item whose model answer is marked 5–6 / 8 and whose ceiling
 * row is "Level 3 — 5–6 marks". A panel in that state is suppressed rather than shown.
 *
 * THE RULE ONLY APPLIES TO THE `levels` SCHEME, and that is not a hedge. Under `objectives` the
 * bands are AO allocations (AO4 is 6 of the 20 marks) and the likely score is a total out of 20;
 * comparing the two would be a category error, and a truncated `Evaluate 20` genuinely cannot reach
 * AO4, so its panel is informative by construction.
 */
export function topsOutInModelAnswersOwnBand(item, attempt) {
  if (!attempt || attempt.scheme !== 'levels' || !attempt.ceiling.length) return false;
  const score = markRange(String(item?.likelyScore || '').split('/')[0]);
  const ceiling = markRange(attempt.ceiling[0].range);
  if (!score || !ceiling) return false;
  return !(score[1] < ceiling[0] || score[0] > ceiling[1]);
}

/**
 * Build the mid-band attempt for one model-answer item.
 *
 * @param {object} item - a `data/modelAnswersData.js` entry
 * @returns {null|{kept:object[], dropped:object[], outOfReach:object[], partial:object[],
 *   fullScore:string, basis:string}}
 *   null when the item has too little structure to cut honestly (fewer than two paragraphs), or when
 *   the attempt would top out in the band the model answer is already marked in
 *   (`topsOutInModelAnswersOwnBand`, packet 12.4, E028) — the caller renders no panel at all rather
 *   than a panel about nothing, or a panel that claims a loss it cannot show.
 *
 *   Returning null for both is deliberate: `highestTariffItem` below filters on exactly this, so a
 *   section that holds a second item able to carry an honest panel keeps one, and only a section
 *   where no item can loses the panel altogether. One choke point, and neither caller can render a
 *   suppressed panel by forgetting to ask.
 */
export function midBandAttempt(item) {
  const paragraphs = Array.isArray(item?.answerParagraphs) ? item.answerParagraphs : [];
  if (paragraphs.length < 2) return null;

  // Cut the closing material: anything labelled as evaluation/conclusion/counter-argument, plus the
  // final paragraph regardless of label. The bank's "Para 1 / Para 2 / Para 3" items carry their
  // assessment in the last paragraph and label nothing, so a label-only rule would cut nothing
  // there and the panel would claim a loss the attempt had not actually taken.
  const lastIndex = paragraphs.length - 1;
  const kept = [];
  const dropped = [];
  paragraphs.forEach((p, i) => {
    const label = text(p.label);
    const isClosing = CLOSING_LABEL.test(label) || i === lastIndex;
    (isClosing ? dropped : kept).push({ ...p, index: i, label: label || `Paragraph ${i + 1}` });
  });

  if (kept.length === 0) return null;

  const rows = Array.isArray(item.markScheme) ? item.markScheme : [];
  const described = rows.map((r) => ({ range: text(r.range), desc: text(r.desc) }));
  const { outOfReach, ceiling, scheme } = bandsFor(described);

  const attempt = {
    kept,
    dropped,
    outOfReach,
    ceiling,
    scheme,
    fullScore: text(item.likelyScore),
    basis:
      `${kept.length} of ${paragraphs.length} paragraphs of the model answer above, with ` +
      `${dropped.map((d) => `“${d.label}”`).join(', ')} removed. Nothing is rewritten.`,
  };

  return topsOutInModelAnswersOwnBand(item, attempt) ? null : attempt;
}

/**
 * Packet 12.75, E053. TRUE when the item's mark scheme is level-banded — a row names a LEVEL an
 * attempt reaches ("Level 3 — 5–6 marks"). Only then can a row be printed as the place a truncated
 * attempt "tops out": the attempt's paragraphs are what a level describes.
 *
 * An AO-split scheme ("AO3 (6 marks)") is a different kind of row. It names what an objective
 * REQUIRES of the whole answer, so printing it as a ceiling claims the kept paragraphs meet it. On
 * Economics 1.3.5 that claim is false for BOTH 20-mark items: the extract Evaluate's AO3 row asks for
 * chains "for the tax and against it", and `market-failure-government-intervention-20`'s asks for
 * chains "for and against intervention", while `CLOSING_LABEL` cuts every "against" paragraph from
 * each (audit/runs/packet-12.75/built.md, E053).
 */
export function isLevelBanded(item) {
  const rows = Array.isArray(item?.markScheme) ? item.markScheme : [];
  return bandsFor(rows.map((r) => ({ range: text(r.range), desc: text(r.desc) }))).scheme === 'levels';
}

/**
 * The item a section's "why this loses marks" panel is built on: the highest tariff, and among
 * equal tariffs the one with the most paragraphs to cut, so the panel has something to show.
 * Returns null when no item in the section can support one.
 *
 * `{ levelsOnly: true }` (packet 12.75, E053) restricts the choice to level-banded items, so the
 * ceiling the panel prints is a level the kept paragraphs can be said to reach. The practice shell
 * always passes it. Pages without the shell use `pagePanelItem()` below, which applies the same
 * level-banded rule as a gate rather than a filter (founder decision, 26 Sep 2026).
 */
export function highestTariffItem(items, { levelsOnly = false } = {}) {
  const usable = (items || [])
    .filter((i) => !levelsOnly || isLevelBanded(i))
    .filter((i) => midBandAttempt(i) !== null);
  if (!usable.length) return null;
  return usable.slice().sort((a, b) => {
    const byMarks = Number(b.marks) - Number(a.marks);
    if (byMarks !== 0) return byMarks;
    return (b.answerParagraphs?.length || 0) - (a.answerParagraphs?.length || 0);
  })[0];
}

/**
 * Packet 12.75, E053 applied to every model-answer page (founder, 26 Sep 2026: "Apply everywhere
 * now." A panel that states something false is worse than no panel). The item the default,
 * non-shell page builds its "why this loses marks" panel on: the unrestricted `highestTariffItem()`,
 * kept ONLY if its scheme is level-banded. An AO-split scheme's AO3 row is never printed as the
 * place an attempt "tops out".
 *
 * A gate, not `{ levelsOnly: true }`'s fall-through, on purpose. The decision was to REMOVE the
 * false panel from the eight pages that carried one, not to move it: with the fall-through,
 * Economics 2.3.6 would gain a new panel on `interest-rates-inflation-8` in place of the removed
 * `fiscal-vs-monetary-20` one. Every page whose top item is level-banded keeps exactly the panel
 * it had (midband-census-after.txt).
 */
export function pagePanelItem(items) {
  const top = highestTariffItem(items);
  return top && isLevelBanded(top) ? top : null;
}
