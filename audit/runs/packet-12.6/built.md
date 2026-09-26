# Packet 12.6 — built

Authoritative spec: `audit/specs/packet-12.6.md`. `audit/NEXT.md:3-17` re-read in full and confirmed
to be a reservation pointer with no requirements — no contradiction found between it, `PROTOCOL.md`,
the newest Handoff (`NEXT.md:9882`, packet 42), `PROGRESS.md` (no 12.6 row yet; created at the Gate
step per `PROTOCOL.md` 5.6), `DECISIONS.md`'s Settled list, or `CONTENT-GATE.md`.

Additive only. **No existing field was removed from any item**, and no section other than Economics
1.3.5 Market Failure was touched.

---

## E033 — the guard exists and is proved by mutation

**New:** `audit/scripts/validate-model-answers.mjs` (161 lines). Rules R1–R6, each firing **only on an
item that carries `criteria`** — which is what lets the sixty-three un-retrofitted answers keep
passing with no exception list.

- R1 sum-to-tariff — `audit/scripts/validate-model-answers.mjs:105`
- R2 seg resolves on the same item — `:112`
- R3 segment ids unique within the item — `:98`
- R4 legal tariff for the subject — `:119`, reading `tariffsFor(item.subject)` from
  `lib/practice-tariffs.js:31`, which computes from `lib/ial-marking.js:14-24`. **There is no tariff
  list in the new file** (a grep for a tariff array literal over the file finds only the three prose mentions in its header comment, lines 25, 26 and 30).
- R5 `criteria` and `script` travel together — `:78`
- R6 `stimulus` resolves to a file in `content/data-response/` — `:124`. Deliberately checks existence
  and nothing else; the 10-mark questions inside those six files are packet 12.9's and R6 is not
  widened to reach them (`:28-31` records why).

**Wiring:** `package.json:15` — `"validate": "node audit/scripts/validate-content.mjs && node
audit/scripts/validate-model-answers.mjs"`, plus `validate:model-answers` for a direct run.

**Proof:** `audit/runs/packet-12.6/validator-ab.md` — six runs, R1/R2/R4 mutated and reverted, exit 1
with the message then exit 0, all through `npm run validate`. Script:
`audit/runs/packet-12.6/mutate-ab.sh`. Logs: `ab-r{1,2,4}-{mutated,reverted}.log`.

**Stated in validator-ab.md and repeated here:** R3 and R6 are implemented but were NOT proved by
mutation — the spec's proof standard names R1, R2 and R4 only. R5's passing branch runs on all 63
un-retrofitted items every run; R3 and R6 are untested branches on today's data.

---

## E034 — 1.3.5 carries the new shape

The ledger's `file` field for E034/E035 says `data/modelAnswersData.js`. **Two of the three items are
not in that file.** Located by `grep -n "sectionNumber: '1.3.5'"` across both data files, not by
trusting the field — and filtered on `subject: 'economics'` as well, because Business also has a
section numbered 1.3.5 (`modelAnswersData.js:945`, `modelAnswersExpansion.js:1367`).

| item | file:line of the new block | marks | criteria | sum | script segments |
|---|---|---|---|---|---|
| `neg-externality-4` | `data/modelAnswersData.js:264` | 4 | 4 | 4 | 4 |
| `negative-externality-tax-8` | `data/modelAnswersExpansion.js:228` | 8 | 8 | 8 | 8 |
| `market-failure-government-intervention-20` | `data/modelAnswersExpansion.js:346` | 20 | 17 | 20 | 17 |

Every criterion's `seg` resolves; every segment id is unique; on all three items every segment is
claimed by at least one criterion (checked by an ad-hoc script that walks the exported
`MODEL_ANSWERS`, i.e. through the merged export, not by reading the two source files).

The criteria are a re-expression of marking already written and checked:
- the 4-mark item's two `markScheme` bands become 4 × 1 mark, two per band;
- the 8-mark item's Level ladder (1–2 / 3–4 / 5–6 / 7–8) becomes 8 × 1 mark, two per level;
- the 20-mark item's `markScheme` is already per-objective with marks (AO1 4 · AO2 4 · AO3 6 · AO4 6);
  the criteria redistribute those same four numbers and total 4 / 4 / 6 / 6.

