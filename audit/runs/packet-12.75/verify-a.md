# Packet 12.75 — Verify A (packet-verifier, 26 Sep 2026)

Inputs: `ledger.mjs unverified 12.75`, `git diff HEAD`, spec `audit/specs/packet-12.75.md`. built.md was not read.
Dev server: `next dev --port 3001`, cwd this worktree (checked with lsof); served HTML fetched with curl.
Scratch scripts: session scratchpad `v1275/` (census.mjs, presence.mjs, paras.mjs).

Method, chosen to differ from the builder's:
- leak and presence: the bank's own strings (data files) against the served HTML (curl) and against
  `document.body.innerText` (the text a person can see), not the builder's leak-strings.json;
- text fit: my own check, which uses `Range.getClientRects()` on glyph runs against every clipping ancestor and the
  viewport, plus pairwise text-overlap inside compact components. It does not use text-fit-sweep.js;
- contrast: computed colours with alpha compositing up the ancestor chain, not pixel sampling;
- E051: whether the page is a pure insertion, whether it is gated, and whether the served CSS is scoped. Not an HTML A/B.
Each check was first shown to fail on a control: study mode made the leak check report 5 visible strings; with
`container-type:normal` forced on the cards the text-fit check failed at 88 widths; a `--text-muted` span measured 3.13:1.

## Verdicts

**E040 CONFIRMED.** Mode is stored per page under `rl:practice:v1:<path>` (PracticeShell.jsx:63-83, 500-502). In
Model answers mode the checkboxes are disabled (`marking` is false, :342-357). The dock and the question row drop
Banked (:850, :1005) and the cards read "Reading" (:764). In the browser: I marked and ticked 2 marks, then switched to Model answers.
No student score was visible; the only "/ 20" left was the model answer's own "Marked 20 / 20". The draft
survived both switches, and the stored prefs read `{"mode":"practise"}` after I switched back.

**E045 CONFIRMED.** The render order is SiteHeader, then the JSON-LD, then the shell, then `#ps-after` (lab-header counts
and note, CoveragePanel, data response, CTA). See SectionModelAnswersPage.jsx:461-551, where the h1 is the shell title (only 1 `h1` on the page).
At 1440×900 the shell measures 60 to 900, exactly the viewport below the 60px header (`calc(100dvh - var(--rlh-h))`, and
`--rlh-h` is what sizes `.rlh` itself, theme-night.css:156). Under forced reduced motion I made 6 "Show in the model answer" clicks
and 15 figure clicks, both directions. The work or extract pane scrolled (e.g. 0→713…1195) and the target ended inside the pane.
`window.scrollY` stayed 0 every time. At 390 the tabs stick at top 60. After a scroll to 1500, switching tabs put
the work pane 12px under the tabs. The dock is `position: sticky` with the safe-area padding. The sets are
"Extract A · 3 questions" then "Standalone · 3 questions", and the standalone set renders `ps-panes is-solo`.

**E046 CONFIRMED.** The cards carry `aria-current="step"` and a full-text aria-label (:821-826). Minutes come from `minutesFor()`
(practice-shell.js:31-35: `item.minutes`, else `minutesForMarks`). The primary button reads "Show the model answer" with an
empty draft, "Mark my answer" with a draft, "Next: Analyse · 6 marks" and "Next: Standalone questions".
I tested the keys with dispatched keydown events. → moved Q2→Q3, ← moved back, and "1"/"2" jumped. →/"3" inside the textarea did nothing, and
→ with focus on a link below the shell did nothing. ⌘↵ inside the textarea marked. The timer shows
"1666:39 / 08:00 · over time" and never blocks. It is hidden ≤640px, as the mockup also hides it (mockup:288).

