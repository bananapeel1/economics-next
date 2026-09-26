# V042 — match-recall chips at 390×844, re-measured (26 September 2026, packet 13.3 session)

The fix itself is not this packet's. It landed in **packet 41 (`6e45ff7`)**: `MatchRecall.jsx` gives
every option the class `lm-match-chip`, and `app/globals.css` (phone block, the rule beside the
classify-chip one) sets `.lm-word-chip.lm-match-chip { white-space: normal; text-align: left;
max-width: 100%; }`. It is on `origin/main` too. The ledger item stayed open because nobody had
re-measured it the way the item asks — one match recall per subject at 390×844 — and its `file`
field names `ReorderRecall.jsx`, which is not where the defect or the fix lives.

Method: Browser pane, 390×844, signed out, `localhost:3001` (the remediation dev server). Walk Learn
Mode with Next until a step carries a match recall, then measure every chip's box against the word
bank's box with `getBoundingClientRect`. **Control:** inject one style rule in the page only —
`.lm-word-chip.lm-match-chip { white-space: nowrap !important; max-width: none !important }` — which
is the pre-fix behaviour, re-measure, remove it, re-measure. No source file was touched.

| | Economics 4.3.3 `balance-payments-exchange-rates`, step 4/43 | Business 2.3.4 `resource-management`, step 2/30 |
|---|---|---|
| word bank | x 29–355 (326px) | x 29–355 (326px) |
| options | 4, 67–92 chars | 4, 59–83 chars (the section's longest, 83) |
| **with the fix** | all 4 inside the bank, 326px wide, 62–86px tall (wrapped to 2–3 lines) | all 4 inside, 326px wide, 62–86px tall |
| **control (nowrap)** | 0 of 4 inside: 544–701px wide, left edge at −80 to −158 | 0 of 4 inside: 478–616px wide, left edge at −47 to −116 |
| document scrollWidth | 390 in both states (the overflow is clipped, not scrollable — which is why it was invisible to a horizontal-scroll check: the first words are simply gone) | 390 |

Interaction (Economics): tapped each left item then an option — the placed option wraps inside its
slot (slot 42–342 inside the 29–355 column, 83px tall). Placed two deliberately wrong and pressed
Check matches: both `.lm-match-slot.wrong` render the struck option and the right one, wrapped; 8 of
8 slot boxes and their children inside the column; "✗ 2 of 4 matched".

Not re-measured: FillInRecall's chips keep `white-space: nowrap` on purpose (a blank is one word and
must not break mid-word); ClassifyRecall's chips carry the sibling rule and were fixed before V042.
