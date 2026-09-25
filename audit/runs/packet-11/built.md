# Packet 11 — built

## Changed

| file | what |
|---|---|
| `components/learn-mode/DiagramEnlarge.jsx` | **new.** The enlarge sheet, extracted from `InlineDiagram` so both surfaces share it. Owns the three stops, the pane measurement and the overflow cue. |
| `lib/diagram-enlarge.js` | **new.** The width arithmetic, DOM-free so it can be tested without one. |
| `lib/diagram-enlarge.test.mjs` | **new.** 9 tests, registered in `npm test`. |
| `components/learn-mode/InlineDiagram.jsx` | `DiagramModal` deleted (−94 lines); imports the shared sheet. |
| `components/DiagramsTab.jsx` | tap-to-enlarge + a real `<button>`; mounts the shared sheet. |
| `components/learn-mode/processSvg.js` | comment only — step 7 asserted the now-false 220vw/12px claim. |
| `app/globals.css` | widths become `var(--lm-enlarge-w, …)`; zoom-bar and enlarge-button rules; pane is a flex child measured as a content box. |
| `package.json` | the new test file. |

## The one idea

`220vw` is a viewport unit, and legibility is not a property of the viewport — it is a property of
`face / viewBoxWidth`. The sheet now sizes each diagram so that **its own** smallest authored label
reaches 12px, floored at the pane and capped at 1600px. Nothing changes any font-size: this is a
uniform scale of the whole drawing, which is why F088's two rejected font floors (both relayouts,
1,419 of 1,420 labels moved) do not apply to it.

Consequences, measured: every frame in the corpus hits the floor including 1010u (7.35px → 12px);
mean width drops 825 → ~600px, so **most diagrams scroll less than before for the same 12px**; and
400u/12u diagrams stop being blown up to 24.75px and charged ~470px of scroll for it.

## Post-Verify-A fixes

Verify A confirmed all four ids and found four defects, all fixed before commit:

1. `CLOSER_FACTOR` was applied **after** the cap, so Closer could reach 2,560px on the pathological
   frame the cap exists for. Now capped; pinned by a test.
2. The zoom bar was gated on `!imageUrl` but the width on `readWidth != null`, so an unmeasurable
   diagram would have rendered three inert buttons. Now gated on both.
3. `processSvg.js` step 7 still asserted "the sheet draws at 220vw, where the smallest authored label
   is 12px at 390px" — the exact best-case-quoted-as-a-property this packet exists to correct, in the
   file the CSS and the ledger both cite as the authority for "no font floor".
4. The test's `CORPUS` fixture had drifted on the day it was written: it listed a 440u/9u pair the
   census does not find and omitted 500u/9.5, 560u/11, 560u/13 and 440u/10. Widened to the union of
   both censuses, with a note saying it is a fixture and cannot notice a frame authored tomorrow.

## Two things the arithmetic corrected

- **At 375px the old fixed width missed its own floor on TWO frames, not one.** 500u/7u — the frame
  220vw was tuned for — is 12px at 390 but **11.55px at 375** and 11.09px at 360. The test asserts
  both misses so nobody can quietly restore the constant.
- **`Math.floor` on the width breaks the guarantee by 0.012px.** 666 instead of 667 puts 500u/9u at
  11.988px. Read rounds up, Fit rounds down, and a test asserts one pixel narrower would fail.

## Gates

`npm run build` 0 · `npm test` 250/250 · `npm run validate` 0 · `npm run exposure` 0 ·
`npm run recalls` 0 · `npm run contrast` 0. `ledger.mjs unverified 11` → gate clear.

No content written, no DB write, no snapshot taken — this packet touches only the frame a diagram is
drawn in. `audit/scripts/check-staged-drafts.mjs` exits 1 on a **pre-existing** crash unrelated to
this packet (`TypeError: Cannot read properties of undefined (reading 'localeCompare')` at `:62` — a
bundle snapshot in `audit/snapshots/` has no `section_id`).