**A judgement call, recorded because it is the one place this is not a mechanical re-expression.**
The 8-mark script is a **Level 3** script — its own `likelyScore` is `5–6 / 8` and its
`examinerCommentary` says why. R1 requires the criteria to sum to 8, so criteria `c7` and `c8` (the
two Level 4 marks) point at the two segments where the assessment BELONGS and is not made. Their
segment notes (`data/modelAnswersExpansion.js:271,272`) say that in as many words, and their wording
is lifted from the existing commentary, not invented. R2 asks that a criterion resolve to a segment on
the item; it does not assert the segment earned the mark. This is flagged for the verifier rather than
smoothed over: the spec's phrasing is "points at the place in the script that earned it", and for
these two marks the honest statement is "the place where it should have been earned".

Gates: `npm test` 279/279 exit 0 (`test.log`) · `npm run validate` exit 0 (`validate-baseline.log`) ·
`npm run build` exit 0 (`build.log`) · `npm run exposure` exit 0 · `npm run recalls` exit 0
("no section is worse than the baseline").

---

## E035 — the extract is attached and is in the flow

`stimulus: 'econ-u1-market-failure'` set on all three items (`modelAnswersData.js:290`,
`modelAnswersExpansion.js:276,419`).

**Which items "carry application marks", decided per item rather than assumed.** The spec says "the
1.3.5 questions that carry application marks" and does not enumerate them. Each item's own `ao` field
was read: the 4-mark is `['AO1','AO2']`, the 8- and 20-mark are `['AO1','AO2','AO3','AO4']`. AO2 is
application (`lib/exam-item.js:29`, `lib/ao-spec.js`). All three carry AO2, so all three carry the
extract.

**New render path:** `lib/stimulus.js` (reads and parses the `## Stimulus` block only), wired through
`lib/model-answers-route.js:94` (`stimulusForPage`) and `:110`, rendered by
`components/SectionModelAnswersPage.jsx:244` (`StimulusBlock`) mounted at `:458` — above the
questions, between the coverage panel and the "Exam questions" block. Nothing from the markdown file
reaches `dangerouslySetInnerHTML`; the blocks are rendered as React nodes.

**Measured at 390×844**, in a browser with the viewport emulated to exactly 390×844, by
`getBoundingClientRect` on the running DOM (not by reading the component):

- `.lab-stimulus` top **1105px**, left 20, width 350, height 1467.
- `closest('details')` → **null**; `display: block`; `visibility: visible`; no `aria-hidden` ancestor.
- First question (`.lab-item-question`) top **2762px** → the extract is above every question.
- **No interaction is required to read it.** It is in the document on first paint and is present in
  the production prerender: `.next/server/app/economics/market-failure-model-answers.html` contains
  24 `lab-stimulus` occurrences and the string `AED 0.25 per bag`.
- Table: 13px type, wrapper 317px wide, content 460px, `scrollWidth > clientWidth` → it scrolls
  horizontally rather than shrinking its type below the floor. Body paragraphs 14px.

**Scope of that sentence:** measured on the Market Failure model-answers page only, at 390×844, in the
Browser pane against the dev server on port 3001, plus a grep of the production prerender. Nothing was
measured at any other width and no other page's stimulus block exists to measure.

---

## E036 — the attempt loop works on 1.3.5

**New:** `components/MarkedScriptAttempt.jsx`, a client component, mounted at
`components/SectionModelAnswersPage.jsx:495` behind `item.criteria?.length > 0` — the retrofitted
shape is its own flag; there is no env var.

Walked at 390×844 with real clicks and real typing, state read back from the running DOM and from
`localStorage`:

1. Before any tick: `0 of 4 marks claimed — 0 of 4 criteria ticked`; marked script closed.
2. Clicked criterion `c1` → total `1 of 4 marks claimed — 1 of 4 criteria ticked`; the script opened
   itself; **exactly one** segment carried `is-marked` (`seg-neg-externality-4-p1a`) and printed
   `1 mark — 1–2 marks — definition`; marked border `rgb(111,168,255)` against `rgb(38,43,60)` on the
   unmarked ones.
3. Typed a draft into the textarea, clicked criterion `c4` → `2 of 4 marks claimed — 2 of 4`.
4. **Reloaded the page.** Draft string identical, ticks `[true,false,false,true]`, total `2 of 4`,
   segments `p1a` and `p2b` marked, script open. The other two questions on the page read
   `0 of 8` and `0 of 20` — state is per question id
   (`rl:attempt:v1:neg-externality-4`, `…:negative-externality-tax-8`,
   `…:market-failure-government-intervention-20`).
5. **No score button:** `document.querySelectorAll('.lab-attempt button').length` → **0** on the whole
   page. The total is live.
