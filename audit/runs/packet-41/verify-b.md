# Packet 41 — Verify B (student walkthrough, 22 September 2026)

Verifier: `student-walkthrough`. Read-only. I changed no files, fixed nothing, published nothing.

Device: **390×844**, `localStorage`/`sessionStorage`/IndexedDB cleared before the run, signed out, real
taps and typing, scrolled to everything I report.
Server: `remediation-dev` on port 3001, already running from another session — a second copy was refused
on the port, so I reused it. It served the staged draft correctly (`GET /api/sections/external-influences?draft=1` → 200).
Route: `/business/unit-2/external-influences`, and `?draft=1` for the staged content.

**Every pixel figure below is at a 390px-wide viewport.** Where a figure is a viewBox unit I say so.
I grepped `audit/ledger.json` for each rendered-size figure before reporting it: no prior evidence field
records 7.11px or 8.54px for this or any section. The chip-overflow class is already open as **V042**.

## What a student gets today

**Without `?draft=1`, none of packet 41.** The live `data` column still serves the old section: hub reads
"Learn Mode · ✓ Free · **17 steps**", Notes 5 topics, Practice **5** questions, and step 1 is "Inflation and
Its Impact on Business" with the CPI/£100/Greggs prose. `built.md` says STAGED, NOT PUBLISHED, so this is
the expected state — but it is the answer to "what does the student end up with today": **the old
seventeen-step UK section**. Everything below is the staged draft.

Carried over from packet 40 and still true here: the server-rendered `.sr-only` SEO block on the page
carries the **live** prose (Greggs, EasyJet, £1 → £1.15, cost-push/demand-pull, "Consumer Price Index").
It is invisible on screen and is what a crawler and a screen reader read. It renders from `data`, so it
corrects itself at publish. Noted so nobody reads it as a leak now.

## Step-by-step

| # | On screen | Verdict |
|---|---|---|
| 1 | Hub (draft): "SECTION 2.3.5", "Unit 2: Managing Business Activities", "Learn Mode · ✓ Free · **29 steps** · Start learning →". Free resources: Learn 29 steps, Notes 5 topics, Practice **12 questions**. Premium: Flashcards 49, Quiz 28, AI Tutor, Blackjack. | PASS — **no Diagrams card**, see defect 3 |
| 2 | Above step 1: "Want a quick check first? Three questions on what you might already know. Optional, and nothing is marked." Two buttons, and step 1 is already behind it. | PASS — not a gate |
| 3 | Pre-test Q1 what an external influence is, Q2 what inflation is, Q3 why the response half matters. All three inside 2.3.5 · 1a and answerable from chapter 1. | PASS |
| 4 | Tapped D / C / C. "**3 / 3 correct**", "Impressive — you already know some of this!", "Answers are held back until the end…", "Start learning →". | PASS |
| 5 | Step 1 of 29 · Chapter 1 of 5 · part 1 of 5 · "What an External Influence Is". Key idea, the 2.3.5·1a stem quoted, the four lines a change reaches a firm through, the Marang Seating spine ($400,000 on $4,000,000), Real Example (Malaysia / Kenya), Common Misconception, Exam Matters. Next button visible without scrolling. | PASS |
| 6 | Step 1 recall: SORT six changes into "What it can charge or sell" / "What its inputs cost" / "What it pays to borrow". Tapped all six in, "Check groups" → "**✓ All correct!**" | PASS on grading — see defect 5 (prompt says "four", there are six) |
| 7 | Steps 2–5, Chapter 1 parts 2–5: The Rate of Inflation / Responding to Inflation / Exchange Rates / Responding to a Currency Movement. Recalls: fill-in, match, fill-in, sort. | PASS |
| 8 | Step 6 of 29, Chapter 1 check-in: diagram "One Year, Four Influences" (4 bars, 18 labels, no collisions), "What a correct diagram shows" (4 lines), quick quiz, "Tap to enlarge". | PASS on content — see defect 4 (labels 8.54px) |
| 9 | Tapped the diagram. Enlarge sheet opened on a **real tap**: `lm-diagram-modal-visible` present, computed `transform: matrix(1,0,0,1,0,0)`, `getComputedStyle().width` 390px = rect width 390px. Fit / **Read** / Closer, "Drag sideways to see the rest — or tap Fit". At Read the SVG draws at 440px = 1:1 with its viewBox, so labels are 12px. | PASS — the V037 mitigation works |
| 10 | Steps 7–10, Chapter 2 parts 1–4: Interest Rates / Responding to a Rate Rise / Taxation / **Government Spending**. Recalls: reorder, match, sort, fill-in. | PASS — specGap-01 is on screen |
| 11 | Step 11 check-in: "Two Channels of a Rate Rise". | PASS |
| 12 | Steps 12–14, Chapter 3 parts 1–3: The Business Cycle / Which Businesses the Cycle Hits Hardest / **Planning Through the Cycle** ("A business cannot forecast the cycle, so it prepares for it instead"). | PASS — specGap-02's substance is a whole subsection |
| 13 | Step 15 check-in: "The Business Cycle" diagram (the one topFix-04 names) + a reorder of the four phases. | PASS |
| 14 | Steps 16–22, Chapter 4 parts 1–7: Consumer Protection / Employee Protection / **Health and Safety** / **Environmental Protection** / **Competition Policy** / **Intellectual Property Rights** / Responding to Legislation. | PASS — all six legislation areas taught, specGap-03/-04/-05 and specThin-01/-02/-03 all on screen |
| 15 | Step 23 check-in: declared table "The Six Areas of Legislation" + a spaced MATCH recall from Chapter 3. | **FAIL — defects 1 and 2 below** |
| 16 | Steps 24–28, Chapter 5 parts 1–5: Competitor Numbers / Competitor Size / Competitor Behaviour / **A Changing Competitive Environment** / **How a Small Business Competes**. | PASS — specGap-07 and spec 3b on screen |
| 17 | Step 29 of 29 check-in: "What Matching a Price Cut Costs", quick quiz, a match recall (4 options, widest 356px, none clipped), "Explain it back", "Complete topic ✓". | PASS |
| 18 | "**Topic complete** · External Influences · 100% strength · review tomorrow", score breakdown (Recall 1/1, Written practice 0/10), "What you covered" listing all five chapters by name. | PASS |
| 19 | Resume, same deck: advanced to step 5, reloaded the page cold, tapped in → "**You left off at step 5 of 29. Pick up where you left off?**" Continue / Start over. **STEP 5 OF 29**, Chapter 1 part 5, full body (2,407 chars). Pointer `{"v":"29.szys96","s":4}` — deck-versioned. | PASS |
| 20 | **Resume across a deck-length change** — the failure this run was told to hunt. With the 29-step pointer saved at `s:28`, loaded the **live 17-step** deck. Result: an amber panel, "**This topic has been rebuilt.** It now has 17 steps, and your saved place was in an earlier version, so it no longer points anywhere. Start again, or jump to the end if you had finished," then **STEP 1 OF 17** with a full body (2,222 chars). | PASS — **no "step 29 of 17", no blank body** |
| 21 | Notes tab: 5 topics, one per chapter, rewritten. 0 hits for Greggs, EasyJet, Consumer Rights Act, Bank of England, CMA, National Insurance, cost-push, demand-pull, or `£`. | PASS |
| 22 | Practice tab: "Practice Questions", Model Answers card, filter chips All 12 / 2 (2) / 4 (4) / 6 (2) / 8 (1) / 10 (2) / 12 (0) / 20 (1), each item with a "Show Guidance" disclosure. | PASS on structure — **FAIL on what is printed, defects 6 and 7** |

