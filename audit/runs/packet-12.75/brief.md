# Packet 12.75 brief — the practice shell

Written by the Brief phase. Author nothing, change no source file — this document is the work list
for Build. No measurement, test outcome, build result, or verification claim appears below; where a
source document asserts one, it is quoted as a CLAIM to check, not as fact.

## Reads completed, in the order required

`audit/PROTOCOL.md` (full) · `audit/SESSION-PROMPT.md` (full) · the `## Packet 12.75 spec` reservation
block in `audit/NEXT.md` (lines 16–26) and the newest `## Handoff` heading in that file (line 334,
"packet 12.6 closed" — written 22 Sept; nothing newer exists as a `## Handoff` heading; the 12.7 "PASSED"
entry at line 28 and the 12.75 reservation block above it are the freshest packet-relevant material and
carry no separate Handoff section of their own) · this packet's (absent) row in `audit/PROGRESS.md` —
confirmed absent, `grep -n "12\.75" audit/PROGRESS.md` returns nothing, which is expected: it is unbuilt ·
the Settled list in `audit/DECISIONS.md`, all of 2026-09-22 (two entries), 2026-09-25 (one entry relevant
here, plus three more for packets 2.8/2.9/2.91/2.92 and one for packet 42 that are not) and 2026-09-26
(one entry) · `audit/CONTENT-GATE.md` including "The recall contract" and "The per-section edit pass" ·
`audit/specs/packet-12.75.md` in full (the authoritative spec) · `audit/specs/packet-12.75-mockup.html`
(structure, not full render) · the current `audit/ledger.json` state for packet 12.75.

**No contradiction found among PROTOCOL, the newest Handoff, PROGRESS, DECISIONS and CONTENT-GATE.**
PROGRESS has no row (correct, unbuilt). DECISIONS' three 2026-09-25/26 entries not about 12.75 (2.8, 2.9,
2.91, 2.92, packet 42's MCQ bias) touch different sections/components (diagram pinning, recall baselines,
resource-management MCQs) and do not bear on the practice shell. CONTENT-GATE's recall contract and
`practice.opening` rule govern `InlinePractice.jsx`/notes content, which this packet does not touch — see
"Discrepancy 3" below for the one place this could mislead a reader.

**Precondition verified independently of the spec's own claim**: `git log --oneline -15` shows `b1942fe`
at HEAD, subject "packet-12.7: 1.3.5 practises the extract's own questions, and the 12.75 spec". Met.

## Ledger — `node audit/scripts/ledger.mjs packet 12.75` / `--open`

