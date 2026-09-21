/**
 * How long a question is worth, from the paper it comes from.
 *
 * Packet 12.2, E010. The lab page shows a time estimate on every written question, and a per-item
 * guess is exactly the kind of invented number this programme keeps removing. So there is one
 * constant per paper, taken from the specification's own examination rubric, and every estimate is
 * derived from it:
 *
 *   Economics Units 1 (WEC11) and 2 (WEC12)  1 hour 45 minutes, 80 marks   audit/raw/econ_spec.txt:493, 1989
 *   Economics Units 3 (WEC13) and 4 (WEC14)  2 hours, 80 marks             audit/raw/econ_spec.txt:1226, 2006
 *   Business Units 1-4                       2 hours, 80 marks             audit/raw/bus_spec.txt:489, 827, 1073, 1306
 *
 * Found by the wording ("The examination lasts …"), not by a unit number in a ledger item — 154
 * ledger items cite UK GCE numbers that do not exist in the IAL spec.
 *
 * The estimate is working time only. It does not reserve reading time, because the specification
 * does not state one and inventing a deduction would be the same fault in the other direction.
 */

/** `{ minutes, marks }` for the paper a (subject, unit) pair sits in. */
export function paperFor(subject, unit) {
  const u = Number(unit);
  if (String(subject).toLowerCase() === 'business') return { minutes: 120, marks: 80 };
  return u >= 3 ? { minutes: 120, marks: 80 } : { minutes: 105, marks: 80 };
}

/** Minutes per mark in that paper: 1.3125 for Economics Units 1-2, 1.5 everywhere else. */
export function minutesPerMark(subject, unit) {
  const paper = paperFor(subject, unit);
  return paper.minutes / paper.marks;
}

/**
 * Working minutes for a tariff, rounded to the nearest minute and never below 1.
 * `Evaluate 20` in Economics Unit 1 is 26 minutes; `Explain 4` is 5.
 */
export function minutesForMarks(subject, unit, marks) {
  const m = Number(marks);
  if (!Number.isFinite(m) || m <= 0) return null;
  return Math.max(1, Math.round(m * minutesPerMark(subject, unit)));
}

/** "26 min", or null when the tariff is missing — a caller must render nothing, not "NaN min". */
export function timeLabel(subject, unit, marks) {
  const mins = minutesForMarks(subject, unit, marks);
  return mins === null ? null : `${mins} min`;
}

/** "1 hour 45 minutes · 80 marks", for the page to show what the estimate is derived from. */
export function paperLabel(subject, unit) {
  const { minutes, marks } = paperFor(subject, unit);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const time = m ? `${h} hour${h === 1 ? '' : 's'} ${m} minutes` : `${h} hour${h === 1 ? '' : 's'}`;
  return `${time} · ${marks} marks`;
}
