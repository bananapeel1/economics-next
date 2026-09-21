# Verify B — packet 36 (`managing-finance`), student walkthrough

390×844, storage cleared, signed out, real taps. Dev server `remediation-dev` on port 3001.
Route walked: `/business/unit-2/managing-finance?draft=1` (packet 36 is **staged, not published** — the
un-flagged route still serves the pre-packet section, so the draft-preview flag is the only way a
student path reaches this content).

Started from `brief.md`'s acceptance script. `built.md` and `verify-a.md` were read only after the walk,
to check the two escalations below.

---

## Verdict

**The section teaches well and the acceptance script passes — except that every diagram in it is
illegible on the phone it was built for.** Eight diagrams, all of them, render their labels at
**7.1–9.3 CSS px** against body copy of 14–17px on the same screen. That includes the balance-sheet
figures a student is asked to extract and the ratio workings printed beside them. This is the packet's
headline new asset (`structure-06`, `specGap-04`, `topFix-05`) and on a 390px phone a student cannot
read it without opening the enlarge modal and panning in two directions.

Nothing else blocks. The two failure modes I was told to hunt for: the resume pointer is **clean**
(clamps correctly, no blank body); the illegible-table failure is **present**, in a form no table check
would have caught — it is not an HTML `<table>`, it is a table drawn inside an SVG.

---

## Step-by-step

Pre-test → 29 steps → topic complete. Counter read correctly at every step (`Step N of 29`, footer
`N / 29`, progress 3% → 100%). Header read `SECTION 2.3.3 · Managing Finance` throughout — right
section, right number.

