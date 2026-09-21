# Verify B — packet 12.2, the lab page

Student walkthrough. Viewport **390 × 844** (set explicitly; the pane's "mobile" preset is 375 × 812 and was
not used), signed out, `localStorage` / `sessionStorage` / IndexedDB / cookies cleared before the first load,
real clicks via the browser pane. Dev server: the `remediation-dev` process already listening on 3001
(PID 4337, started 18:42:56, **after** the last source mtime 18:35:48 — checked, so this is not the stale-JSX
trap; the served bytes for `market-failure` are byte-identical in size to the build phase's own curl capture).

Sections walked: `market-failure`, `measures-economic-performance`, `business-growth` (the zero-`modelAnswersData`
Business Unit 3 slug).

---

## Steps

**step 1:** `/lab/exam-practice/market-failure` loaded at 390 × 844; `document.scrollWidth` = 390, no horizontal
page scroll; a yellow banner at the top reads "Lab page — noindex, nofollow, not in the sitemap, not linked from
the app. Built from files on disk, never from the database." — **PASS** (route resolves, E009).

**step 2:** Header reads `ECONOMICS · WEC11 · UNIT 1 · 1.3.5` / **Market Failure** / "3 written questions · 32
marks · 5 of 25 quick-check MCQs", then "Time estimates come from one constant per paper — Economics Unit 1 is
1 hour 45 minutes · 80 marks — not from a per-question guess." — **PASS** (E010 header: subject, unit code,
topic number, title, real counts, one shared time constant). Counts match the brief's independently measured
3 items / Explain 4 + Examine 8 + Evaluate 20 = 32.

**step 3:** Coverage panel: "**This page examines 2 of 35 requirements in 1.3.5 Market Failure** 5.7%", with
"Counted over the 3 written questions on this page and nothing else — not the whole question bank, and not the
teaching notes, which are measured separately and are much better covered. 2 of them carry no spec tag yet, so
this number is a floor, not an estimate." — **PASS** (E014: number stated, scope of the number stated, not
rounded up). The page's 2/35 and the CLI's bank-wide 7/35 (20.0%, `after.section-market-failure.out`) are
different denominatorless-of-each-other counts and the page says so in its own words; the two named leaves
(`ECON-1.3.5-2c-3`, `ECON-1.3.5-2d-2`) are absent from the CLI's unexamined list, which is consistent.

**step 4:** Two examined leaf ids are printed in full with their spec wording, and a collapsed
`<details>` reads "33 requirements in 1.3.5 that no question on this page examines" — **PASS** (E014 sample of
unexamined leaves; 2 + 33 = 35 is internally consistent).

**step 5:** Quick Check block: "5 of 25 multiple-choice questions in this section's bank. One mark each, marked
here as you click." Five numbered questions, four lettered options each, all real `section_quiz` content —
**PASS** (E010 Quick Check). Note: the student gets 5 of the 25, and the page says so; it is a sample, not the
bank.

**step 6:** Clicked option A on Q1 (wrong). A turned red, B turned green, and a verdict appeared: "**Not this
one.** Market failure means the free market does not achieve allocative efficiency … Option A describes
government intervention which is a response to market failure, not market failure itself. Option C describes
normal competitive exit … Option D describes a lack of purchasing power …" — **PASS** (marks on click, and
every distractor is refuted by name, not just the one chosen — the packet-19 worksheet-marker rule holds here).

**step 7:** Reloaded, clicked the correct option B on Q1: verdict "Correct. …", score line "1 of 1 right so far",
and all four option buttons became `disabled` — **PASS** (no re-click to fish for the answer).

**step 8:** Answered all five MCQs with the last option (all wrong): score line ended "**0 of 5 right so far**",
header still "5 of 25 quick-check MCQs" — **PASS**. Denominator tracks answered questions and never exceeded 5.
**No out-of-range counter of the "step 20 of 9" kind exists on this page**, and there is no resume pointer at
all — nothing is persisted across a reload, so there is nothing to restore wrongly.

**step 9:** "Written questions" caption: "Every question here carries a tariff that exists in IAL Economics. The
section's Practice tab holds 5 written items of its own, **4 of which carry a tariff that does not exist in IAL
Economics**. Those are counted here and not displayed." — **PASS**. Recomputed independently from
`audit/content-sections/economics__market-failure.json` through `practiceCommand` + `isValidTariff`:
Define 4 ✗, Explain 6 ✗, Analyse 10 ✗, Evaluate 20 ✓, Outline 4 ✗ → 4 of 5. The claim is computed per section,
not copied (see step 19).

**step 10:** Three written items, each headed `Explain · 4 marks · AO1 · AO2 · 5 min`, `Examine · 8 marks ·
AO1 · AO2 · AO3 · AO4 · 11 min`, `Evaluate · 20 marks · AO1 · AO2 · AO3 · AO4 · 26 min`, question text visible,
three collapsed `<details>` each (Mark scheme / Model answer / Examiner commentary) — **PASS** (E010).