11 items total, 10 open, 1 wont-fix (E041, "superseded by E046" — the spec's own Ledger section says the
same thing, and the ledger's status agrees).

| id | status | title (ledger) |
|---|---|---|
| E040 | open | Mode gate: attempt or read-through, remembered per section in localStorage, changeable without losing a draft; read-through never unlocks a score |
| E041 | wont-fix | Question navigation (superseded by E046) |
| E045 | open | Practice shell layout on criteria-bearing pages: extract and work panes side by side filling the viewport below SiteHeader at ≥1024px with the page never scrolling on in-pane links; sticky tabs and dock below 1024px; question sets grouped by stimulus |
| E046 | open | Navigation: question cards (command, tariff, minutes from `lib/exam-timing.js`, state), dock with position/marks banked/soft timer/named primary button; arrow, number and Cmd-Enter keys, inert while typing |
| E047 | open | Links: criterion → model-answer sentence with an earned/missed text label; extract figures derived by `lib/stimulus.js` `figuresIn()` and linked both ways by exact text; clicking a figure while writing quotes it at the cursor |
| E048 | open | Nothing leaks, nothing is lost: no mark scheme/model answer visible in Practise before marking, all of it in server HTML with a `<noscript>` fallback, JSON-LD/title/canonical byte-identical to HEAD, 12.6 drafts survive |
| E049 | open | The look: colour from existing `globals.css` tokens only (zero hex/rgb/hsl literals in new CSS), `rl-night` pin kept, DM Sans/Serif-italic key term/Mono, contrast ≥4.5:1 measured on rendered pixels, motion off under reduced-motion |
| E050 | open | No text is ever cut, spilled or shortened: `audit/scripts/text-fit-sweep.js` returns 0 on every state from 320–1920px in 5px steps, after first being shown to fail on **this page** with the card container tier removed |
| E051 | open | The other 31 model-answer pages render identically to HEAD (A/B of rendered HTML on ≥6), and everything below the question list on 1.3.5 is still present below the shell |
| E052 | open | `keyTerm`: optional field, validator rule R8 (exact substring of `question`), rendered as the serif-italic key term; authored for all six 1.3.5 items; `question`/JSON-LD text unchanged |
| E053 | open | The mid-band "Why this loses marks" panel renders only for level-banded mark schemes and its ceiling is true of the paragraphs it shows; no longer sits on the extract Evaluate item quoting an AO3 row its shown paragraphs don't contain |

Ledger `file` fields point at: `components/SectionModelAnswersPage.jsx` (E040, E045, E046, E048, E051),
`lib/stimulus.js` (E047), `components/model-answers-layout.css` (E049), `audit/scripts/text-fit-sweep.js`
(E050), `audit/scripts/validate-model-answers.mjs` (E052), `lib/mid-band-answer.js` (E053).

## Spec requirements in scope, quoted, with what "done" means

**Scope gate (spec, "Scope").** *"The shell renders on a model-answer page if and only if at least one of
its written items carries `criteria`. After 12.7 that is Economics 1.3.5 alone. The other 31 pages render
exactly as they do at HEAD. Business is untouched."* Done = a runtime check on `criteria.length`, not a
hard-coded section id. **Independently verified, by a method different from reading the spec**: a Node
script over `MODEL_ANSWERS` (the live merged bank) counts exactly 6 items carrying a non-empty `criteria`
array, and all 6 have `subject:'economics'`, `sectionNumber:'1.3.5'`. The spec's claim is correct as of
today's data.

**E040 — mode gate.** Practise/Model answers, remembered per page in `localStorage`, changeable without
losing a draft; Model answers mode never banks or shows a score. Done = both modes render from the same
draft state; switching modes is idempotent on the draft.

**E045 — layout.** Quoted in full because it is the load-bearing structural spec: *"On a shell page it
renders: `SiteHeader`, then the shell, then everything that is currently below the question list
(`CoveragePanel`, the data-response link, the 'Now try one yourself' CTA), in that order... The `h1`
(from `modelAnswersHeading`) moves into the shell's top bar as its title... the `lab-header` counts and
time note move below the shell... There is no Exit button and no `Esc` exit: `SiteHeader` is the way
out."* **Checked against the current component** (`components/SectionModelAnswersPage.jsx`): the existing
order is `SiteHeader` → `h1.resource-page-title` (line 439) → `header.lab-header` (line 444) →
`CoveragePanel` (line 459) → the "Now try one yourself" `h2` (line 531) — confirms the spec's description
of what's "currently below the question list" is accurate, so the reordering instruction is well-founded,
not a stale premise. Done = that exact reordering, `h1` moved into the shell top bar, breadcrumb from the
back link, question sets grouped by `stimulus` (extract-bearing set first on 1.3.5), desktop pane-scroll
without page-scroll on in-pane links, sticky tabs/dock below 1024px.

**Mockup vs spec disagreement, already resolved in the spec itself (not a contradiction to escalate):**
the mockup (`packet-12.75-mockup.html` line 341) renders an `Esc`-labelled exit button
(`<button ... id="exit" aria-label="Exit practice">`). The spec explicitly overrides this: *"There is no
Exit button and no `Esc` exit: `SiteHeader` is the way out."* The spec's own rule ("this spec wins" where
the two disagree) already covers this case; flagged here only so Build doesn't copy the mockup's exit
control by reflex.

