## 21 September 2026 — packet 39b, `trade-global-economy` (Economics 4.3.2 sub-topics 4 and 5)

**`loadBundle()` READS THE LIVE ROW, AND A SECOND-HALF PACKET MUST NOT USE IT.** It selects the
`data` column. A section staged and not published has its real content in `draft`, so a runner
copied from a first-half packet rebuilds on top of the published version and destroys the first
half — silently, with every check green, because every check measures a bundle that is internally
consistent and missing half the section. 39b builds from the first half's COMMITTED SNAPSHOT and
treats the draft as a witness: it must equal that snapshot (first run) or this packet's own output
(a re-run). Anything else means a third session re-staged underneath.

**A PACKET RUNNER HAS TO BE RE-RUNNABLE, AND THE OBVIOUS FORM OF THIS CHECK IS NOT.** The first
version asserted the draft equalled 39a's snapshot and built from the draft. That is correct exactly
once: the moment it stages, the draft is its own output and the next run fails its own first check
with 168 cascading problems. Assert against the snapshot; build from the snapshot.

**THE CARRY LIST INVERTS, AND IT MUST COVER EVERY COLLECTION.** What the first half carried is what
the second half rewrites, so `_packet39b-assessment.mjs` imports 39a's `CARRIED` and uses it as its
REPLACE list — the two halves cannot then disagree about the boundary. **Verify A rejected the
packet because that list covered seven collections and not `extras`**: the live chain "Trading blocs
create trade creation and diversion" came through byte-identical, defining diversion as something
"the common external tariff shifts", which is the framing the finding says to replace and which the
new `trade-diversion` subsection contradicts. The section taught the leaf two ways at once and the
Extras tab had the wrong one. A sweep that covers most collections is a sweep that hides in the one
it misses.

**`npm run contrast` DOES NOT MEASURE AN AUTHORED SVG'S TEXT AGAINST THE SHAPE BEHIND IT.** It reads
`components/learn-mode/processSvg.js` and checks that themed colour declarations resolve through a
token. A `#0b1020` label on a `#64748b` bar inside a diagram is 3.98:1 — below the 4.5:1 floor for
text rendering at about 10.9 CSS px — and passes that guard. Found by a signed-out walkthrough at
390×844, then measured. The check is now in the packet runner, and adding it immediately found four
more: light labels on solid amber (1.82:1) and blue (3.11:1) fills, and a solid amber region where a
0.16 wash was intended. Measured against the page background, only `SLATE` (#64748b) fails as text;
on a solid fill the dark label wins everywhere and the light one loses everywhere.

**A COLLISION GUARD TIGHTER THAN THE ONE THAT ALREADY CAUGHT THE CLASS IS NOT A GUARD.** 39b started
with a glyph-tight box (`y − 0.8·size … y + 0.25·size`) and no line check at all, and passed a quota
label overlapping its neighbour by 2.6 CSS px — it missed by 0.575 units. `packet-31-financial-planning.mjs:705-772`
already uses `1.2 × face` **and** a segment-against-box crossing test, both A/B-proven. Adopting both
found four further collisions that the box test could not see, including a y-axis running through
its own "Price" label. **Check `git log` for the most recent version of a guard before writing one.**

**"NOT RECOVERABLE" AND "ALREADY TAUGHT" ARE DIFFERENT PROPERTIES, AND A PACKET CAN SATISFY THE
FIRST BY BREAKING THE SECOND.** Holding this section to zero recoverable recalls pushed three
reorders off the step that taught them. One landed two subsections EARLIER — a retaliation sequence
asked before retaliation had been mentioned — which passes the recoverability gate precisely because
the material is untaught at that point. Verify A found it. The runner now fails any reorder whose
best-matching subsection comes later in the deck than the one carrying it.

**TEN CHAPTERS FILLS `FREE_QUIZ_MAX`, AND THE SIGNED-OUT PRE-TEST THEN DOES NOT RUN.** Documented at
`lib/preview-limits.js:99-102` — "at nine or ten the payload is full, so PRETEST_HEADROOM gets
nothing and the pre-test does not run — it hides rather than spoils itself". This is the second
section in that position. The trade is deliberate: all ten check-ins keep their question, which is
what `structure-05` and `quiz-02` are about. A verification script inherited from a five-chapter
packet asserted "at least three pre-test items reached the payload" and had to be corrected to the
documented either/or.

**THE IAL SPECIFICATION SAYS "WELFARE LOSS", NOT "DEADWEIGHT LOSS".** `terms.off-spec` lists
deadweight loss among the vocabulary the specification does not use, and packet 13 strips it. It is
universal in economics teaching, which is exactly why it went in without thinking. Thirteen
occurrences, all replaced.
