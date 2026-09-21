# Packet 12.1 — Verify B, round 1 after fix round B1

Agent: `.claude/agents/student-walkthrough.md`. Dev server `remediation-dev` on port 3001, **killed and
restarted before anything was looked at** (the listener had been up since 18 Sep 23:xx, before fix round B1
was written; PID 57342 killed, `preview_start` re-launched, first request served 200). Viewport **390×844**
(`resize_window` custom, not the 375×812 "mobile" preset), `localStorage` / `sessionStorage` / IndexedDB
cleared on the first load, signed out, real clicks and real tab switches throughout.

Prior defects read from `audit/runs/packet-12.1/verify-b.md`; the fixes claimed for them read from the
"Fix round B1" section of `audit/runs/packet-12.1/built.md`. Each defect below was re-checked by
reproducing the original step, not by reading the fix.

---

## Walkthrough

**step 1: cold open, home page, storage cleared** — Edexcel IAL landing page, Economics/Business toggle,
unit list, Introductory Concepts section card. `innerWidth` 390, `document.scrollWidth` 390, no gate before
notes. — **PASS** (a student can get in)

**step 2: Economics → Market Failure → Practice tab (re-check of the old step 2)** — chips render
`All Questions 5 · 2 Marks 0 · 4 Marks 2 · 6 Marks 2 · 8 Marks 0 · 14 Marks 0 · 20 Marks 1`. The three empty
tariffs carry `disabled` and `aria-label "N Marks — none in this section yet"`; all seven chips have
`border-style: solid` — **no off-ladder chip appears here**, which is right: the five visible questions are
4/6/6/20/4. Chip counts sum to **5** against `All Questions 5`. — **PASS** (E006 ladder unchanged by B1)

**step 3: tap "Show Guidance" on the `Analyse 6` question** — guidance opens inline, one developed paragraph
of model-answer structure (MSB below MPB, welfare-loss area, diagram note). No element inside the card wider
than 390px. No dead end, no text box without a button. — **PASS**

**step 4: Economics → Aggregate Demand → Practice tab (Defect 1, the blocking one)** — four questions on
screen, `4 MARKS Define`, `6 MARKS Explain`, `10 MARKS Analyse`, `20 MARKS Evaluate`. The chip row now reads
`All Questions 4 · 2 Marks 0 · 4 Marks 1 · 6 Marks 1 · 8 Marks 0 · 10 · not IAL 1 · 14 Marks 0 · 20 Marks 1`.
Chips sum to **4**, matching `All Questions 4`. The 10-mark chip is `.practice-filter-btn off-ladder`,
`border-style: dashed` (a non-colour cue), not `disabled`, `aria-label`
`10 marks — not an IAL tariff for this subject`. Screenshot-verified at 390px: the chip sits on the second
chip row, 123×32px, 13px type, fully legible, `document.scrollWidth` 390. — **PASS**, **Defect 1 is gone**

**step 5: tap the `10 · not IAL` chip** — the list filters to exactly one card, the `10 marks Analyse`
question ("Analyse the likely impact of a fall in the value of the pound on aggregate demand"), and the chip
takes the active state. The question is reachable from the filter row, not only from "All Questions". —
**PASS**

**step 6: Economics → Consumer Behaviour & Demand → Practice tab** — same shape:
`All Questions 4 · … · 10 · not IAL 1 · …`, chips sum to 4, dashed border, same `aria-label`. — **PASS**

**step 7: tap the chip there** — filters to the one `10 marks Analyse` YED question. — **PASS**

**step 8: Business → Meeting Customer Needs → Practice tab** — ladder renders
`All Questions 4 · 2 Marks 0 · 4 Marks 1 · 6 Marks 1 · 8 Marks 0 · 10 Marks 1 · 12 Marks 0 · 20 Marks 1`.
The Business 10 is **on** the Business ladder, so it renders as a plain `10 Marks` chip with a solid border —
the off-ladder marking is subject-aware and does not leak across subjects. Chips sum to 4. The only
model-answers link on the page is `/business/meeting-customer-needs-model-answers`. — **PASS** (E005/E006)

**step 9: Market Failure model answers → open the `Examine 8` card (Defect 2)** — header
`Examine: how a negative externality of production leads to market failure.` Mark scheme renders as the
verbatim Appendix 6 `Examine (8)` description, Levels 1–4 with mark ranges, then Indicative content; at 390px
every `.ma-mark-row` is `flex-direction: column`, 316px wide, nothing clipped, nothing wider than 390px.
Scrolled to the bottom: the examiner commentary now reads *"It sits at Level 3 because the assessment is
implied rather than made — the Pigouvian tax in the final paragraph is offered as a remedy, not weighed. A
Level 4 needs a brief assessment: how large the misallocation is, and whether intervention improves on it,
depends on whether the external cost can actually be valued…"*, and `Likely Score` reads **`5–6 / 8`** — the
Level 3 band the grid states. The old sentence *"shows evaluative awareness without being asked to evaluate"*
is **not on the page**. The card no longer argues with its own descriptor, and it names the specific
assessment that would move this answer to Level 4. — **PASS**, **Defect 2 is gone on this card**

**step 9b: the same class, across all 30 rewritten items** — checked by a different route than the fix
script's own report: both banks were imported in Node and every 8-mark item's `likelyScore` compared with the
level its commentary names. **30 unique 8-mark items, 0 inconsistent, 0 unclassifiable**, and the old
contradicting sentence appears in **0** of them. Scores are only ever `7–8 / 8` or `5–6 / 8`. — **PASS**

