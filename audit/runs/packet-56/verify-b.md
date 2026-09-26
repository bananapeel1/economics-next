# Packet 56: Verify B, student walkthrough (`business__global-industries-mncs`)

Walked 26 Sep 2026, about 14:20 to 15:00 EEST, against `remediation-dev` on :3001 (an already-running server
started 13:43 by another session, reused and not restarted). The route was
`/business/unit-4/global-industries-mncs?draft=1`, which serves the staged draft. The CSS viewport was
390x844 (`innerWidth` 390 at every check), in light scheme emulation. The app renders dark by default. I
cleared storage before the first load and gave input with real taps through the pane (refs or coordinates),
never `element.click()`. Every pixel figure below was measured at 390px.

No acceptance script came with the task, so I built the script from the brief's "done means" lines and from
the two failure classes named in the task. I read what the student sees and did not read `built.md`.

## Steps

- step 1: I tapped "Start learning" on the section page. It showed a "Want a quick check first?" card, then "STEP 1 OF 21 · CHAPTER 1 OF 4 MNCs and the Local Economy · part 1 of 4, MNCs, Subsidiaries and FDI". The sticky "Next →" was on the first screen at y=790 while the step is 2,086px tall. — PASS: the first step renders with a reachable Next.
- step 1 recall (fill in the blanks, 3 blanks, 5 words): host / subsidiary / foreign direct investment gave "✓ All correct!" — PASS: the recall has a defensible answer and a button.
- step 2 (Local Labour, Wages and Working Conditions): the sort had 6 items in 2 groups. Tapping an item and then the group name placed it. "✓ All correct!" — PASS.
- step 3 (Local Businesses: Suppliers and Rivals): the match had 4 pairs, all correct. The page named "crowding out" — PASS.
- step 4 (The Local Community and Environment): I tapped Skip on the sort and got "Skipped. This check comes back at the next chapter check-in." — PASS (see step 11 for where it actually came back).
- step 5 (Chapter 1 check-in): only the question showed (3% shareholding, not FDI), with "Answer the question first…" and a "Skip the question" button. I answered A and got "Correct!" with an explanation. Then the diagram, worked example (Source A, 4 marks), answer box with "Mark my answer", and takeaway appeared. — PASS: question-first flow.
- step 5: check-in answer — clean. The checklist ($300 vs $240, attract and keep workers, hours and safety, routine jobs) does not state why 3% is not FDI.
- step 5 diagram: "Pay at an MNC Factory Against Local Work". Inline, the smallest label is 9.4px at 390px, with no overlap and no clipping. I opened it with a real tap on the diagram. The sheet had the `lm-diagram-modal-visible` class and `matrix(1,0,0,1,0,0)`. The svg rect width was 400 and the computed width 400px, and the smallest label was 12.0px at 390px. — PASS under the settled no-font-floor ruling (DECISIONS 2026-09-14).
- step 5 worked example: I typed an answer and tapped "Mark my answer". It opened a self-mark list reading "0 of 4 marks claimed", but it has 5 checkboxes. Row 1 glues the guidance paragraph ("Decide which kind of local firm…") onto the Knowledge mark. Row 5 is an examiner note ("An answer that gives both a gain and a loss…"); ticking it adds 0 marks. — PASS with a note: the text box has a button. The row layout is odd.
- step 6 (Economic Growth and FDI Flows, chapter 2): the reorder prompt names its principle: "Put these in cause-to-effect order, from an MNC's investment to the extra tax…". I used the ▲ arrows twice and got "✓ Perfect order!" — PASS: brief topFix-03 wants the principle named.
- resume 1: I reloaded the page. Storage held `{"v":"21.kotaf7","s":5}`. I tapped "Start learning" and got "STEP 6 OF 21" with the full body. — PASS. The overview card still said "Start learning →" and not a continue label.
- resume 2 (stale pointer from an older version): I set `{"v":"9.abc123","s":8}` and reloaded. It showed "STEP 1 OF 21" with the full body, and the pointer was rewritten to `s:0`. — PASS, no "step N of 9".
- resume 3 (out of range): I set `{"v":"21.kotaf7","s":25}`. It showed "STEP 21 OF 21" with the full body (the Controlling MNCs check-in), and the pointer was clamped to `s:20`. — PASS, no "step 20 of 9" with a blank body.
- step 7 (The Balance of Payments): exports $200m, imports $80m and $30m of profit sent home give "a net $90m". The text says repatriated profit "does not by itself show that the host loses overall", and a misconception box corrects the net-loser reasoning. The old "host country a net loser" sentence is not in the Learn flow. — PASS for accuracy-01, topFix-05 (part) and specGap-05.
- step 8 (Technology, Skills and Business Culture): business culture is defined and taught, and the sort separates it from tech transfer. — PASS for specGap-06.
- step 9 (Consumers in the Host Country): the step opens with "consumers in the host country, not in the MNC's home market". — PASS for specGap-07.
- step 10 (Tax Revenues and Transfer Pricing): one transfer-pricing teaching pass: cost $20, sold at $22, arm's length $30, $2.5m instead of $12.5m. The arithmetic checks out, and "arm's length" is defined on first use. — PASS for topFix-02 and structure-03. I saw no second transfer-pricing pass in the 21 steps.
- step 11 (Chapter 2 check-in): the question came first. I answered A ($28m) and got "Correct!". Then the diagram, guided practice (4 marks, BoP) and "RECALL FROM CHAPTER 1: The Local Community and Environment" (the sort I skipped at step 4) appeared. — PASS. The skipped recall came back one check-in later than the skip message said: it did not appear at the step 5 check-in.
- step 11: check-in answer — clean. The transfer-pricing checklist does not give the BoP net figure.
- step 11 guided practice: the header says "The opening is given; write the rest". The text above the box is an instruction ("Sort the flows in the source… Then pick one impact…"), not an answer opening. The mark points sit behind "See full guidance ▼", so there is no mark-scheme leak above the box. — PASS with a note.
- step 12 (Stakeholder Conflicts, chapter 3): ethics framed as a conflict between stakeholders, with a 4-pair match. — PASS for specGap-04.
- step 13 (Environmental Considerations): it defines emissions, waste disposal and sustainability, with $6m of cleaner equipment. The sort has 3 groups of 2. — PASS for specThin-01 and the sustainability gap in brief §5.
- step 14 (Supply Chain Considerations): it covers pay and conditions, exploitation, child labour (children found at 3 of 40 suppliers) and audit methods. — PASS for specGap-03. The real example is generic (factory fires and collapses), and Rana Plaza is not named.
- step 15 (Marketing Considerations): it covers misleading labelling, greenwashing (named and defined) and inappropriate marketing. I deliberately sorted 2 items wrong and got "✗ 4 of 6 in the right group", with the right group shown per item plus "Try again" and "Show the answer". — PASS for specGap-02.
- step 16 (Chapter 3 check-in): I tapped "Skip the question" and it revealed the diagram, guided practice (8 marks, Discuss) and "RECALL FROM CHAPTER 2" (the step 6 reorder). — PASS: skip reveals the rest. When I then tapped option B, only "How sure were you?" appeared, with no Correct or Not quite verdict.
- step 16: check-in answer — clean. The checklist asks four open questions. The "Marketing" box says "Is the message fair?", not "misleading labelling".
- step 17 (The Power of MNCs and Political Influence, chapter 4): it covers size, mobility, reliance and lobbying, plus the $80m second-factory bargaining. — PASS for specGap-01 (political influence and power).
- step 18 (Legal Control): it covers host, home and international levels, with a 3-blank fill-in and 5 words. — PASS for specGap-01 (legal control).
- step 19 (Consumer Pressure, Pressure Groups and Social Media): each is taught by name, and the reorder names "cause-to-effect order". — PASS for specGap-01 and quiz-03 (controlling MNCs is now in the content).
- step 20 (Self-Regulation): "STEP 20 OF 21" with the full body. — PASS: the counter and body agree.
- step 21 (Chapter 4 check-in): the question came first. I answered C (wrong) and got "Not quite. Self-regulation is the firm setting and checking its own rules…". Then the diagram, the Quick check (20-mark Evaluate) and "RECALL FROM CHAPTER 3" (the step 12 match) appeared. The mark scheme is inside a max-height:0 container until "Reveal mark scheme" is tapped. — PASS. A small stem echo: "self-regulation" and "a supplier code it writes and audits itself".
- step 21: check-in answer — clean. The checklist lists self-regulation as a limit but does not say which option is self-regulation.
- step 21 diagram: 15 labels, no overlap, no clipping, smallest label 9.4px inline at 390px. — PASS.
- complete: I tapped "Complete topic ✓" and got "Topic complete", "100% strength · review tomorrow", Quiz 2/3, Recall 0/1, Written practice 0/6. — PASS with a note: recall results from before the reload were not kept, and "100% strength" sits beside 2/3 and 0/1.
- Notes tab: 4 chapter cards (1A, 1B, 2A-2D, then chapter 4) with definitions, mechanisms and takeaways. The figures match the Learn steps ($90m, $2.5m vs $12.5m). There are 0 `<table>` elements, and the only horizontal scroller is the tab bar (by design). `documentElement.scrollWidth` is 390. — PASS.
- Diagrams tab: 4 diagrams, smallest label 9.2px inline at 390px, 0 overlaps, 0 clipped labels, each with "Enlarge diagram". — PASS.
- Practice tab: one shared Source A and then 7 questions at 4, 4 (Explain), 8 (Discuss), 12, 12 (Assess), 20 and 20 (Evaluate), all "from sources". — PASS for topFix-04, practice-01 and the 26 Sep A/B/C shape: 40 + 20 + 20. The filter chips still show empty "2 Marks 0", "6 Marks 0" and "10 Marks 0" buckets.
- table width: no `<table>` renders on any surface I walked (21 Learn steps, Notes, Diagrams, Practice). There were no cell widths to measure and no element overflows 390px. — PASS, the class does not apply to this build.
- Unit 4 hub (`/business/unit-4`, served): 4.3.4 still lists a) Multinational Corporations ("reasons for MNCs"), b) Transfer Pricing & Tax, c) FDI & Host Countries ("sweatshops"), d) Ethical Issues ("fair trade"), e) Controlling MNCs ("CSR"). The description ends "the power of global brands". This does not match the rebuilt four chapters. `git diff HEAD` edits the 4.3.3 entry on this page but not 4.3.4. — FAIL, non-blocking for the section; the brief §7 risk it warned about.

## Console errors

- `Failed to load resource: 401 (Unauthorized)`. This is `POST /api/learn-mode/state` when "Complete topic" is tapped signed out; the completion screen still rendered.
- `POST /api/events` beacons show `net::ERR_ABORTED` in the network log but log no console error.
- Several `[Fast Refresh] rebuilding` lines appeared during the walk, so another session was editing files in this worktree while I walked it.
- No other errors or warnings.

## Audit complaints still visible

- A header naming the wrong section: not on the section page (the header reads "SECTION 4.3.4 · MNCs" throughout). The Unit 4 hub card for 4.3.4 still describes the old structure (the FAIL line above).
- None of the other listed complaints: no gate blocks the student (Next is sticky and enabled on every step, and every check-in has "Skip the question"); every exercise had a defensible answer; every text box has a button; no recall appeared twice in a row (each spaced recall comes from an earlier chapter); diagram labels are readable in the enlarge sheet (12.0px at 390px).
- Draft-preview only: the screen-reader-only SEO block (`.sr-only`) still carries the live t=0 text, including "making the host country a net loser". It is not visible and regenerates from `data` at publish.
