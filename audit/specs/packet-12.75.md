# Packet 12.75 spec — the practice shell

Written 26 September 2026. Authoritative spec for packet 12.75. The `audit/NEXT.md` block is a
reservation pointer. If they disagree, this file wins and the disagreement is a contradiction to escalate.

**Precondition: packet 12.7 is committed.** Check `git log --oneline -15` for a `packet-12.7` commit
before doing anything. 12.7 adds the extract's own three questions to Economics 1.3.5 and the `segRole`
field; this packet renders them. If 12.7 is not committed, stop and say so.

Read first: `audit/DECISIONS.md` → Settled → every entry dated 2026-09-22, 2026-09-25 and 2026-09-26.

## The approved design

**`audit/specs/packet-12.75-mockup.html`** is the design the founder signed off on 26 September after
seven iterations. It is a working prototype: open it and use it. It is a published Artifact page, so it
has no `<head>`: to view it in the Browser pane, serve a copy with
`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` prepended
(without them it shows `Â·` and lays out at 980px on a phone, which is not a bug in the design).

Build **that**, in the real page. Where this spec and the mockup disagree, this spec wins; where the
mockup shows something this spec does not mention, the mockup is the reference.

What the mockup is, in one paragraph: the extract and the student's work sit side by side. Along the top,
one card per question shows command word, tariff, minutes and state. The question stem is set in DM Sans
with its key term in DM Serif Display italic, underlined. The student writes; "Mark my answer" reveals
the mark scheme as tickable criteria, each worth stated marks, with a live total; "Show in the model
answer" highlights the sentence that earns it and says whether the student earned or missed it; figures
are linked both ways between the model answer and the extract; clicking a figure while writing quotes it
at the cursor. A dock at the bottom holds position, marks banked, a soft timer and a named Next button.
Below 1024px the two panes become two sticky tabs.

## Scope

The shell renders on a model-answer page **if and only if at least one of its written items carries
`criteria`**. After 12.7 that is Economics 1.3.5 alone. The other 31 pages render exactly as they do at
HEAD. Business is untouched.

## AO labels come from the data

Every AO code the shell prints (the chips above the question, the criteria group headings, the labels on
model-answer paragraphs) comes from the item's own `ao` array and each criterion's `band`. **Never infer
or hard-code them.** IAL Appendix 6 makes Define *knowledge and understanding only*
(`audit/raw/econ_spec.txt:2704`, encoded in `lib/ao-spec.js`), so the Define item carries `ao: ["AO1"]`
and its two marks are banded "The definition" and "The extract's example", with no AO split. An earlier
version of the mockup labelled them AO1 and AO2; that was wrong, and packet 12.7's author caught it. The
mockup in this folder is corrected; the data is the authority either way.

## E053 — the "Why this loses marks" panel describes the attempt it shows

Packet 12.7's Verify B (`audit/runs/packet-12.7/verify-b.md`, step 8) found the mid-band panel now sits on
the new extract Evaluate item. `highestTariffItem()` in `lib/mid-band-answer.js` breaks the tie between the
two 20-mark items by paragraph count, and the new one has more. The panel shows the Introduction and "The
case for the tax" (2 of 7 paragraphs), then under "Where it tops out instead" prints the item's
`markScheme` AO3 row verbatim. That row describes the chains *against* the tax, which are all in the
paragraphs the panel says it removed. The mechanism assumes a level-banded mark scheme, where a row names
a level an attempt reaches. On an AO-split scheme (4/4/6/6) a row names what an objective *requires*,
so the reuse is false.

Fix the class, not this instance: the panel must only render for items whose mark scheme is level-banded,
and whatever it prints as the ceiling must be true of the paragraphs it shows. On 1.3.5 that returns the
panel to the item it sat on before 12.7, unless you find that item has the same problem, in which case say
so. In the shell, the panel renders in the work pane after the examiner's note, for the item it applies to.
Add a test in `lib/mid-band-answer.test.mjs` for an AO-split item.

## E052 — the key term (new field, new rule)

Add an optional `keyTerm` string to model-answer items. Validator rule **R8**: when present it must be an
exact substring of `question`. The shell renders the stem in DM Sans with the first occurrence of
`keyTerm` wrapped in `<em>` and set in DM Serif Display italic (already loaded, `ital@0;1`, in
`app/layout.js`), underlined. **`question` itself does not change**, so the Quiz JSON-LD `text` does not
change. Author `keyTerm` for all six 1.3.5 items:

| Item | `keyTerm` |
|---|---|
| Define, 2 (extract) | `negative externality of consumption` |
| Analyse, 6 (extract) | `the AED 0.25 charge on single-use plastic bags` |
| Evaluate, 20 (extract) | `the most effective way` |
| Explain, 4 (generic) | `negative externality` |
| Examine, 8 (generic) | `negative externality of production` |
| Evaluate, 20 (generic) | `always necessary` |

