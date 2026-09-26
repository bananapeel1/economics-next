# Packet 55 — Verify A (packet-verifier, fresh context)

Section: `business__global-marketing` (IAL Business 4.3.3). Claimed: 22 ids. `specGap-06` already wont-fix
(no such leaf; checked against `audit/raw/bus_spec.txt:1424-1446`, agreed).

Not read: `audit/runs/packet-55/built.md`.

## Method (different from the builder's)

The builder compared the draft with the bundle by reading the DB directly (`draft-readback.mjs`) and by
`check-staged-drafts.mjs`. I did neither. I:

1. Fetched `localhost:3001/api/sections/global-marketing?draft=1` and the live route myself and diffed them
   field by field against `audit/snapshots/packet-55-bundle__business__global-marketing.json` in Python.
   content/notes/diagrams/practice are identical. The only differences are the signed-out slice: quizIndices
   remapped to 0-4, and quiz/flashcards/extras cut down. Every served quiz item, flashcard and extras entry
   is byte-equal to a bundle entry. So the bundle is what the draft serves. Live is still the t=0 version
   (Hofstede x14, KFC x3, Nova x1), as expected before publish.
2. Read every block, section, recall, quiz item, practice item, flashcard, mistake, extras entry, notes block
   and diagram (checklist + every SVG `<text>`) by eye.
3. Read the spec text itself (`bus_spec.txt:1422-1446` for 4.3.3, `:1090-1100` for 3.3.1 Ansoff/Porter) and
   checked the content against it, not against the ledger's numbering.
4. Grepped the bundle for the defect markers: hofstede, nova, chevrolet, kfc, high-context, reportedly,
   fingers, white, power distance, collectiv, india, mcdonald. Every count is 0 (live: 14/1/0/3/1/1/1/3/5/7/9/6).
5. Recomputed every figure: $1.2m/6 = $200k; 6 x $450k = $2.7m, saving $1.5m; $18/200 ml = $0.09, $3/25 ml =
   $0.12 (+33%, 1/6 of the till money); 160,000 x 3 x $30 = $14.4m; $30 vs $20 = 50%; q3 8 x 300k - 1.6m =
   $0.8m; q7 $0.004 vs $0.005 per g = 25% dearer; q20 6/30 = 20%. All correct.
6. Old quiz ids vs new: zero overlap (old idx2 `a0293d9e` sachet, idx5 `ec4aea66` white, idx7 `4ff1a7ae`
   comparative advertising are all gone). Key distribution now A7 B6 C6 D6 (was 7 of 10 on C). No correct
   option is more than 1.5x the longest distractor.

## Verdicts

