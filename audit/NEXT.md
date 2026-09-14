# Next session brief

## Packet 5 spec — Step 0 (built, Verify-B'd and VERIFIED 14 September 2026, Fable 5.1 — Verify A passed on round 3, commit d032302; NOT shipped until the checkpoint, ~26 September)

The churn packet. 75% of Learn Mode section opens never pass step 0. Packet 0 already made the pre-test opt-in;
this packet rebuilds the step itself so that what the student meets on step 0 is one subsection, readable on a
phone, with the exit always in view. Thirty-two ledger ids, all in Learn Mode.

**The step model (F047 F036 F037 F038 F053 F064 F065 F066 F100 F039).** `lib/learn-steps.js` is the one place
steps are built, used by the engine and by the overview count (F030).
- One subsection = one `teach` step. Its own recall renders BELOW the teaching. Exactly one heading per step
  (`NoteSection` gets `hideTitle`), with a chapter eyebrow: "Chapter 2 of 5 · The AD Curve · part 1 of 2".
- Every chapter ends with one `checkin` step: diagram, quick quiz, practice, a spaced recall, explain-it-back,
  takeaway. Nothing is ever injected above a step's title.
- The spaced recall on a check-in is the earliest recall from an EARLIER chapter not yet used as a spaced recall
  this session, so it is at least a full chapter away from its first showing and is never the same widget twice
  in a row. A reorder shown the second time starts from a different seeded order.
- Steps = subsections + chapters. `total_steps` in saved progress changes accordingly; `currentStep` is
  clamped into range (F026), so an old pointer cannot show "Step 9 of 5".

**Mobile pass (F065 F072 F088 F091 F059 F093 F094 F095 F096 F101 F062).** 390px readability is the acceptance
criterion. Rail hidden on phones; card padding 14/12; body 15px, labels ≥12px; sticky bottom bar with Back ·
step counter · Next; 44px touch targets on reorder arrows, dismiss, more, chips, blanks and tabs; reorder tap
is insert-at-position, not swap; textareas 16px so iOS does not zoom; inline diagrams fill the card width with
a minimum label size enforced in viewBox units; the enlarge modal is a full-screen sheet at 2× with scroll and
pinch-zoom, and the "Tap to enlarge" hint only shows when it would be bigger; the tab strip scrolls the active
tab into view and shows a chevron when more tabs are hidden.

**Interaction (F045 F046 F097 F067).** Next swaps immediately with the enter animation; no 350ms input block.
Keyboard navigation reads refs, is off on the pre-test and completion screens, and ignores keys while focus is
inside a widget. Key Idea is the dominant element; Real Example, Misconception and Exam Matters are demoted to a
compact lens style; the Takeaway is the strongest element on a check-in. A clickable chapter-dot strip replaces
the single decorative node.

**Navigation and resume (F026 F030 F032 F048).** All section navigation goes through one handler that keeps the
current tab when it is a browsing tab (only Home → Overview changes it), updates the URL, and reads the saved
step for the NEW section. The resume banner appears on reload and deep link when the saved step is above 0;
the saved step is the max of server and local. Overview says the same step count the engine will show. The
'content' tab is retired from the menus; "View all content" goes to Notes.