Check each against the item's actual `question` string; 12.7 may have worded the extract stems
differently from this table. The term is what the question hinges on; for Evaluate it is the qualifier.

## E045 — layout

- `components/SectionModelAnswersPage.jsx` stays the server component. On a shell page it renders:
  `SiteHeader`, then **the shell**, then everything that is currently below the question list
  (`CoveragePanel`, the data-response link, the "Now try one yourself" CTA), in that order. The JSON-LD
  blocks stay exactly where and what they are. The `h1` (from `modelAnswersHeading`) moves into the
  shell's top bar as its title, visually small but still the page's only `h1`; the back link becomes
  the breadcrumb beside it. The `lab-header` counts and time note move below the shell.
- There is no Exit button and no `Esc` exit: `SiteHeader` is the way out. Everything else in the
  mockup's top bar stays (the Practise / Model answers switch).
- **Question sets.** Group the page's criteria-bearing items by `stimulus`: items sharing one form a set
  ordered by tariff; items with none form a "Standalone questions" set, rendered with the work pane at
  full width and no extract pane. When a page has more than one set, a segmented control in the question
  row switches between them ("Extract A · 3 questions", "Standalone · 3 questions"). Cards, arrow keys,
  number keys and marks banked all work within the current set. On 1.3.5 the extract set comes first.
- **Desktop (≥1024px):** the shell fills the viewport below `SiteHeader` (measure its height; use a CSS
  variable, not a literal), and the extract and work panes scroll inside themselves with
  `overscroll-behavior: contain`. **The page must never scroll when an in-pane link is used**:
  `scrollIntoView` scrolls every ancestor including a locked frame, so scroll the pane by hand as the
  mockup's `reveal()` does. Below the shell the rest of the page scrolls normally.
- **Below 1024px:** normal page flow; the Extract / Your answer (or Marking, or Model answer) tabs are
  sticky under the top bar, the dock is sticky at the bottom with `env(safe-area-inset-bottom)`, and
  switching tabs starts the other pane at its top.

## E040 — the mode switch (existing id, unchanged meaning)

Practise / Model answers, remembered per page in `localStorage`, changeable at any time without losing a
draft. Model answers mode shows what earns the marks and the model answer for every question, and never
banks or shows a score.

## E046 — navigation (replaces E041)