| step | what was on screen | result |
|---|---|---|
| pre-test | "Quick pre-test", 3 MCQs (gross profit; which figure the spec also calls net profit; statement of comprehensive income vs financial position). Answered 3/3. "Answers are held back until the end, so the same questions can still test you later." | PASS — optional, skippable, no gate |
| 1 | Ch1 Profit 1/5 · **The Three Profits**. Key idea, Lantana Tiles worked figures, misconception, Exam Matters with an Appendix 6 citation. Fill-in, 3 blanks, word bank `66 · 340 · 650 · 316 · 90` (2 distractors). "Show hints" gives *"one subtraction from the top line"*, *"the second subtraction, before anything is paid to a lender"*, *"the last step on the ladder, and the one the owners keep"*. Filled all three by tap-blank-then-tap-word → "✓ All correct!" | PASS — semantic hints, no letter prefixes |
| 2 | **Gross Profit**. Classify: cost of sales vs below gross profit, 5 items | PASS |
| 3 | **Operating Profit**. Fill-in, bank `500 · 120 · 470 · 150 · 1150` | PASS |
| 4 | **Profit for the Year**. Match, 4 pairs, 5 right-hand options | PASS |
| 5 | **The Statement of Comprehensive Income**. Classify: which document answers which question | PASS — `specGap-02` taught, not just quizzed |
| 6 | **Ch1 check-in**: profit waterfall diagram (Revenue $2,000,000 → Gross $700,000 → Operating $200,000 → For the year $160,000, with $1,300,000 / $500,000 / $40,000 deduction callouts); "What a correct diagram shows" checklist; MCQ *"No interest figure is given. The largest profit that can be worked out from this is:"* → D, operating profit $200,000; worked example "Define the term 'profit for the year' (2 marks)" with a Pro-locked model answer, a free-text box **and** a Mark my answer button; Explain it back; chapter takeaway | PASS on content — **FAIL on legibility, see below**. Reworded Q15 confirmed: it asks for operating profit and says no interest figure is given |
| 7 | **Gross Profit Margin**. Fill-in, answers `240 · 30% · less` | PASS |
| 8 | **Operating Profit Margin**. Fill-in, answers `60% · 32% · 8%`, bank adds `40% · 12%` | PASS — disjoint from step 7's bank |
| 9 | **Profit for the Year Margin**. Classify: widens the gap below gross vs below operating profit | PASS |
| 10 | **Ways to Increase Profits**. Fill-in | PASS |
| 11 | **Ways to Improve Profitability**. Match | PASS |
| 12 | **Ch2 check-in**: "Measuring Profitability" diagram (two tabs); MCQ `35% / 10% / 65% / 53.8%`; guided practice *"Calculate the wholesaler's gross profit margin and its operating profit margin (4 marks)"* — first paragraph is scaffold with no figures and no mark scheme, second paragraph is the scheme; spaced recall labelled **"Recall from chapter 1 · The Three Profits"**; takeaway | PASS — guidance shape correct; the repeated recall is labelled as spaced, not a duplicate |
| 13 | Ch3 · **Profit Is Not Cash**. Classify: cash only / profit only / both | PASS — `specGap-03` |
| 14 | **The Statement of Financial Position**. Classify: current assets / current liabilities / neither | PASS — `specGap-04` |
| 15 | **Working Capital**. Fill-in, `67 days · 27 days · 95 days` | PASS — `specGap-05` |
| 16 | **The Importance of Cash**. Fill-in | PASS |
| 17 | **Ch3 check-in**: "What the Business Holds and Owes", two tabs — **the statement, labelled** (current assets $240,000 / $150,000 / $10,000 → total $400,000; current liabilities $180,000 / $50,000 / $20,000 → total $250,000; non-current lines greyed; current ratio 1.60:1; acid test 0.64:1) and **the working capital cycle** (Cash $10,000, Inventory $240,000 / 67 days, Trade receivables $150,000 / 27 days, 95 days one full turn). MCQ on profit vs cash. Practice "Construct a labelled diagram of the working capital cycle (4 marks)". Spaced recall labelled "Recall from chapter 1 · Gross Profit" | PASS on content — **FAIL on legibility** |
| 18–21 | Ch4 Liquidity: **The Current Ratio**, **The Acid Test Ratio**, **Selling Assets and Extending Supplier Credit**, **Factoring and Inventory JIT** (fill-in, fill-in, fill-in, match) | PASS — factoring now taught |
| 22 | **Ch4 check-in**: "Measuring and Improving Liquidity" diagram; MCQ `1.17:1 / 2.08:1 / 1.60:1 / 0.64:1` — the acid-test item now lands at the end of **Liquidity**, not Business Failure; practice; spaced recall | PASS — `structure-04` wiring fixed |
| 23–28 | Ch5 Business Failure: poor cash flow & overtrading, overestimation of sales & poor inventory control, poor marketing & poor quality, market conditions, exchange rates & interest rates, regulation & supplier problems & natural phenomena | PASS — all four previously-missing externals present |
| 28 | Reorder, 4 items, a genuine causal chain (supplier stops delivering → revenue stops → bank runs down → invoice falls due). Up/down arrows, "Show hint", "Check order" | PASS — genuine sequence, not a ranking |
| 29 | **Ch5 check-in**: "How Businesses Fail" diagram; MCQ on overtrading; "Reveal mark scheme"; spaced recall (match) | PASS on content — **FAIL on legibility** |
| end | "Topic complete · Managing Finance · 100% strength · review tomorrow", score breakdown (Recall 1/1, Written practice 0/12), "What you covered" listing the five chapters | PASS |

Reload after finishing returned the completion screen. Chapter dots in the stepper are tappable and
correctly labelled ("Chapter 3: … (not reached yet)"). "← Back" is present in the footer from step 2 on.

---

## Blocking defect — every diagram renders at 7–9px on a 390px phone

The diagram component draws into a **440-unit-wide viewBox** and the Learn column at 390px gives it
**313 CSS px**. Scale factor **0.711**. Authored font sizes of 10–13 land on screen as:

| step | diagram | rendered text | labels under 11px |
|---|---|---|---|
| 6 | The Profit Ladder | 8.54–9.25px | 26 of 26 |
| 12 | Measuring Profitability | 7.11–8.54px | 21 of 21 |
| 17 | What the Business Holds and Owes — the statement, labelled | 8.54–9.25px | 40 of 40 |
| 17 | What the Business Holds and Owes — working capital cycle | 8.54–10.67px | 20 of 20 |
| 22 | Measuring and Improving Liquidity | 7.11–8.54px | 20 of 20 |
| 29 | How Businesses Fail | 8.54–9.25px | 21 of 21 |

Body copy on the same screens measures 14–17px, so the diagram type is roughly **half the size of the
prose around it**. The worst case is step 17: the balance sheet is a two-column table of figures drawn
*inside* the SVG — `Inventory $240,000`, `Trade payables $180,000`, `Total $400,000` — plus the ratio
workings `Current ratio = $400,000 ÷ $250,000 = 1.60:1` and `Acid test = ($400,000 − $240,000) ÷
$250,000 = 0.64:1`, all at 8.54px. That is the one thing in the packet a student must read numbers out
of, and it is the smallest text on the page. Each diagram also carries a 6–10 line explanatory caption
inside the SVG at the same 8.54px.

**Why the existing checks pass it.** Nothing measures the *rendered* size. A check that reads the
authored `fontSize` sees 10–13 and passes. A check that looks for `<table>` finds none, because this
table is `<text>` nodes in an SVG. A check for text crossing the viewport edge finds zero, because
everything fits inside 313px — it fits precisely *because* it has been scaled down to 71%. The
measurement that catches it is `authored font-size × (rendered width ÷ viewBox width)`.

**The escape hatch does not close it.** Tapping a diagram opens an enlarge modal ("Pinch or scroll to
zoom") which redraws at 789–858px wide with text at **21.5–23.3px** — readable, but wider than the 390px
screen, so the title is cut mid-word ("One bar, cut three times: th…") and the caption lines are cut
("Step 1: less cost of sales, $1,3C…"). The student gets one of two things: complete and unreadable, or
readable and requiring two-axis panning. There is no fit-to-width that is both.

---

## Lesser findings

1. **Malformed practice question, p9 (10 marks, Business Failure).** The student reads:
   *"A tile wholesaler with rising revenue closes after failing to pay a supplier. weak cash flow,
   overestimation of sales, overtrading, poor inventory control are all suggested. Assess the likely
   internal causes of its failure. (10 marks)"* — a lowercase sentence fragment after a full stop,
   reading as an unfinished template join. The guidance behind it is correct and levels-based; only the
   question text is broken. This is the practice item added to close `structure-05`.

2. **Landing-card counts are stale on first paint.** First load showed "Learn Mode · 15 steps · Notes
   4 topics · Practice 5 questions" — the pre-packet numbers — and only became 29 / 5 / 11 on a later
   load. The server-rendered shell reads the published `data`; the client refetch reads `draft`. A
   draft-preview artefact, not a defect in the packet, but it means the first screen a reviewer sees
   under `?draft=1` can be the old section's numbers.

3. **`sr-only` SEO block is the pre-packet section.** The screen-reader/crawler copy server-rendered
   into the page still contains the old blocks and, word for word, the conflation the packet removes:
   *"Net profit (also called operating profit or profit for the year, depending on the level of
   deduction)"*. Same cause as (2) — it comes from `data`, which is untouched until publish. Sighted
   students see the corrected Learn Mode copy. It resolves on publish; flagging it only so nobody reads
   it as the packet having missed `accuracy-01`.

4. **Truncated unit badge.** `Unit 2: Managing Business …` in the section header is clipped at 390px
   (content 232px into a 180px box). Pre-existing chrome, present on every section.

---

## Console

Two error-level entries across the whole walk, both pre-existing platform behaviour rather than
packet 36:

- `POST /api/learn-mode/state → 401 Unauthorized` (×2). A signed-out student cannot persist Learn Mode
  progress server-side; the client falls back to `localStorage` and the session works, but it logs an
  error every time.
