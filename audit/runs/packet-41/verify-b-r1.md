# Packet 41 — Verify B, round 1 after fix round B1 (student walkthrough, 22 September 2026)

Verifier: `student-walkthrough`. Read-only. I changed no files, fixed nothing, published nothing.

Device: **390×844** (`resize_window` custom, not the 375px "mobile" preset — the preset was refused as a
yardstick because a 12px face at 390px is 11.55px at 375px). `localStorage`/`sessionStorage`/IndexedDB
cleared before the run, signed out, real taps, scrolled to everything I report.
Server: `remediation-dev` restarted for this run — port 3001 killed by PID (`lsof -ti tcp:3001`, not by
process name) and `preview_start` brought up a fresh server, `reused: false`. Readiness confirmed against
`GET /api/sections/external-influences?draft=1` → 200 before anything was measured.
Route: `/business/unit-2/external-influences?draft=1`. **Still STAGED, not published** — without
`?draft=1` the student still gets the old 17-step UK section (Greggs/EasyJet/£), exactly as before.

**Every pixel figure is at a 390px-wide viewport.** Overlay figures were taken only after a real tap with
`lm-diagram-modal-visible` present, computed `transform: none`, and `getComputedStyle().width` recorded
beside the rect (390px = 390px — no 0.92 artefact in any measurement below).

I did not take any figure from the fix's own probe or from the emitter's units: every number is
`getBoundingClientRect()` / `getScreenCTM().a` read out of the running DOM, plus a `curl` of the API
payload parsed independently.

## Verdict first

**Every defect Verify B raised is gone, and nothing I walked has regressed. Verify B passes.**
No blocking defect. Three non-blocking observations are at the end; none is new to packet 41.

## The Verify B defects, re-run by their own steps

### Defect 1 — the legislation table at 7.11px, no zoom showing a row with its label → **FIXED**

Reproduced the exact route: Learn Mode, 23 real taps of Next, **STEP 23 OF 29 · Chapter 4 of 5 ·
Legislation**, the declared table "The Six Areas of Legislation".