6. Console: 0 errors (`read_console_messages`, errors only).

Server-side persistence is not in this packet and the component says so to the student in words rather
than implying a sync it does not have (`MarkedScriptAttempt.jsx:136`).

---

## E037 — nothing else moved

Proved by A/B capture of rendered HTML over **10 other section pages** (spec asks for at least six):
7 Economics, 3 Business, including `business/the-market-model-answers`, the empty-state page.
`economics/market-failure-model-answers` was captured alongside them as a positive control.

Method, deliberately not the method that produced the change: `curl` of the served page before the
edits and again after (`audit/runs/packet-12.6/capture` via `ab-before/` and `ab-after/`), then three
independent comparisons of the bytes. The component's conditional branch was never read as evidence.

| comparison | script | result |
|---|---|---|
| rendered HTML, dev-server `<script>` tags and chunk URLs removed | `ab-rendered-html.py` | **10 of 10 identical**, market-failure differs (control) |
| full page INCLUDING the RSC flight payload, only chunk hashes and `self.__next_r` normalised | `ab-normalise.py` → `ab-diff.txt` | 10 differ, and **the only difference on every one is the flight payload's module-id numbering** (`1af:` → `1b3:`), which shifts by a constant because one client component joined the build graph |
| visible text — all markup and scripts stripped, i.e. what a student reads | `ab-visible-text.py` → `ab-text-diff.txt` | **10 of 10 byte-identical**, market-failure differs (control) |

Separately, in the browser at 390×844: `/economics/government-intervention-model-answers` and
`/business/financial-planning-model-answers` each report `.lab-attempt` → 0 and `.lab-stimulus` → 0
with their item counts unchanged.

**Scope of that sentence:** 10 of the 31 other section pages, rendered by the dev server on port 3001,
compared before and after this packet's edits. The other 21 were not captured. The production build
prerenders all 32 and exits 0, but no before/after byte comparison was run against the prerender.

---

## Not staged, and why

`package.json` carries this packet's `validate` wiring in the **working tree only**. It is **not
staged**, on purpose: the shared index already holds another session's version of that file which
REMOVES `lib/quant-pool.test.mjs` from the `test` script, while the working tree restores it. Staging
`package.json` would silently revert that session's staged change (`PROTOCOL.md`, "Commit atomically";
rule 5). The command a human should run once the index is quiet, after checking
`git diff --cached -- package.json`:

```
git add package.json
```

Everything else is staged by explicit path. Nothing is committed; nothing is published.

---

## Flagged, not actioned

