## Handoff — after packet 39b (written 21 September 2026)

**`trade-global-economy` is finished.** Both halves are built, verified and staged: 10 blocks, 51
subsections, 61 steps, 46 of 46 leaves of Economics 4.3.2 taught in `content[]`, and the section is
at **0 BLOCK / 1 DEBT** against the 8 / 28 it carries live. Nothing is published. The next packet is
whatever `audit/ledger.json` has most open — `ledger.mjs packets` will say.

### If you are building the second half of a section, read this first

1. **`loadBundle()` READS `data`, WHICH IS THE LIVE PUBLISHED ROW.** A staged-not-published section
   has its real content in `draft`. Copy a first-half runner without changing this and you will
   rebuild on top of the published version and destroy the first half, with every check green,
   because every check will be measuring a bundle that is internally consistent and missing half the
   section. Build from the first half's **committed snapshot** in `audit/snapshots/`; use the draft
   only as a witness that it is either that snapshot or your own output.
2. **Make the runner re-runnable, and test that by running it twice.** Asserting "the draft equals
   the first half's snapshot" is correct exactly once — your own stage falsifies it.
3. **Invert the carry list rather than writing a second one**, and make sure it covers EVERY
   collection. `_packet39b-assessment.mjs` imports 39a's `CARRIED` and treats it as its REPLACE
   list. Verify A rejected 39b because that list covered seven collections and not `extras`, so a
   live chain contradicting the new teaching text survived byte-identical.

### Three guards that exist now and should be copied forward

- **SVG contrast.** `npm run contrast` reads `processSvg.js` and the themed tokens; it does NOT
  measure an authored diagram's `<text>` against the `<rect>` behind it. A `#0b1020` label on a
  `#64748b` bar is 3.98:1 and passes it. The check in `scripts/packet-39b-trade-global-economy.mjs`
  composites each rect's fill over the page background at its own opacity and requires 4.5:1.
  Measured for this palette: only `SLATE` fails as text on the background; on a solid fill the dark
  label wins everywhere (amber 8.82, blue 5.15, green 5.02) and the light one loses everywhere
  (1.82, 3.11, 3.18).
- **Text against lines, not only against other text.** A box-against-box check passed a label its
  own curve ran straight through. `packet-31-financial-planning.mjs:705-772` has both the segment
  test and a `1.2 × face` vertical tolerance, A/B-proven; 39b started tighter and missed a real 2.6
  CSS px overlap by 0.575 units. **Check `git log` for the newest version of a guard before writing
  one.**
- **A recall must not test material the deck has not reached.** Holding a section to zero
  recoverable recalls pushes recalls off the step that taught them, and one of 39b's landed two
  subsections EARLIER — which passes the recoverability gate precisely because the material is
  untaught there. Both properties need checking.

### Section-specific things still open

- **`C-trade-global-economy-topFix-05` is reopened on packet 12.4.** Its buildable clauses are done
  (Define 2, Explain 4, `Outline` gone, the Appellate Body limitation in the WTO subsection). What
  is left is "present 10- and 20-mark guidance as levels", and **IAL Economics has no 10-mark item**
  — the census is 2, 2/4, 4, 4, 6, 8, 14, 20. The 14- and 20-mark levels-marking work is real and
  belongs with the model-answers packets.
- **Ten chapters fills `FREE_QUIZ_MAX`, so this section's signed-out pre-test does not run.**
  Documented at `lib/preview-limits.js:99-102`; this is the second section in that position. It is
  a deliberate trade for all ten check-ins keeping their question. If a future packet raises the
  cap, this section gains a pre-test for free.
- **`audit/scripts/snapshot-touched-sections.mjs` still crashes on `globalisation`** and silently
  skips every section after it (packet 39a's finding; line 17 reads `snap[k].length` for a table
  missing from the t=0 file). One-line guard, its own commit.
- **`validate-content.mjs` silently ignores `--staged`** and validates the live row. Verify A hit
  this: it reported 8 BLOCK / 28 DEBT for a section whose staged bundle is 0 / 1. Do not read that
  output as the staged result; run `validateSection` over the snapshot instead.

### A measurement worth keeping

Packet 11 closed V037 while this packet was being verified, and its numbers match the ones taken
here independently: **Learn Mode draws a diagram at 298px and the Diagrams tab at 291px**, so a
15-unit face on a 400-unit frame lands at about 11 CSS px. Its resolution is that the full-screen
sheet enlarges the whole drawing rather than the font floor being raised, so the 400/15/12
convention stands and every diagram needs its `Enlarge diagram` path to work.