**E046 — navigation.** Question cards (command word, tariff, minutes, state), `aria-current="step"` +
full-text `aria-label`; dock with position, marks banked, soft timer (never blocks/auto-submits), Previous,
and a primary button naming its action. Keyboard: arrows move, number keys jump, Cmd/Ctrl+Enter marks, all
inert while typing except Cmd/Ctrl+Enter. *"Minutes come from `item.minutes` if present, else
`minutesForMarks()` in `lib/exam-timing.js`. Never a new formula."* **Checked**: `lib/exam-timing.js`
already exports `minutesForMarks`, and all six 1.3.5 criteria-bearing items already carry an authored
`minutes` field (3, 8, 3, 8, 26, 11 — not yet fully enumerated per item, but present on every one checked),
so this id needs the read-order logic, not new authoring.

**E047 — links.** Every criterion has an always-visible "Show in the model answer" link with an
earned/missed text label (not colour-only). *"Add `figuresIn(blocks)` to `lib/stimulus.js`"* — **checked**:
`lib/stimulus.js` currently exports only `inlineTokens`, `parseStimulus`, `stimulusFor`; `figuresIn` does
not exist yet, confirming this is real work, not already done. Unit-test target figures for the 1.3.5
extract: `AED 0.25`, `AED 0.18`, `45%`, the two PED values, `32%`, `12.3%`, `USD 25 billion`; must not match
the years 2017/2024/2025. See **Discrepancy 1** below — the spec's own prose uses the wrong glyph for the
two negative PED figures.

**E048 — nothing leaks.** In Practise mode, no mark-scheme/criterion/model-answer/examiner-note text
visible before marking or choosing to see the answer, but all of it present in server HTML (`hidden`
attribute + `<noscript>` fallback) for search and no-JS readers. Quiz/FAQPage JSON-LD, `<title>`,
canonical, sitemap byte-identical to HEAD. Drafts from packet 12.6 (`MarkedScriptAttempt.jsx`'s
`storageKey(questionId)`) must survive — extend the shape, never rename it, and the first client render
must equal the server render (hydrate from an effect after mount, as 12.6 already does).

**E049 — the look.** Zero hex/`rgb(`/`hsl(` literals in new CSS; explicit token mapping table in the spec
(`--bg`→`--bg-primary`, etc.); keep the `.resource-page.rl-night` dark pin but the shell must also render
correctly with the pin removed (check once in light, do not ship it); DM Sans/DM Serif Display
italic/DM Mono, all already loaded; contrast ≥4.5:1 measured on **rendered pixels** at 390×844 and
1440×900, recorded in `audit/runs/packet-12.75/contrast.md` (`npm run contrast` cannot see this — it reads
`app/globals.css` only, a known blind spot since packet 12.3/12.6); motion off under
`prefers-reduced-motion`.

**E050 — no cut/spilled/shortened text, ever, including `…`.** Container-query card tiers copied from the
mockup (do not re-derive); `text-fit-sweep.js` at 320–1920px in 5px steps, dark and once in light with the
pin removed, across every state (writing/marking-with-note-open/Model-answers/Standalone set) must return
0. **The founder's standard is dated 2026-09-26 in DECISIONS** and includes the ellipsis rule explicitly.
**Checked**: `audit/scripts/text-fit-sweep.js` already exists in the repo (added by the 12.7 commit,
`b1942fe`) — but per that commit's own message and `DECISIONS.md`'s 2026-09-26 entry, it has so far only
been run against **the mockup HTML**, proving fail (pre-fix, 650–810px, card metadata bleeding 151px) then
pass (post-fix, "1,926 checks"). It has **not yet** been run against the real page, because the real page
doesn't exist. So E050's "prove it can fail on this page first" is not pre-satisfied by that evidence —
it is still open work for Build, on the real shell once built, not a check that can be waved through
because a same-named script already ran once elsewhere.

**E051 — nothing else moved.** The other model-answer pages (spec says 31; not independently recounted
to an exact figure — see **Count** note below) render identically to HEAD; A/B rendered HTML of at least
six by a method different from the one that produced the change.