1. **The spec's "Notes for the author" is wrong on one point of fact.** It says "1.3.5's existing model
   answers cite the extract correctly (`AED 0.18 per bag`, `PED -1.4`, `45% fall`). Keep those
   citations intact when segmenting." They do not. `grep -c AED data/modelAnswersData.js
   data/modelAnswersExpansion.js` → **0 and 0**; `grep -n "PED -1.4\|45%\|AED 0.18"` over both files →
   no hit in any 1.3.5 item. Those citations live in the extract's OWN model answers inside
   `content/data-response/econ-u1-market-failure.md`. The three bank answers use a coal-fired power
   station, a steel factory and the UK Soft Drinks Industry Levy. Nothing was invented to close the
   gap: E034 forbids new marking. **Consequence for a reader:** the page now shows a UAE/GCC extract
   above three model answers that cite other contexts. That mismatch is real, is visible, and belongs
   to packet 12.7 or 12.8 to resolve — either by re-authoring the application paragraphs against the
   extract, or by attaching a different extract.
2. **Ledger metadata gap:** E034 and E035 name `data/modelAnswersData.js` as their file; two of the
   three items are in `data/modelAnswersExpansion.js`. Worth a ledger correction.
3. **`lib/model-answers-route.js:94`** takes the FIRST `stimulus` named on a page if two questions ever
   name different ones. No page does today. Recorded in the function's own comment.
4. **`npm run contrast` cannot see any of this packet's CSS** — it reads `app/globals.css` only, and
   the new rules are in `components/model-answers-layout.css` (the same blind spot packet 12.3's fix
   round B1 recorded). The colours used are the file's existing `--lab-*` aliases, unchanged.
5. **`DECISIONS.md:3063`** — `ModelAnswersPage.isLocked` draws a lock while entitlement is unknown.
   That is a differently-named component; this page rendered fully in a signed-out browser with the
   attempt loop interactive, so it does not gate this surface. Not investigated further.
6. **Two data-file deletions in `git diff HEAD` are NOT this packet's.** `git diff HEAD --numstat`
   reports `55/0` on `data/modelAnswersData.js` and `192/6` on `data/modelAnswersExpansion.js`. All six
   deleted lines are packet 12.4's re-homing of `economies-scale-4` and `econ-diseconomies-scale-8`
   from 3.3.1 to 3.3.2 (`modelAnswersExpansion.js:259-263,370-372`, each carrying its own
   "RE-HOMED … by packet 12.4, E029" comment), which was already in the shared worktree and in the
   index before this session started — see `PROGRESS.md` row 12.4, "staged, not committed". **Zero
   lines were deleted inside 1.3.5 or by this packet.**
7. **`audit/ledger.json` is deliberately NOT staged.** The five ids are claimed (`ledger.mjs claim 12.6
   E033 E034 E035 E036 E037` → "claimed 5 items"), but the file already carried another session's
   staged changes, and rule 5 forbids committing it while a verifier may be running. The claim is in
   the working tree; whoever runs the gate should check `git status -- audit/ledger.json` before
   staging it.

---

# Fix round B1 — the two blocking findings in `verify-b.md` (22 September 2026)

Dev server stopped, `.next/cache` removed, restarted, and the served bytes checked by `curl` before
the browser was opened — and that check earned its place: the FIRST restart served the pre-edit page
(178,943 bytes, old note string present) until the server was stopped and started again with the
cache cleared a second time. Every measurement below is from the second, verified-fresh server
(179,413 bytes, new note string present, `lab-stimulus-table{...}` served with no `min-width`).

Two files changed, both already staged by the Build phase, both re-staged here by explicit path:
`components/model-answers-layout.css` and `components/SectionModelAnswersPage.jsx`. Nothing else was
touched. No content was published. No handoff file was edited.

## Finding 1 — the table lost a column at 390px. Closed.

**Reproduced first, by a method that did not read the fix.** At 390x844 on the running page:
table `460.0px` inside a `317px` scroll box, `scrollWidth - clientWidth = 143`, column widths
`117.7 / 83.9 / 123.6 / 133.8`, `::after` content `none`, `mask-image` none, `box-shadow` none.
Column 4 — "Estimated price elasticity of demand", carrying -0.6 / -0.9 / **-1.4** / -0.4 — entirely
outside the box at rest. Identical to `verify-b.md`'s numbers, measured independently of them.

**The premise the 460px floor rested on was never measured, and is false.** The file's own comment
said "four columns of numbers cannot fit 358px at a legible size". Probe: the same table cloned into
a 317px host with `min-width: 0` lays out at **309.9px min-content**, 7px inside the box, at
unchanged type. The floor was not protecting the font; it was pushing a column off the screen.

**Fix.** `min-width: 460px` removed; `width: 100%; max-width: 100%` in its place. Type untouched
(13px body / 12px head — asserted and then read back from the running DOM, `getComputedStyle`).
`overflow-x: auto` is KEPT, because below roughly a 330px box the min-content width genuinely does
not fit, and a wrapper that cannot scroll would clip instead.

**The class, not just the instance.** A scrollable wrapper now paints an edge glow exactly while
there is content past that edge: two `local` gradient layers scroll with the content and cover two
`scroll` layers, so the glow appears when scrollable and nothing appears when it is not. Pure CSS,
so it is in the server HTML and works with JavaScript off. The glow is `var(--lab-accent)`, **not**
the textbook black shadow: the card is `#1a1d2b` on this page's real default (`data-theme="dark"`),
where a black shadow would have existed in the stylesheet and not on the screen.

**Measured after, three ways, none of them "read the CSS":**

| check, at the stated width | result |
|---|---|
| 390x844 — `scrollWidth - clientWidth` on the wrapper | **0** (was 143) |
| 390x844 — table / wrap width | 317 / 317; columns 93.2 / 63.8 / 79.2 / 79.7 |
| 390x844 — `document.elementFromPoint` at the centre of **all 20 cells**, table scrolled into view | **20 of 20 return that cell**, `scrollLeft` 0 — including -0.6, -0.9, -1.4, -0.4 |
| 390x844 — per-cell `scrollWidth - clientWidth` | 0 for all 20: no cell clips its own text |
| 390x844 — `document.documentElement.scrollWidth` | 390: no page-level sideways scroll |
| 390x844 — screenshot | all four columns visible at rest, no glow (nothing is hidden) |
| 320x844 — hidden px / glow | 63px hidden, blue glow visible on the right edge in the screenshot |
| 320x844 — scrolled to `scrollLeft = 63` (the maximum) | right glow gone, **left** glow appears, -1.4 readable |

