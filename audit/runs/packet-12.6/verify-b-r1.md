# Verify B, re-walk 1 — packet 12.6 after fix round B1

First-time student, no account, `localStorage`/`sessionStorage`/IndexedDB cleared before the first
navigation, **390 × 844** (custom size; the pane's `mobile` preset is 375 × 812 and was overridden).
Every pixel figure below states the viewport width it was measured at. Dark theme, which is this page's
default for a signed-out student (`data-theme="dark"` read off `<html>`).

`remediation-dev` was **stopped and restarted** on port 3001 before anything was opened, and the served
bytes were checked by `curl` before the browser: `HTTP 200`, **179,413 bytes**, new note string present (1),
old note string present (0), `lab-stimulus` present, `Estimated price elasticity` present. That is B1's
post-fix figure, so the stale-Turbopack trap was checked, not assumed.

Real taps and real typing throughout. Nothing was fixed and no file outside this one was written.

Route walked: `/economics/market-failure` → real tap on **View Model Answers →** →
`/economics/market-failure-model-answers`.

---

## The two blocking findings, re-run by their own steps

### Finding 1 (table lost a column at 390px) — **GONE**

Reproduced by re-running `verify-b.md`'s exact measurement, not by reading the CSS or B1's account of it.

| at 390px viewport | `verify-b.md` (before) | now |
|---|---|---|
| table `getBoundingClientRect().width` | 460.0px | **317.0px** |
| table `getComputedStyle().width` | 460px | **317px** — rect and computed agree, so this is the product, not an animation |
| `min-width` on `.lab-stimulus-table` | 460px | **0px** (`max-width: 100%`) |
| wrap `clientWidth` / `scrollWidth` | 317 / 460 | **317 / 317** |
| `scrollWidth - clientWidth` | **143px hidden (31%)** | **0** |
| column widths | 117.7 / 83.9 / 123.6 / 133.8 | 93.2 / 63.8 / 79.2 / **79.7** |
| body / head font-size | 13 / 12px | **13 / 12px — unchanged** |
| `document.documentElement.scrollWidth` | 390 | 390 (no page-level sideways scroll) |

Independent of those numbers, the student-visible question — *can column 4 be read?* — was answered by
hit-testing rather than by arithmetic: with the table scrolled into view and `scrollLeft` **0**,
`document.elementFromPoint` at the centre of **all 20 cells returns that cell**, all 20 rects lie inside the
viewport, and **no cell clips its own text** (`scrollWidth - clientWidth` 0 for all 20). That includes the
header *Estimated price elasticity of demand* and **−0.6, −0.9, −1.4, −0.4**. The screenshot at 390 × 844
shows four columns at rest with no glow, because nothing is hidden. **−1.4 — the figure
`content/data-response/econ-u1-market-failure.md` makes the Level 2/Level 3 boundary — is on the screen
without a gesture.**

The fix was also tested as a *class*, not only as this instance:

- **375 × 812** — wrap 302, table 309.9, **8px hidden** (a hairline of the last column's padding); the −1.4
  cell's rect is still entirely inside the viewport. Type still 13px.
- **320 × 812** — wrap 247, table 309.9 (min-content; it cannot go narrower), **63px hidden**, and the
  screenshot shows the **accent edge glow painted on the right edge** exactly where the content continues.
  So at the widths where `overflow-x` still bites, the affordance the old build lacked is now visible.
  Type still 13px: the font did not give way to make room.
- **Every** element on the page with `overflow-x: auto|scroll`, with all `<details>` forced open, was
  enumerated at 390px: **none overflows** (`hidden > 2px`: empty list). There is one `<table>` on the page
  and its wrapper hides nothing.

### Finding 2 (page promised marks its own exemplars do not earn) — **the contradiction is gone; the underlying mismatch is not, and is the founder's**

The note above the extract now reads, verbatim off the rendered page at 390px:

> "Read this first. In a data-response question the application marks come from the extract in front of you,
> not from a remembered textbook example. The model answers below were written before this extract was
> attached, so they apply the theory to other cases: take the technique from them, then write your own
> answer from the figures here. The link at the end of this extract goes to answers that do use it."

The sentence `verify-b.md` caught — *"The application marks below are awarded for using it, not for
remembering a textbook example"* — appears **0 times** in the served HTML. The page no longer tells the
student something its own exemplars contradict two screens later.

Re-running the original grep over the questions block (`.lab-block`, all disclosures forced open,
24,739 characters) at 390px: `AED` **0**, `UAE|Dubai|Gulf|GCC` **0**, `elastic*` **0**, `plastic bag` **0**,
percentages **34% only** (the UK Soft Drinks Industry Levy, in the 20-mark script). **The exemplars still do
not use the extract.** B1 says so in its own words and did not claim otherwise; what changed is that the page
stops promising they do.

The note's forward reference was checked rather than taken on trust: the link at the foot of the extract is
`The full data-response piece → /data-response/econ-u1-market-failure`, which returns **HTTP 200** and does
use this extract (`AED 0.18` ×6, `1.4` ×14, `elasticit*` ×10). Its only `Pro` strings are page metadata and
JSON-LD; `Unlock` 0, `Upgrade` 0 — the page the student is sent to is not gated.

**Residual, soft, unchanged in substance:** the note tells the student to *"write your own answer from the
figures here"*, but the three questions on this page are theory stems (*Explain what is meant by a negative
externality…*, *Examine how a negative externality of production leads to market failure*, *Evaluate the view
that government intervention is always necessary…*) that do not ask for the figures. A UAE/GCC extract still
sits above three answers set in the UK and Europe. This is the founder decision B1 recorded — re-author the
application paragraphs against this extract (new marking, which E034 forbids here) or accept the split — and
it is not a 12.6 blocker.

### Finding 3 (audit panel before any economics) — still visible, and slightly deeper

Order down the page at 390 × 844, measured on a clean load:

| | top | screens |
|---|---|---|
| coverage panel *"This page examines 6 of 35 requirements in 1.3.5 — 17.1%"*, height 549px | 535px | 0.63 |
| extract (`.lab-stimulus`), height **1,639px** (was 1,467px) | 1,105px | 1.31 |
| `Exam questions` | 2,775px (was 2,603) | **3.29** (was 3.08) |
| first attempt box | 3,063px (was 2,822) | **3.63** (was 3.34) |

B1's longer note and the now-wrapping table add **172px** to the extract, so the first thing a student can do
moved **241px further down**. Still soft, still packet 12.4's `E031` surface plus E035's mandated position —
recorded because it moved the wrong way, not as a 12.6 rejection.

---

## Regression re-walk after the component edit

- **step 1 — notes page at 390px:** `Market Failure — every type, every diagram`, `scrollWidth` 390, no
  horizontal page scroll, `View Model Answers →` present. — PASS
- **step 2 — real tap on `View Model Answers →`:** lands on
  `Market Failure — Exam Questions & Model Answers`, `h1` correct, headings in order: coverage panel →
  `The extract these questions are answered from` → `Exam questions` → 3 × `Attempt it, then mark it` →
  `Data response` → `Now try one yourself`. Page height 9,436px. Header names the right section and subject.
  — PASS
- **step 3 — extract in flow:** plain `<section class="lab-stimulus">`, painted on load, no interaction
  needed to read the prose. — PASS (E035 as written)
- **step 4 — real typing:** real tap on the textarea (274 × 153px at 390px), 135 characters typed with real
  key events; placeholder *"Write your answer here. It stays in this browser."*, storage note honest.
  — PASS
- **step 5 — real tap on one criterion:** total moved `0 of 4 marks claimed — 0 of 4 criteria ticked` →
  **`1 of 4 marks claimed — 1 of 4 criteria ticked`**, exactly one checkbox true, the marked-script
  disclosure opened itself and its summary became `The marked script — 1 segment marked`. — PASS (E036:
  marks against the tariff, not ticks)
- **step 6 — the linked segment:** `seg-neg-externality-4-p1a`, class `lab-script-seg is-marked`,
  248 × 219.7px at 390px viewport, 16px type, `scrollWidth - clientWidth` 0, claim line
  `1 mark — 1–2 marks — definition` with its reason. Legible, no clipping, no overlap. — PASS
- **step 7 — score button:** `document.querySelectorAll('.lab-attempt button')` → **0** across the page.
  — PASS (E036)
- **step 8 — reload:** draft returned verbatim (135 chars), tick still on, total back to `1 of 4`. Keys
  `rl:attempt:v1:{neg-externality-4, negative-externality-tax-8, market-failure-government-intervention-20}`
  — as before, all three exist although only one question was touched; harmless, not student-visible.
  — PASS
- **step 9 — resume pointer:** `step N of M` — **0 matches** on the rendered page. No blank body.
  — PASS (not reachable on this surface)
- **step 10 — no gate:** `Unlock` 0, `Upgrade` 0, `Sign in`/`Log in` 0, and exactly **one** `Pro`, in the
  closing CTA, gating AI marking in the app rather than this content. — PASS
- **step 11 — E037, neighbours re-read by `curl`:** `economics/government-intervention`,
  `economics/supply`, `business/the-market`, `business/financial-planning` model-answer pages all
  **HTTP 200**, `lab-stimulus` **0**, `lab-attempt` **0**, new note string **0**. Nothing leaked sideways.
  — PASS

**Console:** no application errors, no React key or hydration warnings. The only `[error]` entries are
`WebSocket connection to 'ws://localhost:3001/_next/webpack-hmr…' failed` — the dev server being restarted
under an already-open tab, which is this run's own doing. Otherwise `[HMR] connected`, `[Fast Refresh]` and
the React DevTools notice.

---

## Audit complaints still visible

- A diagram/table whose content cannot be read — **no longer true at 390px, 375px or 320px** (at 320px the
  table scrolls, and says so with a visible edge glow).
- A step that runs to many screens before the first thing to do — **still true, and 241px worse**:
  3.63 screens to the first attempt box at 390 × 844.
- A gate the student cannot get past — none. An exercise with no defensible answer — none. A text box with
  no button — none (buttonless by design, and the page says so). A recall shown twice — none. A header
  naming the wrong section — none.

## Verdict

**No blocking defect.** Finding 1 is closed at the level of the class, not just the instance: the 460px
floor is gone, the elasticity column is on the screen at rest at 390px with the type unchanged, and where a
narrower viewport still forces a scroll the student is now shown that it does. Finding 2's
self-contradiction is closed by making the note true and pointing at the page that does use the extract;
the UK-exemplars-under-a-UAE-extract mismatch remains open and is the founder's call, as B1 recorded.
Finding 3 stands, soft, and got 241px deeper.