**step 11:** 11 `<details>` on the page, all closed on load, all with their content present in the raw
`curl` response (`grep -c 'The band this attempt cannot reach'` = 1 in the served HTML) — **PASS** (E015, SSR).

**step 12:** On the Evaluate 20 (the highest tariff), a fourth panel: "**Why this loses marks — a mid-band
attempt at the same question**". Opened: it states its own construction first — "Not a real script, and not
written for this panel. It is 2 of 5 paragraphs of the model answer above, with 'Argument 2 …', 'Evaluation —
Government failure', 'Conclusion' removed. Nothing is rewritten." — then shows those two paragraphs with KAA+E
badges, then "**The band this attempt cannot reach** — AO4 (6 marks) Evaluation…", "**Where it tops out
instead** — AO3 (6 marks) Analysis…", and closes "No mark is put on this attempt… inventing a number for it
would be the kind of false precision this page exists to avoid." — **PASS** (E011: right question, distinct
from the model answer, annotated against the AO bands, grounded in the item's own material).

**step 13:** "Data response" card: "Market Failure — UAE plastics & GCC sugar tax / Stimulus, question ladder and
KAA+E model answers on the live page →", linking to `/data-response/econ-u1-market-failure`, which returns 200.
The stimulus text is **not** re-rendered on the lab page — **PASS** (E012 positive branch).

**step 14:** The string `correctIndex` appears **0 times** in the served HTML of all three slugs. The key reaches
the client renamed to `answer`, and `built.md` §"`correctIndex`, and why it is handled the way it is" says so in
those words ("That is a rename, not a fix, and the page does not pretend otherwise") — **PASS** against
acceptance 4, which allows exposure *if* `built.md` explains the tradeoff.

**step 15:** `/lab/exam-practice/measures-economic-performance`: `ECONOMICS · WEC12 · UNIT 2 · 2.3.1` /
**Measures of Economic Performance** / "3 written questions · 16 marks · 5 of 25 quick-check MCQs"; Explain 4,
Examine 8, Explain 4; MCQ marking works (clicked a wrong option, red/green + refutation, "0 of 1 right so far")
— **PASS** (second real section).

**step 16:** No "Data response" block anywhere on the page; no placeholder, no dead link, no empty heading —
**PASS** (E012 negative branch, which is the branch this section was always going to exercise).

**step 17:** Coverage panel reads "**This page examines 0 of 48 requirements in 2.3.1 Measures of Economic
Performance** 0.0%", with "3 of them carry no spec tag yet, so this number is a floor, not an estimate", and a
collapsed "48 requirements in 2.3.1 that no question on this page examines" — **PASS** as an honest statement,
but see concern C1.

**step 18:** `/lab/exam-practice/business-growth`: `BUSINESS · WBS13 · UNIT 3 · 3.3.2` / **Business Growth** /
"0 written questions · 0 marks · 5 of 10 quick-check MCQs". Quick Check renders five real MCQs and marks on
click ("1 of 1 right so far"). Under "Written questions": "No model answer has been written for this topic yet,
so this block is empty on purpose rather than by accident — the 3.3.2 entry in `data/modelAnswersData.js` does
not exist. The Quick Check above is real, and the coverage line above counts what is on this page, which is why
it reads 0." — **PASS** (E009 third slug: no 500, no blank, an honest empty state).

**step 19:** Business Growth's practice caption reads "…5 written items of its own, **all with valid tariffs**.
They are a separate bank and are not displayed here." Those five rows carry **no `command` field at all** in the
bundle, so this claim could have been vacuously true. It is not: the page falls back to parsing the command out
of the question text (`practiceCommand`), and recomputing independently gives Explain 4 ✓, Analyse 6 ✓,
Assess 10 ✓, Explain 4 ✓, Evaluate 20 ✓ against the IAL **Business** tariff table — 0 invalid, correctly —
**PASS**. The same recomputation on `measures-economic-performance` gives 4 of 5 invalid (Assess 10 there, not
Analyse 10), i.e. the number is derived per section rather than copied from market-failure.

**step 20:** `curl … | grep -c noindex` = 1 on market-failure; `curl /sitemap.xml | grep -c lab/exam-practice`
= 0 — **PASS** (acceptance 1 and 6).

**step 21 — the table-width failure class, looked for specifically:** `document.querySelectorAll('table').length`
= **0** on all three sections, both collapsed and with every `<details>` force-opened, and `<table` appears 0
times in the served HTML of all three. There is no table to be illegible. With all 11 `<details>` open the page
still reports `documentElement.scrollWidth` = 390 and **zero** elements whose right edge exceeds 391px or whose
`scrollWidth` exceeds their `clientWidth` — nothing overflows at 390px anywhere on any of the three pages.
There are also **no SVGs / diagrams** on the lab page, so the diagram-legibility complaint does not apply
either — **PASS, class absent**.

