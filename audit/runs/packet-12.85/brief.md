# Packet 12.85 brief — the practice page as the exam paper and the examiner's marked script

Written by the brief phase only. Nothing here is a result: no test, build, or verification claim.
Where a source document asserts a result, it is quoted as a CLAIM, not restated as fact.

## Precondition and reservation, checked live

- `git log --oneline -20` shows `72d5d5b packet-12.8: Economics 1.3.5 in the real IAL paper layout; the
  12.85-12.87 specs` — precondition met, as the spec requires.
- `audit/NEXT.md`'s `## Packet 12.85 spec` block (line 63) is a one-paragraph reservation pointer only,
  consistent with `audit/PROTOCOL.md`'s rule that the authoritative spec is never restated there. It
  points at `audit/specs/packet-12.85.md` and the v8 mockup and nothing else — no contradiction with the
  spec file.
- `audit/PROGRESS.md` has **no row for packet 12.85** (`grep -n "12\.85" audit/PROGRESS.md` — 0 hits).
  Consistent with "not started yet," not a contradiction.
- The newest "## Handoff" entry positionally in `audit/NEXT.md` (end of file, ~line 12823) is "packet 54
  verification round 2" — about the `assessing-competitiveness` content packet, unrelated to 12.85. It
  adds nothing packet-12.85-specific beyond the general shared-worktree/dev-server warnings already in
  the six rules and PROTOCOL.md. The handoff actually relevant to 12.85's precondition is "Handoff —
  packet 12.8 closed (close-out)" (line 12514), read in full; its content is folded into the ledger ids
  and the diagram note below.

## Ledger — read fresh, not from prose

`node audit/scripts/ledger.mjs packet 12.85` and `... packet 12.85 --open` (which now also lists claimed
and not-fixed items) both return the same **9 items, all `status: open`, none claimed, none not-fixed**:

| id | title (verbatim from ledger) | file |
|---|---|---|
| E065 | One header with the Revvy Learn logo linking back to the app at the topic, the paper's outline as a left rail with one total, the question paper and source booklet as two sheets; phone outline button and paper/booklet tabs | `components/PracticeShell.jsx` |
| E066 | The paper's conventions: bold part numbers, marks in brackets, Pearson's instructions and totals, ruled answer space sized to the tariff, a marked answer that grows with its text; DM Sans at three sizes, no monospace, no uppercase labels, student-facing copy | `components/PracticeShell.jsx` |
| E067 | Marking up to 8 marks in Pearson's format (objective headings with marking points, one running mark), 8-mark Examine carrying 2 Evaluation marks, the model answer as an examiner's exemplar with margin objectives, verdict line and comment | `components/PracticeShell.jsx` |
| E068 | 14 and 20-mark Economics items marked by levels (KAA and Evaluation bands from the WEC11 sample mark scheme, in the structure file), validator rule R14 proved by A/B, 1.3.5's Discuss 14 and two essays re-expressed, verdicts read by Verify A as an examiner | `audit/scripts/validate-model-answers.mjs` |
| E069 | Section D essay choice counting only the chosen essay, Draw questions sketched on paper then marked with the model diagram, an honest Section A row linking the topic quiz | `components/PracticeShell.jsx` |
| E070 | Paper by default and dark only by the student's choice on shell pages (rl-night lifted there), colour from globals.css tokens only with zero colour literals, contrast measured on rendered pixels in both themes | `components/practice-shell.css` |
| E071 | On all 32 model-answer pages: coverage panel, spec ids, method notes and counts line removed, the gradient call-to-action replaced by one quiet line, the data-response card removed on shell pages; JSON-LD, title and canonical unchanged | `components/SectionModelAnswersPage.jsx` |
| E072 | No leak before marking, everything in the server HTML with a noscript fallback, drafts kept, text-fit sweep with the bottom-cut check at 0 from 320 to 1920px in every state after first failing, other 31 pages changed only by E071 | `audit/scripts/text-fit-sweep.js` |
| E073 | public/logo.svg reduced from 1.7 MB (two 2000px PNGs in base64) to under 30 KB, identical at the 18-30px sizes it is drawn, so every existing reference loads the light file | `public/logo.svg` |

All nine are `kind: feature`, none is a content id (`C-...`) — **this is not a CONTENT packet** in
PROTOCOL's sense (it authors no new teaching prose; E067/E068 re-express existing model-answer criteria
into a different marking shape, they do not write new answers). Step 3 of this brief's own instructions
("for a CONTENT packet, pull spec-coverage.json's missingItems/thinItems") is read below for completeness
but flagged as likely out of scope for this packet — see "Spec-coverage entry" section.