Question cards with command word, tariff, minutes and state; `aria-current="step"` on the current one
and a full-text `aria-label`. The dock: position, marks banked for the set, a soft timer against the
allocation (never blocks, never auto-submits), Previous, and a primary button that names what it does
("Mark my answer", "Show the model answer" when the draft is empty, "Next: Evaluate · 20 marks").
Keyboard: `←` `→` move, number keys jump, `⌘/Ctrl+↵` marks; all inert while focus is in a text field
except `⌘/Ctrl+↵`. **Minutes come from `item.minutes` if present, else `minutesForMarks()` in
`lib/exam-timing.js`. Never a new formula** (the mockup's 1.3 min/mark is illustrative only).

## E047 — the links

- Every criterion has "Show in the model answer", which always shows (it never toggles off). The
  highlighted sentence carries its note and a text label: "You earned this" when ticked, "You missed
  this — here is how it's earned" when not, and for `segRole: 'missed'` criteria in Model answers mode,
  the missed wording. Distinguishable without colour (label and line style).
- **Figures, derived, not authored.** Add `figuresIn(blocks)` to `lib/stimulus.js`: it finds number-
  bearing tokens in the extract (currency amounts, percentages, signed decimals such as `−1.4`, counts
  with "billion"/"million") and gives each a stable id. The model-answer renderer links any exact
  textual occurrence of a figure's text in a segment. No new field is authored for this. Clicking a
  figure in the model answer scrolls the extract to it and marks it; clicking one in the extract marks
  where the model answer uses it, or says it doesn't. While writing, clicking an extract figure quotes it
  into the answer at the cursor. Unit-test `figuresIn` against the 1.3.5 extract: it must find `AED 0.25`,
  `AED 0.18`, `45%`, `−1.4`, `32%`, `−0.6`, `12.3%`, `USD 25 billion`, and must not find the `2017` or
  `2024` years as figures.
- The relevant table row is highlighted only after the student has marked or chosen to see the answer
  (derive it: rows holding a figure the current script cites). While writing, nothing points at it.

## E048 — nothing leaks, nothing is lost

- **The practice.opening rule applies** (see `lib/content-validator.mjs` and `audit/CONTENT-GATE.md`
  item 6): in Practise mode, before a question is marked or its answer chosen, **no mark-scheme,
  criterion, model-answer or examiner-note text is visible**.
- **But all of it is in the server HTML**, for search and for readers without JavaScript: render every
  panel on the server and hide the answer panels with the `hidden` attribute; add a `<noscript>` style
  that shows them. Prove it by `curl`-ing the page and finding every model answer's text in the HTML,
  and separately by reading the rendered page before marking and finding none of it visible.
- The Quiz and FAQPage JSON-LD, `<title>`, canonical and sitemap entry are byte-identical to HEAD.
- **Drafts written by packet 12.6 survive.** Reuse `MarkedScriptAttempt.jsx`'s `storageKey(questionId)`
  record shape (extend it, never rename it). Read storage in an effect after mount, as 12.6 does: the
  first client render must equal the server render or hydration fails.

## E049 — the look

- **Colour: existing `app/globals.css` tokens only.** Map the mockup's tokens onto the site's:
  `--bg`→`--bg-primary`, `--surface`→`--bg-card`, `--inset`→`--bg-input`, `--hover`→`--bg-card-hover`,
  `--border`→`--border-primary`, `--border-strong`→`--border-hover`, `--text`/`--text-2`/`--text-3`/
  `--muted`→`--text-primary`/`--text-secondary`/`--text-tertiary`/`--text-muted`, accent→`--accent-green`
  family, evidence→`--accent-blue` family, examiner→`--accent-amber` family, soft fills→the existing
  `--green-*` / `--green-light-*` alpha tokens. **Acceptance: the new CSS contains zero hex, `rgb(` or
  `hsl(` literals.** `grep -nE "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(" <new css files>` returns nothing.
- **Theme.** These pages sit inside `.resource-page.rl-night`, which pins them dark in both themes (see
  `components/model-answers-layout.css` around line 220). Keep that: it is how every resource page looks.
  Because the shell uses tokens only, it must also render correctly with the pin removed; check that once
  in light, do not ship it.
- **Type.** DM Sans for everything readable, the stem included; DM Serif Display italic only for the key
  term; DM Mono for tariffs, minutes, AO codes, table figures and the score. All three are already loaded.
- **Contrast, measured on rendered pixels.** `npm run contrast` reads `app/globals.css` only and exited 0
  through a 1.81:1 defect on 21 September. Measure every text/background pair the shell introduces at
  390×844 and 1440×900 and record them in `audit/runs/packet-12.75/contrast.md`. Floor 4.5:1 for text.
- Motion: tick, counter and note transitions as in the mockup, all off under `prefers-reduced-motion`.

## E050 — no text is ever cut, spilled or shortened, at any width

The founder's standard, 26 September: *"make sure this text overflowing never happens. I want a
reliable, trustworthy feel."* This includes `…`: **no ellipsis anywhere in the shell.** Text wraps, or a
layout tier removes a secondary element whole; it is never cut.

- Question cards are CSS containers (`container-type: inline-size`) and choose their content by their
  **own** width, not the viewport's, with the tiers the mockup uses; the card's grid column is
  `minmax(0, 1fr)` so content can never widen it. Copy those rules, do not re-derive them.
- **Acceptance is `audit/scripts/text-fit-sweep.js`**, run in the Browser pane on the dev server, from 320
  to 1920px in 5px steps, in dark (and once in light with the pin removed), with states: each question
  of each set in writing, marking with a note open, and Model answers; plus the Standalone set. Every
  result must be `0`. Record the full output in `audit/runs/packet-12.75/text-fit.json`.
- **Prove the sweep can fail on this page first**: remove the card container tier, run the sweep, record
  that it fails, restore, run again. A check that has never failed here is not evidence.

## E051 — nothing else moved

The other 31 model-answer pages render identically to HEAD: A/B the rendered HTML of at least six of them.
On 1.3.5, everything that was below the question list is still present below the shell. Prove both by a
method different from the one that produced the change.

## Ledger

`node audit/scripts/ledger.mjs packet 12.75`: E040, E045, E046, E047, E048, E049, E050, E051, E052, E053.
E041 is wont-fix, superseded by E046.

## Out of scope

- Retrofitting any other section (packet 12.8). Server-side drafts. Business.
- Making the text-fit sweep run in CI. That needs a headless browser dependency (Playwright), which is a
  founder decision; this packet commits the script and uses it by hand.
- Removing the `rl-night` pin.
- Anything that publishes or writes live database content (Rule 6).

## Notes for the author

- **Check every factual claim in this spec against the code before relying on it.** Three earlier specs
  in this stream were wrong about 1.3.5's content. Line numbers here are hints; re-locate everything.
- The measured traps from building the mockup, so you do not rediscover them: `scrollIntoView` scrolls
  locked ancestors; a `display:grid` card with an implicit `auto` column grows to its content's min-width
  and spills; `[hidden]` loses to any author `display` rule unless you add `[hidden]{display:none!important}`;
  the Browser pane runs as a hidden tab, so smooth scrolls never progress there — force reduced motion to
  test scroll logic; DM Serif Display needs its `ital` axis loaded or the browser fakes the slant.
- **Commit hygiene.** This worktree's git index is shared with other sessions. Stage nothing and commit
  nothing: the founder commits.
