## 21 September 2026 — packet 39a, `trade-global-economy` (Economics 4.3.2 sub-topics 1-3)

**Packet 39 is split into 39a and 39b, and the founder ruled it.** 4.3.2 has FIVE sub-topics and 55
oracle rows / 46 substantive leaves — roughly double packet 33's 32/28 and packet 34's 26/22, which
were the largest content packets built so far. 39a takes sub-topics 1-3 (19 leaves, 4 blocks, 23
subsections); 39b takes 4 and 5 (27 leaves) and inherits the four ids packets 33 and 34 reassigned
here. The split is by SUB-TOPIC and not by ledger id, because the leaves are what the blocks are
built from and an id can span both halves.

**A half-packet assembles the WHOLE bundle, and carries the other half by id.** Both halves write
one section. 39a therefore keeps the live "Protectionism and the WTO" block and the items serving it
— selected out of the live bundle by id, never retyped — and asserts each one deep-equal to what is
live before staging. Retyping would be an unverified rewrite; dropping them would leave the staged
draft thinner than the section students read today, and nothing else in the gate compares the two.

**The carried block is WIRED even though it is not rewritten.** `LearnModeTab.jsx:255` computes
`hasRefs` for the whole section, so the moment a packet pins some blocks, any block left unpinned
falls to the title fallback for its diagram, to `fallbackItemForBlock` for its quiz, and to
**nothing at all** for its practice. A half-packet that pins only its own blocks silently removes the
practice item from every block it did not touch. Verify B confirmed all five chapters resolve a
diagram, a question and a practice item.

**"New" in a packet runner means not baselined AND not already firing on the live section.** The
runner inherited from packet 34 defines a new finding as `!baseline.has(key)`, which is correct only
where every live finding is baselined. `trade-global-economy` has three that are not — two
`practice.opening` on carried practice items and `spec.uncovered` on ECON-4.3.2-5a-5 — and the
inherited definition reported them as this packet's. They are now counted and printed separately.
Any runner copied from 34 should be checked for this.

**Removing reference material regresses `spec.uncovered`, and that is a reason not to remove it.**
The first pass deleted the four trading-bloc flashcards and the ladder diagram along with the three
bloc QUIZ items. `spec.uncovered` then fired on ECON-4.3.2-4c-6. The distinction that survives: the
defect `quiz-02` and `quiz-03` describe is material **assessed and not taught** — a quiz item pinned
to a block that does not teach it. A flashcard or a diagram in its own tab is not that, and removing
it costs coverage for no finding. The bloc quiz items are still removed; the reference material
stays until 39b rewrites it.

**ECON-4.3.2-4c-6 is accepted as one new DEBT, with evidence, and 39b closes it.**
`spec.uncovered` reads content, notes and extras only (`lib/content-validator.mjs:868`). Live, the
leaf "movement of factors of production" was satisfied by a Notes sentence reading "factors are not
perfectly mobile … exchange rate movements" — which supplies `factors` and `movement` and teaches
nothing about factor mobility inside a trading bloc. That Notes topic is replaced by this packet's,
so the leaf is now correctly reported as untaught. **Writing a sentence to restore the keyword match
without teaching the leaf is the failure the ledger exists to prevent**, and teaching it properly
means building sub-topic 4. Recorded in the runner's `ACCEPTED_DEBT`, which asserts the exception
still fires so a stale exemption cannot survive.

**The `normalize()` stopword filter was already packet 2's, and this packet's own brief said
otherwise.** `topFix-02` and `structure-04` both ask for one; `4d45478` added it
(`components/learn-mode/utils.js:38-41`). Verified by running `matchDiagramsToBlocks` on the live
titles rather than by reading the code: it returns `{}` where the finding says it returns a match,
and a genuine title word still resolves. The runner A/Bs both directions instead of claiming a
change. **Third instance of a false statement in a builder's own brief** (packet 30's "Business
2.4", packet 33's "packet 34", this). Rule 1 applies to our own notes.

**`audit/scripts/snapshot-touched-sections.mjs` crashes on `globalisation` and never reaches the
later sections.** Line 17 reads `snap[k].length` for a table missing from the t=0 file and throws
`TypeError`, so a packet whose section sorts after `globalisation` gets no snapshot and no warning
that it got none. Packet 39a took its snapshot with a one-off equivalent rather than changing a
shared tool mid-packet. It needs a one-line guard and its own commit.