**E052 — `keyTerm`.** New optional string field; validator rule R8 (exact substring of `question`);
renders the stem's first occurrence of the term in DM Serif Display italic, underlined; `question` and
JSON-LD `text` unchanged. The spec's table of six proposed `keyTerm` values, **checked one by one against
the actual `question` strings currently in `data/modelAnswersExpansion.js`**: all six are exact substrings
of their item's live `question` text today (Define → "negative externality of consumption"; Analyse →
"the AED 0.25 charge on single-use plastic bags"; extract Evaluate → "the most effective way"; generic
Explain → "negative externality"; generic Examine → "negative externality of production"; generic
Evaluate → "always necessary"). No discrepancy found here — the spec's caveat ("12.7 may have worded the
extract stems differently from this table") does not apply; the table is safe to author verbatim.
**Checked**: `audit/scripts/validate-model-answers.mjs` currently implements R1–R7 only; R8 does not exist
yet, confirming this is real work.

**E053 — the mid-band panel.** See **Discrepancy 2** below — this is the most important finding in this
brief and changes what "done" plausibly means for this id.

## Discrepancies found by checking the spec against the code (not against each other — the handoff docs
agree with each other; these are claims in the authoritative spec that the code does not fully bear out)

**Discrepancy 1 — `figuresIn()`'s worked example uses the wrong minus-sign glyph.** The spec's own prose
(and the ledger note?) writes the two negative PED figures as `−1.4` and `−0.6` using U+2212 (a true minus
sign). Byte-level inspection of the actual source text shows otherwise:
- `content/data-response/econ-u1-market-failure.md`, the `## Stimulus` section (Table 1 and the body
  text) — the only text `parseStimulus()` ever extracts, since it slices from `\n## Stimulus` to the next
  `\n## ` heading — writes both figures with an **ASCII hyphen-minus** (`-1.4`, `-0.6`), every time. The
  file's one occurrence of the true minus-sign glyph (`−0.6 vs −1.4`) is in the "Diagram Reference"
  section, which `parseStimulus()` never reaches.
- `data/modelAnswersData.js` and `data/modelAnswersExpansion.js` also write these figures with the ASCII
  hyphen throughout (12 and 5 occurrences respectively of `-0.6`/`-1.4`; zero occurrences of the true minus
  sign anywhere in either file).

So `figuresIn()`'s exact-text matching will only ever see hyphen-minus in both the extract and the model
answers — which is internally consistent and workable — but anyone who copies the spec's own example text
(`−1.4`, `−0.6`) verbatim into a unit-test assertion will write a string the real content never contains,
and the test will silently never match. Author the test against the hyphen form.

**Discrepancy 2 — E053's stated root cause does not match what `lib/mid-band-answer.js` already does, and
the actual defect looks present on BOTH candidate 20-mark items, not just the one E053 names.**

The spec says: *"The mechanism assumes a level-banded mark scheme, where a row names a level an attempt
reaches. On an AO-split scheme (4/4/6/6) a row names what an objective requires, so the reuse is false...
the panel must only render for items whose mark scheme is level-banded."*

Reading `lib/mid-band-answer.js` (`bandsFor()`, lines 54–82) shows the module was **already built,
deliberately, to handle both shapes** — its own docstring: *"Two shapes appear in the bank and both are
handled — levels ... used by Examine 8; assessment objectives ... used by Evaluate 20."* For an
"objectives" scheme it returns `outOfReach = the AO4 row` and `ceiling = the AO3 row`, by design, not by
accident or oversight.

Checking both 20-mark items in `economics__market-failure` (the only section with `criteria`, so the only
one this packet touches) against `midBandAttempt()`'s cut rule (`CLOSING_LABEL`, which drops any paragraph
labelled evaluation/conclusion/counter-argument/"argument 2"/judgement, plus the final paragraph
regardless of label):

