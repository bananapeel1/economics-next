/**
 * How a "common mistake" card is read. The ONE place that knows which field names mean what, shared by
 * components/MistakesTab.jsx and the validator's `mistakes.shape` rule, so the tab and the gate cannot
 * disagree about what renders.
 *
 * Why this exists (packet 47, measured 26 Sep 2026): the tab read only title/mistake/correction/examTip,
 * but the rebuild packets wrote four other shapes. 157 live cards across 22 of 43 sections showed a
 * title over two empty boxes, to Pro students only, which is why no signed-out walkthrough saw it.
 *
 *   canonical      title · mistake · correction · examTip   (packets 14-18, 20-23, 39, 41, 47)
 *   looks_like     title · looks_like · why · instead        (packets 24-37, 43-46)
 *   looks_like/fix title · looks_like · why · fix            (packet 32)
 *   quote          title · quote · why · fix                 (packets 40, 42)
 *   error          title · error · why · fix                 (packet 19)
 *
 * The first field in each list that holds text wins. A new shape needs adding here, not in the tab.
 */
export const WRONG_FIELDS = ['mistake', 'looks_like', 'quote', 'error'];
export const WHY_FIELDS = ['why'];
export const RIGHT_FIELDS = ['correction', 'instead', 'fix'];

const text = (v) => (typeof v === 'string' && v.trim() ? v.trim() : '');
const first = (item, fields) => {
  for (const f of fields) { const t = text(item?.[f]); if (t) return t; }
  return '';
};

/** { title, wrong, why, right, examTip }, every value a string ('' when absent). */
export function readMistake(item) {
  return {
    title: text(item?.title),
    wrong: first(item, WRONG_FIELDS),
    why: first(item, WHY_FIELDS),
    right: first(item, RIGHT_FIELDS),
    examTip: text(item?.examTip),
  };
}

/** What a card would be missing on screen. Empty array means it renders whole. */
export function mistakeGaps(item) {
  if (!item || typeof item !== 'object') return ['not an object'];
  const m = readMistake(item);
  const gaps = [];
  if (!m.title) gaps.push('title');
  if (!m.wrong) gaps.push(`the mistake (${WRONG_FIELDS.join(' / ')})`);
  if (!m.right) gaps.push(`the correct approach (${RIGHT_FIELDS.join(' / ')})`);
  return gaps;
}