Console: **no JavaScript errors.** Two `POST /api/events → 401 Unauthorized` per page load (analytics while
signed out); they surface as console errors on every page of the app, not only this section.

## Blocking defects

### 1. The legislation table is 7px on a phone, and no zoom shows a row and its label together

**Step 23 of 29, "The Six Areas of Legislation"** — the declared table (`kind: 'table'`) that carries all
six legislation areas, what each requires, and what each costs the case firm.

Measured in the running app at **viewport width 390px**:

| where | SVG width | scale from its 440-unit viewBox | smallest text |
|---|---|---|---|
| inline, on the step | 313px | 0.7114 | **7.11px** — 25 of the table's 27 text runs (the caption is 8.54px) |
| enlarge sheet, **Fit** | 366px | 0.8318 | **8.32px** — whole table on screen, still unreadable |
| enlarge sheet, **Read** | 528px | 1.2 | 12px — but see below |

Every cell is authored at **10 viewBox units**, below even the 12-unit face floor the runner applies
elsewhere, and the phone then scales it down by another 0.71.

At **Read**, the only zoom that reaches 12px, the sheet opens with `pane.scrollLeft = 81` and **all six
Area labels sitting at `x = -47.4`** — Consumer, Employee, Safety, Environment, Competition and Property
rights are every one of them off the left edge of the screen. The screenshot shows rows beginning "…er",
"…ee", nothing, "…ment", "…ition", "…y rights". Drag right to read the labels and the "What it requires"
and "Cost here" columns leave on the other side. **There is no zoom at which a student can see a row's
label and that row's content at the same time.**

**Why the gate did not catch it.** `lib/content-validator.mjs:129` defines `diagram.table-legible` as
"every cell … renders at 12px or more in the column a laptop actually gives it (**620px at 1024 wide**)".
620 / 440 = 1.409, so a 10-unit cell measures 14.1px and the rule stays silent — which is why `built.md`
reports only a `diagram.table-kind` INFO. **Nothing in the gate measures the 313px column a 390px phone
gives the same table.** This is the exact shape this run was asked to look for: a table that passes every
structural check and is illegible at 390px because nothing measured the width it actually gets.