**Scope of those sentences:** measured on `/economics/market-failure-model-answers` only, at 390x844
and 320x844, in the Browser pane against the dev server on 3001, in the dark theme that is this
page's default for a signed-out student. Light mode was NOT measured: setting `data-theme="light"`
on the running page did not change `--lab-surface` on `.lab-page`, so what I would have measured was
not the light theme. The glow resolves to the same token as this page's link colour on the same
surface, so it is visible wherever those links are, but that is an inference, not a measurement.
`npm run contrast` cannot see any of this — it reads `app/globals.css` only, and these rules are in
`components/model-answers-layout.css`.

## Finding 2 — the note promised marks the exemplars do not earn. Note corrected; the mismatch itself is the founder's.

The note above the extract read: "The application marks below are awarded for using it, not for
remembering a textbook example." Checked independently of the walkthrough, by grep over the data
files rather than over the rendered page: `Soft Drinks Industry Levy` x5, `coal-fired power station`
x2, `steel factory` x4 across `data/modelAnswersData.js` and `data/modelAnswersExpansion.js`; `AED`
0. The three exemplars earn their application marks from exactly the textbook examples that sentence
disowned.

Re-authoring those three answers against this extract is **new marking**, which E034 forbids in this
packet ("a re-expression of marking that has already been written and checked, not new marking").
Removing `stimulus` from the three items would fail E035. So the sentence was made true instead: it
now says where application marks come from in a data-response question, says plainly that these
model answers predate the extract and apply the theory elsewhere, tells the student to take the
technique and write their own answer from the figures here, and points at the linked data-response
piece — which does use this extract (`/data-response/econ-u1-market-failure`, HTTP 200, 6 hits for
`AED 0.18` / `-1.4`).

**This does not close the underlying mismatch, and the walkthrough was right that it is a founder
decision.** A UAE/GCC extract still sits above three answers set in the UK and Europe. The options
are to re-author the application paragraphs against this extract (packet 12.7 or 12.8, new marking),
or to accept the split the note now describes. B1 removes the contradiction between the page and
itself; it does not make the exemplars use the extract.

## Finding 3 — soft, not actioned

The coverage panel above the extract is packet 12.4's `E031` surface, not this packet's, and the
extract's position is what E035 asked for. Recorded for the Handoff, unchanged here.

## Regression evidence for E036 and E037 after B1

- **E036, re-walked after the component edit:** a real click on the first criterion moved the total
  `0 of 4 marks claimed — 0 of 4 criteria ticked` -> `1 of 4 marks claimed — 1 of 4 criteria ticked`,
  marked exactly one segment (`seg-neg-externality-4-p1a`), and `.lab-attempt button` is still `0`
  on the whole page. Console: no application errors; the only errors are dev-server
  `webpack-hmr` WebSocket failures left by restarting the server under an open tab.
- **E037, re-run by the same method the Build phase used, against the state the walkthrough saw:**
  the 11-page capture set re-fetched into `audit/runs/packet-12.6/ab-b1/` and compared with
  `ab-visible-text.py` against `ab-after/`. **10 of 10 other pages byte-identical in visible text;
  `market-failure` differs, as the positive control.** Separately by `curl`: `lab-stimulus` and
  `lab-attempt` both 0 on `economics/government-intervention`, `economics/supply`,
  `business/the-market` and `business/financial-planning` model-answer pages, and the new note
  string appears on none of them.
- **Production prerender:** `.next/server/app/economics/market-failure-model-answers.html` carries
  the new note (1), the old note (0) and the elasticity column header (1).

## Gate after B1

`npm run build` exit 0 · `npm test` **279/279** · `npm run validate` exit 0 (including
`validate-model-answers.mjs`: 4/4, 8/8, 20 marks over 17 criteria, all three resolving
`econ-u1-market-failure`) · `npm run recalls` exit 0 · `npm run exposure` exit 0 ·
`npm run contrast` exit 0 **and structurally blind to this change**. Logs:
`audit/runs/packet-12.6/gate-b1-{build,test,validate,recalls,exposure,contrast}.log`.

## Staged, not committed

`git add -- components/model-answers-layout.css components/SectionModelAnswersPage.jsx` only.
`package.json` is still unstaged for the reason recorded above this section. `audit/runs/packet-12.6/`
is untracked, as the other packets' run directories are. Nothing committed; nothing published.