**E047 CONFIRMED.** `figuresIn` on the real extract returns AED 0.25, AED 0.18, 45%, -1.4, 32%, -0.6, 12.3% and USD 25 billion.
It returns no 2017, 2024 or 2025. "Show in the model answer" sets the segment and never toggles it (:982 passes `toggle=false`).
Notes read "You earned this · 1 mark" or "You missed this — here is how it’s earned". The missed role reads "Missed — this is where it goes" in
Model answers mode. Answer→extract figure clicks gave the extract `is-linked` and scrolled the extract pane. Extract→answer clicks either
linked or showed the "does not use that figure" toast. With the caret at 22 in "The tax cut demand by. That is large.", clicking
32% gave "The tax cut demand by. 32% That is large.", caret 26, focus kept. Table focus rows were 0 while writing and 1 after marking.

**E048 REJECTED.** Most of it holds:
- All 201 bank strings for the six items (segments, notes, criteria, mark-scheme rows, examiner notes) are in the curl HTML.
- In Practise, before marking, 0 of 201 are visible, for every question of both sets at both 1440 and 390.
- The JSON-LD code lies outside the diff, which is a pure insertion, and the Quiz `text` values equal the unchanged `question` strings.
- The title and canonical come from the unchanged route.
- 12.6 records `{draft, ticked}` load as marking (1/2 banked) or as a draft. The stored record was not rewritten.

**What remains: the noscript fallback is incomplete.** I rendered the served HTML with scripting disabled (sandboxed srcdoc):
- **Notes:** 0 of 57 segment notes are visible at 390 or 1440. `.ps-note` is `hidden` and has no `data-ps-noscript-show`
  (PracticeShell.jsx:280), so the noscript rule never reaches it. At HEAD these notes were server-rendered inside an openable
  `<details>` (MarkedScriptAttempt.jsx `lab-script-note`).
- **Extract:** below 1024px the extract pane is `display:none`. It is served with `data-hidden-sm="true"` (:902), the
  `.ps-pane[data-hidden-sm="true"]` rule applies, and the tabs that would reveal it are `data-ps-js-only`. So a phone reader without
  JavaScript never sees the extract, which HEAD's StimulusBlock showed.

**E049 CONFIRMED.** `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" components/practice-shell.css` finds nothing, and the file
uses tokens and `color-mix()` only. The page keeps `resource-page rl-night ps-page`. The stem is DM Sans. The key term is
DM Serif Display, italic and underlined, and `document.fonts.check('italic 400 20px "DM Serif Display"')` is true. Metadata is DM Mono.
Contrast, with transitions frozen: no text pair was below 4.5:1 in the writing, over-time, marking (ticks, note, linked figure), study and revealed states at 1440×900.
The same held in the writing, marking and extract (focus row) states at 390×844.
The only sub-4.5 readings were the disabled Previous button (exempt) and mid-transition values in the hidden tab.
Those were artefacts: they vanished once transitions were off. The reduced-motion block is practice-shell.css:338-341.

**E050 REJECTED.** In my check every state I drove passed 320→1920 in 5px steps. Those were Extract A Q1, Q2 and Q3 writing, Q1-Q3 marking with a note open, Model answers
with a note open, Standalone Q1/Q2 writing, Q2 fully ticked with a missed note, Model answers with a missed note, and Q3 revealed.
**One state fails:** the Extract tab open below 1024px. With the Extract tab selected, Table 1's wrapper
`.ps-twrap` (overflow-x:auto) scrolls sideways at phone widths:
- at 320px, scrollWidth 296 against clientWidth 252 (44px). The elasticity column (-0.6/-0.9/-1.4/-0.4) spans x 252-330 and the wrapper ends at 287;
- at 360px, 4px (the header "Estimated price elasticity of demand" ends at 330 and the wrapper at 327).

text-fit-sweep.js counts this as a failure itself ("TABLE: a table's container scrolls sideways at phone width (<= 640px)", :16 and :120).
The builder's 18 recorded states never select the Extract tab. In each of them the extract pane is `display:none` below 1024px, so the
sweep never measured the table at a width where it breaks. The range is roughly 320-364px, which includes the common 360px Android width.