### 2. Match-recall options run off the left edge of the screen (V042, made worse here)

**Step 23** again, and four more steps. `.lm-word-chip` is `white-space: nowrap` inside a **326px** word
bank. Measured on the step, at 390px: the chip "Quotes are still going out and fewer of them turn into
orders" is **453px wide at `left = -69px`** — the first word is off-screen — and the document does not
scroll horizontally (`document.scrollingElement.scrollWidth` 390 = `innerWidth` 390), so there is no way to
bring it back.

Measured with a probe carrying the live chip style (DM Sans 15px, nowrap) at 390px:

| option | rendered width | over the 326px bank |
|---|---|---|
| "Something has changed behind it, and the pressure will outlast the campaign" | **574px** | +248 |
| "Capacity has to be filled, so prices fall before anyone chooses to cut" | **512px** | +186 |
| "Customers who can buy the same thing cheaper elsewhere" | 449px | +123 |
| "Quotes are still going out and fewer of them turn into orders" | 453px | +127 |

Counted over the staged bundle: **16 of the 28 match options exceed the bank**, spread across chapters 1,
2, 3 and 5. The two worst sit on step 27 ("A Changing Competitive Environment"), at roughly one and a half
screen widths.

**This is the pre-existing V042** (`audit/ledger.json`, open, assigned to packet 12, "programme-wide across
every match recall"), not a packet-41 regression — but this packet's option strings are long enough that it
now bites on five of this section's steps, where packet 37's control had it on 2 of 3 options in one place.
Reporting it because a student meeting it here cannot read the option.

### 3. Three of the eight diagrams have no surface a Business student can reach

The draft holds 8 diagrams. Five are pinned to chapter check-ins and I saw all five. The other three —
**"Where Each Influence Lands", "Patents, Copyright and Trademarks", "How a Small Business Competes"** —
carry no `diagramId` in `content[]`, and `components/StudyApp.jsx:41` declares the Diagrams tab
`subjects: ['economics']` with the comment that this is deliberate. This section is Business, so:

- the tab bar reads Learn · Notes · Practice · Flashcards · Quiz · Mistakes · Tutor · Extras — **no Diagrams**;
- the hub's Free Resources shows Learn / Notes / Practice — **no Diagrams card**;
- `NotesTab.jsx` and `ExtrasTab.jsx` contain no reference to diagrams.

So three diagrams are authored and unreachable, including **"Patents, Copyright and Trademarks"** —
`diagrams[6]`, which `verify-a.md` cites as part of the evidence that specThin-01/-02/-03 are closed. The
specThin content is still taught in the step-21 subsection, so the ids are not wrong; but a student never
sees that table.

## Smaller things a student meets

4. **Inline diagram labels are 8.54px at 390px.** 12 viewBox units × 0.7114 (313px card on a 440-unit box),
   on every one of the five pinned diagrams. This is the programme-wide V037 condition packet 11 answered
   with the enlarge sheet, not a packet-41 regression, and `verify-a.md` predicted ~8.1px. The sheet works
   (step 9 above), so the mitigation is present; the default view is still below a legible size.
5. **Step 1's recall prompt says "four" and shows six.** "A chair maker is hit by **four** separate changes.
   Sort each one by which part of its trading the change reaches first" — there are six items in the pool.
6. **Every practice question opens with literal `**Source A.**`.** Twelve occurrences on screen; the practice
   renderer does not parse markdown bold. The live five practice items contain zero markdown, so this is new
   in this packet, not inherited. A student sees two asterisks at the head of all twelve questions.
7. **The whole ~180-word Source A extract is reprinted inside each of the twelve practice stems.** On a phone
   that is about twelve lines of identical text before roughly one line of actual task, twelve times over in
   one scroll of the Practice tab.
8. **The hub never says "continue".** With a live mid-deck pointer the CTA still reads "Start learning →" and
   "29 steps"; the "You left off at step 5 of 29" prompt only appears after entering Learn Mode.

## Audit complaints from the original teardown that are still visible

A gate the student cannot get past — **none**. Many screens before the first Next — **none** (Next is on
screen at step 1 without scrolling). An exercise with no defensible answer — **none seen**. A text box with
no button — **none** (every practice item has "Show Guidance"). A recall shown twice in a row — **none**
(24 distinct recalls, one per subsection, plus the spaced ones at check-ins). A header naming the wrong
section — **none** (SECTION 2.3.5, Unit 2, on every screen). **A diagram whose labels cannot be read —
still true**, defects 1 and 4.

## Verdict

The teaching is on screen and the two named failure modes came out opposite ways: the resume pointer is
**clean** (defended by a deck-version guard with an explicit rebuilt message), and the illegible table is
**present and blocking**. Verify B does not pass as it stands.
