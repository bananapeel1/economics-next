# Packet 12.75 — built

Build phase, 26 September 2026. Nothing staged, nothing committed. HEAD moved during the session
(b1942fe → 21cd9dc: packet-44 and a main merge); none of those commits touched this packet's files except
package.json's test line, and this packet's package.json diff against the new HEAD is only its two
added test files. The gate below ran on a detached scratch worktree at 21cd9dc plus this packet's files
only (node_modules cloned with `cp -c -R`, never a symlink).

## Files

New: `components/PracticeShell.jsx`, `components/practice-shell.css`, `lib/practice-shell.js`,
`lib/practice-shell.test.mjs`, `lib/attempt-storage.js`, `lib/stimulus.test.mjs`.
Modified: `components/SectionModelAnswersPage.jsx`, `components/MarkedScriptAttempt.jsx`, `lib/stimulus.js`,
`lib/mid-band-answer.js`, `lib/mid-band-answer.test.mjs`, `data/modelAnswersData.js`,
`data/modelAnswersExpansion.js`, `audit/scripts/validate-model-answers.mjs`, `audit/scripts/text-fit-sweep.js`,
`package.json` (two test files added to `npm test`).

## Per ledger id

**E040 (claimed) — mode gate.** `components/PracticeShell.jsx:445` mode state, `:63-83` read/write per page
under `rl:practice:v1:<page path>` after mount; switch `:796-803` (`aria-pressed`). Drafts live in a separate
per-question record, so switching never touches them. Model answers mode hides the banked counter and dock
facts (`!study` guards) and cards read "Reading"; nothing is banked from it. Verified in the Browser pane:
switching wrote `{"mode":"answers"}` and a reload at 390 came back in Model answers mode.