**E051 CONFIRMED.** `diff HEAD:components/SectionModelAnswersPage.jsx` shows no removed lines, only the ShellPage block and the
`hasShell()` gate before the old return. No bank item outside Economics 1.3.5 has `criteria` or `keyTerm` (census), so every
other page takes the untouched path. On the dev server, 7 other pages (5 Economics, 2 Business) have 0 `ps` classes.
practice-shell.css does reach every page in the route's CSS chunk, but every rule in it is under `.ps`/`.ps-page`/`.ps-*` or is a
`ps-` keyframe or container query, so it matches nothing there. lib diffs are additive: `highestTariffItem` defaults to
`levelsOnly:false`, the stimulus.js exports are new, and model-answers-route.js is unchanged. On 1.3.5 the coverage panel, the data-response link and the CTA are
all present in `#ps-after`.

**E052 CONFIRMED.** Calling `checkItem` directly: "negative externality" passes. "negative externalities", "Negative externality", "" and 42
each raise R8 (validate-model-answers.mjs:94-103). All six 1.3.5 items carry a keyTerm that occurs exactly once in `question`. The
data diff adds only the `keyTerm` lines, and the served Quiz `text` values are the plain question strings. The stem renders an `<em>` in the serif italic.
The `npm run validate:model-answers` run found 0 findings.

## Unclaimed but relevant

**E053 (open, assigned to 12.75).** On the shell it is fixed: `highestTariffItem(items, { levelsOnly: true })`, and 1.3.5 shows no
panel. My census confirms both 20s there are AO-split, and Examine 8 is suppressed by E028. **The class is not fixed.** The default path
still builds the panel on AO-split items and prints "AO3 (6 marks)" as "Where it tops out instead" on 8 non-shell pages:
Business 1.3.4, 2.3.3 and 2.3.5, and Economics 2.3.2, 2.3.5, 2.3.6, 3.3.3 and 4.3.2. All eight are AO-split 20s (my classifier: rows
starting `AO\d`). The other 11 panels sit on level-banded 8s and are fine.
The E053 title ("renders only for level-banded mark schemes") is therefore not yet true site-wide. That is a founder decision against E051, as the code comment says.
It needs a ruling, not a quiet close.

## Housekeeping

The browser's `rl:` localStorage keys for this page held the builder's test drafts. I cleared them, as I did again between my own runs.
It is dev-browser state only.

## Gate

The gate should not pass. E048 needs the noscript fallback to show the segment notes and the extract below 1024px. E050 needs Table 1 to fit
at 320-364px with the Extract tab open, re-swept with a state that selects that tab.

---

# Re-verification round 1 (packet-verifier, 26 Sep 2026)

Inputs: `ledger.mjs unverified 12.75` (E048, E050, both `not-fixed` from round 0), `git diff`, `git diff --cached`,
the current `components/PracticeShell.jsx` and `components/practice-shell.css`, spec `audit/specs/packet-12.75.md`.
built.md and the fix-round narrative were not read.

## Server

`:3001` is stale: its curl response is byte-for-byte the round 0 page (243,834 bytes). `.ps-note` has no
`data-ps-noscript-show`, and the noscript style has no `data-hidden-sm` rule. That server belongs to another session, so
I left it running. Instead I copied the working tree into the session scratchpad (rsync, skipping `.next`, `.git` and
`audit/runs`; `node_modules` cloned with `cp -c -R`, confirmed to be a real directory and not a symlink) and ran
`next dev --port 3099` there. Its HTML (247,792 bytes) carries both fix-round changes. All the measurements below
come from `:3099`.

## E048 — CONFIRMED