**step 22 — the resume-pointer failure class, looked for specifically:** the page holds no resume state. Nothing
is written to `localStorage`/`sessionStorage`, a reload returns every MCQ to unanswered, and the only "N of M"
counters are the header's "5 of 25 quick-check MCQs" (a fixed sample size against a fixed bank size), "N of M
right so far" (M = questions answered so far, observed at 1 and 5, never above 5), "N of M requirements"
(2/35, 0/48, 0/16 — each with its complement also printed, 33, 48, 16, and each summing correctly) and the
written-item ordinals 1–3. No counter went out of range and no body rendered blank — **PASS, class absent**.

---

## Console errors

**No application console errors.** The only `error`-level entries across all three pages are repeats of
`WebSocket connection to 'ws://localhost:3001/_next/webpack-hmr?id=…' failed:` — the Next.js dev-server
hot-reload socket, present before any interaction and unrelated to the page. Everything else is
`[HMR] connected` and the React DevTools info notice.

A black circular **"N" badge** sits fixed at the bottom-left and overlaps the words "…in this section's ba[n]k"
in the Quick Check intro. That is the Next.js dev-tools indicator, not page content; it will not exist in a
production build. Noted so nobody re-files it as a layout bug.

---

## Audit complaints still visible

- **A gate the student cannot get past** — none. The page is one scroll, nothing is locked.
- **Many screens before the first interactive control** — none. The first MCQ option button sits at y = 878,
  **1.04 screens** down; the whole page is 4058px (≈4.8 screens) collapsed.
- **An exercise with no defensible answer** — none. All five market-failure MCQs refute every distractor by
  name in the verdict text.
- **A text box with no button** — none; there are no free-text inputs on this page.
- **A recall shown twice in a row** — not applicable; no recalls on this page.
- **A diagram whose labels cannot be read** — not applicable; no diagrams on this page.
- **A header naming the wrong section** — none. All three pages' `<h1>`, breadcrumb, unit code, topic number
  and source footer name their own section.

---

## Concerns (not blocking; reported because they are what the reader ends up with)

**C1 — `measures-economic-performance` reads "examines 0 of 48 requirements · 0.0%" directly above three
questions that are visibly about 2.3.1** (CPI, types of unemployment, CPI limitations). The cause is that all
three items are untagged, and the page does say "3 of them carry no spec tag yet, so this number is a floor,
not an estimate." A careful reader gets there; a skimming one reads 0.0% as "this section examines nothing."
The sentence is one clause away from being unmissable — e.g. leading with *why* it is zero rather than
trailing it. Honest as built; worth a wording pass before this pattern reaches a live page.

**C2 — market-failure's Examine 8 is labelled "Model answer — 5–6 / 8".** The page's flagship block offers a
*model* answer that, by its own label, reaches Level 3 of 4. This is faithful: `likelyScore: '5–6 / 8'` is the
value in `data/modelAnswersData.js:211`, and the page renders `item.likelyScore` verbatim
(`SectionExamPracticePage.jsx:70`). So it is **inherited content debt, not a 12.2 defect** — but on a page whose
argument is that it takes mark schemes seriously, "Model answer — 5–6 / 8" with no explanation of why the model
answer is mid-band is the one line a student would stop at. `measures-economic-performance`'s Examine shows
7–8 / 8 and both Explains show 4 / 4, so this is a single item, not a systemic label bug.

**C3 — smallest rendered text is 10px**, used only for the single-letter KAA+E badges (`K`, `Ap`, `An`, `E`)
inside the model answers. Legible as badges at 390px in the screenshot; flagged only because 10px is below the
programme's usual floor and these are content markers rather than decoration.

**C4 — the coverage `<h2>` concatenates its percentage badge**: its accessible name comes out as
"This page examines 2 of 35 requirements in 1.3.5 Market Failure**5.7%**" with no separator, so a screen reader
reads "Market Failure five point seven percent". Visual layout is fine (the badge is on its own line).

**C5 — UK-specific exemplars on an IAL page.** The Evaluate 20 model answer and its mid-band panel argue from
"the UK's sugar tax (Soft Drinks Industry Levy)" and "NHS costs". The audience is international Edexcel, not
UK GCE. Inherited from `modelAnswersData`, not authored by this packet, and the linked data-response piece is
correctly "UAE plastics & GCC sugar tax" — noted for whichever packet rewrites that item.

---

## Verdict

**PASS — no blocking defect.** All seven ids are visible in what the reader actually gets at 390 × 844: the
route resolves on all three slugs including the zero-data one (E009), the header and both blocks render with
real counts, AOs and one shared time constant (E010), the mid-band panel sits on the highest-tariff question and
annotates against the AO bands without inventing a score (E011), the data-response card renders and links out on
market-failure and renders nothing on `measures-economic-performance` (E012), the coverage line is computed and
scoped rather than asserted (E014), and every `<details>` is in the server HTML (E015).

Both failure classes named in the assignment were looked for explicitly and are **absent**: there is no table
anywhere on these pages (and nothing else overflows 390px, with every `<details>` open), and there is no resume
pointer or out-of-range "N of M" counter — the page holds no cross-reload state at all.