| where | card | viewBox | scale | every text run | runs outside the card |
|---|---|---|---|---|---|
| inline, on step 23 | **313px** (Verify B's own figure) | **300** (was 440) | 1.0433 | **12.52px** — all 27 (was 7.11px on 25 of 27) | **0** |
| enlarge sheet, **Fit** | 366px | 300 | 1.22 | **14.64px** | 0 left, 0 right |
| enlarge sheet, **Read** | 366px | 300 | 1.22 | **14.64px** | 0 left, 0 right |
| Diagrams tab card | 306px | 300 | 1.02 | **12.24px** | 0 |

The specific failure Verify B described is gone: the sheet opens with `pane.scrollLeft = **0**`,
`pane.scrollWidth` 390 = `clientWidth` 390, **0 of the six Area labels off the left edge** (was: all six
at `x = -47.4`), and the footer reads **"The whole diagram is on screen"** (was "Drag sideways to see
the rest"). `document.scrollingElement.scrollWidth` is 390 = `innerWidth` on every screen I measured.

The layout change is what closes it, not the scale alone: each row is now its label on one line with its
cells under it — "Consumer" / "Quality and description · $45,000" — so **a row and its label are on
screen together at every zoom by construction**. I read all six rows off the screen at the default
inline size without enlarging anything.

Checked the other three declared tables the same way (they live in the Diagrams tab): "Where Each
Influence Lands", "Patents, Copyright and Trademarks", "How a Small Business Competes" — **viewBox 300,
every face 12 units, 12.24px rendered, 0 runs outside the card** on each. Payload check by `curl`, parsed
independently of the emitter: 4 declared tables, all `viewBox="0 0 300 …"`, `font-size` 12 on every one
of 27/27/20/28 text runs.

### Defect 2 — match-recall options running off the left edge (V042) → **FIXED, and swept**

Step 23, the chip Verify B measured at **453px at left −69**: now **326px, left 29, right 355**,
`white-space: normal`, class `lm-word-chip lm-match-chip`.
Step 27 ("A Changing Competitive Environment"), the two worst: "Capacity has to be filled…" and
"Something has changed behind it…" — both **319.5px, left 32.3, right 351.7** (were 512px and 574px).

I did not stop at the two steps named. I walked **all 29 steps** with real taps and measured every chip
on every step: **0 chips with `left < 0.5` or `right > 389.5`, on 29 of 29 steps**; widest chip anywhere
in the deck **326px** inside the 326px bank; `document.scrollingElement.scrollWidth` = 390 = `innerWidth`
on all 29. The CSS rule now names `.lm-classify-chip` and `.lm-match-chip` together
(`app/globals.css:7649-7650`), so this is closed for every section's match recalls, not just this one.

### Defect 3 — three diagrams with no surface a Business student can reach → **FIXED**

On the section hub the tab bar now reads Learn · Notes · **Diagrams** · Practice · Flashcards · Quiz ·
Mistakes · Tutor · Extras, and Free Resources shows a **Diagrams card ("All annotated")** beside Learn /
Notes / Practice. The Diagrams tab renders **8 of 8** diagrams, each with its title, its IAL reference,
an "Enlarge diagram" button and a "What a correct diagram shows" list — including the three that had no
surface at all: "Where Each Influence Lands", **"Patents, Copyright and Trademarks"** and "How a Small
Business Competes". I read the Patents table off the screen without enlarging it.

Regression check, because this changed a gate shared with 21 other sections:

| section | subject | Diagrams tab |
|---|---|---|
| `external-influences` (draft, 8 diagrams) | Business | **shown** |
| `external-influences` (**live**, 0 diagrams) | Business | hidden |
| `entrepreneurs-leaders` (0 diagrams) | Business | hidden — no empty tab |
| `aggregate-demand` | Economics | shown, as before |

The live-vs-draft row is the useful one: the same section shows the tab only when the payload actually
carries diagrams, so the gate is reading the section's own count and not the subject alone.

### Defect 5 — "four separate changes" over six items → **FIXED**

Step 1's recall prompt now reads "A chair maker is hit by **six** separate changes…", and the pool holds
six items. No other number word in the deck contradicted its recall on the walk.

### Defect 6 — literal `**Source A.**` on every practice question → **FIXED**

Practice tab at 390px: **0 asterisks of any kind on the page** (was 12 occurrences of `**`). I expanded
three "Show Guidance" disclosures — still 0 asterisks, and 0 stray markdown headings. Payload check:
0 of 12 `question` fields and 0 of 12 `guidance` fields contain `**`; all 12 open with plain `Source A.`.
The section's Model Answers page (`/business/external-influences-model-answers`) is also clean.

### Defect 7 — the whole source extract reprinted in all twelve stems → **FIXED on the surface**

Practice tab: **one** "SOURCE A" card (581 chars) followed by "Every question below uses this source",
then twelve stems that are the task only — measured lengths **35, 38, 82, 92, 108, 111, 111, 123, 149,
159, 167, 216 chars**. The source prose appears **once** in one scroll (was twelve times).
Filtered to the single 20-marker with a real tap: the source card disappears and the stem comes back
**full at 758 chars**, so a student who filters still gets a question that stands alone.

## What else I walked, to be sure nothing moved

- **Steps 1–29 end to end**, real taps: the pre-test offer is still an offer and not a gate (step 1 is
  behind it), Next is on screen at step 1 without scrolling, the five pinned check-in diagrams are in
  place, and the header reads SECTION 2.3.5 · Unit 2 throughout.
- **Resume, same deck**: advanced to step 5, cold reload, tapped in → "You left off at step 5 of 29.
  Pick up where you left off?" · Continue / Start over · **STEP 5 OF 29** with a full body. Pointer
  `{"v":"29.szys96","s":4}`, still deck-versioned.
- **Resume across a deck-length change**: 29-step pointer at `s:28`, loaded the live 17-step deck →
  "**This topic has been rebuilt.** It now has 17 steps…" then **STEP 1 OF 17** with a 2,222-char body.
  No "step 29 of 17", no blank body.
- **Notes tab**: 0 asterisks, 0 hits for Greggs / EasyJet / Consumer Rights Act / Bank of England.

**Console: no JavaScript errors.** The only error-level lines are the two `POST /api/events → 401` per
load (signed-out analytics, app-wide) and `webpack-hmr` socket failures, which are the dev server.

## Audit complaints from the original teardown

A gate the student cannot get past — none. Many screens before the first Next — none. An exercise with no
defensible answer — none seen. A text box with no button — none. A recall shown twice in a row — none.
A header naming the wrong section — none. **A diagram whose labels cannot be read** — the tables are
fixed; the four **drawn** diagrams are still 8.35px inline, which is V037, programme-wide, and packet 11's
enlarge sheet still answers it (verified working above). Not a packet-41 defect and not blocking.

## Non-blocking observations

1. **Drawn diagrams inline are 8.35px at 390px** (12 units × 0.6954 on the 440-unit frame), on all four.
   Pre-existing V037; the enlarge sheet is the mitigation and it works.
2. **The "Closer" zoom opens mid-table.** On the enlarge sheet, tapping Closer (1.92×, 23.04px) sets
   `scrollLeft = 113` with 27 runs off the left edge. The student opted into that zoom, the footer says
   "Drag sideways to see the rest — or tap Fit", and Fit/Read both show everything — so this is a
   comfort point, not the defect-1 condition. Worth noting only because Closer starts centred rather
   than at the left edge where the row labels are.
3. **The chip wrap is granted per class, not by default.** `.lm-word-chip` keeps `white-space: nowrap`
   at the mobile breakpoint; only `.lm-classify-chip` and `.lm-match-chip` are exempted. A future recall
   type with long option text would land back on the V042 behaviour unless it is added to that rule.
4. **The hub still says "Start learning →" with a live mid-deck pointer** (Verify B's item 8). Unchanged,
   and it was not a target of this round.
5. The `.sr-only` SEO block on the page still carries the **live** prose (it renders from `data`), so a
   crawler and a screen reader read the old section until publish. Carried over from packet 40; noted so
   nobody reads it as a leak now, and so nobody mistakes it for draft content in a `get_page_text` dump.