Fix lines:
- `PracticeShell.jsx:291`: `.ps-note` now has `data-ps-noscript-show`.
- `PracticeShell.jsx:798`: the noscript style adds `.ps .ps-pane[data-hidden-sm]{display:flex!important}`.
  - Specificity: `.ps [data-ps-noscript-show][hidden]` is (0,3,0) and beats the shell's
    `.ps [hidden]{display:none!important}` (0,2,0).
  - The noscript rule is `!important` and beats `@media (max-width:1023px) .ps-pane[data-hidden-sm="true"]{display:none}`.

**No-JS test, by a different method from the fix.** The fix round used a CDP script-disabled navigation. I did this
instead:
1. Fetched the page's HTML.
2. Removed every `<script>` and unwrapped every `<noscript>`, which is what a scripting-off parser sees.
3. Wrote the result into a same-origin, script-free document at 390x844.

Result at 390px:

| What was checked | Visible |
|---|---|
| `.ps-note` | 57 of 57 |
| `.ps-seg` | 57 of 57 |
| `.ps-crit` | 171 of 171 |
| `.ps-answer` | 6 of 6 |
| `.ps-examiner` | 6 of 6 |
| Stems (`.ps-qhead`) | 6 of 6 |

- The extract pane is visible (`display: flex`, 2,617 characters of text, no clipping ancestor), and the table fits (322/322).
- The document does not scroll sideways.
- The only elements left hidden are `.ps-box-cell` checkboxes, which have no text.
- A screenshot confirms that stems and the extract render.

**JS-on leak test, fresh origin and storage.** In Practise mode, I stepped through every card in both sets, and for
the Extract set I also opened the Extract tab. Every time, 0 `.ps-answer`, `.ps-note`, `.ps-seg`, `.ps-examiner` and
`.ps-crit` elements were visible.

**JSON-LD, title and canonical.** Hashes of all four ld+json blocks, plus title+canonical, are identical to the
round 0 capture (`served-1.3.5.html`), which round 0 checked against HEAD.

**12.6 drafts.**
- I seeded `rl:attempt:v1:<id>` = `{draft, ticked:[]}` for `mf-extract-define-consumption-externality-2` and
  `negative-externality-tax-8`, both of which exist at HEAD in `data/`, then reloaded. Both drafts came back in
  their textareas.
- The key and the record live in `lib/attempt-storage.js`. `MarkedScriptAttempt` imports the same `storageKey`.
- No console errors, so no hydration mismatch.

**Residual, not in the title (a note, not a reject).** A reader without JS sees the three stems of a set grouped
above the extract, then the three answer blocks below it. The answer blocks are not labelled with their question;
only the tariff ("2 marks" / "6 marks" / "20 marks") ties an answer to its stem. The content is all there, but the
question-to-answer association is weaker than HEAD's.

## E050 — CONFIRMED

Fix lines: `practice-shell.css:178` makes `.ps-table-block` a `ps-table` inline-size container, and `:196-207` stacks
the table rows with in-cell column labels at 420px and below. `.ps-twrap` no longer scrolls: it measures 322/322 at
390px and 252/252 at 320px.

**Independent sweep, by a different method from `text-fit-sweep.js`.**
- `text-fit-sweep.js` renders an iframe with `document.write`. I did not use it.
- I used headless Chrome with CDP `Emulation.setDeviceMetricsOverride`: a real viewport on the real, hydrated page,
  with state driven by clicks. Reduced motion was forced.
- The measure is my own (`verify-r1/fit-cdp.mjs`). It flags:
  - any element with non-visible `overflow-x` whose `scrollWidth` exceeds `clientWidth`;
  - any text-node client rect outside the viewport, or outside its nearest clipping ancestor;
  - any `text-overflow: ellipsis`, `-webkit-line-clamp`, or `…` in the chrome.

**Can the measure fail?** Yes. With the card and table container tiers disabled, every state fails at 320 and 360:
- in the Browser pane: `.ps-twrap` 296>252 and an off-viewport span;
- under CDP: `.ps-card` 123>89 and "· 3 min" cut.