Files already exist (`components/PracticeShell.jsx` 58,838 bytes, `components/practice-shell.css`
30,950 bytes, `lib/practice-shell.js` 11,975 bytes, `lib/attempt-storage.js` 2,600 bytes, all modified 26
Sep) from packets 12.75/12.8; this packet edits them further, per each ledger id's `file`.

## What "done" means per id, spec requirements quoted from `audit/specs/packet-12.85.md`

**E065 — one header, outline rail, two sheets** (spec § "E065"). Requirements quoted: "One header replaces
both `SiteHeader` and the shell's bar on shell pages... the Revvy Learn logo and name, linking back to the
app at this topic (`/?section=<sectionId>`, or `/` without one)"; "The page's `h1`... stays the only `h1`...
It must not disappear from the DOM"; "The paper's outline as a left rail at ≥981px... One total, in one
place. No other figure on the page may contradict it"; sheets as in the mockup; phones ≤980px get an "All
questions" button and, for a data question, two tabs; `←`/`→` keyboard paging, inert while typing.
Done = every one of these behaviours present and matching the mockup's own structure (verified by reading
the mockup, not copying it — its question content is illustrative only, per the spec's own instruction).

**E066 — the paper's own conventions.** Bold part numbers, marks right-aligned in brackets, Pearson's
section instructions, the data question's "(Total for Question 6 = 34 marks)" closer; ruled answer space
sized 2→4 lines, 4→6, 6→9, 8→12, 14→18, 20→24, growing with text; "a marked answer is a ruled block that
grows with its text, never a fixed-height box" (this is the E072 text-fit failure mode named explicitly —
"The first v8 build sized a read-only textarea by counting line breaks and hid the end of the student's
answer"); DM Sans 16/13/20, DM Serif Display italic for the key term only, no monospace, no uppercase
labels; team-facing copy ("Standalone", storage notices, spec ids) removed. Done = these conventions
present and the text-fit sweep (E072) passing on this page specifically.

**E067 — marking up to 8 marks, Pearson's format.** Objective headings with marks ("Knowledge 2",
"Application 2", "Analysis 2", "Evaluation 2"), one running mark. Two named items:
- `mf-extract-examine-bag-charge-optimum-8` — spec says "12.8 wrote as K2·A2·An2·E2 (check it, change
  nothing if it holds)". **Checked against the code** (`data/modelAnswersExpansion.js:457-`): `criteria`
  is already grouped 2+2+2+2 by AO1 (c1-c2), AO2 (c3-c4), AO3 (c5-c6), AO4 (c7-c8), each AO = 2 marks,
  total 8 — the split holds. What's NOT yet done: the criteria are labelled `band: 'AO1 — knowledge (2
  marks)'` etc, not the Pearson objective-heading wording ("Knowledge 2" / "Application 2" / "Analysis 2" /
  "Evaluation 2") E067 asks for — a presentation/labelling change, not a re-marking.