**step 10: `/business/meeting-customer-needs-model-answers` (Defect 3)** — three cards, all Business, and all
three sub-headers now read `Unit 1 · 1.3.1 Meeting Customer Needs · …`. The card that read
`1.3.1 The Market` on a Meeting Customer Needs page (`market-research-8`) now reads the page's own section. —
**PASS**, **Defect 3 is gone**

**step 11: `/model-answers` hub** — every card's `Unit N · <number> <title>` pair was extracted and grouped:
**31 distinct number+title pairs, no pair disagreeing**, and `1.3.1 The Market` appears **0** times. (The
numbers 1.3.1, 1.3.3, 1.3.4, 1.3.5, 2.3.1–2.3.5 each carry two titles, one per subject, which is correct —
Economics `1.3.1 Introductory Concepts` beside Business `1.3.1 Meeting Customer Needs`.) Every number has 3
as its middle digit, i.e. IAL numbering. — **PASS**

**step 12: `/business/the-market-model-answers` (Defect 4)** — no cards, and the empty-state note reads
*"No model answers are published for this topic yet. The rest of **Business is** covered — use the link below
to browse every topic."* The missing space is gone. — **PASS**, **Defect 4 is gone**

**step 13: `/business/raising-finance-model-answers`** — two answers still render, both headed
`Unit 2 · 2.3.1 Raising Finance`. — **PASS** (E005, unchanged by B1)

**step 14: Learn Mode on Market Failure, cold** — pre-test offer ("Test yourself first" / "Just teach me"),
then `STEP 1 OF 17`, `CHAPTER 1 OF 5 · Types of Market Failure`, footer `1 / 17`, progress **6%**. — **PASS**

**step 15: Learn Mode to the end with the real Next button, 16 taps** — reaches `STEP 17 OF 17`,
`CHAPTER 5 OF 5 · Welfare Loss`, `Complete topic ✓`, Next button gone. The step is headed "Chapter check-in"
and opens *"Before the next chapter: a quick question and one thing from earlier."* There is no next chapter.
The quiz and the fill-in-the-blanks recall both render and are different exercises. — **FAIL** on the copy
(Defect 5, unchanged and disclosed as pre-existing), PASS on the exercises

**step 16: leave to the home page, come back, reopen Learn** — banner reads *"You left off at step 17 of 17.
Pick up where you left off?"* with Continue / Start over, and the body under it is step 17's real content,
chapter eyebrow correct. No "step N of M" with M < N, no blank body. — **PASS** (the resume-pointer failure
still does not occur)

**step 17: Economics → Introductory Concepts** — the section card still advertises "Practice · 5 questions"
and the Practice tab shows 3, with chips `All Questions 3 · 4 Marks 1 · 6 Marks 1 · 20 Marks 1` summing to 3.
The tab does print an explanation the card does not: *"2 questions are being rewritten to match the IAL exam
format and are hidden for now."* — **FAIL** (pre-existing; the card/tab gap is unchanged, but the chip row is
now internally consistent, which is the part B1 owned)

**step 18: the chip invariant outside the two named sections** — spot-checked by reading the rendered DOM,
not the helper: `economics/price-determination` 3 = 3, `economics/economic-growth` 3 = 3,
`business/managing-finance` 5 = 5 (chips `4 · 6 ×2 · 10 · 20`, all solid). Chip counts sum to
"All Questions" in every one. — **PASS**

---

## Verdict

**All four defects fix round B1 claimed to close are closed, including the blocking one. No new blocking
defect.** Defect 5 is still on screen, as B1 said it would be: it is pre-existing `LearnModeTab` copy and
belongs to whichever packet owns that file.

---

## Console errors

Clean cold loads in a **fresh tab** (home, `economics/unit-2/aggregate-demand`,
`economics/market-failure-model-answers`, `business/the-market-model-answers`): **no console errors**, and
every request 200 or 304 — **no 4xx and no 5xx**.

In the long session tab:

- `POST /api/events` — 38 beacons recorded `204 No Content [FAILED: net::ERR_ABORTED]`, fired while stepping
  through Learn Mode. Unchanged from the previous walk; nothing on screen breaks.
- **`POST /api/learn-mode/state` → `401 Unauthorized`**, once, on entering Learn Mode signed out. The `GET`
  of the same route returns 200 on the same page. This is the 401 the previous walk saw but could not
  identify before its request buffer rolled — **now identified**. Nothing on screen breaks: progress and the
  resume banner both work, so the write is failing silently into a path the client already tolerates. Not
  blocking, not this packet's, but it should be filed.
- `WebSocket … /_next/webpack-hmr failed` ×5 and `[HMR] connected` chatter — dev-server only.

---

## Audit complaints still visible

- **A tariff that appears on no IAL paper, still shown to the student.** Market Failure's Practice tab still
  offers `Analyse how external costs of consumption lead to a misallocation of resources. (6 marks)`.
  `Analyse 6` is not an Economics tariff. B1's off-ladder marking keys on the **tariff number**, and 6 *is* an
  Economics tariff, so a command-plus-tariff mismatch like this one gets no visible mark. E002's guard counts
  123 of these; the packet reports them and does not change them.
- **A promised count the tab does not deliver.** Introductory Concepts: card says 5, tab shows 3 (step 17).
  Pre-existing, affects most Economics sections.
- **A step whose heading describes something that is not there** — Defect 5, step 15.

Not observed: a gate the student cannot get past; a step that runs to many screens before the first Next; an
exercise with no defensible answer; a text box with no button; a recall shown twice in a row; a diagram whose
labels cannot be read; a table illegible at 390px; a resume pointer reading past its own total; a header
naming the wrong section; a question the filter row cannot reach.
