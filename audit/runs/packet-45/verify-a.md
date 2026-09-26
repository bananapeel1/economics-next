# Packet 45 — Verify A (labour-markets), 26 Sep 2026

Verifier: packet-verifier (fresh context). built.md was NOT read.

## Method (chosen to differ from the build's own checks)

1. **The database, not the file.** `curl localhost:3001/api/sections/labour-markets?draft=1` saved and
   deep-compared, key-order independent, against `audit/snapshots/packet-45-bundle__economics__labour-markets.json`.
   content / notes / diagrams / practice are identical. The only differences are the quizIndices in the
   signed-out slice, which the read path remaps (8 of 31 quiz items served). Every served quiz item is
   identical to its bundle copy. The full 31-item bank and the flashcards/mistakes/extras beyond the
   anonymous slice were read from the bundle only. `check-staged-drafts.mjs` (re-run): labour-markets "matches".
2. **Placement comes from the shipping code, not the pins as written.** `buildSteps` (lib/learn-steps.js) and
   `placeChapterItems` (lib/checkin-placement.js) were run against both the served draft and the bundle.
   26 steps. Every chapter's diagram is placed by `pin`, not by title. The item each check-in serves:
   ch0 Q3 price-of-product + Define 2; ch1 Q8 licence + Explain 4; ch2 Q14 above-equilibrium + Analyse 6;
   ch3 Q20 union deal + Examine 8; ch4 Q26 geographical immobility + Discuss 14.
   `resolvePinnedItem` (components/learn-mode/utils.js:111-113) returns ONE item per chapter.
3. **SVG geometry was checked numerically, with no renderer.** A script of my own parsed every `<path>`/`<line>`
   and tested each marker circle for incidence on the drawn curves (tolerance 1.5px). It also fitted the
   tick labels on each axis linearly. All 15 scenarios pass, every tick residual is ≤0.1px, and the
   figures match the equations in the text.
4. **Arithmetic was re-derived by hand from L = 60 − 2W, L = 4W − 12.** The text gives $12/36k. Checked:
   demand +12k gives $14/44k; supply +12k gives $10/40k; supply −12k gives $14/32k; a tax shift of −6k
   gives $13/34k; a union restriction of −18k gives $15/30k; a $15 floor gives 30k hired against 48k
   willing; the recall at $16 gives 28k against 52k; elasticity −0.67; the hiring rule's 6/5/7 cases;
   capital's $10 break-even; nurses' 29k wanted against 20k willing; the two regions at $10/$14.
   Q18 = $16 was also checked. All correct.
5. **The spec and Appendix 6 were read directly.** `audit/raw/econ_spec.txt` 1447-1479 (3.3.4) and
   1524-1535 (3.3.5.2), plus Appendix 6 at 2696+. I checked every "Appendix 6 wants/gives …" examMatters
   claim against the taxonomy, and none overclaims.
6. **Packet 29's monopsony diagram was checked, because topFix-04 now depends on it.** Read from the live
   `market-structures-contestability` payload (diagrams[7]): Wm (310.8, 229.09) lies on S, MCL meets MRP at
   (310.8, 180), and the competitive point S∩MRP is at (390.4, 212.73). The construction is correct.
   Note: check-staged-drafts reports DRIFT on that section's diagram 43a9f89f in draft. That is not
   packet 45's problem, but re-check it before the MSC draft publishes.

## Verdicts

- topFix-01 CONFIRMED: all 5 blocks carry diagramId + quizIndices + practiceIndices. Every placement is `pin`,
  and every chapter serves an on-topic item (method 2). The old monopsony diagram is out of scope under
  SPEC-OWNERSHIP, and packet 29 draws it correctly.
- topFix-02 CONFIRMED: all 21 subsections carry a recall (reorder 6, fillin 4, classify 6, match 5, counted by script).
  `recall-census --check` re-run exits 0; staged is 833 against 812 live with the recoverable count
  unchanged, so labour-markets adds 0 recoverable. The monopsony, NMW and bilateral recalls it named cover
  content that has left the section.
