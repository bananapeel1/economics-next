/**
 * Marking for quantitative drill items. Pure, synchronous, no network, no model.
 *
 * Three outcomes matter and they are not the same thing:
 *
 *   correct  the answer is inside the declared tolerance
 *   ofr      the answer is wrong, but it is what this step's method produces when applied
 *            to the student's OWN earlier figures — the own figure rule an examiner applies,
 *            and the only way a method mark is earned here
 *   slip     the answer matches a named wrong method, so the feedback names it
 *
 * A slip scores zero. It is a diagnosis, not a concession: the method was wrong, and
 * saying which wrong method is worth more to the student than the mark would be.
 */

/** '$1,250' → 1250, '−0.75' → -0.75, '12 %' → 12, '' → null. */
export function parseNumber(raw) {
  if (raw === null || raw === undefined) return null;
  const cleaned = String(raw)
    .replace(/[$£€,%\s]/g, '')
    .replace(/[−–—]/g, '-');
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

const EPS = 1e-9;
/** A step's answer as the card shows it: the step owns the units, the marker only reads them. */
const format = (step, value) => {
  const v = Number(value);
  const n = typeof step.dp === 'number'
    ? Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: step.dp, maximumFractionDigits: step.dp })
    : Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 6 });
  // A word takes a space and a unit symbol does not: "480 units", "500 units per worker", "$500m",
  // "6.25%". The test used to be a single whole word, so "units per worker" ran into the figure.
  const gap = /^[a-z]{3,}/i.test(step.suffix || '') || /\s/.test(step.suffix || '') ? ' ' : '';
  // The sign goes in front of the currency, with a true minus: "−$10,420" was "$-10420" (packet 13.3).
  return `${v < 0 ? '\u2212' : ''}${step.prefix || ''}${n}${step.suffix ? `${gap}${step.suffix}` : ''}`;
};
const within = (a, b, tol) => Math.abs(a - b) <= tol + EPS;
const sentence = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).replace(/\.?$/, '.') : '');

/**
 * Mark one step.
 * @param {object} step     from the item
 * @param {number|string|null} value  the student's parsed response
 * @param {object} values   every parsed response, keyed by step id, for own-figure chains
 */
export function markStep(step, value, values) {
  if (value === null || value === undefined || value === '') {
    return { awarded: 0, marks: step.marks, outcome: 'blank', note: 'No answer given.' };
  }

  if (step.type === 'choice') {
    const ok = value === step.answer;
    return ok
      ? { awarded: step.marks, marks: step.marks, outcome: 'correct', note: step.correctNote || 'Correct.' }
      : { awarded: 0, marks: step.marks, outcome: 'wrong', note: step.wrongNote || `Not correct — the answer is ${step.answer}.` };
  }

  // Sign is conventionally dropped on elasticities. Accept either, and say so.
  const target = step.acceptAbs ? Math.abs(step.answer) : step.answer;
  const given = step.acceptAbs ? Math.abs(value) : value;

  if (within(given, target, step.tolerance)) {
    const wrongSign = step.acceptAbs && value * step.answer < 0;
    return {
      awarded: step.marks,
      marks: step.marks,
      outcome: 'correct',
      note: wrongSign ? 'Correct. The sign is conventionally dropped here, but write it in.' : 'Correct.',
    };
  }

  const carried = typeof step.ofr === 'function' ? step.ofr(values) : null;
  if (carried !== null && carried !== undefined && Number.isFinite(carried)) {
    // A carried figure is judged a little more loosely: the student may have rounded
    // their own earlier answer before using it.
    const tol = Math.max(step.tolerance, Math.abs(carried) * 0.005);
    const carriedTarget = step.acceptAbs ? Math.abs(carried) : carried;
    if (within(given, carriedTarget, tol)) {
      return {
        awarded: step.marks,
        marks: step.marks,
        outcome: 'ofr',
        note: 'Method is right and your own earlier figure is carried forward correctly, so the mark stands.',
      };
    }
  }

  const slip = (step.slips || []).find((s) => Number.isFinite(s.value) && within(value, s.value, step.tolerance));
  if (slip) return { awarded: 0, marks: step.marks, outcome: 'slip', note: slip.note };

  /*
   * Packet 13.2, from Verify B: this said `Not correct. ${method}` — and the method line is
   * printed above the input the student just typed into, so the only feedback a wrong answer
   * with no diagnosis got was the sentence it had been reading while getting it wrong. The
   * answer is one tap away behind "Worked solution" in any case, so withholding it here bought
   * nothing and cost the student the one thing they needed.
   */
  return {
    awarded: 0,
    marks: step.marks,
    outcome: 'wrong',
    note: `Not correct — the answer is ${format(step, step.answer)}.`,
  };
}

/**
 * Mark a whole item.
 * @param {object} item       from buildItem()
 * @param {object} responses  { [stepId]: string|number }
 * @returns {{awarded:number,total:number,usedOfr:boolean,steps:object}}
 */
export function markItem(item, responses = {}) {
  const values = {};
  for (const step of item.steps) {
    values[step.id] = step.type === 'choice' ? responses[step.id] ?? null : parseNumber(responses[step.id]);
  }

  const steps = {};
  let awarded = 0;
  let total = 0;
  let usedOfr = false;

  for (const step of item.steps) {
    const result = markStep(step, values[step.id], values);
    steps[step.id] = result;
    awarded += result.awarded;
    total += step.marks;
    if (result.outcome === 'ofr') usedOfr = true;
  }

  return { awarded, total, usedOfr, steps };
}

/** The response set that scores full marks. Used by the guard script and the harness. */
export function correctResponses(item) {
  const out = {};
  for (const step of item.steps) out[step.id] = step.answer;
  return out;
}