**Writing (F012 F016 F117).** Explain It Back: after typing, free students get "Compare with the key ideas"
(the chapter's key ideas) and a tick-list self-check, the attempt is counted, and the draft is kept per chapter
in localStorage. InlinePractice: an optional answer box in all three modes with a self-mark checklist built
from the "(n marks)" fragments of the guidance, counted on the completion screen as "Written practice";
free students see the model-answer button as a locked Pro control rather than nothing. "(N marks)" is stripped
from the question text at render since the badge already says it.

**Depth signal (F083).** Sections below the Unit 1 template (fewer than 20 quiz questions or 4 chapters) show
their question count on the sidebar row and a "More content coming" note in the section header, from a small
`/api/sections/depth` route, so a Year 13 student is told rather than left to conclude the app skips their year.

**Acceptance script (Verify A).** `npm test` green including `lib/learn-steps.test.mjs`. `npm run build`.
`npm run validate` exit 0 (no content is written). Each of the 32 ids against its `fix` text.

**Verify B — done 14 September, main session, fresh tab, storage cleared, 390×844, signed out.** Overview says
"14 steps"; Learn Mode says "Step 1 of 14". Step 1: eyebrow "CHAPTER 1 OF 5 · The Nature of Economics · part 1 of
2", one h2 and zero duplicate h3, key idea at 16px medium over 15px body, lenses unfilled, its recall below the
teaching, rail hidden, sticky nav with Next inside the viewport without scrolling, step scroll height 2,812px.
All 14 steps walked: 9 teach steps each with one recall below the title; check-in 1 with quiz, explain and
takeaway and no spaced recall; check-ins 2-5 each with exactly one spaced recall from an earlier chapter and the
cue ("RECALL FROM CHAPTER 1 · Economics as a Social Science" on step 6); the two spaced reorders start in a
different order from their first showing. Arrows, dismiss and ⋯ measure 44×44. Diagrams tab → sidebar → Supply:
still on Diagrams, URL and header updated. Reload introductory-concepts → Start learning: "You left off at step 14
of 14" banner; Start over → Step 1. Business assessing-competitiveness header: "More content coming · 10 questions
so far"; sidebar chips on six Unit 3 rows. Console: only the signed-out 401s.

**The script, for the verifier to replay (390×844, storage cleared, signed out).** introductory-concepts → Start learning → Just teach me:
step 1 shows ONE subsection, one heading, a chapter eyebrow, Key Idea visibly dominant, its recall below the
teaching, no recall above the title, and a sticky bar with Next reachable without scrolling to the bottom of
8 screens. Step 2 opens on the title, not on a recall. The first check-in step shows the quiz and takeaway and
no spaced recall (nothing earlier to space). The second chapter's check-in shows a spaced recall with the
"Recall from chapter 1" cue and, if it is a reorder, not in the same order as before. Sidebar → Diagrams tab →
click another section: still on Diagrams. Reload at step 4: resume banner offered. A section with 10 quiz
questions shows "10 q" in the sidebar and the depth note in the header. Reorder arrows, ×, ⋯ are ≥44px.

**Shipping.** Build and verify now; SHIP at the next checkpoint once the funnel baseline (clean since 12 Sep) has
two weeks behind it, per PLAN — otherwise the packet 58 re-measure cannot attribute the change.

**Verify A, round 1 (14 September, commit 8288315): 25 of 32 confirmed; F012 F016 F032 F048 F062 F088 F101 rejected,
all correctly, all fixed the same day.** What the verifier found, and what changed:
- **F012** — the draft was wiped on every mount: the write effect ran with the empty first-render value before
  the read had landed, and removed the stored key. Now the draft is only ever written after the student has
  typed (a `dirty` ref set in `onChange`); the read effect resets it. Reload → Continue → reopen: the draft is
  in the box; step away and back (remount): still there.
- **F016** — the checklist split left the punctuation after the last "(n marks)" as its own item: a "." checkbox
  on 164 of 215 live practice items. Leading and trailing punctuation are stripped and rows with no letters
  are dropped. Census over all 215 items: 1,032 rows, 0 punctuation-only, 0 empty checklists.
- **F032** — the sidebar's "Content Explorer" still opened the orphaned `content` tab. It is "Full notes" and
  opens Notes.
- **F048** — `learnModeSection` was a `useClientValue` that re-read the LOCAL step alone on every section change,
  overriding the max-of-server-and-local the handlers had just chosen: a signed-in student with server progress
  and no local key landed on step 1 with no banner. It is a plain `useState` now with one writer,
  `readSavedStep`, called from the entry effect and every navigation handler; the F027 reconcile still applies a
  later-arriving server step. (Signed-out check only: local key 4 on `supply` → sidebar → Learn: "step 5 of 11".
  The signed-in half is by code reading; the verifier should exercise it if a test account is to hand.)
- **F062 / F088** — the sheet's SVG was 0.9× the viewport: the clone carried `style="width:100%"` from
  `processSvg`, and then a three-part selector at :5962 (`width:100%; max-width:90vw`) outranked the 200vw
  phone rule. The clone drops the inline size, a same-specificity phone rule sets 200vw, and — found while
  fixing it — the sheet's centred flex column had let the pane shrink-wrap to the 2× diagram and sit half
  off-screen with overflow hidden, so the left of every diagram was unreachable. The pane is now the viewport's
  width and scrolls. Measured: 780px sheet vs 313px inline (2.49×), scrollable from "Free Market" to "Command".
  The font floor was 1/28 of the viewBox (17.9 units on a 500 box) and raised 1,419 of 1,420 labels, colliding
  on dense diagrams; it is 1/36 (13.9 units), lifting only labels under 14 units by at most 1.4×.
- **F101** — the lens labels (11px, two-class selector outranking the phone rule), spaced cue, "draft saved",
  "Your answer", sidebar depth chip (10.5px) and header depth (11px) are all 12px; so are the flow-diagram
  numerals and "RESULT" (8px) and the `kbd` glyphs, and the arrow-key hint — meaningless on a phone, and its
  hide rule at :1492 lost to the base rule declared after it — is hidden in the phone block. The ⋯ tab-bar
  chevron and the sheet's close button are 44px. Measured on steps 1, 3, 6 and 14 at 390px: no visible text
  under 12px in the Learn container.

**Round-2 replay additions (390×844, storage cleared, signed out).** Step 3 → Explain it back → type → reload →
Start learning → Continue → reopen: the draft is there. Step 6 → type 15+ chars → Mark my answer: four rows,
none "." and none starting with punctuation. Step 14 → tap the diagram: the sheet's SVG is ~2× the viewport
and scrolls to both edges; close is 44×44. Sidebar → Full notes: Notes tab. Set
`revvy_learnmode_1_supply_section` = 4 → sidebar Supply → Learn: "step 5 of 11".

**Verify A, round 2 (14 September, commit 680c654): F012 F016 F032 F048 F101 confirmed; F062 and F088 rejected,
both correctly, both fixed the same day.** The round-1 defects were gone; each fix had one more thing wrong:
- **F062** — the pane had `touch-action: pinch-zoom`, copied from F088's own fix text. That value permits only
  multi-finger zoom and forbids one-finger panning, and the pane is the scroll container for a diagram now
  wider than the screen: on a real phone the right half of every diagram was unreachable by a drag. It is
  `manipulation` (pan and pinch; only the double-tap delay dropped). Measured `touchAction: manipulation`.
- **F088** — the 1/36 floor still relaid out dense diagrams: 1,281 of 1,377 labels lifted (authored sizes are
  7-13 units), 18 new overlapping pairs on the step-14 diagram that had none, and inline it bought nothing
  (13.9 units at 313px is 8.7px). The floor is gone. The sheet is 220vw instead of 200: with every live
  diagram on a 500-unit box and the smallest authored label 7 units (census over 73 SVGs, 1,390 labels), the
  smallest label in the sheet is 12.0px at 390px, and page pinch-zoom goes further. Measured: no `style`
  font-size on any inline label, 0 overlapping pairs inline and in the sheet, sheet SVG 858px, smallest
  label on step 14 17.2px.
- Also from the verifier's notes: the tab strip now scrolls 44px past its last tab so no label stays under the
  chevron.

**Round-3 replay additions.** Step 14 → tap the diagram: the sheet's SVG is 858px at 390 (2.2×), the pane's
computed `touch-action` is `manipulation`, no label carries an inline `font-size` style, and the label
bounding boxes overlap no more than the authored diagram (0 on this one). Census: `node -e` over every live
`section_diagrams` row — `font-size` minimum 7, viewBox width 500, so 7 × 858 / 500 = 12.0px.

**Verify A, round 3 (14 September, commit d032302): F062 and F088 confirmed; `unverified 5` clear — the gate
passed.** The verifier's census (108 live SVGs, 1,797 labels, every viewBox 500 wide, minimum font-size 7)
measured the smallest label at 12.01px in the settled sheet. Two notes came back, both pre-existing, both
fixed AFTER the gate as one-line CSS changes and checked by measurement only (no fourth verifier round):
- a tapped tab that was only partly visible stayed under the 44px chevron, because `scrollIntoView('nearest')`
  counts it as visible: `scroll-padding-inline-end: 58px` on the phone `.tab-bar`. Measured: tapping the
  half-hidden "Practice" tab slides it to 238-326px, exactly clear of the chevron at 326.
- above 768px the sheet's SVG was 300px, the intrinsic default, because the three-part selector said
  `width: 100%` of a shrink-to-fit sheet: it is `min(80vw, 900px)` there now. Measured 819px at 1024 (was
  300; inline is 270).
The verifier's measurement caveat is worth keeping: with the Browser pane hidden the sheet's scale-in does not
run and rect-based numbers read 0.92×; read computed styles, or front the tab. **Ship at the checkpoint** once
the funnel baseline has two weeks behind it (~26 September), as a PR the founder merges.

**Post-gate, 14 September, found by the founder on localhost: scrolling "forces you back up".** The tab strip's
keep-the-active-tab-visible effect (packet 5, F096) called `scrollIntoView` — which scrolls ancestors
vertically — on EVERY render, because its `tabs` dependency is a fresh array each render and the app re-renders
on every scroll frame for the reading-progress bar. With the sticky header hidden mid-scroll it pulled
`.tab-content` back up by the header's height on each wheel tick. Reproduced by script at 390px: 24 scroll
steps produced 70 scroll events and a 72px jump back after the last. Fixed in `AnimatedTabBar.jsx`: the strip
moves only its own `scrollLeft`, once per tab change, with the chevron clearance read from
`scroll-padding-inline-end`. After: 24 events, no drops, final = max; tapping the half-hidden Practice tab
still slides it to 238-326, clear of the chevron at 326. No verifier round: measured only. A lesson for the
verifier brief: **scroll the page with real input while the app is re-rendering**; the round-1/2/3 walkthroughs
scrolled with `scrollTo` once and never saw it.

## Packet 13 spec — the off-spec strip and dedupe (built 14 September 2026; Verify A rounds 1 and 2 each rejected D010 and D011; pass 3 STAGED as drafts 14 September, publish pending; round 3 after publish)

**What it had to make true.** No framework the IAL specification does not contain is taught or assessed anywhere in
live content. No section teaches a specification bullet another section owns. Nothing this packet removed is still
being tested. Near-duplicate and identical quiz stems within a section are gone (F081).

**What it did.** Read `scripts/_packet13-plan.mjs`, `_packet13-residual-plan.mjs` and `_packet13-dedupe-plan.mjs`:
each op carries the evidence for itself. Five blocks removed across four sections; the specification's vocabulary
replaces the GCE labels in 13 sections; two of three cross-section duplications resolved and the third written up
as a manifest in `audit/SPEC-OWNERSHIP.md`; 19 duplicate stems rewritten to test a different angle.

**Acceptance script (Verify A).** Read-only. `npm test` green (105 with packet 5's suite registered). `npm run
validate` exit 0. `npm run build` green. `node audit/scripts/packet-13-census.mjs` exits 0 with every banned term
at 0 hits and D012 clear, and `--self-test` passes; its D011 block must report the multiplier under its own heading
in aggregate-demand and nothing else anywhere. Both `--check` builders pass. Then the five claimed ids. The baseline
must be SMALLER than at packet 3: 2,489 -> 2,187 keys, BLOCK 1,131 -> 902, `terms.off-spec` 19 -> 0,
`quiz.near-dup` 36 -> 17.

**Verify A, round 1 (14 September): F081, D009, D012 confirmed; D010 and D011 rejected, both correctly.**
- D010: the vocabulary swap was complete but eight sentences came out damaged — a tautology ("welfare loss or
  welfare loss"), an ungrammatical phrase, a circular model answer, a repeated word, and a claim widened past its
  truth ("goods with external benefits are excludable and rivalrous"). Each is patched by hand in
  `scripts/_packet13-polish-plan.mjs`; the runner now refuses to stage while any phrase a plan says must be gone
  survives. The same pass fixed two market-failure quiz pins the rewrites had made wrong and the sentence that
  still listed monopoly power as a type of market failure. Published; the verifier's sentence diff is the check.
- D011: the census's ownership check was dead code (its path test could never be true), and the map's own
  multiplier row says "not resolved". The predicate is fixed with a `--self-test`, the census now reports the
  multiplier under its own heading in aggregate-demand, D011 is narrowed to the six resolved rows, and the
  seventh is D013 on packet 37 with the manifest in `audit/SPEC-OWNERSHIP.md`.
- New, not in this packet's scope: the public revision pages, the tutor prompt and the model-answer data still
  carry 45 mentions of the removed material across eight files. Minted as D014 on packet 57 (cross-surface
  consistency) with the file list; some of those mentions are correct explanations of the IAL vocabulary, so it
  is a reading pass, not a substitution.
- Two 390px nits on the rewritten fill-in (words breaking inside chips) are fixed in the stylesheet.

**Verify A, round 2 (14 September, commit a91265f): D010 and D011 rejected again, both correctly.** Round 1's eight
sentences were closed; the same read found the same classes still live. Pass 3 (`scripts/_packet13-pass3-plan.mjs`,
`--plan pass3`) answers each, one rule per sentence, and is **staged as drafts but NOT published**: the publish
step was refused by this session's permission classifier as a production deploy. To publish, from the worktree:
`node scripts/publish-section.mjs government-intervention --confirm` and the same for `market-failure`,
`role-state-macroeconomy`, `market-structures-contestability`, `trade-global-economy` (each prints its dry-run
diff without `--confirm`; a backup is taken automatically). Then `node audit/scripts/packet-13-census.mjs` (DWL
is banned now), `npm run validate`, `node audit/scripts/validate-content.mjs --baseline --confirm` if it reports
re-keyed debt, claim D010 D011 and launch round 3.
- **D010, class 1 — swap artefacts:** "access to public and goods with external benefits" (government-intervention
  takeaway), "the argument for goods with external benefits and external costs" (market-failure note), "goods with
  external benefits or goods with positive externalities" (government-intervention note), and "Marks follow you
  for" ×4 (the rule swapped "Examiners reward" and left "you for"). Each rewritten by hand.
- **D010, class 2 — the over-reach:** role-state-macroeconomy's whole subsection "External Benefits and
  Redistribution" (key idea, first paragraph, flow step, exam tip, real example, two takeaways) and its notes
  entry (key idea, both definitions, the regulation line, takeaway, exam tip) DEFINED goods with external benefits
  by information failure, and market-failure's chain "Information failure leads to misallocation" did the same.
  Every sentence now says the 1.3.5.2c-d thing — the buyer ignores the benefit to third parties — and, where it
  mentions information, says it is a separate source (1.3.5.4b) that widens the gap.
- **D010, class 3 — six SVG labels reading "DWL"** (government-intervention max and min price, monopoly
  equilibrium, tariff, quota, tax incidence). The census's `\bdeadweight\b` could not see the abbreviation; it
  bans `\bDWL\b` now. Each label is re-placed by hand from the diagram's geometry (`scripts/_p13-geom.mjs`:
  curves, dashed lines, neighbouring text), because "Welfare loss" is five times wider than "DWL" and the
  triangles are 30-40 units across: "Welfare loss" just outside its triangle in the clear space the curves leave
  (max price, min price, monopoly), "Loss (b)" / "Loss (d)" under the dashed quantity lines with leaders on the
  tariff and quota diagrams (whose key already reads "Net welfare loss = b+d"), and "Welfare loss" below the
  demand curve with a leader on tax incidence. `scripts/_p13-draft-svgs.mjs <out.html>` renders the six DRAFT
  diagrams to one page for the eye; the verifier should look at them at 390px after publish.
- **D011 — monopoly taught below heading level in market-failure:** the "Diagrams for Welfare Loss" paragraph,
  its exam tip ("monopoly diagrams"), its real example (Harberger) and recall line ("Monopoly: output restricted
  below ___ level"), the "Measuring Welfare Loss" sentence listing "a monopolist restricting output", the
  "Allocative Inefficiency" real example (Shkreli), and a quiz distractor. Each replaced with the Unit 1 case
  the specification does put there: an intervention that overshoots (1.3.6.2a, government failure as a net
  welfare loss) and the uncorrected externality (Stern Review; the World Bank/IHME air-pollution estimate).
  `SPEC-OWNERSHIP.md`'s monopoly row now says what "Done" means: body text too. Its multiplier manifest gains
  the notes entry the verifier spotted (`aggregate-demand` `notes[3]`).
- The verifier's D014 note (the public `app/economics/market-failure/page.js` FAQ contradicts itself on the
  same vocabulary) is added to D014's ledger note for packet 57.

**Round-3 replay (after publish).** `node audit/scripts/packet-13-census.mjs` exit 0 with DWL at 0. Snapshot-vs-live
diff over the five sections: every changed string named by a pass-3 rule. Read role-state-macroeconomy
"External Benefits and Redistribution" end to end: no sentence defines the class by information failure. Read
market-failure block 5 end to end: no monopoly teaching; the recall's third line is the tax-above-external-cost
case. Diagrams tab at 390px for the six relabelled diagrams: the label reads "Welfare loss" or "Loss (b)/(d)",
sits clear of curves and other labels, and the leader (where there is one) ends at its triangle.

**Verify B.** *Done 14 September, main session, fresh tab, storage cleared.* market-failure Learn Mode is 5 blocks
(was 7), with no "Merit Goods & Demerit Goods" and no "Market Power as Market Failure"; the block that was "Welfare
Loss & Deadweight Loss" reads "Welfare Loss"; the words "merit good" and "deadweight" appear nowhere on the page.
Step 2 of 6 holds the rewritten fill-in: chips MC / underproduces / welfare, placed in order, blanks read
"P = MC", "over- or underproduces", "the surplus that is lost is called welfare loss", "✓ All correct!", 3 correct
blanks and 0 wrong. aggregate-demand is 4 blocks with no accelerator. assessing-competitiveness is 1 block with no
VRIO, competencies, scorecard or five forces. Console: only the signed-out 401.

**Known limits, stated so nobody is surprised.**
- **assessing-competitiveness (business 3.3.5) is now one block.** Its second block taught VRIO and core
  competencies, which the specification does not contain; what 3.3.5 does contain — financial statements, the HR
  metrics and the four HR strategies — was never written. The section is thin and honest rather than fuller and
  wrong. Packet 54 fills it, and `spec.uncovered` now names the two HR-strategy leaves it is missing.
- **The multiplier duplication is not resolved.** See the manifest in `audit/SPEC-OWNERSHIP.md`; it belongs to
  packets 32 and 37 together.
- **`external-influences` (business 2.3.5) still refers to Porter's five forces** inside a subsection on
  competitive pressure. That is a reference, not a second treatment, and its own packet decides.
- **Twenty-five near-duplicate pairs were deliberately left.** They share a stem frame and test different things.
  `quiz.near-dup` still reports them, which is the honest state of a lexical rule.

## Handoff — what comes next

Packet 13 was the last packet before the content stage proper. The order from here is 13.1-13.8 (the quant drills,
blocked behind packets 5 and 7), 13.9-13.12 (exam practice), then 14, the first content section, on Fable.

Three things a content session must know, in addition to packet 3's two:
1. **Write through `stageSection`, publish with `scripts/publish-section.mjs`.** Both read the row back and
   validate it. `scripts/_content-ops.mjs` is there for declarative surgery: it deletes by id and renumbers
   `quizIndices` / `practiceIndices` for you, which is the thing that is easy to get silently wrong.
2. **Run the per-section checklist in `CONTENT-GATE.md` between staging and publishing**, and re-run
   `node audit/scripts/validate-content.mjs --baseline --confirm` at the end so the baseline shrinks by your work.
3. **Touching a sentence means owning its findings.** Budget for it: this packet's second-order fixes were about a
   third of its edits, and they are why the baseline moved.

## Packet 3 spec — Validator v2 and golden set (built 14 September 2026)

**What it must make true.** No content reaches `data` without `lib/content-validator.mjs` having run over the
whole section; a push with a BLOCK finding outside the committed baseline is refused; the two reference assets
are generated from the specification text and cited per row; every rule has a failing fixture; the gate is
`npm run validate` and `npm test`, both green.

**Acceptance script (Verify A).** Read-only. `npm test` 95/95. `npm run validate` exit 0. `npm run build` green.
`node audit/scripts/build-tariff-census.mjs --check` and `build-spec-items.mjs --check` pass. In a node
one-liner, `supabase.from('section_quiz').update({ data: [] })` from `scripts/_db.mjs` throws synchronously
and `.update({ draft: [] })` returns a builder (do not execute it). A fill-in recall with duplicate answers
(consumer-behaviour-demand, "utility" ×2) can be completed in the browser. Then the six claimed ids.

**Verify B.** Only the FillInRecall change is student-facing: place both "utility" chips, confirm Check enables.
*Done 14 September, main session, fresh tab, storage cleared:* consumer-behaviour-demand → Start learning → Just
teach me → step 2 (the spaced recall; `LearnModeTab.jsx` shows the first subsection's recall per step) holds the
recall with chips "diminishes", "utility", "utility" rendered as three buttons.
Tapped utility → utility → diminishes: blanks filled utility / utility / diminishes, bank emptied, Check enabled,
"✓ All correct!" with 3 correct blanks and 0 wrong. Console: only the signed-out 401. Under the previous renderer
the second "utility" tap had no chip to find.

**Known limits, stated so nobody is surprised.** Reorder rules are lexical (51 of 66 bad recalls caught, 15 are
semantic). Layer 3 is a lexical floor (81% mean vs the reading audit's 62%). Twenty-five questions decline to
shuffle over bare "(A)" letters until their explanations say "Option A". `quiz.histogram` is DEBT: a new bank
that is 64% B is reported, not refused. `quiz.explanation-option` fires only when an explanation quotes a
distractor word for word and shares no word with the answer; paraphrase is not judged. `locale.uk` is a ratio,
so it cannot say whether the international example chosen is relevant — the checklist does. The baseline holds
2,489 keys (1,131 BLOCK, 1,358 DEBT) and is the content stage's to-do list, section by section.

**Verify A, round 1 (14 September) rejected F073, F110 and F116; all three were fixed the same day.**
- F073: the widened subtitle split had taken "Float = LFT - EST - duration" apart and the italic regex had
  eaten "P*"/"Q*". The split is em dash only again, in `lib/flow-step.js` with its own tests; the italic
  regex applies CommonMark flanking (an opener cannot follow a word character); 6 live strings change, all
  star notation; the object form is documented in the template header and CONTENT-GATE.
- F110: the write path was open at the admin PUT, the diagrams route, ten seed/one-off scripts with their own
  clients, `schema().from()`/`rest.from()`, and `stageSection` reported success on a row it had not written.
  All closed: `lib/content-gate.mjs` runs in the two routes (422 with findings), every script imports the
  guarded client, the proxy covers all three `from`s, staging counts updated rows and reads back, publish and
  restore read back, `lib/write-path.test.mjs` scans for any new writer. The two skipped rules exist
  (`quiz.explanation-option`, `depth.notes-titles`). Keys carry an item fingerprint so a rewritten item cannot
  hide behind a baselined key; the baseline was rewritten (+1,847 −1,597; only the three intended rules moved).
- F116: the checklist is in CONTENT-GATE.md ("The per-section edit pass"), pointed to from PROTOCOL and the
  template; `locale.uk` is now a ratio against international mentions, so a section framed only on the UK fails
  at one mention, and `locale.institution` is per sentence.
- Also from the verifier's census: 20 spec-items rows had a word cut at the letter column; the parser now
  keeps a full-width line whole, `npm test` runs the census over all 1,319 rows (0 missing tokens, counts
  unchanged), and the two tariff rows that carried page-footer text no longer do.
`npm test` is 95/95.

**Verify A, round 2 (14 September, commit 507e09b): F073, F110 and F116 confirmed; `unverified 3` clear.** The
verifier re-measured the italic change itself (6 strings differ, all star notation; 41 real emphasis runs
unchanged), re-keyed a live essay stem and watched its key change while a rotated quiz array changed none,
built its own UK-only and UK-among-others fixtures, and re-ran the spec-items census (0 missing). Its remaining
notes, all acted on the same day or written down: `.delete()` on a content table is now refused by the guard
and scanned for by the write-path test; `schema().rest` no longer throws from the proxy; the diagrams route
reads back after both writes. Not fixable at the client and recorded in CONTENT-GATE ("What this still will
not catch"): `rpc()` passes the proxy, so a SQL-executing function in the database would be a bypass no client
guard can police (`seed/setup-pdfs.mjs` calls one named `exec_sql`; it does not exist in this project's
database, and must not be created). The baseline's fingerprints match live rows, not any snapshot, so it can
only be regenerated against the database.

## Handoff — what comes next

Packet 3 is the last code packet before content. With it in place the order is 13 (off-spec strip, now
measurable: `terms.off-spec` and `terms.later-unit` list every instance), 13.1-13.8 (drills), 13.9-13.12
(exam practice, which hands the validator its `specItems` contract), then 14 (the template section on Fable).
Every content session starts with `npm run validate --section <id>` and ends with the section's baseline
smaller than it found it.

Two things a content session must know: a finding key is `section | rule | where | fingerprint`, and the
fingerprint hashes the item itself, so rewriting an item (even with the same id) retires its old keys and any
finding on the rewritten item is a real regression, not noise — which also means touching an item that carries
a baselined BLOCK obliges you to clear that BLOCK; and `spec.uncovered` for a section lists exactly which leaves
it is expected to teach, with the spec line to read.

## Two corrections worth carrying forward

- **Packet 2 is done except F052, F109 and F115.** Diagram blocks still pin by ref: 0 of 39 carry a
  `diagramId`. Measured against live content: of 170 chapters, 15 get a diagram by pin and 36 by the packet 2
  title fallback, so 51 render one. The 119 with none are dominated by the 20 Business sections that hold
  zero diagrams at all, which is a content gap, not a pinning bug. The fix here is writing `diagramId` onto
  the 39 blocks that carry a ref.
- **The gate now reports unclaimed scope.** `ledger.mjs unverified <n>` used to check only claimed items, so
  a packet could pass by claiming less than its scope. Do not record a packet done while its scope is open.


---

## Handed over from another session, 12 Sep 2026 — specification coverage audit

**Not a packet. Nothing actioned. Read before costing the Content stage.**

`audit/SPEC-COVERAGE.md` (narrative) and `audit/raw/spec-coverage.json` (per-topic data) were produced in
the worksheets/AO-profile session by checking all 43 live sections requirement-by-requirement against the
verbatim spec in `audit/raw/econ_spec.txt` / `bus_spec.txt` — the same source packet 9 built
`lib/ial-marking.js` from.

Three things that bear on this plan:

1. ~~**Scope reconciliation needed.**~~ **Done 13 September.** Matched section by section against the
   ledger: 156 of the 175 MISSING and 166 of the 237 THIN were already described by an existing ledger
   item. **Net new scope is 90 items, not 412** — 19 gaps and 71 thin — which is about two per section and
   fits inside the existing per-session budget. The Content stage does not grow by twenty sessions. All 90
   are in the ledger; see the reconciliation table in `PLAN.md`.

   Two by-products, both bigger than the counts: **154 ledger items cite UK GCE spec numbers that do not
   exist in the IAL spec** (every real IAL topic number has 3 as its middle digit), now annotated with the
   correct topic for their section; and **17 requirements across 12 sections are quizzed but never taught**
   (`audit/raw/assessed-not-taught-2026-09-13.json`), which is the cheapest work in the whole Content stage.

2. **The diagnosis, which reframes the Content stage.** The notes read as adapted from UK GCE A-level
   rather than built from the IAL spec. Business 3.3.5 teaches VRIO, Porter's Five Forces, the balanced
   scorecard and the triple bottom line — none in IAL 3.3.5 — while the spec's own content (financial
   statements, acid test, labour turnover/retention/absenteeism, four HR strategies) is absent. AS is 73%
   taught, A2 49%; Business Unit 4 is 40%. Treat any A2 topic as inherited-until-checked. This is the
   inverse of packet 13's off-spec strip and belongs in the same pass.

3. **Per-section work lists already exist.** Each Content packet's "spec gaps" step can start from that
   section's `missingItems` / `thinItems` in the JSON instead of re-deriving them. Every MISSING was
   attacked by a second agent trying to overturn it; 23 of 197 were overturned and downgraded, so expect
   a residual error rate and spot-check before writing to a gap.

Measured across all 43 sections on 13 September, this is 17 requirements in 12 sections — the list is in
`audit/raw/assessed-not-taught-2026-09-13.json`. The original estimate named seven topics that quiz
students on content the notes never teach (HR half of Business
3.3.5, contingency planning in 3.3.6, PESTLE/Porter's five forces in 3.3.1, stakeholder distinction in
3.3.4, profit satisficing and cost efficiency in 1.3.5, specific vs ad valorem in Economics 1.3.3, FDI in
Economics 2.3.5). Wording already exists in the flashcards/quizzes; it just isn't taught.
