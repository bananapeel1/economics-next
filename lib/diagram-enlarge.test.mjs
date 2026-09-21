import test from 'node:test';
import assert from 'node:assert/strict';
import { readWidthFromGeometry, enlargeWidthPx, TARGET_PX, MAX_READ_PX } from './diagram-enlarge.js';

/*
 * V037 / V048. These assert the PROPERTY — "the smallest authored label reaches 12px" — by
 * re-deriving the label size from the width the module returns, never by re-running the module's
 * own expression. A test that recomputes `12 * vbW / face` and compares it to `12 * vbW / face`
 * passes whatever the sign or the rounding does, which is the failure packet 37 named: a check
 * that reuses the implementation cannot see the implementation's blind spot.
 */

/** What a label of `minFace` authored units actually measures once the drawing is `widthPx` wide. */
const renderedPx = (minFace, vbW, widthPx) => (minFace * widthPx) / vbW;

/* Every frame/face pair found in the corpus on 21 September 2026 — the union of a `data` + `draft`
   census (372 SVGs) and an independent one over `audit/snapshots/` + `audit/content-sections/`
   (412 SVGs) run by Verify A, which is why a few pairs here appear in only one of the two.
   The 1010u row is the one the old fixed 220vw left at 7.35px; the 400u/12u row is one it
   over-scaled to 24.75px and charged ~470px of scroll for.

   THIS LIST IS A FIXTURE AND IT WILL DRIFT. Verify A caught it drifting the day it was written.
   It pins the frames that exist today; it cannot notice a frame authored tomorrow. What makes the
   guarantee hold for a NEW frame is `readWidthFromGeometry` being a function of `face / vbW` with
   no constant in it — these rows are evidence that it does, not the mechanism by which it does. */
const CORPUS = [
  { vbW: 400, minFace: 12 },
  { vbW: 440, minFace: 9 }, { vbW: 440, minFace: 10 }, { vbW: 440, minFace: 12 },
  { vbW: 500, minFace: 7 }, { vbW: 500, minFace: 8 }, { vbW: 500, minFace: 8.5 },
  { vbW: 500, minFace: 9 }, { vbW: 500, minFace: 9.5 }, { vbW: 500, minFace: 10 },
  { vbW: 500, minFace: 11 }, { vbW: 500, minFace: 12 }, { vbW: 500, minFace: 13 },
  { vbW: 526, minFace: 9 },
  { vbW: 560, minFace: 10 }, { vbW: 560, minFace: 11 }, { vbW: 560, minFace: 13 },
  { vbW: 1010, minFace: 9 },
];

/** A 375px phone: the sheet is the full viewport and the pane keeps 12px of padding each side. */
const PHONE_PANE = 351;

test('every frame in the corpus reaches the 12px floor at the Read stop on a 375px phone', () => {
  for (const { vbW, minFace } of CORPUS) {
    const px = enlargeWidthPx('read', { vbW, minFace, paneWidth: PHONE_PANE });
    const label = renderedPx(minFace, vbW, px);
    assert.ok(
      label >= TARGET_PX,
      `${vbW}u/${minFace}u: width ${px}px renders the smallest label at ${label.toFixed(3)}px, under ${TARGET_PX}`
    );
  }
});

test('the fixed 220vw it replaces did NOT reach the floor on every frame', () => {
  /* 220vw at a 375px viewport. Guards against someone "simplifying" the module back to a constant.
     Two frames miss, and the second one is the point: 500u/7u is the frame 220vw was TUNED for.
     The comment that set it reads "the smallest authored label, 7 units on a 500 box, is 12px here
     at 390px" — and it is, at 390. At 375 the same label is 11.55px, and at 360 it is 11.09px. The
     figure was a best case quoted as a property of the sheet. The 1010u frame is the other miss,
     at 7.35px, and it is simply outside the census that justified the constant: that census ran on
     14 September over the `data` column only, when every live viewBox was 500 wide. Authoring moved
     to 440u on 18 September and to 400u after that, all of it staged in `draft`. */
  const OLD = 825;
  const failures = CORPUS.filter(({ vbW, minFace }) => renderedPx(minFace, vbW, OLD) < TARGET_PX);
  assert.deepEqual(failures, [{ vbW: 500, minFace: 7 }, { vbW: 1010, minFace: 9 }]);
  assert.ok(renderedPx(7, 500, OLD) < 11.6, 'the frame 220vw was tuned for misses the floor at 375px');
  assert.ok(renderedPx(9, 1010, OLD) < 7.4, 'the widest frame is barely more legible than inline');
});

test('rounding never costs the floor: a width one pixel narrower would break it', () => {
  // The floor-vs-ceil slip that shipped briefly: 666 instead of 667 puts 500u/9u at 11.988px.
  const { vbW, minFace } = { vbW: 500, minFace: 9 };
  const px = enlargeWidthPx('read', { vbW, minFace, paneWidth: PHONE_PANE });
  assert.ok(renderedPx(minFace, vbW, px) >= TARGET_PX);
  assert.ok(renderedPx(minFace, vbW, px - 1) < TARGET_PX);
});

test('Read is floored at the pane, so the sheet is never smaller than the room it has', () => {
  // A diagram whose labels are already big enough must still fill a wide desktop pane.
  assert.equal(enlargeWidthPx('read', { vbW: 400, minFace: 12, paneWidth: 968 }), 968);
  // and on a phone that same diagram asks for only 400px, not 825.
  assert.equal(enlargeWidthPx('read', { vbW: 400, minFace: 12, paneWidth: PHONE_PANE }), 400);
});

test('Fit never exceeds the pane it is supposed to fit inside', () => {
  for (const fitWidth of [351, 350.9, 350.0001, 100.5]) {
    const px = enlargeWidthPx('fit', { vbW: 500, minFace: 9, paneWidth: 351, fitWidth });
    assert.ok(px <= fitWidth, `fit ${px} exceeds ${fitWidth}`);
  }
});

test('Closer is strictly larger than Read on every frame in the corpus', () => {
  for (const { vbW, minFace } of CORPUS) {
    const read = enlargeWidthPx('read', { vbW, minFace, paneWidth: PHONE_PANE });
    const closer = enlargeWidthPx('closer', { vbW, minFace, paneWidth: PHONE_PANE });
    assert.ok(closer > read, `${vbW}u/${minFace}u: closer ${closer} is not larger than read ${read}`);
  }
});

test('Closer is capped as well as Read', () => {
  // It was not: CLOSER_FACTOR was applied after the cap, so Closer reached 2,560px on the
  // pathological frame the cap exists for. No corpus diagram gets near it; Verify A found it.
  const closer = enlargeWidthPx('closer', { vbW: 5000, minFace: 1, paneWidth: PHONE_PANE });
  assert.equal(closer, MAX_READ_PX);
});

test('a pathological frame is capped rather than asking for a metre of scroll', () => {
  const px = enlargeWidthPx('read', { vbW: 5000, minFace: 1, paneWidth: PHONE_PANE });
  assert.equal(px, MAX_READ_PX);
});

test('unusable geometry returns null, leaving that diagram on the CSS fallback', () => {
  for (const args of [
    { vbW: NaN, minFace: 9 }, { vbW: 0, minFace: 9 }, { vbW: 500, minFace: 0 },
    { vbW: 500, minFace: NaN }, { vbW: -500, minFace: 9 },
  ]) {
    assert.equal(readWidthFromGeometry(args.vbW, args.minFace, PHONE_PANE), null);
    assert.equal(enlargeWidthPx('read', { ...args, paneWidth: PHONE_PANE }), null);
  }
});