- topFix-03 CONFIRMED: the "not because markets are failing" text is gone (0 hits). Elasticity determinants
  are taught at content[0].sections[4] and content[1].sections[4]. No NMW paragraph was added, but no text
  presupposes one now. The only mention is the 3.3.5 pointer at content[3].sections[1].body[3], and
  econ_spec.txt:1530 puts minimum wage controls in 3.3.5.2b.
- topFix-04 CONFIRMED: neither monopsony SVG is in the draft. The 5 diagrams contain no MCL or monopsony
  label, and packet 29's diagram is geometrically correct (method 6).
- topFix-05 CONFIRMED: practice is Define 2, Calculate 2, Explain 4, Analyse 6, Examine 8, Discuss 14 and
  Evaluate 20, all legal under Appendix 6. There is no Outline, and the Examine, Discuss and Evaluate
  guidance uses levels with no "(1 mark)". The monopsony-diagram requirement no longer applies because the
  essay is no longer on monopsony.
- accuracy-01 CONFIRMED: content[2].sections[4] and content[4].sections[2] separate the market working
  from immobility failure, which matches spec 4a/4b.
- quiz-01 CONFIRMED: the elasticity item is now Q7. It is taught at content[0].sections[4] and pinned to
  block 0.
- structure-01 CONFIRMED: every block pins diagramId. `placeChapterItems` reports `pin` for all 5, and all
  5 diagrams are placed.
- structure-02 CONFIRMED: quiz pins are derived from each item's block tag, so no positional fallback runs
  (method 2).
- **structure-03 REJECTED.** The Outline-before-teaching problem is gone, but Evaluate (20), practice[5],
  still never reaches Learn Mode. content[3].practiceIndices = [4,5], and resolvePinnedItem
  (utils.js:111-113) returns only practice[4], the Examine 8. practice[5] is not the first pin of any
  chapter, so it can never be served (scripts/_packet45-assessment.mjs:194 tags it B4 second). The title's
  third clause still holds. Remedy: make the 20-mark item the first pin of some chapter, as packet 43 did
  (economic-growth-structure-05 evidence).
- structure-04 CONFIRMED: 21 of 21 subsections have a recall (see topFix-02).
- structure-05 CONFIRMED: unions are now paired with public-sector pay (3c). Pay differentials moved to the
  competitive block, which links forward to immobility in block 4.
- structure-06 CONFIRMED: content[2].sections[1] and diagram 8898e521, scenario "One firm: a wage-taker",
  show a horizontal S at $12 with hiring at 6, where the curve meets the firm's demand (method 3).
- structure-07 CONFIRMED: neither the monopsony misconception nor the NMW flashcard exists. "Minimum wage"
  appears only in the two 3.3.5 pointers, so no text presupposes an untaught result.
- structure-08 CONFIRMED: both union flows are causal chains (limit entry → fewer → S left; floor → move up
  D → surplus). Every other flow was read and none is a parallel list.
- **structure-09 REJECTED.** The filler survives in substance, and one of the real errors the item names
  is now being taught.
  (a) The filler is still there. Pre-packet it read "firms hire workers because they need them". It now
  appears as "because firms need more workers" in content[0].sections[0].misconception
  (scripts/_packet45-content.mjs:76), and again as mistakes[2] "…because the firm needed them"
  (_packet45-assessment.mjs:256).
  (b) The item names "writing MRP = MPP × price when the product market is imperfectly competitive" as a
  real student error. The draft now TEACHES that error as the definition: content[0].sections[1].body[1]
  (_packet45-content.mjs:106) says the extra output × the price "Textbooks call this the marginal revenue
  product (MRP)", and flashcards[4] (_packet45-assessment.mjs:210) says the same. The hiring-rule
  misconception on diminishing returns is fixed.