- `negative-externality-tax-8` (`data/modelAnswersExpansion.js:660-`) — spec says "a four-level ladder
  with no Evaluation split... Re-express the second into K2·A2·An2·E2 marking points from its existing
  answer." **Checked against the code**: confirmed — its `markScheme` is `Level 1-4` (2 marks per level,
  1-2/3-4/5-6/7-8) and its `criteria` are `c1-c8`, one mark each, grouped by level, with `c7`/`c8`
  (Level 4, "brief assessment") both `segRole: 'missed'` (an intentional Level-3 script, per E039/packet
  12.7's comment in the file). Re-expressing into K2·A2·An2·E2 means regrouping the same 8 script segments
  (p1a/p1b=Knowledge, p2a/p2b=Application, p3a/p3b=Analysis, p4a/p4b=Evaluation) under objective headings
  rather than level headings — the segments and the "missed" evaluation marks are the existing content
  the spec says to re-express FROM, not new answer text.
Also: model answer as examiner's exemplar with margin objective letters, verdict line, examiner's comment,
"See it" highlighting distinguishable without colour (12.7's `segRole` work — already built, confirmed
present in the code as `segRole: 'earned'|'missed'` on both items above). Figures linked both ways via
`figuresIn()` (12.75).

**E068 — marking 14 and 20 marks by levels.** New `levels: { strands: [{ strand, indicative }] }` shape;
bands from `audit/raw/ial-paper-structure.json`, extended with descriptors in Revvy's own words (never
Pearson's verbatim) and a source citation; validator rule R14, proved by A/B mutation. **Checked against
the code — `audit/raw/ial-paper-structure.json` currently has NO levels/bands data at all**: it is
structure-only (section/part tariffs, command words, choice), exactly as its own `_about` field says
("Structure only... no question text is reproduced"). Adding the 14/20-mark level bands is new content in
this file, not a re-read — the spec says as much ("Add these bands... to the structure file").
Three items to re-express, all checked against the code:
- 14-mark Discuss (`data/modelAnswersExpansion.js:555-`, id not grepped by this brief but at that line
  range): currently point-marked `criteria` (`k1-k8` "Knowledge, application and analysis (8 marks)",
  `e1-e6` "Evaluation (6 marks)", one mark each) — needs conversion to `levels.strands` with indicative
  content and a verdict.
- `market-failure-government-intervention-20` (`data/modelAnswersExpansion.js:798-`): **markScheme is
  still `AO1 (4) / AO2 (4) / AO3 (6) / AO4 (6)`** — the OLD Revvy split, not the SAM's KAA 12 + Evaluation
  8 that `audit/DECISIONS.md`'s 2026-09-26 "marking follows Pearson's sample mark schemes" entry rules for
  every 20-mark essay. **This is a real gap, not merely a re-expression**: the spec's own instruction
  ("Re-express... from their existing model answers") presumes the existing answer already carries a
  KAA/E-shaped mark scheme to re-express FROM; this one does not. See "Contradictions" below.
- `mf-essay-deposit-protection-moral-hazard-20` (`data/modelAnswersExpansion.js:1220-`): markScheme
  **already** reads "KAA · 12 marks" / "Evaluation · 8 marks" with SAM-worded level descriptors (per
  PROGRESS.md's 12.8 row, this is "the new 20-mark essay" written to the SAM split) — but `criteria` is
  still point-marked (`k1-k12`, `e1-e8`, one mark each), not `levels`. This one is a straightforward
  re-expression: the KAA/E split already holds, only the shape (points → levels/indicative/verdict)
  changes.
`lib/ao-spec.js` ALLOCATION and the live AI marker are explicitly out of scope (packet 12.86) — confirmed
by grep, `lib/ao-spec.js` is not among the ledger's cited files for 12.85.

**E069 — essay choice, Draw, Section A.** Section D shows both essays, dims the unchosen one, counts
only the chosen one in the total; Model answers mode shows both. Draw question: sketch, then mark against
the model diagram. **Checked against the code**: the one Draw item in 1.3.5
(`mf-short-draw-vaccination-welfare-loss-4`, `data/modelAnswersExpansion.js:961-`) already carries a
`diagram: { src: '/diagrams/positive-externality-consumption.svg', ... }` field — this is the SAME file
E082 (packet 12.8) already fixed and both verifiers confirmed geometrically correct; it is NOT one of the
four reserved-for-12.88 off-geometry diagrams. Done here = wiring this existing diagram into the new
sketch-then-mark flow, not fixing any diagram geometry. Section A: outline reads "Six 1-mark questions",
links to `/?section=<id>` (or similar), words must say the quiz is in the topic's Quiz tab and never claim
a deep link lands on it (E056/packet 12.9 has no such deep link).

**E070 — paper by default, dark by choice.** Lift `rl-night` pin on shell pages; colour from existing
`globals.css` tokens only, zero literals (grep-provable). **Checked against the code**
(`components/ThemeProvider.jsx:11-25`): `theme` state defaults to `'dark'`; the effect that writes
`localStorage.setItem('theme', theme)` (line 24) runs on every `[theme, mounted]` change, including the
FIRST mount when no stored value exists and the default `'dark'` was never chosen by the student — this
confirms the spec's own open question ("Find out whether that key is written only by an explicit choice
or on every load... If it cannot tell a choice from the default...") resolves to: **it cannot tell the
two apart**. The practice page must therefore render paper regardless of the ambient `localStorage.theme`
value and switch to dark only through its own on-page control (which the spec says writes the same key).
`--rlh-h` is defined at `styles/theme-night.css:154` (per the 12.8 close-out's own correction — not
undefined as an earlier packet's brief wrongly assumed); E065's one-header work replaces that header, so
re-proving the frame fills the screen with no page scroll is this packet's job, not a re-discovery.

**E071 — machinery removed from all 32 model-answer pages.** Coverage panel, spec ids, "N written
questions · M marks" line, method-notes note, gradient CTA (replaced by one quiet line), data-response
card (removed on shell pages only, kept as a quiet link elsewhere); JSON-LD/title/canonical byte-identical.
`npm run spec-coverage` unaffected (internal report only). **Checked**: `MODEL_ANSWER_PAGES.length` = 32
(confirmed by running `node -e` against `data/modelAnswerPages.js`, matching the spec's "32 model-answer
pages" and PROGRESS.md's 12.3 row "yielding exactly 32 entries"). Route is the shared dynamic route
(`app/economics/[unit]/page.jsx`, `app/business/[unit]/page.jsx`, both delegating to
`lib/model-answers-route.js` and `components/SectionModelAnswersPage.jsx`, per packet 12.3's PROGRESS
note that 22 hand-written shells were collapsed into this one route) — a fix here is one fix, not 32.

**E072 — nothing leaks, nothing cut.** `practice.opening` rule (CONTENT-GATE.md § "the check-in answer
rule" / the per-section checklist item 6) holds: no mark scheme/marking point/level descriptor/indicative
content/model-answer text visible before marking or "see answer", all in server HTML with `<noscript>`
fallback. `lib/attempt-storage.js` keys/record shape extended, never renamed (file confirmed 2,600 bytes,
last touched 26 Sep by 12.75). `audit/scripts/text-fit-sweep.js` (VCLIP check for bottom-cut text) returns
0 from 320-1920px in 5px steps, both themes, across the states the spec lists — shown failing first, both
runs recorded in `audit/runs/packet-12.85/text-fit.json`. Other 31 pages: A/B rendered HTML against HEAD,
every diff must be one of E071's removals only.

**E073 — logo cut from 1.7 MB.** **Checked**: `public/logo.svg` is exactly 1,725,827 bytes (`ls -la`
confirms the spec's own figure to the byte). At least 20 files reference `/logo.svg` directly (SiteHeader,
model-answers hub, business/economics unit pages ×4 each, signup, admin, contact, guides, ial-revision
pages, etc. — confirmed by grep across `app/` and `components/`), all at 18-30px per the spec. Replace
file content only, in place; every reference benefits with no code change. Target <30 KB, visually
identical at 1x/2x, recorded side by side.

## Contradiction / ambiguity found — flagged, not resolved by this brief

**E068's two 20-mark essays are not both "existing model answers" in the shape the spec assumes.**
`mf-essay-deposit-protection-moral-hazard-20` already carries the SAM's KAA-12/Evaluation-8 mark scheme
and can be mechanically re-expressed into `levels`. `market-failure-government-intervention-20` still carries the OLD Revvy AO1(4)/AO2(4)/AO3(6)/
AO4(6) split — the exact split `audit/DECISIONS.md`'s 2026-09-26 "marking follows Pearson's sample mark
schemes" entry says is wrong for a 20-mark essay ("ALLOCATION[20] is 4/4/6/6, and packet 12.7's spec
wrongly repeated it"), and the exact residual PROGRESS.md's own packet-12.8 row names as unresolved:
"the new 20-mark essay follows the SAM's KAA 12 + evaluation 8 while the generic 20-mark essay still uses
Revvy's AO1/2/3/4 split — two schemes live in one section." Packet 12.85's spec instructs re-expressing
this essay's *existing* criteria into `levels` shape "from their existing model answers," but its existing
answer is written to the wrong split (4/4/6/6, not 12/8) — the answer's own paragraphs were composed
against AO1-4, not against KAA/Evaluation. Re-expressing it into `levels` therefore requires either (a)
regrouping the AO1-4 paragraphs into KAA/Evaluation buckets by judgement (a content decision, not a
mechanical re-expression, and one this packet's ledger ids do not explicitly authorise since `lib/ao-spec.js`
and "the retrofit of every other answer" are named out of scope), or (b) treating this essay as a
pre-existing defect this packet inherits and cannot cleanly close under E068's own "from their existing
model answers" instruction. **This is a genuine tension between what E068 asks for and what the cited
"existing model answer" actually contains — not resolved here, flagged for whoever builds.**

This is a scope/content tension internal to the spec and its own prior packet's stated residual, not a
disagreement between PROTOCOL.md, DECISIONS.md, PROGRESS.md and the ledger — those four agree with each
other and with the spec everywhere else checked in this brief. Per the harness instructions, a document
disagreeing with itself in this way is reported, not silently resolved by picking one path.

## Diagrams — checked per the spec's own "Notes for the author" instruction

Grepped every 1.3.5 item's `diagram`/`diagramRef`/`/diagrams/` reference in both data files, not only the
Draw item's:
- Only one diagram reference exists across all 1.3.5 model-answer items:
  `positive-externality-consumption.svg`, on the Draw item (E069) — already fixed and confirmed correct
  by packet 12.8's E082 (both verifiers, two methods). **Not** one of the four reserved-for-12.88 files.
- `content/data-response/econ-u1-market-failure.md`'s "Diagram Reference" section (a data-response-page-only
  section, not a model-answer item) names `negative-externality-consumption.svg` — **this IS one of the
  four files reserved for packet 12.88** (`audit/runs/packet-12.8/diagram-geometry-scan.md`, both dots
  22-54px off). No model-answer item currently embeds it, so nothing in the redesigned shell should
  surface it as a model answer; worth a positive check during the build that the new booklet/figure-link
  wiring (E067's `figuresIn()`) does not incidentally pull it in via the data-response page's own figure
  list, since E065 puts the source booklet beside the question paper and the two pages share the same
  extract.
- `indirect-tax-pigouvian.svg` and `ad-as-long-run.svg` (also reserved for 12.88): 0 hits in either data
  file against 1.3.5 items — not currently referenced by any model answer, no action needed here beyond
  the same "don't surface via the booklet" caution above.

## Spec-coverage entry — read, flagged as likely out of scope

`audit/raw/spec-coverage.json` → `bySection` → `key: "economics__market-failure"`: covered 23, thin 3,
missing 3. `missingItems`: "1b) Source of market failure: speculation and market bubbles", "2e) The impact
of externalities in a financial context", "4c) How imperfect market information leads to misallocation in
pensions". `thinItems`: "3a) Private goods: rival and excludable", "4a) The distinction between symmetric
and asymmetric information.", "4c) ...misallocation in healthcare". **These are teaching-notes gaps** (per
the file's own `headline`), not practice/marking-shape gaps. Packet 12.85 touches the practice shell, the
marking format and the 32 model-answer pages' chrome — it authors no new notes/teaching content, per its
own "Out of scope" section and per every ledger id being `kind: feature` on a component/script file, never
a content file. **Treated as candidates to check, per the brief instructions, and found not to apply to
this packet's scope** — flagged here rather than silently dropped, so a reader can disagree.

## Counts, by running the script (not asserted)

- `node audit/scripts/ledger.mjs packet 12.85` → 9 items.
- `node audit/scripts/ledger.mjs packet 12.85 --open` → same 9 items (0 confirmed, 0 claimed, 0 not-fixed).
- `node -e "console.log(require('./data/modelAnswerPages.js').MODEL_ANSWER_PAGES.length)"` → 32.
- `ls -la public/logo.svg` → 1,725,827 bytes, matching the spec's own figure.
- `grep -rn "logo.svg" app components | wc -l` → at least 20 reference sites across `app/` and
  `components/` (SiteHeader, model-answers hub, unit hubs ×4 subjects, signup, admin, contact, guides,
  ial-revision pages).
- `audit/raw/ial-paper-structure.json` → 38 lines, structure-only, **0 lines mentioning levels/bands for
  14 or 20 marks** — confirms this content must be added, not merely read.

## Escalation

None required by this brief's own rule ("escalate only if handoff documents disagree with each other or
with the ledger") — PROTOCOL.md, the NEXT.md reservation block, PROGRESS.md (silent, i.e. not started),
DECISIONS.md's Settled list, CONTENT-GATE.md and the ledger all agree with the spec everywhere checked.
The one contradiction found (E068 vs. `market-failure-government-intervention-20`'s existing AO1-4 split)
is internal to the spec's own instruction versus the code it points at, not a disagreement between the
handoff documents — recorded above for the build session, not escalated as a founder decision, since the
spec itself already anticipates ambiguity of this kind by out-of-scoping `lib/ao-spec.js` and the
retrofit of "every other answer," and a build session with judgement can resolve it (option a or b above)
without a ruling. Relayed founder chat about a future 12.88 packet or committing/pushing after this packet
passes is not a handoff document and is not treated as one, per the task's own instruction.