- A large volume of `POST /api/events → 204` aborted as `net::ERR_ABORTED` (telemetry beacons).

No React errors, no hydration warnings, no uncaught exceptions. No horizontal page scroll at any step
(`documentElement.scrollWidth === clientWidth === 390` throughout).

---

## The two named failure modes

**"step 20 of 9" with a blank body — NOT PRESENT.** Tested three ways:

1. Normal resume: pointer at 28, reload → completion screen, correct.
2. The realistic direction for this packet: the section **grows** 15 → 29 steps, so a pointer saved
   against the published section can never exceed the new count.
3. Forced overflow: set the stored pointer to `40` against a 29-step section and reloaded. The app
   **clamps** — banner reads *"You left off at step 29 of 29. Pick up where you left off?"*, header
   reads `STEP 29 OF 29`, footer `29 / 29 · Complete topic ✓`, and the body renders in full. No
   mismatch, no blank.

**Illegible-table-at-390px — PRESENT**, as the diagram legibility defect above. Worth naming exactly:
the failure did not recur as an HTML table that nobody width-checked. It recurred one level down, as a
table *drawn inside an SVG*, where the width check has nothing to bind to and the font-size check reads
a number that is never what the student sees.

---

## Audit-trail escalation (not student-facing)

`audit/snapshots/packet-36-bundle__business__managing-finance.json` **no longer mirrors the staged
draft.** Canonical deep-comparison against the served `?draft=1` payload gives exactly one difference,
in `content[1].sections[1]` — *Operating Profit Margin*:

- snapshot: `answers ["30%","8%","22%"]`, `distractors ["35%","12%"]`, hint *"divide the first profit by the revenue…"*
- served:  `answers ["60%","32%","8%"]`,  `distractors ["40%","12%"]`, hint *"divide the cost of sales by the revenue…"*

Timestamps: snapshot `17:18`, `built.md` `17:55`, `verify-a.md` `18:06`. `built.md` records finding and
fixing exactly this recall in round 1 (it collided with the previous step's `30%`) and re-staging the
database afterwards; the snapshot was never regenerated. `verify-a.md` step 2 nevertheless claims the
bundle file was "proved to be a faithful mirror of that database row… `content` IDENTICAL once
`quizIndices` is removed". Both statements cannot be true of the files as they now stand.

The student is unaffected — the **served** version is the fixed, non-colliding one, and I verified on
screen at step 8 that its word bank (`12% · 60% · 8% · 40% · 32%`) shares nothing with step 7's
(`30% · 240 · less · more · 560 · 70%`). But the stale snapshot is the artefact a later verifier would
trust, and it still contains the defect the packet reports as fixed.

---

## Checks run against the served draft, for the record

- Forbidden strings, whole payload: `Carillion` 0 · `gearing` 0 · `ROCE` 0 · `asset turnover` 0 ·
  `dividend yield` 0 · `"also called operating profit"` 0 · `"profitable on paper"` 0.
- 13 fill-ins, **0** with letter-prefix hints, **0** with fewer than 2 distractors.
- No duplicate quiz stems (28 items), no duplicate flashcards whole-card or front-only (34 cards).
- Q19 is now *"Inventory is excluded from the acid test ratio because it:"* — the false working-capital
  claim is gone.
- All five blocks carry both `quizIndices` and `practiceIndices`; blocks 1 and 5 no longer have zero
  practice.
- Liquidity teaches *"Selling an underused asset… cash rises to $130,000"* in the body and offers it as
  a valid move in the recall; no takeaway forbids it. `structure-09` resolved.
- Practice tariffs: Define 2 · Calculate 4 · Explain 4 · Discuss 8 · Assess 10 · Evaluate 20, all inside
  the Appendix 6 table (`bus_spec.txt:2216–2251`). Both Assess items use Level 1–4 bands with the
  judgement named at Level 4; "No explicit judgement mark" does not appear.
