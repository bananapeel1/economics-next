/**
 * How wide the enlarge sheet draws a diagram (V037, V048).
 *
 * Kept out of the component so `lib/diagram-enlarge.test.mjs` can exercise it without a DOM, and
 * so the test can re-derive the label size from the returned width instead of re-running the same
 * expression. A check that reuses the implementation cannot see the implementation's blind spot.
 *
 * The sheet used to be `width: 220vw` — 825px at a 375px viewport — a figure tuned for one frame:
 * 500 viewBox units with a 7-unit smallest face gives 11.55px there. The corpus is not one frame.
 * Measured 21 September 2026 over `data` + `draft`: 400u x30, 440u x64, 500u x197, 526u x1,
 * 560u x79, 1010u x1. At 1010u that fixed width leaves the smallest label at 7.35px — illegible
 * after tapping "enlarge" — while a 400u/12u diagram is blown up to 24.75px and charged ~470px of
 * horizontal scroll for text that was never at risk.
 *
 * Legibility is a property of `face / viewBoxWidth`. A viewport unit cannot know which diagram it
 * is scaling, so the diagram's own geometry sets the width.
 */

/** The smallest label we are willing to call readable, in CSS px, against 16px body copy. */
export const TARGET_PX = 12;
/** Read is capped so a pathological frame cannot ask for a metre of scroll. */
export const MAX_READ_PX = 1600;
/** Closer is a fixed step beyond Read, for a student who wants it bigger than the floor. */
export const CLOSER_FACTOR = 1.6;

/**
 * The width at which a diagram's smallest authored label reaches TARGET_PX, floored at the space
 * already available so the sheet is never smaller than the room it has, and capped at MAX_READ_PX.
 * Returns null for geometry it cannot use, which leaves that diagram on the CSS fallback.
 */
export function readWidthFromGeometry(vbW, minFace, availableWidth = 0) {
  if (!Number.isFinite(vbW) || vbW <= 0) return null;
  if (!Number.isFinite(minFace) || minFace <= 0) return null;
  const available = Number.isFinite(availableWidth) && availableWidth > 0 ? availableWidth : 0;
  return Math.max(available, Math.min(MAX_READ_PX, (TARGET_PX * vbW) / minFace));
}

/**
 * What the sheet writes to `--lm-enlarge-w` at each stop, rounding included.
 *
 * Read rounds UP and Fit rounds DOWN, and the direction is load-bearing in both: flooring 666.67
 * to 666 puts a 9-unit face on a 500 box at 11.988px and misses the floor this module exists to
 * guarantee, and a Fit rounded up overflows the pane it is supposed to fit inside.
 */
export function enlargeWidthPx(stop, { vbW, minFace, paneWidth, fitWidth }) {
  if (stop === 'fit') {
    const w = Number.isFinite(fitWidth) ? fitWidth : paneWidth;
    return Number.isFinite(w) ? Math.floor(w) : null;
  }
  const read = readWidthFromGeometry(vbW, minFace, paneWidth);
  if (read == null) return null;
  // The cap applies to Closer too. Multiplying after `Math.min(MAX_READ_PX, ...)` let Closer reach
  // 2,560px on the pathological frame the cap exists for — found by Verify A, not by the corpus,
  // which never gets near it.
  return Math.ceil(stop === 'closer' ? Math.min(MAX_READ_PX, read * CLOSER_FACTOR) : read);
}