The result is `verify-r1/fit-control.json`.

**Full run.** 320–1920px in 5px steps (321 widths) across 30 states:
- For each of Extract Q1–Q3, six states:
  - writing, work tab;
  - writing, Extract tab;
  - marking with a note and every `<details>` open;
  - marked, Extract tab (focus rows);
  - Model answers with a note and every `<details>` open;
  - Model answers, Extract tab.
- For each of Standalone Q1–Q3, three states: writing, marking with a note and details open, and Model answers
  with a note and details open.
- Three states in light mode with the `rl-night` pin removed.

Every state had **0 failing widths**, across 2,368,736 element checks. The per-state signatures, taken both below and
above 1024, prove each state was engaged:
- the tab is "Extract A" and the extract is visible below 1024 in every Extract-tab state;
- `focusRows` = 1 in the marked and Model answers Extract-tab states;
- `notesOpen` = 1 and `detailsOpen` = 1 where expected;
- the theme reads `light/unpinned` in the three light states.

Output: `verify-r1/fit-full.json`.

**One harness observation.** In the full run, "Standalone Q3 writing" showed `answerVisible` = 1. Three isolated
reruns, plus a manual check in the Browser pane, all showed 0 with the mode set to Practise. The state was set up
by clearing `localStorage` on the live previous page (Model answers mode) and then reloading, so the most likely
cause is my harness racing a storage write. I found no leak path.

## Unclaimed but relevant

- **E053** (open, not claimed). The diff touches it: `lib/mid-band-answer.js` adds `isLevelBanded` and
  `highestTariffItem(items, { levelsOnly })`.
  - `levelsOnly` defaults to `false`, so the other 31 pages still pick panels without the level-banded restriction.
  - As written, the title ("renders only for level-banded mark schemes") is not yet true site-wide.
  - Its status was not changed.

## Gate

Both claimed ids are confirmed and `unverified 12.75` is clear on claims. The packet should still not be recorded
as done until E053 is fixed and claimed, marked wont-fix, or reassigned, as the ledger CLI requires.

---

# Re-verification after walkthrough fix round B1 (packet-verifier, 26 Sep 2026)

Inputs: `ledger.mjs unverified 12.75` (no claimed ids unverified; E053 unclaimed), `git diff`, `git diff --cached`.
The shell files are untracked (`??`), so `git diff` cannot show B1. I diffed them instead against the round-1 copy
this verifier had served on `:3099` (scratchpad `copy/`, mtime 10:14, the version Verify B also walked). built.md
and the fix narrative were not read.

## What B1 changed

Only `components/PracticeShell.jsx` differs. `practice-shell.css`, `lib/practice-shell.js`, `lib/mid-band-answer.js`,
`lib/stimulus.js`, `lib/attempt-storage.js` and `SectionModelAnswersPage.jsx` are byte-identical to the round-1 copy.
- `:543-550` add `toQuestion()`. At 1024px and above it returns. Below that, it scrolls the window so `.ps-qrow` sits
  `--rlh-h` + 8px under the top, and only when the window is already further down (`scrollY > top`).
- `:561` `go()` and `:575-576` `goSet()` queue it through `later()`. `later()` runs in a post-commit `useEffect`, not
  rAF (:467-479). `goSet` now also re-runs `scrollPanesTop` after the commit.
- Every `go`/`goSet` call site is user-initiated (:748-749 dock primary, :777-783 keys, :838 set switch, :854 cards,
  :1055 Previous). Nothing on mount can move the window.
- `.ps-qrow` is not sticky at any width, so its `getBoundingClientRect().top + scrollY` is a real document offset.
  `--rlh-h` is set on `.rl-night` (theme-night.css:156), which the shell sits inside.

Ids whose behaviour this touches are E045 (sticky tabs/dock below 1024, page never scrolling at >=1024) and E046
(navigation). Every other id's lines only shifted by +14. Their evidence line numbers past :535 are now stale by 14,
but their behaviour is unchanged.