| id | verdict | evidence |
|---|---|---|
| topFix-01 | CONFIRMED | Three approaches taught at bundle:59 (ethnocentric/polycentric) and :113 (geocentric); Ansoff :369, Porter :434, both together :488; niche :565/:619/:681. Every one of the 25 quiz items tests a term in content[] body. |
| topFix-02 | CONFIRMED | Hofstede section gone (0 hits). Replaced by language/unintended meanings :812 and inappropriate branding/promotion :867, which covers social media as a promotion channel. Nova and KFC gone. Hofstede was deleted rather than moved to extras. The spec does not require it (specGap-08), so deleting it leaves no defect. |
| topFix-03 | CONFIRMED | Sachet item now asks "which two Ps", keyed product and price (:1267 `552fc65c`). White-colour item and comparative-advertising item with absurd distractors retired (ids absent). |
| topFix-04 | CONFIRMED | reorder glocalisation process :40; fillin three approach names :142; spectrum diagram `d3f9e969` pinned :171 plus Ansoff/Porter grid `334f8d61` :547. |
| topFix-05 | CONFIRMED | Practice :1471ff: 8/12/20-mark items carry Level 1-4 descriptors (K/A, An, E), in the same format as packets 47/50/53. "Explain one way Ansoff's matrix…" (4) at :1476, and its guidance states adapted-for-new-country = market development. No India/McDonald's anywhere. Tariffs 4,4,8,12,12,20,20 match ial-paper-structure.json WBS13/14. Guidance opens with a scaffold, no marks. |
| accuracy-01 | CONFIRMED | KFC / high-context / collectivist realExample removed (0 hits); no Hofstede framework left to misapply. |
| quiz-01 | CONFIRMED | Old key Price with a Product justification replaced by :1267 (product AND price), the explanation separates the two, and mistake :1680 teaches it. |
| structure-01 | CONFIRMED | 15 recalls (reorder 1, fillin 3, classify 6, match 4, one per section) and 5 diagrams, all pinned by diagramId :171/:352/:547/:741/:945. |
| structure-02 | CONFIRMED | Whole bank replaced (0 id overlap). All 25 items test content[] terms, so no PreTest draw can hold untaught material. |
| structure-03 | CONFIRMED | Block 0 now teaches the three named approaches (:59, :113). The orphan "Adaptation" takeaway is gone (takeaways at :9ff are about global/glocal/ethno/poly/geo). |
| structure-04 | CONFIRMED | Block 4 gives 3 sections to the spec's 4 bullets (:758, :812, :867), with no Hofstede. Social media appears as a promotion channel, and specGap-06 (not a leaf) is wont-fix. |
| structure-05 | CONFIRMED | The premise is wrong: bus_spec.txt:1424 shows the topic itself is 4.3.3, so the "4.3.3" tag is correct. The substantive complaint (niche only in the extras) is fixed: niche is taught in content block 3 (:565-:681), and each notes block's meta cites 4.3.3 · 1a-1b/1c/1d/2a-2c/3a. |
| structure-06 | CONFIRMED | The glocalisation "simple middle ground" filler and the Hofstede misconception are gone. All 15 misconceptions are concrete student errors with a correction, e.g. :138. |
| structure-07 | CONFIRMED | content[] now carries a language failure worked through (Serana/"slippery" :812ff) and generic examples (furniture names :839, gift-wrap colour :909). There are no named-entity myths, which fits CONTENT-GATE Layer 4 ("a generic, true example always beats a specific, invented one"). |
| structure-08 | CONFIRMED | 5 chapters in spec order, not 2 flat steps: definitions/approaches, then 4Ps applied, then Ansoff/Porter, closing with a "use both" judgement section (:488), then niche, then cultural factors. Practice ramps 4, 4, 8, 12, 12, 20, 20. The last two chapters are more descriptive again, but that follows spec order, not a flat ramp. |
| specGap-01 | CONFIRMED | 4.3.3.1(b) taught :59, :113. |
| specGap-02 | CONFIRMED | 4.3.3.1(d) Ansoff: 4 cells applied abroad plus a market-vs-product-development test, :369. |
| specGap-03 | CONFIRMED | 4.3.3.1(d) Porter: all 4 cells applied abroad, :434. |
| specGap-04 | CONFIRMED | 4.3.3.2(b) features section :619. |
| specGap-05 | CONFIRMED | 4.3.3.2(c) 4Ps for a niche, P by P, :681. |
| specGap-07 | CONFIRMED | 4.3.3.3(a) bullets have their own sections :758, :812, :867, with checks and consequences. |
| specGap-08 | CONFIRMED | Hofstede appears 0 times in the bundle. |

## Check-in answer rule (CONTENT-GATE, question first since PR #43)

Check-in quiz = the first entry of each block's quizIndices (`resolvePinnedItem`, components/learn-mode/utils.js:111-113).

- CHECKIN 1 (approaches; spectrum diagram; q3 campaign saving $0.8m): **clean**. The diagram has no figures.
- CHECKIN 2 (4Ps; Serana kept/adapted grid; q7 sachet per gram 25% dearer): **clean**.
- CHECKIN 3 (Ansoff/Porter; grids; q12 what a cost leader cannot afford = many local versions): **clean**.
  The SVG says "lowest-cost supplier", and nothing in it mentions local versions.
- CHECKIN 4 (niche; bar chart; q17 prayer mats defined by a shared value): diagram **clean**. Takeaway
  "Groups share values or interests across borders" names the key among the options. **Borderline DEBT**, not
  blocking (it shows after the answer).
- CHECKIN 5 (cultural factors; four-checks diagram; q21 best check for a rude-sounding name = asking local
  speakers): diagram **clean**. Takeaway "Check what a name or slogan sounds like to local speakers" states the
  key. **leaks (takeaway), DEBT** under the 26 Sep question-first rule. Record it for the rewrite pass.
- No stem, option set, chapter title or intro states its own key. Nothing blocking.

## Unclaimed but relevant

None. The only other ledger row naming this section is M068 (packet 0, confirmed).

## Gate

Every claimed id is confirmed. The takeaway leak at check-in 5 (and the borderline one at 4) is debt, not a
blocker. From Verify A's side, the packet gate can pass once Verify B and the publish readback are done.