- **The extract's Evaluate item** (`answerParagraphs`, 7 total: Introduction, "The case for the tax",
  5 paragraphs labelled "Evaluation — ...", Conclusion). Kept = Introduction + "The case for the tax" (2
  of 7 — matches the spec's own description exactly). Its `markScheme` AO3 row reads: *"Analysis:
  multi-stage chains for the tax **and against it** — inelastic demand, information failure, regressivity,
  and why a tax on price gives producers no reason to reformulate."* Every "against" item that row lists
  (inelastic demand, regressivity, the design point) is argued only in the dropped "Evaluation" paragraphs,
  not the two kept ones — this is the mismatch E053 describes.
- **`market-failure-government-intervention-20`** (the item the panel sat on *before* 12.7, and the
  implicit "move it back" candidate): `answerParagraphs` = Introduction, "Argument 1 — Intervention is
  necessary", "Argument 2 — Intervention is not always necessary", "Evaluation — Government failure",
  Conclusion. `CLOSING_LABEL` matches "Argument 2" (via `argument\s*2`), "Evaluation", and the final
  paragraph — so kept = Introduction + Argument 1 only (the "necessary" side alone). Its own AO3 row reads:
  *"Analysis — chains of reasoning **for and against** intervention."* Same shape of claim, same mismatch:
  the "against" chain (Argument 2, Coase theorem) is exactly what gets dropped.

**Both of this section's 20-mark items describe their AO3 band as covering both sides of the argument,
while the cutting rule keeps only the "for" side's paragraphs on both of them.** If E053's literal
instruction ("only render for level-banded items") is followed, the panel simply has nothing to render in
this section at all — there is no level-banded 20-mark item here (Examine 8, the level-banded one E053
cites as already working, is 8 marks, so `highestTariffItem()`'s tariff-first sort would only reach it if
both 20-mark items are excluded). That may be the intended outcome, but it is also exactly the situation
the spec's own escape hatch names: *"unless you find that item has the same problem, in which case say
so."* Recording that here rather than in Build, per the rule that a brief states only what was checked:
**both candidates were read, and both show the same class of defect the spec attributes to only one.**
This is a real open question for Build/the founder, not resolved by this brief: does E053 mean (a) gate
strictly on scheme shape as literally written, which drops the panel from this section entirely and falls
back to the 8-mark item, or (b) fix the AO3/ceiling text itself (or its rendering) so a "for-only" ceiling
claim is written honestly for whichever 20-mark item is chosen? The spec's own wording supports (a); its
intent ("whatever it prints as the ceiling must be true of the paragraphs it shows") is equally satisfied
by (b) applied to either 20-mark item.

**Discrepancy 3 (minor, naming only) — E048's "nothing leaks" is not the same mechanism as
`practice.opening`.** `CONTENT-GATE.md`'s `practice.opening` rule (item 6 of "The per-section edit pass")
governs `InlinePractice.jsx` guidance text on notes-content sections, and is enforced by
`lib/content-validator.mjs`'s validator rule of the same name (confirmed live in `audit/ledger.json`, e.g.
finding F088's evidence citing "184 findings ... 160 are practice.opening"). E048 is a **new**,
differently-implemented requirement for the model-answers shell (hide with the `hidden` attribute +
`<noscript>`, not a guidance-text split), on a component `practice.opening`'s validator rule does not
scan. Nothing in the spec claims otherwise, and this is not a contradiction — flagged only so Build does
not assume the existing `practice.opening` lint will catch a regression here; it won't, because it never
looks at this file.

**Discrepancy 4 (procedural, not content) — the spec's own text has no top-level "Acceptance" section
listing the universal gate commands.** Unlike, e.g., packet 42's spec (which lists `npm test` / `build` /
`validate` / `exposure` / `recalls` explicitly), `packet-12.75.md` states acceptance per-id inline (E049's
CSS grep, E050's sweep) and never restates the universal ones. `PROTOCOL.md` §Gate and
`SESSION-PROMPT.md` make `npm test`, `npm run build`, `npm run validate` mandatory for every packet
regardless, and items 4a make `npm run exposure` and `npm run recalls` "the two gates no other command can
stand in for" from packet 2.7 onward — with no carve-out for a packet whose own spec doesn't mention them.
This is not a contradiction to escalate (the universal document wins by default), only a gap worth naming
so Build doesn't take the spec's silence as permission to skip them.

## Spec-coverage candidates for `economics__market-failure` (out of this packet's scope — listed per
instruction, not to act on)