- structure-10 CONFIRMED: the backward-bending and "favourite" advice is gone (0 hits). notes[1] has no
  examMatters, and content[1].sections[0].examMatters gives the only advice, so there are no longer two
  versions to contradict each other.
- structure-11 CONFIRMED: this is not a defect. The ramp runs demand → supply → competitive → unions/public
  → market failure, and each takeaway summarises its own chapter.
- specGap-01 CONFIRMED: content[0].sections[4] teaches the definition, a worked −0.67 and four determinants.
- specGap-02 CONFIRMED: content[1].sections[4] teaches the definition, four determinants and the
  elastic/inelastic comparison ($14/44k against $16/40k).
- specGap-06 CONFIRMED: see structure-06. The market (scenario Equilibrium) and the firm (One firm) are
  scenarios of the same diagram.
- **specGap-08 REJECTED: a regression in the diff.** The examiner overclaim is gone, since "examiner"
  appears 0 times. But the MRP theory this item asks about is now wrong where the old version was right:
  the pre-packet snapshot defines MRP = MPP × MR, and the draft redefines it as extra output × the price
  of the product (_packet45-content.mjs:106; _packet45-assessment.mjs:210; notes[0] "hire while extra
  output × price ≥ wage"). That only holds when the firm is a price-taker in its product market, and the
  draft never states that assumption. Remedy: one clause, e.g. "× the extra revenue each unit brings, which
  is its price when the firm sells in a competitive market".
- specThin-01 CONFIRMED: content[0].sections[3] covers the wage relative to the price of capital, with a
  $10 break-even and the complement caveat.
- specThin-02 CONFIRMED: content[1].sections[1].body[0] covers the size of population, growing and ageing.
- specThin-03 CONFIRMED: content[1].sections[2].body[1] covers welfare benefits through the gain from working.
- specThin-04 CONFIRMED: content[1].sections[3] covers four kinds of regulation plus a worked shift.

## Unclaimed but relevant (status left untouched)

- specGap-03, -04, -05, -07 and -09 are wont-fix. Each note was checked against the spec lines it cites
  and against the draft (0 "discrimination" hits; public-sector-pay subsection present; population and
  migration taught). All five notes are accurate.
- Two spec leaves had no ledger item: 2c income tax rates (content[1].sections[2].body[0]) and 1a price of
  the product (content[0].sections[2]). Both are taught.
- Interim coverage: after this publishes, the minimum wage is taught nowhere until packet 48 builds 3.3.5.
  The pointer names a section that does not exist yet.

## Gate

It should not pass. 23 ids are confirmed and 3 rejected (structure-03, structure-09, specGap-08). All three
rejections are small content edits in the packet-45 modules, followed by a re-stage.

---

# Re-verification round 1 (26 Sep 2026)

Verifier: packet-verifier (fresh context). I did not read built.md. Scope: the 3 ids still open after round 0.

## Method (chosen to differ from the fix's checks)
- I read the dumped bundle `audit/snapshots/packet-45-bundle__economics__labour-markets.json` (10:50, written after the fix-round
  script edits at 10:46-10:48) and did not import the `_packet45-*` modules. Then I grepped the scripts to tie each bundle string to its source line.
- structure-03: the builder's own probe (`served-practice.mjs`) runs buildSteps + placeChapterItems. I did not rely on it.
  I traced the render path further than that probe goes. `LearnModeTab.jsx:656` gates every placed item through `isPracticeVisible`
  (`lib/ial-commands.js:60`), which hides any non-IAL command word. The probe does not model that gate, and it could have
  silently hidden the 20-marker. I ran `isPracticeVisible` on every bundle practice item for WEC13, and all 7 are visible.
  I checked that `lib/preview-limits.js:225` lists practice as a FREE_SURFACE (full list), so signed-out readers get the same indices.
  I checked the mode (`getPracticeMode`, LearnModeTab.jsx:335): chapter 3 is ordinal 3 of 5, so guided, and only guidance paragraph 1 is open.
- structure-09 / specGap-08: I walked every string leaf of the bundle (content, notes, quiz, practice, flashcards, mistakes, extras, and the
  diagram SVG <text> labels) with regexes for the filler wording ("need(ed) them / more workers", "because ... need"),
  for every price-times-output phrasing ("× price", "times the price", "multiplied by the ___", MPP), for "marginal revenue",
  and for "examiner(s) expect/want", "draw the MRP". I checked `audit/raw/econ_spec.txt:1447-1457` for what 3.3.4 1a actually lists.

## Verdicts
- **C-labour-markets-structure-03 CONFIRMED.** The pinned path resolves raw indices (`lib/checkin-placement.js:51`,
  `components/learn-mode/utils.js:111-113`). The marks-sorted copy (`checkin-placement.js:32`) is unused on this path because every block carries
  practiceIndices. Served: ch0 Define 2, ch1 Explain 4, ch2 Analyse 6, ch3 **Evaluate 20** (practice[4], `_packet45-assessment.mjs:191`),
  ch4 Discuss 14. The Outline/trade-unions item is gone, and the pre-packet Assess (10) is gone too (Assess is not an IAL Economics command, so it was hidden anyway).
  Every served item's topic is taught at or before its chapter: migration 17 hits in ch1, elasticity of supply in ch1, immobility in ch4.
  Residual (not the titled defect): the Evaluate item's full guidance at ch3 names "immobility" as one of three counter-arguments.
  Chapter 4 teaches immobility. Ch2's classify recall already names geographical/occupational immobility, and the term sits behind the
  guided-mode "See full guidance" toggle. Not served in Learn Mode: Calculate 2 (practice[1]) and Examine 8 (practice[5]). Both are in the Practice tab.
- **C-labour-markets-structure-09 CONFIRMED.** The filler is gone everywhere. There are 0 hits for "because ... need" or "need(ed) them". The only "needs more workers" hit is
  the derived-demand recall's causal `why` ("More output needs more workers at any given wage"), and that is a chain step, not the misconception. The pre-packet
  `sub:demand-for-labour-mrp` no longer exists. All three real errors are now taught:
  (1) movement vs shift: `_packet45-content.mjs:76` plus mistakes[0];
  (2) MRP = MPP × price under imperfect competition: `_packet45-content.mjs:106` (MRP = extra output × MR, equals price only at a given price) plus mistakes[2]
  (`_packet45-assessment.mjs:255`);
  (3) diminishing returns as "worse workers": `_packet45-content.mjs:110` plus mistakes[1] (`_packet45-assessment.mjs:252`).
- **C-labour-markets-specGap-08 CONFIRMED.** The overclaim is gone: 0 hits for examiner/"draw the MRP". examMatters now cites Appendix 6 command tariffs.
  The spec (econ_spec.txt:1451-1457) lists derived demand, productivity, price of product, wage vs price of capital, and elasticity, but not MRP.
  Chapter 0 is organised on exactly those factors, and MRP appears once, framed as "Textbooks call it". The round-0 regression (price stated as MRP
  with no assumption) is closed at every location that states the product. `_packet45-content.mjs:106` gives MRP = extra output × MR, with = price only for a
  price-taker. flashcards[4] (`_packet45-assessment.mjs:210`) matches it. notes[0] reads "for a firm selling at a given price ... in general × MR". Other locations state the
  assumption in their own text: flashcards[3], quiz[5] ("sells every unit at the market price"), practice[1] ("can sell any amount at this price"), the ch0 sec1 recall template,
  ch0 sec2 body[0], diagrams[0].description ("a price the workshop cannot change") and extras.chains[1].

## Unclaimed but relevant
None. All 31 packet-45 items are claimed: confirmed, wont-fix, or these three.

## Gate
With these three confirmed, `ledger.mjs unverified 45` should be empty. On these ids the gate can pass.