**E045 (claimed) — layout.** Scope gate is data, not a section id: `lib/practice-shell.js:26-29`
(`hasShell`), branch at `components/SectionModelAnswersPage.jsx:596`; `ShellPage` `:459` renders
SiteHeader → JSON-LD (unchanged, same position) → shell → `#ps-after` (subtitle, lab-header counts and time
note, CoveragePanel, data-response link, CTA, in that order). h1 is the shell top bar title
(`PracticeShell.jsx` `.ps-title`), back link is the breadcrumb; no Exit, no Esc. Sets by `stimulus`,
extract first, each by tariff: `lib/practice-shell.js:69`; set switch `PracticeShell.jsx:808`; Standalone
renders `ps-panes is-solo` with no extract pane. Desktop height `calc(100dvh - var(--rlh-h))`
(`practice-shell.css:60`; `--rlh-h` is theme-night's own 60px variable), panes `overflow:auto;
overscroll-behavior:contain` (`:163`); `reveal()` scrolls one pane by hand (`PracticeShell.jsx:86`).
Below 1024: tabs sticky at `top: var(--rlh-h)` (`css:305`), dock sticky with safe-area (`css:314`), tab
switch returns the new pane to just under the tabs (`PracticeShell.jsx:684`).
Measured (Browser pane, reduced motion forced because smooth scroll never advances in a hidden tab):
1440x900 — four "Show in the model answer" links, a model-answer figure and three extract figures left
`window.scrollY` at 0 every time while the pane scrolled to the target; 390x844 — tabs stick at 60px,
dock bottom = 844, switching tabs put the work pane top at 116 under the tab bar bottom at 104.
NOTE: the spec calls CoveragePanel "currently below the question list"; at HEAD it sat ABOVE the extract
and the questions. The spec's explicit order was followed.

**E046 (claimed) — navigation.** Cards `PracticeShell.jsx:816-856`: command, tariff, minutes, state;
`aria-current="step"`; full-text `aria-label` (command, marks, minutes, whole question, state).
Minutes: `lib/practice-shell.js:32` — `item.minutes`, else `minutesForMarks()`; no formula of its own.
Dock: position, banked for the set, soft timer (counts only in writing, never blocks/submits, "over time"
in words), Previous, primary naming its action ("Mark my answer", "Show the model answer", "Next:
Evaluate · 20 marks", "Next: Standalone questions", "Finish · n of m banked"). Keys `:733`: ←/→, 1-9
within the set, ⌘/Ctrl+↵ marks; inert in a text field except ⌘/Ctrl+↵, and inert when focus is outside
the shell. Measured: → 1→2, "3" → 3, ← → 2, "9" no-op, → and "1" inside the textarea no-op, ⌘↵ in the
textarea with a draft → marking, → from a link below the shell no-op.

**E047 (claimed) — links.** Criterion "Show in the model answer" always sets (never toggles) the segment
(`PracticeShell.jsx` `showSeg(seg,false)`); label text by view and `segRole` in `segTag` (`:201`): "You
earned this · n marks", "You missed this — here is how it's earned", missed-role variants, and in Model
answers "Missed — this is where it goes"; line style solid vs dashed (`css` `.ps-seg.is-earned/.is-missed`).
Figures: `lib/stimulus.js:144` `figureSpans`, `:173` `withFigures` (stable ids, repeats `-2`,`-3`), `:207`
`figuresIn` (with table row), `:234` `linkFigures` (text between tags only, longest first, either minus
glyph). Extract → answer, answer → extract, "doesn't use that figure" toast, quote-at-cursor while
writing, focus rows only after marking/revealing (`focusRowsFor`, `lib/practice-shell.js:120`). Unit
tests `lib/stimulus.test.mjs` (7) against the real extract.
SPEC CORRECTION: the spec writes the PEDs as `−1.4`/`−0.6` (U+2212). The extract's `## Stimulus` and every
model answer use ASCII `-1.4`/`-0.6`; tests assert the hyphen form, and the linker accepts either glyph.
FOUND AND FIXED WHILE MEASURING: React 19 re-assigns `innerHTML` whenever the `dangerouslySetInnerHTML`
object changes identity, so every render (the timer ticks each second) rebuilt the model-answer markup,
dropped the linked-figure state and detached the node an extract click had just found. Cached `{__html}`
objects (`PracticeShell.jsx:47`). Post-render work (scroll, focus, pulse) runs in an effect queue, not
`requestAnimationFrame`, which never fires in a hidden tab.

**E048 (claimed) — nothing leaks, nothing lost.** Every question's criteria, sentences, notes, examiner's
note and mark scheme are server-rendered inside `hidden` elements (`PracticeShell.jsx:384`), with
`.ps [hidden]{display:none!important}` (`css:71`) and a `<noscript>` style that shows them (`:786`).
- In the HTML: `leak-html-check.mjs` (expected text from `data/`, searched in the served HTML with every
  `<script>` removed): 225/225 strings present on dev (`served-1.3.5.html`) and on the scratch production
  build (`served-prod-1.3.5.html`, prerendered ●); negative control on the demand page: 212 missing.
- Visible: `leak-visible.txt` — 201 probes × every question, 0 visible at 1440x900 and at 390x844 (both
  tabs); positive control after "show the answer" made that item's text visible.
- JSON-LD, `<title>`, canonical and robots/og meta byte-identical to the pre-edit capture on all 32 pages
  (`ab/compare.txt`). Sitemap: `app/sitemap.js` reads only `MODEL_ANSWER_PAGES`, which this packet does not
  touch; the entry is present on the scratch build. Not byte-compared against a HEAD build.
- Drafts: key and record moved to `lib/attempt-storage.js` (same `rl:attempt:v1:` prefix; `{draft,ticked}`
  extended with `phase,time`; writes MERGE). `MarkedScriptAttempt.jsx` imports the same key. Seeded two
  12.6-shaped records: the ticked one opened in marking at "You marked 2 / 4" with its draft; the untouched
  one showed its draft in the box; neither record was rewritten on load. No hydration error in the console.

**E049 (claimed) — the look.** `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" components/practice-shell.css`
→ nothing (exit 1). Token map `css:31-56`; `rl-night` pin kept (the page root keeps
`resource-page rl-night`). DM Sans text, DM Serif Display italic only on `.ps-stem em`, DM Mono for tariffs,
minutes, AO codes, table figures, score. Reduced motion `css:342`. Contrast measured on the rendered DOM
(computed colours, alpha-composited backgrounds, ancestor opacity) — `contrast.md`: 89 pairs at 1440x900,
74 at 390x844, 0 below 4.5:1 (min 4.82). Two defects the measurement found were fixed (4.21 and 1.53).
DEPARTURE FROM THE SPEC'S MAP, by measurement: muted text is `--text-tertiary`, not `--text-muted` (3.13:1
under the pin). Light with the pin removed checked once (one state, 0 below 4.5), not shipped.
Removed from the mockup because the 26 Sep ruling forbids them: `text-overflow: ellipsis` on the
breadcrumb, source line and button labels, and the clamped "Your answer" with a fade.