`audit/raw/spec-coverage.json` → `bySection` → `economics__market-failure` (1.3.5): 23 covered, 3 thin,
3 missing, `worksheetReady: false`.

- **missingItems**: "1b) Source of market failure: speculation and market bubbles"; "2e) The impact of
  externalities in a financial context"; "4c) How imperfect market information leads to misallocation in
  pensions".
- **thinItems**: "3a) Private goods: rival and excludable"; "4a) The distinction between symmetric and
  asymmetric information."; "4c) How imperfect market information leads to misallocation in healthcare".

**These are candidates to check against `audit/raw/econ_spec.txt`, not a to-do list for 12.75.** Packet
12.75 builds a UI shell over six already-existing criteria-bearing model-answer items; it authors no new
notes content and adds no missing spec leaves (the spec's own "Out of scope" list names "retrofitting any
other section" as packet 12.8's, and market-failure's notes-content gaps above are a different kind of
work again — a content-authoring gap in `content-sections`, not a practice-item gap). Recorded here only
so nobody reading this brief mistakes silence for "checked and cleared."

## Count, by reading the bundle / running a script (not asserted from the spec's prose)

- `node audit/scripts/ledger.mjs packet 12.75` → **11 items** (10 open + 1 wont-fix), matching the 10 rows
  the spec's own "Ledger" line names as open (E040, E045–E053) plus E041 wont-fix. Command run, output
  captured above.
- Items in `MODEL_ANSWERS` carrying a non-empty `criteria` array: **6**, all `economics`/`1.3.5`
  (`node --input-type=module` one-liner against `data/modelAnswersData.js`, run this session). This is the
  entire population the shell must render correctly; there is no larger hidden set.
- `lib/stimulus.js` currently exports 3 functions (`inlineTokens`, `parseStimulus`, `stimulusFor`);
  `figuresIn` is absent — grep run this session, 0 hits.
- `audit/scripts/validate-model-answers.mjs` currently implements rules R1–R7; R8 is absent — grep run
  this session, 0 hits for `keyTerm` anywhere in that file or either data file.
- Total distinct `(subject, sectionNumber)` pairs across `MODEL_ANSWERS`: 30, from a script run this
  session — **this does not cleanly resolve to the spec's "31 other pages" (32 total) claim** and was not
  chased further within this brief's scope (it may reflect a subject/section vs. page-route mapping this
  brief did not fully trace, e.g. Business pages counted differently, or a section with zero
  criteria-bearing items still rendering its own page). **Flagging as unresolved, not as a contradiction**:
  Build's own E051 A/B step will enumerate the actual page routes directly and should treat the spec's "31"
  as a claim to confirm against that enumeration, not as a pre-verified count.

## Nothing staged, nothing committed

No source file was created, edited or staged during this brief. `git status --short` on every file this
packet will eventually touch (`components/SectionModelAnswersPage.jsx`,
`components/model-answers-layout.css`, `lib/stimulus.js`, `lib/mid-band-answer.js`,
`lib/mid-band-answer.test.mjs`, `data/modelAnswersData.js`, `data/modelAnswersExpansion.js`,
`audit/scripts/validate-model-answers.mjs`, `audit/scripts/text-fit-sweep.js`) shows them clean as of this
brief. **`audit/DECISIONS.md`, `audit/NEXT.md`, `audit/PROGRESS.md` and `audit/ledger.json` are already
modified in the shared working tree by another/earlier session** (607 lines of uncommitted diff across the
four, per `git diff --stat` run this session) — not this brief's doing, and not touched by it. Build must
re-check `git status` and diff those four files immediately before writing to any of them, per the
programme's handoff-file-race lesson, rather than assuming this brief's read reflects their state by the
time Build starts.
