# Packet 12.3 — Verify B: student walkthrough

Role: first-time IAL student, signed out, phone. Nothing was fixed or edited. Every figure below was
measured at **viewport width 390px** (390×844, `innerWidth` asserted = 390, dpr 2), storage cleared
(`localStorage.length` = 0 before the first navigation), real taps via the browser pane — no
`element.click()` was used to open anything measured.

Dev server: launch config `remediation-dev`, port 3001. **Note:** port 3001 was already held by a
`next-server` (PID 19466) started 19:40:55, i.e. before this packet's build was written (`.next`
mtime 19:56:44) — the stale-build hazard. That process was stopped and `remediation-dev` started
fresh, so everything below is the current tree, not a stale build.

Shared-worktree caveat: `preview_logs` shows concurrent traffic from other packets (`?draft=1`
section loads, learn-mode state calls) and `components/LearnModeTab.jsx` was mid-edit and
un-parseable for part of this session. The tree moved underneath this walkthrough. All findings
below were re-checked against the tree as it stands at the end of the run.

---

## Scripted actions

**Section: `/economics/market-failure-model-answers` (pre-existing URL, new layout)**

- step 1: Page loads 200. Title "Market Failure — Exam Questions & Model Answers | Edexcel IAL Economics | Revvy Learn", `<h1>` the same, canonical `https://revvylearn.com/economics/market-failure-model-answers` — **PASS** (E021 title shape, E018 canonical unchanged)
- step 2: Header band reads "ECONOMICS · WEC11 · UNIT 1 · 1.3.5", then "3 written questions · 32 marks", then the honest timing note ("Time estimates come from one constant per paper … not from a per-question guess") — **PASS** (E016 honest coverage/timing)
- step 3: Coverage panel reads "This page examines 2 of 35 requirements in 1.3.5 Market Failure · 5.7%", with the counted-over explanation and a collapsed "33 requirements … that no question on this page examines" — **PASS** (E016 coverage line present and honest)
- step 4: Three questions, each with command · marks · AO · time in the header ("Explain · 4 marks · AO1 · AO2 · 5 min"; "Examine · 8 marks · AO1·AO2·AO3·AO4 · 11 min"; "Evaluate · 20 marks · … · 26 min") — **PASS** (E016 per-item Meta)
- step 5: 11 `<details>`, all SSR'd and all closed on arrival (`open` = 0) — **PASS** (E016 collapsed by default)
- step 6: Real tap on the first "Mark scheme" opens it; it contains the banded scheme ("1–2 marks Definition of negative externality…", "3–4 marks Clear, developed example…"), readable at 390px — **PASS** (acceptance #4 at student level)
- step 7: Real tap on "Why this loses marks — a mid-band attempt at the same question" opens a panel that states up front it is not a real script ("It is 2 of 5 paragraphs of the model answer above, with … removed. Nothing is rewritten."), names the band it cannot reach (AO4, 6 marks — evaluation) and where it tops out (AO3, 6 marks), and refuses to invent a mark — **PASS** (reads as a genuine near-miss *on this page*; see defect 2 for where it does not)
- step 8: Data-response link-out present — "Market Failure — UAE plastics & GCC sugar tax → /data-response/…" — **PASS** (E016)
- step 9: No `<table>` on the page; `document.documentElement.scrollWidth` = 390 = `innerWidth`; zero elements wider than the viewport — **PASS** (no illegible-table failure on this surface)
- step 10: Annotation chips K / A / An / E / D appear throughout the opened model answers. **No key, legend, `title` or `aria-label` anywhere on the page** (`.ma-ann-legend` count = 0) — **FAIL**, expected the student to be able to decode the letters printed in their model answer. See defect 1.

**Section: `/economics/labour-markets-model-answers` (3.3.4 — one of the ten new pages, E019)**

- step 11: Loads 200, title/H1 "Labour Markets — Exam Questions & Model Answers", canonical `https://revvylearn.com/economics/labour-markets-model-answers`, back-link "← Unit 3: Business Behaviour" — **PASS** (E019 page exists, E021 title)
- step 12: Two written questions render with full content — "Explain what is meant by the derived demand for labour" (4 marks) and "Examine how a monopsony employer might lead to lower wages and employment" (8 marks); all 8 `<details>` carry real text (176–1,694 chars each, none empty) — **PASS** (acceptance #3 at student level)
- step 13: Coverage panel is the first coloured thing under the H1 and reads **"This page examines 0 of 17 requirements in 3.3.4 Labour Markets · 0.0%"** — **FAIL**, expected a coverage line a student can act on rather than a 0.0% badge over a page that does contain two worked questions. See defect 3.
- step 14: Mid-band panel opens and discloses its construction ("2 of 3 paragraphs of the model answer above, with 'Para 3' removed"), then says it cannot reach **Level 4 — 7–8 marks** and tops out at **Level 3 — 5–6 marks**. The model answer it was cut from is itself marked **5–6 / 8** — the same band — **FAIL**, expected the panel to show a gap the student can close. See defect 2.
- step 15: No table, `scrollWidth` 390 = `innerWidth`, no overflowing element — **PASS**
- step 16: JSON-LD on the page: EducationalOrganization, WebSite, **Quiz** — **PASS** (E021 structured data)
- step 17: Real tap on "Practise Labour Markets →" (`/?section=labour-markets`) lands in the app on Labour Markets, Unit 3 — the section header, Learn Mode card ("9 steps"), and an Exam Resources "Model Answers" card are all on screen — **PASS** (the CTA keeps its promise)
- step 18: Practice tab for 3.3.4 shows a "Model Answers — Annotated model answers with mark scheme breakdowns for this section · View →" card. 3.3.4 had no page before this packet, so the link is new and came from the map, not a second hand-written list — **PASS** (E022, extended not duplicated)
- step 19: Learn Mode opened from the same section reads "STEP 1 OF 9", chapter 1 of 3, body content present, footer "1 / 9" — **PASS**, no "step 20 of 9" and no blank body on a cleared-storage first visit

**Section: `/business/the-market-model-answers` (the empty-state case)**

- step 20: Loads 200, canonical `https://revvylearn.com/business/the-market-model-answers` — **PASS** (E018)
- step 21: Subtitle explains the absence honestly: "Section 1.3.2 — demand, supply and the elasticities. The market-research model answer that used to sit here is examined under 1.3.1 and has moved to Meeting Customer Needs." — **PASS** (E019 honest empty state kept)
- step 22: Empty block is explicit, not blank: "No model answers are published for this topic yet, so this block is empty on purpose rather than by accident." — **PASS**
- step 23: No `Quiz` JSON-LD is emitted on a page with no questions (only EducationalOrganization + WebSite) — **PASS** (E021's "not invented properties")
- step 24: Title and H1 read "The Market — **Exam Questions & Model Answers**" on a page whose own counter says "0 written questions · 0 marks", under a heading "Exam questions" whose standfirst instructs "Open the mark scheme before the model answer" — with no question and no mark scheme beneath it — **FAIL**, expected the one page with no questions not to promise them in its title and its section heading. See defect 4.
- step 25: The empty note says "use the link **above** to browse every topic". The only links above it are the logo (`/`), "Open the app" (`/`) and the back-link to `/business/unit-1`. There is no browse-every-topic link above it, or anywhere on the page — **FAIL**, expected the instruction to point at something. See defect 4.
- step 26: Data-response link-out still present ("The Market — Ozempic supply shortage") and the "Practise The Market →" CTA resolves — **PASS**

**Whole set (all 32 pages, curled)**

- step 27: All 32 model-answer URLs return 200. Every page except `business/1.3.2` renders at least one written question (1–3 each) — **PASS** (E018 + E019 at student level)
- step 28: `.ma-ann-legend` appears on **0 of 32** pages, while annotation chips appear on **31 of 32** (20–80 chips per page, ~1,350 total) — **FAIL**. See defect 1.

---

## Blocking defect

### 1. The annotation key was dropped in the rewrite — 31 of 32 pages print ~1,350 undecodable letters

What the student ends up with: coloured 18px circles reading **K**, **A**, **An**, **E**, **D**
scattered through every model answer, with nothing on the page that says what they mean. On
`/economics/market-failure-model-answers` there are 36 in the DOM (72 in the served HTML across the
collapsed details). The student is expected to learn *how marks are earned* from letters that are
never defined.

Why it is a regression, not a pre-existing gap:

- The chips are baked into the answer HTML in the data file, e.g.
  `data/modelAnswersData.js:34` — `… <span class="ma-ann ma-ann-blue">K</span> …`
- Before this packet, `components/SectionModelAnswersPage.jsx` was a shell that rendered
  `<ModelAnswersPage answers={sectionAnswers} freeMode={true} />` (`git show HEAD:components/SectionModelAnswersPage.jsx`), and `components/ModelAnswersPage.jsx:377` renders
  `<AnnotationLegend items={answer.annotationLegend} />` immediately above the answer body.
- The rewritten `components/SectionModelAnswersPage.jsx` renders the answer HTML but never renders
  `annotationLegend`. `grep -rn "annotationLegend" components app` now returns exactly one hit —
  `components/ModelAnswersPage.jsx:377`, in the component no public route reaches any more.
- The data still carries the legend (`annotationLegend` at `data/modelAnswersData.js:37, 70, 103, …`).
  Nothing is missing from the content; the renderer stopped asking for it.

Legibility, measured at viewport width 390px (all chips 10px, font-weight 700, white text):

| chip | background | contrast vs white | WCAG AA (4.5:1 for 10px) |
|---|---|---|---|
| A | rgb(245,181,68) | **1.81:1** | fail |
| An | rgb(34,197,94) | **2.28:1** | fail |
| E | rgb(34,197,94) | **2.28:1** | fail |
| K | rgb(111,168,255) | **2.41:1** | fail |
| D | rgb(139,92,246) | **4.23:1** | fail |

`E` and `An` are additionally rendered on the *same* green, so colour alone cannot separate them —
only the 10px letter can, and at 1.8–2.4:1 that letter is the part the student cannot read.

This is the failure class the run was told to look for, one surface over: the pages pass every
structural check — questions render, `<details>` are SSR'd and collapsed, "Mark scheme" greps ≥ 1,
32/32 return 200, no table, no overflow at 390px — and the annotation system is still unusable,
because nothing measured whether the *key to the marks* survived the rewrite.

## Non-blocking defects

### 2. On 10 of the 29 mid-band panels there is no gap to show

`lib/mid-band-answer.js` builds the panel from the section's highest-tariff item. On ten pages that
item's own `likelyScore` is `5–6 / 8` — a Level 3 answer. The panel then tells the student the
truncated version "cannot reach Level 4 — 7–8 marks" and "tops out instead" at "Level 3 — 5–6
marks", which is exactly where the model answer above it already sits. The student reads a worked
answer marked 5–6/8, then a cut-down version of it that also lands at 5–6/8, under a heading
promising to show why marks are lost. On those pages no Level 4 answer is ever shown.

Affected (subject, section, top item, its score): bus 1.3.3, bus 1.3.5, eco 1.3.1, eco 1.3.2,
eco 1.3.4, eco 2.3.4, eco 3.3.1, eco 3.3.2, eco 3.3.4, eco 3.3.5 — all 8-mark items scored 5–6/8.
The other 19 panels sit under a full-mark answer (7–8/8 or 18–20/20) and work as intended, as seen
at step 7. Three pages (bus 1.3.2, 2.3.1, 2.3.4) have no panel at all.

The panel's own honesty text is good and should be kept; the selection rule is what misfires. Fixing
it is a content/selection decision, not a rendering one, and belongs to whoever owns
`lib/mid-band-answer.js` — not to this walkthrough.

### 3. "0.0%" is the headline on 21 of the 22 Economics pages

The coverage panel is the first coloured block under the H1. Measured across all 32 pages:

- Economics: 21 of 22 read "This page examines **0** of N requirements … 0.0%". Only 1.3.5 Market
  Failure reads 2 of 35.
- Business: all 10 read a real number (10 of 29, 2 of 46, 10 of 46, 3 of 18, 8 of 23, 4 of 21,
  5 of 24, 5 of 28, 1 of 15, and 0 of 24 for the genuinely empty 1.3.2).

The panel's small print explains it ("2 of them carry no spec tag yet, so this number is a floor,
not an estimate"), so the page is not lying. But the student-facing effect is that nearly every
Economics page opens by telling a sixteen-year-old it covers 0.0% of the section, on a page that in
fact contains two or three fully worked exam answers. The number is reporting missing spec tags on
the Economics question bank, and it is reporting them to the student. Before this packet the public
pages carried no coverage panel at all, so this is new in front of students.

### 4. `/business/the-market-model-answers` promises what it has none of

Three things on one page: the title and H1 say "Exam Questions & Model Answers" above "0 written
questions · 0 marks"; the "Exam questions" heading keeps its standfirst telling the student to
"Open the mark scheme before the model answer" above an empty block; and the empty note says "use
the link above to browse every topic" when no such link exists above it (or anywhere on the page —
the links are `/`, `/`, `/business/unit-1`, the data-response page, and `/?section=the-market`).
The brief anticipated the first of these — "`the-market`'s empty-state page needs its own honest
title too" — and it did not get one. The note's wording was "below" before this packet and is
"above" now; neither pointed at a browse-every-topic page.

---

## Console errors

Not clean, but nothing traced to the 12.3 surface:

- `./components/LearnModeTab.jsx:203:4 Expression expected — Parsing ecmascript source code failed`,
  repeated, with 500s on `/economics/[unit]/[topic]` and `/`. **Another session's mid-edit state in
  this shared worktree.** The file parses on disk now (mtime 19:56:13) and both routes return 200;
  Learn Mode rendered normally at step 19. Not a 12.3 defect, but it was live on this port during
  the run.
- `./components/SectionExamPracticePage.jsx:30:1 Module not found: Can't resolve
  './section-exam-practice.css'`, traced to `./app/lab/exam-practice/[section]/page.js`. A stale
  dev-server compile cache: the route folder, the component and the CSS are all gone from disk,
  `/lab/exam-practice/market-failure` returns 404, and `grep -rn "lab/exam-practice" app components
  lib audit/scripts` returns nothing. Consistent with the lab page having been deleted as the packet
  says. Worth noting only because the founder loses the private preview of this layout.
- Infrastructure noise: `_clientMiddlewareManifest.js` MIME-type refusal, HMR websocket drops,
  `[Fast Refresh]` cycles, sporadic 404s for dev chunks. Dev-server only.
- On the three walked pages themselves, with the tree in its final state: no page-level runtime
  error, no React hydration warning, no failed request for page content.

## Audit complaints still visible

- **A diagram whose labels cannot be read** — yes, in the annotation form: defect 1. The letters that
  label what earns each mark are 10px at 1.8–2.4:1 with no key.
- **An exercise with no defensible answer** — partly, defect 2: ten pages show a "worse" attempt that
  scores in the same band as the model answer beside it.
- **A header naming the wrong section** — no. Every page's header, back-link, unit code and section
  number matched its content across all 32.
- **A gate the student cannot get past / a text box with no button / a recall shown twice / many
  screens before the first Next** — none of these apply to this surface, and none were seen on the
  app screens reached from it (step 17–19).
- **"step 20 of 9" with a blank body** — not reproduced. Fresh storage showed "STEP 1 OF 9" with a
  populated body and a "1 / 9" footer. This packet does not touch the resume pointer, and a cleared
  browser cannot carry the stale pointer the bug needs, so this is not evidence the pointer bug is
  gone — only that the route into the app from these pages does not trigger it.