**E050 (claimed) — nothing cut.** `text-fit.json`. Card container tiers copied from the mockup
(`css:106`, `:128-140`), card column `minmax(0,1fr)`. Sweep changes to `audit/scripts/text-fit-sweep.js`,
both needed to run it on this site at all: (1) `load:'write'` — every route sends `X-Frame-Options: DENY`,
so the framed navigation the script used is refused; (2) async state runs + `settle()` — the first
real-page run passed 5,778 checks that a read-back proved had all measured the initial render (React
applies a click after `click()` returns). A/B on this page: container tier removed → every one of 18
states fails at 31-32 widths (BLEED of card meta, 33px at 320); restored byte-for-byte → 0. FINAL, on the
final code, 320-1920 step 5: dark pinned 5,778 checks 0; light unpinned 5,778 checks 0; 12 extra states
(not started, answer shown without marking) 3,852 checks 0. Each state's page read back at 390 and 1440.

**E051 (claimed) — nothing else moved.** Pre-edit HTML of all 32 pages captured from the dev server before
the first edit (`ab/before/`), post-edit captured on the final code (`ab/after/`); `ab/compare.mjs`
compares the body with non-JSON-LD scripts, links and comments stripped (they differ between two requests
of an unchanged dev page), and title/canonical/JSON-LD/meta separately: 31 of 32 identical in both; 1.3.5
differs in body only (the positive control). 32 pages, not 31 others + unknown: `data/modelAnswerPages.js`
has 32; 30 carry items. `ab/below-shell.mjs` cuts HEAD's subtitle, lab-header, CoveragePanel,
data-response and CTA blocks out of the BEFORE markup by class and finds each block's exact text below
`#ps-after` in the AFTER page: 5/5, in order. The new stylesheet is bundled into the route's CSS chunk for
every model-answer page; every rule is scoped to `.ps`/`.ps-page` and no other page contains either class.

**E052 (claimed) — keyTerm.** Data: `data/modelAnswersData.js:237`, `data/modelAnswersExpansion.js:190, 261,
354, 527, 660` — the spec's six values, each checked as a substring of the live stem first. `question` is
unchanged. R8 `audit/scripts/validate-model-answers.mjs:94-103`, runs on every item. A/B: keyTerm set to
"always needed" → `R8 market-failure-government-intervention-20 keyTerm "always needed" is not an exact
substring of the question`; restored → 0 findings. Rendered first occurrence in `<em>` (`PracticeShell.jsx:879`,
`css` `.ps-stem em`: DM Serif Display italic, 1.1em, underlined).