## Server

`:3001` is pid 56342, cwd this worktree, started 10:58:20, seven seconds after the 10:58:13 edit. Its SSR has
`ps-tlabel`, which the old stale server lacked, and a client chunk (`_09y6~8~._.js`) carries the new `.ps-qrow` query.
I did not restart it.

## Method, different from the fix's and from Verify B's

Verify B tapped refs in the Browser pane. I used `verify-b1/next-onscreen-cdp.mjs`: headless Chrome over raw CDP, a
fresh profile per run, a real viewport with `mobile:true` below 1024, and reduced motion. Each tap is
`Input.dispatchMouseEvent` at the element's on-screen centre, after an `elementFromPoint` hit test; a covered button
aborts the run. The measure checks, after each tap, that the new question's `.ps-stem`:
- sits below the header;
- is at least 10px above the dock's top;
- and is the element that `elementFromPoint` finds at its centre, so it is not covered.

The setup for each step was a 260-word draft, marked, with every `<details>` open, and the window scrolled until the
shell's bottom met the viewport's bottom. That is where Verify B tapped.

**Control.** The same script with `control` stubs `window.scrollTo` (the fix's only actuator) before each tap. The
first Next then FAILS at every narrow width (`control.json`):
- 390: scrollY 2393→1734, stem at −1375;
- 320: stem at −1866;
- 768: stem at −580;
- 1023: stem at −635;
- Model answers mode at 390: stem at −835.

That matches Verify B's defect, so the measure can fail.

## Result (`fixed.json`)

Widths 390x844, 320x640, 768x1024 and 1023x800 each ran 7 steps; Model answers mode ran at 390. All 29 narrow-width
steps PASS:
- dock Next Q1→Q2 and Q2→Q3 (go);
- "Next: Standalone questions" (goSet);
- dock Previous from a long Standalone Q2 (go);
- a card tap at scrollY 0;
- a set-switch tap at scrollY 40;
- a card tap from the top of Standalone.

Examples: 390, 2393→79 (stem at 280, dock at 758); 320, 14488→98 on the goSet; 768, 5055→53.

The upward-only guard holds. The card and set-switch taps near the top left scrollY at 0→0 and 40→40.

At 1024 and 1440, dock Next leaves the window alone: 0→0, and 300→300 when I had pre-scrolled it. The 300 case shows
the stem under the header, but only because I moved the window myself. The shell is exactly one viewport tall there,
so the document never shrinks. This is the E045 contract ("page never scrolling"). It is not a regression.

Console (`verify-b1/console.json`, 390, fresh profile): 0 errors and 0 uncaught exceptions. Verify B's hydration
mismatch and the "script tag" warning that followed it are gone with the restarted server. That supports Verify B's
stale-SSR reading.

## Verdicts this round

- **E045 re-CONFIRMED.** Below 1024 the dock's Next, Previous, cards and set switch now land the new question on
  screen: PracticeShell.jsx:543-550, :561, :575-576. At 1024 and above it returns at :544, so the window never moves.
- **E046 re-CONFIRMED.** Navigation labels and keys are unchanged; only the post-commit scroll was added. Every
  go/goSet path was exercised at four widths and in both modes.
- E040, E047, E048, E049, E050, E051 and E052 are unchanged by B1; their verdicts stand from rounds 0 and 1.

## Unclaimed but relevant

- **E053** is still open and unclaimed. B1 did not touch `lib/mid-band-answer.js`, and the round-0 finding stands:
  8 non-shell pages still show an AO-split "Where it tops out instead" panel. The packet must not be recorded as done
  until E053 is fixed and claimed, marked wont-fix, or reassigned.

## Gate

Every claimed id is confirmed. The B1 blocking defect cannot recur below 1024px on any go/goSet path. The gate is
still held by E053.