**E053 (NOT claimed — escalated).** Built for the shell: `isLevelBanded` + `highestTariffItem(items,
{levelsOnly})` `lib/mid-band-answer.js:189-212`; the shell passes it (`SectionModelAnswersPage.jsx:438`) and
renders the panel after the examiner's note (`PracticeShell.jsx` `MidBand`). Tests: 3 new in
`lib/mid-band-answer.test.mjs` (AO-split item never chosen under levelsOnly; falls through to a
level-banded item; the real 1.3.5 bank yields no panel). Result on 1.3.5: NO panel.
Why not claimed, two findings the spec asked to be stated:
1. The spec says the fix "returns the panel to the item it sat on before 12.7". That item,
   `market-failure-government-intervention-20`, is AO-split with the same defect (AO3 row "chains of
   reasoning for and against intervention"; the cut keeps Introduction + Argument 1 only). The only
   level-banded 1.3.5 item, Examine 8, is already suppressed by E028. So 1.3.5 carries no panel.
2. "Fix the class" contradicts E051 and Scope. `midband-census.txt`: 8 non-shell pages render an
   AO-split panel today — Economics 2.3.2, 2.3.5, 2.3.6, 3.3.3, 4.3.2 and Business 1.3.4, 2.3.3, 2.3.5 —
   several with the same "for and against" AO3 ceiling. Applying the rule globally changes those pages
   (E051 forbids) including Business ("Business is untouched"). The default path is left as it was.
   Founder decision needed: apply `levelsOnly` to all 32 pages (one-line change at the default call in
   `SectionModelAnswersPage.jsx`, removing 8 panels), or keep it shell-only until packet 12.8.

## Gate (scratch worktree = 21cd9dc + this packet's files)

`npm test` 331/331 (`gate-test.log`) · `npm run validate` 0 findings (`gate-validate.log`) ·
`npm run exposure` 0 (`gate-exposure.log`) · `npm run recalls` 0, no section worse than baseline
(`gate-recalls.log`) · `npm run build` green, `/economics/[unit]` prerendered ● (`gate-build.log`).
Not run: a Vercel preview build (rule 2 — a green local build is not that evidence). Nothing in this
packet touches Supabase.

## Other things a reader should know

- `audit/NEXT.md`'s 12.75 reservation lists "E040, E045–E052"; the spec, the ledger and NEXT's own 12.7
  entry put E053 in this packet. Treated as a stale pointer, not acted on.
- Not measured: a real phone; widths between 5px steps; `::placeholder` contrast (declared pair 5.07 by
  computation); keyboard at 390; screen-reader output; the no-JavaScript render in a browser with
  scripting off (the `<noscript>` style is in the served HTML; it was not seen rendering).
- The Browser pane runs as a hidden tab: timers throttle, smooth scroll never advances, rAF never fires.
  Scroll checks forced reduced motion; contrast disabled animations; the sweep yields on MessageChannel.
- Every Browser-pane check ran against the dev server another session owns (port 3001), serving this
  shared worktree.

## Fix round 1 — 26 Sep (verifier `verify-a.md` rejected E048 and E050)

Nothing staged, nothing committed. Files touched this round: `components/PracticeShell.jsx`,
`components/practice-shell.css` (both untracked, packet-owned); run files under `fix1/`; `text-fit.json`
(new `fix_round_1` key); `contrast.md` (appended).

WHERE IT WAS MEASURED. The :3001 dev server (another session's) served none of this round's JSX edits
(curl: 0 `ps-tlabel`, notes without the attribute) — the known stale-Turbopack trap. Restarting a server another
session owns was not done, and adding a launch.json entry was refused by the permission system. Instead: a mirror of
this worktree in the scratchpad (rsync without .git/.next/node_modules; node_modules cloned with `cp -c -R`, a
real directory) served by `next dev --port 3017`. `cmp` shows the mirror's `PracticeShell.jsx` and
`practice-shell.css` byte-identical to the worktree's. Every check below ran against :3017 unless it says :3001.

**E048 (re-claimed) — the no-JavaScript fallback.**
- Segment notes: `.ps-note` now carries `data-ps-noscript-show` (`PracticeShell.jsx:291`).
- Extract below 1024px: the `<noscript>` style (`:797`) adds `.ps .ps-pane[data-hidden-sm]{display:flex!important}`
  (and a 16px gap between the stacked panes), so the pane served `data-hidden-sm="true"` shows without JS.
- Rule 4, every other `hidden` / JS-dependent element in the shell re-read: `.ps-box-cell` (tick box, interactive
  only) stays hidden; `.ps-answer`, `.ps-set`, `.ps-qhead`, `.ps-work` already had the attribute; the textarea
  block, tabs, modes, cards, dock and pane heads were already `data-ps-js-only`. Added `data-ps-js-only` to the
  criterion "Show in the model answer" button (`:379`), which does nothing without JS. Left visible: the two
  instruction lines ("Select any underlined figure…", "Select a sentence to see why it scores"), which describe
  JS behaviour but hide no content.
- Measured by a DIFFERENT method from the verifier's sandboxed srcdoc: `fix1/noscript-cdp.mjs` — headless Chrome,
  CDP `Emulation.setScriptExecutionDisabled`, a real navigation to the page (proof scripting was off:
  `<noscript><style>` parsed as an element, no hydration), `checkVisibility()` + a non-zero box per element.
  At 320, 360, 390, 768, 1023, 1024, 1440: notes 57/57 visible, extract pane visible with 6/6 paragraphs and 16/16
  table cells, table 0px sideways, answers 6/6, criteria 57/57, segments 57/57, examiner's notes 6/6, no
  `data-ps-js-only` element visible, page never scrolls sideways (`fix1/noscript-after.json`).
- Control, same probe, :3001 (pre-fix markup): notes 0/57 at every width; extract pane hidden at 320-1023
  (0/16 cells), visible at 1024 and 1440 (`fix1/noscript-control.json`) — reproduces the verifier's finding.
- Nothing leaks with JS on: builder's `leak-visible-check.js`, Practise, storage cleared, every question of both
  sets: 0 leaks at 390x844 and at 1440x900; 0 of 57 notes pass `checkVisibility()`; no console errors.
- Still in the HTML: `leak-html-check.mjs` on the fixed page (`fix1/served-1.3.5-fix1.html`): 225/225 strings.

**E050 (re-claimed) — Table 1 at phone width.**
- Fix: the table block is a CSS container (`practice-shell.css:178`); below 420px of its OWN width
  (`@container ps-table`, `:196`) the table stacks, one block per row, each cell under its column heading.
  The headings are real text (`.ps-tlabel`, `PracticeShell.jsx:173`, from the table's own `head`), display:none
  when the table is not stacked; the hidden `<thead>` holds the same words. Nothing cut, nothing dropped, no
  sideways scroll. 420px is conservative: the four columns need ~300px (verifier: 296px scrollWidth). The pane
  wrapper is 318px at 390 (stacked) and 616px at 1440 (not stacked).
- New states: `fix1/sweep-states.js`, 27 idempotent states that ENFORCE their state at every width (round 0's 18
  plus Extract A Q1-Q3 × {writing, marked with focus row, Model answers} with the Extract tab selected).
- A/B on the same page: stacked tier removed in the mirror (served CSS confirmed without `@container ps-table`)
  → all 9 Extract-tab states FAIL at 320-365, `TABLE hidden 50px` at 320 down to 5px; restored byte-for-byte → 0.
- FINAL on the final code, 320-1920 step 5: dark pinned 27 states 8,667 checks, 0; light unpinned 27 states
  8,667 checks, 0. Engagement read back at 390 and 1440 for every state and theme (108 signatures): set, card,
  mode, phase, tab, extract shown, stacked, 0px sideways, pinned/unpinned all as named (`text-fit.json`
  `fix_round_1`).
- Contrast of the new pairs (390x844 only): the column label on the focus-row fill read 4.19:1; fixed with
  `--ps-text-2` on focus rows (`:207`); after: dark pinned min 4.90, light unpinned min 6.68, 0 below 4.5
  (`contrast.md`).

Not measured this round: `npm test`/`validate`/`build` gate (no data, lib or route file changed; only the two
packet-owned component files); a real phone; the no-JS render in any engine but headless Chrome; widths between
5px steps; the A+/A- text-size control with the Extract tab open (the table's font does not follow it).
Housekeeping: the Browser pane's localStorage on :3017 was cleared between runs; the :3017 mirror server was
stopped at the end of the round.

## Fix round B1 — 26 Sep (walkthrough `verify-b.md` failed the phone Next)

Defect: below 1024px, `go()`/`goSet()` reset only `.ps-pane-body.scrollTop` (desktop panes). Next tapped in the
sticky dock after a long marked answer swapped in a shorter question, the document shrank, the browser clamped
the window to the bottom, and the student was left on the CTA below the shell (verify-b steps 8, 9, 11).

Change (`components/PracticeShell.jsx`, only file edited): new `toQuestion()` next to `go`. Below 1024px only
(`isDesktop()` returns early, the same query as the CSS tier and the mockup's `max-width:1023px`), after the
commit (`later`, not rAF), it brings `.ps-qrow` to header + 8px, and only upwards (`if scrollY > top`), with
`behavior: 'auto'`. `go()` and `goSet()` both queue it; `goSet()` now also queues `scrollPanesTop` after commit as
`go()` already did. The mockup scrolls to 0; the page has the title and switch above the shell, so the question
row is the nearer target. Card taps, ←, and ←/→ keys go through `go()` and get the same fix.

Rule 4 (other window-moving paths in the same component): `switchTab` already returns the window to the tabs;
`mark`/`showAnswer` grow the body (no clamp); `edit` is reached from the top of the marking body; Finish scrolls
to `#ps-after` on purpose; the mode and set switches sit above the question row, so the upward-only guard leaves
them alone. None changed.

Dev server: pid 17726 (started 08:46) killed by port, `.next/cache` removed, restarted via `remediation-dev`
(pid 56342, 10:58). Served HTML (`curl`, saved as `served-b1-1.3.5.html`) now has 16 `ps-tlabel` spans (4 rows x
4 columns, first "Product category"); verify-b's curl found 0. Two post-restart reloads logged no console
errors (no hydration mismatch, no script-tag warning); the one hydration error in the buffer comes before the
restart marker. So the verify-b hydration error was the stale dev server, measured on the dev server only.

Measured at 390x844 in the Browser pane with the tab visible (`document.hidden` false), after clearing storage,
with real clicks on the dock buttons by coordinate:
- Extract A Q1 marked, window at scrollY 999.5 with the dock on screen, Next: Analyse → scrollY 79.5, question row
  68-197px, Q2 stem 279-384px, dock 758-844px, dock "Question 2 of 3". Screenshot shows Q2 and its answer box.
- Q2 marked, scrollY 2393.5, Next: Evaluate → scrollY 79.5, Q3 stem 310-441px, dock on screen.
- Q3 model answer shown, scrollY 8584.5 (document 11,075px), Next: Standalone questions → scrollY 79.5,
  Standalone Q1 stem 279-332px, dock "Question 1 of 3 · Banked 0 / 32".
- Standalone Q2 model answer shown, scrollY 2623.5, ← → scrollY 79.5, Q1 stem 279-332px; the element at the
  viewport centre is inside `.ps` (a check that does not use `.ps-qrow`, the element the fix measures).
- Guard: card 2 tapped at scrollY 0 → scrollY stays 0 (no downward jump).
- Desktop control, 1280x800: window at scrollY 150, card 2 clicked by coordinate → scrollY stays 150.

Not measured this round: the widths between 390 and 1023 (the code path is the same, but none was measured) and
the 1023/1024 boundary; a real phone; smooth-scroll behaviour (the move is instant); `npm test`/`validate`/`build`
and `text-fit-sweep.js` (no CSS, data or text changed; one component function added). Nothing staged.

## Fix round (post founder decision) — 26 Sep: E053 on every model-answer page

Founder, 26 Sep 2026: "Apply everywhere now." This overrides E051's "the other 31 render identically" for exactly
the 8 objectives-scheme panels and nothing else. Code change only: nothing staged, published or written to the
database; there is no `scripts/packet-12.75-*` runner, so no re-stage or `--dump` applies.

**Change.**
- `lib/mid-band-answer.js:229-232` `pagePanelItem(items)`: the unrestricted `highestTariffItem()`, kept only if
  `isLevelBanded()` (`:189`); otherwise null. Doc comment `:216-228`; `highestTariffItem`'s comment `:199-202`
  no longer says the default path is left alone.
- `components/SectionModelAnswersPage.jsx:559-561`: the default (non-shell) path calls `pagePanelItem(written)`
  instead of `highestTariffItem(written)`; import `:37`. The shell call (`:438`) is unchanged.
- **A gate, not the shell's `{ levelsOnly: true }` fall-through, deliberately.** With the fall-through, Economics
  2.3.6 (`macroeconomic-policies`) would GAIN a new panel on `interest-rates-inflation-8` in place of the removed
  `fiscal-vs-monetary-20` one, breaking "the only difference is the 8 removals". Measured, not assumed: the
  fall-through variant is one of the two mutants below. Whether 2.3.6 should instead show that 8-mark panel is
  the founder's call; not taken here.

**Tests** (`lib/mid-band-answer.test.mjs`): `:267` an objectives-split item returns no panel through the default
path; `:273` the default path removes rather than moves (AO-split 20 + levels 8 → null); `:280` real bank, the 8
pages → null and the 11 levels pages → the same item id, lists written from the BEFORE census, not recomputed.
Stale comment at `:235-236` updated. Mutation A/B (`e053/test-mutant-*.txt`): no gate → 2 fail; fall-through →
3 fail; restored → 23/23.

**Census** (`midband-census-after.mjs` → `midband-census-after.txt`): 8 removed (objectives), 11 kept unchanged
(levels: business 1.3.1, 2.3.2; economics 1.3.3, 1.3.6, 2.3.1, 2.3.3, 2.3.4, 4.3.1, 4.3.3, 4.3.4, 4.3.6),
12 no panel before and after, 0 other changes. Same library, so not the independent check; that is the next one.

**HTML A/B, independent of the library** (`e053/compare.mjs` → `e053/compare.txt`). BEFORE = dev server on a
detached worktree at b1942fe (port 3121); AFTER = dev server on a copy of this working tree with the change (port
3122); `node_modules` by `cp -c -R`. All 32 pages curled from each; ab/compare.mjs's normalisation. A DIFF page
passes only if cutting the single `<details class="lab-details lab-details-midband">` from BEFORE's body makes it
byte-equal to AFTER's, head (title/canonical/JSON-LD/meta) equal. Result: of the 31 non-shell pages, 23
identical, 8 differ ONLY by the removed panel (exactly the 8 named), 0 other differences; noise control (AFTER
captured twice) 0 of 32 differ. Comparer A/B (`e053/compare-mutation.txt`): a "!" in a kept panel and a stray
`<p>` on a removed-panel page → both FAIL.

**Re-walk** (`e053/rewalk.txt`, Browser pane, hydrated pages): at 390x844 and 1440x900 the 8 pages have 0 panels
and no "Why this loses marks" / "Where it tops out instead" text; probe control on base shows 1 panel. Three
levels pages (business 1.3.1, economics 2.3.1, 4.3.3): panel present, visible, opened innerText SHA-256 and length
identical to b1942fe's at both widths (cb480e70…/2037, 7b782c8b…/2312, 1067775c…/1788).

**Gate** (this working tree, `e053/gate-*.log`): `check-staged-drafts market-failure` → matches, exit 0;
`npm test` 334/334; `npm run validate` exit 0, 0 new BLOCK (159 new DEBT, content-only, not touched here).
Ledger: `node audit/scripts/ledger.mjs claim 12.75 E053` → claimed. Nothing staged, nothing committed.
